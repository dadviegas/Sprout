import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Children, isValidElement, type ReactNode } from "react";
import {
  Callout, type CalloutKind,
  StatGrid, Steps, Compare, Quote, Meters, KeyValueGrid,
  Shape, type ShapeSpec,
  Clock, type ClockSpec,
  NumberLine, type NumberLineSpec,
  TenFrame, type TenFrameSpec,
  Fraction, type FractionSpec,
  Money, type MoneySpec,
  Shop, type ShopSpec,
  SolarSystem, type SolarSystemSpec,
  DayNight, type DayNightSpec,
  SoundCards, type SoundCardsSpec,
  Dictionary, type DictionarySpec,
  Tabuada, type TabuadaSpec,
  MathBlock, type MathSpec,
  Chart, type ChartSpec,
  Speaker,
} from "@sprout/ui";
import { Quiz, type QuizSpec } from "./Quiz";
import { Icon, iconNames, type IconName } from "@sprout/icons";

/* ---- read-aloud helpers (the child may not read yet) ---- */

/** Strip markdown + fenced blocks + callout markers so speech reads clean prose.
 *  Line, list and table boundaries become sentence breaks (". ") so the engine
 *  pauses between rows/items instead of reading everything run-on. */
function toPlainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ") // fenced widget/quiz blocks
    .replace(/\[!(NOTE|TIP|WARNING|DANGER|SUCCESS)\]/gi, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → their text
    .replace(/^\s*\|?[\s:|-]*-{2,}[\s:|-]*\|?\s*$/gm, "") // table separator rows
    .replace(/^[ \t]*\|/gm, "").replace(/\|[ \t]*$/gm, "") // drop outer table pipes (avoid leading/trailing commas)
    .replace(/^[ \t]*[-+]\s+/gm, "") // list bullets
    .replace(/[#>*_`~]+/g, " ") // markdown punctuation (the table pipe is handled next)
    .replace(/\|/g, ", ") // inner table cell separator → slight pause
    .replace(/\n+/g, ". ") // line / row boundary → sentence pause
    .replace(/[ \t]+/g, " ")
    .replace(/\s+([.,])/g, "$1") // no space before a comma/period
    .replace(/,\s*\./g, ".") // ", ." → "." (no double pause between table rows)
    .replace(/(\.\s*){2,}/g, ". ") // collapse repeated ". ."
    .trim();
}

/** Plain text of one section: from a heading node to the next heading. Uses the
 *  hast node's source offsets so we read exactly that section's prose aloud. */
function sectionText(source: string, node: unknown): string {
  const pos = (node as { position?: { start?: { offset?: number }; end?: { offset?: number } } })?.position;
  const start = pos?.start?.offset;
  const end = pos?.end?.offset;
  if (typeof start !== "number" || typeof end !== "number") return "";
  const heading = source.slice(start, end);
  const rest = source.slice(end);
  const next = rest.match(/\n#{1,6}\s/);
  const bodyMd = next ? rest.slice(0, next.index) : rest;
  return toPlainText(`${heading}\n${bodyMd}`);
}

/* ---- summary block: what you'll learn + examples + read-aloud ---- */

interface SummarySpec {
  learn?: string[];
  examples?: string[];
  say?: string;
}

function Summary({ spec }: { spec: SummarySpec }) {
  const learn = spec.learn ?? [];
  const examples = spec.examples ?? [];
  const sayText =
    spec.say ??
    `O que vais aprender. ${learn.join(". ")}.${examples.length ? " Por exemplo: " + examples.join(", ") + "." : ""}`;
  return (
    <div className="lesson-summary">
      <div className="lesson-summary__head">
        <span className="lesson-summary__icon"><Icon name="tip" size={22} /></span>
        <strong>O que vais aprender</strong>
        <Speaker text={sayText} className="lesson-summary__speak" label="Ouvir o resumo">
          {" "}Ouvir
        </Speaker>
      </div>
      {learn.length > 0 && (
        <ul className="lesson-summary__list">
          {learn.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      )}
      {examples.length > 0 && (
        <div className="lesson-summary__ex">
          <span className="lesson-summary__ex-label">Exemplos:</span>
          {examples.map((e, i) => <code key={i}>{e}</code>)}
        </div>
      )}
    </div>
  );
}

/* Steps/keyvalue can name a @sprout/icons glyph in their `icon` field; we swap
   the string for a crisp SVG <Icon> so lessons aren't limited to emoji. */
const ICON_SET = new Set<string>(iconNames as readonly string[]);
function resolveIcons<T extends { icon?: unknown }>(items: T[]): T[] {
  return items.map((it) =>
    it && typeof it.icon === "string" && ICON_SET.has(it.icon)
      ? { ...it, icon: <Icon name={it.icon as IconName} size={24} /> }
      : it,
  );
}

function hashId(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return "q" + (h >>> 0).toString(36);
}

const infographicRenderers: Record<string, (json: unknown) => ReactNode> = {
  summary: (d) => <Summary spec={d as SummarySpec} />,
  stats: (d) => <StatGrid items={d as Parameters<typeof StatGrid>[0]["items"]} />,
  steps: (d) => <Steps items={resolveIcons(d as Parameters<typeof Steps>[0]["items"])} />,
  meters: (d) => <Meters items={d as Parameters<typeof Meters>[0]["items"]} />,
  keyvalue: (d) => <KeyValueGrid items={resolveIcons(d as Parameters<typeof KeyValueGrid>[0]["items"])} />,
  compare: (d) => <Compare columns={d as Parameters<typeof Compare>[0]["columns"]} />,
  quote: (d) => {
    const q = d as { text: string; by?: string; role?: string };
    return (
      <Quote by={q.by} role={q.role}>
        {q.text}
      </Quote>
    );
  },
};

/** Portuguese-aware, accent-insensitive sort for dictionary word cards. */
const dictCollator = new Intl.Collator("pt", { sensitivity: "base" });

const widgetRenderers: Record<string, (json: unknown) => ReactNode> = {
  shape: (d) => <Shape spec={d as ShapeSpec} />,
  clock: (d) => <Clock spec={d as ClockSpec} />,
  numberline: (d) => <NumberLine spec={d as NumberLineSpec} />,
  tenframe: (d) => <TenFrame spec={d as TenFrameSpec} />,
  fraction: (d) => <Fraction spec={d as FractionSpec} />,
  money: (d) => <Money spec={d as MoneySpec} />,
  shop: (d) => <Shop spec={d as ShopSpec} />,
  solarsystem: (d) => <SolarSystem spec={d as SolarSystemSpec} />,
  daynight: (d) => <DayNight spec={d as DayNightSpec} />,
  soundcards: (d) => <SoundCards spec={d as SoundCardsSpec} />,
  dictionary: (d) => {
    // Show the word cards alphabetically (pt collation: á sorts with a),
    // so authors don't have to hand-sort the entries in the .md block.
    const spec = d as DictionarySpec;
    const entries = [...spec.entries].sort((a, b) => dictCollator.compare(a.word, b.word));
    return <Dictionary spec={{ ...spec, entries }} />;
  },
  tabuada: (d) => <Tabuada spec={d as TabuadaSpec} />,
  math: (d) => <MathBlock spec={d as MathSpec} />,
  chart: (d) => <Chart spec={d as ChartSpec} />,
};

function jsonError(lang: string, e: unknown): ReactNode {
  return (
    <pre style={{ background: "var(--danger-soft)", color: "var(--danger)", padding: 12, borderRadius: "var(--radius-sm)", whiteSpace: "pre-wrap" }}>
      {`Bloco ${lang} inválido: ${e instanceof Error ? e.message : String(e)}`}
    </pre>
  );
}

const calloutDirective = /^\s*\[!(NOTE|TIP|WARNING|DANGER|SUCCESS)\]\s*/i;
const kindMap: Record<string, CalloutKind> = {
  NOTE: "info",
  TIP: "tip",
  WARNING: "warning",
  DANGER: "danger",
  SUCCESS: "success",
};

function extractCalloutKind(children: ReactNode): { kind: CalloutKind; stripped: ReactNode } | null {
  const arr = Children.toArray(children).filter((c) => !(typeof c === "string" && c.trim() === ""));
  const first = arr[0];
  if (!isValidElement(first) || first.type !== "p") return null;
  const pChildren = Children.toArray((first.props as { children?: ReactNode }).children);
  const head = pChildren[0];
  if (typeof head !== "string") return null;
  const match = head.match(calloutDirective);
  if (!match) return null;
  const kind = kindMap[match[1].toUpperCase()];
  const rest = head.slice(match[0].length).replace(/^\s+/, "");
  const newP = (
    <p key="p">
      {rest}
      {pChildren.slice(1)}
    </p>
  );
  return { kind, stripped: [newP, ...arr.slice(1)] };
}

const components: Components = {
  // react-markdown wraps fenced blocks in <pre>. Our `code` renderer returns
  // rich block components (Quiz, infographics) for special languages, so we
  // unwrap <pre> to avoid trapping them in monospace/pre styling. The plain
  // code fallback below brings its own <pre>.
  pre({ children }) {
    return <>{children}</>;
  },
  code({ className, children }) {
    const langMatch = /language-(\w+)/.exec(className || "");
    if (!langMatch) return <code className={className}>{children}</code>;
    const source = String(children).replace(/\n$/, "");
    const lang = langMatch[1];

    if (lang === "quiz") {
      try {
        const spec = JSON.parse(source) as QuizSpec;
        return <Quiz spec={spec} quizId={spec.id ?? hashId(source)} />;
      } catch (e) {
        return jsonError("quiz", e);
      }
    }
    if (lang in widgetRenderers) {
      try {
        return widgetRenderers[lang](JSON.parse(source));
      } catch (e) {
        return jsonError(lang, e);
      }
    }
    if (lang in infographicRenderers) {
      try {
        return infographicRenderers[lang](JSON.parse(source));
      } catch (e) {
        return jsonError(lang, e);
      }
    }
    return (
      <pre style={{ background: "var(--code-bg)", color: "var(--code-ink)", padding: 14, borderRadius: "var(--radius)", overflow: "auto" }}>
        <code>{source}</code>
      </pre>
    );
  },
  blockquote({ children }) {
    const callout = extractCalloutKind(children);
    if (callout) return <Callout kind={callout.kind}>{callout.stripped}</Callout>;
    return <blockquote>{children}</blockquote>;
  },
  // `[texto](lesson:<id>)` jumps to another lesson inside the app (no reload);
  // it tells App to navigate via a window event. Other links open normally.
  a({ href, children }) {
    if (href && href.startsWith("lesson:")) {
      const lessonId = href.slice("lesson:".length);
      const navigate = () => window.dispatchEvent(new CustomEvent("sprout:navigate", { detail: { lessonId } }));
      return (
        <a
          className="lesson-link"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            navigate();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate();
            }
          }}
        >
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  },
};

export function Markdown({ children }: { children: string }) {
  const source = children;
  // Add a read-aloud speaker to every section heading so a non-reader can hear
  // each part. Built per-render so the heading renderers close over `source`.
  const withSpeakers: Components = {
    ...components,
    h2: ({ node, children: c }) => (
      <h2 className="prose-h">
        <span className="prose-h__text">{c}</span>
        <Speaker text={sectionText(source, node)} label="Ouvir esta parte" />
      </h2>
    ),
    h3: ({ node, children: c }) => (
      <h3 className="prose-h">
        <span className="prose-h__text">{c}</span>
        <Speaker text={sectionText(source, node)} label="Ouvir esta parte" />
      </h3>
    ),
  };
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={withSpeakers}
        // Lesson bodies are trusted (authored in-repo), so keep URLs as-is —
        // the default sanitizer strips our internal `lesson:<id>` link scheme.
        urlTransform={(url) => url}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
