/* Chess rules engine — the shared, UI-free core of the chess games. Holds the
 * types, legal-move generation (incl. roque/castling and pawn promotion),
 * check / checkmate / draw detection, and the little negamax computer player.
 * Both the 2D board (Xadrez.tsx) and the 3D board (xadrez3d/) import from here so
 * the rules live in ONE place.
 *
 * Simplifications kept on purpose (KISS, fine for a kids' game): no en passant;
 * pawns auto-promote to a queen. Castling and everything else is real chess. */

export type Color = "w" | "b";
export type Grid = (string | null)[][];

export interface Move {
  fr: number;
  fc: number;
  tr: number;
  tc: number;
  t: string;
  promote?: boolean;
  castle?: "K" | "Q"; // king-side / queen-side
}
// Unit screen direction of a move (x = columns, y = rows; y grows downward) plus a
// rotation sign, so one keyframe set serves every direction (used by the 2D board).
export interface Dir { x: number; y: number; rot: number; }
export interface Piece {
  id: number;
  t: string;
  r: number;
  c: number;
  dead?: boolean; // captured — kept briefly so it can animate out, ignored by game logic
  dir?: Dir; // last move's screen direction — aims the attack thrust / the knock-off
}
export type Mode = "cpu" | "2p";
export type Level = "facil" | "medio" | "dificil";
export interface Rights { wK: boolean; wQ: boolean; bK: boolean; bQ: boolean; }

export const FULL_RIGHTS: Rights = { wK: true, wQ: true, bK: true, bQ: true };

export const GLYPH: Record<string, string> = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
export const PIECE_NAME: Record<string, string> = { k: "king", q: "queen", r: "rook", b: "bishop", n: "knight", p: "pawn" };
// Portuguese names for read-aloud.
export const PIECE_PT: Record<string, string> = { k: "rei", q: "rainha", r: "torre", b: "bispo", n: "cavalo", p: "peão" };

const VAL: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
export const SIDE_PT: Record<Color, string> = { w: "brancas", b: "pretas" };
export const LEVEL_PT: Record<Level, string> = { facil: "Fácil", medio: "Médio", dificil: "Difícil" };
// How hard the computer plays: how many half-moves it looks ahead, and how often
// it just plays a random legal move (a "blunder") so a learner can win.
// "Difícil" keeps the original strong search.
export const LEVELS: Record<Level, { depth: number; blunder: number }> = {
  facil: { depth: 1, blunder: 0.45 },
  medio: { depth: 2, blunder: 0.12 },
  dificil: { depth: 3, blunder: 0 },
};

const KN = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
const KI = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
const ROOK = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const BISH = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

const NODE_CAP = 250_000; // safety: never let the AI search run away
const MATE = 1e7;

const inb = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
export const isWhite = (p: string) => p >= "A" && p <= "Z";
export const colorOf = (p: string): Color => (isWhite(p) ? "w" : "b");
export const opp = (c: Color): Color => (c === "w" ? "b" : "w");
const promoteTo = (p: string) => (isWhite(p) ? "Q" : "q");

const START = ["rnbqkbnr", "pppppppp", "........", "........", "........", "........", "PPPPPPPP", "RNBQKBNR"];

export function initPieces(): Piece[] {
  const out: Piece[] = [];
  let id = 0;
  START.forEach((row, r) =>
    row.split("").forEach((ch, c) => {
      if (ch !== ".") out.push({ id: id++, t: ch, r, c });
    }),
  );
  return out;
}

export function gridFromPieces(pieces: Piece[]): Grid {
  const g: Grid = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (const p of pieces) if (!p.dead) g[p.r][p.c] = p.t;
  return g;
}

/* ---- move generation ---- */

function pseudoMoves(g: Grid, color: Color): Move[] {
  const moves: Move[] = [];
  const add = (fr: number, fc: number, tr: number, tc: number, t: string, promote = false) =>
    moves.push({ fr, fc, tr, tc, t, promote });

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const t = g[r][c];
      if (!t || colorOf(t) !== color) continue;
      const lt = t.toLowerCase();
      if (lt === "p") {
        const dir = color === "w" ? -1 : 1;
        const start = color === "w" ? 6 : 1;
        const last = color === "w" ? 0 : 7;
        if (inb(r + dir, c) && !g[r + dir][c]) {
          add(r, c, r + dir, c, t, r + dir === last);
          if (r === start && !g[r + 2 * dir][c]) add(r, c, r + 2 * dir, c, t);
        }
        for (const dc of [-1, 1]) {
          const rr = r + dir, cc = c + dc;
          if (inb(rr, cc) && g[rr][cc] && colorOf(g[rr][cc]!) !== color) add(r, c, rr, cc, t, rr === last);
        }
      } else if (lt === "n" || lt === "k") {
        for (const [dr, dc] of lt === "n" ? KN : KI) {
          const rr = r + dr, cc = c + dc;
          if (inb(rr, cc) && (!g[rr][cc] || colorOf(g[rr][cc]!) !== color)) add(r, c, rr, cc, t);
        }
      } else {
        const dirs = lt === "b" ? BISH : lt === "r" ? ROOK : [...ROOK, ...BISH];
        for (const [dr, dc] of dirs) {
          let rr = r + dr, cc = c + dc;
          while (inb(rr, cc)) {
            if (!g[rr][cc]) add(r, c, rr, cc, t);
            else {
              if (colorOf(g[rr][cc]!) !== color) add(r, c, rr, cc, t);
              break;
            }
            rr += dr;
            cc += dc;
          }
        }
      }
    }
  }
  return moves;
}

/** Castling moves — king and rook unmoved (rights), squares empty, and the king
 *  not in / through / into check. Added on top of pseudo-legal moves at the
 *  "real game" level (the AI's deep search ignores castling, which is fine). */
function castlingMoves(g: Grid, color: Color, rights: Rights): Move[] {
  const out: Move[] = [];
  const hr = color === "w" ? 7 : 0;
  const king = color === "w" ? "K" : "k";
  if (g[hr][4] !== king || isAttacked(g, hr, 4, opp(color))) return out; // not home, or in check
  const ks = color === "w" ? rights.wK : rights.bK;
  const qs = color === "w" ? rights.wQ : rights.bQ;
  const rookAt = (c: number) => (g[hr][c] ?? "").toLowerCase() === "r" && colorOf(g[hr][c]!) === color;
  if (ks && rookAt(7) && !g[hr][5] && !g[hr][6] && !isAttacked(g, hr, 5, opp(color)) && !isAttacked(g, hr, 6, opp(color)))
    out.push({ fr: hr, fc: 4, tr: hr, tc: 6, t: king, castle: "K" });
  if (qs && rookAt(0) && !g[hr][3] && !g[hr][2] && !g[hr][1] && !isAttacked(g, hr, 3, opp(color)) && !isAttacked(g, hr, 2, opp(color)))
    out.push({ fr: hr, fc: 4, tr: hr, tc: 2, t: king, castle: "Q" });
  return out;
}

export function applyGrid(g: Grid, m: Move): Grid {
  const n = g.map((row) => row.slice());
  n[m.fr][m.fc] = null;
  n[m.tr][m.tc] = m.promote ? promoteTo(m.t) : m.t;
  if (m.castle) {
    const hr = m.fr;
    if (m.castle === "K") { n[hr][5] = n[hr][7]; n[hr][7] = null; }
    else { n[hr][3] = n[hr][0]; n[hr][0] = null; }
  }
  return n;
}

/** Castling rights after a move: the king moving forfeits both sides; a rook
 *  leaving (or being captured on) its home corner forfeits that side. */
export function updateRights(rights: Rights, m: Move): Rights {
  const r = { ...rights };
  if (m.t === "K") { r.wK = false; r.wQ = false; }
  if (m.t === "k") { r.bK = false; r.bQ = false; }
  for (const [sr, sc] of [[m.fr, m.fc], [m.tr, m.tc]]) {
    if (sr === 7 && sc === 0) r.wQ = false;
    if (sr === 7 && sc === 7) r.wK = false;
    if (sr === 0 && sc === 0) r.bQ = false;
    if (sr === 0 && sc === 7) r.bK = false;
  }
  return r;
}

function rayHit(g: Grid, r: number, c: number, dr: number, dc: number, set: string[]): boolean {
  let rr = r + dr, cc = c + dc;
  while (inb(rr, cc)) {
    const p = g[rr][cc];
    if (p) return set.includes(p);
    rr += dr;
    cc += dc;
  }
  return false;
}

function isAttacked(g: Grid, r: number, c: number, by: Color): boolean {
  const pr = by === "w" ? r + 1 : r - 1; // a `by` pawn sits one rank back and attacks diagonally
  for (const dc of [-1, 1]) if (inb(pr, c + dc) && g[pr][c + dc] === (by === "w" ? "P" : "p")) return true;
  for (const [dr, dc] of KN) if (inb(r + dr, c + dc) && g[r + dr][c + dc] === (by === "w" ? "N" : "n")) return true;
  for (const [dr, dc] of KI) if (inb(r + dr, c + dc) && g[r + dr][c + dc] === (by === "w" ? "K" : "k")) return true;
  const rook = by === "w" ? ["R", "Q"] : ["r", "q"];
  const bish = by === "w" ? ["B", "Q"] : ["b", "q"];
  for (const [dr, dc] of ROOK) if (rayHit(g, r, c, dr, dc, rook)) return true;
  for (const [dr, dc] of BISH) if (rayHit(g, r, c, dr, dc, bish)) return true;
  return false;
}

export function findKing(g: Grid, color: Color): [number, number] | null {
  const k = color === "w" ? "K" : "k";
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (g[r][c] === k) return [r, c];
  return null;
}

function inCheck(g: Grid, color: Color): boolean {
  const k = findKing(g, color);
  return !!k && isAttacked(g, k[0], k[1], opp(color));
}

/** Legal moves (pseudo-legal + castling) filtered to those that don't leave own
 *  king in check. Pass castling rights for the side to move. */
export function legalMoves(g: Grid, color: Color, rights: Rights): Move[] {
  return [...pseudoMoves(g, color), ...castlingMoves(g, color, rights)].filter((m) => {
    const g2 = applyGrid(g, m);
    const k = findKing(g2, color);
    return !!k && !isAttacked(g2, k[0], k[1], opp(color));
  });
}

/* ---- draw conditions ---- */

function insufficientMaterial(g: Grid): boolean {
  let minors = 0;
  for (const row of g)
    for (const p of row) {
      if (!p) continue;
      const lt = p.toLowerCase();
      if (lt === "p" || lt === "r" || lt === "q") return false; // mating material present
      if (lt === "n" || lt === "b") minors++;
    }
  return minors <= 1; // K vs K, or K + one minor vs K — can't force mate
}

export function positionKey(g: Grid, side: Color): string {
  return g.map((row) => row.map((p) => p ?? ".").join("")).join("/") + " " + side;
}

/* ---- computer player (negamax + alpha-beta over material) ---- */

function evalMaterial(g: Grid, color: Color): number {
  let s = 0;
  for (const row of g)
    for (const p of row) if (p) s += VAL[p.toLowerCase()] * (colorOf(p) === color ? 1 : -1);
  return s;
}

const capScore = (g: Grid, m: Move) => (g[m.tr][m.tc] ? VAL[g[m.tr][m.tc]!.toLowerCase()] : 0);

function search(g: Grid, color: Color, depth: number, alpha: number, beta: number, nodes: { n: number }): number {
  const moves = pseudoMoves(g, color);
  for (const m of moves) if ((g[m.tr][m.tc] ?? "").toLowerCase() === "k") return MATE; // king en prise → won
  if (depth === 0 || nodes.n > NODE_CAP) return evalMaterial(g, color);
  moves.sort((a, b) => capScore(g, b) - capScore(g, a)); // captures first → better pruning
  let best = -Infinity;
  for (const m of moves) {
    nodes.n++;
    const sc = -search(applyGrid(g, m), opp(color), depth - 1, -beta, -alpha, nodes);
    if (sc > best) best = sc;
    if (best > alpha) alpha = best;
    if (alpha >= beta) break;
  }
  return best;
}

export function aiMove(g: Grid, color: Color, rights: Rights, depth: number, blunder: number): Move | null {
  const legal = legalMoves(g, color, rights);
  if (!legal.length) return null;
  // Easy levels sometimes just play a random legal move, so a learner can win.
  if (Math.random() < blunder) return legal[(Math.random() * legal.length) | 0];
  legal.sort((a, b) => capScore(g, b) - capScore(g, a));
  const nodes = { n: 0 };
  let best = -Infinity;
  let choices: Move[] = [];
  for (const m of legal) {
    const sc = -search(applyGrid(g, m), opp(color), depth - 1, -Infinity, Infinity, nodes);
    if (sc > best + 1) { best = sc; choices = [m]; }
    else if (Math.abs(sc - best) <= 1) choices.push(m); // vary play among near-equal moves
  }
  return choices[(Math.random() * choices.length) | 0];
}

/* ---- piece movement on the visible board (keeps captured pieces for the animation) ---- */

export function applyMovePieces(pieces: Piece[], m: Move): Piece[] {
  const rookFrom = m.castle ? (m.castle === "K" ? [m.fr, 7] : [m.fr, 0]) : null;
  const rookTo = m.castle ? (m.castle === "K" ? [m.fr, 5] : [m.fr, 3]) : null;
  // Screen direction of this move (columns → x, rows → y, y growing downward) so the
  // mover thrusts — and a captured piece is knocked — the way the attacker came in.
  const nx = Math.sign(m.tc - m.fc);
  const ny = Math.sign(m.tr - m.fr);
  const dir: Dir = { x: nx, y: ny, rot: nx !== 0 ? nx : ny >= 0 ? 1 : -1 };
  return pieces.map((p) => {
    if (p.dead) return p;
    if (!m.castle && p.r === m.tr && p.c === m.tc) return { ...p, dead: true, dir }; // captured → knocked off
    if (p.r === m.fr && p.c === m.fc) return { ...p, r: m.tr, c: m.tc, t: m.promote ? promoteTo(p.t) : p.t, dir };
    if (rookFrom && p.r === rookFrom[0] && p.c === rookFrom[1]) return { ...p, r: rookTo![0], c: rookTo![1] };
    return p;
  });
}

export type StKind = "checkmate" | "stalemate" | "material" | "fifty" | "threefold" | "check" | "play";
export interface Status {
  over: boolean;
  check: boolean;
  kind: StKind;
  side: Color; // the side to move (the one mated/stalemated when over)
}

/** Status for the side about to move, after a move has been applied. */
export function evaluateStatus(g: Grid, side: Color, halfmove: number, reps: number, rights: Rights): Status {
  const check = inCheck(g, side);
  if (legalMoves(g, side, rights).length === 0) return { over: true, check, kind: check ? "checkmate" : "stalemate", side };
  if (insufficientMaterial(g)) return { over: true, check, kind: "material", side };
  if (halfmove >= 100) return { over: true, check, kind: "fifty", side };
  if (reps >= 3) return { over: true, check, kind: "threefold", side };
  return { over: false, check, kind: check ? "check" : "play", side };
}

/** Turn a status into the on-screen / spoken message + whether to celebrate. */
export function describe(st: Status, mode: Mode): { msg: string; celebrate: boolean } {
  const winner = opp(st.side); // whoever just moved
  switch (st.kind) {
    case "checkmate":
      if (mode === "cpu") {
        return winner === "w"
          ? { msg: "Xeque-mate! Ganhaste! 🎉", celebrate: true }
          : { msg: "Xeque-mate! O computador ganhou. 😅", celebrate: false };
      }
      return { msg: `Xeque-mate! Ganharam as ${SIDE_PT[winner]}! 🎉`, celebrate: true };
    case "stalemate":
      return { msg: "Empate — rei afogado (sem jogadas)!", celebrate: false };
    case "material":
      return { msg: "Empate — não há peças para dar mate.", celebrate: false };
    case "fifty":
      return { msg: "Empate pela regra dos 50 lances.", celebrate: false };
    case "threefold":
      return { msg: "Empate por repetição.", celebrate: false };
    case "check":
      if (mode === "cpu") return { msg: st.side === "w" ? "Xeque! Protege o teu rei." : "Xeque!", celebrate: false };
      return { msg: `Xeque às ${SIDE_PT[st.side]}!`, celebrate: false };
    default:
      if (mode === "cpu") return { msg: st.side === "w" ? "É a tua vez!" : "O computador joga…", celebrate: false };
      return { msg: `É a vez das ${SIDE_PT[st.side]}.`, celebrate: false };
  }
}

export const firstMsg = (mode: Mode) => (mode === "cpu" ? "É a tua vez! Move uma peça branca." : "Começa! É a vez das brancas.");
