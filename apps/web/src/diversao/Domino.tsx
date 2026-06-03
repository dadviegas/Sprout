import { useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent, type KeyboardEvent as RKeyboardEvent } from "react";
import { Icon } from "@sprout/icons";
import { Speaker, Confetti, speak } from "@sprout/ui";
import { prefersReducedMotion } from "./canvas";
import {
  type Tile,
  type Side,
  type Game,
  type Over,
  type DayScore,
  LEVELS,
  PIP_MAP,
  deal,
  canPlay,
  place,
  placeAt,
  canPlaySide,
  fivesPoints,
  cpuPick,
  pips,
  tileName,
  loadScores,
  recordScore,
  todayStr,
  pretty,
  isYesterday,
  overTitle,
  buildOverSay,
} from "./domino-rules";

/* Dominó (2D) — you vs. the computer on a flat SVG/CSS board. The rules, the
 * scoring (all-fives) and the daily record all live in ./domino.ts, shared with
 * the Babylon "2D" board. This file is just the look and the input: drag a tile
 * onto an open end (or tap to auto-place), with read-aloud firing only on a tap. */

const RULES =
  "Dominó de pontas! Cada um fica com sete peças e começa quem tem o duplo mais alto. Arrasta uma peça para uma das pontas da fila, ou toca para a encaixares. Sempre que as duas pontas somam 5, 10 ou 15 ganhas logo esses pontos — e um duplo na ponta conta os dois lados! Fica sem peças para ganhares a ronda e levas os pontos das peças que sobram ao computador. Tu e o computador marcam pontos: tenta marcar mais do que ele. Escolhe o nível: quanto mais difícil, mais valem os pontos.";

/* ---------------- tile rendering ---------------- */

function PipFace({ n }: { n: number }) {
  const on = PIP_MAP[n];
  return (
    <span className="dom-face" aria-hidden>
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className={`dom-pip ${on.includes(i) ? "is-on" : ""}`} />
      ))}
    </span>
  );
}

// Doubles (a == b) stand up vertically, like a real domino set.
function DomTile({ t }: { t: Tile }) {
  return (
    <span className={`dom-tile ${t[0] === t[1] ? "is-double" : ""}`}>
      <PipFace n={t[0]} />
      <span className="dom-div" />
      <PipFace n={t[1]} />
    </span>
  );
}

/* ---------------- the game ---------------- */

interface Flash {
  who: Side;
  n: number;
  id: number;
}

export function Domino({ onBack }: { onBack: () => void }) {
  const reduced = prefersReducedMotion();
  const [levelId, setLevelId] = useState("medio");
  const level = LEVELS.find((l) => l.id === levelId)!;

  const [g, setG] = useState<Game>(deal);
  const [score, setScore] = useState(0); // your points this session
  const [cpuScore, setCpuScore] = useState(0); // the computer's points
  const [placar, setPlacar] = useState<DayScore[]>(loadScores);
  const [flash, setFlash] = useState<Flash | null>(null); // "+N" pop on a score
  const [drag, setDrag] = useState<{ i: number; t: Tile; x: number; y: number } | null>(null);
  const [hoverEnd, setHoverEnd] = useState<"left" | "right" | null>(null);

  // Refs let the computer's delayed turn (and pointer handlers) read the latest
  // state without stale closures.
  const gRef = useRef(g);
  gRef.current = g;
  const scoreRef = useRef(0);
  const cpuScoreRef = useRef(0);
  const levelRef = useRef(level);
  levelRef.current = level;
  const flashIdRef = useRef(0);
  const dragRef = useRef<{ i: number; t: Tile; sx: number; sy: number; moved: boolean } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const leftZoneRef = useRef<HTMLSpanElement>(null);
  const rightZoneRef = useRef<HTMLSpanElement>(null);

  // Credit points to you (also bumps the daily record) or to the computer, and pop a "+N".
  const awardPlayer = (n: number) => {
    if (n <= 0) return;
    const total = scoreRef.current + n;
    scoreRef.current = total;
    setScore(total);
    setPlacar(recordScore(total));
    setFlash({ who: "player", n, id: flashIdRef.current++ });
  };
  const awardCpu = (n: number) => {
    if (n <= 0) return;
    const total = cpuScoreRef.current + n;
    cpuScoreRef.current = total;
    setCpuScore(total);
    setFlash({ who: "cpu", n, id: flashIdRef.current++ });
  };

  // Settle a finished round: the winner scores the loser's remaining pips × multiplier.
  const settle = (winner: Side | "draw", pHand: Tile[], cHand: Tile[]): Over => {
    const mult = levelRef.current.mult;
    if (winner === "player") {
      const pts = pips(cHand) * mult;
      awardPlayer(pts);
      return { winner, points: pts };
    }
    if (winner === "cpu") {
      awardCpu(pips(pHand) * mult);
      return { winner, points: 0 };
    }
    return { winner: "draw", points: 0 };
  };

  const settleBlocked = (pHand: Tile[], cHand: Tile[]): Over => {
    const pp = pips(pHand);
    const cp = pips(cHand);
    return settle(pp < cp ? "player" : cp < pp ? "cpu" : "draw", pHand, cHand);
  };

  // The computer's turn: draw until it can play (or the monte runs dry), then play
  // its pick or pass. Never speaks — that would break the "speech on tap" rule.
  const doCpuTurn = () => {
    const s = gRef.current;
    if (s.turn !== "cpu" || s.over) return;
    let cpu = [...s.cpu];
    let pile = [...s.pile];
    let idx = cpuPick(cpu, s.chain, levelRef.current.strat);
    while (idx < 0 && pile.length) {
      cpu.push(pile.pop()!);
      idx = cpuPick(cpu, s.chain, levelRef.current.strat);
    }
    if (idx < 0) {
      const passes = s.passes + 1;
      const over = passes >= 2 ? settleBlocked(s.hand, cpu) : null;
      setG({ ...s, cpu, pile, passes, turn: over ? "cpu" : "player", over });
      return;
    }
    const chain = place(s.chain, cpu[idx])!;
    cpu = cpu.filter((_, i) => i !== idx);
    awardCpu(fivesPoints(chain) * levelRef.current.mult);
    const over = cpu.length === 0 ? settle("cpu", s.hand, cpu) : null;
    setG({ ...s, cpu, pile, chain, passes: 0, turn: over ? "cpu" : "player", over });
  };

  // Hand the turn to the computer after a short, child-friendly pause.
  useEffect(() => {
    if (g.turn !== "cpu" || g.over) return;
    const id = window.setTimeout(doCpuTurn, reduced ? 450 : 800);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [g.turn, g.over]);

  // Clear the "+N" pop after a moment.
  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 1100);
    return () => clearTimeout(id);
  }, [flash]);

  // The opening tile is auto-played in deal(); whoever opened scores it if it's a five.
  useEffect(() => {
    const f = fivesPoints(g.chain) * level.mult;
    if (g.opener === "player") awardPlayer(f);
    else awardCpu(f);
    // run once for the round dealt on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ----- placing a tile: drag it onto an end, or tap to auto-place ----- */

  const commitPlay = (i: number, side: "left" | "right" | "auto") => {
    const s = gRef.current;
    if (s.turn !== "player" || s.over) return;
    const t = s.hand[i];
    const chain = side === "auto" ? place(s.chain, t) : placeAt(s.chain, t, side);
    if (!chain) {
      speak("Essa peça não encaixa aqui. Procura a ponta com o mesmo número.");
      return;
    }
    const hand = s.hand.filter((_, idx) => idx !== i);
    const gained = fivesPoints(chain) * levelRef.current.mult;
    speak(gained > 0 ? `${tileName(t)}. Mais ${gained} pontos!` : `${tileName(t)}.`);
    awardPlayer(gained);
    const over = hand.length === 0 ? settle("player", hand, s.cpu) : null;
    setG({ ...s, hand, chain, passes: 0, turn: over ? "player" : "cpu", over });
  };

  const hitZone = (ref: { current: HTMLElement | null }, x: number, y: number) => {
    const el = ref.current;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  // Which valid open end is the pointer over right now?
  const endUnder = (x: number, y: number, t: Tile): "left" | "right" | null => {
    const s = gRef.current;
    if (hitZone(leftZoneRef, x, y) && canPlaySide(t, s.chain, "left")) return "left";
    if (hitZone(rightZoneRef, x, y) && canPlaySide(t, s.chain, "right")) return "right";
    return null;
  };

  const startDrag = (i: number, e: RPointerEvent<HTMLDivElement>) => {
    const s = gRef.current;
    if (s.turn !== "player" || s.over) return;
    const t = s.hand[i];
    if (!canPlay(t, s.chain)) {
      speak("Essa peça não encaixa. Procura uma com o mesmo número das pontas.");
      return;
    }
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragRef.current = { i, t, sx: e.clientX, sy: e.clientY, moved: false };
    setDrag({ i, t, x: e.clientX, y: e.clientY });
  };

  const moveDrag = (e: RPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 6) d.moved = true;
    setHoverEnd(endUnder(e.clientX, e.clientY, d.t));
    setDrag({ i: d.i, t: d.t, x: e.clientX, y: e.clientY });
  };

  const endDrag = (e: RPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const end = endUnder(e.clientX, e.clientY, d.t);
    dragRef.current = null;
    setDrag(null);
    setHoverEnd(null);
    if (end) commitPlay(d.i, end);
    else if (!d.moved) commitPlay(d.i, "auto"); // a still tap = auto-place
  };

  const cancelDrag = () => {
    dragRef.current = null;
    setDrag(null);
    setHoverEnd(null);
  };

  const keyPlay = (i: number, e: RKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      commitPlay(i, "auto");
    }
  };

  /* ----- other actions ----- */

  const draw = () => {
    const s = g;
    if (s.turn !== "player" || s.over || !s.pile.length) return;
    const pile = [...s.pile];
    const drew = pile.pop()!;
    speak(`Tiraste o ${tileName(drew)}.`);
    setG({ ...s, hand: [...s.hand, drew], pile });
  };

  const pass = () => {
    const s = g;
    if (s.turn !== "player" || s.over) return;
    speak("Passas a vez.");
    const passes = s.passes + 1;
    const over = passes >= 2 ? settleBlocked(s.hand, s.cpu) : null;
    setG({ ...s, passes, turn: over ? "player" : "cpu", over });
  };

  // Deal a fresh round; whoever opens scores the opening tile if it's a five.
  const startRound = () => {
    const ng = deal();
    setG(ng);
    const f = fivesPoints(ng.chain) * levelRef.current.mult;
    if (ng.opener === "player") awardPlayer(f);
    else awardCpu(f);
  };

  const chooseLevel = (id: string) => {
    setLevelId(id);
    startRound();
  };

  /* ----- derived bits for the UI ----- */

  const playerCanMove = g.hand.some((t) => canPlay(t, g.chain));
  const canDraw = g.turn === "player" && !g.over && !playerCanMove && g.pile.length > 0;
  const canPass = g.turn === "player" && !g.over && !playerCanMove && g.pile.length === 0;
  const yourTurn = g.turn === "player" && !g.over;

  const today = todayStr();
  const todayBest = useMemo(() => placar.find((d) => d.date === today)?.best ?? 0, [placar, today]);
  const record = useMemo(() => placar.reduce<DayScore | null>((m, d) => (!m || d.best > m.best ? d : m), null), [placar]);
  const prevDay = useMemo(() => placar.filter((d) => d.date !== today).sort((a, b) => (a.date < b.date ? 1 : -1))[0], [placar, today]);

  const placarSay = [
    `Tens ${score} ${score === 1 ? "ponto" : "pontos"} e o computador tem ${cpuScore}.`,
    todayBest ? `O teu melhor de hoje é ${todayBest}.` : "Ainda não marcaste o teu melhor de hoje.",
    record ? `O teu recorde é ${record.best}.` : "",
    prevDay ? `No dia ${pretty(prevDay.date)} fizeste ${prevDay.best}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const status = g.over
    ? null
    : yourTurn
    ? canDraw
      ? "Não tens jogada — tira uma peça do monte."
      : canPass
      ? "Não há peças para tirar. Tens de passar."
      : "É a tua vez! Arrasta uma peça para uma ponta — ou toca para jogar."
    : "O computador está a pensar…";

  const overSay = g.over && buildOverSay(g.over, score, record, prevDay, today);

  const dragging = !!drag;
  const liveL = dragging && canPlaySide(drag!.t, g.chain, "left");
  const liveR = dragging && canPlaySide(drag!.t, g.chain, "right");

  return (
    <div className="dv-play">
      {/* One compact row, like xadrez/damas: back · nível · nova ronda · regras. */}
      <div className="dv-toolbar" role="toolbar">
        <button className="dv-tool dv-tool--wide" onClick={onBack} aria-label="Voltar aos jogos">
          <Icon name="back" size={20} />
          <span>Voltar aos jogos</span>
        </button>
        <div className="dv-segment dv-segment--inline" role="group" aria-label="Nível de dificuldade">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              className={`dv-seg ${levelId === l.id ? "is-active" : ""}`}
              onClick={() => chooseLevel(l.id)}
              aria-pressed={levelId === l.id}
            >
              {l.label} <small>×{l.mult}</small>
            </button>
          ))}
        </div>
        <button className="dv-tool dv-tool--wide" onClick={startRound}>
          <Icon name="refresh" size={20} />
          <span>Nova ronda</span>
        </button>
        <Speaker text={RULES} className="dv-tool" label="Ouvir as regras" size={22} />
      </div>

      {/* The match score: you vs. the computer, each with its own "+N" pop. */}
      <div className="dv-scorebar dom-scores">
        <span className="dv-score dom-score--you">
          <Icon name="star" size={18} fill="currentColor" /> Tu: {score}
          {flash?.who === "player" && (
            <span key={flash.id} className={`dom-flash ${reduced ? "no-anim" : ""}`}>+{flash.n}</span>
          )}
        </span>
        <span className="dv-score dom-score--cpu">
          Robô: {cpuScore}
          {flash?.who === "cpu" && (
            <span key={flash.id} className={`dom-flash ${reduced ? "no-anim" : ""}`}>+{flash.n}</span>
          )}
        </span>
      </div>

      <div className="dom-meta-row">
        <span className="dom-chip">
          <Icon name="apple" size={15} /> Robô tem {g.cpu.length} {g.cpu.length === 1 ? "peça" : "peças"}
        </span>
        <span className="dom-chip">Monte: {g.pile.length}</span>
      </div>

      <div className="dom-placar">
        <span className="dom-placar__item">
          <Icon name="trophy" size={16} /> Recorde: <b>{record ? record.best : 0}</b>
          {record && record.date !== today ? <small>{pretty(record.date)}</small> : null}
        </span>
        <span className="dom-placar__item">
          <Icon name="star" size={16} /> Hoje: <b>{todayBest}</b>
        </span>
        {prevDay ? (
          <span className="dom-placar__item">
            <Icon name="calendar" size={16} /> {isYesterday(prevDay.date) ? "Ontem" : pretty(prevDay.date)}: <b>{prevDay.best}</b>
          </span>
        ) : null}
        <Speaker text={placarSay} className="dv-tool dom-placar__speak" label="Ouvir a pontuação" size={18} />
      </div>

      <div className="dom-board" ref={boardRef}>
        <div className={`dom-board__inner ${dragging ? "is-dragging" : ""}`}>
          <span
            ref={leftZoneRef}
            className={`dom-zone ${liveL ? "is-live" : ""} ${hoverEnd === "left" ? "is-over" : ""}`}
            aria-hidden
          >
            ◀
          </span>
          {g.chain.map((t, i) => (
            <DomTile key={i} t={t} />
          ))}
          <span
            ref={rightZoneRef}
            className={`dom-zone ${liveR ? "is-live" : ""} ${hoverEnd === "right" ? "is-over" : ""}`}
            aria-hidden
          >
            ▶
          </span>
        </div>
      </div>

      {status ? <p className="dom-status">{status}</p> : null}

      <div className="dom-hand" role="group" aria-label="As tuas peças">
        {g.hand.map((t, i) => {
          const ok = canPlay(t, g.chain);
          const lifted = drag?.i === i;
          return (
            <div
              key={i}
              role="button"
              tabIndex={yourTurn ? 0 : -1}
              className={`dom-hand__tile ${yourTurn && ok ? "is-playable" : ""} ${yourTurn && !ok ? "is-dead" : ""} ${lifted ? "is-lifted" : ""}`}
              onPointerDown={(e) => startDrag(i, e)}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={cancelDrag}
              onKeyDown={(e) => keyPlay(i, e)}
              aria-label={`Peça ${tileName(t)}${ok ? ", podes jogar" : ""}`}
            >
              <DomTile t={t} />
            </div>
          );
        })}
      </div>

      {(canDraw || canPass) && (
        <div className="dom-actions">
          {canDraw && (
            <button className="dv-tool dv-tool--wide" onClick={draw}>
              <Icon name="forward" size={20} />
              <span>Tirar peça do monte</span>
            </button>
          )}
          {canPass && (
            <button className="dv-tool dv-tool--wide" onClick={pass}>
              <Icon name="forward" size={20} />
              <span>Passar a vez</span>
            </button>
          )}
        </div>
      )}

      {/* The tile that follows your finger while dragging. */}
      {drag && (
        <div className="dom-ghost" style={{ left: drag.x, top: drag.y }} aria-hidden>
          <DomTile t={drag.t} />
        </div>
      )}

      {g.over && (
        <div className="dv-win">
          {g.over.winner === "player" && <Confetti pieces={reduced ? 16 : 50} />}
          <p>{overTitle(g.over)}</p>
          <Speaker text={overSay || overTitle(g.over)} className="dv-tool" label="Ouvir o resultado" size={20} />
          <button className="dv-tool dv-tool--wide" onClick={startRound}>
            <Icon name="refresh" size={20} />
            <span>Jogar outra vez</span>
          </button>
        </div>
      )}
    </div>
  );
}
