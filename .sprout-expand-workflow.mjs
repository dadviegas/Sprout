export const meta = {
  name: 'expand-lessons',
  description: 'Bring every Sprout lesson up to spec: full structure, curriculum-aligned content, 8+ questions per quiz',
  phases: [
    { title: 'Expandir lições', detail: 'one agent per lesson rewrites its .md to the gold-standard structure' },
  ],
}

// Lesson .md paths (relative to repo root). Inlined for a self-contained run
// (args is not reliably forwarded when invoking via scriptPath).
const files = ["apps/web/src/content/artistica/ano1/as-cores.md","apps/web/src/content/artistica/ano1/linhas-e-formas.md","apps/web/src/content/artistica/ano1/sons.md","apps/web/src/content/artistica/ano2/faz-de-conta.md","apps/web/src/content/artistica/ano2/instrumentos.md","apps/web/src/content/artistica/ano2/misturar-cores.md","apps/web/src/content/artistica/ano3/danca.md","apps/web/src/content/artistica/ano3/ritmo.md","apps/web/src/content/artistica/ano3/tecnicas.md","apps/web/src/content/artistica/ano4/compositores.md","apps/web/src/content/artistica/ano4/dancas-do-mundo.md","apps/web/src/content/artistica/ano4/pintores-famosos.md","apps/web/src/content/cidadania/ano1/direitos-e-deveres.md","apps/web/src/content/cidadania/ano1/reciclar.md","apps/web/src/content/cidadania/ano1/todos-diferentes.md","apps/web/src/content/cidadania/ano2/ajudar.md","apps/web/src/content/cidadania/ano2/emocoes.md","apps/web/src/content/cidadania/ano2/poupar.md","apps/web/src/content/cidadania/ano3/consumir.md","apps/web/src/content/cidadania/ano3/igualdade.md","apps/web/src/content/cidadania/ano3/internet-segura.md","apps/web/src/content/cidadania/ano4/democracia.md","apps/web/src/content/cidadania/ano4/saude-bem-estar.md","apps/web/src/content/cidadania/ano4/sustentavel.md","apps/web/src/content/estudo-do-meio/ano1/a-minha-familia.md","apps/web/src/content/estudo-do-meio/ano1/dias-da-semana.md","apps/web/src/content/estudo-do-meio/ano1/higiene-e-saude.md","apps/web/src/content/estudo-do-meio/ano1/o-meu-corpo.md","apps/web/src/content/estudo-do-meio/ano1/os-cinco-sentidos.md","apps/web/src/content/estudo-do-meio/ano1/seguranca.md","apps/web/src/content/estudo-do-meio/ano2/a-agua.md","apps/web/src/content/estudo-do-meio/ano2/estacoes-do-ano.md","apps/web/src/content/estudo-do-meio/ano2/os-animais.md","apps/web/src/content/estudo-do-meio/ano2/profissoes.md","apps/web/src/content/estudo-do-meio/ano2/seres-vivos.md","apps/web/src/content/estudo-do-meio/ano3/alimentacao-saudavel.md","apps/web/src/content/estudo-do-meio/ano3/as-plantas.md","apps/web/src/content/estudo-do-meio/ano3/eletricidade-e-imanes.md","apps/web/src/content/estudo-do-meio/ano3/portugal.md","apps/web/src/content/estudo-do-meio/ano3/solidos-liquidos-gases.md","apps/web/src/content/estudo-do-meio/ano4/mapas-e-pontos-cardeais.md","apps/web/src/content/estudo-do-meio/ano4/proteger-o-ambiente.md","apps/web/src/content/estudo-do-meio/ano4/sistema-solar.md","apps/web/src/content/estudo-do-meio/ano4/sistemas-do-corpo.md","apps/web/src/content/fisica/ano1/aquecer-e-descansar.md","apps/web/src/content/fisica/ano1/jogos-e-brincadeiras.md","apps/web/src/content/fisica/ano1/mexer-o-corpo.md","apps/web/src/content/fisica/ano2/desportivismo.md","apps/web/src/content/fisica/ano2/equilibrio-e-coordenacao.md","apps/web/src/content/fisica/ano2/jogos-tradicionais.md","apps/web/src/content/fisica/ano3/corpo-em-exercicio.md","apps/web/src/content/fisica/ano3/desportos.md","apps/web/src/content/fisica/ano3/ginastica.md","apps/web/src/content/fisica/ano4/desporto-em-seguranca.md","apps/web/src/content/fisica/ano4/jogos-olimpicos.md","apps/web/src/content/fisica/ano4/vida-ativa.md","apps/web/src/content/ingles/ano1/colours.md","apps/web/src/content/ingles/ano1/hello.md","apps/web/src/content/ingles/ano1/numbers-11-20.md","apps/web/src/content/ingles/ano1/numbers.md","apps/web/src/content/ingles/ano2/animals.md","apps/web/src/content/ingles/ano2/food-basics.md","apps/web/src/content/ingles/ano2/my-body.md","apps/web/src/content/ingles/ano2/my-family.md","apps/web/src/content/ingles/ano3/clothes.md","apps/web/src/content/ingles/ano3/food.md","apps/web/src/content/ingles/ano3/my-house.md","apps/web/src/content/ingles/ano3/toys.md","apps/web/src/content/ingles/ano4/days-months.md","apps/web/src/content/ingles/ano4/jobs.md","apps/web/src/content/ingles/ano4/weather.md","apps/web/src/content/ingles/ano4/what-time-is-it.md","apps/web/src/content/matematica/ano1/comparar.md","apps/web/src/content/matematica/ano1/dobro-metade.md","apps/web/src/content/matematica/ano1/formas.md","apps/web/src/content/matematica/ano1/numeros-ate-10.md","apps/web/src/content/matematica/ano1/numeros-ate-20.md","apps/web/src/content/matematica/ano1/ordinais.md","apps/web/src/content/matematica/ano1/somar.md","apps/web/src/content/matematica/ano1/tempo.md","apps/web/src/content/matematica/ano2/dinheiro.md","apps/web/src/content/matematica/ano2/horas.md","apps/web/src/content/matematica/ano2/numeros-ate-100.md","apps/web/src/content/matematica/ano2/padroes.md","apps/web/src/content/matematica/ano2/par-impar.md","apps/web/src/content/matematica/ano2/solidos.md","apps/web/src/content/matematica/ano2/tabuada-2-5.md","apps/web/src/content/matematica/ano2/tabuada-3-4-10.md","apps/web/src/content/matematica/ano3/calendario.md","apps/web/src/content/matematica/ano3/comprimento-massa.md","apps/web/src/content/matematica/ano3/divisao.md","apps/web/src/content/matematica/ano3/fracoes.md","apps/web/src/content/matematica/ano3/multiplicacao.md","apps/web/src/content/matematica/ano3/multiplos.md","apps/web/src/content/matematica/ano3/numeros-1000.md","apps/web/src/content/matematica/ano4/angulos.md","apps/web/src/content/matematica/ano4/area-perimetro.md","apps/web/src/content/matematica/ano4/decimais.md","apps/web/src/content/matematica/ano4/fracoes-decimais.md","apps/web/src/content/matematica/ano4/graficos-tabelas.md","apps/web/src/content/matematica/ano4/milhao.md","apps/web/src/content/matematica/ano4/resolver-problemas.md","apps/web/src/content/matematica/ano4/volume-capacidade.md","apps/web/src/content/mundo/ano1/lendas-das-sete-cidades.md","apps/web/src/content/mundo/ano1/o-mar-e-os-animais.md","apps/web/src/content/mundo/ano1/o-que-e-uma-ilha.md","apps/web/src/content/mundo/ano1/os-acores.md","apps/web/src/content/mundo/ano1/simbolos-dos-acores.md","apps/web/src/content/mundo/ano1/vulcoes-e-lagoas.md","apps/web/src/content/mundo/ano2/comidas-e-tradicoes.md","apps/web/src/content/mundo/ano2/portugal-de-ponta-a-ponta.md","apps/web/src/content/mundo/ano2/regioes-autonomas.md","apps/web/src/content/mundo/ano2/rios-serras-cidades.md","apps/web/src/content/mundo/ano2/simbolos-de-portugal.md","apps/web/src/content/mundo/ano3/a-europa.md","apps/web/src/content/mundo/ano3/animais-do-oceano.md","apps/web/src/content/mundo/ano3/o-oceano-atlantico.md","apps/web/src/content/mundo/ano3/os-descobrimentos.md","apps/web/src/content/mundo/ano3/paises-vizinhos.md","apps/web/src/content/mundo/ano4/animais-dos-continentes.md","apps/web/src/content/mundo/ano4/bandeiras-do-mundo.md","apps/web/src/content/mundo/ano4/continentes-e-oceanos.md","apps/web/src/content/mundo/ano4/fusos-e-hemisferios.md","apps/web/src/content/mundo/ano4/maravilhas-do-mundo.md","apps/web/src/content/portugues/ano1/contos-tradicionais.md","apps/web/src/content/portugues/ano1/ler-frases.md","apps/web/src/content/portugues/ano1/maiusculas.md","apps/web/src/content/portugues/ano1/ouvir-e-falar.md","apps/web/src/content/portugues/ano1/primeiras-palavras.md","apps/web/src/content/portugues/ano1/rimas.md","apps/web/src/content/portugues/ano1/silabas.md","apps/web/src/content/portugues/ano1/vogais.md","apps/web/src/content/portugues/ano2/contar-e-recontar.md","apps/web/src/content/portugues/ano2/nome-e-acao.md","apps/web/src/content/portugues/ano2/poemas-e-lengalengas.md","apps/web/src/content/portugues/ano2/pontuacao.md","apps/web/src/content/portugues/ano2/silaba-tonica.md","apps/web/src/content/portugues/ano2/singular-plural.md","apps/web/src/content/portugues/ano2/tipos-de-frase.md","apps/web/src/content/portugues/ano3/compreensao-leitura.md","apps/web/src/content/portugues/ano3/escrever-um-texto.md","apps/web/src/content/portugues/ano3/fabulas.md","apps/web/src/content/portugues/ano3/falar-para-os-outros.md","apps/web/src/content/portugues/ano3/familia-de-palavras.md","apps/web/src/content/portugues/ano3/sinonimos-antonimos.md","apps/web/src/content/portugues/ano3/tempos-verbais.md","apps/web/src/content/portugues/ano4/acentos-ortografia.md","apps/web/src/content/portugues/ano4/adjetivos-graus.md","apps/web/src/content/portugues/ano4/autores-portugueses.md","apps/web/src/content/portugues/ano4/carta-e-convite.md","apps/web/src/content/portugues/ano4/classes-palavras.md","apps/web/src/content/portugues/ano4/ouvir-e-debater.md","apps/web/src/content/portugues/ano4/tipos-de-texto.md"]
if (!files.length) throw new Error('no files to process')

// Human subject names + a short Aprendizagens Essenciais nudge per subject folder.
const SUBJECT = {
  matematica: 'Matemática',
  portugues: 'Português',
  'estudo-do-meio': 'Estudo do Meio',
  ingles: 'Inglês',
  cidadania: 'Cidadania e Desenvolvimento',
  artistica: 'Educação Artística',
  fisica: 'Educação Física',
  mundo: 'O Mundo & Curiosidades',
}

const RESULT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    file: { type: 'string' },
    title: { type: 'string' },
    practiceQuestions: { type: 'integer' },
    finalQuestions: { type: 'integer' },
    curriculumNotes: { type: 'string', description: 'one line: what curriculum-aligned content was added' },
    status: { type: 'string', enum: ['rewritten', 'augmented', 'error'] },
  },
  required: ['file', 'practiceQuestions', 'finalQuestions', 'status'],
}

function promptFor(file) {
  const parts = file.split('/')
  const subjectFolder = parts[parts.indexOf('content') + 1]
  const yearFolder = parts[parts.indexOf('content') + 2] // e.g. ano4 (for "mundo" these are proximity rings, not grades)
  const subjectName = SUBJECT[subjectFolder] || subjectFolder
  const isIngles = subjectFolder === 'ingles'
  const isMundo = subjectFolder === 'mundo'
  const langNote = isIngles
    ? 'This is an ENGLISH lesson: the TARGET words/phrases being taught are in English, but ALL teaching text, instructions, quiz prompts and explanations stay in Portuguese (pt-PT). Follow the language mix already in the file.'
    : 'All content is in Portuguese (pt-PT), European spelling and vocabulary.'
  const gradeNote = isMundo
    ? `This belongs to "O Mundo & Curiosidades" — general culture from the Azores out to the world. "${yearFolder}" is a proximity ring, NOT a school grade: never write "X.º ano" for it. Keep the level appropriate to that ring.`
    : `This is ${yearFolder.replace('ano', '')}.º ano (1.º ciclo). Match the difficulty and vocabulary to that grade.`

  return `You are an expert Portuguese primary-school (1.º ciclo) teacher and content author for "Sprout", a kids' learning app. Your job is to rebuild ONE lesson file so it is rich, complete, curriculum-aligned, and warm — then save it.

LESSON FILE TO EDIT (edit ONLY this file, nothing else):
  ${file}
SUBJECT: ${subjectName}   ·   ${gradeNote}

STEP 1 — READ. First Read the file ${file} to learn its topic, its H1 title, and (critically) its existing quiz \`id\` values. Also Read the canonical gold-standard example apps/web/src/content/estudo-do-meio/ano4/historia-de-portugal.md to mirror its depth, tone and structure. You may also skim a sibling lesson in the same subject folder for house style.

STEP 2 — REWRITE to this EXACT structure, in order:
1. \`# <Title> <emoji>\` — KEEP the existing H1 title text unchanged.
2. A summary callout, on its own line:  \`> [!NOTE] **O que vais aprender** 👀 <one or two warm sentences on what the child will learn>\`
3. A short, friendly intro paragraph that speaks directly to the child (warm, fun, encouraging — never a dry textbook voice).
4. THREE to FIVE teaching sections, each with a \`## <heading>\` and a widget block (see ALLOWED WIDGETS). Teach the real curriculum content for this topic: definitions, worked examples, comparisons, key facts. Add genuinely MORE substance than a thin lesson — this is the whole point.
5. \`## Um exemplo passo a passo 🔍\` — a worked example using a \`steps\` block that walks through solving one concrete problem/question, step by step.
6. A mental-trick line:  \`> **Truque:** <a memory trick or shortcut>\`
7. A stretch fact, one notch above grade level:  \`> [!TIP] **Para saberes mais** 🌱 <a fascinating fact that goes a little beyond the grade>\`
8. \`## Vamos praticar 🎈\` followed by the PRACTICE quiz block.
9. The EXACT line \`## 🎯 Questionário final\` followed by the FINAL quiz block.

CURRICULUM ALIGNMENT (very important): Fill the lesson with what is actually taught in Portuguese 1.º ciclo classes for this topic (Aprendizagens Essenciais / Metas Curriculares). Be accurate and concrete. Prefer real names, real numbers, real examples over vague filler.

ALLOWED WIDGET BLOCKS (fenced code blocks; bodies MUST be valid JSON):
- \`keyvalue\`: [ { "k": "term", "v": "meaning 🙂" }, ... ]
- \`steps\`: [ { "title": "step", "body": "detail", "icon": "optional @sprout/icons name or emoji" }, ... ]
- \`compare\`: [ { "title": "Group A", "rows": [ { "label": "x", "value": "y", "highlight": false } ] }, ... ]
- \`stats\`: [ { "label": "x", "value": "12", "hint": "note" }, ... ]
- \`meters\`: [ { "label": "🐬 thing", "value": 2, "max": 30, "tone": "ok" }, ... ]   (tone "ok" or "warn", optional)
- Math-only widgets you MAY use when relevant: \`numberline\`, \`tenframe\`, \`fraction\`, \`money\`, \`clock\`, \`shape\`. Only use these if you are confident of their JSON shape from an existing math lesson you Read; otherwise stick to keyvalue/steps/compare/stats.
- Callouts (plain markdown, NOT json): \`> [!NOTE]\`, \`> [!TIP]\`, \`> [!WARNING]\`, or a plain \`> quote\` line.
Do NOT invent new block languages. If unsure about a widget's JSON, use \`keyvalue\` or \`steps\`.

QUIZ BLOCKS — strict schema (each is a \`\`\`quiz fenced block whose body is valid JSON):
{
  "id": "<KEEP THE EXISTING id from the file>",
  "questions": [
    { "q": "question text?", "layout": "grid",
      "options": [ { "t": "answer", "emoji": "🙂", "correct": true }, { "t": "distractor", "emoji": "😅" }, { "t": "another" } ],
      "explain": "short reason the answer is right" },
    ...
  ]
}
- The PRACTICE quiz keeps the file's existing practice id (it ends in "-pratica").
- The FINAL quiz adds \`"final": true\` and \`"title": "<the lesson title>"\`, and keeps the file's existing final id (it ends in "-final").
- If the file currently lacks one of the two quizzes, CREATE it and derive its id from the other quiz's prefix (e.g. "<prefix>-pratica" / "<prefix>-final"). NEVER change an id that already exists — progress tracking depends on it.
- REQUIREMENT: the practice quiz MUST have AT LEAST 8 questions, and the final quiz MUST have AT LEAST 8 questions. Different, well-spread questions that cover the whole lesson; gentle/short wording for younger years.
- Every question: a non-empty "q", "layout": "grid", at least 2 options, EXACTLY ONE option with "correct": true, and a short "explain". Each option needs at least a "t" (text) — "emoji" is optional and encouraged.
- Keep questions age-appropriate and answerable by listening (the youngest children can't read yet, so phrasing must be simple and clear). Emoji ARE welcome inside lesson content and quizzes.

LANGUAGE: ${langNote}

CONVENTIONS:
- Preserve anything already good in the file; ADD and DEEPEN rather than delete correct content.
- Warm, empathetic, fun tone throughout. Speak to the child ("tu").
- Emoji are fine inside lesson content and quizzes; do not add emoji to nothing-but-chrome, but here it's all content so emoji are welcome.
- Output valid Markdown. JSON inside fenced blocks must parse with JSON.parse (double quotes, no trailing commas, no comments).

STEP 3 — SAVE: Write the COMPLETE new file content to ${file} (overwrite). Then re-read your quiz blocks once mentally to confirm both have ≥8 questions and valid JSON.

Return the structured result describing what you produced. status "rewritten" if you substantially rebuilt it, "augmented" if it was already good and you mostly topped it up, "error" if something blocked you.`
}

phase('Expandir lições')
log(`Expanding ${files.length} lessons to spec (8+ questions per quiz, full structure, curriculum-aligned)…`)

const results = await parallel(
  files.map((file) => () =>
    agent(promptFor(file), {
      label: file.split('/').slice(-2).join('/'),
      phase: 'Expandir lições',
      schema: RESULT_SCHEMA,
    })
  )
)

const ok = results.filter(Boolean)
const errored = ok.filter((r) => r.status === 'error')
const thin = ok.filter((r) => (r.practiceQuestions ?? 0) < 8 || (r.finalQuestions ?? 0) < 8)
log(`Done: ${ok.length}/${files.length} returned · ${errored.length} self-reported errors · ${thin.length} self-reported <8 questions`)

return {
  total: files.length,
  returned: ok.length,
  errors: errored.map((r) => r.file),
  underEight: thin.map((r) => ({ file: r.file, p: r.practiceQuestions, f: r.finalQuestions })),
  results: ok,
}
