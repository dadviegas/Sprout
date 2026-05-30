import { Icon } from "@sprout/icons";
import { Speaker } from "../Speaker";
import { FractionFigure } from "./fraction-figure";

/* A "fraction wall": several fractions drawn as equal-width bars so the shaded
 * lengths line up. Two modes share the same picture:
 *   - "equivalent" — same shaded length, cut into more bits → the same value
 *     (1/2 = 2/4 = 4/8); the conclusion says they are worth the same.
 *   - "compare" — different shaded lengths; the longest bar (biggest fraction)
 *     is highlighted and named. */

export interface FractionStripRow {
  parts: number; // denominator, 2–12
  filled: number; // numerator
  label?: string; // overrides the "a/b" caption
}

export interface FractionStripsSpec {
  mode?: "equivalent" | "compare"; // default "equivalent"
  rows: FractionStripRow[];
  title?: string;
  color?: string; // default "accent"
  say?: string; // read-aloud override
}

const labelOf = (r: FractionStripRow) => r.label ?? `${r.filled}/${r.parts}`;
const sayFrac = (r: FractionStripRow) => `${r.filled} de ${r.parts}`;

export function FractionStrips({ spec }: { spec: FractionStripsSpec }) {
  const mode = spec.mode ?? "equivalent";
  const color = spec.color ?? "accent";
  const rows = spec.rows ?? [];
  const values = rows.map((r) => r.filled / r.parts);
  const maxV = Math.max(...values, 0);
  // The biggest bar (used to highlight + name the winner in compare mode).
  const maxIdx = values.indexOf(maxV);

  let concl: string;
  if (mode === "equivalent") {
    const list = rows.map(labelOf);
    const human = list.length > 1 ? `${list.slice(0, -1).join(", ")} e ${list[list.length - 1]}` : list[0] ?? "";
    concl = `${human} valem o mesmo — a parte pintada é igual!`;
  } else {
    const allEqual = values.every((v) => Math.abs(v - maxV) < 1e-9);
    concl = allEqual
      ? "São todas iguais — a mesma parte pintada."
      : rows.length === 2
        ? `${labelOf(rows[maxIdx])} é maior do que ${labelOf(rows[1 - maxIdx])}.`
        : `A maior é ${labelOf(rows[maxIdx])} — repara que a barra pintada é a mais comprida.`;
  }
  const say = spec.say ?? `${rows.map(sayFrac).join(", ")}. ${concl}`;

  return (
    <div className="widget fstrips-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="fraction" size={16} /> Frações</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">{mode === "equivalent" ? "Barras iguais, cortadas em mais bocados" : "Quem tem a barra pintada mais comprida?"}</span>
      </div>

      <div className="fstrips-body">
        {rows.map((r, i) => (
          <div key={i} className={`fstrip-row${mode === "compare" && i === maxIdx ? " is-max" : ""}`}>
            <span className="fstrip-label">{labelOf(r)}</span>
            <FractionFigure parts={r.parts} filled={r.filled} shape="bar" color={color} className="fstrip-svg" ariaLabel={sayFrac(r)} />
          </div>
        ))}
      </div>

      <div className="fstrips-concl">
        <Icon name={mode === "equivalent" ? "check" : "sparkle"} size={18} />
        <span>{concl}</span>
        <Speaker text={say} className="prose-speak" label="Ouvir" />
      </div>
    </div>
  );
}
