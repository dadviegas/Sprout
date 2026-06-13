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
