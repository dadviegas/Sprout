# Os números até 10 000 🏔️

> [!NOTE] **O que vais aprender** 👀 Vais conhecer a gaveta dos **milhares**, ler e decompor números grandes como o 4821, contar de **1000 em 1000** até aos **10 000**, comparar e até **arredondar à centena**. Os números grandes vão deixar de te assustar! 💪

Já dominas os números até 1000 e as três gavetas (centenas, dezenas, unidades). Agora a cómoda ganha **mais uma gaveta à esquerda**: a dos **milhares**! E o melhor: as regras são exatamente as mesmas — só há mais uma casa. 🗄️

## A gaveta nova: o milhar 🗄️

```keyvalue
[
  { "k": "Unidade (U)", "v": "1 🟦" },
  { "k": "Dezena (D)", "v": "10 unidades 🔟" },
  { "k": "Centena (C)", "v": "10 dezenas = 100 💯" },
  { "k": "Milhar (M)", "v": "10 centenas = 1000! 🏔️" }
]
```

No número **4821**, cada algarismo está na sua gaveta:

> **4** milhares + **8** centenas + **2** dezenas + **1** unidade = **4821** 🎉

```math
{ "expr": "4821 = 4000 + 800 + 20 + 1", "say": "quatro mil oitocentos e vinte e um é igual a quatro mil mais oitocentos mais vinte mais um" }
```

## Contar de 1000 em 1000 🐸

Dez saltos de milhar e chegas aos **10 000** — dez mil! Usa os botões e ouve cada salto:

```numberline
{ "min": 0, "max": 10000, "start": 0, "step": 1000, "title": "Saltos de 1000 em 1000 até aos 10 000" }
```

Ler estes números é fácil: dizes os milhares, a palavra **«mil»**, e depois o resto como já sabes:

```keyvalue
[
  { "k": "2000", "v": "dois mil" },
  { "k": "3500", "v": "três mil e quinhentos" },
  { "k": "4821", "v": "quatro mil oitocentos e vinte e um" },
  { "k": "7006", "v": "sete mil e seis (gavetas das centenas e dezenas vazias!)" },
  { "k": "10 000", "v": "dez mil 🏔️" }
]
```

## Compor e decompor 🧩

Decompor é igualzinho ao que já fazias — só com uma parcela a mais:

```steps
[
  { "title": "Escreve o número", "body": "Vamos decompor o 6543." },
  { "title": "Separa as gavetas", "body": "6 milhares, 5 centenas, 4 dezenas, 3 unidades." },
  { "title": "Escreve o valor de cada uma", "body": "6000 + 500 + 40 + 3." },
  { "title": "Confirma", "body": "6000 + 500 + 40 + 3 = 6543 ✅" }
]
```

E compor é o caminho contrário: 3000 + 200 + 70 + 9 = **3279**. 🛠️

## Comparar números grandes ⚖️

A regra é a de sempre: começa pela gaveta da **esquerda** — agora, os milhares!

```steps
[
  { "title": "5230 ou 4980?", "body": "5 milhares contra 4 milhares → 5230 > 4980 (mesmo o 980 a parecer grande!) 🏆", "icon": "📦" },
  { "title": "3642 ou 3675?", "body": "milhares empatam (3 e 3), centenas empatam (6 e 6) → dezenas: 7 > 4, logo 3675 é maior 🔍", "icon": "🔍" },
  { "title": "999 ou 1000?", "body": "o 999 nem tem milhares — o 1000 ganha! 💪", "icon": "💪" }
]
```

## Arredondar à centena 🎯

**Arredondar** é trocar um número por um vizinho redondo, mais fácil de usar. Para arredondar à centena, pergunta: «de que centena está mais perto?»

```steps
[
  { "title": "Arredonda 2463", "body": "está entre 2400 e 2500. Olha para as dezenas: 63 já passou do meio (50) → vai para 2500 🎯", "icon": "🎯" },
  { "title": "Arredonda 7820", "body": "está entre 7800 e 7900. As dezenas (20) não chegam ao meio → fica em 7800 ⬇️", "icon": "⬇️" },
  { "title": "E mesmo a meio?", "body": "se acaba em 50 (como 3150), a regra é subir → 3200 ⬆️", "icon": "⬆️" }
]
```

> Arredondar serve para **estimar**: numa loja, 2463 € é «mais ou menos 2500 €» — muito mais fácil para pensar depressa! 🛒

## Um exemplo passo a passo 🔍

O estádio da cidade recebeu **3 milhares**, **7 centenas** e **5 dezenas** de adeptos. Quantos foram ao jogo? ⚽

```steps
[
  { "title": "1. Vê os dados", "body": "3 milhares, 7 centenas, 5 dezenas, 0 unidades", "icon": "📋" },
  { "title": "2. Dá-lhes valor", "body": "3000 + 700 + 50", "icon": "🔢" },
  { "title": "3. Compõe o número", "body": "3000 + 700 + 50 = 3750 ✏️", "icon": "✏️" },
  { "title": "4. Responde", "body": "foram 3750 adeptos — lê-se «três mil setecentos e cinquenta» ✅", "icon": "🎉" }
]
```

> **Truque:** conta os algarismos! **4 algarismos** = começa nos **milhares**. E o zero continua a ser o guarda das gavetas vazias: 7006 tem 7 milhares, **0** centenas, **0** dezenas e 6 unidades. 🙂

> [!TIP] **Para saberes mais** 🌱 Em Portugal, os números grandes escrevem-se com um **espaço** a separar os milhares: 10 000, 25 300. E o jogo das gavetas nunca pára: 10 milhares fazem uma **dezena de milhar**, 100 fazem uma **centena de milhar**… até chegar ao **milhão**, que vais conquistar no 4.º ano! 🚀

## Vamos praticar 🎈

```quiz
{
  "id": "mat-3-numeros-10000-pratica",
  "questions": [
    { "q": "Quantas centenas tem 1 milhar?", "layout": "grid",
      "options": [ { "t": "10", "correct": true }, { "t": "100" }, { "t": "1000" } ],
      "explain": "1 milhar = 10 centenas = 1000 unidades." },
    { "q": "No número 4821, o 4 vale…", "layout": "grid",
      "options": [ { "t": "4000", "emoji": "🏔️", "correct": true }, { "t": "400" }, { "t": "4" } ],
      "explain": "O 4 está na gaveta dos milhares: vale 4000." },
    { "q": "A contar de 1000 em 1000, o que vem depois do 6000?", "layout": "grid",
      "options": [ { "t": "7000", "correct": true }, { "t": "6001" }, { "t": "6100" } ],
      "explain": "…5000, 6000, 7000 — salto de milhar em milhar!" },
    { "q": "Decompõe o 6543.", "layout": "grid",
      "options": [ { "t": "6000 + 500 + 40 + 3", "correct": true }, { "t": "600 + 50 + 4 + 3" }, { "t": "6000 + 50 + 400 + 3" } ],
      "explain": "6 milhares + 5 centenas + 4 dezenas + 3 unidades." },
    { "q": "Quanto é 3000 + 200 + 70 + 9?", "layout": "grid",
      "options": [ { "t": "3279", "correct": true }, { "t": "3729" }, { "t": "32 709" } ],
      "explain": "Compor: 3000 + 200 + 70 + 9 = 3279." },
    { "q": "Como se lê o número 3500?", "layout": "grid",
      "options": [ { "t": "três mil e quinhentos", "correct": true }, { "t": "trezentos e cinquenta" }, { "t": "trinta e cinco mil" } ],
      "explain": "3 milhares e 5 centenas: três mil e quinhentos." },
    { "q": "Qual é o número maior?", "layout": "grid",
      "options": [ { "t": "5230", "correct": true }, { "t": "4980" }, { "t": "999" } ],
      "explain": "Começa pelos milhares: 5 ganha a 4 (e o 999 nem tem milhares)." },
    { "q": "Arredonda 2463 à centena.", "layout": "grid",
      "options": [ { "t": "2500", "emoji": "🎯", "correct": true }, { "t": "2400" }, { "t": "2000" } ],
      "explain": "2463 está entre 2400 e 2500; o 63 passa do meio, sobe para 2500." },
    { "q": "No número 7006, as centenas…", "layout": "grid",
      "options": [ { "t": "estão vazias (0)", "correct": true }, { "t": "têm 7" }, { "t": "têm 6" } ],
      "explain": "7006 = 7 milhares + 0 centenas + 0 dezenas + 6 unidades." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-3-numeros-10000-final",
  "final": true,
  "title": "Os números até 10 000",
  "questions": [
    { "q": "Um milhar é o mesmo que…", "layout": "grid",
      "options": [ { "t": "10 centenas", "emoji": "🏔️", "correct": true }, { "t": "10 dezenas" }, { "t": "100 milhares" } ],
      "explain": "10 centenas de 100 fazem 1 milhar = 1000." },
    { "q": "5872 é igual a…", "layout": "grid",
      "options": [ { "t": "5000 + 800 + 70 + 2", "correct": true }, { "t": "500 + 80 + 7 + 2" }, { "t": "5000 + 80 + 700 + 2" } ],
      "explain": "5 milhares + 8 centenas + 7 dezenas + 2 unidades." },
    { "q": "Quanto vale 2 milhares + 0 centenas + 4 dezenas + 6 unidades?", "layout": "grid",
      "options": [ { "t": "2046", "correct": true }, { "t": "246" }, { "t": "2460" } ],
      "explain": "2000 + 0 + 40 + 6 = 2046 — o zero guarda a gaveta das centenas." },
    { "q": "A contar de 1000 em 1000, o que vem depois do 9000?", "layout": "grid",
      "options": [ { "t": "10 000", "emoji": "🎉", "correct": true }, { "t": "9001" }, { "t": "9100" } ],
      "explain": "…8000, 9000, 10 000 — dez mil!" },
    { "q": "Como se lê o número 4821?", "layout": "grid",
      "options": [ { "t": "quatro mil oitocentos e vinte e um", "correct": true }, { "t": "quarenta e oito mil e vinte e um" }, { "t": "quatrocentos e oitenta e dois" } ],
      "explain": "4 milhares + 821: quatro mil oitocentos e vinte e um." },
    { "q": "Qual o sinal certo: 3642 __ 3675?", "layout": "grid",
      "options": [ { "t": "< (menor que)", "correct": true }, { "t": "> (maior que)" }, { "t": "= (igual a)" } ],
      "explain": "Milhares e centenas empatam; nas dezenas, 4 < 7, logo 3642 < 3675." },
    { "q": "Arredonda 7820 à centena.", "layout": "grid",
      "options": [ { "t": "7800", "correct": true }, { "t": "7900" }, { "t": "8000" } ],
      "explain": "As dezenas (20) não chegam ao meio (50): fica 7800." },
    { "q": "Arredonda 3150 à centena.", "layout": "grid",
      "options": [ { "t": "3200", "emoji": "⬆️", "correct": true }, { "t": "3100" }, { "t": "3000" } ],
      "explain": "Mesmo a meio (acaba em 50) → a regra manda subir: 3200." },
    { "q": "Coloca por ordem crescente: 4980, 5230, 4899.", "layout": "grid",
      "options": [ { "t": "4899, 4980, 5230 ⬆️", "correct": true }, { "t": "5230, 4980, 4899" }, { "t": "4980, 4899, 5230" } ],
      "explain": "Crescente: 4899 < 4980 < 5230." }
  ]
}
```
