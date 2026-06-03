# Volume e perspetiva 🧊

> [!NOTE] **O que vais aprender** 👀 A diferença entre uma **figura plana** (2D) e um **sólido** com **volume** (3D), como desenhar sólidos a partir das formas, e o segredo dos artistas para fazer um papel **liso** parecer ter **profundidade**: a **perspetiva**, com a sua **linha do horizonte** e os **pontos de fuga**. 🧊📐

Olha para um quadrado desenhado no papel. É **plano**: só tem comprimento e largura. Agora pega num dado de jogar — é um **cubo**, tem comprimento, largura **e** altura. Ocupa espaço, podes pegar nele: tem **volume**! O grande desafio do desenho é este: como é que, num papel achatado, fazemos as coisas parecerem **fundas**, como se entrássemos lá para dentro? A resposta tem um nome mágico: **perspetiva**. Vamos descobrir o truque! ✏️🚪

## Plano (2D) ou volume (3D)? 📐

```compare
[
  { "title": "Figura plana (2D) 🔲", "rows": [
    { "label": "Dimensões", "value": "2 — comprimento e largura" },
    { "label": "Como é", "value": "achatada, como um desenho ou uma folha" },
    { "label": "Exemplos", "value": "quadrado, círculo, triângulo" }
  ] },
  { "title": "Sólido (3D) 🧊", "rows": [
    { "label": "Dimensões", "value": "3 — comprimento, largura e altura", "highlight": true },
    { "label": "Como é", "value": "ocupa espaço, dá para pegar e virar", "highlight": true },
    { "label": "Exemplos", "value": "cubo, esfera, cilindro, cone, pirâmide", "highlight": true }
  ] }
]
```

Cada forma plana tem um "irmão" com volume. Aprende os pares — vão dar-te jeito o desenho todo:

```keyvalue
[
  { "k": "Quadrado → Cubo", "v": "o dado de jogar 🎲" },
  { "k": "Círculo → Esfera", "v": "a bola de futebol ⚽" },
  { "k": "Retângulo → Paralelepípedo", "v": "uma caixa de sapatos 📦" },
  { "k": "Triângulo → Pirâmide / Cone", "v": "as pirâmides do Egito / um gelado 🍦" },
  { "k": "Círculo (de pé) → Cilindro", "v": "uma lata de conserva 🥫" }
]
```

> **Truque para distinguir:** se podes **agarrar** e **virar** ao contrário, tem volume (é 3D). Se está "preso" no papel e só o podes ver de frente, é plano (2D). 🤲

## Desenhar um cubo a partir do quadrado 🎲

Não precisas de ser um génio. Um cubo é só **dois quadrados** ligados pelos cantos! Segue os passos e tu próprio o desenhas:

<figure class="figure-widget" style="max-width:420px">
  <svg viewBox="0 0 240 200" role="img" aria-label="Um cubo desenhado como dois quadrados sobrepostos e desviados, com os cantos ligados por linhas diagonais." style="width:100%;height:auto;background:var(--surface-2,#f4f6fb);border-radius:16px">
    <rect x="40" y="70" width="100" height="100" fill="#cfe0ff" stroke="#1e3a66" stroke-width="3"/>
    <rect x="90" y="30" width="100" height="100" fill="#eaf1ff" stroke="#1e3a66" stroke-width="3" stroke-dasharray="0"/>
    <line x1="40" y1="70" x2="90" y2="30" stroke="#1e3a66" stroke-width="3"/>
    <line x1="140" y1="70" x2="190" y2="30" stroke="#1e3a66" stroke-width="3"/>
    <line x1="40" y1="170" x2="90" y2="130" stroke="#1e3a66" stroke-width="3"/>
    <line x1="140" y1="170" x2="190" y2="130" stroke="#1e3a66" stroke-width="3"/>
  </svg>
  <figcaption class="figure-cap"><span class="figure-cap__text">Um cubo são dois quadrados iguais, desviados, com os quatro cantos ligados.</span></figcaption>
</figure>

```steps
[
  { "title": "1. O primeiro quadrado", "body": "desenha um quadrado — vai ser a face da frente 🔲", "icon": "🔲" },
  { "title": "2. O segundo quadrado", "body": "desenha outro igual, um pouco para cima e para o lado 🔳", "icon": "🔳" },
  { "title": "3. Liga os cantos", "body": "une cada canto de um quadrado ao canto correspondente do outro 📏", "icon": "📏" },
  { "title": "4. Apaga o que não se vê", "body": "as arestas escondidas atrás ficam a tracejado — e está um cubo! 🎲", "icon": "🎲" }
]
```

> **Truque do volume:** já sabes da lição anterior — sombreia uma face mais clara (a que apanha luz) e a outra mais escura. Com **luz e sombra**, o cubo deixa de ser linhas e passa a parecer **sólido** de verdade. 🌗

## A perspetiva: a magia da profundidade 🛣️

Já reparaste que uma estrada parece **estreitar** ao longe, até virar um ponto? E que os carrinhos lá ao fundo são minúsculos? Isto é a **perspetiva**: as coisas parecem **mais pequenas** quanto mais longe estão, e as linhas paralelas parecem **juntar-se** num ponto. Os artistas usam isto para criar profundidade.

<figure class="figure-widget" style="max-width:460px">
  <svg viewBox="0 0 360 200" role="img" aria-label="Uma estrada com linhas que partem de um ponto de fuga no centro do horizonte e se abrem em direção a nós; árvores grandes à frente e pequenas ao fundo." style="width:100%;height:auto;background:var(--surface-2,#eef4ff);border-radius:16px">
    <rect x="0" y="0" width="360" height="100" fill="#bfe0ff"/>
    <rect x="0" y="100" width="360" height="100" fill="#cdebc2"/>
    <line x1="0" y1="100" x2="360" y2="100" stroke="#7a8198" stroke-width="2"/>
    <polygon points="180,100 130,200 230,200" fill="#6b7280"/>
    <line x1="180" y1="100" x2="180" y2="200" stroke="#ffd23f" stroke-width="3" stroke-dasharray="10 10"/>
    <circle cx="180" cy="100" r="6" fill="#e23b3b"/>
    <line x1="180" y1="100" x2="40" y2="160" stroke="#7a8198" stroke-width="1.5" stroke-dasharray="4 4"/>
    <line x1="180" y1="100" x2="320" y2="160" stroke="#7a8198" stroke-width="1.5" stroke-dasharray="4 4"/>
    <circle cx="60" cy="150" r="22" fill="#3f8f3f"/><rect x="56" y="150" width="8" height="22" fill="#7a5230"/>
    <circle cx="300" cy="150" r="22" fill="#3f8f3f"/><rect x="296" y="150" width="8" height="22" fill="#7a5230"/>
    <circle cx="150" cy="108" r="8" fill="#3f8f3f"/><rect x="148" y="108" width="3" height="8" fill="#7a5230"/>
    <circle cx="210" cy="108" r="8" fill="#3f8f3f"/><rect x="209" y="108" width="3" height="8" fill="#7a5230"/>
    <text x="180" y="94" font-size="11" fill="#e23b3b" text-anchor="middle">ponto de fuga</text>
    <text x="300" y="118" font-size="10" fill="#7a8198" text-anchor="end">linha do horizonte ➜</text>
  </svg>
  <figcaption class="figure-cap"><span class="figure-cap__text">As linhas da estrada juntam-se no ponto de fuga, sobre a linha do horizonte. As árvores ao fundo ficam pequeninas.</span></figcaption>
</figure>

```keyvalue
[
  { "k": "Linha do horizonte", "v": "a linha onde o céu encontra o chão — está à altura dos teus olhos 👀" },
  { "k": "Ponto de fuga", "v": "o ponto onde as linhas paralelas parecem juntar-se 📍" },
  { "k": "Regra do tamanho", "v": "quanto mais LONGE, mais PEQUENO o objeto parece 🔭" },
  { "k": "Regra da posição", "v": "o que está mais perto desenha-se mais EM BAIXO na folha ⬇️" }
]
```

> **Truque do horizonte:** estica o braço e olha em frente — a linha do horizonte está sempre à **altura dos teus olhos**. Se te baixares, ela desce contigo; se subires a uma escada, ela sobe. É por isso que, deitado na praia, o mar parece "subir" no céu! 🏖️

## Os tipos de perspetiva 1️⃣2️⃣

A perspetiva pode ter **um** ou **dois** pontos de fuga, e o resultado é bem diferente:

```compare
[
  { "title": "1 ponto de fuga 🛤️", "rows": [
    { "label": "Quando se usa", "value": "olhas uma cena de frente (uma rua, um corredor)" },
    { "label": "As linhas", "value": "fogem todas para UM só ponto ao fundo" },
    { "label": "Exemplo", "value": "olhar por um corredor de escola a direito" }
  ] },
  { "title": "2 pontos de fuga 🏢", "rows": [
    { "label": "Quando se usa", "value": "olhas um objeto pela ESQUINA (a quina de um prédio)", "highlight": true },
    { "label": "As linhas", "value": "fogem para DOIS pontos, um de cada lado", "highlight": true },
    { "label": "Exemplo", "value": "ver a esquina de um prédio na rua", "highlight": true }
  ] }
]
```

## Um problema passo a passo 🔍

*«Queres desenhar uma fila de 3 postes de luz, todos com 4 metros de altura, ao longo de uma estrada que foge ao longe. Como fazes para parecerem todos iguais... mas em perspetiva?»* 🛣️

```steps
[
  { "title": "1. Linha do horizonte", "body": "traça-a à altura dos olhos e marca o ponto de fuga 📍" },
  { "title": "2. O primeiro poste", "body": "desenha o mais próximo bem GRANDE, à frente 🟫" },
  { "title": "3. Linhas-guia ao ponto de fuga", "body": "do topo e da base do poste, traça linhas até ao ponto de fuga 📐" },
  { "title": "4. Os outros postes", "body": "desenha-os ENTRE essas duas guias — cada um mais para o fundo é mais pequeno 🔭" },
  { "title": "5. Resultado", "body": "são todos 'iguais' de verdade, mas parecem encolher ao longe — perspetiva! ✨" }
]
```

> Os postes têm todos **4 metros**, mas no desenho o do fundo pode ter metade do tamanho do da frente. O olho não acha estranho — pelo contrário, é **assim** que vê o mundo real! 👁️

## Treina volume e perspetiva 🎯

```drill
{ "mode": "choose", "title": "Qual é a resposta certa?", "items": [
  { "front": "O sólido com volume do quadrado é o…", "back": "cubo", "options": ["círculo", "cone"] },
  { "front": "O sólido com volume do círculo é a…", "back": "esfera", "options": ["pirâmide", "cubo"] },
  { "front": "Uma lata de conserva é um…", "back": "cilindro", "options": ["cubo", "cone"] },
  { "front": "Um gelado de cone tem a forma de…", "back": "cone", "options": ["esfera", "cilindro"] },
  { "front": "A linha onde o céu encontra o chão é a…", "back": "linha do horizonte", "options": ["ponto de fuga", "aresta"] },
  { "front": "O ponto onde as linhas paralelas se juntam é o…", "back": "ponto de fuga", "options": ["horizonte", "vértice"] },
  { "front": "Um objeto mais longe parece…", "back": "mais pequeno", "options": ["maior", "igual"] },
  { "front": "Ver a esquina de um prédio usa…", "back": "2 pontos de fuga", "options": ["1 ponto de fuga", "nenhum ponto"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 A perspetiva não existiu sempre! Na Idade Média, os pintores desenhavam tudo "achatado" e faziam as figuras importantes (como os reis) **gigantes**, e as menos importantes pequeninas — não pelo tamanho real, mas pela importância. Foi só no **Renascimento**, há cerca de 600 anos, em Itália, que um arquiteto chamado **Brunelleschi** descobriu as **regras matemáticas** da perspetiva com pontos de fuga. De repente, os quadros pareciam **janelas** abertas para um mundo a sério! Foi uma das maiores revoluções da história da arte — juntar **matemática** e **desenho** para enganar o olho. 🏛️📐

## Vamos praticar 🎈

```quiz
{
  "id": "ev-6-volume-pratica",
  "questions": [
    { "q": "Uma figura plana (2D) tem…", "layout": "grid", "options": [
      { "t": "comprimento e largura", "emoji": "🔲", "correct": true },
      { "t": "comprimento, largura e altura", "emoji": "🧊" }
    ], "explain": "Plana = 2 dimensões. O volume (3D) acrescenta a altura." },
    { "q": "O sólido com volume do quadrado é o…", "layout": "grid", "options": [
      { "t": "cubo", "emoji": "🎲", "correct": true },
      { "t": "círculo", "emoji": "⭕" },
      { "t": "triângulo", "emoji": "🔺" }
    ], "explain": "Quadrado → cubo, como um dado de jogar." },
    { "q": "Uma bola de futebol tem a forma de…", "layout": "grid", "options": [
      { "t": "esfera", "emoji": "⚽", "correct": true },
      { "t": "cilindro", "emoji": "🥫" }
    ], "explain": "A esfera é o sólido do círculo." },
    { "q": "A linha onde o céu encontra o chão chama-se…", "layout": "grid", "options": [
      { "t": "linha do horizonte", "emoji": "🌅", "correct": true },
      { "t": "ponto de fuga", "emoji": "📍" }
    ], "explain": "Está à altura dos teus olhos." },
    { "q": "Numa estrada que foge ao longe, as linhas…", "layout": "grid", "options": [
      { "t": "juntam-se num ponto de fuga", "emoji": "📍", "correct": true },
      { "t": "afastam-se cada vez mais", "emoji": "↔️" }
    ], "explain": "Parecem juntar-se no ponto de fuga, ao fundo." },
    { "q": "Um objeto que está mais longe desenha-se…", "layout": "grid", "options": [
      { "t": "mais pequeno", "emoji": "🔭", "correct": true },
      { "t": "maior", "emoji": "🔎" }
    ], "explain": "Quanto mais longe, mais pequeno parece." },
    { "q": "Para desenhar um cubo, partes de…", "layout": "grid", "options": [
      { "t": "dois quadrados ligados pelos cantos", "emoji": "🎲", "correct": true },
      { "t": "um único círculo", "emoji": "⭕" }
    ], "explain": "Dois quadrados desviados, com os cantos unidos." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "ev-6-volume-final",
  "final": true,
  "title": "Volume e perspetiva",
  "questions": [
    { "q": "Qual destes tem volume (é 3D)?", "layout": "grid", "options": [
      { "t": "um cubo", "emoji": "🧊", "correct": true },
      { "t": "um quadrado desenhado", "emoji": "🔲" }
    ], "explain": "O cubo ocupa espaço (3D); o quadrado é plano (2D)." },
    { "q": "Quantas dimensões tem um sólido?", "layout": "grid", "options": [
      { "t": "três: comprimento, largura e altura", "emoji": "📐", "correct": true },
      { "t": "duas: comprimento e largura", "emoji": "🔲" }
    ], "explain": "O volume acrescenta a altura às duas da figura plana." },
    { "q": "Uma caixa de sapatos é um…", "layout": "grid", "options": [
      { "t": "paralelepípedo", "emoji": "📦", "correct": true },
      { "t": "cilindro", "emoji": "🥫" }
    ], "explain": "É o sólido do retângulo." },
    { "q": "O ponto onde as linhas paralelas parecem juntar-se é o…", "layout": "grid", "options": [
      { "t": "ponto de fuga", "emoji": "📍", "correct": true },
      { "t": "vértice", "emoji": "📐" }
    ], "explain": "As linhas fogem todas para o ponto de fuga." },
    { "q": "A linha do horizonte está sempre…", "layout": "grid", "options": [
      { "t": "à altura dos teus olhos", "emoji": "👀", "correct": true },
      { "t": "no topo da folha", "emoji": "⬆️" }
    ], "explain": "Sobe e desce contigo — fica à altura do teu olhar." },
    { "q": "Ver a esquina de um prédio na rua usa…", "layout": "grid", "options": [
      { "t": "2 pontos de fuga", "emoji": "🏢", "correct": true },
      { "t": "nenhum ponto de fuga", "emoji": "🚫" }
    ], "explain": "Pela esquina, as linhas fogem para dois pontos, um de cada lado." },
    { "q": "Numa fila de postes iguais em perspetiva, o do fundo desenha-se…", "layout": "grid", "options": [
      { "t": "mais pequeno", "emoji": "🔭", "correct": true },
      { "t": "maior", "emoji": "🔎" }
    ], "explain": "É a regra do tamanho: mais longe, mais pequeno." },
    { "q": "Para o cubo parecer sólido, e não só linhas, acrescentas…", "layout": "grid", "options": [
      { "t": "luz e sombra nas faces", "emoji": "🌗", "correct": true },
      { "t": "muitas cores diferentes", "emoji": "🌈" }
    ], "explain": "Sombrear as faces dá-lhe volume a sério." }
  ]
}
```
