import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Icon } from "@sprout/icons";
import { Speaker, Confetti, speak } from "@sprout/ui";
import { fitCanvas, pointerPos, prefersReducedMotion } from "./canvas";
import { MEM_ART, MEM_BACK, type MemArt } from "./mem-art";
import { Xadrez } from "./Xadrez";
import { Damas } from "./Damas";

/* Jogos — a little arcade. The hub shows game cards; picking one swaps to it
 * with a "Voltar aos jogos" button (kept in local state, so it stays inside the
 * diversao/jogos nav entry). Three small, touch-first, read-aloud games. All
 * speech fires from taps/speaker buttons only — never on mount.
 *
 * Emoji are used INSIDE the games (game content, not chrome) — allowed by the
 * project conventions; the chrome (buttons, back arrow) uses @sprout/icons. */

type GameId = "xadrez" | "damas" | "memoria" | "sequencia" | "apanha" | "toupeira" | "conta" | "soma";

/* Each tile gets a little illustrated scene (same playful, multi-colour spirit
 * as the memory-card art) on a 0 0 48 48 grid, tinted with the tile's accent via
 * var(--c). var() resolves only through CSS, so accent fills go via `style`,
 * never an SVG presentation attribute. */
const sparkle = (cx: number, cy: number, s: number, fill: string) => (
  <path
    d="M24 10l3.2 9.8 9.8 3.2-9.8 3.2L24 36l-3.2-9.8L11 23l9.8-3.2z"
    style={{ fill }}
    transform={`translate(${cx - 24 * s} ${cy - 23 * s}) scale(${s})`}
  />
);

// Memória — two matching cards, fanned, each with the same sparkle.
const ART_MEMORIA = (
  <g>
    <g transform="rotate(-13 17 27)">
      <rect x="7" y="13" width="19" height="26" rx="3.5" style={{ fill: "var(--c)" }} />
      {sparkle(16.5, 26, 0.4, "#ffffff")}
    </g>
    <g transform="rotate(13 31 25)">
      <rect x="22" y="11" width="19" height="26" rx="3.5" fill="#ffffff" stroke="#dde3ea" strokeWidth="1.5" />
      {sparkle(31.5, 24, 0.4, "var(--c)")}
    </g>
  </g>
);

// Sequência de cores — Simon-style 2×2 pads, the top-left one "lit".
const ART_SEQUENCIA = (
  <g>
    <rect x="6" y="6" width="16" height="16" rx="4" fill="#ff5d73" />
    <rect x="26" y="6" width="16" height="16" rx="4" fill="#ffce3a" />
    <rect x="6" y="26" width="16" height="16" rx="4" fill="#36c5f0" />
    <rect x="26" y="26" width="16" height="16" rx="4" fill="#3fbf6f" />
    <rect x="4" y="4" width="20" height="20" rx="5.5" fill="none" stroke="#ffffff" strokeWidth="2.5" />
  </g>
);

// Apanha a fruta — an apple plus a small falling fruit and motion trails.
const ART_APANHA = (
  <g>
    <g style={{ stroke: "var(--c)" }} strokeWidth="2.5" strokeLinecap="round" opacity="0.4">
      <line x1="11" y1="5" x2="11" y2="12" />
      <line x1="19" y1="3" x2="19" y2="9" />
    </g>
    <rect x="11.6" y="13" width="2.2" height="6" rx="1.1" fill="#7a4a1e" transform="rotate(-14 12.7 16)" />
    <circle cx="12.5" cy="20" r="6" fill="#ffa23a" />
    <g transform="translate(15 14) scale(0.64)">
      <path d="M24 16c-6-4-15 0-15 10s9 16 15 16 15-6 15-16-9-14-15-10z" fill="#ff4d4d" />
      <rect x="22.7" y="8" width="2.6" height="8" rx="1.3" fill="#7a4a1e" />
      <path d="M25 12c3-3 8-3 9-1-1 3-6 4-9 1z" fill="#3fbf6f" />
    </g>
  </g>
);

// Apanha a toupeira — a mole peeking out of a hole in a grassy mound.
const ART_TOUPEIRA = (
  <g>
    <path d="M5 41c0-11 8-18 19-18s19 7 19 18z" fill="#7bbf57" />
    <ellipse cx="24" cy="41" rx="12" ry="5" fill="#5a3a1e" />
    <ellipse cx="24" cy="41" rx="8.5" ry="3.4" fill="#33220f" />
    <circle cx="24" cy="31" r="9" fill="#9b7e63" />
    <ellipse cx="24" cy="34.5" rx="5" ry="3.6" fill="#d8c0a3" />
    <circle cx="24" cy="34" r="1.7" fill="#e8638f" />
    <circle cx="20.4" cy="29.5" r="1.5" fill="#22303c" />
    <circle cx="27.6" cy="29.5" r="1.5" fill="#22303c" />
  </g>
);

// Conta comigo — three numbered blocks climbing 1 · 2 · 3.
const ART_CONTA = (
  <g style={{ fontFamily: "var(--font-display)", fontWeight: 800 }} textAnchor="middle" dominantBaseline="central">
    <g transform="rotate(-8 14 30)">
      <rect x="6" y="22" width="16" height="16" rx="3.5" style={{ fill: "var(--c)" }} />
      <text x="14" y="30" fontSize="11" fill="#ffffff">1</text>
    </g>
    <g transform="rotate(7 26 25)">
      <rect x="18" y="17" width="16" height="16" rx="3.5" fill="#ffce3a" />
      <text x="26" y="25" fontSize="11" fill="#1c2530">2</text>
    </g>
    <g transform="rotate(-5 38 19)">
      <rect x="30" y="11" width="16" height="16" rx="3.5" fill="#36c5f0" />
      <text x="38" y="19" fontSize="11" fill="#ffffff">3</text>
    </g>
  </g>
);

// Soma rápida — a plus badge (accent) and a minus badge, for "o mais e o menos".
const ART_SOMA = (
  <g style={{ fontFamily: "var(--font-display)", fontWeight: 800 }} textAnchor="middle" dominantBaseline="central">
    <g transform="rotate(-6 18 20)">
      <rect x="8" y="10" width="20" height="20" rx="5.5" style={{ fill: "var(--c)" }} />
      <text x="18" y="20.5" fontSize="16" fill="#ffffff">+</text>
    </g>
    <g transform="rotate(7 32 30)">
      <rect x="22" y="20" width="20" height="20" rx="5.5" fill="#ffce3a" />
      <text x="32" y="30.5" fontSize="16" fill="#1c2530">−</text>
    </g>
  </g>
);

// Xadrez — a little wooden board with a knight, the marquee "complex" game.
const ART_XADREZ = (
  <g>
    <rect x="6" y="6" width="36" height="36" rx="6" fill="#f1e7d2" />
    <g style={{ fill: "var(--c)" }}>
      <rect x="6" y="6" width="12" height="12" />
      <rect x="30" y="6" width="12" height="12" />
      <rect x="18" y="18" width="12" height="12" />
      <rect x="6" y="30" width="12" height="12" />
      <rect x="30" y="30" width="12" height="12" />
    </g>
    <rect x="6" y="6" width="36" height="36" rx="6" fill="none" style={{ stroke: "var(--c)" }} strokeWidth="2" />
    <text x="24" y="25" textAnchor="middle" dominantBaseline="central" fontSize="28" fill="#1c2530">♞</text>
  </g>
);

// Damas — the same wooden board with a crowned "dama" (two stacked discs).
const ART_DAMAS = (
  <g>
    <rect x="6" y="6" width="36" height="36" rx="6" fill="#f1e7d2" />
    <g style={{ fill: "var(--c)" }}>
      <rect x="6" y="6" width="12" height="12" />
      <rect x="30" y="6" width="12" height="12" />
      <rect x="18" y="18" width="12" height="12" />
      <rect x="6" y="30" width="12" height="12" />
      <rect x="30" y="30" width="12" height="12" />
    </g>
    <rect x="6" y="6" width="36" height="36" rx="6" fill="none" style={{ stroke: "var(--c)" }} strokeWidth="2" />
    <ellipse cx="24" cy="32" rx="9" ry="3.2" fill="#1c2530" opacity="0.16" />
    <circle cx="24" cy="28" r="8" fill="#fbfbf7" stroke="#cdbfa6" strokeWidth="1.5" />
    <circle cx="24" cy="22" r="8" fill="#fbfbf7" stroke="#cdbfa6" strokeWidth="1.5" />
    <path d="M19 23 L17.6 17 L21 19.5 L24 14.5 L27 19.5 L30.4 17 L29 23 Z" style={{ fill: "var(--c)" }} />
  </g>
);

const GAMES: { id: GameId; art: ReactNode; accent: string; accentSoft: string; label: string; blurb: string; rules: string }[] = [
  { id: "xadrez", art: ART_XADREZ, accent: "var(--subj-hgp)", accentSoft: "var(--subj-hgp-soft)", label: "Xadrez", blurb: "Joga contra o computador ou um amigo.", rules: "Xadrez. Toca numa peça branca e depois no quadrado para onde queres ir. Dá xeque-mate ao rei! Podes jogar contra o computador ou contra um amigo na mesma máquina." },
  { id: "damas", art: ART_DAMAS, accent: "var(--subj-fis)", accentSoft: "var(--subj-fis-soft)", label: "Damas", blurb: "Salta por cima e come as peças.", rules: "Damas. Toca numa peça branca e depois no quadrado em diagonal para onde queres ir. Salta por cima de uma peça do adversário para a comeres — e se puderes comer, tens de comer! Chega ao outro lado para a tua peça virar dama e poder andar para todos os lados. Joga contra o computador ou contra um amigo." },
  { id: "memoria", art: ART_MEMORIA, accent: "var(--subj-en)", accentSoft: "var(--subj-en-soft)", label: "Memória", blurb: "Encontra os pares iguais.", rules: "Jogo da memória. Toca em duas cartas para as virar. Se forem iguais, ficam viradas. Encontra todos os pares!" },
  { id: "sequencia", art: ART_SEQUENCIA, accent: "var(--subj-mundo)", accentSoft: "var(--subj-mundo-soft)", label: "Sequência de cores", blurb: "Decora e repete as cores.", rules: "Sequência de cores. Vê a ordem das cores que se acendem e repete tocando nelas pela mesma ordem. A cada ronda fica mais comprida!" },
  { id: "apanha", art: ART_APANHA, accent: "var(--joy)", accentSoft: "var(--joy-soft)", label: "Apanha a fruta", blurb: "Toca na fruta antes de cair.", rules: "Apanha a fruta! Toca na fruta enquanto ela cai para a apanhares. Quantas consegues apanhar?" },
  { id: "toupeira", art: ART_TOUPEIRA, accent: "var(--subj-cid)", accentSoft: "var(--subj-cid-soft)", label: "Apanha a toupeira", blurb: "Toca nas toupeiras que aparecem.", rules: "Apanha a toupeira! As toupeiras aparecem nos buracos. Toca nelas depressa antes que desapareçam. Tens trinta segundos!" },
  { id: "conta", art: ART_CONTA, accent: "var(--subj-mat)", accentSoft: "var(--subj-mat-soft)", label: "Conta comigo", blurb: "Conta e toca no número certo.", rules: "Conta comigo. Conta quantas coisas há e toca no número certo." },
  { id: "soma", art: ART_SOMA, accent: "var(--subj-edm)", accentSoft: "var(--subj-edm-soft)", label: "Soma rápida", blurb: "Resolve as contas de somar e tirar.", rules: "Soma rápida. Vê a conta e toca no resultado certo. Treina o mais e o menos!" },
];

export function Jogos() {
  const [game, setGame] = useState<GameId | "hub">("hub");

  if (game === "hub") {
    return (
      <div className="dv-room-screen">
        <div className="dv-games">
          {GAMES.map((g) => (
            <div className="dv-room-slot" key={g.id} style={{ ["--c" as string]: g.accent, ["--c-soft" as string]: g.accentSoft }}>
              <button className="dv-room" onClick={() => setGame(g.id)}>
                <span className="dv-room__icon" aria-hidden>
                  <svg viewBox="0 0 48 48" className="dv-room__art">{g.art}</svg>
                </span>
                <span className="dv-room__label">{g.label}</span>
                <span className="dv-room__blurb">{g.blurb}</span>
              </button>
              <Speaker text={`${g.label}. ${g.blurb}`} className="dv-room__speak" label={`Ouvir: ${g.label}`} size={18} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const meta = GAMES.find((g) => g.id === game)!;
  // Chess and damas carry their own compact toolbar (with the back button) so all
  // their controls sit on one row, leaving the most height for the board.
  if (game === "xadrez") return <Xadrez onBack={() => setGame("hub")} />;
  if (game === "damas") return <Damas onBack={() => setGame("hub")} />;
  return (
    <GameFrame onBack={() => setGame("hub")} say={meta.rules}>
      {game === "memoria" && <Memoria />}
      {game === "sequencia" && <Sequencia />}
      {game === "apanha" && <Apanha />}
      {game === "toupeira" && <Toupeira />}
      {game === "conta" && <Conta />}
      {game === "soma" && <Soma />}
    </GameFrame>
  );
}

/* Shared frame: a back button + a speaker that reads the game's rules. */
function GameFrame({ onBack, say, children }: { onBack: () => void; say: string; children: ReactNode }) {
  return (
    <div className="dv-room-screen">
      <div className="dv-toolbar" role="toolbar">
        <button className="dv-tool dv-tool--wide" onClick={onBack} aria-label="Voltar aos jogos">
          <Icon name="back" size={20} />
          <span>Voltar aos jogos</span>
        </button>
        <Speaker text={say} className="dv-tool" label="Ouvir as regras" size={22} />
      </div>
      {children}
    </div>
  );
}

/* ---------------- Memória ---------------- */

// Difficulty = how many pairs (so 6 / 12 / 20 cards). Each game draws a random
// subset from MEM_ART, so adding more art just adds variety.
const MEM_SIZES = [
  { id: "facil", label: "Fácil", pairs: 3 },
  { id: "medio", label: "Médio", pairs: 6 },
  { id: "dificil", label: "Difícil", pairs: 10 },
];

interface MemCard {
  art: MemArt;
  flipped: boolean;
  matched: boolean;
}

function makeDeck(pairs: number): MemCard[] {
  const pool = [...MEM_ART];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const deck = pool.slice(0, Math.min(pairs, pool.length)).flatMap((art) => [
    { art, flipped: false, matched: false },
    { art, flipped: false, matched: false },
  ]);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function Memoria() {
  const reduced = prefersReducedMotion();
  const [pairs, setPairs] = useState(6);
  const [cards, setCards] = useState<MemCard[]>(() => makeDeck(6));
  const [open, setOpen] = useState<number[]>([]);
  const [lock, setLock] = useState(false);
  const [won, setWon] = useState(false);

  // Restart with a chosen number of pairs (also used by "Jogar outra vez").
  const start = (p: number) => {
    setPairs(p);
    setCards(makeDeck(p));
    setOpen([]);
    setLock(false);
    setWon(false);
  };

  const flip = (i: number) => {
    if (lock || won || cards[i].matched || open.includes(i)) return;
    const nextOpen = [...open, i];
    setCards((cs) => cs.map((c, idx) => (idx === i ? { ...c, flipped: true } : c)));
    setOpen(nextOpen);
    if (nextOpen.length < 2) return;

    setLock(true);
    const [a, b] = nextOpen;
    if (cards[a].art.id === cards[b].art.id) {
      const willWin = cards.filter((c) => c.matched).length + 2 === cards.length;
      speak(willWin ? "Boa! Encontraste todos os pares!" : `${cards[a].art.name}! Acertaste!`);
      if (willWin) setWon(true);
      window.setTimeout(() => {
        setCards((cs) => cs.map((c) => (c.art.id === cards[a].art.id ? { ...c, matched: true } : c)));
        setOpen([]);
        setLock(false);
      }, 550);
    } else {
      window.setTimeout(() => {
        setCards((cs) => cs.map((c, idx) => (idx === a || idx === b ? { ...c, flipped: false } : c)));
        setOpen([]);
        setLock(false);
      }, 900);
    }
  };

  // A roughly-square grid: columns = ceil(√cards).
  const cols = Math.ceil(Math.sqrt(cards.length));

  return (
    <div className="dv-play">
      <div className="dv-segment" role="group" aria-label="Quantas cartas">
        {MEM_SIZES.map((s) => (
          <button
            key={s.id}
            className={`dv-seg ${pairs === s.pairs ? "is-active" : ""}`}
            onClick={() => start(s.pairs)}
            aria-pressed={pairs === s.pairs}
          >
            {s.label}
            <small>{s.pairs * 2} cartas</small>
          </button>
        ))}
      </div>

      <div
        className={`mem-grid ${reduced ? "no-anim" : ""}`}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, maxWidth: cols * 104 }}
      >
        {cards.map((c, i) => {
          const up = c.flipped || c.matched;
          return (
            <button
              key={i}
              className={`mem-card ${up ? "is-up" : ""} ${c.matched ? "is-matched" : ""}`}
              onClick={() => flip(i)}
              aria-label={up ? c.art.name : "Carta virada"}
            >
              <svg viewBox="0 0 48 48" className={up ? "mem-art" : "mem-art mem-back"} aria-hidden>
                {up ? c.art.node : MEM_BACK}
              </svg>
            </button>
          );
        })}
      </div>

      {won && (
        <div className="dv-win">
          <Confetti pieces={reduced ? 16 : 50} />
          <p>Ganhaste! 🎉</p>
          <button className="dv-tool dv-tool--wide" onClick={() => start(pairs)}>
            <Icon name="refresh" size={20} />
            <span>Jogar outra vez</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Apanha a fruta ---------------- */

const FRUITS = ["🍎", "🍌", "🍓", "🍊", "🍇", "🍐"];

interface Fruit {
  x: number;
  y: number;
  vy: number;
  size: number;
  emoji: string;
}

function Apanha() {
  const reduced = prefersReducedMotion();
  const [score, setScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fruitsRef = useRef<Fruit[]>([]);
  const scoreRef = useRef(0);
  scoreRef.current = score;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const fruits = fruitsRef.current;
    let raf = 0;
    let last = 0;
    let sinceSpawn = 0;
    const spawnEvery = reduced ? 1.4 : 0.85;
    const baseSpeed = reduced ? 90 : 150;

    const step = (t: number) => {
      const { w, h } = fitCanvas(canvas, ctx);
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      ctx.clearRect(0, 0, w, h);

      sinceSpawn += dt;
      if (sinceSpawn >= spawnEvery && fruits.length < 14) {
        sinceSpawn = 0;
        const size = 40;
        fruits.push({
          x: size + Math.random() * Math.max(1, w - size * 2),
          y: -size,
          vy: baseSpeed + scoreRef.current * 3, // speeds up as you score
          size,
          emoji: FRUITS[(Math.random() * FRUITS.length) | 0],
        });
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = fruits.length - 1; i >= 0; i--) {
        const f = fruits[i];
        f.y += f.vy * dt;
        if (f.y > h + f.size) {
          fruits.splice(i, 1);
          continue;
        }
        ctx.font = `${f.size}px serif`;
        ctx.fillText(f.emoji, f.x, f.y);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const tap = (e: PointerEvent) => {
      const { x, y } = pointerPos(canvas, e);
      for (let i = fruits.length - 1; i >= 0; i--) {
        const f = fruits[i];
        if (Math.hypot(x - f.x, y - f.y) <= f.size * 0.7) {
          fruits.splice(i, 1);
          setScore((s) => s + 1);
          break; // one fruit per tap
        }
      }
    };
    canvas.addEventListener("pointerdown", tap);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", tap);
      fruits.length = 0;
    };
  }, [reduced]);

  return (
    <div className="dv-play">
      <div className="dv-scorebar">
        <span className="dv-score">
          <Icon name="apple" size={18} /> {score}
        </span>
        <button
          className="dv-tool"
          onClick={() => { fruitsRef.current.length = 0; setScore(0); }}
          aria-label="Recomeçar"
          title="Recomeçar"
        >
          <Icon name="refresh" size={20} />
        </button>
      </div>
      <canvas ref={canvasRef} className="dv-canvas dv-canvas--game" aria-label="Apanha a fruta — toca na fruta enquanto cai" />
    </div>
  );
}

/* ---------------- Conta comigo ---------------- */

const COUNT_EMOJI = ["🍎", "⭐", "🐟", "🌸", "🎈", "🐞"];
const randInt = (a: number, b: number) => a + ((Math.random() * (b - a + 1)) | 0);

function countOptions(n: number): number[] {
  // Prefer distractors near n, but fall back to the whole 1..10 range so we can
  // always reach 4 distinct options — even at the edges (e.g. n=1, where ±2 only
  // yields {1,2,3}). Drawing from a finite candidate list also guarantees the
  // loop terminates (a `while (size < 4)` over a clamped ±2 range would not).
  const opts = new Set<number>([n]);
  const candidates = [n - 1, n + 1, n - 2, n + 2, n - 3, n + 3, ...Array.from({ length: 10 }, (_, i) => i + 1)];
  for (const c of candidates) {
    if (opts.size >= 4) break;
    if (c >= 1 && c <= 10) opts.add(c);
  }
  const arr = [...opts];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Conta() {
  const [round, setRound] = useState(() => newRound());
  const [right, setRight] = useState(0);

  function newRound() {
    const n = randInt(1, 9);
    return { n, emoji: COUNT_EMOJI[(Math.random() * COUNT_EMOJI.length) | 0], options: countOptions(n) };
  }

  const answer = (v: number) => {
    if (v === round.n) {
      setRight((r) => r + 1);
      speak(`Boa! São ${round.n}!`);
      window.setTimeout(() => setRound(newRound()), 700);
    } else {
      speak("Quase! Conta outra vez.");
    }
  };

  return (
    <div className="dv-play dv-conta">
      <div className="dv-scorebar">
        <span className="dv-score"><Icon name="star" size={18} fill="currentColor" /> {right}</span>
      </div>
      <p className="dv-conta__q">Quantos há?</p>
      <div className="dv-conta__objects" aria-label={`${round.n} objetos para contar`}>
        {Array.from({ length: round.n }, (_, i) => (
          <span key={i} aria-hidden>{round.emoji}</span>
        ))}
      </div>
      <div className="dv-conta__options">
        {round.options.map((v) => (
          <button key={v} className="dv-num" onClick={() => answer(v)} aria-label={`${v}`}>
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Sequência de cores (Simon) ---------------- */

const SIMON_PADS = [
  { id: "vermelho", name: "vermelho", color: "#ff5d73" },
  { id: "azul", name: "azul", color: "#36c5f0" },
  { id: "verde", name: "verde", color: "#3fbf6f" },
  { id: "amarelo", name: "amarelo", color: "#ffce3a" },
];

function Sequencia() {
  const reduced = prefersReducedMotion();
  const [seq, setSeq] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [showing, setShowing] = useState(false); // replaying the sequence → input locked
  const [inputIdx, setInputIdx] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const timers = useRef<number[]>([]);
  const inputRef = useRef(0);
  inputRef.current = inputIdx;

  const clearTimers = () => { timers.current.forEach((t) => clearTimeout(t)); timers.current = []; };
  useEffect(() => clearTimers, []);

  // Flash the whole sequence (and speak each colour). Triggered only by a tap on
  // "Começar" / "Ver outra vez", so this read-aloud still fires from a tap.
  const playback = (s: number[]) => {
    setShowing(true);
    clearTimers();
    const step = reduced ? 950 : 760;
    s.forEach((pad, i) => {
      timers.current.push(window.setTimeout(() => {
        setActive(pad);
        speak(SIMON_PADS[pad].name);
        timers.current.push(window.setTimeout(() => setActive(null), step * 0.55));
      }, 450 + i * step));
    });
    timers.current.push(window.setTimeout(() => { setShowing(false); setInputIdx(0); }, 450 + s.length * step));
  };

  const startNew = () => {
    const s = [(Math.random() * 4) | 0];
    setSeq(s);
    setOver(false);
    setBest(0);
    setInputIdx(0);
    playback(s);
  };

  const replay = () => { if (!showing && seq.length) playback(seq); };

  const tap = (pad: number) => {
    if (showing || over || seq.length === 0) return;
    setActive(pad);
    speak(SIMON_PADS[pad].name);
    window.setTimeout(() => setActive(null), 160);
    const idx = inputRef.current;
    if (pad === seq[idx]) {
      if (idx + 1 === seq.length) {
        // Round complete → grow the sequence by one and replay it.
        setBest(seq.length);
        setShowing(true); // lock input during the short pause before the next playback
        window.setTimeout(() => {
          const s = [...seq, (Math.random() * 4) | 0];
          setSeq(s);
          playback(s);
        }, 650);
      } else {
        setInputIdx(idx + 1);
      }
    } else {
      setOver(true);
      speak("Quase! Tenta outra vez.");
    }
  };

  const idle = seq.length === 0;
  return (
    <div className="dv-play">
      <div className="dv-scorebar">
        <span className="dv-score"><Icon name="star" size={18} fill="currentColor" /> {idle ? 0 : seq.length}</span>
        <button className="dv-tool" onClick={replay} disabled={showing || idle} aria-label="Ver a sequência outra vez" title="Ver outra vez">
          <Icon name="refresh" size={20} />
        </button>
      </div>
      <div className={`simon ${reduced ? "no-anim" : ""}`}>
        {SIMON_PADS.map((p, i) => (
          <button
            key={p.id}
            className={`simon-pad ${active === i ? "is-active" : ""}`}
            style={{ ["--pad" as string]: p.color }}
            onClick={() => tap(i)}
            aria-label={p.name}
            disabled={showing || idle || over}
          />
        ))}
      </div>
      {(idle || over) && (
        <div className="dv-win">
          {over && <p>Acertaste {best} {best === 1 ? "cor" : "cores"}! 🎉</p>}
          <button className="dv-tool dv-tool--wide" onClick={startNew}>
            <Icon name={over ? "refresh" : "forward"} size={20} />
            <span>{over ? "Jogar outra vez" : "Começar"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Apanha a toupeira (whack-a-mole) ---------------- */

function Toupeira() {
  const reduced = prefersReducedMotion();
  const [moleAt, setMoleAt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [phase, setPhase] = useState<"idle" | "playing" | "over">("idle");
  const scoreRef = useRef(0);
  scoreRef.current = score;

  useEffect(() => {
    if (phase !== "playing") return;
    let moleT = 0;
    // A mole pops in a random hole; the more you score, the shorter it stays up.
    const pop = () => {
      const up = Math.max(reduced ? 750 : 480, (reduced ? 1150 : 900) - scoreRef.current * 25);
      setMoleAt((Math.random() * 9) | 0);
      moleT = window.setTimeout(() => {
        setMoleAt(null);
        moleT = window.setTimeout(pop, (reduced ? 460 : 260) + Math.random() * 260);
      }, up);
    };
    moleT = window.setTimeout(pop, 450);
    const tick = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setPhase("over"); setMoleAt(null); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { clearTimeout(moleT); clearInterval(tick); };
  }, [phase, reduced]);

  const start = () => { setScore(0); setTimeLeft(30); setMoleAt(null); setPhase("playing"); };
  const whack = (i: number) => {
    if (phase !== "playing" || i !== moleAt) return;
    setMoleAt(null);
    setScore((s) => s + 1);
  };

  return (
    <div className="dv-play">
      <div className="dv-scorebar">
        <span className="dv-score"><Icon name="star" size={18} fill="currentColor" /> {score}</span>
        <span className="dv-score"><Icon name="clock" size={18} /> {timeLeft}s</span>
      </div>
      <div className="mole-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i}
            className={`mole-hole ${moleAt === i ? "has-mole" : ""}`}
            onClick={() => whack(i)}
            aria-label={moleAt === i ? "Toupeira! Toca!" : "Buraco"}
            disabled={phase !== "playing"}
          >
            <span className="mole" aria-hidden>🐹</span>
          </button>
        ))}
      </div>
      {phase !== "playing" && (
        <div className="dv-win">
          {phase === "over" && (
            <>
              <p>Apanhaste {score} {score === 1 ? "toupeira" : "toupeiras"}! 🎉</p>
              <Speaker text={`Apanhaste ${score} ${score === 1 ? "toupeira" : "toupeiras"}!`} className="dv-tool" label="Ouvir o resultado" size={20} />
            </>
          )}
          <button className="dv-tool dv-tool--wide" onClick={start}>
            <Icon name={phase === "over" ? "refresh" : "forward"} size={20} />
            <span>{phase === "over" ? "Jogar outra vez" : "Começar"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Soma rápida ---------------- */

function makeSum() {
  // Keep it 1.º-ciclo friendly: sums stay ≤ 10, subtractions never go negative.
  if (Math.random() < 0.5) {
    const a = randInt(1, 9);
    const b = randInt(1, Math.max(1, 10 - a));
    return { a, b, op: "+" as const, ans: a + b };
  }
  const a = randInt(2, 10);
  const b = randInt(1, a - 1);
  return { a, b, op: "−" as const, ans: a - b };
}

function Soma() {
  const [q, setQ] = useState(makeSum);
  const [right, setRight] = useState(0);
  const opts = useMemo(() => countOptions(q.ans), [q]);
  const say = `Quanto é ${q.a} ${q.op === "+" ? "mais" : "menos"} ${q.b}?`;

  const answer = (v: number) => {
    if (v === q.ans) {
      setRight((r) => r + 1);
      speak(`${q.ans}! Boa!`);
      window.setTimeout(() => setQ(makeSum()), 750);
    } else {
      speak("Quase! Tenta outra vez.");
    }
  };

  return (
    <div className="dv-play dv-conta">
      <div className="dv-scorebar">
        <span className="dv-score"><Icon name="star" size={18} fill="currentColor" /> {right}</span>
      </div>
      <div className="dv-sum">
        <span>{q.a}</span>
        <span className="dv-sum__op">{q.op}</span>
        <span>{q.b}</span>
        <span className="dv-sum__op">=</span>
        <span className="dv-sum__q">?</span>
        <Speaker text={say} className="dv-tool dv-sum__speak" label="Ouvir a conta" size={20} />
      </div>
      <div className="dv-conta__options">
        {opts.map((v) => (
          <button key={v} className="dv-num" onClick={() => answer(v)} aria-label={`${v}`}>
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
