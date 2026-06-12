import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Icon, SUBJECT_ICONS, type IconName } from "@sprout/icons";
import { Speaker } from "@sprout/ui";
import { findLesson, lessonMeta, subjectById, type YearN } from "../content/curriculum";
import type { View } from "../nav";
import { findQuizQuestion } from "../quiz-content";
import { dueReviews, recordReviewAnswer, useReview, type ReviewItem, type ReviewQuestionSnapshot } from "./review";

interface ReviewGroup {
  lessonId: string;
  items: ReviewItem[];
  title: string;
  year: YearN;
  subjectId: string;
  subjectTitle: string;
  subjectColor: string;
  subjectColorSoft: string;
}

interface ReviewQuestion {
  item: ReviewItem;
  quizId: string;
  questionIndex: number;
  title: string;
  subjectTitle: string;
  question: ReviewQuestionSnapshot;
  fromSnapshot: boolean;
}

function levelLabel(level?: number): string {
  if (level === 3) return "difícil";
  if (level === 2) return "médio";
  return "base";
}

function groupDue(items: ReviewItem[]): ReviewGroup[] {
  const grouped = new Map<string, ReviewItem[]>();
  for (const item of items) {
    const bucket = grouped.get(item.lessonId) ?? [];
    bucket.push(item);
    grouped.set(item.lessonId, bucket);
  }
  return Array.from(grouped.entries())
    .map(([lessonId, bucket]) => {
      const meta = lessonMeta.get(lessonId)!;
      const subject = subjectById.get(meta.subjectId)!;
      return {
        lessonId,
        items: bucket,
        title: meta.title,
        year: meta.year,
        subjectId: meta.subjectId,
        subjectTitle: subject.label,
        subjectColor: subject.color,
        subjectColorSoft: subject.colorSoft,
      };
    })
    .sort((a, b) => b.items.length - a.items.length || a.title.localeCompare(b.title, "pt"));
}

function reviewItemParts(item: ReviewItem): { quizId: string; questionIndex: number } | null {
  const parts = item.id.split("#");
  const indexRaw = parts.pop();
  const quizId = parts.pop();
  const questionIndex = Number(indexRaw);
  if (!quizId || !Number.isInteger(questionIndex)) return null;
  return { quizId, questionIndex };
}

function resolveDueQuestions(items: ReviewItem[]): ReviewQuestion[] {
  const out: ReviewQuestion[] = [];
  for (const item of items) {
    const meta = lessonMeta.get(item.lessonId);
    const parts = reviewItemParts(item);
    if (!meta || !parts) continue;
    const lesson = findLesson(meta.subjectId, meta.year, item.lessonId);
    const found = lesson?.body ? findQuizQuestion(lesson.body, parts.quizId, parts.questionIndex) : null;
    let liveQuestion: ReviewQuestionSnapshot | null = null;
    if (found?.question.q && found.question.options?.length) {
      liveQuestion = {
        q: found.question.q,
        emoji: found.question.emoji,
        options: found.question.options.map((o) => ({ t: o.t, emoji: o.emoji, correct: o.correct })),
        explain: found.question.explain,
        level: found.question.level,
      };
    }
    const question = liveQuestion ?? item.snapshot;
    if (!question?.q || !question.options?.length) continue;
    out.push({
      item,
      quizId: parts.quizId,
      questionIndex: parts.questionIndex,
      title: meta.title,
      subjectTitle: meta.subjectLabel,
      question,
      fromSnapshot: !liveQuestion,
    });
  }
  return out;
}

export function ReviewRunner({ onGo }: { onGo: (view: View) => void }) {
  const review = useReview();
  const [answered, setAnswered] = useState<Record<string, { correct: boolean; picked: string; explain?: string }>>({});
  const [lastAnswer, setLastAnswer] = useState<{ correct: boolean; title: string; picked: string; explain?: string } | null>(null);
  const now = Date.now();
  const due = useMemo(() => dueReviews(review, now), [review, now]);
  const groups = useMemo(() => groupDue(due), [due]);
  const reviewQuestions = useMemo(() => resolveDueQuestions(due).filter((q) => !answered[q.item.id]).slice(0, 5), [due, answered]);
  const total = due.length;
  const first = groups[0];

  const choose = (rq: ReviewQuestion, optionIndex: number) => {
    const option = rq.question.options?.[optionIndex];
    if (!option || answered[rq.item.id]) return;
    const correct = !!option.correct;
    recordReviewAnswer(rq.item.lessonId, rq.quizId, rq.questionIndex, correct, 0, {
      level: rq.question.level ?? rq.item.level ?? 2,
      snapshot: rq.question,
    });
    setLastAnswer({ correct, title: rq.title, picked: option.t, explain: rq.question.explain });
    setAnswered((prev) => ({
      ...prev,
      [rq.item.id]: { correct, picked: option.t, explain: rq.question.explain },
    }));
  };

  if (total === 0) {
    return (
      <main className="review-runner">
        <section className="review-hero review-hero--empty">
          <span className="review-hero__icon"><Icon name="target" size={30} /></span>
          <div>
            <h1>Banco de erros em dia</h1>
            <p>Não há perguntas vencidas agora. O plano continua a puxar a próxima matéria certa.</p>
          </div>
          <button className="btn primary" onClick={() => onGo({ kind: "plano" })}>
            <Icon name="calendar" size={18} /> Voltar ao plano
          </button>
          <Speaker text="Banco de erros em dia. Não há perguntas vencidas agora." className="review-hero__say" />
        </section>
      </main>
    );
  }

  const say = `Revisão de erros. Tens ${total} ${total === 1 ? "pergunta" : "perguntas"} para vencer. Começa por ${first.title}.`;

  return (
    <main className="review-runner">
      <section className="review-hero">
        <span className="review-hero__icon"><Icon name="target" size={30} /></span>
        <div>
          <h1>Revisão de erros</h1>
          <p>
            {total === 1 ? "Tens 1 pergunta vencida." : `Tens ${total} perguntas vencidas.`} Começa pela matéria com mais erros e volta ao teste para as fechar.
          </p>
        </div>
        {first && (
          <button
            className="btn primary"
            onClick={() => onGo({ kind: "lesson", year: first.year, subjectId: first.subjectId, lessonId: first.lessonId })}
          >
            <Icon name="forward" size={18} /> Começar
          </button>
        )}
        <Speaker text={say} className="review-hero__say" />
      </section>

      {lastAnswer && (
        <aside className={`review-last ${lastAnswer.correct ? "is-ok" : "is-no"}`}>
          <Icon name={lastAnswer.correct ? "check" : "target"} size={22} />
          <div>
            <strong>{lastAnswer.correct ? "Erro fechado" : "Marcado para voltar a rever"}</strong>
            <span>{lastAnswer.title} · respondeste: {lastAnswer.picked}</span>
            {lastAnswer.explain && <span>{lastAnswer.explain}</span>}
          </div>
        </aside>
      )}

      {reviewQuestions.length > 0 && (
        <section className="review-questions" aria-label="Perguntas da revisão">
          {reviewQuestions.map((rq) => {
            const result = answered[rq.item.id];
            return (
              <article className={`review-question ${result ? (result.correct ? "is-ok" : "is-no") : ""}`} key={rq.item.id}>
                <div className="review-question__head">
                  <span>{rq.subjectTitle}</span>
                  <strong>{rq.title}</strong>
                  {rq.fromSnapshot && <em>guardada</em>}
                  <Speaker text={`${rq.question.q}. ${rq.question.options?.map((o) => o.t).join(". ") ?? ""}`} className="review-question__say" size={17} />
                </div>
                <p className="review-question__q">{rq.question.q}</p>
                <div className="review-question__options">
                  {rq.question.options?.map((option, optionIndex) => (
                    <button key={`${rq.item.id}-${optionIndex}`} disabled={!!result} onClick={() => choose(rq, optionIndex)}>
                      {option.emoji && <span aria-hidden>{option.emoji}</span>}
                      {option.t}
                    </button>
                  ))}
                </div>
                {result && (
                  <div className="review-question__feedback">
                    <strong>{result.correct ? "Fechaste este erro." : "Boa tentativa. Fica marcado para rever outra vez."}</strong>
                    {result.explain && <span>{result.explain}</span>}
                  </div>
                )}
              </article>
            );
          })}
        </section>
      )}

      <section className="review-list" aria-label="Matérias para rever">
        {groups.map((group, index) => {
          const hardest = Math.max(...group.items.map((i) => i.level ?? 1));
          const subjectIcon = (SUBJECT_ICONS[group.subjectId] ?? "reading") as IconName;
          return (
            <article
              className="review-row"
              key={group.lessonId}
              style={{ "--review-color": group.subjectColor, "--review-soft": group.subjectColorSoft } as CSSProperties}
            >
              <span className="review-row__rank">{String(index + 1).padStart(2, "0")}</span>
              <span className="review-row__icon"><Icon name={subjectIcon} size={24} /></span>
              <div className="review-row__body">
                <strong>{group.title}</strong>
                <span>
                  {group.subjectTitle} · {group.items.length} {group.items.length === 1 ? "pergunta" : "perguntas"} · nível {levelLabel(hardest)}
                </span>
              </div>
              <div className="review-row__actions">
                <button onClick={() => onGo({ kind: "lesson", year: group.year, subjectId: group.subjectId, lessonId: group.lessonId })}>
                  <Icon name="reading" size={17} /> Lição
                </button>
                <button onClick={() => onGo({ kind: "test", year: group.year, subjectId: group.subjectId, lessonId: group.lessonId })}>
                  <Icon name="target" size={17} /> Teste
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
