import type { StudySession } from "./sessions";
import { DAY, startOfDay } from "./calendar";

/* ------------------------------------------------------------------ *
 * Usage metrics for the parents' dashboard (PLANO-ESTUDO §4.11) —
 * "how is the app actually being used": entries, exits, browser hides
 * and the daily/hourly rhythm. Pure functions over the session log
 * (study/sessions.ts); nothing stored.
 * ------------------------------------------------------------------ */

export interface UsageStats {
  /** Sessions started (a lesson/test/game screen opened). */
  entries: number;
  /** Sessions where the browser/tab was closed mid-activity. */
  exits: number;
  /** Times the tab was hidden mid-session (switched app / went elsewhere). */
  hidden: number;
  /** Total seconds spent hidden (paired hidden → returned events). */
  hiddenSecs: number;
  /** Times they came back to the tab after hiding it. */
  returns: number;
  /** Average ACTIVE seconds per session. */
  avgSecs: number;
}

/** Seconds one session's tab spent hidden — each browser_hidden event paired
 *  with the browser_returned that follows it (an unmatched hide adds nothing,
 *  so a close-while-hidden never inflates the total). */
export function hiddenSecsOf(s: StudySession): number {
  let total = 0;
  let hiddenAt: number | null = null;
  for (const e of s.events) {
    if (e.type === "browser_hidden") hiddenAt = e.at;
    else if (e.type === "browser_returned" && hiddenAt != null) {
      total += Math.max(0, (e.at - hiddenAt) / 1000);
      hiddenAt = null;
    }
  }
  return Math.round(total);
}

/* ---- one session as active/paused segments (the "lesson evolution") --- */

export interface SessionSegment {
  type: "ativo" | "parado";
  /** seconds since the session started */
  fromSec: number;
  toSec: number;
}

/** Turn ONE session into alternating segments along its wall-clock span
 *  (0 … endedAt−startedAt, in seconds): a browser_hidden event opens a
 *  "parado" segment, the browser_returned that follows closes it; an
 *  unmatched hide runs "parado" to the end (closed while hidden). Everything
 *  else is "ativo". Zero-length segments are dropped. Pure — feeds the slim
 *  segment bar in the parents' day detail. */
export function sessionSegments(s: StudySession): SessionSegment[] {
  const end = Math.max(0, Math.round((s.endedAt - s.startedAt) / 1000));
  if (end === 0) return [];
  const segs: SessionSegment[] = [];
  const push = (type: SessionSegment["type"], fromSec: number, toSec: number) => {
    const a = Math.max(0, Math.min(end, fromSec));
    const b = Math.max(0, Math.min(end, toSec));
    if (b > a) segs.push({ type, fromSec: a, toSec: b });
  };
  let cursor = 0;
  let hidden = false;
  for (const e of s.events) {
    const at = Math.round((e.at - s.startedAt) / 1000);
    if (e.type === "browser_hidden" && !hidden) {
      push("ativo", cursor, at);
      cursor = Math.max(cursor, Math.min(end, at));
      hidden = true;
    } else if (e.type === "browser_returned" && hidden) {
      push("parado", cursor, at);
      cursor = Math.max(cursor, Math.min(end, at));
      hidden = false;
    }
  }
  push(hidden ? "parado" : "ativo", cursor, end);
  return segs;
}

export function usageStats(sessions: StudySession[]): UsageStats {
  let exits = 0;
  let hidden = 0;
  let hiddenSecs = 0;
  let returns = 0;
  let secs = 0;
  for (const s of sessions) {
    if (s.exited) exits += 1;
    hidden += s.hiddenCount;
    hiddenSecs += hiddenSecsOf(s);
    returns += s.events.filter((e) => e.type === "browser_returned").length;
    secs += s.secs;
  }
  const entries = sessions.length;
  return { entries, exits, hidden, hiddenSecs, returns, avgSecs: entries ? Math.round(secs / entries) : 0 };
}

/** Sessions started per day for the `days` days ending `today` — chart-ready
 *  labels ("d/m") and counts, oldest first. */
export function sessionsPerDay(sessions: StudySession[], today: number, days = 14): { labels: string[]; data: number[] } {
  const counts = new Map<number, number>();
  for (const s of sessions) {
    const day = startOfDay(s.startedAt);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  const labels: string[] = [];
  const data: number[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = today - i * DAY;
    const d = new Date(day);
    labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
    data.push(counts.get(day) ?? 0);
  }
  return { labels, data };
}

/** Sessions started per 3-hour slot of the day ("9–12h", …), trimmed to the
 *  slots actually used — shows WHEN in the day the app gets opened. */
export function sessionsByHour(sessions: StudySession[]): { labels: string[]; data: number[] } {
  const buckets = new Array<number>(8).fill(0);
  for (const s of sessions) buckets[Math.floor(new Date(s.startedAt).getHours() / 3)] += 1;
  let first = buckets.findIndex((n) => n > 0);
  if (first === -1) return { labels: [], data: [] };
  let last = buckets.length - 1;
  while (buckets[last] === 0) last -= 1;
  const labels: string[] = [];
  for (let i = first; i <= last; i++) labels.push(`${i * 3}–${i * 3 + 3}h`);
  return { labels, data: buckets.slice(first, last + 1) };
}
