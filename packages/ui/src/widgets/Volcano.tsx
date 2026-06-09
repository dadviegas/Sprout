import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

/* Volcano — a cut-through of a volcano: the magma chamber deep down, the conduit
 * (chaminé), the crater and, on tap, an eruption with lava and ash. Tap each part
 * to hear what it is; press the button to make it erupt (the lava/ash animation
 * honours prefers-reduced-motion via CSS). Built for the Laboratório/Planeta
 * Terra articles. Read-aloud only on a tap (button or part). */
export interface VolcanoSpec {
  title?: string;
}

interface Part {
  key: string;
  name: string;
  say: string;
}

const PARTS: Part[] = [
  { key: "camara", name: "Câmara magmática", say: "A câmara magmática: lá no fundo, a rocha está tão quente que derrete e fica líquida. A essa rocha derretida chamamos magma." },
  { key: "chamine", name: "Chaminé", say: "A chaminé: é o caminho por onde o magma sobe, como uma palhinha gigante dentro da montanha." },
  { key: "cratera", name: "Cratera", say: "A cratera: é a abertura lá no cimo, a boca do vulcão por onde tudo sai." },
  { key: "lava", name: "Lava", say: "A lava: quando o magma sai cá para fora, muda de nome e passa a chamar-se lava. Escorre pela montanha e, ao arrefecer, volta a ser pedra." },
];

const WHOLE =
  "O vulcão. Lá no fundo está a câmara magmática, cheia de rocha derretida a que chamamos magma. Quando há muita pressão, o magma sobe pela chaminé e sai pela cratera. Cá fora, o magma passa a chamar-se lava e escorre pela montanha.";

export function Volcano({ spec }: { spec: VolcanoSpec }) {
  const [sel, setSel] = useState<string | null>(null);
  const [erupt, setErupt] = useState(false);

  const pick = (p: Part) => {
    setSel(p.key);
    speak(p.say);
  };

  const on = (key: string) => sel === key;

  return (
    <div className={`widget volcano-widget${erupt ? " erupting" : ""}`}>
      <div className="w-head">
        <span className="w-badge"><Icon name="mountain" size={16} /> Vulcão</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca em cada parte do vulcão</span>
        <Speaker text={WHOLE} className="w-readout-sm" label="Ouvir como funciona o vulcão" />
      </div>

      <div className="volcano-body">
        <svg className="volcano-svg" viewBox="0 0 300 220" role="img" aria-label="Um vulcão por dentro: câmara magmática, chaminé, cratera e lava">
          {/* sky */}
          <rect x="0" y="0" width="300" height="220" rx="12" fill="#cfe6f5" />
          {/* ground / underground */}
          <rect x="0" y="150" width="300" height="70" fill="#6b4a31" />
          <rect x="0" y="178" width="300" height="42" fill="#4e3522" />

          {/* ash cloud (only when erupting) */}
          <g className="volcano-ash" fill="#9a9088" opacity="0.9">
            <ellipse cx="150" cy="34" rx="30" ry="20" />
            <ellipse cx="124" cy="42" rx="20" ry="15" />
            <ellipse cx="176" cy="42" rx="20" ry="15" />
          </g>

          {/* mountain */}
          <path d="M60 150 L120 60 Q150 40 180 60 L240 150 Z" fill="#7a5a3c" stroke="#5e4329" strokeWidth="2" />
          <path d="M60 150 L120 60 Q150 40 180 60 L240 150 Z" fill="url(#volc-shade)" opacity="0.25" />
          <defs>
            <linearGradient id="volc-shade" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* conduit (chaminé) */}
          <path d="M141 76 L138 195 L162 195 L159 76 Z" fill="#3a2a1c"
            stroke={on("chamine") ? "var(--primary)" : "#2a1d12"} strokeWidth={on("chamine") ? 3 : 1.5} />
          {/* magma in the conduit */}
          <path d="M144 80 L142 195 L158 195 L156 80 Z" fill="#ff7a1a" opacity="0.85" />

          {/* magma chamber */}
          <ellipse cx="150" cy="196" rx="58" ry="20" fill="#ff6a00"
            stroke={on("camara") ? "var(--primary)" : "#b34700"} strokeWidth={on("camara") ? 3 : 1.5} />
          <ellipse cx="150" cy="196" rx="40" ry="12" fill="#ffd23f" opacity="0.7" />

          {/* crater rim */}
          <path d="M132 62 Q150 52 168 62" fill="none"
            stroke={on("cratera") ? "var(--primary)" : "#5e4329"} strokeWidth={on("cratera") ? 4 : 3} strokeLinecap="round" />

          {/* lava: a glowing pool at the crater + flows down the side */}
          <g className="volcano-lava">
            <ellipse cx="150" cy="64" rx="16" ry="6" fill="#ff3d00" />
            <path className="volcano-flow" d="M150 64 Q158 100 176 132 Q182 146 196 152" fill="none" stroke="#ff5722" strokeWidth="7" strokeLinecap="round" />
            <path className="volcano-flow flow-2" d="M150 64 Q140 102 126 132 Q120 144 108 150" fill="none" stroke="#ff7a1a" strokeWidth="6" strokeLinecap="round" />
            {/* lava droplets shooting up */}
            {[-14, -4, 6, 14].map((dx, i) => (
              <circle key={i} className={`volcano-spark sp-${i}`} cx={150 + dx} cy="58" r={3 - (i % 2)} fill="#ffb300" />
            ))}
          </g>

          {/* tappable hotspots over each part */}
          {[
            { key: "lava", x: 150, y: 60, w: 70, h: 18 },
            { key: "cratera", x: 150, y: 64, w: 44, h: 16 },
            { key: "chamine", x: 150, y: 130, w: 26, h: 90 },
            { key: "camara", x: 150, y: 196, w: 116, h: 40 },
          ].map((h) => (
            <rect key={h.key} x={h.x - h.w / 2} y={h.y - h.h / 2} width={h.w} height={h.h}
              fill="transparent" style={{ cursor: "pointer" }} role="button"
              aria-label={PARTS.find((p) => p.key === h.key)?.name}
              onClick={() => pick(PARTS.find((p) => p.key === h.key)!)} />
          ))}
        </svg>

        <div className="volcano-side">
          <div className="volcano-parts">
            {PARTS.map((p) => (
              <button key={p.key} className={`chip${on(p.key) ? " on" : ""}`} onClick={() => pick(p)}>
                {p.name}
              </button>
            ))}
          </div>
          <button className="pill" onClick={() => setErupt((e) => !e)}>
            <Icon name={erupt ? "stop" : "flame"} size={18} /> {erupt ? "Acalmar o vulcão" : "Entrar em erupção!"}
          </button>
        </div>
      </div>
    </div>
  );
}
