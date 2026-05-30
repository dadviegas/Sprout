# Sequências e padrões 🔁

> [!NOTE] **O que vais aprender** 👀 Vais descobrir o que é um **padrão**, aprender a ver o que se repete e treinar a adivinhar **o que vem a seguir** — em cores, formas e números! 🌈

Há coisas no mundo que se repetem sempre da mesma maneira — como o **dia e a noite** 🌞🌙, as **estações do ano** ou os **dias da semana**! Quando descobres a regra que se repete, ficas com um superpoder: consegues adivinhar o que vem a seguir, mesmo sem ver! Vamos lá treinar esse olho mágico. 👀✨

## O que é um padrão?

Um **padrão** é uma coisa que se repete sempre pela mesma ordem. 🎵 A parte que se repete chama-se o **núcleo** do padrão (é o «bocadinho» que volta sempre).

Imagina um colar de contas: 🔴🔵🔴🔵🔴🔵... O bocadinho que se repete é 🔴🔵. Como a última foi azul, a seguir vem sempre... a **vermelha**!

```keyvalue
[
  { "k": "Padrão", "v": "uma coisa que se repete sempre pela mesma ordem 🔁" },
  { "k": "Núcleo", "v": "o bocadinho que se repete — em 🔴🔵🔴🔵 o núcleo é 🔴🔵 🙂" },
  { "k": "Continuar o padrão", "v": "descobrir a regra e dizer o que vem a seguir 👉" },
  { "k": "Onde há padrões", "v": "em cores, formas, sons, movimentos e números! 🌈" }
]
```

## Padrões de repetição 🎨

Nestes padrões há um bocadinho (o núcleo) que se repete vezes sem conta. Para os continuares, basta voltar ao início do bocadinho!

```compare
[
  { "title": "Padrões de cores 🔴🔵", "rows": [
    { "label": "🔴🔵🔴🔵🔴...", "value": "a seguir vem 🔵" },
    { "label": "🟡🟡🟢🟡🟡🟢...", "value": "a seguir vem 🟡", "highlight": true }
  ] },
  { "title": "Padrões de formas ⭐🔺", "rows": [
    { "label": "⭐🔺⭐🔺⭐...", "value": "a seguir vem 🔺" },
    { "label": "🟦🔺🟦🔺🟦...", "value": "a seguir vem 🔺" }
  ] }
]
```

> [!NOTE] Os padrões também podem ser de **sons e movimentos**! «Bate-palma, bate-pé, bate-palma, bate-pé...» 👏🦶 também é um padrão que se repete!

## Padrões de números 🔢

Nos números há padrões muito úteis! Quando saltas sempre o mesmo bocadinho, estás a fazer um padrão. Saltar **de 2 em 2** ou **de 5 em 5** ajuda-te a contar muito mais depressa. 🦘

```numberline
{ "min": 0, "max": 10, "start": 0, "step": 2, "title": "Saltar de 2 em 2 🐸" }
```

```keyvalue
[
  { "k": "De 2 em 2 🐸", "v": "2, 4, 6, 8, 10... (os números pares!)" },
  { "k": "De 5 em 5 🖐️", "v": "5, 10, 15, 20, 25... (como contar os dedos!)" },
  { "k": "De 10 em 10 🔟", "v": "10, 20, 30, 40, 50... (salta sempre uma dezena)" }
]
```

## Padrões que sobem e que descem ⬆️⬇️

Um padrão de números pode **crescer** (somar sempre o mesmo) ou **diminuir** (tirar sempre o mesmo). O importante é o salto ser sempre igual!

```compare
[
  { "title": "A subir ⬆️ (somar)", "rows": [
    { "label": "3, 6, 9, 12...", "value": "+3 de cada vez → a seguir 15", "highlight": true },
    { "label": "20, 30, 40...", "value": "+10 de cada vez → a seguir 50" }
  ] },
  { "title": "A descer ⬇️ (tirar)", "rows": [
    { "label": "20, 15, 10, 5...", "value": "−5 de cada vez → a seguir 0", "highlight": true },
    { "label": "10, 8, 6, 4...", "value": "−2 de cada vez → a seguir 2" }
  ] }
]
```

## Um exemplo passo a passo 🔍

Olha esta sequência: **5, 10, 15, 20, ?** Qual é o número que falta? 🤔

```steps
[
  { "title": "Lê a sequência", "body": "5, 10, 15, 20... lê em voz alta para ouvires o ritmo 🎶", "icon": "🗣️" },
  { "title": "Vê o salto", "body": "De 5 para 10 saltei 5. De 10 para 15 saltei 5. É sempre +5!", "icon": "🦘" },
  { "title": "Confirma o salto", "body": "De 15 para 20 também é +5. Boa, a regra é mesmo +5! ✅", "icon": "🔎" },
  { "title": "Faz o último salto", "body": "20 + 5 = 25", "icon": "➕" },
  { "title": "Resposta", "body": "A seguir vem o 25! 🎉", "icon": "🎯" }
]
```

> **Truque:** para descobrires a regra, faz sempre **dois saltos** e compara! 🦘🦘 Se o salto é sempre o mesmo (sempre +2, ou sempre +5), basta dar esse salto outra vez. E nos padrões de cores ou formas, tapa o desenho com o dedo e diz baixinho o núcleo: «vermelho, azul, vermelho, azul...» — a tua voz mostra-te o que vem! 🗣️

> [!TIP] **Para saberes mais** 🌱 Há um padrão de números muito famoso a que se chama a **sequência de Fibonacci**: 1, 1, 2, 3, 5, 8, 13... Cada número é a **soma dos dois anteriores** (1+1=2, 1+2=3, 2+3=5...). Este padrão aparece nas pétalas das flores e nas conchas dos caracóis! 🐚🌻

## Vamos praticar 🎈

```quiz
{
  "id": "mat-2-padroes-pratica",
  "questions": [
    { "q": "Qual vem a seguir? 🔴🟦🔴🟦🔴...", "layout": "grid",
      "options": [ { "t": "azul", "emoji": "🟦", "correct": true }, { "t": "vermelho", "emoji": "🔴" } ],
      "explain": "O núcleo é vermelho, azul. A seguir ao vermelho vem o azul." },
    { "q": "Continua: 2, 4, 6, 8, ...?", "layout": "grid",
      "options": [ { "t": "10", "correct": true }, { "t": "9" }, { "t": "12" } ],
      "explain": "Saltas de 2 em 2: 8 + 2 = 10." },
    { "q": "Qual vem a seguir? ⭐🔺⭐🔺⭐...", "layout": "grid",
      "options": [ { "t": "triângulo", "emoji": "🔺", "correct": true }, { "t": "estrela", "emoji": "⭐" } ],
      "explain": "O núcleo é estrela, triângulo. Depois da estrela vem o triângulo." },
    { "q": "Como se chama o bocadinho que se repete num padrão?", "layout": "grid",
      "options": [ { "t": "o núcleo", "emoji": "🔁", "correct": true }, { "t": "o número" }, { "t": "a soma" } ],
      "explain": "O bocadinho que se repete chama-se o núcleo do padrão." },
    { "q": "Continua de 5 em 5: 5, 10, 15, ...?", "layout": "grid",
      "options": [ { "t": "20", "correct": true }, { "t": "16" }, { "t": "25" } ],
      "explain": "Saltas de 5 em 5: 15 + 5 = 20." },
    { "q": "Qual número falta? 🟢🟢🟡🟢🟢🟡🟢🟢__", "layout": "grid",
      "options": [ { "t": "amarelo", "emoji": "🟡", "correct": true }, { "t": "verde", "emoji": "🟢" } ],
      "explain": "O núcleo é 🟢🟢🟡. Depois de dois verdes vem o amarelo." },
    { "q": "Vai a descer: 10, 8, 6, ...?", "layout": "grid",
      "options": [ { "t": "4", "correct": true }, { "t": "7" }, { "t": "5" } ],
      "explain": "Tiras 2 de cada vez: 6 − 2 = 4." },
    { "q": "Saltar de 10 em 10: 10, 20, 30, ...?", "layout": "grid",
      "options": [ { "t": "40", "correct": true }, { "t": "35" }, { "t": "31" } ],
      "explain": "Saltas de 10 em 10: 30 + 10 = 40." },
    { "q": "Que padrão é este? 👏🦶👏🦶👏🦶", "layout": "grid",
      "options": [ { "t": "um padrão de sons e movimentos", "emoji": "🎵", "correct": true }, { "t": "não é um padrão" } ],
      "explain": "Também há padrões de sons e movimentos: palma, pé, palma, pé!" }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-2-padroes-final",
  "final": true,
  "title": "Sequências e padrões",
  "questions": [
    { "q": "Qual vem a seguir? ⭐🔺⭐🔺⭐...", "layout": "grid",
      "options": [ { "t": "triângulo", "emoji": "🔺", "correct": true }, { "t": "estrela", "emoji": "⭐" } ],
      "explain": "O núcleo é estrela, triângulo. Depois da estrela vem o triângulo." },
    { "q": "Continua de 5 em 5: 5, 10, 15, ...?", "layout": "grid",
      "options": [ { "t": "20", "correct": true }, { "t": "16" }, { "t": "25" } ],
      "explain": "Saltas de 5 em 5: 15 + 5 = 20." },
    { "q": "Qual número falta? 10, 20, __, 40", "layout": "grid",
      "options": [ { "t": "30", "correct": true }, { "t": "25" }, { "t": "35" } ],
      "explain": "Saltas de 10 em 10: depois do 20 vem o 30." },
    { "q": "Vai a descer: 20, 15, 10, ...?", "layout": "grid",
      "options": [ { "t": "5", "correct": true }, { "t": "12" }, { "t": "0" } ],
      "explain": "Tiras 5 de cada vez: 10 − 5 = 5." },
    { "q": "Um padrão é uma coisa que...", "layout": "grid",
      "options": [ { "t": "se repete sempre pela mesma ordem", "emoji": "🔁", "correct": true }, { "t": "aparece só uma vez", "emoji": "1️⃣" } ],
      "explain": "Um padrão repete-se sempre pela mesma ordem." },
    { "q": "Saltar de 2 em 2 dá os números...", "layout": "grid",
      "options": [ { "t": "pares: 2, 4, 6, 8", "emoji": "🐸", "correct": true }, { "t": "1, 2, 3, 4" }, { "t": "5, 10, 15" } ],
      "explain": "De 2 em 2 obténs os números pares: 2, 4, 6, 8, 10..." },
    { "q": "Qual é o núcleo deste padrão? 🟡🟢🔵🟡🟢🔵", "layout": "grid",
      "options": [ { "t": "🟡🟢🔵", "correct": true }, { "t": "🟡🟢" }, { "t": "🟡" } ],
      "explain": "O bocadinho que se repete é 🟡🟢🔵." },
    { "q": "Continua a subir: 3, 6, 9, ...?", "layout": "grid",
      "options": [ { "t": "12", "correct": true }, { "t": "10" }, { "t": "11" } ],
      "explain": "Saltas de 3 em 3: 9 + 3 = 12." },
    { "q": "Qual vem a seguir? 🟢🟢🟡🟢🟢🟡...", "layout": "grid",
      "options": [ { "t": "verde", "emoji": "🟢", "correct": true }, { "t": "amarelo", "emoji": "🟡" } ],
      "explain": "O núcleo é 🟢🟢🟡. Depois do amarelo recomeça com verde." }
  ]
}
```
