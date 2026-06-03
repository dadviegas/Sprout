# Representar e interpretar dados 📈

> [!NOTE] **O que vais aprender** 👀 A organizar dados em **tabelas de frequências**, a escolher o **gráfico certo** (barras, linha ou circular) para cada situação, a **ler e interpretar** o que eles contam, e a calcular as três medidas-chave: **média**, **moda** e **amplitude**. Vais virar um cientista de dados! 🔬📊

Todos os dias somos bombardeados com **gráficos**: na televisão, nos jogos, nas notícias do tempo. Quem sabe **lê-los** percebe o mundo melhor e não se deixa enganar! 🧠 Neste capítulo vais aprender a **organizar** um monte de números baralhados, a **mostrá-los** da forma mais clara e a **resumi-los** em três palavras mágicas. Vamos lá ser detetives de dados! 🕵️

## A tabela de frequências 🗂️

Tudo começa com a **tabela**: arruma os dados e conta quantas vezes cada coisa aparece — a **frequência**. Imagina que perguntaste a 20 colegas o animal preferido.

| Animal preferido | Frequência (votos) |
| --- | --- |
| 🐶 Cão | 8 |
| 🐱 Gato | 6 |
| 🐰 Coelho | 4 |
| 🐢 Tartaruga | 2 |

```keyvalue
[
  { "k": "Frequência", "v": "quantas vezes algo aparece (os votos) 🔢" },
  { "k": "Total", "v": "soma de todas as frequências: 8+6+4+2 = 20 🧮" },
  { "k": "Lê os cabeçalhos!", "v": "vê sempre o que cada coluna conta antes de responder 🔍" }
]
```

## Escolher o gráfico certo 🎯

Cada gráfico conta a sua história. Escolher o certo é meia batalha ganha!

```compare
[
  { "title": "Barras 📊", "rows": [
    { "label": "Para quê", "value": "comparar quantidades de categorias" },
    { "label": "Exemplo", "value": "votos de cada animal" }
  ] },
  { "title": "Linha 📈", "highlight": true, "rows": [
    { "label": "Para quê", "value": "mostrar mudança ao longo do TEMPO", "highlight": true },
    { "label": "Exemplo", "value": "temperatura hora a hora", "highlight": true }
  ] }
]
```

O **gráfico de barras** mostra quem ganhou só de olhar — a barra mais alta! 🏆

```chart
{ "type": "bar", "title": "Animal preferido (votos)",
  "labels": ["Cão", "Gato", "Coelho", "Tartaruga"], "data": [8, 6, 4, 2],
  "unit": "votos",
  "say": "O cão teve 8 votos, o gato 6, o coelho 4 e a tartaruga 2." }
```

O **gráfico de linha** mostra como algo **muda no tempo** — sobe, desce, conta uma história:

```chart
{ "type": "line", "title": "Visitantes do zoo durante a semana",
  "labels": ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"], "data": [20, 25, 22, 30, 45, 80],
  "unit": "pessoas",
  "say": "Durante a semana foram poucos; ao sábado dispararam para oitenta visitantes." }
```

E o **gráfico circular** (a «pizza») mostra as **partes de um todo** em fatias — vê-se logo a parte maior:

```chart
{ "type": "pie", "title": "Como vêm os alunos para a escola",
  "labels": ["A pé", "Carro", "Autocarro"], "data": [10, 6, 4],
  "say": "Metade vem a pé, quase um terço de carro e o resto de autocarro." }
```

## As três medidas-chave 🔑

Em vez de mostrar 20 números, podes resumi-los em **três palavras mágicas**. São o «retrato» dos dados!

```keyvalue
[
  { "k": "Média", "v": "soma tudo e divide pelo número de valores — o «valor justo» se repartisses por igual ⚖️" },
  { "k": "Moda", "v": "o valor que aparece MAIS vezes — o mais «na moda» 👑" },
  { "k": "Amplitude", "v": "a diferença entre o maior e o menor (máximo − mínimo) 📏" }
]
```

> **Truque para nunca trocar:** **Mé**dia faz **mé**dia (somar e dividir, dá trabalho!); **Mo**da é a que está na **mo**da (a mais repetida); **Amplitude** é a **distância** do mais pequeno ao maior. 🧠

## Calcular a média passo a passo 🧮

*«As notas do Tomás nos testes foram: 8, 6, 10, 8. Qual a média?»*

```steps
[
  { "title": "1. Soma tudo", "body": "8 + 6 + 10 + 8 = 32", "icon": "➕" },
  { "title": "2. Conta os valores", "body": "são 4 testes", "icon": "🔢" },
  { "title": "3. Divide", "body": "32 ÷ 4 = 8", "icon": "➗" },
  { "title": "4. A média é…", "body": "8! É como se tivesse tirado 8 em todos 🎯", "icon": "✅" }
]
```

E para os mesmos dados (8, 6, 10, 8): a **moda** é **8** (aparece 2 vezes), e a **amplitude** é **10 − 6 = 4**. Três retratos do mesmo conjunto! 📸

## Um exemplo passo a passo 🔍

*«Cinco amigos têm estas idades: 9, 11, 10, 11, 14 anos. Calcula a média, a moda e a amplitude.»* 🎂

```steps
[
  { "title": "1. Média — soma", "body": "9 + 11 + 10 + 11 + 14 = 55", "icon": "➕" },
  { "title": "2. Média — divide", "body": "55 ÷ 5 = 11 anos ⚖️", "icon": "➗" },
  { "title": "3. Moda", "body": "o 11 aparece duas vezes → moda = 11 👑", "icon": "👑" },
  { "title": "4. Amplitude", "body": "maior − menor = 14 − 9 = 5 📏", "icon": "📏" },
  { "title": "5. Resposta", "body": "média 11, moda 11, amplitude 5 🎉", "icon": "✅" }
]
```

> [!WARNING] Cuidado a ler gráficos! 👀 Olha sempre a **escala** dos eixos. Uma barra que parece o **dobro** pode não ser — se o eixo não começar no **zero**, engana a vista! Os gráficos honestos começam a contagem no zero. 🚫

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Dados, gráficos e medidas", "items": [
  { "front": "Quantas vezes algo aparece é a…", "back": "frequência", "options": ["média", "moda"] },
  { "front": "Para mudança no tempo, usas gráfico de…", "back": "linha", "options": ["barras", "círculo"] },
  { "front": "Partes de um todo: gráfico…", "back": "circular", "options": ["de linha", "de barras"] },
  { "front": "Somar e dividir pelo número de valores dá a…", "back": "média", "options": ["moda", "amplitude"] },
  { "front": "O valor mais repetido é a…", "back": "moda", "options": ["média", "amplitude"] },
  { "front": "Máximo − mínimo é a…", "back": "amplitude", "options": ["média", "moda"] },
  { "front": "Média de 4, 6, 8", "back": "6", "options": ["18", "8"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Há uma terceira medida do «meio»: a **mediana**! É o valor que fica **mesmo no centro** quando ordenas os dados do menor para o maior. Em 3, 5, **8**, 9, 12, a mediana é o **8** (está no meio). Os estatísticos usam-na quando há um valor muito «esquisito» que estraga a média — por exemplo, se um amigo do grupo tivesse 50 anos, a **média** das idades disparava, mas a **mediana** quase não mexia! 🎯 É por isso que nas notícias sobre salários se fala muitas vezes do «salário **mediano**». Vais aprofundá-la no 3.º ciclo! 📊

## Vamos praticar 🎈

```quiz
{
  "id": "mat-6-graficos-pratica",
  "questions": [
    { "q": "A frequência num conjunto de dados é…", "layout": "grid",
      "options": [ { "t": "quantas vezes algo aparece", "emoji": "🔢", "correct": true }, { "t": "o maior valor" }, { "t": "a soma de tudo" } ],
      "explain": "Frequência = número de vezes que cada coisa surge." },
    { "q": "Para mostrar a temperatura ao longo do dia, usas gráfico de…", "layout": "grid",
      "options": [ { "t": "linha", "emoji": "📈", "correct": true }, { "t": "barras" }, { "t": "círculo" } ],
      "explain": "Linha mostra mudança ao longo do tempo." },
    { "q": "Para mostrar partes de um todo, usas gráfico…", "layout": "grid",
      "options": [ { "t": "circular", "emoji": "🥧", "correct": true }, { "t": "de linha" }, { "t": "de barras" } ],
      "explain": "O circular reparte o todo em fatias." },
    { "q": "A média de 4, 6 e 8 é…", "layout": "grid",
      "options": [ { "t": "6", "emoji": "⚖️", "correct": true }, { "t": "18" }, { "t": "8" } ],
      "explain": "4+6+8 = 18; 18 ÷ 3 = 6." },
    { "q": "Em 2, 3, 3, 5, a moda é…", "layout": "grid",
      "options": [ { "t": "3", "emoji": "👑", "correct": true }, { "t": "5" }, { "t": "13" } ],
      "explain": "O 3 é o valor que aparece mais vezes." },
    { "q": "Em 4, 9, 6, 2, a amplitude é…", "layout": "grid",
      "options": [ { "t": "7", "emoji": "📏", "correct": true }, { "t": "9" }, { "t": "2" } ],
      "explain": "Maior − menor = 9 − 2 = 7." },
    { "q": "Ao ler um gráfico de barras, deves verificar…", "layout": "list",
      "options": [ { "t": "se a escala começa no zero", "emoji": "👀", "correct": true }, { "t": "a cor das barras" }, { "t": "o tamanho do título" } ],
      "explain": "Se o eixo não começa no zero, engana a vista." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-6-graficos-final",
  "final": true,
  "title": "Representar e interpretar dados",
  "questions": [
    { "q": "Onde se organizam os dados antes de fazer um gráfico?", "layout": "grid",
      "options": [ { "t": "numa tabela de frequências", "emoji": "🗂️", "correct": true }, { "t": "num desenho livre" }, { "t": "de cabeça" } ],
      "explain": "A tabela arruma os dados e conta as frequências." },
    { "q": "Para comparar votos de várias categorias usas gráfico de…", "layout": "grid",
      "options": [ { "t": "barras", "emoji": "📊", "correct": true }, { "t": "linha" }, { "t": "círculo" } ],
      "explain": "As barras comparam quantidades de relance." },
    { "q": "Um gráfico de linha é melhor para mostrar…", "layout": "grid",
      "options": [ { "t": "mudança ao longo do tempo", "emoji": "📈", "correct": true }, { "t": "partes de um bolo" }, { "t": "cores favoritas" } ],
      "explain": "A linha sobe e desce contando a evolução." },
    { "q": "A média de 10, 10, 10, 10 é…", "layout": "grid",
      "options": [ { "t": "10", "emoji": "⚖️", "correct": true }, { "t": "40" }, { "t": "4" } ],
      "explain": "40 ÷ 4 = 10 (todos iguais → a média é esse valor)." },
    { "q": "Em 5, 7, 7, 7, 9, a moda é…", "layout": "grid",
      "options": [ { "t": "7", "emoji": "👑", "correct": true }, { "t": "9" }, { "t": "5" } ],
      "explain": "O 7 aparece três vezes — é o mais repetido." },
    { "q": "Em 3, 8, 5, 12, 4, a amplitude é…", "layout": "grid",
      "options": [ { "t": "9", "emoji": "📏", "correct": true }, { "t": "12" }, { "t": "3" } ],
      "explain": "12 − 3 = 9 (maior menos menor)." },
    { "q": "A média das idades 9, 11, 10, 11, 14 é…", "layout": "grid",
      "options": [ { "t": "11", "emoji": "🎂", "correct": true }, { "t": "10" }, { "t": "55" } ],
      "explain": "9+11+10+11+14 = 55; 55 ÷ 5 = 11." },
    { "q": "Num gráfico circular, a maior fatia representa…", "layout": "grid",
      "options": [ { "t": "a parte com maior valor", "emoji": "🥧", "correct": true }, { "t": "a parte mais pequena" }, { "t": "o total" } ],
      "explain": "Fatia maior = maior parte do todo." },
    { "q": "Qual é a medida que fica no centro dos dados ordenados?", "layout": "list",
      "options": [ { "t": "a mediana", "emoji": "🎯", "correct": true }, { "t": "a moda" }, { "t": "a amplitude" } ],
      "explain": "A mediana é o valor do meio quando ordenas tudo." }
  ]
}
```
