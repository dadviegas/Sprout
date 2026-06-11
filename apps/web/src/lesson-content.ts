/* Splits a lesson's markdown into the LEARN part (explanation + interactive
 * blocks + the "Vamos praticar" practice quiz) and the TEST part (the final
 * graded questionnaire). The split lets the app show the assessment on its own
 * screen, reached by a "Fazer o teste" link at the end of the lesson.
 *
 * Every lesson uses exactly this heading to introduce its graded quiz, so a
 * plain string split is reliable (verified across all 55 lessons). */
const FINAL_MARKER = "## 🎯 Questionário final";

export interface SplitLesson {
  /** Everything up to (not including) the final questionnaire. */
  learn: string;
  /** The final questionnaire markdown (the `final: true` quiz), heading
   *  stripped — or null if the lesson has no graded test. */
  test: string | null;
}

export function splitLesson(body: string): SplitLesson {
  const i = body.indexOf(FINAL_MARKER);
  if (i < 0) return { learn: body, test: null };
  const test = body.slice(i + FINAL_MARKER.length).replace(/^\s+/, "");
  return { learn: body.slice(0, i).trimEnd(), test };
}

/* Every lesson opens with a `> [!NOTE] **O que vais aprender** …` callout
 * (authoring convention, see CLAUDE.md). The full-plan page shows a one-line
 * digest of it per lesson, so this pulls the callout's first sentence out of
 * the raw markdown — no renderer involved. */
const SUMMARY_MARKER = "O que vais aprender";
const SUMMARY_MAX_CHARS = 90;

export function lessonSummary(body: string): string | null {
  const lines = body.split("\n");
  const at = lines.findIndex((l) => l.startsWith(">") && l.includes(SUMMARY_MARKER));
  if (at < 0) return null;
  // The callout may wrap over several `>` lines — join them before cleaning.
  let text = lines[at];
  for (let i = at + 1; i < lines.length && lines[i].startsWith(">"); i++) text += ` ${lines[i]}`;
  text = text
    .slice(text.indexOf(SUMMARY_MARKER) + SUMMARY_MARKER.length)
    .replace(/[*_`>]/g, "") // markdown emphasis/quote noise
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/gu, "") // emoji
    .replace(/\s+/g, " ")
    .trim();
  // First sentence: a ./!/? followed by a space or the end ("1.º" and "2,5"
  // never match, their dot isn't followed by whitespace).
  const end = text.match(/[.!?](?=\s|$)/);
  if (end?.index != null) text = text.slice(0, end.index + 1);
  if (text.length > SUMMARY_MAX_CHARS) {
    text = `${text.slice(0, SUMMARY_MAX_CHARS).replace(/\s+\S*$/, "")}…`;
  }
  return text || null;
}

/* Rough lesson duration for the card chip ("≈ N min"). Calibrated against a
 * real run-through (the old words/140 + 1 min/block DOUBLED real time, which
 * stopped the férias planner from fitting two lessons in a 30-min day):
 * reading at ~200 wpm of effective skimming + half a minute per widget/quiz,
 * capped at 15 — a lesson is a sit-down of minutes, not a class period. */
export function lessonMinutes(body: string): number {
  const blocks = Math.floor((body.match(/^```/gm) ?? []).length / 2);
  const words = body.trim().split(/\s+/).length;
  return Math.min(15, Math.max(1, Math.round(words / 200 + blocks * 0.5)));
}
