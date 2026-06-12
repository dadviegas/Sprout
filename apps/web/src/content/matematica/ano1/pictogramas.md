# Pictogramas: contar com desenhos 🍎📊

> [!NOTE] **O que vais aprender** 👀 Vais aprender a **contar com desenhos**: pôr as coisas em filas arrumadinhas (um **pictograma**!) e responder num piscar de olhos a «**qual tem mais?**» — sem contar tudo outra vez. 👀⚡

A turma quer saber qual é a fruta preferida de todos. 🍎🍌🍊 Podíamos perguntar e decorar… mas há uma maneira muito mais esperta: **desenhar as respostas em filas**. Quando os desenhos estão arrumados, os teus olhos respondem sozinhos!

## Primeiro, contar bem 🔢

Antes de desenhar, conta com calma — **um dedo em cada desenho**, sem saltar nenhum:

🍎🍎🍎🍎🍎 → são **5** maçãs!

```keyvalue
[
  { "k": "Conta devagar", "v": "aponta um a um: 1, 2, 3… sem saltar nenhum ☝️" },
  { "k": "Marca os contados", "v": "risca ou tapa o que já contaste ✏️" },
  { "k": "Confere", "v": "conta outra vez — deu o mesmo? Boa! ✔️" }
]
```

## O pictograma: filas de desenhos 🍎🍌🍊

Um **pictograma** é um gráfico onde **cada desenho vale 1**. A fruta preferida da turma ficou assim:

🍎 🍎 🍎 🍎 🍎
🍌 🍌 🍌
🍊 🍊 🍊 🍊

Agora olha — nem precisas de contar para responder! A fila **mais comprida** é a das maçãs: a maçã é a fruta **preferida**. A fila **mais curta** é a das bananas: a que tem **menos** votos.

```keyvalue
[
  { "k": "Pictograma", "v": "um gráfico de desenhos — cada desenho vale 1 🍎" },
  { "k": "Fila mais comprida", "v": "é a que tem MAIS 👑" },
  { "k": "Fila mais curta", "v": "é a que tem MENOS" },
  { "k": "Regra de ouro", "v": "desenhos do MESMO tamanho, filas a começar do MESMO sítio 📏" }
]
```

> [!NOTE] A regra de ouro é importante: se uma fila começar mais à frente ou tiver desenhos gordos, **engana os olhos**! Filas alinhadas = comparação justa. ⚖️

## Do pictograma ao gráfico de barras 📊

Quando cresceres um bocadinho, os desenhos transformam-se em **barras coloridas** — a ideia é a mesma: a barra mais alta é a que tem mais!

```chart
{ "type": "bar", "title": "A fruta preferida da turma",
  "labels": ["Maçã", "Banana", "Laranja"], "data": [5, 3, 4],
  "say": "A maçã tem cinco votos, a banana três e a laranja quatro. A maçã é a preferida!" }
```

## Um exemplo passo a passo 🔍

A turma também votou no **animal preferido**: 🐶🐶🐶🐶 e 🐱🐱🐱🐱🐱🐱 e 🐟🐟. Quem ganhou?

```steps
[
  { "title": "1. Faz as filas", "body": "cães numa fila, gatos noutra, peixes noutra — alinhadinhas! 📏", "icon": "📋" },
  { "title": "2. Conta cada fila", "body": "🐶 4, 🐱 6, 🐟 2", "icon": "🔢" },
  { "title": "3. Olha para as filas", "body": "a fila dos gatos é a mais comprida! 👀", "icon": "👀" },
  { "title": "4. Responde", "body": "o animal preferido é o GATO, com 6 votos! 🐱🎉", "icon": "🎉" }
]
```

> **Truque:** num pictograma bem alinhado, **não contes logo** — olha primeiro para o **fim das filas**, como numa corrida 🏁: a fila que vai mais à frente é a que tem mais. Só contas depois, para dizer *quantos* mais!

> [!TIP] **Para saberes mais** 🌱 Em alguns pictogramas dos crescidos, um desenho pode valer **mais do que 1** — por exemplo, 🍎 = 2 votos (e vem lá escrito ao lado, numa **legenda**). Assim, 3 maçãs querem dizer 6 votos! Vais usar isso no 3.º ano, quando os números forem maiores. 😉

## Vamos praticar 🎈

```quiz
{
  "id": "mat-1-pictogramas-pratica",
  "questions": [
    { "q": "Quantas estrelas há nesta fila? ⭐⭐⭐⭐", "layout": "grid", "level": 1,
      "hint": "Aponta uma a uma: 1, 2, 3… ☝️",
      "options": [ { "t": "4", "emoji": "4️⃣", "correct": true }, { "t": "3", "emoji": "3️⃣" }, { "t": "5", "emoji": "5️⃣" } ],
      "explain": "1, 2, 3, 4 — são 4 estrelas." },
    { "q": "Num pictograma, cada desenho vale…", "layout": "grid", "level": 1,
      "hint": "Um desenho, um voto!",
      "options": [ { "t": "1", "emoji": "1️⃣", "correct": true }, { "t": "10", "emoji": "🔟" }, { "t": "0", "emoji": "0️⃣" } ],
      "explain": "No nosso pictograma, cada desenho vale 1." },
    { "q": "🍦🍦🍦🍦🍦\n🍩🍩🍩\nQual tem MAIS?", "layout": "grid", "level": 1,
      "hint": "Olha para o fim das filas, como numa corrida! 🏁",
      "options": [ { "t": "os gelados", "emoji": "🍦", "correct": true }, { "t": "os donuts", "emoji": "🍩" } ],
      "explain": "A fila dos gelados é mais comprida: 5 contra 3." },
    { "q": "🐶🐶🐶🐶\n🐱🐱🐱🐱🐱🐱\n🐟🐟\nQual tem MENOS?", "layout": "grid", "level": 1,
      "hint": "Procura a fila mais curtinha.",
      "options": [ { "t": "os peixes", "emoji": "🐟", "correct": true }, { "t": "os gatos", "emoji": "🐱" }, { "t": "os cães", "emoji": "🐶" } ],
      "explain": "A fila dos peixes só tem 2 — é a mais curta." },
    { "q": "No pictograma das frutas, a maçã tem 5 e a laranja 4. Quantas a mais tem a maçã?", "layout": "grid", "level": 2,
      "hint": "Compara: 5 − 4 = ?",
      "options": [ { "t": "1", "emoji": "1️⃣", "correct": true }, { "t": "9", "emoji": "9️⃣" }, { "t": "2", "emoji": "2️⃣" } ],
      "explain": "5 − 4 = 1 — a maçã tem só 1 voto a mais." },
    { "q": "Para o pictograma ser justo, as filas devem…", "layout": "list", "level": 2,
      "hint": "Pensa numa corrida: todos partem do mesmo sítio! 🏁",
      "options": [ { "t": "começar do mesmo sítio, com desenhos do mesmo tamanho", "emoji": "📏", "correct": true }, { "t": "ter cores bonitas" }, { "t": "começar onde calhar" } ],
      "explain": "Filas alinhadas e desenhos iguais — senão os olhos enganam-se!" },
    { "q": "No gráfico de barras, a barra MAIS ALTA é a que…", "layout": "grid", "level": 2,
      "hint": "É como a fila mais comprida do pictograma.",
      "options": [ { "t": "tem mais", "emoji": "👑", "correct": true }, { "t": "tem menos" }, { "t": "é mais bonita" } ],
      "explain": "Barra mais alta = mais votos, igual à fila mais comprida." },
    { "q": "🐶 4 votos, 🐱 6 votos, 🐟 2 votos. Quantos meninos votaram ao todo?", "layout": "grid", "level": 3,
      "hint": "Junta as três filas: 4 + 6 + 2.",
      "options": [ { "t": "12", "correct": true }, { "t": "10" }, { "t": "6" } ],
      "explain": "4 + 6 = 10, mais 2 → 12 votos ao todo." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-1-pictogramas-final",
  "final": true,
  "title": "Pictogramas: contar com desenhos",
  "questions": [
    { "q": "Quantos corações há? ❤️❤️❤️", "layout": "grid", "level": 1,
      "hint": "Conta com o dedo: 1, 2…",
      "options": [ { "t": "3", "correct": true }, { "t": "2" }, { "t": "4" } ],
      "explain": "São 3 corações." },
    { "q": "Um pictograma é um gráfico feito de…", "layout": "grid", "level": 1,
      "hint": "Picto faz lembrar «pintura»…",
      "options": [ { "t": "desenhos", "emoji": "🍎", "correct": true }, { "t": "letras", "emoji": "🔤" }, { "t": "moedas", "emoji": "🪙" } ],
      "explain": "Pictograma = gráfico de desenhos, cada um vale 1." },
    { "q": "⚽⚽⚽⚽⚽⚽\n🏀🏀🏀\nQual é o desporto com MAIS votos?", "layout": "grid", "level": 1,
      "hint": "A fila mais comprida ganha a corrida! 🏁",
      "options": [ { "t": "o futebol", "emoji": "⚽", "correct": true }, { "t": "o basquete", "emoji": "🏀" } ],
      "explain": "6 bolas de futebol contra 3 — ganha o futebol." },
    { "q": "⚽ tem 6 votos e 🏀 tem 3. Quantos votos tem o futebol A MAIS?", "layout": "grid", "level": 2,
      "hint": "É uma conta de comparar: 6 − 3.",
      "options": [ { "t": "3", "correct": true }, { "t": "9" }, { "t": "2" } ],
      "explain": "6 − 3 = 3 votos a mais." },
    { "q": "🌧️🌧️\n☀️☀️☀️☀️☀️\nNesta semana houve mais dias de…", "layout": "grid", "level": 2,
      "hint": "Qual é a fila mais comprida?",
      "options": [ { "t": "sol", "emoji": "☀️", "correct": true }, { "t": "chuva", "emoji": "🌧️" } ],
      "explain": "5 dias de sol contra 2 de chuva." },
    { "q": "A fila mais CURTA do pictograma é a que tem…", "layout": "grid", "level": 1,
      "hint": "É o contrário da fila vencedora.",
      "options": [ { "t": "menos", "correct": true }, { "t": "mais" } ],
      "explain": "Fila curta = menos; fila comprida = mais." },
    { "q": "🍪 5, 🧁 5. Qual tem mais?", "layout": "grid", "level": 2,
      "hint": "Olha bem para os números…",
      "options": [ { "t": "nenhum — estão empatados!", "emoji": "🤝", "correct": true }, { "t": "as bolachas", "emoji": "🍪" }, { "t": "os queques", "emoji": "🧁" } ],
      "explain": "5 e 5 — é um empate!" },
    { "q": "Antes de fazer as filas do pictograma, o que fazes primeiro?", "layout": "list", "level": 3,
      "hint": "Sem isto, as filas saem erradas…",
      "options": [ { "t": "conto com cuidado, um a um", "emoji": "☝️", "correct": true }, { "t": "desenho à sorte" }, { "t": "escolho a minha fruta preferida" } ],
      "explain": "Primeiro conta-se bem; depois desenham-se as filas alinhadas." }
  ]
}
```
