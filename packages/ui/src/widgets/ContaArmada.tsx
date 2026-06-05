import { useMemo, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { canSpeak } from "../speak";
import { useSpeaker } from "../Speaker";
import { colorVar } from "./geo";
import { buildSheet, answerMatches, OP_NAME, type Op, type Sheet, type SCell } from "./conta-armada-engine";

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

function ContaSheet({ sheet, tint, op }: { sheet: Sheet; tint: string; op: Op }) {
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

          <div className="ca-step">
            <span className="ca-step__count">{finished ? "Pronto!" : `Passo ${here} de ${last}`}</span>
            <strong className="ca-step__caption">{step.caption}</strong>
            {canSpeak() && (
              <button
                type="button"
                className="ca-step__speak"
                data-playing={playing || undefined}
                onClick={() => toggle(step.say)}
                aria-label={playing ? "Parar" : "Ouvir o passo"}
                title={playing ? "Parar" : "Ouvir o passo"}
              >
                <Icon name={playing ? "stop" : "speaker"} size={16} />
              </button>
            )}
          </div>

          {finished ? (
            <button type="button" className="ca-nav ca-nav--text" onClick={() => setShown(0)}>
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
        <span className="w-hint">Escreve a tua conta, tenta o resultado e verifica!</span>
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
          <p className="ca-practice__hint">Tenta resolver de cabeça ou no papel. Depois escreve a tua resposta — ou carrega no <strong>+</strong> para veres o processo passo a passo. 👇</p>
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
              A resposta é <strong>{num(sheet.answer)}</strong>. Carrega no <strong>+</strong> para veres como se chega lá. 🙂
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
        <span className="w-hint">Vê a conta a montar-se passo a passo</span>
      </div>

      {examples.length > 0 && (
        <div className="ca-examples">
          {examples.map((p, i) => (
            <ExampleCard key={i} problem={p} tint={tint} />
          ))}
        </div>
      )}

      {showPractice && <Playground tint={tint} />}
    </div>
  );
}
