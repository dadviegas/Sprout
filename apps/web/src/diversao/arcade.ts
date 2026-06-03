/* Shared bits for the canvas arcade games (Salta!, Foguetão). They both run a
 * requestAnimationFrame loop with the same three phases and both chase a
 * persisted high score, so that lives here instead of being copied twice. */

/** ready = waiting on the start screen; playing = live; over = game-over screen. */
export type ArcadePhase = "ready" | "playing" | "over";

/** Read a best score from localStorage (0 if missing or storage is blocked,
 *  e.g. private mode). Keys are namespaced "sprout.<game>.best". */
export function loadBest(key: string): number {
  try {
    return Number(window.localStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
}

/** Persist a best score, ignoring storage failures (a blocked store just means
 *  the record won't survive a reload — the game still plays fine). */
export function saveBest(key: string, value: number): void {
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    /* ignore — non-fatal */
  }
}
