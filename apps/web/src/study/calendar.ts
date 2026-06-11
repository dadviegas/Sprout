import { TEST_PASS_PCT, type Achievement } from "../progress";
import type { StudySession } from "./sessions";
import { findLesson, lessonMeta } from "../content/curriculum";
import { lessonMinutes } from "../lesson-content";

/* ------------------------------------------------------------------ *
 * Shared per-day aggregation (PLANO-ESTUDO §4.9) — extracted from
 * ParentArea so the heatmap, the usage chart, the child's calendar and
 * the parents' calendar all read the SAME day the same way. Pure
 * functions over the achievement + session logs; nothing stored.
 * ------------------------------------------------------------------ */

export const DAY = 86_400_000;

export const startOfDay = (t: number): number => {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

/** Sunday is rest (user decision: study Mon–Sat, ~30 min/day). */
export const isRestDay = (day: number): boolean => new Date(day).getDay() === 0;

/** Comparable (year, month) index of a timestamp — year × 12 + month. Shared
 *  by the calendar pager (#/plano) and the full-plan month grids. */
export const monthIndex = (t: number): number => {
  const d = new Date(t);
  return d.getFullYear() * 12 + d.getMonth();
};

/** The daily study target (user decision §4.9): ~30 min, Monday–Saturday.
 *  Lives here so plan.ts and ferias.ts share it without importing each other. */
export const DAILY_TARGET_MINUTES = 30;

/** A day "studied well" at this much ACTIVE time, even without passing a test. */
export const GOOD_DAY_SECS = 20 * 60;

/* ---- final tests per day (from the achievements log) --------------- */

export interface DayAgg {
  /** Final tests passed (>= 80%) that day. */
  passed: number;
  /** Final tests failed (< 80%) that day. */
  failed: number;
  /** Stars from the PASSED tests (drives the tablet-time reward). */
  stars: number;
  /** Every test that day, newest first (drives the detail list). */
  items: Achievement[];
}

export function aggregateByDay(achievements: Achievement[]): Map<number, DayAgg> {
  const map = new Map<number, DayAgg>();
  for (const a of achievements) {
    const day = startOfDay(a.at);
    const agg = map.get(day) ?? { passed: 0, failed: 0, stars: 0, items: [] };
    if (a.pct >= TEST_PASS_PCT) {
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

/* ---- study sessions per day (from the sessions log) ----------------- */

export interface DaySessions {
  /** ACTIVE seconds studied that day (all sessions). */
  secs: number;
  /** sessions opened that day (a page opened counts, even if nothing done) */
  opened: number;
  /** times the tab was hidden mid-study */
  hidden: number;
  /** at least one session ended by closing the browser/tab */
  exited: boolean;
  /** at least one session finished a final test (pass OR fail) */
  completed: boolean;
  /** at least one session finished a final test at >= TEST_PASS_PCT */
  passed: boolean;
}

// Note: a session that crosses midnight is counted whole on the day it STARTED.
// Splitting its seconds across both days isn't worth the complexity yet — late-
// night study is rare for this audience and the error is bounded by one session.
export function aggregateSessionsByDay(sessions: StudySession[]): Map<number, DaySessions> {
  const map = new Map<number, DaySessions>();
  for (const s of sessions) {
    const day = startOfDay(s.startedAt);
    const agg = map.get(day) ?? { secs: 0, opened: 0, hidden: 0, exited: false, completed: false, passed: false };
    agg.secs += s.secs;
    agg.opened += 1;
    agg.hidden += s.hiddenCount;
    agg.exited = agg.exited || s.exited;
    agg.completed = agg.completed || s.completed;
    agg.passed = agg.passed || (s.completed && (s.score ?? 0) >= TEST_PASS_PCT);
    map.set(day, agg);
  }
  return map;
}

/* ---- one day, one colour -------------------------------------------- */

/** Calendar colour for a PAST/PRESENT day (user decision §4.9):
 *  - "good"  (green)  — studied well: a test PASSED (≥ TEST_PASS_PCT) or
 *                       ≥ 20 active min of engaged study
 *  - "some"  (yellow) — a little: opened pages / short time / a FAILED test
 *                       (a failed final alone is never green — it's "a repetir")
 *  - "none"  (red)    — nothing, or only opened-and-left
 *  - "rest"  — Sunday
 *  `test` marks the blue dot: a final test was done that day (pass or fail). */
export type DayState = "good" | "some" | "none" | "rest";

export function dayState(day: number, tests: DayAgg | undefined, s: DaySessions | undefined): { state: DayState; test: boolean } {
  const test = (tests?.items.length ?? 0) > 0 || !!s?.completed;
  if (isRestDay(day)) return { state: "rest", test };
  const secs = s?.secs ?? 0;
  if ((tests?.passed ?? 0) > 0 || s?.passed || secs >= GOOD_DAY_SECS) return { state: "good", test };
  // "Page opened only" / "tried a test but failed" stays yellow, never green.
  if (secs > 0 || (s?.opened ?? 0) > 0 || (tests?.failed ?? 0) > 0) return { state: "some", test };
  return { state: "none", test };
}

/** Minutes (rounded) studied that day — derived, for labels and charts. */
export function minutesOf(s: DaySessions | undefined): number {
  return Math.round((s?.secs ?? 0) / 60);
}

/* ---- per-session reading engagement (PLANO-ESTUDO §4.1) -------------- *
 * Lives here (not sessions.ts) because it needs TEST_PASS_PCT and the
 * curriculum, and sessions.ts must stay import-light (progress imports it). */

export type Engagement = "completed" | "read" | "skimmed" | "opened" | "abandoned";

/** pt-PT labels for the parents' detail lists. */
export const ENGAGEMENT_LABEL: Record<Engagement, string> = {
  completed: "teste passado",
  read: "leu com atenção",
  skimmed: "passou os olhos",
  opened: "só abriu",
  abandoned: "abandonou o teste",
};

/** Classify one session. `lessonMins` is the lesson's estimated duration:
 *  - completed — finished its final test at >= TEST_PASS_PCT
 *  - abandoned — a TEST session left without finishing
 *  - opened    — under 20 s of active time
 *  - read      — scrolled >= 70% of the body AND stayed >= 40% of the estimate
 *  - skimmed   — everything in between */
export function engagementOf(s: StudySession, lessonMins: number): Engagement {
  if (s.completed && (s.score ?? 0) >= TEST_PASS_PCT) return "completed";
  if (s.kind === "test" && !s.completed) return "abandoned";
  if (s.secs < 20) return "opened";
  if ((s.scrollPct ?? 0) >= 70 && s.secs >= lessonMins * 60 * 0.4) return "read";
  return "skimmed";
}

/** Engagement of a session, looking the lesson's estimated minutes up from the
 *  curriculum (sessions without a known lesson body fall back to 5 min). */
export function sessionEngagement(s: StudySession): Engagement {
  const meta = s.lessonId ? lessonMeta.get(s.lessonId) : undefined;
  const body = meta && s.lessonId ? findLesson(meta.subjectId, meta.year, s.lessonId)?.body : undefined;
  return engagementOf(s, body ? lessonMinutes(body) : 5);
}
