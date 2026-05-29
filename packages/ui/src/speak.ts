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

function utter(text: string): void {
  const synth = window.speechSynthesis;
  synth.cancel(); // stop anything already playing
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice();
  if (v) u.voice = v;
  // Set lang to the chosen voice's lang (or pt-PT) so the engine still tries
  // Portuguese pronunciation even when no explicit voice is available.
  u.lang = v?.lang || "pt-PT";
  u.rate = 0.92;
  u.pitch = 1.05;
  synth.speak(u);
  // Chrome occasionally leaves synthesis paused right after cancel(); nudge it.
  if (synth.paused) synth.resume();
}

export function speak(text: string): void {
  if (!canSpeak() || !text.trim()) return;
  // If voices aren't loaded yet, wait for them once before speaking, so the
  // very first tap doesn't fall back to a non-Portuguese (or no) voice.
  if (!window.speechSynthesis.getVoices().length) {
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      cachedVoice = null;
      utter(text);
    };
    window.speechSynthesis.addEventListener("voiceschanged", run, { once: true });
    // Fallback: some engines never fire `voiceschanged` (or expose no voices at
    // all). Try anyway after a short wait — speaking with lang "pt-PT" and no
    // explicit voice still produces audio on most engines.
    window.setTimeout(run, 250);
    return;
  }
  utter(text);
}

if (canSpeak()) {
  // Warm up the voice list and refresh the cached choice when it changes.
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    cachedVoice = null;
  });
}
