/* Academia dos Elementos — character art. The element heroes and the Mestre are
 * faithfully ported from the official blueprints in docs/assets/ (so the in-game
 * art matches the design reference); the Dragão do Caos boss is an original SVG.
 * The element colour drives `currentColor`, so one Hero component themes for all
 * five elements (the per-element headpiece/emblem keep the blueprint's own fills). */
import type { ElementId } from "./world-data";

/* ---- element emblems (small, for chips) -------------------------------- */

const EMBLEM: Record<ElementId, (fill: string) => JSX.Element> = {
  fire: (fill) => (
    <path
      d="M12 2c1.8 2.8.6 4.7 2 6.6 1.3 1.8 4 2.6 4 6.4a6 6 0 0 1-12 0c0-2 .9-3.2 2-4.2.4 1 1.3 1.6 2 1.2.6-.4.2-1.8.1-3.4C10 11.4 10.6 4.7 12 2z"
      style={{ fill }}
    />
  ),
  water: (fill) => <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" style={{ fill }} />,
  earth: (fill) => (
    <g style={{ fill }}>
      <path d="M12 5l6 11H6z" />
      <path d="M3.5 19l4.5-8 3 5z" opacity="0.7" />
    </g>
  ),
  air: (fill) => (
    <g style={{ stroke: fill, fill: "none", strokeWidth: 2, strokeLinecap: "round" }}>
      <path d="M3 9h10a2.6 2.6 0 1 0-2.6-2.6" />
      <path d="M3 14h13a2.6 2.6 0 1 1-2.6 2.6" />
      <path d="M3 19h7" />
    </g>
  ),
  light: (fill) => <path d="M12 2l2.5 6 6 .6-4.6 4 1.5 6L12 15.6 6.6 18.6l1.5-6L3.5 8.6l6-.6z" style={{ fill }} />,
};

export function Emblem({ element, color, size = 24 }: { element: ElementId; color: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      {EMBLEM[element](color)}
    </svg>
  );
}

/* ---- elemental hero (ported from academia-element-heroes-blueprint.svg) ---- */

// Shared body: head + face, cloak/arms in currentColor (the element colour), boots,
// hands, and the white chest disc the element emblem sits on.
const HERO_BODY = (
  <g>
    <ellipse cx="125" cy="250" rx="48" ry="56" fill="#ffd9bd" />
    <circle cx="108" cy="254" r="5" fill="#253047" />
    <circle cx="142" cy="254" r="5" fill="#253047" />
    <path d="M110 274q15 13 30 0" stroke="#253047" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M70 355q55-70 110 0l-18 150H88z" fill="currentColor" />
    <path d="M125 315v190" stroke="#000" strokeWidth="5" opacity="0.08" />
    <rect x="78" y="420" width="35" height="110" rx="17" fill="#253047" />
    <rect x="137" y="420" width="35" height="110" rx="17" fill="#253047" />
    <rect x="55" y="342" width="34" height="110" rx="17" fill="currentColor" opacity="0.86" />
    <rect x="161" y="342" width="34" height="110" rx="17" fill="currentColor" opacity="0.86" />
    <circle cx="72" cy="456" r="18" fill="#ffd9bd" />
    <circle cx="178" cy="456" r="18" fill="#ffd9bd" />
    <circle cx="125" cy="395" r="24" fill="#ffffff" opacity="0.95" />
  </g>
);

// Per-element headpiece + chest emblem (+ extras), with the blueprint's own fills.
const HERO_ART: Record<ElementId, JSX.Element> = {
  fire: (
    <g>
      <path d="M92 222c20-54 58-66 62-122 42 43 15 82 42 114-12-5-21-8-28-8 15 30 0 58-43 58-38 0-54-18-33-42z" fill="#f2633b" />
      <path d="M115 370l18 32-36-4z" fill="#f2633b" />
      <path d="M103 395h44l-22 34z" fill="#f2633b" />
    </g>
  ),
  water: (
    <g>
      <path d="M70 345c35-18 75-18 110 0-12-48-98-48-110 0z" fill="#116a8c" />
      <path d="M94 215c22-32 42-45 67-45 16 0 29 8 39 24-28-8-53 0-77 20z" fill="#21a9d8" />
      <path d="M125 366c22 28 34 45 34 62a34 34 0 0 1-68 0c0-17 12-34 34-62z" fill="#21a9d8" />
    </g>
  ),
  earth: (
    <g>
      <path d="M89 224c11-34 38-54 78-39 10 27-7 49-33 52-20 2-33-3-45-13z" fill="#6b4f2a" />
      <path d="M68 342l32-40 20 36-36 20z" fill="#75bd69" />
      <path d="M182 342l-32-40-20 36 36 20z" fill="#75bd69" />
      <path d="M105 378h40l-20 40z" fill="#5aa65c" />
      <rect x="68" y="510" width="58" height="28" rx="14" fill="#6b4f2a" />
      <rect x="124" y="510" width="58" height="28" rx="14" fill="#6b4f2a" />
    </g>
  ),
  air: (
    <g>
      <path d="M85 226c22-38 89-38 112 0-36-12-73-10-112 0z" fill="#dbeeff" />
      <path d="M70 335c42 18 82 18 120 0-9 28-28 42-58 43-33 1-54-13-62-43z" fill="#dbeeff" />
      <path d="M85 388h80" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" opacity="0.88" />
      <path d="M92 407h66" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" opacity="0.72" />
    </g>
  ),
  light: (
    <g>
      <path d="M125 166l14 32 35 3-27 22 8 35-30-18-30 18 8-35-27-22 35-3z" fill="#f0bd2e" />
      <path d="M125 362l15 34 37 4-28 24 9 36-33-19-33 19 9-36-28-24 37-4z" fill="#f0bd2e" />
      <circle cx="125" cy="395" r="13" fill="#ffffff" />
    </g>
  ),
};

export function Hero({ element, color, size = 120 }: { element: ElementId; color: string; size?: number }) {
  const w = Math.round((size * 170) / 466);
  return (
    <svg viewBox="40 96 170 466" width={w} height={size} className="wd-hero" style={{ color }} aria-hidden>
      <circle cx="125" cy="320" r="104" fill="currentColor" opacity="0.1" />
      {HERO_BODY}
      {HERO_ART[element]}
    </svg>
  );
}

/* ---- Mestre da Academia (ported from academia-master-blueprint.svg) ----- */

export function Master({ size = 110 }: { size?: number }) {
  const w = Math.round((size * 290) / 455);
  return (
    <svg viewBox="50 12 290 455" width={w} height={size} aria-hidden>
      <defs>
        <linearGradient id="mst-robe" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#536575" />
          <stop offset="1" stopColor="#273747" />
        </linearGradient>
        <linearGradient id="mst-hat" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f0d393" />
          <stop offset="1" stopColor="#c79642" />
        </linearGradient>
      </defs>
      {/* staff */}
      <path d="M290 165c20 100 18 210 2 310" stroke="#8a5a2b" strokeWidth="16" strokeLinecap="round" />
      <circle cx="286" cy="145" r="25" fill="#89d7ff" opacity="0.85" />
      <path d="M286 113l12 24 26 4-19 18 5 26-24-12-24 12 5-26-19-18 26-4z" fill="#ffffff" opacity="0.9" />
      {/* hat */}
      <ellipse cx="180" cy="125" rx="138" ry="34" fill="url(#mst-hat)" />
      <path d="M88 126c36-74 72-106 92-106s58 32 92 106c-56 18-127 18-184 0z" fill="url(#mst-hat)" />
      <ellipse cx="180" cy="126" rx="96" ry="19" fill="#b67d31" opacity="0.25" />
      <path d="M95 120c58 25 112 25 170 0" stroke="#fff2c4" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.75" />
      {/* head / face */}
      <circle cx="180" cy="174" r="48" fill="#ffd9bd" />
      <circle cx="163" cy="171" r="5" fill="#243047" />
      <circle cx="197" cy="171" r="5" fill="#243047" />
      <path d="M160 194q20 17 40 0" stroke="#243047" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M126 170q34-26 54 8 22-34 54-8" stroke="#e9eef7" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M150 202q30 42 60 0" fill="#e9eef7" />
      <path d="M166 207q14 12 28 0" stroke="#c7d2e2" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* robe */}
      <path d="M180 230c54 0 88 48 92 160 1 26-18 40-48 40h-88c-30 0-49-14-48-40 4-112 38-160 92-160z" fill="url(#mst-robe)" />
      <path d="M180 230v200" stroke="#000" strokeWidth="6" opacity="0.08" />
      <path d="M127 270l106 120" stroke="#d8e0ea" strokeWidth="8" opacity="0.65" />
      <path d="M233 270L127 390" stroke="#d8e0ea" strokeWidth="8" opacity="0.45" />
      <circle cx="180" cy="315" r="27" fill="#ffffff" />
      <path d="M180 292l9 18 20 3-15 14 4 20-18-10-18 10 4-20-15-14 20-3z" fill="#89d7ff" />
      {/* arms / hands */}
      <path d="M103 292c-36 34-46 76-30 112" stroke="#536575" strokeWidth="28" strokeLinecap="round" />
      <circle cx="73" cy="409" r="18" fill="#ffd9bd" />
      <path d="M257 292c31 32 42 69 34 103" stroke="#536575" strokeWidth="28" strokeLinecap="round" />
      <circle cx="291" cy="399" r="18" fill="#ffd9bd" />
      {/* feet */}
      <rect x="124" y="424" width="68" height="28" rx="14" fill="#6b4f2a" />
      <rect x="176" y="424" width="68" height="28" rx="14" fill="#6b4f2a" />
    </svg>
  );
}

/* ---- Dragão do Caos (original boss art) -------------------------------- */

export function Dragon({ size = 200 }: { size?: number }) {
  const w = size;
  const h = Math.round((size * 170) / 220);
  return (
    <svg viewBox="0 0 220 170" width={w} height={h} className="wd-dragon" aria-hidden>
      {/* tail */}
      <path d="M52 118q-34 6-34 40 24-6 46-20z" fill="#5a37a8" />
      <path d="M22 156l10-14 8 10z" fill="#f2633b" />
      {/* wing */}
      <path d="M104 64q34-44 78-36-6 34-44 52z" fill="#7b4bd0" />
      <path d="M118 60q22-22 44-22m-40 34q20-14 38-12" stroke="#5a37a8" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* body */}
      <ellipse cx="104" cy="108" rx="64" ry="46" fill="#6f4bd6" />
      <ellipse cx="100" cy="120" rx="42" ry="28" fill="#c3a9f2" />
      {/* back spikes */}
      <path d="M70 66l10-20 12 20zM96 60l11-22 12 22zM124 66l10-20 11 20z" fill="#f2633b" />
      {/* head */}
      <ellipse cx="158" cy="80" rx="36" ry="30" fill="#6f4bd6" />
      <path d="M182 78q30 0 30 18-16 8-32 1z" fill="#7b4bd0" />
      {/* horns */}
      <path d="M150 54l-8-26 18 18zM170 52l2-24 12 20z" fill="#e3d2ff" />
      {/* eye */}
      <ellipse cx="162" cy="74" rx="11" ry="12" fill="#fff" />
      <circle cx="165" cy="76" r="5.5" fill="#1c1530" />
      <path d="M150 62q12-8 24-2" stroke="#3a2a66" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* nostril + teeth */}
      <circle cx="206" cy="92" r="2.6" fill="#1c1530" />
      <path d="M186 96l4 7 5-7zM196 96l4 6 4-6z" fill="#fff" />
    </svg>
  );
}
