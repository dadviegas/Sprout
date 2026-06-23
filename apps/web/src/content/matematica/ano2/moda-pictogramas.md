# A moda e os pictogramas 📊

> [!NOTE] **O que vais aprender** 👀 Vais fazer a tua primeira **investigação com números**: contar votos com **risquinhos**, mostrá-los num **pictograma** (um gráfico feito de desenhos!) e descobrir a **moda** — o que aparece **mais vezes**. Vais virar detetive de dados! 🕵️

Imagina que perguntas à turma: «Qual é a tua fruta preferida?» 🍎🍌🍓 Cada um responde uma coisa… e agora? Como arrumas tantas respostas sem te perderes? É isso que vais aprender hoje: **contar**, **arrumar** e **ler** as respostas como um cientista. 🔬

## Contar com risquinhos ✏️

Quando as respostas chegam uma a uma, fazes um **risquinho** por cada voto. Para não te perderes, juntas os risquinhos em **grupos de 5**: quatro em pé e o quinto **deitado por cima**, a fechar o grupo. Assim contas de 5 em 5, num instante!

```keyvalue
[
  { "k": "1 voto", "v": "um risquinho: |" },
  { "k": "3 votos", "v": "três risquinhos: | | |" },
  { "k": "5 votos", "v": "quatro em pé + um deitado por cima — um grupo fechado! 🖐️" },
  { "k": "7 votos", "v": "um grupo de 5 + 2 risquinhos: 5 + 2 = 7" }
]
```

## O pictograma: um gráfico de desenhos 🍎

Um **pictograma** mostra os votos com **desenhos** — cada desenho vale **1 voto**. Olha os votos da turma do Tomás:

| Fruta | Votos |
| --- | --- |
| Maçã | 🍎🍎🍎🍎🍎 |
| Banana | 🍌🍌🍌 |
| Morango | 🍓🍓🍓🍓🍓🍓🍓 |
| Laranja | 🍊🍊 |

Para saberes quantos votos teve cada fruta, **contas os desenhos**: a maçã teve 5, a banana 3, o morango 7 e a laranja 2. Sem fazer contas difíceis, **vê-se logo** qual tem mais — a fila mais comprida! 👀

## A moda: o que aparece mais vezes 👑

A **moda** é o valor que **aparece mais vezes** — o campeão dos votos! No pictograma da turma, a fila mais comprida é a do **morango** (7 votos). Por isso, a moda é o **morango**. 🍓👑

> É como a roupa que está «na moda»: é a que **mais gente usa**. Nos dados, a moda é a resposta que **mais gente deu**!

## O gráfico de barras 📊

Os mesmos votos também se podem mostrar com **barras** — quanto mais alta a barra, mais votos. A moda é a **barra mais alta**!

```chart
{ "type": "bar", "title": "A fruta preferida da turma",
  "labels": ["Maçã", "Banana", "Morango", "Laranja"], "data": [5, 3, 7, 2],
  "unit": "votos",
  "say": "A maçã teve 5 votos, a banana 3, o morango 7 e a laranja 2. O morango é a moda: é a barra mais alta." }
```

## Um exemplo passo a passo 🔍

A turma da Inês votou no **animal preferido**: cão 🐶, gato 🐱 ou peixe 🐠. Vamos descobrir a moda!

```steps
[
  { "title": "1. Recolhe os votos", "body": "cada amigo diz o seu animal preferido 🗣️", "icon": "👂" },
  { "title": "2. Faz risquinhos", "body": "cão: 6 risquinhos · gato: 8 · peixe: 4 ✏️", "icon": "✏️" },
  { "title": "3. Desenha o pictograma", "body": "🐶×6, 🐱×8, 🐠×4 — uma fila por animal", "icon": "🖼️" },
  { "title": "4. Encontra a moda", "body": "a fila maior é a do gato: a moda é o gato! 🐱👑", "icon": "🎉" }
]
```

> **Truque:** para encontrar a moda **não precisas de fazer contas** — basta procurar a **fila mais comprida** (no pictograma) ou a **barra mais alta** (no gráfico). Os olhos fazem o trabalho! 👀

> [!TIP] **Para saberes mais** 🌱 Em pictogramas de gente crescida, um desenho pode valer **2 ou até 10 votos** — vem sempre escrito numa legenda, por exemplo «🍎 = 2 votos». Aí, 3 maçãs já são 3 × 2 = **6 votos**! Repara sempre na legenda antes de contar. 🔍

## Vamos praticar 🎈

```quiz
{
  "id": "mat-2-dados-pratica",
  "questions": [
    { "q": "Num pictograma, cada desenho vale…", "layout": "grid",
      "options": [ { "t": "1 voto", "emoji": "🍎", "correct": true }, { "t": "10 votos", "feedback": "Um desenho só vale 10 votos se a legenda disser isso. Aqui cada desenho vale 1 voto.", "tag": "pictograma-valor" }, { "t": "nada", "feedback": "Cada desenho conta sim — vale 1 voto. Contas os desenhos da fila para saber quantos votos.", "tag": "pictograma-valor" } ],
      "explain": "Aqui, cada desenho conta 1 voto — contas os desenhos da fila." },
    { "q": "A moda é…", "layout": "grid",
      "options": [ { "t": "o que aparece mais vezes", "emoji": "👑", "correct": true }, { "t": "o que aparece menos vezes", "feedback": "O que aparece menos é o contrário da moda. A moda é o campeão: o que aparece MAIS vezes.", "tag": "dados-vocabulario" }, { "t": "o primeiro da lista", "feedback": "A ordem na lista não decide a moda. A moda é a resposta que aparece mais vezes.", "tag": "dados-vocabulario" } ],
      "explain": "A moda é o campeão — a resposta que mais gente deu." },
    { "q": "🍌🍌🍌🍌 — quantos votos teve a banana?", "layout": "grid",
      "options": [ { "t": "4", "correct": true }, { "t": "3", "feedback": "Conta outra vez devagar: 🍌🍌🍌🍌 são 4 bananas, não 3. Cada uma vale 1 voto: 4 votos.", "tag": "pictograma-contar" }, { "t": "5", "feedback": "São só 4 bananas no desenho, não 5. Cada uma vale 1 voto: 4 votos.", "tag": "pictograma-contar" } ],
      "explain": "Conta os desenhos: 4 bananas = 4 votos." },
    { "q": "Para contar votos um a um usamos…", "layout": "grid",
      "options": [ { "t": "risquinhos", "emoji": "✏️", "correct": true }, { "t": "uma calculadora", "feedback": "A calculadora faz contas, não conta votos um a um. Para isso fazemos um risquinho por cada voto.", "tag": "dados-vocabulario" }, { "t": "um relógio", "feedback": "O relógio marca as horas, não os votos. Para contar votos um a um usamos risquinhos.", "tag": "dados-vocabulario" } ],
      "explain": "Um risquinho por voto, em grupos de 5 para ser fácil contar." },
    { "q": "Quatro risquinhos em pé e um deitado por cima são…", "layout": "grid",
      "options": [ { "t": "5 votos", "emoji": "🖐️", "correct": true }, { "t": "4 votos", "feedback": "Esqueceste o risquinho deitado! Ele também conta: 4 em pé + 1 deitado = 5 votos.", "tag": "risquinhos-grupo-5" }, { "t": "6 votos", "feedback": "São só 5 risquinhos: 4 em pé e 1 deitado por cima. Esse grupo fechado vale 5 votos.", "tag": "risquinhos-grupo-5" } ],
      "explain": "O risquinho deitado fecha o grupo de 5 — como os dedos de uma mão." },
    { "q": "Votos: cão 6, gato 8, peixe 4. Qual é a moda?", "layout": "grid",
      "options": [ { "t": "o gato", "emoji": "🐱", "correct": true }, { "t": "o cão", "emoji": "🐶", "feedback": "O cão teve 6 votos, mas o gato teve 8 — mais. A moda é o que tem mais votos: o gato.", "tag": "dados-moda" }, { "t": "o peixe", "emoji": "🐠", "feedback": "O peixe teve só 4 votos, o menos de todos. A moda é o que tem mais votos: o gato, com 8.", "tag": "dados-moda" } ],
      "explain": "O gato teve mais votos (8) — é a moda!" },
    { "q": "Num gráfico de barras, a moda é a barra…", "layout": "grid",
      "options": [ { "t": "mais alta", "emoji": "📊", "correct": true }, { "t": "mais baixa", "feedback": "A barra mais baixa é a que teve menos votos. A moda é a que tem MAIS votos: a barra mais alta.", "tag": "dados-leitura-grafico" }, { "t": "do meio", "feedback": "A barra do meio não diz nada sobre a moda. A moda é a barra mais alta — mais votos.", "tag": "dados-leitura-grafico" } ],
      "explain": "Mais votos = barra mais alta = a moda." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-2-dados-final",
  "final": true,
  "title": "A moda e os pictogramas",
  "questions": [
    { "q": "Um gráfico feito de desenhos chama-se…", "layout": "grid",
      "options": [ { "t": "pictograma", "emoji": "🖼️", "correct": true }, { "t": "calendário", "feedback": "O calendário mostra os dias e os meses, não votos. Um gráfico feito de desenhos é o pictograma.", "tag": "dados-vocabulario" }, { "t": "tabuada", "feedback": "A tabuada é a das multiplicações. Um gráfico feito de desenhos chama-se pictograma.", "tag": "dados-vocabulario" } ],
      "explain": "Picto = desenho. Cada desenho vale 1 voto." },
    { "q": "🍓🍓🍓🍓🍓🍓🍓 — quantos votos teve o morango?", "layout": "grid",
      "options": [ { "t": "7", "correct": true }, { "t": "6", "feedback": "Conta outra vez com calma: são 7 morangos, não 6. Cada um vale 1 voto: 7 votos.", "tag": "pictograma-contar" }, { "t": "8", "feedback": "São só 7 morangos no desenho, não 8. Cada um vale 1 voto: 7 votos.", "tag": "pictograma-contar" } ],
      "explain": "Conta os desenhos um a um: são 7." },
    { "q": "A moda é o valor que aparece…", "layout": "grid",
      "options": [ { "t": "mais vezes", "emoji": "👑", "correct": true }, { "t": "menos vezes", "feedback": "«Menos vezes» é o contrário da moda. A moda é o valor que aparece MAIS vezes.", "tag": "dados-vocabulario" }, { "t": "uma vez só", "feedback": "Aparecer uma vez só é o oposto de campeão. A moda é o valor que aparece mais vezes.", "tag": "dados-vocabulario" } ],
      "explain": "A moda é a resposta mais repetida — o campeão." },
    { "q": "Maçã 5, banana 3, morango 7, laranja 2. A moda é…", "layout": "grid",
      "options": [ { "t": "o morango", "emoji": "🍓", "correct": true }, { "t": "a maçã", "emoji": "🍎", "feedback": "A maçã teve 5 votos, mas o morango teve 7 — mais. A moda é a que tem mais votos: o morango.", "tag": "dados-moda" }, { "t": "a laranja", "emoji": "🍊", "feedback": "A laranja teve só 2 votos, o menos de todas. A moda é a que tem mais votos: o morango, com 7.", "tag": "dados-moda" } ],
      "explain": "7 é o maior número de votos — a moda é o morango." },
    { "q": "Os risquinhos juntam-se em grupos de…", "layout": "grid",
      "options": [ { "t": "5", "emoji": "🖐️", "correct": true }, { "t": "2", "feedback": "Em grupos de 2 era mais difícil de contar. Juntamos de 5 em 5, como os dedos de uma mão.", "tag": "risquinhos-grupo-5" }, { "t": "100", "feedback": "100 é demasiado para um grupo. Juntamos os risquinhos de 5 em 5, como os dedos da mão.", "tag": "risquinhos-grupo-5" } ],
      "explain": "Grupos de 5 (como os dedos da mão) para contar depressa." },
    { "q": "Um grupo de 5 risquinhos + 3 risquinhos são…", "layout": "grid",
      "options": [ { "t": "8 votos", "correct": true }, { "t": "53 votos", "feedback": "53 colou o 5 ao 3. Aqui somam-se: 5 + 3 = 8 votos.", "tag": "risquinhos-grupo-5" }, { "t": "6 votos", "feedback": "6 era 5 + 1. Mas são 3 risquinhos a juntar ao grupo de 5: 5 + 3 = 8 votos.", "tag": "risquinhos-grupo-5" } ],
      "explain": "5 + 3 = 8 votos." },
    { "q": "No pictograma, a fila mais comprida mostra…", "layout": "grid",
      "options": [ { "t": "a moda", "emoji": "👑", "correct": true }, { "t": "o mais pequeno", "feedback": "O mais pequeno é a fila mais curta, não a mais comprida. A fila mais comprida tem mais votos: a moda.", "tag": "dados-leitura-grafico" }, { "t": "um erro", "feedback": "Não é erro nenhum! A fila mais comprida tem mais desenhos, logo mais votos — é a moda.", "tag": "dados-leitura-grafico" } ],
      "explain": "Mais desenhos = mais votos = a moda." },
    { "q": "Sol 9 votos, chuva 9 votos, neve 2. O que reparas?", "layout": "list",
      "options": [ { "t": "há duas modas: sol e chuva!", "emoji": "🤝", "correct": true }, { "t": "a moda é a neve", "feedback": "A neve teve só 2 votos, o menos de todas. A moda é o topo: o sol e a chuva, empatados com 9.", "tag": "dados-moda" }, { "t": "não há votos", "feedback": "Há votos sim — muitos! O sol e a chuva empatam no topo com 9 votos, por isso há duas modas.", "tag": "dados-moda" } ],
      "explain": "Quando dois valores empatam no topo, os dois são moda." }
  ]
}
```
