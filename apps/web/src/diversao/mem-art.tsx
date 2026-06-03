import type { ReactNode } from "react";

/* Colourful SVG art for the memory game cards — playful, multi-colour
 * illustrations (unlike the monochrome @sprout/icons line set, which is for
 * chrome). Each lives on a 0 0 48 48 grid. `name` is the pt-PT word read aloud
 * when its pair is found. Add a new entry here to grow the deck — the game
 * picks a random subset, so more art just means more variety. */
export interface MemArt {
  id: string;
  name: string;
  node: ReactNode;
}

const ray = (cx: number, cy: number, color: string) =>
  Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return (
      <line
        key={i}
        x1={cx + Math.cos(a) * 13}
        y1={cy + Math.sin(a) * 13}
        x2={cx + Math.cos(a) * 19}
        y2={cy + Math.sin(a) * 19}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    );
  });

const petals = (cx: number, cy: number, color: string) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    return <circle key={i} cx={cx + Math.cos(a) * 10} cy={cy + Math.sin(a) * 10} r="7" fill={color} />;
  });

export const MEM_ART: MemArt[] = [
  {
    id: "sol",
    name: "sol",
    node: (
      <g>
        {ray(24, 24, "#ffb300")}
        <circle cx="24" cy="24" r="10" fill="#ffce3a" />
      </g>
    ),
  },
  {
    id: "lua",
    name: "lua",
    node: <path d="M29 6a18 18 0 1 0 11 34A14 14 0 0 1 29 6z" fill="#dfe4ff" stroke="#b9c2f0" strokeWidth="1.5" />,
  },
  {
    id: "estrela",
    name: "estrela",
    node: <path d="M24 5l5.3 10.7 11.8 1.7-8.5 8.3 2 11.8L24 32.4 13.4 39.5l2-11.8L7 19.4l11.8-1.7z" fill="#ffd23a" />,
  },
  {
    id: "coracao",
    name: "coração",
    node: <path d="M24 40S8 30 8 18.5A8 8 0 0 1 24 14a8 8 0 0 1 16 4.5C40 30 24 40 24 40z" fill="#ff5d73" />,
  },
  {
    id: "flor",
    name: "flor",
    node: (
      <g>
        {petals(24, 24, "#ff8ac2")}
        <circle cx="24" cy="24" r="6" fill="#ffd23a" />
      </g>
    ),
  },
  {
    id: "peixe",
    name: "peixe",
    node: (
      <g>
        <path d="M8 24l9-7v14z" fill="#ff9f43" />
        <ellipse cx="27" cy="24" rx="14" ry="9" fill="#36c5f0" />
        <circle cx="33" cy="21" r="2.2" fill="#fff" />
        <circle cx="33.5" cy="21" r="1.1" fill="#1c2530" />
      </g>
    ),
  },
  {
    id: "borboleta",
    name: "borboleta",
    node: (
      <g>
        <ellipse cx="16" cy="18" rx="9" ry="11" fill="#a06bff" />
        <ellipse cx="32" cy="18" rx="9" ry="11" fill="#a06bff" />
        <ellipse cx="17" cy="32" rx="7" ry="8" fill="#c79bff" />
        <ellipse cx="31" cy="32" rx="7" ry="8" fill="#c79bff" />
        <rect x="22.5" y="12" width="3" height="26" rx="1.5" fill="#5b3a9e" />
      </g>
    ),
  },
  {
    id: "maca",
    name: "maçã",
    node: (
      <g>
        <path d="M24 16c-6-4-15 0-15 10s9 16 15 16 15-6 15-16-9-14-15-10z" fill="#ff4d4d" />
        <rect x="22.7" y="8" width="2.6" height="8" rx="1.3" fill="#7a4a1e" />
        <path d="M25 12c3-3 8-3 9-1-1 3-6 4-9 1z" fill="#3fbf6f" />
      </g>
    ),
  },
  {
    id: "arvore",
    name: "árvore",
    node: (
      <g>
        <rect x="21" y="28" width="6" height="14" rx="2" fill="#9a6a3a" />
        <circle cx="24" cy="20" r="13" fill="#3fbf6f" />
      </g>
    ),
  },
  {
    id: "gato",
    name: "gato",
    node: (
      <g>
        <polygon points="13,9 20,20 9,20" fill="#aab2bd" />
        <polygon points="35,9 39,20 28,20" fill="#aab2bd" />
        <circle cx="24" cy="26" r="13" fill="#bcc4cf" />
        <circle cx="19" cy="24" r="2" fill="#1c2530" />
        <circle cx="29" cy="24" r="2" fill="#1c2530" />
        <circle cx="24" cy="28" r="1.6" fill="#ff8ac2" />
        <path d="M22 31c1 1.4 3 1.4 4 0" stroke="#1c2530" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: "balao",
    name: "balão",
    node: (
      <g>
        <ellipse cx="24" cy="20" rx="11" ry="13" fill="#ff6b6b" />
        <polygon points="24,32 21,37 27,37" fill="#ff6b6b" />
        <path d="M24 37c0 3 3 4 0 7" stroke="#bbbbbb" strokeWidth="1.5" fill="none" />
      </g>
    ),
  },
  {
    id: "arcoiris",
    name: "arco-íris",
    node: (
      <g fill="none" strokeWidth="4" strokeLinecap="round">
        <path d="M8 38a16 16 0 0 1 32 0" stroke="#ff5d73" />
        <path d="M13 38a11 11 0 0 1 22 0" stroke="#ffce3a" />
        <path d="M18 38a6 6 0 0 1 12 0" stroke="#36c5f0" />
      </g>
    ),
  },
  {
    id: "nuvem",
    name: "nuvem",
    node: (
      <g fill="#bcd4ff">
        <circle cx="18" cy="27" r="8" />
        <circle cx="28" cy="22" r="10" />
        <circle cx="34" cy="28" r="7" />
        <rect x="13" y="29" width="25" height="8" rx="4" />
      </g>
    ),
  },
  {
    id: "casa",
    name: "casa",
    node: (
      <g>
        <polygon points="24,8 41,23 7,23" fill="#ff7a59" />
        <rect x="12" y="23" width="24" height="17" fill="#ffd23a" />
        <rect x="20" y="29" width="8" height="11" fill="#7a4a1e" />
      </g>
    ),
  },
];

/** The card back motif (shown while a card is face-down). */
export const MEM_BACK: ReactNode = (
  <path d="M24 10l3.2 9.8 9.8 3.2-9.8 3.2L24 36l-3.2-9.8L11 23l9.8-3.2z" fill="currentColor" />
);
