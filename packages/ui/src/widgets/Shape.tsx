import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { colorVar, softFill, regularPolygon, starPoints } from "./geo";

export type ShapeKind =
  | "circle"
  | "oval"
  | "square"
  | "rectangle"
  | "triangle"
  | "pentagon"
  | "hexagon"
  | "star";

export interface ShapeItem {
  kind: ShapeKind;
  label?: string;
  color?: string;
}

export interface ShapeSpec {
  title?: string;
  shapes: ShapeItem[];
  showSides?: boolean;
}

const sidesOf: Record<ShapeKind, number> = {
  circle: 0,
  oval: 0,
  square: 4,
  rectangle: 4,
  triangle: 3,
  pentagon: 5,
  hexagon: 6,
  star: 5,
};

const defaultName: Record<ShapeKind, string> = {
  circle: "círculo",
  oval: "oval",
  square: "quadrado",
  rectangle: "retângulo",
  triangle: "triângulo",
  pentagon: "pentágono",
  hexagon: "hexágono",
  star: "estrela",
};

function ShapeSVG({ kind, color }: { kind: ShapeKind; color?: string }) {
  const stroke = colorVar(color);
  const fill = softFill(color);
  const common = { fill, stroke, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label={defaultName[kind]}>
      {kind === "circle" && <circle cx="50" cy="50" r="42" {...common} />}
      {kind === "oval" && <ellipse cx="50" cy="50" rx="46" ry="32" {...common} />}
      {kind === "square" && <rect x="12" y="12" width="76" height="76" rx="6" {...common} />}
      {kind === "rectangle" && <rect x="6" y="24" width="88" height="52" rx="6" {...common} />}
      {kind === "triangle" && <polygon points="50,8 92,90 8,90" {...common} />}
      {kind === "pentagon" && <polygon points={regularPolygon(5, 50, 52, 42)} {...common} />}
      {kind === "hexagon" && <polygon points={regularPolygon(6, 50, 50, 44)} {...common} />}
      {kind === "star" && <polygon points={starPoints(5, 50, 52, 44, 20)} {...common} />}
    </svg>
  );
}

export function Shape({ spec }: { spec: ShapeSpec }) {
  return (
    <div className="widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="shapes" size={16} /> Formas</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca numa forma para ouvir o nome</span>
      </div>
      <div className="shape-row">
        {spec.shapes.map((s, i) => {
          const name = s.label ?? defaultName[s.kind];
          const sides = sidesOf[s.kind];
          return (
            <button
              key={i}
              className="shape-item"
              onClick={() => speak(s.kind === "circle" || s.kind === "oval" ? `${name}. É redondo.` : `${name}. Tem ${sides} lados.`)}
              style={{ ["--c" as string]: colorVar(s.color) }}
            >
              <span className="shape-svg">
                <ShapeSVG kind={s.kind} color={s.color} />
              </span>
              <span className="shape-name">{name}</span>
              {spec.showSides && (
                <span className="shape-sides">{sides === 0 ? "redondo" : `${sides} lados`}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
