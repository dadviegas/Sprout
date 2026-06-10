import { subjectById, lessonMeta } from "../content/curriculum";
import { TEST_PASS_PCT, type Achievement, type ProgressMap } from "../progress";
import type { StudySession } from "./sessions";
import { DAY, startOfDay, aggregateSessionsByDay } from "./calendar";
import { avgPct } from "./alerts";
import { repetirLessons, DAILY_TARGET_MINUTES } from "./plan";
import type { ReviewMap } from "./review";

/* ------------------------------------------------------------------ *
 * Weekly report (PLANO-ESTUDO §4.11) — the "relatório de domingo" card
 * in the parents' area. Everything is DERIVED at render time from the
 * achievement + session logs and the error bank, for the LAST FULL WEEK
 * (Monday–Sunday): days studied, minutes (total + per subject), tests,
 * score trends vs. the week before, what to review next week, and the
 * coming week's plan target. Tone stays positive — a drop reads as
 * "vale a pena treinar", never "está mal".
 * ------------------------------------------------------------------ */

const WEEK = 7 * DAY;

export interface SubjectTrend {
  label: string;
  /** average test pct in the week BEFORE the reported one (0–1) */
  prevPct: number;
  /** average test pct in the reported week (0–1) */
  curPct: number;
}

export interface WeeklyReport {
  /** start of the reported week's Monday (epoch ms) */
  weekStart: number;
  /** exclusive end — the following Monday (epoch ms) */
  weekEnd: number;
  /** distinct days with any study activity (max 7) */
  daysStudied: number;
  /** total ACTIVE study minutes in the week */
  totalMinutes: number;
  /** per-subject minutes, largest first (top 5) */
  subjectMinutes: { label: string; minutes: number }[];
  testsDone: number;
  testsPassed: number;
  /** subjects with tests in BOTH weeks, biggest movement first */
  trends: SubjectTrend[];
  /** lesson titles worth reviewing next week (error bank + failed tests) */
  reviewNext: string[];
  /** the coming week's plan target (Mon–Sat × the daily minutes) */
  plan: { days: number; minutesPerDay: number };
}

/** Start of the most recent Monday at or before `day` (a startOfDay epoch). */
const mondayOf = (day: number): number => day - ((new Date(day).getDay() + 6) % 7) * DAY;

/** The report for the last FULL Monday–Sunday week before `now`, or null when
 *  that week holds no activity at all (nothing to report yet). */
export function weeklyReport(
  now: number,
  achievements: Achievement[],
  sessions: StudySession[],
  progress: ProgressMap,
  review: ReviewMap,
): WeeklyReport | null {
  const thisMonday = mondayOf(startOfDay(now));
  const weekStart = thisMonday - WEEK;
  const weekEnd = thisMonday;
  const inWeek = (at: number) => at >= weekStart && at < weekEnd;

  // Days studied + total minutes, from the per-day session aggregation.
  const byDay = aggregateSessionsByDay(sessions);
  let daysStudied = 0;
  let totalSecs = 0;
  for (let d = weekStart; d < weekEnd; d += DAY) {
    const s = byDay.get(d);
    if (s && s.secs > 0) {
      daysStudied += 1;
      totalSecs += s.secs;
    }
  }
  const weekTests = achievements.filter((a) => inWeek(a.at));
  // Old data may predate session tracking — test days still count as studied.
  if (daysStudied === 0 && weekTests.length > 0) {
    daysStudied = new Set(weekTests.map((a) => startOfDay(a.at))).size;
  }
  if (totalSecs === 0 && weekTests.length === 0) return null; // nothing happened

  // Where the time went, by subject (top 5, largest first).
  const subjSecs = new Map<string, number>();
  for (const s of sessions) {
    if (!inWeek(s.startedAt) || !s.subjectId || s.secs <= 0) continue;
    subjSecs.set(s.subjectId, (subjSecs.get(s.subjectId) ?? 0) + s.secs);
  }
  const subjectMinutes = [...subjSecs.entries()]
    .map(([id, secs]) => ({ label: subjectById.get(id)?.label ?? id, minutes: Math.round(secs / 60) }))
    .filter((e) => e.minutes > 0)
    .sort((a, b) => b.minutes - a.minutes)
    .slice(0, 5);

  // Score trend per subject vs. the week before (only where both have tests).
  const subjects = new Map<string, string>();
  for (const a of achievements) subjects.set(a.subjectId, a.subjectLabel);
  const trends: SubjectTrend[] = [];
  for (const [subjectId, label] of subjects) {
    const cur = avgPct(achievements, subjectId, weekStart, weekEnd);
    const prev = avgPct(achievements, subjectId, weekStart - WEEK, weekStart);
    if (cur.n > 0 && prev.n > 0) trends.push({ label, prevPct: prev.pct, curPct: cur.pct });
  }
  trends.sort((a, b) => Math.abs(b.curPct - b.prevPct) - Math.abs(a.curPct - a.prevPct));

  // What to review next week: lessons with error-bank questions due during it
  // (most due first), then failed tests still not passed. De-duped, capped.
  const dueCount = new Map<string, number>();
  for (const r of Object.values(review)) {
    if (r.nextAt < weekEnd + WEEK) dueCount.set(r.lessonId, (dueCount.get(r.lessonId) ?? 0) + 1);
  }
  const reviewNext: string[] = [];
  const seen = new Set<string>();
  const addReview = (lessonId: string, title: string) => {
    if (!seen.has(lessonId) && reviewNext.length < 4) {
      seen.add(lessonId);
      reviewNext.push(title);
    }
  };
  for (const [lessonId] of [...dueCount.entries()].sort((a, b) => b[1] - a[1])) {
    const title = lessonMeta.get(lessonId)?.title;
    if (title) addReview(lessonId, title);
  }
  for (const a of repetirLessons(progress, achievements)) addReview(a.lessonId, a.lessonTitle);

  return {
    weekStart,
    weekEnd,
    daysStudied,
    totalMinutes: Math.round(totalSecs / 60),
    subjectMinutes,
    testsDone: weekTests.length,
    testsPassed: weekTests.filter((a) => a.pct >= TEST_PASS_PCT).length,
    trends,
    reviewNext,
    plan: { days: 6, minutesPerDay: DAILY_TARGET_MINUTES },
  };
}
