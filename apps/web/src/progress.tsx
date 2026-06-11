import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { store } from "./storage";
import { lessonMeta, type YearN } from "./content/curriculum";
import { noteTestCompleted } from "./study/sessions";

/* ------------------------------------------------------------------ *
 * Progress store — persisted via the storage facade (IndexedDB-backed,
 * localStorage-cached; see ./storage). Tracks, per lesson:
 *   - whether the child has opened it (visited)
 *   - whether the final questionnaire was completed (done)
 *   - best stars (0–3) and best percentage from the final questionnaire
 *   - best score per individual quiz block
 * ------------------------------------------------------------------ */

export interface QuizScore {
  correct: number;
  total: number;
}

export interface LessonProgress {
  visited: boolean;
  done: boolean;
  bestStars: number;
  bestPct: number;
  quizzes: Record<string, QuizScore>;
}

export type ProgressMap = Record<string, LessonProgress>;

/* A logged accomplishment: a completed final test, stamped with WHEN it
 * happened and the AREA (subject + year) where it was done. Append-only. */
export interface Achievement {
  lessonId: string;
  lessonTitle: string;
  subjectId: string;
  subjectLabel: string;
  color: string;
  year: YearN;
  emoji: string;
  stars: number;
  pct: number;
  /** epoch ms — kept as a number so it serialises cleanly */
  at: number;
  /** how long the test took, in seconds (absent on older entries) */
  secs?: number;
  /** how many questions the test had (absent on older entries) */
  qs?: number;
}

/** A final test only counts as PASSED — lesson "concluída", streak, reward —
 *  at this score or better (user decision 2026-06-10). Below it the lesson
 *  stays "a repetir". One constant, shared by progress, plan and parents. */
export const TEST_PASS_PCT = 0.8;

const STORAGE_KEY = "sprout.progress.v1";
const ACHIEVEMENTS_KEY = "sprout.achievements.v1";
const HISTORY_KEY = "sprout.history.v1";

/** How many recently-opened lessons to remember (newest first). */
const MAX_HISTORY = 20;

function emptyLesson(): LessonProgress {
  return { visited: false, done: false, bestStars: 0, bestPct: 0, quizzes: {} };
}

export function starsForPct(pct: number): number {
  if (pct >= 1) return 3;
  if (pct >= 0.6) return 2;
  if (pct > 0) return 1;
  return 0;
}

function load(): ProgressMap {
  return store.getSync<ProgressMap>(STORAGE_KEY, {});
}

function loadAchievements(): Achievement[] {
  return store.getSync<Achievement[]>(ACHIEVEMENTS_KEY, []);
}

/** Recently-opened lesson ids, newest first. Guard the shape so a stale/garbled
 *  value can never crash the home screen. */
function loadHistory(): string[] {
  const h = store.getSync<unknown>(HISTORY_KEY, []);
  return Array.isArray(h) ? h.filter((id): id is string => typeof id === "string").slice(0, MAX_HISTORY) : [];
}

/** Merge two recency lists keeping order (current wins, then any older ids the
 *  durable backend still has), de-duplicated and capped — so a hydrate never
 *  drops what was just opened this session. */
function mergeHistory(a: string[], b: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const id of [...a, ...b]) {
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
    if (out.length >= MAX_HISTORY) break;
  }
  return out;
}

/** Merge two achievement logs, de-duplicating by (lessonId + timestamp) so a
 *  durable-backend hydrate never double-counts. Newest first. */
function mergeAchievements(a: Achievement[], b: Achievement[]): Achievement[] {
  const seen = new Set<string>();
  const out: Achievement[] = [];
  for (const ach of [...a, ...b]) {
    const key = `${ach.lessonId}@${ach.at}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(ach);
  }
  return out.sort((x, y) => y.at - x.at);
}

/** Combine two progress maps keeping the BEST of each lesson — used when the
 *  durable backend (IndexedDB) hydrates after first paint, so nothing earned
 *  in this session before hydration completes is ever lost. */
function mergeProgress(a: ProgressMap, b: ProgressMap): ProgressMap {
  const out: ProgressMap = { ...a };
  for (const [id, lb] of Object.entries(b)) {
    const la = out[id];
    if (!la) {
      out[id] = lb;
      continue;
    }
    const quizzes = { ...la.quizzes };
    for (const [qid, qb] of Object.entries(lb.quizzes)) {
      const qa = quizzes[qid];
      const ra = qa ? qa.correct / qa.total : -1;
      const rb = qb.total ? qb.correct / qb.total : 0;
      if (rb >= ra) quizzes[qid] = qb;
    }
    out[id] = {
      visited: la.visited || lb.visited,
      done: la.done || lb.done,
      bestStars: Math.max(la.bestStars, lb.bestStars),
      bestPct: Math.max(la.bestPct, lb.bestPct),
      quizzes,
    };
  }
  return out;
}

interface ProgressContextValue {
  progress: ProgressMap;
  achievements: Achievement[];
  /** Recently-opened lesson ids, newest first (max 20). */
  history: string[];
  lessonOf: (lessonId: string) => LessonProgress;
  markVisited: (lessonId: string) => void;
  /** Push a lesson to the front of the recently-seen list. */
  recordSeen: (lessonId: string) => void;
  /** Drop one lesson from the recently-seen list. */
  removeSeen: (lessonId: string) => void;
  /** Empty the recently-seen list. */
  clearHistory: () => void;
  /** `starsPct` is the help-weighted score (§4.5) used for the STARS only —
   *  pass/`done` always use the raw `score`. Defaults to the raw ratio. */
  recordQuiz: (lessonId: string, quizId: string, score: QuizScore, isFinal: boolean, durationSecs?: number, starsPct?: number) => void;
  totalStars: number;
  resetAll: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>(load);
  const [achievements, setAchievements] = useState<Achievement[]>(loadAchievements);
  const [history, setHistory] = useState<string[]>(loadHistory);

  useEffect(() => {
    store.set(STORAGE_KEY, progress);
  }, [progress]);

  useEffect(() => {
    store.set(ACHIEVEMENTS_KEY, achievements);
  }, [achievements]);

  useEffect(() => {
    store.set(HISTORY_KEY, history);
  }, [history]);

  // When the durable backend finishes hydrating (and on any external write,
  // e.g. another tab), merge its data in without dropping in-session state.
  useEffect(() => {
    let alive = true;
    const sync = () => {
      if (!alive) return;
      setProgress((cur) => mergeProgress(cur, load()));
      setAchievements((cur) => mergeAchievements(cur, loadAchievements()));
      setHistory((cur) => mergeHistory(cur, loadHistory()));
    };
    void store.ready.then(sync);
    const unsubP = store.subscribe(STORAGE_KEY, sync);
    const unsubA = store.subscribe(ACHIEVEMENTS_KEY, sync);
    const unsubH = store.subscribe(HISTORY_KEY, sync);
    return () => { alive = false; unsubP(); unsubA(); unsubH(); };
  }, []);

  const lessonOf = useCallback(
    (lessonId: string): LessonProgress => progress[lessonId] ?? emptyLesson(),
    [progress],
  );

  const markVisited = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const cur = prev[lessonId] ?? emptyLesson();
      if (cur.visited) return prev;
      return { ...prev, [lessonId]: { ...cur, visited: true } };
    });
  }, []);

  const recordSeen = useCallback((lessonId: string) => {
    setHistory((prev) => {
      if (prev[0] === lessonId) return prev; // already most-recent — no-op
      return [lessonId, ...prev.filter((id) => id !== lessonId)].slice(0, MAX_HISTORY);
    });
  }, []);

  const removeSeen = useCallback((lessonId: string) => {
    setHistory((prev) => prev.filter((id) => id !== lessonId));
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  const recordQuiz = useCallback(
    (lessonId: string, quizId: string, score: QuizScore, isFinal: boolean, durationSecs?: number, starsPct?: number) => {
      // Stars are help-weighted (§4.5: an answer "com ajuda" is worth half),
      // while `done`/bestPct keep the raw score — help never blocks a pass.
      const starRatio = starsPct ?? (score.total ? score.correct / score.total : 0);
      setProgress((prev) => {
        const cur = prev[lessonId] ?? emptyLesson();
        const prevScore = cur.quizzes[quizId];
        const prevRatio = prevScore ? prevScore.correct / prevScore.total : -1;
        const ratio = score.total ? score.correct / score.total : 0;
        const quizzes = ratio >= prevRatio ? { ...cur.quizzes, [quizId]: score } : cur.quizzes;

        let { done, bestPct, bestStars } = cur;
        if (isFinal) {
          // ≥ 80% gate: below it the lesson is NOT concluded — it stays
          // "a repetir" (stars/bestPct still record the attempt's best).
          done = done || ratio >= TEST_PASS_PCT;
          bestPct = Math.max(bestPct, ratio);
          bestStars = Math.max(bestStars, starsForPct(starRatio));
        }
        return { ...prev, [lessonId]: { ...cur, visited: true, done, bestPct, bestStars, quizzes } };
      });

      // Log the achievement: completing a final test, stamped with the date and
      // the area (subject + year) where it was done.
      if (isFinal) {
        const meta = lessonMeta.get(lessonId);
        if (meta) {
          const ratio = score.total ? score.correct / score.total : 0;
          const now = Date.now();
          // Stamp the open study session with this completion (one source of
          // session truth — see study/sessions.ts; the achievement is below).
          noteTestCompleted(ratio);
          setAchievements((prev) => {
            // Guard against accidental double-logging of one completion (React
            // StrictMode double-invokes effects in dev; re-renders can refire).
            // Genuine retries are seconds apart, so a short window is safe.
            if (prev[0] && prev[0].lessonId === lessonId && now - prev[0].at < 1500) return prev;
            return [
              {
                lessonId,
                lessonTitle: meta.title,
                subjectId: meta.subjectId,
                subjectLabel: meta.subjectLabel,
                color: meta.color,
                year: meta.year,
                emoji: meta.emoji,
                stars: starsForPct(starRatio),
                pct: ratio,
                at: now,
                ...(durationSecs && durationSecs > 0 ? { secs: durationSecs } : {}),
                ...(score.total > 0 ? { qs: score.total } : {}),
              },
              ...prev,
            ];
          });
        }
      }
    },
    [],
  );

  const resetAll = useCallback(() => {
    store.remove(STORAGE_KEY);
    store.remove(ACHIEVEMENTS_KEY);
    store.remove(HISTORY_KEY);
    setProgress({});
    setAchievements([]);
    setHistory([]);
  }, []);

  const totalStars = useMemo(
    () => Object.values(progress).reduce((sum, l) => sum + (l.bestStars ?? 0), 0),
    [progress],
  );

  const value = useMemo(
    () => ({ progress, achievements, history, lessonOf, markVisited, recordSeen, removeSeen, clearHistory, recordQuiz, totalStars, resetAll }),
    [progress, achievements, history, lessonOf, markVisited, recordSeen, removeSeen, clearHistory, recordQuiz, totalStars, resetAll],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

/* The lesson currently on screen — so a <Quiz> embedded in markdown knows
   which lesson to record its score against. */
export const LessonContext = createContext<string | null>(null);
export function useLessonId(): string {
  return useContext(LessonContext) ?? "_unknown";
}
