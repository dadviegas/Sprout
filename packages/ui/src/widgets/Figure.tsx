import { Icon } from "@sprout/icons";
import { Speaker } from "../Speaker";

/* Figure — a captioned picture with read-aloud, for "real" images. Three ways
 * to show a picture in a lesson, from most to least preferred here:
 *   1. an inline SVG illustration written straight in the markdown (scales,
 *      themes, no asset files) — use plain <svg>…</svg> + <figcaption>;
 *   2. this `figure` block for a raster image URL (a photo/illustration) OR a
 *      big emoji "picture", always with a caption a child can hear;
 *   3. a bundled image under apps/web/static/img/ referenced as "img/<name>".
 *
 * Markdown usage:
 *   ```figure
 *   { "src": "img/serra-da-estrela.jpg", "alt": "Serra da Estrela com neve",
 *     "caption": "A Serra da Estrela é a montanha mais alta de Portugal continental." }
 *   ```
 *   ```figure
 *   { "emoji": "🌋", "caption": "Um vulcão deita lava quando entra em erupção." }
 *   ```
 */

export interface FigureSpec {
  /** image URL — a bundled "img/<name>.jpg" or an absolute https URL */
  src?: string;
  /** accessibility text — describe the picture (required when `src` is set) */
  alt?: string;
  /** a big emoji shown as the picture when there is no `src` */
  emoji?: string;
  /** text shown under the picture (and read aloud unless `say` overrides) */
  caption?: string;
  /** read-aloud text (defaults to caption ?? alt) */
  say?: string;
  /** small attribution / source line */
  credit?: string;
  /** max width of the picture in pixels (default 460) */
  max?: number;
}

export function Figure({ spec }: { spec: FigureSpec }) {
  const sayText = spec.say ?? spec.caption ?? spec.alt ?? "";
  return (
    <figure className="figure-widget" style={spec.max ? { maxWidth: spec.max } : undefined}>
      <div className="figure-media">
        {spec.src ? (
          <img src={spec.src} alt={spec.alt ?? spec.caption ?? ""} loading="lazy" />
        ) : (
          <span className="figure-emoji" role="img" aria-label={spec.alt ?? spec.caption ?? "imagem"}>
            {spec.emoji ?? "🖼️"}
          </span>
        )}
      </div>
      {(spec.caption || sayText) && (
        <figcaption className="figure-cap">
          {spec.caption && <span className="figure-cap__text">{spec.caption}</span>}
          {sayText && <Speaker text={sayText} label="Ouvir a legenda" className="figure-speak" size={16} />}
          {spec.credit && (
            <span className="figure-credit">
              <Icon name="info" size={12} /> {spec.credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
