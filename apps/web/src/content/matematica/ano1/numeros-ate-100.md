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
      "options": [ { "t": "40", "correct": true }, { "t": "31", "feedback": "31 é só mais um. Mas a saltar de 10 em 10, depois do 30 vem o 40.", "tag": "contagem-numeros" }, { "t": "50", "feedback": "Saltaste uma dezena! Depois do 30 vem o 40, e só depois o 50.", "tag": "contagem-numeros" } ],
      "explain": "10, 20, 30, 40 — salto de dezena em dezena!" },
    { "q": "Quantas dezenas tem o número 34?", "layout": "grid",
      "options": [ { "t": "3", "emoji": "📦", "correct": true }, { "t": "4", "feedback": "O 4 são as unidades soltas. As dezenas são o primeiro algarismo: 3.", "tag": "valor-posicional" }, { "t": "34", "feedback": "34 é o número todo. Dezenas (caixas de 10) há só 3.", "tag": "valor-posicional" } ],
      "explain": "34 = 3 dezenas e 4 unidades." },
    { "q": "3 dezenas e 4 unidades. Que número é?", "layout": "grid",
      "options": [ { "t": "34", "correct": true }, { "t": "43", "feedback": "Trocaste a ordem! 4 dezenas e 3 seria 43. Aqui é 3 dezenas e 4: 34.", "tag": "valor-posicional" }, { "t": "7", "feedback": "7 é 3 + 4 somados. Mas 3 dezenas e 4 unidades fazem 30 + 4 = 34.", "tag": "valor-posicional" } ],
      "explain": "30 + 4 = 34." },
    { "q": "Quanto valem 5 dezenas?", "layout": "grid",
      "options": [ { "t": "50", "correct": true }, { "t": "5", "feedback": "5 é uma só. Mas 5 dezenas são 5 caixas de 10: 50.", "tag": "valor-posicional" }, { "t": "15", "feedback": "15 é uma dezena e 5. 5 dezenas são 50.", "tag": "valor-posicional" } ],
      "explain": "5 caixas de 10: 50!" },
    { "q": "Qual é o número maior?", "layout": "grid",
      "options": [ { "t": "62", "correct": true }, { "t": "45", "feedback": "45 tem 4 dezenas. O 62 tem 6 dezenas, por isso é maior.", "tag": "comparar-numeros" }, { "t": "26", "feedback": "26 tem só 2 dezenas. Quem tem mais dezenas é o 62.", "tag": "comparar-numeros" } ],
      "explain": "O 62 tem 6 dezenas — mais do que 4 e do que 2." },
    { "q": "Como se lê o número 56?", "layout": "grid",
      "options": [ { "t": "cinquenta e seis", "correct": true }, { "t": "sessenta e cinco", "feedback": "Isso seria 65! No 56 as dezenas são 5: cinquenta e seis.", "tag": "leitura-numero" }, { "t": "cinco e seis", "feedback": "O 5 são 5 dezenas, lê-se 'cinquenta'. Logo: cinquenta e seis.", "tag": "leitura-numero" } ],
      "explain": "5 dezenas e 6 unidades: cinquenta e seis." },
    { "q": "Tenho 2 caixas de 10 lápis e 5 soltos. Quantos lápis?", "emoji": "✏️", "layout": "grid",
      "options": [ { "t": "25", "correct": true }, { "t": "52", "feedback": "Trocaste a ordem! 2 dezenas e 5 unidades fazem 25, não 52.", "tag": "valor-posicional" }, { "t": "7", "feedback": "7 é 2 + 5. Mas 2 caixas de 10 são 20, e mais 5 dá 25.", "tag": "valor-posicional" } ],
      "explain": "2 dezenas e 5 unidades: 20 + 5 = 25." },
    { "q": "Quantas dezenas fazem 100?", "layout": "grid",
      "options": [ { "t": "10", "emoji": "🔟", "correct": true }, { "t": "100", "feedback": "100 é o número todo. Caixas de 10 são precisas 10 para o fazer.", "tag": "valor-posicional" }, { "t": "5", "feedback": "5 dezenas fazem só 50. Para chegar a 100 são precisas 10.", "tag": "valor-posicional" } ],
      "explain": "10 caixas de 10: 100, uma centena!" },
    { "q": "78 ou 73 — qual é maior?", "layout": "grid",
      "options": [ { "t": "78", "correct": true }, { "t": "73", "feedback": "As dezenas empatam (7 e 7). Nas unidades, 8 ganha a 3: maior é o 78.", "tag": "comparar-numeros" }, { "t": "são iguais", "feedback": "As dezenas são iguais, mas as unidades não: 8 é mais que 3. Ganha o 78.", "tag": "comparar-numeros" } ],
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
      "options": [ { "t": "80", "correct": true }, { "t": "71", "feedback": "71 é só mais um. A saltar de 10 em 10, depois do 70 vem o 80.", "tag": "contagem-numeros" }, { "t": "60", "feedback": "O 60 vem ANTES do 70. A subir de 10 em 10, vem o 80.", "tag": "contagem-numeros" } ],
      "explain": "…60, 70, 80 — mais um salto de dezena!" },
    { "q": "Quantas dezenas e unidades tem o 52?", "layout": "grid",
      "options": [ { "t": "5 dezenas e 2 unidades", "correct": true }, { "t": "2 dezenas e 5 unidades", "feedback": "Trocaste! O primeiro algarismo (5) são as dezenas: 5 dezenas e 2 unidades.", "tag": "valor-posicional" }, { "t": "52 dezenas", "feedback": "52 dezenas seria muito! O 52 são só 5 dezenas e 2 unidades.", "tag": "valor-posicional" } ],
      "explain": "52 = 50 + 2 = 5 dezenas e 2 unidades." },
    { "q": "6 dezenas e 0 unidades. Que número é?", "layout": "grid",
      "options": [ { "t": "60", "correct": true }, { "t": "6", "feedback": "6 é só uma unidade. 6 dezenas (6 caixas de 10) fazem 60.", "tag": "valor-posicional" }, { "t": "66", "feedback": "66 teria 6 unidades. Aqui as unidades são 0, por isso é 60.", "tag": "valor-posicional" } ],
      "explain": "6 caixas cheias e nenhuma solta: 60." },
    { "q": "Como se lê o número 90?", "layout": "grid",
      "options": [ { "t": "noventa", "correct": true }, { "t": "nove", "feedback": "Nove é só o 9. O 90 são 9 dezenas: noventa.", "tag": "leitura-numero" }, { "t": "dezanove", "feedback": "Dezanove é o 19. O 90 lê-se noventa.", "tag": "leitura-numero" } ],
      "explain": "9 dezenas: noventa." },
    { "q": "Qual é o número maior?", "layout": "grid",
      "options": [ { "t": "81", "correct": true }, { "t": "79", "feedback": "79 tem 7 dezenas. O 81 tem 8 dezenas, por isso é maior.", "tag": "comparar-numeros" }, { "t": "18", "feedback": "18 tem só 1 dezena. Quem tem mais dezenas é o 81.", "tag": "comparar-numeros" } ],
      "explain": "8 dezenas ganham a 7 e a 1: o 81 é o maior." },
    { "q": "Tenho 3 caixas de 10 ovos e 7 soltos. Quantos ovos?", "emoji": "🥚", "layout": "grid",
      "options": [ { "t": "37", "correct": true }, { "t": "73", "feedback": "Trocaste a ordem! 3 dezenas e 7 unidades fazem 37, não 73.", "tag": "valor-posicional" }, { "t": "10", "feedback": "10 é 3 + 7. Mas 3 caixas de 10 são 30, e mais 7 dá 37.", "tag": "valor-posicional" } ],
      "explain": "3 dezenas e 7 unidades: 30 + 7 = 37." },
    { "q": "Que número vem mesmo antes do 100?", "layout": "grid",
      "options": [ { "t": "99", "correct": true }, { "t": "90", "feedback": "Entre o 90 e o 100 ainda há números. Mesmo antes do 100 está o 99.", "tag": "numero-seguinte-anterior" }, { "t": "101", "feedback": "O 101 vem DEPOIS do 100. Mesmo antes está o 99.", "tag": "numero-seguinte-anterior" } ],
      "explain": "99 = 9 dezenas e 9 unidades — e a seguir, 100!" },
    { "q": "«Quarenta e cinco» escreve-se…", "layout": "grid",
      "options": [ { "t": "45", "correct": true }, { "t": "54", "feedback": "54 é 'cinquenta e quatro'. Quarenta (4 dezenas) e cinco é 45.", "tag": "leitura-numero" }, { "t": "405", "feedback": "Escreveste 'quarenta' e 'cinco' separados. Junta-os: 45.", "tag": "leitura-numero" } ],
      "explain": "Quarenta (4 dezenas) e cinco (5 unidades): 45." },
    { "q": "Para saber qual de dois números é maior, olho primeiro para…", "layout": "grid",
      "options": [ { "t": "as dezenas", "emoji": "📦", "correct": true }, { "t": "as unidades", "emoji": "🔵", "feedback": "As unidades só decidem no empate. Primeiro olha as dezenas.", "tag": "comparar-numeros" }, { "t": "a cor do número", "emoji": "🎨", "feedback": "A cor não conta! Para comparar, olha primeiro as dezenas.", "tag": "comparar-numeros" } ],
      "explain": "Quem tem mais dezenas ganha; só no empate olhas para as unidades." }
  ]
}
```
