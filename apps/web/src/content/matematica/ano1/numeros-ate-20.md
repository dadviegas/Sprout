# Números até 20 ✋✋

> [!NOTE] **O que vais aprender** 👀 Vais aprender a **contar até 20**, a perceber que **20 é igual a 10 + 10**, e a saber que número vem **antes** e **depois**. Vais ser um campeão dos números! 🏆

Já sabes contar até 10 com os dedos de uma mão e da outra. 🙌 Agora vamos mais longe: até ao **20**! É fácil — depois do 10 os números continuam, só temos de juntar **uma dezena** com mais alguns. Vamos a isto, passo a passo! 🚀

## Contar do 10 até ao 20 🔢

Depois do 10 não paramos. Os números continuam pela mesma ordem, sempre a crescer **um a um**:

**10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20**.

Repara como cada número é só **um a mais** do que o anterior. É como subir uma escada, degrau a degrau! 🪜

```numberline
{ "min": 10, "max": 20, "start": 15, "step": 1, "title": "Do 10 ao 20, um degrau de cada vez" }
```

## Uma dezena e mais alguns 🔟

Dez coisas juntas chamam-se uma **dezena**. Todos os números de 11 a 19 são **uma dezena e mais alguns**:

```keyvalue
[
  { "k": "11", "v": "10 + 1 = onze 🙂" },
  { "k": "13", "v": "10 + 3 = treze 🙂" },
  { "k": "15", "v": "10 + 5 = quinze 🙂" },
  { "k": "17", "v": "10 + 7 = dezassete 🙂" },
  { "k": "19", "v": "10 + 9 = dezanove 🙂" },
  { "k": "20", "v": "10 + 10 = vinte (duas dezenas!) 🙌" }
]
```

Vês? Começam quase todos por «**deza-**» ou «**dezas-**» — é a pista de que já passámos do 10! 👂

## Como se lê e como se escreve ✍️

Cada número tem um **nome** e dois **algarismos**. O primeiro algarismo conta as **dezenas** e o segundo conta as **unidades** (as que sobram):

```compare
[
  { "title": "11 a 15 🖐️", "rows": [
    { "label": "11", "value": "onze" },
    { "label": "12", "value": "doze" },
    { "label": "13", "value": "treze" },
    { "label": "14", "value": "catorze" },
    { "label": "15", "value": "quinze", "highlight": true }
  ] },
  { "title": "16 a 20 🖐️🖐️", "rows": [
    { "label": "16", "value": "dezasseis" },
    { "label": "17", "value": "dezassete" },
    { "label": "18", "value": "dezoito" },
    { "label": "19", "value": "dezanove" },
    { "label": "20", "value": "vinte", "highlight": true }
  ] }
]
```

## Antes e depois ↔️

Cada número tem um **vizinho à frente** (o que vem depois, é maior 1) e um **vizinho atrás** (o que vem antes, é menor 1):

```steps
[
  { "title": "Depois do 12 vem...", "body": "o 13! É só somar 1. 👉", "icon": "➕" },
  { "title": "Antes do 12 vem...", "body": "o 11! É só tirar 1. 👈", "icon": "➖" },
  { "title": "Entre o 14 e o 16 está...", "body": "o 15, mesmo no meio! 🎯", "icon": "🎯" },
  { "title": "O último de todos é...", "body": "o 20, depois do 19. 🏁", "icon": "🏁" }
]
```

## A caixa do 10 ajuda-te 🧮

Usa a **caixa do 10** para veres a dezena cheia. Quando enches as 10 bolinhas, sabes que já tens uma dezena — e o resto são as unidades a mais! 👇

```tenframe
{ "count": 10, "emoji": "🔵", "title": "Uma dezena cheia: 10!" }
```

Para fazer o **14**, enches a caixa do 10 e juntas mais **4** bolinhas ao lado: 10 + 4 = 14. 😀

## Um exemplo passo a passo 🔍

Imagina esta pergunta: *«Tenho 10 berlindes numa mão e 6 noutra. Quantos berlindes tenho?»* Vamos resolver com calma. 🟢

```steps
[
  { "title": "1. Lê com atenção", "body": "uma mão tem 10 berlindes, a outra tem 6. 🤔", "icon": "🧐" },
  { "title": "2. Começa pela dezena", "body": "10 berlindes já são uma dezena cheia. 🔟", "icon": "🔟" },
  { "title": "3. Junta as unidades", "body": "agora acrescenta os 6 da outra mão. ✋", "icon": "✋" },
  { "title": "4. Faz a conta", "body": "10 + 6 = 16. 👏", "icon": "➕" },
  { "title": "5. Resposta", "body": "tenho 16 berlindes ao todo! ✅", "icon": "✅" }
]
```

> **Truque:** todos os números de 11 a 19 são «**dez e mais alguns**». Diz o nome devagar: «deza-SSEIS» = 10 + 6 = 16. O fim do nome diz-te quantas unidades juntar ao 10! 🗣️

> [!TIP] **Para saberes mais** 🌱 Sabias que **20** também são **dois grupos de 10**? Por isso dizemos «**duas dezenas**». E se juntares mais uma dezena chegas ao **30**! Os números crescem sempre de dezena em dezena: 10, 20, 30, 40... 🚀

## Vamos praticar 🎈

```quiz
{
  "id": "mat1-n20-pratica",
  "questions": [
    { "q": "Que número vem depois do 12?", "layout": "grid",
      "options": [ { "t": "11", "emoji": "1️⃣1️⃣", "feedback": "O 11 vem ANTES do 12. Depois é mais um: o 13.", "tag": "numero-seguinte-anterior" }, { "t": "13", "emoji": "1️⃣3️⃣", "correct": true }, { "t": "20", "emoji": "2️⃣0️⃣", "feedback": "O 20 está muito à frente. Logo a seguir ao 12 vem o 13.", "tag": "numero-seguinte-anterior" } ],
      "explain": "Depois do 12 vem o 13 — é só somar 1." },
    { "q": "Quanto é 10 + 5?", "emoji": "✋✋ ✋", "layout": "grid",
      "options": [ { "t": "12", "feedback": "12 é 10 + 2. Aqui juntas 5: 10 + 5 = 15.", "tag": "soma-calculo" }, { "t": "15", "correct": true }, { "t": "20", "feedback": "20 é 10 + 10. Só juntas 5, por isso é 15.", "tag": "soma-calculo" } ],
      "explain": "Uma dezena e mais cinco: 15!" },
    { "q": "Que número vem antes do 16?", "layout": "grid",
      "options": [ { "t": "15", "correct": true }, { "t": "17", "feedback": "O 17 vem DEPOIS do 16. Antes é menos um: o 15.", "tag": "numero-seguinte-anterior" }, { "t": "14", "feedback": "Quase! Mas o 14 está dois lugares atrás. Antes do 16 é o 15.", "tag": "numero-seguinte-anterior" } ],
      "explain": "Antes do 16 vem o 15 — é tirar 1." },
    { "q": "Como se escreve 'catorze'?", "layout": "grid",
      "options": [ { "t": "4", "feedback": "4 é 'quatro'. Catorze é uma dezena e quatro: 14.", "tag": "leitura-numero" }, { "t": "14", "correct": true }, { "t": "40", "feedback": "40 é 'quarenta'. Catorze escreve-se 14.", "tag": "leitura-numero" } ],
      "explain": "Catorze escreve-se 14: uma dezena e quatro." },
    { "q": "Quantas dezenas há no 20?", "emoji": "🙌🙌", "layout": "grid",
      "options": [ { "t": "1", "feedback": "Uma dezena só faz 10. O 20 são 10 + 10, dois grupos de 10.", "tag": "valor-posicional" }, { "t": "2", "correct": true }, { "t": "20", "feedback": "20 são as coisas todas. Mas grupos de 10 há só dois.", "tag": "valor-posicional" } ],
      "explain": "20 = 10 + 10 = duas dezenas." },
    { "q": "Qual destes números está entre o 17 e o 19?", "layout": "grid",
      "options": [ { "t": "16", "feedback": "O 16 vem antes do 17. No meio do 17 e do 19 está o 18.", "tag": "ordenar-numeros" }, { "t": "18", "correct": true }, { "t": "20", "feedback": "O 20 vem depois do 19. Mesmo no meio fica o 18.", "tag": "ordenar-numeros" } ],
      "explain": "Entre o 17 e o 19 está o 18, mesmo no meio." },
    { "q": "Quanto é 10 + 8?", "layout": "grid",
      "options": [ { "t": "18", "correct": true }, { "t": "80", "feedback": "80 são oito dezenas. Aqui é uma dezena e oito: 18.", "tag": "soma-calculo" }, { "t": "108", "feedback": "Juntaste mal os números. Uma dezena e oito fazem só 18.", "tag": "soma-calculo" } ],
      "explain": "Uma dezena e oito: 18." },
    { "q": "Qual é o número maior?", "layout": "grid",
      "options": [ { "t": "13", "feedback": "13 é maior que 11, mas o 19 é o maior — está mais perto do 20.", "tag": "comparar-numeros" }, { "t": "19", "correct": true }, { "t": "11", "feedback": "O 11 é o mais pequeno aqui. O maior é o 19.", "tag": "comparar-numeros" } ],
      "explain": "O 19 está mais perto do 20, é o maior!" },
    { "q": "Como se chama o número 12?", "layout": "grid",
      "options": [ { "t": "doze", "correct": true }, { "t": "vinte", "feedback": "Vinte é o 20. O 12 lê-se 'doze' — dez e mais dois.", "tag": "leitura-numero" }, { "t": "dois", "feedback": "Dois é só o 2. O 12 é 'doze', uma dezena e dois.", "tag": "leitura-numero" } ],
      "explain": "O 12 lê-se 'doze' — dez e mais dois." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat1-n20-final",
  "final": true,
  "title": "Números até 20",
  "questions": [
    { "q": "Qual é o número 'dezasseis'?", "layout": "grid", "level": 1,
      "hint": "Diz devagar: deza-SSEIS — dez e mais seis.",
      "options": [ { "t": "6", "feedback": "6 é só 'seis'. Dezasseis é dez e mais seis: 16.", "tag": "leitura-numero" }, { "t": "16", "correct": true }, { "t": "60", "feedback": "60 é 'sessenta'. Dezasseis escreve-se 16.", "tag": "leitura-numero" } ],
      "explain": "Dezasseis escreve-se 16." },
    { "q": "Que número vem antes do 20?", "layout": "grid", "level": 1,
      "hint": "Antes é menos um — conta para trás a partir do 20.",
      "options": [ { "t": "18", "feedback": "Quase! O 18 está dois lugares atrás. Antes do 20 é o 19.", "tag": "numero-seguinte-anterior" }, { "t": "19", "correct": true }, { "t": "21", "feedback": "O 21 vem DEPOIS do 20. Antes é menos um: o 19.", "tag": "numero-seguinte-anterior" } ],
      "explain": "Antes do 20 vem o 19." },
    { "q": "Quantas dezenas há no 20?", "emoji": "🙌🙌", "layout": "grid", "level": 2,
      "hint": "Quantos grupos de 10 cabem no 20?",
      "options": [ { "t": "1", "feedback": "Um grupo de 10 faz só 10. No 20 cabem dois grupos de 10.", "tag": "valor-posicional" }, { "t": "2", "correct": true }, { "t": "20", "feedback": "20 são as coisas todas. Grupos de 10 há só dois.", "tag": "valor-posicional" } ],
      "explain": "20 = 10 + 10 = duas dezenas." },
    { "q": "Quanto é 10 + 3?", "layout": "grid", "level": 1,
      "hint": "Uma dezena cheia e mais 3 ao lado.",
      "options": [ { "t": "13", "correct": true }, { "t": "30", "feedback": "30 são três dezenas. Aqui é uma dezena e três: 13.", "tag": "soma-calculo" }, { "t": "103", "feedback": "Juntaste mal. Uma dezena e três fazem só 13.", "tag": "soma-calculo" } ],
      "explain": "Uma dezena e três: 13." },
    { "q": "Que número vem depois do 14?", "layout": "grid", "level": 1,
      "hint": "Depois é sempre mais um.",
      "options": [ { "t": "13", "feedback": "O 13 vem ANTES do 14. Depois é mais um: o 15.", "tag": "numero-seguinte-anterior" }, { "t": "15", "correct": true }, { "t": "16", "feedback": "Quase! O 16 está dois lugares à frente. Logo a seguir é o 15.", "tag": "numero-seguinte-anterior" } ],
      "explain": "Depois do 14 vem o 15 — somas 1." },
    { "q": "Como se escreve 'dezoito'?", "layout": "grid", "level": 1,
      "hint": "Diz devagar: dez-OITO — o fim do nome diz as unidades.",
      "options": [ { "t": "8", "feedback": "8 é só 'oito'. Dezoito é dez e mais oito: 18.", "tag": "leitura-numero" }, { "t": "18", "correct": true }, { "t": "80", "feedback": "80 é 'oitenta'. Dezoito escreve-se 18.", "tag": "leitura-numero" } ],
      "explain": "Dezoito escreve-se 18: dez e mais oito." },
    { "q": "Tenho 10 berlindes e mais 7. Quantos tenho?", "emoji": "🟢", "layout": "grid", "level": 2,
      "hint": "Começa na dezena cheia e junta os 7.",
      "options": [ { "t": "17", "correct": true }, { "t": "70", "feedback": "70 são sete dezenas. Aqui é uma dezena e sete: 17.", "tag": "soma-calculo" }, { "t": "107", "feedback": "Juntaste mal os números. 10 e mais 7 fazem só 17.", "tag": "soma-calculo" } ],
      "explain": "10 + 7 = 17 berlindes." },
    { "q": "Qual é o número maior?", "layout": "grid", "level": 1,
      "hint": "O maior é o que está mais à frente na fila dos números.",
      "options": [ { "t": "11", "feedback": "O 11 é dos mais pequenos. O 20 está mais à frente, é o maior.", "tag": "comparar-numeros" }, { "t": "20", "correct": true }, { "t": "15", "feedback": "O 15 fica no meio. O maior aqui é o 20.", "tag": "comparar-numeros" } ],
      "explain": "O 20 é o maior de todos até aqui!" },
    { "q": "Que número está mesmo no meio, entre o 14 e o 16?", "layout": "grid", "level": 2,
      "hint": "Conta em voz alta: 14, …, 16 — quem fica no meio?",
      "options": [ { "t": "15", "correct": true }, { "t": "13", "feedback": "O 13 vem antes do 14. Mesmo no meio do 14 e do 16 está o 15.", "tag": "ordenar-numeros" }, { "t": "17", "feedback": "O 17 vem depois do 16. No meio fica o 15.", "tag": "ordenar-numeros" } ],
      "explain": "Entre o 14 e o 16 está o 15." }
  ]
}
```
