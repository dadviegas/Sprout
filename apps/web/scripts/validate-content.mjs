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
  "shape", "clock", "numberline", "tenframe", "fraction", "money", "shop", "solarsystem", "daynight", "soundcards", "dictionary", "tabuada", "math", "chart",
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
  const isReference = parts.includes("estudo") || parts.includes("dicionario");
  if (isReference) return;

  if (markerAt < 0) errors.push(`${rel}: falta o marcador do teste final "${FINAL_MARKER}"`);
  if (finalQuizzes === 0) errors.push(`${rel}: sem quiz 'final: true' (teste final)`);
  if (finalQuizzes > 1) warnings.push(`${rel}: ${finalQuizzes} quizzes 'final: true' (esperado 1)`);
}

const files = findMarkdown(CONTENT_DIR).sort();
const errors = [];
const warnings = [];
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
