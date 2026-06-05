/* Academia dos Elementos — the small persisted game state + a hook that joins it
 * with the (derived, read-only) school economy.
 *
 * Only two things are actually stored: the chosen hero and which mission bonuses
 * have been claimed. Everything else (XP, coins, level, energy) is DERIVED from
 * the existing progress, so it can never drift or be farmed. */
import { useCallback, useEffect, useMemo, useState } from "react";
import { store } from "../storage";
import { useProgress } from "../progress";
import {
  ELEMENTS,
  MISSIONS,
  deriveStats,
  energyToday,
  levelOf,
  levelPctOf,
  missionById,
  type ElementId,
  type Mission,
  type WorldStats,
} from "./world-data";
import { bossMaxHp, BOSS_REWARD } from "./battle";

export interface Hero {
  name: string;
  element: ElementId;
}

interface WorldState {
  hero: Hero | null;
  /** ids of missions whose one-time bonus has been collected */
  claimed: string[];
  /** remaining HP of the current Dragão do Caos (chipped away over time) */
  bossHp: number;
  /** how many dragons have been defeated (drives rewards + scaling) */
  bossDefeats: number;
}

const WORLD_KEY = "sprout.world.v1";

const EMPTY: WorldState = { hero: null, claimed: [], bossHp: bossMaxHp(0), bossDefeats: 0 };

/** Read + validate the persisted state, so a stale/garbled value can never crash
 *  the Academia screen (same guard style as nav.ts / progress.tsx). */
function loadWorld(): WorldState {
  const raw = store.getSync<unknown>(WORLD_KEY, null);
  if (!raw || typeof raw !== "object") return EMPTY;
  const v = raw as Record<string, unknown>;
  const hero =
    v.hero &&
    typeof v.hero === "object" &&
    typeof (v.hero as Hero).name === "string" &&
    ELEMENTS.some((e) => e.id === (v.hero as Hero).element)
      ? { name: (v.hero as Hero).name, element: (v.hero as Hero).element }
      : null;
  const claimed = Array.isArray(v.claimed)
    ? v.claimed.filter((id): id is string => typeof id === "string" && missionById.has(id))
    : [];
  const bossDefeats = typeof v.bossDefeats === "number" && v.bossDefeats >= 0 ? Math.floor(v.bossDefeats) : 0;
  const max = bossMaxHp(bossDefeats);
  const bossHp = typeof v.bossHp === "number" && v.bossHp >= 0 ? Math.min(v.bossHp, max) : max;
  return { hero, claimed, bossHp, bossDefeats };
}

export interface MissionView extends Mission {
  current: number;
  complete: boolean;
  claimed: boolean;
  /** complete but the bonus is still waiting to be collected */
  claimable: boolean;
}

export interface World {
  hero: Hero | null;
  stats: WorldStats;
  xp: number;
  coins: number;
  energy: number;
  level: number;
  /** 0–1 toward the next level */
  levelPct: number;
  missions: MissionView[];
  /** the Dragão do Caos boss: remaining HP, its max, and how many beaten */
  bossHp: number;
  bossMaxHp: number;
  bossDefeats: number;
  createHero: (hero: Hero) => void;
  claim: (id: string) => void;
  resetHero: () => void;
  /** deal damage to the dragon (clamped at 0) */
  hitBoss: (damage: number) => void;
  /** bank a defeat (reward + next, tougher dragon); no-op if not yet at 0 HP */
  defeatBoss: () => void;
}

/** The single hook the Academia UI uses. Joins the persisted hero/claims with
 *  the live, derived economy from `useProgress`. */
export function useWorld(): World {
  const { progress, achievements } = useProgress();
  const [state, setState] = useState<WorldState>(loadWorld);

  useEffect(() => {
    store.set(WORLD_KEY, state);
  }, [state]);

  const createHero = useCallback((hero: Hero) => setState((s) => ({ ...s, hero })), []);
  const resetHero = useCallback(() => setState((s) => ({ ...EMPTY, bossHp: s.bossHp, bossDefeats: s.bossDefeats })), []);
  const claim = useCallback(
    (id: string) =>
      setState((s) => (s.claimed.includes(id) ? s : { ...s, claimed: [...s.claimed, id] })),
    [],
  );

  const hitBoss = useCallback(
    (damage: number) => setState((s) => ({ ...s, bossHp: Math.max(0, s.bossHp - damage) })),
    [],
  );
  // Bank the win only once HP is actually at 0, then roll the next, tougher boss.
  // Guarding on bossHp === 0 makes a double-call (StrictMode/re-render) a no-op.
  const defeatBoss = useCallback(
    () =>
      setState((s) =>
        s.bossHp > 0 ? s : { ...s, bossDefeats: s.bossDefeats + 1, bossHp: bossMaxHp(s.bossDefeats + 1) },
      ),
    [],
  );

  const stats = useMemo(() => deriveStats(progress), [progress]);
  const energy = useMemo(() => energyToday(achievements), [achievements]);

  const missions = useMemo<MissionView[]>(
    () =>
      MISSIONS.map((m) => {
        const current = Math.min(m.target, m.progress(stats));
        const complete = current >= m.target;
        const claimed = state.claimed.includes(m.id);
        return { ...m, current, complete, claimed, claimable: complete && !claimed };
      }),
    [stats, state.claimed],
  );

  // Mission bonuses are added only once they've been claimed — base economy stays
  // idempotent, the claim is the one explicit, one-time reward.
  const bonus = useMemo(
    () =>
      state.claimed.reduce(
        (acc, id) => {
          const m = missionById.get(id);
          return m ? { xp: acc.xp + m.reward.xp, coins: acc.coins + m.reward.coins } : acc;
        },
        { xp: 0, coins: 0 },
      ),
    [state.claimed],
  );

  // XP/coins = idempotent base (from study) + claimed mission bonuses + boss wins.
  const xp = stats.baseXp + bonus.xp + state.bossDefeats * BOSS_REWARD.xp;
  const coins = stats.baseCoins + bonus.coins + state.bossDefeats * BOSS_REWARD.coins;

  return {
    hero: state.hero,
    stats,
    xp,
    coins,
    energy,
    level: levelOf(xp),
    levelPct: levelPctOf(xp),
    missions,
    bossHp: state.bossHp,
    bossMaxHp: bossMaxHp(state.bossDefeats),
    bossDefeats: state.bossDefeats,
    createHero,
    claim,
    resetHero,
    hitBoss,
    defeatBoss,
  };
}
