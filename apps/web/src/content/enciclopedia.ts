/* ------------------------------------------------------------------ *
 * A Enciclopédia — the discovery half of the Biblioteca (NOT a school
 * subject, NOT tied to a grade). Each THEME (Espaço, Dinossauros, …) is its
 * own reference `Subject`, generated from the compact `ENC_THEMES` table
 * below — so adding a theme is one table row, and each theme reuses the whole
 * Subject machinery (card, list screen, progress, search) for free.
 *
 * An article is a `Lesson`: a markdown body (imported `.md`) with the usual
 * widgets + a final quiz, or no body yet (renders the "em construção"
 * placeholder, like the rest of the curriculum). Articles live under
 * content/enciclopedia/<theme>/<article>.md.
 *
 * See docs/BIBLIOTECA.md for the full plan. The themes are wired into the
 * global `subjects` list (and the Biblioteca area) from curriculum.ts.
 * ------------------------------------------------------------------ */
import type { Lesson, Subject, YearN } from "./curriculum";

/* ---- Seed articles (the rest of each theme is placeholders for now) ---- */
import espacoPlanetas from "./enciclopedia/espaco/planetas-gigantes-e-pequeninos.md";
import corpoCerebro from "./enciclopedia/corpo/o-cerebro.md";
import terraAgua from "./enciclopedia/terra/a-viagem-da-agua.md";
import animaisPolvo from "./enciclopedia/animais/o-polvo.md";
import cienciaCeu from "./enciclopedia/ciencia/porque-o-ceu-e-azul.md";
import cienciaCores from "./enciclopedia/ciencia/como-nascem-as-cores.md";
import corpoCoracao from "./enciclopedia/corpo/o-coracao.md";
import terraDiaNoite from "./enciclopedia/terra/porque-ha-dia-e-noite.md";
import terraVulcoes from "./enciclopedia/terra/como-funcionam-os-vulcoes.md";

/** One discovery theme: a card in the Biblioteca that opens to its articles.
 *  `color` is a colour-token reference (the soft variant is derived). */
interface EncTheme {
  id: string;
  label: string;
  emoji: string;
  /** name of an @sprout/icons icon, for the card + section header */
  icon: string;
  color: string;
  blurb: string;
  articles: Lesson[];
}

/* The themes, in display order. Articles without a `body` are placeholders that
 * render the friendly "em breve" card — the full map of what the Biblioteca will
 * hold is always visible, and filling one in is: write one .md + set `body`. */
export const ENC_THEMES: EncTheme[] = [
  {
    id: "enc-espaco", label: "Espaço", emoji: "🚀", icon: "planet",
    color: "var(--subj-mundo)",
    blurb: "Planetas, estrelas, a Lua e as viagens ao espaço.",
    articles: [
      { id: "enc-espaco-planetas", title: "Planetas: gigantes e pequeninos", emoji: "🪐", body: espacoPlanetas },
      { id: "enc-espaco-sol", title: "O Sol: a nossa estrela", emoji: "☀️" },
      { id: "enc-espaco-lua", title: "A Lua e as suas fases", emoji: "🌙" },
      { id: "enc-espaco-buracos-negros", title: "Os buracos negros", emoji: "🕳️" },
      { id: "enc-espaco-apollo", title: "A primeira viagem à Lua", emoji: "🚀" },
    ],
  },
  {
    id: "enc-dinos", label: "Dinossauros", emoji: "🦖", icon: "paw",
    color: "var(--subj-hgp)",
    blurb: "Os gigantes que viveram há milhões de anos.",
    articles: [
      { id: "enc-dinos-trex", title: "O Tiranossauro Rex", emoji: "🦖" },
      { id: "enc-dinos-triceratops", title: "O Triceratops", emoji: "🦕" },
      { id: "enc-dinos-fosseis", title: "Como sabemos que existiram?", emoji: "🦴" },
      { id: "enc-dinos-extincao", title: "Porque desapareceram?", emoji: "☄️" },
    ],
  },
  {
    id: "enc-animais", label: "Animais", emoji: "🐾", icon: "dove",
    color: "var(--subj-cn)",
    blurb: "Bichos de todos os tamanhos e os seus segredos.",
    articles: [
      { id: "enc-animais-polvo", title: "O polvo: o génio do mar", emoji: "🐙", body: animaisPolvo },
      { id: "enc-animais-baleia", title: "A baleia-azul: o maior de todos", emoji: "🐋" },
      { id: "enc-animais-gatos", title: "Porque ronronam os gatos?", emoji: "🐱" },
      { id: "enc-animais-formigas", title: "As formigas trabalhadoras", emoji: "🐜" },
    ],
  },
  {
    id: "enc-plantas", label: "Plantas", emoji: "🌿", icon: "leaf",
    color: "var(--subj-edm)",
    blurb: "Como as plantas comem luz e enchem o mundo de verde.",
    articles: [
      { id: "enc-plantas-fotossintese", title: "A fotossíntese: comer luz", emoji: "🌞" },
      { id: "enc-plantas-semente", title: "Da semente à árvore", emoji: "🌱" },
      { id: "enc-plantas-flores", title: "As flores e as abelhas", emoji: "🌸" },
    ],
  },
  {
    id: "enc-corpo", label: "Corpo Humano", emoji: "🧠", icon: "brain",
    color: "var(--subj-fis)",
    blurb: "Por dentro de ti: o cérebro, o coração e muito mais.",
    articles: [
      { id: "enc-corpo-cerebro", title: "O cérebro: o chefe do corpo", emoji: "🧠", body: corpoCerebro },
      { id: "enc-corpo-coracao", title: "O coração e o sangue", emoji: "❤️", body: corpoCoracao },
      { id: "enc-corpo-espirro", title: "Porque é que espirras?", emoji: "🤧" },
      { id: "enc-corpo-sentidos", title: "Os cinco sentidos", emoji: "👀" },
    ],
  },
  {
    id: "enc-ciencia", label: "Ciência & Invenções", emoji: "🔬", icon: "flask",
    color: "var(--subj-tic)",
    blurb: "Os porquês do dia a dia e invenções que mudaram tudo.",
    articles: [
      { id: "enc-ciencia-ceu-azul", title: "Porque é que o céu é azul?", emoji: "🌈", body: cienciaCeu },
      { id: "enc-ciencia-barcos", title: "Porque flutuam os barcos?", emoji: "⛵" },
      { id: "enc-ciencia-cores", title: "Como nascem as cores?", emoji: "🎨", body: cienciaCores },
      { id: "enc-ciencia-eletricidade", title: "A eletricidade", emoji: "⚡" },
    ],
  },
  {
    id: "enc-terra", label: "Planeta Terra", emoji: "🌍", icon: "mountain",
    color: "var(--subj-et)",
    blurb: "Vulcões, oceanos, o tempo e a nossa casa azul.",
    articles: [
      { id: "enc-terra-agua", title: "A viagem da água", emoji: "💧", body: terraAgua },
      { id: "enc-terra-vulcoes", title: "Como funcionam os vulcões?", emoji: "🌋", body: terraVulcoes },
      { id: "enc-terra-dia-noite", title: "Porque há dia e noite?", emoji: "🌗", body: terraDiaNoite },
      { id: "enc-terra-estacoes", title: "As estações do ano", emoji: "🍂" },
    ],
  },
  {
    id: "enc-pessoas", label: "Pessoas", emoji: "🏛️", icon: "people",
    color: "var(--subj-pt)",
    blurb: "Cientistas, inventores e heróis que mudaram o mundo.",
    articles: [
      { id: "enc-pessoas-einstein", title: "Albert Einstein", emoji: "🧪" },
      { id: "enc-pessoas-curie", title: "Marie Curie", emoji: "⚗️" },
      { id: "enc-pessoas-henrique", title: "Infante D. Henrique", emoji: "⛵" },
    ],
  },
];

/** A theme rendered as a Subject: tier 1 holds every article; the other tiers
 *  go unused (the Enciclopédia is not grade-based, like the Dicionário). */
function toSubject(t: EncTheme): Subject {
  const empty: Lesson[] = [];
  return {
    id: t.id,
    label: t.label,
    emoji: t.emoji,
    color: t.color,
    colorSoft: t.color.replace(/\)$/, "-soft)"),
    blurb: t.blurb,
    years: { 1: t.articles, 2: empty, 3: empty, 4: empty, 5: empty, 6: empty } as Record<YearN, Lesson[]>,
  };
}

export const enciclopediaSubjects: Subject[] = ENC_THEMES.map(toSubject);

/** The set of theme ids, for `isEnciclopedia` / area routing. */
export const ENC_THEME_IDS = new Set(ENC_THEMES.map((t) => t.id));
