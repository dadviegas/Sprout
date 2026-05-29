import { useMemo } from "react";

const COLORS = [
  "var(--primary)",
  "var(--accent)",
  "var(--info)",
  "var(--warn)",
  "var(--subj-pt)",
  "var(--subj-en)",
];

/* A short burst of falling confetti, used when a child does well on a quiz.
   Purely decorative and pointer-transparent. */
export function Confetti({ pieces = 44 }: { pieces?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.4 + Math.random() * 1.4,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
        size: 8 + Math.random() * 8,
      })),
    [pieces],
  );

  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <i
          key={i}
          style={{
            left: `${b.left}%`,
            background: b.color,
            width: b.size,
            height: b.size * 1.3,
            transform: `rotate(${b.rotate}deg)`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
