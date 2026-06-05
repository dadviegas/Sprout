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
  ShadowGenerator,
  GlowLayer,
  Mesh,
} from "@babylonjs/core";
import type { ElementId } from "../world/world-data";
import { createHero, createMaster, createDragon, type Character } from "./character";
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
const JUMP_V = 10.5;
const TURN_LERP = 0.2;
const CAM_DISTANCE = 10;
const CAM_HEIGHT = 7;
const CAM_LERP = 0.1;
const INTERACT_RADIUS = 3;
const LANDING_FUDGE = 0.65;
const SIDE_BLOCK_FUDGE = 0.55;
const CLIMB_CAMERA_YAW = 0;

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
  private angle = 0; // hero facing
  private camYaw = 0; // camera trails behind this yaw
  private move = { x: 0, y: 0 };
  private shadow!: ShadowGenerator;
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
    this.scene.ambientColor = new Color3(0.45, 0.47, 0.5);
    this.scene.fogMode = Scene.FOGMODE_EXP2;
    this.scene.fogColor = new Color3(0.78, 0.9, 1);
    this.scene.fogDensity = 0.005;

    this.camera = new FreeCamera("cam", new Vector3(0, CAM_HEIGHT, -CAM_DISTANCE), this.scene);
    this.camera.setTarget(new Vector3(0, 1.2, 0));

    const hemi = new HemisphericLight("hemi", new Vector3(0.3, 1, 0.2), this.scene);
    hemi.intensity = 0.8;
    hemi.groundColor = new Color3(0.5, 0.55, 0.45);
    // a positioned sun so it casts nice soft shadows (the xadrez3d look)
    const sun = new DirectionalLight("sun", new Vector3(-0.5, -1.1, 0.4), this.scene);
    sun.position = new Vector3(20, 40, -16);
    sun.intensity = 1.05;
    this.shadow = new ShadowGenerator(1024, sun);
    this.shadow.useBlurExponentialShadowMap = true;
    this.shadow.blurScale = 2;
    const glow = new GlowLayer("glow", this.scene);
    glow.intensity = 0.8;

    buildScenery(this.scene);
    buildPlatforms(this.scene);
    for (const c of CRYSTALS) this.crystals.push({ mesh: buildCrystal(this.scene, c), pos: new Vector3(c.x, c.y, c.z), taken: false });

    for (const o of OBJECTS) {
      const locked = cfg.lockedIds.includes(o.id);
      const pos = new Vector3(o.x, o.y, o.z);
      this.placed.push({ id: o.id, label: o.label, locked, pos });
      const faceCentre = Math.atan2(-o.x, -o.z);
      if (o.kind === "mestre") {
        const m = createMaster(this.scene);
        m.root.position = pos;
        m.root.rotation.y = faceCentre;
        this.animated.push(m);
      } else if (o.kind === "dragon") {
        const d = createDragon(this.scene);
        d.root.position = pos;
        d.root.rotation.y = faceCentre;
        this.animated.push(d);
      } else {
        const prop = buildProp(this.scene, o.kind, locked);
        prop.position = pos;
        prop.rotation.y = faceCentre;
      }
    }

    this.hero = createHero(this.scene, cfg.element);
    this.animated.push(this.hero);

    this.setupShadows();

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

  /** Everything casts a soft shadow; the ground and platform tops receive them. */
  private setupShadows() {
    const receivers = new Set(["ground", "plaza"]);
    for (const m of this.scene.meshes) {
      const n = m.name;
      if (n === "sky" || n === "sun") continue;
      if (receivers.has(n) || n.startsWith("plazaRing") || n.startsWith("plat")) {
        m.receiveShadows = true;
        continue;
      }
      this.shadow.addShadowCaster(m);
    }
  }

  /** Highest platform surface the hero can stand on at (x,z), given current y. */
  private groundAt(x: number, z: number, y: number): number {
    let g = 0;
    for (const p of PLATFORMS) {
      if (Math.abs(x - p.x) <= p.w / 2 && Math.abs(z - p.z) <= p.d / 2 && p.top <= y + LANDING_FUDGE) {
        if (p.top > g) g = p.top;
      }
    }
    return g;
  }

  /** Prevent the child from walking through the side of a terrace while still on
   *  the lower ground. They can enter only once the jump has lifted them near
   *  the ledge height, which makes the mountain feel solid instead of hollow. */
  private blockedByTerraceSide(x: number, z: number, y: number): boolean {
    for (const p of PLATFORMS) {
      const inside = Math.abs(x - p.x) <= p.w / 2 - 0.12 && Math.abs(z - p.z) <= p.d / 2 - 0.12;
      if (inside && y < p.top - SIDE_BLOCK_FUDGE) return true;
    }
    return false;
  }

  private update(dt: number) {
    this.t += dt;

    // movement is CAMERA-RELATIVE: "up" on the stick walks the hero into the
    // screen (away from the camera), so jumps toward platforms are easy to judge.
    const ix = this.move.x; // right
    const iz = -this.move.y; // forward (up on the stick)
    const len = Math.min(1, Math.hypot(ix, iz));
    if (len > 0.05) {
      const cy = this.camYaw;
      let dx = Math.sin(cy) * iz + Math.cos(cy) * ix;
      let dz = Math.cos(cy) * iz - Math.sin(cy) * ix;
      const dl = Math.hypot(dx, dz) || 1;
      dx /= dl;
      dz /= dl;
      const nx = clamp(this.pos.x + dx * WALK_SPEED * dt * len, BOUNDS.minX, BOUNDS.maxX);
      const nz = clamp(this.pos.z + dz * WALK_SPEED * dt * len, BOUNDS.minZ, BOUNDS.maxZ);
      if (!this.blockedByTerraceSide(nx, nz, this.pos.y)) {
        this.pos.x = nx;
        this.pos.z = nz;
      } else if (!this.blockedByTerraceSide(nx, this.pos.z, this.pos.y)) {
        this.pos.x = nx;
      } else if (!this.blockedByTerraceSide(this.pos.x, nz, this.pos.y)) {
        this.pos.z = nz;
      }
      this.angle = lerpAngle(this.angle, Math.atan2(dx, dz), TURN_LERP);
    }
    // Keep the camera aligned with the mountain path. On touch screens, a stable
    // forward direction matters more than cinematic rotation.
    this.camYaw = lerpAngle(this.camYaw, CLIMB_CAMERA_YAW, 0.08);

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
    this.hero.root.rotation.y = this.angle;

    // third-person follow: camera sits behind the hero (camYaw) and a bit above
    const camX = this.pos.x - Math.sin(this.camYaw) * CAM_DISTANCE;
    const camZ = this.pos.z - Math.cos(this.camYaw) * CAM_DISTANCE;
    const desired = new Vector3(camX, this.pos.y + CAM_HEIGHT, camZ);
    this.camera.position = Vector3.Lerp(this.camera.position, desired, CAM_LERP);
    this.camera.setTarget(new Vector3(this.pos.x, this.pos.y + 1.3, this.pos.z));

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
function lerpAngle(a: number, b: number, t: number): number {
  let diff = b - a;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return a + diff * t;
}
