# Percentagens amigas e orçamentos 💰

> [!NOTE] **O que vais aprender** 👀 Vais conhecer as **percentagens amigas** — 50% é a metade, 25% a quarta parte, 10% é dividir por 10 — e usá-las nos descontos das lojas. Depois vais montar o teu primeiro **orçamento** (receitas, despesas e saldo) e aprender a desconfiar da **publicidade**. 🕵️

«**50% de desconto!**», «**bateria a 25%**», «**100% algodão**» — as percentagens estão em todo o lado. E o segredo é este: **por cento** quer dizer **em cada 100**. 50% = 50 em cada 100 = a **metade**. Já conheces estas frações — agora vais conhecê-las com fato novo! 🎭

## As percentagens amigas 🤝

Não precisas de calculadora para estas — são as frações que já dominas:

```keyvalue
[
  { "k": "100%", "v": "o TODO — tudo, inteirinho 🍕" },
  { "k": "50%", "v": "a metade (1/2) — divide por 2 ✌️" },
  { "k": "25%", "v": "a quarta parte (1/4) — divide por 4 🤲" },
  { "k": "75%", "v": "três quartas partes (3/4) — três fatias de quatro" },
  { "k": "10%", "v": "a décima parte (1/10) — divide por 10 🔟" }
]
```

```fraction
{ "parts": 4, "filled": 1, "shape": "pie", "title": "25% = 1/4 da pizza", "color": "accent" }
```

```fraction
{ "parts": 4, "filled": 3, "shape": "bar", "title": "75% = 3/4 da tablete", "color": "primary" }
```

## Calcular com números amigos 🧮

```math
{ "expr": "50% de 20 = 20 ÷ 2 = 10", "say": "cinquenta por cento de vinte é vinte a dividir por dois: dez" }
```

```math
{ "expr": "25% de 40 = 40 ÷ 4 = 10", "say": "vinte e cinco por cento de quarenta é quarenta a dividir por quatro: dez" }
```

```math
{ "expr": "10% de 30 = 30 ÷ 10 = 3", "say": "dez por cento de trinta é trinta a dividir por dez: três" }
```

> E o **75%**? Vai por degraus: 25% de 40 é 10, logo 75% são **3 × 10 = 30**. Três quartas partes! 🪜

## O teu primeiro orçamento 💶

Um **orçamento** é o plano do dinheiro: o que **entra** (receitas), o que **sai** (despesas) e o que **sobra** (saldo). Vê o mês do Tomás:

```keyvalue
[
  { "k": "Receitas (entra) 📥", "v": "mesada 10 € + ajudar a lavar o carro 2 € = 12 €" },
  { "k": "Despesas (sai) 📤", "v": "revista 3 € + lanche 2 € + prenda para a mana 1 € = 6 €" },
  { "k": "Saldo (sobra) 💰", "v": "12 € − 6 € = 6 € para o mealheiro!" }
]
```

```math
{ "expr": "12 − 6 = 6", "say": "doze euros de receitas menos seis de despesas: sobra um saldo de seis euros" }
```

Olha o orçamento do Tomás às fatias — metade gastou, metade poupou:

```chart
{ "type": "pie", "title": "Para onde foi a mesada do Tomás (12 €)",
  "labels": ["Revista", "Lanche", "Prenda", "Mealheiro"], "data": [3, 2, 1, 6],
  "unit": "€",
  "say": "Dos doze euros, três foram para a revista, dois para o lanche, um para a prenda e seis ficaram no mealheiro — metade da mesada poupada!" }
```

> O saldo **nunca pode ser negativo** — não podes gastar dinheiro que não tens! Se as despesas crescem, ou cortas numa delas ou arranjas mais receitas. ⚖️

## Um exemplo passo a passo 🔍

Uns ténis custam **40 €** e a loja anuncia **25% de desconto**. Quanto pagas? 👟

```steps
{ "reveal": true, "items": [
  { "title": "1. O que pergunta?", "body": "o preço FINAL com o desconto de 25% 🔍", "icon": "search" },
  { "title": "2. Calcula o desconto", "body": "25% de 40 € = 40 ÷ 4 = 10 € de desconto 🤲", "icon": "➗" },
  { "title": "3. Tira ao preço", "body": "40 − 10 = 30 € 💶", "icon": "➖" },
  { "title": "4. Responde com uma frase", "body": "pagas 30 € pelos ténis ✅", "icon": "check" }
] }
```

> **Truque:** o **10%** é o canivete suíço das percentagens: para o achar, basta **dividir por 10** (tirar um zero ou recuar a vírgula). E com ele constróis quase tudo: 20% = 2 × 10%, 5% = metade de 10%! 🔧

> [!WARNING] **Publicidade enganosa? 🪤** Uma loja anuncia: «MEGA DESCONTO de 10%!» num jogo de 30 €. Parece muito… mas 10% de 30 € são só **3 €**. E há lojas que **sobem o preço primeiro** para o desconto parecer maior! Antes de te entusiasmares com o cartaz, faz SEMPRE a conta: quanto poupo mesmo? O cartaz quer vender; a conta diz a verdade. 🕵️

> [!TIP] **Para saberes mais** 🌱 «Por cento» vem do latim *per centum* — «em cada cem». O símbolo **%** nasceu de escrever «cento» tantas vezes à pressa que se transformou em dois zeros com um risco! E no 5.º ano vais aprender a calcular **qualquer** percentagem, não só as amigas. 🚀

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-percentagens-pratica",
  "questions": [
    { "q": "50% é o mesmo que…", "layout": "grid",
      "options": [ { "t": "a metade", "emoji": "✌️", "correct": true }, { "t": "a quarta parte" }, { "t": "o todo" } ],
      "explain": "50 em cada 100 = 1/2 — divide por 2." },
    { "q": "Quanto é 50% de 18?", "layout": "grid",
      "options": [ { "t": "9", "correct": true }, { "t": "8" }, { "t": "36" } ],
      "explain": "50% = metade: 18 ÷ 2 = 9." },
    { "q": "Quanto é 25% de 40?", "layout": "grid",
      "options": [ { "t": "10", "correct": true }, { "t": "20" }, { "t": "4" } ],
      "explain": "25% = quarta parte: 40 ÷ 4 = 10." },
    { "q": "Quanto é 10% de 50?", "layout": "grid",
      "options": [ { "t": "5", "emoji": "🔟", "correct": true }, { "t": "10" }, { "t": "25" } ],
      "explain": "10% = dividir por 10: 50 ÷ 10 = 5." },
    { "q": "A bateria do tablet está a 100%. Isso quer dizer…", "layout": "grid",
      "options": [ { "t": "está toda carregada", "emoji": "🔋", "correct": true }, { "t": "está a meio" }, { "t": "está vazia" } ],
      "explain": "100% é o todo — carga completa." },
    { "q": "Num orçamento, o dinheiro que ENTRA chama-se…", "layout": "grid",
      "options": [ { "t": "receitas", "emoji": "📥", "correct": true }, { "t": "despesas", "emoji": "📤" }, { "t": "saldo" } ],
      "explain": "Receitas entram, despesas saem, e o que sobra é o saldo." },
    { "q": "Recebes 10 € e gastas 7 €. Qual é o teu saldo?", "emoji": "💰", "layout": "grid",
      "options": [ { "t": "3 €", "correct": true }, { "t": "7 €" }, { "t": "17 €" } ],
      "explain": "Saldo = receitas − despesas: 10 − 7 = 3 €." },
    { "q": "Comeste 75% da pizza. Quantas fatias de 4 comeste?", "layout": "grid",
      "options": [ { "t": "3", "emoji": "🍕", "correct": true }, { "t": "1" }, { "t": "4" } ],
      "explain": "75% = 3/4: três fatias de quatro." },
    { "q": "Um livro de 20 € tem 10% de desconto. Quanto poupas?", "layout": "grid",
      "options": [ { "t": "2 €", "correct": true }, { "t": "10 €" }, { "t": "18 €" } ],
      "explain": "10% de 20 € = 20 ÷ 10 = 2 € — faz sempre a conta!" }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-percentagens-final",
  "final": true,
  "title": "Percentagens amigas e orçamentos",
  "questions": [
    { "q": "«Por cento» quer dizer…", "layout": "grid",
      "options": [ { "t": "em cada 100", "emoji": "💯", "correct": true }, { "t": "em cada 10" }, { "t": "vezes 100" } ],
      "explain": "50% = 50 em cada 100 — por isso é a metade." },
    { "q": "25% é o mesmo que…", "layout": "grid",
      "options": [ { "t": "1/4 — a quarta parte", "emoji": "🤲", "correct": true }, { "t": "1/2 — a metade" }, { "t": "1/10" } ],
      "explain": "25 em cada 100 = 25/100 = 1/4." },
    { "q": "Quanto é 50% de 60?", "layout": "grid",
      "options": [ { "t": "30", "correct": true }, { "t": "15" }, { "t": "6" } ],
      "explain": "Metade de 60: 60 ÷ 2 = 30." },
    { "q": "Quanto é 10% de 200?", "layout": "grid",
      "options": [ { "t": "20", "correct": true }, { "t": "2" }, { "t": "100" } ],
      "explain": "200 ÷ 10 = 20." },
    { "q": "Quanto é 75% de 8?", "layout": "grid",
      "options": [ { "t": "6", "correct": true }, { "t": "2" }, { "t": "4" } ],
      "explain": "25% de 8 = 2; 75% = 3 × 2 = 6." },
    { "q": "Uma mochila de 40 € tem 50% de desconto. Quanto pagas?", "emoji": "🎒", "layout": "grid",
      "options": [ { "t": "20 €", "correct": true }, { "t": "35 €" }, { "t": "10 €" } ],
      "explain": "Desconto de 20 € (metade): pagas 40 − 20 = 20 €." },
    { "q": "Receitas 15 €, despesas 9 €. O saldo é…", "layout": "grid",
      "options": [ { "t": "6 €", "emoji": "💰", "correct": true }, { "t": "24 €" }, { "t": "9 €" } ],
      "explain": "15 − 9 = 6 € para o mealheiro." },
    { "q": "Queres comprar algo de 12 € mas só tens 10 €. O que faz quem tem um bom orçamento?", "layout": "grid",
      "options": [ { "t": "espera e poupa até ter os 12 €", "emoji": "🐷", "correct": true }, { "t": "gasta dinheiro que não tem" }, { "t": "deixa de fazer contas" } ],
      "explain": "O saldo não pode ser negativo: poupa primeiro, compra depois." },
    { "q": "Um cartaz grita «desconto INCRÍVEL de 10%» num jogo de 30 €. Quanto poupas mesmo?", "emoji": "🪤", "layout": "grid",
      "options": [ { "t": "3 € — a conta diz a verdade", "correct": true }, { "t": "10 €" }, { "t": "15 €" } ],
      "explain": "10% de 30 € = 3 €. Letras gigantes não mudam a conta — verifica sempre!" }
  ]
}
```
