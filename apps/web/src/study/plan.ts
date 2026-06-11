import { lessonMeta, schoolSubjects, subjectsForYear, type YearN } from "../content/curriculum";
import { TEST_PASS_PCT, type Achievement, type ProgressMap } from "../progress";
import { DAY, isRestDay, startOfDay, aggregateByDay } from "./calendar";
import { feriasStepsForDay, isRevisionDay, type StudyPlan } from "./ferias";
import type { ReviewItem } from "./review";
import { tpcDueLabel, tpcLessonDone, type Tpc } from "./tpc";

/* ------------------------------------------------------------------ *
 * The daily plan (PLANO-ESTUDO §4.9, user decisions 2026-06-10):
 * ~30 min/day Monday–Saturday, Sunday rest. A day's plan is 2–4
 * MISSIONS derived — pure functions, nothing stored — from:
 *   1. failed final tests ("a repetir": < 80%, not passed since),
 *   2. due questions in the error bank ("rever", §4.2),
 *   3. lessons started but not finished (history + progress),
 *   4. the weakest / least-recently-studied school subject of the
 *      child's year (a fresh lesson there).
 * Future days run the same generator with a per-day rotation so the
 * calendar can show what's PLANNED ahead.
 * ------------------------------------------------------------------ */

/** Rough size of one mission, so 2–4 missions ≈ the daily target. */
export const MISSION_MINUTES = 10;

export { isRestDay, DAILY_TARGET_MINUTES } from "./calendar";

export interface Mission {
  id: string;
  kind: "repetir" | "rever" | "continuar" | "nova" | "tpc";
  lessonId: string;
  subjectId: string;
  /** child-facing pt-PT headline */
  title: string;
  /** small supporting line */
  detail: string;
  /** read-aloud text (title + detail, child phrasing) */
  say: string;
  color: string;
  emoji: string;
  minutes: number;
  /** done that day (a passed final test on this lesson) */
  done: boolean;
}

/** The child's school year, inferred from where they actually work (mode of
 *  the school-subject lessons in history + achievements). Defaults to 1. */
export function inferYear(history: string[], achievements: Achievement[]): YearN {
  const school = new Set(schoolSubjects.map((s) => s.id));
  const votes = new Map<YearN, number>();
  const vote = (lessonId: string, weight: number) => {
    const m = lessonMeta.get(lessonId);
    if (!m || !school.has(m.subjectId)) return;
    votes.set(m.year, (votes.get(m.year) ?? 0) + weight);
  };
  for (const id of history) vote(id, 1);
  for (const a of achievements.slice(0, 30)) vote(a.lessonId, 2); // tests weigh more
  let best: YearN = 1;
  let n = 0;
  for (const [y, v] of votes) if (v > n) { best = y; n = v; }
  return best;
}

/** Lessons whose LAST final attempt failed (< 80%) and that are still not
 *  passed — the "a repetir" queue, most recent attempt first. */
export function repetirLessons(progress: ProgressMap, achievements: Achievement[]): Achievement[] {
  const seen = new Set<string>();
  const out: Achievement[] = [];
  for (const a of achievements) { // newest first → first hit is the last attempt
    if (seen.has(a.lessonId)) continue;
    seen.add(a.lessonId);
    if (a.pct < TEST_PASS_PCT && !progress[a.lessonId]?.done) out.push(a);
  }
  return out;
}

/** School subjects of `year` ordered weakest-first: least-recent activity,
 *  then lowest average test score. Pure; used to pick the "nova" mission. */
function subjectsByNeed(year: YearN, achievements: Achievement[]) {
  const lastAt = new Map<string, number>();
  const sum = new Map<string, { pct: number; n: number }>();
  for (const a of achievements) {
    if (a.year !== year) continue;
    lastAt.set(a.subjectId, Math.max(lastAt.get(a.subjectId) ?? 0, a.at));
    const s = sum.get(a.subjectId) ?? { pct: 0, n: 0 };
    s.pct += a.pct;
    s.n += 1;
    sum.set(a.subjectId, s);
  }
  const school = new Set(schoolSubjects.map((s) => s.id));
  return subjectsForYear(year)
    .filter((s) => school.has(s.id))
    .sort((a, b) => {
      const la = lastAt.get(a.id) ?? 0;
      const lb = lastAt.get(b.id) ?? 0;
      if (la !== lb) return la - lb; // least recent first
      const pa = sum.get(a.id)?.n ? sum.get(a.id)!.pct / sum.get(a.id)!.n : 0.5;
      const pb = sum.get(b.id)?.n ? sum.get(b.id)!.pct / sum.get(b.id)!.n : 0.5;
      return pa - pb; // weakest first
    });
}

function mission(kind: Mission["kind"], lessonId: string, title: string, detail: string, done: boolean, minutes = MISSION_MINUTES): Mission | null {
  const m = lessonMeta.get(lessonId);
  if (!m) return null;
  return {
    id: `${kind}:${lessonId}`,
    kind,
    lessonId,
    subjectId: m.subjectId,
    title,
    detail,
    say: `${title}. ${detail}`,
    color: m.color,
    emoji: m.emoji,
    minutes,
    done,
  };
}

/** One "rever" mission for the lesson with the most error-bank questions due
 *  by `day` (§4.2) — shared by the weekday generator and Saturday revision.
 *  It opens the lesson; answering its quizzes right reschedules the items. */
function reviewMission(reviews: ReviewItem[], day: number, used: Set<string>, isDone: (id: string) => boolean): Mission | null {
  const due = new Map<string, number>();
  for (const r of reviews) {
    if (r.nextAt < day + DAY && lessonMeta.has(r.lessonId) && !used.has(r.lessonId)) {
      due.set(r.lessonId, (due.get(r.lessonId) ?? 0) + 1);
    }
  }
  let topId: string | null = null;
  let topN = 0;
  for (const [id, n] of due) if (n > topN) { topId = id; topN = n; }
  if (!topId) return null;
  const m = lessonMeta.get(topId)!;
  const qs = topN === 1 ? "1 pergunta" : `${topN} perguntas`;
  return mission("rever", topId, `Corrigir os erros: ${m.title}`, `Tens ${qs} para vencer — abre a lição e treina.`, isDone(topId));
}

/** Saturday = the férias plan's REVISION day (user decision 2026-06-11): the
 *  packer schedules no new matter on it (ferias.ts isNewMatterDay), so its
 *  1–2 light missions DERIVE from the week itself — re-take the week's
 *  weakest final test, and beat the error bank's due questions. A week with
 *  nothing to revise leaves Saturday free. */
function feriasSaturdayMissions(
  day: number,
  achievements: Achievement[],
  reviews?: ReviewItem[],
): Mission[] {
  const out: Mission[] = [];
  const used = new Set<string>();
  // Passed THIS Saturday → the mission shows its tick instead of vanishing.
  const isDone = (id: string) =>
    achievements.some((a) => a.lessonId === id && a.pct >= TEST_PASS_PCT && startOfDay(a.at) === day);

  // 1. The week's weakest final test (lowest %, Mon–Fri before this Saturday) —
  //    even a passed one is worth a confidence re-run if it was the hardest.
  const weekStart = day - 5 * DAY;
  let weakest: Achievement | null = null;
  for (const a of achievements) {
    if (a.at < weekStart || a.at >= day || !lessonMeta.has(a.lessonId)) continue;
    if (!weakest || a.pct < weakest.pct) weakest = a;
  }
  if (weakest) {
    used.add(weakest.lessonId);
    const m = mission(
      "repetir",
      weakest.lessonId,
      `Rever o teste: ${weakest.lessonTitle}`,
      "Sábado é dia de revisão — repete o teste que custou mais esta semana.",
      isDone(weakest.lessonId),
    );
    if (m) out.push(m);
  }

  // 2. Due questions in the error bank, same rule as the weekday generator.
  if (reviews?.length) {
    const m = reviewMission(reviews, day, used, isDone);
    if (m) out.push(m);
  }
  return out;
}

/** The férias plan's steps for one day, as the day's missions — lesson + its
 *  final test, same day (§4.8). Each step keeps its own estimated minutes.
 *  Saturdays get revision missions instead of new matter. */
function feriasMissions(
  ferias: StudyPlan,
  day: number,
  today: number,
  progress: ProgressMap,
  achievements: Achievement[],
  reviews?: ReviewItem[],
): Mission[] {
  if (isRevisionDay(day)) return feriasSaturdayMissions(day, achievements, reviews);
  const out: Mission[] = [];
  for (const { step, done } of feriasStepsForDay(ferias, progress, achievements, day, today)) {
    const m = lessonMeta.get(step.lessonId);
    if (!m) continue;
    const p = progress[step.lessonId];
    // A redo step (re-queued by a failed exame final, §4.8) is a REVIEW; a
    // failed attempt re-opens the TEST straight away; a started lesson
    // continues; anything else is fresh. (The review bank keeps scheduling
    // the wrong questions on its own — §4.2.)
    const repeat = !step.redo && !!p && p.bestPct > 0 && !p.done;
    const kind: Mission["kind"] = step.redo ? "rever" : repeat ? "repetir" : p?.visited && !p.done ? "continuar" : "nova";
    const title =
      kind === "rever" ? `Rever e repetir: ${m.title}`
      : repeat ? `Repetir o teste: ${m.title}`
      : kind === "continuar" ? `Continuar: ${m.title}`
      : `Lição e teste: ${m.title}`;
    const detail =
      kind === "rever" ? "O exame mostrou que vale a pena rever — relê e repete o teste."
      : repeat ? "Estás quase! Com 80% ou mais fica concluída."
      : kind === "continuar" ? "Volta onde ficaste e acaba com o teste."
      : "Aprende com calma e termina com o teste — tudo hoje.";
    const built = mission(kind, step.lessonId, title, detail, done, step.minutes);
    if (built) out.push(built);
  }
  return out;
}

/** Open TPCs (§4.12) as PRIORITY missions — one per still-undone lesson,
 *  served ABOVE the day's own plan with the --warn accent. They show from
 *  today until done; an overdue TPC stays visible ("em atraso") with gentle
 *  copy. Future days only show TPCs still due by then, so the calendar's
 *  projection reads honestly. */
function tpcMissions(tpcs: Tpc[], day: number, today: number, achievements: Achievement[]): Mission[] {
  const out: Mission[] = [];
  const seen = new Set<string>();
  for (const t of tpcs) {
    if (t.doneAt != null) continue;
    if (day > today && t.dueDate < day) continue; // already past due on that future day
    const due = tpcDueLabel(t.dueDate, today);
    const overdue = t.dueDate < today;
    for (const lessonId of t.lessonIds) {
      const meta = lessonMeta.get(lessonId);
      if (!meta || seen.has(lessonId)) continue;
      seen.add(lessonId);
      const m = mission(
        "tpc",
        lessonId,
        `TPC ${due}: ${meta.title}`,
        overdue
          ? "Passou do prazo, sem stress — ainda vais a tempo. Termina com o teste."
          : "Marcado pelos teus pais. Termina com o teste a 80% ou mais.",
        tpcLessonDone(t, lessonId, achievements),
      );
      if (m) out.push(m);
    }
  }
  return out;
}

/** The 2–4 missions for one day. `day`/`today` are startOfDay epochs; for a
 *  future day the generator rotates its picks so each day looks different.
 *  Sunday returns [] — it's rest. `reviews` (the error bank, §4.2) is optional
 *  so derived-only callers (e.g. study/grade.ts) can stay storage-free.
 *  An active férias plan (§4.8) REPLACES the derived missions — this is the
 *  one place that decides which plan feeds the day. Open TPCs (§4.12) come
 *  FIRST either way: the parents' homework outranks the day's own plan. */
export function missionsForDay(
  day: number,
  today: number,
  progress: ProgressMap,
  achievements: Achievement[],
  history: string[],
  reviews?: ReviewItem[],
  ferias?: StudyPlan | null,
  tpcs?: Tpc[],
): Mission[] {
  if (isRestDay(day)) return [];
  const priority = tpcs?.length ? tpcMissions(tpcs, day, today, achievements) : [];
  const tpcIds = new Set(priority.map((m) => m.lessonId));
  if (ferias) {
    const plan = feriasMissions(ferias, day, today, progress, achievements, reviews);
    return [...priority, ...plan.filter((m) => !tpcIds.has(m.lessonId))];
  }
  const byDay = aggregateByDay(achievements);
  const dayTests = byDay.get(day);
  const passedToday = new Set((dayTests?.items ?? []).filter((a) => a.pct >= TEST_PASS_PCT).map((a) => a.lessonId));
  const isDone = (lessonId: string) => passedToday.has(lessonId);
  // How far into the future this day is — rotates the picks for planned days.
  const shift = Math.max(0, Math.round((day - today) / DAY));

  const out: Mission[] = [];
  const used = new Set<string>(tpcIds); // a TPC lesson never doubles up below
  // TPC missions already fill part of the ~30-minute day — shrink the derived
  // quota so homework days don't balloon (still at least 2 of the day's own).
  const cap = Math.max(2, 4 - priority.length);
  const push = (m: Mission | null) => {
    if (m && !used.has(m.lessonId) && out.length < cap) {
      used.add(m.lessonId);
      out.push(m);
    }
  };

  // 1. Repeat failed tests (max 2) — they gate "concluída", so they come first.
  const repetir = repetirLessons(progress, achievements);
  for (const a of repetir.slice(shift, shift + 2)) {
    push(mission("repetir", a.lessonId, `Repetir o teste: ${a.lessonTitle}`, "Estás quase! Com 80% ou mais fica concluída.", isDone(a.lessonId)));
  }

  // 2. Beat the due questions in the error bank (§4.2): one mission for the
  //    lesson with the most questions due BY this day.
  if (reviews?.length) push(reviewMission(reviews, day, used, isDone));

  // 3. Continue a started-but-unfinished lesson (max 1, most recent first).
  const started = history.filter((id) => {
    const p = progress[id];
    const m = lessonMeta.get(id);
    return !!m && !!p?.visited && !p.done && !used.has(id);
  });
  const cont = started[shift % Math.max(1, started.length)] ?? started[0];
  if (cont) {
    const m = lessonMeta.get(cont)!;
    push(mission("continuar", cont, `Continuar: ${m.title}`, "Volta onde ficaste e acaba com o teste.", isDone(cont)));
  }

  // 4. Fill to at least 2 (at most 3) with fresh lessons from the subjects
  //    that need the most love, in the child's year. For a future day the
  //    pick index advances with `shift`, so each planned day differs.
  const year = inferYear(history, achievements);
  for (const subject of subjectsByNeed(year, achievements)) {
    if (out.length >= Math.min(3, cap)) break;
    const fresh = subject.years[year].filter((l) => l.body && !progress[l.id]?.done && !used.has(l.id));
    const l = fresh[shift % Math.max(1, fresh.length)] ?? fresh[0];
    if (l) push(mission("nova", l.id, `Lição nova: ${l.title}`, `${subject.label} — aprende e faz o teste.`, isDone(l.id)));
  }
  return [...priority, ...out];
}
