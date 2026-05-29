import { useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "../Speaker";
import { Confetti } from "../Confetti";

export interface MoneySpec {
  // "collect" mode (mealheiro): toggle a fixed set of coins to reach a target.
  items?: number[]; // values in euros, e.g. [1, 0.5, 0.2]
  target?: number; // optional goal in euros
  // "pay" mode (caixa): build up a price from a palette of notes + coins.
  price?: number; // the amount to pay, in euros
  palette?: number[]; // which notes/coins to offer (defaults to a kid-friendly set)
  // shared
  mode?: "collect" | "pay"; // inferred from price/items when omitted
  title?: string;
}

const EURO_VALUES = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];
const PAY_PALETTE = [20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05]; // big → small (pay big first)

function label(v: number): string {
  return v < 1 ? `${Math.round(v * 100)}c` : `${v % 1 === 0 ? v : v.toFixed(2).replace(".", ",")}€`;
}

function fmt(v: number): string {
  return `${v.toFixed(2).replace(".", ",")} €`;
}

/** Spoken amount: "3 euros e 50 cêntimos". */
function sayAmount(v: number): string {
  const euros = Math.floor(v + 1e-9);
  const cents = Math.round((v - euros) * 100);
  const parts: string[] = [];
  if (euros) parts.push(`${euros} ${euros === 1 ? "euro" : "euros"}`);
  if (cents) parts.push(`${cents} cêntimos`);
  return parts.join(" e ") || "zero euros";
}

function tokenStyle(v: number): React.CSSProperties {
  if (v >= 5) return { background: v >= 20 ? "#7ea6d8" : v >= 10 ? "#e08585" : "#cbb88a", borderRadius: 8, width: 78, height: 44 }; // notes
  const copper = v < 0.1;
  const gold = v < 1;
  return {
    background: copper ? "#c8814a" : gold ? "#e6c34d" : "#d9d2c2",
    borderRadius: "50%",
    width: 54,
    height: 54,
  };
}

/* ---- collect mode: tap coins to fill the mealheiro toward a goal ---- */
function CollectMoney({ spec }: { spec: MoneySpec }) {
  const items = (spec.items && spec.items.length ? spec.items : [1, 0.5, 0.2, 0.1, 0.05]).filter((v) => EURO_VALUES.includes(v));
  const [picked, setPicked] = useState<boolean[]>(() => items.map(() => false));
  const total = items.reduce((s, v, i) => s + (picked[i] ? v : 0), 0);
  const hit = spec.target != null && Math.abs(total - spec.target) < 0.001;

  const toggle = (i: number) =>
    setPicked((prev) => { const next = prev.slice(); next[i] = !next[i]; return next; });

  return (
    <div className="widget money-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="coin" size={16} /> Dinheiro</span>
        {spec.title && <strong>{spec.title}</strong>}
        {spec.target != null && <span className="w-hint">Objetivo: {fmt(spec.target)}</span>}
      </div>

      <div className="coins">
        {items.map((v, i) => (
          <button key={i} className={`coin ${picked[i] ? "picked" : ""}`} onClick={() => toggle(i)} style={tokenStyle(v)} aria-label={`${label(v)} ${picked[i] ? "no mealheiro" : ""}`}>
            {label(v)}
          </button>
        ))}
      </div>

      <div className="w-btnrow">
        <span className="stat-chip" style={{ fontSize: "1.05em" }}>
          Total: <strong>{fmt(total)}</strong> {hit ? <Icon name="check" size={16} style={{ color: "var(--ok)", verticalAlign: "-2px" }} /> : null}
        </span>
        <Speaker text={`Tenho ${sayAmount(total)}`} className="prose-speak" label="Ouvir total" />
        <button className="pill ghost" onClick={() => setPicked(items.map(() => false))}><Icon name="trash" size={18} /> Limpar</button>
      </div>
      {hit && <Confetti />}
    </div>
  );
}

/* ---- pay mode: build a price from notes + coins (tap to add as many as needed) ---- */
function PayMoney({ spec }: { spec: MoneySpec }) {
  const price = spec.price ?? 0;
  const palette = (spec.palette && spec.palette.length ? spec.palette : PAY_PALETTE)
    .filter((v) => EURO_VALUES.includes(v))
    .sort((a, b) => b - a);
  const [counts, setCounts] = useState<Record<number, number>>({});

  const total = palette.reduce((s, v) => s + v * (counts[v] ?? 0), 0);
  const exact = Math.abs(total - price) < 0.001;
  const over = total - price;
  const tray = palette.filter((v) => (counts[v] ?? 0) > 0);

  const add = (v: number) => setCounts((c) => ({ ...c, [v]: (c[v] ?? 0) + 1 }));
  const remove = (v: number) => setCounts((c) => ({ ...c, [v]: Math.max(0, (c[v] ?? 0) - 1) }));
  const clear = () => setCounts({});

  let feedback: { ok: boolean; text: string } | null = null;
  if (total > 0) {
    if (exact) feedback = { ok: true, text: "Boa! Pagaste certinho! 🎉" };
    else if (over > 0) feedback = { ok: true, text: `Chega! Pagaste a mais — o troco é ${fmt(over)}.` };
    else feedback = { ok: false, text: `Ainda faltam ${fmt(price - total)}.` };
  }

  return (
    <div className="widget money-widget pay-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="coin" size={16} /> Vamos pagar</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="pay-price">A pagar: {fmt(price)}
          <Speaker text={`Tens de pagar ${sayAmount(price)}`} className="prose-speak" size={16} label="Ouvir o preço" />
        </span>
      </div>

      <div className="coins pay-palette">
        {palette.map((v) => (
          <button key={v} className="coin pay-coin" onClick={() => add(v)} style={tokenStyle(v)} aria-label={`Juntar ${label(v)}`}>
            {label(v)}
          </button>
        ))}
      </div>

      <div className={`pay-tray ${tray.length ? "" : "empty"}`}>
        {tray.length === 0 ? (
          <span className="w-hint">Toca nas notas e moedas para as pôres aqui. 👇</span>
        ) : (
          tray.map((v) => (
            <button key={v} className="coin pay-coin pay-chip" onClick={() => remove(v)} style={tokenStyle(v)} aria-label={`Tirar um ${label(v)}`}>
              {label(v)}
              {(counts[v] ?? 0) > 1 && <span className="pay-count">×{counts[v]}</span>}
            </button>
          ))
        )}
      </div>

      <div className="w-btnrow">
        <span className="stat-chip" style={{ fontSize: "1.05em" }}>
          Já tens: <strong>{fmt(total)}</strong> {exact ? <Icon name="check" size={16} style={{ color: "var(--ok)", verticalAlign: "-2px" }} /> : null}
        </span>
        <Speaker text={`Já tens ${sayAmount(total)}`} className="prose-speak" label="Ouvir total" />
        <button className="pill ghost" onClick={clear}><Icon name="trash" size={18} /> Limpar</button>
      </div>

      {feedback && (
        <div className={`feedback ${feedback.ok ? "good" : "bad"}`}>
          <Icon name={feedback.ok ? "check" : "info"} size={18} /> {feedback.text}
        </div>
      )}
      {exact && <Confetti />}
    </div>
  );
}

export function Money({ spec }: { spec: MoneySpec }) {
  const mode = spec.mode ?? (spec.price != null ? "pay" : "collect");
  return mode === "pay" ? <PayMoney spec={spec} /> : <CollectMoney spec={spec} />;
}
