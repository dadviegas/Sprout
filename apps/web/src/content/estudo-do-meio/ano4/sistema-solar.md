# O sistema solar 🪐

> [!NOTE] **O que vais aprender** 👀 Vais conhecer o **Sol** e os **8 planetas** que andam à sua volta, descobrir o que são as **órbitas**, as **luas** e os **movimentos** da Terra que fazem o dia e a noite e as estações do ano! 🌍🌙

Olha para cima numa noite escura: aquilo tudo a brilhar é o **espaço**! 🌌 Nós vivemos numa pequena família espacial chamada **sistema solar**. No meio está o **Sol**, e à sua volta andam **8 planetas** — e a Terra, o nosso planeta, é um deles! Pega no fato de astronauta e vamos explorar. 🚀

## Vê o sistema solar a mexer 🔭

Toca em cada planeta para ouvires o nome e uma curiosidade. Repara na **Lua** a girar à volta da Terra! Podes **parar** e **voltar a pôr a andar** com o botão.

```solarsystem
{
  "title": "Toca num planeta!",
  "say": "No centro está o Sol. À volta dele andam oito planetas. A Terra é o nosso, e tem a Lua a girar à sua volta. Os planetas maiores, como Júpiter e Saturno, têm muitas luas.",
  "center": { "name": "Sol", "emoji": "☀️", "fact": "uma estrela gigante; está no centro de tudo e dá-nos luz e calor" },
  "bodies": [
    { "name": "Mercúrio", "orbit": 46, "size": 5, "color": "#b8b0a8", "period": 8, "emoji": "🔥", "fact": "o mais perto do Sol e muito quente" },
    { "name": "Vénus", "orbit": 64, "size": 8, "color": "#e6c98a", "period": 12, "emoji": "✨", "fact": "o mais brilhante no céu da noite" },
    { "name": "Terra", "orbit": 84, "size": 8.5, "color": "#4a90d9", "period": 16, "emoji": "🌍", "fact": "o nosso planeta, o único com água e vida",
      "moons": [ { "name": "Lua", "orbit": 15, "size": 3, "color": "#dcdcdc", "period": 3, "emoji": "🌙", "fact": "o satélite da Terra; muda de forma no céu" } ] },
    { "name": "Marte", "orbit": 102, "size": 6, "color": "#d1603f", "period": 20, "emoji": "🔴", "fact": "o planeta vermelho, cheio de poeira cor de ferrugem" },
    { "name": "Júpiter", "orbit": 130, "size": 17, "color": "#d8a878", "period": 30, "emoji": "🪐", "fact": "o maior de todos os planetas",
      "moons": [ { "name": "Io", "orbit": 27, "size": 2.5, "color": "#e9d27a", "period": 4, "emoji": "🌑", "fact": "uma das mais de 90 luas de Júpiter!" } ] },
    { "name": "Saturno", "orbit": 160, "size": 14, "color": "#d8c89a", "period": 38, "emoji": "💍", "ring": true, "fact": "tem anéis lindos feitos de gelo e pedrinhas",
      "moons": [ { "name": "Titã", "orbit": 35, "size": 3, "color": "#cbb27a", "period": 5, "emoji": "🌑", "fact": "a maior lua de Saturno" } ] },
    { "name": "Úrano", "orbit": 182, "size": 10, "color": "#9fd8d8", "period": 46, "emoji": "❄️", "fact": "gelado e azul-esverdeado; gira deitado de lado",
      "moons": [ { "name": "Titânia", "orbit": 18, "size": 2.5, "color": "#cfeaea", "period": 4, "emoji": "🌑", "fact": "a maior lua de Úrano" } ] },
    { "name": "Neptuno", "orbit": 200, "size": 9, "color": "#4a6fd9", "period": 54, "emoji": "🔵", "fact": "o mais longe do Sol, muito frio e azul" }
  ]
}
```

## Vê-os em fila, lado a lado 📏

Agora vê o Sol e os planetas **em fila**, a começar no que está mais perto do Sol. Repara nos **tamanhos**: a Terra é pequenina ao pé de **Júpiter** e **Saturno**! Toca em cada um para o ouvires. 👀

```solarsystem
{
  "layout": "lineup",
  "title": "Os planetas em fila",
  "say": "Aqui estão o Sol e os oito planetas em fila, do mais perto do Sol ao mais longe: Mercúrio, Vénus, Terra, Marte, Júpiter, Saturno, Úrano e Neptuno. Repara como Júpiter e Saturno são muito maiores do que a Terra. Lá ao fundo está o Plutão, um planeta anão.",
  "center": { "name": "Sol", "emoji": "☀️", "fact": "uma estrela gigante; está no centro de tudo e dá-nos luz e calor" },
  "bodies": [
    { "name": "Mercúrio", "size": 5, "color": "#b8b0a8", "emoji": "🔥", "fact": "o mais perto do Sol e muito quente" },
    { "name": "Vénus", "size": 8, "color": "#e6c98a", "emoji": "✨", "fact": "o mais brilhante no céu da noite" },
    { "name": "Terra", "size": 8.5, "color": "#4a90d9", "emoji": "🌍", "fact": "o nosso planeta, o único com água e vida" },
    { "name": "Marte", "size": 6, "color": "#d1603f", "emoji": "🔴", "fact": "o planeta vermelho, cheio de poeira cor de ferrugem" },
    { "name": "Júpiter", "size": 17, "color": "#d8a878", "emoji": "🪐", "fact": "o maior de todos os planetas" },
    { "name": "Saturno", "size": 14, "color": "#d8c89a", "emoji": "💍", "ring": true, "fact": "tem anéis lindos feitos de gelo e pedrinhas" },
    { "name": "Úrano", "size": 10, "color": "#9fd8d8", "emoji": "❄️", "fact": "gelado e azul-esverdeado; gira deitado de lado" },
    { "name": "Neptuno", "size": 9, "color": "#4a6fd9", "emoji": "🔵", "fact": "o mais longe do Sol, muito frio e azul" }
  ],
  "dwarfs": [
    { "name": "Plutão", "size": 3, "color": "#c9a98f", "emoji": "❄️", "fact": "um planeta anão, lá muito longe e no frio; já foi contado como planeta" }
  ]
}
```

## Os 8 planetas (do mais perto do Sol ao mais longe) 🌟

Os planetas andam todos à volta do Sol, mas alguns estão **mais perto** e outros **muito mais longe**. Aqui estão por ordem, começando no que está mais junto ao Sol:

```steps
[
  { "title": "1. Mercúrio", "body": "o mais perto do Sol, pequenino e muito quente 🔥" },
  { "title": "2. Vénus", "body": "o mais brilhante no céu — vê-se de manhã e à noite ✨" },
  { "title": "3. Terra 🌍", "body": "o nosso planeta, o único com água e vida, com a sua Lua 🌙" },
  { "title": "4. Marte", "body": "o planeta vermelho, com poeira cor de ferrugem 🔴" },
  { "title": "5. Júpiter", "body": "o maior de todos — cabiam lá dentro mil Terras! 🪐" },
  { "title": "6. Saturno", "body": "tem anéis lindos de gelo e pedrinhas 💍" },
  { "title": "7. Úrano", "body": "gelado e gira deitado de lado, como uma bola a rolar ❄️" },
  { "title": "8. Neptuno", "body": "o mais longe, muito frio e bem azul 🔵" }
]
```

> **Truque para a ordem:** *"**Me**u **Vé**u **Te**rrível **Ma**ndou **Jú**lia **Sa**ltar **U**ma **Ne**ve"* — a 1.ª letra de cada palavra dá a ordem dos planetas! 😄

## Planetas rochosos e planetas gigantes 🪨

Nem todos os planetas são iguais! Os **4 primeiros** são pequenos e feitos de **rocha**, onde se poderia pisar o chão. Os **4 últimos** são **gigantes de gás**, enormes mas sem chão para pisar.

```compare
[
  { "title": "Planetas rochosos 🪨", "rows": [
    { "label": "Quais são", "value": "Mercúrio, Vénus, Terra e Marte" },
    { "label": "Tamanho", "value": "pequenos e pesados" },
    { "label": "De que são feitos", "value": "pedra e metal, com chão duro 🪨", "highlight": true }
  ] },
  { "title": "Gigantes gasosos 🌬️", "rows": [
    { "label": "Quais são", "value": "Júpiter, Saturno, Úrano e Neptuno" },
    { "label": "Tamanho", "value": "enormes, os maiores de todos" },
    { "label": "De que são feitos", "value": "gases, sem chão para pisar 🌬️", "highlight": true }
  ] }
]
```

## O Sol — a nossa estrela ☀️

O **Sol** não é um planeta: é uma **estrela**, uma bola gigante de gás muito, muito quente. É ele que ilumina e aquece todo o sistema solar.

```keyvalue
[
  { "k": "É enorme", "v": "cabiam lá dentro mais de um milhão de Terras! 🤯" },
  { "k": "Dá luz e calor", "v": "sem o Sol não havia plantas, nem animais, nem nós 🌱" },
  { "k": "Está longe", "v": "a luz do Sol demora 8 minutos a chegar à Terra ☀️" },
  { "k": "É uma estrela", "v": "à noite vês muitas estrelas; o Sol é a que está mais perto de nós ⭐" }
]
```

## As luas (satélites) 🌙

Uma **lua** (ou **satélite**) é uma bola que anda à volta de um planeta — tal como os planetas andam à volta do Sol.

```keyvalue
[
  { "k": "A Terra", "v": "tem 1 lua: a nossa Lua 🌙" },
  { "k": "Mercúrio e Vénus", "v": "não têm nenhuma lua 🚫" },
  { "k": "Júpiter e Saturno", "v": "são tão grandes que têm dezenas de luas cada um! 🌑🌑🌑" },
  { "k": "A nossa Lua", "v": "demora cerca de 1 mês a dar a volta à Terra 🗓️" }
]
```

> A nossa **Lua** demora cerca de **1 mês** a dar a volta à Terra. Por isso, ao longo do mês, vemo-la mudar de forma: cheia 🌕, meia 🌗 e nova 🌑.

## A Terra mexe-se: dia, noite e estações 🌍

A Terra está sempre a **mexer-se** de duas maneiras ao mesmo tempo — e isso explica o **dia e a noite** e as **estações do ano**!

```keyvalue
[
  { "k": "Rotação 🔄", "v": "a Terra roda sobre si mesma; demora 1 dia (24 horas) e faz o dia e a noite ☀️🌙" },
  { "k": "Translação 🛤️", "v": "a Terra dá a volta ao Sol; demora 1 ano (365 dias) e faz as estações 🍂" },
  { "k": "Dia ☀️", "v": "o lado da Terra virado para o Sol está iluminado" },
  { "k": "Noite 🌙", "v": "o lado da Terra que não apanha o Sol está escuro" }
]
```

## Um exemplo passo a passo 🔍

Imagina esta pergunta: *«Qual é o planeta mais perto do Sol — Mercúrio ou Neptuno?»* Vamos resolver com calma. 🧐

```steps
[
  { "title": "1. Lê com atenção", "body": "a pergunta quer saber qual está MAIS PERTO do Sol 🔍" },
  { "title": "2. Lembra-te da ordem", "body": "usa o truque: Meu Véu Terrível... Mercúrio é o 1.º da fila!" },
  { "title": "3. Onde está cada um", "body": "Mercúrio é o 1.º (logo a seguir ao Sol); Neptuno é o 8.º (o último, lá ao fundo)" },
  { "title": "4. Compara", "body": "o 1.º está mais perto do que o 8.º — Mercúrio ganha! ✅" },
  { "title": "5. Resposta", "body": "Mercúrio é o planeta mais perto do Sol, e por isso é muito quente 🔥" }
]
```

> **Truque:** para saber se um planeta é **quente ou frio**, vê a distância ao Sol. Quanto **mais perto** do Sol, mais **quente**; quanto **mais longe**, mais **frio**. Por isso Mercúrio frita e Neptuno congela! 🔥🥶

> [!TIP] **Para saberes mais** 🌱 Para além dos 8 planetas, há os **planetas anões**, mais pequeninos — o mais famoso é o **Plutão**, lá muito longe, no frio. Já foi contado como planeta, mas hoje os cientistas chamam-lhe **planeta anão**. E há ainda milhões de pedras a voar pelo espaço: os **asteroides** e os **cometas**, que deixam um rasto brilhante no céu! ☄️

## Vamos praticar 🎈

```quiz
{
  "id": "edm4-ss-pratica",
  "questions": [
    { "q": "Em que planeta vivemos?", "layout": "grid",
      "options": [ { "t": "Terra", "emoji": "🌍", "correct": true }, { "t": "Marte", "emoji": "🔴" }, { "t": "Júpiter", "emoji": "🪐" } ],
      "explain": "Vivemos no planeta Terra!" },
    { "q": "O que está no centro do sistema solar?", "layout": "grid",
      "options": [ { "t": "o Sol", "emoji": "☀️", "correct": true }, { "t": "a Lua", "emoji": "🌙" }, { "t": "a Terra", "emoji": "🌍" } ],
      "explain": "O Sol está no centro." },
    { "q": "O que anda à volta de um planeta?", "layout": "grid",
      "options": [ { "t": "uma lua (satélite)", "emoji": "🌙", "correct": true }, { "t": "uma estrela", "emoji": "⭐" } ],
      "explain": "Uma lua, ou satélite, anda à volta do planeta." },
    { "q": "Quantos planetas tem o sistema solar?", "layout": "grid",
      "options": [ { "t": "8", "emoji": "🪐", "correct": true }, { "t": "2" }, { "t": "20" } ],
      "explain": "São 8 planetas a andar à volta do Sol." },
    { "q": "Qual é o planeta mais perto do Sol?", "layout": "grid",
      "options": [ { "t": "Mercúrio", "emoji": "🔥", "correct": true }, { "t": "Neptuno", "emoji": "🔵" }, { "t": "Terra", "emoji": "🌍" } ],
      "explain": "Mercúrio é o 1.º da fila, mesmo junto ao Sol." },
    { "q": "O caminho redondo que um planeta faz à volta do Sol chama-se...", "layout": "grid",
      "options": [ { "t": "órbita", "emoji": "🔄", "correct": true }, { "t": "estrada", "emoji": "🛣️" } ],
      "explain": "Cada planeta segue a sua órbita à volta do Sol." },
    { "q": "Quantas luas tem a Terra?", "layout": "grid",
      "options": [ { "t": "uma", "emoji": "🌙", "correct": true }, { "t": "dez" }, { "t": "nenhuma" } ],
      "explain": "A Terra tem 1 lua: a nossa Lua." },
    { "q": "Quanto tempo demora a luz do Sol a chegar à Terra?", "layout": "grid",
      "options": [ { "t": "cerca de 8 minutos", "emoji": "☀️", "correct": true }, { "t": "1 segundo" } ],
      "explain": "Mesmo a correr depressa, a luz demora cerca de 8 minutos a chegar até nós." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "edm4-ss-final",
  "final": true,
  "title": "O sistema solar",
  "questions": [
    { "q": "Quantos planetas tem o sistema solar?", "layout": "grid",
      "options": [ { "t": "8", "correct": true }, { "t": "3" }, { "t": "100" } ],
      "explain": "São 8 planetas." },
    { "q": "Qual é o 'planeta vermelho'?", "layout": "grid",
      "options": [ { "t": "Marte", "emoji": "🔴", "correct": true }, { "t": "Vénus" }, { "t": "Saturno" } ],
      "explain": "Marte é o planeta vermelho, por causa da poeira cor de ferrugem." },
    { "q": "A Lua anda à volta de...", "layout": "grid",
      "options": [ { "t": "da Terra", "emoji": "🌍", "correct": true }, { "t": "do Sol", "emoji": "☀️" } ],
      "explain": "A Lua é satélite da Terra." },
    { "q": "Qual planeta tem anéis famosos?", "layout": "grid",
      "options": [ { "t": "Saturno", "emoji": "🪐", "correct": true }, { "t": "Mercúrio" }, { "t": "Terra" } ],
      "explain": "Saturno tem anéis lindos de gelo e pedrinhas." },
    { "q": "O Sol é uma...", "layout": "grid",
      "options": [ { "t": "estrela", "emoji": "⭐", "correct": true }, { "t": "lua", "emoji": "🌙" }, { "t": "planeta", "emoji": "🪐" } ],
      "explain": "O Sol é uma estrela — dá-nos luz e calor." },
    { "q": "Qual é o maior planeta de todos?", "layout": "grid",
      "options": [ { "t": "Júpiter", "emoji": "🪐", "correct": true }, { "t": "Mercúrio", "emoji": "🔥" }, { "t": "Terra", "emoji": "🌍" } ],
      "explain": "Júpiter é o maior — cabiam lá dentro mil Terras!" },
    { "q": "O que faz o dia e a noite?", "layout": "grid",
      "options": [ { "t": "a Terra a rodar sobre si mesma", "emoji": "🔄", "correct": true }, { "t": "a Lua a desaparecer", "emoji": "🌙" } ],
      "explain": "A Terra roda (rotação) num dia: o lado virado ao Sol tem dia, o outro tem noite." },
    { "q": "Como se chamam as bolas pequeninas que já não são planetas, como o Plutão?", "layout": "grid",
      "options": [ { "t": "planetas anões", "emoji": "🪨", "correct": true }, { "t": "estrelas", "emoji": "⭐" } ],
      "explain": "O Plutão é um planeta anão, lá muito longe e no frio." },
    { "q": "Qual planeta está mais longe do Sol?", "layout": "grid",
      "options": [ { "t": "Neptuno", "emoji": "🔵", "correct": true }, { "t": "Mercúrio", "emoji": "🔥" } ],
      "explain": "Neptuno é o 8.º e último, muito frio e bem azul." }
  ]
}
```
