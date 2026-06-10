import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

export interface WaterCycleSpec {
  title?: string;
}

interface Stage {
  key: string;
  name: string;
  say: string;
  x: number;
  y: number;
}

const STAGES: Stage[] = [
  { key: "evap", name: "Evaporação", say: "Evaporação: o Sol aquece a água do mar e dos rios, e ela sobe em vapor.", x: 64, y: 118 },
  { key: "cond", name: "Condensação", say: "Condensação: lá no alto o vapor arrefece e junta-se, formando as nuvens.", x: 150, y: 24 },
  { key: "prec", name: "Precipitação", say: "Precipitação: as nuvens ficam cheias e largam a água — chuva, neve ou granizo.", x: 232, y: 92 },
  { key: "esco", name: "Escoamento", say: "Escoamento: a água corre pela terra e pelos rios até voltar ao mar, e tudo recomeça.", x: 250, y: 176 },
];

const WHOLE =
  "O ciclo da água. Primeiro a evaporação: o Sol aquece a água e ela sobe. Depois a condensação: o vapor forma as nuvens. A seguir a precipitação: cai a chuva. Por fim o escoamento: a água corre até ao mar, e tudo recomeça.";

export function WaterCycle({ spec }: { spec: WaterCycleSpec }) {
  const [sel, setSel] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  const pick = (s: Stage) => {
    setSel(s.key);
    speak(s.say);
  };

  return (
    <div className="widget watercycle-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="drop" size={16} /> Ciclo da água</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca em cada passo da viagem</span>
      </div>

      <div className="watercycle-body">
        <svg className="watercycle-svg" viewBox="0 0 300 200" role="img" aria-label="O ciclo da água: evaporação, condensação, precipitação e escoamento">
          {/* sky */}
          <rect x="0" y="0" width="300" height="200" fill="var(--info-soft)" rx="12" />
          {/* sun */}
          <circle cx="36" cy="34" r="18" fill="#ffce47" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return <line key={i} x1={36 + Math.cos(a) * 22} y1={34 + Math.sin(a) * 22} x2={36 + Math.cos(a) * 29} y2={34 + Math.sin(a) * 29} stroke="#ffce47" strokeWidth="3" strokeLinecap="round" />;
          })}
          {/* sea + land */}
          <path d="M0 150 q 18 -8 36 0 t 36 0 t 36 0 t 36 0 t 36 0 t 36 0 t 36 0 t 36 0 V200 H0 Z" fill="#3aa0e6" />
          <path d="M214 150 q 24 -34 50 -34 q 22 0 36 34 Z" fill="#6bbf6b" />
          {/* cloud */}
          <g fill="#eef3f8" stroke="#cdd8e4" strokeWidth="1.5">
            <ellipse cx="150" cy="58" rx="30" ry="18" />
            <ellipse cx="128" cy="62" rx="18" ry="13" />
            <ellipse cx="172" cy="62" rx="18" ry="13" />
          </g>
          {/* evaporation: vapour rising on the left */}
          {[92, 108].map((x) => (
            <path key={x} d={`M${x} 146 C ${x - 7} 122, ${x + 7} 104, ${x} 82`} fill="none" stroke="#bfe0f5" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 8" />
          ))}
          <path d="M100 86 l-5 -8 10 0 z" fill="#bfe0f5" />
          {/* precipitation: rain under the cloud */}
          {[138, 152, 166].map((x) => (
            <line key={x} x1={x} y1="78" x2={x - 4} y2="104" stroke="#3aa0e6" strokeWidth="3" strokeLinecap="round" />
          ))}
          {/* run-off: a little river back to the sea */}
          <path d="M250 132 q -6 12 -22 18" fill="none" stroke="#3aa0e6" strokeWidth="5" strokeLinecap="round" />

          {/* travelling droplet (CSS animation; honours reduced motion) */}
          <circle className={`wc-drop${paused ? " paused" : ""}`} cx="0" cy="0" r="5" fill="#1f7fc4" stroke="#fff" strokeWidth="1.5" />

          {/* tappable stage badges */}
          {STAGES.map((s) => {
            const on = s.key === sel;
            const w = s.name.length * 7 + 18;
            return (
              <g key={s.key} transform={`translate(${s.x} ${s.y})`} onClick={() => pick(s)} style={{ cursor: "pointer" }} role="button" aria-label={s.name}>
                {/* invisible halo: a finger-sized hit area around the slim chip */}
                <rect x={-w / 2 - 6} y="-18" width={w + 12} height="36" fill="transparent" />
                <rect x={-w / 2} y="-12" width={w} height="24" rx="12" fill={on ? "var(--primary)" : "var(--surface)"} stroke={on ? "var(--primary)" : "var(--border-strong)"} strokeWidth="1.5" />
                <text x="0" y="4" textAnchor="middle" fontSize="12" fontWeight="800" fill={on ? "#fff" : "var(--ink)"} style={{ pointerEvents: "none" }}>{s.name}</text>
              </g>
            );
          })}
        </svg>

        <div className="watercycle-side">
          <button className="pill ghost" onClick={() => setPaused((p) => !p)}>
            <Icon name={paused ? "forward" : "stop"} size={18} /> {paused ? "Ver a gota a andar" : "Parar a gota"}
          </button>
          <Speaker text={WHOLE} className="prose-speak" label="Ouvir o ciclo todo" />
        </div>
      </div>
    </div>
  );
}
