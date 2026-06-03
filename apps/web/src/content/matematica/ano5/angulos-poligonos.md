# Ângulos e polígonos 📐

> [!NOTE] **O que vais aprender** 👀 Vais medir **ângulos** em graus (com o transferidor!), conhecer os tipos (agudo, reto, obtuso, raso, giro), classificar **triângulos** e **quadriláteros**, e descobrir a regra mágica da **soma dos ângulos** de um triângulo. 📐🔺

Os ângulos e os polígonos estão à tua volta — nos sinais de trânsito, nas peças de Lego, nas fatias de pizza. No 5.º ano vais deixar de os medir «no olhómetro» e passar a usar **graus** e o **transferidor**, como os arquitetos. E vais aprender a dar nome a cada forma. Vamos a isso! 🏗️

## Medir ângulos em graus 🌡️

Um **ângulo** é a abertura entre duas semirretas que partem do mesmo ponto (o **vértice**). Mede-se em **graus (°)** com um **transferidor**. Uma volta completa tem **360°** — como uma roda a girar! 🔄

```angle
{ "title": "Abre e fecha — vê os graus!", "angle": 50 }
```

```keyvalue
[
  { "k": "Vértice", "v": "o ponto onde o ângulo começa 📍" },
  { "k": "Lados", "v": "as duas semirretas que abrem a «boca» 🐊" },
  { "k": "Graus (°)", "v": "a unidade da abertura, medida com o transferidor 📐" },
  { "k": "Volta completa", "v": "360° — uma roda inteira 🔄" }
]
```

## Os tipos de ângulo 📏

Todos se comparam com o **reto (90°)**, o canto certinho de uma folha. Decora estes cinco:

```compare
[
  { "title": "Os «pequenos»", "rows": [
    { "label": "Agudo", "value": "menos de 90° 🤏" },
    { "label": "Reto", "value": "exatamente 90° ➕" }
  ] },
  { "title": "Os «grandes»", "highlight": true, "rows": [
    { "label": "Obtuso", "value": "entre 90° e 180° 😮" },
    { "label": "Raso", "value": "exatamente 180° (linha direita) ➖" },
    { "label": "Giro", "value": "360° (volta completa) 🔄" }
  ] }
]
```

Olha os três principais lado a lado — repara onde fica o canto certinho do reto:

```angle
{ "title": "Agudo (menos de 90°)", "angle": 40, "interactive": false, "color": "ok" }
```

```angle
{ "title": "Reto (90° certinho)", "angle": 90, "interactive": false }
```

```angle
{ "title": "Obtuso (mais de 90°)", "angle": 130, "interactive": false, "color": "accent" }
```

## O que é um polígono? 🔷

Um **polígono** é uma figura plana **fechada**, feita só de **segmentos de reta** (lados direitos). Tem tantos **vértices** (bicos) como **lados**. Atenção: o círculo **não** é polígono — é curvo! ⭕🚫

```keyvalue
[
  { "k": "Triângulo", "v": "3 lados, 3 vértices 🔺" },
  { "k": "Quadrilátero", "v": "4 lados, 4 vértices ⬜" },
  { "k": "Pentágono", "v": "5 lados, 5 vértices ⭐" },
  { "k": "Hexágono", "v": "6 lados, 6 vértices 🐝" }
]
```

```shape
{ "title": "Conta os lados de cada polígono", "showSides": true,
  "shapes": [ { "kind": "triangle", "color": "mat" }, { "kind": "square", "color": "ok" }, { "kind": "pentagon", "color": "accent" }, { "kind": "hexagon", "color": "info" } ] }
```

## Classificar triângulos 🔺

Os triângulos arrumam-se de **duas** maneiras — pelos **lados** e pelos **ângulos**:

```compare
[
  { "title": "Pelos LADOS 📏", "rows": [
    { "label": "Equilátero", "value": "3 lados iguais" },
    { "label": "Isósceles", "value": "2 lados iguais" },
    { "label": "Escaleno", "value": "3 lados diferentes" }
  ] },
  { "title": "Pelos ÂNGULOS 📐", "highlight": true, "rows": [
    { "label": "Acutângulo", "value": "3 ângulos agudos" },
    { "label": "Retângulo", "value": "tem 1 ângulo reto (90°)" },
    { "label": "Obtusângulo", "value": "tem 1 ângulo obtuso" }
  ] }
]
```

## A regra mágica do triângulo ✨

Aqui está um segredo lindo: em **qualquer** triângulo, os três ângulos somados dão **sempre 180°**! Não importa o feitio — é sempre 180°. 🪄

```math
{ "expr": "ângulo₁ + ângulo₂ + ângulo₃ = 180°", "say": "a soma dos três ângulos de um triângulo é sempre cento e oitenta graus" }
```

> **Truque:** se conheces **dois** ângulos de um triângulo, descobres o terceiro! É só fazer **180° menos os outros dois**. Por exemplo, se tens 90° e 60°, o que falta é 180 − 90 − 60 = **30°**. 🧠

## Quadriláteros — a família dos 4 lados ⬜

Os polígonos de **4 lados** chamam-se **quadriláteros**, e têm muitos primos. Os mais importantes:

```keyvalue
[
  { "k": "Quadrado", "v": "4 lados iguais + 4 ângulos retos ⬜" },
  { "k": "Retângulo", "v": "4 ângulos retos, lados iguais 2 a 2 ▭" },
  { "k": "Losango", "v": "4 lados iguais, mas «inclinado» (sem ângulos retos) 🔶" },
  { "k": "Trapézio", "v": "só tem 1 par de lados paralelos 🪁" }
]
```

> [!NOTE] Curiosidade: os 4 ângulos de **qualquer** quadrilátero somam sempre **360°** — o dobro do triângulo! Faz sentido: um quadrilátero é como **dois** triângulos colados. 🤝

## Simetria nos polígonos 🦋

Muitos polígonos têm **eixos de simetria** — linhas que os partem em duas metades iguais, como num espelho. Toca em «Espelhar» para veres a borboleta refletir-se!

```symmetry
{ "shape": "borboleta", "title": "Cada metade é o espelho da outra" }
```

## Um exemplo passo a passo 🔍

*«Um triângulo tem um ângulo de 90° e outro de 45°. Quanto mede o terceiro? E que triângulo é (pelos ângulos)?»* Vamos com calma. 🔺

```steps
[
  { "title": "1. A regra mágica", "body": "os 3 ângulos somam 180°, sempre ✨", "icon": "✨" },
  { "title": "2. Soma os conhecidos", "body": "90° + 45° = 135°", "icon": "🧮" },
  { "title": "3. Tira de 180°", "body": "180° − 135° = 45° → o terceiro ângulo!", "icon": "➖" },
  { "title": "4. Que triângulo é?", "body": "tem um ângulo de 90° → é um triângulo RETÂNGULO 📐", "icon": "📐" },
  { "title": "5. Resposta", "body": "o terceiro mede 45° e é um triângulo retângulo! 🎉", "icon": "🎉" }
]
```

> **Truque:** para descobrir o ângulo que falta num triângulo, faz sempre **180° − (a soma dos outros)**. Num quadrilátero, usa **360°**. 📌

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Ângulos e polígonos", "items": [
  { "front": "Ângulo de 90°", "back": "reto", "options": ["agudo", "obtuso"] },
  { "front": "Ângulo de 180° (linha direita)", "back": "raso", "options": ["reto", "giro"] },
  { "front": "Soma dos ângulos de um triângulo", "back": "180°", "options": ["90°", "360°"] },
  { "front": "Triângulo com 3 lados iguais", "back": "equilátero", "options": ["escaleno", "isósceles"] },
  { "front": "Polígono de 5 lados", "back": "pentágono", "options": ["hexágono", "triângulo"] },
  { "front": "Quadrilátero com 4 lados iguais e 4 ângulos retos", "back": "quadrado", "options": ["losango", "trapézio"] },
  { "front": "Soma dos ângulos de um quadrilátero", "back": "360°", "options": ["180°", "90°"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Há um polígono especial chamado **polígono regular**: tem **todos os lados iguais E todos os ângulos iguais** (como o quadrado ou o hexágono perfeito de uma colmeia 🐝). As abelhas constroem favos em hexágonos regulares porque é a forma que enche o espaço **sem deixar buracos** e gasta menos cera. Matemática feita por insetos! 🤯

## Vamos praticar 🎈

```quiz
{
  "id": "mat-5-angulos-poligonos-pratica",
  "questions": [
    { "q": "Um ângulo de exatamente 90° é…", "layout": "grid",
      "options": [ { "t": "reto", "emoji": "➕", "correct": true }, { "t": "agudo" }, { "t": "obtuso" } ],
      "explain": "90° é o canto certinho: ângulo reto." },
    { "q": "Os ângulos medem-se em…", "layout": "grid",
      "options": [ { "t": "graus (°), com o transferidor", "emoji": "📐", "correct": true }, { "t": "centímetros" }, { "t": "quilos" } ],
      "explain": "A abertura mede-se em graus, com o transferidor." },
    { "q": "Quantos lados tem um pentágono?", "layout": "grid",
      "options": [ { "t": "5", "emoji": "⭐", "correct": true }, { "t": "6" }, { "t": "4" } ],
      "explain": "Penta = 5: cinco lados e cinco vértices." },
    { "q": "Os três ângulos de um triângulo somam sempre…", "layout": "grid",
      "options": [ { "t": "180°", "emoji": "✨", "correct": true }, { "t": "90°" }, { "t": "360°" } ],
      "explain": "É a regra mágica: 180° em qualquer triângulo." },
    { "q": "Um triângulo com 3 lados iguais é…", "layout": "grid",
      "options": [ { "t": "equilátero", "emoji": "🔺", "correct": true }, { "t": "escaleno" }, { "t": "retângulo" } ],
      "explain": "Equilátero = lados todos iguais." },
    { "q": "Qual destes NÃO é um polígono?", "layout": "grid",
      "options": [ { "t": "círculo", "emoji": "⭕", "correct": true }, { "t": "triângulo", "emoji": "🔺" }, { "t": "hexágono", "emoji": "🐝" } ],
      "explain": "O círculo é curvo; os polígonos só têm lados direitos." },
    { "q": "Um ângulo de 130° é…", "layout": "grid",
      "options": [ { "t": "obtuso", "emoji": "😮", "correct": true }, { "t": "agudo" }, { "t": "reto" } ],
      "explain": "Está entre 90° e 180°: obtuso." },
    { "q": "Um quadrilátero com 4 lados iguais e 4 ângulos retos é um…", "layout": "grid",
      "options": [ { "t": "quadrado", "emoji": "⬜", "correct": true }, { "t": "trapézio" }, { "t": "losango" } ],
      "explain": "Lados iguais + ângulos retos = quadrado." },
    { "q": "Se um triângulo tem ângulos de 90° e 60°, o terceiro mede…", "layout": "grid",
      "options": [ { "t": "30°", "emoji": "🧠", "correct": true }, { "t": "60°" }, { "t": "90°" } ],
      "explain": "180 − 90 − 60 = 30°." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-angulos-poligonos-final",
  "final": true,
  "title": "Ângulos e polígonos",
  "questions": [
    { "q": "Uma volta completa tem…", "layout": "grid",
      "options": [ { "t": "360°", "emoji": "🔄", "correct": true }, { "t": "180°" }, { "t": "90°" } ],
      "explain": "A volta inteira é 360°, como uma roda." },
    { "q": "Um ângulo de 45° é…", "layout": "grid",
      "options": [ { "t": "agudo", "emoji": "🤏", "correct": true }, { "t": "obtuso" }, { "t": "reto" } ],
      "explain": "Menos de 90° → agudo." },
    { "q": "Um polígono de 6 lados é um…", "layout": "grid",
      "options": [ { "t": "hexágono", "emoji": "🐝", "correct": true }, { "t": "pentágono" }, { "t": "quadrilátero" } ],
      "explain": "Hexa = 6 lados." },
    { "q": "Um triângulo com um ângulo reto chama-se…", "layout": "grid",
      "options": [ { "t": "retângulo", "emoji": "📐", "correct": true }, { "t": "equilátero" }, { "t": "acutângulo" } ],
      "explain": "Pelos ângulos: tem um ângulo de 90° → retângulo." },
    { "q": "Se um triângulo tem 100° e 50°, o terceiro ângulo é…", "layout": "grid",
      "options": [ { "t": "30°", "emoji": "🧠", "correct": true }, { "t": "50°" }, { "t": "80°" } ],
      "explain": "180 − 100 − 50 = 30°." },
    { "q": "Os 4 ângulos de um quadrilátero somam…", "layout": "grid",
      "options": [ { "t": "360°", "emoji": "🤝", "correct": true }, { "t": "180°" }, { "t": "90°" } ],
      "explain": "Um quadrilátero é como dois triângulos: 2 × 180° = 360°." },
    { "q": "Um triângulo com 2 lados iguais é…", "layout": "grid",
      "options": [ { "t": "isósceles", "emoji": "🔺", "correct": true }, { "t": "equilátero" }, { "t": "escaleno" } ],
      "explain": "Isósceles = exatamente 2 lados iguais." },
    { "q": "Um quadrilátero com só 1 par de lados paralelos é um…", "layout": "grid",
      "options": [ { "t": "trapézio", "emoji": "🪁", "correct": true }, { "t": "quadrado" }, { "t": "retângulo" } ],
      "explain": "Trapézio: apenas um par de lados paralelos." },
    { "q": "Uma linha que parte uma figura em duas metades espelhadas é um…", "layout": "grid",
      "options": [ { "t": "eixo de simetria", "emoji": "🦋", "correct": true }, { "t": "ângulo reto" }, { "t": "vértice" } ],
      "explain": "O eixo de simetria divide a figura em duas metades iguais." }
  ]
}
```
