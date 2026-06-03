# MATERIAL.md — Currículo 1.º–6.º ano + mapa de cobertura 🌱

Documento de referência para o conteúdo do Sprout: **o currículo completo** que
uma app de estudo do Ensino Básico português (1.º ao 6.º ano) deve cobrir,
seguido de um **mapa honesto** do que **já está** na app e do que **falta** — e
de uma análise sobre **SVG estáticos/animados e imagens** em iPad, telemóvel e
desktop.

- **Como ler.** A 1.ª parte é o *currículo-alvo* (o que se deve aprender),
  organizado **ano → disciplina → domínios → tópicos**, alinhado com as
  **Aprendizagens Essenciais** (Decreto-Lei 55/2018). A 2.ª parte (no fim) é a
  **cobertura real**, medida diretamente de
  [apps/web/src/content/curriculum.ts](apps/web/src/content/curriculum.ts).
- **Legenda de estado:** ✅ coberto (lição com teste) · 🟡 raso/parcial (existe
  mas pede mais profundidade ou está dentro de outra lição) · ❌ em falta.
- **Princípio.** A app **não** persegue 1500 micro-tópicos soltos. Segue o
  `CLAUDE.md`: **uma lição curta e completa por domínio** (resumo "O que vais
  aprender" → exemplos → truque mental → problema resolvido → "Para saberes mais
  🌱" → prática + teste final). O *esqueleto* dos 6 anos já existe; o que falta é
  sobretudo **profundidade** e alguns **domínios finos**, não anos inteiros.

> Os dois ciclos têm conjuntos de disciplinas **diferentes**:
> - **1.º ciclo (1–4):** Matemática, Português, Estudo do Meio, Inglês,
>   Cidadania, Artes, Educação Física.
> - **2.º ciclo (5–6):** Matemática, Português, Inglês, Ciências Naturais,
>   História e Geografia de Portugal, Ed. Visual, Ed. Tecnológica, Ed. Musical,
>   Ed. Física, Cidadania.

---

# Parte 1 — Currículo-alvo (1.º ao 6.º ano)

## 1.º Ciclo

### 1.º Ano

**Português**
- *Leitura e escrita:* vogais · consoantes · alfabeto · ordem alfabética ·
  maiúsculas e minúsculas · correspondência som–letra · sílabas (simples e
  complexas) · divisão silábica · ditongos · ler palavras / frases / pequenos
  textos · escrever palavras e frases · ditados e cópia · completar palavras e
  frases.
- *Gramática:* nome próprio e comum · singular/plural · masculino/feminino ·
  antónimos e sinónimos simples · família de palavras · pontuação básica.
- *Oralidade e compreensão:* saber ouvir e falar · contos tradicionais ·
  identificar personagens / locais / ações · sequência de acontecimentos ·
  responder a perguntas · recontar histórias · rimas e lengalengas.

**Matemática**
- *Números:* contar até 10 / 20 / 50 / 100 · contagem progressiva e regressiva ·
  antecessor/sucessor · comparar (>, <, =) · ordinais · dezenas e unidades.
- *Operações:* adição (com e sem transporte) · subtração · problemas de
  adição/subtração · cálculo mental · dobro e metade.
- *Geometria:* círculo · quadrado · retângulo · triângulo · identificar e
  comparar formas.
- *Medida:* comprimento · altura · peso · capacidade · comparar medidas.
- *Tempo:* dias da semana · meses · estações · calendário · horas certas.
- *Dados:* pictogramas simples · ler tabelas simples.

**Estudo do Meio**
- *À descoberta de si:* nome/idade/data · partes do corpo · cinco sentidos ·
  higiene · alimentação · exercício · emoções.
- *Família e escola:* membros e relações · tarefas · respeito · espaços e
  pessoas da escola · regras · segurança.
- *Natureza:* animais (domésticos/selvagens) · plantas e as suas partes · água ·
  ar · solo · dia e noite · estações · estado do tempo.
- *Sociedade:* profissões · transportes · serviços · segurança rodoviária.

**Inglês** *(introdução lúdica)* — hello/greetings · colours · numbers 1–10 e
11–20 · classroom · feelings.

**Cidadania** — direitos e deveres · reciclar e cuidar da Terra · todos
diferentes/todos amigos.

**Artes** — cores primárias e arco-íris · linhas e formas · desenho/pintura/
colagem/recorte/modelagem · sons (forte/fraco, rápido/devagar) · canções ·
faz-de-conta · expressão facial e corporal.

**Educação Física** — correr/saltar/lançar/receber · equilíbrio e coordenação ·
aquecer e descansar · jogos e brincadeiras · regras e trabalho de equipa.

### 2.º Ano

**Português** — leitura fluente · tipos de frase · sinais de pontuação · nome e
verbo (ação) · singular/plural · adjetivos · artigos · sílaba tónica · dígrafos
(ch, lh, nh) · ordem alfabética e dicionário · sinónimos/antónimos · contar e
recontar · poemas e lengalengas · produção de textos curtos · compreensão
leitora.

**Matemática** — números até 1000 · pares e ímpares · adição/subtração com
transporte · multiplicação e tabuadas (2, 3, 4, 5, 10) · divisão simples ·
sequências e padrões · simetria e eixos · dinheiro (euros) · medida
(comprimento, massa, capacidade) · tempo e horas · sólidos geométricos · dados.

**Estudo do Meio** — seres vivos e não vivos · estações do ano · os animais ·
a água · alimentação saudável · higiene · profissões · meios de transporte ·
símbolos nacionais · comunidade local.

**Inglês** — animals · my body · my family · food & drinks · sports · nature.

**Cidadania** — emoções e resolver conflitos · poupar e gastar bem · ajudar e
viver em comunidade.

**Artes** — misturar cores · instrumentos musicais · ritmo · teatro/faz-de-conta.

**Educação Física** — equilíbrio e coordenação · jogos tradicionais portugueses ·
ganhar e perder com desportivismo.

### 3.º Ano

**Português** — nome, adjetivo, verbo, pronome · tempos verbais (presente/
passado/futuro) · sinónimos e antónimos · família de palavras · sons do «s» ·
aumentativo e diminutivo · discurso direto · palavras que confundem (homófonos) ·
texto narrativo · carta · descrição · fábulas e moral · falar para os outros ·
compreensão de leitura.

**Matemática** — números até 10 000 · multiplicação avançada · múltiplos ·
divisão · frações simples · numerais romanos · perímetros · comprimento e massa ·
o calendário e o tempo · tabelas e gráficos.

**Estudo do Meio** — sistema digestivo, respiratório e circulatório · as
plantas · sólidos/líquidos/gases · eletricidade e ímanes · Portugal físico ·
municípios e freguesias · recursos naturais.

**Inglês** — food · my house · toys · clothes · daily routines · directions.

**Cidadania** — internet segura · igualdade (meninos e meninas) · consumir com
cabeça.

**Artes** — pintar/colar/recortar (técnicas) · ritmo e pulsação · dança e
movimento.

**Educação Física** — desportos individuais e de equipa · o exercício e o corpo ·
ginástica.

### 4.º Ano

**Português** — classes de palavras · graus do adjetivo · advérbios · sujeito e
predicado · frase simples e complexa · prefixos e sufixos · acentos e ortografia ·
o hífen e o «x» · tipos de texto · carta e convite · notícia · texto informativo
e narrativo · resumos · autores portugueses (PNL) · ouvir, opinar e debater.

**Matemática** — números até ao milhão · estimar e arredondar · números
decimais · frações equivalentes e frações/decimais · área e perímetro · ângulos
e retas · volume e capacidade · estatística (gráficos e tabelas) · resolver
problemas.

**Estudo do Meio** — sistema solar · os sistemas do corpo · proteger o ambiente ·
mapas e pontos cardeais · História de Portugal · descobrimentos · relevo e
clima · recursos naturais · União Europeia.

**Inglês** — days & months · jobs · weather · what time is it? · comparatives ·
travel & transport · casa e cidade · rotinas · descrições.

**Cidadania** — recursos do planeta · democracia (regras, votar, decidir) ·
saúde, sono e ecrãs.

**Artes** — pintores famosos · compositores · danças do mundo e de Portugal.

**Educação Física** — Jogos Olímpicos · vida ativa e saudável · desporto em
segurança.

## 2.º Ciclo

### 5.º Ano

**Português** — ouvir, falar e apresentar (oralidade) · ler e escrever texto
narrativo · classes de palavras · verbos (tempos e modos) · funções sintáticas ·
ortografia e acentuação · texto poético · educação literária (autores) · texto
dramático.

**Matemática** — números naturais e operações · múltiplos, divisores, m.d.c. e
m.m.c. · frações (comparar e operar) · números racionais não negativos
(decimais) · potências de base 10 · ângulos e polígonos · perímetros e áreas ·
sólidos geométricos · organização e tratamento de dados.

**Inglês** — greetings & introductions · personal information · family &
friends · school subjects · daily routines · present simple · hobbies & free
time · food & meals.

**Ciências Naturais** — a água (importância e qualidade) · o ar e a atmosfera ·
rochas, solo e minerais · diversidade nos animais · como vivem os animais
(funções) · diversidade nas plantas · proteger os seres vivos / ecossistemas.

**História e Geografia de Portugal** — primeiros povos da Península · os
romanos · muçulmanos e cristãos · a formação de Portugal · consolidar o reino ·
crise de 1383-1385 · a sociedade medieval · regiões de Portugal.

**Educação Visual** — ponto e linha · cor e círculo cromático · formas e
contornos · textura · comunicação visual · traçados geométricos.

**Educação Tecnológica** — o que é a tecnologia · materiais e propriedades ·
medição e rigor · higiene e segurança · estruturas · do projeto ao objeto.

**Educação Musical** — som e silêncio · pulsação e ritmo · melodia · altura dos
sons (notas) · dinâmica e andamento · instrumentos da orquestra.

**Educação Física** — aptidão física e aquecimento · ginástica de solo · jogos
desportivos coletivos · atletismo · jogos de raquetas · regras e fair play.

**Cidadania** — direitos humanos · igualdade de género · interculturalidade ·
saúde e bem-estar · educação ambiental.

### 6.º Ano

**Português** — texto descritivo e narrativo · notícia e entrevista · classes de
palavras (II) · sintaxe (funções da frase) · conjugar verbos · nome, grau e
flexão · texto dramático · poesia e recursos expressivos · educação literária
(clássicos).

**Matemática** — números inteiros relativos · multiplicar e dividir frações ·
potências e expressões numéricas · proporcionalidade direta · percentagens ·
expressões e equações · circunferência e círculo · volumes de sólidos ·
representar e interpretar dados.

**Inglês** — present continuous · past simple · places in town & directions ·
holidays & travel · comparatives & superlatives · clothes & shopping · health &
body · future plans (going to).

**Ciências Naturais** — micro-organismos · sistema digestivo · respiratório ·
circulatório · excretor · transmissão da vida (reprodução) · saúde e agressões
do meio.

**História e Geografia de Portugal** — os Descobrimentos · o império português ·
União Ibérica e Restauração · séc. XVIII e Marquês de Pombal · o Liberalismo ·
a 1.ª República · Estado Novo e 25 de Abril · Portugal democrático e a Europa.

**Educação Visual** — luz e sombra · volume e perspetiva · padrão e módulo ·
harmonias e contrastes de cor · design e cartaz · património visual.

**Educação Tecnológica** — mecanismos e movimento · energia e fontes · circuitos
elétricos · materiais e reciclagem · tecnologias de comunicação · planear e
fabricar.

**Educação Musical** — forma musical · escala e tonalidade · harmonia · géneros
musicais · música portuguesa · criar e improvisar.

**Educação Física** — condição física e saúde · ginástica de aparelhos ·
voleibol e andebol · atletismo (lançamentos) · dança · desportos de natureza.

**Cidadania** — educação financeira · risco e proteção civil · media e mundo
digital · solidariedade e voluntariado · desenvolvimento sustentável.

## Áreas transversais (não escolares, sem ano)

- **O Mundo & Curiosidades** — por *anéis de proximidade* (Açores → Portugal →
  Europa/Atlântico → mundo): ilhas, vulcões, mar, lendas e símbolos dos Açores;
  Portugal de ponta a ponta, regiões, símbolos, rios/serras/cidades; Europa,
  Atlântico, descobrimentos, países vizinhos; continentes e oceanos, fusos e
  hemisférios, maravilhas, animais por continente, bandeiras.
- **Saber de cor** — tabuadas · alfabeto · números · dinheiro · loja · dias e
  meses · pontuação · classes de palavras · conjugar verbos · formas e sólidos ·
  unidades de medida · fórmulas de área/perímetro · numerais romanos · planetas ·
  continentes e oceanos · pontos cardeais · datas da História de Portugal ·
  distritos.
- **O Dicionário** — 26 letras (A–Z), cartões de palavras lidos em voz alta.
- **Países** — conhecer um país (Portugal, Canadá): o país · bandeira e símbolos ·
  hino · comida e tradições · natureza e animais · curiosidades e recordes.

---

# Parte 2 — O que já está e o que falta

> Medido diretamente de
> [apps/web/src/content/curriculum.ts](apps/web/src/content/curriculum.ts).
> Cada número é o nº de **lições completas** (com `body` + teste). O *esqueleto
> dos 6 anos está fechado* — todas as disciplinas de ambos os ciclos têm lições
> escritas; **não há placeholders "em construção"**.

## 2.1 Cobertura por disciplina e ano

| Disciplina | 1.º | 2.º | 3.º | 4.º | 5.º | 6.º | Total |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Matemática | 8 | 9 | 8 | 9 | 9 | 9 | **52** |
| Português | 11 | 11 | 12 | 13 | 9 | 9 | **65** |
| Estudo do Meio | 6 | 5 | 5 | 5 | — | — | **21** |
| Inglês | 6 | 6 | 6 | 6 | 8 | 8 | **40** |
| Cidadania | 3 | 3 | 3 | 3 | 5 | 5 | **22** |
| Artes | 3 | 3 | 3 | 3 | — | — | **12** |
| Educação Física | 3 | 3 | 3 | 3 | 6 | 6 | **24** |
| Ciências Naturais | — | — | — | — | 7 | 7 | **14** |
| História e Geografia | — | — | — | — | 7 | 8 | **15** |
| Educação Visual | — | — | — | — | 6 | 6 | **12** |
| Educação Tecnológica | — | — | — | — | 6 | 6 | **12** |
| Educação Musical | — | — | — | — | 6 | 6 | **12** |
| **Disciplinas escolares** | | | | | | | **301** |

**Áreas transversais:** O Mundo **21** (6+5+5+5) · Saber de cor **18** ·
Dicionário **26** · Países **12** (Portugal 6 + Canadá 6) = **77**.

**Total geral ≈ 378 lições/páginas.** (O `pnpm validate` conta as que têm
questionário; o número exato muda à medida que se escreve — corre-o para a
contagem viva.)

## 2.2 Estado por disciplina — o que falta

O esqueleto está fechado; abaixo está o que **aprofundar** (🟡) e o que ainda
**falta** mesmo (❌). Nada disto bloqueia a app — é a lista de trabalho de
conteúdo.

**Matemática** ✅ esqueleto 1–6 completo.
- 🟡 Aprofundar prática por tópico nas 4 disciplinas-base (mais exercícios, mais
  exemplos passo a passo) — feito já para as áreas novas, falta na base.
- ❌ **Cálculo mental** como tema próprio (estratégias) — disperso, não isolado.
- 🟡 Estatística/dados do 6.º (média, moda, amplitude) — confirmar profundidade.

**Português** ✅ a disciplina mais bem coberta (65 lições, lacunas de 1.º ciclo
já preenchidas: ditongos, ordem alfabética, discurso direto, aumentativo/
diminutivo, advérbios, sujeito e predicado).
- 🟡 Aprofundar produção escrita guiada (planificar → textualizar → rever).

**Estudo do Meio** ✅ 1–4 coberto.
- 🟡 **Sistemas do corpo** estão numa só lição (`edm-4-corpo-sistemas`) — o
  currículo do 3.º separa digestivo/respiratório/circulatório; considerar 3
  lições (ou aprofundar com o widget de corpo proposto na Parte 3).
- ❌ **Experiências/ciência prática** (observar, registar, concluir) como tema.
- 🟡 Relevo e clima de Portugal — rasos dentro de `edm-3-portugal`.

**Inglês** ✅ 1–6 coberto (40 lições).
- 🟡 Mais prática de *listening*/áudio por unidade.

**Ciências Naturais (5–6)** ✅ esqueleto completo (14 lições).
- 🟡 **Revisão pedagógica** do 2.º ciclo (marcado 🟡 no `README2.md`).

**História e Geografia (5–6)** ✅ completo (15 lições).
- 🟡 **Linha do tempo** visual entre períodos (ver widget proposto na Parte 3).

**Ed. Visual / Tecnológica / Musical (5–6)** ✅ esqueleto completo (12 cada).
- 🟡 Revisão pedagógica + mais imagens/diagramas (estes domínios são muito
  visuais e beneficiam dos SVG da Parte 3).

**Cidadania, Artes, Ed. Física** ✅ cobertos em todos os anos onde existem.

**Áreas transversais** ✅ fortes. Possíveis acrescentos: mais **países** na área
"Países" (atualmente Portugal + Canadá); mais letras com palavras no Dicionário
(política em [memory] de pt-PT genuíno, nunca encher).

## 2.3 Veredicto

A premissa do esboço colado ("a app só mostra resumos; faltam ~1500 tópicos")
**já não corresponde à realidade**: o Sprout tem **os 6 anos escritos**, com
teste final, em **12 disciplinas** + 4 áreas transversais. O trabalho que resta
**não são anos nem disciplinas novas** — é **profundidade** (mais exemplos e
prática), **revisão pedagógica do 2.º ciclo**, e **mais elementos visuais**
(próxima parte). Acrescentar conteúdo = **1 ficheiro `.md` + 1 linha** em
`curriculum.ts`.

---

# Parte 3 — SVG estáticos/animados e imagens (iPad · telemóvel · desktop)

**Resposta curta: sim, e a app já o faz.** O Sprout usa **SVG inline** em vez de
imagens rasterizadas, o que é exatamente a escolha certa para funcionar igual em
iPad, telemóvel e desktop. Não é preciso bibliotecas externas nem `<canvas>`.

## 3.1 Como funciona hoje (já em produção)

- **25 widgets SVG** em [packages/ui/src/widgets/](packages/ui/src/widgets/):
  `Angle`, `AreaGrid`, `Chart`, `Clock`, `Compass`, `DayNight`, `Fraction(s)`,
  `Money`, `NumberLine`, `Shape`, `SolarSystem`, `Symmetry`, `Tabuada`,
  `TenFrame`, `WaterCycle`, `Shop`, `SoundCards`, `Figure`…
- **Responsivo por `viewBox`.** Os SVG desenham num `viewBox` fixo e escalam ao
  contentor — resolução-independente, nítido em qualquer ecrã/densidade (Retina
  do iPad incluído). 15 widgets já usam esta técnica.
- **Animação por CSS.** As animações (`SolarSystem`, `DayNight`, gota do
  `WaterCycle`) usam `@keyframes` — **22** definições nas folhas de estilo.
- **Toque + rato + teclado.** 20 widgets têm handlers `onClick/onPointer` —
  funcionam por *tap* no iPad/telemóvel e por clique no desktop.
- **Acessibilidade de movimento.** `SolarSystem` e `DayNight` respeitam
  **`prefers-reduced-motion`** (param/abrandam quando o sistema pede menos
  animação) — obrigatório em iPadOS/iOS.
- **SVG inline no markdown.** O pipeline usa **`rehype-raw`**
  ([apps/web/src/Markdown.tsx:322](apps/web/src/Markdown.tsx#L322)), por isso um
  autor de lição pode colar **SVG à mão** num `.md` sem novo componente.
- **Imagens reais quando precisas.** O bloco `figure` mostra foto/emoji com
  legenda lida em voz alta; há pipeline `static/img/`.

## 3.2 Regras a respeitar (do `CLAUDE.md`)

- **Som só no toque.** `speak()` só pode disparar de um clique/tap explícito —
  **nunca** em *hover*, *drag* ou automaticamente ao montar/navegar. Isto é
  importante no iPad, onde não há *hover* real.
- **Sem emoji no *chrome*.** Botões/badges dos widgets usam `@sprout/icons`
  (`<Icon name=… />`), não emoji. Emoji só **dentro** do conteúdo da lição.
- **Sem motor pesado.** Nada de KaTeX/bibliotecas de gráficos — `math` e `chart`
  já desenham notação e barras/circular/linhas em SVG simples.

## 3.3 Compatibilidade por dispositivo

| Capacidade | iPad (Safari) | Telemóvel (iOS/Android) | Desktop |
| --- | :-: | :-: | :-: |
| SVG inline + `viewBox` (nítido em Retina) | ✅ | ✅ | ✅ |
| Animação CSS `@keyframes` | ✅ | ✅ | ✅ |
| `prefers-reduced-motion` | ✅ | ✅ | ✅ |
| Interação por *tap* | ✅ | ✅ | ✅ (clique) |
| *Drag* (ex.: abrir o ângulo) | ✅ Pointer Events | ✅ | ✅ |
| Áudio só no *tap* (regra de fala) | ✅ | ✅ | ✅ |

**Conclusão:** a abordagem atual (**SVG inline + CSS, sem dependências**) é a
mais portável possível e já cobre os três alvos. Não é preciso mudar de
tecnologia — só **criar mais widgets** para os domínios visuais ainda servidos
só por texto.

## 3.4 Novos SVG que dariam mais retorno (propostas)

Priorizados por preencherem domínios já no currículo mas hoje sem visual.
Seguem o molde dos existentes: um `viewBox`, *tap-to-hear*, `@keyframes`
opcional com `prefers-reduced-motion`, ícones (não emoji) no chrome.

1. ✅ **`bodysystem`** (Estudo do Meio 4 · Ciências 6) — **feito.** Silhueta do
   corpo com os 6 sistemas tappáveis (respiratório/circulatório/digestivo/
   excretor/nervoso/locomotor), cada um lido em voz alta; o coração dá um
   batimento suave (respeita reduced-motion). Ligado a `edm-4-corpo-sistemas` e
   às lições de Ciências 6 (digestivo, respiratório, circulatório).
2. ✅ **`timeline`** (HGP 5–6 · "Saber de cor: datas") — **feito.** Linha do
   tempo horizontal com marcos tappáveis, lidos em voz alta; data-driven (eventos
   vêm da lição). Ligado a `estudo/datas-portugal` (datas-chave 1143→1986) e a
   `hgp-6-descobrimentos` (as grandes viagens) — em ambos substituiu um `steps`
   vertical que era um substituto da linha do tempo.
3. ✅ **`mapapt`** (Estudo do Meio · "Saber de cor: distritos" · O Mundo) —
   **feito.** Mapa estilizado de Portugal com os 18 distritos tappáveis
   (numerados N→S) + Açores/Madeira como Regiões Autónomas; cada um diz o nome e
   a capital. Ligado a `estudo/distritos`. Silhueta afinada e verificada
   visualmente (forma reconhecível, Algarve a sul, ilhas no oceano).
4. **`percentbar` / `proporcao`** (Matemática 6) — barra 0–100% e dois copos de
   proporção que se enchem; complementa o `fraction` existente. *Interativo.*
5. **`circuit`** (Ed. Tecnológica 6 · Estudo do Meio 3) — pilha, fio, lâmpada;
   *tap* fecha o circuito e a lâmpada "acende" (animação de brilho que respeita
   reduced-motion). *Animado.*
6. **`lifecycle`** (Ciências 5–6) — ciclo de vida (semente→planta, ou
   rã/borboleta) em setas circulares animadas. *Animado.*
7. **`colorwheel`** (Ed. Visual 5–6 · Artes) — círculo cromático interativo:
   primárias/secundárias/complementares, *tap* para ouvir. *Interativo.*

> Cada um é **um ficheiro de widget** + registo do bloco no `Markdown.tsx`,
> seguindo `Compass`/`WaterCycle` como referência. Reutilizam tokens de cor e a
> regra de fala — zero tecnologia nova.

---

## Próximos passos sugeridos (ordem)

1. **Revisão pedagógica do 2.º ciclo** (5–6) — está marcado 🟡; é o maior risco
   de qualidade, não a quantidade.
2. **Aprofundar prática** nas 4 disciplinas-base do 1.º ciclo (Matemática,
   Português, Estudo do Meio, Inglês) ao nível das áreas novas.
3. **Widget `bodysystem`, `timeline`, `mapapt`** — desbloqueiam os domínios mais
   "de cor" e mais visuais (corpo, História, geografia).
4. Pequenos domínios em falta: **cálculo mental** (Mat.), **experiências**
   (Est. Meio), separar **sistemas do corpo** em 3.º ano.

*Atualizar este ficheiro quando a cobertura mudar. Contagens vivas: `pnpm
validate`.*
