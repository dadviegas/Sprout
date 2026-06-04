# Criar e testar pequenos algoritmos 🧩

> [!NOTE] **O que vais aprender** 👀 Vais aprender a pensar como um programador: partir um problema em passos, escrever um algoritmo e — muito importante — testá-lo à mão para encontrar e corrigir erros.

Já sabes que um **algoritmo** é uma lista de passos. Agora vais aprender a *criar* o teu e a *testá-lo*. Programar não é acertar à primeira: é escrever, testar, ver onde corre mal e melhorar.

```figure
{ "emoji": "🧭", "caption": "Criar um algoritmo é como traçar um caminho num mapa: escreves os passos e depois segues com o dedo para ver se chegas mesmo ao destino." }
```

## As ideias do pensamento computacional

```keyvalue
[
  { "k": "Decompor", "v": "partir um problema grande em passos pequenos" },
  { "k": "Padrão", "v": "um pedaço que se repete e podes reaproveitar" },
  { "k": "Algoritmo", "v": "os passos pela ordem certa" },
  { "k": "Testar à mão", "v": "seguir os passos como se fosses o computador" },
  { "k": "Depurar", "v": "encontrar o erro e corrigi-lo" }
]
```

## Um exemplo: guiar o robô até à estrela ⭐

O robô anda numa grelha e só percebe duas ordens: **andar 1** (uma casa em frente) e **virar à direita**. Queremos levá-lo da casa de partida até à estrela, que está 2 casas em frente e depois 1 à direita. Vamos escrever o algoritmo:

```steps
[
  { "title": "1. Andar 1", "body": "O robô avança uma casa." },
  { "title": "2. Andar 1", "body": "Avança outra casa: já está mesmo em frente da estrela." },
  { "title": "3. Virar à direita", "body": "Agora aponta para a estrela." },
  { "title": "4. Andar 1", "body": "Avança a última casa e chega à estrela." }
]
```

## Testar à mão e corrigir

Para ter a certeza, seguimos os passos com o dedo, como se fôssemos o robô. E se nos enganarmos na ordem? Vê o que acontece — e como se corrige:

```compare
[
  { "title": "Algoritmo com erro", "rows": [
    { "label": "Passos", "value": "virar à direita, andar, andar, andar" },
    { "label": "Testar à mão", "value": "o robô vira cedo demais e foge para o lado errado" },
    { "label": "Conclusão", "value": "a ordem dos passos está trocada" }
  ] },
  { "title": "Algoritmo corrigido", "rows": [
    { "label": "Passos", "value": "andar, andar, virar à direita, andar", "highlight": true },
    { "label": "Testar à mão", "value": "o robô chega mesmo à estrela", "highlight": true },
    { "label": "Conclusão", "value": "a ordem certa resolve o problema", "highlight": true }
  ] }
]
```

> [!TIP] **Truque do detetive** Segue o algoritmo com o dedo, um passo de cada vez, como se fosses tu o computador. No primeiro passo em que o dedo faz algo errado, encontraste o *bug*.

## Quando um passo se repete: usa um padrão

Se o robô tivesse de andar 5 casas, não precisas de escrever «andar» cinco vezes. Vês o **padrão** e dizes: **repete 5 vezes: andar 1**. Menos passos, menos erros. Criar um algoritmo é sempre o mesmo método:

```steps
[
  { "title": "1. Decompor", "body": "Que ordens simples resolvem o problema?" },
  { "title": "2. Procurar padrões", "body": "Há algo que se repete? Usa «repete»." },
  { "title": "3. Escrever o algoritmo", "body": "Os passos pela ordem certa." },
  { "title": "4. Testar à mão", "body": "Segue com o dedo e vê se chegas ao fim." },
  { "title": "5. Corrigir", "body": "Muda um passo de cada vez e testa outra vez." }
]
```

## Para saberes mais 🌱

O pensamento computacional não vive só nos computadores. Quando o GPS te encontra o caminho mais curto até à praia, está a correr um **algoritmo** que experimenta caminhos e escolhe o melhor — e fá-lo em frações de segundo, testando milhares de hipóteses muito mais depressa do que qualquer pessoa conseguiria.

## 🎯 Questionário final

```quiz
{
  "id": "tic-6-algoritmos-final",
  "final": true,
  "title": "Criar e testar algoritmos",
  "questions": [
    { "q": "«Decompor» um problema é…", "layout": "grid",
      "options": [ { "t": "parti-lo em passos pequenos", "emoji": "🧩", "correct": true }, { "t": "apagá-lo" }, { "t": "pintá-lo de azul" } ],
      "explain": "Problemas grandes resolvem-se aos bocadinhos." },
    { "q": "Testar um algoritmo «à mão» é…", "layout": "grid",
      "options": [ { "t": "seguir os passos como se fosses o computador", "emoji": "🖐️", "correct": true }, { "t": "pedir a outra pessoa para adivinhar" }, { "t": "fechar os olhos e esperar" } ],
      "explain": "Seguir os passos mostra exatamente onde falha." },
    { "q": "Quando encontras um passo errado, encontraste um…", "layout": "grid",
      "options": [ { "t": "bug (erro)", "emoji": "🐞", "correct": true }, { "t": "prémio" }, { "t": "padrão novo" } ],
      "explain": "Um bug é um erro no algoritmo. Depurar é corrigi-lo." },
    { "q": "Se um passo se repete muitas vezes, é melhor usar…", "layout": "grid",
      "options": [ { "t": "uma repetição: «repete X vezes»", "emoji": "🔁", "correct": true }, { "t": "muitos passos iguais escritos um a um" }, { "t": "nenhum passo" } ],
      "explain": "A repetição encurta o algoritmo e dá menos erros." },
    { "q": "O robô não chegou à estrela. O que fazes primeiro?", "layout": "grid",
      "options": [ { "t": "seguir os passos com o dedo para ver onde falha", "emoji": "🔍", "correct": true }, { "t": "apagar tudo e desistir" }, { "t": "trocar de robô" } ],
      "explain": "Primeiro descobre-se onde está o erro." },
    { "q": "Porque é melhor corrigir um passo de cada vez?", "layout": "grid",
      "options": [ { "t": "para perceberes o que resolveu o erro", "emoji": "🛠️", "correct": true }, { "t": "para demorar mais tempo" }, { "t": "para gastar bateria" } ],
      "explain": "Mudar tudo ao mesmo tempo esconde o que funcionou." },
    { "q": "Um «padrão» num algoritmo é…", "layout": "grid",
      "options": [ { "t": "um pedaço que se repete e podes reaproveitar", "emoji": "🔂", "correct": true }, { "t": "um desenho bonito" }, { "t": "uma palavra-passe" } ],
      "explain": "Ver padrões ajuda a escrever menos e melhor." },
    { "q": "Programar bem é sobretudo…", "layout": "grid",
      "options": [ { "t": "escrever, testar e melhorar", "emoji": "✅", "correct": true }, { "t": "acertar sempre à primeira" }, { "t": "nunca cometer erros" } ],
      "explain": "Os erros fazem parte: o segredo é testar e corrigir." }
  ]
}
```
