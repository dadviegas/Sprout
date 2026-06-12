import { useEffect, useState } from "react";
import { store } from "../storage";
import { estudoTopics, lessonMeta, subjectsForYear, yearLabel, type Lesson, type Subject, type YearN } from "../content/curriculum";
import { lessonMinutes, splitLesson } from "../lesson-content";
import { readingCategory } from "../site-config";
import { TEST_PASS_PCT, type Achievement, type ProgressMap } from "../progress";
import { DAILY_TARGET_MINUTES, DAY, isRestDay, startOfDay } from "./calendar";
import { loadDiagnostic, weakSubjects, type Diagnostic } from "./diagnostico";

/* ------------------------------------------------------------------ *
 * "Plano de férias" — recover a whole school year (PLANO-ESTUDO §4.8).
 *
 * The child picks a YEAR and gets a day-by-day plan over the holidays:
 * Monday–Friday is NEW matter (~30 min/day), Saturday is a lighter
 * REVISION day (no new queue steps — see plan.ts), Sunday is rest. The
 * plan covers the year's mandatory subjects (a lesson's final test
 * belongs to the SAME day as the lesson).
 *
 * sprout.plan.v1 persists `{ activeYear, plans, history }`: ONE plan per
 * year (each an ordered QUEUE of steps plus which steps are DONE), which
 * year is being studied now, and a small HISTORY of finished/archived
 * plans (one PlanRecord per past run, with the final-exam grade when
 * taken). Switching year just moves `activeYear` — the other years' plans
 * and their progress stay put. Everything else — today's steps,
 * projected future days, week/percent/pace — is DERIVED at read time:
 *   - "today's steps" = the next undone steps that fit the ~30-minute
 *     target (+8 min of tolerance so two lessons share a day; at most two
 *     subjects), skipping Saturdays (revision) and Sundays (rest);
 *   - a missed day needs NO mutation — tomorrow simply serves the same
 *     front of the queue (that IS the carry-over);
 *   - done = the lesson's final test passed at >= TEST_PASS_PCT (reused
 *     from progress); a failed test keeps the step at the front, and
 *     the review bank (§4.2) already schedules the wrong questions.
 * ------------------------------------------------------------------ */

export const FERIAS_KEY = "sprout.plan.v1";

/** The exam button on #/plano appears at this fraction of the plan done. */
export const EXAM_READY_PCT = 0.9;

/** Minutes reserved for a lesson's final test — same day as the lesson. */
const TEST_MINUTES = 5;
/** A study day aims at this many minutes of new matter (lesson + test). */
const DAY_TARGET_MIN = DAILY_TARGET_MINUTES; // 30
/** …but may stretch this much to fit one more step: a hard 30-min cap packed
 *  a SINGLE ~18-min lesson per day (18+16 > 30), which made the projected
 *  finish (~10 weeks) contradict the minutes-based "de 6 semanas" header.
 *  Allowing a day up to 38 min keeps real days at two steps. */
const DAY_TOLERANCE_MIN = 8;
/** New-matter days per week (Mon–Fri; Saturday revises, Sunday rests). */
const STUDY_DAYS_PER_WEEK = 5;
/** A day mixes at most this many school subjects. */
const MAX_SUBJECTS_PER_DAY = 2;

/* ---- the school rhythm (user decision 2026-06-11) --------------------- *
 * Monday–Friday: new matter. Saturday: a lighter REVISION day — the packer
 * puts NO new queue steps on it; its missions derive from the week's done
 * lessons instead (plan.ts). Sunday stays rest (calendar.ts isRestDay). */

/** Saturday — the férias plan's revision day. */
export const isRevisionDay = (day: number): boolean => new Date(day).getDay() === 6;

/** A day the queue advances on (new matter): Monday–Friday. */
export const isNewMatterDay = (day: number): boolean => !isRestDay(day) && !isRevisionDay(day);

/** One queue entry: a lesson plus its final test, in teaching order. */
export interface PlanStep {
  lessonId: string;
  /** estimated minutes: lessonMinutes(body) + TEST_MINUTES */
  minutes: number;
  /** re-queued after a failed exam: the lesson was already passed once, so
   *  progress.done is stale — a redo step only counts via doneSteps */
  redo?: boolean;
  /** when the redo step was queued — only passes AFTER this moment count */
  addedAt?: number;
}

export interface StudyPlan {
  year: YearN;
  startedAt: number; // epoch ms
  queue: PlanStep[];
  /** lessonIds whose final test was passed (mirror of progress, see sync) */
  doneSteps: string[];
  /** best "exame final" score (0–1) taken while this plan was active */
  examPct?: number;
}

/** One archived plan — written when a plan finishes or is replaced. */
export interface PlanRecord {
  year: YearN;
  startedAt: number;
  endedAt: number;
  /** 0–100, by queue minutes */
  pctDone: number;
  minutesDone: number;
  /** best "exame final" score (0–1), kept across retakes */
  examPct?: number;
}

/** What sprout.plan.v1 holds: ONE plan PER YEAR (a child can pause the 1.º
 *  ano and pick up the 4.º without losing either), which year is being
 *  studied now, and the archive of finished plans, oldest first. */
export interface FeriasState {
  activeYear: YearN | null;
  plans: Partial<Record<YearN, StudyPlan>>;
  history: PlanRecord[];
}

/** The plan being studied now — THE one accessor every consumer reads
 *  through (Plano, PlanoCompleto, ParentArea, grade feeders). */
export function activePlan(state: FeriasState): StudyPlan | null {
  return state.activeYear != null ? state.plans[state.activeYear] ?? null : null;
}

/* ---- storage --------------------------------------------------------- */

const isYearN = (y: unknown): y is YearN => typeof y === "number" && y >= 1 && y <= 6;

/** Guard one plan's shape so stale/garbled data never crashes. Steps whose
 *  lesson no longer exists are silently dropped. */
function guardPlan(raw: unknown): StudyPlan | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as StudyPlan;
  if (!isYearN(p.year)) return null;
  if (typeof p.startedAt !== "number" || !Array.isArray(p.queue) || !Array.isArray(p.doneSteps)) return null;
  const queue = p.queue.filter(
    (s): s is PlanStep => !!s && typeof s.lessonId === "string" && typeof s.minutes === "number" && lessonMeta.has(s.lessonId),
  );
  if (queue.length === 0) return null;
  return {
    year: p.year,
    startedAt: p.startedAt,
    queue,
    doneSteps: p.doneSteps.filter((id): id is string => typeof id === "string"),
    ...(typeof p.examPct === "number" ? { examPct: p.examPct } : {}),
  };
}

function guardRecord(raw: unknown): raw is PlanRecord {
  const r = raw as PlanRecord;
  return (
    !!r && typeof r === "object" && isYearN(r.year) &&
    typeof r.startedAt === "number" && typeof r.endedAt === "number" &&
    typeof r.pctDone === "number" && typeof r.minutesDone === "number"
  );
}

const EMPTY_STATE: FeriasState = { activeYear: null, plans: {}, history: [] };

/** Guard the per-year plan map: each plan validated, and a plan filed under
 *  the wrong year key is silently re-filed under its own `year`. */
function guardPlans(raw: unknown): Partial<Record<YearN, StudyPlan>> {
  const out: Partial<Record<YearN, StudyPlan>> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const v of Object.values(raw)) {
    const p = guardPlan(v);
    if (p) out[p.year] = p;
  }
  return out;
}

/** Read the whole state, migrating OLD shapes silently (with a deferred
 *  write-back so the migration runs once):
 *    v0: a bare StudyPlan            → one plan, active
 *    v1: { active, history }         → active becomes plans[active.year]
 *    v2: { activeYear, plans, history } — the current shape. */
export function loadFeriasState(): FeriasState {
  const raw = store.getSync<unknown>(FERIAS_KEY, null);
  if (!raw || typeof raw !== "object") return EMPTY_STATE;
  let state: FeriasState;
  let migrated = false;
  if ("plans" in raw) {
    const s = raw as FeriasState;
    const plans = guardPlans(s.plans);
    const activeYear = isYearN(s.activeYear) && plans[s.activeYear] ? s.activeYear : null;
    return { activeYear, plans, history: Array.isArray(s.history) ? s.history.filter(guardRecord) : [] };
  } else if ("active" in raw || "history" in raw) {
    // v1: the single active plan becomes that year's plan.
    const s = raw as { active?: unknown; history?: unknown };
    const active = guardPlan(s.active);
    state = {
      activeYear: active ? active.year : null,
      plans: active ? { [active.year]: active } : {},
      history: Array.isArray(s.history) ? s.history.filter(guardRecord) : [],
    };
    migrated = true;
  } else {
    // v0: the bare plan itself.
    const active = guardPlan(raw);
    state = active ? { activeYear: active.year, plans: { [active.year]: active }, history: [] } : EMPTY_STATE;
    migrated = true;
  }
  // Silent write-back, deferred: loads run inside render (useState init), and
  // a synchronous store.set would notify other components mid-render. Re-read
  // first so a write that landed in between is never clobbered by this stale
  // snapshot (the migration only matters while the stored shape is still old).
  if (migrated && state !== EMPTY_STATE) {
    queueMicrotask(() => {
      const cur = store.getSync<unknown>(FERIAS_KEY, null);
      if (cur && typeof cur === "object" && "plans" in cur) return; // already new-shape
      store.set(FERIAS_KEY, state);
    });
  }
  return state;
}

function saveFeriasState(state: FeriasState): void {
  store.set(FERIAS_KEY, state);
}


/** The demanding subjects — a day should pair ONE of these with a lighter one
 *  (estudo do meio, inglês, cidadania…), never stack two heavies. */
const HEAVY_SUBJECTS = new Set(["matematica", "portugues"]);

/** The MANDATORY subjects of the 1.º ciclo (user decision 2026-06-11): only
 *  these enter a férias plan for years 1–4 — TIC, artes, ed. física etc. stay
 *  out so the recovery focuses on what school actually grades. From the 5.º
 *  ano on ALL of the year's school subjects enter. Stored queues are never
 *  rewritten — the filter applies to NEW plans only. */
export const MANDATORY_SUBJECTS_1C = new Set(["portugues", "matematica", "estudo-do-meio", "ingles", "cidadania"]);

/** The subjects a férias plan of `year` covers — the one place the mandatory
 *  rule lives. Shared by the queue builder, the exam requeue (below) and the
 *  diagnostic mini-test (Simulado.tsx). */
export function mandatorySubjectsForYear(year: YearN): Subject[] {
  return subjectsForYear(year).filter((s) => year >= 5 || MANDATORY_SUBJECTS_1C.has(s.id));
}

/** The "Aprender a ler" ladder (readingCategory — Saber de cor) as ordered
 *  plan lessons, for the 1.º-ano queue. Only the topics WITH a final test
 *  enter: "done" = the test passed, so a pure drill page (no "Questionário
 *  final") could never be ticked off and would jam the front of the queue. */
function readingTrack(): Lesson[] {
  const byId = new Map(estudoTopics.map((t) => [t.id, t]));
  return readingCategory.topics
    .map((id) => byId.get(id))
    .filter((t): t is Lesson => !!t?.body && splitLesson(t.body).test !== null);
}

/** Round-robin interleave: a[0], b[0], a[1], b[1]… keeps each list's own
 *  teaching order while alternating across lists. */
function interleave<T>(lists: T[][]): T[] {
  const out: T[] = [];
  for (let i = 0; lists.some((l) => i < l.length); i++) {
    for (const list of lists) if (list[i] !== undefined) out.push(list[i]);
  }
  return out;
}

/** The year's whole matter as an ordered queue, in [heavy, light] pairs. The
 *  day packer below serves the queue strictly in order (~2 steps/day), so the
 *  ORDER here is what shapes the days: each pair mixes one heavy subject
 *  (matemática/português) with one lighter one, and the heavies alternate
 *  across pairs (mat day, pt day, mat day…) so neither dominates a stretch.
 *  When one side runs out, the rest follows in its own alternation. Lessons
 *  without a body (em breve) are skipped; lessons already passed still enter —
 *  they just count as done. Existing plans keep their stored queue (the new
 *  pairing applies to NEW plans only — no migration).
 *
 *  Diagnostic front-load (§4.7) — a ONE-SHOT reorder at plan creation: when a
 *  mini-test of this year marked subjects WEAK (< WEAK_SUBJECT_PCT), their
 *  whole lesson lists open the queue — interleaved among themselves, weakest
 *  subject leading — before the normal heavy/light pairing of the rest. Days
 *  then stay inside the weak matter for a stretch: that IS the reinforcement.
 *  Stored queues are never rewritten. */
export function buildFeriasQueue(year: YearN, diag: Diagnostic | null = null): PlanStep[] {
  // Years 1–4 recover only the mandatory subjects; 5.º/6.º take everything.
  const subjects = mandatorySubjectsForYear(year);
  // Weak subject ids (weakest first) that actually belong to this year's plan.
  const weak = diag && diag.year === year
    ? weakSubjects(diag).filter((id) => subjects.some((s) => s.id === id))
    : [];
  const weakSet = new Set(weak);
  const lessonsOf = (s: Subject) => s.years[year].filter((l) => l.body);
  const listsOf = (heavy: boolean) =>
    subjects.filter((s) => !weakSet.has(s.id) && HEAVY_SUBJECTS.has(s.id) === heavy).map(lessonsOf);
  // 1.º ano: learning to READ is the year's real job, so the "Aprender a ler"
  // ladder (Saber de cor) joins the heavy side FIRST — day one starts on it,
  // and it then alternates with mat/pt like any other heavy subject.
  const heavySeq = interleave(year === 1 ? [readingTrack(), ...listsOf(true)] : listsOf(true));
  const lightSeq = interleave(listsOf(false));
  const weakSeq = interleave(weak.map((id) => lessonsOf(subjects.find((s) => s.id === id)!)));
  const steps: PlanStep[] = [];
  const push = (lesson?: Lesson) => {
    if (lesson) steps.push({ lessonId: lesson.id, minutes: lessonMinutes(lesson.body!) + TEST_MINUTES });
  };
  for (const lesson of weakSeq) push(lesson);
  for (let i = 0; i < Math.max(heavySeq.length, lightSeq.length); i++) {
    push(heavySeq[i]);
    push(lightSeq[i]);
  }
  return steps;
}

/** Turn the active plan into a PlanRecord (real % and minutes at `now`). */
function recordOf(plan: StudyPlan, progress: ProgressMap, now: number): PlanRecord {
  const p = feriasProgress(plan, progress, startOfDay(now));
  return {
    year: plan.year,
    startedAt: plan.startedAt,
    endedAt: now,
    pctDone: Math.round(p.pct * 100),
    minutesDone: p.doneMinutes,
    ...(plan.examPct != null ? { examPct: plan.examPct } : {}),
  };
}

/** Archive the ACTIVE year's plan into history and drop it from the per-year
 *  map (no-op without one). Used by "Terminar plano" and by the completion
 *  auto-archive in Plano — NOT by "Mudar de ano": switching keeps the plan. */
export function archiveFeriasPlan(progress: ProgressMap, now = Date.now()): void {
  const state = loadFeriasState();
  const active = activePlan(state);
  if (!active) return;
  const plans = { ...state.plans };
  delete plans[active.year];
  saveFeriasState({ activeYear: null, plans, history: [...state.history, recordOf(active, progress, now)] });
}

/** Make `year` the year being studied. A year with an existing plan simply
 *  RESUMES it (its queue and progress stayed put); a fresh year gets a new
 *  queue — shaped by the year's diagnostic when one was taken (§4.7; the
 *  reorder is one-shot, at creation). Nothing is archived — the other years'
 *  plans wait, untouched. */
export function startFeriasPlan(year: YearN, now = Date.now()): StudyPlan {
  const state = loadFeriasState();
  const plan: StudyPlan =
    state.plans[year] ?? { year, startedAt: now, queue: buildFeriasQueue(year, loadDiagnostic()), doneSteps: [] };
  saveFeriasState({ activeYear: year, plans: { ...state.plans, [year]: plan }, history: state.history });
  return plan;
}

/** 0–1 of a plan's queue minutes already done — the light version of
 *  feriasProgress (no day packing), for the year picker's "continuar (N%)". */
export function feriasPct(plan: StudyPlan, progress: ProgressMap): number {
  const done = doneStepIds(plan, progress);
  let doneMin = 0;
  let totalMin = 0;
  for (const s of plan.queue) {
    totalMin += s.minutes;
    if (done.has(s.lessonId)) doneMin += s.minutes;
  }
  return totalMin > 0 ? doneMin / totalMin : 1;
}

/** Did the child pass at least one of this plan's lessons WHILE it was
 *  active? Guards the completion auto-archive: a brand-new plan whose lessons
 *  were all passed BEFORE it existed (e.g. the 4.º ano started by a child who
 *  already did that year's tests) is born at 100% — archiving it on the very
 *  first render made "começar o 4.º ano" look like nothing happened. */
export function earnedDuringPlan(plan: StudyPlan, achievements: Achievement[]): boolean {
  const inQueue = new Set(plan.queue.map((s) => s.lessonId));
  return achievements.some((a) => a.at >= plan.startedAt && a.pct >= TEST_PASS_PCT && inQueue.has(a.lessonId));
}

/** Save an exam score (0–1): on the active plan if there is one, otherwise on
 *  the newest history record. Retakes keep the BEST score. */
export function recordExamPct(pct: number): void {
  const state = loadFeriasState();
  const active = activePlan(state);
  if (active) {
    const plan: StudyPlan = { ...active, examPct: Math.max(active.examPct ?? 0, pct) };
    saveFeriasState({ ...state, plans: { ...state.plans, [plan.year]: plan } });
    return;
  }
  const last = state.history[state.history.length - 1];
  if (!last) return;
  const updated: PlanRecord = { ...last, examPct: Math.max(last.examPct ?? 0, pct) };
  saveFeriasState({ ...state, history: [...state.history.slice(0, -1), updated] });
}

/** How many lessons a failed exam re-queues. */
const REQUEUE_COUNT = 6;

/** After a failed exam (<10/20): put the year's WEAKEST lessons (lowest best
 *  final-test score) back on the plan as redo steps. With an active plan of
 *  that year they join its queue; otherwise a small recovery plan is started. */
export function requeueWeakestLessons(progress: ProgressMap, now = Date.now()): void {
  const state = loadFeriasState();
  const active = activePlan(state);
  const year = active?.year ?? state.history[state.history.length - 1]?.year;
  if (!year) return;
  const weakest = mandatorySubjectsForYear(year) // same rule as the queue
    .flatMap((s) => s.years[year].filter((l) => l.body))
    .sort((a, b) => (progress[a.id]?.bestPct ?? 0) - (progress[b.id]?.bestPct ?? 0))
    .slice(0, REQUEUE_COUNT);
  const step = (l: { id: string; body?: string }): PlanStep => ({
    lessonId: l.id,
    minutes: lessonMinutes(l.body!) + TEST_MINUTES,
    redo: true,
    addedAt: now,
  });
  const cur = state.plans[year];
  let plan: StudyPlan;
  if (cur) {
    // Join that year's queue — but never duplicate a step that's still pending.
    const done = doneStepIds(cur, progress);
    const pending = new Set(cur.queue.filter((s) => !done.has(s.lessonId)).map((s) => s.lessonId));
    const fresh = weakest.filter((l) => !pending.has(l.id)).map(step);
    const queue = [...cur.queue.filter((s) => !fresh.some((f) => f.lessonId === s.lessonId)), ...fresh];
    const doneSteps = cur.doneSteps.filter((id) => !fresh.some((f) => f.lessonId === id));
    plan = { ...cur, queue, doneSteps };
  } else {
    plan = { year, startedAt: now, queue: weakest.map(step), doneSteps: [] };
  }
  // The redo steps make this year the one being studied again.
  saveFeriasState({ ...state, activeYear: year, plans: { ...state.plans, [year]: plan } });
}

/** The whole state (active plan + history), re-read when storage changes. */
export function useFeriasState(): FeriasState {
  const [state, setState] = useState<FeriasState>(loadFeriasState);
  useEffect(() => {
    const sync = () => setState(loadFeriasState());
    void store.ready.then(sync);
    return store.subscribe(FERIAS_KEY, sync);
  }, []);
  return state;
}

/** Short pt-PT line for one archived plan: "4.º ano · mai–jun · 100% · exame 16/20". */
export function planRecordLabel(r: PlanRecord): string {
  const month = (t: number) => new Date(t).toLocaleDateString("pt-PT", { month: "short" }).replace(".", "");
  const m0 = month(r.startedAt);
  const m1 = month(r.endedAt);
  const when = m0 === m1 ? m0 : `${m0}–${m1}`;
  const exam = r.examPct != null ? ` · exame ${Math.round(r.examPct * 20)}/20` : "";
  return `${yearLabel(r.year)} · ${when} · ${r.pctDone}%${exam}`;
}

/* ---- doneness (one rule, reused from progress) ------------------------ */

/** Queue steps whose lesson is done — recorded in doneSteps OR passed in
 *  progress (final test at >= TEST_PASS_PCT marks `done` there). REDO steps
 *  (re-queued by a failed exam) count via doneSteps only: their lesson was
 *  already passed once, so progress.done is stale for them — syncFeriasDone
 *  folds in only the passes that happened after they were queued. */
export function doneStepIds(plan: StudyPlan, progress: ProgressMap): Set<string> {
  const out = new Set<string>();
  for (const s of plan.queue) {
    if (plan.doneSteps.includes(s.lessonId) || (!s.redo && progress[s.lessonId]?.done)) out.add(s.lessonId);
  }
  return out;
}

/** Fold newly-passed lessons into the persisted done list (a redo step needs a
 *  PASS dated after it was queued). Called from the plan view; every other
 *  reader derives with doneStepIds and never writes. */
export function syncFeriasDone(plan: StudyPlan, progress: ProgressMap, achievements: Achievement[]): void {
  const done = doneStepIds(plan, progress);
  for (const s of plan.queue) {
    if (!s.redo || done.has(s.lessonId)) continue;
    if (achievements.some((a) => a.lessonId === s.lessonId && a.pct >= TEST_PASS_PCT && a.at >= (s.addedAt ?? 0))) {
      done.add(s.lessonId);
    }
  }
  if (done.size === plan.doneSteps.length && plan.doneSteps.every((id) => done.has(id))) return;
  // Re-load and write back into the SAME plan only (matched by year +
  // startedAt) — never let a stale `plan` argument leak its doneSteps into a
  // different year's plan that replaced it meanwhile.
  const state = loadFeriasState();
  const stored = state.plans[plan.year];
  if (!stored || stored.startedAt !== plan.startedAt) return;
  saveFeriasState({ ...state, plans: { ...state.plans, [plan.year]: { ...stored, doneSteps: [...done] } } });
}

/* ---- day packing (all derived) ---------------------------------------- */

/** The next calendar day, DST-safe (a plain `+ DAY` drifts off start-of-day
 *  when the clocks change; noon + startOfDay never does). */
const nextDay = (d: number): number => startOfDay(d + DAY * 1.5);

/** Pack one study day from `steps[from…]`: always at least one step, then more
 *  while the day stays near the 30-minute target (up to +8 of tolerance, so
 *  two ordinary lessons still share a day) AND within two subjects. Steps are
 *  never skipped — the front of the queue is served strictly in order. */
function packDay(steps: PlanStep[], from: number): PlanStep[] {
  const out: PlanStep[] = [];
  const subjects = new Set<string>();
  let minutes = 0;
  for (let i = from; i < steps.length; i++) {
    const s = steps[i];
    const subj = lessonMeta.get(s.lessonId)?.subjectId ?? "";
    // Full once the target is reached; below it, one more step may stretch the
    // day up to target + tolerance (but never beyond).
    const overTime = minutes >= DAY_TARGET_MIN || minutes + s.minutes > DAY_TARGET_MIN + DAY_TOLERANCE_MIN;
    const overSubjects = !subjects.has(subj) && subjects.size >= MAX_SUBJECTS_PER_DAY;
    if (out.length > 0 && (overTime || overSubjects)) break;
    out.push(s);
    subjects.add(subj);
    minutes += s.minutes;
  }
  return out;
}

export interface FeriasStep {
  step: PlanStep;
  /** passed TODAY (today's list stays stable and shows ticks as it fills) */
  done: boolean;
}

/** Plan lessons whose final test passed TODAY — they stay in place in today's
 *  list (ticked) instead of vanishing mid-day. */
function doneTodayIds(plan: StudyPlan, achievements: Achievement[], today: number): Set<string> {
  const inQueue = new Set(plan.queue.map((s) => s.lessonId));
  return new Set(
    achievements
      .filter((a) => a.pct >= TEST_PASS_PCT && startOfDay(a.at) === today && inQueue.has(a.lessonId))
      .map((a) => a.lessonId),
  );
}

/** Steps passed today but not already visible in today's packed chunk. These
 *  are "adiantadas": the child jumped ahead, so today must show the credit
 *  and future days must adapt around it. */
function todayExtraDoneSteps(plan: StudyPlan, chunk: PlanStep[], doneToday: Set<string>): PlanStep[] {
  const shown = new Set(chunk.map((s) => s.lessonId));
  return plan.queue.filter((s) => doneToday.has(s.lessonId) && !shown.has(s.lessonId));
}

/** The plan's NEW-MATTER steps for one day — derived, nothing stored. Today
 *  serves the front of the undone queue; future days show the projected
 *  continuation; past days return [] (the calendar shows real activity
 *  instead), and so do Saturdays — revision day has no new steps (its
 *  missions derive from the week in plan.ts). Steps already passed today
 *  stay in place with done=true. */
export function feriasStepsForDay(
  plan: StudyPlan,
  progress: ProgressMap,
  achievements: Achievement[],
  day: number,
  today: number,
): FeriasStep[] {
  if (day < today || !isNewMatterDay(day)) return [];
  const done = doneStepIds(plan, progress);
  const doneToday = doneTodayIds(plan, achievements, today);
  const servingToday = plan.queue.filter((s) => !done.has(s.lessonId) || doneToday.has(s.lessonId));
  const todayChunk = packDay(servingToday, 0);
  const todaySteps = [...todayChunk, ...todayExtraDoneSteps(plan, todayChunk, doneToday)];
  if (day === today) {
    return todaySteps.map((step) => ({ step, done: doneToday.has(step.lessonId) }));
  }
  const scheduledToday = new Set(todayChunk.map((s) => s.lessonId));
  const serving = plan.queue.filter((s) => !done.has(s.lessonId) && !scheduledToday.has(s.lessonId));
  let from = 0;
  for (let d = nextDay(today); d <= day && from < serving.length; d = nextDay(d)) {
    if (!isNewMatterDay(d)) continue;
    const chunk = packDay(serving, from);
    if (d === day) return chunk.map((step) => ({ step, done: false }));
    from += chunk.length;
  }
  return [];
}

/* ---- the full day-by-day projection ("Plano completo", #/plano/completo) -- */

export interface PlanDay {
  /** 1-based "Dia N" within the plan */
  n: number;
  /** start-of-day epoch of the (planned) date */
  date: number;
  steps: { step: PlanStep; state: "done" | "today" | "future" }[];
}

/** The WHOLE plan as a list of days: the matter already done packed from the
 *  start date (the planned layout of the finished part), then the serving
 *  queue packed from today — same packing rule as feriasStepsForDay, computed
 *  in one pass instead of per-day. A lesson done ahead of its place never
 *  blocks the front: done steps simply leave the serving queue and the
 *  remaining days re-pack. Derived, nothing stored. */
export function feriasFullSchedule(
  plan: StudyPlan,
  progress: ProgressMap,
  achievements: Achievement[],
  today: number,
): PlanDay[] {
  const done = doneStepIds(plan, progress);
  const doneToday = doneTodayIds(plan, achievements, today);
  const days: PlanDay[] = [];
  const pack = (steps: PlanStep[], start: number, state: (s: PlanStep, day: number) => "done" | "today" | "future") => {
    let from = 0;
    for (let d = start; from < steps.length; d = nextDay(d)) {
      if (!isNewMatterDay(d)) continue;
      const chunk = packDay(steps, from);
      days.push({ n: days.length + 1, date: d, steps: chunk.map((step) => ({ step, state: state(step, d) })) });
      from += chunk.length;
    }
  };
  // Behind: what's already done (today's passes stay in today's list below).
  pack(
    plan.queue.filter((s) => done.has(s.lessonId) && !doneToday.has(s.lessonId)),
    startOfDay(plan.startedAt),
    () => "done",
  );
  // Today: the planned front of the queue PLUS anything extra passed today.
  const servingToday = plan.queue.filter((s) => !done.has(s.lessonId) || doneToday.has(s.lessonId));
  const todayChunk = packDay(servingToday, 0);
  const todaySteps = [...todayChunk, ...todayExtraDoneSteps(plan, todayChunk, doneToday)];
  if (todaySteps.length && isNewMatterDay(today)) {
    days.push({
      n: days.length + 1,
      date: today,
      steps: todaySteps.map((step) => ({ step, state: doneToday.has(step.lessonId) ? "done" : "today" })),
    });
  }
  // Ahead: project as if today's planned front is being handled today, while
  // today's extra done steps simply disappear from the future.
  const scheduledToday = new Set(todayChunk.map((s) => s.lessonId));
  pack(
    plan.queue.filter((s) => !done.has(s.lessonId) && !scheduledToday.has(s.lessonId)),
    nextDay(today),
    () => "future",
  );
  return days;
}

/** Index a schedule by date (date → PlanDay) — shared by the full-plan month
 *  grids and the #/plano calendar. Matter done AHEAD of pace can (rarely) pack
 *  the done part onto the same date the serving queue restarts from — merge. */
export function planDaysByDate(days: PlanDay[]): Map<number, PlanDay> {
  const m = new Map<number, PlanDay>();
  for (const d of days) {
    const cur = m.get(d.date);
    m.set(d.date, cur ? { ...cur, steps: [...cur.steps, ...d.steps] } : d);
  }
  return m;
}

/* ---- progress helpers (week N, percent, pace, finish date) ------------ */

export interface FeriasProgress {
  /** 0–1 of the queue's minutes already done */
  pct: number;
  /** calendar week of the plan, 1-based */
  week: number;
  /** the real horizon: ceil(packed study days / 5). Derived from the SAME day
   *  packer as `finishAt`, so the header and the fim previsto always agree. */
  totalWeeks: number;
  /** projected finish day (start-of-day epoch), or null when all done */
  finishAt: number | null;
  /** study days behind (+) / ahead (−) of the planned pace; 0 = on pace */
  behindDays: number;
  doneMinutes: number;
  totalMinutes: number;
}

/** New-matter days (Mon–Fri) from `from` up to but NOT including `to`. */
function studyDaysBetween(from: number, to: number): number {
  let n = 0;
  for (let d = from; d < to; d = nextDay(d)) if (isNewMatterDay(d)) n++;
  return n;
}

export function feriasProgress(plan: StudyPlan, progress: ProgressMap, today: number): FeriasProgress {
  const done = doneStepIds(plan, progress);
  let doneMinutes = 0;
  let totalMinutes = 0;
  for (const s of plan.queue) {
    totalMinutes += s.minutes;
    if (done.has(s.lessonId)) doneMinutes += s.minutes;
  }
  const start = startOfDay(plan.startedAt);
  const week = Math.max(1, Math.floor((today - start) / (7 * DAY)) + 1);

  // Planned pace: pack the FULL queue from the start date; the study day each
  // step was planned for tells how far the front of the queue should be by now.
  const plannedDay = new Map<string, number>();
  let from = 0;
  let dayIdx = 0;
  for (let d = start; from < plan.queue.length; d = nextDay(d)) {
    if (!isNewMatterDay(d)) continue;
    const chunk = packDay(plan.queue, from);
    for (const s of chunk) plannedDay.set(s.lessonId, dayIdx);
    from += chunk.length;
    dayIdx++;
  }
  // The horizon comes from the packed days themselves (NOT a minutes/week
  // division): the packer is what actually schedules, so "semana N de M" and
  // the projected finish below can never disagree.
  const totalWeeks = Math.max(1, Math.ceil(dayIdx / STUDY_DAYS_PER_WEEK));
  const front = plan.queue.find((s) => !done.has(s.lessonId));
  const elapsed = studyDaysBetween(start, today);
  const behindDays = front ? elapsed - (plannedDay.get(front.lessonId) ?? 0) : 0;

  // Projected finish: the remaining steps packed from today over study days.
  let finishAt: number | null = null;
  if (front) {
    const remaining = plan.queue.filter((s) => !done.has(s.lessonId));
    let i = 0;
    for (let d = today; i < remaining.length; d = nextDay(d)) {
      if (!isNewMatterDay(d)) continue;
      i += packDay(remaining, i).length;
      finishAt = d;
    }
  }
  return {
    pct: totalMinutes > 0 ? doneMinutes / totalMinutes : 1,
    week,
    totalWeeks,
    finishAt,
    behindDays,
    doneMinutes,
    totalMinutes,
  };
}

/** Short pt-PT status line — shared by the child's strip (#/plano) and the
 *  parents' card (#/pais), so both read the plan the same way. */
export function feriasStatusLine(p: FeriasProgress): string {
  const pct = Math.round(p.pct * 100);
  const ritmo =
    p.behindDays > 0
      ? `${p.behindDays} ${p.behindDays === 1 ? "dia atrasado" : "dias atrasado"}, sem stress`
      : p.behindDays < 0
        ? `${-p.behindDays} ${p.behindDays === -1 ? "dia adiantado" : "dias adiantado"}`
        : "no ritmo certo";
  return `Semana ${Math.min(p.week, p.totalWeeks)} de ${p.totalWeeks} · ${pct}% da matéria · ${ritmo}`;
}

/** "Plano cumprido" for the parents' week grade (§4.11) when the férias plan
 *  is active: minutes of plan steps passed inside the window vs. the window's
 *  planned minutes (study days × 30, capped at what the queue still held). */
export function feriasPlanPart(
  plan: StudyPlan,
  achievements: Achievement[],
  windowStart: number,
  today: number,
): { done: number; total: number } {
  const start = Math.max(windowStart, startOfDay(plan.startedAt));
  let total = studyDaysBetween(start, nextDay(today)) * DAILY_TARGET_MINUTES;

  const minutes = new Map(plan.queue.map((s) => [s.lessonId, s.minutes]));
  const passedBefore = new Set(
    achievements.filter((a) => a.at < start && a.pct >= TEST_PASS_PCT).map((a) => a.lessonId),
  );
  let remainingAtStart = 0;
  for (const s of plan.queue) if (!passedBefore.has(s.lessonId)) remainingAtStart += s.minutes;
  total = Math.min(total, remainingAtStart);

  const passed = new Set<string>();
  let done = 0;
  for (const a of achievements) {
    if (a.at < start || a.pct < TEST_PASS_PCT || passed.has(a.lessonId)) continue;
    const m = minutes.get(a.lessonId);
    if (m == null || passedBefore.has(a.lessonId)) continue;
    passed.add(a.lessonId);
    done += m;
  }
  return { done: Math.min(done, total), total };
}
