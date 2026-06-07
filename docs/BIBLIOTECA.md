# A Biblioteca — plano de desenvolvimento e conteúdo

Documento de trabalho para transformar a área **Biblioteca** numa verdadeira
*biblioteca de descoberta* — o **segundo maior módulo da Sprout**, logo a seguir
ao currículo (Português, Matemática, Estudo do Meio…). Uma mistura de
**biblioteca + Wikipédia infantil + centro de curiosidades + laboratório +
jogo**, muito **visual** (SVG e animações), com **leitura em voz alta** em tudo.
Pensada para crianças dos **6 aos 12 anos** (1.º ao 6.º ano) e para **crescer
quase sem limite** (rumo a milhares de artigos curtos).

> Estado hoje: a Biblioteca (`view.area === "biblioteca"`) já existe com **O
> Dicionário** e **Os Verbos** (`BibliotecaView` em `apps/web/src/App.tsx`).
> Este documento mantém-nos e constrói tudo o resto à volta deles.

---

## 1. Objetivo

Quando uma criança entra na Biblioteca deve conseguir:

- **aprender algo novo** que nunca viu;
- **rever** matéria da escola por outro ângulo;
- **descobrir** temas por curiosidade;
- **preparar** trabalhos escolares;
- **fazer quizzes**, **ganhar estrelas/medalhas** e **colecionar**;
- e, acima de tudo, **voltar mesmo sem ter TPC**.

Princípios (em cima do `CLAUDE.md`):

- **Visual primeiro.** Cada ideia entra pelos olhos: um SVG que mexe, uma
  comparação de tamanhos, uma cor a misturar-se à frente da criança. O texto
  apoia o desenho.
- **Ouvir tudo.** O alvo ainda não lê — tudo tem altifalante. Fala **só ao
  toque** (nunca em hover/drag/automático).
- **Aprender em 2 minutos.** Artigos curtos: ler → ver → mexer → quiz →
  estrelas. Cada artigo é uma `lesson` completa.
- **Reaproveitar tudo.** Corre em cima do modelo `Subject → tier → Lesson(.md)`
  que já existe, herdando de graça: markdown + widgets, `Quiz`,
  progresso/estrelas, conquistas e a pesquisa do Command Center.

---

## 2. Análise — o que encaixa no que já existe

A grande conclusão da análise: **quase tudo o que a visão pede já tem motor na
Sprout.** Não é preciso arquitetura nova; é preciso *conteúdo* e *alguns widgets
visuais*. A tabela mapeia cada módulo da visão ao que já há.

| Módulo da visão | Como se faz na Sprout | Esforço |
|---|---|---|
| Cartões "Descobrir" (Espaço, Dinos…) | cada tema = um `Subject` de referência, cartão na `BibliotecaView` | ✅ reutiliza `Subject`/`BigCard` |
| Enciclopédia (artigos) | cada artigo = `Lesson` (`.md` + widgets + quiz) | ✅ pipeline atual |
| Anatomia do artigo (resumo, factos, quiz, sabias que, ligações) | bloco `summary`, prosa+widgets, `quiz`, callout `[!TIP]`, links `lesson:`/Teia | ✅ blocos atuais |
| Pesquisa "o que queres descobrir?" | Command Center (`Cmd/Ctrl+K`) já indexa todos os `Subject`s | ✅ só mapear `areaOfSubject` |
| Continuar a Aprender | "Visto recentemente" + `progress` (% por lição) | ✅ `history`/`progress` |
| Curiosidade do Dia | lista determinística pelo dia do ano | 🟡 dados + faixa na view |
| Aprender em 2 min (ler→quiz→XP) | lição + teste final → estrelas + conquista | ✅ já é assim |
| XP / Recompensas | as **estrelas** (0–3 por lição) já **são** o XP | ✅ (ver §7) |
| Medalhas / Coleções | derivar das conquistas por tema | 🟡 vista derivada |
| Missões | sequência de artigos+quizzes → medalha | 🟡 dados + ecrã |
| Recomendado para Ti | derivar de "visto recentemente" + tema escolar + Teia | 🟡 heurística |
| As Cores (RGB) | coleção + widgets `cores`/`colormix` | 🟡 2 widgets novos |
| Atlas (animais/plantas, onde vivem, fotos) | coleção + widget `atlas` (com link de fotos) | 🟡 1 widget novo |
| Laboratório Virtual (experiências) | artigo com `steps` + um "revelar resultado" | ✅/🟡 quase reutiliza |
| Biblioteca de Leitura (contos/fábulas/lendas) | artigos de leitura + quiz de compreensão | ✅ (já há contos/fábulas em Português — ligar/estender) |
| Geografia / Bandeiras / Capitais | **já existe** em *Explorar* (`mundo`, `paises`) — **ligar, não duplicar** | ✅ reutiliza |
| História de Portugal / Descobrimentos | **já existe** em Estudo do Meio / HGP — ligar via Teia | ✅ reutiliza |
| **Assistente IA** ("responde adaptado ao ano") | app é **single-page, sem servidor** → ver §8 | 🔴 decisão |

**Único ponto que não encaixa como está: o Assistente IA em tempo real.** A
Sprout é *single-page, sem servidor* (ver `CLAUDE.md`), por isso não pode chamar
um modelo em tempo de execução sem backend. Tratado honestamente em §8.

---

## 3. Mapa da área

```
Biblioteca (view.area === "biblioteca")
│
├── 💡 Curiosidade do Dia        (faixa no topo; muda todos os dias)
├── ▶️  Continuar a Aprender      (últimos artigos, com % — reutiliza history/progress)
├── ⭐ Recomendado para Ti        (ligado ao que anda a estudar)
├── 🔍 Pesquisar                  (Command Center: "o que queres descobrir?")
│
├── 🧭 Descobrir — cartões de tema (cada um = Subject de referência):
│   🚀 Espaço · 🦖 Dinossauros · 🐾 Animais · 🌿 Plantas · 🧠 Corpo Humano ·
│   🔬 Ciência & Invenções · 🌍 Planeta Terra · 🏛️ Pessoas que mudaram o mundo ·
│   🧪 Laboratório · 📖 Histórias & Lendas
│
├── 🗺️ Atlas da Vida             (catálogo de animais e plantas + onde vivem + fotos)
├── 🎨 As Cores                  (cores com nome, HEX e RGB + misturador RGB)
├── 📖 O Dicionário              (já existe) significados de A a Z
├── 🏃 Os Verbos                 (já existe) conjugação de A a Z
│
├── 🎯 Missões                   (percursos de artigos → medalha)
└── 🏆 Coleção de Medalhas       (derivada das conquistas)
```

> **Não duplicar.** Geografia (continentes, países, bandeiras, capitais) e
> História de Portugal já vivem em *Explorar* e no currículo. A Biblioteca
> **liga-se** a esses (cartão "ver no Explorar" + ligações da Teia), em vez de
> os copiar. A Biblioteca foca a **descoberta** (curiosidades, ciência, vida,
> espaço, pessoas) que a escola não cobre.

---

## 4. Arquitetura — encaixar no modelo atual (KISS/DRY)

Tudo o que segue são `Subject`s de referência (como `dicionarioSubject` /
`verbosSubject`), reunidos na área `biblioteca`. Cada coleção é um `Subject`;
cada artigo/cartão é uma `Lesson`.

### 4.1 Temas da Enciclopédia = um `Subject` por tema (gerado)

**Cada tema é o seu próprio `Subject`**, gerado de um array compacto — não
escrito à mão. Escala para além de 6 temas (o slot `YearN` 1–6 chegaria a um
único `Subject`, e a visão quer ~10+), e cada tema reaproveita o `Subject`
inteiro (cartão, ecrã de lista, progresso, pesquisa).

```ts
// apps/web/src/content/enciclopedia.ts (esboço)
const ENC_THEMES = [
  { id: "enc-espaco", label: "Espaço", emoji: "🚀", icon: "planet",
    color: "var(--subj-mundo)", articles: [ /* Lesson[] */ ] },
  { id: "enc-dinos",  label: "Dinossauros", emoji: "🦖", icon: "paw",
    color: "var(--subj-hgp)",   articles: [ … ] },
  …
];
export const enciclopediaSubjects: Subject[] = ENC_THEMES.map(toSubject);
```

Artigos em `content/enciclopedia/<tema>/<artigo>.md`, importados como qualquer
lição. `tierLabel` devolve `""` (não são "X.º ano"). `areaOfSubject` (Command
Center) mapeia para `biblioteca`. Sub-categorias dentro de um tema (ex.: Dinos →
Carnívoros/Herbívoros/Períodos/Extinção) são **secções/agrupamentos** no ecrã do
tema (por uma etiqueta `grupo` na `Lesson`), não níveis de navegação novos.

### 4.2 Coleções tipo-catálogo (Atlas, Cores)

São catálogos de cartões (como o Dicionário), não artigos longos. Cada um é um
`Subject` cujas páginas (por grupo/família) contêm um **widget de cartões novo**
(`atlas`, `cores`).

### 4.3 Escala (milhares de artigos)

O modelo `.md`-por-artigo aguenta milhares de ficheiros, mas **não se mete tudo
num só bundle**. Carregar cada tema **lazy** (`import()` por tema, como já se faz
com `Diversao`/`Teia`) mantém o arranque rápido. Anotado para a Fase 6.

### 4.4 Anatomia de um artigo (a "ficha" da visão)

Mapeia 1:1 a blocos que já existem:

| Parte da visão | Bloco Sprout |
|---|---|
| Resumo | `> [!NOTE] **O que vais aprender**` ou bloco `summary` |
| Explicação simples + Imagens | prosa + **widget visual** (ver §5) |
| Factos Curiosos (3–5) | `keyvalue` / `stats` |
| Quiz (5 perguntas) | bloco `quiz` |
| Sabias que… | callout `> [!TIP] **Para saberes mais** 🌱` |
| Ligações (temas relacionados) | links `[texto](lesson:<id>)` + Teia do Saber |

---

## 5. Estratégia visual (SVG + animação)

Regra de ouro: **todo o artigo tem pelo menos um widget visual acima da dobra.**

### Já existe (reutilizar muito)
`solarsystem` (órbitas), `daynight`, `watercycle`, `bodysystem` (corpo a pulsar),
`timeline`, `mapapt`, `chart` (barras/pizza/linha), `symmetry`, `angle`,
`compass`, `shape`, e infográficos `steps/compare/keyvalue/stats/meters`. Todos
honram `prefers-reduced-motion` e falam só ao toque.

### A construir (novos widgets)
| Widget | Mostra | Usado em |
|---|---|---|
| `colormix` | misturador **RGB** (3 sliders → amostra viva + HEX/RGB) | As Cores, "Como nascem as cores?" |
| `colors` | grelha de cartões de cor (amostra + nome + HEX/RGB) | As Cores |
| `atlas` | cartões de ser vivo (onde vive + link de fotos) | Atlas da Vida |
| `sizecompare` | comparar tamanhos lado a lado (criança vs T-Rex vs baleia) | Dinos, Animais, Espaço |
| `layers` | camadas empilhadas/concêntricas (Terra, atmosfera, oceano) | Planeta Terra, Espaço |
| `lifecycle` | ciclo animado configurável (borboleta, rã, planta) | Animais, Plantas |
| `volcano` | vulcão em erupção (animado) | Laboratório, Planeta Terra |
| `buoyancy` | porque flutuam os barcos (impulsão) | Ciência |
| `skyblue` | porque o céu é azul (luz a dispersar) | Ciência |
| `foodchain` | cadeia alimentar (setas entre seres) | Animais, Plantas |

Cada widget novo: SVG inline (sem libs), `prefers-reduced-motion`, fala só ao
toque, cores dos tokens do design.

---

## 6. Coleções especiais

### 6.1 As Cores — e a pergunta "256? têm todas nome?"
**Não têm todas nome — e é isso que ensinamos** (é mais bonito que a pergunta):

- O ecrã faz cada cor misturando **Vermelho + Verde + Azul (RGB)**.
- Cada um vai de **0 a 255** → **256 níveis** (daí o "256").
- 256³ = **16 777 216** cores (>16 milhões!).
- Só **algumas centenas** têm **nome próprio**; as outras só têm **código HEX**
  (ex.: `#3AC0A0`).

Vira o artigo-estrela **"Como nascem as cores?"** (tema Ciência) com o widget
`colormix`. A coleção **As Cores** tem páginas por **família** (Vermelhos,
Laranjas, Amarelos, Verdes, Azuis, Roxos, Rosas, Castanhos, Cinzentos, Branco &
Preto); cada cartão: amostra + **nome pt-PT** + **HEX** + **RGB** + altifalante.
Curamos **~150 nomes reais em português** (escarlate, turquesa, esmeralda,
índigo, ocre…) — sem inventar para encher (política do Dicionário).

### 6.2 Atlas da Vida — animais & plantas do mundo
Catálogo (`atlas` widget). Cada cartão:
- emoji/figura + **nome** (pt-PT) e, opcional, nome científico;
- **de onde é natural** (ex.: "Savana africana");
- **onde se pode ver** (ex.: "Oceanos de todo o mundo");
- **link "ver fotos"** (abre imagens reais em nova aba — o markdown já o faz).

Páginas por grupo: Mamíferos, Aves, Répteis & anfíbios, Peixes, Insetos,
Árvores, Flores. Os bichos/plantas mais espetaculares ganham também um **artigo**
de mergulho na Enciclopédia (animado).

> **Segurança das fotos:** o Google Imagens não é filtrado. Usar URL com
> **SafeSearch**, ou fonte mais segura (Wikimedia/Wikipédia). Marcar "ver com um
> adulto". Decisão em §10.

### 6.3 Laboratório Virtual
Experiências seguras como artigo: materiais → `steps` → **revelar resultado** →
explicação (callout). Algumas com widget próprio (ex.: `volcano`).

### 6.4 Histórias & Lendas (Biblioteca de Leitura)
Contos, fábulas, lendas portuguesas, biografias simples → artigo de leitura +
**quiz de compreensão**. Liga-se aos contos/fábulas que já existem em Português.

---

## 7. Jogo — estrelas, XP, medalhas, coleções, missões

Reutiliza o que há: cada artigo dá **estrelas** (0–3) no teste final e regista
uma **conquista** (`progress.tsx`). As estrelas **são** o XP.

- **Mapeamento do "+10/+20/+50 XP" da visão:** o modelo atual é estrelas por
  lição (não pontos soltos). Mantemos estrelas como moeda única (consistente com
  toda a app); "ler" conta como visita, "quiz certo" dá estrelas. Não
  introduzimos um segundo sistema de pontos (KISS).
- **Coleção de Medalhas** = distintivos **derivados** das conquistas por tema:
  *Explorador do Espaço* (todos os artigos de Espaço), *Mestre dos Dinossauros*,
  *Cientista Júnior*, *Amigo dos Animais*, *Pintor das Cores*, *Bibliotecário*
  (X artigos no total). Contam-se as `lesson`s feitas por tema — nada a guardar
  de novo.
- **Coleções** (cartas/autocolantes) e **Missões** (percursos: "lê Sistema
  Solar + Lua + Marte e faz 3 quizzes → 🚀 medalha") são camadas finas por cima
  do mesmo progresso. Fase 5.

---

## 8. O Assistente IA — como fazer sem servidor

A visão coloca a "Biblioteca IA" como a funcionalidade mais forte: a criança
pergunta e a IA responde **adaptada ao ano**. Mas a Sprout é **single-page, sem
servidor** — não há onde chamar um modelo em tempo real.

Opções, da que respeita a arquitetura à que a quebra:

1. **IA como ferramenta de autoria (recomendado, Fase 6).** A IA **gera e revê
   os milhares de artigos `.md` offline**; a app serve conteúdo estático,
   rápido e seguro. É assim que se chega aos "5.000–10.000 artigos" sem custo de
   servidor nem risco de respostas erradas a crianças. A "adaptação ao ano"
   faz-se com **variantes** do mesmo artigo (versão 1.º–2.º vs 3.º–4.º vs 5.º–6.º)
   ou níveis de detalhe dentro do artigo.
2. **Pesquisa "inteligente" sem IA.** A barra "o que queres descobrir?" já existe
   (Command Center, com tolerância a erros e acentos). Chega para a maior parte
   do valor de "perguntar à biblioteca".
3. **Assistente online (futuro, exige backend).** Só se/quando houver servidor;
   fica fora do âmbito atual e marcado como decisão de produto.

**Decisão proposta:** Fases 1–5 sem IA em runtime; IA entra como **autoria** na
Fase 6. Confirmar em §10.

---

## 9. Pesquisa e Recomendados

- **Pesquisar:** Command Center já indexa todos os `Subject`s — as coleções
  novas aparecem sozinhas. Mapear `areaOfSubject` (enc/atlas/cores →
  `biblioteca`); opcionalmente indexar nomes de cor e de ser vivo como
  "palavras" (como o dicionário/verbos).
- **Continuar a Aprender:** reutiliza `history` + `progress` (% por lição).
- **Recomendado para Ti:** heurística simples — pega no "visto recentemente" e no
  tema escolar atual e sugere artigos ligados pela **Teia do Saber** (a estudar
  planetas → "Buracos negros"; a dar frações → "Pizza e frações").

---

## 10. Decisões em aberto

1. **Assistente IA** — proposto: autoria offline (§8), sem runtime. ⬅ confirmar.
2. **Fotos do Atlas** — Google Imagens (SafeSearch) vs Wikimedia vs curado.
3. **Modelo dos temas** — proposto: um `Subject` por tema (§4.1).
4. **Por onde começar** — ver roadmap (proposto: Fase 1).

---

## 11. Roadmap (fases)

- [x] **Fase 0 — Plano** (este documento).
- [x] **Fase 1 — Casca + Enciclopédia.** `enciclopedia.ts` (8 temas por-Subject),
  wiring de nav/`areaOfSubject`/ícones, `BibliotecaView` redesenhada (Curiosidade
  do Dia + Descobrir + Coleções), artigos-vitrine animados (Planetas, Cérebro,
  Coração, Água, Dia e noite, Vulcões, Céu azul, Polvo) + a Teia ligada.
- [x] **Fase 2 — As Cores.** Widgets `colormix` (mistura RGB) + `colors` (cartões
  de cor); coleção `coresSubject` (10 famílias); artigo "Como nascem as cores?".
- [x] **Fase 3 — Atlas da Vida.** Widget `atlas` (onde é natural + onde se vê +
  «ver fotos» com SafeSearch); coleção `atlasSubject` (7 grupos, ~60 seres vivos).
- [ ] **Fase 4 — Novos widgets visuais** (`sizecompare`, `layers`, `lifecycle`,
  `volcano`, `buoyancy`, `skyblue`, `foodchain`) + Laboratório + Leitura.
- [ ] **Fase 5 — Jogo** (Medalhas, Coleções, Missões, Recomendados).
- [ ] **Fase 6 — Escala** (autoria por IA rumo a milhares de artigos; lazy por
  tema; encher os artigos placeholder dos 8 temas).

> **Decisões confirmadas:** IA só como **autoria offline** (sem runtime); fotos
> do Atlas via **Google Imagens com SafeSearch**; um `Subject` por tema.

---

## 12. Como autorar (quando estiver de pé)

- **Novo artigo:** 1 `.md` em `content/enciclopedia/<tema>/` + 1 linha no array
  `articles` do tema. Estrutura de lição: resumo → exemplos → ≥1 widget visual →
  "Para saberes mais 🌱" → teste final (`final: true`). `pnpm validate` valida.
- **Nova cor:** `{ "name", "hex" }` no bloco `colors` da família (RGB derivado).
- **Novo ser vivo:** `{ "name", "native", "seen", "photos" }` no bloco `atlas`.
- **Manter a Teia do Saber em sincronia** ao acrescentar/remover ids
  (`content/teia-data.ts`), como pede o `CLAUDE.md`.
```
</content>
