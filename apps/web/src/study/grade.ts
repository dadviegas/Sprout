import { TEST_PASS_PCT, type Achievement, type ProgressMap } from "../progress";
import type { StudySession } from "./sessions";
import { DAY, startOfDay, isRestDay, sessionEngagement } from "./calendar";
import { missionsForDay } from "./plan";

/* ------------------------------------------------------------------ *
 * "Nota da semana" (PLANO-ESTUDO §4.11) — a 0–20 school-style grade for
 * the parents' area, derived over the LAST 14 DAYS from three signals:
 *   1. plan adherence  — daily missions done ÷ planned (Mon–Sat only)
 *   2. test pass rate  — final tests at >= TEST_PASS_PCT ÷ tests taken
 *   3. reading         — lesson sessions read with attention ÷ opened
 * Pure functions, nothing stored. The tone around it stays encouraging:
 * the grade says "where to help", never "está mal".
 * ------------------------------------------------------------------ */

const WINDOW_DAYS = 14;

/** One component of the grade: done/total and the ratio (0–1). */
export interface GradePart {
  done: number;
  total: number;
  pct: number;
}

export interface WeekGrade {
  /** 0–20, rounded — the weighted blend of the available components. */
  grade: number;
  adherence: GradePart | null;
  passRate: GradePart | null;
  reading: GradePart | null;
}

const part = (done: number, total: number): GradePart | null =>
  total > 0 ? { done, total, pct: done / total } : null;

/** The week grade, or null when the window holds no activity at all.
 *  Components without data drop out and the weights renormalise, so a week
 *  with (say) no tests is graded on what actually happened. */
export function weekGrade(
  now: number,
  progress: ProgressMap,
  achievements: Achievement[],
  history: string[],
  sessions: StudySession[],
): WeekGrade | null {
  const today = startOfDay(now);
  // Days before the first recorded activity never count against the plan.
  let first = today;
  for (const a of achievements) first = Math.min(first, startOfDay(a.at));
  for (const s of sessions) first = Math.min(first, startOfDay(s.startedAt));
  const start = Math.max(today - (WINDOW_DAYS - 1) * DAY, first);

  // 1. Plan adherence, Mon–Sat. Past days reuse the mission generator, which
  //    reconstructs from CURRENT state (plans aren't stored) — an honest
  //    approximation, same as the calendar (§4.9).
  let planned = 0;
  let plannedDone = 0;
  for (let d = start; d <= today; d += DAY) {
    if (isRestDay(d)) continue;
    const missions = missionsForDay(d, today, progress, achievements, history);
    planned += missions.length;
    plannedDone += missions.filter((m) => m.done).length;
  }

  // 2. Test pass rate in the window.
  let tests = 0;
  let passed = 0;
  for (const a of achievements) {
    if (a.at < start) continue;
    tests += 1;
    if (a.pct >= TEST_PASS_PCT) passed += 1;
  }

  // 3. Reading engagement: lesson sessions read with attention (or that ended
  //    in a passed test) over all lesson sessions opened in the window.
  let lessonSessions = 0;
  let readWell = 0;
  for (const s of sessions) {
    if (s.kind !== "lesson" || !s.lessonId || s.startedAt < start) continue;
    lessonSessions += 1;
    const e = sessionEngagement(s);
    if (e === "read" || e === "completed") readWell += 1;
  }

  const adherence = part(plannedDone, planned);
  const passRate = part(passed, tests);
  const reading = part(readWell, lessonSessions);

  // Weighted blend of whatever components exist (adherence counts most).
  const weighted: [GradePart | null, number][] = [
    [adherence, 0.4],
    [passRate, 0.35],
    [reading, 0.25],
  ];
  let score = 0;
  let weight = 0;
  for (const [p, w] of weighted) {
    if (!p) continue;
    score += p.pct * w;
    weight += w;
  }
  if (weight === 0) return null;
  return { grade: Math.round((score / weight) * 20), adherence, passRate, reading };
}
