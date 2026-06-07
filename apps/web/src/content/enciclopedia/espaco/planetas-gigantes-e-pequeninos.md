# Planetas: gigantes e pequeninos 🪐

> [!NOTE] **O que vais aprender** 👀 Vais ver os **8 planetas** lado a lado e
> descobrir que há planetas **pequeninos de rocha** e **gigantes de gás** tão
> grandes que cabiam lá dentro **mil Terras**! 🌍➡️🪐

Imagina que pões os planetas todos em fila, do mais perto do Sol ao mais longe.
Alguns são pequeninos como bolinhas; outros são **enormes**. Toca em cada um
para o ouvires! 🚀

## Vê-os em fila, lado a lado 📏

Repara nos **tamanhos**: a Terra (a nossa casa 🌍) é pequenina ao pé de
**Júpiter** e **Saturno**! Lá ao fundo está o **Plutão**, tão pequeno que hoje
lhe chamamos *planeta anão*.

```solarsystem
{
  "layout": "lineup",
  "title": "Os planetas em fila",
  "say": "Aqui estão o Sol e os oito planetas em fila, do mais perto ao mais longe do Sol: Mercúrio, Vénus, Terra, Marte, Júpiter, Saturno, Úrano e Neptuno. Repara como Júpiter e Saturno são muito maiores do que a Terra.",
  "center": { "name": "Sol", "emoji": "☀️", "fact": "uma estrela gigante; está no centro de tudo e dá-nos luz e calor" },
  "bodies": [
    { "name": "Mercúrio", "size": 5, "color": "#b8b0a8", "emoji": "🔥", "fact": "o mais perto do Sol e muito quente" },
    { "name": "Vénus", "size": 8, "color": "#e6c98a", "emoji": "✨", "fact": "o mais brilhante no céu da noite" },
    { "name": "Terra", "size": 8.5, "color": "#4a90d9", "emoji": "🌍", "fact": "o nosso planeta, o único com água e vida" },
    { "name": "Marte", "size": 6, "color": "#d1603f", "emoji": "🔴", "fact": "o planeta vermelho, cheio de poeira cor de ferrugem" },
    { "name": "Júpiter", "size": 17, "color": "#d8a878", "emoji": "🪐", "fact": "o maior de todos os planetas" },
    { "name": "Saturno", "size": 14, "color": "#d8c89a", "emoji": "💍", "ring": true, "fact": "tem anéis lindos feitos de gelo e pedrinhas" },
    { "name": "Úrano", "size": 10, "color": "#9fd8d8", "emoji": "❄️", "fact": "gelado e gira deitado de lado" },
    { "name": "Neptuno", "size": 9, "color": "#4a6fd9", "emoji": "🔵", "fact": "o mais longe do Sol, muito frio e azul" }
  ],
  "dwarfs": [
    { "name": "Plutão", "size": 3, "color": "#c9a98f", "emoji": "❄️", "fact": "um planeta anão, lá muito longe e no frio; já foi contado como planeta" }
  ]
}
```

## Dois tipos de planeta 🪨🌬️

```compare
[
  { "title": "Pequeninos de rocha 🪨", "rows": [
    { "label": "Quais são", "value": "Mercúrio, Vénus, Terra e Marte" },
    { "label": "Tamanho", "value": "pequenos e pesados" },
    { "label": "Têm chão?", "value": "sim, dá para pisar! 🥾", "highlight": true }
  ] },
  { "title": "Gigantes de gás 🌬️", "rows": [
    { "label": "Quais são", "value": "Júpiter, Saturno, Úrano e Neptuno" },
    { "label": "Tamanho", "value": "enormes, os maiores de todos" },
    { "label": "Têm chão?", "value": "não — são feitos de gás 🌬️", "highlight": true }
  ] }
]
```

## Quão grande é Júpiter? 🤯

Olha para a barra: dentro de **Júpiter** cabiam mais de **mil Terras**!

```chart
{ "type": "bar", "title": "Quantas Terras cabem lá dentro?",
  "labels": ["Terra", "Neptuno", "Saturno", "Júpiter"],
  "data": [1, 58, 764, 1321],
  "say": "Dentro de Neptuno cabiam cerca de 58 Terras; dentro de Saturno, mais de 700; e dentro de Júpiter, mais de mil Terras!" }
```

> **Truque para a ordem:** *"**Me**u **Vé**u **Te**rrível **Ma**ndou **Jú**lia
> **Sa**ltar **U**ma **Ne**ve"* — a 1.ª letra de cada palavra dá a ordem dos
> planetas a partir do Sol! 😄

> [!TIP] **Para saberes mais** 🌱 O **Sol** é tão grande que cabiam lá dentro
> **mais de um milhão de Terras**! E não é um planeta — é uma **estrela**, igual
> às que vês a brilhar à noite, só que muito mais perto de nós. ⭐

## Vamos praticar 🎈

```quiz
{
  "id": "enc-espaco-planetas-pratica",
  "questions": [
    { "q": "Qual é o maior planeta de todos?", "layout": "grid",
      "options": [ { "t": "Júpiter", "emoji": "🪐", "correct": true }, { "t": "Terra", "emoji": "🌍" }, { "t": "Mercúrio", "emoji": "🔥" } ],
      "explain": "Júpiter é o maior — cabiam lá dentro mais de mil Terras!" },
    { "q": "De que são feitos os planetas gigantes?", "layout": "grid",
      "options": [ { "t": "gás", "emoji": "🌬️", "correct": true }, { "t": "rocha dura", "emoji": "🪨" } ],
      "explain": "Os gigantes (Júpiter, Saturno, Úrano e Neptuno) são feitos de gás." },
    { "q": "Como se chama agora o Plutão?", "layout": "grid",
      "options": [ { "t": "planeta anão", "emoji": "❄️", "correct": true }, { "t": "estrela", "emoji": "⭐" }, { "t": "lua", "emoji": "🌙" } ],
      "explain": "O Plutão é um planeta anão, lá muito longe e no frio." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "enc-espaco-planetas-final",
  "final": true,
  "title": "Planetas: gigantes e pequeninos",
  "questions": [
    { "q": "Quantos planetas tem o sistema solar?", "layout": "grid",
      "options": [ { "t": "8", "correct": true }, { "t": "3" }, { "t": "20" } ],
      "explain": "São 8 planetas a andar à volta do Sol." },
    { "q": "Qual planeta tem anéis famosos de gelo?", "layout": "grid",
      "options": [ { "t": "Saturno", "emoji": "💍", "correct": true }, { "t": "Mercúrio", "emoji": "🔥" }, { "t": "Terra", "emoji": "🌍" } ],
      "explain": "Saturno tem anéis lindos de gelo e pedrinhas." },
    { "q": "Os planetas pequeninos (como a Terra) são feitos de...", "layout": "grid",
      "options": [ { "t": "rocha", "emoji": "🪨", "correct": true }, { "t": "gás", "emoji": "🌬️" } ],
      "explain": "Mercúrio, Vénus, Terra e Marte são de rocha — dá para pisar o chão." },
    { "q": "Qual está mais longe do Sol?", "layout": "grid",
      "options": [ { "t": "Neptuno", "emoji": "🔵", "correct": true }, { "t": "Mercúrio", "emoji": "🔥" } ],
      "explain": "Neptuno é o 8.º e último, muito frio e bem azul." },
    { "q": "O Sol é uma...", "layout": "grid",
      "options": [ { "t": "estrela", "emoji": "⭐", "correct": true }, { "t": "planeta", "emoji": "🪐" }, { "t": "lua", "emoji": "🌙" } ],
      "explain": "O Sol é uma estrela — dá-nos luz e calor." }
  ]
}
```
