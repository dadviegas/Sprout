import { useCallback, useRef, useSyncExternalStore, type ReactNode } from "react";
import { Icon } from "@sprout/icons";
import { speak, speakSequence, stop, canSpeak, subscribeSpeaking, speakingToken } from "./speak";

/* Speaker — the one read-aloud button used everywhere. Tap to hear the text;
   while it plays the icon turns into a "parar" (stop) square and tapping again
   stops it. The button clears itself automatically when the audio finishes.
   The child can't read, so this is how they reach almost everything. */

/** Track whether THIS button's playback is the one currently sounding. */
export function useSpeaker(): { playing: boolean; toggle: (arg: string | string[]) => void } {
  const active = useSyncExternalStore(subscribeSpeaking, speakingToken, () => null);
  const mine = useRef<number | null>(null);
  const playing = mine.current !== null && active === mine.current;
  const toggle = useCallback((arg: string | string[]) => {
    // Read live state (not the render-time `playing`) so the click is never stale.
    if (mine.current !== null && speakingToken() === mine.current) {
      stop();
      return;
    }
    mine.current = Array.isArray(arg) ? speakSequence(arg) : speak(arg);
  }, []);
  return { playing, toggle };
}

export interface SpeakerProps {
  /** text to read (math symbols are read as words) */
  text?: string;
  /** several lines read in order, with a pause between (e.g. a tabuada) */
  parts?: string[];
  /** accessible label for the idle (play) state */
  label?: string;
  className?: string;
  size?: number;
  /** optional visible text after the icon (e.g. "Ouvir") */
  children?: ReactNode;
}

export function Speaker({ text, parts, label = "Ouvir", className = "prose-speak", size = 18, children }: SpeakerProps) {
  const { playing, toggle } = useSpeaker();
  const arg = parts ?? text ?? "";
  const empty = Array.isArray(arg) ? arg.length === 0 : !arg.trim();
  if (!canSpeak() || empty) return null;
  return (
    <button
      type="button"
      className={className}
      data-playing={playing || undefined}
      onClick={() => toggle(arg)}
      aria-label={playing ? "Parar" : label}
      title={playing ? "Parar" : label}
    >
      <Icon name={playing ? "stop" : "speaker"} size={size} />
      {children}
    </button>
  );
}
