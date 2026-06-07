import { Icon } from "@sprout/icons";
import { Speaker, useSpeaker } from "../Speaker";

/* Atlas — cards for "Atlas da Vida": animals and plants of the world, each with
 * where it is NATURAL (native), where it can be SEEN, and a "ver fotos" link to
 * real photos. The card body reads aloud on tap; the photos link is a separate
 * sibling (a button can't nest a link). Photos open in a new tab. */
export interface AtlasEntry {
  /** common name in pt-PT, e.g. "Elefante-africano" */
  name: string;
  emoji?: string;
  /** scientific name, shown small in italics (optional) */
  sci?: string;
  /** where it is native / from, e.g. "Savana africana" */
  native: string;
  /** where it can be seen, e.g. "Reservas de África" (optional) */
  seen?: string;
  /** a full http(s) URL, or a search term for photos (defaults to the name).
   *  A bare term opens Google Images with SafeSearch on. */
  photos?: string;
  /** read-aloud override */
  say?: string;
}

export interface AtlasSpec {
  title?: string;
  /** the group this page is about, e.g. "Mamíferos" — shown on the badge */
  group?: string;
  items: AtlasEntry[];
}

/** Build the "ver fotos" target: a full URL as-is, else a SafeSearch image
 *  search for the term. */
function photosHref(entry: AtlasEntry): string {
  const term = entry.photos && /^https?:\/\//.test(entry.photos) ? null : entry.photos ?? entry.name;
  if (term === null) return entry.photos!;
  return `https://www.google.com/search?tbm=isch&safe=active&q=${encodeURIComponent(term)}`;
}

const entrySay = (e: AtlasEntry) =>
  e.say ?? `${e.name}. Natural de ${e.native}.${e.seen ? ` Vê-se em ${e.seen}.` : ""}`;

function AtlasCard({ entry }: { entry: AtlasEntry }) {
  const { playing, toggle } = useSpeaker();
  return (
    <div className="atlas-card">
      <button
        type="button"
        className="atlas-card__main"
        onClick={() => toggle(entrySay(entry))}
        aria-label={playing ? "Parar" : `Ouvir: ${entry.name}`}
      >
        {entry.emoji && <span className="atlas-card__emoji" aria-hidden>{entry.emoji}</span>}
        <span className="atlas-card__name">
          {entry.name}
          {entry.sci && <em className="atlas-card__sci">{entry.sci}</em>}
        </span>
        <span className="atlas-card__row"><Icon name="world" size={13} /> {entry.native}</span>
        {entry.seen && <span className="atlas-card__row"><Icon name="eye" size={13} /> {entry.seen}</span>}
        <span className="atlas-card__speak" aria-hidden><Icon name={playing ? "stop" : "speaker"} size={15} /></span>
      </button>
      <a
        className="atlas-card__photos"
        href={photosHref(entry)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Ver fotos de ${entry.name} (abre noutro separador)`}
      >
        <Icon name="image" size={13} /> ver fotos
      </a>
    </div>
  );
}

export function Atlas({ spec }: { spec: AtlasSpec }) {
  return (
    <div className="widget atlas-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="paw" size={16} /> {spec.group ? spec.group : "Atlas da Vida"}</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca para ouvir; «ver fotos» abre imagens reais</span>
        <Speaker parts={spec.items.map(entrySay)} className="atlas-hear-all" label="Ouvir tudo">Ouvir tudo</Speaker>
      </div>
      <div className="atlas-grid">
        {spec.items.map((e, i) => (
          <AtlasCard key={`${e.name}-${i}`} entry={e} />
        ))}
      </div>
    </div>
  );
}
