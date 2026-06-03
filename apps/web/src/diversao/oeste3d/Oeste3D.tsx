import { useEffect, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker } from "@sprout/ui";
import { prefersReducedMotion } from "../canvas";
import { sfx } from "../sfx";
import { Oeste3DGame, type HudState } from "./engine";

/* Velho Oeste 3D — React host for the Babylon platformer. It owns the <canvas>,
 * the HUD/overlays, and the touch controls (a left thumb-stick + Saltar/Água
 * buttons), and feeds input into the engine. All 3D lives in engine.ts; this
 * file never imports Babylon types beyond the game class, so the heavy chunk
 * only loads when the arcade hub lazy-imports this component.
 *
 * Controls: drag the left stick to walk, tap Saltar to jump, tap Água to fire
 * the water pistol. On a computer: WASD / arrows + Space + J. */

const STICK_R = 52; // px radius of the thumb-stick travel

export function Oeste3D() {
  const reduced = prefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Oeste3DGame | null>(null);
  const [hud, setHud] = useState<HudState>({ phase: "ready", coins: 0, hearts: 3, best: 0 });
  const [muted, setMuted] = useState(() => sfx.isMuted());
  const [knob, setKnob] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = new Oeste3DGame(canvas, { reduced, onState: setHud });
    gameRef.current = game;

    const onResize = () => game.resize();
    window.addEventListener("resize", onResize);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        game.jump();
      } else if (e.code === "KeyJ" || e.code === "Enter") {
        e.preventDefault();
        game.squirt();
      } else {
        game.setKey(e.code, true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => game.setKey(e.code, false);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      game.dispose();
      gameRef.current = null;
    };
  }, [reduced]);

  /* ---- left thumb-stick ---- */
  const stickRef = useRef<HTMLDivElement>(null);
  const stickId = useRef<number | null>(null);
  const onStickDown = (e: React.PointerEvent) => {
    sfx.unlock();
    stickId.current = e.pointerId;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    moveStick(e);
  };
  const moveStick = (e: React.PointerEvent) => {
    if (stickId.current !== e.pointerId) return;
    const el = stickRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let dx = e.clientX - (r.left + r.width / 2);
    let dy = e.clientY - (r.top + r.height / 2);
    const len = Math.hypot(dx, dy);
    if (len > STICK_R) {
      dx = (dx / len) * STICK_R;
      dy = (dy / len) * STICK_R;
    }
    setKnob({ x: dx, y: dy });
    gameRef.current?.setMove(dx / STICK_R, dy / STICK_R);
  };
  const endStick = (e: React.PointerEvent) => {
    if (stickId.current !== e.pointerId) return;
    stickId.current = null;
    setKnob({ x: 0, y: 0 });
    gameRef.current?.setMove(0, 0);
  };

  const begin = () => gameRef.current?.begin();
  const playing = hud.phase === "playing";
  const resultSay =
    hud.phase === "won"
      ? `Boa! Chegaste ao saloon com ${hud.coins} moedas de ouro!`
      : `Apanhaste ${hud.coins} moedas. O teu recorde é ${hud.best}.`;

  return (
    <div className="dv-play">
      <div className="dv-scorebar">
        <span className="dv-score">
          <Icon name="coin" size={18} fill="currentColor" /> {hud.coins}
        </span>
        <span className="dv-score dv-score--hearts" aria-label={`${hud.hearts} vidas`}>
          {Array.from({ length: 3 }, (_, i) => (
            <Icon key={i} name="heart" size={20} fill={i < hud.hearts ? "currentColor" : "none"} />
          ))}
        </span>
        <span style={{ display: "inline-flex", gap: 8 }}>
          <button
            className={`dv-tool ${muted ? "" : "is-active"}`}
            onClick={() => setMuted(sfx.toggleMuted())}
            aria-label={muted ? "Ligar o som" : "Desligar o som"}
            title={muted ? "Ligar o som" : "Desligar o som"}
          >
            <Icon name="music" size={20} />
          </button>
          <button className="dv-tool" onClick={begin} aria-label="Recomeçar" title="Recomeçar">
            <Icon name="refresh" size={20} />
          </button>
        </span>
      </div>

      <div className="dv-arcade o3-stage">
        <canvas ref={canvasRef} className="dv-canvas" aria-label="Velho Oeste 3D — guia o vaqueiro até ao saloon" />

        {/* touch controls — only while playing */}
        {playing && (
          <div className="o3-controls" aria-hidden>
            <div
              ref={stickRef}
              className="o3-stick"
              onPointerDown={onStickDown}
              onPointerMove={moveStick}
              onPointerUp={endStick}
              onPointerCancel={endStick}
            >
              <span className="o3-knob" style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }} />
            </div>
            <div className="o3-actions">
              <button
                className="o3-btn o3-btn--squirt"
                onPointerDown={(e) => {
                  e.preventDefault();
                  gameRef.current?.squirt();
                }}
                aria-label="Disparar a pistola de água"
              >
                <Icon name="drop" size={26} />
              </button>
              <button
                className="o3-btn o3-btn--jump"
                onPointerDown={(e) => {
                  e.preventDefault();
                  gameRef.current?.jump();
                }}
                aria-label="Saltar"
              >
                <Icon name="forward" size={28} style={{ transform: "rotate(-90deg)" }} />
              </button>
            </div>
          </div>
        )}

        {hud.phase === "ready" && (
          <div className="dv-overlay" onClick={begin} role="button" tabIndex={0} aria-label="Começar a jogar">
            <h3 className="dv-overlay__title">Velho Oeste 3D 🤠</h3>
            <p className="dv-overlay__sub">
              Guia o vaqueiro até ao saloon! Arrasta para andar, salta pelas mesas, molha os bandidos com a pistola de água e apanha o ouro.
            </p>
            <button className="dv-tool dv-tool--wide" onClick={begin}>
              <Icon name="forward" size={20} /> <span>Começar</span>
            </button>
            {hud.best > 0 && (
              <p className="dv-overlay__best">
                <Icon name="trophy" size={16} /> Recorde: {hud.best} moedas
              </p>
            )}
          </div>
        )}

        {(hud.phase === "won" || hud.phase === "over") && (
          <div className="dv-overlay">
            <h3 className="dv-overlay__title">{hud.phase === "won" ? "Chegaste ao Saloon! 🎉" : "Apanhado pelos bandidos!"}</h3>
            <p className="dv-overlay__score">
              {hud.coins} <Icon name="coin" size={34} fill="currentColor" />
            </p>
            <p className="dv-overlay__best">
              <Icon name="trophy" size={16} /> Recorde: {hud.best} moedas
            </p>
            <div style={{ display: "inline-flex", gap: 10, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              <Speaker text={resultSay} className="dv-tool" label="Ouvir o resultado" size={20} />
              <button className="dv-tool dv-tool--wide" onClick={begin}>
                <Icon name="refresh" size={20} /> <span>Jogar outra vez</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
