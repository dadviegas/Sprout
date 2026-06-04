/* ------------------------------------------------------------------ *
 * Sprout curriculum — 1.º ao 6.º ano (1.º e 2.º ciclo, Portugal).
 *
 * Structure: Subject → Year (1–6) → Lessons.
 *
 * The two cycles have DIFFERENT subject sets (Decreto-Lei 55/2018):
 *   • 1.º ciclo (1–4): Matemática, Português, Estudo do Meio, Inglês,
 *     TIC, Cidadania, Artes, Educação Física.
 *   • 2.º ciclo (5–6): Matemática, Português, Inglês, Ciências Naturais,
 *     História e Geografia de Portugal, Educação Visual, Educação
 *     Tecnológica, Educação Musical, Educação Física, TIC, Cidadania.
 * A subject simply leaves the years it doesn't teach as `[]`; the year
 * screen only shows subjects that actually have lessons that year
 * (see `subjectsForYear`). So "Estudo do Meio" is empty in 5–6 and
 * "Ciências Naturais" is empty in 1–4, with no special-casing.
 * A lesson with `body` is a complete lesson (markdown imported from a .md
 * file). A lesson without `body` is registered in the skeleton and renders a
 * friendly "em construção" placeholder — so the full map of what a child
 * should learn is always visible, and filling it in is: write one .md +
 * set `body`. See ROADMAP.md for what is still a placeholder.
 *
 * Topic breakdown follows the Aprendizagens Essenciais / Metas Curriculares.
 * ------------------------------------------------------------------ */

export type YearN = 1 | 2 | 3 | 4 | 5 | 6;

/** The school cycle a year belongs to (1.º ciclo = 1–4, 2.º ciclo = 5–6). */
export type Cycle = 1 | 2;
export const cycleOf = (y: YearN): Cycle => (y <= 4 ? 1 : 2);

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  body?: string;
  /** Optional geography tags (used by the "O Mundo" area). They let a future
   *  map view group lessons by region/country without changing navigation. */
  zona?: string;
  pais?: string;
}

export interface Subject {
  id: string;
  label: string;
  emoji: string;
  color: string; // CSS custom property reference
  colorSoft: string;
  blurb: string;
  years: Record<YearN, Lesson[]>;
}

/* Page settings (names, copy, icons, ordering) live in the YAML config. */
import { site, type MundoRingConfig, type PaisConfig } from "../site-config";

/* ---- Matemática ---- */
import matNumeros10 from "./matematica/ano1/numeros-ate-10.md";
import matNumeros20 from "./matematica/ano1/numeros-ate-20.md";
import matSomar from "./matematica/ano1/somar.md";
import matFormas from "./matematica/ano1/formas.md";
import matTempo from "./matematica/ano1/tempo.md";
import matTabuada from "./matematica/ano2/tabuada-2-5.md";
import matHoras from "./matematica/ano2/horas.md";
import matNumeros100 from "./matematica/ano2/numeros-ate-100.md";
import matDinheiro from "./matematica/ano2/dinheiro.md";
// AE coverage — Matemática (wave 1)
import matComparar from "./matematica/ano1/comparar.md";
import matOrdinais from "./matematica/ano1/ordinais.md";
import matDobroMetade from "./matematica/ano1/dobro-metade.md";
import matTabuada34 from "./matematica/ano2/tabuada-3-4-10.md";
import matParImpar from "./matematica/ano2/par-impar.md";
import matSolidos from "./matematica/ano2/solidos.md";
import matPadroes from "./matematica/ano2/padroes.md";
import matNumeros1000 from "./matematica/ano3/numeros-1000.md";
import matMultiplos from "./matematica/ano3/multiplos.md";
import matCalendario from "./matematica/ano3/calendario.md";
import matMilhao from "./matematica/ano4/milhao.md";
import matAngulos from "./matematica/ano4/angulos.md";
import matVolume from "./matematica/ano4/volume-capacidade.md";
import matFracDec from "./matematica/ano4/fracoes-decimais.md";
import matMultiplicacao from "./matematica/ano3/multiplicacao.md";
import matDivisao from "./matematica/ano3/divisao.md";
import matFracoes from "./matematica/ano3/fracoes.md";
import matMedida from "./matematica/ano3/comprimento-massa.md";
import matDadosTabelas from "./matematica/ano3/dados-tabelas.md";
import matDecimais from "./matematica/ano4/decimais.md";
import matArea from "./matematica/ano4/area-perimetro.md";
import matDados from "./matematica/ano4/graficos-tabelas.md";
import matProblemas from "./matematica/ano4/resolver-problemas.md";
// AE coverage — Matemática (gaps: simetria, romanos, estimativa)
import matSimetria from "./matematica/ano2/simetria.md";
import matProbleminhas from "./matematica/ano2/resolver-probleminhas.md";
import matRomanos from "./matematica/ano3/numeros-romanos.md";
import matEstimar from "./matematica/ano4/estimar-arredondar.md";
import matCalculoMental from "./matematica/ano4/calculo-mental.md";
import mat5ProblemasVariosPassos from "./matematica/ano5/problemas-varios-passos.md";
import mat5DadosAMais from "./matematica/ano5/dados-a-mais-ou-a-menos.md";

/* ---- Português ---- */
import ptVogais from "./portugues/ano1/vogais.md";
import ptSilabas from "./portugues/ano1/silabas.md";
import ptPrimeirasPalavras from "./portugues/ano1/primeiras-palavras.md";
import ptRimas from "./portugues/ano1/rimas.md";
import ptPontuacao from "./portugues/ano2/pontuacao.md";
import ptNomeAcao from "./portugues/ano2/nome-e-acao.md";
import ptSingularPlural from "./portugues/ano2/singular-plural.md";
import ptSinonimos from "./portugues/ano3/sinonimos-antonimos.md";
import ptFamilia from "./portugues/ano3/familia-de-palavras.md";
import ptTexto from "./portugues/ano3/escrever-um-texto.md";
import ptClasses from "./portugues/ano4/classes-palavras.md";
import ptTiposTexto from "./portugues/ano4/tipos-de-texto.md";
import ptAcentos from "./portugues/ano4/acentos-ortografia.md";
// AE coverage — Português (wave 2)
import ptMaiuscula from "./portugues/ano1/maiusculas.md";
import ptLerFrases from "./portugues/ano1/ler-frases.md";
import ptTiposFrase from "./portugues/ano2/tipos-de-frase.md";
import ptLerExpressao from "./portugues/ano2/ler-com-expressao.md";
import ptSilabaTonica from "./portugues/ano2/silaba-tonica.md";
import ptTempos from "./portugues/ano3/tempos-verbais.md";
import ptCompreensao from "./portugues/ano3/compreensao-leitura.md";
import ptCarta from "./portugues/ano4/carta-e-convite.md";
import ptAdjetivo from "./portugues/ano4/adjetivos-graus.md";
// Oralidade + Educação Literária
import ptOuvirFalar from "./portugues/ano1/ouvir-e-falar.md";
import ptContos from "./portugues/ano1/contos-tradicionais.md";
import ptRecontar from "./portugues/ano2/contar-e-recontar.md";
import ptPoemas from "./portugues/ano2/poemas-e-lengalengas.md";
import ptFabulas from "./portugues/ano3/fabulas.md";
import ptFalarPublico from "./portugues/ano3/falar-para-os-outros.md";
import ptAutores from "./portugues/ano4/autores-portugueses.md";
import ptDebater from "./portugues/ano4/ouvir-e-debater.md";
// AE coverage — Português (gramática/ortografia gaps)
import ptMascFem from "./portugues/ano1/masculino-feminino.md";
import ptDigrafos from "./portugues/ano2/digrafos.md";
import ptSonsDoS from "./portugues/ano3/sons-do-s.md";
import ptPrefixos from "./portugues/ano4/prefixos-sufixos.md";
// AE coverage — Português (gramática/ortografia/texto, lote 2)
import ptPalavrasDia from "./portugues/ano1/palavras-do-dia-a-dia.md";
import ptAdjetivos2 from "./portugues/ano2/adjetivos.md";
import ptArtigos from "./portugues/ano2/artigos.md";
import ptPronomes from "./portugues/ano3/pronomes.md";
import ptHomofonos from "./portugues/ano3/palavras-que-confundem.md";
import ptDiscursoDireto from "./portugues/ano3/discurso-direto.md";
import ptFraseComplexa from "./portugues/ano4/frase-simples-complexa.md";
import ptNoticia from "./portugues/ano4/noticia.md";
import ptHifenX from "./portugues/ano4/o-hifen-e-o-x.md";
// AE coverage — Português (lacunas 1.º ciclo)
import ptDitongos from "./portugues/ano1/ditongos.md";
import ptOrdemAlfabetica from "./portugues/ano2/ordem-alfabetica.md";
import ptAumentativoDiminutivo from "./portugues/ano3/aumentativo-diminutivo.md";
import ptAdverbios from "./portugues/ano4/adverbios.md";
import ptSujeitoPredicado from "./portugues/ano4/sujeito-predicado.md";
import ptReverTexto from "./portugues/ano4/rever-texto.md";
import ptPlanearTexto from "./portugues/ano4/planear-texto.md";
import ptConectores from "./portugues/ano4/conectores.md";
import ptRevisaoOrtografica from "./portugues/ano4/revisao-ortografica.md";
import pt5Resumo from "./portugues/ano5/fazer-resumo.md";
import pt5Descrever from "./portugues/ano5/descrever.md";

/* ---- Estudo do Meio ---- */
import edmCorpo from "./estudo-do-meio/ano1/o-meu-corpo.md";
import edmDias from "./estudo-do-meio/ano1/dias-da-semana.md";
import edmFamilia from "./estudo-do-meio/ano1/a-minha-familia.md";
import edmHigiene from "./estudo-do-meio/ano1/higiene-e-saude.md";
import edmEstacoes from "./estudo-do-meio/ano2/estacoes-do-ano.md";
import edmAnimais from "./estudo-do-meio/ano2/os-animais.md";
import edmAgua from "./estudo-do-meio/ano2/a-agua.md";
import edmPlantas from "./estudo-do-meio/ano3/as-plantas.md";
import edmPortugal from "./estudo-do-meio/ano3/portugal.md";
import edmEstados from "./estudo-do-meio/ano3/solidos-liquidos-gases.md";
import edmSistemaSolar from "./estudo-do-meio/ano4/sistema-solar.md";
import edmCorpoSistemas from "./estudo-do-meio/ano4/sistemas-do-corpo.md";
import edmHistoria from "./estudo-do-meio/ano4/historia-de-portugal.md";
// AE coverage — Estudo do Meio (wave 3)
import edmSentidos from "./estudo-do-meio/ano1/os-cinco-sentidos.md";
import edmSeguranca from "./estudo-do-meio/ano1/seguranca.md";
import edmSeresVivos from "./estudo-do-meio/ano2/seres-vivos.md";
import edmProfissoes from "./estudo-do-meio/ano2/profissoes.md";
import edmLocalidade from "./estudo-do-meio/ano2/a-minha-localidade.md";
import edmAlimentacao from "./estudo-do-meio/ano3/alimentacao-saudavel.md";
import edmEletricidade from "./estudo-do-meio/ano3/eletricidade-e-imanes.md";
import edmExperiencias from "./estudo-do-meio/ano3/experiencias.md";
import edmSegurancaRodoviaria from "./estudo-do-meio/ano3/seguranca-rodoviaria.md";
import edmAmbiente from "./estudo-do-meio/ano4/proteger-o-ambiente.md";
import edmMapas from "./estudo-do-meio/ano4/mapas-e-pontos-cardeais.md";
import edmReisDinastias from "./estudo-do-meio/ano4/reis-e-dinastias.md";
import edmRelevoClima from "./estudo-do-meio/ano4/relevo-clima-portugal.md";
import edmFreguesiaMunicipio from "./estudo-do-meio/ano4/freguesia-municipio.md";
import edmMapaLocalidade from "./estudo-do-meio/ano4/mapa-localidade.md";

/* ---- Inglês ---- */
import enHello from "./ingles/ano1/hello.md";
import enColours from "./ingles/ano1/colours.md";
import enNumbers from "./ingles/ano1/numbers.md";
import enAnimals from "./ingles/ano2/animals.md";
import enBody from "./ingles/ano2/my-body.md";
import enFamily from "./ingles/ano2/my-family.md";
import enFood from "./ingles/ano3/food.md";
import enToys from "./ingles/ano3/toys.md";
import enClothes from "./ingles/ano3/clothes.md";
import enDays from "./ingles/ano4/days-months.md";
import enWeather from "./ingles/ano4/weather.md";
import enTime from "./ingles/ano4/what-time-is-it.md";
// AE coverage — Inglês (wave 4)
import enNumbers20 from "./ingles/ano1/numbers-11-20.md";
import enFoodBasics from "./ingles/ano2/food-basics.md";
import enHouse from "./ingles/ano3/my-house.md";
import enJobs from "./ingles/ano4/jobs.md";
// AE coverage — Inglês (gaps: classroom, feelings, sports, nature, routines, directions, comparatives, travel)
import enClassroom from "./ingles/ano1/classroom.md";
import enFeelings from "./ingles/ano1/feelings.md";
import enSports from "./ingles/ano2/sports.md";
import enNature from "./ingles/ano2/nature.md";
import enRoutines from "./ingles/ano3/routines.md";
import enDirections from "./ingles/ano3/directions.md";
import enComparatives from "./ingles/ano4/comparatives.md";
import enTravel from "./ingles/ano4/travel.md";
import en5DialoguesListening from "./ingles/ano5/dialogues-listening.md";
import en5GuidedWriting from "./ingles/ano5/guided-writing.md";

/* ---- Cidadania e Desenvolvimento ---- */
import cidDireitos from "./cidadania/ano1/direitos-e-deveres.md";
import cidReciclar from "./cidadania/ano1/reciclar.md";
import cidDiferentes from "./cidadania/ano1/todos-diferentes.md";
import cidRegrasSala from "./cidadania/ano1/regras-sala.md";
import cidEcras from "./cidadania/ano1/ecras-com-cuidado.md";
import cidEmocoes from "./cidadania/ano2/emocoes.md";
import cidPoupar from "./cidadania/ano2/poupar.md";
import cidAjudar from "./cidadania/ano2/ajudar.md";
import cidInternet from "./cidadania/ano3/internet-segura.md";
import cidIgualdade from "./cidadania/ano3/igualdade.md";
import cidConsumir from "./cidadania/ano3/consumir.md";
import cidBullying from "./cidadania/ano3/bullying.md";
import cidSustentavel from "./cidadania/ano4/sustentavel.md";
import cidDemocracia from "./cidadania/ano4/democracia.md";
import cidSaude from "./cidadania/ano4/saude-bem-estar.md";
import cidParticiparTurma from "./cidadania/ano4/participar-turma.md";
import cidComputadorFicheiros from "./cidadania/ano4/computador-ficheiros.md";
import ticRatoTeclado from "./tic/ano2/rato-e-teclado.md";
import ticEscreverFormatar from "./tic/ano4/escrever-formatar.md";

/* ---- Educação Artística ---- */
import artCores from "./artistica/ano1/as-cores.md";
import artLinhas from "./artistica/ano1/linhas-e-formas.md";
import artSons from "./artistica/ano1/sons.md";
import artMisturar from "./artistica/ano2/misturar-cores.md";
import artInstrumentos from "./artistica/ano2/instrumentos.md";
import artFazDeConta from "./artistica/ano2/faz-de-conta.md";
import artTecnicas from "./artistica/ano3/tecnicas.md";
import artRitmo from "./artistica/ano3/ritmo.md";
import artDanca from "./artistica/ano3/danca.md";
import artPintores from "./artistica/ano4/pintores-famosos.md";
import artCompositores from "./artistica/ano4/compositores.md";
import artDancasMundo from "./artistica/ano4/dancas-do-mundo.md";

/* ---- Educação Física ---- */
import efMexer from "./fisica/ano1/mexer-o-corpo.md";
import efAquecer from "./fisica/ano1/aquecer-e-descansar.md";
import efJogos from "./fisica/ano1/jogos-e-brincadeiras.md";
import efEquilibrio from "./fisica/ano2/equilibrio-e-coordenacao.md";
import efTradicionais from "./fisica/ano2/jogos-tradicionais.md";
import efDesportivismo from "./fisica/ano2/desportivismo.md";
import efDesportos from "./fisica/ano3/desportos.md";
import efCorpo from "./fisica/ano3/corpo-em-exercicio.md";
import efGinastica from "./fisica/ano3/ginastica.md";
import efOlimpicos from "./fisica/ano4/jogos-olimpicos.md";
import efVidaAtiva from "./fisica/ano4/vida-ativa.md";
import efSeguranca from "./fisica/ano4/desporto-em-seguranca.md";

/* ---- O Mundo & Curiosidades (Açores → mundo) ---- */
import mundoAcores from "./mundo/ano1/os-acores.md";
import mundoVulcoes from "./mundo/ano1/vulcoes-e-lagoas.md";
import mundoMar from "./mundo/ano1/o-mar-e-os-animais.md";
import mundoIlha from "./mundo/ano1/o-que-e-uma-ilha.md";
import mundoLendas from "./mundo/ano1/lendas-das-sete-cidades.md";
import mundoSimbolosAcores from "./mundo/ano1/simbolos-dos-acores.md";
import mundoPortugal from "./mundo/ano2/portugal-de-ponta-a-ponta.md";
import mundoRegioes from "./mundo/ano2/regioes-autonomas.md";
import mundoComidas from "./mundo/ano2/comidas-e-tradicoes.md";
import mundoSimbolosPt from "./mundo/ano2/simbolos-de-portugal.md";
import mundoRios from "./mundo/ano2/rios-serras-cidades.md";
import mundoEuropa from "./mundo/ano3/a-europa.md";
import mundoAtlantico from "./mundo/ano3/o-oceano-atlantico.md";
import mundoDescob from "./mundo/ano3/os-descobrimentos.md";
import mundoVizinhos from "./mundo/ano3/paises-vizinhos.md";
import mundoAnimaisOceano from "./mundo/ano3/animais-do-oceano.md";
import mundoContinentes from "./mundo/ano4/continentes-e-oceanos.md";
import mundoFusos from "./mundo/ano4/fusos-e-hemisferios.md";
import mundoMaravilhas from "./mundo/ano4/maravilhas-do-mundo.md";
import mundoAnimaisCont from "./mundo/ano4/animais-dos-continentes.md";
import mundoBandeiras from "./mundo/ano4/bandeiras-do-mundo.md";

/* ---- Saber de cor (study/reference area — not grade-based) ---- */
import estudoTabuadas from "./estudo/tabuadas.md";
import estudoAlfabeto from "./estudo/alfabeto.md";
import estudoNumeros from "./estudo/numeros.md";
import estudoDinheiro from "./estudo/dinheiro.md";
import estudoLoja from "./estudo/loja.md";
import estudoDiasMeses from "./estudo/dias-e-meses.md";
// Saber de cor — novos temas (referência interativa, vários domínios)
import estudoPontuacao from "./estudo/pontuacao.md";
import estudoClasses from "./estudo/classes-palavras.md";
import estudoVerbos from "./estudo/verbos.md";
import estudoFormas from "./estudo/formas.md";
import estudoMedidas from "./estudo/medidas.md";
import estudoFormulas from "./estudo/formulas.md";
import estudoRomanos from "./estudo/romanos.md";
import estudoPlanetas from "./estudo/planetas.md";
import estudoContinentes from "./estudo/continentes.md";
import estudoPontosCardeais from "./estudo/pontos-cardeais.md";
import estudoDatas from "./estudo/datas-portugal.md";
import estudoDistritos from "./estudo/distritos.md";

/* ---- O Dicionário (reference area — by letter, not grade-based) ---- */
import dicA from "./dicionario/a.md";
import dicB from "./dicionario/b.md";
import dicC from "./dicionario/c.md";
import dicD from "./dicionario/d.md";
import dicE from "./dicionario/e.md";
import dicF from "./dicionario/f.md";
import dicG from "./dicionario/g.md";
import dicH from "./dicionario/h.md";
import dicI from "./dicionario/i.md";
import dicJ from "./dicionario/j.md";
import dicK from "./dicionario/k.md";
import dicL from "./dicionario/l.md";
import dicM from "./dicionario/m.md";
import dicN from "./dicionario/n.md";
import dicO from "./dicionario/o.md";
import dicP from "./dicionario/p.md";
import dicQ from "./dicionario/q.md";
import dicR from "./dicionario/r.md";
import dicS from "./dicionario/s.md";
import dicT from "./dicionario/t.md";
import dicU from "./dicionario/u.md";
import dicV from "./dicionario/v.md";
import dicW from "./dicionario/w.md";
import dicX from "./dicionario/x.md";
import dicY from "./dicionario/y.md";
import dicZ from "./dicionario/z.md";

/* ---- Países (get-to-know-a-country area — not grade-based) ---- */
import paisesPtPais from "./paises/portugal/o-pais.md";
import paisesPtBandeira from "./paises/portugal/bandeira-e-simbolos.md";
import paisesPtHino from "./paises/portugal/o-hino.md";
import paisesPtComida from "./paises/portugal/comida-e-tradicoes.md";
import paisesPtNatureza from "./paises/portugal/natureza-e-animais.md";
import paisesPtCuriosidades from "./paises/portugal/curiosidades-e-recordes.md";
import paisesCaPais from "./paises/canada/o-pais.md";
import paisesCaBandeira from "./paises/canada/bandeira-e-simbolos.md";
import paisesCaHino from "./paises/canada/o-hino.md";
import paisesCaComida from "./paises/canada/comida-e-tradicoes.md";
import paisesCaNatureza from "./paises/canada/natureza-e-animais.md";
import paisesCaCuriosidades from "./paises/canada/curiosidades-e-recordes.md";

/* ---- 2.º ciclo (5.º–6.º) lesson bodies — filled in as lessons are written ---- */
// Matemática 5.º
import mat5Naturais from "./matematica/ano5/naturais.md";
import mat5MdcMmc from "./matematica/ano5/mdc-mmc.md";
import mat5Fracoes from "./matematica/ano5/fracoes.md";
import mat5Decimais from "./matematica/ano5/decimais.md";
import mat5Potencias from "./matematica/ano5/potencias.md";
import mat5AngulosPoligonos from "./matematica/ano5/angulos-poligonos.md";
import mat5AreaPerimetro from "./matematica/ano5/area-perimetro.md";
import mat5Solidos from "./matematica/ano5/solidos.md";
import mat5Dados from "./matematica/ano5/dados.md";
// Português 5.º
import pt5Oralidade from "./portugues/ano5/oralidade.md";
import pt5NarrativoLer from "./portugues/ano5/narrativo-ler.md";
import pt5NarrativoEscrever from "./portugues/ano5/narrativo-escrever.md";
import pt5Classes from "./portugues/ano5/classes.md";
import pt5Verbos from "./portugues/ano5/verbos.md";
import pt5Funcoes from "./portugues/ano5/funcoes.md";
import pt5Ortografia from "./portugues/ano5/ortografia.md";
import pt5Poesia from "./portugues/ano5/poesia.md";
import pt5Literaria from "./portugues/ano5/literaria.md";
// Inglês 5.º
import en5Greetings from "./ingles/ano5/greetings.md";
import en5Personal from "./ingles/ano5/personal.md";
import en5Family from "./ingles/ano5/family.md";
import en5School from "./ingles/ano5/school.md";
import en5Routines from "./ingles/ano5/routines.md";
import en5PresentSimple from "./ingles/ano5/present-simple.md";
import en5Hobbies from "./ingles/ano5/hobbies.md";
import en5Food from "./ingles/ano5/food.md";
// Ciências Naturais 5.º
import cn5Agua from "./ciencias/ano5/agua.md";
import cn5Ar from "./ciencias/ano5/ar.md";
import cn5RochasSolo from "./ciencias/ano5/rochas-solo.md";
import cn5AnimaisDiversidade from "./ciencias/ano5/animais-diversidade.md";
import cn5AnimaisFuncoes from "./ciencias/ano5/animais-funcoes.md";
import cn5Plantas from "./ciencias/ano5/plantas.md";
import cn5Ecossistemas from "./ciencias/ano5/ecossistemas.md";
// História e Geografia de Portugal 5.º
import hgp5PrimeirosPovos from "./hgp/ano5/primeiros-povos.md";
import hgp5Romanos from "./hgp/ano5/romanos.md";
import hgp5Muculmanos from "./hgp/ano5/muculmanos.md";
import hgp5Formacao from "./hgp/ano5/formacao.md";
import hgp5Consolidacao from "./hgp/ano5/consolidacao.md";
import hgp5Crise1383 from "./hgp/ano5/crise-1383.md";
import hgp5Sociedade from "./hgp/ano5/sociedade.md";
// Educação Visual 5.º
import ev5PontoLinha from "./ed-visual/ano5/ponto-linha.md";
import ev5Cor from "./ed-visual/ano5/cor.md";
import ev5Formas from "./ed-visual/ano5/formas.md";
import ev5Textura from "./ed-visual/ano5/textura.md";
import ev5Comunicacao from "./ed-visual/ano5/comunicacao.md";
import ev5Geometria from "./ed-visual/ano5/geometria.md";
// Educação Tecnológica 5.º
import et5OQueE from "./ed-tecnologica/ano5/o-que-e.md";
import et5Materiais from "./ed-tecnologica/ano5/materiais.md";
import et5Medicao from "./ed-tecnologica/ano5/medicao.md";
import et5Seguranca from "./ed-tecnologica/ano5/seguranca.md";
import et5Estruturas from "./ed-tecnologica/ano5/estruturas.md";
import et5Projeto from "./ed-tecnologica/ano5/projeto.md";
// Educação Musical 5.º
import em5SomSilencio from "./ed-musical/ano5/som-silencio.md";
import em5Ritmo from "./ed-musical/ano5/ritmo.md";
import em5Melodia from "./ed-musical/ano5/melodia.md";
import em5Notas from "./ed-musical/ano5/notas.md";
import em5Dinamica from "./ed-musical/ano5/dinamica.md";
import em5Instrumentos from "./ed-musical/ano5/instrumentos.md";
// Educação Física 5.º
import ef5Aptidao from "./fisica/ano5/aptidao.md";
import ef5Ginastica from "./fisica/ano5/ginastica.md";
import ef5Coletivos from "./fisica/ano5/coletivos.md";
import ef5Atletismo from "./fisica/ano5/atletismo.md";
import ef5Raquetas from "./fisica/ano5/raquetas.md";
import ef5Fairplay from "./fisica/ano5/fairplay.md";
// Cidadania 5.º
import cid5DireitosHumanos from "./cidadania/ano5/direitos-humanos.md";
import cid5Igualdade from "./cidadania/ano5/igualdade.md";
import cid5Intercultural from "./cidadania/ano5/intercultural.md";
import cid5Saude from "./cidadania/ano5/saude.md";
import cid5Ambiente from "./cidadania/ano5/ambiente.md";
import cid5TicPesquisa from "./cidadania/ano5/tic-pesquisa.md";
import cid5DemocraciaInstituicoes from "./cidadania/ano5/democracia-instituicoes.md";
import tic5Apresentacoes from "./tic/ano5/apresentacoes.md";
import tic5Email from "./tic/ano5/email-mensagens.md";
import tic5DireitosAutor from "./tic/ano5/direitos-autor.md";
// ---- 6.º ano ----
// Matemática 6.º
import mat6Inteiros from "./matematica/ano6/inteiros.md";
import mat6FracoesOperacoes from "./matematica/ano6/fracoes-operacoes.md";
import mat6Potencias from "./matematica/ano6/potencias.md";
import mat6Proporcionalidade from "./matematica/ano6/proporcionalidade.md";
import mat6Percentagens from "./matematica/ano6/percentagens.md";
import mat6Equacoes from "./matematica/ano6/equacoes.md";
import mat6Circulo from "./matematica/ano6/circulo.md";
import mat6Volumes from "./matematica/ano6/volumes.md";
import mat6Graficos from "./matematica/ano6/graficos.md";
// Português 6.º
import pt6Descritivo from "./portugues/ano6/descritivo.md";
import pt6NoticiaEntrevista from "./portugues/ano6/noticia-entrevista.md";
import pt6Classes from "./portugues/ano6/classes.md";
import pt6Sintaxe from "./portugues/ano6/sintaxe.md";
import pt6Verbos from "./portugues/ano6/verbos.md";
import pt6GrauNome from "./portugues/ano6/grau-nome.md";
import pt6Teatro from "./portugues/ano6/teatro.md";
import pt6Recursos from "./portugues/ano6/recursos.md";
import pt6Literaria from "./portugues/ano6/literaria.md";
// Inglês 6.º
import en6PresentContinuous from "./ingles/ano6/present-continuous.md";
import en6PastSimple from "./ingles/ano6/past-simple.md";
import en6Town from "./ingles/ano6/town.md";
import en6Travel from "./ingles/ano6/travel.md";
import en6Comparatives from "./ingles/ano6/comparatives.md";
import en6Shopping from "./ingles/ano6/shopping.md";
import en6Health from "./ingles/ano6/health.md";
import en6Future from "./ingles/ano6/future.md";
import en6QuestionsAnswers from "./ingles/ano6/questions-answers.md";
// Ciências Naturais 6.º
import cn6Microorganismos from "./ciencias/ano6/microorganismos.md";
import cn6Digestivo from "./ciencias/ano6/digestivo.md";
import cn6Respiratorio from "./ciencias/ano6/respiratorio.md";
import cn6Circulatorio from "./ciencias/ano6/circulatorio.md";
import cn6Excretor from "./ciencias/ano6/excretor.md";
import cn6Reproducao from "./ciencias/ano6/reproducao.md";
import cn6Saude from "./ciencias/ano6/saude.md";
import cn6MapaSistemas from "./ciencias/ano6/mapa-sistemas-corpo.md";
// História e Geografia de Portugal 6.º
import hgp6Descobrimentos from "./hgp/ano6/descobrimentos.md";
import hgp6Imperio from "./hgp/ano6/imperio.md";
import hgp6Restauracao from "./hgp/ano6/restauracao.md";
import hgp6Dinastias from "./hgp/ano6/dinastias.md";
import hgp6Pombal from "./hgp/ano6/pombal.md";
import hgp6Liberalismo from "./hgp/ano6/liberalismo.md";
import hgp6Republica from "./hgp/ano6/republica.md";
import hgp6EstadoNovo from "./hgp/ano6/estado-novo.md";
import hgp6Democracia from "./hgp/ano6/democracia.md";
import hgp6ReisMonumentos from "./hgp/ano6/reis-monumentos.md";
// Educação Visual 6.º
import ev6LuzSombra from "./ed-visual/ano6/luz-sombra.md";
import ev6Volume from "./ed-visual/ano6/volume.md";
import ev6Padrao from "./ed-visual/ano6/padrao.md";
import ev6CorHarmonias from "./ed-visual/ano6/cor-harmonias.md";
import ev6Design from "./ed-visual/ano6/design.md";
import ev6Patrimonio from "./ed-visual/ano6/patrimonio.md";
import ev6Perspetiva from "./ed-visual/ano6/perspetiva-profundidade.md";
// Educação Tecnológica 6.º
import et6Mecanismos from "./ed-tecnologica/ano6/mecanismos.md";
import et6Energia from "./ed-tecnologica/ano6/energia.md";
import et6Eletricidade from "./ed-tecnologica/ano6/eletricidade.md";
import et6Reciclar from "./ed-tecnologica/ano6/reciclar.md";
import et6Comunicacao from "./ed-tecnologica/ano6/comunicacao.md";
import et6Fabrico from "./ed-tecnologica/ano6/fabrico.md";
import et6ProjetoTecnico from "./ed-tecnologica/ano6/projeto-tecnico.md";
// Educação Musical 6.º
import em6Forma from "./ed-musical/ano6/forma.md";
import em6Escala from "./ed-musical/ano6/escala.md";
import em6Harmonia from "./ed-musical/ano6/harmonia.md";
import em6Generos from "./ed-musical/ano6/generos.md";
import em6Portuguesa from "./ed-musical/ano6/portuguesa.md";
import em6Criar from "./ed-musical/ano6/criar.md";
// Educação Física 6.º
import ef6Condicao from "./fisica/ano6/condicao.md";
import ef6Aparelhos from "./fisica/ano6/aparelhos.md";
import ef6Voleibol from "./fisica/ano6/voleibol.md";
import ef6Atletismo from "./fisica/ano6/atletismo.md";
import ef6Danca from "./fisica/ano6/danca.md";
import ef6Natureza from "./fisica/ano6/natureza.md";
// Cidadania 6.º
import cid6Financeira from "./cidadania/ano6/financeira.md";
import cid6Protecao from "./cidadania/ano6/protecao.md";
import cid6Media from "./cidadania/ano6/media.md";
import cid6Voluntariado from "./cidadania/ano6/voluntariado.md";
import cid6Sustentavel from "./cidadania/ano6/sustentavel.md";
import cid6Privacidade from "./cidadania/ano6/privacidade-palavras-passe.md";
import tic6Programacao from "./tic/ano6/programacao-simples.md";
import tic6FolhaCalculo from "./tic/ano6/folha-calculo.md";

/* The four school subjects, navigated year-first (1.º–4.º ano). */
export const schoolSubjects: Subject[] = [
  {
    id: "matematica",
    label: "Matemática",
    emoji: "🔢",
    color: "var(--subj-mat)",
    colorSoft: "var(--subj-mat-soft)",
    blurb: "Números, contas, formas e medidas — a brincar!",
    years: {
      1: [
        { id: "mat-1-numeros-10", title: "Números até 10", emoji: "🔟", body: matNumeros10 },
        { id: "mat-1-numeros-20", title: "Números até 20", emoji: "✋", body: matNumeros20 },
        { id: "mat-1-somar", title: "Somar e subtrair", emoji: "➕", body: matSomar },
        { id: "mat-1-formas", title: "Formas geométricas", emoji: "🔺", body: matFormas },
        { id: "mat-1-tempo", title: "Antes e depois, dia e noite", emoji: "🌗", body: matTempo },
        { id: "mat-1-comparar", title: "Comparar e ordenar números", emoji: "⚖️", body: matComparar },
        { id: "mat-1-ordinais", title: "Primeiro, segundo, terceiro…", emoji: "🏅", body: matOrdinais },
        { id: "mat-1-dobro-metade", title: "Dobro e metade", emoji: "✌️", body: matDobroMetade },
      ],
      2: [
        { id: "mat-2-tabuada", title: "Tabuada do 2 e do 5", emoji: "✖️", body: matTabuada },
        { id: "mat-2-tabuada-3-4-10", title: "Tabuada do 3, do 4 e do 10", emoji: "✖️", body: matTabuada34 },
        { id: "mat-2-numeros-100", title: "Números até 100", emoji: "💯", body: matNumeros100 },
        { id: "mat-2-par-impar", title: "Pares e ímpares", emoji: "🔢", body: matParImpar },
        { id: "mat-2-dinheiro", title: "O dinheiro (euros)", emoji: "💶", body: matDinheiro },
        { id: "mat-2-horas", title: "As horas no relógio", emoji: "🕐", body: matHoras },
        { id: "mat-2-solidos", title: "Sólidos geométricos", emoji: "🧊", body: matSolidos },
        { id: "mat-2-padroes", title: "Sequências e padrões", emoji: "🔁", body: matPadroes },
        { id: "mat-2-simetria", title: "Simetria e eixos", emoji: "🦋", body: matSimetria },
        { id: "mat-2-problemas", title: "Resolver probleminhas", emoji: "🧩", body: matProbleminhas },
      ],
      3: [
        { id: "mat-3-numeros-1000", title: "Números até 1000", emoji: "💯", body: matNumeros1000 },
        { id: "mat-3-multiplicacao", title: "A multiplicação", emoji: "✖️", body: matMultiplicacao },
        { id: "mat-3-multiplos", title: "Múltiplos e tabuadas", emoji: "✖️", body: matMultiplos },
        { id: "mat-3-divisao", title: "A divisão", emoji: "➗", body: matDivisao },
        { id: "mat-3-fracoes", title: "Frações simples", emoji: "🍕", body: matFracoes },
        { id: "mat-3-medida", title: "Comprimento e massa", emoji: "📏", body: matMedida },
        { id: "mat-3-dados", title: "Recolher e organizar dados", emoji: "📋", body: matDadosTabelas },
        { id: "mat-3-calendario", title: "O calendário e o tempo", emoji: "📅", body: matCalendario },
        { id: "mat-3-romanos", title: "Numerais romanos", emoji: "🏛️", body: matRomanos },
      ],
      4: [
        { id: "mat-4-numeros-milhao", title: "Números até ao milhão", emoji: "🔢", body: matMilhao },
        { id: "mat-4-estimar", title: "Estimar e arredondar", emoji: "🎯", body: matEstimar },
        { id: "mat-4-decimais", title: "Números decimais", emoji: "🔢", body: matDecimais },
        { id: "mat-4-fracoes-decimais", title: "Frações e decimais", emoji: "🍕", body: matFracDec },
        { id: "mat-4-calculo-mental", title: "Cálculo mental", emoji: "🧠", body: matCalculoMental },
        { id: "mat-4-area", title: "Área e perímetro", emoji: "📐", body: matArea },
        { id: "mat-4-angulos", title: "Ângulos e retas", emoji: "📐", body: matAngulos },
        { id: "mat-4-volume", title: "Volume e capacidade", emoji: "🧴", body: matVolume },
        { id: "mat-4-dados", title: "Gráficos e tabelas", emoji: "📊", body: matDados },
        { id: "mat-4-problemas", title: "Resolver problemas", emoji: "🧩", body: matProblemas },
      ],
      5: [
        { id: "mat-5-naturais", title: "Números naturais e operações", emoji: "🔢", body: mat5Naturais },
        { id: "mat-5-mdc-mmc", title: "Múltiplos, divisores, m.d.c. e m.m.c.", emoji: "🔗", body: mat5MdcMmc },
        { id: "mat-5-fracoes", title: "Frações: comparar e operar", emoji: "🍕", body: mat5Fracoes },
        { id: "mat-5-decimais", title: "Números racionais não negativos", emoji: "🔟", body: mat5Decimais },
        { id: "mat-5-potencias", title: "Potências de base 10", emoji: "⏫", body: mat5Potencias },
        { id: "mat-5-angulos-poligonos", title: "Ângulos e polígonos", emoji: "📐", body: mat5AngulosPoligonos },
        { id: "mat-5-area-perimetro", title: "Perímetros e áreas", emoji: "🟦", body: mat5AreaPerimetro },
        { id: "mat-5-solidos", title: "Sólidos geométricos", emoji: "🧊", body: mat5Solidos },
        { id: "mat-5-dados", title: "Organização e tratamento de dados", emoji: "📊", body: mat5Dados },
        { id: "mat-5-problemas-varios-passos", title: "Problemas de vários passos", emoji: "🧩", body: mat5ProblemasVariosPassos },
        { id: "mat-5-dados-a-mais", title: "Problemas com dados a mais ou em falta", emoji: "🔎", body: mat5DadosAMais },
      ],
      6: [
        { id: "mat-6-inteiros", title: "Números inteiros relativos", emoji: "➖", body: mat6Inteiros },
        { id: "mat-6-fracoes-operacoes", title: "Multiplicar e dividir frações", emoji: "✖️", body: mat6FracoesOperacoes },
        { id: "mat-6-potencias", title: "Potências e expressões numéricas", emoji: "⏫", body: mat6Potencias },
        { id: "mat-6-proporcionalidade", title: "Proporcionalidade direta", emoji: "⚖️", body: mat6Proporcionalidade },
        { id: "mat-6-percentagens", title: "Percentagens", emoji: "💯", body: mat6Percentagens },
        { id: "mat-6-equacoes", title: "Expressões e equações", emoji: "🟰", body: mat6Equacoes },
        { id: "mat-6-circulo", title: "Circunferência e círculo", emoji: "⭕", body: mat6Circulo },
        { id: "mat-6-volumes", title: "Volumes de sólidos", emoji: "📦", body: mat6Volumes },
        { id: "mat-6-graficos", title: "Representar e interpretar dados", emoji: "📈", body: mat6Graficos },
      ],
    },
  },
  {
    id: "portugues",
    label: "Português",
    emoji: "📖",
    color: "var(--subj-pt)",
    colorSoft: "var(--subj-pt-soft)",
    blurb: "Letras, sons, ler e escrever histórias.",
    years: {
      1: [
        { id: "pt-1-vogais", title: "As vogais", emoji: "🅰️", body: ptVogais },
        { id: "pt-1-silabas", title: "As sílabas", emoji: "👏", body: ptSilabas },
        { id: "pt-1-maiusculas", title: "Letra grande e pequena", emoji: "🔠", body: ptMaiuscula },
        { id: "pt-1-primeiras-palavras", title: "As primeiras palavras", emoji: "🔡", body: ptPrimeirasPalavras },
        { id: "pt-1-ler-frases", title: "Ler as primeiras frases", emoji: "📖", body: ptLerFrases },
        { id: "pt-1-rimas", title: "Rimas e lengalengas", emoji: "🎵", body: ptRimas },
        { id: "pt-1-ouvir-falar", title: "Saber ouvir e falar", emoji: "👂", body: ptOuvirFalar },
        { id: "pt-1-contos", title: "Os contos tradicionais", emoji: "📖", body: ptContos },
        { id: "pt-1-masculino-feminino", title: "Masculino e feminino", emoji: "👫", body: ptMascFem },
        { id: "pt-1-palavras-dia", title: "Palavras do dia a dia", emoji: "🗂️", body: ptPalavrasDia },
        { id: "pt-1-ditongos", title: "Ditongos: dois sons juntos", emoji: "🔊", body: ptDitongos },
      ],
      2: [
        { id: "pt-2-pontuacao", title: "Sinais de pontuação", emoji: "❓", body: ptPontuacao },
        { id: "pt-2-tipos-frase", title: "Frases que perguntam e exclamam", emoji: "❗", body: ptTiposFrase },
        { id: "pt-2-ler-expressao", title: "Ler com ritmo e expressão", emoji: "🎭", body: ptLerExpressao },
        { id: "pt-2-nome-verbo", title: "Nome e ação", emoji: "🏃", body: ptNomeAcao },
        { id: "pt-2-singular-plural", title: "Singular e plural", emoji: "👥", body: ptSingularPlural },
        { id: "pt-2-silaba-tonica", title: "A sílaba mais forte", emoji: "👏", body: ptSilabaTonica },
        { id: "pt-2-recontar", title: "Contar e recontar uma história", emoji: "🗣️", body: ptRecontar },
        { id: "pt-2-poemas", title: "Poemas e lengalengas", emoji: "🎵", body: ptPoemas },
        { id: "pt-2-digrafos", title: "Dígrafos (ch, lh, nh)", emoji: "🤝", body: ptDigrafos },
        { id: "pt-2-adjetivos", title: "Como é? Os adjetivos", emoji: "🎨", body: ptAdjetivos2 },
        { id: "pt-2-artigos", title: "Artigos: o, a, um, uma", emoji: "🔤", body: ptArtigos },
        { id: "pt-2-ordem-alfabetica", title: "Ordem alfabética e o dicionário", emoji: "🔤", body: ptOrdemAlfabetica },
      ],
      3: [
        { id: "pt-3-sinonimos", title: "Sinónimos e antónimos", emoji: "🔁", body: ptSinonimos },
        { id: "pt-3-familia-palavras", title: "Família de palavras", emoji: "🌳", body: ptFamilia },
        { id: "pt-3-tempos-verbais", title: "Ontem, hoje e amanhã", emoji: "⏳", body: ptTempos },
        { id: "pt-3-texto", title: "Escrever um texto", emoji: "✍️", body: ptTexto },
        { id: "pt-3-leitura-compreensao", title: "Compreender o que leio", emoji: "🔍", body: ptCompreensao },
        { id: "pt-3-fabulas", title: "As fábulas e a moral", emoji: "🦊", body: ptFabulas },
        { id: "pt-3-falar-publico", title: "Falar para os outros", emoji: "🎤", body: ptFalarPublico },
        { id: "pt-3-sons-do-s", title: "Os sons do «s»", emoji: "🐍", body: ptSonsDoS },
        { id: "pt-3-pronomes", title: "Pronomes: trocar o nome", emoji: "👤", body: ptPronomes },
        { id: "pt-3-homofonos", title: "Palavras que confundem", emoji: "🎭", body: ptHomofonos },
        { id: "pt-3-discurso-direto", title: "O discurso direto", emoji: "💬", body: ptDiscursoDireto },
        { id: "pt-3-aumentativo-diminutivo", title: "Aumentativo e diminutivo", emoji: "🔍", body: ptAumentativoDiminutivo },
      ],
      4: [
        { id: "pt-4-classes", title: "Classes de palavras", emoji: "🧩", body: ptClasses },
        { id: "pt-4-graus-adjetivo", title: "Adjetivos: comparar qualidades", emoji: "🌟", body: ptAdjetivo },
        { id: "pt-4-tipos-texto", title: "Tipos de texto", emoji: "📝", body: ptTiposTexto },
        { id: "pt-4-carta", title: "Escrever uma carta e um convite", emoji: "✉️", body: ptCarta },
        { id: "pt-4-acentos", title: "Acentos e ortografia", emoji: "´", body: ptAcentos },
        { id: "pt-4-autores", title: "Histórias e autores portugueses", emoji: "✍️", body: ptAutores },
        { id: "pt-4-debater", title: "Ouvir, opinar e debater", emoji: "💬", body: ptDebater },
        { id: "pt-4-prefixos-sufixos", title: "Prefixos e sufixos", emoji: "🧱", body: ptPrefixos },
        { id: "pt-4-frase-complexa", title: "Frase simples e frase complexa", emoji: "🔗", body: ptFraseComplexa },
        { id: "pt-4-noticia", title: "A notícia", emoji: "📰", body: ptNoticia },
        { id: "pt-4-hifen-x", title: "O hífen e o «x»", emoji: "✖️", body: ptHifenX },
        { id: "pt-4-adverbios", title: "Os advérbios", emoji: "🏃", body: ptAdverbios },
        { id: "pt-4-sujeito-predicado", title: "Sujeito e predicado", emoji: "🧱", body: ptSujeitoPredicado },
        { id: "pt-4-planear-texto", title: "Como planear um texto", emoji: "📝", body: ptPlanearTexto },
        { id: "pt-4-conectores", title: "Conectores: ligar ideias", emoji: "🔗", body: ptConectores },
        { id: "pt-4-rever-texto", title: "Rever e melhorar um texto", emoji: "✍️", body: ptReverTexto },
        { id: "pt-4-revisao-ortografica", title: "Revisão ortográfica com checklist", emoji: "🔍", body: ptRevisaoOrtografica },
      ],
      5: [
        { id: "pt-5-oralidade", title: "Ouvir, falar e apresentar", emoji: "🗣️", body: pt5Oralidade },
        { id: "pt-5-narrativo-ler", title: "Ler textos narrativos", emoji: "📖", body: pt5NarrativoLer },
        { id: "pt-5-narrativo-escrever", title: "Escrever uma narrativa", emoji: "✍️", body: pt5NarrativoEscrever },
        { id: "pt-5-classes", title: "Classes de palavras", emoji: "🧩", body: pt5Classes },
        { id: "pt-5-verbos", title: "Os verbos: tempos e modos", emoji: "⏳", body: pt5Verbos },
        { id: "pt-5-funcoes", title: "Funções sintáticas", emoji: "🔗", body: pt5Funcoes },
        { id: "pt-5-ortografia", title: "Ortografia e acentuação", emoji: "🔤", body: pt5Ortografia },
        { id: "pt-5-resumo", title: "Fazer um resumo", emoji: "✂️", body: pt5Resumo },
        { id: "pt-5-descrever", title: "Descrever pessoas, lugares e objetos", emoji: "🖼️", body: pt5Descrever },
        { id: "pt-5-poesia", title: "O texto poético", emoji: "🎵", body: pt5Poesia },
        { id: "pt-5-literaria", title: "Educação Literária: autores", emoji: "📚", body: pt5Literaria },
      ],
      6: [
        { id: "pt-6-descritivo", title: "Texto descritivo e narrativo", emoji: "🖼️", body: pt6Descritivo },
        { id: "pt-6-noticia-entrevista", title: "Notícia e entrevista", emoji: "📰", body: pt6NoticiaEntrevista },
        { id: "pt-6-classes", title: "Classes de palavras (II)", emoji: "🧩", body: pt6Classes },
        { id: "pt-6-sintaxe", title: "A frase e as suas funções", emoji: "🔗", body: pt6Sintaxe },
        { id: "pt-6-verbos", title: "Conjugar verbos", emoji: "⏳", body: pt6Verbos },
        { id: "pt-6-grau-nome", title: "Nome, grau e flexão", emoji: "🔤", body: pt6GrauNome },
        { id: "pt-6-teatro", title: "O texto dramático", emoji: "🎭", body: pt6Teatro },
        { id: "pt-6-recursos", title: "Poesia e recursos expressivos", emoji: "✨", body: pt6Recursos },
        { id: "pt-6-literaria", title: "Educação Literária: clássicos", emoji: "📚", body: pt6Literaria },
      ],
    },
  },
  {
    id: "estudo-do-meio",
    label: "Estudo do Meio",
    emoji: "🌍",
    color: "var(--subj-edm)",
    colorSoft: "var(--subj-edm-soft)",
    blurb: "O teu corpo, a natureza, o mundo à tua volta.",
    years: {
      1: [
        { id: "edm-1-corpo", title: "O meu corpo", emoji: "🧍", body: edmCorpo },
        { id: "edm-1-sentidos", title: "Os cinco sentidos", emoji: "👀", body: edmSentidos },
        { id: "edm-1-dias", title: "Os dias da semana", emoji: "📅", body: edmDias },
        { id: "edm-1-familia", title: "A minha família", emoji: "👨‍👩‍👧", body: edmFamilia },
        { id: "edm-1-higiene", title: "Higiene e saúde", emoji: "🪥", body: edmHigiene },
        { id: "edm-1-seguranca", title: "Estar seguro", emoji: "🦺", body: edmSeguranca },
      ],
      2: [
        { id: "edm-2-seres-vivos", title: "Seres vivos e não vivos", emoji: "🌱", body: edmSeresVivos },
        { id: "edm-2-estacoes", title: "As estações do ano", emoji: "🍂", body: edmEstacoes },
        { id: "edm-2-animais", title: "Os animais", emoji: "🐾", body: edmAnimais },
        { id: "edm-2-agua", title: "A água", emoji: "💧", body: edmAgua },
        { id: "edm-2-profissoes", title: "As profissões", emoji: "👷", body: edmProfissoes },
        { id: "edm-2-localidade", title: "A minha localidade e as suas festas", emoji: "🏘️", body: edmLocalidade },
      ],
      3: [
        { id: "edm-3-plantas", title: "As plantas", emoji: "🌻", body: edmPlantas },
        { id: "edm-3-alimentacao", title: "Alimentação saudável", emoji: "🥗", body: edmAlimentacao },
        { id: "edm-3-portugal", title: "Portugal: o meu país", emoji: "🇵🇹", body: edmPortugal },
        { id: "edm-3-solidos-liquidos", title: "Sólidos, líquidos e gases", emoji: "🧊", body: edmEstados },
        { id: "edm-3-eletricidade", title: "Eletricidade e ímanes", emoji: "🧲", body: edmEletricidade },
        { id: "edm-3-experiencias", title: "Vamos fazer experiências!", emoji: "🔬", body: edmExperiencias },
        { id: "edm-3-seguranca-rodoviaria", title: "Segurança rodoviária", emoji: "🚦", body: edmSegurancaRodoviaria },
      ],
      4: [
        { id: "edm-4-sistema-solar", title: "O sistema solar", emoji: "🪐", body: edmSistemaSolar },
        { id: "edm-4-corpo-sistemas", title: "Os sistemas do corpo", emoji: "❤️", body: edmCorpoSistemas },
        { id: "edm-4-ambiente", title: "Proteger o ambiente", emoji: "♻️", body: edmAmbiente },
        { id: "edm-4-mapas", title: "Mapas e pontos cardeais", emoji: "🧭", body: edmMapas },
        { id: "edm-4-mapa-localidade", title: "Mapa da localidade e orientação", emoji: "🗺️", body: edmMapaLocalidade },
        { id: "edm-4-freguesia-municipio", title: "Freguesia, município e participação local", emoji: "🏘️", body: edmFreguesiaMunicipio },
        { id: "edm-4-relevo-clima", title: "Relevo e clima de Portugal", emoji: "🏞️", body: edmRelevoClima },
        { id: "edm-4-historia", title: "História de Portugal", emoji: "🏰", body: edmHistoria },
        { id: "edm-4-reis-dinastias", title: "Reis e famílias reais", emoji: "👑", body: edmReisDinastias },
      ],
      // Estudo do Meio is a 1.º-ciclo subject — in 5.º/6.º it splits into
      // Ciências Naturais + História e Geografia de Portugal (see below).
      5: [],
      6: [],
    },
  },
  {
    id: "ingles",
    label: "Inglês",
    emoji: "🇬🇧",
    color: "var(--subj-en)",
    colorSoft: "var(--subj-en-soft)",
    blurb: "First words in English — hello, colours and more!",
    years: {
      1: [
        { id: "en-1-hello", title: "Hello! Greetings", emoji: "👋", body: enHello },
        { id: "en-1-colours", title: "Colours", emoji: "🌈", body: enColours },
        { id: "en-1-numbers", title: "Numbers 1–10", emoji: "🔢", body: enNumbers },
        { id: "en-1-numbers-20", title: "Numbers 11–20", emoji: "🔢", body: enNumbers20 },
        { id: "en-1-classroom", title: "In the classroom", emoji: "🎒", body: enClassroom },
        { id: "en-1-feelings", title: "Feelings", emoji: "😀", body: enFeelings },
      ],
      2: [
        { id: "en-2-animals", title: "Animals", emoji: "🐶", body: enAnimals },
        { id: "en-2-body", title: "My body", emoji: "🖐️", body: enBody },
        { id: "en-2-family", title: "My family", emoji: "👪", body: enFamily },
        { id: "en-2-food", title: "Food & drinks", emoji: "🍎", body: enFoodBasics },
        { id: "en-2-sports", title: "Sports", emoji: "⚽", body: enSports },
        { id: "en-2-nature", title: "Nature", emoji: "🌳", body: enNature },
      ],
      3: [
        { id: "en-3-food", title: "Food", emoji: "🍎", body: enFood },
        { id: "en-3-house", title: "My house", emoji: "🏠", body: enHouse },
        { id: "en-3-toys", title: "Toys", emoji: "🧸", body: enToys },
        { id: "en-3-clothes", title: "Clothes", emoji: "👕", body: enClothes },
        { id: "en-3-routines", title: "Daily routines", emoji: "⏰", body: enRoutines },
        { id: "en-3-directions", title: "Directions", emoji: "🧭", body: enDirections },
      ],
      4: [
        { id: "en-4-days", title: "Days & months", emoji: "📆", body: enDays },
        { id: "en-4-jobs", title: "Jobs", emoji: "👩‍🏫", body: enJobs },
        { id: "en-4-weather", title: "Weather", emoji: "☀️", body: enWeather },
        { id: "en-4-time", title: "What time is it?", emoji: "⏰", body: enTime },
        { id: "en-4-comparatives", title: "Comparatives", emoji: "📏", body: enComparatives },
        { id: "en-4-travel", title: "Travel & transport", emoji: "✈️", body: enTravel },
      ],
      5: [
        { id: "en-5-greetings", title: "Greetings & introductions", emoji: "👋", body: en5Greetings },
        { id: "en-5-personal", title: "Personal information", emoji: "🪪", body: en5Personal },
        { id: "en-5-family", title: "Family & friends", emoji: "👪", body: en5Family },
        { id: "en-5-school", title: "School subjects", emoji: "🎒", body: en5School },
        { id: "en-5-routines", title: "Daily routines", emoji: "⏰", body: en5Routines },
        { id: "en-5-present-simple", title: "Present simple", emoji: "🔁", body: en5PresentSimple },
        { id: "en-5-dialogues-listening", title: "Short dialogues and listening practice", emoji: "🎧", body: en5DialoguesListening },
        { id: "en-5-guided-writing", title: "Guided writing: short texts", emoji: "✍️", body: en5GuidedWriting },
        { id: "en-5-hobbies", title: "Hobbies & free time", emoji: "🎮", body: en5Hobbies },
        { id: "en-5-food", title: "Food & meals", emoji: "🍽️", body: en5Food },
      ],
      6: [
        { id: "en-6-present-continuous", title: "Present continuous", emoji: "🏃", body: en6PresentContinuous },
        { id: "en-6-past-simple", title: "Past simple", emoji: "⏪", body: en6PastSimple },
        { id: "en-6-town", title: "Places in town & directions", emoji: "🏙️", body: en6Town },
        { id: "en-6-travel", title: "Holidays & travel", emoji: "✈️", body: en6Travel },
        { id: "en-6-comparatives", title: "Comparatives & superlatives", emoji: "📏", body: en6Comparatives },
        { id: "en-6-shopping", title: "Clothes & shopping", emoji: "🛍️", body: en6Shopping },
        { id: "en-6-health", title: "Health & body", emoji: "🩺", body: en6Health },
        { id: "en-6-questions-answers", title: "Questions and answers in context", emoji: "❓", body: en6QuestionsAnswers },
        { id: "en-6-future", title: "Future plans (going to)", emoji: "🔮", body: en6Future },
      ],
    },
  },
  {
    id: "cidadania",
    label: "Cidadania",
    emoji: "🤝",
    color: "var(--subj-cid)",
    colorSoft: "var(--subj-cid-soft)",
    blurb: "Viver bem com os outros, cuidar do planeta e de ti.",
    years: {
      1: [
        { id: "cid-1-direitos", title: "Os meus direitos e deveres", emoji: "⚖️", body: cidDireitos },
        { id: "cid-1-reciclar", title: "Reciclar e cuidar da Terra", emoji: "♻️", body: cidReciclar },
        { id: "cid-1-diferentes", title: "Todos diferentes, todos amigos", emoji: "🤝", body: cidDiferentes },
        { id: "cid-1-regras-sala", title: "Regras da sala e respeito pelos outros", emoji: "🤝", body: cidRegrasSala },
      ],
      2: [
        { id: "cid-2-emocoes", title: "As emoções e resolver zangas", emoji: "😊", body: cidEmocoes },
        { id: "cid-2-poupar", title: "Poupar e gastar bem", emoji: "🐷", body: cidPoupar },
        { id: "cid-2-ajudar", title: "Ajudar e viver em comunidade", emoji: "🤲", body: cidAjudar },
      ],
      3: [
        { id: "cid-3-igualdade", title: "Meninos e meninas: iguais", emoji: "🙋", body: cidIgualdade },
        { id: "cid-3-consumir", title: "Consumir com cabeça", emoji: "🛒", body: cidConsumir },
        { id: "cid-3-bullying", title: "Bullying: reconhecer e pedir ajuda", emoji: "🛡️", body: cidBullying },
      ],
      4: [
        { id: "cid-4-sustentavel", title: "Cuidar dos recursos do planeta", emoji: "🌍", body: cidSustentavel },
        { id: "cid-4-democracia", title: "Regras, votar e decidir juntos", emoji: "🗳️", body: cidDemocracia },
        { id: "cid-4-participar-turma", title: "Participar na turma: votar, ouvir e decidir", emoji: "🗳️", body: cidParticiparTurma },
        { id: "cid-4-saude", title: "Saúde, sono e ecrãs", emoji: "😴", body: cidSaude },
      ],
      5: [
        { id: "cid-5-direitos-humanos", title: "Os direitos humanos", emoji: "🕊️", body: cid5DireitosHumanos },
        { id: "cid-5-igualdade", title: "Igualdade de género", emoji: "⚖️", body: cid5Igualdade },
        { id: "cid-5-intercultural", title: "Viver com culturas diferentes", emoji: "🌍", body: cid5Intercultural },
        { id: "cid-5-democracia-instituicoes", title: "Democracia, Constituição e instituições", emoji: "🏛️", body: cid5DemocraciaInstituicoes },
        { id: "cid-5-saude", title: "Saúde e bem-estar", emoji: "🧘", body: cid5Saude },
        { id: "cid-5-ambiente", title: "Educação ambiental", emoji: "🌱", body: cid5Ambiente },
      ],
      6: [
        { id: "cid-6-financeira", title: "Educação financeira", emoji: "💰", body: cid6Financeira },
        { id: "cid-6-protecao", title: "Risco e proteção civil", emoji: "🚨", body: cid6Protecao },
        { id: "cid-6-voluntariado", title: "Solidariedade e voluntariado", emoji: "🤲", body: cid6Voluntariado },
        { id: "cid-6-sustentavel", title: "Desenvolvimento sustentável", emoji: "♻️", body: cid6Sustentavel },
      ],
    },
  },
  {
    id: "tic",
    label: "TIC",
    emoji: "💻",
    color: "var(--subj-tic)",
    colorSoft: "var(--subj-tic-soft)",
    blurb: "Computadores, internet, ficheiros e segurança digital.",
    years: {
      1: [
        { id: "tic-1-ecras", title: "Ecrãs com cuidado", emoji: "💻", body: cidEcras },
      ],
      2: [
        { id: "tic-2-rato-teclado", title: "Rato, teclado e escrever no computador", emoji: "⌨️", body: ticRatoTeclado },
      ],
      3: [
        { id: "tic-3-internet", title: "Internet segura", emoji: "💻", body: cidInternet },
      ],
      4: [
        { id: "tic-4-computador-ficheiros", title: "O computador e os ficheiros", emoji: "🗂️", body: cidComputadorFicheiros },
        { id: "tic-4-escrever-formatar", title: "Escrever e formatar um texto", emoji: "📝", body: ticEscreverFormatar },
      ],
      5: [
        { id: "tic-5-pesquisa", title: "Pesquisar na internet com cabeça", emoji: "🔎", body: cid5TicPesquisa },
        { id: "tic-5-apresentacoes", title: "Fazer uma apresentação simples", emoji: "🖥️", body: tic5Apresentacoes },
        { id: "tic-5-email", title: "Email e mensagens com respeito", emoji: "✉️", body: tic5Email },
        { id: "tic-5-direitos-autor", title: "Direitos de autor e usar imagens com cuidado", emoji: "🖼️", body: tic5DireitosAutor },
      ],
      6: [
        { id: "tic-6-media", title: "Media e mundo digital", emoji: "📱", body: cid6Media },
        { id: "tic-6-privacidade", title: "Privacidade e palavras-passe", emoji: "🔒", body: cid6Privacidade },
        { id: "tic-6-programacao", title: "Programação simples: instruções e algoritmos", emoji: "🤖", body: tic6Programacao },
        { id: "tic-6-folha-calculo", title: "Folha de cálculo simples", emoji: "📊", body: tic6FolhaCalculo },
      ],
    },
  },
  {
    id: "artistica",
    label: "Artes",
    emoji: "🎨",
    color: "var(--subj-art)",
    colorSoft: "var(--subj-art-soft)",
    blurb: "Cores, sons, dança e teatro — criar e imaginar!",
    years: {
      1: [
        { id: "art-1-cores", title: "As cores: primárias e arco-íris", emoji: "🎨", body: artCores },
        { id: "art-1-linhas", title: "Linhas e formas no desenho", emoji: "✏️", body: artLinhas },
        { id: "art-1-sons", title: "Sons: forte e fraco, rápido e devagar", emoji: "🔊", body: artSons },
      ],
      2: [
        { id: "art-2-misturar", title: "Misturar cores", emoji: "🟢", body: artMisturar },
        { id: "art-2-instrumentos", title: "Os instrumentos musicais", emoji: "🥁", body: artInstrumentos },
        { id: "art-2-faz-de-conta", title: "Faz de conta: o teatro", emoji: "🎭", body: artFazDeConta },
      ],
      3: [
        { id: "art-3-tecnicas", title: "Pintar, colar, recortar", emoji: "🖌️", body: artTecnicas },
        { id: "art-3-ritmo", title: "O ritmo e a pulsação", emoji: "🥁", body: artRitmo },
        { id: "art-3-danca", title: "A dança e o movimento", emoji: "💃", body: artDanca },
      ],
      4: [
        { id: "art-4-pintores", title: "Pintores famosos", emoji: "🖼️", body: artPintores },
        { id: "art-4-compositores", title: "A música e os compositores", emoji: "🎼", body: artCompositores },
        { id: "art-4-dancas-mundo", title: "Danças do mundo e de Portugal", emoji: "💃", body: artDancasMundo },
      ],
      // Educação Artística is a 1.º-ciclo subject — in 5.º/6.º it splits into
      // Educação Visual, Educação Tecnológica and Educação Musical (see below).
      5: [],
      6: [],
    },
  },
  {
    id: "fisica",
    label: "Ed. Física",
    emoji: "🤸",
    color: "var(--subj-fis)",
    colorSoft: "var(--subj-fis-soft)",
    blurb: "Mexer o corpo, jogos, desporto e hábitos saudáveis!",
    years: {
      1: [
        { id: "ef-1-mexer", title: "Mexer o corpo: correr, saltar, rolar", emoji: "🤸", body: efMexer },
        { id: "ef-1-aquecer", title: "Aquecer e descansar", emoji: "🔥", body: efAquecer },
        { id: "ef-1-jogos", title: "Jogos e brincadeiras", emoji: "🎮", body: efJogos },
      ],
      2: [
        { id: "ef-2-equilibrio", title: "Equilíbrio e coordenação", emoji: "🤹", body: efEquilibrio },
        { id: "ef-2-tradicionais", title: "Jogos tradicionais portugueses", emoji: "🪀", body: efTradicionais },
        { id: "ef-2-desportivismo", title: "Ganhar e perder com desportivismo", emoji: "🤝", body: efDesportivismo },
      ],
      3: [
        { id: "ef-3-desportos", title: "Desportos: individuais e de equipa", emoji: "⚽", body: efDesportos },
        { id: "ef-3-corpo", title: "O que o exercício faz ao corpo", emoji: "💪", body: efCorpo },
        { id: "ef-3-ginastica", title: "Ginástica: o corpo a inventar formas", emoji: "🤸", body: efGinastica },
      ],
      4: [
        { id: "ef-4-olimpicos", title: "Os Jogos Olímpicos", emoji: "🏅", body: efOlimpicos },
        { id: "ef-4-vida-ativa", title: "Uma vida ativa e saudável", emoji: "🏃", body: efVidaAtiva },
        { id: "ef-4-seguranca", title: "Desporto em segurança", emoji: "🦺", body: efSeguranca },
      ],
      5: [
        { id: "ef-5-aptidao", title: "Aptidão física e aquecimento", emoji: "🔥", body: ef5Aptidao },
        { id: "ef-5-ginastica", title: "Ginástica de solo", emoji: "🤸", body: ef5Ginastica },
        { id: "ef-5-coletivos", title: "Jogos desportivos coletivos", emoji: "⚽", body: ef5Coletivos },
        { id: "ef-5-atletismo", title: "Atletismo: correr e saltar", emoji: "🏃", body: ef5Atletismo },
        { id: "ef-5-raquetas", title: "Jogos de raquetas", emoji: "🏸", body: ef5Raquetas },
        { id: "ef-5-fairplay", title: "Regras e fair play", emoji: "🤝", body: ef5Fairplay },
      ],
      6: [
        { id: "ef-6-condicao", title: "Condição física e saúde", emoji: "💪", body: ef6Condicao },
        { id: "ef-6-aparelhos", title: "Ginástica de aparelhos", emoji: "🤸", body: ef6Aparelhos },
        { id: "ef-6-voleibol", title: "Voleibol e andebol", emoji: "🏐", body: ef6Voleibol },
        { id: "ef-6-atletismo", title: "Atletismo: lançamentos", emoji: "🥏", body: ef6Atletismo },
        { id: "ef-6-danca", title: "A dança", emoji: "💃", body: ef6Danca },
        { id: "ef-6-natureza", title: "Desportos de natureza", emoji: "🧗", body: ef6Natureza },
      ],
    },
  },

  /* ---- 2.º ciclo only (5.º–6.º ano) ---- */
  {
    id: "ciencias",
    label: "Ciências Naturais",
    emoji: "🔬",
    color: "var(--subj-cn)",
    colorSoft: "var(--subj-cn-soft)",
    blurb: "A água, o ar, os seres vivos e o teu corpo — investiga!",
    years: {
      1: [], 2: [], 3: [], 4: [],
      5: [
        { id: "cn-5-agua", title: "A água: importância e qualidade", emoji: "💧", body: cn5Agua },
        { id: "cn-5-ar", title: "O ar e a atmosfera", emoji: "🌬️", body: cn5Ar },
        { id: "cn-5-rochas-solo", title: "Rochas, solo e minerais", emoji: "🪨", body: cn5RochasSolo },
        { id: "cn-5-animais-diversidade", title: "Diversidade nos animais", emoji: "🐾", body: cn5AnimaisDiversidade },
        { id: "cn-5-animais-funcoes", title: "Como vivem os animais", emoji: "🦅", body: cn5AnimaisFuncoes },
        { id: "cn-5-plantas", title: "Diversidade nas plantas", emoji: "🌻", body: cn5Plantas },
        { id: "cn-5-ecossistemas", title: "Proteger os seres vivos", emoji: "🌍", body: cn5Ecossistemas },
      ],
      6: [
        { id: "cn-6-microorganismos", title: "Os micro-organismos", emoji: "🦠", body: cn6Microorganismos },
        { id: "cn-6-digestivo", title: "Sistema digestivo", emoji: "🍎", body: cn6Digestivo },
        { id: "cn-6-respiratorio", title: "Sistema respiratório", emoji: "🫁", body: cn6Respiratorio },
        { id: "cn-6-circulatorio", title: "Sistema circulatório", emoji: "❤️", body: cn6Circulatorio },
        { id: "cn-6-excretor", title: "Sistema excretor", emoji: "💦", body: cn6Excretor },
        { id: "cn-6-reproducao", title: "Transmissão da vida", emoji: "👶", body: cn6Reproducao },
        { id: "cn-6-saude", title: "Saúde e agressões do meio", emoji: "🩺", body: cn6Saude },
        { id: "cn-6-mapa-sistemas", title: "Mapa dos sistemas do corpo", emoji: "🧍", body: cn6MapaSistemas },
      ],
    },
  },
  {
    id: "hgp",
    label: "História e Geografia",
    emoji: "🏰",
    color: "var(--subj-hgp)",
    colorSoft: "var(--subj-hgp-soft)",
    blurb: "Como nasceu Portugal — dos primeiros povos até hoje.",
    years: {
      1: [], 2: [], 3: [], 4: [],
      5: [
        { id: "hgp-5-primeiros-povos", title: "Os primeiros povos da Península", emoji: "🏹", body: hgp5PrimeirosPovos },
        { id: "hgp-5-romanos", title: "Os romanos na Península Ibérica", emoji: "🏛️", body: hgp5Romanos },
        { id: "hgp-5-muculmanos", title: "Muçulmanos e cristãos", emoji: "🕌", body: hgp5Muculmanos },
        { id: "hgp-5-formacao", title: "A formação de Portugal", emoji: "🛡️", body: hgp5Formacao },
        { id: "hgp-5-consolidacao", title: "Consolidar o reino", emoji: "👑", body: hgp5Consolidacao },
        { id: "hgp-5-crise-1383", title: "A crise de 1383-1385", emoji: "⚔️", body: hgp5Crise1383 },
        { id: "hgp-5-sociedade", title: "A sociedade medieval", emoji: "🏰", body: hgp5Sociedade },
      ],
      6: [
        { id: "hgp-6-descobrimentos", title: "Os Descobrimentos", emoji: "⛵", body: hgp6Descobrimentos },
        { id: "hgp-6-imperio", title: "O império português", emoji: "🌍", body: hgp6Imperio },
        { id: "hgp-6-restauracao", title: "União Ibérica e Restauração", emoji: "👑", body: hgp6Restauracao },
        { id: "hgp-6-dinastias", title: "As dinastias de Portugal", emoji: "👑", body: hgp6Dinastias },
        { id: "hgp-6-reis-monumentos", title: "Reis, datas e monumentos de Portugal", emoji: "🏰", body: hgp6ReisMonumentos },
        { id: "hgp-6-pombal", title: "O século XVIII e o Marquês de Pombal", emoji: "🏛️", body: hgp6Pombal },
        { id: "hgp-6-liberalismo", title: "O Liberalismo", emoji: "📜", body: hgp6Liberalismo },
        { id: "hgp-6-republica", title: "A 1.ª República", emoji: "🇵🇹", body: hgp6Republica },
        { id: "hgp-6-estado-novo", title: "O Estado Novo e o 25 de Abril", emoji: "🌼", body: hgp6EstadoNovo },
        { id: "hgp-6-democracia", title: "Portugal democrático e a Europa", emoji: "🇪🇺", body: hgp6Democracia },
      ],
    },
  },
  {
    id: "ed-visual",
    label: "Educação Visual",
    emoji: "🎨",
    color: "var(--subj-ev)",
    colorSoft: "var(--subj-ev-soft)",
    blurb: "Ponto, linha, cor e forma — vê e cria com os olhos!",
    years: {
      1: [], 2: [], 3: [], 4: [],
      5: [
        { id: "ev-5-ponto-linha", title: "O ponto e a linha", emoji: "✏️", body: ev5PontoLinha },
        { id: "ev-5-cor", title: "A cor e o círculo cromático", emoji: "🎨", body: ev5Cor },
        { id: "ev-5-formas", title: "Formas e contornos", emoji: "🔷", body: ev5Formas },
        { id: "ev-5-textura", title: "A textura", emoji: "🧱", body: ev5Textura },
        { id: "ev-5-comunicacao", title: "Comunicação visual", emoji: "📢", body: ev5Comunicacao },
        { id: "ev-5-geometria", title: "Traçados geométricos", emoji: "📐", body: ev5Geometria },
      ],
      6: [
        { id: "ev-6-luz-sombra", title: "A luz e a sombra", emoji: "💡", body: ev6LuzSombra },
        { id: "ev-6-volume", title: "Volume e perspetiva", emoji: "🧊", body: ev6Volume },
        { id: "ev-6-padrao", title: "Padrão e módulo", emoji: "🔳", body: ev6Padrao },
        { id: "ev-6-cor-harmonias", title: "Harmonias e contrastes de cor", emoji: "🌈", body: ev6CorHarmonias },
        { id: "ev-6-perspetiva", title: "Perspetiva e profundidade", emoji: "👀", body: ev6Perspetiva },
        { id: "ev-6-design", title: "Design e cartaz", emoji: "🖼️", body: ev6Design },
        { id: "ev-6-patrimonio", title: "Património visual", emoji: "🏛️", body: ev6Patrimonio },
      ],
    },
  },
  {
    id: "ed-tecnologica",
    label: "Educação Tecnológica",
    emoji: "⚙️",
    color: "var(--subj-et)",
    colorSoft: "var(--subj-et-soft)",
    blurb: "Materiais, estruturas, energia — construir e inventar!",
    years: {
      1: [], 2: [], 3: [], 4: [],
      5: [
        { id: "et-5-o-que-e", title: "O que é a tecnologia", emoji: "⚙️", body: et5OQueE },
        { id: "et-5-materiais", title: "Materiais e propriedades", emoji: "🧰", body: et5Materiais },
        { id: "et-5-medicao", title: "Medição e rigor", emoji: "📏", body: et5Medicao },
        { id: "et-5-seguranca", title: "Higiene e segurança", emoji: "🦺", body: et5Seguranca },
        { id: "et-5-estruturas", title: "As estruturas", emoji: "🏗️", body: et5Estruturas },
        { id: "et-5-projeto", title: "Do projeto ao objeto", emoji: "🛠️", body: et5Projeto },
      ],
      6: [
        { id: "et-6-mecanismos", title: "Mecanismos e movimento", emoji: "⚙️", body: et6Mecanismos },
        { id: "et-6-energia", title: "Energia e suas fontes", emoji: "⚡", body: et6Energia },
        { id: "et-6-eletricidade", title: "Circuitos elétricos", emoji: "🔌", body: et6Eletricidade },
        { id: "et-6-reciclar", title: "Materiais e reciclagem", emoji: "♻️", body: et6Reciclar },
        { id: "et-6-comunicacao", title: "Tecnologias de comunicação", emoji: "📡", body: et6Comunicacao },
        { id: "et-6-projeto-tecnico", title: "Desenho e projeto técnico", emoji: "📐", body: et6ProjetoTecnico },
        { id: "et-6-fabrico", title: "Planear e fabricar", emoji: "🏭", body: et6Fabrico },
      ],
    },
  },
  {
    id: "ed-musical",
    label: "Educação Musical",
    emoji: "🎵",
    color: "var(--subj-emus)",
    colorSoft: "var(--subj-emus-soft)",
    blurb: "Som, ritmo e melodia — ouvir, tocar e criar música!",
    years: {
      1: [], 2: [], 3: [], 4: [],
      5: [
        { id: "em-5-som-silencio", title: "O som e o silêncio", emoji: "🔊", body: em5SomSilencio },
        { id: "em-5-ritmo", title: "A pulsação e o ritmo", emoji: "🥁", body: em5Ritmo },
        { id: "em-5-melodia", title: "A melodia", emoji: "🎶", body: em5Melodia },
        { id: "em-5-notas", title: "A altura dos sons", emoji: "🎼", body: em5Notas },
        { id: "em-5-dinamica", title: "Dinâmica e andamento", emoji: "📢", body: em5Dinamica },
        { id: "em-5-instrumentos", title: "Instrumentos da orquestra", emoji: "🎻", body: em5Instrumentos },
      ],
      6: [
        { id: "em-6-forma", title: "A forma musical", emoji: "🧩", body: em6Forma },
        { id: "em-6-escala", title: "Escala e tonalidade", emoji: "🎼", body: em6Escala },
        { id: "em-6-harmonia", title: "A harmonia", emoji: "🎹", body: em6Harmonia },
        { id: "em-6-generos", title: "Géneros musicais", emoji: "🎵", body: em6Generos },
        { id: "em-6-portuguesa", title: "A música portuguesa", emoji: "🇵🇹", body: em6Portuguesa },
        { id: "em-6-criar", title: "Criar e improvisar", emoji: "✨", body: em6Criar },
      ],
    },
  },
];

/* "O Mundo & Curiosidades" is NOT a school subject and is NOT tied to a grade:
 * it's general culture / common sense, navigated by proximity RINGS
 * (a minha ilha → Portugal → Europa → mundo). It gets its OWN home-screen
 * section; the four rings reuse the 1–4 "year" slot for storage/lookup only. */
export const mundoSubject: Subject = {
    id: "mundo",
    label: "O Mundo",
    emoji: "🌍",
    color: "var(--subj-mundo)",
    colorSoft: "var(--subj-mundo-soft)",
    blurb: "Dos Açores ao mundo inteiro — curiosidades e descobertas!",
    years: {
      1: [
        { id: "mundo-1-acores", title: "Os Açores: as minhas ilhas", emoji: "🌋", body: mundoAcores, zona: "Açores", pais: "Portugal" },
        { id: "mundo-1-vulcoes", title: "Vulcões e lagoas", emoji: "🏞️", body: mundoVulcoes, zona: "Açores", pais: "Portugal" },
        { id: "mundo-1-mar", title: "O mar e os animais", emoji: "🐋", body: mundoMar, zona: "Açores", pais: "Portugal" },
        { id: "mundo-1-ilha", title: "O que é uma ilha?", emoji: "🏝️", body: mundoIlha, zona: "Açores", pais: "Portugal" },
        { id: "mundo-1-lendas", title: "A lenda das Sete Cidades", emoji: "🧚", body: mundoLendas, zona: "Açores", pais: "Portugal" },
        { id: "mundo-1-simbolos", title: "Os símbolos dos Açores", emoji: "🦅", body: mundoSimbolosAcores, zona: "Açores", pais: "Portugal" },
      ],
      2: [
        { id: "mundo-2-portugal", title: "Portugal de uma ponta à outra", emoji: "🇵🇹", body: mundoPortugal, zona: "Portugal", pais: "Portugal" },
        { id: "mundo-2-regioes", title: "Continente, Açores e Madeira", emoji: "🗺️", body: mundoRegioes, zona: "Portugal", pais: "Portugal" },
        { id: "mundo-2-comidas", title: "Comidas e tradições", emoji: "🍽️", body: mundoComidas, zona: "Portugal", pais: "Portugal" },
        { id: "mundo-2-simbolos", title: "Os símbolos de Portugal", emoji: "🇵🇹", body: mundoSimbolosPt, zona: "Portugal", pais: "Portugal" },
        { id: "mundo-2-rios", title: "Rios, serras e cidades", emoji: "🏞️", body: mundoRios, zona: "Portugal", pais: "Portugal" },
      ],
      3: [
        { id: "mundo-3-europa", title: "A Europa", emoji: "🇪🇺", body: mundoEuropa, zona: "Europa" },
        { id: "mundo-3-atlantico", title: "O oceano Atlântico", emoji: "🌊", body: mundoAtlantico, zona: "Atlântico" },
        { id: "mundo-3-descobrimentos", title: "Os Açores e os Descobrimentos", emoji: "⛵", body: mundoDescob, zona: "Atlântico", pais: "Portugal" },
        { id: "mundo-3-vizinhos", title: "Os países vizinhos e o euro", emoji: "🤝", body: mundoVizinhos, zona: "Europa" },
        { id: "mundo-3-animais-oceano", title: "Animais do oceano", emoji: "🐬", body: mundoAnimaisOceano, zona: "Atlântico" },
      ],
      4: [
        { id: "mundo-4-continentes", title: "Os continentes e oceanos", emoji: "🌐", body: mundoContinentes, zona: "Mundo" },
        { id: "mundo-4-fusos", title: "Fusos horários e hemisférios", emoji: "🕐", body: mundoFusos, zona: "Mundo" },
        { id: "mundo-4-maravilhas", title: "Maravilhas do mundo", emoji: "🏛️", body: mundoMaravilhas, zona: "Mundo" },
        { id: "mundo-4-animais", title: "Animais de cada continente", emoji: "🦁", body: mundoAnimaisCont, zona: "Mundo" },
        { id: "mundo-4-bandeiras", title: "Bandeiras do mundo", emoji: "🏳️", body: mundoBandeiras, zona: "Mundo" },
      ],
      // "O Mundo" uses tiers 1–4 as proximity rings; 5–6 are unused here.
      5: [],
      6: [],
    },
};

/* "Saber de cor" — a cross-cutting study/reference area (like "O Mundo", NOT a
 * school subject and NOT tied to a grade): things every child should know by
 * heart — tabuadas, the alphabet, numbers, days and months — all read-aloud.
 * Its topics live in the single tier (1) used for storage/lookup; the area is
 * never shown as "X.º ano" (see tierLabel + isEstudo). */
export const estudoSubject: Subject = {
  id: "estudo",
  label: site.estudo.sectionTitle,
  emoji: "🧠",
  color: "var(--accent)",
  colorSoft: "var(--accent-soft)",
  blurb: site.estudo.sectionSub,
  years: {
    1: [
      { id: "estudo-tabuadas", title: "Tabuadas", emoji: "✖️", body: estudoTabuadas },
      { id: "estudo-alfabeto", title: "O alfabeto", emoji: "🔤", body: estudoAlfabeto },
      { id: "estudo-numeros", title: "Os números", emoji: "🔢", body: estudoNumeros },
      { id: "estudo-dinheiro", title: "O dinheiro", emoji: "💶", body: estudoDinheiro },
      { id: "estudo-loja", title: "Vamos às compras!", emoji: "🛒", body: estudoLoja },
      { id: "estudo-dias-meses", title: "Dias e meses", emoji: "📅", body: estudoDiasMeses },
      { id: "estudo-pontuacao", title: "Os sinais de pontuação", emoji: "❓", body: estudoPontuacao },
      { id: "estudo-classes", title: "As classes de palavras", emoji: "🧩", body: estudoClasses },
      { id: "estudo-verbos", title: "Conjugar os verbos", emoji: "⏳", body: estudoVerbos },
      { id: "estudo-formas", title: "As formas e os sólidos", emoji: "🔷", body: estudoFormas },
      { id: "estudo-medidas", title: "As unidades de medida", emoji: "📏", body: estudoMedidas },
      { id: "estudo-formulas", title: "Fórmulas de área e perímetro", emoji: "📐", body: estudoFormulas },
      { id: "estudo-romanos", title: "Os numerais romanos", emoji: "🏛️", body: estudoRomanos },
      { id: "estudo-planetas", title: "Os planetas", emoji: "🪐", body: estudoPlanetas },
      { id: "estudo-continentes", title: "Continentes e oceanos", emoji: "🌐", body: estudoContinentes },
      { id: "estudo-pontos-cardeais", title: "Os pontos cardeais", emoji: "🧭", body: estudoPontosCardeais },
      { id: "estudo-datas", title: "Datas da História de Portugal", emoji: "🏰", body: estudoDatas },
      { id: "estudo-distritos", title: "Os distritos de Portugal", emoji: "🗺️", body: estudoDistritos },
    ],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  },
};

/* "O Dicionário" — a cross-cutting reference area (like "Saber de cor", NOT a
 * school subject and NOT tied to a grade): word meanings for early readers,
 * organised by letter. Each letter is one page (its single tier-1 "lesson")
 * holding a `dictionary` widget of read-aloud word cards. The area is never
 * shown as "X.º ano" (see tierLabel + isDicionario). All 26 letters are here,
 * including K, W and Y — whose pages hold mostly words borrowed from other
 * languages (kiwi, wi-fi, ioga), with a note for the child. */
export const dicionarioSubject: Subject = {
  id: "dicionario",
  label: site.dicionario.sectionTitle,
  emoji: "📖",
  color: "var(--subj-pt)",
  colorSoft: "var(--subj-pt-soft)",
  blurb: site.dicionario.sectionSub,
  years: {
    1: [
      { id: "dic-a", title: "A", emoji: "🍎", body: dicA },
      { id: "dic-b", title: "B", emoji: "🐝", body: dicB },
      { id: "dic-c", title: "C", emoji: "🐱", body: dicC },
      { id: "dic-d", title: "D", emoji: "🦷", body: dicD },
      { id: "dic-e", title: "E", emoji: "🐘", body: dicE },
      { id: "dic-f", title: "F", emoji: "🔥", body: dicF },
      { id: "dic-g", title: "G", emoji: "🐈", body: dicG },
      { id: "dic-h", title: "H", emoji: "🌿", body: dicH },
      { id: "dic-i", title: "I", emoji: "🏝️", body: dicI },
      { id: "dic-j", title: "J", emoji: "🪟", body: dicJ },
      { id: "dic-k", title: "K", emoji: "🥝", body: dicK },
      { id: "dic-l", title: "L", emoji: "🌙", body: dicL },
      { id: "dic-m", title: "M", emoji: "🐈", body: dicM },
      { id: "dic-n", title: "N", emoji: "☁️", body: dicN },
      { id: "dic-o", title: "O", emoji: "🥚", body: dicO },
      { id: "dic-p", title: "P", emoji: "🦆", body: dicP },
      { id: "dic-q", title: "Q", emoji: "🧀", body: dicQ },
      { id: "dic-r", title: "R", emoji: "🐀", body: dicR },
      { id: "dic-s", title: "S", emoji: "☀️", body: dicS },
      { id: "dic-t", title: "T", emoji: "🐢", body: dicT },
      { id: "dic-u", title: "U", emoji: "🍇", body: dicU },
      { id: "dic-v", title: "V", emoji: "🐄", body: dicV },
      { id: "dic-w", title: "W", emoji: "🧇", body: dicW },
      { id: "dic-x", title: "X", emoji: "♟️", body: dicX },
      { id: "dic-y", title: "Y", emoji: "🧘", body: dicY },
      { id: "dic-z", title: "Z", emoji: "🦓", body: dicZ },
    ],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  },
};

/* "Países" — a get-to-know-a-country area (like "O Mundo" and "Saber de cor",
 * NOT a school subject and NOT tied to a grade). Each COUNTRY reuses a 1–4
 * "year" slot for storage/lookup only; it's named and shown as the country,
 * never as a grade (see tierLabel + isPaises). The two countries hold the SAME
 * set of parallel lessons (o país, a bandeira, o hino, a comida, a natureza, as
 * curiosidades) so a child can compare them side by side. */
export const paisesSubject: Subject = {
  id: "paises",
  label: site.paises.sectionTitle,
  emoji: "🌍",
  color: "var(--subj-paises)",
  colorSoft: "var(--subj-paises-soft)",
  blurb: site.paises.sectionSub,
  years: {
    1: [
      { id: "paises-pt-pais", title: "Portugal: o país", emoji: "🇵🇹", body: paisesPtPais, pais: "Portugal" },
      { id: "paises-pt-bandeira", title: "A bandeira e os símbolos", emoji: "🏳️", body: paisesPtBandeira, pais: "Portugal" },
      { id: "paises-pt-hino", title: "O hino: «A Portuguesa»", emoji: "🎵", body: paisesPtHino, pais: "Portugal" },
      { id: "paises-pt-comida", title: "Comida e tradições", emoji: "🍽️", body: paisesPtComida, pais: "Portugal" },
      { id: "paises-pt-natureza", title: "Natureza e animais", emoji: "🌳", body: paisesPtNatureza, pais: "Portugal" },
      { id: "paises-pt-curiosidades", title: "Curiosidades e recordes", emoji: "✨", body: paisesPtCuriosidades, pais: "Portugal" },
    ],
    2: [
      { id: "paises-ca-pais", title: "Canadá: o país", emoji: "🇨🇦", body: paisesCaPais, pais: "Canadá" },
      { id: "paises-ca-bandeira", title: "A bandeira e os símbolos", emoji: "🍁", body: paisesCaBandeira, pais: "Canadá" },
      { id: "paises-ca-hino", title: "O hino: «O Canada»", emoji: "🎵", body: paisesCaHino, pais: "Canadá" },
      { id: "paises-ca-comida", title: "Comida e tradições", emoji: "🍁", body: paisesCaComida, pais: "Canadá" },
      { id: "paises-ca-natureza", title: "Natureza e animais", emoji: "🐻", body: paisesCaNatureza, pais: "Canadá" },
      { id: "paises-ca-curiosidades", title: "Curiosidades e recordes", emoji: "✨", body: paisesCaCuriosidades, pais: "Canadá" },
    ],
    3: [],
    4: [],
    5: [],
    6: [],
  },
};

/** Every subject INCLUDING the cross-cutting "O Mundo", "Saber de cor",
 *  "O Dicionário" and "Países" areas — used for lookups, global search and
 *  achievements. The home screen lists the school subjects per year and these
 *  areas as their own sections. */
export const subjects: Subject[] = [...schoolSubjects, mundoSubject, estudoSubject, dicionarioSubject, paisesSubject];

export const YEARS: YearN[] = [1, 2, 3, 4, 5, 6];
/** Years grouped by cycle, for the home screen's two sections. */
export const CYCLE_YEARS: Record<Cycle, YearN[]> = { 1: [1, 2, 3, 4], 2: [5, 6] };
export const CYCLE_LABEL: Record<Cycle, string> = { 1: "1.º ciclo", 2: "2.º ciclo" };
export const yearLabel = (y: YearN) => `${y}.º ano`;

/** The school subjects actually taught in a given year (those with lessons).
 *  Drives the year screen and the per-year "matérias" count, so the 2.º ciclo
 *  shows its own subjects (Ciências, HGP, Ed. Visual…) and not the 1.º-ciclo
 *  ones — and vice-versa — without any hard-coded per-cycle lists. */
export const subjectsForYear = (year: YearN): Subject[] =>
  schoolSubjects.filter((s) => s.years[year].length > 0);

export const MUNDO_ID = "mundo";
export const isMundo = (subjectId: string): boolean => subjectId === MUNDO_ID;

export const ESTUDO_ID = "estudo";
export const isEstudo = (subjectId: string): boolean => subjectId === ESTUDO_ID;
/** The study area's topics (its single, non-grade tier). */
export const estudoTopics = estudoSubject.years[1];

export const DICIONARIO_ID = "dicionario";
export const isDicionario = (subjectId: string): boolean => subjectId === DICIONARIO_ID;
/** The dictionary's letters (its single, non-grade tier). */
export const dicionarioLetters = dicionarioSubject.years[1];

/* The countries of the "Países" area. Each country maps onto a 1–4 "year" slot,
 * but is named and shown as the country, never as a grade. Presentation (label,
 * blurb, icon) comes from the YAML page config; lesson lists stay in
 * paisesSubject above. */
export const PAISES_ID = "paises";
export const isPaises = (subjectId: string): boolean => subjectId === PAISES_ID;
export type PaisRing = PaisConfig;
export const paisesCountries: PaisRing[] = site.paises.countries;
const PAIS_TIER_LABEL = Object.fromEntries(paisesCountries.map((c) => [c.tier, c.label])) as Record<YearN, string>;

/* The proximity rings of "O Mundo" (home → world). Each ring maps onto the
 * 1–4 "year" slot, but is named and described as a ring, never as a grade.
 * Their presentation (label, blurb, icon, which sit on home) comes from the
 * YAML page config; lesson lists stay in mundoSubject above. The closest two
 * rings (Açores and Portugal — the child's own identity) are featured on the
 * home screen; the wider world lives one tap in, under the "Pelo mundo fora"
 * entry. */
export type MundoRing = MundoRingConfig;
export const mundoRings: MundoRing[] = site.mundo.rings;

/** Rings featured on the home screen (Açores, Portugal) and rings tucked inside
 *  the "Pelo mundo fora" entry (Europa & Atlântico, mundo inteiro). */
export const mundoHomeRings = mundoRings.filter((r) => r.home);
export const mundoInnerRings = mundoRings.filter((r) => !r.home);
export const isMundoHomeRing = (ring: YearN): boolean => mundoHomeRings.some((r) => r.ring === ring);

/** The "Pelo mundo fora" entry that gathers the wider-world rings. */
export const MUNDO_BEYOND = site.mundo.beyond;

const MUNDO_RING_LABEL = Object.fromEntries(mundoRings.map((r) => [r.ring, r.label])) as Record<YearN, string>;

/** Label for the middle navigation tier: a school "X.º ano", the name of the
 *  proximity ring for "O Mundo", or nothing for the grade-less study area. */
export function tierLabel(subjectId: string, tier: YearN): string {
  if (isMundo(subjectId)) return MUNDO_RING_LABEL[tier];
  if (isPaises(subjectId)) return PAIS_TIER_LABEL[tier]; // the country name, never a grade
  if (isEstudo(subjectId) || isDicionario(subjectId)) return ""; // not grade-based, no tier label
  return yearLabel(tier);
}

export const subjectById = new Map(subjects.map((s) => [s.id, s]));

export function findLesson(subjectId: string, year: YearN, lessonId: string): Lesson | undefined {
  return subjectById.get(subjectId)?.years[year].find((l) => l.id === lessonId);
}

export function allLessons(): { subject: Subject; year: YearN; lesson: Lesson }[] {
  const out: { subject: Subject; year: YearN; lesson: Lesson }[] = [];
  for (const subject of subjects) {
    for (const year of YEARS) {
      for (const lesson of subject.years[year]) out.push({ subject, year, lesson });
    }
  }
  return out;
}

/** What lesson a given id belongs to — subject area, year, title, emoji.
 *  Lets features that only know a lessonId (progress, achievements) recover the
 *  area where the work was done without re-walking the tree. */
export interface LessonMeta {
  subjectId: string;
  subjectLabel: string;
  color: string;
  year: YearN;
  title: string;
  emoji: string;
}

export const lessonMeta = new Map<string, LessonMeta>(
  allLessons().map(({ subject, year, lesson }) => [
    lesson.id,
    {
      subjectId: subject.id,
      subjectLabel: subject.label,
      color: subject.color,
      year,
      title: lesson.title,
      emoji: lesson.emoji,
    },
  ]),
);
