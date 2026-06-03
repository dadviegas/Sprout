import { useMemo, useState } from "react";
import { Icon } from "@sprout/icons";
import { Quiz, type QuizQuestion } from "./Quiz";
import { LessonContext } from "./progress";
import { tierLabel, type Subject, type YearN } from "./content/curriculum";

/* Simulado — a "try it out" mock test. It gathers every quiz question from a
 * subject's lessons in one year and shows a fresh random mix in a modal, so a
 * child can test the whole matéria at once (not just one lesson). It reuses the
 * Quiz engine (read-aloud, stars, confetti) and writes its score to a synthetic
 * id, so it never pollutes real lesson progress (isFinal stays false). */

const QUIZ_BLOCK = /```quiz\s*\r?\n([\s\S]*?)\r?\n```/g;

/** Pull every quiz question out of a lesson body (practice + final blocks). */
export function questionsFromBody(body: string): QuizQuestion[] {
  const out: QuizQuestion[] = [];
  QUIZ_BLOCK.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = QUIZ_BLOCK.exec(body))) {
    try {
      const spec = JSON.parse(m[1]) as { questions?: QuizQuestion[] };
      if (Array.isArray(spec.questions)) out.push(...spec.questions);
    } catch {
      /* malformed blocks are caught by `pnpm validate`; skip here */
    }
  }
  return out;
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
