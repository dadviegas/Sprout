# NEXT STEPZ — plano executivo do Sprout

Data: 2026-06-12

Este ficheiro é a versão operacional das ideias em `docs/next-steps.ms`.
O objetivo é decidir o que construir, em que ordem, e como saber se ficou bom.

## Direção

O Sprout já tem cobertura ampla. O próximo nível não é adicionar centenas de
lições; é fazer a app adaptar-se melhor à criança:

- perceber erros;
- propor treino curto;
- reorganizar o plano;
- explicar aos pais o que fazer;
- melhorar áudio e widgets;
- transformar matéria em missões mais interativas.

## Fase 1 — Banco de erros com runner curto

Problema:
- O banco de erros existe, mas a criança ainda tem de abrir a lição inteira.

Construir:
- Uma vista "Revisão de erros" com 3-5 perguntas vencidas.
- A vista agrupa perguntas por lição.
- Se não conseguir responder, abre a lição original.
- Ao acertar, a pergunta sobe na escala de revisão.

Critério de pronto:
- A criança abre a revisão pelo plano ou Área dos Pais.
- Vê quantas perguntas tem para vencer.
- Consegue fazer uma sessão curta sem procurar a matéria manualmente.

Primeira implementação:
- Criar view `review`.
- Criar componente `ReviewRunner`.
- Reusar `dueReviews`.
- Na primeira versão, mostrar cartões por lição com link direto para abrir a
  lição; depois evoluir para perguntas reais.

Estado:
- Feito em 2026-06-12: rota `#/review`, componente `ReviewRunner`, entrada pelo
  Plano e pela Área dos Pais.
- Feito em 2026-06-12: o runner já puxa perguntas reais dos quizzes quando o
  `quizId` e o índice ainda existem no markdown, mostra opções clicáveis e
  alimenta o mesmo banco de revisão.
- Feito em 2026-06-12: o banco guarda um snapshot da pergunta no momento da
  resposta, para sobreviver a alterações futuras no markdown ou no id do bloco.
- Feito em 2026-06-12: a revisão virou sessão guiada de até 5 perguntas, com
  uma pergunta de cada vez, botão "próxima", barra de progresso e resumo final.
- Próximo passo: começar a Fase 2, adicionando feedback adaptativo por tipo de
  erro nas perguntas principais.

## Fase 2 — Feedback adaptativo no Quiz

Problema:
- Feedback atual diz se acertou e mostra explicação, mas não identifica o tipo
  de erro.

Construir:
- Campo opcional `misconception` nas perguntas.
- Campo opcional `tag` ou `tags`.
- Feedback específico quando a opção errada corresponde a uma confusão comum.

Exemplo:
- "Confundiste cl com ml. Lembra-te: 1 cl = 10 ml."
- "Respondeste só ao primeiro passo. Este problema pede duas contas."

Critério de pronto:
- Nas lições centrais, errar ensina algo específico.

Estado:
- Feito em 2026-06-13: `QuizOption` aceita `feedback` e `tag`; quando a criança
  escolhe uma opção errada com feedback próprio, o Quiz mostra essa explicação
  em vez da explicação geral.
- Feito em 2026-06-13: snapshots do banco de erros preservam também
  `feedback`/`tag`, e o ReviewRunner mostra o feedback específico na revisão.
- Feito em 2026-06-13: primeira aplicação em Matemática 4.º ano,
  `decimais.md`, com erros típicos de vírgula, dinheiro, décimas/centésimas e
  quartos/metades.
- Feito em 2026-06-15: `volume-capacidade.md` (capacidade vs massa, conversões
  l/cl/ml, volume soma vs multiplicação).
- Feito em 2026-06-15: `problemas-varios-passos.md` — as 14 perguntas (prática
  + final) ganham feedback ligado a cada armadilha: respondeu só ao 1.º passo,
  trocou a unidade, esqueceu a conversão, leu a pergunta trocada, e o resto
  (arredondar para cima vs deitar fora).
- Feito em 2026-06-15: `fracoes.md` (3.º ano) — frações invertidas, leitura
  «junta» dos algarismos, «mais partes = maior», metade/quarto e equivalências.
- Feito em 2026-06-15: medidas — `comprimento-massa.md` e `medidas-km-mm-g.md`
  (fator de conversão errado, sem converter, unidade/grandeza errada,
  instrumento errado, juntar unidades, comparar sem converter, estimativa).
- Feito em 2026-06-15: Inglês 1.º ano — `colours.md` e `numbers.md`, com
  feedback que ensina nos dois sentidos (a opção errada diz o que aquela
  palavra/número significa e qual era o certo): `en-cor-trocada`,
  `en-numero-trocado`, `en-numero-sequencia`, `en-frase-trocada`.
- Feito em 2026-06-15: Inglês 2.º–3.º ano — `animals.md`, `food-basics.md` e
  `routines.md`, com feedback para trocas de vocabulário, comida/bebida,
  sons de animais, plurais, rotinas, manhã/tarde/noite e `she + -s`
  (`en-animal-trocado`, `en-som-animal`, `en-comida-trocada`,
  `en-comida-bebida`, `en-plural`, `en-rotina-trocada`,
  `en-tempo-trocado`, `en-present-simple-s`).
- Feito em 2026-06-15: Inglês 2.º–3.º ano — `sports.md`, `nature.md`,
  `my-house.md`, `clothes.md` e `directions.md`, com feedback para desportos,
  natureza/localização, divisões e objetos da casa, `there is/are`,
  `on/under`, roupa, frio/calor, pronomes, direções e posições
  (`en-desporto-trocado`, `en-sufixo-trocado`, `en-natureza-trocada`,
  `en-natureza-local`, `en-casa-trocada`, `en-there-is-are`,
  `en-preposicao-trocada`, `en-roupa-trocada`, `en-roupa-tempo`,
  `en-pronome-trocado`, `en-direcao-trocada`, `en-posicao-trocada`).
- Feito em 2026-06-15: Inglês 3.º ano — `toys.md` e `food.md`, com feedback
  para brinquedos trocados, `I have`/`I like`/`I am`, plural com `-s`,
  números parecidos, comida/bebida, fome/sede, pedidos educados e nomes não
  contáveis (`en-brinquedo-trocado`, `en-comida-trocada`,
  `en-comida-bebida`, `en-frase-trocada`, `en-plural`,
  `en-numero-trocado`).
- Feito em 2026-06-15: frações/decimais 4.º–5.º ano —
  `fracoes-decimais.md`, `decimais.md` e `fracoes.md`, com feedback para
  equivalências fração-decimal, décimas/centésimas/milésimas, comparação,
  leitura posicional, reta numérica, contas com vírgula alinhada,
  multiplicar por 10/100, arredondamento, troco, dízimas, frações
  equivalentes, simplificação, denominador comum, soma de denominadores,
  fração de uma quantidade e fração imprópria.
- Feito em 2026-06-19: Português 5.º ano — `classes.md`, `verbos.md` e
  `funcoes.md`, com feedback para classe vs função, verbo/nome/adjetivo,
  conjunção vs preposição, variável/invariável, pronome/determinante,
  conjugação, tempo, pessoa e modo verbal, pretérito perfeito/imperfeito,
  sujeito vs predicado, complemento direto/indireto, sujeito subentendido e
  frases impessoais.
- Feito em 2026-06-19: Português 6.º ano — `classes.md` (Classes de palavras II),
  com feedback nas duas listas (prática + final) para determinante vs pronome,
  preposição vs conjunção, subtipos de determinante (artigo/demonstrativo/
  possessivo), variável/invariável e contrações. Reutiliza as famílias do 5.º
  (`pt-pronome-determinante`, `pt-conjuncao-preposicao`, `pt-variavel-invariavel`,
  `pt-classe-*`) e acrescenta `pt-determinante-tipo` e `pt-contracao`.
- Feito em 2026-06-19: Português 6.º ano — `verbos.md` (Conjugar verbos), com
  feedback nas duas listas para conjugação (-ar/-er/-ir), perfeito vs imperfeito,
  mais-que-perfeito, modo (indicativo/imperativo/conjuntivo), tempo, regular vs
  irregular, formas nominais (infinitivo/gerúndio/particípio) e o par ser/ir
  («fui»). Reutiliza `pt-verbo-conjugacao`, `pt-verbo-tempo`, `pt-verbo-modo`,
  `pt-preterito-perfeito-imperfeito` e `pt-verbo-mais-que-perfeito`, e acrescenta
  `pt-verbo-irregular`, `pt-verbo-forma-nominal` e `pt-verbo-ser-ir`.
- Feito em 2026-06-22: Matemática 5.º ano — feedback adaptativo em TODAS as
  lições que ainda não o tinham: `area-perimetro.md`, `percentagens.md`,
  `angulos-poligonos.md`, `areas-paralelogramo-triangulo.md`, `naturais.md`,
  `mdc-mmc.md`, `potencias.md`, `solidos.md`, `dados.md` e
  `dados-a-mais-ou-a-menos.md`. Reutiliza famílias existentes (`perimetro-vs-area`,
  `area-calculo`, `area-unidade`, `angulo-*`, `valor-posicional`, `comparar-numeros`,
  `multiplo-*`, `problema-*`) e cria novas: `percent-*` (significado/decimal/
  calculo/desconto), `poligono-*`, `triangulo-*`, `quadrilatero-*`, `solido-*`,
  `area-paralelogramo`, `area-triangulo-base-altura`, `divisor-vs-multiplo`,
  `mdc-vs-mmc`, `mmc-calculo`/`mdc-calculo`, `primo-*`, `potencia-*`,
  `ordem-operacoes`, `vocabulario-*`, `dados-*`.
- Feito em 2026-06-22: Matemática 6.º ano — feedback adaptativo em TODAS as
  lições sem ele: `circulo.md`, `equacoes.md`, `fracoes-operacoes.md`,
  `graficos.md`, `inteiros.md`, `percentagens.md`, `potencias.md`,
  `probabilidade.md`, `proporcionalidade.md`, `volumes.md`. Reutiliza `fracao-*`,
  `percent-*`, `volume-*`, `potencia-*` e cria `inteiro-*`, `equacao-*`,
  `circulo-*`, `proporcao-*`, `probabilidade-*`, `grafico-*`,
  `fracao-dividir-*`/`fracao-multiplicar-encolhe`, `percent-quanto-por-cento`.
- Cobertura: todas as lições de Matemática 5.º–6.º e de Português 5.º–6.º
  (classes/verbos/funcoes) com quizzes têm agora `feedback`+`tag` em cada opção
  errada (validado por `pnpm validate`).
- Próximo passo desta fase: alargar a Português 4.º (`classes-palavras.md`,
  verbos) e a Matemática/Estudo do Meio de 1.º–4.º ainda sem `feedback`,
  reutilizando as famílias `pt-*`/`mat`-* e `problema-*` já criadas.

## Fase 3 — Plano adaptativo explicável

Problema:
- O plano adapta-se, mas nem sempre explica porquê.

Construir:
- `planReason`: uma frase curta sobre o motivo da adaptação.
- Mostrar "puxado por erros", "feito adiantado", "removido porque já está
  concluído".
- Na Área dos Pais, mostrar a causa: "Plano ajustado para reforçar medidas".

Critério de pronto:
- Pais e criança percebem por que a ordem mudou.

Estado:
- Feito em 2026-06-14: no plano completo, uma lição concluída antes do dia
  previsto aparece no dia real em que foi feita como `adiantada` e sai da
  projeção futura. A fila recalcula os próximos dias sem duplicar matéria já
  concluída.
- Feito em 2026-06-14: o topo do plano mostra uma frase curta quando houve
  trabalho adiantado hoje, explicando que os próximos dias já foram ajustados.
- Feito em 2026-06-14: a Área dos Pais mostra a mesma explicação curta no cartão
  do Plano de férias, indicando que a matéria adiantada saiu dos dias futuros.
- Feito em 2026-06-15: o plano diário e a Área dos Pais explicam quando uma
  revisão foi puxada por erros recentes no banco de erros.
- Próximo passo desta fase: guardar/mostrar mais motivos de adaptação além de
  revisões e matéria adiantada, se surgirem no motor do plano.

## Fase 4 — Inglês com áudio bilingue completo

Problema:
- Inglês mistura palavra inglesa e tradução portuguesa.

Construir:
- Sequências de fala com idioma por parte.
- `keyvalue`, `compare`, `steps` e Quiz devem poder ler inglês em `en-US` e
  explicação em `pt-PT`.
- Botão "devagar" para palavras novas.

Critério de pronto:
- "plane" é lido como inglês; "avião" como português.
- As opções de quiz em Inglês também respeitam o idioma.

Estado:
- Feito em 2026-06-15: o `Speaker` expõe os tipos de fala mista e o Quiz
  aceita `lang`/`optionLang` em perguntas e opções. Nas lições de Inglês, as
  opções passam a ser lidas em inglês quando a pergunta pede resposta "em
  inglês", e explicações do tipo `Book = livro` são lidas como sequência
  bilingue.
- Feito em 2026-06-15: snapshots do banco de erros preservam `lang` e
  `optionLang`, e o ReviewRunner também lê perguntas/opções com áudio misto.
- Feito em 2026-06-15: `Speaker` aceita `rate`, as partes de fala podem definir
  ritmo próprio, e o Quiz mostra um botão "Devagar" nas perguntas de Inglês.
- Feito em 2026-06-15: a inferência automática de opções em inglês cobre também
  lacunas, perguntas em inglês, "Completa" e "How many", no Quiz e na revisão.
- Próximo passo desta fase: aplicar `lang`/`optionLang` explicitamente às
  perguntas de Inglês que não seguem os padrões automáticos.

## Fase 5 — Interação em vez de texto

Problema:
- Algumas lições boas ainda dependem de texto comprido.

Construir:
- `ordersteps`: ordenar passos de resolução.
- `strategychoice`: escolher estratégia antes da conta.
- `listenchoice`: ouvir e escolher em Inglês.
- Mais `dragletters` e `completeword` em Português.

Critério de pronto:
- As 50 lições mais importantes têm pelo menos uma ação antes do teste.

## Fase 6 — Área dos Pais acionável

Problema:
- Dashboard tem muitos dados; precisa transformar dados em ação.

Construir:
- Card "Próxima melhor ação" (já iniciado).
- Card "Precisa de atenção".
- Botão "Criar TPC a partir deste erro".
- Relatório semanal com 3 linhas: melhorou, atenção, próxima ação.

Critério de pronto:
- Um adulto sabe em 10 segundos o que fazer a seguir.

## Fase 7 — Polimento dos widgets centrais

Problema:
- Alguns widgets ensinam bem, mas precisam de acabamento visual e responsivo.

Widgets prioritários:
- Buoyancy/barcos.
- Money/loja.
- Clock.
- Fraction/FractionStrips.
- ContaArmada.
- MapaPt e BodySystem.

Critério de pronto:
- Sem cortes em mobile.
- Estado claro.
- Botões grandes.
- Áudio correto.
- Feedback visual útil.

## Fase 8 — Missões narrativas

Construir:
- Packs de 4-8 lições com objetivo comum.

Ideias:
- Preparar uma viagem: horas, dinheiro, medidas, mapas.
- Detetive da leitura: sílabas, palavras, frases, compreensão.
- Mercado: troco, percentagens, orçamentos.
- Explorar Portugal: mapas, rios, regiões, HGP.

Critério de pronto:
- A criança sente progresso numa aventura, não só numa lista de lições.

## Fase 9 — Diagnóstico por domínio

Construir:
- Diagnóstico por ano/disciplina/domínio.
- Repetição do diagnóstico após algumas semanas.
- Plano criado com explicação.

Critério de pronto:
- O plano começa onde a criança precisa mesmo.

## Fase 10 — Curadoria pedagógica

Construir:
- Lista das 50 lições essenciais.
- Revisão profunda dessas lições.
- Validação por docente.

Critério de "lição excelente":
- começa rápido;
- tem visual útil;
- tem treino ativo;
- testa aplicação real;
- feedback ensina;
- áudio ajuda.

## Ordem de execução decidida

1. Criar runner curto do banco de erros.
2. Ligar runner à Área dos Pais e ao Plano.
3. Acrescentar feedback adaptativo nos quizzes centrais.
4. Melhorar áudio bilingue em todos os blocos de Inglês.
5. Fazer QA visual dos widgets centrais.
6. Criar "Precisa de atenção" na Área dos Pais.
7. Criar o primeiro mission pack narrativo.

## Trabalho em curso

Primeira tarefa a realizar agora:

- `ReviewRunner`: uma vista curta para revisões vencidas.
- Começar simples: agrupa por lição e abre a matéria certa.
- Evolução seguinte: puxar perguntas reais pelo id guardado no banco de erros.
