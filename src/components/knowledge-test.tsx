"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { StoredQuestion } from "@/lib/question-schema";

type KnowledgeTestProps = {
  questions: TestQuestion[];
  title: string;
  backHref: string;
  imageItems?: ImageItem[];
  imageUrls?: string[];
  studyTimeMinutes?: number;
};

type ImageItem = {
  imageUrl: string;
  label: string;
};

type VisualOption = StoredQuestion["options"][number] & {
  imageUrl?: string;
};

type TestQuestion = StoredQuestion & {
  correctOptions?: StoredQuestion["correctOption"][];
};

type Feedback = {
  status: "correct" | "incorrect";
  optionId: string;
};

type QuestionLayout = "text" | "single-image" | "image-grid";

export function KnowledgeTest({ questions, title, backHref, imageItems = [], imageUrls = [], studyTimeMinutes = 10 }: KnowledgeTestProps) {
  const [orderedQuestions] = useState(() => buildTimedQuestionDeck(questions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, string>>({});
  const [wrongAnswers, setWrongAnswers] = useState<Record<string, string[]>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isPaused || showResult) {
      return;
    }

    const interval = window.setInterval(() => {
      setElapsedSeconds((seconds) => {
        const nextSeconds = seconds + 1;

        if (nextSeconds >= studyTimeMinutes * 60) {
          setShowResult(true);
        }

        return nextSeconds;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isPaused, showResult, studyTimeMinutes]);

  if (orderedQuestions.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-800 sm:px-10">
        <section className="mx-auto max-w-3xl rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#aa0000]">Teste</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Nenhuma questão disponível</h1>
          <p className="mt-3 leading-7 text-slate-600">
            Esta unidade ainda não tem perguntas suficientes para montar o teste.
          </p>
          <Link className="mt-6 inline-flex rounded-sm bg-[#aa0000] px-6 py-3 font-semibold text-white hover:bg-[#8b0000]" href={backHref}>
            Voltar para a aula
          </Link>
        </section>
      </main>
    );
  }

  const currentQuestion = orderedQuestions[currentIndex];
  const currentWrongAnswers = wrongAnswers[currentQuestion.id] ?? [];
  const correctCount = Object.keys(correctAnswers).length;
  const timeProgress = Math.min(100, (elapsedSeconds / (studyTimeMinutes * 60)) * 100);
  const layout = getQuestionLayout(currentIndex, currentQuestion, imageItems, imageUrls);
  const visualItem = imageItems[currentIndex % imageItems.length];
  const visualTextOptions = buildVisualTextOptions(visualItem, imageItems, currentQuestion.id, currentIndex);
  const visualImageOptions = buildVisualImageOptions(visualItem, imageItems, currentQuestion.id, currentIndex);
  const currentCorrectOption = layout === "text"
    ? currentQuestion.correctOption
    : getVisualCorrectOption(layout === "image-grid" ? visualImageOptions : visualTextOptions, visualItem);
  const currentCorrectOptions = layout === "text" && currentQuestion.correctOptions?.length
    ? currentQuestion.correctOptions
    : [currentCorrectOption];
  const currentSelectedAnswers = selectedAnswers[currentQuestion.id] ?? [];
  const isMultiAnswer = currentCorrectOptions.length > 1;
  const isQuestionCorrect = isMultiAnswer
    ? currentCorrectOptions.every((optionId) => currentSelectedAnswers.includes(optionId))
    : correctAnswers[currentQuestion.id] === currentCorrectOption;
  const mainImageUrl = visualItem?.imageUrl ?? currentQuestion.imageUrl ?? imageUrls[currentIndex % imageUrls.length];
  const headerQuestion = layout === "text"
    ? "Responda a questão abaixo."
    : layout === "image-grid"
      ? `Qual imagem mostra ${visualItem?.label ?? "o item destacado"}?`
      : "O que é isto?";
  const feedbackQuestion = layout === "text"
    ? currentQuestion
    : {
        ...currentQuestion,
        explanation: `O item destacado em verde é: ${visualItem?.label ?? "estrutura indicada"}.`,
      };

  if (showResult) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-800 sm:px-10">
        <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-[#aa0000] p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-100">Resultado</p>
            <h1 className="mt-3 text-4xl font-semibold">{correctCount} acertos</h1>
            <p className="mt-3 text-red-50">Você concluiu o teste de {title}.</p>
          </div>
          <div className="p-6 sm:p-8">
            <div className="h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-[#aa0000]" style={{ width: "100%" }} />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                className="rounded-sm border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:border-[#aa0000] hover:text-[#aa0000]"
                onClick={() => window.location.reload()}
                type="button"
              >
                Refazer teste
              </button>
              <Link className="rounded-sm bg-[#aa0000] px-6 py-3 text-center font-semibold text-white hover:bg-[#8b0000]" href={backHref}>
                Voltar para a aula
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  function selectOption(optionId: StoredQuestion["correctOption"]) {
    if (isQuestionCorrect) {
      return;
    }

    if (isMultiAnswer) {
      if (!currentCorrectOptions.includes(optionId)) {
        setWrongAnswers((current) => ({
          ...current,
          [currentQuestion.id]: Array.from(new Set([...(current[currentQuestion.id] ?? []), optionId])),
        }));
        setFeedback({ status: "incorrect", optionId });
        return;
      }

      const nextSelectedAnswers = Array.from(new Set([...currentSelectedAnswers, optionId]));
      setSelectedAnswers((current) => ({ ...current, [currentQuestion.id]: nextSelectedAnswers }));

      if (currentCorrectOptions.every((correctOption) => nextSelectedAnswers.includes(correctOption))) {
        setCorrectAnswers((current) => ({ ...current, [currentQuestion.id]: nextSelectedAnswers.join(",") }));
        setFeedback({ status: "correct", optionId });
      }

      return;
    }

    if (optionId === currentCorrectOption) {
      setCorrectAnswers((current) => ({ ...current, [currentQuestion.id]: optionId }));
      setFeedback({ status: "correct", optionId });
      return;
    }

    setWrongAnswers((current) => ({
      ...current,
      [currentQuestion.id]: Array.from(new Set([...(current[currentQuestion.id] ?? []), optionId])),
    }));
    setFeedback({ status: "incorrect", optionId });
  }

  function continueTest() {
    if (!isQuestionCorrect) {
      setFeedback(null);
      return;
    }

    setCurrentIndex((index) => (index + 1) % orderedQuestions.length);
    setFeedback(null);
  }

  return (
    <main className="min-h-screen bg-[#f2f2f2] pb-36 text-slate-800">
      <TestHeader
        backHref={backHref}
        elapsedSeconds={elapsedSeconds}
        isMenuOpen={isMenuOpen}
        isMuted={isMuted}
        isPaused={isPaused}
        onMenuToggle={() => setIsMenuOpen((current) => !current)}
        onMuteToggle={() => setIsMuted((current) => !current)}
        onPauseToggle={() => setIsPaused((current) => !current)}
        progress={timeProgress}
      />

      <div className="bg-white px-4 py-5 text-[17px] text-[#aa0000]">
        {headerQuestion}
        {layout !== "text" ? <span className="ml-2 text-sm font-semibold">Imagem</span> : null}
      </div>

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {layout === "text" ? (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="bg-white p-8 text-xl text-[#aa0000] sm:p-10">
              {currentQuestion.prompt}
            </div>
            <TextOptions
              correctOption={currentCorrectOption}
              correctOptions={currentCorrectOptions}
              currentWrongAnswers={currentWrongAnswers}
              isQuestionCorrect={isQuestionCorrect}
              isMultiAnswer={isMultiAnswer}
              onSelect={selectOption}
              options={currentQuestion.options}
              selectedOptions={currentSelectedAnswers}
            />
          </div>
        ) : null}

        {layout === "single-image" ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <ImagePanel imageUrl={mainImageUrl} title={currentQuestion.prompt} />
            <TextOptions
              correctOption={currentCorrectOption}
              currentWrongAnswers={currentWrongAnswers}
              isQuestionCorrect={isQuestionCorrect}
              onSelect={selectOption}
              options={visualTextOptions}
            />
          </div>
        ) : null}

        {layout === "image-grid" ? (
          <div className="mx-auto grid max-w-[740px] gap-2 sm:grid-cols-2">
            {visualImageOptions.map((option) => (
              <ImageOption
                correctOption={currentCorrectOption}
                imageUrl={option.imageUrl}
                isQuestionCorrect={isQuestionCorrect}
                key={option.id}
                onSelect={selectOption}
                option={option}
                wasWrong={currentWrongAnswers.includes(option.id)}
              />
            ))}
          </div>
        ) : null}
      </section>

      {feedback ? (
        <FeedbackBar
          feedback={feedback}
          isQuestionCorrect={isQuestionCorrect}
          onContinue={continueTest}
          onHide={() => setFeedback(null)}
          question={feedbackQuestion}
        />
      ) : null}
    </main>
  );
}

function TestHeader({
  backHref,
  elapsedSeconds,
  isMenuOpen,
  isMuted,
  isPaused,
  onMenuToggle,
  onMuteToggle,
  onPauseToggle,
  progress,
}: {
  backHref: string;
  elapsedSeconds: number;
  isMenuOpen: boolean;
  isMuted: boolean;
  isPaused: boolean;
  onMenuToggle: () => void;
  onMuteToggle: () => void;
  onPauseToggle: () => void;
  progress: number;
}) {
  return (
    <header className="bg-[#33495a] text-white">
      <div className="relative grid h-[62px] grid-cols-[60px_1fr_96px] items-center">
        <button
          aria-label="Abrir menu do teste"
          className="flex h-[62px] items-center justify-center bg-[#2b3f4e] text-white hover:bg-[#263846]"
          onClick={onMenuToggle}
          type="button"
        >
          <span className="space-y-1.5">
            <span className="block h-1 w-7 rounded bg-white" />
            <span className="block h-1 w-7 rounded bg-white" />
            <span className="block h-1 w-7 rounded bg-white" />
          </span>
        </button>
        <div className="px-4 sm:px-8">
          <div className="h-1.5 rounded-full bg-white">
            <div className="h-1.5 rounded-full bg-[#aa0000] transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold tabular-nums">
          <span>{formatTime(elapsedSeconds)}</span>
          <button
            aria-label={isPaused ? "Continuar teste" : "Pausar teste"}
            className="text-base font-bold leading-none"
            onClick={onPauseToggle}
            type="button"
          >
            {isPaused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>

        {isMenuOpen ? (
          <div className="absolute left-0 top-[62px] z-40 w-[250px] bg-[#33495a] text-white shadow-xl">
            <button
              aria-label="Fechar menu"
              className="flex h-14 w-[60px] items-center justify-center text-3xl font-bold hover:bg-[#2b3f4e]"
              onClick={onMenuToggle}
              type="button"
            >
              x
            </button>
            <button className="flex w-full items-center gap-5 px-5 py-4 text-left font-semibold hover:bg-[#2b3f4e]" onClick={onMuteToggle} type="button">
              <SoundOffIcon />
              {isMuted ? "Ativar sons" : "Silenciar sons"}
            </button>
            <button className="flex w-full items-center gap-5 px-5 py-4 text-left font-semibold hover:bg-[#2b3f4e]" type="button">
              <FlagIcon />
              Reportar um problema
            </button>
            <Link className="flex w-full items-center gap-5 bg-red-400 px-5 py-4 font-semibold text-white hover:bg-red-500" href={backHref}>
              <StopIcon />
              Encerrar este teste
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function TextOptions({
  correctOption,
  correctOptions = [correctOption],
  currentWrongAnswers,
  isQuestionCorrect,
  isMultiAnswer,
  onSelect,
  options,
  selectedOptions = [],
}: {
  correctOption: StoredQuestion["correctOption"];
  correctOptions?: StoredQuestion["correctOption"][];
  currentWrongAnswers: string[];
  isQuestionCorrect: boolean;
  isMultiAnswer?: boolean;
  onSelect: (optionId: StoredQuestion["correctOption"]) => void;
  options: StoredQuestion["options"];
  selectedOptions?: string[];
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isCorrect = correctOptions.includes(option.id);
        const isSelected = selectedOptions.includes(option.id);
        const isWrong = currentWrongAnswers.includes(option.id);
        const stateClass = isQuestionCorrect && isCorrect
          ? "bg-emerald-400 text-white"
          : isMultiAnswer && isSelected
            ? "bg-sky-100 text-sky-800 ring-2 ring-sky-200"
          : isWrong
            ? "bg-red-400 text-white ring-2 ring-red-200"
            : "bg-white text-slate-600 hover:text-[#aa0000]";

        return (
          <button
            className={`flex min-h-[62px] w-full items-center justify-between px-4 text-left text-[17px] transition ${stateClass}`}
            disabled={isQuestionCorrect}
            key={option.id}
            onClick={() => onSelect(option.id)}
            type="button"
          >
            <span>{option.text}</span>
            {isQuestionCorrect && isCorrect ? <StatusBubble label="certo" /> : null}
            {isMultiAnswer && isSelected && !isQuestionCorrect ? <StatusBubble label="certo" /> : null}
            {isWrong ? <StatusBubble label="errado" /> : null}
          </button>
        );
      })}
    </div>
  );
}

function ImagePanel({ imageUrl, title }: { imageUrl?: string; title: string }) {
  return (
    <div className="relative aspect-square bg-white">
      <InfoBadge />
      {imageUrl ? (
        <Image
          alt={title}
          className="object-contain p-5"
          fill
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 520px"
          src={imageUrl}
        />
      ) : null}
    </div>
  );
}

function ImageOption({
  correctOption,
  imageUrl,
  isQuestionCorrect,
  onSelect,
  option,
  wasWrong,
}: {
  correctOption: StoredQuestion["correctOption"];
  imageUrl?: string;
  isQuestionCorrect: boolean;
  onSelect: (optionId: StoredQuestion["correctOption"]) => void;
  option: StoredQuestion["options"][number];
  wasWrong: boolean;
}) {
  const isCorrect = option.id === correctOption;
  const stateClass = isQuestionCorrect && isCorrect
    ? "border-emerald-400 ring-2 ring-emerald-300"
    : wasWrong
      ? "border-red-400 ring-2 ring-red-300"
      : "border-white hover:border-red-400";

  return (
    <button
      className={`relative aspect-square overflow-hidden border bg-white transition ${stateClass}`}
      disabled={isQuestionCorrect}
      onClick={() => onSelect(option.id)}
      type="button"
    >
      <InfoBadge />
      {imageUrl ? (
        <Image
          alt={option.text}
          className="object-contain p-5"
          fill
          loading="eager"
          sizes="(max-width: 640px) 100vw, 360px"
          src={imageUrl}
        />
      ) : null}
      {isQuestionCorrect && isCorrect ? <div className="absolute inset-x-0 bottom-0 bg-emerald-400 px-4 py-3 text-left font-semibold text-white">{option.text}</div> : null}
      {wasWrong ? <div className="absolute inset-x-0 bottom-0 bg-red-400 px-4 py-3 text-left font-semibold text-white">{option.text}</div> : null}
    </button>
  );
}

function FeedbackBar({
  feedback,
  isQuestionCorrect,
  onContinue,
  onHide,
  question,
}: {
  feedback: Feedback;
  isQuestionCorrect: boolean;
  onContinue: () => void;
  onHide: () => void;
  question: StoredQuestion;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[700px] rounded-t-md bg-[#33495a] px-8 py-5 text-white shadow-2xl">
      <button className="absolute right-0 top-0 rounded-bl-md bg-[#263846] px-3 py-1 text-xs font-bold uppercase" onClick={onHide} type="button">
        Ocultar
      </button>
      <div className="grid gap-5 sm:grid-cols-[1fr_auto_auto] sm:items-center">
        <div>
          <p className="font-bold">{feedback.status === "correct" ? "Correto" : "Incorreto"}</p>
          <p className="mt-1 max-w-md text-sm font-semibold leading-5">
            {question.explanation}
          </p>
        </div>
        <button className="text-sm font-semibold underline underline-offset-4" type="button">
          Mostrar mais
        </button>
        <button className="bg-[#aa0000] px-8 py-3 text-sm font-bold uppercase text-white hover:bg-[#8b0000]" onClick={onContinue} type="button">
          {isQuestionCorrect ? "Continuar" : "Tentar novamente"}
        </button>
      </div>
    </div>
  );
}

function StatusBubble({ label }: { label: string }) {
  return (
    <span aria-label={label} className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
      {label === "certo" ? "OK" : "X"}
    </span>
  );
}

function InfoBadge() {
  return <span className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-slate-100 text-lg font-bold text-slate-400">i</span>;
}

function getQuestionLayout(index: number, question: StoredQuestion, imageItems: ImageItem[], images: string[]): QuestionLayout {
  if (question.id.includes("-texto-")) {
    return "text";
  }

  if (imageItems.length === 0 && images.length === 0 && !question.imageUrl) {
    return "text";
  }

  return index % 2 === 0 ? "single-image" : "image-grid";
}

function buildVisualTextOptions(currentItem: ImageItem | undefined, imageItems: ImageItem[], questionId: string, index: number): VisualOption[] {
  if (!currentItem) {
    return [];
  }

  const labels = getUniqueLabels(imageItems).filter((label) => label !== currentItem.label);
  const rotatedLabels = rotate(labels, index).slice(0, 3);
  const options = [currentItem.label, ...rotatedLabels].slice(0, 4);

  return rotate(options, getStableOffset(questionId, options.length)).map((label, optionIndex) => ({
    id: getOptionId(optionIndex),
    text: label,
  }));
}

function buildVisualImageOptions(currentItem: ImageItem | undefined, imageItems: ImageItem[], questionId: string, index: number): VisualOption[] {
  if (!currentItem) {
    return [];
  }

  const otherItems = imageItems.filter((item) => item.label !== currentItem.label || item.imageUrl !== currentItem.imageUrl);
  const options = [currentItem, ...rotate(otherItems, index).slice(0, 3)].slice(0, 4);

  return rotate(options, getStableOffset(questionId, options.length)).map((item, optionIndex) => ({
    id: getOptionId(optionIndex),
    imageUrl: item.imageUrl,
    text: item.label,
  }));
}

function getVisualCorrectOption(options: VisualOption[], currentItem: ImageItem | undefined) {
  return options.find((option) => option.text === currentItem?.label)?.id ?? "A";
}

function getUniqueLabels(items: ImageItem[]) {
  return Array.from(new Set(items.map((item) => item.label)));
}

function rotate<T>(items: T[], offset: number) {
  if (items.length === 0) {
    return [];
  }

  const start = offset % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

function getOptionId(index: number) {
  return ["A", "B", "C", "D"][index] as StoredQuestion["correctOption"];
}

function buildTimedQuestionDeck(items: TestQuestion[]) {
  const deck = Array.from({ length: 8 }).flatMap((_, round) =>
    shuffleQuestions(items).map((question) => shuffleQuestionOptions({
      ...question,
      id: `${question.id}__${round}`,
    })),
  );

  return deck.length > 0 ? deck : items;
}

function shuffleQuestions(items: TestQuestion[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function shuffleQuestionOptions(question: TestQuestion): TestQuestion {
  const correctText = question.options.find((option) => option.id === question.correctOption)?.text;
  const correctTexts = question.correctOptions?.map((optionId) => question.options.find((option) => option.id === optionId)?.text).filter(Boolean);
  const options = [...question.options].sort(() => Math.random() - 0.5);

  return {
    ...question,
    options,
    correctOption: options.find((option) => option.text === correctText)?.id ?? question.correctOption,
    correctOptions: correctTexts?.map((text) => options.find((option) => option.text === text)?.id).filter((optionId): optionId is StoredQuestion["correctOption"] => Boolean(optionId)),
  };
}

function getStableOffset(value: string, length: number) {
  if (length === 0) {
    return 0;
  }

  return Array.from(value).reduce((sum, character) => sum + character.charCodeAt(0), 0) % length;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
      <rect height="12" rx="1" width="4" x="3" y="2" />
      <rect height="12" rx="1" width="4" x="9" y="2" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
      <path d="M4 2.8v10.4c0 .8.9 1.3 1.6.9l8-5.2c.6-.4.6-1.4 0-1.8l-8-5.2C4.9 1.5 4 2 4 2.8Z" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path d="m17 9 4 4m0-4-4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 3h2v18H5V3Zm4 1h9l-1.5 4L18 12H9V4Z" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <rect height="14" rx="2" width="14" x="5" y="5" />
    </svg>
  );
}
