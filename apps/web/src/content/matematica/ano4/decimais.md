# Números decimais 🔢

Às vezes precisamos de números **entre** os inteiros — por exemplo, meio bolo 🍰 ou 1,5 litros de sumo 🧃. Para isso usamos a **vírgula**.

> **1,5** lê-se "um vírgula cinco" e quer dizer **1 inteiro e meio**.

## A vírgula separa duas partes

```keyvalue
[
  { "k": "Parte inteira", "v": "fica à ESQUERDA da vírgula" },
  { "k": "Parte decimal", "v": "fica à DIREITA da vírgula" },
  { "k": "Exemplo: 3,7", "v": "3 inteiros e 7 décimas" }
]
```

- **0,5** = meio = metade de 1 🍰
- **0,25** = um quarto
- **2,5** = dois e meio

## Dinheiro também usa vírgula 💶

**1,50 €** quer dizer 1 euro e 50 cêntimos. A vírgula separa os euros dos cêntimos!

## Vamos praticar 🎈

```quiz
{
  "id": "mat4-dec-pratica",
  "questions": [
    { "q": "Como se lê 2,5?", "layout": "grid",
      "options": [ { "t": "vinte e cinco" }, { "t": "dois vírgula cinco", "correct": true }, { "t": "vinte e cinco mil" } ],
      "explain": "A vírgula lê-se 'vírgula': dois vírgula cinco." },
    { "q": "Quanto é meio (metade de 1) em decimal?", "layout": "grid",
      "options": [ { "t": "0,5", "correct": true }, { "t": "5,0" }, { "t": "1,5" } ],
      "explain": "Metade de 1 é 0,5." }
  ]
}
```

> [!NOTE] Em Portugal usamos **vírgula** (3,7) e não ponto. O ponto é o sistema inglês.

## 🎯 Questionário final

```quiz
{
  "id": "mat4-dec-final",
  "final": true,
  "title": "Números decimais",
  "questions": [
    { "q": "Qual é maior?", "layout": "grid",
      "options": [ { "t": "0,9" }, { "t": "1,2", "correct": true }, { "t": "0,5" } ],
      "explain": "1,2 já passou de 1 inteiro, é o maior." },
    { "q": "1,50 € são...", "layout": "grid",
      "options": [ { "t": "1 euro e 50 cêntimos", "correct": true }, { "t": "150 euros" }, { "t": "15 cêntimos" } ],
      "explain": "A vírgula separa euros de cêntimos." },
    { "q": "O número à direita da vírgula é a parte...", "layout": "grid",
      "options": [ { "t": "inteira" }, { "t": "decimal", "correct": true } ],
      "explain": "À direita fica a parte decimal." },
    { "q": "0,25 é o mesmo que...", "layout": "grid",
      "options": [ { "t": "um quarto", "correct": true }, { "t": "metade" }, { "t": "o dobro" } ],
      "explain": "0,25 é um quarto (1/4)." }
  ]
}
```
