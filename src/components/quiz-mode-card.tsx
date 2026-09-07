import Link from "next/link";
import type { QuizMode } from "@/lib/study-data";

const modeLabels: Record<QuizMode["mode"], string> = {
  training: "Treino",
  exam: "Simulado",
  mistakes: "Erros",
  favorites: "Favoritas",
};

const typeLabels: Record<QuizMode["type"], string> = {
  text: "Textual",
  image: "Imagem",
  mixed: "Misto",
};

type QuizModeCardProps = {
  quizMode: QuizMode;
};

export function QuizModeCard({ quizMode }: QuizModeCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
          {modeLabels[quizMode.mode]}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {typeLabels[quizMode.type]}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
        {quizMode.title}
      </h3>
      <p className="mt-3 min-h-16 leading-7 text-slate-600">{quizMode.description}</p>
      <div className="mt-6 rounded-2xl bg-slate-100 p-4">
        <p className="text-sm text-slate-500">Questões disponíveis</p>
        <p className="text-3xl font-semibold text-slate-950">{quizMode.questionCount}</p>
      </div>
      <Link
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
        href={`/quiz/${quizMode.id}`}
      >
        {quizMode.isAvailable ? "Iniciar quiz" : "Ver organização"}
      </Link>
    </article>
  );
}
