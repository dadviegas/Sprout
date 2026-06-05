/* Academia dos Elementos — the Dragão do Caos battle (the doc's "Loop principal"
 * made playable). The child answers questions to deal damage; a wrong answer is
 * never punished (gentle nudge + retry, no game-over). Beating the dragon banks a
 * reward and rolls a tougher one. The boss HP persists between visits, so it can
 * be chipped away over many sessions. Read-aloud on tap; no autoplay. */
import { useEffect, useRef, useState } from "react";
import { Confetti, Speaker, speak } from "@sprout/ui";
import { Icon } from "@sprout/icons";
import type { World } from "./world-state";
import { Dragon } from "./emblems";
import { BOSS_NAME, BOSS_REWARD, damageFor, generateQuestion, type Question } from "./battle";

export function DragonBattle({ world, onClose }: { world: World; onClose: () => void }) {
  const level = world.level;
  const [q, setQ] = useState<Question>(() => generateQuestion(level));
  const [picked, setPicked] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [flash, setFlash] = useState(false);
  const [won, setWon] = useState(world.bossHp <= 0);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pct = Math.max(0, Math.round((world.bossHp / world.bossMaxHp) * 100));

  const answer = (opt: number) => {
    if (picked !== null || won) return;
    setPicked(opt);
    if (opt === q.answer) {
      const dmg = damageFor();
      const willWin = world.bossHp - dmg <= 0;
      world.hitBoss(dmg);
      setFlash(true);
      setFeedback({ ok: true, text: `Acertaste! −${dmg} de vida ao dragão.` });
      speak("Certo!");
      timer.current = window.setTimeout(() => {
        setFlash(false);
        setPicked(null);
        setFeedback(null);
        if (willWin) setWon(true);
        else setQ(generateQuestion(level));
      }, 1000);
    } else {
      setFeedback({ ok: false, text: "Quase! Vê com calma e tenta outra vez." });
      speak("Quase! Tenta outra vez.");
      timer.current = window.setTimeout(() => {
        setPicked(null);
        setFeedback(null);
      }, 1500);
    }
  };

  // Banking the win rolls the next, tougher dragon (and grants the reward).
  const finish = () => {
    world.defeatBoss();
    onClose();
  };

  return (
    <div className="wd-overlay" role="dialog" aria-label={`Batalha contra o ${BOSS_NAME}`}>
      <div className="wd-overlay__backdrop" onClick={won ? finish : onClose} />
      <div className="wd-battle">
        {won && <Confetti />}
        <div className="wd-overlay__top">
          <h2 className="wd-h2" style={{ margin: 0 }}><Icon name="danger" size={22} /> {BOSS_NAME}</h2>
          <button className="iconbtn" onClick={won ? finish : onClose} aria-label="Sair da batalha"><Icon name="close" size={22} /></button>
        </div>

        {/* the dragon + its HP */}
        <div className={`wd-battle__stage ${flash ? "hit" : ""}`}>
          <Dragon size={200} />
        </div>
        <div className="wd-battle__hp">
          <div className="wd-battle__hptrack">
            <div className="wd-battle__hpfill" style={{ width: `${pct}%` }} />
          </div>
          <span className="wd-battle__hplabel">{Math.max(0, world.bossHp)} / {world.bossMaxHp}</span>
        </div>

        {won ? (
          <div className="wd-battle__win">
            <h3 className="wd-battle__wintitle">Venceste o {BOSS_NAME}! 🎉</h3>
            <p className="wd-battle__reward">
              <Icon name="star" size={18} /> +{BOSS_REWARD.xp} pontos · <Icon name="coin" size={18} /> +{BOSS_REWARD.coins} moedas
            </p>
            <button className="wd-cta" style={{ ["--el" as string]: "var(--ok)" }} onClick={finish}>
              <Icon name="check" size={22} /> Continuar
            </button>
          </div>
        ) : (
          <div className="wd-battle__quiz">
            <div className="wd-battle__q">
              <span className="wd-battle__qtext">{q.prompt}</span>
              <Speaker text={q.say} size={18} label="Ouvir a pergunta" />
            </div>
            <div className="wd-battle__opts">
              {q.options.map((o) => {
                const state = picked === null ? "" : o === q.answer ? "ok" : o === picked ? "bad" : "";
                return (
                  <button key={o} className={`wd-opt ${state}`} onClick={() => answer(o)} disabled={picked !== null}>
                    {o}
                  </button>
                );
              })}
            </div>
            {feedback && (
              <p className={`wd-battle__feedback ${feedback.ok ? "ok" : "bad"}`}>{feedback.text}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
