# Next steps — levar o Sprout a outro nível

Data: 2026-06-12

Objetivo: transformar o Sprout de uma app com muita matéria numa experiência que
funciona mais como tutor: percebe o que a criança fez, adapta o plano, ajuda os
pais a agir e melhora a qualidade do treino.

## Prioridade 1 — Tutor adaptativo

Estado atual:
- Há quizzes, testes finais, progresso, banco de erros e plano diário.
- As respostas erradas já podem alimentar revisão.

Próximo salto:
- Quando a criança erra, explicar o tipo de erro, não apenas a resposta certa.
- Mostrar uma mini-explicação personalizada: "Confundiste litros com mililitros"
  ou "Leste a pergunta depressa".
- Sugerir um exercício parecido logo a seguir.

Implementação sugerida:
- Acrescentar `misconception` opcional às perguntas de quiz.
- Acrescentar `retryWithHint` para perguntas centrais.
- Guardar estatísticas por tipo de erro.
- Na UI do Quiz, mostrar feedback específico quando existir.

Primeiras lições candidatas:
- Matemática 4.º: problemas de vários passos, volume/capacidade, percentagens.
- Português 1.º: leitura inicial, sílabas, casos de leitura.
- Inglês: vocabulário básico e frases curtas.

## Prioridade 2 — Banco de erros mais forte

Estado atual:
- Já existe revisão espaçada por pergunta.
- A Área dos Pais já mostra uma próxima ação quando há erros vencidos.

Próximo salto:
- Agrupar erros por tema: medidas, dinheiro, leitura, vocabulário, gramática.
- Mostrar "Hoje vamos vencer 3 erros antigos".
- Criar uma vista curta só de revisão, sem obrigar a reler a lição inteira.

Implementação sugerida:
- Acrescentar `tags` às perguntas importantes.
- Criar um runner de revisão com perguntas do banco.
- Mostrar progresso do banco: vencidas hoje, por vencer, dominadas.

Critério de sucesso:
- A criança consegue fazer uma sessão de 5 minutos só para limpar erros antigos.

## Prioridade 3 — Plano adaptativo real

Estado atual:
- O plano de férias gera missões e adapta-se a matéria já feita.
- A Área dos Pais mostra a próxima melhor ação.

Próximo salto:
- Explicar por que o plano mudou: "puxei medidas porque houve erros aí".
- Remover automaticamente matéria já feita fora da ordem.
- Puxar revisão quando uma área fica fraca.
- Mostrar ao adulto uma frase clara: "Plano ajustado para reforçar Matemática".

Implementação sugerida:
- Criar um resumo `planReason`.
- Usar erros por tag/disciplina para influenciar a fila.
- Mostrar "foi adiantado", "foi removido", "foi puxado para revisão".

## Prioridade 4 — Áudio bilingue melhor

Estado atual:
- O áudio em português existe em toda a app.
- Os blocos de Inglês podem usar voz inglesa em cartões sonoros.

Próximo salto:
- Ler palavras/frases inglesas em inglês e explicações em português.
- Ter botão "ouvir devagar".
- Criar exercícios "ouve e escolhe".

Implementação sugerida:
- Suportar sequências mistas por bloco: parte inglesa `en-US`, explicação `pt-PT`.
- Aplicar a `keyvalue`, `compare`, `steps`, quiz e opções.
- Acrescentar `slow` ou `rate` opcional no Speaker.

Critério de sucesso:
- Numa lição de Inglês, "plane" soa a inglês e "avião" soa a português.

## Prioridade 5 — Mais interação, menos texto

Estado atual:
- Há widgets bons: dinheiro, relógio, frações, linhas, mapas, corpo, etc.
- Algumas páginas ainda dependem de texto longo.

Próximo salto:
- Trocar explicações longas por ações pequenas.
- A criança deve fazer, arrastar, escolher, ordenar e completar.

Exercícios prioritários:
- Ordenar passos de resolução.
- Escolher a estratégia antes da conta.
- Completar palavra/frase.
- Arrastar etiquetas para mapas/diagramas.
- "Ouve e escolhe" em Inglês.

Primeiros alvos:
- Matemática 4.º: problemas, medidas, dinheiro.
- Português: escrita guiada e revisão de texto.
- Estudo do Meio/Ciências: experiências, corpo, mapas.

## Prioridade 6 — Área dos Pais com decisões claras

Estado atual:
- Há dashboard, calendário, TPC, banco de erros e próxima ação.

Próximo salto:
- Mostrar "o que domina", "o que precisa rever" e "o que fazer agora".
- Tornar cada item acionável com link direto.
- Criar resumo semanal simples.

Implementação sugerida:
- Card "Precisa de atenção" por disciplina/tag.
- Card "Melhorou esta semana".
- Botão "criar TPC a partir deste problema".
- Botão "abrir revisão de 5 minutos".

## Prioridade 7 — Polimento dos widgets centrais

Estado atual:
- Muitos widgets já existem e são úteis.
- Alguns precisam de revisão visual em mobile/tablet/desktop.

Próximo salto:
- Fazer ronda de QA visual nos widgets mais usados.
- Corrigir cortes, alinhamentos, overflow e estados confusos.
- Melhorar feedback visual.

Checklist:
- Não corta em telemóvel.
- Estado atual é claro.
- Botões têm alvos grandes.
- O áudio lê o que se espera.
- O widget ensina algo sem depender só do texto à volta.

Widgets prioritários:
- Buoyancy/barcos.
- Money/loja.
- Clock.
- Fraction/FractionStrips.
- ContaArmada.
- Mapas e corpo humano.

## Prioridade 8 — Missões narrativas

Ideia:
- Transformar conjuntos de lições em pequenas aventuras.

Exemplos:
- "Preparar uma viagem": dinheiro, horas, medidas, mapas.
- "Detetive da leitura": sílabas, palavras, frases, compreensão.
- "Mercado": troco, percentagens, listas, orçamentos.
- "Explorar Portugal": mapas, rios, regiões, HGP.

Implementação sugerida:
- Criar `mission packs` com 4-8 lições.
- Cada pack tem objetivo, progresso e recompensa visual.
- Reutilizar progresso existente, sem criar outro sistema pesado.

## Prioridade 9 — Diagnóstico inicial mais forte

Estado atual:
- Há mini-teste diagnóstico opcional.

Próximo salto:
- Diagnóstico por ano com leitura clara para pais.
- Plano gerado com explicação.
- Repetir diagnóstico depois de algumas semanas.

Implementação sugerida:
- Banco de perguntas por ano/disciplina.
- Resultado por domínio, não só por disciplina.
- "Começar por aqui" automático.

## Prioridade 10 — Curadoria pedagógica

Ideia:
- A app já tem muita cobertura. O salto vem de escolher as lições centrais e
  deixá-las excelentes.

Plano:
- Escolher as 50 lições mais importantes.
- Aumentar qualidade de exemplos, treino e feedback.
- Rever por docente do 1.º/2.º ciclo.
- Garantir que cada lição tem aplicação real.

Critério de "lição excelente":
- Explica depressa.
- Tem visual útil.
- Tem prática antes do teste.
- O teste tem perguntas de aplicação.
- O feedback ensina.
- Funciona bem com áudio.

## Ordem recomendada de execução

1. Banco de erros com runner de revisão.
2. Feedback adaptativo nos quizzes.
3. Plano com razão de adaptação.
4. Áudio bilingue completo em Inglês.
5. QA visual dos widgets centrais.
6. Área dos Pais com "precisa de atenção" e TPC a partir de erro.
7. Mission packs narrativos.
8. Diagnóstico por domínio.
9. Curadoria das 50 lições principais.

## Próxima tarefa pequena

Criar a primeira versão do runner de revisão:
- recebe itens vencidos do banco de erros;
- mostra 5 perguntas;
- abre a lição se a criança precisar de rever;
- ao acertar, sobe a pergunta na escala de revisão.

Esta é a melhoria com melhor relação impacto/esforço porque aproveita dados que
a app já guarda e transforma erros antigos em treino curto e diário.
