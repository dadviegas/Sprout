# Sprout 🌱

**Sprout** é uma aplicação web para crianças do **1.º ciclo do ensino básico em Portugal (1.º ao 4.º ano)** aprenderem a brincar. Tudo em **português (pt-PT)**, pensado para **telemóvel, iPad e computador**, e com **leitura em voz alta** — funciona mesmo com quem ainda não lê.

São lições curtas e divertidas, com **quizzes interativos**, **estrelas** ⭐, widgets a sério (relógio, frações, dinheiro…) e acompanhamento do progresso. O mascote **Feijãozinho** 🌱 acompanha a criança.

## O que tem

**7 áreas da escola** (navegadas por ano, 1.º–4.º):

| Área | Cor | O que cobre |
| --- | --- | --- |
| **Matemática** | azul | números, contas, formas, medida, dados |
| **Português** | rosa | letras, sons, leitura, escrita, gramática |
| **Estudo do Meio** | verde | corpo, natureza, Portugal, ciência |
| **Inglês** | roxo | primeiras palavras e frases |
| **Cidadania** | laranja | direitos, ambiente, emoções, dinheiro, internet, saúde |
| **Educação Física** | vermelho | mexer o corpo, jogos, desporto, hábitos saudáveis |
| **Artes** | magenta | cores, música, teatro e dança |

E uma área à parte, **"O Mundo & Curiosidades"** 🧭 — cultura geral / *common sense*, **não** ligada a um ano. Tem secção própria no ecrã inicial: os **Açores** e **Portugal** (a identidade da criança) ficam à mão, e o resto está sob a entrada **"Pelo mundo fora"** (Europa, oceanos, continentes, maravilhas). Navega por **anéis de proximidade** (casa → mundo), não por anos.

> Mais de **140 lições**, 0 placeholders. A cobertura face às Aprendizagens Essenciais é uma **seleção** — ver [docs/COVERAGE.md](docs/COVERAGE.md).

## Como começar

```bash
pnpm install     # instalar dependências
pnpm dev         # abrir em http://localhost:4000
pnpm validate    # validar o conteúdo das lições (blocos JSON, quizzes, teste final)
pnpm build       # validar + build de produção (a validação trava o build)
pnpm typecheck   # verificação de tipos em todo o monorepo (tsc --noEmit)
```

> Requer **Node 20+** e **pnpm**. Sem servidor: é uma _single-page app_; o progresso fica guardado no dispositivo.

## Arquitetura — monorepo pnpm

```
Sprout/
├── packages/
│   ├── icons/      → @sprout/icons — conjunto de ícones próprio (24×24, <Icon name/>)
│   └── ui/         → @sprout/ui — design system, estilos (styles/*.css) e widgets
│                     (Clock, Fraction, Money, NumberLine, TenFrame, Shape, SoundCards…)
└── apps/
    └── web/        → @sprout/web — a app (Rspack + React 18 + TS)
        ├── src/App.tsx            → todos os ecrãs (home, ano, mundo, matéria, lição, teste) + navegação
        ├── src/nav.ts             → união View + validação do estado persistido
        ├── src/content/curriculum.ts → matérias, anos e lições (importa os .md)
        ├── src/content/**/*.md    → corpo das lições (markdown + blocos quiz/widget)
        ├── src/site.config.yaml   → definições da página (ver abaixo)
        ├── src/storage/           → armazenamento durável (IndexedDB + espelho localStorage)
        └── scripts/validate-content.mjs → linter de conteúdo (corre no build)
```

Convenções e princípios de engenharia (DRY, KISS, código em inglês / conteúdo em pt-PT, zero emoji no *chrome*) estão em [CLAUDE.md](CLAUDE.md).

## Como uma criança usa a app

Navegação por **cartões grandes**, sem árvore obrigatória:

```
🏠 Início → 📅 Ano (1.º–4.º) → 📚 Matéria → 📖 Lição → 🏆 Teste
🏠 Início → 🧭 O Mundo (Açores / Portugal / Pelo mundo fora) → 📖 Lição → 🏆 Teste
```

A lição mostra o conteúdo + a prática; o **teste final** (questionário que dá as estrelas) abre num ecrã próprio, pelo botão "Fazer o teste". Há ainda um **mapa das lições** (ícone no topo) para pais/professores e um **centro de comandos** (Ctrl/Cmd+K) que procura em todas as lições.

### Para quem ainda não lê
- Botão **🔊** em perguntas, explicações e mensagens → lê em **pt-PT** (Web Speech API).
- Opções com **emoji grande**, alvos de toque grandes, cores fortes.

## O conteúdo é Markdown

Cada lição é um `.md`. Além do markdown normal (GFM), o renderizador reconhece **blocos de código especiais** (todos JSON):

- **`quiz`** — quiz interativo. Cada lição tem um quiz com `"final": true` (atribui 0–3 ⭐: 3 = tudo certo, 2 = ≥ 60%, 1 = tentou) precedido do cabeçalho `## 🎯 Questionário final`. Os restantes são prática.
- **widgets**: `clock`, `shape`, `numberline`, `tenframe`, `fraction`, `money`, `soundcards`.
- **infográficos**: `summary`, `stats`, `steps`, `compare`, `meters`, `keyvalue`, `quote` (o campo `icon` aceita um nome de `@sprout/icons` ou um emoji).
- **callouts**: `> [!NOTE] / [!TIP] / [!WARNING] / [!DANGER] / [!SUCCESS]`.

### Adicionar uma lição
1. Escreve `apps/web/src/content/<area>/anoN/<slug>.md` (a acabar num bloco `quiz` `"final": true`).
2. Em [curriculum.ts](apps/web/src/content/curriculum.ts): importa o `.md` e adiciona uma entrada `{ id, title, emoji, body }`.
3. `pnpm validate` confirma que os blocos estão bem formados.

## Definições da página (YAML)

[site.config.yaml](apps/web/src/site.config.yaml) é a fonte única do que é configurável na página — marca, mascote e a estrutura da área "O Mundo" (título/subtítulo, entrada "Pelo mundo fora", anéis). É lido em *build time* por [site-config.ts](apps/web/src/site-config.ts) (o parser de YAML não entra no *bundle*). **Mudar a página = editar YAML.**

## Progresso e armazenamento

`apps/web/src/storage/` é uma *facade* síncrona com cache, **IndexedDB** como backend e espelho em `localStorage`, atrás de uma interface trocável (`StorageBackend`). Guarda, por lição: `visited`, `done`, `bestStars`/`bestPct` e a melhor pontuação de cada quiz; e um registo de **conquistas** por data. Apagar: a função `resetAll` do contexto de progresso.

## Documentação

- [CLAUDE.md](CLAUDE.md) — arquitetura, convenções e princípios de trabalho.
- [ROADMAP.md](ROADMAP.md) — o que está feito e o que falta.
- [docs/COVERAGE.md](docs/COVERAGE.md) — cobertura honesta face às Aprendizagens Essenciais.
- [CHANGELOG.md](CHANGELOG.md) — alterações notáveis.
