import type { IconName } from "@sprout/icons";
import { TEST_PASS_PCT, type Achievement } from "../progress";
import type { StudySession } from "./sessions";
import { DAY } from "./calendar";

/* ------------------------------------------------------------------ *
 * Parents' alerts (PLANO-ESTUDO §4.11) — pure rules over the session +
 * achievement logs, derived at render. Tone is ALWAYS constructive:
 * an alert says what happened and what helps, never "está mal".
 * ------------------------------------------------------------------ */

export interface ParentAlert {
  tone: "good" | "watch";
  icon: IconName;
  /** one short pt-PT sentence — what happened */
  text: string;
  /** the "porquê" / what helps, also short */
  why: string;
}

/** Expected pace: a comfortable median per question. Faster/slower than this
 *  band classifies a test as "fácil"/"difícil" by time (user decision). */
export const EXPECTED_SECS_PER_QUESTION = 45;
/** Under this per-question pace a test probably got rushed. */
export const RUSHED_SECS_PER_QUESTION = 15;
/** Tab-hides during study in a week before we mention it. */
const HIDDEN_ALERT_COUNT = 4;
const WEEK = 7 * DAY;

/** When the question count wasn't recorded (older tests), assume a short test. */
const FALLBACK_QUESTIONS = 5;

export type Pace = "rapido" | "normal" | "lento";

/** Time-based difficulty of one test, or null when no duration was recorded. */
export function paceOf(a: Achievement): Pace | null {
  if (!a.secs) return null;
  const expected = EXPECTED_SECS_PER_QUESTION * (a.qs ?? FALLBACK_QUESTIONS);
  if (a.secs < expected * 0.5) return "rapido";
  if (a.secs > expected * 1.5) return "lento";
  return "normal";
}

/** Top `n` tests by per-question time — "onde demoraram mais". */
export function slowestTests(achievements: Achievement[], n = 5): Achievement[] {
  return achievements
    .filter((a) => a.secs && a.secs > 0)
    .sort((x, y) => y.secs! / (y.qs ?? FALLBACK_QUESTIONS) - x.secs! / (x.qs ?? FALLBACK_QUESTIONS))
    .slice(0, n);
}

/** Average pct of the achievements of one subject inside [from, to).
 *  Shared with the weekly report (study/report.ts) for its score trends. */
export function avgPct(achievements: Achievement[], subjectId: string, from: number, to: number): { pct: number; n: number } {
  let sum = 0;
  let n = 0;
  for (const a of achievements) {
    if (a.subjectId !== subjectId || a.at < from || a.at >= to) continue;
    sum += a.pct;
    n += 1;
  }
  return { pct: n ? sum / n : 0, n };
}

/** All the alerts worth showing right now, positives first. */
export function buildAlerts(sessions: StudySession[], achievements: Achievement[], now: number): ParentAlert[] {
  const weekAgo = now - WEEK;
  const out: ParentAlert[] = [];

  // ✅ Improved a subject this week vs. last week (≥ 10 points).
  const subjects = new Map<string, string>();
  for (const a of achievements) subjects.set(a.subjectId, a.subjectLabel);
  for (const [subjectId, label] of subjects) {
    const cur = avgPct(achievements, subjectId, weekAgo, now + 1);
    const prev = avgPct(achievements, subjectId, weekAgo - WEEK, weekAgo);
    if (cur.n > 0 && prev.n > 0 && cur.pct - prev.pct >= 0.1) {
      out.push({
        tone: "good",
        icon: "check",
        text: `Melhorou a ${label}: de ${Math.round(prev.pct * 100)}% para ${Math.round(cur.pct * 100)}%.`,
        why: "O treino está a resultar — vale a pena continuar no mesmo ritmo.",
      });
    }
  }

  // ⚠️ Left the browser repeatedly during study this week.
  const hidden = sessions.reduce((n, s) => (s.startedAt >= weekAgo ? n + s.hiddenCount : n), 0);
  if (hidden >= HIDDEN_ALERT_COUNT) {
    out.push({
      tone: "watch",
      icon: "eye",
      text: `Saiu do browser ${hidden}× durante o estudo esta semana.`,
      why: "Pode ser distração — estudar com um adulto por perto costuma ajudar.",
    });
  }

  // ⚠️ A test answered suspiciously fast (< 15 s/question).
  const rushed = achievements.find(
    (a) => a.at >= weekAgo && a.secs != null && a.secs > 0 && a.secs / (a.qs ?? FALLBACK_QUESTIONS) < RUSHED_SECS_PER_QUESTION,
  );
  if (rushed) {
    const mins = rushed.secs! < 60 ? `${rushed.secs} segundos` : `${Math.round(rushed.secs! / 60)} minutos`;
    out.push({
      tone: "watch",
      icon: "clock",
      text: `Fez o teste «${rushed.lessonTitle}» em ${mins} — pode ter respondido à pressa.`,
      why: "Pedir para ler a pergunta em voz alta abranda o ritmo e melhora os acertos.",
    });
  }

  // ⚠️ Keeps missing the same lesson (≥ 2 failed attempts, still not passed).
  const fails = new Map<string, { n: number; title: string; passed: boolean }>();
  for (const a of achievements) {
    const f = fails.get(a.lessonId) ?? { n: 0, title: a.lessonTitle, passed: false };
    if (a.pct >= TEST_PASS_PCT) f.passed = true;
    else f.n += 1;
    fails.set(a.lessonId, f);
  }
  for (const f of fails.values()) {
    if (!f.passed && f.n >= 2) {
      out.push({
        tone: "watch",
        icon: "refresh",
        text: `«${f.title}» ainda não passou — já tentou ${f.n} vezes.`,
        why: "Rever a lição juntos antes do próximo teste costuma destrancar.",
      });
      break; // one is enough; the detail lists show the rest
    }
  }

  // ✅ Fallback positive: a week with passed tests deserves a nod.
  if (out.length === 0) {
    const passed = achievements.filter((a) => a.at >= weekAgo && a.pct >= TEST_PASS_PCT).length;
    if (passed > 0) {
      out.push({
        tone: "good",
        icon: "trophy",
        text: `Semana positiva: ${passed} teste${passed === 1 ? "" : "s"} passado${passed === 1 ? "" : "s"} com 80% ou mais.`,
        why: "Está a cumprir o objetivo — o plano diário está a funcionar.",
      });
    }
  }

  return out.sort((a, b) => (a.tone === b.tone ? 0 : a.tone === "good" ? -1 : 1));
}
