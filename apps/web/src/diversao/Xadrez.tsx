import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@sprout/icons";
import { Speaker, Confetti } from "@sprout/ui";
import { prefersReducedMotion } from "./canvas";
import { pieceArt } from "./pieces";
import { RivePiece } from "./rive-piece";
import {
  type Color, type Grid, type Mode, type Level, type Move, type Piece, type Dir, type Rights,
  FULL_RIGHTS, GLYPH, PIECE_NAME, LEVEL_PT, LEVELS,
  isWhite, colorOf, opp, initPieces, gridFromPieces, legalMoves, findKing,
  updateRights, positionKey, evaluateStatus, describe, firstMsg, aiMove, applyMovePieces,
} from "./chess";

/* Xadrez — a full chess game, against the built-in computer OR two players on
 * the same device (pass-and-play). The rules engine (legal moves incl. roque,
 * promotion, check/checkmate, the draw rules, and the computer player) lives in
 * chess.ts and is shared with the 3D board; this file is the 2D board + its UI.
 *
 * Graphics: the pieces are little CHARACTERS that stride to their square and strike
 * when they capture (a captured piece is knocked off and the board jolts). Each square
 * shows, in order: a dropped-in cool character image (static/characters/<piece>-<color>.png)
 * or animated Rive file (…<piece>-<color>.riv) — see that folder's README; else the
 * built-in rigged inline-SVG character (pieces.tsx) whose limbs articulate; else the
 * Unicode glyph. Art can be added one piece at a time — see PieceFigure / characterBase
 * below and the .xb-* styles in diversao.css. */

// Drop-in character art lives at static/characters/<piece>-<color>.<ext> (see that
// folder's README). Two ways, in priority order: a still IMAGE (.png — the easy path:
// generate a cool character with any image AI) or an animated RIVE file (.riv). A piece
// with no art file falls back to the built-in SVG / glyph, so the board works before any
// art exists and degrades one piece at a time.
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
  const [level, setLevel] = useState<Level>("medio"); // computer strength (cpu mode)
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
    const m = aiMove(gBefore, "b", rights.current, LEVELS[level].depth, LEVELS[level].blunder);
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
        {mode === "cpu" && (
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
