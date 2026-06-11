# Os quadriláteros e as retas 🔷

> [!NOTE] **O que vais aprender** 👀 Vais rever as retas **paralelas** e **perpendiculares** e conhecer a família das figuras de **4 lados** — os **quadriláteros**: quadrado, retângulo, **losango**, **paralelogramo** e **trapézio**. E vais descobrir o segredo da família: o quadrado é um retângulo especial! 🤯

Olha à tua volta: janelas, portas, ecrãs, azulejos, sinais de trânsito… o mundo está cheio de figuras de **4 lados**! Mas nem todas são iguais — há uma família inteira, com primos parecidos e segredos de família. Hoje vais conhecê-los a todos pelo nome. 👨‍👩‍👧‍👦

## Primeiro, as retas: paralelas e perpendiculares 🚂

Para perceber os quadriláteros, precisas de duas palavras sobre **como duas retas se portam**:

```compare
[
  { "title": "Paralelas 🚂", "rows": [
    { "label": "Cruzam-se?", "value": "nunca! andam lado a lado" },
    { "label": "Exemplo", "value": "os carris do comboio" },
    { "label": "Distância", "value": "sempre a mesma entre elas" }
  ] },
  { "title": "Perpendiculares ➕", "highlight": true, "rows": [
    { "label": "Cruzam-se?", "value": "sim, num canto certinho (ângulo reto)", "highlight": true },
    { "label": "Exemplo", "value": "o + de uma cruz", "highlight": true },
    { "label": "Distância", "value": "encontram-se a 90°", "highlight": true }
  ] }
]
```

> Guarda isto: **paralelas** = carris 🚂 (nunca se tocam); **perpendiculares** = cruz ➕ (canto certinho). Os quadriláteros são feitos destas duas ideias!

## A família dos quadriláteros 👨‍👩‍👧‍👦

**Quadrilátero** quer dizer «**quatro lados**» (*quadri* = quatro, *látero* = lado). Estes dois já são teus amigos:

```shape
{ "title": "Os dois mais famosos", "showSides": true,
  "shapes": [
    { "kind": "square", "color": "mat", "label": "quadrado" },
    { "kind": "rectangle", "color": "est", "label": "retângulo" }
  ] }
```

E agora os três primos novos:

```keyvalue
[
  { "k": "Losango 🪁", "v": "4 lados todos iguais, mas «inclinado» — o diamante das cartas ♦️" },
  { "k": "Paralelogramo 🛷", "v": "um retângulo «empurrado de lado»: os lados opostos são paralelos e iguais, mas os cantos não são retos" },
  { "k": "Trapézio ⛺", "v": "só UM par de lados paralelos — como um telhado ou um escorrega visto de lado" }
]
```

## O segredo da família 🤫

Aqui vem a parte que confunde os crescidos: estas figuras **não são rivais — são família**! O que conta são duas perguntas: *os lados opostos são paralelos?* e *os cantos são retos?*

```compare
[
  { "title": "Paralelogramos 🛷", "rows": [
    { "label": "Lados paralelos", "value": "DOIS pares (frente a frente)" },
    { "label": "Quem pertence", "value": "paralelogramo, retângulo, losango e quadrado" },
    { "label": "Cantos retos?", "value": "só o retângulo e o quadrado" }
  ] },
  { "title": "Trapézios ⛺", "rows": [
    { "label": "Lados paralelos", "value": "só UM par" },
    { "label": "Quem pertence", "value": "o trapézio (telhado, escorrega)" },
    { "label": "Cantos retos?", "value": "normalmente não" }
  ] }
]
```

E o segredo maior: o **quadrado** é o menino querido da família — é **retângulo** (4 cantos retos) **e** **losango** (4 lados iguais) **ao mesmo tempo**! Por isso, todo o quadrado é um retângulo… mas nem todo o retângulo é um quadrado. 🤯

```steps
[
  { "title": "Tem 4 cantos retos?", "body": "sim → é um retângulo ➕", "icon": "📐" },
  { "title": "Tem 4 lados iguais?", "body": "sim → é um losango 🪁", "icon": "📏" },
  { "title": "Tem as duas coisas?", "body": "cantos retos E lados iguais → é um QUADRADO! 🟧", "icon": "👑" },
  { "title": "Não tem nenhuma?", "body": "vê os lados paralelos: 2 pares → paralelogramo; 1 par → trapézio", "icon": "🔍" }
]
```

## Um exemplo passo a passo 🔍

Apareceu um quadrilátero misterioso: tem os **lados opostos paralelos**, os **4 lados iguais**, mas os cantos **não são retos**. Quem é? 🕵️

```steps
[
  { "title": "1. Quantos pares paralelos?", "body": "dois pares → é da família dos paralelogramos 🛷", "icon": "🚂" },
  { "title": "2. Cantos retos?", "body": "não → então não é retângulo nem quadrado", "icon": "📐" },
  { "title": "3. Lados todos iguais?", "body": "sim! 4 lados iguais…", "icon": "📏" },
  { "title": "4. Desvendado!", "body": "é um LOSANGO — o diamante! ♦️🎉", "icon": "🎉" }
]
```

> **Truque:** faz sempre as **duas perguntas mágicas**, por esta ordem: ① **quantos pares de lados paralelos?** (2 pares → família do paralelogramo; 1 par → trapézio) e ② **os cantos são retos? os lados são iguais?** — as respostas dão-te o nome certo, sem decorar nada. 🪄

> [!TIP] **Para saberes mais** 🌱 Há um quadrilátero que conheces dos dias de vento: o **papagaio de papel** (em matemática chama-se mesmo «papagaio»!). Tem os lados iguais **dois a dois**, lado a lado — não frente a frente como o paralelogramo. 🪁 E no 5.º ano vais descobrir que a soma dos ângulos de **qualquer** quadrilátero dá sempre **360°** — uma volta completa!

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-quadrilateros-pratica",
  "questions": [
    { "q": "Um quadrilátero é uma figura com…", "layout": "grid",
      "options": [ { "t": "4 lados", "emoji": "🔷", "correct": true }, { "t": "3 lados" }, { "t": "5 lados" } ],
      "explain": "Quadri = quatro, látero = lado." },
    { "q": "Retas que nunca se cruzam são…", "layout": "grid",
      "options": [ { "t": "paralelas", "emoji": "🚂", "correct": true }, { "t": "perpendiculares", "emoji": "➕" }, { "t": "curvas" } ],
      "explain": "Como os carris do comboio — sempre à mesma distância." },
    { "q": "Retas que se cruzam num canto certinho são…", "layout": "grid",
      "options": [ { "t": "perpendiculares", "emoji": "➕", "correct": true }, { "t": "paralelas", "emoji": "🚂" } ],
      "explain": "Cruzam-se a 90° — um ângulo reto." },
    { "q": "O «diamante» com 4 lados iguais mas cantos não retos é o…", "layout": "grid",
      "options": [ { "t": "losango", "emoji": "♦️", "correct": true }, { "t": "trapézio", "emoji": "⛺" }, { "t": "retângulo" } ],
      "explain": "O losango tem 4 lados iguais, inclinado como o diamante das cartas." },
    { "q": "Um retângulo «empurrado de lado», sem cantos retos, é um…", "layout": "grid",
      "options": [ { "t": "paralelogramo", "emoji": "🛷", "correct": true }, { "t": "quadrado" }, { "t": "trapézio" } ],
      "explain": "Mantém os 2 pares de lados paralelos, mas perde os cantos retos." },
    { "q": "O quadrilátero com só UM par de lados paralelos é o…", "layout": "grid",
      "options": [ { "t": "trapézio", "emoji": "⛺", "correct": true }, { "t": "losango" }, { "t": "retângulo" } ],
      "explain": "O trapézio é o do telhado: só um par paralelo." },
    { "q": "Todo o quadrado é também um…", "layout": "grid",
      "options": [ { "t": "retângulo", "emoji": "🤯", "correct": true }, { "t": "trapézio" }, { "t": "triângulo" } ],
      "explain": "Tem 4 cantos retos → é um retângulo (especial, de lados iguais)." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-quadrilateros-final",
  "final": true,
  "title": "Os quadriláteros e as retas",
  "questions": [
    { "q": "Os carris do comboio são um exemplo de retas…", "layout": "grid",
      "options": [ { "t": "paralelas", "emoji": "🚂", "correct": true }, { "t": "perpendiculares" }, { "t": "tortas" } ],
      "explain": "Nunca se cruzam — paralelas." },
    { "q": "O + de uma cruz mostra retas…", "layout": "grid",
      "options": [ { "t": "perpendiculares", "emoji": "➕", "correct": true }, { "t": "paralelas" } ],
      "explain": "Cruzam-se num ângulo reto — perpendiculares." },
    { "q": "Que figura tem 4 cantos retos e 4 lados iguais?", "layout": "grid",
      "options": [ { "t": "o quadrado", "emoji": "🟧", "correct": true }, { "t": "o trapézio" }, { "t": "o paralelogramo" } ],
      "explain": "Retângulo + losango ao mesmo tempo = quadrado!" },
    { "q": "Que figura tem 4 cantos retos mas lados não todos iguais?", "layout": "grid",
      "options": [ { "t": "o retângulo", "emoji": "📺", "correct": true }, { "t": "o quadrado" }, { "t": "o losango" } ],
      "explain": "Como o ecrã da televisão: 2 lados compridos, 2 curtos." },
    { "q": "Quantos pares de lados paralelos tem um paralelogramo?", "layout": "grid",
      "options": [ { "t": "2 pares", "emoji": "🛷", "correct": true }, { "t": "1 par" }, { "t": "nenhum" } ],
      "explain": "Os lados opostos são paralelos dois a dois." },
    { "q": "Quantos pares de lados paralelos tem um trapézio?", "layout": "grid",
      "options": [ { "t": "só 1 par", "emoji": "⛺", "correct": true }, { "t": "2 pares" }, { "t": "4 pares" } ],
      "explain": "É o que o distingue: só um par paralelo." },
    { "q": "«Todo o retângulo é um quadrado.» Esta frase é…", "layout": "list",
      "options": [ { "t": "falsa — é ao contrário!", "emoji": "🙃", "correct": true }, { "t": "verdadeira" } ],
      "explain": "Todo o QUADRADO é um retângulo; um retângulo só é quadrado se os 4 lados forem iguais." },
    { "q": "Figura misteriosa: 2 pares paralelos, 4 lados iguais, cantos não retos. É…", "layout": "grid",
      "options": [ { "t": "um losango", "emoji": "♦️", "correct": true }, { "t": "um quadrado" }, { "t": "um trapézio" } ],
      "explain": "Lados iguais sem cantos retos: o diamante — losango." },
    { "q": "A primeira pergunta mágica para dar nome a um quadrilátero é…", "layout": "list",
      "options": [ { "t": "quantos pares de lados paralelos tem?", "emoji": "🪄", "correct": true }, { "t": "de que cor é?" }, { "t": "quanto pesa?" } ],
      "explain": "2 pares → família do paralelogramo; 1 par → trapézio. Depois vês cantos e lados." }
  ]
}
```
