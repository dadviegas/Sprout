/* Read text aloud in European Portuguese using the browser's built-in speech
   synthesis. No dependency, no network. Helps children who can't read yet
   (e.g. 1.º ano) follow questions and instructions.

   Two things make Web Speech flaky and are handled here:
   1) voices load ASYNC (Chrome returns [] from getVoices() until the
      `voiceschanged` event), so the first tap could speak with no/wrong voice;
   2) if no European-Portuguese voice exists, a Brazilian (pt-BR) voice still
      reads Portuguese far better than a default English voice. */

export type SpeechLang = "pt-PT" | "en-US";
export interface SpeechPart {
  text: string;
  lang?: SpeechLang;
  /** Optional absolute speech rate for this part. */
  rate?: number;
}
export interface SpeechOptions {
  /** Optional absolute speech rate for every part unless a part overrides it. */
  rate?: number;
}
interface NormalizedSpeechPart {
  text: string;
  lang: SpeechLang;
  rate?: number;
}

let cachedVoices: Partial<Record<SpeechLang, SpeechSynthesisVoice | null>> = {};

/* Voice quality signals (in the voice NAME — the only metadata Web Speech
   gives us). Rationale: within Portuguese voices, the right language variant
   (pt-PT over pt-BR) is worth 1 point but each quality marker is worth 2 —
   OSes often ship a robotic "compact" pt-PT next to a natural neural pt-BR,
   and the natural voice is far easier for a child to follow. */
const QUALITY = /enhanced|premium|natural|neural|melhorada/i; // OS "better voice" tiers
const VENDOR = /google|microsoft|online/i; // cloud-backed voices read pt well
const KNOWN_GOOD = /joana|catarina|duarte|raquel|fernanda/i; // good pt-PT voices by name
const LOW_QUALITY = /compact|eloquence|espeak|grandma|grandpa|novelty/i; // robotic/joke voices

const EN_GOOD = /samantha|daniel|serena|ava|allison|google us english|microsoft/i;

/** Higher = better fit for European Portuguese. 0 = not Portuguese. */
function ptScore(v: SpeechSynthesisVoice): number {
  const lang = (v.lang || "").toLowerCase().replace("_", "-");
  if (!lang.startsWith("pt")) return 0; // not Portuguese
  let score = lang === "pt-pt" ? 4 : 3; // European Portuguese wins at equal quality
  const name = v.name || "";
  if (QUALITY.test(name)) score += 2;
  if (VENDOR.test(name)) score += 2;
  if (KNOWN_GOOD.test(name)) score += 2;
  if (LOW_QUALITY.test(name)) score -= 3; // a compact pt-PT loses to any decent pt-BR
  return Math.max(1, score); // any Portuguese voice still beats none at all
}

/** Higher = better fit for English. 0 = not English. */
function enScore(v: SpeechSynthesisVoice): number {
  const lang = (v.lang || "").toLowerCase().replace("_", "-");
  if (!lang.startsWith("en")) return 0;
  let score = lang === "en-us" ? 4 : lang === "en-gb" ? 3 : 2;
  const name = v.name || "";
  if (QUALITY.test(name)) score += 2;
  if (VENDOR.test(name)) score += 2;
  if (EN_GOOD.test(name)) score += 2;
  if (LOW_QUALITY.test(name)) score -= 3;
  return Math.max(1, score);
}

function pickVoice(lang: SpeechLang): SpeechSynthesisVoice | null {
  if (cachedVoices[lang] !== undefined) return cachedVoices[lang] ?? null;
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const score = lang === "en-US" ? enScore : ptScore;
  const best = window.speechSynthesis
    .getVoices()
    .map((v) => [score(v), v] as const)
    .filter(([s]) => s > 0)
    .sort((a, b) => b[0] - a[0])[0];
  cachedVoices[lang] = best ? best[1] : null;
  return cachedVoices[lang] ?? null;
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/* Measure units, expanded only when glued to a number ("250 ml", "3km") so the
   same letters inside ordinary words ("mala", "logo") are never touched.
   Compound units come before their bare suffix ("ml"/"cl" before "l", "kg"
   before "g") so the longer match wins. "1" takes the singular form. */
const UNITS: [string, string][] = [
  ["ml", "mililitro"], ["cl", "centilitro"], ["l", "litro"],
  ["km", "quilómetro"], ["cm", "centímetro"], ["mm", "milímetro"],
  ["kg", "quilograma"], ["g", "grama"],
];

function expandUnits(text: string): string {
  for (const [u, word] of UNITS) {
    text = text.replace(
      new RegExp(`(\\d+(?:[.,]\\d+)?)\\s*${u}\\b`, "gi"),
      (_, n: string) => `${n} ${word}${n === "1" ? "" : "s"}`,
    );
  }
  return text;
}

/** Turn written notation into hearable prose: math symbols become words ("1
 *  vezes 2 é igual a 2"), emoji are stripped (decoration for the eye, not the
 *  ear), digit-adjacent measure units expand ("250 ml" → "250 mililitros"),
 *  line breaks become sentence pauses, and the result always ends with
 *  terminal punctuation so the engine reads a sentence, not a word list.
 *  Symbols that also appear in ordinary Portuguese (the hyphen in "bem-vindo",
 *  the slash in "e/ou") are only converted when they sit BETWEEN digits, i.e.
 *  in a real sum. Idempotent: text that's already prose passes through. */
export function speakable(text: string): string {
  let t = text
    // Emoji, pictographs and their joiners — never read aloud.
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
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
    .replace(/(\d)\s*€/g, "$1 euros");
  t = expandUnits(t);
  // Newlines and runs of spaces are layout, not prose: close the chunk before
  // the break as a sentence (".") unless it already ends with punctuation, so
  // a list is read line by line with pauses instead of as one run-on string.
  t = t.replace(/[ \t]*(?:\n|[ \t]{2,})\s*/g, (_m, offset: number, s: string) => {
    const prev = s.slice(0, offset).trimEnd().slice(-1);
    return !prev || /[.!?…:;,]/.test(prev) ? " " : ". ";
  });
  t = t.replace(/\s+/g, " ").trim();
  // Always end on terminal punctuation — the engine then closes the sentence
  // with falling intonation instead of trailing off.
  if (t && !/[.!?…]$/.test(t)) t = t.replace(/[,;:]+$/, "") + ".";
  return t;
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

function clampRate(rate: number): number {
  return Math.min(1.4, Math.max(0.5, rate));
}

function makeUtterance(text: string, lang: SpeechLang, rate?: number): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice(lang);
  if (v) u.voice = v;
  // Set lang to the chosen voice's lang (or the requested language) so the
  // engine still tries the right pronunciation without an explicit voice.
  u.lang = v?.lang || lang;
  u.rate = clampRate(rate ?? (lang === "en-US" ? 0.9 : 0.92));
  u.pitch = 1.05;
  return u;
}

function utterAll(parts: NormalizedSpeechPart[], token: number): void {
  const synth = window.speechSynthesis;
  // cancel() and speak() in the SAME tick wedges Chrome's engine (every new
  // utterance dies instantly with "canceled" and `speaking` sticks at true,
  // until the browser restarts). Cancel now, but queue the new speech on a
  // short timeout so the engine finishes tearing down first. ~120ms is well
  // inside the user-activation window, so autoplay policy still allows it.
  synth.cancel(); // stop anything already playing
  setPlaying(token); // button flips to "parar" immediately
  window.setTimeout(() => {
    if (playingToken !== token) return; // a newer tap or stop() superseded us
    reallyUtter(parts, token);
  }, 120);
}

function reallyUtter(parts: NormalizedSpeechPart[], token: number): void {
  const synth = window.speechSynthesis;
  // Mark the playback done only when THIS token is still the active one (a
  // newer tap, or stop(), will have moved it on — don't clobber that).
  const finish = () => {
    if (playingToken === token) setPlaying(null);
    clearWatchdog();
  };
  const utterances = parts.map((part) => makeUtterance(part.text, part.lang, part.rate));
  // Queue each part as its own utterance: the gap between utterances gives a
  // natural pause, so a list (e.g. a tabuada) is read line by line, not run-on.
  // Only the LAST utterance signals completion — an `error` on an EARLIER one
  // (mid-sequence) must not mark the whole run done while later lines still play
  // (the watchdog is the fallback if the last one never fires either event).
  const last = utterances[utterances.length - 1];
  last.addEventListener("end", finish);
  last.addEventListener("error", finish);
  for (const u of utterances) synth.speak(u);
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
    cachedVoices = {};
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
export function speak(text: string, lang: SpeechLang = "pt-PT", opts: SpeechOptions = {}): number | null {
  return speakSequence([text], lang, opts); // one-part sequence — same cleanup, same queue
}

/** Speak several pieces in order, with a short pause between each — for lists
 *  read top to bottom, e.g. a tabuada ("1 vezes 2 é igual a 2", pause, next).
 *  Returns the playback token (or null if nothing will be spoken).
 *  This is the single gate to the engine: speak() funnels here too, so every
 *  utterance is normalised by speakable() exactly once. */
export function speakSequence(parts: string[], lang: SpeechLang = "pt-PT", opts: SpeechOptions = {}): number | null {
  if (!canSpeak()) return null;
  const clean: NormalizedSpeechPart[] = parts.map(speakable).filter(Boolean).map((text) => (
    opts.rate == null ? { text, lang } : { text, lang, rate: opts.rate }
  ));
  if (!clean.length) return null;
  const token = ++nextToken;
  whenReady(() => utterAll(clean, token));
  return token;
}

/** Speak a mixed-language sequence, e.g. an English word followed by its
 *  Portuguese meaning. Each part keeps its own voice/language. */
export function speakMixed(parts: SpeechPart[], opts: SpeechOptions = {}): number | null {
  if (!canSpeak()) return null;
  const clean: NormalizedSpeechPart[] = parts
    .map((p) => {
      const text = speakable(p.text);
      const lang = p.lang ?? "pt-PT";
      const rate = p.rate ?? opts.rate;
      return rate == null ? { text, lang } : { text, lang, rate };
    })
    .filter((p) => Boolean(p.text));
  if (!clean.length) return null;
  const token = ++nextToken;
  whenReady(() => utterAll(clean, token));
  return token;
}

if (canSpeak()) {
  // Warm up the voice list and refresh the cached choice when it changes.
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    cachedVoices = {};
  });
}
