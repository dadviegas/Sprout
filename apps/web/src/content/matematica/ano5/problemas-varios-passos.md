# Problemas de vários passos 🧩

> [!NOTE] **O que vais aprender** 👀 Vais aprender a resolver problemas que não se fazem com uma só conta: ler, escolher dados, planear passos, calcular e verificar se a resposta faz sentido.

Um problema de vários passos é como uma receita: se saltas uma parte, o resultado pode ficar errado.

```steps
[
  { "title": "1. Ler", "body": "Sublinha a pergunta final e os dados importantes." },
  { "title": "2. Planear", "body": "Decide que contas precisas e em que ordem." },
  { "title": "3. Calcular", "body": "Faz uma conta de cada vez, com unidades." },
  { "title": "4. Verificar", "body": "Pergunta: a resposta é possível? Responde ao que foi pedido?" }
]
```

## Exemplo guiado

```keyvalue
[
  { "k": "Problema", "v": "A turma vendeu 24 rifas a 2 euros. Gastou 15 euros em materiais. Quanto sobrou?" },
  { "k": "1.º passo", "v": "24 x 2 = 48 euros recebidos" },
  { "k": "2.º passo", "v": "48 - 15 = 33 euros" },
  { "k": "Resposta", "v": "Sobrou 33 euros." }
]
```

## Cuidado com estes erros

```compare
[
  { "title": "Boa estratégia", "rows": [
    { "label": "Pergunta", "value": "sei o que tenho de descobrir", "highlight": true },
    { "label": "Ordem", "value": "faço uma etapa de cada vez", "highlight": true },
    { "label": "Unidades", "value": "euros, metros, alunos...", "highlight": true }
  ] },
  { "title": "Erro comum", "rows": [
    { "label": "Pressa", "value": "usar todos os números sem pensar" },
    { "label": "Esquecer", "value": "não responder por palavras" },
    { "label": "Não verificar", "value": "aceitar uma resposta impossível" }
  ] }
]
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-problemas-varios-passos-final",
  "final": true,
  "title": "Problemas de vários passos",
  "questions": [
    { "q": "O primeiro passo deve ser…", "layout": "grid",
      "options": [ { "t": "ler e perceber a pergunta", "emoji": "🔎", "correct": true }, { "t": "fazer uma conta qualquer" }, { "t": "copiar todos os números" } ],
      "explain": "Sem perceber a pergunta, podes escolher contas erradas." },
    { "q": "Se um problema tem duas etapas, deves…", "layout": "grid",
      "options": [ { "t": "resolver por ordem", "emoji": "1️⃣", "correct": true }, { "t": "misturar tudo" }, { "t": "ignorar uma etapa" } ],
      "explain": "A ordem das etapas ajuda a chegar à resposta certa." },
    { "q": "24 rifas a 2 euros dão…", "layout": "grid",
      "options": [ { "t": "48 euros", "emoji": "💶", "correct": true }, { "t": "26 euros" }, { "t": "22 euros" } ],
      "explain": "24 x 2 = 48." },
    { "q": "Depois de calcular, é importante…", "layout": "grid",
      "options": [ { "t": "verificar se faz sentido", "emoji": "✅", "correct": true }, { "t": "apagar a pergunta" }, { "t": "mudar a unidade" } ],
      "explain": "Verificar ajuda a encontrar enganos." },
    { "q": "A resposta final deve ter…", "layout": "grid",
      "options": [ { "t": "número e unidade", "emoji": "📏", "correct": true }, { "t": "só um desenho" }, { "t": "números sem contexto" } ],
      "explain": "A unidade mostra o que o número significa." }
  ]
}
```
