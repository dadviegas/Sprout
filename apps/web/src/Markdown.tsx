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
  SoundCards, type SoundCardsSpec,
  speak, canSpeak,
} from "@sprout/ui";
import { Quiz, type QuizSpec } from "./Quiz";
import { Icon, iconNames, type IconName } from "@sprout/icons";

/* ---- read-aloud helpers (the child may not read yet) ---- */

/** Strip markdown + fenced blocks + callout markers so speech reads clean prose. */
function toPlainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[!(NOTE|TIP|WARNING|DANGER|SUCCESS)\]/gi, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|]+/g, " ")
    .replace(/\s+/g, " ")
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

function SpeakButton({ text, label = "Ouvir" }: { text: string; label?: string }) {
  if (!canSpeak() || !text) return null;
  return (
    <button type="button" className="prose-speak" onClick={() => speak(text)} aria-label={label} title={label}>
      <Icon name="speaker" size={18} />
    </button>
  );
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
        {canSpeak() && (
          <button type="button" className="lesson-summary__speak" onClick={() => speak(sayText)} aria-label="Ouvir o resumo">
            <Icon name="speaker" size={18} /> Ouvir
          </button>
        )}
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

const widgetRenderers: Record<string, (json: unknown) => ReactNode> = {
  shape: (d) => <Shape spec={d as ShapeSpec} />,
  clock: (d) => <Clock spec={d as ClockSpec} />,
  numberline: (d) => <NumberLine spec={d as NumberLineSpec} />,
  tenframe: (d) => <TenFrame spec={d as TenFrameSpec} />,
  fraction: (d) => <Fraction spec={d as FractionSpec} />,
  money: (d) => <Money spec={d as MoneySpec} />,
  soundcards: (d) => <SoundCards spec={d as SoundCardsSpec} />,
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
        <SpeakButton text={sectionText(source, node)} label="Ouvir esta parte" />
      </h2>
    ),
    h3: ({ node, children: c }) => (
      <h3 className="prose-h">
        <span className="prose-h__text">{c}</span>
        <SpeakButton text={sectionText(source, node)} label="Ouvir esta parte" />
      </h3>
    ),
  };
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={withSpeakers}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
