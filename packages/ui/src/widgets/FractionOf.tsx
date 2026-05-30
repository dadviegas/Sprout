import { Icon } from "@sprout/icons";
import { Speaker } from "../Speaker";

/* "Fraction of a set": share `whole` objects into `parts` equal groups, then
 * take `take` of those groups. Shows the picture (groups of emoji, the taken
 * ones boxed) and the sum it stands for: 1/3 de 12 = 4. Ties the abstract
 * fraction to counting real things. Authors pass a `whole` that divides by
 * `parts`; any leftover is shown ungrouped so a wrong split is still visible. */

export interface FractionOfSpec {
  whole: number; // total objects
  parts: number; // denominator (number of groups)
  take?: number; // numerator (groups taken), default 1
  emoji?: string; // object glyph, default "🍎"
  title?: string;
  color?: string; // unused for now; reserved for theming
  say?: string; // read-aloud override
}

export function FractionOf({ spec }: { spec: FractionOfSpec }) {
  const whole = Math.max(1, Math.round(spec.whole));
  const parts = Math.min(Math.max(Math.round(spec.parts), 2), 10);
  const take = Math.min(Math.max(Math.round(spec.take ?? 1), 1), parts);
  const emoji = spec.emoji ?? "🍎";

  const per = Math.floor(whole / parts);
  const leftover = whole - per * parts; // 0 when it divides evenly
  const result = per * take;

  const say =
    spec.say ??
    `${take} de ${parts} de ${whole}. Divides em ${parts} grupos de ${per}. ` +
      `Ficas com ${take} ${take === 1 ? "grupo" : "grupos"}: ${result}.`;

  const groups = Array.from({ length: parts }, (_, g) => g);

  return (
    <div className="widget fof-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="fraction" size={16} /> Frações</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Divide em grupos iguais e fica com uma parte</span>
      </div>

      <div className="fof-body">
        <div className="fof-groups">
          {groups.map((g) => (
            <div key={g} className={`fof-group${g < take ? " is-on" : ""}`} aria-label={g < take ? "grupo escolhido" : "grupo"}>
              {Array.from({ length: per }, (_, k) => (
                <span key={k} className="fof-emoji">{emoji}</span>
              ))}
            </div>
          ))}
          {leftover > 0 && (
            <div className="fof-group fof-leftover" aria-label="sobras">
              {Array.from({ length: leftover }, (_, k) => (
                <span key={k} className="fof-emoji">{emoji}</span>
              ))}
            </div>
          )}
        </div>

        <div className="fof-result">
          {take}/{parts} de {whole} = <strong>{result}</strong>
        </div>
        <Speaker text={say} className="prose-speak" label="Ouvir" />
      </div>
    </div>
  );
}
