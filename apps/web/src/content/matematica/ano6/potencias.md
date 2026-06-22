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
      "options": [ { "t": "8", "emoji": "🎲", "correct": true }, { "t": "6", "feedback": "6 é 2 × 3 — esse é o erro clássico! O expoente diz quantas vezes se multiplica: 2 × 2 × 2 = 8.", "tag": "potencia-vs-multiplicacao" }, { "t": "9", "feedback": "9 é 3 × 3. Aqui a base é 2, repetida 3 vezes: 2 × 2 × 2 = 8.", "tag": "potencia-calculo" } ],
      "explain": "2 × 2 × 2 = 8, não 2 × 3." },
    { "q": "Quanto é 5²?", "layout": "grid",
      "options": [ { "t": "25", "emoji": "⬜", "correct": true }, { "t": "10", "feedback": "10 é 5 × 2 — o erro clássico! 5² é 5 multiplicado por ele próprio: 5 × 5 = 25.", "tag": "potencia-vs-multiplicacao" }, { "t": "7", "feedback": "7 é 5 + 2 (uma soma). 5² é 5 × 5 = 25.", "tag": "potencia-vs-multiplicacao" } ],
      "explain": "5 × 5 = 25 (cinco ao quadrado)." },
    { "q": "Quanto é 2³ × 2²?", "layout": "grid",
      "options": [ { "t": "2⁵ = 32", "emoji": "➕", "correct": true }, { "t": "2⁶ = 64", "feedback": "2⁶ multiplicaria os expoentes (3 × 2). Para a mesma base, somam-se: 3 + 2 = 5 → 2⁵ = 32.", "tag": "potencia-calculo" }, { "t": "4⁵", "feedback": "A base não se mexe nunca — fica 2, não 4. Somam-se os expoentes: 2³ × 2² = 2⁵.", "tag": "potencia-base-expoente" } ],
      "explain": "Mesma base: somas os expoentes, 3+2=5." },
    { "q": "Quanto é 3⁵ ÷ 3²?", "layout": "grid",
      "options": [ { "t": "3³ = 27", "emoji": "➖", "correct": true }, { "t": "3⁷", "feedback": "3⁷ soma os expoentes — isso é para a multiplicação. Na divisão subtraem-se: 5 − 2 = 3 → 3³ = 27.", "tag": "potencia-calculo" }, { "t": "1", "feedback": "Os expoentes não se anulam. Na divisão subtraem-se: 5 − 2 = 3 → 3³ = 27.", "tag": "potencia-calculo" } ],
      "explain": "Mesma base, divisão: subtrais os expoentes, 5−2=3." },
    { "q": "Quanto é 2 + 3 × 4?", "layout": "grid",
      "options": [ { "t": "14", "emoji": "🚦", "correct": true }, { "t": "20", "feedback": "20 vem de fazer 2 + 3 = 5 primeiro (da esquerda à direita). A × vai antes: 3 × 4 = 12, depois 2 + 12 = 14.", "tag": "ordem-operacoes" }, { "t": "24", "feedback": "24 é (2 + 3) × 4 — mas não há parênteses. A × vai primeiro: 3 × 4 = 12, depois + 2 = 14.", "tag": "ordem-operacoes" } ],
      "explain": "A × vai primeiro: 3×4=12, depois +2 = 14." },
    { "q": "Numa expressão, o que resolves primeiro?", "layout": "grid",
      "options": [ { "t": "os parênteses", "emoji": "🔵", "correct": true }, { "t": "as somas", "feedback": "As somas vão por ÚLTIMO. A ordem é: parênteses, potências, ×÷, e só no fim +−.", "tag": "ordem-operacoes" }, { "t": "da esquerda à direita", "feedback": "Não é à toa da esquerda à direita. Primeiro os parênteses, depois potências, ×÷ e por fim +−.", "tag": "ordem-operacoes" } ],
      "explain": "1.º parênteses, 2.º potências, 3.º ×÷, 4.º +−." },
    { "q": "Quanto é (2 + 1)²?", "layout": "grid",
      "options": [ { "t": "9", "emoji": "🔵", "correct": true }, { "t": "5", "feedback": "5 é 2 + 1 × 2 (como se o expoente multiplicasse). Resolve os parênteses primeiro: 3, depois 3² = 9.", "tag": "ordem-operacoes" }, { "t": "6", "feedback": "6 é 3 × 2 (o expoente não é multiplicar por 2). Parênteses primeiro: 3, depois 3² = 3 × 3 = 9.", "tag": "potencia-vs-multiplicacao" } ],
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
      "options": [ { "t": "o expoente", "emoji": "⬆️", "correct": true }, { "t": "a base", "feedback": "A base é o 4 (o número que se repete). O 3 (pequenino em cima) diz quantas vezes — é o expoente.", "tag": "potencia-base-expoente" }, { "t": "o produto", "feedback": "O produto é o resultado (4 × 4 × 4 = 64). O 3 em cima é o expoente.", "tag": "potencia-base-expoente" } ],
      "explain": "O 3 (pequenino em cima) é o expoente; o 4 é a base." },
    { "q": "Quanto é 3²?", "layout": "grid",
      "options": [ { "t": "9", "emoji": "⬜", "correct": true }, { "t": "6", "feedback": "6 é 3 × 2 — o erro clássico! 3² é 3 multiplicado por ele próprio: 3 × 3 = 9.", "tag": "potencia-vs-multiplicacao" }, { "t": "5", "feedback": "5 é 3 + 2 (uma soma). 3² é 3 × 3 = 9.", "tag": "potencia-vs-multiplicacao" } ],
      "explain": "3 × 3 = 9." },
    { "q": "Quanto é 2⁴?", "layout": "grid",
      "options": [ { "t": "16", "emoji": "🔢", "correct": true }, { "t": "8", "feedback": "8 é 2 × 4 (multiplicaste a base pelo expoente). 2⁴ repete o 2 quatro vezes: 2 × 2 × 2 × 2 = 16.", "tag": "potencia-vs-multiplicacao" }, { "t": "6", "feedback": "6 é 2 + 4 (uma soma). 2⁴ é 2 × 2 × 2 × 2 = 16.", "tag": "potencia-vs-multiplicacao" } ],
      "explain": "2×2×2×2 = 16." },
    { "q": "Quanto é 5³ × 5? (mesma base)", "layout": "grid",
      "options": [ { "t": "5⁴", "emoji": "➕", "correct": true }, { "t": "5³", "feedback": "O 5 sozinho é 5¹ e conta! Somam-se os expoentes: 3 + 1 = 4 → 5⁴.", "tag": "potencia-calculo" }, { "t": "25³", "feedback": "A base não se multiplica (não vira 25). Mantém-se 5 e somam-se os expoentes: 3 + 1 = 4 → 5⁴.", "tag": "potencia-base-expoente" } ],
      "explain": "5 é 5¹: somas os expoentes 3+1=4 → 5⁴." },
    { "q": "Quanto é 6⁴ ÷ 6²?", "layout": "grid",
      "options": [ { "t": "6²", "emoji": "➖", "correct": true }, { "t": "6⁶", "feedback": "6⁶ soma os expoentes — isso é para a multiplicação. Na divisão subtraem-se: 4 − 2 = 2 → 6².", "tag": "potencia-calculo" }, { "t": "1²", "feedback": "A base mantém-se 6, não vira 1. Na divisão subtraem-se os expoentes: 4 − 2 = 2 → 6².", "tag": "potencia-base-expoente" } ],
      "explain": "Divisão de mesma base: 4−2=2 → 6²." },
    { "q": "Quanto é 10 − 2 × 3?", "layout": "grid",
      "options": [ { "t": "4", "emoji": "🚦", "correct": true }, { "t": "24", "feedback": "24 vem de fazer 10 − 2 = 8 primeiro. A × vai antes: 2 × 3 = 6, depois 10 − 6 = 4.", "tag": "ordem-operacoes" }, { "t": "8", "feedback": "8 fez 10 − 2 da esquerda à direita. A × vai primeiro: 2 × 3 = 6, depois 10 − 6 = 4.", "tag": "ordem-operacoes" } ],
      "explain": "× primeiro: 2×3=6, depois 10−6 = 4." },
    { "q": "A ordem das prioridades é…", "layout": "list",
      "options": [ { "t": "parênteses → potências → ×÷ → +−", "emoji": "🚦", "correct": true }, { "t": "+− → ×÷ → potências", "feedback": "Está ao contrário! Começa-se pelos parênteses e potências; +− ficam para o fim.", "tag": "ordem-operacoes" }, { "t": "sempre da esquerda à direita", "feedback": "Não é à toa da esquerda à direita. A ordem é: parênteses, potências, ×÷ e por fim +−.", "tag": "ordem-operacoes" } ],
      "explain": "Parênteses, depois potências, depois ×÷, por fim +−." },
    { "q": "Quanto é 1 + 2 × (4 − 1)²?", "layout": "grid",
      "options": [ { "t": "19", "emoji": "🧮", "correct": true }, { "t": "27", "feedback": "27 fez tudo seguido (1+2=3; 3×3=9; 9²?). Pela ordem: (4−1)=3; 3²=9; 2×9=18; 1+18 = 19.", "tag": "ordem-operacoes" }, { "t": "13", "feedback": "Falhou a potência. Pela ordem: (4−1)=3; 3²=9; 2×9=18; 1+18 = 19.", "tag": "ordem-operacoes" } ],
      "explain": "(4−1)=3; 3²=9; 2×9=18; 1+18 = 19." },
    { "q": "Qualquer número elevado a 0 dá…", "layout": "grid",
      "options": [ { "t": "1", "emoji": "🤯", "correct": true }, { "t": "0", "feedback": "Não dá 0! Qualquer base elevada a 0 dá sempre 1: 7⁰ = 1, 100⁰ = 1.", "tag": "potencia-calculo" }, { "t": "ele próprio", "feedback": "O próprio número é a base elevada a 1 (expoente 1). A 0, dá sempre 1.", "tag": "potencia-calculo" } ],
      "explain": "7⁰ = 1, 100⁰ = 1, sempre 1." }
  ]
}
```
