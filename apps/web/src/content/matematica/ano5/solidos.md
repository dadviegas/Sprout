# Sólidos geométricos 🧊

> [!NOTE] **O que vais aprender** 👀 Vais distinguir **poliedros** (só faces planas) de **não poliedros** (com partes curvas), contar **faces, arestas e vértices**, descobrir a fórmula mágica de **Euler**, conhecer **prismas e pirâmides** e até **planificar** um cubo! 🧊📦

Olha à tua volta: um dado, uma lata, um gelado, uma caixa, uma bola. São todos **sólidos geométricos** — formas a três dimensões que ocupam espaço. No 5.º ano vais dar-lhes nome certo, contar as suas partes e descobrir uma fórmula tão bonita que parece magia. Vamos lá! 🪄

## Poliedros e não poliedros ✋

Os sólidos dividem-se em dois grandes grupos, conforme as suas superfícies:

```compare
[
  { "title": "Poliedros 📦 (só faces planas)", "rows": [
    { "label": "Têm", "value": "só superfícies planas (faces)" },
    { "label": "Rolam?", "value": "não — ficam quietos" },
    { "label": "Exemplos", "value": "cubo, paralelepípedo, prisma, pirâmide" }
  ] },
  { "title": "Não poliedros ⚽ (têm curvas)", "highlight": true, "rows": [
    { "label": "Têm", "value": "pelo menos uma superfície curva" },
    { "label": "Rolam?", "value": "sim! 🎳" },
    { "label": "Exemplos", "value": "esfera, cilindro, cone" }
  ] }
]
```

> [!NOTE] A palavra **poliedro** quer dizer «muitas faces». Truque rápido: se o sólido **rola**, tem curvas → é **não poliedro**. Se **fica quieto**, só tem partes direitas → é **poliedro**. 🎳🛑

## Faces, arestas e vértices 🔢

Os poliedros têm três tipos de «partes», fáceis de aprender com os dedos! 🤓

```keyvalue
[
  { "k": "Face", "v": "cada superfície plana, onde pousas o dedo 🤚" },
  { "k": "Aresta", "v": "a linha onde duas faces se encontram (a beirinha) 📏" },
  { "k": "Vértice", "v": "o bico/canto onde as arestas se juntam 📍" }
]
```

Vamos contar no **cubo** (o dado) e no **paralelepípedo** (a caixa de sapatos):

```compare
[
  { "title": "Cubo 🎲", "rows": [
    { "label": "Faces", "value": "6 (quadrados iguais)" },
    { "label": "Arestas", "value": "12" },
    { "label": "Vértices", "value": "8" }
  ] },
  { "title": "Paralelepípedo 📦", "highlight": true, "rows": [
    { "label": "Faces", "value": "6 (retângulos)" },
    { "label": "Arestas", "value": "12" },
    { "label": "Vértices", "value": "8" }
  ] }
]
```

## A fórmula mágica de Euler ✨

Aqui está um segredo lindíssimo, descoberto pelo matemático **Euler**: em **qualquer poliedro**, se somares as **faces** e os **vértices**, dá sempre as **arestas mais 2**! 🤯

```math
{ "expr": "Faces + Vértices = Arestas + 2", "say": "número de faces mais número de vértices é igual ao número de arestas mais dois" }
```

Vamos testar no cubo: **6 faces + 8 vértices = 14**, e **12 arestas + 2 = 14**. Bate certinho! ✅

```stats
[
  { "label": "Cubo: F + V", "value": "14", "hint": "6 + 8" },
  { "label": "Cubo: A + 2", "value": "14", "hint": "12 + 2" },
  { "label": "Funciona?", "value": "Sempre!", "hint": "em todos os poliedros 🪄" }
]
```

> **Truque:** se um problema te der **dois** dos três números (faces, arestas, vértices) de um poliedro, descobres o terceiro com a fórmula de Euler! É como ter um superpoder de detetive. 🕵️

## Prismas e pirâmides 🏛️

Dois tipos de poliedros aparecem sempre — e a diferença está nas **bases**:

```compare
[
  { "title": "Prisma 🏛️", "rows": [
    { "label": "Bases", "value": "DUAS bases iguais e paralelas" },
    { "label": "Lados", "value": "retângulos a ligar as bases" },
    { "label": "Exemplo", "value": "caixa de chocolates (base triangular)" }
  ] },
  { "title": "Pirâmide ⛺", "highlight": true, "rows": [
    { "label": "Bases", "value": "UMA base só" },
    { "label": "Lados", "value": "triângulos que sobem até um bico" },
    { "label": "Exemplo", "value": "as pirâmides do Egito 🏜️" }
  ] }
]
```

O nome vem da **forma da base**: prisma **triangular** (base triângulo), pirâmide **quadrangular** (base quadrado), e por aí fora. 🔺⬜

## Planificar um sólido ✂️

Se «abrires» uma caixa de cartão e a esticares no chão, ficas com a sua **planificação** — o molde plano que, dobrado, faz o sólido. A planificação do **cubo** tem **6 quadrados** ligados!

```steps
[
  { "title": "1. Imagina a caixa", "body": "um cubo fechado, como um dado 🎲", "icon": "🎲" },
  { "title": "2. Corta pelas arestas", "body": "abres com cuidado e esticas no chão ✂️", "icon": "✂️" },
  { "title": "3. Conta as peças", "body": "ficam 6 quadrados ligados em cruz (ou outras formas)", "icon": "🔢" },
  { "title": "4. Dobra de volta", "body": "dobrando os 6 quadrados, voltas a ter o cubo! 📦", "icon": "📦" }
]
```

## Um exemplo passo a passo 🔍

*«Um poliedro tem 5 faces e 6 vértices. Quantas arestas tem?»* Vamos usar o superpoder de Euler! 🦸

```steps
[
  { "title": "1. A fórmula", "body": "Faces + Vértices = Arestas + 2 ✨", "icon": "✨" },
  { "title": "2. Mete os números", "body": "5 + 6 = Arestas + 2 → 11 = Arestas + 2", "icon": "🔢" },
  { "title": "3. Descobre as arestas", "body": "Arestas = 11 − 2 = 9", "icon": "🧮" },
  { "title": "4. Resposta", "body": "o poliedro tem 9 arestas! (É uma pirâmide quadrangular 🔺)", "icon": "🎉" }
]
```

> **Truque:** identificar um sólido? Pergunta **uma coisa de cada vez** — 1.º «Rola?» (curvo ou plano). 2.º «Tem 1 base ou 2?» (pirâmide ou prisma). 3.º «Que forma tem a base?» (dá-lhe o nome). 🌟

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Sólidos: partes e tipos", "items": [
  { "front": "Quantas faces tem um cubo?", "back": "6", "options": ["8", "4"] },
  { "front": "Quantas arestas tem um cubo?", "back": "12", "options": ["8", "6"] },
  { "front": "Quantos vértices tem um cubo?", "back": "8", "options": ["6", "12"] },
  { "front": "Esfera: poliedro ou não poliedro?", "back": "não poliedro", "options": ["poliedro"] },
  { "front": "Quantas bases tem um prisma?", "back": "2", "options": ["1", "3"] },
  { "front": "Quantas bases tem uma pirâmide?", "back": "1", "options": ["2", "0"] },
  { "front": "Fórmula de Euler: F + V = ?", "back": "A + 2", "options": ["A − 2", "A"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Existem apenas **cinco** poliedros perfeitos — os **sólidos platónicos** — em que todas as faces são polígonos regulares iguais: o **tetraedro** (4 triângulos), o **cubo** (6 quadrados), o **octaedro** (8 triângulos), o **dodecaedro** (12 pentágonos) e o **icosaedro** (20 triângulos). Só estes cinco existem em todo o universo — nem mais um! Por isso os dados de jogos têm muitas vezes estas formas. 🎲🤯

## Vamos praticar 🎈

```quiz
{
  "id": "mat-5-solidos-pratica",
  "questions": [
    { "q": "Um sólido só com faces planas chama-se…", "layout": "grid",
      "options": [ { "t": "poliedro", "emoji": "📦", "correct": true }, { "t": "não poliedro", "feedback": "O não poliedro tem pelo menos uma superfície curva (e rola). Só com faces planas é poliedro.", "tag": "solido-tipo" }, { "t": "círculo", "feedback": "O círculo é uma figura plana, não um sólido. Um sólido só com faces planas é um poliedro.", "tag": "solido-tipo" } ],
      "explain": "Poliedro = só faces planas (cubo, prisma, pirâmide)." },
    { "q": "Qual destes rola (é não poliedro)?", "layout": "grid",
      "options": [ { "t": "cilindro", "emoji": "🥫", "correct": true }, { "t": "cubo", "emoji": "🎲", "feedback": "O cubo só tem faces planas, por isso fica quieto — é poliedro. Quem rola é o cilindro, que tem uma superfície curva.", "tag": "poliedro-vs-redondo" }, { "t": "pirâmide", "emoji": "⛺", "feedback": "A pirâmide só tem faces planas, por isso não rola — é poliedro. Quem rola é o cilindro, que é curvo.", "tag": "poliedro-vs-redondo" } ],
      "explain": "O cilindro tem uma superfície curva, por isso rola." },
    { "q": "Quantas arestas tem um cubo?", "layout": "grid",
      "options": [ { "t": "12", "emoji": "📏", "correct": true }, { "t": "8", "feedback": "8 é o número de vértices (os cantos). As arestas (as beirinhas) do cubo são 12.", "tag": "solido-arestas-vertices" }, { "t": "6", "feedback": "6 é o número de faces. As arestas (as beirinhas entre faces) do cubo são 12.", "tag": "solido-arestas-vertices" } ],
      "explain": "O cubo tem 6 faces, 12 arestas e 8 vértices." },
    { "q": "A linha onde duas faces se encontram é a…", "layout": "grid",
      "options": [ { "t": "aresta", "emoji": "📏", "correct": true }, { "t": "face", "emoji": "🤚", "feedback": "A face é a superfície plana onde pousas o dedo. A linha onde duas faces se encontram é a aresta.", "tag": "solido-arestas-vertices" }, { "t": "vértice", "emoji": "📍", "feedback": "O vértice é o bico onde as arestas se juntam. A linha entre duas faces é a aresta.", "tag": "solido-arestas-vertices" } ],
      "explain": "Aresta = a beirinha entre duas faces." },
    { "q": "A fórmula de Euler diz que…", "layout": "list",
      "options": [ { "t": "Faces + Vértices = Arestas + 2", "emoji": "✨", "correct": true }, { "t": "Faces = Arestas", "feedback": "Faces e arestas não são iguais (o cubo tem 6 e 12). A fórmula de Euler é Faces + Vértices = Arestas + 2.", "tag": "solido-euler" }, { "t": "Vértices = 2", "feedback": "Os vértices não são sempre 2 (o cubo tem 8). A fórmula de Euler é Faces + Vértices = Arestas + 2.", "tag": "solido-euler" } ],
      "explain": "Em qualquer poliedro: F + V = A + 2." },
    { "q": "Quantas bases tem um prisma?", "layout": "grid",
      "options": [ { "t": "2 (iguais e paralelas)", "emoji": "🏛️", "correct": true }, { "t": "1", "feedback": "Uma base só é a pirâmide (os lados sobem até um bico). O prisma tem 2 bases iguais e paralelas.", "tag": "solido-prisma-piramide" }, { "t": "nenhuma", "feedback": "O prisma tem mesmo bases — duas, iguais e paralelas. Sem bases planas seria um sólido redondo.", "tag": "solido-prisma-piramide" } ],
      "explain": "O prisma tem duas bases iguais; a pirâmide tem uma só." },
    { "q": "A planificação de um cubo tem…", "layout": "grid",
      "options": [ { "t": "6 quadrados", "emoji": "✂️", "correct": true }, { "t": "4 triângulos", "feedback": "Triângulos são os lados de uma pirâmide. O cubo tem 6 faces quadradas, logo a planificação tem 6 quadrados.", "tag": "solido-planificacao" }, { "t": "1 círculo", "feedback": "Um círculo não faz um cubo (que é todo direito). A planificação do cubo são as 6 faces: 6 quadrados.", "tag": "solido-planificacao" } ],
      "explain": "São as 6 faces esticadas no plano." },
    { "q": "Um poliedro com 6 faces e 8 vértices tem quantas arestas?", "layout": "grid",
      "options": [ { "t": "12", "emoji": "🕵️", "correct": true }, { "t": "14", "feedback": "14 é F + V (6 + 8); falta tirar 2. Por Euler: 6 + 8 = A + 2 → A = 12.", "tag": "solido-euler" }, { "t": "10", "feedback": "10 não fecha a fórmula. Por Euler: 6 + 8 = A + 2 → A = 14 − 2 = 12.", "tag": "solido-euler" } ],
      "explain": "Euler: 6 + 8 = A + 2 → A = 12." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-solidos-final",
  "final": true,
  "title": "Sólidos geométricos",
  "questions": [
    { "q": "A esfera, o cilindro e o cone são…", "layout": "grid",
      "options": [ { "t": "não poliedros (têm curvas)", "emoji": "⚽", "correct": true }, { "t": "poliedros", "feedback": "Poliedros só têm faces planas. A esfera, o cilindro e o cone têm superfícies curvas e rolam: são não poliedros.", "tag": "poliedro-vs-redondo" } ],
      "explain": "Têm superfícies curvas e rolam: não poliedros." },
    { "q": "Quantas faces tem um cubo?", "layout": "grid",
      "options": [ { "t": "6", "emoji": "🎲", "correct": true }, { "t": "8", "feedback": "8 é o número de vértices (os cantos). As faces (os quadrados) do cubo são 6.", "tag": "solido-faces" }, { "t": "4", "feedback": "4 é muito poucas — um dado tem mais lados. O cubo tem 6 faces quadradas iguais.", "tag": "solido-faces" } ],
      "explain": "6 faces quadradas iguais." },
    { "q": "O bico onde as arestas se juntam é o…", "layout": "grid",
      "options": [ { "t": "vértice", "emoji": "📍", "correct": true }, { "t": "face", "feedback": "A face é a superfície plana onde pousas o dedo. O bico onde as arestas se juntam é o vértice.", "tag": "solido-arestas-vertices" }, { "t": "aresta", "feedback": "A aresta é a linha entre duas faces. O bico onde as arestas se juntam é o vértice.", "tag": "solido-arestas-vertices" } ],
      "explain": "Vértice = canto/bico do sólido." },
    { "q": "Quantos vértices tem um cubo?", "layout": "grid",
      "options": [ { "t": "8", "correct": true }, { "t": "6", "feedback": "6 é o número de faces. Os vértices (os cantos) do cubo são 8.", "tag": "solido-arestas-vertices" }, { "t": "12", "feedback": "12 é o número de arestas (as beirinhas). Os vértices (os cantos) do cubo são 8.", "tag": "solido-arestas-vertices" } ],
      "explain": "Um em cada canto: 8 vértices." },
    { "q": "A pirâmide tem…", "layout": "grid",
      "options": [ { "t": "1 base e lados em triângulo até um bico", "emoji": "⛺", "correct": true }, { "t": "2 bases iguais", "feedback": "Duas bases iguais e paralelas são do prisma. A pirâmide tem 1 base só e os lados sobem até um bico.", "tag": "solido-prisma-piramide" } ],
      "explain": "Uma base só; os lados sobem até um vértice no topo." },
    { "q": "Pela fórmula de Euler, um poliedro com 5 faces e 6 vértices tem… arestas", "layout": "grid",
      "options": [ { "t": "9", "emoji": "🦸", "correct": true }, { "t": "11", "feedback": "11 é F + V (5 + 6); falta tirar 2. Por Euler: 5 + 6 = A + 2 → A = 9.", "tag": "solido-euler" }, { "t": "7", "feedback": "7 não fecha a fórmula. Por Euler: 5 + 6 = A + 2 → A = 11 − 2 = 9.", "tag": "solido-euler" } ],
      "explain": "5 + 6 = A + 2 → A = 9." },
    { "q": "Uma caixa de sapatos é um…", "layout": "grid",
      "options": [ { "t": "paralelepípedo", "emoji": "📦", "correct": true }, { "t": "cilindro", "feedback": "O cilindro é redondo e rola (como uma lata). A caixa de sapatos tem 6 faces retangulares: é um paralelepípedo.", "tag": "solido-tipo" }, { "t": "esfera", "feedback": "A esfera é uma bola redonda. A caixa de sapatos tem 6 faces retangulares: é um paralelepípedo.", "tag": "solido-tipo" } ],
      "explain": "6 faces retangulares: paralelepípedo." },
    { "q": "O nome de um prisma vem da forma da sua…", "layout": "grid",
      "options": [ { "t": "base", "emoji": "🔺", "correct": true }, { "t": "cor", "feedback": "A cor não dá nome aos sólidos. O nome do prisma vem da forma da base: triangular, quadrangular…", "tag": "solido-prisma-piramide" }, { "t": "altura", "feedback": "A altura não dá o nome. O prisma chama-se pela forma da base: triangular, quadrangular…", "tag": "solido-prisma-piramide" } ],
      "explain": "Prisma triangular, quadrangular… conforme a base." },
    { "q": "Os 5 poliedros perfeitos (todas as faces iguais e regulares) chamam-se…", "layout": "grid",
      "options": [ { "t": "sólidos platónicos", "emoji": "🤯", "correct": true }, { "t": "sólidos redondos", "feedback": "Sólidos redondos são os que rolam (esfera, cilindro, cone) — esses nem são poliedros. Os 5 poliedros perfeitos são os sólidos platónicos.", "tag": "solido-tipo" } ],
      "explain": "Tetraedro, cubo, octaedro, dodecaedro e icosaedro — só estes 5!" }
  ]
}
```
