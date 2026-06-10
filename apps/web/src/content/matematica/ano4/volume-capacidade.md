# Volume e capacidade 🧴

> [!NOTE] **O que vais aprender** 👀 Vais descobrir o que é a **capacidade** (o líquido que cabe) e o **volume** (o espaço que ocupa), medir em **litros** e **mililitros** e fazer trocas entre eles como um campeão! 💧

Quanto cabe dentro de uma garrafa? E quanto espaço ocupa uma caixa de sapatos? Hoje vais ficar a saber medir os líquidos e o espaço à tua volta. Vai ser fácil e divertido — pega num copo imaginário e vamos a isto! 🧴💧

## O que cabe lá dentro 💧

A **capacidade** é a quantidade de líquido que cabe dentro de um recipiente — uma garrafa, um copo, um balde, uma panela.

Medimos a capacidade em **litros (l)** e em **mililitros (ml)**. O litro é grande; o mililitro é pequenino, do tamanho de uma gota.

```keyvalue
[
  { "k": "Capacidade", "v": "o líquido que CABE dentro de um recipiente 💧" },
  { "k": "Litro (l)", "v": "a unidade grande — uma garrafa de água tem 1 litro 🧴" },
  { "k": "Mililitro (ml)", "v": "a unidade pequenina — uma gota, uma colher 🥄" },
  { "k": "1 litro (l)", "v": "= 1000 mililitros (ml) 🔁" }
]
```

> O **mililitro** é mesmo pequenino (uma gota). O **litro** é grande (uma garrafa). Mil mililitros juntos fazem **1 litro**!

## Quanto cabe em cada coisa? 🥛

Antes de medir, ajuda teres uma ideia na cabeça. Olha estes valores do dia a dia — assim consegues *adivinhar* sem medir!

```meters
[
  { "label": "🥄 Colher de sopa", "value": 15, "max": 2000, "tone": "ok" },
  { "label": "🥛 Copo de água", "value": 200, "max": 2000, "tone": "ok" },
  { "label": "📦 Pacote de leite", "value": 1000, "max": 2000, "tone": "warn" },
  { "label": "🧴 Garrafa grande", "value": 1500, "max": 2000, "tone": "warn" },
  { "label": "🪣 Balde", "value": 2000, "max": 2000, "tone": "bad" }
]
```

> [!NOTE] Repara: um **copo** tem cerca de 200 ml. Cinco copos cheios dão quase **1 litro** (5 × 200 = 1000 ml). Bebe água! 💦

Agora os mesmos valores em **barras** — repara como o balde é gigante ao pé da colher:

```chart
{ "type": "bar", "title": "Quanto cabe em cada um? (ml)",
  "labels": ["🥄 Colher", "🥛 Copo", "📦 Leite", "🧴 Garrafa", "🪣 Balde"], "data": [15, 200, 1000, 1500, 2000],
  "unit": "ml",
  "say": "A colher leva quinze mililitros, o copo duzentos, o pacote de leite mil, a garrafa mil e quinhentos e o balde dois mil — ou seja, dois litros!" }
```

## Litros e mililitros: trocar entre eles 🔁

Trocar de litros para mililitros (e ao contrário) é como trocar moedas por notas. A regra é sempre a mesma: **1 l = 1000 ml**.

```compare
[
  { "title": "De litros → mililitros", "rows": [
    { "label": "1 l", "value": "1000 ml" },
    { "label": "2 l", "value": "2000 ml" },
    { "label": "Regra", "value": "multiplicar por 1000 (× 1000)", "highlight": true }
  ] },
  { "title": "De mililitros → litros", "highlight": true, "rows": [
    { "label": "1000 ml", "value": "1 l" },
    { "label": "3000 ml", "value": "3 l" },
    { "label": "Regra", "value": "dividir por 1000 (÷ 1000)", "highlight": true }
  ] }
]
```

> E quando temos litros **e** mililitros juntos? **1 l e 500 ml** é o mesmo que **1500 ml** (1000 + 500). Meio litro são **500 ml**! 🥤

## Capacidade ou volume? 📦

São quase irmãos, mas não são iguais! A **capacidade** é para líquidos; o **volume** é o espaço que um objeto ocupa.

```compare
[
  { "title": "Capacidade 💧", "rows": [
    { "label": "O que mede", "value": "o líquido que CABE dentro" },
    { "label": "Unidade", "value": "litros e mililitros" },
    { "label": "Exemplo", "value": "a água numa garrafa 🧴" }
  ] },
  { "title": "Volume 📦", "highlight": true, "badge": "espaço", "rows": [
    { "label": "O que mede", "value": "o ESPAÇO que algo ocupa" },
    { "label": "Unidade", "value": "cubinhos (cm³)" },
    { "label": "Exemplo", "value": "o espaço de uma caixa 📦" }
  ] }
]
```

> **Volume com cubinhos:** uma caixa de 3 cubinhos × 2 cubinhos × 2 cubinhos tem **3 × 2 × 2 = 12 cubinhos** lá dentro. Esse é o seu volume! 🧊

## Um exemplo passo a passo 🔍

A Matilde tem uma garrafa com **2 litros** de sumo. Quantos **mililitros** são?

```steps
[
  { "title": "Lê com calma", "body": "queremos passar de litros para mililitros 💧", "icon": "🧐" },
  { "title": "Lembra a regra", "body": "1 litro = 1000 ml", "icon": "🔁" },
  { "title": "Faz a conta", "body": "2 litros = 2 × 1000 = 2000 ml", "icon": "✏️" },
  { "title": "Resposta!", "body": "A garrafa tem 2000 ml de sumo 🎉", "icon": "✅" }
]
```

> **Truque:** para passar de **litros para ml**, é só **acrescentar 3 zeros** (porque 1 l = 1000 ml)! 3 litros → 3**000** ml. Ao contrário, de **ml para litros**, **tiras 3 zeros**: 4000 ml → 4 litros. 🪄

> [!TIP] **Para saberes mais** 🌱 Sabias que **1 litro = 1000 cm³**? Quer dizer que se enchesses uma caixa de exatamente **10 cm × 10 cm × 10 cm** com água, ela levava **1 litro** certinho! A capacidade e o volume estão ligados: é por isso que dizemos que uma garrafa de 1,5 l ocupa 1500 cm³ de espaço. 🤯

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-volume-capacidade-pratica",
  "questions": [
    { "q": "O que mede a capacidade?", "layout": "grid",
      "options": [ { "t": "o líquido que cabe dentro", "emoji": "💧", "correct": true }, { "t": "o peso de uma pedra" }, { "t": "o comprimento de uma régua" } ],
      "explain": "A capacidade é o líquido que cabe num recipiente." },
    { "q": "Quantos mililitros tem 1 litro?", "layout": "grid",
      "options": [ { "t": "1000 ml", "emoji": "🔁", "correct": true }, { "t": "100 ml" }, { "t": "10 ml" } ],
      "explain": "1 litro = 1000 ml." },
    { "q": "Quantos ml são 3 litros?", "layout": "grid",
      "options": [ { "t": "3000 ml", "correct": true }, { "t": "300 ml" }, { "t": "30 ml" } ],
      "explain": "3 × 1000 = 3000 ml (acrescentas 3 zeros)." },
    { "q": "Quantos litros são 5000 ml?", "layout": "grid",
      "options": [ { "t": "5 litros", "emoji": "🧴", "correct": true }, { "t": "50 litros" }, { "t": "500 litros" } ],
      "explain": "Tiras 3 zeros: 5000 ml = 5 litros." },
    { "q": "Meio litro são quantos mililitros?", "layout": "grid",
      "options": [ { "t": "500 ml", "emoji": "🥤", "correct": true }, { "t": "50 ml" }, { "t": "5000 ml" } ],
      "explain": "Metade de 1000 ml é 500 ml." },
    { "q": "Qual destes tem MAIS capacidade?", "layout": "grid",
      "options": [ { "t": "um balde", "emoji": "🪣", "correct": true }, { "t": "uma colher", "emoji": "🥄" }, { "t": "um copo", "emoji": "🥛" } ],
      "explain": "O balde leva muito mais líquido do que um copo ou uma colher." },
    { "q": "Quanto cabe, mais ou menos, num copo de água?", "layout": "grid",
      "options": [ { "t": "cerca de 200 ml", "emoji": "🥛", "correct": true }, { "t": "cerca de 5 litros" }, { "t": "cerca de 1 ml" } ],
      "explain": "Um copo leva à volta de 200 ml." },
    { "q": "Qual mede o ESPAÇO que um objeto ocupa?", "layout": "grid",
      "options": [ { "t": "o volume", "emoji": "📦", "correct": true }, { "t": "a capacidade", "emoji": "💧" }, { "t": "o relógio", "emoji": "🕐" } ],
      "explain": "O volume mede o espaço ocupado; a capacidade mede o líquido que cabe." },
    { "q": "1 litro e 500 ml são, ao todo, quantos ml?", "layout": "grid",
      "options": [ { "t": "1500 ml", "correct": true }, { "t": "150 ml" }, { "t": "600 ml" } ],
      "explain": "1000 ml + 500 ml = 1500 ml." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-volume-capacidade-final",
  "final": true,
  "title": "Volume e capacidade",
  "questions": [
    { "q": "A capacidade mede-se em...", "layout": "grid",
      "options": [ { "t": "litros e mililitros", "emoji": "🧴", "correct": true }, { "t": "metros" }, { "t": "quilogramas" } ],
      "explain": "A capacidade mede o líquido que cabe: litros e ml." },
    { "q": "Quantos ml são 5 litros?", "layout": "grid",
      "options": [ { "t": "5000 ml", "correct": true }, { "t": "500 ml" }, { "t": "50 ml" } ],
      "explain": "5 × 1000 = 5000 ml." },
    { "q": "Tens 2000 ml. Quantos litros são?", "layout": "grid",
      "options": [ { "t": "2 litros", "correct": true }, { "t": "20 litros" }, { "t": "200 litros" } ],
      "explain": "Tiras 3 zeros: 2000 ml = 2 litros." },
    { "q": "Para passar de litros para ml, o que fazes?", "layout": "grid",
      "options": [ { "t": "multiplicar por 1000 (× 1000)", "emoji": "🔁", "correct": true }, { "t": "dividir por 1000" }, { "t": "tirar 1000" } ],
      "explain": "De litros para ml multiplica-se por 1000." },
    { "q": "Quanto cabe, mais ou menos, numa colher de sopa?", "layout": "grid",
      "options": [ { "t": "cerca de 15 ml", "emoji": "🥄", "correct": true }, { "t": "cerca de 1 litro" }, { "t": "cerca de 500 ml" } ],
      "explain": "Uma colher de sopa leva à volta de 15 ml." },
    { "q": "O que ocupa mais espaço (mais volume)?", "layout": "grid",
      "options": [ { "t": "uma caixa grande", "emoji": "📦", "correct": true }, { "t": "uma bolinha pequena", "emoji": "⚽" } ],
      "explain": "O volume é o espaço ocupado: a caixa grande ocupa mais." },
    { "q": "Uma caixa tem 2 × 2 × 2 cubinhos. Qual é o volume?", "layout": "grid",
      "options": [ { "t": "8 cubinhos", "emoji": "🧊", "correct": true }, { "t": "6 cubinhos" }, { "t": "2 cubinhos" } ],
      "explain": "2 × 2 × 2 = 8 cubinhos." },
    { "q": "O Tiago tem 3 garrafas de 1 litro e um copo de 500 ml. Quanto sumo tem, em ml?", "layout": "grid",
      "options": [ { "t": "3500 ml", "emoji": "🥤", "correct": true }, { "t": "350 ml" }, { "t": "8000 ml" } ],
      "explain": "3 litros = 3000 ml; com o copo de 500 ml dá 3500 ml." },
    { "q": "Quantos litros são 4000 ml?", "layout": "grid",
      "options": [ { "t": "4 litros", "emoji": "🧴", "correct": true }, { "t": "40 litros" }, { "t": "400 litros" } ],
      "explain": "Tiras 3 zeros: 4000 ml = 4 litros." }
  ]
}
```
