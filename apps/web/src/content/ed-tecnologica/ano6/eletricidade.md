# Circuitos elétricos 🔌

> [!NOTE] **O que vais aprender** 👀 O que é um **circuito elétrico**, as suas peças (pilha, fios, lâmpada, interruptor), a diferença entre circuito **aberto** e **fechado**, **condutores** e **isoladores**, e as ligações em **série** e em **paralelo**. ⚡💡

Um circuito elétrico é como uma **estrada em anel** para a eletricidade. Se o anel estiver completo, a corrente dá a volta e acende a lâmpada; se houver um corte, pára tudo. Vamos montar um na cabeça, peça a peça. 🛣️⚡

## As peças de um circuito 🧩

Quase todos os circuitos simples têm os mesmos quatro elementos. Cada um tem o seu trabalho:

```keyvalue
[
  { "k": "Pilha / bateria 🔋", "v": "o coração — empurra a corrente para dar a volta (dá a energia)" },
  { "k": "Fios condutores 🧵", "v": "as estradas por onde a corrente viaja" },
  { "k": "Recetor (lâmpada, motor…) 💡", "v": "quem usa a energia — acende, gira, toca" },
  { "k": "Interruptor 🔘", "v": "a ponte levadiça — abre ou fecha o caminho" }
]
```

## Aberto ou fechado? 🚦

Esta é a ideia-chave de toda a lição. A corrente **só passa se o anel estiver completo**.

```compare
[
  { "title": "Circuito fechado ✅", "rows": [
    { "label": "O caminho", "value": "completo, sem cortes 🔗" },
    { "label": "A corrente", "value": "passa e dá a volta" },
    { "label": "A lâmpada", "value": "ACENDE 💡" }
  ] },
  { "title": "Circuito aberto ❌", "rows": [
    { "label": "O caminho", "value": "interrompido (interruptor desligado ou fio solto)", "highlight": true },
    { "label": "A corrente", "value": "não passa", "highlight": true },
    { "label": "A lâmpada", "value": "APAGADA 🌑", "highlight": true }
  ] }
]
```

> **Truque para nunca te enganares:** pensa num **comboio numa via circular**. Se houver um **corte na via** (interruptor aberto), o comboio **pára** — lâmpada apagada. Se a via estiver **toda ligada** (interruptor fechado), o comboio **dá a volta** — lâmpada acesa. *Fechado = passa; aberto = pára.* 🚂🔄

## Condutores e isoladores 🧤

Nem tudo deixa a eletricidade passar. Os materiais dividem-se em dois tipos — e isto é uma questão de **segurança**.

```compare
[
  { "title": "Condutores ⚡", "rows": [
    { "label": "Deixam passar?", "value": "sim, a corrente atravessa-os" },
    { "label": "Exemplos", "value": "cobre, ferro, alumínio, ouro (metais)" },
    { "label": "Uso", "value": "fazem-se com eles os fios 🧵" }
  ] },
  { "title": "Isoladores 🧤", "rows": [
    { "label": "Deixam passar?", "value": "não — travam a corrente", "highlight": true },
    { "label": "Exemplos", "value": "plástico, borracha, vidro, madeira seca", "highlight": true },
    { "label": "Uso", "value": "revestem os fios para te protegerem 🛡️", "highlight": true }
  ] }
]
```

## Série ou paralelo? 🔀

E quando há **duas lâmpadas**? A maneira como as ligas muda tudo.

```steps
[
  { "title": "Em série 🔗", "body": "as lâmpadas vão umas atrás das outras, no mesmo fio. Se uma se funde, APAGAM-SE todas — e quanto mais lâmpadas, mais fraca a luz", "icon": "link" },
  { "title": "Em paralelo 🌿", "body": "cada lâmpada tem o seu próprio ramo. Se uma se funde, as outras CONTINUAM acesas — e cada uma brilha igual", "icon": "git-branch" }
]
```

```stats
[
  { "label": "Série — uma funde-se 🔗", "value": "apagam todas", "hint": "como as luzinhas de Natal antigas: faltava uma e ficava tudo às escuras" },
  { "label": "Paralelo — uma funde-se 🌿", "value": "as outras ficam", "hint": "é assim que está a tua casa: apagas o quarto e a cozinha continua acesa 🏠" }
]
```

## Um problema passo a passo 🔍

*«Tens uma pilha, dois fios, uma lâmpada e um interruptor desligado. A lâmpada acende?»* Vamos seguir a corrente. 🔍⚡

```steps
[
  { "title": "1. Segue o caminho", "body": "sai da pilha, vai pelo fio… chega ao interruptor" },
  { "title": "2. O interruptor está…", "body": "DESLIGADO → há um corte no anel" },
  { "title": "3. Logo, o circuito está…", "body": "ABERTO — a corrente não consegue dar a volta" },
  { "title": "4. Resposta", "body": "NÃO acende 🌑. Liga o interruptor e fecha o circuito para a luz acender! 💡" }
]
```

> [!TIP] **Para saberes mais** 🌱 A eletricidade tem três grandezas que andam sempre juntas: a **tensão** (V, volts — a "força" que empurra a corrente, dada pela pilha), a **corrente** (A, amperes — quanta carga passa) e a **resistência** (Ω, ohms — o quanto o material dificulta a passagem). Quanto maior a resistência, **menos corrente** passa. Um **fusível** é um fiozinho de segurança feito para se **fundir** primeiro se passar corrente a mais — protege a casa de um incêndio! 🛡️⚡

## Treina a memória 🎯

```drill
{ "mode": "choose", "title": "Condutor ou isolador?", "items": [
  { "front": "Fio de cobre 🟠", "back": "condutor", "options": ["isolador"] },
  { "front": "Capa de plástico 🟦", "back": "isolador", "options": ["condutor"] },
  { "front": "Prego de ferro 🔩", "back": "condutor", "options": ["isolador"] },
  { "front": "Borracha 🧽", "back": "isolador", "options": ["condutor"] },
  { "front": "Colher de alumínio 🥄", "back": "condutor", "options": ["isolador"] },
  { "front": "Madeira seca 🪵", "back": "isolador", "options": ["condutor"] }
] }
```

## Vamos praticar 🎈

```quiz
{
  "id": "et-6-eletricidade-pratica",
  "questions": [
    { "q": "Qual é a peça que dá energia ao circuito?", "layout": "grid",
      "options": [ { "t": "A pilha", "emoji": "🔋", "correct": true }, { "t": "O interruptor" }, { "t": "O fio" } ],
      "explain": "A pilha empurra a corrente; é o coração do circuito." },
    { "q": "Para a lâmpada acender, o circuito tem de estar…", "layout": "grid",
      "options": [ { "t": "fechado (caminho completo)", "emoji": "✅", "correct": true }, { "t": "aberto" }, { "t": "molhado" } ],
      "explain": "Só com o anel completo a corrente dá a volta e acende." },
    { "q": "Qual destes é um bom condutor de eletricidade?", "layout": "grid",
      "options": [ { "t": "O cobre", "emoji": "⚡", "correct": true }, { "t": "O plástico" }, { "t": "A borracha" } ],
      "explain": "Os metais, como o cobre, conduzem; o plástico e a borracha isolam." },
    { "q": "Para que serve o interruptor?", "layout": "grid",
      "options": [ { "t": "Abrir ou fechar o caminho da corrente", "emoji": "🔘", "correct": true }, { "t": "Dar energia" }, { "t": "Aquecer a lâmpada" } ],
      "explain": "O interruptor é a ponte que abre (corta) ou fecha (liga) o circuito." },
    { "q": "Em série, se uma lâmpada se funde…", "layout": "grid",
      "options": [ { "t": "apagam-se todas", "emoji": "🌑", "correct": true }, { "t": "as outras continuam acesas" }, { "t": "ficam mais brilhantes" } ],
      "explain": "Em série há um só caminho; cortado num ponto, pára tudo." },
    { "q": "Porque é que os fios têm uma capa de plástico?", "layout": "grid",
      "options": [ { "t": "É isolador e protege-nos da corrente", "emoji": "🧤", "correct": true }, { "t": "Para ficarem coloridos" }, { "t": "Para conduzir melhor" } ],
      "explain": "O plástico isola: trava a corrente e protege-te de choques." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "et-6-eletricidade-final",
  "final": true,
  "title": "Circuitos elétricos",
  "questions": [
    { "q": "Quais são as peças básicas de um circuito simples?", "layout": "list",
      "options": [ { "t": "pilha, fios, recetor (lâmpada) e interruptor", "correct": true }, { "t": "água, ar, fogo e terra" }, { "t": "só a lâmpada" } ],
      "explain": "Pilha (energia), fios (caminho), recetor (usa a energia) e interruptor (liga/desliga)." },
    { "q": "Um circuito aberto é aquele em que…", "layout": "grid",
      "options": [ { "t": "há um corte e a corrente não passa", "emoji": "❌", "correct": true }, { "t": "o caminho está completo" }, { "t": "a lâmpada está sempre acesa" } ],
      "explain": "Aberto = interrompido → a corrente não dá a volta → lâmpada apagada." },
    { "q": "Qual é o melhor 'truque' para saber se a lâmpada acende?", "layout": "list",
      "options": [ { "t": "Pensar num comboio na via: cortada, pára; ligada, dá a volta", "correct": true }, { "t": "Ver se a pilha é grande" }, { "t": "Contar os fios" } ],
      "explain": "Fechado = a corrente passa (acende); aberto = pára (apagada)." },
    { "q": "Qual destes materiais é um isolador?", "layout": "grid",
      "options": [ { "t": "A borracha", "emoji": "🧤", "correct": true }, { "t": "O ferro" }, { "t": "O alumínio" } ],
      "explain": "A borracha trava a corrente; o ferro e o alumínio conduzem-na." },
    { "q": "Numa ligação em paralelo, se uma lâmpada se funde…", "layout": "grid",
      "options": [ { "t": "as outras continuam acesas", "emoji": "🌿", "correct": true }, { "t": "apagam-se todas" }, { "t": "a pilha estraga-se" } ],
      "explain": "Em paralelo cada lâmpada tem o seu ramo, por isso as outras ficam." },
    { "q": "A tua casa está ligada em paralelo porque…", "layout": "grid",
      "options": [ { "t": "podes apagar uma divisão sem apagar as outras", "emoji": "🏠", "correct": true }, { "t": "gasta menos fios" }, { "t": "é mais barato" } ],
      "explain": "Em paralelo cada divisão é independente — apagas o quarto e a cozinha fica." },
    { "q": "A 'força' que a pilha usa para empurrar a corrente mede-se em…", "layout": "grid",
      "options": [ { "t": "volts (V)", "emoji": "🔋", "correct": true }, { "t": "litros" }, { "t": "graus" } ],
      "explain": "A tensão mede-se em volts; a corrente em amperes; a resistência em ohms." },
    { "q": "Para que serve um fusível?", "layout": "grid",
      "options": [ { "t": "Fundir-se primeiro se passar corrente a mais, protegendo a casa", "emoji": "🛡️", "correct": true }, { "t": "Dar mais luz" }, { "t": "Carregar a pilha" } ],
      "explain": "O fusível é um fio de segurança que se funde antes de haver perigo." }
  ]
}
```
