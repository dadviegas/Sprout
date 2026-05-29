# Gráficos e tabelas 📊

Para organizar e comparar informação, usamos **tabelas** e **gráficos**. Assim vê-se tudo num instante! 👀

## A tabela — informação arrumada

Uma **tabela** organiza dados em **linhas** e **colunas**.

| Fruta preferida | Votos |
| --- | --- |
| 🍎 Maçã | 5 |
| 🍌 Banana | 3 |
| 🍓 Morango | 8 |

## O gráfico — comparar de relance

Um **gráfico de barras** mostra os mesmos dados em barras. A barra **mais alta** é a que tem mais!

```meters
[
  { "label": "🍓 Morango", "value": 8, "max": 10, "tone": "danger" },
  { "label": "🍎 Maçã", "value": 5, "max": 10, "tone": "ok" },
  { "label": "🍌 Banana", "value": 3, "max": 10, "tone": "warn" }
]
```

> Vês logo que o **morango** ganhou? A barra é a maior! 🏆

> [!TIP] Lê sempre o **título** e o que está nos lados do gráfico, para perceberes o que está a ser contado. 🔍

## Vamos praticar 🎈

```quiz
{
  "id": "mat4-dados-pratica",
  "questions": [
    { "q": "Na tabela, qual fruta teve mais votos?", "layout": "grid",
      "options": [ { "t": "Morango (8)", "emoji": "🍓", "correct": true }, { "t": "Maçã (5)", "emoji": "🍎" }, { "t": "Banana (3)", "emoji": "🍌" } ],
      "explain": "O morango teve 8 votos — o maior número." },
    { "q": "Num gráfico de barras, a barra maior é a que tem...", "layout": "grid",
      "options": [ { "t": "mais", "correct": true }, { "t": "menos" } ],
      "explain": "Barra mais alta = mais quantidade." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat4-dados-final",
  "final": true,
  "title": "Gráficos e tabelas",
  "questions": [
    { "q": "Uma tabela organiza dados em...", "layout": "grid",
      "options": [ { "t": "linhas e colunas", "correct": true }, { "t": "círculos" } ],
      "explain": "Tabelas têm linhas e colunas." },
    { "q": "Quantos votos teve a maçã? 🍎", "layout": "grid",
      "options": [ { "t": "5", "correct": true }, { "t": "8" }, { "t": "3" } ],
      "explain": "A maçã teve 5 votos." },
    { "q": "Quantos votos a mais teve o morango do que a banana?", "layout": "grid",
      "options": [ { "t": "5", "correct": true }, { "t": "3" }, { "t": "8" } ],
      "explain": "8 − 3 = 5 votos a mais." },
    { "q": "Para que serve um gráfico?", "layout": "grid",
      "options": [ { "t": "comparar de relance", "emoji": "📊", "correct": true }, { "t": "para nada" } ],
      "explain": "Ajuda a comparar informação rapidamente." }
  ]
}
```
