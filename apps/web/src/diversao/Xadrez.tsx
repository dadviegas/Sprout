import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@sprout/icons";
import { Speaker, Confetti } from "@sprout/ui";
import { prefersReducedMotion } from "./canvas";
import { pieceArt } from "./pieces";
import { RivePiece } from "./rive-piece";

/* Xadrez — a full chess game, against the built-in computer OR two players on
 * the same device (pass-and-play). Plain TS + DOM (no engine library): legal
 * move generation incl. castling (roque) and pawn promotion, check / checkmate,
 * and the draw rules (stalemate, insufficient material, the 50-move rule,
 * threefold repetition). The king in check is highlighted on the board.
 *
 * Graphics: the pieces are little CHARACTERS that stride to their square and strike
 * when they capture (a captured piece is knocked off and the board jolts). Each square
 * shows, in order: a dropped-in cool character image (static/characters/<piece>-<color>.png)
 * or animated Rive file (…<piece>-<color>.riv) — see that folder's README; else the
 * built-in rigged inline-SVG character (pieces.tsx) whose limbs articulate; else the
 * Unicode glyph. Art can be added one piece at a time — see PieceFigure / characterBase
 * below and the .xb-* styles in diversao.css.
 *
 * Simplifications kept on purpose (KISS, fine for a kids' game): no en passant;
 * pawns auto-promote to a queen. Castling and everything else is real chess. */

type Color = "w" | "b";
type Grid = (string | null)[][];

interface Move {
  fr: number;
  fc: number;
  tr: number;
  tc: number;
  t: string;
  promote?: boolean;
  castle?: "K" | "Q"; // king-side / queen-side
}
interface Piece {
  id: number;
  t: string;
  r: number;
  c: number;
  dead?: boolean; // captured — kept briefly so it can animate out, ignored by game logic
  dir?: Dir; // last move's screen direction — aims the attack thrust / the knock-off
}
// Unit screen direction of a move (x = columns, y = rows; y grows downward) plus a
// rotation sign, so one keyframe set serves every direction (see diversao.css).
interface Dir { x: number; y: number; rot: number; }
type Mode = "cpu" | "2p";
interface Rights { wK: boolean; wQ: boolean; bK: boolean; bQ: boolean; }

const FULL_RIGHTS: Rights = { wK: true, wQ: true, bK: true, bQ: true };

const GLYPH: Record<string, string> = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
// Optional anime-character art: drop a transparent PNG per piece into
// apps/web/static/sprites/ named "<piece>-<color>.png" (see that folder's
// README). A piece with no art file just shows its Unicode glyph instead, so the
// board works before any sprites exist and degrades one piece at a time.
const PIECE_NAME: Record<string, string> = { k: "king", q: "queen", r: "rook", b: "bishop", n: "knight", p: "pawn" };
// Drop-in character art lives at static/characters/<piece>-<color>.<ext> (see that
// folder's README). Two ways, in priority order: a still IMAGE (.png — the easy path:
// generate a cool character with any image AI) or an animated RIVE file (.riv).
const characterBase = (t: string) => `characters/${PIECE_NAME[t.toLowerCase()]}-${isWhite(t) ? "w" : "b"}`;
const ART_EXTS = [".png", ".riv"] as const;
// Probe each distinct URL once (cached) instead of once per piece (32×).
const artProbe = new Map<string, Promise<boolean>>();
const hasArtFile = (url: string): Promise<boolean> => {
  let p = artProbe.get(url);
  if (!p) {
    p = fetch(url).then((r) => r.ok).catch(() => false);
    artProbe.set(url, p);
  }
  return p;
};
const VAL: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
const SIDE_PT: Record<Color, string> = { w: "brancas", b: "pretas" };

const KN = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
const KI = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
const ROOK = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const BISH = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

const DEPTH = 3;
const NODE_CAP = 250_000; // safety: never let the AI search run away
const MATE = 1e7;

const inb = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
const isWhite = (p: string) => p >= "A" && p <= "Z";
const colorOf = (p: string): Color => (isWhite(p) ? "w" : "b");
const opp = (c: Color): Color => (c === "w" ? "b" : "w");
const promoteTo = (p: string) => (isWhite(p) ? "Q" : "q");

const START = ["rnbqkbnr", "pppppppp", "........", "........", "........", "........", "PPPPPPPP", "RNBQKBNR"];

function initPieces(): Piece[] {
  const out: Piece[] = [];
  let id = 0;
  START.forEach((row, r) =>
    row.split("").forEach((ch, c) => {
      if (ch !== ".") out.push({ id: id++, t: ch, r, c });
    }),
  );
  return out;
}

function gridFromPieces(pieces: Piece[]): Grid {
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

function applyGrid(g: Grid, m: Move): Grid {
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
function updateRights(rights: Rights, m: Move): Rights {
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

function findKing(g: Grid, color: Color): [number, number] | null {
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
function legalMoves(g: Grid, color: Color, rights: Rights): Move[] {
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

function positionKey(g: Grid, side: Color): string {
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

function aiMove(g: Grid, color: Color, rights: Rights): Move | null {
  const legal = legalMoves(g, color, rights);
  if (!legal.length) return null;
  legal.sort((a, b) => capScore(g, b) - capScore(g, a));
  const nodes = { n: 0 };
  let best = -Infinity;
  let choices: Move[] = [];
  for (const m of legal) {
    const sc = -search(applyGrid(g, m), opp(color), DEPTH - 1, -Infinity, Infinity, nodes);
    if (sc > best + 1) { best = sc; choices = [m]; }
    else if (Math.abs(sc - best) <= 1) choices.push(m); // vary play among near-equal moves
  }
  return choices[(Math.random() * choices.length) | 0];
}

/* ---- piece movement on the visible board (keeps captured pieces for the animation) ---- */

function applyMovePieces(pieces: Piece[], m: Move): Piece[] {
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

type StKind = "checkmate" | "stalemate" | "material" | "fifty" | "threefold" | "check" | "play";
interface Status {
  over: boolean;
  check: boolean;
  kind: StKind;
  side: Color; // the side to move (the one mated/stalemated when over)
}

/** Status for the side about to move, after a move has been applied. */
function evaluateStatus(g: Grid, side: Color, halfmove: number, reps: number, rights: Rights): Status {
  const check = inCheck(g, side);
  if (legalMoves(g, side, rights).length === 0) return { over: true, check, kind: check ? "checkmate" : "stalemate", side };
  if (insufficientMaterial(g)) return { over: true, check, kind: "material", side };
  if (halfmove >= 100) return { over: true, check, kind: "fifty", side };
  if (reps >= 3) return { over: true, check, kind: "threefold", side };
  return { over: false, check, kind: check ? "check" : "play", side };
}

/** Turn a status into the on-screen / spoken message + whether to celebrate. */
function describe(st: Status, mode: Mode): { msg: string; celebrate: boolean } {
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

const firstMsg = (mode: Mode) => (mode === "cpu" ? "É a tua vez! Move uma peça branca." : "Começa! É a vez das brancas.");

// Animation timings, kept in sync with the .xb-* keyframes in diversao.css. Pieces
// sit STILL when idle and only animate while being used: a piece walks/strikes for
// MOVE_ANIM_MS, a captured piece is knocked off at IMPACT_MS (when the blow lands)
// and removed after DEAD_CLEAR_MS.
const MOVE_ANIM_MS = 700;
const IMPACT_MS = 340;
const DEAD_CLEAR_MS = 820;

/* The character standing in a square. In order of preference:
 *   1. a dropped-in COOL character image (static/characters/<piece>-<color>.png) — a
 *      flat picture (e.g. AI-generated) that slides/strikes as a whole;
 *   2. a dropped-in CINEMATIC Rive character (…<piece>-<color>.riv) — its own state
 *      machine, driven walk/attack/die by the game;
 *   3. the built-in "living" rigged character (inline SVG, `pieces.tsx`);
 *   4. the Unicode glyph.
 * Drop-ins are probed first; if none, the next tier is used — so the game works fully
 * before any art exists. Image/SVG/glyph carry `.xb-char` (shared walk/attack/capture
 * timing); the inline SVG also gets `.xb-rig` so its limbs animate. `dir` aims the
 * strike / knock-off via CSS vars. Keyed by piece type by the caller (promotion). */
function PieceFigure({ t, anim, dir, dead }: { t: string; anim: "walk" | "attack" | null; dir?: Dir; dead: boolean }) {
  const base = characterBase(t);
  const [src, setSrc] = useState<string | null>(null); // resolved drop-in URL (.png or .riv)
  useEffect(() => {
    let live = true;
    setSrc(null);
    (async () => {
      for (const ext of ART_EXTS) {
        if (await hasArtFile(base + ext)) { if (live) setSrc(base + ext); return; }
      }
    })();
    return () => { live = false; };
  }, [base]);
  const cls = `xb-char ${anim === "walk" ? "walking" : ""} ${anim === "attack" ? "attacking" : ""}`;
  const style = { ["--ax" as string]: dir?.x ?? 0, ["--ay" as string]: dir?.y ?? 0, ["--rot" as string]: dir?.rot ?? 1 } as CSSProperties;
  if (src?.endsWith(".riv")) return <RivePiece url={src} anim={anim} dead={dead} className={`${cls} xb-rive xb-sprite`} style={style} />;
  if (src) return <img className={`${cls} xb-sprite`} style={style} src={src} alt="" draggable={false} />;
  const built = pieceArt(t, isWhite(t) ? "w" : "b");
  if (built) return <svg className={`${cls} xb-rig xb-sprite xb-pc-${t.toLowerCase()}`} style={style} viewBox="0 0 100 110" aria-hidden>{built}</svg>;
  return <span className={`${cls} xb-glyph`} style={style}>{GLYPH[t.toLowerCase()]}</span>;
}

export function Xadrez({ onBack }: { onBack: () => void }) {
  const reduced = prefersReducedMotion();
  const [mode, setMode] = useState<Mode>("cpu");
  const [started, setStarted] = useState(false); // first move made → hide the mode chooser, grow the board
  const [pieces, setPieces] = useState<Piece[]>(initPieces);
  const [turn, setTurn] = useState<Color>("w");
  const [sel, setSel] = useState<number | null>(null);
  const [targets, setTargets] = useState<Move[]>([]);
  const [msg, setMsg] = useState(firstMsg("cpu"));
  const [check, setCheck] = useState(false);
  const [checkSq, setCheckSq] = useState<[number, number] | null>(null); // king in check → highlight it
  const [over, setOver] = useState(false);
  const [win, setWin] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [burst, setBurst] = useState<{ r: number; c: number; key: number } | null>(null);
  const [moving, setMoving] = useState<{ id: number; kind: "walk" | "attack"; key: number } | null>(null);
  const [hit, setHit] = useState(false); // capture impact → brief board shake + zoom ("juice")
  const [fullscreen, setFullscreen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null); // the element we blow up to fullscreen
  const halfmove = useRef(0);
  const reps = useRef<Map<string, number>>(new Map());
  const rights = useRef<Rights>({ ...FULL_RIGHTS });
  const burstId = useRef(0);
  const moveId = useRef(0);

  // Mirror the browser's fullscreen state (it can change via Esc / the OS, not just
  // our button) so the toggle icon and the enlarged board styling stay in sync.
  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);
  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else rootRef.current?.requestFullscreen?.();
  };

  const grid = useMemo(() => gridFromPieces(pieces), [pieces]);
  const selPos = sel !== null ? pieces.find((p) => p.id === sel && !p.dead) : undefined;
  const targetSet = useMemo(() => new Set(targets.map((m) => `${m.tr},${m.tc}`)), [targets]);

  // In vs-computer mode only White is human; in 2-player mode both sides are.
  const humanControls = (c: Color) => mode === "2p" || c === "w";

  const clearDead = () => window.setTimeout(() => setPieces((ps) => ps.filter((p) => !p.dead)), reduced ? 0 : DEAD_CLEAR_MS);

  // A "pow" flash where a piece was just struck — fired at IMPACT_MS so it lands with
  // the attacker's blow, not the instant the move is made.
  const popBurst = (r: number, c: number) => {
    if (reduced) return;
    window.setTimeout(() => {
      const key = ++burstId.current;
      setBurst({ r, c, key });
      window.setTimeout(() => setBurst((b) => (b && b.key === key ? null : b)), 460);
      // cinematic "juice": the whole board jolts + zooms a touch on the kill
      setHit(true);
      window.setTimeout(() => setHit(false), 420);
    }, IMPACT_MS);
  };

  // Make the moving piece "walk" to its square — or "attack" (strike) on a capture.
  const animateMove = (id: number | undefined, capture: boolean) => {
    if (reduced || id == null) return;
    const key = ++moveId.current;
    setMoving({ id, kind: capture ? "attack" : "walk", key });
    window.setTimeout(() => setMoving((mv) => (mv && mv.key === key ? null : mv)), MOVE_ANIM_MS);
  };

  // 50-move clock + repetition count, shared by every move.
  const track = (g: Grid, m: Move, next: Color): number => {
    const captured = grid[m.tr][m.tc] != null;
    halfmove.current = m.t.toLowerCase() === "p" || captured ? 0 : halfmove.current + 1;
    const key = positionKey(g, next);
    const n = (reps.current.get(key) ?? 0) + 1;
    reps.current.set(key, n);
    return n;
  };

  // Resolve status after a move and apply it to the UI; `next` is the side now to move.
  const resolve = (g2: Grid, m: Move, next: Color) => {
    rights.current = updateRights(rights.current, m);
    const repCount = track(g2, m, next);
    const st = evaluateStatus(g2, next, halfmove.current, repCount, rights.current);
    const { msg: text, celebrate } = describe(st, mode);
    setCheck(st.check);
    setCheckSq(st.check ? findKing(g2, next) : null);
    setMsg(text);
    if (st.over) { setOver(true); setWin(celebrate); }
    return { st, text };
  };

  const makeMove = (m: Move) => {
    setStarted(true);
    const next = opp(turn);
    const moverId = pieces.find((p) => !p.dead && p.r === m.fr && p.c === m.fc)?.id;
    const capture = !m.castle && !!grid[m.tr][m.tc];
    const np = applyMovePieces(pieces, m);
    setPieces(np);
    setSel(null);
    setTargets([]);
    clearDead();
    if (capture) popBurst(m.tr, m.tc); // captured something here
    animateMove(moverId, capture);

    // No autoplay: the status updates on screen; tap the speaker to hear it.
    const { st } = resolve(gridFromPieces(np), m, next);
    if (st.over) return;
    setTurn(next);
    if (mode === "cpu" && next === "b") {
      setThinking(true);
      window.setTimeout(() => computerMove(np), reduced ? 220 : 480);
    }
  };

  const computerMove = (cur: Piece[]) => {
    setThinking(false);
    const gBefore = gridFromPieces(cur);
    const m = aiMove(gBefore, "b", rights.current);
    if (!m) return; // safety; status already covered mate/stalemate
    const moverId = cur.find((p) => !p.dead && p.r === m.fr && p.c === m.fc)?.id;
    const capture = !m.castle && !!gBefore[m.tr][m.tc];
    const np = applyMovePieces(cur, m);
    setPieces(np);
    clearDead();
    if (capture) popBurst(m.tr, m.tc);
    animateMove(moverId, capture);
    const { st } = resolve(gridFromPieces(np), m, "w");
    if (st.over) return;
    setTurn("w");
  };

  const tapSquare = (r: number, c: number) => {
    if (over || thinking || !humanControls(turn)) return;
    const move = targets.find((m) => m.tr === r && m.tc === c);
    if (move) { makeMove(move); return; }
    const t = grid[r][c];
    if (t && colorOf(t) === turn) {
      const id = pieces.find((p) => !p.dead && p.r === r && p.c === c)!.id;
      setSel(id);
      setTargets(legalMoves(grid, turn, rights.current).filter((mv) => mv.fr === r && mv.fc === c));
    } else {
      setSel(null);
      setTargets([]);
    }
  };

  const newGame = (nextMode: Mode = mode) => {
    setMode(nextMode);
    setPieces(initPieces());
    setTurn("w");
    setSel(null);
    setTargets([]);
    setMsg(firstMsg(nextMode));
    setCheck(false);
    setCheckSq(null);
    setOver(false);
    setWin(false);
    setThinking(false);
    setStarted(false);
    halfmove.current = 0;
    reps.current = new Map();
    rights.current = { ...FULL_RIGHTS };
  };

  return (
    <div className={`dv-play ${fullscreen ? "is-fullscreen" : ""}`} ref={rootRef}>
      {/* One compact row: back · mode (pre-start) · new game · fullscreen · sound —
          leaves the most height for the board. */}
      <div className="dv-toolbar" role="toolbar">
        <button className="dv-tool dv-tool--wide" onClick={onBack} aria-label="Voltar aos jogos">
          <Icon name="back" size={20} />
          <span>Voltar aos jogos</span>
        </button>
        {!started && (
          <div className="dv-segment dv-segment--inline" role="group" aria-label="Modo de jogo">
            <button className={`dv-seg ${mode === "cpu" ? "is-active" : ""}`} onClick={() => newGame("cpu")} aria-pressed={mode === "cpu"}>
              1 jogador
            </button>
            <button className={`dv-seg ${mode === "2p" ? "is-active" : ""}`} onClick={() => newGame("2p")} aria-pressed={mode === "2p"}>
              2 jogadores
            </button>
          </div>
        )}
        <button className="dv-tool dv-tool--wide" onClick={() => newGame()}>
          <Icon name="refresh" size={20} />
          <span>Novo jogo</span>
        </button>
        <button
          className="dv-tool"
          onClick={toggleFullscreen}
          aria-label={fullscreen ? "Sair do ecrã inteiro" : "Ecrã inteiro"}
          title={fullscreen ? "Sair do ecrã inteiro" : "Ecrã inteiro"}
        >
          <Icon name={fullscreen ? "collapse" : "expand"} size={22} />
        </button>
        <Speaker text={msg} className="dv-tool" label="Ouvir" size={22} />
      </div>

      <p className={`xb-msg ${check ? "is-check" : ""} ${over ? "is-over" : ""}`} aria-live="polite">
        {thinking ? "O computador está a pensar…" : msg}
      </p>

      <div className={`xb-board ${reduced ? "no-anim" : ""} ${hit ? "is-hit" : ""}`} role="grid" aria-label="Tabuleiro de xadrez">
        <div className="xb-squares">
          {Array.from({ length: 64 }, (_, i) => {
            const r = (i / 8) | 0;
            const c = i % 8;
            const isTarget = targetSet.has(`${r},${c}`);
            const isCapture = isTarget && !!grid[r][c];
            const isSel = !!selPos && selPos.r === r && selPos.c === c;
            const isCheck = !!checkSq && checkSq[0] === r && checkSq[1] === c;
            return (
              <button
                key={i}
                className={`xb-sq ${(r + c) % 2 ? "dark" : "light"} ${isSel ? "sel" : ""} ${isCheck ? (over ? "mate" : "check") : ""}`}
                onClick={() => tapSquare(r, c)}
                aria-label={`${"abcdefgh"[c]}${8 - r}`}
                disabled={over}
              >
                {isTarget && <span className={`xb-dot ${isCapture ? "cap" : ""}`} aria-hidden />}
              </button>
            );
          })}
        </div>

        <div className="xb-pieces" aria-hidden>
          {pieces.map((p) => {
            const anim = moving && moving.id === p.id ? moving.kind : null; // "walk" | "attack" | null
            // raise the mover / picked-up piece above the others while it animates
            const lift = anim || p.id === sel ? "lift" : "";
            return (
              <div
                key={p.id}
                className={`xb-piece ${colorOf(p.t) === "w" ? "white" : "black"} ${p.dead ? "dead" : ""} ${p.id === sel ? "sel" : ""} ${lift}`}
                style={{ transform: `translate(${p.c * 100}%, ${p.r * 100}%)` }}
              >
                {/* still by default; walks when moving, strikes when capturing */}
                <PieceFigure key={p.t} t={p.t} anim={anim} dir={p.dir} dead={!!p.dead} />
              </div>
            );
          })}
          {burst && (
            <span key={burst.key} className="xb-burst" style={{ transform: `translate(${burst.c * 100}%, ${burst.r * 100}%)` }} />
          )}
        </div>
      </div>

      {win && <Confetti pieces={reduced ? 18 : 60} />}
    </div>
  );
}
