import { useEffect, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { Speaker, Confetti } from "@sprout/ui";
import { starsForPct, useLessonId, useProgress } from "./progress";

export interface QuizOption {
  t: string;
  emoji?: string;
  correct?: boolean;
}
export interface QuizQuestion {
  q: string;
  emoji?: string;
  layout?: "grid" | "list";
  options: QuizOption[];
  explain?: string;
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
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<"asking" | "result">("asking");
  const [nonce, setNonce] = useState(0); // forces confetti remount on retry

  const total = spec.questions.length;
  const question = spec.questions[i];
  const isFinal = !!spec.final;

  useEffect(() => {
    if (phase === "result") {
      recordQuiz(lessonId, quizId, { correct: correctCount, total }, isFinal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, nonce]);

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (question.options[idx]?.correct) setCorrectCount((c) => c + 1);
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
    setCorrectCount(0);
    setPhase("asking");
    setNonce((n) => n + 1);
  };

  if (phase === "result") {
    const pct = total ? correctCount / total : 0;
    const stars = starsForPct(pct);
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
          <div className="stars">
            <StarRow n={stars} size={34} />
          </div>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15em", margin: "6px 0 4px" }}>{msg}</p>
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
  const isCorrect = answered && !!question.options[picked!]?.correct;
  // Read-aloud of the question PLUS the options, for non-readers navigating by
  // keyboard or who need to hear the choices.
  const optionsText = question.options.map((o) => o.t).filter(Boolean).join(", ");
  const questionSpeech = optionsText ? `${question.q}. As opções são: ${optionsText}.` : question.q;

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

      <div className="question">
        {question.emoji && <span className="qemoji">{question.emoji}</span>}
        <span>{question.q}</span>
        <Speaker text={questionSpeech} className="prose-speak" size={20} label="Ouvir a pergunta e as opções" />
      </div>

      <div className={`options ${question.layout === "grid" ? "grid" : ""}`}>
        {question.options.map((opt, idx) => {
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
