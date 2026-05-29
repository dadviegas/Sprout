# Frações simples 🍕

Uma **fração** é uma parte de um todo. Quando partilhas uma pizza, fazes frações! 🍕

## Em cima e em baixo

```keyvalue
[
  { "k": "Numerador (em cima)", "v": "quantas partes tens" },
  { "k": "Denominador (em baixo)", "v": "em quantas partes dividiste o todo" }
]
```

> **1/2** lê-se "um meio". Partiste em **2** e ficaste com **1** parte. 🍕

## Brinca com a fração 🍕

Toca nas fatias para pintar e ver a fração mudar:

```fraction
{ "parts": 4, "filled": 1, "shape": "pie", "title": "Pinta as fatias", "color": "accent" }
```

E em barra (como uma tablete de chocolate 🍫):

```fraction
{ "parts": 2, "filled": 1, "shape": "bar", "title": "Metade da tablete", "color": "primary" }
```

## Frações que vais usar

```keyvalue
[
  { "k": "1/2", "v": "um meio — metade 🌗" },
  { "k": "1/3", "v": "um terço" },
  { "k": "1/4", "v": "um quarto 🍕" }
]
```

> [!TIP] Quanto **maior** o número de baixo, **mais pequenas** são as fatias! 1/8 é mais pequeno que 1/2. 🤏

## Vamos praticar 🎈

```quiz
{
  "id": "mat3-frac-pratica",
  "questions": [
    { "q": "Partiste uma pizza em 2 e comeste 1 fatia. Que fração comeste?", "emoji": "🍕", "layout": "grid",
      "options": [ { "t": "1/2", "correct": true }, { "t": "1/4" }, { "t": "2/2" } ],
      "explain": "1 parte de 2 = 1/2 (metade)." },
    { "q": "Como se lê 1/4?", "layout": "grid",
      "options": [ { "t": "um quarto", "correct": true }, { "t": "um meio" }, { "t": "catorze" } ],
      "explain": "1/4 lê-se 'um quarto'." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat3-frac-final",
  "final": true,
  "title": "Frações simples",
  "questions": [
    { "q": "Na fração 3/4, o número de baixo (4) diz...", "layout": "grid",
      "options": [ { "t": "em quantas partes dividimos", "correct": true }, { "t": "quantas partes temos" } ],
      "explain": "O denominador (em baixo) diz em quantas partes se dividiu." },
    { "q": "Metade escreve-se...", "layout": "grid",
      "options": [ { "t": "1/2", "correct": true }, { "t": "1/3" }, { "t": "2/1" } ],
      "explain": "Metade = 1/2." },
    { "q": "Qual fatia é MAIOR?", "layout": "grid",
      "options": [ { "t": "1/2", "correct": true }, { "t": "1/4" }, { "t": "1/8" } ],
      "explain": "Menos fatias = fatias maiores. 1/2 é a maior." },
    { "q": "Pintaste 2 de 4 quadrados. Que fração?", "layout": "grid",
      "options": [ { "t": "2/4", "correct": true }, { "t": "4/2" }, { "t": "2/2" } ],
      "explain": "2 partes de 4 = 2/4 (que também é metade!)." }
  ]
}
```
