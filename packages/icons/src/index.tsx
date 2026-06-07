import type { SVGProps } from "react";

/* @sprout/icons — a cohesive, kid-friendly line-icon set.
 * Every icon lives on a 24×24 grid, drawn with `currentColor`, 2px strokes and
 * round caps/joins, so they share one visual weight wherever they appear.
 * Use <Icon name="math" /> (inherits text colour & size via `size`/CSS). */

export const ICONS = {
  // ---- subjects ----
  math: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <path d="M7 8.5h3.6M8.8 6.7v3.6" />
      <path d="M13.4 14l3.2 3.2M16.6 14l-3.2 3.2" />
      <path d="M13.4 7.2h3.4" />
      <path d="M7 14.4h3.6M7 16.6h3.6" />
    </>
  ),
  reading: (
    <>
      <path d="M12 6.2C9.8 4.7 6.8 4.7 4.5 5.4v12.4c2.3-.7 5.3-.7 7.5.8 2.2-1.5 5.2-1.5 7.5-.8V5.4C17.2 4.7 14.2 4.7 12 6.2z" />
      <path d="M12 6.2v12.6" />
    </>
  ),
  world: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.6 12h16.8" />
      <ellipse cx="12" cy="12" rx="4" ry="8.5" />
    </>
  ),
  language: (
    <>
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-8.5L7 19.5V16H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
      <path d="M7.5 13l2-5 2 5M8.2 11.2h2.6" />
      <path d="M14.5 9h3M16 9v.3c0 2-1.4 3.6-3 4.4" />
    </>
  ),
  // ---- 2.º ciclo subjects + science/arts extras ----
  microscope: (
    <>
      <path d="M9.2 4.4l2.6 1.5-2.4 4.2-2.6-1.5z" />
      <path d="M11.2 10.1c2.5 1.5 3.4 4.7 1.9 7.4" />
      <path d="M6.5 20.5h9.5" />
      <path d="M9 20.5a4 4 0 0 1 4-4" />
      <path d="M7.6 13.4l2.1 1.2" />
    </>
  ),
  scroll: (
    <>
      <path d="M9 4h9a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-3" />
      <path d="M15 6v11a3 3 0 0 1-3 3H7a2 2 0 0 1-2-2 2 2 0 0 1 2-2h6" />
      <path d="M9 4a2 2 0 0 0-2 2v9" />
      <path d="M10.5 9.5h3M10.5 12h3" />
    </>
  ),
  brush: (
    <>
      <path d="M18.8 5.2a2 2 0 0 0-2.8 0l-6 6 2.8 2.8 6-6a2 2 0 0 0 0-2.8z" />
      <path d="M9.8 11.4l2.8 2.8" />
      <path d="M9 13.2c-1.6 0-2.9 1.3-2.9 2.9 0 1.2-1 1.9-1.9 2.2 1 1.1 2.8 1.7 4.3 1 1.4-.6 2.4-2 2.4-3.5a2.6 2.6 0 0 0-1.9-2.6z" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),
  music: (
    <>
      <path d="M9 17V6.5l9-2V15" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="16" cy="15" r="2" />
    </>
  ),
  atom: (
    <>
      <circle cx="12" cy="12" r="1.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14 1 9-4 14-14 14z" />
      <path d="M9 15c2-3 4-5 7-6.5" />
    </>
  ),
  mountain: (
    <>
      <path d="M2.5 19h19L15 7l-3 5-2.2-3.5z" />
      <path d="M13.4 10.8l1.6-1.4 1.2 1.8" />
    </>
  ),
  bolt: <path d="M13 3 5 13h5l-1 8 8-11h-5z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  // ---- chrome / navigation ----
  home: (
    <>
      <path d="M4 11l8-6.5 8 6.5" />
      <path d="M6 9.6V20h12V9.6" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  back: <path d="M14.5 5.5L8 12l6.5 6.5" />,
  forward: <path d="M9.5 5.5L16 12l-6.5 6.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  // enter fullscreen — four corners opening outward
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  // exit fullscreen — four corners closing inward
  collapse: <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2L19 19M5 19l1.8-1.8M17.2 6.8L19 5" />
    </>
  ),
  moon: <path d="M20 13.5A8 8 0 0 1 10.5 4 7 7 0 1 0 20 13.5z" />,
  speaker: (
    <>
      <path d="M4 9.5h3L11 6v12L7 14.5H4z" />
      <path d="M14.5 9.5a3.5 3.5 0 0 1 0 5M17 7a7 7 0 0 1 0 10" />
    </>
  ),
  // A filled rounded square — the "parar" (stop) state of a read-aloud button.
  stop: <rect x="6" y="6" width="12" height="12" rx="3" fill="currentColor" />,
  star: <path d="M12 3.5l2.6 5.3 5.8.9-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.9z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  sparkle: (
    <>
      <path d="M12 4l1.7 4.6L18 10.3l-4.3 1.7L12 16.6l-1.7-4.6L6 10.3l4.3-1.7z" />
      <path d="M18.5 15l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" />
    </>
  ),
  map: (
    <>
      <path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6.5 7l1 12.5a1 1 0 0 0 1 .9h7a1 1 0 0 0 1-.9L18.5 7" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  island: (
    <>
      <path d="M12 4c2.4 0 3.6 1.8 3.6 3.6 0 1.6-1.2 2.6-1.2 4.4h-4.8c0-1.8-1.2-2.8-1.2-4.4C8.4 5.8 9.6 4 12 4z" />
      <path d="M3 18c1.3 0 1.3 1 2.6 1s1.3-1 2.6-1 1.3 1 2.6 1 1.3-1 2.6-1 1.3 1 2.6 1 1.3-1 2.6-1" />
      <path d="M3.5 21c1.3 0 1.3 1 2.6 1s1.3-1 2.6-1 1.3 1 2.6 1" />
    </>
  ),
  wave2: (
    <>
      <path d="M3 9c1.5 0 1.5 1.2 3 1.2S7.5 9 9 9s1.5 1.2 3 1.2S13.5 9 15 9s1.5 1.2 3 1.2S19.5 9 21 9" />
      <path d="M3 14c1.5 0 1.5 1.2 3 1.2S7.5 14 9 14s1.5 1.2 3 1.2S13.5 14 15 14s1.5 1.2 3 1.2S19.5 14 21 14" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 0 1-10 0z" />
      <path d="M7 5.5H4.5V7a2.5 2.5 0 0 0 2.5 2.5M17 5.5h2.5V7A2.5 2.5 0 0 1 17 9.5" />
      <path d="M12 13v3M9 20h6M9.5 20a2.5 2.5 0 0 1 5 0" />
    </>
  ),
  // ---- callout glyphs ----
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16.5V11M12 8.2v.05" />
    </>
  ),
  tip: (
    <>
      <path d="M12 2.5v1.8M4.5 5l1.3 1.3M19.5 5l-1.3 1.3M3 11.5h1.8M19.2 11.5H21M8 16h8M9 19h6" />
      <path d="M8 15.5a5 5 0 1 1 8 0" />
    </>
  ),
  warn: (
    <>
      <path d="M12 3L2.5 20h19L12 3z" />
      <path d="M12 9.5v5M12 17.5v.05" />
    </>
  ),
  danger: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.3v.05" />
    </>
  ),
  ok: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l2.8 2.8L16 9.5" />
    </>
  ),
  // ---- topics ----
  shapes: (
    <>
      <rect x="3.5" y="13" width="7" height="7" rx="1.5" />
      <circle cx="16.5" cy="16.5" r="3.5" />
      <path d="M12 4l3.8 7H8.2z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.4 2" />
    </>
  ),
  plant: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 14c0-3.2 2.6-5.6 6.2-5.6C18.2 11.8 15.6 14 12 14z" />
      <path d="M12 13c0-3-2.4-5.3-5.8-5.3C6.2 10.6 8.6 13 12 13z" />
    </>
  ),
  planet: (
    <>
      <circle cx="11" cy="11" r="6" />
      <ellipse cx="11.5" cy="12" rx="10" ry="3.4" transform="rotate(-22 11.5 12)" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <path d="M4 9.5h16M8 3.5v3M16 3.5v3" />
    </>
  ),
  paw: (
    <>
      <circle cx="7" cy="9" r="1.7" />
      <circle cx="12" cy="7" r="1.7" />
      <circle cx="17" cy="9" r="1.7" />
      <path d="M12 12c-2.8 0-4.8 1.8-4.8 4.2 0 2 2 2.8 4.8 2.8s4.8-.8 4.8-2.8C16.8 13.8 14.8 12 12 12z" />
    </>
  ),
  apple: (
    <>
      <path d="M12 7.5c-1-2-4-2.6-6-1C4 8 4 12.5 6 15.5c1.4 2.4 3 3.8 6 3.8s4.6-1.4 6-3.8c2-3 2-7.5 0-9-2-1.6-5-1-6 1z" />
      <path d="M12 7.5c0-2 1.1-3.2 2.7-3.7" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.4 0 2-.9 2-1.9 0-.9-.7-1.4-.7-2.2 0-.9.8-1.6 1.7-1.6H17A4 4 0 0 0 21 11c0-4.2-4-7.5-9-7.5z" />
      <circle cx="8" cy="11" r="1" />
      <circle cx="12" cy="8" r="1" />
      <circle cx="16" cy="11" r="1" />
    </>
  ),
  chart: (
    <>
      <path d="M5 4v16h15" />
      <path d="M9 20v-6M13.5 20v-9M18 20v-4" />
    </>
  ),
  heart: <path d="M12 20S4 15 4 9.4A3.9 3.9 0 0 1 12 7a3.9 3.9 0 0 1 8 2.4C20 15 12 20 12 20z" />,
  drop: <path d="M12 3.5S5.5 11 5.5 15a6.5 6.5 0 0 0 13 0c0-4-6.5-11.5-6.5-11.5z" />,
  letters: (
    <>
      <path d="M3.5 18l3-9 3 9M5 15h3" />
      <path d="M13 9v9h3.2a2.4 2.4 0 0 0 0-4.8H13h2.8a2.1 2.1 0 0 0 0-4.2z" />
    </>
  ),
  abacus: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 9.3h17M3.5 14.7h17" />
      <circle cx="8" cy="6.6" r="1" />
      <circle cx="11" cy="6.6" r="1" />
      <circle cx="13" cy="12" r="1" />
      <circle cx="16" cy="12" r="1" />
      <circle cx="7" cy="17.3" r="1" />
      <circle cx="10" cy="17.3" r="1" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <circle cx="12" cy="15" r="1.3" />
    </>
  ),
  plusminus: (
    <>
      <path d="M5 8v5M2.5 10.5h5" />
      <path d="M14 15.5h7.5" />
      <path d="M12 4.5l1.6 1.6M13.6 4.5L12 6.1" />
    </>
  ),
  times: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  divide: (
    <>
      <path d="M4 12h16" />
      <circle cx="12" cy="7" r="1.3" />
      <circle cx="12" cy="17" r="1.3" />
    </>
  ),
  ruler: (
    <>
      <rect x="2.5" y="9" width="19" height="6" rx="1.5" />
      <path d="M6.5 9v2.6M10 9v3.4M13.5 9v2.6M17 9v3.4" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.6a3.6 3.6 0 1 0 0 4.8M8.5 11h4.5M8.5 13h4.5" />
    </>
  ),
  cart: (
    <>
      <path d="M3.5 4.5h2.2l2 11h9.6l1.8-7.5H6.4" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="16.5" cy="19" r="1.4" />
    </>
  ),
  // A phone/tablet — the "Tecnologia" shelf in the shop.
  device: (
    <>
      <rect x="6.5" y="3" width="11" height="18" rx="2.5" />
      <path d="M10 5.5h4" />
      <circle cx="12" cy="18.3" r="1" />
    </>
  ),
  fraction: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v17M3.5 12H12" />
    </>
  ),
  pencil: (
    <>
      <path d="M5 19l1-3.6L15.5 5.9a2.1 2.1 0 0 1 3 3L9 18.4 5 19z" />
      <path d="M13.5 7.9l3 3" />
    </>
  ),
  quote: (
    <>
      <path d="M9.5 9.5C9.5 8 8.3 7 7 7s-2.5 1.1-2.5 2.6S5.7 12 7 12c0 2-1.3 3.3-3 4" />
      <path d="M19 9.5C19 8 17.8 7 16.5 7S14 8.1 14 9.6 15.2 12 16.5 12c0 2-1.3 3.3-3 4" />
    </>
  ),
  tag: (
    <>
      <path d="M4 11.5V5a1 1 0 0 1 1-1h6.5l8 8-7.5 7.5-8-8z" />
      <circle cx="8" cy="8" r="1.3" />
    </>
  ),
  people: (
    <>
      <circle cx="8" cy="8" r="2.6" />
      <circle cx="16" cy="8" r="2.6" />
      <path d="M3.5 19c0-3 2-5 4.5-5s4.5 2 4.5 5M12.5 19c.2-2.6 2-4.2 4-4.2s3.8 1.6 4 4.2" />
    </>
  ),
  flag: <path d="M6 21V4M6 5h12l-2.5 3.5L18 12H6" />,
  flask: (
    <>
      <path d="M10 4v6.2l-4.2 7A1.6 1.6 0 0 0 7.2 19.6h9.6a1.6 1.6 0 0 0 1.4-2.4L14 10.2V4" />
      <path d="M8.5 4h7M7.6 14.5h8.8" />
    </>
  ),
  castle: (
    <>
      <path d="M4 20V8l2.5 1.6V6L9 7.6V4.5L12 3l3 1.5V7.6L17.5 6v3.6L20 8v12z" />
      <path d="M10 20v-3.5h4V20" />
    </>
  ),
  shield: <path d="M12 3.5l7 2.4v5.3c0 4.6-3 7.8-7 9.5-4-1.7-7-4.9-7-9.5V5.9z" />,
  cloud: <path d="M7.5 18h9.5a3.5 3.5 0 0 0 .3-7A5 5 0 0 0 8 9.5 3.5 3.5 0 0 0 7.5 18z" />,
  shirt: <path d="M8.5 4L4 7l2.2 3.2L8.5 8.7V20h7V8.7l2.3 1.5L20 7l-4.5-3-1.5 2h-4z" />,
  body: (
    <>
      <circle cx="12" cy="5.2" r="2.4" />
      <path d="M12 7.8v7.2M7.5 11l4.5-1 4.5 1M9 21l3-6 3 6" />
    </>
  ),
  wave: (
    <>
      <path d="M7 12V6.6a1.4 1.4 0 0 1 2.8 0V11" />
      <path d="M9.8 9.6a1.4 1.4 0 0 1 2.8 0V11" />
      <path d="M12.6 10.4a1.4 1.4 0 0 1 2.8 0v3.2c0 3-2 5.6-5.2 5.6-2 0-3.6-1-4.6-2.8l-1.1-2a1.5 1.5 0 0 1 2.6-1.6L7.6 12" />
    </>
  ),
  teddy: (
    <>
      <circle cx="12" cy="13.5" r="5.5" />
      <circle cx="7.6" cy="8" r="2.1" />
      <circle cx="16.4" cy="8" r="2.1" />
      <circle cx="10.4" cy="12.5" r=".8" />
      <circle cx="13.6" cy="12.5" r=".8" />
      <path d="M10.4 15.4c.9.8 2.3.8 3.2 0" />
    </>
  ),
  refresh: (
    <>
      <path d="M19.5 11a7.5 7.5 0 1 0-1.7 4.9" />
      <path d="M20 5.5V11h-5.5" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  // ---- diversão ----
  game: (
    <>
      <rect x="2.5" y="7.5" width="19" height="9.5" rx="4.75" />
      <path d="M7 11v2.5M5.75 12.25h2.5" />
      <circle cx="15.6" cy="11.4" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="17.8" cy="13.4" r="1.05" fill="currentColor" stroke="none" />
    </>
  ),
  blocks: (
    <>
      <rect x="3.5" y="12.5" width="8" height="8" rx="1.6" />
      <rect x="12.5" y="12.5" width="8" height="8" rx="1.6" />
      <rect x="8" y="3.6" width="8" height="8" rx="1.6" />
    </>
  ),
  compare: (
    <>
      <path d="M5 8h10M11 4l4 4-4 4" />
      <path d="M19 16H9M13 12l-4 4 4 4" />
    </>
  ),
  ordinal: (
    <>
      <path d="M7 19V8l-2 1.5" />
      <path d="M12 9.5a2.5 2.5 0 1 1 4.2 1.8L12 16h5" />
      <path d="M4 21h16" />
    </>
  ),
  pattern: (
    <>
      <circle cx="6" cy="7" r="2.4" />
      <rect x="11" y="4.6" width="4.8" height="4.8" rx="1" />
      <path d="M18 4.5l3 5.2h-6z" />
      <circle cx="6" cy="17" r="2.4" />
      <rect x="11" y="14.6" width="4.8" height="4.8" rx="1" />
      <path d="M18 14.5l3 5.2h-6z" />
    </>
  ),
  symmetry: (
    <>
      <path d="M12 3v18" />
      <path d="M12 7c-4 0-7 2.2-7 5s3 5 7 5" />
      <path d="M12 7c4 0 7 2.2 7 5s-3 5-7 5" />
      <path d="M7.5 10.2c1.3.8 2.8 1.2 4.5 1.2M16.5 10.2c-1.3.8-2.8 1.2-4.5 1.2" />
    </>
  ),
  puzzle: (
    <>
      <path d="M9 4h6v4a2 2 0 1 1 0 4v8H9v-4a2 2 0 1 0 0-4z" />
      <path d="M9 4v4H5a2 2 0 1 0 0 4h4" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="5.5" width="14" height="15" rx="2" />
      <path d="M9 5.5a3 3 0 0 1 6 0v1.8H9z" />
      <path d="M8.5 12h7M8.5 15.5h5" />
    </>
  ),
  landmark: (
    <>
      <path d="M3.5 9.5h17L12 4z" />
      <path d="M5.5 19.5h13M6.5 17.5h11" />
      <path d="M8 10v7M12 10v7M16 10v7" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
      <path d="M8.5 7h7" />
      <path d="M8.5 11h.05M12 11h.05M15.5 11h.05M8.5 14.5h.05M12 14.5h.05M15.5 14.5h.05M8.5 18h3.5M15.5 18h.05" />
    </>
  ),
  brain: (
    <>
      <path d="M9 5.5a3 3 0 0 0-3 3 3.2 3.2 0 0 0 .4 1.5A4 4 0 0 0 8 17.5h1" />
      <path d="M15 5.5a3 3 0 0 1 3 3 3.2 3.2 0 0 1-.4 1.5A4 4 0 0 1 16 17.5h-1" />
      <path d="M12 5v14M9 9h3M12 12h3M9 15h3" />
    </>
  ),
  chain: (
    <>
      <path d="M9.5 7.5l1.2-1.2a4 4 0 0 1 5.7 5.7l-1.6 1.6" />
      <path d="M14.5 16.5l-1.2 1.2a4 4 0 0 1-5.7-5.7l1.6-1.6" />
      <path d="M9.5 14.5l5-5" />
    </>
  ),
  power: (
    <>
      <path d="M12 3v7" />
      <path d="M8.2 5.8a7 7 0 1 0 7.6 0" />
    </>
  ),
  polygon: (
    <>
      <path d="M8 4.5h8l4 7-4 7H8l-4-7z" />
      <path d="M8 4.5l8 14M16 4.5l-8 14" />
    </>
  ),
  area: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16M10 4v16" />
      <path d="M14 14h3M14 17h3" />
    </>
  ),
  numberLine: (
    <>
      <path d="M4 12h16M7 9v6M12 9v6M17 9v6" />
      <path d="M5.5 17h3M11.2 17h1.6M15.5 17h3" />
      <path d="M6.5 6.5h2M16.5 6.5h2" />
    </>
  ),
  percent: (
    <>
      <path d="M6 18L18 6" />
      <circle cx="7.5" cy="7.5" r="2" />
      <circle cx="16.5" cy="16.5" r="2" />
    </>
  ),
  equation: (
    <>
      <path d="M4 9h6M4 15h6M14 9h6M14 15h6" />
      <path d="M6 6v6M17 6l2 6M19 6l-2 6" />
    </>
  ),
  circle: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 12h8M12 12V4" />
    </>
  ),
  cube: (
    <>
      <path d="M12 3.8l7 4v8.4l-7 4-7-4V7.8z" />
      <path d="M5 7.8l7 4 7-4M12 11.8v8.4" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="7" r="2.2" />
      <circle cx="6" cy="17" r="2.2" />
      <path d="M8 8.2L19 18M8 15.8L19 6" />
    </>
  ),
  image: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M5.5 17l4.2-4 3 2.7 2.2-2.1 3.6 3.4" />
    </>
  ),
  newspaper: (
    <>
      <path d="M5 5h12.5A1.5 1.5 0 0 1 19 6.5V19H6.5A1.5 1.5 0 0 1 5 17.5z" />
      <path d="M8 8h5M8 11h8M8 14h8M15.5 5v14" />
    </>
  ),
  theater: (
    <>
      <path d="M5 5c2 1 4 1 6 0v6.5c0 2-1.3 3.7-3 4.5-1.7-.8-3-2.5-3-4.5z" />
      <path d="M13 6.2c2 .7 4 .6 6-.2v6.5c0 2-1.3 3.7-3 4.5-.9-.4-1.7-1.1-2.2-2" />
      <path d="M7.2 9h.05M9.8 9h.05M7.2 12.2c.7.6 1.6.6 2.3 0" />
    </>
  ),
  sentence: (
    <>
      <path d="M4 7h16M4 12h11M4 17h16" />
      <path d="M18 10v4M16 12h4" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 13h3l9 4V7l-9 4H4z" />
      <path d="M7 13l1.2 5H11" />
      <path d="M19 9.5a4 4 0 0 1 0 5" />
    </>
  ),
  ear: (
    <>
      <path d="M8 10a4 4 0 1 1 7.6 1.8c-.7 1.4-2 2-2.7 3.1-.5.8-.6 1.7-1.3 2.3-1 .9-2.6.7-3.4-.3" />
      <path d="M10.5 10a1.6 1.6 0 1 1 3 1" />
    </>
  ),
  eye: (
    <>
      <path d="M3.5 12s3.2-5.5 8.5-5.5 8.5 5.5 8.5 5.5-3.2 5.5-8.5 5.5S3.5 12 3.5 12z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  road: (
    <>
      <path d="M8 21l2-18M16 21L14 3" />
      <path d="M12 6v2M12 11v2M12 16v2" />
    </>
  ),
  houses: (
    <>
      <path d="M3 11l5-4 5 4v9H3z" />
      <path d="M11 10l5-4 5 4v10h-8" />
      <path d="M7 20v-4h2v4M16 20v-4h2v4" />
    </>
  ),
  crown: (
    <>
      <path d="M5 18h14l1-10-5 4-3-7-3 7-5-4z" />
      <path d="M6 21h12" />
    </>
  ),
  backpack: (
    <>
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      <rect x="5" y="8" width="14" height="12" rx="3" />
      <path d="M8 14h8M9 17h6" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 10h.05M15.5 10h.05M8.5 14c1.7 2 5.3 2 7 0" />
    </>
  ),
  ball: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v5l4 3-1.5 4.7H9.5L8 11.5l4-3" />
      <path d="M4.4 9.5L8 11.5M19.6 9.5L16 11.5M7.8 18l1.7-1.8M16.2 18l-1.7-1.8" />
    </>
  ),
  plane: (
    <>
      <path d="M3.5 12l17-7-6 14-3-6z" />
      <path d="M20.5 5L11.5 13" />
    </>
  ),
  idCard: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M7 16c.5-1.2 1.2-2 2-2s1.5.8 2 2M13.5 10h3M13.5 14h3" />
    </>
  ),
  headphones: (
    <>
      <path d="M5 13v-1a7 7 0 0 1 14 0v1" />
      <rect x="3.8" y="12.5" width="3.8" height="6" rx="1.4" />
      <rect x="16.4" y="12.5" width="3.8" height="6" rx="1.4" />
    </>
  ),
  gamepad: (
    <>
      <rect x="3" y="9" width="18" height="8" rx="4" />
      <path d="M7 13h4M9 11v4" />
      <path d="M15.5 12h.05M18 14h.05" />
    </>
  ),
  shoppingBag: (
    <>
      <path d="M6 8h12l-1 12H7z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </>
  ),
  ballot: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="2" />
      <path d="M8 8V5h8v3M9 13l2 2 4-4" />
    </>
  ),
  dove: (
    <>
      <path d="M5 12c4.2-.2 6.8-2.2 8-6 2.5 1.2 3.2 3.8 1.8 5.8L20 12l-5.4 2.2C12.5 17 9 18.2 5 17" />
      <path d="M8 12c1.2 1.3 2.8 2 5 2.2" />
    </>
  ),
  recycle: (
    <>
      <path d="M9 5l2-2 2 3.5" />
      <path d="M13 6.5H8.8A3.5 3.5 0 0 0 5.8 12" />
      <path d="M19 13l.8 2.7-4 .3" />
      <path d="M15.8 16l2.1-3.6A3.5 3.5 0 0 0 13 8" />
      <path d="M6.2 17.2L3.5 16l2.3-3.3" />
      <path d="M5.8 12.7l2.1 3.6A3.5 3.5 0 0 0 14 16" />
    </>
  ),
  laptop: (
    <>
      <rect x="6" y="5" width="12" height="9" rx="1.5" />
      <path d="M3.5 18h17l-2.5-4H6z" />
    </>
  ),
  keyboard: (
    <>
      <rect x="3.5" y="7" width="17" height="10" rx="2" />
      <path d="M7 10h.05M10 10h.05M13 10h.05M16 10h.05M8.5 13.5h7" />
    </>
  ),
  folder: (
    <>
      <path d="M3.5 7h6l2 2h9v9.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
    </>
  ),
  monitor: (
    <>
      <rect x="4" y="5" width="16" height="11" rx="2" />
      <path d="M12 16v4M8.5 20h7" />
    </>
  ),
  robot: (
    <>
      <rect x="5" y="8" width="14" height="10" rx="2.5" />
      <path d="M12 8V4M9 4h6" />
      <path d="M9 12h.05M15 12h.05M9.5 15h5" />
    </>
  ),
  spreadsheet: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 9h16M4 14h16M10 4v16M15 4v16" />
    </>
  ),
  flame: (
    <>
      <path d="M12 21a6 6 0 0 0 6-6c0-3-2.2-5-4.4-7.2-.2 2-1.1 3.1-2.1 4.1C10.8 9 9.4 6.6 7 5c.4 3.2-1 4.8-1 7.8A6 6 0 0 0 12 21z" />
    </>
  ),
  gymnast: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7l-4 5 4 3 4-3z" />
      <path d="M8 12l-4 2M16 12l4 2M12 15l-3 5M12 15l3 5" />
    </>
  ),
  racket: (
    <>
      <ellipse cx="9" cy="8" rx="4" ry="5.2" transform="rotate(-30 9 8)" />
      <path d="M11.3 12.4l6.2 6.2M16 20l3-3" />
      <path d="M7 5.8l4 6.8M5.2 9.1l6.8-4" />
    </>
  ),
  volleyball: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5c2.5 2.3 3.4 5 2.7 8.2M14.7 11.7c-2.5-.5-5.2.2-8 2.1M14.7 11.7c1.8 1.5 3 3.2 3.7 5.2" />
    </>
  ),
  discus: (
    <>
      <ellipse cx="12" cy="14" rx="7.5" ry="3.5" />
      <path d="M8.5 7.5c1.8-2 4.8-2 6.8 0M9.5 10.5h5" />
    </>
  ),
  climber: (
    <>
      <path d="M5 20L15 4l4 16" />
      <circle cx="11" cy="8" r="1.8" />
      <path d="M11 10l-2 4 4 2M10 12l4-1.5M13 16l-1 4M9 14l-3 2" />
    </>
  ),
  wind: (
    <>
      <path d="M3 8h11a2 2 0 1 0-2-2" />
      <path d="M3 13h16a2 2 0 1 1-2 2" />
      <path d="M3 18h8" />
    </>
  ),
  rock: (
    <>
      <path d="M5 18l2-10 6-3 6 6-2 7z" />
      <path d="M7 8l5 4 1-7M12 12l5 6" />
    </>
  ),
  microbe: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
      <path d="M10.5 11h.05M13.5 13h.05" />
    </>
  ),
  lungs: (
    <>
      <path d="M12 4v8" />
      <path d="M12 10c-2.5-3-5-3-6.2-.8-1 1.8-1.5 5.2-1.2 8.3 3.6.2 6.1-2.2 7.4-5.5" />
      <path d="M12 10c2.5-3 5-3 6.2-.8 1 1.8 1.5 5.2 1.2 8.3-3.6.2-6.1-2.2-7.4-5.5" />
    </>
  ),
  baby: (
    <>
      <circle cx="12" cy="9" r="4.2" />
      <path d="M8 17c1-1.5 2.3-2.2 4-2.2s3 .7 4 2.2" />
      <path d="M9.5 9h.05M14.5 9h.05M10.5 11.5c.9.7 2.1.7 3 0" />
    </>
  ),
  medical: (
    <>
      <path d="M9 4v5H4v6h5v5h6v-5h5V9h-5V4z" />
    </>
  ),
  bow: (
    <>
      <path d="M6 4c4 2.5 4 13.5 0 16" />
      <path d="M6 12h12M15 9l3 3-3 3" />
    </>
  ),
  mosque: (
    <>
      <path d="M5 20V10a7 7 0 0 1 14 0v10" />
      <path d="M3 20h18M8 20v-5a4 4 0 0 1 8 0v5M12 3V1.8" />
    </>
  ),
  sailboat: (
    <>
      <path d="M12 3v13" />
      <path d="M12 5L5 16h7zM13 7l5 9h-5z" />
      <path d="M4 20c2 1 4 1 6 0s4-1 6 0 3 1 4 0" />
    </>
  ),
  sword: (
    <>
      <path d="M14 4l6 6-8 8-6-6z" />
      <path d="M4 20l4-4M6 14l4 4" />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="10" r="2" />
      <circle cx="12" cy="5.8" r="2" />
      <circle cx="8.3" cy="8" r="2" />
      <circle cx="15.7" cy="8" r="2" />
      <path d="M12 12v9M12 17c2.5 0 4.5-1.5 5-3.5M12 18c-2.5 0-4.5-1.5-5-3.5" />
    </>
  ),
  line: (
    <>
      <path d="M4 18L20 6" />
      <circle cx="7" cy="15.8" r="1.6" />
      <circle cx="17" cy="8.2" r="1.6" />
    </>
  ),
  texture: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M7 8h.05M11 8h.05M15 8h.05M9 12h.05M13 12h.05M17 12h.05M7 16h.05M11 16h.05M15 16h.05" />
    </>
  ),
  poster: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M8 8h8M8 12h5M8 16h8" />
      <circle cx="16" cy="12" r="1.5" />
    </>
  ),
  structure: (
    <>
      <path d="M4 20h16M6 20L12 4l6 16M8 14h8M10 9h4" />
    </>
  ),
  tools: (
    <>
      <path d="M14.5 5.5l4 4M13 7l4-4 4 4-4 4" />
      <path d="M10 14l-5 5M7 11l6 6" />
      <path d="M4 12l3-3 8 8-3 3z" />
    </>
  ),
  plug: (
    <>
      <path d="M9 7V3M15 7V3M7 7h10v5a5 5 0 0 1-10 0z" />
      <path d="M12 17v4" />
    </>
  ),
  antenna: (
    <>
      <path d="M12 20v-7" />
      <circle cx="12" cy="10" r="2" />
      <path d="M8 6a5.7 5.7 0 0 1 8 0M5 3a10 10 0 0 1 14 0" />
    </>
  ),
  factory: (
    <>
      <path d="M4 20V9l5 3V9l5 3V7h6v13z" />
      <path d="M7 16h2M12 16h2M17 16h1" />
    </>
  ),
  drum: (
    <>
      <ellipse cx="12" cy="8" rx="6" ry="3" />
      <path d="M6 8v7c0 1.7 2.7 3 6 3s6-1.3 6-3V8" />
      <path d="M7 3l10 4M17 3L7 7" />
    </>
  ),
  violin: (
    <>
      <path d="M12 4v16" />
      <path d="M9 8c-3 0-4 3-2 5-2 3 1 6 5 4 4 2 7-1 5-4 2-2 1-5-2-5" />
      <path d="M9 4h6M8 20h8" />
    </>
  ),
  piano: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M7 6v12M10 6v7M13 6v12M16 6v7" />
    </>
  ),
  scaleMusic: (
    <>
      <path d="M5 17c4-8 10-8 14-2" />
      <path d="M6 14h12M7 11h10" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="17" cy="15" r="1.5" />
    </>
  ),
  soundWave: (
    <>
      <path d="M5 12h2l2-4v8l2-8 2 8 2-4h4" />
    </>
  ),
  vowels: (
    <>
      <path d="M4 18l3-9 3 9M5.3 15h3.4" />
      <path d="M13 9h5M13 13.5h4M13 18h5" />
    </>
  ),
  syllables: (
    <>
      <rect x="3.5" y="6" width="7" height="5" rx="1.3" />
      <rect x="13.5" y="6" width="7" height="5" rx="1.3" />
      <rect x="8.5" y="14" width="7" height="5" rx="1.3" />
      <path d="M10.5 8.5h3M12 11v3" />
    </>
  ),
  caseLetters: (
    <>
      <path d="M4 18l3-10 3 10M5.3 15h3.4" />
      <path d="M14 11.5c2.5-1 5 .2 5 2.8V18M19 15.2h-2.7c-1.7 0-2.7.6-2.7 1.7 0 1 .9 1.5 2 1.5 1.6 0 3.4-1.2 3.4-3.2" />
    </>
  ),
  accentMark: (
    <>
      <path d="M12 5l2-2" />
      <path d="M7 18l3-9 3 9M8.3 15h3.4" />
      <path d="M16 18V9h3" />
    </>
  ),
  alphabetOrder: (
    <>
      <path d="M5 17l2.5-7 2.5 7M6 15h3" />
      <path d="M14 10v7h2.3a1.8 1.8 0 0 0 0-3.6H14h2a1.7 1.7 0 0 0 0-3.4z" />
      <path d="M4 5h16M17 3l3 2-3 2" />
    </>
  ),
  punctuation: (
    <>
      <path d="M8 8a3 3 0 1 1 3 3c-1.2 0-2 .8-2 2" />
      <path d="M9 17.5v.05" />
      <path d="M16 7v6M16 17.5v.05" />
    </>
  ),
  poem: (
    <>
      <path d="M6 5h8l4 4v10H6z" />
      <path d="M14 5v4h4" />
      <path d="M9 11h5M9 14h6M9 17h4" />
      <path d="M18 13c1.5 0 1.5 1.2 3 1.2" />
    </>
  ),
  story: (
    <>
      <path d="M5 5h10a3 3 0 0 1 3 3v11H8a3 3 0 0 1-3-3z" />
      <path d="M8.5 9h6M8.5 12h5" />
      <path d="M15 5v14" />
    </>
  ),
  speech: (
    <>
      <path d="M4 6h16v9H9l-5 4z" />
      <path d="M8 10h8M8 13h5" />
    </>
  ),
  hourglass: (
    <>
      <path d="M7 4h10M7 20h10M8 4c0 4 2.5 5.2 4 8-1.5 2.8-4 4-4 8M16 4c0 4-2.5 5.2-4 8 1.5 2.8 4 4 4 8" />
    </>
  ),
  routine: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8v4l3 1.8" />
      <path d="M5 5l2-2M19 5l-2-2M8 20l-1 1M16 20l1 1" />
    </>
  ),
  globeClock: (
    <>
      <circle cx="10.5" cy="12" r="7" />
      <path d="M3.5 12h14M10.5 5a11 11 0 0 1 0 14M10.5 5a11 11 0 0 0 0 14" />
      <path d="M17 15.5v3l2 1.2" />
      <circle cx="17" cy="18.5" r="4" />
    </>
  ),
  profession: (
    <>
      <circle cx="12" cy="7" r="2.6" />
      <path d="M7 21v-3a5 5 0 0 1 10 0v3" />
      <path d="M8 12.5h8M9 4.5h6" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="16" cy="8" r="2.5" />
      <circle cx="12" cy="13" r="2" />
      <path d="M4 20c.3-2.7 1.8-4.5 4-4.5M20 20c-.3-2.7-1.8-4.5-4-4.5M8.5 20c.2-2 1.5-3.2 3.5-3.2s3.3 1.2 3.5 3.2" />
    </>
  ),
  community: (
    <>
      <path d="M7 12l3 3 7-7" />
      <circle cx="6" cy="7" r="2" />
      <circle cx="18" cy="17" r="2" />
      <path d="M2.8 18c.2-2 1.4-3.2 3.2-3.2s3 1.2 3.2 3.2M14.8 8c.2-2 1.4-3.2 3.2-3.2S21 6 21.2 8" />
    </>
  ),
  envelope: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M5 8l7 5 7-5" />
    </>
  ),
  editCheck: (
    <>
      <path d="M5 19l1-3.5L15 6.5a2 2 0 0 1 3 3L9 18.5z" />
      <path d="M13.5 8l2.5 2.5" />
      <path d="M13.5 18l2 2 4-5" />
    </>
  ),
  textDoc: (
    <>
      <path d="M6 4h9l3 3v13H6z" />
      <path d="M15 4v4h3M9 11h6M9 14h6M9 17h4" />
    </>
  ),
  dictionary: (
    <>
      <path d="M6 4h11a2 2 0 0 1 2 2v14H8a3 3 0 0 1-3-3V5a1 1 0 0 1 1-1z" />
      <path d="M8 4v16" />
      <path d="M11 15l2-6 2 6M11.6 13h2.8" />
    </>
  ),
  verbAction: (
    <>
      <circle cx="9" cy="6" r="2" />
      <path d="M9 8l3 4 4-2M12 12l-2 4-4 3M12 12l3 7" />
      <path d="M16 6h4M18 4v4" />
    </>
  ),
} as const;

export type IconName = keyof typeof ICONS;
export const iconNames = Object.keys(ICONS) as IconName[];

export const SUBJECT_ICONS: Record<string, IconName> = {
  matematica: "math",
  portugues: "reading",
  "estudo-do-meio": "world",
  ingles: "language",
  mundo: "compass",
  estudo: "star",
  dicionario: "dictionary",
  verbos: "verbAction",
  paises: "map",
  cidadania: "heart",
  tic: "device",
  artistica: "palette",
  fisica: "body",
  ciencias: "microscope",
  hgp: "scroll",
  "ed-visual": "brush",
  "ed-tecnologica": "gear",
  "ed-musical": "music",
};

export const LESSON_ICONS: Record<string, IconName> = {
  "mat-1-numeros-10": "abacus", "mat-1-numeros-20": "abacus", "mat-1-somar": "plusminus",
  "mat-1-formas": "shapes", "mat-1-tempo": "clock", "mat-1-comparar": "compare",
  "mat-1-ordinais": "ordinal", "mat-1-dobro-metade": "fraction",
  "mat-2-tabuada": "times", "mat-2-numeros-100": "abacus", "mat-2-dinheiro": "coin",
  "mat-2-horas": "clock", "mat-2-tabuada-3-4-10": "times", "mat-2-par-impar": "abacus",
  "mat-2-solidos": "cube", "mat-2-padroes": "pattern",
  "mat-3-multiplicacao": "times", "mat-3-divisao": "divide", "mat-3-fracoes": "fraction",
  "mat-3-medida": "ruler", "mat-3-numeros-1000": "abacus", "mat-3-multiplos": "times",
  "mat-3-calendario": "calendar", "mat-4-decimais": "abacus", "mat-4-area": "area",
  "mat-4-dados": "chart", "mat-4-problemas": "puzzle", "mat-4-numeros-milhao": "abacus",
  "mat-4-fracoes-decimais": "fraction", "mat-4-angulos": "ruler", "mat-4-volume": "cube",
  "estudo-tabuadas": "times", "estudo-alfabeto": "letters", "estudo-numeros": "abacus",
  "estudo-dias-meses": "calendar", "estudo-dinheiro": "coin", "estudo-loja": "cart",
  "estudo-pontuacao": "punctuation", "estudo-classes": "tag", "estudo-verbos": "hourglass",
  "estudo-formas": "shapes", "estudo-medidas": "ruler", "estudo-formulas": "math",
  "estudo-romanos": "scroll", "estudo-planetas": "planet", "estudo-continentes": "world",
  "estudo-pontos-cardeais": "compass", "estudo-datas": "castle", "estudo-distritos": "map",
  "pt-1-vogais": "vowels", "pt-1-silabas": "syllables", "pt-1-primeiras-palavras": "textDoc",
  "pt-1-rimas": "poem", "pt-1-maiusculas": "caseLetters", "pt-1-ler-frases": "reading",
  "pt-1-ditongos": "soundWave", "pt-1-ouvir-falar": "speech", "pt-1-contos": "reading",
  "pt-2-pontuacao": "punctuation", "pt-2-nome-verbo": "tag", "pt-2-singular-plural": "caseLetters",
  "pt-2-tipos-frase": "punctuation", "pt-2-silaba-tonica": "accentMark", "pt-2-ordem-alfabetica": "alphabetOrder",
  "pt-2-recontar": "story", "pt-2-poemas": "poem", "pt-3-sinonimos": "compare",
  "pt-3-familia-palavras": "tag", "pt-3-texto": "textDoc", "pt-3-tempos-verbais": "hourglass",
  "pt-3-leitura-compreensao": "reading", "pt-3-discurso-direto": "quote",
  "pt-3-aumentativo-diminutivo": "caseLetters", "pt-3-fabulas": "paw", "pt-3-falar-publico": "speaker",
  "pt-4-classes": "tag", "pt-4-tipos-texto": "textDoc", "pt-4-acentos": "accentMark",
  "pt-4-graus-adjetivo": "compare", "pt-4-carta": "envelope", "pt-4-adverbios": "tag",
  "pt-4-sujeito-predicado": "sentence", "pt-4-autores": "reading", "pt-4-debater": "megaphone",
  "edm-1-corpo": "body", "edm-1-dias": "calendar", "edm-1-familia": "family",
  "edm-1-higiene": "medical", "edm-1-sentidos": "eye", "edm-1-seguranca": "shield",
  "edm-2-estacoes": "cloud", "edm-2-animais": "paw", "edm-2-agua": "drop",
  "edm-2-seres-vivos": "plant", "edm-2-profissoes": "profession",
  "edm-3-plantas": "plant", "edm-3-portugal": "flag", "edm-3-solidos-liquidos": "flask",
  "edm-3-alimentacao": "apple", "edm-3-eletricidade": "bolt",
  "edm-4-sistema-solar": "planet", "edm-4-corpo-sistemas": "heart", "edm-4-historia": "castle",
  "edm-4-ambiente": "recycle", "edm-4-mapas": "compass",
  "en-1-hello": "wave", "en-1-colours": "palette", "en-1-numbers": "abacus",
  "en-1-numbers-20": "abacus", "en-2-animals": "paw", "en-2-body": "body",
  "en-2-family": "family", "en-2-food": "apple", "en-3-food": "apple",
  "en-3-toys": "teddy", "en-3-clothes": "shirt", "en-3-house": "home",
  "en-4-days": "calendar", "en-4-weather": "cloud", "en-4-time": "clock", "en-4-jobs": "idCard",
  "mundo-1-acores": "island", "mundo-1-vulcoes": "planet", "mundo-1-mar": "wave2",
  "mundo-1-ilha": "island", "mundo-1-lendas": "story", "mundo-1-simbolos": "flag",
  "mundo-2-portugal": "flag", "mundo-2-regioes": "map", "mundo-2-comidas": "apple",
  "mundo-2-simbolos": "flag", "mundo-2-rios": "wave2", "mundo-3-europa": "flag",
  "mundo-3-atlantico": "wave2", "mundo-3-descobrimentos": "sailboat",
  "mundo-3-vizinhos": "community", "mundo-3-animais-oceano": "wave2",
  "mundo-4-continentes": "world", "mundo-4-fusos": "globeClock", "mundo-4-maravilhas": "landmark",
  "mundo-4-animais": "paw", "mundo-4-bandeiras": "flag",
  "paises-pt-pais": "map", "paises-pt-bandeira": "flag", "paises-pt-hino": "music",
  "paises-pt-comida": "apple", "paises-pt-natureza": "paw", "paises-pt-curiosidades": "sparkle",
  "paises-ca-pais": "map", "paises-ca-bandeira": "flag", "paises-ca-hino": "music",
  "paises-ca-comida": "apple", "paises-ca-natureza": "paw", "paises-ca-curiosidades": "sparkle",
  "cid-1-direitos": "tag", "cid-1-reciclar": "plant", "cid-1-diferentes": "people",
  "cid-2-emocoes": "heart", "cid-2-poupar": "coin", "cid-2-ajudar": "community",
  "cid-3-internet": "lock", "cid-3-igualdade": "compare", "cid-3-consumir": "shoppingBag",
  "cid-4-sustentavel": "recycle", "cid-4-democracia": "ballot", "cid-4-saude": "heart",
  "art-1-cores": "palette", "art-1-linhas": "pencil", "art-1-sons": "speaker",
  "art-2-misturar": "palette", "art-2-instrumentos": "speaker", "art-2-faz-de-conta": "teddy",
  "art-3-tecnicas": "pencil", "art-3-ritmo": "drum", "art-3-danca": "gymnast",
  "art-4-pintores": "palette", "art-4-compositores": "music", "art-4-dancas-mundo": "world",
  "ef-1-mexer": "body", "ef-1-aquecer": "heart", "ef-1-jogos": "ball",
  "ef-2-equilibrio": "gymnast", "ef-2-tradicionais": "teddy", "ef-2-desportivismo": "dove",
  "ef-3-desportos": "trophy", "ef-3-corpo": "heart", "ef-3-ginastica": "gymnast",
  "ef-4-olimpicos": "trophy", "ef-4-vida-ativa": "heart", "ef-4-seguranca": "shield",
  "mat-2-simetria": "symmetry", "mat-2-problemas": "puzzle", "mat-3-dados": "clipboard",
  "mat-3-romanos": "landmark", "mat-4-estimar": "target", "mat-4-contas-armadas": "calculator",
  "mat-4-calculo-mental": "brain", "mat-5-naturais": "abacus", "mat-5-mdc-mmc": "chain",
  "mat-5-fracoes": "fraction", "mat-5-decimais": "abacus", "mat-5-potencias": "power",
  "mat-5-angulos-poligonos": "polygon", "mat-5-area-perimetro": "area", "mat-5-solidos": "cube",
  "mat-5-dados": "chart", "mat-5-problemas-varios-passos": "puzzle", "mat-5-dados-a-mais": "search",
  "mat-6-inteiros": "numberLine", "mat-6-fracoes-operacoes": "fraction", "mat-6-potencias": "power",
  "mat-6-proporcionalidade": "compare", "mat-6-percentagens": "percent", "mat-6-equacoes": "equation",
  "mat-6-circulo": "circle", "mat-6-volumes": "cube", "mat-6-graficos": "chart",
  "pt-1-masculino-feminino": "family", "pt-1-palavras-dia": "folder", "pt-2-ler-expressao": "theater",
  "pt-2-digrafos": "chain", "pt-2-adjetivos": "palette", "pt-2-artigos": "tag",
  "pt-3-sons-do-s": "soundWave", "pt-3-pronomes": "idCard", "pt-3-homofonos": "theater",
  "pt-4-prefixos-sufixos": "blocks", "pt-4-frase-complexa": "sentence", "pt-4-noticia": "newspaper",
  "pt-4-hifen-x": "times", "pt-4-planear-texto": "clipboard", "pt-4-conectores": "chain",
  "pt-4-rever-texto": "editCheck", "pt-4-revisao-ortografica": "check", "pt-5-oralidade": "megaphone",
  "pt-5-narrativo-ler": "reading", "pt-5-narrativo-escrever": "textDoc", "pt-5-classes": "tag",
  "pt-5-verbos": "hourglass", "pt-5-funcoes": "sentence", "pt-5-ortografia": "accentMark",
  "pt-5-resumo": "scissors", "pt-5-descrever": "image", "pt-5-poesia": "poem",
  "pt-5-literaria": "reading", "pt-6-descritivo": "image", "pt-6-noticia-entrevista": "newspaper",
  "pt-6-classes": "tag", "pt-6-sintaxe": "sentence", "pt-6-verbos": "hourglass",
  "pt-6-grau-nome": "caseLetters", "pt-6-teatro": "theater", "pt-6-recursos": "poem",
  "pt-6-literaria": "reading",
  "edm-2-localidade": "houses", "edm-3-experiencias": "microscope", "edm-3-seguranca-rodoviaria": "road",
  "edm-4-mapa-localidade": "map", "edm-4-freguesia-municipio": "houses", "edm-4-relevo-clima": "mountain",
  "edm-4-reis-dinastias": "crown",
  "en-1-classroom": "backpack", "en-1-feelings": "smile", "en-2-sports": "ball",
  "en-2-nature": "plant", "en-3-routines": "routine", "en-3-directions": "compass",
  "en-4-comparatives": "compare", "en-4-travel": "plane", "en-5-greetings": "wave",
  "en-5-personal": "idCard", "en-5-family": "family", "en-5-school": "backpack",
  "en-5-routines": "routine", "en-5-present-simple": "refresh", "en-5-dialogues-listening": "headphones",
  "en-5-guided-writing": "textDoc", "en-5-hobbies": "gamepad", "en-5-food": "apple",
  "en-6-present-continuous": "body", "en-6-past-simple": "back", "en-6-town": "houses",
  "en-6-travel": "plane", "en-6-comparatives": "compare", "en-6-shopping": "shoppingBag",
  "en-6-health": "medical", "en-6-questions-answers": "punctuation", "en-6-future": "target",
  "cid-1-regras-sala": "dove", "cid-3-bullying": "shield", "cid-4-participar-turma": "ballot",
  "cid-5-direitos-humanos": "dove", "cid-5-igualdade": "compare", "cid-5-intercultural": "world",
  "cid-5-democracia-instituicoes": "landmark", "cid-5-saude": "heart", "cid-5-ambiente": "recycle",
  "cid-6-financeira": "coin", "cid-6-protecao": "shield", "cid-6-voluntariado": "community",
  "cid-6-sustentavel": "recycle",
  "tic-1-ecras": "laptop", "tic-2-rato-teclado": "keyboard", "tic-3-internet": "lock",
  "tic-4-computador-ficheiros": "folder", "tic-4-escrever-formatar": "textDoc", "tic-5-pesquisa": "search",
  "tic-5-apresentacoes": "monitor", "tic-5-email": "envelope", "tic-5-direitos-autor": "image",
  "tic-5-organizar-projeto": "folder", "tic-6-media": "device", "tic-6-privacidade": "lock",
  "tic-6-programacao": "robot", "tic-6-algoritmos": "puzzle", "tic-6-folha-calculo": "spreadsheet",
  "ef-5-aptidao": "flame", "ef-5-ginastica": "gymnast", "ef-5-coletivos": "ball",
  "ef-5-atletismo": "body", "ef-5-raquetas": "racket", "ef-5-fairplay": "dove",
  "ef-6-condicao": "heart", "ef-6-aparelhos": "gymnast", "ef-6-voleibol": "volleyball",
  "ef-6-atletismo": "discus", "ef-6-danca": "gymnast", "ef-6-natureza": "climber",
  "cn-5-agua": "drop", "cn-5-ar": "wind", "cn-5-rochas-solo": "rock",
  "cn-5-animais-diversidade": "paw", "cn-5-animais-funcoes": "body", "cn-5-plantas": "plant",
  "cn-5-ecossistemas": "recycle", "cn-6-microorganismos": "microbe", "cn-6-digestivo": "apple",
  "cn-6-respiratorio": "lungs", "cn-6-circulatorio": "heart", "cn-6-excretor": "drop",
  "cn-6-reproducao": "baby", "cn-6-saude": "medical", "cn-6-mapa-sistemas": "body",
  "hgp-5-primeiros-povos": "bow", "hgp-5-romanos": "landmark", "hgp-5-muculmanos": "mosque",
  "hgp-5-formacao": "shield", "hgp-5-consolidacao": "crown", "hgp-5-crise-1383": "sword",
  "hgp-5-sociedade": "castle", "hgp-6-descobrimentos": "sailboat", "hgp-6-imperio": "world",
  "hgp-6-restauracao": "crown", "hgp-6-dinastias": "crown", "hgp-6-reis-monumentos": "castle",
  "hgp-6-pombal": "landmark", "hgp-6-liberalismo": "scroll", "hgp-6-republica": "flag",
  "hgp-6-estado-novo": "flower", "hgp-6-democracia": "ballot",
  "ev-5-ponto-linha": "line", "ev-5-cor": "palette", "ev-5-formas": "shapes",
  "ev-5-textura": "texture", "ev-5-comunicacao": "megaphone", "ev-5-geometria": "ruler",
  "ev-6-luz-sombra": "sun", "ev-6-volume": "cube", "ev-6-padrao": "pattern",
  "ev-6-cor-harmonias": "palette", "ev-6-perspetiva": "eye", "ev-6-design": "poster",
  "ev-6-patrimonio": "landmark",
  "et-5-o-que-e": "gear", "et-5-materiais": "tools", "et-5-medicao": "ruler",
  "et-5-seguranca": "shield", "et-5-estruturas": "structure", "et-5-projeto": "tools",
  "et-6-mecanismos": "gear", "et-6-energia": "bolt", "et-6-eletricidade": "plug",
  "et-6-reciclar": "recycle", "et-6-comunicacao": "antenna", "et-6-projeto-tecnico": "ruler",
  "et-6-fabrico": "factory",
  "em-5-som-silencio": "soundWave", "em-5-ritmo": "drum", "em-5-melodia": "music",
  "em-5-notas": "scaleMusic", "em-5-dinamica": "megaphone", "em-5-instrumentos": "violin",
  "em-6-forma": "pattern", "em-6-escala": "scaleMusic", "em-6-harmonia": "piano",
  "em-6-generos": "music", "em-6-portuguesa": "flag", "em-6-criar": "sparkle",
  "estudo-contas": "calculator", "estudo-silabas-p": "syllables", "estudo-silabas-faceis": "syllables",
  "estudo-juntar-palavras": "puzzle", "estudo-leitura-rapida": "arrowRight", "estudo-testes-leitura": "target",
  "estudo-relogio": "clock",
  "dic-a": "dictionary", "dic-b": "dictionary", "dic-c": "dictionary", "dic-d": "dictionary",
  "dic-e": "dictionary", "dic-f": "dictionary", "dic-g": "dictionary", "dic-h": "dictionary",
  "dic-i": "dictionary", "dic-j": "dictionary", "dic-k": "dictionary", "dic-l": "dictionary",
  "dic-m": "dictionary", "dic-n": "dictionary", "dic-o": "dictionary", "dic-p": "dictionary",
  "dic-q": "dictionary", "dic-r": "dictionary", "dic-s": "dictionary", "dic-t": "dictionary",
  "dic-u": "dictionary", "dic-v": "dictionary", "dic-w": "dictionary", "dic-x": "dictionary",
  "dic-y": "dictionary", "dic-z": "dictionary",
  "verb-a": "verbAction", "verb-b": "verbAction", "verb-c": "verbAction", "verb-d": "verbAction",
  "verb-e": "verbAction", "verb-f": "verbAction", "verb-g": "verbAction", "verb-h": "verbAction",
  "verb-i": "verbAction", "verb-j": "verbAction", "verb-l": "verbAction", "verb-m": "verbAction",
  "verb-n": "verbAction", "verb-o": "verbAction", "verb-p": "verbAction", "verb-q": "verbAction",
  "verb-r": "verbAction", "verb-s": "verbAction", "verb-t": "verbAction", "verb-u": "verbAction",
  "verb-v": "verbAction", "verb-z": "verbAction",
};

export function subjectIconName(subjectId: string, fallback: IconName = "reading"): IconName {
  return SUBJECT_ICONS[subjectId] ?? fallback;
}

export function lessonIconName(subjectId: string, lessonId: string): IconName {
  return LESSON_ICONS[lessonId] ?? subjectIconName(subjectId);
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number | string;
}

export function Icon({ name, size = 24, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {ICONS[name]}
    </svg>
  );
}
