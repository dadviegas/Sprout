import { Icon } from "@sprout/icons";
import { Speaker } from "../Speaker";

/* SizeCompare — compare how BIG things are, side by side: a child next to a
 * T-Rex next to a blue whale, planets, trees… Each item is a proportional bar
 * (the largest fills the width) with its emoji and real size, so a child SEES
 * the difference instead of just reading numbers. Read-aloud on the speaker. */
export interface SizeItem {
  name: string;
  /** the size as a number (all items share the same `unit`) */
  size: number;
  emoji?: string;
  /** bar colour (a hex or token); defaults cycle through a friendly palette */
  color?: string;
  /** a short extra note shown under the name (optional) */
  note?: string;
}

export interface SizeCompareSpec {
  title?: string;
  /** the unit shown next to each size, e.g. "m" (metros) */
  unit?: string;
  items: SizeItem[];
  /** read-aloud override */
  say?: string;
}

const PALETTE = ["#4a90d9", "#e0803c", "#2fa84f", "#9b59b6", "#e2516a", "#d8a838"];

/** A tidy size label: 1.2 → "1,2" (pt-PT decimal comma), 30 → "30". */
function fmt(n: number): string {
  return (Number.isInteger(n) ? String(n) : n.toFixed(1)).replace(".", ",");
}

export function SizeCompare({ spec }: { spec: SizeCompareSpec }) {
  const unit = spec.unit ?? "";
  const max = Math.max(...spec.items.map((i) => i.size), 0) || 1;
  const say =
    spec.say ??
    `Comparar tamanhos. ${spec.items.map((i) => `${i.name}, ${fmt(i.size)} ${unit}`).join(". ")}.`;
  return (
    <div className="widget sizecompare-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="compare" size={16} /> Comparar tamanhos</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Vê qual é maior!</span>
        <Speaker text={say} className="sizecompare-hear" label="Ouvir a comparação">Ouvir</Speaker>
      </div>
      <div className="sizecompare-rows">
        {spec.items.map((it, i) => {
          const pct = Math.max(6, (it.size / max) * 100); // min 6% so tiny items stay visible
          const color = it.color ?? PALETTE[i % PALETTE.length];
          return (
            <div className="sizecompare-row" key={`${it.name}-${i}`}>
              <div className="sizecompare-label">
                <span className="sizecompare-name">{it.name}</span>
                {it.note && <span className="sizecompare-note">{it.note}</span>}
              </div>
              <div className="sizecompare-track">
                <div className="sizecompare-bar" style={{ width: `${pct}%`, background: color }}>
                  {it.emoji && <span className="sizecompare-emoji" aria-hidden>{it.emoji}</span>}
                </div>
                <span className="sizecompare-size">{fmt(it.size)} {unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
