# Medir longe e perto: km, m, mm e g 🗺️

> [!NOTE] **O que vais aprender** 👀 Vais conhecer as unidades para medir **muito longe** (o **quilómetro**, km) e **muito pequenino** (o **milímetro**, mm), e ainda o **grama (g)** para pesar coisas leves. E vais subir e descer a **escada das medidas** sem te perderes! 🪜

Já sabes medir com o **metro** e o **centímetro**, e pesar com o **quilograma**. Mas como medes a distância de **Lisboa ao Porto**? E o tamanho de uma **formiga**? 🐜 A régua não chega para uma… e é grande de mais para a outra! Hoje ganhas as unidades que faltavam. 🚗🔬

## O quilómetro: para medir longe 🚗

Quando a distância é grande, o metro fica pequeno — seriam números gigantes! Usamos o **quilómetro (km)**: **1 km = 1000 m**. «Quilo» quer dizer **mil**, tal como no quilograma (1 kg = 1000 g)!

```stats
[
  { "label": "Volta ao quarteirão", "value": "≈ 1 km", "hint": "15 minutos a pé 🚶" },
  { "label": "Lisboa → Porto", "value": "≈ 300 km", "hint": "3 horas de carro 🚗" },
  { "label": "Ilha de São Miguel", "value": "≈ 65 km", "hint": "de ponta a ponta 🏝️" },
  { "label": "Lisboa → Açores", "value": "≈ 1450 km", "hint": "2 horas de avião ✈️" }
]
```

```math
{ "expr": "1 km = 1000 m", "say": "um quilómetro é igual a mil metros" }
```

## O milímetro: para medir pequenino 🔬

E para coisas mais pequenas que 1 cm? Olha bem para a tua régua: entre cada centímetro há **10 risquinhos pequeninos** — cada um é **1 milímetro (mm)**. **1 cm = 10 mm**!

```keyvalue
[
  { "k": "Formiga", "v": "cerca de 5 mm — meio centímetro 🐜" },
  { "k": "Grão de arroz", "v": "cerca de 6 mm 🍚" },
  { "k": "Espessura de uma moeda", "v": "cerca de 2 mm 🪙" },
  { "k": "A tua unha", "v": "cresce ≈ 3 mm por mês! 💅" }
]
```

## O grama: para pesar coisas leves 🪶

O **quilograma (kg)** é ótimo para pesar pessoas e mochilas, mas é pesado de mais para uma carta ou uma bolacha. Para isso há o **grama (g)**: **1 kg = 1000 g**.

```compare
[
  { "title": "Leve → gramas 🪶", "rows": [
    { "label": "Clipe", "value": "≈ 1 g" },
    { "label": "Carta", "value": "≈ 20 g" },
    { "label": "Maçã", "value": "≈ 150 g" },
    { "label": "Pacote de massa", "value": "500 g" }
  ] },
  { "title": "Pesado → quilogramas 🏋️", "highlight": true, "rows": [
    { "label": "Pacote de açúcar", "value": "1 kg (= 1000 g)", "highlight": true },
    { "label": "Mochila da escola", "value": "≈ 5 kg" },
    { "label": "Criança de 8 anos", "value": "≈ 28 kg" },
    { "label": "Carro", "value": "≈ 1200 kg" }
  ] }
]
```

## A escada das medidas 🪜

As unidades de comprimento são degraus de uma escada — em cada degrau **multiplicas** (a descer, para unidades mais pequenas) ou **divides** (a subir):

```steps
[
  { "title": "km → m", "body": "× 1000 — Lisboa→Porto: 300 km = 300 000 m!", "icon": "🚗" },
  { "title": "m → cm", "body": "× 100 — 2 m = 200 cm", "icon": "📐" },
  { "title": "cm → mm", "body": "× 10 — 3 cm = 30 mm", "icon": "🔬" },
  { "title": "E o peso?", "body": "kg → g é × 1000 — 2 kg = 2000 g", "icon": "⚖️" }
]
```

## Um exemplo passo a passo 🔍

*«A escola da Marta fica a **2 km** de casa. Quantos **metros** anda ela para ir à escola?»* 🎒

```steps
[
  { "title": "1. O que sabemos?", "body": "a distância é 2 km e queremos metros 🔍", "icon": "🧐" },
  { "title": "2. Lembra a escada", "body": "1 km = 1000 m → de km para m é × 1000", "icon": "🪜" },
  { "title": "3. Calcula", "body": "2 × 1000 = 2000", "icon": "✏️" },
  { "title": "4. Responde", "body": "a Marta anda 2000 m! ✅", "icon": "🎉" }
]
```

> **Truque:** escolhe a unidade **do tamanho da coisa**! Coisas minúsculas → **mm** 🐜; coisas da mão → **cm** ✏️; coisas do teu tamanho ou da sala → **m** 🚪; viagens → **km** 🚗. No peso: leve → **g** 🪶, pesado → **kg** 🏋️. Se o número der gigante ou minúsculo, escolheste a unidade errada!

> [!TIP] **Para saberes mais** 🌱 A **Lua** está a cerca de **384 400 km** da Terra — mais de mil viagens Lisboa–Porto! 🌙 E no outro extremo, os cientistas medem coisas ainda mais pequenas que o milímetro: um **fio de cabelo** tem só **0,1 mm** de espessura — para isso usam o *micrómetro*, mil vezes mais pequeno que o milímetro! 🔬

## Vamos praticar 🎈

```quiz
{
  "id": "mat-3-medidas-2-pratica",
  "questions": [
    { "q": "1 km são…", "layout": "grid",
      "options": [ { "t": "1000 m", "emoji": "🚗", "correct": true }, { "t": "100 m", "feedback": "100 é o fator de metros para cm. Quilo quer dizer mil: 1 km = 1000 m.", "tag": "medidas-fator-conversao" }, { "t": "10 m", "feedback": "10 é de cm para mm. 1 km = 1000 m.", "tag": "medidas-fator-conversao" } ],
      "explain": "Quilo = mil → 1 km = 1000 m." },
    { "q": "1 cm são…", "layout": "grid",
      "options": [ { "t": "10 mm", "emoji": "📏", "correct": true }, { "t": "100 mm", "feedback": "100 é de metros para cm. De cm para mm são 10: 1 cm = 10 mm.", "tag": "medidas-fator-conversao" }, { "t": "2 mm", "feedback": "Um centímetro tem 10 risquinhos de 1 mm, não 2: 1 cm = 10 mm.", "tag": "medidas-fator-conversao" } ],
      "explain": "Cada centímetro tem 10 risquinhos de 1 mm." },
    { "q": "1 kg são…", "layout": "grid",
      "options": [ { "t": "1000 g", "emoji": "⚖️", "correct": true }, { "t": "100 g", "feedback": "100 é de metros para cm. 1 kg = 1000 g.", "tag": "medidas-fator-conversao" }, { "t": "10 g", "feedback": "10 é de cm para mm. 1 kg = 1000 g.", "tag": "medidas-fator-conversao" } ],
      "explain": "Quilo = mil → 1 kg = 1000 g." },
    { "q": "De Lisboa ao Porto são cerca de…", "layout": "grid",
      "options": [ { "t": "300 km", "emoji": "🚗", "correct": true }, { "t": "300 m", "feedback": "300 m é só a volta ao quarteirão. Entre cidades a distância é em km: ≈ 300 km.", "tag": "medidas-unidade-errada" }, { "t": "300 cm", "feedback": "300 cm são 3 metros — três passos! Entre cidades usa km: ≈ 300 km.", "tag": "medidas-unidade-errada" } ],
      "explain": "Distâncias entre cidades medem-se em km — são ≈ 300 km." },
    { "q": "Uma formiga mede-se melhor em…", "layout": "grid",
      "options": [ { "t": "milímetros", "emoji": "🐜", "correct": true }, { "t": "metros", "feedback": "Em metros, a formiga teria o tamanho de uma porta! Mede-se em mm (≈ 5 mm).", "tag": "medidas-unidade-errada" }, { "t": "quilómetros", "feedback": "km são para distâncias entre lugares. Uma formiga mede-se em mm.", "tag": "medidas-unidade-errada" } ],
      "explain": "Coisas minúsculas → mm. A formiga tem ≈ 5 mm." },
    { "q": "Uma maçã pesa-se melhor em…", "layout": "grid",
      "options": [ { "t": "gramas", "emoji": "🍎", "correct": true }, { "t": "quilogramas", "feedback": "Em kg, uma maçã pesaria como um pacote de açúcar. É leve: pesa-se em gramas (≈ 150 g).", "tag": "medidas-unidade-errada" }, { "t": "quilómetros", "feedback": "km medem distância, não peso. Uma maçã pesa-se em gramas.", "tag": "medidas-grandeza-errada" } ],
      "explain": "É leve → gramas (≈ 150 g)." },
    { "q": "3 cm são quantos mm?", "layout": "grid",
      "options": [ { "t": "30 mm", "correct": true }, { "t": "3 mm", "feedback": "Esqueceste de converter: cm → mm é × 10, logo 3 cm = 30 mm.", "tag": "medidas-sem-converter" }, { "t": "300 mm", "feedback": "Multiplicaste por 100. De cm para mm é × 10: 3 cm = 30 mm.", "tag": "medidas-fator-conversao" } ],
      "explain": "cm → mm é × 10: 3 × 10 = 30 mm." },
    { "q": "2 kg são quantos g?", "layout": "grid",
      "options": [ { "t": "2000 g", "correct": true }, { "t": "200 g", "feedback": "Multiplicaste por 100. kg → g é × 1000: 2 kg = 2000 g.", "tag": "medidas-fator-conversao" }, { "t": "20 g", "feedback": "20 g é leve como uma moeda. kg → g é × 1000: 2 kg = 2000 g.", "tag": "medidas-fator-conversao" } ],
      "explain": "kg → g é × 1000: 2 × 1000 = 2000 g." }
  ]
}
```

## 🎯 Questionário final

```quiz
{
  "id": "mat-3-medidas-2-final",
  "final": true,
  "title": "Medir longe e perto: km, m, mm e g",
  "questions": [
    { "q": "Para medir a distância entre duas cidades usas…", "layout": "grid",
      "options": [ { "t": "quilómetros", "emoji": "🚗", "correct": true }, { "t": "centímetros", "feedback": "Em cm davam milhões de números. Entre cidades usa-se km.", "tag": "medidas-unidade-errada" }, { "t": "milímetros", "feedback": "mm são para coisas pequeninas. Entre cidades usa-se km.", "tag": "medidas-unidade-errada" } ],
      "explain": "Distâncias grandes → km." },
    { "q": "Para medir a espessura de uma moeda usas…", "layout": "grid",
      "options": [ { "t": "milímetros", "emoji": "🪙", "correct": true }, { "t": "metros", "feedback": "Em metros a moeda seria enorme. A espessura mede-se em mm (≈ 2 mm).", "tag": "medidas-unidade-errada" }, { "t": "quilómetros", "feedback": "km são para distâncias grandes. A espessura de uma moeda é em mm.", "tag": "medidas-unidade-errada" } ],
      "explain": "Coisas pequeninas → mm (a moeda tem ≈ 2 mm)." },
    { "q": "1 km = ? m", "layout": "grid",
      "options": [ { "t": "1000", "correct": true }, { "t": "100", "feedback": "100 é de metros para cm. Quilo = mil: 1 km = 1000 m.", "tag": "medidas-fator-conversao" }, { "t": "10", "feedback": "10 é de cm para mm. 1 km = 1000 m.", "tag": "medidas-fator-conversao" } ],
      "explain": "Quilo quer dizer mil: 1 km = 1000 m." },
    { "q": "5 km são quantos metros?", "layout": "grid",
      "options": [ { "t": "5000 m", "correct": true }, { "t": "500 m", "feedback": "Multiplicaste por 100. km → m é × 1000: 5 km = 5000 m.", "tag": "medidas-fator-conversao" }, { "t": "50 m", "feedback": "50 m é meio campo de futebol. 5 km = 5 × 1000 = 5000 m.", "tag": "medidas-fator-conversao" } ],
      "explain": "5 × 1000 = 5000 m." },
    { "q": "A escola fica a 2 km. Quantos metros são?", "layout": "grid",
      "options": [ { "t": "2000 m", "emoji": "🎒", "correct": true }, { "t": "200 m", "feedback": "Multiplicaste por 100. km → m é × 1000: 2 km = 2000 m.", "tag": "medidas-fator-conversao" }, { "t": "20 000 m", "feedback": "Multiplicaste por 10 000. km → m é × 1000: 2 km = 2000 m.", "tag": "medidas-fator-conversao" } ],
      "explain": "2 × 1000 = 2000 metros." },
    { "q": "50 mm são quantos cm?", "layout": "grid",
      "options": [ { "t": "5 cm", "correct": true }, { "t": "50 cm", "feedback": "Esqueceste de converter: 10 mm = 1 cm, logo 50 mm = 5 cm.", "tag": "medidas-sem-converter" }, { "t": "500 cm", "feedback": "Foste no sentido errado: de mm para cm divides por 10, dá 5 cm.", "tag": "medidas-direcao-conversao" } ],
      "explain": "10 mm = 1 cm → 50 mm = 5 cm." },
    { "q": "Meio quilo (metade de 1 kg) são…", "layout": "grid",
      "options": [ { "t": "500 g", "emoji": "⚖️", "correct": true }, { "t": "50 g", "feedback": "50 g é muito pouco. Metade de 1000 g são 500 g.", "tag": "medidas-fator-conversao" }, { "t": "5000 g", "feedback": "5000 g são 5 kg, mais que um quilo. Meio quilo são 500 g.", "tag": "medidas-estimativa" } ],
      "explain": "Metade de 1000 g são 500 g." },
    { "q": "Qual destas medidas está mal escolhida?", "layout": "list",
      "options": [ { "t": "uma formiga com 5 km", "emoji": "🐜", "correct": true }, { "t": "uma viagem de 300 km", "emoji": "🚗", "feedback": "Uma viagem entre cidades em km está certa. O erro é a formiga com 5 km.", "tag": "medidas-unidade-errada" }, { "t": "uma maçã com 150 g", "emoji": "🍎", "feedback": "150 g para uma maçã está certo. O erro é a formiga com 5 km (devia ser 5 mm).", "tag": "medidas-unidade-errada" } ],
      "explain": "5 km seria uma formiga maior que uma cidade! O certo seria 5 mm." },
    { "q": "Um pacote de massa de 500 g + outro de 500 g pesam…", "layout": "grid",
      "options": [ { "t": "1 kg", "emoji": "🍝", "correct": true }, { "t": "100 g", "feedback": "500 + 500 = 1000 g, não 100. E 1000 g = 1 kg.", "tag": "medidas-juntar-unidades" }, { "t": "10 kg", "feedback": "500 + 500 = 1000 g = 1 kg, não 10 kg.", "tag": "medidas-juntar-unidades" } ],
      "explain": "500 + 500 = 1000 g = 1 kg." }
  ]
}
```
