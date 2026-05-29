import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { store } from "./storage";
import { lessonMeta, type YearN } from "./content/curriculum";

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
}

const STORAGE_KEY = "sprout.progress.v1";
const ACHIEVEMENTS_KEY = "sprout.achievements.v1";

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
  lessonOf: (lessonId: string) => LessonProgress;
  markVisited: (lessonId: string) => void;
  recordQuiz: (lessonId: string, quizId: string, score: QuizScore, isFinal: boolean) => void;
  totalStars: number;
  resetAll: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>(load);
  const [achievements, setAchievements] = useState<Achievement[]>(loadAchievements);

  useEffect(() => {
    store.set(STORAGE_KEY, progress);
  }, [progress]);

  useEffect(() => {
    store.set(ACHIEVEMENTS_KEY, achievements);
  }, [achievements]);

  // When the durable backend finishes hydrating (and on any external write,
  // e.g. another tab), merge its data in without dropping in-session state.
  useEffect(() => {
    let alive = true;
    const sync = () => {
      if (!alive) return;
      setProgress((cur) => mergeProgress(cur, load()));
      setAchievements((cur) => mergeAchievements(cur, loadAchievements()));
    };
    void store.ready.then(sync);
    const unsubP = store.subscribe(STORAGE_KEY, sync);
    const unsubA = store.subscribe(ACHIEVEMENTS_KEY, sync);
    return () => { alive = false; unsubP(); unsubA(); };
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

  const recordQuiz = useCallback(
    (lessonId: string, quizId: string, score: QuizScore, isFinal: boolean) => {
      setProgress((prev) => {
        const cur = prev[lessonId] ?? emptyLesson();
        const prevScore = cur.quizzes[quizId];
        const prevRatio = prevScore ? prevScore.correct / prevScore.total : -1;
        const ratio = score.total ? score.correct / score.total : 0;
        const quizzes = ratio >= prevRatio ? { ...cur.quizzes, [quizId]: score } : cur.quizzes;

        let { done, bestPct, bestStars } = cur;
        if (isFinal) {
          done = true;
          bestPct = Math.max(bestPct, ratio);
          bestStars = Math.max(bestStars, starsForPct(ratio));
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
                stars: starsForPct(ratio),
                pct: ratio,
                at: now,
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
    setProgress({});
    setAchievements([]);
  }, []);

  const totalStars = useMemo(
    () => Object.values(progress).reduce((sum, l) => sum + (l.bestStars ?? 0), 0),
    [progress],
  );

  const value = useMemo(
    () => ({ progress, achievements, lessonOf, markVisited, recordQuiz, totalStars, resetAll }),
    [progress, achievements, lessonOf, markVisited, recordQuiz, totalStars, resetAll],
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
