# Frações e decimais 🍕

Sabias que **uma fração** e **um número com vírgula** podem dizer a mesma coisa? 😍 São como dois amigos que falam línguas diferentes mas querem dizer o mesmo!

## Duas maneiras de dizer a mesma fatia

Imagina uma pizza dividida em fatias. Podes dizer quanto comeste de **duas** formas: com uma **fração** (em cima/em baixo) ou com um **decimal** (com vírgula). 🍕

```compare
[
  { "title": "Fração", "rows": [ {"label":"metade","value":"1/2"}, {"label":"um quarto","value":"1/4"}, {"label":"uma décima","value":"1/10"} ] },
  { "title": "Decimal", "highlight": true, "badge": "o mesmo!", "rows": [ {"label":"metade","value":"0,5"}, {"label":"um quarto","value":"0,25"}, {"label":"uma décima","value":"0,1"} ] }
]
```

As três mais importantes para guardares no coração 💚:

```keyvalue
[
  { "k": "1/2", "v": "é 0,5 — metade, como meia pizza 🍕" },
  { "k": "1/4", "v": "é 0,25 — uma fatia de quatro 🍰" },
  { "k": "1/10", "v": "é 0,1 — uma de dez fatias 🍫" }
]
```

## Um exemplo passo a passo 🔍

Vamos descobrir juntos quanto é **1/4** em decimal. Vais ver que é fácil!

```steps
[
  { "title": "1. Lê a fração", "body": "1/4 quer dizer 1 bocadinho de 4 bocados iguais. Partimos uma coisa em 4 fatias e ficamos com 1. 🍰" },
  { "title": "2. Pensa no dinheiro", "body": "Imagina 1 euro = 100 cêntimos. Divide os 100 cêntimos por 4 amigos: cada um fica com 25 cêntimos." },
  { "title": "3. Escreve com vírgula", "body": "25 cêntimos de 1 euro é 0,25 €. Então 1/4 = 0,25!" },
  { "title": "4. Confirma", "body": "Quatro quartos juntos: 0,25 + 0,25 + 0,25 + 0,25 = 1. Boa, dá um inteiro! ✅" }
]
```

## Truque 🪄

Para passar uma fração simples a decimal, **pensa em euros e cêntimos** 💶: 1 euro vale 100 cêntimos.

- **1/2** → metade de 100 cêntimos = 50 → **0,5**
- **1/4** → 100 a dividir por 4 = 25 → **0,25**
- **1/10** → 100 a dividir por 10 = 10 → **0,1**

Vê quanto fica de 1 euro... e essa é a tua vírgula! 🤑

## Resolver um problema 🧩

A Matilde comeu **meia** barra de chocolate 🍫 e o Rui comeu **0,5** da dele. Quem comeu mais?

```steps
[
  { "title": "Ler", "body": "A Matilde comeu meia barra (1/2). O Rui comeu 0,5 da barra." },
  { "title": "Ver os dados", "body": "Matilde = 1/2. Rui = 0,5." },
  { "title": "Escolher", "body": "Passamos a fração a decimal: 1/2 = 0,5. Agora podemos comparar!" },
  { "title": "Responder e confirmar", "body": "0,5 = 0,5 → comeram exatamente o mesmo! 🎉 Empate guloso." }
]
```

> [!TIP] **Para saberes mais** 🌱 Há frações que dão decimais com mais casas! Por exemplo, 3/4 = 0,75 (três fatias de quatro). É só somar 0,25 + 0,25 + 0,25. 😉

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-fracoes-decimais-pratica",
  "questions": [
    { "q": "Quanto é 1/2 em decimal?", "layout": "grid",
      "options": [ { "t": "0,5", "correct": true, "emoji": "🍕" }, { "t": "0,25" }, { "t": "0,1" } ],
      "explain": "Metade de 1 é 0,5. Certinho!" },
    { "q": "Qual destas frações vale 0,1?", "layout": "grid",
      "options": [ { "t": "1/2" }, { "t": "1/4" }, { "t": "1/10", "correct": true, "emoji": "🍫" } ],
      "explain": "Uma de dez partes é 1/10 = 0,1." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-fracoes-decimais-final",
  "final": true,
  "title": "Frações e decimais",
  "questions": [
    { "q": "1/4 escreve-se em decimal como...", "layout": "grid",
      "options": [ { "t": "0,25", "correct": true }, { "t": "0,5" }, { "t": "0,4" } ],
      "explain": "100 cêntimos a dividir por 4 dá 25 → 0,25." },
    { "q": "0,5 é o mesmo que...", "layout": "grid",
      "options": [ { "t": "metade (1/2)", "correct": true, "emoji": "🍰" }, { "t": "um quarto (1/4)" }, { "t": "uma décima (1/10)" } ],
      "explain": "0,5 é metade, ou seja 1/2." },
    { "q": "Qual é maior?", "layout": "grid",
      "options": [ { "t": "1/2", "correct": true }, { "t": "0,25" }, { "t": "São iguais" } ],
      "explain": "1/2 = 0,5, e 0,5 é maior do que 0,25." },
    { "q": "1/10 em decimal é...", "layout": "grid",
      "options": [ { "t": "0,1", "correct": true, "emoji": "🍫" }, { "t": "1,0" }, { "t": "0,01" } ],
      "explain": "Uma de dez partes é 0,1." }
  ]
}
```
