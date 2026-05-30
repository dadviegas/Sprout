import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { Speaker } from "../Speaker";
import { Confetti } from "../Confetti";
import { speak } from "../speak";
import { MoneyToken, fmt, sayAmount } from "./Money";
import { CATALOG, PRODUCT_ART, type ShopCat, type ShopProduct } from "./shop-catalog";

/* The Sprout shop — a play till. The child fills a basket from ~50 toys and
 * foods, then pays at the counter with real euro notes and coins. Coins pile up
 * (two 20€ notes for a 21€ basket is fine), and when they overpay the till works
 * out the change. It's a money-handling sandbox, so there's no "wrong" — just
 * "ainda faltam…", "certinho!" or "o teu troco é…". Read-aloud throughout. */

export interface ShopSpec {
  title?: string;
  /** Restrict the shelves to these product ids (defaults to the whole catalogue). */
  only?: string[];
}

// Notes + coins the till offers, biggest first (pay big, top up with small).
// Includes 2c and 1c so odd-cent prices (e.g. 10,66 €) can be paid exactly.
const PALETTE = [50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
// Every value the till can hand back as change, biggest first (greedy makes change).
const CHANGE_VALUES = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

const cents = (v: number) => Math.round(v * 100);

// Notes (5€+) and coins (under 5€), split so the palette reads in two tidy rows.
const NOTES = PALETTE.filter((v) => v >= 5);
const COINS = PALETTE.filter((v) => v < 5);

/** Hand back change the way a till does: as few notes/coins as possible. */
function makeChange(amount: number): number[] {
  let left = cents(amount);
  const out: number[] = [];
  for (const v of CHANGE_VALUES) {
    while (left >= cents(v)) {
      out.push(v);
      left -= cents(v);
    }
  }
  return out;
}

/** Count-up ("conta para a frente") hops from the price to what was paid: first
 *  round the cents up to a whole euro, then a single jump to the paid amount. */
function countUpSteps(totalC: number, paidC: number): { fromC: number; addC: number; toC: number }[] {
  const steps: { fromC: number; addC: number; toC: number }[] = [];
  let cur = totalC;
  if (cur % 100 !== 0) {
    const euro = Math.ceil(cur / 100) * 100;
    if (euro <= paidC) { steps.push({ fromC: cur, addC: euro - cur, toC: euro }); cur = euro; }
  }
  if (cur < paidC) steps.push({ fromC: cur, addC: paidC - cur, toC: paidC });
  return steps;
}

/** The notes-then-coins palette, reused by the till and the change game. Each
 *  tap also speaks the value aloud — feedback for a child who can't read yet. */
function PayPalette({ onPick }: { onPick: (v: number) => void }) {
  const pick = (v: number) => { speak(sayAmount(v)); onPick(v); };
  return (
    <div className="pay-groups">
      {[{ label: "Notas", set: NOTES }, { label: "Moedas", set: COINS }].map((g) => (
        <div key={g.label} className="pay-group">
          <span className="pay-group__label">{g.label}</span>
          <div className="coins pay-palette">
            {g.set.map((v) => (
              <button key={v} className="coin pay-coin" onClick={() => pick(v)} aria-label={`Pôr ${sayAmount(v)}`}>
                <MoneyToken value={v} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const CAT_TABS: { id: "tudo" | ShopCat; label: string; icon: IconName }[] = [
  { id: "tudo", label: "Tudo", icon: "grid" },
  { id: "brinquedo", label: "Brinquedos", icon: "teddy" },
  { id: "comida", label: "Comida", icon: "apple" },
];

function Art({ id }: { id: string }) {
  return (
    <svg className="shop-art" viewBox="0 0 48 48" aria-hidden="true">
      {PRODUCT_ART[id]}
    </svg>
  );
}

export function Shop({ spec }: { spec: ShopSpec }) {
  const shelves = spec.only?.length ? CATALOG.filter((p) => spec.only!.includes(p.id)) : CATALOG;

  const [cat, setCat] = useState<"tudo" | ShopCat>("tudo");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<"loja" | "caixa">("loja");
  const [paid, setPaid] = useState<Record<number, number>>({});

  const rootRef = useRef<HTMLDivElement>(null);
  // Moving to the till, glide the shop's top into view (with a smooth scroll) so
  // the receipt and coins land right where the child is looking — not mid-shelf.
  useEffect(() => {
    if (phase === "caixa") rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase]);

  const products = shelves.filter((p) => cat === "tudo" || p.cat === cat);
  const lines = shelves.filter((p) => (cart[p.id] ?? 0) > 0);
  const count = lines.reduce((s, p) => s + cart[p.id], 0);
  const total = lines.reduce((s, p) => s + p.price * cart[p.id], 0);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const less = (id: string) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) - 1) }));
  const emptyCart = () => setCart({});
  const restart = () => {
    setCart({});
    setPaid({});
    setPhase("loja");
  };

  const sayCart =
    lines.length === 0
      ? "O carrinho está vazio."
      : `No carrinho tens: ${lines.map((p) => `${cart[p.id]} ${p.name}`).join(", ")}. Total: ${sayAmount(total)}.`;

  return (
    <div className="widget shop-widget" ref={rootRef}>
      <div className="w-head">
        <span className="w-badge"><Icon name="cart" size={16} /> Loja do Sprout</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">{phase === "loja" ? "Enche o carrinho" : "Hora de pagar"}</span>
      </div>

      {phase === "loja" ? (
        <>
          <div className="shop-tabs">
            {CAT_TABS.map((t) => (
              <button
                key={t.id}
                className={`shop-tab ${cat === t.id ? "on" : ""}`}
                onClick={() => setCat(t.id)}
                aria-pressed={cat === t.id}
              >
                <Icon name={t.icon} size={18} /> {t.label}
              </button>
            ))}
          </div>

          <div className="shop-grid">
            {products.map((p) => {
              const qty = cart[p.id] ?? 0;
              return (
                <div key={p.id} className={`shop-card ${qty ? "in-cart" : ""}`}>
                  <Speaker
                    text={`${p.name}, ${sayAmount(p.price)}`}
                    className="shop-card__hear"
                    size={15}
                    label={`Ouvir: ${p.name}`}
                  />
                  {qty > 0 && <span className="shop-card__badge">{qty}</span>}
                  <button className="shop-card__buy" onClick={() => add(p.id)} aria-label={`Juntar ${p.name} ao carrinho`}>
                    <Art id={p.id} />
                    <span className="shop-card__name">{p.name}</span>
                    <span className="shop-card__price">{fmt(p.price)}</span>
                  </button>
                  {qty > 0 && (
                    <div className="shop-card__qty">
                      <button onClick={() => less(p.id)} aria-label={`Tirar um ${p.name}`}><Icon name="minus" size={16} /></button>
                      <b aria-label={`${qty} no carrinho`}>{qty}</b>
                      <button onClick={() => add(p.id)} aria-label={`Juntar outro ${p.name}`}><Icon name="plus" size={16} /></button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <ShopCart lines={lines} cart={cart} total={total} count={count} sayCart={sayCart}
            onMore={add} onLess={less} onEmpty={emptyCart} onPay={() => setPhase("caixa")} />
        </>
      ) : (
        <ShopCheckout lines={lines} cart={cart} total={total} sayCart={sayCart}
          paid={paid} setPaid={setPaid} onBack={() => setPhase("loja")} onRestart={restart} />
      )}
    </div>
  );
}

/* ---- the basket (shown under the shelves while shopping) ---- */
function ShopCart({
  lines, cart, total, count, sayCart, onMore, onLess, onEmpty, onPay,
}: {
  lines: ShopProduct[];
  cart: Record<string, number>;
  total: number;
  count: number;
  sayCart: string;
  onMore: (id: string) => void;
  onLess: (id: string) => void;
  onEmpty: () => void;
  onPay: () => void;
}) {
  return (
    <div className={`shop-cart ${lines.length ? "" : "empty"}`}>
      <div className="shop-cart__head">
        <Icon name="cart" size={20} />
        <strong>O teu carrinho</strong>
        {count > 0 && <span className="shop-cart__count">{count}</span>}
        <Speaker text={sayCart} className="prose-speak" label="Ouvir o carrinho" />
      </div>

      {lines.length === 0 ? (
        <p className="w-hint">Toca num produto para o pores no carrinho. 👆</p>
      ) : (
        <>
          <ul className="shop-cart__list">
            {lines.map((p) => (
              <li key={p.id}>
                <svg className="shop-art shop-art--mini" viewBox="0 0 48 48" aria-hidden="true">{PRODUCT_ART[p.id]}</svg>
                <span className="shop-cart__name">{p.name}</span>
                <span className="shop-cart__qtybox">
                  <button onClick={() => onLess(p.id)} aria-label={`Tirar um ${p.name}`}><Icon name="minus" size={15} /></button>
                  <b>{cart[p.id]}</b>
                  <button onClick={() => onMore(p.id)} aria-label={`Juntar outro ${p.name}`}><Icon name="plus" size={15} /></button>
                </span>
                <span className="shop-cart__line">{fmt(p.price * cart[p.id])}</span>
              </li>
            ))}
          </ul>
          <div className="shop-cart__foot">
            <span className="shop-total">A pagar: <strong>{fmt(total)}</strong></span>
            <button className="pill ghost" onClick={onEmpty}><Icon name="trash" size={18} /> Esvaziar</button>
            <button className="pill primary shop-pay-btn" onClick={onPay}>Ir pagar <Icon name="arrowRight" size={18} /></button>
          </div>
        </>
      )}
    </div>
  );
}

/* ---- the counter: pay with notes + coins, get the change worked out ---- */
function ShopCheckout({
  lines, cart, total, sayCart, paid, setPaid, onBack, onRestart,
}: {
  lines: ShopProduct[];
  cart: Record<string, number>;
  total: number;
  sayCart: string;
  paid: Record<number, number>;
  setPaid: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  onBack: () => void;
  onRestart: () => void;
}) {
  const paidTotal = PALETTE.reduce((s, v) => s + v * (paid[v] ?? 0), 0);
  const tray = PALETTE.filter((v) => (paid[v] ?? 0) > 0);
  const diffC = cents(paidTotal) - cents(total);
  const missing = (cents(total) - cents(paidTotal)) / 100;
  const changeAmount = diffC / 100;

  const addToken = (v: number) => setPaid((p) => ({ ...p, [v]: (p[v] ?? 0) + 1 }));
  const removeToken = (v: number) => setPaid((p) => ({ ...p, [v]: Math.max(0, (p[v] ?? 0) - 1) }));
  const clearTokens = () => setPaid({});

  let feedback: { tone: "ask" | "good" | "win"; text: string } = { tone: "ask", text: "" };
  if (paidTotal === 0) feedback = { tone: "ask", text: "Toca nas notas e moedas para pagares. 👇" };
  else if (diffC < 0) feedback = { tone: "ask", text: `Ainda faltam ${fmt(missing)}.` };
  else if (diffC === 0) feedback = { tone: "win", text: "Boa! Pagaste o valor certinho! 🎉" };
  else feedback = { tone: "good", text: "Pagaste a mais! Agora descobre o troco. 🔎" };

  const done = paidTotal > 0 && diffC >= 0;
  const change = diffC > 0 ? makeChange(changeAmount) : [];

  const count = lines.reduce((s, p) => s + cart[p.id], 0);
  const tokensUsed = Object.values(paid).reduce((s, n) => s + n, 0);
  const minTokens = makeChange(paidTotal).length; // fewest notes/coins for what was paid

  // ---- the change game: the child builds the troco; the answer and the
  // count-up method stay hidden behind buttons so they work it out first. ----
  const [showChange, setShowChange] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [tryChange, setTryChange] = useState<Record<number, number>>({});
  const tryTotal = PALETTE.reduce((s, v) => s + v * (tryChange[v] ?? 0), 0);
  const tryTray = PALETTE.filter((v) => (tryChange[v] ?? 0) > 0);
  const tryExact = diffC > 0 && cents(tryTotal) === diffC;
  const addTry = (v: number) => setTryChange((c) => ({ ...c, [v]: (c[v] ?? 0) + 1 }));
  const removeTry = (v: number) => setTryChange((c) => ({ ...c, [v]: Math.max(0, (c[v] ?? 0) - 1) }));
  // No overpayment (or back to exact/under) → reset the change game.
  useEffect(() => {
    if (diffC <= 0) { setShowChange(false); setShowCount(false); setTryChange({}); }
  }, [diffC]);

  return (
    <div className="shop-checkout">
      <button className="pill ghost shop-back" onClick={onBack}><Icon name="back" size={18} /> Voltar à loja</button>

      <div className="shop-receipt">
        <div className="shop-receipt__head">
          <Icon name="cart" size={18} /> <strong>A tua compra</strong>
          <Speaker text={sayCart} className="prose-speak" label="Ouvir a compra" />
        </div>
        <ul>
          {lines.map((p) => (
            <li key={p.id}>
              <span>{cart[p.id]}× {p.name}</span>
              <span>{fmt(p.price * cart[p.id])}</span>
            </li>
          ))}
        </ul>
        <div className="shop-receipt__total">
          <span>A pagar</span>
          <strong>{fmt(total)}</strong>
          <Speaker text={`Tens de pagar ${sayAmount(total)}`} className="prose-speak" size={16} label="Ouvir o preço" />
        </div>
      </div>

      <p className="shop-step">Escolhe notas e moedas até dar (ou passar) o valor:</p>
      <PayPalette onPick={addToken} />

      <div className={`pay-tray ${tray.length ? "" : "empty"}`}>
        {tray.length === 0 ? (
          <span className="w-hint">As notas e moedas que dás ficam aqui. 👇</span>
        ) : (
          tray.map((v) => (
            <button key={v} className="coin pay-coin pay-chip" onClick={() => removeToken(v)} aria-label={`Tirar um ${sayAmount(v)}`}>
              <MoneyToken value={v} />
              {(paid[v] ?? 0) > 1 && <span className="pay-count">×{paid[v]}</span>}
            </button>
          ))
        )}
      </div>

      <div className="w-btnrow">
        <span className="stat-chip" style={{ fontSize: "1.05em" }}>
          Já deste: <strong>{fmt(paidTotal)}</strong>
          {done && <Icon name="check" size={16} style={{ color: "var(--ok)", verticalAlign: "-2px" }} />}
        </span>
        <Speaker text={`Já deste ${sayAmount(paidTotal)}`} className="prose-speak" label="Ouvir o que já deste" />
        <button className="pill ghost" onClick={clearTokens}><Icon name="trash" size={18} /> Recomeçar a pagar</button>
      </div>

      {feedback.text && (
        <div className={`feedback shop-feedback ${feedback.tone === "ask" ? "bad" : "good"}`}>
          <Icon name={feedback.tone === "ask" ? "info" : "check"} size={18} /> {feedback.text}
          <Speaker text={feedback.text} className="prose-speak" size={16} label="Ouvir" />
        </div>
      )}

      {diffC === 0 && (
        <p className="shop-tip">
          💡 Queres treinar o <strong>troco</strong>? Paga com uma <strong>nota maior</strong> — vais receber troco!
          <Speaker text="Queres treinar o troco? Paga com uma nota maior e vais receber troco." className="prose-speak" size={14} label="Ouvir a dica" />
        </p>
      )}

      {diffC > 0 && (
        <div className="shop-change">
          <div className="shop-change__head">
            <Icon name="coin" size={18} /> <strong>Vamos fazer o troco!</strong>
            <Speaker text={`Pagaste a mais. Tenta fazer o troco com as moedas e notas.`} className="prose-speak" size={16} label="Ouvir" />
          </div>
          <div className="shop-change__sum">
            <span>Deste <strong>{fmt(paidTotal)}</strong></span>
            <span className="shop-change__op">−</span>
            <span>a pagar <strong>{fmt(total)}</strong></span>
            <span className="shop-change__op">=</span>
            <span>troco <strong>?</strong></span>
            <Speaker text={`Deste ${sayAmount(paidTotal)}. A pagar eram ${sayAmount(total)}. Quanto é o troco?`} className="prose-speak" size={14} label="Ouvir as contas" />
          </div>
          <p className="shop-step">Junta o que a loja te deve devolver:</p>
          <PayPalette onPick={addTry} />
          <div className={`pay-tray ${tryTray.length ? "" : "empty"}`}>
            {tryTray.length === 0 ? (
              <span className="w-hint">Põe aqui o troco que achas certo. 👇</span>
            ) : (
              tryTray.map((v) => (
                <button key={v} className="coin pay-coin pay-chip" onClick={() => removeTry(v)} aria-label={`Tirar um ${sayAmount(v)}`}>
                  <MoneyToken value={v} />
                  {(tryChange[v] ?? 0) > 1 && <span className="pay-count">×{tryChange[v]}</span>}
                </button>
              ))
            )}
          </div>
          <div className="w-btnrow">
            <span className="stat-chip" style={{ fontSize: "1.05em" }}>
              O teu troco: <strong>{fmt(tryTotal)}</strong>
              {tryExact && <Icon name="check" size={16} style={{ color: "var(--ok)", verticalAlign: "-2px" }} />}
            </span>
            <button className="pill ghost" onClick={() => setShowCount((s) => !s)}>
              👣 {showCount ? "Esconder a ajuda" : "Conta para a frente"}
            </button>
            <button className="pill ghost" onClick={() => setShowChange((s) => !s)}>
              <Icon name="coin" size={16} /> {showChange ? "Esconder a resposta" : "Ver a resposta"}
            </button>
          </div>
          {showCount && (
            <div className="shop-count">
              <strong className="shop-count__title">👣 Conta para a frente, do preço até ao que deste:</strong>
              <div className="shop-count__steps">
                {countUpSteps(cents(total), cents(paidTotal)).map((s, i) => (
                  <span key={i} className="shop-count__hop">
                    {fmt(s.fromC / 100)} <b>+{fmt(s.addC / 100)}</b> → {fmt(s.toC / 100)}
                  </span>
                ))}
              </div>
              <p className="shop-step" style={{ margin: "8px 0 0" }}>Soma os saltos (a parte de cima) — esse é o troco!</p>
            </div>
          )}
          {tryExact && (
            <div className="feedback good">
              <Icon name="check" size={18} /> Boa! Fizeste o troco certinho — {fmt(changeAmount)}! 🎉
              <Speaker text={`Boa! O troco é ${sayAmount(changeAmount)}.`} className="prose-speak" size={16} label="Ouvir" />
            </div>
          )}
          {showChange && (
            <div className="shop-change__answer">
              <div className="shop-change__head">
                A resposta: <strong>{fmt(changeAmount)}</strong>
                <Speaker text={`O troco é ${sayAmount(changeAmount)}`} className="prose-speak" size={16} label="Ouvir o troco" />
              </div>
              <div className="coins">
                {change.map((v, i) => (
                  <span key={i} className="coin" style={{ opacity: 1, cursor: "default" }}>
                    <MoneyToken value={v} />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {done && (
        <div className="shop-done">
          <div className="shop-done__summary">
            <Icon name="check" size={18} />
            <span>
              Compraste <strong>{count}</strong> {count === 1 ? "coisa" : "coisas"}, pagaste <strong>{fmt(paidTotal)}</strong>
              {diffC > 0 ? <> e recebes <strong>{fmt(changeAmount)}</strong> de troco</> : <> — certinho</>}. Obrigado! 🛍️
            </span>
            <Speaker
              text={`Compraste ${count} ${count === 1 ? "coisa" : "coisas"}, pagaste ${sayAmount(paidTotal)}${diffC > 0 ? ` e recebes ${sayAmount(changeAmount)} de troco` : ", certinho"}. Obrigado!`}
              className="prose-speak"
              size={16}
              label="Ouvir o resumo"
            />
          </div>
          {tokensUsed > minTokens + 2 && (
            <p className="shop-tip">💡 Da próxima, tenta pagar com menos notas e moedas!</p>
          )}
          <button className="pill primary" onClick={onRestart}><Icon name="refresh" size={18} /> Comprar outra vez</button>
        </div>
      )}
      {(diffC === 0 || tryExact) && <Confetti key={tryExact ? "troco" : "pago"} />}
    </div>
  );
}
