import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Icon, type IconName } from "@sprout/icons";
import { canSpeak } from "../speak";
import { useSpeaker, Speaker } from "../Speaker";
import { colorVar } from "./geo";
import { buildSheet, answerMatches, OP_NAME, OP_VERB, type Op, type Sheet, type SCell } from "./conta-armada-engine";

/* ContaArmada — the "armed" column algorithm (+, −, ×, ÷, with decimals) drawn
 * as an SVG grid that fills in one step at a time, exactly the way a teacher
 * narrates it on the board: "7 mais 5 é 12, escrevo o 2 e transporto 1…". Every
 * step has a speaker so a child who can't read yet can follow along.
 *
 * It shows worked examples to learn the scheme, and a "treina" playground where
 * the child types their OWN sum, tries the answer, and can check it, reveal the
 * right one, and watch the whole process explained step by step.
 *
 * Markdown usage:  ```contaarmada
 *                  { "examples": [ { "op": "add", "a": 27, "b": 15 } ] }
 *                  ```
 */

export interface ContaArmadaProblem {
  op: Op;
  a: number | string;
  b: number | string;
}

export interface ContaArmadaSpec {
  title?: string;
  /** worked examples shown first (defaults to one of each operation) */
  examples?: ContaArmadaProblem[];
  /** show the "treina com as tuas contas" playground (default true) */
  practice?: boolean;
  /** show the written, step-by-step guide for each operation (default false) */
  guide?: boolean;
  /** show the "põe-te à prova" test: 5 random problems per operation (default false) */
  test?: boolean;
  /** how the worked examples render: "cards" = step-by-step demo cards
   *  (default), "rows" = a compact practice list (the child solves each conta;
   *  the grid icon opens the same step-by-step, like "põe-te à prova"). */
  examplesLayout?: "cards" | "rows";
  /** subject colour key (default "mat") */
  color?: string;
}

const OPS: { op: Op; icon: IconName; label: string }[] = [
  { op: "add", icon: "plus", label: "Somar" },
  { op: "sub", icon: "minus", label: "Subtrair" },
  { op: "mul", icon: "times", label: "Multiplicar" },
  { op: "div", icon: "divide", label: "Dividir" },
];

const OP_GLYPH: Record<Op, string> = { add: "+", sub: "−", mul: "×", div: "÷" };

const DEFAULT_EXAMPLES: ContaArmadaProblem[] = [
  { op: "add", a: 248, b: 176 },
  { op: "sub", a: 503, b: 247 },
  { op: "mul", a: 34, b: 26 },
  { op: "div", a: 156, b: 4 },
  { op: "add", a: "12.5", b: "3.75" },
];

const num = (v: number | string) => String(v).replace(".", ",");

/* ---------- the SVG sheet + step controls ---------- */

const CW = 30; // column width
const CH = 42; // row height
const PAD = 14;

function toneColor(t: SCell["tone"], tint: string): string {
  switch (t) {
    case "result":
    case "accent":
      return tint;
    case "carry":
      return "var(--accent)";
    case "muted":
      return "var(--ink-3)";
    default:
      return "var(--ink)";
  }
}

export function ContaSheet({ sheet, tint, op }: { sheet: Sheet; tint: string; op: Op }) {
  // shown = how far we've revealed. 0 shows just the setup; the last index shows
  // the whole worked sum. steps[shown] is the line we narrate right now.
  const [shown, setShown] = useState(0);
  const { playing, toggle } = useSpeaker();
  const last = sheet.steps.length - 1;
  const here = Math.min(shown, last);
  const step = sheet.steps[here];
  const finished = shown >= last;

  const totalW = sheet.cols * CW + PAD * 2;
  const totalH = sheet.rows * CH + PAD * 2;
  const x = (c: number) => PAD + c * CW + CW / 2;
  const yBase = (r: number) => PAD + r * CH + CH * 0.7;
  const ySmall = (r: number) => PAD + r * CH + CH * 0.3;

  return (
    <div className="ca-sheet">
      <div className="ca-canvas">
        <svg
          className="ca-svg"
          width={totalW}
          height={totalH}
          viewBox={`0 0 ${totalW} ${totalH}`}
          role="img"
          aria-label={`Conta de ${OP_NAME[op]} passo a passo`}
        >
          {!finished && step.col != null && (
            <rect x={PAD + step.col * CW} y={PAD - 4} width={CW} height={sheet.rows * CH + 8} rx={6} fill={tint} opacity={0.12} />
          )}
          {sheet.hlines
            .filter((l) => l.step <= shown)
            .map((l, i) => (
              <line key={`h${i}`} x1={PAD + l.c0 * CW + 3} y1={PAD + l.r * CH} x2={PAD + (l.c1 + 1) * CW - 3} y2={PAD + l.r * CH} stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" />
            ))}
          {sheet.vbars.map((v, i) => (
            <line key={`v${i}`} x1={PAD + v.c * CW} y1={PAD + v.r0 * CH + 4} x2={PAD + v.c * CW} y2={PAD + (v.r1 + 1) * CH - 4} stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" />
          ))}
          {/* schoolbook cross-out: a slash through a digit that changed in a borrow */}
          {(sheet.strikes ?? [])
            .filter((s) => s.step <= shown)
            .map((s, i) => (
              <line key={`s${i}`} x1={PAD + s.c * CW + 8} y1={PAD + s.r * CH + CH * 0.8} x2={PAD + (s.c + 1) * CW - 8} y2={PAD + s.r * CH + CH * 0.28} stroke="var(--accent)" strokeWidth={2.5} strokeLinecap="round" opacity={0.85} />
            ))}
          {sheet.cells
            .filter((cell) => cell.step <= shown)
            .map((cell, i) => (
              <text
                key={`c${i}`}
                x={x(cell.c)}
                y={cell.small ? ySmall(cell.r) : yBase(cell.r)}
                textAnchor="middle"
                fontSize={cell.small ? 15 : 26}
                fontWeight={cell.tone === "result" ? 800 : 600}
                fill={toneColor(cell.tone, tint)}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {cell.ch}
              </text>
            ))}
        </svg>
      </div>

      <div className="ca-controls">
        <div className="ca-progress" aria-hidden="true">
          {sheet.steps.map((_, i) => (
            <span key={i} className="ca-progress__dot" data-done={i <= here || undefined} data-current={i === here || undefined} style={i <= here ? { background: tint } : undefined} />
          ))}
        </div>

        <div className="ca-controls__row">
          <button type="button" className="ca-nav" onClick={() => setShown((s) => Math.max(0, s - 1))} disabled={shown === 0} aria-label="Passo anterior">
            <Icon name="back" size={18} />
          </button>

          {finished ? (
            <button type="button" className="ca-nav ca-nav--text ca-nav--restart" onClick={() => setShown(0)}>
              <Icon name="refresh" size={16} /> Recomeçar
            </button>
          ) : (
            <>
              <button type="button" className="ca-nav ca-nav--text ca-nav--ghost" onClick={() => setShown(last)} title="Mostrar a conta toda">
                Ver tudo
              </button>
              <button type="button" className="ca-nav ca-nav--next" onClick={() => setShown((s) => Math.min(last, s + 1))} style={{ background: tint, borderColor: tint }}>
                Próximo <Icon name="forward" size={16} />
              </button>
            </>
          )}
        </div>

        {/* The step explanation in its own full-width box below the controls —
           the step number, what we're doing, and the full narration in writing
           (every step of every conta is explained as you advance, not just spoken). */}
        <div className="ca-explain">
          <div className="ca-explain__top">
            <span className="ca-explain__count" style={{ background: tint }}>{finished ? "Pronto!" : `Passo ${here} de ${last}`}</span>
            <strong className="ca-explain__caption">{step.caption}</strong>
            {canSpeak() && (
              <button
                type="button"
                className="ca-explain__speak"
                data-playing={playing || undefined}
                onClick={() => toggle(step.say)}
                aria-label={playing ? "Parar" : "Ouvir o passo"}
                title={playing ? "Parar" : "Ouvir o passo"}
              >
                <Icon name={playing ? "stop" : "speaker"} size={16} />
              </button>
            )}
          </div>
          <p className="ca-explain__say">{step.say}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- one worked example card ---------- */

function ExampleCard({ problem, tint }: { problem: ContaArmadaProblem; tint: string }) {
  const sheet = useMemo(() => buildSheet(problem.op, problem.a, problem.b), [problem.op, problem.a, problem.b]);
  const head = `${num(problem.a)} ${OP_GLYPH[problem.op]} ${num(problem.b)}`;
  return (
    <div className="ca-card">
      <div className="ca-card__head">
        <span className="ca-card__op" style={{ background: tint }}>
          <Icon name={OPS.find((o) => o.op === problem.op)!.icon} size={15} />
        </span>
        <strong>{head}</strong>
      </div>
      {sheet.ok ? <ContaSheet sheet={sheet} tint={tint} op={problem.op} /> : <p className="ca-error">{sheet.error}</p>}
    </div>
  );
}

/* ---------- the "treina" playground ---------- */

function Playground({ tint }: { tint: string }) {
  const [op, setOp] = useState<Op>("add");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [solved, setSolved] = useState<{ op: Op; a: string; b: string; key: number } | null>(null);
  const [problemError, setProblemError] = useState("");
  const [guess, setGuess] = useState("");
  const [verdict, setVerdict] = useState<null | { ok: boolean } | { reveal: true }>(null);

  const sheet = useMemo(() => (solved ? buildSheet(solved.op, solved.a, solved.b) : null), [solved]);

  const solve = () => {
    const probe = buildSheet(op, a, b);
    if (!probe.ok) {
      setSolved(null);
      setProblemError(probe.error ?? "Não consegui armar esta conta.");
      return;
    }
    setProblemError("");
    setGuess("");
    setVerdict(null);
    setSolved({ op, a, b, key: Date.now() });
  };

  const reveal = () => {
    if (!sheet) return;
    setGuess(num(sheet.answer));
    setVerdict({ reveal: true });
  };

  return (
    <div className="ca-practice">
      <div className="ca-practice__head">
        <span className="w-badge" style={{ background: tint }}>
          <Icon name="pencil" size={15} /> Treina
        </span>
        <span className="w-hint">Escreve a tua conta. Primeiro tenta, depois confirma.</span>
      </div>

      <div className="ca-ops">
        {OPS.map((o) => (
          <button key={o.op} type="button" className="ca-op" data-active={op === o.op || undefined} onClick={() => setOp(o.op)} style={op === o.op ? { background: tint, borderColor: tint } : undefined}>
            <Icon name={o.icon} size={16} /> {o.label}
          </button>
        ))}
      </div>

      <div className="ca-inputs">
        <label className="ca-field">
          <span className="ca-field__lbl">1.º número</span>
          <input className="ca-num" inputMode="decimal" placeholder="?" value={a} onChange={(e) => setA(e.target.value)} aria-label="Primeiro número" />
        </label>
        <span className="ca-inputs__op" style={{ color: tint }}>{OP_GLYPH[op]}</span>
        <label className="ca-field">
          <span className="ca-field__lbl">2.º número</span>
          <input className="ca-num" inputMode="decimal" placeholder="?" value={b} onChange={(e) => setB(e.target.value)} aria-label="Segundo número" />
        </label>
        <button type="button" className="pill ca-solve" onClick={solve} disabled={!a.trim() || !b.trim()} style={{ background: tint, borderColor: tint }}>
          <Icon name="check" size={16} /> Armar a conta
        </button>
      </div>
      {problemError && <p className="ca-error">{problemError}</p>}

      {sheet && solved && (
        <>
          <p className="ca-practice__hint">Tenta resolver no papel. Se precisares de ajuda, carrega em <strong>Próximo</strong> e vê uma coluna de cada vez. 👇</p>
          <ContaSheet key={solved.key} sheet={sheet} tint={tint} op={solved.op} />

          <div className="ca-check">
            <label className="ca-field">
              <span className="ca-field__lbl">A tua resposta</span>
              <input
                className="ca-num ca-num--wide"
                inputMode="decimal"
                placeholder="?"
                value={guess}
                onChange={(e) => {
                  setGuess(e.target.value);
                  setVerdict(null);
                }}
                aria-label="A tua resposta"
              />
            </label>
            <button type="button" className="pill ca-solve" onClick={() => setVerdict({ ok: answerMatches(guess, sheet.answer) })} disabled={!guess.trim()} style={{ background: tint, borderColor: tint }}>
              <Icon name="target" size={16} /> Verificar
            </button>
            <button type="button" className="pill ghost ca-solve" onClick={reveal}>
              <Icon name="info" size={16} /> Mostrar resposta
            </button>
          </div>

          {verdict && "reveal" in verdict && (
            <div className="ca-verdict" data-reveal>
              <Icon name="info" size={18} />
              A resposta é <strong>{num(sheet.answer)}</strong>. Carrega em <strong>Próximo</strong> para veres como se chega lá. 🙂
            </div>
          )}
          {verdict && "ok" in verdict && (
            <div className="ca-verdict" data-ok={verdict.ok || undefined}>
              <Icon name={verdict.ok ? "ok" : "refresh"} size={18} />
              {verdict.ok ? "Certinho! Boa! 🎉" : `Ainda não. A resposta certa é ${num(sheet.answer)}. Segue os passos para veres porquê. 💪`}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ---------- the written "como se faz" guide ---------- */

/* Plain-words recipe for each operation, one numbered step at a time — so a
 * child (or a parent helping) can read/hear the method without watching the
 * animation. Same order the engine narrates the worked examples in. */
const GUIDES: Record<Op, string[]> = {
  add: [
    "Arruma os números: unidades debaixo de unidades, dezenas debaixo de dezenas. Encosta tudo à direita.",
    "Começa na coluna mais à direita. Soma só os algarismos dessa coluna.",
    "Se der menos de 10, escreve o resultado. Se der 10 ou mais, escreve a unidade e leva a dezena para a coluna seguinte: é o «vai 1».",
    "Na coluna seguinte, soma os algarismos e junta o «vai 1», se ele existir.",
    "Repete coluna a coluna até acabar. Se ainda sobrar um «vai 1», escreve-o no início do resultado.",
  ],
  sub: [
    "Arruma a conta: o número maior em cima, o outro por baixo, alinhados à direita.",
    "Começa na coluna mais à direita. Tira o algarismo de baixo ao algarismo de cima.",
    "Se o de cima for pequeno demais, pede 10 emprestado à casa da esquerda. Assim essa coluna fica com mais 10.",
    "A casa que emprestou fica com menos 1. Se essa casa for 0, ela também tem de pedir emprestado primeiro.",
    "Escreve a resposta dessa coluna por baixo.",
    "Vai para a coluna seguinte e repete até acabares.",
  ],
  mul: [
    "Arruma os números alinhados à direita, o de baixo por baixo.",
    "Começa pela direita: multiplica o algarismo das unidades de cima pelo algarismo de baixo.",
    "Se der menos de 10, escreve o resultado. Se der 10 ou mais, escreve só o algarismo das unidades e transporta a dezena para a coluna seguinte (o «vai»).",
    "Multiplica o algarismo de cima seguinte e junta o que transportaste. Repete até ao fim; o último transporte escreve-se no início.",
    "Se o número de baixo tiver mais do que um algarismo, faz uma linha nova para cada um, a começar uma casa mais à esquerda, e no fim soma as linhas.",
    "Se havia vírgulas, conta as casas decimais dos dois números e põe a vírgula no resultado.",
  ],
  div: [
    "Escreve o número que vais dividir à esquerda. Escreve o número pelo qual divides à direita da barra.",
    "Começa pela esquerda e pergunta: quantas vezes o número da direita cabe aqui?",
    "Escreve essa resposta, multiplica para conferir e tira. O que sobra chama-se resto.",
    "Baixa o algarismo seguinte para junto do resto.",
    "Repete: divide, multiplica, tira e baixa. No fim, se sobrar alguma coisa, esse é o resto final.",
  ],
};

function Guide({ tint }: { tint: string }) {
  const [op, setOp] = useState<Op>("add");
  return (
    <div className="ca-guide">
      <div className="ca-guide__head">
        <span className="w-badge" style={{ background: tint }}>
          <Icon name="reading" size={15} /> Como se faz
        </span>
        <span className="w-hint">Escolhe a operação. A receita fica em frases curtas.</span>
      </div>

      <div className="ca-ops">
        {OPS.map((o) => (
          <button key={o.op} type="button" className="ca-op" data-active={op === o.op || undefined} onClick={() => setOp(o.op)} style={op === o.op ? { background: tint, borderColor: tint } : undefined}>
            <Icon name={o.icon} size={16} /> {o.label}
          </button>
        ))}
      </div>

      <ol className="ca-steps">
        {GUIDES[op].map((s, i) => (
          <li key={i} className="ca-steps__item">
            <span className="ca-steps__num" style={{ background: tint }}>{i + 1}</span>
            <p className="ca-steps__text">{s}</p>
            <Speaker text={s} size={15} className="ca-steps__speak" label="Ouvir o passo" />
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- the "põe-te à prova" test (random problems, regenerate to repeat) ---------- */

/** Inclusive random integer. Runtime-only (the widget runs in the browser). */
const randInt = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));

/** A fresh problem for one operation, kept at a 1.º-ciclo size; subtraction
 *  never goes negative and division always comes out exact (cleaner to check). */
function randomProblem(op: Op): { a: number; b: number } {
  switch (op) {
    case "add":
      return { a: randInt(20, 999), b: randInt(20, 999) };
    case "sub": {
      const a = randInt(50, 999);
      return { a, b: randInt(10, a) };
    }
    case "mul":
      return { a: randInt(12, 99), b: randInt(2, 9) };
    case "div": {
      const b = randInt(2, 9);
      return { a: b * randInt(11, 99), b };
    }
  }
}

const TEST_PER_OP = 5;

function makeTestSet(): ContaArmadaProblem[] {
  const set: ContaArmadaProblem[] = [];
  for (const { op } of OPS) for (let i = 0; i < TEST_PER_OP; i++) set.push({ op, ...randomProblem(op) });
  return set;
}

/* Tapping the grid icon of a conta opens this — the same step-by-step sheet the
 * worked examples use, so a stuck child can watch exactly how that conta works
 * out (and hear it), then close and try the next. */
function ContaPopup({ item, tint, onClose }: { item: ContaArmadaProblem; tint: string; onClose: () => void }) {
  const sheet = useMemo(() => buildSheet(item.op, item.a, item.b), [item]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const head = `${num(item.a)} ${OP_GLYPH[item.op]} ${num(item.b)}`;
  const modal = (
    <div className="ca-modal" role="dialog" aria-modal="true" aria-label={`Cálculo de ${head}`} onClick={onClose}>
      <div className="ca-modal__card" onClick={(e) => e.stopPropagation()}>
        <div className="ca-modal__head">
          <span className="ca-card__op" style={{ background: tint }}>
            <Icon name={OPS.find((o) => o.op === item.op)!.icon} size={15} />
          </span>
          <strong>{head}</strong>
          <button type="button" className="ca-modal__close" onClick={onClose} aria-label="Fechar">
            <Icon name="close" size={18} />
          </button>
        </div>
        <p className="ca-practice__hint">Carrega em <strong>Próximo</strong> para veres a conta uma coluna de cada vez. 👇</p>
        <ContaSheet sheet={sheet} tint={tint} op={item.op} />
      </div>
    </div>
  );
  // Portal to the theming root: the lesson screen sits inside a `.sprout-fade-up`
  // (animated → transformed) box, which would otherwise trap our `position: fixed`
  // overlay inside it (centred off-screen). `.sprout-root` carries the theme vars
  // and has no transform, so the modal lands over the whole viewport.
  const root = typeof document !== "undefined" ? document.querySelector(".sprout-root") : null;
  return root ? createPortal(modal, root) : modal;
}

/* The compact practice sheet: rows of "a op b = ▢" grouped by operation, each
 * with a step-by-step popup (grid icon) and a read-aloud speaker. Two callers:
 *   • "Experimenta" — a FIXED list of contas to solve (`items`), no reshuffle.
 *   • "Põe-te à prova" — a RANDOM set (`make`), with a "Números novos" reshuffle.
 * Pass exactly one of `items` / `make`. */
function PracticeSheet({
  tint,
  badge,
  hint,
  items,
  make,
}: {
  tint: string;
  badge: { icon: IconName; label: string };
  hint: string;
  items?: ContaArmadaProblem[];
  make?: () => ContaArmadaProblem[];
}) {
  const [list, setList] = useState<ContaArmadaProblem[]>(() => items ?? make!());
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [popup, setPopup] = useState<number | null>(null);

  // The engine is the single source of truth for every correct answer.
  const solutions = useMemo(() => list.map((p) => buildSheet(p.op, p.a, p.b).answer), [list]);

  const reshuffle = make
    ? () => {
        setList(make());
        setAnswers({});
        setChecked(false);
      }
    : undefined;

  const filled = (i: number) => (answers[i] ?? "").trim() !== "";
  const isRight = (i: number) => filled(i) && answerMatches(answers[i] ?? "", solutions[i]);
  const filledCount = list.reduce((n, _, i) => n + (filled(i) ? 1 : 0), 0);
  const correct = list.reduce((n, _, i) => n + (isRight(i) ? 1 : 0), 0);

  return (
    <div className="ca-test">
      <div className="ca-test__head">
        <span className="w-badge" style={{ background: tint }}>
          <Icon name={badge.icon} size={15} /> {badge.label}
        </span>
        <span className="w-hint">{hint}</span>
      </div>

      <div className="ca-test__groups">
        {OPS.filter((o) => list.some((p) => p.op === o.op)).map((o) => (
          <div key={o.op} className="ca-test__group">
            <h4 className="ca-test__title">
              <span className="ca-test__icon" style={{ background: tint }}>
                <Icon name={o.icon} size={13} />
              </span>
              {o.label}
            </h4>
            {list
              .map((p, i) => ({ p, i }))
              .filter((x) => x.p.op === o.op)
              .map(({ p, i }) => (
                <div key={i} className="ca-test__row" data-state={checked && filled(i) ? (isRight(i) ? "ok" : "no") : undefined}>
                  <span className="ca-test__q">
                    {num(p.a)} {OP_GLYPH[p.op]} {num(p.b)} =
                  </span>
                  <input
                    className="ca-num ca-test__input"
                    inputMode="decimal"
                    placeholder="?"
                    value={answers[i] ?? ""}
                    onChange={(e) => {
                      setAnswers((m) => ({ ...m, [i]: e.target.value }));
                      setChecked(false);
                    }}
                    aria-label={`Resultado de ${p.a} ${OP_VERB[p.op]} ${p.b}`}
                  />
                  <button type="button" className="ca-test__see" onClick={() => setPopup(i)} aria-label={`Ver como se resolve ${p.a} ${OP_VERB[p.op]} ${p.b}`} title="Ver como se resolve passo a passo">
                    <Icon name="grid" size={16} />
                  </button>
                  <Speaker text={`${p.a} ${OP_VERB[p.op]} ${p.b}`} size={15} className="ca-test__speak" label="Ouvir a conta" />
                  {checked && filled(i) && (
                    <span className="ca-test__mark">
                      {isRight(i) ? <Icon name="ok" size={18} /> : <><Icon name="close" size={16} /> {num(solutions[i])}</>}
                    </span>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="ca-test__actions">
        <button type="button" className="pill ca-solve" onClick={() => setChecked(true)} disabled={!filledCount} style={{ background: tint, borderColor: tint }}>
          <Icon name="target" size={16} /> Verificar
        </button>
        {reshuffle && (
          <button type="button" className="pill ghost ca-solve" onClick={reshuffle}>
            <Icon name="refresh" size={16} /> Números novos
          </button>
        )}
      </div>

      {checked && (
        <div className="ca-verdict" data-ok={correct === list.length || undefined}>
          <Icon name={correct === list.length ? "trophy" : "info"} size={18} />
          {correct === list.length
            ? `Tudo certo! Acertaste as ${list.length}! 🎉`
            : `Acertaste ${correct} de ${filledCount} que preencheste.${filledCount < list.length ? ` Faltam ${list.length - filledCount}.` : ""} As verdes estão certas, as vermelhas mostram a resposta. 💪`}
        </div>
      )}

      {popup !== null && list[popup] && <ContaPopup item={list[popup]} tint={tint} onClose={() => setPopup(null)} />}
    </div>
  );
}

/* ---------- the widget ---------- */

export function ContaArmada({ spec }: { spec: ContaArmadaSpec }) {
  const tint = colorVar(spec.color ?? "mat");
  const examples = spec.examples ?? DEFAULT_EXAMPLES;
  const showPractice = spec.practice !== false;

  return (
    <div className="widget contaarmada-widget">
      <div className="w-head">
        <span className="w-badge">
          <Icon name="math" size={16} /> Contas armadas
        </span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Uma coluna de cada vez, com explicação</span>
      </div>

      {examples.length > 0 &&
        (spec.examplesLayout === "rows" ? (
          <PracticeSheet
            tint={tint}
            badge={{ icon: "target", label: "Experimenta" }}
            hint="Resolve cada conta e confere. Ficaste preso? Carrega na grelha para veres uma coluna de cada vez. 🔢"
            items={examples}
          />
        ) : (
          <div className="ca-examples">
            {examples.map((p, i) => (
              <ExampleCard key={i} problem={p} tint={tint} />
            ))}
          </div>
        ))}

      {spec.guide && <Guide tint={tint} />}
      {showPractice && <Playground tint={tint} />}
      {spec.test && (
        <PracticeSheet
          tint={tint}
          badge={{ icon: "trophy", label: "Põe-te à prova" }}
          hint="Resolve as que conseguires. A grelha mostra a explicação passo a passo."
          make={makeTestSet}
        />
      )}
    </div>
  );
}
