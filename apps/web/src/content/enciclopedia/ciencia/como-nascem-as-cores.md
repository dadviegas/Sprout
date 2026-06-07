# Como nascem as cores? 🎨

> [!NOTE] **O que vais aprender** 👀 Vais descobrir um segredo do teu ecrã: todas
> as cores nascem de **três luzinhas** — **Vermelho, Verde e Azul**. E vais ver
> que há **mais de 16 milhões** de cores, mas só algumas têm nome! 🤯

Olha bem para o ecrã do tablet. Parece cheio de cores... mas por dentro só tem
**três cores de luz**: **vermelho**, **verde** e **azul**. Misturando-as em
quantidades diferentes, nascem todas as outras! A isto chama-se **RGB** (do
inglês *Red, Green, Blue*). 💡

## Faz tu a tua cor! 🎚️

Mexe nos três botões e vê a cor a mudar. Cada um vai de **0** (luz apagada) até
**255** (luz no máximo). Carrega no altifalante para ouvir o código da cor.

```colormix
{ "title": "Mistura vermelho, verde e azul", "r": 90, "g": 180, "b": 220 }
```

## Onde está o "256"? 🔢

Cada luzinha tem **256 níveis** (de 0 a 255). Como são **três** luzinhas:

```math
{ "expr": "256 × 256 × 256 = 16 777 216", "say": "256 vezes 256 vezes 256 é igual a 16 milhões 777 mil 216" }
```

São mais de **16 milhões** de cores diferentes! Por isso é impossível dar um nome
a cada uma. 😅

## Então quais é que têm nome? 🏷️

```keyvalue
[
  { "k": "Têm nome 🏷️", "v": "só algumas centenas — vermelho, turquesa, esmeralda, lilás… (vê a coleção «As Cores»!)" },
  { "k": "Não têm nome 🔢", "v": "os outros 16 milhões só têm um código, o HEX, como #3AC0A0" },
  { "k": "O código HEX 🧪", "v": "é uma etiqueta curtinha que diz quanto há de cada luz (R, G, B)" }
]
```

## Cores de luz vs. cores de tinta 🖍️

```compare
[
  { "title": "Luz (ecrã) 💡", "rows": [
    { "label": "Mistura", "value": "Vermelho + Verde + Azul (RGB)" },
    { "label": "Tudo junto dá", "value": "branco ⚪", "highlight": true }
  ] },
  { "title": "Tinta (pintar) 🎨", "rows": [
    { "label": "Mistura", "value": "as tintas no papel" },
    { "label": "Tudo junto dá", "value": "castanho/preto ⚫", "highlight": true }
  ] }
]
```

> **Truque:** no ecrã, **quanto mais luz, mais claro** fica (tudo a 255 = branco).
> Com tintas é ao contrário: quanto mais misturas, mais escuro fica! 🖍️

> [!TIP] **Para saberes mais** 🌱 Os teus olhos também funcionam com **três**
> tipos de "sensores" de cor: um para o vermelho, um para o verde e um para o
> azul. O cérebro junta os três e... vês todas as cores do arco-íris! 👁️🌈

## Vamos praticar 🎈

```quiz
{
  "id": "enc-ciencia-cores-pratica",
  "questions": [
    { "q": "Que três cores de luz fazem todas as outras?", "layout": "grid",
      "options": [ { "t": "vermelho, verde e azul", "emoji": "🔴🟢🔵", "correct": true }, { "t": "preto, branco e cinzento", "emoji": "⚫" } ],
      "explain": "Vermelho, Verde e Azul — o RGB!" },
    { "q": "Cada luzinha vai de 0 até...", "layout": "grid",
      "options": [ { "t": "255", "emoji": "🔢", "correct": true }, { "t": "10" }, { "t": "1000" } ],
      "explain": "De 0 a 255 — são 256 níveis." },
    { "q": "Têm todas as cores um nome?", "layout": "grid",
      "options": [ { "t": "não, são 16 milhões!", "emoji": "🤯", "correct": true }, { "t": "sim, todas", "emoji": "✅" } ],
      "explain": "Só algumas centenas têm nome; as outras só têm código HEX." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "enc-ciencia-cores-final",
  "final": true,
  "title": "Como nascem as cores?",
  "questions": [
    { "q": "O que quer dizer RGB?", "layout": "grid",
      "options": [ { "t": "Vermelho, Verde e Azul", "emoji": "🔴🟢🔵", "correct": true }, { "t": "três tipos de gelado", "emoji": "🍦" } ],
      "explain": "RGB = Red, Green, Blue — vermelho, verde e azul." },
    { "q": "Quantas cores pode fazer um ecrã?", "layout": "grid",
      "options": [ { "t": "mais de 16 milhões", "emoji": "🤯", "correct": true }, { "t": "só 8", "emoji": "🎨" } ],
      "explain": "256 × 256 × 256 = 16 777 216 cores." },
    { "q": "No ecrã, juntar muita luz vermelha, verde e azul dá...", "layout": "grid",
      "options": [ { "t": "branco", "emoji": "⚪", "correct": true }, { "t": "preto", "emoji": "⚫" } ],
      "explain": "Com luz, tudo no máximo dá branco. Com tintas seria o contrário." },
    { "q": "O código curtinho de uma cor (ex.: #3AC0A0) chama-se...", "layout": "grid",
      "options": [ { "t": "HEX", "emoji": "🧪", "correct": true }, { "t": "PIN", "emoji": "🔒" } ],
      "explain": "Chama-se código HEX — diz quanto há de cada luz." },
    { "q": "Os teus olhos veem a cor com sensores para...", "layout": "grid",
      "options": [ { "t": "vermelho, verde e azul", "emoji": "👁️", "correct": true }, { "t": "doce, salgado e azedo", "emoji": "👅" } ],
      "explain": "Tens três tipos de sensores de cor — tal como o ecrã!" }
  ]
}
```
