/* ------------------------------------------------------------------ *
 * "Curiosidade do Dia" — a small fact shown at the top of the Biblioteca,
 * the same one all day, changing at midnight. Deterministic (no random): the
 * pick is the day-of-year modulo the list, so it's stable within a day and
 * cycles through every curiosity over time. Each may link to an article
 * ("saber mais →") — `lessonId` must be a real article WITH a body.
 * ------------------------------------------------------------------ */

export interface Curiosidade {
  emoji: string;
  /** the fact, shown and (by default) read aloud */
  text: string;
  /** read-aloud override, if the spoken version should differ */
  say?: string;
  /** optional article to open from "saber mais →" (a lesson id with a body) */
  lessonId?: string;
}

export const CURIOSIDADES: Curiosidade[] = [
  { emoji: "🐙", text: "O polvo tem 3 corações — e o do meio pára de bater quando ele nada!", lessonId: "enc-animais-polvo" },
  { emoji: "☀️", text: "A luz do Sol demora cerca de 8 minutos a chegar à Terra.", lessonId: "enc-espaco-planetas" },
  { emoji: "🧠", text: "O teu cérebro continua a trabalhar enquanto dormes — arruma as memórias do dia.", lessonId: "enc-corpo-cerebro" },
  { emoji: "💧", text: "A água que bebes hoje pode já ter sido bebida por um dinossauro!", lessonId: "enc-terra-agua" },
  { emoji: "🌈", text: "Na Lua, o céu é preto mesmo de dia — não há ar para espalhar a luz azul.", lessonId: "enc-ciencia-ceu-azul" },
  { emoji: "🪐", text: "Dentro de Júpiter cabiam mais de mil Terras!", lessonId: "enc-espaco-planetas" },
  { emoji: "🐌", text: "Um caracol pode dormir durante três anos seguidos." },
  { emoji: "🍯", text: "O mel nunca se estraga — encontrou-se mel com milhares de anos ainda bom de comer." },
  { emoji: "🦒", text: "A girafa tem o mesmo número de ossos no pescoço que tu: sete!" },
  { emoji: "🦈", text: "Os tubarões já existiam antes das árvores aparecerem na Terra." },
  { emoji: "❤️", text: "O coração de um beija-flor bate mais de 1000 vezes por minuto." },
  { emoji: "🐝", text: "As abelhas dançam para dizer às outras onde estão as flores." },
  { emoji: "🌋", text: "Há vulcões debaixo do mar — alguns nascem ilhas novas, como nos Açores!" },
  { emoji: "🦴", text: "O T-Rex tinha dentes do tamanho de uma banana." },
  { emoji: "🐜", text: "Uma formiga consegue carregar 50 vezes o seu próprio peso." },
  { emoji: "🌍", text: "A Terra anda à volta do Sol a mais de 100 mil km por hora — e nem sentes!" },
  { emoji: "🦷", text: "Os golfinhos dormem com metade do cérebro acordada." },
  { emoji: "🌙", text: "Vês sempre a mesma cara da Lua — ela roda no tempo certo para isso." },
  { emoji: "🐧", text: "Os pinguins 'pedem casamento' oferecendo uma pedrinha." },
  { emoji: "🎨", text: "Um ecrã faz mais de 16 milhões de cores misturando só vermelho, verde e azul." },
  { emoji: "🐞", text: "A palavra 'bug' (erro de computador) veio de uma traça a sério presa numa máquina — encontrada por Grace Hopper!", lessonId: "enc-pessoas-hopper" },
  { emoji: "🌐", text: "O primeiro site do mundo nasceu em 1991, criado por Tim Berners-Lee — e ainda hoje funciona.", lessonId: "enc-pessoas-berners-lee" },
  { emoji: "🤖", text: "Uma inteligência artificial não 'sabe' nada como tu — só descobre padrões em montes de exemplos. Por isso às vezes erra!", say: "Uma inteligência artificial não sabe nada como tu. Só descobre padrões em montes de exemplos. Por isso às vezes erra.", lessonId: "enc-tec-ia" },
  { emoji: "🥚", text: "Um ovo afunda na água... mas flutua se puseres muito sal! É o mesmo truque do Mar Morto.", lessonId: "enc-lab-ovo" },
  { emoji: "🌋", text: "Podes fazer um vulcão em erupção em casa, só com bicarbonato e vinagre!", lessonId: "enc-lab-vulcao" },
  { emoji: "🐢", text: "Devagar se vai ao longe: a tartaruga ganhou a corrida à lebre só por nunca desistir.", lessonId: "enc-hist-lebre" },
  { emoji: "🐓", text: "Conta a lenda que um galo já assado se levantou para provar que um homem era inocente.", lessonId: "enc-hist-galo" },
  { emoji: "💻", text: "Alan Turing imaginou os computadores muito antes de existirem — e ajudou a decifrar códigos secretos numa guerra.", lessonId: "enc-pessoas-turing" },
];

/** Day-of-year (1–366) for a date, in local time. */
function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

/** The curiosity for a given day — stable within the day, cycling over time. */
export function curiosidadeOfDay(d: Date): Curiosidade {
  return CURIOSIDADES[dayOfYear(d) % CURIOSIDADES.length];
}
