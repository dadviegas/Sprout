import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

/* Timeline — a horizontal "linha do tempo": dated markers on an arrow, left
   (oldest) to right (newest). Tap a marker to highlight it and hear what
   happened. Generic and data-driven (events come from the lesson block, like
   `chart`), so it serves History, "datas de Portugal", a life cycle, etc.
   Markers are evenly spaced for readability (order + dates, not scale) and the
   SVG widens with the number of events, then scales to the container by viewBox
   — crisp on iPad/phone/desktop. Speech only fires on an explicit tap. */

export interface TimelineEvent {
  year: number | string;
  label: string;
  say?: string;
  emoji?: string;
}

export interface TimelineSpec {
  title?: string;
  events: TimelineEvent[];
  /** Subject colour key (e.g. "hgp", "mat"), default "hgp". */
  color?: string;
}

const PAD = 24;
const GAP = 38;
const AXIS_Y = 56;

export function Timeline({ spec }: { spec: TimelineSpec }) {
  const events = spec.events ?? [];
  const color = `var(--subj-${spec.color ?? "hgp"})`;
  const [sel, setSel] = useState(0);

  if (events.length === 0) return null;

  const W = PAD * 2 + Math.max(1, events.length - 1) * GAP;
  const xOf = (i: number) => (events.length === 1 ? W / 2 : PAD + i * GAP);
  const current = events[sel] ?? events[0];
  const sayOf = (e: TimelineEvent) => e.say ?? `${e.year}: ${e.label}`;
  const pick = (i: number) => {
    setSel(i);
    speak(sayOf(events[i]));
  };

  return (
    <div className="widget timeline-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="scroll" size={16} /> Linha do tempo</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca num marco para o ouvires</span>
      </div>

      <div className="timeline-body">
        <div className="timeline-scroll">
          <svg className="timeline-svg" viewBox={`0 0 ${W} 80`} role="img" aria-label={spec.title ?? "Linha do tempo"} style={{ width: W, maxWidth: "100%" }}>
            <line x1={PAD} y1={AXIS_Y} x2={W - PAD + 8} y2={AXIS_Y} stroke="var(--border-strong)" strokeWidth="3" strokeLinecap="round" />
            <path d={`M${W - PAD + 10},${AXIS_Y} l-9,-5 l0,10 z`} fill="var(--border-strong)" />
            {events.map((e, i) => {
              const x = xOf(i);
              const on = i === sel;
              return (
                <g key={i} transform={`translate(${x} ${AXIS_Y})`} onClick={() => pick(i)} style={{ cursor: "pointer" }} role="button" aria-label={`${e.year}: ${e.label}`}>
                  <line x1="0" y1="0" x2="0" y2="-16" stroke={on ? color : "var(--border-strong)"} strokeWidth="2" />
                  <circle cx="0" cy="-16" r={on ? 8 : 5} fill={on ? color : "var(--surface)"} stroke={on ? color : "var(--border-strong)"} strokeWidth="2.5" />
                  <text x="0" y="18" textAnchor="middle" fontSize="11" fontWeight="800" fill={on ? color : "var(--ink-2)"} style={{ pointerEvents: "none" }}>{e.year}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="timeline-readout">
          <div className="timeline-year" style={{ color }}>
            {current.emoji ? `${current.emoji} ` : ""}{current.year}
          </div>
          <p className="timeline-label">{current.label}</p>
          <Speaker text={sayOf(current)} className="prose-speak" label={`Ouvir o que aconteceu em ${current.year}`} />
        </div>
      </div>
    </div>
  );
}
