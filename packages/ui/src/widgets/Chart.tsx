import { useId } from "react";
import { Speaker } from "../Speaker";
import { speakable } from "../speak";

/* Chart — bar / pie / line charts drawn as plain inline SVG. No chart library,
 * no dependency. Ported from the atlantis design system and adapted to Sprout:
 * kid-friendly, coloured from the design tokens (so it matches the chrome) and
 * carrying a read-aloud speaker, since the child may not read yet. Authored as
 * a JSON `chart` fenced block in a lesson.
 *
 * Design principles (docs/mockup-revamp.html §4): the VALUE is what a child
 * must read effortlessly — big display-font numbers on the bars/points, an
 * almost-invisible grid, and the page's subject accent as the default hue.
 *
 * Markdown usage:  ```chart
 *                  { "type": "bar", "title": "População (milhões)",
 *                    "labels": ["Portugal", "Canadá"], "data": [10, 39],
 *                    "unit": "milhões",
 *                    "say": "Portugal tem 10 milhões; o Canadá tem 39." }
 *                  ```
 */

export interface ChartSpec {
  /** chart shape; defaults to "bar" */
  type?: "bar" | "pie" | "line";
  title?: string;
  /** one label per data point */
  labels: string[];
  /** the values; same length as labels (line = a series along the labels) */
  data: number[];
  /** optional unit shown after values and spoken aloud (e.g. "milhões", "°C") */
  unit?: string;
  /** override the default colours (any CSS colour or var(--…)) */
  colors?: string[];
  /** axis names (line chart): x under the labels, y rotated on the left.
   *  yLabel falls back to `unit`. */
  xLabel?: string;
  yLabel?: string;
  /** optional spoken version; if absent we read title + label:value pairs */
  say?: string;
}

/* The page's subject accent (set on the lesson container; brand green
 * elsewhere) — single-hue charts then match the page they live on. */
const ACCENT = "var(--acc, var(--primary))";

/* Distinct token colours for donut slices: blue → amber → pink → violet →
 * teal reads apart in both themes, and no slice blends into the surface. */
const PALETTE = ["var(--subj-mat)", "var(--warn)", "var(--subj-pt)", "var(--subj-en)", "var(--subj-mundo)"];

/* The scale/grid/path helpers below are shared with TrendChart.tsx (the
 * parent-grade charts) — same maths, different chrome. */

/** Round an axis maximum up to a clean number (10, 50, 200, …). */
export function niceMax(max: number): number {
  if (max <= 0) return 10;
  const exp = Math.pow(10, Math.floor(Math.log10(max)));
  return Math.ceil(max / exp) * exp;
}

// Show at most ~8 x-axis labels; for longer lists, render every Nth.
export function formatTick(label: string, i: number, total: number): string {
  const stride = Math.max(1, Math.ceil(total / 8));
  if (i !== 0 && i !== total - 1 && i % stride !== 0) return "";
  return label.length > 12 ? label.slice(0, 11) + "…" : label;
}

/** A number for an axis tick, pt-style ("2,5", not "2.5"). */
function tickText(v: number): string {
  return String(v).replace(".", ",");
}

export interface Frame {
  pad: { top: number; right: number; bottom: number; left: number };
  cw: number;
  ch: number;
}

/** Plot area inside a W×H viewBox, minus the padding. */
export function makeFrame(W: number, H: number, pad: Frame["pad"]): Frame {
  return { pad, cw: W - pad.left - pad.right, ch: H - pad.top - pad.bottom };
}

/* Quiet grid shared by bar + line: a few hairlines (the data should pop, not
 * the grid) and just two small axis numbers to anchor the scale. */
export function Grid({ max, frame }: { max: number; frame: Frame }) {
  const { pad, cw, ch } = frame;
  return (
    <g>
      {[0, 0.25, 0.5, 0.75, 1].map((f) => {
        const y = pad.top + ch - f * ch;
        return (
          <g key={f} className="chart-gridline">
            <line x1={pad.left} y1={y} x2={pad.left + cw} y2={y} />
            {(f === 0.5 || f === 1) && (
              <text x={pad.left - 8} y={y + 4} textAnchor="end">{tickText(max * f)}</text>
            )}
          </g>
        );
      })}
    </g>
  );
}

/** Bar outline with rounded TOP corners only (a <rect rx> rounds all four). */
function barPath(x: number, y: number, w: number, h: number): string {
  const r = Math.min(10, h, w / 2);
  return `M ${x} ${y + h} V ${y + r} Q ${x} ${y} ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h} Z`;
}

function BarChart({ labels, data, colors }: { labels: string[]; data: number[]; colors?: string[] }) {
  const W = 560, H = 300;
  const frame = makeFrame(W, H, { top: 34, right: 16, bottom: 46, left: 44 });
  const { pad, cw, ch } = frame;
  const max = niceMax(Math.max(...data, 1));
  const gap = cw / data.length;
  const barW = Math.min(96, gap * 0.62);
  // Single-hue mode (no `colors`): every bar in the subject accent, fading
  // from 90% down to 45% opacity so neighbouring bars still read apart.
  const fade = (i: number) => (data.length > 1 ? 0.9 - (0.45 * i) / (data.length - 1) : 0.9);

  return (
    <svg className="chart-svg chart-svg--bar" viewBox={`0 0 ${W} ${H}`} role="presentation">
      <Grid max={max} frame={frame} />
      {data.map((v, i) => {
        const x = pad.left + gap * i + gap / 2 - barW / 2;
        const barH = Math.max(2, (v / max) * ch);
        const y = pad.top + ch - barH;
        return (
          <g key={i} className="chart-bar-group">
            <path
              className="chart-bar"
              d={barPath(x, y, barW, barH)}
              fill={colors ? colors[i % colors.length] : ACCENT}
              fillOpacity={colors ? 1 : fade(i)}
            />
            <text className="chart-value" x={x + barW / 2} y={Math.max(22, y - 10)} textAnchor="middle">{v}</text>
            <text className="chart-label" x={pad.left + gap * i + gap / 2} y={H - pad.bottom + 30} textAnchor="middle">
              {formatTick(labels[i] ?? "", i, data.length)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* Donut: contiguous slices as dash-array circles, the total in the middle.
 * The labels live in the chip legend below (Chart renders it), not on top of
 * the slices, so nothing overlaps. */
function DonutChart({ data, colors, unit }: { data: number[]; colors: string[]; unit?: string }) {
  const size = 240, c = size / 2, r = 78, ring = 38;
  const circ = 2 * Math.PI * r;
  const total = data.reduce((s, v) => s + v, 0) || 1;

  let acc = 0;
  const slices = data.map((v, i) => {
    const start = acc;
    acc += v / total;
    return (
      <circle
        key={i}
        cx={c} cy={c} r={r} fill="none"
        stroke={colors[i % colors.length]}
        strokeWidth={ring}
        strokeDasharray={`${(v / total) * circ} ${circ}`}
        strokeDashoffset={-start * circ}
        transform={`rotate(-90 ${c} ${c})`}
      />
    );
  });

  return (
    <svg className="chart-svg chart-svg--pie" viewBox={`0 0 ${size} ${size}`} role="presentation">
      {slices}
      <text className="chart-pie-total" x={c} y={c - 2} textAnchor="middle">{total}{unit ? ` ${unit}` : ""}</text>
      <text className="chart-pie-caption" x={c} y={c + 20} textAnchor="middle">total</text>
    </svg>
  );
}

export function linePath(points: { x: number; y: number }[]): string {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

export function areaPath(points: { x: number; y: number }[], baseY: number): string {
  if (!points.length) return "";
  const first = points[0];
  const last = points[points.length - 1];
  return `${linePath(points)} L ${last.x} ${baseY} L ${first.x} ${baseY} Z`;
}

function LineChart({ labels, data, colors, xLabel, yLabel }: {
  labels: string[]; data: number[]; colors?: string[]; xLabel?: string; yLabel?: string;
}) {
  const gradId = useId(); // unique per chart — several lines can share a page
  const W = 560, H = 300;
  const frame = makeFrame(W, H, { top: 34, right: 20, bottom: xLabel ? 64 : 46, left: yLabel ? 60 : 44 });
  const { pad, cw, ch } = frame;
  const max = niceMax(Math.max(...data, 1));
  const gap = data.length > 1 ? cw / (data.length - 1) : cw;
  const color = colors?.[0] ?? ACCENT;
  const pts = data.map((v, i) => ({ x: pad.left + gap * i, y: pad.top + ch - (v / max) * ch }));

  return (
    <svg className="chart-svg chart-svg--line" viewBox={`0 0 ${W} ${H}`} role="presentation">
      <defs>
        {/* soft area under the line: accent fading to transparent */}
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity={0.3} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Grid max={max} frame={frame} />
      <path d={areaPath(pts, pad.top + ch)} fill={`url(#${gradId})`} />
      <path className="chart-line" d={linePath(pts)} fill="none" stroke={color} />
      {pts.map((p, i) => (
        <g key={i}>
          <circle className="chart-point" cx={p.x} cy={p.y} r={7} fill="var(--surface)" stroke={color} />
          <text className="chart-value" x={p.x} y={p.y - 16} textAnchor="middle" style={{ fill: color }}>{data[i]}</text>
          <text className="chart-label" x={p.x} y={pad.top + ch + 30} textAnchor="middle">{formatTick(labels[i] ?? "", i, data.length)}</text>
        </g>
      ))}
      {/* named axes — yLabel falls back to the unit (see Chart below) */}
      {yLabel && (
        <text className="chart-axis-name" x={14} y={pad.top + ch / 2} textAnchor="middle" transform={`rotate(-90 14 ${pad.top + ch / 2})`}>
          {yLabel}
        </text>
      )}
      {xLabel && <text className="chart-axis-name" x={pad.left + cw / 2} y={H - 8} textAnchor="middle">{xLabel}</text>}
    </svg>
  );
}

export function Chart({ spec }: { spec: ChartSpec }) {
  const { type = "bar", title, labels = [], data = [], unit, say } = spec;
  if (!data.length) {
    return <div style={{ color: "var(--danger)", fontWeight: 600 }}>Gráfico sem dados.</div>;
  }
  const colors = spec.colors?.length ? spec.colors : undefined;
  const pieColors = colors ?? PALETTE;
  const u = unit ? ` ${unit}` : "";
  const total = data.reduce((s, v) => s + v, 0);
  const spoken =
    say ??
    speakable([title, ...labels.map((l, i) => `${l}: ${data[i] ?? 0}${u}`)].filter(Boolean).join(". "));

  return (
    <div className="widget chart-widget">
      <Speaker text={spoken} className="ig-speak ig-speak--corner" size={15} />
      <div className="w-head chart-head">
        <span className="w-badge">Gráfico</span>
        {title && <strong>{title}</strong>}
        <span className="w-hint">Lê os valores e compara as diferenças</span>
      </div>
      <div className="chart-stage" role="img" aria-label={spoken}>
        {type === "pie" ? (
          <DonutChart data={data} colors={pieColors} unit={unit} />
        ) : type === "line" ? (
          <LineChart labels={labels} data={data} colors={colors} xLabel={spec.xLabel} yLabel={spec.yLabel ?? unit} />
        ) : (
          <BarChart labels={labels} data={data} colors={colors} />
        )}
      </div>
      {/* Donut legend: one chip per slice, tinted with ITS slice colour, with
          the value and share. Bars/lines label their values in place. */}
      {type === "pie" && (
        <div className="chart-chips">
          {labels.map((label, i) => {
            const color = pieColors[i % pieColors.length];
            const pct = Math.round(((data[i] ?? 0) / (total || 1)) * 100);
            return (
              <span key={i} style={{ color, background: `color-mix(in srgb, ${color} 15%, transparent)` }}>
                {label} · {data[i] ?? 0}{u} ({pct}%)
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
