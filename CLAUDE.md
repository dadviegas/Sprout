# CLAUDE.md — working notes for this repo

Sprout is a kids' learning app for the Portuguese **1.º ciclo** (1.º–4.º ano),
plus a cross-cutting **"O Mundo & Curiosidades"** area (general culture /
common sense, Açores → world). Single-page, no server; progress is local.

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

## Markdown/widget blocks (for lesson authors)

`quiz`, `soundcards`, `clock`, `shape`, `angle`, `areagrid`, `symmetry`,
`compass`, `watercycle`, `bodysystem`, `timeline`, `mapapt`, `numberline`, `tenframe`, `fraction`, `money`, `shop`,
`solarsystem`, `daynight`, `tabuada`, `math`, `chart`, `dictionary`;
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
- `timeline` is a horizontal "linha do tempo" — dated markers on an arrow,
  oldest→newest, evenly spaced; tap a marker to highlight it and hear the event.
  Data-driven like `chart`. Fields: `title`, `events` (`{ year, label, say?,
  emoji? }`, `year` shown on the axis and `label` in the readout), `color`
  (subject key, default `hgp`). Good for História/datas and any chronology.
- `mapapt` is a stylised, tappable map of Portugal — the 18 mainland districts as
  numbered dots placed by relative geography (north→south), plus Açores/Madeira
  in the ocean as Regiões Autónomas (different colour, not numbered). Tap a place
  to hear where it is and its capital. Built-in catalog (geography is the single
  source of truth, like `compass`). Fields: `title`, `color` (subject key,
  default `edm`). The silhouette is deliberately schematic, not survey-accurate.
- `money` has two modes: **collect** (`items` + `target` — tap coins to fill a
  mealheiro) and **pay** (`price` — tap a notes+coins palette to build exactly
  the amount to pay). Passing `price` selects pay mode.
- `solarsystem` is an animated orbit diagram (Sun + planets + nested moons); each
  body has `orbit`/`size`/`period`/`color`/`fact`, tap-to-hear, play/pause,
  honours `prefers-reduced-motion`. Pass `"layout": "lineup"` for the static
  *parade* view instead — the Sun + planets stood side by side on a starry sky,
  sized by `size` to compare, tap-to-hear (no orbits, so `orbit`/`period` are
  ignored). Add optional `dwarfs` (same `SpaceBody` shape) to show Plutão & co.
  small after the eight planets. `daynight` is a spinning Earth showing which
  places are in day vs. night (the idea behind time zones).

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
