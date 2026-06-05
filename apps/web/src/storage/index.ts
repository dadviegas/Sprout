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
        if (this.cache.get(k) !== v) {
          this.cache.set(k, v);
          this.mirror(k, v);
          this.emit(k);
        }
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
