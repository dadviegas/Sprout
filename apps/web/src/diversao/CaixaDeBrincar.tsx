import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { Speaker } from "@sprout/ui";
import { fitCanvas, pointerPos, prefersReducedMotion, cssVar } from "./canvas";

/* Caixa de brincar — a full-bleed canvas sandbox. Tap or drag anywhere and a
 * burst of physics toys flies out: confetti, rising bubbles, or springy little
 * friends. Pure play, no goal. One Pointer-Events code path covers touch (iPad/
 * phone), pen and mouse. The animation loop only runs while toys are on screen
 * (nothing moves on its own), and reduced-motion makes the bursts small + calm.
 *
 * Speech rule: nothing is spoken automatically — only the speaker button reads
 * the instructions. Spawning toys is silent (per-tap speech would be a mess). */

type Toy = "confete" | "bolhas" | "amigos";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // seconds left
  size: number;
  color: string;
  type: Toy;
  rot: number;
  vr: number; // spin (rad/s)
  phase: number; // for bubble wobble
}

const TOYS: { id: Toy; icon: IconName; label: string }[] = [
  { id: "confete", icon: "sparkle", label: "Confete" },
  { id: "bolhas", icon: "drop", label: "Bolhas" },
  { id: "amigos", icon: "teddy", label: "Amigos saltitões" },
];

// Painted from the design tokens so the toys stay on-theme in light + dark.
const PALETTE_VARS = ["--joy", "--primary", "--accent", "--warn", "--subj-pt", "--subj-en", "--subj-mundo"];

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Paint one toy. Confetti = a spinning rectangle; a bubble = a translucent ring
 *  with a highlight; a friend = a coloured blob with googly eyes and a smile. */
function draw(ctx: CanvasRenderingContext2D, p: Particle) {
  const alpha = p.life > 0.5 ? 1 : Math.max(0, p.life / 0.5); // fade out in the last 0.5s
  ctx.globalAlpha = alpha;

  if (p.type === "confete") {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
    ctx.restore();
  } else if (p.type === "bolhas") {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.globalAlpha = alpha * 0.22;
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 2;
    ctx.strokeStyle = p.color;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p.x - p.size * 0.34, p.y - p.size * 0.34, p.size * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    const ex = p.size * 0.35;
    const ey = -p.size * 0.12;
    const er = p.size * 0.22;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath(); ctx.arc(p.x - ex, p.y + ey, er, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(p.x + ex, p.y + ey, er, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#1c2530";
    ctx.beginPath(); ctx.arc(p.x - ex, p.y + ey, er * 0.45, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(p.x + ex, p.y + ey, er * 0.45, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#1c2530";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y + p.size * 0.2, p.size * 0.34, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export function CaixaDeBrincar() {
  const reduced = prefersReducedMotion();
  const [toy, setToy] = useState<Toy>("confete");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toyRef = useRef<Toy>(toy);
  toyRef.current = toy;
  // An imperative handle the toolbar's "limpar" button calls into.
  const clearRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const parts: Particle[] = [];
    let palette: string[] = []; // set on the first pointerdown, before any spawn
    let raf = 0;
    let last = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const cap = reduced ? 90 : 600;
    const slow = reduced ? 0.6 : 1;

    function readPalette(): string[] {
      return PALETTE_VARS.map((v) => cssVar(canvas!, v, "#ff7a59"));
    }

    function spawn(x: number, y: number, n: number) {
      const t = toyRef.current;
      for (let i = 0; i < n && parts.length < cap; i++) {
        const color = palette[(Math.random() * palette.length) | 0];
        if (t === "bolhas") {
          parts.push({ x, y, vx: rand(-50, 50), vy: rand(-120, -30) * slow, life: rand(2.4, 4), size: rand(10, 22), color, type: t, rot: 0, vr: 0, phase: rand(0, Math.PI * 2) });
        } else if (t === "amigos") {
          parts.push({ x, y, vx: rand(-160, 160) * slow, vy: rand(-620, -320) * slow, life: rand(3, 5), size: rand(16, 28), color, type: t, rot: 0, vr: 0, phase: 0 });
        } else {
          parts.push({ x, y, vx: rand(-220, 220) * slow, vy: rand(-460, -220) * slow, life: rand(1.6, 2.6), size: rand(7, 13), color, type: t, rot: rand(0, Math.PI * 2), vr: rand(-8, 8), phase: 0 });
        }
      }
      ensureLoop();
    }

    function ensureLoop() {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(step);
      }
    }

    function step(t: number) {
      const { w, h } = fitCanvas(canvas!, ctx!);
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      ctx!.clearRect(0, 0, w, h);

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life -= dt;
        if (p.type === "bolhas") {
          p.vy += -120 * dt; // buoyancy — bubbles rise
          p.x += (p.vx + Math.sin(p.phase + t / 400) * 18) * dt;
          p.y += p.vy * dt;
        } else {
          p.vy += (p.type === "amigos" ? 1400 : 900) * dt; // gravity
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.type === "amigos" && p.y > h - p.size) {
            p.y = h - p.size; // bounce off the floor, losing a little energy
            p.vy *= -0.6;
            p.vx *= 0.8;
          }
        }
        p.rot += p.vr * dt;

        if (p.life <= 0 || p.y > h + 60 || p.y < -80 || p.x < -80 || p.x > w + 80) {
          parts.splice(i, 1);
          continue;
        }
        draw(ctx!, p);
      }

      if (parts.length > 0) raf = requestAnimationFrame(step);
      else { raf = 0; last = 0; }
    }

    const burstBig = () => (toyRef.current === "amigos" ? (reduced ? 3 : 5) : toyRef.current === "bolhas" ? (reduced ? 4 : 9) : reduced ? 6 : 16);
    const burstSmall = () => (toyRef.current === "amigos" ? 1 : toyRef.current === "bolhas" ? 2 : 4);

    const down = (e: PointerEvent) => {
      canvas.setPointerCapture?.(e.pointerId);
      dragging = true;
      palette = readPalette(); // re-read so a theme switch is picked up
      const { x, y } = pointerPos(canvas, e);
      lastX = x;
      lastY = y;
      spawn(x, y, burstBig());
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const { x, y } = pointerPos(canvas, e);
      if (Math.hypot(x - lastX, y - lastY) < 22) return; // throttle by distance
      lastX = x;
      lastY = y;
      spawn(x, y, burstSmall());
    };
    const end = () => { dragging = false; };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);

    clearRef.current = () => {
      parts.length = 0;
      const { w, h } = fitCanvas(canvas, ctx);
      ctx.clearRect(0, 0, w, h);
    };

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", end);
      canvas.removeEventListener("pointercancel", end);
    };
  }, [reduced]);

  return (
    <div className="dv-room-screen">
      <div className="dv-toolbar" role="toolbar" aria-label="Escolher brinquedo">
        <div className="dv-toolbar__group">
          {TOYS.map((tt) => (
            <button
              key={tt.id}
              className={`dv-tool ${toy === tt.id ? "is-active" : ""}`}
              onClick={() => setToy(tt.id)}
              aria-pressed={toy === tt.id}
              aria-label={tt.label}
              title={tt.label}
            >
              <Icon name={tt.icon} size={22} />
            </button>
          ))}
        </div>
        <div className="dv-toolbar__group">
          <button className="dv-tool" onClick={() => clearRef.current()} aria-label="Limpar o quadro" title="Limpar">
            <Icon name="refresh" size={22} />
          </button>
          <Speaker
            text="Toca no ecrã e arrasta o dedo para fazer magia! Escolhe confete, bolhas ou amigos saltitões."
            className="dv-tool"
            label="Ouvir como se brinca"
            size={22}
          />
        </div>
      </div>

      <canvas ref={canvasRef} className="dv-canvas" aria-label="Quadro de brincar — toca e arrasta para criar brinquedos" />

      <p className="dv-hint">Toca e arrasta no quadro para brincar — escolhe um brinquedo lá em cima.</p>
    </div>
  );
}
