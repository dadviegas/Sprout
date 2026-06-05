import { useEffect, useRef, useState, Suspense, lazy, type ReactNode } from "react";
import { ProgressProvider, useProgress, LessonContext, type ProgressMap } from "./progress";
import { loadTheme, loadView, viewToHash, viewFromHash, NAV_KEY, THEME_KEY, type View, type AreaId } from "./nav";
import { store } from "./storage";
import {
  mundoSubject,
  mundoRings,
  mundoHomeRings,
  mundoInnerRings,
  isMundoHomeRing,
  MUNDO_BEYOND,
  estudoSubject,
  estudoTopics,
  isEstudo,
  dicionarioSubject,
  isDicionario,
  verbosSubject,
  isVerbos,
  paisesSubject,
  paisesCountries,
  isPaises,
  subjectById,
  findLesson,
  lessonMeta,
  YEARS,
  subjectsForYear,
  CYCLE_YEARS,
  CYCLE_LABEL,
  yearLabel,
  tierLabel,
  isMundo,
  type Subject,
  type YearN,
  type Cycle,
  type Lesson,
} from "./content/curriculum";
import { Icon, type IconName } from "@sprout/icons";
import { Speaker, stop as stopSpeech } from "@sprout/ui";
import { site } from "./site-config";
import { Mascot } from "./Mascot";
import { CommandCenter } from "./CommandCenter";
import { AchievementsPanel } from "./Achievements";
import { SimuladoLauncher } from "./Simulado";
import { splitLesson } from "./lesson-content";
import { Stars, ProgressBar, yearStats, yearAllStats, subjectStats, sumStats, schoolStats, pctOf } from "./ui";

// The markdown renderer pulls in react-markdown + remark/rehype plugins + every
// interactive widget — heavy, and only needed on lesson/test screens. Lazy-load
// it so the home/year/subject screens (and first paint) stay lean.
const Markdown = lazy(() => import("./Markdown").then((m) => ({ default: m.Markdown })));

// "Diversão" pulls in <canvas> games + animation loops — heavy and only needed
// when the child opens the fun area, so lazy-load it to keep first paint lean.
const Diversao = lazy(() => import("./diversao/Diversao").then((m) => ({ default: m.Diversao })));

// "Academia dos Elementos" — the 2D meta-game (hero + missions). Lazy-loaded; it
// only matters once the child opens it, so it stays out of the first paint.
const Academia = lazy(() => import("./world/Academia").then((m) => ({ default: m.Academia })));
const Teia = lazy(() => import("./Teia").then((m) => ({ default: m.Teia })));

function LessonBody({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`lesson-body ${className}`.trim()}>
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
  estudo: "star",
  dicionario: "letters",
  verbos: "reading",
  paises: "map",
  cidadania: "heart",
  tic: "device",
  artistica: "palette",
  fisica: "body",
  // 2.º ciclo (5.º–6.º) subjects
  ciencias: "microscope",
  hgp: "scroll",
  "ed-visual": "brush",
  "ed-tecnologica": "gear",
  "ed-musical": "music",
};

const YEAR_STYLE: Record<YearN, { color: string; soft: string }> = {
  1: { color: "var(--subj-edm)", soft: "var(--subj-edm-soft)" },
  2: { color: "var(--subj-mat)", soft: "var(--subj-mat-soft)" },
  3: { color: "var(--subj-en)", soft: "var(--subj-en-soft)" },
  4: { color: "var(--accent)", soft: "var(--accent-soft)" },
  5: { color: "var(--subj-cn)", soft: "var(--subj-cn-soft)" },
  6: { color: "var(--subj-hgp)", soft: "var(--subj-hgp-soft)" },
};

// Per-lesson topic icons (all from @sprout/icons). Fallback: the subject icon.
const LESSON_ICON: Record<string, IconName> = {
  "mat-1-numeros-10": "abacus", "mat-1-numeros-20": "abacus", "mat-1-somar": "plusminus",
  "mat-1-formas": "shapes", "mat-1-tempo": "clock",
  "mat-1-comparar": "plusminus", "mat-1-ordinais": "trophy", "mat-1-dobro-metade": "fraction",
  "mat-2-tabuada": "times", "mat-2-numeros-100": "abacus", "mat-2-dinheiro": "coin", "mat-2-horas": "clock",
  "mat-2-tabuada-3-4-10": "times", "mat-2-par-impar": "abacus", "mat-2-solidos": "shapes", "mat-2-padroes": "shapes",
  "estudo-tabuadas": "times", "estudo-alfabeto": "letters", "estudo-numeros": "abacus", "estudo-dias-meses": "calendar",
  "estudo-dinheiro": "coin", "estudo-loja": "cart",
  "estudo-pontuacao": "quote", "estudo-classes": "tag", "estudo-verbos": "clock", "estudo-formas": "shapes",
  "estudo-medidas": "ruler", "estudo-formulas": "math", "estudo-romanos": "scroll", "estudo-planetas": "planet",
  "estudo-continentes": "world", "estudo-pontos-cardeais": "compass", "estudo-datas": "castle", "estudo-distritos": "map",
  "pt-1-ditongos": "speaker", "pt-2-ordem-alfabetica": "letters", "pt-3-discurso-direto": "quote",
  "pt-3-aumentativo-diminutivo": "letters", "pt-4-adverbios": "tag", "pt-4-sujeito-predicado": "tag",
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
  "paises-pt-pais": "map", "paises-pt-bandeira": "flag", "paises-pt-hino": "quote",
  "paises-pt-comida": "apple", "paises-pt-natureza": "paw", "paises-pt-curiosidades": "sparkle",
  "paises-ca-pais": "map", "paises-ca-bandeira": "flag", "paises-ca-hino": "quote",
  "paises-ca-comida": "apple", "paises-ca-natureza": "paw", "paises-ca-curiosidades": "sparkle",
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

// "Saber de cor" topics by id — the "Treinar" page groups them into categories
// (site.estudo.categories), each listing topic ids it should show.
const estudoById = new Map(estudoTopics.map((t) => [t.id, t] as const));

export function App() {
  return (
    <ProgressProvider>
      <Root />
    </ProgressProvider>
  );
}

function Root() {
  const [theme, setTheme] = useState<"light" | "dark">(loadTheme);
  // A URL hash (e.g. `#/ano/3/mat/folha-calculo`) wins over stored state, so a
  // shared/bookmarked link opens straight to that page.
  const [view, setView] = useState<View>(() => viewFromHash(window.location.hash) ?? loadView());
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

  // A dictionary-word result in the command center opens the letter page and
  // asks to focus one word card. We capture the target id, then — once the new
  // page has rendered — scroll that card into view and pulse it. The rAF loop
  // retries until the card mounts (and runs after the scroll-to-top above).
  const focusWordRef = useRef<string | null>(null);
  useEffect(() => {
    const onFocus = (e: Event) => { focusWordRef.current = (e as CustomEvent<{ id?: string }>).detail?.id ?? null; };
    window.addEventListener("sprout:focusword", onFocus);
    return () => window.removeEventListener("sprout:focusword", onFocus);
  }, []);
  useEffect(() => {
    const id = focusWordRef.current;
    if (!id) return;
    focusWordRef.current = null;
    // The letter page can carry 200+ cards and renders a beat after the view
    // switches, so we wait for the card to appear (MutationObserver) rather
    // than guessing a frame budget. Scroll it to the middle and pulse it once.
    let done = false;
    const focus = () => {
      const el = document.getElementById(id);
      if (!el || done) return !!el;
      done = true;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("is-focus");
      window.setTimeout(() => el.classList.remove("is-focus"), 2200);
      return true;
    };
    if (focus()) return;
    const obs = new MutationObserver(() => { if (focus()) obs.disconnect(); });
    obs.observe(document.body, { childList: true, subtree: true });
    const stop = window.setTimeout(() => obs.disconnect(), 6000);
    return () => { obs.disconnect(); window.clearTimeout(stop); };
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

  // Forward navigation writes the URL hash, which pushes a browser-history entry
  // and fires `hashchange` — the single place the view state updates. So the
  // device/mouse Back/Forward walk the in-app screens, and the address bar
  // always matches the current page (shareable/bookmarkable).
  const go = (v: View) => {
    closeOverlays();
    const hash = viewToHash(v);
    // Re-selecting the current page won't fire `hashchange`; update directly.
    if (hash === window.location.hash) setView(v);
    else window.location.hash = hash;
  };
  // The in-app back arrow uses the same history stack as the browser/mouse Back,
  // so they agree: go to the previous screen (hashchange restores it).
  const back = () => window.history.back();

  // Open a lesson by id alone (used by "recently seen" and the "Treinar" cards),
  // resolving its year/subject from the lesson registry.
  const openLesson = (lessonId: string) => {
    const m = lessonMeta.get(lessonId);
    if (m) go({ kind: "lesson", year: m.year, subjectId: m.subjectId, lessonId });
  };

  // Seed history (so a deep view opened from a shared link still has "home"
  // beneath it, and Back never leaves the app on the first hop), then follow the
  // hash — in-app nav, Back/Forward, and manually edited URLs all flow through
  // `hashchange`, keeping the address bar and the screen in sync.
  const seeded = useRef(false);
  useEffect(() => {
    if (!seeded.current) {
      seeded.current = true;
      if (view.kind !== "home") {
        window.history.replaceState(null, "", "#/");
        window.history.pushState(null, "", viewToHash(view));
      }
    }
    const onHash = () => {
      closeOverlays();
      setView(viewFromHash(window.location.hash) ?? { kind: "home" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // In-lesson links navigate within the app instead of reloading the page:
  // `[texto](lesson:<id>)` opens another lesson; `[texto](subject:<id>)` opens a
  // subject/area overview (e.g. the "Os Verbos" conjugator grid). Markdown
  // dispatches this event so it doesn't need the navigation function threaded down.
  useEffect(() => {
    const onNavigate = (e: Event) => {
      const { lessonId, subjectId } = (e as CustomEvent<{ lessonId?: string; subjectId?: string }>).detail ?? {};
      if (lessonId) {
        const m = lessonMeta.get(lessonId);
        if (m) go({ kind: "lesson", year: m.year, subjectId: m.subjectId, lessonId });
      } else if (subjectId) {
        const subject = subjectById.get(subjectId);
        if (subject) {
          // Land on the first year that actually has lessons (year 1 for the
          // grade-less areas like "Os Verbos").
          const year = YEARS.find((y) => subject.years[y].length > 0) ?? 1;
          go({ kind: "subject", year, subjectId });
        }
      }
    };
    window.addEventListener("sprout:navigate", onNavigate);
    return () => window.removeEventListener("sprout:navigate", onNavigate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            onOpenArea={(area) => go({ kind: "area", area })}
            onOpenDiversao={() => go({ kind: "diversao" })}
            onOpenAcademia={() => go({ kind: "academia" })}
            onOpenTeia={() => go({ kind: "teia" })}
            onOpenLesson={openLesson}
          />
        )}
        {view.kind === "area" && view.area === "escola" && (
          <EscolaView onPick={(year) => go({ kind: "year", year })} />
        )}
        {view.kind === "area" && view.area === "treinar" && <TreinarView onOpenLesson={openLesson} />}
        {view.kind === "area" && view.area === "explorar" && (
          <ExplorarView
            onPickRing={(ring) => go({ kind: "subject", year: ring, subjectId: mundoSubject.id })}
            onOpenMundo={() => go({ kind: "mundo" })}
            onPickCountry={(tier) => go({ kind: "subject", year: tier, subjectId: paisesSubject.id })}
          />
        )}
        {view.kind === "area" && view.area === "biblioteca" && (
          <BibliotecaView
            onOpenDicionario={() => go({ kind: "subject", year: 1, subjectId: dicionarioSubject.id })}
            onOpenVerbos={() => go({ kind: "subject", year: 1, subjectId: verbosSubject.id })}
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
        {view.kind === "diversao" && (
          <Suspense fallback={<div className="lesson-loading">A preparar a diversão…</div>}>
            <Diversao room={view.room} onOpenRoom={(room) => go({ kind: "diversao", room })} />
          </Suspense>
        )}
        {view.kind === "academia" && (
          <Suspense fallback={<div className="lesson-loading">A preparar a Academia…</div>}>
            <Academia onGo={go} />
          </Suspense>
        )}
        {view.kind === "teia" && (
          <Suspense fallback={<div className="lesson-loading">A preparar a teia…</div>}>
            <Teia onGo={go} />
          </Suspense>
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
            {view.kind === "area" ? (
              // A top-level home area (Escola / Treinar / Explorar / Biblioteca).
              (() => {
                const a = site.areas.items.find((i) => i.id === view.area);
                return a ? (
                  <span style={{ color: `var(${a.accent})`, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Icon name={a.icon as IconName} size={18} /> {a.label}
                  </span>
                ) : null;
              })()
            ) : view.kind === "diversao" ? (
              // "Diversão" hub, plus the room name when inside one (a link back).
              <>
                {view.room ? (
                  <button className="crumb-link" style={{ color: "var(--joy)" }} onClick={() => onGo({ kind: "diversao" })}>
                    <Icon name="sparkle" size={18} /> {site.diversao.sectionTitle}
                  </button>
                ) : (
                  <span style={{ color: "var(--joy)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Icon name="sparkle" size={18} /> {site.diversao.sectionTitle}
                  </span>
                )}
                {view.room && (
                  <>
                    <span className="sep">›</span>
                    <span className="ell">{site.diversao.rooms.find((r) => r.id === view.room)?.label ?? ""}</span>
                  </>
                )}
              </>
            ) : view.kind === "academia" ? (
              // The "Academia dos Elementos" meta-game.
              <span style={{ color: "var(--subj-en)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Icon name="bolt" size={18} /> {site.academia.sectionTitle}
              </span>
            ) : view.kind === "teia" ? (
              // "A Teia do Saber" — the knowledge web.
              <span style={{ color: "var(--subj-emus)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Icon name="atom" size={18} /> A Teia do Saber
              </span>
            ) : view.kind === "mundo" ? (
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
            ) : subject && isPaises(subject.id) ? (
              // "Países" — country profiles, never "X.º ano". Show the country
              // name (a link back to that country's lesson list when on a lesson).
              deeperThanSubject ? (
                <button className="crumb-link" style={{ color: subject.color }} onClick={() => onGo({ kind: "subject", year: view.year, subjectId: subject.id })}>
                  <Icon name={(paisesCountries.find((c) => c.tier === view.year)?.icon ?? SUBJECT_ICON[subject.id]) as IconName} size={18} />
                  {tierLabel(subject.id, view.year)}
                </button>
              ) : (
                <span style={{ color: subject.color, display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Icon name={(paisesCountries.find((c) => c.tier === view.year)?.icon ?? SUBJECT_ICON[subject.id]) as IconName} size={18} />
                  {tierLabel(subject.id, view.year)}
                </span>
              )
            ) : subject && (isEstudo(subject.id) || isDicionario(subject.id) || isVerbos(subject.id)) ? (
              // "Saber de cor" / "O Dicionário" / "Os Verbos" — grade-less areas,
              // never "X.º ano". Just the area name (a link back to its overview
              // when on a topic/letter).
              deeperThanSubject ? (
                <button className="crumb-link" style={{ color: subject.color }} onClick={() => onGo({ kind: "subject", year: view.year, subjectId: subject.id })}>
                  <Icon name={SUBJECT_ICON[subject.id]} size={18} /> {subject.label}
                </button>
              ) : (
                <span style={{ color: subject.color, display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Icon name={SUBJECT_ICON[subject.id]} size={18} /> {subject.label}
                </span>
              )
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
  say,
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
  /** what to read aloud for this card (the child can't read the title) */
  say?: string;
}) {
  // The card is itself a <button>, so the read-aloud control is a SIBLING in a
  // positioned wrapper (a button can't nest a button) and floats in the corner.
  return (
    <div className="card-slot" style={{ ["--c" as string]: color, ["--c-soft" as string]: colorSoft }}>
      <button className={`big-card lesson-card ${soon ? "soon" : ""}`} onClick={onClick}>
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
      {say && <Speaker text={say} className="card-speak" label={`Ouvir: ${title}`} size={18} />}
    </div>
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
  onRemove,
  onClear,
}: {
  history: string[];
  progress: ProgressMap;
  onOpen: (lessonId: string) => void;
  onRemove: (lessonId: string) => void;
  onClear: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const items = history.map((id) => lessonMeta.get(id) && { id, meta: lessonMeta.get(id)! }).filter(Boolean) as {
    id: string;
    meta: NonNullable<ReturnType<typeof lessonMeta.get>>;
  }[];
  // Editing only makes sense with items on screen; the section unmounts when the
  // list empties, so the toggle never lingers in an "editing but empty" state.
  if (items.length === 0) return null;

  return (
    <>
      <h2 className="section-title">
        <Icon name="clock" size={24} /> Visto recentemente
        <span className="recent-tools">
          {editing && (
            <button className="recent-tool recent-tool--danger" onClick={onClear}>
              <Icon name="trash" size={15} /> Limpar
            </button>
          )}
          <button
            className={`recent-tool ${editing ? "on" : ""}`}
            onClick={() => setEditing((e) => !e)}
            aria-label={editing ? "Concluir edição da lista" : "Editar a lista"}
          >
            <Icon name={editing ? "check" : "pencil"} size={15} />
            {editing ? "Concluir" : "Editar"}
          </button>
        </span>
      </h2>
      <div className="recent-row">
        {items.map(({ id, meta }) => {
          const tier = tierLabel(meta.subjectId, meta.year); // "" for the grade-less study area
          // In edit mode a tap removes the chip instead of opening it; the close
          // icon and red tint make the changed action obvious to a young child.
          return (
          <button
            key={id}
            className={`recent-chip ${editing ? "is-editing" : ""}`}
            style={{ ["--c" as string]: meta.color }}
            onClick={() => (editing ? onRemove(id) : onOpen(id))}
            aria-label={editing ? `Remover ${meta.title}` : undefined}
            title={editing ? `Remover ${meta.title}` : `${meta.title} · ${meta.subjectLabel}${tier ? ` · ${tier}` : ""}`}
          >
            <span className="recent-chip__icon" style={{ color: meta.color }}>
              <Icon name={lessonIconById(meta.subjectId, id)} size={18} />
            </span>
            <span className="recent-chip__title">{meta.title}</span>
            {editing ? (
              <Icon name="close" size={15} className="recent-chip__x" />
            ) : (
              progress[id]?.done && (
                <Icon name="star" size={13} fill="currentColor" style={{ color: "var(--warn)", flexShrink: 0 }} />
              )
            )}
          </button>
          );
        })}
      </div>
    </>
  );
}

/* ---------------- home: pick an area ---------------- */

// The home is a short grid of top-level AREAS (not one long list of every
// section). Academia stays the hero above. Each area card opens its own page
// (the *View components below). Progress rolls up where the area holds graded
// lessons (Escola, Explorar); Treinar/Biblioteca/Diversão just show a blurb.
function Home({
  onOpenArea,
  onOpenDiversao,
  onOpenAcademia,
  onOpenTeia,
  onOpenLesson,
}: {
  onOpenArea: (area: AreaId) => void;
  onOpenDiversao: () => void;
  onOpenAcademia: () => void;
  onOpenTeia: () => void;
  onOpenLesson: (lessonId: string) => void;
}) {
  const { progress, history, totalStars, removeSeen, clearHistory } = useProgress();
  const greeting =
    totalStars === 0
      ? `Olá! Eu sou o ${site.mascot.name}. Por onde queres começar?`
      : `Boa! Já tens ${totalStars} estrela${totalStars === 1 ? "" : "s"}! Escolhe uma área para continuar.`;

  return (
    <div>
      <Mascot message={greeting} mood={totalStars > 0 ? "cheer" : "happy"} />

      <RecentlySeen history={history} progress={progress} onOpen={onOpenLesson} onRemove={removeSeen} onClear={clearHistory} />

      {/* "Academia dos Elementos" — the 2D meta-game (the hook): create an
          elemental hero, then real lessons/tests earn XP, coins and missions.
          Stays the hero at the top — it's the reason to come back and study. */}
      <h2 className="section-title">
        <span style={{ color: "var(--subj-en)", display: "inline-flex" }}>
          <Icon name="bolt" size={26} />
        </span>
        {site.academia.sectionTitle}
      </h2>
      <p className="section-sub">{site.academia.sectionSub}</p>
      <div className="card-grid">
        <BigCard
          iconName="bolt"
          kicker="Aventura"
          title={site.academia.cardTitle}
          color="var(--subj-en)"
          colorSoft="var(--subj-en-soft)"
          sub={<span className="sub">{site.academia.cardBlurb}</span>}
          say={`${site.academia.cardTitle}. ${site.academia.cardBlurb}`}
          onClick={onOpenAcademia}
        />
      </div>

      {/* The areas: Escola, Treinar, Explorar, Biblioteca, Diversão. Copy/icons
          /colours come from site.areas; each opens its page (or the Diversão
          hub). This is the whole point of the refactor — one tidy entry grid. */}
      <h2 className="section-title" style={{ marginTop: 36 }}>
        <Icon name="grid" size={26} /> {site.areas.sectionTitle}
      </h2>
      <p className="section-sub">{site.areas.sectionSub}</p>
      <div className="card-grid cols-3">
        {site.areas.items.map((a) => {
          // Roll up progress where the area holds graded lessons.
          const st =
            a.id === "escola"
              ? schoolStats(progress)
              : a.id === "explorar"
                ? sumStats([subjectStats(progress, mundoSubject), subjectStats(progress, paisesSubject)])
                : null;
          return (
            <BigCard
              key={a.id}
              iconName={a.icon as IconName}
              kicker="Área"
              title={a.label}
              color={`var(${a.accent})`}
              colorSoft={`var(${a.accent}-soft)`}
              sub={<span className="sub">{a.blurb}</span>}
              say={`${a.label}. ${a.blurb}`}
              onClick={() => (a.id === "diversao" ? onOpenDiversao() : a.id === "teia" ? onOpenTeia() : onOpenArea(a.id as AreaId))}
            >
              {st && st.real > 0 && (
                <CardProgress pct={pctOf(st)} done={st.done} real={st.real} stars={st.stars} color={`var(${a.accent})`} />
              )}
            </BigCard>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- area: Escola (years 1.º–6.º) ---------------- */

function EscolaView({ onPick }: { onPick: (year: YearN) => void }) {
  const { progress } = useProgress();
  return (
    <div>
      <Mascot message="Escola! Em que ano andas? Toca no teu ano para veres as matérias." mood="happy" />
      <h2 className="section-title"><Icon name="reading" size={26} /> Escolhe o teu ano</h2>
      {([1, 2] as Cycle[]).map((cycle) => (
        <div key={cycle} className="cycle-block">
          <p className="cycle-label">{CYCLE_LABEL[cycle]}</p>
          <div className={`card-grid ${cycle === 1 ? "cols-4" : ""}`}>
            {CYCLE_YEARS[cycle].map((y) => {
              const st = yearAllStats(progress, y);
              const s = YEAR_STYLE[y];
              const nSubj = subjectsForYear(y).length;
              return (
                <BigCard
                  key={y}
                  numberLabel={`${y}`}
                  kicker="Ano"
                  title={yearLabel(y)}
                  color={s.color}
                  colorSoft={s.soft}
                  sub={<span className="sub">{nSubj} matérias para explorar</span>}
                  say={`${yearLabel(y)}. ${nSubj} matérias para explorar.`}
                  onClick={() => onPick(y)}
                >
                  <CardProgress pct={pctOf(st)} done={st.done} real={st.real} stars={st.stars} color={s.color} />
                </BigCard>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- area: Treinar ("Saber de cor", grouped) ---------------- */

// The "Saber de cor" topics, grouped by the categories in site.estudo. One big
// flat grid became hard to scan, so each category is its own labelled block.
function TreinarView({ onOpenLesson }: { onOpenLesson: (lessonId: string) => void }) {
  return (
    <div>
      <Mascot message={`${site.estudo.sectionTitle}. Escolhe um tema para ouvires e treinares!`} mood="happy" />
      {site.estudo.categories.map((cat, i) => (
        <div key={cat.label}>
          <h2 className="section-title" style={i > 0 ? { marginTop: 32 } : undefined}>
            <span style={{ color: estudoSubject.color, display: "inline-flex" }}>
              <Icon name={cat.icon as IconName} size={26} />
            </span>
            {cat.label}
          </h2>
          <div className="card-grid cols-4">
            {cat.topics.map((id) => {
              const t = estudoById.get(id);
              if (!t) return null;
              return (
                <BigCard
                  key={id}
                  iconName={lessonIcon(estudoSubject.id, t)}
                  kicker="Saber de cor"
                  title={t.title}
                  color={estudoSubject.color}
                  colorSoft={estudoSubject.colorSoft}
                  sub={<span className="sub">Toca para ouvir e treinar</span>}
                  say={t.title}
                  onClick={() => onOpenLesson(id)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- area: Explorar (O Mundo + Países) ---------------- */

function ExplorarView({
  onPickRing,
  onOpenMundo,
  onPickCountry,
}: {
  onPickRing: (ring: YearN) => void;
  onOpenMundo: () => void;
  onPickCountry: (tier: YearN) => void;
}) {
  const { progress } = useProgress();
  return (
    <div>
      <Mascot message="Vamos explorar! Dos Açores ao mundo inteiro — e conhecer países de cima a baixo." mood="happy" />

      {/* "O Mundo" — Açores and Portugal up front; the wider world one tap in. */}
      <h2 className="section-title">
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
              say={`${r.label}. ${r.blurb}.`}
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
          say={`${MUNDO_BEYOND.label}. ${MUNDO_BEYOND.blurb}.`}
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

      {/* "Países" — one card per country; each opens its parallel lessons. */}
      <h2 className="section-title" style={{ marginTop: 36 }}>
        <span style={{ color: paisesSubject.color, display: "inline-flex" }}>
          <Icon name={SUBJECT_ICON[paisesSubject.id]} size={26} />
        </span>
        {site.paises.sectionTitle}
      </h2>
      <p className="section-sub">{site.paises.sectionSub}</p>
      <div className="card-grid">
        {paisesCountries.map((c) => {
          const st = yearStats(progress, paisesSubject, c.tier);
          return (
            <BigCard
              key={c.tier}
              iconName={c.icon as IconName}
              kicker="Países"
              title={c.label}
              color={paisesSubject.color}
              colorSoft={paisesSubject.colorSoft}
              sub={<span className="sub">{c.blurb}</span>}
              say={`${c.label}. ${c.blurb}.`}
              onClick={() => onPickCountry(c.tier)}
            >
              <CardProgress pct={pctOf(st)} done={st.done} real={st.real} stars={st.stars} color={paisesSubject.color} />
            </BigCard>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- area: Biblioteca (O Dicionário) ---------------- */

function BibliotecaView({ onOpenDicionario, onOpenVerbos }: { onOpenDicionario: () => void; onOpenVerbos: () => void }) {
  const area = site.areas.items.find((i) => i.id === "biblioteca");
  return (
    <div>
      <Mascot message="A Biblioteca! O dicionário diz o que as palavras significam, os verbos mostram como mudam. Escolhe!" mood="happy" />
      <h2 className="section-title">
        <span style={{ color: dicionarioSubject.color, display: "inline-flex" }}>
          <Icon name={(area?.icon as IconName) ?? "letters"} size={26} />
        </span>
        Biblioteca
      </h2>
      <p className="section-sub">{area?.blurb}</p>
      <div className="card-grid">
        <BigCard
          iconName={SUBJECT_ICON[dicionarioSubject.id]}
          kicker="Dicionário"
          title="As palavras de A a Z"
          color={dicionarioSubject.color}
          colorSoft={dicionarioSubject.colorSoft}
          sub={<span className="sub">Escolhe uma letra para veres o que as palavras significam</span>}
          say="O Dicionário. Escolhe uma letra para veres o que as palavras significam."
          onClick={onOpenDicionario}
        />
        <BigCard
          iconName={SUBJECT_ICON[verbosSubject.id]}
          kicker="Verbos"
          title="Os verbos de A a Z"
          color={verbosSubject.color}
          colorSoft={verbosSubject.colorSoft}
          sub={<span className="sub">Escolhe uma letra e toca num verbo para o conjugares</span>}
          say="Os Verbos. Escolhe uma letra e toca num verbo para o conjugares e ouvires."
          onClick={onOpenVerbos}
        />
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
              say={`${r.label}. ${r.blurb}.`}
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
        {subjectsForYear(year).map((s) => {
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
              say={`${s.label}. ${s.blurb}.`}
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
  const tier = tierLabel(subject.id, year); // "" for the grade-less study area
  const verbs = isVerbos(subject.id);
  // Both halves of the Biblioteca (dictionary + verbs) show one big-letter card
  // per letter instead of the usual topic icons.
  const dict = isDicionario(subject.id) || verbs;
  const mascotMsg = verbs
    ? `${subject.label}. Escolhe uma letra e toca num verbo para o conjugares!`
    : dict
    ? `${subject.label}. Escolhe uma letra para veres o que as palavras significam!`
    : `${subject.label}${tier ? ` • ${tier}` : ""}. Escolhe uma lição para começar!`;
  return (
    <div>
      <Mascot message={mascotMsg} mood="happy" />
      <h2 className="section-title">
        <span style={{ color: subject.color, display: "inline-flex" }}><Icon name={SUBJECT_ICON[subject.id]} size={26} /></span>
        {subject.label}
        {tier && <span style={{ color: "var(--ink-3)", fontWeight: 500 }}> · {tier}</span>}
      </h2>
      {/* The dictionary shows one big-letter card per letter (like the year
          cards); school/study lessons show their topic icon. */}
      <div className={`card-grid ${dict ? "cols-4" : "cols-3"}`}>
        {lessons.map((l) => {
          const p = progress[l.id];
          const soon = !l.body;
          return (
            <BigCard
              key={l.id}
              iconName={dict ? undefined : lessonIcon(subject.id, l)}
              numberLabel={dict ? l.title : undefined}
              kicker={dict ? "Letra" : subject.label}
              title={dict ? `Letra ${l.title}` : l.title}
              color={subject.color}
              colorSoft={subject.colorSoft}
              soon={soon}
              say={dict ? `Letra ${l.title}.` : `${l.title}.${soon ? " Em breve." : ""}`}
              onClick={() => onPick(l.id)}
              sub={
                dict ? (
                  <span className="sub">{verbs ? "Toca para conjugar ›" : "Toca para ver as palavras ›"}</span>
                ) : soon ? (
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

      {/* "Try it out": a mixed mock test across this matéria (school subjects,
          "O Mundo" and "Países"). Self-hides where there are no quizzes. */}
      <SimuladoLauncher subject={subject} year={year} />
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

        <LessonBody className="test-body">{test}</LessonBody>

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
            {subjectsForYear(y).map((s) => (
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
