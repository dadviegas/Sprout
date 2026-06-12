import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Children, Component, isValidElement, useState, type ReactNode } from "react";
import {
  Callout, type CalloutKind,
  StatGrid, Steps, Compare, Quote, Meters, KeyValueGrid,
  Shape, type ShapeSpec,
  Angle, type AngleSpec,
  AreaGrid, type AreaGridSpec,
  Symmetry, type SymmetrySpec,
  Compass, type CompassSpec,
  WaterCycle, type WaterCycleSpec,
  BodySystem, type BodySystemSpec,
  Timeline, type TimelineSpec,
  MapaPt, type MapaPtSpec,
  Clock, type ClockSpec,
  NumberLine, type NumberLineSpec,
  TenFrame, type TenFrameSpec,
  Fraction, type FractionSpec,
  FractionStrips, type FractionStripsSpec,
  FractionOf, type FractionOfSpec,
  Money, type MoneySpec,
  Shop, type ShopSpec,
  SolarSystem, type SolarSystemSpec,
  DayNight, type DayNightSpec,
  SoundCards, type SoundCardsSpec,
  DragLetters, type DragLettersSpec,
  CompleteWord, type CompleteWordSpec,
  Dictionary, type DictionarySpec,
  Verbs, type VerbsSpec,
  Colors, type ColorsSpec,
  ColorMix, type ColorMixSpec,
  Atlas, type AtlasSpec,
  SizeCompare, type SizeCompareSpec,
  Volcano, type VolcanoSpec,
  SkyBlue, type SkyBlueSpec,
  Buoyancy, type BuoyancySpec,
  Lifecycle, type LifecycleSpec,
  FoodChain, type FoodChainSpec,
  Layers, type LayersSpec,
  Tabuada, type TabuadaSpec,
  ContaArmada, type ContaArmadaSpec,
  DinheiroJogo, type DinheiroJogoSpec,
  BlocosBase10, type BlocosSpec,
  Drill, type DrillSpec,
  Figure, type FigureSpec,
  MathBlock, type MathSpec,
  Chart, type ChartSpec,
  Speaker,
} from "@sprout/ui";
import { Quiz, type QuizSpec } from "./Quiz";
import { verbEntriesForLetter } from "./content/dictMerge";
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
  steps: (d) => {
    // Plain array, or `{ "reveal": true, "items": [ … ] }` for retrieval
    // practice — steps uncovered one tap at a time (see Infographic.tsx).
    type StepItems = Parameters<typeof Steps>[0]["items"];
    const spec = Array.isArray(d) ? { items: d as StepItems } : (d as { items: StepItems; reveal?: boolean });
    return <Steps items={resolveIcons(spec.items ?? [])} reveal={spec.reveal} />;
  },
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
  angle: (d) => <Angle spec={d as AngleSpec} />,
  areagrid: (d) => <AreaGrid spec={d as AreaGridSpec} />,
  symmetry: (d) => <Symmetry spec={d as SymmetrySpec} />,
  compass: (d) => <Compass spec={d as CompassSpec} />,
  watercycle: (d) => <WaterCycle spec={d as WaterCycleSpec} />,
  bodysystem: (d) => <BodySystem spec={d as BodySystemSpec} />,
  timeline: (d) => <Timeline spec={d as TimelineSpec} />,
  mapapt: (d) => <MapaPt spec={d as MapaPtSpec} />,
  clock: (d) => <Clock spec={d as ClockSpec} />,
  numberline: (d) => <NumberLine spec={d as NumberLineSpec} />,
  tenframe: (d) => <TenFrame spec={d as TenFrameSpec} />,
  fraction: (d) => <Fraction spec={d as FractionSpec} />,
  fractionstrips: (d) => <FractionStrips spec={d as FractionStripsSpec} />,
  fractionof: (d) => <FractionOf spec={d as FractionOfSpec} />,
  money: (d) => <Money spec={d as MoneySpec} />,
  shop: (d) => <Shop spec={d as ShopSpec} />,
  solarsystem: (d) => <SolarSystem spec={d as SolarSystemSpec} />,
  daynight: (d) => <DayNight spec={d as DayNightSpec} />,
  soundcards: (d) => <SoundCards spec={d as SoundCardsSpec} />,
  dragletters: (d) => <DragLetters spec={d as DragLettersSpec} />,
  completeword: (d) => <CompleteWord spec={d as CompleteWordSpec} />,
  dictionary: (d) => {
    // Bring this letter's verbs into the dictionary (single source stays
    // verbos/*.md — see dictMerge). A word that already exists *and* is a verb
    // (homographs like "jantar") keeps its meaning/class and just gains the
    // conjugation; the remaining verbs are added as their own cards. Then show
    // every card alphabetically (pt collation: á sorts with a), so authors don't
    // have to hand-sort the entries in the .md block.
    const spec = d as DictionarySpec;
    const derived = verbEntriesForLetter(spec.letter);
    const verbByWord = new Map(derived.map((v) => [v.word.toLowerCase(), v.verb!]));
    const have = new Set(spec.entries.map((e) => e.word.toLowerCase()));
    const merged = [
      ...spec.entries.map((e) => {
        const v = verbByWord.get(e.word.toLowerCase());
        return v ? { ...e, verb: v } : e;
      }),
      ...derived.filter((v) => !have.has(v.word.toLowerCase())),
    ];
    const entries = merged.sort((a, b) => dictCollator.compare(a.word, b.word));
    return <Dictionary spec={{ ...spec, entries }} />;
  },
  verbs: (d) => {
    // Sort the verbs alphabetically too (pt collation), so authors don't have
    // to hand-order the entries in the .md block.
    const spec = d as VerbsSpec;
    const verbs = [...spec.verbs].sort((a, b) => dictCollator.compare(a.verb, b.verb));
    return <Verbs spec={{ ...spec, verbs }} />;
  },
  tabuada: (d) => <Tabuada spec={d as TabuadaSpec} />,
  contaarmada: (d) => <ContaArmada spec={d as ContaArmadaSpec} />,
  dinheirojogo: (d) => <DinheiroJogo spec={d as DinheiroJogoSpec} />,
  blocos: (d) => <BlocosBase10 spec={d as BlocosSpec} />,
  drill: (d) => <Drill spec={d as DrillSpec} />,
  figure: (d) => <Figure spec={d as FigureSpec} />,
  math: (d) => <MathBlock spec={d as MathSpec} />,
  chart: (d) => <Chart spec={d as ChartSpec} />,
  colors: (d) => <Colors spec={d as ColorsSpec} />,
  colormix: (d) => <ColorMix spec={d as ColorMixSpec} />,
  atlas: (d) => <Atlas spec={d as AtlasSpec} />,
  sizecompare: (d) => <SizeCompare spec={d as SizeCompareSpec} />,
  volcano: (d) => <Volcano spec={d as VolcanoSpec} />,
  skyblue: (d) => <SkyBlue spec={d as SkyBlueSpec} />,
  buoyancy: (d) => <Buoyancy spec={d as BuoyancySpec} />,
  lifecycle: (d) => <Lifecycle spec={d as LifecycleSpec} />,
  foodchain: (d) => <FoodChain spec={d as FoodChainSpec} />,
  layers: (d) => <Layers spec={d as LayersSpec} />,
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

/* A widget/infographic that throws WHILE RENDERING (e.g. a `compare` block whose
 * JSON is valid but the wrong shape, so `columns.map` blows up) would otherwise
 * crash the whole lesson — the throw happens during React render, after the
 * JSON.parse try/catch above. This per-block boundary turns such a failure into
 * one inline error card, so the rest of the lesson keeps working. */
class BlockBoundary extends Component<{ lang: string; children: ReactNode }, { failed: boolean; msg: string }> {
  state = { failed: false, msg: "" };
  static getDerivedStateFromError(e: unknown): { failed: boolean; msg: string } {
    return { failed: true, msg: e instanceof Error ? e.message : String(e) };
  }
  render() {
    return this.state.failed ? jsonError(this.props.lang, this.state.msg) : this.props.children;
  }
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
        return <BlockBoundary lang="quiz"><Quiz spec={spec} quizId={spec.id ?? hashId(source)} /></BlockBoundary>;
      } catch (e) {
        return jsonError("quiz", e);
      }
    }
    if (lang in widgetRenderers) {
      try {
        return <BlockBoundary lang={lang}>{widgetRenderers[lang](JSON.parse(source))}</BlockBoundary>;
      } catch (e) {
        return jsonError(lang, e);
      }
    }
    if (lang in infographicRenderers) {
      try {
        return <BlockBoundary lang={lang}>{infographicRenderers[lang](JSON.parse(source))}</BlockBoundary>;
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
  // `[texto](lesson:<id>)` jumps to another lesson and `[texto](subject:<id>)`
  // to a subject/area overview (e.g. the "Os Verbos" conjugator) inside the app
  // (no reload); it tells App to navigate via a window event. Other links open
  // normally.
  a({ href, children }) {
    const scheme = href?.startsWith("lesson:") ? "lesson" : href?.startsWith("subject:") ? "subject" : null;
    if (href && scheme) {
      const id = href.slice(scheme.length + 1);
      const detail = scheme === "lesson" ? { lessonId: id } : { subjectId: id };
      const navigate = () => window.dispatchEvent(new CustomEvent("sprout:navigate", { detail }));
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

/** Render one markdown string. Section headings get a read-aloud speaker; the
 *  renderers close over `source` so each heading hears exactly its own prose. */
function MarkdownBody({ source }: { source: string }) {
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
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={withSpeakers}
      // Lesson bodies are trusted (authored in-repo), so keep URLs as-is —
      // the default sanitizer strips our internal `lesson:<id>` link scheme.
      urlTransform={(url) => url}
    >
      {source}
    </ReactMarkdown>
  );
}

/* "Ler mais": an article may carry a child-level summary up top and a complete,
 * grown-up version below, split by a `<!--ler-mais-->` line. The summary always
 * shows; the rest is revealed in place by a button — flowing as normal prose, so
 * we don't wrap a box around content that already holds boxes (widgets/callouts).
 * See docs/BIBLIOTECA.md (dual-level articles). */
const MORE_MARKER = "<!--ler-mais-->";

function ReadMore({ summary, full }: { summary: string; full: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="prose">
      <MarkdownBody source={summary} />
      <div className="read-more">
        <p className="read-more__note">
          <Icon name="reading" size={18} />
          <span>
            Há mais para descobrir. A <strong>versão completa</strong> é mais
            longa e detalhada — para adultos e para quem quiser saber tudo.
          </span>
          <Speaker
            text="Há mais para descobrir. A versão completa é mais longa e detalhada, para adultos e para quem quiser saber tudo. Carrega no botão Ler mais."
            label="Ouvir a nota"
          />
        </p>
        <button className="read-more__btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? "minus" : "plus"} size={18} />
          {open ? "Ler menos" : "Ler mais"}
        </button>
      </div>
      {open && <MarkdownBody source={full} />}
    </div>
  );
}

export function Markdown({ children }: { children: string }) {
  const i = children.indexOf(MORE_MARKER);
  if (i < 0) return <div className="prose"><MarkdownBody source={children} /></div>;
  const summary = children.slice(0, i).trimEnd();
  const full = children.slice(i + MORE_MARKER.length).replace(/^\s+/, "");
  return <ReadMore summary={summary} full={full} />;
}
