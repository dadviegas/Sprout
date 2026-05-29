import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";
import { colorVar, piePath } from "./geo";

export interface FractionSpec {
  parts?: number; // 2–8
  filled?: number; // initial shaded
  shape?: "pie" | "bar";
  color?: string;
  title?: string;
}

const NAMES: Record<number, string> = { 2: "meios", 3: "terços", 4: "quartos", 5: "quintos", 6: "sextos", 8: "oitavos" };

export function Fraction({ spec }: { spec: FractionSpec }) {
  const parts = Math.min(Math.max(spec.parts ?? 4, 2), 8);
  const shape = spec.shape ?? "pie";
  const stroke = colorVar(spec.color ?? "accent");
  const fill = colorVar(spec.color ?? "accent");
  const [on, setOn] = useState<boolean[]>(() => Array.from({ length: parts }, (_, i) => i < (spec.filled ?? 1)));
  const filled = on.filter(Boolean).length;

  const toggle = (i: number) => {
    setOn((prev) => {
      const next = prev.slice();
      next[i] = !next[i];
      const f = next.filter(Boolean).length;
      speak(`${f} de ${parts}`);
      return next;
    });
  };

  return (
    <div className="widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="fraction" size={16} /> Frações</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca nas fatias para pintar</span>
      </div>

      <div className="fraction-body">
        {shape === "pie" ? (
          <svg viewBox="0 0 200 200" className="fraction-svg" role="img" aria-label={`${filled} de ${parts}`}>
            {on.map((isOn, i) => (
              <path
                key={i}
                d={piePath(100, 100, 92, (i * 360) / parts, ((i + 1) * 360) / parts)}
                fill={isOn ? fill : "var(--surface)"}
                stroke={stroke}
                strokeWidth="3"
                style={{ cursor: "pointer", transition: "fill .15s" }}
                onClick={() => toggle(i)}
              />
            ))}
          </svg>
        ) : (
          <div className="fraction-bar" role="img" aria-label={`${filled} de ${parts}`}>
            {on.map((isOn, i) => (
              <button
                key={i}
                className="fb-seg"
                onClick={() => toggle(i)}
                style={{ background: isOn ? fill : "var(--surface)", borderColor: stroke }}
                aria-label={isOn ? "despintar" : "pintar"}
              />
            ))}
          </div>
        )}

        <div className="fraction-readout">
          <div className="fraction-num" style={{ color: stroke }}>
            <span>{filled}</span>
            <span className="fraction-line" />
            <span>{parts}</span>
          </div>
          <div className="w-readout-sm">{filled} de {parts} {NAMES[parts] ?? "partes"}</div>
          <Speaker text={`${filled} de ${parts}`} className="prose-speak" />
        </div>
      </div>
    </div>
  );
}
