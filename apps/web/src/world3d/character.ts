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
  Texture,
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
function svgData(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function spriteMat(scene: Scene, name: string, svg: string, glow = 0.35): StandardMaterial {
  const m = new StandardMaterial(name, scene);
  const tex = new Texture(svgData(svg), scene, false, false, Texture.TRILINEAR_SAMPLINGMODE);
  tex.hasAlpha = true;
  m.diffuseTexture = tex;
  m.opacityTexture = tex;
  m.useAlphaFromDiffuseTexture = true;
  m.emissiveColor = new Color3(glow, glow, glow);
  m.specularColor = new Color3(0.02, 0.02, 0.02);
  m.backFaceCulling = false;
  return m;
}
function sprite(scene: Scene, parent: TransformNode, name: string, svg: string, w: number, h: number, y: number): Mesh {
  const p = MeshBuilder.CreatePlane(name, { width: w, height: h }, scene);
  p.material = spriteMat(scene, `${name}-mat`, svg);
  p.parent = parent;
  p.position = new Vector3(0, y, 0);
  return p;
}
function heroSvg(v: HeroVisual, element: ElementId): string {
  const accent = element === "light" ? "#fff3b0" : v.glow;
  const crest =
    element === "fire"
      ? `<path d="M92 92c18-48 58-58 62-108 42 38 14 74 42 104-13-5-23-7-31-6 12 27-5 51-43 51-35 0-52-16-30-41z" fill="${accent}"/>`
      : element === "water"
        ? `<path d="M76 95c27-36 53-50 89-40 16 5 28 16 36 33-40-11-75-3-125 7z" fill="${accent}"/>`
        : element === "earth"
          ? `<path d="M78 94c16-40 49-58 96-40 5 35-25 55-62 50-14-2-24-5-34-10z" fill="${v.secondary}"/><path d="M106 61c18-18 47-14 67-1-23 14-45 18-67 1z" fill="${accent}"/>`
          : element === "air"
            ? `<path d="M70 97c32-35 101-35 134 0-46-13-90-13-134 0z" fill="${accent}"/><path d="M82 116h112" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".82"/>`
            : `<path d="M137 28l15 32 36 4-27 24 8 36-32-19-32 19 8-36-27-24 36-4z" fill="${accent}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 274 430">
    <defs>
      <linearGradient id="robe" x1="62" x2="212" y1="156" y2="398" gradientUnits="userSpaceOnUse">
        <stop stop-color="${v.primary}"/><stop offset="1" stop-color="${v.secondary}"/>
      </linearGradient>
      <filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#172033" flood-opacity=".38"/></filter>
    </defs>
    <ellipse cx="137" cy="404" rx="78" ry="17" fill="#172033" opacity=".28"/>
    <g filter="url(#sh)">
      ${crest}
      <ellipse cx="137" cy="132" rx="58" ry="62" fill="${SKIN}"/>
      <path d="M88 148c24-20 75-24 99-1v-37c-34-34-80-31-99 0z" fill="${v.secondary}" opacity=".28"/>
      <circle cx="115" cy="135" r="7" fill="#20283a"/><circle cx="159" cy="135" r="7" fill="#20283a"/>
      <path d="M117 158q20 16 40 0" stroke="#20283a" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M72 238q65-91 130 0l-18 132H90z" fill="url(#robe)"/>
      <path d="M74 236c-34 23-42 72-22 114" stroke="${v.primary}" stroke-width="34" stroke-linecap="round"/>
      <path d="M200 236c34 23 42 72 22 114" stroke="${v.primary}" stroke-width="34" stroke-linecap="round"/>
      <circle cx="48" cy="356" r="19" fill="${SKIN}"/><circle cx="226" cy="356" r="19" fill="${SKIN}"/>
      <path d="M105 363h32v47h-32zM139 363h32v47h-32z" fill="#26303f"/>
      <rect x="92" y="398" width="52" height="18" rx="9" fill="#172033"/><rect x="130" y="398" width="52" height="18" rx="9" fill="#172033"/>
      <circle cx="137" cy="260" r="28" fill="#fff"/>
      <path d="M137 238l8 16 18 2-13 12 4 18-17-9-17 9 4-18-13-12 18-2z" fill="${accent}"/>
    </g>
  </svg>`;
}
function masterSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 440">
    <defs><linearGradient id="r" x1="84" x2="238" y1="190" y2="408"><stop stop-color="#536575"/><stop offset="1" stop-color="#273747"/></linearGradient><filter id="s" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#172033" flood-opacity=".36"/></filter></defs>
    <ellipse cx="160" cy="410" rx="82" ry="18" fill="#172033" opacity=".26"/>
    <g filter="url(#s)">
      <path d="M257 143c18 96 18 178 2 259" stroke="#8a5a2b" stroke-width="14" stroke-linecap="round"/><circle cx="257" cy="126" r="25" fill="#89d7ff"/><path d="M257 96l10 20 23 4-17 16 4 23-20-11-20 11 4-23-17-16 23-4z" fill="#fff"/>
      <ellipse cx="154" cy="100" rx="126" ry="31" fill="#d6a24a"/><path d="M74 101c33-67 66-96 84-96s53 29 84 96c-52 17-116 17-168 0z" fill="#ebcf8e"/>
      <circle cx="158" cy="146" r="50" fill="#ffd45e"/><circle cx="140" cy="143" r="6" fill="#243047"/><circle cx="176" cy="143" r="6" fill="#243047"/>
      <path d="M128 158q30 58 60 0" fill="#eef2fb"/><path d="M125 137q30-22 33 6 7-28 36-6" stroke="#eef2fb" stroke-width="13" fill="none" stroke-linecap="round"/>
      <path d="M158 205c54 0 88 48 92 160 1 26-18 40-48 40h-88c-30 0-49-14-48-40 4-112 38-160 92-160z" fill="url(#r)"/>
      <path d="M110 244l96 120M206 244L110 364" stroke="#d8e0ea" stroke-width="9" opacity=".55"/>
      <circle cx="158" cy="291" r="27" fill="#fff"/><path d="M158 269l9 18 20 3-15 14 4 20-18-10-18 10 4-20-15-14 20-3z" fill="#89d7ff"/>
    </g>
  </svg>`;
}
function dragonSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260">
    <defs><filter id="s" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="10" flood-color="#172033" flood-opacity=".36"/></filter></defs>
    <ellipse cx="166" cy="232" rx="118" ry="20" fill="#172033" opacity=".26"/>
    <g filter="url(#s)">
      <path d="M90 171q-59 9-61 66 42-11 78-38z" fill="#5630a2"/><path d="M32 235l18-25 14 18z" fill="#ff7a3d"/>
      <path d="M166 86q55-73 132-61-9 58-75 90z" fill="#7b4bd0"/><path d="M189 82q35-35 74-34m-66 54q34-22 65-18" stroke="#5630a2" stroke-width="7" fill="none" stroke-linecap="round"/>
      <ellipse cx="166" cy="166" rx="88" ry="61" fill="#6f4bd6"/><ellipse cx="159" cy="180" rx="58" ry="38" fill="#c3a9f2"/>
      <path d="M107 104l17-34 19 34zM150 92l20-39 20 39zM196 104l17-34 19 34z" fill="#ff7a3d"/>
      <ellipse cx="246" cy="118" rx="51" ry="43" fill="#6f4bd6"/><path d="M281 115q53 0 53 31-28 14-57 3z" fill="#7b4bd0"/>
      <path d="M232 81l-14-45 31 31zM265 77l5-42 22 35z" fill="#e3d2ff"/>
      <ellipse cx="253" cy="109" rx="16" ry="18" fill="#fff"/><circle cx="258" cy="112" r="8" fill="#1c1530"/>
      <path d="M235 92q21-14 43-3" stroke="#34245c" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="325" cy="141" r="4" fill="#1c1530"/><path d="M287 148l8 14 8-14zM305 148l8 13 8-13z" fill="#fff"/>
    </g>
  </svg>`;
}

/* ---- hero (blocky minifig) -------------------------------------------- */

export function createHero(scene: Scene, element: ElementId): Character {
  const v = VISUALS[element];
  const root = new TransformNode(`hero-${element}`, scene);
  const bob = new TransformNode("bob", scene);
  bob.parent = root;
  const cutout = sprite(scene, bob, `hero-cutout-${element}`, heroSvg(v, element), 2.35, 3.7, 1.85);
  cutout.rotation.y = Math.PI;
  const glow = mat(scene, v.glow, 0.55);
  const dark = mat(scene, "#26303f");

  const petPivot = new TransformNode("petPivot", scene);
  petPivot.parent = root;
  const petBaseY = 1.55;
  petPivot.position = new Vector3(1.15, petBaseY, 0.18);
  const petBody = box(scene, 0.42, 0.38, 0.42, glow, petPivot, 0, 0, 0);
  petBody.rotation.y = Math.PI / 4;
  box(scene, 0.07, 0.07, 0.04, dark, petPivot, -0.09, 0.05, 0.25);
  box(scene, 0.07, 0.07, 0.04, dark, petPivot, 0.09, 0.05, 0.25);

  return {
    root,
    update(t, sp) {
      bob.position.y = Math.abs(Math.sin(t * (5 + sp * 6))) * (0.02 + sp * 0.08);
      bob.rotation.z = Math.sin(t * (4 + sp * 9)) * sp * 0.035;
      petPivot.position.y = petBaseY + Math.sin(t * 2.4) * 0.14;
      petPivot.rotation.y = t * 0.8;
    },
  };

}

/* ---- Mestre da Academia (chunky wizard) ------------------------------- */

export function createMaster(scene: Scene): Character {
  const root = new TransformNode("master", scene);
  const bob = new TransformNode("masterBob", scene);
  bob.parent = root;
  const cutout = sprite(scene, bob, "master-cutout", masterSvg(), 2.65, 3.85, 1.92);
  cutout.rotation.y = Math.PI;
  const crystal = mat(scene, "#89d7ff", 0.7);
  const wood = mat(scene, "#8a5a2b");
  box(scene, 0.1, 2.35, 0.1, wood, bob, 0.86, 1.42, 0.12);
  const orb = MeshBuilder.CreateSphere("orb", { diameter: 0.34, segments: 10 }, scene);
  orb.material = crystal;
  orb.parent = bob;
  orb.position = new Vector3(0.86, 2.72, 0.12);

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
  const cutout = sprite(scene, bob, "dragon-cutout", dragonSvg(), 4.5, 3.25, 1.65);
  cutout.rotation.y = Math.PI;

  return {
    root,
    update(t) {
      bob.position.y = Math.sin(t * 1.4) * 0.12;
      bob.rotation.z = Math.sin(t * 2.1) * 0.035;
    },
  };
}
