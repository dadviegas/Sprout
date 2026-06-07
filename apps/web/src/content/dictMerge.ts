import type { DictEntry, VerbSpec } from "@sprout/ui";
import { verbosLetters } from "./curriculum";
import { blockEntriesOf } from "./blocks";

/* The verbs are the single source of truth in verbos/*.md. To show them *inside*
 * the dictionary (as a filterable "verbo" class) without copying any text, we
 * derive a DictEntry from each verb at load time, keyed by letter. The dictionary
 * renderer then merges in the verbs of the page's letter — see Markdown.tsx. */

const verbsByLetter = new Map<string, VerbSpec[]>(
  verbosLetters.map((l) => [l.title.toUpperCase(), blockEntriesOf(l.body, "verbs") as VerbSpec[]]),
);

/** Derive class-"verbo" dictionary entries from the verbs of one letter. Each
 *  carries its full VerbSpec in `verb`, so the card can conjugate it inline (the
 *  same panel as the Verbos section) — no verb text is copied into the .md. */
export function verbEntriesForLetter(letter: string | undefined): DictEntry[] {
  if (!letter) return [];
  const verbs = verbsByLetter.get(letter.toUpperCase()) ?? [];
  return verbs.map((v) => ({
    word: v.verb,
    meaning: v.meaning,
    emoji: v.emoji,
    class: "verbo",
    verb: v,
  }));
}
