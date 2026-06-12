import { useMemo, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "../Speaker";
import { Confetti } from "../Confetti";

/* CompleteWord — a word with ONE missing syllable/letter for pre-readers
 * (§4.10): "SA __ TO" plus three big syllable buttons (PA / TA / MA). A wrong
 * choice shakes gently and dims; the right one fills the gap and celebrates,
 * and a speaker appears to hear the whole word. Speech only ever fires from
 * the speaker buttons.
 *
 * Markdown usage:
 *   ```completeword
 *   { "word": "SAPATO", "missing": "PA", "options": ["PA", "TA", "MA"], "emoji": "👟" }
 *   ```
 */

export interface CompleteWordSpec {
  /** the full word, e.g. "SAPATO" */
  word: string;
  /** the gap — the part of `word` the child must choose, e.g. "PA" */
  missing: string;
  /** 3 choices shown as big buttons; must include `missing` */
  options: string[];
  /** picture clue shown beside the word */
  emoji?: string;
  /** read-aloud for the word (defaults to the word itself) */
  say?: string;
  title?: string;
}

function shuffle<T>(a: readonly T[]): T[] {
  const r = a.slice();
  for (let k = r.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [r[k], r[j]] = [r[j], r[k]];
  }
  return r;
}

export function CompleteWord({ spec }: { spec: CompleteWordSpec }) {
  const word = spec.word.toUpperCase();
  const missing = spec.missing.toUpperCase();
  const say = spec.say ?? spec.word.toLowerCase();
  // The gap is the first occurrence of `missing` inside `word` (validated by
  // pnpm validate); if an author bypasses that, show the word un-gapped.
  const gapAt = word.indexOf(missing);
  const prefix = gapAt >= 0 ? word.slice(0, gapAt) : word;
  const suffix = gapAt >= 0 ? word.slice(gapAt + missing.length) : "";

  const [round, setRound] = useState(0); // bumps to reshuffle on "Outra vez"
  const options = useMemo(
    () => shuffle(spec.options.map((o) => o.toUpperCase())),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spec.options, round],
  );
  const [tried, setTried] = useState<string[]>([]); // wrong picks, dimmed
  const [shakeOf, setShakeOf] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const pick = (opt: string) => {
    if (done) return;
    if (opt === missing) {
      setDone(true);
    } else if (!tried.includes(opt)) {
      setTried((t) => [...t, opt]);
      setShakeOf(opt);
      window.setTimeout(() => setShakeOf(null), 450);
    }
  };

  const restart = () => {
    setTried([]);
    setShakeOf(null);
    setDone(false);
    setRound((r) => r + 1);
  };

  return (
    <div className="widget completeword-widget">
      <div className="w-head">
        <span className="w-badge">
          <Icon name="syllables" size={16} /> Completa a palavra
        </span>
        {spec.title && <strong>{spec.title}</strong>}
        <Speaker text={`Completa a palavra: ${say}.`} label="Ouvir a palavra" />
      </div>

      <div className="cw-word">
        {spec.emoji && <span className="cw-emoji" aria-hidden="true">{spec.emoji}</span>}
        {prefix && <span className="cw-part">{prefix}</span>}
        {gapAt >= 0 && (
          <span className={`cw-gap ${done ? "is-filled" : ""}`} aria-label={done ? missing : "parte em falta"}>
            {done ? missing : ""}
          </span>
        )}
        {suffix && <span className="cw-part">{suffix}</span>}
      </div>

      {done ? (
        <div className="cw-done">
          <Confetti />
          <strong className="cw-done__msg">Boa! Completaste a palavra!</strong>
          <div className="cw-actions">
            <Speaker text={say} label="Ouvir a palavra">
              {" "}Ouvir a palavra
            </Speaker>
            <button type="button" className="pill ghost" onClick={restart}>
              <Icon name="refresh" size={18} /> Outra vez
            </button>
          </div>
        </div>
      ) : (
        <div className="cw-options">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={["cw-opt", tried.includes(opt) ? "is-wrong" : "", shakeOf === opt ? "is-shake" : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => pick(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
