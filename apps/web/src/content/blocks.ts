import type { DictionarySpec, VerbsSpec } from "@sprout/ui";

/** Pull the entries out of a fenced block (```dictionary or ```verbs) in a
 *  lesson body. Returns [] if there's no such block or its JSON is malformed
 *  (validated by `pnpm validate`). Shared by the command-center word index and
 *  the dictionary↔verbs merge, so the parser lives in one place. */
export function blockEntriesOf(body: string | undefined, lang: string): unknown[] {
  if (!body) return [];
  const m = body.match(new RegExp("```" + lang + "\\s*\\r?\\n([\\s\\S]*?)\\r?\\n```"));
  if (!m) return [];
  try {
    const spec = JSON.parse(m[1]) as DictionarySpec & VerbsSpec;
    const list = lang === "verbs" ? spec.verbs : spec.entries;
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}
