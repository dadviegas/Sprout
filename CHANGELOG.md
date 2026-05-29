# Changelog

Todas as alterações notáveis a este projeto são registadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/);
versões seguem [SemVer](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado
- **Português: Oralidade e Educação Literária (+8 lições)** — preenche os dois domínios das AE que faltavam. **Oralidade**: *Saber ouvir e falar* (1.º), *Contar e recontar uma história* (2.º), *Falar para os outros* (3.º), *Ouvir, opinar e debater* (4.º). **Educação Literária**: *Os contos tradicionais* (1.º), *Poemas e lengalengas* (2.º), *As fábulas e a moral* (3.º), *Histórias e autores portugueses* (4.º, com Sophia, Luísa Ducla Soares, PNL). Mesmo formato (resumo + exemplos + truque + "Para saberes mais 🌱" + quiz + teste). Português passa a 30 lições.
- **Acessibilidade** — **foco visível** em todos os elementos interativos: uma regra `:focus-visible` global (baixa especificidade, os anéis ricos de `.pill`/`.big-card` continuam a ganhar) garante um anel de foco nas **opções de quiz**, ícones da barra de topo, linhas do centro de comandos e caixa de procura — que antes não o mostravam. No quiz, o botão **🔊 lê agora a pergunta *e* as opções** em voz alta (para quem navega por teclado ou ainda não lê).
- **Nova disciplina "Educação Física" 🤸** — completa as **3 áreas novas** (são agora **7 disciplinas escolares**). **12 lições, 3 por ano**, no registo "conhecer sobre" (não se faz EF no ecrã): 1.º *Mexer o corpo · Aquecer e descansar · Jogos e brincadeiras*; 2.º *Equilíbrio e coordenação · Jogos tradicionais portugueses · Desportivismo*; 3.º *Desportos individuais/de equipa · O exercício e o corpo · Ginástica*; 4.º *Jogos Olímpicos · Vida ativa e saudável · Desporto em segurança*. Nova cor `--subj-fis` (vermelho, claro+escuro) e ícone `body`. **Conclui o item "3 áreas novas" do roadmap.**
- **Reta numérica em "Números até 100"** — a lição `mat-2-numeros-100` passou a usar o widget `numberline` para mostrar os **saltos de 10 em 10** (o sapo salta 40 → 50 → 60). Fecha a última ligação de widget em falta.
- **Nova disciplina "Educação Artística" 🎨** — área de expressão criativa, como matéria da escola (por ano). **12 lições, 3 por ano**, a cobrir Artes Visuais, Música, Teatro e Dança: 1.º *As cores · Linhas e formas · Sons*; 2.º *Misturar cores · Instrumentos musicais · Faz de conta (teatro)*; 3.º *Pintar/colar/recortar · Ritmo e pulsação · A dança*; 4.º *Pintores famosos · Música e compositores · Danças do mundo*. Com identidade portuguesa (Paula Rego, Vieira da Silva, guitarra portuguesa, fado/Amália, folclore e danças dos Açores). Nova cor `--subj-art` (magenta, claro+escuro) e ícone `palette`.
- **Nova disciplina "Cidadania e Desenvolvimento" 🤝** — 5.ª matéria da escola (por ano, a par de Matemática/Português/Estudo do Meio/Inglês), fechando uma área que estava por cobrir. **12 lições, 3 por ano**, em progressão: 1.º *Direitos e deveres · Reciclar · Todos diferentes*; 2.º *Emoções · Poupar e gastar · Ajudar a comunidade*; 3.º *Internet segura · Igualdade · Consumir com cabeça*; 4.º *Recursos do planeta · Regras e votar · Saúde, sono e ecrãs*. Mesmo formato (resumo + exemplos + truque + "Para saberes mais 🌱" + quiz + teste à parte + read-aloud). Nova cor `--subj-cid` (laranja, claro+escuro) e ícone `heart`.
- **Nova área "O Mundo & Curiosidades" 🌍** — área de cultura geral e *common sense* (não é matéria de escola nem está ligada a um ano), **com os Açores no centro** e a abrir para o mundo. Tem **secção própria no ecrã inicial**, por baixo da escolha do ano: os **Açores** e **Portugal** (a identidade da criança) têm cartão próprio na raiz, e o resto do mundo está sob a entrada **"Pelo mundo fora"** (*A Europa e o Atlântico*, *O mundo inteiro*). Navega por **anéis de proximidade**, nunca por "X.º ano" (cabeçalhos e *breadcrumb* usam `tierLabel`). **21 lições** no total, mesmo formato (quiz + teste à parte + read-aloud), cada uma etiquetada por `zona`/`país` para uma futura vista de mapa. Nova cor `--subj-mundo` (claro+escuro) e ícones `compass`/`island`/`wave2`/`world`.
- **Config da página em YAML** — [site.config.yaml](apps/web/src/site.config.yaml) passa a ser a **fonte única** das definições da página (marca, mascote e a estrutura de "O Mundo": título/subtítulo da secção, entrada "Pelo mundo fora" e os anéis com o seu `home`/ícone/texto). Carregada em *build time* por um *loader* próprio (`yaml-loader.cjs`) através de [site-config.ts](apps/web/src/site-config.ts) — o parser de YAML **não** entra no *bundle* (só o objeto resultante). Mudar a página passou a ser editar YAML, não código.
- **Novas lições de "O Mundo" (+8)** — Açores: *A lenda das Sete Cidades*, *Os símbolos dos Açores*; Portugal: *Os símbolos de Portugal*, *Rios, serras e cidades*; Europa/Atlântico: *Os países vizinhos e o euro*, *Animais do oceano*; Mundo: *Animais de cada continente*, *Bandeiras do mundo*. (13 → **21**.)
- **README reescrito** — atualizado para o monorepo (`@sprout/icons`/`@sprout/ui`/`apps/web`), as 7 disciplinas + a área "O Mundo", a config YAML, a validação de conteúdo e o armazenamento durável; remove a descrição antiga (single-package, 4 matérias, placeholders).
- **`CLAUDE.md`** — notas de trabalho do repo: arquitetura, convenções (código/comentários em inglês, conteúdo em pt-PT, zero emoji no *chrome*, read-aloud, formato das lições) e o foco de engenharia: **DRY, KISS, refactor à medida que se mexe**.
- **Validação do conteúdo em build** — [validate-content.mjs](apps/web/scripts/validate-content.mjs) (sem dependências) verifica as **110 lições**: todos os blocos `quiz`/widgets têm **JSON válido**, cada quiz tem opções e uma resposta `correct` (e só uma), cada lição tem **teste final** (`final: true` + marcador) e os ids de quiz não colidem dentro da lição. Corre em `pnpm validate` e **trava o `pnpm build`** se houver erros — um bloco mal formado deixa de chegar ao ecrã da criança como cartão de erro.
- **Conquistas (achievements)** — cada teste concluído fica **registado por data** e pela **área** onde foi feito (matéria + ano + estrelas + percentagem), guardado de forma durável (IndexedDB, `sprout.achievements.v1`). Painel **agrupado por dia** ("Hoje", "Ontem", data), aberto pela estrela ⭐ na barra de topo; protegido contra duplicação acidental.
- **Code-splitting** — o renderizador de Markdown (react-markdown + plugins + todos os widgets) passou a carregar em *chunk* assíncrono, só nos ecrãs de lição/teste. O `main.js` desceu de **672 KB → 350 KB**; o resto (309 KB) só carrega quando se abre uma lição. Primeiro *paint* mais leve.
- **Teste à parte por lição** — o questionário final deixa de estar no fim da página da lição e passa a ter **ecrã próprio**, com cabeçalho de avaliação. No fim de cada lição há um botão **"Fazer o teste →"** (ou "Repetir o teste", com as estrelas já ganhas). A lição mostra só a matéria + a prática; o teste avalia. No fim do teste, atalho para a **próxima lição**.
- **Redesign "Atlas night"** — cartões ao estilo do design system Atlantis: zona de pré-visualização (motivo de anéis + ícone com tom da matéria) + zona de meta (categoria, título, descrição), bordas finas e sombras suaves. Tema **escuro** (quase preto, calmo) e **claro** (papel limpo) refeitos de raiz.
- **Centro de comandos (Ctrl/Cmd+K)** — procura em **todas** as lições (título **e** texto), com filtros por **ano** e **matéria** e **pré-visualização** do excerto encontrado; navegação por teclado (↑↓/↵/esc). A procura **ignora acentos** ("matematica" encontra "Matemática") e **tolera 1 erro** por palavra ("fracioes" encontra "frações"), via *folding* sem acentos e distância de edição limitada.
- **Armazenamento durável** — nova camada em [storage/](apps/web/src/storage/): facade síncrona com cache, **IndexedDB** como backend principal e espelho em localStorage, atrás de uma **interface trocável** (`StorageBackend`) — mudar de backend é uma linha. Progresso, tema e navegação migrados; merge na hidratação não perde progresso da sessão.
- **Ícones SVG nos blocos** `steps`/`keyvalue` — o campo `icon` aceita o nome de um ícone `@sprout/icons` (além de emoji).
- **Widgets ligados a lições** — `tenframe` (Números até 10), `numberline` (Somar), `shape` (Formas), e o `clock` da lição **As horas** (que já existia mas não estava ligada).
- **5 novas lições do 1.º ano** — Mat: *Antes e depois, dia e noite*; Português: *As primeiras palavras*, *Rimas e lengalengas*; Estudo do Meio: *A minha família*, *Higiene e saúde*. **O 1.º ano fica completo.**
- **8 novas lições do 2.º ano** — Mat: *Números até 100*, *O dinheiro* (com widget `money`); Português: *Nome e ação*, *Singular e plural*; Estudo do Meio: *Os animais*, *A água*; Inglês: *My body*, *My family*. **O 2.º ano fica completo.**
- **9 novas lições do 3.º ano** — Mat: *A divisão*, *Frações simples* (com widget `fraction`), *Comprimento e massa*; Português: *Família de palavras*, *Escrever um texto*; Estudo do Meio: *Portugal: o meu país*, *Sólidos, líquidos e gases*; Inglês: *Toys*, *Clothes*. **O 3.º ano fica completo.**
- **9 novas lições do 4.º ano** — Mat: *Área e perímetro*, *Gráficos e tabelas* (widget `meters`), *Resolver problemas*; Português: *Tipos de texto*, *Acentos e ortografia*; Estudo do Meio: *Os sistemas do corpo*, *História de Portugal*; Inglês: *Weather*, *What time is it?* (widget `clock`). **🎉 Todo o currículo do 1.º ao 4.º ano fica completo — 55 lições, 0 placeholders.**
- **Regra: chrome sem emoji** — todos os widgets (Relógio, Caixa do 10, Reta numérica, Dinheiro, Formas, Frações) passaram a usar **só** `@sprout/icons` nos botões e badges; novos ícones `plus`, `minus`, `trash`, `grid`, `search`.

### Corrigido
- **Botões "fantasma"** — um reset de CSS (`.sprout-root button`, especificidade 0,1,1) estava a **vencer** as classes de componente (`.pill`, especificidade 0,1,0), apagando fundo, bordo e *padding* de **todos** os botões estilizados — sobrava só a sombra (aquela curva verde solta) e o texto. O reset passou a usar `:where(.sprout-root)` (especificidade zero), por isso `.pill`/`.iconbtn`/`.test-cta` voltam a renderizar. Os botões `.pill` e `.iconbtn` foram também **remodelados** para o visual plano "Atlas" (sem a sombra 3D estilo rebuçado, que destoava do novo design).
- **Pronúncia das vogais** (`pt-1-vogais`): o leitor dizia "E"/"O" como as palavras *e*/*o* (soavam a "i"/"u"); passou a ler **É** e **Ó** (o som da letra).
- **Quiz** — opções agora são cartões de alto contraste (eram quase invisíveis no escuro) e deixam de esticar a toda a largura; a **pergunta é lida em voz alta** automaticamente ao aparecer.

Ver [ROADMAP.md](ROADMAP.md) para o que está planeado e o que ainda falta.

## [0.2.0] — 2026-05-29

Reestruturação em monorepo, sistema de ícones próprio, redesign "Candy Quest" e widgets interativos.

### Arquitetura
- **Monorepo pnpm**: `@sprout/icons` (ícones), `@sprout/ui` (design system + widgets + estilos), `apps/web` (app). React único garantido por alias no Rspack.

### Adicionado
- **`@sprout/icons`** — sistema de ícones próprio numa grelha 24×24, `<Icon name>` (~45 ícones); todo o *chrome* da app passou a usar ícones (sem emoji solto).
- **Redesign "Candy Quest"** — tema claro **e** escuro (segue o dispositivo via `prefers-color-scheme`); paleta vívida, cartões 3D "press", tipografia Baloo 2 + Nunito, blobs de atmosfera, animações (pop-in, hover, mascote a flutuar).
- **Navegação por ANO** — Início (escolher ano) → matéria → lição. Cada criança entra no seu ano (1.º–4.º).
- **Widgets interativos** (em `@sprout/ui`): `clock` (relógio a sério), `shape` (formas SVG), `numberline`, `tenframe`, `fraction`, `money`, `soundcards`.
- **SoundCards** — cartões com ícone/letra + palavra + botão de som (pt-PT), para o 1.º ano (ver · ouvir · repetir); usado nas vogais.
- **Read-aloud** com ícone de altifalante nas perguntas, explicações e mensagens do mascote.
- **ErrorBoundary** — um erro deixa de "branquear" o ecrã; mostra mensagem e botão de recomeço.

### Corrigido
- **Ecrã em branco** ao abrir: a navegação guardada do layout antigo (matéria-primeiro) era incompatível com o novo (ano-primeiro). `loadView` passou a **validar** o estado guardado contra o esquema atual e a chave subiu para `sprout.nav.v2`.

## [0.1.0] — 2026-05-29

Primeira versão — esqueleto completo do currículo + conjunto inicial de lições.

### Adicionado

- **Aplicação base** (Rspack + React 18 + TypeScript), _single-page_, sem servidor.
- **Design infantil** com base nos _tokens_ do design system Atlas (`atlantis-azores`):
  nova paleta `sprout` (claro/escuro), cores por matéria, tipografia `Baloo 2` + `DM Sans`.
- **Navegação por cartões grandes** (Início → Matéria → Ano → Lição), sem árvore obrigatória;
  **índice opcional** em gaveta para pais/professores.
- **Mascote "Feijãozinho" 🌱** com mensagens de encorajamento.
- **Quizzes interativos** (`Quiz`) com feedback imediato, explicações, estrelas (0–3) e **confetti**.
- **Questionário final** por lição que atribui as estrelas (`"final": true`).
- **Leitura em voz alta** (pt-PT) de perguntas, explicações e mensagens — para quem ainda não lê.
- **Acompanhamento de progresso** em `localStorage` (visitas, conclusão, estrelas) com barras por
  matéria/ano e total de ⭐.
- **Renderizador de Markdown** com blocos especiais: `quiz`, `stats`, `steps`, `compare`,
  `meters`, `keyvalue`, `quote`, e callouts `> [!NOTE]/[!TIP]/...`.
- **Design responsivo** para telemóvel, iPad e computador; suporte a `prefers-reduced-motion`.
- **Estrutura completa do currículo** (4 matérias × 4 anos × tópicos) em `curriculum.ts`.
- **22 lições completas** com questionário, incluindo o 1.º ano preenchido de forma rica:
  - Matemática: Números até 10/20, Somar e subtrair, Formas (1.º); Tabuada 2 e 5 (2.º);
    Multiplicação (3.º); Decimais (4.º).
  - Português: Vogais, Sílabas (1.º); Pontuação (2.º); Sinónimos/Antónimos (3.º); Classes de palavras (4.º).
  - Estudo do Meio: O meu corpo, Dias da semana (1.º); Estações do ano (2.º); As plantas (3.º); Sistema solar (4.º).
  - Inglês: Hello!, Colours, Numbers 1–10 (1.º); Animals (2.º); Food (3.º); Days & months (4.º).
- **Documentação**: `README.md`, este `CHANGELOG.md` e `ROADMAP.md`.

### Notas

- As restantes lições do esqueleto aparecem como **"🚧 Em construção"** — ver `ROADMAP.md`.
- O conteúdo segue as Aprendizagens Essenciais mas **ainda não foi revisto por um docente**.
