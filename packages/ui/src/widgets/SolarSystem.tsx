import { useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { speak, speakSequence } from "../speak";

/* A body orbiting the centre (a planet), optionally carrying its own moons. */
export interface OrbitBody {
  name: string;
  color?: string; // CSS colour for the body; defaults to a soft grey
  size?: number; // body radius in SVG units (default 9)
  orbit: number; // distance from the centre, in SVG units
  period?: number; // seconds for one full revolution (default 24)
  fact?: string; // short read-aloud fact
  emoji?: string; // shown next to the name in the info strip
  ring?: boolean; // draw a planetary ring (Saturn)
  moons?: OrbitBody[]; // satellites orbiting this body (one level deep)
}

export interface SolarSystemSpec {
  title?: string;
  /** The thing at the centre — the Sun by default (also used for Earth+Moon). */
  center?: { name?: string; color?: string; size?: number; fact?: string; emoji?: string };
  bodies: OrbitBody[];
  caption?: string;
  say?: string; // intro line read aloud by the main speaker
}

const SUN = { name: "Sol", color: "#ffd24d", size: 26, emoji: "☀️", fact: "uma estrela gigante no centro de tudo" };
const VIEW = 460; // square viewBox; centre is (230, 230)
const C = VIEW / 2;

function bodyFact(b: { name: string; emoji?: string; fact?: string }): string {
  return [`${b.name}${b.emoji ? " " + b.emoji : ""}`, b.fact].filter(Boolean).join(": ");
}

/** One orbiting body: an orbit guide-ring + a group that rotates about (cx,cy).
 *  Rotation uses SMIL <animateTransform> so the centre can be any point (the Sun
 *  for planets, the planet itself for moons) without CSS transform-box quirks.
 *  A negative `begin` offsets each body's phase so they start spread out. */
function Orbiting({
  cx, cy, body, phase, onPick,
}: {
  cx: number; cy: number; body: OrbitBody; phase: number; onPick: (b: OrbitBody) => void;
}) {
  const period = body.period ?? 24;
  const size = body.size ?? 9;
  const color = body.color ?? "#cbd2dc";
  // The body sits to the right of the centre; the group spins about (cx,cy).
  const bx = cx + body.orbit;
  return (
    <>
      <circle cx={cx} cy={cy} r={body.orbit} className="ss-track" />
      <g>
        <animateTransform
          attributeName="transform" type="rotate" additive="sum"
          from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`}
          dur={`${period}s`} begin={`-${phase * period}s`} repeatCount="indefinite"
        />
        <g className="ss-body" onClick={() => onPick(body)} role="button" tabIndex={0}
           onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(body); } }}>
          <title>{body.name}</title>
          {body.ring && (
            <ellipse cx={bx} cy={cy} rx={size * 1.9} ry={size * 0.7} fill="none"
                     stroke={color} strokeWidth={size * 0.45} opacity={0.55} transform={`rotate(-18 ${bx} ${cy})`} />
          )}
          <circle cx={bx} cy={cy} r={size} fill={color} stroke="rgba(0,0,0,.28)" strokeWidth="1.5" />
        </g>
        {/* Moons orbit the planet's own centre (bx,cy); nested so they ride along. */}
        {body.moons?.map((m, i) => (
          <Orbiting key={m.name} cx={bx} cy={cy} body={m} phase={i / (body.moons!.length || 1)} onPick={onPick} />
        ))}
      </g>
    </>
  );
}

export function SolarSystem({ spec }: { spec: SolarSystemSpec }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [paused, setPaused] = useState(!!reduced);
  const [selected, setSelected] = useState<{ name: string; emoji?: string; fact?: string } | null>(null);

  const center = { ...SUN, ...spec.center };

  // Pause immediately when the SVG mounts if the child prefers reduced motion.
  const setSvg = (el: SVGSVGElement | null) => {
    svgRef.current = el;
    if (el && reduced) el.pauseAnimations();
  };

  const togglePlay = () => {
    const svg = svgRef.current;
    if (!svg) return;
    if (paused) svg.unpauseAnimations();
    else svg.pauseAnimations();
    setPaused((p) => !p);
  };

  const pick = (b: { name: string; emoji?: string; fact?: string }) => {
    setSelected(b);
    speak(bodyFact(b));
  };

  const hearAll = () => {
    const intro = spec.say ?? `${center.name}. ${bodyFact(center)}.`;
    speakSequence([intro, ...spec.bodies.map(bodyFact)]);
  };

  return (
    <div className="widget solarsystem-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="planet" size={16} /> No espaço</span>
        {spec.title && <strong>{spec.title}</strong>}
        <button className="iconbtn" onClick={hearAll} aria-label="Ouvir tudo" style={{ marginLeft: "auto" }}>
          <Icon name="speaker" size={18} />
        </button>
        <button className="iconbtn" onClick={togglePlay} aria-label={paused ? "Pôr a andar" : "Parar"}>
          <Icon name={paused ? "forward" : "stop"} size={18} />
        </button>
      </div>

      <div className="ss-stage">
        <svg ref={setSvg} className="ss-svg" viewBox={`0 0 ${VIEW} ${VIEW}`} role="img"
             aria-label={spec.title ?? "O sistema solar"}>
          {/* faint glow + the Sun */}
          <circle cx={C} cy={C} r={center.size! + 10} fill={center.color} opacity={0.18} />
          <g className="ss-body" onClick={() => pick(center)} role="button" tabIndex={0}
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(center); } }}>
            <title>{center.name}</title>
            <circle cx={C} cy={C} r={center.size} fill={center.color} stroke="rgba(0,0,0,.2)" strokeWidth="1.5" />
          </g>
          {spec.bodies.map((b, i) => (
            <Orbiting key={b.name} cx={C} cy={C} body={b} phase={i / spec.bodies.length} onPick={pick} />
          ))}
        </svg>
      </div>

      <div className="ss-info">
        {selected ? (
          <>
            <strong>{selected.name}{selected.emoji ? " " + selected.emoji : ""}</strong>
            {selected.fact && <span>{selected.fact}</span>}
            <button className="iconbtn" onClick={() => speak(bodyFact(selected))} aria-label="Ouvir outra vez">
              <Icon name="speaker" size={16} />
            </button>
          </>
        ) : (
          <span className="w-hint">{spec.caption ?? "Toca num planeta para saberes o nome e uma curiosidade. 🔭"}</span>
        )}
      </div>
    </div>
  );
}
