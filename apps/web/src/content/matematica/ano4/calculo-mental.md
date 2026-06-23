# Cálculo mental: pensar depressa 🧠

> [!NOTE] **O que vais aprender** 👀 Vais treinar estratégias para calcular de cabeça: decompor números, fazer dezenas ou centenas, compensar, usar dobro/metade e estimar antes de responder.

Cálculo mental não é “adivinhar”. É escolher um caminho esperto para chegar à resposta sem escrever uma conta grande.

```figure
{ "emoji": "🧠", "caption": "Calcular de cabeça é usar atalhos seguros: primeiro penso, depois respondo." }
```

## Estratégia 1: decompor números 🔢

Decompor é partir um número em bocados mais fáceis.

```math
{ "expr": "47 + 32 = 47 + 30 + 2 = 79", "say": "quarenta e sete mais trinta e dois é o mesmo que quarenta e sete mais trinta mais dois, que dá setenta e nove" }
```

Se tens **47 + 32**, podes pensar assim:

```steps
[
  { "title": "1. Partir o 32", "body": "32 = 30 + 2" },
  { "title": "2. Somar a dezena", "body": "47 + 30 = 77" },
  { "title": "3. Somar o resto", "body": "77 + 2 = 79" },
  { "title": "4. Resposta", "body": "47 + 32 = 79" }
]
```

## Estratégia 2: fazer 10, 100 ou 1000 🎯

O cérebro gosta de números redondos.

```compare
[
  { "title": "Conta mais difícil", "rows": [
    { "label": "Exemplo", "value": "58 + 7" },
    { "label": "Problema", "value": "não chega logo a uma dezena" }
  ] },
  { "title": "Conta esperta", "rows": [
    { "label": "Passo 1", "value": "58 + 2 = 60", "highlight": true },
    { "label": "Passo 2", "value": "sobram 5" },
    { "label": "Resultado", "value": "60 + 5 = 65", "highlight": true }
  ] }
]
```

## Estratégia 3: compensar ⚖️

Compensar é arredondar um número e depois corrigir.

```math
{ "expr": "99 + 36 = 100 + 36 − 1 = 135", "say": "noventa e nove mais trinta e seis é como cem mais trinta e seis menos um, igual a cento e trinta e cinco" }
```

> **Truque:** quando um número está quase redondo, usa-o a teu favor: 99 é quase 100, 198 é quase 200, 49 é quase 50.

## Estratégia 4: dobro e metade ✌️

Algumas contas ficam fáceis quando sabes o dobro ou a metade.

```keyvalue
[
  { "k": "Dobro de 25", "v": "50" },
  { "k": "Metade de 80", "v": "40" },
  { "k": "25 + 25", "v": "é o dobro de 25: 50" },
  { "k": "4 × 25", "v": "é 100, porque 25 + 25 + 25 + 25 = 100" }
]
```

## Estratégia 5: dividir por 10, 100 e 1000 🚀

Multiplicar por 10 acrescenta um zero — e dividir por 10 **tira** um zero! É o truque dos zeros, e funciona em cadeia:

```keyvalue
[
  { "k": "340 ÷ 10", "v": "34 — tira um zero 0️⃣" },
  { "k": "3400 ÷ 100", "v": "34 — tira dois zeros 0️⃣0️⃣" },
  { "k": "34 000 ÷ 1000", "v": "34 — tira três zeros 0️⃣0️⃣0️⃣" }
]
```

E quando os zeros **acabam**? Aí a **vírgula anda para a esquerda** — uma casa por cada zero do divisor:

```math
{ "expr": "35 ÷ 10 = 3,5", "say": "trinta e cinco a dividir por dez dá três vírgula cinco: a vírgula anda uma casa para a esquerda" }
```

```math
{ "expr": "35 ÷ 100 = 0,35", "say": "trinta e cinco a dividir por cem dá zero vírgula trinta e cinco: a vírgula anda duas casas" }
```

> **Truque:** dividir por 10/100/1000 **encolhe** o número, por isso a vírgula anda para a **esquerda** (1, 2 ou 3 casas). Multiplicar **estica**, e a vírgula anda para a **direita**. Pensa: 35 rebuçados por 10 amigos — cada um leva 3 e meio! 🍬

## Estimar antes de responder 🔎

Estimar é prever mais ou menos quanto deve dar. Ajuda a apanhar erros.

```steps
[
  { "title": "Conta", "body": "198 + 305" },
  { "title": "Estimo", "body": "200 + 300 = 500" },
  { "title": "Calculo", "body": "198 + 305 = 503" },
  { "title": "Verifico", "body": "503 está perto de 500, por isso faz sentido" }
]
```

## Treino rápido 🎯

```drill
{ "mode": "choose", "title": "Qual é o atalho?", "items": [
  { "front": "99 + 48", "back": "100 + 48 − 1", "options": ["50 + 48", "100 − 48"] },
  { "front": "38 + 7", "back": "38 + 2 + 5", "options": ["38 − 7", "30 + 7"] },
  { "front": "25 + 25", "back": "dobro de 25", "options": ["metade de 25", "25 − 25"] },
  { "front": "402 − 199", "back": "402 − 200 + 1", "options": ["402 + 200", "199 − 402"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 Bons matemáticos não fazem sempre a conta da mesma maneira. Antes de calcular, olham para os números e perguntam: “Qual é o caminho mais fácil?”

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-calculo-mental-pratica",
  "questions": [
    { "q": "47 + 32 pode ser pensado como…", "layout": "grid",
      "options": [ { "t": "47 + 30 + 2", "emoji": "🔢", "correct": true }, { "t": "47 − 32", "feedback": "47 − 32 é uma subtração, mas a conta é uma SOMA (47 + 32). O atalho certo é decompor: 47 + 30 + 2.", "tag": "decomposicao" }, { "t": "32 − 47", "feedback": "Isso é subtrair, e ao contrário. A conta é somar 47 + 32; o atalho é parti-la em 47 + 30 + 2.", "tag": "decomposicao" } ],
      "explain": "Decompor 32 em 30 + 2 torna a soma mais fácil." },
    { "q": "58 + 7 fica mais fácil se pensares…", "layout": "grid",
      "options": [ { "t": "58 + 2 + 5", "emoji": "🎯", "correct": true }, { "t": "58 − 7", "feedback": "58 − 7 é subtrair, mas aqui é somar! O atalho é chegar primeiro à dezena: 58 + 2 = 60 e depois + 5.", "tag": "decomposicao" }, { "t": "7 − 58", "feedback": "Isso é subtrair, e ao contrário. A conta é 58 + 7; o truque é fazer 58 + 2 + 5 para apanhar o 60.", "tag": "decomposicao" } ],
      "explain": "Primeiro chegas a 60, depois somas os 5 que faltam." },
    { "q": "99 + 36 é como…", "layout": "grid",
      "options": [ { "t": "100 + 36 − 1", "emoji": "⚖️", "correct": true }, { "t": "100 + 36 + 1", "feedback": "Trocaste o sinal: usaste 100 em vez de 99, que é 1 a MAIS, por isso tens de TIRAR 1 no fim, não somar. É 100 + 36 − 1.", "tag": "calc-mental-compensar" }, { "t": "90 + 30 − 6", "feedback": "Esses números não dão 99 + 36 (dariam 114). Compensa o 99: faz 100 + 36 e tira o 1 a mais.", "tag": "calc-mental-compensar" } ],
      "explain": "Se arredondas 99 para 100, tens de tirar 1 no fim." },
    { "q": "Uma boa estimativa para 198 + 305 é…", "layout": "grid",
      "options": [ { "t": "cerca de 500", "emoji": "🔎", "correct": true }, { "t": "cerca de 50", "feedback": "50 é pequeno demais — só com as dezenas a soma já passa de 100. Arredonda: 200 + 300 = cerca de 500.", "tag": "estimar-valor" }, { "t": "cerca de 5000", "feedback": "5000 é grande demais, dez vezes a mais. 198 ≈ 200 e 305 ≈ 300, por isso dá cerca de 500.", "tag": "estimar-valor" } ],
      "explain": "198 ≈ 200 e 305 ≈ 300, por isso dá perto de 500." },
    { "q": "4 × 25 dá…", "layout": "grid",
      "options": [ { "t": "100", "emoji": "💯", "correct": true }, { "t": "75", "feedback": "75 é só 3 × 25 — falta um grupo de 25. Quatro grupos de 25 fazem 100.", "tag": "mult-calculo" }, { "t": "125", "feedback": "125 é 5 × 25 — um grupo de 25 a mais. São só 4 grupos: 4 × 25 = 100.", "tag": "mult-calculo" } ],
      "explain": "Quatro grupos de 25 fazem 100." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-calculo-mental-final",
  "final": true,
  "title": "Cálculo mental",
  "questions": [
    { "q": "Cálculo mental é…", "layout": "grid",
      "options": [ { "t": "usar estratégias para calcular de cabeça", "emoji": "🧠", "correct": true }, { "t": "adivinhar sem pensar", "feedback": "Cálculo mental não é adivinhar — é escolher um caminho esperto e seguro. Primeiro pensas, depois respondes.", "tag": "calc-mental-estrategia" }, { "t": "nunca verificar", "feedback": "Ao contrário: no cálculo mental até estimamos para verificar se a resposta faz sentido. É usar estratégias para calcular de cabeça.", "tag": "calc-mental-estrategia" } ],
      "explain": "Cálculo mental usa atalhos seguros." },
    { "q": "86 + 13 pode ser decomposto como…", "layout": "grid",
      "options": [ { "t": "86 + 10 + 3", "emoji": "🔢", "correct": true }, { "t": "86 − 13", "feedback": "86 − 13 é subtrair, mas a conta é uma soma. Decompor é partir o 13 em 10 + 3: fica 86 + 10 + 3.", "tag": "decomposicao" }, { "t": "13 − 86", "feedback": "Isso é subtrair, e ao contrário. A conta é 86 + 13; decompõe-se em 86 + 10 + 3.", "tag": "decomposicao" } ],
      "explain": "13 = 10 + 3." },
    { "q": "49 + 28 é mais fácil como…", "layout": "grid",
      "options": [ { "t": "50 + 28 − 1", "emoji": "⚖️", "correct": true }, { "t": "50 + 28 + 1", "feedback": "Trocaste o sinal: usaste 50 em vez de 49, que é 1 a MAIS, por isso tens de TIRAR 1 no fim. É 50 + 28 − 1.", "tag": "calc-mental-compensar" }, { "t": "40 − 28", "feedback": "Isso é subtrair, mas a conta é somar. Compensa: faz 50 + 28 e tira o 1 que puseste a mais.", "tag": "calc-mental-compensar" } ],
      "explain": "49 é quase 50; se somas 1 a mais, tiras 1 no fim." },
    { "q": "Para calcular 67 + 5, podes pensar…", "layout": "grid",
      "options": [ { "t": "67 + 3 + 2", "emoji": "🎯", "correct": true }, { "t": "67 − 5", "feedback": "67 − 5 é subtrair, mas aqui é somar! O truque é fazer 67 + 3 para chegar a 70 e depois + 2.", "tag": "decomposicao" }, { "t": "60 + 5", "feedback": "60 + 5 dá 65, mas o número é 67, não 60. Parte o 5 em 3 + 2: 67 + 3 = 70 e mais 2 = 72.", "tag": "decomposicao" } ],
      "explain": "67 + 3 chega a 70; depois somas 2." },
    { "q": "Metade de 90 é…", "layout": "grid",
      "options": [ { "t": "45", "emoji": "✌️", "correct": true }, { "t": "40", "feedback": "40 é metade de 80, não de 90. Metade de 90 é 90 ÷ 2 = 45.", "tag": "mult-calculo" }, { "t": "180", "feedback": "180 é o DOBRO de 90, não a metade. A metade é 90 ÷ 2 = 45.", "tag": "mult-calculo" } ],
      "explain": "90 dividido por 2 é 45." },
    { "q": "Uma estimativa boa para 402 − 199 é…", "layout": "grid",
      "options": [ { "t": "cerca de 200", "emoji": "🔎", "correct": true }, { "t": "cerca de 20", "feedback": "20 é pequeno demais. Arredonda: 400 − 200 = cerca de 200, não 20.", "tag": "estimar-valor" }, { "t": "cerca de 700", "feedback": "700 é grande demais — numa subtração o resultado é menor que o 402. 400 − 200 dá cerca de 200.", "tag": "estimar-valor" } ],
      "explain": "402 ≈ 400 e 199 ≈ 200, por isso fica perto de 200." },
    { "q": "25 + 25 + 25 + 25 é…", "layout": "grid",
      "options": [ { "t": "100", "emoji": "💯", "correct": true }, { "t": "80", "feedback": "80 fica curto — falta somar um 25. Quatro grupos de 25 fazem 100.", "tag": "mult-calculo" }, { "t": "125", "feedback": "125 é cinco grupos de 25 — um a mais. São só quatro: 25 + 25 + 25 + 25 = 100.", "tag": "mult-calculo" } ],
      "explain": "Quatro quartos de 100 fazem 100." },
    { "q": "Antes de responder, estimar ajuda a…", "layout": "grid",
      "options": [ { "t": "ver se a resposta faz sentido", "emoji": "✅", "correct": true }, { "t": "evitar pensar", "feedback": "Estimar é mesmo pensar — só que depressa! Serve para veres se a tua resposta faz sentido.", "tag": "estimar-valor" }, { "t": "mudar a pergunta", "feedback": "A estimativa não muda a pergunta — é uma verificação rápida para ver se o resultado é razoável.", "tag": "estimar-valor" } ],
      "explain": "A estimativa é uma verificação rápida." },
    { "q": "780 ÷ 10 = ?", "layout": "grid", "level": 2,
      "hint": "Dividir por 10 tira um zero.",
      "options": [ { "t": "78", "emoji": "🚀", "correct": true }, { "t": "7800", "feedback": "7800 é MULTIPLICAR por 10 (acrescenta um zero). Dividir por 10 faz o contrário: TIRA um zero, dá 78.", "tag": "dividir-por-10" }, { "t": "7,8", "feedback": "7,8 seria dividir por 100. Por 10 tiras só um zero ao 780: dá 78.", "tag": "dividir-por-10" } ],
      "explain": "Tira um zero: 780 ÷ 10 = 78." },
    { "q": "47 ÷ 10 = ? (já não há zeros para tirar!)", "layout": "grid", "level": 3,
      "hint": "A vírgula anda uma casa para a esquerda.",
      "options": [ { "t": "4,7", "emoji": "🪄", "correct": true }, { "t": "470", "feedback": "470 é MULTIPLICAR por 10. Dividir ENCOLHE o número: a vírgula anda uma casa para a esquerda, dá 4,7.", "tag": "dividir-por-10" }, { "t": "0,47", "feedback": "0,47 seria dividir por 100 (duas casas). Por 10 a vírgula anda só uma casa: 47 ÷ 10 = 4,7.", "tag": "dividir-por-10" } ],
      "explain": "Sem zeros, a vírgula anda 1 casa para a esquerda: 47 ÷ 10 = 4,7." }
  ]
}
```
