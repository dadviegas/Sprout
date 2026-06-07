import { useId, useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";
import { Confetti } from "../Confetti";

/** A value to display in "show" mode: either a bare amount or one with a caption
 *  (e.g. the colour of the note — "azul" — to learn it by sight). */
export type MoneyShowItem = number | { v: number; note?: string };

export interface MoneySpec {
  // "collect" mode (mealheiro): toggle a fixed set of coins to reach a target.
  items?: number[]; // values in euros, e.g. [1, 0.5, 0.2]
  target?: number; // optional goal in euros
  // "pay" mode (caixa): build up a price from a palette of notes + coins.
  price?: number; // the amount to pay, in euros
  palette?: number[]; // which notes/coins to offer (defaults to a kid-friendly set)
  // "show" mode (mostruário): a gallery of coins/notes, each tap-to-hear.
  show?: MoneyShowItem[];
  // shared
  mode?: "collect" | "pay" | "show"; // inferred from price/show/items when omitted
  title?: string;
}

// Every euro coin and note value. Notes go up to 500€ (the biggest there is).
const EURO_VALUES = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500];
export const PAY_PALETTE = [50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01]; // big → small; 2c+1c so odd cents are payable

function label(v: number): string {
  return v < 1 ? `${Math.round(v * 100)}c` : `${v % 1 === 0 ? v : v.toFixed(2).replace(".", ",")}€`;
}

/** "3,50 €" — the canonical way a price is written, reused by every money widget. */
export function fmt(v: number): string {
  return `${v.toFixed(2).replace(".", ",")} €`;
}

/** Spoken amount: "3 euros e 50 cêntimos". */
export function sayAmount(v: number): string {
  const euros = Math.floor(v + 1e-9);
  const cents = Math.round((v - euros) * 100);
  const parts: string[] = [];
  if (euros) parts.push(`${euros} ${euros === 1 ? "euro" : "euros"}`);
  if (cents) parts.push(`${cents} cêntimos`);
  return parts.join(" e ") || "zero euros";
}

/* ---- the look of a single euro coin or note — the ONE place money is drawn,
   so every widget (and every lesson) shows the same coins and notes. ---- */

// Real euro note colours, so a child learns to recognise each by sight.
const NOTE_LOOK: Record<number, { from: string; to: string; ink: string }> = {
  5: { from: "#d7d2c8", to: "#a8a298", ink: "#3a382f" }, // cinzenta
  10: { from: "#e7918a", to: "#c2554c", ink: "#fff" }, // vermelha
  20: { from: "#83abe0", to: "#4d79bd", ink: "#fff" }, // azul
  50: { from: "#f0b15f", to: "#d88634", ink: "#5a3410" }, // laranja
  100: { from: "#85cb9b", to: "#4ba673", ink: "#fff" }, // verde
  200: { from: "#ecd66c", to: "#d4b73f", ink: "#5a4d10" }, // amarela
  500: { from: "#c5a8d8", to: "#9b6fbf", ink: "#fff" }, // roxa
};

// Coin metals: copper cents, "gold" cents, and the two-tone 1€/2€ coins.
function coinLook(v: number): { ring?: string; from: string; to: string; ink: string } {
  if (v < 0.1) return { from: "#dd9355", to: "#a85f2c", ink: "#4a2410" }; // 1c, 2c, 5c — cobre
  if (v < 1) return { from: "#f1d978", to: "#c9a637", ink: "#4a3a10" }; // 10c, 20c, 50c — dourada
  if (v === 1) return { ring: "#dcd6c6", from: "#ecc94f", to: "#c9a637", ink: "#4a3a10" }; // prata fora, ouro dentro
  return { ring: "#ecc94f", from: "#dcd6c6", to: "#aaa495", ink: "#3a3320" }; // 2€: ouro fora, prata dentro
}

/** A friendly little face — eyes, a smile and rosy cheeks — that turns every
 *  coin and note into a character a child wants to tap. Drawn in SVG user units
 *  centred on (cx, cy); `r` scales the whole face, `color` inks the eyes/smile. */
function Smiley({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const eyeDx = r * 0.42, eyeY = cy - r * 0.16, eyeR = r * 0.16, sm = r * 0.5;
  return (
    <g>
      <circle cx={cx - r * 0.62} cy={cy + r * 0.28} r={r * 0.18} fill="#ff8aa0" opacity={0.55} />
      <circle cx={cx + r * 0.62} cy={cy + r * 0.28} r={r * 0.18} fill="#ff8aa0" opacity={0.55} />
      <circle cx={cx - eyeDx} cy={eyeY} r={eyeR} fill={color} />
      <circle cx={cx + eyeDx} cy={eyeY} r={eyeR} fill={color} />
      <path d={`M ${cx - sm} ${cy + r * 0.18} Q ${cx} ${cy + r * 0.72} ${cx + sm} ${cy + r * 0.18}`}
            fill="none" stroke={color} strokeWidth={r * 0.16} strokeLinecap="round" />
    </g>
  );
}

/** One coin or note, drawn from its value. `value >= 5` → a note; otherwise a coin.
 *  Each is an inline <svg>: real euro colours (so a child learns it by sight) plus
 *  a smiling face. The same token shows in the mealheiro, the till and the gallery. */
export function MoneyToken({ value }: { value: number }) {
  const uid = useId().replace(/:/g, "");
  if (value >= 5) {
    const n = NOTE_LOOK[value] ?? NOTE_LOOK[5];
    const lbl = label(value);
    return (
      <span className="money-token money-token--note">
        <svg viewBox="0 0 120 72" className="mtoken-svg">
          <defs>
            <linearGradient id={`mg-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={n.from} /><stop offset="1" stopColor={n.to} />
            </linearGradient>
            <linearGradient id={`mh-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.6" /><stop offset="1" stopColor="#fff" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <rect width="120" height="72" fill={`url(#mg-${uid})`} />
          <rect x="4" y="4" width="112" height="64" rx="7" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5" />
          <rect x="104" y="12" width="7" height="48" rx="3.5" fill={`url(#mh-${uid})`} />
          {/* a smiling portrait, where a real note shows a serious face */}
          <circle cx="30" cy="36" r="19" fill="#fff" fillOpacity="0.9" />
          <circle cx="30" cy="36" r="19" fill="none" stroke={n.to} strokeOpacity="0.5" strokeWidth="1.5" />
          <Smiley cx={30} cy={36} r={13} color={n.to} />
          <text x="76" y="36" textAnchor="middle" dominantBaseline="central" className="mtoken-num" fontSize={lbl.length >= 4 ? 17 : 23} fill={n.ink}>{lbl}</text>
          <text x="76" y="54" textAnchor="middle" className="mtoken-euro" fontSize="9" fill={n.ink}>EURO</text>
        </svg>
      </span>
    );
  }
  const c = coinLook(value);
  return (
    <span className="money-token money-token--coin">
      <svg viewBox="0 0 64 64" className="mtoken-svg">
        <defs>
          <radialGradient id={`mc-${uid}`} cx="0.36" cy="0.3" r="0.75">
            <stop offset="0" stopColor={c.from} /><stop offset="1" stopColor={c.to} />
          </radialGradient>
        </defs>
        {c.ring ? (
          <>
            <circle cx="32" cy="32" r="32" fill={c.ring} />
            <circle cx="32" cy="32" r="22" fill={`url(#mc-${uid})`} />
            <circle cx="32" cy="32" r="22" fill="none" stroke="#000" strokeOpacity="0.16" strokeWidth="1.5" />
          </>
        ) : (
          <circle cx="32" cy="32" r="32" fill={`url(#mc-${uid})`} />
        )}
        <circle cx="32" cy="32" r="29.5" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="2" />
        <Smiley cx={32} cy={23} r={12} color={c.ink} />
        <text x="32" y="47" textAnchor="middle" dominantBaseline="central" className="mtoken-num" fontSize="17" fill={c.ink}>{label(value)}</text>
      </svg>
    </span>
  );
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
          <button key={i} className={`coin ${picked[i] ? "picked" : ""}`} onClick={() => toggle(i)} aria-label={`${label(v)} ${picked[i] ? "no mealheiro" : ""}`}>
            <MoneyToken value={v} />
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
          <button key={v} className="coin pay-coin" onClick={() => add(v)} aria-label={`Juntar ${label(v)}`}>
            <MoneyToken value={v} />
          </button>
        ))}
      </div>

      <div className={`pay-tray ${tray.length ? "" : "empty"}`}>
        {tray.length === 0 ? (
          <span className="w-hint">Toca nas notas e moedas para as pôres aqui. 👇</span>
        ) : (
          tray.map((v) => (
            <button key={v} className="coin pay-coin pay-chip" onClick={() => remove(v)} aria-label={`Tirar um ${label(v)}`}>
              <MoneyToken value={v} />
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

/* ---- show mode: a gallery of coins/notes, each tap-to-hear (no goal) ---- */
function ShowMoney({ spec }: { spec: MoneySpec }) {
  const items = spec.show ?? spec.items ?? [];
  return (
    <div className="widget money-widget show-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="coin" size={16} /> Moedas e notas</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca para ouvir</span>
      </div>
      <div className="coins money-gallery">
        {items.map((it, i) => {
          const v = typeof it === "number" ? it : it.v;
          const note = typeof it === "number" ? undefined : it.note;
          return (
            <button key={i} className="coin pay-coin money-show" onClick={() => speak(sayAmount(v))} aria-label={`Ouvir: ${sayAmount(v)}`}>
              <MoneyToken value={v} />
              {note && <span className="money-show__cap">{note}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Money({ spec }: { spec: MoneySpec }) {
  const mode = spec.mode ?? (spec.price != null ? "pay" : spec.show != null ? "show" : "collect");
  if (mode === "pay") return <PayMoney spec={spec} />;
  if (mode === "show") return <ShowMoney spec={spec} />;
  return <CollectMoney spec={spec} />;
}
