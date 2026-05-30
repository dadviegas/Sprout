import { useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";
import { colorVar } from "./geo";

export interface AngleSpec {
  angle?: number; // initial opening in degrees (0–180), default 45
  title?: string;
  interactive?: boolean; // default true — child opens/closes the "crocodile mouth"
  color?: string; // tint of the two sides (a subject colour key)
}

/* Where the vertex sits and how long the sides/arc are, in the 240×200 grid. */
const VX = 50;
const VY = 152;
const SIDE = 168; // length of each side (semirreta)
const ARC = 54; // radius of the opening arc near the vertex

const rad = (d: number) => (d * Math.PI) / 180;
const clamp = (d: number) => Math.min(180, Math.max(0, d));

/** Name + plain-words hint + colour for an opening, the way a child compares it
 *  to the «canto certinho» (90°). */
function classify(deg: number): { name: string; hint: string; color: string } {
  if (deg === 0) return { name: "fechado", hint: "as duas semirretas estão juntinhas — 0°", color: "--ink-3" };
  if (deg < 90) return { name: "agudo", hint: "mais fechado que o canto certinho — menos de 90°", color: "--ok" };
  if (deg === 90) return { name: "reto", hint: "o canto certinho — exatamente 90°", color: "--primary" };
  if (deg < 180) return { name: "obtuso", hint: "mais aberto que o canto certinho — mais de 90°", color: "--accent" };
  return { name: "raso", hint: "as semirretas fazem uma linha direita — 180°", color: "--info" };
}

const sayAngle = (deg: number, name: string, hint: string) =>
  `Ângulo de ${deg} graus. É um ângulo ${name}: ${hint}.`;

export function Angle({ spec }: { spec: AngleSpec }) {
  const interactive = spec.interactive !== false;
  const [deg, setDeg] = useState(() => clamp(Math.round((spec.angle ?? 45) / 5) * 5));
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const kind = classify(deg);
  const tint = colorVar(spec.color ?? "mat");
  const arcStroke = `var(${kind.color})`;

  // Tip of the moving side, and the point where the arc meets each side.
  const tip = { x: VX + SIDE * Math.cos(rad(deg)), y: VY - SIDE * Math.sin(rad(deg)) };
  const arcEnd = { x: VX + ARC * Math.cos(rad(deg)), y: VY - ARC * Math.sin(rad(deg)) };
  // sweep-flag 0 → counter-clockwise (upwards) on the y-down SVG canvas.
  const arcPath = `M ${VX + ARC} ${VY} A ${ARC} ${ARC} 0 0 0 ${arcEnd.x.toFixed(1)} ${arcEnd.y.toFixed(1)}`;
  const labelMid = rad(deg / 2);
  const label = { x: VX + (ARC + 24) * Math.cos(labelMid), y: VY - (ARC + 24) * Math.sin(labelMid) };

  const setAndSpeak = (next: number) => {
    const d = clamp(next);
    setDeg(d);
    const k = classify(d);
    speak(sayAngle(d, k.name, k.hint));
  };

  const degFromPointer = (e: React.PointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 240 - VX;
    const y = ((e.clientY - rect.top) / rect.height) * 200 - VY;
    return clamp(Math.round((Math.atan2(-y, x) * 180) / Math.PI / 5) * 5);
  };

  return (
    <div className="widget angle-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="shapes" size={16} /> Ângulo</span>
        {spec.title && <strong>{spec.title}</strong>}
        {interactive && <span className="w-hint">Arrasta a ponta para abrir e fechar</span>}
      </div>

      <div className="angle-body">
        <svg
          ref={svgRef}
          className="angle-svg"
          viewBox="0 0 240 200"
          role="img"
          aria-label={`Ângulo ${kind.name} de ${deg} graus`}
          style={{ touchAction: interactive ? "none" : undefined, cursor: interactive ? "grab" : "default" }}
          onPointerDown={interactive ? (e) => { dragging.current = true; (e.target as Element).setPointerCapture?.(e.pointerId); const d = degFromPointer(e); if (d != null) setDeg(d); } : undefined}
          onPointerMove={interactive ? (e) => { if (dragging.current) { e.preventDefault(); const d = degFromPointer(e); if (d != null) setDeg(d); } } : undefined}
          onPointerUp={interactive ? () => { dragging.current = false; } : undefined}
        >
          {/* the opening: tinted arc (+ the little square when it's a right angle) */}
          <path d={arcPath} fill="none" stroke={arcStroke} strokeWidth="4" strokeLinecap="round" />
          {deg === 90 && (
            <path d={`M ${VX + 22} ${VY} L ${VX + 22} ${VY - 22} L ${VX} ${VY - 22}`} fill="none" stroke={arcStroke} strokeWidth="3" />
          )}
          {/* the two sides (semirretas) sharing the vertex */}
          <line x1={VX} y1={VY} x2={VX + SIDE} y2={VY} stroke={tint} strokeWidth="6" strokeLinecap="round" />
          <line x1={VX} y1={VY} x2={tip.x} y2={tip.y} stroke={tint} strokeWidth="6" strokeLinecap="round" />
          {/* vertex, and a grab dot on the moving tip */}
          <circle cx={VX} cy={VY} r="6" fill="var(--ink)" />
          {interactive && <circle cx={tip.x} cy={tip.y} r="9" fill={tint} opacity="0.92" />}
          {/* degree reading inside the opening */}
          <text x={label.x} y={label.y + 5} textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--ink)" style={{ fontFamily: "var(--font-display)" }}>
            {deg}°
          </text>
        </svg>

        <div className="angle-side">
          <div className="angle-type" style={{ color: arcStroke }}>{kind.name}</div>
          <p className="angle-hint">{kind.hint}</p>
          <Speaker text={sayAngle(deg, kind.name, kind.hint)} className="prose-speak" label="Ouvir o ângulo" />

          {interactive && (
            <div className="clock-ctrl">
              <span>Abertura</span>
              <button className="iconbtn" onClick={() => setAndSpeak(deg - 5)} aria-label="Fechar cinco graus"><Icon name="minus" size={18} /></button>
              <button className="iconbtn" onClick={() => setAndSpeak(deg + 5)} aria-label="Abrir cinco graus"><Icon name="plus" size={18} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
