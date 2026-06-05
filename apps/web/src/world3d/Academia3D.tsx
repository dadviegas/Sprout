/* Academia dos Elementos — the 3D world host (React). Owns the <canvas>, the HUD
 * (level/XP/coins/energy from useWorld), the on-screen joystick + action button
 * and the keyboard, and opens the right screen when the child interacts: the
 * study portal → school content, the mission board / Mestre → the dashboard, the
 * Dragão → the battle. All 3D lives in engine.ts. See the doc's 3D spec. */
import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@sprout/icons";
import { Speaker, speak } from "@sprout/ui";
import type { View } from "../nav";
import { elementById } from "../world/world-data";
import type { World } from "../world/world-state";
import { Dashboard } from "../world/Dashboard";
import { DragonBattle } from "../world/DragonBattle";
import { VirtualControls } from "../world/VirtualControls";
import { Academia3DEngine, type Nearby } from "./engine";

const ACTION_ICON: Record<string, IconName> = {
  study: "reading",
  missions: "target",
  mestre: "people",
  dragon: "danger",
  pets: "paw",
  house: "home",
};

export function Academia3D({ world, onGo }: { world: World; onGo: (v: View) => void }) {
  const hero = world.hero!;
  const el = elementById.get(hero.element)!;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Academia3DEngine | null>(null);
  const [nearby, setNearby] = useState<Nearby | null>(null);
  const [crystals, setCrystals] = useState(0);
  const [showDash, setShowDash] = useState(false);
  const [showBattle, setShowBattle] = useState(false);
  const [dialog, setDialog] = useState<string | null>(null);
  const dialogTimer = useRef<number>();

  // Pets are Phase-2; the house unlocks after 3 final tests.
  const houseLocked = world.stats.lessonsDone < 3;
  const lockedIds = houseLocked ? ["pets", "house"] : ["pets"];

  // Build the engine once. lockedIds is captured at mount; re-mounting on hero
  // change is enough for Phase 1 (the lock only flips after real study anyway).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new Academia3DEngine(canvas, {
      element: hero.element,
      lockedIds,
      onNearby: setNearby,
      onCrystals: setCrystals,
    });
    engineRef.current = engine;
    const onResize = () => engine.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      engine.dispose();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hero.element]);

  const say = (text: string) => {
    setDialog(text);
    speak(text);
    window.clearTimeout(dialogTimer.current);
    dialogTimer.current = window.setTimeout(() => setDialog(null), 5000);
  };

  // Pause input (and let overlays take focus) while a screen is open.
  const overlayOpen = showDash || showBattle;

  const interact = (n: Nearby | null) => {
    if (!n || overlayOpen) return;
    if (n.locked) {
      say(n.id === "house" ? `A casa abre depois de 3 testes. Faltam ${3 - world.stats.lessonsDone}.` : "O ninho dos companheiros. Em breve!");
      return;
    }
    switch (n.id) {
      case "study":
        onGo({ kind: "home" });
        break;
      case "missions":
        setShowDash(true);
        break;
      case "mestre": {
        const m = world.missions.find((x) => x.claimable) ?? world.missions.find((x) => !x.complete);
        say(m ? `Bem-vindo, ${hero.name}! A tua próxima missão: ${m.blurb}` : `Bem-vindo, ${hero.name}! Já completaste tudo. Incrível!`);
        break;
      }
      case "dragon":
        setShowBattle(true);
        break;
      default:
        say(n.label);
    }
  };

  // keyboard: WASD/arrows to move, E/Space/Enter to interact
  useEffect(() => {
    const keys = new Set<string>();
    const apply = () => {
      const x = (keys.has("right") ? 1 : 0) - (keys.has("left") ? 1 : 0);
      const y = (keys.has("down") ? 1 : 0) - (keys.has("up") ? 1 : 0);
      engineRef.current?.setMove(x, y);
    };
    const map: Record<string, "up" | "down" | "left" | "right"> = {
      arrowup: "up", w: "up", arrowdown: "down", s: "down",
      arrowleft: "left", a: "left", arrowright: "right", d: "right",
    };
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === " ") { e.preventDefault(); engineRef.current?.jump(); return; }
      if (k === "e" || k === "enter") { e.preventDefault(); interactRef.current(); return; }
      const m = map[k];
      if (m) { keys.add(m); apply(); e.preventDefault(); }
    };
    const up = (e: KeyboardEvent) => {
      const m = map[e.key.toLowerCase()];
      if (m) { keys.delete(m); apply(); }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // keep the latest interact handler for the (once-registered) keyboard listener
  const interactRef = useRef<() => void>(() => {});
  interactRef.current = () => interact(nearby);

  const actionPrompt = nearby ? (nearby.locked ? "Bloqueado" : nearby.label) : null;

  return (
    <div className="wd-scene sprout-fade-up" style={{ ["--el" as string]: el.color }}>
      <div className="wd-hud">
        <div className="wd-hud__stats">
          <span className="wd-hud__chip"><Icon name="shield" size={16} /> Nv {world.level}</span>
          <span className="wd-hud__chip"><Icon name="star" size={16} /> {world.xp}</span>
          <span className="wd-hud__chip"><Icon name="coin" size={16} /> {world.coins}</span>
          <span className="wd-hud__chip"><Icon name="bolt" size={16} /> {world.energy}%</span>
          <span className="wd-hud__chip"><Icon name="sparkle" size={16} /> {crystals}</span>
        </div>
        <button className="wd-hud__menu" onClick={() => setShowDash(true)}>
          <Icon name="shield" size={18} /> Painel
        </button>
      </div>

      {nearby && (
        <div className="wd-objective">
          <Icon name={nearby.locked ? "lock" : ACTION_ICON[nearby.id] ?? "target"} size={16} />
          <span className="wd-objective__text">{nearby.locked ? "Bloqueado" : nearby.label}: {labelFor(nearby.id)}</span>
          <Speaker text={`${labelFor(nearby.id)}`} size={14} />
        </div>
      )}

      <div className="wd-scene3d">
        <canvas ref={canvasRef} className="wd-canvas3d" aria-label="Academia dos Elementos — mundo 3D" />

        <VirtualControls
          onMove={(a) => engineRef.current?.setMove(a.x, a.y)}
          onAction={() => interact(nearby)}
          onJump={() => engineRef.current?.jump()}
          actionPrompt={actionPrompt}
          actionIcon={nearby ? ACTION_ICON[nearby.id] ?? "target" : "target"}
          actionColor={el.color}
        />

        {dialog && (
          <div className="wd-dialog" role="status">
            <span>{dialog}</span>
            <button className="wd-dialog__x" onClick={() => setDialog(null)} aria-label="Fechar"><Icon name="close" size={16} /></button>
          </div>
        )}
      </div>

      {showDash && <Dashboard world={world} onGo={onGo} onClose={() => setShowDash(false)} />}
      {showBattle && <DragonBattle world={world} onClose={() => setShowBattle(false)} />}
    </div>
  );
}

function labelFor(id: string): string {
  switch (id) {
    case "study": return "o portal de estudo";
    case "missions": return "o quadro de missões";
    case "mestre": return "o Mestre da Academia";
    case "dragon": return "o Dragão do Caos";
    case "pets": return "o ninho dos companheiros";
    case "house": return "a tua casa";
    default: return id;
  }
}
