export type Material = {
  title: string;
  slug: string;
  order: number;
  description: string;
  coverImage: string;
  sourceFile?: string;
  sourceType?: "pdf" | "pptx";
  status: "registered" | "pending_upload";
  questionCount: number;
  accuracy: number;
  progress: number;
  supportsImages: boolean;
};

export type QuizMode = {
  id: string;
  subjectSlug: string;
  title: string;
  description: string;
  mode: "training" | "exam" | "mistakes" | "favorites";
  type: "text" | "image" | "mixed";
  questionCount: number;
  isAvailable: boolean;
};

export type Subject = {
  name: string;
  slug: string;
  description: string;
  accent: string;
  questionCount: number;
  progress: number;
  accuracy: number;
  materials: Material[];
};

export const subjects: Subject[] = [
  {
    name: "Produção e Interpretação de Textos",
    slug: "producao-interpretacao-textos",
    description: "Banco de questões para leitura, escrita acadêmica e interpretação textual.",
    accent: "from-[#aa0000] to-rose-400",
    questionCount: 0,
    progress: 0,
    accuracy: 0,
    materials: [],
  },
  {
    name: "Neuroanatomofisiologia",
    slug: "neuroanatomofisiologia",
    description: "Estudo guiado por materiais de aula, com prioridade para questões visuais.",
    accent: "from-[#aa0000] to-red-700",
    questionCount: 0,
    progress: 0,
    accuracy: 0,
    materials: [
      {
        title: "Introdução à Anatomia",
        description: "Fundamentos de terminologia, planos de corte, variações anatômicas e anomalias.",
        coverImage: "/neuroanatomofisiologia/introducao-a-anatomia-slide-4-image-1.png",
        sourceFile: "2. Introdução à anatomia.pptx",
      },
      {
        title: "Estruturas Ósseas do Crânio",
        description: "Ossos do crânio e da face, suturas, fossas cranianas e pontos antropométricos.",
        coverImage: "/neuroanatomofisiologia/estruturas-osseas-do-cranio-slide-5-image-1.jpeg",
        sourceFile: "3. Estruturas ósseas do cranio.pptx",
      },
      {
        title: "Embriologia do SNC",
        description: "Material visual de embriologia do sistema nervoso central, aguardando extração textual segura para perguntas.",
        coverImage: "/neuroanatomofisiologia/embriologia-do-snc-slide-5-image-1.png",
        sourceFile: "4. Embriologia do SNC IPOG.pptx",
      },
      {
        title: "Medula Espinal",
        description: "Estruturas da medula, cisterna lombar, nervos espinais, cone medular e cauda equina.",
        coverImage: "/neuroanatomofisiologia/medula-espinal-slide-11-image-1.jpeg",
        sourceFile: "5. Medula espinal.pptx",
      },
      {
        title: "Meninges e Ventrículos",
        description: "Meninges, espaço subaracnóideo, líquido cefalorraquidiano e ventrículos cerebrais.",
        coverImage: "/neuroanatomofisiologia/meninges-e-ventriculos-slide-2-image-1.gif",
        sourceFile: "6. Meninges e Ventrículos.pptx",
      },
      {
        title: "Encéfalo",
        description: "Divisões do encéfalo, hemisférios, sulcos, giros, lobos cerebrais e áreas corticais.",
        coverImage: "/neuroanatomofisiologia/encefalo-slide-4-image-1.jpeg",
        sourceFile: "7. Encéfalo.pptx",
      },
      {
        title: "Cerebelo e Tronco Encefálico",
        description: "Funções do cerebelo, ataxia cerebelar, tronco encefálico e nervos cranianos.",
        coverImage: "/neuroanatomofisiologia/cerebelo-e-tronco-encefalico-slide-4-image-1.jpg",
        sourceFile: "8. Cerebelo e Tronco encefálico.pptx",
      },
      {
        title: "Neurônios e Sinapse",
        description: "Estrutura neuronal, células da glia, mielina, sinapses e transmissão do impulso nervoso.",
        coverImage: "/neuroanatomofisiologia/neuronios-e-sinapse-slide-4-image-1.png",
        sourceFile: "9. Neurônios e Sinapse.pptx",
      },
    ].map((material, index) => ({
      ...material,
      slug: slugify(material.title),
      order: index + 1,
      sourceType: "pptx" as const,
      status: "registered" as const,
      questionCount: 0,
      accuracy: 0,
      progress: 0,
      supportsImages: true,
    })),
  },
  {
    name: "Introdução à Psicologia: História e Fundamentos",
    slug: "introducao-psicologia-historia-fundamentos",
    description: "Organização por escolas, autores, conceitos e fundamentos da Psicologia.",
    accent: "from-[#aa0000] to-rose-500",
    questionCount: 0,
    progress: 0,
    accuracy: 0,
    materials: [],
  },
  {
    name: "Desenvolvimento dos Anos Iniciais e Escolares",
    slug: "desenvolvimento-anos-iniciais-escolares",
    description: "Revisões por etapa do desenvolvimento, aprendizagem e contexto escolar.",
    accent: "from-[#aa0000] to-red-500",
    questionCount: 0,
    progress: 0,
    accuracy: 0,
    materials: [],
  },
];

export const quizModes: QuizMode[] = [
  {
    id: "neuroanatomofisiologia-treino-textual",
    subjectSlug: "neuroanatomofisiologia",
    title: "Treino textual",
    description: "Perguntas A/B/C/D com feedback imediato e explicação após cada resposta.",
    mode: "training",
    type: "text",
    questionCount: 0,
    isAvailable: false,
  },
  {
    id: "neuroanatomofisiologia-treino-com-imagens",
    subjectSlug: "neuroanatomofisiologia",
    title: "Treino com imagens",
    description: "Identificação visual de estruturas com imagem ampliável e fonte após resposta.",
    mode: "training",
    type: "image",
    questionCount: 0,
    isAvailable: false,
  },
  {
    id: "neuroanatomofisiologia-simulado-misto",
    subjectSlug: "neuroanatomofisiologia",
    title: "Simulado misto",
    description: "Questões misturadas por materiais e tópicos, sem resposta até o resultado final.",
    mode: "exam",
    type: "mixed",
    questionCount: 0,
    isAvailable: false,
  },
  {
    id: "neuroanatomofisiologia-revisao-de-erros",
    subjectSlug: "neuroanatomofisiologia",
    title: "Revisão de erros",
    description: "Fila de questões erradas recentemente, repetidas vezes ou ainda não dominadas.",
    mode: "mistakes",
    type: "mixed",
    questionCount: 0,
    isAvailable: false,
  },
  {
    id: "neuroanatomofisiologia-favoritas",
    subjectSlug: "neuroanatomofisiologia",
    title: "Favoritas",
    description: "Revisão rápida de questões marcadas pelo estudante para voltar depois.",
    mode: "favorites",
    type: "mixed",
    questionCount: 0,
    isAvailable: false,
  },
];

export function getSubject(slug: string) {
  return subjects.find((subject) => subject.slug === slug);
}

export function getQuizMode(id: string) {
  return quizModes.find((quizMode) => quizMode.id === id);
}

export function getQuizModesBySubject(subjectSlug: string) {
  return quizModes.filter((quizMode) => quizMode.subjectSlug === subjectSlug);
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
