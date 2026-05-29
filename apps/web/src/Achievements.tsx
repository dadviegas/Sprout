import { useMemo } from "react";
import { Icon } from "@sprout/icons";
import { useProgress, type Achievement } from "./progress";
import { tierLabel } from "./content/curriculum";

/* ------------------------------------------------------------------ *
 * Achievements — a log of completed tests, grouped BY DATE and showing
 * the AREA (subject + year) where each was earned. Opened from the star
 * chip in the top bar.
 * ------------------------------------------------------------------ */

const DAY_MS = 86_400_000;

/** A friendly pt-PT date label, with "Hoje"/"Ontem" for the recent days. */
function dayLabel(at: number, now: number): string {
  const startOf = (t: number) => {
    const d = new Date(t);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };
  const diff = Math.round((startOf(now) - startOf(at)) / DAY_MS);
  if (diff <= 0) return "Hoje";
  if (diff === 1) return "Ontem";
  return new Date(at).toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" });
}

function timeLabel(at: number): string {
  return new Date(at).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
}

function StarRow({ n }: { n: number }) {
  return (
    <span className="ach-stars" aria-label={`${n} de 3 estrelas`}>
      {[0, 1, 2].map((i) => (
        <Icon key={i} name="star" size={15} fill={i < n ? "currentColor" : "none"} style={{ color: i < n ? "var(--warn)" : "var(--ink-3)" }} />
      ))}
    </span>
  );
}

export function AchievementsPanel({ onClose }: { onClose: () => void }) {
  const { achievements } = useProgress();
  const now = Date.now();

  // Group newest-first into date buckets (the log is already sorted desc).
  const groups = useMemo(() => {
    const out: { label: string; items: Achievement[] }[] = [];
    for (const a of achievements) {
      const label = dayLabel(a.at, now);
      const last = out[out.length - 1];
      if (last && last.label === label) last.items.push(a);
      else out.push({ label, items: [a] });
    }
    return out;
  }, [achievements, now]);

  const total = achievements.length;
  const totalStars = achievements.reduce((s, a) => s + a.stars, 0);

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer sprout-scroll" role="dialog" aria-label="As minhas conquistas">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.2em", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Icon name="trophy" size={22} /> As minhas conquistas
          </strong>
          <button className="iconbtn" onClick={onClose} aria-label="Fechar">
            <Icon name="close" size={22} />
          </button>
        </div>

        {total === 0 ? (
          <div className="ach-empty">
            <Icon name="trophy" size={34} />
            <p>Ainda não há conquistas.<br />Faz um teste e ganha estrelas! ⭐</p>
          </div>
        ) : (
          <>
            <div className="ach-summary">
              <span className="stat-chip"><Icon name="check" size={15} /> {total} teste{total === 1 ? "" : "s"}</span>
              <span className="stat-chip"><Icon name="star" size={15} fill="currentColor" style={{ color: "var(--warn)" }} /> {totalStars} estrela{totalStars === 1 ? "" : "s"}</span>
            </div>

            {groups.map((g) => (
              <div key={g.label} className="ach-group">
                <div className="ach-date">{g.label}</div>
                {g.items.map((a, i) => (
                  <div key={`${a.lessonId}-${a.at}-${i}`} className="ach-item" style={{ ["--c" as string]: a.color }}>
                    <span className="ach-emoji" aria-hidden>{a.emoji}</span>
                    <div className="ach-main">
                      <div className="ach-title">{a.lessonTitle}</div>
                      <div className="ach-meta">
                        <span className="ach-area"><span className="ach-dot" /> {a.subjectLabel} · {tierLabel(a.subjectId, a.year)}</span>
                        <span className="ach-time">{timeLabel(a.at)}</span>
                      </div>
                    </div>
                    <StarRow n={a.stars} />
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
