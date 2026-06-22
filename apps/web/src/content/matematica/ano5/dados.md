# Organização e tratamento de dados 📊

> [!NOTE] **O que vais aprender** 👀 Vais organizar dados em **tabelas de frequências**, lê-los em **gráficos de barras, de linha e circulares**, e calcular as três medidas-chave: **moda**, **média** e **amplitude**. No fim, percebes qualquer gráfico de relance! 📊📈

Imagina que perguntaste a toda a turma qual o desporto preferido. Ficas com um monte de respostas baralhadas! ⚽🏀🏊 Para arrumares tudo e perceberes logo quem ganhou, usas **tabelas** e **gráficos** — e três palavras mágicas para descrever os números. Vamos virar cientistas de dados! 🔬

## A tabela de frequências 🗂️

Uma **tabela** organiza os dados em **linhas** e **colunas**. A **frequência** é quantas vezes cada coisa aparece. A última linha costuma ter o **total**.

| Desporto preferido | Frequência (votos) |
| --- | --- |
| ⚽ Futebol | 9 |
| 🏀 Basquete | 5 |
| 🏊 Natação | 4 |
| 🚴 Ciclismo | 2 |

```keyvalue
[
  { "k": "Frequência", "v": "quantas vezes algo aparece (os votos) 🔢" },
  { "k": "Linha / coluna", "v": "linha = deitada →; coluna = em pé ↓ 🙂" },
  { "k": "Total", "v": "soma de todas as frequências: 9+5+4+2 = 20 🧮" },
  { "k": "Lê os cabeçalhos!", "v": "antes de responder, vê o que cada coluna conta 🔍" }
]
```

## O gráfico de barras 📊

Um **gráfico de barras** mostra cada frequência como uma barra. Quanto mais alta, **maior** a quantidade — vês o vencedor sem contar!

```chart
{ "type": "bar", "title": "Desporto preferido (votos)",
  "labels": ["Futebol", "Basquete", "Natação", "Ciclismo"], "data": [9, 5, 4, 2],
  "unit": "votos",
  "say": "O futebol teve 9 votos, o basquete 5, a natação 4 e o ciclismo 2." }
```

> O **futebol** ganhou — é a barra mais alta! 🏆 O **ciclismo** é a mais baixa.

## O gráfico de linha 📈

Um **gráfico de linha** liga pontos para mostrar como algo **muda ao longo do tempo**. Quando a linha **sobe**, o valor aumenta; quando **desce**, diminui.

```chart
{ "type": "line", "title": "Temperatura ao longo do dia (°C)",
  "labels": ["8h", "10h", "12h", "14h", "16h"], "data": [14, 18, 22, 25, 21],
  "unit": "°C",
  "say": "Às 8h estavam 14 graus; subiu até 25 às 14h e depois desceu para 21 às 16h." }
```

> Vês? A temperatura **subiu** de manhã, chegou ao máximo às 14h, e à tarde começou a **descer**. A linha conta a história! ☀️

## O gráfico circular 🥧

Um **gráfico circular** (ou de setores) é uma «pizza»: o círculo todo é o **total**, e cada fatia é uma parte. As fatias mostram a **percentagem** de cada uma.

```chart
{ "type": "pie", "title": "Como vêm os alunos para a escola",
  "labels": ["A pé", "Carro", "Autocarro"], "data": [10, 6, 4],
  "say": "Metade vem a pé, quase um terço de carro e o resto de autocarro." }
```

> [!NOTE] Usa o **circular** para «partes de um todo» (a pizza inteira = 100%). Usa **barras** ou **linha** para comparar quantidades ou ver mudanças no tempo. 🥧📊

## Moda, média e amplitude 🔎

Três palavras descrevem um conjunto de dados. Estas são as mais importantes do 5.º ano:

```keyvalue
[
  { "k": "Moda", "v": "o valor que aparece MAIS vezes (o mais votado) 🌟" },
  { "k": "Média", "v": "somar tudo e dividir pelo número de valores ⚖️" },
  { "k": "Máximo / Mínimo", "v": "o valor mais alto e o mais baixo 🏆🐭" },
  { "k": "Amplitude", "v": "a diferença: máximo − mínimo 📏" }
]
```

A **média** é a estrela nova! Imagina repartir tudo **por igual** por todos — é o valor «justo» que cada um teria.

```steps
[
  { "title": "Notas: 4, 5, 5, 6", "body": "quero a média destas 4 notas", "icon": "📋" },
  { "title": "1. Soma tudo", "body": "4 + 5 + 5 + 6 = 20", "icon": "➕" },
  { "title": "2. Divide pelo nº de valores", "body": "são 4 notas → 20 ÷ 4 = 5", "icon": "➗" },
  { "title": "3. Média = 5", "body": "é como se todos tivessem tido 5 ⚖️", "icon": "⚖️" }
]
```

```math
{ "expr": "média = (4 + 5 + 5 + 6) // 4 = 5", "say": "a média é a soma quatro mais cinco mais cinco mais seis, a dividir por quatro, que dá cinco" }
```

## Um exemplo passo a passo 🔍

*«Numa semana, a Mariana leu 3, 5, 4, 6 e 2 páginas por dia. Qual a média diária? E a amplitude?»* Vamos resolver com calma. 📚

```steps
[
  { "title": "1. Soma as páginas", "body": "3 + 5 + 4 + 6 + 2 = 20 páginas ➕", "icon": "➕" },
  { "title": "2. Conta os dias", "body": "foram 5 dias 🗓️", "icon": "🗓️" },
  { "title": "3. Média", "body": "20 ÷ 5 = 4 páginas por dia ⚖️", "icon": "⚖️" },
  { "title": "4. Amplitude", "body": "máximo (6) − mínimo (2) = 4 páginas 📏", "icon": "📏" },
  { "title": "5. Resposta", "body": "média de 4 páginas/dia e amplitude de 4 ✅", "icon": "🎉" }
]
```

> **Truque da média:** primeiro **soma tudo**, depois **divide pelo número de valores** (quantas coisas somaste). Se a média te der um número «entre» os dados, está provavelmente certa — a média fica sempre entre o mínimo e o máximo! 🧠

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Tabelas, gráficos e medidas", "items": [
  { "front": "A moda é…", "back": "o valor mais frequente", "options": ["o mais alto", "o do meio"] },
  { "front": "Média de 4, 5, 5, 6", "back": "5", "options": ["20", "4"] },
  { "front": "Amplitude de 2, 4, 6 (máx − mín)", "back": "4", "options": ["6", "2"] },
  { "front": "Gráfico para «partes de um todo»", "back": "circular", "options": ["de linha", "de barras"] },
  { "front": "Gráfico para mudança ao longo do tempo", "back": "de linha", "options": ["circular", "de barras"] },
  { "front": "Quantas vezes algo aparece chama-se…", "back": "frequência", "options": ["média", "amplitude"] },
  { "front": "Média: somar tudo e depois…", "back": "dividir pelo nº de valores", "options": ["multiplicar", "subtrair"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Além da moda e da média, há a **mediana**: pões os números **por ordem** e escolhes o do **meio**! Em 2, 4, **5**, 7, 9 a mediana é 5. É muito útil quando há um valor «esquisito» que estraga a média — por exemplo, salários: se uma pessoa ganha milhões, a **média** dispara, mas a **mediana** mostra melhor o que ganha a maioria. Os estatísticos usam as três conforme a situação! 📊🤓

## Vamos praticar 🎈

```quiz
{
  "id": "mat-5-dados-pratica",
  "questions": [
    { "q": "Quantas vezes algo aparece chama-se…", "layout": "grid",
      "options": [ { "t": "frequência", "emoji": "🔢", "correct": true }, { "t": "amplitude", "feedback": "Amplitude é a diferença entre o máximo e o mínimo. Quantas vezes algo aparece é a frequência.", "tag": "dados-vocabulario" }, { "t": "média", "feedback": "A média é somar tudo e dividir pelo número de valores. Quantas vezes algo aparece é a frequência.", "tag": "dados-vocabulario" } ],
      "explain": "Frequência = número de vezes (os votos, por exemplo)." },
    { "q": "Na tabela dos desportos, qual teve MAIS votos?", "layout": "grid",
      "options": [ { "t": "Futebol (9)", "emoji": "⚽", "correct": true }, { "t": "Basquete (5)", "emoji": "🏀", "feedback": "O basquete teve 5 votos. O que teve mais foi o futebol, com 9.", "tag": "dados-leitura-tabela" }, { "t": "Ciclismo (2)", "emoji": "🚴", "feedback": "O ciclismo teve 2 votos — foi o que teve menos. O que teve mais foi o futebol, com 9.", "tag": "dados-leitura-tabela" } ],
      "explain": "O futebol teve 9 votos — a moda." },
    { "q": "A média de 4, 5, 5, 6 é…", "layout": "grid",
      "options": [ { "t": "5", "emoji": "⚖️", "correct": true }, { "t": "20", "feedback": "20 é só a soma (4 + 5 + 5 + 6). Falta dividir pelos 4 valores: 20 ÷ 4 = 5.", "tag": "dados-media" }, { "t": "4", "feedback": "4 é o valor mais baixo, não a média. Soma tudo (20) e divide por 4 valores: dá 5.", "tag": "dados-media" } ],
      "explain": "Soma 20, divide por 4 valores = 5." },
    { "q": "Para calcular a média, somas tudo e depois…", "layout": "list",
      "options": [ { "t": "divides pelo número de valores", "emoji": "➗", "correct": true }, { "t": "multiplicas por 2", "feedback": "Multiplicar por 2 dava um número enorme. Depois de somar tudo, divides pelo número de valores.", "tag": "dados-media" }, { "t": "tiras o menor", "feedback": "Tirar o menor não dá a média. Somas tudo e divides pelo número de valores.", "tag": "dados-media" } ],
      "explain": "Média = soma ÷ quantidade de valores." },
    { "q": "Que gráfico mostra melhor como a temperatura muda ao longo do dia?", "layout": "grid",
      "options": [ { "t": "de linha", "emoji": "📈", "correct": true }, { "t": "circular", "feedback": "O circular serve para partes de um todo, não para mudanças no tempo. Para isso usa-se o gráfico de linha.", "tag": "dados-tipo-grafico" }, { "t": "tabela de letras", "feedback": "Uma tabela de letras nem mostra o tempo a passar. Para ver a temperatura a mudar ao longo do dia, usa-se o gráfico de linha.", "tag": "dados-tipo-grafico" } ],
      "explain": "O gráfico de linha mostra mudanças ao longo do tempo." },
    { "q": "A amplitude (máximo − mínimo) de 2, 4, 6 é…", "layout": "grid",
      "options": [ { "t": "4", "emoji": "📏", "correct": true }, { "t": "6", "feedback": "6 é só o máximo. A amplitude é a diferença: 6 − 2 = 4.", "tag": "dados-amplitude" }, { "t": "2", "feedback": "2 é só o mínimo. A amplitude é máximo menos mínimo: 6 − 2 = 4.", "tag": "dados-amplitude" } ],
      "explain": "6 − 2 = 4." },
    { "q": "Para «partes de um todo» (a pizza inteira), usas o gráfico…", "layout": "grid",
      "options": [ { "t": "circular", "emoji": "🥧", "correct": true }, { "t": "de linha", "feedback": "O de linha serve para mudanças ao longo do tempo. Para partes de um todo usa-se o circular.", "tag": "dados-tipo-grafico" }, { "t": "de barras", "feedback": "As barras comparam quantidades, mas para mostrar fatias de um todo (100%) usa-se o circular.", "tag": "dados-tipo-grafico" } ],
      "explain": "O circular mostra as fatias de um total (100%)." },
    { "q": "A moda é…", "layout": "grid",
      "options": [ { "t": "o valor mais frequente", "emoji": "🌟", "correct": true }, { "t": "o mais bonito", "feedback": "A moda não tem nada a ver com gosto. É o valor que aparece mais vezes nos dados.", "tag": "dados-moda" }, { "t": "a soma de tudo", "feedback": "A soma de tudo serve para a média. A moda é o valor que aparece mais vezes.", "tag": "dados-moda" } ],
      "explain": "A moda é o valor que aparece mais vezes." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-dados-final",
  "final": true,
  "title": "Organização e tratamento de dados",
  "questions": [
    { "q": "Uma tabela organiza dados em…", "layout": "grid",
      "options": [ { "t": "linhas e colunas", "emoji": "🗂️", "correct": true }, { "t": "círculos", "feedback": "Círculos são as fatias de um gráfico circular. Uma tabela organiza os dados em linhas e colunas.", "tag": "dados-leitura-tabela" } ],
      "explain": "Tabelas têm linhas (deitadas) e colunas (em pé)." },
    { "q": "Num gráfico de barras, a barra mais alta tem…", "layout": "grid",
      "options": [ { "t": "mais", "emoji": "🏆", "correct": true }, { "t": "menos", "emoji": "🐭", "feedback": "Ao contrário: a barra mais baixa é que tem menos. A barra mais alta mostra a maior quantidade.", "tag": "dados-leitura-grafico" } ],
      "explain": "Barra mais alta = maior quantidade." },
    { "q": "A média de 3, 5, 4, 6, 2 é…", "layout": "grid",
      "options": [ { "t": "4", "emoji": "⚖️", "correct": true }, { "t": "5", "feedback": "5 é um dos valores, não a média. Soma tudo (20) e divide pelos 5 valores: 20 ÷ 5 = 4.", "tag": "dados-media" }, { "t": "20", "feedback": "20 é só a soma. Falta dividir pelos 5 valores: 20 ÷ 5 = 4.", "tag": "dados-media" } ],
      "explain": "Soma 20, divide por 5 valores = 4." },
    { "q": "A moda é o valor que…", "layout": "grid",
      "options": [ { "t": "aparece mais vezes", "emoji": "🌟", "correct": true }, { "t": "está no meio", "feedback": "O valor do meio (depois de ordenar) é a mediana. A moda é o que aparece mais vezes.", "tag": "dados-moda" }, { "t": "é o maior", "feedback": "O maior é o máximo. A moda é o valor que se repete mais vezes.", "tag": "dados-moda" } ],
      "explain": "Moda = o mais frequente." },
    { "q": "A amplitude calcula-se…", "layout": "grid",
      "options": [ { "t": "máximo − mínimo", "emoji": "📏", "correct": true }, { "t": "somar tudo", "feedback": "Somar tudo é o início da média. A amplitude é a diferença: máximo − mínimo.", "tag": "dados-amplitude" }, { "t": "máximo + mínimo", "feedback": "É menos, não mais: a amplitude é máximo − mínimo, a distância entre o maior e o menor.", "tag": "dados-amplitude" } ],
      "explain": "Amplitude = diferença entre o maior e o menor." },
    { "q": "Que gráfico é uma «pizza» de partes de um todo?", "layout": "grid",
      "options": [ { "t": "circular", "emoji": "🥧", "correct": true }, { "t": "de linha", "feedback": "O de linha mostra mudanças ao longo do tempo. A «pizza» de partes de um todo é o gráfico circular.", "tag": "dados-tipo-grafico" }, { "t": "de barras", "feedback": "As barras comparam quantidades. A «pizza» com fatias de um todo (100%) é o gráfico circular.", "tag": "dados-tipo-grafico" } ],
      "explain": "O circular (de setores) mostra as fatias de 100%." },
    { "q": "Numa linha, quando o valor desce, a linha…", "layout": "grid",
      "options": [ { "t": "desce também", "emoji": "📉", "correct": true }, { "t": "fica plana", "feedback": "A linha só fica plana quando o valor não muda. Se o valor desce, a linha desce também.", "tag": "dados-leitura-grafico" }, { "t": "sobe", "feedback": "A linha sobe quando o valor aumenta. Quando o valor desce, a linha desce também.", "tag": "dados-leitura-grafico" } ],
      "explain": "A linha acompanha os valores: desce quando diminuem." },
    { "q": "A Mariana leu 3, 5, 4, 6 e 2 páginas. A média diária foi…", "layout": "grid",
      "options": [ { "t": "4 páginas", "emoji": "📚", "correct": true }, { "t": "20 páginas", "feedback": "20 é o total das 5 dias. A média divide pelos dias: 20 ÷ 5 = 4 páginas.", "tag": "dados-media" }, { "t": "6 páginas", "feedback": "6 foi só o dia em que leu mais. A média é 20 ÷ 5 = 4 páginas por dia.", "tag": "dados-media" } ],
      "explain": "20 páginas ÷ 5 dias = 4 páginas por dia." },
    { "q": "Pôr os números por ordem e escolher o do meio dá a…", "layout": "grid",
      "options": [ { "t": "mediana", "emoji": "🤓", "correct": true }, { "t": "moda", "feedback": "A moda é o valor que aparece mais vezes. O valor do meio, depois de ordenar, é a mediana.", "tag": "dados-vocabulario" }, { "t": "amplitude", "feedback": "A amplitude é máximo − mínimo. O valor do meio, depois de ordenar, é a mediana.", "tag": "dados-vocabulario" } ],
      "explain": "A mediana é o valor central depois de ordenar os dados." }
  ]
}
```
