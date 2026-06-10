import { forwardRef, useEffect, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "@sprout/ui";
import { fitCanvas, prefersReducedMotion } from "./canvas";
import { loadBest, saveBest, type ArcadePhase } from "./arcade";
import { sfx } from "./sfx";

/* Corrida dos Elementos — an endless runner starring the five element heroes.
 * A hero runs through its element world; the scene scrolls toward it. TAP (or
 * Space/↑) to jump, tap again in the air for a springy double-jump. Leap the
 * obstacles, grab the glowing orbs for points and a combo. Every so often the
 * world changes: clear a level's distance and you cross into the next element
 * world (Vulcão → Oceano → Floresta → Céu → Cosmos), each with its own brutal
 * parallax sky and its own hero — then it loops, faster.
 *
 * The WORLD is drawn on <canvas> (the shared fitCanvas keeps it crisp on
 * retina/iPad): sky, parallax scenery, ground, obstacles, orbs, particles and
 * the hero's shadow. The HERO itself is a crisp inline SVG (HeroSVG) laid over
 * the canvas — same character as the design preview — positioned and animated
 * by the loop (is-run / is-air; the rig lives in diversao.css). All simulation
 * state lives in a ref so the rAF loop never restarts; React state only carries
 * the HUD/overlay + which world's hero to render. Honours prefers-reduced-motion
 * (gentler speed, fewer particles, no shake). High score persists between visits. */

const BEST_KEY = "sprout.corrida.best";
const HEARTS = 3;

type Ambient = "ember" | "bubble" | "leaf" | "wind" | "star";

interface Level {
  id: string;
  name: string; // world name, shown in the HUD + banner
  hero: string; // hero name, read aloud on the banner
  tunic: string;
  tunicDark: string;
  pants: string;
  hair: string;
  hair2: string; // hair highlight / flame tip
  accent: string; // orb glow + UI accent
  sky: string[]; // top→bottom gradient stops
  far: string; // far parallax silhouette
  near: string; // near parallax silhouette
  groundTop: string;
  groundBottom: string;
  cap: string; // ground surface cap (grass/sand/lava crust)
  orb: string;
  obstacle: [string, string]; // obstacle gradient (top, bottom)
  ambient: Ambient;
  span: number; // distance to clear this world
}

// The five worlds. Each pairs an element hero with a world that reads as that
// element at a glance — palette, skyline silhouettes and ambient particles.
const LEVELS: Level[] = [
  {
    id: "fogo", name: "Vulcão", hero: "Faísca",
    tunic: "#ec6a2e", tunicDark: "#a3441b", pants: "#7a3b1f", hair: "#ff7a2e", hair2: "#ffc23a",
    accent: "#ff8a3c", sky: ["#1a0610", "#5e1626", "#b5431f", "#ff9a4d"],
    far: "#3a1320", near: "#641b1a", groundTop: "#4a2016", groundBottom: "#2a1109", cap: "#ff6a2b",
    orb: "#ffce3a", obstacle: ["#6b3320", "#33170d"], ambient: "ember", span: 6500,
  },
  {
    id: "agua", name: "Oceano", hero: "Maré",
    tunic: "#2aa9e0", tunicDark: "#1c7bad", pants: "#1c6f9c", hair: "#2aa9e0", hair2: "#7fd2f4",
    accent: "#4fc4ee", sky: ["#03182f", "#0a4f7a", "#1f8fd0", "#9fe0f5"],
    far: "#0a3f60", near: "#0c557e", groundTop: "#13567e", groundBottom: "#072a40", cap: "#7fd2f4",
    orb: "#bdeafb", obstacle: ["#0c557e", "#06222f"], ambient: "bubble", span: 7200,
  },
  {
    id: "terra", name: "Floresta", hero: "Raiz",
    tunic: "#4f9e44", tunicDark: "#3c7a34", pants: "#6b4a26", hair: "#6b4a2a", hair2: "#7d5832",
    accent: "#7ec46f", sky: ["#0c2a1a", "#1f5a36", "#5aa75a", "#bfe6a0"],
    far: "#225f37", near: "#2f7d3f", groundTop: "#5a3f23", groundBottom: "#33240f", cap: "#5fbf4f",
    orb: "#caf08a", obstacle: ["#5a3f23", "#2c1d0d"], ambient: "leaf", span: 7800,
  },
  {
    id: "ar", name: "Céu", hero: "Brisa",
    tunic: "#cfe6f0", tunicDark: "#a7c8d8", pants: "#9bbccb", hair: "#e0eef6", hair2: "#bcdcea",
    accent: "#bfe3ff", sky: ["#3a6ea5", "#6fa8d6", "#a9d4f0", "#e8f6ff"],
    far: "#bcd9ea", near: "#dceef8", groundTop: "#cfe6f3", groundBottom: "#a7c8d8", cap: "#ffffff",
    orb: "#ffffff", obstacle: ["#dcecf5", "#a7c8d8"], ambient: "wind", span: 8400,
  },
  {
    id: "luz", name: "Cosmos", hero: "Luzia",
    tunic: "#f2c230", tunicDark: "#cf9d18", pants: "#c79412", hair: "#ffd54a", hair2: "#ffe79a",
    accent: "#ffe07a", sky: ["#06061c", "#160e3a", "#3a1f63", "#7b3fa0"],
    far: "#1c1450", near: "#2c1c66", groundTop: "#241a4a", groundBottom: "#0d0826", cap: "#ffd54a",
    orb: "#fff2bf", obstacle: ["#2c1c66", "#120a2e"], ambient: "star", span: 9000,
  },
];

interface Player {
  py: number; // height of feet above ground (px, 0 = grounded)
  vy: number; // vertical velocity (px/s, + = up)
  jumps: number; // jumps since last grounded (0,1,2)
  squash: number; // landing squash, decays
  run: number; // run-cycle phase (advances with distance)
}
interface Obstacle {
  x: number;
  w: number;
  h: number;
  kind: "low" | "tall";
  variant: number; // 0,1,2 — selects one of the world's three obstacle shapes
}
interface Orb {
  x: number;
  y: number;
  spin: number;
}
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
  gravity: number;
}
interface Float {
  x: number;
  y: number;
  life: number;
  text: string;
  color: string;
}
interface Mote {
  x: number; // 0..1 across the sky
  y: number; // 0..1 down the canvas
  s: number; // size
  ph: number; // phase for wobble/twinkle
}
interface Game {
  phase: ArcadePhase;
  t: number;
  speed: number;
  dist: number; // total distance (drives score)
  levelDist: number; // distance within the current world
  level: number; // index into LEVELS
  banner: number; // seconds left to show the level banner
  collected: number;
  combo: number;
  lives: number;
  invuln: number;
  shake: number;
  player: Player;
  obstacles: Obstacle[];
  orbs: Orb[];
  parts: Particle[];
  floats: Float[];
  motes: Mote[];
  obSpawn: number;
  orbSpawn: number;
  groundScroll: number;
  farScroll: number;
  nearScroll: number;
  skyScroll: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function freshMotes(): Mote[] {
  return Array.from({ length: 22 }, () => ({ x: Math.random(), y: Math.random(), s: rand(1, 3), ph: Math.random() * Math.PI * 2 }));
}

function makeGame(): Game {
  return {
    phase: "ready", t: 0, speed: 0, dist: 0, levelDist: 0, level: 0, banner: 0,
    collected: 0, combo: 0, lives: HEARTS, invuln: 0, shake: 0,
    player: { py: 0, vy: 0, jumps: 0, squash: 0, run: 0 },
    obstacles: [], orbs: [], parts: [], floats: [], motes: freshMotes(),
    obSpawn: 1.6, orbSpawn: 0.6,
    groundScroll: 0, farScroll: 0, nearScroll: 0, skyScroll: 0,
  };
}

/* ---------------- drawing (pure canvas, kid-bright; scene looks the same in
   light and dark, so no theme tokens here) ---------------- */

/** Lighten (amt>0, toward white) or darken (amt<0, toward black) a #rrggbb. */
function shade(hex: string, amt: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const t = amt < 0 ? 0 : 255;
  const p = Math.abs(amt);
  r = Math.round(r + (t - r) * p);
  g = Math.round(g + (t - g) * p);
  b = Math.round(b + (t - b) * p);
  return `rgb(${r},${g},${b})`;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawSky(ctx: CanvasRenderingContext2D, w: number, h: number, L: Level) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  const n = L.sky.length;
  L.sky.forEach((c, i) => sky.addColorStop(i / (n - 1), c));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
}

// Ambient motes: embers rising, bubbles wobbling up, leaves drifting down, wind
// streaks, stars twinkling — one cheap pass that gives each world its weather.
function drawMotes(ctx: CanvasRenderingContext2D, w: number, h: number, L: Level, g: Game) {
  ctx.save();
  for (const m of g.motes) {
    const wob = Math.sin(g.t * 1.4 + m.ph) * 14;
    let x = m.x * w;
    let y = m.y * h;
    if (L.ambient === "ember") { x += wob * 0.6; ctx.fillStyle = `rgba(255,${140 + ((m.ph * 30) % 80) | 0},60,0.8)`; }
    else if (L.ambient === "bubble") { x += wob; ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, m.s + 1, 0, Math.PI * 2); ctx.stroke(); continue; }
    else if (L.ambient === "leaf") { x += wob; ctx.fillStyle = m.ph > 3 ? "#7ec46f" : "#caf08a"; }
    else if (L.ambient === "wind") { ctx.strokeStyle = "rgba(255,255,255,0.45)"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 16 + wob, y); ctx.stroke(); continue; }
    else { const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(g.t * 2 + m.ph)); ctx.fillStyle = `rgba(255,255,255,${tw})`; }
    ctx.beginPath();
    ctx.arc(x, y, m.s, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// Two parallax silhouette layers (far + near). The shape per world reads as its
// place: jagged volcano peaks, round coral mounds, pointed pines, soft cloud
// banks, sharp moon-mountains. Same routine, different roughness/teeth.
function drawScenery(ctx: CanvasRenderingContext2D, w: number, h: number, baseY: number, scroll: number, color: string, teeth: number, jag: number, round: boolean, L: Level) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, h);
  const step = w / teeth;
  for (let i = 0; i <= teeth; i++) {
    const x = i * step;
    const seed = Math.sin((i * 12.9898 + Math.floor(scroll / step) * 7.123)) * 43758.5453;
    const r = (seed - Math.floor(seed));
    const peak = baseY - (jag * (0.4 + 0.6 * r));
    const px = x - (scroll % step);
    if (round) {
      ctx.quadraticCurveTo(px - step / 2, peak, px, baseY - jag * 0.2);
    } else {
      ctx.lineTo(px, peak);
      ctx.lineTo(px + step / 2, baseY);
    }
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
  // a couple of world accents (volcano glow, cloud puffs, tree trunks are implied)
  if (L.ambient === "star") {
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.arc(w * 0.78, baseY - jag * 0.7, jag * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGround(ctx: CanvasRenderingContext2D, w: number, h: number, groundY: number, scroll: number, L: Level) {
  const dirt = ctx.createLinearGradient(0, groundY, 0, h);
  dirt.addColorStop(0, L.groundTop);
  dirt.addColorStop(1, L.groundBottom);
  ctx.fillStyle = dirt;
  ctx.fillRect(0, groundY, w, h - groundY);
  // surface cap (grass blades / lava crust / sand line)
  ctx.fillStyle = L.cap;
  ctx.fillRect(0, groundY, w, 7);
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = L.cap;
  ctx.fillRect(0, groundY + 7, w, 3);
  ctx.globalAlpha = 1;
  // scrolling surface ticks
  ctx.fillStyle = "rgba(255,255,255,0.16)";
  const gap = 44;
  const off = -(scroll % gap);
  for (let x = off; x < w + gap; x += gap) {
    ctx.fillRect(x, groundY + 12, 18, 2);
  }
}

// Each world draws three distinct obstacle shapes (by o.variant) so the run
// never feels like the same block over and over. Collision stays on the box.
function drawObstacle(ctx: CanvasRenderingContext2D, o: Obstacle, groundY: number, L: Level, t: number) {
  const top = groundY - o.h;
  const mid = o.x + o.w / 2;
  const vg = (c0: string, c1: string) => {
    const g = ctx.createLinearGradient(0, top, 0, groundY);
    g.addColorStop(0, c0);
    g.addColorStop(1, c1);
    return g;
  };
  const mound = (c0: string, c1: string) => {
    ctx.fillStyle = vg(c0, c1);
    ctx.beginPath();
    ctx.moveTo(o.x, groundY);
    ctx.quadraticCurveTo(o.x, top, mid, top);
    ctx.quadraticCurveTo(o.x + o.w, top, o.x + o.w, groundY);
    ctx.closePath();
    ctx.fill();
  };

  switch (L.id) {
    case "fogo": {
      if (o.variant === 1) {
        // flame column — flickers, glows
        const fl = Math.sin(t * 9 + o.x) * 3;
        ctx.fillStyle = "#3a1208";
        roundRect(ctx, mid - o.w * 0.55, groundY - 7, o.w * 1.1, 7, 3);
        ctx.fill();
        ctx.save();
        ctx.shadowColor = "#ff7a2e";
        ctx.shadowBlur = 16;
        const fg = ctx.createLinearGradient(0, top, 0, groundY);
        fg.addColorStop(0, "#ffe79a"); fg.addColorStop(0.5, "#ff7a2e"); fg.addColorStop(1, "#e8431b");
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.moveTo(mid - o.w * 0.5, groundY - 4);
        ctx.quadraticCurveTo(mid - o.w * 0.55 + fl, top + o.h * 0.4, mid - o.w * 0.18, top + o.h * 0.18);
        ctx.quadraticCurveTo(mid, top - 7 + fl, mid + o.w * 0.18, top + o.h * 0.18);
        ctx.quadraticCurveTo(mid + o.w * 0.55 - fl, top + o.h * 0.4, mid + o.w * 0.5, groundY - 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        ctx.fillStyle = "#ffe79a";
        ctx.beginPath();
        ctx.moveTo(mid - o.w * 0.2, groundY - 5);
        ctx.quadraticCurveTo(mid, top + o.h * 0.35 + fl, mid + o.w * 0.2, groundY - 5);
        ctx.closePath();
        ctx.fill();
      } else {
        // lava rock (squat or wide crust) with glowing cracks
        mound("#6b3320", "#2a0f08");
        ctx.save();
        ctx.strokeStyle = "#ff8a33";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#ff7a2e";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(mid, top + 4);
        ctx.lineTo(mid - o.w * 0.16, top + o.h * 0.55);
        ctx.lineTo(mid + o.w * 0.1, groundY - 4);
        ctx.moveTo(mid + o.w * 0.05, top + o.h * 0.4);
        ctx.lineTo(mid + o.w * 0.28, top + o.h * 0.7);
        ctx.stroke();
        ctx.restore();
      }
      break;
    }
    case "agua": {
      if (o.variant === 1) {
        // tall water spout, curling foam top
        ctx.fillStyle = vg("#7fd2f4", "#1c6f9c");
        roundRect(ctx, o.x, top, o.w, o.h, o.w * 0.5);
        ctx.fill();
        ctx.fillStyle = "#eafaff";
        ctx.beginPath();
        ctx.arc(mid, top + o.w * 0.45, o.w * 0.5, Math.PI, Math.PI * 2);
        ctx.fill();
      } else {
        // wave hump with white foam
        mound("#3fb6e8", "#1c6f9c");
        ctx.fillStyle = "#eafaff";
        ctx.beginPath();
        ctx.ellipse(mid, top + 4, o.w * 0.42, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.ellipse(mid - o.w * 0.18, top + o.h * 0.4, o.w * 0.12, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      break;
    }
    case "terra": {
      if (o.variant === 1) {
        // little tree: trunk + leafy crown
        ctx.fillStyle = vg("#8a5a26", "#5a3415");
        roundRect(ctx, mid - o.w * 0.2, groundY - o.h * 0.55, o.w * 0.4, o.h * 0.55, 4);
        ctx.fill();
        ctx.fillStyle = "#4f9e44";
        for (const [dx, dy] of [[-0.32, 0.06], [0.32, 0.08], [0, -0.18]] as const) {
          ctx.beginPath();
          ctx.arc(mid + o.w * dx, top + o.h * 0.32 + o.h * dy, o.w * 0.42, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#6fd05c";
        ctx.beginPath();
        ctx.arc(mid - o.w * 0.12, top + o.h * 0.24, o.w * 0.22, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // a fallen log with end rings + moss
        ctx.fillStyle = vg("#a9712f", "#7d4f1d");
        roundRect(ctx, o.x, top, o.w, o.h, Math.min(o.h / 2, 10));
        ctx.fill();
        ctx.strokeStyle = "rgba(60,33,10,0.55)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(o.x + o.w - 7, top + o.h / 2, 5, o.h * 0.32, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#5fbf4f";
        ctx.beginPath();
        ctx.ellipse(mid - o.w * 0.1, top + 2, o.w * 0.34, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case "ar": {
      ctx.fillStyle = "#ffffff";
      if (o.variant === 1) {
        // tall cloud pillar (stacked puffs)
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(mid + (i % 2 ? 5 : -5), groundY - i * o.h * 0.32 - o.h * 0.18, o.w * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // a fluffy cloud bank
        for (const [dx, dy] of [[-0.34, 0.08], [0.34, 0.08], [0, -0.04]] as const) {
          ctx.beginPath();
          ctx.arc(mid + o.w * dx, top + o.h * 0.5 + o.h * dy, o.h * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "rgba(167,200,216,0.5)";
        ctx.beginPath();
        ctx.ellipse(mid, groundY - 2, o.w * 0.5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    default: {
      // luz — glowing crystals
      ctx.save();
      ctx.shadowColor = L.accent;
      ctx.shadowBlur = 12;
      const cg = vg(shade(L.accent, 0.25), L.tunicDark);
      ctx.fillStyle = cg;
      if (o.variant === 1) {
        // a tall crystal spire
        ctx.beginPath();
        ctx.moveTo(mid, top);
        ctx.lineTo(mid - o.w * 0.5, top + o.h * 0.42);
        ctx.lineTo(mid - o.w * 0.3, groundY);
        ctx.lineTo(mid + o.w * 0.3, groundY);
        ctx.lineTo(mid + o.w * 0.5, top + o.h * 0.42);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.beginPath();
        ctx.moveTo(mid, top);
        ctx.lineTo(mid - o.w * 0.16, top + o.h * 0.42);
        ctx.lineTo(mid, groundY);
        ctx.closePath();
        ctx.fill();
      } else {
        // a cluster of shards
        for (const [dx, hh, ww] of [[-0.3, 0.62, 0.7], [0.26, 0.5, 0.8], [0, 1, 1]] as const) {
          const cx = mid + o.w * dx, ch = o.h * hh, cw = o.w * 0.26 * ww;
          ctx.fillStyle = cg;
          ctx.beginPath();
          ctx.moveTo(cx, groundY - ch);
          ctx.lineTo(cx - cw, groundY);
          ctx.lineTo(cx + cw, groundY);
          ctx.closePath();
          ctx.fill();
        }
      }
      ctx.restore();
    }
  }
}

function drawOrb(ctx: CanvasRenderingContext2D, o: Orb, r: number, L: Level) {
  ctx.save();
  ctx.translate(o.x, o.y);
  ctx.scale(Math.cos(o.spin) * 0.85 + 0.15, 1);
  ctx.shadowColor = L.accent;
  ctx.shadowBlur = 16;
  const g = ctx.createRadialGradient(0, -r * 0.3, 1, 0, 0, r);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(1, L.orb);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/* ---------------- the hero: a crisp inline SVG laid over the canvas world ----
   Side profile, facing right. The shared body is recoloured per world; only the
   hair differs by element. The game loop positions it and toggles is-run/is-air
   (run cycle + leap pose live in diversao.css). Ported from the design preview
   in docs/assets/academia-element-heroes-svg.html. */

// front crown cap — covers the skull so no skin shows; fringe sits above the brow
const CAP_D = "M30 40 Q28 22 43 16 Q53 12 63 17 Q72 22 71 37 L68 30 L64 35 L60 30 L56 34 Q52 30 49 30 Q40 31 34 39 Q31 41 30 40 Z";

// hair behind the head (volume, ponytail, flames) — drawn before the head circle
function hairBack(L: Level) {
  switch (L.id) {
    case "fogo":
      return (
        <>
          <path d="M30 46 Q18 24 28 8 Q31 24 37 10 Q40 28 48 14 Q50 26 50 34 Q40 30 30 46 Z" fill="#ff7a2e" />
          <path d="M46 16 Q53 5 60 16 Q55 22 53 31 Q49 24 46 16 Z" fill="#ff7a2e" />
        </>
      );
    case "agua":
      return (
        <>
          <path d="M31 44 Q20 26 32 14 Q44 8 52 17 Q42 27 34 42 Q32 34 31 44 Z" fill="#2aa9e0" />
          <path d="M31 40 Q15 56 22 86 Q26 98 35 97 Q26 80 30 60 Q31 50 35 42 Z" fill="#2aa9e0" />
          <path d="M30 46 Q19 60 25 82 Q21 60 28 46 Z" fill="#62c7ef" />
        </>
      );
    case "terra":
      return (
        <>
          <path d="M30 46 Q20 26 30 11 Q33 26 39 13 Q42 30 50 18 Q40 30 30 46 Z" fill="#6b4a2a" />
          <path d="M30 44 Q22 28 28 17 Q30 30 30 44 Z" fill="#5a3f23" />
        </>
      );
    case "ar":
      return (
        <>
          <path d="M31 44 Q15 30 18 15 Q24 26 28 15 Q28 30 35 21 Q33 33 31 44 Z" fill="#cfe2ee" />
          <path d="M35 20 Q24 13 17 18 Q26 16 33 22 Z" fill="#bcdcea" />
        </>
      );
    default:
      return (
        <>
          <path d="M30 46 Q20 26 32 14 Q45 7 53 18 Q40 28 30 46 Z" fill="#ffd54a" />
          <path d="M30 44 Q24 53 31 59 Q34 61 36 57 Q30 55 31 46 Z" fill="#ffd54a" />
        </>
      );
  }
}

// fringe / flames / highlights in front of the face
function hairFront(L: Level) {
  switch (L.id) {
    case "fogo":
      return (
        <>
          <path d="M50 30 Q57 15 67 22 Q73 27 71 39 L67 31 L63 40 L59 31 L55 38 Q52 33 50 34 Z" fill="#ff7a2e" />
          <path d="M52 31 Q58 20 65 24 Q60 30 60 37 Q56 31 52 32 Z" fill="#ffc23a" />
        </>
      );
    case "agua":
      return (
        <>
          <path d="M50 28 Q58 15 68 22 Q73 27 71 39 Q66 31 60 33 L64 25 Q54 30 50 34 Z" fill="#2aa9e0" />
          <path d="M52 30 Q58 21 65 25 Q59 30 58 36 Q54 31 52 31 Z" fill="#62c7ef" />
        </>
      );
    case "terra":
      return (
        <>
          <path d="M50 26 Q58 13 68 22 Q73 27 71 41 L67 33 L63 41 L59 33 L55 39 Q52 31 50 32 Z" fill="#6b4a2a" />
          <path d="M52 32 Q58 22 66 26 Q60 31 60 38 Q56 32 52 33 Z" fill="#7d5832" />
          <g transform="rotate(10 60 13)">
            <path d="M60 4 Q70 7 66 19 Q56 17 60 4 Z" fill="#5bbf52" />
          </g>
        </>
      );
    case "ar":
      return (
        <>
          <path d="M50 26 Q58 15 71 17 Q62 22 60 30 Q69 25 75 27 Q66 34 71 41 Q66 33 58 34 Q53 30 50 32 Z" fill="#e0eef6" />
          <path d="M54 28 Q60 22 69 21 Q62 27 60 33 Q56 29 54 30 Z" fill="#cfe2ee" />
        </>
      );
    default:
      return (
        <>
          <path d="M50 28 Q58 15 68 22 Q73 27 71 39 Q66 33 61 38 Q56 32 51 36 Z" fill="#ffd54a" />
          <path d="M52 31 Q58 22 65 26 Q59 31 59 37 Q55 32 52 32 Z" fill="#ffe79a" />
        </>
      );
  }
}

const HeroSVG = forwardRef<SVGSVGElement, { level: Level }>(function HeroSVG({ level: L }, ref) {
  const skin = "#f7cfa2", skinSh = "#e7b98a", boot = "#4a3b2c", line = "#b86a3a";
  return (
    <svg ref={ref} className="dv-hero is-run" viewBox="0 0 100 150" aria-hidden="true">
      <g className="figure">
        {/* back leg + back arm (shaded for depth) */}
        <g className="legL">
          <rect x="44" y="97" width="8" height="26" rx="3.6" fill={L.pants} />
          <rect x="44" y="97" width="8" height="26" rx="3.6" fill="#000" opacity="0.14" />
          <path d="M44 119 h12 a3 3 0 0 1 3 3 v2 a3 3 0 0 1 -3 3 H44 Z" fill="#4b3c2e" />
        </g>
        <g className="armL">
          <rect x="46.5" y="66.5" width="7.6" height="28" rx="3.8" fill={L.tunicDark} />
          <circle cx="50.3" cy="95" r="4.5" fill={skinSh} />
        </g>
        {/* torso */}
        <path d="M40 70 Q40 65 45 65 L56 65 Q61 65 62 71 Q64 85 60.5 98 Q60.5 100.4 58 100.4 L43 100.4 Q40.5 100.4 40.5 98 Q38 85 40 70 Z" fill={L.tunic} />
        <path d="M40 70 Q40 65 45 65 L56 65 Q61 65 62 71 L60 84 Q49 88 40.5 84 Z" fill="#ffffff" opacity="0.1" />
        <rect x="41" y="92" width="20" height="5.4" rx="2.5" fill={L.tunicDark} />
        <rect x="48" y="92.8" width="6" height="3.6" rx="1.3" fill="#ffe9a8" />
        {/* front leg */}
        <g className="legR">
          <rect x="51" y="97" width="8" height="26" rx="3.6" fill={L.pants} />
          <path d="M51 119 h12 a3 3 0 0 1 3 3 v2 a3 3 0 0 1 -3 3 H51 Z" fill={boot} />
        </g>
        {/* head */}
        <g className="head">
          {hairBack(L)}
          <circle cx="50" cy="42" r="22" fill={skin} />
          <path d="M70.5 40 q4.2 1.6 3.6 3.9 q-.6 2.2 -4.4 1.9 Z" fill={skin} />
          <path d="M28 47 a22 22 0 0 0 30 14 a22 22 0 0 1 -30 -14 Z" fill={skinSh} opacity="0.4" />
          <path d={CAP_D} fill={L.hair} />
          <path className="browR" d="M55 37 Q59 35 63 37" fill="none" stroke="#7a5230" strokeWidth="2.1" strokeLinecap="round" />
          <g className="eyes">
            <circle cx="60" cy="45" r="4.6" fill="#3a3550" />
            <circle cx="61.7" cy="43.4" r="1.5" fill="#ffffff" />
          </g>
          <circle cx="62" cy="51" r="3" fill="#ff9bb0" opacity="0.5" />
          <path d="M59.5 53 Q63 56.5 66.5 52.5" fill="none" stroke={line} strokeWidth="2.1" strokeLinecap="round" />
          {hairFront(L)}
        </g>
        {/* front arm */}
        <g className="armR">
          <rect x="50" y="66.5" width="7.8" height="28" rx="3.9" fill={L.tunic} />
          <circle cx="53.8" cy="95" r="4.7" fill={skin} />
        </g>
      </g>
    </svg>
  );
});

export function Corrida() {
  const reduced = prefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<SVGSVGElement>(null);
  const gameRef = useRef<Game>(makeGame());

  const [phase, setPhase] = useState<ArcadePhase>("ready");
  const [levelIdx, setLevelIdx] = useState(0); // which world's hero to render
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(HEARTS);
  const [best, setBest] = useState(() => loadBest(BEST_KEY));
  const [record, setRecord] = useState(false);
  const [muted, setMuted] = useState(() => sfx.isMuted());
  const [levelName, setLevelName] = useState(LEVELS[0].name);
  const [levelNo, setLevelNo] = useState(1);

  const begin = () => {
    sfx.unlock();
    const G = gameRef.current;
    Object.assign(G, makeGame());
    G.phase = "playing";
    G.speed = reduced ? 170 : 230;
    G.banner = 2;
    setPhase("playing");
    setScore(0);
    setLives(HEARTS);
    setRecord(false);
    setLevelName(LEVELS[0].name);
    setLevelNo(1);
    setLevelIdx(0);
    sfx.start();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const G = gameRef.current;
    let raf = 0;
    let last = 0;
    let shownScore = -1;
    let shownLevel = -1;

    const jump = () => {
      if (G.phase !== "playing") return;
      const p = G.player;
      if (p.py <= 0.5) {
        p.vy = reduced ? 720 : 780;
        p.jumps = 1;
        sfx.jump(false);
      } else if (p.jumps < 2) {
        p.vy = reduced ? 660 : 720;
        p.jumps = 2;
        sfx.jump(true);
      }
    };

    const step = (time: number) => {
      const { w, h } = fitCanvas(canvas, ctx);
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 0.016;
      last = time;
      G.t += dt;

      const groundH = Math.max(58, Math.min(104, h * 0.16));
      const groundY = h - groundH;
      const px = w * 0.24;
      const heroPx = clamp(h * 0.42, 120, 210); // rendered SVG hero height
      const heroR = heroPx * 0.2; // rough body radius for collisions
      const gravity = reduced ? 2050 : 2350;
      const L = LEVELS[G.level];

      G.skyScroll += (G.phase === "playing" ? G.speed * 0.05 : 7) * dt;

      if (G.phase === "playing") {
        G.speed = Math.min(reduced ? 380 : 660, G.speed + (reduced ? 4 : 7) * dt);
        const ds = G.speed * dt;
        G.dist += ds;
        G.levelDist += ds;
        G.groundScroll += ds;
        G.nearScroll += ds * 0.5;
        G.farScroll += ds * 0.2;
        G.player.run += ds * 0.045; // run-cycle speed tracks ground speed
        if (G.banner > 0) G.banner -= dt;
        if (G.invuln > 0) G.invuln -= dt;
        if (G.shake > 0) G.shake = Math.max(0, G.shake - dt * 2.5);

        // level transition — cross into the next world, keep going (loops, faster)
        if (G.levelDist >= L.span) {
          G.levelDist = 0;
          G.level = (G.level + 1) % LEVELS.length;
          G.banner = 2.2;
          G.obstacles = [];
          G.orbs = [];
          G.motes = freshMotes();
          G.invuln = Math.max(G.invuln, 0.8);
          sfx.fanfare();
        }

        // physics
        const p = G.player;
        p.vy -= gravity * dt;
        p.py += p.vy * dt;
        if (p.py <= 0) {
          if (p.vy < -360) p.squash = Math.min(0.6, -p.vy / 1700);
          p.py = 0;
          p.vy = 0;
          p.jumps = 0;
        }
        p.squash *= 0.8;

        // spawns spaced by distance so the rhythm stays jumpable as it speeds up.
        // Three obstacle shapes per world, and varied gaps: usually fair, sometimes
        // a quick double-hop, sometimes a long breather.
        G.obSpawn -= dt;
        if (G.obSpawn <= 0 && G.banner <= 0) {
          const type = Math.floor(Math.random() * 3);
          let ow: number, oh: number, kind: Obstacle["kind"];
          if (type === 1) { kind = "tall"; ow = rand(24, 34); oh = rand(44, 64); }       // tall & narrow
          else if (type === 2) { kind = "low"; ow = rand(52, 78); oh = rand(22, 32); }    // wide & low
          else { kind = "low"; ow = rand(34, 50); oh = ow * rand(0.72, 0.95); }           // squat lump
          G.obstacles.push({ x: w + 40, w: ow, h: oh, kind, variant: type });
          const roll = Math.random();
          if (roll < 0.16) G.obSpawn = rand(160, 240) / G.speed;       // quick double-hop
          else if (roll > 0.84) G.obSpawn = rand(640, 860) / G.speed;  // long breather
          else G.obSpawn = rand(380, 560) / G.speed;                   // normal
        }
        G.orbSpawn -= dt;
        if (G.orbSpawn <= 0) {
          const n = Math.random() < 0.35 ? 3 : 1;
          // keep orbs inside a single/double-jump reach so every one is catchable
          const baseY = groundY - rand(34, 118);
          for (let i = 0; i < n; i++) {
            G.orbs.push({ x: w + 40 + i * 42, y: baseY - Math.sin((i / Math.max(1, n - 1)) * Math.PI) * 26, spin: Math.random() * Math.PI });
          }
          G.orbSpawn = rand(220, 360) / G.speed;
        }

        const pcx = px;
        const pcy = groundY - heroR - p.py;
        for (let i = G.obstacles.length - 1; i >= 0; i--) {
          const o = G.obstacles[i];
          o.x -= ds;
          if (o.x + o.w < -20) {
            G.obstacles.splice(i, 1);
            continue;
          }
          if (G.invuln <= 0) {
            const nx = clamp(pcx, o.x, o.x + o.w);
            const ny = clamp(pcy, groundY - o.h, groundY);
            if (Math.hypot(pcx - nx, pcy - ny) < heroR * 0.6) {
              G.lives -= 1;
              G.combo = 0;
              G.invuln = 1.3;
              G.shake = reduced ? 0 : 1;
              sfx.hit();
              burst(G, pcx, pcy, "#ff6a4d", reduced ? 6 : 16);
              setLives(G.lives);
              if (G.lives <= 0) {
                G.phase = "over";
                const sc = score2(G);
                if (sc > loadBest(BEST_KEY)) {
                  saveBest(BEST_KEY, sc);
                  setBest(sc);
                  setRecord(true);
                  sfx.fanfare();
                } else {
                  sfx.over();
                }
                setPhase("over");
              }
            }
          }
        }

        for (let i = G.orbs.length - 1; i >= 0; i--) {
          const s = G.orbs[i];
          s.x -= ds;
          s.spin += dt * 4;
          if (s.x < -30) {
            G.orbs.splice(i, 1);
            G.combo = 0;
            continue;
          }
          if (Math.hypot(pcx - s.x, pcy - s.y) < heroR * 0.8 + 16) {
            G.orbs.splice(i, 1);
            G.collected += 1;
            G.combo += 1;
            sfx.coin(G.combo - 1);
            sparkle(G, s.x, s.y, L.accent, reduced ? 4 : 10);
            if (G.combo > 1) G.floats.push({ x: s.x, y: s.y, life: 0.9, text: `x${G.combo}`, color: L.accent });
          }
        }
      }

      for (let i = G.parts.length - 1; i >= 0; i--) {
        const pt = G.parts[i];
        pt.life -= dt;
        if (pt.life <= 0) {
          G.parts.splice(i, 1);
          continue;
        }
        pt.vy += pt.gravity * dt;
        pt.x += pt.vx * dt - (G.phase === "playing" ? G.speed * dt * 0.4 : 0);
        pt.y += pt.vy * dt;
      }
      for (let i = G.floats.length - 1; i >= 0; i--) {
        const f = G.floats[i];
        f.life -= dt;
        f.y -= 30 * dt;
        f.x -= (G.phase === "playing" ? G.speed : 0) * dt;
        if (f.life <= 0) G.floats.splice(i, 1);
      }

      // ---- draw ----
      const L2 = LEVELS[G.level];
      ctx.save();
      if (G.shake > 0) ctx.translate(rand(-1, 1) * 6 * G.shake, rand(-1, 1) * 6 * G.shake);
      drawSky(ctx, w, h, L2);
      drawMotes(ctx, w, h, L2, G);
      const teeth = L2.id === "ar" ? 5 : L2.id === "agua" ? 6 : 7;
      const roundTops = L2.id === "agua" || L2.id === "ar";
      drawScenery(ctx, w, h, groundY - 26, G.farScroll, L2.far, teeth, groundH * 1.5, roundTops, L2);
      drawScenery(ctx, w, h, groundY - 4, G.nearScroll, L2.near, teeth + 2, groundH * 0.9, roundTops, L2);
      drawGround(ctx, w, h, groundY, G.groundScroll, L2);

      for (const o of G.obstacles) drawObstacle(ctx, o, groundY, L2, G.t);
      for (const s of G.orbs) drawOrb(ctx, s, 15, L2);

      // shadow (canvas) — the hero itself is the SVG overlay, positioned below
      const p = G.player;
      const shadowScale = Math.max(0.3, 1 - p.py / 280);
      ctx.fillStyle = `rgba(0,0,0,${0.26 * shadowScale})`;
      ctx.beginPath();
      ctx.ellipse(px, groundY - 1, heroR * 1.0 * shadowScale, heroR * 0.32 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // position + animate the SVG hero overlay (CSS px coords match the canvas)
      const hero = heroRef.current;
      if (hero) {
        const wd = heroPx * (100 / 150);
        const footY = heroPx * (126 / 150); // distance from the svg top to the feet
        hero.style.width = `${wd}px`;
        hero.style.height = `${heroPx}px`;
        hero.style.transform = `translate(${px - wd / 2}px, ${groundY - footY - p.py}px)`;
        const air = G.phase === "playing" && p.py > 2;
        hero.classList.toggle("is-air", air);
        hero.classList.toggle("is-run", !air);
        hero.style.opacity = G.invuln > 0 && Math.floor(G.t * 12) % 2 === 0 ? "0.45" : "1";
      }

      for (const pt of G.parts) {
        ctx.globalAlpha = Math.max(0, pt.life / pt.max);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
      ctx.font = "800 22px system-ui, sans-serif";
      for (const f of G.floats) {
        ctx.globalAlpha = Math.max(0, f.life / 0.9);
        ctx.fillStyle = f.color;
        ctx.fillText(f.text, f.x, f.y);
      }
      ctx.globalAlpha = 1;

      // level banner ("Nível N — Mundo")
      if (G.banner > 0 && G.phase === "playing") {
        ctx.globalAlpha = clamp(G.banner, 0, 1);
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        roundRect(ctx, w / 2 - 150, h * 0.28, 300, 64, 16);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "800 24px system-ui, sans-serif";
        ctx.fillText(`Nível ${G.level + 1} — ${L2.name}`, w / 2, h * 0.28 + 30);
        ctx.font = "700 16px system-ui, sans-serif";
        ctx.fillStyle = L2.accent;
        ctx.fillText(L2.hero, w / 2, h * 0.28 + 52);
        ctx.globalAlpha = 1;
      }
      ctx.restore();

      // cheap HUD pushes only on change
      if (G.phase === "playing") {
        const sc = score2(G);
        if (sc !== shownScore) {
          shownScore = sc;
          setScore(sc);
        }
        if (G.level !== shownLevel) {
          shownLevel = G.level;
          setLevelName(L2.name);
          setLevelNo(G.level + 1);
          setLevelIdx(G.level); // re-render the SVG hero in the new world's colours
        }
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onPointer = (e: PointerEvent) => {
      e.preventDefault();
      sfx.unlock();
      jump();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    canvas.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [reduced]);

  const resultSay = record
    ? `Novo recorde! ${score} pontos!`
    : `Fizeste ${score} pontos. O teu recorde é ${best}.`;

  return (
    <div className="dv-play">
      <div className="dv-scorebar">
        <span className="dv-score">
          <Icon name="star" size={18} fill="currentColor" /> {score}
        </span>
        <span className="dv-score" aria-label={`Nível ${levelNo}, ${levelName}`} title={`Nível ${levelNo}`}>
          <Icon name="flag" size={18} /> {levelNo}· {levelName}
        </span>
        <span className="dv-score dv-score--hearts" aria-label={`${lives} vidas`}>
          {Array.from({ length: HEARTS }, (_, i) => (
            <Icon key={i} name="heart" size={20} fill={i < lives ? "currentColor" : "none"} />
          ))}
        </span>
        <span style={{ display: "inline-flex", gap: 8 }}>
          <button
            className={`dv-tool ${muted ? "" : "is-active"}`}
            onClick={() => setMuted(sfx.toggleMuted())}
            aria-label={muted ? "Ligar o som" : "Desligar o som"}
            title={muted ? "Ligar o som" : "Desligar o som"}
          >
            <Icon name="music" size={20} />
          </button>
          <button className="dv-tool" onClick={begin} aria-label="Recomeçar" title="Recomeçar">
            <Icon name="refresh" size={20} />
          </button>
        </span>
      </div>

      <div className="dv-arcade">
        <canvas ref={canvasRef} className="dv-canvas" aria-label="Corrida dos Elementos — toca para saltar" />
        <HeroSVG ref={heroRef} level={LEVELS[levelIdx]} />

        {phase === "ready" && (
          <div className="dv-overlay" onClick={begin} role="button" tabIndex={0} aria-label="Começar a jogar">
            <h3 className="dv-overlay__title">Corrida dos Elementos</h3>
            <p className="dv-overlay__sub">Corre pelos cinco mundos! Toca para saltar e apanha os orbes. Toca outra vez no ar para um salto duplo.</p>
            <button className="dv-tool dv-tool--wide" onClick={begin}>
              <Icon name="forward" size={20} /> <span>Começar</span>
            </button>
            {best > 0 && <p className="dv-overlay__best"><Icon name="trophy" size={16} /> Recorde: {best}</p>}
          </div>
        )}

        {phase === "over" && (
          <div className="dv-overlay">
            <h3 className="dv-overlay__title">{record ? "Novo recorde! 🎉" : "Fim da corrida!"}</h3>
            <p className="dv-overlay__score">{score}</p>
            <p className="dv-overlay__best"><Icon name="trophy" size={16} /> Recorde: {best}</p>
            <div style={{ display: "inline-flex", gap: 10, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              <Speaker text={resultSay} className="dv-tool" label="Ouvir o resultado" size={20} />
              <button className="dv-tool dv-tool--wide" onClick={begin}>
                <Icon name="refresh" size={20} /> <span>Jogar outra vez</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Score = distance + orbs + a bonus for each world reached. */
function score2(g: Game): number {
  return Math.floor(g.dist / 26) + g.collected * 10 + g.level * 50;
}

/* ---- particle spawners ---- */
function sparkle(g: Game, x: number, y: number, color: string, n: number) {
  for (let i = 0; i < n; i++)
    g.parts.push({ x, y, vx: rand(-140, 140), vy: rand(-160, 40), life: 0.6, max: 0.6, size: rand(2, 5), color: i % 2 ? color : "#fff", gravity: 260 });
}
function burst(g: Game, x: number, y: number, color: string, n: number) {
  for (let i = 0; i < n; i++)
    g.parts.push({ x, y, vx: rand(-200, 200), vy: rand(-220, 60), life: 0.7, max: 0.7, size: rand(3, 7), color: i % 3 ? color : "#ffd23a", gravity: 420 });
}
