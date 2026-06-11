/* Sprout service worker — hand-written, zero dependencies (no workbox).
 *
 * Everything the app needs is bundled: lessons live inside the JS bundle and
 * progress lives in IndexedDB/localStorage, so once the shell + assets are
 * cached the app works FULLY offline (speech synthesis included, with the
 * device's local voices). Strategies:
 *   - install: precache the app shell ("./" = index.html, manifest, icon);
 *   - hashed build assets (js/css/fonts/images): cache-first — production
 *     filenames carry a contenthash, so a cached copy is immutable;
 *   - navigations (the SPA shell) + Google Fonts: stale-while-revalidate —
 *     serve the cache instantly, refresh it in the background (opaque
 *     responses from gstatic are cached as-is, that's fine for fonts);
 *   - any other same-origin GET: network-first, falling back to the cache.
 *
 * Paths are RELATIVE to this file so the same worker serves "/" locally and
 * "/Sprout/" on GitHub Pages. Bump VERSION to invalidate every cache (old
 * caches are deleted on activate).
 */

const VERSION = "sprout-v1";

/** The app shell: "./" is index.html under any base path. */
const SHELL = ["./", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then((cache) => cache.addAll(SHELL))
      // Take over right away — the page reloads into the new version.
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

/** Store a copy of `response` under `key` (when it's worth storing). */
function put(key, response) {
  // `ok` covers normal responses; opaque ones (no-cors fonts) have status 0.
  if (!response || !(response.ok || response.type === "opaque")) return response;
  const copy = response.clone();
  // Fire-and-forget: the response itself must not wait on the cache write.
  caches.open(VERSION).then((cache) => cache.put(key, copy));
  return response;
}

/** Immutable assets: the cache IS the truth; fetch only fills first misses. */
async function cacheFirst(request) {
  const hit = await caches.match(request);
  return hit || put(request, await fetch(request));
}

/** Serve the cache instantly, refresh it in the background. `key` lets every
 *  SPA navigation share one cache entry (the shell, "./"). */
function staleWhileRevalidate(event, key) {
  const refresh = fetch(event.request)
    .then((res) => put(key, res))
    .catch(() => undefined); // offline: the cached copy below is the answer
  event.waitUntil(refresh);
  return caches.match(key).then((hit) => hit || refresh).then((res) => {
    if (res) return res;
    throw new Error("offline and not cached");
  });
}

/** Fresh when online, cached when not. */
async function networkFirst(request) {
  try {
    return put(request, await fetch(request));
  } catch (err) {
    const hit = await caches.match(request);
    if (hit) return hit;
    throw err;
  }
}

/** Build output + fonts + pictures — immutable by name in production. */
const ASSET_RE = /\.(js|css|woff2?|ttf|png|jpe?g|gif|webp|avif|svg|ico)$/;

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Every SPA navigation (#/… routes share one document) serves the shell.
  if (request.mode === "navigate") {
    event.respondWith(staleWhileRevalidate(event, "./"));
    return;
  }

  // Google Fonts: the css (googleapis) and the woff2 files (gstatic).
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(staleWhileRevalidate(event, request));
    return;
  }

  // Other cross-origin requests are none of our business.
  if (url.origin !== location.origin) return;

  if (ASSET_RE.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(networkFirst(request));
});
