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
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.6v3M12 18.4v3M21.4 12h-3M5.6 12h-3M18.6 5.4l-2.1 2.1M7.5 16.5l-2.1 2.1M18.6 18.6l-2.1-2.1M7.5 7.5 5.4 5.4" />
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
} as const;

export type IconName = keyof typeof ICONS;
export const iconNames = Object.keys(ICONS) as IconName[];

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
