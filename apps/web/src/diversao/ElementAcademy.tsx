import { useEffect, useMemo, useState } from "react";
import { Confetti, Speaker, speak } from "@sprout/ui";
import { allLessons } from "../content/curriculum";
import "./ElementAcademy.css";

/* Academia dos Elementos — Salas de Fuga (escape rooms).
 *
 * Five themed rooms. To escape a room the hero must open the three locks on its
 * door: each lock has a key hidden in the room. The child WALKS (‹ ›), JUMPS (⌃)
 * and INVESTIGATES (E) to find a key; finding it opens a learning challenge; a
 * right answer turns that lock. Three open locks → the door opens → escape to the
 * next room. Escape all five → free, with confetti.
 *
 * The heroes are the full-figure renders (transparent PNGs) shown WHOLE and
 * animated as one body (breathe / run / jump / happy / sad / power) — never cut
 * into parts. Every question and room intro is read-aloud via a speaker button;
 * speech only ever fires from a tap (answering, the speaker, hero select). */

type ElementId = "fire" | "water" | "earth" | "wind" | "light";
type Mood = "idle" | "run" | "happy" | "sad" | "power";
type Hero = { name: string; element: string; color: string; soft: string; image: string };
type Question = { prompt: string; answer: string; options: string[]; say: string; tag: string };
type Lock = { keyX: number; found: boolean; solved: boolean; question: Question };

const HEROES: Record<ElementId, Hero> = {
  fire: { name: "Faísca", element: "Fogo", color: "#ff6a2b", soft: "#ffe2d4", image: "/img/ea-hero-fire.png" },
  water: { name: "Maré", element: "Água", color: "#22a9dd", soft: "#d8f4ff", image: "/img/ea-hero-water.png" },
  earth: { name: "Raiz", element: "Terra", color: "#5aa84f", soft: "#e4f6dc", image: "/img/ea-hero-earth.png" },
  wind: { name: "Brisa", element: "Ar", color: "#7ec3e8", soft: "#ecf9ff", image: "/img/ea-hero-wind.png" },
  light: { name: "Luzia", element: "Luz", color: "#f2c230", soft: "#fff3c3", image: "/img/ea-hero-light.png" },
};

const HERO_IDS = Object.keys(HEROES) as ElementId[];

/* ---- question pools ---- */

const MAT: Question[] = [
  { tag: "Matemática", prompt: "8 + 7", answer: "15", options: ["13", "14", "15", "16"], say: "Quanto é oito mais sete?" },
  { tag: "Matemática", prompt: "6 × 4", answer: "24", options: ["20", "22", "24", "28"], say: "Quanto é seis vezes quatro?" },
  { tag: "Matemática", prompt: "36 − 9", answer: "27", options: ["25", "27", "29", "31"], say: "Quanto é trinta e seis menos nove?" },
  { tag: "Matemática", prompt: "5 × 5", answer: "25", options: ["20", "25", "30", "35"], say: "Quanto é cinco vezes cinco?" },
  { tag: "Matemática", prompt: "Metade de 18", answer: "9", options: ["6", "8", "9", "12"], say: "Qual é a metade de dezoito?" },
  { tag: "Matemática", prompt: "100 − 40", answer: "60", options: ["50", "60", "70", "40"], say: "Quanto é cem menos quarenta?" },
  { tag: "Matemática", prompt: "Dúzia tem...", answer: "12", options: ["6", "10", "12", "20"], say: "Quantos tem uma dúzia?" },
  { tag: "Matemática", prompt: "9 + 9", answer: "18", options: ["16", "17", "18", "19"], say: "Quanto é nove mais nove?" },
];

const PT: Question[] = [
  { tag: "Português", prompt: "O contrário de claro", answer: "escuro", options: ["escuro", "leve", "alto", "doce"], say: "Qual é o contrário de claro?" },
  { tag: "Português", prompt: "Correr é um...", answer: "verbo", options: ["nome", "verbo", "adjetivo", "artigo"], say: "Correr é um quê?" },
  { tag: "Português", prompt: "Plural de animal", answer: "animais", options: ["animalês", "animais", "animales", "animal"], say: "Qual é o plural de animal?" },
  { tag: "Português", prompt: "Feminino de rei", answer: "rainha", options: ["reia", "rainha", "reina", "reize"], say: "Qual é o feminino de rei?" },
  { tag: "Português", prompt: "Começa por vogal", answer: "abelha", options: ["gato", "abelha", "mesa", "pato"], say: "Qual destas palavras começa por vogal?" },
  { tag: "Português", prompt: "Quantas sílabas: bola", answer: "2", options: ["1", "2", "3", "4"], say: "Quantas sílabas tem a palavra bola?" },
  { tag: "Português", prompt: "Sinónimo de bonito", answer: "lindo", options: ["feio", "lindo", "triste", "rápido"], say: "Qual é um sinónimo de bonito?" },
];

const MUNDO: Question[] = [
  { tag: "O Mundo", prompt: "Planeta vermelho", answer: "Marte", options: ["Vénus", "Marte", "Júpiter", "Neptuno"], say: "Qual é o planeta vermelho?" },
  { tag: "O Mundo", prompt: "Capital de Portugal", answer: "Lisboa", options: ["Porto", "Coimbra", "Lisboa", "Faro"], say: "Qual é a capital de Portugal?" },
  { tag: "O Mundo", prompt: "As plantas precisam de...", answer: "luz", options: ["luz", "areia", "fogo", "plástico"], say: "De que precisam as plantas para crescer?" },
  { tag: "O Mundo", prompt: "A água do mar é...", answer: "salgada", options: ["doce", "salgada", "seca", "quente"], say: "Como é a água do mar?" },
  { tag: "O Mundo", prompt: "Quantas patas tem a aranha", answer: "8", options: ["6", "8", "4", "10"], say: "Quantas patas tem uma aranha?" },
  { tag: "O Mundo", prompt: "Os Açores ficam no...", answer: "Atlântico", options: ["deserto", "Atlântico", "Pacífico", "céu"], say: "Em que oceano ficam os Açores?" },
  { tag: "O Mundo", prompt: "O Sol é uma...", answer: "estrela", options: ["estrela", "lua", "rocha", "nuvem"], say: "O Sol é uma quê?" },
];

/* Site content — built from the real Sprout lessons, so new lessons join the
 * Academy automatically. "Em que sala vive esta lição?" */
const SITE: Question[] = (() => {
  const lessons = allLessons().filter(({ lesson }) => Boolean(lesson.body));
  const subjects = Array.from(new Set(lessons.map(({ subject }) => subject.label)));
  if (subjects.length < 2) return [];
  return lessons.slice(0, 40).map(({ subject, year, lesson }, i) => {
    const others = subjects.filter((s) => s !== subject.label);
    const distractors = [others[i % others.length], others[(i + 1) % others.length], others[(i + 2) % others.length]];
    const options = Array.from(new Set([subject.label, ...distractors])).slice(0, 4);
    while (options.length < 4 && options.length < subjects.length) options.push(subjects[options.length]);
    return {
      tag: `Sprout · ${year}.º ano`,
      prompt: `${lesson.emoji ?? "📘"} "${lesson.title}" — que sala?`,
      answer: subject.label,
      options,
      say: `Em que sala do Sprout vive a lição ${lesson.title}?`,
    };
  });
})();

const ALL: Question[] = [...MAT, ...PT, ...MUNDO, ...SITE];

type RoomDef = { realm: string; focus: string; icon: string; door: string; intro: string; pool: Question[]; theme: string };

const ROOMS: RoomDef[] = [
  { realm: "Vulcão Rubi", focus: "Matemática", icon: "➕", door: "Portão da Chama", theme: "fire", pool: MAT, intro: "Estás preso no Vulcão Rubi. Encontra as três chaves escondidas e resolve as contas para abrir o portão!" },
  { realm: "Lago Cristal", focus: "Português", icon: "📚", door: "Portão da Maré", theme: "water", pool: PT, intro: "A água sobe no Lago Cristal! Acha as três chaves e acerta nas palavras para escapares." },
  { realm: "Bosque Antigo", focus: "O Mundo", icon: "🌍", door: "Portão da Raiz", theme: "earth", pool: MUNDO, intro: "O Bosque Antigo fechou-se. Procura as chaves e responde sobre o mundo para a porta abrir." },
  { realm: "Torre do Vento", focus: "Explorar o Sprout", icon: "🧭", door: "Portão da Rajada", theme: "wind", pool: SITE.length >= 3 ? SITE : ALL, intro: "Na Torre do Vento, as perguntas vêm das lições do Sprout. Encontra as chaves e mostra o que aprendeste!" },
  { realm: "Observatório Solar", focus: "Desafio final", icon: "⭐", door: "Portão da Luz", theme: "light", pool: ALL, intro: "Última sala: o Observatório Solar. Tudo junto! Abre os três cadeados e foge da Academia." },
];

const KEY_X = [22, 52, 80];

function shuffle<T>(items: readonly T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildLocks(room: RoomDef): Lock[] {
  const picks = shuffle(room.pool).slice(0, 3);
  // pad if a pool is tiny (shouldn't happen, but stay safe)
  while (picks.length < 3) picks.push(ALL[Math.floor(Math.random() * ALL.length)]);
  return picks.map((question, i) => ({ keyX: KEY_X[i], found: false, solved: false, question }));
}

export function ElementAcademy() {
  const [heroId, setHeroId] = useState<ElementId>("fire");
  const [roomIdx, setRoomIdx] = useState(0);
  const [locks, setLocks] = useState<Lock[]>(() => buildLocks(ROOMS[0]));
  const [activeLock, setActiveLock] = useState<number | null>(null);
  const [heroX, setHeroX] = useState(8);
  const [facing, setFacing] = useState<"right" | "left">("right");
  const [jumping, setJumping] = useState(false);
  const [mood, setMood] = useState<Mood>("idle");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [escaped, setEscaped] = useState(false);

  const hero = HEROES[heroId];
  const room = ROOMS[roomIdx];
  const solvedCount = locks.filter((l) => l.solved).length;
  const doorOpen = solvedCount >= 3;
  const isLastRoom = roomIdx >= ROOMS.length - 1;
  const nearKey = locks.findIndex((l) => !l.found && Math.abs(l.keyX - heroX) <= 8);
  const active = activeLock != null ? locks[activeLock] : null;
  const options = useMemo(() => (active ? shuffle(active.question.options) : []), [active]);

  const flash = (next: Mood, ms = 620) => {
    setMood(next);
    window.setTimeout(() => setMood("idle"), ms);
  };

  const moveHero = (delta: number) => {
    if (doorOpen) return;
    setFacing(delta < 0 ? "left" : "right");
    setHeroX((v) => Math.min(92, Math.max(4, v + delta)));
    setMood("run");
    window.setTimeout(() => setMood("idle"), 320);
  };

  const jump = () => {
    if (jumping || doorOpen) return;
    setJumping(true);
    window.setTimeout(() => setJumping(false), 560);
  };

  const investigate = () => {
    if (nearKey < 0 || doorOpen) return;
    setLocks((ls) => ls.map((l, i) => (i === nearKey ? { ...l, found: true } : l)));
    setActiveLock(nearKey);
    flash("happy", 520);
    speak("Encontraste uma chave! Resolve o desafio para abrir o cadeado.");
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); moveHero(-7); }
      else if (event.key === "ArrowRight") { event.preventDefault(); moveHero(7); }
      else if (event.key === " " || event.key === "ArrowUp") { event.preventDefault(); jump(); }
      else if (event.key.toLowerCase() === "e") { event.preventDefault(); investigate(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nearKey, jumping, doorOpen]);

  const answer = (option: string) => {
    if (activeLock == null || !active) return;
    if (option === active.question.answer) {
      const bonus = Math.min(streak, 5);
      setScore((v) => v + 12 + bonus * 2);
      setStreak((v) => v + 1);
      setLocks((ls) => ls.map((l, i) => (i === activeLock ? { ...l, solved: true } : l)));
      setActiveLock(null);
      flash("power", 760);
      const left = 2 - solvedCount;
      speak(left > 0 ? `Cadeado aberto! Faltam ${left}.` : "Último cadeado! A porta está a abrir!");
    } else {
      setStreak(0);
      flash("sad");
      speak("Quase! Ouve a pergunta outra vez e tenta de novo.");
    }
  };

  const enterRoom = (idx: number) => {
    setRoomIdx(idx);
    setLocks(buildLocks(ROOMS[idx]));
    setActiveLock(null);
    setHeroX(8);
    setFacing("right");
    setMood("idle");
  };

  const leaveRoom = () => {
    if (isLastRoom) {
      setEscaped(true);
      flash("happy", 1200);
      speak("Conseguiste! Fugiste da Academia dos Elementos!");
      return;
    }
    flash("run", 700);
    speak("Porta aberta! Corre para a próxima sala!");
    window.setTimeout(() => enterRoom(roomIdx + 1), 360);
  };

  const restart = () => {
    setEscaped(false);
    setScore(0);
    setStreak(0);
    enterRoom(0);
  };

  return (
    <div
      className={`ea-game theme-${room.theme} mood-${mood} ${doorOpen ? "is-open" : ""}`}
      style={{ ["--ea" as string]: hero.color, ["--ea-soft" as string]: hero.soft }}
    >
      {escaped && <Confetti pieces={60} />}

      <header className="ea-head">
        <div className="ea-head__title">
          <p className="ps-kicker">Academia dos Elementos · Salas de Fuga</p>
          <h3>{escaped ? "Fugiste!" : doorOpen ? "Porta aberta!" : room.realm}</h3>
          <span className="ea-subtitle">{room.door} · {room.focus}</span>
        </div>
        <div className="ea-stats">
          <span>{score}<small>pontos</small></span>
          <span>{Math.min(roomIdx + 1, ROOMS.length)}/{ROOMS.length}<small>sala</small></span>
          <span>x{Math.max(1, streak)}<small>sequência</small></span>
        </div>
      </header>

      <div className="ea-rooms" aria-label="Salas">
        {ROOMS.map((r, i) => {
          const done = i < roomIdx || (i === roomIdx && doorOpen) || escaped;
          return (
            <span key={r.realm} className={`${i === roomIdx && !escaped ? "is-active" : ""} ${done ? "is-done" : ""}`}>
              <b>{done ? "✓" : i + 1}</b>
              <small>{r.realm}</small>
            </span>
          );
        })}
      </div>

      <div className="ea-intro">
        <span aria-hidden>{room.icon}</span>
        <b>{room.realm}</b>
        <small>{room.intro}</small>
        <Speaker text={room.intro} className="ea-intro__speak" label="Ouvir a sala" size={20} />
      </div>

      <div className="ea-heroes" role="list" aria-label="Escolhe o herói">
        {HERO_IDS.map((id) => {
          const h = HEROES[id];
          return (
            <button
              key={id}
              className={id === heroId ? "is-active" : ""}
              onClick={() => { setHeroId(id); flash("happy", 520); speak(`${h.name}, herói de ${h.element}.`); }}
              style={{ ["--card" as string]: h.color, ["--card-soft" as string]: h.soft }}
            >
              <span className="ea-thumb"><img src={h.image} alt="" /></span>
              <b>{h.name}</b>
              <small>{h.element}</small>
            </button>
          );
        })}
      </div>

      {/* ---- the room ---- */}
      <div className="ea-room">
        <div className="ea-room__far" aria-hidden>
          <span /><span /><span />
        </div>

        {/* hidden keys */}
        {locks.map((lock, i) =>
          lock.found ? null : (
            <button
              key={`key-${i}`}
              className={`ea-key ${nearKey === i ? "is-near" : ""}`}
              style={{ left: `${lock.keyX}%` }}
              onClick={nearKey === i ? investigate : undefined}
              aria-label={nearKey === i ? "Apanhar a chave" : "Chave escondida"}
            >
              🗝️
            </button>
          ),
        )}

        {/* the door with three locks */}
        <div className={`ea-door ${doorOpen ? "is-open" : ""}`} aria-label={`${room.door}, ${solvedCount} de 3 cadeados abertos`}>
          <div className="ea-door__leaf ea-door__leaf--l" />
          <div className="ea-door__leaf ea-door__leaf--r" />
          <div className="ea-door__locks">
            {locks.map((lock, i) => (
              <button
                key={`lock-${i}`}
                className={`ea-lock ${lock.solved ? "is-solved" : lock.found ? "is-found" : ""} ${activeLock === i ? "is-active" : ""}`}
                disabled={!lock.found || lock.solved}
                onClick={() => lock.found && !lock.solved && setActiveLock(i)}
                aria-label={lock.solved ? "Cadeado aberto" : lock.found ? "Resolver o desafio do cadeado" : "Cadeado fechado"}
              >
                {lock.solved ? "🔓" : lock.found ? "❓" : "🔒"}
              </button>
            ))}
          </div>
          {doorOpen && <span className="ea-door__glow" />}
        </div>

        {/* hero figure — whole, animated, never cut. Nested wrappers keep the
            three transforms (centering · jump · facing · mood) from colliding. */}
        <div className={`ea-figure ${jumping ? "is-jumping" : ""}`} style={{ left: `${heroX}%` }}>
          <span className="ea-figure__shadow" />
          <div className="ea-figure__hop">
            <div className="ea-figure__face" data-facing={facing}>
              <img className="ea-figure__img" src={hero.image} alt={`${hero.name}, herói de ${hero.element}`} />
            </div>
          </div>
        </div>

        <div className="ea-room__floor" aria-hidden />
      </div>

      {/* ---- controls ---- */}
      <div className="ea-pad" role="group" aria-label="Mover o herói">
        <button onClick={() => moveHero(-7)} aria-label="Andar para a esquerda" disabled={doorOpen}>‹</button>
        <button onClick={jump} aria-label="Saltar" disabled={doorOpen}>⌃</button>
        <button onClick={() => moveHero(7)} aria-label="Andar para a direita" disabled={doorOpen}>›</button>
        <button className="ea-pad__find" onClick={investigate} disabled={nearKey < 0 || doorOpen}>
          {nearKey >= 0 ? "Apanhar chave" : `${locks.filter((l) => l.found).length}/3 chaves`}
        </button>
      </div>

      {/* ---- challenge / escape ---- */}
      {escaped ? (
        <div className="ea-end">
          <strong>Fugiste de todas as salas da Academia! ⭐</strong>
          <button className="ea-cta" onClick={restart}>Jogar outra vez</button>
        </div>
      ) : doorOpen ? (
        <div className="ea-end">
          <strong>{isLastRoom ? "Os três cadeados abriram-se. A saída brilha!" : "Porta aberta! A próxima sala espera."}</strong>
          <button className="ea-cta" onClick={leaveRoom}>{isLastRoom ? "Fugir da Academia" : "Sair da sala"}</button>
        </div>
      ) : active ? (
        <div className="ea-challenge">
          <div className="ea-challenge__q">
            <small>{active.question.tag}</small>
            <div className="ea-challenge__row">
              <strong>{active.question.prompt}</strong>
              <Speaker text={active.question.say} className="ea-challenge__speak" label="Ouvir a pergunta" size={22} />
            </div>
          </div>
          <div className="ea-options">
            {options.map((option) => (
              <button key={option} onClick={() => answer(option)}>{option}</button>
            ))}
          </div>
          <button className="ea-skip" onClick={() => setActiveLock(null)}>Continuar a explorar</button>
        </div>
      ) : (
        <div className="ea-challenge ea-challenge--hint">
          <strong>{nearKey >= 0 ? "Carrega em «Apanhar chave»!" : "Anda pela sala (‹ ›) e procura as 3 chaves escondidas."}</strong>
          <small>{locks.filter((l) => l.solved).length}/3 cadeados abertos · {locks.filter((l) => l.found && !l.solved).length} chave(s) por resolver</small>
        </div>
      )}
    </div>
  );
}
