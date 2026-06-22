# Percentagens 💯

> [!NOTE] **O que vais aprender** 👀 O que quer dizer **«por cento»** (é uma fração de 100!), a passar entre **percentagem, fração e decimal**, a calcular a **percentagem de um número** (descontos, gorjetas, IVA!) e até a descobrir **quanto por cento** é uma parte do todo. Saldos, nunca mais sem perceber! 🛍️🏷️

Vês **percentagens** por todo o lado: «**50% de desconto**», «bateria a **80%**», «**23% de IVA**». A palavra parece complicada, mas **por cento** quer dizer apenas **«em cada cem»** — é uma forma esperta de falar de partes de um todo, sempre com o mesmo bolo de 100 fatias. Quando perceberes isto, vais ler os saldos como um profissional! 💪

## «Por cento» = «em cada 100» 🎯

**Percentagem** é uma fração com denominador **100**. **25%** quer dizer **25 em cada 100**, ou seja **25/100**. O símbolo **%** é só uma forma curta de escrever «/100».

```fraction
{ "parts": 4, "filled": 1, "shape": "bar", "title": "25% = 25/100 = 1/4" }
```

```keyvalue
[
  { "k": "25%", "v": "25 em cada 100 = 25/100 = 1/4 (um quarto) 🍕" },
  { "k": "50%", "v": "metade = 50/100 = 1/2 ✂️" },
  { "k": "100%", "v": "o todo, tudo, o bolo inteiro 🎂" },
  { "k": "10%", "v": "uma décima parte = 10/100 = 1/10 🔟" }
]
```

## Percentagem, fração e decimal: trigémeos 👨‍👩‍👧

A mesma quantidade veste-se de **três maneiras**. Saber trocar de roupa é meio caminho andado!

```compare
[
  { "title": "De % para decimal 🔢", "rows": [
    { "label": "Como?", "value": "divide por 100 (vírgula 2 casas à esquerda)" },
    { "label": "Exemplo", "value": "25% = 0,25" }
  ] },
  { "title": "De % para fração 🍕", "highlight": true, "rows": [
    { "label": "Como?", "value": "põe sobre 100 e simplifica", "highlight": true },
    { "label": "Exemplo", "value": "25% = 25/100 = 1/4", "highlight": true }
  ] }
]
```

```stats
[
  { "label": "10%", "value": "0,1", "hint": "= 1/10" },
  { "label": "25%", "value": "0,25", "hint": "= 1/4" },
  { "label": "50%", "value": "0,5", "hint": "= 1/2" },
  { "label": "75%", "value": "0,75", "hint": "= 3/4" }
]
```

## Calcular a percentagem de um número 🧮

«**Quanto é 20% de 50**?» A palavra **«de»** é multiplicação (já viste nas frações!). Transforma a % em decimal e multiplica.

```steps
[
  { "title": "20% de 50", "body": "20% = 0,20", "icon": "🔢" },
  { "title": "Multiplica", "body": "0,20 × 50 = 10", "icon": "✖️" },
  { "title": "Resposta", "body": "20% de 50 são 10 ✅", "icon": "✅" }
]
```

> **Truque dos 10%:** para **10%** de um número, basta **andar com a vírgula uma casa** para a esquerda! 10% de 50 = **5,0**. E daí tiras tudo: **20%** é o dobro de 10% (= 10), **5%** é metade de 10% (= 2,5), **30%** é 3 × 10%… 🪄

```math
{ "expr": "10% de 80 = 8     20% de 80 = 16     5% de 80 = 4", "say": "dez por cento de oitenta é oito; vinte por cento é dezasseis; cinco por cento é quatro." }
```

## Descobrir quantos por cento 🔍

E ao contrário? «**Acertei 15 perguntas em 20. Que percentagem é?**» Fazes a **fração** (parte/total) e transformas em percentagem.

```steps
[
  { "title": "1. Faz a fração", "body": "15 em 20 → 15/20", "icon": "🍕" },
  { "title": "2. Passa a /100", "body": "15/20 = 75/100 (×5 em cima e em baixo)", "icon": "🔁" },
  { "title": "3. Lê a percentagem", "body": "75/100 = 75% 🎯", "icon": "🎯" },
  { "title": "Atalho", "body": "15 ÷ 20 = 0,75 → ×100 = 75% ✅", "icon": "✅" }
]
```

Vê o mesmo teste num **gráfico circular** — as fatias mostram as percentagens sem fazeres conta nenhuma:

```chart
{ "type": "pie", "title": "O teste do Rui: 15 certas em 20",
  "labels": ["✅ Certas", "❌ Erradas"], "data": [15, 5],
  "unit": "perguntas",
  "say": "O Rui acertou quinze perguntas em vinte: setenta e cinco por cento. As cinco erradas são os outros vinte e cinco por cento." }
```

## Um exemplo passo a passo 🔍

*«Um jogo custa **40 €** e está com **25% de desconto**. Quanto poupas? E quanto pagas?»* Saldos à vista! 🏷️

```steps
[
  { "title": "1. O desconto", "body": "25% de 40 € → 0,25 × 40 = 10 € 💸", "icon": "🏷️" },
  { "title": "2. Quanto poupas", "body": "poupas 10 €! 🎉", "icon": "💰" },
  { "title": "3. Quanto pagas", "body": "40 − 10 = 30 € (ou 75% de 40)", "icon": "🧾" },
  { "title": "4. Resposta", "body": "poupas 10 € e pagas 30 € 🛍️", "icon": "✅" }
]
```

> [!WARNING] Truque de saldos: **−25% = pagar 75%!** Em vez de calcular o desconto e subtrair, podes ir direto: 75% de 40 = 0,75 × 40 = **30 €**. Um só passo! E cuidado — «**50% + 50%**» de desconto **não** é grátis: o segundo 50% é só sobre o que já sobrou! 😉

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Percentagens", "items": [
  { "front": "25% como fração", "back": "1/4", "options": ["1/2", "2/5"] },
  { "front": "50% como decimal", "back": "0,5", "options": ["0,05", "5"] },
  { "front": "10% de 80", "back": "8", "options": ["18", "0,8"] },
  { "front": "20% de 50", "back": "10", "options": ["20", "30"] },
  { "front": "15 em 20 é que percentagem?", "back": "75%", "options": ["15%", "20%"] },
  { "front": "100% de um número é…", "back": "o próprio número", "options": ["metade", "o dobro"] },
  { "front": "Desconto de 25% = pagar…", "back": "75%", "options": ["25%", "50%"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 A palavra **«por cento»** vem do latim **«per centum»** = «por cem». 🏛️ Mas há um primo ainda mais fino para coisas pequeninas: o **‰ por mil** (per mille = por mil)! Usa-se, por exemplo, na **taxa de álcool no sangue** dos condutores. E em ciência e finanças usa-se o **«ponto-base»**, que é **um centésimo de 1%** (0,01%) — para falar de juros com muita precisão! 📊 As percentagens são tão úteis que ganharam família. 👨‍👩‍👧‍👦

## Vamos praticar 🎈

```quiz
{
  "id": "mat-6-percentagens-pratica",
  "questions": [
    { "q": "O que quer dizer 25%?", "layout": "grid",
      "options": [ { "t": "25 em cada 100", "emoji": "🎯", "correct": true }, { "t": "25 inteiros", "feedback": "% não são unidades inteiras — é uma parte em cada 100. 25% = 25/100.", "tag": "percent-significado" }, { "t": "25 vezes", "feedback": "% não é multiplicar 25 vezes. Quer dizer 25 em cada 100, ou seja 25/100.", "tag": "percent-significado" } ],
      "explain": "Percentagem = fração com denominador 100." },
    { "q": "25% é o mesmo que a fração…", "layout": "grid",
      "options": [ { "t": "1/4", "emoji": "🍕", "correct": true }, { "t": "1/2", "feedback": "1/2 é 50%. 25/100 simplifica para 1/4.", "tag": "percent-fracao" }, { "t": "1/25", "feedback": "% é sempre sobre 100: 25% = 25/100, que simplifica para 1/4 (não 1/25).", "tag": "percent-fracao" } ],
      "explain": "25/100 simplifica para 1/4." },
    { "q": "50% em decimal é…", "layout": "grid",
      "options": [ { "t": "0,5", "emoji": "🔢", "correct": true }, { "t": "0,05", "feedback": "0,05 é 5%. Para 50% divides por 100: 50/100 = 0,5.", "tag": "percent-decimal" }, { "t": "5", "feedback": "5 seria 500%! 50% = 50/100 = 0,5 — a metade.", "tag": "percent-decimal" } ],
      "explain": "Divide por 100: 50% = 0,5." },
    { "q": "Quanto é 10% de 80?", "layout": "grid",
      "options": [ { "t": "8", "emoji": "🪄", "correct": true }, { "t": "18", "feedback": "18 não vem de cá — parece uma soma. 10% de 80 = 80 ÷ 10 = 8.", "tag": "percent-calculo" }, { "t": "0,8", "feedback": "0,8 é 1% de 80 (÷100). 10% divide por 10: 80 ÷ 10 = 8.", "tag": "percent-calculo" } ],
      "explain": "10% = vírgula uma casa à esquerda: 8,0." },
    { "q": "Quanto é 20% de 50?", "layout": "grid",
      "options": [ { "t": "10", "emoji": "✖️", "correct": true }, { "t": "20", "feedback": "20 é só o número da percentagem, não a conta. 20% de 50 = (10% = 5) × 2 = 10.", "tag": "percent-significado" }, { "t": "30", "feedback": "30 seria 60% de 50. 20% é o dobro de 10%: 5 × 2 = 10.", "tag": "percent-calculo" } ],
      "explain": "0,20 × 50 = 10 (ou o dobro de 10%)." },
    { "q": "Acertaste 15 em 20. Que percentagem?", "layout": "grid",
      "options": [ { "t": "75%", "emoji": "🎯", "correct": true }, { "t": "15%", "feedback": "15 é o número de certas, não a percentagem. Faz a fração 15/20 = 75/100 = 75%.", "tag": "percent-quanto-por-cento" }, { "t": "20%", "feedback": "20 é o total, não a percentagem de certas. 15/20 = 75/100 = 75%.", "tag": "percent-quanto-por-cento" } ],
      "explain": "15/20 = 75/100 = 75%." },
    { "q": "Um jogo de 40 € com 25% de desconto fica em…", "layout": "grid",
      "options": [ { "t": "30 €", "emoji": "🏷️", "correct": true }, { "t": "15 €", "feedback": "15 € seria pagar só metade. O desconto é 10 € (25% de 40); pagas 40 − 10 = 30 €.", "tag": "percent-desconto" }, { "t": "10 €", "feedback": "10 € é o DESCONTO (25% de 40), não o que pagas. Subtrai: 40 − 10 = 30 €.", "tag": "percent-desconto" } ],
      "explain": "Desconto 10 €; pagas 40 − 10 = 30 € (75% de 40)." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-6-percentagens-final",
  "final": true,
  "title": "Percentagens",
  "questions": [
    { "q": "O símbolo % significa…", "layout": "grid",
      "options": [ { "t": "por cem (sobre 100)", "emoji": "💯", "correct": true }, { "t": "multiplicar por 100", "feedback": "% não é multiplicar por 100 — é DIVIDIR por 100. 25% = 25/100.", "tag": "percent-significado" }, { "t": "mais cem", "feedback": "% não é somar cem. Quer dizer «em cada 100» — uma fração de denominador 100.", "tag": "percent-significado" } ],
      "explain": "% é «em cada 100» — uma fração de denominador 100." },
    { "q": "50% é igual a…", "layout": "grid",
      "options": [ { "t": "metade", "emoji": "✂️", "correct": true }, { "t": "um quarto", "feedback": "Um quarto é 25%. 50% = 50/100 = 1/2 — a metade.", "tag": "percent-fracao" }, { "t": "tudo", "feedback": "Tudo é 100%. 50% é só metade: 50/100 = 1/2.", "tag": "percent-fracao" } ],
      "explain": "50/100 = 1/2 = metade." },
    { "q": "75% como fração é…", "layout": "grid",
      "options": [ { "t": "3/4", "emoji": "🍕", "correct": true }, { "t": "1/4", "feedback": "1/4 é 25%, o que FALTA. 75% = 75/100 = 3/4.", "tag": "percent-fracao" }, { "t": "7/5", "feedback": "% é sempre sobre 100: 75% = 75/100, que simplifica para 3/4 (não 7/5).", "tag": "percent-fracao" } ],
      "explain": "75/100 = 3/4." },
    { "q": "Quanto é 10% de 250?", "layout": "grid",
      "options": [ { "t": "25", "emoji": "🪄", "correct": true }, { "t": "2,5", "feedback": "2,5 é 1% de 250 (÷100). 10% divide por 10: 250 ÷ 10 = 25.", "tag": "percent-calculo" }, { "t": "250", "feedback": "250 é o todo (100%). 10% é só a décima parte: 250 ÷ 10 = 25.", "tag": "percent-do-todo" } ],
      "explain": "10% = vírgula uma casa à esquerda: 25." },
    { "q": "Quanto é 50% de 60?", "layout": "grid",
      "options": [ { "t": "30", "emoji": "✂️", "correct": true }, { "t": "6", "feedback": "6 é 10% de 60 (÷10). 50% é metade: 60 ÷ 2 = 30.", "tag": "percent-calculo" }, { "t": "120", "feedback": "120 é o dobro de 60. 50% é metade, não o dobro: 60 ÷ 2 = 30.", "tag": "percent-calculo" } ],
      "explain": "50% = metade: 60 ÷ 2 = 30." },
    { "q": "Numa turma de 25, 5 usam óculos. Que percentagem?", "layout": "grid",
      "options": [ { "t": "20%", "emoji": "👓", "correct": true }, { "t": "5%", "feedback": "5 é o número de alunos com óculos, não a percentagem. Faz 5/25 = 20/100 = 20%.", "tag": "percent-quanto-por-cento" }, { "t": "25%", "feedback": "25 é o total da turma, não a percentagem. 5/25 = 20/100 = 20%.", "tag": "percent-quanto-por-cento" } ],
      "explain": "5/25 = 20/100 = 20%." },
    { "q": "Uma t-shirt de 20 € com 30% de desconto custa…", "layout": "grid",
      "options": [ { "t": "14 €", "emoji": "🏷️", "correct": true }, { "t": "6 €", "feedback": "6 € é o DESCONTO (30% de 20), não o que pagas. Subtrai: 20 − 6 = 14 €.", "tag": "percent-desconto" }, { "t": "17 €", "feedback": "Não bate certo — o desconto é 6 € (30% de 20). Pagas 20 − 6 = 14 €.", "tag": "percent-desconto" } ],
      "explain": "30% de 20 = 6 €; 20 − 6 = 14 € (ou 70% de 20)." },
    { "q": "Um desconto de 25% é o mesmo que pagar…", "layout": "grid",
      "options": [ { "t": "75% do preço", "emoji": "🧾", "correct": true }, { "t": "25% do preço", "feedback": "Os 25% são o que TIRAS, não o que pagas. Sobra 100 − 25 = 75% para pagar.", "tag": "percent-desconto" }, { "t": "metade", "feedback": "Metade seria 50% de desconto. Com 25% de desconto, pagas 75% do preço.", "tag": "percent-desconto" } ],
      "explain": "Tiras 25%, sobra 75% para pagar." },
    { "q": "100% de um número é…", "layout": "grid",
      "options": [ { "t": "o próprio número (o todo)", "emoji": "🎂", "correct": true }, { "t": "o dobro", "feedback": "O dobro seria 200%. 100% é o todo — o número tal como está.", "tag": "percent-do-todo" }, { "t": "metade", "feedback": "Metade é 50%. 100% é o bolo inteiro: o próprio número.", "tag": "percent-do-todo" } ],
      "explain": "100% é o bolo inteiro: o número tal como está." }
  ]
}
```
