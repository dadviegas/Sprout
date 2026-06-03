import { useEffect, useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { Speaker, Confetti } from "@sprout/ui";
import { prefersReducedMotion } from "../canvas";
import { LEVEL_PT, type Level, type Mode } from "../chess";
import { Xadrez3DGame, type HudState } from "./engine";

/* Xadrez 3D — React host for the Babylon chess board. It owns the <canvas>, the
 * toolbar (back · mode · level · new game · reset view · fullscreen · sound) and
 * the status line; all 3D + the rules choreography live in engine.ts. The child
 * orbits the board by dragging the canvas and plays by tapping a piece then a
 * square (the engine raycasts the tap to a board square).
 *
 * Like the 2D board this carries its own compact toolbar (with the back button)
 * so every control sits on one row, leaving the most height for the scene. */

export function Xadrez3D({ onBack }: { onBack: () => void }) {
  const reduced = prefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Xadrez3DGame | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("cpu");
  const [level, setLevel] = useState<Level>("medio");
  const [hud, setHud] = useState<HudState>({ msg: "", check: false, over: false, win: false, thinking: false, started: false, turn: "w" });
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = new Xadrez3DGame(canvas, { reduced, mode, level, onState: setHud });
    gameRef.current = game;
    const onResize = () => game.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      game.dispose();
      gameRef.current = null;
    };
    // The engine is created once; mode/level changes go through newGame() below so a
    // game in progress is never silently rebuilt under the player.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);
  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else rootRef.current?.requestFullscreen?.();
  };

  const newGame = (nextMode: Mode = mode, nextLevel: Level = level) => {
    setMode(nextMode);
    setLevel(nextLevel);
    gameRef.current?.newGame(nextMode, nextLevel);
  };

  return (
    <div className={`dv-play ${fullscreen ? "is-fullscreen" : ""}`} ref={rootRef}>
      <div className="dv-toolbar" role="toolbar">
        <button className="dv-tool dv-tool--wide" onClick={onBack} aria-label="Voltar aos jogos">
          <Icon name="back" size={20} />
          <span>Voltar aos jogos</span>
        </button>
        {!hud.started && (
          <div className="dv-segment dv-segment--inline" role="group" aria-label="Modo de jogo">
            <button className={`dv-seg ${mode === "cpu" ? "is-active" : ""}`} onClick={() => newGame("cpu")} aria-pressed={mode === "cpu"}>
              1 jogador
            </button>
            <button className={`dv-seg ${mode === "2p" ? "is-active" : ""}`} onClick={() => newGame("2p")} aria-pressed={mode === "2p"}>
              2 jogadores
            </button>
          </div>
        )}
        {!hud.started && mode === "cpu" && (
          <div className="dv-segment dv-segment--inline" role="group" aria-label="Nível do computador">
            {(["facil", "medio", "dificil"] as Level[]).map((lv) => (
              <button key={lv} className={`dv-seg ${level === lv ? "is-active" : ""}`} onClick={() => newGame(mode, lv)} aria-pressed={level === lv}>
                {LEVEL_PT[lv]}
              </button>
            ))}
          </div>
        )}
        <button className="dv-tool dv-tool--wide" onClick={() => newGame()}>
          <Icon name="refresh" size={20} />
          <span>Novo jogo</span>
        </button>
        <button className="dv-tool" onClick={() => gameRef.current?.resetView()} aria-label="Endireitar a vista" title="Endireitar a vista">
          <Icon name="compass" size={22} />
        </button>
        <button
          className="dv-tool"
          onClick={toggleFullscreen}
          aria-label={fullscreen ? "Sair do ecrã inteiro" : "Ecrã inteiro"}
          title={fullscreen ? "Sair do ecrã inteiro" : "Ecrã inteiro"}
        >
          <Icon name={fullscreen ? "collapse" : "expand"} size={22} />
        </button>
        <Speaker text={hud.msg} className="dv-tool" label="Ouvir" size={22} />
      </div>

      <p className={`xb-msg ${hud.check ? "is-check" : ""} ${hud.over ? "is-over" : ""}`} aria-live="polite">
        {hud.thinking ? "O computador está a pensar…" : hud.msg}
      </p>

      <div className="dv-arcade x3-stage">
        <canvas ref={canvasRef} className="dv-canvas" aria-label="Xadrez 3D — toca numa peça e depois no quadrado para onde queres ir; arrasta para rodar o tabuleiro" />
      </div>

      {hud.win && <Confetti pieces={reduced ? 18 : 60} />}
    </div>
  );
}
