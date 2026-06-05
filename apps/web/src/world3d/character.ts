/* Academia dos Elementos 3D — blocky LEGO/Roblox-style characters built from
 * Babylon boxes. Bright flat colours + toon outlines, a chunky minifig hero that
 * turns to face where it walks, with swinging arms/legs and a floating pet. The
 * Mestre and the Dragão are built the same chunky way so the cast matches. */
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

const SKIN = "#ffd45e"; // toy-yellow head, the classic minifig look

export const VISUALS: Record<ElementId, HeroVisual> = {
  fire: { name: "Faísca", pet: "Fagulha", primary: "#ff6a3d", secondary: "#8b2430", glow: "#ffd166" },
  water: { name: "Maré", pet: "Gota", primary: "#2bb3e0", secondary: "#116a8c", glow: "#b7f3ff" },
  earth: { name: "Rochedo", pet: "Raiz", primary: "#5aa65c", secondary: "#6b4f2a", glow: "#bde27a" },
  air: { name: "Brisa", pet: "Sopro", primary: "#7fa9e0", secondary: "#3f5e86", glow: "#eaf4ff" },
  light: { name: "Lúmen", pet: "Brilho", primary: "#f0bd2e", secondary: "#a87f17", glow: "#fff4bf" },
};

export interface Character {
  root: TransformNode;
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
function outline(mesh: Mesh): Mesh {
  mesh.renderOutline = true;
  mesh.outlineColor = new Color3(0.1, 0.12, 0.18);
  mesh.outlineWidth = 0.035;
  return mesh;
}
function box(scene: Scene, w: number, h: number, d: number, material: StandardMaterial, parent: TransformNode, x: number, y: number, z: number): Mesh {
  const m = outline(MeshBuilder.CreateBox("b", { width: w, height: h, depth: d }, scene));
  m.material = material;
  m.parent = parent;
  m.position = new Vector3(x, y, z);
  return m;
}

/* ---- hero (blocky minifig) -------------------------------------------- */

export function createHero(scene: Scene, element: ElementId): Character {
  const v = VISUALS[element];
  const root = new TransformNode(`hero-${element}`, scene);
  const bob = new TransformNode("bob", scene);
  bob.parent = root;

  const skin = mat(scene, SKIN);
  const primary = mat(scene, v.primary);
  const secondary = mat(scene, v.secondary);
  const glow = mat(scene, v.glow, 0.5);
  const dark = mat(scene, "#26303f");

  // legs (each on a hip pivot so it can swing)
  const legs: TransformNode[] = [];
  for (const side of [-1, 1]) {
    const hip = new TransformNode("hip", scene);
    hip.parent = bob;
    hip.position = new Vector3(0.22 * side, 0.8, 0);
    box(scene, 0.4, 0.8, 0.42, secondary, hip, 0, -0.4, 0);
    box(scene, 0.42, 0.16, 0.46, dark, hip, 0, -0.78, 0.02); // boot
    legs.push(hip);
  }

  // torso + belt + short cape
  box(scene, 0.92, 0.9, 0.52, primary, bob, 0, 1.3, 0);
  box(scene, 0.94, 0.16, 0.54, dark, bob, 0, 0.9, 0);
  const emblem = box(scene, 0.3, 0.3, 0.04, glow, bob, 0, 1.35, 0.28);
  emblem.rotation.z = Math.PI / 4;
  box(scene, 0.78, 0.95, 0.1, secondary, bob, 0, 1.35, -0.32); // cape

  // arms on shoulder pivots
  const arms: TransformNode[] = [];
  for (const side of [-1, 1]) {
    const sh = new TransformNode("shoulder", scene);
    sh.parent = bob;
    sh.position = new Vector3(0.62 * side, 1.68, 0);
    box(scene, 0.3, 0.8, 0.34, primary, sh, 0, -0.38, 0);
    box(scene, 0.32, 0.22, 0.36, skin, sh, 0, -0.82, 0); // hand
    arms.push(sh);
  }

  // blocky head + face
  box(scene, 0.76, 0.72, 0.72, skin, bob, 0, 2.1, 0);
  box(scene, 0.12, 0.14, 0.04, dark, bob, -0.17, 2.18, 0.37);
  box(scene, 0.12, 0.14, 0.04, dark, bob, 0.17, 2.18, 0.37);
  box(scene, 0.34, 0.07, 0.04, dark, bob, 0, 2.0, 0.37); // smile

  blockCrest(scene, bob, element, primary, secondary, glow);

  // floating pet (a little glowing cube companion)
  const petPivot = new TransformNode("petPivot", scene);
  petPivot.parent = root;
  const petBaseY = 1.5;
  petPivot.position = new Vector3(0.95, petBaseY, 0.2);
  const petBody = box(scene, 0.36, 0.34, 0.36, glow, petPivot, 0, 0, 0);
  petBody.rotation.y = Math.PI / 4;
  box(scene, 0.06, 0.06, 0.04, dark, petPivot, -0.08, 0.04, 0.22);
  box(scene, 0.06, 0.06, 0.04, dark, petPivot, 0.08, 0.04, 0.22);

  return {
    root,
    update(t, sp) {
      bob.position.y = Math.abs(Math.sin(t * (5 + sp * 6))) * (0.02 + sp * 0.08);
      const swing = Math.sin(t * (4 + sp * 9)) * (0.1 + sp * 0.7);
      arms[0].rotation.x = swing;
      arms[1].rotation.x = -swing;
      legs[0].rotation.x = -swing;
      legs[1].rotation.x = swing;
      petPivot.position.y = petBaseY + Math.sin(t * 2.4) * 0.14;
      petPivot.rotation.y = t * 0.8;
    },
  };
}

function blockCrest(scene: Scene, parent: TransformNode, element: ElementId, primary: StandardMaterial, secondary: StandardMaterial, glow: StandardMaterial) {
  const y = 2.55;
  if (element === "fire") {
    for (const [dx, h] of [[-0.16, 0.3], [0, 0.42], [0.16, 0.3]] as const) {
      const f = box(scene, 0.14, h, 0.14, glow, parent, dx, y + h / 2 - 0.1, 0);
      f.rotation.z = dx * -0.6;
    }
  } else if (element === "water") {
    const fin = box(scene, 0.5, 0.34, 0.16, primary, parent, 0, y, -0.05);
    fin.rotation.z = 0.2;
  } else if (element === "earth") {
    box(scene, 0.2, 0.24, 0.2, secondary, parent, -0.14, y, 0);
    box(scene, 0.24, 0.3, 0.24, secondary, parent, 0.06, y + 0.05, 0);
  } else if (element === "air") {
    const ring = box(scene, 0.6, 0.12, 0.6, primary, parent, 0, y - 0.1, 0);
    ring.rotation.y = Math.PI / 4;
  } else {
    for (let i = 0; i < 4; i++) {
      const p = box(scene, 0.12, 0.26, 0.12, glow, parent, 0, y, 0);
      const a = (i / 4) * Math.PI * 2;
      p.position = new Vector3(Math.cos(a) * 0.18, y, Math.sin(a) * 0.18);
    }
  }
}

/* ---- Mestre da Academia (chunky wizard) ------------------------------- */

export function createMaster(scene: Scene): Character {
  const root = new TransformNode("master", scene);
  const bob = new TransformNode("masterBob", scene);
  bob.parent = root;

  const skin = mat(scene, "#ffd45e");
  const robe = mat(scene, "#46557a");
  const robe2 = mat(scene, "#34405c");
  const hatMat = mat(scene, "#e6b94e");
  const beardMat = mat(scene, "#eef2fb");
  const crystal = mat(scene, "#89d7ff", 0.7);
  const wood = mat(scene, "#8a5a2b");

  box(scene, 0.5, 0.8, 0.5, robe2, bob, -0.16, 0.4, 0); // legs/robe base
  box(scene, 0.5, 0.8, 0.5, robe2, bob, 0.16, 0.4, 0);
  box(scene, 1.1, 1.2, 0.7, robe, bob, 0, 1.4, 0); // robe body
  const head = box(scene, 0.8, 0.78, 0.78, skin, bob, 0, 2.35, 0);
  box(scene, 0.6, 0.5, 0.4, beardMat, bob, 0, 2.0, 0.3); // beard
  box(scene, 0.12, 0.14, 0.04, mat(scene, "#243047"), bob, -0.18, 2.42, 0.4);
  box(scene, 0.12, 0.14, 0.04, mat(scene, "#243047"), bob, 0.18, 2.42, 0.4);
  // wide wizard hat
  box(scene, 1.5, 0.18, 1.5, hatMat, bob, 0, 2.78, 0);
  const cone = outline(MeshBuilder.CreateCylinder("hatcone", { height: 1.0, diameterBottom: 0.8, diameterTop: 0.06, tessellation: 4 }, scene));
  cone.material = hatMat;
  cone.parent = bob;
  cone.position = new Vector3(0, 3.4, 0);
  cone.rotation.y = Math.PI / 4;
  // staff + crystal
  box(scene, 0.12, 2.4, 0.12, wood, bob, 0.75, 1.4, 0.1);
  const orb = MeshBuilder.CreateSphere("orb", { diameter: 0.34, segments: 10 }, scene);
  orb.material = crystal;
  orb.parent = bob;
  orb.position = new Vector3(0.75, 2.7, 0.1);
  void head;

  return {
    root,
    update(t) {
      bob.position.y = Math.sin(t * 1.6) * 0.04;
      bob.rotation.z = Math.sin(t * 0.8) * 0.02;
    },
  };
}

/* ---- Dragão do Caos (chunky boss) ------------------------------------- */

export function createDragon(scene: Scene): Character {
  const root = new TransformNode("dragon", scene);
  const bob = new TransformNode("dragonBob", scene);
  bob.parent = root;

  const body = mat(scene, "#6f4bd6");
  const belly = mat(scene, "#c3a9f2");
  const spike = mat(scene, "#ff7a3d", 0.2);
  const horn = mat(scene, "#e3d2ff");
  const eyeMat = mat(scene, "#1c1530");

  box(scene, 1.8, 1.3, 1.5, body, bob, 0, 1.2, 0); // torso
  box(scene, 1.2, 0.8, 0.4, belly, bob, 0, 1.05, 0.6);
  box(scene, 1.0, 0.9, 0.9, body, bob, 0.9, 1.7, 0.1); // head
  box(scene, 0.5, 0.45, 0.5, body, bob, 1.5, 1.55, 0.1); // snout
  box(scene, 0.18, 0.18, 0.05, eyeMat, bob, 1.0, 1.95, 0.36);
  box(scene, 0.18, 0.18, 0.05, eyeMat, bob, 1.0, 1.95, -0.16);
  // horns
  for (const dz of [-0.28, 0.28]) {
    const h = outline(MeshBuilder.CreateCylinder("dhorn", { height: 0.45, diameterBottom: 0.16, diameterTop: 0, tessellation: 4 }, scene));
    h.material = horn;
    h.parent = bob;
    h.position = new Vector3(0.7, 2.25, dz);
  }
  // back spikes
  for (const dx of [-0.4, 0.0, 0.4]) box(scene, 0.18, 0.4, 0.18, spike, bob, dx, 2.0, 0).rotation.y = Math.PI / 4;
  // tail
  const tail = box(scene, 1.0, 0.4, 0.4, body, bob, -1.1, 0.9, 0);
  tail.rotation.z = 0.3;
  // wings (flapping)
  const wings: TransformNode[] = [];
  for (const side of [-1, 1]) {
    const pivot = new TransformNode("wingPivot", scene);
    pivot.parent = bob;
    pivot.position = new Vector3(-0.2, 1.8, 0.6 * side);
    box(scene, 1.2, 0.1, 0.8, mat(scene, "#7b4bd0"), pivot, -0.5, 0, 0.4 * side);
    wings.push(pivot);
  }

  return {
    root,
    update(t) {
      bob.position.y = Math.sin(t * 1.4) * 0.12;
      const flap = Math.sin(t * 4) * 0.5;
      wings[0].rotation.x = -0.2 - flap;
      wings[1].rotation.x = 0.2 + flap;
    },
  };
}
