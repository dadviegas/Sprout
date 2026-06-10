import { useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { Chart } from "@sprout/ui";
import { useProgress, TEST_PASS_PCT, type Achievement, type ProgressMap } from "./progress";
import {
  tierLabel,
  lessonMeta,
  subjectById,
  isEstudo, isMundo, isPaises,
  isDicionario, isVerbos, isEnciclopedia, isCores, isAtlas,
} from "./content/curriculum";
import { bibliotecaMedals } from "./biblioteca";
import { store } from "./storage";
import { useSessions, type StudySession } from "./study/sessions";
import {
  DAY, startOfDay, isRestDay, aggregateByDay, aggregateSessionsByDay, minutesOf,
  sessionEngagement, ENGAGEMENT_LABEL, type DayAgg,
} from "./study/calendar";
import { missionsForDay } from "./study/plan";
import { buildAlerts, paceOf, slowestTests } from "./study/alerts";
import { usageStats, sessionsPerDay, sessionsByHour } from "./study/usage";
import { weekGrade, type WeekGrade, type GradePart } from "./study/grade";
import { useReview, type ReviewMap } from "./study/review";
import { weeklyReport } from "./study/report";
import { PlanCalendar } from "./study/Plano";
import { loadUiPrefs, saveUiPrefs, type PreReaderPref } from "./ui-prefs";

/** Which top-level area a subject's work belongs to — so the parent dashboard
 *  can show where the child spends time (mirrors the Command Center's mapping). */
type HomeArea = "escola" | "biblioteca" | "explorar" | "treinar";
function areaOf(subjectId: string): HomeArea {
  if (isEstudo(subjectId)) return "treinar";
  if (isMundo(subjectId) || isPaises(subjectId)) return "explorar";
  if (isDicionario(subjectId) || isVerbos(subjectId) || isEnciclopedia(subjectId) || isCores(subjectId) || isAtlas(subjectId)) return "biblioteca";
  return "escola";
}
const AREA_META: Record<HomeArea, { label: string; icon: IconName }> = {
  escola: { label: "Escola", icon: "reading" },
  biblioteca: { label: "Biblioteca", icon: "letters" },
  explorar: { label: "Explorar", icon: "compass" },
  treinar: { label: "Treinar", icon: "target" },
};

/* ------------------------------------------------------------------ *
 * Área dos pais — a PARENT dashboard page (#/pais), behind a simple
 * multiplication gate so a child can't wander in.
 *
 * It answers one question: "are the kids studying every day?" —
 * alerts first, then numbers (minutes, subjects, tests + time), then
 * the calendar (planned vs. done) and the day-by-day detail.
 *
 * The habit loop: a day "counts" (keeps the streak, earns tablet time)
 * only when a final test is passed at >= 80% (TEST_PASS_PCT). Tablet
 * minutes scale with the stars earned that day. Sub-80% tries still
 * show — as a red marker on the grid and a badge in the detail — so a
 * parent sees where the child struggled.
 *
 * Everything here is DERIVED at render time from the achievements +
 * sessions logs (see study/calendar.ts and study/alerts.ts); the only
 * stored data is the small reward config below.
 * ------------------------------------------------------------------ */

/** Absolute quarter index (year*4 + quarter) for a timestamp, so quarters can
 *  be compared/stepped as plain integers. Quarter 0 = Jan–Mar. */
const quarterIndex = (t: number): number => {
  const d = new Date(t);
  return d.getFullYear() * 4 + Math.floor(d.getMonth() / 3);
};

/* ---- reward config (the only persisted parent setting) ----------- */

const PARENT_KEY = "sprout.parent.v1";
interface ParentSettings {
  /** Base tablet minutes for meeting the daily goal. */
  rewardBase: number;
  /** Extra tablet minutes per star earned that day. */
  rewardPerStar: number;
}
const DEFAULTS: ParentSettings = { rewardBase: 10, rewardPerStar: 5 };

function loadSettings(): ParentSettings {
  const s = store.getSync<Partial<ParentSettings>>(PARENT_KEY, {});
  const num = (v: unknown, fallback: number) =>
    typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : fallback;
  return {
    rewardBase: num(s.rewardBase, DEFAULTS.rewardBase),
    rewardPerStar: num(s.rewardPerStar, DEFAULTS.rewardPerStar),
  };
}

function useParentSettings(): [ParentSettings, (patch: Partial<ParentSettings>) => void] {
  const [settings, setSettings] = useState<ParentSettings>(loadSettings);
  // Re-read once the durable backend hydrates (the area may open before then).
  useEffect(() => {
    const sync = () => setSettings(loadSettings());
    void store.ready.then(sync);
    return store.subscribe(PARENT_KEY, sync);
  }, []);
  const update = (patch: Partial<ParentSettings>) => {
    setSettings((cur) => {
      const next = { ...cur, ...patch };
      store.set(PARENT_KEY, next);
      return next;
    });
  };
  return [settings, update];
}

/* ---- per-day aggregation: shared, in study/calendar.ts -------------- */

/** Green intensity (0–4) for a day, from how many tests were passed. */
const levelOf = (passed: number): number =>
  passed <= 0 ? 0 : passed === 1 ? 1 : passed <= 2 ? 2 : passed <= 4 ? 3 : 4;

/** Tablet minutes earned today: base + perStar × stars from today's PASSED
 *  tests, or 0 until the daily goal (≥ 1 test at ≥ 80%) is met. Shared with the
 *  home greeting so the dashboard and the home read the exact same rule. */
export function tabletMinutesToday(achievements: Achievement[], now: number): number {
  const today = startOfDay(now);
  const s = loadSettings();
  let passed = 0;
  let stars = 0;
  for (const a of achievements) {
    if (startOfDay(a.at) !== today || a.pct < TEST_PASS_PCT) continue;
    passed += 1;
    stars += a.stars;
  }
  return passed > 0 ? s.rewardBase + s.rewardPerStar * stars : 0;
}

/** Current run of consecutive passed days ending today (0 if today is blank). */
function currentStreak(byDay: Map<number, DayAgg>, today: number): number {
  let n = 0;
  for (let d = today; (byDay.get(d)?.passed ?? 0) > 0; d -= DAY) n += 1;
  return n;
}

/** Longest run of consecutive passed days ever. */
function bestStreak(byDay: Map<number, DayAgg>): number {
  const days = [...byDay.entries()].filter(([, a]) => a.passed > 0).map(([d]) => d).sort((x, y) => x - y);
  let best = 0;
  let run = 0;
  let prev = NaN;
  for (const d of days) {
    run = d - prev === DAY ? run + 1 : 1;
    prev = d;
    if (run > best) best = run;
  }
  return best;
}

const dayLabel = (day: number, today: number): string => {
  const diff = Math.round((today - day) / DAY);
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Ontem";
  return new Date(day).toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" });
};
const timeLabel = (at: number): string =>
  new Date(at).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });

/** How long the test took, kid-friendly: "45s", "2m 10s", "3m". */
const durationLabel = (secs: number): string => {
  if (secs < 60) return `${secs}s`;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return s ? `${m}m ${s}s` : `${m}m`;
};

/* ================================================================== */

/* The page (#/pais). The multiplication gate stays at the entrance — solved
 * once per tab (module flag, no storage), so a parent browsing back and forth
 * isn't re-asked, but a fresh load is. */
let parentUnlocked = false;

export function ParentPage() {
  const [unlocked, setUnlocked] = useState(parentUnlocked);
  return (
    <div className="parent-page sprout-fade-up">
      <h2 className="section-title">
        <Icon name="gear" size={26} /> Área dos pais
      </h2>
      {unlocked ? <Dashboard /> : <ParentGate onPass={() => setUnlocked(true)} />}
    </div>
  );
}

/* A two-digit sum with carrying (user choice): trivial for a parent, out of
 * reach for a pre-reader and slow enough to deter the 4.º ano wandering in. */
function ParentGate({ onPass }: { onPass: () => void }) {
  const [a] = useState(() => 26 + Math.floor(Math.random() * 53)); // 26–78
  const [b] = useState(() => 17 + Math.floor(Math.random() * 48)); // 17–64
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(val) === a + b) {
      parentUnlocked = true;
      onPass();
    } else {
      setErr(true);
      setVal("");
    }
  };

  return (
    <form className="parent-gate" onSubmit={submit}>
      <p>Esta área é para os pais. Para entrar, resolve a conta:</p>
      <div className="parent-gate__q">
        {a} + {b} =
        <input
          className={`parent-gate__in ${err ? "is-err" : ""}`}
          type="number"
          inputMode="numeric"
          autoFocus
          value={val}
          onChange={(e) => { setVal(e.target.value); setErr(false); }}
          aria-label="Resultado"
        />
        <button type="submit" className="pill">Entrar</button>
      </div>
      {err && <p className="parent-gate__err">Não é esse. Tenta outra vez.</p>}
    </form>
  );
}

/* ---- the dashboard ------------------------------------------------- */

/** Shared card header: icon blob + title + optional right-side aside, so
 *  every dashboard card opens the same way. */
function CardHead({ icon, title, aside }: { icon: IconName; title: string; aside?: React.ReactNode }) {
  return (
    <div className="pcard-head">
      <span className="pcard-head__ic"><Icon name={icon} size={16} /></span>
      <strong className="pcard-head__t">{title}</strong>
      {aside != null && <span className="pcard-head__aside">{aside}</span>}
    </div>
  );
}

/** A full-width section label inside the dashboard grid. */
function DashSection({ label }: { label: string }) {
  return <h3 className="dash-sec">{label}</h3>;
}

function Dashboard() {
  const { achievements, progress, history } = useProgress();
  const sessions = useSessions();
  const review = useReview();
  const [settings, setSettings] = useParentSettings();
  const [now] = useState(() => Date.now());
  const today = startOfDay(now);

  const byDay = useMemo(() => aggregateByDay(achievements), [achievements]);
  const [selected, setSelected] = useState<number>(today);
  // The log is newest-first, so the last entry is the oldest recorded test.
  const earliestDay = achievements.length ? startOfDay(achievements[achievements.length - 1].at) : null;

  const minutesFor = (agg: DayAgg | undefined): number =>
    agg && agg.passed > 0 ? settings.rewardBase + settings.rewardPerStar * agg.stars : 0;

  const todayAgg = byDay.get(today);
  const grade = useMemo(
    () => weekGrade(now, progress, achievements, history, sessions),
    [now, progress, achievements, history, sessions],
  );

  return (
    <div className="parent-dash">
      <AlertsCard sessions={sessions} achievements={achievements} now={now} />

      <KpiStrip achievements={achievements} sessions={sessions} byDay={byDay} grade={grade} today={today} />

      <TodayCard agg={todayAgg} minutes={minutesFor(todayAgg)} settings={settings} />

      <WeekGradeCard grade={grade} />

      <DashSection label="Utilização" />

      <UsagePanel sessions={sessions} today={today} />

      <MinutesChart sessions={sessions} now={now} />

      <SubjectChart sessions={sessions} achievements={achievements} />

      <MonthlyActivity achievements={achievements} now={now} earliestDay={earliestDay} />

      <DashSection label="Plano e calendário" />

      <ParentCalendar achievements={achievements} sessions={sessions} progress={progress} history={history} review={review} today={today} />

      <Heatmap byDay={byDay} today={today} selected={selected} onSelect={setSelected} earliestDay={earliestDay} />

      <DayDetail
        day={selected}
        today={today}
        agg={byDay.get(selected)}
        sessions={sessions}
        minutes={minutesFor(byDay.get(selected))}
      />

      <DashSection label="Testes e lições" />

      <WeeklyReportCard achievements={achievements} sessions={sessions} progress={progress} review={review} now={now} />

      <TestsRecent achievements={achievements} />

      <SlowestCard achievements={achievements} />

      <RecentActivity />

      <AreasBreakdown />

      <DashSection label="Definições" />

      <RewardSettings settings={settings} onChange={setSettings} />

      <PreReaderSettings />
    </div>
  );
}

/* ---- KPI strip: the week at a glance, one compact card per number ----- */

function KpiStrip({
  achievements,
  sessions,
  byDay,
  grade,
  today,
}: {
  achievements: Achievement[];
  sessions: StudySession[];
  byDay: Map<number, DayAgg>;
  grade: WeekGrade | null;
  today: number;
}) {
  const { minToday, minWeek } = useMemo(() => {
    const days = aggregateSessionsByDay(sessions);
    let minWeek = 0;
    for (let i = 0; i < 7; i++) minWeek += minutesOf(days.get(today - i * DAY));
    return { minToday: minutesOf(days.get(today)), minWeek };
  }, [sessions, today]);
  const totals = useMemo(() => {
    let passed = 0;
    for (const a of achievements) if (a.pct >= TEST_PASS_PCT) passed += 1;
    return { passed, total: achievements.length };
  }, [achievements]);
  const streak = currentStreak(byDay, today);
  const best = bestStreak(byDay);

  const kpis: { icon: IconName; value: React.ReactNode; label: string; color: string }[] = [
    { icon: "clock", value: minToday, label: "min hoje", color: "var(--subj-mat)" },
    { icon: "calendar", value: minWeek, label: "min esta semana", color: "var(--subj-en)" },
    { icon: "flame", value: streak, label: streak === 1 ? "dia seguido" : "dias seguidos", color: "var(--warn)" },
    { icon: "crown", value: best, label: "recorde de dias", color: "var(--subj-pt)" },
    { icon: "trophy", value: <>{totals.passed}<small>/{totals.total}</small></>, label: "testes passados", color: "var(--primary)" },
    { icon: "star", value: grade ? <>{grade.grade}<small>/20</small></> : "—", label: "nota da semana", color: "var(--subj-mundo)" },
  ];
  return (
    <div className="parent-kpis">
      {kpis.map((k) => (
        <div key={k.label} className="kpi" style={{ ["--kpi-c" as string]: k.color }}>
          <span className="kpi__ic"><Icon name={k.icon} size={16} /></span>
          <span className="kpi__v">{k.value}</span>
          <span className="kpi__l">{k.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- usage panel: how the app is actually used (study/usage.ts) ------ */

const USAGE_DAYS = 14;

function UsagePanel({ sessions, today }: { sessions: StudySession[]; today: number }) {
  const since = today - (USAGE_DAYS - 1) * DAY;
  const recent = useMemo(() => sessions.filter((s) => s.startedAt >= since), [sessions, since]);
  const u = useMemo(() => usageStats(recent), [recent]);
  const perDay = useMemo(() => sessionsPerDay(recent, today, USAGE_DAYS), [recent, today]);
  const byHour = useMemo(() => sessionsByHour(recent), [recent]);
  if (recent.length === 0) return null;

  const stats: { v: string; l: string }[] = [
    { v: String(u.entries), l: "sessões iniciadas" },
    { v: String(u.exits), l: "saídas a meio" },
    { v: u.hiddenSecs > 0 ? `${u.hidden} (${durationLabel(u.hiddenSecs)})` : String(u.hidden), l: "escondeu o browser" },
    { v: String(u.returns), l: "regressos" },
    { v: durationLabel(u.avgSecs), l: "duração média" },
  ];
  return (
    <div className="parent-usage dash-full">
      <CardHead icon="device" title="Como usam a app" aside="últimas 2 semanas" />
      <div className="parent-usage__stats">
        {stats.map((s) => (
          <div key={s.l} className="ustat">
            <span className="ustat__v">{s.v}</span>
            <span className="ustat__l">{s.l}</span>
          </div>
        ))}
      </div>
      <div className="parent-usage__charts">
        <Chart
          spec={{
            type: "bar",
            title: "Sessões por dia",
            labels: perDay.labels,
            data: perDay.data,
            unit: "sessões",
            say: `Sessões por dia nas últimas duas semanas. Hoje: ${perDay.data[perDay.data.length - 1]}.`,
          }}
        />
        {byHour.data.length >= 2 && (
          <Chart
            spec={{
              type: "bar",
              title: "Horas do dia mais usadas",
              labels: byHour.labels,
              data: byHour.data,
              unit: "sessões",
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ---- weekly report (study/report.ts; §4.11 "relatório de domingo") --- */

const pctLabel = (p: number): string => `${Math.round(p * 100)}%`;

function WeeklyReportCard({
  achievements,
  sessions,
  progress,
  review,
  now,
}: {
  achievements: Achievement[];
  sessions: StudySession[];
  progress: ProgressMap;
  review: ReviewMap;
  now: number;
}) {
  const r = useMemo(
    () => weeklyReport(now, achievements, sessions, progress, review),
    [now, achievements, sessions, progress, review],
  );
  if (!r) return null;
  const fmt = (d: number) => new Date(d).toLocaleDateString("pt-PT", { day: "numeric", month: "short" });
  const range = `${fmt(r.weekStart)} – ${fmt(r.weekEnd - DAY)}`;
  // Only movements worth a sentence (≥ 5 points either way), positives first.
  const trends = r.trends.filter((t) => Math.abs(t.curPct - t.prevPct) >= 0.05).slice(0, 3)
    .sort((a, b) => (b.curPct - b.prevPct) - (a.curPct - a.prevPct));

  return (
    <div className="parent-report dash-wide">
      <CardHead icon="chart" title="Relatório da semana" aside={range} />

      <div className="parent-report__stats">
        <span className="parent-stat"><span className="parent-stat__big">{r.daysStudied}</span> dia{r.daysStudied === 1 ? "" : "s"} de estudo</span>
        <span className="parent-stat"><span className="parent-stat__big">{r.totalMinutes}</span> min no total</span>
        <span className="parent-stat"><span className="parent-stat__big">{r.testsPassed}/{r.testsDone}</span> teste{r.testsDone === 1 ? "" : "s"} passado{r.testsDone === 1 ? "" : "s"}</span>
      </div>

      {r.subjectMinutes.length >= 2 && (
        <Chart
          spec={{
            type: "bar",
            title: "Minutos por disciplina",
            labels: r.subjectMinutes.map((e) => e.label),
            data: r.subjectMinutes.map((e) => e.minutes),
            unit: "min",
          }}
        />
      )}

      {trends.length > 0 && (
        <ul className="parent-report__list">
          {trends.map((t) => {
            const up = t.curPct >= t.prevPct;
            return (
              <li key={t.label} className={up ? "is-up" : "is-down"}>
                <Icon name={up ? "check" : "refresh"} size={14} />
                {up
                  ? `${t.label} subiu de ${pctLabel(t.prevPct)} para ${pctLabel(t.curPct)} — o treino está a resultar.`
                  : `${t.label} desceu de ${pctLabel(t.prevPct)} para ${pctLabel(t.curPct)} — vale a pena treinar juntos.`}
              </li>
            );
          })}
        </ul>
      )}

      {r.reviewNext.length > 0 && (
        <p className="parent-report__line">
          <Icon name="target" size={14} /> <strong>Para rever na próxima semana:</strong> {r.reviewNext.join(" · ")}
        </p>
      )}
      <p className="parent-report__line">
        <Icon name="calendar" size={14} /> <strong>Plano da próxima semana:</strong> {r.plan.days} dias ×{" "}
        {r.plan.minutesPerDay} min (segunda a sábado) ≈ {r.plan.days * r.plan.minutesPerDay} min.
      </p>
    </div>
  );
}

/* ---- pre-reader mode setting (§4.10; persisted in sprout.ui.v1) ------ */

function PreReaderSettings() {
  const [pref, setPref] = useState<PreReaderPref>(() => loadUiPrefs().preReader ?? "auto");
  const update = (next: PreReaderPref) => {
    setPref(next);
    saveUiPrefs({ preReader: next });
  };
  return (
    <div className="parent-settings">
      <CardHead icon="reading" title="Modo pré-leitor" />
      <label className="parent-field">
        <span>Letras grandes e respostas por imagem</span>
        <select value={pref} onChange={(e) => update(e.target.value as PreReaderPref)}>
          <option value="auto">Automático (1.º ano)</option>
          <option value="on">Sempre ligado</option>
          <option value="off">Desligado</option>
        </select>
      </label>
    </div>
  );
}

/* ---- alerts (study/alerts.ts rules; tone always constructive) ------- */

function AlertsCard({ sessions, achievements, now }: { sessions: StudySession[]; achievements: Achievement[]; now: number }) {
  const alerts = useMemo(() => buildAlerts(sessions, achievements, now), [sessions, achievements, now]);
  if (alerts.length === 0) return null;
  return (
    <div className="parent-alerts dash-full">
      {alerts.map((a, i) => (
        <div key={i} className={`parent-alert is-${a.tone}`}>
          <span className="parent-alert__ic"><Icon name={a.icon} size={18} /></span>
          <div className="parent-alert__tx">
            <strong>{a.text}</strong>
            <span>{a.why}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- "Nota da semana" — 0–20 over the last 14 days (study/grade.ts) --- */

function GradeRow({ icon, label, part }: { icon: IconName; label: string; part: GradePart | null }) {
  return (
    <div className="parent-grade__row">
      <span className="parent-grade__lbl"><Icon name={icon} size={14} /> {label}</span>
      {part ? (
        <>
          <span className="parent-grade__bar"><i style={{ width: `${Math.round(part.pct * 100)}%` }} /></span>
          <span className="parent-grade__n">{part.done}/{part.total}</span>
        </>
      ) : (
        <span className="parent-grade__n parent-grade__n--empty">sem dados</span>
      )}
    </div>
  );
}

function WeekGradeCard({ grade: g }: { grade: WeekGrade | null }) {
  if (!g) return null;
  // Encouraging, always: the grade points at where to help, never blames.
  const msg =
    g.grade >= 14
      ? "Semana forte — o ritmo está mesmo a resultar."
      : g.grade >= 10
        ? "Bom caminho — um empurrãozinho nas missões e sobe já."
        : "Semana com pouco treino — uns minutos por dia, juntos, mudam tudo.";
  return (
    <div className="parent-grade dash-wide">
      <div className="parent-grade__score">
        <strong>{g.grade}</strong>
        <span>/ 20</span>
        <small>Nota da semana</small>
      </div>
      <div className="parent-grade__parts">
        <GradeRow icon="calendar" label="Plano cumprido" part={g.adherence} />
        <GradeRow icon="trophy" label="Testes passados" part={g.passRate} />
        <GradeRow icon="reading" label="Leitura com atenção" part={g.reading} />
      </div>
      <p className="parent-grade__msg">{msg} <span>(últimos 14 dias)</span></p>
    </div>
  );
}

/* ---- one day's real activity: sessions with reading engagement ------- */

/** Lesson/test sessions of one day, newest first, each with its engagement
 *  label ("leu com atenção" / "passou os olhos" / …) and times. Shared by the
 *  calendar's past-day detail and the heatmap's day detail. */
function DaySessionRows({ sessions, day }: { sessions: StudySession[]; day: number }) {
  const items = sessions
    .filter((s) => startOfDay(s.startedAt) === day && s.lessonId && lessonMeta.has(s.lessonId))
    .slice(0, 12);
  if (items.length === 0) return null;
  return (
    <>
      {items.map((s) => {
        const meta = lessonMeta.get(s.lessonId!)!;
        const e = sessionEngagement(s);
        return (
          <div key={s.id} className="parent-row" style={{ ["--c" as string]: meta.color }}>
            <span className="parent-row__emoji" aria-hidden>{meta.emoji}</span>
            <div className="parent-row__main">
              <div className="parent-row__title">{meta.title}</div>
              <div className="parent-row__meta">
                <span className="parent-row__area"><span className="parent-row__dot" /> {meta.subjectLabel}</span>
                <span className="parent-row__time">
                  {s.secs > 0 && <span className="parent-row__dur"><Icon name="clock" size={12} /> {durationLabel(s.secs)}</span>}
                  {timeLabel(s.startedAt)}
                </span>
              </div>
            </div>
            <span className={`parent-engage is-${e}`}>{ENGAGEMENT_LABEL[e]}</span>
          </div>
        );
      })}
    </>
  );
}

/* ---- minutes per day (from the session log; last two weeks) --------- */

function MinutesChart({ sessions, now }: { sessions: StudySession[]; now: number }) {
  const today = startOfDay(now);
  const { labels, data } = useMemo(() => {
    const byDay = aggregateSessionsByDay(sessions);
    const labels: string[] = [];
    const data: number[] = [];
    for (let i = 13; i >= 0; i--) {
      const day = today - i * DAY;
      const d = new Date(day);
      labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
      data.push(minutesOf(byDay.get(day)));
    }
    return { labels, data };
  }, [sessions, today]);
  if (data.every((v) => v === 0)) return null;
  return (
    <div className="dash-wide">
      <Chart
        spec={{
          type: "bar",
          title: "Minutos de estudo por dia",
          labels,
          data,
          unit: "min",
          say: `Minutos de estudo por dia, nas últimas duas semanas. Hoje: ${data[data.length - 1]} minutos.`,
        }}
      />
    </div>
  );
}

/* ---- where the time goes: per-subject breakdown ---------------------- */

function SubjectChart({ sessions, achievements }: { sessions: StudySession[]; achievements: Achievement[] }) {
  const entries = useMemo(() => {
    // Prefer real session minutes; fall back to test counts for old data
    // recorded before session tracking existed.
    const secs = new Map<string, number>();
    for (const s of sessions) {
      if (s.subjectId && s.secs > 0) secs.set(s.subjectId, (secs.get(s.subjectId) ?? 0) + s.secs);
    }
    if (secs.size > 0) {
      return [...secs.entries()]
        .map(([id, v]) => ({ label: subjectById.get(id)?.label ?? id, value: Math.round(v / 60), unit: "min" }))
        .filter((e) => e.value > 0);
    }
    const counts = new Map<string, number>();
    for (const a of achievements) counts.set(a.subjectLabel, (counts.get(a.subjectLabel) ?? 0) + 1);
    return [...counts.entries()].map(([label, value]) => ({ label, value, unit: "testes" }));
  }, [sessions, achievements]);

  const top = entries.sort((a, b) => b.value - a.value).slice(0, 5);
  if (top.length < 2) return null;
  const unit = top[0].unit;
  return (
    <Chart
      spec={{
        type: "pie",
        title: unit === "min" ? "Tempo por disciplina" : "Testes por disciplina",
        labels: top.map((e) => e.label),
        data: top.map((e) => e.value),
        unit,
      }}
    />
  );
}

/* ---- the parents' calendar: done vs. should-have-been-done ----------- */

function ParentCalendar({
  achievements,
  sessions,
  progress,
  history,
  review,
  today,
}: {
  achievements: Achievement[];
  sessions: StudySession[];
  progress: ProgressMap;
  history: string[];
  review: ReviewMap;
  today: number;
}) {
  const [sel, setSel] = useState(today);
  const past = sel < today;
  const future = sel > today;
  // Planned-vs-done is shown for TODAY and FUTURE days only. For a past day
  // the plan would have to be RECONSTRUCTED from the current state (plans
  // aren't stored), which can mark "por fazer" missions that didn't even
  // exist that day — so past days show only the real activity instead.
  const planned = useMemo(
    () => (past ? [] : missionsForDay(sel, today, progress, achievements, history, Object.values(review))),
    [past, sel, today, progress, achievements, history, review],
  );
  const tests = useMemo(() => aggregateByDay(achievements).get(sel), [achievements, sel]);
  const mins = minutesOf(aggregateSessionsByDay(sessions).get(sel));
  const hadActivity = mins > 0 || (tests?.items.length ?? 0) > 0 ||
    sessions.some((s) => startOfDay(s.startedAt) === sel && !!s.lessonId && lessonMeta.has(s.lessonId));

  return (
    <div className="parent-plan dash-wide">
      <CardHead icon="calendar" title="Calendário do plano" />
      <PlanCalendar achievements={achievements} sessions={sessions} selected={sel} onSelect={setSel} />
      <div className="parent-detail" style={{ marginTop: 10 }}>
        <div className="parent-detail__head">
          <span className="parent-detail__date">{dayLabel(sel, today)}</span>
          {!future && mins > 0 && <span className="parent-detail__min"><Icon name="clock" size={14} /> {mins} min de estudo</span>}
        </div>
        {isRestDay(sel) ? (
          <p className="parent-detail__empty">Domingo — dia de descanso, sem missões.</p>
        ) : past ? (
          // Past day: only what really happened (sessions + tests).
          hadActivity ? (
            <>
              <DaySessionRows sessions={sessions} day={sel} />
              {tests && tests.items.length > 0 && (
                <p className="parent-plan__extra">
                  Testes nesse dia: {tests.passed} passado{tests.passed === 1 ? "" : "s"}
                  {tests.failed > 0 ? `, ${tests.failed} a repetir` : ""}.
                </p>
              )}
            </>
          ) : (
            <p className="parent-detail__empty">Sem atividade nesse dia.</p>
          )
        ) : (
          <>
            {planned.map((m) => (
              <div key={m.id} className="parent-mission">
                <span className={`parent-mission__st ${m.done ? "ok" : future ? "plan" : "miss"}`}>
                  <Icon name={m.done ? "check" : future ? "calendar" : "close"} size={14} />
                </span>
                <span className="parent-mission__tx">{m.title}</span>
                <span className="parent-mission__lbl">{m.done ? "feita" : future ? "planeada" : "por fazer"}</span>
              </div>
            ))}
            {!future && tests && tests.items.length > 0 && (
              <p className="parent-plan__extra">
                Testes nesse dia: {tests.passed} passado{tests.passed === 1 ? "" : "s"}
                {tests.failed > 0 ? `, ${tests.failed} a repetir` : ""}.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ---- tests done, with score + duration + time-based difficulty ------- */

const PACE_LABEL = { rapido: "rápido — pareceu fácil", normal: "ritmo normal", lento: "demorou — pareceu difícil" } as const;

function TestsRecent({ achievements }: { achievements: Achievement[] }) {
  const items = achievements.slice(0, 8);
  if (items.length === 0) return null;
  return (
    <div className="parent-detail">
      <CardHead icon="trophy" title="Últimos testes" />
      {items.map((a, i) => {
        const ok = a.pct >= TEST_PASS_PCT;
        const pace = paceOf(a);
        return (
          <div key={`${a.lessonId}-${a.at}-${i}`} className="parent-row" style={{ ["--c" as string]: a.color }}>
            <span className="parent-row__emoji" aria-hidden>{a.emoji}</span>
            <div className="parent-row__main">
              <div className="parent-row__title">{a.lessonTitle}</div>
              <div className="parent-row__meta">
                <span className="parent-row__area">
                  <span className="parent-row__dot" /> {a.subjectLabel} · {dayLabel(startOfDay(a.at), startOfDay(Date.now()))}
                </span>
                <span className="parent-row__time">
                  {a.secs != null && <span className="parent-row__dur"><Icon name="clock" size={12} /> {durationLabel(a.secs)}</span>}
                  {pace && pace !== "normal" && <span className={`parent-pace is-${pace}`}>{PACE_LABEL[pace]}</span>}
                </span>
              </div>
            </div>
            <span className={`parent-badge ${ok ? "ok" : "fail"}`}>
              <Icon name={ok ? "check" : "refresh"} size={13} /> {Math.round(a.pct * 100)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ---- "onde demoraram mais" — slowest tests by per-question time ------ */

function SlowestCard({ achievements }: { achievements: Achievement[] }) {
  const slow = slowestTests(achievements, 5);
  if (slow.length < 2) return null;
  return (
    <div className="parent-detail">
      <CardHead icon="clock" title="Onde demoraram mais" />
      {slow.map((a, i) => (
        <div key={`${a.lessonId}-${a.at}`} className="parent-row" style={{ ["--c" as string]: a.color }}>
          <span className="parent-slow__rank">{i + 1}</span>
          <div className="parent-row__main">
            <div className="parent-row__title">{a.lessonTitle}</div>
            <div className="parent-row__meta">
              <span className="parent-row__area"><span className="parent-row__dot" /> {a.subjectLabel}</span>
            </div>
          </div>
          <span className="parent-row__dur"><Icon name="clock" size={12} /> {durationLabel(a.secs ?? 0)}</span>
        </div>
      ))}
      <p className="parent-plan__extra">Demorar não é mau — mostra onde vale a pena treinar mais devagar.</p>
    </div>
  );
}

/** "O que andam a explorar" — how many lessons the child has OPENED per area
 *  (so reading/exploring the Biblioteca shows up, not just tests), how many they
 *  finished, plus the Biblioteca medals earned. Each tile opens an inline
 *  drill-down with that area's lessons (reading engagement + time) and tests.
 *  All derived from the stored logs, so nothing new is persisted. */
function AreasBreakdown() {
  const { progress, achievements } = useProgress();
  const sessions = useSessions();
  const [openArea, setOpenArea] = useState<HomeArea | null>(null);

  const opened: Record<HomeArea, number> = { escola: 0, biblioteca: 0, explorar: 0, treinar: 0 };
  const done: Record<HomeArea, number> = { escola: 0, biblioteca: 0, explorar: 0, treinar: 0 };
  for (const [id, p] of Object.entries(progress)) {
    if (!p?.visited) continue;
    const meta = lessonMeta.get(id);
    if (!meta) continue;
    const area = areaOf(meta.subjectId);
    opened[area] += 1;
    if (p.done) done[area] += 1;
  }

  const medals = bibliotecaMedals(progress);
  const medalsEarned = medals.filter((m) => m.earned).length;
  const areas: HomeArea[] = ["escola", "biblioteca", "explorar", "treinar"];

  return (
    <div className="parent-areas dash-wide">
      <CardHead icon="grid" title="O que andam a explorar" />
      <div className="parent-areas__grid">
        {areas.map((id) => (
          <button
            key={id}
            className={`parent-area ${opened[id] > 0 ? "is-on" : ""} ${openArea === id ? "is-open" : ""}`}
            onClick={() => setOpenArea((o) => (o === id ? null : id))}
            aria-expanded={openArea === id}
          >
            <span className="parent-area__ic"><Icon name={AREA_META[id].icon} size={18} /></span>
            <span className="parent-area__n">{opened[id]}</span>
            <span className="parent-area__l">{AREA_META[id].label}</span>
            {done[id] > 0 && <span className="parent-area__sub">{done[id]} feito{done[id] === 1 ? "" : "s"}</span>}
          </button>
        ))}
      </div>
      {openArea && (
        <AreaDetail area={openArea} progress={progress} achievements={achievements} sessions={sessions} />
      )}
      <div className="parent-areas__biblio">
        <Icon name="trophy" size={14} /> Biblioteca: <strong>{medalsEarned}</strong> de {medals.length} medalhas conquistadas
      </div>
    </div>
  );
}

/** The inline drill-down of one home area: the lessons touched there (reading
 *  engagement + total time, most recent first, capped) and its tests (score +
 *  duration + how many were abandoned mid-way). */
const AREA_LESSON_CAP = 20;
const AREA_TEST_CAP = 8;

function AreaDetail({
  area,
  progress,
  achievements,
  sessions,
}: {
  area: HomeArea;
  progress: ProgressMap;
  achievements: Achievement[];
  sessions: StudySession[];
}) {
  const inArea = (lessonId: string) => {
    const meta = lessonMeta.get(lessonId);
    return !!meta && areaOf(meta.subjectId) === area;
  };

  // Per-lesson aggregate over the LESSON sessions of this area: total active
  // seconds, max scroll, most recent visit. Lessons with progress but no
  // sessions (data older than the tracker) still appear, with no time.
  const lessons = useMemo(() => {
    const byLesson = new Map<string, { secs: number; scroll: number; lastAt: number }>();
    for (const s of sessions) {
      if (s.kind !== "lesson" || !s.lessonId || !inArea(s.lessonId)) continue;
      const agg = byLesson.get(s.lessonId) ?? { secs: 0, scroll: 0, lastAt: 0 };
      agg.secs += s.secs;
      agg.scroll = Math.max(agg.scroll, s.scrollPct ?? 0);
      agg.lastAt = Math.max(agg.lastAt, s.startedAt);
      byLesson.set(s.lessonId, agg);
    }
    for (const [id, p] of Object.entries(progress)) {
      if (!p?.visited || byLesson.has(id) || !inArea(id)) continue;
      byLesson.set(id, { secs: 0, scroll: 0, lastAt: 0 });
    }
    return [...byLesson.entries()]
      .sort((a, b) => b[1].lastAt - a[1].lastAt)
      .slice(0, AREA_LESSON_CAP);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, sessions, progress]);

  const tests = useMemo(() => achievements.filter((a) => inArea(a.lessonId)), [area, achievements]); // eslint-disable-line react-hooks/exhaustive-deps
  const abandoned = useMemo(
    () => sessions.filter((s) => s.kind === "test" && s.lessonId && inArea(s.lessonId) && !s.completed).length,
    [area, sessions], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className="parent-area-detail">
      {lessons.length > 0 && (
        <>
          <div className="parent-area-detail__sub"><Icon name="reading" size={14} /> Lições</div>
          {lessons.map(([id, agg]) => {
            const meta = lessonMeta.get(id)!;
            const done = !!progress[id]?.done;
            // A synthetic session lets the lesson aggregate reuse the SAME
            // engagement rules a single session uses (one source of truth).
            const e = sessionEngagement({
              id, startedAt: agg.lastAt, endedAt: agg.lastAt, secs: agg.secs, kind: "lesson",
              lessonId: id, completed: done, ...(done ? { score: 1 } : {}), scrollPct: agg.scroll,
              hiddenCount: 0, exited: false, events: [],
            });
            return (
              <div key={id} className="parent-row" style={{ ["--c" as string]: meta.color }}>
                <span className="parent-row__emoji" aria-hidden>{meta.emoji}</span>
                <div className="parent-row__main">
                  <div className="parent-row__title">{meta.title}</div>
                  <div className="parent-row__meta">
                    <span className="parent-row__area"><span className="parent-row__dot" /> {meta.subjectLabel}</span>
                    <span className="parent-row__time">
                      {agg.secs > 0 && <span className="parent-row__dur"><Icon name="clock" size={12} /> {durationLabel(agg.secs)}</span>}
                      {agg.lastAt > 0 && dayLabel(startOfDay(agg.lastAt), startOfDay(Date.now()))}
                    </span>
                  </div>
                </div>
                <span className={`parent-engage is-${e}`}>{ENGAGEMENT_LABEL[e]}</span>
              </div>
            );
          })}
        </>
      )}
      {tests.length > 0 && (
        <>
          <div className="parent-area-detail__sub"><Icon name="trophy" size={14} /> Testes</div>
          {tests.slice(0, AREA_TEST_CAP).map((a, i) => {
            const ok = a.pct >= TEST_PASS_PCT;
            return (
              <div key={`${a.lessonId}-${a.at}-${i}`} className="parent-row" style={{ ["--c" as string]: a.color }}>
                <span className="parent-row__emoji" aria-hidden>{a.emoji}</span>
                <div className="parent-row__main">
                  <div className="parent-row__title">{a.lessonTitle}</div>
                  <div className="parent-row__meta">
                    <span className="parent-row__area"><span className="parent-row__dot" /> {a.subjectLabel} · {dayLabel(startOfDay(a.at), startOfDay(Date.now()))}</span>
                    {a.secs != null && <span className="parent-row__dur"><Icon name="clock" size={12} /> {durationLabel(a.secs)}</span>}
                  </div>
                </div>
                <span className={`parent-badge ${ok ? "ok" : "fail"}`}>
                  <Icon name={ok ? "check" : "refresh"} size={13} /> {Math.round(a.pct * 100)}%
                </span>
              </div>
            );
          })}
        </>
      )}
      {abandoned > 0 && (
        <p className="parent-plan__extra">
          <Icon name="warn" size={12} /> {abandoned} teste{abandoned === 1 ? "" : "s"} começado{abandoned === 1 ? "" : "s"} e deixado{abandoned === 1 ? "" : "s"} a meio.
        </p>
      )}
      {lessons.length === 0 && tests.length === 0 && (
        <p className="parent-detail__empty">Ainda nada nesta área.</p>
      )}
    </div>
  );
}

/** "Visto recentemente" — the last lessons the child opened, newest first, with
 *  the area where it lives and whether the final test is done. Surfaces reading
 *  and browsing (e.g. the Biblioteca) that the test-only views never show. */
function RecentActivity() {
  const { history, progress } = useProgress();
  const items = history
    .map((id) => { const meta = lessonMeta.get(id); return meta ? { id, meta } : null; })
    .filter((x): x is { id: string; meta: NonNullable<ReturnType<typeof lessonMeta.get>> } => x !== null)
    .slice(0, 8);
  if (items.length === 0) return null;
  return (
    <div className="parent-detail">
      <CardHead icon="eye" title="Visto recentemente" />
      {items.map(({ id, meta }) => {
        const area = areaOf(meta.subjectId);
        const tier = tierLabel(meta.subjectId, meta.year);
        const finished = progress[id]?.done;
        return (
          <div key={id} className="parent-row" style={{ ["--c" as string]: meta.color }}>
            <span className="parent-row__emoji" aria-hidden>{meta.emoji}</span>
            <div className="parent-row__main">
              <div className="parent-row__title">{meta.title}</div>
              <div className="parent-row__meta">
                <span className="parent-row__area"><span className="parent-row__dot" /> {AREA_META[area].label} · {meta.subjectLabel}{tier ? ` · ${tier}` : ""}</span>
              </div>
            </div>
            <span className={`parent-badge ${finished ? "ok" : "seen"}`}>
              <Icon name={finished ? "check" : "eye"} size={13} /> {finished ? "Feito" : "Viu"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function TodayCard({ agg, minutes, settings }: { agg: DayAgg | undefined; minutes: number; settings: ParentSettings }) {
  const passed = agg?.passed ?? 0;
  const failed = agg?.failed ?? 0;
  const state = passed > 0 ? "win" : failed > 0 ? "tried" : "none";
  return (
    <div className={`parent-today is-${state} dash-wide`}>
      <div className="parent-today__lead">
        {state === "win" && <><Icon name="check" size={18} /> Estudou hoje!</>}
        {state === "tried" && <><Icon name="warn" size={18} /> Quase! Falta passar com 80%+</>}
        {state === "none" && <><Icon name="info" size={18} /> Ainda não estudou hoje</>}
      </div>
      <div className="parent-today__reward">
        <span className="parent-today__min"><Icon name="device" size={18} /> {minutes} min</span>
        <span className="parent-today__sub">
          {state === "win"
            ? `${settings.rewardBase} min + ${settings.rewardPerStar} min × ${agg!.stars} estrelas`
            : "de tablet — faz 1 teste com 80%+ para ganhar"}
        </span>
      </div>
    </div>
  );
}

function Heatmap({
  byDay,
  today,
  selected,
  onSelect,
  earliestDay,
}: {
  byDay: Map<number, DayAgg>;
  today: number;
  selected: number;
  onSelect: (day: number) => void;
  earliestDay: number | null;
}) {
  // One calendar quarter (trimestre) at a time. The current quarter is the
  // default; the parent steps back as far as the first recorded test.
  const curIdx = quarterIndex(today);
  const minIdx = earliestDay == null ? curIdx : quarterIndex(earliestDay);
  const [idx, setIdx] = useState(curIdx);
  const year = Math.floor(idx / 4);
  const q = idx % 4;

  // Build the quarter as a column-first (Sun→Sat) grid, padding to whole weeks.
  // Days outside the quarter are kept as faint placeholders so the rectangle
  // stays clean; days after today are blank.
  const { cells, months, cols, first, last } = useMemo(() => {
    const startMonth = q * 3;
    const first = startOfDay(new Date(year, startMonth, 1).getTime());
    const last = startOfDay(new Date(year, startMonth + 3, 0).getTime()); // day 0 of next month
    const firstSunday = first - new Date(first).getDay() * DAY;
    const lastSaturday = last + (6 - new Date(last).getDay()) * DAY;
    const cols = Math.round((lastSaturday - firstSunday) / (7 * DAY)) + 1;
    const cells: number[] = [];
    const months: { col: number; label: string }[] = [];
    let shown = -1;
    for (let w = 0; w < cols; w++) {
      const colStart = firstSunday + w * 7 * DAY;
      const m = new Date(colStart).getMonth();
      if (m >= startMonth && m < startMonth + 3 && m !== shown) {
        months.push({ col: w + 1, label: new Date(colStart).toLocaleDateString("pt-PT", { month: "short" }) });
        shown = m;
      }
      for (let r = 0; r < 7; r++) cells.push(firstSunday + (w * 7 + r) * DAY);
    }
    return { cells, months, cols, first, last };
  }, [year, q]);

  const weekdays = ["", "Seg", "", "Qua", "", "Sex", ""];
  const style = { ["--cols" as string]: cols } as React.CSSProperties;

  return (
    <div className="hm dash-wide" style={style}>
      <div className="hm-nav">
        <button className="iconbtn" onClick={() => setIdx((i) => i - 1)} disabled={idx <= minIdx} aria-label="Trimestre anterior">
          <Icon name="back" size={18} />
        </button>
        <span className="hm-nav__label">{q + 1}.º trimestre · {year}</span>
        <button className="iconbtn" onClick={() => setIdx((i) => i + 1)} disabled={idx >= curIdx} aria-label="Trimestre seguinte">
          <Icon name="forward" size={18} />
        </button>
      </div>

      <div className="hm-head">
        <span className="hm-gutter" />
        <div className="hm-months">
          {months.map((m) => (
            <span key={m.col} className="hm-month" style={{ gridColumn: m.col }}>{m.label}</span>
          ))}
        </div>
      </div>

      <div className="hm-body">
        <div className="hm-days">
          {weekdays.map((d, i) => (
            <span key={i} className="hm-day">{d}</span>
          ))}
        </div>
        <div className="hm-grid">
          {cells.map((day) => {
            if (day < first || day > last) return <span key={day} className="hm-cell is-pad" aria-hidden />;
            if (day > today) return <span key={day} className="hm-cell is-future" aria-hidden />;
            const agg = byDay.get(day);
            const passed = agg?.passed ?? 0;
            const failed = agg?.failed ?? 0;
            const label = `${dayLabel(day, today)}: ${passed} passado${passed === 1 ? "" : "s"}${failed ? `, ${failed} falhado${failed === 1 ? "" : "s"}` : ""}`;
            return (
              <button
                key={day}
                className={`hm-cell lvl-${levelOf(passed)} ${day === selected ? "is-sel" : ""} ${failed ? "has-fail" : ""}`}
                title={label}
                aria-label={label}
                onClick={() => onSelect(day)}
              />
            );
          })}
        </div>
      </div>

      <div className="hm-legend">
        <span>Menos</span>
        <span className="hm-cell lvl-0" /><span className="hm-cell lvl-1" /><span className="hm-cell lvl-2" /><span className="hm-cell lvl-3" /><span className="hm-cell lvl-4" />
        <span>Mais</span>
        <span className="hm-legend__sep" />
        <span className="hm-cell lvl-0 has-fail" /><span>Teste falhado</span>
      </div>
    </div>
  );
}

/** A "tests per day" bar chart — one bar per day for a chosen month (passed
 *  in green, failed in red), with ◂ ▸ to step back through history (this
 *  month, last month, …). Today's bar is marked. Plain inline layout, no
 *  chart library (like the lesson `chart` widget). */
function MonthlyActivity({ achievements, now, earliestDay }: { achievements: Achievement[]; now: number; earliestDay: number | null }) {
  const monthIndex = (t: number) => { const d = new Date(t); return d.getFullYear() * 12 + d.getMonth(); };
  const curIdx = monthIndex(now);
  const minIdx = earliestDay == null ? curIdx : monthIndex(earliestDay);
  const [idx, setIdx] = useState(curIdx);
  const year = Math.floor(idx / 12);
  const month = idx % 12;
  const today = startOfDay(now);

  const { days, max, total, label } = useMemo(() => {
    const count = new Date(year, month + 1, 0).getDate();
    const days = Array.from({ length: count }, (_, i) => ({ n: i + 1, date: startOfDay(new Date(year, month, i + 1).getTime()), passed: 0, failed: 0 }));
    for (const a of achievements) {
      const d = new Date(a.at);
      if (d.getFullYear() !== year || d.getMonth() !== month) continue;
      if (a.pct >= TEST_PASS_PCT) days[d.getDate() - 1].passed += 1;
      else days[d.getDate() - 1].failed += 1;
    }
    const max = Math.max(1, ...days.map((d) => d.passed + d.failed));
    const total = days.reduce((n, d) => n + d.passed + d.failed, 0);
    const label = new Date(year, month, 1).toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
    return { days, max, total, label };
  }, [year, month, achievements]);

  return (
    <div className="usage dash-wide">
      <CardHead
        icon="chart"
        title="Testes por dia"
        aside={
          <span className="usage__legend">
            <span><i className="usage__dot pass" /> passados</span>
            <span><i className="usage__dot fail" /> falhados</span>
          </span>
        }
      />
      <div className="usage__nav">
        <button className="iconbtn" onClick={() => setIdx((i) => i - 1)} disabled={idx <= minIdx} aria-label="Mês anterior">
          <Icon name="back" size={18} />
        </button>
        <span className="usage__month">{label}</span>
        <button className="iconbtn" onClick={() => setIdx((i) => i + 1)} disabled={idx >= curIdx} aria-label="Mês seguinte">
          <Icon name="forward" size={18} />
        </button>
      </div>
      {total === 0 ? (
        <p className="usage__empty">Sem testes em {label}.</p>
      ) : (
        <div className="usage__bars">
          {days.map((d) => (
            <div
              key={d.n}
              className={`usage__col ${d.date === today ? "is-today" : ""}`}
              title={`${d.n} — ${d.passed} passado${d.passed === 1 ? "" : "s"}, ${d.failed} falhado${d.failed === 1 ? "" : "s"}`}
            >
              <span className="usage__seg fail" style={{ height: `${(d.failed / max) * 100}%` }} />
              <span className="usage__seg pass" style={{ height: `${(d.passed / max) * 100}%` }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DayDetail({
  day,
  today,
  agg,
  sessions,
  minutes,
}: {
  day: number;
  today: number;
  agg: DayAgg | undefined;
  sessions: StudySession[];
  minutes: number;
}) {
  const hasSessions = sessions.some((s) => startOfDay(s.startedAt) === day && s.lessonId && lessonMeta.has(s.lessonId));
  return (
    <div className="parent-detail">
      <CardHead
        icon="calendar"
        title={dayLabel(day, today)}
        aside={agg && agg.passed > 0 ? <span className="parent-detail__min"><Icon name="device" size={13} /> {minutes} min</span> : undefined}
      />
      {/* How each lesson/test was actually used (reading engagement + time). */}
      {hasSessions && <DaySessionRows sessions={sessions} day={day} />}
      {!agg ? (
        !hasSessions && <p className="parent-detail__empty">Nada nesse dia.</p>
      ) : (
        agg.items.map((a, i) => {
          const ok = a.pct >= TEST_PASS_PCT;
          return (
            <div key={`${a.lessonId}-${a.at}-${i}`} className="parent-row" style={{ ["--c" as string]: a.color }}>
              <span className="parent-row__emoji" aria-hidden>{a.emoji}</span>
              <div className="parent-row__main">
                <div className="parent-row__title">{a.lessonTitle}</div>
                <div className="parent-row__meta">
                  <span className="parent-row__area"><span className="parent-row__dot" /> {a.subjectLabel}{tierLabel(a.subjectId, a.year) ? ` · ${tierLabel(a.subjectId, a.year)}` : ""}</span>
                  <span className="parent-row__time">
                    {a.secs != null && (
                      <span className="parent-row__dur"><Icon name="clock" size={12} /> {durationLabel(a.secs)}</span>
                    )}
                    {timeLabel(a.at)}
                  </span>
                </div>
              </div>
              <span className={`parent-badge ${ok ? "ok" : "fail"}`}>
                <Icon name={ok ? "check" : "close"} size={13} /> {Math.round(a.pct * 100)}%
              </span>
            </div>
          );
        })
      )}
    </div>
  );
}

function RewardSettings({ settings, onChange }: { settings: ParentSettings; onChange: (patch: Partial<ParentSettings>) => void }) {
  const clamp = (v: string) => Math.max(0, Math.min(999, Math.round(Number(v) || 0)));
  return (
    <div className="parent-settings">
      <CardHead icon="gear" title="Tempo de tablet" />
      <label className="parent-field">
        <span>Minutos base</span>
        <input type="number" min={0} max={999} value={settings.rewardBase} onChange={(e) => onChange({ rewardBase: clamp(e.target.value) })} />
      </label>
      <label className="parent-field">
        <span>Minutos por estrela</span>
        <input type="number" min={0} max={999} value={settings.rewardPerStar} onChange={(e) => onChange({ rewardPerStar: clamp(e.target.value) })} />
      </label>
    </div>
  );
}

/* "Limpar tudo" — its own small modal, opened from the settings menu. The
 * destructive wipe is gated by a multiplication a small child can't solve, so
 * it can't be triggered by accident and the maths IS the confirmation. */
export function WipeModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="parent-modal parent-modal--sm" role="dialog" aria-label="Limpar tudo">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <strong className="parent-title"><Icon name="trash" size={20} /> Limpar tudo</strong>
          <button className="iconbtn" onClick={onClose} aria-label="Fechar">
            <Icon name="close" size={22} />
          </button>
        </div>
        <WipeConfirm onCancel={onClose} />
      </div>
    </>
  );
}

function WipeConfirm({ onCancel }: { onCancel: () => void }) {
  // 6–9 × 6–9: trivial for a parent, out of reach for a pre-reader.
  const [a] = useState(() => 6 + Math.floor(Math.random() * 4));
  const [b] = useState(() => 6 + Math.floor(Math.random() * 4));
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const [wiping, setWiping] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(val) !== a * b) {
      setErr(true);
      setVal("");
      return;
    }
    setWiping(true);
    await store.clearAll();
    // A reload is the simplest guaranteed reset (in-session React state merges
    // back on hydrate otherwise). After this, the app boots to a clean slate.
    window.location.reload();
  };

  return (
    <form className="parent-danger__confirm" onSubmit={submit}>
      <p>Isto apaga <strong>todo o progresso</strong> (estrelas, testes, histórico). Não dá para desfazer.</p>
      <div className="parent-gate__q">
        Para confirmar: {a} × {b} =
        <input
          className={`parent-gate__in ${err ? "is-err" : ""}`}
          type="number"
          inputMode="numeric"
          autoFocus
          value={val}
          onChange={(e) => { setVal(e.target.value); setErr(false); }}
          aria-label="Resultado"
          disabled={wiping}
        />
      </div>
      {err && <p className="parent-gate__err">Não é esse. Tenta outra vez.</p>}
      <div className="parent-danger__actions">
        <button type="button" className="recent-tool" onClick={onCancel} disabled={wiping}>Cancelar</button>
        <button type="submit" className="parent-wipe" disabled={wiping}>
          <Icon name="trash" size={16} /> {wiping ? "A apagar…" : "Apagar tudo"}
        </button>
      </div>
    </form>
  );
}
