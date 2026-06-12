# Auditoria do conteúdo vs. currículo oficial (Aprendizagens Essenciais, DGE)

> Data: 2026-06-10. Referência oficial: **AE Matemática 2021** (Despacho
> 8209/2021) e **AE 2018** para Português, Estudo do Meio, Inglês, CN e HGP
> (Português com revisão de 01/2023). Fontes no fim. Complementa
> `MATERIA_EM_FALTA.md` e `COVERAGE.md`; o plano de execução vive em
> `PLANO-ESTUDO.md`.

> **🏁 Auditoria fechada (2026-06-12).** Todas as linhas ❌ e os ⚠️ principais
> foram resolvidos entre 2026-06-10 e 2026-06-12 (Fases 1–4 e 20B/20C — 585
> lições no validador). Restam apenas aprofundamentos opcionais, marcados ⚠️
> nas tabelas: estratégias de ×/÷ no 3.º, ciclo estatístico completo no 4.º,
> dividir por 10/100/1000 (verificar em `calculo-mental`), primos < 100
> (verificar em `mdc-mmc`), sólidos no 1.º (aceitável no 2.º) e planificações
> de prismas variados (🟢). Nada disto bloqueia um ano letivo completo na app.
> Reauditar quando as novas AE (EduQA) forem homologadas.

## Resumo executivo

1. **Matemática anda ~1 ano atrasada nos números.** A app ensina "até 20" no
   1.º ano (AE: até 100), "até 100" no 2.º (AE: até 1000), "até 1000" no 3.º
   (AE: até 10 000). Só o 4.º (milhão) bate certo.
   *(✅ Corrigido: 1.º em 2026-06-11 (`mat-1-numeros-100`); 2.º/3.º em
   2026-06-11 — `mat-2-numeros-1000` e `mat-3-numeros-10000`.)*
2. **Português do 1.º ano salta a aprendizagem das consoantes.** A app vai de
   vogais → sílabas → "primeiras palavras", sem o percurso letra-a-letra
   (p, t, l, d, m, v, c…) nem os casos de leitura (ch/nh/lh/rr/ss/qu/gu/
   ce-ci/ge-gi/nasais) que ocupam o ano letivo inteiro. **É a lacuna mais
   crítica para uma criança que ainda não lê.**
   *(✅ Corrigido em 2026-06-11 — série "As letras" (6 lições) +
   `pt-1-casos-cegi` + nasais (`pt-1-nasais`): a escada de leitura do 1.º ano
   está completa.)*
3. **Os problemas do 4.º ano são fáceis de mais.** As provas/manuais esperam
   problemas escritos de 2–3 passos com conversões de medidas, troco, fração
   de uma quantidade e resto a interpretar (ex.: o problema "1,5 l → 7 copos
   de 200 ml → e com 4× mais água?" = 30 copos). A app só tem problemas de
   1–2 passos sem conversões nem armadilhas.
   *(Corrigido em 2026-06-11 — `mat-4-problemas-2`, com esse problema-tipo e a
   armadilha do 7×4 explicada.)*
4. **HGP está com a ordem errada entre 5.º e 6.º**: Descobrimentos, império e
   Restauração são matéria do **5.º ano** (AE: 5.º vai até ao séc. XVII); o
   6.º começa no séc. XVIII. Falta o quadro natural da Península (5.º) e a
   geografia "Portugal hoje" (6.º).
   *(✅ Corrigido em 2026-06-11 — `hgp-6-descobrimentos`/`-imperio`/
   `-restauracao` movidos para o 5.º (ids mantidos); novas lições
   `hgp-5-peninsula-natural` (arranque do 5.º) e `hgp-6-portugal-hoje`;
   invasões francesas 1807-1811 reforçadas em `hgp-6-liberalismo`.)*
5. **Matemática 6.º tem matéria que saiu do programa** (inteiros relativos e
   equações passaram para o 3.º ciclo na AE 2021) e **falta matéria nova**
   (probabilidades no 5.º/6.º, percentagens no 5.º).
   *(✅ Em grande parte resolvido em 2026-06-11 — `inteiros`/`equacoes` marcados
   como "Matéria extra — espreitadela ao 7.º ano" (callout + tag no cartão);
   criadas `mat-5-percentagens` (cálculo) e `mat-6-probabilidade` (escala 0–1,
   frequência relativa); dm³↔litro acrescentado a `volumes`. ✅ As áreas do
   paralelogramo/triângulo e a construção de triângulos fecharam em 2026-06-11
   com `mat-5-areas`.)*
6. Estudo do Meio tem lacunas pontuais por ano (ver tabelas).

⚠️ Está em curso uma revisão geral das AE (pilotos 2025/26, entrada gradual
prevista a partir de 2027/28) — reauditar quando for homologada.

## Matemática

### 1.º ano — app: 14 lições

| AE 2021 | Estado na app |
|---|---|
| Contagens até 50+; números até **100**; dezenas e unidades | ✅ `mat-1-numeros-100` (2026-06-11): contar às dezenas, dezenas/unidades, comparar |
| Factos básicos até 10 (pares de 10, dobros, quase-dobros) | ✅ `mat-1-factos` (2026-06-11): amigos do 10, dobros, quase-dobros — treino pesado com `hint`/`level` |
| Adição/subtração: juntar, retirar, comparar, **completar** | ✅ `mat-1-problemas` (2026-06-11): os 4 sentidos com histórias de emoji |
| Problemas de um passo | ✅ `mat-1-problemas` (2026-06-11): 2 exemplos passo a passo + palavras-pista |
| Álgebra: sequências de repetição | ✅ `mat-1-padroes` (2026-06-11): cores/formas/sons batidos, "o que vem a seguir?" (crescimento fica no 2.º) |
| Dados: pictogramas, gráficos de pontos | ✅ `mat-1-pictogramas` (2026-06-11): contar filas, ler pictograma, "qual tem mais?", 1.ª barra (`chart`) |
| GM: orientação espacial (posições, itinerários) | ✅ `mat-1-orientacao` (2026-06-11): posições, esquerda/direita (truque do coração), itinerários em grelha |
| GM: sólidos + figuras planas, compor/decompor | ⚠️ `formas` cobre figuras planas; sólidos só no 2.º (aceitável) |
| GM: comprimento com unidades não convencionais | ✅ secção "passos e palmos" em `mat-1-orientacao` (2026-06-11) |
| GM: tempo (dia, semana, sequências) | ✅ `tempo` |
| Ordinais, comparar/ordenar | ✅ (`ordinais`, `comparar`) |

### 2.º ano — app: 14 lições

| AE 2021 | Estado na app |
|---|---|
| Números até **1000**, centenas | ✅ `mat-2-numeros-1000` (2026-06-11): centena, compor/decompor, contar de 100 em 100, comparar |
| Tabuadas do 2, 4, 5, 10 e 3 | ✅ (`tabuada` + `tabuada-3-4-10`) |
| **Frações**: metade/quarta parte, frações unitárias | ✅ `mat-2-fracoes-iniciais` (2026-06-11): metade/quarta parte de formas e quantidades |
| Cálculo mental (sem algoritmos) | ⚠️ implícito; sem lição |
| Sequências de repetição **e de crescimento** | ✅ `padroes` (verificar crescimento) |
| Dados: tabelas, pictogramas, **moda** | ✅ `mat-2-dados` (2026-06-11): risquinhos, pictograma, moda, gráfico de barras |
| Metro/centímetro; **perímetro**; noção de área | ✅ `mat-2-perimetro` (2026-06-11): "dar a volta" + cordel, m/cm; a noção de área fica apresentada no widget (`areagrid`) |
| Tempo: calendário, durações | ⚠️ `horas` ✅; calendário só no 3.º (ok) |
| Dinheiro: euro↔cêntimo, contar quantias | ✅ `dinheiro` |
| Pares/ímpares, sólidos, simetria | ✅ |

### 3.º ano — app: 15 lições

| AE 2021 | Estado na app |
|---|---|
| Números até **10 000** | ✅ `mat-3-numeros-10000` (2026-06-11): milhares, decompor, comparar, arredondar à centena |
| Tabuadas do **6, 8, 9 e 7** | ✅ `mat-3-tabuadas-altas` (2026-06-11): truques 5+1, dobro do 4, 10−1 + dedos |
| **Algoritmos da adição e subtração** | ✅ `mat-3-contas-armadas` (2026-06-11): «vai um» e «pede emprestado» com 3 algarismos |
| Multiplicação/divisão por estratégias (5×28; 135:5) | ⚠️ parcial (`multiplicacao`, `divisao`) |
| Frações: equivalências simples (1/2=2/4) | ⚠️ `fracoes` cobre 1/2,1/3,1/4; equivalências fracas |
| **Ângulos** (reto/agudo/obtuso, sem graus) | ✅ `mat-3-angulos` (2026-06-11): reto/agudo/obtuso/raso sem graus, crocodilo + canto da folha |
| km e mm; massa kg/g | ✅ `mat-3-medidas-2` (2026-06-11): km (Lisboa–Porto ≈ 300 km), mm, g + escada de conversões |
| Relógios analógicos **e digitais**; h/min/s | ✅ `mat-3-relogio-digital` (2026-06-11): digital vs ponteiros, 24 h (truque ±12), 1 h = 60 min, durações |
| Dinheiro: listas de compras, estimar custos | ✅ secção "lista de compras" em `mat-3-relogio-digital` (2026-06-11): estimar, planear, pagar (`money`) e troco — liga à loja do Saber de cor |
| Reflexão axial | ✅ (simetria no 2.º) |
| Dados: gráfico de barras, moda | ✅ `dados` |
| Nota: decimais **já não são** matéria do 3.º (AE 2021) | ✅ app está certa |
| `romanos` | extra fora da AE — manter como curiosidade |

### 4.º ano — app: 19 lições

| AE 2021 | Estado na app |
|---|---|
| Números até 1 000 000; arredondamentos | ✅ (`numeros-milhao`, `estimar`) |
| Dividir por 10/100/1000 | ⚠️ verificar em `calculo-mental` |
| Decimais (décimas/centésimas/milésimas) | ✅ `decimais` + `fracoes-decimais` |
| **Percentagens de referência** (50%, 25%, 10%…) | ✅ `mat-4-percentagens` (2026-06-11): 100/75/50/25/10% com números amigos |
| Algoritmos: ×3×2 algarismos; ÷ com divisor de 2 algarismos; **resto interpretado** | ✅ `contas-armadas` (mecânica) + `mat-4-problemas-2` (2026-06-11): resto em contexto |
| **Problemas de 2–3 passos** com conversões, troco, fração de quantidade, dados de tabela | ✅ `mat-4-problemas-2` (2026-06-11): copos/água, troco, resto, fração de quantidade, armadilhas explicadas |
| Capacidade: l, **cl**, ml (33 cl, 200 ml como referências) | ✅ cl na lição `volume` (2026-06-11: 1 l = 100 cl, lata 33 cl, pacote 20 cl) + treino em `mat-4-problemas-2` |
| **Planificações de prismas/pirâmides** | 🟢 planificação do cubo/caixa (secção em `mat-2-solidos`, 2026-06-11, com 2 perguntas); prismas/pirâmides variados ficam para aprofundar |
| Quadriláteros (classificação); paralelas/perpendiculares | ✅ `mat-4-quadrilateros` (2026-06-11): quadrado/retângulo/losango/paralelogramo/trapézio + retas |
| **Círculo vs circunferência, raio/diâmetro** | ✅ `mat-4-circulo` (2026-06-11): raio/diâmetro (d = 2r), compasso; π fica para o 6.º |
| Simetria de **rotação** | ✅ secção em `mat-4-quadrilateros` (2026-06-11): quadrado a 90°, retângulo/losango a 180°, trapézio sem rotação; 2 perguntas |
| **Dinheiro: orçamentos (receitas/despesas/saldo)**, publicidade | ✅ `mat-4-percentagens` (2026-06-11): orçamento da mesada + callout "publicidade enganosa?" |
| Área cm²/m², fórmula do retângulo | ✅ `area` |
| Dados: estudos estatísticos completos | ⚠️ `dados` lê gráficos; falta o ciclo completo |

### 5.º/6.º ano (resumo)

- 5.º: ✅ **percentagens (cálculo)** — `mat-5-percentagens` (2026-06-11):
  50/25/10/20% de quantidades, fração↔decimal↔percentagem, descontos. A 1.ª
  abordagem às **probabilidades** (AE 5.º) é servida por `mat-6-probabilidade`
  (a lição diz na abertura que a matéria começa no 5.º; registada no 6.º, onde
  se aprofunda — mudar de ano se um dia o 5.º ganhar bloco de dados próprio).
  ✅ áreas do **paralelogramo e do triângulo** + construção de triângulos
  (régua e compasso, desigualdade triangular) — `mat-5-areas` (2026-06-11):
  recortar-e-deslizar → b × h; triângulo = metade → b × h ÷ 2; armadilha da
  altura ⊥. Em falta ainda: números primos < 100 (⚠️ verificar em `mdc-mmc`).
- 6.º: `inteiros` e `equacoes` **saíram do programa** (AE 2021 → 3.º ciclo).
  ✅ Marcados em 2026-06-11 como "Matéria extra — espreitadela ao 7.º ano"
  (callout de abertura + tag no cartão), sem apagar nada. ✅ **probabilidade**
  (escala 0–1, equiprovável, frequência relativa) — `mat-6-probabilidade`
  (2026-06-11); ✅ **gráfico circular** já existia em `mat-6-graficos` (linha
  estava desatualizada); ✅ dm³↔litro acrescentado a `volumes` (2026-06-11).
- ✅ proporcionalidade, potências, círculo, volumes alinhados.

## Português

### 1.º ano — a lacuna mais crítica

A AE estrutura o ano como iniciação à leitura (a criança **não sabe ler à
entrada**). A app tem o arranque (vogais, sílabas, ditongos, rimas) mas salta
o miolo do método:

| AE / manuais | Estado na app |
|---|---|
| Consciência fonológica: manipular fonemas, pares mínimos | ⚠️ `silabas`+`rimas` cobrem parte; manipulação de fonemas em falta |
| **Consoantes uma a uma** (ordem didática ≈ p, t, l, d, m, v, c, n, r, b, g, j, f, z, s, x, h) com sílabas diretas (pa-pe-pi-po-pu) | ✅ série "As letras" (2026-06-11): 6 lições `pt-1-letras-*` (3 consoantes cada, soundcards + drills, áudio-primeiro) |
| **Casos de leitura/dígrafos**: ch, nh, lh, rr, ss, qu, gu, ce/ci, ge/gi, nasais (am/an, em/en…) | ✅ ce/ci/ge/gi `pt-1-casos-cegi` (2026-06-11) + nasais `pt-1-nasais` (2026-06-11, ão/ã/ãe + am/an, em/en, om/on, um/un); ch/nh/lh + rr/ss/qu/gu já em `pt-2-digrafos` |
| Alfabeto: nome e ordem das letras, maiúsc./minúsc. | ⚠️ `maiusculas` ✅; ordem alfabética só no 2.º (ok) |
| Ler palavras → frases → textos curtos | ✅ arranque existe (`primeiras-palavras`, `ler-frases`) e a escada de consoantes + casos de leitura ficou completa em 2026-06-11 |
| Escrita: grafemas, palavras, frases; pontuação inicial | ⚠️ pontuação só no 2.º (ok); escrita guiada em falta |
| Ouvir contos, recontar, lengalengas | ✅ (`contos`, `rimas`, `ouvir-falar`) |

**Recomendação:** série de lições "As letras" (uma ou duas consoantes por
lição, com `soundcards`, sílabas grandes tocáveis, arrastar-letras, "ouve e
escolhe"), seguida de série "Casos de leitura". Tudo áudio-primeiro (modo
pré-leitor do PLANO-ESTUDO §4). ✅ *Feito em 2026-06-11 (6 lições de letras +
ce/ci/ge/gi + nasais `pt-1-nasais` — a escada de leitura do 1.º ano está
completa); ver Fases 1 e 2.*

### 2.º–4.º ano

- 2.º: alinhado (pontuação, tipos de frase, dígrafos, nomes/adjetivos/artigos,
  ordem alfabética ✅). Faltam: **casos de leitura restantes** (rr/ss/qu/gu/
  ce-ci/ge-gi) que transitam do 1.º, e escrita de textos curtos (reconto,
  convite, recado).
- 3.º: alinhado e completo (12 lições). Verificar determinantes e
  quantificador; acentuação/translineação está no 4.º (`acentos`) — aceitável.
- 4.º: forte (17 lições). Faltam: **conjugações verbais sistemáticas**
  (-ar/-er/-ir no presente/perf./imperf./futuro — a Biblioteca tem os verbos;
  falta a lição que ensina), **discurso indireto** (direto ✅ no 3.º) e
  **polissemia**.
- 5.º/6.º: bem alinhados com as AE (oralidade, narrativo, classes, funções
  sintáticas, teatro, poesia, literária). Faltam **pronomes clíticos** e
  **frase ativa/passiva** no 6.º.

## Estudo do Meio

| Ano | Em falta vs AE |
|---|---|
| 1.º | A escola e as rotinas; seres vivos vs não vivos do meio próximo; estados do tempo/estações (app só no 2.º); materiais e objetos do dia a dia |
| 2.º | ✅ Dentição + **roda dos alimentos** (`edm-2-roda-alimentos`, 2026-06-11); passado próximo (calendário, datas festivas); meios de transporte e comunicação; experiências (flutuação — widget `buoyancy` existe!, dissolução) |
| 3.º | ✅ **Ossos, músculos e pele** (`edm-3-ossos-musculos`, 2026-06-11); ✅ astros Sol/Terra/Lua e movimentos (`edm-3-sol-terra-lua`, 2026-06-11, `daynight`); **pontos cardeais** (app só no 4.º — AE pede no 3.º); rochas e solo; atividades económicas locais; som e luz |
| 4.º | ✅ **Sismos e vulcões** (`edm-4-sismos-vulcoes`, 2026-06-11, `volcano`+`layers`+regra Baixar/Proteger/Aguardar+1755+Açores); rios e costa de Portugal (⚠️ `relevo-clima` cobre parte); Açores/Madeira como conteúdo do ano (existe em "O Mundo" — ligar); Portugal na **UE** e lusofonia (⚠️ agora em HGP `hgp-6-portugal-hoje`); sistema **reprodutor** em `corpo-sistemas`; 25 de Abril com destaque próprio |

A história de Portugal no 4.º (✅ `historia`, `reis-dinastias`) está alinhada.

## Ciências Naturais (5.º/6.º)

- 5.º em falta: **microscópio e célula**; **classificação dos seres vivos**
  (noções). Resto ✅ (água, ar, rochas/solo, animais ×2, plantas, ecossistemas).
- 6.º: ✅ muito completo (8 lições). Confirmar **fotossíntese** (AE 6.º) — está
  em `cn-5-plantas`; reforçar no 6.º. Primeiros socorros em falta (menor).

## HGP (5.º/6.º) — problema de ordem

AE 2018: o 5.º ano vai **até ao séc. XVII** (incl. expansão marítima, união
ibérica 1580, Restauração 1640); o 6.º começa no **séc. XVIII**.

*(✅ Resolvido em 2026-06-11. Os ids `hgp-6-*` das lições movidas mantiveram-se —
o progresso e a Teia continuam a referi-los; só mudou o ano de registo em
`curriculum.ts`.)*

- ✅ Movidos para o **5.º ano** (ids mantidos): `hgp-6-descobrimentos`,
  `hgp-6-imperio`, `hgp-6-restauracao` — colocados em ordem cronológica, a seguir
  à crise de 1383-85 / sociedade medieval.
- ✅ 5.º: criada **A Península Ibérica — o quadro natural**
  (`hgp-5-peninsula-natural`, arranque do ano: localização com `compass`, relevo,
  3 climas, rios Tejo/Douro/Guadiana/Mondego com `chart`, vegetação).
- ✅ 6.º: criada **Portugal hoje: população e atividades** (`hgp-6-portugal-hoje`:
  litoral/interior com `mapapt`, envelhecimento e setores de atividade com
  `chart`, campo vs cidade, Portugal na UE/lusofonia).
- ✅ 6.º: **invasões francesas (1807-1811)** reforçadas em `hgp-6-liberalismo`
  (timeline das três invasões: Junot 1807, Soult 1809, Massena 1810 nas Linhas de
  Torres Vedras, saída 1811) — lição renomeada para "As invasões francesas e o
  Liberalismo".
- `hgp-6-dinastias` e `reis-monumentos` ficam no 6.º como síntese transversal.

## Inglês

- App tem Inglês no 1.º/2.º ano — a AE só o introduz no 3.º (1.º/2.º é AEC
  opcional). **Não é erro** — marcar como "extra".
- 3.º/4.º vs AE: faltam **festividades** (3.º), **países e nacionalidades** e
  **números até 100** (4.º). Resto alinhado.
- 5.º/6.º: razoável; confirmar **past simple** e comparativos no 6.º
  (`en-4-comparatives` está no 4.º — adiantado vs AE, rever nível).

## Calibração de dificuldade (as queixas dos miúdos)

**1.º ano (precisa de MAIS visual/áudio):** as lições já são 65–75% visuais e
os quizzes não exigem leitura — bom. O problema não é o formato, é (a) a
**lacuna das consoantes** que impede o progresso real na leitura e (b) o teto
baixo a Matemática (até 20). Acrescentar: manipulação direta (arrastar,
tocar), áudio-primeiro em TODA a instrução, e a escada de letras.

**4.º ano (precisa de MAIS dificuldade):** confirmado. Hoje: problemas de 1–2
passos, sem conversões de unidades, sem armadilhas, sem interpretação de
resto. As provas esperam (exemplos-tipo a gerar):

- "Com 1,5 l encho 7 copos de 200 ml. Quantos copos encho com 4× mais água?"
  (conversão + multiplicação + divisão; armadilha do 7×4=28; resposta 30)
- "3 garrafas de 33 cl chegam para 1 l?" (conversão + comparação)
- "Comprei 12,40 € + 8,75 €. Qual o troco de 50 €?" (decimais + troco)
- "240 alunos; 1/4 vai de autocarro. Quantos vão?" (fração de quantidade)
- "260 ovos em caixas de 12. Quantas caixas preciso?" (resto interpretado)

**Recomendação:** cada lição com 4 níveis (fácil/médio/difícil/desafio) e um
gerador de problemas escritos por tema (medidas, dinheiro, frações, dados)
com `steps` de resolução e a "armadilha" explicada — liga ao banco de erros
do PLANO-ESTUDO §4.2.

## Plano de correção priorizado

**Fase 1 — antes das férias (os dois filhos):**
1. ✅ **(2026-06-11)** Português 1.º: série "As letras" feita em 6 lições de 3
   consoantes (`pt-1-letras-ptl/dmv/cnr/bgj/fzs/xh`, soundcards + drills,
   áudio-primeiro) + casos de leitura ce/ci/ge/gi (`pt-1-casos-cegi`) +
   **nasais** (`pt-1-nasais`, Fase 2) — a escada de leitura está completa;
   rr/ss/qu/gu/ch/nh/lh já estão no 2.º.
2. ⚠️ **(2026-06-11)** Matemática 4.º: lição "Resolver problemas 2: vários
   passos" (`mat-4-problemas-2`) com conversões/troco/resto e armadilhas
   explicadas. Falta: gerador de problemas + níveis de dificuldade.
3. ✅ **(2026-06-11)** Matemática 1.º: números até 100 (`mat-1-numeros-100`,
   dezenas/unidades, comparar). O treino sistemático dos factos básicos fechou
   na Fase 20B (`mat-1-factos`).
4. ✅ **(2026-06-11)** Matemática 4.º: medidas completadas (cl na lição
   `volume`) e percentagens de referência + orçamentos/publicidade
   (`mat-4-percentagens`).

**Fase 2 — alinhamento de programa:**
5. ✅ **(2026-06-11)** Matemática: alcance dos números subido
   (`mat-2-numeros-1000`, `mat-3-numeros-10000`), tabuadas 6/7/8/9
   (`mat-3-tabuadas-altas`), algoritmos +/− no 3.º (`mat-3-contas-armadas`) e
   frações no 2.º (`mat-2-fracoes-iniciais`). Ângulos no 3.º fechados na
   Fase 4 (`mat-3-angulos`).
6. ✅ **(2026-06-11)** HGP: Descobrimentos/império/Restauração movidos para o 5.º
   (ids mantidos); criadas "A Península Ibérica — quadro natural" (5.º) e
   "Portugal hoje" (6.º); invasões francesas reforçadas em `hgp-6-liberalismo`.
7. ✅ **(2026-06-11, Fase 4)** Matemática 5.º/6.º: percentagens no 5.º
   (`mat-5-percentagens`), probabilidade (`mat-6-probabilidade`), gráfico
   circular confirmado em `mat-6-graficos`; inteiros/equações marcados como
   "extra 7.º ano"; dm³↔litro nos volumes. Na mesma fase, 1.º ciclo:
   `mat-2-dados` (moda/pictogramas), `mat-2-perimetro`, `mat-3-angulos`,
   `mat-3-medidas-2` (km/mm/g), `mat-4-quadrilateros` e `mat-4-circulo`.

**Fase 3 — lacunas restantes:**
8. ✅ **(2026-06-11)** Estudo do Meio: criadas `edm-2-roda-alimentos` (+ dentição),
   `edm-3-ossos-musculos` (`bodysystem` locomotor + pele), `edm-3-sol-terra-lua`
   (`daynight` + fases da Lua + estações) e `edm-4-sismos-vulcoes` (`volcano` +
   `layers` + Baixar/Proteger/Aguardar + 1755 + Açores). Wired na Teia (corpo,
   saúde, espaço-tempo, planeta). Faltam ainda pontos cardeais no 3.º e rochas/solo.
9. Português 4.º: conjugações, discurso indireto, polissemia. CN 5.º: célula.
10. Inglês: festividades, países, números até 100.

Cada item de Fase 1 deve render lições com a estrutura padrão (CLAUDE.md) e
entradas na Teia quando cruzar temas. Atualizar `COVERAGE.md` e
`MATERIA_EM_FALTA.md` à medida que se fecha cada linha.

## Revisão de exemplos (2026-06-11)

Varrimento de QA a todos os blocos `math` (117 expressões) e aos blocos `steps`
das lições recentes (mat-1/2/3, `mat-4-problemas-2`, `mat-4-percentagens`,
`mat-5-percentagens`, `mat-6-probabilidade`, HGP 5.º/6.º, Estudo do Meio),
verificando a aritmética e a coerência entre o exemplo **mostrado** e os passos
**explicados**. Correções:

- `matematica/ano4/calculo-mental.md` («Estratégia 1: decompor números»): o
  destaque `math` mostrava **47 + 30 = 77** (um passo intermédio a fazer-se
  passar pelo exemplo) enquanto os passos resolviam 47 + 32. Corrigido para
  **47 + 32 = 47 + 30 + 2 = 79** (com `say` refeito).

Tudo o resto bateu certo (datas HGP, conversões de medidas, somas/empréstimos
das contas armadas, percentagens, probabilidades). Na mesma data nasceram as
quatro lições-mestras das operações no 4.º ano (`mat-4-somar-pe`,
`mat-4-subtrair-pe`, `mat-4-multiplicar-pe`, `mat-4-dividir-pe`) e dois treinos
de leitura no Saber de cor (`estudo-silabas-treino`, `estudo-ler-palavras`),
com a categoria «Aprender a ler» do Treinar a ordenar a escada completa
(alfabeto → sílabas → palavras → textos).

## Fase 20B (2026-06-11) — Matemática fechada vs. as tabelas acima

Sete lições novas + duas secções para limpar os ⚠️/❌ restantes de Matemática:
`mat-1-factos`, `mat-1-problemas`, `mat-1-padroes`, `mat-1-orientacao` (com
passos/palmos), `mat-1-pictogramas`, `mat-3-relogio-digital` (com lista de
compras) e `mat-5-areas`; secções novas "Simetria de rotação" em
`mat-4-quadrilateros` e "Planificações" em `mat-2-solidos`. As lições novas
estreiam os campos `hint`/`level` do Quiz (fase 20A) — pistas e dificuldade
1–3 em todas as perguntas. Em Matemática ficam só os ⚠️ "parciais" das tabelas
(estratégias de ×/÷ no 3.º, equivalências de frações, dividir por 10/100/1000
no 4.º, ciclo estatístico completo, cálculo mental sem lição no 2.º, primos
< 100 no 5.º) e o aprofundar das planificações de prismas/pirâmides.

## Fontes

- AE Matemática 2021 (1.º–6.º), DGE: dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/1_ciclo/aemat_4a_2021.pdf (e restantes anos)
- AE Português, Estudo do Meio, Inglês, CN, HGP (2018), DGE: dge.mec.pt/aprendizagens-essenciais-ensino-basico
- Revisão das AE em curso (EduQA, consulta pública 03–04/2026): eduqa.pt/en/revisao-das-aprendizagens-essenciais/
