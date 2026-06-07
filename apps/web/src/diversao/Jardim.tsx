import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker, Confetti, speak } from "@sprout/ui";
import { useProgress } from "../progress";
import { lessonMeta, type YearN } from "../content/curriculum";
import { viewToHash } from "../nav";
import { fitCanvas, pointerPos, prefersReducedMotion, cssVar } from "./canvas";
import { supportsDrawElement, drawHtmlInto } from "./canvas-html";

/* O teu jardim — a hillside that grows with the child's real progress: one plant
 * for every lesson finished. Easier lessons sprout as flowers and the harder
 * goals (4.º ano and up) grow into trees, so a glance shows how far the child has
 * climbed. The garden is a mountain slope, so it has room for hundreds of plants:
 * they lay out in receding rows — big and spaced in front, small and dense up the
 * hill toward the peaks. Every lesson gets its own shape (7 flowers, 3 trees) so
 * the slope is varied, not a field of clones; the colour comes from the subject,
 * so areas still read as colour families. Plants sway, butterflies flutter and
 * clouds drift (unless reduced-motion); tapping a plant reads aloud which lesson
 * it stands for. Watering sends a gust of wind that bends everything and blows
 * petals across the scene. All plain Canvas 2D, so it works on iPad, phone and
 * desktop; the tiny far plants draw in a cheaper level-of-detail to stay smooth.
 *
 * Progressive enhancement: where the experimental HTML-in-Canvas API exists
 * (Chrome + flag), a live, CSS-animated star plaque is drawn into the scene. It
 * is purely additive — see ./canvas-html — and absent everywhere else. */

const MAX_PLANTS = 300; // a whole hillside — more than the 1.º ciclo has lessons
const HARD_YEAR = 4; // 4.º ano and up are the hard goals → they grow into trees
const FLOWER_STYLES = 7;
const TREE_STYLES = 3;
const GUST_DUR = 2.4; // seconds a watering wind-gust lasts
const MATURE_MS = 21 * 24 * 60 * 60 * 1000; // a tree reaches full (2×) size 3 weeks after it is planted
const TAU = Math.PI * 2;
const ENCOURAGE = [
  "Que jardim tão lindo!",
  "Continua a aprender e o jardim cresce!",
  "Cada flor é uma lição que acabaste!",
  "Estou muito orgulhoso de ti!",
];

interface Plant {
  id: string; // the lesson id — used to link back to its material
  title: string;
  subject: string; // subject label (e.g. "Matemática")
  subjectId: string;
  year: YearN;
  stars: number;
  color: string; // a "var(--subj-…)" reference from the lesson's subject
  kind: "flower" | "tree";
  style: number; // which flower/tree shape — derived per lesson, so it varies
  maturity: number; // 1 → just planted, 2 → fully grown (trees grow over real time)
}
interface Spot {
  x: number;
  y: number;
  r: number;
  i: number;
}
interface Placement {
  i: number; // index into the plants array
  x: number;
  y: number; // the ground line this plant grows from
  scale: number; // 1 in front → small up the hill
}

/* A stable shape per lesson, hashed from its id, so the slope shows real variety
 * even within one subject. Robust as new lessons are added — no table to keep. */
function styleFor(id: string, n: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % n;
}

/* A stable pseudo-random 0..1 for a given index + salt, so scatter/peaks stay put
 * frame to frame (no jitter) without storing anything. */
function hash01(i: number, salt: number): number {
  let h = (Math.imul(i + 1, 2654435761) ^ Math.imul(salt + 1, 40503)) >>> 0;
  h = (h ^ (h >>> 13)) >>> 0;
  return (h % 1000) / 1000;
}

export function Jardim() {
  const { progress, achievements, totalStars } = useProgress();
  const reduced = prefersReducedMotion();
  const [confetti, setConfetti] = useState(false);

  // When each lesson was first finished, so a tree can age from there. The
  // achievements log carries the timestamp; the progress map (our source of
  // truth for *what* is done) does not.
  const plantedAt = useMemo(() => {
    const m = new Map<string, number>();
    for (const a of achievements) {
      const prev = m.get(a.lessonId);
      if (prev === undefined || a.at < prev) m.set(a.lessonId, a.at);
    }
    return m;
  }, [achievements]);

  // One plant per finished lesson. We read the canonical `done` set from the
  // progress map (not the append-only achievements log, which can lag behind),
  // so the garden always matches the child's real progress; lesson metadata
  // (title, subject, colour, year) comes from `lessonMeta`. Trees keep growing
  // for a few weeks after they are planted (up to 2×), so the garden feels alive
  // between visits.
  const now = Date.now();
  const plants = useMemo<Plant[]>(
    () =>
      Object.entries(progress)
        .filter(([, l]) => l.done)
        .map(([id, l]) => {
          const m = lessonMeta.get(id);
          const isTree = (m?.year ?? 1) >= HARD_YEAR;
          const at = plantedAt.get(id);
          const maturity = isTree ? 1 + Math.min(1, Math.max(0, now - (at ?? now - MATURE_MS)) / MATURE_MS) : 1;
          return {
            id,
            title: m?.title ?? id,
            subject: m?.subjectLabel ?? "",
            subjectId: m?.subjectId ?? "",
            year: m?.year ?? 1,
            stars: l.bestStars,
            color: m?.color ?? "var(--joy)",
            kind: isTree ? "tree" : "flower",
            style: styleFor(id, isTree ? TREE_STYLES : FLOWER_STYLES),
            maturity,
          } as Plant;
        })
        .sort((a, b) => a.title.localeCompare(b.title, "pt"))
        .slice(0, MAX_PLANTS),
    [progress, plantedAt, now],
  );

  const trees = plants.filter((p) => p.kind === "tree").length;
  const flowers = plants.length - trees;

  // The legend table below the garden: every plant, newest first, with a link
  // back to the lesson it stands for.
  const legend = useMemo(
    () => [...plants].sort((a, b) => (plantedAt.get(b.id) ?? 0) - (plantedAt.get(a.id) ?? 0) || a.title.localeCompare(b.title, "pt")),
    [plants, plantedAt],
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plaqueRef = useRef<HTMLDivElement>(null);
  const spotsRef = useRef<Spot[]>([]);
  const plantsRef = useRef(plants);
  plantsRef.current = plants;
  const clockRef = useRef(0); // latest elapsed seconds, so a tap can time a gust
  const windRef = useRef(-1); // elapsed time a wind-gust started, or -1 for none
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
      clockRef.current = elapsed;
      const grow = reduced ? 1 : Math.min(1, elapsed / 0.9); // gentle sprout-in
      const time = reduced ? 0 : elapsed; // 0 → no sway / no sun motion / no wind
      const windStart = reduced ? -1 : windRef.current;
      spotsRef.current = drawGarden(canvas, ctx, plantsRef.current, grow, time, windStart, hasHtmlCanvas ? plaqueRef.current : null);
      if (!reduced) raf = requestAnimationFrame(frame); // keep swaying
    };
    raf = requestAnimationFrame(frame);

    // Reduced-motion draws a single static frame, so redraw on resize/rotation.
    const onResize = () => {
      if (reduced) requestAnimationFrame(frame);
    };
    window.addEventListener("resize", onResize);

    // Tap a plant to hear it (speech only on an explicit tap). Spots are stored
    // back-to-front, so we scan from the end to let the nearer plant win a tap.
    const tap = (e: PointerEvent) => {
      const { x, y } = pointerPos(canvas, e);
      const spots = spotsRef.current;
      let hit: Spot | undefined;
      for (let k = spots.length - 1; k >= 0; k--) {
        if (Math.hypot(x - spots[k].x, y - spots[k].y) <= spots[k].r + 14) {
          hit = spots[k];
          break;
        }
      }
      if (!hit) return;
      const p = plantsRef.current[hit.i];
      if (!p) return;
      const cheer =
        p.kind === "tree"
          ? p.maturity >= 1.95
            ? "Foi um desafio difícil — e a tua árvore já está bem grande!"
            : "Foi um desafio difícil — e a tua árvore continua a crescer!"
          : ENCOURAGE[hit.i % ENCOURAGE.length];
      speak(`${p.title}, de ${p.subject}. ${p.stars} ${p.stars === 1 ? "estrela" : "estrelas"}! ${cheer}`);
    };
    canvas.addEventListener("pointerdown", tap);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", tap);
    };
  }, [reduced, hasHtmlCanvas, totalStars, plants.length]);

  // "Regar o jardim" — a celebratory confetti burst + a gust of wind on an
  // explicit tap (never on mount/navigation), with a spoken cheer. The wind only
  // blows when motion is allowed; under reduced-motion we keep the cheer + a
  // calmer confetti and skip the gust.
  const water = () => {
    if (!reduced) windRef.current = clockRef.current; // start a gust at "now"
    setConfetti(false);
    requestAnimationFrame(() => setConfetti(true));
    const gustCheer = reduced ? "" : " Sopra o vento!";
    speak(
      plants.length > 0
        ? `Regaste o jardim!${gustCheer} Tens ${totalStars} ${totalStars === 1 ? "estrela" : "estrelas"}. ${ENCOURAGE[0]}`
        : "Acaba uma lição para nascer a tua primeira flor!",
    );
    window.setTimeout(() => setConfetti(false), 2600);
  };

  const empty = plants.length === 0;

  return (
    <div className="dv-room-screen">
      <div className="dv-toolbar" role="toolbar" aria-label="O teu jardim">
        <button className="dv-tool dv-tool--wide dv-tool--primary" onClick={water}>
          <Icon name="drop" size={20} />
          <span>Regar o jardim</span>
        </button>
        <Speaker
          text={
            empty
              ? "Este é o teu jardim na montanha. Acaba uma lição e nasce a tua primeira flor! Depois, toca numa flor para a ouvires."
              : `O teu jardim tem ${plants.length} ${plants.length === 1 ? "planta" : "plantas"} na encosta. Toca numa flor ou árvore para saberes que lição plantaste.`
          }
          className="dv-tool"
          label="Ouvir sobre o jardim"
          size={22}
        />
      </div>

      {!empty && (
        <div className="dv-garden__stats" aria-label="O que já cresceu no teu jardim">
          <span className="dv-stat">
            <Icon name="flower" size={18} /> {flowers} {flowers === 1 ? "flor" : "flores"}
          </span>
          {trees > 0 && (
            <span className="dv-stat">
              <Icon name="leaf" size={18} /> {trees} {trees === 1 ? "árvore" : "árvores"}
            </span>
          )}
          <span className="dv-stat dv-stat--star">
            <Icon name="star" size={18} /> {totalStars} {totalStars === 1 ? "estrela" : "estrelas"}
          </span>
        </div>
      )}

      <div className="dv-garden">
        <canvas ref={canvasRef} className="dv-canvas dv-canvas--garden" aria-label="O teu jardim na montanha — uma planta por cada lição que acabaste">
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
        {empty
          ? "Cada lição que acabas nasce na encosta — uma flor, ou uma árvore se for difícil."
          : "Toca numa flor ou árvore para ouvires que lição plantaste. Rega para soprar o vento!"}
      </p>

      {!empty && (
        <table className="dv-legend">
          <caption className="dv-legend__caption">O que já plantaste</caption>
          <thead>
            <tr>
              <th scope="col" className="dv-legend__plant">Planta</th>
              <th scope="col">O que fiz</th>
              <th scope="col" className="dv-legend__act">Ouvir / Abrir</th>
            </tr>
          </thead>
          <tbody>
            {legend.map((p) => (
              <tr key={p.id}>
                <td className="dv-legend__plant">
                  <span className="dv-legend__flower" style={{ color: p.color }} aria-hidden="true">
                    <Icon name={p.kind === "tree" ? "leaf" : "flower"} size={26} />
                  </span>
                </td>
                <td>
                  <span className="dv-legend__title">{p.title}</span>
                  <span className="dv-legend__meta">
                    {p.subject} · {p.stars} {p.stars === 1 ? "estrela" : "estrelas"}
                    {p.kind === "tree" && p.maturity < 1.95 ? " · árvore a crescer" : ""}
                  </span>
                </td>
                <td className="dv-legend__act">
                  <Speaker
                    text={`${p.title}, de ${p.subject}. ${p.stars} ${p.stars === 1 ? "estrela" : "estrelas"}.`}
                    className="dv-tool dv-tool--mini"
                    label={`Ouvir sobre ${p.title}`}
                    size={18}
                  />
                  <a
                    className="dv-tool dv-tool--mini"
                    href={viewToHash({ kind: "lesson", year: p.year, subjectId: p.subjectId, lessonId: p.id })}
                    aria-label={`Abrir a lição ${p.title}`}
                  >
                    <Icon name="forward" size={18} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
  windStart: number,
  plaque: HTMLElement | null,
): Spot[] {
  const { w, h } = fitCanvas(canvas, ctx);
  // Read the theme tokens once per frame so the scene matches light/dark mode.
  const skyTop = cssVar(canvas, "--accent-soft", "#dde8fb");
  const skyBottom = cssVar(canvas, "--bg", "#f5f7fa");
  const sunCol = cssVar(canvas, "--warn", "#f0b429");
  const soilCol = cssVar(canvas, "--subj-hgp", "#b06a25");
  const green = cssVar(canvas, "--subj-edm", "#1f9d6b");
  const peakCol = cssVar(canvas, "--accent", "#5b7cfa");
  const dark = luminance(skyBottom) < 0.42; // dark theme reads as dusk: stars + moon

  // How hard the wind is blowing right now: a single gust that rises then fades.
  const age = time - windStart;
  const gust = windStart >= 0 && age >= 0 && age <= GUST_DUR ? Math.sin((Math.PI * age) / GUST_DUR) : 0;

  // Sky
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, skyTop);
  sky.addColorStop(1, skyBottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const hillTop = h * 0.45;
  if (dark) drawStars(ctx, w, hillTop, time);
  if (dark) drawMoon(ctx, w - 56, 58);
  else drawSun(ctx, w - 54, 54, time, sunCol);
  drawClouds(ctx, w, time, dark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.72)");

  // Layered mountain ridges (far, hazy → near, tall and snow-capped), then the
  // grassy hill they sit behind.
  drawMountains(ctx, w, hillTop, h, peakCol, skyTop, dark ? "rgba(226,232,248,0.95)" : "#ffffff");
  drawHill(ctx, w, h, hillTop, green, skyBottom);

  // Plants, laid out across the receding slope and drawn back-to-front.
  const spots: Spot[] = [];
  const layout = computeLayout(w, h, plants.length);
  for (let k = layout.length - 1; k >= 0; k--) {
    const pl = layout[k];
    const p = plants[pl.i];
    const isTree = p.kind === "tree";
    const baseSway = Math.sin(time * 1.4 + pl.i) * (isTree ? 2.5 : 4) * pl.scale;
    const windLean = gust * (12 + Math.sin(time * 7 + pl.i) * 5) * pl.scale * (isTree ? 0.6 : 1);
    const sway = baseSway + windLean;
    const bloom = resolveColor(canvas, p.color);
    const lod = pl.scale < 0.5;
    const spot = isTree
      ? drawTreePlant(ctx, pl.x, pl.y, pl.scale, grow * p.maturity, sway, green, bloom, soilCol, p.stars, p.style, lod)
      : drawFlowerPlant(ctx, pl.x, pl.y, pl.scale, grow, sway, bloom, green, sunCol, soilCol, p.stars, p.style, lod);
    spots.push({ ...spot, i: pl.i });
  }

  drawButterflies(ctx, w, hillTop, time, sunCol, resolveColor(canvas, "var(--joy)"));
  if (gust > 0) drawWindPetals(ctx, w, h, age, gust);

  // Progressive enhancement: draw the live HTML plaque (no-op where unsupported).
  if (plaque) drawHtmlInto(ctx, plaque, w - 150, h - 56);

  return spots;
}

/* Place N plants across the hillside in receding rows: front rows are few, big
 * and spaced; rows up the slope are many, small and dense. Positions are stable
 * (no per-frame jitter) and every plant is placed, however many there are. */
function computeLayout(w: number, h: number, n: number): Placement[] {
  if (n <= 0) return [];
  const frontY = h * 0.95;
  const backY = h * 0.49;
  const rows = Math.min(14, Math.max(1, Math.ceil(Math.sqrt(n * 0.6))));

  // Heavier weight toward the back, so distant rows hold more (small) plants.
  const weights: number[] = [];
  let sumW = 0;
  for (let r = 0; r < rows; r++) {
    const t = rows === 1 ? 0.5 : r / (rows - 1);
    const wr = 1 + 1.9 * t;
    weights.push(wr);
    sumW += wr;
  }
  const counts = weights.map((wr) => Math.floor((n * wr) / sumW));
  let placed = counts.reduce((a, b) => a + b, 0);
  for (let r = rows - 1; placed < n; r = r - 1 < 0 ? rows - 1 : r - 1) {
    counts[r]++;
    placed++;
  }

  const out: Placement[] = [];
  let idx = 0;
  for (let row = 0; row < rows; row++) {
    const m = counts[row];
    if (m <= 0) continue;
    const t = rows === 1 ? 0 : row / (rows - 1);
    const y = frontY - (frontY - backY) * Math.pow(t, 0.9);
    const scale = 1 - 0.7 * t;
    const margin = 18 + scale * 10;
    const step = (w - margin * 2) / m;
    const stagger = (row % 2 ? 0.25 : 0) * step;
    for (let c = 0; c < m; c++) {
      const x = margin + (c + 0.5) * step + stagger + (hash01(idx, 1) - 0.5) * step * 0.4;
      out.push({ i: idx, x, y: y + (hash01(idx, 2) - 0.5) * 10 * scale, scale });
      idx++;
    }
  }
  return out;
}

/* ---- scenery ---- */

function drawSun(ctx: CanvasRenderingContext2D, x: number, y: number, time: number, col: string) {
  const pulse = 1 + Math.sin(time * 1.5) * 0.05;
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.arc(x, y, 46 * pulse, 0, TAU);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.arc(x, y, 24 * pulse, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = col;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU + time * 0.2;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(a) * 30, y + Math.sin(a) * 30);
    ctx.lineTo(x + Math.cos(a) * 40, y + Math.sin(a) * 40);
    ctx.stroke();
  }
}

function drawClouds(ctx: CanvasRenderingContext2D, w: number, time: number, col: string) {
  ctx.save();
  ctx.fillStyle = col; // col carries its own alpha (soft white by day, faint by night)
  const clouds: [number, number, number][] = [
    [0.18, 56, 1],
    [0.6, 86, 0.8],
    [0.88, 44, 0.62],
  ];
  for (const [fx, cy, s] of clouds) {
    const x = ((fx * w + time * 7 * s) % (w + 180)) - 90;
    for (const [dx, dy, r] of [
      [-22, 6, 16],
      [0, 0, 24],
      [24, 6, 18],
      [6, 10, 20],
    ] as [number, number, number][]) {
      ctx.beginPath();
      ctx.arc(x + dx * s, cy + dy * s, r * s, 0, TAU);
      ctx.fill();
    }
  }
  ctx.restore();
}

/* Three mountain ranges receding into the distance. Each range is a cluster of
 * individually-shaded peaks (a sunlit face and a shadow face give them volume);
 * far ranges are hazier (mixed toward the sky), shorter and set higher, nearer
 * ranges are taller, darker and snow-capped. Peak sizes/positions are hashed, so
 * the skyline is irregular but stable frame to frame. */
function drawMountains(ctx: CanvasRenderingContext2D, w: number, hillTop: number, h: number, peakCol: string, skyCol: string, snowCol: string) {
  const ranges = [
    { base: mix(peakCol, skyCol, 0.62), baseY: hillTop - h * 0.015, maxH: h * 0.17, count: 7, seed: 2, alpha: 0.7, snowAt: 9 },
    { base: mix(peakCol, skyCol, 0.28), baseY: hillTop + h * 0.006, maxH: h * 0.24, count: 5, seed: 8, alpha: 0.9, snowAt: 0.92 },
    { base: peakCol, baseY: hillTop + h * 0.03, maxH: h * 0.32, count: 3, seed: 15, alpha: 0.98, snowAt: 0.82 },
  ];
  for (const rg of ranges) {
    ctx.save();
    ctx.globalAlpha = rg.alpha;
    const slot = w / rg.count;
    for (let i = 0; i < rg.count; i++) {
      const cx = slot * (i + 0.5) + (hash01(i, rg.seed) - 0.5) * slot * 0.55;
      const halfW = slot * (0.66 + hash01(i, rg.seed + 11) * 0.5);
      const hf = 0.55 + hash01(i, rg.seed + 23) * 0.7;
      drawMountain(ctx, cx, rg.baseY, halfW, rg.maxH * hf, rg.base, snowCol, hf >= rg.snowAt);
    }
    ctx.restore();
  }
}

function drawMountain(ctx: CanvasRenderingContext2D, peakX: number, baseY: number, halfW: number, height: number, base: string, snowCol: string, snow: boolean) {
  const lx = peakX - halfW;
  const rx = peakX + halfW;
  const py = baseY - height;
  // body
  ctx.fillStyle = base;
  ctx.beginPath();
  ctx.moveTo(lx, baseY);
  ctx.lineTo(peakX, py);
  ctx.lineTo(rx, baseY);
  ctx.closePath();
  ctx.fill();
  // sunlit left face + shadowed right face → the peak gets volume
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.moveTo(lx, baseY);
  ctx.lineTo(peakX, py);
  ctx.lineTo(peakX, baseY);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.moveTo(peakX, baseY);
  ctx.lineTo(peakX, py);
  ctx.lineTo(rx, baseY);
  ctx.closePath();
  ctx.fill();
  if (snow) {
    const snowH = height * 0.3;
    const ly = py + snowH;
    const sw = (halfW * snowH) / height; // mountain half-width at the snow line
    ctx.fillStyle = snowCol;
    ctx.beginPath();
    ctx.moveTo(peakX - sw, ly);
    ctx.lineTo(peakX, py);
    ctx.lineTo(peakX + sw, ly);
    // a little jagged lower snow edge
    ctx.lineTo(peakX + sw * 0.4, ly - snowH * 0.22);
    ctx.lineTo(peakX, ly + snowH * 0.18);
    ctx.lineTo(peakX - sw * 0.4, ly - snowH * 0.22);
    ctx.closePath();
    ctx.fill();
  }
}

/* A scatter of twinkling stars in the night (dark-theme) sky, behind the
 * mountains. Positions are hashed (stable); brightness gently pulses. */
function drawStars(ctx: CanvasRenderingContext2D, w: number, hillTop: number, time: number) {
  ctx.save();
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 46; i++) {
    ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(time * 1.6 + i));
    ctx.beginPath();
    ctx.arc(hash01(i, 3) * w, hash01(i, 4) * hillTop * 0.92, 0.6 + hash01(i, 5) * 1.1, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

/* A pale moon for the night (dark-theme) sky — sits where the sun would, with a
 * soft glow and a few craters, but no rays. */
function drawMoon(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#cfd8ff";
  ctx.beginPath();
  ctx.arc(x, y, 44, 0, TAU);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#eef1ff";
  ctx.beginPath();
  ctx.arc(x, y, 22, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "rgba(150,160,200,0.35)";
  for (const [dx, dy, r] of [
    [-6, -4, 4],
    [7, 3, 5],
    [2, 9, 3],
  ] as [number, number, number][]) {
    ctx.beginPath();
    ctx.arc(x + dx, y + dy, r, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

/* ---- tiny colour utilities (for theming the mountains/sky) ---- */

function parseColor(col: string): [number, number, number] {
  const c = col.trim();
  if (c[0] === "#") {
    const hx = c.slice(1);
    if (hx.length === 3) return [parseInt(hx[0] + hx[0], 16), parseInt(hx[1] + hx[1], 16), parseInt(hx[2] + hx[2], 16)];
    return [parseInt(hx.slice(0, 2), 16), parseInt(hx.slice(2, 4), 16), parseInt(hx.slice(4, 6), 16)];
  }
  const m = c.match(/[\d.]+/g);
  return m && m.length >= 3 ? [+m[0], +m[1], +m[2]] : [128, 128, 128];
}

function luminance(col: string): number {
  const [r, g, b] = parseColor(col);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function mix(a: string, b: string, t: number): string {
  const ca = parseColor(a);
  const cb = parseColor(b);
  return `rgb(${Math.round(ca[0] + (cb[0] - ca[0]) * t)}, ${Math.round(ca[1] + (cb[1] - ca[1]) * t)}, ${Math.round(ca[2] + (cb[2] - ca[2]) * t)})`;
}

function drawHill(ctx: CanvasRenderingContext2D, w: number, h: number, hillTop: number, green: string, haze: string) {
  ctx.fillStyle = green;
  ctx.beginPath();
  ctx.moveTo(0, hillTop + 14);
  ctx.quadraticCurveTo(w * 0.5, hillTop - 14, w, hillTop + 14);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();
  // atmospheric haze: fade the far (top) of the hill toward the sky for depth
  const g = ctx.createLinearGradient(0, hillTop, 0, hillTop + h * 0.22);
  g.addColorStop(0, haze);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = g;
  ctx.fillRect(0, hillTop - 14, w, h * 0.24);
  ctx.restore();
}

function drawButterflies(ctx: CanvasRenderingContext2D, w: number, hillTop: number, time: number, c1: string, c2: string) {
  const flap = 0.35 + Math.abs(Math.sin(time * 12)) * 0.65; // wings open/close
  const fly = (phase: number, color: string) => {
    const x = w * 0.5 + Math.sin(time * 0.6 + phase) * w * 0.32;
    const y = hillTop * 0.6 + Math.sin(time * 1.5 + phase * 2) * 26;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    for (const dir of [-1, 1]) {
      ctx.beginPath();
      ctx.ellipse(dir * 6 * flap, -2, 6 * flap, 8, 0, 0, TAU);
      ctx.ellipse(dir * 5 * flap, 6, 5 * flap, 6, 0, 0, TAU);
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(40,30,20,0.7)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(0, 8);
    ctx.stroke();
    ctx.restore();
  };
  fly(0, c1);
  fly(2.4, c2);
}

/* Petals blown across the slope during a watering gust — they sweep in from the
 * left and fade with the gust, so the wind reads as wind. */
function drawWindPetals(ctx: CanvasRenderingContext2D, w: number, h: number, age: number, gust: number) {
  const n = 14;
  for (let i = 0; i < n; i++) {
    const lane = i / n;
    const progress = (age / GUST_DUR) * (1 + lane * 0.7);
    if (progress > 1.1) continue;
    const x = -50 + progress * (w + 100);
    const y = 30 + lane * (h - 70) + Math.sin(age * 5 + i) * 14;
    const a = gust * (0.35 + 0.5 * Math.sin(Math.PI * Math.min(1, progress)));
    const col = i % 3 === 0 ? "rgba(31,157,107,0.9)" : i % 3 === 1 ? "rgba(255,122,89,0.9)" : "rgba(255,255,255,0.9)";
    ctx.save();
    ctx.globalAlpha = Math.max(0, a);
    ctx.translate(x, y);
    ctx.rotate(age * 4 + i);
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 3.4, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
}

/* ---- plants ---- */

function drawFlowerPlant(
  ctx: CanvasRenderingContext2D,
  x: number,
  baseY: number,
  scale: number,
  grow: number,
  sway: number,
  bloom: string,
  green: string,
  sunCol: string,
  soilCol: string,
  stars: number,
  style: number,
  lod: boolean,
): Spot {
  const stemH = 80 * scale * grow;
  const topX = x + sway;
  const topY = baseY - stemH;
  const r = (12 + Math.max(1, stars) * 2) * scale * Math.max(0.2, grow); // bigger bloom for more stars
  // Some blooms have a yellow heart, some a dark seed head — extra variety.
  const centerCol = style === 0 || style === 4 || style === 6 ? soilCol : sunCol;

  groundShadow(ctx, x, baseY, 14 * scale * grow);

  ctx.strokeStyle = green;
  ctx.lineWidth = (lod ? 2.5 : 4) * scale;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, baseY);
  ctx.quadraticCurveTo(x + sway * 0.5, baseY - stemH * 0.5, topX, topY);
  ctx.stroke();

  if (lod) {
    drawSimpleBloom(ctx, topX, topY, r, bloom, centerCol);
    return { x: topX, y: topY, r: r * 1.7, i: 0 };
  }

  if (grow > 0.4) {
    leaf(ctx, x + sway * 0.4, baseY - stemH * 0.45, 16 * scale, -1, green);
    leaf(ctx, x + sway * 0.6, baseY - stemH * 0.62, 14 * scale, 1, green);
  }
  drawFlower(ctx, topX, topY, r, style, bloom, centerCol);
  return { x: topX, y: topY, r: r * 1.7, i: 0 };
}

/* The seven bloom shapes. Each lesson maps to one (see styleFor), so the slope is
 * varied and a lesson always blooms the same way. */
function drawFlower(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, style: number, bloom: string, centerCol: string) {
  switch (style) {
    case 1: // tulipa — three petals fanning up into a cup
      for (const off of [-0.55, 0, 0.55]) petal(ctx, cx, cy, r * 1.35, r * 0.5, -Math.PI / 2 + off, bloom);
      dot(ctx, cx, cy - r * 0.2, r * 0.28, centerCol);
      break;
    case 2: // botão-de-ouro — six round petals
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * TAU;
        dot(ctx, cx + Math.cos(a) * r * 0.82, cy + Math.sin(a) * r * 0.82, r * 0.56, bloom);
      }
      dot(ctx, cx, cy, r * 0.54, centerCol);
      break;
    case 3: // estrela — six thin pointed petals
      for (let k = 0; k < 6; k++) petal(ctx, cx, cy, r * 1.55, r * 0.2, (k / 6) * TAU, bloom);
      dot(ctx, cx, cy, r * 0.5, centerCol);
      break;
    case 4: // dália — two offset rings of petals
      for (let k = 0; k < 8; k++) petal(ctx, cx, cy, r * 1.3, r * 0.34, (k / 8) * TAU, bloom);
      for (let k = 0; k < 8; k++) petal(ctx, cx, cy, r * 0.85, r * 0.3, (k / 8) * TAU + Math.PI / 8, bloom);
      dot(ctx, cx, cy, r * 0.45, centerCol);
      break;
    case 5: // papoila — four wide rounded petals
      for (let k = 0; k < 4; k++) petal(ctx, cx, cy, r * 1.25, r * 0.7, (k / 4) * TAU + Math.PI / 4, bloom);
      dot(ctx, cx, cy, r * 0.42, centerCol);
      break;
    case 6: // cosmos — eight flat thin petals
      for (let k = 0; k < 8; k++) petal(ctx, cx, cy, r * 1.2, r * 0.28, (k / 8) * TAU, bloom);
      dot(ctx, cx, cy, r * 0.5, centerCol);
      break;
    default: // margarida — many thin petals
      for (let k = 0; k < 11; k++) petal(ctx, cx, cy, r * 1.3, r * 0.32, (k / 11) * TAU, bloom);
      dot(ctx, cx, cy, r * 0.52, centerCol);
  }
}

function drawSimpleBloom(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, bloom: string, centerCol: string) {
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * TAU;
    dot(ctx, cx + Math.cos(a) * r * 0.78, cy + Math.sin(a) * r * 0.78, r * 0.52, bloom);
  }
  dot(ctx, cx, cy, r * 0.5, centerCol);
}

function drawTreePlant(
  ctx: CanvasRenderingContext2D,
  x: number,
  baseY: number,
  scale: number,
  growth: number, // sprout-in × maturity: 0→1 on open, then up to ×2 as the tree ages
  sway: number,
  leafCol: string,
  accent: string,
  bark: string,
  stars: number,
  style: number,
  lod: boolean,
): Spot {
  const trunkH = 80 * scale * growth; // trees stand a little taller than the flowers
  const topX = x + sway;
  const crownY = baseY - trunkH;
  const cr = (30 + Math.max(0, stars) * 2) * scale * Math.max(0.3, growth); // bigger crown for more stars

  groundShadow(ctx, x, baseY, 20 * scale * Math.max(0.3, growth));

  if (lod) {
    ctx.fillStyle = bark;
    ctx.fillRect(x - 2 * scale, crownY, 4 * scale, trunkH);
    if (style === 1) {
      // a tiny conifer triangle
      ctx.fillStyle = leafCol;
      tri(ctx, topX, crownY - cr, cr * 0.8, cr * 1.6);
    } else {
      dot(ctx, topX, crownY - cr * 0.2, cr * 0.8, leafCol);
    }
    return { x: topX, y: crownY - cr * 0.3, r: cr, i: 0 };
  }

  // tapered trunk leaning with the wind (shared by all crowns)
  const tw = 7 * scale;
  ctx.fillStyle = bark;
  ctx.beginPath();
  ctx.moveTo(x - tw, baseY);
  ctx.lineTo(x + tw, baseY);
  ctx.quadraticCurveTo(x + sway * 0.5 + tw * 0.4, crownY + trunkH * 0.4, topX + tw * 0.4, crownY);
  ctx.lineTo(topX - tw * 0.4, crownY);
  ctx.quadraticCurveTo(x + sway * 0.5 - tw * 0.4, crownY + trunkH * 0.4, x - tw, baseY);
  ctx.fill();

  let spotY = crownY;
  let spotR = cr * 1.1;
  if (style === 1) {
    // pinheiro — three stacked conifer tiers
    ctx.fillStyle = leafCol;
    for (let t = 0; t < 3; t++) {
      const ty = crownY + cr * 0.5 - t * cr * 0.7;
      tri(ctx, topX, ty - cr * 1.1, cr * (1 - t * 0.18), cr * 1.3);
    }
    fruit(ctx, topX, crownY - cr * 0.3, cr * 0.6, stars, accent, scale);
    spotY = crownY - cr * 0.4;
    spotR = cr * 1.2;
  } else if (style === 2) {
    // cipreste — a tall, narrow flame of foliage
    ctx.fillStyle = leafCol;
    ctx.beginPath();
    ctx.ellipse(topX, crownY - cr * 0.6, cr * 0.55, cr * 1.5, 0, 0, TAU);
    ctx.fill();
    fruit(ctx, topX, crownY - cr * 0.6, cr * 0.4, stars, accent, scale);
    spotY = crownY - cr * 0.6;
    spotR = cr * 1.4;
  } else {
    // árvore redonda — a cluster of leafy blobs
    ctx.fillStyle = leafCol;
    for (const [dx, dy, rr] of [
      [0, -cr * 0.2, 0.7],
      [-cr * 0.55, cr * 0.1, 0.55],
      [cr * 0.55, cr * 0.1, 0.55],
      [-cr * 0.2, cr * 0.45, 0.5],
      [cr * 0.25, cr * 0.4, 0.5],
    ] as [number, number, number][]) {
      dot(ctx, topX + dx, crownY + dy, cr * rr, leafCol);
    }
    fruit(ctx, topX, crownY, cr * 0.5, stars, accent, scale);
  }

  return { x: topX, y: spotY, r: spotR, i: 0 };
}

/* Blossoms / fruit in the subject colour — one per star, so a hard, well-done
 * lesson is a tree heavy with fruit. */
function fruit(ctx: CanvasRenderingContext2D, cx: number, cy: number, spread: number, stars: number, accent: string, scale: number) {
  const n = Math.min(7, Math.max(1, stars));
  for (let k = 0; k < n; k++) {
    const a = (k / n) * TAU + k;
    dot(ctx, cx + Math.cos(a) * spread, cy + Math.sin(a) * spread, 4 * scale, accent);
  }
}

/* ---- small drawing helpers ---- */

// A petal pointing along `angle`: pinched at (cx,cy), rounded toward the tip.
function petal(ctx: CanvasRenderingContext2D, cx: number, cy: number, len: number, wid: number, angle: number, color: string) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(len * 0.55, -wid, len, 0);
  ctx.quadraticCurveTo(len * 0.55, wid, 0, 0);
  ctx.fill();
  ctx.restore();
}

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();
}

// An upward isosceles triangle with its apex at (cx, cy).
function tri(ctx: CanvasRenderingContext2D, cx: number, cy: number, halfW: number, height: number) {
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx - halfW, cy + height);
  ctx.lineTo(cx + halfW, cy + height);
  ctx.closePath();
  ctx.fill();
}

function groundShadow(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number) {
  ctx.save();
  ctx.fillStyle = "rgba(20,30,20,0.16)";
  ctx.beginPath();
  ctx.ellipse(x, y + 3, rx, rx * 0.28, 0, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function leaf(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, dir: number, color: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(dir * 0.5);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(dir * size * 0.6, 0, size, size * 0.5, 0, 0, TAU);
  ctx.fill();
  ctx.restore();
}

/* Subject colours are stored as "var(--subj-…)" references (so they theme with
 * the page). Canvas needs a real colour, so resolve the custom property; fall
 * back to the playful --joy if the value isn't a var(). */
function resolveColor(el: Element, c: string): string {
  const m = /var\((--[\w-]+)\)/.exec(c);
  return m ? cssVar(el, m[1], cssVar(el, "--joy", "#ff7a59")) : c || cssVar(el, "--joy", "#ff7a59");
}
