import { subjectById, findLesson, type YearN } from "./content/curriculum";
import { store } from "./storage";

/** The three rooms of the playful "Diversão" area (grade-less, just for fun). */
export type DiversaoRoom = "jardim" | "jogos" | "caixa";

/** Top-level home areas. The home is a grid of these; each opens a page that
 *  groups what used to be loose home sections (see HOME_AREAS_COMMAND_CENTER). */
export type AreaId = "escola" | "treinar" | "explorar" | "biblioteca";
const AREA_VALUES: AreaId[] = ["escola", "treinar", "explorar", "biblioteca"];

/* Navigation is YEAR-first: a child picks their year (1.º–6.º), then a subject
 * within that year, then a lesson. */
export type View =
  | { kind: "home" }
  // A top-level home area (Escola / Treinar / Explorar / Biblioteca).
  | { kind: "area"; area: AreaId }
  | { kind: "year"; year: YearN }
  // "O Mundo" overview — the "Pelo mundo fora" entry that lists the wider-world rings.
  | { kind: "mundo" }
  // "Diversão" — the playful area (garden / arcade / toy box); room undefined = hub.
  | { kind: "diversao"; room?: DiversaoRoom }
  // "A Teia do Saber" — the interactive web of how all the material connects.
  | { kind: "teia" }
  // "O meu plano" — the child's daily missions + study calendar.
  | { kind: "plano" }
  // "Plano completo" — the full day-by-day schedule of the férias plan.
  | { kind: "plano-completo" }
  // "Área dos pais" — the parents' dashboard page (math-gated on entry).
  | { kind: "pais" }
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
    if (v.kind === "area" && AREA_VALUES.includes(v.area as AreaId)) return { kind: "area", area: v.area as AreaId };
    if (v.kind === "mundo") return { kind: "mundo" };
    if (v.kind === "teia") return { kind: "teia" };
    if (v.kind === "plano") return { kind: "plano" };
    if (v.kind === "plano-completo") return { kind: "plano-completo" };
    if (v.kind === "pais") return { kind: "pais" };
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

/* ── URL hash routing ──────────────────────────────────────────────────────
 * The view is mirrored into `location.hash` so a page can be linked/bookmarked
 * and opened directly (e.g. `#/ano/3/mat/folha-calculo`). The hash is the URL
 * representation of a View; storage still keeps the last view as a fallback. */

const ROOM_VALUES: DiversaoRoom[] = ["jardim", "jogos", "caixa"];

/** Serialize a View to a shareable URL hash (always starts with `#/`). */
export function viewToHash(view: View): string {
  switch (view.kind) {
    case "home":
      return "#/";
    case "area":
      return `#/${view.area}`;
    case "mundo":
      return "#/world";
    case "diversao":
      return view.room ? `#/fun/${view.room}` : "#/fun";
    case "teia":
      return "#/teia";
    case "plano":
      return "#/plano";
    case "plano-completo":
      return "#/plano/completo";
    case "pais":
      return "#/pais";
    case "year":
      return `#/year/${view.year}`;
    case "subject":
      return `#/year/${view.year}/${view.subjectId}`;
    case "lesson":
      return `#/year/${view.year}/${view.subjectId}/${view.lessonId}`;
    case "test":
      return `#/year/${view.year}/${view.subjectId}/${view.lessonId}/test`;
  }
}

/** Parse + VALIDATE a URL hash back into a View. Returns null for an empty or
 *  unrecognised/stale hash, so the caller can fall back to stored/home state. */
export function viewFromHash(hash: string): View | null {
  const path = hash.replace(/^#\/?/, "");
  if (path === "") return null; // bare "#" / "#/" → no explicit target
  const seg = path.split("/").map(decodeURIComponent);

  if (seg[0] === "home") return HOME;
  if (seg.length === 1 && AREA_VALUES.includes(seg[0] as AreaId)) return { kind: "area", area: seg[0] as AreaId };
  if (seg[0] === "world" && seg.length === 1) return { kind: "mundo" };
  if (seg[0] === "teia" && seg.length === 1) return { kind: "teia" };
  if (seg[0] === "plano" && seg.length === 1) return { kind: "plano" };
  if (seg[0] === "plano" && seg[1] === "completo" && seg.length === 2) return { kind: "plano-completo" };
  if (seg[0] === "pais" && seg.length === 1) return { kind: "pais" };
  if (seg[0] === "fun") {
    if (seg.length === 1) return { kind: "diversao" };
    const room = ROOM_VALUES.find((r) => r === seg[1]);
    if (room && seg.length === 2) return { kind: "diversao", room };
    return null;
  }
  if (seg[0] === "year") {
    const year = Number(seg[1]);
    if (!isYear(year)) return null;
    if (seg.length === 2) return { kind: "year", year };
    const subjectId = seg[2];
    if (!subjectById.has(subjectId)) return null;
    if (seg.length === 3) return { kind: "subject", year, subjectId };
    const lessonId = seg[3];
    if (!findLesson(subjectId, year, lessonId)) return null;
    if (seg.length === 4) return { kind: "lesson", year, subjectId, lessonId };
    if (seg.length === 5 && seg[4] === "test") return { kind: "test", year, subjectId, lessonId };
  }
  return null;
}

export function loadTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const saved = store.getSync<"light" | "dark" | null>(THEME_KEY, null);
  if (saved === "dark" || saved === "light") return saved;
  // No saved preference → follow the device setting.
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
