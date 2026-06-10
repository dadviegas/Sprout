# CLAUDE.md — working notes for this repo

Sprout is a kids' learning app for the Portuguese **1.º ciclo** (1.º–4.º ano),
plus a cross-cutting **"O Mundo & Curiosidades"** area (general culture /
common sense, Açores → world). Single-page, no server; progress is local.

## Roadmap — follow this when building new features

The plan for the **study/recovery engine** (TPC, spaced repetition / banco de
erros, session tracking, diagnostic, holiday-recovery mode, study calendar,
parent alerts + weekly report, pre-reader mode) lives in
**[docs/PLANO-ESTUDO.md](docs/PLANO-ESTUDO.md)**. It is the single source of
truth for *what to build next and in what order*, and records what already
exists so you **extend** it instead of rebuilding. Read it before starting new
work, and keep it updated as you ship. (For missing *lesson content*, see
`docs/MATERIA_EM_FALTA.md` and `docs/COVERAGE.md`.)

## How to work here (keep this in focus)

- **KISS.** Prefer the simplest thing that works. No frameworks, abstractions,
  or indirection a junior couldn't follow on first read. Don't add a layer
  until a second caller actually needs it.
- **DRY.** One source of truth per fact. Page copy/structure → `site.config.yaml`.
  Lesson data → `content/curriculum.ts`. Don't duplicate labels, colours, or
  lists across files — derive them.
- **Refactor as you go.** When you touch an area, leave it cleaner: collapse
  duplicated branches, delete dead code, rename for clarity. Small, behaviour-
  preserving cleanups alongside the change — not a separate "cleanup later".
- **Match the surrounding code.** Same naming, comment density, and idioms.

## Conventions (non-negotiable)

- **Code & comments in English; UI text & lesson content in Portuguese (pt-PT).**
- **No emoji in the chrome** (buttons, badges, nav, widgets) — use
  `@sprout/icons` (`<Icon name=… />`). Emoji are fine *inside* lesson content.
- **Read-aloud everywhere.** Every question/explanation/message must be hearable
  (speaker icon) — the target child can't read yet.
- **Speech only on a button/tap.** `speak()` may only fire from an explicit click
  — the speaker button, a +/− button, or a tappable element. Never speak on a
  drag, hover, or automatically (no autoplay on mount/navigation).
- **Lessons** open with an "O que vais aprender" summary, then worked examples,
  a mental trick, a walked-through problem, a "Para saberes mais 🌱" stretch
  fact (one notch above grade level), and end with practice + a final `quiz`
  (`"final": true`) on its own test screen.

## Layout

- `apps/web` — the app (Rspack + React 18 + TS). Entry `src/index.tsx`.
  - `src/App.tsx` — all screens (home, year, mundo, subject, lesson, test) + nav.
  - `src/nav.ts` — `View` union + persisted-state validation.
  - `src/content/curriculum.ts` — subjects, years, lessons (imports `.md` bodies).
  - `src/content/**/*.md` — lesson bodies (markdown + widget/quiz blocks).
  - `src/Teia.tsx` + `src/content/teia-data.ts` — **"A Teia do Saber"**, the
    interactive cross-subject knowledge web (`view.kind === "teia"`, `#/teia`).
    `teia-data.ts` stores only the RELATIONSHIPS (which lessons share a theme,
    which themes bridge); each node's title/emoji/colour is derived from
    `curriculum.ts` at runtime (an unknown lessonId is silently dropped).
  - `src/site.config.yaml` + `src/site-config.ts` — **page settings** (branding,
    mascot, the "O Mundo" area copy/structure). Edit the YAML to change the page.
  - `src/storage/` — durable storage facade (IndexedDB + localStorage mirror)
    behind a swappable `StorageBackend`.
- `packages/ui` — design system, styles (`styles/*.css`), interactive widgets.
- `packages/icons` — the in-house 24×24 icon set (`<Icon>`).

## Navigation model

- **School subjects** navigate year-first: `home → year → subject → lesson → test`.
  The four school subjects are `schoolSubjects`.
- **"O Mundo"** is *not* a school subject and *not* tied to a grade. It has its
  own home-screen section. Its 1–4 are **proximity rings** (`mundoRings`), named
  in `site.config.yaml`. Açores + Portugal are featured on home (`home: true`);
  the wider-world rings sit under the **"Pelo mundo fora"** entry
  (`view.kind === "mundo"`). Tier labels come from `tierLabel(subjectId, tier)`
  — never show "X.º ano" for O Mundo.

## Biblioteca: o dicionário (com os verbos lá dentro)

The **Biblioteca** is one merged area — a single **dictionary** (A–Z letter
pages, `dicionarioSubject`) that *also* holds the **verbs**. There is no separate
"Verbos" entry on screen: each letter's verbs are **derived into its dictionary
page at render time** (`content/dictMerge.ts` → the `dictionary` renderer in
`Markdown.tsx`), so `content/verbos/[a-z].md` stays the **single source of truth**
— never copy a verb into a `dicionario/*.md`. Tapping **conjugar** on a verb card
opens its full conjugation in a modal (`VerbConjugation`; regular verbs
auto-conjugate via `conjugate.ts`, irregulars carry an explicit `forms` table).
A word that's also a verb (homograph like *jantar*) keeps its meaning/class and
gains "conjugar" too (the renderer attaches the verb data).

A `dictionary` entry is `{ word, meaning, emoji?, class?, tema?, say? }`:

- **`class`** — part of speech, one of `nome`, `verbo`, `adjetivo`, `adverbio`,
  `numeral`, `pronome`, `interjeicao`, `artigo`, `preposicao`, `conjuncao`
  (ASCII keys). Shows a class icon + tooltip and drives the first filter row.
- **`tema`** — real-world theme, one of `animais`, `comida`, `corpo`, `casa`,
  `escola`, `natureza`, `transportes`, `roupa`, `cores`, `tempo`, `pessoas`,
  `portugal`. **Optional** — abstract words have none; *never force a theme*.
  Shows a theme icon + drives the second filter row.

Both are optional and validated by `pnpm validate`. Their icons live in
`CLASS_ICON` / `THEME_ICON` in `packages/ui/src/widgets/Dictionary.tsx` (classes
use the `wc*` glyphs; themes reuse existing glyphs, e.g. `paw`/`apple`/`car`).

**Verb convention:** a single-word, *regular* infinitive belongs in `verbos/*.md`
(migrated out of the dictionary). A truly **irregular** verb we can't conjugate
safely stays in the dictionary as `class: "verbo"` with no `forms` — so the child
never sees wrong tenses. Verb *phrases* (e.g. *andar de bicicleta*) stay in the
dictionary tagged `class: "verbo"`.

## Markdown/widget blocks (for lesson authors)

`quiz`, `soundcards`, `clock`, `shape`, `angle`, `areagrid`, `symmetry`,
`compass`, `watercycle`, `bodysystem`, `timeline`, `mapapt`, `numberline`, `tenframe`, `fraction`, `money`, `shop`,
`solarsystem`, `daynight`, `tabuada`, `contaarmada`, `dinheirojogo`, `math`, `chart`, `dictionary`, `verbs`,
`colors`, `colormix`, `atlas`, `sizecompare`,
`volcano`, `skyblue`, `buoyancy`, `lifecycle`, `foodchain`, `layers`;
infographics `stats`/`steps`/`compare`/`meters`/`keyvalue`/`quote`;
callouts `> [!NOTE]/[!TIP]/…`. The `icon` field in `steps`/`keyvalue` accepts an
`@sprout/icons` name or an emoji.

Each SVG widget teaches one idea with a kid metaphor and read-aloud (audio fires
only on a button/tap — see the speech rule below). New ones:

- `angle` draws an angle as inline SVG — a vertex with two sides (semirretas), a
  tinted opening arc, the little square at exactly 90°, and a live name
  (agudo/reto/obtuso/raso) read aloud. Interactive by default (drag the tip or
  use −/+ to open/close the "boca de crocodilo"); pass `"interactive": false`
  for a fixed reference diagram. Fields: `angle` (0–180, default 45), `title`,
  `color` (subject key, default `mat`).
- `areagrid` shows a rectangle of unit squares — área (the filled squares) vs
  perímetro (the bold outline) — with side labels and live `w×h` / `2(w+h)`.
  Resize with −/+. Fields: `width` (1–10), `height` (1–8), `unit` (default
  `cm`), `title`, `interactive`, `color`.
- `symmetry` shows a figure as a left half + a mirror half across a dashed eixo;
  tap **Espelhar** to reveal the reflection coinciding. Fields: `shape`
  (`coracao`|`borboleta`|`arvore`), `title`, `interactive`.
- `compass` is the rosa dos ventos — N/S/E/O (+ NE/NO/SE/SO), tap a point to
  rotate the needle and hear it. Fields: `title`, `colaterais` (default true).
- `watercycle` is the labelled water-cycle scene (sun, sea, cloud, rain, river)
  with four tappable stages and a looping droplet that honours reduced-motion.
  Field: `title`.
- `bodysystem` is a neutral human silhouette whose organ systems light up one at
  a time — tap a chip (respiratório, circulatório, digestivo, excretor, nervoso,
  locomotor) to see that system's organs on the body and hear what it does. The
  heart gives a gentle beat for the circulatory system (honours reduced-motion).
  Fields: `title`, `systems` (subset of the six keys above, in order; default
  all six). Use the full set for "os sistemas do corpo" and a single-key subset
  (e.g. `["digestivo"]`) to locate one system in its own lesson.
- `timeline` is a vertical "linha do tempo" — dated moments stacked oldest (top)
  to newest (bottom), joined by a spine; each is a card with its year/era, a
  headline, an optional detail line and its own read-aloud speaker, plus a marker
  dot (the event's emoji, or a solid dot). Data-driven like `chart`. Fields:
  `title`, `events` (`{ year, label, body?, say?, emoji? }` — `year` is the
  date/era on the dot, `label` the headline, `body` an optional detail line),
  `color` (subject key, default `hgp`). Good for História/datas and any
  chronology.
- `mapapt` is a stylised, tappable map of Portugal — the 18 mainland districts as
  numbered dots placed by relative geography (north→south), plus Açores/Madeira
  in the ocean as Regiões Autónomas (different colour, not numbered). Tap a place
  to hear where it is and its capital. Built-in catalog (geography is the single
  source of truth, like `compass`). Fields: `title`, `color` (subject key,
  default `edm`). The silhouette is deliberately schematic, not survey-accurate.
- `money` has two modes: **collect** (`items` + `target` — tap coins to fill a
  mealheiro) and **pay** (`price` — tap a notes+coins palette to build exactly
  the amount to pay). Passing `price` selects pay mode.
- `dinheirojogo` is **"O Jogo do Dinheiro"** — a levelled money game built on the
  conta-armada engine (`buildSheet` + `ContaSheet`) and the `money` tokens. Each
  round tells a money story (read aloud), arms the matching conta to solve, then
  asks the child to **pay/form the amount with coins**; both right earns a ⭐, 3
  ⭐ level up. The four levels are the four operations (somar → troco → comprar
  muitos → repartir), each drawing from kid themes (loja/mealheiro/feira/limpeza
  da casa). Within a level the **difficulty ramps with the stars earned** (0 =
  whole euros, 1 = cents with carrying/borrowing, 2 = two-digit amounts), so the
  conta grows from `3 + 1` to `12,40 + 8,75` before levelling up. Problems are
  generated in `dinheiro-jogo-data.ts` (whole-cents in multiples of 5c, so money
  stays exact and the pay step stays short; division parts are kept ≥ 0,10 € so
  the quotient reads as money). Fields: `title`, `startLevel` (1–4, default 1),
  `color` (default `mat`).
- `solarsystem` is an animated orbit diagram (Sun + planets + nested moons); each
  body has `orbit`/`size`/`period`/`color`/`fact`, tap-to-hear, play/pause,
  honours `prefers-reduced-motion`. Pass `"layout": "lineup"` for the static
  *parade* view instead — the Sun + planets stood side by side on a starry sky,
  sized by `size` to compare, tap-to-hear (no orbits, so `orbit`/`period` are
  ignored). Add optional `dwarfs` (same `SpaceBody` shape) to show Plutão & co.
  small after the eight planets. `daynight` is a spinning Earth showing which
  places are in day vs. night (the idea behind time zones).
- `volcano` is a cut-through volcano (câmara magmática → chaminé → cratera →
  lava); tap each part to hear it, and an "Entrar em erupção" button animates the
  lava/ash (reduced-motion safe). Field: `title`. Used in Laboratório / Planeta
  Terra. `skyblue` explains why the sky is blue (and red at sunset) — a tappable
  day↔sunset toggle showing blue light scattering. Field: `title`. `buoyancy`
  shows why boats float: load cargo with −/+ and watch the **impulsão** (up) vs
  **peso** (down) until it sinks. Field: `title`.
- `lifecycle` is a configurable life-cycle ring (egg → … → adult → egg); tap a
  stage or "Próxima fase" to walk it. Use a built-in `cycle`
  (`borboleta`|`ra`|`planta`|`galinha`) or pass your own `stages`
  (`{emoji,label,say?}[]`). Field: `title`. `foodchain` draws a "quem come quem"
  chain — `chain` is `{emoji,name,role?,say?}[]`, the arrow means "is eaten by";
  field `title`. `layers` shows stacked or concentric layers (Earth's interior,
  the atmosphere) — `shape` is `"stack"` (default) or `"concentric"`, `layers` is
  `{label,color?,note?,say?}[]` (outer first for concentric); field `title`.

### Math & graphics (for "math e gráficos" in lessons)

- `math` renders kid-friendly notation **without LaTeX/KaTeX** — pretty operators
  (×, ÷, −, ≥, ≤, ≠) and **stacked fractions** written `a/b`. This is deliberate:
  1.º ciclo, not algebra — don't reach for a math engine.
  ````md
  ```math
  { "expr": "1/2 + 1/4 = 3/4", "say": "um meio mais um quarto é igual a três quartos" }
  ```
  ````
  `say` is the optional read-aloud text; without it one is built from `expr`.
- `chart` draws a **bar / pie / line** chart as plain inline SVG — no chart
  library, coloured from the design tokens, with a read-aloud speaker. Fields:
  `type` (`bar`|`pie`|`line`, default `bar`), `labels` (one per point), `data`
  (numbers, same length as `labels`), optional `title`, `unit` (e.g. `"milhões"`,
  spoken and shown), `colors` (override the token palette), and `say` (read-aloud
  override). Use `bar`/`line` to compare amounts, `pie` for parts of a whole
  (slices show %). Example — comparing two countries (e.g. Portugal vs. Canadá):
  ````md
  ```chart
  { "type": "bar", "title": "População (milhões)",
    "labels": ["Portugal", "Canadá"], "data": [10, 39],
    "unit": "milhões",
    "say": "Portugal tem cerca de 10 milhões; o Canadá tem cerca de 39." }
  ```
  ````
  For a side-by-side fact table (capital, área, língua…) prefer the `compare`
  infographic; reach for `chart` when a number is worth *seeing* as bars/slices.

## Commands

```bash
pnpm dev         # rspack serve on http://localhost:4000
pnpm validate    # lint lesson content (JSON blocks, quiz shape, final test)
pnpm build       # validate, then production build (validation gates the build)
pnpm typecheck   # tsc --noEmit across all workspace packages (strict; runs clean)
```

Lesson blocks are `JSON.parse`d at runtime, so a malformed `quiz`/widget block
only shows as an error card when that lesson is opened. `pnpm validate`
(`apps/web/scripts/validate-content.mjs`, zero deps) catches those before the
build: invalid JSON, a quiz with no `correct` option, a missing final test,
colliding quiz ids. Run it after authoring lessons.

**Run content checks via the `pnpm` scripts, never the raw script.** Use
`pnpm validate` / `pnpm typecheck` / `pnpm lint` — not `node scripts/…` — so the
checks stay on the project's allowlist and don't trigger a permission prompt.
Don't spin up throwaway `node -e "…"` or `node /tmp/test_*.js` scripts to probe
regex/string behaviour; reason it through inline instead. `node …` is arbitrary
code execution, so it (correctly) prompts every time and must never be added to
an allowlist — keep approving those one-off, but never "for all projects".

Adding/changing a lesson = one `.md` file + one line in `curriculum.ts`.
Changing page copy/branding = edit `site.config.yaml`.

**Keep "A Teia do Saber" in sync.** When you add, rename, remove or re-id a
lesson/area, update `apps/web/src/content/teia-data.ts` so the knowledge web
stays accurate: drop ids that no longer exist, and wire genuinely new
cross-subject material into the relevant theme(s) (or add a theme/bridge). A
lesson that belongs to two themes is a *bridge* — that cross-over is the whole
point, so prefer adding new content to an existing theme over leaving it
unconnected. Renames need no change there (titles/emoji/colour derive from
`curriculum.ts`); only ids matter. A wrong id won't crash — it's silently
dropped — so a stale entry just quietly shrinks the web.
