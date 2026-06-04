import { Icon, type IconName } from "@sprout/icons";
import { useSpeaker } from "../Speaker";

export interface SoundItem {
  /** optional icon from @sprout/icons; if omitted the label is shown big */
  icon?: IconName;
  /** the word/text shown on the card */
  label: string;
  /** what to read aloud (defaults to label) */
  say?: string;
  /** a small hint under the label (e.g. translation) */
  hint?: string;
}

export interface SoundCardsSpec {
  title?: string;
  items: SoundItem[];
}

/* One card: tap to hear its word; while it plays the corner icon turns into the
   "parar" (stop) square and tapping again stops it — the same read/stop control
   used everywhere (see Speaker). */
function SoundCard({ item }: { item: SoundItem }) {
  const { playing, toggle } = useSpeaker();
  const say = item.say ?? item.label;
  return (
    <button
      className="soundcard"
      data-playing={playing || undefined}
      onClick={() => toggle(say)}
      aria-label={playing ? "Parar" : `Ouvir: ${say}`}
    >
      {item.icon ? (
        <span className="sc-icon"><Icon name={item.icon} size="100%" /></span>
      ) : (
        <span className="sc-big">{item.label}</span>
      )}
      {item.icon && <span className="sc-label">{item.label}</span>}
      {item.hint && <span className="sc-hint">{item.hint}</span>}
      <span className="sc-speak"><Icon name={playing ? "stop" : "speaker"} size={18} /></span>
    </button>
  );
}

/* SoundCards — for early readers (1.º ano): each card shows an icon (or a big
   letter/word) plus the word, and reads it aloud in Portuguese when tapped.
   See · hear · repeat. */
export function SoundCards({ spec }: { spec: SoundCardsSpec }) {
  return (
    <div className="widget soundcards-widget">
      <div className="w-head">
        <span className="w-badge">
          <Icon name="speaker" size={16} /> Ouvir e ver
        </span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca para ouvir</span>
      </div>
      <div className="soundcards">
        {spec.items.map((it, i) => (
          <SoundCard key={i} item={it} />
        ))}
      </div>
    </div>
  );
}
