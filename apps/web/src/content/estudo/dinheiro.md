# O dinheiro 💶

> [!NOTE] **O que vais aprender** 👀 Vais conhecer as moedas e notas do euro, saber quanto vale cada uma e como juntá-las para pagar.

Em Portugal usamos o **euro** (€). Há **moedas** (de metal) e **notas** (de
papel). Aqui tens **todas**! Toca em cada uma para ouvir quanto vale. 🎧

## As moedas 🪙

São **8 moedas**. As mais pequenas são **cêntimos**; as duas maiores valem
**euros**.

```money
{ "mode": "show", "title": "As 8 moedas", "show": [
  { "v": 0.01, "note": "cor de cobre" },
  { "v": 0.02, "note": "cor de cobre" },
  { "v": 0.05, "note": "cor de cobre" },
  { "v": 0.1, "note": "dourada" },
  { "v": 0.2, "note": "dourada" },
  { "v": 0.5, "note": "dourada" },
  { "v": 1, "note": "prata e ouro" },
  { "v": 2, "note": "ouro e prata" }
] }
```

> [!TIP] As moedas **castanhas** (cor de cobre) valem pouco: **1c, 2c, 5c**. As
> **douradas** valem mais: **10c, 20c, 50c**. E as de **euro** (1€ e 2€) têm
> duas cores! 🪙

## As notas 💶

As notas são de **papel** e cada uma tem uma **cor diferente** — assim
reconhece-las num instante! Há **7 notas**, da mais pequena (5€) à maior (500€).

```money
{ "mode": "show", "title": "As notas e as suas cores", "show": [
  { "v": 5, "note": "cinzenta" },
  { "v": 10, "note": "vermelha" },
  { "v": 20, "note": "azul" },
  { "v": 50, "note": "laranja" },
  { "v": 100, "note": "verde" },
  { "v": 200, "note": "amarela" },
  { "v": 500, "note": "roxa" }
] }
```

> [!TIP] Quanto **maior** o número, **mais vale** a nota. E a cor ajuda-te: a de
> **20€** é **azul**, a de **50€** é **laranja** e a maior de todas, a de
> **500€**, é **roxa**! 🌈

## A regra de ouro 💡

> **100 cêntimos = 1 euro.** Tal como 100 cêntimos se juntam para fazer 1€,
> também **duas moedas de 50c** fazem **1€**!

```keyvalue
[
  { "k": "100c", "v": "= 1 euro (1€) 🪙" },
  { "k": "50c + 50c", "v": "= 1€" },
  { "k": "20c + 20c + 10c", "v": "= 50c" },
  { "k": "1€ + 1€", "v": "= 2€ (ou a moeda de 2€)" }
]
```

## Formar um valor (com exemplos)

Há **muitas maneiras** de fazer a mesma quantia. Começa sempre pela nota ou
moeda **maior** e vai juntando as pequeninas:

```keyvalue
[
  { "k": "2€", "v": "a moeda de 2€, ou 1€ + 1€" },
  { "k": "7€", "v": "nota de 5€ + moeda de 2€" },
  { "k": "12€", "v": "nota de 10€ + moeda de 2€" },
  { "k": "75c", "v": "50c + 20c + 5c" },
  { "k": "375,55€", "v": "200€ + 100€ + 50€ + 20€ + 5€ + 50c + 5c" }
]
```

> [!TIP] Em valores **grandes** usamos sobretudo **notas**, e juntamos moedas só
> para os **cêntimos** do fim. Para **375,55€**: as notas fazem os **375€** e as
> moedas (50c + 5c) fazem os **55 cêntimos**. 💶🪙

## Experimenta tu! 🎈

Toca nas moedas para chegar ao objetivo:

```money
{ "title": "Junta 1 euro", "items": [0.5, 0.2, 0.2, 0.1], "target": 1 }
```

E agora paga **certinho** — escolhe notas e moedas até dar o valor:

```money
{ "title": "Paga 7€ 🧸", "price": 7 }
```

Pronto para um **valor grande**? Paga **375,55€** com notas **e** moedas:

```money
{ "title": "Uma bicicleta 🚲", "price": 375.55, "palette": [200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05] }
```

> **Para saberes mais 🌱** O euro (€) não é só nosso! Muitos países da Europa
> usam o **mesmo dinheiro** — Espanha, França, Itália… Por isso, de férias lá,
> pagas com as mesmas moedas e notas! 🌍

## Onde treinar com jogos

Queres praticar a brincar? Vai à **Matemática** e à **Cidadania**:

- **2.º ano** → [O dinheiro (euros)](lesson:mat-2-dinheiro)
- Aprende a [Poupar e gastar bem](lesson:cid-2-poupar) 🐷
