/* Jogo do Dinheiro — the problem generator behind the DinheiroJogo game.
 *
 * It turns a difficulty level into a money WORD PROBLEM (story + read-aloud) plus
 * the two operands of the "conta armada" that solves it. The widget arms that
 * conta with the existing engine (single source of truth for the answer) and the
 * child solves it, then pays/forms the amount with coins.
 *
 * Pure data + logic, no React (mirrors conta-armada-engine.ts), so it's easy to
 * eyeball. The four levels map onto the four operations, drawing flavour from
 * three kid themes (a loja, o mealheiro, a feira) at every level:
 *   1 — somar  (juntar o que gastas / poupas)
 *   2 — subtrair (o troco)
 *   3 — multiplicar (comprar muitos iguais)
 *   4 — dividir (repartir por igual)
 *
 * pt-PT: amounts are kept in whole cents internally so the money is always exact
 * (no float drift) and the answers come out clean — euros for ×/÷, cents for −. */

import type { Op } from "./conta-armada-engine";
import { fmt, sayAmount } from "./Money";

export interface MoneyProblem {
  level: number;
  op: Op;
  /** operands for buildSheet (decimal-dot strings, e.g. "3.40"); the engine
   *  normalises and computes the canonical answer used to check the child. */
  a: string;
  b: string;
  /** the scene: an emoji, the written story, and its read-aloud (the child may
   *  not read yet, so `say` is full natural pt-PT, no symbols/emoji). */
  emoji: string;
  story: string;
  say: string;
  /** how the pay step is framed for this problem (troco vs. forming a total). */
  payVerb: string;
}

/* ---------- tiny runtime helpers (the game runs in the browser) ---------- */

const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const pick = <T>(xs: T[]): T => xs[Math.floor(Math.random() * xs.length)];

/** Two distinct picks from a list (for "compras X e Y"). */
function pick2<T>(xs: T[]): [T, T] {
  const a = ri(0, xs.length - 1);
  let b = ri(0, xs.length - 2);
  if (b >= a) b++;
  return [xs[a], xs[b]];
}

/** Whole cents → an operand string the engine accepts ("340" → "3.40", "500" → "5"). */
function operand(cents: number): string {
  const e = Math.floor(cents / 100);
  const c = cents % 100;
  return c === 0 ? String(e) : `${e}.${String(c).padStart(2, "0")}`;
}

const price = (cents: number) => fmt(cents / 100); // "3,40 €"
const spoken = (cents: number) => sayAmount(cents / 100); // "três euros e quarenta cêntimos"
/** Cents that make a "nice" price: whole, halves, or round 10c steps. */
const NICE_CENTS = [0, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90];

/* ---------- the catalogues (content) ---------- */

const SHOP = [
  { n: "um lápis", e: "✏️" },
  { n: "um caderno", e: "📒" },
  { n: "um livro", e: "📖" },
  { n: "uma régua", e: "📏" },
  { n: "uma mochila", e: "🎒" },
  { n: "um marcador", e: "🖊️" },
];
const TREATS = [
  { n: "um gelado", e: "🍦" },
  { n: "um sumo", e: "🧃" },
  { n: "um pão", e: "🥖" },
  { n: "um brinquedo", e: "🧸" },
  { n: "um bolo", e: "🧁" },
];
const MANY = [
  { n: "gelado", e: "🍦" },
  { n: "balão", e: "🎈" },
  { n: "bilhete", e: "🎟️" },
  { n: "pacote de cromos", e: "🃏" },
  { n: "bolo", e: "🧁" },
];

const PAY_FORM = "Agora forma essa quantia com moedas e notas! 💰";
const PAY_CHANGE = "Agora dá o troco com as moedas e notas certas! 💰";

/* ---------- level 1 — somar (juntar tudo) ---------- */

const LEVEL1: (() => MoneyProblem)[] = [
  () => {
    const [x, y] = pick2(SHOP);
    const a = ri(1, 9) * 100;
    const b = ri(1, 9) * 100;
    return {
      level: 1, op: "add", a: operand(a), b: operand(b), emoji: "🛒",
      story: `Na Loja do Sprout, ${x.n} ${x.e} custa ${price(a)} e ${y.n} ${y.e} custa ${price(b)}. Quanto gastas ao todo?`,
      say: `Na loja do Sprout, ${x.n} custa ${spoken(a)} e ${y.n} custa ${spoken(b)}. Quanto gastas ao todo?`,
      payVerb: "Agora junta esse dinheiro com moedas e notas! 💰",
    };
  },
  () => {
    const a = ri(2, 9) * 100;
    const b = ri(1, 8) * 100;
    return {
      level: 1, op: "add", a: operand(a), b: operand(b), emoji: "🐷",
      story: `Tens ${price(a)} no mealheiro 🐷. No domingo a avó dá-te mais ${price(b)}. Com quanto ficas?`,
      say: `Tens ${spoken(a)} no mealheiro. No domingo a avó dá-te mais ${spoken(b)}. Com quanto ficas?`,
      payVerb: "Mostra quanto tens agora, com moedas e notas! 💰",
    };
  },
  () => {
    const a = ri(1, 6) * 100;
    const b = ri(1, 6) * 100;
    return {
      level: 1, op: "add", a: operand(a), b: operand(b), emoji: "🎈",
      story: `Na feira compras um balão 🎈 por ${price(a)} e um chupa-chupa 🍭 por ${price(b)}. Quanto pagas ao todo?`,
      say: `Na feira compras um balão por ${spoken(a)} e um chupa-chupa por ${spoken(b)}. Quanto pagas ao todo?`,
      payVerb: PAY_FORM,
    };
  },
];

/* ---------- level 2 — subtrair (o troco) ---------- */

/** A price below `noteEuros` with kid-friendly cents, in whole cents. */
function priceUnder(noteEuros: number): number {
  return ri(1, noteEuros - 1) * 100 + pick(NICE_CENTS);
}

const LEVEL2: (() => MoneyProblem)[] = [
  () => {
    const note = pick([5, 10, 20]);
    const p = priceUnder(note);
    const item = pick(SHOP);
    return {
      level: 2, op: "sub", a: operand(note * 100), b: operand(p), emoji: "💶",
      story: `Compras ${item.n} ${item.e} por ${price(p)}. Pagas com uma nota de ${note} €. Qual é o troco?`,
      say: `Compras ${item.n} por ${spoken(p)}. Pagas com uma nota de ${note} euros. Qual é o troco?`,
      payVerb: PAY_CHANGE,
    };
  },
  () => {
    const have = ri(5, 20) * 100;
    const spend = ri(1, Math.floor(have / 100) - 1) * 100 + pick(NICE_CENTS);
    const item = pick(TREATS);
    return {
      level: 2, op: "sub", a: operand(have), b: operand(spend), emoji: "🐷",
      story: `Tens ${price(have)} 🐷 e compras ${item.n} ${item.e} por ${price(spend)}. Quanto te sobra?`,
      say: `Tens ${spoken(have)} e compras ${item.n} por ${spoken(spend)}. Quanto te sobra?`,
      payVerb: "Agora forma o que sobra, com moedas e notas! 💰",
    };
  },
  () => {
    const note = pick([5, 10, 20]);
    const p = priceUnder(note);
    return {
      level: 2, op: "sub", a: operand(note * 100), b: operand(p), emoji: "🎡",
      story: `O bilhete da feira 🎡 custa ${price(p)}. Dás uma nota de ${note} €. Qual é o troco?`,
      say: `O bilhete da feira custa ${spoken(p)}. Dás uma nota de ${note} euros. Qual é o troco?`,
      payVerb: PAY_CHANGE,
    };
  },
];

/* ---------- level 3 — multiplicar (comprar muitos iguais) ---------- */

const UNIT_PRICES = [100, 150, 200, 250, 300]; // 1,00 € … 3,00 €

const LEVEL3: (() => MoneyProblem)[] = [
  () => {
    const count = ri(2, 5);
    const p = pick(UNIT_PRICES);
    return {
      level: 3, op: "mul", a: operand(p), b: String(count), emoji: "🍦",
      story: `Cada gelado 🍦 custa ${price(p)}. Compras ${count}. Quanto custa ao todo?`,
      say: `Cada gelado custa ${spoken(p)}. Compras ${count} gelados. Quanto custa ao todo?`,
      payVerb: "Agora forma o total com moedas e notas! 💰",
    };
  },
  () => {
    const count = ri(2, 4);
    const p = pick(UNIT_PRICES);
    const item = pick(SHOP);
    return {
      level: 3, op: "mul", a: operand(p), b: String(count), emoji: item.e,
      story: `Cada ${item.n.replace(/^um |^uma /, "")} ${item.e} custa ${price(p)}. Levas ${count}. Quanto pagas?`,
      say: `Cada ${item.n.replace(/^um |^uma /, "")} custa ${spoken(p)}. Levas ${count}. Quanto pagas?`,
      payVerb: PAY_FORM,
    };
  },
  () => {
    const count = ri(2, 5);
    const p = pick(UNIT_PRICES);
    const item = pick(MANY);
    return {
      level: 3, op: "mul", a: operand(p), b: String(count), emoji: item.e,
      story: `Cada ${item.n} ${item.e} custa ${price(p)}. Compras ${count}. Quanto custa tudo junto?`,
      say: `Cada ${item.n} custa ${spoken(p)}. Compras ${count}. Quanto custa tudo junto?`,
      payVerb: PAY_FORM,
    };
  },
];

/* ---------- level 4 — dividir (repartir por igual) ---------- */

const LEVEL4: (() => MoneyProblem)[] = [
  () => {
    const friends = ri(2, 5);
    const each = ri(1, 5);
    const total = each * friends * 100;
    return {
      level: 4, op: "div", a: operand(total), b: String(friends), emoji: "🍕",
      story: `A conta da pizza 🍕 é ${price(total)}. São ${friends} amigos e dividem por igual. Quanto paga cada um?`,
      say: `A conta da pizza é ${spoken(total)}. São ${friends} amigos e dividem por igual. Quanto paga cada um?`,
      payVerb: "Agora forma o que cada um paga, com moedas e notas! 💰",
    };
  },
  () => {
    const friends = ri(2, 4);
    const each = ri(2, 6);
    const total = each * friends * 100;
    return {
      level: 4, op: "div", a: operand(total), b: String(friends), emoji: "🎁",
      story: `Tens ${price(total)} 🐷 e queres dar igual a ${friends} primos 🎁. Quanto dás a cada um?`,
      say: `Tens ${spoken(total)} e queres dar igual a ${friends} primos. Quanto dás a cada um?`,
      payVerb: "Agora forma o que cada um recebe, com moedas e notas! 💰",
    };
  },
  () => {
    const friends = ri(2, 5);
    const each = ri(1, 4);
    const total = each * friends * 100;
    return {
      level: 4, op: "div", a: operand(total), b: String(friends), emoji: "🎟️",
      story: `Ganhaste ${price(total)} na rifa da feira 🎟️ e divides por ${friends} irmãos. Quanto recebe cada um?`,
      say: `Ganhaste ${spoken(total)} na rifa da feira e divides por ${friends} irmãos. Quanto recebe cada um?`,
      payVerb: "Agora forma o que cada um recebe, com moedas e notas! 💰",
    };
  },
];

const LEVELS: Record<number, (() => MoneyProblem)[]> = { 1: LEVEL1, 2: LEVEL2, 3: LEVEL3, 4: LEVEL4 };

/** Level metadata for the level picker (title + the operation it drills). */
export const MONEY_LEVELS: { n: number; op: Op; title: string }[] = [
  { n: 1, op: "add", title: "Juntar tudo" },
  { n: 2, op: "sub", title: "Dar o troco" },
  { n: 3, op: "mul", title: "Comprar muitos" },
  { n: 4, op: "div", title: "Repartir por igual" },
];

export const clampLevel = (lv: number) => Math.min(4, Math.max(1, Math.round(lv) || 1));

/** A fresh random money problem for a level (1–4). */
export function makeMoneyProblem(level: number): MoneyProblem {
  return pick(LEVELS[clampLevel(level)])();
}
