import { useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { useProgress, type Achievement } from "./progress";
import {
  tierLabel,
  lessonMeta,
  isEstudo, isMundo, isPaises,
  isDicionario, isVerbos, isEnciclopedia, isCores, isAtlas,
} from "./content/curriculum";
import { bibliotecaMedals } from "./biblioteca";
import { store } from "./storage";

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
 * Área dos pais — a PARENT dashboard, opened from the cog in the top
 * bar (behind a simple multiplication gate so a child can't reach it).
 *
 * It answers one question: "are the kids studying every day?" — drawn
 * GitHub-contributions style, one square per day, greener the more
 * tests were PASSED. Tapping a square lists what was done that day.
 *
 * The habit loop: a day "counts" (keeps the streak, earns tablet time)
 * only when a final test is passed at >= 80%. Tablet minutes scale with
 * the stars earned that day. Sub-80% tries still show — as a red marker
 * on the grid and a "Falhou" badge in the detail — so a parent sees
 * where the child struggled.
 *
 * Everything here is DERIVED from the existing `achievements` log (the
 * append-only record of completed final tests, already in IndexedDB);
 * the only new stored data is the small reward config below.
 * ------------------------------------------------------------------ */

const DAY = 86_400_000;
/** A test must reach this score to earn the reward / keep the streak. */
const PASS = 0.8;
/** Absolute quarter index (year*4 + quarter) for a timestamp, so quarters can
 *  be compared/stepped as plain integers. Quarter 0 = Jan–Mar. */
const quarterIndex = (t: number): number => {
  const d = new Date(t);
  return d.getFullYear() * 4 + Math.floor(d.getMonth() / 3);
};

const startOfDay = (t: number): number => {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
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

/* ---- per-day aggregation ----------------------------------------- */

interface DayAgg {
  /** Final tests passed (>= 80%) that day. */
  passed: number;
  /** Final tests failed (< 80%) that day. */
  failed: number;
  /** Stars from the PASSED tests (drives the tablet-time reward). */
  stars: number;
  /** Every test that day, newest first (drives the detail list). */
  items: Achievement[];
}

function aggregateByDay(achievements: Achievement[]): Map<number, DayAgg> {
  const map = new Map<number, DayAgg>();
  for (const a of achievements) {
    const day = startOfDay(a.at);
    const agg = map.get(day) ?? { passed: 0, failed: 0, stars: 0, items: [] };
    if (a.pct >= PASS) {
      agg.passed += 1;
      agg.stars += a.stars;
    } else {
      agg.failed += 1;
    }
    agg.items.push(a);
    map.set(day, agg);
  }
  // The log is already newest-first, so each day's items keep that order.
  return map;
}

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
    if (startOfDay(a.at) !== today || a.pct < PASS) continue;
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

export function ParentArea({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="parent-modal sprout-scroll" role="dialog" aria-label="Área dos pais">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <strong className="parent-title">
            <Icon name="gear" size={22} /> Área dos pais
          </strong>
          <button className="iconbtn" onClick={onClose} aria-label="Fechar">
            <Icon name="close" size={22} />
          </button>
        </div>
        <Dashboard />
      </div>
    </>
  );
}

/* ---- the dashboard ------------------------------------------------- */

function Dashboard() {
  const { achievements } = useProgress();
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
  const streak = currentStreak(byDay, today);
  const best = bestStreak(byDay);
  const totals = useMemo(() => {
    let passed = 0;
    let failed = 0;
    for (const a of achievements) (a.pct >= PASS ? (passed += 1) : (failed += 1));
    return { passed, failed, total: achievements.length };
  }, [achievements]);

  return (
    <div className="parent-dash">
      <TodayCard agg={todayAgg} minutes={minutesFor(todayAgg)} settings={settings} />

      <div className="parent-stats">
        <span className="parent-stat"><span className="parent-stat__big">🔥 {streak}</span> dia{streak === 1 ? "" : "s"} seguido{streak === 1 ? "" : "s"}</span>
        <span className="parent-stat"><span className="parent-stat__big">🏆 {best}</span> recorde</span>
        <span className="parent-stat"><span className="parent-stat__big">{totals.passed}</span> teste{totals.passed === 1 ? "" : "s"} passado{totals.passed === 1 ? "" : "s"}</span>
        {totals.failed > 0 && (
          <span className="parent-stat parent-stat--fail"><span className="parent-stat__big">{totals.failed}</span> falhado{totals.failed === 1 ? "" : "s"}</span>
        )}
      </div>

      <AreasBreakdown />

      <RecentActivity />

      <UsageChart achievements={achievements} now={now} earliestDay={earliestDay} />

      <Heatmap byDay={byDay} today={today} selected={selected} onSelect={setSelected} earliestDay={earliestDay} />

      <DayDetail
        day={selected}
        today={today}
        agg={byDay.get(selected)}
        minutes={minutesFor(byDay.get(selected))}
      />

      <RewardSettings settings={settings} onChange={setSettings} />
    </div>
  );
}

/** "O que andam a explorar" — how many lessons the child has OPENED per area
 *  (so reading/exploring the Biblioteca shows up, not just tests), how many they
 *  finished, plus the Biblioteca medals earned. All derived from the stored
 *  progress, so nothing new is persisted. */
function AreasBreakdown() {
  const { progress } = useProgress();

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
    <div className="parent-areas">
      <div className="parent-areas__title"><Icon name="grid" size={16} /> O que andam a explorar</div>
      <div className="parent-areas__grid">
        {areas.map((id) => (
          <div key={id} className={`parent-area ${opened[id] > 0 ? "is-on" : ""}`}>
            <span className="parent-area__ic"><Icon name={AREA_META[id].icon} size={18} /></span>
            <span className="parent-area__n">{opened[id]}</span>
            <span className="parent-area__l">{AREA_META[id].label}</span>
            {done[id] > 0 && <span className="parent-area__sub">{done[id]} feito{done[id] === 1 ? "" : "s"}</span>}
          </div>
        ))}
      </div>
      <div className="parent-areas__biblio">
        <Icon name="trophy" size={14} /> Biblioteca: <strong>{medalsEarned}</strong> de {medals.length} medalhas conquistadas
      </div>
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
      <div className="parent-detail__head">
        <span className="parent-detail__date"><Icon name="clock" size={15} /> Visto recentemente</span>
      </div>
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
    <div className={`parent-today is-${state}`}>
      <div className="parent-today__lead">
        {state === "win" && <><Icon name="check" size={18} /> Estudou hoje!</>}
        {state === "tried" && <><Icon name="warn" size={18} /> Quase! Falta passar com 80%+</>}
        {state === "none" && <><Icon name="info" size={18} /> Ainda não estudou hoje</>}
      </div>
      <div className="parent-today__reward">
        <span className="parent-today__min">📱 {minutes} min</span>
        <span className="parent-today__sub">
          {state === "win"
            ? `${settings.rewardBase} min + ${settings.rewardPerStar} min × ${agg!.stars} ⭐`
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
    <div className="hm" style={style}>
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

/** A "how much are they using it" bar chart — one bar per day for a chosen
 *  month (passed in green, failed in red), with ◂ ▸ to step back through
 *  history (this month, last month, …). Today's bar is marked. Plain inline
 *  layout, no chart library (like the lesson `chart` widget). */
function UsageChart({ achievements, now, earliestDay }: { achievements: Achievement[]; now: number; earliestDay: number | null }) {
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
      if (a.pct >= PASS) days[d.getDate() - 1].passed += 1;
      else days[d.getDate() - 1].failed += 1;
    }
    const max = Math.max(1, ...days.map((d) => d.passed + d.failed));
    const total = days.reduce((n, d) => n + d.passed + d.failed, 0);
    const label = new Date(year, month, 1).toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
    return { days, max, total, label };
  }, [year, month, achievements]);

  return (
    <div className="usage">
      <div className="usage__head">
        <span className="usage__title"><Icon name="chart" size={16} /> Atividade diária</span>
        <span className="usage__legend">
          <span><i className="usage__dot pass" /> passados</span>
          <span><i className="usage__dot fail" /> falhados</span>
        </span>
      </div>
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

function DayDetail({ day, today, agg, minutes }: { day: number; today: number; agg: DayAgg | undefined; minutes: number }) {
  return (
    <div className="parent-detail">
      <div className="parent-detail__head">
        <span className="parent-detail__date">{dayLabel(day, today)}</span>
        {agg && agg.passed > 0 && <span className="parent-detail__min">📱 {minutes} min</span>}
      </div>
      {!agg ? (
        <p className="parent-detail__empty">Nada nesse dia.</p>
      ) : (
        agg.items.map((a, i) => {
          const ok = a.pct >= PASS;
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
      <div className="parent-settings__title"><Icon name="gear" size={16} /> Tempo de tablet</div>
      <label className="parent-field">
        <span>Minutos base</span>
        <input type="number" min={0} max={999} value={settings.rewardBase} onChange={(e) => onChange({ rewardBase: clamp(e.target.value) })} />
      </label>
      <label className="parent-field">
        <span>Minutos por ⭐</span>
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
