import { useState, type ReactNode } from "react";
import { Icon } from "@sprout/icons";
import { Speaker, useSpeaker } from "../Speaker";
import { dictWordId } from "./Dictionary";
import { conjugate, tenseSay, type IrregularForms, type Conjugated } from "./conjugate";

/* Verbs — the conjugation half of the Biblioteca. Each card is one verb: tap to
 * open it and see the five tenses (presente, pretérito perfeito, pretérito
 * imperfeito, futuro, imperativo), every tense read aloud. The card also says
 * which conjugation the verb belongs to and whether it is regular (follows the
 * pattern) or irregular (has to be learned by heart) — so a child sees *why*
 * the verbs differ, not just the forms. Regular verbs are conjugated on the fly
 * from the standard endings (see conjugate.ts); only the irregular ones carry an
 * explicit table in the content. */

export interface VerbSpec {
  /** the infinitive, shown big on the card (e.g. "andar") */
  verb: string;
  /** a short, child-friendly meaning (one simple sentence) */
  meaning: string;
  /** an emoji that pictures the verb (content may use emoji) */
  emoji?: string;
  /** an explicit conjugation table — supplying it marks the verb irregular */
  forms?: IrregularForms;
  /** an extra note shown + read when open (e.g. an odd particípio) */
  note?: string;
  /** a short example sentence using the verb, shown + read when open */
  example?: string;
}

export interface VerbsSpec {
  /** the letter this page is about, e.g. "A" — shown on the badge */
  letter?: string;
  title?: string;
  verbs: VerbSpec[];
}

const ORDINAL: Record<number, string> = { 1: "1.ª", 2: "2.ª", 3: "3.ª" };
const ORDINAL_SAY: Record<number, string> = { 1: "primeira", 2: "segunda", 3: "terceira" };

/** A stable DOM id for a verb card (accent-folded + slugified), so the command
 *  center can scroll to a specific verb after opening its letter page. Mirrors
 *  dictWordId but with its own prefix, so the two never collide. */
export function verbCardId(verb: string): string {
  const slug = [...verb]
    .map((ch) => ch.normalize("NFD").match(/[A-Za-z0-9]/)?.[0] ?? "-")
    .join("")
    .toLowerCase()
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `vw-${slug}`;
}

/** The short chip text, e.g. "1.ª conjugação · regular" or "irregular". */
function typeChip(c: Conjugated): string {
  if (c.conj === null) return "irregular";
  return `${ORDINAL[c.conj]} conjugação · ${c.irregular ? "irregular" : "regular"}`;
}

/** The full one-line explanation of why this verb is (or isn't) like the others. */
function typeExplain(c: Conjugated): string {
  const ending = c.infinitive.slice(-2);
  if (c.conj === null) return "É um verbo irregular: muda de forma e é preciso decorá-lo.";
  const ord = ORDINAL[c.conj];
  if (c.irregular) return `Termina em -${ending}, mas é irregular: muda de forma e não segue o padrão — é preciso decorá-lo.`;
  return `Termina em -${ending} → é da ${ord} conjugação. É regular: segue o padrão dos verbos em -${ending}.`;
}

/** Read-aloud for the card header: the verb and what kind it is. */
function headerSay(c: Conjugated): string {
  if (c.conj === null) return `${c.infinitive}. Verbo irregular.`;
  return `${c.infinitive}. ${ORDINAL_SAY[c.conj]} conjugação, ${c.irregular ? "irregular" : "regular"}.`;
}

/** Everything to read for "ouvir tudo": the verb, its kind, then every tense. */
function allParts(c: Conjugated): string[] {
  return [headerSay(c), ...c.tenses.map(tenseSay)];
}

/** Open this verb's dictionary card: focus it first (stashed by App until the
 *  page mounts), then navigate to its letter page. Mirrors openConjugation in
 *  Dictionary.tsx — uses the same global events, so no app import is needed. */
function openInDictionary(verb: string) {
  window.dispatchEvent(new CustomEvent("sprout:focusword", { detail: { id: dictWordId(verb) } }));
  const l = verb[0]?.normalize("NFD").match(/[a-z]/i)?.[0]?.toLowerCase();
  if (l) window.dispatchEvent(new CustomEvent("sprout:navigate", { detail: { lessonId: `dic-${l}` } }));
}

/** The open panel of a verb: the explanation of its conjugation, an optional
 *  example/note, the five tense tables and "ouvir tudo". Shared by the Verbos
 *  section's VerbCard and the dictionary's verb entries — so a verb conjugates
 *  the same way in both places (DRY). An optional `action` is slotted next to
 *  "ouvir tudo" (the Verbos card uses it for the "no dicionário" link). */
export function VerbConjugation({ entry, action }: { entry: VerbSpec; action?: ReactNode }) {
  const c = conjugate(entry.verb, entry.forms);
  return (
    <div className="verb-body">
      <p className="verb-explain">
        {typeExplain(c)}
        <Speaker text={typeExplain(c)} className="verb-explain-speak" size={15} label="Ouvir a explicação" />
      </p>
      {entry.example && (
        <p className="verb-example">
          <span className="verb-example-label">Exemplo</span>
          <span className="verb-example-text">«{entry.example}»</span>
          <Speaker text={entry.example} className="verb-explain-speak" size={15} label="Ouvir o exemplo" />
        </p>
      )}
      {entry.note && (
        <p className="verb-note">
          <Icon name="tip" size={15} /> {entry.note}
          <Speaker text={entry.note} className="verb-explain-speak" size={15} label="Ouvir a nota" />
        </p>
      )}
      <div className="verb-tenses">
        {c.tenses.map((t) => (
          <div className="verb-tense" key={t.key}>
            <div className="verb-tense-head">
              <span className="verb-tense-titles">
                <strong>{t.label}</strong>
                <span className="verb-tense-hint">{t.hint}</span>
              </span>
              <Speaker text={tenseSay(t)} className="verb-tense-speak" size={15} label={`Ouvir o ${t.label}`} />
            </div>
            <ul className="verb-rows">
              {t.rows.map((r) => (
                <li className="verb-row" key={r.person}>
                  <span className="verb-pron">{r.person}</span>
                  <span className="verb-form">{r.form}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="verb-actions">
        <Speaker parts={allParts(c)} className="verb-hear-all-inline" label="Ouvir o verbo todo">
          Ouvir tudo
        </Speaker>
        {action}
      </div>
    </div>
  );
}

function VerbCard({ entry }: { entry: VerbSpec }) {
  const [open, setOpen] = useState(false);
  const { playing, toggle } = useSpeaker();
  const c = conjugate(entry.verb, entry.forms);
  return (
    <div className="verb-card" id={verbCardId(entry.verb)} data-open={open || undefined}>
      {/* The header toggles the card open/closed. It never speaks on its own —
          speech is on the speaker button only (see the project's speech rule). */}
      <button
        type="button"
        className="verb-head"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {/* Every card carries a symbol: the verb's own emoji, or — when it has
            none — a default "action" glyph so the grid stays even and complete. */}
        <span className={`verb-emoji${entry.emoji ? "" : " verb-emoji--glyph"}`} aria-hidden>
          {entry.emoji ?? <Icon name="bolt" size={24} />}
        </span>
        <span className="verb-headmain">
          <span className="verb-word">{entry.verb}</span>
          <span className="verb-chip">{typeChip(c)}</span>
          <span className="verb-meaning">{entry.meaning}</span>
        </span>
        <span className="verb-chevron" aria-hidden><Icon name={open ? "collapse" : "expand"} size={18} /></span>
      </button>

      <button
        type="button"
        className="verb-speak"
        data-playing={playing || undefined}
        onClick={() => toggle(headerSay(c))}
        aria-label={playing ? "Parar" : `Ouvir: ${entry.verb}`}
      >
        <Icon name={playing ? "stop" : "speaker"} size={16} />
      </button>

      {open && (
        <VerbConjugation
          entry={entry}
          action={
            <button
              type="button"
              className="verb-dictlink"
              title="Ver no dicionário"
              aria-label={`Ver ${entry.verb} no dicionário`}
              onClick={() => openInDictionary(entry.verb)}
            >
              <Icon name="reading" size={14} /> no dicionário
            </button>
          }
        />
      )}
    </div>
  );
}

export function Verbs({ spec }: { spec: VerbsSpec }) {
  return (
    <div className="widget verbs-widget">
      <div className="w-head">
        <span className="w-badge">
          <Icon name="reading" size={16} /> {spec.letter ? `Verbos · ${spec.letter}` : "Verbos"}
        </span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca num verbo para o conjugares</span>
      </div>
      <div className="verb-list">
        {spec.verbs.map((v, i) => (
          <VerbCard key={i} entry={v} />
        ))}
      </div>
    </div>
  );
}
