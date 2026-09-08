import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestionsByStatus } from "@/lib/question-files";
import { getSubject } from "@/lib/study-data";

export default async function QuestionsPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const draftQuestions = await getQuestionsByStatus("draft");
  const subject = getSubject("neuroanatomofisiologia");

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-8 sm:px-10 lg:px-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link className="text-sm font-semibold text-[#aa0000]" href="/admin">
          Voltar ao admin
        </Link>
        <Link
          className="rounded-full bg-slate-950 px-5 py-3 text-center font-semibold text-white transition hover:bg-[#aa0000]"
          href="/admin/questoes/nova"
        >
          Nova questão
        </Link>
      </div>

      <section className="mt-10">
        <p className="font-semibold text-[#aa0000]">Questões</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
          Rascunhos de Neuroanatomofisiologia
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          Estas questões foram salvas como `draft`. Elas ainda precisam de revisão humana antes de serem publicadas no quiz.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Rascunhos</p>
          <p className="mt-2 text-4xl font-semibold text-slate-950">{draftQuestions.length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Materiais cadastrados</p>
          <p className="mt-2 text-4xl font-semibold text-slate-950">
            {subject?.materials.length ?? 0}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Publicadas</p>
          <p className="mt-2 text-4xl font-semibold text-slate-950">0</p>
        </div>
      </section>

      <section className="mt-8 space-y-4">
        {draftQuestions.map((question) => (
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" key={question.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#aa0000]">
                  {question.materialId} • slide {question.sourceSlide ?? "não informado"}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">{question.prompt}</h2>
              </div>
              <span className="w-fit rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-[#aa0000]">
                draft
              </span>
            </div>
            <div className="mt-5 grid gap-2 md:grid-cols-2">
              {question.options.map((option) => (
                <div
                  className={`rounded-2xl p-4 text-sm ${
                    option.id === question.correctOption
                      ? "bg-emerald-100 font-semibold text-emerald-900"
                      : "bg-slate-100 text-slate-700"
                  }`}
                  key={option.id}
                >
                  {option.id}) {option.text}
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              {question.explanation}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
