import { useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { speak, speakSequence } from "../speak";

/* A space body shown as a coloured disc — the shared shape for orbit + lineup. */
export interface SpaceBody {
  name: string;
  color?: string; // CSS colour for the body; defaults to a soft grey
  size?: number; // body radius in SVG units (default 9)
  fact?: string; // short read-aloud fact
  emoji?: string; // shown next to the name in the info strip
  ring?: boolean; // draw a planetary ring (Saturn)
}

/* A body orbiting the centre (a planet), optionally carrying its own moons. */
export interface OrbitBody extends SpaceBody {
  orbit: number; // distance from the centre, in SVG units
  period?: number; // seconds for one full revolution (default 24)
  moons?: OrbitBody[]; // satellites orbiting this body (one level deep)
}

export interface SolarSystemSpec {
  title?: string;
  /** "orbit" (default) is the animated diagram; "lineup" is the static size parade. */
  layout?: "orbit" | "lineup";
  /** The thing at the centre — the Sun by default (also used for Earth+Moon). */
  center?: { name?: string; color?: string; size?: number; fact?: string; emoji?: string };
  bodies: OrbitBody[];
  /** Lineup-only: dwarf planets (e.g. Plutão) shown small after the eight planets. */
  dwarfs?: SpaceBody[];
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
  return spec.layout === "lineup" ? <SolarLineup spec={spec} /> : <SolarOrbits spec={spec} />;
}

function SolarOrbits({ spec }: { spec: SolarSystemSpec }) {
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

/* Lineup view: the Sun + planets stood side by side, sized to compare and tapped
 * to hear. A static "parade" on a starry sky — no animation, no play/pause. */
const LINEUP_SCALE = 1.35; // disc radii a touch bigger than the orbit sizes
const LINE_GAP = 22; // horizontal space between neighbouring bodies
const LINE_PAD = 16; // padding at the two ends
const LABEL_GAP = 26; // vertical distance from a body's edge to its name

// A deterministic sprinkle of stars, as fractions of the (dynamic) viewBox.
const STARS: [number, number, number][] = [
  [0.04, 0.18, 0.9], [0.09, 0.62, 0.7], [0.14, 0.34, 1.1], [0.19, 0.8, 0.8],
  [0.24, 0.12, 0.7], [0.3, 0.7, 1], [0.35, 0.28, 0.8], [0.41, 0.85, 0.9],
  [0.46, 0.16, 1], [0.52, 0.6, 0.7], [0.57, 0.9, 0.8], [0.62, 0.22, 1.1],
  [0.67, 0.74, 0.7], [0.72, 0.4, 0.9], [0.77, 0.12, 0.8], [0.82, 0.82, 1],
  [0.86, 0.5, 0.7], [0.9, 0.26, 0.9], [0.94, 0.7, 0.8], [0.97, 0.4, 0.7],
  [0.12, 0.92, 0.6], [0.27, 0.5, 0.6], [0.5, 0.32, 0.6], [0.7, 0.95, 0.6],
  [0.88, 0.9, 0.6], [0.33, 0.95, 0.7], [0.6, 0.08, 0.7], [0.8, 0.62, 0.6],
];

function SolarLineup({ spec }: { spec: SolarSystemSpec }) {
  const [selected, setSelected] = useState<SpaceBody | null>(null);
  const center = { ...SUN, ...spec.center };

  type Item = SpaceBody & { kind: "sun" | "planet" | "dwarf" };
  const items: Item[] = [
    { ...center, kind: "sun" },
    ...spec.bodies.map((b): Item => ({ ...b, kind: "planet" })),
    ...(spec.dwarfs ?? []).map((d): Item => ({ ...d, kind: "dwarf" })),
  ];

  // Place the bodies left→right; each takes its own radius (+ ring elbow room).
  const radius = (s?: number) => (s ?? 9) * LINEUP_SCALE;
  let cursor = LINE_PAD;
  const placed = items.map((it, i) => {
    const r = radius(it.size);
    const half = it.ring ? r * 1.95 : r;
    const cx = cursor + half;
    cursor = cx + half + LINE_GAP;
    return { it, r, cx, above: i % 2 === 1 }; // labels alternate above / below
  });
  const W = Math.round(cursor - LINE_GAP + LINE_PAD);
  const maxR = Math.max(...placed.map((p) => p.r));
  const H = Math.round(maxR * 2 + LABEL_GAP * 2 + 40);
  const cy = H / 2;

  const pick = (b: SpaceBody) => { setSelected(b); speak(bodyFact(b)); };
  const hearAll = () => {
    const intro = spec.say ?? `${center.name}. ${bodyFact(center)}.`;
    speakSequence([intro, ...items.slice(1).map(bodyFact)]);
  };

  return (
    <div className="widget solarsystem-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="planet" size={16} /> No espaço</span>
        {spec.title && <strong>{spec.title}</strong>}
        <button className="iconbtn" onClick={hearAll} aria-label="Ouvir tudo" style={{ marginLeft: "auto" }}>
          <Icon name="speaker" size={18} />
        </button>
      </div>

      <div className="ss-stage">
        <svg className="ss-svg" viewBox={`0 0 ${W} ${H}`} role="img"
             aria-label={spec.title ?? "Os planetas em fila"}>
          <defs>
            {placed.map(({ it }, i) => (
              <radialGradient key={i} id={`ss-grad-${i}`} cx="38%" cy="32%" r="75%">
                <stop offset="0%" stopColor="#fff" stopOpacity={it.kind === "sun" ? 0.85 : 0.55} />
                <stop offset="38%" stopColor={it.color ?? "#cbd2dc"} />
                <stop offset="100%" stopColor={it.color ?? "#cbd2dc"} />
              </radialGradient>
            ))}
          </defs>

          {STARS.map(([fx, fy, r], i) => (
            <circle key={i} className="ss-star" cx={fx * W} cy={fy * H} r={r} opacity={0.4 + (i % 3) * 0.2} />
          ))}

          {placed.map(({ it, r, cx, above }, i) => {
            const labelY = above ? cy - r - LABEL_GAP + 6 : cy + r + LABEL_GAP;
            return (
              <g key={it.name}>
                {it.kind === "sun" && (
                  <circle cx={cx} cy={cy} r={r + 9} fill={it.color ?? "#ffd24d"} opacity={0.22} />
                )}
                <line className="ss-tick" x1={cx} y1={above ? cy - r : cy + r}
                      x2={cx} y2={above ? labelY + 4 : labelY - 11} />
                <g className="ss-body" onClick={() => pick(it)} role="button" tabIndex={0}
                   onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(it); } }}>
                  <title>{it.name}</title>
                  {it.ring && (
                    <ellipse cx={cx} cy={cy} rx={r * 1.9} ry={r * 0.66} fill="none"
                             stroke={it.color ?? "#d8c89a"} strokeWidth={r * 0.4} opacity={0.6}
                             transform={`rotate(-18 ${cx} ${cy})`} />
                  )}
                  <circle cx={cx} cy={cy} r={r} fill={`url(#ss-grad-${i})`}
                          stroke="rgba(0,0,0,.28)" strokeWidth="1.2" />
                  <text className="ss-name" x={cx} y={labelY} textAnchor="middle"
                        fontSize={it.kind === "sun" ? 14 : 12}>{it.name}</text>
                </g>
              </g>
            );
          })}
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
          <span className="w-hint">{spec.caption ?? "Toca num planeta para o ouvires. Repara nos tamanhos! 🔭"}</span>
        )}
      </div>
    </div>
  );
}
