import type { ReactNode } from "react";

/* The Sprout shop's goods — toys, food and a few pricey gadgets a child actually
 * wants — each with a hand-drawn, colourful SVG. Kept apart from the Shop
 * widget's logic so the catalogue reads as plain data. Most prices carry real
 * cents (e.g. 10,66 €), so the child practises paying odd amounts — the till
 * offers 1c and 2c coins too, so any total can still be paid exactly (and any
 * change made) with euro coins. The "tecnologia" shelf climbs into the hundreds,
 * so the till's big notes (100€, 200€, 500€) finally get used.
 *
 * Every drawing lives on a 0–48 canvas; the Shop wraps it in one <svg>. */

export type ShopCat = "brinquedo" | "comida" | "tecnologia";

export interface ShopProduct {
  id: string; // also the key into PRODUCT_ART
  name: string; // pt-PT, read aloud
  price: number; // euros
  cat: ShopCat;
}

/* ---- the artwork: one entry per product, drawn inside a 48×48 box ---- */
export const PRODUCT_ART: Record<string, ReactNode> = {
  // ---------------- brinquedos ----------------
  bola: (
    <>
      <circle cx="24" cy="24" r="15" fill="#ff6b6b" />
      <path d="M9 24h30M24 9v30" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="24" r="4" fill="#fff" />
    </>
  ),
  urso: (
    <>
      <circle cx="14" cy="13" r="5" fill="#b5835a" />
      <circle cx="34" cy="13" r="5" fill="#b5835a" />
      <circle cx="24" cy="26" r="15" fill="#c89368" />
      <circle cx="24" cy="29" r="6" fill="#e8c9a8" />
      <circle cx="18" cy="23" r="2" fill="#3a2a1a" />
      <circle cx="30" cy="23" r="2" fill="#3a2a1a" />
      <circle cx="24" cy="27" r="2" fill="#3a2a1a" />
    </>
  ),
  carro: (
    <>
      <rect x="6" y="22" width="36" height="11" rx="4" fill="#ff922b" />
      <path d="M14 22l5-7h10l5 7z" fill="#ffd43b" />
      <rect x="19" y="16" width="10" height="6" rx="2" fill="#74c0fc" />
      <circle cx="16" cy="34" r="4" fill="#343a40" />
      <circle cx="32" cy="34" r="4" fill="#343a40" />
    </>
  ),
  boneca: (
    <>
      <circle cx="13" cy="14" r="4" fill="#e8a33d" />
      <circle cx="35" cy="14" r="4" fill="#e8a33d" />
      <circle cx="24" cy="14" r="8" fill="#ffe0bd" />
      <path d="M16 12a8 8 0 0 1 16 0z" fill="#8b5a2b" />
      <circle cx="21" cy="15" r="1.5" fill="#3a2a1a" />
      <circle cx="27" cy="15" r="1.5" fill="#3a2a1a" />
      <path d="M24 22l10 18H14z" fill="#ff8fab" />
    </>
  ),
  blocos: (
    <>
      <rect x="8" y="26" width="14" height="14" rx="2" fill="#ff6b6b" />
      <rect x="26" y="26" width="14" height="14" rx="2" fill="#4dabf7" />
      <rect x="17" y="11" width="14" height="14" rx="2" fill="#ffd43b" />
      <circle cx="12" cy="25" r="1.6" fill="#e0484a" />
      <circle cx="18" cy="25" r="1.6" fill="#e0484a" />
      <circle cx="21" cy="10" r="1.6" fill="#e6b800" />
      <circle cx="27" cy="10" r="1.6" fill="#e6b800" />
    </>
  ),
  piao: (
    <>
      <path d="M13 15h22l-11 14z" fill="#ff6b6b" />
      <path d="M13 15h22" stroke="#fff" strokeWidth="2" />
      <circle cx="24" cy="19" r="3" fill="#fff" />
      <rect x="22" y="7" width="4" height="9" rx="2" fill="#ffd43b" />
      <path d="M24 29v8" stroke="#8b5a2b" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  balao: (
    <>
      <ellipse cx="24" cy="18" rx="11" ry="13" fill="#ff6b6b" />
      <path d="M24 31l-2.5 4h5z" fill="#ff6b6b" />
      <path d="M24 35c0 4 4 4 4 8" stroke="#adb5bd" strokeWidth="1.5" fill="none" />
      <ellipse cx="20" cy="13" rx="3" ry="4" fill="#fff" opacity="0.5" />
    </>
  ),
  papagaio: (
    <>
      <path d="M24 6l12 14-12 16-12-16z" fill="#4dabf7" />
      <path d="M24 6v30M12 20h24" stroke="#fff" strokeWidth="1.5" />
      <path d="M24 36c-2 3-6 4-8 8" stroke="#adb5bd" strokeWidth="1.2" fill="none" />
      <path d="M16 41l3-1 1 3" fill="#ffd43b" />
    </>
  ),
  bicicleta: (
    <>
      <circle cx="13" cy="31" r="8" fill="none" stroke="#343a40" strokeWidth="2.5" />
      <circle cx="35" cy="31" r="8" fill="none" stroke="#343a40" strokeWidth="2.5" />
      <path d="M13 31l9-13h8M24 18l-4 13M35 31l-9-12" stroke="#ff6b6b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M28 16h5" stroke="#343a40" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  comboio: (
    <>
      <rect x="6" y="20" width="20" height="14" rx="3" fill="#ff6b6b" />
      <rect x="28" y="13" width="14" height="21" rx="3" fill="#4dabf7" />
      <rect x="32" y="18" width="6" height="6" rx="1" fill="#fff" />
      <rect x="33" y="7" width="4" height="6" rx="1" fill="#868e96" />
      <circle cx="12" cy="37" r="3" fill="#343a40" />
      <circle cx="22" cy="37" r="3" fill="#343a40" />
      <circle cx="35" cy="37" r="3" fill="#343a40" />
    </>
  ),
  aviao: (
    <>
      <path d="M6 28l34-13-7 17-9-2-6 8-2-1 2-7z" fill="#4dabf7" />
      <circle cx="29" cy="21" r="2" fill="#fff" />
    </>
  ),
  robo: (
    <>
      <rect x="12" y="14" width="24" height="22" rx="4" fill="#adb5bd" />
      <rect x="16" y="19" width="16" height="9" rx="2" fill="#343a40" />
      <circle cx="20" cy="23.5" r="2" fill="#69db7c" />
      <circle cx="28" cy="23.5" r="2" fill="#69db7c" />
      <path d="M24 14v-4" stroke="#868e96" strokeWidth="2" />
      <circle cx="24" cy="8" r="2.5" fill="#ff6b6b" />
      <rect x="18" y="31" width="12" height="3" rx="1.5" fill="#495057" />
    </>
  ),
  puzzle: (
    <path d="M14 14h7a3 3 0 0 1 6 0h7v7a3 3 0 0 1 0 6v7h-7a3 3 0 0 0-6 0h-7v-7a3 3 0 0 0 0-6z" fill="#cc5de8" />
  ),
  dinossauro: (
    <>
      <path d="M10 34c0-10 6-16 14-16 7 0 10 4 10 4l3-5 1 6-2 2c1 3 1 6 1 9z" fill="#69db7c" />
      <path d="M16 20l2-4 2 4 2-4 2 4" fill="#40c057" />
      <path d="M12 34v4M18 34v4M30 34v4M36 34v4" stroke="#51cf66" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="31" cy="22" r="1.6" fill="#1b5e20" />
    </>
  ),
  foguetao: (
    <>
      <path d="M24 6c6 4 8 12 8 18l-3 6h-10l-3-6c0-6 2-14 8-18z" fill="#ff6b6b" />
      <circle cx="24" cy="18" r="3" fill="#74c0fc" />
      <path d="M19 30l-5 6 5-1zM29 30l5 6-5-1z" fill="#fab005" />
      <path d="M21 36h6l-3 6z" fill="#ffd43b" />
    </>
  ),
  tambor: (
    <>
      <path d="M10 16v14a14 5 0 0 0 28 0V16" fill="#ff6b6b" />
      <ellipse cx="24" cy="16" rx="14" ry="5" fill="#ffe066" />
      <path d="M11 18l26 11M37 18L11 29" stroke="#fff" strokeWidth="1.5" />
      <path d="M30 7l4 7M18 7l-4 7" stroke="#8b5a2b" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="7" r="2" fill="#8b5a2b" />
      <circle cx="18" cy="7" r="2" fill="#8b5a2b" />
    </>
  ),
  guitarra: (
    <>
      <path d="M34 10l4 4-12 12 .5 2a7 7 0 1 1-4-4l2 .5 12-12z" fill="#e8590c" />
      <circle cx="18" cy="30" r="3" fill="#3a2a1a" />
      <path d="M30 14l4 4" stroke="#fff" strokeWidth="1.5" />
    </>
  ),
  cubo: (
    <>
      <rect x="12" y="12" width="24" height="24" rx="3" fill="#343a40" />
      <rect x="14" y="14" width="6" height="6" rx="1" fill="#ff6b6b" />
      <rect x="21" y="14" width="6" height="6" rx="1" fill="#ffd43b" />
      <rect x="28" y="14" width="6" height="6" rx="1" fill="#69db7c" />
      <rect x="14" y="21" width="6" height="6" rx="1" fill="#74c0fc" />
      <rect x="21" y="21" width="6" height="6" rx="1" fill="#ff922b" />
      <rect x="28" y="21" width="6" height="6" rx="1" fill="#fff" />
      <rect x="14" y="28" width="6" height="6" rx="1" fill="#69db7c" />
      <rect x="21" y="28" width="6" height="6" rx="1" fill="#ff6b6b" />
      <rect x="28" y="28" width="6" height="6" rx="1" fill="#ffd43b" />
    </>
  ),
  ioio: (
    <>
      <path d="M24 8v17" stroke="#adb5bd" strokeWidth="2" />
      <circle cx="24" cy="8" r="2" fill="#868e96" />
      <circle cx="24" cy="28" r="11" fill="#ff6b6b" />
      <circle cx="24" cy="28" r="3" fill="#fff" />
    </>
  ),
  berlindes: (
    <>
      <circle cx="17" cy="28" r="8" fill="#4dabf7" />
      <circle cx="32" cy="24" r="7" fill="#ff6b6b" />
      <circle cx="27" cy="34" r="5" fill="#69db7c" />
      <circle cx="14" cy="25" r="2.5" fill="#fff" opacity="0.6" />
      <circle cx="29" cy="21" r="2" fill="#fff" opacity="0.6" />
    </>
  ),
  corda: (
    <>
      <path d="M12 12c-6 6-6 24 4 24s10-18 16-18 6 12 0 12" fill="none" stroke="#ff6b6b" strokeWidth="3" strokeLinecap="round" />
      <rect x="6" y="10" width="4" height="9" rx="2" fill="#fab005" />
      <rect x="30" y="28" width="4" height="9" rx="2" fill="#fab005" />
    </>
  ),
  barco: (
    <>
      <rect x="22.5" y="6" width="2" height="20" fill="#8b5a2b" />
      <path d="M24.5 7l9 17h-9z" fill="#ff6b6b" />
      <path d="M22 9L13 24h9z" fill="#fff" />
      <path d="M8 28h32l-4 8H12z" fill="#4dabf7" />
    </>
  ),
  patins: (
    <>
      <path d="M12 12h6v12h16a4 4 0 0 1 4 4v3H12z" fill="#ff6b6b" />
      <path d="M12 14h6" stroke="#fff" strokeWidth="1.5" />
      <circle cx="17" cy="35" r="3" fill="#343a40" />
      <circle cx="26" cy="35" r="3" fill="#343a40" />
      <circle cx="35" cy="35" r="3" fill="#343a40" />
    </>
  ),
  livro: (
    <>
      <path d="M8 12c5-3 11-3 16 0v24c-5-3-11-3-16 0z" fill="#ff6b6b" />
      <path d="M40 12c-5-3-11-3-16 0v24c5-3 11-3 16 0z" fill="#4dabf7" />
      <path d="M24 12v24" stroke="#fff" strokeWidth="1.5" />
      <path d="M12 18h8M12 22h8M28 18h8M28 22h8" stroke="#fff" strokeWidth="1" opacity="0.7" />
    </>
  ),

  // ---------------- brinquedos grandes (acima de 45€) ----------------
  trotinete: (
    <>
      <circle cx="12" cy="37" r="5" fill="none" stroke="#343a40" strokeWidth="3" />
      <circle cx="34" cy="37" r="5" fill="none" stroke="#343a40" strokeWidth="3" />
      <path d="M12 37h22" stroke="#ff6b6b" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M34 37V13" stroke="#4dabf7" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M27 13h12" stroke="#343a40" strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),
  carrorc: (
    <>
      <rect x="6" y="25" width="36" height="9" rx="4" fill="#ff6b6b" />
      <path d="M13 25l4-6h12l5 6z" fill="#fa5252" />
      <rect x="19" y="20" width="9" height="5" rx="1.5" fill="#74c0fc" />
      <circle cx="15" cy="35" r="4" fill="#343a40" />
      <circle cx="33" cy="35" r="4" fill="#343a40" />
      <path d="M41 25V15" stroke="#868e96" strokeWidth="2" strokeLinecap="round" />
      <circle cx="41" cy="13" r="2.2" fill="#ffd43b" />
    </>
  ),
  consola: (
    <>
      <rect x="7" y="19" width="34" height="15" rx="7.5" fill="#495057" />
      <circle cx="15" cy="26.5" r="4" fill="#adb5bd" />
      <path d="M15 24v5M12.5 26.5h5" stroke="#343a40" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="26.5" cy="27" r="2.2" fill="#ffd43b" />
      <circle cx="31" cy="23" r="2.2" fill="#69db7c" />
      <circle cx="31" cy="31" r="2.2" fill="#4dabf7" />
      <circle cx="35.5" cy="27" r="2.2" fill="#ff6b6b" />
    </>
  ),
  casinha: (
    <>
      <rect x="13" y="23" width="22" height="17" fill="#ffe0bd" />
      <path d="M10 24L24 12l14 12z" fill="#ff6b6b" />
      <rect x="21" y="31" width="6" height="9" rx="1" fill="#8b5a2b" />
      <rect x="16" y="27" width="5" height="5" rx="1" fill="#74c0fc" />
      <rect x="27" y="27" width="5" height="5" rx="1" fill="#74c0fc" />
    </>
  ),
  trampolim: (
    <>
      <ellipse cx="24" cy="18" rx="18" ry="6" fill="#4dabf7" />
      <ellipse cx="24" cy="18" rx="13" ry="3.6" fill="#243b53" />
      <path d="M8 20L5 38M40 20l3 18M24 21v17" stroke="#868e96" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 21q18 9 36 0" stroke="#74c0fc" strokeWidth="1.5" fill="none" opacity="0.6" />
    </>
  ),

  // ---------------- comida ----------------
  maca: (
    <>
      <path d="M24 15c-3-3-10-3-11 4-1 8 5 16 11 16s12-8 11-16c-1-7-8-7-11-4z" fill="#ff6b6b" />
      <path d="M24 15c0-4 3-6 6-6" fill="none" stroke="#8b5a2b" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 10c3-2 6-1 6-1s-1 4-4 4z" fill="#69db7c" />
    </>
  ),
  banana: (
    <>
      <path d="M14 12c0 16 10 24 22 22 1 0 1-2 0-3-9 0-17-8-17-20 0-2-5-2-5 1z" fill="#ffd43b" />
      <path d="M36 31l2 3" stroke="#caa90a" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  morango: (
    <>
      <path d="M24 16c8 0 12 4 12 10s-6 12-12 12-12-6-12-12 4-10 12-10z" fill="#ff6b6b" />
      <path d="M18 14h12l-6 5z" fill="#69db7c" />
      <circle cx="20" cy="24" r="1" fill="#ffe066" />
      <circle cx="28" cy="24" r="1" fill="#ffe066" />
      <circle cx="24" cy="30" r="1" fill="#ffe066" />
      <circle cx="18" cy="30" r="1" fill="#ffe066" />
      <circle cx="30" cy="30" r="1" fill="#ffe066" />
    </>
  ),
  laranja: (
    <>
      <circle cx="24" cy="27" r="14" fill="#ff922b" />
      <circle cx="19" cy="22" r="3" fill="#ffa94d" opacity="0.7" />
      <path d="M22 12c1-3 5-3 6 0z" fill="#69db7c" />
    </>
  ),
  uvas: (
    <>
      <path d="M24 12c0-3 3-4 5-4" stroke="#69db7c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="24" cy="16" r="4" fill="#9775fa" />
      <circle cx="18" cy="22" r="4" fill="#9775fa" />
      <circle cx="30" cy="22" r="4" fill="#9775fa" />
      <circle cx="21" cy="29" r="4" fill="#9775fa" />
      <circle cx="27" cy="29" r="4" fill="#9775fa" />
      <circle cx="24" cy="35" r="4" fill="#9775fa" />
    </>
  ),
  melancia: (
    <>
      <path d="M8 16h32a16 16 0 0 1-32 0z" fill="#69db7c" />
      <path d="M11 17h26a13 13 0 0 1-26 0z" fill="#fff" />
      <path d="M13 18h22a11 11 0 0 1-22 0z" fill="#ff6b6b" />
      <circle cx="20" cy="22" r="1.2" fill="#343a40" />
      <circle cx="26" cy="22" r="1.2" fill="#343a40" />
      <circle cx="23" cy="26" r="1.2" fill="#343a40" />
    </>
  ),
  cenoura: (
    <>
      <path d="M24 40L14 18c5-4 15-4 20 0z" fill="#ff922b" />
      <path d="M24 18l-3-8M24 18v-9M24 18l3-8" stroke="#69db7c" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M19 25l3 1M21 31l3 1" stroke="#e8590c" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  brocolos: (
    <>
      <path d="M16 22h16l-2 14H18z" fill="#82c91e" />
      <circle cx="18" cy="18" r="5" fill="#40c057" />
      <circle cx="30" cy="18" r="5" fill="#40c057" />
      <circle cx="24" cy="14" r="5" fill="#40c057" />
      <circle cx="24" cy="20" r="5" fill="#40c057" />
    </>
  ),
  pao: (
    <>
      <path d="M8 26c0-8 6-12 16-12s16 4 16 12c0 2-2 3-4 3H12c-2 0-4-1-4-3z" fill="#e8a33d" />
      <path d="M8 29h32v3a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z" fill="#c17d2b" />
      <path d="M16 20l3 3M24 19l3 3M31 20l3 3" stroke="#c17d2b" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  queijo: (
    <>
      <path d="M8 32l30-12 2 12z" fill="#ffd43b" />
      <path d="M8 32h32v4H8z" fill="#fab005" />
      <circle cx="20" cy="29" r="2" fill="#fff3bf" />
      <circle cx="28" cy="27" r="1.5" fill="#fff3bf" />
      <circle cx="33" cy="30" r="1.2" fill="#fff3bf" />
    </>
  ),
  leite: (
    <>
      <path d="M14 20l4-8h12l4 8z" fill="#e9ecef" />
      <rect x="14" y="20" width="20" height="18" rx="1" fill="#fff" stroke="#ced4da" strokeWidth="1.5" />
      <rect x="18" y="26" width="12" height="8" rx="1" fill="#74c0fc" />
      <path d="M21 31c1-2 5-2 6 0" stroke="#fff" strokeWidth="1.5" fill="none" />
    </>
  ),
  ovo: (
    <>
      <ellipse cx="18" cy="26" rx="8" ry="11" fill="#fff" stroke="#e9ecef" strokeWidth="1.5" />
      <ellipse cx="30" cy="28" rx="8" ry="11" fill="#fff3bf" />
      <circle cx="30" cy="30" r="3" fill="#ffd43b" />
    </>
  ),
  gelado: (
    <>
      <path d="M16 22h16l-8 18z" fill="#e8a33d" />
      <path d="M16 22h16l-2 4H18z" fill="#c17d2b" />
      <circle cx="18" cy="18" r="6" fill="#ff8fab" />
      <circle cx="30" cy="18" r="6" fill="#fff3bf" />
      <circle cx="24" cy="13" r="6" fill="#a0e7a0" />
      <circle cx="24" cy="9" r="1.6" fill="#ff6b6b" />
    </>
  ),
  bolo: (
    <>
      <path d="M10 24h28v12H10z" fill="#ff8fab" />
      <path d="M10 24c4-4 24-4 28 0" fill="#fff" />
      <rect x="23" y="12" width="2" height="8" fill="#fab005" />
      <path d="M24 8l-2 4h4z" fill="#ff922b" />
      <circle cx="16" cy="22" r="1.5" fill="#ff6b6b" />
      <circle cx="24" cy="23" r="1.5" fill="#74c0fc" />
      <circle cx="32" cy="22" r="1.5" fill="#ffd43b" />
    </>
  ),
  bolacha: (
    <>
      <circle cx="24" cy="24" r="14" fill="#e8a33d" stroke="#c17d2b" strokeWidth="1.5" />
      <circle cx="19" cy="19" r="2" fill="#5c3a1e" />
      <circle cx="29" cy="20" r="2" fill="#5c3a1e" />
      <circle cx="22" cy="29" r="2" fill="#5c3a1e" />
      <circle cx="30" cy="29" r="1.6" fill="#5c3a1e" />
      <circle cx="16" cy="26" r="1.6" fill="#5c3a1e" />
    </>
  ),
  chocolate: (
    <>
      <path d="M12 14l4-2h20l-4 2M32 14l4-2v26l-4 2" fill="#5c3a1e" />
      <rect x="12" y="14" width="20" height="26" rx="2" fill="#7b3f00" />
      <path d="M22 14v26M12 23h20M12 32h20" stroke="#5c3a1e" strokeWidth="1.5" />
    </>
  ),
  pizza: (
    <>
      <path d="M24 8l16 28c-10 6-22 6-32 0z" fill="#ffd43b" />
      <path d="M24 8l14 24c-8 5-20 5-28 0z" fill="#ff922b" />
      <circle cx="24" cy="20" r="2.5" fill="#ff6b6b" />
      <circle cx="18" cy="28" r="2.5" fill="#ff6b6b" />
      <circle cx="30" cy="28" r="2.5" fill="#ff6b6b" />
      <circle cx="24" cy="32" r="2" fill="#40c057" />
    </>
  ),
  hamburguer: (
    <>
      <path d="M10 18c0-6 28-6 28 0z" fill="#e8a33d" />
      <rect x="10" y="18" width="28" height="4" fill="#82c91e" />
      <rect x="9" y="22" width="30" height="5" rx="2" fill="#a0522d" />
      <rect x="10" y="27" width="28" height="4" fill="#ffd43b" />
      <path d="M10 31c0 6 28 6 28 0z" fill="#e8a33d" />
      <circle cx="18" cy="15" r="1" fill="#fff" />
      <circle cx="24" cy="14" r="1" fill="#fff" />
      <circle cx="30" cy="15" r="1" fill="#fff" />
    </>
  ),
  cachorro: (
    <>
      <rect x="8" y="20" width="32" height="10" rx="5" fill="#e8a33d" />
      <rect x="10" y="22" width="28" height="6" rx="3" fill="#ff8787" />
      <path d="M14 25h20" stroke="#ffd43b" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3" />
    </>
  ),
  batatas: (
    <>
      <path d="M14 18h20l-2 18H16z" fill="#ff6b6b" />
      <path d="M14 18h20v4H14z" fill="#fff" />
      <rect x="17" y="8" width="3" height="12" rx="1.5" fill="#ffd43b" />
      <rect x="22.5" y="6" width="3" height="14" rx="1.5" fill="#ffd43b" />
      <rect x="28" y="9" width="3" height="11" rx="1.5" fill="#ffd43b" />
    </>
  ),
  donut: (
    <>
      <circle cx="24" cy="24" r="14" fill="#ff8fab" />
      <circle cx="24" cy="24" r="5" fill="#fff" />
      <circle cx="18" cy="18" r="1.2" fill="#74c0fc" />
      <circle cx="30" cy="19" r="1.2" fill="#ffd43b" />
      <circle cx="33" cy="26" r="1.2" fill="#69db7c" />
      <circle cx="15" cy="28" r="1.2" fill="#fab005" />
      <circle cx="26" cy="14" r="1.2" fill="#ff6b6b" />
    </>
  ),
  sumo: (
    <>
      <path d="M14 16h20l-2 22H16z" fill="#ff922b" opacity="0.85" />
      <path d="M14 16h20v4H14z" fill="#ffd8a8" />
      <rect x="26" y="8" width="3" height="16" rx="1.5" fill="#ff6b6b" />
      <circle cx="22" cy="26" r="1.5" fill="#fff" opacity="0.5" />
    </>
  ),
  iogurte: (
    <>
      <path d="M14 20h20l-2 18H16z" fill="#fff" stroke="#ced4da" strokeWidth="1" />
      <path d="M13 16h22v4H13z" fill="#74c0fc" />
      <circle cx="24" cy="29" r="4" fill="#ff8fab" />
    </>
  ),
  pipocas: (
    <>
      <circle cx="18" cy="16" r="4" fill="#fff3bf" />
      <circle cx="24" cy="13" r="4" fill="#fff3bf" />
      <circle cx="30" cy="16" r="4" fill="#fff3bf" />
      <circle cx="22" cy="17" r="3" fill="#ffe066" />
      <circle cx="27" cy="17" r="3" fill="#ffe066" />
      <path d="M16 20h16l-2 18H18z" fill="#ff6b6b" />
      <path d="M18 20v18M22 20v18M26 20v18M30 20v18" stroke="#fff" strokeWidth="2" />
    </>
  ),
  sandes: (
    <>
      <path d="M8 22l16-8 16 8-16 6z" fill="#e8a33d" />
      <path d="M8 22l16 6 16-6 2 4-18 8-18-8z" fill="#ffd43b" />
      <path d="M10 24l14 5 14-5" stroke="#82c91e" strokeWidth="2" fill="none" />
      <path d="M9 27l15 6 15-6" stroke="#ff6b6b" strokeWidth="2" fill="none" />
    </>
  ),
  cereais: (
    <>
      <path d="M8 22h32a16 14 0 0 1-32 0z" fill="#74c0fc" />
      <path d="M10 22h28a14 8 0 0 1-28 0z" fill="#ffd8a8" />
      <path d="M6 22h36" stroke="#4dabf7" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="22" r="2" fill="#fab005" />
      <circle cx="24" cy="24" r="2" fill="#ff922b" />
      <circle cx="30" cy="22" r="2" fill="#fab005" />
      <circle cx="21" cy="26" r="1.6" fill="#ff922b" />
    </>
  ),
  nutella: (
    <>
      <rect x="15" y="13" width="18" height="27" rx="3" fill="#f1e3d3" />
      <rect x="16" y="8" width="16" height="6" rx="2" fill="#c0392b" />
      <rect x="17" y="19" width="14" height="13" rx="1.5" fill="#fff" />
      <ellipse cx="24" cy="26" rx="6" ry="5" fill="#6b3410" />
      <path d="M21 24c1.5 1.5 4.5 1.5 6 0" stroke="#f1e3d3" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </>
  ),
  bongo: (
    <>
      <rect x="15" y="14" width="18" height="26" rx="2" fill="#ff922b" />
      <path d="M15 14h18v3.5H15z" fill="#e8590c" />
      <path d="M30 14l4-8" stroke="#f06595" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="29" r="5.5" fill="#ffe066" />
      <path d="M24 23.5v11M18.5 29h11" stroke="#fab005" strokeWidth="1.4" />
    </>
  ),
  gomas: (
    <>
      <path d="M12 15h24l-2.5 25H14.5z" fill="#dee2e6" opacity="0.55" />
      <circle cx="19" cy="24" r="4" fill="#ff6b6b" />
      <circle cx="29" cy="22" r="4" fill="#69db7c" />
      <circle cx="24" cy="31" r="4" fill="#ffd43b" />
      <circle cx="18" cy="33" r="3.4" fill="#cc5de8" />
      <circle cx="30" cy="32" r="3.4" fill="#4dabf7" />
    </>
  ),
  chupa: (
    <>
      <circle cx="19" cy="16" r="11" fill="#ff6b6b" />
      <path d="M19 16a3 3 0 0 1 3-3 5 5 0 0 1 5 5 7 7 0 0 1-7 7 9 9 0 0 1-9-9" fill="none" stroke="#fff" strokeWidth="2" />
      <rect x="17.7" y="26" width="2.6" height="15" rx="1.3" fill="#e9ecef" stroke="#ced4da" strokeWidth="0.8" />
    </>
  ),
  sumol: (
    <>
      <rect x="16" y="9" width="16" height="31" rx="3" fill="#ff922b" />
      <ellipse cx="24" cy="9" rx="8" ry="2.2" fill="#ced4da" />
      <circle cx="24" cy="24" r="5.5" fill="#fff" fillOpacity="0.9" />
      <circle cx="24" cy="24" r="3.2" fill="#ffd43b" />
      <path d="M16 31h16" stroke="#e8590c" strokeWidth="2.2" />
    </>
  ),
  // ---------------- tecnologia ----------------
  iphone: (
    <>
      <rect x="16" y="6" width="16" height="36" rx="4" fill="#343a40" />
      <rect x="18.5" y="11" width="11" height="24" rx="1.5" fill="#74c0fc" />
      <rect x="21" y="8" width="6" height="1.6" rx="0.8" fill="#495057" />
      <circle cx="24" cy="38.5" r="1.6" fill="#495057" />
    </>
  ),
  ipad: (
    <>
      <rect x="9" y="5" width="30" height="38" rx="4" fill="#495057" />
      <rect x="12" y="10" width="24" height="28" rx="1.5" fill="#74c0fc" />
      <circle cx="24" cy="7.6" r="0.9" fill="#adb5bd" />
      <circle cx="24" cy="40.4" r="1.4" fill="#adb5bd" />
    </>
  ),
  mac: (
    <>
      <rect x="9" y="9" width="30" height="20" rx="2" fill="#343a40" />
      <rect x="11.5" y="11.5" width="25" height="15" rx="1" fill="#74c0fc" />
      <path d="M9 29h30l3 4H6z" fill="#adb5bd" />
      <path d="M21 31h6" stroke="#868e96" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  auscultadores: (
    <>
      <path d="M9 26v-3a15 15 0 0 1 30 0v3" fill="none" stroke="#343a40" strokeWidth="3" strokeLinecap="round" />
      <rect x="6" y="24" width="7" height="13" rx="3" fill="#ff6b6b" />
      <rect x="35" y="24" width="7" height="13" rx="3" fill="#ff6b6b" />
    </>
  ),
  relogio: (
    <>
      <rect x="18" y="6" width="12" height="9" rx="2" fill="#495057" />
      <rect x="18" y="33" width="12" height="9" rx="2" fill="#495057" />
      <rect x="13" y="13" width="22" height="22" rx="6" fill="#343a40" />
      <rect x="16" y="16" width="16" height="16" rx="4" fill="#69db7c" />
      <path d="M24 20v4l2.5 1.6" stroke="#1b5e20" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

/* The shop's shelves. Prices climb with the toy; food is pocket-money cheap.
 * Most carry real cents (some odd, like 10,66 €) so paying is a proper exercise;
 * a few stay round on purpose, for an easy start. */
export const CATALOG: ShopProduct[] = [
  // brinquedos
  { id: "bola", name: "Bola", price: 5.3, cat: "brinquedo" },
  { id: "urso", name: "Urso de peluche", price: 11.66, cat: "brinquedo" },
  { id: "carro", name: "Carrinho", price: 7.66, cat: "brinquedo" },
  { id: "boneca", name: "Boneca", price: 13.99, cat: "brinquedo" },
  { id: "blocos", name: "Blocos de montar", price: 17.5, cat: "brinquedo" },
  { id: "piao", name: "Pião", price: 2.8, cat: "brinquedo" },
  { id: "balao", name: "Balão", price: 0.9, cat: "brinquedo" },
  { id: "papagaio", name: "Papagaio de papel", price: 5.45, cat: "brinquedo" },
  { id: "bicicleta", name: "Bicicleta", price: 29.99, cat: "brinquedo" },
  { id: "comboio", name: "Comboio", price: 15.7, cat: "brinquedo" },
  { id: "aviao", name: "Avião", price: 8.33, cat: "brinquedo" },
  { id: "robo", name: "Robô", price: 20, cat: "brinquedo" },
  { id: "puzzle", name: "Puzzle", price: 6.65, cat: "brinquedo" },
  { id: "dinossauro", name: "Dinossauro", price: 10.66, cat: "brinquedo" },
  { id: "foguetao", name: "Foguetão", price: 9.3, cat: "brinquedo" },
  { id: "tambor", name: "Tambor", price: 12.4, cat: "brinquedo" },
  { id: "guitarra", name: "Guitarra", price: 15, cat: "brinquedo" },
  { id: "cubo", name: "Cubo mágico", price: 5.95, cat: "brinquedo" },
  { id: "ioio", name: "Ioió", price: 1.8, cat: "brinquedo" },
  { id: "berlindes", name: "Berlindes", price: 2.55, cat: "brinquedo" },
  { id: "corda", name: "Corda de saltar", price: 3.7, cat: "brinquedo" },
  { id: "barco", name: "Barco", price: 7.99, cat: "brinquedo" },
  { id: "patins", name: "Patins", price: 21.49, cat: "brinquedo" },
  { id: "livro", name: "Livro de histórias", price: 9, cat: "brinquedo" },
  // brinquedos grandes — acima de 45€ (treina com a nota de 50€!)
  { id: "trotinete", name: "Trotinete", price: 49.99, cat: "brinquedo" },
  { id: "carrorc", name: "Carro telecomandado", price: 47.66, cat: "brinquedo" },
  { id: "consola", name: "Consola de jogos", price: 59.9, cat: "brinquedo" },
  { id: "casinha", name: "Casa de bonecas", price: 64.5, cat: "brinquedo" },
  { id: "trampolim", name: "Trampolim", price: 85.88, cat: "brinquedo" },
  // comida
  { id: "maca", name: "Maçã", price: 0.66, cat: "comida" },
  { id: "banana", name: "Banana", price: 0.45, cat: "comida" },
  { id: "morango", name: "Morangos", price: 1.99, cat: "comida" },
  { id: "laranja", name: "Laranja", price: 0.6, cat: "comida" },
  { id: "uvas", name: "Uvas", price: 2.3, cat: "comida" },
  { id: "melancia", name: "Melancia", price: 2.85, cat: "comida" },
  { id: "cenoura", name: "Cenoura", price: 0.4, cat: "comida" },
  { id: "brocolos", name: "Brócolos", price: 0.99, cat: "comida" },
  { id: "pao", name: "Pão", price: 1, cat: "comida" },
  { id: "queijo", name: "Queijo", price: 3.33, cat: "comida" },
  { id: "leite", name: "Leite", price: 0.85, cat: "comida" },
  { id: "ovo", name: "Ovos", price: 1.7, cat: "comida" },
  { id: "gelado", name: "Gelado", price: 1.6, cat: "comida" },
  { id: "bolo", name: "Bolo", price: 7.99, cat: "comida" },
  { id: "bolacha", name: "Bolachas", price: 1.45, cat: "comida" },
  { id: "chocolate", name: "Chocolate", price: 1.5, cat: "comida" },
  { id: "pizza", name: "Pizza", price: 6.66, cat: "comida" },
  { id: "hamburguer", name: "Hambúrguer", price: 4.66, cat: "comida" },
  { id: "cachorro", name: "Cachorro-quente", price: 2.9, cat: "comida" },
  { id: "batatas", name: "Batatas fritas", price: 1.95, cat: "comida" },
  { id: "donut", name: "Donut", price: 1.5, cat: "comida" },
  { id: "sumo", name: "Sumo", price: 0.8, cat: "comida" },
  { id: "iogurte", name: "Iogurte", price: 0.75, cat: "comida" },
  { id: "pipocas", name: "Pipocas", price: 1.85, cat: "comida" },
  { id: "sandes", name: "Sandes", price: 2.49, cat: "comida" },
  { id: "cereais", name: "Cereais", price: 3, cat: "comida" },
  // guloseimas e bebidas — favoritas dos miúdos
  { id: "nutella", name: "Nutella", price: 3.49, cat: "comida" },
  { id: "bongo", name: "Bongo", price: 0.89, cat: "comida" },
  { id: "sumol", name: "Sumol", price: 0.95, cat: "comida" },
  { id: "gomas", name: "Gomas", price: 1.2, cat: "comida" },
  { id: "chupa", name: "Chupa-chupa", price: 0.3, cat: "comida" },
  // tecnologia — coisas caras (centenas de euros): treina as notas grandes!
  { id: "auscultadores", name: "Auscultadores", price: 149.9, cat: "tecnologia" },
  { id: "relogio", name: "Relógio inteligente", price: 299, cat: "tecnologia" },
  { id: "ipad", name: "iPad", price: 449.99, cat: "tecnologia" },
  { id: "iphone", name: "iPhone", price: 799, cat: "tecnologia" },
  { id: "mac", name: "Mac", price: 1199, cat: "tecnologia" },
];
