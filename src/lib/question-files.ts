import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { StoredQuestion } from "@/lib/question-schema";

const neuroQuestionsDirectory = path.join(
  process.cwd(),
  "disciplinas",
  "neuroanatomofisiologia",
  "questoes",
);

export async function getQuestionsByStatus(status: StoredQuestion["status"]) {
  const directory = path.join(neuroQuestionsDirectory, status);

  try {
    const files = await readdir(directory);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));
    const questions = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await readFile(path.join(directory, file), "utf8");
        return JSON.parse(content) as StoredQuestion;
      }),
    );

    return questions.sort((first, second) => first.id.localeCompare(second.id));
  } catch {
    return [];
  }
}

export async function getLocalStudyQuestions() {
  const draftQuestions = await getQuestionsByStatus("draft");
  const publishedQuestions = await getQuestionsByStatus("published");

  return [...publishedQuestions, ...draftQuestions].sort((first, second) =>
    first.id.localeCompare(second.id),
  );
}

export async function getQuestionsByMaterial(materialId: string) {
  const questions = await getLocalStudyQuestions();

  return questions.filter((question) => question.materialId === materialId);
}

export function getTopicSummaries(questions: StoredQuestion[]) {
  const topics = new Map<string, { id: string; name: string; count: number }>();

  for (const question of questions) {
    const current = topics.get(question.topicId);
    topics.set(question.topicId, {
      id: question.topicId,
      name: formatTopicName(question.topicId),
      count: (current?.count ?? 0) + 1,
    });
  }

  return Array.from(topics.values()).sort((first, second) =>
    first.name.localeCompare(second.name),
  );
}

function formatTopicName(topicId: string) {
  return topicId
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
