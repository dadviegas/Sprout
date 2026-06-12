import type { QuizQuestion, QuizSpec } from "./Quiz";

const QUIZ_BLOCK = /```quiz\s*\r?\n([\s\S]*?)\r?\n```/g;

export interface QuizBlock {
  quizId: string;
  final: boolean;
  title?: string;
  questions: QuizQuestion[];
}

export function hashQuizId(source: string): string {
  let h = 5381;
  for (let i = 0; i < source.length; i++) h = (h * 33) ^ source.charCodeAt(i);
  return "q" + (h >>> 0).toString(36);
}

/** Every quiz block of a lesson body, using the same id rule as Markdown.tsx. */
export function quizBlocksFromBody(body: string): QuizBlock[] {
  const out: QuizBlock[] = [];
  QUIZ_BLOCK.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = QUIZ_BLOCK.exec(body))) {
    try {
      const source = m[1];
      const spec = JSON.parse(source) as QuizSpec;
      if (Array.isArray(spec.questions)) {
        out.push({
          quizId: spec.id ?? hashQuizId(source),
          final: !!spec.final,
          title: spec.title,
          questions: spec.questions,
        });
      }
    } catch {
      /* malformed blocks are caught by `pnpm validate`; skip here */
    }
  }
  return out;
}

/** Pull every quiz question out of a lesson body (practice + final blocks). */
export function questionsFromBody(body: string): QuizQuestion[] {
  return quizBlocksFromBody(body).flatMap((b) => b.questions);
}

export function findQuizQuestion(body: string, quizId: string, questionIndex: number): { block: QuizBlock; question: QuizQuestion } | null {
  for (const block of quizBlocksFromBody(body)) {
    if (block.quizId !== quizId) continue;
    const question = block.questions[questionIndex];
    if (question && !question.gen) return { block, question };
  }
  return null;
}
