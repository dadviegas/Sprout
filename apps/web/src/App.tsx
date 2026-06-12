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
  isVerbos,
  isEnciclopedia,
  isCores,
  isAtlas,
  enciclopediaSubjects,
  coresSubject,
  atlasSubject,
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
import { Icon, SUBJECT_ICONS, lessonIconName, type IconName } from "@sprout/icons";
import { Speaker, stop as stopSpeech } from "@sprout/ui";
import { site, readingCategory } from "./site-config";
import { curiosidadeOfDay } from "./content/curiosidades";
import { bibliotecaMedals, recommendedArticles, missoesState } from "./biblioteca";
import { Mascot } from "./Mascot";
import { CommandCenter } from "./CommandCenter";
import { AchievementsPanel } from "./Achievements";
import { ParentPage, WipeModal, tabletMinutesToday } from "./ParentArea";
import { Plano } from "./study/Plano";
import { PlanoCompleto } from "./study/PlanoCompleto";
import { ReviewRunner } from "./study/ReviewRunner";
import { initSessionTracking, trackView, noteScroll } from "./study/sessions";
import { isRestDay } from "./study/plan";
import { SimuladoLauncher } from "./Simulado";
import { splitLesson, lessonMinutes } from "./lesson-content";
import { Stars, ProgressBar, YEAR_STYLE, yearStats, yearAllStats, subjectStats, sumStats, schoolStats, pctOf } from "./ui";
import { loadUiPrefs, saveUiPrefs, preReaderActive } from "./ui-prefs";

// The markdown renderer pulls in react-markdown + remark/rehype plugins + every
// interactive widget — heavy, and only needed on lesson/test screens. Lazy-load
// it so the home/year/subject screens (and first paint) stay lean.
const Markdown = lazy(() => import("./Markdown").then((m) => ({ default: m.Markdown })));

// "Diversão" pulls in <canvas> games + animation loops — heavy and only needed
// when the child opens the fun area, so lazy-load it to keep first paint lean.
const Diversao = lazy(() => import("./diversao/Diversao").then((m) => ({ default: m.Diversao })));

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

const SUBJECT_ICON = SUBJECT_ICONS;

const lessonIconById = (subjectId: string, lessonId: string): IconName => lessonIconName(subjectId, lessonId);
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
  // The cog opens a small settings menu; from it the parents' page (#/pais,
  // gated on entry) and the math-gated "Limpar tudo" modal.
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [wipe, setWipe] = useState(false);

  // Study-session tracking (study/sessions.ts): visibility/exit listeners once,
  // then map every navigation to an open/closed session.
  useEffect(() => {
    initSessionTracking();
  }, []);
  useEffect(() => {
    trackView(view);
  }, [view]);

  // The theme attribute lives on <html> (set before first render in index.tsx)
  // so toggling repaints the whole page immediately — keeping it on a nested
  // div left the current view stale until the next navigation re-render.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    store.set(THEME_KEY, theme);
  }, [theme]);
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
    setSettingsOpen(false);
    setWipe(false);
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
    <div className="sprout-root sprout-scroll" data-density="comfy">
      <div className="blobs" aria-hidden="true">
        <span className="blob b1" /><span className="blob b2" /><span className="blob b3" />
      </div>
      <div className="shell">
        <TopBar view={view} onBack={back} onHome={() => go({ kind: "home" })} onMundo={() => go({ kind: "mundo" })} onGo={go} onIndex={() => setDrawer(true)} onSearch={() => setPalette(true)} onAchievements={() => setAchievements(true)} onSettings={() => setSettingsOpen(true)} />

        {view.kind === "home" && (
          <Home
            onOpenArea={(area) => go({ kind: "area", area })}
            onOpenDiversao={() => go({ kind: "diversao" })}
            onOpenTeia={() => go({ kind: "teia" })}
            onOpenLesson={openLesson}
            onOpenPlano={() => go({ kind: "plano" })}
          />
        )}
        {view.kind === "plano" && <Plano onGo={go} />}
        {view.kind === "plano-completo" && <PlanoCompleto onGo={go} />}
        {view.kind === "review" && <ReviewRunner onGo={go} />}
        {view.kind === "pais" && <ParentPage />}
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
          <BibliotecaView onOpenSubject={(subjectId) => go({ kind: "subject", year: 1, subjectId })} />
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
        {view.kind === "teia" && (
          <Suspense fallback={<div className="lesson-loading">A preparar a teia…</div>}>
            <Teia onGo={go} />
          </Suspense>
        )}
      </div>

      {drawer && <IndexDrawer onClose={() => setDrawer(false)} onGo={go} />}
      {palette && <CommandCenter onClose={() => setPalette(false)} onGo={go} />}
      {achievements && <AchievementsPanel onClose={() => setAchievements(false)} />}
      {settingsOpen && (
        <SettingsMenu
          onClose={() => setSettingsOpen(false)}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          onOpenParent={() => go({ kind: "pais" })}
          onOpenWipe={() => { setSettingsOpen(false); setWipe(true); }}
        />
      )}
      {wipe && <WipeModal onClose={() => setWipe(false)} />}
    </div>
  );
}

/* ---------------- top bar ---------------- */

/* Breadcrumb chip — the subject/area NAME on its accent-soft background, so the
 * crumb carries the page's identity instead of a tiny icon-only hint. Renders
 * as a button when it links to an ancestor, as a plain chip when it IS the
 * page. (On phones the label collapses to the icon — see kids.css.) */
function CrumbChip({
  icon,
  label,
  color,
  colorSoft,
  onClick,
}: {
  icon: IconName;
  label: string;
  color: string;
  colorSoft: string;
  onClick?: () => void;
}) {
  const style = { ["--c" as string]: color, ["--c-soft" as string]: colorSoft };
  const body = (
    <>
      <Icon name={icon} size={18} duo />
      <span className="crumb-tx">{label}</span>
    </>
  );
  return onClick ? (
    <button className="crumb-chip" style={style} onClick={onClick} aria-label={label}>
      {body}
    </button>
  ) : (
    <span className="crumb-chip" style={style}>{body}</span>
  );
}

function TopBar({
  view,
  onBack,
  onHome,
  onMundo,
  onGo,
  onIndex,
  onSearch,
  onAchievements,
  onSettings,
}: {
  view: View;
  onBack: () => void;
  onHome: () => void;
  onMundo: () => void;
  onGo: (v: View) => void;
  onIndex: () => void;
  onSearch: () => void;
  onAchievements: () => void;
  onSettings: () => void;
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
                  <CrumbChip icon={a.icon as IconName} label={a.label} color={`var(${a.accent})`} colorSoft={`var(${a.accent}-soft)`} />
                ) : null;
              })()
            ) : view.kind === "diversao" ? (
              // "Diversão" hub, plus the room name when inside one (a link back).
              <>
                <CrumbChip
                  icon="sparkle"
                  label={site.diversao.sectionTitle}
                  color="var(--joy)"
                  colorSoft="var(--joy-soft)"
                  onClick={view.room ? () => onGo({ kind: "diversao" }) : undefined}
                />
                {view.room && (
                  <>
                    <span className="sep">›</span>
                    <span className="ell">{site.diversao.rooms.find((r) => r.id === view.room)?.label ?? ""}</span>
                  </>
                )}
              </>
            ) : view.kind === "teia" ? (
              // "A Teia do Saber" — the knowledge web.
              <CrumbChip icon="atom" label="A Teia do Saber" color="var(--subj-en)" colorSoft="var(--subj-en-soft)" />
            ) : view.kind === "plano" || view.kind === "plano-completo" || view.kind === "review" ? (
              // "O meu plano" — daily missions + calendar; "Plano completo"
              // sits under it as a crumb hop.
              <>
                <CrumbChip
                  icon="calendar"
                  label="O meu plano"
                  color="var(--primary)"
                  colorSoft="var(--primary-soft)"
                  onClick={view.kind === "plano-completo" || view.kind === "review" ? () => onGo({ kind: "plano" }) : undefined}
                />
                {view.kind === "plano-completo" && (
                  <>
                    <span className="sep">›</span>
                    <span className="ell">Plano completo</span>
                  </>
                )}
                {view.kind === "review" && (
                  <>
                    <span className="sep">›</span>
                    <span className="ell">Revisão de erros</span>
                  </>
                )}
              </>
            ) : view.kind === "pais" ? (
              // The parents' page (math-gated on entry).
              <CrumbChip icon="gear" label="Área dos pais" color="var(--ink-2)" colorSoft="var(--surface-2)" />
            ) : view.kind === "mundo" ? (
              // The "Pelo mundo fora" overview itself.
              <CrumbChip icon={MUNDO_BEYOND.icon as IconName} label={MUNDO_BEYOND.label} color={mundoSubject.color} colorSoft={mundoSubject.colorSoft} />
            ) : subject && isMundo(subject.id) ? (
              // "O Mundo" lessons: ring name (never "X.º ano"). Wider-world rings
              // sit under the "Pelo mundo fora" entry, shown as a crumb hop.
              <>
                {!isMundoHomeRing(view.year) && (
                  <>
                    <button className="crumb-home" onClick={onMundo} style={{ color: mundoSubject.color, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Icon name={MUNDO_BEYOND.icon as IconName} size={16} /> <span className="crumb-tx">{MUNDO_BEYOND.label}</span>
                    </button>
                    <span className="sep">›</span>
                  </>
                )}
                <CrumbChip
                  icon={(mundoRings.find((r) => r.ring === view.year)?.icon ?? SUBJECT_ICON[subject.id]) as IconName}
                  label={tierLabel(subject.id, view.year)}
                  color={subject.color}
                  colorSoft={subject.colorSoft}
                  onClick={deeperThanSubject ? () => onGo({ kind: "subject", year: view.year, subjectId: subject.id }) : undefined}
                />
              </>
            ) : subject && isPaises(subject.id) ? (
              // "Países" — country profiles, never "X.º ano". Show the country
              // name (a link back to that country's lesson list when on a lesson).
              <CrumbChip
                icon={(paisesCountries.find((c) => c.tier === view.year)?.icon ?? SUBJECT_ICON[subject.id]) as IconName}
                label={tierLabel(subject.id, view.year)}
                color={subject.color}
                colorSoft={subject.colorSoft}
                onClick={deeperThanSubject ? () => onGo({ kind: "subject", year: view.year, subjectId: subject.id }) : undefined}
              />
            ) : subject && (isEstudo(subject.id) || isDicionario(subject.id) || isVerbos(subject.id) || isEnciclopedia(subject.id) || isCores(subject.id) || isAtlas(subject.id)) ? (
              // "Saber de cor" / "O Dicionário" / "Os Verbos" / Enciclopédia /
              // "As Cores" / "Atlas da Vida" — grade-less areas, never "X.º ano".
              // Just the area name (a link back to its overview when deeper in).
              <CrumbChip
                icon={SUBJECT_ICON[subject.id]}
                label={subject.label}
                color={subject.color}
                colorSoft={subject.colorSoft}
                onClick={deeperThanSubject ? () => onGo({ kind: "subject", year: view.year, subjectId: subject.id }) : undefined}
              />
            ) : (
              <>
                {deeperThanYear ? (
                  // The year is a redundant ancestor on phones (the grade shows
                  // in the page header) — hidden there with its trailing sep.
                  <button className="crumb-link crumb-year-link" onClick={() => onGo({ kind: "year", year: view.year })}>{yearLabel(view.year)}</button>
                ) : (
                  <span>{yearLabel(view.year)}</span>
                )}
                {subject && (
                  <>
                    <span className="sep crumb-year-sep">›</span>
                    <CrumbChip
                      icon={SUBJECT_ICON[subject.id]}
                      label={subject.label}
                      color={subject.color}
                      colorSoft={subject.colorSoft}
                      onClick={deeperThanSubject ? () => onGo({ kind: "subject", year: view.year, subjectId: subject.id }) : undefined}
                    />
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
                <CrumbChip icon="trophy" label="Teste" color="var(--warn)" colorSoft="var(--warn-soft)" />
              </>
            )}
          </>
        )}
      </div>

      <div className="topbar-actions">
        <button className="iconbtn" onClick={onSearch} aria-label="Procurar (Ctrl+K)" title="Procurar — Ctrl+K">
          <Icon name="search" size={22} />
        </button>
        <button className="stat-chip stat-chip--btn" onClick={onAchievements} title="As minhas conquistas" aria-label="Ver as minhas conquistas">
          <Icon name="star" size={18} fill="currentColor" style={{ color: "var(--warn)" }} /> {totalStars}
        </button>
        <button className="iconbtn" onClick={onIndex} aria-label="Índice / mapa das lições">
          <Icon name="map" size={22} />
        </button>
        <button className="iconbtn" onClick={onSettings} aria-label="Definições" title="Definições">
          <Icon name="gear" size={22} />
        </button>
      </div>
    </div>
  );
}

/* ---- settings menu (the cog) ---- *
 * A small top-right menu. The light/dark toggle lives here (it left the top bar
 * to make room on narrow screens), plus the parents' area and the math-gated
 * "Limpar tudo". Toggling the theme keeps the menu open so the change is seen. */
function SettingsMenu({
  onClose,
  theme,
  onToggleTheme,
  onOpenParent,
  onOpenWipe,
}: {
  onClose: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenParent: () => void;
  onOpenWipe: () => void;
}) {
  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="settings-menu" role="menu" aria-label="Definições">
        <button className="settings-item" role="menuitem" onClick={onToggleTheme}>
          <span className="settings-item__ic"><Icon name={theme === "light" ? "moon" : "sun"} size={20} /></span>
          <span className="settings-item__tx">
            <strong>{theme === "light" ? "Modo escuro" : "Modo claro"}</strong>
            <span>Mudar o aspeto da app</span>
          </span>
        </button>
        <button className="settings-item" role="menuitem" onClick={onOpenParent}>
          <span className="settings-item__ic"><Icon name="calendar" size={20} /></span>
          <span className="settings-item__tx">
            <strong>Área dos pais</strong>
            <span>Atividade e tempo de tablet</span>
          </span>
        </button>
        <button className="settings-item settings-item--danger" role="menuitem" onClick={onOpenWipe}>
          <span className="settings-item__ic"><Icon name="trash" size={20} /></span>
          <span className="settings-item__tx">
            <strong>Limpar tudo</strong>
            <span>Apagar todo o progresso</span>
          </span>
        </button>
      </div>
    </>
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
            {numberLabel ? numberLabel : iconName ? <Icon name={iconName} size={38} duo /> : null}
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
// chip is openable; ids whose lesson no longer exists are skipped. Collapsed by
// default (it grew long); the preference persists via the storage facade.
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
  const [open, setOpen] = useState(() => loadUiPrefs().recentOpen === true);
  const toggleOpen = () => {
    setEditing(false); // collapsing mid-edit would strand the edit state
    setOpen((o) => {
      const next = !o;
      saveUiPrefs({ recentOpen: next });
      return next;
    });
  };
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
          {open && editing && (
            <button className="recent-tool recent-tool--danger" onClick={onClear}>
              <Icon name="trash" size={15} /> Limpar
            </button>
          )}
          {open && (
            <button
              className={`recent-tool ${editing ? "on" : ""}`}
              onClick={() => setEditing((e) => !e)}
              aria-label={editing ? "Concluir edição da lista" : "Editar a lista"}
            >
              <Icon name={editing ? "check" : "pencil"} size={15} />
              {editing ? "Concluir" : "Editar"}
            </button>
          )}
          <button
            className="recent-tool"
            onClick={toggleOpen}
            aria-expanded={open}
            aria-label={open ? "Esconder a lista" : `Mostrar ${items.length} lições recentes`}
          >
            <Icon name={open ? "collapse" : "expand"} size={15} />
            {open ? "Esconder" : `Mostrar (${items.length})`}
          </button>
        </span>
      </h2>
      {open && (
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
      )}
    </>
  );
}

/* ---------------- home: pick an area ---------------- */

// The home is a short grid of top-level AREAS (not one long list of every
// section). Each area card opens its own page (the *View components below).
// Progress rolls up where the area holds graded lessons (Escola, Explorar);
// Treinar/Biblioteca/Diversão just show a blurb.
function Home({
  onOpenArea,
  onOpenDiversao,
  onOpenTeia,
  onOpenLesson,
  onOpenPlano,
}: {
  onOpenArea: (area: AreaId) => void;
  onOpenDiversao: () => void;
  onOpenTeia: () => void;
  onOpenLesson: (lessonId: string) => void;
  onOpenPlano: () => void;
}) {
  const { progress, achievements, history, totalStars, removeSeen, clearHistory } = useProgress();
  const greeting =
    totalStars === 0
      ? `Olá! Eu sou o ${site.mascot.name}. Por onde queres começar?`
      : `Boa! Já tens ${totalStars} estrela${totalStars === 1 ? "" : "s"}! Escolhe uma área para continuar.`;
  // When today's study goal is met, the child has earned tablet time — surface
  // it right under the greeting (same rule as the parents' area).
  const tabletToday = tabletMinutesToday(achievements, Date.now());

  return (
    <div>
      <Mascot message={greeting} mood={totalStars > 0 ? "cheer" : "happy"} />

      {/* "O meu plano de hoje" — the door to the daily missions + calendar. */}
      <div className="plan-banner">
        <button className="plan-banner__btn" onClick={onOpenPlano}>
          <span className="plan-banner__ic"><Icon name="calendar" size={24} duo /></span>
          <span className="plan-banner__tx">
            <strong>O meu plano de hoje</strong>
            <span>{isRestDay(Date.now()) ? "Domingo — dia de descanso!" : "As tuas missões de hoje — cerca de 30 minutos"}</span>
          </span>
          <Icon name="forward" size={20} />
        </button>
        <Speaker
          text={isRestDay(Date.now()) ? "O meu plano. Hoje é domingo, dia de descanso!" : "O meu plano de hoje. Toca para veres as tuas missões!"}
          className="plan-banner__say"
          size={18}
          label="Ouvir: o meu plano de hoje"
        />
      </div>

      {tabletToday > 0 && (
        <div className="home-reward">
          <span className="home-reward__ic"><Icon name="device" size={18} /></span>
          <span>Hoje já ganhaste <strong>{tabletToday} min</strong> de tempo!</span>
          <Speaker text={`Boa! Hoje já ganhaste ${tabletToday} minutos de tempo!`} className="home-reward__say" label="Ouvir" size={16} />
        </div>
      )}

      <RecentlySeen history={history} progress={progress} onOpen={onOpenLesson} onRemove={removeSeen} onClear={clearHistory} />

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
// "Aprender a ler" (readingCategory, always the first) is THE entry point for
// a pre-reader, so it leads the page as a featured hero tile in the Português
// colour; tapping the tile shows/hides its topic grid (open by default).
function TreinarView({ onOpenLesson }: { onOpenLesson: (lessonId: string) => void }) {
  const [lerOpen, setLerOpen] = useState(true);
  const lerSay = `${readingCategory.label} — começa aqui! Das letras às palavras, um degrau de cada vez.`;
  const topicCards = (ids: string[]) =>
    ids.map((id) => {
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
    });
  return (
    <div>
      <Mascot message={`${site.estudo.sectionTitle}. Escolhe um tema para ouvires e treinares!`} mood="happy" />
      <div className="treinar-hero">
        <button type="button" className="treinar-hero__btn" aria-expanded={lerOpen} onClick={() => setLerOpen((o) => !o)}>
          <span className="treinar-hero__ic"><Icon name={readingCategory.icon as IconName} size={32} duo /></span>
          <span className="treinar-hero__tx">
            <strong>{readingCategory.label} — começa aqui</strong>
            <span>Das letras às palavras, um degrau de cada vez.</span>
          </span>
          <span className="treinar-hero__arrow" data-open={lerOpen || undefined}><Icon name="arrowRight" size={22} /></span>
        </button>
        <Speaker className="treinar-hero__say" text={lerSay} />
      </div>
      {lerOpen && <div className="card-grid cols-4">{topicCards(readingCategory.topics)}</div>}
      {site.estudo.categories.slice(1).map((cat) => (
        <div key={cat.label}>
          <h2 className="section-title" style={{ marginTop: 32 }}>
            <span style={{ color: estudoSubject.color, display: "inline-flex" }}>
              <Icon name={cat.icon as IconName} size={26} duo />
            </span>
            {cat.label}
          </h2>
          <div className="card-grid cols-4">{topicCards(cat.topics)}</div>
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
          <Icon name={SUBJECT_ICON[mundoSubject.id]} size={26} duo />
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
          <Icon name={SUBJECT_ICON[paisesSubject.id]} size={26} duo />
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

/* ---------------- area: Biblioteca (descobrir + dicionário) ---------------- */

// "Curiosidade do Dia" — one fun fact at the top of the Biblioteca, the same all
// day, changing at midnight (deterministic; see content/curiosidades.ts). Speaks
// only on the speaker tap; "saber mais" opens the related article via the global
// navigate event the markdown links already use.
function CuriosidadeDoDia() {
  const c = curiosidadeOfDay(new Date());
  const say = `Curiosidade do dia. ${c.say ?? c.text}`;
  return (
    <div className="biblio-curio">
      <span className="biblio-curio__emoji" aria-hidden>{c.emoji}</span>
      <div className="biblio-curio__body">
        <span className="biblio-curio__label"><Icon name="tip" size={14} /> Curiosidade do dia</span>
        <p className="biblio-curio__text">{c.text}</p>
        {c.lessonId && (
          <button
            className="biblio-curio__more"
            onClick={() => window.dispatchEvent(new CustomEvent("sprout:navigate", { detail: { lessonId: c.lessonId } }))}
          >
            Saber mais <Icon name="forward" size={14} />
          </button>
        )}
      </div>
      <Speaker text={say} className="biblio-curio__speak" label="Ouvir a curiosidade" />
    </div>
  );
}

function BibliotecaScene() {
  return (
    <div className="biblio-scene" aria-hidden="true">
      {/* slice (not meet): the scene COVERS the full card width instead of
          letterboxing as a centred strip on wide screens */}
      <svg className="biblio-scene__svg" viewBox="0 0 760 260" preserveAspectRatio="xMidYMid slice" role="img">
        <defs>
          <linearGradient id="biblio-sky" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fff7d7" />
            <stop offset=".44" stopColor="#d9f7ee" />
            <stop offset="1" stopColor="#e8ecff" />
          </linearGradient>
          <linearGradient id="biblio-globe" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#4cc9f0" />
            <stop offset="1" stopColor="#54c45f" />
          </linearGradient>
          <filter id="biblio-soft-shadow" x="-20%" y="-30%" width="140%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#244045" floodOpacity=".18" />
          </filter>
        </defs>
        <rect width="760" height="260" rx="28" fill="url(#biblio-sky)" />
        <path className="biblio-scene__path" d="M95 190 C190 128 265 230 362 156 S560 96 678 158" fill="none" stroke="#2e7d73" strokeWidth="5" strokeLinecap="round" strokeDasharray="10 14" opacity=".38" />
        <g className="biblio-scene__shelf" filter="url(#biblio-soft-shadow)">
          <rect x="90" y="89" width="224" height="142" rx="18" fill="#8f5a3b" />
          <rect x="107" y="111" width="190" height="16" rx="8" fill="#6d402b" opacity=".6" />
          <rect x="107" y="178" width="190" height="16" rx="8" fill="#6d402b" opacity=".55" />
          <rect x="126" y="66" width="35" height="95" rx="8" fill="#ffbc42" />
          <rect x="166" y="75" width="30" height="86" rx="8" fill="#ef476f" />
          <rect x="202" y="60" width="38" height="101" rx="8" fill="#06d6a0" />
          <rect x="247" y="82" width="34" height="79" rx="8" fill="#4d7cff" />
          <rect x="122" y="137" width="168" height="14" rx="7" fill="#f9f2df" opacity=".34" />
          <circle cx="278" cy="215" r="10" fill="#5d3424" opacity=".52" />
        </g>
        <g className="biblio-scene__globe" filter="url(#biblio-soft-shadow)">
          <circle cx="404" cy="126" r="55" fill="url(#biblio-globe)" />
          <path d="M366 111 C386 98 396 108 413 100 C428 93 445 98 455 114 C432 122 432 142 407 139 C388 137 383 124 366 111Z" fill="#f7f7de" opacity=".9" />
          <path d="M376 151 C395 146 407 157 424 150 C435 146 448 149 456 160 C437 175 406 183 382 166Z" fill="#f7f7de" opacity=".85" />
          <ellipse cx="404" cy="126" rx="72" ry="18" fill="none" stroke="#3b4b72" strokeWidth="5" opacity=".28" transform="rotate(-16 404 126)" />
          <path d="M404 181 L404 213" stroke="#3b4b72" strokeWidth="8" strokeLinecap="round" />
          <path d="M363 219 H445" stroke="#3b4b72" strokeWidth="10" strokeLinecap="round" />
        </g>
        <g className="biblio-scene__rocket" filter="url(#biblio-soft-shadow)">
          <path d="M575 88 C597 49 636 45 659 52 C662 76 648 111 609 128 L575 88Z" fill="#f7f7ff" />
          <path d="M643 57 C646 67 643 78 636 87 C626 77 616 68 603 61 C615 54 629 52 643 57Z" fill="#ef476f" />
          <circle cx="614" cy="88" r="14" fill="#77d7ff" stroke="#32415f" strokeWidth="5" />
          <path d="M580 96 L549 95 L566 122Z" fill="#4d7cff" />
          <path d="M602 123 L596 153 L626 133Z" fill="#4d7cff" />
          <path className="biblio-scene__flame" d="M559 124 C535 136 519 153 511 174 C533 166 553 153 572 132Z" fill="#ffbc42" />
        </g>
        <g className="biblio-scene__sparkles" fill="#ef476f">
          <path d="M501 55 l6 15 15 6 -15 6 -6 15 -6 -15 -15 -6 15 -6Z" />
          <path d="M690 110 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4Z" fill="#ffbc42" />
          <path d="M347 52 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4Z" fill="#4d7cff" />
        </g>
      </svg>
    </div>
  );
}

// "Recomendado para ti" — Enciclopédia articles linked (via the Teia) to what the
// child has been doing. Self-hides when there's nothing fresh to suggest.
function Recomendados() {
  const { progress, history } = useProgress();
  const recs = recommendedArticles(progress, history, 4);
  if (recs.length === 0) return null;
  return (
    <>
      <h2 className="section-title" style={{ marginTop: 8 }}>
        <span style={{ color: "var(--warn)", display: "inline-flex" }}><Icon name="star" size={24} /></span>
        Recomendado para ti
      </h2>
      <div className="biblio-recs biblio-recs--animated">
        {recs.map((r) => (
          <button
            key={r.id}
            className="rec-card"
            style={{ ["--c" as string]: r.meta.color }}
            onClick={() => window.dispatchEvent(new CustomEvent("sprout:navigate", { detail: { lessonId: r.id } }))}
          >
            <span className="rec-card__icon" style={{ color: r.meta.color }}><Icon name={lessonIconById(r.meta.subjectId, r.id)} size={22} /></span>
            <span className="rec-card__main">
              <span className="rec-card__title">{r.meta.title}</span>
              <span className="rec-card__reason">{r.reason}</span>
            </span>
            <Icon name="forward" size={16} />
          </button>
        ))}
      </div>
    </>
  );
}

// "Coleção de Medalhas" — derived badges (one per theme + catalogue + global
// tiers). Lit when earned; otherwise shows progress toward the goal.
function Medalhas() {
  const { progress } = useProgress();
  const medals = bibliotecaMedals(progress);
  const earned = medals.filter((m) => m.earned).length;
  return (
    <>
      <h2 className="section-title" style={{ marginTop: 36 }}>
        <span style={{ color: "var(--warn)", display: "inline-flex" }}><Icon name="trophy" size={26} /></span>
        Coleção de Medalhas
        <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: ".7em" }}> · {earned}/{medals.length}</span>
      </h2>
      <p className="section-sub">Ganha medalhas ao explorares a Biblioteca! 🏆</p>
      <div className="medal-grid">
        {medals.map((m) => (
          <div key={m.id} className={`medal-card ${m.earned ? "earned" : ""}`}>
            <span className="medal-card__badge"><Icon name={m.icon} size={26} /></span>
            <span className="medal-card__title">{m.title}</span>
            <span className="medal-card__desc">{m.desc}</span>
            <div className="medal-card__bar"><span style={{ width: `${Math.min(100, Math.round((m.have / m.need) * 100))}%` }} /></div>
            <span className="medal-card__count">
              {m.earned ? (<><Icon name="check" size={12} /> Conquistada!</>) : `${m.have}/${m.need}`}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

// "Continuar a aprender" — the Biblioteca articles the child saw most recently,
// so they can pick up where they left off. Derived from history + progress; self-
// hides until there's something to continue.
function ContinuarAprender() {
  const { progress, history } = useProgress();
  const isBiblio = (id: string) => id.startsWith("enc-") || id.startsWith("cores-") || id.startsWith("atlas-");
  const seen: string[] = [];
  for (const id of history) {
    if (seen.length >= 4) break;
    if (!isBiblio(id) || seen.includes(id) || !lessonMeta.has(id)) continue;
    seen.push(id);
  }
  if (seen.length === 0) return null;
  return (
    <>
      <h2 className="section-title" style={{ marginTop: 8 }}>
        <span style={{ color: "var(--primary)", display: "inline-flex" }}><Icon name="forward" size={24} /></span>
        Continuar a aprender
      </h2>
      <div className="biblio-recs">
        {seen.map((id) => {
          const meta = lessonMeta.get(id)!;
          const done = progress[id]?.done;
          return (
            <button
              key={id}
              className="rec-card"
              style={{ ["--c" as string]: meta.color }}
              onClick={() => window.dispatchEvent(new CustomEvent("sprout:navigate", { detail: { lessonId: id } }))}
            >
              <span className="rec-card__icon" style={{ color: meta.color }}><Icon name={lessonIconById(meta.subjectId, id)} size={22} /></span>
              <span className="rec-card__main">
                <span className="rec-card__title">{meta.title}</span>
                <span className="rec-card__reason">{done ? "Já completaste — toca para rever" : "Continua de onde ficaste"}</span>
              </span>
              <Icon name="forward" size={16} />
            </button>
          );
        })}
      </div>
    </>
  );
}

// "Missões" — guided journeys (percursos) through the Biblioteca; finishing one
// earns its cromo (sticker). Derived from progress (see biblioteca.ts). Tapping a
// card opens the next unread article in that mission.
function Missoes() {
  const { progress } = useProgress();
  const missoes = missoesState(progress);
  const doneCount = missoes.filter((m) => m.done).length;
  return (
    <>
      <h2 className="section-title" style={{ marginTop: 36 }}>
        <span style={{ color: "var(--subj-mundo)", display: "inline-flex" }}><Icon name="target" size={26} /></span>
        Missões
        <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: ".7em" }}> · {doneCount}/{missoes.length}</span>
      </h2>
      <p className="section-sub">Segue um percurso de artigos até ao fim e ganha um cromo! 🎯</p>
      <div className="missao-grid">
        {missoes.map((m) => (
          <div key={m.id} className={`missao-card ${m.done ? "done" : ""}`}>
            <div className="missao-card__top">
              <span className="missao-card__cromo" aria-hidden>
                {m.done ? <span className="missao-card__sticker">{m.emoji}</span> : <Icon name={m.icon} size={26} />}
              </span>
              <div className="missao-card__head">
                <span className="missao-card__title">{m.title}</span>
                <span className="missao-card__blurb">{m.blurb}</span>
              </div>
            </div>
            <div className="missao-card__steps" aria-label={`${m.have} de ${m.need} feitos`}>
              {m.stepsState.map((s) => (
                <span key={s.id} className={`missao-dot ${s.done ? "on" : ""}`} title={s.title} />
              ))}
            </div>
            <button
              className={`pill ${m.done ? "ghost" : ""} missao-card__go`}
              onClick={() => window.dispatchEvent(new CustomEvent("sprout:navigate", { detail: { lessonId: m.nextId } }))}
            >
              {m.done
                ? (<><Icon name="check" size={16} /> Concluída</>)
                : m.have === 0
                ? (<><Icon name="forward" size={16} /> Começar</>)
                : (<><Icon name="forward" size={16} /> Continuar · {m.have}/{m.need}</>)}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function BibliotecaView({ onOpenSubject }: { onOpenSubject: (subjectId: string) => void }) {
  const { progress } = useProgress();
  return (
    <div className="biblioteca-view">
      <Mascot message="Bem-vindo à Biblioteca! Descobre coisas do outro mundo, ou escolhe uma letra no dicionário." mood="happy" />

      <BibliotecaScene />

      <CuriosidadeDoDia />

      <ContinuarAprender />

      <Recomendados />

      {/* Descobrir — the Enciclopédia themes (Espaço, Dinossauros, …). */}
      <h2 className="section-title">
        <span style={{ color: "var(--subj-mundo)", display: "inline-flex" }}><Icon name="sparkle" size={26} duo /></span>
        Descobrir
      </h2>
      <p className="section-sub">Toca num tema e parte à descoberta — cada artigo tem som, imagens e um quiz! 🚀</p>
      <div className="card-grid cols-3 biblio-discover-grid">
        {enciclopediaSubjects.map((s) => {
          const st = yearStats(progress, s, 1);
          return (
            <BigCard
              key={s.id}
              iconName={SUBJECT_ICON[s.id]}
              kicker="Descobrir"
              title={s.label}
              color={s.color}
              colorSoft={s.colorSoft}
              sub={<span className="sub">{s.blurb}</span>}
              say={`${s.label}. ${s.blurb}`}
              onClick={() => onOpenSubject(s.id)}
            >
              {st.real > 0 && <CardProgress pct={pctOf(st)} done={st.done} real={st.real} stars={st.stars} color={s.color} />}
            </BigCard>
          );
        })}
      </div>

      {/* Coleções — catálogos para folhear: Cores, Atlas da Vida, Dicionário. */}
      <h2 className="section-title" style={{ marginTop: 36 }}>
        <span style={{ color: "var(--subj-pt)", display: "inline-flex" }}><Icon name="grid" size={26} duo /></span>
        Coleções
      </h2>
      <p className="section-sub">Catálogos para folhear, ouvir e descobrir — cores, seres vivos e palavras. 📚</p>
      <div className="card-grid cols-3 biblio-collections-grid">
        <BigCard
          iconName={SUBJECT_ICON[coresSubject.id]}
          kicker="Coleção"
          title={coresSubject.label}
          color={coresSubject.color}
          colorSoft={coresSubject.colorSoft}
          sub={<span className="sub">{coresSubject.blurb}</span>}
          say={`As Cores. ${coresSubject.blurb}`}
          onClick={() => onOpenSubject(coresSubject.id)}
        />
        <BigCard
          iconName={SUBJECT_ICON[atlasSubject.id]}
          kicker="Coleção"
          title={atlasSubject.label}
          color={atlasSubject.color}
          colorSoft={atlasSubject.colorSoft}
          sub={<span className="sub">{atlasSubject.blurb}</span>}
          say={`Atlas da Vida. ${atlasSubject.blurb}`}
          onClick={() => onOpenSubject(atlasSubject.id)}
        />
        <BigCard
          iconName={SUBJECT_ICON[dicionarioSubject.id]}
          kicker="Coleção"
          title="O Dicionário"
          color={dicionarioSubject.color}
          colorSoft={dicionarioSubject.colorSoft}
          sub={<span className="sub">As palavras e os verbos de A a Z</span>}
          say="O Dicionário. Escolhe uma letra para veres o que as palavras significam e para conjugares os verbos."
          onClick={() => onOpenSubject(dicionarioSubject.id)}
        />
      </div>

      <Missoes />

      <Medalhas />
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
          <Icon name={MUNDO_BEYOND.icon as IconName} size={26} duo />
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
    <div style={{ ["--acc" as string]: subject.color, ["--acc-soft" as string]: subject.colorSoft }}>
      <Mascot message={mascotMsg} mood="happy" />
      <h2 className="section-title">
        <span style={{ color: subject.color, display: "inline-flex" }}><Icon name={SUBJECT_ICON[subject.id]} size={26} duo /></span>
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
              say={dict ? `Letra ${l.title}.` : `${l.title}.${l.tag ? ` ${l.tag.replace(/[–-]/g, " a ")}.` : ""}${soon ? " Em breve." : ""}`}
              onClick={() => onPick(l.id)}
              sub={
                dict ? (
                  <span className="sub">{verbs ? "Toca para conjugar ›" : "Toca para ver as palavras ›"}</span>
                ) : (
                  <>
                    {/* a short factual label (e.g. a person's lifespan "1879–1955") */}
                    {l.tag && <span className="sub" style={{ display: "block", fontWeight: 700 }}>{l.tag}</span>}
                    {soon ? (
                      <span className="tag"><Icon name="lock" size={13} /> Em breve</span>
                    ) : (
                      <span className="chip-row">
                        <span className="chip-min">≈ {lessonMinutes(l.body ?? "")} min</span>
                        {p?.done && <Stars n={p.bestStars} />}
                      </span>
                    )}
                  </>
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

  // Reading tracking (PLANO-ESTUDO §4.1): record how far down the lesson the
  // child scrolled (max %), onto the open study session. Passive listener,
  // rAF-throttled; the first measure also runs in a rAF so the session tracker
  // (a PARENT effect, which runs after this child effect) has already started.
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!lesson.body) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = pageRef.current;
      if (!el || el.offsetHeight === 0) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const seen = window.scrollY + window.innerHeight - top;
      noteScroll((seen / el.offsetHeight) * 100, lesson.id);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    onScroll(); // a lesson that fits on one screen counts as fully seen
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [lesson.id, lesson.body]);

  const p = progress[lesson.id];

  // Subject accent for the whole lesson page — headings, summary, blockquotes
  // pick it up via var(--acc, …) in the CSS.
  const accStyle = { ["--acc" as string]: subject.color, ["--acc-soft" as string]: subject.colorSoft };

  if (!lesson.body) {
    return (
      <div className="sprout-fade-up" style={accStyle}>
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

  // Pre-reader mode (§4.10): bigger type + emphasized speakers via CSS, read
  // fresh on every render so the parents' toggle applies on the next visit.
  const preReader = preReaderActive(subject.id, year);

  return (
    <LessonContext.Provider value={lesson.id}>
      <div className={`sprout-fade-up${preReader ? " pre-reader" : ""}`} style={accStyle} ref={pageRef}>
        <LessonBody>{learn}</LessonBody>

        {test && (() => {
          // "A repetir": tried the final test but hasn't reached the 80% pass
          // mark yet (TEST_PASS_PCT in progress.tsx) — said with encouragement.
          const tried = !p?.done && (p?.bestPct ?? 0) > 0;
          return (
            <button
              className="test-cta"
              style={{ ["--c" as string]: subject.color }}
              onClick={() => onDoneNext({ kind: "test", year, subjectId: subject.id, lessonId: lesson.id })}
            >
              <span className="test-cta__icon"><Icon name="trophy" size={26} /></span>
              <span className="test-cta__text">
                <span className="test-cta__title">
                  {p?.done ? "Repetir o teste" : tried ? "Tentar outra vez" : "Fazer o teste"}
                  {p?.done && <Stars n={p.bestStars} />}
                </span>
                <span className="test-cta__sub">
                  {p?.done
                    ? "Já concluíste — tenta melhorar as estrelas!"
                    : tried
                      ? "Estás quase! Com 80% ou mais a lição fica concluída."
                      : "Mostra o que aprendeste e ganha estrelas ⭐"}
                </span>
              </span>
              <span className="test-cta__go"><Icon name="forward" size={22} /></span>
            </button>
          );
        })()}

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
      <div
        className={`sprout-fade-up${preReaderActive(subject.id, year) ? " pre-reader" : ""}`}
        style={{ ["--acc" as string]: subject.color, ["--acc-soft" as string]: subject.colorSoft }}
      >
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
