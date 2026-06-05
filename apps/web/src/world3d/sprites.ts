/* Academia dos Elementos 3D — character SPRITES. The world (ground, trees,
 * portal, house…) is real 3D, but the characters are the official SVG art shown
 * as camera-facing billboards (a "paper" look): the exact bonecos that were
 * designed for the game, standing in the 3D scene.
 *
 * The SVG is produced from the SAME React components used everywhere else
 * (world/emblems.tsx) via renderToStaticMarkup, so there's one source of truth
 * for the art — no duplicated path data. It's rasterised into a Babylon texture
 * on a billboarded plane. */
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Scene,
  Color3,
  Texture,
  StandardMaterial,
  MeshBuilder,
  TransformNode,
  Mesh,
} from "@babylonjs/core";
import { Hero, Master, Dragon } from "../world/emblems";
import { elementById } from "../world/world-data";
import type { ElementId } from "../world/world-data";
import type { Character } from "./character";

/** Turn a React SVG element into a data-URL + its aspect ratio (w/h). Adds the
 *  xmlns (required for an <img>/texture data URL) and sizes the raster from the
 *  viewBox so the art keeps its proportions. */
function svgToTexture(node: ReactElement): { url: string; aspect: number } {
  let svg = renderToStaticMarkup(node);
  const vb = svg.match(/viewBox="([-\d.\s]+)"/);
  const [, , vw, vh] = vb ? vb[1].split(/\s+/).map(Number) : [0, 0, 100, 100];
  const scale = 3;
  if (!/xmlns=/.test(svg)) svg = svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
  svg = svg
    .replace(/width="\d+"/, `width="${Math.round(vw * scale)}"`)
    .replace(/height="\d+"/, `height="${Math.round(vh * scale)}"`);
  return { url: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg), aspect: vw / vh };
}

/** A camera-facing sprite character: a billboarded plane textured with the SVG,
 *  with a gentle bob (faster while walking). */
function createSprite(scene: Scene, node: ReactElement, worldHeight: number, idleHz = 2): Character {
  const { url, aspect } = svgToTexture(node);
  const root = new TransformNode("spriteRoot", scene);

  const plane = MeshBuilder.CreatePlane("sprite", { width: worldHeight * aspect, height: worldHeight }, scene);
  plane.parent = root;
  plane.billboardMode = Mesh.BILLBOARDMODE_Y; // stays upright, turns to face the camera
  const baseY = worldHeight / 2;
  plane.position.y = baseY;

  const tex = new Texture(url, scene, false, true, Texture.TRILINEAR_SAMPLINGMODE);
  tex.hasAlpha = true;
  const mat = new StandardMaterial("spriteMat", scene);
  mat.diffuseTexture = tex;
  mat.useAlphaFromDiffuseTexture = true;
  mat.emissiveColor = Color3.White(); // unlit → the SVG colours show flat and bright
  mat.disableLighting = true;
  mat.backFaceCulling = false;
  plane.material = mat;

  return {
    root,
    update(t, sp) {
      plane.position.y = baseY + Math.sin(t * (idleHz + sp * 4)) * (0.03 + sp * 0.06);
    },
  };
}

export function createHeroSprite(scene: Scene, element: ElementId): Character {
  const color = elementById.get(element)!.color;
  return createSprite(scene, createElement(Hero, { element, color, size: 256 }), 1.9, 2.4);
}

export function createMasterSprite(scene: Scene): Character {
  return createSprite(scene, createElement(Master, { size: 256 }), 2.4, 1.4);
}

export function createDragonSprite(scene: Scene): Character {
  return createSprite(scene, createElement(Dragon, { size: 256 }), 2.0, 1.2);
}
