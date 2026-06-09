import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

/* Layers — things made of layers, drawn either STACKED (the atmosphere, the
 * ocean depths) or CONCENTRIC (inside the Earth: crust, mantle, core). Tap a
 * layer to light it up and hear what it is. Read-aloud only on a tap. */
export interface Layer {
  label: string;
  /** band/ring colour (hex or token); a palette is used if omitted */
  color?: string;
  say?: string;
  /** a short extra note shown under the label */
  note?: string;
}

export interface LayersSpec {
  title?: string;
  /** "stack" (default): bands top→bottom; "concentric": rings outside→in */
  shape?: "stack" | "concentric";
  /** layers in order — for "stack", top first; for "concentric", outer first */
  layers: Layer[];
}

const PALETTE = ["#7ec4f0", "#9bd3a0", "#e0c074", "#e09b5a", "#d3705a", "#b3503f"];

export function Layers({ spec }: { spec: LayersSpec }) {
  const layers = spec.layers ?? [];
  const concentric = spec.shape === "concentric";
  const [sel, setSel] = useState<number | null>(null);

  const pick = (k: number) => {
    setSel(k);
    const l = layers[k];
    speak(l.say ?? `${l.label}.`);
  };

  const colorOf = (k: number) => layers[k].color ?? PALETTE[k % PALETTE.length];
  const whole = `${spec.title ?? "As camadas"}. ${layers.map((l) => l.label).join(", depois ")}.`;

  return (
    <div className="widget layers-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="structure" size={16} /> Camadas</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca em cada camada</span>
        <Speaker text={whole} className="w-readout-sm" label="Ouvir as camadas" />
      </div>

      <div className="layers-body">
        {concentric ? (
          <svg className="layers-svg" viewBox="0 0 200 200" role="img" aria-label={whole}>
            {layers.map((_, k) => {
              const r = 96 - (k * 92) / layers.length;
              const on = sel === k;
              return (
                <circle key={k} cx="100" cy="100" r={r} fill={colorOf(k)}
                  stroke={on ? "var(--ink)" : "#fff"} strokeWidth={on ? 4 : 2}
                  style={{ cursor: "pointer" }} role="button" aria-label={layers[k].label}
                  onClick={() => pick(k)} />
              );
            })}
          </svg>
        ) : (
          <div className="layers-stack">
            {layers.map((l, k) => {
              const on = sel === k;
              return (
                <button key={k} className={`layers-band${on ? " on" : ""}`}
                  style={{ background: colorOf(k) }} onClick={() => pick(k)}>
                  <span className="layers-band__label">{l.label}</span>
                  {l.note && <span className="layers-band__note">{l.note}</span>}
                </button>
              );
            })}
          </div>
        )}

        <ol className="layers-legend">
          {layers.map((l, k) => (
            <li key={k}>
              <button className={`layers-key${sel === k ? " on" : ""}`} onClick={() => pick(k)}>
                <span className="layers-key__dot" style={{ background: colorOf(k) }} aria-hidden />
                <span className="layers-key__label">{l.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
