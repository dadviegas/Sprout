import { useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

/* FoodChain — who eats whom: the Sun feeds a plant, the plant feeds a small
 * animal, that animal feeds a bigger one… The arrow means "gives energy to / is
 * eaten by". Each link is a card with its role (produtor, consumidor, decompositor);
 * tap one to hear it. Read-aloud only on a tap. */
export interface FoodChainLink {
  emoji: string;
  name: string;
  /** producer / consumer / … shown as a small tag */
  role?: string;
  say?: string;
}

export interface FoodChainSpec {
  title?: string;
  chain: FoodChainLink[];
  /** read-aloud override for the whole chain */
  say?: string;
}

export function FoodChain({ spec }: { spec: FoodChainSpec }) {
  const chain = spec.chain ?? [];
  const [sel, setSel] = useState<number | null>(null);

  const pick = (k: number) => {
    setSel(k);
    const l = chain[k];
    speak(l.say ?? `${l.name}${l.role ? `, ${l.role}` : ""}.`);
  };

  const whole =
    spec.say ??
    `Cadeia alimentar. ${chain.map((l) => l.name).join(", é comido por ")}. A energia passa de uns para os outros.`;

  return (
    <div className="widget foodchain-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="leaf" size={16} /> Cadeia alimentar</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">A seta quer dizer "é comido por"</span>
        <Speaker text={whole} className="w-readout-sm" label="Ouvir a cadeia alimentar" />
      </div>

      <div className="foodchain-row">
        {chain.map((l, k) => (
          <div className="foodchain-item" key={k}>
            <button className={`foodchain-card${sel === k ? " on" : ""}`} onClick={() => pick(k)} aria-label={l.name}>
              <span className="foodchain-emoji" aria-hidden>{l.emoji}</span>
              <span className="foodchain-name">{l.name}</span>
              {l.role && <span className="foodchain-role">{l.role}</span>}
            </button>
            {k < chain.length - 1 && (
              <span className="foodchain-arrow" aria-hidden><Icon name="forward" size={18} /></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
