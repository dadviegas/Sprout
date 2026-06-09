import { useEffect, useRef, useState } from "react";
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
 * Like the other arcade games this is drawn entirely on <canvas> (the shared
 * fitCanvas keeps it crisp on retina/iPad). All simulation state lives in a ref
 * so the rAF loop never restarts; React state only carries the HUD/overlay.
 * Honours prefers-reduced-motion (gentler speed, fewer particles, no shake).
 * The high score persists between visits. The hero is drawn procedurally in
 * side profile — the polished front/side SVGs live in docs/ as the design
 * reference and the future character-select art. */

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

// A chunky rounded limb (thigh/arm) rotated about its top joint, with an optional
// boot or hand at the far end. ang 0 = hanging straight down; + swings forward.
function limb(ctx: CanvasRenderingContext2D, jx: number, jy: number, len: number, wide: number, ang: number, color: string, end?: { color: string; foot?: boolean }) {
  ctx.save();
  ctx.translate(jx, jy);
  ctx.rotate(ang);
  roundRect(ctx, -wide / 2, -wide * 0.35, wide, len + wide * 0.35, wide / 2);
  ctx.fillStyle = color;
  ctx.fill();
  // soft inner shade for a bit of roundness
  ctx.fillStyle = "rgba(0,0,0,0.13)";
  roundRect(ctx, wide * 0.08, 0, wide * 0.42, len, wide * 0.21);
  ctx.fill();
  if (end) {
    ctx.fillStyle = end.color;
    if (end.foot) {
      roundRect(ctx, -wide * 0.34, len - wide * 0.25, wide * 1.55, wide * 0.9, wide * 0.45);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, len, wide * 0.66, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawHair(ctx: CanvasRenderingContext2D, L: Level, hx: number, hy: number, r: number, sway: number) {
  ctx.fillStyle = L.hair;
  switch (L.id) {
    case "fogo": {
      // flame crown: back tuft + pointed flames over the top, yellow inner
      ctx.beginPath();
      ctx.moveTo(hx - r, hy + 2);
      ctx.quadraticCurveTo(hx - r * 1.3, hy - r * 1.6, hx - r * 0.5, hy - r * 1.1);
      ctx.quadraticCurveTo(hx - r * 0.3, hy - r * 2.1, hx + r * 0.1, hy - r * 1.2);
      ctx.quadraticCurveTo(hx + r * 0.4, hy - r * 2.3, hx + r * 0.7, hy - r * 1.1);
      ctx.quadraticCurveTo(hx + r * 1.2, hy - r * 1.7, hx + r * 0.9, hy + r * 0.2);
      ctx.quadraticCurveTo(hx, hy - r * 0.7, hx - r, hy + 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = L.hair2;
      ctx.beginPath();
      ctx.moveTo(hx - r * 0.5, hy - r * 0.4);
      ctx.quadraticCurveTo(hx - r * 0.2, hy - r * 1.5, hx + r * 0.1, hy - r * 0.7);
      ctx.quadraticCurveTo(hx + r * 0.35, hy - r * 1.6, hx + r * 0.6, hy - r * 0.6);
      ctx.quadraticCurveTo(hx + r * 0.2, hy - r * 0.2, hx - r * 0.5, hy - r * 0.4);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "agua": {
      // long ponytail flowing back, sways with the run
      ctx.beginPath();
      ctx.moveTo(hx - r * 0.4, hy - r * 0.9);
      ctx.quadraticCurveTo(hx - r * 1.7, hy - r * 0.6 + sway, hx - r * 1.9, hy + r * 1.6 + sway * 1.4);
      ctx.quadraticCurveTo(hx - r * 1.2, hy + r * 1.4 + sway, hx - r * 0.7, hy + r * 0.2);
      ctx.quadraticCurveTo(hx - r * 0.2, hy - r * 0.2, hx - r * 0.4, hy - r * 0.9);
      ctx.closePath();
      ctx.fill();
      // crown cap
      ctx.beginPath();
      ctx.arc(hx, hy - r * 0.1, r * 1.02, Math.PI * 1.05, Math.PI * 2.05);
      ctx.fill();
      ctx.fillStyle = L.hair2;
      ctx.beginPath();
      ctx.moveTo(hx - r * 0.5, hy - r * 0.7);
      ctx.quadraticCurveTo(hx - r * 1.4, hy - r * 0.4 + sway, hx - r * 1.5, hy + r * 1.1 + sway);
      ctx.quadraticCurveTo(hx - r * 1.0, hy + r * 0.4 + sway, hx - r * 0.5, hy - r * 0.7);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "terra": {
      ctx.beginPath();
      ctx.arc(hx, hy - r * 0.15, r * 1.04, Math.PI * 0.96, Math.PI * 2.04);
      ctx.fill();
      // tousled tufts
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(hx + i * r * 0.6, hy - r * 0.7);
        ctx.lineTo(hx + i * r * 0.6 - r * 0.18, hy - r * 1.35);
        ctx.lineTo(hx + i * r * 0.6 + r * 0.3, hy - r * 0.8);
        ctx.closePath();
        ctx.fill();
      }
      // leaf sprig
      ctx.fillStyle = "#5bbf52";
      ctx.beginPath();
      ctx.ellipse(hx + r * 0.5, hy - r * 1.2, r * 0.18, r * 0.4, -0.6, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "ar": {
      // swept-back spikes
      ctx.beginPath();
      ctx.arc(hx, hy - r * 0.1, r * 1.02, Math.PI * 1.0, Math.PI * 2.05);
      ctx.fill();
      ctx.fillStyle = L.hair2;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(hx - r * 0.2 - i * r * 0.4, hy - r * 0.5);
        ctx.lineTo(hx - r * 1.1 - i * r * 0.4, hy - r * 0.9 - i * r * 0.1);
        ctx.lineTo(hx - r * 0.1 - i * r * 0.4, hy - r * 0.1);
        ctx.closePath();
        ctx.fill();
      }
      break;
    }
    default: {
      // luz — smooth golden cap with a glow + star spark
      ctx.shadowColor = L.accent;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(hx, hy - r * 0.12, r * 1.04, Math.PI * 0.98, Math.PI * 2.04);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = L.hair2;
      ctx.beginPath();
      ctx.arc(hx, hy - r * 0.4, r * 0.7, Math.PI * 1.05, Math.PI * 2.0);
      ctx.fill();
      break;
    }
  }
}

function drawHero(ctx: CanvasRenderingContext2D, L: Level, x: number, groundY: number, scale: number, g: Game, dim: boolean) {
  const skin = "#f7cfa2", skinSh = "#e7b98a", boot = "#4a3b2c", line = "#b86a3a";
  const p = g.player;
  const moving = g.phase === "playing";
  const airborne = p.py > 2;
  const ph = p.run;
  // run swing (radians); in the air, lock a natural leap/scissor pose from vy
  const air = clamp(p.vy / 760, -1, 1);
  const swing = moving ? 0.85 : 0.12 * Math.sin(g.t * 2);
  const legFront = airborne ? -0.5 - air * 0.22 : Math.sin(ph) * swing;
  const legBack = airborne ? 0.46 - air * 0.1 : Math.sin(ph + Math.PI) * swing;
  const kneeFront = airborne ? 0.5 : Math.max(0, Math.sin(ph + Math.PI)) * 0.7; // knee bends on the back swing
  const kneeBack = airborne ? 0.3 : Math.max(0, Math.sin(ph)) * 0.7;
  const armFront = airborne ? -0.8 - air * 0.3 : Math.sin(ph + Math.PI) * swing * 0.85;
  const armBack = airborne ? 0.72 : Math.sin(ph) * swing * 0.85;
  const bob = moving ? -Math.abs(Math.sin(ph)) * 3 : Math.sin(g.t * 2) * 2;
  const lean = airborne ? -0.04 : moving ? -0.08 : 0;
  const sway = Math.sin(ph) * 3 * (moving ? 1 : 0.3);

  ctx.save();
  if (dim) ctx.globalAlpha = 0.45;
  ctx.translate(x, groundY - p.py + bob);
  ctx.scale(scale, scale);
  ctx.rotate(lean);
  const sq = p.squash;
  ctx.scale(1 + sq * 0.22, 1 - sq * 0.26);

  // anchor: feet at local y = 0, build upward (negative y). Person proportions:
  // head ~1/4 of height, real shoulders/hips, two-segment legs that bend.
  const hipY = -52, shoulderY = -86, thigh = 28, shin = 24, armLen = 32;
  // back leg (two segments, shaded for depth) + back arm
  leg(ctx, -5, hipY, thigh, shin, 15, legBack, kneeBack, shade(L.pants, -0.12), shade(boot, -0.06));
  limb(ctx, -3, shoulderY, armLen, 11, armBack, shade(L.tunic, -0.1), { color: skinSh });

  // torso — chunky barrel: shoulders → waist, vertical gradient + tummy
  const bg = ctx.createLinearGradient(0, shoulderY, 0, hipY + 8);
  bg.addColorStop(0, shade(L.tunic, 0.08));
  bg.addColorStop(1, L.tunicDark);
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.moveTo(-14, shoulderY + 4);
  ctx.quadraticCurveTo(-16, shoulderY, -11, shoulderY - 1);
  ctx.lineTo(11, shoulderY - 1);
  ctx.quadraticCurveTo(16, shoulderY, 14, shoulderY + 4);
  ctx.lineTo(13, hipY + 2);
  ctx.quadraticCurveTo(13, hipY + 8, 7, hipY + 8);
  ctx.lineTo(-7, hipY + 8);
  ctx.quadraticCurveTo(-13, hipY + 8, -13, hipY + 2);
  ctx.closePath();
  ctx.fill();
  // tummy highlight on the front (+x)
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.beginPath();
  ctx.ellipse(5, (shoulderY + hipY) / 2 + 3, 8, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  // belt
  ctx.fillStyle = L.tunicDark;
  roundRect(ctx, -13, hipY, 26, 6, 3);
  ctx.fill();
  ctx.fillStyle = L.accent;
  roundRect(ctx, -1, hipY + 1, 6, 4, 2);
  ctx.fill();

  // front leg
  leg(ctx, 6, hipY, thigh, shin, 15, legFront, kneeFront, L.pants, boot);

  // neck
  ctx.fillStyle = skinSh;
  roundRect(ctx, -2.5, shoulderY - 7, 9, 11, 4);
  ctx.fill();

  // head
  const hx = 3, hy = -102, r = 19;
  drawHair(ctx, L, hx, hy, r, sway); // back hair, behind the head
  const hg = ctx.createRadialGradient(hx - 5, hy - 6, 3, hx, hy, r * 1.25);
  hg.addColorStop(0, "#ffe2c0");
  hg.addColorStop(1, skin);
  ctx.fillStyle = hg;
  ctx.beginPath();
  ctx.arc(hx, hy, r, 0, Math.PI * 2);
  ctx.fill();
  // little nose bump (faces right)
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.arc(hx + r * 0.95, hy + 3, r * 0.15, 0, Math.PI * 2);
  ctx.fill();
  // cheek
  ctx.fillStyle = "rgba(255,150,170,0.5)";
  ctx.beginPath();
  ctx.arc(hx + r * 0.52, hy + r * 0.44, r * 0.16, 0, Math.PI * 2);
  ctx.fill();
  // brow
  ctx.strokeStyle = "#7a5230";
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(hx + r * 0.2, hy - r * 0.48);
  ctx.quadraticCurveTo(hx + r * 0.46, hy - r * 0.64, hx + r * 0.72, hy - r * 0.45);
  ctx.stroke();
  // eye (big, glances toward motion)
  const look = clamp(p.vy / -900, -1, 1);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.ellipse(hx + r * 0.48, hy - r * 0.03, r * 0.19, r * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#34304a";
  ctx.beginPath();
  ctx.arc(hx + r * 0.52, hy - r * 0.03 + look * r * 0.1, r * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(hx + r * 0.57, hy - r * 0.11, r * 0.045, 0, Math.PI * 2);
  ctx.fill();
  // smile
  ctx.strokeStyle = line;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(hx + r * 0.5, hy + r * 0.32, r * 0.25, -0.08 * Math.PI, 0.55 * Math.PI);
  ctx.stroke();
  // front hair cap so no skin shows on the crown
  drawHairCap(ctx, L, hx, hy, r);

  // front arm
  limb(ctx, 3, shoulderY, armLen, 11, armFront, L.tunic, { color: skin });
  ctx.restore();
}

// A two-segment leg (thigh + shin) that bends at the knee — reads as a real
// running leg, not a stiff stick. hipAng swings the whole leg; knee bends the
// shin back. Drawn in the hero's local frame (y up = negative).
function leg(ctx: CanvasRenderingContext2D, hx: number, hy: number, thigh: number, shin: number, wide: number, hipAng: number, knee: number, pants: string, boot: string) {
  ctx.save();
  ctx.translate(hx, hy);
  ctx.rotate(hipAng);
  // thigh
  roundRect(ctx, -wide / 2, -wide * 0.3, wide, thigh + wide * 0.3, wide / 2);
  ctx.fillStyle = pants;
  ctx.fill();
  // shin (rotated back at the knee) + boot
  ctx.translate(0, thigh);
  ctx.rotate(knee);
  roundRect(ctx, -wide * 0.46, -wide * 0.2, wide * 0.92, shin + wide * 0.2, wide * 0.46);
  ctx.fillStyle = pants;
  ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  roundRect(ctx, wide * 0.06, 0, wide * 0.36, shin, wide * 0.18);
  ctx.fill();
  // boot pointing forward (+x)
  ctx.fillStyle = boot;
  roundRect(ctx, -wide * 0.4, shin - wide * 0.2, wide * 1.5, wide * 0.85, wide * 0.42);
  ctx.fill();
  ctx.restore();
}

// front crown cap (drawn after the face but above the brow line)
function drawHairCap(ctx: CanvasRenderingContext2D, L: Level, hx: number, hy: number, r: number) {
  ctx.fillStyle = L.hair;
  ctx.beginPath();
  ctx.moveTo(hx - r, hy - r * 0.1);
  ctx.quadraticCurveTo(hx - r * 0.6, hy - r * 1.15, hx + r * 0.2, hy - r * 1.05);
  ctx.quadraticCurveTo(hx + r * 0.95, hy - r * 0.95, hx + r * 0.98, hy - r * 0.2);
  // fringe tips at the front
  ctx.lineTo(hx + r * 0.7, hy - r * 0.55);
  ctx.lineTo(hx + r * 0.5, hy - r * 0.2);
  ctx.lineTo(hx + r * 0.28, hy - r * 0.55);
  ctx.lineTo(hx + r * 0.05, hy - r * 0.25);
  ctx.quadraticCurveTo(hx - r * 0.5, hy - r * 0.5, hx - r, hy - r * 0.1);
  ctx.closePath();
  ctx.fill();
  if (L.id === "luz" || L.id === "ar" || L.id === "agua") {
    ctx.fillStyle = L.hair2;
    ctx.beginPath();
    ctx.moveTo(hx - r * 0.6, hy - r * 0.3);
    ctx.quadraticCurveTo(hx - r * 0.2, hy - r * 0.95, hx + r * 0.2, hy - r * 0.6);
    ctx.quadraticCurveTo(hx - r * 0.2, hy - r * 0.4, hx - r * 0.6, hy - r * 0.3);
    ctx.closePath();
    ctx.fill();
  }
}

export function Corrida() {
  const reduced = prefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(makeGame());

  const [phase, setPhase] = useState<ArcadePhase>("ready");
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
      const heroScale = clamp(h / 360, 0.62, 1.05);
      const heroR = 30 * heroScale; // rough body radius for collisions
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

      // shadow + hero
      const p = G.player;
      const shadowScale = Math.max(0.3, 1 - p.py / 280);
      ctx.fillStyle = `rgba(0,0,0,${0.26 * shadowScale})`;
      ctx.beginPath();
      ctx.ellipse(px, groundY - 1, heroR * 0.8 * shadowScale, heroR * 0.28 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();
      drawHero(ctx, L2, px, groundY, heroScale, G, G.invuln > 0 && Math.floor(G.t * 12) % 2 === 0);

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
