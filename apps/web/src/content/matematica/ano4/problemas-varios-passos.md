# Resolver problemas 2: vários passos 🕵️

> [!NOTE] **O que vais aprender** 👀 Já dominas o plano dos 4 passos. Agora vem o **nível a sério**, o das provas: problemas de **2 e 3 passos** com conversões de medidas (litros e mililitros, quilos e gramas), **troco** com dinheiro e divisões em que o **resto** decide a resposta. E vais aprender a desarmar as **armadilhas**! 🪤

Nos problemas de vários passos, a primeira conta quase nunca é a resposta — é só um degrau. O segredo dos detetives: resolver **um passo de cada vez** e desconfiar das respostas que parecem fáceis de mais. Em cada problema abaixo, **pensa primeiro** e só depois carrega para revelar o passo seguinte! 🧠

## As conversões que tens de saber de cor 📏

Antes de fazer contas, os dados têm de estar **na mesma unidade**. Guarda estas:

```keyvalue
[
  { "k": "1 litro (l)", "v": "= 100 cl = 1000 ml 🧴 (uma lata de sumo tem 33 cl)" },
  { "k": "1 quilograma (kg)", "v": "= 1000 g ⚖️ (um pacote de massa tem 500 g)" },
  { "k": "1 quilómetro (km)", "v": "= 1000 m 🛣️ (dás mil passos grandes!)" },
  { "k": "1 euro (€)", "v": "= 100 cêntimos 💶" }
]
```

## Problema 1 — a água e os copos 🥛

*«Com 1,5 l de água encho 7 copos de 200 ml. Quantos copos encho com 4 vezes mais água?»*

Pensa primeiro: qual é o caminho? Depois revela passo a passo:

```steps
{ "reveal": true, "items": [
  { "title": "1. O que pergunta?", "body": "quantos copos de 200 ml encho com 4 vezes mais água do que 1,5 l 🔍", "icon": "search" },
  { "title": "2. Calcula a água nova", "body": "4 × 1,5 l = 6 l de água 💧", "icon": "✖️" },
  { "title": "3. Põe tudo na mesma unidade", "body": "os copos estão em ml, por isso 6 l = 6000 ml 📏", "icon": "ruler" },
  { "title": "4. Divide pela medida do copo", "body": "6000 ÷ 200 = 30 🥛", "icon": "➗" },
  { "title": "5. Responde com uma frase", "body": "encho 30 copos de 200 ml ✅", "icon": "check" }
] }
```

```math
{ "expr": "6000 ÷ 200 = 30", "say": "seis mil mililitros a dividir por duzentos dá trinta copos" }
```

> [!WARNING] **A armadilha! 🪤** Muita gente responde «7 × 4 = **28** copos» — e erra. Porquê? Porque os 7 copos **não gastavam a água toda**: 7 × 200 ml = 1400 ml, e 1,5 l são 1500 ml — sobravam 100 ml! Com 4 vezes mais água, sobram 4 × 100 = 400 ml… que enchem **mais 2 copos**. Por isso a resposta certa é **30**, não 28. Nunca multipliques a resposta antiga — refaz as contas com os dados novos!

## Problema 2 — o troco do lanche 💶

*«A mãe comprou um livro por 12,40 € e um jogo por 8,75 €. Pagou com uma nota de 50 €. Quanto recebeu de troco?»*

```steps
{ "reveal": true, "items": [
  { "title": "1. O que pergunta?", "body": "o troco — ou seja, o que sobra dos 50 € depois de pagar tudo 🔍", "icon": "search" },
  { "title": "2. Junta as compras", "body": "12,40 + 8,75 = 21,15 € (alinha as vírgulas!) 🛒", "icon": "➕" },
  { "title": "3. Tira ao dinheiro entregue", "body": "50,00 − 21,15 = 28,85 € 💶", "icon": "➖" },
  { "title": "4. Responde com uma frase", "body": "a mãe recebeu 28,85 € de troco ✅", "icon": "check" }
] }
```

```math
{ "expr": "50,00 − 21,15 = 28,85", "say": "cinquenta euros menos vinte e um euros e quinze cêntimos dá vinte e oito euros e oitenta e cinco cêntimos" }
```

> [!TIP] Nos problemas de dinheiro há quase sempre **dois passos escondidos**: primeiro o **total** da compra, só depois o **troco**. Quem subtrai logo o primeiro preço aos 50 € cai na armadilha! 🪤

## Problema 3 — o resto que manda 🥚

*«Uma quinta tem 260 ovos para guardar em caixas de 12. Quantas caixas são precisas para guardar todos os ovos?»*

```steps
{ "reveal": true, "items": [
  { "title": "1. O que pergunta?", "body": "quantas caixas para guardar TODOS os ovos — nenhum pode ficar de fora 🔍", "icon": "search" },
  { "title": "2. Divide", "body": "260 ÷ 12 = 21, resto 8 ➗", "icon": "➗" },
  { "title": "3. Olha para o resto", "body": "21 caixas guardam 252 ovos… mas sobram 8 ovos sem casa! 🥚", "icon": "🥚" },
  { "title": "4. Interpreta", "body": "esses 8 ovos precisam de mais uma caixa (mesmo não ficando cheia) 📦", "icon": "📦" },
  { "title": "5. Responde com uma frase", "body": "são precisas 22 caixas ✅", "icon": "check" }
] }
```

> [!WARNING] **O resto decide a resposta! 🪤** Às vezes arredondas para **cima** (preciso de mais uma caixa, mais um autocarro…), às vezes deitas o resto **fora** (quantas pulseiras completas faço com estas contas?). A conta é igual — a **pergunta** é que manda. Lê-a duas vezes!

> **Truque:** antes de pegar no lápis, responde a três perguntas: **«Quantos passos tem este problema?»**, **«As unidades são todas iguais?»** e **«O que faço ao resto?»** Quem pergunta primeiro, não cai na armadilha. 🕵️

> [!TIP] **Para saberes mais** 🌱 Estes problemas com armadilha são mesmo os das **provas de aferição** — e a armadilha tem nome: **distrator**. Quem faz as provas inventa de propósito a resposta errada «tentadora» (como o 28 dos copos) para apanhar quem tem pressa. Agora que sabes o segredo deles, já não te apanham! 😎

## Vamos praticar 🎈

```quiz
{
  "id": "mat4-prob2-pratica",
  "questions": [
    { "q": "Três garrafas de 33 cl chegam para encher 1 litro?", "emoji": "🧴", "layout": "grid",
      "options": [ { "t": "não — dão 99 cl, falta 1 cl", "correct": true }, { "t": "sim — dão mesmo 1 litro" }, { "t": "sim — e ainda sobra muito" } ],
      "explain": "3 × 33 = 99 cl, e 1 l = 100 cl. Por um cêntimo de litro… não chega!" },
    { "q": "Numa escola de 240 alunos, 1/4 vai de autocarro. Quantos vão de autocarro?", "emoji": "🚌", "layout": "grid",
      "options": [ { "t": "60", "correct": true }, { "t": "240" }, { "t": "120" } ],
      "explain": "1/4 de 240 = 240 ÷ 4 = 60 alunos." },
    { "q": "Comprei 2 pacotes de 250 g de bolachas. Quantos gramas faltam para 1 kg?", "emoji": "🍪", "layout": "grid",
      "options": [ { "t": "500 g", "correct": true }, { "t": "750 g" }, { "t": "250 g" } ],
      "explain": "Dois passos: 2 × 250 = 500 g; 1 kg = 1000 g; 1000 − 500 = 500 g." },
    { "q": "Três bilhetes de 6,50 € pagos com 20 €. Qual é o troco?", "emoji": "🎟️", "layout": "grid",
      "options": [ { "t": "0,50 €", "correct": true }, { "t": "13,50 €" }, { "t": "1,50 €" } ],
      "explain": "3 × 6,50 = 19,50 €; 20 − 19,50 = 0,50 €." },
    { "q": "Uma corrida tem 5 km. O Rui já correu 3200 m. Quanto lhe falta?", "emoji": "🏃", "layout": "grid",
      "options": [ { "t": "1800 m", "correct": true }, { "t": "2800 m" }, { "t": "1200 m" } ],
      "explain": "5 km = 5000 m; 5000 − 3200 = 1800 m." },
    { "q": "Tenho 7 caixas de 6 ovos e preciso de 50 ovos. Quantos faltam?", "emoji": "🥚", "layout": "grid",
      "options": [ { "t": "8", "correct": true }, { "t": "43" }, { "t": "2" } ],
      "explain": "7 × 6 = 42 ovos; 50 − 42 = 8 ovos em falta." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat4-prob2-final",
  "final": true,
  "title": "Problemas de vários passos",
  "questions": [
    { "q": "Com 2 l de água encho copos de 250 ml. Com 3 vezes mais água, quantos copos encho?", "emoji": "🥛", "layout": "grid",
      "options": [ { "t": "24", "correct": true }, { "t": "8" }, { "t": "12" } ],
      "explain": "3 × 2 l = 6 l = 6000 ml; 6000 ÷ 250 = 24 copos." },
    { "q": "Comprei ténis por 24,60 € e meias por 3,25 €. Paguei com 30 €. O troco é…", "emoji": "👟", "layout": "grid",
      "options": [ { "t": "2,15 €", "correct": true }, { "t": "5,40 €" }, { "t": "2,85 €" } ],
      "explain": "24,60 + 3,25 = 27,85 €; 30 − 27,85 = 2,15 €." },
    { "q": "130 alunos vão de visita em autocarros de 50 lugares. Quantos autocarros são precisos?", "emoji": "🚌", "layout": "grid",
      "options": [ { "t": "3", "correct": true }, { "t": "2" }, { "t": "2 e meio" } ],
      "explain": "130 ÷ 50 = 2, resto 30 — esses 30 alunos precisam de mais um autocarro: 3!" },
    { "q": "Uma lata tem 33 cl. Quantos mililitros têm 2 latas?", "emoji": "🥤", "layout": "grid",
      "options": [ { "t": "660 ml", "correct": true }, { "t": "66 ml" }, { "t": "6600 ml" } ],
      "explain": "33 cl = 330 ml; 2 × 330 = 660 ml." },
    { "q": "Numa escola com 320 alunos, 1/4 almoça em casa. Quantos almoçam NA ESCOLA?", "emoji": "🍽️", "layout": "grid",
      "options": [ { "t": "240", "correct": true }, { "t": "80" }, { "t": "316" } ],
      "explain": "Dois passos: 320 ÷ 4 = 80 almoçam em casa; 320 − 80 = 240 na escola. (O 80 era a armadilha!)" },
    { "q": "Um saco tem 1,5 kg de maçãs. Quantos gramas têm 2 sacos?", "emoji": "🍎", "layout": "grid",
      "options": [ { "t": "3000 g", "correct": true }, { "t": "300 g" }, { "t": "1502 g" } ],
      "explain": "1,5 kg = 1500 g; 2 × 1500 = 3000 g (3 kg)." },
    { "q": "O caminho da escola tem 1 km e 200 m. Quantos metros andas em ida E volta?", "emoji": "🚶", "layout": "grid",
      "options": [ { "t": "2400 m", "correct": true }, { "t": "1200 m" }, { "t": "2200 m" } ],
      "explain": "1 km 200 m = 1200 m; ida e volta: 2 × 1200 = 2400 m." },
    { "q": "Faço pulseiras com 9 contas cada e tenho 75 contas. Quantas pulseiras COMPLETAS faço?", "emoji": "📿", "layout": "grid",
      "options": [ { "t": "8", "correct": true }, { "t": "9" }, { "t": "75" } ],
      "explain": "75 ÷ 9 = 8, resto 3. Aqui o resto deita-se fora: só 8 pulseiras completas." }
  ]
}
```
