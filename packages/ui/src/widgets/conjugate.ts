/* Conjugation engine — turns a Portuguese (pt-PT) infinitive into its tenses
 * for the `verbs` library widget. The point is DRY content: a *regular* verb is
 * just "{ verb, meaning }" and every form is computed from the standard endings,
 * so authors never hand-type a regular table. Only the truly *irregular* verbs
 * (ser, ir, fazer, …) carry an explicit `forms` table.
 *
 * Scope is the 1.º ciclo, so we show the five tenses a child meets first:
 * presente, pretérito perfeito, pretérito imperfeito, futuro and the
 * imperativo afirmativo. No conjuntivo, no compound tenses, no LaTeX — just the
 * shapes a 6–9 year-old hears in everyday speech, each read aloud. */

export type Conjugation = 1 | 2 | 3;

/** The six persons, in school-table order (includes "vós", still taught here). */
export const PERSONS = ["eu", "tu", "ele/ela", "nós", "vós", "eles/elas"] as const;
/** The imperativo afirmativo only has tu / nós / vós forms (you can't order
 *  "eu", and "ele/eles" borrow the conjuntivo — out of scope for this age). */
export const IMP_PERSONS = ["tu", "nós", "vós"] as const;

/** What to read aloud for each person — "ele ou ela", "eles ou elas" spell the
 *  slash so the speaker doesn't say "barra". */
const PERSON_SAY: Record<string, string> = {
  "eu": "eu",
  "tu": "tu",
  "ele/ela": "ele ou ela",
  "nós": "nós",
  "vós": "vós",
  "eles/elas": "eles ou elas",
};

export interface TenseTable {
  /** stable key, e.g. "presente" */
  key: string;
  /** shown heading, e.g. "Presente" */
  label: string;
  /** a kid-friendly hint of what the tense means */
  hint: string;
  /** persons paired with their conjugated form, in table order */
  rows: { person: string; form: string }[];
}

export interface Conjugated {
  infinitive: string;
  /** 1 | 2 | 3 for -ar / -er / -ir, or null for an odd infinitive (e.g. "pôr") */
  conj: Conjugation | null;
  irregular: boolean;
  tenses: TenseTable[];
}

/** An explicit table for an irregular verb (all arrays are read in PERSONS
 *  order; `imperativo` is read in IMP_PERSONS order — tu / nós / vós). A verb
 *  with no natural imperativo (poder, querer…) passes an empty `imperativo`,
 *  and that tense is simply dropped. */
export interface IrregularForms {
  presente: string[];   // 6
  perfeito: string[];   // 6
  imperfeito: string[]; // 6
  futuro: string[];     // 6
  imperativo: string[]; // 3 (tu, nós, vós) — or [] to omit the tense
}

const TENSE_META = [
  { key: "presente", label: "Presente", hint: "o que acontece agora" },
  { key: "perfeito", label: "Pretérito perfeito", hint: "o que já aconteceu" },
  { key: "imperfeito", label: "Pretérito imperfeito", hint: "o que costumava acontecer" },
  { key: "futuro", label: "Futuro", hint: "o que vai acontecer" },
  { key: "imperativo", label: "Imperativo", hint: "uma ordem ou um pedido" },
] as const;

/* The regular endings, by conjugation. The futuro is built on the *whole*
 * infinitive (andar + ei → andarei), so it isn't listed here. */
const ENDINGS: Record<Conjugation, { presente: string[]; perfeito: string[]; imperfeito: string[]; imperativo: string[] }> = {
  1: {
    presente: ["o", "as", "a", "amos", "ais", "am"],
    perfeito: ["ei", "aste", "ou", "ámos", "astes", "aram"],
    imperfeito: ["ava", "avas", "ava", "ávamos", "áveis", "avam"],
    imperativo: ["a", "emos", "ai"], // anda, andemos, andai
  },
  2: {
    presente: ["o", "es", "e", "emos", "eis", "em"],
    perfeito: ["i", "este", "eu", "emos", "estes", "eram"],
    imperfeito: ["ia", "ias", "ia", "íamos", "íeis", "iam"],
    imperativo: ["e", "amos", "ei"], // come, comamos, comei
  },
  3: {
    presente: ["o", "es", "e", "imos", "is", "em"],
    perfeito: ["i", "iste", "iu", "imos", "istes", "iram"],
    imperfeito: ["ia", "ias", "ia", "íamos", "íeis", "iam"],
    imperativo: ["e", "amos", "i"], // parte, partamos, parti
  },
};

/** The futuro endings, glued onto the full infinitive (andar → andarei…). */
const FUTURO = ["ei", "ás", "á", "emos", "eis", "ão"];

/** Keep the consonant's *sound* steady across the spelling change of the ending.
 *  In -ar verbs (hard c/g) we protect that sound before e/i (ficar → fiquei,
 *  chegar → cheguei, começar → comecei). In -er/-ir verbs (soft c/g) we protect
 *  it before o/a (conhecer → conheço, proteger → protejo, dirigir → dirijo).
 *  These are spelling rules, not irregularity — the verb stays "regular". */
function joinStem(stem: string, ending: string, conj: Conjugation): string {
  const first = ending[0];
  if (conj === 1 && (first === "e" || first === "i")) {
    if (stem.endsWith("ç")) return stem.slice(0, -1) + "c" + ending;
    if (stem.endsWith("c")) return stem.slice(0, -1) + "qu" + ending;
    if (stem.endsWith("g")) return stem.slice(0, -1) + "gu" + ending;
  } else if (conj !== 1 && (first === "o" || first === "a")) {
    if (stem.endsWith("gu")) return stem.slice(0, -2) + "g" + ending;
    if (stem.endsWith("c")) return stem.slice(0, -1) + "ç" + ending;
    if (stem.endsWith("g")) return stem.slice(0, -1) + "j" + ending;
  }
  return stem + ending;
}

/** 1 / 2 / 3 from the infinitive ending, or null for an unusual one. */
export function conjugationOf(infinitive: string): Conjugation | null {
  if (infinitive.endsWith("ar")) return 1;
  if (infinitive.endsWith("er")) return 2;
  if (infinitive.endsWith("ir")) return 3;
  return null;
}

function rows(persons: readonly string[], forms: string[]) {
  return persons.map((person, i) => ({ person, form: forms[i] }));
}

/** Build the five-tense table for a regular verb from its endings. */
function regularTenses(infinitive: string, conj: Conjugation): TenseTable[] {
  const stem = infinitive.slice(0, -2);
  const e = ENDINGS[conj];
  const make = (endings: string[]) => endings.map((end) => joinStem(stem, end, conj));
  const byKey: Record<string, string[]> = {
    presente: make(e.presente),
    perfeito: make(e.perfeito),
    imperfeito: make(e.imperfeito),
    futuro: FUTURO.map((end) => infinitive + end),
    imperativo: make(e.imperativo),
  };
  return TENSE_META.map((t) => ({
    key: t.key,
    label: t.label,
    hint: t.hint,
    rows: rows(t.key === "imperativo" ? IMP_PERSONS : PERSONS, byKey[t.key]),
  }));
}

/** Build the table for an irregular verb from its explicit forms. A verb with
 *  no imperativo (empty array) simply doesn't get that tense. */
function irregularTenses(forms: IrregularForms): TenseTable[] {
  const byKey: Record<string, string[]> = {
    presente: forms.presente,
    perfeito: forms.perfeito,
    imperfeito: forms.imperfeito,
    futuro: forms.futuro,
    imperativo: forms.imperativo,
  };
  return TENSE_META
    .filter((t) => t.key !== "imperativo" || forms.imperativo.length > 0)
    .map((t) => ({
      key: t.key,
      label: t.label,
      hint: t.hint,
      rows: rows(t.key === "imperativo" ? IMP_PERSONS : PERSONS, byKey[t.key]),
    }));
}

/** Conjugate `infinitive`. Pass `forms` for an irregular verb; omit it for a
 *  regular one and every form is derived from the standard endings. */
export function conjugate(infinitive: string, forms?: IrregularForms): Conjugated {
  const conj = conjugationOf(infinitive);
  if (forms) return { infinitive, conj, irregular: true, tenses: irregularTenses(forms) };
  // No table and no recognisable ending — we can't safely guess; return empty.
  if (conj === null) return { infinitive, conj: null, irregular: true, tenses: [] };
  return { infinitive, conj, irregular: false, tenses: regularTenses(infinitive, conj) };
}

/** Read-aloud for a whole tense: "Presente. eu ando, tu andas, …". */
export function tenseSay(t: TenseTable): string {
  const parts = t.rows.map((r) => `${PERSON_SAY[r.person] ?? r.person} ${r.form}`);
  return `${t.label}. ${parts.join(", ")}.`;
}
