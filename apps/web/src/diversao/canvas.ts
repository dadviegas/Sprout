/* Shared canvas helpers for the Diversão rooms — the only place in Sprout that
 * uses <canvas> (everything else is inline SVG). Kept deliberately tiny: each
 * room owns its own drawing/physics; this just covers the two things they all
 * repeat — sizing the backing store for crisp retina/iPad drawing, and reading
 * the pointer in one code path for touch, pen and mouse. */

/** True when the device asks for reduced motion — honour it (no ambient loops,
 *  fewer particles). Read once at mount, like the SVG widgets do. */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/** Size a canvas's backing store to its CSS box × devicePixelRatio and scale the
 *  2D context so 1 drawing unit = 1 CSS pixel (sharp on retina / iPad). Returns
 *  the logical CSS size to draw against. Safe to call every frame — it only
 *  touches the canvas when the box actually changed (e.g. rotation/resize). */
export function fitCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): { w: number; h: number } {
  const dpr = Math.min(window.devicePixelRatio || 1, 3); // cap: huge dpr × big canvas = jank
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const bw = Math.round(w * dpr);
  const bh = Math.round(h * dpr);
  if (canvas.width !== bw || canvas.height !== bh) {
    canvas.width = bw;
    canvas.height = bh;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { w, h };
}

/** Pointer position in CSS pixels relative to the canvas. Works for any event
 *  that carries clientX/clientY (PointerEvent, MouseEvent, a touch point). */
export function pointerPos(
  canvas: HTMLCanvasElement,
  e: { clientX: number; clientY: number },
): { x: number; y: number } {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

/** Read a CSS custom property (e.g. "--joy") off an element, resolved to a real
 *  colour string canvas can use. Lets the rooms paint from the design tokens so
 *  they stay on-theme in light and dark mode. Falls back to `fallback`. */
export function cssVar(el: Element, name: string, fallback: string): string {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || fallback;
}
