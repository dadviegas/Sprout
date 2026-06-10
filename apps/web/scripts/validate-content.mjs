#!/usr/bin/env node
/* ------------------------------------------------------------------ *
 * Content linter — validates every lesson's fenced blocks BEFORE they
 * reach the runtime parser (Markdown.tsx), where a bad block would only
 * surface as an error card when that lesson happens to be opened.
 *
 * Checks, per .md under src/content:
 *   - every known block (quiz/widget/infographic) is valid JSON;
 *   - quizzes are well-formed (questions, options, a correct answer);
 *   - the lesson has a final questionnaire (the "## 🎯 …" marker + a
 *     `final: true` quiz), and quiz ids don't collide within the lesson.
 *
 * Runs with zero dependencies. Exits non-zero on any error so it can gate
 * the build (`pnpm build` runs it first). Run directly: `pnpm validate`.
 * ------------------------------------------------------------------ */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CONTENT_DIR = join(ROOT, "src", "content");
const FINAL_MARKER = "## 🎯 Questionário final";

// Block languages parsed as JSON by Markdown.tsx. Keep in sync with the
// `widgetRenderers` / `infographicRenderers` maps + the `quiz` branch there.
const JSON_BLOCKS = new Set([
  "quiz",
  "shape", "angle", "areagrid", "symmetry", "compass", "watercycle", "clock", "numberline", "tenframe", "fraction", "fractionstrips", "fractionof", "money", "shop", "solarsystem", "daynight", "soundcards", "dictionary", "verbs", "colors", "colormix", "atlas", "sizecompare", "tabuada", "drill", "figure", "math", "chart", "timeline", "bodysystem", "mapapt",
  "volcano", "skyblue", "buoyancy", "lifecycle", "foodchain", "layers",
  "summary", "stats", "steps", "meters", "keyvalue", "compare", "quote",
]);

/** All `.md` files under a directory, recursively, as absolute paths. */
function findMarkdown(dir) {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".md"))
    .map((d) => join(d.parentPath ?? d.path, d.name));
}

/** Fenced blocks in a markdown string: { lang, body, line } in document order. */
function fencedBlocks(md) {
  const out = [];
  const re = /^```([A-Za-z0-9_-]+)[ \t]*\r?\n([\s\S]*?)\r?\n```/gm;
  let m;
  while ((m = re.exec(md))) {
    const line = md.slice(0, m.index).split("\n").length;
    out.push({ lang: m[1], body: m[2], line, index: m.index });
  }
  return out;
}

function validateQuiz(spec, where, errors) {
  if (typeof spec !== "object" || spec === null) {
    errors.push(`${where}: quiz não é um objeto`);
    return;
  }
  if (!Array.isArray(spec.questions) || spec.questions.length === 0) {
    errors.push(`${where}: quiz sem 'questions' (lista não vazia)`);
    return;
  }
  spec.questions.forEach((q, qi) => {
    const at = `${where} · pergunta ${qi + 1}`;
    // A `gen` question is built at run time (q + figure + options), so it has
    // no static text/options to validate here — just check the recipe shape.
    if (q && typeof q.gen === "object" && q.gen !== null) {
      if (typeof q.gen.kind !== "string") errors.push(`${at}: 'gen' precisa de 'kind'`);
      return;
    }
    if (!q || typeof q.q !== "string" || q.q.trim() === "") errors.push(`${at}: falta o texto 'q'`);
    if (!Array.isArray(q.options) || q.options.length < 2) {
      errors.push(`${at}: precisa de pelo menos 2 'options'`);
      return;
    }
    if (!q.options.some((o) => o && o.correct === true)) errors.push(`${at}: nenhuma opção tem 'correct: true'`);
    if (q.options.filter((o) => o && o.correct === true).length > 1) errors.push(`${at}: mais do que uma opção 'correct: true'`);
    q.options.forEach((o, oi) => {
      if (!o || (typeof o.t !== "string" && typeof o.emoji !== "string")) {
        errors.push(`${at} · opção ${oi + 1}: precisa de 't' ou 'emoji'`);
      }
    });
  });
}

// Infographic blocks render from a TOP-LEVEL ARRAY of items. A valid-JSON but
// wrong-shaped block (e.g. an object `{ "items": [...] }`) used to crash the
// whole lesson at render time (`columns.map is not a function`), so we reject
// the shape here. Required keys mirror the component interfaces in
// packages/ui/src/Infographic.tsx.
const INFOGRAPHIC = {
  steps: { required: ["title"], wrongKey: { text: "title" } },
  stats: { required: ["value", "label"] },
  meters: { required: ["label", "value"] },
  keyvalue: { required: ["k", "v"], wrongKey: { label: "k", value: "v" } },
  compare: { required: ["title", "rows"] },
};

function validateInfographic(lang, data, where, errors) {
  const spec = INFOGRAPHIC[lang];
  if (!spec) return;
  // `steps` also accepts `{ "reveal": true, "items": [ … ] }` (retrieval
  // practice — Markdown.tsx unwraps it the same way before rendering).
  if (lang === "steps" && data !== null && typeof data === "object" && Array.isArray(data.items)) {
    data = data.items;
  }
  if (!Array.isArray(data)) {
    errors.push(`${where}: bloco '${lang}' tem de ser uma LISTA [ … ] (encontrei um objeto { … })`);
    return;
  }
  data.forEach((item, i) => {
    const at = `${where} · item ${i + 1}`;
    if (typeof item !== "object" || item === null) {
      errors.push(`${at}: deve ser um objeto`);
      return;
    }
    for (const key of spec.required) {
      if (!(key in item)) {
        const swapped = spec.wrongKey && Object.entries(spec.wrongKey).find(([w, r]) => r === key && w in item);
        errors.push(`${at}: falta '${key}'${swapped ? ` (encontrei '${swapped[0]}' — usa '${key}')` : ""}`);
      }
    }
    if (lang === "compare") {
      if (item.rows !== undefined && !Array.isArray(item.rows)) errors.push(`${at}: 'rows' tem de ser uma lista`);
      if (Array.isArray(item.rows)) {
        item.rows.forEach((r, ri) => {
          if (!r || typeof r !== "object" || !("label" in r) || !("value" in r)) {
            const kv = r && typeof r === "object" && ("k" in r || "v" in r);
            errors.push(`${at} · linha ${ri + 1}: precisa de 'label' e 'value'${kv ? " (encontrei 'k'/'v' — usa 'label'/'value')" : ""}`);
          }
        });
      }
    }
  });
}

/* The `verbs` block (the Biblioteca's conjugation cards): every entry needs a
 * `verb` and a `meaning`; an irregular verb's `forms` table, if present, must
 * carry the five tenses with the right number of forms (6/6/6/6/3). Regular
 * verbs are conjugated on the fly, so they only need verb + meaning. */
function validateVerbs(data, where, errors) {
  if (typeof data !== "object" || data === null || !Array.isArray(data.verbs)) {
    errors.push(`${where}: bloco 'verbs' precisa de um objeto com 'verbs: [ … ]'`);
    return;
  }
  const FORM_LEN = { presente: 6, perfeito: 6, imperfeito: 6, futuro: 6, imperativo: 3 };
  data.verbs.forEach((v, i) => {
    const at = `${where} · verbo ${i + 1}`;
    if (typeof v !== "object" || v === null) { errors.push(`${at}: deve ser um objeto`); return; }
    if (typeof v.verb !== "string" || !v.verb.trim()) errors.push(`${at}: falta 'verb'`);
    if (typeof v.meaning !== "string" || !v.meaning.trim()) errors.push(`${at}: falta 'meaning'`);
    if (v.forms !== undefined) {
      for (const [tense, len] of Object.entries(FORM_LEN)) {
        const arr = v.forms[tense];
        // The imperativo may be [] (verbs like poder/querer have none); every
        // other tense needs its full set of forms.
        const ok = Array.isArray(arr) && (arr.length === len || (tense === "imperativo" && arr.length === 0));
        if (!ok) errors.push(`${at} (${v.verb ?? "?"}): 'forms.${tense}' tem de ter ${len} formas${tense === "imperativo" ? " (ou 0)" : ""}`);
      }
    }
  });
}

/* The `dictionary` block (the Biblioteca's word cards): every entry needs a
 * `word` and a `meaning`; the optional `class` (part of speech) must be one of
 * the ten word classes and the optional `tema` one of the twelve themes — verbs
 * are derived from verbos/*.md, not listed here. */
const WORD_CLASSES = new Set([
  "nome", "verbo", "adjetivo", "adverbio", "numeral",
  "pronome", "interjeicao", "artigo", "preposicao", "conjuncao",
]);
const WORD_THEMES = new Set([
  "animais", "comida", "corpo", "casa", "escola", "natureza",
  "transportes", "roupa", "cores", "tempo", "pessoas", "portugal",
]);
function validateDictionary(data, where, errors) {
  if (typeof data !== "object" || data === null || !Array.isArray(data.entries)) {
    errors.push(`${where}: bloco 'dictionary' precisa de um objeto com 'entries: [ … ]'`);
    return;
  }
  data.entries.forEach((e, i) => {
    const at = `${where} · palavra ${i + 1}`;
    if (typeof e !== "object" || e === null) { errors.push(`${at}: deve ser um objeto`); return; }
    if (typeof e.word !== "string" || !e.word.trim()) errors.push(`${at}: falta 'word'`);
    if (typeof e.meaning !== "string" || !e.meaning.trim()) errors.push(`${at}: falta 'meaning'`);
    if (e.class !== undefined && !WORD_CLASSES.has(e.class))
      errors.push(`${at} (${e.word ?? "?"}): 'class' inválida '${e.class}' — usa uma de: ${[...WORD_CLASSES].join(", ")}`);
    if (e.tema !== undefined && !WORD_THEMES.has(e.tema))
      errors.push(`${at} (${e.word ?? "?"}): 'tema' inválido '${e.tema}' — usa um de: ${[...WORD_THEMES].join(", ")}`);
  });
}

/* The `colors` block ("As Cores"): every entry needs a `name` and a 6-digit
 * `hex` (the RGB is derived from it at render time). */
function validateColors(data, where, errors) {
  if (typeof data !== "object" || data === null || !Array.isArray(data.colors)) {
    errors.push(`${where}: bloco 'colors' precisa de um objeto com 'colors: [ … ]'`);
    return;
  }
  data.colors.forEach((c, i) => {
    const at = `${where} · cor ${i + 1}`;
    if (typeof c !== "object" || c === null) { errors.push(`${at}: deve ser um objeto`); return; }
    if (typeof c.name !== "string" || !c.name.trim()) errors.push(`${at}: falta 'name'`);
    if (typeof c.hex !== "string" || !/^#?[0-9a-fA-F]{6}$/.test(c.hex)) errors.push(`${at} (${c.name ?? "?"}): 'hex' tem de ser 6 dígitos, ex. "#E23B3B"`);
  });
}

/* The `atlas` block ("Atlas da Vida"): every animal/plant needs a `name` and
 * where it is `native`; `seen`/`photos` are optional. */
function validateAtlas(data, where, errors) {
  if (typeof data !== "object" || data === null || !Array.isArray(data.items)) {
    errors.push(`${where}: bloco 'atlas' precisa de um objeto com 'items: [ … ]'`);
    return;
  }
  data.items.forEach((e, i) => {
    const at = `${where} · ser vivo ${i + 1}`;
    if (typeof e !== "object" || e === null) { errors.push(`${at}: deve ser um objeto`); return; }
    if (typeof e.name !== "string" || !e.name.trim()) errors.push(`${at}: falta 'name'`);
    if (typeof e.native !== "string" || !e.native.trim()) errors.push(`${at} (${e.name ?? "?"}): falta 'native' (de onde é natural)`);
  });
}

function validateFile(absPath, errors, warnings) {
  const rel = relative(ROOT, absPath);
  const md = readFileSync(absPath, "utf8");
  const blocks = fencedBlocks(md);

  const quizIds = new Map(); // id -> count, to catch within-lesson collisions
  let finalQuizzes = 0;
  const markerAt = md.indexOf(FINAL_MARKER);

  for (const b of blocks) {
    if (!JSON_BLOCKS.has(b.lang)) continue;
    let data;
    try {
      data = JSON.parse(b.body);
    } catch (e) {
      errors.push(`${rel}:${b.line}: bloco '${b.lang}' com JSON inválido — ${e.message}`);
      continue;
    }
    validateInfographic(b.lang, data, `${rel}:${b.line}`, errors);
    if (b.lang === "verbs") validateVerbs(data, `${rel}:${b.line}`, errors);
    if (b.lang === "dictionary") validateDictionary(data, `${rel}:${b.line}`, errors);
    if (b.lang === "colors") validateColors(data, `${rel}:${b.line}`, errors);
    if (b.lang === "atlas") validateAtlas(data, `${rel}:${b.line}`, errors);
    if (b.lang !== "quiz") continue;

    validateQuiz(data, `${rel}:${b.line}`, errors);
    if (data && typeof data.id === "string") quizIds.set(data.id, (quizIds.get(data.id) ?? 0) + 1);
    else warnings.push(`${rel}:${b.line}: quiz sem 'id' (recomendado para o progresso)`);
    if (data && data.final === true) {
      finalQuizzes++;
      if (markerAt >= 0 && b.index < markerAt) warnings.push(`${rel}:${b.line}: quiz 'final: true' antes do marcador "${FINAL_MARKER}"`);
    }
  }

  for (const [id, n] of quizIds) if (n > 1) errors.push(`${rel}: id de quiz repetido '${id}' (${n}×) — colide no progresso`);

  // Reference pages (the "Saber de cor" study area and "O Dicionário") are not
  // graded lessons, so they're exempt from the final-test requirement — they
  // just hold things to know (tabuadas, alfabeto, word meanings by letter, …)
  // with read-aloud, no questionnaire.
  const parts = rel.split(/[\\/]/);
  const isReference =
    parts.includes("estudo") || parts.includes("dicionario") || parts.includes("verbos") ||
    parts.includes("cores") || parts.includes("atlas");
  if (isReference) return;

  if (markerAt < 0) errors.push(`${rel}: falta o marcador do teste final "${FINAL_MARKER}"`);
  if (finalQuizzes === 0) errors.push(`${rel}: sem quiz 'final: true' (teste final)`);
  if (finalQuizzes > 1) warnings.push(`${rel}: ${finalQuizzes} quizzes 'final: true' (esperado 1)`);
}

const files = findMarkdown(CONTENT_DIR).sort();
const errors = [];
const warnings = [];

// Every lesson .md must be imported by the content graph — otherwise it
// validates fine here (it's read straight off disk) but never appears in the
// app's nav. This is the "orphan" check: a wired lesson is reachable, a stray
// file is not. Imports live in curriculum.ts AND its sibling content modules
// (e.g. enciclopedia.ts), so we scan every .ts directly under src/content.
const contentTs = readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.endsWith(".ts"))
  .map((d) => readFileSync(join(CONTENT_DIR, d.name), "utf8"))
  .join("\n");
for (const f of files) {
  const rel = relative(CONTENT_DIR, f).split(/[\\/]/).join("/");
  if (/(^|\/)(README|_[^/]*)\.md$/i.test(rel)) continue; // notes/partials, not lessons
  if (!contentTs.includes(`"./${rel}"`)) {
    errors.push(`${relative(ROOT, f)}: não está importado no conteúdo (curriculum.ts / enciclopedia.ts) — lição inacessível na app`);
  }
}

for (const f of files) validateFile(f, errors, warnings);

if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} aviso(s):`);
  for (const w of warnings) console.log(`   ${w}`);
}

if (errors.length) {
  console.error(`\n❌ ${errors.length} erro(s) de conteúdo:`);
  for (const e of errors) console.error(`   ${e}`);
  console.error(`\nValidação falhou em ${files.length} lições.\n`);
  process.exit(1);
}

console.log(`\n✅ Conteúdo válido — ${files.length} lições, blocos JSON e testes finais OK.\n`);
