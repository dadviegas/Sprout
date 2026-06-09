/* ------------------------------------------------------------------ *
 * "Missões" — guided journeys through the Biblioteca: a named sequence of
 * articles that, once all read, earns a collectible sticker (cromo). This is the
 * "percursos" idea from docs/BIBLIOTECA.md §7 and the ready-made sequences in
 * docs/BIBLIOTECA-TOPICOS-ADULTOS-TECNOLOGIA.md §12.
 *
 * Data only: every `step` is a lesson id that MUST exist (an unknown id would be
 * an unreachable step). Live progress is DERIVED from the child's `progress` in
 * biblioteca.ts (nothing new to store), exactly like the medals.
 * ------------------------------------------------------------------ */
import type { IconName } from "@sprout/icons";

export interface Missao {
  id: string;
  title: string;
  /** the cromo (sticker) face — an emoji, shown big when the mission is done */
  emoji: string;
  icon: IconName;
  blurb: string;
  /** the article ids to read, in order */
  steps: string[];
}

export const MISSOES: Missao[] = [
  {
    id: "missao-familia-digital",
    title: "Família Digital",
    emoji: "🛡️",
    icon: "device",
    blurb: "Aprende a usar a tecnologia com cabeça — para toda a família.",
    steps: ["enc-tec-computador", "enc-tec-smartphone", "enc-tec-tablet", "enc-tec-internet", "enc-tec-seguranca", "enc-tec-ia"],
  },
  {
    id: "missao-pioneiros-computadores",
    title: "Pioneiros dos Computadores",
    emoji: "💾",
    icon: "robot",
    blurb: "As pessoas que inventaram o mundo digital onde vives.",
    steps: ["enc-pessoas-ada", "enc-pessoas-turing", "enc-pessoas-hopper", "enc-pessoas-berners-lee"],
  },
  {
    id: "missao-herois-direitos",
    title: "Heróis dos Direitos",
    emoji: "🕊️",
    icon: "heart",
    blurb: "Pessoas corajosas que defenderam a liberdade e a bondade.",
    steps: ["enc-pessoas-aristides", "enc-pessoas-mandela"],
  },
  {
    id: "missao-viagem-espaco",
    title: "Viagem ao Espaço",
    emoji: "🚀",
    icon: "planet",
    blurb: "Do Sol à Lua, dos planetas às primeiras viagens.",
    steps: ["enc-espaco-sol", "enc-espaco-lua", "enc-espaco-planetas", "enc-espaco-apollo"],
  },
  {
    id: "missao-pequeno-cientista",
    title: "Pequeno Cientista",
    emoji: "🥽",
    icon: "atom",
    blurb: "Faz todas as experiências do Laboratório, uma a uma.",
    steps: ["enc-lab-vulcao", "enc-lab-arcoiris", "enc-lab-leite", "enc-lab-ovo", "enc-lab-cristais"],
  },
  {
    id: "missao-contador-historias",
    title: "Contador de Histórias",
    emoji: "📖",
    icon: "story",
    blurb: "Lê todas as fábulas e lendas e descobre o que ensinam.",
    steps: ["enc-hist-cigarra", "enc-hist-lebre", "enc-hist-pomba", "enc-hist-galo", "enc-hist-martinho"],
  },
];
