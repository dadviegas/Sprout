/* Dominó de Pontas (All Fives / Muggins) — the shared, pure game logic, used by
 * both the 2D board (Domino.tsx) and the Babylon "2D" board (domino3d/). Nothing
 * here touches React or the DOM, so the rules read the same for both renderers —
 * the same split chess uses between chess.ts and its two boards.
 *
 * Rules modelled (double-six, you vs. the computer):
 *  - 7 tiles each, the rest in the "monte" (boneyard).
 *  - The highest double opens the round (then the highest tile if nobody holds a
 *    double); that opening tile is placed automatically.
 *  - On your turn, match a tile to either open end. Can't? Draw until you can, or
 *    pass when the monte is empty.
 *  - All-fives scoring: after a play, if the two open ends sum to a multiple of 5
 *    you score that sum on the spot. A double sitting at an end shows both halves,
 *    so it counts double (an open double-5 end counts as 10).
 *  - Round end: empty your hand (or hold the fewest pips when it blocks) to win,
 *    and score the pips left in the opponent's hand.
 *
 * Simplified on purpose for a young child vs. one computer: a single straight line
 * with two ends (no spinner/branching) and no "Muggins" stealing — points you earn
 * are always credited to you. */

export type Tile = [number, number];
export type Side = "player" | "cpu";

export const NUM = ["zero", "um", "dois", "três", "quatro", "cinco", "seis"];
export const tileName = (t: Tile) => `${NUM[t[0]]} e ${NUM[t[1]]}`;
export const pips = (hand: Tile[]) => hand.reduce((s, [a, b]) => s + a + b, 0);

/* Pip layout on a 3×3 grid (cells 0..8, row-major), dice-style. */
export const PIP_MAP: Record<number, number[]> = {
  0: [],
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

/* ---------------- rules ---------------- */

export const ends = (chain: Tile[]): [number, number] => [chain[0][0], chain[chain.length - 1][1]];

export function canPlay(t: Tile, chain: Tile[]): boolean {
  if (!chain.length) return true;
  const [l, r] = ends(chain);
  return t[0] === l || t[1] === l || t[0] === r || t[1] === r;
}

// Place a tile, orienting it so the touching halves match. Tries the right end
// first, then the left; returns the new chain, or null if it doesn't fit.
export function place(chain: Tile[], t: Tile): Tile[] | null {
  if (!chain.length) return [t];
  const [l, r] = ends(chain);
  if (t[0] === r) return [...chain, t];
  if (t[1] === r) return [...chain, [t[1], t[0]]];
  if (t[1] === l) return [t, ...chain];
  if (t[0] === l) return [[t[1], t[0]], ...chain];
  return null;
}

// Can this tile go on a specific open end? (used while dragging to highlight ends)
export function canPlaySide(t: Tile, chain: Tile[], side: "left" | "right"): boolean {
  if (!chain.length) return true;
  const v = side === "left" ? chain[0][0] : chain[chain.length - 1][1];
  return t[0] === v || t[1] === v;
}

// Place on a chosen end (drag-and-drop), oriented so the touching halves match.
export function placeAt(chain: Tile[], t: Tile, side: "left" | "right"): Tile[] | null {
  if (!chain.length) return [t];
  if (side === "left") {
    const l = chain[0][0];
    if (t[1] === l) return [t, ...chain];
    if (t[0] === l) return [[t[1], t[0]], ...chain];
    return null;
  }
  const r = chain[chain.length - 1][1];
  if (t[0] === r) return [...chain, t];
  if (t[1] === r) return [...chain, [t[1], t[0]]];
  return null;
}

// All-fives count: the sum of the two open ends, with a double end counting both
// halves. A lone opening tile shows both of its halves, so it counts a + b.
export function openCount(chain: Tile[]): number {
  if (!chain.length) return 0;
  if (chain.length === 1) return chain[0][0] + chain[0][1];
  const lt = chain[0];
  const rt = chain[chain.length - 1];
  const lv = lt[0] === lt[1] ? lt[0] * 2 : lt[0];
  const rv = rt[0] === rt[1] ? rt[1] * 2 : rt[1];
  return lv + rv;
}
export const fivesPoints = (chain: Tile[]) => {
  const c = openCount(chain);
  return c > 0 && c % 5 === 0 ? c : 0;
};

/* ---------------- the computer ---------------- */

export type Strat = "random" | "greedy" | "smart";

// random: any playable; greedy: shed the most pips; smart: greedy, but prefers a
// move that scores a multiple of 5, then offloads doubles (hardest to place).
export function cpuPick(hand: Tile[], chain: Tile[], strat: Strat): number {
  const playable = hand.map((t, i) => ({ t, i })).filter(({ t }) => canPlay(t, chain));
  if (!playable.length) return -1;
  if (strat === "random") return playable[(Math.random() * playable.length) | 0].i;
  const scoreOf = (t: Tile) => {
    const after = place(chain, t)!;
    const fives = strat === "smart" ? fivesPoints(after) : 0;
    return fives * 10 + (t[0] + t[1]) + (strat === "smart" && t[0] === t[1] ? 1 : 0);
  };
  let best = playable[0];
  for (const p of playable) if (scoreOf(p.t) > scoreOf(best.t)) best = p;
  return best.i;
}

/* ---------------- levels ---------------- */

export const LEVELS: { id: string; label: string; strat: Strat; mult: number }[] = [
  { id: "facil", label: "Fácil", strat: "random", mult: 1 },
  { id: "medio", label: "Médio", strat: "greedy", mult: 2 },
  { id: "dificil", label: "Difícil", strat: "smart", mult: 3 },
];

/* ---------------- a round ---------------- */

export interface Over {
  winner: Side | "draw";
  points: number;
}
export interface Game {
  hand: Tile[];
  cpu: Tile[];
  pile: Tile[];
  chain: Tile[];
  turn: Side;
  passes: number;
  over: Over | null;
  opener: Side;
}

const isDouble = (t: Tile) => t[0] === t[1];

// Who opens: the holder of the highest double, else whoever holds the single
// highest-pip tile.
function chooseOpener(hand: Tile[], cpu: Tile[]): Side {
  for (let n = 6; n >= 0; n--) {
    if (hand.some((t) => t[0] === n && t[1] === n)) return "player";
    if (cpu.some((t) => t[0] === n && t[1] === n)) return "cpu";
  }
  const hi = (h: Tile[]) => Math.max(...h.map((t) => t[0] + t[1]));
  return hi(hand) >= hi(cpu) ? "player" : "cpu";
}
// The mandatory opening tile from a hand: highest double, else highest-pip tile.
function openingTile(h: Tile[]): Tile {
  for (let n = 6; n >= 0; n--) {
    const d = h.find((t) => isDouble(t) && t[0] === n);
    if (d) return d;
  }
  return h.reduce((m, t) => (t[0] + t[1] > m[0] + m[1] ? t : m), h[0]);
}

export function deal(): Game {
  const all: Tile[] = [];
  for (let a = 0; a <= 6; a++) for (let b = a; b <= 6; b++) all.push([a, b]);
  for (let i = all.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [all[i], all[j]] = [all[j], all[i]];
  }
  const hand = all.slice(0, 7);
  const cpu = all.slice(7, 14);
  const pile = all.slice(14);
  // The highest double opens; place that tile automatically and pass the turn.
  const opener = chooseOpener(hand, cpu);
  const openHand = opener === "player" ? hand : cpu;
  const openTile = openingTile(openHand);
  openHand.splice(
    openHand.findIndex((t) => t[0] === openTile[0] && t[1] === openTile[1]),
    1,
  );
  return {
    hand,
    cpu,
    pile,
    chain: [openTile],
    turn: opener === "player" ? "cpu" : "player",
    passes: 0,
    over: null,
    opener,
  };
}

/* ---------------- daily best, kept in storage ---------------- */

import { store } from "../storage";

export const SCORES_KEY = "sprout.jogos.domino.v1";
export interface DayScore {
  date: string;
  best: number;
}

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const pretty = (date: string) => {
  const [, m, d] = date.split("-");
  return `${d}/${m}`;
};

export function isYesterday(date: string): boolean {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return date === y;
}

export const loadScores = () => store.getSync<DayScore[]>(SCORES_KEY, []);

// Keep the *highest* total reached on each day. Returns the updated, date-sorted list.
export function recordScore(total: number): DayScore[] {
  const today = todayStr();
  const all = loadScores().filter((d) => d.date !== today);
  const prev = loadScores().find((d) => d.date === today)?.best ?? 0;
  all.push({ date: today, best: Math.max(prev, total) });
  all.sort((a, b) => (a.date < b.date ? -1 : 1));
  store.set(SCORES_KEY, all);
  return all;
}

/* ---------------- result wording (shared) ---------------- */

export function overTitle(over: Over): string {
  if (over.winner === "draw") return "Empate! Ninguém marcou.";
  if (over.winner === "player") return `Ganhaste a ronda! +${over.points} pontos 🎉`;
  return "O computador ganhou esta ronda.";
}

export function buildOverSay(over: Over, score: number, record: DayScore | null, prevDay: DayScore | undefined, today: string): string {
  const parts = [overTitle(over)];
  if (over.winner === "player") {
    parts.push(`Já tens ${score} pontos.`);
    if (record && record.date === today && score >= record.best && (!prevDay || score > prevDay.best)) {
      parts.push(prevDay ? `Bateste o dia ${pretty(prevDay.date)}!` : "É o teu melhor de sempre!");
    } else if (prevDay && score > prevDay.best) {
      parts.push(`Já passaste os ${prevDay.best} de ${isYesterday(prevDay.date) ? "ontem" : pretty(prevDay.date)}!`);
    } else if (prevDay) {
      parts.push(`Faltam ${prevDay.best - score + 1} para bateres o dia ${pretty(prevDay.date)}.`);
    }
  }
  return parts.join(" ");
}
