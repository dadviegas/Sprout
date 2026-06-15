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

> [!TIP] **Conta o degrau** Antes de calcular, pergunta «quantas contas até à resposta?». Se forem duas, sobe um degrau de cada vez — nunca saltes do chão para o cimo da escada de um pulo.

## Quando os dados chegam num gráfico 📊

Às vezes o enunciado não te dá os números por escrito — dá-tos num **gráfico**. Aí o problema ganha um passo extra: primeiro **lês as barras**, só depois fazes as contas.

```chart
{ "type": "bar", "title": "Rifas vendidas pela turma, dia a dia",
  "labels": ["Seg", "Ter", "Qua", "Qui", "Sex"], "data": [4, 6, 3, 5, 6],
  "unit": "rifas",
  "say": "Segunda quatro rifas, terça seis, quarta três, quinta cinco e sexta seis. Ao todo, vinte e quatro rifas." }
```

Soma as barras: 4 + 6 + 3 + 5 + 6 = **24 rifas** — são exatamente as 24 do exemplo guiado! A 2 euros cada, dá 24 × 2 = 48 euros, e tirando os 15 de materiais sobram os mesmos **33 euros**. Caminhos diferentes, resposta igual. ✅

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

## Para saberes mais 🌱

Quando os matemáticos resolvem problemas gigantes, usam um truque chamado «dividir para conquistar»: partem o problema num punhado de problemas mais pequenos, resolvem cada um e juntam tudo no fim. É exatamente o que fazes ao subir um degrau de cada vez — só que os computadores fazem isso milhões de vezes por segundo! 🤯

## 🎯 Questionário final

```quiz
{
  "id": "mat-5-problemas-varios-passos-final",
  "final": true,
  "title": "Problemas de vários passos",
  "questions": [
    { "q": "O primeiro passo deve ser…", "layout": "grid",
      "options": [ { "t": "ler e perceber a pergunta", "emoji": "🔎", "correct": true }, { "t": "fazer uma conta qualquer", "feedback": "Uma conta à sorte leva a erros. Primeiro lê e percebe o que é pedido.", "tag": "problema-metodo" }, { "t": "copiar todos os números", "feedback": "Copiar números não é perceber. O 1.º passo é ler e perceber a pergunta.", "tag": "problema-metodo" } ],
      "explain": "Sem perceber a pergunta, podes escolher contas erradas." },
    { "q": "Se um problema tem duas etapas, deves…", "layout": "grid",
      "options": [ { "t": "resolver por ordem", "emoji": "1️⃣", "correct": true }, { "t": "misturar tudo", "feedback": "Misturar baralha as contas. Resolve uma etapa de cada vez, por ordem.", "tag": "problema-metodo" }, { "t": "ignorar uma etapa", "feedback": "Saltar uma etapa dá resposta errada. Faz as duas, por ordem.", "tag": "problema-passo-em-falta" } ],
      "explain": "A ordem das etapas ajuda a chegar à resposta certa." },
    { "q": "24 rifas a 2 euros dão…", "layout": "grid",
      "options": [ { "t": "48 euros", "emoji": "💶", "correct": true }, { "t": "26 euros", "feedback": "26 é 24 + 2 (somar). «A 2 euros cada» pede multiplicar: 24 × 2 = 48.", "tag": "problema-operacao-errada" }, { "t": "22 euros", "feedback": "22 é 24 − 2 (tirar). Cada rifa vale 2 €: 24 × 2 = 48.", "tag": "problema-operacao-errada" } ],
      "explain": "24 x 2 = 48." },
    { "q": "Depois de calcular, é importante…", "layout": "grid",
      "options": [ { "t": "verificar se faz sentido", "emoji": "✅", "correct": true }, { "t": "apagar a pergunta", "feedback": "Não apagues — depois de calcular, verifica se a resposta faz sentido.", "tag": "problema-verificar" }, { "t": "mudar a unidade", "feedback": "A unidade mantém-se. O passo final é verificar se a resposta faz sentido.", "tag": "problema-verificar" } ],
      "explain": "Verificar ajuda a encontrar enganos." },
    { "q": "A resposta final deve ter…", "layout": "grid",
      "options": [ { "t": "número e unidade", "emoji": "📏", "correct": true }, { "t": "só um desenho", "feedback": "O desenho ajuda a pensar, mas a resposta leva número e unidade.", "tag": "problema-resposta-frase" }, { "t": "números sem contexto", "feedback": "Um número sozinho não diz do quê. Junta a unidade: «33 euros».", "tag": "problema-resposta-frase" } ],
      "explain": "A unidade mostra o que o número significa." },
    { "q": "«Tenho 3 pacotes com 6 cromos cada. Dou 4 cromos a um amigo. Com quantos fico?»", "layout": "grid",
      "options": [ { "t": "14 cromos", "emoji": "🃏", "correct": true }, { "t": "18 cromos", "feedback": "18 é só o 1.º passo (3 × 6). Falta tirar os 4: 18 − 4 = 14.", "tag": "problema-primeiro-passo-so" }, { "t": "13 cromos", "feedback": "Confere as contas: 3 × 6 = 18 e 18 − 4 = 14 (não 13).", "tag": "problema-passo-em-falta" } ],
      "explain": "Primeiro 3 x 6 = 18; depois 18 - 4 = 14." },
    { "q": "Num problema de dois passos, qual é a melhor estratégia?", "layout": "grid",
      "options": [ { "t": "planear a ordem das contas", "emoji": "🧩", "correct": true }, { "t": "fazer a primeira conta que aparecer", "feedback": "A primeira conta pode não ser a certa. Planeia a ordem antes de calcular.", "tag": "problema-metodo" }, { "t": "somar todos os números juntos", "feedback": "Somar tudo ignora o que cada número é. Planeia que contas fazer e por que ordem.", "tag": "problema-operacao-errada" } ],
      "explain": "Planear a ordem evita enganos e ajuda a chegar à resposta certa." },
    { "q": "Se calculas que sobraram «-5 euros», isso quer dizer que…", "layout": "grid",
      "options": [ { "t": "deves verificar, a resposta parece impossível", "emoji": "✅", "correct": true }, { "t": "está tudo certo", "feedback": "Sobrar «menos 5 euros» não é possível aqui. Uma resposta impossível avisa que há erro.", "tag": "problema-verificar" }, { "t": "deves apagar o problema", "feedback": "Não apagues — revê as contas: a resposta impossível mostra onde está o engano.", "tag": "problema-verificar" } ],
      "explain": "Verificar serve para isto: uma resposta impossível mostra um engano nas contas." }
  ]
}
```
