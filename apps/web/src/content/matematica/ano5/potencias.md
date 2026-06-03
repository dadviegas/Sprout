# Potências de base 10 ⏫

> [!NOTE] **O que vais aprender** 👀 Vais descobrir o que é uma **potência** (base e expoente), porque é que **10²** é só «1 e dois zeros», como **decompor** números gigantes com potências de 10, e como elas tornam os números grandes fáceis de escrever e dizer! 🚀

Escrever **1 000 000** dá muitas voltas e é fácil enganar-se nos zeros. 😵 Os matemáticos arranjaram um atalho genial: as **potências**. Com elas, escreves números enormes em pouquíssimo espaço — e nas potências de **base 10** há um truque tão fácil que vais sorrir. Vamos lá! ⏫

## O que é uma potência? 🔢

Uma **potência** é uma multiplicação do **mesmo número** repetido várias vezes. Em vez de escrever 10 × 10 × 10, escreves **10³**. Tem duas partes com nome:

```keyvalue
[
  { "k": "Base", "v": "o número que se repete (o de baixo) — aqui, o 10 🔟" },
  { "k": "Expoente", "v": "quantas vezes se repete (o pequenino lá em cima) — aqui, 3 ⬆️" },
  { "k": "Lê-se", "v": "«dez elevado a três» ou «dez à terceira» 🎤" },
  { "k": "Significa", "v": "10 × 10 × 10 = 1000 ✖️" }
]
```

```math
{ "expr": "10³ = 10 × 10 × 10 = 1000", "say": "dez elevado a três é igual a dez vezes dez vezes dez, que é igual a mil" }
```

> [!WARNING] Cuidado: **10³ NÃO é 10 × 3 = 30!** O expoente diz **quantas vezes multiplicas** a base por ela própria, não por quanto a multiplicas. 10³ = 10 × 10 × 10 = **1000**. 🚫

## O truque mágico das potências de 10 ✨

Aqui está a melhor parte! Numa potência de **base 10**, o **expoente é igual ao número de zeros**. É só isso! 🪄

```stats
[
  { "label": "10¹", "value": "10", "hint": "1 zero" },
  { "label": "10²", "value": "100", "hint": "2 zeros" },
  { "label": "10³", "value": "1000", "hint": "3 zeros" },
  { "label": "10⁶", "value": "1 000 000", "hint": "6 zeros = milhão" }
]
```

> **Truque:** **o expoente conta os zeros!** Queres saber quanto é 10⁵? Escreve um **1** e põe-lhe **5 zeros** atrás: **100 000**. Mais fácil é impossível! 🎉

E há dois casos especiais que vais querer guardar:

```keyvalue
[
  { "k": "10⁰", "v": "qualquer base elevada a 0 dá 1 → 10⁰ = 1 🥚" },
  { "k": "10¹", "v": "qualquer base elevada a 1 é ela própria → 10¹ = 10 🔟" }
]
```

## Decompor números com potências de 10 🧩

Lembras-te de decompor 4 444 = 4000 + 400 + 40 + 4? Agora podes escrever cada lugar como uma **potência de 10**! É a **notação por potências**, que mostra o valor de cada algarismo.

```math
{ "expr": "3500 = 3 × 10³ + 5 × 10²", "say": "três mil e quinhentos é igual a três vezes dez elevado a três mais cinco vezes dez elevado a dois" }
```

```steps
[
  { "title": "Olha o 3 500", "body": "o 3 está nos milhares, o 5 nas centenas", "icon": "🔎" },
  { "title": "O 3 vale 3 milhares", "body": "3 × 1000 = 3 × 10³", "icon": "🔟" },
  { "title": "O 5 vale 5 centenas", "body": "5 × 100 = 5 × 10²", "icon": "💯" },
  { "title": "Junta tudo", "body": "3 500 = 3 × 10³ + 5 × 10² 🧩", "icon": "🧩" }
]
```

## Multiplicar por uma potência de 10 🚀

Multiplicar por 10, 100 ou 1000 é só **acrescentar zeros** (ou andar com a vírgula, se houver). O expoente diz **quantos**!

```keyvalue
[
  { "k": "× 10¹ (× 10)", "v": "acrescenta 1 zero: 7 × 10 = 70 ➡️" },
  { "k": "× 10² (× 100)", "v": "acrescenta 2 zeros: 7 × 100 = 700 ➡️➡️" },
  { "k": "× 10³ (× 1000)", "v": "acrescenta 3 zeros: 7 × 1000 = 7000 ➡️➡️➡️" },
  { "k": "Com vírgula", "v": "3,5 × 10² = 350 (a vírgula anda 2 casas) 💶" }
]
```

## Um exemplo passo a passo 🔍

*«Quanto vale 4 × 10³ + 2 × 10² + 7?»* Vamos montar o número peça a peça, como um Lego. 🧱

```steps
[
  { "title": "1. 4 × 10³", "body": "10³ = 1000 → 4 × 1000 = 4000", "icon": "🔟" },
  { "title": "2. 2 × 10²", "body": "10² = 100 → 2 × 100 = 200", "icon": "💯" },
  { "title": "3. + 7", "body": "as 7 unidades soltas", "icon": "✋" },
  { "title": "4. Soma tudo", "body": "4000 + 200 + 7 = 4207 🧮", "icon": "🧮" },
  { "title": "5. Resposta", "body": "o número é 4 207! 🎉", "icon": "🎉" }
]
```

> **Truque:** para ler estas somas de potências, vê o **maior expoente** primeiro — ele diz-te o «tamanho» do número. 10³ já é casa dos milhares, por isso sabes logo que a resposta vai ter 4 algarismos. 🧠

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Potências de base 10", "items": [
  { "front": "10²", "back": "100", "options": ["20", "1000"] },
  { "front": "10³", "back": "1000", "options": ["30", "300"] },
  { "front": "10⁶", "back": "1 000 000", "options": ["100 000", "60"] },
  { "front": "10¹", "back": "10", "options": ["1", "100"] },
  { "front": "10⁰", "back": "1", "options": ["0", "10"] },
  { "front": "Quantos zeros tem 10⁵?", "back": "5 zeros", "options": ["4 zeros", "6 zeros"] },
  { "front": "7 × 10³", "back": "7000", "options": ["700", "73"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Os cientistas usam potências de 10 para escrever números **monstruosos** sem encher a página — é a **notação científica**. A distância da Terra ao Sol é cerca de **1,5 × 10¹¹ metros** (150 mil milhões!). E há potências de 10 **negativas** para o muito pequeno: **10⁻³ = 0,001** (uma milésima). Assim cabe o universo inteiro — do átomo às estrelas — em pouquíssimos algarismos! 🌌🔬

## Vamos praticar 🎈

```quiz
{
  "id": "mat-5-potencias-pratica",
  "questions": [
    { "q": "Quanto é 10²?", "layout": "grid",
      "options": [ { "t": "100", "emoji": "💯", "correct": true }, { "t": "20" }, { "t": "1000" } ],
      "explain": "10² = 10 × 10 = 100 (2 zeros)." },
    { "q": "Em 10³, o 3 chama-se…", "layout": "grid",
      "options": [ { "t": "expoente", "emoji": "⬆️", "correct": true }, { "t": "base" }, { "t": "produto" } ],
      "explain": "O número pequenino em cima é o expoente; o 10 é a base." },
    { "q": "Quanto é 10⁶?", "layout": "grid",
      "options": [ { "t": "1 000 000", "emoji": "😲", "correct": true }, { "t": "60" }, { "t": "100 000" } ],
      "explain": "Expoente 6 = 6 zeros = um milhão." },
    { "q": "10³ é igual a…", "layout": "grid",
      "options": [ { "t": "10 × 10 × 10", "emoji": "✖️", "correct": true }, { "t": "10 × 3" }, { "t": "10 + 10 + 10" } ],
      "explain": "O expoente diz quantas vezes multiplicar a base por si própria." },
    { "q": "Quantos zeros tem 10⁵?", "layout": "grid",
      "options": [ { "t": "5", "emoji": "🪄", "correct": true }, { "t": "4" }, { "t": "6" } ],
      "explain": "Nas potências de 10, o expoente conta os zeros: 100 000." },
    { "q": "Quanto é 10⁰?", "layout": "grid",
      "options": [ { "t": "1", "emoji": "🥚", "correct": true }, { "t": "0" }, { "t": "10" } ],
      "explain": "Qualquer número elevado a 0 dá 1." },
    { "q": "Quanto é 7 × 10²?", "layout": "grid",
      "options": [ { "t": "700", "emoji": "🚀", "correct": true }, { "t": "72" }, { "t": "70" } ],
      "explain": "× 10² = × 100: acrescenta 2 zeros → 700." },
    { "q": "Como escreves 5000 com uma potência de 10?", "layout": "grid",
      "options": [ { "t": "5 × 10³", "emoji": "🧩", "correct": true }, { "t": "5 × 10²" }, { "t": "50 × 10" } ],
      "explain": "5000 = 5 × 1000 = 5 × 10³." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-potencias-final",
  "final": true,
  "title": "Potências de base 10",
  "questions": [
    { "q": "Numa potência, o número que se repete é a…", "layout": "grid",
      "options": [ { "t": "base", "emoji": "🔟", "correct": true }, { "t": "expoente" }, { "t": "soma" } ],
      "explain": "A base é o número repetido; o expoente diz quantas vezes." },
    { "q": "Quanto é 10³?", "layout": "grid",
      "options": [ { "t": "1000", "emoji": "💯", "correct": true }, { "t": "30" }, { "t": "300" } ],
      "explain": "3 zeros → 1000." },
    { "q": "10² é o mesmo que…", "layout": "grid",
      "options": [ { "t": "100", "correct": true }, { "t": "10 × 2" }, { "t": "12" } ],
      "explain": "10 × 10 = 100, não 10 × 2." },
    { "q": "Nas potências de 10, o expoente diz…", "layout": "grid",
      "options": [ { "t": "o número de zeros", "emoji": "🪄", "correct": true }, { "t": "o número de algarismos pares" } ],
      "explain": "10⁴ = 10 000 → 4 zeros." },
    { "q": "Quanto é 10¹?", "layout": "grid",
      "options": [ { "t": "10", "emoji": "🔟", "correct": true }, { "t": "1" }, { "t": "100" } ],
      "explain": "Qualquer número elevado a 1 é ele próprio." },
    { "q": "Quanto é 3 × 10³ + 5 × 10²?", "layout": "grid",
      "options": [ { "t": "3500", "emoji": "🧩", "correct": true }, { "t": "350" }, { "t": "3050" } ],
      "explain": "3 × 1000 + 5 × 100 = 3000 + 500 = 3500." },
    { "q": "Quanto é 4 × 10³ + 2 × 10² + 7?", "layout": "grid",
      "options": [ { "t": "4207", "emoji": "🧱", "correct": true }, { "t": "427" }, { "t": "4027" } ],
      "explain": "4000 + 200 + 7 = 4207." },
    { "q": "Quanto é 3,5 × 10² (com vírgula)?", "layout": "grid",
      "options": [ { "t": "350", "emoji": "💶", "correct": true }, { "t": "35" }, { "t": "3500" } ],
      "explain": "× 100: a vírgula anda 2 casas para a direita → 350." },
    { "q": "Os cientistas escrevem números enormes com…", "layout": "grid",
      "options": [ { "t": "notação científica (potências de 10)", "emoji": "🌌", "correct": true }, { "t": "muitos zeros à mão" } ],
      "explain": "Ex.: 1,5 × 10¹¹ metros da Terra ao Sol — cabe em poucos algarismos." }
  ]
}
```
