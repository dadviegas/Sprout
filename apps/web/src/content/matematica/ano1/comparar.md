# Comparar e ordenar números ⚖️

Quem tem mais? Quem tem menos? Vamos descobrir comparando montes de fruta! 🍎🍊

## Maior, menor ou igual?

Comparar é ver **quem tem mais** e **quem tem menos**. 🤔

Imagina dois montes de maçãs:

- 🍎🍎🍎🍎🍎 (5 maçãs)
- 🍎🍎🍎 (3 maçãs)

O 5 tem **mais** que o 3. Dizemos **5 é maior que 3**.

Há três sinais mágicos para isto:

```keyvalue
[
  { "k": "Maior que  >", "v": "a boquinha aberta come o número GRANDE 🐊 (5 > 3)" },
  { "k": "Menor que  <", "v": "a boquinha vira-se para o número grande (3 < 5)" },
  { "k": "Igual  =", "v": "são exatamente os mesmos (4 = 4) 🙂" }
]
```

> [!TIP] O sinal é como um crocodilo guloso 🐊 que abre a boca para o número **maior**!

## Um exemplo passo a passo 🔍

Vamos comparar **7** e **4**.

```steps
[
  { "title": "1. Vê os dois números", "body": "Temos o 7 e o 4. Qual é maior?" },
  { "title": "2. Conta", "body": "7 maçãs 🍎🍎🍎🍎🍎🍎🍎 são mais do que 4 maçãs 🍎🍎🍎🍎." },
  { "title": "3. Aponta o crocodilo", "body": "A boca abre para o maior: 🐊 vira-se para o 7." },
  { "title": "4. Escreve", "body": "7 > 4 (sete é maior que quatro). E também 4 < 7. Boa! 🎉" }
]
```

## Truque 🪄

Quanto **mais longe do zero**, maior é o número! 🔢

Pensa na reta dos números: 0, 1, 2, 3, 4, 5... Quem está mais **à direita** é o maior.

```numberline
{ "min": 0, "max": 10, "start": 7, "step": 1, "title": "O 7 está mais à frente que o 4 → 7 é maior!" }
```

E o crocodilo 🐊 **come sempre o maior** — a boca aberta aponta para o número grande.

## Resolver um problema 🧩

> A Maria tem **6** laranjas 🍊 e o João tem **9** laranjas 🍊. Quem tem mais?

```steps
[
  { "title": "Ler", "body": "Maria = 6 laranjas. João = 9 laranjas." },
  { "title": "Ver os dados", "body": "Os números são 6 e 9." },
  { "title": "Comparar", "body": "9 está mais à frente que 6, logo 9 > 6." },
  { "title": "Responder", "body": "O João tem mais laranjas! 🎉 Confirma: 9 é maior que 6, certinho." }
]
```

> [!TIP] **Para saberes mais** 🌱 Quando ordenas **três ou mais** números do menor ao maior, fica uma fila bonita: 3 < 6 < 9. É como pôr os amigos por ordem de altura! 📏

## Vamos praticar 🎈

```quiz
{
  "id": "mat-1-comparar-pratica",
  "questions": [
    { "q": "🍎🍎🍎🍎🍎 e 🍎🍎. Qual é verdade?", "layout": "grid",
      "options": [ { "t": "5 > 2", "correct": true }, { "t": "5 < 2" }, { "t": "5 = 2" } ],
      "explain": "5 maçãs são mais que 2: 5 > 2." },
    { "q": "Que sinal vai entre 3 ___ 8?", "layout": "grid",
      "options": [ { "t": "menor que  <", "correct": true }, { "t": "maior que  >" }, { "t": "igual  =" } ],
      "explain": "3 é menor que 8, então 3 < 8." }
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
      "options": [ { "t": "igual  =", "correct": true }, { "t": "maior que  >" }, { "t": "menor que  <" } ],
      "explain": "São os mesmos: 4 = 4." },
    { "q": "🐊 abre a boca para o maior. 6 ___ 10?", "layout": "grid",
      "options": [ { "t": "6 < 10", "correct": true }, { "t": "6 > 10" } ],
      "explain": "10 é maior, então 6 < 10." },
    { "q": "Do menor ao maior, qual fila está certa?", "layout": "grid",
      "options": [ { "t": "2 < 5 < 8", "correct": true }, { "t": "8 < 5 < 2" }, { "t": "5 < 2 < 8" } ],
      "explain": "Do menor ao maior: 2, depois 5, depois 8." }
  ]
}
```
