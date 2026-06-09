import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

/* SkyBlue — why is the sky blue (and why does the sunset go red)? Sunlight is
 * white, but it is really a mix of all the colours. When it crosses the air, the
 * blue light bounces (scatters) in every direction and fills the sky with blue.
 * At sunset the light travels through much more air, so the blue scatters away
 * and the warm red/orange reaches our eyes. Toggle day/sunset; tap to hear.
 * Read-aloud only on tap. */
export interface SkyBlueSpec {
  title?: string;
}

const DAY_SAY =
  "De dia, o Sol está alto. A luz branca atravessa pouco ar, e a luz azul espalha-se por todo o céu. Por isso vês o céu azul.";
const DUSK_SAY =
  "Ao pôr do sol, o Sol está baixinho. A luz tem de atravessar muito mais ar, e a luz azul espalha-se toda para os lados. Sobra a luz vermelha e cor-de-laranja, e o céu fica todo quente.";

export function SkyBlue({ spec }: { spec: SkyBlueSpec }) {
  const [dusk, setDusk] = useState(false);
  const say = dusk ? DUSK_SAY : DAY_SAY;

  return (
    <div className={`widget skyblue-widget${dusk ? " is-dusk" : ""}`}>
      <div className="w-head">
        <span className="w-badge"><Icon name="sun" size={16} /> Porque é azul o céu?</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">{dusk ? "Pôr do sol" : "Dia"}</span>
        <Speaker text={say} className="w-readout-sm" label="Ouvir a explicação" />
      </div>

      <div className="skyblue-body">
        <svg className="skyblue-svg" viewBox="0 0 300 180" role="img" aria-label={dusk ? "Céu ao pôr do sol, vermelho e cor-de-laranja" : "Céu de dia, azul"}>
          <defs>
            <linearGradient id="sky-day" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#4ea8e0" />
              <stop offset="1" stopColor="#bfe6fb" />
            </linearGradient>
            <linearGradient id="sky-dusk" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#3a4a86" />
              <stop offset=".5" stopColor="#ef7a4a" />
              <stop offset="1" stopColor="#ffd27a" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="300" height="150" rx="12" fill={dusk ? "url(#sky-dusk)" : "url(#sky-day)"} />
          {/* ground */}
          <rect x="0" y="142" width="300" height="38" fill="#5b7d4b" />

          {/* sun: high for day, low for dusk */}
          <circle cx={dusk ? 250 : 56} cy={dusk ? 126 : 40} r="20" fill={dusk ? "#ffce6b" : "#fff1a8"} />
          {!dusk && Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return <line key={i} x1={56 + Math.cos(a) * 24} y1={40 + Math.sin(a) * 24} x2={56 + Math.cos(a) * 31} y2={40 + Math.sin(a) * 31} stroke="#fff1a8" strokeWidth="3" strokeLinecap="round" />;
          })}

          {/* the white sunbeam crossing the air */}
          <line
            x1={dusk ? 250 : 56} y1={dusk ? 126 : 40}
            x2={150} y2={150}
            stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.7" strokeDasharray="3 6"
          />

          {/* scattered blue light dots (day) — they bounce off in all directions */}
          {!dusk && [[110, 60], [150, 44], [186, 72], [96, 96], [210, 100], [142, 96]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#1f6fd0" opacity="0.85" />
          ))}
          {/* warm light reaching the eye (dusk) */}
          {dusk && [[120, 110], [150, 120], [180, 112]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#ff4d2e" opacity="0.9" />
          ))}

          {/* a little observer */}
          <g transform="translate(150 150)">
            <circle cx="0" cy="-12" r="7" fill="#ffd9b3" stroke="#7a5230" strokeWidth="1.5" />
            <rect x="-7" y="-6" width="14" height="14" rx="4" fill="#e8533f" />
          </g>
        </svg>

        <div className="skyblue-side">
          <p className="skyblue-explain">
            {dusk
              ? "A luz azul espalhou-se toda pelo caminho. Sobra a luz vermelha — o céu fica cor de fogo! 🔥"
              : "A luz azul espalha-se pelo ar todo e enche o céu de azul. 💙"}
          </p>
          <button className="pill" onClick={() => { const d = !dusk; setDusk(d); speak(d ? DUSK_SAY : DAY_SAY); }}>
            <Icon name="refresh" size={18} /> {dusk ? "Ver de dia" : "Ver o pôr do sol"}
          </button>
        </div>
      </div>
    </div>
  );
}
