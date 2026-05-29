import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";

export interface NumberLineSpec {
  min?: number;
  max?: number;
  start?: number;
  step?: number;
  title?: string;
}

export function NumberLine({ spec }: { spec: NumberLineSpec }) {
  const min = spec.min ?? 0;
  const max = Math.min(spec.max ?? 10, min + 20); // keep it readable for kids
  const step = spec.step ?? 1;
  const [value, setValue] = useState(Math.min(Math.max(spec.start ?? min, min), max));

  const count = max - min;
  const gap = 34;
  const padX = 22;
  const width = padX * 2 + count * gap;
  const xOf = (n: number) => padX + (n - min) * gap;

  const hop = (d: number) => {
    setValue((v) => {
      const nv = Math.min(Math.max(v + d, min), max);
      if (nv !== v) speak(String(nv));
      return nv;
    });
  };

  return (
    <div className="widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="ruler" size={16} /> Reta numérica</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-readout-sm">Estou no {value}</span>
      </div>

      <div className="numberline-scroll sprout-scroll">
        <svg viewBox={`0 0 ${width} 70`} style={{ width, maxWidth: "100%", height: "auto" }} role="img" aria-label={`Reta numérica de ${min} a ${max}, marcador no ${value}`}>
          <line x1={padX} y1="48" x2={width - padX} y2="48" stroke="var(--ink-3)" strokeWidth="3" strokeLinecap="round" />
          {Array.from({ length: count + 1 }, (_, i) => {
            const n = min + i;
            const x = xOf(n);
            const on = n === value;
            return (
              <g key={n}>
                <line x1={x} y1="42" x2={x} y2="54" stroke="var(--ink-3)" strokeWidth="2" />
                <text x={x} y="68" textAnchor="middle" fontSize="13" fontWeight={on ? 800 : 600} fill={on ? "var(--primary)" : "var(--ink-2)"} style={{ fontFamily: "var(--font-display)" }}>
                  {n}
                </text>
                {on && <circle cx={x} cy="48" r="7" fill="var(--primary)" />}
              </g>
            );
          })}
          <text x={xOf(value)} y="24" textAnchor="middle" fontSize="26" className="sprout-pop">🐸</text>
        </svg>
      </div>

      <div className="w-btnrow">
        <button className="pill ghost" onClick={() => hop(-step)} aria-label={`Recuar ${step}`}><Icon name="back" size={18} /> −{step}</button>
        <button className="pill" onClick={() => hop(step)} aria-label={`Avançar ${step}`}>+{step} <Icon name="forward" size={18} /></button>
      </div>
    </div>
  );
}
