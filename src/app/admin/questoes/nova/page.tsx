import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestionForm } from "@/components/question-form";
import { getSubject } from "@/lib/study-data";

export default function NewQuestionPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const subject = getSubject("neuroanatomofisiologia");

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-8 sm:px-10 lg:px-12">
      <Link className="text-sm font-semibold text-[#aa0000]" href="/admin">
        Voltar ao admin
      </Link>
      <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="font-semibold text-[#aa0000]">Nova questão</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
          Cadastrar questão em draft
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-slate-600">
          Preencha com base no material da aula. A questão será salva como rascunho e ainda não aparece nos quizzes até ser revisada e publicada.
        </p>
        <div className="mt-10">
          <QuestionForm materials={subject?.materials ?? []} />
        </div>
      </section>
    </main>
  );
}
