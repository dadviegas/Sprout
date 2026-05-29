# Resolver problemas 🧩

Um **problema** é uma pergunta com uma história. Com um plano, resolves qualquer um! 🕵️

## O plano em 4 passos

```steps
[
  { "title": "Lê com atenção", "body": "o que é que o problema pergunta? 🔍", "icon": "search" },
  { "title": "Vê os dados", "body": "que números tens? O que sabes?" },
  { "title": "Escolhe a conta", "body": "somar, subtrair, multiplicar ou dividir? ➕✖️" },
  { "title": "Responde e verifica", "body": "faz a conta e confere se faz sentido ✔️", "icon": "check" }
]
```

## Que conta usar? 🤔

```keyvalue
[
  { "k": "Juntar / ao todo", "v": "somar ➕" },
  { "k": "Tirar / sobrar / diferença", "v": "subtrair ➖" },
  { "k": "Grupos iguais / vezes", "v": "multiplicar ✖️" },
  { "k": "Repartir igualmente", "v": "dividir ➗" }
]
```

## Um exemplo 🍎

> *A Maria tinha 12 maçãs e deu 5 ao irmão. Com quantas ficou?*
>
> "Deu" = tirar → **12 − 5 = 7**. Ficou com **7 maçãs**! ✔️

> [!TIP] Sublinha os **números** e a **pergunta**. As palavras "ao todo", "sobraram", "cada" dizem-te que conta fazer! ✏️

## Vamos praticar 🎈

```quiz
{
  "id": "mat4-prob-pratica",
  "questions": [
    { "q": "Tens 8 cromos e ganhas 6. Quantos AO TODO?", "layout": "grid",
      "options": [ { "t": "14", "correct": true }, { "t": "2" }, { "t": "48" } ],
      "explain": "'Ao todo' = somar: 8 + 6 = 14." },
    { "q": "5 caixas com 3 bolos cada. Quantos bolos?", "layout": "grid",
      "options": [ { "t": "15", "correct": true }, { "t": "8" }, { "t": "2" } ],
      "explain": "Grupos iguais = multiplicar: 5 × 3 = 15." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat4-prob-final",
  "final": true,
  "title": "Resolver problemas",
  "questions": [
    { "q": "Qual é o 1.º passo para resolver um problema?", "layout": "grid",
      "options": [ { "t": "ler com atenção", "emoji": "🔍", "correct": true }, { "t": "adivinhar" } ],
      "explain": "Primeiro lê e percebe a pergunta." },
    { "q": "'Sobraram' indica que conta?", "layout": "grid",
      "options": [ { "t": "subtrair ➖", "correct": true }, { "t": "multiplicar ✖️" } ],
      "explain": "Sobrar/tirar = subtrair." },
    { "q": "12 rebuçados para 4 amigos, igual para cada. Que conta?", "layout": "grid",
      "options": [ { "t": "dividir (12 ÷ 4)", "correct": true }, { "t": "somar" } ],
      "explain": "Repartir igualmente = dividir: 12 ÷ 4 = 3." },
    { "q": "A Maria tinha 12 e deu 5. Ficou com...", "layout": "grid",
      "options": [ { "t": "7", "correct": true }, { "t": "17" }, { "t": "5" } ],
      "explain": "12 − 5 = 7." }
  ]
}
```
