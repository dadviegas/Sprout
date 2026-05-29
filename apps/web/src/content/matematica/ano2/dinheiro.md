# O dinheiro (euros) 💶

Em Portugal usamos o **euro** (€). Há **moedas** e **notas**. Vamos contar! 🪙

## As moedas e as notas

```keyvalue
[
  { "k": "Cêntimos", "v": "1c, 2c, 5c, 10c, 20c, 50c 🪙" },
  { "k": "Moedas de euro", "v": "1€ e 2€ 🪙" },
  { "k": "Notas", "v": "5€, 10€, 20€, 50€... 💶" }
]
```

> **100 cêntimos = 1 euro.** Como 100 unidades fazem... 1€! 💡

## Faz o teu mealheiro 🐷

Toca nas moedas para as juntar e chegar ao objetivo:

```money
{ "title": "Junta 1 euro", "items": [0.5, 0.2, 0.2, 0.1], "target": 1 }
```

Experimenta também este:

```money
{ "title": "Junta 80 cêntimos", "items": [0.5, 0.2, 0.1, 0.05, 0.05], "target": 0.8 }
```

> [!TIP] Para pagar mais depressa, começa pelas moedas **maiores** (50c, 20c) e só depois as pequenas. 🪙

## Quanto custa? 🛒

> Um gelado custa **1€**. Tens uma moeda de **2€**. O troco é **1€**! 🍦

## Vamos praticar 🎈

```quiz
{
  "id": "mat2-dinheiro-pratica",
  "questions": [
    { "q": "Quantos cêntimos são 1 euro?", "layout": "grid",
      "options": [ { "t": "100", "emoji": "💯", "correct": true }, { "t": "10" }, { "t": "50" } ],
      "explain": "1 euro = 100 cêntimos." },
    { "q": "50c + 50c = ?", "layout": "grid",
      "options": [ { "t": "1€", "emoji": "🪙", "correct": true }, { "t": "5€" }, { "t": "10c" } ],
      "explain": "50 + 50 = 100 cêntimos = 1€." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat2-dinheiro-final",
  "final": true,
  "title": "O dinheiro (euros)",
  "questions": [
    { "q": "Que dinheiro usamos em Portugal?", "layout": "grid",
      "options": [ { "t": "euro", "emoji": "💶", "correct": true }, { "t": "dólar", "emoji": "💵" } ],
      "explain": "Em Portugal usamos o euro (€)." },
    { "q": "20c + 20c + 10c = ?", "layout": "grid",
      "options": [ { "t": "50c", "correct": true }, { "t": "40c" }, { "t": "1€" } ],
      "explain": "20 + 20 + 10 = 50 cêntimos." },
    { "q": "Tens 2€ e gastas 1€. Fica...", "layout": "grid",
      "options": [ { "t": "1€", "correct": true }, { "t": "3€" }, { "t": "0€" } ],
      "explain": "2 − 1 = 1€ de troco." },
    { "q": "O que vale mais?", "layout": "grid",
      "options": [ { "t": "uma nota de 5€", "emoji": "💶", "correct": true }, { "t": "uma moeda de 2€", "emoji": "🪙" } ],
      "explain": "5€ é mais do que 2€." }
  ]
}
```
