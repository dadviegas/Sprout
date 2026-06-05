/* The "conta armada" engine — it turns a sum like 27 + 15 into the column
 * algorithm a child writes on paper, broken into the exact little steps the
 * teacher narrates: "7 mais 5 é 12, escrevo o 2 e transporto 1…". It only
 * produces a grid of revealed-by-step characters + the narration; the React
 * widget draws that grid as SVG. Pure, no React, easy to unit-check by eye.
 *
 * pt-PT: the decimal separator is the comma (1,5 — not 1.5). Internally we
 * compute with a dot and only swap to a comma when a character lands on the
 * grid, so all the arithmetic stays simple. */

export type Op = "add" | "sub" | "mul" | "div";

export const OP_SYMBOL: Record<Op, string> = { add: "+", sub: "−", mul: "×", div: ":" };
export const OP_NAME: Record<Op, string> = { add: "adição", sub: "subtração", mul: "multiplicação", div: "divisão" };
export const OP_VERB: Record<Op, string> = { add: "mais", sub: "menos", mul: "vezes", div: "a dividir por" };

export type Tone = "ink" | "carry" | "result" | "muted" | "accent";

export interface SCell {
  c: number; // column (0 = leftmost)
  r: number; // row (0 = top)
  ch: string; // one glyph: a digit, a comma, or a minus sign
  step: number; // reveal at this step (0 = part of the initial setup)
  tone?: Tone;
  small?: boolean; // carries / borrows sit small above the digits
}

export interface SHLine {
  r: number; // drawn along the TOP edge of this row
  c0: number;
  c1: number; // inclusive column span
  step: number;
}

export interface SVBar {
  c: number; // drawn along the LEFT edge of this column (division divider)
  r0: number;
  r1: number; // inclusive row span
}

export interface SStep {
  say: string; // full read-aloud sentence
  caption: string; // short label shown next to the controls
  col?: number; // column to highlight while on this step
}

export interface Sheet {
  cols: number;
  rows: number;
  cells: SCell[];
  hlines: SHLine[];
  vbars: SVBar[];
  steps: SStep[]; // steps[0] describes the setup; the rest fill the grid
  answer: string; // canonical result (comma form) for checking the child's input
  ok: boolean; // false if the inputs can't be armed (e.g. a − b with a < b)
  error?: string;
}

/* ---------- number helpers (string + BigInt, never floats) ---------- */

/** Accept "12,5", "12.5", " 12 " → internal "12.5"; junk → "". */
export function normalize(v: string | number): string {
  const s = String(v).trim().replace(",", ".");
  const m = s.match(/^(\d+)(?:\.(\d+))?$/);
  if (!m) return "";
  return m[2] != null ? `${m[1]}.${m[2]}` : m[1];
}

function parts(s: string): { int: string; frac: string } {
  const [int, frac = ""] = s.split(".");
  return { int, frac };
}

const comma = (s: string) => s.replace(".", ",");

/** Drop trailing zeros after a comma (and a dangling comma): 3,50 → 3,5; 4,0 → 4. */
function tidy(s: string): string {
  if (!s.includes(",")) return s;
  return s.replace(/0+$/, "").replace(/,$/, "");
}

/* ---------- grid layout shared by +, −, × (single divisor) ---------- */

interface Layout {
  cols: number;
  leftPad: number;
  intEnd: number; // column of the units digit
  pointCol: number; // column of the comma (or -1)
  hasFrac: boolean;
  maxFrac: number;
}

function layout(values: string[], leftPad: number): Layout {
  let maxInt = 1;
  let maxFrac = 0;
  for (const v of values) {
    const p = parts(v);
    maxInt = Math.max(maxInt, p.int.length);
    maxFrac = Math.max(maxFrac, p.frac.length);
  }
  const hasFrac = maxFrac > 0;
  const intEnd = leftPad + maxInt - 1;
  const pointCol = hasFrac ? intEnd + 1 : -1;
  const cols = leftPad + maxInt + (hasFrac ? 1 + maxFrac : 0);
  return { cols, leftPad, intEnd, pointCol, hasFrac, maxFrac };
}

/** Place a value's glyphs on the grid: units at intEnd, comma + fraction to the
 *  right (padded with trailing zeros so the operands line up). */
function place(v: string, L: Layout): Map<number, string> {
  const p = parts(v);
  const m = new Map<number, string>();
  for (let i = 0; i < p.int.length; i++) {
    m.set(L.intEnd - (p.int.length - 1 - i), p.int[i]);
  }
  if (L.hasFrac) {
    m.set(L.pointCol, ",");
    const fr = p.frac.padEnd(L.maxFrac, "0");
    for (let i = 0; i < fr.length; i++) m.set(L.pointCol + 1 + i, fr[i]);
  }
  return m;
}

/** Digit columns from right to left (skipping the comma column). */
function digitColumns(L: Layout): number[] {
  const order: number[] = [];
  if (L.hasFrac) for (let c = L.pointCol + L.maxFrac; c >= L.pointCol + 1; c--) order.push(c);
  for (let c = L.intEnd; c >= L.leftPad; c--) order.push(c);
  return order;
}

const ROW_CARRY = 0;
const ROW_A = 1;
const ROW_B = 2;
const ROW_RESULT = 3;

/* ---------- addition ---------- */

function buildAdd(a: string, b: string): Sheet {
  const L = layout([a, b], 1);
  const A = place(a, L);
  const B = place(b, L);
  const cells: SCell[] = [];
  for (const [c, ch] of A) cells.push({ c, r: ROW_A, ch, step: 0 });
  for (const [c, ch] of B) cells.push({ c, r: ROW_B, ch, step: 0 });
  cells.push({ c: 0, r: ROW_B, ch: OP_SYMBOL.add, step: 0, tone: "accent" });

  const order = digitColumns(L);
  const steps: SStep[] = [
    { say: `Vamos somar ${comma(a)} mais ${comma(b)}. Alinho os algarismos pela direita e somo coluna a coluna.`, caption: "Arma a conta" },
  ];

  let carry = 0;
  let step = 1;
  for (let k = 0; k < order.length; k++) {
    const col = order[k];
    const da = Number(A.get(col) ?? 0);
    const db = Number(B.get(col) ?? 0);
    const sum = da + db + carry;
    const digit = sum % 10;
    const nextCarry = (sum - digit) / 10;
    cells.push({ c: col, r: ROW_RESULT, ch: String(digit), step, tone: "result" });

    const carryWord = carry ? ` mais ${carry} que transportei` : "";
    const keepWord = nextCarry ? ` Escrevo o ${digit} e transporto ${nextCarry}.` : ` Escrevo o ${digit}.`;
    steps.push({ say: `${da} mais ${db}${carryWord} é ${sum}.${keepWord}`, caption: `Coluna: ${da} + ${db}${carry ? " + " + carry : ""}`, col });

    if (nextCarry) {
      const left = order[k + 1] ?? col - 1;
      cells.push({ c: left, r: ROW_CARRY, ch: String(nextCarry), step, tone: "carry", small: true });
    }
    // The result comma appears together with the first whole-number digit.
    if (L.hasFrac && col === L.pointCol + 1) cells.push({ c: L.pointCol, r: ROW_RESULT, ch: ",", step, tone: "result" });
    carry = nextCarry;
    step++;
  }
  if (carry) {
    const col = (order[order.length - 1] ?? L.leftPad) - 1;
    cells.push({ c: col, r: ROW_RESULT, ch: String(carry), step, tone: "result" });
    steps.push({ say: `Sobrou ${carry} para transportar, escrevo-o à frente.`, caption: "Transporte final", col });
  }

  const answer = addSub(a, b, +1);
  steps.push({ say: `Está feito! ${comma(a)} mais ${comma(b)} é igual a ${answer}.`, caption: `Resultado: ${answer}` });
  return { cols: L.cols, rows: ROW_RESULT + 1, cells, hlines: [{ r: ROW_RESULT, c0: 0, c1: L.cols - 1, step: 0 }], vbars: [], steps, answer, ok: true };
}

/* ---------- subtraction ---------- */

function buildSub(a: string, b: string): Sheet {
  const L = layout([a, b], 1);
  const A = place(a, L);
  const B = place(b, L);
  // Work on the aligned digit columns; borrow from the next column on the left.
  const order = digitColumns(L); // right → left

  // Pre-pass: resolve every borrow first so each column has a clean working top
  // digit (e.g. 503 − 247 → tops become 13, 9, 4 — never a confusing "−1").
  const work: { col: number; orig: number; adj: number; db: number; digit: number; borrowed: boolean; lent: boolean }[] = [];
  let borrow = 0;
  for (const col of order) {
    const orig = Number(A.get(col) ?? 0);
    const db = Number(B.get(col) ?? 0);
    const lent = borrow === 1;
    let t = orig - borrow;
    let borrowed = false;
    if (t < db) {
      t += 10;
      borrowed = true;
    }
    work.push({ col, orig, adj: t, db, digit: t - db, borrowed, lent });
    borrow = borrowed ? 1 : 0;
  }

  const cells: SCell[] = [];
  for (const [c, ch] of A) cells.push({ c, r: ROW_A, ch, step: 0 });
  for (const [c, ch] of B) cells.push({ c, r: ROW_B, ch, step: 0 });
  cells.push({ c: 0, r: ROW_B, ch: OP_SYMBOL.sub, step: 0, tone: "accent" });

  const steps: SStep[] = [
    { say: `Vamos subtrair ${comma(b)} a ${comma(a)}. Alinho pela direita e tiro coluna a coluna, da direita para a esquerda.`, caption: "Arma a conta" },
  ];

  let step = 1;
  for (const w of work) {
    // Show the working top digit above the column whenever it changed.
    if (w.adj !== w.orig) cells.push({ c: w.col, r: ROW_CARRY, ch: String(w.adj), step, tone: "accent", small: true });
    cells.push({ c: w.col, r: ROW_RESULT, ch: String(w.digit), step, tone: "result" });

    let say: string;
    if (w.borrowed) {
      say = `O ${w.orig} não chega para tirar ${w.db}. Peço 10 emprestado à casa ao lado e fico com ${w.adj}. ${w.adj} menos ${w.db} é ${w.digit}.`;
    } else if (w.lent) {
      say = `Como emprestei 1 à casa da direita, o ${w.orig} fica ${w.adj}. ${w.adj} menos ${w.db} é ${w.digit}.`;
    } else {
      say = `${w.adj} menos ${w.db} é ${w.digit}.`;
    }
    steps.push({ say, caption: `Coluna: ${w.adj} − ${w.db}`, col: w.col });

    if (L.hasFrac && w.col === L.pointCol + 1) cells.push({ c: L.pointCol, r: ROW_RESULT, ch: ",", step, tone: "result" });
    step++;
  }

  const answer = addSub(a, b, -1);
  steps.push({ say: `Pronto! ${comma(a)} menos ${comma(b)} é igual a ${answer}.`, caption: `Resultado: ${answer}` });
  return { cols: L.cols, rows: ROW_RESULT + 1, cells, hlines: [{ r: ROW_RESULT, c0: 0, c1: L.cols - 1, step: 0 }], vbars: [], steps, answer, ok: true };
}

/* String add / subtract on decimals via BigInt at a common scale. */
function addSub(a: string, b: string, sign: 1 | -1): string {
  const pa = parts(a);
  const pb = parts(b);
  const scale = Math.max(pa.frac.length, pb.frac.length);
  const ai = BigInt(pa.int + pa.frac.padEnd(scale, "0"));
  const bi = BigInt(pb.int + pb.frac.padEnd(scale, "0"));
  let r = sign === 1 ? ai + bi : ai - bi;
  if (r < 0n) r = -r;
  return tidy(fromScaled(r, scale));
}

function fromScaled(v: bigint, scale: number): string {
  let s = v.toString();
  if (scale === 0) return s;
  s = s.padStart(scale + 1, "0");
  return comma(`${s.slice(0, -scale)}.${s.slice(-scale)}`);
}

/* ---------- multiplication ---------- */

function buildMul(a: string, b: string): Sheet {
  const pa = parts(a);
  const pb = parts(b);
  const ad = pa.int + pa.frac; // digits with the comma removed
  const bd = pb.int + pb.frac;
  const fracTotal = pa.frac.length + pb.frac.length;
  const aBig = BigInt(ad);

  // Significant multiplier digits, right to left, with their place (shift).
  const bDigits: { d: number; shift: number }[] = [];
  for (let i = 0; i < bd.length; i++) bDigits.push({ d: Number(bd[bd.length - 1 - i]), shift: i });
  const used = bDigits.filter((x) => x.d !== 0);

  const productBig = aBig * BigInt(bd);
  const productDigits = productBig.toString();
  const single = used.length <= 1;

  // Width: the widest of the product / operands, right aligned, +1 left margin.
  const width = Math.max(productDigits.length, ad.length, bd.length) + 1;
  const right = width - 1;

  // Multiplication has no carry row, so it starts at the top.
  const M_A = 0;
  const M_B = 1;
  const cells: SCell[] = [];
  const aDisp = comma(a);
  const bDisp = comma(b);
  // Operands shown WITH their commas (display rows), right aligned by last glyph.
  pushGlyphs(cells, aDisp, M_A, right, 0);
  pushGlyphs(cells, bDisp, M_B, right, 0);
  cells.push({ c: 0, r: M_B, ch: OP_SYMBOL.mul, step: 0, tone: "accent" });

  const steps: SStep[] = [
    {
      say: fracTotal
        ? `Vamos multiplicar ${aDisp} por ${bDisp}. Primeiro multiplico como se não houvesse vírgulas, e no fim conto as casas decimais.`
        : `Vamos multiplicar ${aDisp} por ${bDisp}. Multiplico ${ad} por cada algarismo de ${bd}.`,
      caption: "Arma a conta",
    },
  ];
  const hlines: SHLine[] = [{ r: M_B + 1, c0: 0, c1: width - 1, step: 0 }];

  let step = 1;
  let row = M_B + 1;

  if (single) {
    // One row only — the product itself, shown as the integer product digits.
    pushDigits(cells, productDigits, row, right, step, "result");
    steps.push({ say: `${ad} vezes ${bd} é ${productBig.toString()}.`, caption: `${ad} × ${bd}` });
    step++;
  } else {
    for (const { d, shift } of used) {
      const partial = aBig * BigInt(d) * BigInt(10) ** BigInt(shift);
      pushDigits(cells, partial.toString(), row, right, step, "ink");
      const placeWord = shift === 0 ? "" : ` (este algarismo vale ${10 ** shift} vezes mais, por isso desloco ${shift} casa${shift > 1 ? "s" : ""} para a esquerda)`;
      steps.push({ say: `Multiplico ${ad} por ${d}${placeWord}: dá ${partial.toString()}.`, caption: `${ad} × ${d}` });
      row++;
      step++;
    }
    hlines.push({ r: row, c0: 0, c1: width - 1, step: 0 });
    pushDigits(cells, productDigits, row, right, step, "result");
    steps.push({ say: `Somo as parcelas: o produto inteiro é ${productDigits}.`, caption: "Soma das parcelas" });
    step++;
  }

  // Place the comma in the result by counting the decimal places.
  let answer = productDigits;
  const resultRow = single ? M_B + 1 : row;
  if (fracTotal) {
    const padded = productDigits.padStart(fracTotal + 1, "0");
    answer = tidy(comma(`${padded.slice(0, -fracTotal)}.${padded.slice(-fracTotal)}`));
    // Re-stamp the result row WITH the comma so the final reveal shows it.
    stripRow(cells, resultRow);
    pushGlyphs(cells, answer, resultRow, right, step, "result");
    steps.push({
      say: `${aDisp} tem ${pa.frac.length} casa${pa.frac.length === 1 ? "" : "s"} e ${bDisp} tem ${pb.frac.length}: ao todo ${fracTotal}. Conto ${fracTotal} casa${fracTotal === 1 ? "" : "s"} da direita e ponho a vírgula: ${answer}.`,
      caption: "Coloco a vírgula",
    });
  } else {
    answer = tidy(productBig.toString());
  }
  steps.push({ say: `Está! ${aDisp} vezes ${bDisp} é igual a ${answer}.`, caption: `Resultado: ${answer}` });

  return { cols: width, rows: resultRow + 1, cells, hlines, vbars: [], steps, answer, ok: true };
}

/* Place a string (digits + optional comma) right-aligned ending at `right`. */
function pushGlyphs(cells: SCell[], s: string, r: number, right: number, step: number, tone?: Tone): void {
  for (let i = 0; i < s.length; i++) cells.push({ c: right - (s.length - 1 - i), r, ch: s[i], step, tone });
}
const pushDigits = pushGlyphs;

function stripRow(cells: SCell[], r: number): void {
  for (let i = cells.length - 1; i >= 0; i--) if (cells[i].r === r) cells.splice(i, 1);
}

/* ---------- division (Portuguese layout: divisor top-right, quociente below) ---------- */

const DIV_LPAD = 1; // a left column so a subtraction's "−" sign has somewhere to sit
const QUO_ROW = 1; // quotient row, just under the divisor's underline

function buildDiv(a: string, b: string): Sheet {
  // Make the divisor whole by shifting both numbers (move the comma right).
  const pb = parts(b);
  let dividend = a;
  let divisorStr = b;
  let shiftNote = "";
  if (pb.frac.length) {
    const k = pb.frac.length;
    divisorStr = (pb.int + pb.frac).replace(/^0+(?=\d)/, "");
    dividend = shiftComma(a, k);
    shiftNote = ` Como o divisor tem vírgula, multiplico os dois por ${10 ** k} para o tornar inteiro: fica ${comma(dividend)} a dividir por ${divisorStr}.`;
  }
  const D = BigInt(divisorStr);
  if (D === 0n) return fail("Não dá para dividir por zero.");

  const pd = parts(dividend);
  const intDigits = pd.int;
  const givenFrac = pd.frac;
  const pointAt = intDigits.length; // stream index where the fraction begins
  const givenLen = pointAt + givenFrac.length;
  const decimalDividend = givenFrac.length > 0;
  const maxDec = 3;
  const stream = (idx: number): bigint =>
    BigInt(idx < pointAt ? Number(intDigits[idx]) : idx < givenLen ? Number(givenFrac[idx - pointAt]) : 0);

  /* ----- pass 1: pure long division, collecting one block per quotient digit ----- */
  interface Block { endIndex: number; q: number; prod: string; rem: string; minuend: string }
  const blocks: Block[] = [];
  let cur = 0n;
  let started = false;
  let producedDec = 0;
  let intBlocks: Block[] | null = null;
  let intRem = "0";
  for (let i = 0; ; i++) {
    if (i === pointAt) {
      intBlocks = blocks.slice();
      intRem = cur.toString();
    }
    if (i >= givenLen) {
      if (cur === 0n) break; // divides evenly
      if (producedDec >= maxDec) break; // stop adding decimals
    }
    cur = cur * 10n + stream(i);
    if (cur >= D) started = true;
    if (started) {
      const q = Number(cur / D);
      blocks.push({ endIndex: i, q, prod: (BigInt(q) * D).toString(), rem: (cur % D).toString(), minuend: cur.toString() });
      if (i >= pointAt) producedDec++;
      cur = cur % D;
    }
    if (i > givenLen + maxDec + 2) break; // safety
  }
  if (intBlocks === null) {
    intBlocks = blocks.slice();
    intRem = cur.toString();
  }

  // Integer ÷ integer that doesn't come out even → keep it whole and show a resto
  // (the 3.º/4.º-ano way). A decimal answer only when it terminates or the
  // dividend itself has a comma.
  let decimalMode: boolean;
  let remainder: string;
  let usedBlocks: Block[];
  if (!decimalDividend && cur !== 0n) {
    usedBlocks = intBlocks;
    remainder = intRem;
    decimalMode = false;
  } else {
    usedBlocks = blocks;
    remainder = cur.toString();
    decimalMode = usedBlocks.some((bk) => bk.endIndex >= pointAt);
  }
  const exact = cur === 0n;
  const crossIdx = usedBlocks.findIndex((bk) => bk.endIndex >= pointAt); // first decimal quotient digit

  // Quotient string (comma inserted before the first decimal digit).
  const qDigits = usedBlocks.map((bk) => String(bk.q));
  let quoStr: string;
  if (decimalMode && crossIdx >= 0) {
    const intPart = crossIdx === 0 ? "0" : qDigits.slice(0, crossIdx).join("");
    quoStr = `${intPart},${qDigits.slice(crossIdx).join("")}`;
  } else {
    quoStr = qDigits.join("") || "0";
  }
  quoStr = quoStr.replace(/^0+(?=\d)/, "");

  /* ----- pass 2: lay the blocks out on the grid ----- */
  const fracDisplayLen = decimalMode ? usedBlocks[usedBlocks.length - 1].endIndex - pointAt + 1 : 0;
  const fracDisplay = decimalMode ? givenFrac.padEnd(fracDisplayLen, "0").slice(0, fracDisplayLen) : "";
  const displayStr = pd.int + (fracDisplayLen > 0 ? `,${fracDisplay}` : "");
  const displayCols = displayStr.length;
  const colOf = (idx: number) => DIV_LPAD + (fracDisplayLen > 0 && idx >= pointAt ? idx + 1 : idx);
  const barCol = DIV_LPAD + displayCols;

  const cells: SCell[] = [];
  pushGlyphs(cells, displayStr, 0, barCol - 1, 0); // dividend on row 0
  pushGlyphs(cells, divisorStr, 0, barCol + divisorStr.length, 0, "accent"); // divisor top-right
  const rightWidth = Math.max(divisorStr.length, quoStr.length);
  const hlines: SHLine[] = [{ r: QUO_ROW, c0: barCol + 1, c1: barCol + rightWidth, step: 0 }];

  // Where each quotient glyph lands on the right side.
  const commaPos = quoStr.indexOf(",");
  const quoCol = (d: number) => barCol + 1 + (commaPos >= 0 && d >= commaPos ? d + 1 : d);

  const steps: SStep[] = [
    { say: `Vamos dividir ${comma(a)} por ${comma(b)}.${shiftNote} Escrevo o dividendo à esquerda e o divisor à direita da barra.`, caption: "Arma a conta" },
  ];

  let row = 0; // row holding the current minuend (the dividend sits on row 0)
  let step = 1;
  for (let bIdx = 0; bIdx < usedBlocks.length; bIdx++) {
    const blk = usedBlocks[bIdx];
    const next = usedBlocks[bIdx + 1];
    // Quotient digit (and the comma, once, right before the first decimal one).
    if (decimalMode && bIdx === crossIdx && commaPos >= 0) {
      cells.push({ c: barCol + 1 + commaPos, r: QUO_ROW, ch: ",", step, tone: "result" });
    }
    cells.push({ c: quoCol(bIdx), r: QUO_ROW, ch: String(blk.q), step, tone: "result" });

    if (blk.q === 0) {
      cells.push({ c: colOf(next!.endIndex), r: row, ch: String(stream(next!.endIndex)), step, tone: "carry" });
      steps.push({ say: `${blk.minuend} ainda não dá para dividir por ${divisorStr}: ponho 0 no quociente e baixo o próximo algarismo.`, caption: "Quociente 0", col: colOf(blk.endIndex) });
      step++;
      continue;
    }
    // Product to subtract, ending under the last digit we brought down.
    const prodRow = row + 1;
    const endC = colOf(blk.endIndex);
    const minusCol = endC - blk.prod.length;
    cells.push({ c: minusCol, r: prodRow, ch: OP_SYMBOL.sub, step, tone: "accent" });
    pushGlyphs(cells, blk.prod, prodRow, endC, step, "muted");
    const remRow = prodRow + 1;
    hlines.push({ r: remRow, c0: minusCol, c1: endC, step });
    pushGlyphs(cells, blk.rem, remRow, endC, step, "ink");
    // Bring the next digit down beside the remainder.
    if (next) cells.push({ c: colOf(next.endIndex), r: remRow, ch: String(stream(next.endIndex)), step, tone: "carry" });
    steps.push({
      say: `${blk.minuend} a dividir por ${divisorStr} dá ${blk.q}. ${blk.q} vezes ${divisorStr} é ${blk.prod}; ${blk.minuend} menos ${blk.prod} é ${blk.rem}.${next ? " Baixo o próximo algarismo." : ""}`,
      caption: `${blk.minuend} : ${divisorStr} = ${blk.q}`,
      col: endC,
    });
    row = remRow;
    step++;
  }

  const answer = decimalMode || exact ? quoStr : `${quoStr} resto ${remainder}`;
  steps.push({
    say: decimalMode || exact
      ? `Está dividido! ${comma(a)} a dividir por ${comma(b)} é igual a ${quoStr}.`
      : `O quociente é ${quoStr} e sobra um resto de ${remainder}.`,
    caption: `Resultado: ${comma(answer)}`,
  });

  const rows = Math.max(row + 1, QUO_ROW + 1);
  const cols = barCol + 1 + rightWidth;
  return { cols, rows, cells, hlines, vbars: [{ c: barCol, r0: 0, r1: rows - 1 }], steps, answer, ok: true };
}

function shiftComma(s: string, k: number): string {
  const p = parts(s);
  let frac = p.frac;
  let int = p.int;
  for (let i = 0; i < k; i++) {
    if (frac.length) {
      int += frac[0];
      frac = frac.slice(1);
    } else {
      int += "0";
    }
  }
  int = int.replace(/^0+(?=\d)/, "");
  return frac.length ? `${int}.${frac}` : int;
}

function fail(error: string): Sheet {
  return { cols: 1, rows: 1, cells: [], hlines: [], vbars: [], steps: [{ say: error, caption: "Erro" }], answer: "", ok: false, error };
}

/* ---------- public entry ---------- */

export function buildSheet(op: Op, aIn: string | number, bIn: string | number): Sheet {
  const a = normalize(aIn);
  const b = normalize(bIn);
  if (!a || !b) return fail("Escreve dois números válidos.");
  if (op === "sub" && cmp(a, b) < 0) return fail("Para já, o primeiro número tem de ser maior (sem negativos).");
  if (op === "div" && normalize(bIn) === "0") return fail("Não dá para dividir por zero.");
  try {
    if (op === "add") return buildAdd(a, b);
    if (op === "sub") return buildSub(a, b);
    if (op === "mul") return buildMul(a, b);
    return buildDiv(a, b);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Não consegui armar esta conta.");
  }
}

/** Compare two decimal strings: -1, 0, 1. */
export function cmp(a: string, b: string): number {
  const pa = parts(a);
  const pb = parts(b);
  const scale = Math.max(pa.frac.length, pb.frac.length);
  const ai = BigInt(pa.int + pa.frac.padEnd(scale, "0"));
  const bi = BigInt(pb.int + pb.frac.padEnd(scale, "0"));
  return ai < bi ? -1 : ai > bi ? 1 : 0;
}

/** Does the child's typed answer match? Compares the number; for division it
 *  also accepts the "q resto r" form. */
export function answerMatches(input: string, expected: string): boolean {
  const norm = (s: string) => s.trim().replace(/\s+/g, " ").replace(",", ".").toLowerCase();
  const a = norm(input);
  const e = norm(expected);
  if (a === e) return true;
  // "12 resto 3" written as "12 r 3" or "12resto3"
  const m = e.match(/^(\d+) resto (\d+)$/);
  if (m) {
    const alt = a.replace(/\br\b|resto/g, " ").replace(/\s+/g, " ").trim();
    return alt === `${m[1]} ${m[2]}` || a === `${m[1]}.${m[2]}`;
  }
  // tolerate a value the child wrote without trailing zeros (3.5 vs 3.50)
  const num = (s: string) => (/^\d+(\.\d+)?$/.test(s) ? String(Number(s)) : s);
  return num(a) === num(e);
}
