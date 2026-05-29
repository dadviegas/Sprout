import { useRef, useState } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { polar } from "./geo";
import { Confetti } from "../Confetti";

export interface ClockSpec {
  mode?: "show" | "play" | "set";
  hour?: number; // 1–12
  minute?: number; // 0–59
  prompt?: string;
  title?: string;
}

function norm12(h: number): number {
  return ((h - 1 + 12) % 12) + 1; // keep in 1–12
}

/** Friendly European-Portuguese reading of a time. */
function readTime(hour: number, minute: number): string {
  const h = norm12(hour);
  const start = h === 1 ? "É 1 hora" : `São ${h} horas`;
  if (minute === 0) return start;
  if (minute === 15) return `${h === 1 ? "É 1 hora" : `São ${h}`} e um quarto`;
  if (minute === 30) return `${h === 1 ? "É 1 hora" : `São ${h}`} e meia`;
  if (minute === 45) {
    const next = norm12(h + 1);
    return `São quinze para as ${next}`;
  }
  return `${h === 1 ? "É 1 hora" : `São ${h} horas`} e ${minute} minutos`;
}

function digital(hour: number, minute: number): string {
  return `${norm12(hour)}:${minute.toString().padStart(2, "0")}`;
}

function ClockFace({
  hour,
  minute,
  onSetMinute,
  interactive,
}: {
  hour: number;
  minute: number;
  onSetMinute?: (m: number) => void;
  interactive: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const minuteAngle = minute * 6;
  const hourAngle = (norm12(hour) % 12) * 30 + minute * 0.5;
  const [mhx, mhy] = polar(100, 100, 72, minuteAngle);
  const [hhx, hhy] = polar(100, 100, 50, hourAngle);

  const angleFromPointer = (e: React.PointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 200 - 100;
    const y = ((e.clientY - rect.top) / rect.height) * 200 - 100;
    let deg = (Math.atan2(x, -y) * 180) / Math.PI;
    if (deg < 0) deg += 360;
    return deg;
  };

  const apply = (e: React.PointerEvent) => {
    if (!onSetMinute) return;
    const deg = angleFromPointer(e);
    if (deg == null) return;
    const m = (Math.round(deg / 30) * 5) % 60; // snap to nearest 5 minutes
    onSetMinute(m);
  };

  return (
    <svg
      ref={svgRef}
      className="clock-face"
      viewBox="0 0 200 200"
      role="img"
      aria-label={`Relógio: ${digital(hour, minute)}`}
      style={{ touchAction: interactive ? "none" : undefined, cursor: interactive ? "grab" : "default" }}
      onPointerDown={interactive ? (e) => { dragging.current = true; (e.target as Element).setPointerCapture?.(e.pointerId); apply(e); } : undefined}
      onPointerMove={interactive ? (e) => { if (dragging.current) { e.preventDefault(); apply(e); } } : undefined}
      onPointerUp={interactive ? () => { dragging.current = false; } : undefined}
    >
      <circle cx="100" cy="100" r="94" fill="var(--surface)" stroke="var(--ink)" strokeWidth="4" />
      <circle cx="100" cy="100" r="94" fill="none" stroke="var(--accent)" strokeWidth="4" strokeDasharray="2 6" opacity="0.5" />
      {/* minute ticks */}
      {Array.from({ length: 60 }, (_, i) => {
        const major = i % 5 === 0;
        const [x1, y1] = polar(100, 100, 90, i * 6);
        const [x2, y2] = polar(100, 100, major ? 80 : 85, i * 6);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink-3)" strokeWidth={major ? 2.5 : 1} />;
      })}
      {/* numbers 1–12 */}
      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const [x, y] = polar(100, 100, 68, n * 30);
        return (
          <text key={n} x={x} y={y + 6} textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" style={{ fontFamily: "var(--font-display)" }}>
            {n}
          </text>
        );
      })}
      {/* hour hand */}
      <line x1="100" y1="100" x2={hhx} y2={hhy} stroke="var(--ink)" strokeWidth="7" strokeLinecap="round" />
      {/* minute hand */}
      <line x1="100" y1="100" x2={mhx} y2={mhy} stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="100" r="6" fill="var(--ink)" />
      {interactive && <circle cx={mhx} cy={mhy} r="9" fill="var(--accent)" opacity="0.9" />}
    </svg>
  );
}

export function Clock({ spec }: { spec: ClockSpec }) {
  const mode = spec.mode ?? "play";
  const initH = norm12(spec.hour ?? (mode === "show" || mode === "set" ? 12 : 12));
  const initM = ((spec.minute ?? 0) % 60 + 60) % 60;

  const [hour, setHour] = useState(mode === "set" ? 12 : initH);
  const [minute, setMinute] = useState(mode === "set" ? 0 : initM);
  const [checked, setChecked] = useState<null | boolean>(null);

  const interactive = mode !== "show";
  const targetH = norm12(spec.hour ?? 12);
  const targetM = initM;
  const isRight = mode === "set" && hour === targetH && minute === targetM;

  const stepHour = (d: number) => { setHour((h) => norm12(h + d)); setChecked(null); };
  const stepMin = (d: number) => {
    setMinute((m) => {
      let nm = m + d;
      let carry = 0;
      if (nm >= 60) { nm -= 60; carry = 1; }
      if (nm < 0) { nm += 60; carry = -1; }
      if (carry) setHour((h) => norm12(h + carry));
      return nm;
    });
    setChecked(null);
  };

  return (
    <div className="widget clock-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="clock" size={16} /> Relógio</span>
        {spec.title && <strong>{spec.title}</strong>}
      </div>

      {mode === "set" && spec.prompt && (
        <p className="clock-prompt">
          {spec.prompt}{" "}
          <button className="iconbtn" style={{ width: 34, height: 34 }} onClick={() => speak(spec.prompt!)} aria-label="Ouvir"><Icon name="speaker" size={18} /></button>
        </p>
      )}

      <div className="clock-body">
        <div className="clock-svg-wrap">
          <ClockFace hour={hour} minute={minute} interactive={interactive} onSetMinute={interactive ? (m) => { setMinute(m); setChecked(null); } : undefined} />
        </div>

        <div className="clock-side">
          <div className="clock-readout">{digital(hour, minute)}</div>
          <button className="pill ghost" onClick={() => speak(readTime(hour, minute))}><Icon name="speaker" size={18} /> {readTime(hour, minute)}</button>

          {interactive && (
            <>
              <div className="clock-ctrl">
                <span>Hora</span>
                <button className="iconbtn" onClick={() => stepHour(-1)} aria-label="Menos uma hora"><Icon name="minus" size={18} /></button>
                <button className="iconbtn" onClick={() => stepHour(1)} aria-label="Mais uma hora"><Icon name="plus" size={18} /></button>
              </div>
              <div className="clock-ctrl">
                <span>Minutos</span>
                <button className="iconbtn" onClick={() => stepMin(-5)} aria-label="Menos cinco minutos"><Icon name="minus" size={18} /></button>
                <button className="iconbtn" onClick={() => stepMin(5)} aria-label="Mais cinco minutos"><Icon name="plus" size={18} /></button>
              </div>
              <p className="w-hint">Dica: arrasta o ponteiro grande cor de laranja.</p>
            </>
          )}

          {mode === "set" && (
            <>
              <button className="pill" onClick={() => setChecked(isRight)}>Verificar <Icon name="check" size={18} /></button>
              {checked !== null && (
                <div className={`feedback ${checked ? "good" : "bad"}`}>
                  <Icon name={checked ? "check" : "info"} size={18} />
                  {checked ? "Boa! Acertaste!" : "Quase! Tenta outra vez."}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {mode === "set" && checked && <Confetti />}
    </div>
  );
}
