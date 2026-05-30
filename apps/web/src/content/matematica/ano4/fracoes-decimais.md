# Frações e decimais 🍕

> [!NOTE] **O que vais aprender** 👀 Vais descobrir que uma **fração** e um **número com vírgula** podem dizer a mesma coisa, aprender a lê-los, escrevê-los e a compará-los — tudo com pizzas, chocolates e dinheiro! 🍕💶

Sabias que **uma fração** e **um número com vírgula** podem dizer exatamente a mesma coisa? 😍 São como dois amigos que falam línguas diferentes mas querem dizer o mesmo! Quando dizes "comi **meia** pizza" ou "comi **0,5** da pizza", estás a dizer a mesmíssima coisa. Vem comigo, isto é mais fácil do que parece! 🚀

## Duas maneiras de dizer a mesma fatia 🍕

Imagina uma pizza dividida em fatias. Podes dizer quanto comeste de **duas** formas: com uma **fração** (um número em cima e outro em baixo) ou com um **decimal** (um número com vírgula). As duas estão certas!

```fraction
{ "parts": 4, "filled": 1, "shape": "pie", "title": "1/4 da pizza = 0,25", "color": "accent" }
```

```compare
[
  { "title": "Fração", "rows": [ {"label":"metade","value":"1/2"}, {"label":"um quarto","value":"1/4"}, {"label":"três quartos","value":"3/4"}, {"label":"uma décima","value":"1/10"} ] },
  { "title": "Decimal", "highlight": true, "badge": "o mesmo!", "rows": [ {"label":"metade","value":"0,5"}, {"label":"um quarto","value":"0,25"}, {"label":"três quartos","value":"0,75"}, {"label":"uma décima","value":"0,1"} ] }
]
```

As mais importantes para guardares no coração 💚:

```keyvalue
[
  { "k": "1/2", "v": "é 0,5 — metade, como meia pizza 🍕" },
  { "k": "1/4", "v": "é 0,25 — uma fatia de quatro 🍰" },
  { "k": "3/4", "v": "é 0,75 — três fatias de quatro 🍫" },
  { "k": "1/10", "v": "é 0,1 — uma de dez fatias 🥧" }
]
```

## As casas decimais: décimas e centésimas 🔢

Depois da vírgula, cada lugar tem um nome! A **primeira** casa são as **décimas** (o inteiro partido em 10) e a **segunda** casa são as **centésimas** (o inteiro partido em 100). É como repartir 1 euro em moedas. 💶

```keyvalue
[
  { "k": "Parte inteira", "v": "o que está ANTES da vírgula — euros inteiros 💶" },
  { "k": "Décimas (1.ª casa)", "v": "0,3 quer dizer 3 décimas = 3/10 🔟" },
  { "k": "Centésimas (2.ª casa)", "v": "0,07 quer dizer 7 centésimas = 7/100 💯" },
  { "k": "0,25", "v": "lê-se «zero vírgula vinte e cinco» = 25 centésimas 🪙" }
]
```

> [!NOTE] Quando lês **0,5** dizes «zero vírgula cinco» e quer dizer **5 décimas**. Como 5 décimas é metade de 10 décimas... é mesmo metade! 🎯

## Frações no número certo da reta 📏

Os decimais vivem na **reta numérica**, mesmo entre os números inteiros. O 0,5 fica exatamente a meio do caminho entre o 0 e o 1!

```numberline
{ "min": 0, "max": 1, "start": 0.5, "step": 0.1, "title": "0,5 está a meio entre 0 e 1 → é metade!" }
```

```keyvalue
[
  { "k": "0,1", "v": "logo a seguir ao 0 — o primeiro saltinho 👣" },
  { "k": "0,5", "v": "mesmo a meio entre 0 e 1 — metade 🟰" },
  { "k": "0,9", "v": "quase a chegar ao 1 — falta um saltinho 🏁" }
]
```

## Comparar frações e decimais 🤏

Para saberes qual é maior, o segredo é pô-los na **mesma língua**: passa tudo a decimal e compara como se fossem dinheiro. Quanto mais à direita na reta, **maior** o número!

```compare
[
  { "title": "Pergunta 🤔", "rows": [
    { "label": "1/2 ou 0,3?", "value": "qual é maior?" },
    { "label": "0,75 ou 1/4?", "value": "qual é maior?" }
  ] },
  { "title": "Resposta ✅", "highlight": true, "rows": [
    { "label": "1/2 = 0,5", "value": "0,5 > 0,3 → ganha 1/2 🏆" },
    { "label": "1/4 = 0,25", "value": "0,75 > 0,25 → ganha 0,75 🏆" }
  ] }
]
```

## Um exemplo passo a passo 🔍

Vamos descobrir juntos quanto é **3/4** em decimal. Vais ver que é fácil!

```steps
[
  { "title": "1. Lê a fração", "body": "3/4 quer dizer 3 bocadinhos de 4 bocados iguais. Partimos uma coisa em 4 fatias e ficamos com 3. 🍰", "icon": "🍰" },
  { "title": "2. Descobre quanto vale 1 fatia", "body": "Imagina 1 euro = 100 cêntimos. Divide os 100 cêntimos por 4: cada fatia vale 25 cêntimos = 0,25. 💶", "icon": "💶" },
  { "title": "3. Junta as fatias que tens", "body": "Tens 3 fatias: 0,25 + 0,25 + 0,25 = 0,75. 🧮", "icon": "🧮" },
  { "title": "4. Escreve a resposta", "body": "Então 3/4 = 0,75! E lê-se «zero vírgula setenta e cinco». ✅", "icon": "✅" }
]
```

> **Truque:** para passar uma fração simples a decimal, **pensa em euros e cêntimos** 💶. 1 euro vale 100 cêntimos: **1/2** → metade de 100 = 50 → **0,5**; **1/4** → 100÷4 = 25 → **0,25**; **1/10** → 100÷10 = 10 → **0,1**. O que sobra de 1 euro é a tua vírgula! 🤑

> [!TIP] **Para saberes mais** 🌱 Nem todas as frações dão decimais "bonitos". Por exemplo, **1/3** dá **0,333...** com os 3 a repetirem-se para sempre! 😲 Chama-se uma **dízima infinita**. Por isso, às vezes é mais simples deixar ficar a fração 1/3 do que escrever a vírgula.

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-fracoes-decimais-pratica",
  "questions": [
    { "q": "Quanto é 1/2 em decimal?", "layout": "grid",
      "options": [ { "t": "0,5", "correct": true, "emoji": "🍕" }, { "t": "0,25" }, { "t": "0,1" } ],
      "explain": "Metade de 1 é 0,5. Certinho!" },
    { "q": "Qual destas frações vale 0,1?", "layout": "grid",
      "options": [ { "t": "1/2" }, { "t": "1/4" }, { "t": "1/10", "correct": true, "emoji": "🥧" } ],
      "explain": "Uma de dez partes é 1/10 = 0,1." },
    { "q": "Quanto é 1/4 em decimal?", "layout": "grid",
      "options": [ { "t": "0,25", "correct": true, "emoji": "🍰" }, { "t": "0,5" }, { "t": "0,4" } ],
      "explain": "100 cêntimos a dividir por 4 dá 25 → 0,25." },
    { "q": "Quanto é 3/4 em decimal?", "layout": "grid",
      "options": [ { "t": "0,75", "correct": true, "emoji": "🍫" }, { "t": "0,3" }, { "t": "0,34" } ],
      "explain": "São 3 fatias de 0,25: 0,25+0,25+0,25 = 0,75." },
    { "q": "Em 0,5, o 5 está nas...", "layout": "grid",
      "options": [ { "t": "décimas", "correct": true, "emoji": "🔟" }, { "t": "centésimas" }, { "t": "unidades" } ],
      "explain": "A primeira casa depois da vírgula são as décimas." },
    { "q": "Qual é maior?", "layout": "grid",
      "options": [ { "t": "1/2", "correct": true }, { "t": "0,25" }, { "t": "0,3" } ],
      "explain": "1/2 = 0,5, e 0,5 é maior do que 0,25 e do que 0,3." },
    { "q": "0,75 é o mesmo que...", "layout": "grid",
      "options": [ { "t": "três quartos (3/4)", "correct": true, "emoji": "🍫" }, { "t": "um quarto (1/4)" }, { "t": "metade (1/2)" } ],
      "explain": "0,75 = 3/4, três fatias de quatro." },
    { "q": "Na reta numérica, onde fica o 0,5?", "layout": "grid",
      "options": [ { "t": "a meio entre 0 e 1", "correct": true, "emoji": "📏" }, { "t": "depois do 1" }, { "t": "antes do 0" } ],
      "explain": "0,5 é metade, por isso fica mesmo a meio entre 0 e 1." },
    { "q": "Em 0,07, o 7 está nas...", "layout": "grid",
      "options": [ { "t": "centésimas", "correct": true, "emoji": "💯" }, { "t": "décimas" }, { "t": "dezenas" } ],
      "explain": "A segunda casa depois da vírgula são as centésimas." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-fracoes-decimais-final",
  "final": true,
  "title": "Frações e decimais",
  "questions": [
    { "q": "1/4 escreve-se em decimal como...", "layout": "grid",
      "options": [ { "t": "0,25", "correct": true }, { "t": "0,5" }, { "t": "0,4" } ],
      "explain": "100 cêntimos a dividir por 4 dá 25 → 0,25." },
    { "q": "0,5 é o mesmo que...", "layout": "grid",
      "options": [ { "t": "metade (1/2)", "correct": true, "emoji": "🍰" }, { "t": "um quarto (1/4)" }, { "t": "uma décima (1/10)" } ],
      "explain": "0,5 é metade, ou seja 1/2." },
    { "q": "Qual é maior?", "layout": "grid",
      "options": [ { "t": "1/2", "correct": true }, { "t": "0,25" }, { "t": "São iguais" } ],
      "explain": "1/2 = 0,5, e 0,5 é maior do que 0,25." },
    { "q": "1/10 em decimal é...", "layout": "grid",
      "options": [ { "t": "0,1", "correct": true, "emoji": "🥧" }, { "t": "1,0" }, { "t": "0,01" } ],
      "explain": "Uma de dez partes é 0,1." },
    { "q": "3/4 em decimal é...", "layout": "grid",
      "options": [ { "t": "0,75", "correct": true, "emoji": "🍫" }, { "t": "0,34" }, { "t": "0,7" } ],
      "explain": "São 3 fatias de 0,25, que dão 0,75." },
    { "q": "A primeira casa depois da vírgula chama-se...", "layout": "grid",
      "options": [ { "t": "décimas", "correct": true, "emoji": "🔟" }, { "t": "centésimas" }, { "t": "milésimas" } ],
      "explain": "A 1.ª casa são as décimas; a 2.ª são as centésimas." },
    { "q": "Qual destes números é maior?", "layout": "grid",
      "options": [ { "t": "0,9", "correct": true, "emoji": "🏁" }, { "t": "1/2" }, { "t": "0,25" } ],
      "explain": "0,9 está quase a chegar ao 1, maior que 0,5 e 0,25." },
    { "q": "0,25 lê-se...", "layout": "grid",
      "options": [ { "t": "zero vírgula vinte e cinco", "correct": true, "emoji": "🪙" }, { "t": "vinte e cinco" }, { "t": "dois vírgula cinco" } ],
      "explain": "0,25 são 25 centésimas: «zero vírgula vinte e cinco»." },
    { "q": "A Matilde comeu 1/2 do bolo e o Rui comeu 0,5 do dele. Quem comeu mais?", "layout": "grid",
      "options": [ { "t": "comeram o mesmo", "correct": true, "emoji": "🎉" }, { "t": "a Matilde" }, { "t": "o Rui" } ],
      "explain": "1/2 = 0,5, por isso comeram exatamente o mesmo!" }
  ]
}
```
