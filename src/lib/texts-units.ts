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

const slideBaseUrl = "/conteudos/producao-interpretacao-textos/slide-aula";

const moduleSlides: Record<string, NeuroUnit["atlasItems"]> = {
  linguagem: [
    {
      title: "A lente interna e a percepção",
      imageUrl: `${slideBaseUrl}/01-lente-interna-percepcao.jpeg`,
      description: "A interpretação não começa apenas nos olhos; experiências, afetos e filtros internos participam da leitura do outro.",
    },
    {
      title: "A linguagem como estrutura da consciência",
      imageUrl: `${slideBaseUrl}/03-linguagem-estrutura-consciencia.jpeg`,
      description: "Formações discursivas, condições de produção e não neutralidade organizam os sentidos possíveis.",
    },
  ],
  discurso: [
    {
      title: "A escuta clínica e o peso do não dito",
      imageUrl: `${slideBaseUrl}/02-escuta-clinica-nao-dito.jpeg`,
      description: "O dito aparece na narrativa estruturada; o não dito surge em silêncios, hesitações e lacunas.",
    },
    {
      title: "Marx: ideologia e peso social",
      imageUrl: `${slideBaseUrl}/04-marx-ideologia-peso-social.jpeg`,
      description: "A sociedade estabelece normas sobre quem pode falar, como falar e quais sofrimentos são naturalizados.",
    },
    {
      title: "A literatura como espelho do trauma e da ideologia",
      imageUrl: `${slideBaseUrl}/05-literatura-trauma-ideologia.jpeg`,
      description: "A análise literária observa o não dito e as camadas ocultas do psiquismo e da sociedade.",
    },
    {
      title: "Complementaridade na análise do discurso",
      imageUrl: `${slideBaseUrl}/08-complementaridade-analise-discurso.jpeg`,
      description: "Saussure, Marx e Freud ajudam a articular sistema linguístico, ideologia e inconsciente.",
    },
    {
      title: "Freud: inconsciente e falha",
      imageUrl: `${slideBaseUrl}/09-freud-inconsciente-falha.jpeg`,
      description: "Atos falhos, lapsos, contradições e metáforas podem indicar rupturas na narrativa consciente.",
    },
  ],
  revisao: [
    {
      title: "Oposições e existências no relato psicológico",
      imageUrl: `${slideBaseUrl}/06-oposicoes-existencias-relato-psicologico.jpeg`,
      description: "Mas, mais e houve precisam ser usados com precisão para evitar ambiguidade no relato.",
    },
    {
      title: "A ética da precisão clínica: porquês",
      imageUrl: `${slideBaseUrl}/07-porques-precisao-clinica.jpeg`,
      description: "Por que, porque, por quê e o porquê têm funções diferentes em perguntas, respostas e substantivação.",
    },
    {
      title: "Pronomes e precisão linguística",
      imageUrl: `${slideBaseUrl}/10-pronomes-precisao-linguistica.jpeg`,
      description: "Este/esse, onde/aonde e o uso inadequado de 'o mesmo' interferem na clareza clínica.",
    },
  ],
};

export const textsUnits: TextsUnit[] = textsContent.modulos.map((module) => {
  const questions = textsContent.questoes.filter((question) => question.modulo === module.id);
  const textQuestions = questions.map(toTextQuestion);
  const sourceSummary = textsContent.fontes.slice(0, 3).join("; ");
  const slides = moduleSlides[module.id] ?? [
    { title: module.titulo, imageUrl: fallbackImageUrl, description: module.resumo },
  ];

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
    atlasTitle: "Slides da aula",
    atlasDescription: moduleSlides[module.id]
      ? "Fotos únicas dos slides de aula, com repetições e recortes inferiores desconsiderados."
      : "Este módulo não tem foto de slide em aux/slide-aula; use o roteiro textual para revisão.",
    atlasImageUrl: slides[0]?.imageUrl ?? fallbackImageUrl,
    atlasItems: slides,
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
  const alternativas = question.id === "pit-025"
    ? [
        "Relatou mas episódios, mais não soube datá-los.",
        "Relatou mais episódios, mas não soube datá-los.",
        "Relatou mais episódios, mais não soube datá-los.",
        "Relatou mas episódios, mas não soube datá-los.",
      ]
    : question.alternativas;

  return {
    id: question.id,
    prompt: question.enunciado,
    options: alternativas,
    correctAnswer: alternativas[question.correta],
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
