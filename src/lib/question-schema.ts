import { z } from "zod";

export const questionOptionSchema = z.object({
  id: z.enum(["A", "B", "C", "D"]),
  text: z.string().trim().min(2, "Preencha o texto da alternativa."),
});

export const questionDraftSchema = z.object({
  subjectId: z.literal("neuroanatomofisiologia"),
  materialId: z.string().trim().min(1, "Selecione o material."),
  topicId: z.string().trim().min(2, "Informe o tópico."),
  subtopicId: z.string().trim().optional(),
  type: z.enum(["text", "image", "clinical"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  prompt: z.string().trim().min(10, "A pergunta precisa ser mais completa."),
  imageUrl: z.string().trim().optional(),
  options: z
    .array(questionOptionSchema)
    .length(4, "A questão precisa ter exatamente 4 alternativas."),
  correctOption: z.enum(["A", "B", "C", "D"]),
  explanation: z.string().trim().min(10, "Informe uma explicação para a resposta."),
  sourceSlide: z.coerce.number().int().positive().optional(),
  sourceExcerpt: z.string().trim().min(5, "Informe um trecho ou referência da fonte."),
});

export type QuestionDraftInput = z.infer<typeof questionDraftSchema>;

export type StoredQuestion = QuestionDraftInput & {
  id: string;
  status: "draft" | "reviewed" | "published";
  createdAt: string;
  updatedAt: string;
};
