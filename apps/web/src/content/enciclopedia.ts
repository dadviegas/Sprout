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
import pessoasCurie from "./enciclopedia/pessoas/marie-curie.md";
import pessoasEinstein from "./enciclopedia/pessoas/albert-einstein.md";
import pessoasHenrique from "./enciclopedia/pessoas/infante-dom-henrique.md";
import pessoasAmalia from "./enciclopedia/pessoas/amalia-rodrigues.md";
import pessoasAda from "./enciclopedia/pessoas/ada-lovelace.md";
import pessoasEusebio from "./enciclopedia/pessoas/eusebio.md";
import dinosTrex from "./enciclopedia/dinos/tiranossauro-rex.md";
import animaisBaleia from "./enciclopedia/animais/a-baleia-azul.md";
import espacoSol from "./enciclopedia/espaco/o-sol.md";
import espacoLua from "./enciclopedia/espaco/a-lua.md";
import plantasFoto from "./enciclopedia/plantas/a-fotossintese.md";
import cienciaBarcos from "./enciclopedia/ciencia/porque-flutuam-os-barcos.md";
import espacoBuracos from "./enciclopedia/espaco/buracos-negros.md";
import espacoApollo from "./enciclopedia/espaco/primeira-viagem-a-lua.md";
import dinosTriceratops from "./enciclopedia/dinos/triceratops.md";
import dinosFosseis from "./enciclopedia/dinos/como-sabemos-que-existiram.md";
import dinosExtincao from "./enciclopedia/dinos/porque-desapareceram.md";
import animaisGatos from "./enciclopedia/animais/porque-ronronam-os-gatos.md";
import animaisFormigas from "./enciclopedia/animais/as-formigas.md";
import plantasSemente from "./enciclopedia/plantas/da-semente-a-arvore.md";
import plantasFlores from "./enciclopedia/plantas/as-flores-e-as-abelhas.md";
import corpoEspirro from "./enciclopedia/corpo/porque-espirras.md";
import corpoSentidos from "./enciclopedia/corpo/os-cinco-sentidos.md";
import cienciaEletricidade from "./enciclopedia/ciencia/a-eletricidade.md";
import cienciaMitos from "./enciclopedia/ciencia/sera-verdade-caca-mitos.md";
import cienciaArcoIris from "./enciclopedia/ciencia/de-onde-vem-o-arco-iris.md";
import plantasChocolate from "./enciclopedia/plantas/de-onde-vem-o-chocolate.md";
import espacoExoplanetas from "./enciclopedia/espaco/exoplanetas.md";
import corpoVitaminas from "./enciclopedia/corpo/as-vitaminas.md";
import terraAlqueva from "./enciclopedia/terra/alqueva-o-maior-lago.md";
import terraEstacoes from "./enciclopedia/terra/as-estacoes-do-ano.md";
import pessoasFrida from "./enciclopedia/pessoas/frida-kahlo.md";
import pessoasNewton from "./enciclopedia/pessoas/isaac-newton.md";
import pessoasFlorence from "./enciclopedia/pessoas/florence-nightingale.md";
import pessoasCamoes from "./enciclopedia/pessoas/luis-de-camoes.md";
import pessoasTuring from "./enciclopedia/pessoas/alan-turing.md";
import pessoasHopper from "./enciclopedia/pessoas/grace-hopper.md";
import pessoasBerners from "./enciclopedia/pessoas/tim-berners-lee.md";
import pessoasAristides from "./enciclopedia/pessoas/aristides-de-sousa-mendes.md";
import pessoasMandela from "./enciclopedia/pessoas/nelson-mandela.md";

/* ---- Laboratório — safe home experiments ---- */
import labVulcao from "./enciclopedia/laboratorio/o-vulcao-de-bicarbonato.md";
import labArcoiris from "./enciclopedia/laboratorio/o-arco-iris-num-copo.md";
import labLeite from "./enciclopedia/laboratorio/o-leite-magico.md";
import labOvo from "./enciclopedia/laboratorio/o-ovo-que-flutua.md";
import labCristais from "./enciclopedia/laboratorio/os-cristais-de-sal.md";

/* ---- Histórias & Lendas — fables and Portuguese legends ---- */
import histCigarra from "./enciclopedia/historias/a-cigarra-e-a-formiga.md";
import histLebre from "./enciclopedia/historias/a-lebre-e-a-tartaruga.md";
import histPomba from "./enciclopedia/historias/a-formiga-e-a-pomba.md";
import histGalo from "./enciclopedia/historias/lenda-do-galo-de-barcelos.md";
import histMartinho from "./enciclopedia/historias/lenda-de-sao-martinho.md";

/* ---- Tecnologia & Mundo Digital (see BIBLIOTECA-TOPICOS-ADULTOS-TECNOLOGIA.md) ---- */
import tecComputador from "./enciclopedia/tecnologia/como-funciona-um-computador.md";
import tecSmartphone from "./enciclopedia/tecnologia/o-que-e-um-smartphone.md";
import tecTablet from "./enciclopedia/tecnologia/tablets-e-aprendizagem.md";
import tecInternet from "./enciclopedia/tecnologia/a-internet.md";
import tecSeguranca from "./enciclopedia/tecnologia/seguranca-digital.md";
import tecIA from "./enciclopedia/tecnologia/inteligencia-artificial.md";

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
      { id: "enc-espaco-sol", title: "O Sol: a nossa estrela", emoji: "☀️", body: espacoSol },
      { id: "enc-espaco-lua", title: "A Lua e as suas fases", emoji: "🌙", body: espacoLua },
      { id: "enc-espaco-buracos-negros", title: "Os buracos negros", emoji: "🕳️", body: espacoBuracos },
      { id: "enc-espaco-apollo", title: "A primeira viagem à Lua", emoji: "🚀", body: espacoApollo },
      { id: "enc-espaco-exoplanetas", title: "Outros mundos: os exoplanetas", emoji: "🪐", body: espacoExoplanetas },
    ],
  },
  {
    id: "enc-dinos", label: "Dinossauros", emoji: "🦖", icon: "paw",
    color: "var(--subj-hgp)",
    blurb: "Os gigantes que viveram há milhões de anos.",
    articles: [
      { id: "enc-dinos-trex", title: "O Tiranossauro Rex", emoji: "🦖", body: dinosTrex },
      { id: "enc-dinos-triceratops", title: "O Triceratops", emoji: "🦕", body: dinosTriceratops },
      { id: "enc-dinos-fosseis", title: "Como sabemos que existiram?", emoji: "🦴", body: dinosFosseis },
      { id: "enc-dinos-extincao", title: "Porque desapareceram?", emoji: "☄️", body: dinosExtincao },
    ],
  },
  {
    id: "enc-animais", label: "Animais", emoji: "🐾", icon: "dove",
    color: "var(--subj-cn)",
    blurb: "Bichos de todos os tamanhos e os seus segredos.",
    articles: [
      { id: "enc-animais-polvo", title: "O polvo: o génio do mar", emoji: "🐙", body: animaisPolvo },
      { id: "enc-animais-baleia", title: "A baleia-azul: o maior de todos", emoji: "🐋", body: animaisBaleia },
      { id: "enc-animais-gatos", title: "Porque ronronam os gatos?", emoji: "🐱", body: animaisGatos },
      { id: "enc-animais-formigas", title: "As formigas trabalhadoras", emoji: "🐜", body: animaisFormigas },
    ],
  },
  {
    id: "enc-plantas", label: "Plantas", emoji: "🌿", icon: "leaf",
    color: "var(--subj-edm)",
    blurb: "Como as plantas comem luz e enchem o mundo de verde.",
    articles: [
      { id: "enc-plantas-fotossintese", title: "A fotossíntese: comer luz", emoji: "🌞", body: plantasFoto },
      { id: "enc-plantas-semente", title: "Da semente à árvore", emoji: "🌱", body: plantasSemente },
      { id: "enc-plantas-flores", title: "As flores e as abelhas", emoji: "🌸", body: plantasFlores },
      { id: "enc-plantas-chocolate", title: "De onde vem o chocolate?", emoji: "🍫", body: plantasChocolate },
    ],
  },
  {
    id: "enc-corpo", label: "Corpo Humano", emoji: "🧠", icon: "brain",
    color: "var(--subj-fis)",
    blurb: "Por dentro de ti: o cérebro, o coração e muito mais.",
    articles: [
      { id: "enc-corpo-cerebro", title: "O cérebro: o chefe do corpo", emoji: "🧠", body: corpoCerebro },
      { id: "enc-corpo-coracao", title: "O coração e o sangue", emoji: "❤️", body: corpoCoracao },
      { id: "enc-corpo-espirro", title: "Porque é que espirras?", emoji: "🤧", body: corpoEspirro },
      { id: "enc-corpo-sentidos", title: "Os cinco sentidos", emoji: "👀", body: corpoSentidos },
      { id: "enc-corpo-vitaminas", title: "As vitaminas e a tua energia", emoji: "🍊", body: corpoVitaminas },
    ],
  },
  {
    id: "enc-ciencia", label: "Ciência & Invenções", emoji: "🔬", icon: "flask",
    color: "var(--subj-tic)",
    blurb: "Os porquês do dia a dia e invenções que mudaram tudo.",
    articles: [
      { id: "enc-ciencia-ceu-azul", title: "Porque é que o céu é azul?", emoji: "🌈", body: cienciaCeu },
      { id: "enc-ciencia-barcos", title: "Porque flutuam os barcos?", emoji: "⛵", body: cienciaBarcos },
      { id: "enc-ciencia-cores", title: "Como nascem as cores?", emoji: "🎨", body: cienciaCores },
      { id: "enc-ciencia-eletricidade", title: "A eletricidade", emoji: "⚡", body: cienciaEletricidade },
      { id: "enc-ciencia-caca-mitos", title: "Será verdade? Caça-mitos", emoji: "🕵️", body: cienciaMitos },
      { id: "enc-ciencia-arco-iris", title: "De onde vem o arco-íris?", emoji: "🌈", body: cienciaArcoIris },
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
      { id: "enc-terra-estacoes", title: "As estações do ano", emoji: "🍂", body: terraEstacoes },
      { id: "enc-terra-alqueva", title: "Alqueva: o maior lago de Portugal", emoji: "💧", body: terraAlqueva },
    ],
  },
  {
    id: "enc-pessoas", label: "Pessoas", emoji: "🏛️", icon: "people",
    color: "var(--subj-pt)",
    blurb: "Mulheres e homens que mudaram o mundo — com os seus anos de vida.",
    // `tag` is the lifespan, shown on each card (and read aloud). Balanced list
    // of women and men, Portuguese and from the wider world.
    articles: [
      { id: "enc-pessoas-curie", title: "Marie Curie", emoji: "👩‍🔬", tag: "1867–1934", body: pessoasCurie },
      { id: "enc-pessoas-einstein", title: "Albert Einstein", emoji: "🧪", tag: "1879–1955", body: pessoasEinstein },
      { id: "enc-pessoas-ada", title: "Ada Lovelace", emoji: "💻", tag: "1815–1852", body: pessoasAda },
      { id: "enc-pessoas-henrique", title: "Infante D. Henrique", emoji: "⛵", tag: "1394–1460", body: pessoasHenrique },
      { id: "enc-pessoas-amalia", title: "Amália Rodrigues", emoji: "🎶", tag: "1920–1999", body: pessoasAmalia },
      { id: "enc-pessoas-eusebio", title: "Eusébio", emoji: "⚽", tag: "1942–2014", body: pessoasEusebio },
      { id: "enc-pessoas-frida", title: "Frida Kahlo", emoji: "🎨", tag: "1907–1954", body: pessoasFrida },
      { id: "enc-pessoas-newton", title: "Isaac Newton", emoji: "🍎", tag: "1643–1727", body: pessoasNewton },
      { id: "enc-pessoas-nightingale", title: "Florence Nightingale", emoji: "🩺", tag: "1820–1910", body: pessoasFlorence },
      { id: "enc-pessoas-camoes", title: "Luís de Camões", emoji: "📜", tag: "c. 1524–1580", body: pessoasCamoes },
      { id: "enc-pessoas-turing", title: "Alan Turing", emoji: "💻", tag: "1912–1954", body: pessoasTuring },
      { id: "enc-pessoas-hopper", title: "Grace Hopper", emoji: "⚓", tag: "1906–1992", body: pessoasHopper },
      { id: "enc-pessoas-berners-lee", title: "Tim Berners-Lee", emoji: "🌐", tag: "n. 1955", body: pessoasBerners },
      { id: "enc-pessoas-aristides", title: "Aristides de Sousa Mendes", emoji: "🕊️", tag: "1885–1954", body: pessoasAristides },
      { id: "enc-pessoas-mandela", title: "Nelson Mandela", emoji: "✊", tag: "1918–2013", body: pessoasMandela },
    ],
  },
  {
    id: "enc-laboratorio", label: "Laboratório", emoji: "🧪", icon: "atom",
    color: "var(--subj-cid)",
    blurb: "Experiências seguras e divertidas para fazeres em casa.",
    articles: [
      { id: "enc-lab-vulcao", title: "O vulcão de bicarbonato", emoji: "🌋", body: labVulcao },
      { id: "enc-lab-arcoiris", title: "O arco-íris num copo", emoji: "🌈", body: labArcoiris },
      { id: "enc-lab-leite", title: "O leite mágico", emoji: "🥛", body: labLeite },
      { id: "enc-lab-ovo", title: "O ovo que flutua", emoji: "🥚", body: labOvo },
      { id: "enc-lab-cristais", title: "Cristais de sal", emoji: "🧂", body: labCristais },
    ],
  },
  {
    id: "enc-historias", label: "Histórias & Lendas", emoji: "📖", icon: "story",
    color: "var(--subj-ev)",
    blurb: "Contos, fábulas e lendas — e o que elas nos ensinam.",
    articles: [
      { id: "enc-hist-cigarra", title: "A Cigarra e a Formiga", emoji: "🐜", body: histCigarra },
      { id: "enc-hist-lebre", title: "A Lebre e a Tartaruga", emoji: "🐢", body: histLebre },
      { id: "enc-hist-pomba", title: "A Formiga e a Pomba", emoji: "🕊️", body: histPomba },
      { id: "enc-hist-galo", title: "A Lenda do Galo de Barcelos", emoji: "🐓", body: histGalo },
      { id: "enc-hist-martinho", title: "A Lenda de São Martinho", emoji: "🐴", body: histMartinho },
    ],
  },
  {
    id: "enc-tecnologia", label: "Tecnologia", emoji: "💻", icon: "robot",
    color: "var(--subj-en)",
    blurb: "Computadores, internet e o mundo digital — com curiosidade e cuidado.",
    articles: [
      { id: "enc-tec-computador", title: "Como funciona um computador?", emoji: "💻", body: tecComputador },
      { id: "enc-tec-smartphone", title: "O que é um smartphone?", emoji: "📱", body: tecSmartphone },
      { id: "enc-tec-tablet", title: "Tablets: estudar e criar", emoji: "📲", body: tecTablet },
      { id: "enc-tec-internet", title: "A internet: pesquisar melhor", emoji: "🌐", body: tecInternet },
      { id: "enc-tec-seguranca", title: "Segurança digital", emoji: "🔒", body: tecSeguranca },
      { id: "enc-tec-ia", title: "A inteligência artificial", emoji: "🤖", body: tecIA },
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
