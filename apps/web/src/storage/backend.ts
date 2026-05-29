/* ------------------------------------------------------------------ *
 * Storage backends — the swappable persistence layer.
 *
 * The app never talks to localStorage/IndexedDB directly; it goes through
 * the `StorageBackend` interface below (consumed by ../storage/index.ts).
 * To change WHERE durable data lives (IndexedDB today, a remote API or
 * SQLite-wasm tomorrow), implement this interface and swap the one line in
 * `createBackend()` — nothing else in the app changes.
 *
 * Values are opaque JSON strings, mirroring localStorage's own semantics so
 * every adapter stays trivial and interchangeable.
 * ------------------------------------------------------------------ */

export interface StorageBackend {
  /** Human-readable id, surfaced for debugging (`store.backendName`). */
  readonly name: string;
  /** Bulk-read every key this backend owns. Used once, on hydrate. */
  load(): Promise<Record<string, string>>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

/* ---- IndexedDB (durable, primary) -------------------------------- */

const DB_NAME = "sprout";
const DB_VERSION = 1;
const STORE = "kv";

function promisify<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export class IndexedDBBackend implements StorageBackend {
  readonly name = "indexeddb";
  private dbPromise: Promise<IDBDatabase> | null = null;

  static isAvailable(): boolean {
    try {
      return typeof indexedDB !== "undefined" && indexedDB !== null;
    } catch {
      return false;
    }
  }

  private db(): Promise<IDBDatabase> {
    return (this.dbPromise ??= new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    }));
  }

  private async write(mutate: (s: IDBObjectStore) => void): Promise<void> {
    const db = await this.db();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
      mutate(tx.objectStore(STORE));
    });
  }

  async load(): Promise<Record<string, string>> {
    const db = await this.db();
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const [keys, values] = await Promise.all([
      promisify(store.getAllKeys()),
      promisify(store.getAll()),
    ]);
    const out: Record<string, string> = {};
    keys.forEach((k, i) => {
      out[String(k)] = String(values[i]);
    });
    return out;
  }

  set(key: string, value: string): Promise<void> {
    return this.write((s) => s.put(value, key));
  }
  remove(key: string): Promise<void> {
    return this.write((s) => s.delete(key));
  }
  clear(): Promise<void> {
    return this.write((s) => s.clear());
  }
}

/* ---- Null backend (durable layer absent) ------------------------- *
 * Used when IndexedDB is blocked/unavailable. The facade's localStorage
 * mirror still provides persistence; this backend is a no-op so the rest of
 * the code path is identical. */

export class NullBackend implements StorageBackend {
  readonly name = "localstorage-only";
  async load(): Promise<Record<string, string>> {
    return {};
  }
  async set(): Promise<void> {}
  async remove(): Promise<void> {}
  async clear(): Promise<void> {}
}

/* ---- Memory backend (SSR / no window) ---------------------------- */

export class MemoryBackend implements StorageBackend {
  readonly name = "memory";
  private mem = new Map<string, string>();
  async load(): Promise<Record<string, string>> {
    return Object.fromEntries(this.mem);
  }
  async set(key: string, value: string): Promise<void> {
    this.mem.set(key, value);
  }
  async remove(key: string): Promise<void> {
    this.mem.delete(key);
  }
  async clear(): Promise<void> {
    this.mem.clear();
  }
}

/* ---- Backend selection ------------------------------------------- *
 *  ▼▼▼  swap this single function to change durable storage  ▼▼▼ */
export function createBackend(): StorageBackend {
  if (typeof window === "undefined") return new MemoryBackend();
  if (IndexedDBBackend.isAvailable()) return new IndexedDBBackend();
  return new NullBackend();
}
