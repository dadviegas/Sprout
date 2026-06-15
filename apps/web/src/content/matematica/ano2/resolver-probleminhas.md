# Resolver probleminhas ➕➖

> [!NOTE] **O que vais aprender** 👀 Vais aprender um truque simples para resolver **probleminhas** com histórias: ler e imaginar, descobrir se é de **somar ou tirar**, fazer a conta e responder com uma frase. 🕵️

Um **problema** é uma continha escondida dentro de uma historinha. 📖 Às vezes parece difícil, mas é só um disfarce! Com um plano de **3 passos**, deixas de adivinhar e resolves com calma. Vamos descobrir como? 🚀

## O plano em 3 passos 🗺️

Faz sempre estes três passos, pela ordem certa:

```steps
[
  { "title": "1. Lê e imagina", "body": "lê a história e imagina-a na tua cabeça, como um filme 🎬", "icon": "🎬" },
  { "title": "2. Somar ou tirar?", "body": "as coisas juntam-se (somar ➕) ou vão-se embora (tirar ➖)? Faz a conta 🧮", "icon": "🧮" },
  { "title": "3. Responde com uma frase", "body": "não escrevas só o número — diz a resposta toda! ✍️", "icon": "✍️" }
]
```

## As palavras que dão pistas 🔑

Algumas palavrinhas dizem-te logo que conta fazer. Decora estas!

```compare
[
  { "title": "Somar ➕ (as coisas juntam-se)", "highlight": true, "rows": [
    { "label": "Pistas", "value": "ganhou · juntou · ao todo · no total · a mais" },
    { "label": "Exemplo", "value": "«ganhou mais 3 cromos» → +3" }
  ] },
  { "title": "Tirar ➖ (as coisas vão-se embora)", "rows": [
    { "label": "Pistas", "value": "deu · perdeu · comeu · sobrou · quanto falta" },
    { "label": "Exemplo", "value": "«comeu 2 bolos» → −2" }
  ] }
]
```

> [!TIP] Truque do filme 🎬: imagina a história a acontecer. Se vês coisas a **chegar**, é somar. Se vês coisas a **ir embora**, é tirar. A tua imaginação ajuda-te a escolher a conta!

## Um exemplo passo a passo 🔍

Vamos resolver juntos: *«A Rita tinha 15 cromos. Deu 6 ao irmão. Com quantos ficou?»* 🃏

```steps
[
  { "title": "1. Lê e imagina", "body": "a Rita tinha 15 cromos e DEU 6 — vejo cromos a ir embora 🎬" },
  { "title": "2. Somar ou tirar?", "body": "«deu» quer dizer que foram embora → é TIRAR: 15 − 6 ➖" },
  { "title": "3. Faz a conta", "body": "15 − 6 = 9 🧮" },
  { "title": "4. Responde com uma frase", "body": "A Rita ficou com 9 cromos ✅" }
]
```

Podes ajudar-te com a reta numérica: começa no 15 e **salta 6 para trás**.

```numberline
{ "min": 0, "max": 20, "start": 15, "step": 1, "title": "15 − 6: salta 6 vezes para trás e chegas ao 9" }
```

> **Truque:** Depois de responderes, lê outra vez a pergunta e vê se a tua resposta **faz sentido**. A Rita deu cromos, por isso tem de ficar com **menos** do que os 15 do início. 9 é menos que 15 — bate certo! 🤔

> [!TIP] **Para saberes mais** 🌱 Às vezes um problema tem um número que **não precisas**, só para te enganar! Em «A Maria tem 7 anos e 4 berlindes; perdeu 1. Com quantos berlindes ficou?», a idade (7) é uma **armadilha** — a conta é só 4 − 1 = 3. Por isso é tão importante **imaginar a história** e perceber o que ela pergunta! 🕵️

## Vamos praticar 🎈

```quiz
{ "id": "mat2-prob-pratica", "questions": [
  { "q": "O Tó tinha 7 carrinhos e ganhou mais 5. Com quantos ficou?", "layout": "grid", "options": [
    { "t": "12", "emoji": "➕", "correct": true },
    { "t": "2", "feedback": "2 vem de 7 − 5 (tirar). «Ganhou mais» é somar: 7 + 5 = 12.", "tag": "problema-operacao-errada" },
    { "t": "35", "feedback": "35 é 7 × 5 (multiplicar). «Ganhou mais» é somar: 7 + 5 = 12.", "tag": "problema-operacao-errada" }
  ], "explain": "«Ganhou mais» = somar: 7 + 5 = 12." },
  { "q": "A Inês tinha 10 gomas e comeu 4. Quantas sobraram?", "layout": "grid", "options": [
    { "t": "6", "emoji": "➖", "correct": true },
    { "t": "14", "feedback": "14 é 10 + 4 (somar). «Comeu» é tirar: 10 − 4 = 6.", "tag": "problema-operacao-errada" },
    { "t": "40", "feedback": "40 é 10 × 4. «Comeu» é tirar: 10 − 4 = 6.", "tag": "problema-operacao-errada" }
  ], "explain": "«Comeu» = tirar: 10 − 4 = 6." },
  { "q": "Qual é sempre o 1.º passo de um probleminha?", "layout": "grid", "options": [
    { "t": "Ler e imaginar a história", "emoji": "🎬", "correct": true },
    { "t": "Adivinhar à sorte", "emoji": "🎲", "feedback": "À sorte erra-se muito. Primeiro lê e imagina a história.", "tag": "problema-metodo" },
    { "t": "Apagar tudo", "emoji": "🧽", "feedback": "Não apagues — lê e imagina a história primeiro.", "tag": "problema-metodo" }
  ], "explain": "Primeiro lê e imagina a história, como um filme." },
  { "q": "A palavra «ao todo» costuma indicar que conta?", "layout": "grid", "options": [
    { "t": "Somar ➕", "correct": true },
    { "t": "Tirar ➖", "feedback": "«Ao todo» é juntar, não tirar. É somar.", "tag": "problema-palavra-chave" }
  ], "explain": "«Ao todo» e «no total» querem dizer juntar — somar." },
  { "q": "Tinha 20 € e gastei 8 €. Quanto me sobrou?", "layout": "grid", "options": [
    { "t": "12 €", "emoji": "➖", "correct": true },
    { "t": "28 €", "feedback": "28 é 20 + 8 (somar). «Sobrou» é tirar: 20 − 8 = 12 €.", "tag": "problema-operacao-errada" },
    { "t": "2 €", "feedback": "Confere a conta: 20 − 8 = 12 €, não 2.", "tag": "problema-operacao-errada" }
  ], "explain": "«Sobrou» = tirar: 20 − 8 = 12." },
  { "q": "Na história, vês coisas a IR EMBORA. A conta é…", "layout": "grid", "options": [
    { "t": "tirar ➖", "correct": true },
    { "t": "somar ➕", "feedback": "Ir embora faz desaparecer coisas — é tirar, não somar.", "tag": "problema-palavra-chave" }
  ], "explain": "Coisas a ir embora = tirar (subtrair)." },
  { "q": "A resposta a um problema deve ser…", "layout": "grid", "options": [
    { "t": "uma frase com a resposta", "emoji": "✍️", "correct": true },
    { "t": "só um número solto", "emoji": "🔢", "feedback": "Um número sozinho não responde. Escreve a frase: «Sobraram 6 gomas.»", "tag": "problema-resposta-frase" }
  ], "explain": "Escreve a frase toda: «Sobraram 6 gomas.»" },
  { "q": "Havia 8 patos no lago e chegaram mais 6. Quantos patos ao todo?", "layout": "grid", "options": [
    { "t": "14", "emoji": "🦆", "correct": true },
    { "t": "2", "feedback": "2 vem de 8 − 6 (tirar). «Chegaram mais» é somar: 8 + 6 = 14.", "tag": "problema-operacao-errada" },
    { "t": "48", "feedback": "48 é 8 × 6. «Chegaram mais» é somar: 8 + 6 = 14.", "tag": "problema-operacao-errada" }
  ], "explain": "«Chegaram mais» = somar: 8 + 6 = 14." }
] }
```

## 🎯 Questionário final

```quiz
{ "id": "mat2-prob-final", "final": true, "title": "Resolver probleminhas", "questions": [
  { "q": "Quantos passos tem o nosso plano?", "layout": "grid", "options": [
    { "t": "3: ler, fazer a conta, responder", "emoji": "🗺️", "correct": true },
    { "t": "Nenhum, é adivinhar", "emoji": "🎲", "feedback": "Adivinhar não é um plano. São 3 passos: ler, calcular, responder.", "tag": "problema-metodo" },
    { "t": "10", "emoji": "🔟", "feedback": "Não são tantos: o plano tem 3 passos — ler, calcular, responder.", "tag": "problema-metodo" }
  ], "explain": "São 3: lê e imagina, somar ou tirar, e responde com uma frase." },
  { "q": "A Mia tinha 9 lápis e o irmão deu-lhe mais 5. Com quantos ficou?", "layout": "grid", "options": [
    { "t": "14", "emoji": "➕", "correct": true },
    { "t": "4", "feedback": "4 vem de 9 − 5 (tirar). «Deu-lhe mais» é somar: 9 + 5 = 14.", "tag": "problema-operacao-errada" },
    { "t": "45", "feedback": "45 é 9 × 5. «Deu-lhe mais» é somar: 9 + 5 = 14.", "tag": "problema-operacao-errada" }
  ], "explain": "«Deu-lhe mais» = somar: 9 + 5 = 14." },
  { "q": "Tinha 18 cromos e perdi 7. Com quantos fiquei?", "layout": "grid", "options": [
    { "t": "11", "emoji": "➖", "correct": true },
    { "t": "25", "feedback": "25 é 18 + 7 (somar). «Perdi» é tirar: 18 − 7 = 11.", "tag": "problema-operacao-errada" },
    { "t": "7", "feedback": "7 foi o que perdeste. Ficaste com o resto: 18 − 7 = 11.", "tag": "problema-pergunta-trocada" }
  ], "explain": "«Perdi» = tirar: 18 − 7 = 11." },
  { "q": "A palavra «comeu» indica que conta?", "layout": "grid", "options": [
    { "t": "Tirar ➖", "correct": true },
    { "t": "Somar ➕", "feedback": "Comer faz desaparecer coisas — é tirar, não somar.", "tag": "problema-palavra-chave" }
  ], "explain": "Comer faz desaparecer coisas — é tirar." },
  { "q": "Estavam 12 crianças no parque e foram-se embora 5. Quantas ficaram?", "layout": "grid", "options": [
    { "t": "7", "emoji": "➖", "correct": true },
    { "t": "17", "feedback": "17 é 12 + 5 (somar). «Foram-se embora» é tirar: 12 − 5 = 7.", "tag": "problema-operacao-errada" },
    { "t": "60", "feedback": "60 é 12 × 5. «Foram-se embora» é tirar: 12 − 5 = 7.", "tag": "problema-operacao-errada" }
  ], "explain": "«Foram-se embora» = tirar: 12 − 5 = 7." },
  { "q": "Depois de responder, o que deves verificar?", "layout": "grid", "options": [
    { "t": "Se a resposta faz sentido", "emoji": "🤔", "correct": true },
    { "t": "Se o lápis está afiado", "emoji": "✏️", "feedback": "O lápis não importa. Verifica se a resposta faz sentido na história.", "tag": "problema-verificar" }
  ], "explain": "Confere sempre: a resposta faz sentido na história?" },
  { "q": "«A Joana tem 6 anos e 8 cromos; deu 3. Com quantos cromos ficou?» Que conta fazes?", "layout": "grid", "options": [
    { "t": "8 − 3 = 5 (a idade é uma armadilha)", "emoji": "🕵️", "correct": true },
    { "t": "6 − 3 = 3", "feedback": "A idade (6) é uma armadilha. Os cromos é que contam: 8 − 3 = 5.", "tag": "problema-dado-a-mais" },
    { "t": "6 + 8 = 14", "feedback": "Não juntes a idade com os cromos. Só os cromos: 8 − 3 = 5.", "tag": "problema-dado-a-mais" }
  ], "explain": "A idade (6) não serve para nada aqui — a conta é 8 − 3 = 5." },
  { "q": "Numa história, vês coisas a CHEGAR e a juntar-se. A conta é…", "layout": "grid", "options": [
    { "t": "somar ➕", "correct": true },
    { "t": "tirar ➖", "feedback": "Chegar e juntar é aumentar — é somar, não tirar.", "tag": "problema-palavra-chave" }
  ], "explain": "Coisas a chegar e a juntar-se = somar." }
] }
```
