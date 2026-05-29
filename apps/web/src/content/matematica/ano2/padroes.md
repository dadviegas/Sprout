# Sequências e padrões 🔁

Há coisas que se repetem sempre da mesma maneira — como o dia e a noite! 🌞🌙 Hoje vais descobrir o que vem a seguir. Vais ver que é muito fácil!

## O que é um padrão?

Um **padrão** é uma coisa que se repete sempre igual. 🎵

Imagina um colar de contas: 🔴🔵🔴🔵🔴🔵... a seguir vem sempre... a vermelha! Porque o padrão é "vermelho, azul, vermelho, azul".

```keyvalue
[
  { "k": "Padrão de cores", "v": "🔴🔵🔴🔵 → a seguir 🔴" },
  { "k": "Padrão de formas", "v": "⭐🔺⭐🔺 → a seguir ⭐" },
  { "k": "Padrão de números", "v": "2, 4, 6, 8 → a seguir 10 🙂" }
]
```

Nos números também há padrões! Saltar **de 2 em 2** ou **de 5 em 5** é um padrão. 🦘

```numberline
{ "min": 0, "max": 10, "start": 0, "step": 2, "title": "Saltar de 2 em 2 🐸" }
```

## Um exemplo passo a passo 🔍

Olha esta sequência: **5, 10, 15, 20, ?** Qual é o número que falta? 🤔

```steps
[
  { "title": "Lê a sequência", "body": "5, 10, 15, 20... lê em voz alta para ouvires o ritmo 🎶" },
  { "title": "Vê o salto", "body": "De 5 para 10 saltei 5. De 10 para 15 saltei 5. É sempre +5!" },
  { "title": "Faz o último salto", "body": "20 + 5 = 25" },
  { "title": "Resposta", "body": "A seguir vem o 25! 🎉" }
]
```

## Truque 🪄

Para descobrires o que vem a seguir, faz sempre **dois saltos** e compara! 🦘🦘

Se de um número para o outro saltas sempre o mesmo bocado (sempre +2, ou sempre +5), basta dar esse salto outra vez.

> Numa sequência de cores ou formas, tapa o desenho com o dedo e diz baixinho o padrão: "vermelho, azul, vermelho, azul..." — a tua voz mostra-te o que vem! 🗣️

## Resolver um problema 🧩

> A Inês está a fazer uma pulseira com missangas: 🟡🟢🟡🟢🟡🟢. Qual é a missanga que vem a seguir?

```steps
[
  { "title": "Lê", "body": "A Inês repete amarelo, verde, amarelo, verde..." },
  { "title": "Vê os dados", "body": "O padrão é 🟡🟢 que se repete sempre." },
  { "title": "Escolhe", "body": "A última foi verde 🟢, por isso a seguir vem amarelo 🟡." },
  { "title": "Responde e confirma", "body": "A seguir vem 🟡! Confirma: 🟡🟢🟡🟢🟡🟢🟡 — está certinho! ✅" }
]
```

> [!TIP] **Para saberes mais** 🌱 Há padrões que vão para trás! Em **20, 15, 10, 5, ...** estás a tirar 5 de cada vez (de 5 em 5 a descer). A seguir vem o **0**! ⬇️

## Vamos praticar 🎈

```quiz
{
  "id": "mat-2-padroes-pratica",
  "questions": [
    { "q": "Qual vem a seguir? 🔴🟦🔴🟦🔴...", "layout": "grid",
      "options": [ { "t": "azul", "emoji": "🟦", "correct": true }, { "t": "vermelho", "emoji": "🔴" } ],
      "explain": "O padrão é vermelho, azul, vermelho, azul... a seguir ao vermelho vem o azul." },
    { "q": "Continua: 2, 4, 6, 8, ...?", "layout": "grid",
      "options": [ { "t": "10", "correct": true }, { "t": "9" }, { "t": "12" } ],
      "explain": "Saltas de 2 em 2: 8 + 2 = 10." }
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
      "explain": "O padrão é estrela, triângulo... depois da estrela vem o triângulo." },
    { "q": "Continua de 5 em 5: 5, 10, 15, ...?", "layout": "grid",
      "options": [ { "t": "20", "correct": true }, { "t": "16" }, { "t": "25" } ],
      "explain": "Saltas de 5 em 5: 15 + 5 = 20." },
    { "q": "Qual número falta? 10, 20, __, 40", "layout": "grid",
      "options": [ { "t": "30", "correct": true }, { "t": "25" }, { "t": "35" } ],
      "explain": "Saltas de 10 em 10: depois do 20 vem o 30." },
    { "q": "Vai a descer: 20, 15, 10, ...?", "layout": "grid",
      "options": [ { "t": "5", "correct": true }, { "t": "12" }, { "t": "0" } ],
      "explain": "Tiras 5 de cada vez: 10 - 5 = 5." }
  ]
}
```
