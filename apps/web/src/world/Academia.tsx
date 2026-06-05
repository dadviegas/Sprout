/* Academia dos Elementos — the entry router for the meta-game (Phase 1 + 2D scene).
 *
 *   no hero  → Creator   (pick an element, name the hero)
 *   has hero → WorldScene (the playable courtyard; the dashboard opens as an
 *              overlay from inside the scene)
 *
 * See docs/SPROUT_WORLD_ACADEMIA_DOS_ELEMENTOS.md. */
import { Suspense, lazy, useState } from "react";
import { Speaker, speak } from "@sprout/ui";
import { Icon } from "@sprout/icons";
import { Mascot } from "../Mascot";
import type { View } from "../nav";
import { ELEMENTS, elementById, type ElementId } from "./world-data";
import { useWorld, type World } from "./world-state";
import { Emblem, Hero } from "./emblems";
import { WorldScene } from "./WorldScene";

// The 3D world pulls in Babylon — heavy, and only needed once a hero exists and
// motion is allowed. Lazy-load it so the creator/2D path never ships Babylon.
const Academia3D = lazy(() => import("../world3d/Academia3D").then((m) => ({ default: m.Academia3D })));

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function Academia({ onGo }: { onGo: (v: View) => void }) {
  const world = useWorld();
  if (!world.hero) return <Creator world={world} />;
  // Reduced-motion (or no WebGL) falls back to the calm 2D courtyard.
  if (prefersReducedMotion()) return <WorldScene world={world} onGo={onGo} />;
  return (
    <Suspense fallback={<div className="lesson-loading">A entrar no mundo…</div>}>
      <Academia3D world={world} onGo={onGo} />
    </Suspense>
  );
}

/* ---- hero creation ----------------------------------------------------- */

function Creator({ world }: { world: World }) {
  const [element, setElement] = useState<ElementId>("fire");
  const [name, setName] = useState("");
  const el = elementById.get(element)!;

  const pick = (id: ElementId) => {
    setElement(id);
    const e = elementById.get(id)!;
    speak(`${e.label}. ${e.blurb}`);
  };

  return (
    <div className="sprout-fade-up">
      <Mascot message="Bem-vindo à Academia dos Elementos! Escolhe o teu elemento e cria o teu herói." mood="cheer" />

      <div className="wd-create" style={{ ["--el" as string]: el.color }}>
        <div className="wd-create__preview">
          <Hero element={element} color={el.color} size={150} />
          <div className="wd-create__pet">
            <Emblem element={element} color={el.color} size={18} /> Companheiro: {el.pet}
          </div>
        </div>

        <div className="wd-create__form">
          <h2 className="wd-h2">
            <Icon name="sparkle" size={22} /> Escolhe o teu elemento
            <Speaker text="Escolhe o teu elemento" size={16} />
          </h2>
          <div className="wd-elements">
            {ELEMENTS.map((e) => (
              <button
                key={e.id}
                className={`wd-element ${e.id === element ? "on" : ""}`}
                style={{ ["--el" as string]: e.color }}
                onClick={() => pick(e.id)}
                aria-pressed={e.id === element}
              >
                <span className="wd-element__art"><Emblem element={e.id} color={e.color} size={30} /></span>
                <span className="wd-element__label">{e.label}</span>
              </button>
            ))}
          </div>

          <p className="wd-blurb">{el.blurb}</p>

          <label className="wd-name">
            <span className="wd-name__label">O nome do teu herói</span>
            <input
              className="wd-name__input"
              value={name}
              maxLength={20}
              placeholder="Ex.: Faísca"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <button
            className="wd-cta"
            style={{ ["--el" as string]: el.color }}
            onClick={() => world.createHero({ name: name.trim() || "Guardião", element })}
          >
            <Icon name="check" size={22} /> Criar o meu herói
          </button>
        </div>
      </div>
    </div>
  );
}
