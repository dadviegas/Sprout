/* ------------------------------------------------------------------ *
 * Biblioteca — derived gamification: medals + missions + recommendations.
 *
 * All three are DERIVED from data we already keep (per-lesson progress + the
 * recently seen list + the Teia relationships), so there's nothing new to store.
 * See docs/BIBLIOTECA.md (Fase 5).
 * ------------------------------------------------------------------ */
import {
  enciclopediaSubjects,
  coresSubject,
  atlasSubject,
  lessonMeta,
  type LessonMeta,
} from "./content/curriculum";
import { resolveTeia } from "./content/teia-data";
import { MISSOES, type Missao } from "./content/missoes";
import { SUBJECT_ICONS, type IconName } from "@sprout/icons";
import type { ProgressMap } from "./progress";

/* ---- Medals --------------------------------------------------------- */

export interface Medal {
  id: string;
  title: string;
  desc: string;
  icon: IconName;
  /** how many of the requirement are met, and how many are needed */
  have: number;
  need: number;
  /** earned = requirement complete */
  earned: boolean;
}

/** A playful name for completing each Enciclopédia theme. */
const THEME_MEDAL: Record<string, string> = {
  "enc-espaco": "Explorador do Espaço",
  "enc-dinos": "Mestre dos Dinossauros",
  "enc-animais": "Amigo dos Animais",
  "enc-plantas": "Jardineiro Sábio",
  "enc-corpo": "Doutor do Corpo",
  "enc-ciencia": "Cientista Júnior",
  "enc-terra": "Guardião da Terra",
  "enc-pessoas": "Historiador",
};

const countWhere = (ids: string[], progress: ProgressMap, key: "done" | "visited"): number =>
  ids.filter((id) => progress[id]?.[key]).length;

/** Every Biblioteca medal, with live progress against the child's work. Theme
 *  medals need each article DONE (final test); the catalogue medals (Cores,
 *  Atlas) only need each page VISITED, since they have no quiz. */
export function bibliotecaMedals(progress: ProgressMap): Medal[] {
  const medals: Medal[] = [];

  for (const s of enciclopediaSubjects) {
    const ids = s.years[1].map((l) => l.id);
    const have = countWhere(ids, progress, "done");
    medals.push({
      id: `medal-${s.id}`,
      title: THEME_MEDAL[s.id] ?? s.label,
      desc: `Faz todos os artigos de ${s.label}`,
      icon: SUBJECT_ICONS[s.id] ?? "trophy",
      have,
      need: ids.length,
      earned: ids.length > 0 && have >= ids.length,
    });
  }

  const coresIds = coresSubject.years[1].map((l) => l.id);
  const coresHave = countWhere(coresIds, progress, "visited");
  medals.push({
    id: "medal-cores", title: "Pintor das Cores", desc: "Vê todas as famílias de cores",
    icon: "palette", have: coresHave, need: coresIds.length, earned: coresHave >= coresIds.length,
  });

  const atlasIds = atlasSubject.years[1].map((l) => l.id);
  const atlasHave = countWhere(atlasIds, progress, "visited");
  medals.push({
    id: "medal-atlas", title: "Explorador da Vida", desc: "Vê todos os grupos do Atlas",
    icon: "paw", have: atlasHave, need: atlasIds.length, earned: atlasHave >= atlasIds.length,
  });

  // Global tiers: total Enciclopédia articles completed.
  const allEnc = enciclopediaSubjects.flatMap((s) => s.years[1].map((l) => l.id));
  const encDone = countWhere(allEnc, progress, "done");
  const tiers: [number, string, IconName][] = [
    [5, "Leitor Curioso", "tip"],
    [15, "Bibliotecário", "reading"],
    [allEnc.length, "Sábio da Biblioteca", "trophy"],
  ];
  for (const [need, title, icon] of tiers) {
    medals.push({
      id: `medal-enc-${need}`, title, desc: `Completa ${need} artigos da Enciclopédia`,
      icon, have: Math.min(encDone, need), need, earned: encDone >= need,
    });
  }

  return medals;
}

/* ---- Missions (percursos → cromo) ---------------------------------- */

export interface MissaoStep {
  id: string;
  title: string;
  done: boolean;
}

export interface MissaoState extends Missao {
  stepsState: MissaoStep[];
  have: number;
  need: number;
  done: boolean;
  /** the first article not yet done — where "Continuar" should go (or step 0) */
  nextId: string;
}

/** Each mission with live progress derived from the child's work. A step whose id
 *  has no lesson (shouldn't happen — ids are checked by `pnpm validate`) is kept
 *  but never counts as done, so a typo can't silently "complete" a mission. */
export function missoesState(progress: ProgressMap): MissaoState[] {
  return MISSOES.map((m) => {
    const stepsState: MissaoStep[] = m.steps.map((id) => ({
      id,
      title: lessonMeta.get(id)?.title ?? id,
      done: !!progress[id]?.done,
    }));
    const have = stepsState.filter((s) => s.done).length;
    const next = stepsState.find((s) => !s.done) ?? stepsState[0];
    return {
      ...m,
      stepsState,
      have,
      need: stepsState.length,
      done: have >= stepsState.length,
      nextId: next?.id ?? m.steps[0],
    };
  });
}

/* ---- Recommendations ----------------------------------------------- */

export interface Recommendation {
  id: string;
  meta: LessonMeta;
  /** why it's suggested, e.g. "Porque viste Sistema Solar" */
  reason: string;
}

const isEncId = (id: string) => id.startsWith("enc-");

/** Suggest Enciclopédia articles the child hasn't done yet, linked by the Teia
 *  to what they've been doing recently (school lessons included). Falls back to
 *  one fresh article per theme, so it's never empty until everything is done. */
export function recommendedArticles(progress: ProgressMap, history: string[], max = 4): Recommendation[] {
  const teia = resolveTeia();
  const seen = new Set(history);
  const taken = new Set<string>();
  const out: Recommendation[] = [];

  const eligible = (id: string) => isEncId(id) && !taken.has(id) && !seen.has(id) && !progress[id]?.done && lessonMeta.has(id);

  // 1) From the themes of recently-seen lessons, suggest sibling articles.
  for (const recentId of history.slice(0, 8)) {
    if (out.length >= max) break;
    const node = teia.byId.get(recentId);
    if (!node) continue;
    const recentTitle = lessonMeta.get(recentId)?.title;
    for (const theme of teia.themes) {
      if (!node.themes.includes(theme.id)) continue;
      for (const lid of theme.lessons) {
        if (out.length >= max || !eligible(lid)) continue;
        taken.add(lid);
        out.push({ id: lid, meta: lessonMeta.get(lid)!, reason: recentTitle ? `Porque viste ${recentTitle}` : `Sobre ${theme.label}` });
      }
    }
  }

  // 2) Fallback: one fresh article per theme, for variety.
  if (out.length < max) {
    for (const s of enciclopediaSubjects) {
      if (out.length >= max) break;
      const l = s.years[1].find((l) => eligible(l.id));
      if (l) {
        taken.add(l.id);
        out.push({ id: l.id, meta: lessonMeta.get(l.id)!, reason: "Para descobrir" });
      }
    }
  }

  return out.slice(0, max);
}
