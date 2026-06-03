# Traçados geométricos 📐

> [!NOTE] **O que vais aprender** 👀 A desenhar com **rigor**, como os arquitetos! Vais conhecer os **instrumentos** (régua, esquadro, compasso, transferidor), traçar **retas paralelas e perpendiculares**, perceber os **ângulos**, desenhar **circunferências** com o compasso e descobrir os **polígonos** e os bonitos **padrões geométricos**. 📐✨

Há desenhos à mão livre, soltos e divertidos. Mas há outros que precisam de **rigor**: a planta de uma casa, um azulejo, um logótipo certinho. Para esses, os artistas e os arquitetos usam **instrumentos de desenho** que fazem linhas perfeitas. No 5.º ano vais aprender a usá-los como um profissional. Prepara a régua e o compasso — vamos traçar! 🏗️

## Os instrumentos do desenho rigoroso 📦

Cada ferramenta tem o seu trabalho. Conhece-as bem:

```keyvalue
[
  { "k": "Régua", "v": "traça linhas retas e mede comprimentos em cm e mm 📏" },
  { "k": "Esquadro", "v": "tem um canto de 90° (ângulo reto) — faz perpendiculares e paralelas 📐" },
  { "k": "Compasso", "v": "desenha circunferências e marca distâncias exatas ⭕" },
  { "k": "Transferidor", "v": "mede e marca ângulos em graus (°) 🌡️" },
  { "k": "Lápis afiado", "v": "ponta fina (HB ou H) para um traço limpo e rigoroso ✏️" }
]
```

> **Truque:** o **esquadro** tem sempre um **canto certinho** de 90°. Encosta esse canto à régua e tens logo uma linha **perpendicular** — sem precisar de medir nada! 📐

## Retas paralelas e perpendiculares 🛤️

Duas retas podem relacionar-se de duas maneiras muito importantes:

```compare
[
  { "title": "Paralelas 🛤️", "rows": [
    { "label": "Como são", "value": "andam sempre lado a lado, à mesma distância" },
    { "label": "Encontram-se?", "value": "nunca! Como os carris do comboio 🚂" },
    { "label": "Exemplo", "value": "as duas margens de uma estrada direita" }
  ] },
  { "title": "Perpendiculares ➕", "rows": [
    { "label": "Como são", "value": "cruzam-se formando um ângulo reto (90°)", "highlight": true },
    { "label": "Encontram-se?", "value": "sim, num canto certinho, em cruz ➕", "highlight": true },
    { "label": "Exemplo", "value": "os lados de uma janela; o + de mais", "highlight": true }
  ] }
]
```

> **Para nunca trocares:** **PARALELAS** andam **lado a lado** e **nunca** se tocam (como duas linhas a fugir uma da outra ║). **PERPENDICULARES** fazem um **cruzamento certinho** de 90° (como o sinal de **mais** ➕). 🛤️➕

## Os ângulos: a abertura entre duas linhas 📐

Quando duas linhas partem do mesmo ponto (o **vértice**), formam um **ângulo** — uma abertura que se mede em **graus (°)** com o transferidor. Mexe na «boca de crocodilo» e vê os graus mudarem:

```angle
{ "title": "Abre e fecha — vê os graus mudarem!", "angle": 50 }
```

O mais importante de todos é o **ângulo reto**, de **90°** — o canto certinho do esquadro e de uma folha. Decora estes três:

```angle
{ "title": "Agudo: menos de 90°", "angle": 40, "interactive": false, "color": "ok" }
```

```angle
{ "title": "Reto: 90° certinho (faz a esquadria!)", "angle": 90, "interactive": false }
```

```angle
{ "title": "Obtuso: mais de 90°", "angle": 130, "interactive": false, "color": "accent" }
```

```keyvalue
[
  { "k": "Agudo", "v": "menos de 90° — fechadinho, como uma fatia fina 🤏" },
  { "k": "Reto", "v": "exatamente 90° — o canto da folha ➕" },
  { "k": "Obtuso", "v": "entre 90° e 180° — bem aberto 😮" },
  { "k": "Raso", "v": "exatamente 180° — uma linha direita ➖" }
]
```

## A circunferência e o compasso ⭕

O **compasso** desenha a forma mais perfeita: a **circunferência** (a linha redonda). Aprende as suas partes:

```keyvalue
[
  { "k": "Centro", "v": "o ponto onde espetas a ponta seca do compasso 📍" },
  { "k": "Raio", "v": "a distância do centro à linha — a abertura do compasso 📏" },
  { "k": "Diâmetro", "v": "atravessa o centro de lado a lado — vale o dobro do raio! ↔️" },
  { "k": "Circunferência", "v": "a própria linha redonda à volta ⭕" }
]
```

```steps
[
  { "title": "1. Marca o centro", "body": "faz um ponto onde queres o meio da circunferência 📍", "icon": "📍" },
  { "title": "2. Abre o compasso", "body": "afasta as pernas do compasso à medida do raio que queres 📏", "icon": "📏" },
  { "title": "3. Espeta a ponta seca", "body": "fixa bem a ponta de metal no ponto do centro 📌", "icon": "📌" },
  { "title": "4. Roda 360°", "body": "gira o lápis devagar à volta, sem mudar a abertura — e fica a circunferência! ⭕", "icon": "⭕" }
]
```

> **Truque do hexágono:** com o compasso, faz uma circunferência. Sem mudar a abertura, espeta a ponta na linha e marca; anda para essa marca e repete. Dás **6 voltas** e voltas ao início — une os 6 pontos e tens um **hexágono perfeito**! É magia da geometria. 🐝⬡

## Os polígonos certinhos 🔷

Com régua e compasso desenham-se **polígonos** rigorosos — figuras fechadas só de linhas retas. Conta os lados:

```shape
{ "title": "Polígonos: conta os lados", "showSides": true,
  "shapes": [
    { "kind": "triangle", "color": "mat" },
    { "kind": "square", "color": "ok" },
    { "kind": "pentagon", "color": "accent" },
    { "kind": "hexagon", "color": "info" }
  ] }
```

> O **triângulo** tem 3 lados, o **quadrado** 4, o **pentágono** 5 e o **hexágono** 6. Quanto mais lados, mais o polígono se aproxima de um **círculo**! ⭕

## Padrões e simetria 🔷🔷

Repetir um traçado geométrico cria um **padrão** — como nos **azulejos** portugueses ou nas **rosáceas** das igrejas. Muitos têm **simetria**: uma metade é o **espelho** da outra.

```figure
{ "emoji": "🔷", "caption": "Repetir uma forma geométrica cria um padrão — é assim que se desenham azulejos e mosaicos." }
```

## Um exemplo passo a passo 🔍

Vamos desenhar um **quadrado rigoroso** de 4 cm com régua e esquadro. Repara como o esquadro faz os cantos perfeitos:

```steps
[
  { "title": "1. A base", "body": "com a régua, traça uma linha reta de 4 cm 📏", "icon": "📏" },
  { "title": "2. Os cantos retos", "body": "encosta o esquadro a cada ponta e sobe a 90° — duas linhas perpendiculares 📐", "icon": "📐" },
  { "title": "3. Mede 4 cm em cada lado", "body": "marca 4 cm nas duas linhas que subiram ✏️", "icon": "✏️" },
  { "title": "4. Fecha o topo", "body": "une as duas marcas de cima com a régua 📏", "icon": "📏" },
  { "title": "5. Quadrado perfeito!", "body": "4 lados iguais e 4 ângulos retos — rigorosíssimo! ◻️", "icon": "◻️" }
]
```

## Treina os traçados 🎯

```drill
{ "mode": "choose", "title": "Qual é o instrumento certo?", "items": [
  { "front": "Desenhar uma circunferência", "back": "compasso", "options": ["régua", "transferidor"] },
  { "front": "Medir um ângulo em graus", "back": "transferidor", "options": ["compasso", "esquadro"] },
  { "front": "Traçar uma linha reta e medir cm", "back": "régua", "options": ["compasso", "transferidor"] },
  { "front": "Fazer um canto de 90° (perpendicular)", "back": "esquadro", "options": ["compasso", "transferidor"] }
] }
```

```drill
{ "mode": "choose", "title": "Geometria: certo ou troca?", "items": [
  { "front": "Retas que nunca se tocam são…", "back": "paralelas", "options": ["perpendiculares", "obtusas"] },
  { "front": "Retas que se cruzam a 90° são…", "back": "perpendiculares", "options": ["paralelas", "agudas"] },
  { "front": "Um ângulo de 90° é…", "back": "reto", "options": ["agudo", "obtuso"] },
  { "front": "Um ângulo menor que 90° é…", "back": "agudo", "options": ["reto", "obtuso"] },
  { "front": "A distância do centro à circunferência é o…", "back": "raio", "options": ["diâmetro", "centro"] },
  { "front": "A linha que atravessa o centro de lado a lado é o…", "back": "diâmetro", "options": ["raio", "vértice"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 O **diâmetro** é sempre o **dobro** do **raio** — se o raio é 3 cm, o diâmetro é 6 cm. E há um número muito especial escondido em **todas** as circunferências do mundo, grandes ou pequenas: se medisses a volta da circunferência e a dividisses pelo diâmetro, dava **sempre** o mesmo, cerca de **3,14**. Chama-se **pi** (escreve-se **π**, uma letra grega) e é tão famoso que tem um dia só para ele — o **dia do π**, a 14 de março (3/14)! 🥧🔢

## Vamos praticar 🎈

```quiz
{
  "id": "ev-5-geometria-pratica",
  "questions": [
    { "q": "Para desenhar uma circunferência usas o…", "layout": "grid", "options": [
      { "t": "compasso", "emoji": "⭕", "correct": true },
      { "t": "transferidor", "emoji": "🌡️" },
      { "t": "esquadro", "emoji": "📐" }
    ], "explain": "O compasso desenha circunferências e marca distâncias." },
    { "q": "Retas que andam lado a lado e nunca se tocam são…", "layout": "grid", "options": [
      { "t": "paralelas", "emoji": "🛤️", "correct": true },
      { "t": "perpendiculares", "emoji": "➕" }
    ], "explain": "Paralelas nunca se encontram — como os carris do comboio." },
    { "q": "Um ângulo de exatamente 90° é…", "layout": "grid", "options": [
      { "t": "reto", "emoji": "➕", "correct": true },
      { "t": "agudo", "emoji": "🤏" },
      { "t": "obtuso", "emoji": "😮" }
    ], "explain": "90° é o ângulo reto — o canto certinho da folha." },
    { "q": "A distância do centro até à linha da circunferência é o…", "layout": "grid", "options": [
      { "t": "raio", "emoji": "📏", "correct": true },
      { "t": "diâmetro", "emoji": "↔️" }
    ], "explain": "O raio vai do centro à circunferência." },
    { "q": "Para fazer um canto perfeito de 90° usas o…", "layout": "grid", "options": [
      { "t": "esquadro", "emoji": "📐", "correct": true },
      { "t": "compasso", "emoji": "⭕" }
    ], "explain": "O esquadro tem um canto de 90° para perpendiculares." },
    { "q": "Um polígono com 6 lados é o…", "layout": "grid", "options": [
      { "t": "hexágono", "emoji": "⬡", "correct": true },
      { "t": "pentágono", "emoji": "⬠" }
    ], "explain": "Hexágono = 6 lados (como o favo das abelhas)." },
    { "q": "Um ângulo com menos de 90° chama-se…", "layout": "grid", "options": [
      { "t": "agudo", "emoji": "🤏", "correct": true },
      { "t": "obtuso", "emoji": "😮" }
    ], "explain": "Menos de 90° é um ângulo agudo (fechadinho)." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "ev-5-geometria-final",
  "final": true,
  "title": "Traçados geométricos",
  "questions": [
    { "q": "Para medir um ângulo em graus usas o…", "layout": "grid", "options": [
      { "t": "transferidor", "emoji": "🌡️", "correct": true },
      { "t": "compasso", "emoji": "⭕" },
      { "t": "régua", "emoji": "📏" }
    ], "explain": "O transferidor mede e marca ângulos em graus." },
    { "q": "Retas que se cruzam formando um ângulo de 90° são…", "layout": "grid", "options": [
      { "t": "perpendiculares", "emoji": "➕", "correct": true },
      { "t": "paralelas", "emoji": "🛤️" }
    ], "explain": "Perpendiculares cruzam-se num canto certinho de 90°." },
    { "q": "Um ângulo entre 90° e 180° chama-se…", "layout": "grid", "options": [
      { "t": "obtuso", "emoji": "😮", "correct": true },
      { "t": "agudo", "emoji": "🤏" },
      { "t": "reto", "emoji": "➕" }
    ], "explain": "Mais de 90° (e menos de 180°) é um ângulo obtuso." },
    { "q": "O ponto onde espetas a ponta seca do compasso é o…", "layout": "grid", "options": [
      { "t": "centro", "emoji": "📍", "correct": true },
      { "t": "raio", "emoji": "📏" }
    ], "explain": "O centro é o meio da circunferência." },
    { "q": "A linha que atravessa o centro de lado a lado é o…", "layout": "grid", "options": [
      { "t": "diâmetro", "emoji": "↔️", "correct": true },
      { "t": "raio", "emoji": "📏" }
    ], "explain": "O diâmetro vai de um lado ao outro, passando pelo centro." },
    { "q": "O diâmetro é, em relação ao raio…", "layout": "grid", "options": [
      { "t": "o dobro", "emoji": "✖️", "correct": true },
      { "t": "metade", "emoji": "➗" }
    ], "explain": "O diâmetro vale sempre o dobro do raio." },
    { "q": "Quantos lados tem um pentágono?", "layout": "grid", "options": [
      { "t": "5", "emoji": "5️⃣", "correct": true },
      { "t": "6", "emoji": "6️⃣" }
    ], "explain": "O pentágono tem 5 lados e 5 vértices." },
    { "q": "Um padrão geométrico repetido vê-se, por exemplo, num…", "layout": "grid", "options": [
      { "t": "azulejo português", "emoji": "🔷", "correct": true },
      { "t": "céu sem nuvens", "emoji": "🌤️" }
    ], "explain": "Os azulejos e mosaicos repetem traçados geométricos." },
    { "q": "Para fazer um quadrado rigoroso, o esquadro serve para…", "layout": "grid", "options": [
      { "t": "garantir os cantos a 90°", "emoji": "📐", "correct": true },
      { "t": "pintar o interior", "emoji": "🎨" }
    ], "explain": "O esquadro faz os cantos retos (90°) perfeitos." }
  ]
}
```
