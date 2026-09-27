import rawTextsContent from "./texts-questions.json";
import type { NeuroTextQuestion, NeuroUnit, SummaryTable } from "./neuro-units";

type TextsModule = {
  id: string;
  titulo: string;
  resumo: string;
};

type TextsQuestion = {
  id: string;
  modulo: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
};

type TextsContent = {
  disciplina: string;
  slug: string;
  descricao: string;
  fontes: string[];
  modulos: TextsModule[];
  questoes: TextsQuestion[];
};

export type TextsUnit = NeuroUnit;

const textsContent = rawTextsContent as TextsContent;
const fallbackImageUrl = "/window.svg";

const moduleObjectives: Record<string, string[]> = {
  linguagem: [
    "Relacionar enunciado, interlocutor e contexto na interpretação.",
    "Distinguir langue e parole na síntese apresentada sobre Saussure.",
    "Reconhecer condições de produção e formação discursiva.",
  ],
  discurso: [
    "Identificar contribuições de Marx e Freud para a análise do discurso.",
    "Diferenciar observação descritiva de inferência interpretativa.",
    "Examinar dito e não dito sem transformar hipótese em conclusão.",
  ],
  redacao: [
    "Organizar tese, argumentos e conclusão em texto dissertativo-argumentativo.",
    "Avaliar pertinência de repertório, evidência e tópico frasal.",
    "Evitar generalizações e sustentar progressão argumentativa.",
  ],
  revisao: [
    "Revisar porquês, mas/mais, onde/aonde e concordância.",
    "Evitar redundância, ambiguidade e retomadas pronominais inadequadas.",
    "Escrever registros clínicos com precisão e cautela interpretativa.",
  ],
};

export const textsUnits: TextsUnit[] = textsContent.modulos.map((module) => {
  const questions = textsContent.questoes.filter((question) => question.modulo === module.id);
  const textQuestions = questions.map(toTextQuestion);
  const sourceSummary = textsContent.fontes.slice(0, 3).join("; ");

  return {
    slug: `producao-interpretacao-textos-${module.id}`,
    title: module.titulo,
    status: "complete",
    duration: "15 minutos",
    objectives: moduleObjectives[module.id] ?? ["Revisar os principais conceitos do módulo."],
    videoTitle: module.titulo,
    videoDescription: module.resumo,
    videoText: [module.resumo],
    videoUrl: "",
    posterUrl: fallbackImageUrl,
    testTextQuestions: textQuestions,
    reviewItems: textQuestions.slice(0, 5).map((question) => question.prompt),
    testDescription: `Responda ${questions.length} questões sobre ${module.titulo.toLocaleLowerCase("pt-BR")}.`,
    worksheetText: module.resumo,
    atlasTitle: "Roteiro de revisão textual",
    atlasDescription: "Revisão organizada dos conceitos centrais do módulo.",
    atlasImageUrl: fallbackImageUrl,
    atlasItems: [
      { title: module.titulo, imageUrl: fallbackImageUrl, description: module.resumo },
    ],
    summaryTables: buildSummaryTables(module, questions, sourceSummary),
    studyGuide: {
      title: module.titulo,
      description: module.resumo,
      sections: [
        {
          title: "Como revisar",
          content: module.resumo,
          keyPoints: textQuestions.slice(0, 4).map((question) => question.prompt),
          studyPrompt: "Depois da revisão, responda o teste sem consultar o gabarito e leia a explicação de cada item.",
        },
      ],
    },
  };
});

export const allTextsQuestions = textsUnits.flatMap((unit) => unit.testTextQuestions ?? []);

export function getTextsUnit(slug?: string) {
  return textsUnits.find((unit) => unit.slug === slug);
}

function toTextQuestion(question: TextsQuestion): NeuroTextQuestion {
  return {
    id: question.id,
    prompt: question.enunciado,
    options: question.alternativas,
    correctAnswer: question.alternativas[question.correta],
    explanation: question.explicacao,
    sourceExcerpt: "Banco curado de Produção e Interpretação de Textos.",
  };
}

function buildSummaryTables(module: TextsModule, questions: TextsQuestion[], sourceSummary: string): SummaryTable[] {
  return [
    {
      title: "Síntese do módulo",
      rows: [
        { label: module.titulo, value: module.resumo },
        { label: "Questões", value: `${questions.length} itens de múltipla escolha com explicação.` },
      ],
    },
    {
      title: "Fontes de estudo",
      rows: [
        { label: "Material revisado", value: sourceSummary },
      ],
    },
  ];
}
