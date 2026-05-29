import { Icon, type IconName } from "@sprout/icons";
import { speak } from "../speak";

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
          <button key={i} className="soundcard" onClick={() => speak(it.say ?? it.label)} aria-label={`Ouvir: ${it.say ?? it.label}`}>
            {it.icon ? (
              <span className="sc-icon"><Icon name={it.icon} size="100%" /></span>
            ) : (
              <span className="sc-big">{it.label}</span>
            )}
            {it.icon && <span className="sc-label">{it.label}</span>}
            {it.hint && <span className="sc-hint">{it.hint}</span>}
            <span className="sc-speak"><Icon name="speaker" size={18} /></span>
          </button>
        ))}
      </div>
    </div>
  );
}
