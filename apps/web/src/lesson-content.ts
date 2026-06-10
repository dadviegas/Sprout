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

/* Rough lesson duration for the card chip ("≈ N min"): words read aloud at
 * ~140 wpm, plus a minute for each fenced block (widget/quiz). A heuristic on
 * the raw markdown is plenty — the chip just sets expectations. */
export function lessonMinutes(body: string): number {
  const blocks = Math.floor((body.match(/^```/gm) ?? []).length / 2);
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 140 + blocks));
}
