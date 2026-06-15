import { useEffect, useState } from "react";
import { store } from "../storage";
import { lessonMeta } from "../content/curriculum";
import { DAY, startOfDay } from "./calendar";
import { EXPECTED_SECS_PER_QUESTION } from "./alerts";
import type { SpeechLang } from "@sprout/ui";

/* ------------------------------------------------------------------ *
 * Banco de erros + revisão espaçada (PLANO-ESTUDO §4.2).
 *
 * Every quiz answer feeds a small Leitner schedule, one item per
 * QUESTION (stable id `${lessonId}#${quizId}#${questionIndex}`):
 *   - wrong            → box 0 → review TOMORROW
 *   - right but slow   → up one box (modest)   → ~2 days
 *   - right            → straight to box 2     → 7 days
 *   - right repeatedly → boxes 3/4             → 14 / 30 days
 * An item is only BORN from a wrong answer (the bank holds errors, not
 * everything ever answered); a right answer past the top box masters
 * the question and drops it. Stored under `sprout.review.v1` as a
 * Record<id, ReviewItem>, capped — strongest items rotate out first.
 *
 * Due items feed the daily missions ("Corrigir os erros") and the
 * child's "Banco de erros" card in #/plano. There is no separate quiz
 * runner — the child re-opens the lesson and beats the questions there
 * (a dedicated review runner is future work, §4.2).
 * ------------------------------------------------------------------ */

export const REVIEW_KEY = "sprout.review.v1";

/** The interval ladder, in days per Leitner box (user rule, §4.2). */
export const REVIEW_DAYS = [1, 2, 7, 14, 30];

/** Store cap — beyond it the STRONGEST items (highest box, then the most
 *  distant review date) are dropped first; the errors stay. */
const MAX_ITEMS = 400;

/** An answer slower than this (per question) climbs only one box. */
const SLOW_SECS = EXPECTED_SECS_PER_QUESTION;

export interface ReviewItem {
  /** stable question id: `${lessonId}#${quizId}#${questionIndex}` */
  id: string;
  lessonId: string;
  subjectId: string;
  /** Leitner box 0..4 — indexes REVIEW_DAYS */
  box: number;
  attempts: number;
  correct: number;
  wrong: number;
  /** epoch ms of the last answer */
  lastAt: number;
  /** when it should reappear (start-of-day based, epoch ms) */
  nextAt: number;
  /** the question's difficulty tag, 1 fácil · 2 média · 3 difícil (§4.4) */
  level?: number;
  /** how many answers used the help ladder (§4.5) — visible to parents */
  assisted?: number;
  /** Frozen copy of the authored question, so review survives markdown/id edits. */
  snapshot?: ReviewQuestionSnapshot;
}

export interface ReviewQuestionSnapshot {
  q: string;
  lang?: SpeechLang;
  optionLang?: SpeechLang;
  emoji?: string;
  options: { t: string; emoji?: string; correct?: boolean; lang?: SpeechLang; feedback?: string; tag?: string }[];
  explain?: string;
  level?: number;
}

export type ReviewMap = Record<string, ReviewItem>;

/** Read the bank, guarding the shape so stale/garbled data never crashes. */
export function loadReview(): ReviewMap {
  const raw = store.getSync<unknown>(REVIEW_KEY, {});
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: ReviewMap = {};
  for (const [id, v] of Object.entries(raw as Record<string, unknown>)) {
    const r = v as ReviewItem;
    if (r && typeof r === "object" && typeof r.lessonId === "string" && typeof r.box === "number" && typeof r.nextAt === "number") {
      out[id] = r;
    }
  }
  return out;
}

/** Stable id for one authored quiz question. Dynamic (`gen`) questions have no
 *  stable identity and never enter the bank — the caller skips them. */
export const questionId = (lessonId: string, quizId: string, index: number): string =>
  `${lessonId}#${quizId}#${index}`;

/** Fold one answered question into the bank. No-ops for unknown lessons
 *  (e.g. the Simulado's synthetic id) — the bank only holds real lessons.
 *  `assisted` (§4.5) means the help ladder was used: the answer still counts,
 *  but the question is "needs work" — it enters/stays at box 0 like an error.
 *  `level` (§4.4) is the question's difficulty tag, recorded for later use.
 *  `snapshot` keeps the original question available even if the lesson body
 *  changes before the item is due. */
export function recordReviewAnswer(
  lessonId: string,
  quizId: string,
  questionIndex: number,
  correct: boolean,
  answerSecs: number,
  opts: { assisted?: boolean; level?: number; snapshot?: ReviewQuestionSnapshot } = {},
  now = Date.now(),
): void {
  const meta = lessonMeta.get(lessonId);
  if (!meta) return;
  const assisted = !!opts.assisted;
  const items = loadReview();
  const id = questionId(lessonId, quizId, questionIndex);
  const cur = items[id];

  if (!cur && correct && !assisted) return; // nothing to fix — the bank holds errors only

  let box: number;
  if (!correct || assisted) {
    box = 0; // wrong, or right only with help: review tomorrow
  } else if (answerSecs > SLOW_SECS) {
    box = (cur?.box ?? 0) + 1; // right but slow — climb modestly
  } else {
    box = Math.max((cur?.box ?? 0) + 1, 2); // right at a good pace — 7 days
  }

  if (box >= REVIEW_DAYS.length) {
    // Mastered: answered right at the top of the ladder — out of the bank.
    delete items[id];
    store.set(REVIEW_KEY, items);
    return;
  }

  items[id] = {
    id,
    lessonId,
    subjectId: meta.subjectId,
    box,
    attempts: (cur?.attempts ?? 0) + 1,
    correct: (cur?.correct ?? 0) + (correct ? 1 : 0),
    wrong: (cur?.wrong ?? 0) + (correct ? 0 : 1),
    level: opts.level ?? cur?.level,
    assisted: (cur?.assisted ?? 0) + (assisted ? 1 : 0),
    snapshot: opts.snapshot ?? cur?.snapshot,
    lastAt: now,
    // Start-of-day based, so "amanhã" means the next calendar day, not 24 h.
    nextAt: startOfDay(now) + REVIEW_DAYS[box] * DAY,
  };

  // Cap: drop the strongest items first (highest box, most distant review).
  const all = Object.values(items);
  if (all.length > MAX_ITEMS) {
    all.sort((a, b) => b.box - a.box || b.nextAt - a.nextAt);
    for (const drop of all.slice(0, all.length - MAX_ITEMS)) delete items[drop.id];
  }
  store.set(REVIEW_KEY, items);
}

/** Items due at `now` (or earlier), most overdue first. Items whose lesson no
 *  longer exists are skipped (a re-id just quietly shrinks the bank). */
export function dueReviews(items: ReviewMap, now: number): ReviewItem[] {
  return Object.values(items)
    .filter((r) => r.nextAt <= now && lessonMeta.has(r.lessonId))
    .sort((a, b) => a.nextAt - b.nextAt);
}

/** Due-question count per lesson — feeds the daily missions (study/plan.ts). */
export function dueByLesson(items: ReviewMap, now: number): Map<string, number> {
  const out = new Map<string, number>();
  for (const r of dueReviews(items, now)) out.set(r.lessonId, (out.get(r.lessonId) ?? 0) + 1);
  return out;
}

/* ---- React access -------------------------------------------------- */

/** The review bank, re-read when storage hydrates/changes. */
export function useReview(): ReviewMap {
  const [items, setItems] = useState<ReviewMap>(loadReview);
  useEffect(() => {
    const sync = () => setItems(loadReview());
    void store.ready.then(sync);
    return store.subscribe(REVIEW_KEY, sync);
  }, []);
  return items;
}
