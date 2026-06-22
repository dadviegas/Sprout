# Múltiplos, divisores, m.d.c. e m.m.c. 🔗

> [!NOTE] **O que vais aprender** 👀 Vais ligar **múltiplos** e **divisores**, usar os **critérios de divisibilidade** para saber tudo de relance, descobrir os **números primos**, e dominar dois super-poderes: o **m.d.c.** (máximo divisor comum) e o **m.m.c.** (mínimo múltiplo comum) — com problemas a sério! 🦸

Já conheces as tabuadas e os múltiplos do 1.º ciclo. Agora vais virá-los do **avesso**: além de saltar para a frente (múltiplos), vais aprender a parti-los certinho (divisores). E no fim ganhas dois truques poderosíssimos para resolver problemas de calendários, embrulhos e equipas. Vamos a isto! 🎁

## Múltiplo e divisor — os dois lados da mesma moeda 🪙

Um **múltiplo** de um número sai da sua tabuada (salta para a frente). Um **divisor** é um número que cabe lá dentro **certinho**, sem deixar resto. São ideias **espelho**: se 6 é múltiplo de 3, então 3 é divisor de 6! 🪞

```compare
[
  { "title": "Múltiplos de 3 ✖️", "rows": [
    { "label": "Saltas de 3", "value": "3, 6, 9, 12, 15, 18…" },
    { "label": "São infinitos?", "value": "sim, nunca acabam ♾️" }
  ] },
  { "title": "Divisores de 12 ➗", "highlight": true, "rows": [
    { "label": "Cabem certinho em 12", "value": "1, 2, 3, 4, 6, 12" },
    { "label": "São poucos?", "value": "sim, têm fim 🔚" }
  ] }
]
```

> [!NOTE] **Truque para nunca trocar:** os **múltiplos** são **muitos** (infinitos, vão para sempre). Os **divisores** são poucos e **dividem** o número em partes iguais. 🧠

## Critérios de divisibilidade — adivinhar sem dividir 🔮

Há sinais espertos que te dizem logo se um número se divide por outro, **sem fazeres a conta**! Guarda bem estes, valem ouro:

```keyvalue
[
  { "k": "÷ 2", "v": "se for par (acaba em 0, 2, 4, 6 ou 8) → 38, 90 ✌️" },
  { "k": "÷ 3", "v": "se a soma dos algarismos for múltiplo de 3 → 27 (2+7=9) ✔️" },
  { "k": "÷ 4", "v": "se os 2 últimos algarismos forem múltiplo de 4 → 1 24 ↩️" },
  { "k": "÷ 5", "v": "se acabar em 0 ou 5 → 45, 90 🖐️" },
  { "k": "÷ 9", "v": "se a soma dos algarismos for múltiplo de 9 → 54 (5+4=9) 🎯" },
  { "k": "÷ 10", "v": "se acabar em 0 → 70, 250 🔟" }
]
```

Vamos testar o **918**: acaba em 8 → divide por **2** ✓; 9+1+8 = 18, que é múltiplo de 3 e de 9 → divide por **3** e por **9** ✓. Tudo isto sem fazer uma única divisão! 🪄

## Números primos — os tijolos dos números 🧱

Um **número primo** tem **exatamente dois** divisores: o **1** e ele próprio. Não há mais ninguém que caiba lá dentro certinho! Os que têm mais divisores chamam-se **compostos**.

```stats
[
  { "label": "Primos até 20", "value": "8", "hint": "2,3,5,7,11,13,17,19" },
  { "label": "Único primo par", "value": "2", "hint": "todos os outros pares dividem por 2" },
  { "label": "O 1 é primo?", "value": "Não", "hint": "só tem 1 divisor, ele mesmo" }
]
```

```compare
[
  { "title": "Primo 🧱 (2 divisores)", "rows": [
    { "label": "7", "value": "só 1 e 7" },
    { "label": "13", "value": "só 1 e 13" }
  ] },
  { "title": "Composto 🧩 (mais de 2)", "highlight": true, "rows": [
    { "label": "12", "value": "1, 2, 3, 4, 6, 12" },
    { "label": "15", "value": "1, 3, 5, 15" }
  ] }
]
```

### O crivo de Eratóstenes — a peneira dos primos 🕳️

Há mais de 2000 anos, o grego **Eratóstenes** inventou uma «peneira» para apanhar todos os primos de uma vez. Escreves os números todos e vais **riscando os compostos** — o que sobra na peneira são os primos!

```steps
[
  { "title": "1. Risca o 1", "body": "o 1 não é primo (só tem 1 divisor) — fora! ❌", "icon": "1️⃣" },
  { "title": "2. Guarda o 2, risca os outros pares", "body": "4, 6, 8, 10… são todos múltiplos de 2 ✂️", "icon": "✌️" },
  { "title": "3. Guarda o 3, risca os múltiplos de 3", "body": "6, 9, 12, 15… (alguns já estavam riscados) ✂️", "icon": "3️⃣" },
  { "title": "4. Guarda o 5 e o 7, risca os múltiplos", "body": "10, 15, 20… e 14, 21, 28… ✂️", "icon": "🖐️" },
  { "title": "5. O que sobrou são os primos!", "body": "até 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 🧱", "icon": "🎉" }
]
```

```keyvalue
[
  { "k": "Primos até 30 (sabe-os de cor!)", "v": "2, 3, 5, 7, 11, 13, 17, 19, 23, 29 — são 10 🧠" },
  { "k": "Cuidado com os disfarçados", "v": "91 = 7 × 13 e 51 = 3 × 17 parecem primos, mas não são! 🎭" },
  { "k": "Até 100", "v": "há 25 primos; o maior é o 97 🔭" }
]
```

> [!NOTE] **Truque para testar um número até 100:** experimenta dividir só por **2, 3, 5 e 7**. Se nenhum couber certinho, é primo! (Usa os critérios de divisibilidade lá de cima — quase nunca precisas de fazer a conta.) 🔮

## m.m.c. — o mínimo múltiplo comum 🤝

Imagina dois autocarros: um passa de **4** em 4 minutos, outro de **6** em 6. Quando voltam a passar **juntos**? Procura o **primeiro múltiplo que os dois partilham** — esse é o **m.m.c.**! 🚌🚌

```steps
[
  { "title": "1. Lista os múltiplos de cada um", "body": "4: 4, 8, 12, 16, 20, 24…  |  6: 6, 12, 18, 24…", "icon": "📋" },
  { "title": "2. Procura os comuns", "body": "aparecem nos dois: 12, 24, 36… (múltiplos comuns)", "icon": "🤝" },
  { "title": "3. Escolhe o mais pequeno", "body": "o menor de todos é 12 → m.m.c.(4, 6) = 12", "icon": "🥇" },
  { "title": "4. Responde", "body": "os autocarros passam juntos de 12 em 12 minutos! 🚌", "icon": "🎉" }
]
```

```math
{ "expr": "m.m.c.(4, 6) = 12", "say": "o mínimo múltiplo comum de quatro e seis é doze" }
```

## m.d.c. — o máximo divisor comum 🔧

Agora ao contrário! Tens **12** rebuçados de morango e **8** de limão e queres fazer **sacos iguais**, com o **maior número** de sacos possível e nada a sobrar. Procura o **maior divisor que os dois partilham** — o **m.d.c.**! 🍬

```steps
[
  { "title": "1. Lista os divisores de cada um", "body": "12: 1, 2, 3, 4, 6, 12  |  8: 1, 2, 4, 8", "icon": "📋" },
  { "title": "2. Procura os comuns", "body": "cabem nos dois: 1, 2, 4 (divisores comuns)", "icon": "🤝" },
  { "title": "3. Escolhe o maior", "body": "o maior de todos é 4 → m.d.c.(12, 8) = 4", "icon": "🏆" },
  { "title": "4. Responde", "body": "podes fazer 4 sacos iguais (cada um com 3 de morango e 2 de limão)! 🍬", "icon": "🎉" }
]
```

```math
{ "expr": "m.d.c.(12, 8) = 4", "say": "o máximo divisor comum de doze e oito é quatro" }
```

> [!WARNING] Não troques! **m.m.c.** usa **M**últiplos e dá o **menor** (problemas de «voltar a acontecer juntos»). **m.d.c.** usa **D**ivisores e dá o **maior** (problemas de «repartir em partes iguais»). 🚦

## Um exemplo passo a passo 🔍

*«A Inês tem 18 gomas vermelhas e 24 verdes. Quer fazer ramos iguais, com o maior número de ramos possível, sem sobrar nenhuma. Quantos ramos faz?»* Repara: «**repartir** em partes iguais, **o maior** número» → é **m.d.c.**! 🌸

```steps
[
  { "title": "1. Que super-poder?", "body": "«repartir igual» + «o maior» = m.d.c. (máximo divisor comum) 🔧", "icon": "🧐" },
  { "title": "2. Divisores de 18", "body": "1, 2, 3, 6, 9, 18", "icon": "📋" },
  { "title": "3. Divisores de 24", "body": "1, 2, 3, 4, 6, 8, 12, 24", "icon": "📋" },
  { "title": "4. O maior comum", "body": "comuns: 1, 2, 3, 6 → o maior é 6. m.d.c.(18, 24) = 6", "icon": "🏆" },
  { "title": "5. Resposta", "body": "faz 6 ramos iguais: 3 vermelhas + 4 verdes em cada! 🌸", "icon": "🎉" }
]
```

> **Truque das palavras-chave:** sublinha o que o problema pede. «**Juntos outra vez**», «**ao mesmo tempo**», «**a cada quantos**» → **m.m.c.** ⏰. «**Repartir igual**», «**o maior possível**», «**sem sobrar**» → **m.d.c.** 📦.

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Divisibilidade, primos, m.d.c. e m.m.c.", "items": [
  { "front": "O 7 é primo ou composto?", "back": "primo", "options": ["composto"] },
  { "front": "Único número primo par", "back": "2", "options": ["4", "0"] },
  { "front": "918 divide por 3? (9+1+8=18)", "back": "sim", "options": ["não"] },
  { "front": "m.m.c.(4, 6)", "back": "12", "options": ["24", "2"] },
  { "front": "m.d.c.(12, 8)", "back": "4", "options": ["2", "24"] },
  { "front": "Maior divisor de qualquer número", "back": "ele próprio", "options": ["o 1", "o dobro"] },
  { "front": "Menor divisor de qualquer número", "back": "o 1", "options": ["o 2", "ele próprio"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Há um atalho lindo para o **m.m.c.** de dois números: multiplica-os e divide pelo **m.d.c.**! Por exemplo, m.m.c.(4, 6) = (4 × 6) ÷ m.d.c.(4, 6) = 24 ÷ 2 = **12**. E sabias que os números primos nunca acabam? Há **infinitos**, e os matemáticos ainda hoje caçam primos gigantes com milhões de algarismos! 🔭

## Vamos praticar 🎈

```quiz
{
  "id": "mat-5-mdc-mmc-pratica",
  "questions": [
    { "q": "Qual destes é um divisor de 12?", "layout": "grid",
      "options": [ { "t": "4", "emoji": "➗", "correct": true }, { "t": "5", "feedback": "12 ÷ 5 deixa resto (sobra 2). Um divisor cabe certinho: 12 ÷ 4 = 3.", "tag": "divisor-vs-multiplo" }, { "t": "7", "feedback": "12 ÷ 7 deixa resto. O 7 não cabe certinho em 12; o 4 cabe (12 ÷ 4 = 3).", "tag": "divisor-vs-multiplo" } ],
      "explain": "12 ÷ 4 = 3, certinho. O 5 e o 7 não cabem em 12." },
    { "q": "Um número primo tem quantos divisores?", "layout": "grid",
      "options": [ { "t": "exatamente 2 (o 1 e ele próprio)", "emoji": "🧱", "correct": true }, { "t": "muitos", "feedback": "Ter muitos divisores é ser composto, como o 12. Primo tem só 2: o 1 e ele mesmo.", "tag": "primo-definicao" }, { "t": "nenhum", "feedback": "Todo o número tem pelo menos o 1 a dividi-lo. O primo tem exatamente 2 divisores.", "tag": "primo-definicao" } ],
      "explain": "Primo = só dois divisores: o 1 e ele mesmo." },
    { "q": "Pela soma dos algarismos, 27 divide por…", "layout": "grid",
      "options": [ { "t": "3 (2+7=9)", "emoji": "✔️", "correct": true }, { "t": "2", "feedback": "27 é ímpar (acaba em 7), por isso não divide por 2. Como 2+7=9, divide por 3.", "tag": "divisibilidade-criterio" }, { "t": "5", "feedback": "Só divide por 5 quem acaba em 0 ou 5. O 27 acaba em 7; como 2+7=9, divide por 3.", "tag": "divisibilidade-criterio" } ],
      "explain": "2+7 = 9, que é múltiplo de 3 (e de 9). E 27 é ímpar, não divide por 2." },
    { "q": "Qual é o m.m.c. de 4 e 6?", "layout": "grid",
      "options": [ { "t": "12", "emoji": "🤝", "correct": true }, { "t": "24", "feedback": "24 também é múltiplo comum, mas o m.m.c. é o mais pequeno: 12.", "tag": "mmc-calculo" }, { "t": "2", "feedback": "2 é divisor comum, não múltiplo. O menor múltiplo que 4 e 6 partilham é 12.", "tag": "mdc-vs-mmc" } ],
      "explain": "Múltiplos comuns: 12, 24… o menor é 12." },
    { "q": "Qual é o m.d.c. de 12 e 8?", "layout": "grid",
      "options": [ { "t": "4", "emoji": "🔧", "correct": true }, { "t": "2", "feedback": "2 é divisor comum, mas não o maior. O 4 também cabe nos dois: m.d.c. = 4.", "tag": "mdc-calculo" }, { "t": "24", "feedback": "24 é múltiplo comum, não divisor. O m.d.c. é o maior divisor que partilham: 4.", "tag": "mdc-vs-mmc" } ],
      "explain": "Divisores comuns: 1, 2, 4 — o maior é 4." },
    { "q": "Para «fazer sacos iguais, o maior número, sem sobrar», usas…", "layout": "grid",
      "options": [ { "t": "m.d.c.", "emoji": "📦", "correct": true }, { "t": "m.m.c.", "feedback": "O m.m.c. serve para «voltar a acontecer juntos». «Repartir igual, o maior» é m.d.c.", "tag": "mdc-vs-mmc" } ],
      "explain": "«Repartir igual» + «o maior» = máximo divisor comum." },
    { "q": "Qual destes NÃO é primo?", "layout": "grid",
      "options": [ { "t": "9", "emoji": "🧩", "correct": true }, { "t": "11", "feedback": "O 11 só tem o 1 e o 11 a dividi-lo, por isso é primo. O 9 não: 9 = 3 × 3.", "tag": "primo-definicao" }, { "t": "13", "feedback": "O 13 é primo (só o 1 e o 13 cabem). O composto aqui é o 9, que tem o divisor 3.", "tag": "primo-definicao" } ],
      "explain": "9 = 3 × 3, tem o divisor 3, por isso é composto." },
    { "q": "Se 5 é divisor de 20, então 20 é… de 5", "layout": "grid",
      "options": [ { "t": "múltiplo", "emoji": "🪞", "correct": true }, { "t": "divisor", "feedback": "É ao contrário: o 5 é que é divisor de 20. O número maior, 20, é múltiplo do 5.", "tag": "divisor-vs-multiplo" }, { "t": "primo", "feedback": "20 não é primo (tem muitos divisores). Como sai da tabuada do 5, é múltiplo de 5.", "tag": "divisor-vs-multiplo" } ],
      "explain": "São ideias espelho: 5 divide 20, logo 20 é múltiplo de 5." },
    { "q": "Dois autocarros passam de 4 e de 6 minutos. Voltam a passar juntos a cada…", "layout": "grid",
      "options": [ { "t": "12 minutos", "emoji": "🚌", "correct": true }, { "t": "10 minutos", "feedback": "10 = 4 + 6, mas «juntos outra vez» pede o m.m.c., não a soma. m.m.c.(4,6) = 12.", "tag": "mdc-vs-mmc" }, { "t": "24 minutos", "feedback": "24 é múltiplo comum, mas não o primeiro. O primeiro minuto que partilham é o 12.", "tag": "mmc-calculo" } ],
      "explain": "É o m.m.c.(4, 6) = 12: o primeiro minuto que partilham." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-mdc-mmc-final",
  "final": true,
  "title": "Múltiplos, divisores, m.d.c. e m.m.c.",
  "questions": [
    { "q": "Os divisores de um número são…", "layout": "grid",
      "options": [ { "t": "poucos e têm fim", "emoji": "🔚", "correct": true }, { "t": "infinitos", "feedback": "Os múltiplos é que são infinitos (vão para sempre). Os divisores são poucos e têm fim.", "tag": "divisor-vs-multiplo" } ],
      "explain": "Divisores são poucos; os múltiplos é que são infinitos." },
    { "q": "Qual é o único número primo par?", "layout": "grid",
      "options": [ { "t": "2", "emoji": "✌️", "correct": true }, { "t": "4", "feedback": "4 = 2 × 2, tem o divisor 2, por isso é composto. O único primo par é o 2.", "tag": "primo-definicao" }, { "t": "0", "feedback": "O 0 não é primo (divide-se por imenso). O único número primo par é o 2.", "tag": "primo-definicao" } ],
      "explain": "Todos os outros pares dividem por 2, logo não são primos." },
    { "q": "918 divide por 2 porque…", "layout": "grid",
      "options": [ { "t": "acaba em 8 (é par)", "emoji": "✌️", "correct": true }, { "t": "é grande", "feedback": "Ser grande não tem nada a ver com dividir por 2. O que conta é acabar em par: 918 acaba em 8.", "tag": "divisibilidade-criterio" }, { "t": "acaba em 9", "feedback": "918 acaba em 8, não em 9. Como acaba em algarismo par, divide por 2.", "tag": "divisibilidade-criterio" } ],
      "explain": "Divide por 2 todo o número par (acaba em 0,2,4,6,8)." },
    { "q": "O m.m.c. serve para problemas de…", "layout": "grid",
      "options": [ { "t": "«voltar a acontecer juntos»", "emoji": "⏰", "correct": true }, { "t": "«repartir igual»", "feedback": "«Repartir igual» é o m.d.c. (usa divisores). O m.m.c. é «voltar a acontecer juntos».", "tag": "mdc-vs-mmc" } ],
      "explain": "m.m.c. = mínimo múltiplo comum, o próximo momento partilhado." },
    { "q": "Qual é o m.d.c. de 18 e 24?", "layout": "grid",
      "options": [ { "t": "6", "emoji": "🏆", "correct": true }, { "t": "3", "feedback": "3 é divisor comum, mas não o maior. O 6 também cabe nos dois: m.d.c. = 6.", "tag": "mdc-calculo" }, { "t": "72", "feedback": "72 é múltiplo comum, não divisor. O m.d.c. é o maior divisor que partilham: 6.", "tag": "mdc-vs-mmc" } ],
      "explain": "Divisores comuns: 1, 2, 3, 6 — o maior é 6." },
    { "q": "Qual é o m.m.c. de 3 e 5?", "layout": "grid",
      "options": [ { "t": "15", "emoji": "🤝", "correct": true }, { "t": "8", "feedback": "8 = 3 + 5, mas o m.m.c. não é a soma. É o menor múltiplo comum: 15.", "tag": "mmc-calculo" }, { "t": "30", "feedback": "30 é múltiplo comum, mas não o menor. O primeiro que 3 e 5 partilham é o 15.", "tag": "mmc-calculo" } ],
      "explain": "Múltiplos de 3 e de 5 partilham primeiro o 15." },
    { "q": "Quantos primos há até 20?", "layout": "grid",
      "options": [ { "t": "8", "emoji": "🧱", "correct": true }, { "t": "5", "feedback": "São mais: 2, 3, 5, 7, 11, 13, 17, 19. Conta bem — são 8.", "tag": "primo-contagem" }, { "t": "10", "feedback": "Talvez tenhas contado o 1 e o 9. Primos até 20 são só 8: 2, 3, 5, 7, 11, 13, 17, 19.", "tag": "primo-contagem" } ],
      "explain": "2, 3, 5, 7, 11, 13, 17, 19 — são 8." },
    { "q": "Para 18 gomas e 24 gomas em ramos iguais (o maior número), usas…", "layout": "grid",
      "options": [ { "t": "m.d.c. (= 6)", "emoji": "🌸", "correct": true }, { "t": "m.m.c. (= 72)", "feedback": "O m.m.c. serve para «voltar a juntar». «Repartir igual, o maior número» é m.d.c. = 6.", "tag": "mdc-vs-mmc" } ],
      "explain": "«Repartir igual, o maior número» = m.d.c. = 6 ramos." },
    { "q": "Atalho: m.m.c.(4,6) = (4 × 6) ÷ m.d.c.(4,6). Quanto dá?", "layout": "grid",
      "options": [ { "t": "12", "emoji": "🔭", "correct": true }, { "t": "24", "feedback": "24 é só o 4 × 6. Falta dividir pelo m.d.c.(4,6) = 2: 24 ÷ 2 = 12.", "tag": "mmc-calculo" }, { "t": "2", "feedback": "O 2 é o m.d.c.(4,6), não o m.m.c. O atalho dá 24 ÷ 2 = 12.", "tag": "mdc-vs-mmc" } ],
      "explain": "24 ÷ 2 = 12. Bonito, não é?" },
    { "q": "No crivo de Eratóstenes, o primeiro número a riscar é…", "layout": "grid", "level": 2,
      "hint": "Quantos divisores tem? Um primo precisa de exatamente dois.",
      "options": [ { "t": "o 1 (não é primo)", "emoji": "🕳️", "correct": true }, { "t": "o 2", "feedback": "O 2 é o primeiro primo — fica na peneira! O que se risca logo é o 1, que só tem 1 divisor.", "tag": "primo-definicao" }, { "t": "o 3", "feedback": "O 3 também é primo, fica na peneira. O primeiro a riscar é o 1 (não é primo).", "tag": "primo-definicao" } ],
      "explain": "O 1 só tem um divisor (ele próprio), por isso sai logo da peneira." },
    { "q": "O 91 é primo?", "layout": "grid", "level": 3,
      "hint": "Experimenta dividir por 2, 3, 5 e 7 antes de decidir.",
      "options": [ { "t": "não — 91 = 7 × 13", "emoji": "🎭", "correct": true }, { "t": "sim, é primo", "feedback": "Parece primo, mas tem o divisor 7: 91 = 7 × 13. Por isso é composto.", "tag": "primo-disfarcado" }, { "t": "não — é par", "feedback": "91 é ímpar (acaba em 1), não é par. Não é primo porque 91 = 7 × 13.", "tag": "primo-disfarcado" } ],
      "explain": "Parece primo, mas 7 × 13 = 91. Os disfarçados caem no teste do 7!" }
  ]
}
```
