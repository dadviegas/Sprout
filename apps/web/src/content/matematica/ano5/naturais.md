# Números naturais e operações 🔢

> [!NOTE] **O que vais aprender** 👀 Vais reler números **enormes** (milhões e milhares de milhão), arrumá-los por **classes e ordens**, dominar as **quatro operações** com algoritmos, descobrir a **ordem certa de fazer as contas** (com parênteses!) e os **truques** que poupam tempo. Tudo isto a sério, já no 2.º ciclo! 🚀

Já contas há muitos anos — mas no 5.º ano os números crescem mesmo! 😮 Vais lidar com **milhões**, **milhares de milhão** e contas com várias operações ao mesmo tempo. A boa notícia? As regras são poucas e, quando as percebes, tornam-se fáceis. Anda daí descobrir os segredos dos números grandes. 🕵️

## Classes e ordens — arrumar o número 🗂️

Cada algarismo tem o seu **lugar**, e o lugar diz quanto ele **vale**. Os lugares (as **ordens**) juntam-se de **3 em 3** em **classes**: unidades, milhares, milhões… É como caixas dentro de caixas! 📦

```keyvalue
[
  { "k": "Ordem", "v": "o lugar de cada algarismo: unidades, dezenas, centenas… 🔢" },
  { "k": "Classe", "v": "um grupo de 3 ordens — separa-se com um espaço: 12 500 000 🗂️" },
  { "k": "Classe das unidades", "v": "U, D, C (unidades, dezenas, centenas)" },
  { "k": "Classe dos milhares", "v": "começa nos milhares: 1 000 = 1 milhar 🔟" },
  { "k": "Classe dos milhões", "v": "1 000 000 = 1 milhão — um 1 com 6 zeros! 😲" }
]
```

Olha o número **3 250 000** repartido pelas suas classes. Repara como cada classe tem 3 ordens:

```compare
[
  { "title": "Classe dos milhões", "rows": [ { "label": "Centenas de milhão", "value": "—" }, { "label": "Dezenas de milhão", "value": "—" }, { "label": "Unidades de milhão", "value": "3" } ] },
  { "title": "Classe dos milhares", "highlight": true, "rows": [ { "label": "Centenas de milhar", "value": "2" }, { "label": "Dezenas de milhar", "value": "5" }, { "label": "Unidades de milhar", "value": "0" } ] },
  { "title": "Classe das unidades", "rows": [ { "label": "Centenas", "value": "0" }, { "label": "Dezenas", "value": "0" }, { "label": "Unidades", "value": "0" } ] }
]
```

Lê-se **«três milhões, duzentos e cinquenta mil»**. Vês? Lês **classe a classe**, da esquerda para a direita, e dizes o nome da classe ao fim de cada uma. 🎤

## O valor de cada algarismo 💎

O mesmo algarismo vale coisas **diferentes** conforme o lugar. No número **4 444**, há quatro «4», mas cada um vale outra coisa!

```stats
[
  { "label": "4 (unidades)", "value": "4", "hint": "vale 4" },
  { "label": "4 (dezenas)", "value": "40", "hint": "vale 4 × 10" },
  { "label": "4 (centenas)", "value": "400", "hint": "vale 4 × 100" },
  { "label": "4 (milhares)", "value": "4000", "hint": "vale 4 × 1000" }
]
```

```math
{ "expr": "4444 = 4000 + 400 + 40 + 4", "say": "quatro mil quatrocentos e quarenta e quatro é igual a quatro mil mais quatrocentos mais quarenta mais quatro" }
```

> Isto chama-se **decomposição**: partir o número na soma do valor de cada algarismo. Ajuda imenso a perceber as contas! 🧩

## As quatro operações e os seus nomes ➕➖✖️➗

Cada operação tem nomes próprios para as suas partes. Saber estes nomes ajuda a perceber os enunciados dos problemas. 🤓

```compare
[
  { "title": "Adição ➕ e Subtração ➖", "rows": [
    { "label": "parcelas + parcelas", "value": "= soma (total)" },
    { "label": "aditivo − subtrativo", "value": "= diferença / resto" },
    { "label": "exemplo", "value": "8 + 5 = 13;  13 − 5 = 8" }
  ] },
  { "title": "Multiplicação ✖️ e Divisão ➗", "highlight": true, "rows": [
    { "label": "fatores × fatores", "value": "= produto" },
    { "label": "dividendo ÷ divisor", "value": "= quociente (+ resto)" },
    { "label": "exemplo", "value": "6 × 7 = 42;  20 ÷ 3 = 6 e sobra 2" }
  ] }
]
```

## A ordem das operações — quem joga primeiro? 🥇

Numa conta com **várias** operações, não se faz da esquerda para a direita à toa! Há uma **fila de prioridades**, senão cada pessoa daria um resultado diferente. 😵

```steps
[
  { "title": "1.º — Parênteses ( )", "body": "resolve sempre primeiro o que está dentro dos parênteses 🔒", "icon": "lock" },
  { "title": "2.º — × e ÷", "body": "depois as multiplicações e divisões, pela ordem em que aparecem ✖️➗", "icon": "✖️" },
  { "title": "3.º — + e −", "body": "por último, as adições e subtrações, da esquerda para a direita ➕➖", "icon": "➕" }
]
```

Repara como os parênteses **mudam tudo**:

```math
{ "expr": "2 + 3 × 4 = 14", "say": "dois mais três vezes quatro: primeiro três vezes quatro são doze, mais dois são catorze" }
```

```math
{ "expr": "(2 + 3) × 4 = 20", "say": "abre parênteses dois mais três fecha parênteses vezes quatro: primeiro dentro dos parênteses dois mais três são cinco, vezes quatro são vinte" }
```

> [!WARNING] **2 + 3 × 4** não é 20! Sem parênteses, a multiplicação joga **primeiro**: 3 × 4 = 12, e só depois 2 + 12 = **14**. Os parênteses é que «furam a fila». 🚦

## Truques de cálculo mental 🧠

Os matemáticos espertos não fazem tudo à conta — usam **propriedades** para simplificar de cabeça! Estas são as tuas armas secretas:

```keyvalue
[
  { "k": "Trocar a ordem (comutativa)", "v": "8 × 5 = 5 × 8 → escolhe a ordem mais fácil 🔁" },
  { "k": "Agrupar a teu jeito (associativa)", "v": "25 × 4 × 7 → faz 25 × 4 = 100 primeiro! 💯" },
  { "k": "Distribuir", "v": "6 × 21 = 6 × 20 + 6 × 1 = 120 + 6 = 126 ✂️" },
  { "k": "Compensar", "v": "199 + 48 → 200 + 48 − 1 = 247 (arredonda e corrige) 🎯" }
]
```

## Um exemplo passo a passo 🔍

*«Uma fábrica encheu 1 250 caixas com 24 lápis cada uma. Já vendeu 18 000 lápis. Quantos lápis sobraram?»* Vamos com calma, é mais fácil do que parece. ✏️

```steps
[
  { "title": "1. Lê e separa", "body": "primeiro descobre quantos lápis há ao todo; depois tira os vendidos 🧐", "icon": "🔎" },
  { "title": "2. Total de lápis", "body": "1250 × 24. Decompõe: 1250 × 24 = 1250 × 20 + 1250 × 4 = 25 000 + 5 000 = 30 000 ✖️", "icon": "✖️" },
  { "title": "3. Tira os vendidos", "body": "30 000 − 18 000 = 12 000 ➖", "icon": "➖" },
  { "title": "4. Resposta", "body": "sobraram 12 000 lápis! 🎉", "icon": "🎉" }
]
```

> **Truque:** quando multiplicas por **24**, parte em **20 + 4** — é o «truque de distribuir». E para multiplicar por **20**, multiplica por 2 e acrescenta um **zero**. Partir os números grandes aos bocados torna tudo fácil! 🧩

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Ordem das operações e valores", "items": [
  { "front": "2 + 3 × 4", "back": "14", "options": ["20", "24"] },
  { "front": "(2 + 3) × 4", "back": "20", "options": ["14", "9"] },
  { "front": "10 − 2 × 3", "back": "4", "options": ["24", "8"] },
  { "front": "No número 5 600, o 5 vale…", "back": "5000", "options": ["500", "5"] },
  { "front": "Quanto vale 1 milhão em zeros?", "back": "6 zeros", "options": ["3 zeros", "9 zeros"] },
  { "front": "25 × 4", "back": "100", "options": ["29", "200"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Depois dos milhões vêm os **milhares de milhão** (1 000 000 000 — um 1 com **9 zeros**, a que os ingleses chamam *billion*). E sabias que existe o **googol**? É um 1 com **cem** zeros! O nome do motor de busca *Google* veio mesmo desse número gigante. 🤯

## Vamos praticar 🎈

```quiz
{
  "id": "mat-5-naturais-pratica",
  "questions": [
    { "q": "Como se lê o número 3 250 000?", "layout": "list",
      "options": [ { "t": "três milhões, duzentos e cinquenta mil", "emoji": "🔢", "correct": true }, { "t": "trezentos e vinte e cinco mil", "feedback": "Esse seria o 325 000, com menos uma classe. O 3 está nos milhões: três milhões, duzentos e cinquenta mil.", "tag": "leitura-numero" }, { "t": "três mil duzentos e cinquenta", "feedback": "Esse é o 3 250, muito mais pequeno. Lê classe a classe: 3 milhões + 250 mil.", "tag": "leitura-numero" } ],
      "explain": "Lê-se classe a classe: 3 milhões + 250 mil." },
    { "q": "Quanto é 2 + 3 × 4?", "layout": "grid",
      "options": [ { "t": "14", "correct": true }, { "t": "20", "feedback": "Fizeste 2 + 3 primeiro, mas a multiplicação joga antes. 3 × 4 = 12, depois + 2 = 14.", "tag": "ordem-operacoes" }, { "t": "24", "feedback": "Multiplicaste tudo. Sem parênteses, só 3 × 4 = 12, depois + 2 = 14.", "tag": "ordem-operacoes" } ],
      "explain": "A multiplicação joga primeiro: 3 × 4 = 12, depois +2 = 14." },
    { "q": "E quanto é (2 + 3) × 4?", "layout": "grid",
      "options": [ { "t": "20", "emoji": "🔒", "correct": true }, { "t": "14", "feedback": "Esse é o resultado sem parênteses. Aqui os parênteses mandam: 2 + 3 = 5, depois × 4 = 20.", "tag": "ordem-operacoes" }, { "t": "9", "feedback": "Esse seria 5 + 4. Os parênteses dão 5 e depois multiplicas por 4: 20.", "tag": "ordem-operacoes" } ],
      "explain": "Os parênteses primeiro: 2 + 3 = 5, depois 5 × 4 = 20." },
    { "q": "No número 4 700, quanto vale o algarismo 7?", "layout": "grid",
      "options": [ { "t": "700", "emoji": "💎", "correct": true }, { "t": "7", "feedback": "Esse é o valor do 7 nas unidades. Aqui o 7 está nas centenas: vale 700.", "tag": "valor-posicional" }, { "t": "70", "feedback": "Esse é o 7 nas dezenas. Em 4 700 o 7 está nas centenas: 7 × 100 = 700.", "tag": "valor-posicional" } ],
      "explain": "O 7 está nas centenas: vale 7 × 100 = 700." },
    { "q": "Quantos zeros tem 1 milhão?", "layout": "grid",
      "options": [ { "t": "6 zeros", "emoji": "😲", "correct": true }, { "t": "3 zeros", "feedback": "3 zeros é só 1 000 (um milhar). Um milhão é mil milhares: 1 000 000, com 6 zeros.", "tag": "leitura-numero" }, { "t": "9 zeros", "feedback": "9 zeros já é um milhar de milhão. Um milhão tem 6 zeros: 1 000 000.", "tag": "leitura-numero" } ],
      "explain": "1 000 000 — um 1 seguido de 6 zeros." },
    { "q": "Num grupo de 3 ordens chamamos…", "layout": "grid",
      "options": [ { "t": "classe", "emoji": "🗂️", "correct": true }, { "t": "parcela", "feedback": "Parcela é cada número que somas numa adição. Um grupo de 3 ordens é uma classe.", "tag": "vocabulario-numero" }, { "t": "fator", "feedback": "Fator é cada número que multiplicas. Três ordens juntas formam uma classe.", "tag": "vocabulario-numero" } ],
      "explain": "As ordens juntam-se de 3 em 3 em classes (unidades, milhares, milhões)." },
    { "q": "Na divisão 20 ÷ 3, o 3 é o…", "layout": "grid",
      "options": [ { "t": "divisor", "emoji": "➗", "correct": true }, { "t": "dividendo", "feedback": "O dividendo é o número que se reparte — aqui o 20. O 3 é o divisor.", "tag": "vocabulario-divisao" }, { "t": "quociente", "feedback": "O quociente é o resultado da divisão. O 3 é o divisor (por quanto divides).", "tag": "vocabulario-divisao" } ],
      "explain": "Dividendo ÷ divisor = quociente. O 20 é o dividendo, o 3 o divisor." },
    { "q": "Qual é o atalho mais esperto para 25 × 4 × 7?", "layout": "list",
      "options": [ { "t": "fazer 25 × 4 = 100 primeiro", "emoji": "💯", "correct": true }, { "t": "fazer 4 × 7 = 28 primeiro", "feedback": "Dá o resultado certo, mas 28 × 25 é trabalhoso. 25 × 4 = 100 deixa tudo mais fácil.", "tag": "mult-truque" }, { "t": "somar tudo", "feedback": "São multiplicações, não somas. O atalho é juntar 25 × 4 = 100 primeiro.", "tag": "mult-vs-soma" } ],
      "explain": "25 × 4 dá 100 (redondo!), e 100 × 7 = 700 é fácil." },
    { "q": "Quanto é 6 × 21, usando a distribuição?", "layout": "grid",
      "options": [ { "t": "126", "emoji": "✂️", "correct": true }, { "t": "120", "feedback": "Esse é só 6 × 20. Faltou o 6 × 1: 120 + 6 = 126.", "tag": "mult-distributiva" }, { "t": "27", "feedback": "Esse é 6 + 21, uma soma. A distribuição é 6 × 20 + 6 × 1 = 126.", "tag": "mult-vs-soma" } ],
      "explain": "6 × 20 + 6 × 1 = 120 + 6 = 126." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-naturais-final",
  "final": true,
  "title": "Números naturais e operações",
  "questions": [
    { "q": "Quanto é 5 + 2 × 6?", "layout": "grid",
      "options": [ { "t": "17", "correct": true }, { "t": "42", "feedback": "Fizeste 5 + 2 = 7 e depois × 6. Sem parênteses a multiplicação joga primeiro: 2 × 6 = 12, depois + 5 = 17.", "tag": "ordem-operacoes" }, { "t": "13", "feedback": "Esse seria 5 + 2 × 4 ou um cálculo trocado. Aqui: 2 × 6 = 12, depois 5 + 12 = 17.", "tag": "ordem-operacoes" } ],
      "explain": "× primeiro: 2 × 6 = 12, depois 5 + 12 = 17." },
    { "q": "Quanto é (5 + 2) × 6?", "layout": "grid",
      "options": [ { "t": "42", "emoji": "🔒", "correct": true }, { "t": "17", "feedback": "Esse é o resultado sem parênteses. Aqui resolves primeiro 5 + 2 = 7, depois × 6 = 42.", "tag": "ordem-operacoes" }, { "t": "30", "feedback": "Esse seria 5 × 6 esquecendo o 2. Os parênteses dão 7, depois 7 × 6 = 42.", "tag": "ordem-operacoes" } ],
      "explain": "Parênteses primeiro: 7 × 6 = 42." },
    { "q": "No número 8 030, o algarismo 8 vale…", "layout": "grid",
      "options": [ { "t": "8000", "emoji": "💎", "correct": true }, { "t": "800", "feedback": "Esse é o 8 nas centenas. Em 8 030 o 8 está nos milhares: vale 8 000.", "tag": "valor-posicional" }, { "t": "8", "feedback": "Esse é o 8 nas unidades. Aqui o 8 está nos milhares: vale 8 × 1000 = 8 000.", "tag": "valor-posicional" } ],
      "explain": "O 8 está nos milhares: vale 8 × 1000 = 8000." },
    { "q": "Como se lê 1 045 000?", "layout": "list",
      "options": [ { "t": "um milhão e quarenta e cinco mil", "correct": true }, { "t": "cento e quarenta e cinco mil", "feedback": "Esse seria o 145 000, sem a classe dos milhões. Aqui o 1 está nos milhões: um milhão e quarenta e cinco mil.", "tag": "leitura-numero" }, { "t": "dez milhões", "feedback": "Dez milhões é 10 000 000, muito maior. Lê classe a classe: 1 milhão + 45 mil.", "tag": "leitura-numero" } ],
      "explain": "1 milhão + 45 mil = «um milhão e quarenta e cinco mil»." },
    { "q": "Na multiplicação 6 × 7 = 42, o 42 é o…", "layout": "grid",
      "options": [ { "t": "produto", "emoji": "✖️", "correct": true }, { "t": "quociente", "feedback": "Quociente é o resultado de uma divisão. Numa multiplicação o resultado chama-se produto.", "tag": "vocabulario-multiplicacao" }, { "t": "soma", "feedback": "Soma é o resultado de uma adição. Aqui é uma multiplicação: o 42 é o produto.", "tag": "vocabulario-multiplicacao" } ],
      "explain": "Fator × fator = produto. O 42 é o produto." },
    { "q": "Quanto é 199 + 48 (com o truque de compensar)?", "layout": "grid",
      "options": [ { "t": "247", "emoji": "🎯", "correct": true }, { "t": "237", "feedback": "Tiraste 10 a mais. 200 + 48 = 248, e tiras só 1 (puseste 200 em vez de 199): 247.", "tag": "mult-truque" }, { "t": "257", "feedback": "Somaste 1 em vez de tirar. Como puseste 200 em vez de 199, corriges com − 1: 248 − 1 = 247.", "tag": "mult-truque" } ],
      "explain": "200 + 48 = 248, e tira 1 (porque puseste 200 em vez de 199): 247." },
    { "q": "Em 10 − 2 × 3, o resultado é…", "layout": "grid",
      "options": [ { "t": "4", "correct": true }, { "t": "24", "feedback": "Fizeste 10 − 2 = 8 e depois × 3. A multiplicação joga primeiro: 2 × 3 = 6, depois 10 − 6 = 4.", "tag": "ordem-operacoes" }, { "t": "8", "feedback": "Esse seria 10 − 2 esquecendo o × 3. Primeiro 2 × 3 = 6, depois 10 − 6 = 4.", "tag": "ordem-operacoes" } ],
      "explain": "× primeiro: 2 × 3 = 6, depois 10 − 6 = 4." },
    { "q": "Quantos lápis há em 1250 caixas de 24?", "layout": "grid",
      "options": [ { "t": "30 000", "emoji": "✏️", "correct": true }, { "t": "3 000", "feedback": "Faltou um zero. 1250 × 24 = 1250 × 20 + 1250 × 4 = 25 000 + 5 000 = 30 000.", "tag": "mult-calculo" }, { "t": "12 000", "feedback": "Esse é 1250 × 24 mal feito (ou só uma parte). A conta certa dá 30 000.", "tag": "mult-calculo" } ],
      "explain": "1250 × 24 = 1250 × 20 + 1250 × 4 = 25 000 + 5 000 = 30 000." },
    { "q": "Depois dos milhões, a classe seguinte é a dos…", "layout": "grid",
      "options": [ { "t": "milhares de milhão", "emoji": "🤯", "correct": true }, { "t": "milhares", "feedback": "Os milhares vêm antes dos milhões. Depois dos milhões vêm os milhares de milhão.", "tag": "vocabulario-numero" }, { "t": "centenas", "feedback": "As centenas estão na classe das unidades, lá no início. A seguir aos milhões vêm os milhares de milhão.", "tag": "vocabulario-numero" } ],
      "explain": "Unidades → milhares → milhões → milhares de milhão (9 zeros)." }
  ]
}
```
