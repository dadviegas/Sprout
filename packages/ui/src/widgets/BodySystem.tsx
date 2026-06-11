import { useState, type ReactNode } from "react";
import { Icon } from "@sprout/icons";
import { speak } from "../speak";
import { Speaker } from "../Speaker";

/* BodySystem (v3) — a friendly, credible human figure whose organ systems light
   up one at a time, now at ORGAN level. Tap a system chip (digestivo,
   respiratório, circulatório, excretor, nervoso, locomotor) to see its parts
   drawn on the body and hear what it does. Each system is a list of named PARTS
   (coração, aorta, veias cavas, pulmões, fémur…), shown as tappable WORD CHIPS.

   Tapping a chip (the word) HIGHLIGHTS that part on the figure: the rest of the
   system dims, the part pulses once and gets a glow + outline in the system
   colour, a thin leader line points to a label next to the figure, and the kid
   hears the part's name + a one-liner. Tapping the PART on the figure does the
   same — bidirectional. A second tap clears the selection (back to the whole
   system). The fact card shows the part's one-liner while a part is selected.

   Static, resolution-independent SVG — sharp on iPad/phone/desktop. Speech only
   fires on an explicit tap (see the speak rule). Reduced-motion: no pulse/beat,
   the highlight still appears. Public API (systems, title) is unchanged, so the
   existing lessons keep working. */

export interface BodySystemSpec {
  title?: string;
  /** Which systems to show, in order. Defaults to all six. */
  systems?: string[];
}

/** One labelled, tappable part of a system. `node(color, dim)` draws the part;
 *  `dim` is true when another part of the same system is the selected one (so
 *  this one fades back). `at` is the SVG anchor the leader line points to. */
interface Part {
  id: string;
  name: string; // pt-PT label shown on the chip + leader
  line: string; // kid one-liner (shown in the fact card + read aloud)
  at: [number, number]; // anchor point on the figure (viewBox coords)
  node: (color: string, dim: boolean) => ReactNode;
}

interface BodySys {
  key: string;
  name: string;
  color: string;
  say: string; // read-aloud overview of the whole system
  fact: string; // one-line kid fact for the whole system
  parts: Part[];
}

/* ---- drawing helpers -------------------------------------------------- */

/** Soft body fill for an organ (system colour washed towards white). */
const soft = (c: string) => `color-mix(in srgb, ${c} 65%, white)`;
/** Lighter wash for secondary parts (intestine coil, vessels' glow). */
const pale = (c: string) => `color-mix(in srgb, ${c} 40%, white)`;
/** A cooler shade — used for the veins so kids see two networks. */
const cool = (c: string) => `color-mix(in srgb, ${c} 55%, #3b7fd6)`;

/** One continuous body outline — head, neck, torso, arms (slightly apart) and
 *  legs — centred on x=120 in a 240×420 viewBox. Drawn once, organs layer on. */
const BODY_PATH =
  "M120,10 C103,10 92,23 92,40 C92,51 97,61 105,67 C107,72 107,77 105,82 " +
  "C95,86 81,89 72,97 C63,106 59,129 57,151 C55,168 52,184 51,197 " +
  "C50,208 53,216 60,216 C66,216 68,206 67,198 C69,182 71,166 73,152 " +
  "C76,137 80,122 85,113 C86,132 86,150 87,168 C89,186 83,200 81,216 " +
  "C82,243 86,271 90,296 C92,323 94,350 95,376 C95,386 92,393 90,398 " +
  "C91,402 96,403 102,403 C107,403 112,401 112,394 C112,388 112,381 112,376 " +
  "C112,350 111,323 111,297 C111,282 114,269 120,258 " +
  "C126,269 129,282 129,297 C129,323 128,350 128,376 C128,381 128,388 128,394 " +
  "C128,401 133,403 138,403 C144,403 149,402 150,398 C148,393 145,386 145,376 " +
  "C146,350 148,323 150,296 C154,271 158,243 159,216 C157,200 151,186 153,168 " +
  "C154,150 154,132 155,113 C160,122 164,137 167,152 C169,166 171,182 173,198 " +
  "C172,206 174,216 180,216 C187,216 190,208 189,197 C188,184 185,168 183,151 " +
  "C181,129 177,106 168,97 C159,89 145,86 135,82 C133,77 133,72 135,67 " +
  "C143,61 148,51 148,40 C148,23 137,10 120,10 Z";

/* ---- the catalog: systems → parts ------------------------------------- */

const CATALOG: BodySys[] = [
  {
    key: "respiratorio",
    name: "Respiratório",
    color: "#3aa0e6",
    say: "Sistema respiratório: o ar entra pelo nariz, desce pela traqueia, passa pelos brônquios e enche os pulmões. Traz o oxigénio para o corpo e leva o dióxido de carbono para fora.",
    fact: "Respiras cerca de vinte mil vezes por dia — quase sempre sem dares por isso!",
    parts: [
      {
        id: "nariz", name: "Nariz", line: "É por aqui que o ar entra — e onde fica quentinho e limpo antes de descer.",
        at: [128, 60],
        node: (c) => (
          <path d="M120,52 C124,55 126,60 124,64 C122,67 118,67 116,64 C114,60 116,55 120,52 Z" fill={soft(c)} stroke={c} strokeWidth="2" />
        ),
      },
      {
        id: "traqueia", name: "Traqueia", line: "Um tubo com aneizinhos, como uma mangueira, que leva o ar do nariz aos pulmões.",
        at: [134, 96],
        node: (c) => (
          <g>
            <rect x="116.5" y="78" width="7" height="40" rx="3.5" fill={soft(c)} stroke={c} strokeWidth="2" />
            {[86, 94, 102, 110].map((y) => (
              <line key={y} x1="117.5" y1={y} x2="122.5" y2={y} stroke={c} strokeWidth="1.5" opacity="0.7" />
            ))}
          </g>
        ),
      },
      {
        id: "bronquios", name: "Brônquios", line: "A traqueia parte-se em dois ramos, como uma árvore ao contrário, um para cada pulmão.",
        at: [102, 130],
        node: (c) => (
          <path d="M120,118 C120,127 111,129 105,135 M120,118 C120,127 129,129 135,135" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" />
        ),
      },
      {
        id: "pulmoes", name: "Pulmões", line: "Dois sacos esponjosos que se enchem de ar — apanha o oxigénio e larga o dióxido de carbono.",
        at: [150, 165],
        node: (c) => (
          <g>
            <path d="M108,127 C96,125 86,137 84,153 C82,169 84,187 92,197 C97,203 106,203 110,197 C113,191 113,171 112,153 C111,141 111,131 108,127 Z" fill={soft(c)} stroke={c} strokeWidth="2" />
            <path d="M132,127 C144,125 154,137 156,153 C158,169 156,187 148,197 C143,203 134,203 130,197 C127,191 127,171 128,153 C129,141 129,131 132,127 Z" fill={soft(c)} stroke={c} strokeWidth="2" />
            {/* bronchi branching INTO the lungs */}
            <path d="M105,135 C100,142 96,150 93,160 M132,138 C137,150 142,160 146,168" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M86,160 C94,164 102,165 110,165 M88,178 C95,181 102,182 109,182" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.55" />
            <path d="M154,160 C146,164 138,165 130,165 M152,178 C145,181 138,182 131,182" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.55" />
          </g>
        ),
      },
    ],
  },
  {
    key: "circulatorio",
    name: "Circulatório",
    color: "#e23d4b",
    say: "Sistema circulatório: o coração bombeia o sangue por todo o corpo. As artérias levam o sangue com oxigénio para fora e as veias trazem-no de volta.",
    fact: "O teu coração é do tamanho do teu punho fechado e bate mais de cem mil vezes por dia.",
    parts: [
      {
        id: "coracao", name: "Coração", line: "É a bomba do corpo: aperta e larga sem parar para empurrar o sangue para todo o lado.",
        at: [148, 138],
        node: (c, dim) => (
          <g className={dim ? undefined : "bodysys-pulse"}>
            <path d="M111,130 C112,121 122,118 127,124 C130,117 141,118 143,127 C146,138 142,151 135,159 C130,164 123,163 118,155 C111,146 109,137 111,130 Z" fill={soft(c)} stroke={c} strokeWidth="2" />
            <ellipse cx="119" cy="134" rx="4" ry="6" fill="#fff" opacity="0.4" transform="rotate(-15 119 134)" />
          </g>
        ),
      },
      {
        id: "aorta", name: "Artéria aorta", line: "A maior artéria — sai do coração a fazer um arco e leva o sangue para o resto do corpo.",
        at: [98, 110],
        node: (c) => (
          <path d="M131,122 C133,112 132,104 124,100 C116,97 110,103 110,112" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" />
        ),
      },
      {
        id: "arterias", name: "Artérias", line: "Os tubos que levam o sangue cheio de oxigénio para os braços, as pernas e a cabeça.",
        at: [62, 188],
        node: (c) => (
          <g fill="none" stroke={c} strokeLinecap="round">
            <path d="M118,86 C112,82 108,78 106,72 M118,86 C124,82 128,78 130,72" strokeWidth="2.5" />
            <path d="M120,110 C102,106 86,116 77,138 C70,156 65,176 62,194" strokeWidth="3" />
            <path d="M120,156 L120,214 C116,228 108,244 102,262 C98,288 96,330 95,368" strokeWidth="3.5" />
          </g>
        ),
      },
      {
        id: "veias-cavas", name: "Veias cavas", line: "As duas veias maiores — trazem todo o sangue usado de volta ao coração.",
        at: [102, 124],
        node: (c) => (
          <g fill="none" stroke={cool(c)} strokeLinecap="round">
            <path d="M114,122 C112,112 113,104 113,96" strokeWidth="5" />
            <path d="M114,150 C113,170 113,192 114,210" strokeWidth="5" />
          </g>
        ),
      },
      {
        id: "veias", name: "Veias", line: "Os tubos que trazem o sangue de volta — desenhados num tom mais frio do que as artérias.",
        at: [178, 188],
        node: (c) => (
          <g fill="none" stroke={cool(c)} strokeLinecap="round">
            <path d="M122,110 C140,106 156,116 165,138 C172,156 177,176 180,194" strokeWidth="3" />
            <path d="M122,214 C126,228 134,244 140,262 C144,288 146,330 147,368" strokeWidth="3.5" />
          </g>
        ),
      },
    ],
  },
  {
    key: "digestivo",
    name: "Digestivo",
    color: "#e8913a",
    say: "Sistema digestivo: a comida desce da boca pelo esófago até ao estômago, passa pelo intestino delgado e depois pelo intestino grosso. Transforma a comida em energia e o resto sai como cocó.",
    fact: "Esticado, o intestino delgado mede mais de seis metros — maior do que um carro!",
    parts: [
      {
        id: "boca-esofago", name: "Boca e esófago", line: "A comida começa na boca e desce por um tubo, o esófago, até ao estômago.",
        at: [134, 100],
        node: (c) => (
          <g>
            <path d="M114,48 C117,52 123,52 126,48" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />
            <path d="M119,78 C119,94 118,108 118,124" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" />
          </g>
        ),
      },
      {
        id: "estomago", name: "Estômago", line: "Um saco que amassa e mistura a comida com sucos, como uma máquina de fazer papa.",
        at: [150, 140],
        node: (c) => (
          <g>
            <path d="M118,124 C134,119 147,129 145,143 C143,156 129,162 119,158 C111,155 108,146 112,138 C114,132 116,128 118,124 Z" fill={soft(c)} stroke={c} strokeWidth="2" />
            <ellipse cx="132" cy="136" rx="6" ry="4" fill="#fff" opacity="0.4" transform="rotate(20 132 136)" />
          </g>
        ),
      },
      {
        id: "delgado", name: "Intestino delgado", line: "Um tubo comprido, todo enrolado, onde o corpo apanha o que é bom da comida.",
        at: [88, 196],
        node: (c) => (
          <path d="M108,176 C102,182 108,188 118,186 C130,184 132,176 138,180 M134,190 C126,186 114,190 112,196 C110,203 120,208 130,204" fill="none" stroke={soft(c)} strokeWidth="7" strokeLinecap="round" />
        ),
      },
      {
        id: "grosso", name: "Intestino grosso", line: "A última parte, à volta do delgado, onde o resto seca e fica pronto para sair.",
        at: [150, 200],
        node: (c) => (
          <path d="M100,212 C100,198 100,184 100,176 C100,168 106,164 113,164 L127,164 C135,164 140,168 140,176 C140,188 140,200 140,210 C140,219 133,223 126,221 L122,230" fill="none" stroke={c} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        ),
      },
    ],
  },
  {
    key: "excretor",
    name: "Excretor",
    color: "#27b2a2",
    say: "Sistema excretor: os dois rins limpam o sangue e fazem o chichi, que desce pelos ureteres e se guarda na bexiga até saíres à casa de banho.",
    fact: "Os rins filtram todo o teu sangue cerca de sessenta vezes por dia.",
    parts: [
      {
        id: "rins", name: "Rins", line: "Dois filtros em forma de feijão que limpam o sangue e fazem o chichi.",
        at: [88, 168],
        node: (c) => (
          <g>
            <path d="M104,156 C94,156 89,168 93,179 C96,187 105,189 108,182 C110,176 110,165 108,160 C107,157 106,156 104,156 Z" fill={soft(c)} stroke={c} strokeWidth="2" />
            <path d="M136,156 C146,156 151,168 147,179 C144,187 135,189 132,182 C130,176 130,165 132,160 C133,157 134,156 136,156 Z" fill={soft(c)} stroke={c} strokeWidth="2" />
            <path d="M107,166 C104,169 104,173 107,176 M133,166 C136,169 136,173 133,176" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
          </g>
        ),
      },
      {
        id: "ureteres", name: "Ureteres", line: "Dois canudos que levam o chichi dos rins até à bexiga.",
        at: [142, 205],
        node: (c) => (
          <path d="M105,186 C110,200 114,212 117,224 M135,186 C130,200 126,212 123,224" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />
        ),
      },
      {
        id: "bexiga", name: "Bexiga", line: "Um balãozinho que guarda o chichi até estares na casa de banho.",
        at: [148, 232],
        node: (c) => (
          <g>
            <path d="M120,222 C132,222 137,231 133,239 C129,247 111,247 107,239 C103,231 108,222 120,222 Z" fill={soft(c)} stroke={c} strokeWidth="2" />
            <ellipse cx="115" cy="231" rx="4" ry="3" fill="#fff" opacity="0.4" />
          </g>
        ),
      },
    ],
  },
  {
    key: "nervoso",
    name: "Nervoso",
    color: "#8a6cf0",
    say: "Sistema nervoso: o cérebro é o chefe. Pela espinal medula e pelos nervos, manda ordens a todo o corpo e sente tudo o que se passa.",
    fact: "As mensagens dos nervos viajam a mais de quatrocentos quilómetros por hora!",
    parts: [
      {
        id: "cerebro", name: "Cérebro", line: "O chefe do corpo — pensa, decide e manda mensagens para todo o lado.",
        at: [150, 38],
        node: (c) => (
          <g>
            <path d="M120,16 C104,16 95,26 95,38 C95,49 104,57 120,57 C136,57 145,49 145,38 C145,26 136,16 120,16 Z" fill={soft(c)} stroke={c} strokeWidth="2" />
            <path d="M120,18 L120,55" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
            <path d="M101,32 C105,27 110,31 108,36 M104,44 C108,39 113,43 111,48 M139,32 C135,27 130,31 132,36 M136,44 C132,39 127,43 129,48" fill="none" stroke={c} strokeWidth="1.5" opacity="0.8" />
          </g>
        ),
      },
      {
        id: "medula", name: "Espinal medula", line: "Uma estrada de mensagens que desce pelas costas, a ligar o cérebro ao corpo todo.",
        at: [140, 140],
        node: (c) => <rect x="118" y="58" width="4" height="158" rx="2" fill={c} />,
      },
      {
        id: "nervos", name: "Nervos", line: "Fios fininhos que levam as ordens do cérebro aos braços e pernas, e trazem o que sentes.",
        at: [62, 188],
        node: (c) => (
          <g fill="none" stroke={c} strokeLinecap="round">
            <path d="M120,96 C104,98 88,108 76,126 C68,140 63,162 60,186" strokeWidth="2.5" />
            <path d="M120,96 C136,98 152,108 164,126 C172,140 177,162 180,186" strokeWidth="2.5" />
            <path d="M120,214 C112,240 104,274 99,312 C96,334 95,356 94,372" strokeWidth="2.5" />
            <path d="M120,214 C128,240 136,274 141,312 C144,334 145,356 146,372" strokeWidth="2.5" />
            {[100, 124, 148, 172].map((y) => (
              <path key={y} d={`M120,${y} L110,${y + 7} M120,${y} L130,${y + 7}`} strokeWidth="1.5" opacity="0.7" />
            ))}
          </g>
        ),
      },
    ],
  },
  {
    key: "locomotor",
    name: "Locomotor",
    color: "#c79a3e",
    say: "Sistema locomotor: os ossos dão forma e firmeza ao corpo e os músculos puxam os ossos para te mexeres, correres e saltares.",
    fact: "Tens duzentos e seis ossos — e mais de metade estão nas mãos e nos pés!",
    parts: [
      {
        id: "cranio", name: "Crânio", line: "O capacete de osso que protege o cérebro.",
        at: [150, 35],
        node: (c) => (
          <g stroke={c} strokeLinecap="round">
            <circle cx="120" cy="35" r="15" fill={soft(c)} strokeWidth="2" />
            <path d="M111,47 C113,55 127,55 129,47" fill={soft(c)} strokeWidth="2" />
          </g>
        ),
      },
      {
        id: "coluna", name: "Coluna", line: "Os ossos das costas empilhados, as vértebras, que te deixam ficar direito e dobrar.",
        at: [140, 150],
        node: (c) => (
          <g stroke={c} strokeLinecap="round">
            <rect x="117" y="58" width="6" height="158" rx="3" fill={soft(c)} strokeWidth="2" />
            {[70, 84, 98, 112, 126, 140, 154, 168, 182, 196, 210].map((y) => (
              <line key={y} x1="117" y1={y} x2="123" y2={y} strokeWidth="1.5" opacity="0.7" />
            ))}
          </g>
        ),
      },
      {
        id: "costelas", name: "Costelas", line: "Uma jaula de ossos que protege o coração e os pulmões.",
        at: [150, 108],
        node: (c) => (
          <g fill="none" stroke={c} strokeWidth="3" strokeLinecap="round">
            {[90, 102, 114, 126].map((y) => (
              <g key={y}>
                <path d={`M118,${y} C104,${y + 2} 96,${y + 8} 98,${y + 16}`} />
                <path d={`M122,${y} C136,${y + 2} 144,${y + 8} 142,${y + 16}`} />
              </g>
            ))}
          </g>
        ),
      },
      {
        id: "bacia", name: "Bacia", line: "O osso largo das ancas onde se prendem as pernas.",
        at: [148, 222],
        node: (c) => (
          <path d="M101,222 C101,212 112,209 120,216 C128,209 139,212 139,222 C139,231 130,237 124,231 L120,227 L116,231 C110,237 101,231 101,222 Z" fill={soft(c)} stroke={c} strokeWidth="2" strokeLinecap="round" />
        ),
      },
      {
        id: "umero", name: "Úmero", line: "O osso do braço, do ombro até ao cotovelo.",
        at: [62, 120],
        node: (c) => (
          <g stroke={c} strokeLinecap="round">
            <path d="M76,100 L62,150" fill="none" strokeWidth="5" />
            <circle cx="76" cy="100" r="4" fill={soft(c)} strokeWidth="2" />
            <circle cx="62" cy="150" r="4" fill={soft(c)} strokeWidth="2" />
          </g>
        ),
      },
      {
        id: "femur", name: "Fémur", line: "O osso da coxa — o maior e mais forte de todos.",
        at: [70, 260],
        node: (c) => (
          <g stroke={c} strokeLinecap="round">
            <path d="M88,224 L93,294" fill="none" strokeWidth="6" />
            <circle cx="88" cy="224" r="4.5" fill={soft(c)} strokeWidth="2" />
            <circle cx="93" cy="294" r="4.5" fill={soft(c)} strokeWidth="2" />
          </g>
        ),
      },
      {
        id: "tibia", name: "Tíbia", line: "O osso da canela, do joelho ao tornozelo — sente-o à frente da perna.",
        at: [72, 340],
        node: (c) => (
          <g stroke={c} strokeLinecap="round">
            <path d="M94,298 L95,370" fill="none" strokeWidth="5" />
            <circle cx="94" cy="298" r="4" fill={soft(c)} strokeWidth="2" />
            <circle cx="95" cy="372" r="4" fill={soft(c)} strokeWidth="2" />
          </g>
        ),
      },
      {
        id: "musculos", name: "Músculos", line: "Por cima dos ossos, encolhem e puxam para te fazerem mexer.",
        at: [178, 150],
        node: (c) => (
          <g fill={pale(c)} stroke={c} strokeWidth="1.5" opacity="0.8">
            <ellipse cx="71" cy="124" rx="7" ry="18" transform="rotate(18 71 124)" />
            <ellipse cx="169" cy="124" rx="7" ry="18" transform="rotate(-18 169 124)" />
            <ellipse cx="100" cy="258" rx="9" ry="22" transform="rotate(6 100 258)" />
            <ellipse cx="140" cy="258" rx="9" ry="22" transform="rotate(-6 140 258)" />
          </g>
        ),
      },
    ],
  },
];

/* ----------------------------------------------------------------------- */

export function BodySystem({ spec }: { spec: BodySystemSpec }) {
  const wanted = spec.systems?.length
    ? CATALOG.filter((s) => spec.systems!.includes(s.key))
    : CATALOG;
  const systems = wanted.length ? wanted : CATALOG;
  const [sysKey, setSysKey] = useState(systems[0].key);
  const [partId, setPartId] = useState<string | null>(null);
  /** bumps every selection so the same part re-pulses on re-tap. */
  const [pulse, setPulse] = useState(0);
  const sys = systems.find((s) => s.key === sysKey) ?? systems[0];
  const part = partId ? sys.parts.find((p) => p.id === partId) ?? null : null;

  const pickSystem = (s: BodySys) => {
    setSysKey(s.key);
    setPartId(null);
    speak(s.say);
  };

  /** Select a part (or clear it if it's already selected). */
  const togglePart = (p: Part) => {
    if (p.id === partId) {
      setPartId(null);
      return;
    }
    setPartId(p.id);
    setPulse((n) => n + 1);
    speak(`${p.name}. ${p.line}`);
  };

  return (
    <div className="widget bodysystem-widget">
      <div className="w-head">
        <span className="w-badge"><Icon name="body" size={16} /> O corpo humano</span>
        {spec.title && <strong>{spec.title}</strong>}
        <span className="w-hint">Toca num sistema e depois numa palavra para a veres no corpo</span>
      </div>

      <div className="bodysystem-body" style={{ ["--sys" as string]: sys.color }}>
        <div className="bodysystem-figure">
          <svg className="bodysystem-svg" viewBox="0 0 240 420" role="img" aria-label={`O corpo humano: sistema ${sys.name}`}>
            <path
              d={BODY_PATH}
              fill="color-mix(in srgb, var(--subj-edm) 8%, var(--surface-2))"
              stroke="var(--border-strong)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* a friendly face (skipped while the brain/skull fills the head) */}
            {sys.key !== "nervoso" && sys.key !== "locomotor" && (
              <g stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7">
                <circle cx="111" cy="38" r="1.4" fill="var(--ink-3)" stroke="none" />
                <circle cx="129" cy="38" r="1.4" fill="var(--ink-3)" stroke="none" />
                <path d="M114,48 C117,51 123,51 126,48" />
              </g>
            )}

            {/* the parts of the selected system, each its own tappable group */}
            <g>
              {sys.parts.map((p) => {
                const on = p.id === partId;
                const dim = partId !== null && !on;
                return (
                  <g
                    key={p.id}
                    className={`bodysys-part${on ? " is-on" : ""}${dim ? " is-dim" : ""}`}
                    onClick={() => togglePart(p)}
                    role="button"
                    tabIndex={0}
                    aria-label={p.name}
                    aria-pressed={on}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); togglePart(p); }
                    }}
                  >
                    {/* the artwork; the highlighted part re-keys so its pulse replays */}
                    <g key={on ? pulse : undefined} className={on ? "bodysys-flash" : undefined}>
                      {p.node(sys.color, dim)}
                    </g>
                  </g>
                );
              })}
            </g>

            {/* leader line + label for the selected part */}
            {part && (
              <g className="bodysys-leader" pointerEvents="none">
                <line
                  x1={part.at[0]} y1={part.at[1]} x2="218" y2={part.at[1]}
                  stroke={sys.color} strokeWidth="1.5" strokeDasharray="3 3"
                />
                <circle cx={part.at[0]} cy={part.at[1]} r="3" fill={sys.color} />
              </g>
            )}
          </svg>
        </div>

        <div className="bodysystem-side">
          <div className="bodysystem-chips" role="tablist" aria-label="Sistemas do corpo">
            {systems.map((s) => {
              const on = s.key === sysKey;
              return (
                <button
                  key={s.key}
                  type="button"
                  className="bodysys-chip"
                  onClick={() => pickSystem(s)}
                  aria-pressed={on}
                  style={on ? { background: s.color, borderColor: s.color, color: "#fff" } : undefined}
                >
                  {s.name}
                </button>
              );
            })}
          </div>

          <div className="bodysystem-name" style={{ color: sys.color }}>{sys.name}</div>

          {/* the parts as tappable WORD CHIPS — bidirectional with the figure */}
          <div className="bodysystem-parts" aria-label={`Partes do sistema ${sys.name.toLowerCase()}`}>
            {sys.parts.map((p) => {
              const on = p.id === partId;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`bodysys-word${on ? " is-on" : ""}`}
                  onClick={() => togglePart(p)}
                  aria-pressed={on}
                  style={on ? { background: sys.color, borderColor: sys.color, color: "#fff" } : undefined}
                >
                  {p.name}
                </button>
              );
            })}
          </div>

          {/* fact card — the whole-system fact, or the selected part's one-liner */}
          <div className="bodysystem-fact">
            <p>
              {part ? <><strong style={{ color: sys.color }}>{part.name}.</strong> {part.line}</> : sys.fact}
            </p>
            <Speaker
              text={part ? `${part.name}. ${part.line}` : `${sys.say} ${sys.fact}`}
              className="prose-speak"
              label={part ? `Ouvir: ${part.name.toLowerCase()}` : `Ouvir o sistema ${sys.name.toLowerCase()}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
