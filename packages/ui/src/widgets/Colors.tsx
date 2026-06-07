import { Icon } from "@sprout/icons";
import { Speaker, useSpeaker } from "../Speaker";

/* Colors — a grid of colour cards for "As Cores" (the colour reference of the
 * Biblioteca). Each card shows the colour itself (as its background), its name
 * in pt-PT, and its HEX + RGB code; tapping it reads the name aloud. RGB is
 * derived from the HEX, so an author only writes `{ name, hex }`. */
export interface ColorEntry {
  /** the colour's name in pt-PT, e.g. "Escarlate" */
  name: string;
  /** 6-digit hex, e.g. "#E23B3B" */
  hex: string;
  /** read-aloud override (defaults to the name) */
  say?: string;
}

export interface ColorsSpec {
  title?: string;
  /** the family this page is about, e.g. "Vermelhos" — shown on the badge */
  family?: string;
  colors: ColorEntry[];
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace(/^#/, "").match(/^([0-9a-fA-F]{6})$/);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

const entrySay = (e: ColorEntry) => e.say ?? `${e.name}.`;

function ColorCard({ entry }: { entry: ColorEntry }) {
  const { playing, toggle } = useSpeaker();
  const rgb = hexToRgb(entry.hex);
  const ink = rgb && 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b > 150 ? "#1b1b1b" : "#ffffff";
  return (
    <button
      type="button"
      className="color-card"
      style={{ background: entry.hex, color: ink }}
      onClick={() => toggle(entrySay(entry))}
      aria-label={playing ? "Parar" : `Ouvir: ${entry.name}`}
    >
      <span className="color-card__name">{entry.name}</span>
      <span className="color-card__codes">
        <span>{entry.hex.toUpperCase()}</span>
        {rgb && <span>RGB {rgb.r} · {rgb.g} · {rgb.b}</span>}
      </span>
      <span className="color-card__speak" aria-hidden><Icon name={playing ? "stop" : "speaker"} size={15} /></span>
    </button>
  );
}

export function Colors({ spec }: { spec: ColorsSpec }) {
  return (
    <div className="widget colors-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="palette" size={16} /> {spec.family ? spec.family : "Cores"}</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca numa cor para ouvires o nome</span>
        <Speaker parts={spec.colors.map(entrySay)} className="colors-hear-all" label="Ouvir as cores">Ouvir tudo</Speaker>
      </div>
      <div className="colors-grid">
        {spec.colors.map((c, i) => (
          <ColorCard key={`${c.name}-${i}`} entry={c} />
        ))}
      </div>
    </div>
  );
}
