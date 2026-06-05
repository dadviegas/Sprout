# O relógio e as horas ⏰

> [!NOTE] **O que vais aprender** 👀
> A **ler as horas** num relógio! 🕐 Vais conhecer os **ponteiros**, saber o que
> são **segundos**, **minutos**, **horas** e **dias**, e descobrir porque é que
> o tempo é o mais **esquisito** de todas as medidas. Toca nos altifalantes 🔊
> para ouvires tudo!

## Os ponteiros do relógio 🕐

Um relógio tem **dois ponteiros** que andam à roda. Repara bem em qual é qual:

```keyvalue
[
  { "k": "Ponteiro pequeno", "v": "marca as HORAS — anda devagarinho 🐌", "icon": "🕐" },
  { "k": "Ponteiro grande", "v": "marca os MINUTOS — anda mais depressa 🏃", "icon": "🕧" }
]
```

Vê o relógio, arrasta o ponteiro grande e toca para ouvires as horas! 🎧

```clock
{ "mode": "play", "hour": 3, "minute": 0, "title": "Que horas são?" }
```

### Passo a passo: como ler as horas 🤔

```steps
[
  { "title": "1. Olha o ponteiro pequeno", "body": "ele aponta para o número da HORA. Aqui aponta para o 3.", "icon": "🕐" },
  { "title": "2. Olha o ponteiro grande", "body": "no 12 está \"em ponto\"; a meio (no 6) é \"e meia\".", "icon": "🕧" },
  { "title": "3. Diz as horas", "body": "pequeno no 3 e grande no 12: são 3 horas! 🎉", "icon": "🗣️" }
]
```

> [!TIP] **Truque dos quartos e da meia** 🧠 O relógio é como uma pizza! 🍕
> Quando o ponteiro grande chega ao **6**, deu **meia** volta — é "e meia"
> (**30** minutos). No **3** é "e um quarto" (**15** min) e no **9** é "menos um
> quarto". Meia pizza, um quarto de pizza! 

## O tempo é o esquisito! 🧐

Aqui o tempo é **diferente** das outras medidas: **não** vai de mil em mil,
nem de cem em cem!

```keyvalue
[
  { "k": "1 minuto", "v": "= 60 segundos ⏱️", "icon": "⏱️" },
  { "k": "1 hora", "v": "= 60 minutos 🕐", "icon": "🕐" },
  { "k": "1 dia", "v": "= 24 horas 🌗", "icon": "🌗" }
]
```

```math
{ "expr": "1 min = 60 s", "say": "um minuto é igual a sessenta segundos" }
```

```math
{ "expr": "1 h = 60 min", "say": "uma hora é igual a sessenta minutos" }
```

```math
{ "expr": "1 dia = 24 h", "say": "um dia é igual a vinte e quatro horas" }
```

## Treina agora! 🎯

Acerta o relógio na hora que te peço. Arrasta os ponteiros (ou usa o −/+) e
carrega em **Verificar**! 👇

```clock
{ "mode": "set", "hour": 6, "minute": 30, "title": "Acerta o relógio", "prompt": "Mostra as 6 e meia!" }
```

Agora escolhe a equivalência certa. Toca para ouvir se acertaste! ✅

```drill
{ "mode": "choose", "title": "Quanto é?", "choices": 3, "items": [
  { "front": "1 hora = ? minutos", "back": "60 min", "options": ["100 min", "30 min"] },
  { "front": "1 minuto = ? segundos", "back": "60 s", "options": ["100 s", "10 s"] },
  { "front": "1 dia = ? horas", "back": "24 h", "options": ["12 h", "60 h"] },
  { "front": "Meia hora = ? minutos", "back": "30 min", "options": ["60 min", "15 min"] },
  { "front": "Um quarto de hora = ? minutos", "back": "15 min", "options": ["30 min", "45 min"] }
] }
```

E que **unidade de tempo** usarias? Escolhe a mais acertada! 🤓

```drill
{ "mode": "choose", "title": "Quanto tempo demora?", "choices": 3, "items": [
  { "front": "Um piscar de olhos", "back": "segundos", "options": ["horas", "dias"] },
  { "front": "O recreio da escola", "back": "minutos", "options": ["segundos", "dias"] },
  { "front": "Uma noite de sono", "back": "horas", "options": ["segundos", "minutos"] },
  { "front": "As férias grandes", "back": "dias", "options": ["minutos", "segundos"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Porque é que a hora tem **60** minutos e não
> 100? 🤔 Há muito, muito tempo, um povo antigo — os **babilónios** — gostava de
> contar de **60 em 60**, porque 60 reparte-se de muitas maneiras (em 2, 3, 4,
> 5, 6…). A ideia era tão boa que ainda hoje, milhares de anos depois, o relógio
> do mundo inteiro conta o tempo de 60 em 60! ⏳
