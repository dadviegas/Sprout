# Os planetas 🪐

> [!NOTE] **O que vais aprender** 👀 Vais saber de cor os **8 planetas por ordem**, a começar no que está mais perto do **Sol** ☀️: Mercúrio, Vénus, Terra, Marte, Júpiter, Saturno, Úrano e Neptuno. Vais ter uma **frase mágica** para nunca te enganares e treinar a ordem a brincar! 🚀

À volta do **Sol** andam **8 planetas**, sempre na mesma fila. 🌌 Uns estão bem **pertinho** do Sol e são quentes; outros estão **lá longe** e são geladinhos. A nossa **Terra** 🌍 é o terceiro da fila — e é o único com água e vida! Toca para ouvires e vem decorar a ordem comigo. 🎧

## Vê os planetas a girar 🔭

Toca em cada planeta para ouvires o nome e uma curiosidade. Repara na **Lua** 🌙 a girar à volta da Terra! Podes **parar** e **voltar a pôr a andar** com o botão.

```solarsystem
{
  "title": "Toca num planeta!",
  "say": "No centro está o Sol. À volta dele andam oito planetas, sempre por esta ordem: Mercúrio, Vénus, Terra, Marte, Júpiter, Saturno, Úrano e Neptuno. A Terra é o nosso, o terceiro a contar do Sol.",
  "center": { "name": "Sol", "emoji": "☀️", "fact": "uma estrela gigante; está no centro de tudo e dá-nos luz e calor" },
  "bodies": [
    { "name": "Mercúrio", "orbit": 46, "size": 5, "color": "#b8b0a8", "period": 8, "emoji": "🔥", "fact": "o 1.º planeta, o mais perto do Sol e muito quente" },
    { "name": "Vénus", "orbit": 64, "size": 8, "color": "#e6c98a", "period": 12, "emoji": "✨", "fact": "o 2.º planeta, o mais brilhante no céu da noite" },
    { "name": "Terra", "orbit": 84, "size": 8.5, "color": "#4a90d9", "period": 16, "emoji": "🌍", "fact": "o 3.º planeta, o nosso, o único com água e vida",
      "moons": [ { "name": "Lua", "orbit": 15, "size": 3, "color": "#dcdcdc", "period": 3, "emoji": "🌙", "fact": "o satélite da Terra; muda de forma no céu" } ] },
    { "name": "Marte", "orbit": 102, "size": 6, "color": "#d1603f", "period": 20, "emoji": "🔴", "fact": "o 4.º planeta, vermelho, cheio de poeira cor de ferrugem" },
    { "name": "Júpiter", "orbit": 130, "size": 17, "color": "#d8a878", "period": 30, "emoji": "🪐", "fact": "o 5.º planeta, o maior de todos",
      "moons": [ { "name": "Io", "orbit": 27, "size": 2.5, "color": "#e9d27a", "period": 4, "emoji": "🌑", "fact": "uma das mais de 90 luas de Júpiter!" } ] },
    { "name": "Saturno", "orbit": 160, "size": 14, "color": "#d8c89a", "period": 38, "emoji": "💍", "ring": true, "fact": "o 6.º planeta, com anéis lindos de gelo e pedrinhas",
      "moons": [ { "name": "Titã", "orbit": 35, "size": 3, "color": "#cbb27a", "period": 5, "emoji": "🌑", "fact": "a maior lua de Saturno" } ] },
    { "name": "Úrano", "orbit": 182, "size": 10, "color": "#9fd8d8", "period": 46, "emoji": "❄️", "fact": "o 7.º planeta, gelado e azul-esverdeado; gira deitado de lado",
      "moons": [ { "name": "Titânia", "orbit": 18, "size": 2.5, "color": "#cfeaea", "period": 4, "emoji": "🌑", "fact": "a maior lua de Úrano" } ] },
    { "name": "Neptuno", "orbit": 200, "size": 9, "color": "#4a6fd9", "period": 54, "emoji": "🔵", "fact": "o 8.º planeta, o mais longe do Sol, muito frio e azul" }
  ]
}
```

## Vê-os em fila, lado a lado 📏

Agora vê os planetas **em fila**, a começar no Sol. Repara nos **tamanhos**: os 4 primeiros são pequeninos e os do meio são **gigantes**! Toca em cada um para o ouvires. 👀

```solarsystem
{
  "layout": "lineup",
  "title": "Os planetas em fila",
  "say": "Aqui estão o Sol e os oito planetas em fila, do mais perto do Sol ao mais longe: Mercúrio, Vénus, Terra, Marte, Júpiter, Saturno, Úrano e Neptuno. Repara como Júpiter e Saturno são muito maiores do que a Terra. Lá ao fundo está o Plutão, um planeta anão.",
  "center": { "name": "Sol", "emoji": "☀️", "fact": "uma estrela gigante; está no centro de tudo e dá-nos luz e calor" },
  "bodies": [
    { "name": "Mercúrio", "size": 5, "color": "#b8b0a8", "emoji": "🔥", "fact": "o 1.º planeta, o mais perto do Sol e muito quente" },
    { "name": "Vénus", "size": 8, "color": "#e6c98a", "emoji": "✨", "fact": "o 2.º planeta, o mais brilhante no céu da noite" },
    { "name": "Terra", "size": 8.5, "color": "#4a90d9", "emoji": "🌍", "fact": "o 3.º planeta, o nosso, o único com água e vida" },
    { "name": "Marte", "size": 6, "color": "#d1603f", "emoji": "🔴", "fact": "o 4.º planeta, vermelho, cheio de poeira cor de ferrugem" },
    { "name": "Júpiter", "size": 17, "color": "#d8a878", "emoji": "🪐", "fact": "o 5.º planeta, o maior de todos" },
    { "name": "Saturno", "size": 14, "color": "#d8c89a", "emoji": "💍", "ring": true, "fact": "o 6.º planeta, com anéis lindos de gelo e pedrinhas" },
    { "name": "Úrano", "size": 10, "color": "#9fd8d8", "emoji": "❄️", "fact": "o 7.º planeta, gelado e azul-esverdeado; gira deitado de lado" },
    { "name": "Neptuno", "size": 9, "color": "#4a6fd9", "emoji": "🔵", "fact": "o 8.º planeta, o mais longe do Sol, muito frio e azul" }
  ],
  "dwarfs": [
    { "name": "Plutão", "size": 3, "color": "#c9a98f", "emoji": "❄️", "fact": "um planeta anão, lá muito longe e no frio; já foi contado como o 9.º planeta" }
  ]
}
```

## Os 8 planetas por ordem (do Sol para fora) 🌟

A fila começa **junto ao Sol** e vai sempre a afastar-se. Esta ordem é igualzinha para toda a gente — basta decorá-la uma vez! 🪜

```steps
[
  { "title": "1.º Mercúrio 🔥", "body": "o mais perto do Sol, pequenino e a ferver" },
  { "title": "2.º Vénus ✨", "body": "o mais brilhante do céu — vê-se de manhã e à noite" },
  { "title": "3.º Terra 🌍", "body": "o nosso planeta, o único com água e vida, com a sua Lua 🌙" },
  { "title": "4.º Marte 🔴", "body": "o planeta vermelho, com poeira cor de ferrugem" },
  { "title": "5.º Júpiter 🪐", "body": "o maior de todos — cabiam lá dentro mil Terras!" },
  { "title": "6.º Saturno 💍", "body": "tem anéis lindos de gelo e pedrinhas" },
  { "title": "7.º Úrano ❄️", "body": "gelado e gira deitado de lado, como uma bola a rolar" },
  { "title": "8.º Neptuno 🔵", "body": "o mais longe, muito frio e bem azul" }
]
```

## O truque da frase mágica 🪄

Para nunca te enganares na ordem, decora esta **frase**: a **primeira letra** de cada palavra é a primeira letra de cada planeta! 😄

```keyvalue
[
  { "k": "A frase 🪄", "v": "«Meu Véu Terrível Mandou Júlia Saltar Uma Neve»" },
  { "k": "Me → Mercúrio", "v": "o 1.º, junto ao Sol 🔥" },
  { "k": "Vé → Vénus · Te → Terra", "v": "o 2.º e o 3.º ✨🌍" },
  { "k": "Ma → Marte · Jú → Júpiter", "v": "o 4.º e o 5.º 🔴🪐" },
  { "k": "Sa → Saturno · U → Úrano · Ne → Neptuno", "v": "o 6.º, o 7.º e o 8.º 💍❄️🔵" }
]
```

> **Truque do quente e do frio:** quanto **mais perto** do Sol, mais **quente** o planeta; quanto **mais longe**, mais **frio**. Por isso o 1.º (Mercúrio) frita e o 8.º (Neptuno) congela! 🔥🥶

## Rochosos primeiro, gigantes depois 🪨

Repara: os **4 primeiros** da fila são pequenos e feitos de **rocha** (dava para pisar o chão); os **4 últimos** são **gigantes de gás**, enormes e sem chão. 🌬️

```compare
[
  { "title": "Os 4 primeiros 🪨", "rows": [
    { "label": "Quais são", "value": "Mercúrio, Vénus, Terra e Marte" },
    { "label": "Como são", "value": "pequenos, de pedra, com chão duro 🪨", "highlight": true }
  ] },
  { "title": "Os 4 últimos 🌬️", "rows": [
    { "label": "Quais são", "value": "Júpiter, Saturno, Úrano e Neptuno" },
    { "label": "Como são", "value": "gigantes de gás, sem chão para pisar 🌬️", "highlight": true }
  ] }
]
```

## Treina a ordem! 🎯

Vê a posição na fila e tenta dizer o planeta. Depois vira o cartão e confirma — vê quantos acertas seguidos! 🃏

```drill
{ "mode": "flip", "title": "Qual é este planeta?", "items": [
  { "front": "1.º planeta?", "back": "Mercúrio 🔥" },
  { "front": "2.º planeta?", "back": "Vénus ✨" },
  { "front": "3.º planeta?", "back": "Terra 🌍" },
  { "front": "4.º planeta?", "back": "Marte 🔴" },
  { "front": "5.º planeta?", "back": "Júpiter 🪐" },
  { "front": "6.º planeta?", "back": "Saturno 💍" },
  { "front": "7.º planeta?", "back": "Úrano ❄️" },
  { "front": "8.º planeta?", "back": "Neptuno 🔵" }
] }
```

Agora ao contrário: qual vem **a seguir** na fila? Escolhe! 👉

```drill
{ "mode": "choose", "title": "Quem vem a seguir?", "choices": 2, "items": [
  { "front": "A seguir a Mercúrio vem…", "back": "Vénus", "options": ["Terra"] },
  { "front": "A seguir a Vénus vem…", "back": "Terra", "options": ["Marte"] },
  { "front": "A seguir à Terra vem…", "back": "Marte", "options": ["Júpiter"] },
  { "front": "A seguir a Marte vem…", "back": "Júpiter", "options": ["Saturno"] },
  { "front": "A seguir a Júpiter vem…", "back": "Saturno", "options": ["Úrano"] },
  { "front": "A seguir a Saturno vem…", "back": "Úrano", "options": ["Neptuno"] },
  { "front": "A seguir a Úrano vem…", "back": "Neptuno", "options": ["Mercúrio"] }
] }
```

E uns desafios rápidos para fixar de vez! 🧠

```quiz
{
  "id": "estudo-planetas-treino",
  "questions": [
    { "q": "Qual é o 1.º planeta, o mais perto do Sol?", "layout": "grid",
      "options": [ { "t": "Mercúrio", "emoji": "🔥", "correct": true }, { "t": "Neptuno", "emoji": "🔵" }, { "t": "Terra", "emoji": "🌍" } ],
      "explain": "Mercúrio é o 1.º da fila, mesmo junto ao Sol." },
    { "q": "Em que posição está a Terra?", "layout": "grid",
      "options": [ { "t": "3.º planeta", "emoji": "🌍", "correct": true }, { "t": "1.º planeta", "emoji": "🔥" }, { "t": "8.º planeta", "emoji": "🔵" } ],
      "explain": "A Terra é o 3.º a contar do Sol: Mercúrio, Vénus, Terra." },
    { "q": "Qual é o último planeta, o mais longe do Sol?", "layout": "grid",
      "options": [ { "t": "Neptuno", "emoji": "🔵", "correct": true }, { "t": "Júpiter", "emoji": "🪐" }, { "t": "Marte", "emoji": "🔴" } ],
      "explain": "Neptuno é o 8.º e último, lá ao fundo, muito frio." },
    { "q": "Qual planeta vem logo a seguir a Marte?", "layout": "grid",
      "options": [ { "t": "Júpiter", "emoji": "🪐", "correct": true }, { "t": "Saturno", "emoji": "💍" }, { "t": "Vénus", "emoji": "✨" } ],
      "explain": "A ordem é… Marte, Júpiter, Saturno. A seguir a Marte vem Júpiter." },
    { "q": "Quantos planetas andam à volta do Sol?", "layout": "grid",
      "options": [ { "t": "8", "emoji": "🪐", "correct": true }, { "t": "3" }, { "t": "20" } ],
      "explain": "São 8 planetas, sempre pela mesma ordem." }
  ]
}
```

> [!TIP] **Para saberes mais** 🌱 Para além dos 8 planetas há os **planetas anões**, mais pequeninos — o mais famoso é o **Plutão**, lá muito longe, no frio. Já foi contado como 9.º planeta, mas hoje os cientistas chamam-lhe **planeta anão**, por isso não entra na nossa fila de 8. ❄️
