/* Xadrez 3D — the Babylon.js engine for the 3D chess board. It owns EVERYTHING
 * 3D: the scene, the orbit camera, lights + shadows, the wooden board, the
 * procedural low-poly pieces, the tap-to-select interaction, and the move / capture
 * animations. The chess RULES live in ../chess.ts (shared with the 2D board) — this
 * file is only the look, the input, and the choreography.
 *
 * Pieces are built procedurally from primitives (cylinders/spheres/boxes) in a
 * glossy "luxury set" look — ivory whites, obsidian blacks, a soft glow on the
 * legal-move markers, real-time shadows from one sun. The builders are isolated so
 * each could later be swapped for a downloaded .glb without touching game logic.
 *
 * Performance notes for iPad (the target): low poly counts, a single shadow light,
 * capped hardware scaling, tweens driven by the render loop (no Animation graph).
 * Everything is disposed on unmount.
 *
 * Babylon is imported here and the host (Xadrez3D.tsx) is lazy-loaded by the arcade
 * hub, so the big 3D engine only ships in its own chunk loaded on demand. */

import {
  Engine,
  Scene,
  Vector3,
  Color3,
  Color4,
  ArcRotateCamera,
  HemisphericLight,
  DirectionalLight,
  ShadowGenerator,
  MeshBuilder,
  StandardMaterial,
  TransformNode,
  Mesh,
  GlowLayer,
  PointerEventTypes,
} from "@babylonjs/core";
import { sfx } from "../sfx";
import {
  type Color,
  type Mode,
  type Level,
  type Move,
  type Piece,
  type Rights,
  type Status,
  FULL_RIGHTS,
  LEVELS,
  isWhite,
  colorOf,
  opp,
  initPieces,
  gridFromPieces,
  legalMoves,
  findKing,
  updateRights,
  positionKey,
  evaluateStatus,
  describe,
  firstMsg,
  aiMove,
  applyMovePieces,
} from "../chess";

export interface HudState {
  msg: string;
  check: boolean;
  over: boolean;
  win: boolean;
  thinking: boolean;
  started: boolean;
  turn: Color;
}

/* board geometry — one square = 1 world unit, board centred on the origin */
const SQ = 1;
const HALF = 3.5; // (8 - 1) / 2 — column/row index of the board centre
const worldX = (c: number) => (c - HALF) * SQ;
const worldZ = (r: number) => (r - HALF) * SQ; // r grows toward +Z (white's back rank at +Z, nearest the camera)
const TILE_TOP = 0; // pieces stand with their base at y = 0

const WHITE_ALPHA = Math.PI / 2; // camera behind white (white nearest)
const BLACK_ALPHA = -Math.PI / 2;

const MOVE_DUR = 0.42; // seconds for a piece to slide to its square
const CAPTURE_DELAY = 0.18; // captured piece starts sinking after the attacker sets off

const hex = (s: string) => Color3.FromHexString(s);

/* colours */
const LIGHT_SQ = "#e9d3a4";
const DARK_SQ = "#9a6a3c";
const IVORY = "#f2ead6";
const OBSIDIAN = "#23262f";

interface PieceView {
  root: TransformNode;
  meshes: Mesh[];
  t: string; // current piece letter (changes on promotion)
}

interface Tween {
  node: TransformNode;
  t: number;
  dur: number;
  pFrom?: Vector3;
  pTo?: Vector3;
  arc?: number; // peak extra height mid-flight (a knight's hop)
  sFrom?: number;
  sTo?: number; // uniform scaling (capture shrink)
  onDone?: () => void;
}

const easeInOut = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);

export class Xadrez3DGame {
  private engine: Engine;
  private scene: Scene;
  private camera: ArcRotateCamera;
  private shadow: ShadowGenerator;
  private reduced: boolean;
  private onState: (s: HudState) => void;

  private boardRoot: TransformNode;
  private piecesRoot: TransformNode;
  private fxRoot: TransformNode; // selection / target / check markers (rebuilt each tap)

  // materials, shared
  private matWhite!: StandardMaterial;
  private matBlack!: StandardMaterial;

  // game state
  private mode: Mode = "cpu";
  private level: Level = "medio";
  private pieces: Piece[] = [];
  private views = new Map<number, PieceView>();
  private turn: Color = "w";
  private sel: number | null = null;
  private targets: Move[] = [];
  private started = false;
  private over = false;
  private win = false;
  private thinking = false;
  private check = false;
  private msg = firstMsg("cpu");

  private rights: Rights = { ...FULL_RIGHTS };
  private halfmove = 0;
  private reps = new Map<string, number>();

  private tweens: Tween[] = [];
  private cpuTimer = 0; // window.setTimeout handle
  private flipTo: number | null = null; // camera alpha we're easing toward (2-player auto-flip)

  constructor(canvas: HTMLCanvasElement, opts: { reduced: boolean; mode: Mode; level: Level; onState: (s: HudState) => void }) {
    this.reduced = opts.reduced;
    this.mode = opts.mode;
    this.level = opts.level;
    this.onState = opts.onState;
    this.msg = firstMsg(opts.mode);

    this.engine = new Engine(canvas, true, { stencil: true, preserveDrawingBuffer: false }, true);
    this.engine.setHardwareScalingLevel(Math.min(window.devicePixelRatio || 1, 2) > 1.5 ? 1.25 : 1);

    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.09, 0.11, 0.16, 1); // deep slate so the set pops
    this.scene.ambientColor = new Color3(0.4, 0.4, 0.45);

    this.camera = new ArcRotateCamera("cam", WHITE_ALPHA, 0.92, 12, new Vector3(0, 0.4, 0), this.scene);
    this.camera.lowerRadiusLimit = 7;
    this.camera.upperRadiusLimit = 18;
    this.camera.upperBetaLimit = 1.45; // don't let it drop under the board
    this.camera.wheelDeltaPercentage = 0.01;
    this.camera.panningSensibility = 0; // orbit + zoom only, no panning (kids)
    this.camera.attachControl(canvas, true);

    const hemi = new HemisphericLight("hemi", new Vector3(0.3, 1, 0.2), this.scene);
    hemi.intensity = 0.7;
    hemi.groundColor = new Color3(0.25, 0.27, 0.32);
    const sun = new DirectionalLight("sun", new Vector3(-0.5, -1.1, 0.35), this.scene);
    sun.position = new Vector3(8, 16, -6);
    sun.intensity = 1.05;
    this.shadow = new ShadowGenerator(1024, sun);
    this.shadow.useBlurExponentialShadowMap = true;
    this.shadow.blurScale = 2;

    const glow = new GlowLayer("glow", this.scene);
    glow.intensity = 0.85;

    this.boardRoot = new TransformNode("board", this.scene);
    this.piecesRoot = new TransformNode("pieces", this.scene);
    this.fxRoot = new TransformNode("fx", this.scene);

    this.buildMaterials();
    this.buildBoard();
    this.setupPieces();

    this.scene.onPointerObservable.add((pi) => {
      if (pi.type !== PointerEventTypes.POINTERTAP) return; // a tap, not an orbit drag
      const m = pi.pickInfo?.pickedMesh;
      const sq = m?.metadata as { r: number; c: number } | undefined;
      if (sq) this.tapSquare(sq.r, sq.c);
    });

    this.engine.runRenderLoop(() => {
      this.update(Math.min(0.05, this.engine.getDeltaTime() / 1000));
      this.scene.render();
    });
    this.emit();
  }

  /* ---------- materials ---------- */
  private glossy(color: string, spec: string): StandardMaterial {
    const m = new StandardMaterial("m", this.scene);
    m.diffuseColor = hex(color);
    m.specularColor = hex(spec);
    m.specularPower = 48; // tight highlight → polished
    return m;
  }
  private matte(color: string, emissive = false): StandardMaterial {
    const m = new StandardMaterial("m", this.scene);
    m.diffuseColor = hex(color);
    m.specularColor = Color3.Black();
    if (emissive) m.emissiveColor = hex(color).scale(0.7);
    return m;
  }
  private buildMaterials() {
    this.matWhite = this.glossy(IVORY, "#fffaf0");
    this.matBlack = this.glossy(OBSIDIAN, "#8fa6c8"); // cool blue sheen reads as obsidian/marble
  }

  /* ---------- board ---------- */
  private buildBoard() {
    // a thick wooden plinth under the squares
    const base = MeshBuilder.CreateBox("plinth", { width: 9.4, height: 0.7, depth: 9.4 }, this.scene);
    base.position.y = -0.41;
    base.material = this.matte("#5a3b22");
    base.receiveShadows = true;
    base.parent = this.boardRoot;
    const rim = MeshBuilder.CreateBox("rim", { width: 8.6, height: 0.16, depth: 8.6 }, this.scene);
    rim.position.y = -0.05;
    rim.material = this.matte("#6f4a2a");
    rim.parent = this.boardRoot;

    const lightMat = this.glossy(LIGHT_SQ, "#fff4dd");
    const darkMat = this.glossy(DARK_SQ, "#caa06a");
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const tile = MeshBuilder.CreateBox("sq", { width: 0.98 * SQ, height: 0.12, depth: 0.98 * SQ }, this.scene);
        tile.position.set(worldX(c), -0.02, worldZ(r));
        tile.material = (r + c) % 2 ? darkMat : lightMat;
        tile.receiveShadows = true;
        tile.metadata = { r, c };
        tile.parent = this.boardRoot;
      }
    }
  }

  /* ---------- pieces ---------- */
  private setupPieces() {
    for (const v of this.views.values()) v.root.dispose();
    this.views.clear();
    this.pieces = initPieces();
    for (const p of this.pieces) this.views.set(p.id, this.buildPieceView(p.t, p.r, p.c));
  }

  private buildPieceView(t: string, r: number, c: number): PieceView {
    const root = new TransformNode("piece", this.scene);
    root.parent = this.piecesRoot;
    root.position.set(worldX(c), TILE_TOP, worldZ(r));
    const white = isWhite(t);
    const mat = white ? this.matWhite : this.matBlack;
    const meshes: Mesh[] = [];
    const add = (mesh: Mesh) => {
      mesh.parent = root;
      mesh.material = mat;
      mesh.isPickable = false; // taps must fall THROUGH the piece to the tile beneath it
      this.shadow.addShadowCaster(mesh);
      meshes.push(mesh);
      return mesh;
    };
    this.buildPieceMeshes(t.toLowerCase(), add);
    // knights have a face — turn them to look across the board at the enemy
    if (t.toLowerCase() === "n") root.rotation.y = white ? Math.PI : 0;
    return { root, meshes, t };
  }

  /** Build one piece's stacked primitives via `add` (which parents + materials +
   *  shadow-casts each mesh). A shared tapered "body" base keeps them a family. */
  private buildPieceMeshes(kind: string, add: (m: Mesh) => Mesh) {
    const base = (h: number, dBottom: number, dTop: number, y: number) => {
      const m = MeshBuilder.CreateCylinder("b", { height: h, diameterBottom: dBottom, diameterTop: dTop, tessellation: 20 }, this.scene);
      m.position.y = y;
      return add(m);
    };
    // every piece sits on a little foot
    base(0.16, 0.62, 0.5, 0.08);

    if (kind === "p") {
      base(0.34, 0.42, 0.26, 0.33);
      const head = MeshBuilder.CreateSphere("h", { diameter: 0.42, segments: 12 }, this.scene);
      head.position.y = 0.72;
      add(head);
    } else if (kind === "r") {
      base(0.62, 0.46, 0.42, 0.47);
      const top = MeshBuilder.CreateCylinder("t", { height: 0.18, diameter: 0.56, tessellation: 20 }, this.scene);
      top.position.y = 0.87;
      add(top);
      // four crenellations
      for (let i = 0; i < 4; i++) {
        const cren = MeshBuilder.CreateBox("cr", { width: 0.14, height: 0.16, depth: 0.14 }, this.scene);
        const a = (i / 4) * Math.PI * 2;
        cren.position.set(Math.cos(a) * 0.2, 1.0, Math.sin(a) * 0.2);
        add(cren);
      }
    } else if (kind === "b") {
      base(0.66, 0.44, 0.22, 0.49);
      const collar = MeshBuilder.CreateTorus("c", { diameter: 0.34, thickness: 0.08, tessellation: 16 }, this.scene);
      collar.position.y = 0.82;
      add(collar);
      const headM = MeshBuilder.CreateSphere("h", { diameterX: 0.3, diameterY: 0.46, diameterZ: 0.3, segments: 12 }, this.scene);
      headM.position.y = 1.04;
      add(headM);
      const tip = MeshBuilder.CreateSphere("tp", { diameter: 0.12, segments: 8 }, this.scene);
      tip.position.y = 1.32;
      add(tip);
    } else if (kind === "n") {
      // a stylised horse: a tilted neck box + a snout, facing +Z
      base(0.4, 0.46, 0.4, 0.36);
      const neck = MeshBuilder.CreateBox("nk", { width: 0.3, height: 0.6, depth: 0.34 }, this.scene);
      neck.position.set(0, 0.78, -0.02);
      neck.rotation.x = -0.35;
      add(neck);
      const head = MeshBuilder.CreateBox("hd", { width: 0.28, height: 0.3, depth: 0.5 }, this.scene);
      head.position.set(0, 1.04, 0.18);
      head.rotation.x = 0.25;
      add(head);
      for (const s of [-1, 1]) {
        const ear = MeshBuilder.CreateCylinder("er", { height: 0.16, diameterBottom: 0.1, diameterTop: 0.01, tessellation: 8 }, this.scene);
        ear.position.set(s * 0.08, 1.22, 0.02);
        add(ear);
      }
    } else if (kind === "q") {
      base(0.86, 0.46, 0.3, 0.57);
      const collar = MeshBuilder.CreateTorus("c", { diameter: 0.42, thickness: 0.09, tessellation: 18 }, this.scene);
      collar.position.y = 1.02;
      add(collar);
      // a ring of points (the crown) + a ball finial
      for (let i = 0; i < 7; i++) {
        const pt = MeshBuilder.CreateSphere("pt", { diameter: 0.12, segments: 8 }, this.scene);
        const a = (i / 7) * Math.PI * 2;
        pt.position.set(Math.cos(a) * 0.2, 1.18, Math.sin(a) * 0.2);
        add(pt);
      }
      const ball = MeshBuilder.CreateSphere("bl", { diameter: 0.2, segments: 10 }, this.scene);
      ball.position.y = 1.28;
      add(ball);
    } else {
      // king — tallest, topped with a cross
      base(0.92, 0.46, 0.32, 0.6);
      const collar = MeshBuilder.CreateTorus("c", { diameter: 0.42, thickness: 0.09, tessellation: 18 }, this.scene);
      collar.position.y = 1.08;
      add(collar);
      const v = MeshBuilder.CreateBox("cv", { width: 0.1, height: 0.34, depth: 0.1 }, this.scene);
      v.position.y = 1.34;
      add(v);
      const h = MeshBuilder.CreateBox("ch", { width: 0.26, height: 0.1, depth: 0.1 }, this.scene);
      h.position.y = 1.34;
      add(h);
    }
  }

  /* ---------- interaction ---------- */
  private humanControls(c: Color) {
    return this.mode === "2p" || c === "w";
  }

  private tapSquare(r: number, c: number) {
    if (this.over || this.thinking || !this.humanControls(this.turn)) return;
    sfx.unlock();
    const move = this.targets.find((m) => m.tr === r && m.tc === c);
    if (move) {
      this.makeMove(move);
      return;
    }
    const grid = gridFromPieces(this.pieces);
    const t = grid[r][c];
    if (t && colorOf(t) === this.turn) {
      const id = this.pieces.find((p) => !p.dead && p.r === r && p.c === c)!.id;
      this.sel = id;
      this.targets = legalMoves(grid, this.turn, this.rights).filter((mv) => mv.fr === r && mv.fc === c);
    } else {
      this.sel = null;
      this.targets = [];
    }
    this.drawMarkers();
  }

  /* ---------- markers (selection / legal targets / king in check) ---------- */
  private clearMarkers() {
    for (const ch of [...this.fxRoot.getChildMeshes()]) ch.dispose();
  }
  private disc(r: number, c: number, color: string, diameter: number) {
    const d = MeshBuilder.CreateCylinder("mk", { height: 0.04, diameter, tessellation: 28 }, this.scene);
    d.position.set(worldX(c), 0.075, worldZ(r));
    d.material = this.matte(color, true); // emissive → glows through the GlowLayer
    d.isPickable = false;
    d.parent = this.fxRoot;
  }
  private ring(r: number, c: number, color: string) {
    const t = MeshBuilder.CreateTorus("rg", { diameter: 0.86, thickness: 0.1, tessellation: 24 }, this.scene);
    t.position.set(worldX(c), 0.09, worldZ(r));
    t.material = this.matte(color, true);
    t.isPickable = false;
    t.parent = this.fxRoot;
  }
  private drawMarkers() {
    this.clearMarkers();
    const grid = gridFromPieces(this.pieces);
    if (this.sel !== null) {
      const p = this.pieces.find((q) => q.id === this.sel && !q.dead);
      if (p) this.disc(p.r, p.c, "#5fd1ff", 0.94);
    }
    for (const m of this.targets) {
      if (grid[m.tr][m.tc]) this.ring(m.tr, m.tc, "#ff5d5d"); // capture
      else this.disc(m.tr, m.tc, "#46d97a", 0.34); // quiet move
    }
    if (this.check) {
      const k = findKing(grid, this.turn);
      if (k) this.disc(k[0], k[1], "#ff3b3b", 0.94);
    }
  }

  /* ---------- moves + animation ---------- */
  private makeMove(m: Move) {
    this.started = true;
    const next = opp(this.turn);
    const mover = this.pieces.find((p) => !p.dead && p.r === m.fr && p.c === m.fc);
    const captured = !m.castle ? this.pieces.find((p) => !p.dead && p.r === m.tr && p.c === m.tc) : undefined;

    if (captured) sfx.hit();
    else sfx.coin(0);

    this.pieces = applyMovePieces(this.pieces, m);
    this.sel = null;
    this.targets = [];

    if (captured) this.animateCapture(captured.id);
    const knight = (mover?.t ?? "").toLowerCase() === "n";
    if (mover) this.animateSlide(mover.id, m.tr, m.tc, knight, m.promote ? mover.t : undefined);
    if (m.castle) {
      // the rook hops to the king's flank too
      const rr = m.fr;
      const [rookFromC, rookToC] = m.castle === "K" ? [7, 5] : [0, 3];
      const rook = this.pieces.find((p) => !p.dead && p.r === rr && p.c === rookToC);
      if (rook) this.animateSlide(rook.id, rr, rookToC, false);
      void rookFromC;
    }

    this.resolve(gridFromPieces(this.pieces), m, next, !!captured);
    if (this.over) {
      this.drawMarkers();
      this.emit();
      return;
    }
    this.turn = next;
    this.maybeFlipCamera();
    this.drawMarkers();
    this.emit();

    if (this.mode === "cpu" && next === "b") {
      this.thinking = true;
      this.emit();
      this.cpuTimer = window.setTimeout(() => this.cpuMove(), this.reduced ? 240 : 560);
    }
  }

  private cpuMove() {
    this.thinking = false;
    const grid = gridFromPieces(this.pieces);
    const m = aiMove(grid, "b", this.rights, LEVELS[this.level].depth, LEVELS[this.level].blunder);
    if (!m) return; // safety; status already covered mate/stalemate
    const mover = this.pieces.find((p) => !p.dead && p.r === m.fr && p.c === m.fc);
    const captured = !m.castle ? this.pieces.find((p) => !p.dead && p.r === m.tr && p.c === m.tc) : undefined;
    if (captured) sfx.hit();
    else sfx.coin(0);
    this.pieces = applyMovePieces(this.pieces, m);
    if (captured) this.animateCapture(captured.id);
    if (mover) this.animateSlide(mover.id, m.tr, m.tc, mover.t.toLowerCase() === "n", m.promote ? mover.t : undefined);
    if (m.castle) {
      const rr = m.fr;
      const rookToC = m.castle === "K" ? 5 : 3;
      const rook = this.pieces.find((p) => !p.dead && p.r === rr && p.c === rookToC);
      if (rook) this.animateSlide(rook.id, rr, rookToC, false);
    }
    this.resolve(gridFromPieces(this.pieces), m, "w", !!captured);
    if (!this.over) this.turn = "w";
    this.drawMarkers();
    this.emit();
  }

  private resolve(g: ReturnType<typeof gridFromPieces>, m: Move, next: Color, captured: boolean) {
    this.rights = updateRights(this.rights, m);
    // 50-move clock + threefold repetition (a pawn move or a capture resets the clock)
    this.halfmove = m.t.toLowerCase() === "p" || captured ? 0 : this.halfmove + 1;
    const key = positionKey(g, next);
    const repCount = (this.reps.get(key) ?? 0) + 1;
    this.reps.set(key, repCount);

    const st: Status = evaluateStatus(g, next, this.halfmove, repCount, this.rights);
    const { msg, celebrate } = describe(st, this.mode);
    this.check = st.check;
    this.msg = msg;
    if (st.over) {
      this.over = true;
      this.win = celebrate;
      if (celebrate) sfx.fanfare();
      else if (st.kind === "checkmate") sfx.over();
    } else if (st.check) {
      sfx.boing();
    }
  }

  private animateSlide(id: number, tr: number, tc: number, knight: boolean, newType?: string) {
    const view = this.views.get(id);
    if (!view) return;
    const to = new Vector3(worldX(tc), TILE_TOP, worldZ(tr));
    const finish = () => {
      view.root.position.copyFrom(to);
      if (newType) this.swapPieceType(id, newType); // pawn → queen on promotion
    };
    if (this.reduced) {
      finish();
      return;
    }
    this.tweens.push({
      node: view.root,
      t: 0,
      dur: MOVE_DUR,
      pFrom: view.root.position.clone(),
      pTo: to,
      arc: knight ? 0.9 : 0.16,
      onDone: finish,
    });
  }

  private animateCapture(id: number) {
    const view = this.views.get(id);
    if (!view) return;
    const remove = () => {
      view.root.dispose();
      this.views.delete(id);
      this.pieces = this.pieces.filter((p) => p.id !== id);
    };
    if (this.reduced) {
      remove();
      return;
    }
    // sink + shrink, starting a touch after the attacker sets off so the blow lands
    const from = view.root.position.clone();
    this.tweens.push({
      node: view.root,
      t: -CAPTURE_DELAY,
      dur: MOVE_DUR,
      pFrom: from,
      pTo: new Vector3(from.x, -0.8, from.z),
      sFrom: 1,
      sTo: 0.01,
      onDone: remove,
    });
  }

  /** Replace a piece's meshes with another type's, in place (pawn promotion). */
  private swapPieceType(id: number, newType: string) {
    const view = this.views.get(id);
    if (!view) return;
    const pos = view.root.position.clone();
    view.root.dispose();
    this.views.delete(id);
    const p = this.pieces.find((q) => q.id === id);
    const fresh = this.buildPieceView(newType, 0, 0);
    fresh.root.position.copyFrom(pos);
    fresh.t = newType;
    this.views.set(id, fresh);
    if (p) p.t = newType; // keep the logical board in sync (applyMovePieces already promoted, but be safe)
  }

  private maybeFlipCamera() {
    if (this.mode !== "2p") return; // computer always plays Black from White's view
    this.flipTo = this.turn === "w" ? WHITE_ALPHA : BLACK_ALPHA;
  }

  /* ---------- update loop ---------- */
  private update(dt: number) {
    if (dt <= 0) return;
    // tweens
    if (this.tweens.length) {
      const live: Tween[] = [];
      for (const tw of this.tweens) {
        tw.t += dt;
        if (tw.t < 0) {
          live.push(tw);
          continue;
        }
        const k = Math.min(1, tw.t / tw.dur);
        const e = easeInOut(k);
        if (tw.pFrom && tw.pTo) {
          const p = Vector3.Lerp(tw.pFrom, tw.pTo, e);
          if (tw.arc) p.y += tw.arc * Math.sin(Math.PI * k);
          tw.node.position.copyFrom(p);
        }
        if (tw.sFrom != null && tw.sTo != null) {
          const s = tw.sFrom + (tw.sTo - tw.sFrom) * e;
          tw.node.scaling.set(s, s, s);
        }
        if (k >= 1) tw.onDone?.();
        else live.push(tw);
      }
      this.tweens = live;
    }
    // camera auto-flip (2-player)
    if (this.flipTo != null) {
      let d = this.flipTo - this.camera.alpha;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      if (Math.abs(d) < 0.01 || this.reduced) {
        this.camera.alpha = this.flipTo;
        this.flipTo = null;
      } else {
        this.camera.alpha += d * Math.min(1, dt * 4);
      }
    }
  }

  /* ---------- public API (React host) ---------- */
  newGame(mode: Mode, level: Level) {
    window.clearTimeout(this.cpuTimer);
    this.mode = mode;
    this.level = level;
    this.turn = "w";
    this.sel = null;
    this.targets = [];
    this.started = false;
    this.over = false;
    this.win = false;
    this.thinking = false;
    this.check = false;
    this.msg = firstMsg(mode);
    this.rights = { ...FULL_RIGHTS };
    this.halfmove = 0;
    this.reps = new Map();
    this.tweens = [];
    this.flipTo = mode === "2p" ? WHITE_ALPHA : null;
    this.camera.alpha = WHITE_ALPHA;
    this.setupPieces();
    this.clearMarkers();
    this.emit();
  }

  setLevel(level: Level) {
    this.level = level;
  }

  resetView() {
    this.camera.alpha = this.turn === "b" && this.mode === "2p" ? BLACK_ALPHA : WHITE_ALPHA;
    this.camera.beta = 0.92;
    this.camera.radius = 12;
    this.flipTo = null;
  }

  private emit() {
    this.onState({
      msg: this.msg,
      check: this.check,
      over: this.over,
      win: this.win,
      thinking: this.thinking,
      started: this.started,
      turn: this.turn,
    });
  }

  resize() {
    this.engine.resize();
  }

  dispose() {
    window.clearTimeout(this.cpuTimer);
    this.engine.stopRenderLoop();
    this.scene.dispose();
    this.engine.dispose();
  }
}
