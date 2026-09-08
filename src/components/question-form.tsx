"use client";

import { useState, type FormEvent } from "react";
import type { Material } from "@/lib/study-data";
import type { QuestionDraftInput, StoredQuestion } from "@/lib/question-schema";

type QuestionFormProps = {
  materials: Material[];
};

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; questionId: string }
  | { status: "error"; message: string };

const optionIds = ["A", "B", "C", "D"] as const;

export function QuestionForm({ materials }: QuestionFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "loading" });

    const formData = new FormData(event.currentTarget);
    const sourceSlideValue = String(formData.get("sourceSlide") ?? "").trim();
    const imageUrlValue = String(formData.get("imageUrl") ?? "").trim();
    const subtopicValue = String(formData.get("subtopicId") ?? "").trim();

    const payload: QuestionDraftInput = {
      subjectId: "neuroanatomofisiologia",
      materialId: String(formData.get("materialId") ?? ""),
      topicId: String(formData.get("topicId") ?? ""),
      subtopicId: subtopicValue || undefined,
      type: String(formData.get("type") ?? "text") as QuestionDraftInput["type"],
      difficulty: String(formData.get("difficulty") ?? "easy") as QuestionDraftInput["difficulty"],
      prompt: String(formData.get("prompt") ?? ""),
      imageUrl: imageUrlValue || undefined,
      options: optionIds.map((id) => ({
        id,
        text: String(formData.get(`option${id}`) ?? ""),
      })),
      correctOption: String(formData.get("correctOption") ?? "A") as QuestionDraftInput["correctOption"],
      explanation: String(formData.get("explanation") ?? ""),
      sourceSlide: sourceSlideValue ? Number(sourceSlideValue) : undefined,
      sourceExcerpt: String(formData.get("sourceExcerpt") ?? ""),
    };

    const response = await fetch("/api/admin/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result: { message?: string; question?: StoredQuestion } = await response.json();

    if (!response.ok || !result.question) {
      setSubmitState({ status: "error", message: result.message ?? "Não foi possível salvar." });
      return;
    }

    event.currentTarget.reset();
    setSubmitState({ status: "success", questionId: result.question.id });
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Material</span>
          <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3" name="materialId" required>
            <option value="">Selecione</option>
            {materials.map((material) => (
              <option key={material.slug} value={material.slug}>
                Aula {material.order} - {material.title}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Tipo</span>
          <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3" name="type">
            <option value="text">Textual</option>
            <option value="image">Com imagem</option>
            <option value="clinical">Clínico-aplicada</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Tópico</span>
          <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" name="topicId" required />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Subtópico</span>
          <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" name="subtopicId" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Dificuldade</span>
          <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3" name="difficulty">
            <option value="easy">Fácil</option>
            <option value="medium">Média</option>
            <option value="hard">Difícil</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Slide/Página da fonte</span>
          <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" min="1" name="sourceSlide" type="number" />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Pergunta</span>
        <textarea className="min-h-32 w-full rounded-2xl border border-slate-300 px-4 py-3" name="prompt" required />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">URL da imagem, se houver</span>
        <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" name="imageUrl" placeholder="/imagens/preparadas/exemplo.png" />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        {optionIds.map((id) => (
          <label className="space-y-2" key={id}>
            <span className="text-sm font-semibold text-slate-700">Alternativa {id}</span>
            <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" name={`option${id}`} required />
          </label>
        ))}
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Alternativa correta</span>
        <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3" name="correctOption">
          {optionIds.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Explicação</span>
        <textarea className="min-h-28 w-full rounded-2xl border border-slate-300 px-4 py-3" name="explanation" required />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Trecho ou referência da fonte</span>
        <textarea className="min-h-24 w-full rounded-2xl border border-slate-300 px-4 py-3" name="sourceExcerpt" required />
      </label>

      {submitState.status === "success" ? (
        <div className="rounded-2xl bg-emerald-100 p-4 text-sm font-semibold text-emerald-800">
          Questão salva em draft: {submitState.questionId}
        </div>
      ) : null}
      {submitState.status === "error" ? (
        <div className="rounded-2xl bg-red-100 p-4 text-sm font-semibold text-red-800">
          {submitState.message}
        </div>
      ) : null}

      <button
        className="w-full rounded-full bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-[#aa0000] disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={submitState.status === "loading"}
        type="submit"
      >
        {submitState.status === "loading" ? "Salvando..." : "Salvar questão em draft"}
      </button>
    </form>
  );
}
