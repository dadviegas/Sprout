# Tipos de texto 📝

Nem todos os textos são iguais! Cada um tem um **objetivo** diferente. 📚

## Os principais tipos

```keyvalue
[
  { "k": "Narrativo 📖", "v": "conta uma história (contos, aventuras)" },
  { "k": "Descritivo 🖼️", "v": "descreve como é alguém ou algo" },
  { "k": "Informativo 📰", "v": "dá informação a sério (notícias, enciclopédia)" },
  { "k": "Instrucional 📋", "v": "ensina a fazer (receitas, regras de jogo)" }
]
```

## Como reconhecer

```compare
[
  { "title": "Tipo", "rows": [
    { "label": "Conto", "value": "📖" },
    { "label": "Receita", "value": "🍰" },
    { "label": "Notícia", "value": "📰" },
    { "label": "Poema", "value": "🎵" }
  ]},
  { "title": "Serve para", "highlight": true, "badge": "objetivo", "rows": [
    { "label": "contar uma história", "value": "narrar" },
    { "label": "ensinar a cozinhar", "value": "instruir" },
    { "label": "informar do que aconteceu", "value": "informar" },
    { "label": "brincar com as palavras", "value": "emocionar" }
  ]}
]
```

> [!TIP] Pergunta: este texto quer **contar**, **explicar**, **informar** ou **ensinar a fazer**? A resposta diz-te o tipo! 💭

## Vamos praticar 🎈

```quiz
{
  "id": "pt4-tipos-pratica",
  "questions": [
    { "q": "Uma receita de bolo é um texto...", "emoji": "🍰", "layout": "grid",
      "options": [ { "t": "instrucional", "correct": true }, { "t": "narrativo" } ],
      "explain": "Ensina a fazer — é instrucional." },
    { "q": "Um conto 'Era uma vez...' é um texto...", "emoji": "📖", "layout": "grid",
      "options": [ { "t": "narrativo", "correct": true }, { "t": "informativo" } ],
      "explain": "Conta uma história — é narrativo." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "pt4-tipos-final",
  "final": true,
  "title": "Tipos de texto",
  "questions": [
    { "q": "Uma notícia no jornal é um texto...", "emoji": "📰", "layout": "grid",
      "options": [ { "t": "informativo", "correct": true }, { "t": "instrucional" } ],
      "explain": "Dá informação — é informativo." },
    { "q": "Um texto que descreve como é uma praia é...", "emoji": "🏖️", "layout": "grid",
      "options": [ { "t": "descritivo", "correct": true }, { "t": "narrativo" } ],
      "explain": "Descreve algo — é descritivo." },
    { "q": "As regras de um jogo são um texto...", "emoji": "🎲", "layout": "grid",
      "options": [ { "t": "instrucional", "correct": true }, { "t": "descritivo" } ],
      "explain": "Ensinam a jogar — instrucional." },
    { "q": "Qual destes CONTA uma história?", "layout": "grid",
      "options": [ { "t": "um conto", "emoji": "📖", "correct": true }, { "t": "uma lista de compras", "emoji": "🛒" } ],
      "explain": "O conto é narrativo — conta uma história." }
  ]
}
```
