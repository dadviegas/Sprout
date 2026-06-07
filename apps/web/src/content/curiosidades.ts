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
