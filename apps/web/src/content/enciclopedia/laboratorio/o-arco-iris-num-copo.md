# O arco-íris num copo 🌈

> [!NOTE] **O que vais aprender** 👀 Vais criar um **arco-íris de verdade dentro
> de um copo** usando só água, açúcar e corantes alimentares! Vais perceber porque
> é que líquidos mais pesados **afundam** e os mais leves **ficam por cima** — a
> isso chamamos **densidade**. 🌈🔬

> [!WARNING] **Pede ajuda a um adulto** 🧑‍🍳 Usa uma seringa ou colher de sopa para
> deitar cada camada devagarinho — é a parte mais difícil e precisa de calma!

## Do que precisas 🧰

```keyvalue
[
  { "k": "Açúcar 🍬", "v": "cerca de 8 colheres de sopa" },
  { "k": "Água 💧", "v": "4 copos pequenos" },
  { "k": "Corantes alimentares 🎨", "v": "4 cores: azul, verde, amarelo, vermelho" },
  { "k": "Um copo alto e transparente 🥤", "v": "para veres as camadas" },
  { "k": "Uma seringa ou colher 🥄", "v": "para deitar a água devagar" },
  { "k": "Uma colher para mexer 🥄", "v": "uma por cada cor" }
]
```

## Como se faz 🔬

```steps
[
  { "title": "1. Prepara os 4 copos 🥤", "body": "Enche cada copinho com a mesma quantidade de água (uns 4 dedos). Junta um corante diferente a cada um." },
  { "title": "2. Dissolve o açúcar 🍬", "body": "No copo AZUL: 4 colheres de açúcar. No VERDE: 3. No AMARELO: 2. No VERMELHO: 1. Mexe bem até dissolver tudo." },
  { "title": "3. Começa pelo mais pesado 💙", "body": "Deita primeiro o copo AZUL (mais açúcar) no copo alto." },
  { "title": "4. Adiciona o verde por cima 💚", "body": "Com uma seringa ou colher, faz escorrer o VERDE devagaaaar pela parede do copo. Não mexas!" },
  { "title": "5. Depois o amarelo e o vermelho 🌈", "body": "Faz o mesmo com o AMARELO e por último o VERMELHO (menos açúcar). Quanto mais devagar, mais bonito fica!" }
]
```

## O que vais ver ✨

Se fizeres bem, o copo vai ter **4 camadas de cores** que não se misturam — como
um arco-íris deitado! O azul fica no fundo, depois o verde, o amarelo e o
vermelho flutua no topo. Se abanares o copo, as camadas misturam-se e ficam
todas castanho — experimenta! 😄

```layers
{ "title": "As camadas de açúcar", "shape": "stack",
  "layers": [
    { "label": "Vermelho", "color": "#e2516a", "note": "menos açúcar — fica em cima" },
    { "label": "Amarelo", "color": "#f2c14e" },
    { "label": "Verde", "color": "#5bbf6a" },
    { "label": "Azul", "color": "#3a7bd5", "note": "mais açúcar — fica no fundo" }
  ] }
```

## Porque acontece? 🧠

Imagina que o açúcar é como tijolos dentro da água: quanto mais tijolos tens,
**mais pesada** fica a água — dizemos que tem **maior densidade**. Os líquidos
mais densos (mais pesados) **afundam**; os menos densos (mais leves) **sobem
para cima**.

> [!TIP] A **densidade** diz-nos quão apertadas estão as moléculas num espaço.
> Água com muito açúcar tem moléculas mais apertadas → é mais densa → afunda!
> É o mesmo princípio que faz um navio de metal flutuar: a forma do navio faz
> com que a sua densidade *média* seja menor que a da água. ⚓

> **Truque:** pensa numa pilha de cobertores — quanto mais cobertores empilhas,
> mais pesada fica a pilha. Mais açúcar = mais "cobertores" na água = mais densa! 🛏️

> [!TIP] **Para saberes mais** 🌱 O **Mar Morto**, que fica entre Israel e a
> Jordânia, é tão salgado que uma pessoa **flutua sem sequer nadar** — a água
> tem tanta sal que fica muito mais densa do que o corpo humano. Experimentar
> isso deve parecer magia! 🌊

## Vamos praticar 🎈

```quiz
{
  "id": "enc-lab-arcoiris-pratica",
  "questions": [
    { "q": "Que cor fica no fundo do copo?", "layout": "grid",
      "options": [ { "t": "a azul (mais açúcar)", "emoji": "💙", "correct": true }, { "t": "a vermelha (menos açúcar)", "emoji": "❤️" } ],
      "explain": "Mais açúcar = mais densa = afunda. A camada azul tem mais açúcar." },
    { "q": "O que é a densidade?", "layout": "grid",
      "options": [ { "t": "o quão pesado é um líquido para o seu tamanho", "emoji": "⚖️", "correct": true }, { "t": "a cor do líquido", "emoji": "🎨" } ],
      "explain": "Densidade mede o quanto está apertado num espaço — mais açúcar = mais denso." },
    { "q": "O que acontece se abanares o copo?", "layout": "grid",
      "options": [ { "t": "as camadas misturam-se", "emoji": "🌀", "correct": true }, { "t": "as camadas ficam mais separadas", "emoji": "🌈" } ],
      "explain": "Abalar mistura as camadas e as cores ficam todas juntas!" }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "enc-lab-arcoiris-final",
  "final": true,
  "title": "O arco-íris num copo",
  "questions": [
    { "q": "Porque é que o líquido com mais açúcar fica no fundo?", "layout": "grid",
      "options": [ { "t": "é mais denso (mais pesado)", "emoji": "⬇️", "correct": true }, { "t": "é mais colorido", "emoji": "🎨" } ],
      "explain": "Maior densidade = afunda. Mais açúcar = mais denso = vai para o fundo." },
    { "q": "Qual é o copo com MENOS açúcar nesta experiência?", "layout": "grid",
      "options": [ { "t": "o vermelho (1 colher)", "emoji": "❤️", "correct": true }, { "t": "o azul (4 colheres)", "emoji": "💙" } ],
      "explain": "O vermelho tem apenas 1 colher de açúcar — é o menos denso e fica no topo." },
    { "q": "Como pões cada nova camada sem misturar?", "layout": "grid",
      "options": [ { "t": "devagar pela parede do copo", "emoji": "🥄", "correct": true }, { "t": "atiras de cima", "emoji": "💦" } ],
      "explain": "Escorrer pela parede devagaaaaar é o segredo para as camadas não se misturarem." },
    { "q": "No Mar Morto, as pessoas flutuam porque a água é...", "layout": "grid",
      "options": [ { "t": "muito densa (muito salgada)", "emoji": "🌊", "correct": true }, { "t": "muito quente", "emoji": "🔥" } ],
      "explain": "A água do Mar Morto é tão salgada e densa que empurra o corpo para cima." },
    { "q": "A densidade diz-nos...", "layout": "grid",
      "options": [ { "t": "quão apertadas estão as moléculas", "emoji": "🔬", "correct": true }, { "t": "o sabor do líquido", "emoji": "😋" } ],
      "explain": "Moléculas muito apertadas num espaço = alta densidade." }
  ]
}
```
