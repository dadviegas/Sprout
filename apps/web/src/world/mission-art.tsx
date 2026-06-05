import type { MissionView } from "./world-state";

const ART_COLORS: Record<string, { a: string; b: string; c: string }> = {
  first: { a: "#f7c948", b: "#ff8a4c", c: "#7c5cff" },
  math: { a: "#4a90e2", b: "#37bfc0", c: "#ffd23f" },
  pt: { a: "#e85d75", b: "#7c5cff", c: "#f7c948" },
  edm: { a: "#57b96d", b: "#4ec3e6", c: "#f7c948" },
  gold: { a: "#ffd23f", b: "#ff8a4c", c: "#ffffff" },
  trio: { a: "#7c5cff", b: "#37bfc0", c: "#ff8a4c" },
  guardian: { a: "#2f80ed", b: "#5aa65c", c: "#ffd23f" },
};

export function MissionArt({ mission }: { mission: MissionView }) {
  const colors = ART_COLORS[mission.id] ?? ART_COLORS.first;
  const state = mission.claimed ? "done" : mission.claimable ? "ready" : "todo";
  return (
    <svg className="wd-mission-art" viewBox="0 0 96 96" aria-hidden>
      <defs>
        <linearGradient id={`mission-bg-${mission.id}`} x1="10" x2="86" y1="8" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor={colors.a} />
          <stop offset="1" stopColor={colors.b} />
        </linearGradient>
        <filter id={`mission-shadow-${mission.id}`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0d1726" floodOpacity="0.22" />
        </filter>
      </defs>
      <rect x="10" y="12" width="76" height="72" rx="20" fill={`url(#mission-bg-${mission.id})`} filter={`url(#mission-shadow-${mission.id})`} />
      <circle cx="72" cy="24" r="10" fill="#fff" opacity="0.22" />
      <circle cx="23" cy="70" r="7" fill="#fff" opacity="0.18" />
      {renderMissionShape(mission.id, colors)}
      {state === "ready" && (
        <g>
          <circle cx="73" cy="72" r="13" fill="#16a36b" stroke="#fff" strokeWidth="4" />
          <path d="M66 72l5 5 10-12" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {state === "done" && (
        <g opacity="0.95">
          <circle cx="73" cy="72" r="13" fill="#26303f" stroke="#fff" strokeWidth="4" />
          <path d="M66 72l5 5 10-12" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}

function renderMissionShape(id: string, c: { a: string; b: string; c: string }) {
  switch (id) {
    case "math":
      return (
        <g>
          <rect x="28" y="25" width="40" height="44" rx="8" fill="#fff" opacity="0.94" />
          <path d="M36 38h24M48 30v18M37 58h9M52 58h9M37 49h24" stroke="#26303f" strokeWidth="5" strokeLinecap="round" />
          <circle cx="63" cy="31" r="8" fill={c.c} />
        </g>
      );
    case "pt":
      return (
        <g>
          <path d="M27 28h25c8 0 14 6 14 14v24H39c-7 0-12-5-12-12z" fill="#fff" opacity="0.94" />
          <path d="M35 39h22M35 49h16M35 59h24" stroke="#26303f" strokeWidth="5" strokeLinecap="round" />
          <path d="M59 24l7 7-12 12-8 2 2-8z" fill={c.c} />
        </g>
      );
    case "edm":
      return (
        <g>
          <circle cx="48" cy="48" r="24" fill="#e8fbff" />
          <path d="M27 47c9-8 16-6 23 1 7 7 13 8 20 1" fill="none" stroke={c.b} strokeWidth="7" strokeLinecap="round" />
          <path d="M48 24c-5 8-5 40 0 48M24 48h48" stroke="#2b8f54" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <path d="M39 36c4-9 15-9 20-2-8-1-14 1-20 2z" fill={c.a} />
        </g>
      );
    case "gold":
      return (
        <g>
          <path d="M48 23l7 15 16 2-12 11 3 17-14-8-14 8 3-17-12-11 16-2z" fill="#fff6c4" stroke="#fff" strokeWidth="4" />
          <path d="M48 34l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill={c.b} />
        </g>
      );
    case "trio":
      return (
        <g>
          <circle cx="36" cy="40" r="12" fill="#fff" opacity="0.95" />
          <circle cx="60" cy="40" r="12" fill="#fff" opacity="0.9" />
          <circle cx="48" cy="58" r="13" fill="#fff" />
          <path d="M31 40h10M55 40h10M43 58h10" stroke="#26303f" strokeWidth="5" strokeLinecap="round" />
          <path d="M48 21l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill={c.c} />
        </g>
      );
    case "guardian":
      return (
        <g>
          <path d="M48 22l25 10v18c0 17-10 28-25 34-15-6-25-17-25-34V32z" fill="#fff" opacity="0.94" />
          <path d="M48 31l15 6v12c0 10-6 18-15 23-9-5-15-13-15-23V37z" fill={c.a} />
          <path d="M41 52l5 5 11-14" fill="none" stroke={c.c} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    default:
      return (
        <g>
          <path d="M31 63h34v7H31z" fill="#fff" opacity="0.92" />
          <path d="M36 63l-4-26h32l-4 26z" fill="#fff" />
          <path d="M36 37c0-8 5-13 12-13s12 5 12 13" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
          <path d="M43 45h10M48 40v16" stroke={c.b} strokeWidth="5" strokeLinecap="round" />
          <path d="M48 18l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill={c.c} />
        </g>
      );
  }
}
