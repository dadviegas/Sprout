# Números inteiros relativos ➖

> [!NOTE] **O que vais aprender** 👀 Que existem números **mais pequenos que zero** — os **negativos**! Vais aprender a **ler** os inteiros relativos, a **compará-los** numa reta (qual é maior?), a saber o que é o **simétrico** e o **módulo**, e a **somar e subtrair** com positivos e negativos sem te enganares. 🌡️⬆️⬇️

Até agora os números só andavam para cima a partir do zero: 0, 1, 2, 3… Mas e quando faz **frio** e o termómetro marca abaixo de zero? E quando o elevador vai para a **cave**? Aí precisas de números **negativos** — os que vivem do outro lado do zero. Juntos, os positivos, o zero e os negativos formam os **inteiros relativos**. Vem daí descobrir este mundo «debaixo de zero»! 🧊

## O zero é o meio do mundo 🌍

Imagina uma reta com o **zero** no meio. Para a **direita** ficam os **positivos** (+1, +2, +3…), para a **esquerda** os **negativos** (−1, −2, −3…). Quanto mais à direita, **maior**; quanto mais à esquerda, **menor**.

```numberline
{ "min": -5, "max": 5, "title": "A reta dos inteiros relativos", "mark": 0 }
```

```keyvalue
[
  { "k": "Positivos", "v": "à direita do zero: +1, +2, +3… (o sinal + costuma esconder-se) ➕" },
  { "k": "Zero", "v": "nem positivo nem negativo — é o porteiro do meio 🚪" },
  { "k": "Negativos", "v": "à esquerda do zero: −1, −2, −3… (o sinal − é obrigatório) ➖" },
  { "k": "Onde vês isto?", "v": "termómetros, andares de cave, contas a dever, golos vs. faltas 🌡️" }
]
```

## Comparar: qual é maior? 🤏

Na reta, **quem está mais à direita é sempre maior**. Por isso **+2 > +1** (já sabias), mas atenção à parte nova: **−1 > −5**! Sim — **−1 é maior que −5**, porque está mais perto do zero (mais à direita).

```compare
[
  { "title": "Com positivos 😀", "rows": [
    { "label": "Regra", "value": "ganha o número maior" },
    { "label": "Exemplo", "value": "+5 > +2 (5 está mais à direita)" }
  ] },
  { "title": "Com negativos 🧊", "highlight": true, "rows": [
    { "label": "Regra", "value": "ganha o que está MAIS perto do zero", "highlight": true },
    { "label": "Exemplo", "value": "−2 > −7 (−2 está mais à direita!)", "highlight": true }
  ] }
]
```

> **Truque do termómetro:** 🌡️ pensa no frio! **−2 °C** é menos frio que **−7 °C**, por isso **−2 é maior**. Quanto mais «fundo» na cave (mais negativo), **menor** é o número.

## Simétrico e módulo 🪞

Cada número tem um **gémeo do outro lado** do zero, à mesma distância — é o **simétrico**. O simétrico de **+3** é **−3**, e o de **−5** é **+5**. E o **módulo** (ou valor absoluto) é a **distância ao zero**, sempre **positiva** — escreve-se entre barrinhas: |−4| = 4.

```keyvalue
[
  { "k": "Simétrico", "v": "o mesmo número com o sinal trocado: simétrico de +3 é −3 🪞" },
  { "k": "Módulo |n|", "v": "a distância ao zero, sempre positiva: |−4| = 4 e |+4| = 4 📏" },
  { "k": "O zero", "v": "é o seu próprio simétrico e tem módulo 0 🎯" }
]
```

```math
{ "expr": "|−4| = 4", "say": "o módulo de menos quatro é igual a quatro" }
```

## Somar e subtrair com sinais ➕➖

Pensa em **passos**: somar um positivo é **andar para a direita** ➡️, somar um negativo é **andar para a esquerda** ⬅️. Partes do primeiro número e dás os passos!

```steps
[
  { "title": "(+3) + (+2)", "body": "começa no +3, anda 2 à direita → +5 ➡️", "icon": "➕" },
  { "title": "(+3) + (−5)", "body": "começa no +3, anda 5 à esquerda → −2 ⬅️", "icon": "➖" },
  { "title": "(−4) + (−1)", "body": "começa no −4, anda 1 à esquerda → −5 ⬅️", "icon": "➖" },
  { "title": "(−2) − (−6)", "body": "subtrair um negativo é o MESMO que somar: −2 + 6 = +4 🔄", "icon": "🔄" }
]
```

> [!WARNING] O sinal **menos a dobrar** vira mais! **− (−6)** é o mesmo que **+ 6**. Pensa: «tirar uma dívida» é o mesmo que «ganhar dinheiro». Por isso −2 − (−6) = −2 + 6 = **+4**. 💶

## Um exemplo passo a passo 🔍

*«Em Bragança, às 7h da manhã estavam **−3 °C**. Durante o dia a temperatura subiu **8 graus**. Que temperatura ficou? E se à noite descer de novo **5 graus**?»* Vamos com calma. 🌡️

```steps
[
  { "title": "1. Ponto de partida", "body": "−3 °C (três graus abaixo de zero) 🧊", "icon": "🌡️" },
  { "title": "2. Subiu 8 graus", "body": "andar 8 à direita: −3 + 8 = +5 °C ➡️", "icon": "☀️" },
  { "title": "3. À noite desce 5", "body": "andar 5 à esquerda: +5 − 5 = 0 °C ⬅️", "icon": "🌙" },
  { "title": "4. Resposta", "body": "de tarde 5 °C; à noite voltou a 0 °C 🎉", "icon": "✅" }
]
```

> **Truque mental:** numa soma de um positivo com um negativo, vê **qual é o maior em módulo** (quem está mais longe do zero). O resultado fica **com o sinal desse**, e o valor é a **diferença** dos dois. Em (+3) + (−5): o 5 manda → sinal **−**, e 5 − 3 = 2 → **−2**. 🧠

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Inteiros relativos: comparar e operar", "items": [
  { "front": "Qual é maior: −2 ou −7?", "back": "−2", "options": ["−7", "são iguais"] },
  { "front": "Simétrico de +3", "back": "−3", "options": ["+3", "0"] },
  { "front": "|−4|", "back": "4", "options": ["−4", "0"] },
  { "front": "(+3) + (−5)", "back": "−2", "options": ["+8", "+2"] },
  { "front": "(−4) + (−1)", "back": "−5", "options": ["−3", "+5"] },
  { "front": "−2 − (−6)", "back": "+4", "options": ["−8", "−4"] },
  { "front": "Qual é maior: 0 ou −1?", "back": "0", "options": ["−1", "são iguais"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Os números negativos demoraram **séculos** a serem aceites! Antigamente chamavam-lhes números «**absurdos**» ou «**falsos**», porque ninguém imaginava «menos que nada». Foram os matemáticos da **Índia** e da **China**, há mais de 1500 anos, que começaram a usá-los para contar **dívidas** (o que devias era «negativo»). Hoje estão em todo o lado: na conta do banco, na temperatura, nos andares −1 e −2 do parque de estacionamento! 🏦🅿️

## Vamos praticar 🎈

```quiz
{
  "id": "mat-6-inteiros-pratica",
  "questions": [
    { "q": "Qual destes números é maior?", "layout": "grid",
      "options": [ { "t": "−2", "emoji": "🌡️", "correct": true }, { "t": "−5" }, { "t": "−9" } ],
      "explain": "Mais perto do zero = maior. −2 está mais à direita na reta." },
    { "q": "O simétrico de +7 é…", "layout": "grid",
      "options": [ { "t": "−7", "emoji": "🪞", "correct": true }, { "t": "+7" }, { "t": "0" } ],
      "explain": "O simétrico é o mesmo número com o sinal trocado." },
    { "q": "Quanto é |−6|?", "layout": "grid",
      "options": [ { "t": "6", "emoji": "📏", "correct": true }, { "t": "−6" }, { "t": "0" } ],
      "explain": "O módulo é a distância ao zero, sempre positiva: 6." },
    { "q": "Quanto é (+4) + (−6)?", "layout": "grid",
      "options": [ { "t": "−2", "correct": true }, { "t": "+10" }, { "t": "+2" } ],
      "explain": "Anda 6 à esquerda a partir do +4: chegas a −2." },
    { "q": "Quanto é (−3) + (−2)?", "layout": "grid",
      "options": [ { "t": "−5", "emoji": "⬅️", "correct": true }, { "t": "−1" }, { "t": "+5" } ],
      "explain": "Dois negativos juntos afundam mais: −3 − 2 = −5." },
    { "q": "Quanto é (−5) − (−8)?", "layout": "grid",
      "options": [ { "t": "+3", "emoji": "🔄", "correct": true }, { "t": "−13" }, { "t": "−3" } ],
      "explain": "Subtrair um negativo = somar: −5 + 8 = +3." },
    { "q": "O termómetro marca −4 °C e sobe 4 graus. Fica…", "layout": "grid",
      "options": [ { "t": "0 °C", "emoji": "🎯", "correct": true }, { "t": "−8 °C" }, { "t": "+8 °C" } ],
      "explain": "−4 + 4 = 0: volta exatamente ao zero." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-6-inteiros-final",
  "final": true,
  "title": "Números inteiros relativos",
  "questions": [
    { "q": "Onde ficam os números negativos na reta?", "layout": "grid",
      "options": [ { "t": "à esquerda do zero", "emoji": "⬅️", "correct": true }, { "t": "à direita do zero" }, { "t": "em cima do zero" } ],
      "explain": "Negativos à esquerda, positivos à direita, zero no meio." },
    { "q": "Qual é o maior?", "layout": "grid",
      "options": [ { "t": "−1", "emoji": "🏆", "correct": true }, { "t": "−4" }, { "t": "−10" } ],
      "explain": "Mais perto do zero = maior. −1 ganha." },
    { "q": "O zero é…", "layout": "grid",
      "options": [ { "t": "nem positivo nem negativo", "emoji": "🚪", "correct": true }, { "t": "o maior negativo" }, { "t": "o menor positivo" } ],
      "explain": "O zero é o porteiro do meio: nem um nem outro." },
    { "q": "O simétrico de −9 é…", "layout": "grid",
      "options": [ { "t": "+9", "emoji": "🪞", "correct": true }, { "t": "−9" }, { "t": "0" } ],
      "explain": "Troca o sinal: o gémeo de −9 é +9." },
    { "q": "Quanto vale |−12|?", "layout": "grid",
      "options": [ { "t": "12", "emoji": "📏", "correct": true }, { "t": "−12" }, { "t": "0" } ],
      "explain": "O módulo é a distância ao zero, sempre positiva." },
    { "q": "Quanto é (+2) + (−9)?", "layout": "grid",
      "options": [ { "t": "−7", "correct": true }, { "t": "+11" }, { "t": "+7" } ],
      "explain": "O 9 manda (maior módulo): sinal − e 9 − 2 = 7 → −7." },
    { "q": "Quanto é (−6) − (−10)?", "layout": "grid",
      "options": [ { "t": "+4", "emoji": "🔄", "correct": true }, { "t": "−16" }, { "t": "−4" } ],
      "explain": "Menos com menos = mais: −6 + 10 = +4." },
    { "q": "Numa garagem, do andar −3 sobes 5 andares. Ficas no…", "layout": "grid",
      "options": [ { "t": "andar +2", "emoji": "🅿️", "correct": true }, { "t": "andar −8" }, { "t": "andar −2" } ],
      "explain": "−3 + 5 = +2: passas o rés-do-chão e subes 2." },
    { "q": "Porque dizemos que negativos servem para 'dívidas'?", "layout": "list",
      "options": [ { "t": "o que se deve conta como número abaixo de zero", "emoji": "🏦", "correct": true }, { "t": "porque o dinheiro é sempre negativo" }, { "t": "porque não existem dívidas" } ],
      "explain": "Foi assim que começaram a usá-los: o que devias era 'menos'." }
  ]
}
```
