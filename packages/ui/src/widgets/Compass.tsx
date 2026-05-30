import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";
import { polar } from "./geo";

export interface CompassSpec {
  title?: string;
  colaterais?: boolean; // show NE/NO/SE/SO too, default true
}

interface Point {
  key: string;
  deg: number; // clockwise from North (top)
  name: string;
  hint: string;
  minor?: boolean; // a colateral
}

// Order N → E → S → O so it reads clockwise, like the lesson's trick (N-E-S-O).
const POINTS: Point[] = [
  { key: "N", deg: 0, name: "Norte", hint: "fica para cima, aponta para o frio do Polo Norte" },
  { key: "NE", deg: 45, name: "Nordeste", hint: "fica entre o Norte e o Este", minor: true },
  { key: "E", deg: 90, name: "Este", hint: "fica à direita, é por onde o Sol nasce de manhã" },
  { key: "SE", deg: 135, name: "Sudeste", hint: "fica entre o Sul e o Este", minor: true },
  { key: "S", deg: 180, name: "Sul", hint: "fica para baixo, do lado contrário ao Norte" },
  { key: "SO", deg: 225, name: "Sudoeste", hint: "fica entre o Sul e o Oeste", minor: true },
  { key: "O", deg: 270, name: "Oeste", hint: "fica à esquerda, é por onde o Sol se põe" },
  { key: "NO", deg: 315, name: "Noroeste", hint: "fica entre o Norte e o Oeste", minor: true },
];

const CX = 110;
const CY = 110;

export function Compass({ spec }: { spec: CompassSpec }) {
  const showMinor = spec.colaterais !== false;
  const points = POINTS.filter((p) => showMinor || !p.minor);
  const [sel, setSel] = useState("N");
  const selected = points.find((p) => p.key === sel) ?? points[0];

  const pick = (p: Point) => {
    setSel(p.key);
    speak(`${p.name}: ${p.hint}.`);
  };

  // The needle points to the selected direction (red half) with a grey tail.
  const [nx, ny] = polar(CX, CY, 66, selected.deg);
  const [tx, ty] = polar(CX, CY, 40, selected.deg + 180);
  const [lx, ly] = polar(CX, CY, 12, selected.deg + 90);
  const [rx, ry] = polar(CX, CY, 12, selected.deg - 90);

  return (
    <div className="widget compass-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="compass" size={16} /> Rosa dos ventos</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca num ponto para o ouvires</span>
      </div>

      <div className="compass-body">
        <svg className="compass-svg" viewBox="0 0 220 220" role="img" aria-label="Rosa dos ventos com os pontos cardeais">
          <circle cx={CX} cy={CY} r="86" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="2" />
          <circle cx={CX} cy={CY} r="60" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 5" />
          {/* the star spokes */}
          {points.map((p) => {
            const [ex, ey] = polar(CX, CY, p.minor ? 70 : 78, p.deg);
            return <line key={`s${p.key}`} x1={CX} y1={CY} x2={ex} y2={ey} stroke="var(--border-strong)" strokeWidth={p.minor ? 1 : 2} />;
          })}
          {/* needle: red toward the selected point, grey tail behind */}
          <polygon points={`${nx},${ny} ${lx},${ly} ${rx},${ry}`} fill="var(--danger)" />
          <polygon points={`${tx},${ty} ${lx},${ly} ${rx},${ry}`} fill="var(--ink-3)" />
          <circle cx={CX} cy={CY} r="5" fill="var(--ink)" />
          {/* tappable labels around the rose */}
          {points.map((p) => {
            const [bx, by] = polar(CX, CY, 100, p.deg);
            const on = p.key === sel;
            return (
              <g key={p.key} onClick={() => pick(p)} style={{ cursor: "pointer" }} role="button" aria-label={p.name}>
                <circle cx={bx} cy={by} r={p.minor ? 13 : 16} fill={on ? "var(--primary)" : "var(--surface)"} stroke={on ? "var(--primary)" : "var(--border-strong)"} strokeWidth="2" />
                <text x={bx} y={by + (p.minor ? 4 : 5)} textAnchor="middle" fontSize={p.minor ? 11 : 14} fontWeight="800" fill={on ? "#fff" : "var(--ink)"} style={{ fontFamily: "var(--font-display)", pointerEvents: "none" }}>
                  {p.key}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="compass-side">
          <div className="compass-name">{selected.name} <span className="compass-key">({selected.key})</span></div>
          <p className="compass-hint">{selected.hint}</p>
          <Speaker text={`${selected.name}: ${selected.hint}.`} className="prose-speak" label="Ouvir" />
        </div>
      </div>
    </div>
  );
}
