# Recolher e organizar dados 📋

> [!NOTE] **O que vais aprender** 👀 Vais aprender a **recolher dados** com risquinhos de contagem, a arrumá-los numa **tabela de frequência**, e a mostrá-los num **pictograma** e num **gráfico de barras** — para responderes a perguntas num instante! 📊

Imagina que queres saber qual é o animal de estimação preferido da tua turma. 🐶🐱🐰 Se perguntares a toda a gente ao mesmo tempo, ficas com uma confusão de respostas! Os matemáticos têm um truque: **contar com ordem**, **arrumar numa tabela** e depois **desenhar**. Assim qualquer pessoa percebe tudo num piscar de olhos. Vamos lá! 🚀

## 1.º — Recolher os dados com risquinhos ✏️

Quando contas votos um a um, fazes um **risquinho** (`|`) por cada resposta. Para não te perderes, juntas os riscos em **grupos de cinco**: quatro em pé e o quinto **atravessado**, assim `卌`. É muito mais fácil de contar depois!

```keyvalue
[
  { "k": "| | |", "v": "três risquinhos = 3 votos ✏️" },
  { "k": "卌", "v": "um grupo fechado = 5 votos (conta de 5 em 5!) ✋" },
  { "k": "卌 | |", "v": "5 + 2 = 7 votos 🧮" }
]
```

> [!TIP] Contar de **5 em 5** é o teu super-poder aqui: 5, 10, 15… e depois somas os que sobram. Muito mais rápido do que um a um! ⚡

## 2.º — Arrumar numa tabela de frequência 🗂️

A **frequência** é só uma palavra grande para **quantas vezes** cada coisa apareceu. Pões cada opção numa linha e, ao lado, a contagem.

| Animal preferido | Contagem | Frequência |
| --- | --- | --- |
| 🐶 Cão | 卌 \| \| \| | 8 |
| 🐱 Gato | 卌 | 5 |
| 🐰 Coelho | \| \| \| | 3 |
| 🐠 Peixe | \| \| \| \| | 4 |

```stats
[
  { "label": "Total de meninos", "value": "20", "hint": "8 + 5 + 3 + 4" },
  { "label": "Mais votado", "value": "Cão 🐶", "hint": "8 votos" },
  { "label": "Menos votado", "value": "Coelho 🐰", "hint": "3 votos" }
]
```

## 3.º — Mostrar num pictograma 🖼️

Um **pictograma** conta com **desenhos**. Aqui, cada 🐾 vale **1 voto**, por isso é só desenhar uma patinha por cada voto:

```compare
[
  { "title": "Votos (cada 🐾 = 1 voto)", "rows": [
    { "label": "🐶 Cão", "value": "🐾🐾🐾🐾🐾🐾🐾🐾  → 8", "highlight": true },
    { "label": "🐱 Gato", "value": "🐾🐾🐾🐾🐾  → 5" },
    { "label": "🐠 Peixe", "value": "🐾🐾🐾🐾  → 4" },
    { "label": "🐰 Coelho", "value": "🐾🐾🐾  → 3" }
  ] }
]
```

## 4.º — Mostrar num gráfico de barras 📊

Num **gráfico de barras**, cada animal tem uma barra: quanto **mais alta**, mais votos. Vês logo o vencedor sem contar nada!

```chart
{ "type": "bar", "title": "Animal preferido da turma",
  "labels": ["Cão", "Gato", "Peixe", "Coelho"], "data": [8, 5, 4, 3],
  "unit": "votos",
  "say": "O cão teve oito votos, o gato cinco, o peixe quatro e o coelho três." }
```

```keyvalue
[
  { "k": "Eixo de baixo", "v": "diz O QUÊ que comparamos (os animais) 🐾" },
  { "k": "Eixo do lado", "v": "diz QUANTOS — a escala de números 🔢" },
  { "k": "Barra mais alta", "v": "é o que tem MAIS votos 🏆" }
]
```

## Um exemplo passo a passo 🔍

*«Quantos meninos a mais preferem o cão do que o gato?»* Vamos com calma, a olhar para a tabela. 🐶🐱

```steps
[
  { "title": "1. Lê a pergunta", "body": "ela pede a DIFERENÇA entre o cão e o gato 🧐", "icon": "🔎" },
  { "title": "2. Procura na tabela", "body": "cão = 8 votos; gato = 5 votos 📋", "icon": "🗂️" },
  { "title": "3. Escolhe a operação", "body": "«quantos a mais» pede uma subtração: maior − menor ➖", "icon": "➖" },
  { "title": "4. Faz a conta", "body": "8 − 5 = 3 🧮", "icon": "🧮" },
  { "title": "5. Responde com sentido", "body": "o cão teve 3 votos a mais do que o gato ✅", "icon": "✅" }
]
```

> **Truque:** as palavrinhas mágicas das perguntas — «**a mais**» ou «**a menos**» pedem uma **subtração**; «**ao todo**» ou «**no total**» pedem uma **soma**. Sublinha-as antes de fazer a conta! ✏️

> [!TIP] **Para saberes mais** 🌱 Quando queres mostrar **bocadinhos de um todo** (como as fatias de uma piza 🍕), usas um **gráfico circular**. O círculo inteiro são todos os votos juntos, e cada fatia é uma parte. A maior fatia é a opção que mais ganhou!

```chart
{ "type": "pie", "title": "A mesma turma, em fatias",
  "labels": ["Cão", "Gato", "Peixe", "Coelho"], "data": [8, 5, 4, 3],
  "say": "O cão é a maior fatia do círculo, porque teve mais votos." }
```

## Vamos praticar 🎈

```quiz
{
  "id": "mat3-dados-pratica",
  "questions": [
    { "q": "Para contar votos com ordem, juntamos os risquinhos em grupos de…", "layout": "grid",
      "options": [ { "t": "5", "emoji": "✋", "correct": true }, { "t": "2", "emoji": "✌️", "feedback": "Em grupos de 2 era mais difícil de somar depois. Juntamos de 5 em 5, com o quinto risco atravessado.", "tag": "risquinhos-grupo-5" }, { "t": "10", "emoji": "🔟", "feedback": "10 é um grupo grande demais para contar de relance. Juntamos de 5 em 5 (quatro em pé + um atravessado).", "tag": "risquinhos-grupo-5" } ],
      "explain": "Juntamos de 5 em 5 (quatro em pé e o quinto atravessado) para contar depressa." },
    { "q": "Um grupo fechado (5) mais dois risquinhos vale quantos votos?", "layout": "grid",
      "options": [ { "t": "7", "emoji": "🧮", "correct": true }, { "t": "5", "feedback": "5 é só o grupo fechado — faltou somar os 2 risquinhos de fora: 5 + 2 = 7.", "tag": "risquinhos-grupo-5" }, { "t": "2", "feedback": "2 são só os risquinhos soltos — faltou o grupo de 5: 5 + 2 = 7.", "tag": "risquinhos-grupo-5" } ],
      "explain": "Um grupo de 5 mais 2 = 7." },
    { "q": "Na tabela dos animais, qual teve MAIS votos?", "layout": "grid",
      "options": [ { "t": "Cão (8)", "emoji": "🐶", "correct": true }, { "t": "Gato (5)", "emoji": "🐱", "feedback": "O gato teve 5 votos, mas o cão teve 8 — mais. Quem teve MAIS é o cão.", "tag": "dados-leitura-tabela" }, { "t": "Coelho (3)", "emoji": "🐰", "feedback": "O coelho teve só 3 votos, o menos de todos. Quem teve MAIS é o cão, com 8.", "tag": "dados-leitura-tabela" } ],
      "explain": "O cão teve 8 votos — o maior número." },
    { "q": "O que quer dizer «frequência»?", "layout": "grid",
      "options": [ { "t": "Quantas vezes cada coisa apareceu", "emoji": "🔢", "correct": true }, { "t": "A cor preferida", "emoji": "🎨", "feedback": "A cor é só uma das opções a votar. Frequência é «quantas vezes» — a contagem de cada opção.", "tag": "dados-vocabulario" }, { "t": "O nome do animal", "emoji": "🐾", "feedback": "O nome é o que se vota, não a frequência. Frequência é quantas vezes cada coisa apareceu.", "tag": "dados-vocabulario" } ],
      "explain": "Frequência é só «quantas vezes» — a contagem de cada opção." },
    { "q": "No pictograma, cada 🐾 vale 1. Quantos votos são 🐾🐾🐾🐾🐾?", "layout": "grid",
      "options": [ { "t": "5", "emoji": "🐾", "correct": true }, { "t": "10", "feedback": "10 seria se cada patinha valesse 2. Aqui cada 🐾 vale 1, por isso 5 patinhas = 5 votos.", "tag": "pictograma-valor" }, { "t": "2", "feedback": "Há 5 patinhas no desenho, não 2. Cada uma vale 1 voto: 5 patinhas = 5 votos.", "tag": "pictograma-contar" } ],
      "explain": "Cada patinha vale 1, por isso 5 patinhas = 5 votos." },
    { "q": "Quantos meninos a mais preferem o cão do que o gato?", "layout": "grid",
      "options": [ { "t": "3", "correct": true }, { "t": "5", "feedback": "5 são os votos do gato, não a diferença. «Quantos a mais» pede a subtração: 8 − 5 = 3.", "tag": "dados-diferenca" }, { "t": "8", "feedback": "8 são os votos do cão, não a diferença. «Quantos a mais» pede maior − menor: 8 − 5 = 3.", "tag": "dados-diferenca" } ],
      "explain": "8 − 5 = 3 votos a mais." },
    { "q": "Quantos meninos votaram ao todo? (8 + 5 + 4 + 3)", "layout": "grid",
      "options": [ { "t": "20", "emoji": "🧮", "correct": true }, { "t": "18", "feedback": "18 ficou 2 a menos — confere a soma. 8 + 5 + 4 + 3 = 20.", "tag": "dados-total" }, { "t": "16", "feedback": "16 ficou 4 a menos. Soma todas as frequências: 8 + 5 + 4 + 3 = 20.", "tag": "dados-total" } ],
      "explain": "8 + 5 + 4 + 3 = 20 meninos no total." },
    { "q": "Num gráfico de barras, a barra mais alta é a que tem…", "layout": "grid",
      "options": [ { "t": "mais votos", "emoji": "🏆", "correct": true }, { "t": "menos votos", "emoji": "🐭", "feedback": "A barra com menos votos é a mais BAIXA. Quanto mais alta a barra, mais votos tem.", "tag": "dados-leitura-grafico" } ],
      "explain": "Barra mais alta = mais quantidade." }
  ]
}
```

## 🎯 Questionário final

### A tabela dos animais 🐾

Olha para esta tabela sempre que precisares — é a mesma votação da turma!

| Animal preferido | Frequência |
| --- | --- |
| 🐶 Cão | 8 |
| 🐱 Gato | 5 |
| 🐠 Peixe | 4 |
| 🐰 Coelho | 3 |

```quiz
{
  "id": "mat3-dados-final",
  "final": true,
  "title": "Recolher e organizar dados",
  "questions": [
    { "q": "Quando contamos votos um a um, fazemos um…", "layout": "grid",
      "options": [ { "t": "risquinho por cada voto", "emoji": "✏️", "correct": true }, { "t": "desenho de uma casa", "emoji": "🏠", "feedback": "Não desenhamos casas para contar votos. Fazemos um risquinho por cada voto, em grupos de 5.", "tag": "dados-vocabulario" } ],
      "explain": "Fazemos um risquinho por cada resposta, em grupos de 5." },
    { "q": "Uma tabela de frequência arruma os dados em…", "layout": "grid",
      "options": [ { "t": "linhas e colunas", "emoji": "🗂️", "correct": true }, { "t": "círculos", "emoji": "⭕", "feedback": "Os círculos são para o gráfico circular. A tabela arruma os dados em linhas e colunas.", "tag": "dados-vocabulario" } ],
      "explain": "Cada opção fica numa linha, com a contagem ao lado." },
    { "q": "Qual animal foi o MENOS votado?", "layout": "grid",
      "options": [ { "t": "Coelho (3)", "emoji": "🐰", "correct": true }, { "t": "Cão (8)", "emoji": "🐶", "feedback": "O cão teve 8 votos — foi o MAIS votado, não o menos. O menos votado é o coelho, com 3.", "tag": "dados-leitura-tabela" }, { "t": "Peixe (4)", "emoji": "🐠", "feedback": "O peixe teve 4 votos, mas o coelho teve menos: 3. O MENOS votado é o coelho.", "tag": "dados-leitura-tabela" } ],
      "explain": "O coelho, com 3 votos, foi o menos escolhido." },
    { "q": "O risquinho 卌 sozinho vale…", "layout": "grid",
      "options": [ { "t": "5", "emoji": "✋", "correct": true }, { "t": "4", "feedback": "São 4 riscos em pé mais o atravessado — esse também conta. O grupo fechado vale 5.", "tag": "risquinhos-grupo-5" }, { "t": "1", "feedback": "Um grupo fechado não vale 1, vale 5 (quatro em pé + o quinto atravessado).", "tag": "risquinhos-grupo-5" } ],
      "explain": "Um grupo fechado de risquinhos vale 5." },
    { "q": "Num pictograma, o que nos diz quanto vale cada desenho?", "layout": "grid",
      "options": [ { "t": "a legenda", "emoji": "🔑", "correct": true }, { "t": "o título do livro", "emoji": "📕", "feedback": "O título de um livro não tem nada a ver com o gráfico. Quem diz quanto vale cada desenho é a legenda.", "tag": "pictograma-valor" } ],
      "explain": "A legenda diz o valor de cada símbolo (aqui, cada 🐾 = 1)." },
    { "q": "Para que serve um gráfico de barras?", "layout": "grid",
      "options": [ { "t": "Comparar quantidades de relance", "emoji": "📊", "correct": true }, { "t": "Contar histórias", "emoji": "📖", "feedback": "Histórias contam-se com palavras, não com barras. O gráfico de barras serve para comparar quantidades de relance.", "tag": "dados-tipo-grafico" } ],
      "explain": "Ajuda a ver logo qual tem mais e qual tem menos." },
    { "q": "Que gráfico mostra os bocadinhos de um todo, como fatias de piza?", "layout": "grid",
      "options": [ { "t": "O gráfico circular", "emoji": "🍕", "correct": true }, { "t": "O risquinho", "emoji": "✏️", "feedback": "O risquinho serve para contar votos um a um, não para mostrar fatias. As fatias de um todo mostram-se no gráfico circular.", "tag": "dados-tipo-grafico" } ],
      "explain": "O gráfico circular mostra cada parte como uma fatia do círculo." },
    { "q": "Na pergunta «quantos a mais?», que conta fazemos?", "layout": "grid",
      "options": [ { "t": "Uma subtração (maior − menor)", "emoji": "➖", "correct": true }, { "t": "Uma multiplicação", "emoji": "✖️", "feedback": "Multiplicar é para grupos iguais. «Quantos a mais» pergunta a diferença: fazemos uma subtração (maior − menor).", "tag": "dados-diferenca" } ],
      "explain": "«A mais» ou «a menos» pedem quase sempre uma subtração." }
  ]
}
```
