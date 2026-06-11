import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { Speaker, Confetti, FractionFigure, stop as stopSpeech, type FractionFigureSpec } from "@sprout/ui";
import { starsForPct, useLessonId, useProgress, TEST_PASS_PCT } from "./progress";
import { lessonMeta } from "./content/curriculum";
import { recordReviewAnswer } from "./study/review";
import { preReaderActive } from "./ui-prefs";

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
  /** step-by-step solution (§4.3), revealed after answering — right OR wrong */
  steps?: string[];
  /** the first rung of the help ladder (§4.5); without it help starts at rung 2 */
  hint?: string;
  /** difficulty (§4.4): 1 fácil · 2 média · 3 difícil; default 2. Final tests
   *  serve questions easiest-first so the run warms up. */
  level?: 1 | 2 | 3;
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

export function Quiz({
  spec,
  quizId,
  onResult,
}: {
  spec: QuizSpec;
  quizId: string;
  /** Called on each finished attempt with the score (0–1) — lets a wrapper
   *  (e.g. the exame final) grade the run; retries fire it again. */
  onResult?: (pct: number) => void;
}) {
  const lessonId = useLessonId();
  const { recordQuiz } = useProgress();

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(() => spec.questions.map(() => null));
  // Help ladder used per question (§4.5): 0 none · 1 pista · 2 opção riscada ·
  // 3 explicação revelada. Any value > 0 marks the answer "com ajuda".
  const [helps, setHelps] = useState<number[]>(() => spec.questions.map(() => 0));
  const [phase, setPhase] = useState<"asking" | "result">("asking");
  const [nonce, setNonce] = useState(0); // forces confetti remount on retry
  // When this attempt started — so we can record how long the test took. Reset
  // on every retry (below) so a re-take measures only the new attempt.
  const startedAt = useRef(Date.now());
  // When the CURRENT question appeared — so the error bank (§4.2) can tell a
  // quick right answer from a slow one. Reset on next/retry.
  const questionShownAt = useRef(Date.now());

  const total = spec.questions.length;
  const isFinal = !!spec.final;
  // Final tests serve the questions easiest-first (§4.4): a stable sort by
  // `level` (default 2), so the authored order breaks ties. `order[k]` is the
  // question's ORIGINAL index — the review bank keys items by authored index,
  // so re-ordering the run must not change a question's identity.
  const order = useMemo(() => {
    const idx = spec.questions.map((_, k) => k);
    if (isFinal) idx.sort((a, b) => (spec.questions[a].level ?? 2) - (spec.questions[b].level ?? 2));
    return idx;
  }, [spec.questions, isFinal]);
  // Resolve `gen` questions into concrete ones; the seed (quizId + original
  // index + nonce) keeps the same question while it's shown and re-rolls it on
  // every retry.
  const questions = useMemo(
    () => order.map((k) => resolveQuestion(spec.questions[k], hashSeed(quizId) + k * 101 + nonce * 7919)),
    [spec.questions, order, quizId, nonce],
  );
  const question = questions[i];
  const options = question.options ?? [];
  const correctCount = questions.reduce((sum, q, idx) => {
    const answer = answers[idx];
    return sum + (answer !== null && q.options?.[answer]?.correct ? 1 : 0);
  }, 0);
  // Star points (§4.5): a clean right answer is worth 1, one answered with
  // help (pista / opção riscada) half, and one where the explanation was
  // revealed nothing. Progress and the ≥80% pass gate keep the FULL count —
  // only the stars are weighted.
  const starPoints = questions.reduce((sum, q, idx) => {
    const answer = answers[idx];
    if (answer === null || !q.options?.[answer]?.correct) return sum;
    const h = helps[idx];
    return sum + (h === 0 ? 1 : h < 3 ? 0.5 : 0);
  }, 0);
  const progressPct = total ? ((i + (picked !== null ? 1 : 0)) / total) * 100 : 0;

  useEffect(() => {
    if (phase === "result") {
      const secs = Math.round((Date.now() - startedAt.current) / 1000);
      recordQuiz(lessonId, quizId, { correct: correctCount, total }, isFinal, secs, total ? starPoints / total : 0);
      onResult?.(total ? correctCount / total : 0);
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
    // Feed the error bank (§4.2). Only AUTHORED questions of real lessons:
    // `gen` questions change on every run (no stable identity) and synthetic
    // ids (Simulado, orphan quizzes) aren't lessons the child can reopen.
    // The bank is keyed by the AUTHORED index (`order[i]`), and an answer that
    // used help enters it as "needs work" even when right (§4.5).
    if (!question.gen && lessonMeta.has(lessonId)) {
      const secs = Math.round((Date.now() - questionShownAt.current) / 1000);
      recordReviewAnswer(lessonId, quizId, order[i], !!options[idx]?.correct, secs, {
        assisted: helps[i] > 0,
        level: question.level ?? 2,
      });
    }
  };

  const next = () => {
    if (i + 1 < total) {
      setI(i + 1);
      setPicked(null);
      questionShownAt.current = Date.now();
    } else {
      setPhase("result");
    }
  };

  const retry = () => {
    setI(0);
    setPicked(null);
    setAnswers(spec.questions.map(() => null));
    setHelps(spec.questions.map(() => 0));
    setPhase("asking");
    setNonce((n) => n + 1);
    startedAt.current = Date.now(); // time the new attempt from scratch
    questionShownAt.current = Date.now();
  };

  if (phase === "result") {
    const pct = total ? correctCount / total : 0;
    // Stars come from the WEIGHTED points (§4.5): help halves a question's
    // worth. The score, percentage and pass gate keep the full count.
    const stars = starsForPct(total ? starPoints / total : 0);
    const pctLabel = Math.round(pct * 100);
    // A FINAL test only concludes the lesson at ≥ 80% — below that it stays
    // "a repetir", said with encouragement (never "estás mal").
    const passed = pct >= TEST_PASS_PCT;
    const msg =
      stars === 3
        ? "Uau! Acertaste em tudo!"
        : isFinal && !passed
          ? "Boa tentativa! Repete o teste para concluíres a lição — estás quase!"
          : stars === 2
            ? "Muito bem! Estás quase!"
            : "Boa tentativa! Tenta outra vez.";
    const resultIcon: IconName = stars === 3 ? "trophy" : stars === 2 ? "star" : "plant";
    return (
      <div className="quiz sprout-pop">
        {stars >= 2 && (!isFinal || passed) && <Confetti key={nonce} />}
        <div className="result">
          <div className="result-icon" style={{ color: stars >= 2 ? "var(--warn)" : "var(--primary)" }}>
            <Icon name={resultIcon} size={56} fill={stars >= 2 ? "currentColor" : "none"} />
          </div>
          <div className="score">
            {correctCount}/{total}
          </div>
          <div className="result-percent">{pctLabel}% certo</div>
          {isFinal && (
            <span className={`quiz-pass ${passed ? "ok" : "redo"}`}>
              <Icon name={passed ? "check" : "refresh"} size={14} />
              {passed ? "Lição concluída!" : "A repetir — concluis com 80% ou mais"}
            </span>
          )}
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
                    <strong>{ok ? (helps[idx] > 0 ? "Certa com ajuda" : "Certa") : "A rever"}</strong>
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
  // Pre-reader mode (§4.10): when every option carries an emoji, prefer the
  // big tappable grid so a non-reader can answer by image alone.
  const meta = lessonMeta.get(lessonId);
  const preReader = !!meta && preReaderActive(meta.subjectId, meta.year);
  const grid = question.layout === "grid" || (preReader && options.length > 0 && options.every((o) => o.emoji));
  // Read-aloud of the question PLUS the options, for non-readers navigating by
  // keyboard or who need to hear the choices.
  const optionsText = options.map((o) => o.t).filter(Boolean).join(", ");
  const questionSpeech = optionsText ? `${question.q}. As opções são: ${optionsText}.` : question.q ?? "";

  // Help ladder (§4.5): each press unlocks the next rung — 1 pista (skipped
  // when the author wrote none) → 2 risca uma opção errada → 3 revela a
  // explicação (the question stops counting for the stars). Before answering only.
  const helpLevel = helps[i];
  const hasHint = !!question.hint;
  const askHelp = () => setHelps((prev) => prev.map((h, k) => (k === i ? (h === 0 && !hasHint ? 2 : h + 1) : h)));
  // The struck-out option: the first wrong one in this run's shuffled order.
  const eliminatedIdx = helpLevel >= 2 ? options.findIndex((o) => !o.correct) : -1;
  const helpRows: string[] = [];
  if (helpLevel >= 1 && hasHint) helpRows.push(`Pista: ${question.hint}`);
  if (helpLevel >= 2) helpRows.push("Risquei uma opção errada por ti.");
  if (helpLevel >= 3)
    helpRows.push(
      `${question.explain ? `Explicação: ${question.explain}` : "Lê com calma e escolhe."} Esta pergunta já não conta para as estrelas — mas aprender conta sempre!`,
    );
  const helpSpeech = ["Pedir ajuda é de espertos!", ...helpRows].join(" ");

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

      <div className={`options ${grid ? "grid" : ""}`}>
        {options.map((opt, idx) => {
          const reveal = answered;
          const right = reveal && opt.correct;
          const wrong = reveal && idx === picked && !opt.correct;
          const struck = idx === eliminatedIdx && !answered;
          const cls = ["opt", grid ? "big" : "", right ? "is-correct" : "", wrong ? "is-wrong" : "", struck ? "is-eliminated" : ""]
            .filter(Boolean)
            .join(" ");
          return (
            <button key={idx} className={cls} disabled={answered || struck} onClick={() => choose(idx)}>
              {opt.emoji && <span className="opt-emoji">{opt.emoji}</span>}
              {opt.t && <span>{opt.t}</span>}
              {right && <span className="opt-mark ok"><Icon name="check" size={18} /></span>}
              {wrong && <span className="opt-mark bad"><Icon name="close" size={18} /></span>}
            </button>
          );
        })}
      </div>

      {!answered && (
        <div className="quiz-help">
          {helpLevel > 0 && (
            <div className="quiz-help__box">
              <div className="quiz-help__head">
                <Icon name="tip" size={18} />
                <strong>Pedir ajuda é de espertos!</strong>
                <Speaker text={helpSpeech} className="prose-speak" size={18} label="Ouvir a ajuda" />
              </div>
              {helpRows.map((row, k) => (
                <p key={k} className="quiz-help__row">{row}</p>
              ))}
            </div>
          )}
          {helpLevel < 3 && (
            <button type="button" className="quiz-help__btn" onClick={askHelp}>
              <Icon name="tip" size={18} /> {helpLevel === 0 ? "Preciso de ajuda" : "Mais ajuda"}
            </button>
          )}
        </div>
      )}

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
          {question.steps && question.steps.length > 0 && (
            // Step-by-step solution (§4.3) — shown after answering, right OR
            // wrong, so the reasoning is always walked through.
            <div className="quiz-solution">
              <div className="quiz-solution__head">
                <Icon name="reading" size={18} />
                <strong>Passo a passo</strong>
                <Speaker text={question.steps.join(". ")} className="prose-speak" size={18} label="Ouvir a resolução" />
              </div>
              <ol className="quiz-solution__steps">
                {question.steps.map((s, k) => (
                  <li key={k}>{s}</li>
                ))}
              </ol>
            </div>
          )}
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
