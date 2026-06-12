# Cobertura curricular — Sprout vs Aprendizagens Essenciais

> **Mesmo currículo, escola pública e privada.** Em Portugal, públicas e privadas
> seguem as mesmas **Aprendizagens Essenciais (AE)** da DGE e as mesmas provas
> nacionais. As privadas podem *acrescentar* (mais inglês, outra língua, projetos,
> método próprio), mas a **base é igual**. Este documento mapeia o que o Sprout
> cobre face às AE, para guiar o aprofundamento do conteúdo.

Estado: `✅ tratado` (lição completa: exemplos + truque + treino + teste) ·
`🟡 existe mas podia aprofundar-se` · `❌ em falta`.

> **A app já cobre os dois ciclos** — **1.º ciclo (1.º–4.º ano)** e
> **2.º ciclo (5.º–6.º ano)**, cada um com o seu conjunto próprio de disciplinas
> (Decreto-Lei 55/2018). O `pnpm validate` conta **577 lições** (2026-06-11,
> incluindo a Enciclopédia), todas com questionário final.
> A *estrutura* segue as AE; cada tema é **uma lição** (não a totalidade dos
> descritores). Continua a ser uma **seleção curada**, não cobertura exaustiva —
> e falta **revisão pedagógica por docente** antes de fechar qualquer tema.

---

## Visão geral por ciclo

### 1.º ciclo (1.º–4.º ano) — 221 lições

| Disciplina | Lições | Estado |
| --- | --- | --- |
| Matemática | 62 | ✅ domínios todos representados (Fase 20B 2026-06-11: factos, problemas, padrões, orientação e pictogramas no 1.º + relógio digital/compras no 3.º) |
| Português | 60 | ✅ os 5 domínios cobertos |
| Estudo do Meio | 32 | ✅ todos os blocos cobertos (+ roda dos alimentos/dentição, ossos/músculos/pele, Sol/Terra/Lua, sismos/vulcões) |
| Inglês *(obrigatório só 3.º–4.º; 1.º–2.º é AEC/bónus)* | 24 | ✅ vocabulário + primeiras estruturas |
| Cidadania e Desenvolvimento | 14 | ✅ seleção dos domínios |
| TIC / Competências digitais | 5 | ✅ ecrãs, rato/teclado, internet segura, ficheiros, texto digital |
| Educação Artística | 12 | ✅ Visuais, Música, Teatro, Dança |
| Educação Física | 12 | ✅ "conhecer sobre" (não se faz EF no ecrã) |

### 2.º ciclo (5.º–6.º ano) — 166 lições

| Disciplina | Lições | Estado |
| --- | --- | --- |
| Matemática | 23 | ✅ números, percentagens, geometria (incl. áreas do paralelogramo/triângulo, `mat-5-areas`), dados, probabilidade, problemas (inteiros/equações ficam marcados como "extra 7.º ano") |
| Português | 20 | ✅ leitura, escrita, gramática, literária, resumo, descrição |
| Inglês | 19 | ✅ present/past/future, comparatives, temas, diálogos, escrita guiada |
| Ciências Naturais | 15 | ✅ água/ar/solo/seres vivos (5.º) + corpo humano (6.º) |
| História e Geografia de Portugal | 19 | ✅ 5.º até ao séc. XVII (quadro natural da Península → Descobrimentos/império/Restauração); 6.º séc. XVIII → Portugal democrático/UE + "Portugal hoje" |
| Educação Visual | 13 | ✅ ponto/linha/cor/forma → luz, volume, perspetiva, design |
| Educação Tecnológica | 13 | ✅ materiais, estruturas, energia, mecanismos, projeto técnico |
| Educação Musical | 12 | ✅ som, ritmo, melodia → forma, harmonia, géneros |
| Educação Física | 12 | ✅ aptidão, ginástica, coletivos, atletismo |
| Cidadania e Desenvolvimento | 10 | ✅ direitos humanos, democracia, intercultural, financeira, sustentabilidade |
| TIC / Competências digitais | 10 | ✅ pesquisa, apresentações, organizar projeto, email, direitos de autor, media, privacidade, programação, algoritmos, folha de cálculo |

### Áreas transversais (não são disciplina, não têm ano) — 79 lições

| Área | Lições | O que é |
| --- | --- | --- |
| O Mundo & Curiosidades 🌍 | 21 | Açores → Portugal → Europa/Atlântico → mundo (anéis de proximidade) |
| Saber de cor 🧠 | 20 | referência interativa: tabuadas, alfabeto, sílabas, medidas, distritos, datas… |
| O Dicionário 📖 | 26 | significados de palavras por letra (A–Z), com leitura em voz alta |
| Países 🌍 | 12 | conhecer um país a fundo (Portugal e Canadá, em paralelo) |

---

## Matemática — domínios das AE

Domínios: **Números e Operações**, **Geometria e Medida**, **Organização e
Tratamento de Dados**, e capacidades transversais (**resolução de problemas**,
**raciocínio**, **comunicação matemática**).

| Domínio | Estado | Notas / por aprofundar |
| --- | --- | --- |
| Números e Operações | ✅ | escada completa ao ritmo da AE 2021 — **factos básicos até 10** no 1.º (`mat-1-factos`, 2026-06-11: amigos do 10, dobros, quase-dobros), 1.º até 100 (`mat-1-numeros-100`), 2.º até 1000 (`mat-2-numeros-1000`), 3.º até 10 000 (`mat-3-numeros-10000`), 4.º até ao milhão; frações desde o 2.º (`mat-2-fracoes-iniciais`: metade/quarta parte), decimais; tabuadas todas (2/3/4/5/10 no 2.º + **6/7/8/9** no 3.º, `mat-3-tabuadas-altas`); algoritmos +/− no 3.º (`mat-3-contas-armadas`) e ×/÷ no 4.º, com uma lição-mestra por operação no 4.º (`mat-4-somar-pe`, `mat-4-subtrair-pe`, `mat-4-multiplicar-pe`, `mat-4-dividir-pe`, 2026-06-11: do caso simples ao «vai 1» encadeado, empréstimo com zero, zero da 2.ª linha e resto vs. divisor); **percentagens de referência + orçamentos** no 4.º (`mat-4-percentagens`, literacia financeira); comparar/ordenar, dobro/metade, par/ímpar, múltiplos, romanos, estimar/arredondar; 2.º ciclo: m.d.c./m.m.c., racionais, potências, **percentagens com cálculo desde o 5.º** (`mat-5-percentagens`, 2026-06-11) e inteiros/equações como extra "7.º ano" |
| Geometria e Medida | ✅ | formas, sólidos (+ **planificações** do cubo/caixa em `mat-2-solidos`, 2026-06-11), simetria (+ **rotação** em `mat-4-quadrilateros`, 2026-06-11), padrões (desde o 1.º: `mat-1-padroes`), **orientação espacial + passos/palmos no 1.º** (`mat-1-orientacao`, 2026-06-11), **perímetro desde o 2.º** (`mat-2-perimetro`), **ângulos sem graus no 3.º** (`mat-3-angulos`) e com graus no 4.º, **km/mm/g no 3.º** (`mat-3-medidas-2`), **quadriláteros** (`mat-4-quadrilateros`) e **círculo/circunferência no 4.º** (`mat-4-circulo`), área/perímetro, volume/capacidade, horas + **relógio digital/durações no 3.º** (`mat-3-relogio-digital`, 2026-06-11), calendário, dinheiro; 2.º ciclo: **áreas do paralelogramo e do triângulo** (`mat-5-areas`, 2026-06-11, com construção de triângulos), círculo com π, volumes (+ dm³↔litro) |
| Organização e Tratamento de Dados | ✅ | primeiro contacto no **1.º** (`mat-1-pictogramas`, 2026-06-11: contar filas, pictograma, "qual tem mais?") → 2.º (`mat-2-dados`, 2026-06-11: risquinhos, pictograma, **moda**) → 3.º (`mat-3-dados`: tabela de frequência, barras/circular) → 4.º (`mat-4-dados`: máximo/mínimo/moda/amplitude, linha) → 5.º/6.º (média, gráficos) → **probabilidade no 6.º** (`mat-6-probabilidade`, 2026-06-11: escala 0–1, equiprovável, frequência relativa) |
| Resolução de problemas | ✅ | primeiro contacto no **1.º** (`mat-1-problemas`, 2026-06-11: juntar/retirar/comparar/completar com histórias) → 2.º (`mat-2-problemas`: plano de 3 passos, +/−, palavras-pista, reta numérica) → método completo no 4.º (`mat-4-problemas`: 4 passos, as 4 operações, problemas de 2 passos, verificação inversa) → nível de prova no 4.º (`mat-4-problemas-2`: 2–3 passos com conversões l/cl/ml, kg/g, km/m, troco, fração de quantidade, resto interpretado e armadilhas explicadas). Continua a ganhar-se permeando as outras lições |

## Português — domínios das AE

Domínios: **Oralidade**, **Leitura**, **Escrita**, **Educação Literária**,
**Gramática**.

| Domínio | Estado | Notas / por aprofundar |
| --- | --- | --- |
| Oralidade | ✅ | ouvir/falar, recontar, falar para um público, debater; 5.º: apresentar |
| Leitura | ✅ | iniciação completa no 1.º — escada das consoantes "As letras" (`pt-1-letras-*`, 6 lições áudio-primeiro) + casos de leitura ce/ci/ge/gi (`pt-1-casos-cegi`) + sons nasais (`pt-1-nasais`); ler frases, fluência e expressão (`pt-2-ler-expressao`: pausas da pontuação, ler por bocadinhos, dar voz), compreensão e inferências (`pt-3-leitura-compreensao`) |
| Escrita | ✅ | escrever texto, tipos de texto, carta/convite, notícia; 5.º/6.º: narrativo, descritivo, entrevista |
| Educação Literária | ✅ | contos, lengalengas/poemas, fábulas, autores do PNL; 5.º/6.º: poesia, teatro, clássicos |
| Gramática | ✅ | sílaba/sílaba tónica, ditongos/dígrafos, classes, tempos verbais, pronomes, pontuação, sujeito/predicado, frase simples/complexa, sons do «s», hífen…; 5.º/6.º: funções sintáticas, conjugação |

## Estudo do Meio (1.º ciclo) — blocos das AE

Blocos: **Sociedade**, **Natureza**, **Tecnologia** (e a sua interação). No 2.º
ciclo, Estudo do Meio dá lugar a **Ciências Naturais** + **HGP** (ver abaixo).

| Bloco | Estado | Notas / por aprofundar |
| --- | --- | --- |
| À descoberta de si mesmo | ✅ | corpo, cinco sentidos, ossos/músculos/pele (`edm-3-ossos-musculos`), higiene/saúde, roda dos alimentos + dentição (`edm-2-roda-alimentos`), segurança (identidade/emoções vivem em Cidadania) |
| Os outros e as instituições | ✅ | família, profissões, Portugal, história, símbolos nacionais (em O Mundo), e a localidade — instituições/serviços + costumes, tradições e festas (`edm-2-localidade`) |
| Ambiente natural | ✅ | seres vivos, animais, plantas, água, estações, alimentação, Sol/Terra/Lua e movimentos (`edm-3-sol-terra-lua`), sistema solar, sismos e vulcões (`edm-4-sismos-vulcoes`) |
| Materiais e objetos | ✅ | estados da matéria, eletricidade e ímanes, e o método científico + experiências (`edm-3-experiencias`: flutuação, dissolver, o ar ocupa espaço) |
| À descoberta das inter-relações | ✅ | espaço — mapas, pontos cardeais e leitura de um mapa de Portugal (`edm-4-mapas`); tempo — gerações, História de Portugal |

## Inglês — domínios das AE (obrigatório 3.º–4.º; 2.º ciclo)

Domínios: **Compreensão oral**, **Interação/Produção oral**, **Leitura**,
**Escrita**, **Domínio intercultural**.

| Estado | Notas / por aprofundar |
| --- | --- |
| ✅ | vocabulário base alargado (greetings, colours, numbers, classroom, feelings, animals, body, family, food, sports, nature, house, toys, clothes, routines, directions, days/months, jobs, weather, time, travel) **e estruturas** (present simple, present continuous, past simple, future *going to*, comparatives/superlatives) no 5.º/6.º. A aprofundar: compreensão de diálogos mais longos e escrita guiada de textos |

## Ciências Naturais (5.º–6.º)

| Estado | Conteúdo |
| --- | --- |
| ✅ | 5.º: água, ar, rochas/solo, diversidade e funções dos animais, plantas, ecossistemas. 6.º: micro-organismos, sistemas digestivo/respiratório/circulatório/excretor, transmissão da vida, saúde |

## História e Geografia de Portugal (5.º–6.º)

| Estado | Conteúdo |
| --- | --- |
| ✅ | **AE 2018: 5.º até ao séc. XVII; 6.º a partir do séc. XVIII.** 5.º: quadro natural da Península, primeiros povos, romanos, muçulmanos/cristãos, formação e consolidação do reino, crise de 1383-85, sociedade medieval, Descobrimentos, império, Restauração. 6.º: Pombal, invasões francesas e Liberalismo, 1.ª República, Estado Novo e 25 de Abril, Portugal democrático e a Europa, Portugal hoje (população/atividades), dinastias e monumentos (síntese) |

## Educação Artística / Visual / Tecnológica / Musical

| Estado | Conteúdo |
| --- | --- |
| ✅ | 1.º ciclo (Educação Artística): Artes Visuais, Música, Teatro, Dança. 2.º ciclo divide-se em **Ed. Visual** (ponto/linha, cor, forma, textura, luz/sombra, volume, padrão, design, património), **Ed. Tecnológica** (materiais, medição, estruturas, mecanismos, energia, eletricidade, fabrico) e **Ed. Musical** (som, ritmo, melodia, dinâmica, forma, harmonia, géneros, música portuguesa) |

## Educação Física

| Estado | Notas |
| --- | --- |
| ✅ | É o "conhecer sobre" (não se faz EF no ecrã): mexer o corpo, aquecer/descansar, jogos e jogos tradicionais, desportivismo, ginástica, desportos, Jogos Olímpicos, vida ativa, segurança; 2.º ciclo: aptidão, ginástica de solo/aparelhos, coletivos, atletismo, raquetas, dança, desportos de natureza |

## Cidadania e Desenvolvimento

| Estado | Conteúdo |
| --- | --- |
| ✅ | 1.º ciclo: direitos/deveres, reciclagem, diferenças, emoções, poupar, ajudar, bullying, igualdade, consumo, sustentabilidade, democracia, saúde/sono. 2.º ciclo: direitos humanos, igualdade de género, interculturalidade, saúde, ambiente, educação financeira, proteção civil, voluntariado, desenvolvimento sustentável |

## TIC / Competências digitais

| Estado | Conteúdo |
| --- | --- |
| ✅ | 1.º ciclo: ecrãs com cuidado, rato/teclado, internet segura, computador/ficheiros, escrever/formatar texto. 2.º ciclo: pesquisa digital, apresentações, organizar projetos digitais, email/mensagens, direitos de autor, media e mundo digital, privacidade/palavras-passe, programação simples, criar e testar algoritmos, folha de cálculo |

---

## O que ainda falta (resumo honesto)

Já não há **disciplinas inteiras** em falta: a estrutura cobre os dois ciclos,
e vários domínios que estavam rasos foram preenchidos — OTD desde o 3.º
(`mat-3-dados`), resolução de problemas desde o 2.º (`mat-2-problemas`), Leitura
com fluência (`pt-2-ler-expressao`), experiências/método científico
(`edm-3-experiencias`) e a localidade/instituições/festas (`edm-2-localidade`).

Mas ainda há **matéria concreta** que aparece em manuais/fichas e está ausente,
dispersa ou pouco visível. Exemplos importantes:

- **HGP:** as **dinastias de Portugal** já têm lição própria no 6.º ano e uma
  ponte simples no 4.º; falta continuar a reforçar visualmente reis, mapas e
  períodos.
- **Cidadania:** já há bullying, regras da sala, participação e democracia;
  falta aprofundar autarquias/instituições locais, responsabilidade diária e
  direitos aplicados a situações concretas.
- **TIC:** progressão prática do 1.º ao 6.º ano, já com folha de cálculo,
  organização de projetos digitais e criação/teste de algoritmos; falta sobretudo
  semear mais pensamento computacional ao longo dos anos.
- **Matemática:** cálculo mental e problemas de vários passos já têm páginas
  próprias; falta espalhar problemas pequenos por mais lições.
- **Português:** planear, rever e resumir já têm páginas próprias; falta mais
  treino de descrição, conectores e escrita guiada por géneros.

Ver também **[MATERIA_EM_FALTA.md](./MATERIA_EM_FALTA.md)** para a lista de
trabalho mais direta.

O que falta é sobretudo **matéria fina**, **validação** e **continuar a
aprofundar**:

1. **Tornar a resolução de problemas verdadeiramente transversal** — além das
   lições dedicadas (2.º e 4.º), semear pequenos problemas nas outras lições de
   Matemática, em vez de a concentrar num tema.
2. **Revisão pedagógica** de todo o conteúdo por docente do 1.º/2.º ciclo antes
   de considerar qualquer tema "fechado".
3. Criar as próximas lições em falta mais visíveis: **Cidadania prática**,
   mais reforço visual de HGP e aprofundamento de TIC em projetos longos.
4. *(Opcional)* alargar as áreas transversais — mais países em **Países**, mais
   curiosidades em **O Mundo**, e a futura **vista de mapa** que lê as etiquetas
   `zona`/`pais`.

> Ver **[ROADMAP.md](../ROADMAP.md)** para o estado de produto (perfis, medalhas,
> PWA/offline, novos tipos de exercício, testes).
