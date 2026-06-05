/* Academia dos Elementos — on-screen controls for the playable scene, laid out
 * like an open-world game: a virtual joystick in the bottom-left (movement) and a
 * big action button in the bottom-right (interact). Both sit in the thumb zone and
 * never cover scene text. Desktop also has WASD/arrows + E (handled in WorldScene).
 *
 * The joystick reports a normalised axis ({x,y}, magnitude ≤ 1) via `onMove`. */
import { useCallback, useRef, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";

export interface Axis {
  x: number;
  y: number;
}

export function VirtualControls({
  onMove,
  onAction,
  actionPrompt,
  actionIcon,
  actionColor = "var(--accent)",
}: {
  onMove: (axis: Axis) => void;
  onAction: () => void;
  /** verb shown on the action button when something is in reach (null = idle) */
  actionPrompt: string | null;
  actionIcon: IconName;
  actionColor?: string;
}) {
  const baseRef = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState<Axis>({ x: 0, y: 0 });

  const update = useCallback(
    (clientX: number, clientY: number) => {
      const base = baseRef.current;
      if (!base) return;
      const r = base.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const radius = r.width / 2;
      let dx = (clientX - cx) / radius;
      let dy = (clientY - cy) / radius;
      const mag = Math.hypot(dx, dy);
      if (mag > 1) {
        dx /= mag;
        dy /= mag;
      }
      setKnob({ x: dx, y: dy });
      onMove({ x: dx, y: dy });
    },
    [onMove],
  );

  const reset = useCallback(() => {
    setKnob({ x: 0, y: 0 });
    onMove({ x: 0, y: 0 });
  }, [onMove]);

  return (
    <div className="wd-controls" aria-hidden>
      <div
        ref={baseRef}
        className="wd-stick"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          update(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 0 && e.pointerType === "mouse") return;
          if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) update(e.clientX, e.clientY);
        }}
        onPointerUp={reset}
        onPointerCancel={reset}
      >
        <span className="wd-stick__knob" style={{ transform: `translate(${knob.x * 34}px, ${knob.y * 34}px)` }} />
      </div>

      <button
        className={`wd-action ${actionPrompt ? "live" : ""}`}
        style={{ ["--el" as string]: actionColor }}
        onPointerDown={(e) => {
          e.preventDefault();
          onAction();
        }}
        aria-label={actionPrompt ?? "Ação"}
      >
        <Icon name={actionIcon} size={30} />
        {actionPrompt && <span className="wd-action__label">{actionPrompt}</span>}
      </button>
    </div>
  );
}
