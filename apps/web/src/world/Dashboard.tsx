/* Academia dos Elementos — the hero dashboard (level, XP, coins, energy and the
 * missions). Shown as an overlay from the playable scene (the "menu do herói"),
 * so it takes an `onClose`. All read-aloud; speech only fires on a tap. */
import { useState } from "react";
import { Confetti, Speaker, speak } from "@sprout/ui";
import { Icon, type IconName } from "@sprout/icons";
import type { View } from "../nav";
import { LEVEL_XP, elementById } from "./world-data";
import type { World, MissionView } from "./world-state";
import { Hero } from "./emblems";
import { MissionArt } from "./mission-art";

export function Dashboard({ world, onGo, onClose }: { world: World; onGo: (v: View) => void; onClose: () => void }) {
  const hero = world.hero!;
  const el = elementById.get(hero.element)!;
  // The mission whose bonus was just collected — drives the celebratory confetti.
  const [celebrating, setCelebrating] = useState(false);

  const onClaim = (m: MissionView) => {
    world.claim(m.id);
    setCelebrating(true);
    speak(`Recompensa! ${m.reward.xp} pontos e ${m.reward.coins} moedas por ${m.title}.`);
    window.setTimeout(() => setCelebrating(false), 2600);
  };

  const xpInLevel = world.xp % LEVEL_XP;
  const heroSay = `${hero.name}, herói de ${el.label}. Nível ${world.level}, ${world.coins} moedas. Companheiro: ${el.pet}.`;

  return (
    <div className="wd-overlay" role="dialog" aria-label="Painel do herói">
      <div className="wd-overlay__backdrop" onClick={onClose} />
      <div className="wd-overlay__panel sprout-scroll">
        {celebrating && <Confetti />}
        <div className="wd-overlay__top">
          <h2 className="wd-h2" style={{ margin: 0 }}><Icon name="shield" size={22} /> Painel do herói</h2>
          <button className="iconbtn" onClick={onClose} aria-label="Fechar"><Icon name="close" size={22} /></button>
        </div>

        {/* hero panel */}
        <div className="wd-panel" style={{ ["--el" as string]: el.color }}>
          <div className="wd-panel__hero">
            <Hero element={hero.element} color={el.color} size={120} />
          </div>
          <div className="wd-panel__info">
            <div className="wd-panel__name">
              {hero.name}
              <Speaker text={heroSay} size={18} label={`Ouvir: ${hero.name}`} />
            </div>
            <div className="wd-panel__sub">
              <span className="wd-tag" style={{ ["--el" as string]: el.color }}>{el.label}</span>
              <span className="wd-tag"><Icon name="paw" size={15} /> {el.pet}</span>
              <span className="wd-tag"><Icon name="shield" size={15} /> Nível {world.level}</span>
            </div>
            <div className="wd-xpbar">
              <div className="wd-xpbar__track">
                <div className="wd-xpbar__fill" style={{ width: `${Math.round(world.levelPct * 100)}%`, ["--el" as string]: el.color }} />
              </div>
              <span className="wd-xpbar__label">{xpInLevel} / {LEVEL_XP} XP</span>
            </div>
          </div>
        </div>

        {/* resources */}
        <div className="wd-stats">
          <Stat icon="star" label="Pontos" value={world.xp} color="var(--warn)" />
          <Stat icon="coin" label="Moedas" value={world.coins} color="#e0a82e" />
          <Stat icon="bolt" label="Energia de hoje" value={`${world.energy}%`} color="var(--joy)" />
        </div>

        {/* missions */}
        <h2 className="wd-h2" style={{ marginTop: 22 }}>
          <Icon name="target" size={22} /> Missões
          <Speaker text="As tuas missões. Completa lições para as ganhares." size={16} />
        </h2>
        <div className="wd-missions">
          {world.missions.map((m) => (
            <MissionCard key={m.id} mission={m} onClaim={() => onClaim(m)} />
          ))}
        </div>

        {/* go learn */}
        <button className="wd-go" style={{ ["--el" as string]: el.color }} onClick={() => onGo({ kind: "home" })}>
          <Icon name="forward" size={22} /> Continuar a aprender
        </button>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, color }: { icon: IconName; label: string; value: string | number; color: string }) {
  return (
    <div className="wd-stat">
      <span className="wd-stat__icon" style={{ color }}><Icon name={icon} size={22} /></span>
      <span className="wd-stat__value">{value}</span>
      <span className="wd-stat__label">{label}</span>
    </div>
  );
}

function MissionCard({ mission, onClaim }: { mission: MissionView; onClaim: () => void }) {
  const pct = Math.round((mission.current / mission.target) * 100);
  const say = `${mission.title}. ${mission.blurb} Recompensa: ${mission.reward.xp} pontos e ${mission.reward.coins} moedas.`;
  return (
    <div className={`wd-mission ${mission.claimed ? "done" : ""} ${mission.claimable ? "ready" : ""}`}>
      <span className="wd-mission__icon"><MissionArt mission={mission} /></span>
      <div className="wd-mission__body">
        <div className="wd-mission__title">
          {mission.title}
          <Speaker text={say} size={15} label={`Ouvir: ${mission.title}`} />
        </div>
        <div className="wd-mission__blurb">{mission.blurb}</div>
        <div className="wd-mission__track">
          <div className="wd-mission__fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="wd-mission__meta">
          <span>{mission.current} / {mission.target}</span>
          <span className="wd-mission__reward">
            <Icon name="star" size={13} /> {mission.reward.xp} · <Icon name="coin" size={13} /> {mission.reward.coins}
          </span>
        </div>
      </div>
      {mission.claimable ? (
        <button className="wd-claim" onClick={onClaim}>
          <Icon name="check" size={18} /> Receber
        </button>
      ) : mission.claimed ? (
        <span className="wd-mission__check" aria-label="Concluída"><Icon name="check" size={20} /></span>
      ) : null}
    </div>
  );
}
