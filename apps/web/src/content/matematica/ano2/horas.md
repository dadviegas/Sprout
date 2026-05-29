# As horas no relógio 🕐

O relógio tem **dois ponteiros**: o **pequeno** marca as **horas** e o **grande** marca os **minutos**. ⏰

> Quando o ponteiro grande aponta para o **12**, é uma hora certa!

## Vê e ouve 🔊

Carrega no botão para ouvir as horas. Experimenta mexer no relógio!

```clock
{ "mode": "play", "hour": 3, "minute": 0, "title": "Brinca com o relógio" }
```

## Põe o relógio na hora certa 🎯

```clock
{ "mode": "set", "hour": 6, "minute": 30, "prompt": "Põe o relógio nas 6 e meia (6:30)" }
```

> [!TIP] Usa os botões **➕ / ➖** para mover os ponteiros, ou **arrasta** o ponteiro grande cor de laranja! 🟧

## Horas especiais

```keyvalue
[
  { "k": "Hora certa", "v": "ponteiro grande no 12 (ex.: 3:00)" },
  { "k": "E meia", "v": "ponteiro grande no 6 (ex.: 3:30)" },
  { "k": "Um quarto", "v": "ponteiro grande no 3 (ex.: 3:15)" }
]
```

## 🎯 Questionário final

```quiz
{
  "id": "mat2-horas-final",
  "final": true,
  "title": "As horas",
  "questions": [
    { "q": "Quando é uma hora certa, o ponteiro grande aponta para o...", "layout": "grid",
      "options": [ { "t": "12", "correct": true }, { "t": "6" }, { "t": "3" } ],
      "explain": "Hora certa = ponteiro grande no 12." },
    { "q": "Que ponteiro marca as horas?", "layout": "grid",
      "options": [ { "t": "o pequeno", "correct": true }, { "t": "o grande" } ],
      "explain": "O ponteiro pequeno marca as horas." },
    { "q": "'E meia' quer dizer quantos minutos?", "layout": "grid",
      "options": [ { "t": "15" }, { "t": "30", "correct": true }, { "t": "45" } ],
      "explain": "Meia hora = 30 minutos." },
    { "q": "Às 4:00 o ponteiro pequeno aponta para o...", "layout": "grid",
      "options": [ { "t": "4", "correct": true }, { "t": "12" }, { "t": "8" } ],
      "explain": "Às 4 horas, o ponteiro pequeno está no 4." }
  ]
}
```
