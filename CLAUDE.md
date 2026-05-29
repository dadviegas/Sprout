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

`quiz`, `soundcards`, `clock`, `shape`, `numberline`, `tenframe`, `fraction`,
`money`; infographics `stats`/`steps`/`compare`/`meters`/`keyvalue`/`quote`;
callouts `> [!NOTE]/[!TIP]/…`. The `icon` field in `steps`/`keyvalue` accepts an
`@sprout/icons` name or an emoji.

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

Adding/changing a lesson = one `.md` file + one line in `curriculum.ts`.
Changing page copy/branding = edit `site.config.yaml`.
