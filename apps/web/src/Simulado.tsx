import { useMemo, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "@sprout/ui";
import { Quiz, type QuizQuestion } from "./Quiz";
import { LessonContext, useProgress } from "./progress";
import { tierLabel, subjectById, subjectsForYear, yearLabel, type Subject, type YearN } from "./content/curriculum";
import { mandatorySubjectsForYear, recordExamPct, requeueWeakestLessons } from "./study/ferias";
import { saveDiagnostic, weakSubjects, diagnosticScoresLine, type Diagnostic } from "./study/diagnostico";

/* Simulado — a "try it out" mock test. It gathers every quiz question from a
 * subject's lessons in one year and shows a fresh random mix in a modal, so a
 * child can test the whole matéria at once (not just one lesson). It reuses the
 * Quiz engine (read-aloud, stars, confetti) and writes its score to a synthetic
 * id, so it never pollutes real lesson progress (isFinal stays false).
 *
 * The "Exame final de ano" (§4.8) builds on the same extraction: one mixed,
 * harder-biased test across ALL the year's school subjects, graded 0–20.
 *
 * The "Diagnóstico inicial" (§4.7) also lives here: the optional placement
 * mini-test before a férias plan — one short part per mandatory subject,
 * warm tone, no nota; the result (study/diagnostico.ts) shapes the new
 * plan's queue. */

const QUIZ_BLOCK = /```quiz\s*\r?\n([\s\S]*?)\r?\n```/g;

/** Every quiz block of a lesson body, each tagged final vs. practice. */
function quizBlocksFromBody(body: string): { final: boolean; questions: QuizQuestion[] }[] {
  const out: { final: boolean; questions: QuizQuestion[] }[] = [];
  QUIZ_BLOCK.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = QUIZ_BLOCK.exec(body))) {
    try {
      const spec = JSON.parse(m[1]) as { final?: boolean; questions?: QuizQuestion[] };
      if (Array.isArray(spec.questions)) out.push({ final: !!spec.final, questions: spec.questions });
    } catch {
      /* malformed blocks are caught by `pnpm validate`; skip here */
    }
  }
  return out;
}

/** Pull every quiz question out of a lesson body (practice + final blocks). */
export function questionsFromBody(body: string): QuizQuestion[] {
  return quizBlocksFromBody(body).flatMap((b) => b.questions);
}

function shuffle<T>(a: T[]): T[] {
  const r = a.slice();
  for (let k = r.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [r[k], r[j]] = [r[j], r[k]];
  }
  return r;
}

/** A mixed practice test for one subject+year, drawn from all its lessons. */
export function buildSimulado(subject: Subject, year: YearN, count: number): QuizQuestion[] {
  const all: QuizQuestion[] = [];
  for (const l of subject.years[year]) if (l.body) all.push(...questionsFromBody(l.body));
  return shuffle(all).slice(0, count);
}

const SIZE = 12; // questions per simulado

export function SimuladoLauncher({ subject, year }: { subject: Subject; year: YearN }) {
  const [open, setOpen] = useState(false);
  const available = useMemo(() => buildSimulado(subject, year, 9999).length, [subject, year]);
  if (available < 4) return null; // too few to make a test (e.g. "Saber de cor", dicionário)
  const tier = tierLabel(subject.id, year);
  const n = Math.min(SIZE, available);
  return (
    <>
      <button className="simulado-cta" style={{ ["--c" as string]: subject.color }} onClick={() => setOpen(true)}>
        <span className="simulado-cta__icon"><Icon name="target" size={24} /></span>
        <span className="simulado-cta__text">
          <span className="simulado-cta__title">Pôr-me à prova — Simulado 🎯</span>
          <span className="simulado-cta__sub">Uma mistura de {n} perguntas de toda a matéria{tier ? ` · ${tier}` : ""}</span>
        </span>
        <span className="simulado-cta__go"><Icon name="forward" size={20} /></span>
      </button>
      {open && <SimuladoModal subject={subject} year={year} onClose={() => setOpen(false)} />}
    </>
  );
}

/* ---- Exame final de ano (§4.8) ---------------------------------------- */

export const EXAM_SIZE = 24;

/** One mixed exam over ALL the year's school subjects, biased hard ("média
 *  para cima" — na escola não facilitam): questions from FINAL quizzes weigh
 *  more than practice ones, and later lessons weigh more than earlier ones
 *  (simple heuristic: a subject's lessons are in teaching order, so a later
 *  position = harder matter). Each subject gets an equal quota. */
export function buildExame(year: YearN, count = EXAM_SIZE): QuizQuestion[] {
  const subjects = subjectsForYear(year);
  if (subjects.length === 0) return [];
  const quota = Math.ceil(count / subjects.length);
  const picked: QuizQuestion[] = [];
  for (const subject of subjects) {
    const lessons = subject.years[year].filter((l) => l.body);
    const pool: { q: QuizQuestion; w: number }[] = [];
    lessons.forEach((lesson, i) => {
      const pos = lessons.length > 1 ? i / (lessons.length - 1) : 1; // 0 = first, 1 = last
      for (const block of quizBlocksFromBody(lesson.body!)) {
        const w = (block.final ? 2 : 0) + pos; // final quiz beats practice; later beats earlier
        for (const q of block.questions) pool.push({ q, w });
      }
    });
    // Shuffle first so equal weights tie-break randomly, then keep the top
    // 2×quota hardest and draw the quota from those — biased up, still varied.
    const shortlist = shuffle(pool).sort((a, b) => b.w - a.w).slice(0, quota * 2);
    picked.push(...shuffle(shortlist).slice(0, quota).map((e) => e.q));
  }
  return shuffle(picked).slice(0, count);
}

/** School-style 0–20 grade. Pass is ≥ 10 — honest, no inflation. */
export const notaFromPct = (pct: number): number => Math.round(pct * 20);

/** Tiered message for a nota — encouraging in tone, honest about the bar. */
export function examVerdict(nota: number): string {
  if (nota >= 18) return "Excelente! 🌟 Dominas a matéria do ano!";
  if (nota >= 14) return "Muito bom! Estás mesmo forte nesta matéria.";
  if (nota >= 10) return "Passaste — dá para melhorar. Repete quando quiseres: fica a melhor nota.";
  return "Ainda não está — vamos rever e repetir. Pus as lições mais fracas de volta no teu plano.";
}

/** The exam modal: ~24 questions across the year, graded 0–20. The score is
 *  saved on the plan/record (best of retakes); a fail (<10) re-queues the
 *  weakest lessons into the plan. Reuses the Quiz engine with a synthetic id
 *  (isFinal stays false), like the simulado. */
export function ExameModal({ year, onClose }: { year: YearN; onClose: () => void }) {
  const { progress } = useProgress();
  const questions = useMemo(() => buildExame(year), [year]);
  const [nota, setNota] = useState<number | null>(null);
  const onResult = (pct: number) => {
    recordExamPct(pct); // keeps the best across retakes
    const n = notaFromPct(pct);
    setNota(n);
    if (n < 10) requeueWeakestLessons(progress);
  };
  return (
    <div className="cmdk-backdrop" onClick={onClose}>
      <div className="simulado-modal sprout-scroll" role="dialog" aria-label={`Exame final do ${yearLabel(year)}`} onClick={(e) => e.stopPropagation()}>
        <div className="simulado-modal__head" style={{ ["--c" as string]: "var(--primary)" }}>
          <span className="simulado-modal__icon"><Icon name="trophy" size={22} /></span>
          <strong>Exame final · {yearLabel(year)}</strong>
          <button className="iconbtn" onClick={onClose} aria-label="Fechar"><Icon name="close" size={20} /></button>
        </div>
        <p className="simulado-modal__sub">
          {questions.length} perguntas de todas as disciplinas do ano. Lê com calma — é como na escola. Boa sorte! 🍀
        </p>
        {nota != null && (
          <div className={`exame-nota ${nota >= 10 ? "is-pass" : "is-redo"}`}>
            <strong>Nota: {nota}/20</strong>
            <span>{examVerdict(nota)}</span>
            <Speaker text={`Tiveste ${nota} em vinte. ${examVerdict(nota)}`} className="prose-speak" size={18} label="Ouvir a nota" />
          </div>
        )}
        <LessonContext.Provider value={`exame:${year}`}>
          <Quiz spec={{ title: `Exame final do ${yearLabel(year)}`, questions }} quizId={`exame-${year}`} onResult={onResult} />
        </LessonContext.Provider>
      </div>
    </div>
  );
}

/* ---- Diagnóstico inicial (§4.7) ---------------------------------------- */

/** Target size of the mini-test, split across the mandatory subjects. */
export const DIAG_SIZE = 12;
/** Fewer questions than this per subject and the % means nothing. */
const DIAG_MIN_PER_SUBJECT = 3;

export interface DiagStage {
  subject: Subject;
  questions: QuizQuestion[];
}

/** One short part per mandatory subject of the year (the same rule as the
 *  férias queue), ~DIAG_SIZE questions in total at mixed difficulty —
 *  buildSimulado already draws from practice AND final quizzes at random.
 *  Subjects without enough material are skipped. */
export function buildDiagnostico(year: YearN): DiagStage[] {
  const subjects = mandatorySubjectsForYear(year).filter(
    (s) => buildSimulado(s, year, 9999).length >= DIAG_MIN_PER_SUBJECT,
  );
  if (subjects.length === 0) return [];
  const per = Math.max(DIAG_MIN_PER_SUBJECT, Math.round(DIAG_SIZE / subjects.length));
  return subjects.map((subject) => ({ subject, questions: buildSimulado(subject, year, per) }));
}

/** The optional placement mini-test before a férias plan (§4.7): one short
 *  Quiz per mandatory subject, run in sequence in one modal. No nota — the
 *  copy stays warm ("sem nota, é só para montar o teu plano"). The combined
 *  result is saved to sprout.diagnostic.v1 and shapes the NEW plan's queue
 *  (ferias.ts front-loads the weak subjects). Scores go to the synthetic id
 *  `diag:<year>` (isFinal stays false), so real lesson progress stays clean. */
export function DiagnosticoModal({ year, onClose, onStart }: { year: YearN; onClose: () => void; onStart: () => void }) {
  const stages = useMemo(() => buildDiagnostico(year), [year]);
  const [stage, setStage] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [stageDone, setStageDone] = useState(false);
  const [result, setResult] = useState<Diagnostic | null>(null);
  const cur = stages[stage];

  // Each finished attempt overwrites the part's score — a retry inside a part
  // keeps the LAST run (the diagnostic wants the current picture).
  const onResult = (pct: number) => {
    if (cur) setScores((s) => ({ ...s, [cur.subject.id]: pct }));
    setStageDone(true);
  };

  const next = () => {
    if (stage + 1 >= stages.length) {
      // All parts done: save the result — startFeriasPlan reads it (§4.7).
      let qs = 0;
      let sum = 0;
      for (const st of stages) {
        sum += (scores[st.subject.id] ?? 0) * st.questions.length;
        qs += st.questions.length;
      }
      const d: Diagnostic = { year, at: Date.now(), pct: qs ? sum / qs : 0, bySubject: { ...scores } };
      saveDiagnostic(d);
      setResult(d);
    }
    setStage(stage + 1);
    setStageDone(false);
  };

  const weak = result ? weakSubjects(result).map((id) => subjectById.get(id)?.label ?? id) : [];
  const weakLine =
    weak.length > 0
      ? `O teu plano vai reforçar ${weak.join(" e ")} primeiro — vamos recuperar aos poucos!`
      : "Estás num bom caminho em tudo — o plano segue a ordem normal.";
  const intro = `Vamos ver o que já sabes — sem nota, é só para montar o teu plano!`;

  return (
    <div className="cmdk-backdrop" onClick={onClose}>
      <div className="simulado-modal sprout-scroll" role="dialog" aria-label={`Mini-teste do ${yearLabel(year)}`} onClick={(e) => e.stopPropagation()}>
        <div className="simulado-modal__head" style={{ ["--c" as string]: "var(--primary)" }}>
          <span className="simulado-modal__icon"><Icon name="target" size={22} /></span>
          <strong>Mini-teste · {yearLabel(year)}</strong>
          <button className="iconbtn" onClick={onClose} aria-label="Fechar"><Icon name="close" size={20} /></button>
        </div>
        {result ? (
          <div className="diag-result">
            <strong>Já está! Obrigado — agora conheço-te melhor. 🌱</strong>
            <p>{diagnosticScoresLine(result)}</p>
            <p>{weakLine}</p>
            <Speaker
              text={`Já está! Obrigado, agora conheço-te melhor. ${weakLine}`}
              className="prose-speak"
              size={18}
              label="Ouvir o resultado"
            />
            <button className="diag-go" onClick={onStart}>
              <Icon name="forward" size={18} /> Começar o plano do {yearLabel(year)}
            </button>
          </div>
        ) : cur ? (
          <>
            <p className="simulado-modal__sub">
              {intro} Parte {stage + 1} de {stages.length}: {cur.subject.label}.
            </p>
            <Speaker
              text={`${intro} Parte ${stage + 1} de ${stages.length}: ${cur.subject.label}.`}
              className="diag-say"
              size={18}
              label="Ouvir"
            />
            {stageDone && (
              <button className="diag-go" onClick={next}>
                <Icon name="forward" size={18} />{" "}
                {stage + 1 >= stages.length ? "Ver o resultado" : `Próxima parte: ${stages[stage + 1].subject.label}`}
              </button>
            )}
            <LessonContext.Provider value={`diag:${year}`}>
              <Quiz
                key={cur.subject.id}
                spec={{ title: cur.subject.label, questions: cur.questions }}
                quizId={`diag-${year}-${cur.subject.id}`}
                onResult={onResult}
              />
            </LessonContext.Provider>
          </>
        ) : null}
      </div>
    </div>
  );
}

function SimuladoModal({ subject, year, onClose }: { subject: Subject; year: YearN; onClose: () => void }) {
  // Built once per open — a new mix each time the modal is launched.
  const questions = useMemo(() => buildSimulado(subject, year, SIZE), [subject, year]);
  return (
    <div className="cmdk-backdrop" onClick={onClose}>
      <div className="simulado-modal sprout-scroll" role="dialog" aria-label={`Simulado de ${subject.label}`} onClick={(e) => e.stopPropagation()}>
        <div className="simulado-modal__head" style={{ ["--c" as string]: subject.color }}>
          <span className="simulado-modal__icon"><Icon name="target" size={22} /></span>
          <strong>Simulado · {subject.label}</strong>
          <button className="iconbtn" onClick={onClose} aria-label="Fechar"><Icon name="close" size={20} /></button>
        </div>
        <p className="simulado-modal__sub">É só para treinares — não conta para as estrelas a sério. Boa sorte! 🍀</p>
        <LessonContext.Provider value={`sim:${subject.id}:${year}`}>
          <Quiz spec={{ title: `Simulado de ${subject.label}`, questions }} quizId={`sim-${subject.id}-${year}`} />
        </LessonContext.Provider>
      </div>
    </div>
  );
}
