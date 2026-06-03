/* Progressive enhancement: the experimental HTML-in-Canvas API
 * (https://html-in-canvas.dev — `ctx.drawElementImage()` + the `layoutsubtree`
 * canvas attribute). It draws live, CSS-styled HTML *into* a canvas scene.
 *
 * Availability (as of 2026): Chromium-only, behind a flag
 * (chrome://flags/#canvas-draw-element) / origin trial. Safari/WebKit — i.e.
 * EVERY browser on iPad and iPhone — has no support, and neither does Firefox.
 *
 * So this is a strictly ADDITIVE layer. Where it exists it paints a little extra
 * sparkle into the garden; everywhere else `supportsDrawElement()` is false and
 * the canvas already draws the whole scene itself. The baseline must NEVER
 * depend on it — that is what keeps the fun area working on iPad/phone/desktop. */

type DrawElementCtx = CanvasRenderingContext2D & {
  drawElementImage?: (el: Element, x: number, y: number) => unknown;
};

/** Is the experimental HTML-in-Canvas draw method present? (Chrome + flag only.) */
export function supportsDrawElement(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof CanvasRenderingContext2D !== "undefined" &&
    "drawElementImage" in CanvasRenderingContext2D.prototype
  );
}

/** Draw a live HTML element into the canvas at (x, y) in CSS pixels, if the API
 *  is available. A no-op that swallows any error otherwise — it can never break
 *  the surrounding scene. Returns true only when it actually drew something. */
export function drawHtmlInto(ctx: CanvasRenderingContext2D, el: Element, x: number, y: number): boolean {
  const c = ctx as DrawElementCtx;
  if (typeof c.drawElementImage !== "function") return false;
  try {
    c.drawElementImage(el, x, y);
    return true;
  } catch {
    return false; // API present but shaped differently (it's still changing) — ignore.
  }
}
