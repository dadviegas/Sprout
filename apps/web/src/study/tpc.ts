import { useEffect, useState } from "react";
import { store } from "../storage";
import { lessonMeta } from "../content/curriculum";
import { TEST_PASS_PCT, type Achievement } from "../progress";
import { DAY, startOfDay } from "./calendar";

/* ------------------------------------------------------------------ *
 * TPC (PLANO-ESTUDO §4.12) — homework set by the PARENTS: 1–3 lessons
 * with a due date inside the next week, assigned from the Estudo tab
 * of #/pais. Stored under sprout.tpc.v1 as a small Tpc[] (newest
 * first, capped).
 *
 * "Done" reuses the 80% rule: a TPC lesson counts when its FINAL TEST
 * passes at >= TEST_PASS_PCT AFTER the TPC was created — assigning an
 * already-passed lesson means "do it again" (same convention as the
 * férias redo steps, ferias.ts). The child sees open TPCs as PRIORITY
 * missions on #/plano (study/plan.ts); an overdue one stays visible,
 * gently ("em atraso", never shame).
 * ------------------------------------------------------------------ */

export const TPC_KEY = "sprout.tpc.v1";

/** Keep the list small: beyond this the oldest DONE entries rotate out
 *  (open TPCs are never dropped). */
const MAX_TPCS = 30;
/** A TPC holds at most this many lessons. */
export const MAX_TPC_LESSONS = 3;
/** Due dates are picked from the next this-many days. */
export const TPC_DUE_DAYS = 7;

export interface Tpc {
  /** `${createdAt}-${nonce}` */
  id: string;
  /** 1–3 lessonIds */
  lessonIds: string[];
  /** start-of-day epoch ms */
  dueDate: number;
  createdAt: number;
  /** stamped when every lesson's final test passed (syncTpcs) */
  doneAt?: number;
}

/** Read the list, guarding the shape so stale/garbled data never crashes.
 *  Lessons that no longer exist are dropped (a TPC left with none vanishes). */
export function loadTpcs(): Tpc[] {
  const raw = store.getSync<unknown>(TPC_KEY, []);
  if (!Array.isArray(raw)) return [];
  const out: Tpc[] = [];
  for (const v of raw) {
    const t = v as Tpc;
    if (!t || typeof t !== "object" || typeof t.id !== "string") continue;
    if (typeof t.dueDate !== "number" || typeof t.createdAt !== "number" || !Array.isArray(t.lessonIds)) continue;
    const lessonIds = t.lessonIds.filter((id): id is string => typeof id === "string" && lessonMeta.has(id));
    if (lessonIds.length === 0) continue;
    out.push({
      id: t.id,
      lessonIds,
      dueDate: t.dueDate,
      createdAt: t.createdAt,
      ...(typeof t.doneAt === "number" ? { doneAt: t.doneAt } : {}),
    });
  }
  return out;
}

function saveTpcs(tpcs: Tpc[]): void {
  store.set(TPC_KEY, tpcs);
}

/** Create one TPC (newest first). The picker validates; this just caps. */
export function addTpc(lessonIds: string[], dueDate: number, now = Date.now()): void {
  const ids = lessonIds.filter((id) => lessonMeta.has(id)).slice(0, MAX_TPC_LESSONS);
  if (ids.length === 0) return;
  const tpc: Tpc = {
    id: `${now}-${Math.random().toString(36).slice(2, 7)}`,
    lessonIds: ids,
    dueDate: startOfDay(dueDate),
    createdAt: now,
  };
  const all = [tpc, ...loadTpcs()];
  // Cap: rotate out the oldest DONE entries; open TPCs always survive.
  while (all.length > MAX_TPCS) {
    const idx = all.map((t) => t.doneAt != null).lastIndexOf(true);
    if (idx < 0) break;
    all.splice(idx, 1);
  }
  saveTpcs(all);
}

export function removeTpc(id: string): void {
  saveTpcs(loadTpcs().filter((t) => t.id !== id));
}

/** One TPC lesson is done when its final test passed at >= TEST_PASS_PCT
 *  AFTER the TPC was created (an old pass doesn't count — "faz outra vez"). */
export function tpcLessonDone(tpc: Tpc, lessonId: string, achievements: Achievement[]): boolean {
  return achievements.some((a) => a.lessonId === lessonId && a.pct >= TEST_PASS_PCT && a.at >= tpc.createdAt);
}

/** A whole TPC is done when ALL its lessons are. */
export function tpcDone(tpc: Tpc, achievements: Achievement[]): boolean {
  return tpc.lessonIds.every((id) => tpcLessonDone(tpc, id, achievements));
}

/** Stamp `doneAt` on newly-finished TPCs — called from the plan view (like
 *  syncFeriasDone); every other reader derives and never writes. */
export function syncTpcs(achievements: Achievement[], now = Date.now()): void {
  const tpcs = loadTpcs();
  let changed = false;
  for (const t of tpcs) {
    if (t.doneAt == null && tpcDone(t, achievements)) {
      t.doneAt = now;
      changed = true;
    }
  }
  if (changed) saveTpcs(tpcs);
}

/** "para hoje" / "para amanhã" / "para sexta" / "em atraso" — the child
 *  phrasing for mission titles, also reused as the parents' status. */
export function tpcDueLabel(dueDate: number, today: number): string {
  const days = Math.round((dueDate - today) / DAY);
  if (days < 0) return "em atraso";
  if (days === 0) return "para hoje";
  if (days === 1) return "para amanhã";
  if (days < 7) {
    const wd = new Date(dueDate).toLocaleDateString("pt-PT", { weekday: "long" });
    return `para ${wd.replace("-feira", "")}`;
  }
  return `para ${new Date(dueDate).toLocaleDateString("pt-PT", { day: "numeric", month: "long" })}`;
}

/** The TPC list, re-read when storage hydrates/changes. */
export function useTpcs(): Tpc[] {
  const [tpcs, setTpcs] = useState<Tpc[]>(loadTpcs);
  useEffect(() => {
    const sync = () => setTpcs(loadTpcs());
    void store.ready.then(sync);
    return store.subscribe(TPC_KEY, sync);
  }, []);
  return tpcs;
}
