import { Icon } from "@sprout/icons";
import { speakable } from "../speak";
import { useSpeaker } from "../Speaker";

/* MathBlock — kid-friendly math notation, no LaTeX/KaTeX dependency.
 * Renders an expression with proper operators (×, ÷, −) and STACKED fractions
 * written as "a/b". Designed for 1.º-ciclo: clear, big, readable. With a
 * read-aloud button, since the child may not read yet.
 *
 * Markdown usage:  ```math
 *                  { "expr": "1/2 + 1/4 = 3/4", "say": "um meio mais um quarto..." }
 *                  ```
 */

export interface MathSpec {
  expr: string;
  /** optional spoken version; if absent we build a simple reading */
  say?: string;
}

/** Render one token: a fraction "a/b" becomes stacked; anything else is text.
 *  Operators *, x, X → ×; / (standalone) → ÷; - → − (true minus). */
function renderToken(tok: string, key: number) {
  const frac = tok.match(/^(\d+)\/(\d+)$/);
  if (frac) {
    return (
      <span className="math-frac" key={key}>
        <span className="math-frac__n">{frac[1]}</span>
        <span className="math-frac__bar" />
        <span className="math-frac__d">{frac[2]}</span>
      </span>
    );
  }
  return <span key={key}>{tok}</span>;
}

const OPERATORS: Record<string, string> = {
  "*": "×", x: "×", X: "×", "//": "÷", "-": "−", ">=": "≥", "<=": "≤", "!=": "≠",
};

export function MathBlock({ spec }: { spec: MathSpec }) {
  const { playing, toggle } = useSpeaker();
  const say = spec.say ?? speakable(spec.expr);
  // Split on whitespace; map standalone operators to pretty symbols; stack fractions.
  const tokens = spec.expr.trim().split(/\s+/);
  return (
    <div className="math-block">
      <div className="math-block__expr" role="img" aria-label={say}>
        {tokens.map((t, i) => renderToken(OPERATORS[t] ?? t, i))}
      </div>
      <button
        type="button"
        className="math-block__speak"
        data-playing={playing || undefined}
        onClick={() => toggle(say)}
        aria-label={playing ? "Parar" : "Ouvir"}
        title={playing ? "Parar" : "Ouvir"}
      >
        <Icon name={playing ? "stop" : "speaker"} size={18} />
      </button>
    </div>
  );
}
