import type { ReactNode } from "react";

/* Built-in "living" chess characters for the Xadrez game — drawn as inline SVG whose
 * LIMBS are separate <g> groups (class `xc-…`) so they can move on their own: the
 * legs stride, the cape sways, the weapon arm swings/strikes. A flat image can't do
 * that (you can only slide/rotate the whole picture), which is why these are inline.
 * The limb animations live in diversao.css, keyed off the .walking / .attacking
 * classes the board puts on the wrapping <svg>. viewBox is 0 0 100 110, feet near the
 * bottom. A dropped-in image/Rive file (static/characters/<piece>-<color>.*) overrides
 * the built-in character — see PieceFigure in Xadrez.tsx.
 *
 * Every piece is the SAME armoured warrior build (Body + Head + weapon Arm); what
 * tells them apart is the helmet CREST and the WEAPON. Pivots (CSS): legs at the hip,
 * arm at the shoulder, cape at the neck — so a rotation swings the limb naturally. */

export type PieceColor = "w" | "b";

interface Palette {
  // armour (cool steel look — flat + a lighter highlight shape)
  steel: string;
  steelHi: string;
  steelLo: string;
  glow: string; // glowing visor / eyes / orb
  cape: string;
  capeLo: string;
  visor: string;
  metal: string; // gold/silver trim, crowns
  line: string; // outline
}
const PALETTE: Record<PieceColor, Palette> = {
  w: {
    steel: "#cfd7e2", steelHi: "#f0f4fa", steelLo: "#8a93a3", glow: "#6fe0ff",
    cape: "#3fbf6f", capeLo: "#2a9558", visor: "#10202b", metal: "#f2c14e", line: "#2a313c",
  },
  b: {
    steel: "#5b636f", steelHi: "#828b98", steelLo: "#363d47", glow: "#ff7373",
    cape: "#e0566a", capeLo: "#a83a48", visor: "#0b0f14", metal: "#c7ccd3", line: "#12161c",
  },
};

const shadow = <ellipse cx="50" cy="105" rx="22" ry="4.2" fill="#000" fillOpacity="0.18" stroke="none" />;

// Shared armoured body: cape (sways), two striding legs, plated torso, pauldrons.
function Body(c: Palette): ReactNode {
  return (
    <>
      <g className="xc-cape">
        <path d="M37 52q13-5 26 0l3 38q-7 5-12 1q-2 6-5 0q-3 6-5 0q-5 4-12-1z" fill={c.cape} />
        <path d="M50 54v33" stroke={c.capeLo} strokeWidth="1.8" />
      </g>
      <g className="xc-leg xc-leg-a" fill={c.steelLo}>
        <path d="M43 77h7v17q-3.5 3-7 0z" />
        <ellipse cx="45" cy="95" rx="6" ry="3.3" fill={c.line} stroke="none" />
      </g>
      <g className="xc-leg xc-leg-b" fill={c.steelLo}>
        <path d="M50 77h7v17q-3.5 3-7 0z" />
        <ellipse cx="55" cy="95" rx="6" ry="3.3" fill={c.line} stroke="none" />
      </g>
      <path d="M37 56q13-7 26 0l3 23q-16 6-32 0z" fill={c.steel} />
      <path d="M41 59q9-4 18 0l-2 8q-7-3-14 0z" fill={c.steelHi} stroke="none" />
      <rect x="36" y="76" width="28" height="5" rx="2.5" fill={c.metal} />
      <path d="M30 60q4-11 12-8l-1 11q-6 1-11-3z" fill={c.steel} />
      <path d="M70 60q-4-11-12-8l1 11q6 1 11-3z" fill={c.steel} />
    </>
  );
}

// Helmet with a glowing visor; `crest` is the ornament on top (the per-piece marker).
function Head(c: Palette, crest: ReactNode): ReactNode {
  return (
    <g className="xc-head">
      {crest}
      <path d="M35 44q0-16 15-16t15 16q0 12-15 14t-15-14z" fill={c.steel} />
      <rect x="38" y="40" width="24" height="7" rx="2" fill={c.visor} stroke="none" />
      <circle cx="45" cy="43.5" r="2" fill={c.glow} stroke="none" />
      <circle cx="55" cy="43.5" r="2" fill={c.glow} stroke="none" />
      <path d="M35 36q15-9 30 0" fill="none" stroke={c.metal} strokeWidth="2.4" />
    </g>
  );
}

// The whole warrior; `crest` sits on the helm, `weapon` is held in the (swinging) arm.
function warrior(c: Palette, crest: ReactNode, weapon: ReactNode): ReactNode {
  return (
    <g stroke={c.line} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      {shadow}
      {Body(c)}
      <g className="xc-arm">{weapon}</g>
      {Head(c, crest)}
    </g>
  );
}

/* ---- per-piece crests (the headpiece — each a clearly different silhouette) ---- */
// Pawn — plain helm, just a small plume (the simplest piece).
const crestPlume = (c: Palette) => <path d="M50 27q4-9-1-16q-8 7-4 16q-3 0-4 3q5 2 9 0t4-3z" fill={c.cape} />;
// Knight — a swept crest (its diagonal LANCE is the real giveaway).
const crestTall = (c: Palette) => <path d="M49 28q-3-13 8-20q1 7-1 12q7 2 3 10q5 2 1 10q-7-2-9-10q-4-2-2-12z" fill={c.cape} />;
// Rook — wide CASTLE battlements (a tower top): a base bar + three merlons.
const crestBattlement = (c: Palette) => (
  <>
    <rect x="34" y="24" width="32" height="7" rx="1" fill={c.steel} />
    <rect x="35" y="17" width="7" height="8" rx="1" fill={c.steel} />
    <rect x="46.5" y="17" width="7" height="8" rx="1" fill={c.steel} />
    <rect x="58" y="17" width="7" height="8" rx="1" fill={c.steel} />
    <path d="M34 28h32" stroke={c.metal} strokeWidth="2" />
  </>
);
// Bishop — a tall, narrow MITRE with a cross (the pointiest silhouette).
const crestMitre = (c: Palette) => (
  <>
    <path d="M42 30q8-27 8-31q0 4 8 31z" fill={c.cape} />
    <path d="M50 30q0-14 0-18" stroke={c.metal} strokeWidth="1.6" />
    <path d="M50 4v8M46 7.5h8" stroke={c.metal} strokeWidth="2.2" />
  </>
);
// Queen / King — a tall, wide crown; the King also carries a cross on top (tallest).
const crown = (c: Palette, withCross: boolean) => (
  <>
    <path d="M36 31l1.5-15 6 8 6.5-12 6.5 12 6-8 1.5 15z" fill={c.metal} />
    <circle cx="43.5" cy="17" r="1.9" fill={c.cape} stroke="none" />
    <circle cx="56.5" cy="17" r="1.9" fill={c.cape} stroke="none" />
    <circle cx="50" cy="10" r="2.2" fill={c.cape} stroke="none" />
    {withCross && <path d="M50 10V2M45.5 5h9" stroke={c.metal} strokeWidth="2.4" />}
  </>
);

/* ---- per-piece weapons (held upright in the arm, pivoting at the shoulder) ---- */
const wpSword = (c: Palette) => (
  <>
    <line x1="63" y1="60" x2="63" y2="13" stroke={c.steelHi} strokeWidth="5" />
    <path d="M63 11l-3 7h6z" fill={c.steelHi} />
    <rect x="57" y="57" width="12" height="4" rx="2" fill={c.metal} />
  </>
);
const wpLance = (c: Palette) => (
  <>
    <line x1="58" y1="63" x2="88" y2="15" stroke={c.steelLo} strokeWidth="4.5" />
    <path d="M88 15l6-6-1 11z" fill={c.steelHi} />
    <circle cx="67" cy="50" r="4.5" fill={c.metal} />
  </>
);
const wpHammer = (c: Palette) => (
  <>
    <line x1="63" y1="60" x2="63" y2="30" stroke={c.steelLo} strokeWidth="4" />
    <rect x="54" y="20" width="18" height="12" rx="2.5" fill={c.steel} />
    <rect x="54" y="22" width="18" height="3.5" fill={c.steelHi} stroke="none" />
  </>
);
const wpStaff = (c: Palette) => (
  <>
    <line x1="63" y1="60" x2="63" y2="21" stroke={c.steelLo} strokeWidth="3.5" />
    <circle cx="63" cy="16" r="5.5" fill={c.glow} />
    <circle cx="61" cy="14" r="1.6" fill="#fff" stroke="none" opacity="0.8" />
  </>
);
const wpScepter = (c: Palette) => (
  <>
    <line x1="63" y1="60" x2="63" y2="22" stroke={c.metal} strokeWidth="3" />
    <circle cx="63" cy="17" r="4.5" fill={c.metal} />
    <circle cx="63" cy="17" r="2" fill={c.cape} stroke="none" />
  </>
);
const wpBroadsword = (c: Palette) => (
  <>
    <path d="M60 59h6v-44l-3-5-3 5z" fill={c.steelHi} />
    <rect x="55" y="56" width="16" height="4" rx="2" fill={c.metal} />
    <rect x="61" y="60" width="4" height="4" rx="1" fill={c.metal} />
  </>
);

const ART: Partial<Record<string, (c: Palette) => ReactNode>> = {
  p: (c) => warrior(c, crestPlume(c), wpSword(c)),
  n: (c) => warrior(c, crestTall(c), wpLance(c)),
  r: (c) => warrior(c, crestBattlement(c), wpHammer(c)),
  b: (c) => warrior(c, crestMitre(c), wpStaff(c)),
  q: (c) => warrior(c, crown(c, false), wpScepter(c)),
  k: (c) => warrior(c, crown(c, true), wpBroadsword(c)),
};

/** Built-in rigged character for a piece type + colour. Keyed by the lower-cased
 *  piece letter; returns null only if a type has no art (then the board uses a glyph). */
export function pieceArt(type: string, color: PieceColor): ReactNode | null {
  const make = ART[type.toLowerCase()];
  return make ? make(PALETTE[color]) : null;
}
