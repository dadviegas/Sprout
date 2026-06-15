# À volta das figuras: o perímetro 🧵

> [!NOTE] **O que vais aprender** 👀 Vais descobrir o **perímetro** — a medida de **dar a volta toda** a uma figura! Com um **cordel**, uma régua e os **centímetros (cm)** e **metros (m)**, vais medir voltas como um verdadeiro explorador. 🐜

Imagina uma **formiga** a passear à volta do teu caderno: parte de um canto, percorre os quatro lados e volta ao início. 🐜 A distância toda que ela andou tem um nome: **perímetro**! Hoje vais aprender a medi-lo — e nunca mais vais olhar para uma figura sem ver a volta. 😄

## Dar a volta toda 🐜

O **perímetro** é o comprimento da **volta completa** a uma figura — todos os lados, sem saltar nenhum e sem cortar caminho. Para o calcular, **somas os lados todos, um a um**.

> Um retângulo com lados **4, 2, 4 e 2**: o perímetro é 4 + 2 + 4 + 2 = **12**. A formiga andou 12 passos! 🐜

```steps
[
  { "title": "1. Escolhe um canto", "body": "é onde a volta começa e acaba 📍", "icon": "📍" },
  { "title": "2. Anda lado a lado", "body": "segue a borda com o dedo, sem saltar nenhum lado 👉", "icon": "👉" },
  { "title": "3. Soma os lados", "body": "junta o comprimento de todos os lados", "icon": "➕" },
  { "title": "4. É o perímetro!", "body": "a distância da volta toda 🎉", "icon": "🎉" }
]
```

## Medir em centímetros e metros 📏

Para o perímetro ter sentido, é preciso **medir** os lados. Usamos duas unidades amigas:

```keyvalue
[
  { "k": "Centímetro (cm)", "v": "para coisas pequenas: um lápis, o caderno, uma bolacha 📏" },
  { "k": "Metro (m)", "v": "para coisas grandes: a sala, o jardim, o campo de jogos 📐" },
  { "k": "Lembra-te", "v": "1 metro = 100 centímetros — cem dedinhos de régua! 💯" },
  { "k": "Qual escolher?", "v": "cabe na mão → cm; é maior que tu → m 🙂" }
]
```

## O truque do cordel 🧵

E se a figura for difícil de medir com a régua? Usa um **cordel**! Pões o cordel **à volta da figura**, a acompanhar a borda toda. Depois **esticas o cordel** e medes o comprimento dele com a régua — esse comprimento **é o perímetro**! Funciona até com figuras com muitos lados. 🤹

Experimenta aqui em baixo: olha para a **linha grossa à volta** do retângulo — isso é o perímetro! (Os quadradinhos de dentro são o **espaço de dentro**, a que se chama **área** — vais estudá-la a fundo no 4.º ano.) Muda os lados com os botões − e + e vê a volta a crescer:

```areagrid
{ "width": 5, "height": 3, "title": "A linha grossa à volta é o perímetro" }
```

## Um exemplo passo a passo 🔍

*«O quintal da avó é um **quadrado** com **3 m** de lado. Quantos metros de rede são precisos para a vedação toda?»* 🐔

```steps
[
  { "title": "1. O que pergunta?", "body": "a rede dá a VOLTA ao quintal → é o perímetro! 🔍", "icon": "🧐" },
  { "title": "2. Olha para os lados", "body": "um quadrado tem 4 lados iguais: 3 m cada", "icon": "🟧" },
  { "title": "3. Soma os 4 lados", "body": "3 + 3 + 3 + 3 = 12", "icon": "➕" },
  { "title": "4. Responde", "body": "são precisos 12 m de rede! ✅", "icon": "🎉" }
]
```

> **Truque:** segue a borda com o **dedo** e vai dizendo os números em voz alta: «3… mais 3, 6… mais 3, 9… mais 3, 12!». Quando o dedo voltar ao canto onde começou, a conta acabou — não saltaste nenhum lado nem contaste nenhum duas vezes. 👉

> [!TIP] **Para saberes mais** 🌱 O perímetro de um **campo de futebol** oficial é cerca de **300 metros** — dar 10 voltas ao campo é quase correr **3 quilómetros**! E a palavra «perímetro» vem do grego: *peri* = «à volta» e *metron* = «medida». Os gregos já mediam voltas há mais de 2000 anos! 🏛️

## Vamos praticar 🎈

```quiz
{
  "id": "mat-2-perimetro-pratica",
  "questions": [
    { "q": "O perímetro é…", "layout": "grid",
      "options": [ { "t": "a volta toda à figura", "emoji": "🐜", "correct": true }, { "t": "o espaço de dentro", "feedback": "O espaço de dentro é a área. O perímetro é a volta toda.", "tag": "perimetro-vs-area" }, { "t": "a altura da figura", "feedback": "A altura é só um lado. O perímetro é a volta completa.", "tag": "perimetro-vs-area" } ],
      "explain": "Perímetro = dar a volta completa, somando todos os lados." },
    { "q": "Para calcular o perímetro, fazes…", "layout": "grid",
      "options": [ { "t": "a soma de todos os lados", "emoji": "➕", "correct": true }, { "t": "só o lado maior", "feedback": "Falta o resto. O perímetro soma TODOS os lados, não só o maior.", "tag": "perimetro-metodo" }, { "t": "lado vezes lado", "feedback": "Lado × lado dá a área. O perímetro soma os lados.", "tag": "perimetro-vs-area" } ],
      "explain": "Somas os lados todos, um a um, sem saltar nenhum." },
    { "q": "Um quadrado de lado 2: qual é o perímetro?", "layout": "grid",
      "options": [ { "t": "8", "correct": true }, { "t": "4", "feedback": "4 são só dois lados (2 + 2). Um quadrado tem 4 lados: 2 + 2 + 2 + 2 = 8.", "tag": "perimetro-calculo" }, { "t": "6", "feedback": "Faltou um lado. São 4 lados de 2: 2 × 4 = 8.", "tag": "perimetro-calculo" } ],
      "explain": "2 + 2 + 2 + 2 = 8." },
    { "q": "Para medir o lado de uma bolacha usas…", "layout": "grid",
      "options": [ { "t": "centímetros", "emoji": "📏", "correct": true }, { "t": "metros", "feedback": "Em metros a bolacha seria enorme. Coisas pequenas medem-se em cm.", "tag": "medidas-unidade-errada" }, { "t": "quilos", "feedback": "Quilos medem peso. O lado mede-se em cm.", "tag": "medidas-grandeza-errada" } ],
      "explain": "Coisas pequenas medem-se em cm." },
    { "q": "Para medir a volta do jardim usas…", "layout": "grid",
      "options": [ { "t": "metros", "emoji": "🌳", "correct": true }, { "t": "centímetros", "feedback": "Em cm davam centenas de números. Um jardim mede-se em metros.", "tag": "medidas-unidade-errada" }, { "t": "litros", "feedback": "Litros medem líquido. A volta do jardim mede-se em metros.", "tag": "medidas-grandeza-errada" } ],
      "explain": "Coisas grandes medem-se em metros." },
    { "q": "1 metro tem…", "layout": "grid",
      "options": [ { "t": "100 centímetros", "emoji": "💯", "correct": true }, { "t": "10 centímetros", "feedback": "10 é de cm para mm. 1 metro tem 100 cm.", "tag": "medidas-fator-conversao" }, { "t": "1000 centímetros", "feedback": "1000 é de m para mm. 1 metro tem 100 cm.", "tag": "medidas-fator-conversao" } ],
      "explain": "1 m = 100 cm." },
    { "q": "O cordel à volta da figura serve para…", "layout": "list",
      "options": [ { "t": "medir o perímetro depois de esticado", "emoji": "🧵", "correct": true }, { "t": "decorar a figura", "feedback": "Não é enfeite: o cordel esticado mede a volta — o perímetro.", "tag": "perimetro-metodo" }, { "t": "medir o peso", "feedback": "O peso mede-se na balança. O cordel à volta mede o perímetro.", "tag": "medidas-grandeza-errada" } ],
      "explain": "Pões o cordel à volta, esticas e medes — é o perímetro!" }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-2-perimetro-final",
  "final": true,
  "title": "À volta das figuras: o perímetro",
  "questions": [
    { "q": "A formiga deu a volta toda ao caderno. Andou…", "layout": "grid",
      "options": [ { "t": "o perímetro", "emoji": "🐜", "correct": true }, { "t": "a área", "feedback": "A área é o espaço de dentro. A volta toda é o perímetro.", "tag": "perimetro-vs-area" }, { "t": "a altura", "feedback": "A altura é só um lado. A volta completa é o perímetro.", "tag": "perimetro-vs-area" } ],
      "explain": "A volta completa é o perímetro." },
    { "q": "Retângulo com lados 4, 2, 4 e 2. Perímetro?", "layout": "grid",
      "options": [ { "t": "12", "correct": true }, { "t": "8", "feedback": "8 é só 4 + 4. Falta somar os lados de 2: 4 + 2 + 4 + 2 = 12.", "tag": "perimetro-calculo" }, { "t": "10", "feedback": "Faltou um lado. Soma os quatro: 4 + 2 + 4 + 2 = 12.", "tag": "perimetro-calculo" } ],
      "explain": "4 + 2 + 4 + 2 = 12." },
    { "q": "Quadrado de lado 3. Perímetro?", "layout": "grid",
      "options": [ { "t": "12", "correct": true }, { "t": "9", "feedback": "9 é 3 × 3 (a área). O perímetro soma os 4 lados: 3 × 4 = 12.", "tag": "perimetro-vs-area" }, { "t": "6", "feedback": "6 são só dois lados (3 + 3). Um quadrado tem 4: 3 × 4 = 12.", "tag": "perimetro-calculo" } ],
      "explain": "3 + 3 + 3 + 3 = 12." },
    { "q": "Triângulo com lados 2, 3 e 4. Perímetro?", "layout": "grid",
      "options": [ { "t": "9", "emoji": "🔺", "correct": true }, { "t": "7", "feedback": "Faltou um lado. Soma os três: 2 + 3 + 4 = 9.", "tag": "perimetro-calculo" }, { "t": "10", "feedback": "Confere a soma: 2 + 3 + 4 = 9.", "tag": "perimetro-calculo" } ],
      "explain": "2 + 3 + 4 = 9 — soma os 3 lados." },
    { "q": "O quintal quadrado tem 3 m de lado. A rede toda mede…", "layout": "grid",
      "options": [ { "t": "12 m", "emoji": "🐔", "correct": true }, { "t": "9 m", "feedback": "9 é 3 × 3 (a área). A rede dá a volta: 3 × 4 = 12 m.", "tag": "perimetro-vs-area" }, { "t": "3 m", "feedback": "3 m é só um lado. A rede dá a volta toda: 3 × 4 = 12 m.", "tag": "perimetro-calculo" } ],
      "explain": "3 + 3 + 3 + 3 = 12 metros de rede." },
    { "q": "Qual destas coisas medes em metros?", "layout": "grid",
      "options": [ { "t": "a sala de aula", "emoji": "🏫", "correct": true }, { "t": "um lápis", "emoji": "✏️", "feedback": "Um lápis é pequeno: mede-se em cm. A sala é grande: metros.", "tag": "medidas-unidade-errada" }, { "t": "uma moeda", "emoji": "🪙", "feedback": "Uma moeda é pequenina: cm (até mm). A sala é grande: metros.", "tag": "medidas-unidade-errada" } ],
      "explain": "A sala é grande → metros. Lápis e moeda → centímetros." },
    { "q": "1 m = ? cm", "layout": "grid",
      "options": [ { "t": "100", "correct": true }, { "t": "10", "feedback": "10 é de cm para mm. 1 m = 100 cm.", "tag": "medidas-fator-conversao" }, { "t": "1000", "feedback": "1000 é de m para mm. 1 m = 100 cm.", "tag": "medidas-fator-conversao" } ],
      "explain": "Um metro são 100 centímetros." },
    { "q": "No desenho dos quadradinhos, o perímetro é…", "layout": "list",
      "options": [ { "t": "a linha grossa à volta", "emoji": "🔲", "correct": true }, { "t": "os quadradinhos de dentro", "feedback": "Os quadradinhos de dentro são a área. O perímetro é a linha à volta.", "tag": "perimetro-vs-area" }, { "t": "o quadradinho do meio", "feedback": "O perímetro não é um quadradinho — é a linha grossa à volta toda.", "tag": "perimetro-vs-area" } ],
      "explain": "A volta é o perímetro; os quadradinhos de dentro são a área (4.º ano!)." }
  ]
}
```
