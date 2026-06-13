# Volume e capacidade 🧴

> [!NOTE] **O que vais aprender** 👀 Vais descobrir o que é a **capacidade** (o líquido que cabe) e o **volume** (o espaço que ocupa), medir em **litros**, **centilitros** e **mililitros** e fazer trocas entre eles como um campeão! 💧

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

## O centilitro (cl): o irmão do meio 🥤

Entre o litro e o mililitro vive o **centilitro (cl)** — é ele que aparece nas latas e nos pacotes de sumo! «Centi» quer dizer centésima parte: **1 l = 100 cl**, e cada centilitro são **10 ml**.

```compare
[
  { "title": "As trocas com o cl 🔁", "rows": [
    { "label": "1 l", "value": "100 cl" },
    { "label": "1 cl", "value": "10 ml" },
    { "label": "meio litro", "value": "50 cl", "highlight": true }
  ] },
  { "title": "Valores do dia a dia 🛒", "highlight": true, "rows": [
    { "label": "Lata de sumo 🥤", "value": "33 cl (= 330 ml)" },
    { "label": "Pacote de sumo 🧃", "value": "20 cl (= 200 ml)" },
    { "label": "3 latas de 33 cl", "value": "99 cl — ainda não é 1 litro!", "highlight": true }
  ] }
]
```

> Olha para o rótulo da próxima lata que abrires: vais lá encontrar o **33 cl**! Para passar de cl para ml, acrescentas **um zero** (33 cl = 330 ml); de litros para cl, acrescentas **dois** (2 l = 200 cl). 🔍

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
      "options": [ { "t": "o líquido que cabe dentro", "emoji": "💧", "correct": true }, { "t": "o peso de uma pedra", "feedback": "Isso é massa/peso, não capacidade. Capacidade é quanto líquido cabe num recipiente.", "tag": "medidas-capacidade-vs-massa" }, { "t": "o comprimento de uma régua", "feedback": "Comprimento mede tamanho em linha. Capacidade mede líquido que cabe dentro.", "tag": "medidas-capacidade-vs-comprimento" } ],
      "explain": "A capacidade é o líquido que cabe num recipiente." },
    { "q": "Quantos mililitros tem 1 litro?", "layout": "grid",
      "options": [ { "t": "1000 ml", "emoji": "🔁", "correct": true }, { "t": "100 ml", "feedback": "Faltou um zero: 100 ml são só um décimo de litro. 1 litro tem 1000 ml.", "tag": "capacidade-fator-1000" }, { "t": "10 ml", "feedback": "10 ml é muito pouco, quase uma colher. 1 litro completo tem 1000 ml.", "tag": "capacidade-fator-1000" } ],
      "explain": "1 litro = 1000 ml." },
    { "q": "Quantos ml são 3 litros?", "layout": "grid",
      "options": [ { "t": "3000 ml", "correct": true }, { "t": "300 ml", "feedback": "De litros para ml multiplicas por 1000, não por 100: 3 l = 3000 ml.", "tag": "capacidade-l-para-ml" }, { "t": "30 ml", "feedback": "30 ml é menos que um copo pequeno. 3 litros são 3 vezes 1000 ml.", "tag": "capacidade-l-para-ml" } ],
      "explain": "3 × 1000 = 3000 ml (acrescentas 3 zeros)." },
    { "q": "Quantos litros são 5000 ml?", "layout": "grid",
      "options": [ { "t": "5 litros", "emoji": "🧴", "correct": true }, { "t": "50 litros", "feedback": "Tiraste só dois zeros. De ml para litros divides por 1000: 5000 ml = 5 l.", "tag": "capacidade-ml-para-l" }, { "t": "500 litros", "feedback": "Tiraste só um zero. Para passar de ml para litros, tira três zeros.", "tag": "capacidade-ml-para-l" } ],
      "explain": "Tiras 3 zeros: 5000 ml = 5 litros." },
    { "q": "Meio litro são quantos mililitros?", "layout": "grid",
      "options": [ { "t": "500 ml", "emoji": "🥤", "correct": true }, { "t": "50 ml", "feedback": "50 ml é muito menos que meio litro. Meio de 1000 ml é 500 ml.", "tag": "capacidade-meio-litro" }, { "t": "5000 ml", "feedback": "5000 ml são 5 litros. Meio litro tem de ser menos que 1 litro: 500 ml.", "tag": "capacidade-meio-litro" } ],
      "explain": "Metade de 1000 ml é 500 ml." },
    { "q": "Qual destes tem MAIS capacidade?", "layout": "grid",
      "options": [ { "t": "um balde", "emoji": "🪣", "correct": true }, { "t": "uma colher", "emoji": "🥄" }, { "t": "um copo", "emoji": "🥛" } ],
      "explain": "O balde leva muito mais líquido do que um copo ou uma colher." },
    { "q": "Quanto cabe, mais ou menos, num copo de água?", "layout": "grid",
      "options": [ { "t": "cerca de 200 ml", "emoji": "🥛", "correct": true }, { "t": "cerca de 5 litros" }, { "t": "cerca de 1 ml" } ],
      "explain": "Um copo leva à volta de 200 ml." },
    { "q": "Qual mede o ESPAÇO que um objeto ocupa?", "layout": "grid",
      "options": [ { "t": "o volume", "emoji": "📦", "correct": true }, { "t": "a capacidade", "emoji": "💧", "feedback": "Capacidade é o líquido que cabe. Volume é o espaço que um objeto ocupa.", "tag": "volume-vs-capacidade" }, { "t": "o relógio", "emoji": "🕐", "feedback": "O relógio mede tempo. O espaço ocupado chama-se volume.", "tag": "medidas-grandeza-errada" } ],
      "explain": "O volume mede o espaço ocupado; a capacidade mede o líquido que cabe." },
    { "q": "1 litro e 500 ml são, ao todo, quantos ml?", "layout": "grid",
      "options": [ { "t": "1500 ml", "correct": true }, { "t": "150 ml", "feedback": "1 litro são 1000 ml; depois juntas 500 ml. Não basta juntar os algarismos.", "tag": "capacidade-litros-mais-ml" }, { "t": "600 ml", "feedback": "Somaste 100 + 500, mas 1 litro vale 1000 ml. Fica 1000 + 500.", "tag": "capacidade-litros-mais-ml" } ],
      "explain": "1000 ml + 500 ml = 1500 ml." },
    { "q": "Quantos centilitros tem 1 litro?", "layout": "grid",
      "options": [ { "t": "100 cl", "emoji": "🥤", "correct": true }, { "t": "10 cl", "feedback": "10 cl são só um décimo de litro. 1 litro tem 100 cl.", "tag": "capacidade-l-para-cl" }, { "t": "1000 cl", "feedback": "1000 é para mililitros. Em centilitros, 1 litro tem 100 cl.", "tag": "capacidade-cl-vs-ml" } ],
      "explain": "1 l = 100 cl (e cada cl são 10 ml)." },
    { "q": "Uma lata de sumo tem 33 cl. Quantos ml são?", "layout": "grid",
      "options": [ { "t": "330 ml", "correct": true }, { "t": "33 ml", "feedback": "Faltou converter cl para ml: cada cl tem 10 ml, por isso 33 cl = 330 ml.", "tag": "capacidade-cl-para-ml" }, { "t": "3300 ml", "feedback": "Multiplicaste por 100. De cl para ml multiplica só por 10.", "tag": "capacidade-cl-para-ml" } ],
      "explain": "1 cl = 10 ml, logo 33 cl = 330 ml — acrescentas um zero." }
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
    { "q": "A capacidade mede-se em...", "layout": "grid", "level": 1,
      "hint": "Pensa no que medes quando enches uma garrafa.",
      "options": [ { "t": "litros e mililitros", "emoji": "🧴", "correct": true }, { "t": "metros", "feedback": "Metros medem comprimento. Para líquidos usamos litros e mililitros.", "tag": "medidas-capacidade-vs-comprimento" }, { "t": "quilogramas", "feedback": "Quilogramas medem massa/peso. Capacidade mede líquido: litros e ml.", "tag": "medidas-capacidade-vs-massa" } ],
      "explain": "A capacidade mede o líquido que cabe: litros e ml." },
    { "q": "Quantos ml são 5 litros?", "layout": "grid", "level": 1,
      "hint": "1 litro = 1000 ml — acrescenta os zeros.",
      "options": [ { "t": "5000 ml", "correct": true }, { "t": "500 ml", "feedback": "De litros para ml multiplicas por 1000. 5 l são cinco milhares de ml.", "tag": "capacidade-l-para-ml" }, { "t": "50 ml", "feedback": "50 ml é muito menos que um copo. 5 litros são 5000 ml.", "tag": "capacidade-l-para-ml" } ],
      "explain": "5 × 1000 = 5000 ml." },
    { "q": "Tens 2000 ml. Quantos litros são?", "layout": "grid", "level": 1,
      "hint": "De ml para litros tiras 3 zeros.",
      "options": [ { "t": "2 litros", "correct": true }, { "t": "20 litros", "feedback": "Tiraste só dois zeros. De ml para litros divides por 1000: 2000 ml = 2 l.", "tag": "capacidade-ml-para-l" }, { "t": "200 litros", "feedback": "Tiraste só um zero. Divide por 1000 para passar de ml para litros.", "tag": "capacidade-ml-para-l" } ],
      "explain": "Tiras 3 zeros: 2000 ml = 2 litros." },
    { "q": "Para passar de litros para ml, o que fazes?", "layout": "grid", "level": 2,
      "hint": "1 l são 1000 ml — o número cresce ou encolhe?",
      "options": [ { "t": "multiplicar por 1000 (× 1000)", "emoji": "🔁", "correct": true }, { "t": "dividir por 1000", "feedback": "Isso é o caminho contrário: de ml para litros. De litros para ml o número cresce.", "tag": "capacidade-direcao-conversao" }, { "t": "tirar 1000", "feedback": "Não subtraímos 1000; trocamos unidade. 1 litro corresponde a 1000 ml.", "tag": "capacidade-operacao-errada" } ],
      "explain": "De litros para ml multiplica-se por 1000." },
    { "q": "Quanto cabe, mais ou menos, numa colher de sopa?", "layout": "grid", "level": 2,
      "hint": "Imagina a colher e o copo de 200 ml lado a lado.",
      "options": [ { "t": "cerca de 15 ml", "emoji": "🥄", "correct": true }, { "t": "cerca de 1 litro" }, { "t": "cerca de 500 ml" } ],
      "explain": "Uma colher de sopa leva à volta de 15 ml." },
    { "q": "O que ocupa mais espaço (mais volume)?", "layout": "grid", "level": 1,
      "hint": "Qual deles enche mais o armário?",
      "options": [ { "t": "uma caixa grande", "emoji": "📦", "correct": true }, { "t": "uma bolinha pequena", "emoji": "⚽" } ],
      "explain": "O volume é o espaço ocupado: a caixa grande ocupa mais." },
    { "q": "Uma caixa tem 2 × 2 × 2 cubinhos. Qual é o volume?", "layout": "grid", "level": 2,
      "hint": "Multiplica comprimento × largura × altura.",
      "options": [ { "t": "8 cubinhos", "emoji": "🧊", "correct": true }, { "t": "6 cubinhos", "feedback": "Somaste 2 + 2 + 2. Para volume de uma caixa multiplicas: 2 × 2 × 2.", "tag": "volume-soma-vs-multiplicacao" }, { "t": "2 cubinhos", "feedback": "Usaste só uma medida. Volume junta três dimensões: comprimento, largura e altura.", "tag": "volume-dimensoes" } ],
      "explain": "2 × 2 × 2 = 8 cubinhos." },
    { "q": "O Tiago tem 3 garrafas de 1 litro e um copo de 500 ml. Quanto sumo tem, em ml?", "layout": "grid", "level": 3,
      "hint": "Passa os litros a ml primeiro; só depois junta o copo.",
      "options": [ { "t": "3500 ml", "emoji": "🥤", "correct": true }, { "t": "350 ml", "feedback": "Faltou converter 3 litros para 3000 ml. Depois junta 500 ml.", "tag": "capacidade-problema-dois-passos" }, { "t": "8000 ml", "feedback": "Juntaste 3 e 500 como se fossem a mesma unidade. Primeiro: 3 l = 3000 ml; depois soma 500.", "tag": "capacidade-unidades-mistas" } ],
      "explain": "3 litros = 3000 ml; com o copo de 500 ml dá 3500 ml." },
    { "q": "Quantos litros são 4000 ml?", "layout": "grid", "level": 1,
      "hint": "Tira 3 zeros.",
      "options": [ { "t": "4 litros", "emoji": "🧴", "correct": true }, { "t": "40 litros", "feedback": "Tiraste só dois zeros. 4000 ml dividido por 1000 dá 4 litros.", "tag": "capacidade-ml-para-l" }, { "t": "400 litros", "feedback": "Tiraste só um zero. De ml para litros, tira três zeros.", "tag": "capacidade-ml-para-l" } ],
      "explain": "Tiras 3 zeros: 4000 ml = 4 litros." }
  ]
}
```
