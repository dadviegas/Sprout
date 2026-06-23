# Subtrair em pé — do simples ao «pede emprestado» ➖

> [!NOTE] **O que vais aprender** 👀 Vais dominar a **subtração em pé**: primeiro sem empréstimos, depois o **«pede emprestado»**, o caso mais traiçoeiro de todos — **pedir emprestado quando há um zero no meio** (503 − 247!) — e ainda subtrair com **vírgulas**. E no fim, o truque do detetive para conferir tudo. 🕵️

Subtrair é **tirar**. Na conta em pé, o número de cima é o que tens e o de
baixo é o que sai. A regra é a mesma da soma: colunas certinhas, da direita
para a esquerda. Carrega no **+** dentro de cada conta para veres o passo
seguinte, e no 🔊 para ouvires. ✨

```summary
{
  "learn": [
    "Armar a subtração: o número maior fica em cima",
    "O «pede emprestado»: quando a casa de cima não chega",
    "Pedir emprestado quando há um zero no caminho",
    "Subtrair números com vírgula (alinhar as vírgulas!)",
    "Conferir a conta somando ao contrário"
  ],
  "examples": ["568 − 234", "452 − 218", "503 − 247", "7,2 − 3,45"],
  "say": "Vais aprender a subtrair em pé: sem empréstimo, com o pede emprestado, com zeros no meio e com vírgulas — e a conferir o resultado no fim."
}
```

## Nível 1: subtrair sem empréstimo 🟢

Quando todos os algarismos de cima são **maiores ou iguais** aos de baixo, a
conta é um passeio — cada coluna resolve-se sozinha:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "sub", "a": 568, "b": 234 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Unidades", "body": "8 − 4 = 4 → escrevo o 4 ✏️", "icon": "✏️" },
  { "title": "2. Dezenas", "body": "6 − 3 = 3 → escrevo o 3", "icon": "✏️" },
  { "title": "3. Centenas", "body": "5 − 2 = 3 → escrevo o 3", "icon": "✏️" },
  { "title": "4. Resultado", "body": "568 − 234 = 334 🎉", "icon": "🎉" }
] }
```

## Nível 2: o «pede emprestado» 🟡

E quando o algarismo de cima é **mais pequeno**? 2 − 8 não dá! A casa pede
**10 emprestado** à vizinha da esquerda — que fica com menos 1:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "sub", "a": 452, "b": 218 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Unidades", "body": "2 − 8 não dá! Peço 10 às dezenas: 12 − 8 = 4 🤝", "icon": "🤝" },
  { "title": "2. Dezenas", "body": "o 5 emprestou 1, ficou 4. E 4 − 1 = 3", "icon": "✏️" },
  { "title": "3. Centenas", "body": "4 − 2 = 2 → escrevo o 2", "icon": "✏️" },
  { "title": "4. Resultado", "body": "452 − 218 = 234 🎉", "icon": "🎉" }
] }
```

> [!WARNING] **A armadilha clássica: virar a conta ao contrário!** Em 452 − 218,
> nas unidades é **2 − 8**, e 2 − 8 não dá. O erro é fazer **8 − 2 = 6** «porque
> é mais fácil» — mas isso troca a conta! Quando a casa de cima não chega,
> **pede emprestado** — nunca subtraias o de cima ao de baixo. 🚫

## Nível 3: o chefe final — emprestar com um zero no meio 🟠

Agora o caso que engana toda a gente: **503 − 247**. As unidades precisam de
pedir emprestado… mas a casa ao lado é um **0** — não tem nada para emprestar!
A solução: o **0 pede primeiro às centenas**, e só depois empresta às unidades.
É um empréstimo em cadeia:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "sub", "a": 503, "b": 247 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Unidades em apuros", "body": "3 − 7 não dá. Vou pedir às dezenas… mas lá está um 0! 😱", "icon": "🔍" },
  { "title": "2. O 0 também pede", "body": "o 0 pede 10 às centenas: o 5 fica 4 e as dezenas ficam com 10 🤝", "icon": "🤝" },
  { "title": "3. Agora sim, emprestam", "body": "as dezenas (10) emprestam 1 às unidades: ficam 9, e as unidades ficam 13", "icon": "🤝" },
  { "title": "4. Subtrair tudo", "body": "13 − 7 = 6 · 9 − 4 = 5 · 4 − 2 = 2", "icon": "✏️" },
  { "title": "5. Resultado", "body": "503 − 247 = 256 🎉", "icon": "🎉" }
] }
```

> O zero é como um vizinho de **carteira vazia**: para te emprestar, primeiro
> tem de ir pedir ao vizinho dele. Por isso o 0 vira **9** (recebeu 10,
> emprestou 1) — repara que é sempre assim! 👛

## Nível 4: subtrair com vírgulas 🔵

Tal como na soma: **vírgula debaixo de vírgula** e zeros à direita para igualar
as casas (7,2 vira 7,20). Depois é uma subtração normal:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "sub", "a": "7.2", "b": "3.45" } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Alinhar e completar", "body": "7,2 vira 7,20 para ter tantas casas como 3,45 📐", "icon": "📐" },
  { "title": "2. Centésimas", "body": "0 − 5 não dá! Peço às décimas: 10 − 5 = 5 🤝", "icon": "🤝" },
  { "title": "3. Décimas", "body": "o 2 emprestou, ficou 1. E 1 − 4 não dá! Peço às unidades: 11 − 4 = 7 🤝", "icon": "🤝" },
  { "title": "4. Unidades", "body": "o 7 emprestou, ficou 6. E 6 − 3 = 3", "icon": "✏️" },
  { "title": "5. Resultado", "body": "7,2 − 3,45 = 3,75 🎉", "icon": "🎉" }
] }
```

## O truque do detetive: conferir ao contrário 🕵️

Uma subtração confere-se com uma **soma**: o resultado mais o que tiraste tem de
dar o número de cima. É infalível!

```math
{ "expr": "256 + 247 = 503", "say": "duzentos e cinquenta e seis mais duzentos e quarenta e sete é igual a quinhentos e três — a conta estava certa" }
```

> **Para saberes mais 🌱** Há quem subtraia **sem nunca pedir emprestado**: é o
> método de **somar aos dois**. Em vez de tirar 1 à casa de cima da esquerda,
> soma-se 1 à casa de baixo da esquerda — o resultado dá igual, porque somar o
> mesmo aos dois números não muda a diferença! Pergunta aos avós: muitos
> aprenderam assim. 👴

## Agora treinas tu! ✏️

Resolve estas subtrações e carrega em **«Verificar»**. Há de tudo: sem
empréstimo, com empréstimo e com zeros traiçoeiros:

```contaarmada
{
  "title": "A tua zona de treino",
  "practice": false,
  "examplesLayout": "rows",
  "examples": [
    { "op": "sub", "a": 479, "b": 235 },
    { "op": "sub", "a": 543, "b": 217 },
    { "op": "sub", "a": 612, "b": 348 },
    { "op": "sub", "a": 800, "b": 356 },
    { "op": "sub", "a": 904, "b": 478 },
    { "op": "sub", "a": "9.5", "b": "4.75" }
  ]
}
```

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-subtrair-pe-pratica",
  "questions": [
    { "q": "Nas unidades tens 2 − 8. O que fazes?", "layout": "grid",
      "options": [ { "t": "peço 10 emprestado às dezenas", "emoji": "🤝", "correct": true }, { "t": "faço 8 − 2, que é mais fácil", "feedback": "Nunca se vira a coluna! Pedes 10 emprestado às dezenas: 12 − 8 = 4.", "tag": "conta-armada-emprestimo" }, { "t": "escrevo 0", "feedback": "Não é 0. Pedes 10 emprestado às dezenas e fazes 12 − 8 = 4.", "tag": "conta-armada-emprestimo" } ],
      "explain": "Nunca vires a conta! Pede-se 10 emprestado: 12 − 8 = 4." },
    { "q": "Quanto é 452 − 218?", "layout": "grid",
      "options": [ { "t": "234", "emoji": "🎉", "correct": true }, { "t": "244", "feedback": "Esqueceste o empréstimo: 2−8 não dá, pedes 10 → 12−8=4, depois 4−1=3 → 234.", "tag": "conta-armada-emprestimo" }, { "t": "246", "feedback": "Confere as unidades: com empréstimo, 12−8=4, não 6 → 234.", "tag": "subtracao-calculo" } ],
      "explain": "12−8=4 (empréstimo), 4−1=3, 4−2=2 → 234." },
    { "q": "Em 503 − 247, as unidades pedem emprestado, mas as dezenas têm um 0. Quem empresta?", "layout": "grid",
      "options": [ { "t": "o 0 pede primeiro às centenas", "emoji": "🔗", "correct": true }, { "t": "ninguém — a conta não se faz", "feedback": "Faz-se, sim! É um empréstimo em cadeia: o 0 pede às centenas e depois empresta às unidades.", "tag": "conta-armada-emprestimo" }, { "t": "as unidades ficam na mesma", "feedback": "As unidades precisam mesmo de emprestar. O 0 pede 10 às centenas e passa 1 às unidades.", "tag": "conta-armada-emprestimo" } ],
      "explain": "É um empréstimo em cadeia: o 5 fica 4, o 0 vira 10, empresta 1 e fica 9." },
    { "q": "Quanto é 503 − 247?", "layout": "grid",
      "options": [ { "t": "256", "emoji": "🏆", "correct": true }, { "t": "266", "feedback": "Confere as dezenas: depois do empréstimo o 0 vale 9, e 9−4=5, não 6 → 256.", "tag": "subtracao-calculo" }, { "t": "344", "feedback": "Parece que viraste colunas em vez de pedir emprestado. Com o empréstimo em cadeia dá 256.", "tag": "conta-armada-emprestimo" } ],
      "explain": "13−7=6, 9−4=5, 4−2=2 → 256." },
    { "q": "Para subtrair 7,2 − 3,45, primeiro…", "layout": "grid",
      "options": [ { "t": "alinho as vírgulas e escrevo 7,20", "emoji": "📐", "correct": true }, { "t": "apago as vírgulas", "feedback": "Apagar as vírgulas estraga o valor. Alinha vírgula com vírgula e escreve 7,20.", "tag": "decimal-conta-alinhamento" }, { "t": "troco os números", "feedback": "Não se trocam! O maior (7,20) fica em cima; pedes emprestado quando uma casa não chega.", "tag": "conta-armada-emprestimo" } ],
      "explain": "Vírgula debaixo de vírgula, e um zero para igualar as casas." },
    { "q": "Como conferes que 503 − 247 = 256 está certo?", "layout": "grid",
      "options": [ { "t": "somo 256 + 247 e vejo se dá 503", "emoji": "🕵️", "correct": true }, { "t": "faço a conta outra vez igual", "feedback": "Repetir o mesmo caminho repete o mesmo erro. Confere ao contrário: 256 + 247 deve dar 503.", "tag": "conta-armada-verificar" }, { "t": "não dá para conferir", "feedback": "Dá, sim! Soma o resultado com o que tiraste: 256 + 247 = 503.", "tag": "conta-armada-verificar" } ],
      "explain": "Resultado + o que tiraste = número de cima. 256 + 247 = 503 ✓" }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-subtrair-pe-final",
  "final": true,
  "title": "Subtrair em pé",
  "questions": [
    { "q": "Numa subtração em pé, o número de que partes (o maior) fica…", "layout": "grid",
      "options": [ { "t": "em cima", "emoji": "⬆️", "correct": true }, { "t": "em baixo", "feedback": "Em baixo fica o que sai. O número maior, de que partes, fica em cima.", "tag": "conta-armada-alinhar" }, { "t": "onde calhar", "feedback": "A posição importa: o maior em cima, o que tiras em baixo.", "tag": "conta-armada-alinhar" } ],
      "explain": "Em cima fica o que tens; em baixo, o que sai." },
    { "q": "Quanto é 568 − 234?", "layout": "grid",
      "options": [ { "t": "334", "emoji": "🟢", "correct": true }, { "t": "324", "feedback": "Confere as dezenas: 6−3=3, não 2 → 334.", "tag": "subtracao-calculo" }, { "t": "344", "feedback": "Confere as dezenas: 6−3=3, não 4 → 334.", "tag": "subtracao-calculo" } ],
      "explain": "8−4=4, 6−3=3, 5−2=3 → 334, sem empréstimos." },
    { "q": "Pedir emprestado é, em blocos…", "layout": "grid",
      "options": [ { "t": "partir 1 dezena em 10 unidades", "emoji": "🔨", "correct": true }, { "t": "juntar 10 unidades numa dezena", "feedback": "Isso é o transporte da soma («vai 1»). No empréstimo é ao contrário: partes 1 dezena em 10 unidades.", "tag": "conta-armada-emprestimo" }, { "t": "deitar uma dezena fora", "feedback": "Nada se deita fora. A dezena parte-se em 10 unidades para a casa ter que chegue.", "tag": "conta-armada-emprestimo" } ],
      "explain": "A barra de dez parte-se em 10 cubinhos para a casa ter que chegue." },
    { "q": "O erro de fazer 8 − 2 quando a conta pede 2 − 8 chama-se…", "layout": "grid",
      "options": [ { "t": "virar a conta ao contrário", "emoji": "⚠️", "correct": true }, { "t": "transporte", "feedback": "Transporte é o «vai 1» da soma. Subtrair o menor ao maior na coluna é virar a conta — devias pedir emprestado.", "tag": "conta-armada-emprestimo" }, { "t": "arredondar", "feedback": "Arredondar é outra coisa. Trocar 2−8 por 8−2 é virar a conta; o certo é pedir emprestado.", "tag": "conta-armada-emprestimo" } ],
      "explain": "Subtrair o menor ao maior dentro da coluna troca a conta — pede emprestado!" },
    { "q": "Em 503 − 247, o 0 das dezenas acaba a valer…", "layout": "grid",
      "options": [ { "t": "9", "emoji": "👛", "correct": true }, { "t": "0", "feedback": "O 0 não fica 0: recebe 10 das centenas e empresta 1 às unidades, ficando 9.", "tag": "conta-armada-emprestimo" }, { "t": "10", "feedback": "Recebe 10, mas logo empresta 1 às unidades: 10 − 1 = 9.", "tag": "conta-armada-emprestimo" } ],
      "explain": "Recebe 10 das centenas e empresta 1 às unidades: 10 − 1 = 9." },
    { "q": "Quanto é 503 − 247?", "layout": "grid",
      "options": [ { "t": "256", "correct": true }, { "t": "346", "feedback": "Parece que viraste colunas. Com o empréstimo em cadeia: 13−7=6, 9−4=5, 4−2=2 → 256.", "tag": "conta-armada-emprestimo" }, { "t": "264", "feedback": "Confere as dezenas: o 0 vale 9 e 9−4=5, não 6 → 256.", "tag": "subtracao-calculo" } ],
      "explain": "Empréstimo em cadeia: 13−7=6, 9−4=5, 4−2=2 → 256." },
    { "q": "Quanto é 7,2 − 3,45?", "layout": "grid",
      "options": [ { "t": "3,75", "emoji": "🎯", "correct": true }, { "t": "4,25", "feedback": "Confere os empréstimos em 7,20 − 3,45: dá 3,75.", "tag": "decimal-conta-alinhamento" }, { "t": "3,35", "feedback": "Confere as centésimas e as décimas: 7,20 − 3,45 = 3,75.", "tag": "decimal-conta-alinhamento" } ],
      "explain": "7,20 − 3,45: dois empréstimos → 3,75." },
    { "q": "Fizeste 614 − 280 = 334. Como confirmas?", "layout": "grid",
      "options": [ { "t": "334 + 280 = 614 ✓", "emoji": "🕵️", "correct": true }, { "t": "334 − 280", "feedback": "Subtrair outra vez não confirma. Soma o resultado com o que tiraste: 334 + 280 = 614.", "tag": "conta-armada-verificar" }, { "t": "614 + 280", "feedback": "Somar ao número de cima dá um número ainda maior. Confere com 334 + 280 = 614.", "tag": "conta-armada-verificar" } ],
      "explain": "Soma o resultado com o que tiraste — tem de dar o número de cima." }
  ]
}
```
