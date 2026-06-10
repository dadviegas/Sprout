import { store } from "./storage";
import { schoolSubjects } from "./content/curriculum";

/* Small persisted UI preferences (chrome state, not progress) — one object
 * under `sprout.ui.v1` so future toggles join the same key instead of
 * sprouting new ones. Shared by App (recently-seen strip), Quiz/lesson views
 * (pre-reader mode) and the parents' settings (the pre-reader toggle). */

export const UI_KEY = "sprout.ui.v1";

/** Pre-reader mode (PLANO-ESTUDO §4.10): "auto" turns it on for 1.º ano
 *  school lessons only; "on"/"off" force it everywhere/nowhere. */
export type PreReaderPref = "auto" | "on" | "off";

export interface UiPrefs {
  /** the home "Visto recentemente" strip is expanded (default collapsed) */
  recentOpen?: boolean;
  /** pre-reader mode: bigger type, louder speakers, emoji-first quiz options */
  preReader?: PreReaderPref;
}

export function loadUiPrefs(): UiPrefs {
  const p = store.getSync<UiPrefs | null>(UI_KEY, null);
  return p && typeof p === "object" ? p : {};
}

export function saveUiPrefs(patch: Partial<UiPrefs>): void {
  store.set(UI_KEY, { ...loadUiPrefs(), ...patch });
}

const isSchoolSubject = (subjectId: string): boolean => schoolSubjects.some((s) => s.id === subjectId);

/** Whether pre-reader mode applies to a lesson of `subjectId`/`year`. "Auto"
 *  only fires for SCHOOL subjects at 1.º ano — the grade-less areas (Biblioteca,
 *  O Mundo, …) reuse year 1 as a tier, which says nothing about reading age. */
export function preReaderActive(subjectId: string, year: number): boolean {
  const pref = loadUiPrefs().preReader ?? "auto";
  if (pref === "on") return true;
  if (pref === "off") return false;
  return year === 1 && isSchoolSubject(subjectId);
}
