# Números racionais não negativos 🔟

> [!NOTE] **O que vais aprender** 👀 Vais perceber que **frações** e **números decimais** são a mesma família — os **números racionais** — ler as casas (décimas, centésimas, milésimas), **converter** entre fração e decimal, **arredondar**, e **somar, subtrair e multiplicar** com vírgulas alinhadas! 💶📏

Já viste decimais no 4.º ano. Agora vais subir um degrau: descobrir que uma **fração** e um **número com vírgula** são o **mesmo número** vestido de maneiras diferentes, e operar com eles à vontade. A chave de tudo? **Alinhar a vírgula** e pensar em **dinheiro**. 🤑

## Tudo a mesma família: os racionais 👨‍👩‍👧

Um **número racional** é qualquer número que se pode escrever como uma **fração**. E todo o decimal «certinho» também é uma fração! Por isso **3/4** e **0,75** são o **mesmo** número.

```compare
[
  { "title": "Vestido de fração", "rows": [
    { "label": "metade", "value": "1/2" },
    { "label": "três quartos", "value": "3/4" },
    { "label": "uma décima", "value": "1/10" }
  ] },
  { "title": "Vestido de decimal", "highlight": true, "badge": "o mesmo!", "rows": [
    { "label": "metade", "value": "0,5" },
    { "label": "três quartos", "value": "0,75" },
    { "label": "uma décima", "value": "0,1" }
  ] }
]
```

```fraction
{ "parts": 4, "filled": 3, "shape": "pie", "title": "3/4 = 0,75", "color": "accent" }
```

## As casas decimais 🔢

Depois da vírgula, cada lugar tem um nome — é o inteiro partido em 10, em 100, em 1000… Pensa sempre em **1 euro repartido em moedas**! 💶

```keyvalue
[
  { "k": "Parte inteira", "v": "antes da vírgula — euros inteiros 💶" },
  { "k": "Décimas (1.ª casa)", "v": "0,3 = 3 décimas = 3/10 🔟" },
  { "k": "Centésimas (2.ª casa)", "v": "0,07 = 7 centésimas = 7/100 💯" },
  { "k": "Milésimas (3.ª casa)", "v": "0,005 = 5 milésimas = 5/1000 🔬" }
]
```

> O número **2,375** lê-se «dois vírgula trezentos e setenta e cinco» e quer dizer 2 inteiros + 3 décimas + 7 centésimas + 5 milésimas. 🎤

## Frações decimais → vírgula num instante ⚡

Quando o denominador é **10, 100 ou 1000**, passar a decimal é só **contar zeros = casas depois da vírgula**!

```keyvalue
[
  { "k": "7/10", "v": "1 zero → 1 casa → 0,7 🔟" },
  { "k": "25/100", "v": "2 zeros → 2 casas → 0,25 💯" },
  { "k": "8/1000", "v": "3 zeros → 3 casas → 0,008 🔬" }
]
```

E as frações «normais»? Pensa em **dinheiro** ou faz a **divisão** numerador ÷ denominador:

```math
{ "expr": "3/4 = 0,75", "say": "três quartos é igual a zero vírgula setenta e cinco" }
```

> **Truque:** 1 euro = 100 cêntimos. **1/2** → 100÷2 = 50 → **0,5**; **1/4** → 100÷4 = 25 → **0,25**; **3/4** → três de 0,25 = **0,75**. O que sobra de 1 euro é a tua vírgula! 🤑

## Comparar decimais — casa a casa 🤏

Para ver qual é maior, compara **lugar a lugar**, da esquerda para a direita — primeiro a parte inteira, depois as décimas, depois as centésimas…

```steps
[
  { "title": "Comparar 0,5 e 0,45", "body": "parte inteira igual (0 e 0) → olha as décimas", "icon": "🔎" },
  { "title": "Décimas", "body": "5 décimas contra 4 décimas → 5 > 4!", "icon": "✋" },
  { "title": "Conclusão", "body": "0,5 > 0,45 (não te deixes enganar pelo «45» ser comprido!) 🏆", "icon": "🏆" }
]
```

> [!WARNING] **0,5 é MAIOR que 0,45!** Mais algarismos não quer dizer maior. Para comparar bem, podes pensar **0,5 = 0,50** e aí vês logo: 50 centésimas > 45 centésimas. 🚦

```numberline
{ "min": 0, "max": 1, "start": 0.5, "step": 0.1, "title": "0,5 fica a meio entre 0 e 1" }
```

## Somar e subtrair decimais — vírgula debaixo de vírgula 📐

O **único** segredo é **alinhar as vírgulas** (e os algarismos por baixo dos do mesmo valor). Podes acrescentar zeros à direita para ficarem do mesmo tamanho — não mudam o valor!

```steps
[
  { "title": "Somar 2,5 + 1,75", "body": "alinha: 2,50 + 1,75 (pus um zero em 2,5 → 2,50)", "icon": "📐" },
  { "title": "Soma como sempre", "body": "começa da direita: 0+5=5… até ao fim", "icon": "🧮" },
  { "title": "Desce a vírgula", "body": "a vírgula do resultado fica na mesma coluna: 4,25 ✅", "icon": "✅" }
]
```

```math
{ "expr": "2,5 + 1,75 = 4,25", "say": "dois vírgula cinco mais um vírgula setenta e cinco é igual a quatro vírgula vinte e cinco" }
```

## Multiplicar por 10, 100, 1000 🚀

Este truque é mágico: a vírgula **anda para a direita** tantas casas quantos os zeros! (E para a esquerda, se divides.)

```keyvalue
[
  { "k": "× 10", "v": "vírgula anda 1 casa à direita: 3,4 × 10 = 34 ➡️" },
  { "k": "× 100", "v": "anda 2 casas: 3,4 × 100 = 340 ➡️➡️" },
  { "k": "÷ 10", "v": "anda 1 casa à esquerda: 34 ÷ 10 = 3,4 ⬅️" }
]
```

## Arredondar — quando o «mais ou menos» chega 🎯

**Arredondar** é dar um valor aproximado, mais fácil de dizer. Olhas para o algarismo **a seguir** à casa que queres: se for **5 ou mais, sobe**; se for **menos de 5, fica**.

```steps
[
  { "title": "Arredondar 3,47 às décimas", "body": "queres parar na 1.ª casa (décimas): 3,4…", "icon": "🔎" },
  { "title": "Espreita o vizinho", "body": "a seguir está o 7 → é 5 ou mais → SOBE!", "icon": "👀" },
  { "title": "Resultado", "body": "3,47 arredondado às décimas ≈ 3,5 🎯", "icon": "🎯" }
]
```

## Um exemplo passo a passo 🔍

*«A Rita comprou um livro por 7,50 € e uma caneta por 1,75 €. Pagou com uma nota de 10 €. Quanto recebeu de troco?»* Vamos resolver com calma. 💶

```steps
[
  { "title": "1. Quanto gastou?", "body": "alinha as vírgulas: 7,50 + 1,75 = 9,25 € ➕", "icon": "🛒" },
  { "title": "2. Quanto deu?", "body": "uma nota de 10,00 € 💶", "icon": "💶" },
  { "title": "3. O troco é a diferença", "body": "10,00 − 9,25 = 0,75 € ➖", "icon": "🧮" },
  { "title": "4. Resposta", "body": "a Rita recebeu 0,75 € de troco (75 cêntimos)! ✅", "icon": "🎉" }
]
```

> **Truque:** com dinheiro, escreve **sempre as duas casas** (os cêntimos): 7,5 € → **7,50 €**, 10 € → **10,00 €**. Com as vírgulas alinhadas, a conta sai sozinha! 🤑

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Frações, decimais e arredondar", "items": [
  { "front": "3/4 em decimal", "back": "0,75", "options": ["0,34", "0,7"] },
  { "front": "1/2 em decimal", "back": "0,5", "options": ["0,2", "0,25"] },
  { "front": "Qual é maior: 0,5 ou 0,45?", "back": "0,5", "options": ["0,45", "são iguais"] },
  { "front": "3,4 × 10", "back": "34", "options": ["3,4", "340"] },
  { "front": "Em 0,07, o 7 está nas…", "back": "centésimas", "options": ["décimas", "milésimas"] },
  { "front": "3,47 arredondado às décimas", "back": "3,5", "options": ["3,4", "4"] },
  { "front": "2,5 + 1,75", "back": "4,25", "options": ["3,25", "4,2"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Algumas frações dão **dízimas infinitas periódicas** — decimais que nunca acabam, com um pedaço a repetir-se! **1/3 = 0,333…** (o 3 para sempre) e **1/7 = 0,142857142857…** (repete «142857»!). Escreve-se com um tracinho por cima da parte que repete. Esses números **também** são racionais, porque vêm de uma fração. 🤯

## Vamos praticar 🎈

```quiz
{
  "id": "mat-5-decimais-pratica",
  "questions": [
    { "q": "Quanto é 3/4 em decimal?", "layout": "grid",
      "options": [ { "t": "0,75", "emoji": "💶", "correct": true }, { "t": "0,34", "feedback": "Não juntes 3 e 4 depois da vírgula. 3/4 = 3 ÷ 4 = 0,75.", "tag": "fracao-leitura-junta" }, { "t": "0,7", "feedback": "0,7 são sete décimas. 3/4 são 75 centésimas: 0,75.", "tag": "decimal-decimas-centesimas" } ],
      "explain": "Três fatias de 0,25 dão 0,75 (ou 3 ÷ 4)." },
    { "q": "Em 0,07, o 7 está nas…", "layout": "grid",
      "options": [ { "t": "centésimas", "emoji": "💯", "correct": true }, { "t": "décimas", "feedback": "Em 0,07 há zero décimas e 7 centésimas. O 7 está na segunda casa.", "tag": "decimal-decimas-centesimas" }, { "t": "milésimas", "feedback": "Milésimas são a terceira casa. Aqui o 7 está na segunda: centésimas.", "tag": "decimal-casas-vs-inteiros" } ],
      "explain": "A 2.ª casa depois da vírgula são as centésimas." },
    { "q": "Qual é maior?", "layout": "grid",
      "options": [ { "t": "0,5", "emoji": "🏆", "correct": true }, { "t": "0,45", "feedback": "0,5 = 0,50. Cinquenta centésimas é maior que quarenta e cinco.", "tag": "decimal-comparacao" }, { "t": "0,09", "feedback": "0,09 são nove centésimas. 0,5 são cinquenta centésimas.", "tag": "decimal-decimas-centesimas" } ],
      "explain": "0,5 = 0,50 = 50 centésimas, mais que 45 e que 9." },
    { "q": "Quanto é 3,4 × 10?", "layout": "grid",
      "options": [ { "t": "34", "emoji": "🚀", "correct": true }, { "t": "3,4", "feedback": "Multiplicar por 10 muda o valor: a vírgula anda uma casa para a direita.", "tag": "decimal-multiplicar-10" }, { "t": "340", "feedback": "340 seria andar a vírgula duas casas. ×10 anda só uma: 34.", "tag": "decimal-multiplicar-10" } ],
      "explain": "× 10: a vírgula anda 1 casa para a direita." },
    { "q": "Quanto é 2,5 + 1,75?", "layout": "grid",
      "options": [ { "t": "4,25", "emoji": "📐", "correct": true }, { "t": "3,25", "feedback": "Alinha as vírgulas: 2,50 + 1,75. As centésimas também contam.", "tag": "decimal-conta-alinhamento" }, { "t": "4,2", "feedback": "Faltou a casa das centésimas: 2,50 + 1,75 = 4,25.", "tag": "decimal-conta-alinhamento" } ],
      "explain": "Alinha as vírgulas (2,50 + 1,75) = 4,25." },
    { "q": "7/10 escreve-se…", "layout": "grid",
      "options": [ { "t": "0,7", "emoji": "🔟", "correct": true }, { "t": "7,0", "feedback": "7,0 são sete inteiros. 7/10 é menor que 1: 0,7.", "tag": "decimal-parte-inteira" }, { "t": "0,07", "feedback": "0,07 são sete centésimas. 7/10 são sete décimas: 0,7.", "tag": "decimal-decimas-centesimas" } ],
      "explain": "Denominador 10 → 1 casa decimal → 0,7." },
    { "q": "3,47 arredondado às décimas dá…", "layout": "grid",
      "options": [ { "t": "3,5", "emoji": "🎯", "correct": true }, { "t": "3,4", "feedback": "O algarismo seguinte é 7, que manda subir. 3,47 às décimas fica 3,5.", "tag": "decimal-arredondamento" }, { "t": "4,0", "feedback": "Estás a arredondar às décimas, não às unidades. O resultado fica 3,5.", "tag": "decimal-arredondamento-casa" } ],
      "explain": "O vizinho é 7 (≥5) → sobe: 3,5." },
    { "q": "Uma fração e um decimal que valem o mesmo são da família dos…", "layout": "grid",
      "options": [ { "t": "números racionais", "emoji": "👨‍👩‍👧", "correct": true }, { "t": "números primos", "feedback": "Primos são inteiros com dois divisores. Frações e decimais equivalentes são racionais.", "tag": "racional-conceito" }, { "t": "ângulos", "feedback": "Ângulos medem aberturas. Frações e decimais equivalentes são números racionais.", "tag": "racional-conceito" } ],
      "explain": "Racional = número que se escreve como fração; o decimal certinho também." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-decimais-final",
  "final": true,
  "title": "Números racionais não negativos",
  "questions": [
    { "q": "0,5 é o mesmo que…", "layout": "grid",
      "options": [ { "t": "1/2", "emoji": "🍰", "correct": true }, { "t": "1/4", "feedback": "1/4 vale 0,25. 0,5 é metade: 1/2.", "tag": "fracao-metade-quarto" }, { "t": "1/5", "feedback": "1/5 vale 0,2. 0,5 é metade: 1/2.", "tag": "fracao-decimal-equivalencia" } ],
      "explain": "Metade: 0,5 = 1/2." },
    { "q": "Em 2,375, o 5 está nas…", "layout": "grid",
      "options": [ { "t": "milésimas", "emoji": "🔬", "correct": true }, { "t": "centésimas", "feedback": "Centésimas são a segunda casa. Em 2,375, o 5 está na terceira: milésimas.", "tag": "decimal-casas-vs-inteiros" }, { "t": "décimas", "feedback": "Décimas são a primeira casa depois da vírgula. O 5 está na terceira casa.", "tag": "decimal-casas-vs-inteiros" } ],
      "explain": "1.ª décimas, 2.ª centésimas, 3.ª milésimas → o 5 é milésimas." },
    { "q": "Qual destes é maior?", "layout": "grid",
      "options": [ { "t": "0,6", "emoji": "🏆", "correct": true }, { "t": "0,59", "feedback": "0,6 = 0,60. Sessenta centésimas é maior que cinquenta e nove.", "tag": "decimal-comparacao" }, { "t": "0,06", "feedback": "0,06 são seis centésimas. 0,6 são sessenta centésimas.", "tag": "decimal-decimas-centesimas" } ],
      "explain": "0,6 = 0,60 = 60 centésimas, mais que 59 e que 6." },
    { "q": "Quanto é 0,25 × 100?", "layout": "grid",
      "options": [ { "t": "25", "emoji": "🚀", "correct": true }, { "t": "2,5", "feedback": "×100 anda duas casas para a direita, não só uma. 0,25 vira 25.", "tag": "decimal-multiplicar-100" }, { "t": "250", "feedback": "250 seria andar uma casa a mais. 0,25 × 100 = 25.", "tag": "decimal-multiplicar-100" } ],
      "explain": "× 100: a vírgula anda 2 casas à direita → 25." },
    { "q": "Quanto é 5,5 − 2,75?", "layout": "grid",
      "options": [ { "t": "2,75", "emoji": "📐", "correct": true }, { "t": "3,25", "feedback": "Alinha 5,50 − 2,75. Não subtraias só as partes inteiras.", "tag": "decimal-conta-alinhamento" }, { "t": "2,8", "feedback": "2,8 é arredondado demais. Mantém centésimas: 2,75.", "tag": "decimal-conta-alinhamento" } ],
      "explain": "Alinha (5,50 − 2,75) = 2,75." },
    { "q": "25/100 em decimal é…", "layout": "grid",
      "options": [ { "t": "0,25", "emoji": "💯", "correct": true }, { "t": "2,5", "feedback": "25/100 é menor que 1. Com denominador 100, ficam duas casas: 0,25.", "tag": "decimal-parte-inteira" }, { "t": "0,025", "feedback": "0,025 são milésimas. 25/100 tem duas casas: 0,25.", "tag": "decimal-casas-vs-inteiros" } ],
      "explain": "Denominador 100 → 2 casas → 0,25." },
    { "q": "8,62 arredondado às unidades dá…", "layout": "grid",
      "options": [ { "t": "9", "emoji": "🎯", "correct": true }, { "t": "8", "feedback": "O algarismo das décimas é 6, por isso arredonda para cima: 9.", "tag": "decimal-arredondamento" }, { "t": "8,6", "feedback": "A pergunta pede às unidades. O resultado não deve ter vírgula: 9.", "tag": "decimal-arredondamento-casa" } ],
      "explain": "O vizinho a seguir às unidades é 6 (≥5) → sobe para 9." },
    { "q": "A Rita gastou 9,25 € e pagou com 10 €. O troco é…", "layout": "grid",
      "options": [ { "t": "0,75 €", "emoji": "💶", "correct": true }, { "t": "1,25 €", "feedback": "O troco é 10,00 − 9,25. De 9,25 até 10 faltam 0,75 €.", "tag": "dinheiro-troco" }, { "t": "0,25 €", "feedback": "0,25 € leva de 9,25 a 9,50. Ainda falta até 10,00: o troco é 0,75 €.", "tag": "dinheiro-troco" } ],
      "explain": "10,00 − 9,25 = 0,75 €." },
    { "q": "1/3 = 0,333… é uma…", "layout": "grid",
      "options": [ { "t": "dízima infinita periódica", "emoji": "🤯", "correct": true }, { "t": "número inteiro", "feedback": "Inteiro não tem parte decimal. 0,333... é decimal infinito periódico.", "tag": "decimal-dizima" }, { "t": "fração imprópria", "feedback": "Fração imprópria tem numerador maior que denominador. 0,333... é dízima periódica.", "tag": "decimal-dizima" } ],
      "explain": "Os 3 repetem-se para sempre: dízima infinita periódica." }
  ]
}
```
