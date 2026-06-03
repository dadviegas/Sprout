# Fórmulas de área e perímetro 📐

> [!NOTE] **O que vais aprender** 👀
> A **fórmula** é uma receita curta para calcular sem contar tudo à mão! 🍳
> Aqui ficam as fórmulas do **perímetro** (a volta da figura) e da **área** (o
> espaço lá dentro) do **quadrado**, do **retângulo**, do **triângulo** e até do
> **círculo**. Toca no altifalante para ouvires cada uma! 🎧

## Perímetro 🚶 — a volta toda

O **perímetro** é o caminho à volta da figura, como se desses uma volta a pé pela
margem. Somas todos os lados! 👣

```keyvalue
[
  { "k": "Perímetro", "v": "a soma de todos os lados — a volta completa da figura 🚶" },
  { "k": "Truque", "v": "imagina uma formiga a andar pela beira: a distância que ela percorre é o perímetro 🐜" },
  { "k": "Unidade", "v": "mede-se em comprimento: cm, m, km… (é uma só linha)" }
]
```

### As fórmulas do perímetro 📏

```math
{ "expr": "P quadrado = lado × 4", "say": "o perímetro do quadrado é o lado vezes quatro" }
```

```math
{ "expr": "P retângulo = (comprimento + largura) × 2", "say": "o perímetro do retângulo é comprimento mais largura, vezes dois" }
```

```math
{ "expr": "P triângulo = lado + lado + lado", "say": "o perímetro do triângulo é a soma dos três lados" }
```

```math
{ "expr": "P círculo = 2 × π × raio", "say": "o perímetro do círculo, a circunferência, é dois vezes pi vezes o raio" }
```

> [!TIP] O **π** (lê-se *pi*) é um número muito especial que vale **≈ 3,14**.
> Aparece sempre que há círculos! 🔵

## Área 🟩 — o espaço lá dentro

A **área** é o espaço que a figura ocupa por dentro, como o número de azulejos
que cabem no chão de uma sala. Conta-se em **quadradinhos**! 🧱

Brinca com este retângulo: muda os lados com − e + e vê a área (os quadrados
cheios) e o perímetro (a linha grossa à volta) a mudarem! 👇

```areagrid
{ "title": "Área vs. perímetro", "width": 5, "height": 3, "unit": "cm", "interactive": true }
```

### As fórmulas da área 🟦

```math
{ "expr": "A quadrado = lado × lado", "say": "a área do quadrado é o lado vezes o lado" }
```

```math
{ "expr": "A retângulo = comprimento × largura", "say": "a área do retângulo é comprimento vezes largura" }
```

```math
{ "expr": "A triângulo = (base × altura) / 2", "say": "a área do triângulo é base vezes altura, a dividir por dois" }
```

```math
{ "expr": "A círculo = π × raio × raio", "say": "a área do círculo é pi vezes o raio vezes o raio" }
```

> [!TIP] Repara: a **área** mede-se em **quadradinhos** (cm², m²) porque é uma
> superfície; o **perímetro** mede-se em **linha** (cm, m) porque é só a volta. ✨

## Perímetro ou área? 🤔

```compare
[
  { "title": "Perímetro 🚶", "rows": [
    { "label": "O que é", "value": "a volta toda da figura" },
    { "label": "Pensa em", "value": "a vedação à volta de um jardim 🌳" },
    { "label": "Unidade", "value": "cm, m, km (comprimento)" }
  ] },
  { "title": "Área 🟩", "rows": [
    { "label": "O que é", "value": "o espaço lá dentro" },
    { "label": "Pensa em", "value": "a relva que cobre o jardim 🟩", "highlight": true },
    { "label": "Unidade", "value": "cm², m² (quadradinhos)" }
  ] }
]
```

## Passo a passo: um retângulo 🧮

Imagina um retângulo com **comprimento = 6 cm** e **largura = 4 cm**. Vamos
descobrir a sua volta e o seu espaço! 🔎

```steps
[
  { "title": "1. Olha os lados", "body": "comprimento 6 cm e largura 4 cm — um retângulo deitado 📏", "icon": "📏" },
  { "title": "2. Perímetro", "body": "(6 + 4) × 2 = 10 × 2 = 20 cm — a volta toda 🚶", "icon": "🚶" },
  { "title": "3. Área", "body": "6 × 4 = 24 cm² — os quadradinhos lá dentro 🟦", "icon": "🟦" },
  { "title": "4. Já está!", "body": "volta = 20 cm, espaço = 24 cm². Duas perguntas, duas fórmulas 🎉", "icon": "🎉" }
]
```

```math
{ "expr": "P = (6 + 4) × 2 = 20 cm", "say": "perímetro igual a seis mais quatro, vezes dois, igual a vinte centímetros" }
```

```math
{ "expr": "A = 6 × 4 = 24 cm²", "say": "área igual a seis vezes quatro, igual a vinte e quatro centímetros quadrados" }
```

## Treina as fórmulas! 🎯

Vê a figura e tenta lembrar-te da fórmula. Depois vira o cartão para confirmar! 🃏

```drill
{ "mode": "flip", "title": "Qual é a fórmula?", "items": [
  { "front": "Perímetro do quadrado", "back": "lado × 4" },
  { "front": "Perímetro do retângulo", "back": "(comprimento + largura) × 2" },
  { "front": "Perímetro do triângulo", "back": "soma dos 3 lados" },
  { "front": "Circunferência (volta do círculo)", "back": "2 × π × raio" },
  { "front": "Área do quadrado", "back": "lado × lado" },
  { "front": "Área do retângulo", "back": "comprimento × largura" },
  { "front": "Área do triângulo", "back": "(base × altura) ÷ 2" },
  { "front": "Área do círculo", "back": "π × raio × raio" }
] }
```

Agora escolhe a resposta certa! Estás a calcular a **volta** ou o **espaço**? 👇

```drill
{ "mode": "choose", "title": "Perímetro ou área?", "choices": 2, "items": [
  { "front": "A relva que cobre um campo é…", "back": "área", "options": ["perímetro"] },
  { "front": "A vedação à volta do quintal é…", "back": "perímetro", "options": ["área"] },
  { "front": "Mede-se em cm² (quadradinhos)…", "back": "área", "options": ["perímetro"] },
  { "front": "Mede-se em cm (uma linha)…", "back": "perímetro", "options": ["área"] }
] }
```

E agora as contas! Lembra-te das fórmulas e escolhe o resultado certo. 🧠

```drill
{ "mode": "choose", "title": "Faz as contas", "choices": 3, "items": [
  { "front": "Quadrado de lado 5 cm — perímetro?", "back": "20 cm", "options": ["10 cm", "25 cm"] },
  { "front": "Quadrado de lado 5 cm — área?", "back": "25 cm²", "options": ["20 cm²", "10 cm²"] },
  { "front": "Retângulo 8 × 3 cm — área?", "back": "24 cm²", "options": ["22 cm²", "11 cm²"] },
  { "front": "Retângulo 8 × 3 cm — perímetro?", "back": "22 cm", "options": ["24 cm", "11 cm"] },
  { "front": "Triângulo: base 6, altura 4 — área?", "back": "12 cm²", "options": ["24 cm²", "10 cm²"] }
] }
```

> [!TIP] **Para saberes mais** 🌱
> Sabias que o **quadrado é o retângulo mais "justinho"**? Como tem os 4 lados
> iguais, a fórmula do retângulo (comprimento × largura) também funciona nele —
> só que comprimento e largura são o mesmo número, e por isso fica **lado ×
> lado**! E o **π** é tão curioso que os seus algarismos nunca acabam nem se
> repetem: 3,14159265… os matemáticos já calcularam **biliões** de casas! 🔢🤯
