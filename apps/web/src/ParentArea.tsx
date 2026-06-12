import { useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { TrendChart, BarList } from "@sprout/ui";
import { useProgress, TEST_PASS_PCT, type Achievement, type ProgressMap } from "./progress";
import {
  tierLabel,
  yearLabel,
  lessonMeta,
  subjectById,
  subjectsForYear,
  YEARS,
  isEstudo, isMundo, isPaises,
  isDicionario, isVerbos, isEnciclopedia, isCores, isAtlas,
  type YearN,
} from "./content/curriculum";
import { bibliotecaMedals } from "./biblioteca";
import { store } from "./storage";
import { useSessions, type StudySession } from "./study/sessions";
import {
  DAY, startOfDay, isRestDay, aggregateByDay, aggregateSessionsByDay, minutesOf,
  sessionEngagement, ENGAGEMENT_LABEL, type DayAgg,
} from "./study/calendar";
import { missionsForDay } from "./study/plan";
import { useFeriasState, activePlan, feriasProgress, feriasStatusLine, planRecordLabel, type StudyPlan, type PlanRecord } from "./study/ferias";
import { buildAlerts, paceOf, slowestTests } from "./study/alerts";
import { usageStats, sessionsPerDay, sessionsByHour, hiddenSecsOf, sessionSegments } from "./study/usage";
import { weekGrade, type WeekGrade, type GradePart } from "./study/grade";
import { useReview, dueByLesson, type ReviewMap } from "./study/review";
import { weeklyReport } from "./study/report";
import { useTpcs, addTpc, removeTpc, tpcLessonDone, tpcDueLabel, MAX_TPC_LESSONS, TPC_DUE_DAYS, type Tpc } from "./study/tpc";
import { useDiagnostic, weakSubjects, diagnosticScoresLine } from "./study/diagnostico";
import { PlanCalendar } from "./study/Plano";
import { loadUiPrefs, saveUiPrefs, type PreReaderPref } from "./ui-prefs";
import { viewToHash } from "./nav";
import { version as appVersion } from "../package.json";

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

/** Long lists cap at a few rows + this expander, so one busy day can't blow
 *  a card out of the grid's rhythm (the columns stay balanced). */
const LIST_CAP = 8;

function MoreToggle({ hidden, expanded, onToggle }: { hidden: number; expanded: boolean; onToggle: () => void }) {
  if (hidden <= 0 && !expanded) return null;
  return (
    <button type="button" className="parent-more" onClick={onToggle}>
      <Icon name={expanded ? "close" : "forward"} size={13} /> {expanded ? "ver menos" : `ver mais (${hidden})`}
    </button>
  );
}

/** The dashboard's three tabs (view-local state, no routes): the day-to-day
 *  overview, the STUDY-PLAN metrics, and the raw usage drill-down. */
type DashTab = "geral" | "estudo" | "uso";
const DASH_TABS: { id: DashTab; label: string; icon: IconName }[] = [
  { id: "geral", label: "Visão geral", icon: "eye" },
  { id: "estudo", label: "Estudo", icon: "calendar" },
  { id: "uso", label: "Utilização", icon: "device" },
];

function Dashboard() {
  const { achievements, progress, history } = useProgress();
  const sessions = useSessions();
  const review = useReview();
  const [settings, setSettings] = useParentSettings();
  const [now] = useState(() => Date.now());
  const today = startOfDay(now);
  const [tab, setTab] = useState<DashTab>("geral");

  const byDay = useMemo(() => aggregateByDay(achievements), [achievements]);
  const [selected, setSelected] = useState<number>(today);
  // The log is newest-first, so the last entry is the oldest recorded test.
  const earliestDay = achievements.length ? startOfDay(achievements[achievements.length - 1].at) : null;

  const minutesFor = (agg: DayAgg | undefined): number =>
    agg && agg.passed > 0 ? settings.rewardBase + settings.rewardPerStar * agg.stars : 0;

  const todayAgg = byDay.get(today);
  // The férias plan (§4.8): one plan per year — `activePlan` is the shared
  // accessor. When active it feeds the calendar's planned days and the
  // grade's "plano cumprido" (via missionsForDay / weekGrade).
  const planState = useFeriasState();
  const ferias = activePlan(planState);
  const planHistory = planState.history;
  const tpcs = useTpcs(); // TPC (§4.12): assigned + listed in the Estudo tab
  const grade = useMemo(
    () => weekGrade(now, progress, achievements, history, sessions, ferias),
    [now, progress, achievements, history, sessions, ferias],
  );

  return (
    <>
      <div className="parent-tabs" role="tablist" aria-label="Secções da área dos pais">
        {DASH_TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`parent-tab ${tab === t.id ? "is-on" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <Icon name={t.icon} size={16} /> {t.label}
          </button>
        ))}
      </div>

      <div className="parent-dash">
        {tab === "geral" && (
          <>
            <AlertsCard sessions={sessions} achievements={achievements} now={now} tpcs={tpcs} />
            <KpiStrip achievements={achievements} sessions={sessions} byDay={byDay} grade={grade} today={today} />
            <TodayCard agg={todayAgg} minutes={minutesFor(todayAgg)} settings={settings} />
            <WeekGradeCard grade={grade} />

            {/* settings stay one tap away (user choice) — parents configure first */}
            <DashSection label="Definições" />
            <RewardSettings settings={settings} onChange={setSettings} />
            <PreReaderSettings />
            <ExportCard />
          </>
        )}

        {tab === "estudo" && (
          <>
            {ferias && <FeriasInfoCard plan={ferias} progress={progress} today={today} />}
            <DiagnosticoCard />
            <TpcCard tpcs={tpcs} achievements={achievements} today={today} planYear={ferias?.year ?? null} />
            <PlanAdherenceCard grade={grade} hasPlan={!!ferias} />
            <ReviewDueCard review={review} now={now} />
            <PlanHistoryCard history={planHistory} />
            <ParentCalendar achievements={achievements} sessions={sessions} progress={progress} history={history} review={review} ferias={ferias} tpcs={tpcs} today={today} />
            <WeeklyReportCard achievements={achievements} sessions={sessions} progress={progress} review={review} now={now} />
          </>
        )}

        {tab === "uso" && (
          <>
            <UsagePanel sessions={sessions} today={today} />
            <MinutesChart sessions={sessions} now={now} />
            <SubjectChart sessions={sessions} achievements={achievements} />
            <MonthlyActivity achievements={achievements} now={now} earliestDay={earliestDay} />
            <Heatmap byDay={byDay} today={today} selected={selected} onSelect={setSelected} earliestDay={earliestDay} />
            <DayDetail
              day={selected}
              today={today}
              agg={byDay.get(selected)}
              sessions={sessions}
              minutes={minutesFor(byDay.get(selected))}
            />
            <DashSection label="Testes e lições" />
            <TestsRecent achievements={achievements} />
            <SlowestCard achievements={achievements} />
            <RecentActivity />
            <AreasBreakdown />
          </>
        )}
      </div>
    </>
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
        <div className="pchart">
          <span className="pchart__t">Sessões por dia</span>
          <TrendChart
            labels={perDay.labels}
            unit="sessões"
            series={[{ label: "Sessões", data: perDay.data, color: "var(--subj-en)", fill: true }]}
          />
        </div>
        {byHour.data.length >= 2 && (
          <div className="pchart">
            <span className="pchart__t">Horas do dia mais usadas</span>
            <BarList
              items={byHour.labels.map((label, i) => ({ label, value: byHour.data[i], color: "var(--subj-en)" }))}
              unit="sessões"
            />
          </div>
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
        <div className="pchart">
          <span className="pchart__t">Minutos por disciplina</span>
          <BarList
            items={r.subjectMinutes.map((e) => ({ label: e.label, value: e.minutes, color: subjectColorByLabel(e.label) }))}
            unit="min"
          />
        </div>
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

/* ---- export (settings): download every sprout.* key as one JSON ------ */

/** "Exportar dados (JSON)" — a pretty-printed snapshot of ALL study data
 *  (progress, achievements, history, sessions, review, plan + its history,
 *  parent settings, ui prefs…), downloaded via the standard Blob + <a download>
 *  pattern. Lets a parent back up or move the child's data — there's no server. */
function ExportCard() {
  const exportJson = () => {
    const payload = {
      app: "Sprout",
      version: appVersion,
      exportedAt: new Date().toISOString(),
      data: store.exportAll(), // every sprout.* key, parsed
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sprout-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="parent-settings">
      <CardHead icon="download" title="Os dados" />
      <p className="parent-plan__extra">
        Tudo o que a app guarda (progresso, testes, sessões, planos) fica só neste aparelho.
        Descarrega uma cópia para guardar ou mudar de dispositivo.
      </p>
      <button type="button" className="pill ghost" onClick={exportJson}>
        <Icon name="download" size={16} /> Exportar dados (JSON)
      </button>
    </div>
  );
}

/* ---- alerts (study/alerts.ts rules; tone always constructive) ------- */

function AlertsCard({ sessions, achievements, now, tpcs }: { sessions: StudySession[]; achievements: Achievement[]; now: number; tpcs: Tpc[] }) {
  const alerts = useMemo(() => buildAlerts(sessions, achievements, now, tpcs), [sessions, achievements, now, tpcs]);
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

/** "esteve parado 2m em 3 paragens" — the session's paused time, pt-PT. */
const pauseLabel = (pausedSecs: number, pauses: number): string =>
  `esteve parado ${durationLabel(pausedSecs)} em ${pauses} ${pauses === 1 ? "paragem" : "paragens"}`;

/** The "evolution of the lesson": one slim horizontal bar along the session's
 *  wall-clock span — green while active, grey-striped while the tab was hidden
 *  (segments from study/usage.ts sessionSegments). Pure SVG, no library. */
function SessionSegmentBar({ session }: { session: StudySession }) {
  const segs = sessionSegments(session);
  if (segs.length < 2) return null; // a fully-active session needs no bar
  const total = segs[segs.length - 1].toSec;
  const patternId = `pseg-${session.id}`;
  const title = `Evolução da sessão: ${segs
    .map((g) => `${g.type === "ativo" ? "ativo" : "parado"} ${durationLabel(g.toSec - g.fromSec)}`)
    .join(", ")}.`;
  return (
    <svg className="pseg__bar" viewBox="0 0 100 8" preserveAspectRatio="none" role="img" aria-label={title}>
      <title>{title}</title>
      <pattern id={patternId} patternUnits="userSpaceOnUse" width="4" height="8" patternTransform="rotate(45)">
        <rect width="2" height="8" fill="currentColor" opacity="0.45" />
      </pattern>
      {segs.map((g, i) => (
        <rect
          key={i}
          x={(g.fromSec / total) * 100}
          y={0}
          width={((g.toSec - g.fromSec) / total) * 100}
          height={8}
          fill={g.type === "ativo" ? "var(--primary)" : `url(#${patternId})`}
        >
          <title>{`${g.type === "ativo" ? "Ativo" : "Parado"}: ${durationLabel(g.toSec - g.fromSec)}`}</title>
        </rect>
      ))}
    </svg>
  );
}

/** One display row of a day: a session, or several CONSECUTIVE sessions of
 *  the same lesson folded into one (re-mount/navigation joggling used to log
 *  one session per mount — sessions.ts now resumes them, this keeps any
 *  leftovers readable without rewriting the log). */
interface DayRow {
  /** representative session (the longest) — carries the segment bar */
  rep: StudySession;
  secs: number;
  paused: number;
  pauses: number;
  /** earliest start of the folded run (the list is newest-first) */
  startedAt: number;
  completed: boolean;
  score?: number;
  scrollPct?: number;
}

function dayRowsOf(sessions: StudySession[], day: number): DayRow[] {
  const items = sessions.filter((s) => startOfDay(s.startedAt) === day && s.lessonId && lessonMeta.has(s.lessonId));
  const rows: DayRow[] = [];
  for (const s of items) {
    const prev = rows[rows.length - 1];
    if (prev && prev.rep.lessonId === s.lessonId && prev.rep.kind === s.kind) {
      prev.secs += s.secs;
      prev.paused += hiddenSecsOf(s);
      prev.pauses += s.hiddenCount;
      prev.startedAt = s.startedAt; // s is older — keep the run's first start
      prev.completed = prev.completed || s.completed;
      if (s.score != null) prev.score = Math.max(prev.score ?? 0, s.score);
      if (s.scrollPct != null) prev.scrollPct = Math.max(prev.scrollPct ?? 0, s.scrollPct);
      if (s.secs > prev.rep.secs) prev.rep = s;
    } else {
      rows.push({
        rep: s,
        secs: s.secs,
        paused: hiddenSecsOf(s),
        pauses: s.hiddenCount,
        startedAt: s.startedAt,
        completed: s.completed,
        ...(s.score != null ? { score: s.score } : {}),
        ...(s.scrollPct != null ? { scrollPct: s.scrollPct } : {}),
      });
    }
  }
  return rows;
}

/** Lesson/test sessions of one day, newest first, each with its engagement
 *  label ("leu com atenção" / "passou os olhos" / …), times, paused time and
 *  the active/paused segment bar. Consecutive same-lesson sessions fold into
 *  one row; long days cap at LIST_CAP + "ver mais". Opens with the day's
 *  active-vs-paused aggregate. Shared by the calendar's past-day detail and
 *  the heatmap's day detail. */
function DaySessionRows({ sessions, day }: { sessions: StudySession[]; day: number }) {
  const rows = useMemo(() => dayRowsOf(sessions, day), [sessions, day]);
  const [expanded, setExpanded] = useState(false);
  if (rows.length === 0) return null;
  const shown = expanded ? rows : rows.slice(0, LIST_CAP);
  const activeSecs = rows.reduce((n, r) => n + r.secs, 0);
  const pausedSecs = rows.reduce((n, r) => n + r.paused, 0);
  return (
    <>
      <p className="parent-day-totals">
        <Icon name="clock" size={13} /> {durationLabel(activeSecs)} ativo
        {pausedSecs > 0 && <> · {durationLabel(pausedSecs)} parado</>}
      </p>
      {shown.map((r) => {
        const meta = lessonMeta.get(r.rep.lessonId!)!;
        // The folded run reuses the single-session engagement rules (one
        // source of truth) over its combined time/scroll/score.
        const e = sessionEngagement({
          ...r.rep,
          secs: r.secs,
          completed: r.completed,
          ...(r.score != null ? { score: r.score } : {}),
          ...(r.scrollPct != null ? { scrollPct: r.scrollPct } : {}),
        });
        return (
          <div key={r.rep.id} className="parent-row" style={{ ["--c" as string]: meta.color }}>
            <span className="parent-row__emoji" aria-hidden>{meta.emoji}</span>
            <div className="parent-row__main">
              <div className="parent-row__title">{meta.title}</div>
              <div className="parent-row__meta">
                <span className="parent-row__area"><span className="parent-row__dot" /> {meta.subjectLabel}</span>
                <span className="parent-row__time">
                  {r.secs > 0 && <span className="parent-row__dur"><Icon name="clock" size={12} /> {durationLabel(r.secs)}</span>}
                  {timeLabel(r.startedAt)}
                </span>
              </div>
              {r.paused > 0 && <div className="parent-row__pause">{pauseLabel(r.paused, r.pauses)}</div>}
              <SessionSegmentBar session={r.rep} />
            </div>
            <span className={`parent-engage is-${e}`}>{ENGAGEMENT_LABEL[e]}</span>
          </div>
        );
      })}
      <MoreToggle hidden={rows.length - shown.length} expanded={expanded} onToggle={() => setExpanded((v) => !v)} />
    </>
  );
}

/* ---- minutes per day (from the session log; last 30 days) ----------- */

const TREND_DAYS = 30;

function MinutesChart({ sessions, now }: { sessions: StudySession[]; now: number }) {
  const today = startOfDay(now);
  const { labels, data, avg } = useMemo(() => {
    const byDay = aggregateSessionsByDay(sessions);
    const labels: string[] = [];
    const data: number[] = [];
    for (let i = TREND_DAYS - 1; i >= 0; i--) {
      const day = today - i * DAY;
      const d = new Date(day);
      labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
      data.push(minutesOf(byDay.get(day)));
    }
    // 7-day moving average — the habit trend reads through the daily spikes.
    const avg = data.map((_, i) => {
      const from = Math.max(0, i - 6);
      const window = data.slice(from, i + 1);
      return Math.round(window.reduce((s, v) => s + v, 0) / window.length);
    });
    return { labels, data, avg };
  }, [sessions, today]);
  if (data.every((v) => v === 0)) return null;
  return (
    <div className="parent-detail dash-wide">
      <CardHead icon="chart" title="Minutos de estudo por dia" aside="últimos 30 dias" />
      <TrendChart
        labels={labels}
        unit="min"
        series={[
          { label: "Minutos", data, color: "var(--primary)", fill: true },
          { label: "Média de 7 dias", data: avg, color: "var(--subj-mat)", dash: true },
        ]}
      />
    </div>
  );
}

/* ---- where the time goes: per-subject breakdown ---------------------- */

/** The subject's token colour for a chart row, looked up by its LABEL (the
 *  achievements log and the weekly report only carry labels). */
const subjectColorByLabel = (label: string): string | undefined =>
  [...subjectById.values()].find((s) => s.label === label)?.color;

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
        .map(([id, v]) => {
          const subj = subjectById.get(id);
          return { label: subj?.label ?? id, color: subj?.color, value: Math.round(v / 60), unit: "min" };
        })
        .filter((e) => e.value > 0);
    }
    const counts = new Map<string, number>();
    for (const a of achievements) counts.set(a.subjectLabel, (counts.get(a.subjectLabel) ?? 0) + 1);
    return [...counts.entries()].map(([label, value]) => ({ label, value, unit: "testes", color: subjectColorByLabel(label) }));
  }, [sessions, achievements]);

  const top = entries.sort((a, b) => b.value - a.value).slice(0, 6);
  if (top.length < 2) return null;
  const unit = top[0].unit;
  return (
    <div className="parent-detail">
      <CardHead icon="chart" title={unit === "min" ? "Tempo por disciplina" : "Testes por disciplina"} />
      <BarList items={top} unit={unit} />
    </div>
  );
}

/* ---- "Plano de férias": a small info-only card (§4.8) ----------------- */

function FeriasInfoCard({ plan, progress, today }: { plan: StudyPlan; progress: ProgressMap; today: number }) {
  const p = feriasProgress(plan, progress, today);
  return (
    <div className="parent-detail">
      <CardHead icon="sun" title="Plano de férias" aside={yearLabel(plan.year)} />
      <p className="parent-plan__extra">{feriasStatusLine(p)}.</p>
      <p className="parent-plan__extra">
        {p.finishAt
          ? `Fim previsto: ${new Date(p.finishAt).toLocaleDateString("pt-PT", { day: "numeric", month: "long" })}.`
          : "Matéria toda concluída."}
        {" "}Seg–sex matéria nova; sábado é revisão; domingo descanso. Um dia
        falhado não acumula — a matéria espera pelo dia seguinte.
      </p>
      {/* Navigates via the hash router — the dashboard has no onGo and one
          link doesn't justify threading it down. */}
      <button className="parent-plan__link" onClick={() => { window.location.hash = viewToHash({ kind: "plano-completo" }); }}>
        <Icon name="calendar" size={14} /> Ver plano completo
      </button>
    </div>
  );
}

/** "Plano cumprido" on its own (the Estudo tab wants the plan metric without
 *  the whole grade card): done vs. planned over the last 14 days — minutes of
 *  plan steps with an active férias plan, missions otherwise (study/grade.ts
 *  is the single source of the numbers). */
function PlanAdherenceCard({ grade, hasPlan }: { grade: WeekGrade | null; hasPlan: boolean }) {
  const part = grade?.adherence ?? null;
  if (!part) return null;
  const missed = part.total - part.done;
  const done = hasPlan ? `${part.done} de ${part.total} min planeados` : `${part.done} de ${part.total} missões planeadas`;
  const left = hasPlan ? `${missed} min ficaram por fazer.` : `${missed} ${missed === 1 ? "missão ficou" : "missões ficaram"} por fazer.`;
  return (
    <div className="parent-detail">
      <CardHead icon="calendar" title="Plano cumprido" aside="últimos 14 dias" />
      <GradeRow icon="check" label="Cumprido" part={part} />
      <p className="parent-plan__extra">
        {done} ({Math.round(part.pct * 100)}%){missed > 0 ? ` — ${left}` : " — tudo em dia."}
      </p>
    </div>
  );
}

/** "Banco de erros" (§4.2): how many wrong questions are due for revision and
 *  where the biggest debt lives. Info-only — the daily missions and the
 *  child's #/plano card already schedule the actual training. */
function ReviewDueCard({ review, now }: { review: ReviewMap; now: number }) {
  const due = useMemo(() => dueByLesson(review, now), [review, now]);
  let total = 0;
  let topId: string | null = null;
  let topN = 0;
  for (const [id, n] of due) {
    total += n;
    if (n > topN) { topId = id; topN = n; }
  }
  const meta = topId ? lessonMeta.get(topId) : undefined;
  return (
    <div className="parent-detail">
      <CardHead icon="target" title="Banco de erros" aside={total > 0 ? `${total} por vencer` : "em dia"} />
      {total === 0 ? (
        <p className="parent-detail__empty">Sem perguntas vencidas — as revisões estão em dia.</p>
      ) : (
        <p className="parent-plan__extra">
          {total === 1 ? "1 pergunta errada espera revisão" : `${total} perguntas erradas esperam revisão`}
          {meta ? ` — a maior parte em «${meta.title}»` : ""}. As missões diárias já as agendam sozinhas.
        </p>
      )}
    </div>
  );
}

/* ---- "Diagnóstico": the placement mini-test's result (§4.7) ----------- */

/** Info-only: what the optional mini-test found and how the plan reacted —
 *  "Matemática 40% · Português 75% — plano ajustado para reforçar Matemática". */
function DiagnosticoCard() {
  const diag = useDiagnostic();
  if (!diag) return null;
  const weak = weakSubjects(diag).map((id) => subjectById.get(id)?.label ?? id);
  const when = new Date(diag.at).toLocaleDateString("pt-PT", { day: "numeric", month: "short" });
  return (
    <div className="parent-detail">
      <CardHead icon="target" title="Diagnóstico" aside={`${yearLabel(diag.year)} · ${when}`} />
      <p className="parent-plan__extra">
        {diagnosticScoresLine(diag)}
        {weak.length > 0
          ? ` — plano ajustado para reforçar ${weak.join(" e ")}.`
          : " — sem matérias fracas; o plano segue a ordem normal."}
      </p>
    </div>
  );
}

/* ---- "TPC": parents assign homework (§4.12) --------------------------- */

/** "sexta-feira, 13 de jun" — one due-date option in the picker. */
const tpcDueOptionLabel = (d: number): string =>
  new Date(d).toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "short" });

/** Assign homework: pick 1–3 lessons (year → subject → lesson; the plan year
 *  is pre-selected) and a due date in the next week. Open TPCs list first,
 *  with per-lesson state ("done" = final test ≥ 80% AFTER assignment — see
 *  study/tpc.ts); the child sees them as priority missions on #/plano. */
function TpcCard({
  tpcs,
  achievements,
  today,
  planYear,
}: {
  tpcs: Tpc[];
  achievements: Achievement[];
  today: number;
  planYear: YearN | null;
}) {
  const [year, setYear] = useState<YearN>(planYear ?? 1);
  const subjects = subjectsForYear(year);
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? "");
  const subject = subjects.find((s) => s.id === subjectId) ?? subjects[0];
  const lessons = subject ? subject.years[year].filter((l) => l.body) : [];
  const [lessonId, setLessonId] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  // Day offsets are computed noon-anchored (today + n×DAY + DAY/2 → startOfDay)
  // so the options stay calendar days across a DST change.
  const dueOptions = Array.from({ length: TPC_DUE_DAYS }, (_, i) => startOfDay(today + (i + 1) * DAY + DAY / 2));
  const [dueDate, setDueDate] = useState(dueOptions[0]);

  const changeYear = (y: YearN) => {
    setYear(y);
    setSubjectId(subjectsForYear(y)[0]?.id ?? "");
    setLessonId("");
  };
  const add = () => {
    if (lessonId && !picked.includes(lessonId) && picked.length < MAX_TPC_LESSONS) setPicked([...picked, lessonId]);
    setLessonId("");
  };
  const create = () => {
    if (picked.length === 0) return;
    addTpc(picked, dueDate);
    setPicked([]);
  };

  const open = tpcs.filter((t) => t.doneAt == null);
  const done = tpcs.filter((t) => t.doneAt != null).slice(0, 5);

  return (
    <div className="parent-detail parent-tpc dash-wide">
      <CardHead icon="backpack" title="TPC" aside={open.length > 0 ? `${open.length} em aberto` : "nenhum em aberto"} />

      {open.map((t) => (
        <div key={t.id} className={`parent-tpc__item ${t.dueDate < today ? "is-late" : ""}`}>
          <div className="parent-tpc__head">
            <strong>TPC {tpcDueLabel(t.dueDate, today)}</strong>
            <button type="button" className="parent-more" onClick={() => removeTpc(t.id)}>
              <Icon name="trash" size={13} /> remover
            </button>
          </div>
          <ul className="parent-tpc__lessons">
            {t.lessonIds.map((id) => {
              const meta = lessonMeta.get(id)!;
              const ok = tpcLessonDone(t, id, achievements);
              return (
                <li key={id} className={ok ? "is-ok" : ""}>
                  <Icon name={ok ? "check" : "clock"} size={13} /> {meta.title} <small>· {meta.subjectLabel}</small>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="parent-tpc__form">
        <label className="parent-field">
          <span>Ano</span>
          <select value={year} onChange={(e) => changeYear(Number(e.target.value) as YearN)}>
            {YEARS.map((y) => (
              <option key={y} value={y}>{yearLabel(y)}</option>
            ))}
          </select>
        </label>
        <label className="parent-field">
          <span>Disciplina</span>
          <select value={subject?.id ?? ""} onChange={(e) => { setSubjectId(e.target.value); setLessonId(""); }}>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </label>
        <label className="parent-field">
          <span>Lição</span>
          <select value={lessonId} onChange={(e) => setLessonId(e.target.value)}>
            <option value="">— escolher —</option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id} disabled={picked.includes(l.id)}>{l.title}</option>
            ))}
          </select>
        </label>
        <button type="button" className="pill ghost" onClick={add} disabled={!lessonId || picked.length >= MAX_TPC_LESSONS}>
          <Icon name="plus" size={14} /> juntar
        </button>
      </div>

      {picked.length > 0 && (
        <div className="parent-tpc__create">
          <ul className="parent-tpc__picked">
            {picked.map((id) => (
              <li key={id}>
                {lessonMeta.get(id)?.title ?? id}
                <button type="button" onClick={() => setPicked(picked.filter((p) => p !== id))} aria-label={`Tirar ${lessonMeta.get(id)?.title ?? id}`}>
                  <Icon name="close" size={12} />
                </button>
              </li>
            ))}
          </ul>
          <label className="parent-field">
            <span>Para</span>
            <select value={dueDate} onChange={(e) => setDueDate(Number(e.target.value))}>
              {dueOptions.map((d) => (
                <option key={d} value={d}>{tpcDueOptionLabel(d)}</option>
              ))}
            </select>
          </label>
          <button type="button" className="pill" onClick={create}>
            <Icon name="backpack" size={14} /> Marcar TPC ({picked.length} {picked.length === 1 ? "lição" : "lições"})
          </button>
        </div>
      )}

      {open.length === 0 && picked.length === 0 && (
        <p className="parent-plan__extra">
          Escolhe 1–{MAX_TPC_LESSONS} lições e um prazo — a criança vê o TPC como missão prioritária no plano dela.
        </p>
      )}

      {done.length > 0 && (
        <div className="parent-tpc__done">
          {done.map((t) => (
            <p key={t.id} className="parent-plan__extra">
              <Icon name="check" size={13} /> {t.lessonIds.map((id) => lessonMeta.get(id)?.title ?? id).join(" + ")} — feito a{" "}
              {new Date(t.doneAt!).toLocaleDateString("pt-PT", { day: "numeric", month: "short" })}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/** Archived férias plans (§4.8): one line per past plan, with the exam grade
 *  when taken — "4.º ano · mai–jun · 100% · exame 16/20". */
function PlanHistoryCard({ history }: { history: PlanRecord[] }) {
  if (history.length === 0) return null;
  return (
    <div className="parent-detail">
      <CardHead icon="sun" title="Planos anteriores" />
      {[...history].reverse().map((r) => (
        <p key={`${r.year}-${r.startedAt}`} className="parent-plan__extra">{planRecordLabel(r)}</p>
      ))}
    </div>
  );
}

/* ---- the parents' calendar: done vs. should-have-been-done ----------- */

function ParentCalendar({
  achievements,
  sessions,
  progress,
  history,
  review,
  ferias,
  tpcs,
  today,
}: {
  achievements: Achievement[];
  sessions: StudySession[];
  progress: ProgressMap;
  history: string[];
  review: ReviewMap;
  ferias: StudyPlan | null;
  tpcs: Tpc[];
  today: number;
}) {
  const [sel, setSel] = useState(today);
  const past = sel < today;
  const future = sel > today;
  // Planned-vs-done is shown for TODAY and FUTURE days only. For a past day
  // the plan would have to be RECONSTRUCTED from the current state (plans
  // aren't stored), which can mark "por fazer" missions that didn't even
  // exist that day — so past days show only the real activity instead.
  // (With a férias plan the same rule holds: past days show real activity.)
  const planned = useMemo(
    () => (past ? [] : missionsForDay(sel, today, progress, achievements, history, Object.values(review), ferias, tpcs)),
    [past, sel, today, progress, achievements, history, review, ferias, tpcs],
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
              <button
                key={m.id}
                type="button"
                className="parent-mission"
                onClick={() => {
                  window.location.hash = viewToHash({
                    kind: m.kind === "repetir" ? "test" : "lesson",
                    year: lessonMeta.get(m.lessonId)!.year,
                    subjectId: m.subjectId,
                    lessonId: m.lessonId,
                  });
                }}
              >
                <span className={`parent-mission__st ${m.done ? "ok" : future ? "plan" : "miss"}`}>
                  <Icon name={m.done ? "check" : future ? "calendar" : "close"} size={14} />
                </span>
                <span className="parent-mission__tx">
                  <strong>{m.title}</strong>
                  <small>{m.detail}</small>
                </span>
                <span className="parent-mission__lbl">{m.done ? "feita" : future ? "planeada" : "por fazer"}</span>
              </button>
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
    const byLesson = new Map<string, { secs: number; scroll: number; lastAt: number; paused: number; pauses: number; last?: StudySession }>();
    for (const s of sessions) {
      if (s.kind !== "lesson" || !s.lessonId || !inArea(s.lessonId)) continue;
      const agg = byLesson.get(s.lessonId) ?? { secs: 0, scroll: 0, lastAt: 0, paused: 0, pauses: 0 };
      agg.secs += s.secs;
      agg.scroll = Math.max(agg.scroll, s.scrollPct ?? 0);
      agg.paused += hiddenSecsOf(s);
      agg.pauses += s.hiddenCount;
      // Keep the most recent session — its segment bar is the lesson's
      // "evolution" chart (an aggregate over sessions has no single timeline).
      if (s.startedAt >= agg.lastAt) {
        agg.lastAt = s.startedAt;
        agg.last = s;
      }
      byLesson.set(s.lessonId, agg);
    }
    for (const [id, p] of Object.entries(progress)) {
      if (!p?.visited || byLesson.has(id) || !inArea(id)) continue;
      byLesson.set(id, { secs: 0, scroll: 0, lastAt: 0, paused: 0, pauses: 0 });
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
                  {agg.paused > 0 && <div className="parent-row__pause">{pauseLabel(agg.paused, agg.pauses)}</div>}
                  {agg.last && <SessionSegmentBar session={agg.last} />}
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
  const [expanded, setExpanded] = useState(false);
  const items = agg ? (expanded ? agg.items : agg.items.slice(0, LIST_CAP)) : [];
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
        items.map((a, i) => {
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
      {agg && (
        <MoreToggle hidden={agg.items.length - items.length} expanded={expanded} onToggle={() => setExpanded((v) => !v)} />
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
