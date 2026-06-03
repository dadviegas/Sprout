# Sprout — evolução, changelog & roadmap 🌱

Documento vivo: **onde estamos**, **o que mudou** e **o que falta**. Complementa
o `README.md` (como correr) e o `ROADMAP.md` (notas históricas do 1.º ciclo).

> Para autores de conteúdo e para quem continua o trabalho: cada lição é **1
> ficheiro `.md` + 1 linha em `content/curriculum.ts`**. Páginas/branding em
> `site.config.yaml`. Correr sempre `pnpm typecheck` + `pnpm validate`.

---

## 1) Estado num relance

| Área | Estado |
| --- | --- |
| **Anos** | **1.º ao 6.º** — 1.º ciclo (1–4) **+ 2.º ciclo (5–6)** ✅ |
| **Navegação** | ecrã inicial agrupa por **ciclo** (1.º ciclo: 4 anos · 2.º ciclo: 2 anos); cada ano mostra **só as suas matérias** (`subjectsForYear`) ✅ |
| **Matérias 1.º ciclo** | Matemática, Português, Estudo do Meio, Inglês, Cidadania, Artes, Ed. Física (7) ✅ |
| **Matérias 2.º ciclo** | Matemática, Português, Inglês, **Ciências Naturais**, **História e Geografia de Portugal**, **Ed. Visual**, **Ed. Tecnológica**, **Ed. Musical**, Ed. Física, Cidadania (10) — *esqueleto criado* 🟡 |
| **Áreas transversais** | O Mundo · Saber de cor · O Dicionário · Países ✅ |
| **Lições 1–4** | ~190 completas + **6 lacunas de Português preenchidas** (ditongos, ordem alfabética, discurso direto, aumentativo/diminutivo, advérbios, sujeito e predicado) ✅ |
| **Lições 5–6** | **~137 escritas** (5.º e 6.º ano completos, todas as matérias, com teste final) ✅ |
| **Saber de cor** | widget **`drill`** + **12 temas novos** (pontuação, classes de palavras, conjugar verbos, formas/sólidos, medidas, fórmulas, romanos, planetas, continentes/oceanos, pontos cardeais, datas de Portugal, distritos) — tudo interativo ✅ |
| **Simulado** | teste de treino **misturado** por matéria/ano, num modal (reusa o motor de Quiz) ✅ |
| **Imagens** | SVG interativo (widgets) · **ilustrações SVG inline** (rehype-raw) · **`figure`** (foto/emoji com legenda lida em voz alta) · pipeline `static/img/` ✅ |
| **Ícones** | conjunto próprio 24×24; **+10 novos** (microscope, scroll, brush, gear, music, atom, leaf, mountain, bolt, target) ✅ |
| **Validação/Tipos** | `pnpm typecheck` ✅ · `pnpm validate` ✅ (221 lições) |

🟡 = a decorrer / por preencher.

---

## 2) Changelog

### 2026-06 — Conteúdo do 2.º ciclo + lacunas e "Saber de cor" (fluxo multi-agente)
- **5.º e 6.º ano escritos** — ~137 lições em todas as matérias do 2.º ciclo,
  geradas por **um agente por matéria×ano** e ligadas em `curriculum.ts`.
- **Português 1–4: 6 lacunas preenchidas** (ditongos, ordem alfabética e
  dicionário, discurso direto, aumentativo/diminutivo, advérbios, sujeito e
  predicado).
- **Saber de cor: 12 temas novos** (referência interativa, vários domínios) +
  a página do alfabeto passou a ter `drill`. Cada tema usa o widget certo
  (`solarsystem` nos planetas, `compass` nos pontos cardeais, `steps` nas datas…)
  e foi **verificado por um 2.º agente** (datas, distritos, ordem dos planetas,
  conjugações e fórmulas conferidas).
- `pnpm typecheck`, `pnpm validate` (378 lições) e `pnpm build` ✅.
- Nota de performance: o `main.js` cresceu (todo o markdown das lições é
  empacotado como string) — candidato a **code-splitting** dos corpos das lições.

### 2026-06 — 2.º ciclo, treino interativo, simulado & imagens
- **Anos 5.º e 6.º (2.º ciclo).** `YearN` passou a `1…6`; `nav.ts`, `App.tsx`
  (`YEAR_STYLE`, índice) e `ui.tsx` acompanham. O ecrã inicial agrupa os anos
  por **ciclo**; cada ano mostra apenas as matérias com lições (`subjectsForYear`).
- **5 matérias novas do 2.º ciclo** em `curriculum.ts`: Ciências Naturais, HGP,
  Ed. Visual, Ed. Tecnológica, Ed. Musical — com **cores próprias** (tokens
  `--subj-cn/-hgp/-ev/-et/-emus`, claro+escuro) e ícones. As matérias que
  atravessam os dois ciclos (Matemática, Português, Inglês, Ed. Física,
  Cidadania) ganharam o **esqueleto 5–6**.
- **Widget `drill`** (`packages/ui/src/widgets/Drill.tsx`) — o treino do "saber
  de cor": modo **cartão** (vê → vira → ouve → auto-avalia) e modo **escolher**
  (toca na resposta certa), com **pontuação, sequência (🔥)** e festa no fim.
  Gera tabuadas automaticamente (`generate`). Ligado em Tabuadas, Números e
  Dias & meses. Tudo lido em voz alta; fala só ao toque.
- **Simulado** (`apps/web/src/Simulado.tsx`) — botão "Pôr-me à prova" no fundo de
  cada matéria; junta perguntas de **todas** as lições do ano e mostra uma
  mistura num modal. Reusa o `Quiz` (não conta para o progresso real).
- **Imagens** — widget **`figure`** (`Figure.tsx`) para foto/ilustração/emoji com
  legenda **lida em voz alta**; **ilustrações SVG inline** já funcionam no
  markdown (rehype-raw); pipeline de imagens em `apps/web/static/img/`
  (servido em dev + copiado no build).
- **+10 ícones** em `@sprout/icons`.

### Antes (ver `ROADMAP.md`)
1.º ciclo completo (7 matérias × 4 anos), O Mundo, Saber de cor, Dicionário,
Países, monorepo, tema Candy/Atlas, IndexedDB, Ctrl/K, validação de conteúdo.

---

## 3) Roadmap — o que falta (por ordem)

1. **Preencher os corpos das ~120 lições do 5.º/6.º.** O esqueleto está
   registado (cartões "em construção"). Cada lição = escrever 1 `.md` (resumo
   "O que vais aprender", exemplos, truque, problema passo a passo, "Para
   saberes mais 🌱", prática + **teste final**) e ligar `body:` em
   `curriculum.ts`. Feito por **fluxo multi-agente** (1 agente por matéria×ano)
   com verificação adversarial e revisão final.
2. **Aprofundar** as ~190 lições de 1–4 (mais exemplos, mais widgets
   interativos, ilustrações) — o mesmo fluxo multi-agente.
3. **Ícones por lição** (`LESSON_ICON`) para os tópicos novos do 2.º ciclo
   (hoje caem no ícone da matéria).
4. **Mais modos de treino** no `drill`: escrever/teclar a resposta (teclado
   numérico para tabuadas) e treino com cronómetro.
5. **Revisão pedagógica** por docente (1.º e 2.º ciclo) antes de fechar temas.
6. **Conteúdo de referência** do 2.º ciclo no "Saber de cor" (fórmulas, verbos
   irregulares, datas-chave de História) com `drill`.

### Ideias de produto (sem data)
- Perfis (vários filhos), medalhas/ofensiva, painel para pais.
- PWA / offline + sincronização (o backend de armazenamento já é trocável).
- Vista de **mapa** para "O Mundo" (as etiquetas `zona`/`país` já existem).

---

## 4) Como contribuir (resumo)

- **Nova lição:** cria `src/content/<materia>/ano<N>/<slug>.md`, importa-a e
  troca o placeholder por `body:` na entrada certa de `curriculum.ts`.
- **Novo widget:** componente em `packages/ui/src/widgets/`, exporta em
  `index.ts`, regista em `apps/web/src/Markdown.tsx` (`widgetRenderers`) e
  acrescenta a `lang` ao `JSON_BLOCKS` do validador.
- **Bloco de treino:** ` ```drill ` com `{ "mode": "flip"|"choose", "items": […] }`
  ou `{ "generate": { "kind": "tabuada", "of": 7 } }`.
- **Imagem:** preferir SVG inline; ` ```figure ` `{ "src": "img/x.jpg", "alt": …,
  "caption": … }` ou `{ "emoji": "🌋", "caption": … }`.
- Antes de fechar: `pnpm typecheck && pnpm validate` (o build corre os dois).
