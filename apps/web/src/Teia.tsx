import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { Speaker } from "@sprout/ui";
import { resolveTeia, type TeiaTheme } from "./content/teia-data";
import type { View } from "./nav";
import type { LessonMeta } from "./content/curriculum";

/* "A Teia do Saber" — an interactive, pan/zoom web of how the site's material
 * connects. Big "theme" hubs gather real lessons from different subjects; a
 * lesson that lives in two themes becomes a bridge between them, so the child
 * SEES that everything is linked. Tap a bubble to light up its connections and
 * hear it; tap "Abrir" to jump straight to that lesson.
 *
 * Built with plain inline SVG + CSS — no graph/physics library (KISS). The
 * layout is fully deterministic (themes on a circle, their lessons fanned
 * outward), so it never jitters and renders identically every time. */

const W = 3400;
const H = 2560;
const CX = W / 2;
const CY = H / 2;
const RX = 1080; // theme ring radii (ellipse)
const RY = 660;

interface ThemeNode extends TeiaTheme {
  x: number;
  y: number;
  lx: number; // label position (offset toward the centre)
  ly: number;
}
interface LessonNode {
  id: string;
  meta: LessonMeta;
  themes: string[];
  x: number;
  y: number;
}
interface Link {
  key: string;
  a: string; // node id (theme)
  b: string; // node id (theme or lesson)
  d: string; // SVG path
  color: string;
  bridge: boolean;
}
interface Transform {
  x: number;
  y: number;
  k: number;
}

const MIN_K = 0.45;
const MAX_K = 3.2;
const TAP_SLOP = 7; // px of movement still counted as a tap, not a drag

/** Shorten a long title so node labels don't collide with their neighbours. */
function truncate(s: string, max = 20): string {
  return s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s;
}

/** Quadratic curve bowed sideways (perpendicular to the line) by `bend`. */
function curve(x1: number, y1: number, x2: number, y2: number, bend: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

/** Bridge curve bowed toward the centre, for the long theme↔theme arcs. */
function bridgeCurve(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const cx = mx + (CX - mx) * 0.5;
  const cy = my + (CY - my) * 0.5;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function buildGraph() {
  const { themes, lessons, bridges, byId } = resolveTeia();
  const n = themes.length;

  // Each lesson's "home" theme = the first theme (in order) that lists it.
  const homeOf = new Map<string, string>();
  for (const t of themes) for (const id of t.lessons) if (!homeOf.has(id)) homeOf.set(id, t.id);

  const themePos = new Map<string, { x: number; y: number }>();
  const themeNodes: ThemeNode[] = themes.map((t, i) => {
    const ang = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const x = CX + RX * Math.cos(ang);
    const y = CY + RY * Math.sin(ang);
    themePos.set(t.id, { x, y });
    // Label toward the centre (the side with no lessons fanned out).
    const dx = CX - x;
    const dy = CY - y;
    const m = Math.hypot(dx, dy) || 1;
    return { ...t, x, y, lx: (dx / m) * 138, ly: (dy / m) * 138 + 10 };
  });

  // Fan each theme's homed lessons outward from the centre across concentric
  // rings. Each ring sits further out and holds more nodes (its capacity grows
  // with its radius), so nodes keep a real gap and never pile up — inner rings
  // stay sparse, outer rings spread wide.
  const CONE = 1.3; // angular width of a theme's outward fan (radians)
  const CHORD = 125; // min spacing between two nodes on the same ring (world px)
  const BASE_R = 235; // first ring's distance from the hub
  const RING_GAP = 150;
  const lessonPos = new Map<string, { x: number; y: number }>();
  for (const t of themes) {
    const tp = themePos.get(t.id)!;
    const outward = Math.atan2(tp.y - CY, tp.x - CX);
    const homed = t.lessons.filter((id) => homeOf.get(id) === t.id);
    let placed = 0;
    let ring = 0;
    while (placed < homed.length) {
      const r = BASE_R + ring * RING_GAP;
      const cap = Math.max(2, Math.floor((CONE * r) / CHORD)); // how many fit on this ring
      const take = Math.min(cap, homed.length - placed);
      for (let j = 0; j < take; j++) {
        const frac = take === 1 ? 0 : j / (take - 1) - 0.5; // -0.5 … 0.5
        const ang = outward + frac * CONE;
        lessonPos.set(homed[placed], { x: tp.x + Math.cos(ang) * r, y: tp.y + Math.sin(ang) * r });
        placed++;
      }
      ring++;
    }
  }

  const lessonNodes: LessonNode[] = lessons.map((l) => {
    const p = lessonPos.get(l.id)!;
    return { id: l.id, meta: l.meta, themes: l.themes, x: p.x, y: p.y };
  });

  // Links: lesson → each of its themes (multi-theme lessons = bridges), plus the
  // curated theme ↔ theme bridges.
  const links: Link[] = [];
  for (const l of lessonNodes) {
    const lp = { x: l.x, y: l.y };
    for (const tid of l.themes) {
      const tp = themePos.get(tid)!;
      const bridge = l.themes.length > 1;
      links.push({
        key: `${l.id}~${tid}`,
        a: tid,
        b: l.id,
        d: curve(tp.x, tp.y, lp.x, lp.y, bridge ? 0.16 : 0.07),
        color: l.meta.color,
        bridge,
      });
    }
  }
  for (const b of bridges) {
    const pa = themePos.get(b.a)!;
    const pb = themePos.get(b.b)!;
    links.push({ key: `b:${b.a}~${b.b}`, a: b.a, b: b.b, d: bridgeCurve(pa.x, pa.y, pb.x, pb.y), color: "var(--ink-3)", bridge: true });
  }

  // Subject legend (which colour = which subject), in first-seen order.
  const seen = new Map<string, { label: string; color: string }>();
  for (const l of lessonNodes) if (!seen.has(l.meta.subjectId)) seen.set(l.meta.subjectId, { label: l.meta.subjectLabel, color: l.meta.color });
  const legend = [...seen.values()];

  return { themeNodes, lessonNodes, links, byId, legend };
}

type Selected = { kind: "theme"; id: string } | { kind: "lesson"; id: string } | null;

export function Teia({ onGo }: { onGo: (v: View) => void }) {
  const graph = useMemo(buildGraph, []);
  const { themeNodes, lessonNodes, links, byId, legend } = graph;

  const [t, setT] = useState<Transform>({ x: 0, y: 0, k: 1 });
  const [selected, setSelected] = useState<Selected>(null);
  const [full, setFull] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number } | null>(null);
  const dragged = useRef(false);

  // Convert a screen point to viewBox coordinates (accounts for the letterbox
  // that "meet" adds when the stage aspect ratio differs from the viewBox).
  const toVb = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const r = svg.getBoundingClientRect();
    const scale = Math.min(r.width / W, r.height / H);
    const offX = (r.width - W * scale) / 2;
    const offY = (r.height - H * scale) / 2;
    return { x: (clientX - r.left - offX) / scale, y: (clientY - r.top - offY) / scale, scale };
  };

  const zoomAround = (clientX: number, clientY: number, factor: number) => {
    setT((prev) => {
      const k = Math.min(MAX_K, Math.max(MIN_K, prev.k * factor));
      const vb = toVb(clientX, clientY);
      // Keep the world point under the cursor fixed across the zoom.
      const x = vb.x - (k / prev.k) * (vb.x - prev.x);
      const y = vb.y - (k / prev.k) * (vb.y - prev.y);
      return { x, y, k };
    });
  };

  // Wheel zoom — registered natively so we can preventDefault (React's onWheel
  // is passive and couldn't stop the page from scrolling).
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAround(e.clientX, e.clientY, e.deltaY < 0 ? 1.12 : 0.89);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged.current = false;
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y) };
    }
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (pinch.current.dist > 0) zoomAround(mid.x, mid.y, dist / pinch.current.dist);
      pinch.current.dist = dist;
      dragged.current = true;
      return;
    }

    // Single-finger / mouse drag → pan.
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    if (Math.abs(dx) > TAP_SLOP || Math.abs(dy) > TAP_SLOP) dragged.current = true;
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const scale = Math.min(r.width / W, r.height / H);
    setT((p) => ({ ...p, x: p.x + dx / scale, y: p.y + dy / scale }));
  };

  const endPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (dragged.current) return; // a pan/pinch, not a tap
    // A tap: select the node under it, or clear when tapping empty space.
    const el = (e.target as Element).closest?.("[data-node]");
    if (!el) {
      setSelected(null);
      return;
    }
    const kind = el.getAttribute("data-node") as "theme" | "lesson";
    const id = el.getAttribute("data-id")!;
    setSelected((s) => (s && s.id === id ? null : { kind, id }));
  };

  // What lights up when something is selected.
  const active = useMemo(() => {
    if (!selected) return null;
    const ids = new Set<string>([selected.id]);
    if (selected.kind === "theme") {
      for (const l of lessonNodes) if (l.themes.includes(selected.id)) ids.add(l.id);
      for (const ln of links) if (ln.bridge && ln.a === selected.id) ids.add(ln.b);
      for (const ln of links) if (ln.bridge && ln.b === selected.id) ids.add(ln.a);
    } else {
      byId.get(selected.id)?.themes.forEach((th) => ids.add(th));
    }
    return ids;
  }, [selected, lessonNodes, links, byId]);

  const dim = (id: string) => (active && !active.has(id) ? " is-dim" : "");
  const linkClass = (ln: Link) => {
    if (!active) return ln.bridge ? "teia-link teia-link--bridge" : "teia-link";
    const on = active.has(ln.a) && active.has(ln.b);
    return `teia-link${ln.bridge ? " teia-link--bridge" : ""}${on ? " is-active" : " is-dim"}`;
  };

  const selectedTheme = selected?.kind === "theme" ? themeNodes.find((n) => n.id === selected.id) : undefined;
  const selectedLesson = selected?.kind === "lesson" ? byId.get(selected.id) : undefined;

  return (
    <div className={`teia-stage${full ? " teia-stage--full" : ""}`}>
      <div className="teia-head">
        <div className="teia-title">
          <span className="teia-title-ic"><Icon name="atom" size={26} /></span>
          <div>
            <h2>A Teia do Saber</h2>
            <p>Vê como tudo se liga — toca numa bolha para acender as ligações.</p>
          </div>
          <Speaker
            className="prose-speak teia-help"
            text="A Teia do Saber. Cada bolha grande é um tema, e à volta dela estão lições de matérias diferentes. Quando uma lição se liga a dois temas, faz uma ponte entre eles. Arrasta para te moveres, junta dois dedos para aproximar, e toca numa bolha para veres as ligações e ouvires o que é."
            label="Ouvir como funciona"
          />
        </div>
        <div className="teia-tools">
          <button className="iconbtn" onClick={() => zoomAround(window.innerWidth / 2, window.innerHeight / 2, 1.25)} aria-label="Aproximar"><Icon name="plus" size={20} /></button>
          <button className="iconbtn" onClick={() => zoomAround(window.innerWidth / 2, window.innerHeight / 2, 0.8)} aria-label="Afastar"><Icon name="minus" size={20} /></button>
          <button className="iconbtn" onClick={() => { setT({ x: 0, y: 0, k: 1 }); setSelected(null); }} aria-label="Centrar tudo"><Icon name="refresh" size={20} /></button>
          <button className="iconbtn" onClick={() => setFull((f) => !f)} aria-label={full ? "Sair do ecrã inteiro" : "Ecrã inteiro"}><Icon name={full ? "collapse" : "expand"} size={20} /></button>
        </div>
      </div>

      <svg
        ref={svgRef}
        className={`teia-svg${active ? " teia-svg--focused" : ""}`}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Teia do saber: temas ligados a lições de várias matérias"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
      >
        <g transform={`translate(${t.x} ${t.y}) scale(${t.k})`}>
          {/* links first, under the nodes */}
          <g className="teia-links">
            {links.map((ln) => (
              <path key={ln.key} className={linkClass(ln)} d={ln.d} style={{ stroke: ln.color }} />
            ))}
          </g>

          {/* lesson nodes — labels only when zoomed in or active, to stay legible */}
          <g className="teia-lessons">
            {lessonNodes.map((l) => {
              const bridge = l.themes.length > 1;
              const showLabel = t.k >= 1.05 || active?.has(l.id);
              return (
                <g
                  key={l.id}
                  className={`teia-node teia-lesson${bridge ? " is-bridge" : ""}${dim(l.id)}${active?.has(l.id) ? " is-active" : ""}`}
                  data-node="lesson"
                  data-id={l.id}
                  transform={`translate(${l.x} ${l.y})`}
                  style={{ ["--c" as string]: l.meta.color }}
                >
                  <circle className="teia-lesson-bg" r={48} />
                  <text className="teia-emoji" y={2} textAnchor="middle" dominantBaseline="central" fontSize={42}>{l.meta.emoji}</text>
                  {showLabel && <text className="teia-label" y={78} textAnchor="middle">{truncate(l.meta.title)}</text>}
                </g>
              );
            })}
          </g>

          {/* theme hubs on top */}
          <g className="teia-themes">
            {themeNodes.map((th) => (
              <g
                key={th.id}
                className={`teia-node teia-theme${dim(th.id)}${active?.has(th.id) ? " is-active" : ""}`}
                data-node="theme"
                data-id={th.id}
                transform={`translate(${th.x} ${th.y})`}
                style={{ ["--c" as string]: th.accent }}
              >
                <circle className="teia-theme-halo" r={94} />
                <circle className="teia-theme-bg" r={70} />
                <foreignObject x={-34} y={-34} width={68} height={68} className="teia-theme-ic">
                  <div className="teia-ic-wrap"><Icon name={th.icon as IconName} size={52} /></div>
                </foreignObject>
                {/* label on the inward side (toward centre), away from the lessons */}
                <text className="teia-theme-label" x={th.lx} y={th.ly} textAnchor="middle">{th.label}</text>
              </g>
            ))}
          </g>
        </g>
      </svg>

      {/* subject legend */}
      <div className="teia-legend" aria-hidden="true">
        {legend.map((s) => (
          <span key={s.label} className="teia-legend-item"><i style={{ background: s.color }} />{s.label}</span>
        ))}
      </div>

      {/* detail sheet for the selected bubble */}
      {selectedTheme && (
        <div className="teia-sheet" style={{ ["--c" as string]: selectedTheme.accent }}>
          <span className="teia-sheet-ic"><Icon name={selectedTheme.icon as IconName} size={26} /></span>
          <div className="teia-sheet-body">
            <strong>{selectedTheme.label}</strong>
            <span className="teia-sheet-sub">{selectedTheme.blurb}</span>
          </div>
          <Speaker text={`${selectedTheme.label}. ${selectedTheme.blurb}`} label="Ouvir" />
          <button className="iconbtn teia-sheet-close" onClick={() => setSelected(null)} aria-label="Fechar"><Icon name="close" size={20} /></button>
        </div>
      )}
      {selectedLesson && (
        <div className="teia-sheet" style={{ ["--c" as string]: selectedLesson.meta.color }}>
          <span className="teia-sheet-emoji">{selectedLesson.meta.emoji}</span>
          <div className="teia-sheet-body">
            <strong>{selectedLesson.meta.title}</strong>
            <span className="teia-sheet-sub">
              {selectedLesson.meta.subjectLabel}
              {selectedLesson.themes.length > 1 ? ` · faz a ponte entre ${selectedLesson.themes.length} temas` : ""}
            </span>
          </div>
          <Speaker
            text={`${selectedLesson.meta.title}. Da matéria de ${selectedLesson.meta.subjectLabel}.`}
            label="Ouvir"
          />
          <button
            className="teia-open"
            onClick={() => onGo({ kind: "lesson", year: selectedLesson.meta.year, subjectId: selectedLesson.meta.subjectId, lessonId: selectedLesson.id })}
          >
            <Icon name="arrowRight" size={18} /> Abrir
          </button>
          <button className="iconbtn teia-sheet-close" onClick={() => setSelected(null)} aria-label="Fechar"><Icon name="close" size={20} /></button>
        </div>
      )}
    </div>
  );
}
