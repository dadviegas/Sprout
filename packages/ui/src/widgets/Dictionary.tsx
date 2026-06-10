import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon, type IconName } from "@sprout/icons";
import { Speaker, useSpeaker } from "../Speaker";
import { VerbConjugation, type VerbSpec } from "./Verbs";

/** The part of speech of a dictionary word. ASCII keys (no accents) so they
 *  double as JSON values and icon-map keys; the spoken/shown label is separate. */
export type WordClass =
  | "nome" | "verbo" | "adjetivo" | "adverbio" | "numeral"
  | "pronome" | "interjeicao" | "artigo" | "preposicao" | "conjuncao";

/** A real-world theme a word belongs to (animais, comida, …). Optional — many
 *  abstract words have none. Like WordClass: ASCII keys double as JSON values +
 *  icon-map keys; the shown label is separate. Drives the second filter row. */
export type Theme =
  | "animais" | "comida" | "corpo" | "casa" | "escola" | "natureza"
  | "transportes" | "roupa" | "cores" | "tempo" | "pessoas" | "portugal";

export interface DictEntry {
  /** the word, shown big on the card */
  word: string;
  /** a short, child-friendly meaning (one or two simple sentences) */
  meaning: string;
  /** an emoji that pictures the word (lesson content may use emoji) */
  emoji?: string;
  /** part of speech — drives the class icon (with tooltip) and the filter chip */
  class?: WordClass;
  /** real-world theme (animais, comida, …) — drives the theme icon + 2nd filter */
  tema?: Theme;
  /** the verb's conjugation data, present on verbs mirrored from verbos/*.md.
   *  When set, the card offers "conjugar", which opens the full conjugation
   *  inline (same panel as the Verbos section). Derived at runtime, never
   *  hand-authored in a .md block — see content/dictMerge. */
  verb?: VerbSpec;
  /** what to read aloud (defaults to "word — meaning") */
  say?: string;
}

export interface DictionarySpec {
  /** the letter this page is about, e.g. "A" — shown on the badge */
  letter?: string;
  title?: string;
  entries: DictEntry[];
}

/** The ten word classes, in the order their filter chips appear. */
const CLASS_ORDER: WordClass[] = [
  "nome", "verbo", "adjetivo", "adverbio", "numeral",
  "pronome", "interjeicao", "artigo", "preposicao", "conjuncao",
];

/** Human label (pt-PT, with accents) for each class — chip text + tooltip. */
const CLASS_LABEL: Record<WordClass, string> = {
  nome: "Nome", verbo: "Verbo", adjetivo: "Adjetivo", adverbio: "Advérbio",
  numeral: "Numeral", pronome: "Pronome", interjeicao: "Interjeição",
  artigo: "Artigo", preposicao: "Preposição", conjuncao: "Conjunção",
};

/** Icon for each class. Typed against IconName so a missing icon is a compile
 *  error — classes and icons stay in lockstep. */
const CLASS_ICON: Record<WordClass, IconName> = {
  nome: "wcNome", verbo: "wcVerbo", adjetivo: "wcAdjetivo", adverbio: "wcAdverbio",
  numeral: "wcNumeral", pronome: "wcPronome", interjeicao: "wcInterjeicao",
  artigo: "wcArtigo", preposicao: "wcPreposicao", conjuncao: "wcConjuncao",
};

/** The twelve themes, in the order their filter chips appear. */
const THEME_ORDER: Theme[] = [
  "animais", "comida", "corpo", "casa", "escola", "natureza",
  "transportes", "roupa", "cores", "tempo", "pessoas", "portugal",
];

/** Human label (pt-PT) for each theme — chip text + tooltip. */
const THEME_LABEL: Record<Theme, string> = {
  animais: "Animais", comida: "Comida", corpo: "Corpo", casa: "Casa",
  escola: "Escola", natureza: "Natureza", transportes: "Transportes",
  roupa: "Roupa", cores: "Cores", tempo: "Tempo e datas",
  pessoas: "Pessoas e família", portugal: "Açores e Portugal",
};

/** Icon for each theme — reuses existing glyphs (only `car` was new). Typed
 *  against IconName so a missing icon is a compile error. */
const THEME_ICON: Record<Theme, IconName> = {
  animais: "paw", comida: "apple", corpo: "body", casa: "home",
  escola: "backpack", natureza: "leaf", transportes: "car", roupa: "shirt",
  cores: "palette", tempo: "calendar", pessoas: "family", portugal: "flag",
};

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

/* The conjugation opens in a modal over the page (not inline), so a verb's five
   tense tables never stretch the word grid out of shape. Mirrors ContaArmada's
   ContaPopup: Escape / backdrop / × to close, and a portal to `.sprout-root` so
   `position: fixed` escapes the lesson's transformed (animated) box. */
function VerbModal({ entry, onClose }: { entry: DictEntry; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const modal = (
    <div className="verb-modal" role="dialog" aria-modal="true" aria-label={`Conjugar ${entry.word}`} onClick={onClose}>
      <div className="verb-modal__card sprout-scroll" onClick={(e) => e.stopPropagation()}>
        <div className="verb-modal__head">
          {entry.emoji && <span className="verb-modal__emoji" aria-hidden>{entry.emoji}</span>}
          {entry.class && (
            <span className="dict-class" title={CLASS_LABEL[entry.class]} aria-hidden>
              <Icon name={CLASS_ICON[entry.class]} size={14} />
            </span>
          )}
          <strong>{entry.word}</strong>
          <button type="button" className="verb-modal__close" onClick={onClose} aria-label="Fechar">
            <Icon name="close" size={18} />
          </button>
        </div>
        <VerbConjugation entry={entry.verb!} />
      </div>
    </div>
  );
  const root = typeof document !== "undefined" ? document.querySelector(".sprout-root") : null;
  return root ? createPortal(modal, root) : modal;
}

/* One word card. The card body is a read-aloud button (tap anywhere to hear the
   word and its meaning; the corner icon turns into the "parar" square while it
   plays). A verb also gets a "conjugar" button that opens its full conjugation
   in a modal — the same panel as the Verbos section, so the dictionary is the one
   place to look a word up *and* conjugate it. The button is a sibling of the
   read-aloud button (not nested), so the markup stays valid. */
function DictCard({ entry }: { entry: DictEntry }) {
  const { playing, toggle } = useSpeaker();
  const [conj, setConj] = useState(false);
  const say = entrySay(entry);
  return (
    <div
      id={dictWordId(entry.word)}
      className="dict-card"
      data-playing={playing || undefined}
    >
      <button
        type="button"
        className="dict-card-main"
        onClick={() => toggle(say)}
        aria-label={playing ? "Parar" : `Ouvir: ${entry.word}`}
      >
        {/* every card gets a visual anchor: the entry's emoji, or (fallback)
            its theme/class glyph — same icon language as the filter chips */}
        {entry.emoji ? (
          <span className="dict-emoji" aria-hidden>{entry.emoji}</span>
        ) : (
          <span className="dict-emoji dict-emoji--icon" aria-hidden>
            <Icon name={entry.tema ? THEME_ICON[entry.tema] : entry.class ? CLASS_ICON[entry.class] : "letters"} size={30} duo />
          </span>
        )}
        <span className="dict-wordrow">
          {entry.class && (
            <span className="dict-class" title={CLASS_LABEL[entry.class]} aria-hidden>
              <Icon name={CLASS_ICON[entry.class]} size={14} />
            </span>
          )}
          {entry.tema && (
            <span className="dict-tema" title={THEME_LABEL[entry.tema]} aria-hidden>
              <Icon name={THEME_ICON[entry.tema]} size={14} />
            </span>
          )}
          <span className="dict-word">{entry.word}</span>
        </span>
        <span className="dict-meaning">{entry.meaning}</span>
        <span className="dict-speak"><Icon name={playing ? "stop" : "speaker"} size={16} /></span>
      </button>
      {entry.verb && (
        <button
          type="button"
          className="dict-verblink"
          aria-haspopup="dialog"
          onClick={() => setConj(true)}
        >
          <Icon name="verbAction" size={14} /> conjugar
        </button>
      )}
      {entry.verb && conj && <VerbModal entry={entry} onClose={() => setConj(false)} />}
    </div>
  );
}

/* Dictionary — a grid of word cards for early readers: each card pictures the
   word with an emoji, shows the word and a simple meaning, and reads both aloud
   when tapped. Two badges (with tooltips) mark the part of speech and the theme,
   and two filter rows — by class, and by theme — narrow the grid (each only
   shown when the page has more than one of that kind). "Ouvir tudo" reads every
   entry currently shown, in order. */
export function Dictionary({ spec }: { spec: DictionarySpec }) {
  const [cls, setCls] = useState<WordClass | "all">("all");
  const [tema, setTema] = useState<Theme | "all">("all");
  const classes = CLASS_ORDER.filter((c) => spec.entries.some((e) => e.class === c));
  const temas = THEME_ORDER.filter((t) => spec.entries.some((e) => e.tema === t));
  const shown = spec.entries.filter(
    (e) => (cls === "all" || e.class === cls) && (tema === "all" || e.tema === tema),
  );
  return (
    <div className="widget dictionary-widget">
      <div className="w-head">
        <span className="w-badge">
          <Icon name="letters" size={16} /> {spec.letter ? `Letra ${spec.letter}` : "Dicionário"}
        </span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca numa palavra para ouvires</span>
        <Speaker parts={shown.map(entrySay)} className="dict-hear-all" label="Ouvir as palavras">
          Ouvir tudo
        </Speaker>
      </div>
      {classes.length > 1 && (
        <div className="dict-filter" role="group" aria-label="Filtrar por classe de palavra">
          <button type="button" className={`dict-chip${cls === "all" ? " on" : ""}`} onClick={() => setCls("all")}>
            <Icon name="grid" size={14} /> Todas
          </button>
          {classes.map((c) => (
            <button
              key={c}
              type="button"
              className={`dict-chip${cls === c ? " on" : ""}`}
              title={CLASS_LABEL[c]}
              onClick={() => setCls(c)}
            >
              <Icon name={CLASS_ICON[c]} size={14} /> {CLASS_LABEL[c]}
            </button>
          ))}
        </div>
      )}
      {temas.length > 1 && (
        <div className="dict-filter dict-filter--tema" role="group" aria-label="Filtrar por tema">
          <button type="button" className={`dict-chip${tema === "all" ? " on" : ""}`} onClick={() => setTema("all")}>
            <Icon name="grid" size={14} /> Todos
          </button>
          {temas.map((t) => (
            <button
              key={t}
              type="button"
              className={`dict-chip${tema === t ? " on" : ""}`}
              title={THEME_LABEL[t]}
              onClick={() => setTema(t)}
            >
              <Icon name={THEME_ICON[t]} size={14} /> {THEME_LABEL[t]}
            </button>
          ))}
        </div>
      )}
      <div className="dict-grid">
        {shown.map((e, i) => (
          <DictCard key={`${e.word}-${i}`} entry={e} />
        ))}
      </div>
    </div>
  );
}
