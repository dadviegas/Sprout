import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";

export interface MoneySpec {
  items?: number[]; // values in euros, e.g. [1, 0.5, 0.2]
  target?: number; // optional goal in euros
  title?: string;
}

const EURO_VALUES = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20];

function label(v: number): string {
  return v < 1 ? `${Math.round(v * 100)}c` : `${v % 1 === 0 ? v : v.toFixed(2).replace(".", ",")}€`;
}

function fmt(v: number): string {
  return `${v.toFixed(2).replace(".", ",")} €`;
}

function tokenStyle(v: number): React.CSSProperties {
  if (v >= 5) return { background: v >= 20 ? "#7ea6d8" : v >= 10 ? "#e08585" : "#cbb88a", borderRadius: 8, width: 78, height: 44 }; // notes
  const copper = v < 0.1;
  const gold = v < 1;
  return {
    background: copper ? "#c8814a" : gold ? "#e6c34d" : "#d9d2c2",
    borderRadius: "50%",
    width: 54,
    height: 54,
  };
}

export function Money({ spec }: { spec: MoneySpec }) {
  const items = (spec.items && spec.items.length ? spec.items : [1, 0.5, 0.2, 0.1, 0.05]).filter((v) => EURO_VALUES.includes(v));
  const [picked, setPicked] = useState<boolean[]>(() => items.map(() => false));
  const total = items.reduce((s, v, i) => s + (picked[i] ? v : 0), 0);
  const hit = spec.target != null && Math.abs(total - spec.target) < 0.001;

  const toggle = (i: number) => {
    setPicked((prev) => {
      const next = prev.slice();
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div className="widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="coin" size={16} /> Dinheiro</span>
        {spec.title && <strong>{spec.title}</strong>}
        {spec.target != null && <span className="w-hint">Objetivo: {fmt(spec.target)}</span>}
      </div>

      <div className="coins">
        {items.map((v, i) => (
          <button key={i} className={`coin ${picked[i] ? "picked" : ""}`} onClick={() => toggle(i)} style={tokenStyle(v)} aria-label={`${label(v)} ${picked[i] ? "no mealheiro" : ""}`}>
            {label(v)}
          </button>
        ))}
      </div>

      <div className="w-btnrow">
        <span className="stat-chip" style={{ fontSize: "1.05em" }}>
          Total: <strong>{fmt(total)}</strong> {hit ? <Icon name="check" size={16} style={{ color: "var(--ok)", verticalAlign: "-2px" }} /> : null}
        </span>
        <button className="iconbtn" onClick={() => speak(`Tenho ${fmt(total)}`)} aria-label="Ouvir total"><Icon name="speaker" size={18} /></button>
        <button className="pill ghost" onClick={() => setPicked(items.map(() => false))}><Icon name="trash" size={18} /> Limpar</button>
      </div>
    </div>
  );
}
