/* ------------------------------------------------------------------ *
 * PersistentStore — the app's single persistence facade.
 *
 * Reads are synchronous (from an in-memory cache primed off localStorage),
 * so first paint never flashes or waits. Writes go to three places:
 *   1. the in-memory cache          (instant subsequent reads)
 *   2. localStorage                 (synchronous durability + fast next boot)
 *   3. the durable backend (IndexedDB) — async, write-through, the source of
 *      truth that survives more aggressive cache-clearing and holds more data.
 *
 * On boot the durable backend is reconciled into the cache via `ready`; any
 * keys it restores notify subscribers so React state can re-hydrate.
 *
 * Backend choice lives entirely in ./backend.ts (createBackend), so swapping
 * IndexedDB for something else never touches this file or its callers.
 * ------------------------------------------------------------------ */

import { createBackend, type StorageBackend } from "./backend";

type Listener = () => void;

const KEY_PREFIX = "sprout.";

/* The sessions log can be AHEAD in localStorage: a pagehide write reaches the
 * synchronous mirror but the async IndexedDB write may not finish before the
 * tab dies. A plain hydrate would then overwrite the fresher mirror with the
 * stale durable copy. For this one key the two are MERGED instead — per
 * session id, the record with the most recent `endedAt` (then `secs`) wins.
 * (Key literal kept here, not imported, to avoid a storage ↔ sessions cycle;
 * the shape lives in study/sessions.ts.) */
const SESSIONS_LOG_KEY = "sprout.sessions.v1";

interface SessionLike {
  id: string;
  startedAt: number;
  endedAt?: number;
  secs?: number;
}

function mergeSessionLogs(cachedRaw: string, durableRaw: string): string {
  try {
    const cached = JSON.parse(cachedRaw) as SessionLike[];
    const durable = JSON.parse(durableRaw) as SessionLike[];
    if (!Array.isArray(cached) || !Array.isArray(durable)) return durableRaw;
    const byId = new Map<string, SessionLike>();
    for (const s of [...durable, ...cached]) {
      if (!s || typeof s.id !== "string") continue;
      const prev = byId.get(s.id);
      const newer =
        !prev ||
        (s.endedAt ?? 0) > (prev.endedAt ?? 0) ||
        ((s.endedAt ?? 0) === (prev.endedAt ?? 0) && (s.secs ?? 0) >= (prev.secs ?? 0));
      if (newer) byId.set(s.id, s);
    }
    // Newest first, capped like MAX_SESSIONS in study/sessions.ts.
    const merged = [...byId.values()].sort((a, b) => b.startedAt - a.startedAt).slice(0, 500);
    return JSON.stringify(merged);
  } catch {
    return durableRaw; // unparsable → fall back to the plain hydrate behaviour
  }
}

class PersistentStore {
  private cache = new Map<string, string>();
  private listeners = new Map<string, Set<Listener>>();
  private backend: StorageBackend;
  /** Resolves once the durable backend has been reconciled into the cache. */
  readonly ready: Promise<void>;

  constructor() {
    this.backend = createBackend();
    this.primeFromLocalStorage();
    this.ready = this.hydrate();
  }

  get backendName(): string {
    return this.backend.name;
  }

  private primeFromLocalStorage(): void {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(KEY_PREFIX)) {
          const v = localStorage.getItem(k);
          if (v != null) this.cache.set(k, v);
        }
      }
    } catch {
      /* private mode / blocked storage — cache stays empty */
    }
  }

  private async hydrate(): Promise<void> {
    try {
      const durable = await this.backend.load();
      for (const [k, v] of Object.entries(durable)) {
        const cached = this.cache.get(k);
        if (cached === v) continue;
        // The sessions log merges (mirror may be ahead — see mergeSessionLogs);
        // every other key takes the durable copy as-is.
        const next = k === SESSIONS_LOG_KEY && cached != null ? mergeSessionLogs(cached, v) : v;
        if (next !== cached) {
          this.cache.set(k, next);
          this.mirror(k, next);
          this.emit(k);
        }
        // Write a merge result back so IndexedDB catches up to the mirror.
        if (next !== v) void this.backend.set(k, next).catch(() => {});
      }
    } catch {
      /* durable backend unreadable — localStorage cache already serves reads */
    }
  }

  /** Synchronous read from cache. Returns `fallback` if absent or unparsable. */
  getSync<T>(key: string, fallback: T): T {
    const raw = this.cache.get(key);
    if (raw == null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    const raw = JSON.stringify(value);
    if (this.cache.get(key) === raw) return; // no-op write
    this.cache.set(key, raw);
    this.mirror(key, raw);
    void this.backend.set(key, raw).catch(() => {});
    this.emit(key);
  }

  remove(key: string): void {
    this.cache.delete(key);
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    void this.backend.remove(key).catch(() => {});
    this.emit(key);
  }

  /** Wipe EVERYTHING this app owns — the in-memory cache, every `sprout.*`
   *  localStorage key, and the whole durable backend. Used by the parents'
   *  area "Limpar tudo".
   *
   *  The CALLER MUST reload the page right after. We deliberately do NOT notify
   *  subscribers: an emit would re-run the React state's merge-on-hydrate logic,
   *  which keeps the in-session values and would write them straight back
   *  (write-through to IndexedDB too) — resurrecting the data the reload was
   *  meant to clear. With no emit, in-memory state is untouched until the reload
   *  replaces it with the now-empty storage. */
  async clearAll(): Promise<void> {
    this.cache.clear();
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith(KEY_PREFIX)) localStorage.removeItem(k);
      }
    } catch {
      /* private mode / blocked storage */
    }
    try {
      await this.backend.clear();
    } catch {
      /* durable backend unwritable — cache + localStorage already cleared */
    }
  }

  /** Snapshot of every `sprout.*` key as parsed JSON — feeds the parents'
   *  "Exportar dados (JSON)". The cache already holds everything (primed from
   *  localStorage, reconciled with the durable backend), so this is sync. */
  exportAll(): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    for (const [k, raw] of this.cache) {
      try {
        out[k] = JSON.parse(raw);
      } catch {
        out[k] = raw; // unparsable → export the raw string rather than drop it
      }
    }
    return out;
  }

  /** Subscribe to changes for one key. Returns an unsubscribe fn. */
  subscribe(key: string, fn: Listener): () => void {
    let set = this.listeners.get(key);
    if (!set) {
      set = new Set();
      this.listeners.set(key, set);
    }
    set.add(fn);
    return () => {
      set!.delete(fn);
    };
  }

  private mirror(key: string, raw: string): void {
    try {
      localStorage.setItem(key, raw);
    } catch {
      /* quota / blocked — durable backend still has it */
    }
  }

  private emit(key: string): void {
    this.listeners.get(key)?.forEach((fn) => fn());
  }
}

export const store = new PersistentStore();
