import { useEffect, useMemo, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "@sprout/ui";
import { useProgress, TEST_PASS_PCT, type Achievement, type ProgressMap } from "../progress";
import { useSessions, type StudySession } from "./sessions";
import {
  startOfDay,
  isRestDay,
  monthIndex,
  aggregateByDay,
  aggregateSessionsByDay,
  dayState,
  minutesOf,
  GOOD_DAY_SECS,
} from "./calendar";
import { missionsForDay, planReasonForMissions, DAILY_TARGET_MINUTES, type Mission, type PlanReason } from "./plan";
import {
  useFeriasState,
  activePlan,
  startFeriasPlan,
  archiveFeriasPlan,
  syncFeriasDone,
  earnedDuringPlan,
  feriasFullSchedule,
  feriasPct,
  feriasProgress,
  feriasStatusLine,
  planRecordLabel,
  planDaysByDate,
  isRevisionDay,
  EXAM_READY_PCT,
  type PlanDay,
  type StudyPlan,
  type PlanRecord,
} from "./ferias";
import { PlanDayMarks, planDayMinutes } from "./PlanoCompleto";
import { ExameModal, DiagnosticoModal, buildDiagnostico } from "../Simulado";
import { useReview, dueByLesson } from "./review";
import { useTpcs, syncTpcs } from "./tpc";
import { lessonMeta, YEARS, yearLabel, type YearN } from "../content/curriculum";
import { Mascot } from "../Mascot";
import { ProgressBar, YEAR_STYLE } from "../ui";
import type { View } from "../nav";

/* ------------------------------------------------------------------ *
 * "O meu plano" (#/plano) — the child's page (PLANO-ESTUDO §4.9).
 * Today's 2–4 missions as big tappable cards (Sunday = rest), then the
 * study calendar: one month back, the current one and two ahead. All
 * DERIVED from progress + achievements + sessions at render time.
 * ------------------------------------------------------------------ */

const WEEKDAYS = ["S", "T", "Q", "Q", "S", "S", "D"]; // Monday-first

/** Navigate to a mission's target: failed tests reopen the TEST screen
 *  directly; everything else (including "rever" — beat the due questions by
 *  redoing the lesson's quizzes) opens the lesson. */
function missionView(m: Mission): View | null {
  const meta = lessonMeta.get(m.lessonId);
  if (!meta) return null;
  const kind = m.kind === "repetir" ? "test" : "lesson";
  return { kind, year: meta.year, subjectId: meta.subjectId, lessonId: m.lessonId };
}

function MissionCards({ missions, onGo }: { missions: Mission[]; onGo: (v: View) => void }) {
  return (
    <div className="plan-missions">
      {missions.map((m, i) => (
        <div key={m.id} className={`plan-mission ${m.done ? "is-done" : ""} ${m.kind === "tpc" ? "is-tpc" : ""}`} style={{ ["--c" as string]: m.color }}>
          <button
            className="plan-mission__btn"
            onClick={() => {
              const v = missionView(m);
              if (v) onGo(v);
            }}
          >
            {/* a TPC (§4.12) is the parents' homework — it wears the backpack,
                not a number, and the --warn accent (see kids.css .is-tpc) */}
            <span className="plan-mission__num">
              {m.done ? <Icon name="check" size={22} /> : m.kind === "tpc" ? <Icon name="backpack" size={20} /> : i + 1}
            </span>
            <span className="plan-mission__emoji" aria-hidden>{m.emoji}</span>
            <span className="plan-mission__tx">
              <strong>{m.title}</strong>
              <span>{m.done ? "Feita! Boa!" : m.detail}</span>
            </span>
            <span className="plan-mission__min">{m.done ? "" : `≈ ${m.minutes} min`}</span>
          </button>
          <Speaker text={m.done ? `${m.title}. Já está feita, boa!` : m.say} className="plan-mission__say" size={18} label={`Ouvir: ${m.title}`} />
        </div>
      ))}
    </div>
  );
}

/* ---- "Banco de erros" — the due-questions card (§4.2) ---------------- */

/** A small card shown when error-bank questions are due: how many there are,
 *  read aloud, tapping opens the short review page. */
function ReviewBankCard({ due, onGo }: { due: Map<string, number>; onGo: (v: View) => void }) {
  let total = 0;
  let topId: string | null = null;
  let topN = 0;
  for (const [id, n] of due) {
    total += n;
    if (n > topN) { topId = id; topN = n; }
  }
  if (total === 0 || !topId) return null;
  const meta = lessonMeta.get(topId)!;
  const msg = total === 1 ? "Tens 1 pergunta para vencer hoje!" : `Tens ${total} perguntas para vencer hoje!`;
  return (
    <div className="plan-review">
      <button
        className="plan-review__btn"
        onClick={() => onGo({ kind: "review" })}
      >
        <span className="plan-review__ic"><Icon name="target" size={24} /></span>
        <span className="plan-review__tx">
          <strong>Banco de erros</strong>
          <span>{msg} Começa por «{meta.title}».</span>
        </span>
        <Icon name="forward" size={18} />
      </button>
      <Speaker
        text={`Banco de erros. ${msg} Começa pela lição ${meta.title}.`}
        className="plan-review__say"
        size={18}
        label="Ouvir: banco de erros"
      />
    </div>
  );
}

/* ---- "Plano de férias" — recover a whole year (§4.8) ----------------- */

/** Shown while there is NO active férias plan: pick a year, hear the rules,
 *  start. A year that already has a (paused) plan offers "continuar (N%)"
 *  instead of starting over — its queue and progress stayed put. Starting is
 *  a two-tap flow (select the year, then confirm) so a stray tap never kicks
 *  off six weeks of plan. A FRESH year also offers the optional diagnostic
 *  mini-test (§4.7) — never forced; its result front-loads the weak subjects
 *  in the new queue (a resumed plan keeps its stored queue, so no offer). */
function FeriasOfferCard({
  plans,
  progress,
  onStart,
}: {
  plans: Partial<Record<YearN, StudyPlan>>;
  progress: ProgressMap;
  onStart: (year: YearN) => void;
}) {
  const [year, setYear] = useState<YearN | null>(null);
  const [diagOpen, setDiagOpen] = useState(false);
  const pctOf = (y: YearN) => {
    const p = plans[y];
    return p ? Math.round(feriasPct(p, progress) * 100) : null;
  };
  // Only offer the mini-test when the year has enough questions to build one.
  const canDiag = useMemo(
    () => year != null && pctOf(year) == null && buildDiagnostico(year).length > 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [year, plans],
  );
  const explain =
    "Escolhe um ano e eu preparo um plano dia a dia: de segunda a sexta há matéria nova, cerca de trinta minutos por dia. Ao sábado revês o que custou mais na semana, e ao domingo descansas. Se falhares um dia, a matéria espera por ti. Cada ano tem o seu próprio plano — podes mudar de ano e voltar onde ficaste.";
  return (
    <div className="plan-ferias">
      <div className="plan-ferias__head">
        <span className="plan-ferias__ic"><Icon name="sun" size={24} /></span>
        <div>
          <strong>Plano de férias — recuperar um ano inteiro</strong>
          <p>
            Seg–sex matéria nova (~30 min/dia); sábado é dia de revisão;
            domingo é descanso. Cada ano tem o seu plano — podes mudar e
            voltar onde ficaste. Escolhe o teu ano para começar.
          </p>
        </div>
      </div>
      <Speaker text={`Plano de férias. ${explain}`} className="plan-ferias__say" size={18} label="Ouvir: plano de férias" />
      <div className="plan-ferias__years">
        {YEARS.map((y) => {
          const pct = pctOf(y);
          return (
            <button
              key={y}
              className={`plan-ferias__year ${year === y ? "is-sel" : ""}`}
              style={{ ["--c" as string]: YEAR_STYLE[y].color }}
              onClick={() => setYear(y)}
            >
              {yearLabel(y)}{pct != null ? ` · ${pct}%` : ""}
            </button>
          );
        })}
      </div>
      {year != null && (
        <div className="plan-ferias__go">
          <button className="plan-ferias__start" onClick={() => onStart(year)}>
            <Icon name="forward" size={18} />{" "}
            {pctOf(year) != null
              ? `Continuar o plano do ${yearLabel(year)} (${pctOf(year)}%)`
              : `Começar o plano do ${yearLabel(year)}`}
          </button>
          {canDiag && (
            <button className="plan-ferias__start plan-ferias__diag" onClick={() => setDiagOpen(true)}>
              <Icon name="target" size={18} /> Queres fazer um mini-teste primeiro? (5 min)
            </button>
          )}
        </div>
      )}
      {diagOpen && year != null && (
        <DiagnosticoModal
          year={year}
          onClose={() => setDiagOpen(false)}
          onStart={() => {
            // The result was just saved — startFeriasPlan picks it up (§4.7).
            setDiagOpen(false);
            onStart(year);
          }}
        />
      )}
    </div>
  );
}

function todayAdvanceLine(plan: StudyPlan, progress: ProgressMap, achievements: Achievement[], today: number): string | null {
  const todayPlan = feriasFullSchedule(plan, progress, achievements, today).find((d) => d.date === today);
  const advanced = todayPlan?.steps.filter((s) => s.state === "advanced") ?? [];
  if (advanced.length === 0) return null;
  const n = advanced.length;
  const title = n === 1 ? lessonMeta.get(advanced[0].step.lessonId)?.title : null;
  return n === 1 && title
    ? `Fizeste "${title}" adiantada; o plano já ajustou os próximos dias.`
    : `Fizeste ${n} lições adiantadas; o plano já ajustou os próximos dias.`;
}

/** The active plan's progress strip: week N of M, % of the matter, pace —
 *  plus discreet "Terminar plano" / "Mudar de ano", each with inline confirm.
 *  Switching KEEPS this year's plan (one plan per year — §4.8); only
 *  "Terminar plano" archives it into the history. */
function FeriasStrip({
  plan,
  plans,
  progress,
  achievements,
  today,
  onEnd,
  onSwitch,
  onFull,
  reason,
}: {
  plan: StudyPlan;
  plans: Partial<Record<YearN, StudyPlan>>;
  progress: ProgressMap;
  achievements: Achievement[];
  today: number;
  reason: PlanReason | null;
  onEnd: () => void;
  onSwitch: (year: YearN) => void;
  onFull: () => void;
}) {
  const [confirm, setConfirm] = useState<"end" | "switch" | null>(null);
  const p = feriasProgress(plan, progress, today);
  const line = feriasStatusLine(p);
  const advanceLine = useMemo(() => todayAdvanceLine(plan, progress, achievements, today), [plan, progress, achievements, today]);
  const finish = p.finishAt
    ? `Fim previsto: ${new Date(p.finishAt).toLocaleDateString("pt-PT", { day: "numeric", month: "long" })}.`
    : "Matéria toda concluída — és incrível!";
  return (
    <div className="plan-ferias plan-ferias--active">
      <div className="plan-ferias__head">
        <span className="plan-ferias__ic"><Icon name="sun" size={24} /></span>
        <div>
          <strong>Plano de férias · {yearLabel(plan.year)}</strong>
          <p>{line}. {finish}</p>
          {advanceLine && <p className="plan-ferias__adapt">{advanceLine}</p>}
          {reason && <p className={`plan-ferias__adapt is-${reason.kind}`}>{reason.text}</p>}
        </div>
      </div>
      <Speaker
        text={`Plano de férias do ${yearLabel(plan.year)}. ${line}. ${finish} ${advanceLine ?? ""} ${reason?.say ?? ""}`}
        className="plan-ferias__say"
        size={18}
        label="Ouvir: plano de férias"
      />
      <div className="plan-ferias__bar">
        <ProgressBar pct={p.pct} color="var(--primary)" />
      </div>
      <button className="plan-ferias__start plan-ferias__full" onClick={onFull}>
        <Icon name="calendar" size={18} /> Ver o plano completo
      </button>
      <div className="plan-ferias__end">
        {confirm === "end" ? (
          <>
            <span>Terminar o plano? Fica guardado no histórico.</span>
            <button className="plan-ferias__endbtn is-yes" onClick={onEnd}>Sim, terminar</button>
            <button className="plan-ferias__endbtn" onClick={() => setConfirm(null)}>Não</button>
          </>
        ) : confirm === "switch" ? (
          <>
            <span>O plano deste ano fica guardado — voltas quando quiseres. Mudar para que ano?</span>
            {YEARS.filter((y) => y !== plan.year).map((y) => {
              const other = plans[y];
              return (
                <button
                  key={y}
                  className="plan-ferias__year"
                  style={{ ["--c" as string]: YEAR_STYLE[y].color }}
                  onClick={() => onSwitch(y)}
                >
                  {yearLabel(y)}{other ? ` · ${Math.round(feriasPct(other, progress) * 100)}%` : ""}
                </button>
              );
            })}
            <button className="plan-ferias__endbtn" onClick={() => setConfirm(null)}>Cancelar</button>
          </>
        ) : (
          <>
            <button className="plan-ferias__endbtn" onClick={() => setConfirm("switch")}>Mudar de ano</button>
            <button className="plan-ferias__endbtn" onClick={() => setConfirm("end")}>Terminar plano</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---- exame final + histórico de planos (§4.8) ------------------------- */

/** The "Exame final do X.º ano" card — shown when the plan is ≥ 90% done or
 *  just finished. Retakes are welcome; the best nota stays. */
function ExameCard({ year, bestPct, onOpen }: { year: YearN; bestPct?: number; onOpen: () => void }) {
  const sub =
    bestPct != null
      ? `A tua melhor nota: ${Math.round(bestPct * 20)}/20. Podes repetir — fica a melhor.`
      : "Perguntas de todas as disciplinas do ano, como na escola. Mostra o que sabes!";
  return (
    <div className="plan-review plan-exame">
      <button className="plan-review__btn" onClick={onOpen}>
        <span className="plan-review__ic"><Icon name="trophy" size={24} /></span>
        <span className="plan-review__tx">
          <strong>Exame final do {yearLabel(year)}</strong>
          <span>{sub}</span>
        </span>
        <Icon name="forward" size={18} />
      </button>
      <Speaker
        text={`Exame final do ${yearLabel(year)}. ${sub}`}
        className="plan-review__say"
        size={18}
        label="Ouvir: exame final"
      />
    </div>
  );
}

/** The archived plans, one small line each ("4.º ano · mai–jun · 100% · exame 16/20"). */
function FeriasHistoryList({ history }: { history: PlanRecord[] }) {
  if (history.length === 0) return null;
  return (
    <div className="plan-history">
      <span className="plan-history__t"><Icon name="calendar" size={14} /> Planos anteriores</span>
      <ul>
        {[...history].reverse().map((r) => (
          <li key={`${r.year}-${r.startedAt}`}>{planRecordLabel(r)}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---- the calendar grid (shared with the parents' page) -------------- */

export function PlanCalendar({
  achievements,
  sessions,
  selected,
  onSelect,
  planDays,
}: {
  achievements: Achievement[];
  sessions: StudySession[];
  selected: number;
  onSelect: (day: number) => void;
  /** The active férias plan's day-by-day schedule (date → PlanDay, from
   *  feriasFullSchedule + planDaysByDate). When given, today's and future
   *  planned days carry the same subject-icon + ≈min marks as the full-plan
   *  month grids; without it (no plan / parents' page) cells stay plain. */
  planDays?: Map<number, PlanDay>;
}) {
  const now = Date.now();
  const today = startOfDay(now);
  // One month back, the current one, two ahead (user decision §4.9) — and,
  // with a férias plan, the WHOLE plan: back to its start month and as far
  // ahead as its projection reaches.
  const curIdx = monthIndex(now);
  const [rawIdx, setIdx] = useState(curIdx);
  const firstPlanned = planDays && planDays.size > 0 ? Math.min(...planDays.keys()) : 0;
  const lastPlanned = planDays && planDays.size > 0 ? Math.max(...planDays.keys()) : 0;
  const minIdx = Math.min(curIdx - 1, firstPlanned > 0 ? monthIndex(firstPlanned) : curIdx);
  const maxIdx = Math.max(curIdx + 2, lastPlanned > 0 ? monthIndex(lastPlanned) : minIdx);
  // Clamp, not just disable: switching plans mid-session can shrink the range
  // while the pager is parked on a month that no longer exists.
  const idx = Math.min(Math.max(rawIdx, minIdx), maxIdx);
  const year = Math.floor(idx / 12);
  const month = idx % 12;

  const byDayTests = useMemo(() => aggregateByDay(achievements), [achievements]);
  const byDaySessions = useMemo(() => aggregateSessionsByDay(sessions), [sessions]);
  // Days before the first recorded activity stay neutral — no red shame for
  // the time before the app was even used.
  const firstActivity = useMemo(() => {
    let first = today;
    for (const a of achievements) first = Math.min(first, startOfDay(a.at));
    for (const s of sessions) first = Math.min(first, startOfDay(s.startedAt));
    return first;
  }, [achievements, sessions, today]);

  const count = new Date(year, month + 1, 0).getDate();
  const lead = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first offset
  const label = new Date(year, month, 1).toLocaleDateString("pt-PT", { month: "long", year: "numeric" });

  return (
    <div className="plan-cal">
      <div className="plan-cal__nav">
        <button className="iconbtn" onClick={() => setIdx(idx - 1)} disabled={idx <= minIdx} aria-label="Mês anterior">
          <Icon name="back" size={18} />
        </button>
        <span className="plan-cal__month">{label}</span>
        <button className="iconbtn" onClick={() => setIdx(idx + 1)} disabled={idx >= maxIdx} aria-label="Mês seguinte">
          <Icon name="forward" size={18} />
        </button>
      </div>
      <div className="plan-cal__grid">
        {WEEKDAYS.map((d, i) => (
          <span key={`h${i}`} className="plan-cal__wd">{d}</span>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <span key={`p${i}`} className="plan-cal__pad" aria-hidden />
        ))}
        {Array.from({ length: count }, (_, i) => {
          const day = startOfDay(new Date(year, month, i + 1).getTime());
          const future = day > today;
          const rest = isRestDay(day);
          const { state, test } = dayState(day, byDayTests.get(day), byDaySessions.get(day));
          const beforeStart = day < firstActivity;
          // Plan marks (subject icons + ≈min) on today's and future planned
          // days — past days keep their real-state colours, like always.
          const pd = day >= today ? planDays?.get(day) : undefined;
          const cls = future
            ? `is-future ${rest ? "is-rest" : "is-planned"}`
            : rest
              ? "is-rest"
              : beforeStart
                ? "is-blank"
                : `is-${state}`;
          const what = future
            ? rest ? "descanso"
            : pd ? `${pd.steps.length} ${pd.steps.length === 1 ? "lição planeada" : "lições planeadas"}, cerca de ${planDayMinutes(pd)} minutos`
            : "missões planeadas"
            : rest ? "descanso"
            : state === "good" ? "estudou bem"
            : state === "some" ? "estudou um pouco"
            : beforeStart ? "" : "não estudou";
          const aria = `${new Date(day).toLocaleDateString("pt-PT", { day: "numeric", month: "long" })}${what ? ` — ${what}` : ""}${test ? ", fez teste" : ""}`;
          return (
            <button
              key={day}
              className={`plan-cal__day ${cls} ${pd ? "has-marks" : ""} ${day === today ? "is-today" : ""} ${day === selected ? "is-sel" : ""}`}
              aria-label={aria}
              title={aria}
              onClick={() => onSelect(day)}
            >
              {i + 1}
              {pd && <PlanDayMarks pd={pd} />}
              {test && <span className="plan-cal__dot" aria-hidden />}
            </button>
          );
        })}
      </div>
      <div className="plan-cal__legend">
        <span><i className="plan-cal__chip is-good" /> estudou bem</span>
        <span><i className="plan-cal__chip is-some" /> um pouco</span>
        <span><i className="plan-cal__chip is-none" /> nada</span>
        <span><i className="plan-cal__chip is-test" /> fez teste</span>
        <span><i className="plan-cal__chip is-rest" /> descanso</span>
      </div>
    </div>
  );
}

/* ---- the page -------------------------------------------------------- */

export function Plano({ onGo }: { onGo: (v: View) => void }) {
  const { progress, achievements, history } = useProgress();
  const sessions = useSessions();
  const review = useReview();
  const [now] = useState(() => Date.now());
  const today = startOfDay(now);
  const rest = isRestDay(today);
  const [selected, setSelected] = useState(today);

  // The férias plan (§4.8): when active, its steps REPLACE the derived daily
  // missions (missionsForDay decides — one source of truth for the day).
  // One plan per year — `activePlan` is the single accessor everyone reads.
  const planState = useFeriasState();
  const ferias = activePlan(planState);
  const { plans, history: planHistory } = planState;
  useEffect(() => {
    if (ferias) syncFeriasDone(ferias, progress, achievements); // mirror passed lessons into doneSteps
  }, [ferias, progress, achievements]);

  // TPC (§4.12): open homework rides ABOVE the day's missions; passing every
  // lesson of a TPC stamps it done here (the one writer, like syncFeriasDone).
  const tpcs = useTpcs();
  useEffect(() => {
    syncTpcs(achievements);
  }, [achievements]);

  // A finished queue archives itself (endedAt = now, 100%) — the plan moves
  // to the history and the exame final card below takes over. Only when the
  // child passed at least one of its lessons WHILE the plan was active: a
  // plan born at 100% (the year's tests were all passed before it existed)
  // used to be archived on its very first render, which made starting that
  // year look like "o plano não foi atualizado".
  const feriasDonePct = ferias ? feriasProgress(ferias, progress, today).pct : 0;
  useEffect(() => {
    if (ferias && feriasDonePct >= 1 && earnedDuringPlan(ferias, achievements)) archiveFeriasPlan(progress);
  }, [ferias, feriasDonePct, progress, achievements]);

  // Exame final (§4.8): offered from 90% of the plan, and after completion
  // for the last archived plan (retakes keep the best nota).
  const lastRecord = planHistory[planHistory.length - 1];
  const examYear: YearN | null =
    ferias && feriasDonePct >= EXAM_READY_PCT ? ferias.year
    : !ferias && lastRecord && lastRecord.pctDone >= Math.round(EXAM_READY_PCT * 100) ? lastRecord.year
    : null;
  const examBest = ferias ? ferias.examPct : lastRecord?.examPct;
  const [examOpen, setExamOpen] = useState(false);

  const reviewItems = useMemo(() => Object.values(review), [review]);
  const due = useMemo(() => dueByLesson(review, now), [review, now]);
  const missions = useMemo(
    () => missionsForDay(today, today, progress, achievements, history, reviewItems, ferias, tpcs),
    [today, progress, achievements, history, reviewItems, ferias, tpcs],
  );
  const planReason = useMemo(() => planReasonForMissions(missions), [missions]);
  const doneCount = missions.filter((m) => m.done).length;
  const minutesToday = minutesOf(aggregateSessionsByDay(sessions).get(today));

  // The plan's day-by-day schedule, indexed by date — gives the calendar the
  // same per-day marks (subject icons + ≈min) as the full-plan month grids.
  const planDays = useMemo(
    () => (ferias ? planDaysByDate(feriasFullSchedule(ferias, progress, achievements, today)) : undefined),
    [ferias, progress, achievements, today],
  );

  // Detail of the tapped calendar day (what was done / what's planned).
  const selTests = useMemo(() => aggregateByDay(achievements).get(selected), [achievements, selected]);
  const selMinutes = minutesOf(aggregateSessionsByDay(sessions).get(selected));
  const selFuture = selected > today;
  const selMissions = useMemo(
    () => (selFuture ? missionsForDay(selected, today, progress, achievements, history, reviewItems, ferias, tpcs) : []),
    [selFuture, selected, today, progress, achievements, history, reviewItems, ferias, tpcs],
  );

  // Saturday under a férias plan is the revision day (§4.8) — its missions
  // derive from the week, so an empty Saturday just means a clean week.
  const revDay = !!ferias && isRevisionDay(today);
  // With a férias plan, an empty new-matter day means the whole queue is done.
  const feriasDone = !!ferias && !rest && !revDay && missions.length === 0;
  const mascotMsg = rest
    ? "Hoje é domingo — dia de descansar e brincar! As missões voltam amanhã."
    : revDay && missions.length === 0
      ? "Sábado é dia de revisão, mas esta semana está tudo em ordem. Aproveita para brincar!"
      : revDay && doneCount < missions.length
        ? "Hoje é sábado — dia de revisão! Repete o que custou mais esta semana."
        : feriasDone
          ? "O plano de férias está concluído — recuperaste a matéria toda! Parabéns!"
          : doneCount >= missions.length && missions.length > 0
            ? "Missões todas feitas! És uma estrela!"
            : `Olá! Tens ${missions.length} ${missions.length === 1 ? "missão" : "missões"} para hoje — cerca de ${DAILY_TARGET_MINUTES} minutos.`;

  return (
    <div className="plan-page">
      <Mascot message={mascotMsg} mood={doneCount > 0 || rest || feriasDone ? "cheer" : "happy"} />

      {ferias ? (
        <FeriasStrip
          plan={ferias}
          plans={plans}
          progress={progress}
          achievements={achievements}
          today={today}
          reason={planReason}
          onEnd={() => archiveFeriasPlan(progress)}
          onSwitch={(y) => startFeriasPlan(y)}
          onFull={() => onGo({ kind: "plano-completo" })}
        />
      ) : (
        <FeriasOfferCard plans={plans} progress={progress} onStart={(y) => startFeriasPlan(y)} />
      )}

      {examYear != null && <ExameCard year={examYear} bestPct={examBest} onOpen={() => setExamOpen(true)} />}
      <FeriasHistoryList history={planHistory} />
      {examOpen && examYear != null && <ExameModal year={examYear} onClose={() => setExamOpen(false)} />}

      {rest ? (
        <div className="plan-rest">
          <span className="plan-rest__ic"><Icon name="sun" size={34} /></span>
          <div>
            <strong>Dia de descanso!</strong>
            <p>Hoje não há missões. Brinca, passeia e volta amanhã com energia.</p>
          </div>
          <Speaker text="Hoje é dia de descanso! Não há missões. Brinca, passeia e volta amanhã com energia." className="plan-rest__say" size={18} label="Ouvir" />
        </div>
      ) : (
        <>
          <h2 className="section-title">
            <span style={{ color: "var(--primary)", display: "inline-flex" }}><Icon name="target" size={26} duo /></span>
            O meu plano de hoje
            <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: ".7em" }}> · {doneCount}/{missions.length}</span>
          </h2>
          <div className="plan-today-min">
            <ProgressBar pct={Math.min(1, minutesToday / DAILY_TARGET_MINUTES)} color="var(--primary)" />
            <span>{minutesToday} de {DAILY_TARGET_MINUTES} min de estudo</span>
          </div>
          {planReason && (
            <div className={`plan-reason is-${planReason.kind}`}>
              <Icon name="target" size={16} />
              <span>{planReason.text} Primeiro vencemos estas perguntas, depois o plano continua.</span>
              <Speaker text={planReason.say} className="plan-reason__say" size={16} label="Ouvir: motivo do plano" />
            </div>
          )}
          <MissionCards missions={missions} onGo={onGo} />
          <ReviewBankCard due={due} onGo={onGo} />
        </>
      )}

      <h2 className="section-title" style={{ marginTop: 32 }}>
        <span style={{ color: "var(--primary)", display: "inline-flex" }}><Icon name="calendar" size={26} duo /></span>
        O meu calendário
      </h2>
      <PlanCalendar achievements={achievements} sessions={sessions} selected={selected} onSelect={setSelected} planDays={planDays} />

      <div className="plan-day-detail">
        <div className="plan-day-detail__head">
          <strong>{new Date(selected).toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })}</strong>
          {!selFuture && selMinutes > 0 && <span className="plan-day-detail__min"><Icon name="clock" size={14} /> {selMinutes} min</span>}
        </div>
        {selFuture ? (
          isRestDay(selected) ? (
            <p className="plan-day-detail__empty">Dia de descanso — sem missões.</p>
          ) : selMissions.length === 0 && ferias && isRevisionDay(selected) ? (
            // A future Saturday's revision derives from a week that hasn't
            // happened yet — so it shows as "revisão" instead of a list.
            <p className="plan-day-detail__empty">Dia de revisão — repetir o teste mais difícil da semana e vencer o banco de erros.</p>
          ) : (
            <ul className="plan-day-detail__list">
              {selMissions.map((m) => (
                <li key={m.id}><span aria-hidden>{m.emoji}</span> {m.title}</li>
              ))}
            </ul>
          )
        ) : selTests && selTests.items.length > 0 ? (
          <ul className="plan-day-detail__list">
            {selTests.items.map((a, i) => (
              <li key={`${a.lessonId}-${a.at}-${i}`}>
                <span aria-hidden>{a.emoji}</span> {a.lessonTitle} — {Math.round(a.pct * 100)}%
                {a.pct >= TEST_PASS_PCT ? " ✓" : " (a repetir)"}
              </li>
            ))}
          </ul>
        ) : selMinutes > 0 ? (
          <p className="plan-day-detail__empty">Estudou {selMinutes} min{selMinutes * 60 >= GOOD_DAY_SECS ? " — bom dia de estudo!" : ", sem teste."}</p>
        ) : (
          <p className="plan-day-detail__empty">{isRestDay(selected) ? "Dia de descanso." : "Nada nesse dia."}</p>
        )}
      </div>
    </div>
  );
}
