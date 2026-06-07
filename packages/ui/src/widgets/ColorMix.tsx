import { useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "../Speaker";

/* ColorMix — the RGB mixer. Three sliders (Vermelho/Verde/Azul, 0–255) drive a
 * live swatch with its HEX + RGB code, so a child SEES that every colour on a
 * screen is just three lights mixed. Teaches the "256 levels each → 16 777 216
 * colours" idea behind "Como nascem as cores?". Sliders update only the swatch
 * (no speech on drag — the speech rule); the speaker button reads the colour. */
export interface ColorMixSpec {
  title?: string;
  /** initial channel values (0–255) */
  r?: number;
  g?: number;
  b?: number;
}

const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
const hex2 = (n: number) => clamp(n).toString(16).padStart(2, "0").toUpperCase();

export function ColorMix({ spec }: { spec: ColorMixSpec }) {
  const [r, setR] = useState(clamp(spec.r ?? 80));
  const [g, setG] = useState(clamp(spec.g ?? 160));
  const [b, setB] = useState(clamp(spec.b ?? 220));

  const rgb = `rgb(${r}, ${g}, ${b})`;
  const hex = `#${hex2(r)}${hex2(g)}${hex2(b)}`;
  // Pick black or white text for contrast against the swatch (perceived luminance).
  const ink = 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#1b1b1b" : "#ffffff";
  const say = `Esta cor tem vermelho ${r}, verde ${g} e azul ${b}. O código é ${hex}.`;

  const channels: { key: string; name: string; val: number; set: (n: number) => void; color: string }[] = [
    { key: "R", name: "Vermelho", val: r, set: setR, color: "#e23b3b" },
    { key: "G", name: "Verde", val: g, set: setG, color: "#2fa84f" },
    { key: "B", name: "Azul", val: b, set: setB, color: "#2f6fe2" },
  ];

  return (
    <div className="widget colormix-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="palette" size={16} /> Misturador de cores</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Mexe nos botões e vê a cor mudar</span>
        <Speaker text={say} className="colormix-hear" label="Ouvir a cor">Ouvir a cor</Speaker>
      </div>

      <div className="colormix-stage">
        <div className="colormix-swatch" style={{ background: rgb, color: ink }}>
          <span className="colormix-hex">{hex}</span>
          <span className="colormix-rgb">R {r} · G {g} · B {b}</span>
        </div>
        <div className="colormix-sliders">
          {channels.map((c) => (
            <label key={c.key} className="colormix-slider">
              <span className="colormix-slider__name" style={{ color: c.color }}>{c.name}</span>
              <input
                type="range"
                min={0}
                max={255}
                value={c.val}
                onChange={(e) => c.set(clamp(Number(e.target.value)))}
                style={{ accentColor: c.color }}
                aria-label={`${c.name}: ${c.val} de 255`}
              />
              <span className="colormix-slider__val">{c.val}</span>
            </label>
          ))}
        </div>
      </div>

      <p className="colormix-note">
        Cada cor mistura <b>Vermelho</b>, <b>Verde</b> e <b>Azul</b>, cada um de <b>0 a 255</b> (são 256 níveis).
        256 × 256 × 256 = <b>16 777 216</b> cores! 🤯
      </p>
    </div>
  );
}
