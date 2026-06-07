# Armar contas 🧮

> [!NOTE] **O que vais treinar** 👀
> Armar uma conta é **arrumar os números em colunas**, como numa torre bem
> direitinha. Depois resolves **um andar de cada vez**, da direita para a
> esquerda. Toca no **+** para veres o passo seguinte e no 🔊 para ouvires. 🚀

## A regra de ouro 📐

Cada algarismo tem uma **casa**:

- as **unidades** ficam debaixo das unidades;
- as **dezenas** ficam debaixo das dezenas;
- as **centenas** ficam debaixo das centenas.

Por isso encostamos os números **à direita**. Se houver vírgula, as vírgulas
ficam uma por baixo da outra.

```keyvalue
[
  { "k": "Armar a conta", "v": "pôr um número por baixo do outro, alinhados à direita 📐", "icon": "grid" },
  { "k": "Transporte (o «vai 1»)", "v": "se a coluna dá 10 ou mais, escreves a unidade e levas a dezena ➡️", "icon": "plus" },
  { "k": "Empréstimo", "v": "se não dá para tirar, pedes 10 à casa da esquerda 🤝", "icon": "minus" },
  { "k": "Vírgula alinhada", "v": "com decimais, a vírgula fica sempre na mesma coluna 🔢", "icon": "target" }
]
```

## Como se faz, passo a passo 📋

Escolhe a operação. Lê cada passo como se fosse uma receita: primeiro arrumas,
depois fazes a coluna da direita, depois a próxima. Se ficares preso, ouve no 🔊.

```contaarmada
{
  "guide": true,
  "examples": [],
  "practice": false
}
```

## Somar e subtrair ➕➖

```contaarmada
{
  "practice": false,
  "examples": [
    { "op": "add", "a": 248, "b": 176 },
    { "op": "sub", "a": 503, "b": 247 }
  ]
}
```

### O que se passa por baixo 🔎

O **«vai 1»** é mesmo **10 unidades a virarem 1 dezena**; o **empréstimo** é uma
**dezena a partir-se em 10 unidades**. Vê com blocos — cubos são unidades, barras
são dezenas — e segue a **seta** a mostrar o bloco a mudar de coluna.

```blocos
{ "op": "add", "a": 27, "b": 15 }
```

```blocos
{ "op": "sub", "a": 32, "b": 15 }
```

## Multiplicar e dividir ✖️➗

```contaarmada
{
  "practice": false,
  "examples": [
    { "op": "mul", "a": 34, "b": 26 },
    { "op": "div", "a": 156, "b": 4 }
  ]
}
```

## Com vírgulas (decimais) 🔢

```contaarmada
{
  "practice": false,
  "examples": [
    { "op": "add", "a": "12.5", "b": "3.75" },
    { "op": "mul", "a": "1.5", "b": "1.2" }
  ]
}
```

## Agora treinas tu! ✏️

Primeiro, **resolve estas contas** e clica em **«Verificar»** — se ficares com
dúvidas, carrega na **grelha** para veres uma coluna de cada vez. Depois,
**inventa as tuas próprias**: escolhe a operação, escreve os números e carrega em
**«Armar a conta»**. Boa sorte! 💪

```contaarmada
{
  "title": "A tua zona de treino",
  "examplesLayout": "rows"
}
```

## Põe-te à prova 🎯

Esta é a tua ficha de treino: **5 contas de cada operação**, com **números
sempre diferentes**. Resolve todas, carrega em **«Verificar»** para veres como
te saíste e, quando quiseres, pede **«Números novos»** para treinar outra vez. 🎲

```contaarmada
{
  "test": true,
  "examples": [],
  "practice": false
}
```
