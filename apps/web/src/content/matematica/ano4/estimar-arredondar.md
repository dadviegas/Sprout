# Estimar e arredondar 🎯

> [!NOTE] **O que vais aprender** 👀 Vais aprender a dar respostas aproximadas bem rápidas e a aproximar números à dezena, à centena ou ao milhar mais próximo!

Imagina que estás no supermercado com o teu dinheiro e queres saber, num instante, se chega para tudo. Não precisas de fazer a conta certinha — basta *estimar*! Vamos descobrir este superpoder dos matemáticos. 🛒

## O que é estimar? 🔮

**Estimar** é dar uma resposta *aproximada* e rápida, sem fazer a conta exata. Serve para saber, num piscar de olhos, se um resultado faz sentido. Não é batota — é esperteza!

```keyvalue
[
  { "icon": "⚡", "k": "Ser rápido", "v": "respondes sem perder tempo com a conta" },
  { "icon": "🤔", "k": "Fazer sentido", "v": "vês se o resultado é mais ou menos certo" },
  { "icon": "🛒", "k": "No dia a dia", "v": "saber se o dinheiro chega para as compras" }
]
```

## O que é arredondar? 🎯

**Arredondar** é aproximar um número ao **10**, ao **100** ou ao **1000** mais próximo. Em vez de 47, dizemos 50; em vez de 234, dizemos 200. Mais fáceis de pensar!

```keyvalue
[
  { "icon": "🔟", "k": "À dezena", "v": "ao 10 mais próximo: 47 → 50" },
  { "icon": "💯", "k": "À centena", "v": "ao 100 mais próximo: 234 → 200" },
  { "icon": "🏔️", "k": "Ao milhar", "v": "ao 1000 mais próximo: 1750 → 2000" }
]
```

## A regra de ouro 🥇

Olha sempre para o **algarismo logo a seguir** à ordem a que estás a arredondar. Se for **0, 1, 2, 3 ou 4**, arredondas **para baixo**. Se for **5, 6, 7, 8 ou 9**, arredondas **para cima**!

```compare
[
  { "title": "Para baixo ⬇️", "rows": [
    { "label": "Algarismo seguinte", "value": "0, 1, 2, 3 ou 4" },
    { "label": "Exemplo", "value": "44 → 40" }
  ] },
  { "title": "Para cima ⬆️", "highlight": true, "rows": [
    { "label": "Algarismo seguinte", "value": "5, 6, 7, 8 ou 9" },
    { "label": "Exemplo", "value": "47 → 50" }
  ] }
]
```

## Estimar compras 🛍️

Imagina que vais comprar coisas que custam 19 €, 32 € e 48 €. Em vez de somar tudo certinho, arredondas cada preço à dezena e somas depressa para ver se chegam 100 €.

```stats
[
  { "label": "19 € fica", "value": "≈ 20 €" },
  { "label": "32 € fica", "value": "≈ 30 €" },
  { "label": "48 € fica", "value": "≈ 50 €" }
]
```

A estimativa dá 20 + 30 + 50 = 100 €. Assim sabes logo que é mesmo no limite — talvez precises de poupar num produto! 💡

## Um exemplo passo a passo 🔍

Vamos arredondar 234 à centena mais próxima.

```steps
[
  { "title": "Olha a ordem certa", "body": "Queremos arredondar à centena, por isso olhamos para o algarismo logo a seguir — o das dezenas." },
  { "title": "Vê esse algarismo", "body": "O algarismo a seguir às centenas é o 3 (em 234)." },
  { "title": "3 é menor que 5", "body": "Como 3 é menor que 5, arredondamos para baixo." },
  { "title": "Resultado", "body": "234 fica 200. Pronto, foi rápido!" }
]
```

> **Truque:** "5 ou mais, sobe; menos de 5, fica." Olha sempre só para o algarismo logo a seguir à ordem que estás a arredondar — esse é que manda!

> [!TIP] **Para saberes mais** 🌱 Arredondar para cima chama-se arredondamento por **excesso** e para baixo por **defeito**. E estimar é a forma mais rápida de verificar se a resposta de uma calculadora está mais ou menos certa — se o resultado for muito diferente da tua estimativa, carregaste numa tecla errada!

## Vamos praticar 🎈

```quiz
{
  "id": "mat4-estimar-pratica",
  "questions": [
    {
      "q": "O que é estimar?",
      "emoji": "🔮",
      "layout": "grid",
      "options": [
        { "t": "Dar uma resposta aproximada e rápida", "correct": true },
        { "t": "Fazer sempre a conta exata", "feedback": "Fazer a conta exata é o contrário de estimar — demora mais. Estimar é dar uma resposta aproximada e rápida.", "tag": "estimar-conceito" },
        { "t": "Apagar o número", "feedback": "Estimar não apaga nada! É só dar uma resposta aproximada, sem fazer a conta certinha.", "tag": "estimar-conceito" }
      ],
      "explain": "Estimar é dar uma resposta aproximada, sem fazer a conta certinha."
    },
    {
      "q": "Arredonda 47 à dezena mais próxima.",
      "emoji": "🔟",
      "layout": "grid",
      "options": [
        { "t": "50", "correct": true },
        { "t": "40", "feedback": "Arredondaste para baixo, mas o algarismo seguinte é 7 (5 ou mais), por isso SOBE. Fica 50, não 40.", "tag": "arredondar" },
        { "t": "47", "feedback": "47 é o número original — arredondar é aproximá-lo à dezena. Como o 7 é 5 ou mais, sobe para 50.", "tag": "arredondar" }
      ],
      "explain": "O algarismo a seguir é o 7 (5 ou mais), por isso sobe para 50."
    },
    {
      "q": "Na regra de ouro, o que fazes se o algarismo seguinte for 3?",
      "emoji": "⬇️",
      "layout": "grid",
      "options": [
        { "t": "Arredondas para baixo", "correct": true },
        { "t": "Arredondas para cima", "feedback": "Só sobes com 5 ou mais. O 3 é menor que 5, por isso arredondas para BAIXO.", "tag": "arredondar" },
        { "t": "Ficas igual para sempre", "feedback": "Arredondar muda o número para a dezena/centena mais perto. Com o 3 (menos de 5), arredondas para baixo.", "tag": "arredondar" }
      ],
      "explain": "3 é menor que 5, por isso arredondas para baixo."
    },
    {
      "q": "Arredonda 234 à centena mais próxima.",
      "emoji": "💯",
      "layout": "grid",
      "options": [
        { "t": "200", "correct": true },
        { "t": "300", "feedback": "300 seria arredondar para cima, mas o algarismo das dezenas é 3 (menos de 5), por isso fica 200.", "tag": "arredondar" },
        { "t": "240", "feedback": "240 é arredondar à dezena, não à centena. À centena olhas as dezenas (3, menos de 5) e fica 200.", "tag": "arredondar" }
      ],
      "explain": "O algarismo das dezenas é 3 (menos de 5), por isso fica 200."
    },
    {
      "q": "Arredonda 1750 ao milhar mais próximo.",
      "emoji": "🏔️",
      "layout": "grid",
      "options": [
        { "t": "2000", "correct": true },
        { "t": "1000", "feedback": "1000 seria arredondar para baixo, mas o algarismo das centenas é 7 (5 ou mais), por isso sobe para 2000.", "tag": "arredondar" },
        { "t": "1700", "feedback": "1700 é arredondar à centena, não ao milhar. Ao milhar olhas as centenas (7) e sobe para 2000.", "tag": "arredondar" }
      ],
      "explain": "O algarismo das centenas é 7 (5 ou mais), por isso sobe para 2000."
    },
    {
      "q": "Qual é o truque para arredondar?",
      "emoji": "🥇",
      "layout": "grid",
      "options": [
        { "t": "5 ou mais, sobe; menos de 5, fica", "correct": true },
        { "t": "Sobe sempre", "feedback": "Nem sempre se sobe! Com menos de 5 (0,1,2,3,4) arredondas para baixo. A regra é: 5 ou mais sobe, menos de 5 fica.", "tag": "arredondar" },
        { "t": "Fica sempre igual", "feedback": "Nem sempre fica igual: com 5 ou mais arredondas para cima. A regra é 5 ou mais sobe, menos de 5 fica.", "tag": "arredondar" }
      ],
      "explain": "Olhas para o algarismo seguinte: 5 ou mais sobe, menos de 5 fica."
    },
    {
      "q": "Para que serve estimar no supermercado?",
      "emoji": "🛒",
      "layout": "grid",
      "options": [
        { "t": "Ver depressa se o dinheiro chega", "correct": true },
        { "t": "Pagar a mais de propósito", "feedback": "Estimar não é pagar a mais — é o contrário! Serve para ver depressa se o dinheiro chega para tudo.", "tag": "estimar-conceito" },
        { "t": "Esconder o dinheiro", "feedback": "Estimar nada tem a ver com esconder dinheiro. Serve para saber rapidamente se o dinheiro chega.", "tag": "estimar-conceito" }
      ],
      "explain": "Estimar ajuda-te a saber rapidamente se o dinheiro chega."
    },
    {
      "q": "Arredonda 81 à dezena mais próxima.",
      "emoji": "🔟",
      "layout": "grid",
      "options": [
        { "t": "80", "correct": true },
        { "t": "90", "feedback": "90 seria subir, mas o algarismo seguinte é 1 (menos de 5), por isso fica 80.", "tag": "arredondar" },
        { "t": "100", "feedback": "100 é arredondar à centena, e demais. À dezena, 81 com o 1 (menos de 5) fica 80.", "tag": "arredondar" }
      ],
      "explain": "O algarismo seguinte é 1 (menos de 5), por isso fica 80."
    }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat4-estimar-final",
  "final": true,
  "title": "Estimar e arredondar",
  "questions": [
    {
      "q": "Estimar é dar uma resposta...",
      "emoji": "🔮",
      "layout": "grid",
      "options": [
        { "t": "Aproximada e rápida", "correct": true },
        { "t": "Sempre exata e lenta", "feedback": "Exata e lenta é a conta normal — o contrário de estimar. Estimar dá uma resposta aproximada e rápida.", "tag": "estimar-conceito" },
        { "t": "Errada de propósito", "feedback": "Estimar não é errar de propósito! É dar uma resposta aproximada que faz sentido, só que depressa.", "tag": "estimar-conceito" }
      ],
      "explain": "Estimar é dar uma resposta aproximada e rápida."
    },
    {
      "q": "Arredonda 62 à dezena mais próxima.",
      "emoji": "🔟",
      "layout": "grid",
      "options": [
        { "t": "60", "correct": true },
        { "t": "70", "feedback": "70 seria subir, mas o algarismo seguinte é 2 (menos de 5), por isso fica 60.", "tag": "arredondar" },
        { "t": "62", "feedback": "62 é o número original. Arredondar à dezena com o 2 (menos de 5) dá 60.", "tag": "arredondar" }
      ],
      "explain": "O algarismo seguinte é 2 (menos de 5), por isso fica 60."
    },
    {
      "q": "Arredonda 350 à centena mais próxima.",
      "emoji": "💯",
      "layout": "grid",
      "options": [
        { "t": "400", "correct": true },
        { "t": "300", "feedback": "300 seria arredondar para baixo, mas o algarismo das dezenas é 5 — e com 5 sobe-se. Fica 400.", "tag": "arredondar" },
        { "t": "350", "feedback": "350 é o número original. À centena olhas as dezenas (5) e, como é 5 ou mais, sobe para 400.", "tag": "arredondar" }
      ],
      "explain": "O algarismo das dezenas é 5, e 5 ou mais sobe: fica 400."
    },
    {
      "q": "Arredonda 2480 ao milhar mais próximo.",
      "emoji": "🏔️",
      "layout": "grid",
      "options": [
        { "t": "2000", "correct": true },
        { "t": "3000", "feedback": "3000 seria subir, mas o algarismo das centenas é 4 (menos de 5), por isso fica 2000.", "tag": "arredondar" },
        { "t": "2500", "feedback": "2500 é arredondar à centena, não ao milhar. Ao milhar olhas as centenas (4, menos de 5) e fica 2000.", "tag": "arredondar" }
      ],
      "explain": "O algarismo das centenas é 4 (menos de 5), por isso fica 2000."
    },
    {
      "q": "Se o algarismo seguinte for 8, arredondas...",
      "emoji": "⬆️",
      "layout": "grid",
      "options": [
        { "t": "Para cima", "correct": true },
        { "t": "Para baixo", "feedback": "Só vais para baixo com menos de 5. O 8 é 5 ou mais, por isso arredondas para CIMA.", "tag": "arredondar" },
        { "t": "Não arredondas", "feedback": "Com 8 arredondas sim — e para cima, porque é 5 ou mais.", "tag": "arredondar" }
      ],
      "explain": "8 é 5 ou mais, por isso arredondas para cima."
    },
    {
      "q": "Arredondar para cima também se chama arredondamento por...",
      "emoji": "🌱",
      "layout": "grid",
      "options": [
        { "t": "Excesso", "correct": true },
        { "t": "Defeito", "feedback": "Trocaste: por defeito é arredondar para BAIXO. Para cima é por excesso.", "tag": "arredondar" },
        { "t": "Engano", "feedback": "«Engano» não é um nome de arredondamento. Para cima é por excesso, para baixo por defeito.", "tag": "arredondar" }
      ],
      "explain": "Para cima é por excesso; para baixo é por defeito."
    },
    {
      "q": "Estimando 19 € + 32 € + 48 € à dezena, quanto dá mais ou menos?",
      "emoji": "🛍️",
      "layout": "grid",
      "options": [
        { "t": "Cerca de 100 €", "correct": true },
        { "t": "Cerca de 50 €", "feedback": "50 € é pouco — só o 48 já fica perto disso. Arredonda cada um: 20 + 30 + 50 = cerca de 100 €.", "tag": "estimar-valor" },
        { "t": "Cerca de 300 €", "feedback": "300 € é demais — três vezes a mais. Arredondando à dezena: 20 + 30 + 50 = cerca de 100 €.", "tag": "estimar-valor" }
      ],
      "explain": "20 + 30 + 50 = 100 €, uma boa estimativa."
    },
    {
      "q": "Para que serve estimar quando usas a calculadora?",
      "emoji": "🔢",
      "layout": "grid",
      "options": [
        { "t": "Ver se a resposta está mais ou menos certa", "correct": true },
        { "t": "Estragar a calculadora", "feedback": "Estimar não estraga nada! Serve para veres se a resposta da calculadora está mais ou menos certa.", "tag": "estimar-conceito" },
        { "t": "Mudar os números todos", "feedback": "Estimar não muda os números da conta — é só uma verificação rápida para ver se o resultado faz sentido.", "tag": "estimar-conceito" }
      ],
      "explain": "A estimativa ajuda-te a verificar se a calculadora deu um resultado razoável."
    }
  ]
}
```

Boa! Agora já estimas e arredondas como um verdadeiro matemático esperto! 🎉
