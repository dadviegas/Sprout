/* ------------------------------------------------------------------ *
 * "Atlas da Vida" — a catalogue of the animals and plants of the world (NOT a
 * school subject, NOT grade-based, like the Dicionário). Each page is one GROUP
 * whose `.md` holds an `atlas` block of cards: where each one is NATURAL, where
 * it can be SEEN, and a "ver fotos" link to real photos. See docs/BIBLIOTECA.md.
 * ------------------------------------------------------------------ */
import type { Subject, Lesson } from "./curriculum";

import atlasMamiferos from "./atlas/mamiferos.md";
import atlasAves from "./atlas/aves.md";
import atlasRepteis from "./atlas/repteis-anfibios.md";
import atlasPeixes from "./atlas/peixes.md";
import atlasInsetos from "./atlas/insetos.md";
import atlasArvores from "./atlas/arvores.md";
import atlasFlores from "./atlas/flores.md";

const empty: Lesson[] = [];

export const atlasSubject: Subject = {
  id: "atlas",
  label: "Atlas da Vida",
  emoji: "🗺️",
  color: "var(--subj-cn)",
  colorSoft: "var(--subj-cn-soft)",
  blurb: "Animais e plantas do mundo: de onde são e onde os podes ver.",
  years: {
    1: [
      { id: "atlas-mamiferos", title: "Mamíferos", emoji: "🐾", body: atlasMamiferos },
      { id: "atlas-aves", title: "Aves", emoji: "🦅", body: atlasAves },
      { id: "atlas-repteis-anfibios", title: "Répteis e anfíbios", emoji: "🦎", body: atlasRepteis },
      { id: "atlas-peixes", title: "Peixes e vida marinha", emoji: "🐠", body: atlasPeixes },
      { id: "atlas-insetos", title: "Insetos e bichos pequenos", emoji: "🐝", body: atlasInsetos },
      { id: "atlas-arvores", title: "Árvores", emoji: "🌳", body: atlasArvores },
      { id: "atlas-flores", title: "Flores", emoji: "🌸", body: atlasFlores },
    ],
    2: empty, 3: empty, 4: empty, 5: empty, 6: empty,
  },
};
