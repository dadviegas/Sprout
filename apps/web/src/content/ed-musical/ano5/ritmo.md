# A pulsação e o ritmo 🥁

> [!NOTE] **O que vais aprender** 👀 A diferença entre **pulsação** (a batida certinha, como o coração) e **ritmo** (o jogo de sons curtos e compridos), o que é o **compasso** e a **barra de compasso**, os valores das **figuras** (semibreve, mínima, semínima, colcheia) e como **ler e bater** um ritmo. 🥁🎶

Põe a mão no peito. Sentes? **Tum… tum… tum…** O teu coração bate sempre igual, sem parar. A música também tem um coração: a **pulsação**. E por cima dela acontece a magia — o **ritmo**, o jogo de palmas curtas e compridas que faz a música dançar. Vamos sentir os dois! ❤️

## Pulsação ≠ ritmo 🤔

Muita gente confunde, mas são coisas diferentes! A **pulsação** é a batida regular, sempre igual, que está «por baixo» de toda a música. O **ritmo** é o desenho de sons que tocas **por cima** dessa pulsação — uns curtos, uns compridos, uns calados.

```compare
[
  { "title": "Pulsação ❤️", "rows": [
    { "label": "O que é", "value": "a batida regular, sempre igual" },
    { "label": "Como sentir", "value": "bate o pé certinho: tum… tum… tum…" },
    { "label": "Compara-se a", "value": "o tic-tac do relógio ou os teus passos a andar ⏰" }
  ] },
  { "title": "Ritmo 🥁", "rows": [
    { "label": "O que é", "value": "o jogo de sons curtos e compridos", "highlight": true },
    { "label": "Como sentir", "value": "bate palmas como dizes uma palavra: «ba-ta-ta» 👏", "highlight": true },
    { "label": "Compara-se a", "value": "a letra de uma canção, que muda a cada palavra 🎤", "highlight": true }
  ] }
]
```

> **Truque infalível:** quando ouves música e queres bater o pé sempre igual, isso é a **pulsação**. Quando bates palmas a acompanhar a **letra** (que muda a cada palavra), isso é o **ritmo**. A pulsação é o **andar**; o ritmo é a **dança** por cima. 🚶💃

## As figuras e os seus valores ⏱️

Cada som tem uma **figura** que diz quanto tempo dura, contado em **tempos** (a unidade da pulsação). É como uma régua do tempo: umas figuras são compridas, outras curtinhas. Repara como cada uma vale o dobro da seguinte!

```stats
[
  { "value": "4", "label": "Semibreve 𝅝", "hint": "a mais comprida — vale 4 tempos", "tone": "primary" },
  { "value": "2", "label": "Mínima 𝅗𝅥", "hint": "vale 2 tempos — metade da semibreve", "tone": "accent" },
  { "value": "1", "label": "Semínima ♩", "hint": "vale 1 tempo — a batida certinha", "tone": "info" },
  { "value": "½", "label": "Colcheia ♪", "hint": "vale meio tempo — duas numa batida", "tone": "ok" }
]
```

Vês a escada? A **semibreve** dá para **duas** mínimas; a **mínima** dá para **duas** semínimas; a **semínima** dá para **duas** colcheias. É sempre a partir ao meio! 🪜 Por isso conta-se devagar: «1 — 2 — 3 — 4» e cada figura ocupa o seu pedaço.

```chart
{ "type": "bar", "title": "Quantos tempos dura cada figura",
  "labels": ["Semibreve", "Mínima", "Semínima", "Colcheia"], "data": [4, 2, 1, 0.5],
  "unit": "tempos",
  "say": "A semibreve dura 4 tempos, a mínima 2, a semínima 1 e a colcheia meio tempo." }
```

## O compasso: arrumar a música 📦

Para a música não ser uma confusão, os tempos juntam-se em grupos chamados **compassos**, separados por **barras de compasso** (as linhas verticais na pauta). Os mais comuns agrupam **2, 3 ou 4 tempos**, e o **1.º tempo** de cada compasso é sempre o mais **forte** (o tempo acentuado).

```keyvalue
[
  { "k": "Compasso de 2 tempos", "v": "FORTE-fraco — como uma marcha: 'esquerda-direita' 🥁" },
  { "k": "Compasso de 3 tempos", "v": "FORTE-fraco-fraco — como uma valsa: 'um-dois-três' 💃" },
  { "k": "Compasso de 4 tempos", "v": "FORTE-fraco-meio-fraco — o mais usado nas canções 🎵" },
  { "k": "Barra de compasso", "v": "a linha vertical que separa um compasso do seguinte ▕" }
]
```

> [!NOTE] No início da pauta há dois números (a **indicação de compasso**), como **4/4** ou **3/4**. O número de cima diz **quantos tempos** cada compasso tem. Por isso **4/4** quer dizer «4 tempos em cada compasso» — o famoso compasso quaternário das canções pop! 🎶

## Um exemplo passo a passo 🔍

Vamos **construir** um compasso de **4/4** (4 tempos) com figuras, e depois batê-lo. Lembra-te: as figuras juntas têm de somar **4 tempos**! 🧮

```steps
[
  { "title": "1. O compasso pede 4 tempos", "body": "tenho de encher 4 tempos certinhos, nem mais nem menos 📦" },
  { "title": "2. Começo com uma mínima", "body": "uma mínima 𝅗𝅥 = 2 tempos. Já tenho 2, faltam 2 ✌️" },
  { "title": "3. Junto duas semínimas", "body": "semínima ♩ + semínima ♩ = 1 + 1 = 2 tempos. Já tenho 4! 👏👏" },
  { "title": "4. Confiro a conta", "body": "2 + 1 + 1 = 4 tempos. O compasso está cheio, certinho! ✅" },
  { "title": "5. Bato a contar", "body": "«táaa (1-2) — tá (3) — tá (4)» e fecho a barra de compasso 🥁" }
]
```

```math
{ "expr": "2 + 1 + 1 = 4", "say": "mínima mais semínima mais semínima é igual a quatro tempos: um compasso de quatro por quatro" }
```

## Bate o teu ritmo 👏

Cada cartão tem um pequeno ritmo escrito em sílabas (**tá** = semínima, **ti-ti** = duas colcheias). Toca para **ouvir** e tenta bater palmas ao mesmo tempo!

```soundcards
{ "title": "Lê e bate (4 tempos cada)", "items": [
  { "icon": "music", "label": "tá – tá – tá – tá", "say": "tá, tá, tá, tá: quatro semínimas, uma em cada tempo" },
  { "icon": "music", "label": "ti-ti – tá – ti-ti – tá", "say": "ti-ti, tá, ti-ti, tá: duas colcheias, uma semínima, duas colcheias, uma semínima" },
  { "icon": "music", "label": "tá – tá – ti-ti-ti-ti", "say": "tá, tá, e quatro colcheias seguidas: ti-ti-ti-ti" },
  { "icon": "music", "label": "táaa – tá – tá", "say": "táaa de dois tempos, depois tá, tá: uma mínima e duas semínimas" }
] }
```

> [!TIP] **Para saberes mais** 🌱 Há música que parece «não caber» em 2, 3 ou 4 — usa **compassos compostos** ou ritmos onde a batida cai onde menos esperas, o **síncope** (ou *contratempo*). É o segredo do **jazz**, do **funk** e do **samba**: a batida «foge» do tempo forte e dá aquela vontade de dançar! 🎷💃 Os músicos chamam-lhe «tocar atrás do tempo».

## Treina os valores 🎯

```drill
{ "mode": "choose", "title": "Pulsação, ritmo e figuras", "items": [
  { "front": "A batida certinha, sempre igual, chama-se…", "back": "pulsação", "options": ["ritmo", "timbre"] },
  { "front": "O jogo de sons curtos e compridos chama-se…", "back": "ritmo", "options": ["pulsação", "silêncio"] },
  { "front": "A semínima ♩ vale…", "back": "1 tempo", "options": ["4 tempos", "meio tempo"] },
  { "front": "A semibreve 𝅝 vale…", "back": "4 tempos", "options": ["1 tempo", "2 tempos"] },
  { "front": "A mínima 𝅗𝅥 vale…", "back": "2 tempos", "options": ["meio tempo", "4 tempos"] },
  { "front": "Duas colcheias ♪♪ juntas valem…", "back": "1 tempo", "options": ["4 tempos", "2 tempos"] },
  { "front": "A linha que separa os compassos é a…", "back": "barra de compasso", "options": ["clave de sol", "pauta"] },
  { "front": "Num compasso, o tempo mais forte é o…", "back": "1.º tempo", "options": ["último tempo", "silêncio"] }
] }
```

## Vamos praticar 🎈

```quiz
{ "id": "em-5-ritmo-pratica", "questions": [
  { "q": "A pulsação é…", "layout": "grid", "options": [
    { "t": "a batida regular, sempre igual, como o coração", "emoji": "❤️", "correct": true },
    { "t": "o jogo de sons curtos e compridos", "emoji": "🥁" },
    { "t": "a cor do som", "emoji": "🎨" }
  ], "explain": "A pulsação é a batida certinha e regular que está por baixo da música." },
  { "q": "O ritmo é…", "layout": "grid", "options": [
    { "t": "o desenho de sons curtos, compridos e calados por cima da pulsação", "emoji": "🥁", "correct": true },
    { "t": "a batida sempre igual", "emoji": "❤️" },
    { "t": "o nome de uma nota", "emoji": "🎵" }
  ], "explain": "O ritmo é o jogo de durações que tocas por cima da pulsação." },
  { "q": "Quantos tempos vale uma semibreve 𝅝?", "layout": "grid", "options": [
    { "t": "4 tempos", "emoji": "4️⃣", "correct": true },
    { "t": "1 tempo", "emoji": "1️⃣" },
    { "t": "meio tempo", "emoji": "½" }
  ], "explain": "A semibreve é a mais comprida: vale 4 tempos." },
  { "q": "Uma mínima 𝅗𝅥 vale o mesmo que…", "layout": "grid", "options": [
    { "t": "duas semínimas (2 tempos)", "emoji": "✌️", "correct": true },
    { "t": "quatro semibreves", "emoji": "🔢" },
    { "t": "meio tempo", "emoji": "½" }
  ], "explain": "A mínima vale 2 tempos = duas semínimas de 1 tempo cada." },
  { "q": "Os tempos juntam-se em grupos chamados…", "layout": "grid", "options": [
    { "t": "compassos, separados por barras de compasso", "emoji": "📦", "correct": true },
    { "t": "timbres", "emoji": "🎨" },
    { "t": "claves", "emoji": "🎼" }
  ], "explain": "Os tempos agrupam-se em compassos, separados por barras verticais." },
  { "q": "Numa valsa, contamos…", "layout": "grid", "options": [
    { "t": "1-2-3 (compasso de 3 tempos)", "emoji": "💃", "correct": true },
    { "t": "1-2-3-4-5-6-7", "emoji": "🔢" },
    { "t": "só 1", "emoji": "1️⃣" }
  ], "explain": "A valsa é um compasso de 3 tempos: FORTE-fraco-fraco." },
  { "q": "No compasso 4/4, o número de cima (4) diz…", "layout": "grid", "options": [
    { "t": "quantos tempos cada compasso tem", "emoji": "🎵", "correct": true },
    { "t": "a cor da música", "emoji": "🌈" },
    { "t": "o número de instrumentos", "emoji": "🎻" }
  ], "explain": "O número de cima diz quantos tempos há em cada compasso: aqui, 4." }
] }
```

## 🎯 Questionário final

```quiz
{ "id": "em-5-ritmo-final", "final": true, "title": "A pulsação e o ritmo", "questions": [
  { "q": "Qual a diferença entre pulsação e ritmo?", "layout": "list", "options": [
    { "t": "a pulsação é a batida sempre igual; o ritmo é o jogo de sons por cima dela", "emoji": "🥁", "correct": true },
    { "t": "são exatamente a mesma coisa", "emoji": "🟰" },
    { "t": "a pulsação é a cor e o ritmo é o cheiro", "emoji": "🎨" }
  ], "explain": "A pulsação é regular (o andar); o ritmo é o desenho de durações (a dança) por cima." },
  { "q": "Bater o pé sempre igual ao ouvir música é sentir a…", "layout": "grid", "options": [
    { "t": "pulsação", "emoji": "❤️", "correct": true },
    { "t": "barra de compasso", "emoji": "▕" },
    { "t": "clave de sol", "emoji": "🎼" }
  ], "explain": "A batida regular do pé é a pulsação." },
  { "q": "A figura que vale 1 tempo (a 'batida certinha') é a…", "layout": "grid", "options": [
    { "t": "semínima ♩", "emoji": "1️⃣", "correct": true },
    { "t": "semibreve 𝅝", "emoji": "4️⃣" },
    { "t": "colcheia ♪", "emoji": "½" }
  ], "explain": "A semínima vale 1 tempo — é a referência da pulsação." },
  { "q": "Quantas colcheias ♪ cabem numa semínima ♩?", "layout": "grid", "options": [
    { "t": "duas", "emoji": "✌️", "correct": true },
    { "t": "quatro", "emoji": "4️⃣" },
    { "t": "nenhuma", "emoji": "🚫" }
  ], "explain": "A colcheia vale meio tempo, por isso duas fazem 1 tempo (uma semínima)." },
  { "q": "Para encher um compasso de 4/4, as figuras têm de somar…", "layout": "grid", "options": [
    { "t": "4 tempos", "emoji": "4️⃣", "correct": true },
    { "t": "10 tempos", "emoji": "🔟" },
    { "t": "meio tempo", "emoji": "½" }
  ], "explain": "Em 4/4 cada compasso tem exatamente 4 tempos." },
  { "q": "Uma mínima + duas semínimas, num compasso, dão…", "layout": "grid", "options": [
    { "t": "4 tempos (2 + 1 + 1)", "emoji": "🧮", "correct": true },
    { "t": "2 tempos", "emoji": "✌️" },
    { "t": "8 tempos", "emoji": "8️⃣" }
  ], "explain": "2 + 1 + 1 = 4 tempos: um compasso de 4/4 cheio." },
  { "q": "Em cada compasso, o tempo mais forte (acentuado) é o…", "layout": "grid", "options": [
    { "t": "1.º tempo", "emoji": "1️⃣", "correct": true },
    { "t": "último tempo", "emoji": "🔚" },
    { "t": "nenhum", "emoji": "🚫" }
  ], "explain": "O 1.º tempo de cada compasso é sempre o mais forte." },
  { "q": "Quando a batida 'foge' do tempo forte e dá vontade de dançar, chama-se…", "layout": "grid", "options": [
    { "t": "síncope (ou contratempo)", "emoji": "🎷", "correct": true },
    { "t": "silêncio", "emoji": "🤫" },
    { "t": "pulsação", "emoji": "❤️" }
  ], "explain": "O síncope desloca a batida — é o segredo do jazz, do funk e do samba." }
] }
```
