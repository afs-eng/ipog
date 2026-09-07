# Skill — Site de Questões da Faculdade

## Objetivo
Construir um site de estudos em formato de banco de questões/quiz para disciplinas da faculdade de Psicologia. O sistema deve organizar o conteúdo por disciplina, tópico e subtópico, gerar e armazenar questões de múltipla escolha, suportar questões com imagens retiradas dos materiais de aula e acompanhar o desempenho do estudante.

O produto deve ser pensado primeiro para uso pessoal/ acadêmico, mas com arquitetura preparada para crescer e receber novos usuários, disciplinas, materiais e questões.

---

## Disciplinas iniciais
O sistema começa com 4 disciplinas:

1. Produção e Interpretação de Textos
2. Neuroanatomofisiologia
3. Introdução à Psicologia: História e Fundamentos
4. Desenvolvimento dos Anos Iniciais e Escolares

A interface deve permitir adicionar novas disciplinas no futuro sem alteração estrutural do código.

---

## Regra principal de conteúdo
As perguntas devem ser criadas com base nos materiais de aula fornecidos pelo usuário.

- Não inventar conteúdo que não esteja sustentado pelo material quando a questão for marcada como “baseada na aula”.
- Preservar terminologia, organização e nível de detalhe usados pelo professor.
- Cada questão deve registrar a origem: disciplina, aula/material, tópico, subtópico e, quando possível, página/slide.
- Se um material for insuficiente para criar uma questão segura e objetiva, não criar a questão.
- Para disciplinas ainda sem arquivos enviados, criar apenas a estrutura do sistema; não preencher o banco com conteúdo acadêmico inventado.

### Materiais atuais de Neuroanatomofisiologia
Usar como fontes iniciais os materiais fornecidos pelo usuário, incluindo:

- Introdução à Anatomia
- Estruturas Ósseas do Crânio e Coluna Vertebral
- Embriologia do SNC
- Medula Espinal
- Meninges e Ventrículos
- Encéfalo
- Cerebelo e Tronco Encefálico
- Neurônios e Sinapse

Há dois arquivos de Embriologia aparentemente duplicados; o importador deve detectar duplicidade por nome, hash ou conteúdo semelhante para evitar gerar questões repetidas.

---

## Estrutura pedagógica
Organizar o conteúdo assim:

Disciplina → Aula/Material → Tópico → Subtópico → Questões

Exemplo:

Neuroanatomofisiologia
→ Encéfalo
→ Lobos cerebrais
→ Lobo frontal
→ questões

O estudante deve poder iniciar um quiz em qualquer nível:

- disciplina inteira;
- uma aula/material;
- um tópico;
- um subtópico;
- somente questões erradas;
- somente questões favoritas;
- simulado misto.

---

## Tipos de questão
O MVP deve suportar:

### 1. Questão textual
Pergunta + 4 alternativas (A, B, C, D), apenas uma correta.

### 2. Questão com imagem
Pergunta + imagem + 4 alternativas.

Casos típicos:

- “Qual estrutura está indicada na imagem?”
- “Qual região anatômica corresponde à área destacada?”
- “Observe a imagem e identifique o plano anatômico.”
- “Qual estrutura aparece entre X e Y?”

### 3. Questão clínico-aplicada
Pode existir quando o próprio material sustentar a relação entre estrutura/função e manifestação clínica.

Exemplo válido em Neuroanatomofisiologia: alterações relacionadas ao cerebelo quando o material da aula apresenta ataxia, dismetria, disdiadococinesia, tremor, disartria e nistagmo.

Não inventar casos clínicos excessivamente complexos que extrapolem o material.

---

## Regras para questões com imagem
Questões visuais são parte central do projeto, especialmente em Neuroanatomofisiologia.

### Comportamento da interface
- Mostrar imagem em boa resolução acima da pergunta.
- Permitir clicar/tocar para ampliar.
- Permitir zoom em dispositivos móveis.
- Preservar proporção da imagem.
- Nunca cortar estruturas anatômicas importantes.
- Exibir legenda/fonte apenas após a resposta, se necessário para não entregar a resposta.

### Preparação das imagens
O sistema deve permitir extrair imagens de PDF/PPTX e associá-las ao slide/página de origem.

Para criar uma questão visual:
- usar a própria imagem do material quando a imagem for necessária para responder;
- se a imagem original já contém o nome da estrutura que seria perguntada, evitar usá-la diretamente como questão de identificação, a menos que seja criada uma versão limpa/recortada que não revele a resposta;
- manter uma cópia original e, opcionalmente, uma versão preparada para o quiz;
- registrar `source_asset_id`, `source_slide` e `source_material_id`.

---

## Estrutura de uma questão
Cada questão deve possuir no mínimo:

```ts
type Question = {
  id: string
  subjectId: string
  materialId?: string
  topicId: string
  subtopicId?: string
  type: 'text' | 'image' | 'clinical'
  difficulty: 'easy' | 'medium' | 'hard'
  prompt: string
  imageUrl?: string
  options: {
    id: 'A' | 'B' | 'C' | 'D'
    text: string
  }[]
  correctOption: 'A' | 'B' | 'C' | 'D'
  explanation: string
  sourceSlide?: number
  sourceExcerpt?: string
  status: 'draft' | 'reviewed' | 'published'
  createdAt: string
  updatedAt: string
}
```

### Regras de qualidade
- Exatamente 4 alternativas.
- Apenas 1 alternativa objetivamente correta.
- Distratores plausíveis e do mesmo domínio.
- Não usar alternativas absurdas apenas para completar a questão.
- A explicação deve dizer por que a resposta correta está correta.
- Quando útil, explicar brevemente por que as demais não atendem ao enunciado.
- Evitar pistas de tamanho, gramática ou detalhamento que entreguem a resposta.
- Nunca depender de informação que não esteja visível na própria pergunta ou no material de origem.

---

## Modos de estudo
Criar estes modos:

### Treino
- feedback imediatamente após cada resposta;
- mostrar correta/incorreta;
- mostrar explicação;
- permitir favoritar.

### Simulado
- escolher quantidade de questões;
- misturar tópicos;
- não mostrar resposta durante o simulado;
- mostrar resultado apenas no final.

### Revisão de erros
- selecionar somente questões respondidas incorretamente;
- priorizar questões erradas mais vezes;
- marcar questão como “dominada” após sequência de acertos.

### Favoritas
- lista de questões marcadas pelo usuário.

---

## Resultado do quiz
Ao terminar, mostrar:

- número de acertos;
- número de erros;
- percentual;
- tempo total;
- desempenho por tópico;
- lista de questões erradas;
- botão “Refazer questões erradas”;
- botão “Novo quiz do mesmo tópico”.

Também salvar o histórico para acompanhamento ao longo do tempo.

---

## Dashboard do estudante
A página inicial após login deve mostrar:

- disciplinas em cards;
- progresso por disciplina;
- questões respondidas;
- taxa de acerto;
- tópicos com maior dificuldade;
- atividade recente;
- acesso rápido a “Continuar estudando”;
- acesso a “Revisar erros”.

---

## Página de disciplina
Exemplo para Neuroanatomofisiologia:

- Introdução à Anatomia
- Estruturas Ósseas do Crânio e Coluna Vertebral
- Embriologia do SNC
- Medula Espinal
- Meninges e Ventrículos
- Encéfalo
- Cerebelo e Tronco Encefálico
- Neurônios e Sinapse

Cada card deve mostrar:

- nome do tópico/aula;
- número de questões;
- percentual de acerto;
- progresso;
- botão “Estudar”.

---

## Painel administrativo
Criar área administrativa protegida para gerenciar conteúdo.

### Funções
- criar/editar/excluir disciplina;
- criar/editar material;
- criar/editar tópico e subtópico;
- adicionar questão manualmente;
- editar questão gerada por IA;
- revisar questão antes de publicar;
- fazer upload de PDF/PPTX;
- visualizar páginas/slides extraídos;
- escolher imagens para questões;
- aprovar/rejeitar questões geradas;
- filtrar questões por disciplina, material, tópico, dificuldade e status.

Nenhuma questão gerada por IA deve ir automaticamente para `published` sem passar pelo estado `draft` ou `reviewed`.

---

## Fluxo de importação de materiais
Criar pipeline em etapas:

1. Upload do arquivo.
2. Identificação do tipo: PDF ou PPTX.
3. Extração de texto por página/slide.
4. Extração das imagens relevantes.
5. Criação do registro do material.
6. Detecção de tópicos e subtópicos.
7. Geração de rascunhos de questões.
8. Associação de cada questão à origem.
9. Revisão no painel administrativo.
10. Publicação no banco de questões.

Nunca perder a relação da questão com seu material de origem.

---

## Banco de dados
Preferir PostgreSQL via Supabase.

Tabelas mínimas:

- `users`
- `subjects`
- `materials`
- `topics`
- `subtopics`
- `questions`
- `question_options`
- `media_assets`
- `quiz_sessions`
- `quiz_answers`
- `favorites`
- `question_stats`

### Relações principais

```text
subjects
  └─ materials
       └─ topics
            └─ subtopics
                 └─ questions

questions
  ├─ question_options
  └─ media_assets

users
  └─ quiz_sessions
       └─ quiz_answers
```

---

## Stack preferencial

### Frontend
- Next.js com App Router
- TypeScript
- Tailwind CSS
- shadcn/ui quando útil
- React Hook Form
- Zod

### Backend / Dados
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage para imagens e materiais

### Deploy
- Vercel para aplicação web
- Supabase para banco/auth/storage

Manter a arquitetura simples. Não criar microserviços sem necessidade.

---

## Rotas sugeridas

```text
/
/login
/dashboard
/disciplinas
/disciplinas/[subjectSlug]
/disciplinas/[subjectSlug]/[materialSlug]
/quiz/[quizId]
/resultados/[sessionId]
/revisao
/favoritas

/admin
/admin/disciplinas
/admin/materiais
/admin/materiais/[id]
/admin/questoes
/admin/questoes/nova
/admin/questoes/[id]
```

---

## UI/UX
O site deve ter aparência acadêmica moderna, limpa e agradável.

### Diretrizes
- responsivo para desktop, tablet e celular;
- cards bem espaçados;
- tipografia legível;
- ótimo contraste;
- evitar excesso de informação na tela;
- progresso visual simples;
- imagens anatômicas grandes o suficiente para estudo;
- questionário sem distrações;
- indicar claramente a disciplina e o tópico atual.

### Tela do quiz
Estrutura preferencial:

```text
Neuroanatomofisiologia
Encéfalo • Lobos Cerebrais
Questão 7 de 20

[ imagem, quando houver ]

Pergunta...

( ) A) alternativa
( ) B) alternativa
( ) C) alternativa
( ) D) alternativa

[Responder]
```

Após responder no modo treino:

```text
Resposta correta / incorreta
Explicação
Fonte: material + slide
[Próxima questão]
```

---

## Geração de quiz
O usuário deve poder configurar:

- disciplina;
- aula/material;
- tópico;
- dificuldade;
- quantidade de questões;
- incluir ou não questões com imagem;
- apenas questões novas;
- apenas questões erradas;
- modo treino ou simulado.

A ordem das questões e alternativas pode ser embaralhada, mas a associação com a resposta correta deve permanecer íntegra.

---

## Desempenho e repetição inteligente
Salvar estatísticas por usuário e questão:

- número de tentativas;
- acertos;
- erros;
- última resposta;
- última data respondida;
- taxa de acerto;
- nível de domínio.

Priorizar revisão de:

1. questões erradas recentemente;
2. questões erradas repetidas vezes;
3. tópicos com menor taxa de acerto;
4. questões nunca respondidas.

---

## Segurança e integridade
- autenticação para dados pessoais de progresso;
- painel administrativo protegido por papel/role;
- validar uploads;
- limitar tipos e tamanho de arquivo;
- nunca executar conteúdo incorporado em arquivos enviados;
- sanitizar conteúdo textual exibido;
- usar Row Level Security no Supabase quando aplicável.

---

## MVP — definição de pronto
A primeira versão só será considerada pronta quando permitir:

1. Login.
2. Visualizar as 4 disciplinas.
3. Abrir Neuroanatomofisiologia.
4. Visualizar seus materiais/tópicos.
5. Iniciar um quiz textual.
6. Iniciar um quiz com imagem.
7. Responder A/B/C/D.
8. Receber feedback e explicação no modo treino.
9. Finalizar simulado e ver pontuação.
10. Salvar erros e favoritos.
11. Refazer apenas questões erradas.
12. Administrador cadastrar/editar questões.
13. Administrador fazer upload de materiais e associar imagens.
14. Banco persistir progresso do estudante.

---

## Ordem de implementação
Não tentar fazer tudo de uma vez.

### Fase 1 — Base
- criar projeto Next.js;
- layout;
- Supabase;
- autenticação;
- modelo de dados;
- seed das 4 disciplinas.

### Fase 2 — Banco de questões
- CRUD de disciplina/tópico/questões;
- alternativas;
- explicações;
- imagens;
- painel admin.

### Fase 3 — Quiz
- modo treino;
- modo simulado;
- resultado;
- histórico.

### Fase 4 — Revisão
- erros;
- favoritas;
- estatísticas;
- repetição inteligente.

### Fase 5 — Importação assistida por IA
- upload PDF/PPTX;
- extração de texto e imagens;
- detecção de tópicos;
- geração de questões em rascunho;
- revisão humana.

---

## Seed inicial das disciplinas
Criar estas entradas no banco:

```json
[
  {
    "name": "Produção e Interpretação de Textos",
    "slug": "producao-interpretacao-textos"
  },
  {
    "name": "Neuroanatomofisiologia",
    "slug": "neuroanatomofisiologia"
  },
  {
    "name": "Introdução à Psicologia: História e Fundamentos",
    "slug": "introducao-psicologia-historia-fundamentos"
  },
  {
    "name": "Desenvolvimento dos Anos Iniciais e Escolares",
    "slug": "desenvolvimento-anos-iniciais-escolares"
  }
]
```

---

## Critérios para o agente de código
Ao trabalhar neste projeto:

- Antes de alterar arquitetura, verificar o que já existe.
- Fazer mudanças pequenas e testáveis.
- Evitar reescrever arquivos sem necessidade.
- Não remover funcionalidades existentes para implementar uma nova.
- Usar TypeScript estrito.
- Não usar `any` sem justificativa.
- Validar entrada no servidor com Zod.
- Preferir Server Components quando não houver necessidade de estado/interação no cliente.
- Colocar `use client` apenas onde necessário.
- Separar regras de negócio da camada visual.
- Criar componentes reutilizáveis para cards de disciplina, questão, resposta, progresso e visualizador de imagem.
- Toda alteração de banco deve possuir migration.
- Após implementar, executar lint, typecheck e testes relevantes.
- Corrigir erros antes de declarar a tarefa concluída.

---

## Critério final de produto
A experiência deve dar a sensação de um “banco de questões feito a partir das próprias aulas da faculdade”, e não de um gerador genérico de perguntas.

Para Neuroanatomofisiologia, imagens de estruturas anatômicas devem ser tratadas como conteúdo de primeira classe do quiz, com visualização ampliável, vínculo ao slide de origem e possibilidade de perguntas de identificação visual.
