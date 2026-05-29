# O calendário e o tempo 📅

O calendário é como um mapa do tempo! Mostra-te os dias, as semanas e os meses do ano. 🗓️ Vais ver que é fácil!

## Dias, semanas, meses e ano 🌍

O tempo está organizado por tamanhos, do mais pequeno ao maior. Repara como cada um cabe dentro do outro!

```keyvalue
[
  { "k": "1 semana", "v": "= 7 dias (de segunda a domingo) 📆" },
  { "k": "1 mês", "v": "= cerca de 4 semanas (28, 30 ou 31 dias) 🌙" },
  { "k": "1 ano", "v": "= 12 meses 🎉" },
  { "k": "1 ano", "v": "= 365 dias ☀️" }
]
```

> Os meses do ano são: janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro e dezembro. 🎵

E o ano dá uma volta com **4 estações**: cada uma é um bocadinho diferente!

```keyvalue
[
  { "k": "Primavera 🌸", "v": "as flores nascem" },
  { "k": "Verão ☀️", "v": "muito calor e praia" },
  { "k": "Outono 🍂", "v": "as folhas caem" },
  { "k": "Inverno ❄️", "v": "frio e chuva" }
]
```

## Um exemplo passo a passo 🔍

Vamos contar quantos dias faltam para uma festa! A festa é no **dia 20** e hoje é **dia 14** do mesmo mês. Quantos dias faltam?

```steps
[
  { "title": "Vê os dois dias", "body": "Hoje é 14. A festa é no 20. 🎈" },
  { "title": "Faz a subtração", "body": "20 − 14 = 6. Tiras o dia de hoje do dia da festa." },
  { "title": "Responde", "body": "Faltam 6 dias para a festa! 🎉" }
]
```

## Truque 🪄

Para saber **quantos dias faltam**, faz sempre **dia maior − dia menor**.

Se faltam poucos dias, podes ir a **saltar no calendário**: pões o dedo no dia de hoje e vais a contar "1, 2, 3..." até chegar ao dia certo. Cada salto é um dia! 👆

```numberline
{ "min": 14, "max": 20, "start": 14, "step": 1, "title": "Salta do 14 até ao 20" }
```

## Resolver um problema 🧩

A Maria vai de férias no **dia 25** e hoje é **dia 18**. Quantos dias faltam para as férias dela? 🏖️

```steps
[
  { "title": "Ler", "body": "Hoje é 18. As férias são no dia 25." },
  { "title": "Ver os dados", "body": "Dia de hoje = 18. Dia das férias = 25." },
  { "title": "Escolher a conta", "body": "Para saber quantos faltam, subtraio: 25 − 18." },
  { "title": "Responder e confirmar", "body": "25 − 18 = 7. Faltam 7 dias, ou seja, 1 semana inteira! 🎒" }
]
```

> [!TIP] **Para saberes mais** 🌱 De **4 em 4 anos** existe um **ano bissexto**: fevereiro tem **29 dias** em vez de 28, e o ano fica com **366 dias**!

## Vamos praticar 🎈

```quiz
{
  "id": "mat-3-calendario-pratica",
  "questions": [
    { "q": "Quantos dias tem uma semana?", "layout": "grid",
      "options": [ { "t": "7", "emoji": "📆", "correct": true }, { "t": "5" }, { "t": "10" } ],
      "explain": "Uma semana tem 7 dias, de segunda a domingo." },
    { "q": "Hoje é dia 10 e a festa é no dia 16. Quantos dias faltam?", "layout": "grid",
      "options": [ { "t": "6", "emoji": "🎉", "correct": true }, { "t": "4" }, { "t": "16" } ],
      "explain": "16 − 10 = 6 dias." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-3-calendario-final",
  "final": true,
  "title": "O calendário e o tempo",
  "questions": [
    { "q": "Quantos meses tem 1 ano?", "layout": "grid",
      "options": [ { "t": "12", "emoji": "🎉", "correct": true }, { "t": "7" }, { "t": "30" } ],
      "explain": "Um ano tem 12 meses." },
    { "q": "Em que estação caem as folhas das árvores?", "layout": "grid",
      "options": [ { "t": "Outono", "emoji": "🍂", "correct": true }, { "t": "Verão", "emoji": "☀️" }, { "t": "Primavera", "emoji": "🌸" } ],
      "explain": "No outono as folhas caem das árvores." },
    { "q": "Hoje é dia 12 e o passeio é no dia 19. Quantos dias faltam?", "layout": "grid",
      "options": [ { "t": "7", "emoji": "📆", "correct": true }, { "t": "5" }, { "t": "9" } ],
      "explain": "19 − 12 = 7 dias, uma semana inteira!" },
    { "q": "Quantos dias tem 1 ano normal?", "layout": "grid",
      "options": [ { "t": "365", "emoji": "☀️", "correct": true }, { "t": "100" }, { "t": "12" } ],
      "explain": "Um ano normal tem 365 dias." }
  ]
}
```
