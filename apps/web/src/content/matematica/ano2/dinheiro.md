# O dinheiro (euros) 💶

> [!NOTE] **O que vais aprender** 👀 Vais conhecer as **moedas** e as **notas** do euro, aprender a **contar dinheiro**, a **pagar** numa loja e a calcular o **troco**. No fim já sabes ir às compras sozinho! 🛒

Imagina que vais à loja comprar um gelado. Como pagas? Com **dinheiro**! 💶 Em Portugal usamos o **euro** (€). Há moedas pequeninas e notas coloridas, e cada uma vale uma quantia diferente. Vem comigo encher o mealheiro e aprender a contar! 🐷🪙

## As moedas do euro 🪙

As **moedas** são redondas e feitas de metal. Há **oito** moedas: umas valem **cêntimos** e duas valem **euros**.

```keyvalue
[
  { "k": "Cêntimos pequenos", "v": "1c, 2c, 5c — são de cor castanha (cobre) 🟤" },
  { "k": "Cêntimos médios", "v": "10c, 20c, 50c — são douradas ✨" },
  { "k": "Moeda de 1 euro", "v": "vale 100 cêntimos 🪙" },
  { "k": "Moeda de 2 euros", "v": "a que vale mais de todas as moedas 🪙" }
]
```

> **100 cêntimos = 1 euro.** Tal como 100 unidades fazem uma centena, 100 cêntimos fazem 1€! 💡

## As notas do euro 💶

As **notas** são de papel e têm cada uma a sua **cor**. Quanto maior o número, mais a nota vale.

```compare
[
  { "title": "Notas pequenas 💶", "rows": [
    { "label": "5€", "value": "cinzenta" },
    { "label": "10€", "value": "vermelha" },
    { "label": "20€", "value": "azul", "highlight": true }
  ] },
  { "title": "Notas grandes 💰", "rows": [
    { "label": "50€", "value": "cor de laranja" },
    { "label": "100€", "value": "verde" },
    { "label": "200€", "value": "amarela" }
  ] }
]
```

> [!TIP] Uma maneira fácil de saber se é **moeda** ou **nota**: a moeda é de **metal** e faz barulho quando cai; a nota é de **papel** e dobra-se. 🪙💶

## Faz o teu mealheiro 🐷

Toca nas moedas para as juntar e chegar ao objetivo. Vê quantas maneiras diferentes existem de fazer a mesma quantia!

```money
{ "title": "Junta 1 euro", "items": [0.5, 0.2, 0.2, 0.1], "target": 1 }
```

Experimenta também este, que tem cêntimos mais pequenos:

```money
{ "title": "Junta 80 cêntimos", "items": [0.5, 0.2, 0.1, 0.05, 0.05], "target": 0.8 }
```

> [!TIP] Para pagar mais depressa, começa pelas moedas **maiores** (50c, 20c) e só depois juntas as pequeninas. 🪙

## Quanto vale mais? ⚖️

Comparar dinheiro é fácil: vê quem tem o **número maior**. Uma nota vale sempre mais do que uma moeda do mesmo número!

```stats
[
  { "label": "2€", "value": "= 200c", "hint": "a moeda que vale mais 🪙" },
  { "label": "5€", "value": "= 500c", "hint": "a nota mais pequena 💶" },
  { "label": "1€", "value": "= 100c", "hint": "cem cêntimos 💯" }
]
```

> Uma **nota de 5€** vale mais do que uma **moeda de 2€**, porque 5 é maior que 2! 😎

E os preços, também se comparam! Olha o lanche no bar da escola — num gráfico vês logo o mais caro e o mais barato:

```chart
{ "type": "bar", "title": "Preços do lanche (cêntimos)",
  "labels": ["🥖 Pão", "🥛 Leite", "🧃 Sumo", "🍎 Maçã"], "data": [80, 50, 60, 30],
  "unit": "cêntimos",
  "say": "O pão custa oitenta cêntimos, o leite cinquenta, o sumo sessenta e a maçã trinta. A maçã é o lanche mais barato!" }
```

## Pagar e dar o troco 🛒

Quando pagas com **mais** dinheiro do que o preço, recebes **troco** de volta. O troco é o que sobra!

```steps
[
  { "title": "Vê o preço", "body": "o gelado custa 1€ 🍦", "icon": "🏷️" },
  { "title": "Vê o que dás", "body": "tens uma moeda de 2€ 🪙", "icon": "🪙" },
  { "title": "Faz a subtração", "body": "2€ − 1€ = 1€", "icon": "➖" },
  { "title": "Recebes o troco", "body": "ficas com 1€ de troco 🎉", "icon": "💶" }
]
```

Agora és **tu** a pagar! Toca nas notas e nas moedas até teres o dinheiro certo:

```money
{ "title": "Um gelado 🍦", "price": 1.5 }
```

E este, que tem cêntimos? Começa pela moeda **maior** e vai juntando as pequeninas:

```money
{ "title": "Uma caixa de lápis ✏️", "price": 2.35 }
```

## Um exemplo passo a passo 🔍

Imagina: *«Compras um pão por 80c e pagas com uma moeda de 1€. Quanto é o troco?»* Vamos resolver com calma. 🥖

```steps
[
  { "title": "1. Lê o problema", "body": "o pão custa 80c e tu pagas com 1€ 🧐" },
  { "title": "2. Põe tudo em cêntimos", "body": "1€ = 100c (assim ficam os mesmos números)" },
  { "title": "3. Faz a subtração", "body": "100c − 80c = 20c ➖" },
  { "title": "4. Resposta", "body": "o troco é 20 cêntimos! ✅" }
]
```

> **Truque:** para dar troco rápido, **conta para a frente** a partir do preço até chegares ao dinheiro que deste. De 80c… +20c = 1€. O que somaste é o troco! 📌

> [!TIP] **Para saberes mais** 🌱 O euro não é só de Portugal! É usado em **20 países** da Europa (como Espanha, França e Itália) — chama-se a **Zona Euro**. As notas são iguais em todos, mas cada país desenha o **verso** das suas moedas. A nossa moeda portuguesa tem os antigos **selos reais**! 🇵🇹💶

## O Jogo do Dinheiro 🎮💰

Agora é a brincar! Em cada problema, **resolve a conta** e depois **paga com as
moedas e notas certas**. Acerta nos dois e ganhas uma ⭐ — junta 3 estrelas e
**sobes de nível**! Começa por **«Juntar tudo»** e, quando quiseres, experimenta
os níveis mais difíceis. 🚀

```dinheirojogo
{
  "title": "Resolve e paga!",
  "startLevel": 1
}
```

## Vamos praticar 🎈

```quiz
{
  "id": "mat2-dinheiro-pratica",
  "questions": [
    { "q": "Que dinheiro usamos em Portugal?", "layout": "grid",
      "options": [ { "t": "o euro", "emoji": "💶", "correct": true }, { "t": "o dólar", "emoji": "💵", "feedback": "O dólar é dos Estados Unidos. Em Portugal usamos o euro.", "tag": "dinheiro-moeda-pais" }, { "t": "a libra", "feedback": "A libra é de Inglaterra. Em Portugal usamos o euro.", "tag": "dinheiro-moeda-pais" } ],
      "explain": "Em Portugal usamos o euro (€)." },
    { "q": "Quantos cêntimos são 1 euro?", "layout": "grid",
      "options": [ { "t": "100", "emoji": "💯", "correct": true }, { "t": "10", "feedback": "10 cêntimos são só um décimo de euro. 1 euro tem 100 cêntimos.", "tag": "dinheiro-centimos-euro" }, { "t": "50", "feedback": "50 cêntimos é meio euro. 1 euro inteiro tem 100 cêntimos.", "tag": "dinheiro-centimos-euro" } ],
      "explain": "1 euro = 100 cêntimos." },
    { "q": "50c + 50c = ?", "layout": "grid",
      "options": [ { "t": "1€", "emoji": "🪙", "correct": true }, { "t": "5€", "feedback": "50 + 50 = 100 cêntimos = 1€, não 5€.", "tag": "dinheiro-soma" }, { "t": "10c", "feedback": "50 + 50 dá mais, não menos: 100c = 1€.", "tag": "dinheiro-soma" } ],
      "explain": "50 + 50 = 100 cêntimos = 1€." },
    { "q": "Qual é a moeda que vale MAIS?", "layout": "grid",
      "options": [ { "t": "2€", "emoji": "🪙", "correct": true }, { "t": "50c", "feedback": "50c é meio euro. A moeda que vale mais é a de 2€.", "tag": "dinheiro-valor" }, { "t": "1€", "feedback": "1€ vale, mas há maior: a moeda de 2€.", "tag": "dinheiro-valor" } ],
      "explain": "A moeda de 2€ é a que vale mais de todas as moedas." },
    { "q": "As notas são feitas de…", "layout": "grid",
      "options": [ { "t": "papel", "emoji": "💶", "correct": true }, { "t": "metal", "feedback": "De metal são as moedas. As notas são de papel.", "tag": "dinheiro-material" }, { "t": "madeira", "feedback": "Não é madeira: as notas são de papel; as moedas de metal.", "tag": "dinheiro-material" } ],
      "explain": "As notas são de papel; as moedas é que são de metal." },
    { "q": "20c + 20c + 10c = ?", "layout": "grid",
      "options": [ { "t": "50c", "correct": true }, { "t": "40c", "feedback": "Faltou somar os 10c: 20 + 20 + 10 = 50c.", "tag": "dinheiro-soma" }, { "t": "1€", "feedback": "1€ são 100c. Aqui 20 + 20 + 10 = 50c, metade.", "tag": "dinheiro-soma" } ],
      "explain": "20 + 20 + 10 = 50 cêntimos." },
    { "q": "O que vale mais?", "layout": "grid",
      "options": [ { "t": "uma nota de 5€", "emoji": "💶", "correct": true }, { "t": "uma moeda de 2€", "emoji": "🪙", "feedback": "2€ é menos que 5€. A nota de 5€ vale mais.", "tag": "dinheiro-valor" } ],
      "explain": "5€ é mais do que 2€." },
    { "q": "Pagas um sumo de 1€ com uma moeda de 2€. O troco é…", "layout": "grid",
      "options": [ { "t": "1€", "emoji": "🎉", "correct": true }, { "t": "2€", "feedback": "2€ é o que deste. O troco é o que sobra: 2 − 1 = 1€.", "tag": "dinheiro-troco" }, { "t": "0€", "feedback": "Deste 2€ por um sumo de 1€: sobra 1€ de troco.", "tag": "dinheiro-troco" } ],
      "explain": "2€ − 1€ = 1€ de troco." },
    { "q": "Qual destas é uma NOTA?", "layout": "grid",
      "options": [ { "t": "10€", "emoji": "💶", "correct": true }, { "t": "2€", "emoji": "🪙", "feedback": "2€ é moeda (de metal). A nota aqui é a de 10€.", "tag": "dinheiro-nota-vs-moeda" }, { "t": "50c", "feedback": "50c é moeda. A nota é a de 10€.", "tag": "dinheiro-nota-vs-moeda" } ],
      "explain": "A de 10€ é nota; 2€ e 50c são moedas." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat2-dinheiro-final",
  "final": true,
  "title": "O dinheiro (euros)",
  "questions": [
    { "q": "Que dinheiro usamos em Portugal?", "layout": "grid",
      "options": [ { "t": "euro", "emoji": "💶", "correct": true }, { "t": "dólar", "emoji": "💵", "feedback": "O dólar é dos Estados Unidos. Em Portugal usamos o euro.", "tag": "dinheiro-moeda-pais" } ],
      "explain": "Em Portugal usamos o euro (€)." },
    { "q": "1 euro tem quantos cêntimos?", "layout": "grid",
      "options": [ { "t": "100", "emoji": "💯", "correct": true }, { "t": "10", "feedback": "10 cêntimos são um décimo de euro. 1€ tem 100 cêntimos.", "tag": "dinheiro-centimos-euro" }, { "t": "1000", "feedback": "1000 cêntimos são 10 euros. 1€ tem 100 cêntimos.", "tag": "dinheiro-centimos-euro" } ],
      "explain": "1€ = 100 cêntimos." },
    { "q": "20c + 20c + 10c = ?", "layout": "grid",
      "options": [ { "t": "50c", "correct": true }, { "t": "40c", "feedback": "Faltou somar os 10c: 20 + 20 + 10 = 50c.", "tag": "dinheiro-soma" }, { "t": "1€", "feedback": "1€ são 100c. Aqui dá 50c.", "tag": "dinheiro-soma" } ],
      "explain": "20 + 20 + 10 = 50 cêntimos." },
    { "q": "Tens 2€ e gastas 1€. Fica…", "layout": "grid",
      "options": [ { "t": "1€", "correct": true }, { "t": "3€", "feedback": "3€ é 2 + 1 (somar). Gastar é tirar: 2 − 1 = 1€.", "tag": "dinheiro-troco" }, { "t": "0€", "feedback": "Confere: 2 − 1 = 1€ fica.", "tag": "dinheiro-troco" } ],
      "explain": "2 − 1 = 1€ de troco." },
    { "q": "O que vale mais?", "layout": "grid",
      "options": [ { "t": "uma nota de 5€", "emoji": "💶", "correct": true }, { "t": "uma moeda de 2€", "emoji": "🪙", "feedback": "2€ é menos que 5€. A nota de 5€ vale mais.", "tag": "dinheiro-valor" } ],
      "explain": "5€ é mais do que 2€." },
    { "q": "Qual é a moeda que vale MAIS de todas?", "layout": "grid",
      "options": [ { "t": "2€", "emoji": "🪙", "correct": true }, { "t": "1€", "feedback": "1€ vale, mas há maior: a moeda de 2€.", "tag": "dinheiro-valor" }, { "t": "50c", "feedback": "50c é meio euro. A maior moeda é a de 2€.", "tag": "dinheiro-valor" } ],
      "explain": "A moeda de 2€ é a de maior valor." },
    { "q": "Um pão custa 80c e pagas com 1€. O troco é…", "layout": "grid",
      "options": [ { "t": "20c", "emoji": "🥖", "correct": true }, { "t": "80c", "feedback": "80c é o preço. O troco é o que sobra: 100 − 80 = 20c.", "tag": "dinheiro-troco" }, { "t": "10c", "feedback": "Confere: 1€ são 100c; 100 − 80 = 20c.", "tag": "dinheiro-troco" } ],
      "explain": "100c − 80c = 20c de troco." },
    { "q": "Qual destes é feito de metal?", "layout": "grid",
      "options": [ { "t": "uma moeda", "emoji": "🪙", "correct": true }, { "t": "uma nota", "emoji": "💶", "feedback": "As notas são de papel. As moedas é que são de metal.", "tag": "dinheiro-material" } ],
      "explain": "As moedas são de metal; as notas são de papel." },
    { "q": "50c + 50c = ?", "layout": "grid",
      "options": [ { "t": "1€", "emoji": "🪙", "correct": true }, { "t": "100€", "feedback": "Cuidado: 50c + 50c = 100 CÊNTIMOS = 1€, não 100€.", "tag": "dinheiro-soma" }, { "t": "5€", "feedback": "50 + 50 = 100c = 1€, não 5€.", "tag": "dinheiro-soma" } ],
      "explain": "50 + 50 = 100 cêntimos = 1€." }
  ]
}
```
