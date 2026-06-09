import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "treino" | "relogio";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter((l) => !"KWY".includes(l));
const ROUND_SECONDS = 90;

const CATEGORIES = [
  { id: "nome", label: "Nome", tag: "NO" },
  { id: "animal", label: "Animal", tag: "AN" },
  { id: "comida", label: "Comida", tag: "CO" },
  { id: "lugar", label: "País ou cidade", tag: "LU" },
  { id: "objeto", label: "Objeto", tag: "OB" },
  { id: "profissao", label: "Profissão", tag: "PR" },
  { id: "dificil", label: "Palavra difícil", tag: "DI" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const EXAMPLES: Record<CategoryId, string[]> = {
  nome: ["Ana", "Bruno", "Carla", "Diogo", "Eva", "Francisco", "Gonçalo", "Helena", "Inês", "Joana", "Leonor", "Marta", "Nuno", "Olívia", "Pedro", "Quim", "Rita", "Sofia", "Tiago", "Úrsula", "Vera", "Xavier", "Zé"],
  animal: ["Anta", "Borboleta", "Cavalo", "Doninha", "Elefante", "Foca", "Gato", "Hamster", "Iguana", "Jaguar", "Lagarto", "Melro", "Naja", "Ovelha", "Pato", "Quati", "Rato", "Sapo", "Tubarão", "Urso", "Vaca", "Xaréu", "Zebra"],
  comida: ["Arroz", "Banana", "Cenoura", "Dourada", "Ervilha", "Feijão", "Gelado", "Hambúrguer", "Iogurte", "Jardineira", "Laranja", "Massa", "Nabo", "Omelete", "Pão", "Queijo", "Rissóis", "Sopa", "Tomate", "Uva", "Vitela", "Xarope", "Zarzuela"],
  lugar: ["Aveiro", "Braga", "Coimbra", "Douro", "Évora", "Faro", "Guarda", "Horta", "Ílhavo", "Japão", "Lisboa", "Madrid", "Nazaré", "Odivelas", "Porto", "Quarteira", "Roma", "Setúbal", "Tavira", "Uruguai", "Viseu", "Xangai", "Zambujeira"],
  objeto: ["Anel", "Bola", "Caderno", "Dado", "Estojo", "Flauta", "Garrafa", "Helicóptero", "Íman", "Janela", "Livro", "Mochila", "Novelo", "Óculos", "Pincel", "Quadro", "Régua", "Saco", "Tesoura", "Urna", "Vassoura", "Xilofone", "Zarabatana"],
  profissao: ["Arquiteto", "Bombeiro", "Cozinheira", "Dentista", "Engenheira", "Florista", "Guarda", "Historiador", "Ilustradora", "Jardineiro", "Lojista", "Médica", "Nutricionista", "Oleiro", "Professor", "Químico", "Rececionista", "Sapateiro", "Treinadora", "Urbanista", "Veterinário", "Xilógrafo", "Zelador"],
  dificil: ["Asteroide", "Biodiversidade", "Constituição", "Democracia", "Ecossistema", "Fotossíntese", "Geometria", "Hipérbole", "Invertebrado", "Justaposição", "Longitude", "Metamorfose", "Nutriente", "Orquestra", "Paralelogramo", "Quociente", "Rotação", "Simetria", "Translação", "Universo", "Velocidade", "Xenofobia", "Zigurate"],
};

const emptyReveal = () => CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: false }), {} as Record<CategoryId, boolean>);

function stripMarks(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toUpperCase();
}

function drawLetter(prev?: string) {
  const pool = LETTERS.filter((letter) => letter !== prev);
  return pool[Math.floor(Math.random() * pool.length)] ?? "S";
}

function exampleFor(category: CategoryId, letter: string) {
  return EXAMPLES[category].find((word) => stripMarks(word).startsWith(letter)) ?? `Uma palavra com ${letter}`;
}

export function Stop() {
  const [mode, setMode] = useState<Mode>("relogio");
  const [letter, setLetter] = useState(() => drawLetter());
  const [rotation, setRotation] = useState(() => -LETTERS.indexOf(letter) * (360 / LETTERS.length));
  const [spinning, setSpinning] = useState(false);
  const [revealed, setRevealed] = useState<Record<CategoryId, boolean>>(() => emptyReveal());
  const [seconds, setSeconds] = useState(ROUND_SECONDS);
  const [running, setRunning] = useState(false);
  const settleTimer = useRef<number | null>(null);
  const spinCount = useRef(1);

  useEffect(() => {
    if (!running || mode !== "relogio") return;
    const tick = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(tick);
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(tick);
  }, [mode, running]);

  useEffect(
    () => () => {
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
    },
    [],
  );

  const examples = useMemo(
    () => CATEGORIES.map((cat) => ({ ...cat, example: exampleFor(cat.id, letter) })),
    [letter],
  );

  const newRound = () => {
    if (spinning) return;
    const finalLetter = drawLetter(letter);
    const finalIndex = LETTERS.indexOf(finalLetter);
    const step = 360 / LETTERS.length;
    setSpinning(true);
    setRunning(false);
    setRevealed(emptyReveal());
    setSeconds(ROUND_SECONDS);
    spinCount.current += 1;
    setRotation(spinCount.current * 720 - finalIndex * step);
    settleTimer.current = window.setTimeout(() => {
      setLetter(finalLetter);
      setSpinning(false);
      if (mode === "relogio") setRunning(true);
    }, 1650);
  };

  const toggleExample = (id: CategoryId) => {
    setRevealed((current) => ({ ...current, [id]: !current[id] }));
  };

  const timeLabel = mode === "treino" ? "Sem tempo" : `${seconds}s`;

  return (
    <div className={`stop-game ${spinning ? "is-spinning" : ""}`}>
      <div className="stop-top">
        <button className="stop-wheel-stage" onClick={newRound} aria-label="Sortear uma letra">
          <span className="stop-pointer" aria-hidden />
          <span className="stop-wheel" style={{ ["--rot" as string]: `${rotation}deg` }}>
            {LETTERS.map((item, index) => (
              <span className="stop-wheel__letter" key={item} style={{ ["--a" as string]: `${index * (360 / LETTERS.length)}deg` }}>
                {item}
              </span>
            ))}
          </span>
          <span className="stop-wheel__hub">
            <small>Letra</small>
            <strong>{spinning ? "..." : letter}</strong>
          </span>
        </button>

        <div className="stop-panel">
          <div className="stop-panel__head">
            <div>
              <p className="stop-kicker">Joga no papel</p>
              <h3>Stop!</h3>
            </div>
            <div className="stop-mode" role="group" aria-label="Modo de jogo">
              <button className={`stop-chip ${mode === "relogio" ? "is-active" : ""}`} onClick={() => { setMode("relogio"); setSeconds(ROUND_SECONDS); }}>
                Relógio
              </button>
              <button className={`stop-chip ${mode === "treino" ? "is-active" : ""}`} onClick={() => { setMode("treino"); setRunning(false); }}>
                Treino
              </button>
            </div>
          </div>

          <div className="stop-meters" aria-live="polite">
            <span><b>{timeLabel}</b><small>tempo</small></span>
            <span><b>{letter}</b><small>letra final</small></span>
            <span><b>{examples.length}</b><small>categorias</small></span>
          </div>

          <div className="stop-actions stop-actions--panel">
            <button className="stop-main" onClick={newRound}>{spinning ? "A sortear" : "Sortear letra"}</button>
            {mode === "relogio" && (
              <button className="stop-secondary" onClick={() => setRunning((current) => !current)} disabled={spinning || seconds === 0}>
                {running ? "Pausar" : "Começar relógio"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="stop-help-grid">
        {examples.map((cat) => (
          <button className={`stop-help ${revealed[cat.id] ? "is-open" : ""}`} key={cat.id} onClick={() => toggleExample(cat.id)}>
            <span className="stop-help__tag">{cat.tag}</span>
            <span className="stop-help__label">{cat.label}</span>
            <span className="stop-help__example">
              {revealed[cat.id] ? cat.example : "Exemplo escondido"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
