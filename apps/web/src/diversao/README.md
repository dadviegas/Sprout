# Jogos — the Diversão arcade

This folder is the little **arcade** that lives in the grade-less **Diversão**
area (`view.kind === "diversao"`, room `jogos`). It's the only part of Sprout
that draws on `<canvas>` — everything else is inline SVG widgets.

The hub ([`Jogos.tsx`](./Jogos.tsx)) shows one tile per game; tapping a tile
swaps to that game with a **"Voltar aos jogos"** back button. Each game is
touch-first (works on iPad), read-aloud where it matters, and honours
`prefers-reduced-motion`.

> Convention reminder: **emoji are allowed _inside_ a game** (game content), but
> the chrome — buttons, back arrow, scorebar icons — uses `@sprout/icons`.

## The games

| Game | File | What it is | Controls |
| --- | --- | --- | --- |
| Xadrez | `Xadrez.tsx` | Chess vs. computer or a friend | tap piece → tap square |
| Damas | `Damas.tsx` | Draughts/checkers vs. computer or a friend | tap piece → tap square |
| **Salta!** ⭐ | `Salta.tsx` | **Endless runner** — hop over rocks/logs, grab stars | **tap to jump** (double-jump in the air) |
| **Foguetão** ⭐ | `Foguetao.tsx` | **Space dodger** — weave through meteors, grab gems & shields | **drag to fly** |
| Memória | `Jogos.tsx` | Memory pairs | tap two cards |
| Sequência de cores | `Jogos.tsx` | Simon — repeat the colour order | tap the pads |
| Apanha a fruta | `Jogos.tsx` | Tap the falling fruit | tap |
| Apanha a toupeira | `Jogos.tsx` | Whack-a-mole, 30 s | tap the moles |
| Conta comigo | `Jogos.tsx` | Count the objects | tap the number |
| Soma rápida | `Jogos.tsx` | Add/subtract ≤ 10 | tap the answer |

⭐ = the two newest, built to be the "again! again!" games: full-canvas,
animated, with sound and a **high score that persists between visits**.

### Salta! 🐸 (`Salta.tsx`)

A cheerful creature (*o Saltão*) runs through a parallax meadow that scrolls
toward it and speeds up the longer you last.

- **Tap anywhere** (or `Space` / `↑`) to jump; **tap again mid-air** for a
  springy **double-jump**.
- Leap over **rocks** and **logs**; catch the spinning **stars** for points and
  a **combo** (consecutive stars raise the pitch and show `x2`, `x3`…). Missing a
  star or taking a hit resets the combo.
- **3 hearts.** A hit costs a heart, with a screen-shake, a burst, and a short
  blink of immunity. Lose them all → game over.
- Squash-and-stretch character, drifting clouds, rolling hills, dust puffs and a
  shrinking ground shadow.

### Foguetão 🚀 (`Foguetao.tsx`)

A rocket flying up through a twinkling, three-layer parallax starfield.

- **Drag your finger** (or mouse, or arrow keys) — the rocket eases toward where
  you point and tilts into the turn, trailing engine sparks.
- **Dodge the tumbling meteors.** Collect glowing **gems** (combo, like Salta!),
  and grab a **blue shield** power-up to fly safe for ~6 seconds (it pops meteors
  on contact).
- **3 hearts**, screen-shake and a blink of immunity on a hit. It gets denser
  and faster over time.

## How it's built

Three tiny shared modules keep the games consistent and small:

### `canvas.ts` — crisp, touch-first canvas

- `fitCanvas(canvas, ctx)` sizes the backing store to the CSS box ×
  `devicePixelRatio` (capped at 3) and scales the context so **1 unit = 1 CSS
  pixel** — sharp on retina/iPad. Safe to call every frame.
- `pointerPos(canvas, e)` → `{x, y}` in CSS pixels for any pointer/touch event.
- `prefersReducedMotion()` and `cssVar(el, name, fallback)`.

The canvas CSS (`packages/ui/src/styles/diversao.css`) sets
`touch-action: none`, so dragging to play never scrolls the page.

### `sfx.ts` — sound effects, no asset files

Every sound is **synthesised** with the Web Audio API (an oscillator + gain
envelope, plus a noise burst for crunches) — there are **no `.mp3`/`.wav` files
and no network**, so it's tiny and works offline. The `AudioContext` is created
lazily and `resume()`d on the first sound; because every game sound follows a
tap, that satisfies the iOS/Chrome "audio needs a user gesture" rule.

```ts
import { sfx } from "./sfx";

sfx.unlock();        // call on the first tap (warms up / unlocks audio)
sfx.jump(big);       // bouncy whoop (big = the double-jump)
sfx.coin(comboStep); // pitch rises with the combo
sfx.power();         // power-up sparkle
sfx.hit();           // falling buzz + crunch
sfx.start();         // round-start beep
sfx.over();          // sad descending trio
sfx.fanfare();       // new-record arpeggio
sfx.toggleMuted();   // ← the speaker/mute button in each game's scorebar
```

Spoken **instructions and results** still go through `speak()` / `<Speaker>`
(the project read-aloud rule); `sfx` is only for short in-game feedback.

### `arcade.ts` — shared loop helpers

- `ArcadePhase` = `"ready" | "playing" | "over"`.
- `loadBest(key)` / `saveBest(key, value)` — high score in `localStorage`
  (namespaced `sprout.<game>.best`), failing silently in private mode.

### The game loop pattern

Both canvas games follow the same shape, so they're easy to read side by side:

- **All simulation state lives in a `useRef` object** (positions, velocities,
  entity arrays, phase, score, lives). The `requestAnimationFrame` loop reads and
  writes that ref and **never restarts** (its `useEffect` deps are just
  `[reduced]`).
- **React state only carries the HUD/overlay** (score, lives, best, phase). The
  loop pushes a `setScore` *only when the displayed integer changes*, so it isn't
  re-rendering 60×/second.
- A centred **overlay** (`.dv-overlay`) shows the start ("Começar") and game-over
  ("Jogar outra vez" + a `<Speaker>` reading the result) screens over the live
  scene.

## Adding a new game

1. Build the component. Small games can live inline in `Jogos.tsx`; a bigger one
   gets its **own file** (like `Xadrez`, `Damas`, `Salta`, `Foguetao`) and is
   imported into `Jogos.tsx`.
2. Add its id to the `GameId` union.
3. Add a hub tile: an `ART_*` SVG (drawn on a `0 0 48 48` grid; tint with
   `var(--c)`) and a row in the `GAMES` array (`label`, `blurb`, `rules`, and an
   `accent` / `accentSoft` subject-colour pair).
4. Render it in the `Jogos()` switch (inside `GameFrame`, which provides the back
   button + a speaker that reads `rules`).
5. Reuse `canvas.ts`, `sfx.ts`, and `arcade.ts`; keep chrome on `@sprout/icons`
   and honour `prefers-reduced-motion`.
