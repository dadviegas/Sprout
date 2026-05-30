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

function BarChart({ labels, data, colors }: { labels: string[]; data: number[]; colors: string[] }) {
  const W = 400, H = 240;
  const pad = { top: 16, right: 16, bottom: 48, left: 44 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const max = niceMax(Math.max(...data, 1));
  const gap = cw / data.length;
  const barW = Math.min(40, gap * 0.6);
  const grid = Array.from({ length: 6 }, (_, i) => (max / 5) * i);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W }}>
      {grid.map((v, i) => {
        const y = pad.top + ch - (v / max) * ch;
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="var(--border)" strokeWidth={0.5} strokeDasharray={i === 0 ? "none" : "3,3"} />
            <text x={pad.left - 6} y={y + 4} fill="var(--ink-3)" fontSize={10} textAnchor="end">{Math.round(v)}</text>
          </g>
        );
      })}
      {data.map((v, i) => {
        const x = pad.left + gap * i + gap / 2 - barW / 2;
        const barH = (v / max) * ch;
        const y = pad.top + ch - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx={3} fill={colors[i % colors.length]} opacity={0.9} />
            <text x={x + barW / 2} y={y - 4} fill="var(--ink)" fontSize={10} fontWeight={700} textAnchor="middle">{v}</text>
            <text x={pad.left + gap * i + gap / 2} y={H - pad.bottom + 16} fill="var(--ink-2)" fontSize={10} textAnchor="middle">
              {formatTick(labels[i] ?? "", i, data.length)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function PieChart({ data, colors }: { labels: string[]; data: number[]; colors: string[] }) {
  const size = 240, cx = size / 2, cy = size / 2, r = 90;
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
    const lx = cx + r * 0.65 * Math.cos(mid), ly = cy + r * 0.65 * Math.sin(mid);
    const pct = Math.round((v / total) * 100);
    return (
      <g key={i}>
        <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={colors[i % colors.length]} stroke="var(--surface)" strokeWidth={2} opacity={0.9} />
        {pct >= 5 && <text x={lx} y={ly + 4} fill="#fff" fontSize={11} fontWeight={700} textAnchor="middle">{pct}%</text>}
      </g>
    );
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: size }}>{slices}</svg>
  );
}

function LineChart({ labels, data, colors }: { labels: string[]; data: number[]; colors: string[] }) {
  const W = 400, H = 240;
  const pad = { top: 16, right: 16, bottom: 48, left: 44 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const max = niceMax(Math.max(...data, 1));
  const gap = data.length > 1 ? cw / (data.length - 1) : cw;
  const color = colors[0];
  const pts = data.map((v, i) => ({ x: pad.left + gap * i, y: pad.top + ch - (v / max) * ch }));
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const grid = Array.from({ length: 6 }, (_, i) => (max / 5) * i);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W }}>
      {grid.map((v, i) => {
        const y = pad.top + ch - (v / max) * ch;
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="var(--border)" strokeWidth={0.5} strokeDasharray={i === 0 ? "none" : "3,3"} />
            <text x={pad.left - 6} y={y + 4} fill="var(--ink-3)" fontSize={10} textAnchor="end">{Math.round(v)}</text>
          </g>
        );
      })}
      <path d={path} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill={color} stroke="var(--surface)" strokeWidth={2} />
          <text x={p.x} y={p.y - 10} fill="var(--ink)" fontSize={10} fontWeight={700} textAnchor="middle">{data[i]}</text>
          <text x={p.x} y={H - pad.bottom + 16} fill="var(--ink-2)" fontSize={10} textAnchor="middle">{formatTick(labels[i] ?? "", i, data.length)}</text>
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
    <div
      className="sprout-chart"
      style={{
        position: "relative",
        background: "var(--surface)",
        border: "2px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 18,
        margin: "1.4em 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Speaker text={spoken} className="ig-speak ig-speak--corner" size={15} />
      {title && (
        <div style={{ fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)", marginBottom: 12, textAlign: "center", paddingRight: 28 }}>
          {title}
        </div>
      )}
      <div role="img" aria-label={spoken} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 16px", marginTop: 12, fontSize: ".85em", color: "var(--ink-2)" }}>
          {labels.map((label, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: colors[i % colors.length], flexShrink: 0 }} />
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
