import { useEffect, useMemo, useState } from "react";
import { Confetti } from "@sprout/ui";

type Question = {
  word: string;
  prompt: string;
  answer: string;
  options: string[];
};

const QUESTIONS: Question[] = [
  { word: "rápido", prompt: "O contrário é...", answer: "lento", options: ["lento", "alto", "doce", "novo"] },
  { word: "planeta", prompt: "É uma palavra de...", answer: "espaço", options: ["comida", "espaço", "roupa", "música"] },
  { word: "feliz", prompt: "O sinónimo é...", answer: "contente", options: ["contente", "pequeno", "redondo", "frio"] },
  { word: "correr", prompt: "É um...", answer: "verbo", options: ["nome", "verbo", "adjetivo", "número"] },
  { word: "biblioteca", prompt: "Tem muitos...", answer: "livros", options: ["livros", "peixes", "sapatos", "pratos"] },
  { word: "enorme", prompt: "Quer dizer...", answer: "muito grande", options: ["muito grande", "muito lento", "muito doce", "muito vazio"] },
  { word: "amizade", prompt: "É uma palavra ligada a...", answer: "amigos", options: ["amigos", "chuva", "dinheiro", "pedras"] },
  { word: "silencioso", prompt: "Quer dizer...", answer: "com pouco barulho", options: ["com pouco barulho", "com muita luz", "com muita pressa", "com muita cor"] },
];

const ROUND_TIME = 7;

function pickQuestion(previous?: string) {
  const pool = QUESTIONS.filter((q) => q.word !== previous);
  return pool[Math.floor(Math.random() * pool.length)] ?? QUESTIONS[0];
}

function shuffle<T>(items: readonly T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function BatalhaPalavras() {
  const [question, setQuestion] = useState(() => pickQuestion());
  const [seconds, setSeconds] = useState(ROUND_TIME);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [lives, setLives] = useState(3);
  const [playing, setPlaying] = useState(false);
  const [flash, setFlash] = useState<"hit" | "miss" | null>(null);

  const options = useMemo(() => shuffle(question.options), [question]);
  const won = score >= 180;
  const over = lives <= 0;

  useEffect(() => {
    if (!playing || over || won) return;
    const tick = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          setLives((value) => value - 1);
          setCombo(1);
          setFlash("miss");
          setQuestion((q) => pickQuestion(q.word));
          window.setTimeout(() => setFlash(null), 350);
          return ROUND_TIME;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(tick);
  }, [over, playing, won]);

  const start = () => {
    setQuestion(pickQuestion(question.word));
    setSeconds(ROUND_TIME);
    setScore(0);
    setCombo(1);
    setLives(3);
    setPlaying(true);
    setFlash(null);
  };

  const answer = (option: string) => {
    if (!playing || over || won) return;
    if (option === question.answer) {
      const nextCombo = Math.min(combo + 1, 5);
      setScore((value) => value + 10 * combo);
      setCombo(nextCombo);
      setFlash("hit");
    } else {
      setLives((value) => value - 1);
      setCombo(1);
      setFlash("miss");
    }
    setSeconds(ROUND_TIME);
    setQuestion((q) => pickQuestion(q.word));
    window.setTimeout(() => setFlash(null), 350);
  };

  return (
    <div className={`bp-game ${flash ? `is-${flash}` : ""}`}>
      {won && <Confetti pieces={42} />}
      <div className="bp-hud">
        <div>
          <p className="ps-kicker">Batalha das Palavras</p>
          <h3>{over ? "Fim da batalha" : won ? "Vitória!" : "Escolhe antes de cair"}</h3>
        </div>
        <div className="bp-stats">
          <span>{score}<small>pontos</small></span>
          <span>x{combo}<small>combo</small></span>
          <span>{lives}<small>vidas</small></span>
        </div>
      </div>

      <div className="bp-arena">
        <div className="bp-danger" style={{ ["--fall" as string]: `${100 - (seconds / ROUND_TIME) * 100}%` }} />
        <div className="bp-word" style={{ ["--fall" as string]: `${100 - (seconds / ROUND_TIME) * 100}%` }}>
          {question.word}
        </div>
        <p>{question.prompt}</p>
      </div>

      {!playing || over || won ? (
        <button className="stop-main bp-start" onClick={start}>{playing ? "Jogar outra vez" : "Começar"}</button>
      ) : (
        <div className="bp-options">
          {options.map((option) => (
            <button key={option} onClick={() => answer(option)}>{option}</button>
          ))}
        </div>
      )}
    </div>
  );
}
