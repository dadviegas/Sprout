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
| **Área dos pais** | `apps/web/src/ParentArea.tsx` | Dashboard atrás de um *gate* de multiplicação: cartão de hoje + minutos de tablet, *streak* atual/recorde, repartição por área, "visto recentemente", **gráfico de uso diário** por mês, **heatmap** estilo GitHub por trimestre (com navegação para trás), detalhe do dia, definições de recompensa, "Limpar tudo". |
| **Simulado** | `apps/web/src/Simulado.tsx` | Teste-treino misto por disciplina+ano, junta todas as perguntas das lições, reusa o motor `Quiz`, escreve num id sintético (não polui o progresso). **É a base do diagnóstico.** |
| **Missões** | `apps/web/src/content/missoes.ts` | Sequências nomeadas de artigos → ganha um cromo; progresso *derivado*, nada novo guardado. **É a base das missões curtas.** |
| **Motor de Quiz** | `apps/web/src/Quiz.tsx` | Perguntas com `options` (auto-baralhadas), `explain` (uma linha pós-resposta), figuras de fração, perguntas dinâmicas (`gen`), estrelas/confetti, *read-aloud*. |
| **Recompensa de tablet** | `ParentArea.tsx` (`tabletMinutesToday`) | Um dia "conta" quando passa 1 teste a ≥80%; minutos = base + por-estrela. |

**Lacunas reais** (o que não existe e este plano cria):

- Registo de **sessões** (tempo na app, sair do browser) — hoje só se regista o
  teste concluído.
- **Banco de erros / revisão espaçada** — o progresso só guarda o melhor score,
  não *que perguntas* falharam nem quando rever.
- **Plano / calendário com futuro** — o heatmap só olha para trás.
- **TPC**, **diagnóstico**, **modo férias/recuperação**, **relatório semanal**.
- **Dificuldade por pergunta**, **modo "estudar com ajuda"**, **modo pré-leitor**.

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
| `sprout.sessions.v1` | `StudySession[]` (append-only, com teto) |
| `sprout.review.v1` | `Record<string, ReviewItem>` — banco de erros / agenda de revisão |
| `sprout.plan.v1` | `StudyPlan` — plano ativo (férias/recuperação) |
| `sprout.diagnostic.v1` | `Diagnostic` — resultado do diagnóstico inicial |
| `sprout.children.v1` | *(futuro)* perfis de criança para multi-criança/Supabase |

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

### 4.1 Tracking de sessão  *(novo)*

- **O que é.** Saber quanto tempo a criança estudou, em quê, e se saiu do
  browser a meio.
- **Já existe.** O `Achievement.secs` mede a duração de *um teste*. Nada mede a
  sessão inteira nem saídas.
- **Falta.** Um *hook* `useSessionTracker()` que abre uma `StudySession` ao
  arrancar, soma tempo ativo, conta `hidden`, e fecha em `beforeunload`/
  `visibilitychange`. Acrescenta a `sprout.sessions.v1` (com teto).
- **Onde.** Novo `apps/web/src/study/sessions.ts` + montar o *hook* em
  `App.tsx`. A `View` atual já indica onde está (passa `view.kind`).
- **Notas.** Só conta tempo com o separador **visível** (não conta a app aberta
  esquecida). Eventos:
  ```ts
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause()  // soma tempo, hiddenCount++
    else resume()
  });
  window.addEventListener("beforeunload", () => flush()); // fecha a sessão
  ```

### 4.2 Banco de erros + revisão espaçada  *(novo)*

- **O que é.** Cada erro vira treino. Errou problemas de litros/ml → amanhã
  recebe 3 parecidos; depois outro daqui a 3 dias.
- **Já existe.** `recordQuiz` guarda o melhor score por quiz — mas não *que*
  pergunta falhou.
- **Falta.** Ao responder, atualizar um `ReviewItem` por pergunta/tópico:
  acertou → sobe de caixa; falhou → cai para a caixa 0 (rever amanhã).
  `nextReviewAt = lastReviewedAt + REVIEW_DAYS[box] * DIA`. A regra do
  utilizador:
  - errou → caixa 0 → **amanhã**
  - acertou devagar → +1 caixa modesto → **2 dias**
  - acertou bem → → **7 dias**
  - acertou repetido → caixas altas → **14 / 30 dias**
  ("devagar/bem" vem do tempo de resposta da sessão; se usou ajuda, não sobe.)
- **Onde.** Novo `apps/web/src/study/review.ts` (lógica pura, testável) +
  chamada em `Quiz.tsx` no `recordQuiz`. Uma fila `dueReviews(now)` devolve o
  que está vencido para alimentar missões e o "corrigir erros de ontem".
- **Notas.** Precisa de **ids estáveis de pergunta**. Hoje as perguntas em
  markdown não têm id — gera um id determinístico (`${lessonId}#${index}` ou
  hash do enunciado) para não depender de o autor escrever um.

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

### 4.7 Diagnóstico inicial  *(estende o Simulado)*

- **O que é.** Antes do plano, um mini-teste (Português: leitura+interpretação;
  Matemática: contas+problemas; Estudo do Meio: matéria do ano). A app decide
  nível, plano recomendado (ex.: 15 dias) e matérias críticas.
- **Já existe.** `Simulado.tsx` constrói testes mistos por disciplina+ano.
- **Falta.** Um fluxo "Diagnóstico" que corre 3 mini-simulados curtos, classifica
  (`level`, `criticalSubjects`, `recommendedDays`) e grava `sprout.diagnostic.v1`,
  depois semeia o `StudyPlan`.
- **Onde.** Novo `apps/web/src/study/Diagnostic.tsx` (reusa `buildSimulado` e o
  motor `Quiz`) + `study/plan.ts`.

### 4.8 Modo "Férias / Recuperar o ano"  *(novo — a peça central)*

- **O que é.** Plano intensivo simples e diário:
  - 20 min leitura · 20 min matemática · 10 min revisão dos erros
  - 1 teste curto ao domingo
  - objetivo: não perder o ritmo e recuperar matérias fracas, aos poucos.
- **Falta.** `study/plan.ts` gera um `StudyPlan` a partir do diagnóstico:
  preenche `schedule` (missões por dia), marca o teste de domingo, e dá prioridade
  às `focusSubjects` e aos erros vencidos. Recalcula diariamente conforme o que
  foi (ou não) feito.
- **Onde.** `study/plan.ts` + a vista do plano (§4.9).
- **Notas.** Sem culpa: um dia falhado reaparece, não acumula penalização.

### 4.9 Calendário / "O meu plano"  *(novo, child + pais)*

- **O que é.** Calendário com **1 mês para trás, mês atual e 2 meses à frente**.
  Dias passados mostram o que se estudou (verde/amarelo/vermelho/azul); dias
  futuros mostram missões planeadas.
- **Já existe.** O heatmap (`ParentArea.tsx`) é por trimestre e só para trás; o
  gráfico de uso é por mês e só para trás. **Não reescrevas** — extrai a
  agregação por dia (`aggregateByDay`) para um módulo partilhado e constrói uma
  vista de calendário em cima dela, agora com futuro.
- **Falta.**
  - Novo *kind* de `View`: `{ kind: "plano" }`, rota `#/plano` (validar em
    `nav.ts`, mapear em `viewToHash`/`viewFromHash`).
  - Vista child-facing "O meu plano de hoje" (missões grandes, tocáveis) e a
    grelha de calendário (passado real + futuro planeado).
  - Cores por dia: **verde** estudou bem · **amarelo** estudou pouco ·
    **vermelho** não estudou/saiu · **azul** fez teste.
- **Onde.** `apps/web/src/study/Plano.tsx`; extrair `study/calendar.ts` da
  agregação hoje em `ParentArea.tsx` (DRY).

### 4.10 Modo pré-leitor (1.º ano)  *(novo + estende widgets)*

- **O que é.** Para quem ainda não lê: áudio a ler a pergunta, imagens, sílabas
  grandes, arrastar letras, completar palavras, "ouve e escolhe", **menos texto**.
- **Já existe.** *Read-aloud* em todo o lado; `QuizOption.emoji` + `layout:"grid"`
  (respostas por imagem); o widget `soundcards`.
- **Falta.** Uma *flag* global "modo pré-leitor" (auto para 1.º ano, alternável
  na área dos pais) que: aumenta tipos de letra, dá destaque ao altifalante,
  prefere opções com emoji/imagem, e encaminha para widgets de letras/sílabas.
  Possíveis widgets novos: "arrastar letras", "completar palavra", "ouve e
  escolhe" (alguns podem nascer do `soundcards`).
- **Onde.** *Flag* no facade (`sprout.parent.v1` ou novo) + condições em
  `Quiz.tsx`/`Markdown.tsx`. Respeita sempre a regra de voz só por toque.

### 4.11 Área dos pais: alertas reais + relatório semanal  *(estende ParentArea)*

- **O que é.**
  - Alertas: *"⚠️ Saiu do browser 4× durante o estudo" · "⚠️ Fez o teste em 2
    min — pode ter respondido à pressa" · "⚠️ Erra sempre problemas de medidas" ·
    "✅ Melhorou a leitura esta semana".*
  - Relatório de domingo: dias estudados, minutos totais, subiu de X% para Y%,
    o que rever, plano da próxima semana.
- **Já existe.** Todo o dashboard (heatmap, uso, *streaks*, recompensas). O
  `Achievement.secs` permite o alerta de "teste demasiado rápido".
- **Falta.** Um derivador `study/alerts.ts` (regras puras sobre sessões +
  achievements + review) e um cartão `WeeklyReport` na `ParentArea`. Mantém tudo
  **derivado** dos logs — não guardes relatórios.
- **Onde.** `ParentArea.tsx` (novos cartões) + `study/alerts.ts`. Linguagem
  sempre positiva ([[tone-empathetic-fun]]).

### 4.12 TPC  *(novo)*

- **O que é.** Uma área "TPC / Plano": rever 1 lição, fazer 10 exercícios, teste
  rápido, corrigir erros, repetir matéria fraca — com prazo e estado.
- **Falta.** Reaproveita `Mission`/`StudyPlan`: o TPC é um conjunto de missões
  com `dueDate`. Estado `todo | in_progress | done`, score ao concluir.
- **Onde.** Parte da vista `#/plano`. Não inventes um modelo paralelo ao
  `Mission`.

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
| Sistema de TPC | §4.12 | novo (sobre `Mission`) |
| Revisão espaçada | §4.2 | novo |
| Dashboard dos pais | §4.11 | **já existe** + estende |
| Calendário (-1 / +2 meses) | §4.9 | novo (sobre agregação atual) |
| Tracking de sessão (sair do browser) | §4.1 | novo |
| IndexedDB → Supabase | §3, §10 | costura pronta |
| Modo Férias / Recuperar o ano | §4.8 | novo |
| Diagnóstico inicial | §4.7 | estende Simulado |
| Modo pré-leitor (1.º ano) | §4.10 | novo + widgets |
| Banco de erros | §4.2 | novo |
| Explicação passo a passo | §4.3 | estende `explain` |
| Missões curtas | §4.6 | estende Missões |
| Alertas reais (pais) | §4.11 | novo derivador |
| Dificuldade progressiva | §4.4 | novo, leve |
| Estudar com ajuda | §4.5 | novo |
| Relatório semanal | §4.11 | novo cartão |
| Tom emocional/motivacional | §0, §9 | transversal |
| Modo professor (PDF) | §4.13 | futuro |

---

## 7. Onde vive o quê (novos ficheiros)

```
apps/web/src/study/
  types.ts        // modelos (§3)
  sessions.ts     // tracking de sessão (§4.1)
  review.ts       // banco de erros + revisão espaçada (§4.2)
  missions.ts     // gerador de missões diárias (§4.6)
  plan.ts         // plano férias/recuperação (§4.8)
  calendar.ts     // agregação por dia partilhada (extraída de ParentArea) (§4.9)
  alerts.ts       // regras de alertas + relatório (§4.11)
  Diagnostic.tsx  // fluxo de diagnóstico (§4.7)
  Plano.tsx       // vista child-facing "O meu plano" + calendário (§4.9)
```

Toca também: `nav.ts` (View `plano`), `App.tsx` (montar tracker + rota),
`Quiz.tsx` (`steps`/`hint`/`level`/`assisted`), `ParentArea.tsx` (alertas +
relatório, extrair agregação), `storage/backend.ts` (`SupabaseBackend` futuro).

---

## 8. Ordem de implementação

Constrói de baixo para cima — os dados primeiro, a UI depois:

1. **Modelos** (`study/types.ts`) — sem UI, só tipos + `REVIEW_DAYS`.
2. **Sessões** (`study/sessions.ts` + *hook* no `App`). Já dá o alerta "saiu do
   browser".
3. **Calendário** — extrai `calendar.ts` de `ParentArea`, depois a vista
   `#/plano` com -1/+2 meses (passado real primeiro).
4. **Banco de erros + revisão** (`review.ts`, ligado ao `recordQuiz`).
5. **Explicação passo a passo + estudar com ajuda** (`Quiz.tsx`).
6. **Missões curtas** (`missions.ts`) a partir dos erros vencidos.
7. **Diagnóstico** (`Diagnostic.tsx`) → **plano férias/recuperação** (`plan.ts`).
8. **Alertas + relatório semanal** na área dos pais.
9. **Dificuldade progressiva** (liga o auto-ajuste ao banco de erros).
10. **Modo pré-leitor** (1.º ano).
11. **Conteúdo:** problemas escritos, 4.ª Dinastia, reforço por ano/disciplina.
12. **TPC** (sobre as missões) e, mais tarde, **Supabase** + **modo professor**.

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
```
