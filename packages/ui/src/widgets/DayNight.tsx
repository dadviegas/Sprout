import { useEffect, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";

/* A place on the globe, given by its rough longitude (east positive). The widget
 *  is a top-down view over the North Pole: the half facing the Sun is daytime. */
export interface DayNightPlace {
  name: string;
  emoji?: string;
  lon: number; // longitude in degrees, east positive (Lisboa ≈ -9, Tóquio ≈ +139)
}

export interface DayNightSpec {
  title?: string;
  places?: DayNightPlace[];
  speed?: number; // degrees per second the Earth turns (default 36 → 10s per turn)
  caption?: string;
}

const DEFAULT_PLACES: DayNightPlace[] = [
  { name: "Açores", emoji: "🌋", lon: -25 },
  { name: "Lisboa", emoji: "🇵🇹", lon: -9 },
  { name: "Brasil", emoji: "🇧🇷", lon: -48 },
  { name: "Tóquio", emoji: "🇯🇵", lon: 139 },
];

const VW = 360, VH = 260;
const EX = 150, EY = 130, R = 96; // Earth centre + radius; Sun sits to the right

/** A place is in daylight when it faces the Sun (the right-hand half). */
function isDay(lon: number, sub: number): boolean {
  return Math.cos(((lon - sub) * Math.PI) / 180) >= 0;
}

export function DayNight({ spec }: { spec: DayNightSpec }) {
  const places = spec.places?.length ? spec.places : DEFAULT_PLACES;
  const speed = spec.speed ?? 36;
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [running, setRunning] = useState(!reduced);
  const [sub, setSub] = useState(0); // sub-solar longitude (where it is noon)

  const raf = useRef(0);
  const last = useRef(0);
  useEffect(() => {
    if (!running) return;
    const tick = (t: number) => {
      if (last.current) setSub((s) => (s + speed * (t - last.current) / 1000) % 360);
      last.current = t;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf.current); last.current = 0; };
  }, [running, speed]);

  const pos = (lon: number) => {
    const a = ((lon - sub) * Math.PI) / 180;
    return [EX + R * Math.cos(a) * 0.82, EY - R * Math.sin(a) * 0.82] as const;
  };

  const say = (p: DayNightPlace) =>
    speak(`Em ${p.name} é ${isDay(p.lon, sub) ? "dia" : "noite"}.`);

  // Sort so back-of-globe markers draw first (simple painter's order by day/night).
  const ordered = [...places].sort((a, b) => Number(isDay(a.lon, sub)) - Number(isDay(b.lon, sub)));

  return (
    <div className="widget daynight-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="world" size={16} /> Dia e noite</span>
        {spec.title && <strong>{spec.title}</strong>}
        <button className="iconbtn" onClick={() => setRunning((r) => !r)}
                aria-label={running ? "Parar" : "Pôr a girar"} style={{ marginLeft: "auto" }}>
          <Icon name={running ? "stop" : "forward"} size={18} />
        </button>
      </div>

      <div className="dn-stage">
        <svg className="dn-svg" viewBox={`0 0 ${VW} ${VH}`} role="img" aria-label="A Terra a girar, com dia de um lado e noite do outro">
          <defs>
            <clipPath id="dn-earth"><circle cx={EX} cy={EY} r={R} /></clipPath>
          </defs>

          {/* Sun on the right, shining toward the Earth */}
          <circle cx={VW - 26} cy={EY} r={20} fill="#ffd24d" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <line key={i} x1={VW - 26 + 22 * Math.cos(a)} y1={EY + 22 * Math.sin(a)}
                         x2={VW - 26 + 30 * Math.cos(a)} y2={EY + 30 * Math.sin(a)} stroke="#ffd24d" strokeWidth="3" strokeLinecap="round" />;
          })}

          {/* Earth: lit right half (day) + dark left half (night) */}
          <g clipPath="url(#dn-earth)">
            <rect x={EX - R} y={EY - R} width={2 * R} height={2 * R} fill="#3a7bd5" />
            <rect x={EX - R} y={EY - R} width={R} height={2 * R} fill="#16213e" />
            {/* soft seam down the middle = the day/night boundary (terminator) */}
            <rect x={EX - 2} y={EY - R} width={4} height={2 * R} fill="#0f1830" opacity={0.5} />
          </g>
          <circle cx={EX} cy={EY} r={R} fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="2" />

          {/* Places */}
          {ordered.map((p) => {
            const [x, y] = pos(p.lon);
            const day = isDay(p.lon, sub);
            return (
              <g key={p.name} className="dn-place" onClick={() => say(p)} role="button" tabIndex={0}
                 onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); say(p); } }}>
                <title>{p.name}: {day ? "dia" : "noite"}</title>
                {/* invisible halo: the tiny marker dot alone is too small a target */}
                <circle cx={x} cy={y} r={18} fill="transparent" />
                <circle cx={x} cy={y} r={7} fill={day ? "#fff3c4" : "#9aa7c7"} stroke="rgba(0,0,0,.35)" strokeWidth="1.5" />
                <text x={x} y={y - 12} textAnchor="middle" fontSize="13" className="dn-label">{p.emoji} {p.name}</text>
                <text x={x} y={y + 22} textAnchor="middle" fontSize="13">{day ? "☀️" : "🌙"}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="w-hint">{spec.caption ?? "Vês? Quando de um lado é dia ☀️, do outro lado do mundo é noite 🌙. Toca numa cidade para ouvires."}</p>
    </div>
  );
}
