import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";

export interface TenFrameSpec {
  count?: number; // initial filled
  emoji?: string; // counter emoji
  title?: string;
}

export function TenFrame({ spec }: { spec: TenFrameSpec }) {
  const emoji = spec.emoji ?? "🔵";
  const init = Math.min(Math.max(spec.count ?? 0, 0), 10);
  const [cells, setCells] = useState<boolean[]>(() => Array.from({ length: 10 }, (_, i) => i < init));

  const total = cells.filter(Boolean).length;

  const toggle = (i: number) => {
    setCells((prev) => {
      const next = prev.slice();
      next[i] = !next[i];
      speak(String(next.filter(Boolean).length));
      return next;
    });
  };

  return (
    <div className="widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="grid" size={16} /> Caixa do 10</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-readout-sm">Tenho {total}</span>
      </div>

      <div className="tenframe">
        {cells.map((on, i) => (
          <button key={i} className={`tf-cell ${on ? "on" : ""}`} onClick={() => toggle(i)} aria-label={on ? "tirar" : "pôr"}>
            {on ? emoji : ""}
          </button>
        ))}
      </div>

      <div className="w-btnrow">
        <span className="stat-chip">Total: {total} {total === 10 ? "— cheia!" : ""}</span>
        <button className="pill ghost" onClick={() => { setCells(Array(10).fill(false)); }}><Icon name="trash" size={18} /> Limpar</button>
        <button className="iconbtn" onClick={() => speak(`Tenho ${total}`)} aria-label="Ouvir"><Icon name="speaker" size={18} /></button>
      </div>
    </div>
  );
}
