import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker, Confetti, speak } from "@sprout/ui";
import { useProgress } from "../progress";
import { lessonMeta } from "../content/curriculum";
import { fitCanvas, pointerPos, prefersReducedMotion, cssVar } from "./canvas";
import { supportsDrawElement, drawHtmlInto } from "./canvas-html";

/* O teu jardim — a garden that grows with the child's real progress: one flower
 * for every lesson finished (each `Achievement`). Flowers sprout in, sway gently
 * (unless reduced-motion), and tapping one reads aloud which lesson it stands
 * for plus a word of encouragement. The whole scene is plain Canvas 2D so it
 * works on iPad, phone and desktop.
 *
 * Progressive enhancement: where the experimental HTML-in-Canvas API exists
 * (Chrome + flag), a live, CSS-animated star plaque is drawn into the scene. It
 * is purely additive — see ./canvas-html — and absent everywhere else. */

const MAX_PLANTS = 48; // plenty for 1.º ciclo; keeps the layout readable
const ENCOURAGE = [
  "Que jardim tão lindo!",
  "Continua a aprender e o jardim cresce!",
  "Cada flor é uma lição que acabaste!",
  "Estou muito orgulhoso de ti!",
];

interface Plant {
  title: string;
  subject: string;
  stars: number;
  color: string; // a "var(--subj-…)" reference from the achievement
}
interface Spot {
  x: number;
  y: number;
  r: number;
  i: number;
}

export function Jardim() {
  const { progress, totalStars } = useProgress();
  const reduced = prefersReducedMotion();
  const [confetti, setConfetti] = useState(false);

  // One flower per finished lesson. We read the canonical `done` set from the
  // progress map (not the append-only achievements log, which can lag behind),
  // so the garden always matches the child's real progress; lesson metadata
  // (title, subject, colour) comes from `lessonMeta`.
  const plants = useMemo<Plant[]>(
    () =>
      Object.entries(progress)
        .filter(([, l]) => l.done)
        .map(([id, l]) => {
          const m = lessonMeta.get(id);
          return {
            title: m?.title ?? id,
            subject: m?.subjectLabel ?? "",
            stars: l.bestStars,
            color: m?.color ?? "var(--joy)",
          };
        })
        .sort((a, b) => a.title.localeCompare(b.title, "pt"))
        .slice(0, MAX_PLANTS),
    [progress],
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plaqueRef = useRef<HTMLDivElement>(null);
  const spotsRef = useRef<Spot[]>([]);
  const plantsRef = useRef(plants);
  plantsRef.current = plants;
  const hasHtmlCanvas = supportsDrawElement();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (hasHtmlCanvas) canvas.setAttribute("layoutsubtree", ""); // experimental — Chrome+flag

    let raf = 0;
    let start = 0;

    const frame = (t: number) => {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const grow = reduced ? 1 : Math.min(1, elapsed / 0.9); // gentle sprout-in
      const time = reduced ? 0 : elapsed; // 0 → no sway / no sun motion
      spotsRef.current = drawGarden(canvas, ctx, plantsRef.current, grow, time, hasHtmlCanvas ? plaqueRef.current : null);
      if (!reduced) raf = requestAnimationFrame(frame); // keep swaying
    };
    raf = requestAnimationFrame(frame);

    // Reduced-motion draws a single static frame, so redraw on resize/rotation.
    const onResize = () => {
      if (reduced) requestAnimationFrame(frame);
    };
    window.addEventListener("resize", onResize);

    // Tap a flower to hear it (speech only on an explicit tap).
    const tap = (e: PointerEvent) => {
      const { x, y } = pointerPos(canvas, e);
      const hit = spotsRef.current.find((s) => Math.hypot(x - s.x, y - s.y) <= s.r + 16);
      if (!hit) return;
      const p = plantsRef.current[hit.i];
      if (p) speak(`${p.title}, de ${p.subject}. ${p.stars} ${p.stars === 1 ? "estrela" : "estrelas"}! ${ENCOURAGE[hit.i % ENCOURAGE.length]}`);
    };
    canvas.addEventListener("pointerdown", tap);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", tap);
    };
  }, [reduced, hasHtmlCanvas, totalStars, plants.length]);

  // "Regar o jardim" — a celebratory confetti burst on an explicit tap (never on
  // mount/navigation), with a spoken cheer.
  const water = () => {
    setConfetti(false);
    requestAnimationFrame(() => setConfetti(true));
    speak(
      plants.length > 0
        ? `Regaste o jardim! Tens ${totalStars} ${totalStars === 1 ? "estrela" : "estrelas"}. ${ENCOURAGE[0]}`
        : "Acaba uma lição para nascer a tua primeira flor!",
    );
    window.setTimeout(() => setConfetti(false), 2600);
  };

  const empty = plants.length === 0;

  return (
    <div className="dv-room-screen">
      <div className="dv-toolbar" role="toolbar" aria-label="O teu jardim">
        <button className="dv-tool dv-tool--wide" onClick={water}>
          <Icon name="drop" size={20} />
          <span>Regar o jardim</span>
        </button>
        <Speaker
          text={
            empty
              ? "Este é o teu jardim. Acaba uma lição e nasce a tua primeira flor! Depois, toca numa flor para a ouvires."
              : `O teu jardim tem ${plants.length} ${plants.length === 1 ? "flor" : "flores"}. Toca numa flor para saberes que lição plantaste.`
          }
          className="dv-tool"
          label="Ouvir sobre o jardim"
          size={22}
        />
      </div>

      <div className="dv-garden">
        <canvas ref={canvasRef} className="dv-canvas dv-canvas--garden" aria-label="O teu jardim — uma flor por cada lição que acabaste">
          {/* Progressive enhancement only (HTML-in-Canvas, Chrome+flag). Invisible
              in every normal browser; drawn into the scene where the API exists. */}
          {hasHtmlCanvas && (
            <div ref={plaqueRef} className="dv-plaque" aria-hidden="true">
              ★ {totalStars}
            </div>
          )}
        </canvas>
        {empty && (
          <div className="dv-garden__empty">
            <Icon name="plant" size={40} />
            <p>Acaba uma lição para plantar a tua primeira flor!</p>
          </div>
        )}
        {confetti && <Confetti pieces={reduced ? 16 : 60} />}
      </div>

      <p className="dv-hint">
        {empty ? "Cada lição que acabas nasce aqui como uma flor." : "Toca numa flor para ouvires que lição plantaste."}
      </p>
    </div>
  );
}

/* ---------------- canvas drawing (module-level, pure) ---------------- */

function drawGarden(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  plants: Plant[],
  grow: number,
  time: number,
  plaque: HTMLElement | null,
): Spot[] {
  const { w, h } = fitCanvas(canvas, ctx);
  // Read the theme tokens once per frame so the scene matches light/dark mode.
  const skyTop = cssVar(canvas, "--accent-soft", "#dde8fb");
  const skyBottom = cssVar(canvas, "--bg", "#f5f7fa");
  const sunCol = cssVar(canvas, "--warn", "#f0b429");
  const soilCol = cssVar(canvas, "--subj-hgp", "#b06a25");
  const green = cssVar(canvas, "--subj-edm", "#1f9d6b");

  // Sky
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, skyTop);
  sky.addColorStop(1, skyBottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Sun (top-right), gently breathing + turning
  const sx = w - 54;
  const sy = 54;
  const pulse = 1 + Math.sin(time * 1.5) * 0.05;
  ctx.fillStyle = sunCol;
  ctx.beginPath();
  ctx.arc(sx, sy, 24 * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = sunCol;
  ctx.lineWidth = 3;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + time * 0.2;
    ctx.beginPath();
    ctx.moveTo(sx + Math.cos(a) * 30, sy + Math.sin(a) * 30);
    ctx.lineTo(sx + Math.cos(a) * 40, sy + Math.sin(a) * 40);
    ctx.stroke();
  }

  // Soil + grass line
  const soilY = h * 0.74;
  ctx.fillStyle = soilCol;
  ctx.fillRect(0, soilY, w, h - soilY);
  ctx.fillStyle = green;
  ctx.fillRect(0, soilY - 6, w, 8);

  // Plants
  const spots: Spot[] = [];
  const n = plants.length;
  if (n > 0) {
    const margin = 36;
    const usable = Math.max(40, w - margin * 2);
    const spacing = n > 1 ? Math.min(78, usable / (n - 1)) : 0;
    const total = spacing * (n - 1);
    const startX = w / 2 - total / 2;
    const scale = n <= 1 ? 1 : Math.max(0.55, Math.min(1, spacing / 78));
    for (let i = 0; i < n; i++) {
      const x = n === 1 ? w / 2 : startX + i * spacing;
      const sway = Math.sin(time * 1.4 + i) * 4 * scale;
      const spot = drawPlant(ctx, x, soilY, scale, grow, sway, resolveColor(canvas, plants[i].color), green, sunCol, plants[i].stars);
      spots.push({ ...spot, i });
    }
  }

  // Progressive enhancement: draw the live HTML plaque (no-op where unsupported).
  if (plaque) drawHtmlInto(ctx, plaque, w - 150, h - 56);

  return spots;
}

function drawPlant(
  ctx: CanvasRenderingContext2D,
  x: number,
  baseY: number,
  scale: number,
  grow: number,
  sway: number,
  bloom: string,
  green: string,
  centerCol: string,
  stars: number,
): { x: number; y: number; r: number } {
  const stemH = 80 * scale * grow;
  const topX = x + sway;
  const topY = baseY - stemH;

  ctx.strokeStyle = green;
  ctx.lineWidth = 4 * scale;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, baseY);
  ctx.quadraticCurveTo(x + sway * 0.5, baseY - stemH * 0.5, topX, topY);
  ctx.stroke();

  if (grow > 0.4) {
    leaf(ctx, x + sway * 0.4, baseY - stemH * 0.45, 16 * scale, -1, green);
    leaf(ctx, x + sway * 0.6, baseY - stemH * 0.62, 14 * scale, 1, green);
  }

  const r = (12 + Math.max(1, stars) * 2) * scale * Math.max(0.2, grow); // bigger bloom for more stars
  ctx.fillStyle = bloom;
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(topX + Math.cos(a) * r * 0.9, topY + Math.sin(a) * r * 0.9, r * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = centerCol;
  ctx.beginPath();
  ctx.arc(topX, topY, r * 0.6, 0, Math.PI * 2);
  ctx.fill();

  return { x: topX, y: topY, r: r * 1.6 };
}

function leaf(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, dir: number, color: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(dir * 0.5);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(dir * size * 0.6, 0, size, size * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/* Achievement colours are stored as "var(--subj-…)" references (so they theme
 * with the page). Canvas needs a real colour, so resolve the custom property;
 * fall back to the playful --joy if the value isn't a var(). */
function resolveColor(el: Element, c: string): string {
  const m = /var\((--[\w-]+)\)/.exec(c);
  return m ? cssVar(el, m[1], cssVar(el, "--joy", "#ff7a59")) : c || cssVar(el, "--joy", "#ff7a59");
}
