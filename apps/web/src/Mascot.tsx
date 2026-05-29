import { Icon } from "@sprout/icons";
import { speak, canSpeak } from "@sprout/ui";

export type Mood = "happy" | "cheer" | "think" | "idle";

/* "Feijãozinho" — the little sprout that guides the child, gives
   encouragement and can read its message aloud. Rendered from the project
   icon set (no emoji), inside a friendly round badge. */
export function Mascot({
  message,
  mood = "happy",
  speakable = true,
}: {
  message: string;
  mood?: Mood;
  speakable?: boolean;
}) {
  return (
    <div className="hero sprout-fade-up">
      <div
        className={`mascot ${mood === "cheer" ? "wobble" : "bounce"}`}
        role="img"
        aria-label="Feijãozinho, o teu ajudante"
      >
        <Icon name={mood === "cheer" ? "star" : "plant"} size="56%" fill={mood === "cheer" ? "currentColor" : "none"} />
      </div>
      <div className="bubble">
        <span>{message}</span>
        {speakable && canSpeak() && (
          <button className="bubble-speak" onClick={() => speak(message)} aria-label="Ouvir" title="Ouvir">
            <Icon name="speaker" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
