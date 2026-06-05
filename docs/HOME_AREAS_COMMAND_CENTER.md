# Simplificar a página inicial por áreas

Documento de trabalho para reorganizar a home da Sprout e atualizar o Command
Center. A home cresceu muito: Academia, anos escolares, Diversão, O Mundo,
Saber de cor, Dicionário, Países e outros atalhos aparecem todos no mesmo nível.
No iPad isto obriga a muito scroll e fica difícil perceber “por onde entro?”.

Objetivo:

- simplificar a entrada;
- agrupar conteúdo em áreas claras;
- manter acesso rápido ao que a criança usa mais;
- não esconder estudo importante;
- atualizar o Command Center para procurar e filtrar por estas áreas.

---

## Diagnóstico atual

Na `Home` em `apps/web/src/App.tsx`, as secções aparecem quase todas no mesmo
nível:

1. Academia dos Elementos;
2. Escolhe o teu ano;
3. Diversão;
4. O Mundo & Curiosidades;
5. Saber de cor;
6. O Dicionário;
7. Países.

Problemas:

- demasiados tópicos na primeira página;
- “Escola” mistura-se visualmente com áreas de apoio e diversão;
- “Saber de cor” ocupa muito espaço porque mostra todos os tópicos;
- “Países” e “O Mundo” parecem áreas separadas, mas semanticamente estão muito
  próximas;
- Dicionário é referência, não devia competir com anos escolares;
- Command Center pesquisa tudo, mas não explica bem em que área o resultado
  vive.

---

## Nova estrutura proposta

Home deve ser um ecrã de **áreas**, não uma lista longa de todos os cartões.

### Primeira camada da home

Mostrar só 4 a 6 cartões grandes:

1. **Academia dos Elementos**
   - o jogo/meta-progressão;
   - entrada emocional principal.

2. **Escola**
   - 1.º ao 6.º ano;
   - disciplinas curriculares.

3. **Treinar**
   - Saber de cor;
   - exercícios rápidos;
   - tabuadas, alfabeto, medidas, fórmulas, datas.

4. **Explorar**
   - O Mundo;
   - Países;
   - curiosidades;
   - cultura geral.

5. **Biblioteca**
   - Dicionário;
   - talvez no futuro textos, histórias, autores, resumos.

6. **Diversão**
   - Jardim;
   - Jogos;
   - Caixa de brincar.

Opcional: se ficar ainda cheio, “Academia” pode ser o hero card no topo e as
outras 5 áreas ficam numa grelha.

---

## Onde cada coisa deve viver

### Escola

Conteúdo:

- 1.º ano;
- 2.º ano;
- 3.º ano;
- 4.º ano;
- 5.º ano;
- 6.º ano.

Dentro de cada ano:

- Matemática;
- Português;
- Estudo do Meio / Ciências;
- Inglês;
- Cidadania;
- TIC;
- Artes / Ed. Visual;
- Ed. Física;
- HGP;
- Ed. Tecnológica;
- Ed. Musical.

Notas:

- isto é a zona “curricular”;
- deve continuar por ano, como já está;
- o cartão Escola na home pode mostrar progresso total por ciclo.

### Treinar

Conteúdo principal:

- **Saber de cor**.

Tópicos:

- tabuadas;
- alfabeto;
- números;
- dinheiro;
- loja;
- dias e meses;
- pontuação;
- classes de palavras;
- verbos;
- formas;
- medidas;
- fórmulas;
- numerais romanos;
- planetas;
- continentes;
- pontos cardeais;
- datas da História de Portugal;
- distritos.

Notas:

- não listar todos estes cartões na home;
- abrir uma página própria “Treinar” ou “Saber de cor” com categorias;
- nesta página, agrupar por tipo.

Categorias internas sugeridas:

- **Matemática rápida:** tabuadas, números, dinheiro, loja, medidas, fórmulas,
  numerais romanos.
- **Português rápido:** alfabeto, pontuação, classes de palavras, verbos.
- **Tempo e calendário:** dias e meses, datas da História de Portugal.
- **Mundo e mapas:** planetas, continentes, pontos cardeais, distritos.
- **Formas e espaço:** formas.

### Explorar

Conteúdo:

- **O Mundo & Curiosidades**;
- **Países**.

Racional:

- Países é uma extensão natural de O Mundo;
- ambos são cultura geral/geografia/identidade;
- devem viver dentro de uma área “Explorar”.

Estrutura sugerida:

- cartão “Açores”;
- cartão “Portugal”;
- cartão “Pelo mundo fora”;
- cartão “Países”.

Dentro de “Países”:

- Portugal;
- Canadá;
- futuros países.

Possível alternativa:

- “Portugal” aparece tanto em O Mundo como em Países. Evitar duplicação visual na
  home: na área Explorar, Portugal pode aparecer uma só vez, com subtabs:
  “Portugal por dentro” e “Portugal no mundo”.

### Biblioteca

Conteúdo:

- **O Dicionário**.

Possíveis futuros:

- histórias;
- textos para leitura;
- autores;
- listas de palavras;
- resumos guardados.

Notas:

- Dicionário deve ser fácil de pesquisar;
- não precisa ocupar um bloco grande na home;
- pode ter entrada forte no Command Center.

### Diversão

Conteúdo:

- Jardim;
- Jogos;
- Caixa de brincar.

Notas:

- pode continuar separado de Academia;
- se a Academia crescer muito, Diversão pode virar “Arcade” dentro do mundo,
  mas por agora manter separado.

### Academia

Conteúdo:

- herói;
- missões;
- XP;
- moedas;
- mundo jogável;
- pets/casa futuramente.

Notas:

- deve continuar visível no topo, porque é o gancho;
- mas não deve empurrar toda a escola demasiado para baixo.

---

## Proposta de navegação

### Novas views possíveis

Adicionar ao `View` em `apps/web/src/nav.ts`:

```ts
| { kind: "area"; area: "escola" | "treinar" | "explorar" | "biblioteca" | "diversao" }
```

Ou, se for preferível ser explícito:

```ts
| { kind: "school" }
| { kind: "train" }
| { kind: "explore" }
| { kind: "library" }
```

Recomendação: usar nomes explícitos se o código ficar mais legível.

Hash sugerido:

- `#/academia`
- `#/escola`
- `#/treinar`
- `#/explorar`
- `#/biblioteca`
- `#/diversao`

### Home simplificada

Home passa a mostrar:

- Academia;
- Escola;
- Treinar;
- Explorar;
- Biblioteca;
- Diversão.

Exemplo:

```txt
┌ Academia dos Elementos ┐

Áreas
┌ Escola ┐ ┌ Treinar ┐ ┌ Explorar ┐
┌ Biblioteca ┐ ┌ Diversão ┐
```

### Página Escola

Mostra o que hoje está na secção “Escolhe o teu ano”.

Manter:

- 1.º ciclo;
- 2.º ciclo;
- cartões dos anos;
- progresso por ano.

### Página Treinar

Mostra Saber de cor por categorias, não grelha gigante única.

Cada categoria pode ser um bloco:

- Matemática rápida;
- Português rápido;
- Tempo e calendário;
- Mundo e mapas;
- Formas e espaço.

### Página Explorar

Mostra:

- Açores;
- Portugal;
- Pelo mundo fora;
- Países.

Pode incluir:

- “Continuar a explorar” com último item aberto;
- progresso agregado de O Mundo + Países.

### Página Biblioteca

Mostra:

- Dicionário A-Z;
- talvez atalhos para letras mais procuradas;
- campo de pesquisa ou CTA para abrir Command Center já filtrado para
  Dicionário.

### Página Diversão

Pode reaproveitar o hub atual de Diversão.

---

## Command Center — atualização necessária

O Command Center deve acompanhar a nova organização por áreas.

Hoje:

- indexa `subjects`;
- permite filtrar por ano e disciplina;
- pesquisa títulos/corpo;
- pesquisa palavras do dicionário.

Falta:

- filtro por área;
- resultados de entrada para áreas;
- melhor etiqueta para conteúdos não escolares;
- ação rápida para abrir Academia, Escola, Treinar, Explorar, Biblioteca e
  Diversão.

### Nova taxonomia de resultados

Cada resultado deve ter uma área:

```ts
type SearchArea =
  | "academia"
  | "escola"
  | "treinar"
  | "explorar"
  | "biblioteca"
  | "diversao";
```

Mapeamento:

- `schoolSubjects` → `escola`;
- `estudoSubject` → `treinar`;
- `mundoSubject` → `explorar`;
- `paisesSubject` → `explorar`;
- `dicionarioSubject` e palavras do dicionário → `biblioteca`;
- `diversao` rooms → `diversao`;
- `academia` → `academia`.

### Filtros novos

Adicionar um filtro “Área” antes de Ano/Disciplina:

- Todas;
- Escola;
- Treinar;
- Explorar;
- Biblioteca;
- Diversão;
- Academia.

Comportamento:

- se Área = Escola, mostrar filtros Ano + Disciplina;
- se Área = Treinar, ocultar Ano e mostrar categorias;
- se Área = Explorar, mostrar O Mundo/Países;
- se Área = Biblioteca, focar dicionário/palavras;
- se Área = Diversão, mostrar jogos/rooms;
- se Área = Academia, mostrar entrada da Academia e talvez missões.

### Resultados de navegação

Mesmo sem query, Command Center deve mostrar atalhos:

- Abrir Academia;
- Abrir Escola;
- Abrir Treinar;
- Abrir Explorar;
- Abrir Biblioteca;
- Abrir Diversão;
- Continuar lição recente.

Com query:

- “academia” encontra Academia;
- “jogo” encontra Diversão/Jogos;
- “tabuada” encontra Treinar/Saber de cor;
- “canadá” encontra Países/Canadá;
- “dicionário” encontra Biblioteca;
- “5 ano matemática” encontra Escola > 5.º ano > Matemática.

### Interface visual

Resultado deve mostrar:

- título;
- área;
- ano/disciplina se aplicável;
- preview;
- ícone;
- progresso se for lição.

Exemplo:

```txt
Tabuadas
Treinar · Matemática rápida
```

```txt
Portugal: o país
Explorar · Países
```

```txt
As dinastias de Portugal
Escola · 6.º ano · História e Geografia
```

### Mudanças técnicas no Command Center

Possível plano:

1. Alterar `Entry` em `CommandCenter.tsx` para incluir:

```ts
area: SearchArea;
areaLabel: string;
kind: "lesson" | "word" | "area" | "room";
```

2. Alterar `buildIndex()` para receber o tipo de subject.

3. Criar `buildAreaIndex()` com entradas para:

```ts
Academia dos Elementos
Escola
Treinar
Explorar
Biblioteca
Diversão
Jardim
Jogos
Caixa de brincar
```

4. Criar `goForHit(hit)`:

- `kind: "lesson"` → navegação atual;
- `kind: "word"` → abre letra e foca palavra;
- `kind: "area"` → abre a área;
- `kind: "room"` → abre `diversao` room.

5. Adicionar filtro por `area`.

6. Atualizar empty query:

- primeiro “Continuar” com recentes;
- depois “Áreas”;
- depois talvez sugestões.

---

## Plano de implementação em fases

### Fase 1 — Documento e configuração

- Criar este plano.
- Confirmar nomes das áreas.
- Confirmar se “Países” fica dentro de Explorar.

### Fase 2 — Home simplificada

- Criar cards de áreas.
- Mover “Escolhe o teu ano” para página Escola.
- Mover Saber de cor para página Treinar.
- Mover O Mundo + Países para Explorar.
- Mover Dicionário para Biblioteca.
- Manter Academia em destaque.
- Manter Diversão como área.

### Fase 3 — Command Center

- Adicionar área a cada entrada.
- Adicionar filtro por área.
- Adicionar resultados de navegação.
- Atualizar etiquetas visuais.

### Fase 4 — Verificação visual

Testar:

- desktop;
- iPad horizontal;
- iPad vertical;
- mobile estreito.

Verificar:

- home não fica com scroll gigante logo no início;
- Escola continua fácil de encontrar;
- Saber de cor não desaparece;
- Países fica fácil dentro de Explorar;
- Command Center encontra tudo.

---

## Critérios de aceitação

Está bom quando:

- home inicial tem no máximo 6 entradas principais;
- “Escola” abre anos 1.º-6.º;
- “Treinar” abre Saber de cor por categorias;
- “Explorar” junta O Mundo e Países;
- “Biblioteca” abre Dicionário;
- Command Center permite filtrar por área;
- Command Center encontra áreas e lições;
- nenhum conteúdo fica inacessível;
- navegação por hash continua válida;
- passa `pnpm --filter @sprout/web validate`;
- passa `pnpm --filter @sprout/web typecheck`;
- foi verificado no playground.

---

## Notas para coordenação

Há muitas alterações paralelas do Claude. Antes de mexer:

1. correr `git status --short`;
2. ler diffs de `App.tsx`, `nav.ts`, `CommandCenter.tsx`, `site.config.yaml`;
3. não reverter trabalho existente;
4. preferir uma fase de cada vez;
5. validar no fim.

