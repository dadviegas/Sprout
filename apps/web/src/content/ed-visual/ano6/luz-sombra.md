# A luz e a sombra 💡

> [!NOTE] **O que vais aprender** 👀 Como a **luz** transforma tudo o que vês! Vais descobrir de onde vem a luz, como nasce a **sombra própria** e a **sombra projetada**, o que é a **zona de luz**, a **meia-tinta** e o **brilho**, e o grande truque dos artistas: usar luz e sombra para fazer um desenho **plano** parecer que tem **volume** (3D). 💡🌗

Fecha os olhos e tapa-os com a mão. Está tudo escuro, certo? Sem **luz** não há cor, não há forma, não há nada para ver. A luz é a primeira ferramenta de qualquer artista — é ela que dá **forma** às coisas. E onde há luz, há sempre uma companheira fiel: a **sombra**. Aprender a ver as duas é o que separa um desenho "achatado" de um desenho que parece **saltar do papel**! ✏️✨

## De onde vem a luz ☀️

A luz vem de uma **fonte luminosa** — algo que brilha por si próprio. Repara: a Lua parece brilhar, mas **não** tem luz própria; só reflete a luz do Sol. As fontes de luz dividem-se em duas famílias:

```compare
[
  { "title": "Luz natural ☀️", "rows": [
    { "label": "De onde vem", "value": "do Sol, das estrelas, do fogo, dos relâmpagos" },
    { "label": "Como muda", "value": "ao longo do dia — de manhã é macia, ao meio-dia é dura" },
    { "label": "Exemplo", "value": "a luz dourada do pôr do sol 🌅" }
  ] },
  { "title": "Luz artificial 💡", "rows": [
    { "label": "De onde vem", "value": "feita por nós: lâmpadas, ecrãs, lanternas", "highlight": true },
    { "label": "Como muda", "value": "acendes e apagas quando quiseres", "highlight": true },
    { "label": "Exemplo", "value": "o candeeiro da tua secretária 🛋️", "highlight": true }
  ] }
]
```

> **Repara:** muitos objetos parecem ter luz, mas só a **refletem** — o espelho, a Lua, uma folha branca. A luz própria vem só de quem **arde** ou **brilha** por dentro (Sol, lâmpada, vela). 🔦

## A sombra nasce assim 🌗

Quando um objeto **bloqueia** a luz, fica escuro do lado oposto à fonte — e do outro lado projeta uma mancha escura no chão. Há, na verdade, **duas** sombras diferentes, e é preciso saber distingui-las:

<figure class="figure-widget" style="max-width:460px">
  <svg viewBox="0 0 360 200" role="img" aria-label="Uma bola iluminada por um Sol à esquerda: a sombra própria fica no lado escuro da bola e a sombra projetada estende-se no chão para a direita." style="width:100%;height:auto;background:var(--surface-2,#f4f6fb);border-radius:16px">
    <circle cx="58" cy="48" r="22" fill="#ffd23f"/>
    <g stroke="#ffd23f" stroke-width="3" stroke-linecap="round">
      <line x1="58" y1="14" x2="58" y2="2"/>
      <line x1="58" y1="82" x2="58" y2="94"/>
      <line x1="24" y1="48" x2="12" y2="48"/>
      <line x1="34" y1="24" x2="25" y2="15"/>
      <line x1="34" y1="72" x2="25" y2="81"/>
    </g>
    <line x1="20" y1="160" x2="345" y2="160" stroke="#c8cede" stroke-width="2"/>
    <ellipse cx="245" cy="160" rx="78" ry="13" fill="#5b6275" opacity="0.55"/>
    <circle cx="195" cy="128" r="34" fill="#cfd6e6"/>
    <path d="M195 94 a34 34 0 0 0 0 68 a34 34 0 0 1 0 -68" fill="#7a8198"/>
    <text x="150" y="92" font-size="12" fill="#5b6275" text-anchor="middle">sombra própria</text>
    <text x="300" y="184" font-size="12" fill="#5b6275" text-anchor="middle">sombra projetada</text>
  </svg>
  <figcaption class="figure-cap"><span class="figure-cap__text">A sombra própria é o lado escuro do próprio objeto; a sombra projetada é a mancha que ele deixa no chão.</span></figcaption>
</figure>

```keyvalue
[
  { "k": "Sombra própria", "v": "a parte escura do PRÓPRIO objeto, o lado virado ao contrário da luz 🌑" },
  { "k": "Sombra projetada", "v": "a mancha escura que o objeto deixa NO CHÃO ou na parede 🖤" },
  { "k": "Quem decide o tamanho", "v": "quanto mais baixa a luz, mais COMPRIDA a sombra projetada 📏" },
  { "k": "Quem decide a direção", "v": "a sombra cai sempre do LADO OPOSTO à fonte de luz ↔️" }
]
```

> **Truque do Sol e da sombra:** se o Sol está à tua **esquerda**, a tua sombra cai para a **direita** — sempre do lado contrário! Ao fim da tarde, com o Sol baixinho no horizonte, a tua sombra fica **gigante**. ☀️➡️🌆

## A escala de tons: do brilho à sombra 🎚️

Um objeto redondo não é "metade claro, metade escuro" — a luz vai **escorregando** suavemente de muito claro a muito escuro. Os artistas dão nome a cada zona dessa viagem:

```steps
[
  { "title": "1. Brilho", "body": "o pontinho mais claro de todos, onde a luz bate em cheio ⭐", "icon": "star" },
  { "title": "2. Zona de luz", "body": "a parte clara, bem iluminada ☀️", "icon": "sun" },
  { "title": "3. Meia-tinta", "body": "a transição, nem clara nem escura — o cinzento do meio 🌗", "icon": "🌗" },
  { "title": "4. Sombra própria", "body": "o lado escuro do objeto, ao contrário da luz 🌑", "icon": "🌑" },
  { "title": "5. Luz refletida", "body": "uma réstia de luz que ressalta do chão e clareia um pouco a base 🔅", "icon": "🔅" }
]
```

```meters
[
  { "label": "Brilho", "value": 100, "hint": "o ponto onde a luz bate em cheio" },
  { "label": "Zona de luz", "value": 80, "hint": "a parte bem iluminada" },
  { "label": "Meia-tinta", "value": 50, "hint": "a transição, o cinzento do meio" },
  { "label": "Sombra própria", "value": 20, "hint": "o lado escuro do objeto" },
  { "label": "Núcleo da sombra", "value": 8, "hint": "o ponto mais escuro de todos" }
]
```

> **Truque do degradé:** nunca passes do branco ao preto de repente! Faz uma **escada suave** de cinzentos — claro, médio-claro, médio, médio-escuro, escuro. É o degradé que engana o olho e dá a sensação de **redondo**. 🪜

## O grande truque: dar volume a uma forma 🔮

Aqui está a magia. Desenha um **círculo** plano: parece uma moeda achatada. Agora sombreia-o como uma escada de tons e... vira uma **esfera**, uma bola a sério! O olho acredita que tem volume. Olha a diferença:

<figure class="figure-widget" style="max-width:460px">
  <svg viewBox="0 0 360 180" role="img" aria-label="À esquerda, um círculo de cor lisa que parece plano. À direita, o mesmo círculo com sombreado em degradé e um brilho, que parece uma bola redonda." style="width:100%;height:auto;background:var(--surface-2,#f4f6fb);border-radius:16px">
    <defs>
      <radialGradient id="ball" cx="38%" cy="32%" r="72%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="35%" stop-color="#8ec5ff"/>
        <stop offset="100%" stop-color="#1e3a66"/>
      </radialGradient>
    </defs>
    <circle cx="95" cy="80" r="55" fill="#5b9bff"/>
    <text x="95" y="160" font-size="13" fill="#5b6275" text-anchor="middle">plano (achatado)</text>
    <ellipse cx="270" cy="138" rx="52" ry="10" fill="#5b6275" opacity="0.4"/>
    <circle cx="265" cy="80" r="55" fill="url(#ball)"/>
    <circle cx="245" cy="58" r="9" fill="#ffffff" opacity="0.85"/>
    <text x="265" y="160" font-size="13" fill="#5b6275" text-anchor="middle">com volume (redondo)</text>
  </svg>
  <figcaption class="figure-cap"><span class="figure-cap__text">O mesmo círculo: liso fica plano; com degradé de tons e um brilho, ganha volume e vira uma bola.</span></figcaption>
</figure>

```steps
[
  { "title": "1. Decide de onde vem a luz", "body": "escolhe um canto (ex.: cima-esquerda) e mantém-no para TODO o desenho ☀️", "icon": "sun" },
  { "title": "2. Marca o brilho", "body": "deixa em branco o ponto onde a luz bate em cheio ⭐", "icon": "star" },
  { "title": "3. Escurece o lado oposto", "body": "a sombra própria fica do lado contrário à luz 🌑", "icon": "🌑" },
  { "title": "4. Faz o degradé", "body": "liga o claro ao escuro com cinzentos suaves, sem saltos 🌗", "icon": "🌗" },
  { "title": "5. Desenha a sombra projetada", "body": "uma mancha no chão, do lado oposto à luz — agora a bola 'pousa'! 🖤", "icon": "🖤" }
]
```

> **Regra de ouro:** num desenho só pode haver **uma** direção de luz. Se sombreares umas coisas como se a luz viesse da esquerda e outras como se viesse da direita, o olho percebe logo que está "errado". Uma luz, uma coerência! 🧭

## Um problema passo a passo 🔍

*«São 18h e estás de pé ao sol. Mede-se que a tua sombra projetada é o **dobro** da tua altura. Tu tens 1,40 m. Que comprimento tem a tua sombra?»* Vamos com calma. 🧮

```steps
[
  { "title": "1. O que sabemos", "body": "a tua altura é 1,40 m e a sombra é o dobro 📏" },
  { "title": "2. 'O dobro' quer dizer…", "body": "vezes 2 — porque o Sol está baixinho ao fim da tarde 🌆" },
  { "title": "3. A conta", "body": "1,40 × 2 = 2,80 m" },
  { "title": "4. Resposta", "body": "a tua sombra tem 2,80 m — bem mais comprida do que tu! 😲" }
]
```

```math
{ "expr": "1,40 × 2 = 2,80", "say": "um vírgula quarenta vezes dois é igual a dois vírgula oitenta metros" }
```

## Treina luz e sombra 🎯

```drill
{ "mode": "choose", "title": "Que zona ou conceito é?", "items": [
  { "front": "O pontinho mais claro, onde a luz bate em cheio", "back": "brilho", "options": ["meia-tinta", "sombra própria"] },
  { "front": "O lado escuro do próprio objeto", "back": "sombra própria", "options": ["sombra projetada", "brilho"] },
  { "front": "A mancha escura que o objeto deixa no chão", "back": "sombra projetada", "options": ["sombra própria", "meia-tinta"] },
  { "front": "A transição, nem clara nem escura", "back": "meia-tinta", "options": ["brilho", "sombra projetada"] },
  { "front": "A Lua brilha porque…", "back": "reflete a luz do Sol", "options": ["tem luz própria", "está a arder"] },
  { "front": "Com o Sol baixinho, a sombra fica…", "back": "mais comprida", "options": ["mais curta", "redonda"] },
  { "front": "O Sol está à esquerda; a sombra cai para a…", "back": "direita", "options": ["esquerda", "cima"] },
  { "front": "Para um círculo parecer uma bola, usas…", "back": "degradé de tons", "options": ["uma cor lisa", "muitos pontos"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Há quase **500 anos**, um pintor italiano chamado **Caravaggio** levou a luz e a sombra ao extremo: pintava cenas quase **às escuras**, com um único feixe de luz forte a iluminar só os rostos e as mãos. A esse contraste violento entre muita luz e muita sombra chama-se **claro-escuro** (em italiano, *chiaroscuro*). É a mesma técnica que o cinema usa nos filmes de terror e de detetives — um candeeiro fraco, sombras enormes na parede e o resto no escuro. A luz não serve só para **ver**: serve para criar **emoção** e **mistério**! 🎬🕯️

## Vamos praticar 🎈

```quiz
{
  "id": "ev-6-luz-sombra-pratica",
  "questions": [
    { "q": "O que é uma fonte de luz natural?", "layout": "grid", "options": [
      { "t": "o Sol", "emoji": "☀️", "correct": true },
      { "t": "uma lâmpada", "emoji": "💡" },
      { "t": "uma lanterna", "emoji": "🔦" }
    ], "explain": "O Sol é luz natural; a lâmpada e a lanterna são luz artificial (feitas por nós)." },
    { "q": "A Lua que vemos à noite…", "layout": "grid", "options": [
      { "t": "reflete a luz do Sol", "emoji": "🌙", "correct": true },
      { "t": "tem luz própria", "emoji": "✨" },
      { "t": "está a arder", "emoji": "🔥" }
    ], "explain": "A Lua não brilha sozinha — só reflete a luz que recebe do Sol." },
    { "q": "A mancha escura que um objeto deixa no chão é a…", "layout": "grid", "options": [
      { "t": "sombra projetada", "emoji": "🖤", "correct": true },
      { "t": "sombra própria", "emoji": "🌑" },
      { "t": "meia-tinta", "emoji": "🌗" }
    ], "explain": "A projetada cai no chão; a própria é o lado escuro do objeto." },
    { "q": "O ponto mais claro de todos chama-se…", "layout": "grid", "options": [
      { "t": "brilho", "emoji": "⭐", "correct": true },
      { "t": "núcleo da sombra", "emoji": "🌑" }
    ], "explain": "O brilho é onde a luz bate em cheio — o ponto mais claro." },
    { "q": "Para um círculo parecer uma bola (3D), o artista usa…", "layout": "grid", "options": [
      { "t": "um degradé suave de tons", "emoji": "🌗", "correct": true },
      { "t": "uma única cor lisa", "emoji": "🟦" }
    ], "explain": "O degradé claro→escuro engana o olho e dá sensação de volume." },
    { "q": "Ao fim da tarde, com o Sol baixinho, a tua sombra fica…", "layout": "grid", "options": [
      { "t": "muito comprida", "emoji": "🌆", "correct": true },
      { "t": "muito curta", "emoji": "🔆" }
    ], "explain": "Quanto mais baixa a fonte de luz, mais comprida a sombra projetada." },
    { "q": "Num desenho com volume, a luz deve vir…", "layout": "grid", "options": [
      { "t": "de uma só direção, igual em tudo", "emoji": "🧭", "correct": true },
      { "t": "de várias direções ao mesmo tempo", "emoji": "🔀" }
    ], "explain": "Uma luz, uma coerência — senão o olho percebe que está errado." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "ev-6-luz-sombra-final",
  "final": true,
  "title": "A luz e a sombra",
  "questions": [
    { "q": "Sem luz, conseguimos ver formas e cores?", "layout": "grid", "options": [
      { "t": "Não — sem luz não há nada para ver", "emoji": "🌑", "correct": true },
      { "t": "Sim, vê-se na mesma", "emoji": "👀" }
    ], "explain": "É a luz que revela a forma e a cor das coisas." },
    { "q": "Qual destas é uma fonte de luz artificial?", "layout": "grid", "options": [
      { "t": "uma lâmpada", "emoji": "💡", "correct": true },
      { "t": "o Sol", "emoji": "☀️" },
      { "t": "uma estrela", "emoji": "⭐" }
    ], "explain": "A lâmpada é feita por nós (artificial); Sol e estrelas são naturais." },
    { "q": "A 'sombra própria' é…", "layout": "grid", "options": [
      { "t": "o lado escuro do próprio objeto", "emoji": "🌑", "correct": true },
      { "t": "a mancha no chão", "emoji": "🖤" },
      { "t": "o ponto mais claro", "emoji": "⭐" }
    ], "explain": "A própria está no objeto; a projetada cai no chão." },
    { "q": "A sombra projetada cai sempre…", "layout": "grid", "options": [
      { "t": "do lado oposto à fonte de luz", "emoji": "↔️", "correct": true },
      { "t": "do mesmo lado da luz", "emoji": "➡️" }
    ], "explain": "A sombra foge da luz — fica sempre do lado contrário." },
    { "q": "A 'meia-tinta' é…", "layout": "grid", "options": [
      { "t": "a transição entre a luz e a sombra", "emoji": "🌗", "correct": true },
      { "t": "o brilho mais forte", "emoji": "⭐" }
    ], "explain": "É o tom do meio, nem claro nem escuro — liga as duas zonas." },
    { "q": "Para fazer o degradé de uma esfera, deves…", "layout": "grid", "options": [
      { "t": "passar do claro ao escuro com tons suaves", "emoji": "🪜", "correct": true },
      { "t": "passar do branco ao preto de repente", "emoji": "⚡" }
    ], "explain": "Uma escada suave de cinzentos é o que dá a sensação de redondo." },
    { "q": "Tens 1,30 m e a tua sombra é o dobro. Quanto mede a sombra?", "layout": "grid", "options": [
      { "t": "2,60 m", "emoji": "📏", "correct": true },
      { "t": "1,30 m", "emoji": "📐" },
      { "t": "0,65 m", "emoji": "📉" }
    ], "explain": "O dobro de 1,30 é 1,30 × 2 = 2,60 m." },
    { "q": "O contraste forte entre muita luz e muita sombra chama-se…", "layout": "grid", "options": [
      { "t": "claro-escuro (chiaroscuro)", "emoji": "🕯️", "correct": true },
      { "t": "círculo cromático", "emoji": "🎡" }
    ], "explain": "É a técnica de Caravaggio — luz forte sobre fundo escuro, muita emoção." }
  ]
}
```
