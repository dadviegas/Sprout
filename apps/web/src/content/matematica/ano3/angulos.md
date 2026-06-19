# Os ângulos 🐊

> [!NOTE] **O que vais aprender** 👀 O que é um **ângulo** (uma boca de crocodilo a abrir!), e os quatro nomes que tens de conhecer: **reto**, **agudo**, **obtuso** e **raso**. Sem números nem contas — só com o **canto de uma folha** como medidor secreto. 📄

Abre um livro só um bocadinho… agora abre-o mais… e mais! 📖 A **abertura** que ele faz tem um nome em matemática: **ângulo**. Os ângulos estão escondidos por todo o lado — nas tesouras, nas portas, nos ponteiros do relógio. Hoje vais aprender a chamá-los pelo nome! 🕵️

## O que é um ângulo? 🐊

Um **ângulo** é a **abertura** entre dois lados que partem do mesmo ponto — como uma **boca de crocodilo**: quanto mais abre, **maior** é o ângulo. O ponto onde os lados se juntam chama-se **vértice**.

Atenção ao engano mais famoso: o ângulo **não depende** do comprimento dos lados — um crocodilo bebé e um crocodilo gigante podem abrir a boca **exatamente o mesmo**! Só conta **quanto abre**. 🐊

Experimenta! Arrasta a ponta (ou usa os botões − e +) para abrir e fechar a boca e vê o nome do ângulo a mudar:

```angle
{ "title": "Abre e fecha a boca do crocodilo!", "angle": 45 }
```

## O ângulo reto: o canto certinho ➕

O **reto** é o chefe dos ângulos — é o **canto certinho** de uma folha de papel, de uma janela, de um azulejo. Quando um ângulo é reto, desenha-se um **quadradinho** no vértice, para toda a gente saber. ⬛

```angle
{ "title": "Reto — o canto certinho da folha", "angle": 90, "interactive": false }
```

## Agudo e obtuso: mais fechado, mais aberto 🤏😮

Os outros ângulos comparam-se sempre com o reto:

- **Agudo**: a boca está **mais fechada** que o canto da folha — um ângulo **a**pertadinho. 🤏
- **Obtuso**: a boca está **mais aberta** que o canto da folha — bem escancarada. 😮

```angle
{ "title": "Agudo — mais fechado que o canto", "angle": 40, "interactive": false, "color": "ok" }
```

```angle
{ "title": "Obtuso — mais aberto que o canto", "angle": 135, "interactive": false, "color": "accent" }
```

## O ângulo raso: a boca toda aberta 😱

E se o crocodilo abrir a boca **ao máximo**, até os dois lados ficarem numa **linha direita**? Esse é o ângulo **raso** — parece que o ângulo «desapareceu», mas está lá: é uma abertura tão grande que os lados ficam esticados, como um livro **completamente aberto** em cima da mesa. 📖

```angle
{ "title": "Raso — os lados numa linha direita", "angle": 180, "interactive": false, "color": "edm" }
```

```compare
[
  { "title": "Agudo 🤏", "rows": [ { "label": "a boca", "value": "mais fechada que o canto" }, { "label": "exemplo", "value": "bico da tesoura quase fechada ✂️" } ] },
  { "title": "Reto ➕", "highlight": true, "rows": [ { "label": "a boca", "value": "o canto certinho da folha", "highlight": true }, { "label": "exemplo", "value": "canto do livro 📕", "highlight": true } ] },
  { "title": "Obtuso 😮", "rows": [ { "label": "a boca", "value": "mais aberta que o canto" }, { "label": "exemplo", "value": "porta bem aberta 🚪" } ] },
  { "title": "Raso 📏", "rows": [ { "label": "a boca", "value": "toda aberta — uma linha direita" }, { "label": "exemplo", "value": "livro aberto na mesa 📖" } ] }
]
```

## Caça aos ângulos lá por casa 🔭

```stats
[
  { "label": "Canto do caderno", "value": "reto", "hint": "certinho como a folha ➕" },
  { "label": "Tesoura quase fechada", "value": "agudo", "hint": "apertadinho ✂️" },
  { "label": "Porta escancarada", "value": "obtuso", "hint": "mais aberta que o canto 🚪" },
  { "label": "Livro aberto na mesa", "value": "raso", "hint": "uma linha direita 📖" }
]
```

## Um exemplo passo a passo 🔍

A porta do quarto está entreaberta. Que ângulo faz com a parede? 🚪

```steps
[
  { "title": "1. Vê a abertura", "body": "a porta abriu só um bocadinho — uma boca quase fechada 🚪", "icon": "👀" },
  { "title": "2. Pega no medidor secreto", "body": "o canto de uma folha de papel 📄", "icon": "📄" },
  { "title": "3. Compara", "body": "a abertura é MAIS PEQUENA que o canto da folha", "icon": "🤏" },
  { "title": "4. Dá-lhe o nome", "body": "mais fechado que o reto → é um ângulo AGUDO! 🎉", "icon": "🎉" }
]
```

> **Truque:** o **canto de uma folha** é o teu medidor secreto! 📄 Encosta-o à abertura: se **encaixar certinho** → **reto**; se a abertura for **mais pequena** → **agudo** (o **a**pertadinho); se for **maior** → **obtuso**. E se os lados ficarem **esticados numa linha** → **raso**. 🐊

> [!TIP] **Para saberes mais** 🌱 No 4.º ano vais aprender que os ângulos se medem em **graus (°)**, com um instrumento chamado **transferidor**: o reto mede **90°**, o raso **180°** e uma volta completa **360°** — é por isso que dizemos «dar uma volta de 360 graus»! 🔄

## Vamos praticar 🎈

```quiz
{
  "id": "mat-3-angulos-pratica",
  "questions": [
    { "q": "Um ângulo é…", "layout": "grid",
      "options": [ { "t": "a abertura entre dois lados", "emoji": "🐊", "correct": true }, { "t": "uma linha curva", "feedback": "Um ângulo não é uma curva: é a abertura entre dois lados com o mesmo vértice.", "tag": "angulo-definicao" }, { "t": "um número", "feedback": "O ângulo é a abertura entre dois lados, não um número.", "tag": "angulo-definicao" } ],
      "explain": "É a abertura da boca do crocodilo — entre dois lados com o mesmo vértice." },
    { "q": "O canto certinho de uma folha é um ângulo…", "layout": "grid",
      "options": [ { "t": "reto", "emoji": "➕", "correct": true }, { "t": "agudo", "feedback": "Agudo é mais fechado que o canto. O canto certinho é o ângulo reto.", "tag": "angulo-tipo" }, { "t": "obtuso", "feedback": "Obtuso é mais aberto. O canto certinho é o reto.", "tag": "angulo-tipo" } ],
      "explain": "O reto é o canto certinho — o chefe dos ângulos." },
    { "q": "Um ângulo mais fechado que o canto da folha é…", "layout": "grid",
      "options": [ { "t": "agudo", "emoji": "🤏", "correct": true }, { "t": "obtuso", "feedback": "Obtuso é mais ABERTO que o canto. Mais fechado é agudo.", "tag": "angulo-tipo" }, { "t": "raso", "feedback": "Raso é o mais aberto de todos. Mais fechado é agudo.", "tag": "angulo-tipo" } ],
      "explain": "Agudo = apertadinho, mais pequeno que o reto." },
    { "q": "Um ângulo mais aberto que o canto da folha é…", "layout": "grid",
      "options": [ { "t": "obtuso", "emoji": "😮", "correct": true }, { "t": "agudo", "feedback": "Agudo é mais FECHADO. Mais aberto que o canto é obtuso.", "tag": "angulo-tipo" }, { "t": "reto", "feedback": "Reto é o próprio canto. Mais aberto é obtuso.", "tag": "angulo-tipo" } ],
      "explain": "Obtuso = escancarado, maior que o reto." },
    { "q": "O ponto onde os dois lados se juntam chama-se…", "layout": "grid",
      "options": [ { "t": "vértice", "emoji": "📍", "correct": true }, { "t": "perímetro", "feedback": "Perímetro é a volta de uma figura. O ponto dos lados é o vértice.", "tag": "angulo-vertice" }, { "t": "régua", "feedback": "A régua serve para medir. O ponto dos lados é o vértice.", "tag": "angulo-vertice" } ],
      "explain": "O vértice é a «dobradiça» da boca do crocodilo." },
    { "q": "Um livro completamente aberto na mesa faz um ângulo…", "layout": "grid",
      "options": [ { "t": "raso", "emoji": "📖", "correct": true }, { "t": "reto", "feedback": "Reto é o canto certinho. O livro todo aberto faz uma linha: raso.", "tag": "angulo-tipo" }, { "t": "agudo", "feedback": "Agudo é apertadinho. O livro todo aberto é raso (uma linha).", "tag": "angulo-tipo" } ],
      "explain": "Os lados ficam esticados numa linha direita — raso." },
    { "q": "O tamanho de um ângulo depende…", "layout": "list",
      "options": [ { "t": "de quanto a boca abre", "emoji": "🐊", "correct": true }, { "t": "do comprimento dos lados", "feedback": "Lados compridos não fazem o ângulo maior. Só conta a abertura.", "tag": "angulo-tamanho-abertura" }, { "t": "da cor do desenho", "feedback": "A cor não tem nada a ver. O tamanho é a abertura.", "tag": "angulo-tamanho-abertura" } ],
      "explain": "Só conta a abertura — lados compridos não fazem o ângulo maior!" },
    { "q": "Uma tesoura quase fechada faz um ângulo…", "layout": "grid",
      "options": [ { "t": "agudo", "emoji": "✂️", "correct": true }, { "t": "obtuso", "feedback": "Obtuso é bem aberto. Quase fechada é apertadinho: agudo.", "tag": "angulo-tipo" }, { "t": "raso", "feedback": "Raso é todo aberto numa linha. Quase fechada é agudo.", "tag": "angulo-tipo" } ],
      "explain": "Quase fechada = apertadinho = agudo." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-3-angulos-final",
  "final": true,
  "title": "Os ângulos",
  "questions": [
    { "q": "Quanto mais a boca do crocodilo abre…", "layout": "grid",
      "options": [ { "t": "maior é o ângulo", "emoji": "🐊", "correct": true }, { "t": "menor é o ângulo", "feedback": "Ao contrário: mais aberta a boca, MAIOR o ângulo.", "tag": "angulo-tamanho-abertura" }, { "t": "o ângulo não muda", "feedback": "Muda sim: o ângulo é a abertura. Mais aberto = maior.", "tag": "angulo-tamanho-abertura" } ],
      "explain": "O ângulo é a abertura: mais aberto = maior." },
    { "q": "O medidor secreto dos ângulos é…", "layout": "grid",
      "options": [ { "t": "o canto de uma folha", "emoji": "📄", "correct": true }, { "t": "uma balança", "feedback": "A balança pesa. Para comparar ângulos usas o canto da folha (reto).", "tag": "angulo-medir" }, { "t": "um copo de água", "feedback": "O copo não mede ângulos. Comparas com o canto da folha (reto).", "tag": "angulo-medir" } ],
      "explain": "Comparas a abertura com o canto da folha (o ângulo reto)." },
    { "q": "Se a abertura encaixa certinha no canto da folha, o ângulo é…", "layout": "grid",
      "options": [ { "t": "reto", "emoji": "➕", "correct": true }, { "t": "agudo", "feedback": "Agudo é mais fechado que o canto. Encaixar certinho = reto.", "tag": "angulo-tipo" }, { "t": "obtuso", "feedback": "Obtuso é mais aberto. Encaixar certinho no canto = reto.", "tag": "angulo-tipo" } ],
      "explain": "Encaixa no canto = reto." },
    { "q": "Qual destes ângulos é AGUDO?", "layout": "grid",
      "options": [ { "t": "o bico da tesoura quase fechada", "emoji": "✂️", "correct": true }, { "t": "o canto do caderno", "emoji": "📕", "feedback": "O canto do caderno é reto (certinho). O agudo é a tesoura quase fechada.", "tag": "angulo-tipo" }, { "t": "o livro aberto na mesa", "emoji": "📖", "feedback": "O livro aberto é raso. O agudo é a tesoura quase fechada.", "tag": "angulo-tipo" } ],
      "explain": "A tesoura quase fechada é mais apertada que o canto — agudo." },
    { "q": "Qual destes ângulos é OBTUSO?", "layout": "grid",
      "options": [ { "t": "a porta escancarada", "emoji": "🚪", "correct": true }, { "t": "o canto da janela", "emoji": "🪟", "feedback": "O canto da janela é reto. O obtuso é a porta escancarada.", "tag": "angulo-tipo" }, { "t": "a tesoura quase fechada", "emoji": "✂️", "feedback": "A tesoura quase fechada é aguda. O obtuso é a porta escancarada.", "tag": "angulo-tipo" } ],
      "explain": "Mais aberta que o canto da folha — obtuso." },
    { "q": "No ângulo raso, os dois lados ficam…", "layout": "grid",
      "options": [ { "t": "esticados numa linha direita", "emoji": "📏", "correct": true }, { "t": "em cima um do outro", "feedback": "Em cima um do outro seria fechado. Raso é esticado numa linha.", "tag": "angulo-tipo" }, { "t": "num canto certinho", "feedback": "Canto certinho é o reto. Raso é os lados numa linha direita.", "tag": "angulo-tipo" } ],
      "explain": "Raso = boca toda aberta, os lados fazem uma linha." },
    { "q": "No vértice de um ângulo reto desenha-se…", "layout": "grid",
      "options": [ { "t": "um quadradinho", "emoji": "⬛", "correct": true }, { "t": "uma estrela", "feedback": "O sinal do ângulo reto é um quadradinho, não uma estrela.", "tag": "angulo-vertice" }, { "t": "um círculo", "feedback": "O sinal do ângulo reto é um quadradinho, não um círculo.", "tag": "angulo-vertice" } ],
      "explain": "O quadradinho é o sinal de «aqui o canto é certinho»." },
    { "q": "Dois crocodilos abrem a boca o mesmo, mas um é gigante. Qual tem o ângulo maior?", "layout": "list",
      "options": [ { "t": "nenhum — os ângulos são iguais!", "emoji": "🤝", "correct": true }, { "t": "o gigante", "feedback": "O tamanho dos lados não conta. Abrem igual: os ângulos são iguais.", "tag": "angulo-tamanho-abertura" }, { "t": "o bebé", "feedback": "O tamanho não conta para o ângulo. Abrem igual: são iguais.", "tag": "angulo-tamanho-abertura" } ],
      "explain": "O ângulo só depende da abertura, não do tamanho dos lados." },
    { "q": "Do mais fechado para o mais aberto, a ordem é…", "layout": "list",
      "options": [ { "t": "agudo → reto → obtuso → raso", "emoji": "🐊", "correct": true }, { "t": "raso → obtuso → reto → agudo", "feedback": "Isso é do mais aberto para o mais fechado. Ao contrário: agudo, reto, obtuso, raso.", "tag": "angulo-ordem" }, { "t": "reto → agudo → raso → obtuso", "feedback": "A ordem certa é a boca a abrir: agudo, reto, obtuso, raso.", "tag": "angulo-ordem" } ],
      "explain": "A boca vai abrindo: agudo, reto, obtuso e por fim raso." }
  ]
}
```
