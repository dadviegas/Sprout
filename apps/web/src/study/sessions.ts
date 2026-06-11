import { useEffect, useState } from "react";
import { store } from "../storage";

/* ------------------------------------------------------------------ *
 * Study-session tracking (PLANO-ESTUDO §4.1).
 *
 * One open session at a time, started when the child enters a lesson,
 * test or game screen and closed when they leave it. Only ACTIVE time
 * counts (tab visible); hiding the tab pauses the clock and is logged
 * as an event, so the parents' area can say "saiu do browser 3×".
 *
 * Everything is persisted through the storage facade under
 * `sprout.sessions.v1` — an append-only log with a cap, newest first
 * (same shape discipline as the achievements log). Reports/calendars
 * are always DERIVED from this log at render time; nothing aggregated
 * is ever stored.
 * ------------------------------------------------------------------ */

export type SessionKind = "lesson" | "test" | "game";

export type SessionEventType = "browser_hidden" | "browser_returned" | "browser_exit";

export interface SessionEvent {
  type: SessionEventType;
  at: number; // epoch ms
}

export interface StudySession {
  id: string; // `${startedAt}-${nonce}`
  startedAt: number; // epoch ms
  endedAt: number; // epoch ms (kept fresh while open, via heartbeat)
  /** ACTIVE seconds — only while the tab was visible. */
  secs: number;
  kind: SessionKind;
  lessonId?: string;
  subjectId?: string;
  /** where it happened when not lesson-bound (e.g. "diversao") */
  area?: string;
  /** a final test was finished during this session */
  completed: boolean;
  /** that test's score (0–1), when completed */
  score?: number;
  /** max % (0–100) of the lesson body scrolled — how far they actually read */
  scrollPct?: number;
  /** times the tab was hidden mid-session */
  hiddenCount: number;
  /** the tab/browser was closed while this session was open */
  exited: boolean;
  events: SessionEvent[];
}

export const SESSIONS_KEY = "sprout.sessions.v1";

/** Log cap — old sessions rotate out (PLANO-ESTUDO §3: append-only with teto). */
const MAX_SESSIONS = 500;
/** Per-session event cap, so a flaky tab can't balloon one entry. */
const MAX_EVENTS = 40;
/** While a session is open, persist progress this often (visible time only). */
const HEARTBEAT_MS = 25_000;
/** RESUME RULE: re-entering the SAME lesson within this window reopens the
 *  last session instead of logging a new one — rapid re-mounts / back-and-
 *  forth navigation were spamming the log with one entry per mount. */
const RESUME_WINDOW_MS = 60_000;
/** DISCARD RULE: a session that ends under this many active seconds with no
 *  completed test is a stray open-and-leave (mis-tap, remount) — dropped. */
const MIN_KEEP_SECS = 5;

/** Read the log, guarding the shape so stale/garbled data never crashes. */
export function loadSessions(): StudySession[] {
  const raw = store.getSync<unknown>(SESSIONS_KEY, []);
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (s): s is StudySession =>
      !!s &&
      typeof s === "object" &&
      typeof (s as StudySession).id === "string" &&
      typeof (s as StudySession).startedAt === "number" &&
      typeof (s as StudySession).secs === "number",
  );
}

/* ---- the tracker (module-level singleton) -------------------------- */

let open: StudySession | null = null;
/** When the tab last became visible with a session open (null = paused). */
let visibleSince: number | null = null;
let nonce = 0;
let installed = false;
let heartbeat: number | undefined;

/** Fold the running visible time into `open.secs`. */
function settleClock(now: number): void {
  if (!open || visibleSince == null) return;
  open.secs += Math.max(0, Math.round((now - visibleSince) / 1000));
  visibleSince = now;
}

function pushEvent(type: SessionEventType, at: number): void {
  if (!open || open.events.length >= MAX_EVENTS) return;
  open.events.push({ type, at });
}

/** Write the open session into the log (replacing any older copy of itself). */
function persist(): void {
  if (!open) return;
  open.endedAt = Date.now();
  const id = open.id;
  const rest = loadSessions().filter((s) => s.id !== id);
  store.set(SESSIONS_KEY, [open, ...rest].slice(0, MAX_SESSIONS));
}

/** Start a session, closing any open one. Re-entering the same lesson+kind
 *  (e.g. a re-render) keeps the running session instead of splitting it. */
export function startSession(kind: SessionKind, lessonId?: string, subjectId?: string, area?: string): void {
  if (open && open.kind === kind && open.lessonId === lessonId && open.area === area) return;
  endSession();
  const now = Date.now();
  // RESUME RULE: if the newest logged session is this same target and ended
  // less than RESUME_WINDOW_MS ago (navigation joggling, remount loops),
  // reopen it and keep accumulating its seconds instead of logging junk.
  const last = loadSessions()[0];
  if (
    last &&
    last.kind === kind &&
    last.lessonId === lessonId &&
    last.area === area &&
    now - last.endedAt < RESUME_WINDOW_MS
  ) {
    open = { ...last, exited: false };
    visibleSince = typeof document !== "undefined" && document.hidden ? null : now;
    persist();
    return;
  }
  open = {
    id: `${now}-${nonce++}`,
    startedAt: now,
    endedAt: now,
    secs: 0,
    kind,
    ...(lessonId ? { lessonId } : {}),
    ...(subjectId ? { subjectId } : {}),
    ...(area ? { area } : {}),
    completed: false,
    hiddenCount: 0,
    exited: false,
    events: [],
  };
  visibleSince = typeof document !== "undefined" && document.hidden ? null : now;
  persist();
}

/** Close the open session (navigated away inside the app). */
export function endSession(): void {
  if (!open) return;
  settleClock(Date.now());
  // DISCARD RULE: under MIN_KEEP_SECS of active time and nothing completed —
  // a stray "só abriu" blip. Remove it from the log (startSession persisted
  // it on open) instead of keeping junk rows.
  if (open.secs < MIN_KEEP_SECS && !open.completed) {
    const id = open.id;
    store.set(SESSIONS_KEY, loadSessions().filter((s) => s.id !== id));
  } else {
    persist();
  }
  open = null;
  visibleSince = null;
}

/** Called from the lesson view on scroll: keep the MAX % of the lesson body
 *  the child has scrolled past. In-memory only — the heartbeat / endSession /
 *  pagehide persists already cover it, so scrolling never spams storage. */
export function noteScroll(pct: number, lessonId: string): void {
  // The lessonId guard keeps a measurement from crediting the WRONG session
  // (child effects run before the parent's trackView on a lesson→lesson hop).
  if (!open || open.lessonId !== lessonId) return;
  const clamped = Math.max(0, Math.min(100, Math.round(pct)));
  if (clamped > (open.scrollPct ?? 0)) open.scrollPct = clamped;
}

/** Called from the progress store when a final test is recorded, so the
 *  session that hosted it carries the completion + score (no duplicate log —
 *  the achievement itself stays in `sprout.achievements.v1`). */
export function noteTestCompleted(score: number): void {
  if (!open) return;
  settleClock(Date.now());
  open.completed = true;
  open.score = score;
  persist();
}

/** Map the current app view to a session (lesson/test/game) — anything else
 *  closes the open one. Called from App on every navigation. */
export function trackView(view: { kind: string; lessonId?: string; subjectId?: string }): void {
  if (view.kind === "lesson" || view.kind === "test") startSession(view.kind, view.lessonId, view.subjectId);
  else if (view.kind === "diversao") startSession("game", undefined, undefined, "diversao");
  else endSession();
}

/** Install the visibility/exit listeners + heartbeat. Idempotent; call once. */
export function initSessionTracking(): void {
  if (installed || typeof window === "undefined") return;
  installed = true;

  // One-time sweep of historical junk: before the resume/discard rules above,
  // every re-mount logged its own session, so old logs carry piles of "<5 s,
  // nothing done" rows. Apply the discard rule once, after the durable backend
  // hydrates (sweeping earlier would be undone by the hydrate merge).
  void store.ready.then(() => {
    if (open) return; // never touch a session that's currently running
    const all = loadSessions();
    const keep = all.filter((s) => s.secs >= MIN_KEEP_SECS || s.completed);
    if (keep.length !== all.length) store.set(SESSIONS_KEY, keep);
  });

  document.addEventListener("visibilitychange", () => {
    if (!open) return;
    const now = Date.now();
    if (document.hidden) {
      settleClock(now);
      visibleSince = null; // pause the clock
      open.hiddenCount += 1;
      pushEvent("browser_hidden", now);
    } else {
      visibleSince = now; // resume
      pushEvent("browser_returned", now);
    }
    persist();
  });

  // `pagehide` fires on close/refresh/navigation away (more reliable than
  // beforeunload on mobile). The synchronous localStorage mirror inside
  // store.set is what survives; the heartbeat keeps IndexedDB near-fresh.
  window.addEventListener("pagehide", () => {
    if (!open) return;
    settleClock(Date.now());
    // DISCARD RULE applies at exit too: an open-and-close blip leaves no row
    // (if the page comes back from the bfcache, the heartbeat re-persists it).
    if (open.secs < MIN_KEEP_SECS && !open.completed) {
      const id = open.id;
      store.set(SESSIONS_KEY, loadSessions().filter((s) => s.id !== id));
      return;
    }
    open.exited = true;
    pushEvent("browser_exit", Date.now());
    persist();
  });

  heartbeat = window.setInterval(() => {
    if (!open || document.hidden) return;
    settleClock(Date.now());
    persist();
  }, HEARTBEAT_MS);
  void heartbeat; // kept for the app's lifetime — never cleared
}

/* ---- React access -------------------------------------------------- */

/** The session log, newest first, re-read when storage hydrates/changes. */
export function useSessions(): StudySession[] {
  const [sessions, setSessions] = useState<StudySession[]>(loadSessions);
  useEffect(() => {
    const sync = () => setSessions(loadSessions());
    void store.ready.then(sync);
    return store.subscribe(SESSIONS_KEY, sync);
  }, []);
  return sessions;
}
