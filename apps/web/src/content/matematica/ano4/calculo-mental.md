# Cálculo mental: pensar depressa 🧠

> [!NOTE] **O que vais aprender** 👀 Vais treinar estratégias para calcular de cabeça: decompor números, fazer dezenas ou centenas, compensar, usar dobro/metade e estimar antes de responder.

Cálculo mental não é “adivinhar”. É escolher um caminho esperto para chegar à resposta sem escrever uma conta grande.

```figure
{ "emoji": "🧠", "caption": "Calcular de cabeça é usar atalhos seguros: primeiro penso, depois respondo." }
```

## Estratégia 1: decompor números 🔢

Decompor é partir um número em bocados mais fáceis.

```math
{ "expr": "47 + 30 = 77", "say": "quarenta e sete mais trinta é igual a setenta e sete" }
```

Se tens **47 + 32**, podes pensar assim:

```steps
[
  { "title": "1. Partir o 32", "body": "32 = 30 + 2" },
  { "title": "2. Somar a dezena", "body": "47 + 30 = 77" },
  { "title": "3. Somar o resto", "body": "77 + 2 = 79" },
  { "title": "4. Resposta", "body": "47 + 32 = 79" }
]
```

## Estratégia 2: fazer 10, 100 ou 1000 🎯

O cérebro gosta de números redondos.

```compare
[
  { "title": "Conta mais difícil", "rows": [
    { "label": "Exemplo", "value": "58 + 7" },
    { "label": "Problema", "value": "não chega logo a uma dezena" }
  ] },
  { "title": "Conta esperta", "rows": [
    { "label": "Passo 1", "value": "58 + 2 = 60", "highlight": true },
    { "label": "Passo 2", "value": "sobram 5" },
    { "label": "Resultado", "value": "60 + 5 = 65", "highlight": true }
  ] }
]
```

## Estratégia 3: compensar ⚖️

Compensar é arredondar um número e depois corrigir.

```math
{ "expr": "99 + 36 = 100 + 36 − 1 = 135", "say": "noventa e nove mais trinta e seis é como cem mais trinta e seis menos um, igual a cento e trinta e cinco" }
```

> **Truque:** quando um número está quase redondo, usa-o a teu favor: 99 é quase 100, 198 é quase 200, 49 é quase 50.

## Estratégia 4: dobro e metade ✌️

Algumas contas ficam fáceis quando sabes o dobro ou a metade.

```keyvalue
[
  { "k": "Dobro de 25", "v": "50" },
  { "k": "Metade de 80", "v": "40" },
  { "k": "25 + 25", "v": "é o dobro de 25: 50" },
  { "k": "4 × 25", "v": "é 100, porque 25 + 25 + 25 + 25 = 100" }
]
```

## Estimar antes de responder 🔎

Estimar é prever mais ou menos quanto deve dar. Ajuda a apanhar erros.

```steps
[
  { "title": "Conta", "body": "198 + 305" },
  { "title": "Estimo", "body": "200 + 300 = 500" },
  { "title": "Calculo", "body": "198 + 305 = 503" },
  { "title": "Verifico", "body": "503 está perto de 500, por isso faz sentido" }
]
```

## Treino rápido 🎯

```drill
{ "mode": "choose", "title": "Qual é o atalho?", "items": [
  { "front": "99 + 48", "back": "100 + 48 − 1", "options": ["50 + 48", "100 − 48"] },
  { "front": "38 + 7", "back": "38 + 2 + 5", "options": ["38 − 7", "30 + 7"] },
  { "front": "25 + 25", "back": "dobro de 25", "options": ["metade de 25", "25 − 25"] },
  { "front": "402 − 199", "back": "402 − 200 + 1", "options": ["402 + 200", "199 − 402"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Bons matemáticos não fazem sempre a conta da mesma maneira. Antes de calcular, olham para os números e perguntam: “Qual é o caminho mais fácil?”

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-calculo-mental-pratica",
  "questions": [
    { "q": "47 + 32 pode ser pensado como…", "layout": "grid",
      "options": [ { "t": "47 + 30 + 2", "emoji": "🔢", "correct": true }, { "t": "47 − 32" }, { "t": "32 − 47" } ],
      "explain": "Decompor 32 em 30 + 2 torna a soma mais fácil." },
    { "q": "58 + 7 fica mais fácil se pensares…", "layout": "grid",
      "options": [ { "t": "58 + 2 + 5", "emoji": "🎯", "correct": true }, { "t": "58 − 7" }, { "t": "7 − 58" } ],
      "explain": "Primeiro chegas a 60, depois somas os 5 que faltam." },
    { "q": "99 + 36 é como…", "layout": "grid",
      "options": [ { "t": "100 + 36 − 1", "emoji": "⚖️", "correct": true }, { "t": "100 + 36 + 1" }, { "t": "90 + 30 − 6" } ],
      "explain": "Se arredondas 99 para 100, tens de tirar 1 no fim." },
    { "q": "Uma boa estimativa para 198 + 305 é…", "layout": "grid",
      "options": [ { "t": "cerca de 500", "emoji": "🔎", "correct": true }, { "t": "cerca de 50" }, { "t": "cerca de 5000" } ],
      "explain": "198 ≈ 200 e 305 ≈ 300, por isso dá perto de 500." },
    { "q": "4 × 25 dá…", "layout": "grid",
      "options": [ { "t": "100", "emoji": "💯", "correct": true }, { "t": "75" }, { "t": "125" } ],
      "explain": "Quatro grupos de 25 fazem 100." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-calculo-mental-final",
  "final": true,
  "title": "Cálculo mental",
  "questions": [
    { "q": "Cálculo mental é…", "layout": "grid",
      "options": [ { "t": "usar estratégias para calcular de cabeça", "emoji": "🧠", "correct": true }, { "t": "adivinhar sem pensar" }, { "t": "nunca verificar" } ],
      "explain": "Cálculo mental usa atalhos seguros." },
    { "q": "86 + 13 pode ser decomposto como…", "layout": "grid",
      "options": [ { "t": "86 + 10 + 3", "emoji": "🔢", "correct": true }, { "t": "86 − 13" }, { "t": "13 − 86" } ],
      "explain": "13 = 10 + 3." },
    { "q": "49 + 28 é mais fácil como…", "layout": "grid",
      "options": [ { "t": "50 + 28 − 1", "emoji": "⚖️", "correct": true }, { "t": "50 + 28 + 1" }, { "t": "40 − 28" } ],
      "explain": "49 é quase 50; se somas 1 a mais, tiras 1 no fim." },
    { "q": "Para calcular 67 + 5, podes pensar…", "layout": "grid",
      "options": [ { "t": "67 + 3 + 2", "emoji": "🎯", "correct": true }, { "t": "67 − 5" }, { "t": "60 + 5" } ],
      "explain": "67 + 3 chega a 70; depois somas 2." },
    { "q": "Metade de 90 é…", "layout": "grid",
      "options": [ { "t": "45", "emoji": "✌️", "correct": true }, { "t": "40" }, { "t": "180" } ],
      "explain": "90 dividido por 2 é 45." },
    { "q": "Uma estimativa boa para 402 − 199 é…", "layout": "grid",
      "options": [ { "t": "cerca de 200", "emoji": "🔎", "correct": true }, { "t": "cerca de 20" }, { "t": "cerca de 700" } ],
      "explain": "402 ≈ 400 e 199 ≈ 200, por isso fica perto de 200." },
    { "q": "25 + 25 + 25 + 25 é…", "layout": "grid",
      "options": [ { "t": "100", "emoji": "💯", "correct": true }, { "t": "80" }, { "t": "125" } ],
      "explain": "Quatro quartos de 100 fazem 100." },
    { "q": "Antes de responder, estimar ajuda a…", "layout": "grid",
      "options": [ { "t": "ver se a resposta faz sentido", "emoji": "✅", "correct": true }, { "t": "evitar pensar" }, { "t": "mudar a pergunta" } ],
      "explain": "A estimativa é uma verificação rápida." }
  ]
}
```
