# Frações simples 🍕

> [!NOTE] **O que vais aprender** 👀 Vais descobrir o que é uma **fração**, aprender a lê-la e a escrevê-la, e perceber que partilhar uma pizza, um bolo ou uma tablete de chocolate é, afinal, fazer frações! 🍕

Imagina que tens uma pizza e a queres partilhar com os teus amigos. Cortas em fatias iguais e cada um fica com uma parte. Pois é exatamente isso que é uma **fração**: uma maneira de falar das **partes de um todo**. Não tenhas medo dos números de cima e de baixo — eu vou explicar-te tudo com calma. Vamos lá! 😄

## O que é uma fração 🍕

Uma fração tem sempre **dois números**, um por cima do outro, separados por um traço. Cada um tem o seu nome e a sua função.

```keyvalue
[
  { "k": "Numerador (em cima)", "v": "diz quantas partes tens 🟧" },
  { "k": "Traço da fração", "v": "lê-se «sobre» ou «de» — separa os dois números ➗" },
  { "k": "Denominador (em baixo)", "v": "diz em quantas partes iguais dividiste o todo 🍕" }
]
```

Olha a fração **por dentro**: pinta as fatias e repara nos rótulos a apontar — o número de **cima** conta as partes pintadas (numerador) e o de **baixo** conta as partes todas (denominador).

```fraction
{ "parts": 4, "filled": 3, "labels": true, "shape": "pie", "title": "A fração por dentro", "color": "accent" }
```

> A regra de ouro: o todo só vira fração quando as partes são **todas iguais**! Se cortares a pizza em fatias tortas e diferentes, isso não conta. 🟰

## Como se lê e se escreve ✍️

Para ler uma fração, dizes primeiro o número de cima e depois o nome do número de baixo. Olha estes exemplos que vais usar muitas vezes:

```keyvalue
[
  { "k": "1/2", "v": "um meio — é a metade 🌗" },
  { "k": "1/3", "v": "um terço 🍫" },
  { "k": "1/4", "v": "um quarto 🍕" },
  { "k": "3/4", "v": "três quartos — três partes de quatro" },
  { "k": "2/5", "v": "dois quintos — duas partes de cinco" }
]
```

> **1/2** lê-se «um meio»: partiste em **2** e ficaste com **1** parte. **3/4** lê-se «três quartos»: partiste em **4** e ficaste com **3**. 🎉

## Brinca com a fração 🍕

Toca nas fatias para pintar e ver a fração mudar. Repara: o número de **baixo** fica sempre igual (as fatias da pizza), só muda o de **cima** (as que pintas)!

```fraction
{ "parts": 4, "filled": 1, "shape": "pie", "title": "Pinta as fatias da pizza", "color": "accent" }
```

E agora em barra, como uma tablete de chocolate 🍫:

```fraction
{ "parts": 3, "filled": 1, "shape": "bar", "title": "Um terço da tablete", "color": "primary" }
```

## Maior ou mais pequena? 🤏

Aqui vem o truque que muita gente confunde! Quando o número de **baixo** é maior, as fatias ficam **mais pequenas** — porque dividiste o todo em mais bocadinhos.

```compare
[
  { "title": "Poucas fatias 🍕", "rows": [
    { "label": "1/2", "value": "partes a dobrar — cada uma é GRANDE", "highlight": true },
    { "label": "1/3", "value": "partes médias" }
  ] },
  { "title": "Muitas fatias 🤏", "rows": [
    { "label": "1/8", "value": "partes pequeninas — dividiste em 8!", "highlight": true },
    { "label": "1/10", "value": "ainda mais pequenas — dividiste em 10!" }
  ] }
]
```

Vê com os teus olhos: as três barras têm o **mesmo tamanho**, mas só está pintada **1** fatia em cada. Quem tem a fatia pintada mais comprida ganha!

```fractionstrips
{ "mode": "compare", "title": "Qual é a maior?", "color": "primary",
  "rows": [ { "parts": 2, "filled": 1 }, { "parts": 4, "filled": 1 }, { "parts": 8, "filled": 1 } ] }
```

> [!TIP] Pensa numa pizza para ti sozinho (1/2 cada metade — que fartura!) e na mesma pizza para uma turma inteira (1/20 cada — só uma migalha 🤏). Quanto mais gente, mais pequena a fatia!

## Frações especiais 🌟

Há frações com um truque escondido. Quando o número de cima é **igual** ao de baixo, tens o **todo inteiro**!

```keyvalue
[
  { "k": "2/2, 3/3, 4/4...", "v": "é o todo inteiro = 1 (juntaste todas as partes!) 🟢" },
  { "k": "2/4", "v": "duas de quatro partes — é o mesmo que 1/2 (metade)! 🌗" },
  { "k": "0/4", "v": "nenhuma parte pintada = nada 😅" }
]
```

> Se comeres **as 8 fatias** de uma pizza partida em 8, comeste **8/8** — ou seja, a **pizza toda**! 🍕😋

## Frações de um grupo 🍬

Uma fração também serve para repartir um **grupo de coisas**, não só uma pizza. Para descobrir **1/3 de 12 rebuçados**, divides os 12 em **3 grupos iguais** e ficas com **1** grupo. Conta quantos rebuçados ficam na caixa pintada:

```fractionof
{ "whole": 12, "parts": 3, "take": 1, "emoji": "🍬", "title": "1/3 de 12 rebuçados", "color": "accent" }
```

> **Truque:** o número de **baixo** diz em quantos grupos divides; o de **cima** diz quantos grupos levas. Então **1/3 de 12 = 12 ÷ 3 = 4**. 🍬

## Um exemplo passo a passo 🔍

Vamos resolver juntos: *«Cortei um bolo em 6 fatias iguais e comi 2. Que fração do bolo comi?»* 🎂

```steps
[
  { "title": "1. Conta em quantas partes dividiste", "body": "o bolo foi cortado em 6 fatias iguais — esse é o número de BAIXO (denominador)", "icon": "🎂" },
  { "title": "2. Conta as partes que usaste", "body": "comeste 2 fatias — esse é o número de CIMA (numerador)", "icon": "😋" },
  { "title": "3. Escreve a fração", "body": "põe as partes que comeste em cima e o total em baixo: 2/6", "icon": "✍️" },
  { "title": "4. Lê em voz alta", "body": "2/6 lê-se «dois sextos»", "icon": "🗣️" },
  { "title": "5. Resposta", "body": "comeste 2/6 do bolo — sobraram 4/6 para os outros! 🎉", "icon": "✅" }
]
```

> **Truque:** lembra-te de **«Cima = Comi, Baixo = Bocados»**! O número de cima são as partes que tens (que comeste); o de baixo são todos os bocados em que partiste o todo. 🍰

> [!TIP] **Para saberes mais** 🌱 Duas frações podem valer o **mesmo** mesmo parecendo diferentes — chamam-se **frações equivalentes**. Por exemplo, **1/2 = 2/4 = 4/8**: metade da pizza é sempre metade, quer a cortes em 2, em 4 ou em 8 fatias! Vê nas barras aqui em baixo. 🤓

As três barras são do mesmo tamanho e têm sempre **a mesma parte pintada** — só muda em quantos bocados a cortei:

```fractionstrips
{ "mode": "equivalent", "title": "1/2 = 2/4 = 4/8", "color": "accent",
  "rows": [ { "parts": 2, "filled": 1 }, { "parts": 4, "filled": 2 }, { "parts": 8, "filled": 4 } ] }
```

## Vamos praticar 🎈

```quiz
{
  "id": "mat3-frac-pratica",
  "questions": [
    { "gen": { "kind": "fraction", "shape": "pie", "max": 6 } },
    { "gen": { "kind": "fraction", "shape": "bar", "max": 8 } },
    { "q": "Partiste uma pizza em 2 e comeste 1 fatia. Que fração comeste?", "emoji": "🍕", "layout": "grid",
      "options": [ { "t": "1/2", "correct": true }, { "t": "1/4" }, { "t": "2/2" } ],
      "explain": "1 parte de 2 = 1/2 (metade)." },
    { "q": "Como se lê 1/4?", "layout": "grid",
      "options": [ { "t": "um quarto", "correct": true }, { "t": "um meio" }, { "t": "catorze" } ],
      "explain": "1/4 lê-se «um quarto»." },
    { "q": "Numa fração, o número de BAIXO diz...", "layout": "grid",
      "options": [ { "t": "em quantas partes iguais dividiste", "emoji": "🍕", "correct": true }, { "t": "quantas partes comeste" }, { "t": "a tua idade" } ],
      "explain": "O número de baixo (denominador) diz em quantas partes se dividiu o todo." },
    { "q": "Cortaste um bolo em 3 fatias iguais e comeste 1. Que fração?", "emoji": "🎂", "layout": "grid",
      "options": [ { "t": "1/3", "correct": true }, { "t": "3/1" }, { "t": "1/2" } ],
      "explain": "1 parte de 3 = 1/3 (um terço)." },
    { "q": "Qual fatia é MAIOR?", "layout": "grid",
      "options": [ { "t": "1/2", "emoji": "🍕", "correct": true }, { "t": "1/4" }, { "t": "1/8" } ],
      "explain": "Menos fatias = fatias maiores. 1/2 é a maior!" },
    { "q": "Pintaste 3 de 4 quadrados. Que fração pintaste?", "layout": "grid",
      "options": [ { "t": "3/4", "correct": true }, { "t": "4/3" }, { "t": "1/4" } ],
      "explain": "3 partes de 4 = 3/4 (três quartos)." },
    { "q": "Comeste as 4 fatias de uma pizza partida em 4. Quanto comeste?", "emoji": "🍕", "layout": "grid",
      "options": [ { "t": "4/4 = a pizza toda!", "correct": true }, { "t": "1/4" }, { "t": "metade" } ],
      "explain": "4/4 é o todo inteiro — comeste a pizza toda! 😋" },
    { "q": "Como se lê 3/4?", "layout": "grid",
      "options": [ { "t": "três quartos", "correct": true }, { "t": "trinta e quatro" }, { "t": "três meios" } ],
      "explain": "3/4 lê-se «três quartos»." },
    { "q": "Para uma fração valer, as partes têm de ser...", "layout": "grid",
      "options": [ { "t": "todas iguais", "emoji": "🟰", "correct": true }, { "t": "todas diferentes" }, { "t": "muito grandes" } ],
      "explain": "As partes de uma fração são sempre iguais." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat3-frac-final",
  "final": true,
  "title": "Frações simples",
  "questions": [
    { "q": "Que fração está pintada?", "layout": "grid",
      "figure": { "parts": 4, "filled": 3, "shape": "pie", "color": "accent" },
      "options": [ { "t": "3/4", "correct": true }, { "t": "4/3" }, { "t": "1/4" } ],
      "explain": "Estão pintadas 3 de 4 partes: 3/4." },
    { "gen": { "kind": "fraction", "shape": "bar", "max": 6 } },
    { "q": "Na fração 3/4, o número de baixo (4) diz...", "layout": "grid",
      "options": [ { "t": "em quantas partes dividimos", "correct": true }, { "t": "quantas partes temos" } ],
      "explain": "O denominador (em baixo) diz em quantas partes se dividiu." },
    { "q": "Metade escreve-se...", "layout": "grid",
      "options": [ { "t": "1/2", "correct": true }, { "t": "1/3" }, { "t": "2/1" } ],
      "explain": "Metade = 1/2." },
    { "q": "Qual fatia é MAIOR?", "layout": "grid",
      "options": [ { "t": "1/2", "emoji": "🍕", "correct": true }, { "t": "1/4" }, { "t": "1/8" } ],
      "explain": "Menos fatias = fatias maiores. 1/2 é a maior." },
    { "q": "Pintaste 2 de 4 quadrados. Que fração?", "layout": "grid",
      "options": [ { "t": "2/4", "correct": true }, { "t": "4/2" }, { "t": "2/2" } ],
      "explain": "2 partes de 4 = 2/4 (que também é metade!)." },
    { "q": "Como é que se chama o número de CIMA de uma fração?", "layout": "grid",
      "options": [ { "t": "numerador", "correct": true }, { "t": "denominador" }, { "t": "calculadora" } ],
      "explain": "O número de cima é o numerador; o de baixo é o denominador." },
    { "q": "Como se lê 2/5?", "layout": "grid",
      "options": [ { "t": "dois quintos", "correct": true }, { "t": "vinte e cinco" }, { "t": "dois meios" } ],
      "explain": "2/5 lê-se «dois quintos» — 2 partes de 5." },
    { "q": "Comeste as 8 fatias de uma pizza partida em 8. Que fração comeste?", "emoji": "🍕", "layout": "grid",
      "options": [ { "t": "8/8 (a pizza toda)", "correct": true }, { "t": "1/8" }, { "t": "metade" } ],
      "explain": "8/8 é o todo inteiro — a pizza toda! 😋" },
    { "q": "Cortaste um chocolate em 6 e deste 1 ao teu amigo. Que fração lhe deste?", "emoji": "🍫", "layout": "grid",
      "options": [ { "t": "1/6", "correct": true }, { "t": "6/1" }, { "t": "1/2" } ],
      "explain": "1 parte de 6 = 1/6 (um sexto)." },
    { "q": "Qual destas frações é IGUAL a 1/2?", "layout": "grid",
      "options": [ { "t": "2/4", "correct": true }, { "t": "1/4" }, { "t": "1/3" } ],
      "explain": "2/4 vale o mesmo que 1/2 — são frações equivalentes!" }
  ]
}
```
