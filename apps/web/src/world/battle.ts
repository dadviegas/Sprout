/* Academia dos Elementos — the "Dragão do Caos" battle: the actual game loop from
 * the doc (Loop principal + Bosses cooperativos). The child fights the dragon by
 * ANSWERING questions ("cada resposta correta tira dano"); the school subject is
 * the weapon. Questions are generated (so the boss is endlessly replayable) and
 * scale with the hero's level — 1.º ciclo arithmetic, no algebra.
 *
 * Errors are never punished: a wrong answer just asks the child to try again. The
 * reward comes from finishing the boss (persistence), not from being perfect. */

export const BOSS_NAME = "Dragão do Caos";

/** HP of the n-th dragon (0-based) — each one a little tougher than the last. */
export const bossMaxHp = (defeats: number) => 500 + defeats * 250;

/** Damage one correct answer deals — kept level-independent so a boss is always
 *  ~8–12 right answers; higher levels just face harder questions. */
export function damageFor(): number {
  return 40 + Math.floor(Math.random() * 30); // 40–69
}

/** Coins + XP granted once a dragon is defeated (added via world-state, like a
 *  claimed mission — so it can't be farmed from a single event). */
export const BOSS_REWARD = { xp: 80, coins: 40 };

export interface Question {
  prompt: string;
  /** read-aloud version (operators spoken as words) */
  say: string;
  answer: number;
  /** four shuffled choices including the answer */
  options: number[];
}

const rnd = (n: number) => Math.floor(Math.random() * n);
const pick = <T,>(a: T[]): T => a[rnd(a.length)];

/** Build a level-appropriate arithmetic question. */
export function generateQuestion(level: number): Question {
  let a: number;
  let b: number;
  let op: "+" | "−" | "×" | "÷";

  if (level <= 2) {
    // sums and differences within 20
    op = pick(["+", "−"] as const);
    if (op === "+") { a = 2 + rnd(13); b = 2 + rnd(13); }
    else { a = 6 + rnd(13); b = 1 + rnd(a - 1); }
  } else if (level <= 4) {
    // within 100, plus the times tables
    op = pick(["+", "−", "×"] as const);
    if (op === "+") { a = 10 + rnd(50); b = 5 + rnd(40); }
    else if (op === "−") { a = 20 + rnd(60); b = 1 + rnd(a - 1); }
    else { a = 2 + rnd(8); b = 2 + rnd(8); }
  } else {
    // bigger multiplication + exact division
    op = pick(["×", "÷"] as const);
    if (op === "×") { a = 6 + rnd(8); b = 3 + rnd(7); }
    else { b = 2 + rnd(8); const q = 2 + rnd(8); a = b * q; }
  }

  const answer = op === "+" ? a + b : op === "−" ? a - b : op === "×" ? a * b : a / b;
  const word = op === "+" ? "mais" : op === "−" ? "menos" : op === "×" ? "vezes" : "a dividir por";

  return {
    prompt: `${a} ${op} ${b} = ?`,
    say: `Quanto é ${a} ${word} ${b}?`,
    answer,
    options: buildOptions(answer),
  };
}

/** Four unique, non-negative choices including the answer, shuffled. */
function buildOptions(answer: number): number[] {
  const set = new Set<number>([answer]);
  const spread = Math.max(4, Math.round(Math.abs(answer) * 0.3) + 2);
  let guard = 0;
  while (set.size < 4 && guard++ < 50) {
    const delta = 1 + rnd(spread);
    const cand = answer + (rnd(2) ? delta : -delta);
    if (cand >= 0 && cand !== answer) set.add(cand);
  }
  // pad if a tiny answer couldn't find 3 distinct neighbours
  let extra = answer + 1;
  while (set.size < 4) set.add(extra++);
  const out = [...set];
  for (let i = out.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
