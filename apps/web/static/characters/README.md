# Cool chess characters

Drop a character file here for any piece and it **becomes** that piece on the board —
walking to its square, striking when it captures, knocked off when taken, with the
board jolt + impact burst. Two ways:

- **`<piece>-<color>.png`** — a still character picture. **This is the easy way to get
  cool people in:** generate one with any image AI (prompts below), drop it in, done.
- **`<piece>-<color>.riv`** — an animated [Rive](https://rive.app) character (its own
  walk/attack/die animations). More work, fully animated. State-machine contract at the
  bottom.

Nothing breaks while files are missing — any piece without art falls back to the
built-in character, then a glyph. Add pieces one at a time; reload after dropping files.

## File names

`<piece>-<color>.png` (or `.riv`) — lowercase, exactly these 12 names:

| Piece  | White (you)     | Black (rival)   |
| ------ | --------------- | --------------- |
| Pawn   | `pawn-w.png`    | `pawn-b.png`    |
| Knight | `knight-w.png`  | `knight-b.png`  |
| Bishop | `bishop-w.png`  | `bishop-b.png`  |
| Rook   | `rook-w.png`    | `rook-b.png`    |
| Queen  | `queen-w.png`   | `queen-b.png`   |
| King   | `king-w.png`    | `king-b.png`    |

## Image specs (so they sit right on the board)

- **Square** canvas (512×512), **transparent background** (PNG with alpha) — no box,
  no scenery, no floor/shadow.
- **One full-body character, facing the viewer**, standing, **feet near the bottom**,
  filling the frame with a small margin.
- Keep all 12 in a **consistent style + scale** so they look like one set.

## Two clearly different teams

- **White (`-w`)** — bright/heroic: light armour, gold + **green** accents (matches the
  board).
- **Black (`-b`)** — the rival: dark armour, **deep red/purple** accents. Cool, not
  scary or gory (kids' app).

## Prompts for cool *people* (paste into any image AI)

Base prompt — then append the piece line, and run once per team palette:

> A **cool heroic chess-warrior character**, full body, facing forward, standing
> proudly, holding their weapon, **stylised semi-realistic game character** with clean
> shading and bold shapes, kid-friendly, **transparent background**, centered, feet
> near the bottom, 512×512, no ground, no text.

| Piece  | Append                                                                                  |
| ------ | --------------------------------------------------------------------------------------- |
| Pawn   | …a brave young **foot-soldier** with a short spear and a small round shield.             |
| Knight | …a heroic **armoured knight** on a noble horse (or with a great lance), visor up.        |
| Bishop | …a wise **battle-cleric / mage** in robes and a mitre, holding a glowing staff.          |
| Rook   | …a mighty **armoured juggernaut** with tower-like pauldrons and a huge war-hammer.       |
| Queen  | …a fierce, elegant **warrior-queen** with a crown and a slender sword or staff.          |
| King   | …a noble **warrior-king** with a crown, cape, and a broad sword.                         |

Tip: tell the AI to keep the **same character style and palette** across all 12 (paste
one finished image back as a style reference) so the set feels cohesive.

## Rive contract (only if you use `.riv`)

One state machine named **`main`** with **trigger** inputs `walk`, `attack`, `die`;
idle is the resting state. The game (`src/diversao/rive-piece.tsx`) fires those at the
right moments. Fork a free character on rive.app/community, rename its state machine +
triggers to match, **Export → Runtime (.riv)** here (check the file's license first).
