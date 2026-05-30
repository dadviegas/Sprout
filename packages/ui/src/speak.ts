/* Read text aloud in European Portuguese using the browser's built-in speech
   synthesis. No dependency, no network. Helps children who can't read yet
   (e.g. 1.º ano) follow questions and instructions.

   Two things make Web Speech flaky and are handled here:
   1) voices load ASYNC (Chrome returns [] from getVoices() until the
      `voiceschanged` event), so the first tap could speak with no/wrong voice;
   2) if no European-Portuguese voice exists, a Brazilian (pt-BR) voice still
      reads Portuguese far better than a default English voice. */

let cachedVoice: SpeechSynthesisVoice | null = null;

/** Higher = better fit for European Portuguese. 0 = not Portuguese. */
function ptScore(v: SpeechSynthesisVoice): number {
  const lang = (v.lang || "").toLowerCase().replace("_", "-");
  if (lang === "pt-pt") return 3; // European Portuguese — best
  if (lang.startsWith("pt")) return 2; // pt-BR etc. — still Portuguese
  return 0; // not Portuguese
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const best = window.speechSynthesis
    .getVoices()
    .map((v) => [ptScore(v), v] as const)
    .filter(([s]) => s > 0)
    .sort((a, b) => b[0] - a[0])[0];
  cachedVoice = best ? best[1] : null;
  return cachedVoice;
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Turn math notation into words so the engine says "1 vezes 2 é igual a 2"
 *  instead of spelling out (or skipping) the ×, =, ÷ symbols. Symbols that also
 *  appear in ordinary Portuguese (the hyphen in "bem-vindo", the slash in
 *  "e/ou") are only converted when they sit BETWEEN digits, i.e. in a real sum.
 *  Idempotent: text that's already words passes through unchanged. */
export function speakable(text: string): string {
  return text
    .replace(/(\d)\s*[×x*]\s*(\d)/gi, "$1 vezes $2") // 3 × 2 / 3x2 / 3*2
    .replace(/(\d)\s*÷\s*(\d)/g, "$1 a dividir por $2") // 6 ÷ 2 (NOT ":", which is clock time)
    .replace(/(\d)\s*\/\s*(\d)/g, "$1 sobre $2") // fractions: 1/2
    .replace(/(\d)\s*\+\s*(\d)/g, "$1 mais $2") // 2 + 2
    .replace(/(\d)\s*−\s*(\d)/g, "$1 menos $2") // true minus 5 − 2
    .replace(/(\d) +- +(\d)/g, "$1 menos $2") // spaced hyphen 5 - 2 (not ranges "1-2-3")
    .replace(/(\d)\s*=\s*(\d)/g, "$1 é igual a $2") // = → "é igual a"
    .replace(/(\d)\s*<\s*(\d)/g, "$1 é menor que $2")
    .replace(/(\d)\s*>\s*(\d)/g, "$1 é maior que $2")
    .replace(/(\d)\s*%/g, "$1 por cento")
    .replace(/(\d)\s*€/g, "$1 euros")
    .replace(/\s+/g, " ")
    .trim();
}

/* Playing state, so a speaker button can show a "parar" (stop) control while
   its audio plays and clear it when the audio ends. Each playback gets a token;
   a button remembers the token it started and is "playing" while that token is
   the active one. */
let nextToken = 0;
let playingToken: number | null = null;
let watchdog: number | null = null;
const listeners = new Set<() => void>();

function setPlaying(token: number | null): void {
  if (playingToken === token) return;
  playingToken = token;
  listeners.forEach((l) => l());
}

function clearWatchdog(): void {
  if (watchdog != null) {
    window.clearInterval(watchdog);
    watchdog = null;
  }
}

/* Web Speech is flaky: Chrome sometimes never fires `end` (so a play→stop
   button would stay stuck on "stop"), and it can leave the engine paused after
   cancel() (so audio "works once then stops"). A watchdog polls the real engine
   state: it nudges a paused engine back to life and, once speech has actually
   finished, clears the playing flag so the button reverts to "ouvir". */
function startWatchdog(token: number): void {
  clearWatchdog();
  let sawSpeaking = false;
  let ticks = 0;
  watchdog = window.setInterval(() => {
    const synth = window.speechSynthesis;
    ticks++;
    if (synth.speaking || synth.pending) {
      sawSpeaking = true;
      if (synth.paused) synth.resume(); // Chrome sometimes pauses mid-utterance
      return;
    }
    // Not speaking. Done once we've seen it start (or waited ~2s for an engine
    // that silently dropped the utterance) — then revert the button to "ouvir".
    if (sawSpeaking || ticks > 10) {
      if (playingToken === token) setPlaying(null);
      clearWatchdog();
    }
  }, 200);
}

/** Subscribe to playback start/stop. Returns an unsubscribe function. */
export function subscribeSpeaking(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** The token of the playback currently sounding, or null when silent. */
export function speakingToken(): number | null {
  return playingToken;
}

/** Stop any read-aloud immediately (e.g. the user tapped "parar", or the page
 *  changed). Safe to call when nothing is playing. */
export function stop(): void {
  clearWatchdog();
  if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
  setPlaying(null);
}

function makeUtterance(text: string): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice();
  if (v) u.voice = v;
  // Set lang to the chosen voice's lang (or pt-PT) so the engine still tries
  // Portuguese pronunciation even when no explicit voice is available.
  u.lang = v?.lang || "pt-PT";
  u.rate = 0.92;
  u.pitch = 1.05;
  return u;
}

function utterAll(parts: string[], token: number): void {
  const synth = window.speechSynthesis;
  synth.cancel(); // stop anything already playing
  // Mark the playback done only when THIS token is still the active one (a
  // newer tap, or stop(), will have moved it on — don't clobber that).
  const finish = () => {
    if (playingToken === token) setPlaying(null);
    clearWatchdog();
  };
  const utterances = parts.map(makeUtterance);
  // Queue each part as its own utterance: the gap between utterances gives a
  // natural pause, so a list (e.g. a tabuada) is read line by line, not run-on.
  // Only the LAST utterance signals completion — an `error` on an EARLIER one
  // (mid-sequence) must not mark the whole run done while later lines still play
  // (the watchdog is the fallback if the last one never fires either event).
  const last = utterances[utterances.length - 1];
  last.addEventListener("end", finish);
  last.addEventListener("error", finish);
  for (const u of utterances) synth.speak(u);
  setPlaying(token);
  // Chrome occasionally leaves synthesis paused right after cancel(); nudge it,
  // and the watchdog keeps nudging + clears the flag when speech really ends.
  if (synth.paused) synth.resume();
  startWatchdog(token);
}

/** Run `fn` once voices are available — Web Speech loads them asynchronously,
 *  so the very first tap would otherwise fall back to a non-Portuguese voice. */
function whenReady(fn: () => void): void {
  if (window.speechSynthesis.getVoices().length) {
    fn();
    return;
  }
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cachedVoice = null;
    fn();
  };
  window.speechSynthesis.addEventListener("voiceschanged", run, { once: true });
  // Fallback: some engines never fire `voiceschanged` (or expose no voices at
  // all). Try anyway after a short wait — speaking with lang "pt-PT" and no
  // explicit voice still produces audio on most engines.
  window.setTimeout(run, 250);
}

/** Speak one piece of text (math symbols read as words). Returns a token that
 *  identifies this playback (for showing a "parar" control), or null if nothing
 *  will be spoken. */
export function speak(text: string): number | null {
  const t = speakable(text);
  if (!canSpeak() || !t) return null;
  const token = ++nextToken;
  whenReady(() => utterAll([t], token));
  return token;
}

/** Speak several pieces in order, with a short pause between each — for lists
 *  read top to bottom, e.g. a tabuada ("1 vezes 2 é igual a 2", pause, next).
 *  Returns the playback token (or null if nothing will be spoken). */
export function speakSequence(parts: string[]): number | null {
  if (!canSpeak()) return null;
  const clean = parts.map(speakable).filter(Boolean);
  if (!clean.length) return null;
  const token = ++nextToken;
  whenReady(() => utterAll(clean, token));
  return token;
}

if (canSpeak()) {
  // Warm up the voice list and refresh the cached choice when it changes.
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    cachedVoice = null;
  });
}
