# Números até 10 🔟

> [!NOTE] **O que vais aprender** 👀 Vais aprender a **contar do 1 até ao 10**, a ligar cada número à sua **quantidade** e a saber qual é o número **maior** e o **menor**. Vamos contar juntos! 🍎🖐️

Olá! Os números são amigos que nos dizem **quantas coisas** temos: quantos balões, quantos gatinhos, quantos dedos. 🎈🐱 Quando sabes contar até **10**, já consegues saber quantas coisas estão à tua frente. E o melhor é que tens sempre a contadora perfeita contigo: as tuas **mãos**! 🙌

## Conta comigo de 1 a 10 🔢

Cada número tem um **nome** e uma **quantidade**. Olha bem e vai dizendo em voz alta:

```keyvalue
[
  { "k": "1 — um", "v": "🍎" },
  { "k": "2 — dois", "v": "🍎🍎" },
  { "k": "3 — três", "v": "🍎🍎🍎" },
  { "k": "4 — quatro", "v": "🍎🍎🍎🍎" },
  { "k": "5 — cinco", "v": "✋ uma mão cheia!" },
  { "k": "6 — seis", "v": "✋🍎" },
  { "k": "7 — sete", "v": "✋🍎🍎" },
  { "k": "8 — oito", "v": "✋🍎🍎🍎" },
  { "k": "9 — nove", "v": "✋🍎🍎🍎🍎" },
  { "k": "10 — dez", "v": "✋✋ duas mãos cheias! 🙌" }
]
```

> [!TIP] Conta sempre **a apontar com o dedo** para cada coisa. Um dedo, um número, uma coisa. Assim nunca te enganas! 👆

## As tuas mãos contam até 10 🖐️

A tua mão tem **5 dedos**. Duas mãos têm **10 dedos**. Por isso as mãos são a melhor máquina de contar do mundo!

```meters
[
  { "label": "🖐️ Uma mão", "value": 5, "max": 10, "tone": "ok" },
  { "label": "🙌 Duas mãos", "value": 10, "max": 10, "tone": "ok" }
]
```

Levanta os dedos enquanto contas: 1, 2, 3, 4, **5** (uma mão!), 6, 7, 8, 9, **10** (as duas mãos!). 🎉

## Brinca com a caixa do 10 📦

Esta caixa tem **10 lugares**: 5 em cima e 5 em baixo. Toca nas bolinhas para contar. Vê como o **5** enche uma fila e o **10** enche as duas! 👇

```tenframe
{ "count": 6, "emoji": "🍎", "title": "Toca para contar até 6" }
```

A caixa do 10 ajuda-te a ver os números **sem contar um a um**. Quando vês uma fila cheia, já sabes que são **5**! 🙂

## A fila dos números 🚂

Os números andam sempre pela **mesma ordem**, como uma fila de comboio. Cada número tem o seu lugar:

```numberline
{ "min": 0, "max": 10, "start": 4, "step": 1, "title": "Salta de número em número: 0, 1, 2, 3, 4…" }
```

```steps
[
  { "title": "1, 2, 3…", "body": "os primeiros amigos da fila 🚂", "icon": "🟢" },
  { "title": "4, 5, 6…", "body": "vamos a meio do caminho!", "icon": "🟡" },
  { "title": "7, 8, 9, 10", "body": "chegámos ao fim: o 10! 🎉", "icon": "🏁" }
]
```

> [!NOTE] Depois do **3** vem o **4**. Depois do **9** vem o **10**. O número que vem a seguir é sempre **mais um**. ➕

## Maior ou menor? 📏

Na fila dos números, quem está **mais à frente** é **maior**. Quem está **mais atrás** é **menor**.

```compare
[
  { "title": "Números pequenos 🐭", "rows": [
    { "label": "1", "value": "🍎" },
    { "label": "2", "value": "🍎🍎" },
    { "label": "3", "value": "🍎🍎🍎" }
  ] },
  { "title": "Números grandes 🐘", "rows": [
    { "label": "8", "value": "muitas coisas!" },
    { "label": "9", "value": "quase 10" },
    { "label": "10", "value": "o maior de todos! 🏆", "highlight": true }
  ] }
]
```

O **10** é o maior número desta lição. O **1** é o mais pequeno. O **0** quer dizer **nenhum**: não há nada para contar! ⭕

## Um exemplo passo a passo 🔍

Imagina esta pergunta: *«Tenho 3 maçãs e a minha amiga dá-me mais 1. Quantas tenho agora?»* Vamos resolver com calma. 🍎

```steps
[
  { "title": "1. Conta o que tens", "body": "primeiro tens 3 maçãs: 🍎🍎🍎", "icon": "🔢" },
  { "title": "2. Junta a nova", "body": "a tua amiga dá-te mais 1: 🍎", "icon": "🤝" },
  { "title": "3. Conta tudo outra vez", "body": "1, 2, 3… e mais 1 = 4! 🍎🍎🍎🍎", "icon": "👆" },
  { "title": "4. Resposta", "body": "tens 4 maçãs! Depois do 3 vem sempre o 4 ✅", "icon": "🎉" }
]
```

> **Truque:** para saber o número que vem **a seguir**, levanta mais **um dedo**. Se tens 6 dedos no ar e levantas mais um, ficas com **7**. A seguir é sempre **mais um**! ☝️

> [!TIP] **Para saberes mais** 🌱 Sabias que o **zero (0)** também é um número? Quer dizer **nenhum**: se comeste todas as bolachas, ficaste com **0 bolachas**! 🍪 E há números muito maiores que o 10 — depois do 10 vêm o **11, 12, 13**… e nunca mais acabam! Por isso dizemos que os números são **infinitos**. ♾️

## Vamos praticar 🎈

```quiz
{
  "id": "mat1-n10-pratica",
  "questions": [
    { "q": "Quantos balões há?", "emoji": "🎈🎈🎈", "layout": "grid",
      "options": [ { "t": "2", "emoji": "2️⃣" }, { "t": "3", "emoji": "3️⃣", "correct": true }, { "t": "5", "emoji": "5️⃣" } ],
      "explain": "Conta: 1, 2, 3! São 3 balões." },
    { "q": "Quantos gatinhos vês?", "emoji": "🐱🐱🐱🐱🐱", "layout": "grid",
      "options": [ { "t": "4", "emoji": "4️⃣" }, { "t": "5", "emoji": "5️⃣", "correct": true }, { "t": "6", "emoji": "6️⃣" } ],
      "explain": "Uma mão cheia: 5 gatinhos! ✋" },
    { "q": "Quantos dedos tem uma mão?", "emoji": "✋", "layout": "grid",
      "options": [ { "t": "5", "emoji": "5️⃣", "correct": true }, { "t": "3", "emoji": "3️⃣" }, { "t": "10", "emoji": "🔟" } ],
      "explain": "Uma mão tem 5 dedos." },
    { "q": "Que número vem depois do 4?", "layout": "grid",
      "options": [ { "t": "3", "emoji": "3️⃣" }, { "t": "5", "emoji": "5️⃣", "correct": true }, { "t": "6", "emoji": "6️⃣" } ],
      "explain": "Depois do 4 vem o 5. É sempre mais um!" },
    { "q": "Quantas estrelas?", "emoji": "⭐⭐", "layout": "grid",
      "options": [ { "t": "1", "emoji": "1️⃣" }, { "t": "2", "emoji": "2️⃣", "correct": true }, { "t": "4", "emoji": "4️⃣" } ],
      "explain": "1, 2 estrelas!" },
    { "q": "Qual é o número MAIOR?", "layout": "grid",
      "options": [ { "t": "8", "emoji": "8️⃣", "correct": true }, { "t": "3", "emoji": "3️⃣" }, { "t": "1", "emoji": "1️⃣" } ],
      "explain": "O 8 está mais à frente na fila, por isso é o maior." },
    { "q": "Quantos corações vês?", "emoji": "❤️❤️❤️❤️", "layout": "grid",
      "options": [ { "t": "4", "emoji": "4️⃣", "correct": true }, { "t": "3", "emoji": "3️⃣" }, { "t": "5", "emoji": "5️⃣" } ],
      "explain": "Conta: 1, 2, 3, 4 corações!" },
    { "q": "Quantos dedos têm as DUAS mãos?", "emoji": "🙌", "layout": "grid",
      "options": [ { "t": "10", "emoji": "🔟", "correct": true }, { "t": "5", "emoji": "5️⃣" }, { "t": "2", "emoji": "2️⃣" } ],
      "explain": "5 + 5 = 10. Duas mãos têm 10 dedos!" },
    { "q": "Se não há nada para contar, o número é…", "layout": "grid",
      "options": [ { "t": "0 (zero)", "emoji": "⭕", "correct": true }, { "t": "1", "emoji": "1️⃣" }, { "t": "10", "emoji": "🔟" } ],
      "explain": "Zero quer dizer nenhum: não há nada!" }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat1-n10-final",
  "final": true,
  "title": "Números até 10",
  "questions": [
    { "q": "Quantas estrelas?", "emoji": "⭐⭐⭐⭐", "layout": "grid", "level": 1,
      "hint": "Aponta com o dedo e conta uma a uma.",
      "options": [ { "t": "3", "emoji": "3️⃣" }, { "t": "4", "emoji": "4️⃣", "correct": true }, { "t": "6", "emoji": "6️⃣" } ],
      "explain": "1, 2, 3, 4 estrelas!" },
    { "q": "Que número vem depois do 6?", "layout": "grid", "level": 1,
      "hint": "O que vem a seguir é sempre mais um.",
      "options": [ { "t": "5", "emoji": "5️⃣" }, { "t": "7", "emoji": "7️⃣", "correct": true }, { "t": "8", "emoji": "8️⃣" } ],
      "explain": "Depois do 6 vem o 7." },
    { "q": "Quantos dedos tem uma mão?", "emoji": "✋", "layout": "grid", "level": 1,
      "hint": "Abre a tua mão e conta!",
      "options": [ { "t": "5", "emoji": "5️⃣", "correct": true }, { "t": "10", "emoji": "🔟" }, { "t": "3", "emoji": "3️⃣" } ],
      "explain": "Uma mão tem 5 dedos." },
    { "q": "Qual é o número maior?", "layout": "grid", "level": 2,
      "hint": "O maior é o que está mais perto do 10 na fila.",
      "options": [ { "t": "2", "emoji": "2️⃣" }, { "t": "9", "emoji": "9️⃣", "correct": true }, { "t": "5", "emoji": "5️⃣" } ],
      "explain": "O 9 está mais perto do 10, é o maior!" },
    { "q": "Quantos peixinhos vês?", "emoji": "🐟🐟🐟", "layout": "grid", "level": 1,
      "hint": "Aponta com o dedo: um, dois…",
      "options": [ { "t": "2", "emoji": "2️⃣" }, { "t": "3", "emoji": "3️⃣", "correct": true }, { "t": "4", "emoji": "4️⃣" } ],
      "explain": "Conta: 1, 2, 3 peixinhos!" },
    { "q": "Qual é o número MENOR?", "layout": "grid", "level": 2,
      "hint": "O menor é o que vem primeiro na fila dos números.",
      "options": [ { "t": "1", "emoji": "1️⃣", "correct": true }, { "t": "7", "emoji": "7️⃣" }, { "t": "4", "emoji": "4️⃣" } ],
      "explain": "O 1 está no início da fila, por isso é o menor." },
    { "q": "Tens 4 bolachas e comes 1. Que número vem ANTES do 4?", "layout": "grid", "level": 2,
      "hint": "Antes é menos um — conta para trás.",
      "options": [ { "t": "3", "emoji": "3️⃣", "correct": true }, { "t": "5", "emoji": "5️⃣" }, { "t": "2", "emoji": "2️⃣" } ],
      "explain": "Antes do 4 vem o 3. É menos um!" },
    { "q": "Quantas coisas há quando o número é 0 (zero)?", "layout": "grid", "level": 1,
      "hint": "Comeste as bolachas todas… quantas sobraram?",
      "options": [ { "t": "Nenhuma 🤷", "emoji": "⭕", "correct": true }, { "t": "Cinco", "emoji": "5️⃣" }, { "t": "Dez", "emoji": "🔟" } ],
      "explain": "Zero quer dizer nenhum: não há nada para contar." },
    { "q": "Quantos dedos têm as duas mãos?", "emoji": "🙌", "layout": "grid", "level": 1,
      "hint": "Conta 5 numa mão e continua na outra: 6, 7…",
      "options": [ { "t": "10", "emoji": "🔟", "correct": true }, { "t": "5", "emoji": "5️⃣" }, { "t": "8", "emoji": "8️⃣" } ],
      "explain": "5 dedos + 5 dedos = 10!" }
  ]
}
```
