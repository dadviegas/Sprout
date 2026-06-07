import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { Speaker, Confetti, FractionFigure, stop as stopSpeech, type FractionFigureSpec } from "@sprout/ui";
import { starsForPct, useLessonId, useProgress } from "./progress";

export interface QuizOption {
  t: string;
  emoji?: string;
  correct?: boolean;
}
/** Recipe for a question built fresh at run time (a new one on every retry),
 *  so practice never repeats the same numbers. Today only fraction-naming. */
export interface QuizGen {
  kind: "fraction";
  shape?: "pie" | "bar";
  max?: number; // largest denominator, default 6
}
export interface QuizQuestion {
  q?: string; // optional when `gen` builds the question
  emoji?: string;
  layout?: "grid" | "list";
  options?: QuizOption[]; // optional when `gen` builds the options
  explain?: string;
  figure?: FractionFigureSpec; // a fraction drawn above the options
  gen?: QuizGen; // build q + figure + options dynamically
}

/* ---- dynamic questions: a tiny seeded RNG keeps each question stable while
   it's on screen, but changes it on every retry (seed folds in the nonce). ---- */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
function shuffle<T>(arr: T[], rnd: () => number): T[] {
  const a = arr.slice();
  for (let k = a.length - 1; k > 0; k--) {
    const j = Math.floor(rnd() * (k + 1));
    [a[k], a[j]] = [a[j], a[k]];
  }
  return a;
}

function genFraction(gen: QuizGen, rnd: () => number): QuizQuestion {
  const max = Math.min(Math.max(gen.max ?? 6, 3), 10);
  const parts = 2 + Math.floor(rnd() * (max - 1)); // 2..max
  const filled = 1 + Math.floor(rnd() * (parts - 1)); // 1..parts-1
  const correct = `${filled}/${parts}`;
  const seen = new Set([correct]);
  const opts: QuizOption[] = [{ t: correct, correct: true }];
  const candidates = [`${parts}/${filled}`, `${filled + 1}/${parts}`, `${filled - 1 || 1}/${parts}`, `${filled}/${parts + 1}`];
  for (const c of shuffle(candidates, rnd)) {
    if (opts.length >= 3) break;
    if (!seen.has(c)) {
      seen.add(c);
      opts.push({ t: c });
    }
  }
  return {
    q: "Que fração está pintada?",
    layout: "grid",
    figure: { parts, filled, shape: gen.shape ?? "pie" },
    options: shuffle(opts, rnd),
    explain: `Estão pintadas ${filled} de ${parts} partes: ${correct}.`,
  };
}

function resolveQuestion(raw: QuizQuestion, seed: number): QuizQuestion {
  if (raw.gen?.kind === "fraction") return { ...raw, ...genFraction(raw.gen, mulberry32(seed)) };
  // Shuffle the options so the correct answer isn't always in the same spot —
  // authors tend to write it first, which lets a child "win" by always tapping
  // the top one. Seeded by the same per-question seed, so the order stays stable
  // while the question is on screen and re-rolls on every retry.
  if (raw.options && raw.options.length > 1) return { ...raw, options: shuffle(raw.options, mulberry32(seed)) };
  return raw;
}
export interface QuizSpec {
  id?: string;
  title?: string;
  final?: boolean;
  questions: QuizQuestion[];
}

function StarRow({ n, size = 24 }: { n: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${n} de 3 estrelas`}>
      {[0, 1, 2].map((i) => (
        <Icon key={i} name="star" size={size} fill={i < n ? "currentColor" : "none"} style={{ color: i < n ? "var(--warn)" : "var(--ink-3)" }} />
      ))}
    </span>
  );
}

export function Quiz({ spec, quizId }: { spec: QuizSpec; quizId: string }) {
  const lessonId = useLessonId();
  const { recordQuiz } = useProgress();

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(() => spec.questions.map(() => null));
  const [phase, setPhase] = useState<"asking" | "result">("asking");
  const [nonce, setNonce] = useState(0); // forces confetti remount on retry
  // When this attempt started — so we can record how long the test took. Reset
  // on every retry (below) so a re-take measures only the new attempt.
  const startedAt = useRef(Date.now());

  const total = spec.questions.length;
  // Resolve `gen` questions into concrete ones; the seed (quizId + index +
  // nonce) keeps the same question while it's shown and re-rolls it on retry.
  const questions = useMemo(
    () => spec.questions.map((q, idx) => resolveQuestion(q, hashSeed(quizId) + idx * 101 + nonce * 7919)),
    [spec.questions, quizId, nonce],
  );
  const question = questions[i];
  const options = question.options ?? [];
  const isFinal = !!spec.final;
  const correctCount = questions.reduce((sum, q, idx) => {
    const answer = answers[idx];
    return sum + (answer !== null && q.options?.[answer]?.correct ? 1 : 0);
  }, 0);
  const progressPct = total ? ((i + (picked !== null ? 1 : 0)) / total) * 100 : 0;

  useEffect(() => {
    if (phase === "result") {
      const secs = Math.round((Date.now() - startedAt.current) / 1000);
      recordQuiz(lessonId, quizId, { correct: correctCount, total }, isFinal, secs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, nonce]);

  // Stop any read-aloud when the question changes or we reach the result, so
  // the previous question's audio never plays over the next screen. The child
  // taps the speaker again to hear the new one.
  useEffect(() => {
    stopSpeech();
  }, [i, phase]);

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    setAnswers((prev) => prev.map((answer, answerIdx) => (answerIdx === i ? idx : answer)));
  };

  const next = () => {
    if (i + 1 < total) {
      setI(i + 1);
      setPicked(null);
    } else {
      setPhase("result");
    }
  };

  const retry = () => {
    setI(0);
    setPicked(null);
    setAnswers(spec.questions.map(() => null));
    setPhase("asking");
    setNonce((n) => n + 1);
    startedAt.current = Date.now(); // time the new attempt from scratch
  };

  if (phase === "result") {
    const pct = total ? correctCount / total : 0;
    const stars = starsForPct(pct);
    const pctLabel = Math.round(pct * 100);
    const msg =
      stars === 3
        ? "Uau! Acertaste em tudo!"
        : stars === 2
          ? "Muito bem! Estás quase!"
          : "Boa tentativa! Tenta outra vez.";
    const resultIcon: IconName = stars === 3 ? "trophy" : stars === 2 ? "star" : "plant";
    return (
      <div className="quiz sprout-pop">
        {stars >= 2 && <Confetti key={nonce} />}
        <div className="result">
          <div className="result-icon" style={{ color: stars >= 2 ? "var(--warn)" : "var(--primary)" }}>
            <Icon name={resultIcon} size={56} fill={stars >= 2 ? "currentColor" : "none"} />
          </div>
          <div className="score">
            {correctCount}/{total}
          </div>
          <div className="result-percent">{pctLabel}% certo</div>
          <div className="stars">
            <StarRow n={stars} size={34} />
          </div>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15em", margin: "6px 0 4px" }}>{msg}</p>
          <div className="quiz-review" aria-label="Revisão das respostas">
            {questions.map((q, idx) => {
              const answer = answers[idx];
              const ok = answer !== null && !!q.options?.[answer]?.correct;
              const correct = q.options?.find((o) => o.correct)?.t;
              return (
                <div key={idx} className={`quiz-review__item ${ok ? "ok" : "no"}`}>
                  <span className="quiz-review__num">{idx + 1}</span>
                  <span className="quiz-review__text">
                    <strong>{ok ? "Certa" : "A rever"}</strong>
                    {correct && <span>Resposta: {correct}</span>}
                  </span>
                  <Icon name={ok ? "check" : "info"} size={18} />
                </div>
              );
            })}
          </div>
          <div className="quiz-foot" style={{ justifyContent: "center" }}>
            <button className="pill ghost" onClick={retry}>
              <Icon name="refresh" size={18} /> Tentar outra vez
            </button>
            <Speaker text={msg} className="prose-speak" size={20} />
          </div>
        </div>
      </div>
    );
  }

  const answered = picked !== null;
  const isCorrect = answered && !!options[picked!]?.correct;
  // Read-aloud of the question PLUS the options, for non-readers navigating by
  // keyboard or who need to hear the choices.
  const optionsText = options.map((o) => o.t).filter(Boolean).join(", ");
  const questionSpeech = optionsText ? `${question.q}. As opções são: ${optionsText}.` : question.q ?? "";

  return (
    <div className={`quiz ${isFinal ? "is-final" : ""}`}>
      <div className="quiz-head">
        <span className="quiz-badge">
          <Icon name={isFinal ? "trophy" : "pencil"} size={16} /> {isFinal ? "Questionário" : "Vamos praticar"}
        </span>
        {spec.title && <span style={{ fontWeight: 700 }}>{spec.title}</span>}
        <span className="qcount">
          {i + 1} / {total}
        </span>
      </div>
      <div className="quiz-progress" aria-hidden="true">
        <span style={{ width: `${progressPct}%` }} />
      </div>
      <div className="quiz-steps" aria-label={`Pergunta ${i + 1} de ${total}`}>
        {questions.map((q, idx) => {
          const answer = answers[idx];
          const ok = answer !== null && !!q.options?.[answer]?.correct;
          return (
            <span
              key={idx}
              className={[
                "quiz-step",
                idx === i ? "current" : "",
                answer !== null ? "done" : "",
                answer !== null && !ok ? "miss" : "",
              ].filter(Boolean).join(" ")}
            />
          );
        })}
      </div>

      <div className="question">
        {question.emoji && <span className="qemoji">{question.emoji}</span>}
        <span>{question.q}</span>
        <Speaker text={questionSpeech} className="prose-speak" size={20} label="Ouvir a pergunta e as opções" />
      </div>

      {question.figure && (
        <div className="qfigure">
          <FractionFigure
            parts={question.figure.parts}
            filled={question.figure.filled}
            shape={question.figure.shape}
            color={question.figure.color}
            className={`qfigure-svg${question.figure.shape === "bar" ? " is-bar" : ""}`}
          />
        </div>
      )}

      <div className={`options ${question.layout === "grid" ? "grid" : ""}`}>
        {options.map((opt, idx) => {
          const reveal = answered;
          const right = reveal && opt.correct;
          const wrong = reveal && idx === picked && !opt.correct;
          const cls = ["opt", question.layout === "grid" ? "big" : "", right ? "is-correct" : "", wrong ? "is-wrong" : ""]
            .filter(Boolean)
            .join(" ");
          return (
            <button key={idx} className={cls} disabled={answered} onClick={() => choose(idx)}>
              {opt.emoji && <span className="opt-emoji">{opt.emoji}</span>}
              {opt.t && <span>{opt.t}</span>}
              {right && <span className="opt-mark ok"><Icon name="check" size={18} /></span>}
              {wrong && <span className="opt-mark bad"><Icon name="close" size={18} /></span>}
            </button>
          );
        })}
      </div>

      {answered && (
        <>
          <div className={`feedback ${isCorrect ? "good" : "bad"}`}>
            <Icon name={isCorrect ? "check" : "info"} size={20} />
            <span>{isCorrect ? "Certo!" : "Quase!"} {question.explain ?? ""}</span>
            <Speaker
              text={`${isCorrect ? "Certo!" : "Quase!"} ${question.explain ?? ""}`}
              className="prose-speak"
              size={20}
              label="Ouvir"
            />
          </div>
          <div className="quiz-foot">
            <button className="pill" onClick={next}>
              {i + 1 < total ? "Próxima" : "Ver resultado"} <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
