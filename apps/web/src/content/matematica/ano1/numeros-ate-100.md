# Os números até 100 💯

> [!NOTE] **O que vais aprender** 👀 Vais contar de **10 em 10** até ao **100**, descobrir que cada número tem **dezenas e unidades** (34 são 3 dezenas e 4 unidades!) e aprender a comparar números grandes. 🚀

Já sabes contar até 20. E sabes que 10 coisas juntas são **uma dezena**. Agora vem o salto gigante: com as dezenas, chegas ao **100** num instante! É como contar pacotes de 10 em vez de contar uma coisa de cada vez. 🧺

## Contar de 10 em 10 🐸

Salta de dezena em dezena, como uma rã de pedra em pedra: **10, 20, 30, 40, 50, 60, 70, 80, 90, 100**! Usa os botões e ouve cada salto:

```numberline
{ "min": 0, "max": 100, "start": 0, "step": 10, "title": "Saltos de 10 em 10 até ao 100" }
```

São só **10 saltos** — muito mais rápido do que contar de 1 em 1! 🏎️

## Uma dezena é uma caixa cheia 🔟

Lembra-te: quando enches a caixa do 10, tens **uma dezena**. Os números grandes são caixas cheias + bolinhas soltas:

```tenframe
{ "count": 10, "emoji": "🔵", "title": "Uma dezena cheia: 10!" }
```

```keyvalue
[
  { "k": "10", "v": "1 dezena → uma caixa cheia 📦" },
  { "k": "20", "v": "2 dezenas → duas caixas cheias 📦📦" },
  { "k": "50", "v": "5 dezenas → cinco caixas cheias 🙌" },
  { "k": "100", "v": "10 dezenas → dez caixas cheias! 🎉" }
]
```

## Dezenas e unidades: o segredo do 34 🔍

Cada número até 100 escreve-se com **dois algarismos**: o primeiro conta as **dezenas** (caixas cheias) e o segundo conta as **unidades** (bolinhas soltas).

```keyvalue
[
  { "k": "34", "v": "3 dezenas + 4 unidades = 30 + 4 🧊" },
  { "k": "57", "v": "5 dezenas + 7 unidades = 50 + 7" },
  { "k": "70", "v": "7 dezenas + 0 unidades = 70 (nenhuma solta!)" },
  { "k": "99", "v": "9 dezenas + 9 unidades — o último antes do 100! 🏁" }
]
```

Vê o 34 a nascer em blocos — cada **barra** é uma dezena, cada **cubo** é uma unidade. Carrega para juntar 30 + 4:

```blocos
{ "op": "add", "a": 30, "b": 4, "title": "30 + 4 = 34 em blocos" }
```

## Como se chamam as dezenas 🗣️

```compare
[
  { "title": "10 a 50", "rows": [
    { "label": "10", "value": "dez" },
    { "label": "20", "value": "vinte" },
    { "label": "30", "value": "trinta" },
    { "label": "40", "value": "quarenta" },
    { "label": "50", "value": "cinquenta", "highlight": true }
  ] },
  { "title": "60 a 100", "rows": [
    { "label": "60", "value": "sessenta" },
    { "label": "70", "value": "setenta" },
    { "label": "80", "value": "oitenta" },
    { "label": "90", "value": "noventa" },
    { "label": "100", "value": "cem!", "highlight": true }
  ] }
]
```

Os outros números juntam as duas partes: **34** lê-se «trinta e quatro» = trinta + quatro. 🧩

## Qual é maior? ⚖️

Para comparar dois números, olha **primeiro para as dezenas** — quem tem mais caixas cheias ganha! Só se forem iguais é que olhas para as unidades.

```steps
[
  { "title": "45 ou 62?", "body": "4 dezenas contra 6 dezenas → ganha o 62! 🏆", "icon": "📦" },
  { "title": "78 ou 73?", "body": "as dezenas empatam (7 e 7) → olha para as unidades: 8 ganha a 3 → 78! 🔍", "icon": "🔍" },
  { "title": "30 ou 9?", "body": "o 9 nem tem dezenas — o 30 é muito maior! 💪", "icon": "💪" }
]
```

## Um exemplo passo a passo 🔍

A avó tem **4 caixas de 10 ovos** e mais **3 ovos soltos**. Quantos ovos tem? 🥚

```steps
[
  { "title": "1. Conta as caixas", "body": "4 caixas de 10 ovos são 4 dezenas 📦", "icon": "📦" },
  { "title": "2. Diz quanto valem", "body": "4 dezenas são 40 ovos 🔟", "icon": "🔟" },
  { "title": "3. Junta os soltos", "body": "mais 3 ovos soltos: 40 + 3 🥚", "icon": "➕" },
  { "title": "4. Escreve o número", "body": "4 dezenas e 3 unidades: 43 ✏️", "icon": "✏️" },
  { "title": "5. Resposta", "body": "a avó tem 43 ovos! ✅", "icon": "🎉" }
]
```

> **Truque:** o nome do número diz-te logo as partes! «Cinquenta e seis» = **cinquenta** (5 caixas) **e seis** (6 soltas) = **56**. Ouve o nome com atenção e escreve as duas partes. 👂

> [!TIP] **Para saberes mais** 🌱 Quando juntas 10 dezenas, nasce um número novo: o **100**, que se chama **uma centena**! E o jogo continua sempre: 10 centenas fazem **1000** (um milhar). Os números nunca acabam — há sempre um maior! ♾️

## Vamos praticar 🎈

```quiz
{
  "id": "mat1-n100-pratica",
  "questions": [
    { "q": "A contar de 10 em 10, o que vem depois do 30?", "layout": "grid",
      "options": [ { "t": "40", "correct": true }, { "t": "31" }, { "t": "50" } ],
      "explain": "10, 20, 30, 40 — salto de dezena em dezena!" },
    { "q": "Quantas dezenas tem o número 34?", "layout": "grid",
      "options": [ { "t": "3", "emoji": "📦", "correct": true }, { "t": "4" }, { "t": "34" } ],
      "explain": "34 = 3 dezenas e 4 unidades." },
    { "q": "3 dezenas e 4 unidades. Que número é?", "layout": "grid",
      "options": [ { "t": "34", "correct": true }, { "t": "43" }, { "t": "7" } ],
      "explain": "30 + 4 = 34." },
    { "q": "Quanto valem 5 dezenas?", "layout": "grid",
      "options": [ { "t": "50", "correct": true }, { "t": "5" }, { "t": "15" } ],
      "explain": "5 caixas de 10: 50!" },
    { "q": "Qual é o número maior?", "layout": "grid",
      "options": [ { "t": "62", "correct": true }, { "t": "45" }, { "t": "26" } ],
      "explain": "O 62 tem 6 dezenas — mais do que 4 e do que 2." },
    { "q": "Como se lê o número 56?", "layout": "grid",
      "options": [ { "t": "cinquenta e seis", "correct": true }, { "t": "sessenta e cinco" }, { "t": "cinco e seis" } ],
      "explain": "5 dezenas e 6 unidades: cinquenta e seis." },
    { "q": "Tenho 2 caixas de 10 lápis e 5 soltos. Quantos lápis?", "emoji": "✏️", "layout": "grid",
      "options": [ { "t": "25", "correct": true }, { "t": "52" }, { "t": "7" } ],
      "explain": "2 dezenas e 5 unidades: 20 + 5 = 25." },
    { "q": "Quantas dezenas fazem 100?", "layout": "grid",
      "options": [ { "t": "10", "emoji": "🔟", "correct": true }, { "t": "100" }, { "t": "5" } ],
      "explain": "10 caixas de 10: 100, uma centena!" },
    { "q": "78 ou 73 — qual é maior?", "layout": "grid",
      "options": [ { "t": "78", "correct": true }, { "t": "73" }, { "t": "são iguais" } ],
      "explain": "Dezenas empatadas (7 e 7) → olha para as unidades: 8 ganha a 3." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat1-n100-final",
  "final": true,
  "title": "Os números até 100",
  "questions": [
    { "q": "A contar de 10 em 10, o que vem depois do 70?", "layout": "grid",
      "options": [ { "t": "80", "correct": true }, { "t": "71" }, { "t": "60" } ],
      "explain": "…60, 70, 80 — mais um salto de dezena!" },
    { "q": "Quantas dezenas e unidades tem o 52?", "layout": "grid",
      "options": [ { "t": "5 dezenas e 2 unidades", "correct": true }, { "t": "2 dezenas e 5 unidades" }, { "t": "52 dezenas" } ],
      "explain": "52 = 50 + 2 = 5 dezenas e 2 unidades." },
    { "q": "6 dezenas e 0 unidades. Que número é?", "layout": "grid",
      "options": [ { "t": "60", "correct": true }, { "t": "6" }, { "t": "66" } ],
      "explain": "6 caixas cheias e nenhuma solta: 60." },
    { "q": "Como se lê o número 90?", "layout": "grid",
      "options": [ { "t": "noventa", "correct": true }, { "t": "nove" }, { "t": "dezanove" } ],
      "explain": "9 dezenas: noventa." },
    { "q": "Qual é o número maior?", "layout": "grid",
      "options": [ { "t": "81", "correct": true }, { "t": "79" }, { "t": "18" } ],
      "explain": "8 dezenas ganham a 7 e a 1: o 81 é o maior." },
    { "q": "Tenho 3 caixas de 10 ovos e 7 soltos. Quantos ovos?", "emoji": "🥚", "layout": "grid",
      "options": [ { "t": "37", "correct": true }, { "t": "73" }, { "t": "10" } ],
      "explain": "3 dezenas e 7 unidades: 30 + 7 = 37." },
    { "q": "Que número vem mesmo antes do 100?", "layout": "grid",
      "options": [ { "t": "99", "correct": true }, { "t": "90" }, { "t": "101" } ],
      "explain": "99 = 9 dezenas e 9 unidades — e a seguir, 100!" },
    { "q": "«Quarenta e cinco» escreve-se…", "layout": "grid",
      "options": [ { "t": "45", "correct": true }, { "t": "54" }, { "t": "405" } ],
      "explain": "Quarenta (4 dezenas) e cinco (5 unidades): 45." },
    { "q": "Para saber qual de dois números é maior, olho primeiro para…", "layout": "grid",
      "options": [ { "t": "as dezenas", "emoji": "📦", "correct": true }, { "t": "as unidades", "emoji": "🔵" }, { "t": "a cor do número", "emoji": "🎨" } ],
      "explain": "Quem tem mais dezenas ganha; só no empate olhas para as unidades." }
  ]
}
```
