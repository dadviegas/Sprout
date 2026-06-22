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
      "options": [ { "t": "reto", "emoji": "➕", "correct": true }, { "t": "agudo", "feedback": "Agudo é menos de 90° (mais fechado). 90° certinho é o ângulo reto, o canto da folha.", "tag": "angulo-tipo" }, { "t": "obtuso", "feedback": "Obtuso é mais de 90° (mais aberto). 90° certinho é o ângulo reto.", "tag": "angulo-tipo" } ],
      "explain": "90° é o canto certinho: ângulo reto." },
    { "q": "Os ângulos medem-se em…", "layout": "grid",
      "options": [ { "t": "graus (°), com o transferidor", "emoji": "📐", "correct": true }, { "t": "centímetros", "feedback": "Centímetros medem comprimentos (uma régua). A abertura de um ângulo mede-se em graus, com o transferidor.", "tag": "angulo-medir" }, { "t": "quilos", "feedback": "Quilos medem o peso. A abertura de um ângulo mede-se em graus, com o transferidor.", "tag": "angulo-medir" } ],
      "explain": "A abertura mede-se em graus, com o transferidor." },
    { "q": "Quantos lados tem um pentágono?", "layout": "grid",
      "options": [ { "t": "5", "emoji": "⭐", "correct": true }, { "t": "6", "feedback": "6 lados é o hexágono. «Penta» quer dizer 5: o pentágono tem 5 lados.", "tag": "poligono-lados" }, { "t": "4", "feedback": "4 lados é o quadrilátero. «Penta» quer dizer 5: o pentágono tem 5 lados.", "tag": "poligono-lados" } ],
      "explain": "Penta = 5: cinco lados e cinco vértices." },
    { "q": "Os três ângulos de um triângulo somam sempre…", "layout": "grid",
      "options": [ { "t": "180°", "emoji": "✨", "correct": true }, { "t": "90°", "feedback": "90° é só um ângulo reto. Os três ângulos de um triângulo somam sempre 180°.", "tag": "triangulo-soma-angulos" }, { "t": "360°", "feedback": "360° é a volta completa (e a soma de um quadrilátero). Num triângulo, os três ângulos somam 180°.", "tag": "triangulo-soma-angulos" } ],
      "explain": "É a regra mágica: 180° em qualquer triângulo." },
    { "q": "Um triângulo com 3 lados iguais é…", "layout": "grid",
      "options": [ { "t": "equilátero", "emoji": "🔺", "correct": true }, { "t": "escaleno", "feedback": "Escaleno tem os 3 lados diferentes. Com os 3 lados iguais é equilátero.", "tag": "triangulo-tipo" }, { "t": "retângulo", "feedback": "Retângulo classifica-se pelos ângulos (tem um de 90°), não pelos lados. Com os 3 lados iguais é equilátero.", "tag": "triangulo-tipo" } ],
      "explain": "Equilátero = lados todos iguais." },
    { "q": "Qual destes NÃO é um polígono?", "layout": "grid",
      "options": [ { "t": "círculo", "emoji": "⭕", "correct": true }, { "t": "triângulo", "emoji": "🔺", "feedback": "O triângulo é um polígono — tem 3 lados direitos. Quem não é polígono é o círculo, que é curvo.", "tag": "poligono-tipo" }, { "t": "hexágono", "emoji": "🐝", "feedback": "O hexágono é um polígono — tem 6 lados direitos. Quem não é polígono é o círculo, que é curvo.", "tag": "poligono-tipo" } ],
      "explain": "O círculo é curvo; os polígonos só têm lados direitos." },
    { "q": "Um ângulo de 130° é…", "layout": "grid",
      "options": [ { "t": "obtuso", "emoji": "😮", "correct": true }, { "t": "agudo", "feedback": "Agudo é menos de 90°. 130° é maior que 90° e menor que 180°: é obtuso.", "tag": "angulo-tipo" }, { "t": "reto", "feedback": "Reto é exatamente 90°. 130° passa dos 90°: é obtuso.", "tag": "angulo-tipo" } ],
      "explain": "Está entre 90° e 180°: obtuso." },
    { "q": "Um quadrilátero com 4 lados iguais e 4 ângulos retos é um…", "layout": "grid",
      "options": [ { "t": "quadrado", "emoji": "⬜", "correct": true }, { "t": "trapézio", "feedback": "O trapézio só tem 1 par de lados paralelos. Com 4 lados iguais e 4 ângulos retos é um quadrado.", "tag": "quadrilatero-tipo" }, { "t": "losango", "feedback": "O losango tem 4 lados iguais, mas é inclinado (sem ângulos retos). Com ângulos retos também é um quadrado.", "tag": "quadrilatero-tipo" } ],
      "explain": "Lados iguais + ângulos retos = quadrado." },
    { "q": "Se um triângulo tem ângulos de 90° e 60°, o terceiro mede…", "layout": "grid",
      "options": [ { "t": "30°", "emoji": "🧠", "correct": true }, { "t": "60°", "feedback": "60° era o segundo ângulo, não o que falta. Faz 180 − 90 − 60 = 30°.", "tag": "triangulo-soma-angulos" }, { "t": "90°", "feedback": "90° era o primeiro ângulo. O que falta é 180 − 90 − 60 = 30°.", "tag": "triangulo-soma-angulos" } ],
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
      "options": [ { "t": "360°", "emoji": "🔄", "correct": true }, { "t": "180°", "feedback": "180° é só meia volta (ângulo raso, uma linha direita). A volta inteira é 360°.", "tag": "angulo-tamanho-abertura" }, { "t": "90°", "feedback": "90° é só um quarto de volta (ângulo reto). A volta completa é 360°.", "tag": "angulo-tamanho-abertura" } ],
      "explain": "A volta inteira é 360°, como uma roda." },
    { "q": "Um ângulo de 45° é…", "layout": "grid",
      "options": [ { "t": "agudo", "emoji": "🤏", "correct": true }, { "t": "obtuso", "feedback": "Obtuso é mais de 90°. 45° é menos de 90°: é agudo.", "tag": "angulo-tipo" }, { "t": "reto", "feedback": "Reto é exatamente 90°. 45° é metade disso, ainda agudo.", "tag": "angulo-tipo" } ],
      "explain": "Menos de 90° → agudo." },
    { "q": "Um polígono de 6 lados é um…", "layout": "grid",
      "options": [ { "t": "hexágono", "emoji": "🐝", "correct": true }, { "t": "pentágono", "feedback": "O pentágono tem 5 lados. Com 6 lados é o hexágono («hexa» = 6).", "tag": "poligono-lados" }, { "t": "quadrilátero", "feedback": "O quadrilátero tem 4 lados. Com 6 lados é o hexágono («hexa» = 6).", "tag": "poligono-lados" } ],
      "explain": "Hexa = 6 lados." },
    { "q": "Um triângulo com um ângulo reto chama-se…", "layout": "grid",
      "options": [ { "t": "retângulo", "emoji": "📐", "correct": true }, { "t": "equilátero", "feedback": "Equilátero classifica-se pelos lados (3 iguais). Ter um ângulo de 90° faz dele retângulo.", "tag": "triangulo-tipo" }, { "t": "acutângulo", "feedback": "Acutângulo tem os 3 ângulos agudos (todos < 90°). Com um ângulo de 90° é retângulo.", "tag": "triangulo-tipo" } ],
      "explain": "Pelos ângulos: tem um ângulo de 90° → retângulo." },
    { "q": "Se um triângulo tem 100° e 50°, o terceiro ângulo é…", "layout": "grid",
      "options": [ { "t": "30°", "emoji": "🧠", "correct": true }, { "t": "50°", "feedback": "50° era um dos ângulos dados. O que falta é 180 − 100 − 50 = 30°.", "tag": "triangulo-soma-angulos" }, { "t": "80°", "feedback": "80° não fecha os 180°: 100 + 50 + 80 = 230. O terceiro é 180 − 100 − 50 = 30°.", "tag": "triangulo-soma-angulos" } ],
      "explain": "180 − 100 − 50 = 30°." },
    { "q": "Os 4 ângulos de um quadrilátero somam…", "layout": "grid",
      "options": [ { "t": "360°", "emoji": "🤝", "correct": true }, { "t": "180°", "feedback": "180° é a soma de um triângulo. O quadrilátero são dois triângulos colados: 2 × 180° = 360°.", "tag": "quadrilatero-soma-angulos" }, { "t": "90°", "feedback": "90° é só um ângulo reto. Os 4 ângulos de um quadrilátero somam 360°.", "tag": "quadrilatero-soma-angulos" } ],
      "explain": "Um quadrilátero é como dois triângulos: 2 × 180° = 360°." },
    { "q": "Um triângulo com 2 lados iguais é…", "layout": "grid",
      "options": [ { "t": "isósceles", "emoji": "🔺", "correct": true }, { "t": "equilátero", "feedback": "Equilátero tem os 3 lados iguais. Com exatamente 2 lados iguais é isósceles.", "tag": "triangulo-tipo" }, { "t": "escaleno", "feedback": "Escaleno tem os 3 lados diferentes. Com 2 lados iguais é isósceles.", "tag": "triangulo-tipo" } ],
      "explain": "Isósceles = exatamente 2 lados iguais." },
    { "q": "Um quadrilátero com só 1 par de lados paralelos é um…", "layout": "grid",
      "options": [ { "t": "trapézio", "emoji": "🪁", "correct": true }, { "t": "quadrado", "feedback": "O quadrado tem os dois pares de lados paralelos. Só com 1 par é o trapézio.", "tag": "quadrilatero-tipo" }, { "t": "retângulo", "feedback": "O retângulo tem os dois pares de lados paralelos. Só com 1 par é o trapézio.", "tag": "quadrilatero-tipo" } ],
      "explain": "Trapézio: apenas um par de lados paralelos." },
    { "q": "Uma linha que parte uma figura em duas metades espelhadas é um…", "layout": "grid",
      "options": [ { "t": "eixo de simetria", "emoji": "🦋", "correct": true }, { "t": "ângulo reto", "feedback": "Um ângulo reto é um canto de 90°, não uma linha. A linha que espelha a figura é o eixo de simetria.", "tag": "simetria-eixo" }, { "t": "vértice", "feedback": "O vértice é um bico/canto, não uma linha. A linha que espelha a figura é o eixo de simetria.", "tag": "simetria-eixo" } ],
      "explain": "O eixo de simetria divide a figura em duas metades iguais." }
  ]
}
```
