import { colorVar, piePath } from "./geo";

/* One fraction drawn as a divided shape — a pie of `parts` slices or a bar of
 * `parts` segments, with the shaded ones tinted. Pure presentation (no state):
 * the interactive paint toy lives in Fraction.tsx; this is the read-only figure
 * reused by the explainers (FractionStrips) and the dynamic quiz questions.
 * Pass `on` for an explicit pattern, or `filled` to shade the first N parts. */

export interface FractionFigureSpec {
  parts: number; // 2–12
  filled?: number; // first N shaded (ignored when `on` is given)
  shape?: "pie" | "bar";
  color?: string; // subject/colour key, default "accent"
}

const PIE_R = 46;
const BAR_W = 240;
const BAR_H = 44;

function shadedFrom(parts: number, filled?: number, on?: boolean[]): boolean[] {
  if (on) return on;
  return Array.from({ length: parts }, (_, i) => i < (filled ?? 0));
}

export function FractionFigure({
  parts,
  filled,
  on,
  shape = "pie",
  color = "accent",
  onSlice,
  className,
  ariaLabel,
}: FractionFigureSpec & {
  on?: boolean[];
  onSlice?: (i: number) => void;
  className?: string;
  ariaLabel?: string;
}) {
  const shaded = shadedFrom(parts, filled, on);
  const tint = colorVar(color);
  const label = ariaLabel ?? `${shaded.filter(Boolean).length} de ${parts}`;
  const sliceStyle = onSlice ? { cursor: "pointer", transition: "fill .15s" } : { transition: "fill .15s" };
  const cell = (i: number) => ({
    fill: shaded[i] ? tint : "var(--surface)",
    stroke: tint,
    onClick: onSlice ? () => onSlice(i) : undefined,
    style: sliceStyle,
  });

  if (shape === "bar") {
    const seg = BAR_W / parts;
    return (
      <svg className={className} viewBox={`0 0 ${BAR_W} ${BAR_H}`} role="img" aria-label={label}>
        {Array.from({ length: parts }, (_, i) => (
          <rect key={i} x={i * seg} y={2} width={seg} height={BAR_H - 4} strokeWidth={1.5} {...cell(i)} />
        ))}
        <rect x={1} y={2} width={BAR_W - 2} height={BAR_H - 4} rx={9} fill="none" stroke={tint} strokeWidth={2.5} />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label={label}>
      {Array.from({ length: parts }, (_, i) => (
        <path key={i} d={piePath(50, 50, PIE_R, (i * 360) / parts, ((i + 1) * 360) / parts)} strokeWidth={3} {...cell(i)} />
      ))}
    </svg>
  );
}
