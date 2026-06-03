import { useEffect, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "@sprout/ui";
import { fitCanvas, prefersReducedMotion } from "./canvas";
import { loadBest, saveBest } from "./arcade";
import { sfx } from "./sfx";

/* Velho Oeste — a little cowboy platformer (the "tipo Super Mario, mas cowboys"
 * one). Unlike Salta! the world does NOT scroll on its own: YOU drive o Vaqueiro
 * left and right with a Roblox-style thumb-stick (bottom-left) and act with the
 * buttons (bottom-right) — jump, and squirt the water pistol once you find it.
 * Hop along the prairie across several levels, snap up gold coins, and reach the
 * SALOON at the end of each one. The rare sheriff-star coin transforms o Vaqueiro
 * into o Xerife — bigger, jumps higher, and takes one hit before turning back.
 * Bandidos patrol the way: stomp them from above, or spray them with the water
 * pistol to send them running. Off the main path hide a few segredos to discover.
 *
 * Like the other arcade games everything is drawn on <canvas>; all simulation
 * state lives in a ref so the rAF loop never restarts, and React state only
 * carries what the HUD/overlays show. Honours prefers-reduced-motion (no screen
 * shake, fewer particles, no idle wobble). Best score persists between visits. */

const BEST_KEY = "sprout.oeste.best";
const HEARTS = 3;

/* The world is authored in a fixed virtual height so a level looks the same on
 * any screen; we scale it to the canvas height and pan horizontally with a
 * camera. 1 world unit = 1 virtual pixel. */
const VH = 360; // virtual world height
const GROUND_Y = 300; // y of the ground's top surface
const GRAVITY = 1700;
const WALK = 168; // top walking speed (world u/s)
const JUMP_V = 600; // jump impulse (vaqueiro)
const JUMP_XER = 660; // the Xerife jumps a little higher

type Phase = "ready" | "playing" | "cleared" | "won" | "over";
type Form = "vaqueiro" | "xerife";

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/* ---- level authoring (static data → cloned into live entities on load) ---- */

interface Plat {
  x: number;
  y: number;
  w: number;
  h: number;
  wood?: boolean; // a plank ledge vs. a sandy ground block
}
/* Each coin pickup does something different:
 *  gold   — +10 points (the bread-and-butter)
 *  star   — the sheriff star: transforms o Vaqueiro → o Xerife
 *  secret — a blue "?" coin tucked off the path; counts toward "segredos"
 *  life   — a green heart coin: gives back a lost vida
 *  boost  — a red chilli: super-speed + super-jump for a few seconds            */
type CoinKind = "gold" | "star" | "secret" | "life" | "boost";
interface CoinDef {
  x: number;
  y: number;
  kind?: CoinKind; // defaults to "gold"
}
interface EnemyDef {
  x: number;
  x0: number;
  x1: number;
  y?: number; // ground line the bandido walks on (defaults to GROUND_Y)
}
interface GunDef {
  x: number;
  y: number;
}
interface Theme {
  sky: [string, string, string];
  ground: [string, string];
  mesa: string;
  mesaBack: string;
  night?: boolean;
}
interface Level {
  name: string;
  width: number;
  theme: Theme;
  plats: Plat[];
  coins: CoinDef[];
  enemies: EnemyDef[];
  guns: GunDef[];
  goalX: number;
}

const ground = (x0: number, x1: number): Plat => ({ x: x0, y: GROUND_Y, w: x1 - x0, h: VH - GROUND_Y + 60 });
const ledge = (x: number, y: number, w: number): Plat => ({ x, y, w, h: 14, wood: true });
const COIN_Y = GROUND_Y - 42;
const row = (x0: number, n: number, y = COIN_Y, gap = 42): CoinDef[] =>
  Array.from({ length: n }, (_, i) => ({ x: x0 + i * gap, y }));
// a gentle coin arc, peaking in the middle — a "pista" pointing over a jump
const arc = (x0: number, n: number, baseY: number, lift: number, gap = 40): CoinDef[] =>
  Array.from({ length: n }, (_, i) => ({ x: x0 + i * gap, y: baseY - Math.sin((i / (n - 1)) * Math.PI) * lift }));

const DESERT: Theme = { sky: ["#7ec5e8", "#bfe4f2", "#ffe9c0"], ground: ["#e0b06a", "#b07d42"], mesa: "#c8744a", mesaBack: "#d99a6a" };
const CANYON: Theme = { sky: ["#f4a261", "#ffcf9a", "#fff0d6"], ground: ["#cf8b53", "#9c5f32"], mesa: "#b5523a", mesaBack: "#cf7a52" };
const MINE: Theme = { sky: ["#3a4668", "#6d7aa0", "#f3b27a"], ground: ["#8f6f48", "#5e442a"], mesa: "#5b4a78", mesaBack: "#7a6498", night: true };

const LEVELS: Level[] = [
  {
    name: "A Pradaria",
    width: 2240,
    theme: DESERT,
    plats: [
      ground(0, 2240),
      ledge(360, 250, 120),
      ledge(610, 205, 120),
      ledge(880, 250, 120),
      ledge(1240, 228, 150),
      ledge(1560, 250, 120),
    ],
    coins: [
      ...row(200, 4),
      ...arc(380, 3, 226, 30),
      { x: 668, y: 158, kind: "star" }, // first transform, sitting invitingly on the high ledge
      ...arc(900, 3, 226, 30),
      { x: 1010, y: 150, kind: "boost" }, // a chilli over the enemy patrol
      ...arc(1262, 4, 200, 30),
      ...arc(1582, 3, 226, 30),
      ...row(1780, 5),
      { x: 1190, y: 96, kind: "secret" }, // hidden up high, off the run
      { x: 360, y: 222, kind: "life" },
    ],
    enemies: [
      { x: 1000, x0: 940, x1: 1140 },
      { x: 1460, x0: 1380, x1: 1620 },
    ],
    guns: [{ x: 520, y: GROUND_Y - 26 }],
    goalX: 2160,
  },
  {
    name: "O Desfiladeiro",
    width: 2640,
    theme: CANYON,
    plats: [
      ground(0, 700),
      ground(900, 1500),
      ground(1720, 2640),
      ledge(770, 256, 90), // stepping stone across the first ravine
      ledge(1570, 256, 90), // …and the second
      ledge(1080, 196, 130),
      ledge(2050, 226, 120),
      ledge(2300, 178, 120),
    ],
    coins: [
      ...row(180, 4),
      ...arc(720, 4, 250, 70), // arc that guides the leap over the ravine
      ...row(980, 4),
      { x: 1145, y: 150, kind: "star" },
      { x: 1300, y: 92, kind: "secret" },
      ...arc(1520, 4, 250, 70),
      { x: 1630, y: 150, kind: "boost" },
      ...row(1800, 4),
      ...arc(2070, 3, 202, 28),
      { x: 2360, y: 132, kind: "secret" },
      { x: 2110, y: 198, kind: "life" },
    ],
    enemies: [
      { x: 480, x0: 380, x1: 660 },
      { x: 1150, x0: 980, x1: 1440 },
      { x: 2000, x0: 1780, x1: 1980 },
    ],
    guns: [{ x: 1000, y: GROUND_Y - 26 }],
    goalX: 2560,
  },
  {
    name: "A Mina de Ouro",
    width: 2820,
    theme: MINE,
    plats: [
      ground(0, 600),
      ground(820, 1320),
      ground(1540, 2040),
      ground(2260, 2820),
      ledge(660, 256, 90),
      ledge(1380, 256, 90),
      ledge(2100, 256, 90),
      ledge(1040, 188, 130),
      ledge(1800, 206, 130),
      ledge(2480, 176, 130),
    ],
    coins: [
      ...row(160, 4),
      ...arc(620, 4, 250, 72),
      ...row(900, 4),
      { x: 1105, y: 142, kind: "star" },
      { x: 1180, y: 88, kind: "secret" },
      ...arc(1340, 4, 250, 72),
      { x: 1450, y: 150, kind: "boost" },
      ...row(1620, 4),
      ...arc(1830, 3, 212, 28),
      { x: 1865, y: 160, kind: "life" },
      ...arc(2060, 4, 250, 72),
      ...row(2340, 4),
      { x: 2545, y: 130, kind: "secret" },
      { x: 460, y: 96, kind: "secret" },
    ],
    enemies: [
      { x: 380, x0: 240, x1: 560 },
      { x: 1050, x0: 840, x1: 1300 },
      { x: 1750, x0: 1560, x1: 2020 },
      { x: 2400, x0: 2280, x1: 2520 },
    ],
    guns: [{ x: 900, y: GROUND_Y - 26 }],
    goalX: 2740,
  },
];

/* ---- live entities (cloned from the level data each load) ---- */

interface Coin {
  x: number;
  y: number;
  kind: CoinKind;
  taken: boolean;
  spin: number;
  bob: number;
}
interface Enemy {
  x: number;
  y: number; // ground line
  w: number;
  h: number;
  x0: number;
  x1: number;
  dir: number; // -1 / +1
  fleeing: boolean;
  alive: boolean;
  t: number; // walk phase
}
interface Gun {
  x: number;
  y: number;
  taken: boolean;
  bob: number;
}
interface Drop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
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
interface Player {
  x: number;
  y: number; // top-left
  w: number;
  h: number;
  vx: number;
  vy: number;
  onGround: boolean;
  face: number; // -1 / +1
  form: Form;
  hasGun: boolean;
  jumps: number; // jumps used since leaving the ground (for the double-jump)
  boost: number; // seconds of chilli super-speed left
  walk: number; // stride phase
  invuln: number;
  squirtCd: number;
  safeX: number; // last safe footing (for pit respawns)
  safeY: number;
}
interface Game {
  phase: Phase;
  t: number;
  level: number;
  plats: Plat[];
  coins: Coin[];
  enemies: Enemy[];
  guns: Gun[];
  drops: Drop[];
  parts: Particle[];
  floats: Float[];
  theme: Theme;
  width: number;
  goalX: number;
  cam: number;
  banner: number; // seconds the "Nível N" banner stays up
  score: number;
  coinsGot: number;
  secretsGot: number;
  secretsTotal: number;
  lives: number;
  shake: number;
}

const sizeFor = (form: Form): { w: number; h: number } => (form === "xerife" ? { w: 30, h: 48 } : { w: 26, h: 38 });

function makePlayer(form: Form, hasGun: boolean): Player {
  const s = sizeFor(form);
  return {
    x: 60,
    y: GROUND_Y - s.h,
    w: s.w,
    h: s.h,
    vx: 0,
    vy: 0,
    onGround: true,
    face: 1,
    form,
    hasGun,
    jumps: 0,
    boost: 0,
    walk: 0,
    invuln: 0,
    squirtCd: 0,
    safeX: 60,
    safeY: GROUND_Y - s.h,
  };
}

function loadLevel(g: Game, idx: number, player: Player): void {
  const L = LEVELS[idx];
  g.level = idx;
  g.theme = L.theme;
  g.width = L.width;
  g.goalX = L.goalX;
  g.plats = L.plats;
  g.coins = L.coins.map((c) => ({ x: c.x, y: c.y, kind: c.kind ?? "gold", taken: false, spin: Math.random() * Math.PI, bob: Math.random() * Math.PI }));
  g.enemies = L.enemies.map((e) => ({ x: e.x, y: e.y ?? GROUND_Y, w: 28, h: 30, x0: e.x0, x1: e.x1, dir: Math.random() < 0.5 ? -1 : 1, fleeing: false, alive: true, t: Math.random() * Math.PI }));
  g.guns = L.guns.map((gn) => ({ x: gn.x, y: gn.y, taken: false, bob: Math.random() * Math.PI }));
  g.drops = [];
  g.parts = [];
  g.floats = [];
  g.cam = 0;
  g.banner = 2.4;
  g.secretsTotal = L.coins.filter((c) => c.kind === "secret").length;
  g.secretsGot = 0;
  // place the player at the level's start
  const s = sizeFor(player.form);
  player.w = s.w;
  player.h = s.h;
  player.x = 60;
  player.y = GROUND_Y - s.h;
  player.vx = 0;
  player.vy = 0;
  player.onGround = true;
  player.face = 1;
  player.invuln = 0;
  player.jumps = 0;
  player.boost = 0;
  player.safeX = 60;
  player.safeY = GROUND_Y - s.h;
}

function makeGame(): Game {
  const g: Game = {
    phase: "ready",
    t: 0,
    level: 0,
    plats: [],
    coins: [],
    enemies: [],
    guns: [],
    drops: [],
    parts: [],
    floats: [],
    theme: DESERT,
    width: LEVELS[0].width,
    goalX: LEVELS[0].goalX,
    cam: 0,
    banner: 0,
    score: 0,
    coinsGot: 0,
    secretsGot: 0,
    secretsTotal: 0,
    lives: HEARTS,
    shake: 0,
  };
  return g;
}

/* ---------------- drawing (pure canvas, kid-bright cowboy palette) ---------------- */

function drawBackdrop(ctx: CanvasRenderingContext2D, viewW: number, theme: Theme, cam: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, VH);
  sky.addColorStop(0, theme.sky[0]);
  sky.addColorStop(0.62, theme.sky[1]);
  sky.addColorStop(1, theme.sky[2]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, viewW, VH);

  if (theme.night) {
    // a sprinkle of stars (positions derived from index so they don't twinkle-jump)
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    for (let i = 0; i < 40; i++) {
      const sx = ((i * 197) % 1000) / 1000 * viewW - (cam * 0.1) % viewW;
      const x = ((sx % viewW) + viewW) % viewW;
      const y = ((i * 313) % 1000) / 1000 * (VH * 0.45);
      ctx.fillRect(x, y, 2, 2);
    }
    // a moon on the mine's dusky sky
    const mx = viewW * 0.82;
    const my = VH * 0.18;
    ctx.fillStyle = "#fdf3d0";
    ctx.beginPath();
    ctx.arc(mx, my, VH * 0.065, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = theme.sky[0];
    ctx.beginPath();
    ctx.arc(mx + 8, my - 4, VH * 0.055, 0, Math.PI * 2); // crescent bite
    ctx.fill();
  } else {
    // sun
    const sx = viewW * 0.84;
    const sy = VH * 0.2;
    const glow = ctx.createRadialGradient(sx, sy, 4, sx, sy, VH * 0.34);
    glow.addColorStop(0, "rgba(255,247,214,0.95)");
    glow.addColorStop(1, "rgba(255,247,214,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, viewW, VH);
    ctx.fillStyle = "#fff3c4";
    ctx.beginPath();
    ctx.arc(sx, sy, VH * 0.07, 0, Math.PI * 2);
    ctx.fill();
    // drifting clouds (very slow parallax)
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    for (let i = 0; i < 4; i++) {
      const base = i * 340 + 80;
      const x = ((base - cam * 0.08) % (viewW + 200) + viewW + 200) % (viewW + 200) - 100;
      const y = 36 + ((i * 53) % 40);
      cloud(ctx, x, y, 22 + (i % 2) * 8);
    }
  }

  // parallax mesas (flat-topped buttes) — two layers, slow and slower
  drawMesaRow(ctx, viewW, cam * 0.18, GROUND_Y - 6, 70, 230, theme.mesaBack, 0.7);
  // a row of distant cactus silhouettes between the mesa layers
  cactusRow(ctx, viewW, cam * 0.26, GROUND_Y - 2, theme.night ? "rgba(40,60,50,0.5)" : "rgba(90,130,80,0.45)");
  drawMesaRow(ctx, viewW, cam * 0.34, GROUND_Y - 2, 110, 300, theme.mesa, 1);
}

function cloud(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
  ctx.arc(x + r * 0.55, y + r * 0.06, r * 0.38, 0, Math.PI * 2);
  ctx.arc(x - r * 0.5, y + r * 0.08, r * 0.34, 0, Math.PI * 2);
  ctx.ellipse(x, y + r * 0.3, r * 0.85, r * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();
}

function cactusRow(ctx: CanvasRenderingContext2D, viewW: number, scroll: number, baseY: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  const spacing = 200;
  const start = -((scroll % spacing) + spacing) % spacing;
  for (let x = start; x < viewW + spacing; x += spacing) {
    const h = 36 + ((Math.floor((x + scroll) / spacing) * 71) % 22);
    // trunk + two arms
    roundRect(ctx, x, baseY - h, 8, h, 4);
    ctx.fill();
    roundRect(ctx, x - 9, baseY - h * 0.62, 9, 6, 3);
    ctx.fill();
    roundRect(ctx, x - 9, baseY - h * 0.62, 6, h * 0.34, 3);
    ctx.fill();
    roundRect(ctx, x + 8, baseY - h * 0.78, 9, 6, 3);
    ctx.fill();
    roundRect(ctx, x + 11, baseY - h * 0.78, 6, h * 0.46, 3);
    ctx.fill();
  }
  ctx.restore();
}

function drawMesaRow(ctx: CanvasRenderingContext2D, viewW: number, scroll: number, baseY: number, h: number, spacing: number, color: string, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  const start = -((scroll % spacing) + spacing) % spacing;
  for (let x = start; x < viewW + spacing; x += spacing) {
    const w = spacing * 0.58;
    const hh = h * (0.7 + ((Math.floor((x + scroll) / spacing) * 53) % 30) / 100);
    ctx.beginPath();
    ctx.moveTo(x, baseY);
    ctx.lineTo(x + w * 0.12, baseY - hh);
    ctx.lineTo(x + w * 0.88, baseY - hh);
    ctx.lineTo(x + w, baseY);
    ctx.closePath();
    ctx.fill();
    // a darker shelf line, for that layered-rock look
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(x + w * 0.12, baseY - hh * 0.55, w * 0.76, 5);
    ctx.fillStyle = color;
  }
  ctx.restore();
}

function drawPlatform(ctx: CanvasRenderingContext2D, p: Plat, theme: Theme) {
  if (p.wood) {
    // a plank ledge
    const g = ctx.createLinearGradient(0, p.y, 0, p.y + p.h);
    g.addColorStop(0, "#b07a3f");
    g.addColorStop(1, "#7d4f22");
    ctx.fillStyle = g;
    roundRect(ctx, p.x, p.y, p.w, p.h, 5);
    ctx.fill();
    ctx.strokeStyle = "rgba(60,33,10,0.35)";
    ctx.lineWidth = 1.5;
    for (let x = p.x + 18; x < p.x + p.w; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x, p.y + 2);
      ctx.lineTo(x, p.y + p.h - 2);
      ctx.stroke();
    }
    return;
  }
  // sandy ground block
  const g = ctx.createLinearGradient(0, p.y, 0, p.y + p.h);
  g.addColorStop(0, theme.ground[0]);
  g.addColorStop(1, theme.ground[1]);
  ctx.fillStyle = g;
  ctx.fillRect(p.x, p.y, p.w, p.h);
  // top crust + dry-grass tufts
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(p.x, p.y, p.w, 5);
  ctx.fillStyle = theme.night ? "#7c8a55" : "#caa44e";
  for (let x = p.x + 14; x < p.x + p.w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, p.y);
    ctx.lineTo(x + 4, p.y - 7);
    ctx.lineTo(x + 8, p.y);
    ctx.closePath();
    ctx.fill();
  }
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

function starPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 ? r * 0.45 : r;
    const x = cx + Math.cos(ang) * rad;
    const y = cy + Math.sin(ang) * rad;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.closePath();
}

function drawCoin(ctx: CanvasRenderingContext2D, c: Coin) {
  const y = c.y + Math.sin(c.bob) * 3;
  if (c.kind === "star") {
    // the sheriff-star coin — a glowing gold star spinning about its axis
    ctx.save();
    ctx.translate(c.x, y);
    ctx.scale(Math.cos(c.spin) * 0.85 + 0.15 || 0.15, 1);
    ctx.shadowColor = "rgba(255,205,60,0.95)";
    ctx.shadowBlur = 18;
    const g = ctx.createLinearGradient(0, -13, 0, 13);
    g.addColorStop(0, "#fff4bc");
    g.addColorStop(1, "#ffab1f");
    ctx.fillStyle = g;
    starPath(ctx, 0, 0, 13);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#c9870f";
    ctx.stroke();
    ctx.restore();
    return;
  }
  if (c.kind === "life") {
    // a green heart coin — a spare vida
    ctx.save();
    ctx.translate(c.x, y);
    ctx.shadowColor = "rgba(80,210,120,0.8)";
    ctx.shadowBlur = 14;
    const s = 1.1 + Math.sin(c.bob * 1.4) * 0.06; // a gentle heartbeat
    ctx.scale(s, s);
    ctx.fillStyle = "#41c46a";
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.bezierCurveTo(-11, -2, -7, -12, 0, -5);
    ctx.bezierCurveTo(7, -12, 11, -2, 0, 8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.arc(-3.5, -4, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  if (c.kind === "boost") {
    // a red chilli — super-speed + super-jump
    ctx.save();
    ctx.translate(c.x, y);
    ctx.rotate(Math.sin(c.bob) * 0.18 - 0.5);
    ctx.shadowColor = "rgba(255,90,60,0.8)";
    ctx.shadowBlur = 14;
    const g = ctx.createLinearGradient(-2, -10, 4, 12);
    g.addColorStop(0, "#ff7a4d");
    g.addColorStop(1, "#d62828");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-2, -9);
    ctx.quadraticCurveTo(9, -6, 6, 8);
    ctx.quadraticCurveTo(3, 13, -1, 9);
    ctx.quadraticCurveTo(-5, 2, -2, -9);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#3fbf6f"; // little green stalk
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-2, -9);
    ctx.lineTo(-5, -13);
    ctx.stroke();
    ctx.restore();
    return;
  }
  // a flat disc that spins about its vertical axis — gold, or a blue "?" secret
  const secret = c.kind === "secret";
  ctx.save();
  ctx.translate(c.x, y);
  const sx = Math.cos(c.spin) * 0.9 + 0.1 || 0.1;
  ctx.scale(sx, 1);
  ctx.shadowColor = secret ? "rgba(70,200,235,0.7)" : "rgba(240,180,40,0.55)";
  ctx.shadowBlur = 10;
  const r = secret ? 11 : 10;
  const g = ctx.createLinearGradient(0, -r, 0, r);
  g.addColorStop(0, secret ? "#bdf0ff" : "#fff0a8");
  g.addColorStop(1, secret ? "#49c6e8" : "#e9a417");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = secret ? "#2a9ec0" : "#c9870f";
  ctx.stroke();
  if (Math.abs(sx) > 0.5) {
    ctx.fillStyle = secret ? "#1d6f88" : "#a06a0b";
    ctx.font = "700 11px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(secret ? "?" : "$", 0, 1);
  }
  ctx.restore();
}

function drawGun(ctx: CanvasRenderingContext2D, gn: Gun) {
  const y = gn.y + Math.sin(gn.bob) * 3;
  ctx.save();
  ctx.translate(gn.x, y);
  ctx.shadowColor = "rgba(60,180,230,0.7)";
  ctx.shadowBlur = 12;
  // water-pistol body
  ctx.fillStyle = "#33b6e6";
  roundRect(ctx, -12, -7, 20, 10, 3);
  ctx.fill();
  ctx.fillStyle = "#1f93c4";
  roundRect(ctx, -3, 1, 7, 11, 2); // grip
  ctx.fill();
  ctx.fillStyle = "#bdeeff";
  roundRect(ctx, 8, -5, 6, 5, 2); // nozzle
  ctx.fill();
  // little water tank on top
  ctx.fillStyle = "rgba(180,240,255,0.9)";
  ctx.beginPath();
  ctx.arc(-6, -10, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawDrop(ctx: CanvasRenderingContext2D, d: Drop) {
  ctx.fillStyle = "rgba(120,210,245,0.95)";
  ctx.beginPath();
  ctx.ellipse(d.x, d.y, 4, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();
  ctx.arc(d.x - 1, d.y - 1, 1.4, 0, Math.PI * 2);
  ctx.fill();
}

function drawEnemy(ctx: CanvasRenderingContext2D, e: Enemy) {
  ctx.save();
  ctx.translate(e.x, e.y); // feet centre on the ground line
  ctx.scale((e.fleeing ? -e.dir : e.dir) || 1, 1);
  const h = e.h;
  const stride = Math.sin(e.t) * 3;
  // legs
  ctx.fillStyle = "#4a342a";
  ctx.fillRect(-7, -10, 5, 10 + stride);
  ctx.fillRect(2, -10, 5, 10 - stride);
  // poncho body
  ctx.fillStyle = e.fleeing ? "#8a98a6" : "#7a5a3c";
  roundRect(ctx, -10, -h + 8, 20, h - 14, 5);
  ctx.fill();
  // head
  ctx.fillStyle = "#e3b489";
  ctx.beginPath();
  ctx.arc(0, -h + 6, 7, 0, Math.PI * 2);
  ctx.fill();
  // bandana mask over the nose
  ctx.fillStyle = e.fleeing ? "#cf6f6f" : "#c0392b";
  roundRect(ctx, -7, -h + 6, 14, 6, 2);
  ctx.fill();
  // eyes
  ctx.fillStyle = "#1c2530";
  ctx.beginPath();
  ctx.arc(-3, -h + 3, 1.5, 0, Math.PI * 2);
  ctx.arc(3, -h + 3, 1.5, 0, Math.PI * 2);
  ctx.fill();
  // black hat
  ctx.fillStyle = "#2b2b2b";
  ctx.fillRect(-9, -h - 1, 18, 3);
  roundRect(ctx, -6, -h - 8, 12, 8, 2);
  ctx.fill();
  if (e.fleeing) {
    // a panic sweat-drop
    ctx.fillStyle = "rgba(140,210,245,0.9)";
    ctx.beginPath();
    ctx.arc(-9, -h + 2, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawPlayer(ctx: CanvasRenderingContext2D, p: Player, hidden: boolean) {
  if (hidden) return; // invuln flicker
  const xer = p.form === "xerife";
  const cx = p.x + p.w / 2;
  const feet = p.y + p.h;
  const h = p.h;
  if (p.boost > 0) {
    // a warm glow while the chilli turbo is active
    ctx.save();
    ctx.globalAlpha = 0.5 + Math.sin(p.walk * 2) * 0.15;
    const glow = ctx.createRadialGradient(cx, feet - h / 2, 2, cx, feet - h / 2, h);
    glow.addColorStop(0, "rgba(255,150,70,0.5)");
    glow.addColorStop(1, "rgba(255,150,70,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, feet - h / 2, h, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.save();
  ctx.translate(cx, feet);
  ctx.scale(p.face || 1, 1);
  const stride = p.onGround ? Math.sin(p.walk) * 3.5 : 2.5;
  // legs / boots
  ctx.fillStyle = "#3a5a8c"; // jeans
  ctx.fillRect(-7, -12, 5, 12 + stride);
  ctx.fillRect(2, -12, 5, 12 - stride);
  ctx.fillStyle = "#5a3a22"; // boots
  ctx.fillRect(-8, -2 + Math.max(0, stride), 7, 3);
  ctx.fillRect(1, -2 + Math.max(0, -stride), 7, 3);
  // body (shirt / vest)
  ctx.fillStyle = xer ? "#a9743f" : "#d94f4f";
  roundRect(ctx, -9, -h + 12, 18, h - 22, 5);
  ctx.fill();
  if (xer) {
    // sheriff vest panels + a gold star badge
    ctx.fillStyle = "#8a5a2f";
    ctx.fillRect(-9, -h + 12, 5, h - 22);
    ctx.fillRect(4, -h + 12, 5, h - 22);
    ctx.fillStyle = "#ffd23a";
    starPath(ctx, -3, -h + 22, 4);
    ctx.fill();
  } else {
    // a red neckerchief
    ctx.fillStyle = "#c0392b";
    ctx.beginPath();
    ctx.moveTo(-6, -h + 14);
    ctx.lineTo(6, -h + 14);
    ctx.lineTo(0, -h + 20);
    ctx.closePath();
    ctx.fill();
  }
  // arms
  ctx.fillStyle = xer ? "#8a5a2f" : "#bf4040";
  ctx.fillRect(-11, -h + 16, 4, 11);
  ctx.fillRect(7, -h + 16, 4, 11);
  // head
  ctx.fillStyle = "#e8b58a";
  ctx.beginPath();
  ctx.arc(0, -h + 8, 8, 0, Math.PI * 2);
  ctx.fill();
  // eyes (looking the way we face)
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(1, -h + 7, 3, 0, Math.PI * 2);
  ctx.arc(6, -h + 7, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1c2530";
  ctx.beginPath();
  ctx.arc(2.5, -h + 7, 1.4, 0, Math.PI * 2);
  ctx.arc(7.5, -h + 7, 1.4, 0, Math.PI * 2);
  ctx.fill();
  // cowboy hat
  ctx.fillStyle = xer ? "#e3b04b" : "#9c6b34";
  ctx.fillRect(-11, -h, 22, 3); // brim
  roundRect(ctx, -7, -h - 8, 14, 9, 3); // crown
  ctx.fill();
  ctx.fillStyle = xer ? "#b07d2a" : "#7c531f";
  ctx.fillRect(-7, -h - 2, 14, 2); // hat band
  if (xer) {
    ctx.fillStyle = "#ffd23a";
    starPath(ctx, 0, -h - 3, 2.6);
    ctx.fill();
  }
  ctx.restore();
}

function drawSaloon(ctx: CanvasRenderingContext2D, x: number) {
  const baseY = GROUND_Y;
  const w = 120;
  const h = 110;
  ctx.save();
  ctx.translate(x, baseY);
  // body
  ctx.fillStyle = "#b07a45";
  ctx.fillRect(-w / 2, -h, w, h);
  // planks
  ctx.strokeStyle = "rgba(70,45,20,0.3)";
  ctx.lineWidth = 1.5;
  for (let yy = -h + 14; yy < 0; yy += 16) {
    ctx.beginPath();
    ctx.moveTo(-w / 2, yy);
    ctx.lineTo(w / 2, yy);
    ctx.stroke();
  }
  // false front + roof
  ctx.fillStyle = "#9c6531";
  ctx.beginPath();
  ctx.moveTo(-w / 2 - 8, -h);
  ctx.lineTo(0, -h - 30);
  ctx.lineTo(w / 2 + 8, -h);
  ctx.closePath();
  ctx.fill();
  // sign
  ctx.fillStyle = "#f4e3c0";
  roundRect(ctx, -w / 2 + 14, -h + 8, w - 28, 22, 4);
  ctx.fill();
  ctx.fillStyle = "#7a3b1d";
  ctx.font = "800 16px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SALOON", 0, -h + 19);
  // swinging doors
  ctx.fillStyle = "#6e4622";
  ctx.fillRect(-22, -48, 44, 48);
  ctx.fillStyle = "#8a5a2f";
  ctx.fillRect(-20, -38, 18, 38);
  ctx.fillRect(2, -38, 18, 38);
  // a welcoming flag on the roof
  ctx.strokeStyle = "#4a342a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -h - 30);
  ctx.lineTo(0, -h - 52);
  ctx.stroke();
  ctx.fillStyle = "#3fbf6f";
  ctx.beginPath();
  ctx.moveTo(0, -h - 52);
  ctx.lineTo(20, -h - 47);
  ctx.lineTo(0, -h - 42);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/* ---------------- component ---------------- */

export function VelhoOeste() {
  const reduced = prefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(makeGame());
  const playerRef = useRef<Player>(makePlayer("vaqueiro", false));
  // live input the loop reads: axis = thumb-stick tilt (-1 left … +1 right)
  const ctrl = useRef<{ axis: number; jump: boolean }>({ axis: 0, jump: false });

  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(HEARTS);
  const [armed, setArmed] = useState(false); // mirrors player.hasGun, to show the squirt button
  const [secrets, setSecrets] = useState({ got: 0, total: 0 });
  const [best, setBest] = useState(() => loadBest(BEST_KEY));
  const [record, setRecord] = useState(false);
  const [muted, setMuted] = useState(() => sfx.isMuted());

  // Begin a brand-new run from level 1 (fresh hearts, no powers).
  const begin = () => {
    sfx.unlock();
    const g = gameRef.current;
    const p = playerRef.current;
    Object.assign(p, makePlayer("vaqueiro", false));
    g.lives = HEARTS;
    g.score = 0;
    g.coinsGot = 0;
    g.shake = 0;
    loadLevel(g, 0, p);
    g.phase = "playing";
    setPhase("playing");
    setScore(0);
    setLives(HEARTS);
    setArmed(false);
    setRecord(false);
    sfx.start();
  };

  // Advance to the next level (keeping hearts, score, form and the water pistol).
  const nextLevel = () => {
    sfx.unlock();
    const g = gameRef.current;
    const p = playerRef.current;
    const idx = g.level + 1;
    loadLevel(g, idx, p);
    g.phase = "playing";
    setPhase("playing");
    setArmed(p.hasGun);
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

    const step = (time: number) => {
      const { w, h } = fitCanvas(canvas, ctx);
      const scale = h / VH;
      const viewW = w / scale;
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 0.016;
      last = time;
      G.t += dt;
      const p = playerRef.current;

      if (G.phase === "playing") {
        updateWorld(G, p, dt, viewW, reduced, ctrl.current.axis, (delta) => {
          // score/lives/armed mirror callbacks (only fire when something changes)
          if (delta.lives !== undefined) setLives(delta.lives);
          if (delta.armed !== undefined) setArmed(delta.armed);
          if (delta.secrets) setSecrets({ got: G.secretsGot, total: G.secretsTotal });
          if (delta.cleared) {
            const lastLevel = G.level >= LEVELS.length - 1;
            G.phase = lastLevel ? "won" : "cleared";
            setSecrets({ got: G.secretsGot, total: G.secretsTotal });
            if (lastLevel) {
              const beat = G.score > loadBest(BEST_KEY);
              if (beat) {
                saveBest(BEST_KEY, G.score);
                setBest(G.score);
                setRecord(true);
              }
              sfx.fanfare();
            } else {
              sfx.fanfare();
            }
            setPhase(G.phase);
          }
          if (delta.dead) {
            G.phase = "over";
            const beat = G.score > loadBest(BEST_KEY);
            if (beat) {
              saveBest(BEST_KEY, G.score);
              setBest(G.score);
              setRecord(true);
              sfx.fanfare();
            } else {
              sfx.over();
            }
            setPhase("over");
          }
        });
      }

      // particles & floats keep animating across phase changes
      for (let i = G.parts.length - 1; i >= 0; i--) {
        const pt = G.parts[i];
        pt.life -= dt;
        if (pt.life <= 0) {
          G.parts.splice(i, 1);
          continue;
        }
        pt.vy += pt.gravity * dt;
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
      }
      for (let i = G.floats.length - 1; i >= 0; i--) {
        const f = G.floats[i];
        f.life -= dt;
        f.y -= 26 * dt;
        if (f.life <= 0) G.floats.splice(i, 1);
      }
      if (G.banner > 0) G.banner -= dt;
      if (G.shake > 0) G.shake = Math.max(0, G.shake - dt * 2.5);

      // ---- draw ----
      ctx.save();
      ctx.scale(scale, scale);
      if (G.shake > 0 && !reduced) ctx.translate(rand(-1, 1) * 5 * G.shake, rand(-1, 1) * 5 * G.shake);
      drawBackdrop(ctx, viewW, G.theme, G.cam);

      ctx.translate(-G.cam, 0);
      for (const pl of G.plats) drawPlatform(ctx, pl, G.theme);
      drawSaloon(ctx, G.goalX + 30);
      for (const c of G.coins) if (!c.taken) drawCoin(ctx, c);
      for (const gn of G.guns) if (!gn.taken) drawGun(ctx, gn);
      for (const e of G.enemies) if (e.alive) drawEnemy(ctx, e);
      for (const d of G.drops) drawDrop(ctx, d);

      // player + soft shadow
      const flick = p.invuln > 0 && Math.floor(G.t * 12) % 2 === 0;
      const groundShadowY = p.onGround ? p.y + p.h : p.y + p.h; // shadow follows feet
      ctx.fillStyle = "rgba(30,20,10,0.18)";
      ctx.beginPath();
      ctx.ellipse(p.x + p.w / 2, groundShadowY - 1, p.w * 0.55, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      drawPlayer(ctx, p, flick);

      // particles
      for (const pt of G.parts) {
        ctx.globalAlpha = Math.max(0, pt.life / pt.max);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      // floats
      ctx.textAlign = "center";
      ctx.font = "800 18px system-ui, sans-serif";
      for (const f of G.floats) {
        ctx.globalAlpha = Math.max(0, f.life / 0.9);
        ctx.fillStyle = f.color;
        ctx.fillText(f.text, f.x, f.y);
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // level banner (screen space, fades out)
      if (G.banner > 0) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, G.banner / 0.6);
        ctx.fillStyle = "rgba(20,14,8,0.42)";
        ctx.font = "800 22px system-ui, sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(`Nível ${G.level + 1} — ${LEVELS[G.level].name}`, 16, 14);
        ctx.restore();
      }

      // push the HUD score only when its integer changes
      if (G.score !== shownScore) {
        shownScore = G.score;
        setScore(G.score);
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    // keyboard: arrows / A·D move, Space / ↑ / W jump, ↓ / X squirt
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      switch (e.code) {
        case "ArrowLeft":
        case "KeyA":
          ctrl.current.axis = -1;
          e.preventDefault();
          break;
        case "ArrowRight":
        case "KeyD":
          ctrl.current.axis = 1;
          e.preventDefault();
          break;
        case "Space":
        case "ArrowUp":
        case "KeyW":
          doJump();
          e.preventDefault();
          break;
        case "ArrowDown":
        case "KeyX":
          doSquirt();
          e.preventDefault();
          break;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if ((e.code === "ArrowLeft" || e.code === "KeyA") && ctrl.current.axis < 0) ctrl.current.axis = 0;
      if ((e.code === "ArrowRight" || e.code === "KeyD") && ctrl.current.axis > 0) ctrl.current.axis = 0;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [reduced]);

  // --- actions (component scope so the on-screen buttons can call them) ---
  const doJump = () => {
    const g = gameRef.current;
    const p = playerRef.current;
    if (g.phase !== "playing") return;
    const base = p.form === "xerife" ? JUMP_XER : JUMP_V;
    const power = p.boost > 0 ? 1.18 : 1; // the chilli gives a super-jump
    if (p.onGround) {
      p.vy = -base * power;
      p.onGround = false;
      p.jumps = 1;
      sfx.jump(false);
    } else if (p.jumps < 2) {
      // mid-air double-jump, with a little puff of dust
      p.vy = -base * 0.9 * power;
      p.jumps = 2;
      sfx.jump(true);
      for (let i = 0; i < 6; i++)
        g.parts.push({ x: p.x + p.w / 2, y: p.y + p.h, vx: rand(-70, 70), vy: rand(-20, -90), life: 0.45, max: 0.45, size: rand(2, 5), color: "rgba(220,200,170,0.9)", gravity: 240 });
    }
  };
  const doSquirt = () => {
    const g = gameRef.current;
    const p = playerRef.current;
    if (g.phase !== "playing" || !p.hasGun || p.squirtCd > 0) return;
    p.squirtCd = 0.32;
    g.drops.push({ x: p.x + p.w / 2 + p.face * p.w * 0.5, y: p.y + p.h * 0.42, vx: p.face * 300 + p.vx, vy: -40, life: 0.9 });
    sfx.squirt();
  };

  // --- thumb-stick (Roblox-style): drag to set the horizontal axis ---
  const stickRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const stickId = useRef<number | null>(null);
  const moveStick = (clientX: number) => {
    const base = stickRef.current;
    const knob = knobRef.current;
    if (!base || !knob) return;
    const r = base.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const radius = r.width / 2;
    const dx = clamp(clientX - cx, -radius, radius);
    ctrl.current.axis = dx / radius;
    knob.style.transform = `translate(${dx}px, 0)`;
  };
  const stickDown = (e: React.PointerEvent) => {
    stickId.current = e.pointerId;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    moveStick(e.clientX);
  };
  const stickMove = (e: React.PointerEvent) => {
    if (stickId.current === e.pointerId) moveStick(e.clientX);
  };
  const stickUp = (e: React.PointerEvent) => {
    if (stickId.current !== e.pointerId) return;
    stickId.current = null;
    ctrl.current.axis = 0;
    if (knobRef.current) knobRef.current.style.transform = "translate(0,0)";
  };

  const resultSay = record
    ? `Novo recorde! ${score} pontos!`
    : phase === "won"
      ? `Chegaste ao fim! ${score} pontos. Encontraste ${secrets.got} de ${secrets.total} segredos.`
      : `Fizeste ${score} pontos. O teu recorde é ${best}.`;

  return (
    <div className="dv-play">
      <div className="dv-scorebar">
        <span className="dv-score">
          <Icon name="coin" size={18} fill="currentColor" /> {score}
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
        <canvas ref={canvasRef} className="dv-canvas" aria-label="Velho Oeste — guia o vaqueiro com o manípulo e salta com os botões" />

        {phase === "playing" && (
          <div className="vq-controls">
            <div
              className="vq-stick"
              ref={stickRef}
              onPointerDown={stickDown}
              onPointerMove={stickMove}
              onPointerUp={stickUp}
              onPointerCancel={stickUp}
              aria-label="Manípulo: arrasta para a esquerda ou direita para andar"
            >
              <div className="vq-knob" ref={knobRef} aria-hidden />
            </div>
            <div className="vq-actions">
              {armed && (
                <button className="vq-btn vq-btn--squirt" onPointerDown={(e) => { e.preventDefault(); doSquirt(); }} aria-label="Esguichar água">
                  <Icon name="drop" size={26} />
                </button>
              )}
              <button className="vq-btn vq-btn--jump" onPointerDown={(e) => { e.preventDefault(); doJump(); }} aria-label="Saltar">
                <span className="vq-jump-glyph"><Icon name="forward" size={30} /></span>
              </button>
            </div>
          </div>
        )}

        {phase === "ready" && (
          <div className="dv-overlay" onClick={begin} role="button" tabIndex={0} aria-label="Começar a jogar">
            <h3 className="dv-overlay__title">Velho Oeste 🤠</h3>
            <p className="dv-overlay__sub">Guia o vaqueiro com o manípulo, salta com o botão e chega ao saloon. Apanha as moedas — a estrela dourada transforma-te em Xerife!</p>
            <button className="dv-tool dv-tool--wide" onClick={begin}>
              <Icon name="forward" size={20} /> <span>Começar</span>
            </button>
            {best > 0 && <p className="dv-overlay__best"><Icon name="trophy" size={16} /> Recorde: {best}</p>}
          </div>
        )}

        {phase === "cleared" && (
          <div className="dv-overlay">
            <h3 className="dv-overlay__title">Nível completo! 🌵</h3>
            <p className="dv-overlay__best"><Icon name="coin" size={16} /> {score} pontos</p>
            <p className="dv-overlay__best"><Icon name="search" size={16} /> Segredos: {secrets.got}/{secrets.total}</p>
            <button className="dv-tool dv-tool--wide" onClick={nextLevel}>
              <Icon name="forward" size={20} /> <span>Nível seguinte</span>
            </button>
          </div>
        )}

        {(phase === "won" || phase === "over") && (
          <div className="dv-overlay">
            <h3 className="dv-overlay__title">{phase === "won" ? (record ? "Novo recorde! 🎉" : "Ganhaste o Oeste! 🏆") : "Fim da aventura!"}</h3>
            <p className="dv-overlay__score">{score}</p>
            {phase === "won" && <p className="dv-overlay__best"><Icon name="search" size={16} /> Segredos: {secrets.got}/{secrets.total}</p>}
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

/* ---------------- simulation (kept out of the component for brevity) ---------------- */

interface WorldDelta {
  lives?: number;
  armed?: boolean;
  secrets?: boolean;
  cleared?: boolean;
  dead?: boolean;
}

function overlap(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number): boolean {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function updateWorld(G: Game, p: Player, dt: number, viewW: number, reduced: boolean, rawAxis: number, emit: (d: WorldDelta) => void) {
  if (p.boost > 0) p.boost -= dt;
  const topSpeed = WALK * (p.boost > 0 ? 1.4 : 1);
  // ---- horizontal movement from the thumb-stick / keys (dead-zone the centre) ----
  const axis = Math.abs(rawAxis) < 0.18 ? 0 : clamp(rawAxis, -1, 1);
  const targetVx = axis * topSpeed;
  p.vx += (targetVx - p.vx) * Math.min(1, dt * 12); // smooth toward the target
  if (axis > 0) p.face = 1;
  else if (axis < 0) p.face = -1;
  // a fiery trail while the chilli boost is active
  if (p.boost > 0 && !reduced && Math.abs(p.vx) > 30 && Math.floor(G.t * 30) % 2 === 0)
    G.parts.push({ x: p.x + p.w / 2 - p.face * 6, y: p.y + p.h - 6, vx: rand(-20, 20), vy: rand(-30, -70), life: 0.4, max: 0.4, size: rand(2, 4), color: Math.random() < 0.5 ? "#ff7a4d" : "#ffd23a", gravity: 60 });

  // ---- integrate + collide against the platforms ----
  // X
  p.x += p.vx * dt;
  p.x = clamp(p.x, 0, G.width - p.w);
  for (const pl of G.plats) {
    if (overlap(p.x, p.y, p.w, p.h, pl.x, pl.y, pl.w, pl.h)) {
      if (p.vx > 0) p.x = pl.x - p.w;
      else if (p.vx < 0) p.x = pl.x + pl.w;
      p.vx = 0;
    }
  }
  // Y
  p.vy += GRAVITY * dt;
  p.y += p.vy * dt;
  p.onGround = false;
  for (const pl of G.plats) {
    if (overlap(p.x, p.y, p.w, p.h, pl.x, pl.y, pl.w, pl.h)) {
      if (p.vy > 0) {
        p.y = pl.y - p.h;
        p.onGround = true;
        p.jumps = 0; // landed — refresh the double-jump
        if (!pl.wood) {
          p.safeX = p.x; // remember solid footing for a pit respawn
          p.safeY = p.y;
        }
      } else if (p.vy < 0) {
        p.y = pl.y + pl.h;
      }
      p.vy = 0;
    }
  }
  // walk-cycle phase
  if (p.onGround && Math.abs(p.vx) > 8) p.walk += Math.abs(p.vx) * dt * 0.06;
  if (p.invuln > 0) p.invuln -= dt;
  if (p.squirtCd > 0) p.squirtCd -= dt;

  // ---- fell into a ravine? respawn at the last footing, lose a heart ----
  if (p.y > VH + 60) {
    G.lives -= 1;
    G.shake = reduced ? 0 : 1;
    sfx.hit();
    emit({ lives: G.lives });
    if (G.lives <= 0) {
      emit({ dead: true });
      return;
    }
    p.x = p.safeX;
    p.y = p.safeY - 4;
    p.vx = 0;
    p.vy = 0;
    p.invuln = 1.2;
  }

  // ---- camera follows the player, clamped to the level ----
  const targetCam = clamp(p.x + p.w / 2 - viewW * 0.42, 0, Math.max(0, G.width - viewW));
  G.cam += (targetCam - G.cam) * Math.min(1, dt * 8);

  // ---- coins ----
  for (const c of G.coins) {
    if (c.taken) continue;
    c.spin += dt * 4;
    c.bob += dt * 3;
    if (overlap(p.x, p.y, p.w, p.h, c.x - 13, c.y - 13, 26, 26)) {
      c.taken = true;
      if (c.kind === "star") {
        if (p.form !== "xerife") {
          p.form = "xerife";
          const s = sizeFor("xerife");
          p.y -= s.h - p.h; // grow upward so feet stay put
          p.w = s.w;
          p.h = s.h;
        }
        G.score += 50;
        sfx.power();
        G.floats.push({ x: c.x, y: c.y - 6, life: 1.2, text: "Xerife!", color: "#ffd23a" });
        sparkle(G, c.x, c.y, reduced ? 6 : 14);
      } else if (c.kind === "secret") {
        G.secretsGot += 1;
        G.score += 30;
        sfx.power();
        G.floats.push({ x: c.x, y: c.y - 6, life: 1.2, text: "Segredo!", color: "#7fe3ff" });
        sparkle(G, c.x, c.y, reduced ? 6 : 14);
        emit({ secrets: true });
      } else if (c.kind === "life") {
        if (G.lives < HEARTS) {
          G.lives += 1;
          G.floats.push({ x: c.x, y: c.y - 6, life: 1.2, text: "+Vida!", color: "#41c46a" });
          emit({ lives: G.lives });
        } else {
          G.score += 25; // already full — a bonus instead
          G.floats.push({ x: c.x, y: c.y - 6, life: 1.2, text: "+25", color: "#41c46a" });
        }
        sfx.power();
        sparkle(G, c.x, c.y, reduced ? 6 : 12);
      } else if (c.kind === "boost") {
        p.boost = 6;
        G.score += 15;
        sfx.power();
        G.floats.push({ x: c.x, y: c.y - 6, life: 1.2, text: "Turbo!", color: "#ff7a4d" });
        sparkle(G, c.x, c.y, reduced ? 6 : 12);
      } else {
        G.coinsGot += 1;
        G.score += 10;
        sfx.coin(G.coinsGot % 8);
        sparkle(G, c.x, c.y, reduced ? 3 : 7);
      }
    }
  }

  // ---- water-pistol pickup ----
  for (const gn of G.guns) {
    if (gn.taken) continue;
    gn.bob += dt * 3;
    if (overlap(p.x, p.y, p.w, p.h, gn.x - 14, gn.y - 12, 28, 24)) {
      gn.taken = true;
      p.hasGun = true;
      sfx.power();
      G.floats.push({ x: gn.x, y: gn.y - 8, life: 1.1, text: "Pistola de água!", color: "#7fe3ff" });
      emit({ armed: true });
    }
  }

  // ---- water drops ----
  for (let i = G.drops.length - 1; i >= 0; i--) {
    const d = G.drops[i];
    d.life -= dt;
    d.vy += 320 * dt;
    d.x += d.vx * dt;
    d.y += d.vy * dt;
    if (d.life <= 0) {
      G.drops.splice(i, 1);
      continue;
    }
    for (const e of G.enemies) {
      if (e.alive && !e.fleeing && overlap(d.x - 4, d.y - 4, 8, 8, e.x - e.w / 2, e.y - e.h, e.w, e.h)) {
        e.fleeing = true;
        G.score += 5;
        G.floats.push({ x: e.x, y: e.y - e.h - 4, life: 0.9, text: "Foge!", color: "#7fe3ff" });
        splash(G, d.x, d.y, reduced ? 4 : 9);
        G.drops.splice(i, 1);
        break;
      }
    }
  }

  // ---- enemies ----
  for (const e of G.enemies) {
    if (!e.alive) continue;
    e.t += dt * 6;
    if (e.fleeing) {
      e.x += e.dir * 150 * dt; // run off the way it was facing
      if (e.x < G.cam - 60 || e.x > G.cam + viewW + 60) e.alive = false;
      continue;
    }
    e.x += e.dir * 56 * dt;
    if (e.x <= e.x0) {
      e.x = e.x0;
      e.dir = 1;
    } else if (e.x >= e.x1) {
      e.x = e.x1;
      e.dir = -1;
    }
    // collision with the player
    if (overlap(p.x, p.y, p.w, p.h, e.x - e.w / 2, e.y - e.h, e.w, e.h)) {
      const stomping = p.vy > 0 && p.y + p.h - e.y < 20;
      if (stomping) {
        e.alive = false;
        p.vy = -360; // bounce
        G.score += 15;
        sfx.boing();
        G.floats.push({ x: e.x, y: e.y - e.h - 4, life: 0.9, text: "+15", color: "#ffd23a" });
        burst(G, e.x, e.y - e.h / 2, "#c0392b", reduced ? 5 : 12);
      } else if (p.invuln <= 0) {
        // take a hit — the Xerife form shields you (reverts to vaqueiro)
        if (p.form === "xerife") {
          p.form = "vaqueiro";
          const s = sizeFor("vaqueiro");
          p.y += p.h - s.h;
          p.w = s.w;
          p.h = s.h;
          p.invuln = 1.4;
          sfx.hit();
          burst(G, p.x + p.w / 2, p.y + p.h / 2, "#ffd23a", reduced ? 5 : 12);
        } else {
          G.lives -= 1;
          p.invuln = 1.4;
          G.shake = reduced ? 0 : 1;
          sfx.hit();
          burst(G, p.x + p.w / 2, p.y + p.h / 2, "#ff6a4d", reduced ? 6 : 14);
          emit({ lives: G.lives });
          if (G.lives <= 0) {
            emit({ dead: true });
            return;
          }
        }
      }
    }
  }

  // ---- reached the saloon? ----
  if (p.x + p.w * 0.5 >= G.goalX) {
    emit({ cleared: true });
  }
}

/* ---- particle spawners ---- */
function sparkle(g: Game, x: number, y: number, n: number) {
  for (let i = 0; i < n; i++)
    g.parts.push({ x, y, vx: rand(-120, 120), vy: rand(-150, 30), life: 0.6, max: 0.6, size: rand(2, 5), color: i % 2 ? "#ffe680" : "#fff", gravity: 240 });
}
function splash(g: Game, x: number, y: number, n: number) {
  for (let i = 0; i < n; i++)
    g.parts.push({ x, y, vx: rand(-130, 130), vy: rand(-160, 20), life: 0.55, max: 0.55, size: rand(2, 4), color: i % 2 ? "#9fe6fb" : "#d6f6ff", gravity: 360 });
}
function burst(g: Game, x: number, y: number, color: string, n: number) {
  for (let i = 0; i < n; i++)
    g.parts.push({ x, y, vx: rand(-180, 180), vy: rand(-200, 50), life: 0.7, max: 0.7, size: rand(3, 6), color: i % 3 ? color : "#ffd23a", gravity: 420 });
}
