import type { ReactNode } from "react";
import { Speaker } from "./Speaker";

/* Infographic primitives from the atlantis design system: StatGrid, Steps,
   Compare, Quote, Meters, KeyValueGrid. Rendered from JSON fenced-code blocks
   by the Markdown component. Each item carries its own read-aloud speaker
   (the child can't read), so every card is individually hearable. */

/** Plain text of a field for read-aloud (markdown JSON gives strings/numbers). */
function txt(x: ReactNode): string {
  return typeof x === "string" ? x : typeof x === "number" ? String(x) : "";
}

type Trend = "up" | "down" | "neutral" | "warn";
export type Tone = "primary" | "accent" | "ok" | "warn" | "danger" | "info";

const toneRing: Record<Tone, string> = {
  primary: "var(--primary)",
  accent: "var(--accent)",
  ok: "var(--ok)",
  warn: "var(--warn)",
  danger: "var(--danger)",
  info: "var(--info)",
};
const toneSoft: Record<Tone, string> = {
  primary: "var(--primary-soft)",
  accent: "var(--accent-soft)",
  ok: "var(--ok-soft)",
  warn: "var(--warn-soft)",
  danger: "var(--danger-soft)",
  info: "var(--info-soft)",
};
const toneCycle: Tone[] = ["primary", "accent", "info", "ok", "warn", "danger"];

function gradient(tone: Tone): string {
  return `linear-gradient(135deg, ${toneRing[tone]}, color-mix(in srgb, ${toneRing[tone]} 60%, var(--ink)))`;
}
function softGradient(tone: Tone): string {
  return `linear-gradient(135deg, ${toneSoft[tone]}, color-mix(in srgb, ${toneSoft[tone]} 50%, var(--surface)))`;
}

export interface StatItem {
  value: string;
  label: string;
  delta?: string;
  trend?: Trend;
  hint?: string;
  tone?: Tone;
}

export function StatGrid({ items }: { items: StatItem[] }) {
  return (
    <div
      className="sprout-stats"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(170px, 1fr))`,
        gap: 14,
        margin: "1.4em 0",
      }}
    >
      {items.map((s, i) => (
        <Stat key={i} index={i} {...s} />
      ))}
    </div>
  );
}

function trendColor(t?: Trend): string {
  switch (t) {
    case "up": return "var(--ok)";
    case "down": return "var(--danger)";
    case "warn": return "var(--warn)";
    default: return "var(--ink-3)";
  }
}

function Stat({ value, label, delta, trend, hint, tone, index = 0 }: StatItem & { index?: number }) {
  const t: Tone = tone ?? toneCycle[index % toneCycle.length];
  return (
    <div
      style={{
        position: "relative",
        background: "var(--surface)",
        border: "2px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "16px 16px 16px 18px",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: gradient(t) }} />
      <Speaker text={[label, value, hint].map(txt).filter(Boolean).join(". ")} className="ig-speak ig-speak--corner" size={15} />
      <div style={{ fontSize: ".82em", color: "var(--ink-2)", fontWeight: 700, paddingRight: 28 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2em",
            fontWeight: 800,
            color: toneRing[t],
          }}
        >
          {value}
        </div>
        {delta && (
          <span
            style={{
              fontSize: ".8em",
              fontWeight: 700,
              color: trendColor(trend),
              padding: "2px 8px",
              borderRadius: 99,
              background: `color-mix(in srgb, ${trendColor(trend)} 14%, transparent)`,
            }}
          >
            {trend === "up" ? "▲ " : trend === "down" ? "▼ " : ""}
            {delta}
          </span>
        )}
      </div>
      {hint && <div style={{ fontSize: ".82em", color: "var(--ink-3)", marginTop: 6 }}>{hint}</div>}
    </div>
  );
}

export interface Step {
  title: string;
  body?: string;
  icon?: ReactNode;
}

export function Steps({ items }: { items: Step[] }) {
  return (
    <ol className="sprout-steps" style={{ listStyle: "none", padding: 0, margin: "1.4em 0", display: "grid", gap: 14 }}>
      {items.map((step, i) => {
        const t = toneCycle[i % toneCycle.length];
        return (
          <li
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr",
              gap: 16,
              alignItems: "center",
              background: "var(--surface)",
              border: "2px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: gradient(t),
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1.2em",
                fontFamily: "var(--font-display)",
              }}
            >
              {step.icon ?? i + 1}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                <span>{step.title}</span>
                <Speaker text={[txt(step.title), txt(step.body)].filter(Boolean).join(". ")} className="ig-speak" size={15} />
              </div>
              {step.body && <div style={{ color: "var(--ink-2)", fontSize: ".95em", marginTop: 2, lineHeight: 1.55 }}>{step.body}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export interface CompareCol {
  title: string;
  badge?: string;
  highlight?: boolean;
  rows: { label: string; value: ReactNode }[];
}

export function Compare({ columns }: { columns: CompareCol[] }) {
  return (
    <div
      className="sprout-compare"
      style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`, gap: 14, margin: "1.4em 0" }}
    >
      {columns.map((col, i) => {
        const t: Tone = col.highlight ? "primary" : "info";
        return (
          <div
            key={i}
            style={{
              background: col.highlight ? softGradient(t) : "var(--surface)",
              border: `2px solid ${col.highlight ? toneRing[t] : "var(--border)"}`,
              borderRadius: "var(--radius)",
              padding: 18,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: "1.1em", flex: 1, fontFamily: "var(--font-display)" }}>{col.title}</div>
              <Speaker
                text={`${txt(col.title)}. ${col.rows.map((r) => `${txt(r.label)}: ${txt(r.value)}`).join(". ")}`}
                className="ig-speak"
                size={15}
              />
              {col.badge && (
                <span
                  style={{
                    fontSize: ".7em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    padding: "3px 9px",
                    borderRadius: 99,
                    background: col.highlight ? gradient(t) : "var(--surface-2)",
                    color: col.highlight ? "#fff" : "var(--ink-2)",
                  }}
                >
                  {col.badge}
                </span>
              )}
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {col.rows.map((r, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    fontSize: ".95em",
                    paddingBottom: 8,
                    borderBottom: j < col.rows.length - 1 ? "1px dashed var(--border-soft)" : "none",
                  }}
                >
                  <span style={{ color: "var(--ink-2)" }}>{r.label}</span>
                  <span style={{ color: "var(--ink)", fontWeight: 600, textAlign: "right" }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Quote({ children, by, role }: { children: ReactNode; by?: string; role?: string }) {
  return (
    <figure
      className="sprout-quote"
      style={{
        position: "relative",
        margin: "1.6em 0",
        padding: "22px 26px 22px 30px",
        background: softGradient("accent"),
        border: "2px solid color-mix(in srgb, var(--accent) 35%, transparent)",
        borderRadius: "var(--radius)",
        display: "flex",
        gap: 18,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: gradient("accent") }} />
      <Speaker text={[txt(children), by, role].filter(Boolean).join(". ")} className="ig-speak ig-speak--corner" size={15} />
      <div style={{ fontSize: "3em", lineHeight: 0.8, color: "var(--accent)", fontFamily: "Georgia, serif", alignSelf: "flex-start" }}>&ldquo;</div>
      <div style={{ flex: 1 }}>
        <blockquote style={{ margin: 0, fontStyle: "italic", color: "var(--ink)", fontSize: "1.15em", lineHeight: 1.55 }}>{children}</blockquote>
        {(by || role) && (
          <figcaption style={{ marginTop: 12, color: "var(--ink-2)", fontSize: ".9em" }}>
            <strong style={{ color: "var(--ink)" }}>{by}</strong>
            {by && role && <span> · </span>}
            {role && <span>{role}</span>}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

export interface MeterItem {
  label: string;
  value: number;
  max?: number;
  tone?: Tone;
  caption?: string;
}

export function Meters({ items }: { items: MeterItem[] }) {
  return (
    <div
      className="sprout-meters"
      style={{ display: "grid", gap: 16, margin: "1.4em 0", padding: 18, background: "var(--surface)", border: "2px solid var(--border)", borderRadius: "var(--radius)" }}
    >
      {items.map((m, i) => {
        const max = m.max ?? 100;
        const pct = Math.min(100, Math.max(0, (m.value / max) * 100));
        const t = m.tone ?? "primary";
        return (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: ".92em", marginBottom: 6 }}>
              <span style={{ color: "var(--ink)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8 }}>
                {m.label}
                <Speaker text={`${txt(m.label)}: ${m.value}${m.max != null ? ` de ${m.max}` : ""}. ${txt(m.caption)}`} className="ig-speak" size={15} />
              </span>
              <span style={{ color: toneRing[t], fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                {m.value}
                {m.max != null ? ` / ${m.max}` : "%"}
              </span>
            </div>
            <div style={{ height: 14, background: "var(--surface-2)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: gradient(t), borderRadius: 99, transition: "width .4s cubic-bezier(.2,.7,.3,1)" }} />
            </div>
            {m.caption && <div style={{ fontSize: ".82em", color: "var(--ink-3)", marginTop: 5 }}>{m.caption}</div>}
          </div>
        );
      })}
    </div>
  );
}

export interface KeyValueItem {
  k: string;
  v: ReactNode;
  icon?: ReactNode;
}

export function KeyValueGrid({ items }: { items: KeyValueItem[] }) {
  return (
    <div
      className="sprout-kv"
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, margin: "1.4em 0" }}
    >
      {items.map((it, i) => {
        const t = toneCycle[i % toneCycle.length];
        return (
          <div
            key={i}
            style={{
              background: "var(--surface)",
              border: "2px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "14px 16px",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                color: "#fff",
                background: gradient(t),
                borderRadius: "var(--radius-sm)",
                padding: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2em",
              }}
            >
              {it.icon ?? <span style={{ fontWeight: 800, fontSize: ".9em", padding: "0 4px" }}>{(i + 1).toString().padStart(2, "0")}</span>}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".78em", color: "var(--ink-2)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 700 }}>
                <span>{it.k}</span>
                <Speaker text={`${txt(it.k)}: ${txt(it.v)}`} className="ig-speak" size={14} />
              </div>
              <div style={{ color: "var(--ink)", marginTop: 3, fontWeight: 600 }}>{it.v}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
