# Numerais romanos 🏛️

> [!NOTE] **O que vais aprender** 👀 Vais aprender a escrever números com **letras especiais** — os numerais romanos! Descobres os 7 símbolos (I, V, X, L, C, D, M) e dois truques: quando se **soma** e quando se **subtrai**. No fim, vês-os no relógio e nos séculos! 🕐

Há muito, muito tempo, os romanos não escreviam os números com 1, 2, 3 como nós. Usavam **letras**! 🏛️ Ainda hoje as vês no mostrador de alguns relógios, nos nomes dos reis e nos séculos. Vem comigo aprender este código secreto — vais ficar a ler números antigos como um verdadeiro romano! 😄

## Os 7 símbolos mágicos 🔠

Os romanos usavam só **7 letras** para escrever todos os números. Cada uma vale um número certo. Decora estas sete e já sabes quase tudo!

```keyvalue
[
  { "k": "I", "v": "vale 1 ☝️" },
  { "k": "V", "v": "vale 5 ✋" },
  { "k": "X", "v": "vale 10 🙌" },
  { "k": "L", "v": "vale 50" },
  { "k": "C", "v": "vale 100 💯" },
  { "k": "D", "v": "vale 500" },
  { "k": "M", "v": "vale 1000" }
]
```

## A regra de somar ➕

A primeira regra é fácil: quando os símbolos são **iguais** ou estão por **ordem decrescente** (do maior para o menor), vais **somando** da esquerda para a direita.

```keyvalue
[
  { "k": "II", "v": "1 + 1 = 2 ✌️" },
  { "k": "III", "v": "1 + 1 + 1 = 3" },
  { "k": "VI", "v": "5 + 1 = 6" },
  { "k": "XII", "v": "10 + 1 + 1 = 12" },
  { "k": "XV", "v": "10 + 5 = 15" },
  { "k": "XX", "v": "10 + 10 = 20" }
]
```

## A regra de subtrair ➖

Aqui está o truque mais esperto dos romanos! Se um símbolo **pequeno** está **antes** de um **maior**, então **subtrai-se**. É como dizer «falta 1 para chegar a 5». 🧠

```compare
[
  { "title": "Subtrai-se ➖ (pequeno antes do grande)", "rows": [
    { "label": "IV", "value": "5 − 1 = 4", "highlight": true },
    { "label": "IX", "value": "10 − 1 = 9", "highlight": true },
    { "label": "XL", "value": "50 − 10 = 40", "highlight": true },
    { "label": "XC", "value": "100 − 10 = 90", "highlight": true }
  ] },
  { "title": "Soma-se ➕ (grande antes do pequeno)", "rows": [
    { "label": "VI", "value": "5 + 1 = 6" },
    { "label": "XI", "value": "10 + 1 = 11" },
    { "label": "LX", "value": "50 + 10 = 60" },
    { "label": "CX", "value": "100 + 10 = 110" }
  ] }
]
```

## Nunca mais de três iguais! ✋

Há uma regra de ouro: **nunca** se repete o mesmo símbolo **mais de 3 vezes** seguidas. Por isso o 4 **não** é IIII — é **IV** (5 menos 1)! E o 9 não é VIIII — é **IX**.

```keyvalue
[
  { "k": "4 = IV", "v": "e não IIII ❌ (4 letras iguais a mais!)" },
  { "k": "9 = IX", "v": "e não VIIII ❌" },
  { "k": "40 = XL", "v": "e não XXXX ❌" },
  { "k": "3 = III", "v": "este pode! Só três é que está bem ✅" }
]
```

## Onde os vemos hoje 🕐

Os numerais romanos têm milhares de anos, mas ainda andam por aí! Olha bem à tua volta e vais encontrá-los:

```stats
[
  { "label": "Relógios", "value": "IV, VIII, XII", "hint": "no mostrador de muitos relógios 🕐" },
  { "label": "Séculos", "value": "século XXI", "hint": "vivemos no século 21 📅" },
  { "label": "Nomes de reis", "value": "D. João VI", "hint": "o sexto rei com esse nome 👑" },
  { "label": "Jogos Olímpicos", "value": "edição XXXIII", "hint": "para contar cada edição 🏅" }
]
```

## Um exemplo passo a passo 🔍

Vamos descobrir juntos quanto vale **XIV**. Calma e devagar! 🔍

```steps
[
  { "title": "1. Lê os símbolos", "body": "X vale 10, I vale 1, V vale 5. Lemos da esquerda para a direita. 👀", "icon": "🔎" },
  { "title": "2. Começa pelo X", "body": "O X (10) está antes de um símbolo mais pequeno, por isso somamos: temos 10. ➕", "icon": "🙌" },
  { "title": "3. Olha o IV", "body": "Agora sobra IV. O I (1) está ANTES do V (5), então subtrai-se: 5 − 1 = 4. ➖", "icon": "🧠" },
  { "title": "4. Junta tudo", "body": "10 + 4 = 14. Então XIV = 14! 🎉", "icon": "✅" }
]
```

> **Truque:** lê sempre **da esquerda para a direita** e vai **somando**. Mas atenção: se um símbolo **PEQUENO** estiver **antes** de um **MAIOR**, então **subtrai**! Por exemplo, IV = 5 − 1 = 4. 🧠

> [!TIP] **Para saberes mais** 🌱 Sabias que os romanos **não tinham** um símbolo para o **ZERO**? Para eles, o nada não era um número! E para escrever números muito grandes, punham um **tracinho por cima** do símbolo — esse tracinho fazia o número valer **mil vezes mais**. Assim, um V com um tracinho valia 5000! 🤯

## Vamos praticar 🎈

```quiz
{
  "id": "mat3-romanos-pratica",
  "questions": [
    { "q": "Quanto vale o símbolo X?", "emoji": "🙌", "layout": "grid",
      "options": [ { "t": "10", "correct": true }, { "t": "5", "feedback": "5 é o V. O X vale 10.", "tag": "romano-valor" }, { "t": "1", "feedback": "1 é o I. O X vale 10.", "tag": "romano-valor" } ],
      "explain": "O X vale 10." },
    { "q": "Quanto vale o símbolo V?", "emoji": "✋", "layout": "grid",
      "options": [ { "t": "5", "correct": true }, { "t": "10", "feedback": "10 é o X. O V vale 5 (os dedos de uma mão).", "tag": "romano-valor" }, { "t": "1", "feedback": "1 é o I. O V vale 5.", "tag": "romano-valor" } ],
      "explain": "O V vale 5, como os dedos de uma mão." },
    { "q": "Como se escreve o número 2?", "emoji": "✌️", "layout": "grid",
      "options": [ { "t": "II", "correct": true }, { "t": "IV", "feedback": "IV é 4. O 2 são dois «I»: II.", "tag": "romano-subtrair" }, { "t": "V", "feedback": "V é 5. O 2 escreve-se II.", "tag": "romano-valor" } ],
      "explain": "II = 1 + 1 = 2." },
    { "q": "Quanto vale VI?", "layout": "grid",
      "options": [ { "t": "6", "correct": true }, { "t": "4", "feedback": "4 é IV (o I antes do V). Aqui o I está DEPOIS: 5 + 1 = 6.", "tag": "romano-subtrair" }, { "t": "5", "feedback": "5 é só o V. Com o I a seguir: 5 + 1 = 6.", "tag": "romano-somar" } ],
      "explain": "O V (5) está antes do I (1), por isso soma-se: 5 + 1 = 6." },
    { "q": "Quanto vale IV?", "layout": "grid",
      "options": [ { "t": "4", "correct": true }, { "t": "6", "feedback": "6 é VI (o I depois do V). Aqui o I está ANTES: 5 − 1 = 4.", "tag": "romano-subtrair" }, { "t": "5", "feedback": "5 é só o V. Com o I antes, tira-se 1: 5 − 1 = 4.", "tag": "romano-subtrair" } ],
      "explain": "O I (1) está antes do V (5), por isso subtrai-se: 5 − 1 = 4." },
    { "q": "Porque é que 4 NÃO se escreve IIII?", "layout": "grid",
      "options": [ { "t": "não se repete a mesma letra mais de 3 vezes", "correct": true }, { "t": "porque IIII é muito comprido", "feedback": "O motivo é a regra: o mesmo símbolo não se repete mais de 3 vezes. Por isso 4 é IV.", "tag": "romano-regra-3" } ],
      "explain": "A regra diz que o mesmo símbolo não se repete mais de 3 vezes; por isso 4 é IV." },
    { "q": "Quanto vale XII?", "layout": "grid",
      "options": [ { "t": "12", "correct": true }, { "t": "10", "feedback": "10 é só o X. Com os dois «I»: 10 + 1 + 1 = 12.", "tag": "romano-somar" }, { "t": "2", "feedback": "2 são os «II». Há também o X antes: 10 + 2 = 12.", "tag": "romano-somar" } ],
      "explain": "10 + 1 + 1 = 12." },
    { "q": "Quanto vale IX?", "layout": "grid",
      "options": [ { "t": "9", "correct": true }, { "t": "11", "feedback": "Se o I estivesse depois (XI) seria 11. Antes do X subtrai-se: 10 − 1 = 9.", "tag": "romano-subtrair" }, { "t": "10", "feedback": "10 é só o X. O I antes tira 1: 10 − 1 = 9.", "tag": "romano-subtrair" } ],
      "explain": "O I (1) está antes do X (10): 10 − 1 = 9." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat3-romanos-final",
  "final": true,
  "title": "Numerais romanos",
  "questions": [
    { "q": "Quanto vale o símbolo I?", "emoji": "☝️", "layout": "grid",
      "options": [ { "t": "1", "correct": true }, { "t": "5", "feedback": "5 é o V. O I vale 1.", "tag": "romano-valor" }, { "t": "10", "feedback": "10 é o X. O I vale 1.", "tag": "romano-valor" } ],
      "explain": "O I vale 1." },
    { "q": "Quanto vale o símbolo C?", "emoji": "💯", "layout": "grid",
      "options": [ { "t": "100", "correct": true }, { "t": "50", "feedback": "50 é o L. O C vale 100 (como «cem»).", "tag": "romano-valor" }, { "t": "500", "feedback": "500 é o D. O C vale 100.", "tag": "romano-valor" } ],
      "explain": "O C vale 100." },
    { "q": "Como se escreve o número 3?", "layout": "grid",
      "options": [ { "t": "III", "correct": true }, { "t": "IV", "feedback": "IV é 4. O 3 são três «I»: III.", "tag": "romano-subtrair" }, { "t": "IIII", "feedback": "Não se repete o mesmo símbolo mais de 3 vezes. O 3 é III (e o 4 é IV).", "tag": "romano-regra-3" } ],
      "explain": "III = 1 + 1 + 1 = 3. Três iguais é o máximo permitido!" },
    { "q": "Quanto vale XV?", "layout": "grid",
      "options": [ { "t": "15", "correct": true }, { "t": "5", "feedback": "5 é só o V. Com o X antes: 10 + 5 = 15.", "tag": "romano-somar" }, { "t": "20", "feedback": "20 seria XX. Aqui é X + V = 10 + 5 = 15.", "tag": "romano-somar" } ],
      "explain": "10 + 5 = 15." },
    { "q": "Quanto vale XL?", "layout": "grid",
      "options": [ { "t": "40", "correct": true }, { "t": "60", "feedback": "60 seria LX (L + X). Aqui o X está ANTES: 50 − 10 = 40.", "tag": "romano-subtrair" }, { "t": "50", "feedback": "50 é só o L. O X antes tira 10: 50 − 10 = 40.", "tag": "romano-subtrair" } ],
      "explain": "O X (10) está antes do L (50): 50 − 10 = 40." },
    { "q": "Lendo da esquerda para a direita, normalmente vais...", "layout": "grid",
      "options": [ { "t": "somando", "emoji": "➕", "correct": true }, { "t": "subtraindo sempre", "feedback": "Só subtrais quando um símbolo pequeno está antes de um maior. Normalmente vais somando.", "tag": "romano-somar" } ],
      "explain": "Vais somando; só subtrais quando um símbolo pequeno está antes de um maior." },
    { "q": "Em que século vivemos?", "emoji": "📅", "layout": "grid",
      "options": [ { "t": "XXI", "correct": true }, { "t": "XI", "feedback": "XI é 11. O século 21 escreve-se XXI.", "tag": "romano-seculo" }, { "t": "XXX", "feedback": "XXX é 30. O século 21 é XXI.", "tag": "romano-seculo" } ],
      "explain": "Vivemos no século XXI, que vale 21." },
    { "q": "Os romanos tinham um símbolo para o ZERO?", "layout": "grid",
      "options": [ { "t": "não tinham", "correct": true }, { "t": "sim, era o O", "feedback": "Os romanos não tinham símbolo para o zero — o «O» é uma letra, não um numeral romano.", "tag": "romano-zero" } ],
      "explain": "Os romanos não tinham símbolo para o zero!" }
  ]
}
```
