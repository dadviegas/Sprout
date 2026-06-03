import { subjectById, findLesson, type YearN } from "./content/curriculum";
import { store } from "./storage";

/** The three rooms of the playful "Diversão" area (grade-less, just for fun). */
export type DiversaoRoom = "jardim" | "jogos" | "caixa";

/* Navigation is YEAR-first: a child picks their year (1.º–6.º), then a subject
 * within that year, then a lesson. */
export type View =
  | { kind: "home" }
  | { kind: "year"; year: YearN }
  // "O Mundo" overview — the "Pelo mundo fora" entry that lists the wider-world rings.
  | { kind: "mundo" }
  // "Diversão" — the playful area (garden / arcade / toy box); room undefined = hub.
  | { kind: "diversao"; room?: DiversaoRoom }
  | { kind: "subject"; year: YearN; subjectId: string }
  | { kind: "lesson"; year: YearN; subjectId: string; lessonId: string }
  | { kind: "test"; year: YearN; subjectId: string; lessonId: string };

// Bumped to v2 when navigation moved to year-first — drops incompatible state.
export const NAV_KEY = "sprout.nav.v2";
export const THEME_KEY = "sprout.theme.v1";

const HOME: View = { kind: "home" };

function isYear(y: unknown): y is YearN {
  return y === 1 || y === 2 || y === 3 || y === 4 || y === 5 || y === 6;
}

/** Parse + VALIDATE persisted navigation against the current schema. Any
 *  unknown/stale shape falls back to home, so old saved state never crashes
 *  the app (e.g. after a navigation refactor). */
export function loadView(): View {
  if (typeof window === "undefined") return HOME;
  try {
    const v = store.getSync<Record<string, unknown> | null>(NAV_KEY, null);
    if (!v || typeof v.kind !== "string") return HOME;
    if (v.kind === "home") return HOME;
    if (v.kind === "mundo") return { kind: "mundo" };
    if (v.kind === "diversao") {
      const room = v.room === "jardim" || v.room === "jogos" || v.room === "caixa" ? v.room : undefined;
      return room ? { kind: "diversao", room } : { kind: "diversao" };
    }
    if (v.kind === "year" && isYear(v.year)) return { kind: "year", year: v.year };
    if (v.kind === "subject" && isYear(v.year) && typeof v.subjectId === "string" && subjectById.has(v.subjectId)) {
      return { kind: "subject", year: v.year, subjectId: v.subjectId };
    }
    if (
      (v.kind === "lesson" || v.kind === "test") &&
      isYear(v.year) &&
      typeof v.subjectId === "string" &&
      typeof v.lessonId === "string" &&
      findLesson(v.subjectId, v.year, v.lessonId)
    ) {
      return { kind: v.kind, year: v.year, subjectId: v.subjectId, lessonId: v.lessonId };
    }
  } catch {
    /* ignore */
  }
  return HOME;
}

export function loadTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const saved = store.getSync<"light" | "dark" | null>(THEME_KEY, null);
  if (saved === "dark" || saved === "light") return saved;
  // No saved preference → follow the device setting.
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
