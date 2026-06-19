import { useEffect, useRef, useState } from "react";
import { ArcRotateCamera, Color3, Color4, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector3, VertexBuffer, VertexData } from "@babylonjs/core";
import { Icon } from "@sprout/icons";
import { Confetti, Speaker } from "@sprout/ui";
import { prefersReducedMotion } from "./canvas";

/* Afterimage Garden — a small WebGL perception game in the spirit of Monet's
 * Giverny, rendered with "diet splats": hundreds of soft, camera-facing colour
 * dabs (not true Gaussian splats) so it stays light enough for an iPad. The
 * world is always there as a painterly haze; three hidden MEMORIES (a Japanese
 * bridge, a rose arch, a water lily) resolve only when the player rotates to the
 * right angle and holds "Focar" to let the dabs settle into shape. */

type MemoryId = "ponte" | "arco" | "nenufar";
type RGB = { r: number; g: number; b: number };
type XYZ = { x: number; y: number; z: number };

// anim kinds for ambient dabs (memory dabs ignore this and lerp scattered→target)
const STATIC = 0;
const SWAY = 1; // foliage breathing in a breeze
const BOB = 2; // lily pads riding the water
const RISE = 3; // light motes floating up and fading
const SHIMMER = 4; // reflections smeared on the water
const DRIFT = 5; // slow sky wash

interface Memory {
  id: MemoryId;
  label: string;
  hint: string;
  angle: number; // camera.alpha where the shape lines up
  count: number;
  palette: RGB[];
  makeTarget: (i: number, count: number) => XYZ;
}

interface Splat {
  memory: number; // -1 for ambient world dabs
  anim: number;
  hx: number; hy: number; hz: number; // home / resting position (ambient)
  scx: number; scy: number; scz: number; // scattered cloud (memory)
  tgx: number; tgy: number; tgz: number; // formation target (memory)
  sx: number; sy: number; // dab half-extents (elongated = brushstroke)
  rot: number; // dab orientation in screen space
  r: number; g: number; b: number; a: number;
  seed: number;
  drift: number;
}

interface HudState {
  started: boolean;
  active: number;
  solved: boolean[];
  clarity: number;
  alignment: number;
}

const TAU = Math.PI * 2;
const WATER_Y = 0.04;
const START_TEXT =
  "Afterimage Garden é um pequeno jardim em WebGL, à maneira de Monet, feito de diet splats: manchas de cor leves que correm bem no iPad. Roda a vista até as cores se juntarem numa memória — a ponte, o arco ou o nenúfar — e mantém Focar para a tornares nítida.";

const MEMORIES: Memory[] = [
  {
    id: "ponte",
    label: "Ponte",
    hint: "Procura a ponte japonesa, curvada sobre a água.",
    angle: -0.62,
    count: 168,
    // teal-green arch with hanging wisteria (violet) and warm reflections
    palette: [
      { r: 0.36, g: 0.62, b: 0.46 },
      { r: 0.28, g: 0.54, b: 0.52 },
      { r: 0.46, g: 0.7, b: 0.5 },
      { r: 0.58, g: 0.5, b: 0.82 },
      { r: 0.7, g: 0.62, b: 0.9 },
    ],
    makeTarget: (i, count) => {
      const t = i / Math.max(1, count - 1);
      if (i % 7 === 0) {
        // wisteria strands hanging from the arch
        const a = Math.floor(i / 7) / Math.max(1, Math.floor(count / 7) - 1);
        const x = (a - 0.5) * 5.2;
        return { x, y: 1.7 - hash01(i, 21) * 1.4, z: 0.34 + (hash01(i, 22) - 0.5) * 0.3 };
      }
      const x = (t - 0.5) * 6.2;
      const y = 0.78 + Math.sin(t * Math.PI) * 1.2 + (hash01(i, 2) - 0.5) * 0.16;
      const z = 0.34 + (hash01(i, 3) - 0.5) * 0.34;
      return { x, y, z };
    },
  },
  {
    id: "arco",
    label: "Arco",
    hint: "Lá ao fundo há um arco de rosas escondido.",
    angle: 0.48,
    count: 150,
    palette: [
      { r: 0.96, g: 0.6, b: 0.66 },
      { r: 0.99, g: 0.78, b: 0.8 },
      { r: 0.99, g: 0.92, b: 0.86 },
      { r: 0.45, g: 0.66, b: 0.42 },
      { r: 0.95, g: 0.84, b: 0.5 },
    ],
    makeTarget: (i, count) => {
      const t = i / Math.max(1, count - 1);
      const side = i % 3;
      const local = t * 2 - 1;
      if (side === 0) return { x: -1.4 + (hash01(i, 5) - 0.5) * 0.22, y: 0.3 + t * 2.3, z: -2.6 };
      if (side === 1) return { x: 1.4 + (hash01(i, 6) - 0.5) * 0.22, y: 0.3 + t * 2.3, z: -2.6 };
      return { x: local * 1.36, y: 2.62 + Math.sin((t + 0.12) * Math.PI) * 0.4, z: -2.6 };
    },
  },
  {
    id: "nenufar",
    label: "Nenúfar",
    hint: "Na água, um grande nenúfar quer abrir.",
    angle: -1.42,
    count: 182,
    palette: [
      { r: 0.98, g: 0.66, b: 0.78 },
      { r: 0.99, g: 0.82, b: 0.88 },
      { r: 0.99, g: 0.96, b: 0.96 },
      { r: 1.0, g: 0.84, b: 0.42 },
      { r: 0.4, g: 0.62, b: 0.46 },
    ],
    makeTarget: (i, _count) => {
      const petal = i % 6;
      const a = (petal / 6) * TAU + (hash01(i, 7) - 0.5) * 0.34;
      const r = 0.22 + Math.pow(hash01(i, 8), 0.55) * 1.6;
      const squash = 0.5 + (petal % 2) * 0.12;
      // sits low, floating on the pond
      return { x: 0.3 + Math.cos(a) * r, y: 0.42 + Math.abs(Math.sin(a)) * r * squash * 0.5, z: 0.7 + Math.sin(a) * r * 0.7 };
    },
  },
];

export function AfterimageGarden() {
  const reduced = prefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<AfterimageGame | null>(null);
  const focusRef = useRef(false);
  const [hud, setHud] = useState<HudState>({ started: false, active: 0, solved: [false, false, false], clarity: 0, alignment: 0 });
  const [focus, setFocus] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = new AfterimageGame(canvas, {
      reduced,
      isFocusing: () => focusRef.current,
      onState: (next) => {
        setHud(next);
        if (next.solved.every(Boolean)) {
          setCelebrate(true);
          window.setTimeout(() => setCelebrate(false), 2600);
        }
      },
    });
    gameRef.current = game;

    const onResize = () => game.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      game.dispose();
      gameRef.current = null;
    };
  }, [reduced]);

  const begin = () => {
    gameRef.current?.begin();
    setHud((h) => ({ ...h, started: true }));
  };
  const reset = () => {
    setCelebrate(false);
    gameRef.current?.reset();
  };
  const focusDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    focusRef.current = true;
    setFocus(true);
  };
  const focusUp = () => {
    focusRef.current = false;
    setFocus(false);
  };

  const active = MEMORIES[hud.active] ?? MEMORIES[MEMORIES.length - 1];
  const solvedCount = hud.solved.filter(Boolean).length;
  const finished = solvedCount === MEMORIES.length;
  const say = finished
    ? "Conseguiste! As três memórias acordaram e o jardim ficou nítido."
    : `${active.hint} Roda a vista até o alinhamento subir, depois mantém Focar.`;

  return (
    <div className="dv-room-screen ag-room">
      <div className="dv-toolbar ag-toolbar" role="toolbar" aria-label="Afterimage Garden">
        <button className={`dv-tool dv-tool--wide ag-focus ${focus ? "is-active" : ""}`} onPointerDown={focusDown} onPointerUp={focusUp} onPointerCancel={focusUp} onPointerLeave={focusUp}>
          <Icon name="search" size={20} />
          <span>Focar</span>
        </button>
        <button className="dv-tool" onClick={reset} aria-label="Recomeçar" title="Recomeçar">
          <Icon name="refresh" size={20} />
        </button>
        <Speaker text={say} className="dv-tool" label="Ouvir o objetivo" size={22} />
        <div className="ag-readout" aria-live="polite">
          <span>{finished ? "Jardim restaurado" : active.hint}</span>
          <strong>{Math.round(hud.clarity * 100)}%</strong>
        </div>
      </div>

      <div className="dv-arcade ag-stage">
        <canvas ref={canvasRef} className="dv-canvas ag-canvas" aria-label="Afterimage Garden — roda a vista e foca os splats para restaurar memórias" />

        {!hud.started && (
          <div className="dv-overlay ag-start">
            <h3 className="dv-overlay__title">Afterimage Garden</h3>
            <p className="dv-overlay__sub">{START_TEXT}</p>
            <button className="dv-tool dv-tool--wide" onClick={begin}>
              <Icon name="forward" size={20} />
              <span>Começar</span>
            </button>
          </div>
        )}

        {finished && hud.started && (
          <div className="ag-complete" role="status">
            <Icon name="sparkle" size={18} />
            As memórias acordaram.
          </div>
        )}
      </div>

      <div className="ag-progress" aria-label="Memórias restauradas">
        {MEMORIES.map((m, i) => (
          <span key={m.id} className={`ag-mark ${hud.solved[i] ? "is-solved" : i === hud.active ? "is-active" : ""}`}>
            {m.label}
          </span>
        ))}
      </div>

      {celebrate && <Confetti pieces={reduced ? 18 : 70} />}
    </div>
  );
}

class AfterimageGame {
  private engine: Engine;
  private scene: Scene;
  private camera: ArcRotateCamera;
  private splatMesh: Mesh;
  private splats: Splat[];
  private positions: Float32Array;
  private colors: Float32Array;
  private hud: HudState = { started: false, active: 0, solved: [false, false, false], clarity: 0, alignment: 0 };
  private lastSolved = -1;
  private frameObserver: ReturnType<Scene["onBeforeRenderObservable"]["add"]> | null = null;

  // reusable scratch corners (rotated per splat, then billboarded)
  private static readonly CORNERS = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];

  constructor(
    canvas: HTMLCanvasElement,
    private opts: { reduced: boolean; isFocusing: () => boolean; onState: (hud: HudState) => void },
  ) {
    this.engine = new Engine(canvas, true, { preserveDrawingBuffer: false, stencil: false, antialias: true }, true);
    this.engine.setHardwareScalingLevel(1 / Math.max(1, Math.min(window.devicePixelRatio || 1, 1.5)));
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.07, 0.12, 0.16, 1); // Monet twilight teal

    this.camera = new ArcRotateCamera("afterimage-camera", -1.05, 1.2, 9.2, new Vector3(0, 1.0, -0.3), this.scene);
    this.camera.attachControl(canvas, true);
    this.camera.lowerRadiusLimit = 6.2;
    this.camera.upperRadiusLimit = 12;
    this.camera.lowerBetaLimit = 0.9;
    this.camera.upperBetaLimit = 1.5;
    this.camera.wheelPrecision = 60;
    this.camera.pinchPrecision = 90;
    this.camera.inertia = 0.74;

    new HemisphericLight("garden-light", new Vector3(-0.3, 1, 0.45), this.scene).intensity = 0.95;
    this.buildWorld();
    this.splats = makeSplats();
    this.positions = new Float32Array(this.splats.length * 12);
    this.colors = new Float32Array(this.splats.length * 16);
    this.splatMesh = this.buildSplats(this.splats);
    this.writeFrame();

    this.frameObserver = this.scene.onBeforeRenderObservable.add(() => this.tick());
    this.engine.runRenderLoop(() => this.scene.render());
    this.resize();
    this.opts.onState(this.hud);
  }

  begin() {
    this.hud.started = true;
    this.opts.onState({ ...this.hud, solved: [...this.hud.solved] });
  }

  reset() {
    this.hud = { started: true, active: 0, solved: [false, false, false], clarity: 0, alignment: 0 };
    this.lastSolved = -1;
    this.camera.alpha = -1.05;
    this.camera.beta = 1.2;
    this.camera.radius = 9.2;
    this.opts.onState({ ...this.hud, solved: [...this.hud.solved] });
  }

  resize() {
    this.engine.resize();
  }

  dispose() {
    if (this.frameObserver) this.scene.onBeforeRenderObservable.remove(this.frameObserver);
    this.scene.dispose();
    this.engine.dispose();
  }

  private buildWorld() {
    const ground = MeshBuilder.CreateGround("afterimage-ground", { width: 12, height: 9, subdivisions: 2 }, this.scene);
    ground.position.z = -0.4;
    const groundMat = new StandardMaterial("afterimage-ground-mat", this.scene);
    groundMat.diffuseColor = new Color3(0.2, 0.31, 0.21);
    groundMat.specularColor = Color3.Black();
    ground.material = groundMat;
    ground.freezeWorldMatrix();

    const water = MeshBuilder.CreateGround("afterimage-water", { width: 7.8, height: 3.4 }, this.scene);
    water.position.y = WATER_Y;
    water.position.z = 0.5;
    const waterMat = new StandardMaterial("afterimage-water-mat", this.scene);
    waterMat.diffuseColor = new Color3(0.1, 0.4, 0.48);
    waterMat.alpha = 0.55;
    waterMat.specularColor = new Color3(0.4, 0.6, 0.64);
    water.material = waterMat;
    water.freezeWorldMatrix();
  }

  private buildSplats(splats: Splat[]) {
    const indices = new Array<number>(splats.length * 6);
    const uvs = new Float32Array(splats.length * 8);
    splats.forEach((_s, i) => {
      const base = i * 4;
      const ui = i * 8;
      AfterimageGame.CORNERS.forEach(([u, v], c) => {
        uvs[ui + c * 2] = (u + 1) / 2;
        uvs[ui + c * 2 + 1] = (v + 1) / 2;
      });
      const ii = i * 6;
      indices[ii] = base;
      indices[ii + 1] = base + 1;
      indices[ii + 2] = base + 2;
      indices[ii + 3] = base;
      indices[ii + 4] = base + 2;
      indices[ii + 5] = base + 3;
    });

    const mesh = new Mesh("afterimage-splats", this.scene);
    const vd = new VertexData();
    vd.positions = this.positions;
    vd.indices = indices;
    vd.uvs = uvs;
    vd.colors = this.colors;
    vd.applyToMesh(mesh, true);

    // Unlit, vertex-coloured soft dabs. disableLighting makes the shader use the
    // vertex colour directly (no normals needed) — so each dab shows its real
    // colour instead of washing out to grey under a flat emissive.
    const mat = new StandardMaterial("afterimage-splat-mat", this.scene);
    mat.diffuseTexture = makeSplatTexture(this.scene);
    mat.useAlphaFromDiffuseTexture = true;
    mat.diffuseColor = Color3.White();
    mat.emissiveColor = Color3.Black();
    mat.specularColor = Color3.Black();
    mat.disableLighting = true;
    mat.backFaceCulling = false;
    mat.transparencyMode = 2; // ALPHABLEND
    mat.alpha = 1;
    mesh.material = mat;
    mesh.hasVertexAlpha = true;
    mesh.isPickable = false;
    mesh.alwaysSelectAsActiveMesh = true;
    mesh.freezeWorldMatrix();
    return mesh;
  }

  private tick() {
    if (this.hud.started) {
      const memory = MEMORIES[this.hud.active] ?? MEMORIES[MEMORIES.length - 1];
      const diff = angleDelta(this.camera.alpha, memory.angle);
      const alignment = Math.max(0, 1 - diff / 0.72);
      const focus = this.opts.isFocusing();
      const dt = Math.min(0.045, this.engine.getDeltaTime() / 1000);
      const target = focus && alignment > 0.55 ? 1 : Math.max(0, alignment * 0.48 - 0.05);
      const speed = focus && alignment > 0.55 ? 0.78 : 0.38;
      this.hud.clarity += (target - this.hud.clarity) * Math.min(1, dt * speed * 4.2);
      this.hud.alignment += (alignment - this.hud.alignment) * Math.min(1, dt * 8);

      if (this.hud.clarity > 0.96 && !this.hud.solved[this.hud.active]) {
        this.hud.solved[this.hud.active] = true;
        this.lastSolved = this.hud.active;
        this.hud.active = Math.min(MEMORIES.length - 1, this.hud.active + 1);
        this.hud.clarity = 0;
      }
      this.opts.onState({ ...this.hud, solved: [...this.hud.solved] });
    }
    this.writeFrame();
  }

  private clarityFor(memory: number): number {
    if (this.hud.solved[memory]) return 1;
    if (memory === this.hud.active) return this.hud.clarity;
    if (memory === this.lastSolved) return 0.9;
    return 0.06; // a faint hint-cloud for not-yet-found memories
  }

  private writeFrame() {
    const view = this.camera.getViewMatrix();
    const m = view.m;
    const rx = m[0], ry = m[4], rz = m[8]; // camera right
    const ux = m[1], uy = m[5], uz = m[9]; // camera up
    const time = performance.now() / 1000;
    const moving = !this.opts.reduced;
    let p = 0;
    let c = 0;

    for (const s of this.splats) {
      let cx: number, cy: number, cz: number, alpha: number, scale: number;

      if (s.memory >= 0) {
        const e = easeOutCubic(clamp01(this.clarityFor(s.memory)));
        cx = lerp(s.scx, s.tgx, e);
        cy = lerp(s.scy, s.tgy, e) + (moving ? Math.sin(time * 0.8 + s.seed * 11) * 0.035 : 0);
        cz = lerp(s.scz, s.tgz, e);
        alpha = s.a * (0.12 + 0.88 * e);
        scale = 0.7 + 0.45 * e;
      } else {
        cx = s.hx; cy = s.hy; cz = s.hz; alpha = s.a; scale = 1;
        if (moving) {
          switch (s.anim) {
            case DRIFT:
              cx += Math.sin(time * 0.04 + s.seed * 7) * 0.7 * s.drift;
              cy += Math.sin(time * 0.05 + s.seed * 3) * 0.18 * s.drift;
              break;
            case SWAY:
              cx += Math.sin(time * 0.7 + s.seed * 9) * 0.07 * s.drift;
              cy += Math.sin(time * 0.95 + s.seed * 5) * 0.045 * s.drift;
              break;
            case BOB:
              cy += Math.sin(time * 1.1 + s.seed * 6) * 0.03 * s.drift;
              cx += Math.sin(time * 0.6 + s.seed * 4) * 0.03 * s.drift;
              break;
            case SHIMMER:
              cx += Math.sin(time * 1.3 + s.seed * 8) * 0.06 * s.drift;
              break;
            case RISE: {
              const ph = (time * 0.07 * s.drift + s.seed) % 1;
              cy += ph * 2.6;
              cx += Math.sin(time * 0.5 + s.seed * 12) * 0.14;
              alpha = s.a * Math.sin(ph * Math.PI);
              break;
            }
          }
        }
      }

      const cos = Math.cos(s.rot);
      const sin = Math.sin(s.rot);
      const sx = s.sx * scale;
      const sy = s.sy * scale;
      for (const [qx, qy] of AfterimageGame.CORNERS) {
        // rotate the dab in screen space, then place it on the camera-facing plane
        const ox = qx * sx;
        const oy = qy * sy;
        const dx = ox * cos - oy * sin;
        const dy = ox * sin + oy * cos;
        this.positions[p++] = cx + rx * dx + ux * dy;
        this.positions[p++] = cy + ry * dx + uy * dy;
        this.positions[p++] = cz + rz * dx + uz * dy;
        this.colors[c++] = s.r;
        this.colors[c++] = s.g;
        this.colors[c++] = s.b;
        this.colors[c++] = alpha;
      }
    }

    this.splatMesh.updateVerticesData(VertexBuffer.PositionKind, this.positions, false, false);
    this.splatMesh.updateVerticesData(VertexBuffer.ColorKind, this.colors, false, false);
  }
}

// ---- world generation -------------------------------------------------------

function makeSplats(): Splat[] {
  const out: Splat[] = [];
  buildMemories(out);
  buildSky(out);
  buildFoliage(out);
  buildLilies(out);
  buildReflections(out);
  buildMotes(out);
  return out;
}

/** Push one dab with sensible defaults (home doubles as scattered/target). */
function pushDab(
  out: Splat[],
  o: { x: number; y: number; z: number; sx: number; sy?: number; rot?: number; r: number; g: number; b: number; a: number; memory?: number; anim?: number; seed?: number; drift?: number; scx?: number; scy?: number; scz?: number; tgx?: number; tgy?: number; tgz?: number },
) {
  out.push({
    memory: o.memory ?? -1,
    anim: o.anim ?? STATIC,
    hx: o.x, hy: o.y, hz: o.z,
    scx: o.scx ?? o.x, scy: o.scy ?? o.y, scz: o.scz ?? o.z,
    tgx: o.tgx ?? o.x, tgy: o.tgy ?? o.y, tgz: o.tgz ?? o.z,
    sx: o.sx, sy: o.sy ?? o.sx,
    rot: o.rot ?? 0,
    r: o.r, g: o.g, b: o.b, a: o.a,
    seed: o.seed ?? 0,
    drift: o.drift ?? 1,
  });
}

function buildMemories(out: Splat[]) {
  MEMORIES.forEach((mem, mi) => {
    for (let i = 0; i < mem.count; i++) {
      const t = mem.makeTarget(i, mem.count);
      const a = hash01(i, mi * 11 + 1) * TAU;
      const r = 1.3 + hash01(i, mi * 11 + 2) * 2.4;
      const col = mem.palette[i % mem.palette.length];
      const tint = (hash01(i, mi * 11 + 8) - 0.5) * 0.1;
      pushDab(out, {
        memory: mi,
        x: t.x, y: t.y, z: t.z,
        scx: t.x + Math.cos(a) * r,
        scy: t.y + (hash01(i, mi * 11 + 3) - 0.5) * 1.5,
        scz: t.z + Math.sin(a) * r + (hash01(i, mi * 11 + 4) - 0.5) * 1.1,
        tgx: t.x, tgy: t.y, tgz: t.z,
        sx: 0.1 + hash01(i, mi * 11 + 6) * 0.14,
        sy: 0.07 + hash01(i, mi * 11 + 7) * 0.13,
        rot: hash01(i, mi * 11 + 9) * TAU,
        r: clamp01(col.r + tint),
        g: clamp01(col.g + tint),
        b: clamp01(col.b + tint),
        a: 0.85,
        seed: hash01(i, mi + 100),
      });
    }
  });
}

// Big soft washes + a sun + scattered clouds → a painterly Monet sky.
const SKY_WASH: RGB[] = [
  { r: 0.74, g: 0.7, b: 0.92 }, // lavender
  { r: 0.96, g: 0.76, b: 0.78 }, // rose
  { r: 0.99, g: 0.87, b: 0.62 }, // gold
  { r: 0.62, g: 0.8, b: 0.84 }, // pale teal
];
function buildSky(out: Splat[]) {
  for (let i = 0; i < 14; i++) {
    const col = SKY_WASH[i % SKY_WASH.length];
    pushDab(out, {
      x: (hash01(i, 31) - 0.5) * 16,
      y: 3.4 + hash01(i, 32) * 3.4,
      z: -7 - hash01(i, 33) * 2.5,
      sx: 4.4 + hash01(i, 34) * 3.8,
      sy: 3 + hash01(i, 35) * 2.6,
      rot: hash01(i, 36) * TAU,
      r: col.r, g: col.g, b: col.b,
      a: 0.16 + hash01(i, 37) * 0.12,
      anim: DRIFT,
      seed: hash01(i, 38),
      drift: 0.6 + hash01(i, 39) * 0.8,
    });
  }
  // the sun — a warm glow high on the right
  for (let i = 0; i < 16; i++) {
    const a = hash01(i, 41) * TAU;
    const r = hash01(i, 42) * 1.3;
    pushDab(out, {
      x: 3.4 + Math.cos(a) * r,
      y: 5 + Math.sin(a) * r * 0.8,
      z: -7.2,
      sx: 0.7 + hash01(i, 43) * 1.7,
      r: 1.0, g: 0.95 - hash01(i, 44) * 0.12, b: 0.74 + hash01(i, 45) * 0.16,
      a: 0.32 + hash01(i, 46) * 0.26,
      anim: DRIFT, seed: hash01(i, 47), drift: 0.3,
    });
  }
  // small drifting clouds
  for (let i = 0; i < 34; i++) {
    const col = i % 3 === 0 ? SKY_WASH[1] : { r: 0.97, g: 0.95, b: 0.96 };
    pushDab(out, {
      x: (hash01(i, 51) - 0.5) * 15,
      y: 2.8 + hash01(i, 52) * 2.8,
      z: -5.5 - hash01(i, 53) * 2.5,
      sx: 0.7 + hash01(i, 54) * 1.1,
      sy: 0.5 + hash01(i, 55) * 0.7,
      rot: (hash01(i, 56) - 0.5) * 0.6,
      r: col.r, g: col.g, b: col.b,
      a: 0.16 + hash01(i, 57) * 0.12,
      anim: DRIFT, seed: hash01(i, 58), drift: 0.8 + hash01(i, 59),
    });
  }
}

const LEAF: RGB[] = [
  { r: 0.36, g: 0.56, b: 0.32 },
  { r: 0.3, g: 0.5, b: 0.42 },
  { r: 0.48, g: 0.64, b: 0.34 },
  { r: 0.24, g: 0.45, b: 0.36 },
];
const LEAF_DAB: RGB[] = [
  { r: 0.94, g: 0.82, b: 0.42 }, // sun-touched
  { r: 0.95, g: 0.66, b: 0.66 }, // a flower
  { r: 0.7, g: 0.78, b: 0.5 },
];
function leafColor(i: number, salt: number): RGB {
  return hash01(i, salt) < 0.16 ? LEAF_DAB[i % LEAF_DAB.length] : LEAF[i % LEAF.length];
}
function buildFoliage(out: Splat[]) {
  // back tree line
  for (let i = 0; i < 150; i++) {
    const col = leafColor(i, 61);
    pushDab(out, {
      x: (hash01(i, 62) - 0.5) * 13,
      y: 0.4 + Math.pow(hash01(i, 63), 0.8) * 3,
      z: -3.6 - hash01(i, 64) * 1.4,
      sx: 0.28 + hash01(i, 65) * 0.4,
      sy: 0.22 + hash01(i, 66) * 0.34,
      rot: hash01(i, 67) * TAU,
      r: col.r, g: col.g, b: col.b,
      a: 0.62 + hash01(i, 68) * 0.28,
      anim: SWAY, seed: hash01(i, 69), drift: 0.6 + hash01(i, 70),
    });
  }
  // two weeping willows hugging the pond, cascading downward
  for (const side of [-1, 1]) {
    for (let i = 0; i < 62; i++) {
      const col = leafColor(i, 71 + side);
      const strand = i % 8;
      const cx = side * (4.2 + (hash01(i, 72) - 0.5) * 0.6);
      pushDab(out, {
        x: cx + (strand - 3.5) * 0.16,
        y: 0.35 + Math.pow(hash01(i, 73), 0.6) * 3.1,
        z: -0.4 + (hash01(i, 74) - 0.5) * 2.2,
        sx: 0.18 + hash01(i, 75) * 0.22,
        sy: 0.34 + hash01(i, 76) * 0.4, // taller dabs read as hanging strands
        rot: (hash01(i, 77) - 0.5) * 0.5,
        r: col.r, g: col.g, b: col.b,
        a: 0.6 + hash01(i, 78) * 0.3,
        anim: SWAY, seed: hash01(i, 79), drift: 0.9 + hash01(i, 80),
      });
    }
  }
  // grassy shore along the front edge of the pond
  for (let i = 0; i < 56; i++) {
    const col = LEAF[i % LEAF.length];
    pushDab(out, {
      x: (hash01(i, 81) - 0.5) * 9,
      y: 0.08 + hash01(i, 82) * 0.4,
      z: 2.2 + (hash01(i, 83) - 0.5) * 0.9,
      sx: 0.2 + hash01(i, 84) * 0.28,
      sy: 0.26 + hash01(i, 85) * 0.3,
      rot: (hash01(i, 86) - 0.5) * 0.4,
      r: col.r, g: col.g, b: col.b,
      a: 0.6 + hash01(i, 87) * 0.3,
      anim: SWAY, seed: hash01(i, 88), drift: 0.7,
    });
  }
}

// Water lilies — the signature Giverny motif: green pads with pink/white blooms.
function buildLilies(out: Splat[]) {
  const pads = 10;
  for (let pad = 0; pad < pads; pad++) {
    const px = (hash01(pad, 91) - 0.5) * 6;
    const pz = 0.5 + (hash01(pad, 92) - 0.5) * 2.6;
    // the lily pad — flat green discs lying on the water
    for (let i = 0; i < 9; i++) {
      const a = hash01(pad * 13 + i, 93) * TAU;
      const r = hash01(pad * 13 + i, 94) * 0.36;
      pushDab(out, {
        x: px + Math.cos(a) * r,
        y: WATER_Y + 0.03,
        z: pz + Math.sin(a) * r,
        sx: 0.22 + hash01(pad * 13 + i, 95) * 0.16,
        sy: 0.12 + hash01(pad * 13 + i, 96) * 0.08, // flattened onto the water
        rot: (hash01(pad * 13 + i, 97) - 0.5) * 0.5,
        r: 0.36 + hash01(pad * 13 + i, 98) * 0.1,
        g: 0.58 + hash01(pad * 13 + i, 99) * 0.12,
        b: 0.4,
        a: 0.66,
        anim: BOB, seed: hash01(pad, 100), drift: 0.8,
      });
    }
    // the blossom on a few of the pads
    if (hash01(pad, 101) < 0.7) {
      const blossom = hash01(pad, 102) < 0.5 ? { r: 0.98, g: 0.66, b: 0.78 } : { r: 0.99, g: 0.95, b: 0.95 };
      for (let i = 0; i < 6; i++) {
        const center = i === 0;
        pushDab(out, {
          x: px + (hash01(pad * 7 + i, 103) - 0.5) * 0.22,
          y: WATER_Y + 0.12 + hash01(pad * 7 + i, 104) * 0.12,
          z: pz + (hash01(pad * 7 + i, 105) - 0.5) * 0.22,
          sx: center ? 0.14 : 0.1 + hash01(pad * 7 + i, 106) * 0.08,
          rot: hash01(pad * 7 + i, 107) * TAU,
          r: center ? 1.0 : blossom.r,
          g: center ? 0.84 : blossom.g,
          b: center ? 0.42 : blossom.b,
          a: 0.82,
          anim: BOB, seed: hash01(pad, 108), drift: 0.8,
        });
      }
    }
  }
}

// Soft horizontal colour smears on the pond — the sky and trees "reflected".
const REFLECT: RGB[] = [
  { r: 0.99, g: 0.86, b: 0.5 }, // gold under the sun
  { r: 0.74, g: 0.7, b: 0.9 }, // lavender
  { r: 0.4, g: 0.6, b: 0.46 }, // green of the willows
  { r: 0.96, g: 0.72, b: 0.74 }, // rose
];
function buildReflections(out: Splat[]) {
  for (let i = 0; i < 130; i++) {
    const col = REFLECT[i % REFLECT.length];
    const goldStreak = i % REFLECT.length === 0;
    pushDab(out, {
      x: goldStreak ? 2.4 + (hash01(i, 111) - 0.5) * 1.6 : (hash01(i, 112) - 0.5) * 7,
      y: WATER_Y + 0.05 + hash01(i, 113) * 0.3,
      z: 0.5 + (hash01(i, 114) - 0.5) * 3,
      sx: 0.4 + hash01(i, 115) * 0.7, // wide
      sy: 0.07 + hash01(i, 116) * 0.1, // thin → looks like water
      rot: (hash01(i, 117) - 0.5) * 0.3,
      r: col.r, g: col.g, b: col.b,
      a: 0.16 + hash01(i, 118) * 0.2,
      anim: SHIMMER, seed: hash01(i, 119), drift: 0.6 + hash01(i, 120),
    });
  }
}

// Floating light motes / pollen drifting up through the garden.
function buildMotes(out: Splat[]) {
  for (let i = 0; i < 60; i++) {
    pushDab(out, {
      x: (hash01(i, 121) - 0.5) * 10,
      y: 0.3 + hash01(i, 122) * 1.8,
      z: -2 + (hash01(i, 123) - 0.5) * 5,
      sx: 0.05 + hash01(i, 124) * 0.07,
      r: 1.0, g: 0.96, b: 0.78,
      a: 0.7,
      anim: RISE, seed: hash01(i, 125), drift: 0.5 + hash01(i, 126),
    });
  }
}

function makeSplatTexture(scene: Scene) {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(48, 48, 0, 48, 48, 47);
    g.addColorStop(0, "rgba(255,255,255,0.98)");
    g.addColorStop(0.4, "rgba(255,255,255,0.5)");
    g.addColorStop(0.75, "rgba(255,255,255,0.14)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 96, 96);
  }
  const tex = new Texture(canvas.toDataURL("image/png"), scene, true, false, Texture.BILINEAR_SAMPLINGMODE);
  tex.hasAlpha = true;
  return tex;
}

function hash01(i: number, salt: number): number {
  let h = (Math.imul(i + 1, 2654435761) ^ Math.imul(salt + 1, 1597334677)) >>> 0;
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519) >>> 0;
  return (h % 10000) / 10000;
}

function angleDelta(a: number, b: number): number {
  let d = ((a - b + Math.PI) % TAU) - Math.PI;
  if (d < -Math.PI) d += TAU;
  return Math.abs(d);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(t: number): number {
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
