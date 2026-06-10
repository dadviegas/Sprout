import { useEffect, useMemo, useState } from "react";
import { Confetti } from "@sprout/ui";
import { allLessons } from "../content/curriculum";
import "./ElementAcademy.css";

type ElementId = "fire" | "water" | "earth" | "wind" | "light";
type Question = { prompt: string; answer: string; options: string[]; type: "mat" | "pt" | "mundo" | "sprout"; source?: string };
type Level = { realm: string; gate: string; enemy: string; hp: number; focus: string; lesson?: string; emoji?: string };
type Mood = "ready" | "run" | "happy" | "sad" | "power";
type Hero = { name: string; element: string; color: string; soft: string; power: string; glyph: string; image: string };
type Clue = { id: string; x: number; label: string; hint: string; icon: string };

const HEROES: Record<ElementId, Hero> = {
  fire: { name: "Faísca", element: "Fogo", color: "#ff6a2b", soft: "#ffe2d4", power: "Explosão", glyph: "F", image: "/img/ea-hero-fire.png" },
  water: { name: "Maré", element: "Água", color: "#22a9dd", soft: "#d8f4ff", power: "Onda", glyph: "A", image: "/img/ea-hero-water.png" },
  earth: { name: "Raiz", element: "Terra", color: "#5aa84f", soft: "#e4f6dc", power: "Escudo", glyph: "T", image: "/img/ea-hero-earth.png" },
  wind: { name: "Brisa", element: "Ar", color: "#9bd7ef", soft: "#ecf9ff", power: "Rajada", glyph: "R", image: "/img/ea-hero-wind.png" },
  light: { name: "Luzia", element: "Luz", color: "#f2c230", soft: "#fff3c3", power: "Estrela", glyph: "L", image: "/img/ea-hero-light.png" },
};

const CONTENT_LESSONS = allLessons()
  .filter(({ lesson }) => Boolean(lesson.body))
  .map(({ subject, year, lesson }) => ({
    subject: subject.label,
    year,
    title: lesson.title,
    emoji: lesson.emoji,
  }));

const SUBJECT_LABELS = Array.from(new Set(CONTENT_LESSONS.map((item) => item.subject)));

const CONTENT_QUESTIONS: Question[] = CONTENT_LESSONS.map((item, index) => {
  const options = Array.from(new Set([
    item.subject,
    ...SUBJECT_LABELS.filter((label) => label !== item.subject).slice(index % Math.max(1, SUBJECT_LABELS.length - 1), index % Math.max(1, SUBJECT_LABELS.length - 1) + 3),
    ...SUBJECT_LABELS.filter((label) => label !== item.subject).slice(0, 3),
  ])).slice(0, 4);

  return {
    type: "sprout",
    prompt: `${item.emoji} "${item.title}" pertence a que sala?`,
    answer: item.subject,
    options: options.length >= 4 ? options : [item.subject, "Matemática", "Português", "O Mundo"].slice(0, 4),
    source: `${item.subject} · ${item.year}.º ano`,
  };
});

const BASE_QUESTIONS: Question[] = [
  { type: "mat", prompt: "8 + 7", answer: "15", options: ["13", "14", "15", "16"] },
  { type: "mat", prompt: "6 x 4", answer: "24", options: ["20", "22", "24", "28"] },
  { type: "mat", prompt: "36 - 9", answer: "27", options: ["25", "27", "29", "31"] },
  { type: "pt", prompt: "O contrário de claro", answer: "escuro", options: ["escuro", "leve", "alto", "doce"] },
  { type: "pt", prompt: "Correr é um...", answer: "verbo", options: ["nome", "verbo", "adjetivo", "artigo"] },
  { type: "pt", prompt: "Plural de animal", answer: "animais", options: ["animalês", "animais", "animales", "animal"] },
  { type: "mundo", prompt: "Planeta vermelho", answer: "Marte", options: ["Vénus", "Marte", "Júpiter", "Neptuno"] },
  { type: "mundo", prompt: "Capital de Portugal", answer: "Lisboa", options: ["Porto", "Coimbra", "Lisboa", "Faro"] },
  { type: "mundo", prompt: "As plantas precisam de...", answer: "luz", options: ["luz", "areia", "fogo", "plástico"] },
];

const QUESTIONS: Question[] = [...BASE_QUESTIONS, ...CONTENT_QUESTIONS];

const LEVELS: Level[] = [
  { realm: "Vulcão Rubi", gate: "Portão da Chama", enemy: "Brasa Sombria", hp: 90, focus: "Matemática", lesson: "Números, tabuadas e contas rápidas", emoji: "➕" },
  { realm: "Lago Cristal", gate: "Portão da Maré", enemy: "Névoa Azul", hp: 115, focus: "Português", lesson: "Palavras, plurais, verbos e leitura", emoji: "📚" },
  { realm: "Bosque Antigo", gate: "Portão da Raiz", enemy: "Golem dos Erros", hp: 140, focus: "Explorar o site", lesson: "A Academy também pergunta sobre lições reais do Sprout", emoji: "🧭" },
  { realm: "Torre do Vento", gate: "Portão da Rajada", enemy: "Guardião do Ar", hp: 165, focus: "Mistura", lesson: "Atlas, cores, países, dicionário e ciências", emoji: "🌍" },
  { realm: "Observatório Solar", gate: "Portão da Luz", enemy: "Eclipse Final", hp: 210, focus: "Boss", lesson: "Tudo junto: quando há novas lições, podem entrar no jogo", emoji: "⭐" },
];

const CLUES: Clue[] = [
  { id: "mapa", x: 18, label: "Mapa", hint: "Procura a sala certa antes do portal acordar.", icon: "🗺️" },
  { id: "livro", x: 42, label: "Livro", hint: "As perguntas podem vir das lições reais do Sprout.", icon: "📖" },
  { id: "cristal", x: 66, label: "Cristal", hint: "Sequência aumenta o dano. Energia cheia liberta o poder.", icon: "💎" },
  { id: "portal", x: 86, label: "Portal", hint: "Quando o inimigo cair, avanças para uma nova zona.", icon: "🌀" },
];

function HeroSprite({ hero, compact = false }: { hero: Hero; compact?: boolean }) {
  return (
    <span
      className={compact ? "ea-sprite ea-sprite--mini" : "ea-sprite"}
      role="img"
      aria-label={`${hero.name}, herói de ${hero.element}`}
      style={{
        ["--sprite-image" as string]: `url("${hero.image}")`,
      }}
    >
      <span className="ea-sprite__base" />
      {!compact && <span className="ea-sprite__shine" />}
      <i>{hero.glyph}</i>
    </span>
  );
}

function pickQuestion(previous?: string) {
  const pool = QUESTIONS.filter((q) => q.prompt !== previous);
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

function levelOf(stage: number) {
  return LEVELS[Math.min(stage - 1, LEVELS.length - 1)] ?? LEVELS[0];
}

function nextEnemy(stage: number) {
  const level = levelOf(stage);
  return { name: level.enemy, hp: level.hp };
}

export function ElementAcademy() {
  const [heroId, setHeroId] = useState<ElementId>("fire");
  const [stage, setStage] = useState(1);
  const [enemy, setEnemy] = useState(() => nextEnemy(1));
  const [hp, setHp] = useState(enemy.hp);
  const [energy, setEnergy] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [question, setQuestion] = useState(() => pickQuestion());
  const [flash, setFlash] = useState<"hit" | "miss" | "power" | null>(null);
  const [mood, setMood] = useState<Mood>("ready");
  const [heroX, setHeroX] = useState(12);
  const [jumping, setJumping] = useState(false);
  const [foundClues, setFoundClues] = useState<string[]>([]);
  const [lastClue, setLastClue] = useState<Clue | null>(null);
  const hero = HEROES[heroId];
  const options = useMemo(() => shuffle(question.options), [question]);
  const wonGate = hp <= 0;
  const academyWon = stage >= LEVELS.length && wonGate;
  const level = levelOf(stage);
  const hpPct = Math.max(0, (hp / enemy.hp) * 100);
  const energyReady = energy >= 100;
  const activeClue = CLUES.find((clue) => Math.abs(clue.x - heroX) <= 7 && !foundClues.includes(`${stage}:${clue.id}`));

  const moveHero = (delta: number) => {
    if (wonGate) return;
    setHeroX((value) => Math.min(92, Math.max(4, value + delta)));
    setMood("run");
    window.setTimeout(() => setMood("ready"), 360);
  };

  const jump = () => {
    if (jumping || wonGate) return;
    setJumping(true);
    setMood("run");
    window.setTimeout(() => setJumping(false), 520);
    window.setTimeout(() => setMood("ready"), 560);
  };

  const collectClue = () => {
    if (!activeClue) return;
    setFoundClues((items) => [...items, `${stage}:${activeClue.id}`]);
    setLastClue(activeClue);
    setEnergy((value) => Math.min(100, value + 16));
    setScore((value) => value + 6);
    setMood("happy");
    window.setTimeout(() => setMood("ready"), 700);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveHero(-7);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveHero(7);
      }
      if (event.key === " " || event.key === "ArrowUp") {
        event.preventDefault();
        jump();
      }
      if (event.key.toLowerCase() === "e") {
        event.preventDefault();
        collectClue();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeClue, jumping, stage, wonGate]);

  const advanceGate = () => {
    const nextStage = Math.min(stage + 1, LEVELS.length);
    const next = nextEnemy(nextStage);
    setStage(nextStage);
    setEnemy(next);
    setHp(next.hp);
    setEnergy(0);
    setStreak(0);
    setQuestion((q) => pickQuestion(q.prompt));
    setFlash(null);
    setMood("ready");
    setHeroX(12);
    setLastClue(null);
  };

  const restart = () => {
    const first = nextEnemy(1);
    setStage(1);
    setEnemy(first);
    setHp(first.hp);
    setEnergy(0);
    setScore(0);
    setStreak(0);
    setQuestion(pickQuestion());
    setFlash(null);
    setMood("ready");
    setHeroX(12);
    setFoundClues([]);
    setLastClue(null);
  };

  const answer = (option: string) => {
    if (wonGate) return;
    if (option === question.answer) {
      const bonus = Math.min(streak, 5) * 3;
      const damage = 18 + bonus + Math.floor(stage / 2);
      setHp((value) => Math.max(0, value - damage));
      setEnergy((value) => Math.min(100, value + 28));
      setScore((value) => value + 10 + bonus);
      setStreak((value) => value + 1);
      setFlash("hit");
      setMood("run");
      window.setTimeout(() => setMood("happy"), 220);
    } else {
      setEnergy((value) => Math.max(0, value - 15));
      setStreak(0);
      setFlash("miss");
      setMood("sad");
    }
    setQuestion((q) => pickQuestion(q.prompt));
    window.setTimeout(() => {
      setFlash(null);
      setMood("ready");
    }, 620);
  };

  const special = () => {
    if (!energyReady || wonGate) return;
    setHp((value) => Math.max(0, value - (52 + stage * 6)));
    setEnergy(0);
    setScore((value) => value + 35);
    setFlash("power");
    setMood("power");
    window.setTimeout(() => {
      setFlash(null);
      setMood("happy");
    }, 520);
    window.setTimeout(() => setMood("ready"), 900);
  };

  return (
    <div className={`ea-game is-${heroId} is-mood-${mood} ${flash ? `is-${flash}` : ""}`} style={{ ["--ea" as string]: hero.color, ["--ea-soft" as string]: hero.soft }}>
      {academyWon && <Confetti pieces={54} />}
      <div className="ea-head">
        <div>
          <p className="ps-kicker">Element Academy</p>
          <h3>{academyWon ? "Academia salva!" : wonGate ? "Portal aberto!" : level.gate}</h3>
          <span className="ea-subtitle">{level.realm} · {level.focus}</span>
        </div>
        <div className="ea-stats">
          <span>{score}<small>pontos</small></span>
          <span>{stage}/{LEVELS.length}<small>nível</small></span>
          <span>x{Math.max(1, streak)}<small>sequência</small></span>
        </div>
      </div>

      <div className="ea-levels" aria-label="Níveis">
        {LEVELS.map((item, index) => {
          const n = index + 1;
          const done = n < stage || (n === stage && wonGate);
          return (
            <span className={`${n === stage ? "is-active" : ""} ${done ? "is-done" : ""}`} key={item.realm}>
              <b>{n}</b>
              <small>{item.realm}</small>
            </span>
          );
        })}
      </div>

      <div className="ea-lesson">
        <span>{level.emoji}</span>
        <b>{level.focus}</b>
        <small>{level.lesson}</small>
      </div>

      <div className="ea-heroes" role="list" aria-label="Heróis">
        {(Object.keys(HEROES) as ElementId[]).map((id) => {
          const h = HEROES[id];
          return (
            <button
              className={id === heroId ? "is-active" : ""}
              key={id}
              onClick={() => {
                setHeroId(id);
                setMood("happy");
                window.setTimeout(() => setMood("ready"), 520);
              }}
              style={{ ["--ea-card" as string]: h.color, ["--ea-card-soft" as string]: h.soft }}
            >
              <span className="ea-hero-thumb"><HeroSprite hero={h} compact /></span>
              <b>{h.name}</b>
              <small>{h.element}</small>
            </button>
          );
        })}
      </div>

      <div className="ea-explorer">
        <div className="ea-explorer__sky">
          <span />
          <span />
          <span />
        </div>
        <div className="ea-explorer__track">
          {CLUES.map((clue) => {
            const found = foundClues.includes(`${stage}:${clue.id}`);
            const near = activeClue?.id === clue.id;
            return (
              <button
                className={`ea-clue ${found ? "is-found" : ""} ${near ? "is-near" : ""}`}
                disabled={found}
                key={clue.id}
                onClick={near ? collectClue : undefined}
                style={{ left: `${clue.x}%` }}
                title={clue.label}
              >
                <span>{found ? "✓" : clue.icon}</span>
              </button>
            );
          })}
          <div className={`ea-runner ${jumping ? "is-jumping" : ""}`} style={{ left: `${heroX}%` }}>
            <HeroSprite hero={hero} />
          </div>
          <div className="ea-explorer__ground" />
        </div>
        <div className="ea-explorer__panel">
          <button onClick={() => moveHero(-7)} aria-label="Andar para a esquerda">‹</button>
          <button onClick={jump} aria-label="Saltar">⌃</button>
          <button onClick={() => moveHero(7)} aria-label="Andar para a direita">›</button>
          <strong>{activeClue ? "Pista encontrada" : lastClue ? lastClue.hint : "Explora a academia"}</strong>
          <button className="ea-investigate" disabled={!activeClue} onClick={collectClue}>{activeClue ? "Investigar" : `${foundClues.filter((id) => id.startsWith(`${stage}:`)).length}/${CLUES.length} pistas`}</button>
        </div>
      </div>

      <div className="ea-arena">
        <div className="ea-hero">
          <HeroSprite hero={hero} />
          <div className="ea-orb" />
          <div className="ea-pet" />
        </div>

        <div className="ea-vs">
          <span>VS</span>
          <i className={energyReady ? "is-ready" : ""} style={{ width: `${energy}%` }} />
          <button disabled={!energyReady || wonGate} onClick={special}>{energyReady ? hero.power : `${energy}% energia`}</button>
        </div>

        <div className="ea-enemy">
          <div className="ea-enemy__core" />
          <span className="ea-enemy__name">{enemy.name}</span>
          <strong>{hp}/{enemy.hp}</strong>
          <i style={{ width: `${hpPct}%` }} />
        </div>
      </div>

      {wonGate ? (
        <div className="ea-clear">
          <strong>{academyWon ? "Todos os portais fechados." : "Elemento carregado."}</strong>
          <button className="stop-main" onClick={academyWon ? restart : advanceGate}>{academyWon ? "Jogar outra vez" : "Próximo portal"}</button>
        </div>
      ) : (
        <div className="ea-question">
          <div className="ea-prompt">
            <small>{question.source ?? (question.type === "mat" ? "Matemática" : question.type === "pt" ? "Português" : question.type === "sprout" ? "Sprout Academy" : "Mundo")}</small>
            <strong>{question.prompt}</strong>
          </div>
          <div className="ea-options">
            {options.map((option) => (
              <button key={option} onClick={() => answer(option)}>{option}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
