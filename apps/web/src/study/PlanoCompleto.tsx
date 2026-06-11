import { useMemo, useState } from "react";
import { Icon, SUBJECT_ICONS, type IconName } from "@sprout/icons";
import { Speaker, Chart, BarList } from "@sprout/ui";
import { useProgress } from "../progress";
import { useSessions, type StudySession } from "./sessions";
import {
  startOfDay,
  isRestDay,
  monthIndex,
  aggregateByDay,
  aggregateSessionsByDay,
  dayState,
  minutesOf,
} from "./calendar";
import {
  useFeriasState,
  activePlan,
  feriasFullSchedule,
  feriasProgress,
  feriasStatusLine,
  isRevisionDay,
  isNewMatterDay,
  planDaysByDate,
  type PlanDay,
  type StudyPlan,
} from "./ferias";
import { lessonMeta, findLesson, subjectById, yearLabel } from "../content/curriculum";
import { lessonSummary } from "../lesson-content";
import type { View } from "../nav";

/* ------------------------------------------------------------------ *
 * "Plano completo" (#/plano/completo) — the WHOLE férias plan, shown
 * CALENDAR-FIRST (user decision 2026-06-11): one month grid per month
 * the plan touches (start month → projected end month) where each day
 * cell carries the subject icons of its planned lessons, a lesson count
 * and the ≈minutes. Past days show the REAL state (the same colours as
 * the plan calendar); future days show the projection; Saturdays are
 * revision, Sundays rest. Tapping a day opens a detail panel with that
 * day's lessons — each tappable (jumping ahead is allowed and counts).
 * A compact "Dia a dia" list sits behind a toggle. Everything DERIVED
 * from the plan + progress + sessions.
 * ------------------------------------------------------------------ */

const WEEKDAYS = ["S", "T", "Q", "Q", "S", "S", "D"]; // Monday-first

const dateLabel = (t: number): string =>
  new Date(t).toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" });

const shortDate = (t: number): string =>
  new Date(t).toLocaleDateString("pt-PT", { day: "numeric", month: "long" });

/** Monday of the week `t` falls in (start of day). */
const startOfWeek = (t: number): number => {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.getTime();
};

const subjectIcon = (subjectId: string): IconName => SUBJECT_ICONS[subjectId] ?? "reading";

/* ---- day-cell content markers (shared with the #/plano calendar) ------ */

/** Planned minutes of one day (lessons + tests). */
export const planDayMinutes = (pd: PlanDay): number => pd.steps.reduce((sum, s) => sum + s.step.minutes, 0);

/** What a planned day shows INSIDE its calendar cell: the lessons' subject
 *  icons (max 2, subject-coloured, "+N" beyond two steps) and the ≈minutes.
 *  ONE renderer for the full-plan month grids AND the #/plano calendar —
 *  the pfcal__* mark styles are grid-agnostic, so both cells reuse them. */
export function PlanDayMarks({ pd }: { pd: PlanDay }) {
  const subjects = [...new Set(pd.steps.map((s) => lessonMeta.get(s.step.lessonId)!.subjectId))];
  return (
    <>
      <span className="pfcal__ics" aria-hidden>
        {subjects.slice(0, 2).map((id) => (
          <span key={id} style={{ color: subjectById.get(id)?.color }}><Icon name={subjectIcon(id)} size={14} /></span>
        ))}
        {pd.steps.length > 2 && <i className="pfcal__more">+{pd.steps.length - 2}</i>}
      </span>
      <span className="pfcal__min">≈{planDayMinutes(pd)}m</span>
    </>
  );
}

/* ---- one day's lesson rows (shared by the panel and the list) --------- */

const STATE_LABEL = { done: "feita", today: "hoje", future: "futura" } as const;

interface StepRow {
  step: PlanDay["steps"][number]["step"];
  state: "done" | "today" | "future";
  meta: NonNullable<ReturnType<typeof lessonMeta.get>>;
  summary: string | null;
}

/** Resolve each step's lesson once: subject chip, title and the summary line
 *  pulled from the lesson body's "O que vais aprender" callout. */
function rowsOf(day: PlanDay): StepRow[] {
  return day.steps.map(({ step, state }) => {
    const meta = lessonMeta.get(step.lessonId)!; // queue is guarded on load
    const body = findLesson(meta.subjectId, meta.year, step.lessonId)?.body;
    return { step, state, meta, summary: body ? lessonSummary(body) : null };
  });
}

const sayOf = (day: PlanDay, rows: StepRow[]): string =>
  `Dia ${day.n}, ${dateLabel(day.date)}. ` +
  rows.map((r) => `${r.meta.title}. ${r.summary ?? ""}`.trim()).join(" ");

function StepRows({ rows, onGo }: { rows: StepRow[]; onGo: (v: View) => void }) {
  return (
    <div className="plano-full-day__steps">
      {rows.map(({ step, state, meta, summary }) => (
        <button
          key={step.lessonId}
          className={`plano-full-step is-${state}`}
          onClick={() => onGo({ kind: "lesson", year: meta.year, subjectId: meta.subjectId, lessonId: step.lessonId })}
        >
          <span className="plano-full-step__subj" style={{ ["--c" as string]: meta.color }}>
            <Icon name={subjectIcon(meta.subjectId)} size={12} /> {meta.subjectLabel}
          </span>
          <span className="plano-full-step__tx">
            <strong>{meta.title}</strong>
            {summary && <span>{summary}</span>}
          </span>
          <span className="plano-full-step__min">≈ {step.minutes} min</span>
          <span className="plano-full-step__st">
            {state === "done" && <Icon name="check" size={13} />} {STATE_LABEL[state]}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ---- the "Dia a dia" compact list (behind a toggle) ------------------- */

function ScheduleDay({ day, today, onGo }: { day: PlanDay; today: number; onGo: (v: View) => void }) {
  const rows = rowsOf(day);
  const minutes = day.steps.reduce((sum, s) => sum + s.step.minutes, 0);
  return (
    <section className={`plano-full-day ${day.date === today ? "is-today" : ""}`}>
      <div className="plano-full-day__head">
        <strong>Dia {day.n}</strong>
        <span className="plano-full-day__date">{dateLabel(day.date)}</span>
        <span className="plano-full-day__min"><Icon name="clock" size={13} /> ≈ {minutes} min</span>
        <Speaker text={sayOf(day, rows)} className="plano-full-day__say" size={16} label={`Ouvir: dia ${day.n}`} />
      </div>
      <StepRows rows={rows} onGo={onGo} />
    </section>
  );
}

/* ---- one month grid: icons + count + minutes per day ------------------ */

function PlanMonth({
  monthIdx,
  byDate,
  plan,
  today,
  sessions,
  selected,
  onSelect,
}: {
  /** absolute month to draw — year × 12 + month (see monthIndex) */
  monthIdx: number;
  byDate: Map<number, PlanDay>;
  plan: StudyPlan;
  today: number;
  sessions: StudySession[];
  selected: number;
  onSelect: (day: number) => void;
}) {
  const { achievements } = useProgress();
  const year = Math.floor(monthIdx / 12);
  const month = monthIdx % 12;
  const count = new Date(year, month + 1, 0).getDate();
  const lead = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first offset
  const label = new Date(year, month, 1).toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
  const planStart = startOfDay(plan.startedAt);

  const byDayTests = useMemo(() => aggregateByDay(achievements), [achievements]);
  const byDaySessions = useMemo(() => aggregateSessionsByDay(sessions), [sessions]);

  return (
    <div className="pfcal">
      <span className="pfcal__month">{label}</span>
      <div className="pfcal__grid">
        {WEEKDAYS.map((d, i) => (
          <span key={`h${i}`} className="pfcal__wd">{d}</span>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <span key={`p${i}`} className="pfcal__pad" aria-hidden />
        ))}
        {Array.from({ length: count }, (_, i) => {
          const day = startOfDay(new Date(year, month, i + 1).getTime());
          const pd = byDate.get(day);
          const rest = isRestDay(day);
          const rev = isRevisionDay(day);
          const past = day < today;
          const { state, test } = dayState(day, byDayTests.get(day), byDaySessions.get(day));
          // "Adiado" is DERIVED, never stored: a missed day mutates nothing —
          // the queue front simply slides to the next study day. The done part
          // of the schedule is packed onto consecutive study days from the
          // start, so a past new-matter day inside the plan with no packed
          // matter AND no real activity is exactly a day the plan slid past.
          const missed = past && day >= planStart && isNewMatterDay(day) && !pd && state === "none";
          const minutes = pd ? planDayMinutes(pd) : 0;
          const cls = rest
            ? "is-rest"
            : past
              ? `is-${state} ${missed ? "is-missed" : ""}`
              : rev
                ? "is-rev"
                : pd
                  ? "is-planned"
                  : "is-blank";
          const what = rest
            ? "descanso"
            : missed
              ? "adiado para o dia seguinte"
              : past
                ? state === "good" ? "estudou bem" : state === "some" ? "estudou um pouco" : "não estudou"
                : rev
                  ? "dia de revisão"
                  : pd
                    ? `${pd.steps.length} ${pd.steps.length === 1 ? "lição" : "lições"}, cerca de ${minutes} minutos`
                    : "sem matéria planeada";
          const aria = `${dateLabel(day)} — ${what}${test ? ", fez teste" : ""}`;
          return (
            <button
              key={day}
              className={`pfcal__day ${cls} ${day === today ? "is-today" : ""} ${day === selected ? "is-sel" : ""}`}
              aria-label={aria}
              title={aria}
              onClick={() => onSelect(day)}
            >
              <span className="pfcal__num">{i + 1}</span>
              {!past && pd && <PlanDayMarks pd={pd} />}
              {!past && !pd && rev && <span className="pfcal__ics" aria-hidden><Icon name="refresh" size={13} /></span>}
              {missed && <span className="pfcal__missed" aria-hidden>adiado →</span>}
              {past && test && <span className="pfcal__dot" aria-hidden />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---- the tapped day's detail panel ------------------------------------ */

function DayPanel({
  selected,
  today,
  byDate,
  plan,
  sessions,
  onGo,
}: {
  selected: number;
  today: number;
  byDate: Map<number, PlanDay>;
  plan: StudyPlan;
  sessions: StudySession[];
  onGo: (v: View) => void;
}) {
  const { achievements } = useProgress();
  const pd = byDate.get(selected);
  const rows = pd ? rowsOf(pd) : [];
  const minutes = minutesOf(aggregateSessionsByDay(sessions).get(selected));
  const { state } = dayState(selected, aggregateByDay(achievements).get(selected), aggregateSessionsByDay(sessions).get(selected));
  const planStart = startOfDay(plan.startedAt);
  const missed = selected < today && selected >= planStart && isNewMatterDay(selected) && !pd && state === "none";

  // The spoken/shown line when there are no planned lessons on this day.
  const fallback = isRestDay(selected)
    ? "Dia de descanso — sem missões."
    : isRevisionDay(selected) && selected >= today
      ? "Dia de revisão — repetir o teste mais difícil da semana e vencer o banco de erros."
      : missed
        ? "Este dia ficou adiado — a matéria esperou pelo dia seguinte, sem stress."
        : selected < today
          ? state === "good" ? "Estudou bem nesse dia." : state === "some" ? "Estudou um pouco nesse dia." : "Sem estudo nesse dia."
          : "Sem matéria planeada para este dia.";

  const say = pd
    ? sayOf(pd, rows)
    : `${dateLabel(selected)}. ${fallback}`;

  return (
    <div className="plan-day-detail plano-full-panel">
      <div className="plan-day-detail__head">
        <strong>{dateLabel(selected)}</strong>
        {pd && <span className="plan-day-detail__min"><Icon name="clock" size={14} /> ≈ {pd.steps.reduce((s, x) => s + x.step.minutes, 0)} min</span>}
        {!pd && minutes > 0 && <span className="plan-day-detail__min"><Icon name="clock" size={14} /> {minutes} min de estudo</span>}
        <Speaker text={say} className="plano-full-panel__say" size={16} label="Ouvir: este dia" />
      </div>
      {pd ? (
        <StepRows rows={rows} onGo={onGo} />
      ) : (
        <p className="plan-day-detail__empty">{fallback}{minutes > 0 ? ` Estudou ${minutes} min.` : ""}</p>
      )}
    </div>
  );
}

/* ---- time totals: today/week/month, 8-week bars, subject split -------- */

function TimeTotals({ sessions, today }: { sessions: StudySession[]; today: number }) {
  const byDay = useMemo(() => aggregateSessionsByDay(sessions), [sessions]);
  const weekStart = startOfWeek(today);
  const monthStart = new Date(new Date(today).getFullYear(), new Date(today).getMonth(), 1).getTime();

  // Minutes per period and per week — one walk over the per-day aggregation.
  const { todayMin, weekMin, monthMin, weekMins } = useMemo(() => {
    let todayMin = 0;
    let weekMin = 0;
    let monthMin = 0;
    const weekMins = new Map<number, number>();
    for (const [day, s] of byDay) {
      const min = minutesOf(s);
      if (day === today) todayMin = min;
      if (day >= weekStart && day <= today) weekMin += min;
      if (day >= monthStart && day <= today) monthMin += min;
      const w = startOfWeek(day);
      weekMins.set(w, (weekMins.get(w) ?? 0) + min);
    }
    return { todayMin, weekMin, monthMin, weekMins };
  }, [byDay, today, weekStart, monthStart]);

  // The last 8 weeks as bars (oldest first), labelled by their Monday.
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7 * (7 - i));
    const ws = d.getTime();
    return {
      label: new Date(ws).toLocaleDateString("pt-PT", { day: "numeric", month: "numeric" }),
      min: weekMins.get(ws) ?? 0,
    };
  });

  // This month's active time split by subject (same idea as the parents'
  // "Tempo por disciplina", scoped to the current month).
  const subjectSplit = useMemo(() => {
    const secs = new Map<string, number>();
    for (const s of sessions) {
      if (s.subjectId && s.secs > 0 && startOfDay(s.startedAt) >= monthStart) {
        secs.set(s.subjectId, (secs.get(s.subjectId) ?? 0) + s.secs);
      }
    }
    return [...secs.entries()]
      .map(([id, v]) => {
        const subj = subjectById.get(id);
        return { label: subj?.label ?? id, color: subj?.color, value: Math.round(v / 60) };
      })
      .filter((e) => e.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [sessions, monthStart]);

  return (
    <>
      <div className="plano-full-kpis">
        {([["Hoje", todayMin], ["Esta semana", weekMin], ["Este mês", monthMin]] as const).map(([label, min]) => (
          <div key={label} className="plano-full-kpi">
            <span className="plano-full-kpi__v">{min}<i>min</i></span>
            <span className="plano-full-kpi__l">{label}</span>
          </div>
        ))}
      </div>
      <Chart
        spec={{
          type: "bar",
          title: "Minutos por semana",
          labels: weeks.map((w) => w.label),
          data: weeks.map((w) => w.min),
          unit: "min",
          say: `Minutos de estudo por semana, nas últimas oito semanas: ${weeks.map((w) => `semana de ${w.label}, ${w.min} minutos`).join("; ")}.`,
        }}
      />
      {subjectSplit.length > 0 && (
        <div className="plano-full-card">
          <span className="plano-full-card__t"><Icon name="chart" size={14} /> Este mês, por disciplina</span>
          <BarList items={subjectSplit} unit="min" />
        </div>
      )}
    </>
  );
}

/* ---- the page ---------------------------------------------------------- */

export function PlanoCompleto({ onGo }: { onGo: (v: View) => void }) {
  const { progress, achievements } = useProgress();
  const sessions = useSessions();
  // The active year's plan, via the one shared accessor (one plan per year).
  const plan = activePlan(useFeriasState());
  const [now] = useState(() => Date.now());
  const today = startOfDay(now);
  const [selected, setSelected] = useState(today);
  const [showList, setShowList] = useState(false);

  const days = useMemo(
    () => (plan ? feriasFullSchedule(plan, progress, achievements, today) : []),
    [plan, progress, achievements, today],
  );
  const byDate = useMemo(() => planDaysByDate(days), [days]);

  // EVERY month the plan touches: its start month through the projected end
  // (the schedule's last day; today when the queue is already done). The plan
  // spans a handful of weeks, so this stays a handful of month cards.
  const months = useMemo(() => {
    if (!plan) return [];
    const first = monthIndex(startOfDay(plan.startedAt));
    const last = Math.max(monthIndex(today), days.length > 0 ? monthIndex(days[days.length - 1].date) : 0);
    return Array.from({ length: Math.max(1, last - first + 1) }, (_, i) => first + i);
  }, [plan, days, today]);

  const prog = useMemo(() => (plan ? feriasProgress(plan, progress, today) : null), [plan, progress, today]);
  const status = prog ? feriasStatusLine(prog) : "";

  // Header facts. `behindDays` IS the drift vs. the original end date: the
  // schedule is derived from startedAt + the queue, so each missed day pushes
  // the projected finish one study day past the original plan — nothing to
  // store, the difference between "where the front should be" and "where it
  // is" is the "+N dias".
  const facts: { v: string; l: string; late?: boolean }[] = plan && prog
    ? [
        { v: shortDate(plan.startedAt), l: "início" },
        { v: prog.finishAt ? shortDate(prog.finishAt) : "concluído", l: "fim previsto" },
        { v: `${Math.min(prog.week, prog.totalWeeks)} de ${prog.totalWeeks}`, l: "semana" },
        { v: `${Math.round(prog.pct * 100)}%`, l: "matéria feita" },
        ...(prog.behindDays > 0
          ? [{ v: `+${prog.behindDays} ${prog.behindDays === 1 ? "dia" : "dias"}`, l: "adiado, sem stress", late: true }]
          : []),
      ]
    : [];

  return (
    <div className="plan-page plano-full">
      {plan ? (
        <div className="plan-ferias plan-ferias--active plano-full-head">
          <div className="plan-ferias__head">
            <span className="plan-ferias__ic"><Icon name="calendar" size={24} /></span>
            <div>
              <strong>Plano completo · {yearLabel(plan.year)}</strong>
              <p>{status}. Toca num dia para ver as lições — podes avançar matéria à frente do dia de hoje.</p>
            </div>
          </div>
          <Speaker
            text={`Plano completo do ${yearLabel(plan.year)}. ${status}. Toca num dia para ver as lições. Podes avançar matéria à frente do dia de hoje.`}
            className="plan-ferias__say"
            size={18}
            label="Ouvir: plano completo"
          />
          <div className="plano-full-facts">
            {facts.map((f) => (
              <div key={f.l} className="plano-full-fact">
                <span className={`plano-full-fact__v ${f.late ? "is-late" : ""}`}>{f.v}</span>
                <span className="plano-full-fact__l">{f.l}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="plan-ferias plano-full-head">
          <div className="plan-ferias__head">
            <span className="plan-ferias__ic"><Icon name="sun" size={24} /></span>
            <div>
              <strong>Ainda não há um plano ativo</strong>
              <p>O plano completo mostra todos os dias de estudo de um plano de férias. Cria um em «O meu plano».</p>
            </div>
          </div>
          <Speaker
            text="Ainda não há um plano ativo. O plano completo mostra todos os dias de estudo de um plano de férias. Cria um na página O meu plano."
            className="plan-ferias__say"
            size={18}
            label="Ouvir"
          />
          <button className="plan-ferias__start" onClick={() => onGo({ kind: "plano" })}>
            <Icon name="forward" size={18} /> Ir para «O meu plano»
          </button>
        </div>
      )}

      <div className="plano-full__cols">
        <div className="plano-full__main">
          {plan && (
            <>
              <h2 className="section-title">
                <span style={{ color: "var(--primary)", display: "inline-flex" }}><Icon name="calendar" size={26} duo /></span>
                O calendário do plano
              </h2>
              <div className="plano-full-months">
                {months.map((m) => (
                  <PlanMonth
                    key={m}
                    monthIdx={m}
                    byDate={byDate}
                    plan={plan}
                    today={today}
                    sessions={sessions}
                    selected={selected}
                    onSelect={setSelected}
                  />
                ))}
              </div>
              <div className="pfcal__legend">
                <span><i className="pfcal__chip is-good" /> estudou bem</span>
                <span><i className="pfcal__chip is-some" /> um pouco</span>
                <span><i className="pfcal__chip is-missed" /> adiado</span>
                <span><i className="pfcal__chip is-rev" /> revisão</span>
                <span><i className="pfcal__chip is-rest" /> descanso</span>
              </div>

              <DayPanel selected={selected} today={today} byDate={byDate} plan={plan} sessions={sessions} onGo={onGo} />

              <button className="plano-full-toggle" onClick={() => setShowList((v) => !v)} aria-expanded={showList}>
                <Icon name={showList ? "close" : "calendar"} size={16} />
                {showList ? "Esconder a lista dia a dia" : `Ver a lista dia a dia (${days.length} dias)`}
              </button>
              {showList && (
                <div className="plano-full-days">
                  {days.map((d) => (
                    <ScheduleDay key={`${d.n}-${d.date}`} day={d} today={today} onGo={onGo} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <aside className="plano-full__side">
          <h2 className="section-title">
            <span style={{ color: "var(--primary)", display: "inline-flex" }}><Icon name="clock" size={26} duo /></span>
            Tempo de estudo
          </h2>
          <TimeTotals sessions={sessions} today={today} />
        </aside>
      </div>
    </div>
  );
}
