# Gráficos e tabelas 📊

> [!NOTE] **O que vais aprender** 👀 Vais aprender a **organizar dados** em tabelas e a **lê-los num instante** com gráficos de barras, pictogramas e gráficos de pontos — e ainda a descobrir o **máximo**, o **mínimo** e a **moda**!

Imagina que perguntaste à tua turma toda qual é o gelado preferido. Ficas com um monte de respostas baralhadas na cabeça! 🍦🍦🍦 Para pores tudo arrumado e perceberes logo qual ganhou, usas **tabelas** e **gráficos**. São como gavetas e fotografias dos números: arrumam a informação e mostram-na de relance. Vamos a isto! 🚀

## A tabela — informação arrumada 🗂️

Uma **tabela** organiza os dados em **linhas** (deitadas) e **colunas** (em pé). No cruzamento de uma linha com uma coluna fica cada valor. A última coluna costuma ter a **contagem** (quantas vezes).

| Fruta preferida | Votos |
| --- | --- |
| 🍎 Maçã | 5 |
| 🍌 Banana | 3 |
| 🍓 Morango | 8 |
| 🍇 Uva | 4 |

```keyvalue
[
  { "k": "Linha", "v": "vai da esquerda para a direita, deitada → 🙂" },
  { "k": "Coluna", "v": "vai de cima para baixo, em pé ↓ 🙂" },
  { "k": "Título / cabeçalho", "v": "diz o que cada coluna conta (Fruta, Votos) 🙂" },
  { "k": "Total", "v": "soma de todos os votos: 5 + 3 + 8 + 4 = 20 🙂" }
]
```

> [!TIP] Antes de responderes a qualquer pergunta, lê **sempre** os cabeçalhos da tabela. Assim sabes o que cada número quer dizer! 🔍

## O gráfico de barras — comparar de relance 📊

Um **gráfico de barras** mostra os mesmos dados em barras. Quanto mais alta (ou mais comprida) a barra, **maior** a quantidade. A barra mais alta ganha, a mais baixa perde — vês tudo sem contar!

```meters
[
  { "label": "🍓 Morango", "value": 8, "max": 10, "tone": "danger" },
  { "label": "🍎 Maçã", "value": 5, "max": 10, "tone": "ok" },
  { "label": "🍇 Uva", "value": 4, "max": 10, "tone": "warn" },
  { "label": "🍌 Banana", "value": 3, "max": 10, "tone": "ok" }
]
```

> Vês logo que o **morango** ganhou? A barra é a maior! 🏆 E a **banana** é a menor.

```keyvalue
[
  { "k": "Eixo de baixo", "v": "diz o QUÊ que estamos a comparar (as frutas) 🙂" },
  { "k": "Eixo do lado", "v": "diz QUANTOS — a escala de números (1, 2, 3…) 🙂" },
  { "k": "Barra mais alta", "v": "é o MÁXIMO — o que tem mais 🏆" },
  { "k": "Barra mais baixa", "v": "é o MÍNIMO — o que tem menos 🐭" }
]
```

## Pictograma — desenhos que contam 🖼️

Um **pictograma** usa **desenhos** em vez de barras. Mas atenção: cada desenho pode valer **mais do que 1**! A **legenda** diz quanto vale cada símbolo. Aqui, cada 🍦 vale **2 gelados vendidos**.

```compare
[
  { "title": "Gelados vendidos 🍦 (cada 🍦 = 2)", "rows": [
    { "label": "Segunda", "value": "🍦🍦  → 4 gelados" },
    { "label": "Terça", "value": "🍦🍦🍦  → 6 gelados" },
    { "label": "Quarta", "value": "🍦🍦🍦🍦🍦  → 10 gelados", "highlight": true }
  ] }
]
```

> [!WARNING] Cuidado! Num pictograma **não contas os desenhos** — multiplicas pelo valor da legenda. 3 desenhos × 2 = **6**, e não 3! ✖️

## Máximo, mínimo e moda 🔎

Quando olhas para os dados, há três palavras muito úteis para os descrever:

```keyvalue
[
  { "k": "Máximo", "v": "o valor mais alto. Aqui é o morango, com 8 votos 🏆" },
  { "k": "Mínimo", "v": "o valor mais baixo. Aqui é a banana, com 3 votos 🐭" },
  { "k": "Moda", "v": "o que aparece MAIS vezes / é o mais escolhido — o morango 🌟" },
  { "k": "Amplitude", "v": "a diferença entre o máximo e o mínimo: 8 − 3 = 5 📏" }
]
```

```stats
[
  { "label": "Máximo", "value": "8", "hint": "morango 🍓" },
  { "label": "Mínimo", "value": "3", "hint": "banana 🍌" },
  { "label": "Total de votos", "value": "20", "hint": "5 + 3 + 8 + 4" },
  { "label": "Amplitude", "value": "5", "hint": "8 − 3" }
]
```

## Um exemplo passo a passo 🔍

*«Quantos votos a mais teve o morango do que a banana?»* Vamos resolver com calma, usando a tabela das frutas. 🍓🍌

```steps
[
  { "title": "1. Lê a pergunta", "body": "ela pede a DIFERENÇA entre o morango e a banana 🧐", "icon": "🔎" },
  { "title": "2. Procura na tabela", "body": "morango = 8 votos; banana = 3 votos 📋", "icon": "🗂️" },
  { "title": "3. Escolhe a operação", "body": "«quantos a mais» pede uma subtração: maior − menor ➖", "icon": "➖" },
  { "title": "4. Faz a conta", "body": "8 − 3 = 5 🧮", "icon": "🧮" },
  { "title": "5. Responde com sentido", "body": "o morango teve 5 votos a mais do que a banana ✅", "icon": "✅" }
]
```

> **Truque:** «a **mais**» ou «a **menos**» é quase sempre uma **subtração** (o maior menos o menor). «**Ao todo**» ou «**no total**» é uma **soma**. Sublinha essas palavrinhas mágicas na pergunta! ✏️

> [!TIP] **Para saberes mais** 🌱 Há gráficos de **linha**, que ligam pontos para mostrar como algo **muda ao longo do tempo** — por exemplo, a temperatura ao longo da semana. Quando a linha **sobe**, o valor aumenta; quando **desce**, diminui. Os meteorologistas usam-nos todos os dias para te dizerem o tempo que vai fazer! 📈🌤️

## Vamos praticar 🎈

```quiz
{
  "id": "mat4-dados-pratica",
  "questions": [
    { "q": "Uma tabela organiza os dados em…", "layout": "grid",
      "options": [ { "t": "linhas e colunas", "emoji": "🗂️", "correct": true }, { "t": "círculos", "emoji": "⭕" }, { "t": "letras", "emoji": "🔤" } ],
      "explain": "Tabelas têm linhas (deitadas) e colunas (em pé)." },
    { "q": "Na tabela das frutas, qual teve MAIS votos?", "layout": "grid",
      "options": [ { "t": "Morango (8)", "emoji": "🍓", "correct": true }, { "t": "Maçã (5)", "emoji": "🍎" }, { "t": "Banana (3)", "emoji": "🍌" } ],
      "explain": "O morango teve 8 votos — o maior número." },
    { "q": "Num gráfico de barras, a barra mais alta é a que tem…", "layout": "grid",
      "options": [ { "t": "mais", "emoji": "🏆", "correct": true }, { "t": "menos", "emoji": "🐭" } ],
      "explain": "Barra mais alta = mais quantidade." },
    { "q": "Qual é o MÍNIMO (a fruta com menos votos)?", "layout": "grid",
      "options": [ { "t": "Banana (3)", "emoji": "🍌", "correct": true }, { "t": "Uva (4)", "emoji": "🍇" }, { "t": "Morango (8)", "emoji": "🍓" } ],
      "explain": "A banana, com 3 votos, é o valor mais baixo." },
    { "q": "Num pictograma onde cada 🍦 vale 2, três 🍦 valem…", "layout": "grid",
      "options": [ { "t": "6", "emoji": "🍦", "correct": true }, { "t": "3" }, { "t": "2" } ],
      "explain": "Multiplicas: 3 × 2 = 6. Não contas só os desenhos!" },
    { "q": "Quantos votos a mais teve o morango do que a banana?", "layout": "grid",
      "options": [ { "t": "5", "correct": true }, { "t": "3" }, { "t": "8" } ],
      "explain": "8 − 3 = 5 votos a mais." },
    { "q": "Onde dizemos o QUE cada coluna conta?", "layout": "grid",
      "options": [ { "t": "no título / cabeçalho", "emoji": "🏷️", "correct": true }, { "t": "no fundo da página" } ],
      "explain": "O cabeçalho diz o que cada coluna representa." },
    { "q": "Quantos votos havia ao todo? (5 + 3 + 8 + 4)", "layout": "grid",
      "options": [ { "t": "20", "emoji": "🧮", "correct": true }, { "t": "16" }, { "t": "18" } ],
      "explain": "5 + 3 + 8 + 4 = 20 votos no total." },
    { "q": "A palavra «moda» quer dizer…", "layout": "grid",
      "options": [ { "t": "o mais escolhido", "emoji": "🌟", "correct": true }, { "t": "o mais bonito", "emoji": "👗" } ],
      "explain": "A moda é o valor que aparece mais vezes." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat4-dados-final",
  "final": true,
  "title": "Gráficos e tabelas",
  "questions": [
    { "q": "Uma tabela organiza dados em…", "layout": "grid",
      "options": [ { "t": "linhas e colunas", "emoji": "🗂️", "correct": true }, { "t": "círculos" } ],
      "explain": "Tabelas têm linhas e colunas." },
    { "q": "Quantos votos teve a maçã? 🍎", "layout": "grid",
      "options": [ { "t": "5", "correct": true }, { "t": "8" }, { "t": "3" } ],
      "explain": "A maçã teve 5 votos." },
    { "q": "Para que serve um gráfico?", "layout": "grid",
      "options": [ { "t": "comparar de relance", "emoji": "📊", "correct": true }, { "t": "para nada" } ],
      "explain": "Ajuda a comparar informação rapidamente." },
    { "q": "Qual é o MÁXIMO da tabela das frutas?", "layout": "grid",
      "options": [ { "t": "8 (morango)", "emoji": "🍓", "correct": true }, { "t": "3 (banana)", "emoji": "🍌" }, { "t": "4 (uva)", "emoji": "🍇" } ],
      "explain": "O máximo é o valor mais alto: 8 votos." },
    { "q": "Num pictograma, o que te diz quanto vale cada desenho?", "layout": "grid",
      "options": [ { "t": "a legenda", "emoji": "🔑", "correct": true }, { "t": "o título do livro" } ],
      "explain": "A legenda diz o valor de cada símbolo (ex.: cada 🍦 = 2)." },
    { "q": "Se cada 🍦 = 2 e vês 🍦🍦🍦🍦🍦, são quantos gelados?", "layout": "grid",
      "options": [ { "t": "10", "emoji": "🍦", "correct": true }, { "t": "5" }, { "t": "7" } ],
      "explain": "5 desenhos × 2 = 10 gelados." },
    { "q": "A amplitude (máximo − mínimo) das frutas é…", "layout": "grid",
      "options": [ { "t": "5", "emoji": "📏", "correct": true }, { "t": "8" }, { "t": "3" } ],
      "explain": "8 − 3 = 5." },
    { "q": "No eixo do lado de um gráfico de barras está…", "layout": "grid",
      "options": [ { "t": "a escala de números (quantos)", "emoji": "🔢", "correct": true }, { "t": "o nome da escola" } ],
      "explain": "O eixo do lado mostra a escala — quantos de cada coisa." },
    { "q": "Que gráfico mostra melhor como a temperatura muda ao longo da semana?", "layout": "grid",
      "options": [ { "t": "gráfico de linha", "emoji": "📈", "correct": true }, { "t": "tabela de letras" } ],
      "explain": "O gráfico de linha mostra como algo muda ao longo do tempo." }
  ]
}
```
