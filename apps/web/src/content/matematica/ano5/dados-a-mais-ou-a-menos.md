# Problemas com dados a mais ou em falta 🔎

> [!NOTE] **O que vais aprender** 👀 Vais aprender a descobrir que dados são necessários, que dados são distrações e quando falta informação para resolver um problema.

Nem todos os números de um enunciado são para usar. Às vezes há dados a mais. Outras vezes falta um dado importante.

```compare
[
  { "title": "Dados necessários", "rows": [
    { "label": "Servem para", "value": "responder à pergunta", "highlight": true },
    { "label": "Exemplo", "value": "preço de cada bilhete e número de bilhetes" }
  ] },
  { "title": "Dados a mais", "rows": [
    { "label": "Servem para", "value": "distrair ou dar contexto" },
    { "label": "Exemplo", "value": "a cor dos bilhetes, se a pergunta é sobre preço" }
  ] }
]
```

## Método dos três filtros

```steps
[
  { "title": "1. Qual é a pergunta?", "body": "Sublinha exatamente o que tens de descobrir." },
  { "title": "2. Que dados ajudam?", "body": "Marca apenas os números ligados à pergunta." },
  { "title": "3. Falta alguma coisa?", "body": "Se não há dados suficientes, não inventes: diz o que falta." }
]
```

> [!TIP] **A mala de viagem** 🧳 Imagina que vais resolver o problema numa viagem e só podes levar o que cabe na mala: leva só os dados que respondem à pergunta. A cor, o nome ou o peso da mochila ficam em casa — são bagagem a mais!

## Para saberes mais 🌱

Os cientistas e os computadores fazem exatamente isto a sério: chama-se *limpar os dados*. Antes de qualquer cálculo importante, há quem passe horas a deitar fora números que não servem (ou que estão errados) — porque uma máquina, tal como tu, só dá boas respostas se receber bons dados. 🤖

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-dados-mais-menos-final",
  "final": true,
  "title": "Dados a mais ou em falta",
  "questions": [
    { "q": "Num problema, o primeiro passo é perceber…", "layout": "grid",
      "options": [ { "t": "a pergunta", "emoji": "❓", "correct": true }, { "t": "a cor da folha", "feedback": "A cor da folha não muda o problema. O primeiro passo é perceber a pergunta.", "tag": "problema-metodo" }, { "t": "o maior número apenas", "feedback": "O maior número pode até ser um dado a mais. Começa por perceber a pergunta.", "tag": "problema-metodo" } ],
      "explain": "A pergunta diz que dados interessam." },
    { "q": "Dados a mais são dados que…", "layout": "grid",
      "options": [ { "t": "não são necessários para responder", "emoji": "🎯", "correct": true }, { "t": "resolvem sempre tudo", "feedback": "Pelo contrário: dados a mais não ajudam a resolver, são distrações. São os que não precisas para responder.", "tag": "problema-dado-a-mais" }, { "t": "devem ser todos multiplicados", "feedback": "Não há que multiplicar tudo. Dados a mais são os que não são necessários para responder à pergunta.", "tag": "problema-dado-a-mais" } ],
      "explain": "Nem todos os dados entram nas contas." },
    { "q": "Se falta informação, deves…", "layout": "grid",
      "options": [ { "t": "dizer que dado falta", "emoji": "🔎", "correct": true }, { "t": "inventar um número", "feedback": "Inventar um número dá uma resposta falsa. Se falta um dado, o certo é dizer qual é que falta.", "tag": "problema-passo-em-falta" }, { "t": "apagar a pergunta", "feedback": "Apagar a pergunta não resolve nada. Quando falta informação, deves dizer que dado falta.", "tag": "problema-passo-em-falta" } ],
      "explain": "Problemas incompletos não se resolvem com invenções." },
    { "q": "Num problema sobre custo total, ajudam…", "layout": "grid",
      "options": [ { "t": "preço e quantidade", "emoji": "💶", "correct": true }, { "t": "cor dos sapatos", "feedback": "A cor não tem preço, é um dado a mais. Para o custo total precisas do preço e da quantidade.", "tag": "problema-dado-a-mais" }, { "t": "nome da rua apenas", "feedback": "O nome da rua não diz quanto custa. O custo total faz-se com o preço por unidade e a quantidade.", "tag": "problema-dado-a-mais" } ],
      "explain": "Custo total costuma usar preço por unidade e quantidade." },
    { "q": "Usar todos os números sem pensar pode…", "layout": "grid",
      "options": [ { "t": "dar uma resposta errada", "emoji": "⚠️", "correct": true }, { "t": "garantir sempre sucesso", "feedback": "Não garante nada: se usares dados a mais, a conta sai errada. Por isso é que pode dar uma resposta errada.", "tag": "problema-metodo" }, { "t": "substituir a leitura", "feedback": "Os números nunca substituem a leitura — é a ler que percebes quais usar. Sem pensar, podes dar uma resposta errada.", "tag": "problema-metodo" } ],
      "explain": "É preciso escolher dados com intenção." },
    { "q": "«A Rita comprou 4 lápis a 2 euros e a mochila pesa 3 kg.» Para saber quanto gastou nos lápis, que dado NÃO ajuda?", "layout": "grid",
      "options": [ { "t": "o peso da mochila", "emoji": "🎒", "correct": true }, { "t": "o preço de cada lápis", "feedback": "O preço de cada lápis É preciso: 4 × 2 = 8 euros. O dado a mais é o peso da mochila.", "tag": "problema-dado-a-mais" }, { "t": "o número de lápis", "feedback": "O número de lápis É preciso: 4 × 2 = 8 euros. O dado que não ajuda é o peso da mochila.", "tag": "problema-dado-a-mais" } ],
      "explain": "O peso da mochila é um dado a mais: o custo dos lápis é 4 x 2 = 8 euros." },
    { "q": "«O João leu um livro. Quantas páginas leu por dia?» O que falta para responder?", "layout": "grid",
      "options": [ { "t": "o número de páginas e de dias", "emoji": "🔎", "correct": true }, { "t": "o nome do livro", "feedback": "O nome do livro não entra na conta. Para saber páginas por dia, faltam o total de páginas e o número de dias.", "tag": "problema-passo-em-falta" }, { "t": "a cor da capa", "feedback": "A cor da capa é só um dado a mais. O que falta mesmo é o total de páginas e o número de dias.", "tag": "problema-passo-em-falta" } ],
      "explain": "Sem o total de páginas e de dias não dá para calcular: falta informação." },
    { "q": "Antes de fazer as contas, é boa ideia…", "layout": "grid",
      "options": [ { "t": "marcar só os dados que ajudam", "emoji": "✏️", "correct": true }, { "t": "somar logo todos os números", "feedback": "Somar tudo pode juntar dados a mais e dar erro. Primeiro marca só os dados que ajudam.", "tag": "problema-operacao-errada" }, { "t": "escolher o número maior", "feedback": "O número maior pode até ser uma distração. O melhor é marcar só os dados que respondem à pergunta.", "tag": "problema-dado-a-mais" } ],
      "explain": "Marcar os dados úteis é o segundo filtro: evita usar distrações." }
  ]
}
```
