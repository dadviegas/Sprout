# O relógio digital e as horas certas ⏰

> [!NOTE] **O que vais aprender** 👀 Vais ler as horas nos **dois relógios** — o de ponteiros e o **digital** (o dos números, como no micro-ondas!) —, conhecer a família **horas, minutos e segundos**, e calcular **quanto tempo dura** uma coisa. No fim, ainda vais planear uma **lista de compras** como um chefe! 🛒

Os relógios estão em todo o lado: na parede da escola, no forno, no telemóvel do pai… Uns têm ponteiros, outros só números. Dizem todos **a mesma coisa** — só falam línguas diferentes. Hoje vais ficar bilingue em horas! 🕐

## Os dois relógios 🕒

```compare
[
  { "title": "Analógico 🕒 (ponteiros)", "rows": [
    { "label": "Como mostra", "value": "ponteiro pequeno = horas; grande = minutos" },
    { "label": "Onde o vês", "value": "parede da escola, relógio de pulso" },
    { "label": "Exemplo", "value": "ponteiros nas 2 e no 6 → 2 e meia" }
  ] },
  { "title": "Digital 14:30 (números)", "highlight": true, "rows": [
    { "label": "Como mostra", "value": "horas : minutos — lê-se de uma vez", "highlight": true },
    { "label": "Onde o vês", "value": "micro-ondas, telemóvel, forno, tablet" },
    { "label": "Exemplo", "value": "14:30 → as 2 e meia da tarde", "highlight": true }
  ] }
]
```

Relembra os ponteiros aqui — gira e compara com o que dirá o digital:

```clock
{ "mode": "play", "hour": 14, "minute": 30, "title": "2 e meia da tarde — no digital: 14:30" }
```

## O segredo do digital: o dia tem 24 horas 🌞🌙

O relógio de ponteiros só conta até 12 e dá **duas voltas** por dia. O digital não dá voltas: conta de **0 a 23**! Por isso, à tarde os números continuam a subir:

```keyvalue
[
  { "k": "07:00", "v": "7 da manhã — acordar! 🌅" },
  { "k": "12:00", "v": "meio-dia — almoço 🍝" },
  { "k": "14:30", "v": "2 e meia da tarde (12 + 2 = 14) 🏫" },
  { "k": "20:00", "v": "8 da noite — jantar 🌙" },
  { "k": "00:00", "v": "meia-noite — a dormir! 😴" }
]
```

> **Truque:** o digital marca mais do que 12? **Tira 12** e tens a hora da tarde: 14:30 → 14 − 12 = **2 e meia da tarde**. E ao contrário: «8 da noite» → 8 + 12 = **20:00**. Soma ou tira 12, e os dois relógios falam a mesma língua! 🔁

## Horas, minutos e segundos ⏱️

O tempo é uma família de três: a hora manda nos minutos, o minuto manda nos segundos — e a chefia é sempre **de 60 em 60**:

```math
{ "expr": "1 hora = 60 minutos", "say": "uma hora são sessenta minutos" }
```

```math
{ "expr": "1 minuto = 60 segundos", "say": "um minuto são sessenta segundos" }
```

```keyvalue
[
  { "k": "Segundo ⚡", "v": "um estalar de dedos — 1, 2, 3…" },
  { "k": "Minuto 🎵", "v": "60 segundos — mais ou menos uma canção curta" },
  { "k": "Hora 📚", "v": "60 minutos — uma aula é quase isto" },
  { "k": "Meia hora", "v": "30 minutos — é metade de 60" },
  { "k": "Um quarto de hora", "v": "15 minutos — 60 ÷ 4" }
]
```

## Quanto tempo durou? 🕰️

Saber as horas é bom; saber **quanto tempo passa** é ainda melhor! *«O filme começou às 14:30 e durou 45 minutos. A que horas acabou?»*

```steps
[
  { "title": "1. Marca o início", "body": "começou às 14:30 ⏰", "icon": "🟢" },
  { "title": "2. Anda primeiro até à hora certa", "body": "de 14:30 até às 15:00 vão 30 minutos", "icon": "🪜" },
  { "title": "3. Quanto falta andar?", "body": "45 − 30 = 15 minutos ainda por andar", "icon": "🧮" },
  { "title": "4. Anda o resto", "body": "15:00 + 15 min = 15:15 — o filme acabou às 15:15! 🎬", "icon": "🎉" }
]
```

> [!TIP] Para contar durações, salta **primeiro até à hora certinha** (a estação de comboio mais próxima 🚉) e só depois andas os minutos que faltam. É muito mais fácil do que somar tudo de uma vez!

## A lista de compras: planear como um chefe 🛒

O tempo e o dinheiro gerem-se da mesma maneira: **com um plano**! Antes de ir às compras, faz a **lista** e **estima** quanto vais gastar — assim sabes se o dinheiro chega.

A mãe deu-te **5 €** e a lista é: pão (1,10 €), leite (0,90 €) e bolachas (1,80 €).

```steps
[
  { "title": "1. Arredonda na cabeça", "body": "pão ≈ 1 €, leite ≈ 1 €, bolachas ≈ 2 €", "icon": "🧠" },
  { "title": "2. Estima o total", "body": "1 + 1 + 2 = cerca de 4 € — os 5 € chegam! ✅", "icon": "🧮" },
  { "title": "3. Confirma com a conta certa", "body": "1,10 + 0,90 + 1,80 = 3,80 €", "icon": "✏️" },
  { "title": "4. Pensa no troco", "body": "5,00 − 3,80 = 1,20 € de troco 💶", "icon": "💰" }
]
```

Agora paga tu! Junta notas e moedas até fazer exatamente o valor das compras:

```money
{ "price": 3.80, "title": "Paga as compras: 3,80 €" }
```

> [!NOTE] Queres treinar mais? No **Saber de cor** há uma loja inteira à tua espera — a brincadeira é a mesma: escolher, estimar, pagar e conferir o troco! 🛍️

> [!TIP] **Para saberes mais** 🌱 Porquê **60** minutos e não 100? A culpa é dos **babilónios**, há 4000 anos: eles contavam em grupos de 60 — e o 60 é um número fantástico, porque se divide certinho por 2, 3, 4, 5, 6, 10, 12… Por isso meia hora, um terço de hora e um quarto de hora dão todos números certos! 🤓

## Vamos praticar 🎈

```quiz
{
  "id": "mat-3-relogio-digital-pratica",
  "questions": [
    { "q": "No relógio digital, os números antes dos dois pontos (14:30) são…", "layout": "grid", "level": 1,
      "hint": "Primeiro as grandes, depois as pequenas!",
      "options": [ { "t": "as horas", "emoji": "🕐", "correct": true }, { "t": "os minutos", "feedback": "Os minutos vêm depois dos dois pontos (o 30). Antes estão as horas.", "tag": "relogio-digital-formato" }, { "t": "os segundos", "feedback": "Os segundos não aparecem aqui. Antes dos dois pontos estão as horas.", "tag": "relogio-digital-formato" } ],
      "explain": "horas : minutos — o 14 são as horas, o 30 os minutos." },
    { "q": "1 hora tem…", "layout": "grid", "level": 1,
      "hint": "É a família do 60!",
      "options": [ { "t": "60 minutos", "correct": true }, { "t": "100 minutos", "feedback": "O tempo conta de 60 em 60: 1 hora tem 60 minutos.", "tag": "relogio-minutos" }, { "t": "30 minutos", "feedback": "30 minutos é meia hora. A hora toda tem 60.", "tag": "relogio-minutos" } ],
      "explain": "1 h = 60 min (e 1 min = 60 s)." },
    { "q": "O digital marca 14:30. Que horas são, à moda dos ponteiros?", "layout": "grid", "level": 2,
      "hint": "Tira 12 às horas…",
      "options": [ { "t": "2 e meia da tarde", "emoji": "🕝", "correct": true }, { "t": "4 e meia da tarde", "feedback": "Tira 12 às horas: 14 − 12 = 2. São 2 e meia da tarde.", "tag": "relogio-24h" }, { "t": "2 e meia da manhã", "feedback": "14:30 é depois do meio-dia: é da TARDE, 2 e meia.", "tag": "relogio-24h" } ],
      "explain": "14 − 12 = 2 → são as 2:30 da tarde." },
    { "q": "São «8 da noite». O que marca o relógio digital?", "layout": "grid", "level": 2,
      "hint": "À noite, soma 12 às horas.",
      "options": [ { "t": "20:00", "correct": true }, { "t": "08:00", "feedback": "08:00 é 8 da manhã. À noite soma-se 12: 8 + 12 = 20:00.", "tag": "relogio-24h" }, { "t": "18:00", "feedback": "18:00 é 6 da tarde. 8 da noite é 8 + 12 = 20:00.", "tag": "relogio-24h" } ],
      "explain": "8 + 12 = 20 → o digital marca 20:00." },
    { "q": "Meia hora são…", "layout": "grid", "level": 1,
      "hint": "É metade de 60.",
      "options": [ { "t": "30 minutos", "correct": true }, { "t": "50 minutos", "feedback": "Meia hora é metade de 60: 30 minutos.", "tag": "relogio-meia-quarto" }, { "t": "15 minutos", "feedback": "15 minutos é um quarto de hora. Meia hora são 30.", "tag": "relogio-meia-quarto" } ],
      "explain": "Metade de 60 min = 30 min." },
    { "q": "O treino começou às 16:00 e durou 1 hora. Acabou às…", "layout": "grid", "level": 2,
      "hint": "Anda 1 hora para a frente no digital.",
      "options": [ { "t": "17:00", "correct": true }, { "t": "16:30", "feedback": "1 hora são 60 minutos. 16:00 + 1 h = 17:00, não 16:30.", "tag": "tempo-soma" }, { "t": "15:00", "feedback": "1 hora é para a FRENTE: 16:00 + 1 h = 17:00.", "tag": "tempo-soma" } ],
      "explain": "16:00 + 1 h = 17:00." },
    { "q": "O bolo entrou no forno às 10:30 e leva 45 min. Sai às…", "layout": "grid", "level": 3,
      "hint": "Salta primeiro até às 11:00, depois anda o resto. 🚉",
      "options": [ { "t": "11:15", "emoji": "🎂", "correct": true }, { "t": "11:00", "feedback": "De 10:30 a 11:00 são só 30 min. Faltam mais 15: 11:15.", "tag": "tempo-soma" }, { "t": "10:45", "feedback": "Somaste 15, mas são 45 min: 10:30 → 11:00 (30) + 15 = 11:15.", "tag": "tempo-soma" } ],
      "explain": "10:30 → 11:00 são 30 min; faltam 15 → 11:15." },
    { "q": "Tens 5 € e a lista custa cerca de 1 € + 1 € + 2 €. O dinheiro chega?", "layout": "grid", "level": 2,
      "hint": "Estima primeiro: soma os arredondados.",
      "options": [ { "t": "sim, sobra ainda ≈ 1 €", "emoji": "✅", "correct": true }, { "t": "não, falta dinheiro", "feedback": "Estima: 1 + 1 + 2 = 4 €. Com 5 € chega e sobra ≈ 1 €.", "tag": "dinheiro-estimar" } ],
      "explain": "1 + 1 + 2 = 4 € estimados — com 5 € chega e sobra." },
    { "q": "As compras custam 3,80 € e pagas com 5 €. O troco é…", "layout": "grid", "level": 3,
      "hint": "Sobe de 3,80 até 5,00: primeiro 20 cêntimos, depois…",
      "options": [ { "t": "1,20 €", "correct": true }, { "t": "2,20 €", "feedback": "Sobe de 3,80: +0,20 = 4,00; +1,00 = 5,00. Troco 1,20 € (não 2,20).", "tag": "dinheiro-troco" }, { "t": "0,80 €", "feedback": "0,80 seria o troco de 4,20 €. De 3,80 a 5,00 vão 1,20 €.", "tag": "dinheiro-troco" } ],
      "explain": "3,80 + 0,20 = 4,00; 4,00 + 1,00 = 5,00 → troco 1,20 €." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-3-relogio-digital-final",
  "final": true,
  "title": "O relógio digital e as horas certas",
  "questions": [
    { "q": "Que relógio mostra as horas só com números (tipo 14:30)?", "layout": "grid", "level": 1,
      "hint": "É o do micro-ondas!",
      "options": [ { "t": "o digital", "correct": true }, { "t": "o de ponteiros", "feedback": "O de ponteiros mostra com setas. Só com números é o digital.", "tag": "relogio-digital-formato" }, { "t": "o de sol", "feedback": "O relógio de sol usa a sombra. Com números é o digital.", "tag": "relogio-digital-formato" } ],
      "explain": "O digital mostra horas : minutos em números." },
    { "q": "1 minuto tem…", "layout": "grid", "level": 1,
      "hint": "A família do tempo conta de 60 em 60.",
      "options": [ { "t": "60 segundos", "correct": true }, { "t": "100 segundos", "feedback": "O tempo conta de 60 em 60: 1 minuto tem 60 segundos.", "tag": "relogio-minutos" }, { "t": "60 horas", "feedback": "60 HORAS é muito! 1 minuto tem 60 SEGUNDOS.", "tag": "relogio-minutos" } ],
      "explain": "1 min = 60 s." },
    { "q": "Um dia inteiro tem…", "layout": "grid", "level": 1,
      "hint": "O digital conta as horas de 0 a 23…",
      "options": [ { "t": "24 horas", "correct": true }, { "t": "12 horas", "feedback": "12 horas é meio dia. O dia inteiro tem 24 horas.", "tag": "relogio-24h" }, { "t": "60 horas", "feedback": "60 é dos minutos e segundos. O dia tem 24 horas.", "tag": "relogio-24h" } ],
      "explain": "O dia tem 24 horas; o digital conta-as de 00 a 23." },
    { "q": "O digital marca 15:00. Que horas são?", "layout": "grid", "level": 2,
      "hint": "15 − 12 = ?",
      "options": [ { "t": "3 da tarde", "correct": true }, { "t": "5 da tarde", "feedback": "Tira 12: 15 − 12 = 3. São 3 da tarde.", "tag": "relogio-24h" }, { "t": "3 da manhã", "feedback": "15:00 é depois do meio-dia: 3 da TARDE.", "tag": "relogio-24h" } ],
      "explain": "15 − 12 = 3 → são 3 da tarde." },
    { "q": "«Meio-dia» no relógio digital é…", "layout": "grid", "level": 2,
      "hint": "É a hora do almoço! 🍝",
      "options": [ { "t": "12:00", "correct": true }, { "t": "00:00", "feedback": "00:00 é meia-noite. Meio-dia é 12:00.", "tag": "relogio-24h" }, { "t": "10:00", "feedback": "10:00 é 10 da manhã. Meio-dia é 12:00.", "tag": "relogio-24h" } ],
      "explain": "Meio-dia = 12:00; meia-noite = 00:00." },
    { "q": "Um quarto de hora são…", "layout": "grid", "level": 2,
      "hint": "Divide 60 por 4.",
      "options": [ { "t": "15 minutos", "correct": true }, { "t": "25 minutos", "feedback": "Divide 60 por 4: um quarto de hora são 15 minutos.", "tag": "relogio-meia-quarto" }, { "t": "4 minutos", "feedback": "O «quatro» de «quarto» não são 4 minutos: é 60 ÷ 4 = 15.", "tag": "relogio-meia-quarto" } ],
      "explain": "60 ÷ 4 = 15 min." },
    { "q": "O filme começou às 14:30 e durou 45 min. Acabou às…", "layout": "grid", "level": 3,
      "hint": "30 min até às 15:00, e depois os 15 que faltam.",
      "options": [ { "t": "15:15", "emoji": "🎬", "correct": true }, { "t": "15:00", "feedback": "De 14:30 a 15:00 são só 30 min. Faltam 15: 15:15.", "tag": "tempo-soma" }, { "t": "14:45", "feedback": "Somaste 15, mas são 45 min: 14:30 + 30 (15:00) + 15 = 15:15.", "tag": "tempo-soma" } ],
      "explain": "14:30 + 30 min = 15:00; + 15 min = 15:15." },
    { "q": "A aula começa às 09:00 e acaba às 10:00. Quanto durou?", "layout": "grid", "level": 2,
      "hint": "Das 9 às 10 vai…",
      "options": [ { "t": "1 hora", "correct": true }, { "t": "30 minutos", "feedback": "Das 9 às 10 passa a hora toda: 60 min = 1 hora.", "tag": "tempo-soma" }, { "t": "2 horas", "feedback": "É só uma hora de diferença: das 09:00 às 10:00 = 1 hora.", "tag": "tempo-soma" } ],
      "explain": "Das 09:00 às 10:00 passa 1 hora (60 min)." },
    { "q": "Antes de ir às compras, um chefe das contas faz primeiro…", "layout": "list", "level": 2,
      "hint": "Planear antes de gastar! 🛒",
      "options": [ { "t": "a lista e uma estimativa do total", "emoji": "📝", "correct": true }, { "t": "nada — logo se vê", "feedback": "Sem plano arriscas não ter dinheiro. Faz a lista e estima o total.", "tag": "dinheiro-estimar" }, { "t": "só escolhe os doces", "feedback": "Primeiro a lista e a estimativa do total, para saber se chega.", "tag": "dinheiro-estimar" } ],
      "explain": "Lista + estimativa = sabes se o dinheiro chega antes de chegar à caixa." },
    { "q": "Lista: sumo 1,90 € + pão 1,10 €. Tens 3 €. Chega?", "layout": "grid", "level": 3,
      "hint": "1,90 ≈ 2 € e 1,10 ≈ 1 €…",
      "options": [ { "t": "chega à justa: dá exatamente 3,00 €", "emoji": "😅", "correct": true }, { "t": "não chega", "feedback": "1,90 + 1,10 = 3,00 €. Chega exatamente, sem sobrar.", "tag": "dinheiro-estimar" }, { "t": "sobra 1 €", "feedback": "1,90 + 1,10 = 3,00 €. Chega à justa, não sobra.", "tag": "dinheiro-estimar" } ],
      "explain": "1,90 + 1,10 = 3,00 € — chega sem sobrar nada!" }
  ]
}
```
