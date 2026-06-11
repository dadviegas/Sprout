# Contas em pé: somar e subtrair ➕➖

> [!NOTE] **O que vais aprender** 👀 Vais aprender a pôr as contas **em pé** (armadas!): os números em colunas certinhas, a somar com o **«vai um»** e a subtrair com o **«pede emprestado»** — com números até às centenas. 💪

Somar 7 + 5 fazes de cabeça. Mas 357 + 265? Aí entra a **conta armada**: pões os números **em pé**, uns por baixo dos outros, e resolves **uma coluna de cada vez** — unidades, dezenas, centenas. Parece magia, mas é só arrumação! ✨

## A regra de ouro: alinhar pela direita 📐

Cada algarismo tem a sua **casa**: unidades debaixo de unidades, dezenas debaixo de dezenas, centenas debaixo de centenas. Por isso encostamos tudo **à direita** e começamos **sempre pelas unidades**.

```keyvalue
[
  { "k": "Armar a conta", "v": "pôr os números em pé, alinhados à direita 📐", "icon": "grid" },
  { "k": "Começar à direita", "v": "primeiro as unidades, depois dezenas, depois centenas 👉", "icon": "back" },
  { "k": "O «vai um»", "v": "se a coluna der 10 ou mais, escreves as unidades e levas 1 para a coluna seguinte ➡️", "icon": "plus" },
  { "k": "O «pede emprestado»", "v": "se não der para tirar, pedes 10 à casa da esquerda 🤝", "icon": "minus" }
]
```

## Somar com o «vai um» ➕

Primeiro uma soma **sem** transporte, para apanhares o jeito; depois o **357 + 265**, onde as colunas transbordam. Carrega no **+** dentro de cada conta para veres o passo seguinte:

```contaarmada
{
  "practice": false,
  "examples": [
    { "op": "add", "a": 234, "b": 143 },
    { "op": "add", "a": 357, "b": 265 }
  ]
}
```

Vamos dizer o 357 + 265 em voz alta, coluna a coluna:

```steps
[
  { "title": "1. Unidades", "body": "7 + 5 = 12 → escrevo o 2 e VAI UM para as dezenas ➡️", "icon": "✏️" },
  { "title": "2. Dezenas", "body": "5 + 6 = 11, mais o 1 que veio = 12 → escrevo o 2 e vai um outra vez!", "icon": "➡️" },
  { "title": "3. Centenas", "body": "3 + 2 = 5, mais o 1 que veio = 6", "icon": "✏️" },
  { "title": "4. Resultado", "body": "357 + 265 = 622 🎉", "icon": "🎉" }
]
```

### O que é mesmo o «vai um»? 🔎

O «vai um» não é truque de magia: são **10 cubinhos de unidades a transformarem-se numa barra de dez**! Vê os blocos a fazê-lo:

```blocos
{ "op": "add", "a": 36, "b": 27, "title": "36 + 27 — o «vai um» em blocos" }
```

## Subtrair com o «pede emprestado» ➖

Na subtração, às vezes a casa de cima é **mais pequena** do que a de baixo (não dá para tirar 8 de 2!). A solução: **pedir 10 emprestado** ao vizinho da esquerda. Vê primeiro uma sem empréstimo e depois o **432 − 187**:

```contaarmada
{
  "practice": false,
  "examples": [
    { "op": "sub", "a": 365, "b": 142 },
    { "op": "sub", "a": 432, "b": 187 }
  ]
}
```

```steps
[
  { "title": "1. Unidades", "body": "2 − 7 não dá! Peço 10 emprestado às dezenas: 12 − 7 = 5 🤝", "icon": "🤝" },
  { "title": "2. Dezenas", "body": "o 3 emprestou 1, ficou 2. E 2 − 8 não dá! Peço às centenas: 12 − 8 = 4", "icon": "🤝" },
  { "title": "3. Centenas", "body": "o 4 emprestou 1, ficou 3. E 3 − 1 = 2", "icon": "✏️" },
  { "title": "4. Resultado", "body": "432 − 187 = 245 🎉 (confirma: 245 + 187 = 432 ✓)", "icon": "🎉" }
]
```

### E o empréstimo em blocos 🔎

Pedir emprestado é **partir uma barra de dez em 10 cubinhos** para teres unidades que cheguem:

```blocos
{ "op": "sub", "a": 45, "b": 18, "title": "45 − 18 — o empréstimo em blocos" }
```

> **Truque:** no fim de uma subtração, **confere ao contrário**: soma o resultado com o número que tiraste — tem de dar o número de cima! 245 + 187 = 432 ✓. É o detetive a verificar a pista. 🕵️

> [!TIP] **Para saberes mais** 🌱 No 4.º ano vais armar também **multiplicações e divisões** — e até contas com **vírgulas**! A boa notícia: a regra é sempre a mesma que aprendeste hoje — alinhar bem as casas e resolver um passo de cada vez. 🚀

## Agora treinas tu! ✏️

Resolve estas contas e carrega em **«Verificar»**. Se ficares com dúvidas, carrega na **grelha** para veres a conta a resolver-se coluna a coluna:

```contaarmada
{
  "title": "A tua zona de treino",
  "practice": false,
  "examplesLayout": "rows",
  "examples": [
    { "op": "add", "a": 145, "b": 232 },
    { "op": "add", "a": 268, "b": 154 },
    { "op": "add", "a": 476, "b": 348 },
    { "op": "sub", "a": 386, "b": 124 },
    { "op": "sub", "a": 524, "b": 158 },
    { "op": "sub", "a": 700, "b": 256 }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-3-contas-armadas-final",
  "final": true,
  "title": "Contas em pé: somar e subtrair",
  "questions": [
    { "q": "Numa conta armada, os algarismos alinham-se…", "layout": "grid",
      "options": [ { "t": "pela direita", "emoji": "📐", "correct": true }, { "t": "pela esquerda" }, { "t": "pelo meio" } ],
      "explain": "Unidades debaixo de unidades, dezenas debaixo de dezenas." },
    { "q": "Por que coluna se começa?", "layout": "grid",
      "options": [ { "t": "pelas unidades, à direita", "emoji": "👉", "correct": true }, { "t": "pelas centenas" }, { "t": "tanto faz" } ],
      "explain": "Começa-se sempre pelas unidades — é de lá que parte o «vai um»." },
    { "q": "Na soma, a coluna deu 14. O que fazes?", "layout": "grid",
      "options": [ { "t": "escrevo o 4 e vai 1", "emoji": "➡️", "correct": true }, { "t": "escrevo o 14 todo" }, { "t": "escrevo o 1 e deito o 4 fora" } ],
      "explain": "Escreves as unidades (4) e o 1 (uma dezena) vai para a coluna seguinte." },
    { "q": "O «vai um» é, na verdade…", "layout": "grid",
      "options": [ { "t": "10 unidades a virarem 1 dezena", "emoji": "🧊", "correct": true }, { "t": "um número que desaparece" }, { "t": "um erro da conta" } ],
      "explain": "10 cubinhos juntam-se numa barra de dez — por isso viaja para a coluna ao lado." },
    { "q": "Quanto é 357 + 265?", "layout": "grid",
      "options": [ { "t": "622", "correct": true }, { "t": "512" }, { "t": "612" } ],
      "explain": "7+5=12 (vai 1), 5+6+1=12 (vai 1), 3+2+1=6 → 622." },
    { "q": "Na subtração, 2 − 7 não dá. O que fazes?", "layout": "grid",
      "options": [ { "t": "peço 10 emprestado à casa da esquerda", "emoji": "🤝", "correct": true }, { "t": "troco os números de lugar" }, { "t": "escrevo 5 na mesma" } ],
      "explain": "Pedes 10 emprestado: 12 − 7 = 5 (e o vizinho fica com menos 1)." },
    { "q": "Pedir emprestado é, em blocos…", "layout": "grid",
      "options": [ { "t": "partir 1 dezena em 10 unidades", "emoji": "🔨", "correct": true }, { "t": "juntar 10 unidades numa dezena" }, { "t": "deitar blocos fora" } ],
      "explain": "A barra de dez parte-se em 10 cubinhos para haver unidades que cheguem." },
    { "q": "Quanto é 432 − 187?", "layout": "grid",
      "options": [ { "t": "245", "correct": true }, { "t": "255" }, { "t": "345" } ],
      "explain": "Dois empréstimos: 12−7=5, 12−8=4, 3−1=2 → 245." },
    { "q": "Como conferes uma subtração?", "layout": "grid",
      "options": [ { "t": "somo o resultado com o que tirei", "emoji": "🕵️", "correct": true }, { "t": "faço a conta outra vez igual" }, { "t": "não se pode conferir" } ],
      "explain": "245 + 187 = 432 ✓ — se der o número de cima, a conta está certa!" }
  ]
}
```
