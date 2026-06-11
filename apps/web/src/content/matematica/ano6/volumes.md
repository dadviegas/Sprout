# Volumes de sólidos 📦

> [!NOTE] **O que vais aprender** 👀 O que é o **volume** (o espaço que um sólido ocupa), a contar **cubos unitários**, a calcular o volume de um **cubo** e de um **paralelepípedo** com a fórmula `comprimento × largura × altura`, e a ligação entre **volume** e **capacidade** (litros!). Vais medir caixas como um engenheiro! 📐🧊

Quanta água cabe num aquário? Quantos cubos de açúcar enchem uma caixa? Quanto espaço ocupa a tua mochila? Tudo isto é **volume** — a quantidade de **espaço a três dimensões** que uma coisa ocupa. Já mediste comprimentos (1D) e áreas (2D); agora dás o salto para o **3D**! Vem encher caixas. 🧊

## O que é o volume? 🧊

O **volume** é o espaço que um sólido ocupa. Medimo-lo em **cubos unitários** — cubinhos de 1 × 1 × 1. Contar quantos cubinhos cabem lá dentro dá-te o volume!

```keyvalue
[
  { "k": "Comprimento (1D)", "v": "uma linha: mede-se em cm 📏" },
  { "k": "Área (2D)", "v": "uma superfície: mede-se em cm² ⬜" },
  { "k": "Volume (3D)", "v": "um espaço cheio: mede-se em cm³ (centímetros cúbicos) 🧊" },
  { "k": "Cubo unitário", "v": "o cubinho de 1×1×1 que usamos para contar 🎲" }
]
```

## Contar cubinhos 🎲

Imagina uma caixa cheia de cubos de açúcar. Vês **3 ao comprido**, **2 de largura** e **2 de altura**. Quantos cubos há ao todo? Multiplicas as três medidas!

```steps
[
  { "title": "Uma camada (o chão)", "body": "3 × 2 = 6 cubos no fundo", "icon": "⬜" },
  { "title": "Quantas camadas?", "body": "a altura é 2 → há 2 camadas", "icon": "📚" },
  { "title": "Total", "body": "6 × 2 = 12 cubos", "icon": "🧮" },
  { "title": "Volume", "body": "= 12 cm³ (doze cubinhos!) 🎲", "icon": "✅" }
]
```

## A fórmula do paralelepípedo 📦

Uma caixa em forma de tijolo chama-se **paralelepípedo** (palavra gigante para uma forma simples!). O volume é **comprimento × largura × altura**.

```math
{ "expr": "V = c × l × a", "say": "o volume é igual ao comprimento vezes a largura vezes a altura" }
```

```steps
[
  { "title": "Caixa de 4 × 3 × 2 cm", "body": "queres o volume", "icon": "📦" },
  { "title": "Multiplica os dois primeiros", "body": "4 × 3 = 12 (a base)", "icon": "⬜" },
  { "title": "Multiplica pela altura", "body": "12 × 2 = 24", "icon": "📚" },
  { "title": "Volume", "body": "V = 24 cm³ 🎉", "icon": "✅" }
]
```

> **Truque:** não importa a **ordem** em que multiplicas! 4 × 3 × 2 dá o mesmo que 2 × 4 × 3 ou 3 × 2 × 4. A caixa é a mesma deitada ou em pé. 🔄

## O cubo: o paralelepípedo certinho 🎲

Um **cubo** é um paralelepípedo especial em que **todas as arestas são iguais**. Então o volume é a **aresta × aresta × aresta** = **aresta ao cubo**! (Agora percebes porque «elevar ao cubo» se chama assim 😉)

```math
{ "expr": "V = aresta³", "say": "o volume do cubo é a aresta elevada ao cubo" }
```

```keyvalue
[
  { "k": "Cubo de aresta 2", "v": "2 × 2 × 2 = 2³ = 8 cm³ 🎲" },
  { "k": "Cubo de aresta 3", "v": "3 × 3 × 3 = 3³ = 27 cm³ 🎲" },
  { "k": "Cubo de aresta 5", "v": "5 × 5 × 5 = 5³ = 125 cm³ 🎲" }
]
```

## Volume e capacidade: o litro entra em cena 💧

Aqui está a ponte mágica: o volume liga-se à **capacidade** (quanto líquido cabe). A regra de ouro: **1 litro = 1000 cm³** (e 1 cm³ = 1 mililitro)! Por isso um cubo de **10 × 10 × 10 cm** leva exatamente **1 litro**. 🥤

```stats
[
  { "label": "1 cm³", "value": "1 mL", "hint": "mililitro" },
  { "label": "1000 cm³", "value": "1 L", "hint": "= 1 litro!" },
  { "label": "Cubo 10×10×10", "value": "1 L", "hint": "= 1000 cm³" },
  { "label": "1 m³", "value": "1000 L", "hint": "muita água!" }
]
```

> [!WARNING] Não confundas as unidades! **Comprimento → cm**, **área → cm²**, **volume → cm³**. O pequenino expoente diz quantas dimensões tem: ¹ uma linha, ² uma superfície, ³ um espaço. Esquecer o ³ no volume é o erro mais comum! 🚫

## O dm³: o irmão gémeo do litro 👯

Entre o cm³ (pequenino) e o m³ (gigante) vive o **decímetro cúbico (dm³)** — um cubo de **1 dm de aresta** (1 dm = 10 cm). E ele tem um segredo: o cubo de 10 × 10 × 10 cm que viste em cima **é exatamente um dm³**! Por isso:

```math
{ "expr": "1 dm³ = 1 L", "say": "um decímetro cúbico é igual a um litro" }
```

```compare
[
  { "title": "Volume 📦", "rows": [
    { "label": "1 cm³", "value": "= 1 mL (uma gota grande)" },
    { "label": "1 dm³", "value": "= 1 L (o pacote de leite!)" },
    { "label": "1 m³", "value": "= 1000 L (mil pacotes)" }
  ] },
  { "title": "Capacidade 💧", "highlight": true, "rows": [
    { "label": "1 mL", "value": "= 1 cm³", "highlight": true },
    { "label": "1 L", "value": "= 1 dm³ = 1000 cm³", "highlight": true },
    { "label": "1000 L", "value": "= 1 m³", "highlight": true }
  ] }
]
```

> Um pacote de leite de **1 litro** ocupa exatamente **1 dm³** — é por isso que os pacotes têm mais ou menos 10 cm de lado! 🥛 Se um aquário tem 24 dm³, leva 24 L: a conversão dm³ ↔ litro é **direta**, sem zeros para cortar.

```quiz
{
  "id": "mat-6-volumes-dm3",
  "questions": [
    { "q": "Uma caixa tem 5 dm³ de volume. Quantos litros de água leva?", "layout": "grid",
      "options": [ { "t": "5 L", "emoji": "🥛", "correct": true }, { "t": "500 L" }, { "t": "0,5 L" } ],
      "explain": "1 dm³ = 1 L — a conversão é direta: 5 dm³ = 5 L." }
  ]
}
```

## Um exemplo passo a passo 🔍

*«Um aquário tem **30 cm de comprimento, 20 cm de largura e 25 cm de altura**. Quantos litros de água leva, cheio até cima?»* 🐠

```steps
[
  { "title": "1. Volume da caixa", "body": "V = 30 × 20 × 25", "icon": "📦" },
  { "title": "2. Multiplica", "body": "30 × 20 = 600; 600 × 25 = 15 000 cm³", "icon": "🧮" },
  { "title": "3. Passa a litros", "body": "÷ 1000 → 15 000 cm³ = 15 L", "icon": "💧" },
  { "title": "4. Resposta", "body": "o aquário leva 15 litros! 🐠🎉", "icon": "✅" }
]
```

> **Truque para litros:** depois de teres o volume em **cm³**, para passar a **litros** é só **dividir por 1000** (cortar 3 zeros). 15 000 cm³ → corta 3 zeros → **15 L**. Fácil! 🪄

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Volumes de sólidos", "items": [
  { "front": "O volume mede-se em…", "back": "cm³", "options": ["cm", "cm²"] },
  { "front": "Volume do paralelepípedo = c × l × …", "back": "altura", "options": ["π", "2"] },
  { "front": "Caixa 4 × 3 × 2", "back": "24 cm³", "options": ["9 cm³", "12 cm³"] },
  { "front": "Cubo de aresta 3", "back": "27 cm³", "options": ["9 cm³", "12 cm³"] },
  { "front": "1 litro = ? cm³", "back": "1000 cm³", "options": ["100 cm³", "10 cm³"] },
  { "front": "Cubo 10×10×10 leva…", "back": "1 litro", "options": ["10 litros", "100 litros"] },
  { "front": "2000 cm³ em litros", "back": "2 L", "options": ["20 L", "0,2 L"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Sabias que figuras com **pontas** (cones, pirâmides) têm volumes mais pequenos do que parece? Um **cone** ou uma **pirâmide** têm exatamente **1/3** do volume do cilindro ou prisma da mesma base e altura! 🍦 Ou seja, são precisos **três** cones cheios de água para encher **um** cilindro do mesmo tamanho — experimenta com um copo e um cone de papel! E os matemáticos têm fórmulas para o volume de **qualquer** sólido, até de uma bola (esfera): V = 4/3 × π × r³. Vais ver tudo isto no 3.º ciclo! ⚽

## Vamos praticar 🎈

```quiz
{
  "id": "mat-6-volumes-pratica",
  "questions": [
    { "q": "O volume mede o…", "layout": "grid",
      "options": [ { "t": "espaço que um sólido ocupa", "emoji": "🧊", "correct": true }, { "t": "comprimento de uma linha" }, { "t": "peso de um objeto" } ],
      "explain": "Volume é o espaço a 3 dimensões." },
    { "q": "Em que unidade se mede o volume?", "layout": "grid",
      "options": [ { "t": "cm³", "emoji": "🎲", "correct": true }, { "t": "cm" }, { "t": "cm²" } ],
      "explain": "Volume é 3D → centímetros cúbicos." },
    { "q": "Volume de uma caixa 5 × 2 × 3 cm?", "layout": "grid",
      "options": [ { "t": "30 cm³", "emoji": "📦", "correct": true }, { "t": "10 cm³" }, { "t": "15 cm³" } ],
      "explain": "5 × 2 × 3 = 30 cm³." },
    { "q": "Volume de um cubo de aresta 4?", "layout": "grid",
      "options": [ { "t": "64 cm³", "emoji": "🎲", "correct": true }, { "t": "12 cm³" }, { "t": "16 cm³" } ],
      "explain": "4 × 4 × 4 = 4³ = 64 cm³." },
    { "q": "1 litro corresponde a…", "layout": "grid",
      "options": [ { "t": "1000 cm³", "emoji": "💧", "correct": true }, { "t": "100 cm³" }, { "t": "10 cm³" } ],
      "explain": "1 L = 1000 cm³ (e 1 cm³ = 1 mL)." },
    { "q": "Uma caixa de 5000 cm³ leva quantos litros?", "layout": "grid",
      "options": [ { "t": "5 L", "emoji": "🥤", "correct": true }, { "t": "50 L" }, { "t": "0,5 L" } ],
      "explain": "Divide por 1000: 5000 ÷ 1000 = 5 L." },
    { "q": "A fórmula do volume do paralelepípedo é…", "layout": "grid",
      "options": [ { "t": "comprimento × largura × altura", "emoji": "📐", "correct": true }, { "t": "comprimento + largura + altura" }, { "t": "lado × lado" } ],
      "explain": "V = c × l × a." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-6-volumes-final",
  "final": true,
  "title": "Volumes de sólidos",
  "questions": [
    { "q": "O volume é uma medida a…", "layout": "grid",
      "options": [ { "t": "três dimensões (3D)", "emoji": "🧊", "correct": true }, { "t": "uma dimensão" }, { "t": "duas dimensões" } ],
      "explain": "Comprimento × largura × altura: 3 dimensões." },
    { "q": "Para contar o volume usamos…", "layout": "grid",
      "options": [ { "t": "cubos unitários (1×1×1)", "emoji": "🎲", "correct": true }, { "t": "quadrados" }, { "t": "réguas" } ],
      "explain": "Quantos cubinhos de 1 cm³ cabem lá dentro." },
    { "q": "Volume de uma caixa 6 × 4 × 2 cm?", "layout": "grid",
      "options": [ { "t": "48 cm³", "emoji": "📦", "correct": true }, { "t": "12 cm³" }, { "t": "24 cm³" } ],
      "explain": "6 × 4 × 2 = 48 cm³." },
    { "q": "Volume de um cubo de aresta 5?", "layout": "grid",
      "options": [ { "t": "125 cm³", "emoji": "🎲", "correct": true }, { "t": "15 cm³" }, { "t": "25 cm³" } ],
      "explain": "5³ = 5 × 5 × 5 = 125 cm³." },
    { "q": "Um cubo de 10 × 10 × 10 cm leva…", "layout": "grid",
      "options": [ { "t": "1 litro", "emoji": "💧", "correct": true }, { "t": "10 litros" }, { "t": "100 litros" } ],
      "explain": "1000 cm³ = exatamente 1 litro." },
    { "q": "Um aquário de 30 × 20 × 25 cm leva quantos litros?", "layout": "grid",
      "options": [ { "t": "15 L", "emoji": "🐠", "correct": true }, { "t": "75 L" }, { "t": "1,5 L" } ],
      "explain": "30×20×25 = 15 000 cm³ = 15 L." },
    { "q": "1 mL é o mesmo que…", "layout": "grid",
      "options": [ { "t": "1 cm³", "emoji": "💧", "correct": true }, { "t": "1 litro" }, { "t": "1 cm" } ],
      "explain": "1 cm³ = 1 mililitro." },
    { "q": "O erro mais comum no volume é…", "layout": "list",
      "options": [ { "t": "esquecer o ³ na unidade (cm³)", "emoji": "🚫", "correct": true }, { "t": "multiplicar de mais" }, { "t": "usar litros" } ],
      "explain": "Volume mede-se em cm³, não em cm nem cm²." }
  ]
}
```
