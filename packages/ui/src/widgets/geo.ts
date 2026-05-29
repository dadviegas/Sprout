/* Shared helpers for the SVG learning widgets. */

export const COLOR_VAR: Record<string, string> = {
  mat: "--subj-mat",
  pt: "--subj-pt",
  edm: "--subj-edm",
  en: "--subj-en",
  primary: "--primary",
  accent: "--accent",
  info: "--info",
  warn: "--warn",
  danger: "--danger",
  ok: "--ok",
};

export function colorVar(key?: string): string {
  return `var(${COLOR_VAR[key ?? "primary"] ?? "--primary"})`;
}

export function softFill(key?: string): string {
  return `color-mix(in srgb, ${colorVar(key)} 22%, var(--surface))`;
}

/** Point on a circle. Angle in degrees, measured clockwise from 12 o'clock. */
export function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(rad), cy - r * Math.cos(rad)];
}

/** Points of a regular polygon with `n` sides, first vertex at the top. */
export function regularPolygon(n: number, cx: number, cy: number, r: number): string {
  return Array.from({ length: n }, (_, i) => polar(cx, cy, r, (i * 360) / n))
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
}

/** Points of a `points`-pointed star. */
export function starPoints(points: number, cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const [x, y] = polar(cx, cy, r, (i * 360) / (points * 2));
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

/** SVG path for a pie slice from the centre. */
export function piePath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const [x1, y1] = polar(cx, cy, r, startDeg);
  const [x2, y2] = polar(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}
