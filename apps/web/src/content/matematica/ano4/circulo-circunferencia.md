# O círculo e a circunferência ⭕

> [!NOTE] **O que vais aprender** 👀 A diferença entre a **circunferência** (a linha à volta) e o **círculo** (a roda cheia), as três palavras mágicas — **centro**, **raio** e **diâmetro** — e como desenhar circunferências perfeitas com um **compasso**. 🧭

Rodas, moedas, relógios, pizzas, a Lua cheia… 🌕 As formas redondas estão por todo o lado! Mas sabias que a **linha** à volta e a **roda cheia** têm nomes diferentes? E que há um instrumento com uma ponta espetada que desenha círculos perfeitos? Pega no lápis, vamos dar voltas! 😄

## Circunferência ou círculo? 🍩

Cuidado, não são a mesma coisa — e esta pergunta adora aparecer nas fichas!

- A **circunferência** é só a **linha curva** à volta — a borda.
- O **círculo** é **tudo o que está lá dentro**, a região cheia (com a borda incluída).

```compare
[
  { "title": "Circunferência ⭕", "rows": [
    { "label": "O que é", "value": "só a linha à volta (a borda)" },
    { "label": "Imagina", "value": "um aro, um anel, um arco de ginástica 💍" }
  ] },
  { "title": "Círculo 🔵", "highlight": true, "rows": [
    { "label": "O que é", "value": "a roda toda cheia, por dentro", "highlight": true },
    { "label": "Imagina", "value": "uma moeda, uma bolacha, uma pizza inteira 🍕", "highlight": true }
  ] }
]
```

> O anel é uma **circunferência**; a moeda é um **círculo**. A borda da pizza é a circunferência; a pizza toda é o círculo. 🍕

## Centro, raio e diâmetro 🎯

Toda a forma redonda tem três medidas amigas:

```keyvalue
[
  { "k": "Centro", "v": "o ponto mesmo no meio — todos os pontos da borda estão à MESMA distância dele 🎯" },
  { "k": "Raio", "v": "do centro até à borda — como um raio da roda da bicicleta 🚲" },
  { "k": "Diâmetro", "v": "de borda a borda, a passar pelo CENTRO — atravessa a figura toda 🚪" },
  { "k": "A regra de ouro", "v": "o diâmetro é o DOBRO do raio! ✌️" }
]
```

```math
{ "expr": "d = 2 × r", "say": "o diâmetro é igual a duas vezes o raio" }
```

> Se o raio de uma pizza é **10 cm**, o diâmetro é **20 cm**. E ao contrário: um prato com **24 cm** de diâmetro tem **12 cm** de raio — é só fazer metade! 🍕

## O compasso: a máquina de círculos 🧭

O **compasso** tem duas pernas: uma com um **bico** (espeta-se no papel) e outra com um **lápis**. O segredo: o bico marca o **centro**, e a abertura das pernas é o **raio**!

```steps
[
  { "title": "1. Espeta o bico", "body": "escolhe o centro e espeta a ponta com cuidado 📍", "icon": "📍" },
  { "title": "2. Abre as pernas", "body": "abre o compasso com a medida do RAIO (vê na régua) 📏", "icon": "📏" },
  { "title": "3. Roda!", "body": "gira o lápis à volta, sem mudar a abertura 🔄", "icon": "🔄" },
  { "title": "4. Perfeito!", "body": "uma circunferência certinha — todos os pontos à mesma distância do centro 🎉", "icon": "🎉" }
]
```

> [!WARNING] No compasso marcas o **raio**, não o diâmetro! Se queres uma circunferência com **10 cm de diâmetro**, abres o compasso só **5 cm**. É a armadilha clássica! 🚫

## Redondos à tua volta 🔭

```stats
[
  { "label": "Roda da bicicleta", "value": "circunferência", "hint": "o aro é a linha 🚲" },
  { "label": "Moeda de 1 €", "value": "círculo", "hint": "cheia por dentro 🪙" },
  { "label": "Relógio da sala", "value": "círculo", "hint": "o mostrador todo 🕐" },
  { "label": "Arco de ginástica", "value": "circunferência", "hint": "só a linha! 🤸" }
]
```

## Um exemplo passo a passo 🔍

*«A Rita quer desenhar um círculo com **8 cm de diâmetro** para fazer um relógio de papel. Quanto deve abrir o compasso?»* 🕐

```steps
[
  { "title": "1. O que sabemos?", "body": "o diâmetro é 8 cm; o compasso marca o RAIO 🔍", "icon": "🧐" },
  { "title": "2. Lembra a regra", "body": "o raio é METADE do diâmetro", "icon": "✂️" },
  { "title": "3. Calcula", "body": "8 ÷ 2 = 4", "icon": "✏️" },
  { "title": "4. Responde", "body": "abre o compasso 4 cm! ✅", "icon": "🎉" }
]
```

> **Truque:** para nunca trocares as palavras: **circunferência** é uma palavra **comprida e fininha** — é a **linha**; **círculo** é uma palavra **curta e cheia** — é a roda **cheia**. E o **diâmetro** tem de passar **sempre pelo centro** — se não passa, não é diâmetro, é só uma corda! 🪢

> [!TIP] **Para saberes mais** 🌱 Se medires a volta de **qualquer** circunferência (com um cordel!) e dividires pelo diâmetro, dá sempre o **mesmo número misterioso**: 3,14… — chama-se **π (pi)** e tem casas decimais infinitas! Vais usá-lo no 6.º ano para calcular o contorno e a área de qualquer círculo do universo. 🥧

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-circulo-pratica",
  "questions": [
    { "q": "A linha curva à volta chama-se…", "layout": "grid",
      "options": [ { "t": "circunferência", "emoji": "⭕", "correct": true }, { "t": "círculo", "emoji": "🔵", "feedback": "O círculo é a roda toda cheia, por dentro. Só a linha à volta (a borda) é a circunferência.", "tag": "circulo-vs-circunferencia" }, { "t": "quadrado", "feedback": "O quadrado tem 4 lados direitos. A linha curva à volta de uma forma redonda é a circunferência.", "tag": "circulo-vs-circunferencia" } ],
      "explain": "A circunferência é só a borda — a linha." },
    { "q": "A roda toda cheia, por dentro, chama-se…", "layout": "grid",
      "options": [ { "t": "círculo", "emoji": "🔵", "correct": true }, { "t": "circunferência", "emoji": "⭕", "feedback": "A circunferência é só a linha à volta (a borda). A roda toda cheia, por dentro, é o círculo.", "tag": "circulo-vs-circunferencia" } ],
      "explain": "O círculo é a região cheia lá dentro." },
    { "q": "Do centro até à borda vai o…", "layout": "grid",
      "options": [ { "t": "raio", "emoji": "🚲", "correct": true }, { "t": "diâmetro", "feedback": "O diâmetro vai de borda a borda, a passar pelo centro — é o dobro. Do centro só até à borda vai o raio.", "tag": "circulo-raio-diametro" }, { "t": "perímetro", "feedback": "O perímetro é a volta toda da figura, não uma linha do centro à borda. Do centro à borda vai o raio.", "tag": "circulo-raio-diametro" } ],
      "explain": "O raio liga o centro a um ponto da borda." },
    { "q": "De borda a borda, a passar pelo centro, vai o…", "layout": "grid",
      "options": [ { "t": "diâmetro", "emoji": "🚪", "correct": true }, { "t": "raio", "feedback": "O raio vai só do centro até à borda — é metade. De borda a borda, pelo centro, vai o diâmetro.", "tag": "circulo-raio-diametro" }, { "t": "vértice", "feedback": "Vértice é um canto, e os círculos não têm cantos. A linha de borda a borda pelo centro é o diâmetro.", "tag": "circulo-raio-diametro" } ],
      "explain": "O diâmetro atravessa a figura toda pelo centro." },
    { "q": "O raio é 5 cm. O diâmetro é…", "layout": "grid",
      "options": [ { "t": "10 cm", "correct": true }, { "t": "5 cm", "feedback": "5 cm é o raio. O diâmetro é o DOBRO: 2 × 5 = 10 cm.", "tag": "circulo-raio-diametro" }, { "t": "2,5 cm", "feedback": "2,5 cm seria METADE do raio. O diâmetro é o dobro do raio: 2 × 5 = 10 cm.", "tag": "circulo-raio-diametro" } ],
      "explain": "d = 2 × r = 2 × 5 = 10 cm." },
    { "q": "No compasso, o bico espetado marca…", "layout": "grid",
      "options": [ { "t": "o centro", "emoji": "📍", "correct": true }, { "t": "a borda", "feedback": "A borda é desenhada pelo lápis, que roda à volta. O bico fica fixo no centro.", "tag": "circulo-compasso" }, { "t": "o diâmetro", "feedback": "O diâmetro é uma medida, não um ponto onde espetar. O bico do compasso marca o centro.", "tag": "circulo-compasso" } ],
      "explain": "O bico fica fixo no centro; o lápis roda à volta." },
    { "q": "A abertura do compasso é igual…", "layout": "grid",
      "options": [ { "t": "ao raio", "emoji": "📏", "correct": true }, { "t": "ao diâmetro", "feedback": "Cuidado, é a armadilha clássica! No compasso marcas o RAIO, não o diâmetro. Para 10 cm de diâmetro, abres só 5 cm.", "tag": "circulo-compasso" }, { "t": "à volta toda", "feedback": "A volta toda é a circunferência inteira. A abertura do compasso é só o raio.", "tag": "circulo-compasso" } ],
      "explain": "Abres o compasso com a medida do raio." },
    { "q": "Um anel é um bom exemplo de…", "layout": "grid",
      "options": [ { "t": "circunferência", "emoji": "💍", "correct": true }, { "t": "círculo", "emoji": "🪙", "feedback": "O círculo é cheio por dentro, como uma moeda. O anel é só a linha à volta — é uma circunferência.", "tag": "circulo-vs-circunferencia" } ],
      "explain": "O anel é só a linha — não é cheio por dentro." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-circulo-final",
  "final": true,
  "title": "O círculo e a circunferência",
  "questions": [
    { "q": "A borda da pizza é a ________; a pizza toda é o ________.", "layout": "list",
      "options": [ { "t": "circunferência … círculo", "emoji": "🍕", "correct": true }, { "t": "círculo … circunferência", "feedback": "Está ao contrário: a LINHA da borda é a circunferência; a pizza toda cheia é o círculo.", "tag": "circulo-vs-circunferencia" } ],
      "explain": "A linha é a circunferência; a região cheia é o círculo." },
    { "q": "Todos os pontos da circunferência estão à mesma distância…", "layout": "grid",
      "options": [ { "t": "do centro", "emoji": "🎯", "correct": true }, { "t": "uns dos outros", "feedback": "Os pontos da borda não estão todos à mesma distância uns dos outros. O que é igual é a distância de cada um ao centro.", "tag": "circulo-raio-diametro" }, { "t": "do canto", "feedback": "Um círculo não tem cantos! Todos os pontos da circunferência estão à mesma distância do centro.", "tag": "circulo-raio-diametro" } ],
      "explain": "É isso que a torna perfeitamente redonda!" },
    { "q": "O diâmetro é sempre…", "layout": "grid",
      "options": [ { "t": "o dobro do raio", "emoji": "✌️", "correct": true }, { "t": "metade do raio", "feedback": "Está trocado: o RAIO é metade do diâmetro. O diâmetro é o DOBRO do raio (d = 2 × r).", "tag": "circulo-raio-diametro" }, { "t": "igual ao raio", "feedback": "O diâmetro atravessa a figura toda; o raio vai só até ao centro. O diâmetro é o dobro do raio.", "tag": "circulo-raio-diametro" } ],
      "explain": "d = 2 × r." },
    { "q": "O diâmetro de um prato é 24 cm. O raio é…", "layout": "grid",
      "options": [ { "t": "12 cm", "correct": true }, { "t": "48 cm", "feedback": "48 cm é o DOBRO de 24 — duplicaste em vez de fazer metade. O raio é metade do diâmetro: 24 ÷ 2 = 12 cm.", "tag": "circulo-raio-diametro" }, { "t": "24 cm", "feedback": "24 cm é o diâmetro inteiro. O raio é metade disso: 24 ÷ 2 = 12 cm.", "tag": "circulo-raio-diametro" } ],
      "explain": "O raio é metade: 24 ÷ 2 = 12 cm." },
    { "q": "O raio de uma roda é 30 cm. O diâmetro é…", "layout": "grid",
      "options": [ { "t": "60 cm", "emoji": "🚲", "correct": true }, { "t": "15 cm", "feedback": "15 cm é metade de 30 — fizeste o contrário. O diâmetro é o DOBRO do raio: 2 × 30 = 60 cm.", "tag": "circulo-raio-diametro" }, { "t": "30 cm", "feedback": "30 cm é o raio. O diâmetro é o dobro: 2 × 30 = 60 cm.", "tag": "circulo-raio-diametro" } ],
      "explain": "2 × 30 = 60 cm." },
    { "q": "Para desenhar uma circunferência de 10 cm de diâmetro, abres o compasso…", "layout": "grid",
      "options": [ { "t": "5 cm", "emoji": "🧭", "correct": true }, { "t": "10 cm", "feedback": "É a armadilha clássica! O compasso marca o RAIO, não o diâmetro. Para 10 cm de diâmetro, abres metade: 5 cm.", "tag": "circulo-compasso" }, { "t": "20 cm", "feedback": "20 cm seria o dobro do diâmetro. O compasso marca o raio, que é metade do diâmetro: 10 ÷ 2 = 5 cm.", "tag": "circulo-compasso" } ],
      "explain": "O compasso marca o raio: 10 ÷ 2 = 5 cm. A armadilha clássica!" },
    { "q": "Uma linha de borda a borda que NÃO passa pelo centro…", "layout": "list",
      "options": [ { "t": "não é um diâmetro", "emoji": "🪢", "correct": true }, { "t": "é um diâmetro na mesma", "feedback": "Não: o diâmetro TEM de passar pelo centro. Se não passa, é só uma corda.", "tag": "circulo-raio-diametro" }, { "t": "é um raio", "feedback": "O raio vai do centro até à borda (uma só ponta). Uma linha de borda a borda sem passar pelo centro não é diâmetro nem raio — é uma corda.", "tag": "circulo-raio-diametro" } ],
      "explain": "O diâmetro tem de passar pelo centro — senão é só uma corda." },
    { "q": "Qual é o instrumento que desenha circunferências perfeitas?", "layout": "grid",
      "options": [ { "t": "o compasso", "emoji": "🧭", "correct": true }, { "t": "a régua", "emoji": "📏", "feedback": "A régua faz linhas direitas, não curvas. Quem desenha circunferências perfeitas é o compasso.", "tag": "circulo-compasso" }, { "t": "a borracha", "feedback": "A borracha apaga, não desenha. O instrumento que faz circunferências perfeitas é o compasso.", "tag": "circulo-compasso" } ],
      "explain": "Bico no centro, lápis a rodar — círculos perfeitos!" }
  ]
}
```
