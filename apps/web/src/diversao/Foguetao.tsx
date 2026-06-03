import { useEffect, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "@sprout/ui";
import { fitCanvas, pointerPos, prefersReducedMotion } from "./canvas";
import { loadBest, saveBest, type ArcadePhase } from "./arcade";
import { sfx } from "./sfx";

/* Foguetão — a space dodger. DRAG your finger (or the mouse, or the arrow keys)
 * to fly the rocket and weave between the tumbling meteors. Scoop up the glowing
 * gems for points, and grab a blue shield to fly safe for a few seconds. Space
 * gets busier and faster the longer you survive — chase the high score.
 *
 * Drawn entirely on <canvas> (retina/iPad-crisp via fitCanvas). Simulation state
 * lives in a ref so the rAF loop never restarts; React state only feeds the
 * HUD/overlay. Honours prefers-reduced-motion. The high score persists. */

const BEST_KEY = "sprout.foguetao.best";
const HEARTS = 3;
const SHIELD_TIME = 6; // seconds a collected shield lasts

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  rot: number;
  vrot: number;
  verts: number[]; // per-point radius factors → an irregular rock
}
interface Gem {
  x: number;
  y: number;
  vy: number;
  spin: number;
  hue: string;
}
interface Power {
  x: number;
  y: number;
  vy: number;
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
}
interface Float {
  x: number;
  y: number;
  life: number;
  text: string;
  color: string;
}
interface BgStar {
  x: number; // 0..1
  y: number; // 0..1
  tw: number; // twinkle phase
  layer: number; // 0 far .. 2 near
}
interface Ship {
  x: number;
  y: number;
  tx: number; // target the ship eases toward (finger / keys)
  ty: number;
}
interface Game {
  phase: ArcadePhase;
  t: number;
  speed: number;
  dist: number;
  gems: number;
  combo: number;
  lives: number;
  invuln: number;
  shield: number; // seconds of shield left
  shake: number;
  ship: Ship;
  meteors: Meteor[];
  gemList: Gem[];
  powers: Power[];
  parts: Particle[];
  floats: Float[];
  stars: BgStar[];
  mSpawn: number;
  gSpawn: number;
  pSpawn: number;
  exhaust: number; // timer for trailing the engine flame
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const GEM_HUES = ["#49d6ff", "#ff79c6", "#9bff8f", "#ffd23a"];

function freshStars(): BgStar[] {
  return Array.from({ length: 90 }, () => ({
    x: Math.random(),
    y: Math.random(),
    tw: Math.random() * Math.PI * 2,
    layer: (Math.random() * 3) | 0,
  }));
}

function makeGame(): Game {
  return {
    phase: "ready",
    t: 0,
    speed: 0,
    dist: 0,
    gems: 0,
    combo: 0,
    lives: HEARTS,
    invuln: 0,
    shield: 0,
    shake: 0,
    ship: { x: 0.5, y: 0.78, tx: 0.5, ty: 0.78 }, // fractions until first frame sizes them
    meteors: [],
    gemList: [],
    powers: [],
    parts: [],
    floats: [],
    stars: freshStars(),
    mSpawn: 1,
    gSpawn: 1,
    pSpawn: 10,
    exhaust: 0,
  };
}

/* ---- drawing helpers ---- */

function drawSpace(ctx: CanvasRenderingContext2D, w: number, h: number, g: Game, reduced: boolean) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#0a0e23");
  sky.addColorStop(0.6, "#141a3c");
  sky.addColorStop(1, "#241a44");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // soft nebula glow
  const neb = ctx.createRadialGradient(w * 0.7, h * 0.3, 10, w * 0.7, h * 0.3, h * 0.6);
  neb.addColorStop(0, "rgba(120,80,200,0.22)");
  neb.addColorStop(1, "rgba(120,80,200,0)");
  ctx.fillStyle = neb;
  ctx.fillRect(0, 0, w, h);

  // parallax starfield: nearer layers scroll down faster (we're flying up)
  const scroll = (g.phase === "playing" ? g.dist : g.t * 30);
  for (const s of g.stars) {
    const y = (((s.y + scroll * (0.0008 + s.layer * 0.0014)) % 1) + 1) % 1; // wrap 0..1
    const size = 0.6 + s.layer * 0.9;
    const tw = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(g.t * 2 + s.tw);
    ctx.globalAlpha = tw;
    ctx.fillStyle = s.layer === 2 ? "#cfe6ff" : "#9fb6e6";
    ctx.fillRect(s.x * w, y * h, size, size + s.layer * 0.6);
  }
  ctx.globalAlpha = 1;
}

function drawMeteor(ctx: CanvasRenderingContext2D, m: Meteor) {
  ctx.save();
  ctx.translate(m.x, m.y);
  ctx.rotate(m.rot);
  const g = ctx.createRadialGradient(-m.r * 0.3, -m.r * 0.3, m.r * 0.2, 0, 0, m.r);
  g.addColorStop(0, "#9a8c7e");
  g.addColorStop(1, "#5b4f45");
  ctx.fillStyle = g;
  ctx.beginPath();
  const n = m.verts.length;
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2;
    const rr = m.r * m.verts[i];
    const x = Math.cos(ang) * rr;
    const y = Math.sin(ang) * rr;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  // craters
  ctx.fillStyle = "rgba(40,32,26,0.5)";
  for (const [cx, cy, cr] of [
    [-m.r * 0.25, -m.r * 0.1, m.r * 0.18],
    [m.r * 0.3, m.r * 0.2, m.r * 0.14],
    [m.r * 0.05, m.r * 0.4, m.r * 0.1],
  ]) {
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawGem(ctx: CanvasRenderingContext2D, gem: Gem) {
  const r = 13;
  ctx.save();
  ctx.translate(gem.x, gem.y);
  ctx.scale(Math.cos(gem.spin) * 0.85 + 0.15 || 0.15, 1);
  ctx.shadowColor = gem.hue;
  ctx.shadowBlur = 16;
  const g = ctx.createLinearGradient(0, -r, 0, r);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.4, gem.hue);
  g.addColorStop(1, "rgba(0,0,0,0.25)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r * 0.8, 0);
  ctx.lineTo(0, r);
  ctx.lineTo(-r * 0.8, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPower(ctx: CanvasRenderingContext2D, p: Power) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.spin);
  ctx.shadowColor = "#49d6ff";
  ctx.shadowBlur = 18;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#9beaff";
  ctx.beginPath();
  ctx.arc(0, 0, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#49d6ff";
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawShip(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, tilt: number, flame: number, shielded: boolean, dim: boolean) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);
  if (dim) ctx.globalAlpha = 0.5;

  // engine flame (flickers)
  if (flame > 0) {
    const fl = r * (0.9 + flame * 0.8);
    const fg = ctx.createLinearGradient(0, r * 0.5, 0, r * 0.5 + fl);
    fg.addColorStop(0, "#fff2a8");
    fg.addColorStop(0.5, "#ffb02e");
    fg.addColorStop(1, "rgba(255,80,30,0)");
    ctx.fillStyle = fg;
    ctx.beginPath();
    ctx.moveTo(-r * 0.34, r * 0.55);
    ctx.lineTo(0, r * 0.55 + fl);
    ctx.lineTo(r * 0.34, r * 0.55);
    ctx.closePath();
    ctx.fill();
  }

  // fins
  ctx.fillStyle = "#d8455b";
  ctx.beginPath();
  ctx.moveTo(-r * 0.5, r * 0.1);
  ctx.lineTo(-r * 0.95, r * 0.6);
  ctx.lineTo(-r * 0.4, r * 0.55);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(r * 0.5, r * 0.1);
  ctx.lineTo(r * 0.95, r * 0.6);
  ctx.lineTo(r * 0.4, r * 0.55);
  ctx.closePath();
  ctx.fill();

  // body (rounded, pointed nose)
  const bg = ctx.createLinearGradient(-r * 0.6, 0, r * 0.6, 0);
  bg.addColorStop(0, "#cfd8e6");
  bg.addColorStop(0.5, "#ffffff");
  bg.addColorStop(1, "#aebccd");
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.moveTo(0, -r * 1.25);
  ctx.quadraticCurveTo(r * 0.62, -r * 0.5, r * 0.55, r * 0.5);
  ctx.quadraticCurveTo(r * 0.5, r * 0.68, 0, r * 0.66);
  ctx.quadraticCurveTo(-r * 0.5, r * 0.68, -r * 0.55, r * 0.5);
  ctx.quadraticCurveTo(-r * 0.62, -r * 0.5, 0, -r * 1.25);
  ctx.closePath();
  ctx.fill();

  // window
  ctx.fillStyle = "#3aa0d8";
  ctx.beginPath();
  ctx.arc(0, -r * 0.18, r * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.beginPath();
  ctx.arc(-r * 0.1, -r * 0.28, r * 0.1, 0, Math.PI * 2);
  ctx.fill();

  // shield bubble
  if (shielded) {
    ctx.strokeStyle = "rgba(90,210,255,0.85)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, -r * 0.1, r * 1.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(90,210,255,0.12)";
    ctx.beginPath();
    ctx.arc(0, -r * 0.1, r * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function Foguetao() {
  const reduced = prefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(makeGame());

  const [phase, setPhase] = useState<ArcadePhase>("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(HEARTS);
  const [best, setBest] = useState(() => loadBest(BEST_KEY));
  const [record, setRecord] = useState(false);
  const [muted, setMuted] = useState(() => sfx.isMuted());

  const begin = () => {
    sfx.unlock();
    const G = gameRef.current;
    const c = canvasRef.current;
    const w = c?.clientWidth ?? 600;
    const h = c?.clientHeight ?? 420;
    G.phase = "playing";
    G.speed = reduced ? 150 : 200;
    G.dist = 0;
    G.gems = 0;
    G.combo = 0;
    G.lives = HEARTS;
    G.invuln = 0;
    G.shield = 0;
    G.shake = 0;
    G.ship = { x: w / 2, y: h * 0.78, tx: w / 2, ty: h * 0.78 };
    G.meteors = [];
    G.gemList = [];
    G.powers = [];
    G.parts = [];
    G.floats = [];
    G.mSpawn = 0.8;
    G.gSpawn = 0.9;
    G.pSpawn = rand(8, 12);
    setPhase("playing");
    setScore(0);
    setLives(HEARTS);
    setRecord(false);
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
    let dragging = false;

    const endGame = () => {
      G.phase = "over";
      const sc = Math.floor(G.dist / 16) + G.gems * 15;
      if (sc > loadBest(BEST_KEY)) {
        saveBest(BEST_KEY, sc);
        setBest(sc);
        setRecord(true);
        sfx.fanfare();
      } else {
        sfx.over();
      }
      setPhase("over");
    };

    const step = (time: number) => {
      const { w, h } = fitCanvas(canvas, ctx);
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 0.016;
      last = time;
      G.t += dt;
      const shipR = Math.max(20, Math.min(32, h * 0.058));

      if (G.phase === "ready" && G.ship.x <= 1) {
        // first frame: place the ship now that we know the pixel size
        G.ship = { x: w / 2, y: h * 0.78, tx: w / 2, ty: h * 0.78 };
      }

      if (G.phase === "playing") {
        G.speed = Math.min(reduced ? 300 : 460, G.speed + (reduced ? 3 : 6) * dt);
        G.dist += G.speed * dt;
        if (G.invuln > 0) G.invuln -= dt;
        if (G.shield > 0) G.shield -= dt;
        if (G.shake > 0) G.shake = Math.max(0, G.shake - dt * 2.5);

        // ease the ship toward the finger/keys, clamped on-screen
        const s = G.ship;
        s.tx = Math.max(shipR, Math.min(w - shipR, s.tx));
        s.ty = Math.max(shipR * 1.4, Math.min(h - shipR, s.ty));
        const k = Math.min(1, 12 * dt);
        s.x += (s.tx - s.x) * k;
        s.y += (s.ty - s.y) * k;

        // engine exhaust trail
        G.exhaust -= dt;
        if (G.exhaust <= 0 && !reduced) {
          G.exhaust = 0.02;
          G.parts.push({ x: s.x + rand(-3, 3), y: s.y + shipR * 0.6, vx: rand(-20, 20), vy: rand(60, 140), life: 0.5, max: 0.5, size: rand(2, 4), color: Math.random() < 0.5 ? "#ffb02e" : "#ff6a3a" });
        }

        // spawns
        G.mSpawn -= dt;
        if (G.mSpawn <= 0) {
          const r = rand(16, 34);
          G.meteors.push({
            x: rand(r, w - r),
            y: -r - 10,
            vx: rand(-40, 40),
            vy: G.speed * rand(0.7, 1.05),
            r,
            rot: Math.random() * Math.PI,
            vrot: rand(-1.5, 1.5),
            verts: Array.from({ length: 9 }, () => rand(0.72, 1)),
          });
          G.mSpawn = rand(170, 300) / G.speed + (reduced ? 0.25 : 0);
        }
        G.gSpawn -= dt;
        if (G.gSpawn <= 0) {
          G.gemList.push({ x: rand(24, w - 24), y: -16, vy: G.speed * rand(0.6, 0.85), spin: Math.random() * Math.PI, hue: GEM_HUES[(Math.random() * GEM_HUES.length) | 0] });
          G.gSpawn = rand(260, 420) / G.speed;
        }
        G.pSpawn -= dt;
        if (G.pSpawn <= 0) {
          G.powers.push({ x: rand(30, w - 30), y: -18, vy: G.speed * 0.7, spin: 0 });
          G.pSpawn = rand(12, 20);
        }

        // meteors
        for (let i = G.meteors.length - 1; i >= 0; i--) {
          const m = G.meteors[i];
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          m.rot += m.vrot * dt;
          if (m.y > h + m.r + 20) {
            G.meteors.splice(i, 1);
            continue;
          }
          if (Math.hypot(m.x - s.x, m.y - s.y) < m.r * 0.78 + shipR * 0.7) {
            if (G.shield > 0) {
              G.meteors.splice(i, 1);
              burst(G, m.x, m.y, "#9beaff", reduced ? 6 : 14);
              sfx.coin(0);
            } else if (G.invuln <= 0) {
              G.meteors.splice(i, 1);
              G.lives -= 1;
              G.combo = 0;
              G.invuln = 1.3;
              G.shake = reduced ? 0 : 1;
              sfx.hit();
              burst(G, s.x, s.y, "#ff6a4d", reduced ? 8 : 20);
              setLives(G.lives);
              if (G.lives <= 0) {
                endGame();
                break;
              }
            }
          }
        }

        // gems
        for (let i = G.gemList.length - 1; i >= 0; i--) {
          const gem = G.gemList[i];
          gem.y += gem.vy * dt;
          gem.spin += dt * 3.5;
          if (gem.y > h + 20) {
            G.gemList.splice(i, 1);
            G.combo = 0;
            continue;
          }
          if (Math.hypot(gem.x - s.x, gem.y - s.y) < shipR * 0.8 + 14) {
            G.gemList.splice(i, 1);
            G.gems += 1;
            G.combo += 1;
            sfx.coin(G.combo - 1);
            sparkle(G, gem.x, gem.y, reduced ? 4 : 10, gem.hue);
            if (G.combo > 1) G.floats.push({ x: gem.x, y: gem.y, life: 0.9, text: `x${G.combo}`, color: gem.hue });
          }
        }

        // power-ups (shields)
        for (let i = G.powers.length - 1; i >= 0; i--) {
          const p = G.powers[i];
          p.y += p.vy * dt;
          p.spin += dt * 2;
          if (p.y > h + 20) {
            G.powers.splice(i, 1);
            continue;
          }
          if (Math.hypot(p.x - s.x, p.y - s.y) < shipR * 0.8 + 16) {
            G.powers.splice(i, 1);
            G.shield = SHIELD_TIME;
            sfx.power();
            sparkle(G, p.x, p.y, reduced ? 6 : 14, "#49d6ff");
            G.floats.push({ x: s.x, y: s.y - shipR, life: 1, text: "Escudo!", color: "#9beaff" });
          }
        }
      }

      // particles & floats (run even on game over so a final burst finishes)
      for (let i = G.parts.length - 1; i >= 0; i--) {
        const pt = G.parts[i];
        pt.life -= dt;
        if (pt.life <= 0) {
          G.parts.splice(i, 1);
          continue;
        }
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
      }
      for (let i = G.floats.length - 1; i >= 0; i--) {
        const f = G.floats[i];
        f.life -= dt;
        f.y -= 26 * dt;
        if (f.life <= 0) G.floats.splice(i, 1);
      }

      // ---- draw ----
      ctx.save();
      if (G.shake > 0) ctx.translate(rand(-1, 1) * 7 * G.shake, rand(-1, 1) * 7 * G.shake);
      drawSpace(ctx, w, h, G, reduced);
      for (const m of G.meteors) drawMeteor(ctx, m);
      for (const gem of G.gemList) drawGem(ctx, gem);
      for (const p of G.powers) drawPower(ctx, p);

      // particles below the ship
      for (const pt of G.parts) {
        ctx.globalAlpha = Math.max(0, pt.life / pt.max);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const s = G.ship;
      const idle = G.phase === "playing" || reduced ? 0 : Math.sin(G.t * 2) * 5;
      const tilt = Math.max(-0.5, Math.min(0.5, (s.tx - s.x) * 0.01));
      const flame = G.phase === "playing" ? 0.6 + Math.random() * 0.5 : reduced ? 0.4 : 0.3 + Math.random() * 0.2;
      drawShip(ctx, s.x, s.y + idle, shipR, tilt, flame, G.shield > 0, G.invuln > 0 && Math.floor(G.t * 12) % 2 === 0);

      ctx.textAlign = "center";
      ctx.font = "800 22px system-ui, sans-serif";
      for (const f of G.floats) {
        ctx.globalAlpha = Math.max(0, f.life);
        ctx.fillStyle = f.color;
        ctx.fillText(f.text, f.x, f.y);
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      if (G.phase === "playing") {
        const sc = Math.floor(G.dist / 16) + G.gems * 15;
        if (sc !== shownScore) {
          shownScore = sc;
          setScore(sc);
        }
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      sfx.unlock();
      if (G.phase !== "playing") return;
      dragging = true;
      canvas.setPointerCapture?.(e.pointerId);
      const { x, y } = pointerPos(canvas, e);
      G.ship.tx = x;
      G.ship.ty = y;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging || G.phase !== "playing") return;
      e.preventDefault();
      const { x, y } = pointerPos(canvas, e);
      G.ship.tx = x;
      G.ship.ty = y;
    };
    const onUp = () => {
      dragging = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (G.phase !== "playing") return;
      const step = 46;
      if (e.code === "ArrowLeft") G.ship.tx -= step;
      else if (e.code === "ArrowRight") G.ship.tx += step;
      else if (e.code === "ArrowUp") G.ship.ty -= step;
      else if (e.code === "ArrowDown") G.ship.ty += step;
      else return;
      e.preventDefault();
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
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
          <Icon name="sparkle" size={18} fill="currentColor" /> {score}
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
        <canvas ref={canvasRef} className="dv-canvas" aria-label="Foguetão — arrasta para voar e desviar dos meteoros" />

        {phase === "ready" && (
          <div className="dv-overlay" onClick={begin} role="button" tabIndex={0} aria-label="Começar a jogar">
            <h3 className="dv-overlay__title">Foguetão 🚀</h3>
            <p className="dv-overlay__sub">Arrasta o dedo para voar. Desvia-te dos meteoros e apanha as gemas. O escudo azul protege-te!</p>
            <button className="dv-tool dv-tool--wide" onClick={begin}>
              <Icon name="forward" size={20} /> <span>Começar</span>
            </button>
            {best > 0 && <p className="dv-overlay__best"><Icon name="trophy" size={16} /> Recorde: {best}</p>}
          </div>
        )}

        {phase === "over" && (
          <div className="dv-overlay">
            <h3 className="dv-overlay__title">{record ? "Novo recorde! 🎉" : "Aterraste!"}</h3>
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

/* ---- particle spawners ---- */
function sparkle(g: Game, x: number, y: number, n: number, color: string) {
  for (let i = 0; i < n; i++)
    g.parts.push({ x, y, vx: rand(-150, 150), vy: rand(-150, 150), life: 0.6, max: 0.6, size: rand(2, 5), color: i % 2 ? color : "#fff" });
}
function burst(g: Game, x: number, y: number, color: string, n: number) {
  for (let i = 0; i < n; i++)
    g.parts.push({ x, y, vx: rand(-240, 240), vy: rand(-240, 240), life: 0.7, max: 0.7, size: rand(3, 7), color: i % 3 ? color : "#ffd23a" });
}
