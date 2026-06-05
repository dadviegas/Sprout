/* Academia dos Elementos — static game data + the derived economy.
 *
 * Phase 1 of docs/SPROUT_WORLD_ACADEMIA_DOS_ELEMENTOS.md: a 2D meta-game that
 * sits on top of the school content. The child picks an elemental hero, then
 * doing real lessons/tests earns XP, coins and energy and completes missions.
 *
 * The economy is DERIVED from the existing progress map (best state per lesson),
 * never from individual events — so it is idempotent: repeating a test never
 * farms more XP/coins. Mission rewards are the one exception, and those are
 * claimed exactly once (see world-state.ts). */
import type { IconName } from "@sprout/icons";
import type { ProgressMap, Achievement } from "../progress";
import { lessonMeta } from "../content/curriculum";

/* ---- elements ---------------------------------------------------------- */

export type ElementId = "fire" | "water" | "earth" | "air" | "light";

export interface Element {
  id: ElementId;
  /** UI label (pt-PT) */
  label: string;
  /** accent colour (hex — element art uses fixed fills, like the Diversão art) */
  color: string;
  /** the hero's starter companion */
  pet: string;
  /** one short, emotional line — the choice is about feel, not advantage */
  blurb: string;
}

export const ELEMENTS: Element[] = [
  { id: "fire", label: "Fogo", color: "#f2633b", pet: "Fagulha", blurb: "Corajoso e cheio de energia." },
  { id: "water", label: "Água", color: "#21a9d8", pet: "Gota", blurb: "Calmo e sabe adaptar-se." },
  { id: "earth", label: "Terra", color: "#5aa65c", pet: "Raiz", blurb: "Forte e protetor dos amigos." },
  { id: "air", label: "Ar", color: "#7fa9e0", pet: "Brisa", blurb: "Rápido, leve e livre." },
  { id: "light", label: "Luz", color: "#f0bd2e", pet: "Brilho", blurb: "Sábio e sempre radiante." },
];

export const elementById = new Map(ELEMENTS.map((e) => [e.id, e]));

/* ---- economy tuning ---------------------------------------------------- */

/** XP needed for each level — a flat curve keeps the level honest and simple. */
export const LEVEL_XP = 250;

export const levelOf = (xp: number) => Math.floor(xp / LEVEL_XP) + 1;
/** Fraction (0–1) of the way to the next level. */
export const levelPctOf = (xp: number) => (xp % LEVEL_XP) / LEVEL_XP;

/* ---- derived stats ----------------------------------------------------- */

export interface WorldStats {
  /** base XP earned from lesson/test progress (before mission bonuses) */
  baseXp: number;
  /** base coins earned from lesson/test progress (before mission bonuses) */
  baseCoins: number;
  /** how many final tests are completed */
  lessonsDone: number;
  /** how many tests reached the full 3 stars */
  threeStarCount: number;
  /** completed tests per school subject id */
  bySubject: Record<string, number>;
}

/** Read the school progress and turn it into the hero's base economy. Pure and
 *  idempotent: it only looks at the BEST state of each lesson, never at events. */
export function deriveStats(progress: ProgressMap): WorldStats {
  let baseXp = 0;
  let baseCoins = 0;
  let lessonsDone = 0;
  let threeStarCount = 0;
  const bySubject: Record<string, number> = {};

  for (const [id, p] of Object.entries(progress)) {
    if (p.done) {
      lessonsDone += 1;
      baseXp += 60 + 20 * p.bestStars;
      baseCoins += 12 + 4 * p.bestStars;
      if (p.bestStars >= 3) threeStarCount += 1;
      const m = lessonMeta.get(id);
      if (m) bySubject[m.subjectId] = (bySubject[m.subjectId] ?? 0) + 1;
    } else if (p.visited) {
      baseXp += 8; // a small nudge just for exploring a lesson
    }
  }

  return { baseXp, baseCoins, lessonsDone, threeStarCount, bySubject };
}

/** "Energia de hoje" — a friendly daily-activity meter (0–100), filled by tests
 *  completed today. It never gates study; it just rewards showing up. */
export function energyToday(achievements: Achievement[]): number {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const since = startOfDay.getTime();
  const todayCount = achievements.filter((a) => a.at >= since).length;
  return Math.min(100, todayCount * 25);
}

/* ---- missions ---------------------------------------------------------- */

export interface Mission {
  id: string;
  title: string;
  /** what the child has to do (pt-PT) */
  blurb: string;
  icon: IconName;
  target: number;
  /** current count toward the target, read from the derived stats */
  progress: (s: WorldStats) => number;
  reward: { xp: number; coins: number };
}

/* Starter missions, escalating so there is always a next goal in view. They are
 * completed automatically by real lesson/test progress; the bonus is claimed
 * once. Subject ids match curriculum.ts (matematica, portugues, …). */
export const MISSIONS: Mission[] = [
  { id: "first", title: "Primeiro herói", blurb: "Completa o teu primeiro teste final.", icon: "trophy", target: 1, progress: (s) => s.lessonsDone, reward: { xp: 80, coins: 20 } },
  { id: "math", title: "Mente matemática", blurb: "Completa um teste de Matemática.", icon: "math", target: 1, progress: (s) => s.bySubject["matematica"] ?? 0, reward: { xp: 60, coins: 15 } },
  { id: "pt", title: "Mestre das palavras", blurb: "Completa um teste de Português.", icon: "reading", target: 1, progress: (s) => s.bySubject["portugues"] ?? 0, reward: { xp: 60, coins: 15 } },
  { id: "edm", title: "Explorador do meio", blurb: "Completa um teste de Estudo do Meio.", icon: "world", target: 1, progress: (s) => s.bySubject["estudo-do-meio"] ?? 0, reward: { xp: 60, coins: 15 } },
  { id: "gold", title: "Estrela de ouro", blurb: "Ganha 3 estrelas num teste.", icon: "star", target: 1, progress: (s) => s.threeStarCount, reward: { xp: 100, coins: 30 } },
  { id: "trio", title: "Trio de saber", blurb: "Completa 3 testes finais.", icon: "sparkle", target: 3, progress: (s) => s.lessonsDone, reward: { xp: 120, coins: 40 } },
  { id: "guardian", title: "Guardião dedicado", blurb: "Completa 10 testes finais.", icon: "shield", target: 10, progress: (s) => s.lessonsDone, reward: { xp: 300, coins: 100 } },
];

export const missionById = new Map(MISSIONS.map((m) => [m.id, m]));
