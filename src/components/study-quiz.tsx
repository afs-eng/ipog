"use client";

import Image from "next/image";
import { useState } from "react";
import type { StoredQuestion } from "@/lib/question-schema";

type StudyQuizProps = {
  questions: StoredQuestion[];
};

export function StudyQuiz({ questions }: StudyQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  if (questions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-950">Nenhuma questão disponível</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Esta aula ainda não tem perguntas geradas com segurança a partir dos slides.
        </p>
      </div>
    );
  }

  const correctAnswers = questions.filter(
    (question) => answers[question.id] === question.correctOption,
  ).length;

  return (
    <div className="space-y-6">
      {expandedImage ? (
        <button
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-slate-950/90 p-4"
          onClick={() => setExpandedImage(null)}
          type="button"
        >
          <Image
            alt="Imagem ampliada do slide"
            className="max-h-[90vh] w-auto rounded-2xl object-contain"
            height={1200}
            src={expandedImage}
            width={1600}
          />
        </button>
      ) : null}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-sky-700">Modo treino</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
          {correctAnswers} acertos de {Object.keys(answers).length} respondidas
        </h2>
      </div>

      {questions.map((question, index) => {
        const selectedAnswer = answers[question.id];
        const hasAnswered = Boolean(selectedAnswer);

        return (
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" key={question.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-sky-700">
                  Questão {index + 1} de {questions.length} • Slide {question.sourceSlide ?? "não informado"}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-8 text-slate-950">
                  {question.prompt}
                </h3>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {question.topicId.replaceAll("-", " ")}
              </span>
            </div>

            {question.imageUrl ? (
              <button
                className="mt-6 block w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 text-left transition hover:border-sky-400"
                onClick={() => setExpandedImage(question.imageUrl ?? null)}
                type="button"
              >
                <div className="relative mx-auto aspect-video w-full max-w-4xl">
                  <Image
                    alt={`Imagem do slide ${question.sourceSlide ?? "da questão"}`}
                    className="object-contain p-2"
                    fill
                    sizes="(max-width: 768px) 100vw, 896px"
                    src={question.imageUrl}
                  />
                </div>
                <p className="border-t border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600">
                  Clique para ampliar a imagem
                </p>
              </button>
            ) : null}

            <div className="mt-6 grid gap-3">
              {question.options.map((option) => {
                const isCorrect = option.id === question.correctOption;
                const isSelected = option.id === selectedAnswer;
                const optionState = hasAnswered
                  ? isCorrect
                    ? "border-emerald-500 bg-emerald-50 text-emerald-950"
                    : isSelected
                      ? "border-red-400 bg-red-50 text-red-950"
                      : "border-slate-200 bg-slate-50 text-slate-600"
                  : "border-slate-200 bg-white text-slate-800 hover:border-sky-400 hover:bg-sky-50";

                return (
                  <button
                    className={`rounded-2xl border p-4 text-left font-medium transition ${optionState}`}
                    key={option.id}
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                    type="button"
                  >
                    {option.id}) {option.text}
                  </button>
                );
              })}
            </div>

            {hasAnswered ? (
              <div className="mt-6 rounded-2xl bg-slate-50 p-5 leading-7 text-slate-700">
                <p className="font-semibold text-slate-950">
                  {selectedAnswer === question.correctOption ? "Resposta correta" : "Resposta incorreta"}
                </p>
                <p className="mt-2">{question.explanation}</p>
                <p className="mt-3 text-sm text-slate-500">Fonte: {question.sourceExcerpt}</p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
