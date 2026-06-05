# Contas armadas — passo a passo ➕➖✖️➗

> [!NOTE] **O que vais aprender** 👀 Vais aprender a **armar uma conta** (pôr os algarismos uns por baixo dos outros) e a resolvê-la **passo a passo**: somar, subtrair, multiplicar e dividir — e até com **números decimais**! No fim, há uma zona para **treinares com as tuas próprias contas**. 🚀

Já sabes fazer contas de cabeça, mas quando os números são grandes a melhor amiga é a **conta armada**: arrumamos os algarismos em colunas certinhas e resolvemos um bocadinho de cada vez. Carrega no **+** dentro de cada conta para a veres montar-se sozinha, e no 🔊 para a ouvires explicada. Vem daí! ✨

```summary
{
  "learn": [
    "Armar a conta: alinhar os algarismos pela direita (e as vírgulas, nos decimais)",
    "Somar e subtrair coluna a coluna, com transporte e empréstimo",
    "Multiplicar por parcelas e dividir com o algoritmo da divisão",
    "Resolver cada conta passo a passo e conferir o resultado"
  ],
  "examples": ["248 + 176", "503 − 247", "34 × 26", "156 : 4", "12,5 + 3,75"],
  "say": "Vais aprender a armar contas e a resolvê-las passo a passo: somas, subtrações, multiplicações, divisões e até com números decimais."
}
```

## A regra de ouro: alinhar pela direita 📐

Numa conta armada, cada algarismo tem o seu lugar: as **unidades** debaixo das unidades, as **dezenas** debaixo das dezenas… Por isso **encostamos tudo à direita**. Nos números com vírgula, alinhamos é a **vírgula** — fica tudo no sítio certo.

```keyvalue
[
  { "k": "Armar a conta", "v": "pôr os números uns debaixo dos outros, alinhados à direita 📐", "icon": "grid" },
  { "k": "Transporte (o «vai 1»)", "v": "quando uma coluna passa de 9, levamos 1 para a coluna seguinte ➡️", "icon": "plus" },
  { "k": "Empréstimo", "v": "quando não dá para tirar, pedimos 10 emprestado à casa ao lado 🤝", "icon": "minus" },
  { "k": "Da direita para a esquerda", "v": "começamos sempre na coluna das unidades 👉", "icon": "back" }
]
```

## Somar e subtrair ➕➖

Repara como a soma da direita «transporta» 1 para a coluna seguinte, e como na subtração a casa pede **10 emprestado** ao vizinho. Carrega no **+** para avançares passo a passo.

```contaarmada
{
  "practice": false,
  "examples": [
    { "op": "add", "a": 248, "b": 176 },
    { "op": "sub", "a": 503, "b": 247 }
  ]
}
```

## Multiplicar e dividir ✖️➗

Na **multiplicação** fazemos uma parcela por cada algarismo e depois somamos tudo. Na **divisão** usamos o algoritmo da divisão (o divisor fica à direita da barra e o quociente por baixo).

```contaarmada
{
  "practice": false,
  "examples": [
    { "op": "mul", "a": 34, "b": 26 },
    { "op": "div", "a": 156, "b": 4 }
  ]
}
```

## O truque dos decimais 🔢

Com vírgulas é igualzinho — só tens de a manter **alinhada**. Na soma e na subtração, alinhas as vírgulas (e podes acrescentar zeros para as casas ficarem iguais). Na multiplicação, fazes a conta **sem** vírgulas e, no fim, **contas as casas decimais**.

> [!TIP] **Acrescenta zeros sem medo!** 0,5 é o mesmo que 0,50. Acrescentar zeros à direita da vírgula **não muda o valor** — só ajuda a alinhar. 🪄

```contaarmada
{
  "practice": false,
  "examples": [
    { "op": "add", "a": "12.5", "b": "3.75" },
    { "op": "mul", "a": "1.5", "b": "1.2" }
  ]
}
```

## Vamos resolver juntos 🧠

Vê esta a montar-se: **365 + 248**. Vai dizendo em voz alta o que acontece em cada coluna antes de carregares no **+**.

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "add", "a": 365, "b": 248 } ]
}
```

1. **Unidades:** 5 + 8 = **13** → escrevo o 3 e **transporto 1**. ✍️
2. **Dezenas:** 6 + 4, mais o 1 que transportei, = **11** → escrevo o 1 e transporto 1.
3. **Centenas:** 3 + 2, mais o 1, = **6**.
4. Resultado: **613**. 🎉

> **Para saberes mais 🌱** Sabias que o sinal de mais (**+**) e o de menos (**−**) só começaram a aparecer nos livros há cerca de **500 anos**? Antes disso, as pessoas escreviam as contas por palavras, como «três mais dois»! Os símbolos vieram para poupar tempo e espaço. ⏳

## Agora treinas tu! ✏️

Esta é a tua zona de treino. **Escolhe a operação**, escreve os **teus números** e carrega em **«Armar a conta»**. Tenta descobrir o resultado, escreve-o e clica em **«Verificar»** — se errares, segue os passos para perceberes porquê. Bom trabalho! 💪

```contaarmada
{
  "title": "A tua zona de treino"
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat4-contas-armadas-final",
  "final": true,
  "title": "Contas armadas",
  "questions": [
    { "q": "Numa conta armada, alinhamos os algarismos…", "layout": "grid",
      "options": [ { "t": "pela direita", "emoji": "📐", "correct": true }, { "t": "pela esquerda" }, { "t": "pelo meio" } ],
      "explain": "Encostamos tudo à direita: unidades debaixo de unidades." },
    { "q": "Por que coluna começamos a somar?", "layout": "grid",
      "options": [ { "t": "pelas unidades (à direita)", "emoji": "👉", "correct": true }, { "t": "pelas centenas" }, { "t": "por qualquer uma" } ],
      "explain": "Começamos sempre na coluna das unidades, à direita." },
    { "q": "Na soma, 7 + 5 = 12. O que faço?", "layout": "grid",
      "options": [ { "t": "escrevo o 2 e transporto o 1", "emoji": "➡️", "correct": true }, { "t": "escrevo o 12 todo" }, { "t": "escrevo só o 1" } ],
      "explain": "Escrevo as unidades (2) e levo a dezena (1) para a coluna seguinte." },
    { "q": "Numa subtração, quando o número de cima é mais pequeno…", "layout": "grid",
      "options": [ { "t": "peço 10 emprestado à casa ao lado", "emoji": "🤝", "correct": true }, { "t": "troco os números" }, { "t": "deixo em branco" } ],
      "explain": "Pedimos 10 emprestado à casa à esquerda (o empréstimo)." },
    { "q": "Para somar 2,5 + 1,75 tenho de…", "layout": "grid",
      "options": [ { "t": "alinhar as vírgulas uma debaixo da outra", "emoji": "📐", "correct": true }, { "t": "apagar as vírgulas" }, { "t": "somar ao calhas" } ],
      "explain": "Alinhamos as vírgulas; podemos acrescentar um zero (2,50)." },
    { "q": "Quanto é 248 + 176?", "layout": "grid",
      "options": [ { "t": "424", "emoji": "🎉", "correct": true }, { "t": "324" }, { "t": "414" } ],
      "explain": "8+6=14 (vai 1), 4+7+1=12 (vai 1), 2+1+1=4 → 424." },
    { "q": "Na multiplicação 34 × 26, o resultado é…", "layout": "grid",
      "options": [ { "t": "884", "emoji": "✖️", "correct": true }, { "t": "204" }, { "t": "680" } ],
      "explain": "204 (34×6) + 680 (34×20) = 884." },
    { "q": "Em 156 : 4, o divisor escreve-se…", "layout": "grid",
      "options": [ { "t": "à direita da barra", "emoji": "➗", "correct": true }, { "t": "por baixo do dividendo" }, { "t": "à esquerda" } ],
      "explain": "No algoritmo da divisão, o divisor fica à direita e o quociente por baixo." },
    { "q": "Quanto é 156 : 4?", "layout": "grid",
      "options": [ { "t": "39", "emoji": "🏆", "correct": true }, { "t": "44" }, { "t": "36" } ],
      "explain": "15 dividido por 4 dá 3 (sobra 3); 36 dividido por 4 dá 9 → 39." }
  ]
}
```
