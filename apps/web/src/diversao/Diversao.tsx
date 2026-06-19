import { Suspense, lazy, type ReactNode } from "react";
import { Speaker } from "@sprout/ui";
import { site } from "../site-config";
import { Mascot } from "../Mascot";
import type { DiversaoRoom } from "../nav";

/* "Diversão" — the playful area. This module is the hub + a tiny router that
 * shows one of the three rooms. Each room is canvas-heavy, so it's lazy-loaded
 * on demand (Diversão itself is already lazy-loaded from App.tsx). */

const Jardim = lazy(() => import("./Jardim").then((m) => ({ default: m.Jardim })));
const AfterimageGarden = lazy(() => import("./AfterimageGarden").then((m) => ({ default: m.AfterimageGarden })));
const Jogos = lazy(() => import("./Jogos").then((m) => ({ default: m.Jogos })));
const CaixaDeBrincar = lazy(() => import("./CaixaDeBrincar").then((m) => ({ default: m.CaixaDeBrincar })));

/* Each room card carries a little illustrated scene + its own accent — the same
 * playful spirit as the game tiles, so the hub doesn't feel plainer than the
 * arcade inside it. Drawn on a 0 0 48 48 grid; var(--c) resolves only through
 * CSS, so accent fills go via `style`, never an SVG presentation attribute. */
const sparkle = (cx: number, cy: number, s: number, fill: string) => (
  <path
    d="M24 10l3.2 9.8 9.8 3.2-9.8 3.2L24 36l-3.2-9.8L11 23l9.8-3.2z"
    style={{ fill }}
    transform={`translate(${cx - 24 * s} ${cy - 23 * s}) scale(${s})`}
  />
);

// O teu jardim — a sprout with a flower growing from soil, under a little sun.
const ART_JARDIM = (
  <g>
    <circle cx="39" cy="9" r="4.5" fill="#ffce3a" />
    <path d="M6 38c3-4 10-5 18-5s15 1 18 5v6H6z" fill="#a9743f" />
    <ellipse cx="24" cy="38" rx="18" ry="3.2" fill="#c08a4e" />
    <path d="M24 41V20" style={{ stroke: "var(--c)" }} strokeWidth="3" strokeLinecap="round" />
    <path d="M24 31c-5-1-9-4-9-8 5 0 9 3 9 8z" style={{ fill: "var(--c)" }} />
    <path d="M24 34c4-1 8-3 8-7-4 0-8 2-8 7z" style={{ fill: "var(--c)" }} opacity="0.78" />
    <g transform="translate(24 15)">
      <circle cx="0" cy="-6" r="3.3" fill="#ff6f91" />
      <circle cx="6" cy="0" r="3.3" fill="#ff6f91" />
      <circle cx="-6" cy="0" r="3.3" fill="#ff6f91" />
      <circle cx="0" cy="6" r="3.3" fill="#ff6f91" />
      <circle cx="0" cy="0" r="3.4" fill="#ffce3a" />
    </g>
    {sparkle(10, 14, 0.2, "#ffce3a")}
  </g>
);

// Jogos — a friendly gamepad: a d-pad cross and two coloured buttons.
const ART_JOGOS = (
  <g>
    <rect x="5" y="15" width="38" height="18" rx="9" style={{ fill: "var(--c)" }} />
    <g fill="#ffffff">
      <rect x="10.5" y="22.3" width="9" height="3.4" rx="1.7" />
      <rect x="13.3" y="19.5" width="3.4" height="9" rx="1.7" />
    </g>
    <circle cx="31" cy="21" r="2.9" fill="#ffce3a" />
    <circle cx="36.5" cy="27" r="2.9" fill="#36c5f0" />
    {sparkle(40, 12, 0.16, "#ffffff")}
  </g>
);

// Afterimage Garden — soft coloured splats forming a bridge over water.
const ART_AFTERIMAGE = (
  <g>
    <rect x="5" y="30" width="38" height="10" rx="5" fill="#69c7d4" opacity="0.55" />
    <path d="M9 30c6-8 24-8 30 0" fill="none" style={{ stroke: "var(--c)" }} strokeWidth="4" strokeLinecap="round" />
    <g opacity="0.92">
      <circle cx="12" cy="18" r="4.8" fill="#ffcf5a" />
      <circle cx="19" cy="14" r="3.9" fill="#f47a8f" />
      <circle cx="27" cy="17" r="5.4" style={{ fill: "var(--c)" }} />
      <circle cx="35" cy="21" r="4.1" fill="#3fbf9b" />
      <circle cx="22" cy="25" r="3.4" fill="#ffffff" opacity="0.9" />
    </g>
    {sparkle(40, 10, 0.16, "#ffffff")}
    {sparkle(8, 12, 0.14, "#ffce3a")}
  </g>
);

// Caixa de brincar — an open toy box with colourful balls bouncing out.
const ART_CAIXA = (
  <g>
    <circle cx="14" cy="13" r="4" fill="#ff5d73" />
    <circle cx="24" cy="8.5" r="4.6" fill="#ffce3a" />
    <circle cx="34" cy="13" r="4" fill="#36c5f0" />
    <rect x="7" y="20" width="34" height="7" rx="2.6" style={{ fill: "var(--c)" }} />
    <rect x="9" y="21.4" width="30" height="2.2" rx="1.1" fill="#ffffff" opacity="0.35" />
    <rect x="10" y="27" width="28" height="14" rx="3" style={{ fill: "var(--c)" }} />
    <circle cx="24" cy="31.5" r="3.4" fill="#3fbf6f" />
  </g>
);

// The illustration must live in code; its accent colour comes from the room
// config (site.config.yaml), so the hub and the home cards stay one source.
const ROOM_ART: Record<DiversaoRoom, ReactNode> = {
  jardim: ART_JARDIM,
  afterimage: ART_AFTERIMAGE,
  jogos: ART_JOGOS,
  caixa: ART_CAIXA,
};

export function Diversao({
  room,
  onOpenRoom,
}: {
  room?: DiversaoRoom;
  onOpenRoom: (room: DiversaoRoom) => void;
}) {
  if (room) {
    return (
      <Suspense fallback={<div className="lesson-loading">A preparar…</div>}>
        {room === "jardim" && <Jardim />}
        {room === "afterimage" && <AfterimageGarden />}
        {room === "jogos" && <Jogos />}
        {room === "caixa" && <CaixaDeBrincar />}
      </Suspense>
    );
  }
  return <DiversaoHub onOpenRoom={onOpenRoom} />;
}

/* The hub — reached from the breadcrumb or directly. Big, friendly room cards;
 * the home screen also links straight into each room. */
function DiversaoHub({ onOpenRoom }: { onOpenRoom: (room: DiversaoRoom) => void }) {
  return (
    <div>
      <Mascot
        message="Bem-vindo à Diversão! Escolhe: o teu jardim, o jogo dos splats, os jogos ou a caixa de brincar."
        mood="cheer"
      />
      <div className="dv-rooms">
        {site.diversao.rooms.map((r) => (
          <div
            className="dv-room-slot"
            key={r.id}
            style={{ ["--c" as string]: `var(${r.accent})`, ["--c-soft" as string]: `var(${r.accent}-soft)` }}
          >
            <button className="dv-room" onClick={() => onOpenRoom(r.id)}>
              <span className="dv-room__icon" aria-hidden>
                <svg viewBox="0 0 48 48" className="dv-room__art">{ROOM_ART[r.id]}</svg>
              </span>
              <span className="dv-room__label">{r.label}</span>
              <span className="dv-room__blurb">{r.blurb}</span>
            </button>
            <Speaker
              text={`${r.label}. ${r.blurb}`}
              className="dv-room__speak"
              label={`Ouvir: ${r.label}`}
              size={18}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
