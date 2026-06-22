# Números inteiros relativos ➖

> [!NOTE] **Matéria extra — já é uma espreitadela ao 7.º ano!** 🚀 Este tema saiu do programa do 6.º ano (passou para o 3.º ciclo), por isso não aparece nos testes deste ano. Mas se tiveres curiosidade, ficas com avanço!

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
      "options": [ { "t": "−2", "emoji": "🌡️", "correct": true }, { "t": "−5", "feedback": "−5 está mais à esquerda na reta, por isso é menor. O maior é o que está mais perto do zero: −2.", "tag": "inteiro-ordenar" }, { "t": "−9", "feedback": "Nos negativos, quanto maior parece o número, mais fundo está. −9 é o menor de todos; o maior é −2.", "tag": "inteiro-ordenar" } ],
      "explain": "Mais perto do zero = maior. −2 está mais à direita na reta." },
    { "q": "O simétrico de +7 é…", "layout": "grid",
      "options": [ { "t": "−7", "emoji": "🪞", "correct": true }, { "t": "+7", "feedback": "Esse é o próprio número, não o simétrico. O simétrico troca o sinal: de +7 fica −7.", "tag": "inteiro-simetrico" }, { "t": "0", "feedback": "O zero é o simétrico de si mesmo. O simétrico de +7 é o seu gémeo do outro lado: −7.", "tag": "inteiro-simetrico" } ],
      "explain": "O simétrico é o mesmo número com o sinal trocado." },
    { "q": "Quanto é |−6|?", "layout": "grid",
      "options": [ { "t": "6", "emoji": "📏", "correct": true }, { "t": "−6", "feedback": "O módulo é uma distância, por isso é sempre positivo. |−6| dá 6, não −6.", "tag": "inteiro-valor-absoluto" }, { "t": "0", "feedback": "Só |0| é que dá 0. O módulo de −6 é a sua distância ao zero: 6.", "tag": "inteiro-valor-absoluto" } ],
      "explain": "O módulo é a distância ao zero, sempre positiva: 6." },
    { "q": "Quanto é (+4) + (−6)?", "layout": "grid",
      "options": [ { "t": "−2", "correct": true }, { "t": "+10", "feedback": "Somaste os módulos e esqueceste o sinal − do segundo número. Como somas um negativo, andas para a esquerda: +4 − 6 = −2.", "tag": "inteiro-soma-sinais" }, { "t": "+2", "feedback": "Subtraíste mas ficaste com o sinal errado. Como o −6 manda (maior módulo), o resultado é negativo: −2.", "tag": "inteiro-soma-sinais" } ],
      "explain": "Anda 6 à esquerda a partir do +4: chegas a −2." },
    { "q": "Quanto é (−3) + (−2)?", "layout": "grid",
      "options": [ { "t": "−5", "emoji": "⬅️", "correct": true }, { "t": "−1", "feedback": "Com dois negativos não se subtrai: somam-se e afunda mais. −3 − 2 = −5.", "tag": "inteiro-soma-sinais" }, { "t": "+5", "feedback": "Dois negativos somados dão um negativo maior, não um positivo. −3 − 2 = −5.", "tag": "inteiro-soma-sinais" } ],
      "explain": "Dois negativos juntos afundam mais: −3 − 2 = −5." },
    { "q": "Quanto é (−5) − (−8)?", "layout": "grid",
      "options": [ { "t": "+3", "emoji": "🔄", "correct": true }, { "t": "−13", "feedback": "Subtrair um negativo não é somar mais negativo. − (−8) vira + 8: −5 + 8 = +3.", "tag": "inteiro-subtracao" }, { "t": "−3", "feedback": "Esqueceste que menos com menos dá mais. −5 − (−8) = −5 + 8 = +3.", "tag": "inteiro-subtracao" } ],
      "explain": "Subtrair um negativo = somar: −5 + 8 = +3." },
    { "q": "O termómetro marca −4 °C e sobe 4 graus. Fica…", "layout": "grid",
      "options": [ { "t": "0 °C", "emoji": "🎯", "correct": true }, { "t": "−8 °C", "feedback": "Subir é andar para a direita, não afundar mais. −4 + 4 = 0 °C, não −8.", "tag": "inteiro-soma-sinais" }, { "t": "+8 °C", "feedback": "Só sobes 4 graus a partir de −4, não a partir do zero. −4 + 4 = 0 °C.", "tag": "inteiro-soma-sinais" } ],
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
      "options": [ { "t": "à esquerda do zero", "emoji": "⬅️", "correct": true }, { "t": "à direita do zero", "feedback": "À direita do zero ficam os positivos. Os negativos vivem do outro lado: à esquerda.", "tag": "inteiro-reta" }, { "t": "em cima do zero", "feedback": "A reta numérica é deitada, não tem «em cima». Os negativos ficam à esquerda do zero.", "tag": "inteiro-reta" } ],
      "explain": "Negativos à esquerda, positivos à direita, zero no meio." },
    { "q": "Qual é o maior?", "layout": "grid",
      "options": [ { "t": "−1", "emoji": "🏆", "correct": true }, { "t": "−4", "feedback": "−4 está mais à esquerda que −1, logo é menor. Ganha quem está mais perto do zero: −1.", "tag": "inteiro-ordenar" }, { "t": "−10", "feedback": "−10 parece grande mas é o mais fundo de todos, logo o menor. O maior é −1.", "tag": "inteiro-ordenar" } ],
      "explain": "Mais perto do zero = maior. −1 ganha." },
    { "q": "O zero é…", "layout": "grid",
      "options": [ { "t": "nem positivo nem negativo", "emoji": "🚪", "correct": true }, { "t": "o maior negativo", "feedback": "O zero não é negativo: é o porteiro do meio. Não é positivo nem negativo.", "tag": "inteiro-zero" }, { "t": "o menor positivo", "feedback": "O zero não é positivo nem negativo. Fica mesmo no meio, a separar os dois lados.", "tag": "inteiro-zero" } ],
      "explain": "O zero é o porteiro do meio: nem um nem outro." },
    { "q": "O simétrico de −9 é…", "layout": "grid",
      "options": [ { "t": "+9", "emoji": "🪞", "correct": true }, { "t": "−9", "feedback": "Esse é o próprio número, não o simétrico. Trocando o sinal, o simétrico de −9 é +9.", "tag": "inteiro-simetrico" }, { "t": "0", "feedback": "O zero é o simétrico só de si mesmo. O simétrico de −9 é o seu gémeo do outro lado: +9.", "tag": "inteiro-simetrico" } ],
      "explain": "Troca o sinal: o gémeo de −9 é +9." },
    { "q": "Quanto vale |−12|?", "layout": "grid",
      "options": [ { "t": "12", "emoji": "📏", "correct": true }, { "t": "−12", "feedback": "O módulo é uma distância, por isso é sempre positivo. |−12| dá 12, não −12.", "tag": "inteiro-valor-absoluto" }, { "t": "0", "feedback": "Só |0| é que dá 0. O módulo de −12 é a sua distância ao zero: 12.", "tag": "inteiro-valor-absoluto" } ],
      "explain": "O módulo é a distância ao zero, sempre positiva." },
    { "q": "Quanto é (+2) + (−9)?", "layout": "grid",
      "options": [ { "t": "−7", "correct": true }, { "t": "+11", "feedback": "Somaste os módulos e ignoraste o sinal −. Somar −9 é andar 9 para a esquerda: +2 − 9 = −7.", "tag": "inteiro-soma-sinais" }, { "t": "+7", "feedback": "Acertaste no valor, mas não no sinal. O −9 manda (maior módulo), por isso o resultado é negativo: −7.", "tag": "inteiro-soma-sinais" } ],
      "explain": "O 9 manda (maior módulo): sinal − e 9 − 2 = 7 → −7." },
    { "q": "Quanto é (−6) − (−10)?", "layout": "grid",
      "options": [ { "t": "+4", "emoji": "🔄", "correct": true }, { "t": "−16", "feedback": "Subtrair um negativo não é somar mais negativo. − (−10) vira + 10: −6 + 10 = +4.", "tag": "inteiro-subtracao" }, { "t": "−4", "feedback": "Esqueceste que menos com menos dá mais. −6 − (−10) = −6 + 10 = +4.", "tag": "inteiro-subtracao" } ],
      "explain": "Menos com menos = mais: −6 + 10 = +4." },
    { "q": "Numa garagem, do andar −3 sobes 5 andares. Ficas no…", "layout": "grid",
      "options": [ { "t": "andar +2", "emoji": "🅿️", "correct": true }, { "t": "andar −8", "feedback": "Subir é andar para a direita, não afundar mais. −3 + 5 leva-te ao +2, não a −8.", "tag": "inteiro-soma-sinais" }, { "t": "andar −2", "feedback": "Só subiste 1 andar a mais do que devias parar. −3 + 5 = +2: passas o rés-do-chão.", "tag": "inteiro-soma-sinais" } ],
      "explain": "−3 + 5 = +2: passas o rés-do-chão e subes 2." },
    { "q": "Porque dizemos que negativos servem para 'dívidas'?", "layout": "list",
      "options": [ { "t": "o que se deve conta como número abaixo de zero", "emoji": "🏦", "correct": true }, { "t": "porque o dinheiro é sempre negativo", "feedback": "O dinheiro que tens é positivo; só o que deves é que é negativo. Uma dívida conta abaixo de zero.", "tag": "inteiro-contexto" }, { "t": "porque não existem dívidas", "feedback": "As dívidas existem, e são mesmo o exemplo: o que se deve conta como número abaixo de zero.", "tag": "inteiro-contexto" } ],
      "explain": "Foi assim que começaram a usá-los: o que devias era 'menos'." }
  ]
}
```
