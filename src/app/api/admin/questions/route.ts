import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { questionDraftSchema, type StoredQuestion } from "@/lib/question-schema";
import { getSubject } from "@/lib/study-data";

const draftDirectory = path.join(
  process.cwd(),
  "disciplinas",
  "neuroanatomofisiologia",
  "questoes",
  "draft",
);

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ message: "Área administrativa indisponível em produção." }, { status: 403 });
  }

  const body: unknown = await request.json();
  const parsed = questionDraftSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { message: "Dados inválidos.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const subject = getSubject(parsed.data.subjectId);
  const material = subject?.materials.find((item) => item.slug === parsed.data.materialId);

  if (!material) {
    return Response.json({ message: "Material não cadastrado." }, { status: 400 });
  }

  const now = new Date().toISOString();
  const id = `${parsed.data.materialId}-${randomUUID()}`;
  const question: StoredQuestion = {
    ...parsed.data,
    id,
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };

  await mkdir(draftDirectory, { recursive: true });
  await writeFile(
    path.join(draftDirectory, `${id}.json`),
    `${JSON.stringify(question, null, 2)}\n`,
    "utf8",
  );

  return Response.json({ message: "Questão salva em draft.", question });
}
