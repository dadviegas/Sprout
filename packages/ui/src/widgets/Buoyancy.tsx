import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

/* Buoyancy — why do boats float? The water pushes UP on the boat (a force called
 * impulsão) while gravity pulls it DOWN (the weight). While the boat pushes aside
 * enough water, the up-push wins and it floats. Load cargo and watch it sink
 * lower; overload it and it goes under. Tap the arrows/labels to hear; load with
 * the buttons. Read-aloud only on a tap. */
export interface BuoyancySpec {
  title?: string;
}

const MAX = 4; // cargo boxes before it sinks

const SAY = {
  peso: "O peso: a gravidade puxa o barco para baixo. Quanto mais carga, mais pesado fica.",
  impulsao: "A impulsão: a água empurra o barco para cima. É esta força que o segura à tona.",
  agua: "Água deslocada: o barco afasta a água para os lados. Quanta mais água ele afasta, mais forte a água o empurra para cima.",
  flutua: "Enquanto a impulsão for igual ao peso, o barco flutua, mesmo sendo pesado!",
  afunda: "Carga a mais! O peso ficou maior do que a impulsão, e o barco foi ao fundo.",
};

export function Buoyancy({ spec }: { spec: BuoyancySpec }) {
  const [cargo, setCargo] = useState(0);
  const [sel, setSel] = useState<keyof typeof SAY | null>(null);
  const sunk = cargo > MAX;

  const pick = (k: keyof typeof SAY) => {
    setSel(k);
    speak(SAY[k]);
  };

  // how deep the boat sits: more cargo → lower; sunk → at the bottom
  const sink = sunk ? 64 : cargo * 6;
  const boatY = 76 + sink;

  return (
    <div className={`widget buoyancy-widget${sunk ? " sunk" : ""}`}>
      <div className="w-head">
        <span className="w-badge"><Icon name="sailboat" size={16} /> Porque flutuam os barcos?</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Carrega o barco e vê o que acontece</span>
        <Speaker text={`${SAY.impulsao} ${SAY.peso} ${SAY.flutua}`} className="w-readout-sm" label="Ouvir a explicação" />
      </div>

      <div className="buoyancy-body">
        <svg className="buoyancy-svg" viewBox="0 0 300 200" role="img" aria-label="Um barco a flutuar na água, com a força do peso para baixo e a impulsão para cima">
          <rect x="0" y="0" width="300" height="200" rx="12" fill="#eaf6ff" />
          {/* water */}
          <rect x="0" y="112" width="300" height="88" fill="#5bb6e6" />
          <rect x="0" y="112" width="300" height="88" fill="#3aa0e6" opacity="0.25" />
          {/* waterline */}
          <line x1="0" y1="112" x2="300" y2="112" stroke="#2b8fd0" strokeWidth="2" strokeDasharray="6 5" />

          {/* boat (hull + cargo), bobbing via CSS */}
          <g className="buoyancy-boat" transform={`translate(150 ${boatY})`}>
            {/* cargo boxes stacked in the hull */}
            {Array.from({ length: Math.min(cargo, MAX + 1) }, (_, i) => (
              <rect key={i} x={-14 + (i % 3) * 14 - 7} y={-14 - Math.floor(i / 3) * 12} width="12" height="11" rx="2" fill="#c9863f" stroke="#8a5a26" strokeWidth="1" />
            ))}
            {/* hull */}
            <path d="M-42 0 L42 0 L30 24 L-30 24 Z" fill="#e2553f" stroke="#a83824" strokeWidth="2" />
          </g>

          {/* force arrows */}
          {/* weight: down */}
          <g onClick={() => pick("peso")} style={{ cursor: "pointer" }} role="button" aria-label="Peso">
            <line x1="170" y1={boatY + 8} x2="170" y2={Math.min(184, boatY + 40)} stroke={sel === "peso" ? "var(--primary)" : "#c0392b"} strokeWidth="5" strokeLinecap="round" />
            <path d={`M170 ${Math.min(190, boatY + 46)} l-7 -10 14 0 z`} fill={sel === "peso" ? "var(--primary)" : "#c0392b"} />
            <text x="180" y={Math.min(178, boatY + 34)} fontSize="11" fontWeight="800" fill="#c0392b">peso</text>
          </g>
          {/* buoyancy: up (hidden when sunk) */}
          {!sunk && (
            <g onClick={() => pick("impulsao")} style={{ cursor: "pointer" }} role="button" aria-label="Impulsão">
              <line x1="130" y1={boatY + 42} x2="130" y2={boatY + 10} stroke={sel === "impulsao" ? "var(--primary)" : "#1b7e3c"} strokeWidth="5" strokeLinecap="round" />
              <path d={`M130 ${boatY + 4} l-7 10 14 0 z`} fill={sel === "impulsao" ? "var(--primary)" : "#1b7e3c"} />
              <text x="70" y={boatY + 30} fontSize="11" fontWeight="800" fill="#1b7e3c">impulsão</text>
            </g>
          )}
        </svg>

        <div className="buoyancy-side">
          <p className={`buoyancy-state ${sunk ? "bad" : "good"}`}>
            {sunk ? "Foi ao fundo! 🫧" : cargo === 0 ? "A flutuar! ⛵" : `A flutuar com ${cargo} caixa${cargo === 1 ? "" : "s"} 📦`}
          </p>
          <div className="w-btnrow">
            <button className="pill ghost" onClick={() => setCargo((c) => Math.max(0, c - 1))} disabled={cargo === 0} aria-label="Tirar carga">
              <Icon name="minus" size={18} />
            </button>
            <span className="buoyancy-count">{cargo}</span>
            <button className="pill" onClick={() => setCargo((c) => Math.min(MAX + 1, c + 1))} aria-label="Pôr carga">
              <Icon name="plus" size={18} />
            </button>
          </div>
          <Speaker text={sunk ? SAY.afunda : SAY.agua} className="prose-speak" label="Ouvir" />
        </div>
      </div>
    </div>
  );
}
