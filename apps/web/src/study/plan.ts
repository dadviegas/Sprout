import { lessonMeta, schoolSubjects, subjectsForYear, type YearN } from "../content/curriculum";
import { TEST_PASS_PCT, type Achievement, type ProgressMap } from "../progress";
import { DAY, isRestDay, aggregateByDay } from "./calendar";
import type { ReviewItem } from "./review";

/* ------------------------------------------------------------------ *
 * The daily plan (PLANO-ESTUDO §4.9, user decisions 2026-06-10):
 * ~30 min/day Monday–Saturday, Sunday rest. A day's plan is 2–4
 * MISSIONS derived — pure functions, nothing stored — from:
 *   1. failed final tests ("a repetir": < 80%, not passed since),
 *   2. due questions in the error bank ("rever", §4.2),
 *   3. lessons started but not finished (history + progress),
 *   4. the weakest / least-recently-studied school subject of the
 *      child's year (a fresh lesson there).
 * Future days run the same generator with a per-day rotation so the
 * calendar can show what's PLANNED ahead.
 * ------------------------------------------------------------------ */

export const DAILY_TARGET_MINUTES = 30;
/** Rough size of one mission, so 2–4 missions ≈ the daily target. */
export const MISSION_MINUTES = 10;

export { isRestDay } from "./calendar";

export interface Mission {
  id: string;
  kind: "repetir" | "rever" | "continuar" | "nova";
  lessonId: string;
  subjectId: string;
  /** child-facing pt-PT headline */
  title: string;
  /** small supporting line */
  detail: string;
  /** read-aloud text (title + detail, child phrasing) */
  say: string;
  color: string;
  emoji: string;
  minutes: number;
  /** done that day (a passed final test on this lesson) */
  done: boolean;
}

/** The child's school year, inferred from where they actually work (mode of
 *  the school-subject lessons in history + achievements). Defaults to 1. */
export function inferYear(history: string[], achievements: Achievement[]): YearN {
  const school = new Set(schoolSubjects.map((s) => s.id));
  const votes = new Map<YearN, number>();
  const vote = (lessonId: string, weight: number) => {
    const m = lessonMeta.get(lessonId);
    if (!m || !school.has(m.subjectId)) return;
    votes.set(m.year, (votes.get(m.year) ?? 0) + weight);
  };
  for (const id of history) vote(id, 1);
  for (const a of achievements.slice(0, 30)) vote(a.lessonId, 2); // tests weigh more
  let best: YearN = 1;
  let n = 0;
  for (const [y, v] of votes) if (v > n) { best = y; n = v; }
  return best;
}

/** Lessons whose LAST final attempt failed (< 80%) and that are still not
 *  passed — the "a repetir" queue, most recent attempt first. */
export function repetirLessons(progress: ProgressMap, achievements: Achievement[]): Achievement[] {
  const seen = new Set<string>();
  const out: Achievement[] = [];
  for (const a of achievements) { // newest first → first hit is the last attempt
    if (seen.has(a.lessonId)) continue;
    seen.add(a.lessonId);
    if (a.pct < TEST_PASS_PCT && !progress[a.lessonId]?.done) out.push(a);
  }
  return out;
}

/** School subjects of `year` ordered weakest-first: least-recent activity,
 *  then lowest average test score. Pure; used to pick the "nova" mission. */
function subjectsByNeed(year: YearN, achievements: Achievement[]) {
  const lastAt = new Map<string, number>();
  const sum = new Map<string, { pct: number; n: number }>();
  for (const a of achievements) {
    if (a.year !== year) continue;
    lastAt.set(a.subjectId, Math.max(lastAt.get(a.subjectId) ?? 0, a.at));
    const s = sum.get(a.subjectId) ?? { pct: 0, n: 0 };
    s.pct += a.pct;
    s.n += 1;
    sum.set(a.subjectId, s);
  }
  const school = new Set(schoolSubjects.map((s) => s.id));
  return subjectsForYear(year)
    .filter((s) => school.has(s.id))
    .sort((a, b) => {
      const la = lastAt.get(a.id) ?? 0;
      const lb = lastAt.get(b.id) ?? 0;
      if (la !== lb) return la - lb; // least recent first
      const pa = sum.get(a.id)?.n ? sum.get(a.id)!.pct / sum.get(a.id)!.n : 0.5;
      const pb = sum.get(b.id)?.n ? sum.get(b.id)!.pct / sum.get(b.id)!.n : 0.5;
      return pa - pb; // weakest first
    });
}

function mission(kind: Mission["kind"], lessonId: string, title: string, detail: string, done: boolean): Mission | null {
  const m = lessonMeta.get(lessonId);
  if (!m) return null;
  return {
    id: `${kind}:${lessonId}`,
    kind,
    lessonId,
    subjectId: m.subjectId,
    title,
    detail,
    say: `${title}. ${detail}`,
    color: m.color,
    emoji: m.emoji,
    minutes: MISSION_MINUTES,
    done,
  };
}

/** The 2–4 missions for one day. `day`/`today` are startOfDay epochs; for a
 *  future day the generator rotates its picks so each day looks different.
 *  Sunday returns [] — it's rest. `reviews` (the error bank, §4.2) is optional
 *  so derived-only callers (e.g. study/grade.ts) can stay storage-free. */
export function missionsForDay(
  day: number,
  today: number,
  progress: ProgressMap,
  achievements: Achievement[],
  history: string[],
  reviews?: ReviewItem[],
): Mission[] {
  if (isRestDay(day)) return [];
  const byDay = aggregateByDay(achievements);
  const dayTests = byDay.get(day);
  const passedToday = new Set((dayTests?.items ?? []).filter((a) => a.pct >= TEST_PASS_PCT).map((a) => a.lessonId));
  const isDone = (lessonId: string) => passedToday.has(lessonId);
  // How far into the future this day is — rotates the picks for planned days.
  const shift = Math.max(0, Math.round((day - today) / DAY));

  const out: Mission[] = [];
  const used = new Set<string>();
  const push = (m: Mission | null) => {
    if (m && !used.has(m.lessonId) && out.length < 4) {
      used.add(m.lessonId);
      out.push(m);
    }
  };

  // 1. Repeat failed tests (max 2) — they gate "concluída", so they come first.
  const repetir = repetirLessons(progress, achievements);
  for (const a of repetir.slice(shift, shift + 2)) {
    push(mission("repetir", a.lessonId, `Repetir o teste: ${a.lessonTitle}`, "Estás quase! Com 80% ou mais fica concluída.", isDone(a.lessonId)));
  }

  // 2. Beat the due questions in the error bank (§4.2): one mission for the
  //    lesson with the most questions due BY this day. It opens the lesson —
  //    answering its quizzes right reschedules the items and clears the debt.
  if (reviews?.length) {
    const due = new Map<string, number>();
    for (const r of reviews) {
      if (r.nextAt < day + DAY && lessonMeta.has(r.lessonId) && !used.has(r.lessonId)) {
        due.set(r.lessonId, (due.get(r.lessonId) ?? 0) + 1);
      }
    }
    let topId: string | null = null;
    let topN = 0;
    for (const [id, n] of due) if (n > topN) { topId = id; topN = n; }
    if (topId) {
      const m = lessonMeta.get(topId)!;
      const qs = topN === 1 ? "1 pergunta" : `${topN} perguntas`;
      push(mission("rever", topId, `Corrigir os erros: ${m.title}`, `Tens ${qs} para vencer — abre a lição e treina.`, isDone(topId)));
    }
  }

  // 3. Continue a started-but-unfinished lesson (max 1, most recent first).
  const started = history.filter((id) => {
    const p = progress[id];
    const m = lessonMeta.get(id);
    return !!m && !!p?.visited && !p.done && !used.has(id);
  });
  const cont = started[shift % Math.max(1, started.length)] ?? started[0];
  if (cont) {
    const m = lessonMeta.get(cont)!;
    push(mission("continuar", cont, `Continuar: ${m.title}`, "Volta onde ficaste e acaba com o teste.", isDone(cont)));
  }

  // 4. Fill to at least 2 (at most 3) with fresh lessons from the subjects
  //    that need the most love, in the child's year. For a future day the
  //    pick index advances with `shift`, so each planned day differs.
  const year = inferYear(history, achievements);
  for (const subject of subjectsByNeed(year, achievements)) {
    if (out.length >= 3) break;
    const fresh = subject.years[year].filter((l) => l.body && !progress[l.id]?.done && !used.has(l.id));
    const l = fresh[shift % Math.max(1, fresh.length)] ?? fresh[0];
    if (l) push(mission("nova", l.id, `Lição nova: ${l.title}`, `${subject.label} — aprende e faz o teste.`, isDone(l.id)));
  }
  return out;
}
