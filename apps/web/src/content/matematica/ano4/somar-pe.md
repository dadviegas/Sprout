# Somar em pé — do simples ao «vai 1» ➕

> [!NOTE] **O que vais aprender** 👀 Vais dominar a **soma em pé** do princípio ao fim: primeiro contas calmas sem transporte, depois o famoso **«vai 1»**, o «vai 1» em cadeia, somas com **vírgulas** e até somar **três números de uma vez**. No fim, somas tudo! 💪

A soma é a operação mais amiga que existe: só **juntas**. O segredo da conta em
pé é arrumar bem as colunas e resolver **uma de cada vez**, da direita para a
esquerda. Carrega no **+** dentro de cada conta para veres o passo seguinte, e
no 🔊 para ouvires a explicação. ✨

```summary
{
  "learn": [
    "Armar a soma: algarismos alinhados pela direita",
    "O «vai 1»: quando a coluna passa de 9",
    "O «vai 1» em cadeia, coluna após coluna",
    "Somar números com vírgula (alinhar as vírgulas!)",
    "Somar três parcelas de uma vez"
  ],
  "examples": ["321 + 456", "247 + 138", "478 + 256", "12,5 + 3,75", "125 + 234 + 148"],
  "say": "Vais aprender a somar em pé: sem transporte, com o vai um, com vírgulas e até com três números de uma vez."
}
```

## Nível 1: somar sem transporte 🟢

Começamos com uma soma **calminha**: nenhuma coluna passa de 9, por isso não há
«vai 1» nenhum. Repara como cada coluna se resolve sozinha:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "add", "a": 321, "b": 456 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Unidades", "body": "1 + 6 = 7 → escrevo o 7 ✏️", "icon": "✏️" },
  { "title": "2. Dezenas", "body": "2 + 5 = 7 → escrevo o 7", "icon": "✏️" },
  { "title": "3. Centenas", "body": "3 + 4 = 7 → escrevo o 7", "icon": "✏️" },
  { "title": "4. Resultado", "body": "321 + 456 = 777 — três setes! 🎉", "icon": "🎉" }
] }
```

## Nível 2: o «vai 1» aparece 🟡

E se uma coluna der **10 ou mais**? Não cabe lá! Escreves o algarismo das
unidades e o **1 viaja** para a coluna seguinte — é o **transporte**, o famoso
«vai 1»:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "add", "a": 247, "b": 138 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Unidades", "body": "7 + 8 = 15 → escrevo o 5 e VAI 1 para as dezenas ➡️", "icon": "➡️" },
  { "title": "2. Dezenas", "body": "4 + 3 = 7, mais o 1 que veio = 8 → escrevo o 8", "icon": "✏️" },
  { "title": "3. Centenas", "body": "2 + 1 = 3 → escrevo o 3", "icon": "✏️" },
  { "title": "4. Resultado", "body": "247 + 138 = 385 🎉", "icon": "🎉" }
] }
```

> O «vai 1» não é magia: são **10 unidades a virarem 1 dezena** e a mudarem-se
> para a casa ao lado. Por isso o 1 vale sempre **dez** do que valia antes. 🧊

## Nível 3: «vai 1» atrás de «vai 1» 🟠

Às vezes o transporte **não para**: uma coluna transborda, a seguinte recebe o 1
e transborda também! Mantém a calma e leva um 1 de cada vez:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "add", "a": 478, "b": 256 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Unidades", "body": "8 + 6 = 14 → escrevo o 4 e vai 1 ➡️", "icon": "➡️" },
  { "title": "2. Dezenas", "body": "7 + 5 = 12, mais o 1 = 13 → escrevo o 3 e vai 1 OUTRA VEZ ➡️", "icon": "➡️" },
  { "title": "3. Centenas", "body": "4 + 2 = 6, mais o 1 = 7 → escrevo o 7", "icon": "✏️" },
  { "title": "4. Resultado", "body": "478 + 256 = 734 — dois transportes seguidos! 🎉", "icon": "🎉" }
] }
```

## Nível 4: somar com vírgulas 🔵

Com decimais a regra muda só num ponto: em vez de alinhar pela direita, alinhas
**as vírgulas** uma debaixo da outra. Se faltar uma casa, acrescentas um **zero**
(12,5 é o mesmo que 12,50):

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "add", "a": "12.5", "b": "3.75" } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Alinhar as vírgulas", "body": "12,5 vira 12,50 para ter as mesmas casas que 3,75 📐", "icon": "📐" },
  { "title": "2. Centésimas", "body": "0 + 5 = 5 → escrevo o 5", "icon": "✏️" },
  { "title": "3. Décimas", "body": "5 + 7 = 12 → escrevo o 2 e vai 1 ➡️", "icon": "➡️" },
  { "title": "4. Unidades e dezenas", "body": "2 + 3 + 1 = 6; e o 1 das dezenas desce sozinho", "icon": "✏️" },
  { "title": "5. Resultado", "body": "12,5 + 3,75 = 16,25 — e a vírgula desce direitinha para o resultado 🎉", "icon": "🎉" }
] }
```

> [!WARNING] **O erro mais comum: desalinhar as vírgulas!** Se encostares 12,5 e
> 3,75 à direita como se fossem inteiros, somas décimas com centésimas — e dá
> tudo errado. **Vírgula debaixo de vírgula, sempre.** E lembra-te: acrescentar
> zeros à direita da vírgula não muda o valor. 📐

## Nível 5: três parcelas de uma vez 🟣

Podes pôr **três números** (ou mais!) em pé, todos alinhados, e somar cada
coluna inteira. Só há uma novidade: a coluna pode dar um número maior — e podes
ter de levar **mais do que 1**!

```math
{ "expr": "125 + 234 + 148 = 507", "say": "cento e vinte e cinco mais duzentos e trinta e quatro mais cento e quarenta e oito é igual a quinhentos e sete" }
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Unidades", "body": "5 + 4 + 8 = 17 → escrevo o 7 e vai 1 ➡️", "icon": "➡️" },
  { "title": "2. Dezenas", "body": "2 + 3 + 4 = 9, mais o 1 = 10 → escrevo o 0 e vai 1 ➡️", "icon": "➡️" },
  { "title": "3. Centenas", "body": "1 + 2 + 1 = 4, mais o 1 = 5 → escrevo o 5", "icon": "✏️" },
  { "title": "4. Resultado", "body": "125 + 234 + 148 = 507 🎉", "icon": "🎉" }
] }
```

Se preferires, também podes somar **duas de cada vez**: primeiro 125 + 234 e
depois somar o 148 ao resultado — dá o mesmo!

```contaarmada
{
  "practice": false,
  "examples": [
    { "op": "add", "a": 125, "b": 234 },
    { "op": "add", "a": 359, "b": 148 }
  ]
}
```

> **Para saberes mais 🌱** A ordem das parcelas **não muda a soma**: 125 + 234 + 148 dá o mesmo que 148 + 125 + 234. Chama-se a **propriedade comutativa** — e os matemáticos usam-na para juntar primeiro os números que fazem dezenas certinhas! 🔄

## Agora treinas tu! ✏️

Resolve estas somas e carrega em **«Verificar»**. Se ficares com dúvidas,
carrega na **grelha** para veres a conta a resolver-se coluna a coluna:

```contaarmada
{
  "title": "A tua zona de treino",
  "practice": false,
  "examplesLayout": "rows",
  "examples": [
    { "op": "add", "a": 412, "b": 365 },
    { "op": "add", "a": 256, "b": 137 },
    { "op": "add", "a": 389, "b": 245 },
    { "op": "add", "a": 567, "b": 378 },
    { "op": "add", "a": "7.5", "b": "2.25" },
    { "op": "add", "a": "24.6", "b": "8.75" }
  ]
}
```

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-somar-pe-pratica",
  "questions": [
    { "q": "Na soma em pé, os números inteiros alinham-se…", "layout": "grid",
      "options": [ { "t": "pela direita", "emoji": "📐", "correct": true }, { "t": "pela esquerda" }, { "t": "pelo meio" } ],
      "explain": "Unidades debaixo de unidades, dezenas debaixo de dezenas." },
    { "q": "A coluna das unidades deu 15. O que escreves?", "layout": "grid",
      "options": [ { "t": "escrevo o 5 e vai 1", "emoji": "➡️", "correct": true }, { "t": "escrevo o 15 todo" }, { "t": "escrevo o 1 e deito o 5 fora" } ],
      "explain": "Escreves as unidades (5) e o 1 viaja para a coluna seguinte." },
    { "q": "Quanto é 247 + 138?", "layout": "grid",
      "options": [ { "t": "385", "emoji": "🎉", "correct": true }, { "t": "375" }, { "t": "395" } ],
      "explain": "7+8=15 (vai 1), 4+3+1=8, 2+1=3 → 385." },
    { "q": "Para somar 12,5 + 3,75, alinhas…", "layout": "grid",
      "options": [ { "t": "as vírgulas, uma debaixo da outra", "emoji": "📐", "correct": true }, { "t": "tudo à direita, como inteiros" }, { "t": "tudo à esquerda" } ],
      "explain": "Vírgula debaixo de vírgula — e 12,5 pode virar 12,50 para ajudar." },
    { "q": "Quanto é 478 + 256?", "layout": "grid",
      "options": [ { "t": "734", "emoji": "🔥", "correct": true }, { "t": "624" }, { "t": "724" } ],
      "explain": "8+6=14 (vai 1), 7+5+1=13 (vai 1), 4+2+1=7 → 734." },
    { "q": "Numa soma de 3 parcelas, a coluna deu 17. O que fazes?", "layout": "grid",
      "options": [ { "t": "escrevo o 7 e vai 1", "emoji": "➡️", "correct": true }, { "t": "escrevo o 17 todo" }, { "t": "não se pode somar 3 números" } ],
      "explain": "É igual: escreves as unidades e transportas a dezena." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-somar-pe-final",
  "final": true,
  "title": "Somar em pé",
  "questions": [
    { "q": "Por que coluna começas a somar?", "layout": "grid",
      "options": [ { "t": "pelas unidades, à direita", "emoji": "👉", "correct": true }, { "t": "pelas centenas" }, { "t": "por qualquer uma" } ],
      "explain": "Começa-se sempre à direita — é de lá que parte o «vai 1»." },
    { "q": "Quanto é 321 + 456?", "layout": "grid",
      "options": [ { "t": "777", "emoji": "🎰", "correct": true }, { "t": "767" }, { "t": "787" } ],
      "explain": "1+6=7, 2+5=7, 3+4=7 → 777, sem nenhum transporte." },
    { "q": "O «vai 1» é, na verdade…", "layout": "grid",
      "options": [ { "t": "10 unidades a virarem 1 dezena", "emoji": "🧊", "correct": true }, { "t": "um número que desaparece" }, { "t": "um enfeite da conta" } ],
      "explain": "Dez de uma casa juntam-se e mudam-se para a casa ao lado." },
    { "q": "Quanto é 478 + 256?", "layout": "grid",
      "options": [ { "t": "734", "correct": true }, { "t": "722" }, { "t": "834" } ],
      "explain": "Dois transportes seguidos: 14, depois 13, depois 7 → 734." },
    { "q": "Quanto é 12,5 + 3,75?", "layout": "grid",
      "options": [ { "t": "16,25", "emoji": "🎯", "correct": true }, { "t": "15,80" }, { "t": "13,00" } ],
      "explain": "12,50 + 3,75: 0+5=5, 5+7=12 (vai 1), 2+3+1=6 → 16,25." },
    { "q": "O erro mais perigoso ao somar decimais é…", "layout": "grid",
      "options": [ { "t": "desalinhar as vírgulas", "emoji": "⚠️", "correct": true }, { "t": "acrescentar um zero a 12,5" }, { "t": "começar pelas centésimas" } ],
      "explain": "Sem as vírgulas alinhadas, somas décimas com centésimas — tudo errado!" },
    { "q": "Quanto é 125 + 234 + 148?", "layout": "grid",
      "options": [ { "t": "507", "emoji": "🏆", "correct": true }, { "t": "497" }, { "t": "517" } ],
      "explain": "5+4+8=17 (vai 1), 2+3+4+1=10 (vai 1), 1+2+1+1=5 → 507." },
    { "q": "12,5 é o mesmo que…", "layout": "grid",
      "options": [ { "t": "12,50", "emoji": "🪄", "correct": true }, { "t": "12,05" }, { "t": "1,25" } ],
      "explain": "Zeros à direita da vírgula não mudam o valor — só ajudam a alinhar." }
  ]
}
```
