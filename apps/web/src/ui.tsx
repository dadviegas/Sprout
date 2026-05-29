import { Icon } from "@sprout/icons";
import type { ProgressMap } from "./progress";
import { YEARS, schoolSubjects, type Subject, type YearN } from "./content/curriculum";

export interface Stats {
  total: number; // all registered lessons
  real: number; // lessons with content
  done: number; // completed final questionnaire
  stars: number; // total stars
}

const ZERO: Stats = { total: 0, real: 0, done: 0, stars: 0 };
const add = (a: Stats, b: Stats): Stats => ({
  total: a.total + b.total,
  real: a.real + b.real,
  done: a.done + b.done,
  stars: a.stars + b.stars,
});

export function yearStats(progress: ProgressMap, subject: Subject, year: YearN): Stats {
  const lessons = subject.years[year];
  const real = lessons.filter((l) => l.body);
  const done = real.filter((l) => progress[l.id]?.done).length;
  const stars = lessons.reduce((s, l) => s + (progress[l.id]?.bestStars ?? 0), 0);
  return { total: lessons.length, real: real.length, done, stars };
}

export function subjectStats(progress: ProgressMap, subject: Subject): Stats {
  return YEARS.map((y) => yearStats(progress, subject, y)).reduce(add, ZERO);
}

/** Aggregate of every SCHOOL subject within one year — used by the year picker.
 *  "O Mundo" is excluded: it's its own section, not part of a school year. */
export function yearAllStats(progress: ProgressMap, year: YearN): Stats {
  return schoolSubjects.map((s) => yearStats(progress, s, year)).reduce(add, ZERO);
}

export function pctOf(s: Stats): number {
  return s.real ? s.done / s.real : 0;
}

export function Stars({ n }: { n: number }) {
  return (
    <span className="stars" aria-label={`${n} de 3 estrelas`}>
      {[0, 1, 2].map((i) => (
        <Icon
          key={i}
          name="star"
          size="1em"
          fill={i < n ? "currentColor" : "none"}
          style={{ color: i < n ? "var(--warn)" : "var(--ink-3)" }}
        />
      ))}
    </span>
  );
}

export function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="pbar" style={{ ["--c" as string]: color }}>
      <i style={{ width: `${Math.round(pct * 100)}%` }} />
    </div>
  );
}
