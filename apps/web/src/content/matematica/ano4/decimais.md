# Números decimais 🔢

> [!NOTE] **O que vais aprender** 👀 Vais descobrir os números que vivem **entre** os inteiros — como o 0,5 ou o 3,75 — e aprender a lê-los, a compará-los e a usá-los no dinheiro e nas medidas. 🧃

Já reparaste que nem tudo se conta com números certinhos? Às vezes só bebes **meio** copo de sumo 🧃, ou compras **1,5 kg** de maçãs 🍎. Para escrever esses bocadinhos a mais, os matemáticos inventaram um sinal mágico: a **vírgula**! Vem comigo descobrir como ela funciona. ✨

## A vírgula separa duas partes ✂️

Um número decimal tem sempre uma **vírgula** no meio. Ela é como uma cerca: à esquerda fica a parte inteira, à direita ficam os bocadinhos.

```keyvalue
[
  { "k": "Parte inteira", "v": "fica à ESQUERDA da vírgula — são os inteiros completos 🍰" },
  { "k": "Vírgula", "v": "a cerca que separa as duas partes ✂️" },
  { "k": "Parte decimal", "v": "fica à DIREITA da vírgula — são os bocadinhos a mais 🧩" },
  { "k": "Exemplo: 3,7", "v": "lê-se «três vírgula sete» = 3 inteiros e 7 décimas" }
]
```

Em Portugal usamos **vírgula** (3,7) e nunca o ponto. O ponto (3.7) é o sistema inglês — guarda essa para mais tarde! 🇵🇹

## As casas decimais: décimas e centésimas 🔍

Depois da vírgula, cada lugar tem um nome. A **1.ª casa** são as **décimas** (1 inteiro partido em 10) e a **2.ª casa** são as **centésimas** (1 inteiro partido em 100).

```compare
[
  { "title": "Décimas (1 casa) 🔟", "rows": [
    { "label": "0,1", "value": "uma décima = 1 bocadinho de 10" },
    { "label": "0,3", "value": "três décimas" },
    { "label": "0,9", "value": "nove décimas, quase 1 inteiro!", "highlight": true }
  ] },
  { "title": "Centésimas (2 casas) 💯", "rows": [
    { "label": "0,01", "value": "uma centésima = 1 bocadinho de 100" },
    { "label": "0,25", "value": "vinte e cinco centésimas = um quarto" },
    { "label": "0,75", "value": "setenta e cinco centésimas = três quartos", "highlight": true }
  ] }
]
```

> [!TIP] Uma moeda de **1 cêntimo** é exatamente **uma centésima** de euro: são precisas 100 para fazer 1 € inteiro! 💶

## Decimais e frações são amigos 🤝

Um número decimal é só outra maneira de escrever uma **fração**. Olha: meio bolo pode ser **1/2** ou **0,5** — é a mesma fatia! 🍰

```fraction
{ "parts": 2, "filled": 1, "shape": "pie", "title": "Metade da pizza = 1/2 = 0,5", "color": "accent" }
```

```fraction
{ "parts": 4, "filled": 1, "shape": "bar", "title": "Um quarto da tablete = 1/4 = 0,25", "color": "primary" }
```

E aqui está a ponte para os decimais: **metade** é o mesmo que **5 décimas**. Corta a barra em 10 e pinta 5 — fica exatamente a mesma metade! Por isso **1/2 = 5/10 = 0,5**.

```fractionstrips
{ "mode": "equivalent", "title": "1/2 = 5/10 = 0,5", "color": "accent",
  "rows": [ { "parts": 2, "filled": 1 }, { "parts": 10, "filled": 5 } ] }
```

```keyvalue
[
  { "k": "1/2", "v": "= 0,5  (metade) 🍰" },
  { "k": "1/4", "v": "= 0,25 (um quarto) 🍕" },
  { "k": "3/4", "v": "= 0,75 (três quartos) 🍫" },
  { "k": "1/10", "v": "= 0,1  (uma décima) 🧩" }
]
```

## Comparar decimais na reta 📏

Para saber qual é maior, imagina uma **reta** com os números em fila. Quem está mais à **direita** é o maior. Por exemplo, o 0,7 está mais à frente que o 0,4:

```numberline
{ "min": 0, "max": 1, "start": 0.7, "step": 0.1, "title": "0,7 está mais à frente que 0,4 → 0,7 é maior!" }
```

O truque é olhar primeiro para a parte inteira. Se for igual, comparas as décimas, depois as centésimas.

```steps
[
  { "title": "1.º — a parte inteira", "body": "1,2 é maior que 0,9 porque 1 é maior que 0 📈", "icon": "🔢" },
  { "title": "2.º — as décimas", "body": "se a parte inteira é igual, vês a 1.ª casa: 0,8 é maior que 0,3 🥇", "icon": "🔟" },
  { "title": "3.º — as centésimas", "body": "se também forem iguais, vês a 2.ª casa: 0,45 é maior que 0,42 ✅", "icon": "💯" }
]
```

## Dinheiro e medidas usam decimais 💶

Os decimais estão por todo o lado na vida real! No dinheiro, a vírgula separa os **euros** dos **cêntimos**. Nas medidas, separa os **metros** ou **litros** inteiros dos bocadinhos.

```stats
[
  { "label": "1,50 €", "value": "1 euro e 50 cêntimos", "hint": "a vírgula separa euros de cêntimos 💶" },
  { "label": "2,5 L", "value": "dois litros e meio", "hint": "uma garrafa grande de sumo 🧃" },
  { "label": "1,75 m", "value": "1 metro e 75 centímetros", "hint": "mais ou menos a altura de um adulto 🧍" },
  { "label": "0,5 kg", "value": "meio quilo", "hint": "= 500 gramas de bananas 🍌" }
]
```

## Um exemplo passo a passo 🔍

Vamos resolver juntos: *«Tens 2,50 € e gastas 1,20 € num gelado 🍦. Com quanto ficas?»* Calma, fazemos passo a passo.

```steps
[
  { "title": "1. Alinha as vírgulas", "body": "escreve 2,50 por cima de 1,20, com as vírgulas mesmo uma debaixo da outra 📐", "icon": "📝" },
  { "title": "2. Subtrai os cêntimos", "body": "50 cêntimos menos 20 cêntimos = 30 cêntimos → 0,30 🪙", "icon": "🪙" },
  { "title": "3. Subtrai os euros", "body": "2 euros menos 1 euro = 1 euro → 1 💶", "icon": "💶" },
  { "title": "4. Junta tudo", "body": "1 euro e 30 cêntimos = 1,30 € ✅", "icon": "✅" },
  { "title": "5. Resposta", "body": "ficas com 1,30 € — ainda dá para um sumo! 🧃", "icon": "🎉" }
]
```

> **Truque:** quando somas ou subtrais decimais, **alinha sempre as vírgulas** uma debaixo da outra — assim as décimas ficam com as décimas e nunca te enganas! 📐

> [!TIP] **Para saberes mais** 🌱 Os zeros à direita no fim não mudam o valor: **0,5 = 0,50 = 0,500**! São todos «meio». Mas atenção — o zero **antes** muda tudo: 0,5 é meio, mas 0,05 é só cinco centésimas, muito mais pequeno. 🔬

## Vamos praticar 🎈

```quiz
{
  "id": "mat4-dec-pratica",
  "questions": [
    { "gen": { "kind": "fraction", "shape": "pie", "max": 8 } },
    { "q": "Que decimal vale a parte pintada?", "layout": "grid",
      "figure": { "parts": 4, "filled": 1, "shape": "pie", "color": "primary" },
      "options": [ { "t": "0,25", "correct": true }, { "t": "0,5" }, { "t": "0,75" } ],
      "explain": "Está pintada 1 de 4 partes: 1/4 = 0,25." },
    { "q": "Como se lê 2,5?", "layout": "grid",
      "options": [ { "t": "dois vírgula cinco", "emoji": "🔢", "correct": true }, { "t": "vinte e cinco" }, { "t": "vinte e cinco mil" } ],
      "explain": "A vírgula lê-se «vírgula»: dois vírgula cinco." },
    { "q": "Quanto é meio (metade de 1) em decimal?", "layout": "grid",
      "options": [ { "t": "0,5", "emoji": "🍰", "correct": true }, { "t": "5,0" }, { "t": "1,5" } ],
      "explain": "Metade de 1 é 0,5." },
    { "q": "O número à direita da vírgula é a parte…", "layout": "grid",
      "options": [ { "t": "decimal", "emoji": "🧩", "correct": true }, { "t": "inteira" } ],
      "explain": "À direita da vírgula fica a parte decimal." },
    { "q": "Quanto vale 1/4 em decimal?", "layout": "grid",
      "options": [ { "t": "0,25", "emoji": "🍕", "correct": true }, { "t": "0,5" }, { "t": "0,75" } ],
      "explain": "Um quarto (1/4) é igual a 0,25." },
    { "q": "Qual é maior: 0,7 ou 0,4?", "layout": "grid",
      "options": [ { "t": "0,7", "emoji": "📈", "correct": true }, { "t": "0,4" } ],
      "explain": "Na reta, 0,7 está mais à direita, por isso é maior." },
    { "q": "1,50 € são…", "layout": "grid",
      "options": [ { "t": "1 euro e 50 cêntimos", "emoji": "💶", "correct": true }, { "t": "150 euros" }, { "t": "15 cêntimos" } ],
      "explain": "A vírgula separa os euros dos cêntimos." },
    { "q": "Em Portugal, para escrever decimais usamos…", "layout": "grid",
      "options": [ { "t": "a vírgula (3,7)", "emoji": "🇵🇹", "correct": true }, { "t": "o ponto (3.7)" } ],
      "explain": "Em Portugal usa-se a vírgula; o ponto é o sistema inglês." },
    { "q": "A 1.ª casa depois da vírgula são as…", "layout": "grid",
      "options": [ { "t": "décimas", "emoji": "🔟", "correct": true }, { "t": "centenas" }, { "t": "dezenas" } ],
      "explain": "A 1.ª casa decimal são as décimas (1 partido em 10)." },
    { "q": "0,5 é o mesmo que…", "layout": "grid",
      "options": [ { "t": "0,50", "emoji": "🟰", "correct": true }, { "t": "0,05" }, { "t": "5,0" } ],
      "explain": "Os zeros à direita não mudam o valor: 0,5 = 0,50." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat4-dec-final",
  "final": true,
  "title": "Números decimais",
  "questions": [
    { "q": "Qual destes é maior?", "layout": "grid",
      "options": [ { "t": "1,2", "emoji": "📈", "correct": true }, { "t": "0,9" }, { "t": "0,5" } ],
      "explain": "1,2 já passou de 1 inteiro, por isso é o maior." },
    { "q": "1,50 € são…", "layout": "grid",
      "options": [ { "t": "1 euro e 50 cêntimos", "emoji": "💶", "correct": true }, { "t": "150 euros" }, { "t": "15 cêntimos" } ],
      "explain": "A vírgula separa os euros dos cêntimos." },
    { "q": "O número à direita da vírgula é a parte…", "layout": "grid",
      "options": [ { "t": "decimal", "emoji": "🧩", "correct": true }, { "t": "inteira" } ],
      "explain": "À direita da vírgula fica a parte decimal." },
    { "q": "0,25 é o mesmo que…", "layout": "grid",
      "options": [ { "t": "um quarto", "emoji": "🍕", "correct": true }, { "t": "metade" }, { "t": "o dobro" } ],
      "explain": "0,25 é igual a um quarto (1/4)." },
    { "q": "Quanto vale 3/4 em decimal?", "layout": "grid",
      "options": [ { "t": "0,75", "emoji": "🍫", "correct": true }, { "t": "0,25" }, { "t": "0,5" } ],
      "explain": "Três quartos (3/4) é igual a 0,75." },
    { "q": "Para somar 2,50 + 1,20, primeiro deves…", "layout": "grid",
      "options": [ { "t": "alinhar as vírgulas uma debaixo da outra", "emoji": "📐", "correct": true }, { "t": "apagar as vírgulas" } ],
      "explain": "Alinhamos as vírgulas para somar décimas com décimas." },
    { "q": "Quantos cêntimos fazem 1 euro inteiro?", "layout": "grid",
      "options": [ { "t": "100", "emoji": "💯", "correct": true }, { "t": "10" }, { "t": "1000" } ],
      "explain": "1 cêntimo é uma centésima de euro; são precisos 100." },
    { "q": "Qual é maior: 0,5 ou 0,05?", "layout": "grid",
      "options": [ { "t": "0,5", "emoji": "🥇", "correct": true }, { "t": "0,05" } ],
      "explain": "0,5 é meio; 0,05 é só cinco centésimas, muito mais pequeno." },
    { "q": "A 2.ª casa depois da vírgula são as…", "layout": "grid",
      "options": [ { "t": "centésimas", "emoji": "💯", "correct": true }, { "t": "centenas" }, { "t": "dezenas" } ],
      "explain": "A 2.ª casa decimal são as centésimas (1 partido em 100)." }
  ]
}
```
