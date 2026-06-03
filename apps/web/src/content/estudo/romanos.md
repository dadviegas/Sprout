# Os numerais romanos 🏛️

> [!NOTE] **O que vais aprender** 👀
> Os romanos não escreviam os números como nós! Em vez de 1, 2, 3 usavam
> **letras** — I, V, X, L, C, D, M. Vais conhecer cada letra, descobrir o
> **truque do antes e depois** e ler números como o **MCMLXXIV = 1974**. Toca
> nos altifalantes 🔊 para ouvir tudo!

## As sete letras mágicas 🔤

Há só **sete símbolos** para decorar. Toca em cada um para o ouvires! 🎧

```soundcards
{
  "title": "I, V, X, L, C, D, M",
  "items": [
    { "label": "I", "say": "i vale um" },
    { "label": "V", "say": "vê vale cinco" },
    { "label": "X", "say": "xis vale dez" },
    { "label": "L", "say": "éle vale cinquenta" },
    { "label": "C", "say": "cê vale cem" },
    { "label": "D", "say": "dê vale quinhentos" },
    { "label": "M", "say": "eme vale mil" }
  ]
}
```

```keyvalue
[
  { "k": "I", "v": "vale 1 — um dedinho ✊" },
  { "k": "V", "v": "vale 5 — uma mão aberta 🖐️" },
  { "k": "X", "v": "vale 10 — duas mãos 🙌" },
  { "k": "L", "v": "vale 50" },
  { "k": "C", "v": "vale 100 — C de cem (centum) 💯" },
  { "k": "D", "v": "vale 500" },
  { "k": "M", "v": "vale 1000 — M de mil (mille) 🏰" }
]
```

> [!TIP] **Truque para decorar a ordem** 🪜 Diz baixinho: *«I, V, X… L, C, D, M»*
> — **I Vou Xau, Lá Conto Dinheiro à Mãe**! Quanto mais para a direita, **maior**
> é o valor.

## Regra 1 — repetir é SOMAR ➕

Quando as letras estão **da maior para a menor** (ou iguais), só tens de
**somar** tudo! 🧮

```steps
[
  { "title": "1. Lê da esquerda para a direita", "body": "vai dizendo o valor de cada letra 👀", "icon": "👉" },
  { "title": "2. Soma quando não cresce", "body": "se a letra seguinte é igual ou menor, juntas os valores ➕", "icon": "➕" },
  { "title": "3. Junta tudo", "body": "o total é o número romano 🎉", "icon": "🏆" }
]
```

```math
{ "expr": "III = 1 + 1 + 1 = 3", "say": "i, i, i: um mais um mais um é igual a três" }
```

```math
{ "expr": "XX = 10 + 10 = 20", "say": "xis, xis: dez mais dez é igual a vinte" }
```

```math
{ "expr": "XII = 10 + 1 + 1 = 12", "say": "xis, i, i: dez mais um mais um é igual a doze" }
```

> [!NOTE] **Atenção** ⚠️ A mesma letra repete-se **no máximo três vezes** seguidas
> (III = 3), nunca quatro. Por isso o 4 não é IIII — vais já perceber porquê! 😉

## Regra 2 — o pequeno ANTES do grande SUBTRAI ➖

Aqui está o **grande truque**! Quando uma letra **menor** aparece **antes** de
uma **maior**, ela **tira** o seu valor em vez de somar. 🦸

```compare
[
  { "title": "SOMA ➕ (menor depois)", "badge": "junta", "rows": [
    { "label": "VI", "value": "5 + 1 = 6 — o I vem depois, soma" },
    { "label": "XI", "value": "10 + 1 = 11" },
    { "label": "VIII", "value": "5 + 1 + 1 + 1 = 8" }
  ] },
  { "title": "SUBTRAI ➖ (menor antes)", "badge": "tira", "highlight": true, "rows": [
    { "label": "IV", "value": "5 − 1 = 4 — o I vem antes, tira" },
    { "label": "IX", "value": "10 − 1 = 9" },
    { "label": "XL", "value": "50 − 10 = 40" }
  ] }
]
```

Os **únicos** pares que subtraem são estes seis — vê e ouve! 🔊

```keyvalue
[
  { "k": "IV", "v": "5 − 1 = 4 ✌️✌️" },
  { "k": "IX", "v": "10 − 1 = 9" },
  { "k": "XL", "v": "50 − 10 = 40" },
  { "k": "XC", "v": "100 − 10 = 90" },
  { "k": "CD", "v": "500 − 100 = 400" },
  { "k": "CM", "v": "1000 − 100 = 900" }
]
```

> [!TIP] **Truque da boca aberta** 🐊 Olha para o par: se o número **pequeno
> aponta para o grande** (vem à frente), é como uma boca que **morde e tira**
> (subtrai). Se vem atrás, está **a juntar-se** (soma).

## Passo a passo — ler XIV 🔎

Vamos ler **XIV** juntinhos, devagarinho:

```steps
[
  { "title": "1. X", "body": "X vale 10 — começamos com dez 🔟", "icon": "🔟" },
  { "title": "2. IV", "body": "o I é menor e vem ANTES do V, por isso 5 − 1 = 4 ➖", "icon": "➖" },
  { "title": "3. Soma os blocos", "body": "10 + 4 = 14. XIV é catorze! 🎉", "icon": "🏆" }
]
```

```math
{ "expr": "XIV = 10 + (5 − 1) = 14", "say": "xis, i, vê: dez mais, cinco menos um, é igual a catorze" }
```

E o famoso **XIX**? É **10 + 9 = 19** (X mais IX). Repara que **não** se escreve
IXX! 😅

## O número gigante MCMLXXIV 🏰

Os filmes antigos mostram o ano em romanos no fim. **MCMLXXIV** parece difícil,
mas partimos em **blocos**:

```keyvalue
[
  { "k": "M", "v": "1000 🏰" },
  { "k": "CM", "v": "900 (1000 − 100)" },
  { "k": "L", "v": "50" },
  { "k": "XX", "v": "20 (10 + 10)" },
  { "k": "IV", "v": "4 (5 − 1)" },
  { "k": "Total", "v": "1000 + 900 + 50 + 20 + 4 = 1974 🎉" }
]
```

```math
{ "expr": "MCMLXXIV = 1000 + 900 + 50 + 20 + 4 = 1974", "say": "eme, cê eme, éle, xis xis, i vê: mil mais novecentos mais cinquenta mais vinte mais quatro é igual a mil novecentos e setenta e quatro" }
```

> [!TIP] **Para saberes mais** 🌱 Os romanos **não tinham o zero**! O zero só
> chegou à Europa muito mais tarde, vindo da Índia e da Arábia. Por isso é
> impossível escrever **0** em numerais romanos — não existe nenhuma letra para
> ele. 🤯

## Treina agora! 🎯

Vê o número romano e tenta adivinhar. Depois vira o cartão para confirmares! 🃏

```drill
{ "mode": "flip", "title": "Que número é este?", "items": [
  { "front": "VII", "back": "7", "say": "Vê é cinco, mais i mais i: sete." },
  { "front": "IX", "back": "9", "say": "I antes de X: dez menos um, nove." },
  { "front": "XII", "back": "12", "say": "Dez mais um mais um: doze." },
  { "front": "XIV", "back": "14", "say": "Dez mais quatro: catorze." },
  { "front": "XIX", "back": "19", "say": "Dez mais nove: dezanove." },
  { "front": "XL", "back": "40", "say": "X antes de éle: cinquenta menos dez, quarenta." },
  { "front": "XC", "back": "90", "say": "X antes de cê: cem menos dez, noventa." }
] }
```

Agora escolhe a resposta certa! 👇

```drill
{ "mode": "choose", "title": "Que número é XIV?", "choices": 3, "items": [
  { "front": "XIV", "back": "14", "options": ["16", "9"], "say": "Dez mais cinco menos um: catorze." },
  { "front": "IV", "back": "4", "options": ["6", "9"], "say": "I antes de Vê: cinco menos um, quatro." },
  { "front": "IX", "back": "9", "options": ["11", "4"], "say": "I antes de X: dez menos um, nove." },
  { "front": "XII", "back": "12", "options": ["7", "21"], "say": "Dez mais dois: doze." },
  { "front": "XIX", "back": "19", "options": ["11", "21"], "say": "Dez mais nove: dezanove." },
  { "front": "XL", "back": "40", "options": ["60", "15"], "say": "Cinquenta menos dez: quarenta." }
] }
```

Já consegues ler como um romano antigo? 🏛️✨ Toca outra vez nos altifalantes
sempre que quiseres ouvir!

```quiz
{ "id": "estudo-romanos-treino", "questions": [
  { "q": "Quanto vale a letra L?", "layout": "grid", "options": [
    { "t": "50", "correct": true },
    { "t": "5" },
    { "t": "500" }
  ], "explain": "L vale 50. Não confundas com V (5) nem com D (500)." },
  { "q": "Como se escreve o 4 em romanos?", "layout": "grid", "options": [
    { "t": "IV", "correct": true },
    { "t": "IIII" },
    { "t": "VI" }
  ], "explain": "O I vem ANTES do V, logo 5 − 1 = 4. Nunca se escreve IIII." },
  { "q": "Que número é XII?", "layout": "grid", "options": [
    { "t": "12", "correct": true },
    { "t": "14" },
    { "t": "21" }
  ], "explain": "X (10) mais I mais I (1 + 1) = 12." }
] }
```
