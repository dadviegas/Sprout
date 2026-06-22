# Circunferência e círculo ⭕

> [!NOTE] **O que vais aprender** 👀 A diferença entre **circunferência** (a linha) e **círculo** (a roda cheia), o que são **raio**, **diâmetro** e **perímetro**, e o número mais famoso da matemática: o **π (pi)**! Vais aprender a calcular o **comprimento** de uma circunferência e a **área** de um círculo. 🎯🍕

Olha à tua volta: rodas, pizzas, relógios, moedas, a Lua… o **círculo** está em todo o lado! É a forma mais perfeita que existe — todos os pontos da borda estão à **mesma distância** do centro. E esconde um segredo mágico, um número que nunca acaba, chamado **π**. Vamos desvendá-lo! 🔍

## Circunferência ou círculo? ⭕

Cuidado, não são a mesma coisa! A **circunferência** é só a **linha** à volta (a borda). O **círculo** é a **região cheia** lá dentro. A circunferência é o aro; o círculo é o prato. 🍽️

```compare
[
  { "title": "Circunferência ⭕", "rows": [
    { "label": "O que é", "value": "a linha curva à volta (a borda)" },
    { "label": "Imagina", "value": "um aro, um anel, a corda à roda" }
  ] },
  { "title": "Círculo 🔵", "highlight": true, "rows": [
    { "label": "O que é", "value": "toda a superfície lá dentro", "highlight": true },
    { "label": "Imagina", "value": "uma moeda, uma pizza inteira", "highlight": true }
  ] }
]
```

## As partes: raio, diâmetro e centro 🎯

```keyvalue
[
  { "k": "Centro", "v": "o ponto do meio, à mesma distância de toda a borda 🎯" },
  { "k": "Raio (r)", "v": "do centro até à borda — a «meia travessia» 📏" },
  { "k": "Diâmetro (d)", "v": "atravessa de borda a borda passando pelo centro 🚪" },
  { "k": "Regra de ouro", "v": "o diâmetro é o DOBRO do raio: d = 2 × r ✌️" }
]
```

```math
{ "expr": "d = 2 × r", "say": "o diâmetro é igual a dois vezes o raio" }
```

> **Truque:** o **raio** é metade do **diâmetro**. Se atravessas a pizza ao meio (diâmetro) e dobras essa fatia ao meio, tens o raio! Raio = caminho do **centro até à beira**; diâmetro = de **beira a beira**. 🍕

## O número mágico: π (pi) 🥧

Aqui está o segredo! Se medires o **contorno** de qualquer circunferência e dividires pelo **diâmetro**, dá **sempre o mesmo número**, em qualquer círculo do universo: aproximadamente **3,14**. A esse número chamamos **π (pi)**.

```stats
[
  { "label": "π", "value": "≈ 3,14", "hint": "para as contas" },
  { "label": "Contorno ÷ diâmetro", "value": "= π", "hint": "sempre!" },
  { "label": "Roda pequena", "value": "≈ 3,14", "hint": "mesma razão" },
  { "label": "Roda gigante", "value": "≈ 3,14", "hint": "mesma razão" }
]
```

> [!WARNING] **π não é certinho!** É um número que tem **infinitos** algarismos e nunca se repete: 3,14159265… Por isso, nas contas, usamos o **arredondamento 3,14** (ou às vezes a fração 22/7). Mais que isto, só os computadores precisam! 🤯

## Comprimento da circunferência (o contorno) 📏

Como o contorno ÷ diâmetro = π, então o **contorno = π × diâmetro**. É o «perímetro» do círculo!

```math
{ "expr": "P = π × d = 2 × π × r", "say": "o comprimento da circunferência é pi vezes o diâmetro, que é o mesmo que dois vezes pi vezes o raio" }
```

```steps
[
  { "title": "Roda de raio 10 cm", "body": "queres o contorno (quanto anda numa volta)", "icon": "🎡" },
  { "title": "Diâmetro", "body": "d = 2 × 10 = 20 cm", "icon": "🚪" },
  { "title": "Multiplica por π", "body": "P = 3,14 × 20 = 62,8 cm", "icon": "✖️" },
  { "title": "Resposta", "body": "a roda anda ≈ 62,8 cm em cada volta! 🎉", "icon": "🎉" }
]
```

## Área do círculo (a parte cheia) 🍕

Para a superfície de dentro, há outra fórmula com π: a **área = π × raio × raio** (π vezes o raio ao quadrado). Repara: aqui usas o **raio**, não o diâmetro!

```math
{ "expr": "A = π × r²", "say": "a área do círculo é pi vezes o raio ao quadrado" }
```

```steps
[
  { "title": "Pizza de raio 10 cm", "body": "quanta massa cabe (a área)", "icon": "🍕" },
  { "title": "Raio ao quadrado", "body": "r² = 10 × 10 = 100", "icon": "⬜" },
  { "title": "Multiplica por π", "body": "A = 3,14 × 100 = 314 cm²", "icon": "✖️" },
  { "title": "Resposta", "body": "a pizza tem ≈ 314 cm² de área! 🍕", "icon": "🎉" }
]
```

> **Truque para não trocar as fórmulas:** o **contorno** (linha) usa o **diâmetro** (d) → é um comprimento, mede-se em cm. A **área** (cheio) usa o **raio ao quadrado** (r²) → é uma superfície, mede-se em cm². **Quadrado → área!** 🧠

## Um exemplo passo a passo 🔍

*«Uma mesa redonda tem **1 metro de raio**. Queres pôr uma fita à volta (no contorno). Que comprimento de fita precisas?»* Vamos lá! 🎀

```steps
[
  { "title": "1. O que quero", "body": "o contorno → P = 2 × π × r", "icon": "🎀" },
  { "title": "2. Mete os valores", "body": "P = 2 × 3,14 × 1", "icon": "🔢" },
  { "title": "3. Calcula", "body": "P = 6,28 metros", "icon": "✖️" },
  { "title": "4. Resposta", "body": "precisas de ≈ 6,28 m de fita (compra um bocadinho a mais!) 🎉", "icon": "✅" }
]
```

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Circunferência e círculo", "items": [
  { "front": "A linha à volta chama-se…", "back": "circunferência", "options": ["círculo", "raio"] },
  { "front": "Do centro à borda é o…", "back": "raio", "options": ["diâmetro", "contorno"] },
  { "front": "O diâmetro é o dobro do…", "back": "raio", "options": ["contorno", "π"] },
  { "front": "π vale aproximadamente…", "back": "3,14", "options": ["3,4", "1,3"] },
  { "front": "Contorno = π × …", "back": "diâmetro", "options": ["raio²", "área"] },
  { "front": "Área = π × …", "back": "raio²", "options": ["diâmetro", "2 × raio"] },
  { "front": "Se r = 5, o diâmetro é…", "back": "10", "options": ["2,5", "25"] }
] }
```

> [!TIP] **Para saberes mais** 🌱 O **π** é tão especial que tem um **dia só para ele**: o **14 de março** (3/14, à americana — Dia do Pi!) 🥧, que por acaso é também o aniversário de **Einstein**! Há gente que decora **milhares** de casas decimais de π por desporto — o recorde passa dos **100 000** algarismos de cor! 🤯 E nem se consegue escrever π como fração exata: é um número **irracional**, que nunca acaba nem se repete. Os matemáticos já calcularam **biliões** de casas com computadores — e nunca encontram o fim! ♾️

## Vamos praticar 🎈

```quiz
{
  "id": "mat-6-circulo-pratica",
  "questions": [
    { "q": "A linha à volta (a borda) chama-se…", "layout": "grid",
      "options": [ { "t": "circunferência", "emoji": "⭕", "correct": true }, { "t": "círculo", "feedback": "O círculo é a região cheia lá dentro. A linha à volta (a borda) é a circunferência.", "tag": "circulo-perimetro-area" }, { "t": "raio", "feedback": "O raio é só o caminho do centro à borda. A linha toda à volta é a circunferência.", "tag": "circulo-perimetro-area" } ],
      "explain": "Circunferência = a linha; círculo = a superfície cheia." },
    { "q": "O caminho do centro até à borda é o…", "layout": "grid",
      "options": [ { "t": "raio", "emoji": "📏", "correct": true }, { "t": "diâmetro", "feedback": "O diâmetro atravessa todo o círculo, de borda a borda. Do centro só até à borda é o raio (metade do diâmetro).", "tag": "circulo-raio-diametro" }, { "t": "contorno", "feedback": "O contorno é a linha toda à volta. Do centro até à borda é o raio.", "tag": "circulo-raio-diametro" } ],
      "explain": "O raio vai do centro à borda." },
    { "q": "Se o raio é 6 cm, o diâmetro é…", "layout": "grid",
      "options": [ { "t": "12 cm", "emoji": "✌️", "correct": true }, { "t": "3 cm", "feedback": "3 é metade de 6 — isso seria voltar para trás. O diâmetro é o DOBRO do raio: 2 × 6 = 12 cm.", "tag": "circulo-raio-diametro" }, { "t": "36 cm", "feedback": "36 é 6 × 6. O diâmetro é só o dobro do raio: 2 × 6 = 12 cm.", "tag": "circulo-raio-diametro" } ],
      "explain": "d = 2 × r = 2 × 6 = 12 cm." },
    { "q": "Quanto vale aproximadamente o π?", "layout": "grid",
      "options": [ { "t": "3,14", "emoji": "🥧", "correct": true }, { "t": "3,4", "feedback": "Cuidado com as casas! O π é 3,14 (três vírgula CATORZE), não 3,4.", "tag": "circulo-pi" }, { "t": "1,3", "feedback": "1,3 é pequeno demais. O π vale aproximadamente 3,14.", "tag": "circulo-pi" } ],
      "explain": "π ≈ 3,14 (tem infinitos algarismos)." },
    { "q": "O comprimento da circunferência é…", "layout": "grid",
      "options": [ { "t": "π × diâmetro", "emoji": "📏", "correct": true }, { "t": "π × raio²", "feedback": "π × raio² dá a ÁREA (o cheio). O comprimento (a linha à volta) é π × diâmetro.", "tag": "circulo-perimetro-area" }, { "t": "raio + diâmetro", "feedback": "Não se somam; o comprimento usa o π. É π × diâmetro (= 2 × π × raio).", "tag": "circulo-perimetro-area" } ],
      "explain": "P = π × d = 2 × π × r." },
    { "q": "A área de um círculo é…", "layout": "grid",
      "options": [ { "t": "π × raio²", "emoji": "🍕", "correct": true }, { "t": "π × diâmetro", "feedback": "π × diâmetro dá o comprimento da circunferência (a linha). A área (o cheio) é π × raio².", "tag": "circulo-perimetro-area" }, { "t": "2 × π × raio", "feedback": "2 × π × raio é o comprimento da circunferência. A área usa o raio ao quadrado: π × raio².", "tag": "circulo-perimetro-area" } ],
      "explain": "A = π × r² (usa o raio ao quadrado)." },
    { "q": "Um círculo de raio 10 cm tem contorno (π≈3,14)…", "layout": "grid",
      "options": [ { "t": "62,8 cm", "emoji": "🎡", "correct": true }, { "t": "31,4 cm", "feedback": "31,4 é π × raio (faltou usar o diâmetro). O contorno é 2 × π × raio = 2 × 3,14 × 10 = 62,8 cm.", "tag": "circulo-perimetro-area" }, { "t": "314 cm", "feedback": "314 é π × raio² — isso é a ÁREA. O contorno é 2 × 3,14 × 10 = 62,8 cm.", "tag": "circulo-perimetro-area" } ],
      "explain": "P = 2 × 3,14 × 10 = 62,8 cm." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-6-circulo-final",
  "final": true,
  "title": "Circunferência e círculo",
  "questions": [
    { "q": "O círculo é…", "layout": "grid",
      "options": [ { "t": "a região cheia lá dentro", "emoji": "🔵", "correct": true }, { "t": "só a linha à volta", "feedback": "Só a linha à volta é a circunferência. O círculo é a região cheia lá dentro (como a pizza inteira).", "tag": "circulo-perimetro-area" }, { "t": "o centro", "feedback": "O centro é só o ponto do meio. O círculo é toda a superfície cheia lá dentro.", "tag": "circulo-perimetro-area" } ],
      "explain": "Círculo = superfície cheia; circunferência = a linha." },
    { "q": "O diâmetro atravessa o círculo passando pelo…", "layout": "grid",
      "options": [ { "t": "centro", "emoji": "🎯", "correct": true }, { "t": "lado de fora", "feedback": "Por fora não atravessa nada. O diâmetro vai de borda a borda passando pelo centro.", "tag": "circulo-raio-diametro" }, { "t": "raio", "feedback": "O raio é só meia travessia, do centro à borda. O diâmetro atravessa tudo passando pelo centro.", "tag": "circulo-raio-diametro" } ],
      "explain": "Vai de borda a borda passando pelo centro." },
    { "q": "Se o diâmetro é 20 cm, o raio é…", "layout": "grid",
      "options": [ { "t": "10 cm", "emoji": "📏", "correct": true }, { "t": "40 cm", "feedback": "40 é o dobro de 20 — isso é o caminho contrário. O raio é METADE do diâmetro: 20 ÷ 2 = 10 cm.", "tag": "circulo-raio-diametro" }, { "t": "5 cm", "feedback": "5 é um quarto de 20; dividiste por 4 a mais. O raio é metade do diâmetro: 20 ÷ 2 = 10 cm.", "tag": "circulo-raio-diametro" } ],
      "explain": "O raio é metade do diâmetro: 20 ÷ 2 = 10." },
    { "q": "O número π é especial porque…", "layout": "grid",
      "options": [ { "t": "tem infinitos algarismos e nunca se repete", "emoji": "♾️", "correct": true }, { "t": "é igual a 3 certinho", "feedback": "Não é 3 certinho — usamos 3 só para estimar. O π tem infinitos algarismos (3,14159…) e nunca se repete.", "tag": "circulo-pi" }, { "t": "é o maior número", "feedback": "O π não é o maior número (vale só ≈ 3,14). É especial por ter infinitos algarismos que nunca se repetem.", "tag": "circulo-pi" } ],
      "explain": "É irracional: 3,14159… sem fim nem repetição." },
    { "q": "Para o contorno usas o diâmetro; para a área usas o…", "layout": "grid",
      "options": [ { "t": "raio ao quadrado", "emoji": "⬜", "correct": true }, { "t": "diâmetro ao quadrado", "feedback": "A fórmula da área usa o RAIO ao quadrado, não o diâmetro: A = π × raio².", "tag": "circulo-perimetro-area" }, { "t": "contorno", "feedback": "O contorno é o resultado de uma fórmula, não entra na da área. A área é π × raio ao quadrado.", "tag": "circulo-perimetro-area" } ],
      "explain": "A = π × r². Quadrado → área!" },
    { "q": "Contorno de um círculo de diâmetro 10 cm (π≈3,14)…", "layout": "grid",
      "options": [ { "t": "31,4 cm", "emoji": "🎡", "correct": true }, { "t": "62,8 cm", "feedback": "62,8 seria se 10 fosse o raio (2 × π × 10). Como 10 é o diâmetro, o contorno é π × diâmetro = 3,14 × 10 = 31,4 cm.", "tag": "circulo-perimetro-area" }, { "t": "78,5 cm", "feedback": "78,5 é a área de um círculo de raio 5 (π × 5²). O contorno é π × diâmetro = 3,14 × 10 = 31,4 cm.", "tag": "circulo-perimetro-area" } ],
      "explain": "P = π × d = 3,14 × 10 = 31,4 cm." },
    { "q": "Área de um círculo de raio 5 cm (π≈3,14)…", "layout": "grid",
      "options": [ { "t": "78,5 cm²", "emoji": "🍕", "correct": true }, { "t": "31,4 cm²", "feedback": "31,4 é o contorno (2 × π × 5). A área usa o raio ao quadrado: π × 5² = 3,14 × 25 = 78,5 cm².", "tag": "circulo-perimetro-area" }, { "t": "15,7 cm²", "feedback": "15,7 é só π × raio (faltou o quadrado). A área é π × raio² = 3,14 × 25 = 78,5 cm².", "tag": "circulo-perimetro-area" } ],
      "explain": "A = 3,14 × 5² = 3,14 × 25 = 78,5 cm²." },
    { "q": "A área mede-se em…", "layout": "grid",
      "options": [ { "t": "centímetros quadrados (cm²)", "emoji": "⬜", "correct": true }, { "t": "centímetros (cm)", "feedback": "cm (sem o ²) é comprimento — serve para o contorno. A área conta quadradinhos: cm².", "tag": "area-unidade" }, { "t": "litros", "feedback": "Litros medem capacidade (líquidos). A área conta quadrados: cm² ou m².", "tag": "area-unidade" } ],
      "explain": "Área é superfície → unidades quadradas." }
  ]
}
```
