# Áreas do paralelogramo e do triângulo 🔺

> [!NOTE] **O que vais aprender** 👀 Vais descobrir as áreas do **paralelogramo** e do **triângulo** sem decorar nada às cegas: com uma **tesoura imaginária** ✂️, o paralelogramo vira um retângulo (A = b × h) e o triângulo revela-se **metade** de um paralelogramo (A = b × h ÷ 2). E vais aprender a armadilha da **altura**!

Já dominas a área do retângulo. A boa notícia: as figuras novas **não trazem fórmulas novas do nada** — trazem **truques de recorte** que as transformam no retângulo que já conheces. A geometria é uma oficina de recortar e colar! ✂️📐

## Revisão rápida: o retângulo 🟦

A área conta os **quadradinhos de dentro**: base × altura. Mexe nos lados e confirma:

```areagrid
{ "width": 6, "height": 4, "title": "Retângulo: 6 × 4 = 24 quadradinhos" }
```

```math
{ "expr": "A do retângulo = b × h", "say": "a área do retângulo é igual a base vezes altura" }
```

## O paralelogramo: recorta e desliza ✂️

Um **paralelogramo** é um retângulo «empurrado de lado» 🛷. Para descobrir a área, faz a magia da tesoura:

```steps
[
  { "title": "1. Olha para o paralelogramo", "body": "tem a base em baixo e está inclinado para o lado, como um retângulo a escorregar 🛷", "icon": "👀" },
  { "title": "2. Recorta o triângulo da ponta", "body": "corta a direito (na vertical) o bico que sobra de um dos lados ✂️", "icon": "✂️" },
  { "title": "3. Desliza-o para o outro lado", "body": "encaixa o triângulo no buraco do lado oposto — encaixa na perfeição!", "icon": "➡️" },
  { "title": "4. Olha agora!", "body": "ficou um RETÂNGULO com a mesma base e a mesma altura — a área não mudou! 🤯", "icon": "🟦" }
]
```

Nada se perdeu, nada se ganhou — só mudou de sítio. Por isso a fórmula é **a mesma** do retângulo:

```math
{ "expr": "A do paralelogramo = b × h", "say": "a área do paralelogramo é igual a base vezes altura" }
```

> [!WARNING] A armadilha clássica: a **altura NÃO é o lado inclinado**! A altura é a distância **a direito** (perpendicular ⊥) entre a base e o lado de cima — como a altura de uma porta, não a do escorrega. Num problema, usa a medida do tracejado a 90°, não a do lado torto! 📏

## O triângulo: metade de um paralelogramo 🔻

Agora o melhor truque de todos. Pega num triângulo qualquer e **fotocopia-o**; roda a cópia e cola as duas peças lado a lado…

```compare
[
  { "title": "1 triângulo 🔺", "rows": [
    { "label": "Sozinho", "value": "base b, altura h" },
    { "label": "Área", "value": "é o que queremos descobrir 🤔" }
  ] },
  { "title": "2 triângulos iguais 🔺🔻", "highlight": true, "rows": [
    { "label": "Colados", "value": "formam um PARALELOGRAMO de base b e altura h", "highlight": true },
    { "label": "Conclusão", "value": "o triângulo é METADE: b × h ÷ 2", "highlight": true }
  ] }
]
```

```math
{ "expr": "A do triângulo = b × h // 2", "say": "a área do triângulo é igual a base vezes altura, a dividir por dois" }
```

Funciona para **qualquer** triângulo — bicudo, esticado ou retângulo — porque dois iguais formam sempre um paralelogramo!

## Um exemplo passo a passo 🔍

*«Uma vela de barco ⛵ é um triângulo com 6 m de base e 4 m de altura. Que área de pano tem a vela?»*

```steps
[
  { "title": "1. Identifica b e h", "body": "base = 6 m, altura = 4 m (a direitinho, ⊥ à base)", "icon": "📏" },
  { "title": "2. Imagina o paralelogramo", "body": "duas velas iguais coladas teriam 6 × 4 = 24 m²", "icon": "🔺" },
  { "title": "3. Divide por 2", "body": "a vela é metade: 24 ÷ 2 = 12", "icon": "✂️" },
  { "title": "4. Responde com a unidade", "body": "a vela tem 12 m² de pano! ⛵✅", "icon": "🎉" }
]
```

> **Truque:** as três fórmulas são **uma só**! Retângulo e paralelogramo: **b × h**. Triângulo: **b × h ÷ 2** (porque é metade). Se te esqueceres, faz o filme na cabeça: recorta ✂️, desliza ➡️, ou duplica e cola 🔺🔻 — a fórmula reaparece sozinha.

> [!TIP] **Para saberes mais** 🌱 Com uma **régua e um compasso** consegues construir um triângulo perfeito sabendo só os 3 lados! Desenha a base com a régua; abre o compasso com o tamanho do 2.º lado e traça um arco a partir de uma ponta; abre-o com o 3.º lado e traça outro arco da outra ponta — onde os arcos se **cruzam** é o terceiro vértice! ✏️ Mas atenção: os lados têm de «chegar lá» — 3 cm + 4 cm nunca fecham um triângulo com um lado de 10 cm (a chamada **desigualdade triangular**). Experimenta!

## Vamos praticar 🎈

```quiz
{
  "id": "mat-5-areas-pratica",
  "questions": [
    { "q": "Área de um retângulo de base 6 e altura 4?", "layout": "grid", "level": 1,
      "hint": "Conta os quadradinhos: b × h.",
      "options": [ { "t": "24", "correct": true }, { "t": "20", "feedback": "20 não sai de 6 × 4. A área do retângulo é base × altura: 6 × 4 = 24.", "tag": "area-calculo" }, { "t": "10", "feedback": "10 é 6 + 4 (uma soma, estilo perímetro). A área multiplica: 6 × 4 = 24.", "tag": "perimetro-vs-area" } ],
      "explain": "6 × 4 = 24." },
    { "q": "Para achar a área do paralelogramo, recortas o bico e…", "layout": "list", "level": 1,
      "hint": "O triângulo recortado encaixa do outro lado…",
      "options": [ { "t": "deslizas para o outro lado — vira um retângulo", "emoji": "✂️", "correct": true }, { "t": "deitas fora o bico", "feedback": "Se deitasses fora o bico, perdias área! O truque é deslizá-lo para o lado oposto — fica um retângulo igual.", "tag": "area-paralelogramo" }, { "t": "dobras tudo ao meio", "feedback": "Dobrar ao meio é para a simetria, não para a área. Aqui recortas o bico e deslizas — vira um retângulo b × h.", "tag": "area-paralelogramo" } ],
      "explain": "Recorta e desliza: a área não muda e fica um retângulo b × h." },
    { "q": "Área de um paralelogramo com base 8 cm e altura 5 cm?", "layout": "grid", "level": 2,
      "hint": "A fórmula é igual à do retângulo!",
      "options": [ { "t": "40 cm²", "correct": true }, { "t": "13 cm²", "feedback": "13 é 8 + 5 (uma soma). A área multiplica: b × h = 8 × 5 = 40 cm².", "tag": "perimetro-vs-area" }, { "t": "20 cm²", "feedback": "20 seria dividir por 2 (isso é o triângulo). O paralelogramo é b × h inteiro: 8 × 5 = 40 cm².", "tag": "area-paralelogramo" } ],
      "explain": "A = b × h = 8 × 5 = 40 cm²." },
    { "q": "Dois triângulos iguais colados formam…", "layout": "grid", "level": 1,
      "hint": "🔺 + 🔻 = ?",
      "options": [ { "t": "um paralelogramo", "emoji": "🛷", "correct": true }, { "t": "um círculo", "feedback": "O círculo é curvo e não se faz com triângulos direitos. Dois triângulos iguais formam um paralelogramo.", "tag": "area-triangulo-base-altura" }, { "t": "um pentágono", "feedback": "Um pentágono tem 5 lados. Dois triângulos iguais formam um paralelogramo (4 lados).", "tag": "area-triangulo-base-altura" } ],
      "explain": "Por isso o triângulo é METADE: b × h ÷ 2." },
    { "q": "Área de um triângulo de base 10 cm e altura 6 cm?", "layout": "grid", "level": 2,
      "hint": "Faz o paralelogramo inteiro e divide por 2.",
      "options": [ { "t": "30 cm²", "emoji": "🔺", "correct": true }, { "t": "60 cm²", "feedback": "60 é 10 × 6, mas faltou dividir por 2. A área do triângulo é (10 × 6) ÷ 2 = 30 cm².", "tag": "area-triangulo-base-altura" }, { "t": "16 cm²", "feedback": "16 é 10 + 6 (uma soma). A área do triângulo é (10 × 6) ÷ 2 = 30 cm².", "tag": "perimetro-vs-area" } ],
      "explain": "(10 × 6) ÷ 2 = 60 ÷ 2 = 30 cm²." },
    { "q": "Num paralelogramo, a altura é…", "layout": "list", "level": 2,
      "hint": "Cuidado com a armadilha do lado torto!",
      "options": [ { "t": "a distância a direito (⊥) entre a base e o lado de cima", "emoji": "📏", "correct": true }, { "t": "o lado inclinado", "feedback": "Essa é a armadilha! O lado inclinado é maior que a altura. A altura é a distância a direito (⊥) até ao lado de cima.", "tag": "area-altura-vs-lado" }, { "t": "a soma de todos os lados", "feedback": "A soma de todos os lados é o perímetro, não a altura. A altura é a distância a direito (⊥) entre a base e o lado de cima.", "tag": "area-altura-vs-lado" } ],
      "explain": "Altura é sempre perpendicular à base — nunca o lado inclinado." },
    { "q": "Paralelogramo: base 7 cm, lado inclinado 5 cm, altura 4 cm. A área é…", "layout": "grid", "level": 3,
      "hint": "Qual das medidas NÃO entra na fórmula?",
      "options": [ { "t": "28 cm²", "correct": true }, { "t": "35 cm²", "feedback": "35 é 7 × 5, mas usaste o lado inclinado. Na fórmula entra a altura: b × h = 7 × 4 = 28 cm².", "tag": "area-altura-vs-lado" }, { "t": "20 cm²", "feedback": "20 é 5 × 4 — a base errada. A base é 7: A = b × h = 7 × 4 = 28 cm².", "tag": "area-paralelogramo" } ],
      "explain": "A = b × h = 7 × 4 = 28 cm². O lado inclinado (5) era a armadilha!" },
    { "q": "Um triângulo e um paralelogramo têm a mesma base e a mesma altura. O triângulo tem…", "layout": "grid", "level": 3,
      "hint": "Lembra-te de quantos triângulos enchem o paralelogramo.",
      "options": [ { "t": "metade da área", "emoji": "✂️", "correct": true }, { "t": "a mesma área", "feedback": "Não: cabem dois triângulos iguais no paralelogramo, por isso cada um tem metade da área.", "tag": "area-triangulo-base-altura" }, { "t": "o dobro da área", "feedback": "É ao contrário — o paralelogramo é que tem o dobro. O triângulo é metade (entram dois nele).", "tag": "area-triangulo-base-altura" } ],
      "explain": "Dois triângulos iguais enchem o paralelogramo → cada um é metade." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-areas-final",
  "final": true,
  "title": "Áreas do paralelogramo e do triângulo",
  "questions": [
    { "q": "A fórmula da área do paralelogramo é…", "layout": "grid", "level": 1,
      "hint": "Recorta e desliza: vira um retângulo!",
      "options": [ { "t": "b × h", "correct": true }, { "t": "b + h", "feedback": "b + h é uma soma (não dá uma área). A área multiplica os lados: b × h.", "tag": "perimetro-vs-area" }, { "t": "b × h ÷ 2", "feedback": "b × h ÷ 2 é a fórmula do triângulo. O paralelogramo é o retângulo inteiro: b × h.", "tag": "area-paralelogramo" } ],
      "explain": "Igual ao retângulo: base vezes altura." },
    { "q": "A fórmula da área do triângulo é…", "layout": "grid", "level": 1,
      "hint": "É metade de qualquer coisa…",
      "options": [ { "t": "b × h ÷ 2", "emoji": "🔺", "correct": true }, { "t": "b × h", "feedback": "b × h dá o paralelogramo inteiro. O triângulo é metade: b × h ÷ 2.", "tag": "area-triangulo-base-altura" }, { "t": "b + h + b", "feedback": "Somar lados dá o perímetro, não a área. A área do triângulo é b × h ÷ 2.", "tag": "perimetro-vs-area" } ],
      "explain": "Metade do paralelogramo: (b × h) ÷ 2." },
    { "q": "Área de um paralelogramo com base 9 m e altura 4 m?", "layout": "grid", "level": 2,
      "hint": "b × h, sem medo.",
      "options": [ { "t": "36 m²", "correct": true }, { "t": "13 m²", "feedback": "13 é 9 + 4 (uma soma). A área multiplica: b × h = 9 × 4 = 36 m².", "tag": "perimetro-vs-area" }, { "t": "18 m²", "feedback": "18 é dividir por 2 (isso é o triângulo). O paralelogramo é b × h inteiro: 9 × 4 = 36 m².", "tag": "area-paralelogramo" } ],
      "explain": "9 × 4 = 36 m²." },
    { "q": "Área de um triângulo de base 8 cm e altura 5 cm?", "layout": "grid", "level": 2,
      "hint": "Paralelogramo inteiro: 40. E o triângulo?",
      "options": [ { "t": "20 cm²", "correct": true }, { "t": "40 cm²", "feedback": "40 é 8 × 5, mas faltou dividir por 2. A área do triângulo é (8 × 5) ÷ 2 = 20 cm².", "tag": "area-triangulo-base-altura" }, { "t": "13 cm²", "feedback": "13 é 8 + 5 (uma soma). A área do triângulo é (8 × 5) ÷ 2 = 20 cm².", "tag": "perimetro-vs-area" } ],
      "explain": "(8 × 5) ÷ 2 = 20 cm²." },
    { "q": "Porque é que a área do paralelogramo é igual à do retângulo?", "layout": "list", "level": 2,
      "hint": "O filme da tesoura! ✂️",
      "options": [ { "t": "recortando o bico e deslizando-o, fica um retângulo igual", "emoji": "✂️", "correct": true }, { "t": "porque têm o mesmo perímetro", "feedback": "Não é por causa do perímetro (esse pode até ser diferente). É porque recortas o bico e o deslizas: fica um retângulo igual.", "tag": "area-paralelogramo" }, { "t": "é só uma coincidência", "feedback": "Não é coincidência! Recortando o bico e deslizando-o, o paralelogramo vira exatamente um retângulo b × h.", "tag": "area-paralelogramo" } ],
      "explain": "O recorte muda a forma mas não a área — fica um retângulo b × h." },
    { "q": "A altura do paralelogramo mede-se…", "layout": "list", "level": 2,
      "hint": "Pensa na altura de uma porta, não do escorrega.",
      "options": [ { "t": "a direito, perpendicular à base", "emoji": "📏", "correct": true }, { "t": "ao longo do lado inclinado", "feedback": "O lado inclinado é maior que a altura — é a armadilha. A altura mede-se a direito, perpendicular à base.", "tag": "area-altura-vs-lado" }, { "t": "à volta da figura toda", "feedback": "À volta da figura é o perímetro. A altura mede-se a direito (⊥), da base ao lado de cima.", "tag": "area-altura-vs-lado" } ],
      "explain": "Sempre ⊥ à base — o lado inclinado é maior do que a altura." },
    { "q": "Triângulo: base 12 cm, altura 5 cm, lado torto 13 cm. Área?", "layout": "grid", "level": 3,
      "hint": "O 13 está lá só para te enganar…",
      "options": [ { "t": "30 cm²", "correct": true }, { "t": "78 cm²", "feedback": "78 vem de 12 × 13 ÷ 2 — usaste o lado torto, não a altura. A área é (12 × 5) ÷ 2 = 30 cm².", "tag": "area-altura-vs-lado" }, { "t": "60 cm²", "feedback": "60 é 12 × 5, mas faltou dividir por 2. A área do triângulo é (12 × 5) ÷ 2 = 30 cm².", "tag": "area-triangulo-base-altura" } ],
      "explain": "(12 × 5) ÷ 2 = 30 cm² — o lado de 13 cm não entra na fórmula." },
    { "q": "A vela triangular ⛵ tem 6 m de base e 4 m de altura. Área de pano?", "layout": "grid", "level": 2,
      "hint": "Duas velas fariam 24 m²…",
      "options": [ { "t": "12 m²", "emoji": "⛵", "correct": true }, { "t": "24 m²", "feedback": "24 é 6 × 4 — isso seriam DUAS velas (o paralelogramo). Uma vela é metade: (6 × 4) ÷ 2 = 12 m².", "tag": "area-triangulo-base-altura" }, { "t": "10 m²", "feedback": "10 é 6 + 4 (uma soma). A área do triângulo é (6 × 4) ÷ 2 = 12 m².", "tag": "perimetro-vs-area" } ],
      "explain": "(6 × 4) ÷ 2 = 12 m²." },
    { "q": "Com régua e compasso, o 3.º vértice do triângulo aparece onde…", "layout": "list", "level": 3,
      "hint": "Cada arco diz «o vértice está a esta distância de mim».",
      "options": [ { "t": "os dois arcos do compasso se cruzam", "emoji": "✏️", "correct": true }, { "t": "a régua acabar", "feedback": "A régua só traça a base; não marca o vértice. O 3.º vértice está onde os dois arcos do compasso se cruzam.", "tag": "construcao-compasso" }, { "t": "calhar mais bonito", "feedback": "Não é à sorte! Cada arco marca a distância de um lado — o vértice fica onde os dois arcos se cruzam.", "tag": "construcao-compasso" } ],
      "explain": "Os arcos marcam as distâncias dos 2 lados — o cruzamento é o vértice." },
    { "q": "Consegues construir um triângulo com lados 3 cm, 4 cm e 10 cm?", "layout": "grid", "level": 3,
      "hint": "3 + 4 chega para «abraçar» o 10?",
      "options": [ { "t": "não — 3 + 4 < 10, os lados não se encontram", "emoji": "🙅", "correct": true }, { "t": "sim, claro", "feedback": "Não dá: 3 + 4 = 7, que é menor que 10, e os dois lados curtos nem se encontram. Dois lados juntos têm de ser maiores que o terceiro (desigualdade triangular).", "tag": "triangulo-desigualdade" } ],
      "explain": "Dois lados juntos têm de ser maiores que o terceiro (desigualdade triangular)." }
  ]
}
```
