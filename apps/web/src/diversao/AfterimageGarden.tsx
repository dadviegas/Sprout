import { useEffect, useRef, useState } from "react";
import {
  ArcRotateCamera,
  Color3,
  Color4,
  Engine,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  TransformNode,
  Vector3,
  VertexBuffer,
  VertexData,
} from "@babylonjs/core";
import { Icon } from "@sprout/icons";
import { Confetti, Speaker } from "@sprout/ui";
import { prefersReducedMotion } from "./canvas";

type Phase = "ready" | "playing" | "won";

interface HudState {
  phase: Phase;
  seeds: number;
  total: number;
  time: number;
  streak: number;
}

interface Seed {
  mesh: Mesh;
  baseY: number;
  taken: boolean;
}

interface Dab {
  x: number; y: number; z: number;
  sx: number; sy: number;
  r: number; g: number; b: number; a: number;
  seed: number;
  kind: number;
}

interface AvatarRig {
  root: TransformNode;
  leftArm: Mesh;
  rightArm: Mesh;
  leftLeg: Mesh;
  rightLeg: Mesh;
  shadow: Mesh;
}

const TAU = Math.PI * 2;
const TOTAL_SEEDS = 12;
const ROUND_TIME = 90;
const PLAYER_SPEED = 4.1;
const START_TEXT =
  "Corre pelo jardim e apanha 12 sementes de luz. Usa WASD ou setas para andar, botão direito do rato para rodar a câmara, roda para zoom, ou o manípulo no iPad.";

export function AfterimageGarden() {
  const reduced = prefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<SplatGardenGame | null>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const stickId = useRef<number | null>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const [hud, setHud] = useState<HudState>({ phase: "ready", seeds: 0, total: TOTAL_SEEDS, time: ROUND_TIME, streak: 0 });
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = new SplatGardenGame(canvas, {
      reduced,
      onState: (next) => {
        setHud(next);
        if (next.phase === "won") {
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

  const begin = () => gameRef.current?.begin();
  const reset = () => {
    setCelebrate(false);
    gameRef.current?.reset();
  };

  const moveStick = (e: React.PointerEvent) => {
    if (stickId.current !== e.pointerId) return;
    const el = stickRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let dx = e.clientX - (r.left + r.width / 2);
    let dy = e.clientY - (r.top + r.height / 2);
    const max = 46;
    const len = Math.hypot(dx, dy);
    if (len > max) {
      dx = (dx / len) * max;
      dy = (dy / len) * max;
    }
    setKnob({ x: dx, y: dy });
    gameRef.current?.setMove(dx / max, -dy / max);
  };
  const onStickDown = (e: React.PointerEvent) => {
    stickId.current = e.pointerId;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    moveStick(e);
  };
  const endStick = (e: React.PointerEvent) => {
    if (stickId.current !== e.pointerId) return;
    stickId.current = null;
    setKnob({ x: 0, y: 0 });
    gameRef.current?.setMove(0, 0);
  };

  const pct = Math.round((hud.seeds / hud.total) * 100);
  const say =
    hud.phase === "won"
      ? `Ganhaste! Apanhaste as ${hud.total} sementes de luz.`
      : `Apanha as sementes de luz. Tens ${hud.seeds} de ${hud.total}.`;

  return (
    <div className="dv-room-screen ag-room">
      <div className="ag-topbar" role="toolbar" aria-label="Splat Garden Run">
        <div className="ag-title">
          <span className="ag-title__icon"><Icon name="sparkle" size={22} /></span>
          <span>
            <strong>Splat Garden Run</strong>
            <small>apanha as sementes de luz</small>
          </span>
        </div>
        <div className="ag-hud">
          <span><Icon name="sparkle" size={16} /> {hud.seeds}/{hud.total}</span>
          <span><Icon name="clock" size={16} /> {hud.time}s</span>
          <span><Icon name="bolt" size={16} /> x{Math.max(1, hud.streak)}</span>
        </div>
        <div className="ag-actions">
          <button className="dv-tool" onClick={reset} aria-label="Recomeçar" title="Recomeçar"><Icon name="refresh" size={20} /></button>
          <Speaker text={say} className="dv-tool" label="Ouvir objetivo" size={22} />
        </div>
      </div>

      <div className="ag-progressbar" aria-label={`Progresso ${pct}%`}>
        <span style={{ width: `${pct}%` }} />
      </div>

      <div className="dv-arcade ag-stage">
        <canvas ref={canvasRef} className="dv-canvas ag-canvas" aria-label="Splat Garden Run — corre e apanha sementes brilhantes" />

        {hud.phase !== "ready" && (
          <div className="ag-controls" aria-hidden>
            <div
              ref={stickRef}
              className="ag-stick"
              onPointerDown={onStickDown}
              onPointerMove={moveStick}
              onPointerUp={endStick}
              onPointerCancel={endStick}
            >
              <span className="ag-knob" style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }} />
            </div>
          </div>
        )}

        {hud.phase === "ready" && (
          <div className="dv-overlay ag-start">
            <div className="ag-start-card">
              <h3 className="dv-overlay__title">Splat Garden Run</h3>
              <p className="dv-overlay__sub">{START_TEXT}</p>
              <div className="ag-how">
                <span>WASD para andar</span>
                <span>Botão direito para olhar</span>
                <span>Apanha 12 luzes</span>
              </div>
              <button className="dv-tool dv-tool--wide ag-start-btn" onClick={begin}>
                <Icon name="forward" size={20} />
                <span>Começar</span>
              </button>
            </div>
          </div>
        )}

        {hud.phase === "won" && (
          <div className="ag-complete" role="status">
            <Icon name="trophy" size={18} />
            Jardim completo!
          </div>
        )}
      </div>

      {celebrate && <Confetti pieces={reduced ? 22 : 90} />}
    </div>
  );
}

class SplatGardenGame {
  private engine: Engine;
  private scene: Scene;
  private camera: ArcRotateCamera;
  private player: TransformNode;
  private playerShadow: Mesh;
  private leftArm: Mesh;
  private rightArm: Mesh;
  private leftLeg: Mesh;
  private rightLeg: Mesh;
  private playerPos = new Vector3(0, 0.04, 2.75);
  private camYaw = -0.95;
  private camPitch = 1.08;
  private camRadius = 7.5;
  private draggingCamera = false;
  private cameraPointerId: number | null = null;
  private lastPointerX = 0;
  private lastPointerY = 0;
  private seeds: Seed[] = [];
  private dabs: Dab[] = [];
  private dabMesh: Mesh;
  private positions: Float32Array;
  private colors: Float32Array;
  private moveX = 0;
  private moveZ = 0;
  private keys = new Set<string>();
  private phase: Phase = "ready";
  private score = 0;
  private timeLeft = ROUND_TIME;
  private streak = 0;
  private lastCollect = 0;
  private frameObserver: ReturnType<Scene["onBeforeRenderObservable"]["add"]> | null = null;

  private static readonly CORNERS = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];

  constructor(
    private canvas: HTMLCanvasElement,
    private opts: { reduced: boolean; onState: (hud: HudState) => void },
  ) {
    this.engine = new Engine(canvas, true, { preserveDrawingBuffer: false, stencil: false, antialias: true }, true);
    this.engine.setHardwareScalingLevel(1 / Math.max(1, Math.min(window.devicePixelRatio || 1, 1.5)));
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.68, 0.86, 0.97, 1);
    this.camera = new ArcRotateCamera("ag-camera", this.camYaw, this.camPitch, this.camRadius, this.playerPos.add(new Vector3(0, 1.05, 0)), this.scene);
    this.camera.inputs.clear();
    this.camera.inertia = 0.72;

    new HemisphericLight("ag-light", new Vector3(-0.35, 1, 0.45), this.scene).intensity = 1.18;
    this.buildWorld();
    const player = this.buildPlayer();
    this.player = player.root;
    this.leftArm = player.leftArm;
    this.rightArm = player.rightArm;
    this.leftLeg = player.leftLeg;
    this.rightLeg = player.rightLeg;
    this.playerShadow = player.shadow;
    this.seeds = this.buildSeeds();
    this.dabs = makeDabs();
    this.positions = new Float32Array(this.dabs.length * 12);
    this.colors = new Float32Array(this.dabs.length * 16);
    this.dabMesh = this.buildDabs();
    this.writeDabs();

    this.frameObserver = this.scene.onBeforeRenderObservable.add(() => this.tick());
    this.engine.runRenderLoop(() => this.scene.render());
    canvas.addEventListener("pointerdown", this.onCameraPointerDown);
    canvas.addEventListener("pointermove", this.onCameraPointerMove);
    canvas.addEventListener("pointerup", this.onCameraPointerUp);
    canvas.addEventListener("pointercancel", this.onCameraPointerUp);
    canvas.addEventListener("wheel", this.onWheel, { passive: false });
    canvas.addEventListener("contextmenu", this.onContextMenu);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    this.resize();
    this.emit();
  }

  begin() {
    this.phase = "playing";
    this.emit();
  }

  reset() {
    this.phase = "playing";
    this.score = 0;
    this.timeLeft = ROUND_TIME;
    this.streak = 0;
    this.lastCollect = 0;
    this.playerPos.copyFromFloats(0, 0.04, 2.75);
    this.camYaw = -0.95;
    this.camPitch = 1.08;
    this.camRadius = 7.5;
    this.seeds.forEach((s) => {
      s.taken = false;
      s.mesh.setEnabled(true);
    });
    this.emit();
  }

  setMove(x: number, z: number) {
    this.moveX = clamp(x, -1, 1);
    this.moveZ = clamp(z, -1, 1);
  }

  resize() {
    this.engine.resize();
  }

  dispose() {
    if (this.frameObserver) this.scene.onBeforeRenderObservable.remove(this.frameObserver);
    this.canvas.removeEventListener("pointerdown", this.onCameraPointerDown);
    this.canvas.removeEventListener("pointermove", this.onCameraPointerMove);
    this.canvas.removeEventListener("pointerup", this.onCameraPointerUp);
    this.canvas.removeEventListener("pointercancel", this.onCameraPointerUp);
    this.canvas.removeEventListener("wheel", this.onWheel);
    this.canvas.removeEventListener("contextmenu", this.onContextMenu);
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    this.scene.dispose();
    this.engine.dispose();
  }

  private emit() {
    this.opts.onState({ phase: this.phase, seeds: this.score, total: TOTAL_SEEDS, time: Math.ceil(this.timeLeft), streak: this.streak });
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(e.code)) {
      e.preventDefault();
      this.keys.add(e.code);
    }
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code);
  };

  private onCameraPointerDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 2) return;
    e.preventDefault();
    this.draggingCamera = true;
    this.cameraPointerId = e.pointerId;
    this.lastPointerX = e.clientX;
    this.lastPointerY = e.clientY;
    this.canvas.setPointerCapture?.(e.pointerId);
  };

  private onCameraPointerMove = (e: PointerEvent) => {
    if (!this.draggingCamera || this.cameraPointerId !== e.pointerId) return;
    e.preventDefault();
    const dx = e.clientX - this.lastPointerX;
    const dy = e.clientY - this.lastPointerY;
    this.lastPointerX = e.clientX;
    this.lastPointerY = e.clientY;
    this.camYaw -= dx * 0.006;
    this.camPitch = clamp(this.camPitch + dy * 0.004, 0.82, 1.24);
  };

  private onCameraPointerUp = (e: PointerEvent) => {
    if (this.cameraPointerId !== e.pointerId) return;
    this.draggingCamera = false;
    this.cameraPointerId = null;
  };

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    this.camRadius = clamp(this.camRadius + e.deltaY * 0.004, 6.2, 8.8);
  };

  private onContextMenu = (e: Event) => {
    e.preventDefault();
  };

  private buildWorld() {
    const grassMat = mat(this.scene, "grass", new Color3(0.36, 0.66, 0.3));
    const waterMat = mat(this.scene, "water", new Color3(0.16, 0.56, 0.7), 0.72, new Color3(0.8, 0.96, 1));
    const pathMat = mat(this.scene, "path", new Color3(0.73, 0.64, 0.49));
    const trunkMat = mat(this.scene, "trunk", new Color3(0.43, 0.27, 0.15));
    const leafMat = mat(this.scene, "leaves", new Color3(0.24, 0.54, 0.28));
    const rockMat = mat(this.scene, "rock", new Color3(0.5, 0.52, 0.5));
    const flowerMat = mat(this.scene, "flower", new Color3(0.88, 0.42, 0.55));

    const ground = MeshBuilder.CreateGround("ag-ground", { width: 13, height: 9.5, subdivisions: 2 }, this.scene);
    ground.position.z = -0.35;
    ground.material = grassMat;
    ground.freezeWorldMatrix();

    const pond = MeshBuilder.CreateGround("ag-pond", { width: 6.6, height: 2.85 }, this.scene);
    pond.position.set(0.15, 0.04, 0.55);
    pond.material = waterMat;
    pond.freezeWorldMatrix();

    for (let i = 0; i < 15; i++) {
      const stone = MeshBuilder.CreateCylinder(`ag-stone-${i}`, { height: 0.06, diameter: 0.52 + hash01(i, 1) * 0.16, tessellation: 16 }, this.scene);
      stone.position.set((i - 7) * 0.56, 0.07, 2.78 - Math.abs(i - 7) * 0.11 + Math.sin(i) * 0.06);
      stone.scaling.z = 0.62;
      stone.rotation.y = hash01(i, 2) * TAU;
      stone.material = pathMat;
      stone.freezeWorldMatrix();
    }

    const trees = [
      [-4.9, -2.7, 1.8], [-3.6, -3.6, 1.5], [4.8, -2.6, 1.7],
      [4.5, 1.6, 1.35], [-4.6, 1.8, 1.45], [0.3, -4.1, 1.25],
    ];
    trees.forEach(([x, z, h], i) => {
      const trunk = MeshBuilder.CreateCylinder(`ag-trunk-${i}`, { height: h, diameterTop: 0.22, diameterBottom: 0.36, tessellation: 10 }, this.scene);
      trunk.position.set(x, h / 2, z);
      trunk.material = trunkMat;
      trunk.freezeWorldMatrix();
      const canopy = MeshBuilder.CreateSphere(`ag-canopy-${i}`, { diameter: 1.55 + (i % 2) * 0.24, segments: 16 }, this.scene);
      canopy.position.set(x, h + 0.42, z);
      canopy.scaling.y = 0.82;
      canopy.material = leafMat;
      canopy.freezeWorldMatrix();
    });

    for (let i = 0; i < 20; i++) {
      const rock = MeshBuilder.CreateSphere(`ag-rock-${i}`, { diameter: 0.25 + hash01(i, 7) * 0.26, segments: 10 }, this.scene);
      rock.position.set((hash01(i, 8) - 0.5) * 11, 0.11, -3.4 + hash01(i, 9) * 6.4);
      rock.scaling.y = 0.45;
      rock.material = rockMat;
      rock.freezeWorldMatrix();
    }

    for (let i = 0; i < 34; i++) {
      const flower = MeshBuilder.CreateSphere(`ag-flower-${i}`, { diameter: 0.12 + hash01(i, 12) * 0.08, segments: 8 }, this.scene);
      const side = i % 2 === 0 ? -1 : 1;
      flower.position.set(side * (2.15 + hash01(i, 13) * 2.7), 0.18, 1.3 + (hash01(i, 14) - 0.5) * 2.4);
      flower.material = flowerMat;
      flower.freezeWorldMatrix();
    }
  }

  private buildPlayer(): AvatarRig {
    const root = new TransformNode("ag-avatar", this.scene);
    const skin = mat(this.scene, "avatar-skin", new Color3(0.96, 0.73, 0.46), 1, new Color3(0.38, 0.28, 0.18));
    const shirt = mat(this.scene, "avatar-shirt", new Color3(0.07, 0.46, 0.88), 1, new Color3(0.3, 0.5, 0.78));
    const pants = mat(this.scene, "avatar-pants", new Color3(0.12, 0.2, 0.42), 1, new Color3(0.24, 0.3, 0.48));
    const shoe = mat(this.scene, "avatar-shoe", new Color3(0.08, 0.08, 0.09), 1, new Color3(0.18, 0.18, 0.2));
    const cap = mat(this.scene, "avatar-cap", new Color3(0.93, 0.36, 0.18), 1, new Color3(0.86, 0.52, 0.22));
    const pack = mat(this.scene, "avatar-pack", new Color3(0.95, 0.68, 0.2), 1, new Color3(0.9, 0.72, 0.34));

    const part = (name: string, size: { width: number; height: number; depth: number }, pos: Vector3, material: StandardMaterial) => {
      const mesh = MeshBuilder.CreateBox(name, size, this.scene);
      mesh.position.copyFrom(pos);
      mesh.material = material;
      mesh.parent = root;
      mesh.isPickable = false;
      return mesh;
    };

    part("ag-avatar-torso", { width: 0.58, height: 0.76, depth: 0.34 }, new Vector3(0, 0.88, 0), shirt);
    part("ag-avatar-head", { width: 0.52, height: 0.52, depth: 0.52 }, new Vector3(0, 1.55, 0), skin);
    part("ag-avatar-cap", { width: 0.56, height: 0.13, depth: 0.58 }, new Vector3(0, 1.88, 0.02), cap);
    part("ag-avatar-cap-brim", { width: 0.44, height: 0.06, depth: 0.32 }, new Vector3(0, 1.8, 0.38), cap);
    part("ag-avatar-pack", { width: 0.42, height: 0.54, depth: 0.14 }, new Vector3(0, 0.88, -0.28), pack);
    const leftArm = part("ag-avatar-left-arm", { width: 0.22, height: 0.68, depth: 0.24 }, new Vector3(-0.45, 0.86, 0), skin);
    const rightArm = part("ag-avatar-right-arm", { width: 0.22, height: 0.68, depth: 0.24 }, new Vector3(0.45, 0.86, 0), skin);
    const leftLeg = part("ag-avatar-left-leg", { width: 0.24, height: 0.62, depth: 0.25 }, new Vector3(-0.16, 0.26, 0), pants);
    const rightLeg = part("ag-avatar-right-leg", { width: 0.24, height: 0.62, depth: 0.25 }, new Vector3(0.16, 0.26, 0), pants);
    part("ag-avatar-left-shoe", { width: 0.27, height: 0.11, depth: 0.34 }, new Vector3(-0.16, -0.07, 0.04), shoe);
    part("ag-avatar-right-shoe", { width: 0.27, height: 0.11, depth: 0.34 }, new Vector3(0.16, -0.07, 0.04), shoe);

    const eyeMat = mat(this.scene, "avatar-eye", new Color3(0.08, 0.08, 0.08));
    part("ag-avatar-eye-left", { width: 0.06, height: 0.075, depth: 0.026 }, new Vector3(-0.11, 1.58, 0.274), eyeMat);
    part("ag-avatar-eye-right", { width: 0.06, height: 0.075, depth: 0.026 }, new Vector3(0.11, 1.58, 0.274), eyeMat);
    part("ag-avatar-smile", { width: 0.18, height: 0.035, depth: 0.026 }, new Vector3(0, 1.43, 0.276), eyeMat);

    const shadow = MeshBuilder.CreateDisc("ag-player-shadow", { radius: 0.42, tessellation: 24 }, this.scene);
    const shadowMat = mat(this.scene, "player-shadow", new Color3(0.05, 0.08, 0.06), 0.24);
    shadow.rotation.x = Math.PI / 2;
    shadow.material = shadowMat;
    shadow.isPickable = false;
    return { root, leftArm, rightArm, leftLeg, rightLeg, shadow };
  }

  private buildSeeds() {
    const seedMat = mat(this.scene, "seed", new Color3(1, 0.82, 0.24), 1, new Color3(1, 0.95, 0.38));
    seedMat.emissiveColor = new Color3(0.9, 0.58, 0.08);
    const points = [
      [-2.9, 0.9], [-1.4, 2.25], [1.6, 2.25], [3.1, 0.8],
      [4.2, -1.45], [2.4, -3.0], [0.1, -3.45], [-2.4, -3.0],
      [-4.2, -1.35], [-3.6, 1.75], [0.2, 0.55], [2.7, -0.85],
    ];
    return points.map(([x, z], i) => {
      const seed = MeshBuilder.CreateSphere(`ag-seed-${i}`, { diameter: 0.36, segments: 16 }, this.scene);
      seed.position.set(x, 0.58, z);
      seed.material = seedMat;
      seed.isPickable = false;
      return { mesh: seed, baseY: seed.position.y, taken: false };
    });
  }

  private buildDabs() {
    const indices = new Array<number>(this.dabs.length * 6);
    const uvs = new Float32Array(this.dabs.length * 8);
    this.dabs.forEach((_d, i) => {
      const base = i * 4;
      const ui = i * 8;
      SplatGardenGame.CORNERS.forEach(([u, v], c) => {
        uvs[ui + c * 2] = (u + 1) / 2;
        uvs[ui + c * 2 + 1] = (v + 1) / 2;
      });
      const ii = i * 6;
      indices[ii] = base; indices[ii + 1] = base + 1; indices[ii + 2] = base + 2;
      indices[ii + 3] = base; indices[ii + 4] = base + 2; indices[ii + 5] = base + 3;
    });

    const mesh = new Mesh("ag-dabs", this.scene);
    const vd = new VertexData();
    vd.positions = this.positions;
    vd.indices = indices;
    vd.uvs = uvs;
    vd.colors = this.colors;
    vd.applyToMesh(mesh, true);
    const dabMat = new StandardMaterial("ag-dab-mat", this.scene);
    dabMat.diffuseTexture = makeSplatTexture(this.scene);
    dabMat.useAlphaFromDiffuseTexture = true;
    dabMat.disableLighting = true;
    dabMat.backFaceCulling = false;
    dabMat.transparencyMode = 2;
    mesh.material = dabMat;
    mesh.hasVertexAlpha = true;
    mesh.isPickable = false;
    mesh.alwaysSelectAsActiveMesh = true;
    mesh.freezeWorldMatrix();
    return mesh;
  }

  private tick() {
    const dt = Math.min(0.045, this.engine.getDeltaTime() / 1000);
    const time = performance.now() / 1000;
    if (this.phase === "playing") {
      this.timeLeft = Math.max(0, this.timeLeft - dt);
      this.updatePlayer(dt, time);
      this.updateSeeds(time);
      if (this.score >= TOTAL_SEEDS) this.phase = "won";
      this.emit();
    } else {
      this.idlePlayer(time);
      this.updateCamera();
      this.updateSeeds(time);
    }
    this.writeDabs();
  }

  private updatePlayer(dt: number, time: number) {
    this.updateCamera();
    const keyX = (this.keys.has("KeyD") || this.keys.has("ArrowRight") ? 1 : 0) - (this.keys.has("KeyA") || this.keys.has("ArrowLeft") ? 1 : 0);
    const keyZ = (this.keys.has("KeyW") || this.keys.has("ArrowUp") ? 1 : 0) - (this.keys.has("KeyS") || this.keys.has("ArrowDown") ? 1 : 0);
    const ix = Math.abs(this.moveX) > 0.05 ? this.moveX : keyX;
    const iz = Math.abs(this.moveZ) > 0.05 ? this.moveZ : keyZ;
    const len = Math.hypot(ix, iz);
    if (len > 0.02) {
      const forward = this.camera.target.subtract(this.camera.position);
      forward.y = 0;
      forward.normalize();
      const right = Vector3.Cross(Vector3.Up(), forward).normalize();
      const move = forward.scale(iz / Math.max(1, len)).add(right.scale(ix / Math.max(1, len))).scale(PLAYER_SPEED * dt);
      this.playerPos.addInPlace(move);
      this.playerPos.x = clamp(this.playerPos.x, -5.6, 5.6);
      this.playerPos.z = clamp(this.playerPos.z, -4.05, 3.5);
      this.player.rotation.y = Math.atan2(move.x, move.z);
    }
    const walking = len > 0.02;
    const bob = this.opts.reduced ? 0 : Math.sin(time * 9) * (walking ? 0.045 : 0.018);
    this.animateAvatar(walking, time);
    this.player.position.copyFromFloats(this.playerPos.x, this.playerPos.y + bob, this.playerPos.z);
    this.playerShadow.position.copyFromFloats(this.playerPos.x, 0.071, this.playerPos.z);
    this.updateCamera();

    for (const s of this.seeds) {
      if (s.taken) continue;
      if (Math.hypot(this.playerPos.x - s.mesh.position.x, this.playerPos.z - s.mesh.position.z) < 0.68) {
        s.taken = true;
        s.mesh.setEnabled(false);
        this.score += 1;
        this.streak = time - this.lastCollect < 4 ? this.streak + 1 : 1;
        this.lastCollect = time;
        this.burstAt(s.mesh.position);
      }
    }
  }

  private idlePlayer(time: number) {
    this.animateAvatar(false, time);
    this.player.position.copyFromFloats(this.playerPos.x, this.playerPos.y + Math.sin(time * 2.2) * 0.025, this.playerPos.z);
    this.playerShadow.position.copyFromFloats(this.playerPos.x, 0.071, this.playerPos.z);
  }

  private animateAvatar(walking: boolean, time: number) {
    const swing = this.opts.reduced ? 0 : walking ? Math.sin(time * 10.5) * 0.42 : Math.sin(time * 2.4) * 0.08;
    this.leftArm.rotation.x = swing;
    this.rightArm.rotation.x = -swing;
    this.leftLeg.rotation.x = -swing * 0.72;
    this.rightLeg.rotation.x = swing * 0.72;
  }

  private updateCamera() {
    this.camera.alpha = this.camYaw;
    this.camera.beta = this.camPitch;
    this.camera.radius = this.camRadius;
    this.camera.target.copyFrom(this.playerPos.add(new Vector3(0, 1.08, 0)));
  }

  private updateSeeds(time: number) {
    for (let i = 0; i < this.seeds.length; i++) {
      const s = this.seeds[i];
      if (s.taken) continue;
      s.mesh.position.y = s.baseY + Math.sin(time * 2.6 + i) * 0.09;
      s.mesh.rotation.y += 0.035;
    }
  }

  private burstAt(pos: Vector3) {
    const start = this.score * 14;
    for (let i = 0; i < 18; i++) {
      const idx = (start + i) % this.dabs.length;
      const d = this.dabs[idx];
      const a = (i / 18) * TAU;
      d.x = pos.x + Math.cos(a) * (0.2 + hash01(i, start) * 0.9);
      d.y = pos.y + 0.1 + hash01(i, start + 1) * 1.1;
      d.z = pos.z + Math.sin(a) * (0.2 + hash01(i, start + 2) * 0.9);
      d.r = [0.96, 0.42, 0.26, 0.9][i % 4];
      d.g = [0.68, 0.86, 0.62, 0.52][i % 4];
      d.b = [0.28, 0.44, 0.95, 0.62][i % 4];
      d.a = 0.78;
      d.sx = 0.16 + hash01(i, start + 3) * 0.2;
      d.sy = d.sx;
      d.kind = 3;
      d.seed = hash01(i, start + 4);
    }
  }

  private writeDabs() {
    const view = this.camera.getViewMatrix().m;
    const rx = view[0], ry = view[4], rz = view[8];
    const ux = view[1], uy = view[5], uz = view[9];
    const time = performance.now() / 1000;
    let p = 0;
    let c = 0;
    for (const d of this.dabs) {
      let x = d.x;
      let y = d.y;
      let z = d.z;
      let a = d.a;
      if (!this.opts.reduced) {
        if (d.kind === 1) y += Math.sin(time * 1.2 + d.seed * 10) * 0.06;
        if (d.kind === 2) x += Math.sin(time * 0.5 + d.seed * 8) * 0.12;
        if (d.kind === 3) {
          y += ((time * 0.28 + d.seed) % 1) * 0.9;
          a *= 0.55 + Math.sin(time * 2.4 + d.seed * 8) * 0.22;
        }
      }
      for (const [qx, qy] of SplatGardenGame.CORNERS) {
        this.positions[p++] = x + rx * qx * d.sx + ux * qy * d.sy;
        this.positions[p++] = y + ry * qx * d.sx + uy * qy * d.sy;
        this.positions[p++] = z + rz * qx * d.sx + uz * qy * d.sy;
        this.colors[c++] = d.r; this.colors[c++] = d.g; this.colors[c++] = d.b; this.colors[c++] = a;
      }
    }
    this.dabMesh.updateVerticesData(VertexBuffer.PositionKind, this.positions, false, false);
    this.dabMesh.updateVerticesData(VertexBuffer.ColorKind, this.colors, false, false);
  }
}

function makeDabs(): Dab[] {
  const out: Dab[] = [];
  for (let i = 0; i < 230; i++) {
    const water = i % 5 === 0;
    const flower = i % 7 === 0;
    out.push({
      x: (hash01(i, 20) - 0.5) * 11.4,
      y: water ? 0.15 + hash01(i, 21) * 0.2 : 0.35 + hash01(i, 22) * 2.8,
      z: water ? 0.55 + (hash01(i, 23) - 0.5) * 2.6 : -3.4 + hash01(i, 24) * 6.6,
      sx: water ? 0.45 + hash01(i, 25) * 0.52 : 0.12 + hash01(i, 26) * 0.28,
      sy: water ? 0.06 + hash01(i, 27) * 0.06 : 0.1 + hash01(i, 28) * 0.22,
      r: flower ? 0.85 + hash01(i, 29) * 0.12 : water ? 0.44 : 0.28 + hash01(i, 30) * 0.24,
      g: flower ? 0.38 + hash01(i, 31) * 0.28 : water ? 0.68 : 0.5 + hash01(i, 32) * 0.22,
      b: flower ? 0.52 + hash01(i, 33) * 0.22 : water ? 0.8 : 0.28 + hash01(i, 34) * 0.18,
      a: water ? 0.18 : 0.28 + hash01(i, 35) * 0.22,
      seed: hash01(i, 36),
      kind: water ? 2 : 1,
    });
  }
  return out;
}

function mat(scene: Scene, name: string, color: Color3, alpha = 1, specular = Color3.Black()) {
  const m = new StandardMaterial(`ag-${name}-mat`, scene);
  m.diffuseColor = color;
  m.specularColor = specular;
  m.alpha = alpha;
  return m;
}

function makeSplatTexture(scene: Scene) {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(48, 48, 0, 48, 48, 47);
    g.addColorStop(0, "rgba(255,255,255,0.98)");
    g.addColorStop(0.45, "rgba(255,255,255,0.48)");
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

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}
