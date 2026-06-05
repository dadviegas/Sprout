# Matéria em falta ou pouco visível — Sprout

Este documento é a lista prática do que ainda falta criar ou reforçar,
comparando a app com matéria que aparece em manuais, fichas e estudo real das
crianças.

Importante: uma disciplina pode existir na app e, mesmo assim, faltar matéria
concreta, mais prática ou mais visível dentro dela.

Estado atual: a app já tem **422 lições válidas**, todas com questionário final.
Já não há placeholders de matéria no currículo. O trabalho agora é sobretudo
aprofundar, tornar visual e aproximar as páginas de situações reais de estudo.

---

## Prioridade alta

### História e Geografia de Portugal

**Já existe lição própria para as dinastias de Portugal.** Está em:

- `apps/web/src/content/hgp/ano6/dinastias.md`
- versão leve no 4.º ano: `apps/web/src/content/estudo-do-meio/ano4/reis-e-dinastias.md`

O que ainda falta é reforço visual e recorrência:

- mapas simples ligados a períodos históricos;
- mais linhas do tempo em lições de reis, regimes e monumentos;
- ligações visíveis entre dinastias, Descobrimentos, União Ibérica,
  Restauração, Liberalismo, República e democracia;
- mais perguntas de aplicação, não só memorização de datas.

Lições a melhorar primeiro:

- `hgp/ano6/descobrimentos.md`
- `hgp/ano6/imperio.md`
- `hgp/ano6/restauracao.md`
- `hgp/ano6/pombal.md`
- `hgp/ano6/liberalismo.md`
- `hgp/ano6/republica.md`
- `hgp/ano6/estado-novo.md`
- `hgp/ano6/reis-monumentos.md`

### Cidadania

Cidadania existe do 1.º ao 6.º ano, mas ainda pode ficar mais parecida com o
que aparece em fichas escolares e em trabalho de sala.

Já existe base para:

- regras de sala e respeito;
- bullying e pedir ajuda;
- participar na turma;
- democracia, Constituição e instituições;
- igualdade, interculturalidade, saúde e ambiente;
- privacidade e responsabilidade digital.

O que falta reforçar:

- responsabilidade diária: tarefas, materiais, pontualidade e compromissos;
- direitos da criança aplicados a situações concretas;
- autarquias, freguesia, município e participação local com exemplos práticos;
- consentimento, dados pessoais e privacidade com casos do dia a dia;
- assembleia de turma com papéis, votação, ata simples e decisão coletiva.

Formato recomendado:

- `steps` para “o que fazer se...”;
- `compare` para escolha responsável vs. escolha arriscada;
- quizzes com pequenos casos práticos.

---

## Prioridade média

### Matemática

Já há páginas próprias para cálculo mental, estimativa, problemas de vários
passos e problemas com dados a mais ou em falta.

O que ainda falta reforçar:

- problemas curtos dentro de mais lições, não concentrados só nas páginas de
  problemas;
- explicação escrita do raciocínio;
- perguntas que obriguem a escolher a estratégia antes da conta;
- pequenos desafios com dados reais: horários, dinheiro, medidas, gráficos.

### Português

Já há páginas para planear, escrever, rever, resumir, descrever e usar
conectores.

O que ainda falta reforçar:

- mais exemplos “antes/depois” de frases melhoradas;
- mais escrita guiada por género textual;
- treino de parágrafos;
- revisão ortográfica aplicada a textos pequenos;
- perguntas que peçam escolher a melhor versão de uma frase.

### Estudo do Meio

Já foi reforçado com relevo e clima de Portugal, segurança rodoviária,
freguesia/município, mapas da localidade e experiências.

O que ainda falta ou pode ficar mais claro:

- sistemas do corpo separados por função;
- mais experiências simples com hipótese, observação e conclusão;
- mapas práticos da localidade com orientação e símbolos;
- ligação entre ambiente local, recursos e responsabilidade.

### Inglês

Já há vocabulário, estruturas principais, diálogos, listening e escrita guiada.

O que ainda falta reforçar:

- mais diálogos curtos por tema;
- mais perguntas/respostas em contexto;
- pequenas respostas escritas por unidade;
- exercícios simulados de “ouve e escolhe”, quando o suporte permitir.

### TIC / Competências digitais

TIC já tem progressão própria: ecrãs, rato/teclado, internet segura, ficheiros,
texto digital, pesquisa, apresentações, email, direitos de autor, media,
privacidade, programação, algoritmos e folha de cálculo.

O que ainda falta reforçar:

- pensamento computacional ao longo de mais anos;
- projetos digitais longos com etapas, pastas, versões e revisão;
- casos práticos de pesquisa: fonte fiável vs. duvidosa;
- folha de cálculo com fórmulas, referências de células e gráficos em contextos
  variados.

---

## Prioridade visual

Estas matérias existem, mas podem ganhar mais mapas, diagramas e exemplos
visuais para não ficarem condensadas:

- HGP: mapas, linhas do tempo, reis, dinastias, regimes, monumentos.
- Ciências Naturais: seres vivos, rochas, água, ar, sistemas do corpo.
- Educação Visual: cor, luz/sombra, perspetiva, padrão, património.
- Educação Tecnológica: circuitos, mecanismos, energia, materiais, projeto.
- Matemática: problemas visuais, dados, geometria e medidas.

Usar preferencialmente:

- `timeline` para História;
- `compare` para conceitos próximos;
- `steps` para processos;
- `figure` com legenda pedagógica;
- `chart` para dados;
- `bodysystem`, `mapapt`, `math`, `numberline` e outros widgets quando fizerem
  sentido.

---

## Prioridades transversais

1. **Reforçar aplicação prática** — mais casos e problemas dentro das lições.
2. **Aumentar qualidade dos quizzes finais** — apontar para 8-10 perguntas nas
   lições centrais, com explicações úteis.
3. **Tornar HGP mais visual** — mapas, linhas do tempo, períodos e ligações.
4. **Dar mais treino escrito em Português** — planear, escrever, rever,
   resumir e melhorar.
5. **Dar mais uso real ao Inglês** — diálogos, perguntas, respostas e escrita
   curta.
6. **Espalhar TIC e pensamento computacional** — algoritmos, organização,
   pesquisa, segurança e projetos.
7. **Rever pedagogicamente** — validação por docente antes de considerar
   qualquer tema fechado.

---

## Checklist futura para verificar

Esta é a lista curta a guardar para uma próxima ronda de trabalho. Cada ponto
deve ser tratado com alterações pequenas, validado no fim e, quando fizer
sentido, acompanhado por imagens, mapas ou diagramas úteis para estudar.

- [ ] **HGP:** reforçar visualmente reis, mapas, dinastias, períodos e
  monumentos. A lição `hgp/ano6/dinastias.md` já existe; o foco agora é
  recorrência, linhas do tempo, mapas, ligações entre períodos e monumentos.
- [ ] **Matemática:** espalhar mais problemas pequenos por várias lições,
  sobretudo raciocínio escrito, escolha de estratégia e problemas de vários
  passos.
- [ ] **Português:** acrescentar mais treino prático de escrita guiada,
  descrição, conectores, revisão de texto, revisão ortográfica e resumos.
- [ ] **Inglês:** acrescentar mais listening, diálogos simulados, perguntas e
  respostas em contexto, e pequenas respostas escritas por unidade.
- [ ] **Ciências / Educação Visual / Educação Tecnológica:** acrescentar mais
  diagramas, mapas visuais, experiências, circuitos, mecanismos, cor,
  luz/sombra e materiais.
- [ ] **Cidadania / TIC:** acrescentar mais casos práticos sobre
  responsabilidade diária, autarquias e instituições locais, dados pessoais,
  consentimento, privacidade e pensamento computacional ao longo dos anos.
- [ ] **Transversal:** rever quizzes finais das matérias mais importantes para
  terem mais perguntas de aplicação, idealmente 8-10 perguntas, com explicações
  claras.
- [ ] **Pedagógico:** pedir revisão por docente do 1.º/2.º ciclo antes de
  considerar os conteúdos fechados.
- [ ] **Imagens e verificação visual:** quando uma página ganhar imagens,
  diagramas, mapas ou `figure`, verificar se ajudam mesmo a estudar, se têm
  legenda clara e se ficam bem em telemóvel, tablet e desktop.

---

## Plano de trabalho seguro

Como há várias pessoas/agentes a trabalhar nas matérias, seguir este fluxo:

1. Ver `git status --short` antes de mexer.
2. Não editar ficheiros de matéria já modificados por outra pessoa.
3. Preferir uma lição de cada vez.
4. Depois de cada alteração, correr `pnpm --filter @sprout/web validate`.
5. Atualizar este ficheiro e `docs/COVERAGE.md` quando uma lacuna deixar de
   existir.

---

## Checklist de melhoria de uma página

Antes de considerar uma página “boa”, verificar:

- O primeiro ecrã explica claramente o que se vai aprender.
- Não há blocos de texto demasiado longos.
- Há pelo menos um elemento visual quando a matéria beneficia disso.
- Há um exemplo concreto.
- Há um truque ou síntese para memorizar.
- Há treino antes do questionário final.
- O questionário final tem perguntas suficientes.
- As respostas cabem bem em telemóvel.
- A página funciona bem em telemóvel, iPad e desktop.
- O conteúdo passa em `pnpm --filter @sprout/web validate`.

---

## Veredicto honesto

A app já cobre a estrutura do 1.º ao 6.º ano. O que falta não é “meter a matéria
toda do zero”; é transformar uma boa cobertura em estudo mais forte:

1. Mais prática dentro das lições.
2. Mais visualizações úteis.
3. Mais perguntas de aplicação.
4. Mais escrita, raciocínio e casos reais.
5. Revisão pedagógica final.
