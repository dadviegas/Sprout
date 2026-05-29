import { useEffect, useRef, useState, Suspense, lazy, type ReactNode } from "react";
import { ProgressProvider, useProgress, LessonContext, type ProgressMap } from "./progress";
import { loadTheme, loadView, NAV_KEY, THEME_KEY, type View } from "./nav";
import { store } from "./storage";
import {
  schoolSubjects,
  mundoSubject,
  mundoRings,
  mundoHomeRings,
  mundoInnerRings,
  isMundoHomeRing,
  MUNDO_BEYOND,
  subjectById,
  findLesson,
  lessonMeta,
  YEARS,
  yearLabel,
  tierLabel,
  isMundo,
  type Subject,
  type YearN,
  type Lesson,
} from "./content/curriculum";
import { Icon, type IconName } from "@sprout/icons";
import { Speaker, stop as stopSpeech } from "@sprout/ui";
import { site } from "./site-config";
import { Mascot } from "./Mascot";
import { CommandCenter } from "./CommandCenter";
import { AchievementsPanel } from "./Achievements";
import { splitLesson } from "./lesson-content";
import { Stars, ProgressBar, yearStats, yearAllStats, pctOf } from "./ui";

// The markdown renderer pulls in react-markdown + remark/rehype plugins + every
// interactive widget — heavy, and only needed on lesson/test screens. Lazy-load
// it so the home/year/subject screens (and first paint) stay lean.
const Markdown = lazy(() => import("./Markdown").then((m) => ({ default: m.Markdown })));

function LessonBody({ children }: { children: string }) {
  return (
    <div className="lesson-body">
      <Suspense fallback={<div className="lesson-loading">A preparar a lição…</div>}>
        <Markdown>{children}</Markdown>
      </Suspense>
    </div>
  );
}

const SUBJECT_ICON: Record<string, IconName> = {
  matematica: "math",
  portugues: "reading",
  "estudo-do-meio": "world",
  ingles: "language",
  mundo: "compass",
  cidadania: "heart",
  artistica: "palette",
  fisica: "body",
};

const YEAR_STYLE: Record<YearN, { color: string; soft: string }> = {
  1: { color: "var(--subj-edm)", soft: "var(--subj-edm-soft)" },
  2: { color: "var(--subj-mat)", soft: "var(--subj-mat-soft)" },
  3: { color: "var(--subj-en)", soft: "var(--subj-en-soft)" },
  4: { color: "var(--accent)", soft: "var(--accent-soft)" },
};

// Per-lesson topic icons (all from @sprout/icons). Fallback: the subject icon.
const LESSON_ICON: Record<string, IconName> = {
  "mat-1-numeros-10": "abacus", "mat-1-numeros-20": "abacus", "mat-1-somar": "plusminus",
  "mat-1-formas": "shapes", "mat-1-tempo": "clock",
  "mat-1-comparar": "plusminus", "mat-1-ordinais": "trophy", "mat-1-dobro-metade": "fraction",
  "mat-2-tabuada": "times", "mat-2-numeros-100": "abacus", "mat-2-dinheiro": "coin", "mat-2-horas": "clock",
  "mat-2-tabuada-3-4-10": "times", "mat-2-par-impar": "abacus", "mat-2-solidos": "shapes", "mat-2-padroes": "shapes",
  "mat-3-multiplicacao": "times", "mat-3-divisao": "divide", "mat-3-fracoes": "fraction", "mat-3-medida": "ruler",
  "mat-3-numeros-1000": "abacus", "mat-3-multiplos": "times", "mat-3-calendario": "calendar",
  "mat-4-decimais": "abacus", "mat-4-area": "ruler", "mat-4-dados": "chart", "mat-4-problemas": "tip",
  "mat-4-numeros-milhao": "abacus", "mat-4-fracoes-decimais": "fraction", "mat-4-angulos": "ruler", "mat-4-volume": "flask",
  "pt-1-vogais": "letters", "pt-1-silabas": "letters", "pt-1-primeiras-palavras": "letters", "pt-1-rimas": "quote",
  "pt-1-maiusculas": "letters", "pt-1-ler-frases": "reading",
  "pt-2-pontuacao": "quote", "pt-2-nome-verbo": "tag", "pt-2-singular-plural": "people",
  "pt-2-tipos-frase": "quote", "pt-2-silaba-tonica": "letters",
  "pt-3-sinonimos": "quote", "pt-3-familia-palavras": "tag", "pt-3-texto": "pencil",
  "pt-3-tempos-verbais": "clock", "pt-3-leitura-compreensao": "reading",
  "pt-4-classes": "tag", "pt-4-tipos-texto": "pencil", "pt-4-acentos": "pencil",
  "pt-4-graus-adjetivo": "tag", "pt-4-carta": "pencil",
  "pt-1-ouvir-falar": "people", "pt-1-contos": "reading",
  "pt-2-recontar": "quote", "pt-2-poemas": "quote",
  "pt-3-fabulas": "paw", "pt-3-falar-publico": "speaker",
  "pt-4-autores": "reading", "pt-4-debater": "people",
  "edm-1-corpo": "body", "edm-1-dias": "calendar", "edm-1-familia": "people", "edm-1-higiene": "drop",
  "edm-1-sentidos": "body", "edm-1-seguranca": "warn",
  "edm-2-estacoes": "cloud", "edm-2-animais": "paw", "edm-2-agua": "drop",
  "edm-2-seres-vivos": "plant", "edm-2-profissoes": "people",
  "edm-3-plantas": "plant", "edm-3-portugal": "flag", "edm-3-solidos-liquidos": "flask",
  "edm-3-alimentacao": "apple", "edm-3-eletricidade": "tip",
  "edm-4-sistema-solar": "planet", "edm-4-corpo-sistemas": "heart", "edm-4-historia": "castle",
  "edm-4-ambiente": "plant", "edm-4-mapas": "compass",
  "en-1-hello": "wave", "en-1-colours": "palette", "en-1-numbers": "abacus", "en-1-numbers-20": "abacus",
  "en-2-animals": "paw", "en-2-body": "body", "en-2-family": "people", "en-2-food": "apple",
  "en-3-food": "apple", "en-3-toys": "teddy", "en-3-clothes": "shirt", "en-3-house": "home",
  "en-4-days": "calendar", "en-4-weather": "cloud", "en-4-time": "clock", "en-4-jobs": "people",
  "mundo-1-acores": "island", "mundo-1-vulcoes": "planet", "mundo-1-mar": "wave2", "mundo-1-ilha": "island",
  "mundo-1-lendas": "quote", "mundo-1-simbolos": "flag",
  "mundo-2-portugal": "flag", "mundo-2-regioes": "map", "mundo-2-comidas": "apple",
  "mundo-2-simbolos": "flag", "mundo-2-rios": "wave2",
  "mundo-3-europa": "flag", "mundo-3-atlantico": "wave2", "mundo-3-descobrimentos": "compass",
  "mundo-3-vizinhos": "people", "mundo-3-animais-oceano": "wave2",
  "mundo-4-continentes": "world", "mundo-4-fusos": "clock", "mundo-4-maravilhas": "castle",
  "mundo-4-animais": "paw", "mundo-4-bandeiras": "flag",
  "cid-1-direitos": "tag", "cid-1-reciclar": "plant", "cid-1-diferentes": "people",
  "cid-2-emocoes": "heart", "cid-2-poupar": "coin", "cid-2-ajudar": "people",
  "cid-3-internet": "lock", "cid-3-igualdade": "people", "cid-3-consumir": "tip",
  "cid-4-sustentavel": "plant", "cid-4-democracia": "people", "cid-4-saude": "heart",
  "art-1-cores": "palette", "art-1-linhas": "pencil", "art-1-sons": "speaker",
  "art-2-misturar": "palette", "art-2-instrumentos": "speaker", "art-2-faz-de-conta": "teddy",
  "art-3-tecnicas": "pencil", "art-3-ritmo": "clock", "art-3-danca": "sparkle",
  "art-4-pintores": "palette", "art-4-compositores": "speaker", "art-4-dancas-mundo": "world",
  "ef-1-mexer": "body", "ef-1-aquecer": "heart", "ef-1-jogos": "people",
  "ef-2-equilibrio": "sparkle", "ef-2-tradicionais": "teddy", "ef-2-desportivismo": "people",
  "ef-3-desportos": "trophy", "ef-3-corpo": "heart", "ef-3-ginastica": "sparkle",
  "ef-4-olimpicos": "trophy", "ef-4-vida-ativa": "heart", "ef-4-seguranca": "warn",
};

const lessonIconById = (subjectId: string, lessonId: string): IconName => LESSON_ICON[lessonId] ?? SUBJECT_ICON[subjectId];
const lessonIcon = (subjectId: string, l: Lesson): IconName => lessonIconById(subjectId, l.id);

export function App() {
  return (
    <ProgressProvider>
      <Root />
    </ProgressProvider>
  );
}

function Root() {
  const [theme, setTheme] = useState<"light" | "dark">(loadTheme);
  const [view, setView] = useState<View>(loadView);
  const [drawer, setDrawer] = useState(false);
  const [palette, setPalette] = useState(false);
  const [achievements, setAchievements] = useState(false);

  useEffect(() => store.set(THEME_KEY, theme), [theme]);
  useEffect(() => store.set(NAV_KEY, view), [view]);
  // Changing screen stops any read-aloud and scrolls to the top, so audio from
  // the previous page never keeps playing over the new one.
  useEffect(() => {
    stopSpeech();
    window.scrollTo({ top: 0 });
  }, [view]);

  // Cmd/Ctrl+K toggles the command center from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeOverlays = () => {
    setDrawer(false);
    setPalette(false);
    setAchievements(false);
  };

  // Forward navigation pushes a browser-history entry, so the device/mouse
  // Back button (and Forward) walk the in-app screens instead of leaving Sprout.
  const go = (v: View) => {
    closeOverlays();
    window.history.pushState({ sproutView: v }, "");
    setView(v);
  };
  // The in-app back arrow now uses the same history stack as the browser/mouse
  // Back, so they agree: go to the previous screen (popstate restores it).
  const back = () => window.history.back();

  // Seed history (so a deep view restored from storage still has "home" beneath
  // it, and Back never leaves the app on the first hop) and follow Back/Forward.
  const seeded = useRef(false);
  useEffect(() => {
    if (!seeded.current) {
      seeded.current = true;
      const initial = loadView();
      window.history.replaceState({ sproutView: { kind: "home" } as View }, "");
      if (initial.kind !== "home") window.history.pushState({ sproutView: initial }, "");
    }
    const onPop = (e: PopStateEvent) => {
      closeOverlays();
      const v = (e.state as { sproutView?: View } | null)?.sproutView;
      setView(v ?? { kind: "home" });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <div className="sprout-root sprout-scroll" data-palette="sprout" data-theme={theme} data-density="comfy">
      <div className="blobs" aria-hidden="true">
        <span className="blob b1" /><span className="blob b2" /><span className="blob b3" />
      </div>
      <div className="shell">
        <TopBar view={view} theme={theme} onBack={back} onHome={() => go({ kind: "home" })} onMundo={() => go({ kind: "mundo" })} onGo={go} onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))} onIndex={() => setDrawer(true)} onSearch={() => setPalette(true)} onAchievements={() => setAchievements(true)} />

        {view.kind === "home" && (
          <Home
            onPick={(year) => go({ kind: "year", year })}
            onPickRing={(ring) => go({ kind: "subject", year: ring, subjectId: mundoSubject.id })}
            onOpenMundo={() => go({ kind: "mundo" })}
            onOpenLesson={(lessonId) => {
              const m = lessonMeta.get(lessonId);
              if (m) go({ kind: "lesson", year: m.year, subjectId: m.subjectId, lessonId });
            }}
          />
        )}
        {view.kind === "mundo" && (
          <MundoView onPick={(ring) => go({ kind: "subject", year: ring, subjectId: mundoSubject.id })} />
        )}
        {view.kind === "year" && <YearView year={view.year} onPick={(subjectId) => go({ kind: "subject", year: view.year, subjectId })} />}
        {view.kind === "subject" && (
          <SubjectView
            subject={subjectById.get(view.subjectId)!}
            year={view.year}
            onPick={(lessonId) => go({ kind: "lesson", year: view.year, subjectId: view.subjectId, lessonId })}
          />
        )}
        {view.kind === "lesson" && (
          <LessonView
            subject={subjectById.get(view.subjectId)!}
            year={view.year}
            lesson={findLesson(view.subjectId, view.year, view.lessonId)!}
            onDoneNext={(next) => go(next)}
          />
        )}
        {view.kind === "test" && (
          <TestView
            subject={subjectById.get(view.subjectId)!}
            year={view.year}
            lesson={findLesson(view.subjectId, view.year, view.lessonId)!}
            onGo={go}
          />
        )}
      </div>

      {drawer && <IndexDrawer onClose={() => setDrawer(false)} onGo={go} />}
      {palette && <CommandCenter onClose={() => setPalette(false)} onGo={go} />}
      {achievements && <AchievementsPanel onClose={() => setAchievements(false)} />}
    </div>
  );
}

/* ---------------- top bar ---------------- */

function TopBar({
  view,
  theme,
  onBack,
  onHome,
  onMundo,
  onGo,
  onToggleTheme,
  onIndex,
  onSearch,
  onAchievements,
}: {
  view: View;
  theme: "light" | "dark";
  onBack: () => void;
  onHome: () => void;
  onMundo: () => void;
  onGo: (v: View) => void;
  onToggleTheme: () => void;
  onIndex: () => void;
  onSearch: () => void;
  onAchievements: () => void;
}) {
  const { totalStars } = useProgress();
  const subject =
    view.kind === "subject" || view.kind === "lesson" || view.kind === "test"
      ? subjectById.get(view.subjectId)
      : undefined;
  const lesson =
    view.kind === "lesson" || view.kind === "test"
      ? findLesson(view.subjectId, view.year, view.lessonId)
      : undefined;
  // A crumb segment is clickable when it's an ANCESTOR of the current view.
  const deeperThanYear = view.kind === "subject" || view.kind === "lesson" || view.kind === "test";
  const deeperThanSubject = view.kind === "lesson" || view.kind === "test";

  return (
    <div className="topbar">
      {view.kind === "home" ? (
        <span className="brand-badge"><Icon name="plant" size={22} /></span>
      ) : (
        <button className="iconbtn" onClick={onBack} aria-label="Voltar">
          <Icon name="back" size={22} />
        </button>
      )}

      <div className="crumb">
        {view.kind === "home" ? (
          <span>{site.brand.name}</span>
        ) : (
          <>
            <button className="crumb-home" onClick={onHome} aria-label="Início">
              <Icon name="home" size={18} />
            </button>
            <span className="sep">›</span>
            {view.kind === "mundo" ? (
              // The "Pelo mundo fora" overview itself.
              <span style={{ color: mundoSubject.color, display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Icon name={MUNDO_BEYOND.icon as IconName} size={18} /> {MUNDO_BEYOND.label}
              </span>
            ) : subject && isMundo(subject.id) ? (
              // "O Mundo" lessons: ring name (never "X.º ano"). Wider-world rings
              // sit under the "Pelo mundo fora" entry, shown as a crumb hop.
              <>
                {!isMundoHomeRing(view.year) && (
                  <>
                    <button className="crumb-home" onClick={onMundo} style={{ color: mundoSubject.color, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Icon name={MUNDO_BEYOND.icon as IconName} size={16} /> {MUNDO_BEYOND.label}
                    </button>
                    <span className="sep">›</span>
                  </>
                )}
                {deeperThanSubject ? (
                  <button className="crumb-link" style={{ color: subject.color }} onClick={() => onGo({ kind: "subject", year: view.year, subjectId: subject.id })}>
                    <Icon name={(mundoRings.find((r) => r.ring === view.year)?.icon ?? SUBJECT_ICON[subject.id]) as IconName} size={18} />
                    {tierLabel(subject.id, view.year)}
                  </button>
                ) : (
                  <span style={{ color: subject.color, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Icon name={(mundoRings.find((r) => r.ring === view.year)?.icon ?? SUBJECT_ICON[subject.id]) as IconName} size={18} />
                    {tierLabel(subject.id, view.year)}
                  </span>
                )}
              </>
            ) : (
              <>
                {deeperThanYear ? (
                  <button className="crumb-link" onClick={() => onGo({ kind: "year", year: view.year })}>{yearLabel(view.year)}</button>
                ) : (
                  <span>{yearLabel(view.year)}</span>
                )}
                {subject && (
                  <>
                    <span className="sep">›</span>
                    {deeperThanSubject ? (
                      <button className="crumb-link" style={{ color: subject.color }} aria-label={subject.label} onClick={() => onGo({ kind: "subject", year: view.year, subjectId: subject.id })}>
                        <Icon name={SUBJECT_ICON[subject.id]} size={20} />
                      </button>
                    ) : (
                      <span style={{ color: subject.color, display: "inline-flex" }}>
                        <Icon name={SUBJECT_ICON[subject.id]} size={20} />
                      </span>
                    )}
                  </>
                )}
              </>
            )}
            {lesson && (
              <>
                <span className="sep">›</span>
                {view.kind === "test" ? (
                  <button className="crumb-link ell" onClick={() => onGo({ kind: "lesson", year: view.year, subjectId: view.subjectId, lessonId: view.lessonId })}>{lesson.title}</button>
                ) : (
                  <span className="ell">{lesson.title}</span>
                )}
              </>
            )}
            {view.kind === "test" && (
              <>
                <span className="sep">›</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--warn)" }}>
                  <Icon name="trophy" size={16} /> Teste
                </span>
              </>
            )}
          </>
        )}
      </div>

      <div style={{ flex: 1 }} />
      <button className="iconbtn" onClick={onSearch} aria-label="Procurar (Ctrl+K)" title="Procurar — Ctrl+K">
        <Icon name="search" size={22} />
      </button>
      <button className="stat-chip stat-chip--btn" onClick={onAchievements} title="As minhas conquistas" aria-label="Ver as minhas conquistas">
        <Icon name="star" size={18} fill="currentColor" style={{ color: "var(--warn)" }} /> {totalStars}
      </button>
      <button className="iconbtn" onClick={onIndex} aria-label="Índice / mapa das lições">
        <Icon name="map" size={22} />
      </button>
      <button className="iconbtn" onClick={onToggleTheme} aria-label={theme === "light" ? "Modo escuro" : "Modo claro"}>
        <Icon name={theme === "light" ? "moon" : "sun"} size={22} />
      </button>
    </div>
  );
}

/* ---------------- big card ---------------- */

function BigCard({
  iconName,
  numberLabel,
  title,
  kicker,
  sub,
  color,
  colorSoft,
  soon,
  children,
  onClick,
}: {
  iconName?: IconName;
  numberLabel?: string;
  title: string;
  kicker?: string;
  sub?: ReactNode;
  color: string;
  colorSoft: string;
  soon?: boolean;
  children?: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`big-card lesson-card ${soon ? "soon" : ""}`}
      style={{ ["--c" as string]: color, ["--c-soft" as string]: colorSoft }}
      onClick={onClick}
    >
      <div className="bc-media">
        <span className="bc-motif" aria-hidden />
        <span className={`bc-art ${numberLabel ? "num" : ""}`}>
          {numberLabel ? numberLabel : iconName ? <Icon name={iconName} size={38} /> : null}
        </span>
      </div>
      <div className="bc-body">
        {kicker && (
          <div className="bc-kicker">
            <span className="bc-dot" />
            {kicker}
          </div>
        )}
        <h3 className="bc-title">{title}</h3>
        {sub}
        {children}
      </div>
    </button>
  );
}

function CardProgress({ pct, done, real, stars, color }: { pct: number; done: number; real: number; stars: number; color: string }) {
  return (
    <div className="card-progress">
      <ProgressBar pct={pct} color={color} />
      <div className="card-meta">
        <span>{done}/{real} feitas</span>
        <span className="stars-chip"><Icon name="star" size={14} fill="currentColor" style={{ color: "var(--warn)" }} /> {stars}</span>
      </div>
    </div>
  );
}

/* ---------------- recently seen (quick-resume strip) ---------------- */

// The last lessons the child opened (newest first). Lets them hop straight back
// in without re-walking year → subject. Only real lessons are tracked, so every
// chip is openable; ids whose lesson no longer exists are skipped.
function RecentlySeen({
  history,
  progress,
  onOpen,
}: {
  history: string[];
  progress: ProgressMap;
  onOpen: (lessonId: string) => void;
}) {
  const items = history.map((id) => lessonMeta.get(id) && { id, meta: lessonMeta.get(id)! }).filter(Boolean) as {
    id: string;
    meta: NonNullable<ReturnType<typeof lessonMeta.get>>;
  }[];
  if (items.length === 0) return null;

  return (
    <>
      <h2 className="section-title"><Icon name="clock" size={24} /> Visto recentemente</h2>
      <div className="recent-row">
        {items.map(({ id, meta }) => (
          <button
            key={id}
            className="recent-chip"
            style={{ ["--c" as string]: meta.color }}
            onClick={() => onOpen(id)}
            title={`${meta.title} · ${meta.subjectLabel} · ${tierLabel(meta.subjectId, meta.year)}`}
          >
            <span className="recent-chip__icon" style={{ color: meta.color }}>
              <Icon name={lessonIconById(meta.subjectId, id)} size={18} />
            </span>
            <span className="recent-chip__title">{meta.title}</span>
            {progress[id]?.done && (
              <Icon name="star" size={13} fill="currentColor" style={{ color: "var(--warn)", flexShrink: 0 }} />
            )}
          </button>
        ))}
      </div>
    </>
  );
}

/* ---------------- home: pick a year ---------------- */

function Home({
  onPick,
  onPickRing,
  onOpenMundo,
  onOpenLesson,
}: {
  onPick: (year: YearN) => void;
  onPickRing: (ring: YearN) => void;
  onOpenMundo: () => void;
  onOpenLesson: (lessonId: string) => void;
}) {
  const { progress, history, totalStars } = useProgress();
  const greeting =
    totalStars === 0
      ? `Olá! Eu sou o ${site.mascot.name}. Em que ano andas? Toca no teu ano!`
      : `Boa! Já tens ${totalStars} estrela${totalStars === 1 ? "" : "s"}! Escolhe o teu ano para continuar.`;

  return (
    <div>
      <Mascot message={greeting} mood={totalStars > 0 ? "cheer" : "happy"} />

      <RecentlySeen history={history} progress={progress} onOpen={onOpenLesson} />
      <h2 className="section-title"><Icon name="calendar" size={26} /> Escolhe o teu ano</h2>
      <div className="card-grid cols-4">
        {YEARS.map((y) => {
          const st = yearAllStats(progress, y);
          const s = YEAR_STYLE[y];
          return (
            <BigCard
              key={y}
              numberLabel={`${y}`}
              kicker="Ano"
              title={yearLabel(y)}
              color={s.color}
              colorSoft={s.soft}
              sub={<span className="sub">{schoolSubjects.length} matérias para explorar</span>}
              onClick={() => onPick(y)}
            >
              <CardProgress pct={pctOf(st)} done={st.done} real={st.real} stars={st.stars} color={s.color} />
            </BigCard>
          );
        })}
      </div>

      {/* "O Mundo" is its own area — common sense and general culture, NOT a
          school subject and NOT a grade. The Açores and Portugal (the child's
          own identity) sit right here; the wider world is one tap in. */}
      <h2 className="section-title" style={{ marginTop: 36 }}>
        <span style={{ color: mundoSubject.color, display: "inline-flex" }}>
          <Icon name={SUBJECT_ICON[mundoSubject.id]} size={26} />
        </span>
        {site.mundo.sectionTitle}
      </h2>
      <p className="section-sub">{site.mundo.sectionSub}</p>
      <div className="card-grid cols-3">
        {mundoHomeRings.map((r) => {
          const st = yearStats(progress, mundoSubject, r.ring);
          return (
            <BigCard
              key={r.ring}
              iconName={r.icon as IconName}
              kicker="O Mundo"
              title={r.label}
              color={mundoSubject.color}
              colorSoft={mundoSubject.colorSoft}
              sub={<span className="sub">{r.blurb}</span>}
              onClick={() => onPickRing(r.ring)}
            >
              <CardProgress pct={pctOf(st)} done={st.done} real={st.real} stars={st.stars} color={mundoSubject.color} />
            </BigCard>
          );
        })}
        {/* Single entry that gathers the wider-world rings. */}
        <BigCard
          iconName={MUNDO_BEYOND.icon as IconName}
          kicker="O Mundo"
          title={MUNDO_BEYOND.label}
          color={mundoSubject.color}
          colorSoft={mundoSubject.colorSoft}
          sub={<span className="sub">{MUNDO_BEYOND.blurb}</span>}
          onClick={onOpenMundo}
        >
          {(() => {
            const st = mundoInnerRings.reduce(
              (acc, r) => {
                const s = yearStats(progress, mundoSubject, r.ring);
                return { done: acc.done + s.done, real: acc.real + s.real, stars: acc.stars + s.stars };
              },
              { done: 0, real: 0, stars: 0 },
            );
            return <CardProgress pct={st.real ? st.done / st.real : 0} done={st.done} real={st.real} stars={st.stars} color={mundoSubject.color} />;
          })()}
        </BigCard>
      </div>
    </div>
  );
}

/* ---------------- "Pelo mundo fora" — wider-world rings ---------------- */

function MundoView({ onPick }: { onPick: (ring: YearN) => void }) {
  const { progress } = useProgress();
  return (
    <div>
      <Mascot message="Vamos viajar pelo mundo fora! Escolhe por onde queres começar." mood="happy" />
      <h2 className="section-title">
        <span style={{ color: mundoSubject.color, display: "inline-flex" }}>
          <Icon name={MUNDO_BEYOND.icon as IconName} size={26} />
        </span>
        {MUNDO_BEYOND.label}
      </h2>
      <p className="section-sub">{MUNDO_BEYOND.sub}</p>
      <div className="card-grid cols-3">
        {mundoInnerRings.map((r) => {
          const st = yearStats(progress, mundoSubject, r.ring);
          return (
            <BigCard
              key={r.ring}
              iconName={r.icon as IconName}
              kicker="O Mundo"
              title={r.label}
              color={mundoSubject.color}
              colorSoft={mundoSubject.colorSoft}
              sub={<span className="sub">{r.blurb}</span>}
              onClick={() => onPick(r.ring)}
            >
              <CardProgress pct={pctOf(st)} done={st.done} real={st.real} stars={st.stars} color={mundoSubject.color} />
            </BigCard>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- year → subjects ---------------- */

function YearView({ year, onPick }: { year: YearN; onPick: (subjectId: string) => void }) {
  const { progress } = useProgress();
  return (
    <div>
      <Mascot message={`Boa escolha — ${yearLabel(year)}! Agora escolhe uma matéria para explorar.`} mood="happy" />
      <h2 className="section-title">{yearLabel(year)} · As matérias</h2>
      <div className="card-grid">
        {schoolSubjects.map((s) => {
          const st = yearStats(progress, s, year);
          return (
            <BigCard
              key={s.id}
              iconName={SUBJECT_ICON[s.id]}
              kicker={yearLabel(year)}
              title={s.label}
              color={s.color}
              colorSoft={s.colorSoft}
              sub={<span className="sub">{s.blurb}</span>}
              onClick={() => onPick(s.id)}
            >
              <CardProgress pct={pctOf(st)} done={st.done} real={st.real} stars={st.stars} color={s.color} />
            </BigCard>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- subject (+year) → lessons ---------------- */

function SubjectView({ subject, year, onPick }: { subject: Subject; year: YearN; onPick: (lessonId: string) => void }) {
  const { progress } = useProgress();
  const lessons = subject.years[year];
  const tier = tierLabel(subject.id, year);
  return (
    <div>
      <Mascot message={`${subject.label} • ${tier}. Escolhe uma lição para começar!`} mood="happy" />
      <h2 className="section-title">
        <span style={{ color: subject.color, display: "inline-flex" }}><Icon name={SUBJECT_ICON[subject.id]} size={26} /></span>
        {subject.label}
        <span style={{ color: "var(--ink-3)", fontWeight: 500 }}> · {tier}</span>
      </h2>
      <div className="card-grid cols-3">
        {lessons.map((l) => {
          const p = progress[l.id];
          const soon = !l.body;
          return (
            <BigCard
              key={l.id}
              iconName={lessonIcon(subject.id, l)}
              kicker={subject.label}
              title={l.title}
              color={subject.color}
              colorSoft={subject.colorSoft}
              soon={soon}
              onClick={() => onPick(l.id)}
              sub={
                soon ? (
                  <span className="tag"><Icon name="lock" size={13} /> Em breve</span>
                ) : p?.done ? (
                  <Stars n={p.bestStars} />
                ) : (
                  <span className="sub">Toca para começar ›</span>
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- lesson ---------------- */

function LessonView({
  subject,
  year,
  lesson,
  onDoneNext,
}: {
  subject: Subject;
  year: YearN;
  lesson: Lesson;
  onDoneNext: (v: View) => void;
}) {
  const { markVisited, recordSeen, progress } = useProgress();
  useEffect(() => {
    markVisited(lesson.id);
    if (lesson.body) recordSeen(lesson.id); // only real lessons join "recently seen"
  }, [lesson.id, lesson.body, markVisited, recordSeen]);

  const p = progress[lesson.id];

  if (!lesson.body) {
    return (
      <div className="sprout-fade-up">
        <div className="lesson-body" style={{ textAlign: "center" }}>
          <div style={{ color: subject.color, display: "flex", justifyContent: "center", margin: "8px 0" }}>
            <Icon name={lessonIcon(subject.id, lesson)} size={72} />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)" }}>{lesson.title}</h1>
          <p style={{ color: "var(--ink-2)", fontSize: "1.1em" }}>
            Esta lição está a ser preparada com muito carinho.
            <br />
            Volta em breve para aprenderes sobre <strong>{lesson.title.toLowerCase()}</strong>!
          </p>
          <button className="pill ghost" onClick={() => onDoneNext({ kind: "subject", year, subjectId: subject.id })}>
            <Icon name="back" size={18} /> Ver outras lições
          </button>
        </div>
      </div>
    );
  }

  // Show the learning content + practice here; the graded final questionnaire
  // lives on its own screen, reached by the "Fazer o teste" link below.
  const { learn, test } = splitLesson(lesson.body);

  return (
    <LessonContext.Provider value={lesson.id}>
      <div className="sprout-fade-up">
        <LessonBody>{learn}</LessonBody>

        {test && (
          <button
            className="test-cta"
            style={{ ["--c" as string]: subject.color }}
            onClick={() => onDoneNext({ kind: "test", year, subjectId: subject.id, lessonId: lesson.id })}
          >
            <span className="test-cta__icon"><Icon name="trophy" size={26} /></span>
            <span className="test-cta__text">
              <span className="test-cta__title">
                {p?.done ? "Repetir o teste" : "Fazer o teste"}
                {p?.done && <Stars n={p.bestStars} />}
              </span>
              <span className="test-cta__sub">
                {p?.done
                  ? "Já completaste — tenta melhorar as estrelas!"
                  : "Mostra o que aprendeste e ganha estrelas ⭐"}
              </span>
            </span>
            <span className="test-cta__go"><Icon name="forward" size={22} /></span>
          </button>
        )}

        <div className="row" style={{ justifyContent: "flex-start", marginTop: 18 }}>
          <button className="pill ghost" onClick={() => onDoneNext({ kind: "subject", year, subjectId: subject.id })}>
            <Icon name="back" size={18} /> Voltar às lições
          </button>
        </div>
      </div>
    </LessonContext.Provider>
  );
}

/* ---------------- test (final questionnaire on its own screen) ---------------- */

function TestView({
  subject,
  year,
  lesson,
  onGo,
}: {
  subject: Subject;
  year: YearN;
  lesson: Lesson;
  onGo: (v: View) => void;
}) {
  const { progress } = useProgress();
  const { test } = splitLesson(lesson.body ?? "");

  const lessons = subject.years[year];
  const idx = lessons.findIndex((l) => l.id === lesson.id);
  // Next lesson that actually has content, so "Próxima lição" never dead-ends.
  const next = lessons.slice(idx + 1).find((l) => l.body);
  const p = progress[lesson.id];

  if (!test) {
    return (
      <div className="sprout-fade-up lesson-body" style={{ textAlign: "center" }}>
        <p style={{ color: "var(--ink-2)" }}>Esta lição ainda não tem teste.</p>
        <button className="pill ghost" onClick={() => onGo({ kind: "lesson", year, subjectId: subject.id, lessonId: lesson.id })}>
          <Icon name="back" size={18} /> Voltar à lição
        </button>
      </div>
    );
  }

  return (
    <LessonContext.Provider value={lesson.id}>
      <div className="sprout-fade-up">
        <div className="test-header" style={{ ["--c" as string]: subject.color }}>
          <span className="test-header__icon"><Icon name="trophy" size={30} /></span>
          <div>
            <div className="test-header__kicker">
              <Icon name={SUBJECT_ICON[subject.id]} size={15} /> {subject.label} · {tierLabel(subject.id, year)}
            </div>
            <h1 className="test-header__title">Teste: {lesson.title}</h1>
          </div>
        </div>

        <LessonBody>{test}</LessonBody>

        <div className="row" style={{ justifyContent: "space-between", marginTop: 18 }}>
          <button className="pill ghost" onClick={() => onGo({ kind: "lesson", year, subjectId: subject.id, lessonId: lesson.id })}>
            <Icon name="back" size={18} /> Voltar à lição
          </button>
          {p?.done && next && (
            <button
              className="pill"
              style={{ ["--primary" as string]: subject.color }}
              onClick={() => onGo({ kind: "lesson", year, subjectId: subject.id, lessonId: next.id })}
            >
              Próxima lição: {next.title} <Icon name="forward" size={18} />
            </button>
          )}
        </div>
      </div>
    </LessonContext.Provider>
  );
}

/* ---------------- optional index drawer (off by default) ---------------- */

function IndexDrawer({ onClose, onGo }: { onClose: () => void; onGo: (v: View) => void }) {
  const { progress } = useProgress();
  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer sprout-scroll">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.2em", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Icon name="map" size={22} /> Mapa das lições
          </strong>
          <button className="iconbtn" onClick={onClose} aria-label="Fechar">
            <Icon name="close" size={22} />
          </button>
        </div>
        {YEARS.map((y) => (
          <div key={y}>
            <div className="tree-subj" style={{ color: YEAR_STYLE[y].color }}>{yearLabel(y)}</div>
            {schoolSubjects.map((s) => (
              <div key={s.id}>
                <div className="tree-year" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: s.color, display: "inline-flex" }}><Icon name={SUBJECT_ICON[s.id]} size={16} /></span>
                  {s.label}
                </div>
                {s.years[y].map((l) => {
                  const done = progress[l.id]?.done;
                  return (
                    <button
                      key={l.id}
                      className={`tree-lesson ${done ? "done" : ""}`}
                      onClick={() => onGo({ kind: "lesson", year: y, subjectId: s.id, lessonId: l.id })}
                    >
                      <span style={{ color: s.color, display: "inline-flex", verticalAlign: "-2px" }}>
                        <Icon name={lessonIcon(s.id, l)} size={16} />
                      </span>{" "}
                      {l.title} {done ? "✓" : l.body ? "" : "·"}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        ))}

        {/* "O Mundo" — its own section, listed by proximity ring (not year). */}
        <div>
          <div className="tree-subj" style={{ color: mundoSubject.color, display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name={SUBJECT_ICON[mundoSubject.id]} size={16} /> O Mundo
          </div>
          {mundoRings.map((r) => (
            <div key={r.ring}>
              <div className="tree-year">{r.label}</div>
              {mundoSubject.years[r.ring].map((l) => {
                const done = progress[l.id]?.done;
                return (
                  <button
                    key={l.id}
                    className={`tree-lesson ${done ? "done" : ""}`}
                    onClick={() => onGo({ kind: "lesson", year: r.ring, subjectId: mundoSubject.id, lessonId: l.id })}
                  >
                    <span style={{ color: mundoSubject.color, display: "inline-flex", verticalAlign: "-2px" }}>
                      <Icon name={lessonIcon(mundoSubject.id, l)} size={16} />
                    </span>{" "}
                    {l.title} {done ? "✓" : l.body ? "" : "·"}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
