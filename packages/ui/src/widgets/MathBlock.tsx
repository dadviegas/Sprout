import { Icon } from "@sprout/icons";
import { speak } from "../speak";

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

function speakable(expr: string): string {
  return expr
    .replace(/(\d+)\/(\d+)/g, "$1 sobre $2")
    .replace(/\*/g, " vezes ").replace(/\bx\b/gi, " vezes ")
    .replace(/\+/g, " mais ").replace(/-/g, " menos ")
    .replace(/=/g, " igual a ").replace(/\s+/g, " ").trim();
}

export function MathBlock({ spec }: { spec: MathSpec }) {
  // Split on whitespace; map standalone operators to pretty symbols; stack fractions.
  const tokens = spec.expr.trim().split(/\s+/);
  return (
    <div className="math-block">
      <div className="math-block__expr" role="img" aria-label={spec.say ?? speakable(spec.expr)}>
        {tokens.map((t, i) => renderToken(OPERATORS[t] ?? t, i))}
      </div>
      <button
        type="button"
        className="math-block__speak"
        onClick={() => speak(spec.say ?? speakable(spec.expr))}
        aria-label="Ouvir"
        title="Ouvir"
      >
        <Icon name="speaker" size={18} />
      </button>
    </div>
  );
}
