/* Velho Oeste 3D — the Babylon.js engine for the cowboy platformer. This file
 * owns EVERYTHING 3D: the scene, camera, lights, the procedural low-poly world
 * and characters, the character controller (run / jump / land), the enemies,
 * coins, the water-pistol spray, and the game loop. React (Oeste3D.tsx) only
 * draws the HUD on top and feeds input in via setMove/jump/squirt.
 *
 * Art is built procedurally from primitives (boxes/spheres/cylinders) in a
 * cartoon "toon" look — flat matte colours, black outlines, soft shadows. The
 * builders are deliberately isolated so each can later be swapped for a CC0 /
 * Mixamo `.glb` without touching the game logic — see ASSETS.md and the
 * `// GLB:` markers.
 *
 * Performance notes for iPad (the target): low poly counts, outlines only on the
 * few characters, shadows from a single directional light, capped hardware
 * scaling. Everything is disposed on unmount.
 *
 * Babylon is imported into this module, and Oeste3D.tsx is lazy-loaded by the
 * arcade hub, so the (large) 3D engine only ships in its own chunk that loads
 * when the child opens this game — never in the main bundle. */

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
  MeshBuilder,
  StandardMaterial,
  TransformNode,
  Mesh,
  GlowLayer,
  ParticleSystem,
  DynamicTexture,
  Scalar,
} from "@babylonjs/core";
import { sfx } from "../sfx";
import { loadBest, saveBest } from "../arcade";

export type Oeste3DPhase = "ready" | "playing" | "won" | "over";
export interface HudState {
  phase: Oeste3DPhase;
  coins: number;
  hearts: number;
  best: number;
}

const BEST_KEY = "sprout.oeste3d.best";
const HEARTS = 3;
const GRAVITY = 26; // world units / s²
const MOVE_SPEED = 7.5;
const JUMP_V = 11;
const KILL_Y = -10; // fall below this → lose a heart and respawn
const PLAYER_R = 0.5; // horizontal radius for platform/enemy tests

/* ---- the level (runs along +X; the saloon is the finish) ---- */
interface Platform {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  top: number;
  color: string;
}
interface CoinDef {
  x: number;
  y: number;
  z: number;
}
interface BanditDef {
  minX: number;
  maxX: number;
  z: number;
  top: number;
}
interface PropDef {
  kind: "cactus" | "barrel" | "rock";
  x: number;
  z: number;
  top: number;
}

const PLATFORMS: Platform[] = [
  { minX: -4, maxX: 8, minZ: -3.5, maxZ: 3.5, top: 0, color: "#cda36a" },
  { minX: 12, maxX: 17, minZ: -3, maxZ: 3, top: 0, color: "#cda36a" },
  { minX: 20, maxX: 24, minZ: -2.5, maxZ: 2.5, top: 1.6, color: "#c79a5e" },
  { minX: 27, maxX: 35, minZ: -3.5, maxZ: 3.5, top: 0, color: "#cda36a" },
  { minX: 38, maxX: 42, minZ: -2.5, maxZ: 2.5, top: 1.6, color: "#c79a5e" },
  { minX: 45, maxX: 60, minZ: -4, maxZ: 4, top: 0, color: "#cda36a" },
];
const COINS: CoinDef[] = [
  { x: 3, y: 1.4, z: 0 },
  { x: 10, y: 2.2, z: 0 }, // over the first gap
  { x: 14.5, y: 1.4, z: 0 },
  { x: 18.5, y: 2.6, z: 0 },
  { x: 22, y: 3.0, z: 0 },
  { x: 25.5, y: 2.6, z: 0 },
  { x: 30, y: 1.4, z: -1.5 },
  { x: 31.5, y: 1.4, z: 1.5 },
  { x: 40, y: 3.0, z: 0 },
  { x: 47, y: 1.4, z: 0 },
  { x: 50, y: 1.4, z: -2 },
  { x: 50, y: 1.4, z: 2 },
];
const BANDITS: BanditDef[] = [
  { minX: 28, maxX: 34, z: 0, top: 0 },
  { minX: 46, maxX: 56, z: 0, top: 0 },
];
const PROPS: PropDef[] = [
  { kind: "cactus", x: 0, z: -2.4, top: 0 },
  { kind: "barrel", x: 6, z: 2, top: 0 },
  { kind: "rock", x: 14, z: -1.8, top: 0 },
  { kind: "cactus", x: 33, z: 2.6, top: 0 },
  { kind: "barrel", x: 46, z: -3, top: 0 },
  { kind: "cactus", x: 58, z: 3, top: 0 },
];
const SALOON_X = 57;
const START_POS = new Vector3(0, 0.2, 0);

/* GLB: the manifest is empty, so every character is built procedurally below.
   To use downloaded models, drop files in apps/web/public/models/ and follow
   ASSETS.md — the builders are the only thing that changes. */

const hex = (s: string) => Color3.FromHexString(s);

interface Coin {
  mesh: Mesh;
  pos: Vector3;
  taken: boolean;
}
interface Bandit {
  root: TransformNode;
  def: BanditDef;
  x: number;
  dir: number;
  alive: boolean;
  flee: number; // >0 while running away after a squirt
}

export class Oeste3DGame {
  private engine: Engine;
  private scene: Scene;
  private camera: FreeCamera;
  private shadow: ShadowGenerator;
  private reduced: boolean;
  private onState: (s: HudState) => void;

  // player
  private player!: TransformNode;
  private gunTip!: TransformNode;
  private pos = START_POS.clone();
  private vel = new Vector3(0, 0, 0);
  private grounded = false;
  private facing = Math.PI / 2;
  private squirtT = 0; // seconds of spray left
  private invuln = 0;

  // input
  private moveX = 0;
  private moveZ = 0;
  private keys = new Set<string>();

  // state
  private phase: Oeste3DPhase = "ready";
  private coins = 0;
  private hearts = HEARTS;
  private best = loadBest(BEST_KEY);
  private last: HudState | null = null;

  private coinList: Coin[] = [];
  private bandits: Bandit[] = [];
  private water!: ParticleSystem;

  constructor(canvas: HTMLCanvasElement, opts: { reduced: boolean; onState: (s: HudState) => void }) {
    this.reduced = opts.reduced;
    this.onState = opts.onState;

    this.engine = new Engine(canvas, true, { stencil: true, preserveDrawingBuffer: false }, true);
    this.engine.setHardwareScalingLevel(Math.min(window.devicePixelRatio || 1, 2) > 1.5 ? 1.25 : 1);

    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.96, 0.78, 0.5, 1); // warm desert sky
    this.scene.ambientColor = new Color3(0.5, 0.45, 0.4);
    this.scene.fogMode = Scene.FOGMODE_EXP2;
    this.scene.fogColor = new Color3(0.96, 0.82, 0.6);
    this.scene.fogDensity = 0.012;

    this.camera = new FreeCamera("cam", new Vector3(-10, 7, 0), this.scene);
    this.camera.setTarget(new Vector3(0, 1.2, 0));

    const hemi = new HemisphericLight("hemi", new Vector3(0.2, 1, 0.1), this.scene);
    hemi.intensity = 0.85;
    hemi.groundColor = new Color3(0.6, 0.45, 0.3);
    const sun = new DirectionalLight("sun", new Vector3(-0.5, -1, 0.4), this.scene);
    sun.position = new Vector3(20, 40, -20);
    sun.intensity = 1.1;
    this.shadow = new ShadowGenerator(1024, sun);
    this.shadow.useBlurExponentialShadowMap = true;
    this.shadow.blurScale = 2;

    const glow = new GlowLayer("glow", this.scene);
    glow.intensity = 0.7;

    this.buildWorld();
    this.buildPlayer();
    this.buildWater();

    this.engine.runRenderLoop(() => {
      this.update(Math.min(0.05, this.engine.getDeltaTime() / 1000));
      this.scene.render();
    });
    this.emit();
  }

  /* ---------- world ---------- */
  private matte(color: string, emissive = false): StandardMaterial {
    const m = new StandardMaterial("m", this.scene);
    m.diffuseColor = hex(color);
    m.specularColor = Color3.Black(); // matte → toon
    if (emissive) m.emissiveColor = hex(color).scale(0.6);
    return m;
  }
  private cast(mesh: Mesh) {
    this.shadow.addShadowCaster(mesh);
  }
  private outline(mesh: Mesh) {
    mesh.renderOutline = true;
    mesh.outlineColor = new Color3(0.07, 0.05, 0.05);
    mesh.outlineWidth = 0.04;
  }

  private buildWorld() {
    // far desert floor + a hazy backdrop of mesas
    const floor = MeshBuilder.CreateGround("floor", { width: 220, height: 80 }, this.scene);
    floor.position.set(28, KILL_Y + 0.1, 0);
    floor.material = this.matte("#d8b074");
    floor.receiveShadows = true;
    for (let i = 0; i < 7; i++) {
      const mesa = MeshBuilder.CreateBox("mesa", { width: Scalar.Lerp(6, 14, Math.random()), height: Scalar.Lerp(8, 20, Math.random()), depth: 8 }, this.scene);
      mesa.position.set(-10 + i * 12 + Math.random() * 4, -2, -22 - Math.random() * 8);
      mesa.material = this.matte(i % 2 ? "#b9824e" : "#a9733f");
    }

    for (const p of PLATFORMS) {
      const w = p.maxX - p.minX;
      const d = p.maxZ - p.minZ;
      const h = p.top + 4; // extend down so it looks like a mesa column
      const box = MeshBuilder.CreateBox("plat", { width: w, height: h, depth: d }, this.scene);
      box.position.set((p.minX + p.maxX) / 2, p.top - h / 2, (p.minZ + p.maxZ) / 2);
      box.material = this.matte(p.color);
      box.receiveShadows = true;
      this.cast(box);
      // grassy/sandy cap line
      const cap = MeshBuilder.CreateBox("cap", { width: w, height: 0.25, depth: d }, this.scene);
      cap.position.set((p.minX + p.maxX) / 2, p.top - 0.1, (p.minZ + p.maxZ) / 2);
      cap.material = this.matte("#caa86e");
      cap.receiveShadows = true;
    }

    for (const pr of PROPS) this.buildProp(pr);
    for (const c of COINS) this.coinList.push(this.buildCoin(c));
    for (const b of BANDITS) this.bandits.push(this.buildBandit(b));
    this.buildSaloon();
  }

  private buildProp(pr: PropDef) {
    if (pr.kind === "cactus") {
      const trunk = MeshBuilder.CreateCylinder("cac", { height: 2.2, diameter: 0.6, tessellation: 8 }, this.scene);
      trunk.position.set(pr.x, pr.top + 1.1, pr.z);
      trunk.material = this.matte("#3f9d52");
      this.outline(trunk);
      this.cast(trunk);
      for (const s of [-1, 1]) {
        const arm = MeshBuilder.CreateCylinder("ca", { height: 0.9, diameter: 0.4, tessellation: 8 }, this.scene);
        arm.parent = trunk;
        arm.position.set(s * 0.45, 0.2, 0);
        arm.rotation.z = (s * Math.PI) / 2.4;
        arm.material = trunk.material;
      }
    } else if (pr.kind === "barrel") {
      const b = MeshBuilder.CreateCylinder("bar", { height: 1.1, diameter: 0.9, tessellation: 12 }, this.scene);
      b.position.set(pr.x, pr.top + 0.55, pr.z);
      b.material = this.matte("#8a5a2b");
      this.outline(b);
      this.cast(b);
    } else {
      const r = MeshBuilder.CreateSphere("rock", { diameter: 1.2, segments: 6 }, this.scene);
      r.scaling.y = 0.7;
      r.position.set(pr.x, pr.top + 0.35, pr.z);
      r.material = this.matte("#9b9087");
      this.outline(r);
      this.cast(r);
    }
  }

  private buildCoin(def: CoinDef): Coin {
    const mesh = MeshBuilder.CreateTorus("coin", { diameter: 0.7, thickness: 0.22, tessellation: 14 }, this.scene);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.set(def.x, def.y, def.z);
    mesh.material = this.matte("#ffcf3a", true);
    return { mesh, pos: new Vector3(def.x, def.y, def.z), taken: false };
  }

  // GLB: replace this builder with a glTF cowboy + Mixamo clips (see ASSETS.md).
  private buildCowboy(opts: { shirt: string; hat: string; bandit?: boolean }): { root: TransformNode; gun: TransformNode } {
    const root = new TransformNode("cowboy", this.scene);
    const add = (mesh: Mesh, color: string, outline = true) => {
      mesh.parent = root;
      mesh.material = this.matte(color);
      if (outline) this.outline(mesh);
      this.cast(mesh);
      return mesh;
    };
    // legs
    for (const s of [-1, 1]) {
      const leg = MeshBuilder.CreateBox("leg", { width: 0.28, height: 0.7, depth: 0.3 }, this.scene);
      leg.position.set(s * 0.18, 0.35, 0);
      add(leg, "#3a4a8c");
    }
    // body
    const body = MeshBuilder.CreateBox("body", { width: 0.7, height: 0.8, depth: 0.45 }, this.scene);
    body.position.y = 1.1;
    add(body, opts.shirt);
    // bandana
    const scarf = MeshBuilder.CreateBox("scarf", { width: 0.55, height: 0.18, depth: 0.4 }, this.scene);
    scarf.position.y = 1.5;
    add(scarf, opts.bandit ? "#444" : "#d23b3b");
    // arms
    for (const s of [-1, 1]) {
      const arm = MeshBuilder.CreateBox("arm", { width: 0.2, height: 0.6, depth: 0.22 }, this.scene);
      arm.position.set(s * 0.48, 1.15, 0);
      add(arm, opts.shirt);
    }
    // head
    const head = MeshBuilder.CreateSphere("head", { diameter: 0.55, segments: 10 }, this.scene);
    head.position.y = 1.78;
    add(head, "#e8b98c");
    // eyes (on +Z = forward)
    for (const s of [-1, 1]) {
      const eye = MeshBuilder.CreateSphere("eye", { diameter: 0.1, segments: 6 }, this.scene);
      eye.position.set(s * 0.12, 1.82, 0.26);
      add(eye, "#1c2530", false);
    }
    if (opts.bandit) {
      const mo = MeshBuilder.CreateBox("mo", { width: 0.3, height: 0.07, depth: 0.08 }, this.scene);
      mo.position.set(0, 1.7, 0.27);
      add(mo, "#2a1a0e", false);
    }
    // hat
    const brim = MeshBuilder.CreateCylinder("brim", { height: 0.08, diameter: 0.8, tessellation: 14 }, this.scene);
    brim.position.y = 2.02;
    add(brim, opts.hat);
    const crown = MeshBuilder.CreateCylinder("crown", { height: 0.34, diameterTop: 0.42, diameterBottom: 0.5, tessellation: 14 }, this.scene);
    crown.position.y = 2.2;
    add(crown, opts.hat);
    // water pistol in the right hand + a muzzle node for the spray
    const gun = MeshBuilder.CreateBox("gun", { width: 0.16, height: 0.16, depth: 0.4 }, this.scene);
    gun.parent = root;
    gun.position.set(0.5, 1.1, 0.3);
    gun.material = this.matte(opts.bandit ? "#555" : "#3a78c0");
    this.cast(gun);
    const tip = new TransformNode("tip", this.scene);
    tip.parent = root;
    tip.position.set(0.5, 1.1, 0.55);
    return { root, gun: tip };
  }

  private buildPlayer() {
    const { root, gun } = this.buildCowboy({ shirt: "#2f6df0", hat: "#7a4a1e" });
    this.player = root;
    this.gunTip = gun;
    this.player.position.copyFrom(this.pos);
  }

  private buildBandit(def: BanditDef): Bandit {
    const { root } = this.buildCowboy({ shirt: "#7a2f2f", hat: "#1c1c1c", bandit: true });
    const x = (def.minX + def.maxX) / 2;
    root.position.set(x, def.top, def.z);
    root.rotation.y = -Math.PI / 2; // face -X to start
    return { root, def, x, dir: 1, alive: true, flee: 0 };
  }

  private buildSaloon() {
    const base = MeshBuilder.CreateBox("saloon", { width: 6, height: 5, depth: 6 }, this.scene);
    base.position.set(SALOON_X, 2.5, 0);
    base.material = this.matte("#7a4a24");
    base.receiveShadows = true;
    this.cast(base);
    const roof = MeshBuilder.CreateBox("roof", { width: 6.6, height: 0.5, depth: 6.6 }, this.scene);
    roof.position.set(SALOON_X, 5.1, 0);
    roof.material = this.matte("#5c3417");
    // sign with "SALOON" via a dynamic texture
    const sign = MeshBuilder.CreatePlane("sign", { width: 4.2, height: 1.2 }, this.scene);
    sign.position.set(SALOON_X - 3.02, 3.6, 0);
    sign.rotation.y = -Math.PI / 2;
    const tex = new DynamicTexture("signtex", { width: 512, height: 146 }, this.scene, false);
    const ctx = tex.getContext() as unknown as CanvasRenderingContext2D;
    ctx.fillStyle = "#3a2010";
    ctx.fillRect(0, 0, 512, 146);
    ctx.fillStyle = "#ffd23a";
    ctx.font = "bold 92px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SALOON", 256, 80);
    tex.update();
    const sm = new StandardMaterial("signm", this.scene);
    sm.diffuseTexture = tex;
    sm.emissiveColor = new Color3(0.6, 0.5, 0.2);
    sm.specularColor = Color3.Black();
    sign.material = sm;
    // two swinging doors (visual)
    for (const s of [-1, 1]) {
      const door = MeshBuilder.CreateBox("door", { width: 1.2, height: 2, depth: 0.15 }, this.scene);
      door.position.set(SALOON_X - 3.0, 1.2, s * 0.7);
      door.material = this.matte("#9a6a39");
    }
  }

  private buildWater() {
    // a soft round droplet texture made on the fly (no asset file)
    const dot = new DynamicTexture("drop", { width: 64, height: 64 }, this.scene, false);
    const c = dot.getContext() as unknown as CanvasRenderingContext2D;
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.5, "rgba(180,225,255,0.9)");
    g.addColorStop(1, "rgba(120,190,255,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
    dot.update();
    dot.hasAlpha = true;

    const ps = new ParticleSystem("water", this.reduced ? 120 : 320, this.scene);
    ps.particleTexture = dot;
    ps.blendMode = ParticleSystem.BLENDMODE_STANDARD;
    ps.emitter = Vector3.Zero(); // moved to the gun muzzle each frame while spraying
    ps.minSize = 0.1;
    ps.maxSize = 0.28;
    ps.minLifeTime = 0.18;
    ps.maxLifeTime = 0.42;
    ps.emitRate = 0; // bursts only while squirting
    ps.color1 = new Color4(0.7, 0.9, 1, 1);
    ps.color2 = new Color4(0.4, 0.7, 1, 1);
    ps.colorDead = new Color4(0.4, 0.7, 1, 0);
    ps.gravity = new Vector3(0, -6, 0);
    ps.minEmitPower = 6;
    ps.maxEmitPower = 10;
    ps.updateSpeed = 0.02;
    ps.start();
    this.water = ps;
  }

  /* ---------- public API (called from React) ---------- */
  begin() {
    sfx.unlock();
    this.pos.copyFrom(START_POS);
    this.vel.setAll(0);
    this.grounded = false;
    this.facing = Math.PI / 2;
    this.invuln = 0;
    this.squirtT = 0;
    this.coins = 0;
    this.hearts = HEARTS;
    this.phase = "playing";
    for (const c of this.coinList) {
      c.taken = false;
      c.mesh.setEnabled(true);
    }
    for (const b of this.bandits) {
      b.alive = true;
      b.flee = 0;
      b.x = (b.def.minX + b.def.maxX) / 2;
      b.root.setEnabled(true);
      b.root.position.set(b.x, b.def.top, b.def.z);
    }
    sfx.start();
    this.emit();
  }

  setMove(x: number, z: number) {
    this.moveX = x;
    this.moveZ = z;
  }
  setKey(code: string, down: boolean) {
    if (down) this.keys.add(code);
    else this.keys.delete(code);
  }
  jump() {
    if (this.phase !== "playing") return;
    if (this.grounded) {
      this.vel.y = JUMP_V;
      this.grounded = false;
      sfx.jump(false);
    }
  }
  squirt() {
    if (this.phase !== "playing") return;
    this.squirtT = 0.35;
    sfx.squirt();
  }

  /* ---------- update loop ---------- */
  private update(dt: number) {
    if (dt <= 0) return;
    this.spinCoins(dt);

    if (this.phase === "playing") this.step(dt);
    else this.idleCamera(dt);

    this.updateWater();
  }

  private spinCoins(dt: number) {
    for (const c of this.coinList) if (!c.taken) c.mesh.rotation.y += dt * 3;
  }

  private idleCamera(dt: number) {
    // slow drift so the ready/over scene feels alive
    const t = performance.now() / 1000;
    const want = new Vector3(this.pos.x - 10 + Math.sin(t * 0.3) * 2, this.pos.y + 7, this.pos.z + Math.cos(t * 0.3) * 2);
    this.camera.position = Vector3.Lerp(this.camera.position, want, Math.min(1, dt * 1.5));
    this.camera.setTarget(new Vector3(this.pos.x, this.pos.y + 1.2, this.pos.z));
  }

  private step(dt: number) {
    // ---- input → desired horizontal velocity (camera looks down +X) ----
    let mx = this.moveX;
    let mz = this.moveZ;
    if (this.keys.has("ArrowUp") || this.keys.has("KeyW")) mz = -1;
    if (this.keys.has("ArrowDown") || this.keys.has("KeyS")) mz = 1;
    if (this.keys.has("ArrowLeft") || this.keys.has("KeyA")) mx = -1;
    if (this.keys.has("ArrowRight") || this.keys.has("KeyD")) mx = 1;
    // stick up (mz<0) = forward (+X); stick right = screen-right. The camera looks
    // down +X, so screen-right is −Z — hence the minus (without it left/right swap).
    let wx = -mz;
    let wz = -mx;
    const len = Math.hypot(wx, wz);
    if (len > 1) {
      wx /= len;
      wz /= len;
    }
    this.vel.x = wx * MOVE_SPEED;
    this.vel.z = wz * MOVE_SPEED;

    // face the direction of travel (lerp the angle the short way)
    if (len > 0.1) {
      const want = Math.atan2(this.vel.x, this.vel.z);
      let d = want - this.facing;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      this.facing += d * Math.min(1, dt * 12);
    }

    // ---- vertical physics + platform landing ----
    const prevY = this.pos.y;
    this.vel.y -= GRAVITY * dt;
    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    this.pos.y += this.vel.y * dt;

    this.grounded = false;
    for (const p of PLATFORMS) {
      if (this.pos.x < p.minX - PLAYER_R || this.pos.x > p.maxX + PLAYER_R) continue;
      if (this.pos.z < p.minZ - PLAYER_R || this.pos.z > p.maxZ + PLAYER_R) continue;
      if (this.vel.y <= 0 && prevY >= p.top - 0.01 && this.pos.y <= p.top) {
        this.pos.y = p.top;
        this.vel.y = 0;
        this.grounded = true;
      }
    }

    // fell off the world
    if (this.pos.y < KILL_Y) {
      this.loseHeart(true);
      if (this.phase !== "playing") return;
    }

    if (this.invuln > 0) this.invuln -= dt;
    if (this.squirtT > 0) this.squirtT -= dt;

    // ---- coins ----
    for (const c of this.coinList) {
      if (c.taken) continue;
      if (Vector3.DistanceSquared(this.pos.add(new Vector3(0, 1, 0)), c.pos) < 1.4) {
        c.taken = true;
        c.mesh.setEnabled(false);
        this.coins += 1;
        sfx.coin(this.coins - 1);
        this.emit();
      }
    }

    // ---- bandits ----
    this.updateBandits(dt);

    // ---- write transforms ----
    this.player.position.copyFrom(this.pos);
    this.player.rotation.y = this.facing;
    // a tiny run bob
    const moving = len > 0.1 && this.grounded;
    this.player.position.y = this.pos.y + (moving && !this.reduced ? Math.abs(Math.sin(performance.now() / 90)) * 0.08 : 0);
    if (this.invuln > 0) this.player.setEnabled(Math.floor(performance.now() / 90) % 2 === 0);
    else this.player.setEnabled(true);

    // ---- follow camera ----
    const want = new Vector3(this.pos.x - 10, this.pos.y + 7, this.pos.z);
    this.camera.position = Vector3.Lerp(this.camera.position, want, Math.min(1, dt * 6));
    this.camera.setTarget(new Vector3(this.pos.x + 2, this.pos.y + 1.2, this.pos.z));

    // ---- reached the saloon? ----
    if (this.pos.x >= SALOON_X - 3.2 && this.phase === "playing") {
      this.phase = "won";
      const score = this.coins;
      if (score > this.best) {
        this.best = score;
        saveBest(BEST_KEY, score);
      }
      sfx.fanfare();
      this.emit();
    }
  }

  private updateBandits(dt: number) {
    for (const b of this.bandits) {
      if (!b.alive) continue;
      if (b.flee > 0) {
        b.flee -= dt;
        b.root.position.y -= dt * 4; // sink away
        b.root.rotation.z += dt * 6;
        if (b.flee <= 0) {
          b.alive = false;
          b.root.setEnabled(false);
        }
        continue;
      }
      // patrol
      b.x += b.dir * 2.2 * dt;
      if (b.x > b.def.maxX) {
        b.x = b.def.maxX;
        b.dir = -1;
      } else if (b.x < b.def.minX) {
        b.x = b.def.minX;
        b.dir = 1;
      }
      b.root.position.x = b.x;
      b.root.rotation.y = b.dir > 0 ? Math.PI / 2 : -Math.PI / 2;

      const dx = this.pos.x - b.x;
      const dz = this.pos.z - b.def.z;
      const flat = Math.hypot(dx, dz);

      // squirt hit (player spraying & facing the bandit, within range)
      if (this.squirtT > 0 && flat < 4 && dx * Math.sin(this.facing) + dz * Math.cos(this.facing) > 0) {
        b.flee = 0.6;
        sfx.boing();
        continue;
      }
      // contact
      if (flat < 0.9) {
        const feet = this.pos.y;
        if (this.vel.y < 0 && feet > b.def.top + 1.0) {
          // stomp from above
          b.flee = 0.5;
          this.vel.y = JUMP_V * 0.7;
          sfx.boing();
        } else if (this.invuln <= 0) {
          this.loseHeart(false);
          // knockback
          this.vel.x = -Math.sign(dx || 1) * 6;
          this.vel.y = 6;
        }
      }
    }
  }

  private loseHeart(fell: boolean) {
    this.hearts -= 1;
    this.invuln = 1.3;
    sfx.hit();
    if (fell) {
      // respawn on the start platform
      this.pos.copyFrom(START_POS);
      this.vel.setAll(0);
    }
    if (this.hearts <= 0) {
      this.phase = "over";
      if (this.coins > this.best) {
        this.best = this.coins;
        saveBest(BEST_KEY, this.coins);
      }
      sfx.over();
    }
    this.emit();
  }

  private updateWater() {
    const spraying = this.squirtT > 0 && this.phase === "playing";
    this.water.emitRate = spraying ? (this.reduced ? 120 : 320) : 0;
    if (spraying) {
      this.gunTip.computeWorldMatrix(true);
      this.water.emitter = this.gunTip.getAbsolutePosition();
      const fx = Math.sin(this.facing);
      const fz = Math.cos(this.facing);
      this.water.direction1 = new Vector3(fx - 0.25, 0.1, fz - 0.25);
      this.water.direction2 = new Vector3(fx + 0.25, 0.4, fz + 0.25);
    }
  }

  private emit() {
    const s: HudState = { phase: this.phase, coins: this.coins, hearts: this.hearts, best: this.best };
    if (this.last && this.last.phase === s.phase && this.last.coins === s.coins && this.last.hearts === s.hearts && this.last.best === s.best) return;
    this.last = s;
    this.onState(s);
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
