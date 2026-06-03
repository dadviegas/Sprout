# Potências e expressões numéricas ⏫

> [!NOTE] **O que vais aprender** 👀 O que é uma **potência** com qualquer base (não só o 10!), a calcular quadrados e cubos, dois **truques** geniais para multiplicar e dividir potências da **mesma base**, e a ordem certa de fazer as contas numa **expressão numérica** — a famosa regra das **prioridades**! 🧮⚡

No 5.º ano viste as potências de base 10. Agora vais soltar a base: **2³, 5², 3⁴**… qualquer número pode ser base! E vais aprender a domar **expressões** com várias operações de uma só vez, com a regra de ouro que evita confusões: **primeiro o quê?** Vem treinar este superpoder. 🦸

## Potência: base e expoente, de novo 🔢

Uma **potência** é uma multiplicação do **mesmo número** repetido. O **expoente** diz **quantas vezes** se repete a **base**. Agora a base pode ser qualquer número!

```math
{ "expr": "2⁵ = 2 × 2 × 2 × 2 × 2 = 32", "say": "dois elevado a cinco é igual a dois vezes dois vezes dois vezes dois vezes dois, que é trinta e dois" }
```

```keyvalue
[
  { "k": "Base", "v": "o número que se repete — em 2⁵, a base é 2 🔢" },
  { "k": "Expoente", "v": "quantas vezes se repete — em 2⁵, o expoente é 5 ⬆️" },
  { "k": "Quadrado (expoente 2)", "v": "5² = 5 × 5 = 25 (lê-se «cinco ao quadrado») ⬜" },
  { "k": "Cubo (expoente 3)", "v": "2³ = 2 × 2 × 2 = 8 (lê-se «dois ao cubo») 🎲" }
]
```

> [!WARNING] Erro clássico! **2⁵ NÃO é 2 × 5 = 10.** O expoente diz quantas vezes **multiplicas a base por ela própria**: 2⁵ = 2×2×2×2×2 = **32**. E **5² = 25**, não 10! 🚫

## Porque se chama «quadrado» e «cubo»? 📐

Não é por acaso! **5²** é a área de um **quadrado** de lado 5 (5 × 5 quadradinhos). **2³** é o volume de um **cubo** de aresta 2 (2 × 2 × 2 cubinhos). A geometria deu o nome!

```stats
[
  { "label": "2²", "value": "4", "hint": "quadrado 2×2" },
  { "label": "3²", "value": "9", "hint": "quadrado 3×3" },
  { "label": "2³", "value": "8", "hint": "cubo 2×2×2" },
  { "label": "10²", "value": "100", "hint": "o velho amigo" }
]
```

## Truque 1: multiplicar potências da mesma base ✖️

Quando multiplicas potências com a **mesma base**, é só **somar os expoentes**! Faz sentido: estás a juntar os «2 ×» todos.

```math
{ "expr": "2³ × 2² = 2⁵ = 32", "say": "dois ao cubo vezes dois ao quadrado é igual a dois elevado a cinco, que é trinta e dois" }
```

```steps
[
  { "title": "2³ × 2²", "body": "(2×2×2) × (2×2) — conta os 2: são 5 ao todo", "icon": "🔢" },
  { "title": "Soma os expoentes", "body": "3 + 2 = 5 → 2⁵", "icon": "➕" },
  { "title": "Calcula", "body": "2⁵ = 32 ✅", "icon": "✅" }
]
```

## Truque 2: dividir potências da mesma base ➗

Ao **dividir** potências com a **mesma base**, **subtrais os expoentes**! É o contrário de multiplicar.

```math
{ "expr": "3⁵ ÷ 3² = 3³ = 27", "say": "três elevado a cinco a dividir por três ao quadrado é igual a três ao cubo, que é vinte e sete" }
```

> **Truque para não trocar:** **multiplicar → somar**, **dividir → subtrair** os expoentes. ➕ vai com ✖️, ➖ vai com ➗. (E atenção: a **base** mantém-se sempre igual, nunca se mexe nela!) 🧠

## Expressões numéricas: primeiro o quê? 🚦

Quando há **várias operações** numa conta, não se faz da esquerda para a direita à toa! Há uma **ordem de prioridades** — como um semáforo de regras:

```steps
[
  { "title": "1.º — Parênteses ( )", "body": "o que está dentro resolve-se primeiro 🥇", "icon": "🔵" },
  { "title": "2.º — Potências", "body": "depois calculas as potências ⏫", "icon": "🟢" },
  { "title": "3.º — × e ÷", "body": "multiplicações e divisões, da esquerda para a direita ✖️➗", "icon": "🟡" },
  { "title": "4.º — + e −", "body": "por fim, somas e subtrações ➕➖", "icon": "🔴" }
]
```

> **Truque para decorares:** **«Parênteses, Potências, ×÷, +−»** — ou pensa numa frase: «**P**rimeiro **P**arênteses, depois **P**otências, depois **M**ultiplico e **D**ivido, e só no fim **A**diciono e **S**ubtraio.» 🚦

```math
{ "expr": "2 + 3 × 4 = 14", "say": "dois mais três vezes quatro: primeiro três vezes quatro é doze, mais dois é catorze" }
```

> [!WARNING] Atenção! **2 + 3 × 4 NÃO é 20!** A multiplicação vai primeiro: 3 × 4 = 12, e só depois 2 + 12 = **14**. Se fosses da esquerda para a direita davas 20 — erro! 🚫

## Um exemplo passo a passo 🔍

*«Quanto vale 5 + 2 × (3 + 1)² ?»* Calma — segue o semáforo das prioridades, passo a passo. 🚦

```steps
[
  { "title": "1. Parênteses primeiro", "body": "(3 + 1) = 4 🔵", "icon": "🔵" },
  { "title": "2. Potência", "body": "4² = 16 🟢", "icon": "🟢" },
  { "title": "3. Multiplicação", "body": "2 × 16 = 32 🟡", "icon": "🟡" },
  { "title": "4. Soma (por fim)", "body": "5 + 32 = 37 🔴", "icon": "🔴" },
  { "title": "5. Resposta", "body": "= 37 🎉", "icon": "🎉" }
]
```

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Potências e prioridades", "items": [
  { "front": "2³", "back": "8", "options": ["6", "9"] },
  { "front": "5²", "back": "25", "options": ["10", "7"] },
  { "front": "2³ × 2²", "back": "2⁵", "options": ["2⁶", "4⁵"] },
  { "front": "3⁵ ÷ 3²", "back": "3³", "options": ["3⁷", "1³"] },
  { "front": "2 + 3 × 4", "back": "14", "options": ["20", "24"] },
  { "front": "Primeiro de tudo resolves os…", "back": "parênteses", "options": ["+", "×"] },
  { "front": "(2 + 1)²", "back": "9", "options": ["5", "6"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Sabias que o **expoente 0** dá sempre **1**? **7⁰ = 1**, **100⁰ = 1**, qualquer base! 🤯 E há potências com **expoente negativo**, que dão frações: **2⁻¹ = 1/2** e **2⁻² = 1/4**. Os matemáticos inventaram isto para que os truques de somar e subtrair expoentes **funcionassem sempre** — até quando o resultado é mais pequeno que 1. No 3.º ciclo vais usar isto a sério com a **notação científica** e até com **raízes**! 🌌

## Vamos praticar 🎈

```quiz
{
  "id": "mat-6-potencias-pratica",
  "questions": [
    { "q": "Quanto é 2³?", "layout": "grid",
      "options": [ { "t": "8", "emoji": "🎲", "correct": true }, { "t": "6" }, { "t": "9" } ],
      "explain": "2 × 2 × 2 = 8, não 2 × 3." },
    { "q": "Quanto é 5²?", "layout": "grid",
      "options": [ { "t": "25", "emoji": "⬜", "correct": true }, { "t": "10" }, { "t": "7" } ],
      "explain": "5 × 5 = 25 (cinco ao quadrado)." },
    { "q": "Quanto é 2³ × 2²?", "layout": "grid",
      "options": [ { "t": "2⁵ = 32", "emoji": "➕", "correct": true }, { "t": "2⁶ = 64" }, { "t": "4⁵" } ],
      "explain": "Mesma base: somas os expoentes, 3+2=5." },
    { "q": "Quanto é 3⁵ ÷ 3²?", "layout": "grid",
      "options": [ { "t": "3³ = 27", "emoji": "➖", "correct": true }, { "t": "3⁷" }, { "t": "1" } ],
      "explain": "Mesma base, divisão: subtrais os expoentes, 5−2=3." },
    { "q": "Quanto é 2 + 3 × 4?", "layout": "grid",
      "options": [ { "t": "14", "emoji": "🚦", "correct": true }, { "t": "20" }, { "t": "24" } ],
      "explain": "A × vai primeiro: 3×4=12, depois +2 = 14." },
    { "q": "Numa expressão, o que resolves primeiro?", "layout": "grid",
      "options": [ { "t": "os parênteses", "emoji": "🔵", "correct": true }, { "t": "as somas" }, { "t": "da esquerda à direita" } ],
      "explain": "1.º parênteses, 2.º potências, 3.º ×÷, 4.º +−." },
    { "q": "Quanto é (2 + 1)²?", "layout": "grid",
      "options": [ { "t": "9", "emoji": "🔵", "correct": true }, { "t": "5" }, { "t": "6" } ],
      "explain": "Parênteses primeiro: 3, depois 3² = 9." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-6-potencias-final",
  "final": true,
  "title": "Potências e expressões numéricas",
  "questions": [
    { "q": "Em 4³, o número 3 é a…", "layout": "grid",
      "options": [ { "t": "o expoente", "emoji": "⬆️", "correct": true }, { "t": "a base" }, { "t": "o produto" } ],
      "explain": "O 3 (pequenino em cima) é o expoente; o 4 é a base." },
    { "q": "Quanto é 3²?", "layout": "grid",
      "options": [ { "t": "9", "emoji": "⬜", "correct": true }, { "t": "6" }, { "t": "5" } ],
      "explain": "3 × 3 = 9." },
    { "q": "Quanto é 2⁴?", "layout": "grid",
      "options": [ { "t": "16", "emoji": "🔢", "correct": true }, { "t": "8" }, { "t": "6" } ],
      "explain": "2×2×2×2 = 16." },
    { "q": "Quanto é 5³ × 5? (mesma base)", "layout": "grid",
      "options": [ { "t": "5⁴", "emoji": "➕", "correct": true }, { "t": "5³" }, { "t": "25³" } ],
      "explain": "5 é 5¹: somas os expoentes 3+1=4 → 5⁴." },
    { "q": "Quanto é 6⁴ ÷ 6²?", "layout": "grid",
      "options": [ { "t": "6²", "emoji": "➖", "correct": true }, { "t": "6⁶" }, { "t": "1²" } ],
      "explain": "Divisão de mesma base: 4−2=2 → 6²." },
    { "q": "Quanto é 10 − 2 × 3?", "layout": "grid",
      "options": [ { "t": "4", "emoji": "🚦", "correct": true }, { "t": "24" }, { "t": "8" } ],
      "explain": "× primeiro: 2×3=6, depois 10−6 = 4." },
    { "q": "A ordem das prioridades é…", "layout": "list",
      "options": [ { "t": "parênteses → potências → ×÷ → +−", "emoji": "🚦", "correct": true }, { "t": "+− → ×÷ → potências" }, { "t": "sempre da esquerda à direita" } ],
      "explain": "Parênteses, depois potências, depois ×÷, por fim +−." },
    { "q": "Quanto é 1 + 2 × (4 − 1)²?", "layout": "grid",
      "options": [ { "t": "19", "emoji": "🧮", "correct": true }, { "t": "27" }, { "t": "13" } ],
      "explain": "(4−1)=3; 3²=9; 2×9=18; 1+18 = 19." },
    { "q": "Qualquer número elevado a 0 dá…", "layout": "grid",
      "options": [ { "t": "1", "emoji": "🤯", "correct": true }, { "t": "0" }, { "t": "ele próprio" } ],
      "explain": "7⁰ = 1, 100⁰ = 1, sempre 1." }
  ]
}
```
