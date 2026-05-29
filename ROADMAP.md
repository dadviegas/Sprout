# Roadmap — o que falta 🚧

Documento honesto sobre o que **já existe** e o que **ainda falta**. Atualizado após a passagem a **monorepo** (`@sprout/icons` + `@sprout/ui` + `apps/web`), o **sistema de ícones próprio**, o redesign **"Candy Quest"** (temas claro/escuro), a **navegação por ano** e os **widgets interativos**.

## Estado num relance

- **Arquitetura:** monorepo pnpm — `packages/icons`, `packages/ui`, `apps/web`. ✅
- **Design:** tema "Candy Quest" (claro + escuro, segue o dispositivo), cartões 3D, animações, blobs de atmosfera. ✅
- **Navegação:** escola por **ano** → matéria → lição (o filho entra no 1.º ano, a filha no 4.º); **"O Mundo"** tem **secção própria** no ecrã inicial (Açores/Portugal na raiz + entrada "Pelo mundo fora"). ✅
- **Config da página:** marca, mascote e a estrutura de "O Mundo" em `apps/web/src/site.config.yaml` (editar a página = editar YAML). ✅
- **Ícones:** todo o *chrome* usa `@sprout/icons` (sem emoji solto). ✅
- **Widgets interativos:** Relógio, Formas SVG, Reta numérica, Caixa do 10, Frações, Dinheiro, SoundCards. ✅ (componentes prontos)
- **Lições:** **154** com questionário · **0** placeholders. **7 disciplinas escolares** (Matemática, Português, Estudo do Meio, Inglês, Cidadania, Educação Física, Artes) + a área **O Mundo** ✅🎉
- **Design:** redesign "Atlas night" (cartões Atlantis, escuro+claro refeitos). ✅
- **Procura:** centro de comandos **Ctrl/Cmd+K** (todas as lições, filtros ano/matéria, pré-visualização). ✅
- **Dados:** **IndexedDB** atrás de interface trocável (`apps/web/src/storage/`), com espelho localStorage. ✅
- **Avaliação:** questionário final em **ecrã próprio** (botão "Fazer o teste" no fim da lição). ✅

---

## 1) Conteúdo — esqueleto completo, cobertura por aprofundar

**As 55 lições do esqueleto (4 matérias × 4 anos) estão escritas**, cada uma com questionário — já não há placeholders "🚧 Em breve".

**MAS** isto é uma **seleção**, não cobertura total das Aprendizagens Essenciais. Cada tema é uma lição curta. Ver **[docs/COVERAGE.md](docs/COVERAGE.md)** para o mapa honesto (público = privado: mesmo currículo nacional) do que está `✅ coberto`, `🟡 raso` ou `❌ em falta`.

Por fazer, por ordem:
1. **Aprofundar** as lições existentes (mais sub-tópicos e prática por tema).
2. **Encher domínios em falta** nas 4 disciplinas — Português **Oralidade** e **Educação Literária** já preenchidos (contos, lengalengas, poemas, fábulas, autores do PNL, falar/debater) ✅; falta aprofundar Matemática (cálculo mental, dados) e Estudo do Meio (experiências).
3. ~~**Acrescentar 3 áreas novas**: Cidadania e Desenvolvimento, Educação Artística, Educação Física~~ ✅ **(feito — 7 disciplinas escolares no total; cada área nova com 12 lições, 3/ano).**
4. **Revisão pedagógica** por docente do 1.º ciclo antes de fechar qualquer tema.

> Cobertura vs. Aprendizagens Essenciais continua a ser uma **seleção** (ver versão anterior do roadmap para os tópicos finos em falta).

## 2) Usar os widgets nas lições (prioritário)

Os widgets já existem mas faltam **lições que os usem** (há ficheiros prontos por ligar):

- [x] **Relógio** → lição `mat-2-horas` (ligada ✅).
- [x] **Formas SVG** → `mat-1-formas` usa o bloco `shape` ✅.
- [x] **Reta numérica** (rã) → `mat-1-somar` ✅.
- [x] **Caixa do 10** → `mat-1-numeros-10` ✅.
- [x] **SoundCards** → alargado a `pt-1-primeiras-palavras` e `pt-1-rimas` ✅.
- [x] **Frações** (pizza/barra) → lição `mat-3-fracoes` ✅.
- [x] **Dinheiro** (moedas €) → lição `mat-2-dinheiro` ✅.
- [x] **SoundCards** → alargado a `en-2-body`, `en-2-family`, `en-3-toys`, `en-3-clothes` ✅.
- [x] **Reta numérica** → também em `mat-2-numeros-100` (saltos de 10 em 10) ✅.

### Blocos de markdown disponíveis (para autores)

`quiz`, `soundcards`, `clock`, `shape`, `numberline`, `tenframe`, `fraction`, `money`, e os infográficos `stats`/`steps`/`compare`/`meters`/`keyvalue`/`quote`, mais callouts `> [!NOTE]/[!TIP]/...`.

## 3) Ícones

- [x] Sistema `@sprout/icons` (grelha 24×24, `<Icon name>`), ~50 ícones, todo o chrome migrado.
- [x] **Regra: zero emoji no chrome.** Todos os widgets (Relógio, Caixa do 10, Reta numérica, Dinheiro, Formas, Frações) usam só `@sprout/icons` nos botões/badges. (Emoji só em conteúdo de lição.)
- [ ] Refinar os ícones mais "à mão" (castle, teddy, flask, wave) — alguns traços podem melhorar.
- [ ] Ícones em falta para tópicos finos (transportes, profissões, fruta variada, instrumentos…).
- [ ] (Opcional) variante preenchida (filled) para estados ativos.

## 4) Funcionalidades / produto

- [ ] **Perfis** (vários filhos): guardar o ano de cada criança e um avatar; "continuar onde ficaste".
- [ ] **Medalhas/ofensiva** (dias seguidos) e painel para **pais** (tempo, dificuldades).
- [x] **Armazenamento durável** (IndexedDB) atrás de interface trocável — base pronta para sincronização futura.
- [ ] **PWA / offline** (instalar no telemóvel/iPad) e **sincronização** entre dispositivos (hoje o progresso é local; o backend já é trocável).
- [ ] Mais **tipos de exercício**: arrastar-e-largar, associar pares, escrever a resposta, ouvir→escolher imagem, traçar letras/números.
- [ ] Voz pt-PT mais consistente (a Web Speech API varia entre dispositivos).

## 5) Qualidade, docs e correções

- [x] **README** reescrito para o monorepo (`@sprout/icons`, `@sprout/ui`, `apps/web`), 7 disciplinas + O Mundo, config YAML, validação e armazenamento durável ✅.
- [x] Pronúncia das vogais (`pt-1-vogais`): lê **É**/**Ó** em vez de "e"/"o" ✅.
- [x] **Validação do conteúdo em build** — `scripts/validate-content.mjs` (corre em `pnpm build` e `pnpm validate`): garante que todos os blocos `quiz`/widgets têm **JSON válido**, que cada quiz tem opções e uma resposta `correct`, que cada lição tem **teste final** e que os ids de quiz não colidem. ✅
- [ ] **Testes** (progress, Quiz) — testes unitários da lógica (estrelas, merge de progresso).
- [x] **Procura global**: centro de comandos Ctrl/Cmd+K com filtros e pré-visualização ✅.
- [x] **Acessibilidade**: **foco visível** em todos os elementos interativos (regra `:focus-visible` global — opções de quiz, ícones, centro de comandos, caixa de procura) e **leitura das opções** em voz alta no quiz ✅. *(Opcional, por fazer: navegação por setas tipo radiogroup nas opções.)*
- [ ] **Revisão pedagógica** de todo o conteúdo por docente do 1.º ciclo.
- [x] Performance: **code-splitting** — `react-markdown` + widgets em *chunk* assíncrono (main.js 672 → 350 KB) ✅.

## 6) Conteúdo em escala (quando quiseres)

- [ ] Aprofundar/encher os domínios em falta (ver §1 e `docs/COVERAGE.md`) de uma vez com um **fluxo multi-agente** (autor + verificação adversarial), seguindo o esquema de `quiz`/widgets, com revisão final.

## 7) Nova área — "O Mundo & Curiosidades" 🌍 ✅ (secção própria)

**Implementada** como **secção própria no ecrã inicial** (já não é a "5.ª matéria" dentro dos anos da escola): **21 lições**, dos **Açores ao mundo**, cada uma etiquetada por `zona`/`país` para uma futura vista de mapa.

**Navegação:** os **Açores** e **Portugal** (a identidade da criança) têm cartão próprio na raiz; o resto do mundo está sob a entrada **"Pelo mundo fora"** (Europa e Atlântico, mundo inteiro). Os "anos" são **anéis de proximidade**, nunca "X.º ano". As etiquetas de cada anel/secção vivem em `apps/web/src/site.config.yaml` (config da página).

Falta (opcional): a **vista de mapa** (hipótese B) e continuar a alargar conteúdos.

Uma **5.ª área**, diferente das disciplinas: factos curiosos e *common sense* sobre o mundo, **com Portugal e os Açores no centro** e depois a abrir para o resto do mundo. Objetivo: cultura geral e orgulho/identidade local — porquê há dia e noite ao mesmo tempo em sítios diferentes, o que é uma capital, bandeiras, climas, vulcões, animais de cada continente, comidas típicas, maravilhas do mundo…

### Análise — como organizar (geografia vs. navegação por ano)

A app navega **ano → matéria → lição**. Geografia quer-se **por zonas/países**. Três hipóteses:

| Abordagem | Como | Prós | Contras |
| --- | --- | --- | --- |
| **A. 5.ª matéria no modelo atual** | "O Mundo" entra como matéria; os 4 "anos" passam a ser **anéis de proximidade** (perto→longe) | Zero mudança de navegação; reaproveita cartões, testes, progresso, conquistas; modelo pedagógico-padrão ("horizontes que se expandem") | O *browse* por país fica implícito, dentro dos anos |
| **B. Eixo de navegação novo (mapa)** | Entrada "Explorar o Mundo" → continente → país | Fiel ao "por zonas/países"; ótimo para exploração livre | Novos `View`, novos ecrãs, não reusa o andaime de ano/teste; muito mais código |
| **C. Híbrida (recomendada)** | Construir como **A**, mas **etiquetar** cada lição por `zona`/`país` para, mais tarde, montar **B** (vista mapa) por cima sem reescrever conteúdo | Entrega já; mantém porta aberta para o mapa | Exige decidir já o esquema de etiquetas |

**Recomendação: C.** Começar pela 5.ª matéria (encaixa no que já existe; segue o modelo "expanding horizons", certo para o 1.º ciclo: começa no que a criança conhece — a sua ilha/terra — e vai abrindo), com cada lição etiquetada por zona/país para uma futura **vista de mapa** opcional.

### Estrutura proposta (anos = anéis "casa → mundo", com PT/Açores no centro)

- **1.º — A minha ilha / a minha terra** 🏘️🌋 — a minha localidade; **os Açores**: as 9 ilhas, o mar à volta, vulcões e lagoas (Sete Cidades, Furnas), animais (baleias, golfinhos, cagarro), o que é uma ilha, dia/noite.
- **2.º — Portugal** 🇵🇹 — Continente + **Açores e Madeira** (regiões autónomas), Lisboa e as ilhas, rios e serras, símbolos nacionais, comidas (cozido das Furnas, queijo, ananás dos Açores), curiosidades portuguesas.
- **3.º — A Europa e o Atlântico** 🇪🇺🌊 — onde ficam os Açores no meio do Atlântico, países vizinhos, a bandeira da Europa, línguas, o oceano que nos rodeia, descobrimentos.
- **4.º — O mundo inteiro** 🌐 — continentes e oceanos, países famosos, maravilhas, culturas, *common sense* global (fusos horários — porque os Açores têm **menos 1 hora** que o Continente! —, hemisférios, moedas).

> **Açores em destaque:** por o utilizador ser dos Açores, a ilha é o **ponto de partida** (1.º ano) e reaparece como fio condutor (a única região com fuso horário próprio, vulcões, baleias, o ponto mais a oeste da Europa). Identidade primeiro, mundo depois.

### O que é preciso no código

- [x] **Cor** — `--subj-mundo` / `--subj-mundo-soft` em `tokens.css` (claro + escuro) ✅.
- [x] **Ícone** — `compass` (+ `island`, `wave2`) em `@sprout/icons` + entrada em `SUBJECT_ICON` ✅.
- [x] **`mundoSubject` em `curriculum.ts`** — separado de `schoolSubjects` (os anos da escola só listam as 4 disciplinas); `Lesson` tem `zona?`/`pais?` ✅.
- [x] **Secção própria no ecrã inicial** — `View` ganhou `{ kind: "mundo" }` (entrada "Pelo mundo fora"); breadcrumb e cabeçalhos usam `tierLabel` (anel, nunca "ano") ✅.
- [x] **Config da página** — `site.config.yaml` define marca, mascote e a estrutura de "O Mundo" (título/sub da secção, entrada "Pelo mundo fora", anéis com `home`) ✅.
- [x] **Conteúdo** `.md` — **21 lições**, mesmo formato; reusa read-aloud, teste à parte e conquistas ✅.
- [ ] *(Futuro, opcional)* **vista mapa** (hipótese B) que lê as etiquetas `zona`/`país`.

> Nota: isto **complementa** Estudo do Meio (que já toca Portugal, continentes, sistema solar) — aqui o tom é **curiosidade, identidade açoriana e cultura geral**, não avaliação curricular.

---

## Como ajudar a fechar lacunas

Escrever lições é o que mais avança: cada `.md` novo + uma linha em `curriculum.ts` transforma um "🚧 Em breve" numa lição a sério, já com acesso a todos os widgets e ao read-aloud em pt-PT.
