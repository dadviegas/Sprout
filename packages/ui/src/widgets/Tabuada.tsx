import { Icon } from "@sprout/icons";
import { canSpeak } from "../speak";
import { useSpeaker } from "../Speaker";

/* Tabuada — a multiplication table read aloud the right way: each line says
 * "três vezes dois é igual a seis" (not the bare "3 x 2 = 2" the child can't
 * read). Tap any line to hear just that one; tap "Ouvir tudo" to hear the
 * whole table top to bottom, with a pause between lines. While it plays the
 * button shows a "parar" (stop) square — tap again to stop.
 *
 * Markdown usage:  ```tabuada
 *                  { "of": 2 }            // one table (× 1..10)
 *                  { "tables": [2,5,10] } // several tables
 *                  ```
 */

export interface TabuadaSpec {
  /** a single table to show, e.g. 2 → the "tabuada do 2" */
  of?: number;
  /** several tables to show at once (used by the study area) */
  tables?: number[];
  /** how far each table goes (default 10) */
  upTo?: number;
  title?: string;
}

/** "i × n = i·n" — the text shown AND read aloud (speak() turns × and = into
 *  words, so one string is the single source of truth for both). */
const line = (i: number, n: number) => `${i} × ${n} = ${i * n}`;

function Row({ i, n }: { i: number; n: number }) {
  const { playing, toggle } = useSpeaker();
  return (
    <button
      type="button"
      className="tabuada__row"
      data-playing={playing || undefined}
      onClick={() => toggle(line(i, n))}
      aria-label={`${playing ? "Parar" : "Ouvir"}: ${i} vezes ${n} é igual a ${i * n}`}
    >
      <span className="tabuada__calc">
        {i} <span className="tabuada__op">×</span> {n} <span className="tabuada__op">=</span> <strong>{i * n}</strong>
      </span>
      {canSpeak() && <Icon name={playing ? "stop" : "speaker"} size={16} />}
    </button>
  );
}

function OneTable({ n, upTo }: { n: number; upTo: number }) {
  const rows = Array.from({ length: upTo }, (_, k) => k + 1);
  const { playing, toggle } = useSpeaker();
  return (
    <div className="tabuada">
      <div className="tabuada__head">
        <strong>Tabuada do {n}</strong>
        {canSpeak() && (
          <button
            type="button"
            className="tabuada__play"
            data-playing={playing || undefined}
            onClick={() => toggle(rows.map((i) => line(i, n)))}
            aria-label={playing ? "Parar" : `Ouvir a tabuada do ${n} toda`}
            title={playing ? "Parar" : "Ouvir tudo"}
          >
            <Icon name={playing ? "stop" : "speaker"} size={16} /> {playing ? "Parar" : "Ouvir tudo"}
          </button>
        )}
      </div>
      <ul className="tabuada__rows">
        {rows.map((i) => (
          <li key={i}>
            <Row i={i} n={n} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Tabuada({ spec }: { spec: TabuadaSpec }) {
  const upTo = spec.upTo ?? 10;
  const tables = spec.tables ?? (spec.of != null ? [spec.of] : []);
  return (
    <div className="widget tabuada-widget">
      <div className="w-head">
        <span className="w-badge">
          <Icon name="times" size={16} /> Tabuada
        </span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca numa linha para ouvir</span>
      </div>
      <div className="tabuada-grid">
        {tables.map((n) => (
          <OneTable key={n} n={n} upTo={upTo} />
        ))}
      </div>
    </div>
  );
}
