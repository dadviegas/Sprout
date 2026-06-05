/* Academia dos Elementos — the playable 2D scene's layout: world size, where the
 * avatar starts, and the interactive objects (the Mestre, the study portal, the
 * mission board, and the still-locked pets nest and house).
 *
 * Coordinates are in "world pixels" on a fixed rectangle; the camera (in
 * WorldScene) centres on the avatar and clamps to these bounds. Geography is the
 * single source of truth here, like `compass`/`mapapt`. */
import type { IconName } from "@sprout/icons";
import type { WorldStats } from "./world-data";

/** The fixed play area. Larger than most viewports, so the camera has to follow. */
export const WORLD = { width: 1040, height: 720 };

/** Where the hero spawns (centre-ish, below the buildings). */
export const AVATAR_START = { x: 520, y: 470 };

/** Avatar half-size — used to keep it inside the world bounds. */
export const AVATAR_RADIUS = 26;

/** Movement speed in world px per frame (~60fps). */
export const AVATAR_SPEED = 3.4;

/** How close (world px, centre-to-centre) the hero must be to interact. */
export const INTERACT_RADIUS = 88;

export type ObjectKind = "mestre" | "study" | "missions" | "pets" | "house" | "dragon";

export interface WorldObject {
  id: string;
  kind: ObjectKind;
  /** centre position in world coordinates */
  x: number;
  y: number;
  /** short name shown under the object */
  label: string;
  /** the interaction verb shown on the action button when nearby */
  prompt: string;
  icon: IconName;
  /** accent colour (a token reference) */
  color: string;
  /** read-aloud / dialogue line */
  say: string;
  /** drawn as a character sprite (no tinted disc) instead of an icon */
  sprite?: "master" | "dragon";
  /** if set, the object is locked until this many final tests are done */
  unlockTests?: number;
  /** locked with no unlock path yet (Phase 2 content) */
  comingSoon?: boolean;
}

export const WORLD_OBJECTS: WorldObject[] = [
  {
    id: "mestre",
    kind: "mestre",
    x: 360,
    y: 230,
    label: "Mestre",
    prompt: "Falar",
    icon: "people",
    color: "var(--subj-en)",
    sprite: "master",
    say: "Bem-vindo, jovem Guardião! Completa missões para tornares o teu herói mais forte.",
  },
  {
    id: "dragon",
    kind: "dragon",
    x: 680,
    y: 215,
    label: "Dragão do Caos",
    prompt: "Lutar",
    icon: "danger",
    color: "var(--danger)",
    sprite: "dragon",
    say: "O Dragão do Caos! Responde certo para lhe tirares vida.",
  },
  {
    id: "study",
    kind: "study",
    x: 300,
    y: 330,
    label: "Estudar",
    prompt: "Entrar",
    icon: "reading",
    color: "var(--accent)",
    say: "Portal de estudo. Escolhe uma matéria e ganha pontos de saber!",
  },
  {
    id: "missions",
    kind: "missions",
    x: 740,
    y: 330,
    label: "Missões",
    prompt: "Ver",
    icon: "target",
    color: "var(--warn)",
    say: "O quadro de missões. Vê o teu progresso e recebe recompensas.",
  },
  {
    id: "pets",
    kind: "pets",
    x: 250,
    y: 560,
    label: "Pets",
    prompt: "Ver",
    icon: "paw",
    color: "var(--subj-edm)",
    comingSoon: true,
    say: "O ninho dos companheiros. Em breve vais poder cuidar do teu pet!",
  },
  {
    id: "house",
    kind: "house",
    x: 790,
    y: 560,
    label: "Casa",
    prompt: "Entrar",
    icon: "home",
    color: "var(--subj-mundo)",
    unlockTests: 3,
    say: "A tua casa na Academia. Decora-a em breve!",
  },
];

/** Whether an object is currently locked, given the hero's progress. */
export function isLocked(obj: WorldObject, stats: WorldStats): boolean {
  if (obj.comingSoon) return true;
  if (obj.unlockTests != null) return stats.lessonsDone < obj.unlockTests;
  return false;
}

/** A short reason a locked object can't be opened yet (read aloud on tap). */
export function lockReason(obj: WorldObject, stats: WorldStats): string {
  if (obj.comingSoon) return `${obj.label}: em breve!`;
  if (obj.unlockTests != null) {
    const left = obj.unlockTests - stats.lessonsDone;
    return `${obj.label} abre depois de ${obj.unlockTests} testes. Faltam ${left}.`;
  }
  return obj.label;
}
