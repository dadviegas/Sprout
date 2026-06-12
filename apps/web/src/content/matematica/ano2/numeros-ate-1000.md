# Os números até 1000 🚀

> [!NOTE] **O que vais aprender** 👀 Vais conhecer a **centena** (uma caixa gigante com 10 dezenas lá dentro!), contar de **100 em 100** até ao **1000**, compor e decompor números como o 342 e descobrir qual é o maior. 💪

Já dominas os números até 100. E lembras-te do segredo: 10 dezenas juntas fazem **uma centena** — o 100! Agora o jogo continua: com as centenas, chegas ao **1000** em dez saltos. Vamos lá! 🏃

## A centena: a caixa gigante 📦

As caixas dos números crescem sempre da mesma maneira — 10 pequenas fazem 1 grande:

```keyvalue
[
  { "k": "Unidade (U)", "v": "1 bolinha solta 🔵" },
  { "k": "Dezena (D)", "v": "10 unidades = uma caixa cheia 📦" },
  { "k": "Centena (C)", "v": "10 dezenas = uma caixa GIGANTE com 100! 🏗️" },
  { "k": "1000", "v": "10 centenas — o milhar! 🎉" }
]
```

## Contar de 100 em 100 🐸

Salta de centena em centena, como uma rã de pedra em pedra: **100, 200, 300… 1000**! Usa os botões e ouve cada salto:

```numberline
{ "min": 0, "max": 1000, "start": 0, "step": 100, "title": "Saltos de 100 em 100 até ao 1000" }
```

São só **10 saltos** até ao mil — e cada salto tem nome:

```compare
[
  { "title": "100 a 500", "rows": [
    { "label": "100", "value": "cem" },
    { "label": "200", "value": "duzentos" },
    { "label": "300", "value": "trezentos" },
    { "label": "400", "value": "quatrocentos" },
    { "label": "500", "value": "quinhentos", "highlight": true }
  ] },
  { "title": "600 a 1000", "rows": [
    { "label": "600", "value": "seiscentos" },
    { "label": "700", "value": "setecentos" },
    { "label": "800", "value": "oitocentos" },
    { "label": "900", "value": "novecentos" },
    { "label": "1000", "value": "mil!", "highlight": true }
  ] }
]
```

## Compor e decompor: o segredo do 342 🔍

Um número até 1000 tem **três algarismos** — centenas, dezenas e unidades. **Decompor** é separá-lo nas partes; **compor** é juntá-las outra vez:

```keyvalue
[
  { "k": "342", "v": "3 centenas + 4 dezenas + 2 unidades = 300 + 40 + 2 🧩" },
  { "k": "560", "v": "5 centenas + 6 dezenas + 0 unidades = 500 + 60" },
  { "k": "705", "v": "7 centenas + 0 dezenas + 5 unidades — a gaveta das dezenas está vazia!" },
  { "k": "999", "v": "9 centenas + 9 dezenas + 9 unidades — o último antes do 1000! 🏁" }
]
```

Vê o 342 a nascer em blocos — cada **placa** é uma centena, cada **barra** uma dezena, cada **cubo** uma unidade. Carrega para juntar 300 + 42:

```blocos
{ "op": "add", "a": 300, "b": 42, "title": "300 + 42 = 342 em blocos" }
```

```math
{ "expr": "342 = 300 + 40 + 2", "say": "trezentos e quarenta e dois é igual a trezentos mais quarenta mais dois" }
```

## Qual é maior? ⚖️

Para comparar, olha **primeiro para as centenas** — quem tem mais caixas gigantes ganha! Só no empate passas às dezenas, e depois às unidades.

```steps
[
  { "title": "458 ou 290?", "body": "4 centenas contra 2 centenas → ganha o 458! 🏆", "icon": "📦" },
  { "title": "634 ou 651?", "body": "centenas empatadas (6 e 6) → olha para as dezenas: 5 ganha a 3 → 651! 🔍", "icon": "🔍" },
  { "title": "89 ou 100?", "body": "o 89 nem tem centenas — o 100 é maior! 💪", "icon": "💪" }
]
```

## Truques de cálculo mental 🧠

Com as caixas na cabeça, fazes contas **sem papel**! Dois truques de campeão:

**Truque 1 — decompor para somar:** parte um dos números nas suas caixas e soma por partes.

```math
{ "expr": "34 + 25 = 34 + 20 + 5 = 59", "say": "trinta e quatro mais vinte e cinco: somo primeiro o vinte, dá cinquenta e quatro, e depois o cinco: cinquenta e nove" }
```

**Truque 2 — saltar para a dezena:** quando a soma «não cabe», salta primeiro para a dezena redonda e dá o resto a seguir.

```steps
[
  { "title": "38 + 5?", "body": "do 38 ao 40 vão 2 — salto primeiro para o 40! 🐸", "icon": "🐸" },
  { "title": "Quanto sobra?", "body": "dei 2 dos 5; sobram 3 ✋", "icon": "✋" },
  { "title": "Salto final", "body": "40 + 3 = 43 🎯", "icon": "🎯" }
]
```

> **Truque:** as dezenas redondas (10, 20, 30…) são as **pedras grandes do rio** — saltar primeiro para uma pedra grande é sempre mais fácil do que atravessar de uma vez! 🐸

## Um exemplo passo a passo 🔍

A escola comprou **3 caixas de 100 lápis**, **4 caixas de 10** e **2 lápis soltos**. Quantos lápis são? ✏️

```steps
[
  { "title": "1. Conta as caixas gigantes", "body": "3 caixas de 100 são 3 centenas = 300 🏗️", "icon": "📦" },
  { "title": "2. Conta as caixas pequenas", "body": "4 caixas de 10 são 4 dezenas = 40 🔟", "icon": "🔟" },
  { "title": "3. Junta os soltos", "body": "mais 2 lápis: 300 + 40 + 2 ✏️", "icon": "➕" },
  { "title": "4. Compõe o número", "body": "3 centenas, 4 dezenas, 2 unidades: 342 🧩", "icon": "✏️" },
  { "title": "5. Resposta", "body": "a escola tem 342 lápis! ✅", "icon": "🎉" }
]
```

> **Truque:** o nome do número diz-te as três partes! «Trezentos e quarenta e dois» = **trezentos** (3 caixas gigantes) + **quarenta** (4 caixas) + **dois** (2 soltos) = **342**. Ouve o nome e escreve as partes. 👂

> [!TIP] **Para saberes mais** 🌱 Atenção a uma palavra mágica: 100 sozinho diz-se **cem**, mas com mais alguma coisa diz-se **cento**: 101 é «cento e um», 150 é «cento e cinquenta». E depois do 1000 o jogo continua — 10 centenas fazem **um milhar**, e os números nunca acabam! ♾️

## Vamos praticar 🎈

```quiz
{
  "id": "mat-2-numeros-1000-pratica",
  "questions": [
    { "q": "Quantas dezenas tem 1 centena?", "layout": "grid",
      "options": [ { "t": "10", "emoji": "📦", "correct": true }, { "t": "100" }, { "t": "5" } ],
      "explain": "1 centena = 10 dezenas = 100 unidades." },
    { "q": "A contar de 100 em 100, o que vem depois do 400?", "layout": "grid",
      "options": [ { "t": "500", "correct": true }, { "t": "401" }, { "t": "600" } ],
      "explain": "100, 200, 300, 400, 500 — salto de centena em centena!" },
    { "q": "Quantas centenas tem o número 342?", "layout": "grid",
      "options": [ { "t": "3", "emoji": "🏗️", "correct": true }, { "t": "4" }, { "t": "2" } ],
      "explain": "342 = 3 centenas + 4 dezenas + 2 unidades." },
    { "q": "3 centenas + 4 dezenas + 2 unidades. Que número é?", "layout": "grid",
      "options": [ { "t": "342", "correct": true }, { "t": "243" }, { "t": "432" } ],
      "explain": "300 + 40 + 2 = 342." },
    { "q": "Como se lê o número 500?", "layout": "grid",
      "options": [ { "t": "quinhentos", "correct": true }, { "t": "cinquenta" }, { "t": "cinco mil" } ],
      "explain": "5 centenas: quinhentos." },
    { "q": "Decompõe o 560.", "layout": "grid",
      "options": [ { "t": "500 + 60", "correct": true }, { "t": "50 + 6" }, { "t": "500 + 6" } ],
      "explain": "560 = 5 centenas + 6 dezenas = 500 + 60." },
    { "q": "Qual é o número maior?", "layout": "grid",
      "options": [ { "t": "458", "correct": true }, { "t": "290" }, { "t": "99" } ],
      "explain": "O 458 tem 4 centenas — mais do que 2 e do que nenhuma." },
    { "q": "Quantas centenas fazem 1000?", "layout": "grid",
      "options": [ { "t": "10", "emoji": "🎉", "correct": true }, { "t": "100" }, { "t": "1000" } ],
      "explain": "10 centenas de 100: 1000, um milhar!" },
    { "q": "Tenho 2 caixas de 100 cromos e 5 caixas de 10. Quantos cromos?", "emoji": "🃏", "layout": "grid",
      "options": [ { "t": "250", "correct": true }, { "t": "205" }, { "t": "25" } ],
      "explain": "2 centenas + 5 dezenas: 200 + 50 = 250." },
    { "q": "De cabeça: 34 + 25?", "layout": "grid", "level": 2,
      "hint": "Soma primeiro o 20, depois o 5.",
      "options": [ { "t": "59", "emoji": "🧠", "correct": true }, { "t": "54" }, { "t": "61" } ],
      "explain": "34 + 20 = 54; 54 + 5 = 59. Decompor torna a conta fácil!" },
    { "q": "De cabeça: 38 + 5? (salta primeiro para o 40)", "layout": "grid", "level": 2,
      "hint": "Do 38 ao 40 vão 2; ainda sobram 3 para dar.",
      "options": [ { "t": "43", "emoji": "🐸", "correct": true }, { "t": "42" }, { "t": "45" } ],
      "explain": "38 + 2 = 40 e 40 + 3 = 43 — o salto para a dezena redonda!" }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-2-numeros-1000-final",
  "final": true,
  "title": "Os números até 1000",
  "questions": [
    { "q": "Uma centena é o mesmo que…", "layout": "grid",
      "options": [ { "t": "10 dezenas", "emoji": "📦", "correct": true }, { "t": "10 unidades" }, { "t": "1000 unidades" } ],
      "explain": "10 dezenas juntas fazem 1 centena = 100." },
    { "q": "A contar de 100 em 100, o que vem depois do 900?", "layout": "grid",
      "options": [ { "t": "1000", "emoji": "🎉", "correct": true }, { "t": "901" }, { "t": "800" } ],
      "explain": "…800, 900, 1000 — chegaste ao milhar!" },
    { "q": "Quantas centenas, dezenas e unidades tem o 627?", "layout": "grid",
      "options": [ { "t": "6 C, 2 D e 7 U", "correct": true }, { "t": "7 C, 2 D e 6 U" }, { "t": "2 C, 6 D e 7 U" } ],
      "explain": "627 = 600 + 20 + 7." },
    { "q": "7 centenas + 0 dezenas + 5 unidades. Que número é?", "layout": "grid",
      "options": [ { "t": "705", "correct": true }, { "t": "75" }, { "t": "750" } ],
      "explain": "A gaveta das dezenas vazia escreve-se com 0: 705." },
    { "q": "Como se lê o número 800?", "layout": "grid",
      "options": [ { "t": "oitocentos", "correct": true }, { "t": "oitenta" }, { "t": "oito mil" } ],
      "explain": "8 centenas: oitocentos." },
    { "q": "Qual é o número maior?", "layout": "grid",
      "options": [ { "t": "651", "correct": true }, { "t": "634" }, { "t": "599" } ],
      "explain": "Centenas empatadas (6 e 6) → dezenas: 5 ganha a 3, logo 651." },
    { "q": "«Trezentos e quarenta e dois» escreve-se…", "layout": "grid",
      "options": [ { "t": "342", "correct": true }, { "t": "324" }, { "t": "3402" } ],
      "explain": "Trezentos (300) + quarenta (40) + dois (2) = 342." },
    { "q": "Que número vem mesmo antes do 1000?", "layout": "grid",
      "options": [ { "t": "999", "correct": true }, { "t": "990" }, { "t": "1001" } ],
      "explain": "999 = 9 centenas, 9 dezenas e 9 unidades — e a seguir, 1000!" },
    { "q": "Para comparar dois números de três algarismos, olho primeiro para…", "layout": "grid",
      "options": [ { "t": "as centenas", "emoji": "🏗️", "correct": true }, { "t": "as unidades", "emoji": "🔵" }, { "t": "a cor do número", "emoji": "🎨" } ],
      "explain": "Quem tem mais centenas ganha; só no empate olhas para as dezenas." }
  ]
}
```
