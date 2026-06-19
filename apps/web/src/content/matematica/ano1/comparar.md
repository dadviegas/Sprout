# Comparar e ordenar números ⚖️

> [!NOTE] **O que vais aprender** 👀 Vais aprender a ver **quem tem mais** e **quem tem menos**, a usar os sinais mágicos **>**, **<** e **=**, e a pôr os números **em fila** do menor ao maior. 🐊

Quem tem mais maçãs? Quem ficou com menos rebuçados? Comparar é como ser um detetive dos números! 🕵️ Vamos descobrir tudo a contar montinhos de fruta e a brincar com um crocodilo guloso. 🍎🍊🐊

## Maior, menor ou igual? 🤔

Comparar é olhar para dois grupos e ver **qual tem mais** e **qual tem menos**. Imagina dois montes de maçãs:

- 🍎🍎🍎🍎🍎 (5 maçãs)
- 🍎🍎🍎 (3 maçãs)

O monte de **5** tem **mais** que o de **3**. Dizemos: **5 é maior que 3**.

Para escrever isto sem fazer desenhos, usamos três **sinais mágicos**:

```keyvalue
[
  { "k": "Maior que   >", "v": "o primeiro número é o GRANDE: 5 > 3 🐊" },
  { "k": "Menor que   <", "v": "o primeiro número é o pequenino: 3 < 5 🐣" },
  { "k": "Igual   =", "v": "são exatamente os mesmos: 4 = 4 🙂" }
]
```

> [!TIP] O sinal **>** ou **<** é como um crocodilo guloso 🐊 — abre sempre a boca grande para comer o número **maior**!

## O crocodilo guloso 🐊

Olha bem: a boca aberta vira-se sempre para o número **maior**, e a pontinha aponta para o **menor**. Assim nunca te enganas!

```compare
[
  { "title": "O crocodilo olha para a esquerda 🐊", "rows": [
    { "label": "8 > 2", "value": "a boca come o 8, que é o maior", "highlight": true },
    { "label": "9 > 5", "value": "a boca come o 9, que é o maior" }
  ] },
  { "title": "O crocodilo olha para a direita 🐊", "rows": [
    { "label": "2 < 8", "value": "a boca come o 8, que é o maior", "highlight": true },
    { "label": "5 < 9", "value": "a boca come o 9, que é o maior" }
  ] }
]
```

> [!TIP] Truque rápido: a boca aberta é sempre maior do que a pontinha. A boca fica do lado do número grande! 😄

## A reta dos números 🔢

Os números fazem uma fila: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10… Quem está mais **à direita** é o **maior**; quem está mais **à esquerda** é o **menor**.

```numberline
{ "min": 0, "max": 10, "start": 7, "step": 1, "title": "O 7 está mais à frente que o 4 → 7 é maior!" }
```

```keyvalue
[
  { "k": "Mais à direita ➡️", "v": "número maior (o 9 é maior que o 6) 📈" },
  { "k": "Mais à esquerda ⬅️", "v": "número menor (o 1 é menor que o 5) 📉" },
  { "k": "O zero 0️⃣", "v": "fica no princípio: é o mais pequenino de todos 🐭" }
]
```

## Quem tem mais? Vamos contar 📊

Quando os grupos têm a mesma coisa, basta contar e comparar os totais. Olha quantos animais há em cada tanque:

```meters
[
  { "label": "🐠 Tanque da Rita", "value": 8, "max": 10, "tone": "ok" },
  { "label": "🐠 Tanque do Tó", "value": 5, "max": 10, "tone": "warn" },
  { "label": "🐠 Tanque da Bia", "value": 8, "max": 10, "tone": "ok" }
]
```

A Rita tem **8** peixes e o Tó tem **5**: a Rita tem **mais** (8 > 5). A Rita e a Bia têm os dois **8**: são **iguais** (8 = 8)! 🐠

Num **gráfico de barras** vês logo quem tem mais — a barra mais alta ganha, sem precisares de contar!

```chart
{ "type": "bar", "title": "Quantos peixes tem cada tanque?",
  "labels": ["🐠 Rita", "🐠 Tó", "🐠 Bia"], "data": [8, 5, 8],
  "unit": "peixes",
  "say": "A Rita tem oito peixes, o Tó tem cinco e a Bia tem oito. A barra mais baixa é a do Tó — é quem tem menos." }
```

## Pôr em fila: ordenar 🧮

Ordenar é pôr vários números **por ordem**, como amigos na fila do recreio do mais baixo ao mais alto. 📏

```steps
[
  { "title": "Junta os números", "body": "por exemplo: 5, 2 e 8 🔢", "icon": "🧺" },
  { "title": "Procura o mais pequeno", "body": "o 2 é o menor — fica à frente da fila", "icon": "🥇" },
  { "title": "Depois o do meio", "body": "a seguir vem o 5", "icon": "🥈" },
  { "title": "Por fim o maior", "body": "o 8 fecha a fila: 2 < 5 < 8 🎉", "icon": "🥉" }
]
```

> [!NOTE] Do **menor ao maior** chama-se **ordem crescente** (a fila sobe ⬆️). Do **maior ao menor** chama-se **ordem decrescente** (a fila desce ⬇️).

## Um exemplo passo a passo 🔍

Vamos comparar **7** e **4** e decidir que sinal usar.

```steps
[
  { "title": "1. Vê os dois números", "body": "Temos o 7 e o 4. Qual é maior? 🤔", "icon": "👀" },
  { "title": "2. Conta", "body": "7 maçãs 🍎🍎🍎🍎🍎🍎🍎 são mais do que 4 maçãs 🍎🍎🍎🍎.", "icon": "🍎" },
  { "title": "3. Aponta o crocodilo", "body": "A boca abre para o maior: 🐊 vira-se para o 7.", "icon": "🐊" },
  { "title": "4. Escreve", "body": "7 > 4 (sete é maior que quatro). E também 4 < 7. Boa! 🎉", "icon": "✍️" }
]
```

> **Truque:** o crocodilo 🐊 **come sempre o maior**. E na reta dos números, quem está mais **à direita** ganha — é o número maior!

> [!TIP] **Para saberes mais** 🌱 Quando comparas números com **dois algarismos**, olha primeiro para o algarismo da frente (as **dezenas**). Em **23** e **31**, o 3 de 31 vale mais que o 2 de 23, por isso **31 > 23** — nem é preciso olhar para o resto! 🤯

## Vamos praticar 🎈

```quiz
{
  "id": "mat-1-comparar-pratica",
  "questions": [
    { "q": "🍎🍎🍎🍎🍎 e 🍎🍎. Qual é verdade?", "layout": "grid",
      "options": [ { "t": "5 > 2", "emoji": "🐊", "correct": true }, { "t": "5 < 2", "feedback": "Esse sinal diz que 5 é menor. Mas 5 maçãs são mais que 2: 5 > 2.", "tag": "comparar-numeros" }, { "t": "5 = 2", "feedback": "«=» é só quando são iguais. 5 e 2 são diferentes: 5 > 2.", "tag": "comparar-numeros" } ],
      "explain": "5 maçãs são mais que 2: 5 > 2." },
    { "q": "Que sinal vai entre 3 ___ 8?", "layout": "grid",
      "options": [ { "t": "menor que   <", "correct": true }, { "t": "maior que   >", "feedback": "«>» diria que 3 é maior, mas 3 vem antes do 8 na reta: 3 < 8.", "tag": "comparar-numeros" }, { "t": "igual   =", "feedback": "«=» é só quando são iguais. 3 e 8 são diferentes: 3 < 8.", "tag": "comparar-numeros" } ],
      "explain": "3 é menor que 8, então 3 < 8." },
    { "q": "O crocodilo 🐊 come o número maior. Para onde abre a boca em 9 ___ 4?", "layout": "grid",
      "options": [ { "t": "9 > 4", "emoji": "🐊", "correct": true }, { "t": "9 < 4", "feedback": "A boca tem de abrir para o maior, e o 9 é maior que o 4: 9 > 4.", "tag": "comparar-numeros" } ],
      "explain": "9 é maior, a boca abre para o 9: 9 > 4." },
    { "q": "Na reta dos números, quem está mais à direita?", "layout": "grid",
      "options": [ { "t": "o número maior", "emoji": "➡️", "correct": true }, { "t": "o número menor", "feedback": "Trocaste os lados: o menor fica à esquerda. Mais à direita é o maior.", "tag": "comparar-numeros" } ],
      "explain": "Mais à direita = maior; mais à esquerda = menor." },
    { "q": "Completa: 6 ___ 6", "layout": "grid",
      "options": [ { "t": "igual   =", "correct": true }, { "t": "maior que   >", "feedback": "Os dois números são iguais, nenhum é maior: 6 = 6.", "tag": "comparar-numeros" }, { "t": "menor que   <", "feedback": "Os dois números são iguais, nenhum é menor: 6 = 6.", "tag": "comparar-numeros" } ],
      "explain": "São os mesmos números: 6 = 6." },
    { "q": "A Rita tem 8 peixes 🐠 e o Tó tem 5. Quem tem mais?", "layout": "grid",
      "options": [ { "t": "a Rita (8)", "emoji": "🐠", "correct": true }, { "t": "o Tó (5)", "feedback": "O Tó tem menos: 5 é menor que 8. Quem tem mais é a Rita.", "tag": "comparar-numeros" } ],
      "explain": "8 é maior que 5, a Rita tem mais peixes." },
    { "q": "Qual é o número mais pequeno?", "layout": "grid",
      "options": [ { "t": "0", "emoji": "0️⃣", "correct": true }, { "t": "3", "feedback": "O 3 não é o menor: o 0 fica antes dele na reta. O mais pequeno é o 0.", "tag": "comparar-numeros" }, { "t": "7", "feedback": "O 7 é dos maiores aqui. O mais pequeno é o 0, no princípio da reta.", "tag": "comparar-numeros" } ],
      "explain": "O zero é o mais pequenino, fica no princípio da reta." },
    { "q": "Do menor ao maior (ordem crescente): 4, 1, 7?", "layout": "grid",
      "options": [ { "t": "1 < 4 < 7", "correct": true }, { "t": "7 < 4 < 1", "feedback": "Essa fila está ao contrário (do maior ao menor). Do menor ao maior: 1 < 4 < 7.", "tag": "ordenar-numeros" }, { "t": "4 < 1 < 7", "feedback": "O 1 é o menor, tem de vir primeiro: 1 < 4 < 7.", "tag": "ordenar-numeros" } ],
      "explain": "Do menor ao maior: 1, depois 4, depois 7." },
    { "q": "Qual destes é maior?", "layout": "grid",
      "options": [ { "t": "10", "correct": true }, { "t": "6", "feedback": "O 6 é o mais pequeno aqui. O maior é o 10, que está mais à frente na reta.", "tag": "comparar-numeros" }, { "t": "9", "feedback": "Quase! Mas o 10 vem depois do 9 na reta, por isso o 10 é maior.", "tag": "comparar-numeros" } ],
      "explain": "O 10 está mais à frente na reta, é o maior." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-1-comparar-final",
  "final": true,
  "title": "Comparar e ordenar números",
  "questions": [
    { "q": "Qual é o número maior?", "layout": "grid",
      "options": [ { "t": "12", "correct": true }, { "t": "9" }, { "t": "7" } ],
      "explain": "12 está mais à frente na reta, é o maior." },
    { "q": "Completa: 4 ___ 4", "layout": "grid",
      "options": [ { "t": "igual   =", "correct": true }, { "t": "maior que   >" }, { "t": "menor que   <" } ],
      "explain": "São os mesmos: 4 = 4." },
    { "q": "🐊 abre a boca para o maior. 6 ___ 10?", "layout": "grid",
      "options": [ { "t": "6 < 10", "emoji": "🐊", "correct": true }, { "t": "6 > 10" } ],
      "explain": "10 é maior, então 6 < 10." },
    { "q": "Do menor ao maior, qual fila está certa?", "layout": "grid",
      "options": [ { "t": "2 < 5 < 8", "correct": true }, { "t": "8 < 5 < 2" }, { "t": "5 < 2 < 8" } ],
      "explain": "Do menor ao maior: 2, depois 5, depois 8." },
    { "q": "Que sinal vai entre 9 ___ 3?", "layout": "grid",
      "options": [ { "t": "maior que   >", "emoji": "🐊", "correct": true }, { "t": "menor que   <" }, { "t": "igual   =" } ],
      "explain": "9 é maior que 3, então 9 > 3." },
    { "q": "Na reta dos números, quem está mais à esquerda é…", "layout": "grid",
      "options": [ { "t": "o menor", "emoji": "⬅️", "correct": true }, { "t": "o maior" } ],
      "explain": "Mais à esquerda = menor; mais à direita = maior." },
    { "q": "Pôr do MAIOR ao menor (ordem decrescente): 3, 8, 5?", "layout": "grid",
      "options": [ { "t": "8 > 5 > 3", "correct": true }, { "t": "3 > 5 > 8" }, { "t": "5 > 8 > 3" } ],
      "explain": "Do maior ao menor: 8, depois 5, depois 3." },
    { "q": "🍊🍊🍊🍊🍊🍊 (6) e 🍊🍊🍊🍊🍊🍊🍊🍊🍊 (9). Quem tem mais?", "layout": "grid",
      "options": [ { "t": "o monte de 9", "emoji": "🍊", "correct": true }, { "t": "o monte de 6" } ],
      "explain": "9 é maior que 6: 9 > 6." },
    { "q": "Qual é o mais pequeno destes três?", "layout": "grid",
      "options": [ { "t": "1", "correct": true }, { "t": "4" }, { "t": "2" } ],
      "explain": "O 1 é o menor: 1 < 2 < 4." }
  ]
}
```
