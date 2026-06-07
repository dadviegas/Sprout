/* Jogo do Dinheiro — the problem generator behind the DinheiroJogo game.
 *
 * It turns a difficulty level into a money WORD PROBLEM (story + read-aloud) plus
 * the two operands of the "conta armada" that solves it. The widget arms that
 * conta with the existing engine (single source of truth for the answer) and the
 * child solves it, then pays/forms the amount with coins.
 *
 * Pure data + logic, no React (mirrors conta-armada-engine.ts), so it's easy to
 * eyeball. The four levels map onto the four operations, drawing flavour from
 * kid themes (a loja, o mealheiro, a feira, a limpeza da casa) at every level:
 *   1 — somar  (juntar o que gastas / poupas)
 *   2 — subtrair (o troco)
 *   3 — multiplicar (comprar muitos iguais)
 *   4 — dividir (repartir por igual)
 *
 * Each level also has a DIFFICULTY (0–2) that the widget ramps up as the child
 * earns stars: 0 = whole euros (3 + 1), 1 = cents with carrying/borrowing
 * (3,45 + 2,80), 2 = two-digit amounts (12,40 + 8,75). Same operation, bigger
 * conta — a gentle start that grows into a real challenge.
 *
 * pt-PT: amounts are kept in whole cents internally so the money is always exact
 * (no float drift). Prices are multiples of 5 cents so the pay step stays short,
 * and every quotient is >= 10 cents (the conta engine drops the leading décimas
 * zero on a quotient below 0,10 — e.g. 0,15 : 3 — so we keep parts at >= 0,10). */

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

type Cents = number;
const E = 100; // one euro in cents

/** Whole cents → an operand string the engine accepts ("340" → "3.40", "500" → "5"). */
function operand(cents: Cents): string {
  const e = Math.floor(cents / 100);
  const c = cents % 100;
  return c === 0 ? String(e) : `${e}.${String(c).padStart(2, "0")}`;
}

/** Like `operand` but ALWAYS keeps the two cents columns ("300" → "3.00"). The
 *  division dividend needs the comma so the quotient comes out as money:
 *  3,00 : 4 = 0,75, not the "0 resto 3" the engine gives for a bare "3". */
function operandMoney(cents: Cents): string {
  return `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
}

const price = (cents: Cents) => fmt(cents / 100); // "3,40 €"
const spoken = (cents: Cents) => sayAmount(cents / 100); // "três euros e quarenta cêntimos"

/* ---------- difficulty-scaled number recipes (whole cents) ----------
 * d = 0 easy (whole euros) · 1 medium (cents, carries) · 2 hard (two digits). */

/** Whole euros in [lo, hi]. */
const euros = (lo: number, hi: number): Cents => ri(lo, hi) * E;
/** Euros in [lo, hi] plus non-zero "nice" cents (5..95, step 5), e.g. 3,45 €. */
const euroCents = (lo: number, hi: number): Cents => ri(lo, hi) * E + ri(1, 19) * 5;

/** [a, b] for an addition. */
function addPair(d: number): [Cents, Cents] {
  if (d <= 0) return [euros(1, 9), euros(1, 9)];
  if (d === 1) return [euroCents(1, 8), euroCents(1, 8)];
  return [euroCents(6, 19), euroCents(3, 12)];
}

/** [paid, price] for a subtraction (paid > price). `paid` is a single banknote
 *  so the story can name it and the troco stays clean; at d >= 1 the price has
 *  cents, so the units column always borrows. */
function subPair(d: number): [Cents, Cents] {
  if (d <= 0) { const n = pick([5, 10, 20]); return [n * E, euros(1, n - 1)]; }
  if (d === 1) { const n = pick([10, 20]); return [n * E, euroCents(1, n - 2)]; }
  const n = pick([20, 50]); return [n * E, euroCents(Math.floor(n / 2), n - 2)];
}

/** [unit, count] for a multiplication (count is a single digit → the schoolbook
 *  single-digit multiply, with carries at d >= 1). */
function mulPair(d: number): [Cents, number] {
  if (d <= 0) return [euros(1, 3), ri(2, 4)];
  if (d === 1) return [ri(11, 59) * 5, ri(2, 5)]; // 0,55 € … 2,95 €
  return [ri(21, 79) * 5, ri(3, 6)]; //              1,05 € … 3,95 €
}

/** [total, friends, each] for a division — total = each × friends, so it divides
 *  evenly. `each` is the answer/pay amount; kept >= 10 cents (see header). */
function divTriple(d: number): [Cents, number, Cents] {
  if (d <= 0) { const f = ri(2, 4); const each = euros(1, 3); return [each * f, f, each]; }
  if (d === 1) { const f = ri(2, 5); const each = ri(2, 19) * 5; return [each * f, f, each]; } // 0,10 € … 0,95 €
  const f = ri(2, 5); const each = euros(1, 3) + ri(1, 19) * 5; return [each * f, f, each]; //   1,05 € … 3,95 €
}

/* ---------- the catalogues (content) ---------- */

const SNACKS = [
  { n: "um Kit Kat", e: "🍫" },
  { n: "um pacote de bolachas", e: "🍪" },
  { n: "um sumo", e: "🧃" },
  { n: "um gelado", e: "🍦" },
  { n: "um chocolate", e: "🍫" },
  { n: "um iogurte", e: "🥛" },
  { n: "um pão", e: "🥖" },
  { n: "um bolo", e: "🧁" },
];
const SCHOOL = [
  { n: "um lápis", e: "✏️" },
  { n: "um caderno", e: "📒" },
  { n: "um livro", e: "📖" },
  { n: "uma régua", e: "📏" },
  { n: "uma mochila", e: "🎒" },
  { n: "um marcador", e: "🖊️" },
];
/** Produtos de limpeza da casa — singular units so "cada X" / "um X" read right. */
const CLEANING = [
  { n: "um detergente da loiça", e: "🧴" },
  { n: "uma lixívia", e: "🧴" },
  { n: "uma esponja", e: "🧽" },
  { n: "um rolo de cozinha", e: "🧻" },
  { n: "um sabão", e: "🧼" },
  { n: "um saco do lixo", e: "🗑️" },
  { n: "um spray de limpeza", e: "🧴" },
];
/** Things you buy several of (no article — used after "cada"/"compras N"). */
const MANY = [
  { n: "gelado", e: "🍦" },
  { n: "Kit Kat", e: "🍫" },
  { n: "sumo", e: "🧃" },
  { n: "balão", e: "🎈" },
  { n: "bilhete", e: "🎟️" },
  { n: "pacote de cromos", e: "🃏" },
  { n: "pacote de bolachas", e: "🍪" },
  { n: "esponja", e: "🧽" },
];

const STORE = [...SNACKS, ...SCHOOL];
/** Drop a leading "um "/"uma " so an item reads after "Cada …". */
const bare = (n: string) => n.replace(/^um |^uma /, "");
/** Capitalise the first letter (for items that open a sentence). */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const PAY_FORM = "Agora forma essa quantia com moedas e notas! 💰";
const PAY_CHANGE = "Agora dá o troco com as moedas e notas certas! 💰";

/* ---------- level 1 — somar (juntar tudo) ---------- */

const LEVEL1: ((d: number) => MoneyProblem)[] = [
  (d) => {
    const [a, b] = addPair(d);
    const [x, y] = pick2(STORE);
    return {
      level: 1, op: "add", a: operand(a), b: operand(b), emoji: "🛒",
      story: `Na Loja do Sprout, ${x.n} ${x.e} custa ${price(a)} e ${y.n} ${y.e} custa ${price(b)}. Quanto gastas ao todo?`,
      say: `Na loja do Sprout, ${x.n} custa ${spoken(a)} e ${y.n} custa ${spoken(b)}. Quanto gastas ao todo?`,
      payVerb: "Agora junta esse dinheiro com moedas e notas! 💰",
    };
  },
  (d) => {
    const [a, b] = addPair(d);
    return {
      level: 1, op: "add", a: operand(a), b: operand(b), emoji: "🐷",
      story: `Tens ${price(a)} no mealheiro 🐷. No domingo a avó dá-te mais ${price(b)}. Com quanto ficas?`,
      say: `Tens ${spoken(a)} no mealheiro. No domingo a avó dá-te mais ${spoken(b)}. Com quanto ficas?`,
      payVerb: "Mostra quanto tens agora, com moedas e notas! 💰",
    };
  },
  (d) => {
    const [a, b] = addPair(d);
    const [x, y] = pick2(CLEANING);
    return {
      level: 1, op: "add", a: operand(a), b: operand(b), emoji: "🧽",
      story: `No supermercado, a mãe leva ${x.n} ${x.e} por ${price(a)} e ${y.n} ${y.e} por ${price(b)}. Quanto custa a limpeza da casa?`,
      say: `No supermercado, a mãe leva ${x.n} por ${spoken(a)} e ${y.n} por ${spoken(b)}. Quanto custa a limpeza da casa?`,
      payVerb: PAY_FORM,
    };
  },
];

/* ---------- level 2 — subtrair (o troco) ---------- */

const LEVEL2: ((d: number) => MoneyProblem)[] = [
  (d) => {
    const [paid, p] = subPair(d);
    const item = pick(STORE);
    return {
      level: 2, op: "sub", a: operand(paid), b: operand(p), emoji: "💶",
      story: `Compras ${item.n} ${item.e} por ${price(p)}. Pagas com uma nota de ${paid / 100} €. Qual é o troco?`,
      say: `Compras ${item.n} por ${spoken(p)}. Pagas com uma nota de ${paid / 100} euros. Qual é o troco?`,
      payVerb: PAY_CHANGE,
    };
  },
  (d) => {
    const [paid, p] = subPair(d);
    const item = pick(SNACKS);
    return {
      level: 2, op: "sub", a: operand(paid), b: operand(p), emoji: "🐷",
      story: `Tens ${price(paid)} 🐷 e compras ${item.n} ${item.e} por ${price(p)}. Quanto te sobra?`,
      say: `Tens ${spoken(paid)} e compras ${item.n} por ${spoken(p)}. Quanto te sobra?`,
      payVerb: "Agora forma o que sobra, com moedas e notas! 💰",
    };
  },
  (d) => {
    const [paid, p] = subPair(d);
    const item = pick(CLEANING);
    return {
      level: 2, op: "sub", a: operand(paid), b: operand(p), emoji: "🧴",
      story: `${cap(item.n)} ${item.e} custa ${price(p)}. Pagas com uma nota de ${paid / 100} €. Qual é o troco?`,
      say: `${cap(item.n)} custa ${spoken(p)}. Pagas com uma nota de ${paid / 100} euros. Qual é o troco?`,
      payVerb: PAY_CHANGE,
    };
  },
];

/* ---------- level 3 — multiplicar (comprar muitos iguais) ---------- */

const LEVEL3: ((d: number) => MoneyProblem)[] = [
  (d) => {
    const [unit, count] = mulPair(d);
    const item = pick(MANY);
    return {
      level: 3, op: "mul", a: operand(unit), b: String(count), emoji: item.e,
      story: `Cada ${item.n} ${item.e} custa ${price(unit)}. Compras ${count}. Quanto custa tudo junto?`,
      say: `Cada ${item.n} custa ${spoken(unit)}. Compras ${count}. Quanto custa tudo junto?`,
      payVerb: "Agora forma o total com moedas e notas! 💰",
    };
  },
  (d) => {
    const [unit, count] = mulPair(d);
    const item = pick(STORE);
    return {
      level: 3, op: "mul", a: operand(unit), b: String(count), emoji: item.e,
      story: `Cada ${bare(item.n)} ${item.e} custa ${price(unit)}. Levas ${count}. Quanto pagas?`,
      say: `Cada ${bare(item.n)} custa ${spoken(unit)}. Levas ${count}. Quanto pagas?`,
      payVerb: PAY_FORM,
    };
  },
  (d) => {
    const [unit, count] = mulPair(d);
    const item = pick(CLEANING);
    return {
      level: 3, op: "mul", a: operand(unit), b: String(count), emoji: item.e,
      story: `Para a limpeza, cada ${bare(item.n)} ${item.e} custa ${price(unit)}. Compras ${count}. Quanto gastas ao todo?`,
      say: `Para a limpeza, cada ${bare(item.n)} custa ${spoken(unit)}. Compras ${count}. Quanto gastas ao todo?`,
      payVerb: PAY_FORM,
    };
  },
];

/* ---------- level 4 — dividir (repartir por igual) ---------- */

/** Dividend operand: keep the cents columns whenever the answer (each) has cents,
 *  so the quotient is read as money and not as a whole-number "resto". */
const divDividend = (total: Cents, each: Cents) => (each % 100 === 0 ? operand(total) : operandMoney(total));

const LEVEL4: ((d: number) => MoneyProblem)[] = [
  (d) => {
    const [total, friends, each] = divTriple(d);
    return {
      level: 4, op: "div", a: divDividend(total, each), b: String(friends), emoji: "🍕",
      story: `A conta da pizza 🍕 é ${price(total)}. São ${friends} amigos e dividem por igual. Quanto paga cada um?`,
      say: `A conta da pizza é ${spoken(total)}. São ${friends} amigos e dividem por igual. Quanto paga cada um?`,
      payVerb: "Agora forma o que cada um paga, com moedas e notas! 💰",
    };
  },
  (d) => {
    const [total, friends, each] = divTriple(d);
    return {
      level: 4, op: "div", a: divDividend(total, each), b: String(friends), emoji: "🎁",
      story: `Tens ${price(total)} 🐷 e queres dar igual a ${friends} primos 🎁. Quanto dás a cada um?`,
      say: `Tens ${spoken(total)} e queres dar igual a ${friends} primos. Quanto dás a cada um?`,
      payVerb: "Agora forma o que cada um recebe, com moedas e notas! 💰",
    };
  },
  (d) => {
    const [total, friends, each] = divTriple(d);
    return {
      level: 4, op: "div", a: divDividend(total, each), b: String(friends), emoji: "🎟️",
      story: `Ganhaste ${price(total)} na rifa da feira 🎟️ e divides por ${friends} irmãos. Quanto recebe cada um?`,
      say: `Ganhaste ${spoken(total)} na rifa da feira e divides por ${friends} irmãos. Quanto recebe cada um?`,
      payVerb: "Agora forma o que cada um recebe, com moedas e notas! 💰",
    };
  },
];

const LEVELS: Record<number, ((d: number) => MoneyProblem)[]> = { 1: LEVEL1, 2: LEVEL2, 3: LEVEL3, 4: LEVEL4 };

/** Level metadata for the level picker (title + the operation it drills). */
export const MONEY_LEVELS: { n: number; op: Op; title: string }[] = [
  { n: 1, op: "add", title: "Juntar tudo" },
  { n: 2, op: "sub", title: "Dar o troco" },
  { n: 3, op: "mul", title: "Comprar muitos" },
  { n: 4, op: "div", title: "Repartir por igual" },
];

export const clampLevel = (lv: number) => Math.min(4, Math.max(1, Math.round(lv) || 1));
/** Difficulty tiers run 0–2; the widget feeds in how many stars were earned. */
export const clampDifficulty = (d: number) => Math.min(2, Math.max(0, Math.round(d) || 0));

/** A fresh random money problem for a level (1–4) at a difficulty (0–2). */
export function makeMoneyProblem(level: number, difficulty = 0): MoneyProblem {
  return pick(LEVELS[clampLevel(level)])(clampDifficulty(difficulty));
}
