import { notFound } from "next/navigation";
import { SimulationQuiz } from "@/components/simulation-quiz";
import { getNeuroUnit } from "@/lib/neuro-units";
import { getQuizMode, quizModes } from "@/lib/study-data";

export function generateStaticParams() {
  return quizModes.map((quizMode) => ({ quizId: quizMode.id }));
}

export default async function SimulationPage({
  params,
  searchParams,
}: PageProps<"/quiz/[quizId]/simulado">) {
  const { quizId } = await params;
  const { material, topic } = await searchParams;
  const quizMode = getQuizMode(quizId);

  if (!quizMode) {
    notFound();
  }

  const selectedMaterial = typeof material === "string" ? material : undefined;
  const selectedTopic = typeof topic === "string" ? topic : undefined;
  const unit = getNeuroUnit(selectedTopic);

  if (!unit?.testTextQuestions?.length) {
    notFound();
  }

  return (
    <SimulationQuiz
      backHref={buildQuizHref(quizId, selectedMaterial, selectedTopic)}
      imageItems={unit.testImageItems ?? []}
      textQuestions={unit.testTextQuestions}
    />
  );
}

function buildQuizHref(quizId: string, materialSlug?: string, topicSlug?: string) {
  const params = new URLSearchParams();

  if (materialSlug) {
    params.set("material", materialSlug);
  }

  if (topicSlug) {
    params.set("topic", topicSlug);
  }

  const query = params.toString();

  return `/quiz/${quizId}${query ? `?${query}` : ""}`;
}
