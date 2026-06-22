# O acaso e a probabilidade 🎲

> [!NOTE] **O que vais aprender** 👀 A falar a língua do **acaso**: o que é **certo**, **possível** e **impossível**, a medir a sorte numa escala de **0 a 1**, o que quer dizer **equiprovável** (o dado e a moeda justos!) e a fazer a tua própria **experiência** com a frequência relativa. Esta matéria começa no **5.º ano** e aprofunda-se agora — é a tua primeira viagem ao mundo da sorte! 🍀

Vai sair cara ou coroa? 🪙 Vai calhar o 6 no dado? Vai chover amanhã? Há perguntas cuja resposta **ninguém sabe de certeza** — é o **acaso**. Mas a matemática tem um superpoder: consegue **medir** quanto cada coisa é provável. Chama-se **probabilidade**, e é a matemática dos jogos, da meteorologia e até dos cientistas! 🔮

## Certo, possível ou impossível? 🚦

Antes dos números, as três palavras do acaso:

```keyvalue
[
  { "k": "Certo ✅", "v": "vai acontecer de certeza — «amanhã o Sol nasce»" },
  { "k": "Possível 🤷", "v": "pode acontecer ou não — «vai sair coroa», «amanhã chove»" },
  { "k": "Impossível 🚫", "v": "não pode acontecer nunca — «sair 7 num dado de 1 a 6»" }
]
```

## A escala de 0 a 1 📏

A probabilidade mede-se com um número **entre 0 e 1** — é a régua da sorte:

```stats
[
  { "label": "Impossível", "value": "0", "hint": "sair 7 num dado 🚫" },
  { "label": "Pouco provável", "value": "perto de 0", "hint": "sair o 6: 1/6 🎲" },
  { "label": "Meio-meio", "value": "1/2 = 0,5", "hint": "cara ou coroa 🪙" },
  { "label": "Certo", "value": "1", "hint": "sair um nº de 1 a 6 ✅" }
]
```

> A probabilidade **nunca** é menor que 0 nem maior que 1. Se uma conta te der 1,3 ou −0,2… há um erro! Também a podes escrever em percentagem: 0,5 = **50%**. 🎯

## Contar casos: a conta da sorte 🧮

Quando todos os resultados têm a **mesma** hipótese, a probabilidade calcula-se a **contar casos**:

```math
{ "expr": "P = favoráveis ÷ possíveis", "say": "a probabilidade é igual aos casos favoráveis a dividir pelos casos possíveis" }
```

```steps
[
  { "title": "Qual a probabilidade de sair 6 no dado?", "body": "o dado tem 6 faces 🎲", "icon": "🎲" },
  { "title": "Casos possíveis", "body": "1, 2, 3, 4, 5, 6 → são 6 casos", "icon": "🔢" },
  { "title": "Casos favoráveis", "body": "só o 6 → 1 caso", "icon": "🎯" },
  { "title": "Resposta", "body": "P = 1/6 ≈ 0,17 — pouco provável, mas possível! ✅", "icon": "🎉" }
]
```

E sair um número **par**? Os favoráveis são 2, 4 e 6 → P = 3/6 = **1/2**. Meio-meio, como a moeda!

## Equiprovável: quando o jogo é justo ⚖️

**Equiprovável** quer dizer «**com a mesma probabilidade**». Num dado **justo**, cada face tem P = 1/6; numa moeda **justa**, cara e coroa têm P = 1/2. É isso que torna os jogos justos — ninguém parte à frente!

```compare
[
  { "title": "Moeda justa 🪙", "rows": [
    { "label": "Resultados", "value": "cara, coroa (2 casos)" },
    { "label": "Cada um", "value": "P = 1/2 = 0,5" },
    { "label": "Equiprovável?", "value": "sim — mesma hipótese!" }
  ] },
  { "title": "Dado justo 🎲", "rows": [
    { "label": "Resultados", "value": "1 a 6 (6 casos)" },
    { "label": "Cada um", "value": "P = 1/6" },
    { "label": "Equiprovável?", "value": "sim — mesma hipótese!" }
  ] },
  { "title": "Saco de berlindes 🔮", "highlight": true, "rows": [
    { "label": "Resultados", "value": "3 azuis + 1 vermelho", "highlight": true },
    { "label": "Cada cor", "value": "azul 3/4, vermelho 1/4", "highlight": true },
    { "label": "Equiprovável?", "value": "NÃO — o azul sai mais!", "highlight": true }
  ] }
]
```

## A experiência: frequência relativa 🧪

E se não conheces as probabilidades? **Experimentas!** Atira uma moeda **20 vezes** e conta as caras. A **frequência relativa** é:

```math
{ "expr": "frequência relativa = vezes que saiu ÷ vezes que tentaste", "say": "a frequência relativa é o número de vezes que saiu, a dividir pelo número de vezes que tentaste" }
```

Se saíram 12 caras em 20 atiradelas → 12/20 = **0,6**. Não deu 0,5 certinho? É normal — o acaso baralha! Mas olha o que acontece quando tentas **mais vezes**:

```chart
{ "type": "bar", "title": "Caras em cada 100 atiradelas (experiência)",
  "labels": ["10 vezes", "20 vezes", "100 vezes", "1000 vezes"], "data": [70, 60, 53, 50],
  "unit": "% de caras",
  "say": "Com 10 atiradelas saíram 70 por cento de caras; com 20, 60 por cento; com 100, 53; com 1000, 50 por cento. Quantas mais vezes tentas, mais a frequência se aproxima da probabilidade: cinquenta por cento." }
```

Quantas **mais vezes** repetes, mais a frequência relativa se **aproxima** da probabilidade verdadeira. É assim que os cientistas descobrem probabilidades que ninguém conhece! 🔬

## Um exemplo passo a passo 🔍

*«Num saco há **3 berlindes azuis** e **1 vermelho**. Tiras um sem ver. Qual a probabilidade de sair azul?»* 🔮

```steps
[
  { "title": "1. Casos possíveis", "body": "há 4 berlindes no saco → 4 casos", "icon": "🔢" },
  { "title": "2. Casos favoráveis", "body": "3 berlindes são azuis → 3 casos", "icon": "🎯" },
  { "title": "3. Divide", "body": "P = 3/4 = 0,75", "icon": "🧮" },
  { "title": "4. Lê o resultado", "body": "0,75 está perto de 1 → MUITO provável (mas não certo!) ✅", "icon": "🎉" }
]
```

> **Truque:** desenha a **régua da sorte** de 0 a 1 e marca lá a tua resposta: perto de **0** = quase impossível; **0,5** = meio-meio; perto de **1** = quase certo. E para calcular, pergunta sempre: **quantos casos ao todo? quantos me servem?** — favoráveis sobre possíveis, e está feito. 🍀

> [!TIP] **Para saberes mais** 🌱 Quando a meteorologia diz «**70% de probabilidade de chuva**», está a usar exatamente isto: em situações iguais a esta, choveu 70 em cada 100 vezes! ☔ E sabias que a probabilidade nasceu por causa de... **jogos de dados**? No séc. XVII, dois matemáticos famosos (Pascal e Fermat) trocaram cartas a discutir apostas — e dessas cartas nasceu um ramo inteiro da matemática! ✉️🎲

## Vamos praticar 🎈

```quiz
{
  "id": "mat-6-probabilidade-pratica",
  "questions": [
    { "q": "«Sair 7 num dado de 1 a 6» é um acontecimento…", "layout": "grid",
      "options": [ { "t": "impossível", "emoji": "🚫", "correct": true }, { "t": "certo", "feedback": "Certo é o que acontece de certeza. Sair 7 num dado de 1 a 6 nunca pode acontecer: é impossível.", "tag": "probabilidade-certo-impossivel" }, { "t": "possível", "feedback": "Possível é o que pode ou não acontecer. O 7 não existe num dado de 1 a 6, por isso é impossível.", "tag": "probabilidade-certo-impossivel" } ],
      "explain": "O dado só tem faces de 1 a 6 — o 7 não existe lá." },
    { "q": "«Sair um número de 1 a 6 num dado» é…", "layout": "grid",
      "options": [ { "t": "certo", "emoji": "✅", "correct": true }, { "t": "impossível", "feedback": "Impossível é o que nunca acontece. Sai sempre um número de 1 a 6, por isso é certo.", "tag": "probabilidade-certo-impossivel" }, { "t": "pouco provável", "feedback": "Pouco provável seria raro acontecer. Mas sai sempre um número de 1 a 6: é certo.", "tag": "probabilidade-certo-impossivel" } ],
      "explain": "Sai sempre um número de 1 a 6 — probabilidade 1." },
    { "q": "A probabilidade é sempre um número entre…", "layout": "grid",
      "options": [ { "t": "0 e 1", "emoji": "📏", "correct": true }, { "t": "1 e 10", "feedback": "A escala da probabilidade não vai até 10. Vai de 0 (impossível) a 1 (certo).", "tag": "probabilidade-escala" }, { "t": "0 e 100", "feedback": "0 a 100 é a escala em percentagem (%). Em número, a probabilidade vai de 0 a 1.", "tag": "probabilidade-escala" } ],
      "explain": "0 = impossível, 1 = certo (em percentagem: 0% a 100%)." },
    { "q": "A probabilidade de sair cara numa moeda justa é…", "layout": "grid",
      "options": [ { "t": "1/2", "emoji": "🪙", "correct": true }, { "t": "1/6", "feedback": "1/6 é a probabilidade de uma face do dado. A moeda tem 2 lados: P(cara) = 1/2.", "tag": "probabilidade-casos" }, { "t": "1", "feedback": "Probabilidade 1 seria sair cara de certeza. A moeda tem 2 lados iguais: 1/2.", "tag": "probabilidade-escala" } ],
      "explain": "2 casos possíveis, 1 favorável: 1/2 = 0,5." },
    { "q": "A probabilidade de sair 6 num dado justo é…", "layout": "grid",
      "options": [ { "t": "1/6", "emoji": "🎲", "correct": true }, { "t": "1/2", "feedback": "1/2 é a probabilidade de cara na moeda. O dado tem 6 faces: P(6) = 1/6.", "tag": "probabilidade-casos" }, { "t": "6", "feedback": "6 é o número de faces, não uma probabilidade. Probabilidade vive entre 0 e 1: aqui é 1/6.", "tag": "probabilidade-escala" } ],
      "explain": "6 faces, 1 favorável: 1/6." },
    { "q": "«Equiprovável» quer dizer…", "layout": "list",
      "options": [ { "t": "todos os resultados têm a mesma probabilidade", "emoji": "⚖️", "correct": true }, { "t": "é impossível", "feedback": "Impossível é não poder acontecer. Equiprovável quer dizer que todos os resultados têm a mesma probabilidade.", "tag": "probabilidade-equiprovavel" }, { "t": "sai sempre o mesmo", "feedback": "Sair sempre o mesmo seria um acontecimento certo. Equiprovável é todos terem a mesma hipótese.", "tag": "probabilidade-equiprovavel" } ],
      "explain": "Como as 6 faces de um dado justo — mesma hipótese para todos." },
    { "q": "Sair um número PAR num dado: quantos casos favoráveis?", "layout": "grid",
      "options": [ { "t": "3 (o 2, o 4 e o 6)", "correct": true }, { "t": "1", "feedback": "Não há só um par no dado. Os pares são 2, 4 e 6 → 3 casos favoráveis.", "tag": "probabilidade-casos" }, { "t": "6", "feedback": "6 é o total de faces (casos possíveis). Pares há só 3: o 2, o 4 e o 6.", "tag": "probabilidade-casos" } ],
      "explain": "P = 3/6 = 1/2 — meio-meio." },
    { "q": "Atiraste a moeda 20 vezes e saíram 12 caras. A frequência relativa é…", "layout": "grid",
      "options": [ { "t": "12/20 = 0,6", "emoji": "🧪", "correct": true }, { "t": "12", "feedback": "12 é só o número de caras. A frequência relativa divide pelas tentativas: 12/20 = 0,6.", "tag": "probabilidade-frequencia-relativa" }, { "t": "20/12", "feedback": "Está ao contrário. É vezes que saiu ÷ vezes que tentaste: 12/20 = 0,6.", "tag": "probabilidade-frequencia-relativa" } ],
      "explain": "Vezes que saiu ÷ vezes que tentaste: 12/20 = 0,6." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-6-probabilidade-final",
  "final": true,
  "title": "O acaso e a probabilidade",
  "questions": [
    { "q": "Um acontecimento com probabilidade 0 é…", "layout": "grid",
      "options": [ { "t": "impossível", "emoji": "🚫", "correct": true }, { "t": "certo", "feedback": "Certo tem probabilidade 1, não 0. Probabilidade 0 quer dizer impossível.", "tag": "probabilidade-certo-impossivel" }, { "t": "meio-meio", "feedback": "Meio-meio é probabilidade 1/2 (0,5). Probabilidade 0 é um acontecimento impossível.", "tag": "probabilidade-certo-impossivel" } ],
      "explain": "0 = nunca acontece; 1 = acontece de certeza." },
    { "q": "Um acontecimento com probabilidade 1 é…", "layout": "grid",
      "options": [ { "t": "certo", "emoji": "✅", "correct": true }, { "t": "impossível", "feedback": "Impossível tem probabilidade 0, não 1. Probabilidade 1 quer dizer certo.", "tag": "probabilidade-certo-impossivel" }, { "t": "raro", "feedback": "Raro seria uma probabilidade perto de 0. Probabilidade 1 (ou 100%) é um acontecimento certo.", "tag": "probabilidade-certo-impossivel" } ],
      "explain": "Probabilidade 1 (ou 100%) = acontece sempre." },
    { "q": "Probabilidade 0,5 quer dizer…", "layout": "grid",
      "options": [ { "t": "meio-meio, como a moeda", "emoji": "🪙", "correct": true }, { "t": "impossível", "feedback": "Impossível é probabilidade 0. 0,5 está mesmo a meio: meio-meio.", "tag": "probabilidade-escala" }, { "t": "quase certo", "feedback": "Quase certo seria perto de 1. 0,5 fica a meio da escala: meio-meio.", "tag": "probabilidade-escala" } ],
      "explain": "0,5 = 1/2 = 50% — tanta hipótese de sim como de não." },
    { "q": "A fórmula da probabilidade é…", "layout": "list",
      "options": [ { "t": "casos favoráveis ÷ casos possíveis", "emoji": "🧮", "correct": true }, { "t": "casos possíveis ÷ casos favoráveis", "feedback": "Está ao contrário. É favoráveis ÷ possíveis: quantos me servem a dividir por quantos há ao todo.", "tag": "probabilidade-casos" }, { "t": "favoráveis × possíveis", "feedback": "Não se multiplica, divide-se. A probabilidade é favoráveis ÷ possíveis.", "tag": "probabilidade-casos" } ],
      "explain": "Quantos me servem, a dividir por quantos há ao todo." },
    { "q": "Num dado justo, a probabilidade de sair um número maior que 4 é…", "layout": "grid",
      "options": [ { "t": "2/6 = 1/3", "emoji": "🎲", "correct": true }, { "t": "1/6", "feedback": "1/6 seria só um caso favorável. Maiores que 4 são dois: o 5 e o 6 → 2/6.", "tag": "probabilidade-casos" }, { "t": "4/6", "feedback": "Maior que 4 não inclui o 4. São só o 5 e o 6 → 2/6 = 1/3.", "tag": "probabilidade-casos" } ],
      "explain": "Favoráveis: o 5 e o 6 → 2 casos em 6." },
    { "q": "Saco com 3 berlindes azuis e 1 vermelho. P(azul) = …", "layout": "grid",
      "options": [ { "t": "3/4", "emoji": "🔮", "correct": true }, { "t": "1/4", "feedback": "1/4 é a probabilidade do vermelho (só há 1). Azuis há 3 em 4: P(azul) = 3/4.", "tag": "probabilidade-casos" }, { "t": "1/3", "feedback": "Não compares azuis com vermelhos (3 para 1). Conta no total de 4 berlindes: 3/4.", "tag": "probabilidade-casos" } ],
      "explain": "3 favoráveis em 4 possíveis: 3/4 = 0,75 — muito provável." },
    { "q": "Nesse saco, tirar azul e tirar vermelho são equiprováveis?", "layout": "list",
      "options": [ { "t": "não — o azul tem mais probabilidade", "emoji": "⚖️", "correct": true }, { "t": "sim, é sempre meio-meio", "feedback": "Meio-meio só se houvesse o mesmo número de cada cor. Há 3 azuis e 1 vermelho: P(azul) = 3/4 ≠ 1/4, não é equiprovável.", "tag": "probabilidade-equiprovavel" } ],
      "explain": "3/4 ≠ 1/4 — só é equiprovável quando as hipóteses são iguais." },
    { "q": "Uma probabilidade pode valer 1,3?", "layout": "grid",
      "options": [ { "t": "nunca — o máximo é 1", "emoji": "📏", "correct": true }, { "t": "sim, se for muito provável", "feedback": "Mesmo muito provável, o máximo é 1 (o acontecimento certo). 1,3 está fora da escala: é erro.", "tag": "probabilidade-escala" } ],
      "explain": "A probabilidade vive entre 0 e 1. Mais que 1 é sinal de erro!" },
    { "q": "Quantas mais vezes repetes a experiência, a frequência relativa…", "layout": "list",
      "options": [ { "t": "aproxima-se da probabilidade", "emoji": "🧪", "correct": true }, { "t": "afasta-se da probabilidade", "feedback": "É o contrário: quantas mais vezes repetes, mais perto fica da probabilidade verdadeira.", "tag": "probabilidade-frequencia-relativa" }, { "t": "passa a ser sempre 1", "feedback": "Não vira 1. Aproxima-se da probabilidade — numa moeda justa, dos 50%.", "tag": "probabilidade-frequencia-relativa" } ],
      "explain": "Com 1000 atiradelas, a moeda justa fica muito perto dos 50%." },
    { "q": "A meteorologia diz «70% de probabilidade de chuva». Isso significa…", "layout": "list",
      "options": [ { "t": "em dias assim, choveu 70 em cada 100 vezes", "emoji": "☔", "correct": true }, { "t": "vai chover 70 minutos", "feedback": "Os 70% não são minutos. É uma probabilidade: em dias assim, choveu 70 em cada 100 vezes.", "tag": "probabilidade-escala" }, { "t": "é certo que chove", "feedback": "Certo seria 100%. 70% é provável mas não garantido: choveu 70 em cada 100 vezes assim.", "tag": "probabilidade-certo-impossivel" } ],
      "explain": "É uma frequência relativa: provável, mas não certo!" }
  ]
}
```
