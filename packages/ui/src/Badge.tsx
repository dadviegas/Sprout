import type { ReactNode } from "react";

export type BadgeKind = "neutral" | "info" | "success" | "warning" | "danger" | "accent";

export interface BadgeProps {
  kind?: BadgeKind;
  children?: ReactNode;
}

const map: Record<BadgeKind, { bg: string; color: string }> = {
  neutral: { bg: "var(--surface-2)", color: "var(--ink-2)" },
  info: { bg: "var(--info-soft)", color: "var(--info)" },
  success: { bg: "var(--ok-soft)", color: "var(--ok)" },
  warning: { bg: "var(--warn-soft)", color: "var(--warn)" },
  danger: { bg: "var(--danger-soft)", color: "var(--danger)" },
  accent: { bg: "var(--accent-soft)", color: "var(--accent)" },
};

export function Badge({ kind = "neutral", children }: BadgeProps) {
  const c = map[kind];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: ".74em",
        fontWeight: 700,
        padding: "3px 10px",
        borderRadius: 999,
        background: c.bg,
        color: c.color,
        textTransform: "uppercase",
        letterSpacing: ".06em",
      }}
    >
      {children}
    </span>
  );
}
