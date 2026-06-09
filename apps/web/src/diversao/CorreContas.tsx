import { useMemo, useState } from "react";
import { Confetti } from "@sprout/ui";

type Problem = {
  text: string;
  answer: number;
  options: number[];
};

const FINISH_METERS = 1000;

function shuffle<T>(items: readonly T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makeProblem(level: number): Problem {
  const max = Math.min(10 + level * 4, 40);
  const a = 2 + Math.floor(Math.random() * max);
  const b = 2 + Math.floor(Math.random() * Math.min(max, 20));
  const op = level > 5 && Math.random() > 0.68 ? "x" : level > 2 && Math.random() > 0.55 ? "-" : "+";
  const left = op === "-" ? Math.max(a, b) : op === "x" ? 2 + Math.floor(Math.random() * Math.min(10, level + 4)) : a;
  const right = op === "-" ? Math.min(a, b) : op === "x" ? 2 + Math.floor(Math.random() * 9) : b;
  const answer = op === "+" ? left + right : op === "-" ? left - right : left * right;
  const options = new Set<number>([answer]);
  while (options.size < 4) {
    const delta = Math.floor(Math.random() * 13) - 6 || 4;
    options.add(Math.max(0, answer + delta));
  }
  return { text: `${left} ${op} ${right}`, answer, options: shuffle([...options]) };
}

export function CorreContas() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [lives, setLives] = useState(4);
  const [meters, setMeters] = useState(0);
  const [problem, setProblem] = useState(() => makeProblem(1));
  const [running, setRunning] = useState(false);
  const [flash, setFlash] = useState<"hit" | "miss" | null>(null);
  const won = meters >= FINISH_METERS;
  const over = lives <= 0;
  const progress = useMemo(() => Math.min(100, (meters / FINISH_METERS) * 100), [meters]);
  const distance = useMemo(() => Math.min(88, 8 + progress * 0.8), [progress]);
  const checkpoint = Math.min(5, Math.floor(meters / 200) + 1);

  const restart = () => {
    setLevel(1);
    setScore(0);
    setCombo(1);
    setLives(4);
    setMeters(0);
    setProblem(makeProblem(1));
    setRunning(true);
    setFlash(null);
  };

  const choose = (option: number) => {
    if (!running || over || won) return;
    if (option === problem.answer) {
      const nextCombo = Math.min(combo + 1, 5);
      const gainedMeters = 45 + combo * 10;
      const nextMeters = Math.min(FINISH_METERS, meters + gainedMeters);
      const nextLevel = Math.min(10, Math.floor(nextMeters / 150) + 1);
      setScore((value) => value + 10 * combo);
      setMeters(nextMeters);
      setCombo(nextCombo);
      setLevel(nextLevel);
      setProblem(makeProblem(nextLevel));
      setFlash("hit");
    } else {
      setLives((value) => value - 1);
      setCombo(1);
      setFlash("miss");
    }
    window.setTimeout(() => setFlash(null), 350);
  };

  return (
    <div className={`cc-game ${flash ? `is-${flash}` : ""}`}>
      {won && <Confetti pieces={44} />}
      <div className="cc-hud">
        <div>
          <p className="ps-kicker">Corre-Contas</p>
          <h3>{over ? "A porta fechou" : won ? "Chegaste à meta!" : "Corre até aos 1000 m"}</h3>
        </div>
        <div className="bp-stats">
          <span>{meters}<small>metros</small></span>
          <span>{score}<small>pontos</small></span>
          <span>x{combo}<small>combo</small></span>
          <span>{lives}<small>vidas</small></span>
        </div>
      </div>

      <div className="cc-progress" aria-label={`${Math.round(progress)} por cento da corrida`}>
        <i style={{ width: `${progress}%` }} />
        <span>Checkpoint {checkpoint}/5</span>
      </div>

      <div className="cc-track">
        <div className="cc-skyline" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="cc-runner" style={{ left: `${distance}%` }}>
          <svg className="cc-ninja" viewBox="0 0 96 112" aria-hidden>
            <path className="cc-ninja__shadow" d="M18 102c11 7 55 7 66 0-8-7-58-7-66 0z" />
            <path className="cc-ninja__scarf" d="M62 20c13-8 23-7 30 1-10 1-17 5-22 13z" />
            <path className="cc-ninja__body" d="M30 50c3-10 33-10 36 0l8 41c-13 9-41 9-52 0z" />
            <path className="cc-ninja__hood" d="M20 35C20 15 35 5 49 5s28 10 28 30c0 20-13 32-28 32S20 55 20 35z" />
            <path className="cc-ninja__face" d="M28 35c7-9 34-9 42 0-4 11-13 17-22 17s-16-6-20-17z" />
            <path className="cc-ninja__eye" d="M36 36c5-3 10-3 15 0-4 3-9 3-15 0z" />
            <path className="cc-ninja__eye" d="M57 36c4-3 9-3 13 0-4 3-8 3-13 0z" />
            <path className="cc-ninja__belt" d="M28 70h42v10H28z" />
            <path className="cc-ninja__arm cc-ninja__arm--a" d="M30 58c-10 4-16 10-19 20" />
            <path className="cc-ninja__arm cc-ninja__arm--b" d="M66 58c10 4 16 10 19 20" />
            <path className="cc-ninja__leg cc-ninja__leg--a" d="M39 90l-11 18" />
            <path className="cc-ninja__leg cc-ninja__leg--b" d="M58 90l14 17" />
          </svg>
        </div>
        <div className="cc-gate">
          <small>Nível {level}</small>
          <strong>{problem.text}</strong>
        </div>
        <div className="cc-finish" aria-hidden>Meta</div>
      </div>

      {!running || over || won ? (
        <button className="stop-main bp-start" onClick={restart}>{running ? "Correr outra vez" : "Começar corrida"}</button>
      ) : (
        <div className="cc-options">
          {problem.options.map((option, index) => (
            <button key={option} onClick={() => choose(option)}>
              <small>Porta {index + 1}</small>
              <b>{option}</b>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
