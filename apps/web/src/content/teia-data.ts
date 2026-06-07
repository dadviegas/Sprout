/* ------------------------------------------------------------------ *
 * "A Teia do Saber" — the data behind the knowledge web.
 *
 * The web shows how the SAME big ideas reappear across different subjects:
 * a theme (e.g. "A Água") gathers real lessons from Matemática, Ciências,
 * O Mundo… and a lesson that belongs to two themes becomes a bridge between
 * them. That cross-over IS the point — it shows the child everything is linked.
 *
 * DRY: this file only stores the RELATIONSHIPS (which lessons share a theme,
 * which themes bridge). Each node's title, emoji, subject and colour are
 * derived from `curriculum.ts` at resolve time (the single source of truth),
 * so renaming a lesson there updates the web automatically. A lessonId that no
 * longer exists is simply dropped — a typo can never crash the view.
 * ------------------------------------------------------------------ */

import type { IconName } from "@sprout/icons";
import { lessonMeta, type LessonMeta } from "./curriculum";

/** A big idea that reappears across subjects. `lessons` are curriculum ids. */
export interface TeiaTheme {
  id: string;
  label: string;
  icon: IconName;
  /** CSS colour for the theme's halo/links (a design token reference). */
  accent: string;
  /** Read-aloud sentence explaining what this theme ties together. */
  blurb: string;
  lessons: string[];
}

/** A conceptual link drawn between two themes even with no shared lesson. */
export interface TeiaBridge {
  a: string;
  b: string;
}

/* The themes. Order matters only for layout (placed around the circle in this
 * order) and for picking a lesson's "home" theme when it belongs to several. */
export const THEMES: TeiaTheme[] = [
  {
    id: "agua",
    label: "A Água",
    icon: "drop",
    accent: "var(--subj-mundo)",
    blurb:
      "A água liga muitas matérias: aparece no Estudo do Meio, nas Ciências, no oceano Atlântico e até nos animais do mar.",
    lessons: ["edm-2-agua", "edm-3-solidos-liquidos", "cn-5-agua", "mundo-3-atlantico", "mundo-3-animais-oceano", "enc-terra-agua"],
  },
  {
    id: "corpo",
    label: "O Corpo Humano",
    icon: "body",
    accent: "var(--subj-fis)",
    blurb:
      "O teu corpo aparece no Estudo do Meio, nas Ciências, na Educação Física e até em Inglês.",
    lessons: ["edm-1-corpo", "edm-1-sentidos", "edm-4-corpo-sistemas", "cn-6-digestivo", "cn-6-circulatorio", "en-2-body", "ef-3-corpo", "enc-corpo-cerebro", "enc-corpo-coracao"],
  },
  {
    id: "saude",
    label: "Saúde e Bem-Estar",
    icon: "heart",
    accent: "var(--subj-cid)",
    blurb:
      "Cuidar de ti junta a higiene, a alimentação, o desporto e a cidadania.",
    lessons: ["edm-1-higiene", "edm-3-alimentacao", "cid-4-saude", "ef-4-vida-ativa", "cn-6-saude"],
  },
  {
    id: "espaco-tempo",
    label: "O Espaço e o Tempo",
    icon: "planet",
    accent: "var(--subj-mat)",
    blurb:
      "Do sistema solar aos relógios e calendários — o espaço e o tempo ligam a Matemática, o Estudo do Meio e o Mundo.",
    lessons: ["edm-4-sistema-solar", "estudo-planetas", "mat-1-tempo", "mat-2-horas", "estudo-relogio", "estudo-dias-meses", "mat-3-calendario", "mundo-4-fusos", "enc-espaco-planetas", "enc-terra-dia-noite"],
  },
  {
    id: "animais",
    label: "Animais e Natureza",
    icon: "paw",
    accent: "var(--subj-edm)",
    blurb:
      "Os seres vivos aparecem no Estudo do Meio, nas Ciências, no Mundo, em Inglês e nos países.",
    lessons: ["edm-2-animais", "edm-2-seres-vivos", "cn-5-animais-diversidade", "edm-3-plantas", "cn-5-plantas", "mundo-4-animais", "mundo-3-animais-oceano", "en-2-animals", "paises-pt-natureza", "enc-animais-polvo"],
  },
  {
    id: "portugal",
    label: "Portugal",
    icon: "flag",
    accent: "var(--subj-paises)",
    blurb:
      "Conhecer Portugal liga o Estudo do Meio, o Mundo, os países e o Saber de cor.",
    lessons: ["edm-3-portugal", "mundo-2-portugal", "paises-pt-pais", "estudo-distritos", "edm-4-relevo-clima", "mundo-2-simbolos", "paises-pt-bandeira", "mundo-2-rios"],
  },
  {
    id: "historia",
    label: "Viagem no Tempo",
    icon: "castle",
    accent: "var(--subj-hgp)",
    blurb:
      "A história de Portugal liga o Estudo do Meio, a HGP, o Mundo e as datas que sabes de cor.",
    lessons: ["edm-4-historia", "edm-4-reis-dinastias", "hgp-5-formacao", "hgp-6-descobrimentos", "mundo-3-descobrimentos", "estudo-datas", "estudo-romanos", "hgp-6-reis-monumentos"],
  },
  {
    id: "mapas",
    label: "Mapas e Orientação",
    icon: "compass",
    accent: "var(--subj-en)",
    blurb:
      "Saber onde estás junta os pontos cardeais, os mapas, os continentes e até as direções em Inglês.",
    lessons: ["edm-4-mapas", "estudo-pontos-cardeais", "mundo-4-continentes", "estudo-continentes", "mundo-2-rios", "estudo-distritos", "en-3-directions"],
  },
  {
    id: "numeros",
    label: "Números e Contas",
    icon: "abacus",
    accent: "var(--accent)",
    blurb:
      "Os números estão na Matemática, no Saber de cor, em Inglês e até nos numerais romanos da História.",
    lessons: ["mat-1-numeros-10", "mat-1-somar", "mat-2-tabuada", "mat-3-multiplicacao", "mat-3-divisao", "estudo-tabuadas", "estudo-numeros", "en-1-numbers", "mat-3-romanos", "estudo-romanos"],
  },
  {
    id: "formas",
    label: "Formas e Medida",
    icon: "shapes",
    accent: "var(--subj-mat)",
    blurb:
      "As formas e as medidas ligam a Matemática, o Saber de cor e a Educação Visual.",
    lessons: ["mat-1-formas", "mat-2-solidos", "estudo-formas", "mat-4-area", "estudo-formulas", "mat-4-angulos", "ev-5-formas", "mat-2-simetria", "ev-5-geometria"],
  },
  {
    id: "dinheiro",
    label: "Dinheiro e Escolhas",
    icon: "coin",
    accent: "var(--subj-cid)",
    blurb:
      "O dinheiro junta a Matemática, o Saber de cor e a Cidadania — poupar e escolher bem.",
    lessons: ["mat-2-dinheiro", "estudo-dinheiro", "estudo-loja", "cid-2-poupar", "cid-3-consumir"],
  },
  {
    id: "palavras",
    label: "Ler e Escrever",
    icon: "letters",
    accent: "var(--subj-pt)",
    blurb:
      "Aprender a ler e a escrever liga o Português, o Saber de cor, o Dicionário e os Verbos.",
    lessons: ["pt-1-vogais", "pt-1-silabas", "pt-1-primeiras-palavras", "pt-3-texto", "pt-4-classes", "estudo-alfabeto", "estudo-classes", "estudo-verbos", "pt-1-rimas", "dic-a", "verb-a"],
  },
  {
    id: "planeta",
    label: "Cuidar do Planeta",
    icon: "leaf",
    accent: "var(--subj-edm)",
    blurb:
      "Proteger a Terra junta a Cidadania, o Estudo do Meio, as Ciências e a Tecnologia.",
    lessons: ["cid-1-reciclar", "cid-4-sustentavel", "edm-4-ambiente", "cn-5-ecossistemas", "et-6-reciclar", "enc-terra-vulcoes"],
  },
  {
    id: "som-arte",
    label: "Som, Cor e Arte",
    icon: "music",
    accent: "var(--subj-emus)",
    blurb:
      "Criar junta as cores, os sons, o ritmo e até as rimas das poesias.",
    lessons: ["art-1-sons", "art-1-cores", "art-2-instrumentos", "em-5-som-silencio", "em-5-ritmo", "art-3-ritmo", "ev-5-cor", "pt-1-rimas", "enc-ciencia-ceu-azul"],
  },
];

/* Extra conceptual bridges between themes that don't share a lesson but are
 * clearly related — they thicken the web around the big "everything connects". */
export const BRIDGES: TeiaBridge[] = [
  { a: "agua", b: "planeta" },
  { a: "corpo", b: "animais" },
  { a: "espaco-tempo", b: "numeros" },
  { a: "formas", b: "som-arte" },
  { a: "portugal", b: "historia" },
  { a: "numeros", b: "dinheiro" },
  { a: "palavras", b: "som-arte" },
  { a: "mapas", b: "historia" },
];

/* ── Resolved graph (relationships + curriculum-derived node data) ─────────── */

export interface TeiaLessonNode {
  id: string;
  meta: LessonMeta;
  /** Every theme this lesson belongs to (length > 1 = a bridge between themes). */
  themes: string[];
}

export interface ResolvedTeia {
  themes: TeiaTheme[];
  /** Each lesson once, with the themes it links. */
  lessons: TeiaLessonNode[];
  bridges: TeiaBridge[];
  /** lessonId → its node, for quick lookups during layout/highlighting. */
  byId: Map<string, TeiaLessonNode>;
}

/** Resolve the curated themes against the live curriculum: drop unknown lesson
 *  ids, attach each lesson's real meta, and record which themes each one links.
 *  Themes keep only their existing lessons. Bridges between two real themes
 *  survive; the rest are dropped. */
export function resolveTeia(): ResolvedTeia {
  const byId = new Map<string, TeiaLessonNode>();
  const themes: TeiaTheme[] = [];

  for (const theme of THEMES) {
    const lessons = theme.lessons.filter((id) => lessonMeta.has(id));
    if (lessons.length === 0) continue;
    themes.push({ ...theme, lessons });
    for (const id of lessons) {
      const existing = byId.get(id);
      if (existing) {
        existing.themes.push(theme.id);
      } else {
        byId.set(id, { id, meta: lessonMeta.get(id)!, themes: [theme.id] });
      }
    }
  }

  const liveThemes = new Set(themes.map((t) => t.id));
  const bridges = BRIDGES.filter((b) => liveThemes.has(b.a) && liveThemes.has(b.b));

  return { themes, lessons: [...byId.values()], bridges, byId };
}
