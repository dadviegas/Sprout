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

Vê com os teus olhos: **1/2** e **5/10** pintam exatamente a mesma parte da barra — por isso são a mesma fatia e valem **0,5**.

```fractionstrips
{ "mode": "equivalent", "title": "1/2 = 5/10 = 0,5", "color": "accent",
  "rows": [ { "parts": 2, "filled": 1 }, { "parts": 10, "filled": 5 } ] }
```

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
    { "gen": { "kind": "fraction", "shape": "bar", "max": 8 } },
    { "q": "Que decimal vale a parte pintada?", "layout": "grid",
      "figure": { "parts": 2, "filled": 1, "shape": "pie", "color": "accent" },
      "options": [ { "t": "0,5", "correct": true }, { "t": "0,25", "feedback": "0,25 é um quarto. Aqui está pintada metade: 1/2 = 0,5.", "tag": "fracao-metade-quarto" }, { "t": "0,1", "feedback": "0,1 é uma décima. Metade de uma figura vale 0,5.", "tag": "decimal-decimas-centesimas" } ],
      "explain": "Está pintada 1 de 2 partes: 1/2 = 0,5." },
    { "q": "Quanto é 1/2 em decimal?", "layout": "grid",
      "options": [ { "t": "0,5", "correct": true, "emoji": "🍕" }, { "t": "0,25", "feedback": "0,25 é um quarto. Metade é maior: 0,5.", "tag": "fracao-metade-quarto" }, { "t": "0,1", "feedback": "0,1 é uma décima. Metade de 1 são 5 décimas: 0,5.", "tag": "decimal-decimas-centesimas" } ],
      "explain": "Metade de 1 é 0,5. Certinho!" },
    { "q": "Qual destas frações vale 0,1?", "layout": "grid",
      "options": [ { "t": "1/2", "feedback": "1/2 vale 0,5. Para 0,1 queres uma décima: 1/10.", "tag": "fracao-decimal-equivalencia" }, { "t": "1/4", "feedback": "1/4 vale 0,25. Para 0,1 queres 1/10.", "tag": "fracao-decimal-equivalencia" }, { "t": "1/10", "correct": true, "emoji": "🥧" } ],
      "explain": "Uma de dez partes é 1/10 = 0,1." },
    { "q": "Quanto é 1/4 em decimal?", "layout": "grid",
      "options": [ { "t": "0,25", "correct": true, "emoji": "🍰" }, { "t": "0,5", "feedback": "0,5 é metade. Um quarto é metade da metade: 0,25.", "tag": "fracao-metade-quarto" }, { "t": "0,4", "feedback": "O 4 no denominador não vira 0,4. Um quarto é 1 ÷ 4 = 0,25.", "tag": "fracao-decimal-equivalencia" } ],
      "explain": "100 cêntimos a dividir por 4 dá 25 → 0,25." },
    { "q": "Quanto é 3/4 em decimal?", "layout": "grid",
      "options": [ { "t": "0,75", "correct": true, "emoji": "🍫" }, { "t": "0,3", "feedback": "0,3 são três décimas. 3/4 são três quartos: 0,75.", "tag": "fracao-decimal-equivalencia" }, { "t": "0,34", "feedback": "Não juntes o 3 e o 4 depois da vírgula. 3/4 = 3 ÷ 4 = 0,75.", "tag": "fracao-leitura-junta" } ],
      "explain": "São 3 fatias de 0,25: 0,25+0,25+0,25 = 0,75." },
    { "q": "Em 0,5, o 5 está nas...", "layout": "grid",
      "options": [ { "t": "décimas", "correct": true, "emoji": "🔟" }, { "t": "centésimas", "feedback": "Centésimas são a segunda casa. Em 0,5 há só uma casa: décimas.", "tag": "decimal-decimas-centesimas" }, { "t": "unidades", "feedback": "Unidades ficam antes da vírgula. O 5 está depois da vírgula: décimas.", "tag": "decimal-lados-virgula" } ],
      "explain": "A primeira casa depois da vírgula são as décimas." },
    { "q": "Qual é maior?", "layout": "grid",
      "options": [ { "t": "1/2", "correct": true }, { "t": "0,25", "feedback": "0,25 é um quarto. 1/2 vale 0,5, que é maior.", "tag": "decimal-comparacao" }, { "t": "0,3", "feedback": "0,3 é menor que 0,5. 1/2 vale 0,5.", "tag": "decimal-comparacao" } ],
      "explain": "1/2 = 0,5, e 0,5 é maior do que 0,25 e do que 0,3." },
    { "q": "0,75 é o mesmo que...", "layout": "grid",
      "options": [ { "t": "três quartos (3/4)", "correct": true, "emoji": "🍫" }, { "t": "um quarto (1/4)", "feedback": "Um quarto é 0,25. 0,75 são três quartos.", "tag": "fracao-quartos" }, { "t": "metade (1/2)", "feedback": "Metade é 0,5. 0,75 é maior: três quartos.", "tag": "fracao-metade-quarto" } ],
      "explain": "0,75 = 3/4, três fatias de quatro." },
    { "q": "Na reta numérica, onde fica o 0,5?", "layout": "grid",
      "options": [ { "t": "a meio entre 0 e 1", "correct": true, "emoji": "📏" }, { "t": "depois do 1", "feedback": "0,5 é menor que 1, por isso fica antes do 1.", "tag": "decimal-maior-menor-que-um" }, { "t": "antes do 0", "feedback": "0,5 é positivo: fica entre 0 e 1, a meio.", "tag": "decimal-reta-numerica" } ],
      "explain": "0,5 é metade, por isso fica mesmo a meio entre 0 e 1." },
    { "q": "Em 0,07, o 7 está nas...", "layout": "grid",
      "options": [ { "t": "centésimas", "correct": true, "emoji": "💯" }, { "t": "décimas", "feedback": "Em 0,07 há zero décimas e 7 centésimas. O 7 está na segunda casa.", "tag": "decimal-decimas-centesimas" }, { "t": "dezenas", "feedback": "Dezenas ficam antes da vírgula. Depois da vírgula temos décimas e centésimas.", "tag": "decimal-casas-vs-inteiros" } ],
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
      "options": [ { "t": "0,25", "correct": true }, { "t": "0,5", "feedback": "0,5 é metade. Um quarto vale 0,25.", "tag": "fracao-metade-quarto" }, { "t": "0,4", "feedback": "O denominador 4 não vira 0,4. Um quarto é 0,25.", "tag": "fracao-decimal-equivalencia" } ],
      "explain": "100 cêntimos a dividir por 4 dá 25 → 0,25." },
    { "q": "0,5 é o mesmo que...", "layout": "grid",
      "options": [ { "t": "metade (1/2)", "correct": true, "emoji": "🍰" }, { "t": "um quarto (1/4)", "feedback": "Um quarto é 0,25. 0,5 é metade.", "tag": "fracao-metade-quarto" }, { "t": "uma décima (1/10)", "feedback": "Uma décima é 0,1. 0,5 são cinco décimas: metade.", "tag": "decimal-decimas-centesimas" } ],
      "explain": "0,5 é metade, ou seja 1/2." },
    { "q": "Qual é maior?", "layout": "grid",
      "options": [ { "t": "1/2", "correct": true }, { "t": "0,25", "feedback": "0,25 é um quarto. 1/2 vale 0,5, que é maior.", "tag": "decimal-comparacao" }, { "t": "São iguais", "feedback": "Não são iguais: 1/2 = 0,5 e 0,25 = 1/4.", "tag": "fracao-decimal-equivalencia" } ],
      "explain": "1/2 = 0,5, e 0,5 é maior do que 0,25." },
    { "q": "1/10 em decimal é...", "layout": "grid",
      "options": [ { "t": "0,1", "correct": true, "emoji": "🥧" }, { "t": "1,0", "feedback": "1,0 é um inteiro. 1/10 é uma parte de dez: 0,1.", "tag": "decimal-parte-inteira" }, { "t": "0,01", "feedback": "0,01 é uma centésima. 1/10 é uma décima: 0,1.", "tag": "decimal-decimas-centesimas" } ],
      "explain": "Uma de dez partes é 0,1." },
    { "q": "3/4 em decimal é...", "layout": "grid",
      "options": [ { "t": "0,75", "correct": true, "emoji": "🍫" }, { "t": "0,34", "feedback": "Não juntes 3 e 4 depois da vírgula. 3/4 = 0,75.", "tag": "fracao-leitura-junta" }, { "t": "0,7", "feedback": "0,7 são sete décimas. 3/4 são 75 centésimas: 0,75.", "tag": "decimal-decimas-centesimas" } ],
      "explain": "São 3 fatias de 0,25, que dão 0,75." },
    { "q": "A primeira casa depois da vírgula chama-se...", "layout": "grid",
      "options": [ { "t": "décimas", "correct": true, "emoji": "🔟" }, { "t": "centésimas", "feedback": "Centésimas são a segunda casa. A primeira casa são as décimas.", "tag": "decimal-decimas-centesimas" }, { "t": "milésimas", "feedback": "Milésimas são a terceira casa. A primeira casa são as décimas.", "tag": "decimal-casas-vs-inteiros" } ],
      "explain": "A 1.ª casa são as décimas; a 2.ª são as centésimas." },
    { "q": "Qual destes números é maior?", "layout": "grid",
      "options": [ { "t": "0,9", "correct": true, "emoji": "🏁" }, { "t": "1/2", "feedback": "1/2 vale 0,5. 0,9 é maior porque está quase no 1.", "tag": "decimal-comparacao" }, { "t": "0,25", "feedback": "0,25 é um quarto. 0,9 é muito maior, quase 1 inteiro.", "tag": "decimal-comparacao" } ],
      "explain": "0,9 está quase a chegar ao 1, maior que 0,5 e 0,25." },
    { "q": "0,25 lê-se...", "layout": "grid",
      "options": [ { "t": "zero vírgula vinte e cinco", "correct": true, "emoji": "🪙" }, { "t": "vinte e cinco", "feedback": "A vírgula não desaparece: 0,25 é menor que 1, não é 25.", "tag": "decimal-ignora-virgula" }, { "t": "dois vírgula cinco", "feedback": "2,5 é dois inteiros e meio. 0,25 são zero vírgula vinte e cinco.", "tag": "decimal-leitura-posicional" } ],
      "explain": "0,25 são 25 centésimas: «zero vírgula vinte e cinco»." },
    { "q": "A Matilde comeu 1/2 do bolo e o Rui comeu 0,5 do dele. Quem comeu mais?", "layout": "grid",
      "options": [ { "t": "comeram o mesmo", "correct": true, "emoji": "🎉" }, { "t": "a Matilde", "feedback": "1/2 e 0,5 representam a mesma metade. Ninguém comeu mais.", "tag": "fracao-decimal-equivalencia" }, { "t": "o Rui", "feedback": "0,5 é exatamente 1/2. Comeram a mesma parte.", "tag": "fracao-decimal-equivalencia" } ],
      "explain": "1/2 = 0,5, por isso comeram exatamente o mesmo!" }
  ]
}
```
