import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

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
          <button key={i} id={dictWordId(e.word)} className="dict-card" onClick={() => speak(entrySay(e))} aria-label={`Ouvir: ${e.word}`}>
            {e.emoji && <span className="dict-emoji" aria-hidden>{e.emoji}</span>}
            <span className="dict-word">{e.word}</span>
            <span className="dict-meaning">{e.meaning}</span>
            <span className="dict-speak"><Icon name="speaker" size={16} /></span>
          </button>
        ))}
      </div>
    </div>
  );
}
