import type { ReactNode } from "react";
import { Icon } from "@sprout/icons";

export type CalloutKind = "info" | "tip" | "warning" | "danger" | "success";

export interface CalloutProps {
  kind?: CalloutKind;
  title?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}

export function Callout({ kind = "info", title, children, compact = false }: CalloutProps) {
  const map = {
    info: { color: "var(--info)", bg: "var(--info-soft)", icon: <Icon name="info" size={20} />, label: "Repara" },
    tip: { color: "var(--ok)", bg: "var(--ok-soft)", icon: <Icon name="tip" size={20} />, label: "Dica" },
    warning: { color: "var(--warn)", bg: "var(--warn-soft)", icon: <Icon name="warn" size={20} />, label: "Atenção" },
    danger: { color: "var(--danger)", bg: "var(--danger-soft)", icon: <Icon name="danger" size={20} />, label: "Cuidado" },
    success: { color: "var(--ok)", bg: "var(--ok-soft)", icon: <Icon name="ok" size={20} />, label: "Boa!" },
  } as const;
  const c = map[kind];
  return (
    <div
      className="sprout-callout"
      style={{
        display: "grid",
        gridTemplateColumns: "5px 28px 1fr",
        columnGap: 12,
        background: c.bg,
        color: "var(--ink)",
        borderRadius: "var(--radius)",
        padding: compact ? "12px 16px" : "16px 18px",
        margin: "1.2em 0",
        border: "2px solid color-mix(in srgb, " + c.color + " 30%, transparent)",
        overflow: "hidden",
      }}
    >
      <div style={{ background: c.color, borderRadius: 3, margin: "2px 0" }} />
      <div style={{ color: c.color, paddingTop: 2 }}>{c.icon}</div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: ".82em",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".08em",
            color: c.color,
            marginBottom: title || !compact ? 4 : 0,
          }}
        >
          {title || c.label}
        </div>
        <div style={{ lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  );
}
