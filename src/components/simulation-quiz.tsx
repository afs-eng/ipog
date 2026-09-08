"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { NeuroTextQuestion } from "@/lib/neuro-units";

type SimulationImageItem = {
  imageUrl: string;
  label: string;
};

type SimulationQuestion =
  | {
      id: string;
      type: "text";
      prompt: string;
      options: string[];
      correctAnswers: string[];
      explanation: string;
    }
  | {
      id: string;
      type: "image-input";
      item: SimulationImageItem;
    };

type SimulationQuizProps = {
  backHref: string;
  imageItems: SimulationImageItem[];
  textQuestions: NeuroTextQuestion[];
};

const questionCount = 20;

export function SimulationQuiz({ backHref, imageItems, textQuestions }: SimulationQuizProps) {
  const [questions] = useState(() => buildSimulationQuestions(textQuestions, imageItems));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [textSelections, setTextSelections] = useState<Record<string, string[]>>({});
  const [checkedTextAnswers, setCheckedTextAnswers] = useState<Record<string, boolean>>({});
  const [checkedImageAnswers, setCheckedImageAnswers] = useState<Record<string, boolean>>({});
  const [showDetails, setShowDetails] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id] ?? "";
  const currentTextSelections = textSelections[currentQuestion.id] ?? [];
  const hasCheckedTextAnswer = checkedTextAnswers[currentQuestion.id] ?? false;
  const isCorrect = isAnswerCorrect(currentQuestion, currentAnswer, currentTextSelections);
  const hasCheckedImageAnswer = checkedImageAnswers[currentQuestion.id] ?? false;
  const hasAnsweredCurrentQuestion = currentQuestion.type === "text" ? hasCheckedTextAnswer : hasCheckedImageAnswer;
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const correctCount = questions.filter((question) => isAnswerCorrect(question, answers[question.id] ?? "", textSelections[question.id] ?? [])).length;

  function nextQuestion() {
    if (!hasAnsweredCurrentQuestion) {
      return;
    }

    if (currentIndex === questions.length - 1) {
      setShowResult(true);
      return;
    }

    setCurrentIndex((index) => Math.min(questions.length - 1, index + 1));
  }

  function selectOption(option: string) {
    if (currentQuestion.type !== "text" || hasCheckedTextAnswer) {
      return;
    }

    setTextSelections((current) => {
      const selections = current[currentQuestion.id] ?? [];
      const nextSelections = selections.includes(option)
        ? selections.filter((item) => item !== option)
        : [...selections, option];

      return { ...current, [currentQuestion.id]: nextSelections };
    });
  }

  function checkTextAnswer() {
    if (currentQuestion.type !== "text" || currentTextSelections.length === 0) {
      return;
    }

    setCheckedTextAnswers((current) => ({ ...current, [currentQuestion.id]: true }));
  }

  function checkImageAnswer() {
    if (currentQuestion.type !== "image-input" || !currentAnswer.trim()) {
      return;
    }

    setCheckedImageAnswers((current) => ({ ...current, [currentQuestion.id]: true }));
  }

  if (showResult) {
    return (
      <main className="min-h-screen bg-white p-4 text-slate-800">
        <section className="mx-auto max-w-3xl rounded border border-red-200 bg-red-50 p-6 text-center">
          <button
            aria-label="Configurações do simulado"
            className="float-right text-slate-500"
            type="button"
          >
            <GearIcon />
          </button>
          <p className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-300">
            <TrophyIcon />
          </p>
          <h1 className="mt-4 text-2xl font-normal text-[#aa0000]">Resultado do simulado</h1>
          <p className="mt-2 text-slate-600">Você acertou {correctCount}/{questions.length} questões.</p>
          <div className="mt-6 space-y-3 text-left">
            <ResultSummaryCard correctCount={correctCount} onDetailsClick={() => setShowDetails(true)} total={questions.length} />
          </div>
          <Link className="mt-6 inline-flex rounded bg-[#aa0000] px-6 py-3 font-bold uppercase text-white hover:bg-[#8b0000]" href={backHref}>
            Voltar para a aula
          </Link>
        </section>
        {showDetails ? (
          <SimulationDetailsModal
            answers={answers}
            onClose={() => setShowDetails(false)}
            questions={questions}
            textSelections={textSelections}
          />
        ) : null}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f2f2f2] text-slate-800">
      <header className="bg-[#33495a] text-white">
        <div className="grid h-14 grid-cols-[56px_1fr_92px_52px] items-center">
          <Link className="flex h-14 items-center justify-center bg-[#2b3f4e]" href={backHref}>
            <span className="space-y-1.5">
              <span className="block h-1 w-7 rounded bg-white" />
              <span className="block h-1 w-7 rounded bg-white" />
              <span className="block h-1 w-7 rounded bg-white" />
            </span>
          </Link>
          <div className="px-6 sm:px-10">
            <div className="h-1.5 rounded-full bg-white">
              <div className="h-1.5 rounded-full bg-[#aa0000]" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <span className="text-sm font-bold tabular-nums">
            {currentIndex + 1} / {questions.length}
          </span>
          <button className="flex h-14 items-center justify-center bg-[#2b3f4e] text-4xl" onClick={nextQuestion} type="button">
            ›
          </button>
        </div>
      </header>

      <div className="bg-white px-4 py-5 text-sm text-slate-600">
        {currentQuestion.type === "text" ? "Responda à questão abaixo." : "O que é isto?"}
      </div>

      <section className="mx-auto max-w-5xl px-4 py-7 sm:px-6">
        {currentQuestion.type === "text" ? (
          <div className="grid gap-7 lg:grid-cols-[1.05fr_1fr]">
            <div className="bg-white p-8 text-xl leading-8 text-[#aa0000]">
              {currentQuestion.prompt}
            </div>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const hasAnswered = hasCheckedTextAnswer;
                const isOptionCorrect = currentQuestion.correctAnswers.includes(option);
                const isSelected = currentTextSelections.includes(option);
                const stateClass = hasAnswered && isOptionCorrect
                  ? "bg-emerald-400 text-white"
                  : hasAnswered && isSelected
                    ? "bg-red-400 text-white"
                    : isSelected
                      ? "border border-red-400 bg-white text-slate-700"
                      : "bg-white text-slate-700 hover:text-[#aa0000]";

                return (
                  <button
                    className={`flex min-h-14 w-full items-center justify-between px-4 text-left transition ${stateClass}`}
                    disabled={hasAnswered}
                    key={option}
                    onClick={() => selectOption(option)}
                    type="button"
                  >
                    {option}
                    {hasAnswered && isOptionCorrect ? <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-bold">OK</span> : null}
                    {hasAnswered && isSelected && !isOptionCorrect ? <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-bold">X</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-[1fr_1fr]">
            <div className="relative aspect-square bg-white">
              <span className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-slate-100 text-lg font-bold text-slate-400">i</span>
              <Image
                alt="Estrutura anatômica destacada"
                className="object-contain p-5"
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 520px"
                src={currentQuestion.item.imageUrl}
              />
            </div>
            <div>
              <input
                className={`h-10 w-full border bg-white px-4 text-slate-700 outline-none ${
                  hasCheckedImageAnswer && isCorrect
                    ? "border-emerald-400"
                    : hasCheckedImageAnswer
                      ? "border-red-400 shadow-[0_0_0_1px_#f87171]"
                      : "border-[#aa0000] shadow-[0_0_0_1px_#aa0000]"
                }`}
                onChange={(event) => {
                  setAnswers((current) => ({ ...current, [currentQuestion.id]: event.target.value }));
                  setCheckedImageAnswers((current) => ({ ...current, [currentQuestion.id]: false }));
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    checkImageAnswer();
                  }
                }}
                placeholder="Escreva aqui a sua resposta ..."
                value={currentAnswer}
              />
              {hasCheckedImageAnswer ? (
                <div className="mt-3 space-y-3 text-sm text-slate-600">
                  <div className={`flex h-9 items-center justify-between border bg-white px-4 ${isCorrect ? "border-emerald-400" : "border-red-400"}`}>
                    <span>{currentAnswer}</span>
                    <span className={`rounded-full px-2 py-1 text-xs font-bold text-white ${isCorrect ? "bg-emerald-400" : "bg-red-400"}`}>
                      {isCorrect ? "OK" : "X"}
                    </span>
                  </div>
                  {isCorrect ? (
                    <>
                      <div className="bg-slate-100 px-4 py-3">{currentQuestion.item.label}</div>
                      <div className="bg-slate-100 px-4 py-3">Sinônimos: Nenhum</div>
                    </>
                  ) : (
                    <>
                      <div className="bg-red-50 px-4 py-3 text-red-600">Resposta incorreta.</div>
                      <div className="bg-slate-100 px-4 py-3">Resposta correta: {currentQuestion.item.label}</div>
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 flex justify-center border-t border-slate-300 bg-white/70 px-4 py-1">
        {currentQuestion.type === "image-input" ? (
          <button
            className="flex w-full max-w-[630px] items-center justify-center gap-4 rounded-t-md bg-[#aa0000] px-6 py-4 text-sm font-semibold text-white hover:bg-[#8b0000] disabled:bg-slate-300"
            disabled={!currentAnswer.trim()}
            onClick={hasCheckedImageAnswer ? nextQuestion : checkImageAnswer}
            type="button"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8b0000] text-white">OK</span>
            {hasCheckedImageAnswer ? "Continuar" : "Verificar as minhas respostas"}
          </button>
        ) : (
          <div className="w-full max-w-[630px]">
            <button
              className="flex w-full items-center justify-center gap-4 rounded-t-md bg-[#aa0000] px-6 py-4 text-sm font-semibold text-white hover:bg-[#8b0000] disabled:bg-slate-300"
              disabled={currentTextSelections.length === 0}
              onClick={hasCheckedTextAnswer ? nextQuestion : checkTextAnswer}
              type="button"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8b0000] text-xs text-white">OK</span>
              {hasCheckedTextAnswer ? "Continuar" : "Verificar as minhas respostas"}
            </button>
          </div>
        )}
      </div>

      {currentQuestion.type === "text" && hasCheckedTextAnswer ? (
        <FeedbackBar
          isCorrect={isCorrect}
          onContinue={nextQuestion}
          question={currentQuestion}
        />
      ) : null}
    </main>
  );
}

function buildSimulationQuestions(textQuestions: NeuroTextQuestion[], imageItems: SimulationImageItem[]) {
  const textDeck: SimulationQuestion[] = shuffle(textQuestions).map((question, index) => ({
    id: `simulado-texto-${index}`,
    type: "text",
    prompt: question.prompt,
    options: shuffle(question.options).slice(0, 6),
    correctAnswers: question.correctAnswers ?? (question.correctAnswer ? [question.correctAnswer] : []),
    explanation: question.explanation,
  }));
  const imageDeck: SimulationQuestion[] = shuffle(imageItems).map((item, index) => ({
    id: `simulado-imagem-${index}`,
    type: "image-input",
    item,
  }));
  const mixedQuestions = Array.from({ length: questionCount }, (_, index) => {
    if (index % 4 === 1 && imageDeck.length > 0) {
      return imageDeck[index % imageDeck.length];
    }

    return textDeck[index % textDeck.length];
  });

  return mixedQuestions;
}

function ResultSummaryCard({ correctCount, onDetailsClick, total }: { correctCount: number; onDetailsClick: () => void; total: number }) {
  const percentage = Math.round((correctCount / total) * 100);
  const missingCorrectAnswers = Math.max(0, Math.ceil(total * 0.6) - correctCount);

  return (
    <div className="flex items-center justify-between rounded-sm border border-slate-300 bg-white p-4">
      <div>
        <p className="font-bold text-slate-700">
          Simulado concluído: {correctCount}/{total} <span className="text-red-400">({percentage}%)</span>
        </p>
        <p className="mt-1 text-sm text-slate-400">
          {missingCorrectAnswers > 0
            ? `Faltam ${missingCorrectAnswers} respostas corretas para você passar`
            : "Você atingiu a pontuação mínima do simulado"}
        </p>
      </div>
      <button aria-label="Detalhes do seu teste" className="text-slate-500 hover:text-[#aa0000]" onClick={onDetailsClick} type="button">
        <InfoIcon />
      </button>
    </div>
  );
}

function SimulationDetailsModal({
  answers,
  onClose,
  questions,
  textSelections,
}: {
  answers: Record<string, string>;
  onClose: () => void;
  questions: SimulationQuestion[];
  textSelections: Record<string, string[]>;
}) {
  const correctCount = questions.filter((question) => isAnswerCorrect(question, answers[question.id] ?? "", textSelections[question.id] ?? [])).length;
  const incorrectCount = questions.length - correctCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <section className="max-h-[92vh] w-full max-w-3xl overflow-auto rounded bg-white p-7 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-normal text-[#aa0000]">Detalhes do seu teste</h2>
          <button className="text-4xl font-light leading-none text-slate-300 hover:text-slate-500" onClick={onClose} type="button">
            x
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold uppercase">
          <span className="rounded-full bg-[#aa0000] px-4 py-2 text-white">Todas</span>
          <span className="rounded-full border border-emerald-400 px-4 py-2 text-emerald-500">{correctCount} corretas</span>
          <span className="rounded-full border border-red-400 px-4 py-2 text-red-400">{incorrectCount} incorretas</span>
          <span className="rounded-full border border-slate-400 px-4 py-2 text-slate-500">0 ignoradas</span>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {questions.map((question, index) => {
            const answer = answers[question.id] ?? "";
            const isCorrect = isAnswerCorrect(question, answer, textSelections[question.id] ?? []);
            const stateClass = isCorrect ? "border-emerald-400 bg-emerald-50" : "border-red-400 bg-red-50";

            return (
              <button className={`relative min-h-20 rounded-sm border p-3 text-left text-sm text-slate-600 ${stateClass}`} key={question.id} type="button">
                <span className={`absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${isCorrect ? "bg-emerald-400" : "bg-red-400"}`}>
                  {isCorrect ? "OK" : "X"}
                </span>
                <span className="line-clamp-3 pr-5">
                  {index + 1}. {getQuestionPreview(question)}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex justify-end">
          <button className="rounded-sm bg-[#aa0000] px-6 py-3 text-sm font-bold uppercase text-white hover:bg-[#8b0000]" onClick={onClose} type="button">
            Revisar questões selecionadas ({questions.length})
          </button>
        </div>
      </section>
    </div>
  );
}

function FeedbackBar({ isCorrect, onContinue, question }: { isCorrect: boolean; onContinue: () => void; question: Extract<SimulationQuestion, { type: "text" }> }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[700px] rounded-t-md bg-[#33495a] px-8 py-5 text-white shadow-2xl">
      <button className="absolute right-0 top-0 rounded-bl-md bg-[#263846] px-3 py-1 text-xs font-bold uppercase" type="button">
        Ocultar
      </button>
      <div className="grid gap-5 sm:grid-cols-[1fr_auto_auto] sm:items-center">
        <div>
          <p className="font-bold">{isCorrect ? "Correto" : "Incorreto"}</p>
          <p className="mt-1 max-w-md text-sm font-semibold leading-5">{question.explanation}</p>
        </div>
        <button className="text-sm font-semibold underline underline-offset-4" type="button">
          Mostrar mais
        </button>
        <button className="bg-[#aa0000] px-8 py-3 text-sm font-bold uppercase text-white hover:bg-[#8b0000]" onClick={onContinue} type="button">
          Continuar
        </button>
      </div>
    </div>
  );
}

function getQuestionPreview(question: SimulationQuestion) {
  return question.type === "text" ? question.prompt : "O que é isto?";
}

function isAnswerCorrect(question: SimulationQuestion, answer: string, textSelections: string[] = []) {
  if (question.type === "text") {
    return areSameAnswers(textSelections, question.correctAnswers);
  }

  return normalizeAnswer(answer) === normalizeAnswer(question.item.label);
}

function areSameAnswers(selectedAnswers: string[], correctAnswers: string[]) {
  return selectedAnswers.length === correctAnswers.length && correctAnswers.every((answer) => selectedAnswers.includes(answer));
}

function normalizeAnswer(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ");
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function GearIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.2 3.5c0-.5-.1-1-.2-1.4l2-1.5-2-3.4-2.4 1a8 8 0 0 0-2.4-1.4L14.8 2h-5.6l-.4 2.8c-.9.3-1.7.8-2.4 1.4l-2.4-1-2 3.4 2 1.5a8.8 8.8 0 0 0 0 2.8l-2 1.5 2 3.4 2.4-1c.7.6 1.5 1 2.4 1.4l.4 2.8h5.6l.4-2.8c.9-.3 1.7-.8 2.4-1.4l2.4 1 2-3.4-2-1.5c.1-.4.2-.9.2-1.4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg aria-hidden="true" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 4V2h10v2h3v4a5 5 0 0 1-4.1 4.9A6 6 0 0 1 13 15.9V19h3v2H8v-2h3v-3.1a6 6 0 0 1-2.9-3A5 5 0 0 1 4 8V4h3Zm0 2H6v2a3 3 0 0 0 1.3 2.5A7.5 7.5 0 0 1 7 8.5V6Zm11 2.5c0 .7-.1 1.4-.3 2A3 3 0 0 0 19 8V6h-1v2.5Z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11v5m0-8h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
