# Números até 1000 💯

Já contas até 100? Agora vamos ainda mais longe — até **mil**! 🚀 Vais ver que é fácil: é tudo uma questão de juntar grupos.

## Centenas, dezenas e unidades

Um número grande é como uma caixa com três gavetas. Cada gaveta tem o seu lugar:

```keyvalue
[
  { "k": "Unidade (U)", "v": "1 peça solta 🟦" },
  { "k": "Dezena (D)", "v": "10 unidades juntas (10) 🔟" },
  { "k": "Centena (C)", "v": "10 dezenas juntas (100) 💯" }
]
```

No número **345**, cada algarismo está numa gaveta:

> **3** centenas + **4** dezenas + **5** unidades = **345** 🎉

A **posição** do algarismo manda no seu valor!

```compare
[
  { "title": "O 3 no 345", "rows": [ {"label":"gaveta","value":"centenas"}, {"label":"vale","value":"300"} ] },
  { "title": "O 3 no 35", "highlight": true, "badge": "outro lugar", "rows": [ {"label":"gaveta","value":"dezenas"}, {"label":"vale","value":"30"} ] }
]
```

O mesmo algarismo **3** vale 300 ou 30 — depende do lugar! 📍

## Um exemplo passo a passo 🔍

Vamos descobrir tudo sobre o número **627**.

```steps
[
  { "title": "Olha o 1.º algarismo", "body": "É o 6 — está nas centenas. Vale 6 centenas = 600." },
  { "title": "Olha o 2.º algarismo", "body": "É o 2 — está nas dezenas. Vale 2 dezenas = 20." },
  { "title": "Olha o 3.º algarismo", "body": "É o 7 — está nas unidades. Vale 7." },
  { "title": "Junta tudo", "body": "600 + 20 + 7 = 627 → seiscentos e vinte e sete! 🎉" }
]
```

## Truque 🪄

Lê o número da **esquerda para a direita**, gaveta a gaveta:

- O **1.º** algarismo são as **centenas** (quantas vezes 100).
- O **2.º** algarismo são as **dezenas** (quantas vezes 10).
- O **3.º** algarismo são as **unidades** (peças soltas).

Atalho rápido: quantos algarismos tem o número? Se tem **3**, começa nas centenas! Assim, no **508** vês logo: 5 centenas, 0 dezenas, 8 unidades = **500 + 0 + 8**. O zero quer dizer "esta gaveta está vazia" 🙂.

## Resolver um problema 🧩

A Matilde está a guardar cromos. Tem **4 caixas** com 100 cromos cada, **2 saquinhos** com 10 cada e **6 cromos** soltos. Quantos cromos tem ao todo?

```steps
[
  { "title": "Lê e vê os dados", "body": "4 caixas de 100, 2 saquinhos de 10, 6 soltos." },
  { "title": "Escolhe a conta", "body": "Cada caixa é uma centena, cada saquinho é uma dezena, os soltos são unidades." },
  { "title": "Faz a conta", "body": "4 centenas = 400 · 2 dezenas = 20 · 6 unidades = 6 → 400 + 20 + 6." },
  { "title": "Responde e confirma", "body": "A Matilde tem 426 cromos! ✅ Lê-se: quatrocentos e vinte e seis." }
]
```

> [!TIP] **Para saberes mais** 🌱 A seguir ao 1000 continua tudo igual, só com uma gaveta nova: o **milhar**! 1 milhar = 10 centenas = 1000. Assim, 1245 é 1 milhar + 2 centenas + 4 dezenas + 5 unidades. 🚀

## Vamos praticar 🎈

```quiz
{
  "id": "mat-3-numeros-1000-pratica",
  "questions": [
    { "q": "No número 482, o 4 vale...", "layout": "grid",
      "options": [ { "t": "400", "correct": true }, { "t": "40" }, { "t": "4" } ],
      "explain": "O 4 está nas centenas: vale 400." },
    { "q": "Quantas unidades tem 1 centena?", "layout": "grid",
      "options": [ { "t": "10" }, { "t": "100", "correct": true }, { "t": "1000" } ],
      "explain": "1 centena = 100 unidades." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-3-numeros-1000-final",
  "final": true,
  "title": "Números até 1000",
  "questions": [
    { "q": "345 é igual a...", "layout": "grid",
      "options": [ { "t": "3 centenas + 4 dezenas + 5 unidades", "correct": true }, { "t": "3 dezenas + 4 unidades + 5 centenas" }, { "t": "5 centenas + 4 dezenas + 3 unidades" } ],
      "explain": "345 = 300 + 40 + 5 = 3 centenas + 4 dezenas + 5 unidades." },
    { "q": "No número 706, o 0 está nas...", "layout": "grid",
      "options": [ { "t": "dezenas (gaveta vazia)", "correct": true }, { "t": "centenas" }, { "t": "unidades" } ],
      "explain": "706 = 7 centenas + 0 dezenas + 6 unidades. A gaveta das dezenas está vazia." },
    { "q": "Quanto vale 5 centenas + 2 dezenas + 9 unidades?", "layout": "grid",
      "options": [ { "t": "529", "correct": true }, { "t": "259" }, { "t": "592" } ],
      "explain": "500 + 20 + 9 = 529." },
    { "q": "Quantas centenas há em 1000?", "layout": "grid",
      "options": [ { "t": "10", "correct": true }, { "t": "100" }, { "t": "1" } ],
      "explain": "1000 = 10 centenas (10 grupos de 100)." }
  ]
}
```
