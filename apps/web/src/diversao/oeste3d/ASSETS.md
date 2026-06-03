# Velho Oeste 3D — 3D models (drop-in guide)

Right now **every character and prop is built procedurally** from primitives in
[`engine.ts`](./engine.ts) (boxes/spheres/cylinders, toon look). The game is
fully playable like this — no asset files needed.

When you want nicer **CC0 / Mixamo** models, you don't rewrite the game: you drop
`.glb` files in and swap the relevant builder. This file is the recipe.

> Why this isn't already wired: the build can't download external binaries
> (Mixamo needs an Adobe login; Kenney/Quaternius are free but still a manual
> download). So the loader is documented here and the builders are isolated, ready
> for you to point at real files.

## 1. Where files go

```
apps/web/public/models/
  cowboy.glb     # player (with animations, or animations separate)
  bandit.glb     # enemy
  saloon.glb     # building (optional)
  props.glb      # cactus / barrel / rock kit (optional)
```

`apps/web/public/` is served at the site root, so these load from `/models/*.glb`.

## 2. Good CC0 sources

- **Quaternius** — https://quaternius.com — CC0 low-poly animated characters &
  a Western/nature kit. Great toon style, already rigged.
- **Kenney** — https://kenney.nl/assets — CC0 "kits" (blocky characters, nature,
  survival). No login.
- **Mixamo** — https://www.mixamo.com — free animations (idle / run / jump). Needs
  an Adobe account. Upload a character or use theirs, download as glTF/FBX, then
  retarget. (Quaternius models often already include the clips you need, so you
  can skip Mixamo entirely.)

Keep them **low-poly** and **Draco/meshopt-compressed**; target iPad.
Model facing **+Z**, ~**1.8 units** tall, origin **at the feet** (matches the
procedural cowboy so the controller, camera and collision keep working).

## 3. Wire the loader

`@babylonjs/loaders` is already installed. Replace the procedural `buildCowboy`
(and/or `buildBandit`) in `engine.ts` with a glTF load + a procedural fallback:

```ts
import "@babylonjs/loaders/glTF";
import { SceneLoader, AnimationGroup } from "@babylonjs/core";

// Set the filenames you dropped in /public/models/ (empty = stay procedural).
const MODELS: { cowboy?: string; bandit?: string } = { cowboy: "cowboy.glb" };

private async loadCowboy(file: string, root: TransformNode): Promise<AnimationGroup[] | null> {
  try {
    const res = await SceneLoader.ImportMeshAsync("", "/models/", file, this.scene);
    res.meshes.forEach((m) => {
      m.parent = root;
      this.cast(m as Mesh);
    });
    return res.animationGroups; // play "Idle" / "Run" / "Jump" by name
  } catch {
    return null; // file missing → keep the procedural body already built
  }
}
```

Call it right after `buildPlayer()` when `MODELS.cowboy` is set, hide the
procedural meshes if the load succeeds, and drive the returned `AnimationGroup`s
from the controller state (idle when still, run when moving, jump in the air).

## 4. Keep it fast

- One `.glb` per character; merge static props into a small kit.
- Reuse materials; avoid per-mesh outlines on heavy models (use a cheaper
  outline or a baked one).
- Test the frame rate on a real iPad before adding more.
