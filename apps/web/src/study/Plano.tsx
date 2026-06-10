import { useMemo, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "@sprout/ui";
import { useProgress, TEST_PASS_PCT, type Achievement } from "../progress";
import { useSessions, type StudySession } from "./sessions";
import {
  startOfDay,
  isRestDay,
  aggregateByDay,
  aggregateSessionsByDay,
  dayState,
  minutesOf,
  GOOD_DAY_SECS,
} from "./calendar";
import { missionsForDay, DAILY_TARGET_MINUTES, type Mission } from "./plan";
import { useReview, dueByLesson } from "./review";
import { lessonMeta } from "../content/curriculum";
import { Mascot } from "../Mascot";
import { ProgressBar } from "../ui";
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
        <div key={m.id} className={`plan-mission ${m.done ? "is-done" : ""}`} style={{ ["--c" as string]: m.color }}>
          <button
            className="plan-mission__btn"
            onClick={() => {
              const v = missionView(m);
              if (v) onGo(v);
            }}
          >
            <span className="plan-mission__num">{m.done ? <Icon name="check" size={22} /> : i + 1}</span>
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
 *  read aloud, tapping opens the lesson with the most due. KISS — there is no
 *  separate review runner; the child beats the questions inside the lesson. */
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
        onClick={() => onGo({ kind: "lesson", year: meta.year, subjectId: meta.subjectId, lessonId: topId! })}
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

/* ---- the calendar grid (shared with the parents' page) -------------- */

export function PlanCalendar({
  achievements,
  sessions,
  selected,
  onSelect,
}: {
  achievements: Achievement[];
  sessions: StudySession[];
  selected: number;
  onSelect: (day: number) => void;
}) {
  const now = Date.now();
  const today = startOfDay(now);
  const monthIndex = (t: number) => { const d = new Date(t); return d.getFullYear() * 12 + d.getMonth(); };
  // One month back, the current one, two ahead (user decision §4.9).
  const curIdx = monthIndex(now);
  const [idx, setIdx] = useState(curIdx);
  const minIdx = curIdx - 1;
  const maxIdx = curIdx + 2;
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
        <button className="iconbtn" onClick={() => setIdx((i) => i - 1)} disabled={idx <= minIdx} aria-label="Mês anterior">
          <Icon name="back" size={18} />
        </button>
        <span className="plan-cal__month">{label}</span>
        <button className="iconbtn" onClick={() => setIdx((i) => i + 1)} disabled={idx >= maxIdx} aria-label="Mês seguinte">
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
          const cls = future
            ? `is-future ${rest ? "is-rest" : "is-planned"}`
            : rest
              ? "is-rest"
              : beforeStart
                ? "is-blank"
                : `is-${state}`;
          const what = future
            ? rest ? "descanso" : "missões planeadas"
            : rest ? "descanso"
            : state === "good" ? "estudou bem"
            : state === "some" ? "estudou um pouco"
            : beforeStart ? "" : "não estudou";
          const aria = `${new Date(day).toLocaleDateString("pt-PT", { day: "numeric", month: "long" })}${what ? ` — ${what}` : ""}${test ? ", fez teste" : ""}`;
          return (
            <button
              key={day}
              className={`plan-cal__day ${cls} ${day === today ? "is-today" : ""} ${day === selected ? "is-sel" : ""}`}
              aria-label={aria}
              title={aria}
              onClick={() => onSelect(day)}
            >
              {i + 1}
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

  const reviewItems = useMemo(() => Object.values(review), [review]);
  const due = useMemo(() => dueByLesson(review, now), [review, now]);
  const missions = useMemo(
    () => missionsForDay(today, today, progress, achievements, history, reviewItems),
    [today, progress, achievements, history, reviewItems],
  );
  const doneCount = missions.filter((m) => m.done).length;
  const minutesToday = minutesOf(aggregateSessionsByDay(sessions).get(today));

  // Detail of the tapped calendar day (what was done / what's planned).
  const selTests = useMemo(() => aggregateByDay(achievements).get(selected), [achievements, selected]);
  const selMinutes = minutesOf(aggregateSessionsByDay(sessions).get(selected));
  const selFuture = selected > today;
  const selMissions = useMemo(
    () => (selFuture ? missionsForDay(selected, today, progress, achievements, history, reviewItems) : []),
    [selFuture, selected, today, progress, achievements, history, reviewItems],
  );

  const mascotMsg = rest
    ? "Hoje é domingo — dia de descansar e brincar! As missões voltam amanhã."
    : doneCount >= missions.length && missions.length > 0
      ? "Missões todas feitas! És uma estrela!"
      : `Olá! Tens ${missions.length} ${missions.length === 1 ? "missão" : "missões"} para hoje — cerca de ${DAILY_TARGET_MINUTES} minutos.`;

  return (
    <div className="plan-page">
      <Mascot message={mascotMsg} mood={doneCount > 0 || rest ? "cheer" : "happy"} />

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
          <MissionCards missions={missions} onGo={onGo} />
          <ReviewBankCard due={due} onGo={onGo} />
        </>
      )}

      <h2 className="section-title" style={{ marginTop: 32 }}>
        <span style={{ color: "var(--primary)", display: "inline-flex" }}><Icon name="calendar" size={26} duo /></span>
        O meu calendário
      </h2>
      <PlanCalendar achievements={achievements} sessions={sessions} selected={selected} onSelect={setSelected} />

      <div className="plan-day-detail">
        <div className="plan-day-detail__head">
          <strong>{new Date(selected).toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })}</strong>
          {!selFuture && selMinutes > 0 && <span className="plan-day-detail__min"><Icon name="clock" size={14} /> {selMinutes} min</span>}
        </div>
        {selFuture ? (
          isRestDay(selected) ? (
            <p className="plan-day-detail__empty">Dia de descanso — sem missões.</p>
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
