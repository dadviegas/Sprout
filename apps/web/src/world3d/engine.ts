/* Academia dos Elementos 3D — the Babylon engine (same shape as oeste3d): a big
 * open world with a platforming climb up to the Dragão's peak, snow mountains, a
 * gradient sky, glowing Cristais de Saber to collect, and the SVG-sprite cast.
 *
 * React (Academia3D.tsx) draws the HUD/overlays and feeds input (move/jump); the
 * engine runs the world, the third-person camera, the jump physics + platform
 * collision, crystal pickups and proximity interaction. Disposed on unmount.
 * Babylon ships only in this lazy chunk, never in the main bundle. */
import {
  Engine,
  Scene,
  Vector3,
  Color3,
  Color4,
  FreeCamera,
  HemisphericLight,
  DirectionalLight,
  GlowLayer,
  Mesh,
} from "@babylonjs/core";
import type { ElementId } from "../world/world-data";
import { type Character } from "./character";
import { createHeroSprite, createMasterSprite, createDragonSprite } from "./sprites";
import {
  OBJECTS,
  PLATFORMS,
  CRYSTALS,
  BOUNDS,
  buildScenery,
  buildPlatforms,
  buildCrystal,
  buildProp,
} from "./map";

export interface Nearby {
  id: string;
  label: string;
  locked: boolean;
}

export interface Academia3DConfig {
  element: ElementId;
  lockedIds: string[];
  onNearby: (n: Nearby | null) => void;
  onCrystals: (count: number) => void;
}

const WALK_SPEED = 8;
const GRAVITY = 26;
const JUMP_V = 9.8;
const CAM_DISTANCE = 12;
const CAM_HEIGHT = 6.5;
const CAM_LERP = 0.1;
const INTERACT_RADIUS = 3;

interface Placed {
  id: string;
  label: string;
  locked: boolean;
  pos: Vector3;
}
interface CrystalMesh {
  mesh: Mesh;
  pos: Vector3;
  taken: boolean;
}

export class Academia3DEngine {
  private engine: Engine;
  private scene: Scene;
  private camera: FreeCamera;
  private hero: Character;
  private animated: Character[] = [];
  private placed: Placed[] = [];
  private crystals: CrystalMesh[] = [];
  private pos = new Vector3(0, 0, 0);
  private velY = 0;
  private grounded = true;
  private move = { x: 0, y: 0 };
  private jumpQueued = false;
  private t = 0;
  private crystalCount = 0;
  private nearbyId: string | null = null;
  private cfg: Academia3DConfig;

  constructor(canvas: HTMLCanvasElement, cfg: Academia3DConfig) {
    this.cfg = cfg;
    this.engine = new Engine(canvas, true, { preserveDrawingBuffer: false }, true);
    this.engine.setHardwareScalingLevel(Math.min(window.devicePixelRatio || 1, 2) > 1.5 ? 1.25 : 1);

    this.scene = new Scene(this.engine);
    this.scene.clearColor = Color4.FromHexString("#bfe6ffff");
    this.scene.fogMode = Scene.FOGMODE_EXP2;
    this.scene.fogColor = new Color3(0.78, 0.9, 1);
    this.scene.fogDensity = 0.006;

    this.camera = new FreeCamera("cam", new Vector3(0, CAM_HEIGHT, -CAM_DISTANCE), this.scene);
    this.camera.setTarget(new Vector3(0, 1.2, 0));

    const hemi = new HemisphericLight("hemi", new Vector3(0.3, 1, 0.2), this.scene);
    hemi.intensity = 0.95;
    hemi.groundColor = new Color3(0.55, 0.6, 0.5);
    const sun = new DirectionalLight("sun", new Vector3(-0.4, -1, 0.5), this.scene);
    sun.intensity = 0.5;
    const glow = new GlowLayer("glow", this.scene);
    glow.intensity = 0.55;

    buildScenery(this.scene);
    buildPlatforms(this.scene);
    for (const c of CRYSTALS) this.crystals.push({ mesh: buildCrystal(this.scene, c), pos: new Vector3(c.x, c.y, c.z), taken: false });

    for (const o of OBJECTS) {
      const locked = cfg.lockedIds.includes(o.id);
      const pos = new Vector3(o.x, o.y, o.z);
      this.placed.push({ id: o.id, label: o.label, locked, pos });
      const faceCentre = Math.atan2(-o.x, -o.z);
      if (o.kind === "mestre") {
        const m = createMasterSprite(this.scene);
        m.root.position = pos;
        this.animated.push(m);
      } else if (o.kind === "dragon") {
        const d = createDragonSprite(this.scene);
        d.root.position = pos;
        this.animated.push(d);
      } else {
        const prop = buildProp(this.scene, o.kind, locked);
        prop.position = pos;
        prop.rotation.y = faceCentre;
      }
    }

    this.hero = createHeroSprite(this.scene, cfg.element);
    this.animated.push(this.hero);

    this.engine.runRenderLoop(() => {
      this.update(Math.min(0.05, this.engine.getDeltaTime() / 1000));
      this.scene.render();
    });
  }

  setMove(x: number, y: number) {
    this.move.x = x;
    this.move.y = y;
  }
  jump() {
    this.jumpQueued = true;
  }

  /** Highest platform surface the hero can stand on at (x,z), given current y. */
  private groundAt(x: number, z: number, y: number): number {
    let g = 0;
    for (const p of PLATFORMS) {
      if (Math.abs(x - p.x) <= p.w / 2 && Math.abs(z - p.z) <= p.d / 2 && p.top <= y + 0.4) {
        if (p.top > g) g = p.top;
      }
    }
    return g;
  }

  private update(dt: number) {
    this.t += dt;

    // horizontal movement (screen up = +Z, away from camera)
    const wx = this.move.x;
    const wz = -this.move.y;
    const len = Math.min(1, Math.hypot(wx, wz));
    if (len > 0.05) {
      const nx = wx / (len || 1);
      const nz = wz / (len || 1);
      this.pos.x = clamp(this.pos.x + nx * WALK_SPEED * dt * len, BOUNDS.minX, BOUNDS.maxX);
      this.pos.z = clamp(this.pos.z + nz * WALK_SPEED * dt * len, BOUNDS.minZ, BOUNDS.maxZ);
    }

    // jump + gravity + platform landing
    if (this.jumpQueued) {
      if (this.grounded) this.velY = JUMP_V;
      this.jumpQueued = false;
    }
    this.velY -= GRAVITY * dt;
    this.pos.y += this.velY * dt;
    const groundY = this.groundAt(this.pos.x, this.pos.z, this.pos.y);
    if (this.pos.y <= groundY) {
      this.pos.y = groundY;
      this.velY = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }

    this.hero.root.position.copyFrom(this.pos);

    // camera follows in 3 dimensions so the climb stays in frame
    const desired = new Vector3(this.pos.x, this.pos.y + CAM_HEIGHT, this.pos.z - CAM_DISTANCE);
    this.camera.position = Vector3.Lerp(this.camera.position, desired, CAM_LERP);
    this.camera.setTarget(new Vector3(this.pos.x, this.pos.y + 1.6, this.pos.z + 2));

    for (const c of this.animated) c.update(this.t, c === this.hero ? len : 0);

    this.spinCrystals();
    this.detectNearby();
  }

  private spinCrystals() {
    for (const c of this.crystals) {
      if (c.taken) continue;
      c.mesh.rotation.y = this.t * 2;
      c.mesh.position.y = c.pos.y + Math.sin(this.t * 2 + c.pos.x) * 0.15;
      if (Vector3.Distance(this.pos, c.pos) < 1.3) {
        c.taken = true;
        c.mesh.dispose();
        this.crystalCount += 1;
        this.cfg.onCrystals(this.crystalCount);
      }
    }
  }

  private detectNearby() {
    let best: Placed | null = null;
    let bestD = INTERACT_RADIUS;
    for (const p of this.placed) {
      const d = Vector3.Distance(this.pos, p.pos);
      if (d <= bestD) {
        bestD = d;
        best = p;
      }
    }
    const id = best?.id ?? null;
    if (id !== this.nearbyId) {
      this.nearbyId = id;
      this.cfg.onNearby(best ? { id: best.id, label: best.label, locked: best.locked } : null);
    }
  }

  resize() {
    this.engine.resize();
  }
  dispose() {
    this.engine.stopRenderLoop();
    this.scene.dispose();
    this.engine.dispose();
  }
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}
