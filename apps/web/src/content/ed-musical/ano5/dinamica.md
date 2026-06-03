# Dinâmica e andamento 📢

> [!NOTE] **O que vais aprender** 👀 A **dinâmica** — se a música está **forte** ou **fraca** — com os seus nomes italianos (**piano**, **forte**, **mezzo**…) e os sinais de **crescendo** e **diminuendo**; e o **andamento** — se a música vai **depressa** ou **devagar** (**adágio**, **andante**, **allegro**, **presto**). É o que dá **emoção** à música! 🎚️🏃

Imagina uma história contada sempre na mesma voz, sem nunca acelerar nem abrandar, sem nunca falar baixinho nem gritar… que seca, não era? 😴 A música tem dois «temperos» mágicos que a tornam **viva**: a **dinâmica** (forte ou fraca) e o **andamento** (rápido ou lento). São eles que fazem uma música assustar, embalar ou pôr toda a gente a saltar. Vamos descobri-los! ✨

## Dinâmica: forte ou fraco? 🎚️

A **dinâmica** é a **intensidade** da música — se está a soar **forte** ou **fraca**. Os músicos usam palavras **italianas** (a língua mãe da música!) para o escrever na partitura. As duas mais importantes são **piano** (fraco, baixinho 🤫) e **forte** (forte, alto 📢).

```keyvalue
[
  { "k": "pianissimo (pp)", "v": "muito fraco, quase um segredo 🤫" },
  { "k": "piano (p)", "v": "fraco, baixinho — sim, 'piano' quer dizer fraco! 🎹" },
  { "k": "mezzo-forte (mf)", "v": "nem muito forte, nem muito fraco — a meio 🙂" },
  { "k": "forte (f)", "v": "forte, com energia 📢" },
  { "k": "fortissimo (ff)", "v": "muito forte, com toda a força! 🔊" }
]
```

> [!NOTE] Curiosidade gira: o instrumento **piano** chama-se assim por causa disto! 🎹 O seu nome completo era *pianoforte*, porque foi o primeiro teclado que conseguia tocar tanto **piano** (fraco) como **forte** — bastava carregar mais devagar ou com mais força nas teclas. Os teclados antigos faziam sempre o mesmo volume!

## Crescendo e diminuendo 📈📉

A música nem sempre fica no mesmo volume: muitas vezes vai **aumentando** ou **diminuindo** aos poucos. Para isso há dois nomes (e dois sinais que parecem «bicos»):

```compare
[
  { "title": "Crescendo 📈 (< )", "rows": [
    { "label": "O que faz", "value": "o som vai ficando cada vez mais forte" },
    { "label": "Sinal", "value": "uma 'boca' que abre: < (como um megafone) 📢" },
    { "label": "Faz lembrar", "value": "um comboio a aproximar-se: fica cada vez mais alto 🚂" }
  ] },
  { "title": "Diminuendo 📉 ( >)", "rows": [
    { "label": "O que faz", "value": "o som vai ficando cada vez mais fraco", "highlight": true },
    { "label": "Sinal", "value": "uma 'boca' que fecha: > 🤏", "highlight": true },
    { "label": "Faz lembrar", "value": "o comboio a afastar-se: vai-se calando, calando… 🌫️", "highlight": true }
  ] }
]
```

> **Truque para os sinais:** olha para o **bico**! 🦅 Onde o sinal é **fino**, o som é **fraco**; onde é **largo (aberto)**, o som é **forte**. Por isso `<` (abre da esquerda para a direita) é **crescendo** (vai crescendo), e `>` (fecha) é **diminuendo** (vai-se calando). É como um megafone a abrir ou a fechar! 📣

## Andamento: depressa ou devagar? 🏃🐌

O **andamento** (em italiano, *tempo*) é a **velocidade** da pulsação — se a música anda **depressa** ou **devagar**. Também tem nomes italianos, do mais lento ao mais rápido. Olha a corrida das palavras, do passinho de tartaruga ao foguetão! 🚀

```stats
[
  { "value": "🐢", "label": "Adágio", "hint": "muito devagar e calmo — para relaxar", "tone": "info" },
  { "value": "🚶", "label": "Andante", "hint": "à velocidade de quem anda a passear", "tone": "ok" },
  { "value": "🏃", "label": "Allegro", "hint": "rápido e alegre — o mais comum nas festas", "tone": "warn" },
  { "value": "🚀", "label": "Presto", "hint": "muito rápido, a toda a velocidade!", "tone": "danger" }
]
```

```chart
{ "type": "bar", "title": "Andamento: do mais lento ao mais rápido (batidas por minuto)",
  "labels": ["Adágio", "Andante", "Allegro", "Presto"], "data": [60, 90, 130, 180],
  "unit": "bpm",
  "say": "Do mais lento ao mais rápido: adágio cerca de 60, andante 90, allegro 130 e presto 180 batidas por minuto." }
```

> [!NOTE] **Andante** vem do verbo italiano *andare*, que quer dizer… **andar**! 🚶 Por isso «andante» é a música «ao ritmo de quem vai a andar», nem a correr nem parado. Já **allegro** quer dizer **alegre** — uma música rápida costuma soar mesmo bem-disposta! 😄

## Dinâmica + andamento = emoção 🎭

Quando juntas a dinâmica e o andamento, consegues pintar **emoções** com som. Repara como a mesma melodia muda **completamente** de carácter conforme a tocas:

```keyvalue
[
  { "k": "Lento + fraco 😴", "v": "calmo e doce, como uma canção de embalar 🌙" },
  { "k": "Lento + forte 😢", "v": "sério e dramático, como o fim de um filme triste 🎬" },
  { "k": "Rápido + fraco 🤫", "v": "nervoso e cheio de suspense, como um rato a fugir 🐭" },
  { "k": "Rápido + forte 🎉", "v": "festivo e poderoso, como uma banda numa festa! 🥳" }
]
```

## Um exemplo passo a passo 🔍

Vamos cantar **«Parabéns a você»** de **quatro maneiras diferentes**, mudando só a dinâmica e o andamento. Vais ver como muda a sensação! 🎂

```steps
[
  { "title": "1. Andante + mezzo-forte (normal)", "body": "canta como sempre: nem rápido nem lento, volume médio 🙂" },
  { "title": "2. Adágio + piano (sonolento)", "body": "agora muito devagar e baixinho — parece uma canção de adormecer 😴" },
  { "title": "3. Allegro + forte (festa!)", "body": "depressa e bem alto — é uma festa cheia de balões! 🎈" },
  { "title": "4. Faz um crescendo", "body": "começa fraquinho e vai aumentando o volume até ao fim: pp → ff 📈" },
  { "title": "5. Repara na magia", "body": "a melodia é a MESMA, mas a emoção mudou só com a dinâmica e o andamento! ✨" }
]
```

> [!TIP] **Para saberes mais** 🌱 Antes existir a eletricidade, como é que os músicos sabiam ao certo a que velocidade tocar? Inventou-se o **metrónomo** ⏱️ — uma máquina com um pêndulo que faz «tic-tac» a uma velocidade exata, medida em **BPM** (batidas por minuto). 60 BPM é uma batida por segundo, como o tique-taque de um relógio; 120 BPM é o dobro — bem mais animado! Hoje os músicos ainda usam o metrónomo para treinar a tocar sempre certinho. 🎼

## Forte, fraco, rápido, lento 🎯

Toca em cada cartão para **ouvir** o que cada palavra italiana significa:

```soundcards
{ "title": "As palavras da música (italiano)", "items": [
  { "label": "piano 🤫", "say": "Piano quer dizer fraco, baixinho", "hint": "fraco" },
  { "label": "forte 📢", "say": "Forte quer dizer forte, alto, com energia", "hint": "forte" },
  { "label": "adágio 🐢", "say": "Adágio quer dizer muito devagar e calmo", "hint": "devagar" },
  { "label": "allegro 🏃", "say": "Allegro quer dizer rápido e alegre", "hint": "rápido" }
] }
```

## Treina a dinâmica e o andamento 🎯

```drill
{ "mode": "choose", "title": "Forte/fraco e rápido/lento", "items": [
  { "front": "A intensidade da música (forte ou fraca) chama-se…", "back": "dinâmica", "options": ["andamento", "timbre"] },
  { "front": "A velocidade da música (rápida ou lenta) chama-se…", "back": "andamento", "options": ["dinâmica", "melodia"] },
  { "front": "Em italiano, 'piano' quer dizer…", "back": "fraco", "options": ["forte", "rápido"] },
  { "front": "Em italiano, 'forte' quer dizer…", "back": "forte", "options": ["fraco", "lento"] },
  { "front": "O som ir ficando cada vez mais FORTE chama-se…", "back": "crescendo", "options": ["diminuendo", "adágio"] },
  { "front": "O som ir ficando cada vez mais FRACO chama-se…", "back": "diminuendo", "options": ["crescendo", "forte"] },
  { "front": "'Allegro' é um andamento…", "back": "rápido", "options": ["lento", "fraco"] },
  { "front": "'Adágio' é um andamento…", "back": "lento", "options": ["rápido", "forte"] }
] }
```

## Vamos praticar 🎈

```quiz
{ "id": "em-5-dinamica-pratica", "questions": [
  { "q": "A dinâmica de uma música diz-nos se ela está…", "layout": "grid", "options": [
    { "t": "forte ou fraca", "emoji": "📢", "correct": true },
    { "t": "rápida ou lenta", "emoji": "🏃" },
    { "t": "aguda ou grave", "emoji": "🐦" }
  ], "explain": "A dinâmica é a intensidade: forte ou fraca." },
  { "q": "Em italiano, 'piano' quer dizer…", "layout": "grid", "options": [
    { "t": "fraco (baixinho)", "emoji": "🤫", "correct": true },
    { "t": "forte (alto)", "emoji": "📢" },
    { "t": "rápido", "emoji": "🏃" }
  ], "explain": "'Piano' = fraco. Por isso o instrumento piano podia tocar piano e forte!" },
  { "q": "Quando o som vai ficando cada vez mais forte, é um…", "layout": "grid", "options": [
    { "t": "crescendo", "emoji": "📈", "correct": true },
    { "t": "diminuendo", "emoji": "📉" },
    { "t": "silêncio", "emoji": "🤫" }
  ], "explain": "Crescendo = o som cresce, fica cada vez mais forte." },
  { "q": "O andamento de uma música diz-nos se ela vai…", "layout": "grid", "options": [
    { "t": "depressa ou devagar", "emoji": "🏃", "correct": true },
    { "t": "forte ou fraca", "emoji": "📢" },
    { "t": "alegre ou triste", "emoji": "😊" }
  ], "explain": "O andamento é a velocidade da pulsação: rápido ou lento." },
  { "q": "'Allegro' é um andamento…", "layout": "grid", "options": [
    { "t": "rápido e alegre", "emoji": "🏃", "correct": true },
    { "t": "muito lento", "emoji": "🐢" },
    { "t": "fraquinho", "emoji": "🤫" }
  ], "explain": "Allegro quer dizer rápido (e 'alegre' em italiano)." },
  { "q": "Uma canção de embalar costuma ser…", "layout": "grid", "options": [
    { "t": "lenta (adágio) e fraca (piano)", "emoji": "😴", "correct": true },
    { "t": "rápida e fortíssima", "emoji": "🥳" },
    { "t": "muito aguda e curta", "emoji": "🐦" }
  ], "explain": "Para adormecer, a música é lenta e baixinha: adágio e piano." },
  { "q": "O sinal < (que abre) significa…", "layout": "grid", "options": [
    { "t": "crescendo — o som vai aumentando", "emoji": "📈", "correct": true },
    { "t": "diminuendo — o som vai diminuindo", "emoji": "📉" },
    { "t": "parar a música", "emoji": "🛑" }
  ], "explain": "O bico abre da esquerda para a direita: o som cresce (crescendo)." }
] }
```

## 🎯 Questionário final

```quiz
{ "id": "em-5-dinamica-final", "final": true, "title": "Dinâmica e andamento", "questions": [
  { "q": "Os dois 'temperos' que dão emoção à música são…", "layout": "list", "options": [
    { "t": "a dinâmica (forte/fraco) e o andamento (rápido/lento)", "emoji": "🎚️", "correct": true },
    { "t": "a cor e o cheiro", "emoji": "🎨" },
    { "t": "o nome e a idade", "emoji": "📛" }
  ], "explain": "A dinâmica (intensidade) e o andamento (velocidade) dão emoção à música." },
  { "q": "'Fortissimo (ff)' quer dizer…", "layout": "grid", "options": [
    { "t": "muito forte, com toda a força", "emoji": "🔊", "correct": true },
    { "t": "muito fraco", "emoji": "🤫" },
    { "t": "muito lento", "emoji": "🐢" }
  ], "explain": "Fortissimo é o mais forte de todos." },
  { "q": "O instrumento 'piano' chama-se assim porque…", "layout": "grid", "options": [
    { "t": "conseguia tocar tanto piano (fraco) como forte", "emoji": "🎹", "correct": true },
    { "t": "só tocava devagar", "emoji": "🐢" },
    { "t": "era muito pequenino", "emoji": "🤏" }
  ], "explain": "O 'pianoforte' foi o primeiro teclado a fazer fraco E forte conforme a força nas teclas." },
  { "q": "O sinal > (que fecha) significa…", "layout": "grid", "options": [
    { "t": "diminuendo — o som vai-se calando", "emoji": "📉", "correct": true },
    { "t": "crescendo — o som aumenta", "emoji": "📈" },
    { "t": "repetir do início", "emoji": "🔁" }
  ], "explain": "O bico fecha: o som diminui (diminuendo)." },
  { "q": "'Presto' é um andamento…", "layout": "grid", "options": [
    { "t": "muito rápido, a toda a velocidade", "emoji": "🚀", "correct": true },
    { "t": "muito lento", "emoji": "🐢" },
    { "t": "muito fraco", "emoji": "🤫" }
  ], "explain": "Presto é o mais rápido — quase um foguetão!" },
  { "q": "'Andante' tem este nome porque vem de 'andar' (em italiano). É a velocidade de quem…", "layout": "grid", "options": [
    { "t": "vai a passear, nem a correr nem parado", "emoji": "🚶", "correct": true },
    { "t": "está a dormir", "emoji": "😴" },
    { "t": "corre uma maratona", "emoji": "🏃" }
  ], "explain": "Andante = ao ritmo de quem anda a passear." },
  { "q": "A mesma melodia tocada lenta-e-fraca ou rápida-e-forte…", "layout": "grid", "options": [
    { "t": "transmite emoções completamente diferentes", "emoji": "🎭", "correct": true },
    { "t": "soa sempre exatamente igual", "emoji": "🟰" },
    { "t": "deixa de ser música", "emoji": "🚫" }
  ], "explain": "A dinâmica e o andamento mudam a emoção, mesmo com a mesma melodia." },
  { "q": "A máquina com pêndulo que marca a velocidade exata em batidas por minuto (BPM) é o…", "layout": "grid", "options": [
    { "t": "metrónomo", "emoji": "⏱️", "correct": true },
    { "t": "termómetro", "emoji": "🌡️" },
    { "t": "telescópio", "emoji": "🔭" }
  ], "explain": "O metrónomo faz tic-tac a uma velocidade certa, medida em BPM." }
] }
```
