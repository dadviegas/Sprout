import { useMemo, useState } from "react";
import { Icon } from "@sprout/icons";
import { speak, stop } from "../speak";
import { Speaker } from "../Speaker";
import { Confetti } from "../Confetti";

/* Drill — the "saber de cor" trainer. Turns a deck of cards into an active
 * self-test so the child PRACTISES recall instead of just re-reading. Two modes:
 *   • "flip"   — flashcards: see the front, tap to flip + hear the answer, then
 *                self-grade ("Acertei" / "Ainda não").
 *   • "choose" — tap-the-answer: see the front, pick from options, hear it.
 * Tracks a live score and streak and celebrates a clean run. Everything is
 * read-aloud, and — per the project rule — speech only ever fires on a tap.
 *
 * Markdown usage:
 *   ```drill
 *   { "mode": "choose", "title": "Tabuada do 3", "generate": { "kind": "tabuada", "of": 3 } }
 *   ```
 *   ```drill
 *   { "mode": "flip", "items": [ { "front": "2.ª", "back": "segunda-feira" } ] }
 *   ```
 */

export interface DrillItem {
  /** the prompt shown on the card (e.g. "3 × 4", "2.ª", "C") */
  front: string;
  /** the answer (e.g. "12", "segunda-feira", "Canadá") */
  back: string;
  /** read-aloud for the answer (defaults to a sentence built from front+back) */
  say?: string;
  /** read-aloud for the prompt (defaults to `front`) */
  sayFront?: string;
  /** a small decoration shown on the card */
  emoji?: string;
  /** explicit wrong options for "choose" mode (else they're auto-generated) */
  options?: string[];
}

type Generate =
  | { kind: "tabuada"; of: number; upTo?: number }
  | { kind: "tabuadas"; tables: number[]; upTo?: number };

export interface DrillSpec {
  title?: string;
  /** "flip" (flashcards, default) or "choose" (tap the right answer) */
  mode?: "flip" | "choose";
  items?: DrillItem[];
  /** build the deck automatically, e.g. a multiplication table */
  generate?: Generate;
  /** number of options shown in "choose" mode, including the right one (default 3) */
  choices?: number;
  /** cap the deck to this many random cards (e.g. a 12-question mixed quiz) */
  limit?: number;
}

function shuffle<T>(a: readonly T[]): T[] {
  const r = a.slice();
  for (let k = r.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [r[k], r[j]] = [r[j], r[k]];
  }
  return r;
}

function genItems(g: Generate): DrillItem[] {
  const upTo = g.upTo ?? 10;
  const tables = g.kind === "tabuada" ? [g.of] : g.tables;
  const out: DrillItem[] = [];
  for (const n of tables) {
    for (let i = 1; i <= upTo; i++) {
      out.push({
        front: `${i} × ${n}`,
        back: `${i * n}`,
        sayFront: `${i} vezes ${n}`,
        say: `${i} vezes ${n} é igual a ${i * n}`,
      });
    }
  }
  return out;
}

/** Options for "choose": the right answer + plausible wrong ones. Numeric
 *  answers get near-miss numbers; otherwise we borrow other cards' answers. */
function optionsFor(item: DrillItem, all: readonly DrillItem[], count: number): string[] {
  if (item.options?.length) return shuffle([item.back, ...item.options]).slice(0, count);
  const wrong: string[] = [];
  const seen = new Set([item.back]);
  const add = (v: string) => {
    if (v === "" || seen.has(v)) return;
    const n = Number(v); // keep numeric distractors non-negative (kid-friendly)
    if (!Number.isNaN(n) && n < 0) return;
    seen.add(v);
    wrong.push(v);
  };
  const num = Number(item.back);
  if (item.back.trim() !== "" && !Number.isNaN(num)) {
    for (const d of shuffle([1, -1, 2, -2, 3, 10, -3])) add(String(num + d));
  }
  for (const o of shuffle(all)) { if (wrong.length >= count - 1) break; add(o.back); }
  return shuffle([item.back, ...wrong.slice(0, count - 1)]);
}

const starsFor = (score: number, total: number): number => {
  if (total === 0) return 0;
  const p = score / total;
  return p >= 0.9 ? 3 : p >= 0.7 ? 2 : p >= 0.5 ? 1 : 0;
};

export function Drill({ spec }: { spec: DrillSpec }) {
  const mode = spec.mode ?? "flip";
  const choices = spec.choices ?? 3;
  const base = useMemo<DrillItem[]>(
    () => spec.items ?? (spec.generate ? genItems(spec.generate) : []),
    [spec.items, spec.generate],
  );

  // `round` bumps to reshuffle the deck on restart.
  const [round, setRound] = useState(0);
  const deck = useMemo(() => {
    const s = shuffle(base);
    return spec.limit && spec.limit > 0 ? s.slice(0, spec.limit) : s;
  }, [base, round, spec.limit]);

  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [done, setDone] = useState(false);

  const item = deck[i] ?? base[0];
  const options = useMemo(
    () => (mode === "choose" && item ? optionsFor(item, base, choices) : []),
    [mode, item, base, choices],
  );

  if (deck.length === 0 || !item) return null;
  const total = deck.length;

  const record = (ok: boolean) => {
    if (ok) {
      setScore((s) => s + 1);
      const v = streak + 1; // `streak` is this render's value — fine inside a click handler
      setStreak(v);
      setBest((b) => Math.max(b, v));
    } else {
      setStreak(0);
    }
  };
  const next = () => {
    stop(); // don't let this card's answer play over the next one
    setRevealed(false);
    setPicked(null);
    if (i + 1 >= total) setDone(true);
    else setI(i + 1);
  };
  const restart = () => {
    stop();
    setRound((r) => r + 1);
    setI(0); setRevealed(false); setPicked(null);
    setScore(0); setStreak(0); setBest(0); setDone(false);
  };

  const reveal = () => { setRevealed(true); speak(item.say ?? `${item.sayFront ?? item.front}: ${item.back}`); };
  const grade = (ok: boolean) => { record(ok); next(); };
  const pick = (opt: string) => {
    if (picked !== null) return;
    setPicked(opt);
    const ok = opt === item.back;
    record(ok);
    speak(ok ? (item.say ?? `Certo! ${item.back}`) : `A resposta certa é ${item.say ?? item.back}`);
  };

  if (done) {
    const stars = starsFor(score, total);
    const perfect = score === total;
    return (
      <div className="widget drill-widget" data-mode={mode}>
        {perfect && <Confetti />}
        <div className="drill-done">
          <div className="drill-done__stars" aria-hidden="true">
            {[0, 1, 2].map((s) => (
              <Icon key={s} name="star" size={34} fill={s < stars ? "currentColor" : "none"} style={{ color: s < stars ? "var(--warn)" : "var(--ink-3)" }} />
            ))}
          </div>
          <strong className="drill-done__title">
            {perfect ? "Boa! Acertaste tudo! 🎉" : `Acertaste ${score} de ${total}!`}
          </strong>
          <p className="drill-done__sub">Melhor sequência seguida: {best} 🔥</p>
          <div className="drill-actions">
            <Speaker text={perfect ? `Boa! Acertaste as ${total}.` : `Acertaste ${score} de ${total}. A melhor sequência foi ${best}.`} label="Ouvir resultado" />
            <button type="button" className="drill-btn drill-btn--go" onClick={restart}>
              <Icon name="refresh" size={18} /> Recomeçar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="widget drill-widget" data-mode={mode}>
      <div className="w-head">
        <span className="w-badge"><Icon name="target" size={16} /> Treino</span>
        {spec.title && <strong>{spec.title}</strong>}
        <button type="button" className="drill-restart" onClick={restart} aria-label="Recomeçar" title="Recomeçar">
          <Icon name="refresh" size={16} />
        </button>
      </div>

      <div className="drill-meta">
        <span className="drill-count">{i + 1} / {total}</span>
        <span className="drill-bar"><i style={{ width: `${Math.round((i / total) * 100)}%` }} /></span>
        <span className="drill-chip" title="Certas"><Icon name="ok" size={14} /> {score}</span>
        <span className="drill-chip drill-chip--streak" title="Sequência" data-on={streak > 1 || undefined}>🔥 {streak}</span>
      </div>

      <div className={`drill-card ${revealed ? "is-flipped" : ""}`}>
        <div className="drill-front">
          {item.emoji && <span className="drill-emoji" aria-hidden="true">{item.emoji}</span>}
          <span className="drill-q">{item.front}</span>
          <Speaker text={item.sayFront ?? item.front} label="Ouvir a pergunta" className="drill-speak" />
        </div>
      </div>

      {mode === "flip" ? (
        !revealed ? (
          <div className="drill-actions">
            <button type="button" className="drill-btn drill-btn--go" onClick={reveal}>
              <Icon name="speaker" size={18} /> Ver e ouvir a resposta
            </button>
          </div>
        ) : (
          <>
            <div className="drill-answer">
              <span className="drill-a">{item.back}</span>
              <Speaker text={item.say ?? `${item.front} é ${item.back}`} label="Ouvir a resposta" className="drill-speak" />
            </div>
            <p className="drill-prompt">Conseguiste? Sê honesto! 🙂</p>
            <div className="drill-actions">
              <button type="button" className="drill-btn drill-btn--no" onClick={() => grade(false)}>
                Ainda não
              </button>
              <button type="button" className="drill-btn drill-btn--yes" onClick={() => grade(true)}>
                <Icon name="ok" size={18} /> Acertei!
              </button>
            </div>
          </>
        )
      ) : (
        <>
          <div className="drill-options">
            {options.map((opt) => {
              const state = picked === null ? "" : opt === item.back ? "right" : opt === picked ? "wrong" : "dim";
              return (
                <button key={opt} type="button" className={`drill-opt ${state}`} onClick={() => pick(opt)} disabled={picked !== null}>
                  {opt}
                  {state === "right" && <Icon name="ok" size={16} />}
                  {state === "wrong" && <Icon name="close" size={16} />}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="drill-actions">
              <span className={`drill-feedback ${picked === item.back ? "ok" : "no"}`}>
                {picked === item.back ? "Certo! 🎉" : `Era ${item.back}`}
              </span>
              <button type="button" className="drill-btn drill-btn--go" onClick={next}>
                Seguinte <Icon name="forward" size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
