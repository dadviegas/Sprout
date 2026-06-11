# Plano de Estudo e Recuperação — Sprout

> **Este é o ficheiro a seguir para continuar a implementar funcionalidades novas.**
> Lê-o antes de começar; atualiza-o à medida que entregas. Para *conteúdo de
> matéria em falta* vê `docs/MATERIA_EM_FALTA.md` e `docs/COVERAGE.md` — aqui o
> foco é o **motor de estudo** (plano, revisão, sessões, área dos pais) e as
> melhorias transversais de conteúdo que o motor exige.

---

## 0. O coração da app (porquê)

A Sprout deixa de ser "só matéria". Passa a:

1. **perceber onde a criança falha** (diagnóstico + banco de erros);
2. **criar treino automático** a partir desses erros (revisão espaçada + missões);
3. **mostrar aos pais** o que aconteceu, em linguagem clara (alertas + relatório);
4. **transformar as férias num plano de recuperação** suave e diário.

Há duas crianças reais a guiar todas as decisões — são as nossas *personas*:

- **A 4.º ano em risco de não passar.** Precisa de recuperar matérias fracas
  (leitura, problemas escritos) sem mensagens negativas. Mede-se em progresso
  semanal, não em notas absolutas.
- **O 1.º ano que ainda não lê.** Tudo tem de ser ouvível, com imagens, sílabas
  grandes, pouco texto e respostas por toque/arrasto. Ver
  [[read-aloud-everywhere]] e [[speech-only-on-button-click]].

Tom sempre empático e motivador ([[tone-empathetic-fun]]): nunca *"Estás mal a
Matemática"*; sempre *"A Matemática precisa de treino. Vamos recuperar aos
poucos."*

---

## 1. Princípios de implementação (não negociáveis)

- **Estende, não dupliques.** Grande parte disto **já existe** (ver §2). Liga as
  peças novas às existentes; não cries um segundo sistema de progresso/sessões.
- **KISS / DRY.** Sem frameworks novas, sem camadas que um júnior não leia à
  primeira. Uma só fonte de verdade por facto.
- **Código e comentários em inglês; UI e conteúdo em pt-PT** ([[code-in-english]]).
- **Sem emoji na *chrome*** (botões, badges, nav) — usa `@sprout/icons`.
- **Ler em voz alta em todo o lado**, e **só por toque/clique** — nunca em
  arrasto, hover ou automaticamente.
- **A UI tem de ser muito forte.** Ver §9 — é um requisito, não um extra.
- Depois de cada alteração: `pnpm validate` e `pnpm typecheck`.

---

## 2. O que JÁ existe (não reconstruir)

Antes de construir, conhece o que já está feito. Quase todo o módulo "dados de
estudo" tem alicerces:

| Peça | Onde | O que faz hoje |
|---|---|---|
| **Facade de armazenamento** | `apps/web/src/storage/index.ts` + `backend.ts` | KV durável (IndexedDB) com espelho em localStorage, leitura síncrona, *backend* trocável numa linha (`createBackend`). **É a costura para o Supabase.** |
| **Progresso por lição** | `apps/web/src/progress.tsx` | Por lição: `visited`, `done`, `bestStars`, `bestPct`, melhor score por quiz. Chave `sprout.progress.v1`. |
| **Registo de conquistas** | `progress.tsx` (`Achievement`) | Log *append-only* de cada teste final concluído, com data, disciplina, ano, estrelas, %, e **duração em segundos** (`secs`). Chave `sprout.achievements.v1`. **É a base do calendário e dos relatórios.** |
| **Histórico recente** | `progress.tsx` | Últimas 20 lições abertas. Chave `sprout.history.v1`. |
| **Área dos pais** | `apps/web/src/ParentArea.tsx` | Agora uma **página** (`#/pais`) atrás de um *gate* de multiplicação: alertas, cartão de hoje + minutos de tablet, *streaks*, gráficos de minutos/disciplina, calendário planeado-vs-feito, últimos testes com tempos, uso diário, heatmap, detalhe do dia, recompensas, "Limpar tudo" (modal próprio no menu). |
| **Simulado** | `apps/web/src/Simulado.tsx` | Teste-treino misto por disciplina+ano, junta todas as perguntas das lições, reusa o motor `Quiz`, escreve num id sintético (não polui o progresso). **É a base do diagnóstico.** |
| **Missões** | `apps/web/src/content/missoes.ts` | Sequências nomeadas de artigos → ganha um cromo; progresso *derivado*, nada novo guardado. **É a base das missões curtas.** |
| **Motor de Quiz** | `apps/web/src/Quiz.tsx` | Perguntas com `options` (auto-baralhadas), `explain` (uma linha pós-resposta), figuras de fração, perguntas dinâmicas (`gen`), estrelas/confetti, *read-aloud*. |
| **Recompensa de tablet** | `ParentArea.tsx` (`tabletMinutesToday`) | Um dia "conta" quando passa 1 teste a ≥80%; minutos = base + por-estrela. |

**Já entregue entretanto (2026-06-10):**

- **Sessões** — `study/sessions.ts` + `sprout.sessions.v1` (tempo ativo,
  esconder/sair do browser, teto de 500). Ver §4.1.
- **Plano diário + calendário -1/+2 meses** — `study/plan.ts` +
  `study/Plano.tsx`, rota `#/plano`. Ver §4.9.
- **Gate de 80%** — `TEST_PASS_PCT` em `progress.tsx`; abaixo fica "a repetir".
- **Área dos pais como página** (`#/pais`) com gráficos, métricas de tempo,
  calendário planeado-vs-feito e alertas (`study/alerts.ts`). Ver §4.11.
- **Banco de erros / revisão espaçada** — `study/review.ts` +
  `sprout.review.v1`, ligado ao `Quiz` por pergunta. Ver §4.2.
- **Relatório semanal** — `study/report.ts` + cartão `WeeklyReportCard` na
  Área dos Pais. Ver §4.11.
- **Modo pré-leitor (mínimo)** — flag em `sprout.ui.v1` (`ui-prefs.ts`),
  auto no 1.º ano, alternável na Área dos Pais. Ver §4.10.

**Já entregue entretanto (2026-06-11):**

- **Modo férias / recuperar o ano** — `study/ferias.ts` + `sprout.plan.v1`,
  ligado ao `#/plano`, `#/pais` e à nota da semana. Ver §4.8.
- **Histórico de planos + mudar de ano + exame final de ano** —
  `sprout.plan.v1` agora é `{ active, history }` (com migração silenciosa);
  exame 0–20 em `Simulado.tsx` (`buildExame` + `ExameModal`). Ver §4.8.
- **Exportar dados (JSON)** — botão na Área dos Pais (Definições) que descarrega
  todas as chaves `sprout.*` num ficheiro (`store.exportAll()`).
- **"Plano completo" calendar-first** — `study/PlanoCompleto.tsx`, rota
  `#/plano/completo` (View `plano-completo`): **todos os meses do plano** em
  grelha (início → fim previsto) com ícones de disciplina por dia, painel de
  detalhe tocável, lista "Dia a dia" atrás de um toggle, totais de tempo.
  Os mesmos marcadores por dia aparecem no calendário do `#/plano`
  (`PlanDayMarks` partilhado). Ver §4.9.
- **Disciplinas obrigatórias no plano de férias** (`MANDATORY_SUBJECTS_1C`) e
  **ritmo seg–sex + sábado de revisão** em `study/ferias.ts`/`plan.ts`. Ver §4.8.
- **Segmentos ativo/parado por sessão** — `sessionSegments` em
  `study/usage.ts` + barra de segmentos na Área dos Pais. Ver §4.11.
- **Diagnóstico inicial** — `study/diagnostico.ts` + `DiagnosticoModal`
  (`Simulado.tsx`) + `sprout.diagnostic.v1`; reordena a fila de um plano novo
  (matérias fracas primeiro) e mostra um cartão aos pais. Ver §4.7.
- **TPC** — `study/tpc.ts` + `sprout.tpc.v1`; os pais marcam 1–3 lições com
  prazo na Área dos Pais (tab Estudo) e a criança vê-as como missões
  PRIORITÁRIAS no `#/plano`. Ver §4.12.

**Lacunas reais** (o que ainda não existe):

- **Nenhum módulo do motor falta** — TPC e diagnóstico fecharam a lista
  (2026-06-11, fase 19B). O que resta são extensões do *Quiz* e conteúdo:
- **Dificuldade por pergunta** (§4.4), **modo "estudar com ajuda"** (§4.5),
  **passo a passo nas perguntas** (§4.3) e widgets novos do pré-leitor
  (arrastar letras / completar palavra, §4.10).

---

## 3. Arquitetura de dados (IndexedDB agora → Supabase depois)

### A costura já está pronta

O Supabase **não exige reescrever a app**. Implementa a interface
`StorageBackend` (`apps/web/src/storage/backend.ts`) num `SupabaseBackend` e
troca a linha em `createBackend()`. Nada mais muda — todos os *callers* usam
`store.getSync` / `store.set`.

```ts
// backend.ts — a forma a manter
export function createBackend(): StorageBackend {
  if (typeof window === "undefined") return new MemoryBackend();
  if (SUPABASE_ENABLED && SupabaseBackend.isAvailable()) return new SupabaseBackend();
  if (IndexedDBBackend.isAvailable()) return new IndexedDBBackend();
  return new NullBackend();
}
```

**Nota de escala (importante):** o facade hoje carrega **todas** as chaves para
memória no arranque e guarda *blobs* JSON. Logs *append-only* que crescem sem
limite (sessões, eventos) têm de ser **limitados/rotacionados** como o histórico
já faz (`MAX_HISTORY = 20`). Mantém cada log com um teto (ex.: 500 sessões) e
deita fora as mais antigas. No Supabase estes logs passam a **linhas próprias**
(ver §10) e o teto deixa de ser preciso.

### Novas chaves de armazenamento

Tudo com o prefixo `sprout.` e versionado (`.v1`):

| Chave | Conteúdo |
|---|---|
| `sprout.sessions.v1` | ✅ **feito** — `StudySession[]` (append-only, teto 500, mais recente primeiro; `study/sessions.ts`) |
| `sprout.review.v1` | ✅ **feito** — `Record<string, ReviewItem>`, banco de erros / agenda de revisão (`study/review.ts`, teto 400, os mais fortes rodam primeiro) |
| `sprout.plan.v1` | ✅ **feito** — `{ active: StudyPlan \| null, history: PlanRecord[] }` do modo férias (`study/ferias.ts`, §4.8): a fila ordenada + `doneSteps` do plano ativo e o arquivo dos planos passados (com `examPct`); agendamento derivado. Um valor antigo (StudyPlan "nu") migra sozinho para `{ active, history: [] }`. O plano **diário** (§4.9) continua 100% derivado e não usa esta chave. |
| `sprout.diagnostic.v1` | ✅ **feito** — `Diagnostic` (`study/diagnostico.ts`, §4.7): `{ year, at, pct, bySubject }` — só o último diagnóstico (um novo sobrescreve) |
| `sprout.tpc.v1` | ✅ **feito** — `Tpc[]` (`study/tpc.ts`, §4.12): `{ id, lessonIds, dueDate, createdAt, doneAt? }`, mais recente primeiro, teto 30 (só os FEITOS rodam para fora) |
| `sprout.children.v1` | *(futuro)* perfis de criança para multi-criança/Supabase |

> **Nota de implementação (2026-06-10):** os tipos vivem junto de cada módulo
> (`StudySession` em `study/sessions.ts`, `Mission` em `study/plan.ts`,
> `ParentAlert` em `study/alerts.ts`) em vez de um `study/types.ts` central —
> KISS enquanto só há um consumidor por tipo. O `StudySession` real difere do
> rascunho abaixo: `secs` (tempo ativo), `kind: "lesson"|"test"|"game"`,
> `events: {type, at}[]` (browser_hidden/returned/exit), `exited`, `completed`,
> `score?`. O `Mission` real é derivado (sem `dueDate`/persistência):
> `{ id, kind: "repetir"|"rever"|"continuar"|"nova", lessonId, title, detail,
> say, color, emoji, minutes, done }`. O `ReviewItem` real (em
> `study/review.ts`) também é mais magro que o rascunho: `{ id, lessonId,
> subjectId, box, attempts, correct, wrong, lastAt, nextAt }` — sem
> `strength`/`topic`/`assistedCount` enquanto §4.4/§4.5 não existirem.
> O `Diagnostic` real (em `study/diagnostico.ts`) também difere do rascunho
> abaixo: `{ year, at, pct, bySubject }` — `level`/`recommendedDays` nunca
> foram precisos (o plano de férias escolhe o ano à mão e o horizonte deriva
> do *packer*); as "matérias críticas" derivam de `weakSubjects()` (< 50%).

### Modelos (novo módulo `apps/web/src/study/types.ts`)

Identificadores em inglês; reusa `YearN`, `QuizScore`, `Achievement`.

```ts
// Uma sessão de estudo: abriu a app, trabalhou, fechou/saiu.
export interface StudySession {
  id: string;                 // `${startedAt}-${nonce}`
  childId?: string;           // reservado p/ multi-criança + Supabase
  startedAt: number;          // epoch ms
  endedAt: number;
  durationSecs: number;       // tempo ATIVO (separador visível)
  view: string;               // View["kind"] — onde passou o tempo
  subjectId?: string;
  lessonId?: string;
  hiddenCount: number;        // vezes que escondeu o separador a meio
  completedTest: boolean;     // acabou um teste final nesta sessão
  scorePct?: number;
}

// Um item do banco de erros / agenda de revisão espaçada.
export interface ReviewItem {
  id: string;                 // questionId estável, ou `${lessonId}#${topic}`
  lessonId: string;
  subjectId: string;
  topic?: string;             // ex.: "medidas-capacidade"
  strength: number;           // 0–100 (sobe ao acertar, desce ao falhar)
  box: number;                // caixa Leitner 0..4 → escada de intervalos
  attempts: number;
  correct: number;
  wrong: number;
  assistedCount: number;      // vezes que usou ajuda (conta a meio)
  lastReviewedAt: number;
  nextReviewAt: number;       // quando deve voltar a aparecer
}

// A regra do utilizador, codificada como escada de dias por caixa.
export const REVIEW_DAYS = [1, 2, 7, 14, 30];

// Plano ativo (férias / recuperação).
export interface StudyPlan {
  kind: "ferias" | "recuperacao" | "manutencao";
  startedAt: number;
  days: number;               // duração recomendada (ex.: 15)
  focusSubjects: string[];    // subjectIds críticos
  // Missões geradas por dia (date = startOfDay epoch ms).
  schedule: Record<number, Mission[]>;
}

export interface Mission {
  id: string;
  kind: "read" | "math" | "review-errors" | "test" | "lesson";
  label: string;              // pt-PT, voltado à criança
  targetMinutes?: number;
  subjectId?: string;
  lessonId?: string;
  done: boolean;
}

// Resultado do diagnóstico → escolhe o plano.
export interface Diagnostic {
  takenAt: number;
  level: "precisa-de-ajuda" | "no-bom-caminho" | "forte";
  criticalSubjects: string[];
  recommendedDays: number;
  scores: Record<string, number>; // subjectId → pct
}
```

---

## 4. Os módulos (o que falta, onde mexer)

Cada módulo diz: **o que é**, **o que já existe**, **o que falta**, **onde** e
**notas**. Implementa pela ordem da §8.

### 4.1 Tracking de sessão  ✅ *(feito 2026-06-10)*

- **O que é.** Saber quanto tempo a criança estudou, em quê, e se saiu do
  browser a meio.
- **Como ficou.** `apps/web/src/study/sessions.ts` — módulo singleton (não um
  hook): `startSession`/`endSession`/`trackView` + `initSessionTracking()`
  montados em `App.tsx` (efeito sobre `view`). Uma sessão abre em
  lição/teste/jogo e fecha ao navegar para fora. Só conta tempo com o separador
  **visível**; `visibilitychange` pausa o relógio, soma `hiddenCount` e regista
  eventos `browser_hidden`/`browser_returned`; `pagehide` marca `exited` +
  `browser_exit`. *Heartbeat* de 25 s persiste a sessão aberta (o espelho
  síncrono em localStorage é o que sobrevive a um fecho brusco). O `recordQuiz`
  (progress.tsx) chama `noteTestCompleted(pct)` para carimbar a sessão com a
  conclusão — reusa o ponto onde o `Achievement` já era registado.
- **Leitura React:** `useSessions()` (subscreve `sprout.sessions.v1`).
- **Só derivados:** calendário, gráficos e alertas calculam tudo dos logs ao
  renderizar; nenhum relatório é guardado.
- **Tracking de leitura (2026-06-10).** Cada sessão de lição guarda
  `scrollPct` (máximo % do corpo da lição percorrido — *listener* passivo +
  rAF em `App.tsx`, `noteScroll` em `sessions.ts`). O envolvimento é
  **derivado** por sessão em `study/calendar.ts` (`engagementOf` /
  `sessionEngagement`): `completed` (teste passado) · `read` (≥70% de scroll
  e ≥40% do tempo estimado da lição, via `lessonMinutes`) · `skimmed` ·
  `opened` (<20 s) · `abandoned` (teste começado e deixado a meio). Mostrado
  na Área dos Pais com etiquetas pt-PT (`ENGAGEMENT_LABEL`).
- **Persistência ao fechar a tab (2026-06-10).** O hydrate do facade faz
  *merge* de `sprout.sessions.v1` por id (ganha `endedAt`/`secs` mais
  recente), para o espelho localStorage do `pagehide` nunca ser sobreposto
  por uma cópia IndexedDB mais antiga (ver §12).

### 4.2 Banco de erros + revisão espaçada  ✅ *(feito 2026-06-10)*

- **O que é.** Cada erro vira treino. Errou problemas de litros/ml → amanhã
  recebe-os de volta; depois outro daqui a uns dias.
- **Como ficou.** `apps/web/src/study/review.ts` + chave `sprout.review.v1`
  (`Record<id, ReviewItem>`, teto 400 — ao estourar saem primeiro os itens
  mais FORTES; os erros ficam). Cada resposta no `Quiz` (no `choose`, por
  pergunta) chama `recordReviewAnswer` com a escada Leitner do utilizador:
  - errou → caixa 0 → **amanhã**
  - acertou devagar (> 45 s, `EXPECTED_SECS_PER_QUESTION`) → +1 caixa → **2 dias**
  - acertou bem → caixa ≥ 2 → **7 dias**
  - acertou repetido → caixas 3/4 → **14 / 30 dias**; acertar no topo =
    dominada → sai do banco.
  Um item só **nasce de um erro** (o banco guarda erros, não tudo o que foi
  respondido); `nextAt` é baseado em início-de-dia, por isso "amanhã" é o dia
  seguinte de calendário. **Id estável de pergunta**:
  `${lessonId}#${quizId}#${índice}` (`questionId`); perguntas dinâmicas
  (`gen`) e ids sintéticos (Simulado) ficam de fora.
- **A alimentar.** `dueReviews`/`dueByLesson` + `useReview()`:
  - `study/plan.ts` gera uma missão `"rever"` — *"Corrigir os erros: X"* —
    para a lição com mais perguntas vencidas nesse dia (abre a lição; acertar
    nos quizzes reagenda os itens e limpa a dívida);
  - `#/plano` mostra o cartão **"Banco de erros"** ("Tens N perguntas para
    vencer hoje!", com leitura em voz alta) que abre a lição com mais vencidas;
  - o relatório semanal (§4.11) lista o que rever na semana seguinte.
- **Futuro (anotado, não feito).** Um *runner* de revisão dedicado (hoje a
  criança vence as perguntas reabrindo a lição — KISS); `topic` por pergunta
  (para alertas "erra sempre medidas"); `strength`/`assisted` quando §4.4/§4.5
  chegarem.

### 4.3 Explicação passo a passo  *(estende o que existe)*

- **O que é.** Nunca só "certo/errado". Mostrar o raciocínio:
  > Não é só 7 × 4. Tens de converter litros para ml: 6 L = 6000 ml;
  > 6000 ÷ 200 = **30 copos**.
- **Já existe.** `QuizQuestion.explain` (uma linha, mostrada após responder).
  Para conteúdo de lição há os blocos `math` e o infográfico `steps`.
- **Falta.** Estender `QuizQuestion` com `steps?: string[]` (resolução passo a
  passo, lida em voz alta, revelada após responder — certo **ou** errado). O
  `explain` continua a ser a "ideia-chave" de uma linha.
- **Onde.** `Quiz.tsx` (tipo + ecrã de resultado). Autores de lição usam
  `math` + `steps` no corpo para problemas escritos.

### 4.4 Dificuldade progressiva  *(novo, leve)*

- **O que é.** Fácil → Médio → Difícil → Desafio, e a app sobe/desce sozinha.
- **Já existe.** Nada por pergunta. As frações dinâmicas (`gen`) já variam.
- **Falta.** Campo opcional `level?: "facil" | "medio" | "dificil" | "desafio"`
  em `QuizQuestion` (default `medio`). O motor de prática serve a próxima
  pergunta um nível acima quando a força do tópico (`ReviewItem.strength`) está
  alta, e um abaixo quando está baixa.
- **Onde.** `Quiz.tsx` + `study/review.ts`. KISS: começa só por *etiquetar* e
  ordenar; o "auto-ajuste" liga-se quando o banco de erros existir.

### 4.5 Modo "estudar com ajuda"  *(novo)*

- **O que é.** Por pergunta: Ver pista → Ver exemplo parecido → Ver passo 1 →
  Ver resolução completa. Se usar ajuda, a nota conta de forma diferente.
- **Falta.** `QuizQuestion.hint?: string` + reaproveitar `steps` (revelados um a
  um a pedido). Marcar a resposta como `assisted` → entra no `ReviewItem` com
  peso reduzido (não sobe de caixa) e fica visível no detalhe dos pais.
- **Onde.** `Quiz.tsx` (botões progressivos de ajuda) + `study/review.ts`.

### 4.6 Missões curtas  *(estende as Missões)*

- **O que é.** Em vez de "estudar Matemática": *Missão 1 — resolve 5 problemas;
  Missão 2 — lê 1 texto; Missão 3 — corrige os erros de ontem.*
- **Já existe.** `missoes.ts` (sequências de artigos → cromo, progresso
  derivado).
- **Falta.** Um gerador de `Mission[]` diárias a partir de: erros vencidos
  (`dueReviews`), disciplinas críticas do diagnóstico, e o ritmo do modo férias.
  Voltadas à criança, com ícone, progresso e recompensa.
- **Onde.** Novo `apps/web/src/study/missions.ts` (gerador) + uma vista
  child-facing "O meu plano de hoje" (ver §4.9 e §9).

### 4.7 Diagnóstico inicial  ✅ *(feito 2026-06-11)*

- **O que é.** Antes do plano de férias, um mini-teste de colocação —
  **oferecido, nunca obrigatório** — para o plano reforçar as matérias fracas.
- **Como ficou.** `study/diagnostico.ts` (dados) + `DiagnosticoModal`/
  `buildDiagnostico` em `Simulado.tsx` (estende a maquinaria do simulado, como
  o exame final) + chave **`sprout.diagnostic.v1`**:
  - **Oferta no `#/plano`**: ao escolher um ano FRESCO no cartão de férias
    aparece, ao lado de "Começar", o botão opcional **"Queres fazer um
    mini-teste primeiro? (5 min)"** (um ano com plano guardado não o oferece —
    a fila já existe e não é reescrita). Tom sempre quente: *"Vamos ver o que
    já sabes — sem nota, é só para montar o teu plano!"*.
  - **O teste**: uma parte curta por disciplina obrigatória do ano (a mesma
    regra `mandatorySubjectsForYear` da fila), ~12 perguntas no total
    (`DIAG_SIZE`, mínimo 3/disciplina para a % significar algo), dificuldade
    mista (o `buildSimulado` já baralha prática+finais). Cada parte é um
    `Quiz` em sequência no mesmo modal; id sintético **`diag:<ano>`** — o
    progresso real das lições fica limpo, sem `Achievement`.
  - **Resultado**: `Diagnostic = { year, at, pct, bySubject }` (só o último;
    um novo sobrescreve). Sem "nota" para a criança — o resumo diz o que vai
    ser reforçado.
  - **USO no plano** (a parte que importa): `buildFeriasQueue(year, diag)` faz
    um **reorder one-shot na criação do plano** — as disciplinas com
    `bySubject < 50%` (`WEAK_SUBJECT_PCT`, `weakSubjects()` — mais fraca
    primeiro) abrem a fila com as listas inteiras, interleavadas entre si,
    antes do emparelhamento pesada/leve normal das restantes. Filas guardadas
    nunca são reescritas; `startFeriasPlan` lê o diagnóstico só para filas
    NOVAS.
  - **Pais**: cartão "Diagnóstico" na tab Estudo do `#/pais` —
    *"Matemática 40% · Português 75% — plano ajustado para reforçar
    Matemática."*
- **Nota.** O rascunho antigo (`level`/`recommendedDays`, 3 mini-simulados
  separados) simplificou-se: o ano escolhe-se à mão (§4.8) e o horizonte
  deriva do packer, por isso só as % por disciplina interessam. O ficheiro
  planeado `study/Diagnostic.tsx` não existe — os dados vivem em
  `study/diagnostico.ts` e a UI junto do simulado (DRY com `buildSimulado`).

### 4.8 Modo "Férias / Recuperar o ano"  ✅ *(feito 2026-06-11)*

> **Decisão do utilizador (2026-06-11):** escolher um **ano** → plano dia a dia
> com a matéria TODA desse ano; ~6 semanas, **≤30 min/dia**; a lição e
> o seu teste final ficam no **mesmo dia**; um dia falhado **transita** para o
> dia seguinte, sem culpa.
>
> **Decisões do utilizador (2026-06-11, 2.ª ronda):**
> - **Disciplinas obrigatórias**: anos 1–4 só entram português, matemática,
>   estudo do meio, inglês e cidadania (`MANDATORY_SUBJECTS_1C` em
>   `ferias.ts`); a partir do 5.º ano entram TODAS as disciplinas de escola
>   do ano. Filas já guardadas não são reescritas — só planos novos.
> - **Ritmo escolar**: **seg–sex = matéria nova**; **sábado = dia de revisão**
>   (o packer não põe passos novos ao sábado — `isNewMatterDay`; as missões de
>   sábado derivam da própria semana em `plan.ts/feriasSaturdayMissions`:
>   repetir o teste mais fraco da semana + vencer o banco de erros); domingo
>   continua descanso. A semana de matéria nova passou a **5×30 min**
>   (`WEEK_MINUTES`), por isso a estimativa de semanas continua honesta.

- **Como ficou.** `apps/web/src/study/ferias.ts` + chave **`sprout.plan.v1`**.
  Só duas coisas persistem — a fila e o que está feito; tudo o resto é derivado:

  ```ts
  interface PlanStep { lessonId: string; minutes: number }    // lessonMinutes(body) + 5 (teste)
  interface StudyPlan {
    year: YearN;
    startedAt: number;        // epoch ms
    queue: PlanStep[];        // ordem de ensino: round-robin pelas disciplinas
                              // de escola do ano (mat, pt, edm, en…)
    doneSteps: string[];      // lessonIds com teste final passado (espelho do progress)
  }
  ```

  - **Agendamento 100% derivado** (`feriasStepsForDay`): "hoje" = os próximos
    passos por fazer que cabem em 30 min (máx. **2 disciplinas/dia**, nunca
    salta a frente da fila), sábados (revisão) e domingos (descanso) de fora.
    Um dia falhado **não muta nada**
    — amanhã serve a mesma frente da fila (é esse o transitar). Os passos já
    passados HOJE ficam no lugar com ✓, para a lista do dia não fugir debaixo
    da criança. Dias futuros do calendário mostram a projeção da fila.
  - **Feito** = teste final da lição ≥ `TEST_PASS_PCT` (reusa o `progress`);
    `syncFeriasDone` espelha isso em `doneSteps` a partir do `#/plano`. Um
    teste falhado mantém o passo na frente (o banco de erros §4.2 já agenda as
    perguntas erradas sozinho).
  - **Progresso** (`feriasProgress` + `feriasStatusLine`): % da matéria (por
    minutos), semana N de `ceil(minutos da fila / (6×30))` — um ano que não
    cabe em 6 semanas mostra o horizonte real ("~7 semanas") —, fim previsto, e
    dias atrasado/adiantado (frente da fila vs. o dia em que estava planeada).
  - **`#/plano`**: sem plano, cartão "Plano de férias — recuperar um ano
    inteiro" (escolher 1.º–6.º com as cores dos cartões de ano + explicação
    lida em voz alta; começar é toque duplo: selecionar → confirmar). Com
    plano: os passos do dia **substituem** as missões derivadas
    (`missionsForDay` ganhou o parâmetro `ferias` — é o único sítio que decide
    que plano alimenta o dia), faixa de progresso ("Semana 2 de 6 · 38% da
    matéria · no ritmo certo" / "2 dias atrasado, sem stress") e "Terminar
    plano" discreto com confirmação (limpa `sprout.plan.v1`; o progresso das
    lições fica).
  - **`#/pais`**: cartão informativo "Plano de férias · 4.º ano — semana/%/fim
    previsto"; o calendário planeado-vs-feito usa o plano de férias via o mesmo
    `missionsForDay`; a "nota da semana" calcula o "plano cumprido" com
    `feriasPlanPart` (minutos de passos passados na janela vs. minutos
    planeados) em vez da reconstrução aproximada.
- **Notas.** Sem culpa: um dia falhado espera, não acumula penalização. O
  diagnóstico (§4.7) continua por fazer — o plano de férias não depende dele
  (o ano é escolhido à mão). O rascunho antigo do `StudyPlan` em §3 ficou
  obsoleto: a forma real é a de cima.

**Histórico + mudar de ano + exame final (decisões do utilizador, 2026-06-11):**

- **`sprout.plan.v1` evoluiu** para `{ active: StudyPlan | null, history:
  PlanRecord[] }`, com **migração silenciosa**: um valor antigo (o StudyPlan
  "nu") torna-se `{ active: plano, history: [] }` no primeiro load, com
  write-back (adiado por microtask para não emitir a meio do render).
  `PlanRecord = { year, startedAt, endedAt, pctDone (0–100), minutesDone,
  examPct? (0–1, a melhor) }`.
- **Arquivar**: terminar o plano, **acabar a fila** (auto-arquiva em `#/plano`
  com 100%) ou **"Mudar de ano"** (na faixa do plano ativo, com confirmação
  "O plano atual fica guardado no histórico") empurram o ativo para a history.
  O histórico mostra-se em `#/plano` ("Planos anteriores", uma linha por plano
  via `planRecordLabel` — "4.º ano · mai–jun · 100% · exame 16/20") e em
  `#/pais` (`PlanHistoryCard`).
- **Exame final de ano** (`Simulado.tsx`: `buildExame` + `ExameModal`,
  reutiliza o motor do simulado/Quiz com id sintético `exame:<ano>`): ~24
  perguntas de TODAS as disciplinas de escola do ano, **puxadas para cima**
  ("na escola não facilitam"): perguntas de quizzes **finais** pesam mais do
  que as de prática, e lições mais **tardias** pesam mais (heurística simples:
  posição mais à frente na disciplina = matéria mais difícil). Aparece em
  `#/plano` a partir de **90% do plano** (`EXAM_READY_PCT`) e depois de o
  arquivar; repetir é sempre possível — **fica a melhor nota** (`recordExamPct`
  guarda no plano ativo ou no último registo).
- **Nota 0–20** (`pct × 20`, arredondada; passa com ≥ 10, sem inflação):
  <10 "ainda não está — vamos rever e repetir" (e `requeueWeakestLessons`
  mete as 6 lições mais fracas de volta na fila como passos `redo`, que só
  contam como feitos com um teste passado **depois** de re-entrarem — ver
  `doneStepIds`/`syncFeriasDone`); 10–13 "passaste — dá para melhorar";
  14–17 "muito bom!"; 18–20 "excelente! 🌟". O tom é sempre encorajador; a
  fasquia é honesta.
- O `Quiz` ganhou um `onResult?: (pct) => void` opcional (dispara em cada
  tentativa terminada) — é assim que o exame calcula a nota sem duplicar o
  motor.

**Leitura no 1.º ano + consistência do packer (decisões do utilizador, fase 16B):**

- **"Aprender a ler" conta para o estudo do 1.º ano**: um plano novo de
  `year === 1` mete a escada de leitura (a 1.ª categoria do `site.estudo` —
  `readingCategory` em `site-config.ts`) na frente do lado "pesado" da fila
  (`readingTrack()` em `ferias.ts`): o dia 1 começa na leitura, que depois
  alterna com mat/pt como qualquer disciplina pesada. **Só entram os tópicos
  com teste final** ("feito" = teste passado; uma página só de drill nunca
  sairia da frente da fila) — hoje são `estudo-silabas-treino` e
  `estudo-ler-palavras`; um tópico de leitura novo entra no plano ao ganhar um
  "## 🎯 Questionário final". Planos já guardados não são reescritos.
- **Packer com tolerância** (`DAY_TARGET_MIN` 30 + `DAY_TOLERANCE_MIN` 8): o
  tecto duro de 30 min só metia UMA lição de ~18 min por dia (18+16 > 30) e o
  cabeçalho "semana 1 de 6" contradizia um fim previsto de ~10 semanas. Um dia
  aceita mais um passo até 38 min; e `totalWeeks` passou a derivar **do mesmo
  packer** que o fim previsto (`ceil(dias empacotados / 5)`, em
  `feriasProgress`) em vez de `minutos/semana`, por isso cabeçalho e fim
  previsto nunca mais discordam.

### 4.9 Calendário / "O meu plano"  🟢 *(núcleo feito 2026-06-10; falta férias/TPC)*

> **Decisões do utilizador (2026-06-10):**
> - Cada **ano** tem um **plano de estudo diário** de ~**30 min/dia**,
>   **segunda a sábado — domingo é descanso**. Mostrar de forma visual o que
>   estudar em cada dia (missões do dia, grandes e tocáveis).
> - O calendário marca **quando foi feito** e também **quando a página foi
>   apenas aberta** (sessão sem conclusão) — distinguir os dois estados.
> - O **teste final é obrigatório** para terminar uma área/lição, e só conta
>   como concluído com **≥ 80% de sucesso**; abaixo disso fica "a repetir" e
>   entra no banco de erros.

- **O que é.** Calendário com **1 mês para trás, mês atual e 2 meses à frente**.
  Dias passados mostram o que se estudou (verde/amarelo/vermelho/azul); dias
  futuros mostram missões planeadas.
- **Já existe.** O heatmap (`ParentArea.tsx`) é por trimestre e só para trás; o
  gráfico de uso é por mês e só para trás. **Não reescrevas** — extrai a
  agregação por dia (`aggregateByDay`) para um módulo partilhado e constrói uma
  vista de calendário em cima dela, agora com futuro.
- **Feito (2026-06-10).**
  - `View` `{ kind: "plano" }`, rota `#/plano` (validada em `nav.ts`), com
    entrada na home (banner "O meu plano de hoje") + crumb próprio.
  - `study/Plano.tsx`: missões do dia grandes e tocáveis (com leitura em voz
    alta), barra "X de 30 min", domingo = cartão de descanso; calendário
    mensal **-1/atual/+2** com estados verde/amarelo/vermelho + ponto azul
    (teste) + descanso, e detalhe do dia tocado (feito no passado, planeado no
    futuro). Distingue "só abriu a página" (amarelo) de "concluiu" (verde).
    Com um plano de férias ativo (fase 17), os dias planeados (hoje e futuros)
    mostram os **mesmos marcadores** do plano completo — ícones de disciplina
    (máx. 2) + "≈N min" — via a prop `planDays` (mapa de `feriasFullSchedule`
    + `planDaysByDate`) e o componente partilhado `PlanDayMarks`; o pager
    estende-se até ao mês do fim previsto. Sem plano, as células ficam como
    estavam.
  - `study/calendar.ts`: `aggregateByDay` **extraída** de `ParentArea.tsx`
    (que agora a importa — DRY) + `aggregateSessionsByDay` + `dayState`.
  - `study/plan.ts`: gerador puro `missionsForDay` (2–4 missões: "repetir"
    testes <80%, "continuar" lições começadas, "nova" da disciplina mais
    fraca/parada do ano inferido); dias futuros rodam as escolhas.
- **Feito (2026-06-11) — "Plano completo" calendar-first** (decisão do
  utilizador: "isto queria era no calendário, com quantas matérias e o tempo
  necessário; usa os icons das matérias"). `study/PlanoCompleto.tsx`, View
  `{ kind: "plano-completo" }`, rota `#/plano/completo`, ligado do `#/plano`
  ("Ver o plano completo") e do cartão de férias no `#/pais`:
  - **Cabeçalho do plano**: ano, data de início, fim previsto, semana N de M,
    % da matéria e — quando atrasado — **"+N dias, sem stress"** (o desvio é
    `behindDays` de `feriasProgress`: como o agendamento é derivado, cada dia
    falhado empurra o fim previsto um dia de estudo à frente do plano
    original; nada é guardado).
  - **Todos os meses do plano em grelha** (do mês de início ao do fim
    previsto — fase 17, antes eram só atual + seguinte; `PlanMonth` recebe o
    mês absoluto via `monthIndex` de `calendar.ts`): cada dia futuro mostra os
    **ícones das disciplinas** (`SUBJECT_ICONS`, máx. 2), a contagem de lições
    e "≈N min"; dias passados mostram o estado REAL (cores do `dayState`);
    sábados a tracejado (revisão), domingos descanso; um dia passado
    planeado-mas-falhado mostra **"adiado →"** (derivado: dia útil dentro do
    plano sem matéria empacotada nem atividade real). Os marcadores do dia são
    o componente partilhado `PlanDayMarks` (+ `planDayMinutes`), que o
    calendário do `#/plano` reusa.
  - **Painel de detalhe** do dia tocado: lições com chip de disciplina, resumo
    de uma linha (`lessonSummary` extrai o "O que vais aprender" do corpo),
    ≈min e estado — cada uma tocável para **abrir a lição** (avançar matéria
    é permitido e conta).
  - **Lista "Dia a dia"** compacta atrás de um toggle (cartões por dia com
    leitura em voz alta) + **totais de tempo** (hoje/semana/mês das sessões,
    barras das últimas 8 semanas, divisão do mês por disciplina).
- **Falta.** Nada — o TPC (§4.12, 2026-06-11) fechou a última peça. *(O banco
  de erros já alimenta as missões — §4.2, feito 2026-06-10; o plano de férias
  persistido chegou — §4.8, 2026-06-11: quando ativo, os passos dele
  **substituem** as missões derivadas via o parâmetro `ferias` de
  `missionsForDay`; os TPC entram ACIMA de tudo via o parâmetro `tpcs`.)*
- **Afinado (2026-06-10, revisão §12):** verde no calendário exige teste
  **passado** (≥ `TEST_PASS_PCT`) ou ≥20 min ativos — teste falhado sozinho
  é amarelo + ponto azul. Planeado-vs-feito só se mostra para hoje/futuro;
  dias passados mostram apenas atividade real (planos não são guardados).

### 4.10 Modo pré-leitor (1.º ano)  🟢 *(mínimo feito 2026-06-10; faltam widgets)*

- **O que é.** Para quem ainda não lê: áudio a ler a pergunta, imagens, sílabas
  grandes, arrastar letras, completar palavras, "ouve e escolhe", **menos texto**.
- **Feito (2026-06-10).** *Flag* `preReader` em `sprout.ui.v1`
  (`apps/web/src/ui-prefs.ts` — extraído do `App.tsx`, partilhado): valores
  `"auto"` (default — liga só em lições do **1.º ano de disciplinas de
  escola**, porque as áreas sem ano reutilizam o tier 1), `"on"`, `"off"`;
  alternável na Área dos Pais ("Modo pré-leitor"). Quando ativo:
  - a lição/teste ganha a classe **`pre-reader`** (CSS em `kids.css`): tipo de
    letra maior, opções de quiz mais altas, altifalante maior e com sombra;
  - o `Quiz` **prefere a grelha por imagem**: se todas as opções têm `emoji`,
    usa `layout grid` mesmo que o autor não o tenha pedido.
  Voz continua **só por toque** — o modo é apenas visual/estrutural.
- **Feito (2026-06-11).** O *conteúdo* da escada de leitura: série **"As
  letras"** no Português 1.º (6 lições, 3 consoantes cada, pela ordem didática
  p…h — `pt-1-letras-*`) + casos de leitura ce/ci/ge/gi (`pt-1-casos-cegi`),
  tudo áudio-primeiro com `soundcards`/`drill` e quizzes "ouve e escolhe".
- **Falta.** Widgets novos de letras/sílabas ("arrastar letras", "completar
  palavra" — alguns podem nascer do `soundcards`) e
  encaminhamento para eles.

### 4.11 Área dos pais: alertas reais + relatório semanal  ✅ *(página + alertas + tempos + relatório semanal, 2026-06-10)*

> **Decisões do utilizador (2026-06-10, testes):**
> - Os **testes devem ser mais complexos** — pelo menos **+20% de contexto**
>   nas perguntas (enunciados com história/dados, não memória seca), para
>   obrigar a pensar. Vale como guia de autoria para testes novos e revisão
>   dos existentes.
> - Medir o **tempo de cada teste** (já existe `Achievement.secs` — passar a
>   mostrá-lo) e dar aos pais: análise **fácil/difícil por tempo** (vs. a
>   mediana esperada) e o ranking dos testes **onde demoraram mais**.

> **Decisão (2026-06-10):** a Área dos Pais passa a ser uma **página própria**
> (novo `View` `{ kind: "pais" }`, rota `#/pais`), **não um modal** — o gate de
> multiplicação mantém-se à entrada da página. Deve incluir: **gráficos do que
> foi feito** (lições/testes/minutos por dia e por disciplina, com o widget
> `chart` renovado) e o **calendário** (§4.9) na perspetiva dos pais — o que
> foi feito *e o que devia ter sido feito* (missões planeadas vs. cumpridas).

- **O que é.**
  - Alertas: *"⚠️ Saiu do browser 4× durante o estudo" · "⚠️ Fez o teste em 2
    min — pode ter respondido à pressa" · "⚠️ Erra sempre problemas de medidas" ·
    "✅ Melhorou a leitura esta semana".*
  - Relatório de domingo: dias estudados, minutos totais, subiu de X% para Y%,
    o que rever, plano da próxima semana.
- **Feito (2026-06-10).**
  - A Área dos Pais é uma **página** (`#/pais`, `View {kind:"pais"}`), não um
    modal; o **gate de multiplicação** está à entrada da página (resolvido uma
    vez por separador). O menu de definições navega para lá.
  - `study/alerts.ts` (regras puras): saiu do browser N× na semana, teste
    demasiado rápido (<15 s/pergunta), erra sempre a mesma lição (≥2 falhas),
    melhorou a disciplina (≥10 pontos semana-a-semana) — positivos primeiro,
    tom sempre construtivo.
  - **Métricas de tempo** (decisão do utilizador): `Achievement` ganhou `qs`
    (n.º de perguntas); `paceOf` classifica fácil/difícil pelo tempo vs.
    mediana esperada (45 s/pergunta) e `slowestTests` dá o ranking "onde
    demoraram mais" (top 5). Mostrado em "Últimos testes" + cartão próprio.
  - **Gráficos** com o widget `Chart` (`@sprout/ui`): minutos de estudo por dia
    (barras, 2 semanas, das sessões) e repartição por disciplina (donut por
    minutos; recua para contagem de testes em dados antigos sem sessões).
  - **Calendário dos pais**: reusa o `PlanCalendar` do `#/plano` com detalhe
    planeado-vs-feito por dia (missões com ✓ feita / ✗ por fazer / planeada) —
    **só para hoje/futuro**; dias passados mostram a atividade real (§12).
  - **Drill-down por área (2026-06-10)**: os mosaicos de "O que andam a
    explorar" são clicáveis → acordeão com as lições dessa área (envolvimento
    de leitura + tempo, recente primeiro, teto 20) e os testes (nota + duração
    + n.º de testes abandonados a meio).
  - **"Nota da semana" 0–20 (2026-06-10)**: `study/grade.ts` (puro, últimos 14
    dias) — mistura ponderada de plano cumprido (missões feitas÷planeadas,
    seg–sáb), taxa de testes passados e leitura com atenção; cartão com os 3
    componentes e tom encorajador.
  - **Detalhe do dia com leitura**: cada lição/teste do dia mostra a etiqueta
    de envolvimento ("leu com atenção", "passou os olhos", "só abriu",
    "abandonou o teste") com tempos (§4.1).
  - **Home**: o "Visto recentemente" passou a colapsável (fechado por defeito,
    com contagem; preferência em `sprout.ui.v1`).
- **Relatório semanal (2026-06-10).** `study/report.ts` (`weeklyReport`,
  puro) + cartão `WeeklyReportCard` no `#/pais`: para a **última semana
  completa seg–dom** — dias estudados, minutos totais, minutos por disciplina
  (gráfico `Chart` quando há ≥2), testes feitos/passados, tendência por
  disciplina vs. a semana anterior ("Matemática subiu de 42% para 58%" / uma
  descida lê-se "vale a pena treinar juntos"), o que rever na próxima semana
  (banco de erros §4.2 + testes "a repetir") e o alvo do plano da próxima
  semana (6 dias × 30 min). Tudo derivado; devolve `null` numa semana vazia.
- **Segmentos ativo/parado por sessão (2026-06-11).** `sessionSegments` em
  `study/usage.ts` (puro) transforma UMA sessão em segmentos
  `{ type: "ativo"|"parado", fromSec, toSec }` a partir dos eventos
  `browser_hidden`/`browser_returned` já registados (§4.1). Na Área dos Pais,
  cada sessão de lição no detalhe do dia mostra o tempo total, o tempo parado
  ("esteve parado 2m em 3 paragens") e a **barra de segmentos** (SVG fino:
  verde = ativo, cinzento às riscas = parado) — a "evolução da lição"; o
  detalhe do dia abre com o agregado ativo vs. parado. O drill-down por área
  mostra o parado agregado por lição + a barra da sessão mais recente.
- **Falta.** Os alertas que dependem de *tópico* por pergunta ("erra sempre
  problemas de medidas" — hoje só por lição/pergunta) e a partilha/exportação
  do relatório. Mantém-se tudo **derivado** dos logs.

### 4.12 TPC  ✅ *(feito 2026-06-11)*

- **O que é.** Os pais marcam trabalho de casa: 1–3 lições com prazo; a
  criança vê-o como missão **prioritária** no plano do dia.
- **Como ficou.** `study/tpc.ts` + chave **`sprout.tpc.v1`** (`Tpc[]`,
  `{ id, lessonIds, dueDate, createdAt, doneAt? }`, mais recente primeiro,
  teto 30 — só entradas FEITAS rodam para fora; um TPC aberto nunca cai):
  - **Marcar (pais)**: cartão "TPC" na tab Estudo do `#/pais` — selects
    simples ano → disciplina → lição (até `MAX_TPC_LESSONS` = 3; o ano do
    plano ativo vem pré-selecionado, mas qualquer ano serve) + prazo nos
    próximos 7 dias (`TPC_DUE_DAYS`). O cartão lista os TPC abertos (estado
    por lição, "em atraso" a `--warn`, remover) e os últimos feitos.
  - **Criança (`#/plano`)**: TPC abertos viram missões `kind: "tpc"` servidas
    **ACIMA** das missões do dia (`tpcMissions` em `plan.ts`; `missionsForDay`
    ganhou o parâmetro `tpcs` e continua o único sítio que decide o dia) —
    título *"TPC para sexta: …"* (`tpcDueLabel`), cartão com mochila e o
    acento `--warn` (`.plan-mission.is-tpc`), nunca duplicando uma lição que o
    plano do dia já serve. Em atraso fica visível, com copy suave (*"Passou do
    prazo, sem stress — ainda vais a tempo."*). Domingo continua descanso.
  - **Feito** = TODAS as lições do TPC com teste final ≥ 80% **depois** de o
    TPC ser criado (a mesma convenção dos passos `redo` do §4.8 — marcar uma
    lição já passada significa "faz outra vez"). `syncTpcs` (chamado no
    `#/plano`, o único escritor) carimba `doneAt`; todos os outros leitores
    derivam.
  - **Alerta dos pais**: `buildAlerts` ganhou `tpcs` — *"Há 1 TPC a passar do
    prazo."* com porquê positivo (§4.11). A "nota da semana" (`grade.ts`)
    ficou intocada — o TPC não entra no "plano cumprido".
- **Nota.** O rascunho previa estado `todo | in_progress | done` persistido;
  na prática só `doneAt` persiste — aberto/em-atraso/feito derivam do prazo e
  do log de testes (menos estado, mesma informação). Não há modelo paralelo:
  o TPC entra no dia como `Mission` normal.

### 4.13 Modo professor/explicador  *(futuro — não agora)*

Gerar teste/TPC, ver erros por aluno, exportar PDF. Fica para depois do Supabase
e do multi-criança. Anotado aqui para não se perder.

---

## 5. Conteúdo didático (o que reforçar)

O motor acima só brilha com matéria forte por baixo. Detalhe e prioridades em
`docs/MATERIA_EM_FALTA.md`; o essencial transversal:

- **Problemas matemáticos escritos** (estilo manual), com passos e a *armadilha*
  explicada. Exemplo-modelo:
  > Com 1,5 L encho 7 copos de 200 ml. Quantos copos com **4× mais** água?
  > 1) 4× de 1,5 L = 6 L · 2) 6 L = 6000 ml · 3) 6000 ÷ 200 = **30 copos**.
  > *Armadilha:* não é 7 × 4 = 28 — é preciso converter a água total.

  Usa o bloco `math` e o infográfico `steps` no corpo, e põe os `steps` também na
  pergunta final ([[lessons-examples-tricks-problems]]).
- **4.ª Dinastia** (parece fraca). As lições existem
  (`hgp/ano6/dinastias.md`, `estudo-do-meio/ano4/reis-e-dinastias.md`) — reforça
  com `timeline` (1640 Restauração → D. João IV → 1755 terramoto → 1820
  Liberalismo → 1910 fim da monarquia), pessoas-chave, ideias-chave e mais
  perguntas de aplicação. Mantém a `teia-data.ts` em sincronia.
- **Mais matéria em todos os anos (1–6) e disciplinas**, com um *stretch fact*
  "Para saberes mais 🌱" ([[teach-a-little-more]]) e exemplos/truques/problemas
  ([[lessons-examples-tricks-problems]]).
- **Dificuldade por lição:** etiqueta perguntas com `level` (§4.4) para o
  fácil→desafio funcionar.

---

## 6. Mapa: pedidos → onde vivem

| Pedido | Secção | Estado |
|---|---|---|
| Conteúdo didático completo (1–6) | §5 | reforço contínuo |
| Matéria fraca (4.ª Dinastia) | §5 | reforço |
| Problemas matemáticos escritos | §4.3, §5 | estende `math`/`steps` |
| Sistema de TPC | §4.12 | ✅ feito (`study/tpc.ts` + missões prioritárias no `#/plano`) |
| Revisão espaçada | §4.2 | ✅ feito (`study/review.ts`) |
| Dashboard dos pais | §4.11 | ✅ página `#/pais` + alertas + tempos + relatório semanal |
| Calendário (-1 / +2 meses) | §4.9 | ✅ feito (`#/plano` + vista dos pais) |
| Tracking de sessão (sair do browser) | §4.1 | ✅ feito |
| IndexedDB → Supabase | §3, §10 | costura pronta |
| Modo Férias / Recuperar o ano | §4.8 | ✅ feito (`study/ferias.ts` + `sprout.plan.v1`, com histórico + exame final 0–20) |
| Diagnóstico inicial | §4.7 | ✅ feito (`study/diagnostico.ts` + `DiagnosticoModal` no Simulado) |
| Modo pré-leitor (1.º ano) | §4.10 | 🟢 mínimo feito (faltam widgets de letras) |
| Banco de erros | §4.2 | ✅ feito (`study/review.ts`) |
| Explicação passo a passo | §4.3 | estende `explain` |
| Missões curtas | §4.6 | estende Missões |
| Alertas reais (pais) | §4.11 | ✅ feito (`study/alerts.ts`) |
| Dificuldade progressiva | §4.4 | novo, leve |
| Estudar com ajuda | §4.5 | novo |
| Relatório semanal | §4.11 | ✅ feito (`study/report.ts` + cartão) |
| Tom emocional/motivacional | §0, §9 | transversal |
| Modo professor (PDF) | §4.13 | futuro |

---

## 7. Onde vive o quê (novos ficheiros)

```
apps/web/src/study/
  sessions.ts     // ✅ tracking de sessão (§4.1) — tipos incluídos
  calendar.ts     // ✅ agregação por dia partilhada (extraída de ParentArea) (§4.9)
  plan.ts         // ✅ gerador de missões diárias (§4.9; absorve o "missions.ts" planeado)
  alerts.ts       // ✅ regras de alertas + métricas de tempo (§4.11)
  grade.ts        // ✅ "Nota da semana" 0–20, últimos 14 dias (§4.11)
  Plano.tsx       // ✅ vista child "O meu plano" + PlanCalendar + cartão "Banco de erros" (§4.9, §4.2)
  review.ts       // ✅ banco de erros + revisão espaçada (§4.2)
  report.ts       // ✅ relatório semanal seg–dom, derivado (§4.11)
  ferias.ts       // ✅ plano de férias: { active, history } em sprout.plan.v1, resto derivado; exame final + requeue; MANDATORY_SUBJECTS_1C + ritmo seg–sex/sáb-revisão; leitura no 1.º ano + packer com tolerância (§4.8)
  usage.ts        // ✅ métricas de uso + sessionSegments ativo/parado (§4.11)
  PlanoCompleto.tsx // ✅ "Plano completo" calendar-first, #/plano/completo (§4.9)
  diagnostico.ts  // ✅ diagnóstico inicial: sprout.diagnostic.v1 + weakSubjects (§4.7) — a UI (DiagnosticoModal) vive em Simulado.tsx
  tpc.ts          // ✅ TPC: sprout.tpc.v1, done = teste ≥80% após criação (§4.12)
```

Fora de `study/`: `ui-prefs.ts` (✅ preferências de UI partilhadas em
`sprout.ui.v1`, incl. o modo pré-leitor §4.10 — extraído do `App.tsx`).

Já tocados: `nav.ts` (Views `plano` + `pais`), `App.tsx` (tracker + rotas +
banner na home + classe `pre-reader` na lição/teste), `progress.tsx`
(`TEST_PASS_PCT`, `Achievement.qs`, gate de 80%), `Quiz.tsx` (resultado
pass/"a repetir", alimenta o banco de erros por pergunta, grelha por imagem
no pré-leitor), `ParentArea.tsx` (página, gate, gráficos, alertas,
calendário, relatório semanal, toggle pré-leitor). Na fase 19B (2026-06-11):
`Simulado.tsx` (+`DiagnosticoModal`/`buildDiagnostico`), `ferias.ts`
(`mandatorySubjectsForYear` partilhado + reorder do diagnóstico),
`plan.ts` (+`tpcMissions`, parâmetro `tpcs`), `alerts.ts` (alerta "TPC a
passar do prazo"), `Plano.tsx` (oferta do mini-teste + missões TPC),
`ParentArea.tsx` (cartões "TPC" e "Diagnóstico" na tab Estudo). Por tocar:
`Quiz.tsx` (`steps`/`hint`/`level`/`assisted` — §4.3/4.5),
`storage/backend.ts` (`SupabaseBackend` futuro).

---

## 8. Ordem de implementação

Constrói de baixo para cima — os dados primeiro, a UI depois:

1. ~~**Modelos**~~ — tipos co-locados em cada módulo (ver nota §3); `REVIEW_DAYS`
   entra com o `review.ts`.
2. ✅ **Sessões** (`study/sessions.ts`, montado no `App`). Alerta "saiu do
   browser" a funcionar.
3. ✅ **Calendário** — `calendar.ts` extraído de `ParentArea` + vista `#/plano`
   com -1/+2 meses (e a vista dos pais em `#/pais`).
4. ✅ **Banco de erros + revisão** (`review.ts`, ligado ao `Quiz` por pergunta;
   missão "rever" + cartão no `#/plano`).
5. **Explicação passo a passo + estudar com ajuda** (`Quiz.tsx`) — **o
   próximo passo**.
6. ✅ **Missões curtas** a partir dos erros vencidos (em `plan.ts`).
7. ✅ **Diagnóstico** (`diagnostico.ts` + `DiagnosticoModal`, 2026-06-11);
   ✅ **plano férias/recuperação** (`ferias.ts`, 2026-06-11 — não depende do
   diagnóstico, mas um plano novo aproveita-o para reforçar as matérias fracas).
8. ✅ **Alertas** + **relatório semanal** na área dos pais.
9. **Dificuldade progressiva** (liga o auto-ajuste ao banco de erros).
10. 🟢 **Modo pré-leitor** (1.º ano) — flag/tipografia/grelha feitas; faltam
    os widgets de letras/sílabas.
11. **Conteúdo:** problemas escritos, 4.ª Dinastia, reforço por ano/disciplina.
12. ✅ **TPC** (sobre as missões, `tpc.ts`, 2026-06-11); mais tarde,
    **Supabase** + **modo professor**.

Cada passo é entregável sozinho, validado (`pnpm validate` + `pnpm typecheck`)
e atualiza este ficheiro.

---

## 9. UI — tem de ser muito forte (requisito)

A diferença entre "app de matéria" e "app que recupera o ano" está na UI. Regras:

- **Mobile-first**: funciona em telemóvel, iPad e desktop. As respostas e o
  calendário cabem em ecrã pequeno.
- **Linguagem visual existente**: reusa os tokens de cor, os cartões, o heatmap e
  o gráfico de uso da `ParentArea`. Não introduzas um segundo estilo.
- **`@sprout/icons`, nunca emoji na chrome.** Emoji só dentro do conteúdo.
- **Read-aloud em tudo**, só por toque. Botão de altifalante visível em cada
  pergunta, explicação e missão.
- **Criança vs. pais**: a vista da criança ("O meu plano de hoje") é grande,
  alegre, com poucas palavras, anéis de progresso e recompensa à vista. A vista
  dos pais é densa mas clara — alertas no topo, depois números, depois detalhe.
- **Tom motivador** sempre ([[tone-empathetic-fun]]): "Vamos recuperar aos
  poucos", nunca "Estás mal".
- **Movimento com respeito** por `prefers-reduced-motion` (como o `watercycle`,
  `solarsystem`).
- Para ecrãs novos com peso visual, considera a skill **frontend-design** para
  fugir ao aspeto genérico — mantendo-te dentro dos tokens do *design system*.

Marcos visuais concretos:

- **"O meu plano de hoje"**: 2–4 cartões-missão grandes, tocáveis, com anel de
  progresso e estado; ao concluir, confetti + minutos de tablet.
- **Calendário**: grelha -1/+2 meses, dias coloridos (verde/amarelo/vermelho/
  azul), toque mostra o que se fez / o que está planeado.
- **Alertas dos pais**: lista clara com ícone de aviso/ok, frase curta e o "porquê".
- **Relatório de domingo**: um cartão partilhável com 3–4 números e o plano da
  semana seguinte.

---

## 10. Migração para Supabase (quando chegar a hora)

A app continua a falar só com o facade. O `SupabaseBackend` pode começar simples
e evoluir:

- **Fase A (paridade):** guarda *blob* por chave (`key → row(value jsonb)`).
  Migração trivial, comportamento idêntico ao IndexedDB. Acrescenta auth + sync
  multi-dispositivo de borla.
- **Fase B (consultas):** os logs quentes passam a tabelas próprias para o
  professor poder consultar/exportar:

```
profiles · children · subjects · lessons
progress · achievements
study_sessions · study_events
reviews            -- banco de erros / revisão espaçada
plans · plan_days · missions · homework
diagnostics · parent_settings · parent_reports
```

Regra: **nunca** disperses leitura/escrita pela app — mantém o facade como única
porta, para a Fase A→B não tocar em *callers*.

---

## 11. Checklist de "feito" por funcionalidade

Antes de dar uma peça por concluída:

- [ ] Dados versionados (`.v1`) e com guarda de forma (estado velho nunca rebenta).
- [ ] Logs *append-only* com teto/rotação (§3).
- [ ] Read-aloud presente e só por toque.
- [ ] Sem emoji na chrome; ícones de `@sprout/icons`.
- [ ] Funciona em telemóvel, iPad e desktop.
- [ ] Tom positivo e motivador.
- [ ] `pnpm validate` e `pnpm typecheck` limpos.
- [ ] `docs/PLANO-ESTUDO.md` atualizado (o que ficou feito, o que falta).
- [ ] `teia-data.ts` atualizada se mexeu em lições/ids (§ CLAUDE.md).

---

## 12. Revisões externas

### Revisão externa 2026-06-10 — verificada

Quatro sugestões de revisão de código, verificadas uma a uma e corrigidas
no mesmo dia:

1. **Persistência das sessões ao fechar a tab** — *confirmado.* O `pagehide`
   escrevia no espelho síncrono (localStorage), mas o `hydrate` do IndexedDB
   podia sobrescrevê-lo com uma cópia mais antiga no arranque seguinte.
   **Corrigido** em `storage/index.ts`: para `sprout.sessions.v1` o hydrate
   faz *merge* por `id` de sessão (ganha o registo com `endedAt`/`secs` mais
   recente) e reescreve o resultado no backend durável.
2. **Teste falhado contava o dia como verde** — *confirmado.* `dayState`
   usava `s.completed` (teste terminado, mesmo <80%). **Corrigido** em
   `study/calendar.ts`: verde exige teste **passado** (≥ `TEST_PASS_PCT`)
   ou ≥20 min de estudo ativo; teste falhado sozinho fica amarelo, com o
   ponto azul de "fez teste" na mesma.
3. **Planeado-vs-feito em dias passados enganava** — *confirmado.* O plano de
   dias passados era reconstruído do estado ATUAL (planos não são guardados),
   podendo mostrar "por fazer" missões que nem existiam. **Corrigido** em
   `ParentArea.tsx`: dias passados mostram só a atividade real (sessões com
   envolvimento de leitura + testes); planeado-vs-feito só para hoje/futuro.
4. **Sessões que cruzam a meia-noite** — *aceite sem alteração.* A sessão
   conta inteira no dia em que começou; dividir os segundos pelos dois dias
   não compensa a complexidade. Documentado em `study/calendar.ts`.

---

## 13. Dashboard dos pais — gráficos de adulto (2026-06-11) ✔

Pedido: "na área de pais, faz gráficos de linhas e dashboard decente".
O dashboard usava o widget `chart` das lições (selo "Gráfico", dica de
leitura, número grande em cada barra) — chrome de criança num ecrã de adulto.

Feito:

- **`TrendChart` + `BarList`** novos em `packages/ui/src/widgets/TrendChart.tsx`
  — gráficos *parent-grade*: silenciosos, compactos, valores em tooltip por
  ponto em vez de pintados por cima. Reutilizam os helpers de escala/grelha
  do `Chart.tsx` (agora exportados — uma só fonte para a matemática).
- **Minutos de estudo por dia** → gráfico de LINHAS dos últimos 30 dias com
  área suave + linha tracejada da **média móvel de 7 dias** (a tendência do
  hábito lê-se através dos picos diários).
- **Sessões por dia** (Como usam a app) → linha com área, 14 dias.
- **Horas do dia mais usadas** → `BarList` horizontal (rótulos legíveis).
- **Tempo/Testes por disciplina** → `BarList` com a cor de cada disciplina
  (era um donut de criança); idem **Minutos por disciplina** no relatório
  da semana.
- Secção "Utilização" reordenada: tendência de minutos primeiro, depois a
  divisão por disciplina, depois o painel de uso.
- CSS em `kids.css` (`.ptrend*`, `.pbars*`, `.pchart*`); removidos os
  overrides mortos do widget de lição dentro de `.parent-dash`.

Sem dados novos persistidos — tudo derivado dos logs existentes, como antes.