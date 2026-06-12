import { useCallback, useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { Icon } from "@sprout/icons";
import { speak, speakSequence, stop, canSpeak, subscribeSpeaking, speakingToken, type SpeechLang } from "./speak";

/* Speaker — the one read-aloud button used everywhere. Tap to hear the text;
   while it plays the icon turns into a "parar" (stop) square and tapping again
   stops it. The button clears itself automatically when the audio finishes.
   The child can't read, so this is how they reach almost everything. */

/** Track whether THIS button's playback is the one currently sounding. */
export function useSpeaker(): { playing: boolean; toggle: (arg: string | string[], lang?: SpeechLang) => void } {
  const active = useSyncExternalStore(subscribeSpeaking, speakingToken, () => null);
  const mine = useRef<number | null>(null);
  const playing = mine.current !== null && active === mine.current;
  const toggle = useCallback((arg: string | string[], lang: SpeechLang = "pt-PT") => {
    // Read live state (not the render-time `playing`) so the click is never stale.
    if (mine.current !== null && speakingToken() === mine.current) {
      stop();
      return;
    }
    mine.current = Array.isArray(arg) ? speakSequence(arg, lang) : speak(arg, lang);
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
  style?: CSSProperties;
  /** speech language; defaults to European Portuguese */
  lang?: SpeechLang;
  /** optional visible text after the icon (e.g. "Ouvir") */
  children?: ReactNode;
}

export function Speaker({ text, parts, label = "Ouvir", className = "prose-speak", size = 18, style, lang = "pt-PT", children }: SpeakerProps) {
  const { playing, toggle } = useSpeaker();
  const arg = parts ?? text ?? "";
  const empty = Array.isArray(arg) ? arg.length === 0 : !arg.trim();
  if (!canSpeak() || empty) return null;
  return (
    <button
      type="button"
      className={className}
      style={style}
      data-playing={playing || undefined}
      onClick={() => toggle(arg, lang)}
      aria-label={playing ? "Parar" : label}
      title={playing ? "Parar" : label}
    >
      <Icon name={playing ? "stop" : "speaker"} size={size} />
      {children}
    </button>
  );
}
