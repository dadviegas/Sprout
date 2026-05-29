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

export interface SiteConfig {
  brand: { name: string; tagline: string };
  mascot: { name: string; emoji: string };
  mundo: {
    sectionTitle: string;
    sectionSub: string;
    beyond: { label: string; blurb: string; sub: string; icon: string };
    rings: MundoRingConfig[];
  };
}

export const site = raw as SiteConfig;
