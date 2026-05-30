import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";
import { colorVar, softFill } from "./geo";

export interface AreaGridSpec {
  width?: number; // columns = comprimento, 1–10
  height?: number; // rows = largura, 1–8
  unit?: string; // length unit, default "cm"
  title?: string;
  interactive?: boolean; // default true — child resizes the rectangle
  color?: string; // subject colour key, default "mat"
}

const clampW = (n: number) => Math.min(10, Math.max(1, Math.round(n)));
const clampH = (n: number) => Math.min(8, Math.max(1, Math.round(n)));

const CELL = 32;
const PAD = 28;

export function AreaGrid({ spec }: { spec: AreaGridSpec }) {
  const interactive = spec.interactive !== false;
  const unit = spec.unit ?? "cm";
  const [w, setW] = useState(() => clampW(spec.width ?? 4));
  const [h, setH] = useState(() => clampH(spec.height ?? 3));
  const stroke = colorVar(spec.color ?? "mat");
  const fill = softFill(spec.color ?? "mat");

  const area = w * h;
  const perim = 2 * (w + h);
  const say = (cw: number, ch: number) =>
    `Comprimento ${cw}, largura ${ch}. Área: ${cw} vezes ${ch} é igual a ${cw * ch} ${unit} quadrados. Perímetro à volta: ${2 * (cw + ch)} ${unit}.`;

  const change = (dw: number, dh: number) => {
    const nw = clampW(w + dw);
    const nh = clampH(h + dh);
    setW(nw);
    setH(nh);
    speak(say(nw, nh));
  };

  const gw = w * CELL;
  const gh = h * CELL;
  const vbW = gw + PAD * 2;
  const vbH = gh + PAD * 2;

  return (
    <div className="widget areagrid-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="grid" size={16} /> Área e perímetro</span>
        {spec.title && <strong>{spec.title}</strong>}
        {interactive && <span className="w-hint">Muda o tamanho e vê as duas medidas</span>}
      </div>

      <div className="areagrid-body">
        <svg className="areagrid-svg" viewBox={`0 0 ${vbW} ${vbH}`} role="img" aria-label={`Retângulo de ${w} por ${h}, área ${area} ${unit} quadrados`}>
          {/* unit squares = área */}
          {Array.from({ length: h }, (_, r) =>
            Array.from({ length: w }, (_, c) => (
              <rect key={`${r}-${c}`} x={PAD + c * CELL} y={PAD + r * CELL} width={CELL} height={CELL} fill={fill} stroke="var(--border)" strokeWidth="1" />
            )),
          )}
          {/* perímetro = the bold outline (the volta) */}
          <rect x={PAD} y={PAD} width={gw} height={gh} fill="none" stroke={stroke} strokeWidth="4" />
          {/* side-length labels tie the numbers to the figure */}
          <text x={PAD + gw / 2} y={PAD - 10} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-2)">{w} {unit}</text>
          <text x={PAD - 11} y={PAD + gh / 2} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-2)" transform={`rotate(-90 ${PAD - 11} ${PAD + gh / 2})`}>{h} {unit}</text>
        </svg>

        <div className="areagrid-side">
          <div className="areagrid-stat">
            <span className="areagrid-num" style={{ color: stroke }}>{area}</span>
            <span className="areagrid-unit">{unit}²</span>
            <span className="areagrid-lbl">área = {w} × {h}</span>
          </div>
          <div className="areagrid-stat">
            <span className="areagrid-num">{perim}</span>
            <span className="areagrid-unit">{unit}</span>
            <span className="areagrid-lbl">perímetro = ({w} + {h}) × 2</span>
          </div>
          <Speaker text={say(w, h)} className="prose-speak" label="Ouvir as medidas" />

          {interactive && (
            <>
              <div className="clock-ctrl">
                <span>Comprimento</span>
                <button className="iconbtn" onClick={() => change(-1, 0)} aria-label="Menos comprimento"><Icon name="minus" size={18} /></button>
                <button className="iconbtn" onClick={() => change(1, 0)} aria-label="Mais comprimento"><Icon name="plus" size={18} /></button>
              </div>
              <div className="clock-ctrl">
                <span>Largura</span>
                <button className="iconbtn" onClick={() => change(0, -1)} aria-label="Menos largura"><Icon name="minus" size={18} /></button>
                <button className="iconbtn" onClick={() => change(0, 1)} aria-label="Mais largura"><Icon name="plus" size={18} /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
