# Problemas de juntar e completar 🧩

> [!NOTE] **O que vais aprender** 👀 Vais resolver **probleminhas com histórias**: de **juntar** (ganhas coisas), de **retirar** (perdes coisas), de **comparar** («quantos mais?») e de **completar** («quantos faltam para…?»). Um passo de cada vez, como um detetive! 🕵️

Um problema é uma **história pequenina com uma pergunta** lá dentro. A tua missão é descobrir **o que a história te pede** — e depois a conta faz-se quase sozinha! Vamos conhecer as quatro histórias que existem. 📖

## As quatro histórias dos problemas 📚

```keyvalue
[
  { "k": "Juntar ➕", "v": "chega mais qualquer coisa — «o avô deu-me mais 2» 🎁" },
  { "k": "Retirar ➖", "v": "vai-se embora qualquer coisa — «comi 3» 😋" },
  { "k": "Comparar ⚖️", "v": "dois meninos, quem tem MAIS? «quantos mais do que eu?»" },
  { "k": "Completar 🎯", "v": "quanto FALTA para lá chegar? «quantos faltam para 10?»" }
]
```

## Juntar e retirar 🎁😋

Estas já são tuas conhecidas! Se a história diz que **chega mais**, é somar. Se diz que **sai**, é subtrair.

- A Ana tem 🍪🍪🍪 e a avó dá-lhe 🍪🍪. **3 + 2 = 5** bolachas! ➕
- O Rui tinha 🎈🎈🎈🎈🎈 e rebentaram 🎈🎈. **5 − 2 = 3** balões. ➖

## Comparar: quantos mais? ⚖️

Agora há **dois meninos** na história — e a pergunta é a **diferença** entre eles. Olha:

O Pedro tem 🚗🚗🚗🚗🚗 (5 carrinhos) e a Marta tem 🚗🚗🚗 (3). **Quantos carrinhos tem o Pedro a mais?**

Põe os carrinhos em filas, um por baixo do outro, e vê **o que sobra na fila grande**:

```compare
[
  { "title": "Pedro 🚗🚗🚗🚗🚗", "rows": [
    { "label": "Tem", "value": "5 carrinhos" },
    { "label": "Emparelhados", "value": "3 fazem par com os da Marta" },
    { "label": "Sobram", "value": "2 sem par — a diferença!", "highlight": true }
  ] },
  { "title": "Marta 🚗🚗🚗", "rows": [
    { "label": "Tem", "value": "3 carrinhos" },
    { "label": "Emparelhados", "value": "os 3 têm par" },
    { "label": "Sobram", "value": "0" }
  ] }
]
```

«Quantos mais?» resolve-se com uma conta de **menos**: 5 − 3 = **2**. 🤯

## Completar: quantos faltam? 🎯

Na história de **completar**, sabes onde estás e sabes onde queres chegar — falta saber **o caminho que falta**.

A Inês quer 10 cromos para encher a caderneta e já tem 7. **Quantos faltam?**

```tenframe
{ "count": 7, "emoji": "⭐", "title": "7 cromos colados, 3 casas vazias: faltam 3!" }
```

A conta é «7 para chegar a 10»: **7 + ? = 10** → faltam **3**. (Os amigos do 10 ajudam aqui! 👫)

## Exemplo passo a passo 1: uma história de juntar 🔍

*«O Tomás tem 4 peixinhos 🐠 no aquário. No dia dos anos recebeu mais 3. Quantos peixinhos tem agora?»*

```steps
[
  { "title": "1. Ouve a história", "body": "tinha 4 🐠 e RECEBEU mais 3 — chegaram peixinhos novos!", "icon": "👂" },
  { "title": "2. Que história é?", "body": "chega mais → é JUNTAR ➕", "icon": "🎁" },
  { "title": "3. Faz a conta", "body": "4 + 3 = 7 (começa no 4 e conta: 5, 6, 7)", "icon": "✏️" },
  { "title": "4. Responde à pergunta", "body": "o Tomás tem agora 7 peixinhos! 🐠🎉", "icon": "🎉" }
]
```

## Exemplo passo a passo 2: uma história de completar 🔍

*«A equipa precisa de 8 jogadores ⚽ e só chegaram 6. Quantos jogadores faltam?»*

```steps
[
  { "title": "1. Ouve a história", "body": "quero chegar a 8, já tenho 6", "icon": "👂" },
  { "title": "2. Que história é?", "body": "«quantos FALTAM?» → é COMPLETAR 🎯", "icon": "🎯" },
  { "title": "3. Conta a subir", "body": "do 6 para o 8: 7, 8 — dei 2 passos! 🐾", "icon": "🪜" },
  { "title": "4. Responde à pergunta", "body": "faltam 2 jogadores! ⚽🎉", "icon": "🎉" }
]
```

> **Truque:** procura as **palavras-pista** da história: «deu-me mais», «recebi» → **juntar** ➕; «comeu», «foi-se embora», «perdeu» → **retirar** ➖; «quantos **mais**?» → **comparar** ⚖️; «quantos **faltam**?» → **completar** 🎯. A palavra certa diz-te a conta certa! 🗝️

> [!TIP] **Para saberes mais** 🌱 Comparar e completar resolvem-se as duas com a **mesma ideia**: a **diferença** entre dois números — a distância entre eles na reta numérica! Por isso «o Pedro tem 2 a mais» e «faltam 2 para a Inês» usam a mesma conta. Os matemáticos adoram quando duas perguntas diferentes têm o mesmo segredo. 🤫

## Vamos praticar 🎈

```quiz
{
  "id": "mat-1-problemas-pratica",
  "questions": [
    { "q": "Tens 🍬🍬 e a tia dá-te 🍬🍬🍬. Com quantos ficas?", "layout": "grid", "level": 1,
      "hint": "Chega mais → é juntar! ➕",
      "options": [ { "t": "5", "emoji": "5️⃣", "correct": true }, { "t": "4", "emoji": "4️⃣", "feedback": "Quase! Conta outra vez: 2 que tens mais 3 que a tia deu = 5.", "tag": "soma-calculo" }, { "t": "6", "emoji": "6️⃣", "feedback": "Contaste a mais. 2 + 3 = 5 rebuçados.", "tag": "soma-calculo" } ],
      "explain": "Juntar: 2 + 3 = 5 rebuçados." },
    { "q": "🐦🐦🐦🐦 estavam na árvore e voaram 🐦🐦. Quantos ficaram?", "layout": "grid", "level": 1,
      "hint": "Foram-se embora → é retirar! ➖",
      "options": [ { "t": "2", "emoji": "2️⃣", "correct": true }, { "t": "3", "emoji": "3️⃣", "feedback": "Voaram 2, não 1. Tira os 2 dos 4: 4 − 2 = 2 ficaram.", "tag": "subtracao-calculo" }, { "t": "6", "emoji": "6️⃣", "feedback": "Voaram embora, por isso ficam menos. 4 − 2 = 2.", "tag": "problema-operacao-errada" } ],
      "explain": "Retirar: 4 − 2 = 2 passarinhos." },
    { "q": "«Quantos FALTAM para 10?» é uma história de…", "layout": "grid", "level": 1,
      "hint": "Sabes onde queres chegar; falta o caminho. 🎯",
      "options": [ { "t": "completar", "emoji": "🎯", "correct": true }, { "t": "retirar", "emoji": "➖", "feedback": "Não tiras nada — queres CHEGAR a 10. «Quantos faltam» é completar.", "tag": "problema-operacao-errada" }, { "t": "juntar", "emoji": "➕", "feedback": "Não juntas dois grupos — queres saber o que falta para 10: é completar.", "tag": "problema-operacao-errada" } ],
      "explain": "«Quantos faltam» é completar — descobrir o caminho que falta." },
    { "q": "A Sara tem 6 🧸 e o Luís tem 4 🧸. Quantos tem a Sara A MAIS?", "layout": "grid", "level": 2,
      "hint": "Faz pares: os ursinhos sem par são a diferença.",
      "options": [ { "t": "2", "emoji": "2️⃣", "correct": true }, { "t": "10", "emoji": "🔟", "feedback": "10 é juntar os dois. «Quantos a mais» é tirar: 6 − 4 = 2.", "tag": "problema-operacao-errada" }, { "t": "4", "emoji": "4️⃣", "feedback": "4 é o que o Luís tem. A diferença é 6 − 4 = 2 a mais.", "tag": "problema-operacao-errada" } ],
      "explain": "Comparar: 6 − 4 = 2 ursinhos a mais." },
    { "q": "A caderneta leva 10 cromos e tens 8. Quantos faltam?", "layout": "grid", "level": 2,
      "hint": "8 e quem são amigos do 10? 👫",
      "options": [ { "t": "2", "emoji": "2️⃣", "correct": true }, { "t": "8", "emoji": "8️⃣", "feedback": "8 é o que já tens. Falta o caminho até 10: 8 + 2 = 10, faltam 2.", "tag": "problema-operacao-errada" }, { "t": "1", "emoji": "1️⃣", "feedback": "8 + 1 dá só 9, ainda falta. Para chegar a 10 faltam 2.", "tag": "soma-calculo" } ],
      "explain": "Completar: 8 + 2 = 10 — faltam 2 cromos." },
    { "q": "«O gato comeu 2 sardinhas» — que conta usas?", "layout": "grid", "level": 1,
      "hint": "Comer é desaparecer… 😋",
      "options": [ { "t": "menos", "emoji": "➖", "correct": true }, { "t": "mais", "emoji": "➕", "feedback": "Comer faz desaparecer, não chegar mais. Por isso é uma conta de menos.", "tag": "problema-operacao-errada" } ],
      "explain": "Comeu → foram-se embora → subtrair." },
    { "q": "Há 5 pratos 🍽️ e só 3 garfos 🍴. Quantos garfos faltam?", "layout": "grid", "level": 2,
      "hint": "Do 3 para o 5, quantos passos dás?",
      "options": [ { "t": "2", "emoji": "2️⃣", "correct": true }, { "t": "3", "emoji": "3️⃣", "feedback": "3 é o que já tens. Do 3 ao 5 dás 2 passos: faltam 2 garfos.", "tag": "problema-operacao-errada" }, { "t": "8", "emoji": "8️⃣", "feedback": "8 é juntar tudo. Aqui queres o que falta: do 3 ao 5 faltam 2.", "tag": "problema-operacao-errada" } ],
      "explain": "3 + 2 = 5 — faltam 2 garfos para cada prato ter o seu." },
    { "q": "O Rui tem 3 🍓 e a Bia tem 7 🍓. Quem tem mais, e quantos a mais?", "layout": "list", "level": 2,
      "hint": "Compara: 7 − 3 = ?",
      "options": [ { "t": "a Bia, 4 a mais", "emoji": "🍓", "correct": true }, { "t": "o Rui, 4 a mais", "feedback": "O Rui tem menos (3). Quem tem mais é a Bia, com 7: 7 − 3 = 4 a mais.", "tag": "comparar-numeros" }, { "t": "a Bia, 10 a mais", "feedback": "10 é juntar os dois. A diferença é 7 − 3 = 4 a mais.", "tag": "problema-operacao-errada" } ],
      "explain": "7 − 3 = 4: a Bia tem 4 morangos a mais." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-1-problemas-final",
  "final": true,
  "title": "Problemas de juntar e completar",
  "questions": [
    { "q": "Tinhas 3 🚗 e o pai deu-te mais 2. Com quantos ficaste?", "layout": "grid", "level": 1,
      "hint": "Chega mais → juntar ➕",
      "options": [ { "t": "5", "correct": true }, { "t": "4", "feedback": "Quase! Conta outra vez: 3 que tinhas mais 2 que o pai deu = 5.", "tag": "soma-calculo" }, { "t": "6", "feedback": "Contaste a mais. 3 + 2 = 5 carrinhos.", "tag": "soma-calculo" } ],
      "explain": "Juntar: 3 + 2 = 5 carrinhos." },
    { "q": "Havia 6 🧁 e comeram-se 2. Quantos ficaram?", "layout": "grid", "level": 1,
      "hint": "Comeram-se → retirar ➖",
      "options": [ { "t": "4", "correct": true }, { "t": "5", "feedback": "Comeram-se 2, não 1. Tira os 2 dos 6: 6 − 2 = 4.", "tag": "subtracao-calculo" }, { "t": "8", "feedback": "Comer faz ficar menos, não mais. 6 − 2 = 4 queques.", "tag": "problema-operacao-errada" } ],
      "explain": "Retirar: 6 − 2 = 4 queques." },
    { "q": "«Recebi mais 3 cromos» — que conta usas?", "layout": "grid", "level": 1,
      "hint": "Receber é ganhar! 🎁",
      "options": [ { "t": "mais", "emoji": "➕", "correct": true }, { "t": "menos", "emoji": "➖", "feedback": "Receber é ganhar, fica com mais. Por isso é uma conta de mais.", "tag": "problema-operacao-errada" } ],
      "explain": "Receber → chega mais → somar." },
    { "q": "O mealheiro precisa de 10 moedas e tem 6. Quantas faltam?", "layout": "grid", "level": 2,
      "hint": "6 e quem são amigos do 10? 👫",
      "options": [ { "t": "4", "correct": true }, { "t": "6", "feedback": "6 é o que já tem. Falta o caminho até 10: 6 + 4 = 10, faltam 4.", "tag": "problema-operacao-errada" }, { "t": "3", "feedback": "6 + 3 dá só 9, ainda falta. Para chegar a 10 faltam 4.", "tag": "soma-calculo" } ],
      "explain": "Completar: 6 + 4 = 10 — faltam 4 moedas." },
    { "q": "A Rita tem 8 🖍️ e o Gil tem 5 🖍️. Quantos tem a Rita a mais?", "layout": "grid", "level": 2,
      "hint": "«Quantos mais» resolve-se com uma conta de menos!",
      "options": [ { "t": "3", "correct": true }, { "t": "13", "feedback": "13 é juntar os dois. «Quantos a mais» é tirar: 8 − 5 = 3.", "tag": "problema-operacao-errada" }, { "t": "5", "feedback": "5 é o que o Gil tem. A diferença é 8 − 5 = 3 a mais.", "tag": "problema-operacao-errada" } ],
      "explain": "Comparar: 8 − 5 = 3 lápis a mais." },
    { "q": "Para encher a caixa de 10 ⭐ já tens 9. Quantas faltam?", "layout": "grid", "level": 2,
      "hint": "Estás mesmo quase lá…",
      "options": [ { "t": "1", "correct": true }, { "t": "9", "feedback": "9 é o que já tens. Falta só o caminho até 10: 9 + 1 = 10, falta 1.", "tag": "problema-operacao-errada" }, { "t": "2", "feedback": "Estás mesmo quase lá! Do 9 ao 10 falta só 1 estrela.", "tag": "soma-calculo" } ],
      "explain": "9 + 1 = 10 — falta só 1 estrela." },
    { "q": "Que palavras-pista dizem «é uma história de COMPLETAR»?", "layout": "list", "level": 2,
      "hint": "É a pergunta do caminho que falta. 🎯",
      "options": [ { "t": "«quantos faltam para…?»", "emoji": "🎯", "correct": true }, { "t": "«comeu», «perdeu»", "feedback": "Essas pistas são de retirar. Completar é «quantos faltam para…?».", "tag": "problema-palavra-chave" }, { "t": "«deu-me mais»", "feedback": "Essa pista é de juntar. Completar é «quantos faltam para…?».", "tag": "problema-palavra-chave" } ],
      "explain": "«Quantos faltam» pede o que falta para lá chegar — completar." },
    { "q": "O cão tem 4 🦴 e quer 7. Quantos ossos faltam?", "layout": "grid", "level": 3,
      "hint": "Conta a subir: do 4 até ao 7. 🐾",
      "options": [ { "t": "3", "correct": true }, { "t": "4", "feedback": "4 é o que já tem. Do 4 ao 7 dás 3 passos: faltam 3 ossos.", "tag": "problema-operacao-errada" }, { "t": "11", "feedback": "11 é juntar 4 e 7. Aqui queres o que falta: do 4 ao 7 faltam 3.", "tag": "problema-operacao-errada" } ],
      "explain": "Do 4 ao 7 vão 3 passos: 5, 6, 7." }
  ]
}
```
