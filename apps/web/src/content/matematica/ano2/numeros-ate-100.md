# Números até 100 💯

Já contas até 10? Agora vamos muito mais longe — até **100**! 🚀

## As dezenas (de 10 em 10)

Contar de 10 em 10 é rápido:

> **10, 20, 30, 40, 50, 60, 70, 80, 90, 100** 🔟

Cada salto é uma **dezena** (um grupo de 10).

```keyvalue
[
  { "k": "1 dezena", "v": "10 unidades" },
  { "k": "5 dezenas", "v": "50" },
  { "k": "10 dezenas", "v": "100 — cem!" }
]
```

Salta de **10 em 10** com o sapo — cada salto é uma dezena inteira! 🐸

```numberline
{ "min": 40, "max": 60, "start": 40, "step": 10, "title": "Saltos de 10 em 10" }
```

## Dezenas e unidades

Cada número tem **dezenas** e **unidades**:

> **34** = **3 dezenas** (30) + **4 unidades** (4) → trinta e quatro

```steps
[
  { "title": "Olha o 1.º algarismo", "body": "diz quantas dezenas: no 34 são 3 (=30)" },
  { "title": "Olha o 2.º algarismo", "body": "diz quantas unidades: no 34 são 4" },
  { "title": "Junta tudo", "body": "30 + 4 = 34 🎉" }
]
```

> [!TIP] No número **52**, o **5** vale 50 (dezenas) e o **2** vale 2 (unidades). A posição manda! 📍

## Maior e menor

Para saber qual é maior, olha primeiro para as **dezenas**:

> **47** é maior que **42** (mesma dezena, mas 7 > 2)
>
> **60** é maior que **59** (6 dezenas > 5 dezenas)

## Vamos praticar 🎈

```quiz
{
  "id": "mat2-n100-pratica",
  "questions": [
    { "q": "O que vem depois do 49?", "layout": "grid",
      "options": [ { "t": "50", "correct": true }, { "t": "40" }, { "t": "60" } ],
      "explain": "Depois do 49 vem o 50." },
    { "q": "Quantas dezenas tem o 70?", "layout": "grid",
      "options": [ { "t": "7", "correct": true }, { "t": "0" }, { "t": "17" } ],
      "explain": "70 = 7 dezenas (7 grupos de 10)." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat2-n100-final",
  "final": true,
  "title": "Números até 100",
  "questions": [
    { "q": "Contar de 10 em 10: 10, 20, 30, ...?", "layout": "grid",
      "options": [ { "t": "40", "correct": true }, { "t": "35" }, { "t": "31" } ],
      "explain": "10, 20, 30, 40 — saltos de 10." },
    { "q": "No número 63, o 6 vale...", "layout": "grid",
      "options": [ { "t": "60", "correct": true }, { "t": "6" }, { "t": "600" } ],
      "explain": "O 6 está nas dezenas: vale 60." },
    { "q": "Qual é o maior?", "layout": "grid",
      "options": [ { "t": "81", "correct": true }, { "t": "78" }, { "t": "79" } ],
      "explain": "81 tem 8 dezenas — é o maior." },
    { "q": "25 + 10 = ?", "layout": "grid",
      "options": [ { "t": "35", "correct": true }, { "t": "26" }, { "t": "15" } ],
      "explain": "Somar 10 sobe uma dezena: 25 → 35." }
  ]
}
```
