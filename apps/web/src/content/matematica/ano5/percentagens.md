# As percentagens 💯

> [!NOTE] **O que vais aprender** 👀 O que quer dizer **%** (é «em cada 100»!), como a percentagem, a **fração** e o **decimal** são a mesma coisa vestida de três maneiras, e — o mais importante — a **calcular** 50%, 25%, 10% e 20% de qualquer quantidade de cabeça. Saldos e descontos, nunca mais te enganam! 🏷️

«**50% de desconto!**», «bateria a **25%**», «**90%** dos golos…» — as percentagens estão em todo o lado. 📱🛍️ A boa notícia: por trás do símbolo **%** estão frações que já conheces há anos. Hoje aprendes a calculá-las de cabeça, mais depressa que a calculadora! ⚡

## «Por cento» = «em cada 100» 🎯

**Percentagem** é uma fração com denominador **100**. O símbolo **%** é só uma maneira curta de escrever «/100»: **25%** = **25 em cada 100** = 25/100.

```fraction
{ "parts": 4, "filled": 1, "shape": "pie", "title": "25% = 25/100 = 1/4 da pizza", "color": "accent" }
```

## Os três fatos da mesma quantidade 👕

A mesma quantidade pode vestir-se de **percentagem**, de **fração** ou de **decimal** — e convém saberes trocar-lhe a roupa:

```stats
[
  { "label": "50%", "value": "1/2 = 0,5", "hint": "a metade ✂️" },
  { "label": "25%", "value": "1/4 = 0,25", "hint": "a quarta parte 🍕" },
  { "label": "10%", "value": "1/10 = 0,1", "hint": "a décima parte 🔟" },
  { "label": "100%", "value": "1 inteiro", "hint": "tudo! 🎂" }
]
```

Olha como um saco de **100 rebuçados** se reparte em percentagens — as fatias do gráfico mostram logo o tamanho de cada parte:

```chart
{ "type": "pie", "title": "Um saco de 100 rebuçados",
  "labels": ["Morango", "Limão", "Cola", "Menta"], "data": [50, 25, 15, 10],
  "unit": "rebuçados",
  "say": "Em 100 rebuçados: 50 por cento são de morango — metade do saco; 25 por cento de limão — um quarto; 15 por cento de cola; e 10 por cento de menta — a décima parte." }
```

## Calcular de cabeça: as quatro contas mágicas 🧠

Aqui está o segredo do 5.º ano — cada percentagem amiga tem **uma divisão**:

```keyvalue
[
  { "k": "50% de…", "v": "divide por 2 → 50% de 80 = 40 ✂️" },
  { "k": "25% de…", "v": "divide por 4 → 25% de 80 = 20 🍕" },
  { "k": "10% de…", "v": "divide por 10 → 10% de 80 = 8 🔟" },
  { "k": "20% de…", "v": "calcula 10% e DOBRA → 10% de 80 = 8, então 20% = 16 ✌️" }
]
```

```math
{ "expr": "10% de 250 = 250 ÷ 10 = 25", "say": "dez por cento de duzentos e cinquenta é duzentos e cinquenta a dividir por dez: vinte e cinco" }
```

E com os 10% na mão constróis quase tudo: **20%** é o dobro, **30%** é o triplo, **5%** é metade dos 10%! 🧱

## Os descontos: a percentagem nos saldos 🏷️

Atenção à pergunta com rasteira: «desconto de 25%» quer dizer que **tiras** 25% ao preço — **pagas o resto**!

```steps
[
  { "title": "Ténis de 60 € com 25% de desconto", "body": "quanto vais pagar? 👟", "icon": "🏷️" },
  { "title": "1. Calcula o desconto", "body": "25% de 60 = 60 ÷ 4 = 15 €", "icon": "✂️" },
  { "title": "2. Tira ao preço", "body": "60 − 15 = 45", "icon": "➖" },
  { "title": "3. Responde", "body": "pagas 45 €! (e poupaste 15 €) ✅", "icon": "🎉" }
]
```

```compare
[
  { "title": "O desconto ✂️", "rows": [
    { "label": "O que é", "value": "a parte que NÃO pagas" },
    { "label": "Exemplo", "value": "25% de 60 € = 15 €" }
  ] },
  { "title": "O que pagas 💶", "highlight": true, "rows": [
    { "label": "O que é", "value": "o preço MENOS o desconto", "highlight": true },
    { "label": "Exemplo", "value": "60 − 15 = 45 €", "highlight": true }
  ] }
]
```

## Um exemplo passo a passo 🔍

*«A escola tem **240 alunos**. **10%** vêm de bicicleta e **50%** vêm a pé. Quantos alunos vêm de bicicleta? E a pé?»* 🚲

```steps
[
  { "title": "1. 10% de 240", "body": "divide por 10 → 240 ÷ 10 = 24 alunos de bicicleta 🚲", "icon": "🔟" },
  { "title": "2. 50% de 240", "body": "divide por 2 → 240 ÷ 2 = 120 alunos a pé 🚶", "icon": "✂️" },
  { "title": "3. Confere", "body": "24 + 120 = 144 — os outros 96 (40%) vêm de carro ou autocarro", "icon": "🧮" },
  { "title": "4. Responde", "body": "24 de bicicleta e 120 a pé! ✅", "icon": "🎉" }
]
```

> **Truque:** começa **sempre pelos 10%** (dividir por 10 é cortar um zero ou andar com a vírgula!). Com os 10% calculas quase tudo: dobra para 20%, multiplica por 3 para 30%, faz metade para 5%. E lembra-te: **50% é metade, 25% é um quarto** — são as frações de sempre disfarçadas. 🥸

> [!TIP] **Para saberes mais** 🌱 Quando os adultos pagam uma conta, há um imposto escondido no preço chamado **IVA**, que em Portugal chega a **23%**! No 6.º ano vais aprender a calcular **qualquer** percentagem (até 37% de 85!) transformando a percentagem num decimal e multiplicando: 23% de 100 € = 0,23 × 100 = 23 €. 🧾

## Vamos praticar 🎈

```quiz
{
  "id": "mat-5-percentagens-pratica",
  "questions": [
    { "q": "25% quer dizer…", "layout": "grid",
      "options": [ { "t": "25 em cada 100", "emoji": "💯", "correct": true }, { "t": "25 em cada 1000" }, { "t": "sempre 25 €" } ],
      "explain": "Por cento = em cada cem: 25% = 25/100 = 1/4." },
    { "q": "50% é o mesmo que…", "layout": "grid",
      "options": [ { "t": "metade", "emoji": "✂️", "correct": true }, { "t": "um quarto" }, { "t": "o dobro" } ],
      "explain": "50/100 = 1/2 — a metade." },
    { "q": "Para calcular 50% de um número…", "layout": "grid",
      "options": [ { "t": "divides por 2", "correct": true }, { "t": "divides por 5" }, { "t": "multiplicas por 2" } ],
      "explain": "50% é metade → dividir por 2." },
    { "q": "50% de 80 é…", "layout": "grid",
      "options": [ { "t": "40", "correct": true }, { "t": "8" }, { "t": "20" } ],
      "explain": "80 ÷ 2 = 40." },
    { "q": "25% de 40 é…", "layout": "grid",
      "options": [ { "t": "10", "emoji": "🍕", "correct": true }, { "t": "4" }, { "t": "25" } ],
      "explain": "25% é um quarto: 40 ÷ 4 = 10." },
    { "q": "10% de 250 é…", "layout": "grid",
      "options": [ { "t": "25", "emoji": "🔟", "correct": true }, { "t": "2,5" }, { "t": "250" } ],
      "explain": "Divide por 10: 250 ÷ 10 = 25." },
    { "q": "20% de 60 é…", "layout": "grid",
      "options": [ { "t": "12", "emoji": "✌️", "correct": true }, { "t": "6" }, { "t": "20" } ],
      "explain": "10% de 60 = 6; o dobro é 12." },
    { "q": "100% de 35 é…", "layout": "grid",
      "options": [ { "t": "35 — tudo!", "emoji": "🎂", "correct": true }, { "t": "100" }, { "t": "3,5" } ],
      "explain": "100% é o todo: 35." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-percentagens-final",
  "final": true,
  "title": "As percentagens",
  "questions": [
    { "q": "O símbolo % quer dizer…", "layout": "grid",
      "options": [ { "t": "em cada 100", "emoji": "💯", "correct": true }, { "t": "em cada 10" }, { "t": "euros" } ],
      "explain": "Por cento = /100." },
    { "q": "25% escrito como fração é…", "layout": "grid",
      "options": [ { "t": "1/4", "emoji": "🍕", "correct": true }, { "t": "1/2" }, { "t": "1/25" } ],
      "explain": "25/100 = 1/4." },
    { "q": "10% escrito como decimal é…", "layout": "grid",
      "options": [ { "t": "0,1", "correct": true }, { "t": "0,01" }, { "t": "10" } ],
      "explain": "10/100 = 0,1 — a décima parte." },
    { "q": "50% de 120 é…", "layout": "grid",
      "options": [ { "t": "60", "correct": true }, { "t": "50" }, { "t": "12" } ],
      "explain": "120 ÷ 2 = 60." },
    { "q": "25% de 200 é…", "layout": "grid",
      "options": [ { "t": "50", "correct": true }, { "t": "25" }, { "t": "100" } ],
      "explain": "200 ÷ 4 = 50." },
    { "q": "10% de 90 é…", "layout": "grid",
      "options": [ { "t": "9", "correct": true }, { "t": "90" }, { "t": "0,9" } ],
      "explain": "90 ÷ 10 = 9." },
    { "q": "20% de 150 é…", "layout": "grid",
      "options": [ { "t": "30", "emoji": "✌️", "correct": true }, { "t": "15" }, { "t": "75" } ],
      "explain": "10% = 15; 20% é o dobro: 30." },
    { "q": "Uma camisola de 30 € tem 50% de desconto. Pagas…", "layout": "grid",
      "options": [ { "t": "15 €", "emoji": "🏷️", "correct": true }, { "t": "30 €" }, { "t": "50 €" } ],
      "explain": "O desconto é 15 € (metade); pagas 30 − 15 = 15 €." },
    { "q": "Ténis de 60 € com 25% de desconto. Pagas…", "layout": "grid",
      "options": [ { "t": "45 €", "emoji": "👟", "correct": true }, { "t": "15 €" }, { "t": "35 €" } ],
      "explain": "Desconto: 60 ÷ 4 = 15 €. Pagas 60 − 15 = 45 € — não te esqueças de subtrair!" },
    { "q": "A escola tem 240 alunos; 10% vêm de bicicleta. Quantos são?", "layout": "grid",
      "options": [ { "t": "24", "emoji": "🚲", "correct": true }, { "t": "10" }, { "t": "240" } ],
      "explain": "240 ÷ 10 = 24 alunos." }
  ]
}
```
