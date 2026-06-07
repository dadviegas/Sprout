import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { dictWordId, verbCardId, type DictEntry, type VerbSpec } from "@sprout/ui";
import { blockEntriesOf } from "./content/blocks";
import {
  subjects,
  YEARS,
  tierLabel,
  DICIONARIO_ID,
  VERBOS_ID,
  isEstudo,
  isMundo,
  isPaises,
  isDicionario,
  isVerbos,
  isEnciclopedia,
  isCores,
  isAtlas,
  type YearN,
} from "./content/curriculum";
import { site } from "./site-config";
import type { View } from "./nav";
import { useProgress } from "./progress";

/* ------------------------------------------------------------------ *
 * Command Center — a Cmd/Ctrl+K palette to search every lesson across
 * all subjects and years. Matches lesson titles AND body text, can be
 * filtered by AREA, year and subject, and shows a short preview of the
 * match. It also searches the dictionary word-by-word, and offers
 * navigation shortcuts to each home area (Escola, Treinar, …).
 * ------------------------------------------------------------------ */

/* ---- Areas ----------------------------------------------------------- *
 * Every result belongs to a top-level home area, so results can be filtered
 * by area and so each row says where it lives ("Treinar · Saber de cor"). */
type SearchArea = "escola" | "treinar" | "explorar" | "biblioteca" | "diversao";

const AREA_LABEL: Record<SearchArea, string> = {
  escola: "Escola",
  treinar: "Treinar",
  explorar: "Explorar",
  biblioteca: "Biblioteca",
  diversao: "Diversão",
};

/** Which area a subject's lessons live in (school subjects → Escola). */
function areaOfSubject(subjectId: string): SearchArea {
  if (isEstudo(subjectId)) return "treinar";
  if (isMundo(subjectId) || isPaises(subjectId)) return "explorar";
  if (isDicionario(subjectId) || isVerbos(subjectId) || isEnciclopedia(subjectId) || isCores(subjectId) || isAtlas(subjectId)) return "biblioteca";
  return "escola";
}

/** The areas offered as filter chips, in display order (Diversão holds no
 *  indexed lessons, but the navigation shortcut makes it reachable). */
const AREA_FILTERS: SearchArea[] = ["escola", "treinar", "explorar", "biblioteca", "diversao"];

interface Entry {
  lessonId: string;
  title: string;
  emoji?: string;
  subjectId: string;
  subjectLabel: string;
  color: string;
  area: SearchArea;
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
          area: areaOfSubject(s.id),
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

/* ---- Biblioteca words: dictionary + verbs ---------------------------- *
 * The letter pages embed their cards in a ```dictionary or ```verbs block. We
 * pull those out so each word/verb becomes its own searchable result that opens
 * the page it lives on (the Biblioteca is not grade-based — see tierLabel). */

type RefKind = "dict" | "verb";

interface WordEntry {
  word: string;
  meaning: string;
  emoji?: string;
  kind: RefKind;      // dictionary word or verb — picks the card-id + subject
  subjectId: string;  // DICIONARIO_ID or VERBOS_ID — for the subject filter
  letter: string;     // the page's letter, e.g. "B" — shown on the result tag
  lessonId: string;   // the letter page to open, e.g. "dic-b" / "verb-b"
  subjectLabel: string;
  color: string;
  fword: string;      // accent-folded word, for matching
  fmeaning: string;   // accent-folded meaning, for matching
}

function buildWordIndex(): WordEntry[] {
  const out: WordEntry[] = [];
  const seen = new Set<string>(); // lessonId:word — verbs and real entries can overlap during migration
  const push = (word: string, meaning: string, emoji: string | undefined, kind: RefKind, subjectId: string, letter: string, lessonId: string, label: string, color: string) => {
    const key = `${lessonId}:${fold(word).toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ word, meaning, emoji, kind, subjectId, letter, lessonId, subjectLabel: label, color, fword: fold(word), fmeaning: fold(meaning) });
  };

  const dic = subjects.find((s) => s.id === DICIONARIO_ID);
  if (!dic) return out;
  for (const l of dic.years[1] ?? []) {
    for (const e of blockEntriesOf(l.body, "dictionary") as DictEntry[]) {
      push(e.word, e.meaning, e.emoji, "dict", DICIONARIO_ID, l.title, l.id, dic.label, dic.color);
    }
  }
  // Verbs now live inside the dictionary (derived per letter — see dictMerge), so
  // index them as dictionary words: a hit opens the dictionary's letter page and
  // focuses the verb's card there, where it can be conjugated inline.
  const verb = subjects.find((s) => s.id === VERBOS_ID);
  for (const l of verb?.years[1] ?? []) {
    const dicLessonId = `dic-${l.title.toLowerCase()}`;
    for (const e of blockEntriesOf(l.body, "verbs") as VerbSpec[]) {
      push(e.verb, e.meaning, e.emoji, "dict", DICIONARIO_ID, l.title, dicLessonId, dic.label, dic.color);
    }
  }
  return out;
}

interface Hit extends Entry {
  score: number;
  preview: { before: string; match: string; after: string } | null;
  /** present on dictionary-word / verb results: the letter page they live on,
   *  plus which kind so the right card is focused after navigating. */
  word?: { letter: string; kind: RefKind };
  /** true on the recently-opened lessons shown for an empty query */
  recent?: boolean;
}

/** Map a matched dictionary word / verb onto the shared Hit shape so it renders
 *  and navigates like a lesson result (opening its letter page). */
function wordToHit(w: WordEntry, score: number, q: string): Hit {
  return {
    lessonId: w.lessonId,
    title: w.word,
    emoji: w.emoji,
    subjectId: w.subjectId,
    subjectLabel: w.subjectLabel,
    color: w.color,
    area: "biblioteca",
    year: 1,
    hasBody: true,
    text: w.meaning,
    ftitle: w.fword,
    ftext: w.fmeaning,
    words: [],
    score,
    preview: makePreview(w.meaning, w.fmeaning, q),
    word: { letter: w.letter, kind: w.kind },
  };
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

/* ---- Area navigation shortcuts -------------------------------------- *
 * Beyond lessons and words, the palette can jump straight to a home area
 * (Escola, Treinar, …) or a Diversão room. Built from the YAML page config
 * so the labels/icons/colours match the home cards. */
interface AreaHit {
  area: SearchArea;
  title: string;
  blurb: string;
  icon: IconName;
  color: string;
  view: View;
  /** accent-folded title + blurb, for matching */
  fkey: string;
}

function buildAreaIndex(): AreaHit[] {
  const out: AreaHit[] = [];
  const push = (area: SearchArea, title: string, blurb: string, icon: string, accent: string, view: View) =>
    out.push({ area, title, blurb, icon: icon as IconName, color: accent.startsWith("--") ? `var(${accent})` : accent, view, fkey: fold(`${title} ${blurb}`) });

  // The home areas (Escola / Treinar / Explorar / Biblioteca / Diversão).
  for (const a of site.areas.items) {
    const view: View = a.id === "diversao" ? { kind: "diversao" } : { kind: "area", area: a.id as "escola" | "treinar" | "explorar" | "biblioteca" };
    push(a.id as SearchArea, a.label, a.blurb, a.icon, a.accent, view);
  }
  // The Diversão rooms (jardim / jogos / caixa).
  for (const r of site.diversao.rooms) {
    push("diversao", r.label, r.blurb, r.icon, r.accent, { kind: "diversao", room: r.id });
  }
  return out;
}

/** A rendered result row: either a lesson/word hit or an area shortcut. */
type Row = { type: "lesson"; hit: Hit } | { type: "nav"; nav: AreaHit; score: number };

/** Which captioned group a row belongs to (used to draw the section dividers). */
function rowGroup(row: Row): "areas" | "recent" | "results" {
  if (row.type === "nav") return "areas";
  return row.hit.recent ? "recent" : "results";
}

export function CommandCenter({
  onClose,
  onGo,
}: {
  onClose: () => void;
  onGo: (v: View) => void;
}) {
  const index = useMemo(buildIndex, []);
  const wordIndex = useMemo(buildWordIndex, []);
  const areaIndex = useMemo(buildAreaIndex, []);
  const byId = useMemo(() => new Map(index.map((e) => [e.lessonId, e] as const)), [index]);
  const { history } = useProgress();
  const [q, setQ] = useState("");
  const [area, setArea] = useState<SearchArea | "all">("all");
  const [year, setYear] = useState<YearN | "all">("all");
  const [subjectId, setSubjectId] = useState<string | "all">("all");
  const [active, setActive] = useState(0);

  // Area / subject filters are kept consistent so they never contradict: picking
  // an area clears the subject+year scope; picking a subject snaps the area to
  // where that subject lives. Year only makes sense alongside Escola/Tudo.
  const pickArea = (a: SearchArea | "all") => { setArea(a); setSubjectId("all"); setYear("all"); };
  const pickSubject = (id: string | "all") => {
    setSubjectId(id);
    setArea(id === "all" ? "all" : areaOfSubject(id));
    if (id !== "all" && areaOfSubject(id) !== "escola") setYear("all");
  };
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
      (e) =>
        (area === "all" || e.area === area) &&
        (year === "all" || e.year === year) &&
        (subjectId === "all" || e.subjectId === subjectId),
    );

    // Empty query → the recently-opened lessons (newest first), scoped by the
    // active filters. Mirrors the home strip so the palette opens onto "what
    // you were just doing" instead of dumping every lesson.
    if (qWords.length === 0) {
      const inScope = new Set(scoped.map((e) => e.lessonId));
      return history
        .map((id) => byId.get(id))
        .filter((e): e is Entry => !!e && inScope.has(e.lessonId))
        .map((e) => ({ ...e, score: 1, preview: null, recent: true }));
    }

    const ranked = scoped
      .map((e): Hit => {
        let score = 0;
        let fuzzyOnly = false;
        if (e.ftitle.startsWith(fq)) {
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

    // Dictionary words: matched word-by-word and merged into the same list.
    // The dictionary isn't grade-based, so word results follow only the
    // subject filter (shown when "all" or the dictionary is selected), never
    // the year filter. Skipped on an empty query so we don't list every word.
    const includeWords =
      qWords.length > 0 &&
      (area === "all" || area === "biblioteca") &&
      (subjectId === "all" || subjectId === DICIONARIO_ID || subjectId === VERBOS_ID);
    const wordHits = !includeWords
      ? []
      : wordIndex
          .filter((w) => subjectId === "all" || w.subjectId === subjectId)
          .map((w): Hit | null => {
            let score = 0;
            if (w.fword.startsWith(fq)) score = 6;
            else if (w.fword.includes(fq)) score = 5;
            else if (w.fmeaning.includes(fq)) score = 3;
            else if (qWords.every((qw) => w.fword.includes(qw) || w.fmeaning.includes(qw) || fuzzyHits([w.fword], qw)))
              score = 2;
            return score ? wordToHit(w, score, q.trim()) : null;
          })
          .filter((h): h is Hit => h !== null);

    return [...ranked, ...wordHits]
      .sort((a, b) => b.score - a.score || Number(b.hasBody) - Number(a.hasBody))
      .slice(0, 50);
  }, [index, wordIndex, byId, history, q, area, year, subjectId]);

  const recentMode = q.trim() === ""; // showing the recently-opened list, not search results

  // Area shortcuts: on an empty query, all areas in the active filter; with a
  // query, only those whose name/blurb matches. Scoped by the area filter too.
  const navHits = useMemo<AreaHit[]>(() => {
    const fq = fold(q.trim());
    const qWords = fq.split(/[^a-z0-9]+/).filter(Boolean);
    return areaIndex.filter(
      (a) =>
        (area === "all" || a.area === area) &&
        (qWords.length === 0 || qWords.every((w) => a.fkey.includes(w))),
    );
  }, [areaIndex, q, area]);

  // One ordered list of rows: on an empty query, recents first then the areas;
  // with a query, matching areas first (few, high-value) then lessons/words.
  const rows = useMemo<Row[]>(() => {
    const lessonRows: Row[] = hits.map((hit) => ({ type: "lesson", hit }));
    const navRows: Row[] = navHits.map((nav) => ({ type: "nav", nav, score: 0 }));
    return recentMode ? [...lessonRows, ...navRows] : [...navRows, ...lessonRows];
  }, [hits, navHits, recentMode]);

  useEffect(() => setActive(0), [q, area, year, subjectId]);

  const choose = (row: Row) => {
    if (row.type === "nav") { onGo(row.nav.view); return; }
    const h = row.hit;
    // Dictionary-word / verb results open the letter page AND scroll to that
    // exact card; App listens for this and focuses it once the page has rendered.
    if (h.word) {
      const id = h.word.kind === "verb" ? verbCardId(h.title) : dictWordId(h.title);
      window.dispatchEvent(new CustomEvent("sprout:focusword", { detail: { id } }));
    }
    onGo(
      h.hasBody
        ? { kind: "lesson", year: h.year, subjectId: h.subjectId, lessonId: h.lessonId }
        : { kind: "subject", year: h.year, subjectId: h.subjectId },
    );
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, rows.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && rows[active]) { e.preventDefault(); choose(rows[active]); }
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
          <div className="cmdk-chips" role="group" aria-label="Área">
            <button className={`cmdk-chip ${area === "all" ? "on" : ""}`} onClick={() => pickArea("all")}>Todas as áreas</button>
            {AREA_FILTERS.map((a) => (
              <button key={a} className={`cmdk-chip ${area === a ? "on" : ""}`} onClick={() => pickArea(a)}>{AREA_LABEL[a]}</button>
            ))}
          </div>
          {/* Year only makes sense for school content; hide it for the grade-less
              areas (Treinar / Explorar / Biblioteca …) to keep the filters honest. */}
          {(area === "all" || area === "escola") && (
            <div className="cmdk-chips" role="group" aria-label="Ano">
              <button className={`cmdk-chip ${year === "all" ? "on" : ""}`} onClick={() => setYear("all")}>Todos os anos</button>
              {YEARS.map((y) => (
                <button key={y} className={`cmdk-chip ${year === y ? "on" : ""}`} onClick={() => setYear(y)}>{y}.º</button>
              ))}
            </div>
          )}
          <div className="cmdk-chips" role="group" aria-label="Matéria">
            <button className={`cmdk-chip ${subjectId === "all" ? "on" : ""}`} onClick={() => pickSubject("all")}>Tudo</button>
            {subjects.map((s) => (
              <button
                key={s.id}
                className={`cmdk-chip ${subjectId === s.id ? "on" : ""}`}
                style={{ ["--c" as string]: s.color }}
                onClick={() => pickSubject(s.id)}
              >
                <span className="cmdk-chip-dot" /> {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="cmdk-results" ref={listRef}>
          {rows.length === 0 && (
            <div className="cmdk-empty">
              <Icon name={recentMode ? "clock" : "search"} size={28} />
              <p>{recentMode ? "Escreve para procurar — ou escolhe uma área." : "Nada encontrado. Tenta outra palavra."}</p>
            </div>
          )}
          {rows.map((row, i) => {
            // A caption is emitted whenever the group changes (areas / recent /
            // results), so the three kinds of rows stay visually separated.
            const group = rowGroup(row);
            const prevGroup = i > 0 ? rowGroup(rows[i - 1]) : null;
            const caption =
              group === prevGroup ? null : group === "areas" ? (
                <div className="cmdk-caption"><Icon name="grid" size={14} /> Áreas</div>
              ) : group === "recent" ? (
                <div className="cmdk-caption"><Icon name="clock" size={14} /> Visto recentemente</div>
              ) : null;

            if (row.type === "nav") {
              const n = row.nav;
              return (
                <Fragment key={`nav-${n.area}-${n.title}`}>
                  {caption}
                  <button
                    data-i={i}
                    className={`cmdk-row ${i === active ? "active" : ""}`}
                    style={{ ["--c" as string]: n.color }}
                    onMouseMove={() => setActive(i)}
                    onClick={() => choose(row)}
                  >
                    <span className="cmdk-row-emoji" style={{ color: n.color, display: "inline-flex" }}><Icon name={n.icon} size={20} /></span>
                    <span className="cmdk-row-main">
                      <span className="cmdk-row-top">
                        <span className="cmdk-row-title">{n.title}</span>
                        <span className="cmdk-row-tag"><span className="cmdk-chip-dot" /> {AREA_LABEL[n.area]}</span>
                      </span>
                      <span className="cmdk-row-prev">{n.blurb}</span>
                    </span>
                    <Icon name="forward" size={16} />
                  </button>
                </Fragment>
              );
            }

            const h = row.hit;
            const detail = h.word?.letter ?? tierLabel(h.subjectId, h.year);
            return (
              <Fragment key={h.word ? `${h.word.kind}-${h.word.letter}-${h.title}` : `${h.subjectId}-${h.lessonId}`}>
                {caption}
                <button
                  data-i={i}
                  className={`cmdk-row ${i === active ? "active" : ""}`}
                  style={{ ["--c" as string]: h.color }}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(row)}
                >
                  <span className="cmdk-row-emoji" aria-hidden>{h.emoji ?? "•"}</span>
                  <span className="cmdk-row-main">
                    <span className="cmdk-row-top">
                      <span className="cmdk-row-title">{h.title}</span>
                      <span className="cmdk-row-tag">
                        <span className="cmdk-chip-dot" /> {AREA_LABEL[h.area]} · {h.subjectLabel}
                        {detail && ` · ${detail}`}
                      </span>
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
              </Fragment>
            );
          })}
        </div>

        <div className="cmdk-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
          <span><kbd>↵</kbd> abrir</span>
          <span>{rows.length} resultado{rows.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </div>
  );
}
