# Comprimento e massa 📏

> [!NOTE] **O que vais aprender** 👀 Vais aprender a medir **quão comprido** e **quão pesado** é algo, a escolher a unidade certa (mm, cm, m, km e g, kg, t) e a passar de uma unidade para outra. ⚖️

Imagina que queres saber se a tua cama cabe no teu quarto, ou se a tua mochila está demasiado pesada para as costas. Para responder, precisas de **medir**! Medir é comparar uma coisa com uma **unidade** que toda a gente conhece — assim, quando dizes «2 metros», qualquer pessoa percebe logo o tamanho. Vamos a isto! 🚀

## Comprimento — quão comprido? 📏

O **comprimento** diz-nos o tamanho de uma coisa: o quão longa, alta ou larga ela é. A unidade principal é o **metro (m)**, mas há unidades maiores e mais pequenas para tudo caber bem.

```keyvalue
[
  { "k": "milímetro (mm)", "v": "muito pequenino, como a espessura de uma moeda 🪙" },
  { "k": "centímetro (cm)", "v": "a largura do teu dedo; 1 cm = 10 mm 📐" },
  { "k": "metro (m)", "v": "a unidade principal; 1 m = 100 cm" },
  { "k": "quilómetro (km)", "v": "para distâncias grandes; 1 km = 1000 m 🏃" }
]
```

> Para coisas **pequenas** usa **mm** ou **cm** (um lápis). Para coisas **grandes** usa **m** (a sala). Para **distâncias** entre lugares usa **km** (de tua casa à escola). 🗺️

## A escada das unidades 🪜

As unidades de comprimento são como uma **escada**. Cada degrau para cima é **10 vezes maior**, e cada degrau para baixo é **10 vezes mais pequeno**.

```steps
[
  { "title": "Sobes um degrau? Divides por 10", "body": "de cm para… não, espera — para passar de mais pequeno para maior, ficas com menos unidades 🔼", "icon": "📏" },
  { "title": "mm → cm", "body": "10 mm fazem 1 cm", "icon": "🪙" },
  { "title": "cm → m", "body": "100 cm fazem 1 m", "icon": "📐" },
  { "title": "m → km", "body": "1000 m fazem 1 km", "icon": "🏁" }
]
```

```compare
[
  { "title": "Unidades pequenas ✏️", "rows": [
    { "label": "1 cm", "value": "10 mm" },
    { "label": "1 m", "value": "100 cm" },
    { "label": "Um lápis", "value": "≈ 15 cm", "highlight": true }
  ] },
  { "title": "Unidades grandes 🚌", "rows": [
    { "label": "1 km", "value": "1000 m" },
    { "label": "Uma porta", "value": "≈ 2 m" },
    { "label": "Um campo de futebol", "value": "≈ 100 m", "highlight": true }
  ] }
]
```

## Massa — quão pesado? ⚖️

A **massa** diz-nos a quantidade de matéria que uma coisa tem — no dia a dia chamamos-lhe **peso**. Medimo-la com **balanças**. A unidade principal é o **quilograma (kg)**.

```keyvalue
[
  { "k": "grama (g)", "v": "muito leve, como uma pena ou um clipe 🪶" },
  { "k": "quilograma (kg)", "v": "a unidade principal; 1 kg = 1000 g" },
  { "k": "tonelada (t)", "v": "muito pesada; 1 t = 1000 kg 🚚" },
  { "k": "Um pacote de açúcar", "v": "≈ 1 kg 🍚" }
]
```

```meters
[
  { "label": "🍎 Uma maçã", "value": 150, "max": 1000, "tone": "ok" },
  { "label": "🍚 Pacote de açúcar", "value": 1000, "max": 1000, "tone": "ok" },
  { "label": "🐱 Um gato", "value": 4000, "max": 5000, "tone": "warn" }
]
```

> [!NOTE] Usamos **réguas** e **fitas métricas** para o comprimento, e **balanças** para a massa. Antigamente media-se «aos palmos» e «aos passos», mas como cada pessoa é diferente, foi preciso inventar unidades iguais para todos! 📏⚖️

## Comparar e ordenar 🔢

Para comparares duas medidas, é mais fácil se estiverem **na mesma unidade**. Passa as duas para a unidade mais pequena e depois compara os números.

```stats
[
  { "label": "1 m e 50 cm", "value": "150 cm", "hint": "passa o metro a cm: 100 + 50" },
  { "label": "1 kg e 200 g", "value": "1200 g", "hint": "passa o kg a g: 1000 + 200" },
  { "label": "3 km", "value": "3000 m", "hint": "cada km tem 1000 m" }
]
```

> [!WARNING] Cuidado: **2 m são mais que 150 cm!** Não te enganes a olhar só para os números — primeiro põe tudo na mesma unidade. 2 m = 200 cm, e 200 é maior que 150. 🧐

E se medirmos a família toda? Com as alturas todas em **centímetros**, um gráfico de barras ordena-as num piscar de olhos:

```chart
{ "type": "bar", "title": "Alturas da família (cm)",
  "labels": ["👶 Bebé", "🧒 Maria", "👩 Mãe", "👨 Pai"], "data": [70, 120, 165, 180],
  "unit": "cm",
  "say": "O bebé mede setenta centímetros, a Maria cento e vinte, a mãe cento e sessenta e cinco e o pai cento e oitenta. As barras sobem como uma escada!" }
```

## Um exemplo passo a passo 🔍

A Maria tem uma fita de **1 metro e 30 centímetros** e cortou um pedaço de **45 cm** para um embrulho. **Quantos centímetros lhe sobraram?** Vamos com calma.

```steps
[
  { "title": "1. Lê com atenção", "body": "temos 1 m e 30 cm e cortámos 45 cm. Queremos saber o que SOBRA 🧐", "icon": "📖" },
  { "title": "2. Põe tudo na mesma unidade", "body": "1 m = 100 cm, então 1 m e 30 cm = 100 + 30 = 130 cm 📏", "icon": "🔁" },
  { "title": "3. Faz a subtração", "body": "130 cm − 45 cm = 85 cm ➖", "icon": "➖" },
  { "title": "4. Verifica", "body": "85 + 45 = 130? Sim! A conta está certa ✅", "icon": "✔️" },
  { "title": "5. Resposta", "body": "sobraram 85 cm de fita 🎀", "icon": "🎀" }
]
```

> **Truque:** quando passas de **maior para mais pequeno** (m → cm, kg → g, km → m) **acrescentas zeros** (×10, ×100 ou ×1000). Quando passas de **mais pequeno para maior**, **tiras zeros**. Lembra-te: **«de grande para pequeno, mais zeros»**! 0️⃣

> [!TIP] **Para saberes mais** 🌱 Para coisas muito pesadas usamos a **tonelada (t)**: 1 t = 1000 kg. Um carro pesa cerca de 1 tonelada e meia, e um elefante pode chegar às 6 toneladas! 🐘 E para a água há um truque giro: **1 litro de água pesa exatamente 1 kg** — por isso uma garrafa de 1,5 L de água pesa 1,5 kg. 💧

## Vamos praticar 🎈

```quiz
{
  "id": "mat3-medida-pratica",
  "questions": [
    { "q": "Quantos centímetros tem 1 metro?", "layout": "grid",
      "options": [ { "t": "100", "emoji": "💯", "correct": true }, { "t": "10", "feedback": "10 é a passagem de cm para mm. De metros para cm são 100: 1 m = 100 cm.", "tag": "medidas-fator-conversao" }, { "t": "1000", "feedback": "1000 é de km para m (ou de kg para g). 1 metro tem 100 cm.", "tag": "medidas-fator-conversao" } ],
      "explain": "1 metro = 100 cm." },
    { "q": "Quantos gramas tem 1 quilograma?", "layout": "grid",
      "options": [ { "t": "1000", "correct": true }, { "t": "100", "feedback": "100 é de metros para cm. 1 kg tem 1000 g.", "tag": "medidas-fator-conversao" }, { "t": "10", "feedback": "10 é de cm para mm. 1 kg tem 1000 g.", "tag": "medidas-fator-conversao" } ],
      "explain": "1 kg = 1000 g." },
    { "q": "O que usamos para medir a massa (o peso)?", "layout": "grid",
      "options": [ { "t": "uma balança", "emoji": "⚖️", "correct": true }, { "t": "um relógio", "emoji": "🕐", "feedback": "O relógio mede o tempo. A massa (o peso) mede-se na balança.", "tag": "medidas-instrumento-errado" }, { "t": "uma régua", "emoji": "📏", "feedback": "A régua mede comprimento. Para a massa usa-se a balança.", "tag": "medidas-instrumento-errado" } ],
      "explain": "A balança mede a massa (o peso)." },
    { "q": "Para medir a distância de tua casa à escola usas...", "layout": "grid",
      "options": [ { "t": "quilómetros (km)", "emoji": "🏃", "correct": true }, { "t": "milímetros (mm)", "feedback": "Milímetros são para coisas pequeninas (a unha). Distâncias entre lugares medem-se em km.", "tag": "medidas-unidade-errada" }, { "t": "gramas (g)", "feedback": "Gramas medem massa, não distância. Para distâncias usa km.", "tag": "medidas-grandeza-errada" } ],
      "explain": "Distâncias grandes entre lugares medem-se em km." },
    { "q": "Quantos milímetros tem 1 centímetro?", "layout": "grid",
      "options": [ { "t": "10", "correct": true }, { "t": "100", "feedback": "100 é de metros para cm. De cm para mm são 10: 1 cm = 10 mm.", "tag": "medidas-fator-conversao" }, { "t": "1", "feedback": "1 mm é muito pequeno; cabem 10 num centímetro: 1 cm = 10 mm.", "tag": "medidas-fator-conversao" } ],
      "explain": "1 cm = 10 mm." },
    { "q": "Quanto pesa, mais ou menos, um pacote de açúcar?", "layout": "grid",
      "options": [ { "t": "1 kg", "emoji": "🍚", "correct": true }, { "t": "1 g", "feedback": "1 g é leve como uma pena. Um pacote de açúcar pesa cerca de 1 kg.", "tag": "medidas-estimativa" }, { "t": "100 kg", "feedback": "100 kg é o peso de uma pessoa grande! Um pacote de açúcar tem cerca de 1 kg.", "tag": "medidas-estimativa" } ],
      "explain": "Um pacote de açúcar pesa cerca de 1 kg." },
    { "q": "Quanto é 2 metros em centímetros?", "layout": "grid",
      "options": [ { "t": "200 cm", "correct": true }, { "t": "20 cm", "feedback": "Multiplicaste por 10. Cada metro tem 100 cm: 2 × 100 = 200 cm.", "tag": "medidas-fator-conversao" }, { "t": "2000 cm", "feedback": "Multiplicaste por 1000. De metros para cm é × 100: 2 m = 200 cm.", "tag": "medidas-fator-conversao" } ],
      "explain": "Cada metro tem 100 cm, então 2 m = 200 cm." },
    { "q": "Para medir um lápis, qual a melhor unidade?", "layout": "grid",
      "options": [ { "t": "centímetros (cm)", "emoji": "✏️", "correct": true }, { "t": "quilómetros (km)", "feedback": "km são para distâncias entre lugares. Um lápis mede-se em cm.", "tag": "medidas-unidade-errada" }, { "t": "toneladas (t)", "feedback": "Toneladas medem massa muito grande. O comprimento de um lápis é em cm.", "tag": "medidas-grandeza-errada" } ],
      "explain": "Coisas pequenas medem-se em cm." },
    { "q": "Quanto pesa 1 litro de água?", "layout": "grid",
      "options": [ { "t": "1 kg", "emoji": "💧", "correct": true }, { "t": "1 g", "feedback": "1 g é pouquíssimo. 1 litro de água pesa 1 kg (1000 g).", "tag": "medidas-estimativa" }, { "t": "100 kg", "feedback": "100 kg seria pesadíssimo. 1 litro de água pesa só 1 kg.", "tag": "medidas-estimativa" } ],
      "explain": "1 litro de água pesa exatamente 1 kg." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat3-medida-final",
  "final": true,
  "title": "Comprimento e massa",
  "questions": [
    { "q": "Para medir um lápis usas...", "emoji": "✏️", "layout": "grid",
      "options": [ { "t": "centímetros", "correct": true }, { "t": "quilómetros", "feedback": "km são para distâncias grandes. Um lápis mede-se em cm.", "tag": "medidas-unidade-errada" }, { "t": "toneladas", "feedback": "Toneladas medem massa, não comprimento. Um lápis mede-se em cm.", "tag": "medidas-grandeza-errada" } ],
      "explain": "Coisas pequenas medem-se em cm." },
    { "q": "Quantos gramas tem 1 quilograma?", "layout": "grid",
      "options": [ { "t": "1000", "correct": true }, { "t": "100", "feedback": "100 é de metros para cm. 1 kg tem 1000 g.", "tag": "medidas-fator-conversao" }, { "t": "10", "feedback": "10 é de cm para mm. 1 kg tem 1000 g.", "tag": "medidas-fator-conversao" } ],
      "explain": "1 kg = 1000 g." },
    { "q": "O que pesa mais?", "layout": "grid",
      "options": [ { "t": "1 kg de açúcar", "emoji": "🍚", "correct": true }, { "t": "150 g (uma maçã)", "emoji": "🍎", "feedback": "Põe na mesma unidade: 1 kg = 1000 g, muito mais que 150 g.", "tag": "medidas-comparar-converter" } ],
      "explain": "1 kg = 1000 g, muito mais que 150 g." },
    { "q": "Para medir a sala, é melhor usar...", "layout": "grid",
      "options": [ { "t": "metros", "correct": true }, { "t": "centímetros", "feedback": "Em cm davam centenas de números. Uma sala mede-se melhor em metros.", "tag": "medidas-unidade-errada" }, { "t": "milímetros", "feedback": "mm são para coisas pequeninas. Uma sala mede-se em metros.", "tag": "medidas-unidade-errada" } ],
      "explain": "Coisas grandes medem-se em metros." },
    { "q": "Quantos metros tem 1 quilómetro?", "layout": "grid",
      "options": [ { "t": "1000", "emoji": "🏁", "correct": true }, { "t": "100", "feedback": "100 é de metros para cm. 1 km tem 1000 m.", "tag": "medidas-fator-conversao" }, { "t": "10", "feedback": "10 é de cm para mm. 1 km tem 1000 m.", "tag": "medidas-fator-conversao" } ],
      "explain": "1 km = 1000 m." },
    { "q": "O que é maior?", "layout": "grid",
      "options": [ { "t": "2 metros", "correct": true }, { "t": "150 centímetros", "feedback": "Põe na mesma unidade: 2 m = 200 cm, e 200 cm é mais que 150 cm.", "tag": "medidas-comparar-converter" } ],
      "explain": "2 m = 200 cm, e 200 cm é mais que 150 cm." },
    { "q": "1 metro e 30 cm é o mesmo que...", "layout": "grid",
      "options": [ { "t": "130 cm", "correct": true }, { "t": "13 cm", "feedback": "1 metro são 100 cm, não 10. Com mais 30 cm dá 130 cm.", "tag": "medidas-juntar-unidades" }, { "t": "103 cm", "feedback": "Junta bem: 100 cm + 30 cm = 130 cm (não 103).", "tag": "medidas-juntar-unidades" } ],
      "explain": "1 m = 100 cm, mais 30 cm dá 130 cm." },
    { "q": "Quantos quilogramas tem 1 tonelada?", "layout": "grid",
      "options": [ { "t": "1000 kg", "emoji": "🚚", "correct": true }, { "t": "100 kg", "feedback": "Uma tonelada tem 1000 kg, não 100.", "tag": "medidas-fator-conversao" }, { "t": "10 kg", "feedback": "10 kg é o peso de uma mala. 1 tonelada tem 1000 kg.", "tag": "medidas-fator-conversao" } ],
      "explain": "1 t = 1000 kg." },
    { "q": "Com que instrumento medes o comprimento de uma mesa?", "layout": "grid",
      "options": [ { "t": "uma fita métrica", "emoji": "📏", "correct": true }, { "t": "uma balança", "emoji": "⚖️", "feedback": "A balança mede a massa. Para o comprimento usa régua ou fita métrica.", "tag": "medidas-instrumento-errado" } ],
      "explain": "Comprimentos medem-se com régua ou fita métrica." }
  ]
}
```
