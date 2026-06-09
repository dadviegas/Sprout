import { useMemo, useState } from "react";
import { Confetti } from "@sprout/ui";

const SIZE = 10;
const THEMES = [
  { id: "natureza", label: "Natureza", words: ["PLANTA", "RIO", "FLOR", "NUVEM", "PEDRA", "SOL", "FOLHA", "VENTO", "MAR", "TERRA", "RAIZ", "BOSQUE"] },
  { id: "escola", label: "Escola", words: ["LIVRO", "LAPIS", "REGUA", "CONTA", "TEXTO", "MAPA", "CADERNO", "AULA", "PROVA", "QUADRO", "LEITURA", "ESCOLA"] },
  { id: "espaco", label: "Espaço", words: ["LUA", "MARTE", "COMETA", "ORBITA", "ESTRELA", "FOGUETAO", "SOL", "SATURNO", "PLANETA", "GALAXIA", "ROBO", "METEORO"] },
  { id: "mistura", label: "Mistura", words: ["BOLA", "PATO", "CASA", "MUSICA", "PONTE", "GELADO", "TESOURO", "JANELA", "CASTELO", "AMIGO", "FESTA", "DRAGAO"] },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];
type Pos = { r: number; c: number };
type PlacedWord = { word: string; cells: string[] };

const FILL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIRECTIONS = [
  { dr: 0, dc: 1 },
  { dr: 1, dc: 0 },
  { dr: 1, dc: 1 },
  { dr: -1, dc: 1 },
];

function keyOf(pos: Pos) {
  return `${pos.r}-${pos.c}`;
}

function shuffle<T>(items: readonly T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makeBoard(themeId: ThemeId) {
  const theme = THEMES.find((item) => item.id === themeId) ?? THEMES[0];
  const grid = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => ""));
  const placed: PlacedWord[] = [];
  const words = shuffle(theme.words).slice(0, 6);

  words.forEach((word, wordIndex) => {
    const dirs = [...DIRECTIONS].sort((a, b) => ((wordIndex + a.dr + a.dc) % 3) - ((wordIndex + b.dr + b.dc) % 3));
    for (let attempt = 0; attempt < 90; attempt++) {
      const dir = dirs[attempt % dirs.length];
      const r = Math.floor(Math.random() * SIZE);
      const c = Math.floor(Math.random() * SIZE);
      const endR = r + dir.dr * (word.length - 1);
      const endC = c + dir.dc * (word.length - 1);
      if (endR < 0 || endR >= SIZE || endC < 0 || endC >= SIZE) continue;

      const cells: Pos[] = [];
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const pos = { r: r + dir.dr * i, c: c + dir.dc * i };
        const current = grid[pos.r][pos.c];
        if (current && current !== word[i]) ok = false;
        cells.push(pos);
      }
      if (!ok) continue;
      cells.forEach((pos, i) => {
        grid[pos.r][pos.c] = word[i];
      });
      placed.push({ word, cells: cells.map(keyOf) });
      return;
    }
  });

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!grid[r][c]) grid[r][c] = FILL[(r * 7 + c * 11 + Math.floor(Math.random() * FILL.length)) % FILL.length];
    }
  }
  return { grid, placed, theme };
}

function selectedWord(selection: string[], grid: string[][]) {
  return selection.map((key) => {
    const [r, c] = key.split("-").map(Number);
    return grid[r]?.[c] ?? "";
  }).join("");
}

export function CacaPalavras() {
  const [themeId, setThemeId] = useState<ThemeId>("natureza");
  const [seed, setSeed] = useState(1);
  const [selection, setSelection] = useState<string[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const board = useMemo(() => makeBoard(themeId), [seed, themeId]);
  const done = found.length === board.placed.length;
  const current = selectedWord(selection, board.grid);

  const resetTheme = (id: ThemeId) => {
    setThemeId(id);
    setSeed((s) => s + 1);
    setSelection([]);
    setFound([]);
  };

  const randomTheme = () => {
    const next = THEMES[Math.floor(Math.random() * THEMES.length)] ?? THEMES[0];
    resetTheme(next.id);
  };

  const tapCell = (key: string) => {
    if (found.some((word) => board.placed.find((p) => p.word === word)?.cells.includes(key))) return;
    const next = selection.includes(key) ? selection.filter((item) => item !== key) : [...selection, key];
    const word = selectedWord(next, board.grid);
    const reverse = word.split("").reverse().join("");
    const match = board.placed.find((item) => !found.includes(item.word) && (item.word === word || item.word === reverse));
    if (match) {
      setFound((currentFound) => [...currentFound, match.word]);
      setSelection([]);
    } else {
      setSelection(next.slice(-12));
    }
  };

  const newBoard = () => {
    setSeed((s) => s + 1);
    setSelection([]);
    setFound([]);
  };

  return (
    <div className="cp-game">
      {done && <Confetti pieces={36} />}
      <div className="cp-top">
        <div>
          <p className="ps-kicker">Caça-Palavras</p>
          <h3>{done ? "Tudo encontrado!" : board.theme.label}</h3>
        </div>
        <div className="cp-tabs" role="tablist" aria-label="Tema">
          {THEMES.map((theme) => (
            <button className={theme.id === themeId ? "is-active" : ""} key={theme.id} onClick={() => resetTheme(theme.id)}>
              {theme.label}
            </button>
          ))}
          <button onClick={randomTheme}>Aleatório</button>
        </div>
      </div>

      <div className="cp-layout">
        <div className="cp-board" style={{ ["--n" as string]: SIZE }}>
          {board.grid.map((row, r) =>
            row.map((letter, c) => {
              const key = `${r}-${c}`;
              const isFound = found.some((word) => board.placed.find((p) => p.word === word)?.cells.includes(key));
              return (
                <button
                  className={`${selection.includes(key) ? "is-sel" : ""} ${isFound ? "is-found" : ""}`}
                  key={key}
                  onClick={() => tapCell(key)}
                >
                  {letter}
                </button>
              );
            }),
          )}
        </div>

        <div className="cp-side">
          <div className="cp-current">{current || "Toca nas letras por ordem"}</div>
          <div className="cp-words">
            {board.placed.map((item) => (
              <span className={found.includes(item.word) ? "is-found" : ""} key={item.word}>{item.word}</span>
            ))}
          </div>
          <button className="stop-main" onClick={newBoard}>Nova grelha aleatória</button>
        </div>
      </div>
    </div>
  );
}
