import { useEffect, useState } from "react";
import { store } from "../storage";
import { subjectById, type YearN } from "../content/curriculum";

/* ------------------------------------------------------------------ *
 * Diagnóstico inicial (PLANO-ESTUDO §4.7) — the optional placement
 * mini-test OFFERED (never forced) before starting a férias plan.
 *
 * This module holds only the RESULT: the key, its shape and the pure
 * helpers around it. The test itself runs in Simulado.tsx
 * (DiagnosticoModal — it extends the simulado machinery, §4.7) and the
 * queue reorder happens at plan creation in ferias.ts
 * (buildFeriasQueue). Only the latest diagnostic is kept — taking
 * another simply overwrites it.
 * ------------------------------------------------------------------ */

export const DIAGNOSTIC_KEY = "sprout.diagnostic.v1";

/** A subject scoring under this (0–1) counts as WEAK: its lessons are
 *  front-loaded in a NEW férias queue of that year (§4.7). */
export const WEAK_SUBJECT_PCT = 0.5;

export interface Diagnostic {
  year: YearN;
  /** epoch ms — when the mini-test was taken */
  at: number;
  /** 0–1 overall, weighted by each part's question count */
  pct: number;
  /** subjectId → 0–1 */
  bySubject: Record<string, number>;
}

const isYearN = (y: unknown): y is YearN => typeof y === "number" && y >= 1 && y <= 6;

/** Read the stored diagnostic, guarding the shape so stale/garbled data never
 *  crashes; scores of subjects that no longer exist are silently dropped. */
export function loadDiagnostic(): Diagnostic | null {
  const raw = store.getSync<unknown>(DIAGNOSTIC_KEY, null);
  if (!raw || typeof raw !== "object") return null;
  const d = raw as Diagnostic;
  if (!isYearN(d.year) || typeof d.at !== "number" || typeof d.pct !== "number") return null;
  if (!d.bySubject || typeof d.bySubject !== "object") return null;
  const bySubject: Record<string, number> = {};
  for (const [id, pct] of Object.entries(d.bySubject)) {
    if (typeof pct === "number" && subjectById.has(id)) bySubject[id] = pct;
  }
  return { year: d.year, at: d.at, pct: d.pct, bySubject };
}

export function saveDiagnostic(d: Diagnostic): void {
  store.set(DIAGNOSTIC_KEY, d);
}

/** Subject ids scoring under WEAK_SUBJECT_PCT, weakest first — the order a
 *  new férias queue front-loads them in (§4.7). */
export function weakSubjects(d: Diagnostic): string[] {
  return Object.entries(d.bySubject)
    .filter(([, pct]) => pct < WEAK_SUBJECT_PCT)
    .sort((a, b) => a[1] - b[1])
    .map(([id]) => id);
}

/** "Matemática 40% · Português 75%" (weakest first) — shared by the modal's
 *  summary and the parents' card. */
export function diagnosticScoresLine(d: Diagnostic): string {
  return Object.entries(d.bySubject)
    .sort((a, b) => a[1] - b[1])
    .map(([id, pct]) => `${subjectById.get(id)?.label ?? id} ${Math.round(pct * 100)}%`)
    .join(" · ");
}

/** The stored diagnostic, re-read when storage hydrates/changes. */
export function useDiagnostic(): Diagnostic | null {
  const [diag, setDiag] = useState<Diagnostic | null>(loadDiagnostic);
  useEffect(() => {
    const sync = () => setDiag(loadDiagnostic());
    void store.ready.then(sync);
    return store.subscribe(DIAGNOSTIC_KEY, sync);
  }, []);
  return diag;
}
