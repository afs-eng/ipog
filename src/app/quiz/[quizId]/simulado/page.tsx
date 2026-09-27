import { notFound } from "next/navigation";
import { SimulationQuiz } from "@/components/simulation-quiz";
import { getNeuroUnit } from "@/lib/neuro-units";
import type { NeuroTextQuestion } from "@/lib/neuro-units";
import { getDevelopmentUnit } from "@/lib/development-units";
import { allTextsQuestions, getTextsUnit } from "@/lib/texts-units";
import { getQuizMode, quizModes } from "@/lib/study-data";

export function generateStaticParams() {
  return quizModes.map((quizMode) => ({ quizId: quizMode.id }));
}

export default async function SimulationPage({
  params,
  searchParams,
}: PageProps<"/quiz/[quizId]/simulado">) {
  const { quizId } = await params;
  const { material, remover, perguntas, topic } = await searchParams;
  const quizMode = getQuizMode(quizId);

  if (!quizMode) {
    notFound();
  }

  const selectedMaterial = typeof material === "string" ? material : undefined;
  const selectedTopic = typeof topic === "string" ? topic : undefined;
  const normalizedRemovedItems = typeof remover === "string" ? remover.split("|").map(normalizeLabel) : [];
  const isTexts = quizMode.subjectSlug === "producao-interpretacao-textos";
  const unit = isTexts ? getTextsUnit(selectedTopic) : quizMode.subjectSlug === "desenvolvimento-anos-iniciais-escolares" ? getDevelopmentUnit(selectedTopic) : getNeuroUnit(selectedTopic);
  const availableTextQuestions = unit?.testTextQuestions ?? (isTexts ? allTextsQuestions : []);

  if (!availableTextQuestions.length) {
    notFound();
  }

  const imageItems = unit?.testImageItems?.filter((item) => !normalizedRemovedItems.includes(normalizeLabel(item.label))) ?? [];
  const requestedQuestionCount = getQuestionCount(perguntas, isTexts && !unit ? 36 : 30);
  const selectedQuestions = shuffleQuestions([
    ...availableTextQuestions.map((question) => ({ kind: "text" as const, question })),
    ...imageItems.map((item) => ({ kind: "image" as const, item })),
  ]).slice(0, requestedQuestionCount);
  const textQuestions = selectedQuestions
    .filter((question): question is { kind: "text"; question: NeuroTextQuestion } => question.kind === "text")
    .map(({ question }) => question);
  const selectedImageItems = selectedQuestions
    .filter((question): question is { kind: "image"; item: NonNullable<typeof imageItems>[number] } => question.kind === "image")
    .map(({ item }) => item);

  return (
    <SimulationQuiz
      backHref={buildQuizHref(quizId, selectedMaterial, selectedTopic, typeof remover === "string" ? remover : undefined)}
      imageItems={selectedImageItems}
      textQuestions={textQuestions}
    />
  );
}

function buildQuizHref(quizId: string, materialSlug?: string, topicSlug?: string, removedItems?: string) {
  const params = new URLSearchParams();

  if (materialSlug) {
    params.set("material", materialSlug);
  }

  if (topicSlug) {
    params.set("topic", topicSlug);
  }

  if (removedItems) {
    params.set("remover", removedItems);
  }

  const query = params.toString();

  return `/quiz/${quizId}${query ? `?${query}` : ""}`;
}

function getQuestionCount(value: string | string[] | undefined, fallback: 10 | 30 | 36) {
  const parsedValue = typeof value === "string" ? Number(value) : Number.NaN;

  return [10, 20, 30, 36].includes(parsedValue) ? parsedValue : fallback;
}

function shuffleQuestions<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function normalizeLabel(value: string) {
  return value.toLocaleLowerCase("pt-BR");
}
