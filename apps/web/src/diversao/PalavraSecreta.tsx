import { useMemo, useState } from "react";
import { Confetti } from "@sprout/ui";

const WORDS = [
  { word: "BORBOLETA", hint: "Animal com asas coloridas." },
  { word: "PLANETA", hint: "A Terra é um." },
  { word: "BIBLIOTECA", hint: "Lugar com muitos livros." },
  { word: "FOTOSSINTESE", hint: "As plantas fazem isto com luz." },
  { word: "TESOURA", hint: "Serve para cortar papel." },
  { word: "ASTRONAUTA", hint: "Viaja pelo espaço." },
  { word: "CHOCOLATE", hint: "Doce castanho muito famoso." },
  { word: "ARCOIRIS", hint: "Aparece no céu com várias cores." },
] as const;

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX_MISSES = 6;

function pickWord(previous?: string) {
  const pool = WORDS.filter((item) => item.word !== previous);
  return pool[Math.floor(Math.random() * pool.length)] ?? WORDS[0];
}

export function PalavraSecreta() {
  const [round, setRound] = useState(() => pickWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const misses = guesses.filter((letter) => !round.word.includes(letter));
  const won = round.word.split("").every((letter) => guesses.includes(letter));
  const lost = misses.length >= MAX_MISSES;

  const masked = useMemo(
    () => round.word.split("").map((letter) => (guesses.includes(letter) || won || lost ? letter : "")),
    [guesses, lost, round.word, won],
  );

  const guess = (letter: string) => {
    if (won || lost || guesses.includes(letter)) return;
    setGuesses((current) => [...current, letter]);
  };

  const next = () => {
    setRound((current) => pickWord(current.word));
    setGuesses([]);
    setShowHint(false);
  };

  return (
    <div className="ps-game">
      {won && <Confetti pieces={32} />}
      <div className="ps-hero">
        <div>
          <p className="ps-kicker">A Palavra Secreta</p>
          <h3>{won ? "Descoberta!" : lost ? "Era esta" : "Adivinha letra a letra"}</h3>
        </div>
        <div className="ps-lives" aria-label={`${MAX_MISSES - misses.length} vidas`}>
          {Array.from({ length: MAX_MISSES }, (_, i) => (
            <span key={i} className={i < misses.length ? "is-lost" : ""} />
          ))}
        </div>
      </div>

      <div className="ps-word" aria-label="Palavra secreta">
        {masked.map((letter, index) => (
          <span className={letter ? "is-on" : ""} key={`${round.word}-${index}`}>
            {letter}
          </span>
        ))}
      </div>

      <div className="ps-hint">
        <button className="ps-hint__btn" onClick={() => setShowHint((v) => !v)}>
          {showHint ? "Esconder dica" : "Mostrar dica"}
        </button>
        <span className={showHint ? "is-open" : ""}>{showHint ? round.hint : "Dica escondida"}</span>
      </div>

      <div className="ps-keyboard" aria-label="Letras">
        {ALPHABET.map((letter) => (
          <button
            className={guesses.includes(letter) ? (round.word.includes(letter) ? "is-good" : "is-bad") : ""}
            disabled={won || lost || guesses.includes(letter)}
            key={letter}
            onClick={() => guess(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="ps-actions">
        <button className="stop-main" onClick={next}>Nova palavra</button>
      </div>
    </div>
  );
}
