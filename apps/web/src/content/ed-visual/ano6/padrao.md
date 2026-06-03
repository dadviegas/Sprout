# Padrão e módulo 🔳

> [!NOTE] **O que vais aprender** 👀 O que é um **módulo** (a peça que se repete) e um **padrão** (a peça repetida com **ritmo**), as maneiras de repetir — por **translação**, **rotação** e **simetria** —, e como inventar os teus próprios padrões para azulejos, tecidos e papel de parede. 🔳🔁

Olha para um azulejo de uma parede, para a camisola às riscas, para o papel de embrulho de anos. O que têm em comum? Todos repetem uma **peça** vezes sem conta, com um **ritmo** certinho. Essa peça chama-se **módulo**, e a repetição dela chama-se **padrão**. Os padrões estão por todo o lado — na natureza, nas casas, na roupa — e tu vais aprender a criá-los! 🐝🎨

## Módulo e padrão: a peça e a repetição 🧩

```keyvalue
[
  { "k": "Módulo", "v": "a peça-base, o desenho que se vai repetir (uma só) 🔷" },
  { "k": "Padrão", "v": "o módulo repetido muitas vezes, com ritmo 🔁" },
  { "k": "Ritmo", "v": "a ordem certinha com que as peças se seguem 🥁" },
  { "k": "Onde vês", "v": "azulejos, tecidos, papel de parede, grades, favos de mel 🐝" }
]
```

> **Para perceberes:** o módulo está para o padrão como uma **batida** está para uma **música**. Uma batida sozinha não é música; muitas batidas com ritmo, sim! 🥁🎵

## As três maneiras de repetir 🔁

Há três formas principais de pegar num módulo e multiplicá-lo. Decora-as bem, porque é com elas que se faz **tudo**:

```steps
[
  { "title": "1. Translação (deslizar)", "body": "o módulo desliza sempre na mesma direção, sem virar — como passos numa fila ➡️➡️➡️", "icon": "➡️" },
  { "title": "2. Rotação (rodar)", "body": "o módulo roda à volta de um ponto — como as pétalas de uma flor 🌸", "icon": "🌸" },
  { "title": "3. Simetria (espelhar)", "body": "o módulo reflete-se como num espelho — um lado igual ao outro 🪞", "icon": "🪞" }
]
```

<figure class="figure-widget" style="max-width:460px">
  <svg viewBox="0 0 360 130" role="img" aria-label="Três faixas: na primeira, triângulos iguais deslizam todos na mesma direção (translação); na segunda, triângulos à volta de um ponto central (rotação); na terceira, dois triângulos virados um para o outro como num espelho (simetria)." style="width:100%;height:auto;background:var(--surface-2,#f4f6fb);border-radius:16px">
    <text x="10" y="20" font-size="11" fill="#5b6275">translação ➡️</text>
    <g fill="#5b9bff" stroke="#1e3a66" stroke-width="2">
      <polygon points="30,55 50,55 40,35"/><polygon points="70,55 90,55 80,35"/><polygon points="110,55 130,55 120,35"/><polygon points="150,55 170,55 160,35"/>
    </g>
    <text x="200" y="20" font-size="11" fill="#5b6275">rotação 🌸</text>
    <g fill="#ff8f4f" stroke="#7a3d12" stroke-width="2" transform="translate(280,45)">
      <polygon points="0,-22 8,-6 -8,-6"/>
      <polygon points="22,0 6,8 6,-8"/>
      <polygon points="0,22 -8,6 8,6"/>
      <polygon points="-22,0 -6,-8 -6,8"/>
    </g>
    <text x="10" y="100" font-size="11" fill="#5b6275">simetria 🪞</text>
    <line x1="180" y1="88" x2="180" y2="120" stroke="#c8cede" stroke-width="2" stroke-dasharray="5 5"/>
    <g fill="#3f8f3f" stroke="#1e3a1e" stroke-width="2">
      <polygon points="160,118 175,118 175,98"/>
      <polygon points="200,118 185,118 185,98"/>
    </g>
  </svg>
  <figcaption class="figure-cap"><span class="figure-cap__text">Translação: deslizar. Rotação: rodar à volta de um ponto. Simetria: espelhar de um lado para o outro.</span></figcaption>
</figure>

## A simetria: o espelho 🪞

A **simetria** é tão importante que merece um treino à parte. Uma figura é simétrica quando uma metade é o **reflexo** exato da outra, ao longo de uma linha chamada **eixo de simetria**. Toca em **Espelhar** para veres a outra metade aparecer!

```symmetry
{ "shape": "borboleta", "title": "A borboleta é simétrica: a asa esquerda é o espelho da direita" }
```

> **Truque do espelho:** dobra uma folha ao meio, pinta uma mancha de um lado e fecha. Quando abres, apareceu a mesma mancha do outro lado — fizeste uma figura **simétrica** sem desenhar duas vezes! É assim que se decoram muitos azulejos. 🦋

## Padrões na natureza e feitos por nós 🌿

Os padrões não são invenção dos humanos — a natureza já os usava muito antes de nós! Compara:

```compare
[
  { "title": "Padrões da natureza 🐝", "rows": [
    { "label": "O favo das abelhas", "value": "hexágonos repetidos, sem espaços vazios" },
    { "label": "A casca do ananás", "value": "losangos em espiral" },
    { "label": "A pele da zebra", "value": "riscas que se repetem" }
  ] },
  { "title": "Padrões feitos por nós 🏠", "rows": [
    { "label": "Os azulejos", "value": "o módulo repete-se na parede toda", "highlight": true },
    { "label": "Os tecidos", "value": "às riscas, às bolas, aos quadrados", "highlight": true },
    { "label": "As calçadas", "value": "a calçada portuguesa, pedra a pedra", "highlight": true }
  ] }
]
```

> [!NOTE] A **calçada portuguesa**, com as suas pedrinhas brancas e pretas, é um padrão famoso no mundo inteiro! Cada calceteiro repete um módulo à mão, pedra a pedra, para fazer ondas, estrelas e rosas-dos-ventos no chão das nossas ruas. 🌊

## Um problema passo a passo 🔍

*«Queres fazer um friso (uma faixa decorativa) para a tua parede, com 30 cm de comprimento. O teu módulo é um quadradinho de 5 cm. Quantos módulos cabem no friso?»* 🧮

```steps
[
  { "title": "1. O que sabemos", "body": "o friso tem 30 cm e cada módulo 5 cm 📏" },
  { "title": "2. Quantos cabem?", "body": "é uma divisão: comprimento total ÷ tamanho do módulo" },
  { "title": "3. A conta", "body": "30 ÷ 5 = 6 módulos" },
  { "title": "4. Resposta", "body": "cabem 6 módulos certinhos — sem deixar buraco! ✅" }
]
```

```math
{ "expr": "30 ÷ 5 = 6", "say": "trinta a dividir por cinco é igual a seis módulos" }
```

> **Truque do encaixe:** para um padrão ficar perfeito, o módulo tem de **caber um número certo de vezes** no espaço. Por isso os artistas escolhem módulos que dividem bem o comprimento — sem sobras nem buracos. 🧩

## Treina os tipos de repetição 🎯

```drill
{ "mode": "choose", "title": "Que tipo de repetição é?", "items": [
  { "front": "O módulo desliza sempre na mesma direção, sem virar", "back": "translação", "options": ["rotação", "simetria"] },
  { "front": "O módulo roda à volta de um ponto, como pétalas", "back": "rotação", "options": ["translação", "simetria"] },
  { "front": "Um lado é o reflexo exato do outro, como num espelho", "back": "simetria", "options": ["translação", "rotação"] },
  { "front": "A peça-base que se repete chama-se…", "back": "módulo", "options": ["padrão", "eixo"] },
  { "front": "A linha onde se faz o reflexo chama-se…", "back": "eixo de simetria", "options": ["ponto de fuga", "ritmo"] },
  { "front": "O favo das abelhas é feito de…", "back": "hexágonos", "options": ["círculos", "estrelas"] },
  { "front": "A borboleta tem simetria porque…", "back": "uma asa espelha a outra", "options": ["roda à volta de um ponto", "desliza para o lado"] },
  { "front": "Uma camisola às riscas usa…", "back": "translação", "options": ["rotação", "simetria"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Há mais de **500 anos**, os artistas do **Palácio de Alhambra**, em Espanha, e os criadores de **azulejos** árabes descobriram que só existem **17 maneiras diferentes** de preencher um plano com um padrão que se repete para sempre — nem mais uma! Os matemáticos chamam-lhes os **17 grupos de papel de parede**. Séculos depois, um artista holandês chamado **M. C. Escher** ficou fascinado com isto e desenhou padrões impossíveis em que pássaros se transformam em peixes que se transformam em lagartos, todos encaixados sem deixar um único buraco. Arte e matemática, de mãos dadas! 🦎🐟

## Vamos praticar 🎈

```quiz
{
  "id": "ev-6-padrao-pratica",
  "questions": [
    { "q": "O que é um módulo?", "layout": "grid", "options": [
      { "t": "a peça-base que se repete", "emoji": "🔷", "correct": true },
      { "t": "a parede toda decorada", "emoji": "🧱" },
      { "t": "uma cor primária", "emoji": "🔴" }
    ], "explain": "O módulo é a peça única que vai repetir-se para formar o padrão." },
    { "q": "Um padrão é…", "layout": "grid", "options": [
      { "t": "o módulo repetido com ritmo", "emoji": "🔁", "correct": true },
      { "t": "uma só peça isolada", "emoji": "1️⃣" }
    ], "explain": "Padrão = repetição do módulo com ritmo certinho." },
    { "q": "Deslizar o módulo sempre na mesma direção é…", "layout": "grid", "options": [
      { "t": "translação", "emoji": "➡️", "correct": true },
      { "t": "rotação", "emoji": "🌸" }
    ], "explain": "Na translação, a peça desliza sem virar." },
    { "q": "A asa esquerda da borboleta é igual à direita por…", "layout": "grid", "options": [
      { "t": "simetria", "emoji": "🦋", "correct": true },
      { "t": "translação", "emoji": "➡️" }
    ], "explain": "Uma metade é o reflexo da outra: simetria." },
    { "q": "O favo das abelhas repete…", "layout": "grid", "options": [
      { "t": "hexágonos", "emoji": "⬡", "correct": true },
      { "t": "triângulos", "emoji": "🔺" }
    ], "explain": "Hexágonos encaixados sem espaços vazios." },
    { "q": "A linha onde se reflete uma figura simétrica é o…", "layout": "grid", "options": [
      { "t": "eixo de simetria", "emoji": "🪞", "correct": true },
      { "t": "ponto de fuga", "emoji": "📍" }
    ], "explain": "O eixo de simetria é o 'espelho' da figura." },
    { "q": "Friso de 20 cm, módulo de 4 cm. Quantos cabem?", "layout": "grid", "options": [
      { "t": "5", "emoji": "5️⃣", "correct": true },
      { "t": "4", "emoji": "4️⃣" }
    ], "explain": "20 ÷ 4 = 5 módulos certinhos." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "ev-6-padrao-final",
  "final": true,
  "title": "Padrão e módulo",
  "questions": [
    { "q": "A peça-base que se repete num padrão é o…", "layout": "grid", "options": [
      { "t": "módulo", "emoji": "🔷", "correct": true },
      { "t": "ritmo", "emoji": "🥁" },
      { "t": "eixo", "emoji": "🪞" }
    ], "explain": "O módulo é a peça; o padrão é a sua repetição." },
    { "q": "Rodar o módulo à volta de um ponto, como pétalas, é…", "layout": "grid", "options": [
      { "t": "rotação", "emoji": "🌸", "correct": true },
      { "t": "translação", "emoji": "➡️" }
    ], "explain": "Na rotação a peça gira em torno de um ponto." },
    { "q": "Numa figura simétrica…", "layout": "grid", "options": [
      { "t": "uma metade é o reflexo da outra", "emoji": "🪞", "correct": true },
      { "t": "as metades são todas diferentes", "emoji": "🔀" }
    ], "explain": "A simetria é o reflexo de um lado no outro." },
    { "q": "Qual destes é um padrão da natureza?", "layout": "grid", "options": [
      { "t": "o favo de mel hexagonal", "emoji": "🐝", "correct": true },
      { "t": "um azulejo de cozinha", "emoji": "🧱" }
    ], "explain": "O favo é natural; o azulejo é feito por nós." },
    { "q": "A famosa calçada com pedrinhas brancas e pretas é…", "layout": "grid", "options": [
      { "t": "a calçada portuguesa", "emoji": "🌊", "correct": true },
      { "t": "um mosaico romano qualquer", "emoji": "🏺" }
    ], "explain": "A calçada portuguesa é um padrão famoso no mundo inteiro." },
    { "q": "Uma camisola às riscas iguais usa que tipo de repetição?", "layout": "grid", "options": [
      { "t": "translação", "emoji": "➡️", "correct": true },
      { "t": "rotação", "emoji": "🌸" }
    ], "explain": "As riscas deslizam na mesma direção: translação." },
    { "q": "Para um padrão encaixar sem buracos, o módulo deve…", "layout": "grid", "options": [
      { "t": "caber um número certo de vezes no espaço", "emoji": "🧩", "correct": true },
      { "t": "ser sempre maior do que o espaço", "emoji": "📦" }
    ], "explain": "Tem de dividir bem o comprimento, sem sobras." },
    { "q": "Friso de 24 cm, módulo de 6 cm. Quantos módulos cabem?", "layout": "grid", "options": [
      { "t": "4", "emoji": "4️⃣", "correct": true },
      { "t": "6", "emoji": "6️⃣" }
    ], "explain": "24 ÷ 6 = 4 módulos." }
  ]
}
```
