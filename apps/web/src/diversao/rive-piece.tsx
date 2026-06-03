import { useEffect, type CSSProperties } from "react";
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from "@rive-app/react-canvas";

/* Plays a dropped-in Rive character for a chess piece and drives it from the game.
 *
 * Contract for the .riv file (static/characters/<piece>-<color>.riv) — see that
 * folder's README: ONE state machine named "main" with TRIGGER inputs `walk`, `attack`,
 * `die`; the resting state is idle. The board fires `walk` when the piece moves,
 * `attack` when it captures, and `die` when it is captured. Missing inputs are just
 * ignored (optional chaining), so a simpler character still loads and idles. */
const SM = "main";

export function RivePiece({
  url,
  anim,
  dead,
  className,
  style,
}: {
  url: string;
  anim: "walk" | "attack" | null;
  dead: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const { rive, RiveComponent } = useRive({
    src: url,
    stateMachines: SM,
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });
  const walk = useStateMachineInput(rive, SM, "walk");
  const attack = useStateMachineInput(rive, SM, "attack");
  const die = useStateMachineInput(rive, SM, "die");

  useEffect(() => {
    if (anim === "attack") attack?.fire();
    else if (anim === "walk") walk?.fire();
  }, [anim, walk, attack]);
  useEffect(() => {
    if (dead) die?.fire();
  }, [dead, die]);

  return <RiveComponent className={className} style={style} />;
}
