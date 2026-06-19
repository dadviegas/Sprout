import { useEffect, useRef, useState } from "react";
import { ArcRotateCamera, Color3, Color4, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector3, VertexBuffer, VertexData } from "@babylonjs/core";
import { Icon } from "@sprout/icons";
import { Confetti, Speaker } from "@sprout/ui";
import { prefersReducedMotion } from "./canvas";

type MemoryId = "bridge" | "gate" | "bloom";

interface Memory {
  id: MemoryId;
  label: string;
  hint: string;
  angle: number;
  center: Vector3;
  color: Color4;
  count: number;
  makeTarget: (i: number, count: number) => Vector3;
}

interface Splat {
  memory: number;
  seed: number;
  size: number;
  color: Color4;
  scattered: Vector3;
  target: Vector3;
}

interface HudState {
  started: boolean;
  active: number;
  solved: boolean[];
  clarity: number;
  alignment: number;
}

const TAU = Math.PI * 2;
const START_TEXT =
  "Afterimage Garden é um pequeno jogo em WebGL feito com diet splats: manchas leves que parecem splats, mas correm melhor no iPad. Roda a vista até as cores formarem uma memória, depois mantém Focar para a tornar real.";

const MEMORIES: Memory[] = [
  {
    id: "bridge",
    label: "Ponte",
    hint: "Procura a ponte sobre a água.",
    angle: -0.62,
    center: new Vector3(0, 0.65, 0),
    color: new Color4(0.97, 0.71, 0.28, 0.78),
    count: 150,
    makeTarget: (i, count) => {
      const t = i / Math.max(1, count - 1);
      const x = (t - 0.5) * 6.2;
      const y = 0.72 + Math.sin(t * Math.PI) * 1.16 + (hash01(i, 2) - 0.5) * 0.16;
      const z = (hash01(i, 3) - 0.5) * 0.34;
      return new Vector3(x, y, z);
    },
  },
  {
    id: "gate",
    label: "Portão",
    hint: "Atrás da ponte há um portão escondido.",
    angle: 0.48,
    center: new Vector3(0, 1.2, -2.15),
    color: new Color4(0.4, 0.82, 0.69, 0.72),
    count: 136,
    makeTarget: (i, count) => {
      const t = i / Math.max(1, count - 1);
      const side = i % 3;
      const local = t * 2 - 1;
      if (side === 0) return new Vector3(-1.35 + (hash01(i, 5) - 0.5) * 0.2, 0.35 + t * 2.2, -2.15);
      if (side === 1) return new Vector3(1.35 + (hash01(i, 6) - 0.5) * 0.2, 0.35 + t * 2.2, -2.15);
      return new Vector3(local * 1.3, 2.55 + Math.sin((t + 0.12) * Math.PI) * 0.36, -2.15);
    },
  },
  {
    id: "bloom",
    label: "Flor",
    hint: "A última memória abre como uma flor.",
    angle: -1.34,
    center: new Vector3(0.2, 1.35, -0.55),
    color: new Color4(0.96, 0.43, 0.57, 0.76),
    count: 174,
    makeTarget: (i, _count) => {
      const petal = i % 6;
      const a = (petal / 6) * TAU + (hash01(i, 7) - 0.5) * 0.32;
      const r = 0.25 + Math.pow(hash01(i, 8), 0.55) * 1.55;
      const squash = 0.42 + (petal % 2) * 0.1;
      return new Vector3(Math.cos(a) * r, 1.28 + Math.sin(a) * r * squash, -0.55 + (hash01(i, 9) - 0.5) * 0.42);
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
    ? "Conseguiste! As três memórias ficaram claras no jardim."
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
  private hud: HudState = { started: false, active: 0, solved: [false, false, false], clarity: 0, alignment: 0 };
  private lastSolved = -1;
  private frameObserver: ReturnType<Scene["onBeforeRenderObservable"]["add"]> | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    private opts: { reduced: boolean; isFocusing: () => boolean; onState: (hud: HudState) => void },
  ) {
    this.engine = new Engine(canvas, true, { preserveDrawingBuffer: false, stencil: false, antialias: true }, true);
    this.engine.setHardwareScalingLevel(Math.max(1, Math.min(window.devicePixelRatio || 1, 1.5)));
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.05, 0.09, 0.13, 1);

    this.camera = new ArcRotateCamera("afterimage-camera", -1.05, 1.18, 8.8, new Vector3(0, 1.1, -0.8), this.scene);
    this.camera.attachControl(canvas, true);
    this.camera.lowerRadiusLimit = 5.8;
    this.camera.upperRadiusLimit = 11.2;
    this.camera.lowerBetaLimit = 0.82;
    this.camera.upperBetaLimit = 1.42;
    this.camera.wheelPrecision = 60;
    this.camera.pinchPrecision = 90;
    this.camera.inertia = 0.72;

    new HemisphericLight("garden-light", new Vector3(-0.3, 1, 0.45), this.scene).intensity = 0.92;
    this.buildWorld();
    this.splats = makeSplats();
    this.splatMesh = this.buildSplats(this.splats);
    this.positions = new Float32Array(this.splats.length * 12);

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
    this.camera.beta = 1.18;
    this.camera.radius = 8.8;
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
    const ground = MeshBuilder.CreateGround("afterimage-ground", { width: 10.5, height: 7.5, subdivisions: 2 }, this.scene);
    const groundMat = new StandardMaterial("afterimage-ground-mat", this.scene);
    groundMat.diffuseColor = new Color3(0.18, 0.29, 0.2);
    groundMat.specularColor = Color3.Black();
    ground.material = groundMat;

    const water = MeshBuilder.CreateGround("afterimage-water", { width: 7.4, height: 2.15 }, this.scene);
    water.position.y = 0.012;
    water.position.z = 0.34;
    const waterMat = new StandardMaterial("afterimage-water-mat", this.scene);
    waterMat.diffuseColor = new Color3(0.12, 0.46, 0.55);
    waterMat.alpha = 0.72;
    waterMat.specularColor = new Color3(0.35, 0.56, 0.6);
    water.material = waterMat;
  }

  private buildSplats(splats: Splat[]) {
    const indices: number[] = [];
    const uvs: number[] = [];
    const colors: number[] = [];
    const positions: number[] = [];
    const corners = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ];
    splats.forEach((s, i) => {
      const base = i * 4;
      for (const [u, v] of corners) {
        positions.push(s.scattered.x, s.scattered.y, s.scattered.z);
        uvs.push((u + 1) / 2, (v + 1) / 2);
        colors.push(s.color.r, s.color.g, s.color.b, s.color.a);
      }
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    });

    const mesh = new Mesh("afterimage-splats", this.scene);
    const vd = new VertexData();
    vd.positions = positions;
    vd.indices = indices;
    vd.uvs = uvs;
    vd.colors = colors;
    vd.applyToMesh(mesh, true);

    const mat = new StandardMaterial("afterimage-splat-mat", this.scene);
    mat.diffuseTexture = makeSplatTexture(this.scene);
    mat.useAlphaFromDiffuseTexture = true;
    mat.diffuseColor = Color3.White();
    mat.emissiveColor = new Color3(0.75, 0.75, 0.75);
    mat.specularColor = Color3.Black();
    mat.disableLighting = false;
    mat.backFaceCulling = false;
    mat.alpha = 0.92;
    mesh.material = mat;
    mesh.hasVertexAlpha = true;
    mesh.alwaysSelectAsActiveMesh = true;
    return mesh;
  }

  private tick() {
    if (!this.hud.started) {
      this.updateSplats(0);
      return;
    }

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

    this.updateSplats(this.engine.getDeltaTime() / 1000);
    this.opts.onState({ ...this.hud, solved: [...this.hud.solved] });
  }

  private updateSplats(dt: number) {
    const view = this.camera.getViewMatrix();
    const right = new Vector3(view.m[0], view.m[4], view.m[8]).normalize();
    const up = new Vector3(view.m[1], view.m[5], view.m[9]).normalize();
    const time = performance.now() / 1000;
    let p = 0;
    for (const [i, s] of this.splats.entries()) {
      const solved = this.hud.solved[s.memory];
      const active = s.memory === this.hud.active;
      const last = s.memory === this.lastSolved;
      const clarity = solved ? 1 : active ? this.hud.clarity : last ? 0.92 : 0.08;
      const breathe = this.opts.reduced ? 0 : Math.sin(time * 0.8 + s.seed * 11) * 0.035;
      const pos = Vector3.Lerp(s.scattered, s.target, easeOutCubic(Math.max(0, Math.min(1, clarity)))).
        add(new Vector3(0, breathe, 0));
      const size = s.size * (solved ? 0.82 : active ? 1 + this.hud.alignment * 0.22 : 0.7);
      const corners = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ];
      for (const [cx, cy] of corners) {
        const v = pos.add(right.scale(cx * size)).add(up.scale(cy * size));
        this.positions[p++] = v.x;
        this.positions[p++] = v.y;
        this.positions[p++] = v.z;
      }
      if (dt === -1 && i < 0) break;
    }
    this.splatMesh.updateVerticesData(VertexBuffer.PositionKind, this.positions, false, false);
  }
}

function makeSplats(): Splat[] {
  const splats: Splat[] = [];
  MEMORIES.forEach((m, mi) => {
    for (let i = 0; i < m.count; i++) {
      const target = m.makeTarget(i, m.count).add(m.center.scale(mi === 0 ? 0 : 0.2));
      const a = hash01(i, mi * 11 + 1) * TAU;
      const r = 1.3 + hash01(i, mi * 11 + 2) * 2.4;
      const scattered = new Vector3(
        target.x + Math.cos(a) * r,
        target.y + (hash01(i, mi * 11 + 3) - 0.5) * 1.4,
        target.z + Math.sin(a) * r + (hash01(i, mi * 11 + 4) - 0.5) * 1.1,
      );
      const warm = hash01(i, mi * 11 + 5);
      splats.push({
        memory: mi,
        seed: hash01(i, mi + 100),
        size: 0.09 + hash01(i, mi * 11 + 6) * 0.16,
        color: new Color4(
          Math.min(1, m.color.r + warm * 0.16),
          Math.min(1, m.color.g + (1 - warm) * 0.14),
          Math.min(1, m.color.b + hash01(i, mi * 11 + 7) * 0.13),
          m.color.a,
        ),
        scattered,
        target,
      });
    }
  });
  return splats;
}

function makeSplatTexture(scene: Scene) {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(48, 48, 0, 48, 48, 46);
    g.addColorStop(0, "rgba(255,255,255,0.95)");
    g.addColorStop(0.42, "rgba(255,255,255,0.54)");
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

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
