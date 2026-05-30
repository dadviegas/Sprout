# Rios, serras e cidades 🏞️

> [!NOTE] **O que vais aprender** 👀 Vais conhecer os **rios** maiores, as **serras** mais altas e as **cidades** mais conhecidas de Portugal — e até aprender a ler um mapa! 🗺️

Portugal é uma terra cheia de surpresas: tem **mar** azul, **rios** que correm para longe, **serras** com neve e **cidades** cheias de gente. Vem comigo numa viagem de norte a sul — vais ver que o nosso país é pequenino no mapa, mas tem de tudo! 🚗💨

## Os rios 🌊

Um **rio** é água doce que **nasce** lá no alto, nas montanhas, e corre devagarinho até ao **mar**. O sítio onde nasce chama-se **nascente**; o sítio onde chega ao mar chama-se **foz**. Pelo caminho, o rio dá água às pessoas, aos animais e às plantas. 💧

```keyvalue
[
  { "k": "Rio Tejo", "v": "o maior rio de Portugal; passa em Lisboa 🌉" },
  { "k": "Rio Douro", "v": "passa no Porto; tem vinhas nas margens para fazer vinho 🍇" },
  { "k": "Rio Mondego", "v": "o maior rio que nasce dentro de Portugal; passa em Coimbra 🚣" },
  { "k": "Rio Guadiana", "v": "corre lá no sul, perto do Algarve ☀️" }
]
```

> Repara: cada rio tem uma cidade ao lado. **Tejo → Lisboa**, **Douro → Porto**, **Mondego → Coimbra**. 🌊🏙️

## Qual é o maior? 📏

Nem todos os rios têm o mesmo tamanho. O **Tejo** é o mais comprido de todos — atravessa Espanha e Portugal! Olha como ele é maior do que os outros:

```meters
[
  { "label": "🌉 Tejo", "value": 10, "max": 10, "tone": "ok" },
  { "label": "🍇 Douro", "value": 8, "max": 10 },
  { "label": "☀️ Guadiana", "value": 7, "max": 10 },
  { "label": "🚣 Mondego", "value": 3, "max": 10 }
]
```

## As serras ⛰️

Uma **serra** é um conjunto de montanhas. A serra mais alta de Portugal **continental** é a **Serra da Estrela**. No inverno fica cheia de **neve** — é o único sítio do continente onde se pode esquiar e fazer bonecos de neve! ☃️

```keyvalue
[
  { "k": "Serra da Estrela", "v": "a mais alta do Continente; fica no centro 🏔️" },
  { "k": "O ponto mais alto", "v": "chama-se Torre, quase 2000 metros de altura 🧗" },
  { "k": "No inverno", "v": "fica branca de neve — dá para esquiar! ❄️" },
  { "k": "Queijo da Serra", "v": "ali faz-se um queijo muito famoso 🧀" }
]
```

## As cidades 🏙️

Numa **cidade** vivem muitas pessoas, com casas, escolas, hospitais e lojas. Estas são as cidades mais importantes de Portugal:

```steps
[
  { "title": "Lisboa", "body": "é a capital — onde está o governo do país; fica no rio Tejo 🏛️" },
  { "title": "Porto", "body": "a segunda maior cidade, no rio Douro, com a famosa ponte 🌉" },
  { "title": "Coimbra", "body": "famosa pela sua universidade muito antiga, no rio Mondego 🎓" },
  { "title": "Faro", "body": "a cidade principal do Algarve, no sul, com muito sol e praia ☀️" }
]
```

## Ler o mapa 🧭

Num mapa de Portugal, o **norte** fica em cima e o **sul** fica em baixo. O **mar** fica todo do lado esquerdo (a **oeste**) e a **Espanha**, nosso país vizinho, fica do lado direito (a **este**).

```compare
[
  { "title": "No Norte 🧭", "rows": [
    { "label": "Cidade", "value": "Porto" },
    { "label": "Rio", "value": "Douro 🍇" },
    { "label": "Tempo", "value": "mais fresco e com mais chuva 🌧️" }
  ] },
  { "title": "No Sul ☀️", "rows": [
    { "label": "Cidade", "value": "Faro" },
    { "label": "Rio", "value": "Guadiana" },
    { "label": "Tempo", "value": "mais quente e com mais sol 🏖️", "highlight": true }
  ] }
]
```

## Um exemplo passo a passo 🔍

Imagina que alguém te diz: *"Estou numa cidade com um grande rio, e à volta há vinhas para fazer vinho. Que cidade é?"* Vamos descobrir com calma! 🕵️

```steps
[
  { "title": "1. Há um grande rio", "body": "a cidade fica à beira de um rio importante 🌊" },
  { "title": "2. Há vinhas à volta", "body": "o rio com vinhas famosas nas margens é o Douro 🍇" },
  { "title": "3. Que cidade está no Douro?", "body": "é o Porto, a segunda maior cidade 🌉" },
  { "title": "4. Resposta!", "body": "a cidade é o Porto, no rio Douro 🏙️" }
]
```

> **Truque:** para não te enganares, lembra-te que a **capital** é a cidade onde **mandam** no país. Em Portugal é **Lisboa**, no rio **Tejo**! 🏛️

> [!TIP] **Para saberes mais** 🌱 O ponto mais alto da Serra da Estrela chama-se **Torre** e tem quase **2000 metros** de altura — mais alto que muitos prédios juntos! Mas o ponto mais alto de **todo** Portugal não fica no continente: é a **montanha do Pico**, na ilha do Pico, nos **Açores**, com **2351 metros**. É um vulcão adormecido! 🌋

## Vamos praticar 🎈

```quiz
{ "id": "mundo2-rios-serras-pratica", "questions": [
  { "q": "Qual é o maior rio de Portugal?", "layout": "grid", "options": [
    { "t": "Tejo", "emoji": "🌉", "correct": true },
    { "t": "Mondego", "emoji": "🚣" },
    { "t": "Guadiana", "emoji": "☀️" }
  ], "explain": "O Tejo é o maior rio e passa em Lisboa." },
  { "q": "Qual é a capital de Portugal?", "layout": "grid", "options": [
    { "t": "Porto", "emoji": "🌉" },
    { "t": "Lisboa", "emoji": "🏛️", "correct": true },
    { "t": "Faro", "emoji": "☀️" }
  ], "explain": "A capital é Lisboa, onde está o governo." },
  { "q": "Em que cidade passa o rio Mondego?", "layout": "grid", "options": [
    { "t": "Coimbra", "emoji": "🎓", "correct": true },
    { "t": "Lisboa", "emoji": "🌉" }
  ], "explain": "O Mondego passa em Coimbra, da universidade antiga." },
  { "q": "Onde nascem os rios?", "layout": "grid", "options": [
    { "t": "lá no alto, nas montanhas", "emoji": "⛰️", "correct": true },
    { "t": "no meio do mar", "emoji": "🌊" }
  ], "explain": "Nascem nas montanhas e correm até ao mar." },
  { "q": "Que rio passa no Porto?", "layout": "grid", "options": [
    { "t": "Douro", "emoji": "🍇", "correct": true },
    { "t": "Tejo", "emoji": "🌉" }
  ], "explain": "O rio Douro passa no Porto, com vinhas nas margens." },
  { "q": "Qual é a serra mais alta do Continente?", "layout": "grid", "options": [
    { "t": "Serra da Estrela", "emoji": "🏔️", "correct": true },
    { "t": "Serra do mar", "emoji": "🌊" }
  ], "explain": "É a Serra da Estrela, com neve no inverno." },
  { "q": "O que é a foz de um rio?", "layout": "grid", "options": [
    { "t": "o sítio onde o rio chega ao mar", "emoji": "🌊", "correct": true },
    { "t": "o nome de uma cidade", "emoji": "🏙️" }
  ], "explain": "A foz é onde o rio chega ao mar; a nascente é onde nasce." },
  { "q": "Num mapa, onde fica o norte?", "layout": "grid", "options": [
    { "t": "em cima", "emoji": "⬆️", "correct": true },
    { "t": "em baixo", "emoji": "⬇️" }
  ], "explain": "No mapa, o norte fica em cima e o sul em baixo." },
  { "q": "Qual cidade fica no sul, no Algarve?", "layout": "grid", "options": [
    { "t": "Faro", "emoji": "☀️", "correct": true },
    { "t": "Porto", "emoji": "🌉" }
  ], "explain": "Faro é a cidade principal do Algarve, no sul." }
] }
```

## 🎯 Questionário final

```quiz
{ "id": "mundo2-rios-serras-final", "final": true, "title": "Rios, serras e cidades", "questions": [
  { "q": "Qual é a serra mais alta de Portugal continental?", "layout": "grid", "options": [
    { "t": "Serra da Estrela", "emoji": "⛰️", "correct": true },
    { "t": "Serra do mar", "emoji": "🌊" }
  ], "explain": "É a Serra da Estrela — com neve no inverno!" },
  { "q": "Que cidade fica no rio Douro?", "layout": "grid", "options": [
    { "t": "Coimbra", "emoji": "🎓" },
    { "t": "Porto", "emoji": "🌉", "correct": true }
  ], "explain": "O Porto fica no rio Douro." },
  { "q": "Para onde correm os rios?", "layout": "grid", "options": [
    { "t": "Para o mar", "emoji": "🌊", "correct": true },
    { "t": "Para o céu", "emoji": "☁️" }
  ], "explain": "Os rios correm das montanhas até ao mar." },
  { "q": "Como se chama o ponto mais alto da Serra da Estrela?", "layout": "grid", "options": [
    { "t": "Torre", "emoji": "🏔️", "correct": true },
    { "t": "Castelo", "emoji": "🏰" }
  ], "explain": "Chama-se Torre — quase 2000 metros de altura!" },
  { "q": "Que cidade é famosa pela universidade muito antiga?", "layout": "grid", "options": [
    { "t": "Coimbra", "emoji": "🎓", "correct": true },
    { "t": "Faro", "emoji": "☀️" }
  ], "explain": "Coimbra, com a sua universidade antiga." },
  { "q": "Em que cidade passa o rio Tejo?", "layout": "grid", "options": [
    { "t": "Lisboa", "emoji": "🏛️", "correct": true },
    { "t": "Porto", "emoji": "🌉" }
  ], "explain": "O Tejo, o maior rio, passa em Lisboa, a capital." },
  { "q": "Onde fica o mar no mapa de Portugal?", "layout": "grid", "options": [
    { "t": "do lado esquerdo, a oeste", "emoji": "🌊", "correct": true },
    { "t": "do lado direito, a este", "emoji": "🇪🇸" }
  ], "explain": "O mar fica a oeste (esquerda); a Espanha fica a este (direita)." },
  { "q": "Que país é vizinho de Portugal?", "layout": "grid", "options": [
    { "t": "Espanha", "emoji": "🇪🇸", "correct": true },
    { "t": "Brasil", "emoji": "🇧🇷" }
  ], "explain": "A Espanha é o nosso país vizinho, do lado de este." },
  { "q": "Qual é o ponto mais alto de todo o Portugal?", "layout": "grid", "options": [
    { "t": "a montanha do Pico, nos Açores", "emoji": "🌋", "correct": true },
    { "t": "a Torre, na Serra da Estrela", "emoji": "🏔️" }
  ], "explain": "A montanha do Pico, nos Açores, é a mais alta, com 2351 metros." }
] }
```
