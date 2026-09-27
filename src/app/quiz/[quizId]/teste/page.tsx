import { notFound } from "next/navigation";
import { KnowledgeTest } from "@/components/knowledge-test";
import { getNeuroUnit } from "@/lib/neuro-units";
import { getDevelopmentUnit } from "@/lib/development-units";
import { allTextsQuestions, getTextsUnit } from "@/lib/texts-units";
import { getLocalStudyQuestions } from "@/lib/question-files";
import type { StoredQuestion } from "@/lib/question-schema";
import { getQuizMode, getSubject, quizModes } from "@/lib/study-data";

export function generateStaticParams() {
  return quizModes.map((quizMode) => ({ quizId: quizMode.id }));
}

export default async function KnowledgeTestPage({
  params,
  searchParams,
}: PageProps<"/quiz/[quizId]/teste">) {
  const { quizId } = await params;
  const { material, remover, perguntas, topic } = await searchParams;
  const quizMode = getQuizMode(quizId);

  if (!quizMode) {
    notFound();
  }

  const selectedMaterial = typeof material === "string" ? material : undefined;
  const removedItems = typeof remover === "string" ? remover.split("|") : [];
  const normalizedRemovedItems = removedItems.map(normalizeLabel);
  const selectedTopic = typeof topic === "string" ? topic : undefined;
  const subjectSlug = quizMode.subjectSlug as StoredQuestion["subjectId"];
  const isTexts = subjectSlug === "producao-interpretacao-textos";
  const unit = isTexts ? getTextsUnit(selectedTopic) : subjectSlug === "desenvolvimento-anos-iniciais-escolares" ? getDevelopmentUnit(selectedTopic) : getNeuroUnit(selectedTopic);
  const subject = getSubject(subjectSlug);
  const currentMaterial = subject?.materials.find((item) => item.slug === selectedMaterial);
  const questions = await getLocalStudyQuestions();
  const materialQuestions = selectedMaterial
    ? questions.filter((question) => question.materialId === selectedMaterial)
    : questions;
  const filteredQuestions = unit
    ? materialQuestions
    : selectedTopic
      ? materialQuestions.filter((question) => question.topicId === selectedTopic)
      : materialQuestions;
  const sourceTextQuestions = unit?.testTextQuestions ?? (isTexts ? allTextsQuestions : []);
  const textQuestions = sourceTextQuestions.map((question, index) => ({
    subjectId: subjectSlug,
    id: question.id ?? `${unit?.slug ?? subjectSlug}-texto-${String(index + 1).padStart(3, "0")}`,
    materialId: selectedMaterial ?? (isTexts ? unit?.slug ?? subjectSlug : "encefalo"),
    topicId: unit?.slug ?? selectedTopic ?? subjectSlug,
    type: "text" as const,
    difficulty: "easy" as const,
    prompt: question.prompt,
    options: question.options.slice(0, 4).map((option, optionIndex) => ({
      id: ["A", "B", "C", "D"][optionIndex] as "A" | "B" | "C" | "D",
      text: option,
    })),
    correctOption: ["A", "B", "C", "D"][question.options.indexOf(question.correctAnswer ?? question.correctAnswers?.[0] ?? question.options[0])] as "A" | "B" | "C" | "D",
    correctOptions: question.correctAnswers
      ?.map((answer) => ["A", "B", "C", "D"][question.options.indexOf(answer)] as "A" | "B" | "C" | "D" | undefined)
      .filter((optionId): optionId is "A" | "B" | "C" | "D" => Boolean(optionId)),
    explanation: question.explanation,
    sourceExcerpt: question.sourceExcerpt,
    sourceUrl: question.sourceUrl,
    status: "draft" as const,
    createdAt: "2026-09-06T00:00:00.000Z",
    updatedAt: "2026-09-06T00:00:00.000Z",
  }));
  const unitSlug = unit?.slug;
  const testImageItems = unit?.testImageItems?.filter((item) => !normalizedRemovedItems.includes(normalizeLabel(item.label)));
  const visualQuestions = testImageItems?.map((item, index) => ({
    subjectId: "neuroanatomofisiologia" as const,
    id: `${unitSlug}-imagem-${String(index + 1).padStart(3, "0")}`,
    materialId: selectedMaterial ?? "encefalo",
    topicId: unitSlug ?? "",
    type: "image" as const,
    difficulty: "easy" as const,
    prompt: `Identifique no atlas: ${item.label}.`,
    imageUrl: item.imageUrl,
    options: ["A", "B", "C", "D"].map((optionId) => ({
      id: optionId as "A" | "B" | "C" | "D",
      text: item.label,
    })),
    correctOption: "A" as const,
    explanation: `Revise a imagem do atlas de cérebro: ${item.label}.`,
    sourceExcerpt: "Questão visual de revisão sobre o atlas do cérebro.",
    status: "draft" as const,
    createdAt: "2026-09-06T00:00:00.000Z",
    updatedAt: "2026-09-06T00:00:00.000Z",
  })) ?? [];
  const requestedQuestionCount = getQuestionCount(perguntas, isTexts && !unit ? 36 : 10);
  const availableQuestions = unit || isTexts ? [...textQuestions, ...visualQuestions] : filteredQuestions;
  const testQuestions = shuffleQuestions(availableQuestions).slice(0, requestedQuestionCount);
  const pageTitle = unit
    ? unit.title
    : selectedTopic
      ? selectedTopic.replaceAll("-", " ")
      : currentMaterial?.title ?? quizMode.title;
  const backHref = buildQuizHref(quizId, selectedMaterial, selectedTopic, typeof remover === "string" ? remover : undefined);

  return (
    <KnowledgeTest
      backHref={backHref}
      imageItems={testImageItems}
      imageUrls={testImageItems?.map((item) => item.imageUrl)}
      questions={testQuestions}
      title={pageTitle}
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
