# Área e perímetro 📐

> [!NOTE] **O que vais aprender** 👀 Vais descobrir duas formas de medir uma figura: a **volta** (perímetro) e o **espaço de dentro** (área). E vais ver que uma não é a outra! 🔲🟦

Imagina que tens um campo de futebol no papel. À **volta** pões uma cerca — isso é o **perímetro**. Por **dentro** pões relva — isso é a **área**. São coisas diferentes, e hoje vais aprender a medir as duas como um verdadeiro matemático! ⚽🌱

## Perímetro — a volta toda 🔲

O **perímetro** é a soma do comprimento de **todos os lados** de uma figura. É a distância que percorres se andares à volta dela, sem cortar caminho. Mede-se em unidades de comprimento, como o **centímetro (cm)** ou o **metro (m)**.

> Um quadrado de lado **3 cm**: 3 + 3 + 3 + 3 = **12 cm** de perímetro.

```steps
[
  { "title": "Vê todos os lados", "body": "mede o comprimento de cada lado da figura 📏", "icon": "ruler" },
  { "title": "Soma tudo", "body": "junta o comprimento de todos os lados, um a um" },
  { "title": "É o perímetro!", "body": "a distância à volta da figura, em cm ou m 🔲" }
]
```

## Atalhos para o perímetro ⚡

Em figuras especiais não precisas de somar lado a lado — há contas mais rápidas, porque alguns lados são iguais.

```keyvalue
[
  { "k": "Quadrado", "v": "tem 4 lados iguais → perímetro = lado × 4 🟧" },
  { "k": "Retângulo", "v": "perímetro = (comprimento + largura) × 2 ▭" },
  { "k": "Triângulo", "v": "soma dos 3 lados 🔺" },
  { "k": "Figura qualquer", "v": "soma sempre TODOS os lados, um por um 🙂" }
]
```

## Área — o espaço lá dentro 🟦

A **área** é a medida do **espaço que a figura ocupa** por dentro. Conta-se em **quadradinhos** de 1 cm de lado — cada um é **1 centímetro quadrado (1 cm²)**. Por isso a área mede-se em **cm²** ou **m²**, e não em cm!

> Um retângulo de **4 cm × 3 cm**: 4 × 3 = **12 cm²** de área (cabem lá dentro 12 quadradinhos).

```steps
[
  { "title": "Conta as filas", "body": "vê quantos quadradinhos cabem ao comprido 📐" },
  { "title": "Conta as colunas", "body": "vê quantas filas há de cima a baixo" },
  { "title": "Multiplica", "body": "comprimento × largura = número de quadradinhos 🟦" },
  { "title": "É a área!", "body": "o espaço de dentro, em cm² 🟦" }
]
```

Experimenta! Muda o comprimento e a largura e repara como a **área** (os quadradinhos de dentro) e o **perímetro** (a volta) mudam — às vezes de maneiras diferentes! 🔲🟦

```areagrid
{ "width": 4, "height": 3 }
```

## Perímetro NÃO é área 🚦

Esta é a parte que confunde toda a gente — por isso vais aprendê-la bem! São medidas **diferentes** e até têm **unidades diferentes**.

```compare
[
  { "title": "Perímetro 🔲", "rows": [
    { "label": "O que mede", "value": "a volta toda da figura" },
    { "label": "Como se calcula", "value": "soma de todos os lados" },
    { "label": "Unidade", "value": "cm, m (comprimento)" },
    { "label": "Imagem", "value": "a cerca à volta do jardim 🌳" }
  ] },
  { "title": "Área 🟦", "rows": [
    { "label": "O que mede", "value": "o espaço de dentro", "highlight": true },
    { "label": "Como se calcula", "value": "comprimento × largura", "highlight": true },
    { "label": "Unidade", "value": "cm², m² (quadradinhos)", "highlight": true },
    { "label": "Imagem", "value": "a relva lá dentro 🌱", "highlight": true }
  ] }
]
```

> [!WARNING] Cuidado! Duas figuras podem ter o **mesmo perímetro** e **áreas diferentes**. Um retângulo de 1 × 5 e um quadrado de 3 × 3 têm os dois perímetro **12 cm**, mas o primeiro tem **5 cm²** e o segundo **9 cm²**! 🤯

## Um exemplo passo a passo 🔍

Imagina esta pergunta: *«A horta da escola é um retângulo com 6 m de comprimento e 4 m de largura. Quanto mede a cerca à volta? E quanto espaço tem para plantar?»* Vamos resolver com calma. 🥕

```steps
[
  { "title": "1. Lê com atenção", "body": "a pergunta tem duas partes: a CERCA (perímetro) e o ESPAÇO (área) 🧐" },
  { "title": "2. Anota as medidas", "body": "comprimento = 6 m e largura = 4 m 📏" },
  { "title": "3. Perímetro (a cerca)", "body": "(6 + 4) × 2 = 10 × 2 = 20 m de cerca 🔲" },
  { "title": "4. Área (o espaço)", "body": "6 × 4 = 24 m² para plantar 🟦" },
  { "title": "5. Resposta", "body": "a cerca mede 20 m e há 24 m² de horta ✅" }
]
```

> **Truque:** lembra-te das letras! **P**erímetro = **P**ontas e lados que somas (em **cm**). **Á**rea = espaço lá dentro que **×** multiplicas (em **cm²**). Se vês o **quadradinho ²**, é área! 📌

> [!TIP] **Para saberes mais** 🌱 Para terrenos grandes, como um campo de futebol ou um jardim enorme, ninguém usa cm². Usa-se o **metro quadrado (m²)** e até o **hectare**: 1 hectare = um quadrado de 100 m × 100 m = **10 000 m²**! Um campo de futebol tem mais ou menos meio hectare. ⚽

## Vamos praticar 🎈

```quiz
{
  "id": "mat4-area-pratica",
  "questions": [
    { "q": "Perímetro de um quadrado de lado 5 cm?", "layout": "grid",
      "options": [ { "t": "20 cm", "emoji": "🔲", "correct": true }, { "t": "10 cm", "feedback": "10 são só dois lados (5 + 5). Um quadrado tem 4: 5 × 4 = 20 cm.", "tag": "perimetro-calculo" }, { "t": "25 cm", "feedback": "25 é 5 × 5 (a área). O perímetro soma os 4 lados: 5 × 4 = 20 cm.", "tag": "perimetro-vs-area" } ],
      "explain": "5 + 5 + 5 + 5 = 20 cm (ou 5 × 4)." },
    { "q": "Área de um retângulo 2 cm × 3 cm?", "layout": "grid",
      "options": [ { "t": "6 cm²", "emoji": "🟦", "correct": true }, { "t": "5 cm²", "feedback": "5 é 2 + 3 (a soma dos lados). A área multiplica: 2 × 3 = 6 cm².", "tag": "perimetro-vs-area" }, { "t": "10 cm²", "feedback": "10 é o perímetro (2+3+2+3). A área é 2 × 3 = 6 cm².", "tag": "perimetro-vs-area" } ],
      "explain": "2 × 3 = 6 cm²." },
    { "q": "O perímetro mede-se em…", "layout": "grid",
      "options": [ { "t": "cm (comprimento)", "correct": true }, { "t": "cm² (quadradinhos)", "feedback": "cm² é para a área. O perímetro é uma distância: mede-se em cm.", "tag": "perimetro-unidade" }, { "t": "kg", "feedback": "kg é peso. O perímetro é uma distância: cm ou m.", "tag": "medidas-grandeza-errada" } ],
      "explain": "O perímetro é uma distância: mede-se em cm ou m." },
    { "q": "A área mede-se em…", "layout": "grid",
      "options": [ { "t": "cm² (quadradinhos)", "emoji": "🟦", "correct": true }, { "t": "cm", "feedback": "cm é para o perímetro (distância). A área conta quadradinhos: cm².", "tag": "area-unidade" }, { "t": "litros", "feedback": "Litros medem líquido. A área conta quadradinhos: cm².", "tag": "medidas-grandeza-errada" } ],
      "explain": "A área conta quadradinhos: cm² ou m²." },
    { "q": "Como calculas o perímetro de um retângulo?", "layout": "grid",
      "options": [ { "t": "(comprimento + largura) × 2", "correct": true }, { "t": "comprimento × largura", "feedback": "Isso é a ÁREA. O perímetro é (comprimento + largura) × 2.", "tag": "perimetro-vs-area" }, { "t": "comprimento + largura", "feedback": "Falta o outro par de lados. O perímetro é (comp + larg) × 2.", "tag": "perimetro-calculo" } ],
      "explain": "Somas comprimento e largura e multiplicas por 2 (são 2 de cada)." },
    { "q": "Perímetro de um retângulo de 4 cm por 2 cm?", "layout": "grid",
      "options": [ { "t": "12 cm", "correct": true }, { "t": "8 cm", "feedback": "8 é 4 × 2 (a área). O perímetro: 4 + 2 + 4 + 2 = 12 cm.", "tag": "perimetro-vs-area" }, { "t": "6 cm", "feedback": "6 é só 4 + 2 (um par). Faltam os outros: 4 + 2 + 4 + 2 = 12 cm.", "tag": "perimetro-calculo" } ],
      "explain": "4 + 2 + 4 + 2 = 12 cm." },
    { "q": "Área de um quadrado de lado 3 cm?", "layout": "grid",
      "options": [ { "t": "9 cm²", "emoji": "🟦", "correct": true }, { "t": "12 cm²", "feedback": "12 é o perímetro (3 × 4 lados). A área é 3 × 3 = 9 cm².", "tag": "perimetro-vs-area" }, { "t": "6 cm²", "feedback": "6 é 3 + 3. A área é lado × lado: 3 × 3 = 9 cm².", "tag": "area-calculo" } ],
      "explain": "3 × 3 = 9 cm²." },
    { "q": "A 'cerca à volta do jardim' é o…", "layout": "grid",
      "options": [ { "t": "perímetro", "emoji": "🔲", "correct": true }, { "t": "área", "emoji": "🟦", "feedback": "A área é a relva de dentro. A cerca dá a volta: é o perímetro.", "tag": "perimetro-vs-area" } ],
      "explain": "A volta é o perímetro; a relva de dentro é a área." },
    { "q": "Um triângulo tem lados de 3 cm, 4 cm e 5 cm. Perímetro?", "layout": "grid",
      "options": [ { "t": "12 cm", "emoji": "🔺", "correct": true }, { "t": "60 cm", "feedback": "60 é 3 × 4 × 5 (multiplicar). O perímetro soma: 3 + 4 + 5 = 12 cm.", "tag": "perimetro-calculo" }, { "t": "9 cm", "feedback": "Faltou um lado. Soma os três: 3 + 4 + 5 = 12 cm.", "tag": "perimetro-calculo" } ],
      "explain": "3 + 4 + 5 = 12 cm." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat4-area-final",
  "final": true,
  "title": "Área e perímetro",
  "questions": [
    { "q": "O perímetro é…", "layout": "grid",
      "options": [ { "t": "a soma de todos os lados", "emoji": "🔲", "correct": true }, { "t": "o espaço de dentro", "feedback": "O espaço de dentro é a área. O perímetro é a soma dos lados (a volta).", "tag": "perimetro-vs-area" }, { "t": "o peso da figura", "feedback": "O peso mede-se na balança. O perímetro é a soma dos lados.", "tag": "medidas-grandeza-errada" } ],
      "explain": "Perímetro = soma de todos os lados (a volta)." },
    { "q": "A área mede-se em…", "layout": "grid",
      "options": [ { "t": "cm²", "emoji": "🟦", "correct": true }, { "t": "cm", "feedback": "cm é para o perímetro. A área conta quadradinhos: cm².", "tag": "area-unidade" }, { "t": "kg", "feedback": "kg é peso. A área conta quadradinhos: cm².", "tag": "medidas-grandeza-errada" } ],
      "explain": "A área conta quadradinhos: cm²." },
    { "q": "Área de um quadrado de lado 4 cm?", "layout": "grid",
      "options": [ { "t": "16 cm²", "correct": true }, { "t": "8 cm²", "feedback": "8 é 4 + 4 (dois lados). A área é lado × lado: 4 × 4 = 16 cm².", "tag": "perimetro-vs-area" }, { "t": "12 cm²", "feedback": "A área é lado × lado: 4 × 4 = 16 cm² (não 12).", "tag": "area-calculo" } ],
      "explain": "4 × 4 = 16 cm²." },
    { "q": "Perímetro de um quadrado de lado 6 cm?", "layout": "grid",
      "options": [ { "t": "24 cm", "correct": true }, { "t": "36 cm", "feedback": "36 é 6 × 6 (a área). O perímetro soma os 4 lados: 6 × 4 = 24 cm.", "tag": "perimetro-vs-area" }, { "t": "12 cm", "feedback": "12 são só dois lados (6 + 6). São 4 lados: 6 × 4 = 24 cm.", "tag": "perimetro-calculo" } ],
      "explain": "6 × 4 = 24 cm (ou 6+6+6+6)." },
    { "q": "Área de um retângulo de 5 cm × 3 cm?", "layout": "grid",
      "options": [ { "t": "15 cm²", "emoji": "🟦", "correct": true }, { "t": "16 cm²", "feedback": "16 é o perímetro (5+3+5+3). A área multiplica: 5 × 3 = 15 cm².", "tag": "perimetro-vs-area" }, { "t": "8 cm²", "feedback": "8 é 5 + 3 (a soma). A área multiplica: 5 × 3 = 15 cm².", "tag": "perimetro-vs-area" } ],
      "explain": "5 × 3 = 15 cm²." },
    { "q": "Qual destas é a unidade da ÁREA?", "layout": "grid",
      "options": [ { "t": "m² (metro quadrado)", "correct": true }, { "t": "m (metro)", "feedback": "m mede distância (perímetro). A área usa m², unidade quadrada.", "tag": "area-unidade" }, { "t": "litro", "feedback": "Litros medem líquido. A área usa unidades quadradas: m².", "tag": "medidas-grandeza-errada" } ],
      "explain": "A área usa unidades quadradas: cm², m²." },
    { "q": "Duas figuras com o mesmo perímetro têm sempre a mesma área?", "layout": "grid",
      "options": [ { "t": "Não, podem ter áreas diferentes", "emoji": "🤯", "correct": true }, { "t": "Sim, é sempre igual", "feedback": "Nem sempre: 1×5 e 3×3 têm perímetro 12, mas áreas 5 e 9 cm². São coisas diferentes.", "tag": "perimetro-vs-area" } ],
      "explain": "Mesmo perímetro pode dar áreas diferentes (1×5 e 3×3 têm perímetro 12, mas 5 cm² e 9 cm²)." },
    { "q": "A 'cerca à volta do jardim' é o…", "layout": "grid",
      "options": [ { "t": "perímetro", "emoji": "🔲", "correct": true }, { "t": "área", "emoji": "🟦", "feedback": "A área é a relva de dentro. A cerca dá a volta: é o perímetro.", "tag": "perimetro-vs-area" } ],
      "explain": "A volta é o perímetro; a relva é a área." },
    { "q": "Para medir um campo de futebol enorme, usas…", "layout": "grid",
      "options": [ { "t": "m² (e até hectares)", "emoji": "⚽", "correct": true }, { "t": "cm²", "feedback": "cm² é para coisas pequenas. Um campo grande mede-se em m² (e hectares).", "tag": "medidas-unidade-errada" }, { "t": "mm²", "feedback": "mm² é minúsculo. Um campo grande mede-se em m².", "tag": "medidas-unidade-errada" } ],
      "explain": "Para terrenos grandes usa-se m² e o hectare (10 000 m²)." }
  ]
}
```
