/* Tiny sound-effects engine for the arcade games. Every sound is SYNTHESISED on
 * the fly with the Web Audio API (an oscillator + a gain envelope) — there are
 * no .mp3/.wav assets and no network, so it works offline and stays tiny. That
 * also makes it play nicely on iPad: an AudioContext starts "suspended" and may
 * only sound after a user gesture, so we create it lazily and resume() it on the
 * first sound — and every game sound here happens right after a tap, so the
 * gesture requirement is always met.
 *
 * This is for short, playful feedback DURING a game (a jump boing, a coin ding,
 * a crash). Spoken instructions/results still go through `speak()` — the project
 * read-aloud rule. A single module-level mute flag is shared by both games. */

type ToneOpts = {
  /** start frequency in Hz */
  freq: number;
  /** length in seconds */
  dur: number;
  /** wave shape (sine is soft, square/sawtooth are buzzier) */
  type?: OscillatorType;
  /** peak volume 0..1 (kept low — these stack during play) */
  gain?: number;
  /** glide the pitch to this frequency over `dur` (a little "whoop") */
  slideTo?: number;
  /** start this many seconds later (chain notes into a jingle) */
  delay?: number;
};

let ctx: AudioContext | null = null;
let muted = false;

/** The shared AudioContext, created on first use and nudged out of "suspended"
 *  (which is the state iOS/Chrome leave it in until a user gesture). */
function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) {
    try {
      ctx = new Ctor();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

/** One enveloped tone. The gain ramps up fast and decays away so notes don't
 *  click; exponential ramps need a tiny non-zero floor (0.0001), not 0. */
function tone(o: ToneOpts): void {
  const ac = audio();
  if (!ac || muted) return;
  const t0 = ac.currentTime + (o.delay ?? 0);
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = o.type ?? "sine";
  osc.frequency.setValueAtTime(o.freq, t0);
  if (o.slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, o.slideTo), t0 + o.dur);
  const peak = o.gain ?? 0.16;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + o.dur + 0.03);
}

/** A short burst of filtered noise — the "crunch" under a crash/explosion. */
function noise(dur: number, gain = 0.18): void {
  const ac = audio();
  if (!ac || muted) return;
  const t0 = ac.currentTime;
  const n = Math.floor(ac.sampleRate * dur);
  const buf = ac.createBuffer(1, n, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < n; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / n); // decaying hiss
  const src = ac.createBufferSource();
  src.buffer = buf;
  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1400;
  const g = ac.createGain();
  g.gain.value = gain;
  src.connect(lp).connect(g).connect(ac.destination);
  src.start(t0);
}

export const sfx = {
  isMuted: (): boolean => muted,
  setMuted: (m: boolean): void => {
    muted = m;
  },
  /** Flip mute and return the new state (for a UI button). */
  toggleMuted: (): boolean => {
    muted = !muted;
    return muted;
  },
  /** Warm up / unlock audio from a user gesture (call on the first tap). */
  unlock: (): void => {
    audio();
  },

  /** A bouncy jump (rising whoop). `big` = the springier double-jump. */
  jump: (big = false): void =>
    tone({ freq: big ? 440 : 360, slideTo: big ? 940 : 720, dur: 0.18, type: "sine", gain: 0.16 }),
  /** Picked up a coin/star. `step` raises the pitch with the combo for a run-up. */
  coin: (step = 0): void =>
    tone({ freq: 640 + Math.min(step, 8) * 70, dur: 0.12, type: "square", gain: 0.12 }),
  /** Grabbed a power-up (shield) — a happy two-note sparkle. */
  power: (): void => {
    tone({ freq: 520, slideTo: 1040, dur: 0.16, type: "triangle", gain: 0.16 });
    tone({ freq: 820, slideTo: 1560, dur: 0.2, type: "sine", gain: 0.12, delay: 0.08 });
  },
  /** Took a hit — a falling buzz plus a crunch. */
  hit: (): void => {
    tone({ freq: 220, slideTo: 70, dur: 0.3, type: "sawtooth", gain: 0.18 });
    noise(0.26, 0.18);
  },
  /** Round started — a short ready beep. */
  start: (): void => {
    tone({ freq: 520, dur: 0.1, type: "square", gain: 0.12 });
    tone({ freq: 784, dur: 0.12, type: "square", gain: 0.12, delay: 0.1 });
  },
  /** Game over — a gentle descending sad trio. */
  over: (): void => {
    [0, 1, 2].forEach((i) =>
      tone({ freq: 520 - i * 120, dur: 0.24, type: "triangle", gain: 0.16, delay: i * 0.17 }),
    );
  },
  /** New record / win — a rising major arpeggio. */
  fanfare: (): void => {
    [523, 659, 784, 1047].forEach((f, i) =>
      tone({ freq: f, dur: 0.2, type: "square", gain: 0.14, delay: i * 0.1 }),
    );
  },
};
