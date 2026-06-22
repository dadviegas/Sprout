# Números até ao milhão 🔢

> [!NOTE] **O que vais aprender** 👀 Vais aprender a **ler, escrever, comparar e ordenar** números muito grandes — até ao **milhão** (1 000 000) — e a descobrir quanto vale cada algarismo conforme o lugar onde está. 🚀

Já sabes contar até mil? Boa! Agora vamos muito, mas mesmo muito mais longe — até ao **milhão**! Pode parecer assustador, mas tem um segredo: os números grandes são só **grupinhos** mais pequenos juntos. Quando descobrires o truque, vais ler números enormes sem pestanejar. Vamos a isto! 🎉

## Como crescem os números grandes 📈

Os números grandes crescem sempre **aos saltos**, multiplicando por **10** de cada vez. Cada salto tem um nome especial:

```keyvalue
[
  { "k": "1 unidade (U)", "v": "1 🙂" },
  { "k": "1 dezena (D)", "v": "10 (dez unidades)" },
  { "k": "1 centena (C)", "v": "100 (dez dezenas)" },
  { "k": "1 milhar (M)", "v": "1 000 (mil!)" },
  { "k": "1 dezena de milhar (DM)", "v": "10 000 (dez mil)" },
  { "k": "1 centena de milhar (CM)", "v": "100 000 (cem mil)" },
  { "k": "1 milhão", "v": "1 000 000 (mil milhares!) 🎉" }
]
```

Repara: o **milhão** é o número **1** com **6 zeros** atrás — 6 amiguinhos a fazer fila! 0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣

## Separar em classes e ordens 🗂️

Para não nos perdermos, separamos os algarismos em **grupinhos de 3**, sempre da **direita para a esquerda**. Cada grupo é uma **classe**: a classe das **unidades** e a classe dos **milhares**. Dentro de cada classe há 3 **ordens** (unidades, dezenas, centenas).

```compare
[
  { "title": "Classe dos MILHARES", "rows": [
    { "label": "Centenas de milhar", "value": "100 000" },
    { "label": "Dezenas de milhar", "value": "10 000" },
    { "label": "Unidades de milhar", "value": "1 000" }
  ] },
  { "title": "Classe das UNIDADES", "rows": [
    { "label": "Centenas", "value": "100" },
    { "label": "Dezenas", "value": "10" },
    { "label": "Unidades", "value": "1", "highlight": true }
  ] }
]
```

Por isso escrevemos **245 800** com um espaço (e nunca com ponto): assim vês logo **245** milhares e **800** unidades. Muito mais fácil de ler! 👀

## O valor de cada algarismo 📍

O mesmo algarismo vale coisas **diferentes** conforme o lugar onde está. É a **posição** que manda! No número **362 540**:

```stats
[
  { "label": "3", "value": "300 000", "hint": "está nas centenas de milhar" },
  { "label": "6", "value": "60 000", "hint": "está nas dezenas de milhar" },
  { "label": "2", "value": "2 000", "hint": "está nas unidades de milhar" },
  { "label": "5", "value": "500", "hint": "está nas centenas" },
  { "label": "4", "value": "40", "hint": "está nas dezenas" },
  { "label": "0", "value": "0", "hint": "está nas unidades" }
]
```

Se somares tudo — 300 000 + 60 000 + 2 000 + 500 + 40 + 0 — voltas a obter **362 540**. A isto chama-se **decomposição** do número! 🧩

## Comparar e ordenar números 🪜

Para saber qual número é **maior**, há uma regra simples:

```steps
[
  { "title": "Conta os algarismos", "body": "Quem tiver MAIS algarismos é o maior. 1 200 000 (7 algarismos) > 999 999 (6 algarismos).", "icon": "📏" },
  { "title": "Se tiverem o mesmo número de algarismos…", "body": "Compara da ESQUERDA para a direita, ordem a ordem.", "icon": "👈" },
  { "title": "Para o primeiro que for diferente", "body": "Quem tiver o algarismo maior nessa ordem ganha. Em 845 000 e 839 000, o 4 > 3, logo 845 000 é maior.", "icon": "🏆" }
]
```

Os sinais que usamos: **>** (maior que), **<** (menor que) e **=** (igual). O biquinho aponta sempre para o número **mais pequeno**! 🐊

Vamos comparar números grandes a sério — quantas pessoas vivem nestas cidades? Cada barra está em **milhares**: a de Lisboa quer dizer cerca de **545 000** habitantes!

```chart
{ "type": "bar", "title": "Habitantes de cidades portuguesas (milhares)",
  "labels": ["Lisboa", "Porto", "Braga", "Coimbra", "Évora"], "data": [545, 230, 190, 140, 55],
  "unit": "milhares",
  "say": "Lisboa tem cerca de quinhentos e quarenta e cinco mil habitantes; o Porto duzentos e trinta mil; Braga cento e noventa mil; Coimbra cento e quarenta mil; e Évora cinquenta e cinco mil." }
```

## Um exemplo passo a passo 🔍

Vamos ler o número **407 060** e descobrir o que vale cada algarismo.

```steps
[
  { "title": "Separa em grupos de 3", "body": "Da direita para a esquerda: 407 | 060. O grupo da esquerda são os MILHARES.", "icon": "✂️" },
  { "title": "Lê o grupo da esquerda", "body": "407 milhares → 'quatrocentos e sete mil'.", "icon": "👈" },
  { "title": "Cuidado com os zeros!", "body": "Os zeros guardam o lugar: aqui não há dezenas de milhar nem centenas.", "icon": "0️⃣" },
  { "title": "Lê o grupo da direita", "body": "060 → 'sessenta'.", "icon": "👉" },
  { "title": "Junta tudo", "body": "Quatrocentos e sete mil e sessenta! 🎉", "icon": "✅" }
]
```

## Truque do número grande 🪄

> **Truque:** conta os **zeros** para saberes o nome — **3 zeros = mil**, **6 zeros = milhão**. E para ler qualquer número, separa SEMPRE em grupos de 3 a partir da direita: lês o grupo da esquerda e dizes "mil", depois lês o resto. Os **zeros não se leem**, mas guardam o lugar! ✨

> [!TIP] **Para saberes mais** 🌱 Depois do milhão (6 zeros) vem **mil milhões** (9 zeros) e depois o **bilião** (12 zeros)! Atenção: em Portugal, "um bilião" é um milhão de milhões, mas nos Estados Unidos *billion* é só mil milhões — por isso é fácil baralhar quando ouves notícias estrangeiras. 🤯

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-milhao-pratica",
  "questions": [
    { "q": "Quantos zeros tem um milhão?", "layout": "grid",
      "options": [ { "t": "6", "emoji": "6️⃣", "correct": true }, { "t": "3", "feedback": "3 zeros é só mil (1 000). O milhão é muito maior: o 1 com 6 zeros, 1 000 000.", "tag": "valor-posicional" }, { "t": "9", "feedback": "9 zeros já é mil milhões! O milhão tem só 6 zeros: 1 000 000.", "tag": "valor-posicional" } ],
      "explain": "Um milhão é 1 000 000 — o 1 com 6 zeros atrás!" },
    { "q": "No número 250 000, quanto vale o algarismo 2?", "layout": "grid",
      "options": [ { "t": "200 000", "correct": true }, { "t": "2 000", "feedback": "2 000 seria o 2 nas unidades de milhar. Aqui o 2 está nas centenas de milhar, por isso vale 200 000.", "tag": "valor-posicional" }, { "t": "2", "feedback": "O 2 não vale 2: é a posição que manda! Está nas centenas de milhar, logo vale 200 000.", "tag": "valor-posicional" } ],
      "explain": "O 2 está nas centenas de milhar: vale 200 000." },
    { "q": "Quantas unidades tem 1 milhar?", "layout": "grid",
      "options": [ { "t": "1 000", "correct": true }, { "t": "100", "feedback": "100 é uma centena, não um milhar. 1 milhar é dez vezes maior: 1 000 unidades.", "tag": "valor-posicional" }, { "t": "10", "feedback": "10 é uma dezena. 1 milhar é muito maior — vale 1 000 unidades (mil).", "tag": "valor-posicional" } ],
      "explain": "1 milhar = 1 000 unidades (mil)." },
    { "q": "Como se separa, com espaços, o número quarenta mil e quinhentos?", "layout": "grid",
      "options": [ { "t": "40 500", "correct": true }, { "t": "405 000", "feedback": "405 000 lê-se quatrocentos e cinco mil — número bem maior. Quarenta mil é 40 000, mais quinhentos dá 40 500.", "tag": "leitura-numero" }, { "t": "4 500", "feedback": "4 500 é quatro mil e quinhentos. Quarenta mil é 40 000; com os quinhentos fica 40 500.", "tag": "leitura-numero" } ],
      "explain": "Quarenta mil é 40 000; mais quinhentos dá 40 500." },
    { "q": "Qual destes números é o MAIOR?", "layout": "grid",
      "options": [ { "t": "320 000", "correct": true }, { "t": "98 000", "feedback": "98 000 só tem 5 algarismos; 320 000 tem 6. Quem tem mais algarismos é o maior.", "tag": "comparar-numeros" }, { "t": "65 400", "feedback": "65 400 tem 5 algarismos; 320 000 tem 6, logo é maior. Conta sempre os algarismos primeiro!", "tag": "comparar-numeros" } ],
      "explain": "320 000 tem mais algarismos e mais centenas de milhar — é o maior!" },
    { "q": "Que sinal pomos? 64 000 ___ 65 000", "layout": "grid",
      "options": [ { "t": "<", "emoji": "🐊", "correct": true }, { "t": ">", "feedback": "> quer dizer maior que, mas 64 000 é menor que 65 000. O sinal certo é <.", "tag": "comparar-numeros" }, { "t": "=", "feedback": "= é só para números iguais. 64 000 é menor que 65 000, por isso usamos <.", "tag": "comparar-numeros" } ],
      "explain": "64 000 é menor que 65 000, por isso usamos <." },
    { "q": "No número 362 540, em que ordem está o algarismo 6?", "layout": "grid",
      "options": [ { "t": "dezenas de milhar", "correct": true }, { "t": "centenas de milhar", "feedback": "Nas centenas de milhar está o 3 (vale 300 000). O 6 está uma casa à direita: dezenas de milhar, valendo 60 000.", "tag": "valor-posicional" }, { "t": "unidades", "feedback": "Nas unidades está o 0. O 6 está bem mais à esquerda: nas dezenas de milhar, vale 60 000.", "tag": "valor-posicional" } ],
      "explain": "O 6 está nas dezenas de milhar: vale 60 000." },
    { "q": "Quanto é 300 000 + 60 000 + 2 000 + 500 + 40?", "layout": "grid",
      "options": [ { "t": "362 540", "correct": true }, { "t": "326 450", "feedback": "Trocaste a ordem dos algarismos. Somando cada parte na sua casa dá 362 540.", "tag": "decomposicao" }, { "t": "360 254", "feedback": "Os algarismos ficaram baralhados. Cada parcela vai para a sua ordem: o total certo é 362 540.", "tag": "decomposicao" } ],
      "explain": "É a decomposição de 362 540 — somando tudo voltamos ao número!" },
    { "q": "Como se lê o número 407 060?", "layout": "grid",
      "options": [ { "t": "quatrocentos e sete mil e sessenta", "correct": true }, { "t": "quarenta e sete mil e sessenta", "feedback": "Quarenta e sete mil seria 47 000. Aqui o grupo dos milhares é 407 — quatrocentos e sete mil.", "tag": "leitura-numero" }, { "t": "quatro mil e setenta e seis", "feedback": "Esse número seria bem mais pequeno. Lê o grupo da esquerda, 407 milhares: quatrocentos e sete mil e sessenta.", "tag": "leitura-numero" } ],
      "explain": "407 milhares = quatrocentos e sete mil; 060 = sessenta." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-milhao-final",
  "final": true,
  "title": "Números até ao milhão",
  "questions": [
    { "q": "Como se lê o número 1 000 000?", "layout": "grid",
      "options": [ { "t": "um milhão", "emoji": "🎉", "correct": true }, { "t": "mil" }, { "t": "cem mil" } ],
      "explain": "1 000 000 lê-se 'um milhão' — tem 6 zeros." },
    { "q": "Quantas unidades tem 1 milhar?", "layout": "grid",
      "options": [ { "t": "1 000", "correct": true }, { "t": "100" }, { "t": "10" } ],
      "explain": "1 milhar = 1 000 unidades (mil)." },
    { "q": "No número 487 600, quanto vale o algarismo 8?", "layout": "grid",
      "options": [ { "t": "80 000", "correct": true }, { "t": "8 000" }, { "t": "800" } ],
      "explain": "O 8 está nas dezenas de milhar: vale 80 000." },
    { "q": "Qual destes números é o MAIOR?", "layout": "grid",
      "options": [ { "t": "320 000", "correct": true }, { "t": "98 000" }, { "t": "65 400" } ],
      "explain": "320 000 tem 6 algarismos e mais centenas de milhar — é o maior!" },
    { "q": "Separamos os algarismos em grupos de quantos?", "layout": "grid",
      "options": [ { "t": "3", "emoji": "3️⃣", "correct": true }, { "t": "2" }, { "t": "5" } ],
      "explain": "Em grupos de 3, da direita para a esquerda: 245 800." },
    { "q": "Que sinal completa: 845 000 ___ 839 000?", "layout": "grid",
      "options": [ { "t": ">", "correct": true }, { "t": "<" }, { "t": "=" } ],
      "explain": "Na 1.ª ordem diferente, 4 > 3, logo 845 000 é maior." },
    { "q": "No número 600 000, em que ordem está o 6?", "layout": "grid",
      "options": [ { "t": "centenas de milhar", "correct": true }, { "t": "dezenas de milhar" }, { "t": "unidades de milhar" } ],
      "explain": "O 6 vale 600 000 — está nas centenas de milhar." },
    { "q": "Que número vem logo a seguir a 999 999?", "layout": "grid",
      "options": [ { "t": "1 000 000", "emoji": "🚀", "correct": true }, { "t": "100 000" }, { "t": "999 990" } ],
      "explain": "999 999 + 1 = 1 000 000, ou seja, um milhão!" },
    { "q": "Quanto vale 'quatrocentos e sete mil e sessenta' em algarismos?", "layout": "grid",
      "options": [ { "t": "407 060", "correct": true }, { "t": "47 060" }, { "t": "470 060" } ],
      "explain": "407 milhares e 60 unidades: 407 060." }
  ]
}
```
