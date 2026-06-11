import { useId } from "react";
import { niceMax, formatTick, makeFrame, Grid, linePath, areaPath } from "./Chart";

/* TrendChart + BarList — the PARENT-grade charts (the #/pais dashboard).
 * The kid `chart` widget shouts on purpose: badge, hint, read-aloud, a big
 * number on every bar. A parent scanning two weeks of minutes needs the
 * opposite — quiet, compact and data-dense. Same plain-SVG approach and the
 * same scale/grid helpers as Chart.tsx; only the chrome differs.
 *
 * TrendChart: a line/area chart, one or more series over shared x labels.
 * Values live in per-point <title> tooltips, not painted on the chart.
 * BarList: horizontal labelled bars (HTML, no SVG) for category splits —
 * easier to read than a donut when the labels matter.
 */

export interface TrendSeries {
  label: string;
  /** one value per x label */
  data: number[];
  /** any CSS colour / var(--…) */
  color: string;
  /** soft gradient fill under this line (use on the main series only) */
  fill?: boolean;
  /** dashed line without point dots (e.g. a moving average) */
  dash?: boolean;
}

export function TrendChart({ labels, series, unit }: { labels: string[]; series: TrendSeries[]; unit?: string }) {
  const gradId = useId(); // unique per chart — several trends share the page
  const W = 560;
  const H = 200;
  const frame = makeFrame(W, H, { top: 14, right: 14, bottom: 26, left: 38 });
  const { pad, cw, ch } = frame;
  const max = niceMax(Math.max(1, ...series.flatMap((s) => s.data)));
  const n = labels.length;
  const gap = n > 1 ? cw / (n - 1) : cw;
  const px = (i: number) => pad.left + gap * i;
  const py = (v: number) => pad.top + ch - (v / max) * ch;
  const u = unit ? ` ${unit}` : "";

  return (
    <div className="ptrend">
      <svg viewBox={`0 0 ${W} ${H}`} role="presentation">
        <defs>
          {series.map((s, si) =>
            s.fill ? (
              <linearGradient key={si} id={`${gradId}-${si}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={s.color} stopOpacity={0.25} />
                <stop offset="1" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ) : null,
          )}
        </defs>
        <Grid max={max} frame={frame} />
        {series.map((s, si) => {
          const pts = s.data.map((v, i) => ({ x: px(i), y: py(v) }));
          return (
            <g key={si}>
              {s.fill && <path d={areaPath(pts, pad.top + ch)} fill={`url(#${gradId}-${si})`} />}
              <path
                className="ptrend__line"
                d={linePath(pts)}
                fill="none"
                stroke={s.color}
                strokeDasharray={s.dash ? "5 6" : undefined}
              />
              {/* a dashed series is a derived guide (e.g. média) — no dots */}
              {!s.dash &&
                pts.map((p, i) => (
                  <circle key={i} className="ptrend__pt" cx={p.x} cy={p.y} r={3.5} fill={s.color}>
                    <title>{`${labels[i]}: ${s.data[i]}${u}${series.length > 1 ? ` (${s.label})` : ""}`}</title>
                  </circle>
                ))}
            </g>
          );
        })}
        {labels.map((l, i) => {
          const t = formatTick(l, i, n);
          return t ? (
            <text key={i} className="ptrend__tick" x={px(i)} y={H - 8} textAnchor="middle">
              {t}
            </text>
          ) : null;
        })}
      </svg>
      {series.length > 1 && (
        <div className="ptrend__legend">
          {series.map((s) => (
            <span key={s.label}>
              <i className={s.dash ? "is-dash" : ""} style={{ ["--c" as string]: s.color }} /> {s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export interface BarItem {
  label: string;
  value: number;
  /** bar colour; defaults to the brand green */
  color?: string;
}

export function BarList({ items, unit }: { items: BarItem[]; unit?: string }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <div className="pbars">
      {items.map((it) => (
        <div key={it.label} className="pbars__row">
          <span className="pbars__label">{it.label}</span>
          <span className="pbars__track">
            <i style={{ width: `${(it.value / max) * 100}%`, background: it.color ?? "var(--primary)" }} />
          </span>
          <span className="pbars__value">
            {it.value}
            {unit ? ` ${unit}` : ""}
          </span>
        </div>
      ))}
    </div>
  );
}
