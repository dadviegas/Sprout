/* Academia dos Elementos 3D — characters built from Babylon primitives, following
 * docs/SPROUT_WORLD_ACADEMIA_DOS_ELEMENTOS.md ("Construção 3D com primitivas").
 * No rig/skeleton: each character is a tree of TransformNodes animated by sine
 * (idle bob, arm swing, floating pet) so it has life on a low-end iPad.
 *
 * Proportions match the blueprint: big head, short rounded body, big boots, short
 * cloak, element emblem on the chest, a small floating pet companion. */
import {
  Scene,
  Vector3,
  Color3,
  MeshBuilder,
  StandardMaterial,
  TransformNode,
  Mesh,
} from "@babylonjs/core";
import type { ElementId } from "../world/world-data";

export interface HeroVisual {
  name: string;
  pet: string;
  primary: string;
  secondary: string;
  glow: string;
}

const SKIN = "#ffd9bd";

// Per-element palette + names, straight from the doc's character sheets.
export const VISUALS: Record<ElementId, HeroVisual> = {
  fire: { name: "Faísca", pet: "Fagulha", primary: "#ff6a3d", secondary: "#8b2430", glow: "#ffd166" },
  water: { name: "Maré", pet: "Gota", primary: "#2bb3e0", secondary: "#116a8c", glow: "#b7f3ff" },
  earth: { name: "Rochedo", pet: "Raiz", primary: "#5aa65c", secondary: "#6b4f2a", glow: "#bde27a" },
  air: { name: "Brisa", pet: "Sopro", primary: "#7fa9e0", secondary: "#dbeeff", glow: "#ffffff" },
  light: { name: "Lúmen", pet: "Brilho", primary: "#f0bd2e", secondary: "#fff3b0", glow: "#ffffff" },
};

/** A character that owns its own per-part idle/walk animation. */
export interface Character {
  root: TransformNode;
  /** advance the animation; speed01 is 0 (idle) … 1 (walking flat out) */
  update(time: number, speed01: number): void;
}

function mat(scene: Scene, hex: string, glow = 0): StandardMaterial {
  const m = new StandardMaterial(`m${hex}${glow}`, scene);
  const c = Color3.FromHexString(hex);
  m.diffuseColor = c;
  m.specularColor = new Color3(0.05, 0.05, 0.05);
  if (glow > 0) m.emissiveColor = c.scale(glow);
  return m;
}

/** Give a mesh the soft toon outline used across the 3D games. */
function outline(mesh: Mesh): Mesh {
  mesh.renderOutline = true;
  mesh.outlineColor = new Color3(0.1, 0.12, 0.16);
  mesh.outlineWidth = 0.02;
  return mesh;
}

/* ---- hero -------------------------------------------------------------- */

export function createHero(scene: Scene, element: ElementId): Character {
  const v = VISUALS[element];
  const root = new TransformNode(`hero-${element}`, scene);
  // Everything that bobs hangs off this; boots stay on the ground.
  const bob = new TransformNode("bob", scene);
  bob.parent = root;

  const skin = mat(scene, SKIN);
  const primary = mat(scene, v.primary);
  const secondary = mat(scene, v.secondary);
  const glow = mat(scene, v.glow, 0.5);

  // boots + legs
  for (const side of [-1, 1]) {
    const boot = outline(MeshBuilder.CreateBox("boot", { width: 0.3, height: 0.22, depth: 0.4 }, scene));
    boot.material = secondary;
    boot.parent = root;
    boot.position = new Vector3(0.22 * side, 0.11, 0.05);
    const leg = MeshBuilder.CreateCylinder("leg", { height: 0.4, diameter: 0.22 }, scene);
    leg.material = secondary;
    leg.parent = bob;
    leg.position = new Vector3(0.22 * side, 0.42, 0);
  }

  // body / short cloak (a rounded skirt cone + a torso sphere)
  const skirt = outline(MeshBuilder.CreateCylinder("skirt", { height: 0.6, diameterTop: 0.4, diameterBottom: 0.66, tessellation: 16 }, scene));
  skirt.material = primary;
  skirt.parent = bob;
  skirt.position = new Vector3(0, 0.85, 0);
  const torso = outline(MeshBuilder.CreateSphere("torso", { diameter: 0.6, segments: 12 }, scene));
  torso.material = primary;
  torso.parent = bob;
  torso.position = new Vector3(0, 1.02, 0);
  torso.scaling = new Vector3(1, 0.9, 0.85);

  // chest emblem (a small glowing disc)
  const emblem = MeshBuilder.CreateDisc("emblem", { radius: 0.12, tessellation: element === "light" ? 5 : 16 }, scene);
  emblem.material = glow;
  emblem.parent = bob;
  emblem.position = new Vector3(0, 1.02, 0.31);

  // arms on shoulder pivots (so they can swing)
  const arms: TransformNode[] = [];
  for (const side of [-1, 1]) {
    const pivot = new TransformNode("armPivot", scene);
    pivot.parent = bob;
    pivot.position = new Vector3(0.34 * side, 1.16, 0);
    const arm = MeshBuilder.CreateCylinder("arm", { height: 0.42, diameter: 0.15 }, scene);
    arm.material = primary;
    arm.parent = pivot;
    arm.position = new Vector3(0, -0.2, 0);
    const hand = MeshBuilder.CreateSphere("hand", { diameter: 0.18, segments: 8 }, scene);
    hand.material = skin;
    hand.parent = pivot;
    hand.position = new Vector3(0, -0.42, 0);
    arms.push(pivot);
  }

  // head + face
  const head = outline(MeshBuilder.CreateSphere("head", { diameter: 0.52, segments: 14 }, scene));
  head.material = skin;
  head.parent = bob;
  head.position = new Vector3(0, 1.4, 0);
  head.scaling = new Vector3(1, 0.92, 0.95);
  const eyeMat = mat(scene, "#243047");
  for (const side of [-1, 1]) {
    const eye = MeshBuilder.CreateSphere("eye", { diameter: 0.07, segments: 8 }, scene);
    eye.material = eyeMat;
    eye.parent = bob;
    eye.position = new Vector3(0.1 * side, 1.42, 0.23);
  }

  // element-specific crest on the head
  addCrest(scene, bob, element, primary, secondary, glow);

  // floating pet companion
  const petPivot = new TransformNode("petPivot", scene);
  petPivot.parent = root;
  const petBaseY = 1.1;
  petPivot.position = new Vector3(0.78, petBaseY, 0.1);
  const petBody = outline(MeshBuilder.CreateSphere("pet", { diameter: 0.3, segments: 10 }, scene));
  petBody.material = glow;
  petBody.parent = petPivot;
  petBody.scaling = new Vector3(1.1, 0.95, 1);
  for (const side of [-1, 1]) {
    const pe = MeshBuilder.CreateSphere("petEye", { diameter: 0.05, segments: 6 }, scene);
    pe.material = eyeMat;
    pe.parent = petPivot;
    pe.position = new Vector3(0.05 * side, 0.02, 0.14);
  }

  return {
    root,
    update(t, sp) {
      const bobAmp = 0.02 + sp * 0.06;
      bob.position.y = Math.sin(t * (4 + sp * 6)) * bobAmp;
      const swing = Math.sin(t * (4 + sp * 8)) * (0.12 + sp * 0.5);
      arms[0].rotation.x = swing;
      arms[1].rotation.x = -swing;
      petPivot.position.y = petBaseY + Math.sin(t * 2.4) * 0.12;
      petPivot.rotation.y = t * 0.7;
    },
  };
}

function addCrest(scene: Scene, parent: TransformNode, element: ElementId, primary: StandardMaterial, secondary: StandardMaterial, glow: StandardMaterial) {
  const top = 1.62;
  if (element === "fire") {
    for (const [dx, h, s] of [[-0.1, 0.26, 0.7], [0.06, 0.34, 0.85], [0.16, 0.22, 0.6]] as const) {
      const f = MeshBuilder.CreateCylinder("crest", { height: h, diameterBottom: 0.16 * s, diameterTop: 0, tessellation: 8 }, scene);
      f.material = glow;
      f.parent = parent;
      f.position = new Vector3(dx, top + h / 2 - 0.04, 0);
    }
  } else if (element === "water") {
    const fin = outline(MeshBuilder.CreateSphere("crest", { diameter: 0.4, segments: 10 }, scene));
    fin.material = primary;
    fin.parent = parent;
    fin.position = new Vector3(0, top, -0.05);
    fin.scaling = new Vector3(1.1, 0.4, 0.7);
  } else if (element === "earth") {
    for (const dx of [-0.12, 0.04, 0.16]) {
      const r = outline(MeshBuilder.CreateCylinder("crest", { height: 0.2, diameterBottom: 0.18, diameterTop: 0.04, tessellation: 6 }, scene));
      r.material = secondary;
      r.parent = parent;
      r.position = new Vector3(dx, top, 0);
    }
  } else if (element === "air") {
    const ring = outline(MeshBuilder.CreateTorus("crest", { diameter: 0.42, thickness: 0.06, tessellation: 16 }, scene));
    ring.material = primary;
    ring.parent = parent;
    ring.position = new Vector3(0, top + 0.02, 0);
    ring.rotation.x = Math.PI / 2.4;
  } else {
    // light — a little crown of points
    for (let i = 0; i < 5; i++) {
      const p = MeshBuilder.CreateCylinder("crest", { height: 0.18, diameterBottom: 0.08, diameterTop: 0, tessellation: 6 }, scene);
      p.material = glow;
      p.parent = parent;
      const a = (i / 5) * Math.PI * 2;
      p.position = new Vector3(Math.cos(a) * 0.16, top, Math.sin(a) * 0.16);
    }
  }
}

/* ---- Mestre da Academia ------------------------------------------------ */

export function createMaster(scene: Scene): Character {
  const root = new TransformNode("master", scene);
  const bob = new TransformNode("masterBob", scene);
  bob.parent = root;

  const skin = mat(scene, SKIN);
  const robe = mat(scene, "#3e4a5a");
  const hatMat = mat(scene, "#d8ad57");
  const beardMat = mat(scene, "#e9eef7");
  const crystal = mat(scene, "#89d7ff", 0.6);
  const wood = mat(scene, "#8a5a2b");

  // robe (tall cone)
  const robeMesh = outline(MeshBuilder.CreateCylinder("robe", { height: 1.2, diameterTop: 0.5, diameterBottom: 1.05, tessellation: 16 }, scene));
  robeMesh.material = robe;
  robeMesh.parent = bob;
  robeMesh.position = new Vector3(0, 0.6, 0);

  // head
  const head = outline(MeshBuilder.CreateSphere("mhead", { diameter: 0.6, segments: 14 }, scene));
  head.material = skin;
  head.parent = bob;
  head.position = new Vector3(0, 1.45, 0);
  // beard
  const beard = outline(MeshBuilder.CreateSphere("beard", { diameter: 0.5, segments: 10 }, scene));
  beard.material = beardMat;
  beard.parent = bob;
  beard.position = new Vector3(0, 1.25, 0.12);
  beard.scaling = new Vector3(0.8, 1.1, 0.7);
  const eyeMat = mat(scene, "#243047");
  for (const side of [-1, 1]) {
    const eye = MeshBuilder.CreateSphere("meye", { diameter: 0.07, segments: 8 }, scene);
    eye.material = eyeMat;
    eye.parent = bob;
    eye.position = new Vector3(0.12 * side, 1.5, 0.27);
  }
  // wide hat: brim disc + cone
  const brim = outline(MeshBuilder.CreateCylinder("brim", { height: 0.08, diameter: 1.3, tessellation: 20 }, scene));
  brim.material = hatMat;
  brim.parent = bob;
  brim.position = new Vector3(0, 1.72, 0);
  const cone = outline(MeshBuilder.CreateCylinder("hatcone", { height: 0.8, diameterBottom: 0.7, diameterTop: 0.05, tessellation: 16 }, scene));
  cone.material = hatMat;
  cone.parent = bob;
  cone.position = new Vector3(0, 2.1, 0);

  // staff + crystal
  const staff = MeshBuilder.CreateCylinder("staff", { height: 2.1, diameter: 0.08, tessellation: 8 }, scene);
  staff.material = wood;
  staff.parent = bob;
  staff.position = new Vector3(0.62, 1.05, 0.1);
  const orb = MeshBuilder.CreateSphere("orb", { diameter: 0.26, segments: 12 }, scene);
  orb.material = crystal;
  orb.parent = bob;
  orb.position = new Vector3(0.62, 2.15, 0.1);

  return {
    root,
    update(t) {
      bob.position.y = Math.sin(t * 1.6) * 0.03;
      bob.rotation.z = Math.sin(t * 0.8) * 0.02;
    },
  };
}

/* ---- Dragão do Caos (original boss) ------------------------------------ */

export function createDragon(scene: Scene): Character {
  const root = new TransformNode("dragon", scene);
  const bob = new TransformNode("dragonBob", scene);
  bob.parent = root;

  const body = mat(scene, "#6f4bd6");
  const belly = mat(scene, "#c3a9f2");
  const spike = mat(scene, "#ff7a3d", 0.2);
  const horn = mat(scene, "#e3d2ff");
  const eyeMat = mat(scene, "#1c1530");

  const torso = outline(MeshBuilder.CreateSphere("dbody", { diameter: 1.5, segments: 14 }, scene));
  torso.material = body;
  torso.parent = bob;
  torso.position = new Vector3(0, 1.1, 0);
  torso.scaling = new Vector3(1.3, 1, 1);
  const bellyMesh = MeshBuilder.CreateSphere("dbelly", { diameter: 1.0, segments: 12 }, scene);
  bellyMesh.material = belly;
  bellyMesh.parent = bob;
  bellyMesh.position = new Vector3(0, 0.95, 0.35);
  bellyMesh.scaling = new Vector3(1, 0.9, 0.6);

  const head = outline(MeshBuilder.CreateSphere("dhead", { diameter: 0.95, segments: 14 }, scene));
  head.material = body;
  head.parent = bob;
  head.position = new Vector3(0.85, 1.55, 0.1);
  const snout = outline(MeshBuilder.CreateCylinder("dsnout", { height: 0.5, diameterBottom: 0.5, diameterTop: 0.34, tessellation: 12 }, scene));
  snout.material = body;
  snout.parent = bob;
  snout.position = new Vector3(1.35, 1.45, 0.1);
  snout.rotation.z = Math.PI / 2;
  for (const side of [-1, 1]) {
    const eye = MeshBuilder.CreateSphere("deye", { diameter: 0.16, segments: 8 }, scene);
    eye.material = eyeMat;
    eye.parent = bob;
    eye.position = new Vector3(0.95, 1.75, 0.32 * side);
  }
  // horns
  for (const dz of [-0.25, 0.25]) {
    const h = MeshBuilder.CreateCylinder("dhorn", { height: 0.4, diameterBottom: 0.14, diameterTop: 0, tessellation: 6 }, scene);
    h.material = horn;
    h.parent = bob;
    h.position = new Vector3(0.7, 2.0, dz);
    h.rotation.x = dz < 0 ? 0.3 : -0.3;
  }
  // back spikes
  for (const dx of [-0.3, 0.1, 0.5]) {
    const s = MeshBuilder.CreateCylinder("dspike", { height: 0.4, diameterBottom: 0.22, diameterTop: 0, tessellation: 6 }, scene);
    s.material = spike;
    s.parent = bob;
    s.position = new Vector3(dx, 1.9, 0);
  }
  // wings (flattened, flapping)
  const wings: TransformNode[] = [];
  for (const side of [-1, 1]) {
    const pivot = new TransformNode("wingPivot", scene);
    pivot.parent = bob;
    pivot.position = new Vector3(-0.2, 1.6, 0.4 * side);
    const wing = outline(MeshBuilder.CreateBox("wing", { width: 1.1, height: 0.06, depth: 0.7 }, scene));
    wing.material = mat(scene, "#7b4bd0");
    wing.parent = pivot;
    wing.position = new Vector3(-0.4, 0, 0.45 * side);
    wing.rotation.x = side * 0.4;
    wings.push(pivot);
  }
  // tail
  const tail = outline(MeshBuilder.CreateCylinder("dtail", { height: 1.1, diameterBottom: 0.4, diameterTop: 0.05, tessellation: 10 }, scene));
  tail.material = body;
  tail.parent = bob;
  tail.position = new Vector3(-1.0, 0.9, 0);
  tail.rotation.z = Math.PI / 2.6;

  return {
    root,
    update(t) {
      bob.position.y = 0.3 + Math.sin(t * 1.4) * 0.1;
      const flap = Math.sin(t * 4) * 0.4;
      wings[0].rotation.x = -0.2 - flap;
      wings[1].rotation.x = 0.2 + flap;
    },
  };
}
