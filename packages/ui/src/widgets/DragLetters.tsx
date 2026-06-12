import { useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "../Speaker";
import { Confetti } from "../Confetti";

/* DragLetters — "monta a palavra" for pre-readers (§4.10). The word's letters
 * sit shuffled in a tray (plus two distractors) and the child fills the slots
 * in order. TAP is first-class: tapping a tile places it in the next slot, so
 * the widget works without any dragging; dragging a tile onto the slots
 * (pointer events) is an enhancement that does the same. A wrong letter shakes
 * gently. Speech only ever fires from the speaker buttons — never on a drag,
 * a placement, or completion itself.
 *
 * Markdown usage:
 *   ```dragletters
 *   { "word": "PATO", "emoji": "🦆", "distractors": ["L", "M"] }
 *   ```
 */

export interface DragLettersSpec {
  /** the word to build — its letters become the slots (shown uppercased) */
  word: string;
  /** picture clue shown beside the slots */
  emoji?: string;
  /** read-aloud for the word (defaults to the word itself) */
  say?: string;
  /** wrong letters mixed into the tray (default: 2 picked automatically) */
  distractors?: string[];
  title?: string;
}

interface Tile {
  id: number;
  letter: string;
}

function shuffle<T>(a: readonly T[]): T[] {
  const r = a.slice();
  for (let k = r.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [r[k], r[j]] = [r[j], r[k]];
  }
  return r;
}

/** Letters likely in a 1.º-ano word, to draw distractors from. */
const POOL = "ABCDEFGHIJLMNOPRSTUVZ";

export function DragLetters({ spec }: { spec: DragLettersSpec }) {
  const letters = useMemo(() => spec.word.toUpperCase().split(""), [spec.word]);
  const say = spec.say ?? spec.word.toLowerCase();

  // `round` bumps to reshuffle the tray on "Outra vez".
  const [round, setRound] = useState(0);
  const tray = useMemo<Tile[]>(() => {
    const have = new Set(letters);
    const extras = spec.distractors?.length
      ? spec.distractors.map((d) => d.toUpperCase())
      : shuffle(POOL.split("").filter((c) => !have.has(c))).slice(0, 2);
    return shuffle([...letters, ...extras]).map((letter, id) => ({ id, letter }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letters, spec.distractors, round]);

  // Tile ids already placed, in slot order. Only the RIGHT next letter is ever
  // accepted, so slot k always shows letters[k].
  const [placed, setPlaced] = useState<number[]>([]);
  const [shakeId, setShakeId] = useState<number | null>(null);
  const done = placed.length === letters.length;

  // Drag state: which tile is in flight and how far it moved (the tile renders
  // a transform). Taps never set it — a press only becomes a drag past 8px.
  const [drag, setDrag] = useState<{ id: number; dx: number; dy: number } | null>(null);
  const dragInfo = useRef<{ id: number; x0: number; y0: number; moved: boolean } | null>(null);
  const justDragged = useRef(false); // swallow the click that follows a drag
  const slotsRef = useRef<HTMLDivElement>(null);

  const place = (tile: Tile) => {
    if (done || placed.includes(tile.id)) return;
    if (tile.letter === letters[placed.length]) {
      setPlaced((p) => [...p, tile.id]);
    } else {
      setShakeId(tile.id);
      window.setTimeout(() => setShakeId(null), 450);
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>, tile: Tile) => {
    if (done || placed.includes(tile.id)) return;
    justDragged.current = false; // a fresh press — never swallow its tap
    e.currentTarget.setPointerCapture(e.pointerId);
    dragInfo.current = { id: tile.id, x0: e.clientX, y0: e.clientY, moved: false };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = dragInfo.current;
    if (!d) return;
    const dx = e.clientX - d.x0;
    const dy = e.clientY - d.y0;
    if (!d.moved && Math.hypot(dx, dy) < 8) return;
    d.moved = true;
    setDrag({ id: d.id, dx, dy });
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLButtonElement>, tile: Tile) => {
    const d = dragInfo.current;
    dragInfo.current = null;
    setDrag(null);
    if (!d || !d.moved) return; // a plain tap — the button's onClick places it
    justDragged.current = true;
    const r = slotsRef.current?.getBoundingClientRect();
    if (r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
      place(tile);
    }
  };
  const onTap = (tile: Tile) => {
    if (justDragged.current) {
      justDragged.current = false;
      return;
    }
    place(tile);
  };

  const restart = () => {
    setPlaced([]);
    setShakeId(null);
    setRound((r) => r + 1);
  };

  return (
    <div className="widget dragletters-widget">
      <div className="w-head">
        <span className="w-badge">
          <Icon name="letters" size={16} /> Monta a palavra
        </span>
        {spec.title && <strong>{spec.title}</strong>}
        <Speaker text={`Monta a palavra: ${say}.`} label="Ouvir a palavra" />
      </div>

      <div className="dl-board">
        {spec.emoji && <span className="dl-emoji" aria-hidden="true">{spec.emoji}</span>}
        <div className="dl-slots" ref={slotsRef}>
          {letters.map((letter, k) => (
            <span
              key={k}
              className={["dl-slot", k < placed.length ? "is-filled" : "", k === placed.length && !done ? "is-next" : ""]
                .filter(Boolean)
                .join(" ")}
            >
              {k < placed.length ? letter : ""}
            </span>
          ))}
        </div>
      </div>

      {done ? (
        <div className="dl-done">
          <Confetti />
          <strong className="dl-done__msg">Boa! Montaste a palavra!</strong>
          <div className="dl-actions">
            <Speaker text={say} label="Ouvir a palavra">
              {" "}Ouvir a palavra
            </Speaker>
            <button type="button" className="pill ghost" onClick={restart}>
              <Icon name="refresh" size={18} /> Outra vez
            </button>
          </div>
        </div>
      ) : (
        <div className="dl-tray">
          {tray.map((tile) => {
            const used = placed.includes(tile.id);
            const dragging = drag !== null && drag.id === tile.id;
            return (
              <button
                key={tile.id}
                type="button"
                className={["dl-tile", used ? "is-used" : "", dragging ? "is-dragging" : "", shakeId === tile.id ? "is-shake" : ""]
                  .filter(Boolean)
                  .join(" ")}
                style={drag !== null && drag.id === tile.id ? { transform: `translate(${drag.dx}px, ${drag.dy}px)` } : undefined}
                disabled={used}
                onClick={() => onTap(tile)}
                onPointerDown={(e) => onPointerDown(e, tile)}
                onPointerMove={onPointerMove}
                onPointerUp={(e) => onPointerUp(e, tile)}
                onPointerCancel={() => {
                  dragInfo.current = null;
                  setDrag(null);
                }}
                aria-label={`Letra ${tile.letter}`}
              >
                {tile.letter}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
