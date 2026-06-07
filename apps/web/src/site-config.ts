/* Typed access to the YAML page settings (src/site.config.yaml).
 *
 * One import point for everything configurable about the page — branding, the
 * mascot, and the "O Mundo" area copy/structure. Components and the curriculum
 * read from here instead of hard-coding strings, so changing the page is a
 * YAML edit, not a code change. */
import raw from "./site.config.yaml";
import type { YearN } from "./content/curriculum";

export interface MundoRingConfig {
  ring: YearN;
  label: string;
  blurb: string;
  /** name of an @sprout/icons icon */
  icon: string;
  /** featured as its own card on the home screen vs. inside the "beyond" entry */
  home: boolean;
}

export interface PaisConfig {
  /** which tier slot (1–4) holds this country's lessons in curriculum.ts */
  tier: YearN;
  label: string;
  blurb: string;
  /** name of an @sprout/icons icon */
  icon: string;
}

/** A top-level home area card (Escola / Treinar / Explorar / Biblioteca /
 *  Diversão). `accent` is a colour token name → var(<accent>)/-soft. */
export interface AreaConfig {
  id: string;
  label: string;
  blurb: string;
  /** name of an @sprout/icons icon */
  icon: string;
  /** colour token name, e.g. "--subj-mat" */
  accent: string;
}

/** A "Treinar" category — a labelled group of "Saber de cor" topic ids. */
export interface EstudoCategory {
  label: string;
  /** name of an @sprout/icons icon */
  icon: string;
  /** topic ids from estudoSubject, in display order */
  topics: string[];
}

export interface SiteConfig {
  brand: { name: string; tagline: string };
  mascot: { name: string; emoji: string };
  /** Home areas — the top-level "where do I go?" grid. */
  areas: {
    sectionTitle: string;
    sectionSub: string;
    items: AreaConfig[];
  };
  mundo: {
    sectionTitle: string;
    sectionSub: string;
    beyond: { label: string; blurb: string; sub: string; icon: string };
    rings: MundoRingConfig[];
  };
  /** "Saber de cor" — cross-cutting study/reference area copy. */
  estudo: {
    sectionTitle: string;
    sectionSub: string;
    categories: EstudoCategory[];
  };
  /** "Diversão" — playful area: a garden, an arcade, and a toy box (not a subject). */
  diversao: {
    sectionTitle: string;
    sectionSub: string;
    rooms: { id: "jardim" | "jogos" | "caixa"; label: string; blurb: string; icon: string; accent: string }[];
  };
  /** "O Dicionário" — cross-cutting reference area copy (word meanings by letter). */
  dicionario: {
    sectionTitle: string;
    sectionSub: string;
  };
  /** "Os Verbos" — the conjugation half of the Biblioteca, organised by letter. */
  verbos: {
    sectionTitle: string;
    sectionSub: string;
  };
  /** "Países" — get-to-know-a-country area; one card per country (Portugal, Canadá). */
  paises: {
    sectionTitle: string;
    sectionSub: string;
    countries: PaisConfig[];
  };
}

export const site = raw as SiteConfig;
