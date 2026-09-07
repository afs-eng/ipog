import Link from "next/link";
import { SubjectCard } from "@/components/subject-card";
import { subjects } from "@/lib/study-data";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32rem),linear-gradient(135deg,#f8fafc,#eef2ff)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link className="text-xl font-bold tracking-tight text-slate-950" href="/">
              IPOG Quiz
            </Link>
            <nav className="flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
              <Link className="rounded-full bg-white px-4 py-2 shadow-sm" href="/disciplinas">
                Disciplinas
              </Link>
              <Link className="rounded-full bg-white px-4 py-2 shadow-sm" href="/admin">
                Admin
              </Link>
            </nav>
          </header>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm">
                Banco de questões feito a partir das suas aulas
              </div>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                  Estude Psicologia com quizzes organizados por disciplina e material.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-700">
                  Estrutura inicial para acompanhar desempenho, revisar erros e preparar questões textuais ou com imagens sem extrapolar o conteúdo enviado pelo professor.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  className="rounded-full bg-slate-950 px-6 py-4 text-center font-semibold text-white shadow-lg shadow-slate-300 transition hover:bg-sky-700"
                  href="/disciplinas/neuroanatomofisiologia"
                >
                  Abrir Neuroanatomofisiologia
                </Link>
                <Link
                  className="rounded-full border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-950 transition hover:border-sky-700 hover:text-sky-700"
                  href="/disciplinas"
                >
                  Ver disciplinas
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-300/60 backdrop-blur">
              <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">
                  Modo treino
                </p>
                <div className="mt-8 space-y-5">
                  <p className="text-slate-300">Neuroanatomofisiologia • Encéfalo</p>
                  <h2 className="text-2xl font-semibold">Questões ficam em rascunho até revisão.</h2>
                  <div className="grid gap-3">
                    {[
                      "4 alternativas por questão",
                      "Feedback imediato",
                      "Fonte por slide ou página",
                      "Imagens ampliáveis no quiz",
                    ].map((item) => (
                      <div className="rounded-2xl bg-white/10 p-4 text-sm text-slate-100" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-semibold text-sky-700">Dashboard inicial</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Disciplinas cadastradas
            </h2>
          </div>
          <p className="max-w-xl leading-7 text-slate-600">
            As contagens começam zeradas porque as questões devem nascer dos materiais enviados, não de conteúdo inventado.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.slug} subject={subject} />
          ))}
        </div>
      </section>
    </main>
  );
}
