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

## O teu estudo de estatística 🔬

Ler gráficos é bom — mas **fazer um estudo do zero** é ainda melhor! Um estudo estatístico completo tem sempre **5 passos**, sempre pela mesma ordem:

```steps
[
  { "title": "1. A pergunta", "body": "decide o que queres descobrir: «Qual é o animal preferido da turma?» 🐾", "icon": "❓" },
  { "title": "2. Recolher os dados", "body": "pergunta a todos e marca risquinhos: cão um grupo de 5 e mais 3, gato um grupo de 5 e mais 1, peixe 3, coelho 4 ✏️", "icon": "📝" },
  { "title": "3. Organizar numa tabela", "body": "conta os risquinhos e escreve: cão 8, gato 6, peixe 3, coelho 4 🗂️", "icon": "🗂️" },
  { "title": "4. Fazer o gráfico", "body": "desenha uma barra por animal — vê-se logo quem ganha 📊", "icon": "📊" },
  { "title": "5. Concluir", "body": "responde à pergunta: «O animal preferido é o cão (a moda), com 8 votos em 21.» 🏁", "icon": "✅" }
]
```

E aqui está o gráfico do passo 4, feito com os dados da turma:

```chart
{ "type": "bar", "title": "O animal preferido da turma 🐾",
  "labels": ["Cão", "Gato", "Peixe", "Coelho"], "data": [8, 6, 3, 4],
  "unit": "votos",
  "say": "O cão teve oito votos, o gato seis, o peixe três e o coelho quatro. O preferido da turma é o cão!" }
```

> [!TIP] Os **risquinhos** (contagem de tally) fazem-se em grupos de 5: quatro risquinhos em pé e o quinto deitado por cima, a fechar o grupo. Assim contas de 5 em 5 num instante! Na conclusão, responde **sempre à pergunta inicial** com uma frase — um gráfico sem conclusão é um estudo a meio. ✏️

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

Olha um a sério: a turma plantou um **feijoeiro** e mediu-o todas as semanas. A linha só sobe — a planta não para de crescer!

```chart
{ "type": "line", "title": "O nosso feijoeiro a crescer 🌱",
  "labels": ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4", "Sem. 5"], "data": [2, 5, 9, 14, 18],
  "unit": "cm", "xLabel": "semana",
  "say": "Na semana um o feijoeiro media dois centímetros; depois cinco, nove, catorze; e na semana cinco já media dezoito. A linha sobe sempre — está a crescer!" }
```

## Vamos praticar 🎈

```quiz
{
  "id": "mat4-dados-pratica",
  "questions": [
    { "q": "Uma tabela organiza os dados em…", "layout": "grid",
      "options": [ { "t": "linhas e colunas", "emoji": "🗂️", "correct": true }, { "t": "círculos", "emoji": "⭕", "feedback": "Círculos são para o gráfico circular. A tabela arruma os dados em linhas (deitadas) e colunas (em pé).", "tag": "dados-leitura-tabela" }, { "t": "letras", "emoji": "🔤", "feedback": "Letras servem para escrever, não para organizar dados. A tabela usa linhas e colunas.", "tag": "dados-leitura-tabela" } ],
      "explain": "Tabelas têm linhas (deitadas) e colunas (em pé)." },
    { "q": "Na tabela das frutas, qual teve MAIS votos?", "layout": "grid",
      "options": [ { "t": "Morango (8)", "emoji": "🍓", "correct": true }, { "t": "Maçã (5)", "emoji": "🍎", "feedback": "A maçã teve 5, mas o morango teve 8 — e 8 é maior. O que teve mais votos é o morango.", "tag": "dados-leitura-tabela" }, { "t": "Banana (3)", "emoji": "🍌", "feedback": "A banana teve só 3, o número mais baixo da tabela. Quem teve mais votos foi o morango, com 8.", "tag": "dados-leitura-tabela" } ],
      "explain": "O morango teve 8 votos — o maior número." },
    { "q": "Num gráfico de barras, a barra mais alta é a que tem…", "layout": "grid",
      "options": [ { "t": "mais", "emoji": "🏆", "correct": true }, { "t": "menos", "emoji": "🐭", "feedback": "Ao contrário: quem tem MENOS é a barra mais baixa. A barra mais alta é a que tem mais quantidade.", "tag": "dados-leitura-grafico" } ],
      "explain": "Barra mais alta = mais quantidade." },
    { "q": "Qual é o MÍNIMO (a fruta com menos votos)?", "layout": "grid",
      "options": [ { "t": "Banana (3)", "emoji": "🍌", "correct": true }, { "t": "Uva (4)", "emoji": "🍇", "feedback": "A uva teve 4, mas a banana teve 3 — e 3 é menos. O mínimo é a banana.", "tag": "dados-leitura-tabela" }, { "t": "Morango (8)", "emoji": "🍓", "feedback": "O morango teve 8, o MÁXIMO! O mínimo é o valor mais baixo: a banana, com 3.", "tag": "dados-leitura-tabela" } ],
      "explain": "A banana, com 3 votos, é o valor mais baixo." },
    { "q": "Num pictograma onde cada 🍦 vale 2, três 🍦 valem…", "layout": "grid",
      "options": [ { "t": "6", "emoji": "🍦", "correct": true }, { "t": "3", "feedback": "3 é só o número de desenhos. Mas cada 🍦 vale 2, por isso multiplicas: 3 × 2 = 6.", "tag": "dados-pictograma" }, { "t": "2", "feedback": "2 é só quanto vale UM desenho. Com três desenhos fazes 3 × 2 = 6.", "tag": "dados-pictograma" } ],
      "explain": "Multiplicas: 3 × 2 = 6. Não contas só os desenhos!" },
    { "q": "Quantos votos a mais teve o morango do que a banana?", "layout": "grid",
      "options": [ { "t": "5", "correct": true }, { "t": "3", "feedback": "3 são os votos da banana, não a diferença. «Quantos a mais» pede uma subtração: 8 − 3 = 5.", "tag": "problema-operacao-errada" }, { "t": "8", "feedback": "8 são os votos do morango, não a diferença. Para saber quantos A MAIS, subtrais: 8 − 3 = 5.", "tag": "problema-operacao-errada" } ],
      "explain": "8 − 3 = 5 votos a mais." },
    { "q": "Onde dizemos o QUE cada coluna conta?", "layout": "grid",
      "options": [ { "t": "no título / cabeçalho", "emoji": "🏷️", "correct": true }, { "t": "no fundo da página", "feedback": "No fundo da página não há essa informação. É no cabeçalho (em cima) que se diz o que cada coluna representa.", "tag": "dados-leitura-tabela" } ],
      "explain": "O cabeçalho diz o que cada coluna representa." },
    { "q": "Quantos votos havia ao todo? (5 + 3 + 8 + 4)", "layout": "grid",
      "options": [ { "t": "20", "emoji": "🧮", "correct": true }, { "t": "16", "feedback": "16 ficou curto — falta somar tudo. 5 + 3 + 8 + 4 = 20.", "tag": "dados-leitura-tabela" }, { "t": "18", "feedback": "18 está perto, mas não certo. Soma com calma: 5 + 3 + 8 + 4 = 20.", "tag": "dados-leitura-tabela" } ],
      "explain": "5 + 3 + 8 + 4 = 20 votos no total." },
    { "q": "A palavra «moda» quer dizer…", "layout": "grid",
      "options": [ { "t": "o mais escolhido", "emoji": "🌟", "correct": true }, { "t": "o mais bonito", "emoji": "👗", "feedback": "Em matemática, «moda» não tem a ver com roupa nem com beleza. É o valor que aparece MAIS vezes — o mais escolhido.", "tag": "dados-moda" } ],
      "explain": "A moda é o valor que aparece mais vezes." }
  ]
}
```

## 🎯 Questionário final

### A tabela das frutas 🍎

Olha para esta tabela sempre que precisares — é a mesma votação da turma!

| Fruta preferida | Votos |
| --- | --- |
| 🍎 Maçã | 5 |
| 🍌 Banana | 3 |
| 🍓 Morango | 8 |
| 🍇 Uva | 4 |

```quiz
{
  "id": "mat4-dados-final",
  "final": true,
  "title": "Gráficos e tabelas",
  "questions": [
    { "q": "Uma tabela organiza dados em…", "layout": "grid",
      "options": [ { "t": "linhas e colunas", "emoji": "🗂️", "correct": true }, { "t": "círculos", "feedback": "Círculos são do gráfico circular. A tabela arruma os dados em linhas e colunas.", "tag": "dados-leitura-tabela" } ],
      "explain": "Tabelas têm linhas e colunas." },
    { "q": "A maçã foi votada assim: 🍎🍎🍎🍎🍎. Quantos votos teve?", "layout": "grid",
      "options": [ { "t": "5", "correct": true }, { "t": "8", "feedback": "8 são os votos do morango. Contando os desenhos da maçã 🍎🍎🍎🍎🍎 dá 5.", "tag": "dados-pictograma" }, { "t": "3", "feedback": "3 são os votos da banana. Conta os desenhos: 🍎🍎🍎🍎🍎 são 5 votos.", "tag": "dados-pictograma" } ],
      "explain": "Contas os desenhos: 🍎🍎🍎🍎🍎 são 5 votos." },
    { "q": "Para que serve um gráfico?", "layout": "grid",
      "options": [ { "t": "comparar de relance", "emoji": "📊", "correct": true }, { "t": "para nada", "feedback": "Serve sim! O gráfico mostra os dados de forma a poderes comparar tudo num relance.", "tag": "dados-tipo-grafico" } ],
      "explain": "Ajuda a comparar informação rapidamente." },
    { "q": "Qual é o MÁXIMO da tabela das frutas?", "layout": "grid",
      "options": [ { "t": "8 (morango)", "emoji": "🍓", "correct": true }, { "t": "3 (banana)", "emoji": "🍌", "feedback": "3 (banana) é o MÍNIMO, o valor mais baixo. O máximo é o mais alto: 8, do morango.", "tag": "dados-leitura-tabela" }, { "t": "4 (uva)", "emoji": "🍇", "feedback": "4 (uva) não é o maior. O máximo é o valor mais alto da tabela: 8, do morango.", "tag": "dados-leitura-tabela" } ],
      "explain": "O máximo é o valor mais alto: 8 votos." },
    { "q": "Num pictograma, o que te diz quanto vale cada desenho?", "layout": "grid",
      "options": [ { "t": "a legenda", "emoji": "🔑", "correct": true }, { "t": "o título do livro", "feedback": "O título do livro não tem nada a ver com o gráfico. Quem diz quanto vale cada desenho é a legenda (ex.: cada 🍦 = 2).", "tag": "dados-pictograma" } ],
      "explain": "A legenda diz o valor de cada símbolo (ex.: cada 🍦 = 2)." },
    { "q": "Se cada 🍦 = 2 e vês 🍦🍦🍦🍦🍦, são quantos gelados?", "layout": "grid",
      "options": [ { "t": "10", "emoji": "🍦", "correct": true }, { "t": "5", "feedback": "5 é só o número de desenhos. Mas cada 🍦 vale 2, por isso multiplicas: 5 × 2 = 10.", "tag": "dados-pictograma" }, { "t": "7", "feedback": "7 não sai de conta nenhuma aqui. Multiplica os 5 desenhos pelo valor 2: 5 × 2 = 10.", "tag": "dados-pictograma" } ],
      "explain": "5 desenhos × 2 = 10 gelados." },
    { "q": "A amplitude é o máximo menos o mínimo. Se o máximo é 8 e o mínimo é 3, quanto é?", "layout": "grid",
      "options": [ { "t": "5", "emoji": "📏", "correct": true }, { "t": "8", "feedback": "8 é só o máximo. A amplitude é máximo MENOS mínimo: 8 − 3 = 5.", "tag": "dados-amplitude" }, { "t": "3", "feedback": "3 é só o mínimo. A amplitude é a diferença entre eles: 8 − 3 = 5.", "tag": "dados-amplitude" } ],
      "explain": "Amplitude = máximo − mínimo = 8 − 3 = 5." },
    { "q": "No eixo do lado de um gráfico de barras está…", "layout": "grid",
      "options": [ { "t": "a escala de números (quantos)", "emoji": "🔢", "correct": true }, { "t": "o nome da escola", "feedback": "O nome da escola não vai num eixo. O eixo do lado mostra a escala de números — quantos de cada coisa.", "tag": "dados-leitura-grafico" } ],
      "explain": "O eixo do lado mostra a escala — quantos de cada coisa." },
    { "q": "Que gráfico mostra melhor como a temperatura muda ao longo da semana?", "layout": "grid",
      "options": [ { "t": "gráfico de linha", "emoji": "📈", "correct": true }, { "t": "tabela de letras", "feedback": "Uma tabela de letras não mostra a mudança ao longo do tempo. Para isso usa-se o gráfico de linha, que sobe e desce.", "tag": "dados-tipo-grafico" } ],
      "explain": "O gráfico de linha mostra como algo muda ao longo do tempo." },
    { "q": "Num estudo estatístico, o que vem PRIMEIRO?", "layout": "grid", "level": 2,
      "hint": "Sem saberes o que queres descobrir, não há nada para contar.",
      "options": [ { "t": "a pergunta", "emoji": "❓", "correct": true }, { "t": "o gráfico", "feedback": "O gráfico vem mais tarde (passo 4). Primeiro tens de saber O QUE queres descobrir — a pergunta.", "tag": "dados-estudo-passos" }, { "t": "a conclusão", "feedback": "A conclusão é o último passo, depois de tudo. O estudo começa sempre pela pergunta.", "tag": "dados-estudo-passos" } ],
      "explain": "Primeiro a pergunta, depois recolher → tabela → gráfico → concluir." },
    { "q": "Para o cão marcaste um grupo fechado de risquinhos e mais 3 soltos. Quantos votos são?", "layout": "grid", "level": 3,
      "hint": "Cada grupo fechado de risquinhos vale 5.",
      "options": [ { "t": "8", "emoji": "🐶", "correct": true }, { "t": "6", "feedback": "6 ficou curto: um grupo fechado vale 5, e mais 3 soltos dá 5 + 3 = 8.", "tag": "dados-pictograma" }, { "t": "53", "feedback": "Não se juntam os algarismos! O grupo fechado vale 5 e somas os 3 soltos: 5 + 3 = 8.", "tag": "dados-pictograma" } ],
      "explain": "Um grupo de 5 + 3 risquinhos soltos = 8 votos." }
  ]
}
```
