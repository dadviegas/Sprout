import { Icon } from "@sprout/icons";
import { Speaker, useSpeaker } from "../Speaker";

export interface DictEntry {
  /** the word, shown big on the card */
  word: string;
  /** a short, child-friendly meaning (one or two simple sentences) */
  meaning: string;
  /** an emoji that pictures the word (lesson content may use emoji) */
  emoji?: string;
  /** what to read aloud (defaults to "word — meaning") */
  say?: string;
}

export interface DictionarySpec {
  /** the letter this page is about, e.g. "A" — shown on the badge */
  letter?: string;
  title?: string;
  entries: DictEntry[];
}

const entrySay = (e: DictEntry) => e.say ?? `${e.word}. ${e.meaning}`;

/** A stable DOM id for a word card (accent-folded + slugified), so the command
 *  center can scroll to a specific word after opening its letter page. Only one
 *  letter page renders at a time, so these are unique in the document. */
export function dictWordId(word: string): string {
  const slug = [...word]
    .map((ch) => ch.normalize("NFD").match(/[A-Za-z0-9]/)?.[0] ?? "-")
    .join("")
    .toLowerCase()
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `dw-${slug}`;
}

/* One word card: tap to hear the word and its meaning; while it plays the corner
   icon turns into the "parar" (stop) square and tapping again stops it — the
   same read/stop control used everywhere (see Speaker). */
function DictCard({ entry }: { entry: DictEntry }) {
  const { playing, toggle } = useSpeaker();
  const say = entrySay(entry);
  return (
    <button
      id={dictWordId(entry.word)}
      className="dict-card"
      data-playing={playing || undefined}
      onClick={() => toggle(say)}
      aria-label={playing ? "Parar" : `Ouvir: ${entry.word}`}
    >
      {entry.emoji && <span className="dict-emoji" aria-hidden>{entry.emoji}</span>}
      <span className="dict-word">{entry.word}</span>
      <span className="dict-meaning">{entry.meaning}</span>
      <span className="dict-speak"><Icon name={playing ? "stop" : "speaker"} size={16} /></span>
    </button>
  );
}

/* Dictionary — a grid of word cards for early readers: each card pictures the
   word with an emoji, shows the word and a simple meaning, and reads both aloud
   when tapped. The "ouvir tudo" button at the top reads every entry in order. */
export function Dictionary({ spec }: { spec: DictionarySpec }) {
  return (
    <div className="widget dictionary-widget">
      <div className="w-head">
        <span className="w-badge">
          <Icon name="letters" size={16} /> {spec.letter ? `Letra ${spec.letter}` : "Dicionário"}
        </span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca numa palavra para ouvires</span>
        <Speaker parts={spec.entries.map(entrySay)} className="dict-hear-all" label="Ouvir todas as palavras">
          Ouvir tudo
        </Speaker>
      </div>
      <div className="dict-grid">
        {spec.entries.map((e, i) => (
          <DictCard key={i} entry={e} />
        ))}
      </div>
    </div>
  );
}
