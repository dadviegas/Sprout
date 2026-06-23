# Ângulos e retas 📐

> [!NOTE] **O que vais aprender** 👀 Vais conhecer as **retas** e os **ângulos**, descobrir os ângulos **reto, agudo e obtuso**, e aprender a medi-los com o canto de uma folha. No fim, vês ângulos por todo o lado! 😄

As retas e os ângulos estão escondidos por todo o lado — nos cantos da janela, nos ponteiros do relógio, nas fatias de pizza e até nas asas de uma borboleta! 🦋 Pega numa folha de papel e vem comigo: hoje vais ficar com olhos de detetive de ângulos. 🕵️

## Retas, segmentos e semirretas ✏️

Uma **reta** é uma linha direita que **não tem fim** — vai, vai e vai para sempre, dos dois lados. Como não acaba, desenhamos só um bocadinho e pomos setas nas pontas. ➡️

Um **segmento de reta** é só um pedacinho da reta, com **princípio e fim** — como o lado de uma régua. 📏 Uma **semirreta** tem princípio mas não tem fim: começa num ponto e segue para sempre só para um lado, como um raio de sol. ☀️

```keyvalue
[
  { "k": "Reta", "v": "linha direita sem fim, dos dois lados ✏️" },
  { "k": "Segmento de reta", "v": "um bocadinho com princípio e fim 📏" },
  { "k": "Semirreta", "v": "tem princípio mas segue para sempre num lado ☀️" },
  { "k": "Ponto", "v": "uma marca pequenina onde tudo começa 📍" }
]
```

## Retas paralelas e perpendiculares 🚂

Quando há **duas retas**, podemos ver como elas se portam uma com a outra:

- **Paralelas**: caminham lado a lado e **nunca se cruzam**, por mais que andem — como os carris do comboio. 🚂
- **Perpendiculares**: cruzam-se a formar um **canto certinho** (um ângulo reto) — como o **+** de uma cruz ou o cruzamento de duas ruas. ➕
- **Concorrentes**: cruzam-se num ponto, mas **não** fazem um canto certinho — encontram-se «de lado». ✂️

```compare
[
  { "title": "Paralelas 🚂", "rows": [ {"label":"cruzam-se?","value":"nunca!"}, {"label":"exemplo","value":"carris do comboio"} ] },
  { "title": "Perpendiculares ➕", "highlight": true, "rows": [ {"label":"cruzam-se?","value":"sim, a 90°"}, {"label":"exemplo","value":"a cruz +"} ] },
  { "title": "Concorrentes ✂️", "rows": [ {"label":"cruzam-se?","value":"sim, mas torto"}, {"label":"exemplo","value":"a tesoura aberta"} ] }
]
```

## O que é um ângulo? 🐊

Um **ângulo** é a **abertura** entre duas semirretas que partem do mesmo ponto. Imagina uma **boca de crocodilo** a abrir e a fechar: quanto mais a boca abre, **maior** é o ângulo! 🐊

O pontinho onde as duas semirretas se juntam chama-se **vértice**, e cada linha é um **lado** do ângulo. O tamanho do ângulo **não** depende do comprimento dos lados — depende só de **quanto abre** a boca.

Experimenta! Arrasta a ponta para abrir e fechar a boca do crocodilo e vê o ângulo a mudar de nome. 🐊

```angle
{ "title": "Abre e fecha a boca!", "angle": 45 }
```

```keyvalue
[
  { "k": "Vértice", "v": "o ponto onde o ângulo começa 📍" },
  { "k": "Lados", "v": "as duas semirretas que abrem a boca 🐊" },
  { "k": "Abertura", "v": "o tamanho do ângulo — quanto a boca abre" },
  { "k": "Atenção 🙂", "v": "lados compridos NÃO fazem o ângulo maior!" }
]
```

## Os três ângulos: reto, agudo e obtuso 📐

Há três ângulos que tens mesmo de conhecer. O **reto** é o «chefe» — mede **90°** e é o canto certinho de uma folha. Os outros dois comparam-se sempre com ele:

- **Reto**: a boca está aberta no canto certinho. Mede **90°**. ➕
- **Agudo**: a boca está **mais fechada** que o reto — um ângulo pequenino. É **menor que 90°**. 🤏
- **Obtuso**: a boca está **mais aberta** que o reto, bem escancarada. É **maior que 90°**. 😮

Olha bem para os três, lado a lado — repara onde fica o canto certinho do reto:

```angle
{ "title": "Agudo (menos de 90°)", "angle": 40, "interactive": false, "color": "ok" }
```

```angle
{ "title": "Reto (90° certinho)", "angle": 90, "interactive": false }
```

```angle
{ "title": "Obtuso (mais de 90°)", "angle": 130, "interactive": false, "color": "accent" }
```

```compare
[
  { "title": "Agudo", "rows": [ {"label":"abertura","value":"pequena 🤏"}, {"label":"medida","value":"menor que 90°"}, {"label":"exemplo","value":"fatia fina de pizza 🍕"} ] },
  { "title": "Reto", "highlight": true, "badge": "90°", "rows": [ {"label":"abertura","value":"canto certinho ➕"}, {"label":"medida","value":"exatamente 90°"}, {"label":"exemplo","value":"canto do livro 📕"} ] },
  { "title": "Obtuso", "rows": [ {"label":"abertura","value":"grande 😮"}, {"label":"medida","value":"maior que 90°"}, {"label":"exemplo","value":"livro quase aberto"} ] }
]
```

## Ângulos à nossa volta 🔭

Os ângulos não vivem só nos livros — estão na vida toda! Olha à tua volta e tenta encontrá-los:

```stats
[
  { "label": "Canto de uma folha", "value": "reto", "hint": "mede 90°, certinho ➕" },
  { "label": "Fatia fina de pizza", "value": "agudo", "hint": "boca quase fechada 🍕" },
  { "label": "Espreguiçadeira na praia", "value": "obtuso", "hint": "bem aberta para descansar 🏖️" },
  { "label": "Ponteiros às 6 horas", "value": "raso", "hint": "uma linha direita, 180° 🕕" }
]
```

## Um exemplo passo a passo 🔍

Vamos descobrir que ângulo formam os ponteiros do relógio às **3 horas**. 🕒

```steps
[
  { "title": "Lê o relógio", "body": "às 3 horas, o ponteiro pequeno aponta para o 3 e o grande para o 12 🕒", "icon": "🕒" },
  { "title": "Olha para a abertura", "body": "os dois ponteiros fazem um canto bem certinho, igual ao canto de uma folha", "icon": "👀" },
  { "title": "Compara com a folha", "body": "encosta o canto de uma folha de papel — encaixa perfeitinho!", "icon": "📄" },
  { "title": "Conclusão", "body": "é um ângulo RETO! Mede 90°. Boa! 🎉", "icon": "🎉" }
]
```

> **Truque:** usa sempre o **canto de uma folha de papel** como medida secreta! 📄 Se a abertura **cabe certinho** no canto → é **reto**. Se for **mais pequena** que o canto → é **agudo**. Se for **maior** → é **obtuso**. E lembra-te: **a**gudo é **a**pertadinho (pequenino), o obtuso é o que sobra (grande). 😉

> [!TIP] **Para saberes mais** 🌱 Os ângulos medem-se em **graus** (°), com um aparelho chamado **transferidor**. O ângulo reto tem **90°**; uma linha direita (ângulo **raso**) tem **180°** — o dobro; e uma volta completa tem **360°**, como uma roda a girar! 🔄

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-angulos-pratica",
  "questions": [
    { "q": "Duas retas que nunca se cruzam são...", "layout": "grid",
      "options": [ { "t": "paralelas", "emoji": "🚂", "correct": true }, { "t": "perpendiculares", "emoji": "➕", "feedback": "As perpendiculares CRUZAM-se (num canto certinho). As que nunca se cruzam, como os carris, são paralelas.", "tag": "retas-paralelas-perpendiculares" }, { "t": "concorrentes", "emoji": "✂️", "feedback": "As concorrentes também se cruzam, mas torto. As que nunca se tocam são as paralelas.", "tag": "retas-paralelas-perpendiculares" } ],
      "explain": "Paralelas caminham lado a lado e nunca se tocam." },
    { "q": "O canto certinho de uma folha é um ângulo...", "layout": "grid",
      "options": [ { "t": "reto", "emoji": "➕", "correct": true }, { "t": "agudo", "feedback": "O agudo é mais FECHADO que o canto da folha (menos de 90°). O canto certinho mede 90° — é o reto.", "tag": "angulo-tipo" }, { "t": "obtuso", "feedback": "O obtuso é mais ABERTO que o canto da folha (mais de 90°). O canto certinho é o ângulo reto, 90°.", "tag": "angulo-tipo" } ],
      "explain": "O canto certinho mede 90° — é o ângulo reto." },
    { "q": "Uma linha que não tem fim, dos dois lados, é uma...", "layout": "grid",
      "options": [ { "t": "reta", "emoji": "✏️", "correct": true }, { "t": "segmento", "feedback": "O segmento tem princípio e fim — é um bocadinho. A linha que não acaba dos dois lados é a reta.", "tag": "reta-segmento-semirreta" }, { "t": "ponto", "feedback": "O ponto é só uma marca pequenina, não uma linha. A linha sem fim dos dois lados é a reta.", "tag": "reta-segmento-semirreta" } ],
      "explain": "A reta segue para sempre dos dois lados." },
    { "q": "O lado de uma régua, com princípio e fim, é um...", "layout": "grid",
      "options": [ { "t": "segmento de reta", "emoji": "📏", "correct": true }, { "t": "reta sem fim", "feedback": "A reta não tem fim, mas o lado da régua tem princípio e fim. Isso é um segmento de reta.", "tag": "reta-segmento-semirreta" } ],
      "explain": "O segmento tem princípio e fim, como o lado da régua." },
    { "q": "Uma fatia fina de pizza tem um ângulo...", "layout": "grid",
      "options": [ { "t": "agudo", "emoji": "🍕", "correct": true }, { "t": "reto", "feedback": "O reto é o canto certinho (90°), bem mais aberto. A fatia fina é apertadinha — ângulo agudo.", "tag": "angulo-tipo" }, { "t": "obtuso", "feedback": "O obtuso é bem aberto (mais de 90°). A fatia fina é o contrário, apertadinha — é agudo.", "tag": "angulo-tipo" } ],
      "explain": "A fatia fina é apertadinha — ângulo agudo, menor que 90°." },
    { "q": "Um ângulo mais aberto que o canto da folha é...", "layout": "grid",
      "options": [ { "t": "obtuso", "emoji": "😮", "correct": true }, { "t": "agudo", "feedback": "O agudo é mais FECHADO que o canto da folha. Mais aberto que 90° é o obtuso.", "tag": "angulo-tipo" }, { "t": "reto", "feedback": "O reto é igual ao canto da folha (90°). Mais aberto que isso é o obtuso.", "tag": "angulo-tipo" } ],
      "explain": "Obtuso é maior que 90° — bem aberto." },
    { "q": "O ponto onde o ângulo começa chama-se...", "layout": "grid",
      "options": [ { "t": "vértice", "emoji": "📍", "correct": true }, { "t": "lado", "feedback": "Os lados são as duas semirretas que abrem a boca. O PONTO onde elas se juntam é o vértice.", "tag": "angulo-vertice" }, { "t": "régua", "feedback": "A régua é um instrumento, não faz parte do ângulo. O ponto onde o ângulo começa é o vértice.", "tag": "angulo-vertice" } ],
      "explain": "O vértice é o ponto onde os dois lados se juntam." },
    { "q": "Retas que se cruzam a fazer um canto certinho são...", "layout": "grid",
      "options": [ { "t": "perpendiculares", "emoji": "➕", "correct": true }, { "t": "paralelas", "emoji": "🚂", "feedback": "As paralelas NUNCA se cruzam. As que se cruzam num canto certinho (90°) são as perpendiculares.", "tag": "retas-paralelas-perpendiculares" } ],
      "explain": "Perpendiculares cruzam-se formando um ângulo reto (90°)." },
    { "q": "Quantos graus tem um ângulo reto?", "layout": "grid",
      "options": [ { "t": "90°", "correct": true }, { "t": "180°", "feedback": "180° é o ângulo raso — uma linha direita, o dobro do reto. O reto mede 90°.", "tag": "angulo-tipo" }, { "t": "10°", "feedback": "10° é um ângulo bem agudo, muito fechado. O reto, o canto certinho, mede 90°.", "tag": "angulo-tipo" } ],
      "explain": "O ângulo reto mede exatamente 90°." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-angulos-final",
  "final": true,
  "title": "Ângulos e retas",
  "questions": [
    { "q": "Um segmento de reta tem...", "layout": "grid",
      "options": [ { "t": "princípio e fim", "emoji": "📏", "correct": true }, { "t": "nenhum fim", "feedback": "Quem não tem fim é a reta. O segmento é um bocadinho, com princípio E fim, como o lado da régua.", "tag": "reta-segmento-semirreta" } ],
      "explain": "O segmento é um bocadinho da reta, com princípio e fim." },
    { "q": "Retas que se cruzam a fazer um canto certinho são...", "layout": "grid",
      "options": [ { "t": "perpendiculares", "emoji": "➕", "correct": true }, { "t": "paralelas", "emoji": "🚂", "feedback": "As paralelas NUNCA se cruzam. As que se cruzam num canto certinho (90°) são as perpendiculares.", "tag": "retas-paralelas-perpendiculares" } ],
      "explain": "Perpendiculares cruzam-se formando um ângulo reto (90°)." },
    { "q": "Um ângulo mais fechado que o canto da folha é...", "layout": "grid",
      "options": [ { "t": "agudo", "emoji": "🤏", "correct": true }, { "t": "reto", "feedback": "O reto É o canto da folha (90°), não mais fechado. Mais fechado que isso é o agudo.", "tag": "angulo-tipo" }, { "t": "obtuso", "feedback": "O obtuso é mais ABERTO que o canto da folha, não mais fechado. Mais fechado é o agudo.", "tag": "angulo-tipo" } ],
      "explain": "Agudo é apertadinho: mais pequeno que o reto." },
    { "q": "Um ângulo mais aberto que 90° é...", "layout": "grid",
      "options": [ { "t": "obtuso", "emoji": "😮", "correct": true }, { "t": "agudo", "feedback": "O agudo é mais FECHADO (menos de 90°). Mais aberto que 90° é o obtuso.", "tag": "angulo-tipo" }, { "t": "reto", "feedback": "O reto mede exatamente 90°. Mais aberto que isso já é o obtuso.", "tag": "angulo-tipo" } ],
      "explain": "Obtuso é maior que o reto — bem aberto." },
    { "q": "Os carris do comboio, que nunca se cruzam, são...", "layout": "grid",
      "options": [ { "t": "paralelas", "emoji": "🚂", "correct": true }, { "t": "perpendiculares", "emoji": "➕", "feedback": "As perpendiculares cruzam-se num canto certinho. Os carris andam lado a lado e nunca se tocam — são paralelas.", "tag": "retas-paralelas-perpendiculares" } ],
      "explain": "Andam lado a lado e nunca se tocam — são paralelas." },
    { "q": "As duas semirretas que abrem a boca do ângulo chamam-se...", "layout": "grid",
      "options": [ { "t": "lados", "emoji": "🐊", "correct": true }, { "t": "vértices", "feedback": "O vértice é só UM ponto, onde as semirretas se juntam. As duas semirretas são os lados.", "tag": "angulo-vertice" }, { "t": "pontos", "feedback": "Pontos são marcas pequeninas. As duas semirretas que abrem a boca chamam-se lados.", "tag": "angulo-vertice" } ],
      "explain": "Os lados são as semirretas; o vértice é só o ponto onde se juntam." },
    { "q": "Para medir um ângulo em graus usamos um...", "layout": "grid",
      "options": [ { "t": "transferidor", "emoji": "📐", "correct": true }, { "t": "termómetro", "emoji": "🌡️", "feedback": "O termómetro mede a temperatura, não ângulos. Para medir ângulos em graus usamos o transferidor.", "tag": "angulo-medir" } ],
      "explain": "O transferidor mede os ângulos em graus (°)." },
    { "q": "Uma linha direita (ângulo raso) mede...", "layout": "grid",
      "options": [ { "t": "180°", "correct": true }, { "t": "90°", "feedback": "90° é o ângulo reto, o canto certinho. O raso é uma linha direita, o dobro: 180°.", "tag": "angulo-tipo" }, { "t": "360°", "feedback": "360° é uma volta completa. Uma linha direita (ângulo raso) é meia volta: 180°.", "tag": "angulo-tipo" } ],
      "explain": "O ângulo raso é uma linha direita: 180°, o dobro do reto." },
    { "q": "O tamanho de um ângulo depende de...", "layout": "grid",
      "options": [ { "t": "quanto a boca abre", "emoji": "🐊", "correct": true }, { "t": "do comprimento dos lados", "feedback": "Não! Lados compridos NÃO fazem o ângulo maior. O tamanho depende só de quanto a boca abre.", "tag": "angulo-tamanho-abertura" } ],
      "explain": "Depende só da abertura, não do tamanho dos lados." }
  ]
}
```
