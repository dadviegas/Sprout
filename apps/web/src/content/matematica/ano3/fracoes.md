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

## Frações equivalentes 👯

Duas frações podem valer **o mesmo** mesmo parecendo diferentes — chamam-se **frações equivalentes**. Metade da pizza é sempre metade, quer a cortes em 2, em 4 ou em 8 fatias! Compara as duas pizzas — a parte pintada é igualzinha:

```fraction
{ "parts": 2, "filled": 1, "shape": "pie", "title": "1/2 — metade em 2 fatias", "color": "accent", "interactive": false }
```

```fraction
{ "parts": 4, "filled": 2, "shape": "pie", "title": "2/4 — a MESMA metade em 4 fatias", "color": "accent", "interactive": false }
```

E nas barras vês a família toda: do mesmo tamanho, sempre **a mesma parte pintada** — só muda em quantos bocados a cortei:

```fractionstrips
{ "mode": "equivalent", "title": "1/2 = 2/4 = 4/8", "color": "accent",
  "rows": [ { "parts": 2, "filled": 1 }, { "parts": 4, "filled": 2 }, { "parts": 8, "filled": 4 } ] }
```

```math
{ "expr": "1/2 = 2/4 = 4/8", "say": "um meio, dois quartos e quatro oitavos são frações equivalentes: valem todas metade" }
```

> **Truque da dobradura:** corta cada fatia **ao meio** e a fração não muda de valor — dobras o número de cima E o de baixo ao mesmo tempo: 1/2 → 2/4 → 4/8. Se só mudasses um deles, aí sim a fração mudava! ✂️

> [!TIP] **Para saberes mais** 🌱 Este jogo também funciona ao contrário: 4/8 pode **encolher** para 2/4 e depois para 1/2 — chama-se **simplificar** uma fração, e é como arrumar a fração na sua forma mais simples. No 5.º ano vais usar isto a toda a hora! 🤓

## Vamos praticar 🎈

```quiz
{
  "id": "mat3-frac-pratica",
  "questions": [
    { "gen": { "kind": "fraction", "shape": "pie", "max": 6 } },
    { "gen": { "kind": "fraction", "shape": "bar", "max": 8 } },
    { "q": "Partiste uma pizza em 2 e comeste 1 fatia. Que fração comeste?", "emoji": "🍕", "layout": "grid",
      "options": [ { "t": "1/2", "correct": true }, { "t": "1/4", "feedback": "1/4 é partir em quatro. Aqui partiste em 2 e comeste 1: 1/2.", "tag": "fracao-denominador-errado" }, { "t": "2/2", "feedback": "2/2 seria a pizza toda. Comeste só 1 das 2 fatias: 1/2.", "tag": "fracao-numerador-errado" } ],
      "explain": "1 parte de 2 = 1/2 (metade)." },
    { "q": "Como se lê 1/4?", "layout": "grid",
      "options": [ { "t": "um quarto", "correct": true }, { "t": "um meio", "feedback": "Um meio é 1/2. Aqui o de baixo é 4: lê-se um quarto.", "tag": "fracao-metade-quarto" }, { "t": "catorze", "feedback": "Não se juntam os algarismos: 1/4 lê-se «um quarto», não catorze.", "tag": "fracao-leitura-junta" } ],
      "explain": "1/4 lê-se «um quarto»." },
    { "q": "Numa fração, o número de BAIXO diz...", "layout": "grid",
      "options": [ { "t": "em quantas partes iguais dividiste", "emoji": "🍕", "correct": true }, { "t": "quantas partes comeste", "feedback": "Isso é o número de CIMA (numerador). O de baixo diz em quantas partes dividiste.", "tag": "fracao-numerador-vs-denominador" }, { "t": "a tua idade" } ],
      "explain": "O número de baixo (denominador) diz em quantas partes se dividiu o todo." },
    { "q": "Cortaste um bolo em 3 fatias iguais e comeste 1. Que fração?", "emoji": "🎂", "layout": "grid",
      "options": [ { "t": "1/3", "correct": true }, { "t": "3/1", "feedback": "Trocaste os números: dividiste em 3 e comeste 1, logo 1/3 (o total vai por baixo).", "tag": "fracao-invertida" }, { "t": "1/2", "feedback": "1/2 é partir em dois. Aqui são 3 fatias: 1/3.", "tag": "fracao-denominador-errado" } ],
      "explain": "1 parte de 3 = 1/3 (um terço)." },
    { "q": "Qual fatia é MAIOR?", "layout": "grid",
      "options": [ { "t": "1/2", "emoji": "🍕", "correct": true }, { "t": "1/4", "feedback": "Quanto mais fatias, menores ficam. 1/4 é menor que 1/2.", "tag": "fracao-mais-partes-menor" }, { "t": "1/8", "feedback": "1/8 são oito fatias pequeninas — a menor de todas. A maior é 1/2.", "tag": "fracao-mais-partes-menor" } ],
      "explain": "Menos fatias = fatias maiores. 1/2 é a maior!" },
    { "q": "Pintaste 3 de 4 quadrados. Que fração pintaste?", "layout": "grid",
      "options": [ { "t": "3/4", "correct": true }, { "t": "4/3", "feedback": "Trocaste os números: pintaste 3 das 4 partes, logo 3/4 (o total vai por baixo).", "tag": "fracao-invertida" }, { "t": "1/4", "feedback": "1/4 é uma parte pintada. Aqui pintaste 3: 3/4.", "tag": "fracao-numerador-errado" } ],
      "explain": "3 partes de 4 = 3/4 (três quartos)." },
    { "q": "Comeste as 4 fatias de uma pizza partida em 4. Quanto comeste?", "emoji": "🍕", "layout": "grid",
      "options": [ { "t": "4/4 = a pizza toda!", "correct": true }, { "t": "1/4", "feedback": "1/4 é só uma fatia. Comeste as 4: 4/4, a pizza toda!", "tag": "fracao-todo" }, { "t": "metade", "feedback": "Metade seria 2 de 4. Comeste as 4 fatias: 4/4, tudo!", "tag": "fracao-metade-quarto" } ],
      "explain": "4/4 é o todo inteiro — comeste a pizza toda! 😋" },
    { "q": "Como se lê 3/4?", "layout": "grid",
      "options": [ { "t": "três quartos", "correct": true }, { "t": "trinta e quatro", "feedback": "Não se juntam os algarismos: 3/4 lê-se «três quartos».", "tag": "fracao-leitura-junta" }, { "t": "três meios", "feedback": "«Meios» é a família do 2. Por baixo está o 4, a família dos quartos: três quartos.", "tag": "fracao-leitura-familia" } ],
      "explain": "3/4 lê-se «três quartos»." },
    { "q": "Para uma fração valer, as partes têm de ser...", "layout": "grid",
      "options": [ { "t": "todas iguais", "emoji": "🟰", "correct": true }, { "t": "todas diferentes" }, { "t": "muito grandes" } ],
      "explain": "As partes de uma fração são sempre iguais." },
    { "q": "1/2 e 2/4 são frações...", "layout": "grid", "level": 2,
      "hint": "Pinta metade de cada pizza e compara!",
      "options": [ { "t": "equivalentes (valem o mesmo)", "emoji": "👯", "correct": true }, { "t": "diferentes", "feedback": "Pinta metade nas duas: ocupam o mesmo espaço. 1/2 = 2/4, são equivalentes.", "tag": "fracao-equivalente" }, { "t": "inimigas" } ],
      "explain": "Metade é metade: 1/2 = 2/4 — equivalentes!" },
    { "q": "Corta cada fatia de 2/4 ao meio. Que fração equivalente nasce?", "layout": "grid", "level": 3,
      "hint": "Dobra o número de cima E o de baixo.",
      "options": [ { "t": "4/8", "emoji": "✂️", "correct": true }, { "t": "2/8", "feedback": "Dobraste só o número de baixo. Dobra OS DOIS: 2/4 → 4/8.", "tag": "fracao-equivalente-um-numero" }, { "t": "4/4", "feedback": "4/4 é a pizza toda. Metade cortada mais fina continua metade: 4/8.", "tag": "fracao-equivalente" } ],
      "explain": "2/4 → dobra os dois números → 4/8. Continua a ser metade!" }
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
    { "q": "Que fração está pintada?", "layout": "grid", "level": 1,
      "hint": "Conta as partes pintadas (cima) e as partes todas (baixo).",
      "figure": { "parts": 4, "filled": 3, "shape": "pie", "color": "accent" },
      "options": [ { "t": "3/4", "correct": true }, { "t": "4/3", "feedback": "Trocaste os números: 3 partes pintadas em 4 = 3/4 (o total vai por baixo).", "tag": "fracao-invertida" }, { "t": "1/4", "feedback": "1/4 é uma parte. Estão pintadas 3: 3/4.", "tag": "fracao-numerador-errado" } ],
      "explain": "Estão pintadas 3 de 4 partes: 3/4." },
    { "gen": { "kind": "fraction", "shape": "bar", "max": 6 } },
    { "q": "Na fração 3/4, o número de baixo (4) diz...", "layout": "grid", "level": 1,
      "hint": "Lembra-te: Baixo = Bocados!",
      "options": [ { "t": "em quantas partes dividimos", "correct": true }, { "t": "quantas partes temos", "feedback": "Isso é o número de cima (numerador). O de baixo (4) diz em quantas partes dividimos.", "tag": "fracao-numerador-vs-denominador" } ],
      "explain": "O denominador (em baixo) diz em quantas partes se dividiu." },
    { "q": "Metade escreve-se...", "layout": "grid", "level": 1,
      "hint": "Partes o todo em 2 e ficas com 1.",
      "options": [ { "t": "1/2", "correct": true }, { "t": "1/3", "feedback": "1/3 é partir em três. Metade é partir em dois: 1/2.", "tag": "fracao-denominador-errado" }, { "t": "2/1", "feedback": "Trocaste os números: metade é 1 parte de 2, ou seja 1/2.", "tag": "fracao-invertida" } ],
      "explain": "Metade = 1/2." },
    { "q": "Qual fatia é MAIOR?", "layout": "grid", "level": 2,
      "hint": "Quanto mais fatias na pizza, mais pequena fica cada uma.",
      "options": [ { "t": "1/2", "emoji": "🍕", "correct": true }, { "t": "1/4", "feedback": "Mais fatias, mais pequenas. 1/4 é menor que 1/2.", "tag": "fracao-mais-partes-menor" }, { "t": "1/8", "feedback": "1/8 são oito fatias minúsculas — a menor. A maior é 1/2.", "tag": "fracao-mais-partes-menor" } ],
      "explain": "Menos fatias = fatias maiores. 1/2 é a maior." },
    { "q": "Pintaste 2 de 4 quadrados. Que fração?", "layout": "grid", "level": 1,
      "hint": "Cima = as que pintaste; baixo = todas.",
      "options": [ { "t": "2/4", "correct": true }, { "t": "4/2", "feedback": "Trocaste os números: 2 pintados em 4 = 2/4 (o total vai por baixo).", "tag": "fracao-invertida" }, { "t": "2/2", "feedback": "2/2 seria tudo pintado. Pintaste 2 dos 4: 2/4.", "tag": "fracao-numerador-errado" } ],
      "explain": "2 partes de 4 = 2/4 (que também é metade!)." },
    { "q": "Como é que se chama o número de CIMA de uma fração?", "layout": "grid", "level": 1,
      "hint": "É o que conta as partes que tens na mão.",
      "options": [ { "t": "numerador", "correct": true }, { "t": "denominador", "feedback": "Trocaste: o denominador é o de baixo. O de cima é o numerador.", "tag": "fracao-numerador-vs-denominador" }, { "t": "calculadora" } ],
      "explain": "O número de cima é o numerador; o de baixo é o denominador." },
    { "q": "Como se lê 2/5?", "layout": "grid", "level": 2,
      "hint": "Diz primeiro o número de cima, depois o nome da família do 5.",
      "options": [ { "t": "dois quintos", "correct": true }, { "t": "vinte e cinco", "feedback": "Não se juntam os algarismos: 2/5 lê-se «dois quintos».", "tag": "fracao-leitura-junta" }, { "t": "dois meios", "feedback": "«Meios» é a família do 2. Por baixo está o 5: dois quintos.", "tag": "fracao-leitura-familia" } ],
      "explain": "2/5 lê-se «dois quintos» — 2 partes de 5." },
    { "q": "Comeste as 8 fatias de uma pizza partida em 8. Que fração comeste?", "emoji": "🍕", "layout": "grid", "level": 2,
      "hint": "Cima igual a baixo… ficou alguma fatia no prato?",
      "options": [ { "t": "8/8 (a pizza toda)", "correct": true }, { "t": "1/8", "feedback": "1/8 é uma fatia. Comeste as 8: 8/8, a pizza toda!", "tag": "fracao-todo" }, { "t": "metade", "feedback": "Metade seria 4 de 8. Comeste as 8: 8/8, tudo!", "tag": "fracao-metade-quarto" } ],
      "explain": "8/8 é o todo inteiro — a pizza toda! 😋" },
    { "q": "Cortaste um chocolate em 6 e deste 1 ao teu amigo. Que fração lhe deste?", "emoji": "🍫", "layout": "grid", "level": 1,
      "hint": "Os bocados todos vão para baixo; o que deste vai para cima.",
      "options": [ { "t": "1/6", "correct": true }, { "t": "6/1", "feedback": "Trocaste os números: deste 1 de 6 partes, logo 1/6.", "tag": "fracao-invertida" }, { "t": "1/2", "feedback": "1/2 é partir em dois. O chocolate tem 6 partes: 1/6.", "tag": "fracao-denominador-errado" } ],
      "explain": "1 parte de 6 = 1/6 (um sexto)." },
    { "q": "Qual destas frações é IGUAL a 1/2?", "layout": "grid", "level": 3,
      "hint": "Dobra o número de cima E o de baixo ao mesmo tempo.",
      "options": [ { "t": "2/4", "correct": true }, { "t": "1/4", "feedback": "1/4 é metade de metade, mais pequeno. 1/2 é o mesmo que 2/4.", "tag": "fracao-metade-quarto" }, { "t": "1/3", "feedback": "1/3 é uma parte de três, não chega a metade. 1/2 = 2/4.", "tag": "fracao-equivalente" } ],
      "explain": "2/4 vale o mesmo que 1/2 — são frações equivalentes!" }
  ]
}
```
