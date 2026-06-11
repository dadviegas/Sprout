# Dividir passo a passo ➗

> [!NOTE] **O que vais aprender** 👀 Vais dominar a **divisão em pé**: a ideia de **repartir**, o algoritmo com a regra de ouro **«baixa o algarismo»**, o que significa o **resto**, divisões por **2 algarismos** (260 : 12!) e a prova dos nove: **conferir multiplicando ao contrário**. 🏆

Dividir é **repartir em partes iguais** — ou perguntar «**quantas vezes
cabe?**». A conta em pé responde a essa pergunta um bocadinho de cada vez.
Carrega no **+** dentro de cada conta para veres o passo seguinte, e no 🔊 para
ouvires. ✨

```summary
{
  "learn": [
    "A ideia: repartir em partes iguais",
    "O algoritmo: cabe → multiplica → tira → baixa o algarismo",
    "O resto: o que sobra (e é sempre menor que o divisor!)",
    "Dividir por 2 algarismos",
    "Conferir: quociente × divisor + resto = o número inicial"
  ],
  "examples": ["12 : 3", "156 : 4", "175 : 4", "260 : 12"],
  "say": "Vais aprender a dividir passo a passo: repartir, baixar o algarismo, perceber o resto, dividir por dois algarismos e conferir a conta."
}
```

## A ideia: repartir 🍪

Antes da conta, a história: tens **12 bolachas** e **3 amigos**. Dás uma a cada
um, outra a cada um… até acabarem. Cada amigo fica com **4**: é isto que
12 : 3 = 4 quer dizer!

```keyvalue
[
  { "k": "Dividendo (12)", "v": "o que vais repartir 🍪", "icon": "grid" },
  { "k": "Divisor (3)", "v": "por quantos repartes 👫 — escreve-se à direita da barra", "icon": "people" },
  { "k": "Quociente (4)", "v": "quanto calha a cada um 🎁 — aparece por baixo do divisor", "icon": "star" },
  { "k": "Resto", "v": "o que sobra e já não dá para repartir 🤏", "icon": "minus" }
]
```

## O algoritmo: cabe → multiplica → tira → baixa 🟢

Para números grandes há uma dança de 4 passos que se repete: **cabe?**
(quantas vezes o divisor cabe), **multiplica**, **tira** e **baixa o algarismo**
seguinte. Vê o 156 : 4 a dançar:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "div", "a": 156, "b": 4 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. O 1 chega?", "body": "1 não dá para dividir por 4 — junto-lhe o algarismo seguinte: 15 🔍", "icon": "🔍" },
  { "title": "2. Cabe → multiplica → tira", "body": "4 cabe 3 vezes em 15. Escrevo 3 na resposta; 3 × 4 = 12; 15 − 12 = 3", "icon": "✏️" },
  { "title": "3. BAIXA o algarismo", "body": "baixo o 6 para junto do 3 → fica 36 ⬇️", "icon": "⬇️" },
  { "title": "4. Outra vez a dança", "body": "4 cabe 9 vezes em 36. Escrevo 9; 9 × 4 = 36; 36 − 36 = 0", "icon": "✏️" },
  { "title": "5. Resultado", "body": "156 : 4 = 39, resto 0 — repartiu certinho! 🎉", "icon": "🎉" }
] }
```

> A regra de ouro é **baixa o algarismo**: depois de cada subtração, desce o
> algarismo seguinte do dividendo para junto do que sobrou — e a dança
> recomeça. ⬇️

## O resto: o que sobra 🟡

Nem tudo se reparte certinho. **175 : 4**: cada um recebe 43… e sobram **3** que
já não chegam para dar 1 a cada um. Isso é o **resto**:

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "div", "a": 175, "b": 4 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Primeira dança", "body": "17 a dividir por 4: cabe 4 vezes (4×4=16); 17 − 16 = 1", "icon": "✏️" },
  { "title": "2. Baixa o 5", "body": "desce o 5 para junto do 1 → 15 ⬇️", "icon": "⬇️" },
  { "title": "3. Segunda dança", "body": "15 a dividir por 4: cabe 3 vezes (3×4=12); 15 − 12 = 3", "icon": "✏️" },
  { "title": "4. Já não há que baixar", "body": "acabaram os algarismos: o 3 que sobrou é o RESTO", "icon": "🤏" },
  { "title": "5. Resultado", "body": "175 : 4 = 43, resto 3 — quarenta e três para cada um e sobram três 🎉", "icon": "🎉" }
] }
```

> [!WARNING] **O resto tem de ser SEMPRE menor que o divisor!** Se ao dividir
> por 4 te sobrar 4, 5 ou mais, é sinal de que o divisor ainda **cabia mais uma
> vez** — volta atrás e aumenta o número da resposta. Resto ≥ divisor = conta
> mal feita. 🚨

## Chefe final: dividir por 2 algarismos 🟠

A dança é **exatamente a mesma** — só que agora perguntas quantas vezes cabe um
número de **dois algarismos**. Vê o 260 : 12 (as tabuadas ajudam: 12, 24, 36…):

```contaarmada
{
  "practice": false,
  "examples": [ { "op": "div", "a": 260, "b": 12 } ]
}
```

```steps
{ "reveal": true, "items": [
  { "title": "1. O 2 chega? E o 26?", "body": "2 não dá para dividir por 12; com o algarismo seguinte fica 26 — esse já dá! 🔍", "icon": "🔍" },
  { "title": "2. Cabe → multiplica → tira", "body": "12 cabe 2 vezes em 26. Escrevo 2; 2 × 12 = 24; 26 − 24 = 2", "icon": "✏️" },
  { "title": "3. Baixa o 0", "body": "desce o 0 para junto do 2 → 20 ⬇️", "icon": "⬇️" },
  { "title": "4. Outra dança", "body": "12 cabe 1 vez em 20. Escrevo 1; 1 × 12 = 12; 20 − 12 = 8", "icon": "✏️" },
  { "title": "5. Resultado", "body": "260 : 12 = 21, resto 8 — e 8 < 12, está tudo bem! 🎉", "icon": "🎉" }
] }
```

## A prova do detetive: multiplicar ao contrário 🕵️

A divisão confere-se com a operação inversa, a **multiplicação**:
**quociente × divisor + resto** tem de dar o número com que começaste.

```math
{ "expr": "21 × 12 + 8 = 252 + 8 = 260", "say": "vinte e um vezes doze mais oito é duzentos e cinquenta e dois mais oito: duzentos e sessenta — a conta estava certa" }
```

```steps
{ "reveal": true, "items": [
  { "title": "1. Pega no quociente", "body": "260 : 12 deu quociente 21 e resto 8", "icon": "📋" },
  { "title": "2. Multiplica ao contrário", "body": "21 × 12 = 252 ✖️", "icon": "✖️" },
  { "title": "3. Soma o resto", "body": "252 + 8 = 260 ➕", "icon": "➕" },
  { "title": "4. Compara", "body": "deu o 260 inicial → a divisão está certa! ✅", "icon": "🎉" }
] }
```

> **Para saberes mais 🌱** Na divisão **o zero é proibido num só lugar**: não se
> pode dividir **por** zero! Repartir 12 bolachas por zero amigos não quer dizer
> nada — por isso os matemáticos dizem que 12 : 0 «não está definido». Já
> 0 : 12 = 0, claro: repartir zero bolachas dá zero a toda a gente. 🚫

## Agora treinas tu! ✏️

Resolve estas divisões e carrega em **«Verificar»** — escreve o quociente e, se
houver, o resto. Termina com duas de divisor de 2 algarismos:

```contaarmada
{
  "title": "A tua zona de treino",
  "practice": false,
  "examplesLayout": "rows",
  "examples": [
    { "op": "div", "a": 96, "b": 4 },
    { "op": "div", "a": 138, "b": 6 },
    { "op": "div", "a": 245, "b": 7 },
    { "op": "div", "a": 173, "b": 5 },
    { "op": "div", "a": 192, "b": 12 },
    { "op": "div", "a": 350, "b": 15 }
  ]
}
```

## Vamos praticar 🎈

```quiz
{
  "id": "mat-4-dividir-pe-pratica",
  "questions": [
    { "q": "Em 156 : 4, o 4 chama-se…", "layout": "grid",
      "options": [ { "t": "divisor", "emoji": "➗", "correct": true }, { "t": "quociente" }, { "t": "resto" } ],
      "explain": "O divisor é por quanto divides — escreve-se à direita da barra." },
    { "q": "A dança da divisão é…", "layout": "grid",
      "options": [ { "t": "cabe → multiplica → tira → baixa", "emoji": "💃", "correct": true }, { "t": "soma → tira → baixa" }, { "t": "multiplica → soma → sobe" } ],
      "explain": "Quantas vezes cabe, multiplicas, subtrais e baixas o algarismo seguinte." },
    { "q": "Quanto é 156 : 4?", "layout": "grid",
      "options": [ { "t": "39", "emoji": "🎉", "correct": true }, { "t": "36" }, { "t": "41" } ],
      "explain": "15:4 dá 3 (sobra 3); baixa o 6 → 36:4 = 9 → 39." },
    { "q": "175 : 4 dá 43 e resto 3. O resto quer dizer que…", "layout": "grid",
      "options": [ { "t": "sobram 3 que já não dá para repartir", "emoji": "🤏", "correct": true }, { "t": "a conta está errada" }, { "t": "cada um recebe mais 3" } ],
      "explain": "43 para cada um e 3 ficam de fora — menos que o divisor, claro." },
    { "q": "Dividiste por 6 e o resto deu 7. O que aconteceu?", "layout": "grid",
      "options": [ { "t": "a conta está mal — o 6 ainda cabia mais uma vez", "emoji": "🚨", "correct": true }, { "t": "está tudo bem" }, { "t": "o resto pode ser qualquer número" } ],
      "explain": "O resto tem de ser SEMPRE menor que o divisor." },
    { "q": "Quanto é 260 : 12?", "layout": "grid",
      "options": [ { "t": "21, resto 8", "emoji": "🏆", "correct": true }, { "t": "22, resto 0" }, { "t": "20, resto 20" } ],
      "explain": "26:12 dá 2 (sobra 2); baixa o 0 → 20:12 dá 1, resto 8." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-4-dividir-pe-final",
  "final": true,
  "title": "Dividir passo a passo",
  "questions": [
    { "q": "Dividir 12 : 3 é…", "layout": "grid",
      "options": [ { "t": "repartir 12 em 3 partes iguais", "emoji": "🍪", "correct": true }, { "t": "tirar 3 a 12" }, { "t": "juntar 12 com 3" } ],
      "explain": "Cada parte fica com 4 — é a pergunta «quantas vezes cabe?»." },
    { "q": "Numa conta de dividir, o divisor escreve-se…", "layout": "grid",
      "options": [ { "t": "à direita da barra", "emoji": "➗", "correct": true }, { "t": "por baixo do dividendo" }, { "t": "onde houver espaço" } ],
      "explain": "Dividendo à esquerda, divisor à direita, quociente por baixo do divisor." },
    { "q": "Depois de subtrair, o passo seguinte é…", "layout": "grid",
      "options": [ { "t": "baixar o algarismo seguinte", "emoji": "⬇️", "correct": true }, { "t": "subir um algarismo" }, { "t": "acabar a conta" } ],
      "explain": "Baixa-se o próximo algarismo do dividendo e a dança recomeça." },
    { "q": "Quanto é 156 : 4?", "layout": "grid",
      "options": [ { "t": "39", "correct": true }, { "t": "38" }, { "t": "44" } ],
      "explain": "15:4=3 (sobra 3), baixa o 6, 36:4=9 → 39." },
    { "q": "Quanto é 175 : 4?", "layout": "grid",
      "options": [ { "t": "43, resto 3", "emoji": "🤏", "correct": true }, { "t": "43, resto 0" }, { "t": "44, resto 1" } ],
      "explain": "17:4=4 (sobra 1), baixa o 5, 15:4=3, resto 3." },
    { "q": "O resto de uma divisão por 12 pode ser…", "layout": "grid",
      "options": [ { "t": "qualquer número de 0 a 11", "emoji": "✅", "correct": true }, { "t": "12" }, { "t": "qualquer número" } ],
      "explain": "O resto é sempre MENOR que o divisor — senão ainda cabia mais uma vez." },
    { "q": "Quanto é 260 : 12?", "layout": "grid",
      "options": [ { "t": "21, resto 8", "correct": true }, { "t": "12, resto 2" }, { "t": "26, resto 0" } ],
      "explain": "2×12=24, 26−24=2; baixa o 0 → 20; 1×12=12, 20−12=8 → 21 r 8." },
    { "q": "Como conferes que 260 : 12 = 21 com resto 8?", "layout": "grid",
      "options": [ { "t": "21 × 12 + 8 = 260 ✓", "emoji": "🕵️", "correct": true }, { "t": "21 + 12 + 8" }, { "t": "260 × 12" } ],
      "explain": "Quociente × divisor + resto tem de dar o dividendo." }
  ]
}
```
