# Ler palavras à primeira 👀

> [!NOTE] **O que vais treinar** 👀 Ler palavras inteiras **de uma só vez**, sem
> soletrar — primeiro pequeninas, depois de duas sílabas e por fim de três. São
> palavras que vês todos os dias: quando as reconheceres à primeira, a leitura
> dispara! 🚀

Olha para a palavra, tenta dizê-la **antes** de tocar, e toca para confirmar.
Se acertaste à primeira, passa à seguinte; se não, ouve e repete. 🎧

## Palavras pequeninas ☀️

Uma sílaba só — devem sair num piscar de olhos:

```soundcards
{
  "title": "Curtinhas, de uma sílaba",
  "items": [
    { "label": "SOL", "say": "sol", "hint": "☀️" },
    { "label": "MAR", "say": "mar", "hint": "🌊" },
    { "label": "PÉ", "say": "pé", "hint": "🦶" },
    { "label": "PÃO", "say": "pão", "hint": "🍞" },
    { "label": "MÃO", "say": "mão", "hint": "✋" },
    { "label": "CÃO", "say": "cão", "hint": "🐶" },
    { "label": "FLOR", "say": "flor", "hint": "🌸" },
    { "label": "LUZ", "say": "luz", "hint": "💡" }
  ]
}
```

## Duas sílabas 🏠

As palavras do dia a dia — tenta lê-las sem parar no meio:

```soundcards
{
  "title": "Duas sílabas",
  "items": [
    { "label": "CASA", "say": "casa", "hint": "🏠" },
    { "label": "BOLA", "say": "bola", "hint": "⚽" },
    { "label": "GATO", "say": "gato", "hint": "🐱" },
    { "label": "PATO", "say": "pato", "hint": "🦆" },
    { "label": "MESA", "say": "mesa", "hint": "🍽️" },
    { "label": "LUA", "say": "lua", "hint": "🌙" },
    { "label": "ÁGUA", "say": "água", "hint": "💧" },
    { "label": "LEITE", "say": "leite", "hint": "🥛" },
    { "label": "LIVRO", "say": "livro", "hint": "📚" },
    { "label": "PEIXE", "say": "peixe", "hint": "🐟" },
    { "label": "CARRO", "say": "carro", "hint": "🚗" },
    { "label": "ESCOLA", "say": "escola", "hint": "🏫" }
  ]
}
```

## Três sílabas 🐒

As compridas! Lê devagar a primeira vez e depois cada vez mais depressa:

```soundcards
{
  "title": "Três sílabas",
  "items": [
    { "label": "SAPATO", "say": "sapato", "hint": "👟" },
    { "label": "BANANA", "say": "banana", "hint": "🍌" },
    { "label": "MENINO", "say": "menino", "hint": "👦" },
    { "label": "MENINA", "say": "menina", "hint": "👧" },
    { "label": "CAVALO", "say": "cavalo", "hint": "🐴" },
    { "label": "MACACO", "say": "macaco", "hint": "🐒" },
    { "label": "BONECA", "say": "boneca", "hint": "🪆" },
    { "label": "JANELA", "say": "janela", "hint": "🪟" },
    { "label": "PIPOCA", "say": "pipoca", "hint": "🍿" },
    { "label": "TOMATE", "say": "tomate", "hint": "🍅" }
  ]
}
```

## Mini-treino: a palavra certa ⚡

```drill
{ "mode": "choose", "title": "Qual é a palavra da imagem?", "choices": 3, "items": [
  { "front": "☀️", "back": "SOL", "sayFront": "Que palavra é esta imagem?", "say": "É SOL", "options": ["MAR", "LUZ"] },
  { "front": "🐶", "back": "CÃO", "sayFront": "Que palavra é esta imagem?", "say": "É CÃO", "options": ["GATO", "PATO"] },
  { "front": "💧", "back": "ÁGUA", "sayFront": "Que palavra é esta imagem?", "say": "É ÁGUA", "options": ["LEITE", "LUA"] },
  { "front": "🏫", "back": "ESCOLA", "sayFront": "Que palavra é esta imagem?", "say": "É ESCOLA", "options": ["CASA", "MESA"] },
  { "front": "🐴", "back": "CAVALO", "sayFront": "Que palavra é esta imagem?", "say": "É CAVALO", "options": ["MACACO", "SAPATO"] },
  { "front": "🍅", "back": "TOMATE", "sayFront": "Que palavra é esta imagem?", "say": "É TOMATE", "options": ["BANANA", "PIPOCA"] }
] }
```

> [!TIP] **Para treinar em casa** 🌱 Tapa o emoji com o dedo e pede para ler só
> a palavra. Três palavras novas por dia chegam — o objetivo é a criança
> reconhecê-las **à primeira**, sem soletrar.

## 🎯 Questionário final

```quiz
{
  "id": "estudo-ler-palavras-final",
  "final": true,
  "title": "Ler palavras à primeira",
  "questions": [
    { "q": "Qual destas palavras é um animal?", "layout": "grid",
      "options": [ { "t": "GATO", "emoji": "🐱", "correct": true }, { "t": "MESA" }, { "t": "BOLA" } ],
      "explain": "GA-TO — o animal que diz miau!" },
    { "q": "Que palavra combina com 🍞?", "layout": "grid",
      "options": [ { "t": "PÃO", "correct": true }, { "t": "PÉ" }, { "t": "CÃO" } ],
      "explain": "PÃO — uma sílaba só, com o som ÃO." },
    { "q": "Quantas sílabas tem BA-NA-NA?", "layout": "grid",
      "options": [ { "t": "3", "emoji": "🍌", "correct": true }, { "t": "2" }, { "t": "4" } ],
      "explain": "BA, NA, NA — três bocadinhos." },
    { "q": "Que palavra combina com 🌙?", "layout": "grid",
      "options": [ { "t": "LUA", "correct": true }, { "t": "LUZ" }, { "t": "SOL" } ],
      "explain": "LU-A — duas sílabas." },
    { "q": "Qual destas palavras é a mais comprida?", "layout": "grid",
      "options": [ { "t": "SAPATO", "emoji": "👟", "correct": true }, { "t": "SOL" }, { "t": "CASA" } ],
      "explain": "SA-PA-TO tem três sílabas; SOL tem uma e CA-SA tem duas." }
  ]
}
```
