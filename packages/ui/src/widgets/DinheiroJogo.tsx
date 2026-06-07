import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";
import { Confetti } from "../Confetti";
import { colorVar } from "./geo";
import { buildSheet, answerMatches, type Op } from "./conta-armada-engine";
import { ContaSheet } from "./ContaArmada";
import { MoneyToken, fmt, sayAmount, PAY_PALETTE } from "./Money";
import { makeMoneyProblem, MONEY_LEVELS, clampLevel, type MoneyProblem } from "./dinheiro-jogo-data";

/* DinheiroJogo — "O Jogo do Dinheiro". A playful, levelled money game built on
 * top of the conta-armada engine. Each round gives the child a money WORD
 * PROBLEM (read aloud — they may not read yet), arms the matching conta so they
 * can solve it step by step, then asks them to PAY/FORM the amount with real
 * coins and notes. Get both right → a star; fill the level meter → level up.
 *
 * The four levels drill the four operations with flavour from three kid themes
 * (loja, mealheiro, feira); see dinheiro-jogo-data.ts. Everything reuses what's
 * already here: buildSheet + ContaSheet (the conta), MoneyToken/fmt/sayAmount
 * (the money), Confetti + Speaker. Speech only ever fires from a tap.
 *
 * Markdown usage:  ```dinheirojogo
 *                  { "startLevel": 1 }
 *                  ```
 */

export interface DinheiroJogoSpec {
  title?: string;
  /** which level to start on, 1–4 (default 1) */
  startLevel?: number;
  /** subject colour key (default "mat") */
  color?: string;
}

const OP_ICON: Record<Op, IconName> = { add: "plus", sub: "minus", mul: "times", div: "divide" };
const GOAL = 3; // stars to clear a level

/* ---------- pay step: tap notes + coins to form an exact amount ---------- */

function CoinPay({ target, tint, onExact }: { target: number; tint: string; onExact: () => void }) {
  const [counts, setCounts] = useState<Record<number, number>>({});
  const fired = useRef(false);

  const total = PAY_PALETTE.reduce((s, v) => s + v * (counts[v] ?? 0), 0);
  const exact = target > 0 && Math.abs(total - target) < 0.001;
  const missing = target - total;
  const tray = PAY_PALETTE.filter((v) => (counts[v] ?? 0) > 0);

  const add = (v: number) => setCounts((c) => ({ ...c, [v]: (c[v] ?? 0) + 1 }));
  const remove = (v: number) => setCounts((c) => ({ ...c, [v]: Math.max(0, (c[v] ?? 0) - 1) }));

  // Reaching the exact amount completes the round (fires once; the parent then
  // swaps to the "done" view, unmounting this).
  useEffect(() => {
    if (exact && !fired.current) {
      fired.current = true;
      onExact();
    }
  }, [exact, onExact]);

  return (
    <div className="dj-coinpay">
      <div className="coins dj-coinpay__palette">
        {PAY_PALETTE.map((v) => (
          <button key={v} type="button" className="coin pay-coin" onClick={() => add(v)} aria-label={`Juntar ${sayAmount(v)}`}>
            <MoneyToken value={v} />
          </button>
        ))}
      </div>

      <div className={`pay-tray ${tray.length ? "" : "empty"}`}>
        {tray.length === 0 ? (
          <span className="w-hint">Toca nas notas e moedas para as pôres aqui. 👇</span>
        ) : (
          tray.map((v) => (
            <button key={v} type="button" className="coin pay-coin pay-chip" onClick={() => remove(v)} aria-label={`Tirar um ${sayAmount(v)}`}>
              <MoneyToken value={v} />
              {(counts[v] ?? 0) > 1 && <span className="pay-count" style={{ background: tint }}>×{counts[v]}</span>}
            </button>
          ))
        )}
      </div>

      <div className="dj-coinpay__foot">
        <span className="stat-chip">Já tens: <strong>{fmt(total)}</strong></span>
        {total > 0 && !exact && (
          <span className="w-hint">{missing > 0 ? `Faltam ${fmt(missing)}.` : `Tens ${fmt(-missing)} a mais — tira uma moeda.`}</span>
        )}
      </div>
    </div>
  );
}

/* ---------- the game ---------- */

export function DinheiroJogo({ spec }: { spec: DinheiroJogoSpec }) {
  const tint = colorVar(spec.color ?? "mat");
  const start = clampLevel(spec.startLevel ?? 1);

  const [level, setLevel] = useState(start);
  const [problem, setProblem] = useState<MoneyProblem>(() => makeMoneyProblem(start));
  const [round, setRound] = useState(0); // bumped each new problem → resets the conta + inputs
  const [guess, setGuess] = useState("");
  const [phase, setPhase] = useState<"solve" | "pay" | "done">("solve");
  const [wrong, setWrong] = useState(false);
  const [stars, setStars] = useState(0); // total stars earned this session
  const [levelStars, setLevelStars] = useState(0); // progress toward the current level's goal
  const [leveledUp, setLeveledUp] = useState(false);

  const sheet = useMemo(() => buildSheet(problem.op, problem.a, problem.b), [problem]);
  const target = Number(sheet.answer.replace(",", ".")); // the money amount to form

  const loadProblem = (lv: number) => {
    setProblem(makeMoneyProblem(lv));
    setRound((r) => r + 1);
    setGuess("");
    setWrong(false);
    setPhase("solve");
    setLeveledUp(false);
  };

  const pickLevel = (lv: number) => {
    if (lv === level) return;
    setLevel(lv);
    setLevelStars(0);
    loadProblem(lv);
  };

  const check = () => {
    if (answerMatches(guess, sheet.answer)) {
      setWrong(false);
      setPhase("pay");
      speak("Boa, acertaste na conta! Agora paga com as moedas.");
    } else {
      setWrong(true);
      speak("Quase! Carrega em Próximo na conta para te ajudar e tenta outra vez.");
    }
  };

  const onPaid = () => {
    setStars((s) => s + 1);
    const reached = levelStars + 1;
    if (reached >= GOAL && level < 4) {
      setLevel(level + 1);
      setLevelStars(0);
      setLeveledUp(true);
      speak(`Boa! Pagaste certinho e subiste para o nível ${level + 1}!`);
    } else {
      setLevelStars(Math.min(GOAL, reached));
      speak("Boa! Pagaste certinho! Ganhaste uma estrela.");
    }
    setPhase("done");
  };

  const level4Maxed = level === 4 && levelStars >= GOAL;

  return (
    <div className="widget dinheirojogo-widget">
      <div className="w-head">
        <span className="w-badge" style={{ background: tint }}>
          <Icon name="coin" size={16} /> Jogo do Dinheiro
        </span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="dj-wallet" title="Estrelas ganhas">
          <Icon name="star" size={16} /> {stars}
        </span>
      </div>

      {/* level picker + progress meter */}
      <div className="dj-levels">
        {MONEY_LEVELS.map((l) => (
          <button
            key={l.n}
            type="button"
            className="dj-level"
            data-active={l.n === level || undefined}
            onClick={() => pickLevel(l.n)}
            style={l.n === level ? { background: tint, borderColor: tint } : undefined}
          >
            <span className="dj-level__n">{l.n}</span>
            <Icon name={OP_ICON[l.op]} size={14} /> {l.title}
          </button>
        ))}
      </div>
      <div className="dj-meter" aria-label={`Nível ${level}: ${levelStars} de ${GOAL} estrelas`}>
        <span className="dj-meter__lbl" style={{ color: tint }}>Nível {level}</span>
        {Array.from({ length: GOAL }).map((_, i) => (
          <span key={i} className="dj-meter__star" data-on={i < levelStars || undefined} style={i < levelStars ? { color: tint } : undefined}>
            <Icon name="star" size={18} />
          </span>
        ))}
      </div>

      {/* the scene: emoji, story, big read-aloud */}
      <div className="dj-scene">
        <span className="dj-scene__emoji" aria-hidden="true">{problem.emoji}</span>
        <p className="dj-scene__story">{problem.story}</p>
        <Speaker text={problem.say} size={20} className="prose-speak dj-scene__speak" label="Ouvir o problema" />
      </div>

      {/* the armed conta — step through it for help (one column at a time) */}
      <p className="dj-hint">
        Resolve a conta. Se precisares, carrega em <strong>Próximo</strong> para veres uma coluna de cada vez. 👇
      </p>
      <ContaSheet key={round} sheet={sheet} tint={tint} op={problem.op} />

      {phase === "solve" && (
        <div className="ca-check dj-answer">
          <label className="ca-field">
            <span className="ca-field__lbl">A tua resposta (em €)</span>
            <input
              className="ca-num ca-num--wide"
              inputMode="decimal"
              placeholder="?"
              value={guess}
              onChange={(e) => { setGuess(e.target.value); setWrong(false); }}
              onKeyDown={(e) => { if (e.key === "Enter" && guess.trim()) check(); }}
              aria-label="A tua resposta em euros"
            />
          </label>
          <button type="button" className="pill ca-solve" onClick={check} disabled={!guess.trim()} style={{ background: tint, borderColor: tint }}>
            <Icon name="target" size={16} /> Verificar
          </button>
        </div>
      )}

      {phase === "solve" && wrong && (
        <div className="ca-verdict">
          <Icon name="refresh" size={18} />
          Quase! A conta acima ajuda-te — vai a <strong>Próximo</strong> e tenta de novo. 💪
        </div>
      )}

      {phase === "pay" && (
        <div className="dj-pay">
          <div className="dj-pay__head">
            <span className="w-badge" style={{ background: tint }}><Icon name="coin" size={15} /> {problem.payVerb}</span>
          </div>
          <div className="dj-pay__target">
            A formar: <strong>{fmt(target)}</strong>
            <Speaker text={`Tens de formar ${sayAmount(target)} com as moedas e notas.`} size={16} label="Ouvir a quantia" />
          </div>
          <CoinPay target={target} tint={tint} onExact={onPaid} />
        </div>
      )}

      {phase === "done" && (
        <div className="dj-done">
          <div className="ca-verdict" data-ok>
            <Icon name={leveledUp ? "trophy" : "star"} size={20} />
            {leveledUp ? `Incrível! Resolveste e pagaste — subiste de nível! 🎉` : `Boa! Resolveste e pagaste certinho. Ganhaste uma estrela! ⭐`}
            <Speaker
              text={leveledUp ? "Incrível! Resolveste e pagaste, e subiste de nível!" : "Boa! Resolveste e pagaste certinho. Ganhaste uma estrela!"}
              size={16}
              label="Ouvir"
            />
          </div>
          <button type="button" className="pill ca-solve" onClick={() => loadProblem(level)} style={{ background: tint, borderColor: tint }}>
            <Icon name="forward" size={16} /> {level4Maxed ? "Mais um!" : "Próximo problema"}
          </button>
          <Confetti pieces={leveledUp ? 72 : 40} />
        </div>
      )}
    </div>
  );
}
