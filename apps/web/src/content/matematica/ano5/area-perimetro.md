# Perímetros e áreas 🟦

> [!NOTE] **O que vais aprender** 👀 Vais separar bem **perímetro** (a volta) de **área** (o espaço de dentro), usar as **fórmulas** do quadrado, retângulo e triângulo, dominar as **unidades** (cm, m, cm², m²) e resolver problemas reais de cercas, relva e tinta! 🟦🔲

Já conheces área e perímetro do 1.º ciclo. Agora vais usá-los **com fórmulas** e resolver problemas a sério, como um engenheiro a planear um jardim. 🏡 Vais ver que, quando percebes a diferença entre «a volta» e «o que está dentro», tudo encaixa. Anda daí! 🚀

## Perímetro vs. área — a grande diferença 🚦

Imagina um campo no papel. À **volta** pões uma cerca → é o **perímetro**. Por **dentro** pões relva → é a **área**. São medidas **diferentes**, com **unidades diferentes**!

```compare
[
  { "title": "Perímetro 🔲", "rows": [
    { "label": "O que mede", "value": "a volta toda da figura" },
    { "label": "Como", "value": "soma de todos os lados" },
    { "label": "Unidade", "value": "cm, m (comprimento)" },
    { "label": "Imagem", "value": "a cerca à volta do jardim 🌳" }
  ] },
  { "title": "Área 🟦", "highlight": true, "rows": [
    { "label": "O que mede", "value": "o espaço de dentro" },
    { "label": "Como", "value": "depende da forma (há fórmulas!)" },
    { "label": "Unidade", "value": "cm², m² (quadradinhos)" },
    { "label": "Imagem", "value": "a relva lá dentro 🌱" }
  ] }
]
```

Experimenta! Muda o comprimento e a largura e repara como a **área** (os quadradinhos) e o **perímetro** (a volta) mudam — às vezes de maneiras diferentes!

```areagrid
{ "width": 5, "height": 3 }
```

## As fórmulas do perímetro 📏

O perímetro é **sempre** a soma de todos os lados. Em figuras especiais há atalhos, porque há lados iguais:

```keyvalue
[
  { "k": "Quadrado", "v": "lado × 4 (os 4 lados são iguais) 🟧" },
  { "k": "Retângulo", "v": "(comprimento + largura) × 2 ▭" },
  { "k": "Triângulo", "v": "lado + lado + lado 🔺" },
  { "k": "Figura qualquer", "v": "soma sempre TODOS os lados, um a um 🙂" }
]
```

```math
{ "expr": "P do retângulo = (c + l) × 2", "say": "o perímetro do retângulo é igual a comprimento mais largura, vezes dois" }
```

## As fórmulas da área 🟦

A área conta **quadradinhos** de dentro. Cada forma tem a sua fórmula — estas três são as que precisas:

```compare
[
  { "title": "Quadrado e Retângulo", "rows": [
    { "label": "Quadrado", "value": "lado × lado" },
    { "label": "Retângulo", "value": "comprimento × largura" },
    { "label": "Exemplo", "value": "5 × 3 = 15 cm²" }
  ] },
  { "title": "Triângulo 🔺", "highlight": true, "rows": [
    { "label": "Fórmula", "value": "(base × altura) ÷ 2" },
    { "label": "Porquê ÷ 2?", "value": "é metade de um retângulo!" },
    { "label": "Exemplo", "value": "(6 × 4) ÷ 2 = 12 cm²" }
  ] }
]
```

```math
{ "expr": "A do triângulo = (base × altura) // 2", "say": "a área do triângulo é igual a base vezes altura, a dividir por dois" }
```

> [!TIP] Porque é que o triângulo se divide por 2? Porque **dois triângulos iguais** formam um **retângulo**! 🔺🔺 = ▭. Por isso o triângulo tem **metade** da área do retângulo que o «contém». 🤯

## As unidades — nunca trocar! 📐

Esta é a parte que confunde toda a gente, por isso vais aprendê-la bem. O perímetro é um **comprimento** (cm, m). A área conta **quadrados** (cm², m²) — repara no **²**!

```keyvalue
[
  { "k": "Perímetro", "v": "cm, m, km — comprimento (sem o ²) 🔲" },
  { "k": "Área", "v": "cm², m² — quadradinhos (com o ²!) 🟦" },
  { "k": "Truque do ²", "v": "se vês o quadradinho ², é ÁREA, de certeza! 📌" },
  { "k": "Grandes terrenos", "v": "usam-se m² e o hectare (100 m × 100 m) ⚽" }
]
```

> [!WARNING] Duas figuras podem ter o **mesmo perímetro** e **áreas diferentes**! Um retângulo 1 × 5 e um quadrado 3 × 3 têm os dois perímetro **12 cm**, mas o primeiro tem **5 cm²** e o segundo **9 cm²**. 🤯

## Um exemplo passo a passo 🔍

*«A sala da Beatriz é um retângulo de 6 m por 4 m. Ela quer pôr um rodapé à volta (toda a parede de baixo) e tapete a cobrir o chão. Quanto rodapé compra? E quanto tapete?»* Vamos! 🏠

```steps
[
  { "title": "1. Lê e separa", "body": "rodapé = à VOLTA (perímetro); tapete = o CHÃO todo (área) 🧐", "icon": "🔎" },
  { "title": "2. Anota as medidas", "body": "comprimento = 6 m, largura = 4 m 📏", "icon": "📏" },
  { "title": "3. Rodapé (perímetro)", "body": "(6 + 4) × 2 = 10 × 2 = 20 m de rodapé 🔲", "icon": "🔲" },
  { "title": "4. Tapete (área)", "body": "6 × 4 = 24 m² de tapete 🟦", "icon": "🟦" },
  { "title": "5. Resposta", "body": "20 m de rodapé e 24 m² de tapete ✅", "icon": "🎉" }
]
```

> **Truque das letras:** **P**erímetro = **P**ontas e lados que **somas** (em cm). **Á**rea = espaço de dentro que **×** multiplicas (em cm²). Se vês o **²**, é área! 📌

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Fórmulas, áreas e unidades", "items": [
  { "front": "Perímetro do quadrado de lado 5", "back": "20", "options": ["25", "10"] },
  { "front": "Área do retângulo 5 × 3", "back": "15", "options": ["16", "8"] },
  { "front": "Área do triângulo: base 6, altura 4", "back": "12", "options": ["24", "10"] },
  { "front": "A área mede-se em…", "back": "cm²", "options": ["cm", "kg"] },
  { "front": "Perímetro do retângulo 6 × 4", "back": "20", "options": ["24", "10"] },
  { "front": "Área do quadrado de lado 4", "back": "16", "options": ["8", "12"] },
  { "front": "A «cerca à volta» é o…", "back": "perímetro", "options": ["área", "volume"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 A área de um **círculo** mede-se com um número mágico chamado **pi** (π ≈ 3,14): A = π × raio × raio. E o **perímetro** do círculo tem nome próprio — **perímetro da circunferência** (ou comprimento) — e também usa o π! Vais estudá-los a fundo mais à frente, mas já sabes que o π é a estrela dos círculos. 🥧🔵

## Vamos praticar 🎈

```quiz
{
  "id": "mat-5-area-perimetro-pratica",
  "questions": [
    { "q": "O perímetro é…", "layout": "grid",
      "options": [ { "t": "a soma de todos os lados (a volta)", "emoji": "🔲", "correct": true }, { "t": "o espaço de dentro", "feedback": "O espaço de dentro é a ÁREA. O perímetro é a volta toda — a soma dos lados.", "tag": "perimetro-vs-area" }, { "t": "o peso da figura", "feedback": "O peso não entra aqui. O perímetro é a volta toda — a soma dos lados.", "tag": "perimetro-vs-area" } ],
      "explain": "Perímetro = a volta toda; área = o espaço de dentro." },
    { "q": "Perímetro de um quadrado de lado 5 cm?", "layout": "grid",
      "options": [ { "t": "20 cm", "correct": true }, { "t": "10 cm", "feedback": "10 é só 5 + 5 (dois lados). O quadrado tem 4 lados iguais: 5 × 4 = 20 cm.", "tag": "perimetro-calculo" }, { "t": "25 cm", "feedback": "5 × 5 = 25 dá a ÁREA (cm²). O perímetro soma os 4 lados: 5 × 4 = 20 cm.", "tag": "perimetro-vs-area" } ],
      "explain": "5 × 4 = 20 cm (ou 5+5+5+5)." },
    { "q": "Área de um retângulo 5 cm × 3 cm?", "layout": "grid",
      "options": [ { "t": "15 cm²", "emoji": "🟦", "correct": true }, { "t": "16 cm²", "feedback": "16 não sai de 5 × 3. A área do retângulo é comprimento × largura: 5 × 3 = 15 cm².", "tag": "area-calculo" }, { "t": "8 cm²", "feedback": "8 é 5 + 3 (uma soma, estilo perímetro). A área multiplica: 5 × 3 = 15 cm².", "tag": "perimetro-vs-area" } ],
      "explain": "5 × 3 = 15 cm²." },
    { "q": "Área de um triângulo de base 6 cm e altura 4 cm?", "layout": "grid",
      "options": [ { "t": "12 cm²", "emoji": "🔺", "correct": true }, { "t": "24 cm²", "feedback": "24 é 6 × 4, mas faltou dividir por 2. A área do triângulo é (base × altura) ÷ 2 = 12 cm².", "tag": "area-calculo" }, { "t": "10 cm²", "feedback": "10 parece uma soma de lados (perímetro). A área do triângulo é (6 × 4) ÷ 2 = 12 cm².", "tag": "perimetro-vs-area" } ],
      "explain": "(6 × 4) ÷ 2 = 24 ÷ 2 = 12 cm²." },
    { "q": "A área mede-se em…", "layout": "grid",
      "options": [ { "t": "cm² (quadradinhos)", "emoji": "🟦", "correct": true }, { "t": "cm", "feedback": "cm (sem o ²) é comprimento — serve para o perímetro. A área conta quadradinhos: cm².", "tag": "area-unidade" }, { "t": "litros", "feedback": "Litros medem capacidade (líquidos). A área conta quadrados: cm² ou m².", "tag": "area-unidade" } ],
      "explain": "A área conta quadrados: cm² ou m² (com o ²)." },
    { "q": "Como calculas o perímetro de um retângulo?", "layout": "list",
      "options": [ { "t": "(comprimento + largura) × 2", "correct": true }, { "t": "comprimento × largura", "feedback": "Comprimento × largura dá a ÁREA. O perímetro soma os lados: (c + l) × 2.", "tag": "perimetro-vs-area" }, { "t": "lado × lado", "feedback": "Lado × lado é a área do quadrado. O perímetro do retângulo é (c + l) × 2.", "tag": "perimetro-vs-area" } ],
      "explain": "Somas comprimento + largura e multiplicas por 2." },
    { "q": "Porque é que a área do triângulo se divide por 2?", "layout": "list",
      "options": [ { "t": "porque é metade de um retângulo", "emoji": "🤯", "correct": true }, { "t": "porque tem 3 lados", "feedback": "Não é por ter 3 lados. É porque dois triângulos iguais formam um retângulo — logo cada um é metade.", "tag": "area-calculo" }, { "t": "por engano", "feedback": "Não é engano! Dois triângulos iguais formam um retângulo, por isso o triângulo é metade.", "tag": "area-calculo" } ],
      "explain": "Dois triângulos iguais formam um retângulo, logo cada um é metade." },
    { "q": "Duas figuras com o mesmo perímetro têm sempre a mesma área?", "layout": "grid",
      "options": [ { "t": "Não, podem ser diferentes", "emoji": "🤯", "correct": true }, { "t": "Sim, sempre", "feedback": "Não! Um 1×5 e um 3×3 têm o mesmo perímetro (12), mas áreas diferentes (5 cm² e 9 cm²). São medidas independentes.", "tag": "perimetro-vs-area" } ],
      "explain": "1×5 e 3×3 têm perímetro 12, mas áreas 5 cm² e 9 cm²." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-area-perimetro-final",
  "final": true,
  "title": "Perímetros e áreas",
  "questions": [
    { "q": "A 'cerca à volta do jardim' é o…", "layout": "grid",
      "options": [ { "t": "perímetro", "emoji": "🔲", "correct": true }, { "t": "área", "emoji": "🟦", "feedback": "A área é a relva de dentro. A cerca à VOLTA é o perímetro.", "tag": "perimetro-vs-area" } ],
      "explain": "A volta é o perímetro; a relva de dentro é a área." },
    { "q": "Área de um quadrado de lado 4 cm?", "layout": "grid",
      "options": [ { "t": "16 cm²", "correct": true }, { "t": "8 cm²", "feedback": "8 é só 4 + 4 (dois lados). A área do quadrado é lado × lado: 4 × 4 = 16 cm².", "tag": "area-calculo" }, { "t": "12 cm²", "feedback": "12 não sai de 4 × 4. A área do quadrado é lado × lado: 4 × 4 = 16 cm².", "tag": "area-calculo" } ],
      "explain": "4 × 4 = 16 cm²." },
    { "q": "Perímetro de um retângulo de 6 cm × 4 cm?", "layout": "grid",
      "options": [ { "t": "20 cm", "correct": true }, { "t": "24 cm", "feedback": "24 é 6 × 4 — isso é a ÁREA (cm²). O perímetro soma os lados: (6 + 4) × 2 = 20 cm.", "tag": "perimetro-vs-area" }, { "t": "10 cm", "feedback": "10 é só 6 + 4 (dois lados). Faltou multiplicar por 2: (6 + 4) × 2 = 20 cm.", "tag": "perimetro-calculo" } ],
      "explain": "(6 + 4) × 2 = 20 cm." },
    { "q": "Área de um triângulo de base 10 cm e altura 4 cm?", "layout": "grid",
      "options": [ { "t": "20 cm²", "emoji": "🔺", "correct": true }, { "t": "40 cm²", "feedback": "40 é 10 × 4, mas faltou dividir por 2. A área do triângulo é (10 × 4) ÷ 2 = 20 cm².", "tag": "area-calculo" }, { "t": "14 cm²", "feedback": "14 parece uma soma de lados (perímetro). A área do triângulo é (base × altura) ÷ 2 = 20 cm².", "tag": "perimetro-vs-area" } ],
      "explain": "(10 × 4) ÷ 2 = 40 ÷ 2 = 20 cm²." },
    { "q": "Qual é a unidade da ÁREA?", "layout": "grid",
      "options": [ { "t": "m² (metro quadrado)", "emoji": "🟦", "correct": true }, { "t": "m (metro)", "feedback": "O metro (sem ²) mede comprimento — é do perímetro. A área usa o metro quadrado, m².", "tag": "area-unidade" }, { "t": "litro", "feedback": "O litro mede capacidade (líquidos). A área usa unidades quadradas: m², cm².", "tag": "area-unidade" } ],
      "explain": "A área usa unidades quadradas: cm², m² (com o ²)." },
    { "q": "A sala de 6 m × 4 m precisa de quanto tapete (área)?", "layout": "grid",
      "options": [ { "t": "24 m²", "emoji": "🏠", "correct": true }, { "t": "20 m²", "feedback": "20 é o perímetro ((6+4)×2) — daria para o rodapé à volta. O tapete cobre o chão (área): 6 × 4 = 24 m².", "tag": "perimetro-vs-area" }, { "t": "10 m²", "feedback": "10 é só 6 + 4. Para a área multiplicas: 6 × 4 = 24 m².", "tag": "area-calculo" } ],
      "explain": "6 × 4 = 24 m² para cobrir o chão." },
    { "q": "Para medir um campo de futebol enorme, usas…", "layout": "grid",
      "options": [ { "t": "m² (e até hectares)", "emoji": "⚽", "correct": true }, { "t": "cm²", "feedback": "cm² é para coisas pequenas (uma folha). Um campo enorme mede-se em m² e hectares.", "tag": "area-unidade" }, { "t": "mm²", "feedback": "mm² é minúsculo (uma unha). Um campo enorme mede-se em m² e hectares.", "tag": "area-unidade" } ],
      "explain": "Terrenos grandes em m² e hectares (10 000 m²)." },
    { "q": "Se vês a unidade cm², estás a falar de…", "layout": "grid",
      "options": [ { "t": "área", "emoji": "🟦", "correct": true }, { "t": "perímetro", "emoji": "🔲", "feedback": "O perímetro vem em cm (sem ²). O quadradinho ² é sempre área.", "tag": "perimetro-vs-area" } ],
      "explain": "O quadradinho ² é sempre área." },
    { "q": "A área do círculo usa um número mágico chamado…", "layout": "grid",
      "options": [ { "t": "pi (π ≈ 3,14)", "emoji": "🥧", "correct": true }, { "t": "zero", "feedback": "Não é zero! O número mágico dos círculos é o pi (π ≈ 3,14).", "tag": "area-circulo-pi" }, { "t": "mil", "feedback": "Não é mil. O número mágico dos círculos é o pi (π ≈ 3,14).", "tag": "area-circulo-pi" } ],
      "explain": "A = π × raio × raio. O π é a estrela dos círculos!" }
  ]
}
```
