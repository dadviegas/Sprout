# Mecanismos e movimento ⚙️

> [!NOTE] **O que vais aprender** 👀 O que é um **mecanismo**, como as máquinas **transmitem o movimento** (rodas dentadas, correias, alavancas, roldanas), como mudam a **força**, a **velocidade** e o **sentido**, e como ler uma **engrenagem** para perceber quem gira mais depressa. 🔧

Olha à tua volta: a bicicleta, o relógio, o abre-latas, a porta do armário. Em todos eles há **mecanismos** — peças que recebem um movimento e o passam adiante, muitas vezes a mudar-lhe a força ou a velocidade. Saber lê-los é meio caminho para inventar máquinas. 🛠️

## O que é um mecanismo 🔩

Um **mecanismo** é um conjunto de peças ligadas que transforma um movimento de **entrada** num movimento de **saída** útil. Há quatro coisas que um mecanismo pode mudar:

```keyvalue
[
  { "k": "A força 💪", "v": "tornar um esforço pequeno capaz de mover algo pesado (alavanca, roldana)" },
  { "k": "A velocidade ⏩", "v": "fazer a saída girar mais depressa ou mais devagar que a entrada" },
  { "k": "O sentido 🔄", "v": "trocar de horário para anti-horário, ou de empurrar para puxar" },
  { "k": "O tipo de movimento 🔃", "v": "transformar uma rotação num avanço em linha reta (e ao contrário)" }
]
```

## Tipos de movimento 🎢

Antes dos mecanismos, há quatro **tipos de movimento** que tens de saber distinguir.

```steps
[
  { "title": "Rotação 🔄", "body": "gira à volta de um eixo — a roda, a hélice, o ponteiro do relógio", "icon": "refresh" },
  { "title": "Linear / retilíneo ➡️", "body": "anda em linha reta — o comboio na via, a gaveta a abrir", "icon": "arrow-right" },
  { "title": "Alternado ↔️", "body": "vai e vem para a frente e para trás — o êmbolo, a serra a cortar", "icon": "swap" },
  { "title": "Oscilante 🪀", "body": "balança de um lado para o outro — o pêndulo do relógio, um baloiço", "icon": "wave" }
]
```

## Rodas dentadas (engrenagens) 🛞

Duas **rodas dentadas** que encaixam giram em **sentidos contrários** — se uma vai para a direita, a outra vai para a esquerda. E há uma regra de ouro: **a roda pequena gira mais depressa**; a roda grande gira mais devagar, mas com **mais força**. 🦷

```compare
[
  { "title": "Roda pequena (poucos dentes) ⚙️", "rows": [
    { "label": "Velocidade", "value": "gira mais depressa 🏃" },
    { "label": "Força", "value": "menos força" },
    { "label": "Onde manda", "value": "quando queres rapidez" }
  ] },
  { "title": "Roda grande (muitos dentes) 🛞", "rows": [
    { "label": "Velocidade", "value": "gira mais devagar 🐢", "highlight": true },
    { "label": "Força", "value": "mais força (multiplica o esforço)", "highlight": true },
    { "label": "Onde manda", "value": "quando queres puxar algo pesado", "highlight": true }
  ] }
]
```

> **Truque para contares engrenagens:** conta os **dentes**. Se a roda que recebe o movimento tem **o dobro dos dentes** da que dá o movimento, ela gira a **metade da velocidade** — mas com o **dobro da força**. *Mais dentes na saída = mais lento e mais forte; menos dentes = mais rápido e mais fraquinho.* 🦷⚖️

```math
{ "expr": "12 dentes  →  24 dentes  =  1/2 da velocidade", "say": "Uma roda de doze dentes a mover uma de vinte e quatro dá metade da velocidade." }
```

## Correias e correntes 🔗

E se as rodas estiverem **afastadas**? Liga-as com uma **correia** (uma fita) ou uma **corrente** (como a da bicicleta). Aqui há uma diferença importante:

```keyvalue
[
  { "k": "Engrenagem direta 🦷", "v": "as duas rodas encaixam e giram em sentidos CONTRÁRIOS" },
  { "k": "Correia normal 🔗", "v": "liga rodas afastadas; giram no MESMO sentido" },
  { "k": "Correia cruzada (em 8) ✖️", "v": "cruzada, faz as rodas girarem em sentidos contrários" },
  { "k": "Corrente (bicicleta) 🚲", "v": "como a correia, mas com dentes — não escorrega e aguenta mais força" }
]
```

## Alavancas e roldanas 🪜

Nem tudo é girar. As **máquinas simples** ajudam-te a vencer pesos com pouco esforço.

```steps
[
  { "title": "Alavanca ⚖️", "body": "uma barra apoiada num ponto (o fulcro): empurras de um lado para levantar o outro — gangorra, abre-cápsulas, carrinho de mão", "icon": "scale" },
  { "title": "Roldana fixa 🪝", "body": "uma roda com sulco no teto: puxas a corda para baixo e a carga sobe — muda o SENTIDO da força", "icon": "circle" },
  { "title": "Roldana móvel 🏗️", "body": "anda com a carga e ajuda a levantá-la com METADE do esforço", "icon": "arrow-up" },
  { "title": "Plano inclinado 📐", "body": "uma rampa: subir uma carga aos poucos cansa menos do que levantá-la a direito", "icon": "triangle" }
]
```

## Um problema passo a passo 🔍

*«Numa bicicleta, o pedal move uma roda dentada de 40 dentes; a roda de trás tem uma de 20 dentes. Quando dás 1 volta ao pedal, quantas voltas dá a roda de trás?»* Vamos com calma. 🚲🧮

```steps
[
  { "title": "1. Vê quem dá e quem recebe", "body": "o pedal DÁ o movimento (40 dentes), a roda de trás RECEBE (20 dentes)" },
  { "title": "2. Divide os dentes", "body": "40 ÷ 20 = 2 — a roda de trás tem metade dos dentes" },
  { "title": "3. Tira a conclusão", "body": "metade dos dentes → gira o DOBRO das voltas" },
  { "title": "4. Resposta", "body": "1 volta de pedal = 2 voltas da roda de trás 🚴 (por isso vais mais depressa!)" }
]
```

> [!TIP] **Para saberes mais** 🌱 Quando ligas **três ou mais** rodas dentadas em fila (um *trem de engrenagens*), cada par troca o sentido — por isso a primeira e a terceira roda giram **no mesmo sentido**! É a mesma ideia das mudanças da bicicleta e da caixa de velocidades de um carro: combinando rodas grandes e pequenas, escolhes ter **mais força** (a subir) ou **mais velocidade** (no plano). ⚙️⚙️⚙️

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Quem gira como?", "items": [
  { "front": "A roda dentada pequena, comparada com a grande…", "back": "gira mais depressa", "options": ["gira mais devagar", "para de girar"] },
  { "front": "Duas rodas dentadas que encaixam giram…", "back": "em sentidos contrários", "options": ["no mesmo sentido", "ambas paradas"] },
  { "front": "A roda grande tem mais…", "back": "força", "options": ["velocidade", "dentes mas menos força"] },
  { "front": "A roldana fixa serve para…", "back": "mudar o sentido da força", "options": ["aumentar a velocidade", "esticar a corda"] },
  { "front": "O ponto de apoio de uma alavanca chama-se…", "back": "fulcro", "options": ["êmbolo", "eixo"] }
] }
```

## Vamos praticar 🎈

```quiz
{
  "id": "et-6-mecanismos-pratica",
  "questions": [
    { "q": "O que faz um mecanismo?", "layout": "grid",
      "options": [ { "t": "Recebe um movimento e passa-o adiante, mudando força ou velocidade", "emoji": "⚙️", "correct": true }, { "t": "Guarda eletricidade" }, { "t": "Faz só barulho" } ],
      "explain": "Um mecanismo transforma um movimento de entrada num movimento de saída útil." },
    { "q": "Duas rodas dentadas encaixadas giram…", "layout": "grid",
      "options": [ { "t": "em sentidos contrários", "emoji": "🔄", "correct": true }, { "t": "sempre no mesmo sentido" }, { "t": "à mesma velocidade sempre" } ],
      "explain": "Quando os dentes encaixam, uma vai para um lado e a outra para o lado oposto." },
    { "q": "Comparada com a roda grande, a roda pequena…", "layout": "grid",
      "options": [ { "t": "gira mais depressa, com menos força", "emoji": "🏃", "correct": true }, { "t": "gira mais devagar" }, { "t": "tem mais força" } ],
      "explain": "Menos dentes = mais velocidade e menos força." },
    { "q": "Qual é um movimento de rotação?", "layout": "grid",
      "options": [ { "t": "A roda da bicicleta a girar", "emoji": "🔄", "correct": true }, { "t": "A gaveta a abrir em linha reta" }, { "t": "O pêndulo a balançar" } ],
      "explain": "Rotação é girar à volta de um eixo, como a roda." },
    { "q": "Para ligar duas rodas afastadas sem escorregar e aguentando força, usa-se…", "layout": "grid",
      "options": [ { "t": "uma corrente (com dentes)", "emoji": "🔗", "correct": true }, { "t": "uma alavanca" }, { "t": "um plano inclinado" } ],
      "explain": "A corrente, como a da bicicleta, tem dentes e não escorrega." },
    { "q": "Uma roldana fixa serve para…", "layout": "grid",
      "options": [ { "t": "mudar o sentido da força (puxas para baixo, a carga sobe)", "emoji": "🪝", "correct": true }, { "t": "fazer a corda mais comprida" }, { "t": "girar mais depressa" } ],
      "explain": "A roldana fixa muda o sentido: puxar para baixo levanta a carga." },
    { "q": "Numa alavanca, o ponto de apoio chama-se…", "layout": "grid",
      "options": [ { "t": "fulcro", "emoji": "⚖️", "correct": true }, { "t": "correia" }, { "t": "êmbolo" } ],
      "explain": "O fulcro é o ponto fixo onde a barra apoia." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "et-6-mecanismos-final",
  "final": true,
  "title": "Mecanismos e movimento",
  "questions": [
    { "q": "Quais são as quatro coisas que um mecanismo pode mudar?", "layout": "list",
      "options": [ { "t": "força, velocidade, sentido e tipo de movimento", "correct": true }, { "t": "cor, peso, tamanho e som" }, { "t": "só a velocidade" } ],
      "explain": "Um mecanismo pode mudar a força, a velocidade, o sentido e o tipo de movimento." },
    { "q": "Que tipo de movimento é o êmbolo a ir e vir para a frente e para trás?", "layout": "grid",
      "options": [ { "t": "alternado", "emoji": "↔️", "correct": true }, { "t": "rotação" }, { "t": "oscilante" } ],
      "explain": "Vai e vem em linha reta repetidamente: movimento alternado." },
    { "q": "Uma roda de 12 dentes move uma de 24 dentes. A de 24 dentes…", "layout": "grid",
      "options": [ { "t": "gira a metade da velocidade, mas com mais força", "emoji": "🐢", "correct": true }, { "t": "gira ao dobro da velocidade" }, { "t": "não gira" } ],
      "explain": "O dobro dos dentes → metade da velocidade e o dobro da força." },
    { "q": "Para que rodas afastadas girem no MESMO sentido usa-se…", "layout": "grid",
      "options": [ { "t": "uma correia normal", "emoji": "🔗", "correct": true }, { "t": "uma correia cruzada em 8" }, { "t": "uma engrenagem direta" } ],
      "explain": "A correia normal liga rodas afastadas mantendo o mesmo sentido." },
    { "q": "A roldana móvel ajuda-te a levantar uma carga com…", "layout": "grid",
      "options": [ { "t": "cerca de metade do esforço", "emoji": "🏗️", "correct": true }, { "t": "o dobro do esforço" }, { "t": "exatamente o mesmo esforço" } ],
      "explain": "A roldana móvel anda com a carga e reparte o esforço por duas partes da corda." },
    { "q": "Uma rampa (plano inclinado) ajuda porque…", "layout": "grid",
      "options": [ { "t": "subir aos poucos cansa menos do que levantar a direito", "emoji": "📐", "correct": true }, { "t": "encolhe a carga" }, { "t": "torna a carga mais pesada" } ],
      "explain": "O plano inclinado troca esforço por distância: sobes mais devagar, com menos força." },
    { "q": "Numa bicicleta, o pedal (40 dentes) move a roda de trás (20 dentes). Por cada volta de pedal, a roda dá…", "layout": "grid",
      "options": [ { "t": "2 voltas", "emoji": "🚴", "correct": true }, { "t": "meia volta" }, { "t": "exatamente 1 volta" } ],
      "explain": "40 ÷ 20 = 2: metade dos dentes na roda de trás dá o dobro das voltas." },
    { "q": "Num trem de 3 engrenagens em fila, a 1.ª e a 3.ª roda giram…", "layout": "grid",
      "options": [ { "t": "no mesmo sentido (cada par troca o sentido)", "emoji": "⚙️", "correct": true }, { "t": "sempre em sentidos contrários" }, { "t": "sem girar" } ],
      "explain": "Cada par troca o sentido, por isso a 1.ª e a 3.ª acabam no mesmo sentido." }
  ]
}
```
