import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

/* Lifecycle — a living thing's life going round and round: egg → caterpillar →
 * cocoon → butterfly → egg again. The stages sit on a ring joined by arrows; tap
 * a stage to hear it, or press "Próxima fase" to walk around the circle. Use a
 * built-in `cycle` (borboleta, rã, planta, galinha) or pass your own `stages`.
 * Read-aloud only on a tap. */
export interface LifecycleStage {
  emoji: string;
  label: string;
  say?: string;
}

export interface LifecycleSpec {
  title?: string;
  /** a built-in cycle; ignored when `stages` is given */
  cycle?: "borboleta" | "ra" | "planta" | "galinha";
  /** custom stages (overrides `cycle`) */
  stages?: LifecycleStage[];
}

const CYCLES: Record<NonNullable<LifecycleSpec["cycle"]>, LifecycleStage[]> = {
  borboleta: [
    { emoji: "🥚", label: "Ovo", say: "Tudo começa num ovo minúsculo, pousado numa folha." },
    { emoji: "🐛", label: "Lagarta", say: "Do ovo nasce uma lagarta, que come folhas sem parar e cresce muito." },
    { emoji: "🛡️", label: "Casulo", say: "A lagarta faz um casulo à sua volta e fica lá escondida a transformar-se." },
    { emoji: "🦋", label: "Borboleta", say: "Do casulo sai uma borboleta, que abre as asas e voa — e vai pôr novos ovos." },
  ],
  ra: [
    { emoji: "🥚", label: "Ovos", say: "A rã põe ovos na água, juntos como uma geleia." },
    { emoji: "🐟", label: "Girino", say: "Dos ovos nascem girinos, que têm cauda e nadam como peixinhos." },
    { emoji: "🦵", label: "Girino com patas", say: "O girino ganha patas e a cauda começa a desaparecer." },
    { emoji: "🐸", label: "Rã", say: "Torna-se uma rã, que já pode saltar para fora da água — e pôr novos ovos." },
  ],
  planta: [
    { emoji: "🌰", label: "Semente", say: "Uma semente cai na terra e fica à espera de água e calor." },
    { emoji: "🌱", label: "Rebento", say: "A semente germina: sai uma raiz para baixo e um rebento verde para cima." },
    { emoji: "🌿", label: "Planta", say: "O rebento cresce, ganha folhas e apanha a luz do Sol." },
    { emoji: "🌻", label: "Flor e sementes", say: "A planta dá flor, e da flor nascem novas sementes — e tudo recomeça." },
  ],
  galinha: [
    { emoji: "🥚", label: "Ovo", say: "A galinha põe um ovo e choca-o, mantendo-o quentinho." },
    { emoji: "🐣", label: "Pinto a nascer", say: "Lá dentro forma-se um pintainho, que parte a casca para sair." },
    { emoji: "🐥", label: "Pintainho", say: "Nasce um pintainho amarelo, que pia e segue a mãe." },
    { emoji: "🐔", label: "Galinha", say: "Cresce e torna-se uma galinha, que um dia porá os seus próprios ovos." },
  ],
};

const NAME: Record<NonNullable<LifecycleSpec["cycle"]>, string> = {
  borboleta: "da borboleta", ra: "da rã", planta: "da planta", galinha: "da galinha",
};

export function Lifecycle({ spec }: { spec: LifecycleSpec }) {
  const cycle = spec.cycle ?? "borboleta";
  const stages = spec.stages && spec.stages.length >= 2 ? spec.stages : CYCLES[cycle];
  const [i, setI] = useState(0);
  const n = stages.length;

  const pick = (k: number) => {
    setI(k);
    const s = stages[k];
    speak(s.say ?? `${s.label}.`);
  };

  const next = () => pick((i + 1) % n);

  const title = spec.title ?? (spec.stages ? "Ciclo de vida" : `O ciclo de vida ${NAME[cycle]}`);
  const whole = `${title}. ${stages.map((s) => s.label).join(", então ")}, e tudo recomeça.`;

  // place the stages on a circle
  const R = 78, cx = 110, cy = 100;
  const pts = stages.map((_, k) => {
    const a = -Math.PI / 2 + (k * 2 * Math.PI) / n;
    return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
  });

  return (
    <div className="widget lifecycle-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="refresh" size={16} /> Ciclo de vida</span>
        <strong>{title}</strong>
        <Speaker text={whole} className="w-readout-sm" label="Ouvir o ciclo todo" />
      </div>

      <div className="lifecycle-body">
        <svg className="lifecycle-svg" viewBox="0 0 220 200" role="img" aria-label={title}>
          {/* curved arrows between stages */}
          {pts.map((p, k) => {
            const q = pts[(k + 1) % n];
            const mx = (p.x + q.x) / 2 + (cy - (p.y + q.y) / 2) * 0.12;
            const my = (p.y + q.y) / 2 + ((p.x + q.x) / 2 - cx) * 0.12;
            return (
              <path key={k} d={`M${p.x} ${p.y} Q ${mx} ${my} ${q.x} ${q.y}`} fill="none"
                stroke="color-mix(in srgb, var(--primary) 35%, var(--border))" strokeWidth="2" strokeLinecap="round" markerEnd="url(#lc-arrow)" />
            );
          })}
          <defs>
            <marker id="lc-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="color-mix(in srgb, var(--primary) 55%, var(--border))" />
            </marker>
          </defs>

          {/* stage nodes */}
          {pts.map((p, k) => {
            const on = k === i;
            return (
              <g key={k} transform={`translate(${p.x} ${p.y})`} onClick={() => pick(k)} style={{ cursor: "pointer" }} role="button" aria-label={stages[k].label}>
                <circle r={on ? 26 : 22} fill={on ? "var(--primary-soft)" : "var(--surface)"} stroke={on ? "var(--primary)" : "var(--border-strong)"} strokeWidth={on ? 3 : 2} />
                <text y="7" textAnchor="middle" fontSize="22" style={{ pointerEvents: "none" }}>{stages[k].emoji}</text>
              </g>
            );
          })}
        </svg>

        <div className="lifecycle-side">
          <div className="lifecycle-now">
            <span className="lifecycle-now__emoji" aria-hidden>{stages[i].emoji}</span>
            <span className="lifecycle-now__label">{stages[i].label}</span>
          </div>
          <p className="lifecycle-now__say">{stages[i].say}</p>
          <button className="pill" onClick={next}>
            <Icon name="forward" size={18} /> Próxima fase
          </button>
        </div>
      </div>
    </div>
  );
}
