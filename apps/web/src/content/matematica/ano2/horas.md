# As horas no relógio 🕐

> [!NOTE] **O que vais aprender** 👀 Vais aprender a **ler as horas** no relógio de ponteiros, a saber o que são a **hora certa**, a **meia hora** e o **um quarto**, e a perceber quanto tempo dura um **minuto** e uma **hora**. ⏰

Sabias que o relógio é como um amigo que nos diz quando é a hora de acordar, de lanchar ou de ir dormir? 😴 Tem dois ponteiros que andam à roda o dia inteiro, sem nunca parar. Vamos aprender a falar a língua do relógio — é mais fácil do que parece! 🕐

## Os dois ponteiros ⏱️

O relógio tem **dois ponteiros** de tamanhos diferentes. Cada um tem o seu trabalho!

```keyvalue
[
  { "k": "Ponteiro pequeno", "v": "marca as HORAS — anda devagarinho 🐢" },
  { "k": "Ponteiro grande", "v": "marca os MINUTOS — anda mais depressa 🐇" },
  { "k": "Os números 1 a 12", "v": "estão à volta do relógio, em círculo 🔵" },
  { "k": "Para a direita", "v": "os ponteiros andam sempre para o mesmo lado ➡️" }
]
```

> Truque rápido: **p**equeno = **h**oras, **g**rande = minutos. O grande é grande porque tem de dar voltas maiores! 🌀

## Vê e ouve o relógio 🔊

Carrega no botão para ouvir as horas. Experimenta mexer nos ponteiros e vê o que acontece! 👀

```clock
{ "mode": "play", "hour": 3, "minute": 0, "title": "Brinca com o relógio" }
```

## A hora certa, a meia e o quarto ⏰

Há três horas especiais que aparecem muitas vezes. Olha bem onde fica o **ponteiro grande** em cada uma:

```keyvalue
[
  { "k": "Hora certa", "v": "ponteiro grande no 12 — ex.: 3:00 («três horas») 🎯" },
  { "k": "E meia", "v": "ponteiro grande no 6 — ex.: 3:30 («três e meia») 🌗" },
  { "k": "Um quarto", "v": "ponteiro grande no 3 — ex.: 3:15 («três e um quarto») 🍕" }
]
```

> [!NOTE] **E meia** quer dizer **meia hora**, ou seja, **30 minutos**. **Um quarto** é só **15 minutos** — um pedacinho da hora, como uma fatia de pizza! 🍕

## Quanto tempo é um minuto e uma hora? ⏳

O tempo mede-se em **minutos** e **horas**. Vamos ver quanto é cada um:

```stats
[
  { "label": "1 hora", "value": "60 minutos", "hint": "o ponteiro grande dá uma volta completa 🔄" },
  { "label": "Meia hora", "value": "30 minutos", "hint": "metade de uma hora 🌗" },
  { "label": "1 quarto de hora", "value": "15 minutos", "hint": "um pedacinho da hora 🍕" },
  { "label": "1 minuto", "value": "60 segundos", "hint": "o tempo de lavar bem as mãos 🧼" }
]
```

## Põe o relógio na hora certa 🎯

Agora és tu! Mexe nos ponteiros até o relógio marcar a hora pedida. 💪

```clock
{ "mode": "set", "hour": 6, "minute": 30, "prompt": "Põe o relógio nas 6 e meia (6:30)" }
```

> [!TIP] Usa os botões **➕ / ➖** para mover os ponteiros, ou **arrasta** o ponteiro grande cor de laranja! 🟧

## Dia e noite no relógio 🌞🌙

O relógio só tem números até ao **12**, mas um dia tem **24 horas**. Por isso, cada número passa **duas vezes**: uma de dia e outra de noite!

```compare
[
  { "title": "De manhã e de dia ☀️", "rows": [
    { "label": "7:00", "value": "hora de acordar ⏰" },
    { "label": "12:00", "value": "meio-dia — hora de almoçar 🍽️", "highlight": true },
    { "label": "16:00", "value": "hora do lanche 🍎" }
  ] },
  { "title": "De tarde e de noite 🌙", "rows": [
    { "label": "20:00", "value": "hora de jantar 🍲" },
    { "label": "21:00", "value": "hora de ir dormir 😴", "highlight": true },
    { "label": "0:00 (meia-noite)", "value": "está toda a gente a dormir 💤" }
  ] }
]
```

## Um exemplo passo a passo 🔍

Imagina esta pergunta: *«São 4 e meia. Para onde apontam os ponteiros?»* Vamos resolver juntos, com calma. 🧐

```steps
[
  { "title": "1. Lê com atenção", "body": "a hora é 4 e meia, ou seja 4:30 — tem uma parte das horas (4) e uma parte dos minutos (meia) ⏰", "icon": "🔍" },
  { "title": "2. Trata do ponteiro pequeno", "body": "as horas são 4, por isso o ponteiro pequeno fica perto do número 4 🐢", "icon": "🕓" },
  { "title": "3. Trata do ponteiro grande", "body": "«meia» quer dizer 30 minutos, e 30 minutos é o ponteiro grande no número 6 🐇", "icon": "🌗" },
  { "title": "4. Junta tudo", "body": "ponteiro pequeno no 4 + ponteiro grande no 6 = 4:30 ✅", "icon": "🤝" },
  { "title": "5. Resposta", "body": "às 4 e meia, o pequeno aponta para o 4 e o grande aponta para o 6 🎉", "icon": "🎯" }
]
```

> **Truque:** quando ouves **«e meia»**, pensa logo no **6** (ponteiro grande). Quando ouves **«hora certa»**, pensa no **12**. E o ponteiro **pequeno** segue sempre o número da hora que dizes! 📌

> [!TIP] **Para saberes mais** 🌱 Os adultos usam muitas vezes o **relógio de 24 horas** (relógio digital). Depois do meio-dia, em vez de dizerem «4 da tarde», dizem **«16 horas»** — basta somar 12! Assim ninguém se engana entre o dia e a noite. ⏱️

## Vamos praticar 🎈

```quiz
{
  "id": "mat2-horas-pratica",
  "questions": [
    { "q": "Que ponteiro marca as horas?", "layout": "grid",
      "options": [ { "t": "o pequeno", "emoji": "🐢", "correct": true }, { "t": "o grande", "emoji": "🐇" } ],
      "explain": "O ponteiro pequeno marca as horas." },
    { "q": "Que ponteiro marca os minutos?", "layout": "grid",
      "options": [ { "t": "o grande", "emoji": "🐇", "correct": true }, { "t": "o pequeno", "emoji": "🐢" } ],
      "explain": "O ponteiro grande marca os minutos." },
    { "q": "Numa hora certa, o ponteiro grande aponta para o…", "layout": "grid",
      "options": [ { "t": "12", "emoji": "🎯", "correct": true }, { "t": "6" }, { "t": "3" } ],
      "explain": "Hora certa = ponteiro grande no 12." },
    { "q": "«E meia» quer dizer quantos minutos?", "layout": "grid",
      "options": [ { "t": "30", "emoji": "🌗", "correct": true }, { "t": "15" }, { "t": "60" } ],
      "explain": "Meia hora são 30 minutos." },
    { "q": "Quantos minutos tem uma hora?", "layout": "grid",
      "options": [ { "t": "60", "emoji": "⏳", "correct": true }, { "t": "30" }, { "t": "100" } ],
      "explain": "Uma hora tem 60 minutos." },
    { "q": "Às 5:00 (cinco horas) o ponteiro pequeno aponta para o…", "layout": "grid",
      "options": [ { "t": "5", "emoji": "🕔", "correct": true }, { "t": "12" }, { "t": "10" } ],
      "explain": "Às 5 horas, o ponteiro pequeno está no 5." },
    { "q": "Quando o ponteiro grande está no 6, são horas e…", "layout": "grid",
      "options": [ { "t": "meia", "emoji": "🌗", "correct": true }, { "t": "certa" } ],
      "explain": "Grande no 6 = e meia (30 minutos)." },
    { "q": "Quantos minutos é um quarto de hora?", "layout": "grid",
      "options": [ { "t": "15", "emoji": "🍕", "correct": true }, { "t": "30" }, { "t": "45" } ],
      "explain": "Um quarto de hora são 15 minutos." },
    { "q": "A que horas costumamos almoçar?", "layout": "grid",
      "options": [ { "t": "ao meio-dia (12:00)", "emoji": "🍽️", "correct": true }, { "t": "à meia-noite (0:00)", "emoji": "💤" } ],
      "explain": "O meio-dia é às 12:00, a hora do almoço." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat2-horas-final",
  "final": true,
  "title": "As horas no relógio",
  "questions": [
    { "q": "Quando é uma hora certa, o ponteiro grande aponta para o…", "layout": "grid",
      "options": [ { "t": "12", "emoji": "🎯", "correct": true }, { "t": "6" }, { "t": "3" } ],
      "explain": "Hora certa = ponteiro grande no 12." },
    { "q": "Que ponteiro marca as horas?", "layout": "grid",
      "options": [ { "t": "o pequeno", "emoji": "🐢", "correct": true }, { "t": "o grande", "emoji": "🐇" } ],
      "explain": "O ponteiro pequeno marca as horas." },
    { "q": "«E meia» quer dizer quantos minutos?", "layout": "grid",
      "options": [ { "t": "30", "emoji": "🌗", "correct": true }, { "t": "15" }, { "t": "45" } ],
      "explain": "Meia hora = 30 minutos." },
    { "q": "Às 4:00 o ponteiro pequeno aponta para o…", "layout": "grid",
      "options": [ { "t": "4", "emoji": "🕓", "correct": true }, { "t": "12" }, { "t": "8" } ],
      "explain": "Às 4 horas, o ponteiro pequeno está no 4." },
    { "q": "Uma hora tem quantos minutos?", "layout": "grid",
      "options": [ { "t": "60", "emoji": "⏳", "correct": true }, { "t": "30" }, { "t": "12" } ],
      "explain": "Uma hora tem 60 minutos." },
    { "q": "Quando o ponteiro grande está no 6, dizemos que são horas e…", "layout": "grid",
      "options": [ { "t": "meia", "emoji": "🌗", "correct": true }, { "t": "um quarto", "emoji": "🍕" } ],
      "explain": "Grande no 6 = e meia (30 minutos)." },
    { "q": "Às 3 e meia (3:30), onde fica o ponteiro grande?", "layout": "grid",
      "options": [ { "t": "no 6", "emoji": "🌗", "correct": true }, { "t": "no 12" }, { "t": "no 3" } ],
      "explain": "«E meia» = ponteiro grande no 6." },
    { "q": "Como dizem os adultos «4 da tarde» no relógio de 24 horas?", "layout": "grid",
      "options": [ { "t": "16 horas", "emoji": "⏱️", "correct": true }, { "t": "40 horas" }, { "t": "24 horas" } ],
      "explain": "Depois do meio-dia soma-se 12: 4 + 12 = 16 horas." }
  ]
}
```
