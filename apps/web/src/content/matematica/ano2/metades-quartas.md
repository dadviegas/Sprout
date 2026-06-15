# Metades e quartas partes 🍫

> [!NOTE] **O que vais aprender** 👀 Vais aprender a dividir em **partes iguais**: a **metade** (dividir em 2) e a **quarta parte** (dividir em 4). E vais descobrir a metade de formas, de pizzas, de chocolates e até de grupos de morangos! 🍓

Imagina que tens uma pizza e um amigo esfomeado. 🍕 Como dividem sem brigar? Em **partes iguais**! Quando divides uma coisa em **2 partes iguais**, cada parte é **uma metade**. Em **4 partes iguais**, cada parte é **uma quarta parte**. Vamos ver isto com comida — que é como tudo se aprende melhor! 😋

## A metade: dividir em 2 ✌️

A metade só vale se as duas partes ficarem **mesmo iguais** — nada de uma fatia gigante para ti e uma migalha para o teu amigo!

```fraction
{ "parts": 2, "filled": 1, "shape": "pie", "title": "Metade da pizza: 1 de 2 partes iguais", "color": "accent" }
```

A metade escreve-se assim, com números:

```math
{ "expr": "1/2", "say": "um meio: uma parte de duas partes iguais — a metade" }
```

O número de **baixo** diz em quantas partes dividiste (2); o de **cima** diz quantas tomaste (1).

## A quarta parte: dividir em 4 🍫

Agora divide em **4 partes iguais** — por exemplo, uma tablete de chocolate para 4 amigos:

```fraction
{ "parts": 4, "filled": 1, "shape": "bar", "title": "Uma quarta parte do chocolate: 1 de 4 partes iguais", "color": "primary" }
```

```math
{ "expr": "1/4", "say": "um quarto: uma parte de quatro partes iguais — a quarta parte" }
```

> Reparaste? A quarta parte é **mais pequena** do que a metade — dividir por mais amigos dá fatias mais pequenas! 🤏

## Metade de um grupo: metade de 8 🍓

A metade não é só para pizzas — também funciona com **quantidades**! Metade de 8 morangos é repartir os 8 por **2 taças iguais**:

```fractionof
{ "whole": 8, "parts": 2, "take": 1, "emoji": "🍓", "title": "Metade de 8 morangos = 4", "color": "accent" }
```

E a **quarta parte** de 8? Repartes por **4 taças iguais** — cada uma fica com 2:

```fractionof
{ "whole": 8, "parts": 4, "take": 1, "emoji": "🍓", "title": "A quarta parte de 8 morangos = 2", "color": "primary" }
```

```keyvalue
[
  { "k": "Metade de 4", "v": "2 (4 repartido por 2) ✌️" },
  { "k": "Metade de 8", "v": "4 (8 repartido por 2)" },
  { "k": "Metade de 10", "v": "5 (10 repartido por 2)" },
  { "k": "Quarta parte de 8", "v": "2 (8 repartido por 4) 🤲" }
]
```

## Um exemplo passo a passo 🔍

A mãe fez **12 bolachas** e diz: «Podes comer a **quarta parte**.» Quantas bolachas comes? 🍪

```steps
[
  { "title": "1. Lê com calma", "body": "quarta parte = dividir em 4 partes iguais 🔍", "icon": "🧐" },
  { "title": "2. Reparte as 12 bolachas", "body": "faz 4 montinhos iguais 🤲", "icon": "🤲" },
  { "title": "3. Conta um montinho", "body": "12 repartido por 4 dá 3 em cada montinho", "icon": "✏️" },
  { "title": "4. Resposta", "body": "comes 3 bolachas! 🍪 (e sobram 9 para os outros)", "icon": "🎉" }
]
```

> **Truque:** a quarta parte é **a metade da metade**! Quarta parte de 12? Metade de 12 é 6… e metade de 6 é **3**. Dividir por 4 é dividir por 2 duas vezes. ✌️✌️

> [!TIP] **Para saberes mais** 🌱 Estes números com um risco no meio (1/2, 1/4) chamam-se **frações** — vais aprender muitas mais no 3.º ano! E há uma famosa que conheces dos relógios: 1/4 de hora é **um quarto de hora** = 15 minutos, porque a hora tem 60 minutos e 60 repartido por 4 dá 15. 🕐

## Vamos praticar 🎈

```quiz
{
  "id": "mat-2-fracoes-iniciais-pratica",
  "questions": [
    { "q": "Dividir em 2 partes iguais e ficar com 1 é ficar com…", "layout": "grid",
      "options": [ { "t": "a metade", "emoji": "✌️", "correct": true }, { "t": "a quarta parte", "feedback": "A quarta parte é dividir em 4. Em 2 partes, cada uma é a metade.", "tag": "fracao-metade-quarto" }, { "t": "tudo", "feedback": "Tudo seria as 2 partes. Ficas só com 1 de 2: a metade.", "tag": "fracao-numerador-errado" } ],
      "explain": "2 partes iguais → cada uma é a metade (1/2)." },
    { "q": "Para teres quartas partes, divides em…", "layout": "grid",
      "options": [ { "t": "4 partes iguais", "emoji": "🤲", "correct": true }, { "t": "2 partes iguais", "feedback": "2 partes dá metades. Quartas partes são 4 partes iguais.", "tag": "fracao-metade-quarto" }, { "t": "3 partes quaisquer", "feedback": "Têm de ser 4 partes, e IGUAIS. Quaisquer não vale.", "tag": "fracao-partes-iguais" } ],
      "explain": "Quarta parte = 1 de 4 partes IGUAIS (1/4)." },
    { "q": "Qual é a metade de 8?", "layout": "grid",
      "options": [ { "t": "4", "emoji": "🍓", "correct": true }, { "t": "2", "feedback": "2 é a quarta parte (8 ÷ 4). A metade é 8 ÷ 2 = 4.", "tag": "fracao-metade-quarto" }, { "t": "6", "feedback": "Confere: metade de 8 é 8 ÷ 2 = 4.", "tag": "fracao-calculo" } ],
      "explain": "8 repartido por 2 taças iguais: 4 em cada." },
    { "q": "Qual é a quarta parte de 8?", "layout": "grid",
      "options": [ { "t": "2", "correct": true }, { "t": "4", "feedback": "4 é a metade (8 ÷ 2). A quarta parte é 8 ÷ 4 = 2.", "tag": "fracao-metade-quarto" }, { "t": "8", "feedback": "8 é tudo. A quarta parte é 8 ÷ 4 = 2.", "tag": "fracao-numerador-errado" } ],
      "explain": "8 repartido por 4: 2 em cada parte." },
    { "q": "O que é maior: a metade ou a quarta parte da mesma pizza?", "layout": "grid",
      "options": [ { "t": "a metade", "emoji": "🍕", "correct": true }, { "t": "a quarta parte", "feedback": "Mais partes = fatias menores. A metade (1/2) é maior que a quarta (1/4).", "tag": "fracao-mais-partes-menor" }, { "t": "são iguais", "feedback": "Não são iguais: 1/2 é maior que 1/4.", "tag": "fracao-mais-partes-menor" } ],
      "explain": "Dividir por mais partes dá fatias mais pequenas: 1/2 > 1/4." },
    { "q": "Uma tablete tem 4 quadrados. Uma quarta parte é…", "layout": "grid",
      "options": [ { "t": "1 quadrado", "emoji": "🍫", "correct": true }, { "t": "2 quadrados", "feedback": "2 seria a metade (4 ÷ 2). A quarta parte é 4 ÷ 4 = 1.", "tag": "fracao-metade-quarto" }, { "t": "4 quadrados", "feedback": "4 é a tablete toda. A quarta parte é 1 quadrado.", "tag": "fracao-numerador-errado" } ],
      "explain": "4 repartido por 4: 1 quadrado para cada." },
    { "q": "Na fração 1/2, o número de baixo diz…", "layout": "grid",
      "options": [ { "t": "em quantas partes dividiste", "correct": true }, { "t": "quantas comes", "feedback": "Isso é o número de cima (numerador). O de baixo diz em quantas partes dividiste.", "tag": "fracao-numerador-vs-denominador" }, { "t": "a tua idade" } ],
      "explain": "O de baixo são as partes iguais (2); o de cima as que tomas (1)." },
    { "q": "A metade de 10 rebuçados é…", "emoji": "🍬", "layout": "grid",
      "options": [ { "t": "5", "correct": true }, { "t": "10", "feedback": "10 são todos. Metade é 10 ÷ 2 = 5.", "tag": "fracao-numerador-errado" }, { "t": "2", "feedback": "Confere: metade de 10 é 10 ÷ 2 = 5.", "tag": "fracao-calculo" } ],
      "explain": "10 repartido por 2: 5 para cada um." },
    { "q": "As duas metades de uma pizza têm de ser…", "layout": "grid",
      "options": [ { "t": "exatamente iguais", "emoji": "⚖️", "correct": true }, { "t": "uma grande e uma pequena", "feedback": "Sem partes iguais não há metades. Têm de ser exatamente iguais.", "tag": "fracao-partes-iguais" }, { "t": "de sabores diferentes", "feedback": "O sabor não importa; o tamanho sim: as metades têm de ser iguais.", "tag": "fracao-partes-iguais" } ],
      "explain": "Sem partes IGUAIS não há metade — é a regra de ouro!" }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-2-fracoes-iniciais-final",
  "final": true,
  "title": "Metades e quartas partes",
  "questions": [
    { "q": "A metade escreve-se…", "layout": "grid",
      "options": [ { "t": "1/2", "emoji": "✌️", "correct": true }, { "t": "1/4", "feedback": "1/4 é a quarta parte. A metade é 1/2.", "tag": "fracao-metade-quarto" }, { "t": "2/1", "feedback": "Trocaste os números: 1 parte de 2 é 1/2.", "tag": "fracao-invertida" } ],
      "explain": "1 parte de 2 partes iguais: 1/2." },
    { "q": "A quarta parte escreve-se…", "layout": "grid",
      "options": [ { "t": "1/4", "emoji": "🤲", "correct": true }, { "t": "1/2", "feedback": "1/2 é a metade. A quarta parte é 1/4.", "tag": "fracao-metade-quarto" }, { "t": "4/1", "feedback": "Trocaste os números: 1 parte de 4 é 1/4.", "tag": "fracao-invertida" } ],
      "explain": "1 parte de 4 partes iguais: 1/4." },
    { "q": "Qual é a metade de 6?", "layout": "grid",
      "options": [ { "t": "3", "correct": true }, { "t": "2", "feedback": "2 seria 6 a dividir por 3. Metade é 6 ÷ 2 = 3.", "tag": "fracao-calculo" }, { "t": "6", "feedback": "6 é tudo. Metade é 6 ÷ 2 = 3.", "tag": "fracao-numerador-errado" } ],
      "explain": "6 repartido por 2: 3 em cada parte." },
    { "q": "Qual é a quarta parte de 12?", "layout": "grid",
      "options": [ { "t": "3", "emoji": "🍪", "correct": true }, { "t": "6", "feedback": "6 é a metade (12 ÷ 2). A quarta parte é 12 ÷ 4 = 3.", "tag": "fracao-metade-quarto" }, { "t": "4", "feedback": "Confere: 12 ÷ 4 = 3.", "tag": "fracao-calculo" } ],
      "explain": "12 repartido por 4: 3. (Ou: metade de 12 é 6, metade de 6 é 3!)" },
    { "q": "Comeste 1/2 de uma pizza de 8 fatias. Quantas fatias comeste?", "layout": "grid",
      "options": [ { "t": "4", "emoji": "🍕", "correct": true }, { "t": "2", "feedback": "2 é a quarta parte (8 ÷ 4). Metade de 8 são 4 fatias.", "tag": "fracao-metade-quarto" }, { "t": "8", "feedback": "8 é a pizza toda. Metade são 4 fatias.", "tag": "fracao-numerador-errado" } ],
      "explain": "Metade de 8 fatias são 4 fatias." },
    { "q": "Dividir por 4 é o mesmo que…", "layout": "grid",
      "options": [ { "t": "dividir por 2 duas vezes", "emoji": "✌️", "correct": true }, { "t": "dividir por 2 uma vez", "feedback": "Por 2 uma vez dá a metade. A quarta parte é dividir por 2 DUAS vezes.", "tag": "fracao-metade-quarto" }, { "t": "multiplicar por 4", "feedback": "Multiplicar aumenta. A quarta parte divide: por 2 duas vezes.", "tag": "problema-operacao-errada" } ],
      "explain": "A quarta parte é a metade da metade!" },
    { "q": "Uma pizza dividida numa fatia grande e numa pequena tem duas metades?", "layout": "grid",
      "options": [ { "t": "não — as partes não são iguais", "emoji": "❌", "correct": true }, { "t": "sim — são duas partes", "emoji": "✅", "feedback": "São duas partes, mas desiguais. Metades têm de ser iguais.", "tag": "fracao-partes-iguais" } ],
      "explain": "Metades têm de ser partes IGUAIS." },
    { "q": "O que é mais pequeno: 1/2 ou 1/4 do mesmo chocolate?", "layout": "grid",
      "options": [ { "t": "1/4", "emoji": "🤏", "correct": true }, { "t": "1/2", "feedback": "1/2 é maior. Em 4 partes, cada uma (1/4) é mais pequena.", "tag": "fracao-mais-partes-menor" }, { "t": "são iguais", "feedback": "Não são iguais: 1/4 é mais pequeno que 1/2.", "tag": "fracao-mais-partes-menor" } ],
      "explain": "Em 4 partes, cada uma é mais pequena do que em 2 partes." },
    { "q": "4 amigos repartem 8 morangos em partes iguais. Quantos come cada um?", "emoji": "🍓", "layout": "grid",
      "options": [ { "t": "2", "correct": true }, { "t": "4", "feedback": "4 é a metade (8 ÷ 2). São 4 amigos: 8 ÷ 4 = 2 cada.", "tag": "fracao-metade-quarto" }, { "t": "8", "feedback": "8 são todos. Repartidos por 4: 8 ÷ 4 = 2 cada.", "tag": "problema-operacao-errada" } ],
      "explain": "A quarta parte de 8 é 2 — cada amigo come 2 morangos." }
  ]
}
```
