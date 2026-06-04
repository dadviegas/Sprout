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

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-dados-mais-menos-final",
  "final": true,
  "title": "Dados a mais ou em falta",
  "questions": [
    { "q": "Num problema, o primeiro passo é perceber…", "layout": "grid",
      "options": [ { "t": "a pergunta", "emoji": "❓", "correct": true }, { "t": "a cor da folha" }, { "t": "o maior número apenas" } ],
      "explain": "A pergunta diz que dados interessam." },
    { "q": "Dados a mais são dados que…", "layout": "grid",
      "options": [ { "t": "não são necessários para responder", "emoji": "🎯", "correct": true }, { "t": "resolvem sempre tudo" }, { "t": "devem ser todos multiplicados" } ],
      "explain": "Nem todos os dados entram nas contas." },
    { "q": "Se falta informação, deves…", "layout": "grid",
      "options": [ { "t": "dizer que dado falta", "emoji": "🔎", "correct": true }, { "t": "inventar um número" }, { "t": "apagar a pergunta" } ],
      "explain": "Problemas incompletos não se resolvem com invenções." },
    { "q": "Num problema sobre custo total, ajudam…", "layout": "grid",
      "options": [ { "t": "preço e quantidade", "emoji": "💶", "correct": true }, { "t": "cor dos sapatos" }, { "t": "nome da rua apenas" } ],
      "explain": "Custo total costuma usar preço por unidade e quantidade." },
    { "q": "Usar todos os números sem pensar pode…", "layout": "grid",
      "options": [ { "t": "dar uma resposta errada", "emoji": "⚠️", "correct": true }, { "t": "garantir sempre sucesso" }, { "t": "substituir a leitura" } ],
      "explain": "É preciso escolher dados com intenção." }
  ]
}
```
