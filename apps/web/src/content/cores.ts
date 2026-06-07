/* ------------------------------------------------------------------ *
 * "As Cores" — the colour reference of the Biblioteca (NOT a school subject,
 * NOT grade-based, like the Dicionário). Each page is one colour FAMILY whose
 * `.md` holds a `colors` block of swatch cards (name + HEX + RGB, read aloud).
 * The interactive RGB mixer + "how colours are made" live in the Enciclopédia
 * article "Como nascem as cores?". See docs/BIBLIOTECA.md.
 * ------------------------------------------------------------------ */
import type { Subject, Lesson } from "./curriculum";

import coresVermelhos from "./cores/vermelhos.md";
import coresLaranjas from "./cores/laranjas.md";
import coresAmarelos from "./cores/amarelos.md";
import coresVerdes from "./cores/verdes.md";
import coresAzuis from "./cores/azuis.md";
import coresRoxos from "./cores/roxos.md";
import coresRosas from "./cores/rosas.md";
import coresCastanhos from "./cores/castanhos.md";
import coresCinzentos from "./cores/cinzentos.md";
import coresBrancoPreto from "./cores/branco-preto.md";

const empty: Lesson[] = [];

export const coresSubject: Subject = {
  id: "cores",
  label: "As Cores",
  emoji: "🎨",
  color: "var(--subj-art)",
  colorSoft: "var(--subj-art-soft)",
  blurb: "As cores e os seus nomes, com código HEX e RGB — toca para ouvir!",
  years: {
    1: [
      { id: "cores-vermelhos", title: "Vermelhos", emoji: "🔴", body: coresVermelhos },
      { id: "cores-laranjas", title: "Cor-de-laranja", emoji: "🟠", body: coresLaranjas },
      { id: "cores-amarelos", title: "Amarelos", emoji: "🟡", body: coresAmarelos },
      { id: "cores-verdes", title: "Verdes", emoji: "🟢", body: coresVerdes },
      { id: "cores-azuis", title: "Azuis", emoji: "🔵", body: coresAzuis },
      { id: "cores-roxos", title: "Roxos e violetas", emoji: "🟣", body: coresRoxos },
      { id: "cores-rosas", title: "Cor-de-rosa", emoji: "🩷", body: coresRosas },
      { id: "cores-castanhos", title: "Castanhos", emoji: "🟤", body: coresCastanhos },
      { id: "cores-cinzentos", title: "Cinzentos", emoji: "⚪", body: coresCinzentos },
      { id: "cores-branco-preto", title: "Branco e Preto", emoji: "⚫", body: coresBrancoPreto },
    ],
    2: empty, 3: empty, 4: empty, 5: empty, 6: empty,
  },
};
