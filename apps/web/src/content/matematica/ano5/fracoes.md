# Frações: comparar e operar 🍕

> [!NOTE] **O que vais aprender** 👀 Vais reconhecer **frações equivalentes**, **simplificá-las**, **compará-las** (mesmo com denominadores diferentes!), **somar e subtrair**, e ainda multiplicar uma fração por um número. Tudo com pizzas, chocolates e barras coloridas! 🍕🍫

As frações já não são novidade — mas no 5.º ano passas a **operar** com elas a sério. Vais descobrir que muitas frações diferentes valem o **mesmo**, e aprender a pô-las todas «a falar a mesma língua» para somar, comparar e simplificar. Vem daí, com calma e bons exemplos. 🚀

## Frações equivalentes — caras diferentes, mesmo valor 👯

Duas frações são **equivalentes** quando pintam a **mesma parte** do todo, mesmo estando cortadas em mais bocados. Olha: **1/2**, **2/4** e **4/8** parecem diferentes, mas valem exatamente o mesmo!

```fractionstrips
{ "mode": "equivalent", "title": "1/2 = 2/4 = 4/8", "color": "accent",
  "rows": [ { "parts": 2, "filled": 1 }, { "parts": 4, "filled": 2 }, { "parts": 8, "filled": 4 } ] }
```

Como se fabricam frações equivalentes? **Multiplica ou divide o de cima e o de baixo pelo mesmo número.** É como cortar a mesma pizza em mais (ou menos) fatias — a quantidade não muda! 🍕

```math
{ "expr": "1/2 = 2/4 = 3/6", "say": "um meio é igual a dois quartos é igual a três sextos" }
```

```keyvalue
[
  { "k": "Para AMPLIAR", "v": "× o numerador e o denominador pelo mesmo número: 1/2 ×3 = 3/6 ⬆️" },
  { "k": "Para SIMPLIFICAR", "v": "÷ os dois pelo mesmo número: 6/8 ÷2 = 3/4 ⬇️" },
  { "k": "Regra de ouro", "v": "o que fazes em cima, fazes em baixo! 🔒" }
]
```

## Simplificar — a fração na sua forma mais arrumada ✨

**Simplificar** é deixar a fração o mais «pequenina» possível, dividindo cima e baixo até já não dar mais. A forma mais simples é a **fração irredutível**.

```steps
[
  { "title": "1. Olha 8/12", "body": "8 e 12 são os dois pares — dá para dividir por 2 🤔", "icon": "🔎" },
  { "title": "2. Divide por 2", "body": "8 ÷ 2 = 4 e 12 ÷ 2 = 6 → fica 4/6", "icon": "➗" },
  { "title": "3. Ainda dá?", "body": "4 e 6 também são pares → divide outra vez por 2: 2/3", "icon": "➗" },
  { "title": "4. Pronto!", "body": "2 e 3 já não têm divisor comum → 2/3 é irredutível ✨", "icon": "✨" }
]
```

> **Truque:** para simplificar de uma vez só, divide cima e baixo pelo **m.d.c.** dos dois! Em 8/12, o m.d.c.(8,12) = 4, e 8÷4 / 12÷4 = **2/3** logo. 🔧

## Comparar frações 🤏

Para saber qual é **maior**, olha primeiro o **denominador** (o de baixo):

```compare
[
  { "title": "Mesmo denominador", "rows": [
    { "label": "Como?", "value": "ganha quem tem o numerador maior" },
    { "label": "Exemplo", "value": "3/5 > 2/5 (3 fatias > 2 fatias)" }
  ] },
  { "title": "Mesmo numerador", "highlight": true, "rows": [
    { "label": "Como?", "value": "ganha quem tem o denominador MENOR" },
    { "label": "Exemplo", "value": "1/3 > 1/5 (fatias maiores!) 🍰" }
  ] }
]
```

Espera — **1/3 maior que 1/5?** Sim! Quanto mais fatias divides a pizza, **mais pequena** fica cada fatia. Vê com os teus olhos:

```fractionstrips
{ "mode": "compare", "title": "1/3 é maior que 1/5", "color": "ok",
  "rows": [ { "parts": 3, "filled": 1 }, { "parts": 5, "filled": 1 } ] }
```

E quando os de baixo são **diferentes**? Põe-nas na **mesma língua**: arranja um **denominador comum** (o m.m.c. dos denominadores) e transforma as duas.

```steps
[
  { "title": "Comparar 2/3 e 3/4", "body": "denominadores 3 e 4 → denominador comum = m.m.c.(3,4) = 12", "icon": "🤝" },
  { "title": "Converte a 1.ª", "body": "2/3 = 8/12 (×4 em cima e em baixo)", "icon": "🔁" },
  { "title": "Converte a 2.ª", "body": "3/4 = 9/12 (×3 em cima e em baixo)", "icon": "🔁" },
  { "title": "Compara!", "body": "8/12 < 9/12 → logo 2/3 < 3/4 🏆", "icon": "🏆" }
]
```

## Somar e subtrair frações ➕➖

A regra de ouro: **só se somam (ou subtraem) fatias do mesmo tamanho** — ou seja, com o **mesmo denominador**. Aí, somas os de cima e o de baixo **fica igual**!

```math
{ "expr": "1/5 + 2/5 = 3/5", "say": "um quinto mais dois quintos é igual a três quintos" }
```

> [!WARNING] Cuidado, erro clássico! Em **1/5 + 2/5**, o de baixo **NÃO** muda: é **3/5**, e não 3/10! Só somas os de cima; o denominador diz o tamanho das fatias e fica quieto. 🚫

E se os denominadores forem **diferentes**? Primeiro fá-los iguais (denominador comum), depois soma:

```steps
[
  { "title": "Somar 1/2 + 1/4", "body": "denominadores 2 e 4 → comum = 4", "icon": "🤝" },
  { "title": "Converte 1/2", "body": "1/2 = 2/4 (×2 em cima e em baixo)", "icon": "🔁" },
  { "title": "Agora soma", "body": "2/4 + 1/4 = 3/4 ✅", "icon": "➕" }
]
```

```math
{ "expr": "1/2 + 1/4 = 3/4", "say": "um meio mais um quarto é igual a três quartos" }
```

## Multiplicar uma fração por um número ✖️

Multiplicar **2 × 1/4** é o mesmo que somar 1/4 + 1/4: ficas com **2/4 = 1/2**. Regra fácil: **multiplica só o numerador**, o denominador fica!

```math
{ "expr": "3 × 1/5 = 3/5", "say": "três vezes um quinto é igual a três quintos" }
```

E «**1/3 de 12**»? A palavra «de» quer dizer **dividir em partes** e tirar uma. Divide os 12 em 3 grupos e fica com 1 grupo:

```fractionof
{ "whole": 12, "parts": 3, "take": 1, "emoji": "🍪", "title": "1/3 de 12 = 4" }
```

## Um exemplo passo a passo 🔍

*«A Leonor comeu 1/4 de um bolo e o irmão comeu 3/8. Quanto comeram juntos? Sobrou bolo?»* Vamos com calma. 🎂

```steps
[
  { "title": "1. Mesma língua", "body": "1/4 e 3/8 → denominador comum = 8", "icon": "🤝" },
  { "title": "2. Converte 1/4", "body": "1/4 = 2/8 (×2 em cima e em baixo)", "icon": "🔁" },
  { "title": "3. Soma", "body": "2/8 + 3/8 = 5/8 do bolo comido 🍰", "icon": "➕" },
  { "title": "4. O que sobra", "body": "o bolo todo é 8/8; sobra 8/8 − 5/8 = 3/8 🎂", "icon": "➖" },
  { "title": "5. Resposta", "body": "comeram 5/8 e sobraram 3/8 do bolo! ✅", "icon": "🎉" }
]
```

> **Truque:** o **inteiro** é sempre o denominador «sobre ele mesmo» — uma pizza inteira é **8/8**, **4/4**, **6/6**… Por isso, para saber o que sobra, faz **(denominador)/(denominador) − a parte comida**. 🍕

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Equivalências e operações com frações", "items": [
  { "front": "1/2 é o mesmo que…", "back": "2/4", "options": ["1/4", "3/4"] },
  { "front": "Simplifica 6/8", "back": "3/4", "options": ["2/4", "6/4"] },
  { "front": "1/5 + 2/5", "back": "3/5", "options": ["3/10", "2/5"] },
  { "front": "Qual é maior: 1/3 ou 1/5?", "back": "1/3", "options": ["1/5", "são iguais"] },
  { "front": "1/3 de 12", "back": "4", "options": ["3", "6"] },
  { "front": "1/2 + 1/4", "back": "3/4", "options": ["2/6", "1/6"] },
  { "front": "A pizza inteira, em oitavos, é…", "back": "8/8", "options": ["1/8", "8/1"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Quando o numerador é **maior** que o denominador, como **7/4**, a fração vale **mais que um inteiro**! Chama-se **fração imprópria**, e podes escrevê-la como **número misto**: 7/4 = **1 e 3/4** (um inteiro inteiro mais três quartos). É o que fazes quando dizes «comi uma pizza e meia»! 🍕🍕

## Vamos praticar 🎈

```quiz
{
  "id": "mat-5-fracoes-pratica",
  "questions": [
    { "gen": { "kind": "fraction", "shape": "bar", "max": 8 } },
    { "q": "Qual destas é equivalente a 1/2?", "layout": "grid",
      "options": [ { "t": "2/4", "emoji": "👯", "correct": true }, { "t": "1/4", "feedback": "1/4 é metade de 1/2. Para ser equivalente, multiplica cima e baixo: 1/2 = 2/4.", "tag": "fracao-equivalente" }, { "t": "2/3", "feedback": "Em frações equivalentes multiplicas cima e baixo pelo mesmo número. 1/2 vira 2/4, não 2/3.", "tag": "fracao-equivalente" } ],
      "explain": "1/2 = 2/4: corta-se em mais fatias, mas vale o mesmo." },
    { "q": "Simplifica 6/8 à forma mais simples.", "layout": "grid",
      "options": [ { "t": "3/4", "emoji": "✨", "correct": true }, { "t": "2/4", "feedback": "Dividiste o 6 por 3, mas o 8 por 2. Para simplificar, divide cima e baixo pelo mesmo número.", "tag": "fracao-simplificar" }, { "t": "6/4", "feedback": "Só mudaste o denominador. Simplificar 6/8 divide cima e baixo por 2: 3/4.", "tag": "fracao-simplificar" } ],
      "explain": "Divide cima e baixo por 2: 6/8 = 3/4 (irredutível)." },
    { "q": "Quanto é 1/5 + 2/5?", "layout": "grid",
      "options": [ { "t": "3/5", "correct": true }, { "t": "3/10", "feedback": "O denominador não se soma. Como as fatias já são quintos, fica 5: 3/5.", "tag": "fracao-soma-denominador" }, { "t": "2/5", "feedback": "Faltou somar os numeradores: 1 + 2 = 3. Resultado: 3/5.", "tag": "fracao-soma-numerador" } ],
      "explain": "Mesmo denominador: somas os de cima, o de baixo fica: 3/5." },
    { "q": "Qual é maior?", "layout": "grid",
      "options": [ { "t": "1/3", "emoji": "🍰", "correct": true }, { "t": "1/5", "feedback": "Com numerador 1, denominador menor dá fatia maior. Terços são maiores que quintos.", "tag": "fracao-denominador-maior" }, { "t": "1/8", "feedback": "Oitavos são fatias mais pequenas. 1/3 é o maior pedaço.", "tag": "fracao-denominador-maior" } ],
      "explain": "Menos fatias = fatias maiores. 1/3 é o maior pedaço." },
    { "q": "Quanto é 1/2 + 1/4?", "layout": "grid",
      "options": [ { "t": "3/4", "emoji": "🍫", "correct": true }, { "t": "2/6", "feedback": "Não somes denominadores. Primeiro transforma 1/2 em 2/4; depois 2/4 + 1/4 = 3/4.", "tag": "fracao-soma-denominador" }, { "t": "1/6", "feedback": "Faltou pôr tudo em quartos. 1/2 = 2/4, então o total é 3/4.", "tag": "fracao-denominador-comum" } ],
      "explain": "1/2 = 2/4; depois 2/4 + 1/4 = 3/4." },
    { "q": "Quanto é 1/3 de 12?", "layout": "grid",
      "options": [ { "t": "4", "emoji": "🍪", "correct": true }, { "t": "3", "feedback": "Divides 12 em 3 partes iguais. Cada parte tem 4, não 3.", "tag": "fracao-de-quantidade" }, { "t": "6", "feedback": "6 seria metade de 12. Um terço é 12 ÷ 3 = 4.", "tag": "fracao-metade-quarto" } ],
      "explain": "12 ÷ 3 = 4: divides em 3 grupos e ficas com 1." },
    { "q": "Quanto é 3 × 1/5?", "layout": "grid",
      "options": [ { "t": "3/5", "emoji": "✖️", "correct": true }, { "t": "3/15", "feedback": "Ao multiplicar um número por uma fração, multiplicas o numerador; o denominador fica 5.", "tag": "fracao-multiplicar" }, { "t": "1/5", "feedback": "Faltou multiplicar por 3. Três vezes 1/5 são 3/5.", "tag": "fracao-multiplicar" } ],
      "explain": "Multiplicas só o numerador: 3 × 1/5 = 3/5." },
    { "q": "Para somar 2/3 + 1/4, primeiro tens de…", "layout": "list",
      "options": [ { "t": "arranjar um denominador comum", "emoji": "🤝", "correct": true }, { "t": "somar os de baixo", "feedback": "Os denominadores não se somam. Primeiro faz fatias do mesmo tamanho.", "tag": "fracao-soma-denominador" }, { "t": "multiplicar tudo", "feedback": "Não é multiplicação. Para somar frações diferentes, primeiro encontra denominador comum.", "tag": "fracao-denominador-comum" } ],
      "explain": "Só se somam fatias do mesmo tamanho → denominador comum primeiro." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-fracoes-final",
  "final": true,
  "title": "Frações: comparar e operar",
  "questions": [
    { "q": "Qual é equivalente a 3/4?", "layout": "grid",
      "options": [ { "t": "6/8", "emoji": "👯", "correct": true }, { "t": "3/8", "feedback": "Mantiveste o numerador e só mudaste o denominador. Equivalente multiplica ambos: 3/4 = 6/8.", "tag": "fracao-equivalente" }, { "t": "4/3", "feedback": "4/3 inverte a fração e fica maior que 1. 3/4 equivale a 6/8.", "tag": "fracao-invertida" } ],
      "explain": "Multiplica cima e baixo por 2: 3/4 = 6/8." },
    { "q": "Quanto é 2/7 + 3/7?", "layout": "grid",
      "options": [ { "t": "5/7", "correct": true }, { "t": "5/14", "feedback": "O denominador não se soma. Somas 2 + 3 e manténs os sétimos: 5/7.", "tag": "fracao-soma-denominador" }, { "t": "6/7", "feedback": "Multiplicaste os numeradores. Aqui é soma: 2 + 3 = 5.", "tag": "fracao-soma-numerador" } ],
      "explain": "Mesmo denominador: 2 + 3 = 5 → 5/7." },
    { "q": "Simplifica 10/15.", "layout": "grid",
      "options": [ { "t": "2/3", "emoji": "✨", "correct": true }, { "t": "5/15", "feedback": "Só dividiste o numerador por 2. Divide cima e baixo por 5: 10/15 = 2/3.", "tag": "fracao-simplificar" }, { "t": "1/3", "feedback": "10 ÷ 5 = 2, não 1. Simplificando por 5 dá 2/3.", "tag": "fracao-simplificar" } ],
      "explain": "Divide cima e baixo por 5: 10/15 = 2/3." },
    { "q": "Qual é maior?", "layout": "grid",
      "options": [ { "t": "3/4", "emoji": "🏆", "correct": true }, { "t": "2/4", "feedback": "Com o mesmo denominador, compara os numeradores. 3 partes é mais que 2.", "tag": "fracao-comparacao" }, { "t": "1/4", "feedback": "Com quartos, ganha quem tem mais quartos. 3/4 é maior que 1/4.", "tag": "fracao-comparacao" } ],
      "explain": "Mesmo denominador: ganha o numerador maior, 3/4." },
    { "q": "Qual é maior, com numeradores iguais?", "layout": "grid",
      "options": [ { "t": "1/2", "emoji": "🍰", "correct": true }, { "t": "1/4", "feedback": "Com numerador igual, denominador menor dá fatia maior. Metades são maiores que quartos.", "tag": "fracao-denominador-maior" }, { "t": "1/6", "feedback": "Sextos são fatias ainda mais pequenas. 1/2 é o maior.", "tag": "fracao-denominador-maior" } ],
      "explain": "Denominador menor = fatias maiores. 1/2 é o maior." },
    { "q": "Em 1/4 + 2/4, o denominador do resultado é…", "layout": "grid",
      "options": [ { "t": "4 (fica igual)", "emoji": "🚫", "correct": true }, { "t": "8", "feedback": "Não somes 4 + 4. O denominador indica o tamanho das fatias e fica 4.", "tag": "fracao-soma-denominador" }, { "t": "16", "feedback": "Não multiplicas os denominadores numa soma com denominadores iguais. Fica 4.", "tag": "fracao-soma-denominador" } ],
      "explain": "O denominador não se soma! Fica 3/4." },
    { "q": "Quanto é 1/4 de 20?", "layout": "grid",
      "options": [ { "t": "5", "emoji": "🍪", "correct": true }, { "t": "4", "feedback": "O 4 diz em quantas partes divides. 20 ÷ 4 = 5.", "tag": "fracao-de-quantidade" }, { "t": "16", "feedback": "16 é 20 − 4, mas um quarto pede divisão: 20 ÷ 4 = 5.", "tag": "fracao-de-quantidade" } ],
      "explain": "20 ÷ 4 = 5: divides em 4 grupos e ficas com 1." },
    { "q": "A Leonor comeu 1/4 e o irmão 3/8 do bolo. Juntos comeram…", "layout": "grid",
      "options": [ { "t": "5/8", "emoji": "🎂", "correct": true }, { "t": "4/12", "feedback": "Não somes denominadores. Transforma 1/4 em 2/8; 2/8 + 3/8 = 5/8.", "tag": "fracao-soma-denominador" }, { "t": "4/8", "feedback": "1/4 vale 2/8, não 1/8. Então 2/8 + 3/8 = 5/8.", "tag": "fracao-denominador-comum" } ],
      "explain": "1/4 = 2/8; depois 2/8 + 3/8 = 5/8." },
    { "q": "A fração 7/4 (numerador maior que o denominador) chama-se…", "layout": "grid",
      "options": [ { "t": "imprópria (vale mais que 1)", "emoji": "🍕", "correct": true }, { "t": "irredutível", "feedback": "Irredutível é quando já não dá para simplificar. 7/4 tem numerador maior: é imprópria.", "tag": "fracao-impropria" }, { "t": "decimal", "feedback": "Decimal usa vírgula. 7/4 é uma fração imprópria porque vale mais que 1.", "tag": "fracao-impropria" } ],
      "explain": "Numerador > denominador → fração imprópria; 7/4 = 1 e 3/4." }
  ]
}
```
