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
      "options": [ { "t": "1 voto", "emoji": "🍎", "correct": true }, { "t": "10 votos" }, { "t": "nada" } ],
      "explain": "Aqui, cada desenho conta 1 voto — contas os desenhos da fila." },
    { "q": "A moda é…", "layout": "grid",
      "options": [ { "t": "o que aparece mais vezes", "emoji": "👑", "correct": true }, { "t": "o que aparece menos vezes" }, { "t": "o primeiro da lista" } ],
      "explain": "A moda é o campeão — a resposta que mais gente deu." },
    { "q": "🍌🍌🍌🍌 — quantos votos teve a banana?", "layout": "grid",
      "options": [ { "t": "4", "correct": true }, { "t": "3" }, { "t": "5" } ],
      "explain": "Conta os desenhos: 4 bananas = 4 votos." },
    { "q": "Para contar votos um a um usamos…", "layout": "grid",
      "options": [ { "t": "risquinhos", "emoji": "✏️", "correct": true }, { "t": "uma calculadora" }, { "t": "um relógio" } ],
      "explain": "Um risquinho por voto, em grupos de 5 para ser fácil contar." },
    { "q": "Quatro risquinhos em pé e um deitado por cima são…", "layout": "grid",
      "options": [ { "t": "5 votos", "emoji": "🖐️", "correct": true }, { "t": "4 votos" }, { "t": "6 votos" } ],
      "explain": "O risquinho deitado fecha o grupo de 5 — como os dedos de uma mão." },
    { "q": "Votos: cão 6, gato 8, peixe 4. Qual é a moda?", "layout": "grid",
      "options": [ { "t": "o gato", "emoji": "🐱", "correct": true }, { "t": "o cão", "emoji": "🐶" }, { "t": "o peixe", "emoji": "🐠" } ],
      "explain": "O gato teve mais votos (8) — é a moda!" },
    { "q": "Num gráfico de barras, a moda é a barra…", "layout": "grid",
      "options": [ { "t": "mais alta", "emoji": "📊", "correct": true }, { "t": "mais baixa" }, { "t": "do meio" } ],
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
      "options": [ { "t": "pictograma", "emoji": "🖼️", "correct": true }, { "t": "calendário" }, { "t": "tabuada" } ],
      "explain": "Picto = desenho. Cada desenho vale 1 voto." },
    { "q": "🍓🍓🍓🍓🍓🍓🍓 — quantos votos teve o morango?", "layout": "grid",
      "options": [ { "t": "7", "correct": true }, { "t": "6" }, { "t": "8" } ],
      "explain": "Conta os desenhos um a um: são 7." },
    { "q": "A moda é o valor que aparece…", "layout": "grid",
      "options": [ { "t": "mais vezes", "emoji": "👑", "correct": true }, { "t": "menos vezes" }, { "t": "uma vez só" } ],
      "explain": "A moda é a resposta mais repetida — o campeão." },
    { "q": "Maçã 5, banana 3, morango 7, laranja 2. A moda é…", "layout": "grid",
      "options": [ { "t": "o morango", "emoji": "🍓", "correct": true }, { "t": "a maçã", "emoji": "🍎" }, { "t": "a laranja", "emoji": "🍊" } ],
      "explain": "7 é o maior número de votos — a moda é o morango." },
    { "q": "Os risquinhos juntam-se em grupos de…", "layout": "grid",
      "options": [ { "t": "5", "emoji": "🖐️", "correct": true }, { "t": "2" }, { "t": "100" } ],
      "explain": "Grupos de 5 (como os dedos da mão) para contar depressa." },
    { "q": "Um grupo de 5 risquinhos + 3 risquinhos são…", "layout": "grid",
      "options": [ { "t": "8 votos", "correct": true }, { "t": "53 votos" }, { "t": "6 votos" } ],
      "explain": "5 + 3 = 8 votos." },
    { "q": "No pictograma, a fila mais comprida mostra…", "layout": "grid",
      "options": [ { "t": "a moda", "emoji": "👑", "correct": true }, { "t": "o mais pequeno" }, { "t": "um erro" } ],
      "explain": "Mais desenhos = mais votos = a moda." },
    { "q": "Sol 9 votos, chuva 9 votos, neve 2. O que reparas?", "layout": "list",
      "options": [ { "t": "há duas modas: sol e chuva!", "emoji": "🤝", "correct": true }, { "t": "a moda é a neve" }, { "t": "não há votos" } ],
      "explain": "Quando dois valores empatam no topo, os dois são moda." }
  ]
}
```
