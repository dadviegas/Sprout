import { useState, type ReactNode } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

/* BodySystem — a friendly human silhouette whose organ systems light up one at a
   time. Tap a system chip (digestivo, respiratório, circulatório, excretor,
   nervoso, locomotor) to see its organs on the body and hear what it does.
   The heart gives a gentle beat when the circulatory system is shown (CSS, and
   it honours prefers-reduced-motion). Static, resolution-independent SVG — sharp
   on iPad/phone/desktop. Speech only fires on an explicit tap (see speak rule). */

export interface BodySystemSpec {
  title?: string;
  /** Which systems to show, in order. Defaults to all six. */
  systems?: string[];
}

interface BodySys {
  key: string;
  name: string;
  color: string;
  organs: string; // short list shown on the side
  say: string; // read-aloud description
}

const CATALOG: BodySys[] = [
  {
    key: "respiratorio",
    name: "Respiratório",
    color: "#3aa0e6",
    organs: "nariz, traqueia, pulmões",
    say: "Sistema respiratório: o ar entra pelo nariz, desce pela traqueia e enche os pulmões. Traz o oxigénio para o corpo e leva o dióxido de carbono para fora.",
  },
  {
    key: "circulatorio",
    name: "Circulatório",
    color: "#e23d4b",
    organs: "coração, vasos sanguíneos",
    say: "Sistema circulatório: o coração bombeia o sangue por todo o corpo, pelos vasos sanguíneos. O sangue leva oxigénio e alimento a cada pedacinho de ti.",
  },
  {
    key: "digestivo",
    name: "Digestivo",
    color: "#e8913a",
    organs: "boca, esófago, estômago, intestinos",
    say: "Sistema digestivo: a comida desce da boca pelo esófago até ao estômago, e depois aos intestinos. Transforma a comida em energia e o resto sai como cocó.",
  },
  {
    key: "excretor",
    name: "Excretor",
    color: "#27b2a2",
    organs: "rins, bexiga",
    say: "Sistema excretor: os dois rins limpam o sangue e fazem o chichi, que se guarda na bexiga até saíres à casa de banho.",
  },
  {
    key: "nervoso",
    name: "Nervoso",
    color: "#8a6cf0",
    organs: "cérebro, espinal medula, nervos",
    say: "Sistema nervoso: o cérebro é o chefe. Pela espinal medula e pelos nervos, manda ordens a todo o corpo e sente tudo o que se passa.",
  },
  {
    key: "locomotor",
    name: "Locomotor",
    color: "#c79a3e",
    organs: "ossos e músculos",
    say: "Sistema locomotor: os ossos dão forma e firmeza ao corpo e os músculos puxam os ossos para te mexeres, correres e saltares.",
  },
];

/** The organs drawn for the selected system, overlaid on the silhouette. */
function organs(key: string, color: string): ReactNode {
  switch (key) {
    case "respiratorio":
      return (
        <g fill={color} stroke={color}>
          <rect x="97" y="80" width="6" height="34" rx="3" stroke="none" />
          <line x1="100" y1="112" x2="88" y2="128" strokeWidth="4" strokeLinecap="round" />
          <line x1="100" y1="112" x2="112" y2="128" strokeWidth="4" strokeLinecap="round" />
          <path d="M97,118 C80,116 73,152 86,168 C95,176 97,156 97,130 Z" stroke="none" opacity="0.9" />
          <path d="M103,118 C120,116 127,152 114,168 C105,176 103,156 103,130 Z" stroke="none" opacity="0.9" />
        </g>
      );
    case "circulatorio":
      return (
        <g>
          <path d="M100,150 C92,168 86,182 88,202" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <path d="M88,118 C78,128 78,150 90,164" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <path d="M112,118 C122,128 122,150 110,164" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <g className="bodysys-pulse">
            <path
              d="M100,150 C100,150 75,132 75,113 C75,101 88,98 100,112 C112,98 125,101 125,113 C125,132 100,150 100,150 Z"
              fill={color}
            />
          </g>
        </g>
      );
    case "digestivo":
      return (
        <g>
          <rect x="97" y="80" width="6" height="42" rx="3" fill={color} />
          <path d="M100,120 C100,120 82,120 79,135 C76,150 88,158 98,151 C106,146 105,131 100,120 Z" fill={color} opacity="0.9" />
          <path
            d="M92,156 C112,156 112,170 96,170 C80,170 84,186 104,184 C116,183 116,195 100,197"
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );
    case "excretor":
      return (
        <g fill={color} stroke={color}>
          <path d="M86,150 C76,150 74,168 84,172 C92,175 92,161 90,153 C89,150.5 88,150 86,150 Z" stroke="none" />
          <path d="M114,150 C124,150 126,168 116,172 C108,175 108,161 110,153 C111,150.5 112,150 114,150 Z" stroke="none" />
          <line x1="87" y1="170" x2="99" y2="190" strokeWidth="3" strokeLinecap="round" />
          <line x1="113" y1="170" x2="101" y2="190" strokeWidth="3" strokeLinecap="round" />
          <path d="M100,186 C109,188 109,200 100,202 C91,200 91,188 100,186 Z" stroke="none" />
        </g>
      );
    case "nervoso":
      return (
        <g>
          <path
            d="M86,38 C84,27 95,23 100,30 C105,23 116,27 114,38 C119,45 112,53 100,53 C88,53 81,45 86,38 Z"
            fill={color}
          />
          <line x1="100" y1="30" x2="100" y2="50" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
          <rect x="98" y="64" width="4" height="134" rx="2" fill={color} />
          {[96, 116, 136, 156, 176].map((y) => (
            <g key={y}>
              <line x1="100" y1={y} x2="86" y2={y + 6} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="100" y1={y} x2="114" y2={y + 6} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ))}
        </g>
      );
    case "locomotor":
      return (
        <g stroke={color} fill="none" strokeLinecap="round">
          <rect x="98" y="82" width="4" height="118" rx="2" fill={color} stroke="none" />
          {[104, 120, 136].map((y) => (
            <g key={y}>
              <path d={`M100,${y} C86,${y - 2} 80,${y + 8} 86,${y + 16}`} strokeWidth="3" />
              <path d={`M100,${y} C114,${y - 2} 120,${y + 8} 114,${y + 16}`} strokeWidth="3" />
            </g>
          ))}
          <line x1="49" y1="92" x2="49" y2="182" strokeWidth="5" />
          <line x1="151" y1="92" x2="151" y2="182" strokeWidth="5" />
          <line x1="83" y1="212" x2="83" y2="308" strokeWidth="6" />
          <line x1="117" y1="212" x2="117" y2="308" strokeWidth="6" />
          <line x1="78" y1="200" x2="122" y2="200" strokeWidth="4" />
        </g>
      );
    default:
      return null;
  }
}

export function BodySystem({ spec }: { spec: BodySystemSpec }) {
  const wanted = spec.systems?.length
    ? CATALOG.filter((s) => spec.systems!.includes(s.key))
    : CATALOG;
  const systems = wanted.length ? wanted : CATALOG;
  const [sel, setSel] = useState(systems[0].key);
  const current = systems.find((s) => s.key === sel) ?? systems[0];

  const pick = (s: BodySys) => {
    setSel(s.key);
    speak(s.say);
  };

  return (
    <div className="widget bodysystem-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="body" size={16} /> O corpo humano</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca num sistema para o veres e ouvires</span>
      </div>

      <div className="bodysystem-body">
        <svg className="bodysystem-svg" viewBox="0 0 200 330" role="img" aria-label={`O corpo humano: sistema ${current.name}`}>
          {/* silhouette (neutral, so the coloured organs pop in light & dark) */}
          <g fill="var(--surface-2)" stroke="var(--border-strong)" strokeWidth="2">
            <rect x="40" y="84" width="18" height="104" rx="9" />
            <rect x="142" y="84" width="18" height="104" rx="9" />
            <rect x="72" y="206" width="22" height="112" rx="11" />
            <rect x="106" y="206" width="22" height="112" rx="11" />
            <rect x="90" y="62" width="20" height="22" rx="6" />
            <rect x="62" y="78" width="76" height="130" rx="26" />
            <circle cx="100" cy="40" r="28" />
          </g>
          {/* the selected system's organs */}
          {organs(current.key, current.color)}
        </svg>

        <div className="bodysystem-side">
          <div className="bodysystem-chips">
            {systems.map((s) => {
              const on = s.key === sel;
              return (
                <button
                  key={s.key}
                  type="button"
                  className="bodysys-chip"
                  onClick={() => pick(s)}
                  aria-pressed={on}
                  style={on ? { background: s.color, borderColor: s.color, color: "#fff" } : undefined}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
          <div className="bodysystem-name" style={{ color: current.color }}>{current.name}</div>
          <p className="bodysystem-organs">{current.organs}</p>
          <Speaker text={current.say} className="prose-speak" label={`Ouvir o sistema ${current.name.toLowerCase()}`} />
        </div>
      </div>
    </div>
  );
}
