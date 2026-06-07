import { useMemo, useState } from "react";
import { Icon } from "@sprout/icons";
import { canSpeak } from "../speak";
import { useSpeaker } from "../Speaker";
import { colorVar } from "./geo";

/* BlocosBase10 — "what happens underneath" the column algorithm, made concrete
 * with base-ten blocks: a cube is a unit, a rod is ten cubes (a dezena), a flat
 * is a hundred. The hidden steps become visible: carrying is bundling 10 cubes
 * into 1 rod ("vai 1"); borrowing is breaking 1 rod back into 10 cubes. Steps
 * through one trade at a time, with the same read-aloud + written explanation as
 * the conta. Only +/− on whole numbers up to 999 (where blocks teach best).
 *
 * Markdown usage:  ```blocos
 *                  { "op": "sub", "a": 32, "b": 15 }
 *                  ```
 */

export interface BlocosSpec {
  title?: string;
  op?: "add" | "sub"; // default "add"
  a: number;
  b: number;
  color?: string; // subject colour key for the badge (default "mat")
}

interface Pile {
  h: number;
  t: number;
  u: number;
}
type Place = "u" | "t" | "h";
interface Scene {
  piles: { pile: Pile; label?: string }[];
  say: string;
  caption: string;
  focus?: Place; // place to spotlight this step
  arrow?: { from: Place; to: Place }; // show a block travelling between places
}

const dig = (n: number): Pile => ({ h: Math.floor(n / 100) % 10, t: Math.floor(n / 10) % 10, u: n % 10 });
const qty = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/* ---------- scenes: one snapshot of the blocks per step ---------- */

function addScenes(a: number, b: number): Scene[] {
  const A = dig(a);
  const B = dig(b);
  const s: Scene[] = [];
  s.push({
    piles: [
      { pile: A, label: String(a) },
      { pile: B, label: String(b) },
    ],
    say: `Aqui estão o ${a} e o ${b} em blocos: cada cubo é uma unidade e cada barra são dez (uma dezena). Vou juntá-los.`,
    caption: "Os dois números",
  });
  let w: Pile = { u: A.u + B.u, t: A.t + B.t, h: A.h + B.h };
  s.push({
    piles: [{ pile: { ...w } }],
    say: `Junto o que é igual com igual: ${qty(w.u, "unidade", "unidades")} e ${qty(w.t, "dezena", "dezenas")}${w.h ? ` e ${qty(w.h, "centena", "centenas")}` : ""}.`,
    caption: "Juntar tudo",
  });
  if (w.u >= 10) {
    const had = w.u;
    w = { ...w, u: w.u - 10, t: w.t + 1 };
    s.push({
      piles: [{ pile: { ...w } }],
      focus: "t",
      arrow: { from: "u", to: "t" },
      say: `Tenho ${had} unidades — mais do que 10! Junto 10 cubos e troco-os por 1 barra (1 dezena), que vai para as dezenas. Ficam ${qty(w.u, "unidade", "unidades")}. É isto o «vai 1».`,
      caption: "10 cubos viram 1 barra",
    });
  }
  if (w.t >= 10) {
    const had = w.t;
    w = { ...w, t: w.t - 10, h: w.h + 1 };
    s.push({
      piles: [{ pile: { ...w } }],
      focus: "h",
      arrow: { from: "t", to: "h" },
      say: `Agora as dezenas: tenho ${had}. Junto 10 barras e troco-as por 1 placa (1 centena). Ficam ${qty(w.t, "dezena", "dezenas")}.`,
      caption: "10 barras viram 1 placa",
    });
  }
  s.push({ piles: [{ pile: { ...w } }], say: `Conto o que ficou: ${a} mais ${b} é ${a + b}.`, caption: `Resultado: ${a + b}` });
  return s;
}

function subScenes(a: number, b: number): Scene[] {
  const A = dig(a);
  const B = dig(b);
  const s: Scene[] = [];
  s.push({ piles: [{ pile: A, label: String(a) }], say: `Tenho o ${a} em blocos. Vou tirar ${b}, casa a casa, a começar pelas unidades.`, caption: `Tirar ${b}` });
  let w: Pile = { ...A };
  // Units — break a ten (and, if needed, a hundred first) before removing.
  if (B.u > 0 && w.u < B.u) {
    if (w.t === 0) {
      w = { ...w, h: w.h - 1, t: w.t + 10 };
      s.push({ piles: [{ pile: { ...w } }], focus: "t", arrow: { from: "h", to: "t" }, say: `Não há barras para partir. Primeiro parto 1 placa em 10 barras: fico com ${qty(w.h, "centena", "centenas")} e ${qty(w.t, "dezena", "dezenas")}.`, caption: "Partir 1 placa" });
    }
    w = { ...w, t: w.t - 1, u: w.u + 10 };
    s.push({ piles: [{ pile: { ...w } }], focus: "u", arrow: { from: "t", to: "u" }, say: `Não há cubos que cheguem para tirar ${B.u}. Parto 1 barra em 10 cubos: fico com ${qty(w.t, "dezena", "dezenas")} e ${qty(w.u, "unidade", "unidades")}. É isto o empréstimo.`, caption: "Partir 1 barra" });
  }
  if (B.u > 0) {
    w = { ...w, u: w.u - B.u };
    s.push({ piles: [{ pile: { ...w } }], focus: "u", say: `Tiro ${qty(B.u, "cubo", "cubos")}. Ficam ${qty(w.u, "unidade", "unidades")}.`, caption: `Tirar ${B.u} das unidades` });
  }
  // Tens — break a hundred if needed, then remove.
  if (B.t > 0 && w.t < B.t) {
    w = { ...w, h: w.h - 1, t: w.t + 10 };
    s.push({ piles: [{ pile: { ...w } }], focus: "t", arrow: { from: "h", to: "t" }, say: `Não há barras que cheguem para tirar ${B.t}. Parto 1 placa em 10 barras: fico com ${qty(w.h, "centena", "centenas")} e ${qty(w.t, "dezena", "dezenas")}.`, caption: "Partir 1 placa" });
  }
  if (B.t > 0) {
    w = { ...w, t: w.t - B.t };
    s.push({ piles: [{ pile: { ...w } }], focus: "t", say: `Tiro ${qty(B.t, "barra", "barras")}. Ficam ${qty(w.t, "dezena", "dezenas")}.`, caption: `Tirar ${B.t} das dezenas` });
  }
  if (B.h > 0) {
    w = { ...w, h: w.h - B.h };
    s.push({ piles: [{ pile: { ...w } }], focus: "h", say: `Tiro ${qty(B.h, "placa", "placas")}. Ficam ${qty(w.h, "centena", "centenas")}.`, caption: `Tirar ${B.h} das centenas` });
  }
  s.push({ piles: [{ pile: { ...w } }], say: `Conto o que sobrou: ${a} menos ${b} é ${a - b}.`, caption: `Resultado: ${a - b}` });
  return s;
}

/** null when the inputs are outside the range where blocks help (≤ 999, +/−, a ≥ b). */
function buildScenes(op: "add" | "sub", a: number, b: number): Scene[] | null {
  if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) return null;
  if (a > 999 || b > 999) return null;
  if (op === "add") return a + b > 999 ? null : addScenes(a, b);
  return a < b ? null : subScenes(a, b);
}

/* ---------- block drawing (SVG) ---------- */

const SEG = 10; // a unit cube's edge
const GAP = 3; // gap between blocks
const STEP = SEG + GAP;
const TEN = STEP * 10 - GAP; // a rod / a flat side = ten cubes tall

const PLACE = {
  u: { fill: "#4f86f7", line: "#2b5fd0", name: "unidades" },
  t: { fill: "#37b24d", line: "#2b8a3e", name: "dezenas" },
  h: { fill: "#f59f00", line: "#cc7a00", name: "centenas" },
} as const;

interface Group {
  place: Place;
  count: number;
  width: number; // slot width (≥ the label, so it never clips)
  blockW: number; // width of just the blocks (centred in the slot)
}

function pileGroups(p: Pile): Group[] {
  const g: Group[] = [];
  const add = (place: Place, count: number, blockW: number) => {
    const labelW = `${count} ${PLACE[place].name}`.length * 6.5 + 8;
    g.push({ place, count, blockW, width: Math.max(blockW, labelW) });
  };
  if (p.h) add("h", p.h, p.h * (TEN + GAP) - GAP);
  if (p.t) add("t", p.t, p.t * STEP - GAP);
  if (p.u) add("u", p.u, Math.ceil(p.u / 10) * STEP - GAP);
  return g;
}

const COL_GAP = 30;
const PAD = 8;
const LABEL_H = 18;
const ARROW_LANE = 26; // top space for the transition arrow

function PileSvg({ pile, focus, arrow }: { pile: Pile; focus?: Place; arrow?: { from: Place; to: Place } }) {
  const groups = pileGroups(pile);
  const empty = groups.length === 0;
  const bodyW = empty ? 60 : groups.reduce((s, g) => s + g.width, 0) + COL_GAP * (groups.length - 1);
  const totalW = bodyW + PAD * 2;
  const totalH = ARROW_LANE + TEN + LABEL_H + PAD * 2;
  const baseline = PAD + ARROW_LANE + TEN; // blocks sit on this floor

  let x = PAD;
  const centers: Partial<Record<Place, number>> = {};
  const nodes: React.ReactNode[] = [];
  for (const g of groups) {
    const col = PLACE[g.place];
    centers[g.place] = x + g.width / 2;
    const ox = x + (g.width - g.blockW) / 2; // centre the blocks within the slot
    if (g.place === focus) {
      nodes.push(<rect key={`f${g.place}`} x={x - 6} y={baseline - TEN - 4} width={g.width + 12} height={TEN + 8} rx={8} fill={col.fill} opacity={0.14} />);
    }
    if (g.place === "u") {
      for (let i = 0; i < g.count; i++) {
        const c = Math.floor(i / 10);
        const r = i % 10;
        const cx = ox + c * STEP;
        const cy = baseline - SEG - r * STEP;
        nodes.push(<rect key={`u${i}`} x={cx} y={cy} width={SEG} height={SEG} rx={2} fill={col.fill} stroke={col.line} strokeWidth={1} />);
      }
    } else if (g.place === "t") {
      for (let i = 0; i < g.count; i++) {
        const rx = ox + i * STEP;
        nodes.push(<rect key={`t${i}`} x={rx} y={baseline - TEN} width={SEG} height={TEN} rx={2} fill={col.fill} stroke={col.line} strokeWidth={1} />);
        for (let k = 1; k < 10; k++) nodes.push(<line key={`t${i}-${k}`} x1={rx} y1={baseline - TEN + k * STEP - GAP / 2} x2={rx + SEG} y2={baseline - TEN + k * STEP - GAP / 2} stroke={col.line} strokeWidth={0.6} opacity={0.6} />);
      }
    } else {
      for (let i = 0; i < g.count; i++) {
        const fx = ox + i * (TEN + GAP);
        nodes.push(<rect key={`h${i}`} x={fx} y={baseline - TEN} width={TEN} height={TEN} rx={2} fill={col.fill} stroke={col.line} strokeWidth={1} />);
        for (let k = 1; k < 10; k++) {
          nodes.push(<line key={`hv${i}-${k}`} x1={fx + k * STEP - GAP / 2} y1={baseline - TEN} x2={fx + k * STEP - GAP / 2} y2={baseline} stroke={col.line} strokeWidth={0.5} opacity={0.5} />);
          nodes.push(<line key={`hh${i}-${k}`} x1={fx} y1={baseline - TEN + k * STEP - GAP / 2} x2={fx + TEN} y2={baseline - TEN + k * STEP - GAP / 2} stroke={col.line} strokeWidth={0.5} opacity={0.5} />);
        }
      }
    }
    nodes.push(
      <text key={`l${g.place}`} x={x + g.width / 2} y={baseline + LABEL_H - 2} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--ink-3)" style={{ fontFamily: "var(--font-display)" }}>
        {g.count} {col.name}
      </text>,
    );
    x += g.width + COL_GAP;
  }
  if (empty) {
    nodes.push(
      <text key="zero" x={totalW / 2} y={baseline - TEN / 2} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--ink-3)" style={{ fontFamily: "var(--font-mono)" }}>
        0
      </text>,
    );
  }

  // Transition arrow: a block travelling from one place to the next (the "vai 1"
  // carrying right→left into the tens, or a borrow being broken left→right).
  if (arrow) {
    const fx = centers[arrow.from] ?? totalW - PAD - 12;
    const tx = centers[arrow.to] ?? PAD + 12;
    const col = PLACE[arrow.to];
    const laneY = PAD + 6;
    const midX = (fx + tx) / 2;
    nodes.push(<path key="arrow" d={`M ${fx} ${laneY + 4} Q ${midX} ${PAD - 4} ${tx} ${laneY + 4}`} fill="none" stroke={col.line} strokeWidth={2.5} strokeLinecap="round" />);
    nodes.push(<polygon key="arrowhead" points={`${tx},${laneY + 12} ${tx - 5},${laneY + 2} ${tx + 5},${laneY + 2}`} fill={col.line} />);
  }

  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`} role="img" aria-label="Blocos de base dez">
      {nodes}
    </svg>
  );
}

/* ---------- the widget ---------- */

const OP_GLYPH = { add: "+", sub: "−" } as const;

export function BlocosBase10({ spec }: { spec: BlocosSpec }) {
  const op = spec.op ?? "add";
  const tint = colorVar(spec.color ?? "mat");
  const scenes = useMemo(() => buildScenes(op, spec.a, spec.b), [op, spec.a, spec.b]);
  const [shown, setShown] = useState(0);
  const { playing, toggle } = useSpeaker();

  const head = `${spec.a} ${OP_GLYPH[op]} ${spec.b}`;

  if (!scenes) {
    return (
      <div className="widget blocos-widget">
        <div className="w-head">
          <span className="w-badge" style={{ background: tint }}>
            <Icon name="blocks" size={16} /> Blocos
          </span>
          {spec.title && <strong>{spec.title}</strong>}
        </div>
        <p className="ca-error">Os blocos servem para somar e subtrair números inteiros até 999 (sem o resultado passar dos 999).</p>
      </div>
    );
  }

  const last = scenes.length - 1;
  const here = Math.min(shown, last);
  const scene = scenes[here];
  const finished = shown >= last;

  return (
    <div className="widget blocos-widget">
      <div className="w-head">
        <span className="w-badge" style={{ background: tint }}>
          <Icon name="blocks" size={16} /> Blocos de base 10
        </span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">{head} — o que se passa por baixo da conta</span>
      </div>

      <div className="blocos-stage">
        {scene.piles.map((p, i) => (
          <div key={i} className="blocos-row">
            {p.label && <span className="blocos-row__tag">{p.label}</span>}
            <div className="blocos-row__svg">
              <PileSvg pile={p.pile} focus={scene.focus} arrow={scene.piles.length === 1 ? scene.arrow : undefined} />
            </div>
          </div>
        ))}
      </div>

      <div className="ca-controls">
        <div className="ca-progress" aria-hidden="true">
          {scenes.map((_, i) => (
            <span key={i} className="ca-progress__dot" data-done={i <= here || undefined} data-current={i === here || undefined} style={i <= here ? { background: tint } : undefined} />
          ))}
        </div>

        <div className="ca-controls__row">
          <button type="button" className="ca-nav" onClick={() => setShown((s) => Math.max(0, s - 1))} disabled={shown === 0} aria-label="Passo anterior">
            <Icon name="back" size={18} />
          </button>
          {finished ? (
            <button type="button" className="ca-nav ca-nav--text ca-nav--restart" onClick={() => setShown(0)}>
              <Icon name="refresh" size={16} /> Recomeçar
            </button>
          ) : (
            <button type="button" className="ca-nav ca-nav--next" onClick={() => setShown((s) => Math.min(last, s + 1))} style={{ background: tint, borderColor: tint }}>
              Próximo <Icon name="forward" size={16} />
            </button>
          )}
        </div>

        <div className="ca-explain">
          <div className="ca-explain__top">
            <span className="ca-explain__count" style={{ background: tint }}>{finished ? "Pronto!" : `Passo ${here} de ${last}`}</span>
            <strong className="ca-explain__caption">{scene.caption}</strong>
            {canSpeak() && (
              <button type="button" className="ca-explain__speak" data-playing={playing || undefined} onClick={() => toggle(scene.say)} aria-label={playing ? "Parar" : "Ouvir o passo"} title={playing ? "Parar" : "Ouvir o passo"}>
                <Icon name={playing ? "stop" : "speaker"} size={16} />
              </button>
            )}
          </div>
          <p className="ca-explain__say">{scene.say}</p>
        </div>
      </div>
    </div>
  );
}
