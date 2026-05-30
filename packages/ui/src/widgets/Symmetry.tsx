import { useState, type ReactNode } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

export type SymmetryShape = "coracao" | "borboleta" | "arvore";

export interface SymmetrySpec {
  shape?: SymmetryShape; // default "coracao"
  title?: string;
  interactive?: boolean; // default true — reveal the mirror half
}

/* Every figure is drawn as a LEFT half against a vertical eixo at x = AX; the
 * right half is the same drawing reflected, so the two halves coincide exactly.
 * Parts that sit ON the axis (a trunk, a body) are drawn once, not mirrored. */
const AX = 120;

const SHAPES: Record<SymmetryShape, { name: string; color: string; half: ReactNode; axis?: ReactNode }> = {
  coracao: {
    name: "coração",
    color: "var(--danger)",
    half: <path d="M120 170 C 82 142, 54 116, 60 90 C 64 64, 96 56, 120 84 Z" />,
  },
  borboleta: {
    name: "borboleta",
    color: "var(--accent)",
    half: (
      <>
        <ellipse cx="84" cy="78" rx="32" ry="26" />
        <ellipse cx="92" cy="130" rx="24" ry="20" />
        <path d="M120 58 C 110 42, 100 42, 96 50" fill="none" stroke="var(--ink)" strokeWidth="3" />
      </>
    ),
    axis: <ellipse cx={AX} cy="104" rx="8" ry="50" fill="var(--ink)" />,
  },
  arvore: {
    name: "árvore",
    color: "var(--ok)",
    half: (
      <>
        <polygon points="120,38 82,92 120,92" />
        <polygon points="120,76 68,142 120,142" />
      </>
    ),
    axis: <rect x={AX - 9} y="140" width="18" height="30" rx="3" fill="#9c6b3f" />,
  },
};

export function Symmetry({ spec }: { spec: SymmetrySpec }) {
  const interactive = spec.interactive !== false;
  const shape = SHAPES[spec.shape ?? "coracao"];
  const [revealed, setRevealed] = useState(!interactive);

  const sayWhole = `Esta ${shape.name} tem simetria: uma metade é o espelho da outra. A linha do meio é o eixo de simetria.`;
  const toggle = () => {
    const next = !revealed;
    setRevealed(next);
    speak(next ? `A outra metade é o espelho! As duas metades coincidem. É simétrico.` : "Falta a outra metade. Carrega para espelhar.");
  };

  return (
    <div className="widget symmetry-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="shapes" size={16} /> Simetria</span>
        {spec.title && <strong>{spec.title}</strong>}
        {interactive && <span className="w-hint">Espelha a figura pelo eixo</span>}
      </div>

      <div className="symmetry-body">
        <svg className="symmetry-svg" viewBox="0 0 240 200" role="img" aria-label={`${shape.name} com eixo de simetria`}>
          {/* the mirror half (right): faded until revealed */}
          <g fill={shape.color} stroke={shape.color} strokeWidth="1.5" transform={`translate(${2 * AX} 0) scale(-1 1)`} style={{ opacity: revealed ? 1 : 0.16, transition: "opacity .25s" }}>
            {shape.half}
          </g>
          {/* the base half (left): always solid */}
          <g fill={shape.color} stroke={shape.color} strokeWidth="1.5">{shape.half}</g>
          {/* parts that straddle the eixo, drawn once */}
          {shape.axis}
          {/* the eixo de simetria — the fold line */}
          <line x1={AX} y1="20" x2={AX} y2="184" stroke="var(--ink-2)" strokeWidth="2.5" strokeDasharray="7 6" />
          <text x={AX} y="197" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink-3)">eixo</text>
        </svg>

        <div className="symmetry-side">
          {interactive ? (
            <>
              <button className="pill" onClick={toggle}>
                <Icon name={revealed ? "refresh" : "sparkle"} size={18} /> {revealed ? "Tirar o espelho" : "Espelhar"}
              </button>
              {revealed && (
                <div className="feedback good">
                  <Icon name="check" size={18} /> As metades coincidem — é simétrico!
                </div>
              )}
            </>
          ) : (
            <p className="symmetry-note">As duas metades são iguais, em espelho.</p>
          )}
          <Speaker text={sayWhole} className="prose-speak" label="Ouvir" />
        </div>
      </div>
    </div>
  );
}
