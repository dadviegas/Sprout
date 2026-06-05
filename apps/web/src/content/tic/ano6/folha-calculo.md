# Folha de cálculo simples 📊

> [!NOTE] **O que vais aprender** 👀 Vais aprender o básico de uma folha de cálculo: células e a sua «morada», linhas, colunas, tabelas, fórmulas para somar e gráficos simples.

Uma folha de cálculo ajuda a organizar números e a transformar dados em informação.

```figure
{ "emoji": "📋", "caption": "Uma folha de cálculo é como um caderno aos quadradinhos gigante: cada quadradinho (célula) guarda um número ou uma palavra, e a folha faz as contas por ti." }
```

## As palavras da folha de cálculo

```keyvalue
[
  { "k": "Célula", "v": "quadradinho onde escreves texto ou número" },
  { "k": "Linha", "v": "conjunto horizontal de células" },
  { "k": "Coluna", "v": "conjunto vertical de células" },
  { "k": "Fórmula", "v": "instrução para calcular, como uma soma" },
  { "k": "Gráfico", "v": "desenho que ajuda a comparar dados" }
]
```

## Cada célula tem uma morada 🏠

As colunas têm **letras** (A, B, C…) e as linhas têm **números** (1, 2, 3…).
Juntando os dois, cada célula tem uma **morada**: a célula na coluna B, linha 3,
chama-se **B3**. Assim podes dizer a uma fórmula exatamente onde estão os números.

> [!TIP] **Truque da morada** Diz sempre primeiro a **letra** da coluna e depois o **número** da linha — como no cinema, quando dizes a fila e depois o lugar. A1, B3, C7: letra, número.

## Um exemplo: contar os livros lidos 📚

Imagina uma tabela com os livros que leste em três meses. Na coluna A escreves o
mês e na coluna B quantos livros leste:

```keyvalue
[
  { "k": "B2 (Jan)", "v": "3 livros" },
  { "k": "B3 (Fev)", "v": "5 livros" },
  { "k": "B4 (Mar)", "v": "4 livros" }
]
```

Para saber o total não somas de cabeça: escreves uma **fórmula**. Todas as
fórmulas começam por **=**. Aqui usas `=SOMA(B2:B4)`, que quer dizer «soma tudo
desde a célula B2 até à B4»:

```math
{ "expr": "3 + 5 + 4 = 12", "say": "três mais cinco mais quatro é igual a doze" }
```

A folha mostra **12** na célula do total. E o melhor: se mudares um número, o
total muda-se sozinho.

Agora vê os mesmos dados como um gráfico de barras — é logo mais fácil comparar:

```chart
{ "title": "Livros lidos por mês", "type": "bar", "labels": ["Jan", "Fev", "Mar"], "data": [3, 5, 4], "say": "Em janeiro três livros, em fevereiro cinco, em março quatro." }
```

## Passo a passo: da tabela ao gráfico

```steps
[
  { "title": "1. Criar a tabela", "body": "Na primeira linha, escreve os títulos: «mês» e «livros lidos»." },
  { "title": "2. Preencher os dados", "body": "Põe cada número na célula certa, por baixo do seu título." },
  { "title": "3. Somar com uma fórmula", "body": "Numa célula vazia escreve =SOMA(...) para teres o total." },
  { "title": "4. Fazer o gráfico", "body": "Seleciona a tabela e escolhe barras para comparar melhor." }
]
```

## Para saberes mais 🌱

A grande magia da folha de cálculo é **recalcular sozinha**: muda um único número
e, num instante, o total e o gráfico mudam também. É por isso que os adultos usam
folhas com **milhares** de células — para as contas de uma loja, de um clube ou
até de uma viagem ao espaço: mudam um valor e veem logo o resultado, sem refazer
nada à mão.

## 🎯 Questionário final

```quiz
{
  "id": "tic-6-folha-calculo-final",
  "final": true,
  "title": "Folha de cálculo",
  "questions": [
    { "q": "Uma célula é…", "layout": "grid",
      "options": [ { "t": "um quadradinho da folha", "emoji": "⬜", "correct": true }, { "t": "uma palavra-passe" }, { "t": "um cabo" } ],
      "explain": "Cada célula pode guardar texto, números ou fórmulas." },
    { "q": "A célula na coluna B e na linha 3 chama-se…", "layout": "grid",
      "options": [ { "t": "B3", "emoji": "🏠", "correct": true }, { "t": "3B" }, { "t": "BB" } ],
      "explain": "Primeiro a letra da coluna, depois o número da linha: B3." },
    { "q": "Uma coluna está organizada na vertical?", "layout": "grid",
      "options": [ { "t": "Sim", "emoji": "↕️", "correct": true }, { "t": "Não, é sempre circular" }, { "t": "Só aos domingos" } ],
      "explain": "Colunas descem de cima para baixo." },
    { "q": "Por que sinal começa sempre uma fórmula?", "layout": "grid",
      "options": [ { "t": "pelo sinal de igual (=)", "emoji": "🟰", "correct": true }, { "t": "por uma letra qualquer" }, { "t": "por um espaço" } ],
      "explain": "Tudo o que começa por = é uma conta que a folha faz por ti, como =SOMA(B2:B4)." },
    { "q": "Um gráfico de barras ajuda a…", "layout": "grid",
      "options": [ { "t": "comparar valores", "emoji": "📊", "correct": true }, { "t": "esconder dados" }, { "t": "apagar linhas" } ],
      "explain": "As barras tornam comparações mais visuais." },
    { "q": "Folhas de cálculo são úteis para…", "layout": "grid",
      "options": [ { "t": "organizar dados", "emoji": "✅", "correct": true }, { "t": "só escrever poemas" }, { "t": "substituir o recreio" } ],
      "explain": "São ferramentas de organização e cálculo." },
    { "q": "Uma linha está organizada na…", "layout": "grid",
      "options": [ { "t": "horizontal", "emoji": "↔️", "correct": true }, { "t": "diagonal" }, { "t": "vertical" } ],
      "explain": "As linhas vão da esquerda para a direita." },
    { "q": "Antes de preencher os dados, é boa ideia…", "layout": "grid",
      "options": [ { "t": "escrever os títulos das colunas", "emoji": "🏷️", "correct": true }, { "t": "apagar a folha toda" }, { "t": "desligar o computador" } ],
      "explain": "Os títulos dizem o que cada coluna guarda, como «mês» e «livros lidos»." },
    { "q": "Se mudares um número de uma célula, o total da fórmula…", "layout": "grid",
      "options": [ { "t": "muda-se sozinho", "emoji": "✨", "correct": true }, { "t": "fica sempre igual" }, { "t": "desaparece" } ],
      "explain": "A folha recalcula sozinha: é a sua grande magia." },
    { "q": "Para mostrar as partes de um todo, é melhor um gráfico…", "layout": "grid",
      "options": [ { "t": "circular", "emoji": "🥧", "correct": true }, { "t": "sem dados nenhuns" }, { "t": "feito só de texto" } ],
      "explain": "O gráfico circular mostra as fatias de um todo." }
  ]
}
```
