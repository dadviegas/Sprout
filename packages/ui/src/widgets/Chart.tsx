import { Speaker } from "../Speaker";
import { speakable } from "../speak";

/* Chart — bar / pie / line charts drawn as plain inline SVG. No chart library,
 * no dependency. Ported from the atlantis design system and adapted to Sprout:
 * kid-friendly, coloured from the design tokens (so it matches the chrome) and
 * carrying a read-aloud speaker, since the child may not read yet. Authored as
 * a JSON `chart` fenced block in a lesson.
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
  /** override the default token palette (any CSS colour or var(--…)) */
  colors?: string[];
  /** optional spoken version; if absent we read title + label:value pairs */
  say?: string;
}

// Default palette taken from the design tokens, so charts match the chrome.
const PALETTE = ["var(--primary)", "var(--accent)", "var(--info)", "var(--ok)", "var(--warn)", "var(--danger)"];

/** Round an axis maximum up to a clean number (10, 50, 200, …). */
function niceMax(max: number): number {
  if (max <= 0) return 10;
  const exp = Math.pow(10, Math.floor(Math.log10(max)));
  return Math.ceil(max / exp) * exp;
}

// Show at most ~8 x-axis labels; for longer lists, render every Nth.
function formatTick(label: string, i: number, total: number): string {
  const stride = Math.max(1, Math.ceil(total / 8));
  if (i !== 0 && i !== total - 1 && i % stride !== 0) return "";
  return label.length > 12 ? label.slice(0, 11) + "…" : label;
}

function chartStats(labels: string[], data: number[]) {
  const total = data.reduce((sum, v) => sum + v, 0);
  const max = Math.max(...data);
  const maxIndex = data.indexOf(max);
  return { total, max, maxLabel: labels[maxIndex] ?? "" };
}

function BarChart({ labels, data, colors }: { labels: string[]; data: number[]; colors: string[] }) {
  const W = 560, H = 320;
  const pad = { top: 28, right: 24, bottom: 62, left: 58 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const max = niceMax(Math.max(...data, 1));
  const gap = cw / data.length;
  const barW = Math.min(58, gap * 0.62);
  const grid = Array.from({ length: 6 }, (_, i) => (max / 5) * i);

  return (
    <svg className="chart-svg chart-svg--bar" viewBox={`0 0 ${W} ${H}`} role="presentation">
      {grid.map((v, i) => {
        const y = pad.top + ch - (v / max) * ch;
        return (
          <g key={i} className="chart-gridline">
            <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} />
            <text x={pad.left - 10} y={y + 5} textAnchor="end">{Math.round(v)}</text>
          </g>
        );
      })}
      {data.map((v, i) => {
        const x = pad.left + gap * i + gap / 2 - barW / 2;
        const barH = (v / max) * ch;
        const y = pad.top + ch - barH;
        const color = colors[i % colors.length];
        return (
          <g key={i} className="chart-bar-group">
            <rect className="chart-bar-track" x={x} y={pad.top} width={barW} height={ch} rx={barW / 2} />
            <rect className="chart-bar" x={x} y={y} width={barW} height={barH} rx={barW / 2} fill={color} />
            <text className="chart-value" x={x + barW / 2} y={Math.max(18, y - 10)} textAnchor="middle">{v}</text>
            <text className="chart-label" x={pad.left + gap * i + gap / 2} y={H - pad.bottom + 28} textAnchor="middle">
              {formatTick(labels[i] ?? "", i, data.length)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function PieChart({ labels, data, colors }: { labels: string[]; data: number[]; colors: string[] }) {
  const size = 280, cx = size / 2, cy = size / 2, r = 106;
  const total = data.reduce((s, v) => s + v, 0) || 1;

  let angle = -Math.PI / 2;
  const slices = data.map((v, i) => {
    const slice = (v / total) * Math.PI * 2;
    const a0 = angle;
    angle += slice;
    const a1 = angle;
    const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0);
    const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1);
    const largeArc = slice > Math.PI ? 1 : 0;
    const mid = a0 + slice / 2;
    const lx = cx + r * 0.68 * Math.cos(mid), ly = cy + r * 0.68 * Math.sin(mid);
    const pct = Math.round((v / total) * 100);
    return (
      <g key={i} className="chart-slice">
        <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={colors[i % colors.length]} />
        {pct >= 5 && <text className="chart-pct" x={lx} y={ly + 5} textAnchor="middle">{pct}%</text>}
      </g>
    );
  });

  return (
    <svg className="chart-svg chart-svg--pie" viewBox={`0 0 ${size} ${size}`} role="presentation">
      {slices}
      <circle className="chart-pie-hole" cx={cx} cy={cy} r={44} />
      <text className="chart-pie-total" x={cx} y={cy - 2} textAnchor="middle">{total}</text>
      <text className="chart-pie-caption" x={cx} y={cy + 18} textAnchor="middle">{labels.length === 1 ? labels[0] : "total"}</text>
    </svg>
  );
}

function linePath(points: { x: number; y: number }[]): string {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function areaPath(points: { x: number; y: number }[], baseY: number): string {
  if (!points.length) return "";
  const first = points[0];
  const last = points[points.length - 1];
  return `${linePath(points)} L ${last.x} ${baseY} L ${first.x} ${baseY} Z`;
}

function ChartSummary({ labels, data, unit }: { labels: string[]; data: number[]; unit?: string }) {
  const { total, max, maxLabel } = chartStats(labels, data);
  const u = unit ? ` ${unit}` : "";
  return (
    <div className="chart-summary" aria-hidden="true">
      <span><strong>{total}{u}</strong><small>Total</small></span>
      <span><strong>{max}{u}</strong><small>Maior{maxLabel ? `: ${maxLabel}` : ""}</small></span>
    </div>
  );
}

function LineChart({ labels, data, colors }: { labels: string[]; data: number[]; colors: string[] }) {
  const W = 560, H = 320;
  const pad = { top: 28, right: 24, bottom: 62, left: 58 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const max = niceMax(Math.max(...data, 1));
  const gap = data.length > 1 ? cw / (data.length - 1) : cw;
  const color = colors[0];
  const pts = data.map((v, i) => ({ x: pad.left + gap * i, y: pad.top + ch - (v / max) * ch }));
  const path = linePath(pts);
  const fillPath = areaPath(pts, pad.top + ch);
  const grid = Array.from({ length: 6 }, (_, i) => (max / 5) * i);

  return (
    <svg className="chart-svg chart-svg--line" viewBox={`0 0 ${W} ${H}`} role="presentation">
      {grid.map((v, i) => {
        const y = pad.top + ch - (v / max) * ch;
        return (
          <g key={i} className="chart-gridline">
            <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} />
            <text x={pad.left - 10} y={y + 5} textAnchor="end">{Math.round(v)}</text>
          </g>
        );
      })}
      <path className="chart-line-area" d={fillPath} fill={color} />
      <path className="chart-line" d={path} fill="none" stroke={color} />
      {pts.map((p, i) => (
        <g key={i} className="chart-point-group">
          <circle className="chart-point-halo" cx={p.x} cy={p.y} r={9} fill={color} />
          <circle className="chart-point" cx={p.x} cy={p.y} r={5} fill={color} />
          <text className="chart-value" x={p.x} y={p.y - 16} textAnchor="middle">{data[i]}</text>
          <text className="chart-label" x={p.x} y={H - pad.bottom + 28} textAnchor="middle">{formatTick(labels[i] ?? "", i, data.length)}</text>
        </g>
      ))}
    </svg>
  );
}

export function Chart({ spec }: { spec: ChartSpec }) {
  const { type = "bar", title, labels = [], data = [], unit, say } = spec;
  if (!data.length) {
    return <div style={{ color: "var(--danger)", fontWeight: 600 }}>Gráfico sem dados.</div>;
  }
  const colors = spec.colors?.length ? spec.colors : PALETTE;
  const u = unit ? ` ${unit}` : "";
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
      <ChartSummary labels={labels} data={data} unit={unit} />
      <div className="chart-stage" role="img" aria-label={spoken}>
        {type === "pie" ? (
          <PieChart labels={labels} data={data} colors={colors} />
        ) : type === "line" ? (
          <LineChart labels={labels} data={data} colors={colors} />
        ) : (
          <BarChart labels={labels} data={data} colors={colors} />
        )}
      </div>
      {/* Legend only for categorical charts; a line's x-axis already labels its points. */}
      {type !== "line" && (
        <div className="chart-legend">
          {labels.map((label, i) => (
            <span key={i}>
              <span style={{ background: colors[i % colors.length] }} />
              <strong>{label}</strong>
              <small>{data[i] ?? 0}{unit ? ` ${unit}` : ""}</small>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
