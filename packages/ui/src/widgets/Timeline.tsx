import { Icon } from "@sprout/icons";
import { Speaker } from "../Speaker";

/* Timeline — a vertical "linha do tempo": dated moments stacked top (oldest) to
   bottom (newest), joined by a spine. Each moment is a card with its year/era,
   a short headline, an optional detail line and its own read-aloud speaker, plus
   a marker dot (the moment's emoji, or a solid dot). Generic and data-driven
   (events come from the lesson block, like `chart`), so it serves História,
   "datas de Portugal", a life cycle, etc. Reading downwards keeps the order
   obvious and lets many events breathe on phone/iPad/desktop. Speech only fires
   on an explicit tap of the speaker. */

export interface TimelineEvent {
  /** date or era shown on the marker, e.g. 1143, "Séc. XV", "Antes dos romanos". */
  year: number | string;
  /** short headline of what happened. */
  label: string;
  /** optional longer detail shown under the headline. */
  body?: string;
  /** read-aloud override (defaults to year + label + body). */
  say?: string;
  /** decorative emoji shown inside the marker dot. */
  emoji?: string;
}

export interface TimelineSpec {
  title?: string;
  events: TimelineEvent[];
  /** Subject colour key (e.g. "hgp", "mat"), default "hgp". */
  color?: string;
}

export function Timeline({ spec }: { spec: TimelineSpec }) {
  const events = spec.events ?? [];
  if (events.length === 0) return null;

  const color = `var(--subj-${spec.color ?? "hgp"})`;
  const sayOf = (e: TimelineEvent) =>
    e.say ?? [String(e.year), e.label, e.body].filter(Boolean).join(". ");

  return (
    <div className="widget timeline-widget" style={{ ["--tl" as string]: color }}>
      <div className="w-head">
        <span className="w-badge"><Icon name="scroll" size={16} /> Linha do tempo</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca no altifalante para ouvires cada momento</span>
      </div>

      <ol className="timeline-list">
        {events.map((e, i) => (
          <li className="timeline-item" key={i}>
            <div className="timeline-marker" aria-hidden="true">
              <span className={`timeline-dot${e.emoji ? "" : " timeline-dot--plain"}`}>{e.emoji}</span>
            </div>
            <div className="timeline-card">
              <div className="timeline-card-head">
                <span className="timeline-year">{e.year}</span>
                <Speaker text={sayOf(e)} className="prose-speak" label={`Ouvir: ${e.label}`} size={16} />
              </div>
              <p className="timeline-label">{e.label}</p>
              {e.body && <p className="timeline-detail">{e.body}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
