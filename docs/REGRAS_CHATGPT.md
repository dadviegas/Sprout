# Regras para o ChatGPT — Sprout

Este ficheiro serve como guia para o ChatGPT seguir quando ajudar a criar,
rever ou melhorar conteúdo do Sprout.

O objetivo é manter a app coerente: simples, bonita, adequada a crianças em
Portugal e alinhada com o currículo do 1.º ao 6.º ano.

---

## 1. Idioma e tom

- Escrever sempre em **português europeu (pt-PT)**.
- Usar linguagem clara, curta e calorosa, adequada a crianças.
- Explicar como se estivéssemos ao lado da criança, não como num manual seco.
- Evitar frases demasiado longas.
- Evitar termos brasileiros quando houver forma natural em pt-PT.
- Pode haver entusiasmo no conteúdo, mas sem exagerar.

Exemplos:

- Preferir: **autocarro**, **telemóvel**, **ficheiro**, **ecrã**, **miúdo/criança**.
- Evitar: ônibus, celular, arquivo, tela, moleque.

---

## 2. Estrutura de uma lição

Cada lição deve seguir, sempre que possível, esta ordem:

1. Título claro.
2. Bloco inicial **O que vais aprender**.
3. Explicação principal, por partes pequenas.
4. Exemplos concretos.
5. Um truque mental ou dica de memorização.
6. Um problema ou situação resolvida passo a passo.
7. Um bloco **Para saberes mais** com uma curiosidade ligeiramente mais avançada.
8. Treino/prática.
9. Questionário final.

As páginas não devem parecer demasiado condensadas. Para isso:

- Dividir texto longo em secções com `##`.
- Usar blocos visuais (`steps`, `keyvalue`, `compare`, `stats`, `timeline`,
  `chart`, `figure`) em vez de grandes parágrafos.
- Manter parágrafos com 2 a 5 linhas no máximo.
- Intercalar texto com exemplos, imagens, diagramas ou perguntas rápidas.
- Dar espaço visual antes de temas importantes.

---

## 3. Currículo e rigor

- Seguir as Aprendizagens Essenciais de Portugal como referência.
- Não inventar factos históricos, científicos ou gramaticais.
- Quando houver dúvida factual, confirmar antes de escrever.
- Não simplificar ao ponto de ficar errado.
- Quando um tema for sensível, como ditadura, guerra, reprodução ou saúde,
  explicar com cuidado, sem alarmismo e sem esconder o essencial.
- Adaptar a profundidade ao ano escolar.

Regra prática:

- 1.º e 2.º ano: frases muito simples, muito concreto.
- 3.º e 4.º ano: já pode haver pequenas relações causa/efeito.
- 5.º e 6.º ano: mais vocabulário específico, mas sempre explicado.

---

## 4. Imagens e elementos visuais

Sempre que a matéria beneficiar, adicionar um elemento visual.

Prioridade:

1. Widget já existente, se houver.
2. `figure` com imagem, ilustração ou emoji grande com legenda.
3. SVG inline simples, se ajudar mesmo.
4. Imagem externa apenas se for estável, adequada e com crédito.

Em História, usar mais:

- `timeline` para datas e períodos.
- `figure` para reis, mapas, símbolos, monumentos, cravos, caravelas, etc.
- `mapapt` quando a localização em Portugal for importante.
- `compare` para comparar regimes, períodos ou grupos sociais.

Em Matemática, usar mais:

- `math`, `chart`, `numberline`, `fraction`, `areagrid`, `angle`, `shape`.

Em Ciências e Estudo do Meio, usar mais:

- `bodysystem`, `watercycle`, `solarsystem`, `daynight`, `chart`, `figure`.

Em Inglês, usar mais:

- cartões curtos, diálogos, imagens simples, escuta/leitura em voz alta.

Todas as imagens precisam de:

- legenda curta;
- texto alternativo quando houver `src`;
- linguagem adequada à idade;
- ligação clara ao conteúdo, não decoração aleatória.

---

## 5. Questionários

O questionário deve ser mais do que “3 perguntinhas”.

Regra recomendada:

- Prática dentro da lição: **5 a 7 perguntas**.
- Questionário final: **8 a 10 perguntas**.
- Disciplinas de memorização, como História: incluir datas, pessoas, causas e
  ordem dos acontecimentos.
- Disciplinas de raciocínio, como Matemática: incluir pelo menos uma pergunta
  de aplicação, não só definição.

Cada pergunta deve ter:

- enunciado claro;
- 3 opções, salvo casos especiais;
- exatamente uma opção correta;
- explicação curta no campo `explain`;
- distratores plausíveis, não respostas absurdas demais;
- `layout: "grid"` para respostas curtas;
- `layout: "list"` para respostas compridas ou ordenações.

Evitar:

- opções quase iguais que confundem injustamente;
- perguntas só de “decorar palavra” quando o tema pede compreensão;
- explicações vazias como “porque sim”;
- respostas com texto demasiado longo dentro de cartões pequenos.

---

## 6. UI e leitura

Ao melhorar a interface:

- Dar mais espaço entre blocos.
- Limitar a largura de leitura para não criar linhas compridas.
- Destacar o questionário final como um momento especial.
- Mostrar progresso no quiz.
- Mostrar resultado com pontuação, percentagem e revisão das respostas.
- Garantir que tudo funciona em telemóvel, iPad e desktop.
- Garantir que texto não fica apertado dentro de botões ou cartões.

Manter:

- botões grandes;
- alvos fáceis de tocar;
- ícones claros;
- leitura em voz alta;
- contraste suficiente.

---

## 7. Voz alta e acessibilidade

- Toda a matéria importante deve poder ser ouvida.
- Perguntas, opções e explicações do quiz devem ter leitura em voz alta.
- A fala só deve começar quando a criança toca/clica num botão.
- Nunca usar autoplay.
- Não depender só de cor para dizer se algo está certo ou errado: usar também
  ícone, texto ou estado visual.

---

## 8. Como editar conteúdo

Ao adicionar uma lição nova:

1. Criar um ficheiro `.md` em `apps/web/src/content/...`.
2. Importar o ficheiro em `apps/web/src/content/curriculum.ts`.
3. Registar a lição no ano e disciplina certos.
4. Garantir que há prática e questionário final.
5. Correr `pnpm validate`.

Ao melhorar uma lição existente:

- Não mudar o tema principal sem necessidade.
- Melhorar por pequenas camadas: clareza, exemplos, visual, treino, quiz.
- Preservar os IDs dos quizzes quando possível, para não perder progresso.
- Se mudar um quiz profundamente, manter um ID estável só se medir a mesma coisa.

---

## 9. O que evitar

- Não transformar a app num manual gigante.
- Não criar páginas só com texto corrido.
- Não usar imagens sem utilidade pedagógica.
- Não acrescentar bibliotecas novas sem necessidade clara.
- Não duplicar dados que já existem em `curriculum.ts` ou `site.config.yaml`.
- Não pôr emoji no chrome da UI; usar `@sprout/icons`.
- Não usar linguagem adulta, sarcástica ou assustadora com crianças.
- Não criar conteúdo que pareça “encher por encher”.

---

## 10. Checklist antes de terminar

Antes de dar uma tarefa como concluída, confirmar:

- O conteúdo está em pt-PT.
- A lição ficou menos condensada, não mais pesada.
- Há exemplos concretos.
- Há pelo menos um elemento visual quando faz sentido.
- O quiz tem perguntas suficientes.
- Todas as perguntas têm explicação.
- O conteúdo passa em `pnpm validate`.
- Se houve código, correr também `pnpm typecheck` quando possível.

