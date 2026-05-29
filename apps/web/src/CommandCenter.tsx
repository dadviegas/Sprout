import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import {
  subjects,
  YEARS,
  tierLabel,
  type YearN,
} from "./content/curriculum";
import type { View } from "./nav";

/* ------------------------------------------------------------------ *
 * Command Center — a Cmd/Ctrl+K palette to search every lesson across
 * all subjects and years. Matches lesson titles AND body text, can be
 * filtered by year and subject, and shows a short preview of the match.
 * ------------------------------------------------------------------ */

interface Entry {
  lessonId: string;
  title: string;
  emoji?: string;
  subjectId: string;
  subjectLabel: string;
  color: string;
  year: YearN;
  hasBody: boolean;
  /** plain-text body for searching + preview (markdown stripped) */
  text: string;
  /** accent-folded title + text for matching; word list for fuzzy matching */
  ftitle: string;
  ftext: string;
  words: string[];
}

/** Strip markdown/fenced JSON so search + preview read as plain prose. */
function toPlainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")      // fenced code / widget blocks
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → label
    .replace(/[#>*_`|~-]+/g, " ")          // md punctuation
    .replace(/\s+/g, " ")
    .trim();
}

/** Lowercase + strip accents, ONE output char per input char so string length
 *  is preserved — this keeps folded indices aligned with the original text, so
 *  preview highlighting still points at the right characters.
 *  "Matemática" → "matematica", "coração" → "coracao". */
function fold(s: string): string {
  let out = "";
  for (const ch of s) {
    const base = ch.normalize("NFD").match(/[A-Za-z0-9]/)?.[0] ?? ch;
    out += base.toLowerCase();
  }
  return out;
}

/** Levenshtein distance, but gives up (returns max+1) once it exceeds `max`.
 *  Used to tolerate a single typo, so it only ever runs with max = 1. */
function boundedEdit(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1; // whole row already over budget
    prev = cur;
  }
  return prev[b.length];
}

/** True if `word` is within one typo of any word in `words` (length-gated so
 *  we don't fuzzily match very short tokens like "a" or "de"). */
function fuzzyHits(words: string[], word: string): boolean {
  if (word.length < 4) return false;
  return words.some((w) => Math.abs(w.length - word.length) <= 1 && boundedEdit(w, word, 1) <= 1);
}

function buildIndex(): Entry[] {
  const out: Entry[] = [];
  for (const s of subjects) {
    for (const y of YEARS) {
      for (const l of s.years[y]) {
        const text = l.body ? toPlainText(l.body) : "";
        const ftitle = fold(l.title);
        const ftext = fold(text);
        // distinct words from title + body, for fuzzy (one-typo) matching
        const words = Array.from(new Set(`${ftitle} ${ftext}`.split(/[^a-z0-9]+/).filter((w) => w.length >= 3)));
        out.push({
          lessonId: l.id,
          title: l.title,
          emoji: l.emoji,
          subjectId: s.id,
          subjectLabel: s.label,
          color: s.color,
          year: y,
          hasBody: !!l.body,
          text,
          ftitle,
          ftext,
          words,
        });
      }
    }
  }
  return out;
}

interface Hit extends Entry {
  score: number;
  preview: { before: string; match: string; after: string } | null;
}

/** Find `q` in `text` ignoring accents. `ftext` is the length-preserving fold
 *  of `text`, so the index found in it lines up with the original characters. */
function makePreview(text: string, ftext: string, q: string): Hit["preview"] {
  const fq = fold(q);
  const idx = fq ? ftext.indexOf(fq) : -1;
  if (idx < 0) return text ? { before: text.slice(0, 120), match: "", after: text.length > 120 ? "…" : "" } : null;
  const start = Math.max(0, idx - 42);
  const end = Math.min(text.length, idx + fq.length + 90);
  return {
    before: (start > 0 ? "…" : "") + text.slice(start, idx),
    match: text.slice(idx, idx + fq.length),
    after: text.slice(idx + fq.length, end) + (end < text.length ? "…" : ""),
  };
}

export function CommandCenter({
  onClose,
  onGo,
}: {
  onClose: () => void;
  onGo: (v: View) => void;
}) {
  const index = useMemo(buildIndex, []);
  const [q, setQ] = useState("");
  const [year, setYear] = useState<YearN | "all">("all");
  const [subjectId, setSubjectId] = useState<string | "all">("all");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  const hits = useMemo<Hit[]>(() => {
    // Accent-insensitive query, split into words; each word must match (exactly
    // or within one typo) for the lesson to be a hit. So "matematca" or
    // "coracao" still find "Matemática" / "coração".
    const fq = fold(q.trim());
    const qWords = fq.split(/[^a-z0-9]+/).filter(Boolean);
    const scoped = index.filter(
      (e) => (year === "all" || e.year === year) && (subjectId === "all" || e.subjectId === subjectId),
    );
    const ranked = scoped
      .map((e): Hit => {
        let score = 0;
        let fuzzyOnly = false;
        if (qWords.length === 0) {
          score = 1; // empty query — list everything in the current scope
        } else if (e.ftitle.startsWith(fq)) {
          score = 5;
        } else if (e.ftitle.includes(fq)) {
          score = 4;
        } else if (e.ftext.includes(fq)) {
          score = 3;
        } else {
          // no exact (accent-folded) substring — allow one typo per word
          const allMatch = qWords.every(
            (w) => e.ftitle.includes(w) || e.ftext.includes(w) || fuzzyHits(e.words, w),
          );
          if (allMatch) { score = 2; fuzzyOnly = true; }
        }
        return {
          ...e,
          score,
          preview: qWords.length && !fuzzyOnly ? makePreview(e.text, e.ftext, q.trim()) : null,
        };
      })
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score || Number(b.hasBody) - Number(a.hasBody));
    return ranked.slice(0, 40);
  }, [index, q, year, subjectId]);

  useEffect(() => setActive(0), [q, year, subjectId]);

  const choose = (h: Hit) => {
    onGo(
      h.hasBody
        ? { kind: "lesson", year: h.year, subjectId: h.subjectId, lessonId: h.lessonId }
        : { kind: "subject", year: h.year, subjectId: h.subjectId },
    );
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, hits.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && hits[active]) { e.preventDefault(); choose(hits[active]); }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <div className="cmdk-backdrop" onClick={onClose}>
      <div className="cmdk" role="dialog" aria-label="Procurar nas matérias" onClick={(e) => e.stopPropagation()} onKeyDown={onKeyDown}>
        <div className="cmdk-search">
          <Icon name="search" size={20} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Procurar uma lição ou tema…"
            aria-label="Procurar"
          />
          <kbd className="cmdk-esc">esc</kbd>
        </div>

        <div className="cmdk-filters">
          <div className="cmdk-chips" role="group" aria-label="Ano">
            <button className={`cmdk-chip ${year === "all" ? "on" : ""}`} onClick={() => setYear("all")}>Todos os anos</button>
            {YEARS.map((y) => (
              <button key={y} className={`cmdk-chip ${year === y ? "on" : ""}`} onClick={() => setYear(y)}>{y}.º</button>
            ))}
          </div>
          <div className="cmdk-chips" role="group" aria-label="Matéria">
            <button className={`cmdk-chip ${subjectId === "all" ? "on" : ""}`} onClick={() => setSubjectId("all")}>Tudo</button>
            {subjects.map((s) => (
              <button
                key={s.id}
                className={`cmdk-chip ${subjectId === s.id ? "on" : ""}`}
                style={{ ["--c" as string]: s.color }}
                onClick={() => setSubjectId(s.id)}
              >
                <span className="cmdk-chip-dot" /> {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="cmdk-results" ref={listRef}>
          {hits.length === 0 && (
            <div className="cmdk-empty">
              <Icon name="search" size={28} />
              <p>Nada encontrado. Tenta outra palavra.</p>
            </div>
          )}
          {hits.map((h, i) => (
            <button
              key={`${h.subjectId}-${h.lessonId}`}
              data-i={i}
              className={`cmdk-row ${i === active ? "active" : ""}`}
              style={{ ["--c" as string]: h.color }}
              onMouseMove={() => setActive(i)}
              onClick={() => choose(h)}
            >
              <span className="cmdk-row-emoji" aria-hidden>{h.emoji ?? "•"}</span>
              <span className="cmdk-row-main">
                <span className="cmdk-row-top">
                  <span className="cmdk-row-title">{h.title}</span>
                  <span className="cmdk-row-tag"><span className="cmdk-chip-dot" /> {h.subjectLabel} · {tierLabel(h.subjectId, h.year)}</span>
                  {!h.hasBody && <span className="cmdk-soon">Em breve</span>}
                </span>
                {h.preview && (h.preview.before || h.preview.match || h.preview.after) && (
                  <span className="cmdk-row-prev">
                    {h.preview.before}
                    {h.preview.match && <mark>{h.preview.match}</mark>}
                    {h.preview.after}
                  </span>
                )}
              </span>
              <Icon name="forward" size={16} />
            </button>
          ))}
        </div>

        <div className="cmdk-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
          <span><kbd>↵</kbd> abrir</span>
          <span>{hits.length} resultado{hits.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </div>
  );
}
