import { useMemo, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker, Confetti } from "@sprout/ui";
import { prefersReducedMotion } from "./canvas";

/* Damas — a full draughts/checkers game, against the built-in computer OR two
 * players on the same device (pass-and-play). Plain TS + DOM (no engine), kept
 * deliberately independent of the chess game (.xb-* / Xadrez.tsx) — the chess
 * board is changing, so Damas carries its own .dm-* styles and logic.
 *
 * Rules (classic 8×8 draughts, the version most kids know — documented like the
 * chess simplifications so authors know what's modelled):
 *   • 12 discs each, on the dark squares; White (the human) sits at the bottom.
 *   • A "peão" moves one diagonal step FORWARD to an empty square and captures
 *     by jumping a touching enemy to the empty square just beyond (forward only).
 *   • Capture is MANDATORY — if you can eat, you must; and a multi-jump keeps the
 *     same piece going until it can't jump again. (We don't enforce the
 *     "maximum capture" majority rule — any legal capture is allowed.)
 *   • Reaching the far row crowns the piece a "dama", which moves and captures
 *     one diagonal step in ALL four directions (a short-range king, not the
 *     long-range flying dama — kept simple and kid-clear).
 *   • No legal move on your turn = you lose; a long stretch with no capture or
 *     crown is a draw.
 *
 * Graphics: round discs (crisp at any size, no image assets) on the same friendly
 * cream + green board as chess; a dama wears a little crown. Pieces slide to their
 * square, bob gently, hop when they move and "pow" a captured piece — see .dm-*. */

type Color = "w" | "b";
type Grid = (string | null)[][];

interface Step {
  fr: number;
  fc: number;
  tr: number;
  tc: number;
  cap?: [number, number]; // square of the jumped piece (a capture)
  crown?: boolean; // a peão reaches the far row → becomes dama
}
interface Piece {
  id: number;
  t: string; // "w"/"b" = peão, "W"/"B" = dama
  r: number;
  c: number;
  dead?: boolean; // captured — kept briefly so it can animate out, ignored by game logic
}
type Mode = "cpu" | "2p";
type Level = "facil" | "medio" | "dificil";

const SIDE_PT: Record<Color, string> = { w: "brancas", b: "pretas" };
const LEVEL_PT: Record<Level, string> = { facil: "Fácil", medio: "Médio", dificil: "Difícil" };
// How hard the computer plays: how many turns it looks ahead, and how often it
// just plays a random legal move (a "blunder") so a learner can win. "Difícil"
// keeps the original strong search.
const LEVELS: Record<Level, { depth: number; blunder: number }> = {
  facil: { depth: 1, blunder: 0.45 },
  medio: { depth: 3, blunder: 0.12 },
  dificil: { depth: 5, blunder: 0 },
};

const DIAG = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const WHITE_FWD = [[-1, -1], [-1, 1]];
const BLACK_FWD = [[1, -1], [1, 1]];

const NODE_CAP = 200_000; // safety: never let the AI search run away
const MATE = 1e7;
const MAN = 100;
const KING = 175;
const DRAW_PLIES = 50; // no capture / crown for this many half-moves → empate

const inb = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
const isWhite = (p: string) => p === "w" || p === "W";
const isKing = (p: string) => p === "W" || p === "B";
const colorOf = (p: string): Color => (isWhite(p) ? "w" : "b");
const opp = (c: Color): Color => (c === "w" ? "b" : "w");
const crownOf = (p: string) => (isWhite(p) ? "W" : "B");

// A peão moves forward; a dama every diagonal. Peões capture forward only.
const moveDirs = (p: string) => (isKing(p) ? DIAG : isWhite(p) ? WHITE_FWD : BLACK_FWD);
const wouldCrown = (p: string, tr: number) => !isKing(p) && (isWhite(p) ? tr === 0 : tr === 7);

function initPieces(): Piece[] {
  const out: Piece[] = [];
  let id = 0;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 0) continue; // light square — unused in draughts
      if (r <= 2) out.push({ id: id++, t: "b", r, c });
      else if (r >= 5) out.push({ id: id++, t: "w", r, c });
    }
  return out;
}

function gridFromPieces(pieces: Piece[]): Grid {
  const g: Grid = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (const p of pieces) if (!p.dead) g[p.r][p.c] = p.t;
  return g;
}

/* ---- move generation (single steps) ---- */

function quietSteps(g: Grid, r: number, c: number): Step[] {
  const p = g[r][c];
  if (!p) return [];
  const out: Step[] = [];
  for (const [dr, dc] of moveDirs(p)) {
    const tr = r + dr, tc = c + dc;
    if (inb(tr, tc) && !g[tr][tc]) out.push({ fr: r, fc: c, tr, tc, crown: wouldCrown(p, tr) });
  }
  return out;
}

function captureSteps(g: Grid, r: number, c: number): Step[] {
  const p = g[r][c];
  if (!p) return [];
  const out: Step[] = [];
  for (const [dr, dc] of moveDirs(p)) {
    const mr = r + dr, mc = c + dc; // the enemy we'd jump
    const tr = r + 2 * dr, tc = c + 2 * dc; // where we'd land
    if (!inb(tr, tc) || g[tr][tc]) continue;
    const mid = g[mr][mc];
    if (mid && colorOf(mid) !== colorOf(p)) out.push({ fr: r, fc: c, tr, tc, cap: [mr, mc], crown: wouldCrown(p, tr) });
  }
  return out;
}

function hasCapture(g: Grid, color: Color): boolean {
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = g[r][c];
      if (p && colorOf(p) === color && captureSteps(g, r, c).length) return true;
    }
  return false;
}

/** Legal steps for one piece on a fresh selection: only captures when any
 *  capture exists (mandatory), otherwise quiet moves. */
function legalForPiece(g: Grid, color: Color, r: number, c: number): Step[] {
  return hasCapture(g, color) ? captureSteps(g, r, c) : quietSteps(g, r, c);
}

function applyStep(g: Grid, s: Step): Grid {
  const n = g.map((row) => row.slice());
  const p = n[s.fr][s.fc]!;
  n[s.fr][s.fc] = null;
  if (s.cap) n[s.cap[0]][s.cap[1]] = null;
  n[s.tr][s.tc] = s.crown ? crownOf(p) : p;
  return n;
}

/* ---- full turns (a quiet move, or a whole capture chain) — used by the AI ---- */

interface Turn {
  grid: Grid;
  steps: Step[];
}

function extendCapture(g: Grid, step: Step, path: Step[], out: Turn[]) {
  const g2 = applyStep(g, step);
  const np = [...path, step];
  // A peão that crowns mid-jump stops there (it doesn't keep eating as a dama).
  if (step.crown) { out.push({ grid: g2, steps: np }); return; }
  const more = captureSteps(g2, step.tr, step.tc);
  if (more.length) for (const m of more) extendCapture(g2, m, np, out);
  else out.push({ grid: g2, steps: np });
}

function enumerateTurns(g: Grid, color: Color): Turn[] {
  const out: Turn[] = [];
  const mustCapture = hasCapture(g, color);
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = g[r][c];
      if (!p || colorOf(p) !== color) continue;
      if (mustCapture) for (const cap of captureSteps(g, r, c)) extendCapture(g, cap, [], out);
      else for (const s of quietSteps(g, r, c)) out.push({ grid: applyStep(g, s), steps: [s] });
    }
  return out;
}

/* ---- computer player (negamax + alpha-beta over material) ---- */

function evaluate(g: Grid, color: Color): number {
  let s = 0;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = g[r][c];
      if (!p) continue;
      let v = isKing(p) ? KING : MAN;
      if (!isKing(p)) v += (isWhite(p) ? 7 - r : r) * 4; // reward advancing toward the crown
      s += (colorOf(p) === color ? 1 : -1) * v;
    }
  return s;
}

const capCount = (t: Turn) => t.steps.reduce((n, s) => n + (s.cap ? 1 : 0), 0);

function search(g: Grid, color: Color, depth: number, alpha: number, beta: number, nodes: { n: number }): number {
  if (depth === 0 || nodes.n > NODE_CAP) return evaluate(g, color);
  const turns = enumerateTurns(g, color);
  if (!turns.length) return -MATE; // no move → this side loses
  turns.sort((a, b) => capCount(b) - capCount(a)); // captures first → better pruning
  let best = -Infinity;
  for (const t of turns) {
    nodes.n++;
    const sc = -search(t.grid, opp(color), depth - 1, -beta, -alpha, nodes);
    if (sc > best) best = sc;
    if (best > alpha) alpha = best;
    if (alpha >= beta) break;
  }
  return best;
}

function aiTurn(g: Grid, color: Color, depth: number, blunder: number): Turn | null {
  const turns = enumerateTurns(g, color);
  if (!turns.length) return null;
  // Easy levels sometimes just play a random legal turn, so a learner can win.
  if (Math.random() < blunder) return turns[(Math.random() * turns.length) | 0];
  turns.sort((a, b) => capCount(b) - capCount(a));
  const nodes = { n: 0 };
  let best = -Infinity;
  let choices: Turn[] = [];
  for (const t of turns) {
    const sc = -search(t.grid, opp(color), depth - 1, -Infinity, Infinity, nodes);
    if (sc > best + 1) { best = sc; choices = [t]; }
    else if (Math.abs(sc - best) <= 1) choices.push(t); // vary play among near-equal moves
  }
  return choices[(Math.random() * choices.length) | 0];
}

/* ---- piece movement on the visible board (keeps captured pieces for the animation) ---- */

function applyStepPieces(pieces: Piece[], s: Step): Piece[] {
  return pieces.map((p) => {
    if (p.dead) return p;
    if (s.cap && p.r === s.cap[0] && p.c === s.cap[1]) return { ...p, dead: true }; // eaten → "poof"
    if (p.r === s.fr && p.c === s.fc) return { ...p, r: s.tr, c: s.tc, t: s.crown ? crownOf(p.t) : p.t };
    return p;
  });
}

const firstMsg = (mode: Mode) => (mode === "cpu" ? "É a tua vez! Move uma peça branca." : "Começa! É a vez das brancas.");

const CROWN = (
  <svg viewBox="0 0 24 24" className="dm-crown" aria-hidden>
    <path d="M5 18 L3 8 L8.5 12 L12 5 L15.5 12 L21 8 L19 18 Z" />
  </svg>
);

export function Damas({ onBack }: { onBack: () => void }) {
  const reduced = prefersReducedMotion();
  const [mode, setMode] = useState<Mode>("cpu");
  const [level, setLevel] = useState<Level>("medio"); // computer strength (cpu mode)
  const [started, setStarted] = useState(false); // first move made → hide the mode chooser
  const [pieces, setPieces] = useState<Piece[]>(initPieces);
  const [turn, setTurn] = useState<Color>("w");
  const [sel, setSel] = useState<number | null>(null);
  const [targets, setTargets] = useState<Step[]>([]);
  const [chain, setChain] = useState(false); // mid multi-capture → locked to the eating piece
  const [msg, setMsg] = useState(firstMsg("cpu"));
  const [over, setOver] = useState(false);
  const [win, setWin] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [burst, setBurst] = useState<{ r: number; c: number; key: number } | null>(null);
  const [moving, setMoving] = useState<{ id: number; kind: "walk" | "attack"; key: number } | null>(null);

  const quiet = useRef(0); // half-moves since the last capture / crown (draw clock)
  const burstId = useRef(0);
  const moveId = useRef(0);

  const grid = useMemo(() => gridFromPieces(pieces), [pieces]);
  const selPos = sel !== null ? pieces.find((p) => p.id === sel && !p.dead) : undefined;
  const targetSet = useMemo(() => new Set(targets.map((m) => `${m.tr},${m.tc}`)), [targets]);

  // vs-computer: only White is human. 2-player: both sides are.
  const humanControls = (c: Color) => mode === "2p" || c === "w";

  const clearDead = () => window.setTimeout(() => setPieces((ps) => ps.filter((p) => !p.dead)), reduced ? 0 : 360);

  const popBurst = (r: number, c: number) => {
    if (reduced) return;
    const key = ++burstId.current;
    setBurst({ r, c, key });
    window.setTimeout(() => setBurst((b) => (b && b.key === key ? null : b)), 460);
  };

  const animateMove = (id: number | undefined, capture: boolean) => {
    if (reduced || id == null) return;
    const key = ++moveId.current;
    setMoving({ id, kind: capture ? "attack" : "walk", key });
    window.setTimeout(() => setMoving((mv) => (mv && mv.key === key ? null : mv)), 380);
  };

  // Hand the turn over: update the draw clock, work out the message / game over,
  // and (vs computer) let black think. `np` is the board after the finished turn.
  const endTurn = (np: Piece[], g: Grid, mover: Color, progress: boolean) => {
    quiet.current = progress ? 0 : quiet.current + 1;
    const next = opp(mover);
    const canMove = enumerateTurns(g, next).length > 0;

    if (!canMove) {
      setOver(true);
      if (mode === "cpu") { setWin(mover === "w"); setMsg(mover === "w" ? "Ganhaste! 🎉" : "O computador ganhou. 😅"); }
      else { setWin(true); setMsg(`Ganharam as ${SIDE_PT[mover]}! 🎉`); }
      setTurn(next);
      return;
    }
    if (quiet.current >= DRAW_PLIES) {
      setOver(true); setWin(false); setMsg("Empate! Já ninguém consegue comer.");
      setTurn(next);
      return;
    }

    const mustEat = hasCapture(g, next);
    if (mode === "cpu") setMsg(next === "w" ? (mustEat ? "É a tua vez! Tens de comer." : "É a tua vez!") : "O computador joga…");
    else setMsg(mustEat ? `É a vez das ${SIDE_PT[next]} — têm de comer!` : `É a vez das ${SIDE_PT[next]}.`);
    setTurn(next);
    if (mode === "cpu" && next === "b") {
      setThinking(true);
      window.setTimeout(() => computerTurn(np), reduced ? 220 : 480);
    }
  };

  // Play one step (the shared bit between a human tap and an AI step).
  const playStep = (cur: Piece[], step: Step): Piece[] => {
    const moverId = cur.find((p) => !p.dead && p.r === step.fr && p.c === step.fc)?.id;
    const np = applyStepPieces(cur, step);
    setPieces(np);
    animateMove(moverId, !!step.cap);
    if (step.cap) { popBurst(step.cap[0], step.cap[1]); clearDead(); }
    return np;
  };

  const doHumanStep = (step: Step) => {
    setStarted(true);
    const np = playStep(pieces, step);
    const g2 = gridFromPieces(np);

    // A capture that isn't a crowning and can keep eating → same piece jumps again.
    if (step.cap && !step.crown) {
      const more = captureSteps(g2, step.tr, step.tc);
      if (more.length) {
        const moverId = np.find((p) => !p.dead && p.r === step.tr && p.c === step.tc)?.id ?? null;
        setSel(moverId);
        setTargets(more);
        setChain(true);
        setMsg("Boa! Continua a comer! 🙂");
        return;
      }
    }
    setSel(null);
    setTargets([]);
    setChain(false);
    endTurn(np, g2, turn, !!step.cap || !!step.crown);
  };

  // The computer plays its whole turn, animating each step in sequence. Start
  // from the live pieces — the just-eaten piece has already animated out, so we
  // mustn't carry its stale "dead" entry back in (it would re-poof).
  const computerTurn = (cur: Piece[]) => {
    setThinking(false);
    const live = cur.filter((p) => !p.dead);
    const t = aiTurn(gridFromPieces(live), "b", LEVELS[level].depth, LEVELS[level].blunder);
    if (!t) return; // safety — endTurn already covered "no move"
    const run = (pcs: Piece[], i: number) => {
      const np = playStep(pcs, t.steps[i]);
      if (i + 1 < t.steps.length) window.setTimeout(() => run(np, i + 1), reduced ? 120 : 430);
      else endTurn(np, gridFromPieces(np), "b", capCount(t) > 0 || t.steps.some((s) => s.crown));
    };
    setStarted(true);
    run(live, 0);
  };

  const tapSquare = (r: number, c: number) => {
    if (over || thinking || !humanControls(turn)) return;
    const step = targets.find((s) => s.tr === r && s.tc === c);
    if (step) { doHumanStep(step); return; }
    if (chain) return; // must keep eating with the same piece — ignore other taps
    const p = grid[r][c];
    if (p && colorOf(p) === turn) {
      const id = pieces.find((pc) => !pc.dead && pc.r === r && pc.c === c)!.id;
      setSel(id);
      setTargets(legalForPiece(grid, turn, r, c));
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
    setChain(false);
    setMsg(firstMsg(nextMode));
    setOver(false);
    setWin(false);
    setThinking(false);
    setStarted(false);
    quiet.current = 0;
  };

  return (
    <div className="dv-play">
      {/* One compact row: back · mode (pre-start) · new game · sound. */}
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
        {!started && mode === "cpu" && (
          <div className="dv-segment dv-segment--inline" role="group" aria-label="Nível do computador">
            {(["facil", "medio", "dificil"] as Level[]).map((lv) => (
              <button key={lv} className={`dv-seg ${level === lv ? "is-active" : ""}`} onClick={() => setLevel(lv)} aria-pressed={level === lv}>
                {LEVEL_PT[lv]}
              </button>
            ))}
          </div>
        )}
        <button className="dv-tool dv-tool--wide" onClick={() => newGame()}>
          <Icon name="refresh" size={20} />
          <span>Novo jogo</span>
        </button>
        <Speaker text={msg} className="dv-tool" label="Ouvir" size={22} />
      </div>

      <p className={`dm-msg ${over ? "is-over" : ""}`} aria-live="polite">
        {thinking ? "O computador está a pensar…" : msg}
      </p>

      <div className={`dm-board ${reduced ? "no-anim" : ""}`} role="grid" aria-label="Tabuleiro de damas">
        <div className="dm-squares">
          {Array.from({ length: 64 }, (_, i) => {
            const r = (i / 8) | 0;
            const c = i % 8;
            const isTarget = targetSet.has(`${r},${c}`);
            const isCapture = targets.some((s) => s.tr === r && s.tc === c && s.cap);
            const isSel = !!selPos && selPos.r === r && selPos.c === c;
            return (
              <button
                key={i}
                className={`dm-sq ${(r + c) % 2 ? "dark" : "light"} ${isSel ? "sel" : ""}`}
                onClick={() => tapSquare(r, c)}
                aria-label={`${"abcdefgh"[c]}${8 - r}`}
                disabled={over}
              >
                {isTarget && <span className={`dm-dot ${isCapture ? "cap" : ""}`} aria-hidden />}
              </button>
            );
          })}
        </div>

        <div className="dm-pieces" aria-hidden>
          {pieces.map((p) => {
            const anim = moving && moving.id === p.id ? moving.kind : null;
            return (
              <div
                key={p.id}
                className={`dm-piece ${isWhite(p.t) ? "white" : "black"} ${p.dead ? "dead" : ""} ${p.id === sel ? "sel" : ""}`}
                style={{ transform: `translate(${p.c * 100}%, ${p.r * 100}%)` }}
              >
                <span
                  className={`dm-disc ${anim === "walk" ? "walking" : ""} ${anim === "attack" ? "attacking" : ""}`}
                  style={{ animationDelay: anim ? "0s" : `${(p.id % 7) * 0.22}s` }}
                >
                  {isKing(p.t) && CROWN}
                </span>
              </div>
            );
          })}
          {burst && <span key={burst.key} className="dm-burst" style={{ transform: `translate(${burst.c * 100}%, ${burst.r * 100}%)` }} />}
        </div>
      </div>

      {win && <Confetti pieces={reduced ? 18 : 60} />}
    </div>
  );
}
