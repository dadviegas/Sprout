import { useEffect, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "@sprout/ui";
import { fitCanvas, prefersReducedMotion } from "./canvas";
import { loadBest, saveBest, type ArcadePhase } from "./arcade";
import { sfx } from "./sfx";

/* Salta! — an endless runner. A cheerful little creature (o Saltão) hops along a
 * rolling meadow; the world scrolls toward it. TAP anywhere (or Space/↑) to jump,
 * tap again in the air for a springy double-jump. Leap over rocks and logs, and
 * snap up the spinning stars for points and a combo. The longer you last the
 * faster it gets — so every run is a fresh "just one more!".
 *
 * Everything is drawn on <canvas> for crisp, full-motion graphics that scale to
 * any screen (the shared fitCanvas handles retina/iPad). All simulation state
 * lives in a ref so the rAF loop never restarts; React state only carries what
 * the HUD/overlay show. Honours prefers-reduced-motion (gentler speed, fewer
 * particles, no screen shake). The high score persists between visits. */

const BEST_KEY = "sprout.salta.best";
const HEARTS = 3;

interface Player {
  py: number; // height of feet above the ground line, in px (0 = on the ground)
  vy: number; // vertical velocity (px/s, positive = up)
  jumps: number; // jumps used since last touching ground (0,1,2)
  squash: number; // landing squash impulse, decays to 0
}
interface Obstacle {
  x: number; // left edge
  w: number;
  h: number;
  kind: "rock" | "log";
}
interface Star {
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
interface Cloud {
  x: number; // 0..1 across an extended sky
  y: number; // 0..1 of the upper canvas
  s: number; // scale
}
interface Game {
  phase: ArcadePhase;
  t: number; // seconds since mount (for ambient wobble)
  speed: number; // world scroll speed (px/s)
  dist: number; // distance travelled (drives the score)
  collected: number; // stars caught
  combo: number;
  lives: number;
  invuln: number; // seconds of post-hit immunity left
  shake: number;
  player: Player;
  obstacles: Obstacle[];
  stars: Star[];
  parts: Particle[];
  floats: Float[];
  clouds: Cloud[];
  obSpawn: number; // seconds until next obstacle
  starSpawn: number; // seconds until next star
  groundScroll: number;
  hillFar: number;
  hillNear: number;
  cloudScroll: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function freshClouds(): Cloud[] {
  return Array.from({ length: 5 }, () => ({ x: Math.random(), y: rand(0.06, 0.34), s: rand(0.7, 1.3) }));
}

function makeGame(): Game {
  return {
    phase: "ready",
    t: 0,
    speed: 0,
    dist: 0,
    collected: 0,
    combo: 0,
    lives: HEARTS,
    invuln: 0,
    shake: 0,
    player: { py: 0, vy: 0, jumps: 0, squash: 0 },
    obstacles: [],
    stars: [],
    parts: [],
    floats: [],
    clouds: freshClouds(),
    obSpawn: 1,
    starSpawn: 0.7,
    groundScroll: 0,
    hillFar: 0,
    hillNear: 0,
    cloudScroll: 0,
  };
}

/* ---- drawing helpers (pure canvas, kid-bright palette; theme tokens aren't
   used here because a game scene should look the same in light and dark) ---- */

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

function drawSky(ctx: CanvasRenderingContext2D, w: number, h: number, g: Game) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#73c2ff");
  sky.addColorStop(0.6, "#a9e0ff");
  sky.addColorStop(1, "#e4f6ff");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // sun, top-right
  const sx = w * 0.82;
  const sy = h * 0.2;
  const glow = ctx.createRadialGradient(sx, sy, 4, sx, sy, h * 0.34);
  glow.addColorStop(0, "rgba(255,247,214,0.95)");
  glow.addColorStop(1, "rgba(255,247,214,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#fff3c4";
  ctx.beginPath();
  ctx.arc(sx, sy, h * 0.07, 0, Math.PI * 2);
  ctx.fill();

  // clouds (parallax, wrap horizontally)
  for (const c of g.clouds) {
    const cw = h * 0.16 * c.s;
    const x = ((c.x - g.cloudScroll / (w + cw * 4)) % 1 + 1) % 1 * (w + cw * 2) - cw;
    const y = c.y * h;
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.beginPath();
    ctx.arc(x, y, cw * 0.5, 0, Math.PI * 2);
    ctx.arc(x + cw * 0.55, y + cw * 0.08, cw * 0.38, 0, Math.PI * 2);
    ctx.arc(x - cw * 0.5, y + cw * 0.1, cw * 0.34, 0, Math.PI * 2);
    ctx.ellipse(x, y + cw * 0.32, cw * 0.8, cw * 0.34, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawHills(ctx: CanvasRenderingContext2D, w: number, h: number, baseY: number, amp: number, wl: number, scroll: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let x = 0; x <= w; x += 10) {
    const y = baseY + Math.sin((x + scroll) / wl) * amp + Math.sin((x + scroll) / (wl * 0.37)) * amp * 0.3;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
}

function drawGround(ctx: CanvasRenderingContext2D, w: number, h: number, groundY: number, scroll: number) {
  const dirt = ctx.createLinearGradient(0, groundY, 0, h);
  dirt.addColorStop(0, "#a9743f");
  dirt.addColorStop(1, "#7c5026");
  ctx.fillStyle = dirt;
  ctx.fillRect(0, groundY, w, h - groundY);
  // grass cap
  ctx.fillStyle = "#5fbf4f";
  ctx.fillRect(0, groundY, w, 12);
  ctx.fillStyle = "#4aa83c";
  ctx.fillRect(0, groundY + 9, w, 4);
  // scrolling grass tufts
  ctx.fillStyle = "#6fd05c";
  const gap = 46;
  const off = -(scroll % gap);
  for (let x = off; x < w + gap; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, groundY);
    ctx.lineTo(x + 6, groundY - 9);
    ctx.lineTo(x + 12, groundY);
    ctx.closePath();
    ctx.fill();
  }
}

function drawObstacle(ctx: CanvasRenderingContext2D, o: Obstacle, groundY: number) {
  const top = groundY - o.h;
  if (o.kind === "rock") {
    const g = ctx.createLinearGradient(0, top, 0, groundY);
    g.addColorStop(0, "#b9c2cb");
    g.addColorStop(1, "#7f8b97");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(o.x, groundY);
    ctx.quadraticCurveTo(o.x, top, o.x + o.w * 0.5, top);
    ctx.quadraticCurveTo(o.x + o.w, top, o.x + o.w, groundY);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.beginPath();
    ctx.ellipse(o.x + o.w * 0.36, top + o.h * 0.34, o.w * 0.14, o.h * 0.1, -0.5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const g = ctx.createLinearGradient(0, top, 0, groundY);
    g.addColorStop(0, "#a9712f");
    g.addColorStop(1, "#7d4f1d");
    ctx.fillStyle = g;
    roundRect(ctx, o.x, top, o.w, o.h, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(60,33,10,0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(o.x + o.w - 7, top + o.h / 2, 5, o.h * 0.32, 0, 0, Math.PI * 2);
    ctx.stroke();
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

function drawStar(ctx: CanvasRenderingContext2D, s: Star, r: number) {
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.scale(Math.cos(s.spin) * 0.9 + 0.1 || 0.1, 1); // spin around its vertical axis
  ctx.shadowColor = "rgba(255,205,60,0.9)";
  ctx.shadowBlur = 14;
  const g = ctx.createLinearGradient(0, -r, 0, r);
  g.addColorStop(0, "#ffe680");
  g.addColorStop(1, "#ffb320");
  ctx.fillStyle = g;
  starPath(ctx, 0, 0, r);
  ctx.fill();
  ctx.restore();
}

function drawCreature(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, p: Player, dim: boolean) {
  ctx.save();
  if (dim) ctx.globalAlpha = 0.45;
  // squash & stretch: rising/falling stretches vertically; landing squashes
  const motion = Math.max(-0.5, Math.min(0.5, p.vy / 1600));
  const sx = 1 - motion * 0.5 + p.squash * 0.4;
  const sy = 1 + motion * 0.5 - p.squash * 0.4;
  ctx.translate(cx, cy);
  ctx.scale(sx, sy);
  // body
  const g = ctx.createLinearGradient(0, -r, 0, r);
  g.addColorStop(0, "#8fe35a");
  g.addColorStop(1, "#4fb22e");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(0, 0, r, r * 1.02, 0, 0, Math.PI * 2);
  ctx.fill();
  // tummy
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.beginPath();
  ctx.ellipse(0, r * 0.34, r * 0.5, r * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();
  // feet (tuck up while airborne)
  const footY = r * (p.py > 1 ? 0.7 : 0.92);
  ctx.fillStyle = "#3c8f22";
  for (const fx of [-r * 0.45, r * 0.45]) {
    ctx.beginPath();
    ctx.ellipse(fx, footY, r * 0.28, r * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  // eyes
  const look = Math.max(-1, Math.min(1, p.vy / -1200)); // pupils glance toward motion
  for (const ex of [-r * 0.34, r * 0.34]) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(ex, -r * 0.34, r * 0.27, r * 0.32, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1c2530";
    ctx.beginPath();
    ctx.arc(ex + r * 0.05, -r * 0.34 + look * r * 0.12, r * 0.13, 0, Math.PI * 2);
    ctx.fill();
  }
  // smile
  ctx.strokeStyle = "#235416";
  ctx.lineWidth = Math.max(2, r * 0.09);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(0, -r * 0.02, r * 0.4, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
  ctx.restore();
}

export function Salta() {
  const reduced = prefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(makeGame());

  const [phase, setPhase] = useState<ArcadePhase>("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(HEARTS);
  const [best, setBest] = useState(() => loadBest(BEST_KEY));
  const [record, setRecord] = useState(false);
  const [muted, setMuted] = useState(() => sfx.isMuted());

  // Start (or restart) a run. Mutates the game ref the loop reads, and the React
  // state the overlay/HUD show. The rAF loop is always running, so it picks up
  // the new "playing" phase on its next frame.
  const begin = () => {
    sfx.unlock();
    const G = gameRef.current;
    G.phase = "playing";
    G.speed = reduced ? 160 : 220;
    G.dist = 0;
    G.collected = 0;
    G.combo = 0;
    G.lives = HEARTS;
    G.invuln = 0;
    G.shake = 0;
    G.player = { py: 0, vy: 0, jumps: 0, squash: 0 };
    G.obstacles = [];
    G.stars = [];
    G.parts = [];
    G.floats = [];
    G.obSpawn = 1.5; // a gentle grace period before the first obstacle
    G.starSpawn = 0.5; // but a star almost straight away, to invite a jump
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

    const jump = () => {
      if (G.phase !== "playing") return;
      const p = G.player;
      if (p.py <= 0.5) {
        p.vy = reduced ? 700 : 760;
        p.jumps = 1;
        sfx.jump(false);
      } else if (p.jumps < 2) {
        p.vy = reduced ? 640 : 700;
        p.jumps = 2;
        sfx.jump(true);
        if (!reduced) {
          // a little puff at the creature's feet for the springy double-jump
          const h = canvas.clientHeight;
          const groundY = h - Math.max(64, Math.min(110, h * 0.17));
          const pr = Math.max(20, Math.min(32, h * 0.052));
          puff(G, canvas.clientWidth * 0.26, groundY - pr - p.py, 6);
        }
      }
    };

    const step = (time: number) => {
      const { w, h } = fitCanvas(canvas, ctx);
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 0.016;
      last = time;
      G.t += dt;

      const groundH = Math.max(64, Math.min(110, h * 0.17));
      const groundY = h - groundH;
      const pr = Math.max(20, Math.min(32, h * 0.052));
      const px = w * 0.26;
      const gravity = reduced ? 2000 : 2300;

      // ambient drift even on the ready/over screens, so the scene feels alive
      G.cloudScroll += (G.phase === "playing" ? G.speed * 0.06 : 9) * dt;

      if (G.phase === "playing") {
        G.speed = Math.min(reduced ? 360 : 640, G.speed + (reduced ? 4 : 7) * dt);
        G.dist += G.speed * dt;
        G.groundScroll += G.speed * dt;
        G.hillNear += G.speed * 0.5 * dt;
        G.hillFar += G.speed * 0.2 * dt;
        if (G.invuln > 0) G.invuln -= dt;
        if (G.shake > 0) G.shake = Math.max(0, G.shake - dt * 2.5);

        // physics
        const p = G.player;
        p.vy -= gravity * dt;
        p.py += p.vy * dt;
        if (p.py <= 0) {
          if (p.vy < -380) {
            p.squash = Math.min(0.6, -p.vy / 1600);
            if (!reduced) puff(G, px, groundY, 5);
          }
          p.py = 0;
          p.vy = 0;
          p.jumps = 0;
        }
        p.squash *= 0.82;

        // spawns — spaced by distance so the rhythm stays fair as speed climbs
        G.obSpawn -= dt;
        if (G.obSpawn <= 0) {
          const kind: Obstacle["kind"] = Math.random() < 0.5 ? "rock" : "log";
          const ow = kind === "rock" ? rand(34, 52) : rand(48, 72);
          const oh = kind === "rock" ? ow * rand(0.7, 0.95) : rand(26, 40);
          G.obstacles.push({ x: w + 40, w: ow, h: oh, kind });
          // space obstacles by distance so the rhythm stays jumpable as it speeds
          // up; the wider early gaps shrink a little as the run goes on
          G.obSpawn = rand(360, 520) / G.speed;
        }
        G.starSpawn -= dt;
        if (G.starSpawn <= 0) {
          const n = Math.random() < 0.35 ? 3 : 1; // sometimes a little arc of three
          const baseY = groundY - rand(60, 190);
          for (let i = 0; i < n; i++) {
            G.stars.push({ x: w + 40 + i * 46, y: baseY - Math.sin((i / Math.max(1, n - 1)) * Math.PI) * 34, spin: Math.random() * Math.PI });
          }
          G.starSpawn = rand(220, 360) / G.speed;
        }

        // move + collide obstacles
        const pcx = px;
        const pcy = groundY - pr - p.py;
        for (let i = G.obstacles.length - 1; i >= 0; i--) {
          const o = G.obstacles[i];
          o.x -= G.speed * dt;
          if (o.x + o.w < -20) {
            G.obstacles.splice(i, 1);
            continue;
          }
          if (G.invuln <= 0) {
            const nx = Math.max(o.x, Math.min(pcx, o.x + o.w));
            const ny = Math.max(groundY - o.h, Math.min(pcy, groundY));
            if (Math.hypot(pcx - nx, pcy - ny) < pr * 0.7) {
              G.lives -= 1;
              G.combo = 0;
              G.invuln = 1.3;
              G.shake = reduced ? 0 : 1;
              sfx.hit();
              burst(G, pcx, pcy, "#ff6a4d", reduced ? 6 : 16);
              setLives(G.lives);
              if (G.lives <= 0) {
                G.phase = "over";
                const sc = Math.floor(G.dist / 28) + G.collected * 10;
                const beat = sc > loadBest(BEST_KEY);
                if (beat) {
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

        // move + collect stars
        for (let i = G.stars.length - 1; i >= 0; i--) {
          const s = G.stars[i];
          s.x -= G.speed * dt;
          s.spin += dt * 4;
          if (s.x < -30) {
            G.stars.splice(i, 1);
            G.combo = 0; // missed star breaks the combo
            continue;
          }
          if (Math.hypot(pcx - s.x, pcy - s.y) < pr * 0.8 + 16) {
            G.stars.splice(i, 1);
            G.collected += 1;
            G.combo += 1;
            sfx.coin(G.combo - 1);
            sparkle(G, s.x, s.y, reduced ? 4 : 10);
            if (G.combo > 1) G.floats.push({ x: s.x, y: s.y, life: 0.9, text: `x${G.combo}`, color: "#ffb320" });
          }
        }
      }

      // particles & floats always animate (so a hit burst finishes on game over)
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
      ctx.save();
      if (G.shake > 0) ctx.translate(rand(-1, 1) * 6 * G.shake, rand(-1, 1) * 6 * G.shake);
      drawSky(ctx, w, h, G);
      drawHills(ctx, w, h, groundY - 38, 26, 150, G.hillFar, "#bfe7a6");
      drawHills(ctx, w, h, groundY - 8, 20, 95, G.hillNear, "#94d77f");
      drawGround(ctx, w, h, groundY, G.groundScroll);

      for (const o of G.obstacles) drawObstacle(ctx, o, groundY);
      for (const s of G.stars) drawStar(ctx, s, 16);

      // player + soft shadow
      const idleBob = G.phase === "playing" || reduced ? 0 : Math.sin(G.t * 2) * 4;
      const p = G.player;
      const pcy = groundY - pr - p.py - idleBob;
      const shadowScale = Math.max(0.3, 1 - p.py / 260);
      ctx.fillStyle = `rgba(40,60,20,${0.28 * shadowScale})`;
      ctx.beginPath();
      ctx.ellipse(px, groundY - 2, pr * 0.9 * shadowScale, pr * 0.32 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();
      drawCreature(ctx, px, pcy, pr, p, G.invuln > 0 && Math.floor(G.t * 12) % 2 === 0);

      // particles
      for (const pt of G.parts) {
        ctx.globalAlpha = Math.max(0, pt.life / pt.max);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      // floating combo text
      ctx.textAlign = "center";
      ctx.font = "800 22px system-ui, sans-serif";
      for (const f of G.floats) {
        ctx.globalAlpha = Math.max(0, f.life / 0.9);
        ctx.fillStyle = f.color;
        ctx.fillText(f.text, f.x, f.y);
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // push the (cheap) HUD score only when the displayed integer changes
      if (G.phase === "playing") {
        const sc = Math.floor(G.dist / 28) + G.collected * 10;
        if (sc !== shownScore) {
          shownScore = sc;
          setScore(sc);
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
        <canvas ref={canvasRef} className="dv-canvas" aria-label="Salta! — toca para o Saltão saltar" />

        {phase === "ready" && (
          <div className="dv-overlay" onClick={begin} role="button" tabIndex={0} aria-label="Começar a jogar">
            <h3 className="dv-overlay__title">Salta! 🐸</h3>
            <p className="dv-overlay__sub">Toca para saltar e apanha as estrelas. Toca outra vez no ar para um salto duplo!</p>
            <button className="dv-tool dv-tool--wide" onClick={begin}>
              <Icon name="forward" size={20} /> <span>Começar</span>
            </button>
            {best > 0 && <p className="dv-overlay__best"><Icon name="trophy" size={16} /> Recorde: {best}</p>}
          </div>
        )}

        {phase === "over" && (
          <div className="dv-overlay">
            <h3 className="dv-overlay__title">{record ? "Novo recorde! 🎉" : "Fim do salto!"}</h3>
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

/* ---- particle spawners (kept out of the component for brevity) ---- */
function puff(g: Game, x: number, y: number, n: number) {
  for (let i = 0; i < n; i++)
    g.parts.push({ x, y, vx: rand(-60, 60), vy: rand(-40, -120), life: 0.5, max: 0.5, size: rand(3, 6), color: "rgba(220,200,170,0.9)", gravity: 300 });
}
function sparkle(g: Game, x: number, y: number, n: number) {
  for (let i = 0; i < n; i++)
    g.parts.push({ x, y, vx: rand(-140, 140), vy: rand(-160, 40), life: 0.6, max: 0.6, size: rand(2, 5), color: i % 2 ? "#ffe680" : "#fff", gravity: 260 });
}
function burst(g: Game, x: number, y: number, color: string, n: number) {
  for (let i = 0; i < n; i++)
    g.parts.push({ x, y, vx: rand(-200, 200), vy: rand(-220, 60), life: 0.7, max: 0.7, size: rand(3, 7), color: i % 3 ? color : "#ffd23a", gravity: 420 });
}
