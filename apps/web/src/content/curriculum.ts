/* ------------------------------------------------------------------ *
 * Sprout curriculum — 1.º ao 4.º ano (1.º ciclo, Portugal).
 *
 * Structure: Subject → Year (1–4) → Lessons.
 * A lesson with `body` is a complete lesson (markdown imported from a .md
 * file). A lesson without `body` is registered in the skeleton and renders a
 * friendly "em construção" placeholder — so the full map of what a child
 * should learn is always visible, and filling it in is: write one .md +
 * set `body`. See ROADMAP.md for what is still a placeholder.
 *
 * Topic breakdown follows the Aprendizagens Essenciais / Metas Curriculares.
 * ------------------------------------------------------------------ */

export type YearN = 1 | 2 | 3 | 4;

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
import matDecimais from "./matematica/ano4/decimais.md";
import matArea from "./matematica/ano4/area-perimetro.md";
import matDados from "./matematica/ano4/graficos-tabelas.md";
import matProblemas from "./matematica/ano4/resolver-problemas.md";
// AE coverage — Matemática (gaps: simetria, romanos, estimativa)
import matSimetria from "./matematica/ano2/simetria.md";
import matRomanos from "./matematica/ano3/numeros-romanos.md";
import matEstimar from "./matematica/ano4/estimar-arredondar.md";

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
import ptFraseComplexa from "./portugues/ano4/frase-simples-complexa.md";
import ptNoticia from "./portugues/ano4/noticia.md";
import ptHifenX from "./portugues/ano4/o-hifen-e-o-x.md";

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
import edmAlimentacao from "./estudo-do-meio/ano3/alimentacao-saudavel.md";
import edmEletricidade from "./estudo-do-meio/ano3/eletricidade-e-imanes.md";
import edmAmbiente from "./estudo-do-meio/ano4/proteger-o-ambiente.md";
import edmMapas from "./estudo-do-meio/ano4/mapas-e-pontos-cardeais.md";

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

/* ---- Cidadania e Desenvolvimento ---- */
import cidDireitos from "./cidadania/ano1/direitos-e-deveres.md";
import cidReciclar from "./cidadania/ano1/reciclar.md";
import cidDiferentes from "./cidadania/ano1/todos-diferentes.md";
import cidEmocoes from "./cidadania/ano2/emocoes.md";
import cidPoupar from "./cidadania/ano2/poupar.md";
import cidAjudar from "./cidadania/ano2/ajudar.md";
import cidInternet from "./cidadania/ano3/internet-segura.md";
import cidIgualdade from "./cidadania/ano3/igualdade.md";
import cidConsumir from "./cidadania/ano3/consumir.md";
import cidSustentavel from "./cidadania/ano4/sustentavel.md";
import cidDemocracia from "./cidadania/ano4/democracia.md";
import cidSaude from "./cidadania/ano4/saude-bem-estar.md";

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
      ],
      3: [
        { id: "mat-3-numeros-1000", title: "Números até 1000", emoji: "💯", body: matNumeros1000 },
        { id: "mat-3-multiplicacao", title: "A multiplicação", emoji: "✖️", body: matMultiplicacao },
        { id: "mat-3-multiplos", title: "Múltiplos e tabuadas", emoji: "✖️", body: matMultiplos },
        { id: "mat-3-divisao", title: "A divisão", emoji: "➗", body: matDivisao },
        { id: "mat-3-fracoes", title: "Frações simples", emoji: "🍕", body: matFracoes },
        { id: "mat-3-medida", title: "Comprimento e massa", emoji: "📏", body: matMedida },
        { id: "mat-3-calendario", title: "O calendário e o tempo", emoji: "📅", body: matCalendario },
        { id: "mat-3-romanos", title: "Numerais romanos", emoji: "🏛️", body: matRomanos },
      ],
      4: [
        { id: "mat-4-numeros-milhao", title: "Números até ao milhão", emoji: "🔢", body: matMilhao },
        { id: "mat-4-estimar", title: "Estimar e arredondar", emoji: "🎯", body: matEstimar },
        { id: "mat-4-decimais", title: "Números decimais", emoji: "🔢", body: matDecimais },
        { id: "mat-4-fracoes-decimais", title: "Frações e decimais", emoji: "🍕", body: matFracDec },
        { id: "mat-4-area", title: "Área e perímetro", emoji: "📐", body: matArea },
        { id: "mat-4-angulos", title: "Ângulos e retas", emoji: "📐", body: matAngulos },
        { id: "mat-4-volume", title: "Volume e capacidade", emoji: "🧴", body: matVolume },
        { id: "mat-4-dados", title: "Gráficos e tabelas", emoji: "📊", body: matDados },
        { id: "mat-4-problemas", title: "Resolver problemas", emoji: "🧩", body: matProblemas },
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
      ],
      2: [
        { id: "pt-2-pontuacao", title: "Sinais de pontuação", emoji: "❓", body: ptPontuacao },
        { id: "pt-2-tipos-frase", title: "Frases que perguntam e exclamam", emoji: "❗", body: ptTiposFrase },
        { id: "pt-2-nome-verbo", title: "Nome e ação", emoji: "🏃", body: ptNomeAcao },
        { id: "pt-2-singular-plural", title: "Singular e plural", emoji: "👥", body: ptSingularPlural },
        { id: "pt-2-silaba-tonica", title: "A sílaba mais forte", emoji: "👏", body: ptSilabaTonica },
        { id: "pt-2-recontar", title: "Contar e recontar uma história", emoji: "🗣️", body: ptRecontar },
        { id: "pt-2-poemas", title: "Poemas e lengalengas", emoji: "🎵", body: ptPoemas },
        { id: "pt-2-digrafos", title: "Dígrafos (ch, lh, nh)", emoji: "🤝", body: ptDigrafos },
        { id: "pt-2-adjetivos", title: "Como é? Os adjetivos", emoji: "🎨", body: ptAdjetivos2 },
        { id: "pt-2-artigos", title: "Artigos: o, a, um, uma", emoji: "🔤", body: ptArtigos },
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
      ],
      3: [
        { id: "edm-3-plantas", title: "As plantas", emoji: "🌻", body: edmPlantas },
        { id: "edm-3-alimentacao", title: "Alimentação saudável", emoji: "🥗", body: edmAlimentacao },
        { id: "edm-3-portugal", title: "Portugal: o meu país", emoji: "🇵🇹", body: edmPortugal },
        { id: "edm-3-solidos-liquidos", title: "Sólidos, líquidos e gases", emoji: "🧊", body: edmEstados },
        { id: "edm-3-eletricidade", title: "Eletricidade e ímanes", emoji: "🧲", body: edmEletricidade },
      ],
      4: [
        { id: "edm-4-sistema-solar", title: "O sistema solar", emoji: "🪐", body: edmSistemaSolar },
        { id: "edm-4-corpo-sistemas", title: "Os sistemas do corpo", emoji: "❤️", body: edmCorpoSistemas },
        { id: "edm-4-ambiente", title: "Proteger o ambiente", emoji: "♻️", body: edmAmbiente },
        { id: "edm-4-mapas", title: "Mapas e pontos cardeais", emoji: "🧭", body: edmMapas },
        { id: "edm-4-historia", title: "História de Portugal", emoji: "🏰", body: edmHistoria },
      ],
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
      ],
      2: [
        { id: "cid-2-emocoes", title: "As emoções e resolver zangas", emoji: "😊", body: cidEmocoes },
        { id: "cid-2-poupar", title: "Poupar e gastar bem", emoji: "🐷", body: cidPoupar },
        { id: "cid-2-ajudar", title: "Ajudar e viver em comunidade", emoji: "🤲", body: cidAjudar },
      ],
      3: [
        { id: "cid-3-internet", title: "Internet segura", emoji: "💻", body: cidInternet },
        { id: "cid-3-igualdade", title: "Meninos e meninas: iguais", emoji: "🙋", body: cidIgualdade },
        { id: "cid-3-consumir", title: "Consumir com cabeça", emoji: "🛒", body: cidConsumir },
      ],
      4: [
        { id: "cid-4-sustentavel", title: "Cuidar dos recursos do planeta", emoji: "🌍", body: cidSustentavel },
        { id: "cid-4-democracia", title: "Regras, votar e decidir juntos", emoji: "🗳️", body: cidDemocracia },
        { id: "cid-4-saude", title: "Saúde, sono e ecrãs", emoji: "😴", body: cidSaude },
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
    ],
    2: [],
    3: [],
    4: [],
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
  },
};

/** Every subject INCLUDING the cross-cutting "O Mundo", "Saber de cor",
 *  "O Dicionário" and "Países" areas — used for lookups, global search and
 *  achievements. The home screen lists the school subjects per year and these
 *  areas as their own sections. */
export const subjects: Subject[] = [...schoolSubjects, mundoSubject, estudoSubject, dicionarioSubject, paisesSubject];

export const YEARS: YearN[] = [1, 2, 3, 4];
export const yearLabel = (y: YearN) => `${y}.º ano`;

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
