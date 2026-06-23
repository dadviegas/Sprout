# Multiplicar em pé — por 1 e por 2 algarismos ✖️

> [!NOTE] **O que vais aprender** 👀 Vais dominar a **multiplicação em pé**: primeiro por **1 algarismo**, depois o atalho das **dezenas certas** (× 20, × 30…), e por fim o grande truque das **duas linhas** para multiplicar por 2 algarismos (34 × 26!). E uma espreitadela às vírgulas. 🚀

Multiplicar é **somar muitas vezes de uma só vez**: 34 × 26 é juntar 34 vinte e
seis vezes — mas ninguém tem paciência para isso! A conta em pé faz o trabalho
por partes. Carrega no **+** dentro de cada conta para veres o passo seguinte,
e no 🔊 para ouvires. ✨

```summary
{
  "learn": [
    "Multiplicar por 1 algarismo, com transporte",
    "O atalho das dezenas: × 20 é × 2 com um zero atrás",
    "Multiplicar por 2 algarismos: as duas linhas parciais",
    "Não esquecer o zero da segunda linha!",
    "Uma espreitadela: multiplicar com vírgulas"
  ],
  "examples": ["213 × 3", "47 × 6", "34 × 20", "34 × 26"],
  "say": "Vais aprender a multiplicar em pé: por um algarismo, pelo atalho das dezenas e por dois algarismos com as duas linhas."
}
```

## Nível 1: multiplicar por 1 algarismo 🟢

O número de baixo multiplica **cada algarismo** do de cima, da direita para a
esquerda. Primeiro uma calma, sem transporte:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "mul", "a": 213, "b": 3 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Unidades", "body": "3 × 3 = 9 → escrevo o 9 ✏️", "icon": "✏️" },
  { "title": "2. Dezenas", "body": "3 × 1 = 3 → escrevo o 3", "icon": "✏️" },
  { "title": "3. Centenas", "body": "3 × 2 = 6 → escrevo o 6", "icon": "✏️" },
  { "title": "4. Resultado", "body": "213 × 3 = 639 🎉", "icon": "🎉" }
] }
```

Agora com **transporte** — funciona como na soma: escreves as unidades e o
resto **vai** para a coluna seguinte:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "mul", "a": 47, "b": 6 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Unidades", "body": "6 × 7 = 42 → escrevo o 2 e VÃO 4 ➡️", "icon": "➡️" },
  { "title": "2. Dezenas", "body": "6 × 4 = 24, mais os 4 que vieram = 28 → escrevo 28", "icon": "✏️" },
  { "title": "3. Resultado", "body": "47 × 6 = 282 🎉", "icon": "🎉" }
] }
```

> Na multiplicação, o transporte pode ser **maior do que 1** — aqui foram logo
> 4! A regra é a mesma: escreve as unidades, leva as dezenas. 🎒

## Nível 2: o atalho das dezenas certas 🟡

Multiplicar por **20, 30, 40…** é fácil de mais para armar a conta: multiplicas
pelo algarismo e **penduras um zero** no fim. É que × 20 é o mesmo que × 2 e
depois × 10:

```math
{ "expr": "34 × 20 = 34 × 2 × 10 = 680", "say": "trinta e quatro vezes vinte é trinta e quatro vezes dois, seiscentos e oitenta com o zero pendurado" }
```

```keyvalue
[
  { "k": "34 × 2", "v": "68 ✏️", "icon": "times" },
  { "k": "× 10 (pendura o zero)", "v": "680 🎯", "icon": "plus" },
  { "k": "E 34 × 200?", "v": "× 2 e penduras DOIS zeros: 6800!", "icon": "star" }
]
```

Guarda este atalho — é exatamente a **segunda linha** da conta que vem a seguir!

## Nível 3: multiplicar por 2 algarismos — as duas linhas 🟠

Para **34 × 26** partimos o 26 em **20 + 6** e fazemos **uma linha por cada
parte**: uma linha para o × 6 e outra para o × 20. No fim, **somam-se as duas**:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "mul", "a": 34, "b": 26 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Primeira linha: × 6", "body": "34 × 6 = 204 (6×4=24, escrevo 4 e vão 2; 6×3=18+2=20) ✏️", "icon": "✏️" },
  { "title": "2. Segunda linha: × 20", "body": "começo por escrever o 0 (estou a multiplicar por DEZENAS!) e depois 34 × 2 = 68 → fica 680", "icon": "0️⃣" },
  { "title": "3. Somar as linhas", "body": "204 + 680 = 884 ➕", "icon": "➕" },
  { "title": "4. Resultado", "body": "34 × 26 = 884 🎉", "icon": "🎉" }
] }
```

> [!WARNING] **A armadilha famosa: esquecer o zero da segunda linha!** A segunda
> linha multiplica pelas **dezenas** — o 2 de 26 vale **20**. Se escreveres 68
> em vez de 680, a conta dá 272 em vez de 884. Antes de multiplicar a segunda
> linha, escreve já o **0** no fim dela. 0️⃣

Mais um, para ficar afinado — repara que cada linha pode ter os seus transportes:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "mul", "a": 57, "b": 43 } ]
}
```

## Nível 4: uma espreitadela às vírgulas 🔵

E se houver vírgulas? Fazes a conta **como se não existissem** e, no fim,
**contas as casas decimais** dos dois números e pões a vírgula no resultado:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "mul", "a": "1.5", "b": "1.2" } ]
}
```

```math
{ "expr": "15 × 12 = 180  →  1,5 × 1,2 = 1,80", "say": "quinze vezes doze é cento e oitenta; como há uma casa decimal em cada número, são duas casas: um vírgula oitenta" }
```

> **Para saberes mais 🌱** As duas linhas funcionam por causa da **propriedade
> distributiva**: 34 × 26 = 34 × (20 + 6) = 34×20 + 34×6. É a mesma ideia que
> usas no cálculo mental — a conta em pé só a arruma em linhas! E para
> multiplicar por **3 algarismos**? Três linhas: a terceira começa com **dois**
> zeros. 🤓

## Agora treinas tu! ✏️

Resolve estas multiplicações e carrega em **«Verificar»**. As últimas têm duas
linhas — não te esqueças do zero!

```contaarmada
{
  "title": "A tua zona de treino",
  "practice": false,
  "examplesLayout": "rows",
  "examples": [
    { "op": "mul", "a": 123, "b": 4 },
    { "op": "mul", "a": 68, "b": 7 },
    { "op": "mul", "a": 245, "b": 6 },
    { "op": "mul", "a": 26, "b": 13 },
    { "op": "mul", "a": 42, "b": 35 },
    { "op": "mul", "a": 63, "b": 24 }
  ]
}
```

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-multiplicar-pe-pratica",
  "questions": [
    { "q": "Quanto é 47 × 6?", "layout": "grid",
      "options": [ { "t": "282", "emoji": "🎉", "correct": true }, { "t": "242", "feedback": "Confere o transporte: 6×7=42 (escreves 2, vão 4), depois 6×4=24+4=28 → 282.", "tag": "mult-calculo" }, { "t": "262", "feedback": "Quase: 6×4=24, mais o 4 que veio = 28, não 26 → 282.", "tag": "mult-calculo" } ],
      "explain": "6×7=42 (escrevo 2, vão 4), 6×4=24+4=28 → 282." },
    { "q": "Para calcular 34 × 20, podes fazer…", "layout": "grid",
      "options": [ { "t": "34 × 2 e pendurar um zero", "emoji": "0️⃣", "correct": true }, { "t": "34 + 20", "feedback": "× 20 não é somar. É 34 × 2 e depois × 10: 68 → 680.", "tag": "mult-vs-soma" }, { "t": "34 × 2 e tirar um zero", "feedback": "× 10 acrescenta um zero, não tira. 34 × 2 = 68, depois penduras um zero: 680.", "tag": "mult-calculo" } ],
      "explain": "× 20 é × 2 e depois × 10: 68 → 680." },
    { "q": "Em 34 × 26, as duas linhas são…", "layout": "grid",
      "options": [ { "t": "34 × 6 e 34 × 20", "emoji": "📋", "correct": true }, { "t": "34 × 2 e 34 × 6", "feedback": "O 2 do 26 vale 20, não 2. As linhas são 34×6 e 34×20.", "tag": "mult-distributiva" }, { "t": "34 × 26 e 26 × 34", "feedback": "Não se repete a conta trocada. Partes o 26 em 20+6: 34×6 e 34×20.", "tag": "mult-distributiva" } ],
      "explain": "Partimos o 26 em 20 + 6: uma linha para cada parte." },
    { "q": "A segunda linha de 34 × 26 começa com…", "layout": "grid",
      "options": [ { "t": "um 0, porque multiplica dezenas", "emoji": "0️⃣", "correct": true }, { "t": "um 1", "feedback": "Não é um 1. O 2 do 26 vale 20, por isso a 2.ª linha ganha um zero no fim.", "tag": "mult-zero-dezena" }, { "t": "nada de especial", "feedback": "Tem, sim: como multiplicas dezenas (20), a 2.ª linha começa com um zero.", "tag": "mult-zero-dezena" } ],
      "explain": "O 2 do 26 vale 20 — por isso a linha ganha um zero no fim." },
    { "q": "Quanto é 34 × 26?", "layout": "grid",
      "options": [ { "t": "884", "emoji": "🏆", "correct": true }, { "t": "272", "feedback": "272 é o erro de esquecer o zero da 2.ª linha (204 + 68). Com o zero: 204 + 680 = 884.", "tag": "mult-zero-dezena" }, { "t": "748", "feedback": "Confere as linhas: 34×6=204 e 34×20=680; 204 + 680 = 884.", "tag": "mult-calculo" } ],
      "explain": "204 + 680 = 884. (272 é o erro de esquecer o zero!)" },
    { "q": "Na multiplicação, o transporte pode valer mais do que 1?", "layout": "grid",
      "options": [ { "t": "sim — 6 × 7 = 42 transporta 4", "emoji": "🎒", "correct": true }, { "t": "não, é sempre 1", "feedback": "Na multiplicação o transporte pode ser maior: 6×7=42, escreves 2 e levas 4.", "tag": "conta-armada-transporte" }, { "t": "não há transporte na multiplicação", "feedback": "Há, sim: quando uma casa passa de 9, escreves as unidades e transportas as dezenas (4, 5...).", "tag": "conta-armada-transporte" } ],
      "explain": "Escreves as unidades e levas TODAS as dezenas que sobrarem." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-multiplicar-pe-final",
  "final": true,
  "title": "Multiplicar em pé",
  "questions": [
    { "q": "Quanto é 213 × 3?", "layout": "grid",
      "options": [ { "t": "639", "emoji": "🟢", "correct": true }, { "t": "626", "feedback": "Confere as dezenas: 3×1=3, não 2. 3×3=9, 3×1=3, 3×2=6 → 639.", "tag": "mult-calculo" }, { "t": "649", "feedback": "Confere as dezenas: 3×1=3, não 4 → 639.", "tag": "mult-calculo" } ],
      "explain": "3×3=9, 3×1=3, 3×2=6 → 639, sem transporte." },
    { "q": "Em 47 × 6, nas unidades dá 42. O que escreves?", "layout": "grid",
      "options": [ { "t": "escrevo o 2 e vão 4", "emoji": "➡️", "correct": true }, { "t": "escrevo o 42 todo", "feedback": "Só cabe um algarismo por coluna: escreves o 2 e transportas o 4.", "tag": "conta-armada-transporte" }, { "t": "escrevo o 4 e vai 2", "feedback": "Ao contrário: as unidades (2) ficam, as dezenas (4) é que viajam.", "tag": "conta-armada-transporte" } ],
      "explain": "Escreves as unidades (2) e transportas as dezenas (4)." },
    { "q": "Quanto é 34 × 200?", "layout": "grid",
      "options": [ { "t": "6800", "emoji": "0️⃣", "correct": true }, { "t": "680", "feedback": "680 só pendura um zero (× 20). × 200 pendura DOIS zeros: 68 → 6800.", "tag": "mult-zero-dezena" }, { "t": "68 000", "feedback": "Penduraste três zeros (× 2000). × 200 são dois zeros: 6800.", "tag": "mult-zero-dezena" } ],
      "explain": "34 × 2 = 68, e penduras DOIS zeros → 6800." },
    { "q": "Porque é que 34 × 26 se faz em duas linhas?", "layout": "grid",
      "options": [ { "t": "porque 26 = 20 + 6, uma linha por parte", "emoji": "🧩", "correct": true }, { "t": "para a conta ficar mais bonita", "feedback": "Não é estética: 26 = 20 + 6, e fazes uma linha para cada parte (distributiva).", "tag": "mult-distributiva" }, { "t": "porque 34 tem dois algarismos", "feedback": "É o número de baixo que manda as linhas: 26 parte-se em 20 + 6, uma linha por parte.", "tag": "mult-distributiva" } ],
      "explain": "É a distributiva: 34×26 = 34×20 + 34×6." },
    { "q": "Se te esqueceres do zero da segunda linha em 34 × 26, a conta dá…", "layout": "grid",
      "options": [ { "t": "272 — errado!", "emoji": "⚠️", "correct": true }, { "t": "884 na mesma", "feedback": "Sem o zero não dá 884: ficaria 204 + 68 = 272. O zero faz falta!", "tag": "mult-zero-dezena" }, { "t": "8840", "feedback": "8840 é dez vezes a mais. Sem o zero o erro dá 272; com ele, o certo é 884.", "tag": "mult-zero-dezena" } ],
      "explain": "204 + 68 = 272 em vez de 204 + 680 = 884. O zero faz falta!" },
    { "q": "Quanto é 34 × 26?", "layout": "grid",
      "options": [ { "t": "884", "correct": true }, { "t": "864", "feedback": "Confere a soma das linhas: 204 + 680 = 884, não 864.", "tag": "mult-calculo" }, { "t": "904", "feedback": "Confere as linhas: 34×6=204 e 34×20=680; somam 884.", "tag": "mult-calculo" } ],
      "explain": "Linha do 6: 204. Linha do 20: 680. Soma: 884." },
    { "q": "Para 1,5 × 1,2, fazes 15 × 12 = 180 e depois…", "layout": "grid",
      "options": [ { "t": "contas 2 casas decimais: 1,80", "emoji": "🔢", "correct": true }, { "t": "deixas 180", "feedback": "Faltou a vírgula! Cada fator tem 1 casa decimal: 1+1=2 casas → 1,80.", "tag": "decimal-multiplicar-casas" }, { "t": "pões a vírgula ao calhas", "feedback": "A vírgula tem regra: somas as casas decimais dos fatores (1+1=2) → 1,80.", "tag": "decimal-multiplicar-casas" } ],
      "explain": "Uma casa decimal em cada fator: 1 + 1 = 2 casas no resultado." },
    { "q": "Multiplicar 34 × 26 é o mesmo que…", "layout": "grid",
      "options": [ { "t": "somar 34 vinte e seis vezes", "emoji": "➕", "correct": true }, { "t": "somar 34 com 26", "feedback": "Somar 34 + 26 dá só 60. Multiplicar é somar o 34 vinte e seis vezes.", "tag": "mult-vs-soma" }, { "t": "dividir 34 por 26", "feedback": "Dividir é repartir, o contrário. Multiplicar 34×26 é somar 34 vinte e seis vezes.", "tag": "mult-vs-soma" } ],
      "explain": "A multiplicação é uma soma repetida — a conta em pé só a encurta!" }
  ]
}
```
