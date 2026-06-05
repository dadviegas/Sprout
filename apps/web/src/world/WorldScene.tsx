/* Academia dos Elementos — the playable 2D scene. The hero stands in a small
 * Academia courtyard; the child moves with the on-screen joystick (or WASD/arrows
 * on desktop) and interacts with the action button (or E/Space) when near an
 * object: the Mestre (next mission), the Estudar portal (→ school content), the
 * mission board (→ dashboard overlay), and the still-locked Pets nest and House.
 *
 * It's plain React/SVG positioned absolutely (no canvas yet) — easiest to make
 * accessible and to wire to the existing screens. The camera centres on the hero
 * and clamps to the world bounds. Honours prefers-reduced-motion. */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker, speak } from "@sprout/ui";
import type { View } from "../nav";
import { elementById } from "./world-data";
import type { World } from "./world-state";
import { Hero, Master, Dragon } from "./emblems";
import { Dashboard } from "./Dashboard";
import { DragonBattle } from "./DragonBattle";
import { VirtualControls, type Axis } from "./VirtualControls";
import {
  WORLD,
  AVATAR_START,
  AVATAR_RADIUS,
  AVATAR_SPEED,
  INTERACT_RADIUS,
  WORLD_OBJECTS,
  isLocked,
  lockReason,
  type WorldObject,
} from "./world-map";

/** Camera offset for one axis: follow the hero, but never show past the edges. */
function camOffset(center: number, viewport: number, world: number): number {
  if (world <= viewport) return (viewport - world) / 2; // world fits — centre it
  return Math.max(viewport - world, Math.min(0, viewport / 2 - center));
}

const KEY_MAP: Record<string, "up" | "down" | "left" | "right"> = {
  arrowup: "up", w: "up",
  arrowdown: "down", s: "down",
  arrowleft: "left", a: "left",
  arrowright: "right", d: "right",
};

export function WorldScene({ world, onGo }: { world: World; onGo: (v: View) => void }) {
  const hero = world.hero!;
  const el = elementById.get(hero.element)!;
  const [showDash, setShowDash] = useState(false);
  const [showBattle, setShowBattle] = useState(false);

  const [pos, setPos] = useState(AVATAR_START);
  const posRef = useRef(pos);
  posRef.current = pos;
  const axisRef = useRef<Axis>({ x: 0, y: 0 });
  const keysRef = useRef<Set<string>>(new Set());

  // viewport size, for clamping the camera to the world bounds
  const vpRef = useRef<HTMLDivElement>(null);
  const [vp, setVp] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const measure = () => {
      const e = vpRef.current;
      if (e) setVp({ w: e.clientWidth, h: e.clientHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // The movement loop. Paused while an overlay (dashboard / battle) is open so the
  // hero doesn't wander behind it. Movement itself is user-driven, so it stays on
  // even under reduced-motion (only decorative idle motion is disabled, in CSS).
  useEffect(() => {
    if (showDash || showBattle) return;
    let raf = 0;
    const step = () => {
      const a = axisRef.current;
      const k = keysRef.current;
      let dx = a.x;
      let dy = a.y;
      if (k.has("up")) dy -= 1;
      if (k.has("down")) dy += 1;
      if (k.has("left")) dx -= 1;
      if (k.has("right")) dx += 1;
      const mag = Math.hypot(dx, dy);
      if (mag > 0.02) {
        if (mag > 1) { dx /= mag; dy /= mag; }
        const p = posRef.current;
        const nx = Math.max(AVATAR_RADIUS, Math.min(WORLD.width - AVATAR_RADIUS, p.x + dx * AVATAR_SPEED));
        const ny = Math.max(AVATAR_RADIUS, Math.min(WORLD.height - AVATAR_RADIUS, p.y + dy * AVATAR_SPEED));
        if (nx !== p.x || ny !== p.y) setPos({ x: nx, y: ny });
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [showDash, showBattle]);

  // The object currently within reach (nearest inside INTERACT_RADIUS).
  const active = useMemo<WorldObject | null>(() => {
    let best: WorldObject | null = null;
    let bestD = INTERACT_RADIUS;
    for (const o of WORLD_OBJECTS) {
      const d = Math.hypot(o.x - pos.x, o.y - pos.y);
      if (d <= bestD) { bestD = d; best = o; }
    }
    return best;
  }, [pos]);

  const [dialog, setDialog] = useState<string | null>(null);
  const dialogTimer = useRef<number>();
  const say = useCallback((text: string) => {
    setDialog(text);
    speak(text);
    window.clearTimeout(dialogTimer.current);
    dialogTimer.current = window.setTimeout(() => setDialog(null), 5000);
  }, []);

  // Perform an object's action (lock check first). Used by the action button, the
  // keyboard, and tapping an object directly.
  const doInteract = useCallback(
    (o: WorldObject) => {
      if (isLocked(o, world.stats)) {
        say(lockReason(o, world.stats));
        return;
      }
      switch (o.kind) {
        case "study":
          onGo({ kind: "home" });
          break;
        case "missions":
          setShowDash(true);
          break;
        case "dragon":
          setShowBattle(true);
          break;
        case "mestre": {
          const m = world.missions.find((x) => x.claimable) ?? world.missions.find((x) => !x.complete);
          say(m ? `${o.say} A tua próxima missão: ${m.blurb}` : `${o.say} Já completaste tudo. Incrível!`);
          break;
        }
        default:
          say(o.say);
      }
    },
    [world.stats, world.missions, onGo, say],
  );

  // Keep the latest active object + handler in refs so the keyboard listener (set
  // up once) always calls the current version.
  const interactRef = useRef<() => void>(() => {});
  interactRef.current = () => { if (active) doInteract(active); };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "e" || k === " " || k === "enter") { e.preventDefault(); interactRef.current(); return; }
      const m = KEY_MAP[k];
      if (m) { keysRef.current.add(m); e.preventDefault(); }
    };
    const up = (e: KeyboardEvent) => {
      const m = KEY_MAP[e.key.toLowerCase()];
      if (m) keysRef.current.delete(m);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // A tap on an object: interact if in reach, otherwise nudge the child closer.
  const onObjectTap = (o: WorldObject) => {
    const d = Math.hypot(o.x - pos.x, o.y - pos.y);
    if (d <= INTERACT_RADIUS) doInteract(o);
    else say(`Vai até ${o.label}.`);
  };

  const camX = camOffset(pos.x, vp.w, WORLD.width);
  const camY = camOffset(pos.y, vp.h, WORLD.height);
  const activeMission = world.missions.find((m) => m.claimable) ?? world.missions.find((m) => !m.complete);

  return (
    <div className="wd-scene sprout-fade-up" style={{ ["--el" as string]: el.color }}>
      {/* HUD */}
      <div className="wd-hud">
        <div className="wd-hud__stats">
          <span className="wd-hud__chip"><Icon name="shield" size={16} /> Nv {world.level}</span>
          <span className="wd-hud__chip"><Icon name="star" size={16} /> {world.xp}</span>
          <span className="wd-hud__chip"><Icon name="coin" size={16} /> {world.coins}</span>
          <span className="wd-hud__chip"><Icon name="bolt" size={16} /> {world.energy}%</span>
        </div>
        <button className="wd-hud__menu" onClick={() => setShowDash(true)}>
          <Icon name="shield" size={18} /> Painel
        </button>
      </div>

      {activeMission && (
        <div className="wd-objective">
          <Icon name="target" size={16} />
          <span className="wd-objective__text">{activeMission.claimable ? "Recebe a recompensa!" : activeMission.blurb}</span>
          <Speaker text={`Missão: ${activeMission.blurb}`} size={14} />
        </div>
      )}

      {/* the world viewport (camera) */}
      <div className="wd-scene__viewport" ref={vpRef} style={{ touchAction: "none" }}>
        <div
          className="wd-world"
          style={{ width: WORLD.width, height: WORLD.height, transform: `translate(${camX}px, ${camY}px)` }}
        >
          {WORLD_OBJECTS.map((o) => {
            const locked = isLocked(o, world.stats);
            const near = active?.id === o.id;
            return (
              <button
                key={o.id}
                className={`wd-obj ${near ? "active" : ""} ${locked ? "locked" : ""} ${o.sprite ? "sprite" : ""}`}
                style={{ left: o.x, top: o.y, ["--oc" as string]: o.color }}
                onClick={() => onObjectTap(o)}
                aria-label={o.label}
              >
                {o.sprite === "master" ? (
                  <span className="wd-obj__sprite"><Master size={104} /></span>
                ) : o.sprite === "dragon" ? (
                  <span className="wd-obj__sprite"><Dragon size={120} /></span>
                ) : (
                  <span className="wd-obj__disc">
                    <Icon name={locked ? "lock" : o.icon} size={30} />
                  </span>
                )}
                <span className="wd-obj__label">{o.label}</span>
                {near && <span className="wd-obj__hint">{locked ? "🔒" : o.prompt}</span>}
              </button>
            );
          })}

          {/* the hero */}
          <div className="wd-avatar" style={{ left: pos.x, top: pos.y }}>
            <Hero element={hero.element} color={el.color} size={64} />
            <span className="wd-avatar__name">{hero.name}</span>
          </div>
        </div>

        {dialog && (
          <div className="wd-dialog" role="status">
            <span>{dialog}</span>
            <button className="wd-dialog__x" onClick={() => setDialog(null)} aria-label="Fechar"><Icon name="close" size={16} /></button>
          </div>
        )}
      </div>

      <VirtualControls
        onMove={(a) => { axisRef.current = a; }}
        onAction={() => { if (active) doInteract(active); }}
        actionPrompt={active ? (isLocked(active, world.stats) ? "Bloqueado" : active.prompt) : null}
        actionIcon={active ? active.icon : "target"}
        actionColor={active ? active.color : "var(--accent)"}
      />

      {showDash && <Dashboard world={world} onGo={onGo} onClose={() => setShowDash(false)} />}
      {showBattle && <DragonBattle world={world} onClose={() => setShowBattle(false)} />}
    </div>
  );
}
