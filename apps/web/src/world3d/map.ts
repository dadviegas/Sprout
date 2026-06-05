/* Academia dos Elementos 3D — the world: a big open courtyard that climbs north
 * through broad mountain terraces up to a peak where the Dragão do Caos waits,
 * ringed by snow-capped mountains, with Cristais de Saber to collect and a
 * glowing sky. The climb is intentionally wide and readable on iPad. */
import {
  Scene,
  Vector3,
  Color3,
  MeshBuilder,
  StandardMaterial,
  TransformNode,
  Mesh,
  DynamicTexture,
} from "@babylonjs/core";

export type Object3DKind = "study" | "missions" | "mestre" | "dragon" | "pets" | "house";

export interface Object3D {
  id: string;
  kind: Object3DKind;
  x: number;
  y: number;
  z: number;
  /** interaction verb (button label when nearby) */
  label: string;
}

/** A platform you can stand and jump on (axis-aligned, `top` is its surface y). */
export interface Platform {
  x: number;
  z: number;
  top: number;
  w: number;
  d: number;
  color: string;
}

export interface Crystal {
  x: number;
  y: number;
  z: number;
}

/** World bounds (the hero can't wander past these). */
export const BOUNDS = { minX: -38, maxX: 38, minZ: -26, maxZ: 52 };

/** Broad mountain terraces. They overlap slightly, so the climb feels like a
 *  readable hillside path instead of a punishing precision-platformer. */
export const PLATFORMS: Platform[] = [
  { x: 0, z: 13, top: 0.85, w: 10, d: 5.8, color: "#74c86b" },
  { x: 0, z: 16.8, top: 1.7, w: 10.5, d: 5.8, color: "#62bf75" },
  { x: 0, z: 20.6, top: 2.55, w: 11, d: 5.8, color: "#58b884" },
  { x: 0, z: 24.4, top: 3.4, w: 11.5, d: 5.8, color: "#50ad91" },
  { x: 0, z: 28.2, top: 4.25, w: 12, d: 5.8, color: "#58a6a2" },
  { x: 0, z: 32, top: 5.1, w: 12.5, d: 5.8, color: "#75a06d" },
  { x: 0, z: 36.5, top: 5.95, w: 15, d: 8.5, color: "#9b965f" }, // the peak — the dragon sits here
];

export const DRAGON_PEAK_Y = 5.95;

export const CRYSTALS: Crystal[] = [
  // one floating over each terrace, plus a few around the plaza
  { x: 0, y: 1.85, z: 13 }, { x: 0, y: 2.7, z: 16.8 }, { x: 0, y: 3.55, z: 20.6 },
  { x: 0, y: 4.4, z: 24.4 }, { x: 0, y: 5.25, z: 28.2 }, { x: 0, y: 6.1, z: 32 },
  { x: -6, y: 1.4, z: 4 }, { x: 6, y: 1.4, z: 4 }, { x: 0, y: 1.4, z: 9 },
  { x: -10, y: 1.4, z: -4 }, { x: 10, y: 1.4, z: -4 },
];

export const OBJECTS: Object3D[] = [
  { id: "study", kind: "study", x: -7, y: 0, z: 11, label: "Entrar" },
  { id: "mestre", kind: "mestre", x: -13, y: 0, z: 2, label: "Falar" },
  { id: "missions", kind: "missions", x: 13, y: 0, z: 2, label: "Ver missões" },
  { id: "pets", kind: "pets", x: -11, y: 0, z: -9, label: "Ver" },
  { id: "house", kind: "house", x: 11, y: 0, z: -9, label: "Entrar" },
  { id: "dragon", kind: "dragon", x: 0, y: DRAGON_PEAK_Y, z: 37, label: "Lutar" },
];

interface Mountain { x: number; z: number; r: number; h: number; }
const MOUNTAINS: Mountain[] = [
  { x: -30, z: 34, r: 14, h: 24 }, { x: 32, z: 40, r: 16, h: 28 },
  { x: -28, z: -16, r: 12, h: 18 }, { x: 30, z: -12, r: 12, h: 18 },
  { x: 0, z: 60, r: 22, h: 34 }, { x: -16, z: 52, r: 12, h: 20 }, { x: 18, z: 54, r: 13, h: 22 },
];

function mat(scene: Scene, hex: string, glow = 0): StandardMaterial {
  const m = new StandardMaterial(`map${hex}${glow}`, scene);
  const c = Color3.FromHexString(hex);
  m.diffuseColor = c;
  m.specularColor = new Color3(0.04, 0.04, 0.04);
  if (glow > 0) m.emissiveColor = c.scale(glow);
  return m;
}
function outline(mesh: Mesh): Mesh {
  mesh.renderOutline = true;
  mesh.outlineColor = new Color3(0.12, 0.14, 0.2);
  mesh.outlineWidth = 0.06;
  return mesh;
}

/** A big vertical-gradient sky dome (rendered behind everything) for atmosphere. */
function buildSky(scene: Scene): void {
  const dome = MeshBuilder.CreateSphere("sky", { diameter: 320, segments: 16, sideOrientation: Mesh.BACKSIDE }, scene);
  const tex = new DynamicTexture("skytex", { width: 8, height: 256 }, scene, false);
  const ctx = tex.getContext() as CanvasRenderingContext2D;
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "#bfe6ff");
  grad.addColorStop(0.55, "#9fd3ff");
  grad.addColorStop(1, "#e8f6ff");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 8, 256);
  tex.update();
  const m = new StandardMaterial("skymat", scene);
  m.emissiveTexture = tex;
  m.disableLighting = true;
  m.backFaceCulling = false;
  dome.material = m;
  dome.infiniteDistance = true;
}

/** Ground, plaza, mountains, trees, clouds and a sun — the spectacular stage. */
export function buildScenery(scene: Scene): void {
  buildSky(scene);

  const ground = MeshBuilder.CreateGround("ground", { width: 200, height: 200 }, scene);
  ground.material = mat(scene, "#84cf6a");
  ground.position.y = -0.02;

  // central plaza disc (warm sand stone)
  const plaza = MeshBuilder.CreateDisc("plaza", { radius: 17, tessellation: 56 }, scene);
  plaza.material = mat(scene, "#e9d6a6");
  plaza.rotation.x = Math.PI / 2;
  plaza.position.y = 0;

  // a little pond off to the side for life
  const pond = MeshBuilder.CreateDisc("pond", { radius: 4, tessellation: 32 }, scene);
  pond.material = mat(scene, "#4ec3e6", 0.15);
  pond.rotation.x = Math.PI / 2;
  pond.position = new Vector3(-15, 0.02, -14);

  // flower dots ringing the plaza
  const flowerColors = ["#ff6f91", "#ffd23f", "#ff8c42", "#c479f0", "#5ad6ff"];
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2;
    const r = 14 + (i % 3) * 1.5;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r + 6;
    if (z > 12 && Math.abs(x) < 9) continue; // keep the climbing path clear
    const stem = MeshBuilder.CreateCylinder(`stem${i}`, { height: 0.5, diameter: 0.08 }, scene);
    stem.material = mat(scene, "#3f8f43");
    stem.position = new Vector3(x, 0.25, z);
    const bloom = MeshBuilder.CreateSphere(`bloom${i}`, { diameter: 0.34, segments: 8 }, scene);
    bloom.material = mat(scene, flowerColors[i % flowerColors.length], 0.2);
    bloom.position = new Vector3(x, 0.55, z);
  }

  // sun
  const sun = MeshBuilder.CreateSphere("sun", { diameter: 7, segments: 12 }, scene);
  sun.material = mat(scene, "#fff0b0", 0.9);
  sun.position = new Vector3(-40, 38, 70);
  sun.infiniteDistance = true;

  // snow-capped mountains
  const rock = mat(scene, "#8e8f9e");
  const rock2 = mat(scene, "#76788a");
  const snow = mat(scene, "#f4f8ff", 0.1);
  MOUNTAINS.forEach((mt, i) => {
    const cone = outline(MeshBuilder.CreateCylinder(`mt${i}`, { height: mt.h, diameterBottom: mt.r * 2, diameterTop: 0, tessellation: 7 }, scene));
    cone.material = i % 2 ? rock2 : rock;
    cone.position = new Vector3(mt.x, mt.h / 2 - 1, mt.z);
    const cap = MeshBuilder.CreateCylinder(`cap${i}`, { height: mt.h * 0.28, diameterBottom: mt.r * 0.7, diameterTop: 0, tessellation: 7 }, scene);
    cap.material = snow;
    cap.position = new Vector3(mt.x, mt.h - 1 - mt.h * 0.14, mt.z);
  });

  // trees ringing the plaza
  const trunkMat = mat(scene, "#8a5a2b");
  const leafMat = mat(scene, "#4f9e52");
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const r = 20 + (i % 3) * 2;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r + 8;
    if (z > 12 && Math.abs(x) < 8) continue; // keep the climbing path clear
    const trunk = MeshBuilder.CreateCylinder(`trunk${i}`, { height: 1.4, diameter: 0.5 }, scene);
    trunk.material = trunkMat;
    trunk.position = new Vector3(x, 0.7, z);
    const leaf = outline(MeshBuilder.CreateSphere(`leaf${i}`, { diameter: 2.4, segments: 8 }, scene));
    leaf.material = leafMat;
    leaf.position = new Vector3(x, 2.2, z);
  }

  // fluffy clouds
  const cloud = mat(scene, "#ffffff", 0.2);
  for (let i = 0; i < 7; i++) {
    const cx = -40 + i * 13;
    const cy = 20 + (i % 3) * 4;
    const cz = -10 + (i % 4) * 18;
    for (const [dx, dy, s] of [[0, 0, 1], [2.2, -0.4, 0.8], [-2.2, -0.3, 0.8], [1, 0.6, 0.7]] as const) {
      const puff = MeshBuilder.CreateSphere(`cloud${i}`, { diameter: 4 * s, segments: 8 }, scene);
      puff.material = cloud;
      puff.position = new Vector3(cx + dx * 1.6, cy + dy, cz);
    }
  }
}

/** Build the climb as mountain terraces, not box columns. The physics still uses
 *  the simple platform data, but the visuals read as earthy ledges. */
export function buildPlatforms(scene: Scene): void {
  const side = mat(scene, "#7a6b4f");
  const grass = mat(scene, "#8bd56f");
  PLATFORMS.forEach((p, i) => {
    const mound = outline(MeshBuilder.CreateCylinder(`plat${i}`, {
      height: Math.max(0.35, p.top + 0.35),
      diameterBottom: Math.max(p.w, p.d) * 1.38,
      diameterTop: Math.max(p.w, p.d) * 0.92,
      tessellation: 10,
    }, scene));
    mound.material = i > 4 ? mat(scene, "#8b7b62") : side;
    mound.scaling.x = p.w / Math.max(p.w, p.d);
    mound.scaling.z = p.d / Math.max(p.w, p.d);
    mound.position = new Vector3(p.x, (p.top - 0.35) / 2, p.z);

    const cap = outline(MeshBuilder.CreateCylinder(`platcap${i}`, {
      height: 0.22,
      diameter: Math.max(p.w, p.d) * 0.94,
      tessellation: 18,
    }, scene));
    cap.material = i === PLATFORMS.length - 1 ? mat(scene, "#c7b06a") : grass;
    cap.scaling.x = p.w / Math.max(p.w, p.d);
    cap.scaling.z = p.d / Math.max(p.w, p.d);
    cap.position = new Vector3(p.x, p.top - 0.09, p.z);
  });
}

/** A floating, spinning Cristal de Saber. Returns the mesh so the engine can spin
 *  it and remove it when collected. */
export function buildCrystal(scene: Scene, c: Crystal): Mesh {
  const m = MeshBuilder.CreatePolyhedron("crystal", { type: 1, size: 0.35 }, scene);
  m.material = mat(scene, "#5ad6ff", 0.7);
  m.position = new Vector3(c.x, c.y, c.z);
  return m;
}

/** Build a static prop for one object kind, at the origin (engine positions it). */
export function buildProp(scene: Scene, kind: Object3DKind, locked: boolean): TransformNode {
  const root = new TransformNode(`prop-${kind}`, scene);
  if (kind === "study") {
    const arch = mat(scene, "#3b6fd4");
    for (const side of [-1, 1]) {
      const pillar = outline(MeshBuilder.CreateCylinder("pillar", { height: 3, diameter: 0.5 }, scene));
      pillar.material = arch;
      pillar.parent = root;
      pillar.position = new Vector3(1.1 * side, 1.5, 0);
    }
    const top = outline(MeshBuilder.CreateTorus("archtop", { diameter: 2.6, thickness: 0.4, tessellation: 20 }, scene));
    top.material = arch;
    top.parent = root;
    top.position = new Vector3(0, 3, 0);
    top.scaling = new Vector3(1, 1, 0.4);
    const portal = MeshBuilder.CreateDisc("portal", { radius: 1.1, tessellation: 24 }, scene);
    portal.material = mat(scene, "#9fd0ff", 0.7);
    portal.parent = root;
    portal.position = new Vector3(0, 1.7, 0);
  } else if (kind === "missions") {
    const post = mat(scene, "#8a5a2b");
    for (const side of [-1, 1]) {
      const p = MeshBuilder.CreateCylinder("post", { height: 2, diameter: 0.18 }, scene);
      p.material = post;
      p.parent = root;
      p.position = new Vector3(0.7 * side, 1, 0);
    }
    const board = outline(MeshBuilder.CreateBox("board", { width: 2, height: 1.3, depth: 0.14 }, scene));
    board.material = mat(scene, "#c79a5e");
    board.parent = root;
    board.position = new Vector3(0, 2, 0);
    const star = MeshBuilder.CreateDisc("boardStar", { radius: 0.35, tessellation: 5 }, scene);
    star.material = mat(scene, "#ffce3a", 0.5);
    star.parent = root;
    star.position = new Vector3(0, 2, 0.1);
  } else if (kind === "house") {
    const wallHex = locked ? "#8d99a6" : "#e0a86b";
    const walls = outline(MeshBuilder.CreateBox("walls", { width: 3, height: 2.2, depth: 3 }, scene));
    walls.material = mat(scene, wallHex);
    walls.parent = root;
    walls.position = new Vector3(0, 1.1, 0);
    const roof = outline(MeshBuilder.CreateCylinder("roof", { height: 1.5, diameterBottom: 2.4, diameterTop: 0, tessellation: 4 }, scene));
    roof.material = mat(scene, locked ? "#6b7682" : "#b5562f");
    roof.parent = root;
    roof.position = new Vector3(0, 3, 0);
    roof.rotation.y = Math.PI / 4;
  } else if (kind === "pets") {
    const nest = outline(MeshBuilder.CreateTorus("nest", { diameter: 2, thickness: 0.6, tessellation: 16 }, scene));
    nest.material = mat(scene, "#a9743f");
    nest.parent = root;
    nest.position = new Vector3(0, 0.4, 0);
    for (const dx of [-0.4, 0.4]) {
      const egg = MeshBuilder.CreateSphere("egg", { diameter: 0.6, segments: 10 }, scene);
      egg.material = mat(scene, locked ? "#cfd6dd" : "#f6e7c1");
      egg.parent = root;
      egg.position = new Vector3(dx, 0.6, 0);
      egg.scaling = new Vector3(1, 1.3, 1);
    }
  }
  if (locked) {
    const bar = MeshBuilder.CreateTorus("lock", { diameter: 0.5, thickness: 0.09, tessellation: 12 }, scene);
    bar.material = mat(scene, "#e8edf3", 0.3);
    bar.parent = root;
    bar.position = new Vector3(0, 3.4, 0);
  }
  return root;
}
