import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

/* MapaPt — a stylised, tappable map of Portugal. The 18 mainland districts are
   dots placed by relative geography (north→south, west→east), numbered like the
   lesson; tap one to hear where it is. The Açores and Madeira sit in the ocean,
   a different colour and NOT numbered, to reinforce "Regiões Autónomas, não
   distritos". The shape is intentionally stylised (one source of truth for
   positions lives here, like the Compass), resolution-independent by viewBox —
   crisp on iPad/phone/desktop. Speech only fires on an explicit tap. */

export interface MapaPtSpec {
  title?: string;
  /** Subject colour key for the land/dots, default "edm". */
  color?: string;
}

interface Place {
  num?: number; // 1–18 for districts; undefined for Regiões Autónomas
  name: string;
  capital: string;
  x: number;
  y: number;
  ra?: boolean;
  say: string;
}

// Districts ordered north→south (the lesson's numbering). Coordinates are
// relative positions on the 200×330 viewBox, not survey-accurate.
const PLACES: Place[] = [
  { num: 1, name: "Viana do Castelo", capital: "Viana do Castelo", x: 66, y: 52, say: "Viana do Castelo, no extremo norte, junto ao mar." },
  { num: 2, name: "Braga", capital: "Braga", x: 84, y: 62, say: "Braga, uma das cidades mais antigas do país." },
  { num: 3, name: "Vila Real", capital: "Vila Real", x: 106, y: 58, say: "Vila Real, na região de Trás-os-Montes." },
  { num: 4, name: "Bragança", capital: "Bragança", x: 130, y: 50, say: "Bragança, no canto nordeste, junto à Espanha." },
  { num: 5, name: "Porto", capital: "Porto", x: 64, y: 82, say: "Porto, a segunda maior cidade, junto ao rio Douro." },
  { num: 6, name: "Aveiro", capital: "Aveiro", x: 60, y: 102, say: "Aveiro, com os seus canais e barcos moliceiros." },
  { num: 7, name: "Viseu", capital: "Viseu", x: 96, y: 94, say: "Viseu, no centro, perto da Serra da Estrela." },
  { num: 8, name: "Guarda", capital: "Guarda", x: 122, y: 90, say: "Guarda, a cidade mais alta de Portugal." },
  { num: 9, name: "Coimbra", capital: "Coimbra", x: 68, y: 124, say: "Coimbra, com a sua universidade muito antiga." },
  { num: 10, name: "Leiria", capital: "Leiria", x: 60, y: 148, say: "Leiria, perto do mar e do Pinhal." },
  { num: 11, name: "Castelo Branco", capital: "Castelo Branco", x: 118, y: 130, say: "Castelo Branco, no interior centro." },
  { num: 12, name: "Santarém", capital: "Santarém", x: 80, y: 166, say: "Santarém, à beira do rio Tejo." },
  { num: 13, name: "Lisboa", capital: "Lisboa", x: 56, y: 190, say: "Lisboa, a capital de Portugal, junto ao rio Tejo." },
  { num: 14, name: "Portalegre", capital: "Portalegre", x: 120, y: 165, say: "Portalegre, no Alto Alentejo." },
  { num: 15, name: "Setúbal", capital: "Setúbal", x: 68, y: 212, say: "Setúbal, ao sul de Lisboa, junto ao rio Sado." },
  { num: 16, name: "Évora", capital: "Évora", x: 98, y: 206, say: "Évora, no coração do Alentejo." },
  { num: 17, name: "Beja", capital: "Beja", x: 102, y: 246, say: "Beja, no Baixo Alentejo, terra de muito sol." },
  { num: 18, name: "Faro", capital: "Faro", x: 88, y: 286, say: "Faro, no Algarve, no extremo sul." },
  { name: "Açores", capital: "Ponta Delgada", x: 26, y: 250, ra: true, say: "Os Açores são uma Região Autónoma — nove ilhas no oceano. A capital é Ponta Delgada. Não é um distrito!" },
  { name: "Madeira", capital: "Funchal", x: 26, y: 296, ra: true, say: "A Madeira é uma Região Autónoma — ilhas no oceano. A capital é o Funchal. Não é um distrito!" },
];

const MAINLAND =
  "M54,42 L82,36 L106,36 L136,48 L132,70 L124,96 L130,124 L137,152 L139,174 L128,206 L122,240 L119,266 L114,290 L92,295 L64,295 L48,290 L47,258 L58,232 L52,208 L48,198 L46,168 L43,128 L46,98 L48,66 Z";

export function MapaPt({ spec }: { spec: MapaPtSpec }) {
  const land = `var(--subj-${spec.color ?? "edm"})`;
  const landSoft = `var(--subj-${spec.color ?? "edm"}-soft)`;
  const [sel, setSel] = useState(0);
  const current = PLACES[sel];

  const pick = (i: number) => {
    setSel(i);
    speak(PLACES[i].say);
  };

  return (
    <div className="widget mapapt-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="map" size={16} /> Mapa de Portugal</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca num distrito para o ouvires</span>
      </div>

      <div className="mapapt-body">
        <svg className="mapapt-svg" viewBox="0 0 200 330" role="img" aria-label="Mapa de Portugal com os 18 distritos e as Regiões Autónomas">
          {/* sea */}
          <rect x="0" y="0" width="200" height="330" rx="14" fill="var(--info-soft)" />
          {/* mainland */}
          <path d={MAINLAND} fill={landSoft} stroke={land} strokeWidth="2.5" strokeLinejoin="round" />
          {/* island home-boxes for the Regiões Autónomas */}
          <rect x="10" y="234" width="40" height="84" rx="8" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" />

          {PLACES.map((p, i) => {
            const on = i === sel;
            const r = on ? 10 : p.ra ? 7 : 8;
            const fill = on ? "var(--accent)" : p.ra ? "var(--info)" : land;
            return (
              <g key={p.name} onClick={() => pick(i)} style={{ cursor: "pointer" }} role="button" aria-label={p.name}>
                <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
                <circle cx={p.x} cy={p.y} r={r} fill={fill} stroke="#fff" strokeWidth="1.5" />
                {p.num != null && (
                  <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" style={{ pointerEvents: "none" }}>
                    {p.num}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="mapapt-side">
          <div className="mapapt-name" style={{ color: current.ra ? "var(--info)" : land }}>
            {current.num != null ? `${current.num}. ` : ""}{current.name}
          </div>
          <p className="mapapt-cap">
            {current.ra
              ? `Região Autónoma · capital: ${current.capital}`
              : `Distrito · capital: ${current.capital}`}
          </p>
          <Speaker text={current.say} className="prose-speak" label={`Ouvir ${current.name}`} />
        </div>
      </div>
    </div>
  );
}
