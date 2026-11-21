import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NeuroCourseCard } from "@/components/neuro-course-card";
import { CourseCard } from "@/components/course-card";
import { TextsStudyPage } from "@/components/texts-study-page";
import { neuroCourseSections } from "@/lib/neuro-course";
import { developmentCourseSections } from "@/lib/development-course";
import { textsCourseSections } from "@/lib/texts-course";
import { getSubject, subjects } from "@/lib/study-data";

export function generateStaticParams() {
  return subjects.map((subject) => ({ subjectSlug: subject.slug }));
}

export default async function SubjectPage({
  params,
}: PageProps<"/disciplinas/[subjectSlug]">) {
  const { subjectSlug } = await params;
  const subject = getSubject(subjectSlug);

  if (!subject) {
    notFound();
  }

  if (subjectSlug === "introducao-psicologia-historia-fundamentos") {
    return <PsychologyStudyPage subjectName={subject.name} />;
  }

  if (subjectSlug !== "neuroanatomofisiologia" && subjectSlug !== "desenvolvimento-anos-iniciais-escolares" && subjectSlug !== "producao-interpretacao-textos") {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-6 py-8 sm:px-10 lg:px-12">
        <Link className="text-sm font-semibold text-[#aa0000]" href="/disciplinas">
          Voltar para disciplinas
        </Link>
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="font-semibold text-[#aa0000]">Disciplina</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            {subject.name}
          </h1>
          <p className="mt-4 max-w-2xl leading-8 text-slate-600">{subject.description}</p>
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-6 text-slate-600">
            Esta disciplina está pronta para receber materiais e questões.
          </div>
        </section>
      </main>
    );
  }

  const isDevelopment = subjectSlug === "desenvolvimento-anos-iniciais-escolares";
  const isTexts = subjectSlug === "producao-interpretacao-textos";
  const sections = isTexts ? textsCourseSections : isDevelopment ? developmentCourseSections : neuroCourseSections;
  const quizId = isTexts ? "producao-interpretacao-textos-treino-textual" : "desenvolvimento-anos-iniciais-escolares-treino-textual";

  if (isTexts) {
    return <TextsStudyPage subjectDescription={subject.description} subjectName={subject.name} />;
  }

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link className="font-semibold text-[#aa0000]" href="/disciplinas">
              Cursos
            </Link>
            <span>›</span>
            <span>{isTexts ? "Textos" : isDevelopment ? "Desenvolvimento" : "Anatomia"}</span>
            <span>›</span>
            <span className="text-slate-700">{isTexts || isDevelopment ? subject.name : "Neuroanatomia"}</span>
          </div>
          <div className="flex items-center gap-5">
            <button className="inline-flex items-center gap-1 text-sm text-slate-700" type="button">
              Filtro <i aria-hidden="true" className="fi fi-br-angle-small-down text-xs leading-none" />
            </button>
            <input
              className="w-44 rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-500"
              placeholder="Busca..."
              type="search"
            />
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[230px_1fr] lg:px-12">
        <aside className="h-fit lg:sticky lg:top-8">
          <nav className="space-y-2 pl-7 text-[16px] leading-6 text-slate-700">
            {sections.map((section) => (
              <Link className={`block hover:text-sky-600 ${section.id === (isDevelopment ? "unidade-1" : "cerebro") ? "text-sky-600" : ""}`} href={"href" in section && typeof section.href === "string" ? section.href : `#${section.id}`} key={section.id}>
                {section.title}
              </Link>
            ))}
          </nav>
        </aside>

        <div>
          <h1 className="mb-8 text-3xl font-normal tracking-tight text-[#aa0000]">{subject.name}</h1>
          {!isDevelopment && !isTexts ? (
            <section className="mb-8 border border-red-200 bg-red-50 p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-[#aa0000]">Revisão para prova</p>
              <h2 className="mt-2 text-2xl font-normal tracking-tight text-slate-950">Simulado de Neuroanatomofisiologia</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">
                Acesse a página de revisão com aulas por tema, simulado completo com 25 questões e gabarito comentado.
              </p>
              <Link
                className="mt-5 inline-flex rounded-sm bg-[#aa0000] px-5 py-3 text-xs font-bold uppercase text-white hover:bg-[#8b0000]"
                href="/disciplinas/neuroanatomofisiologia/simulado"
              >
                Abrir simulado
              </Link>
            </section>
          ) : null}
          <div className="space-y-8">
            {sections.map((section) => (
              isDevelopment || isTexts ? <CourseCard key={section.id} quizId={quizId} section={section} topicOnlyAvailable /> : <NeuroCourseCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function PsychologyStudyPage({ subjectName }: { subjectName: string }) {
  const html = readFileSync(path.join(process.cwd(), "aux", "introducao-psicologia.html"), "utf8");

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-white/10 bg-[#12283d] px-5 py-7 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2c477]">Introdução à Psicologia · N2</p>
              <h1 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">Suas videoaulas de estudo</h1>
            </div>
            <Link className="rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2c477]" href="/disciplinas">← Disciplinas</Link>
          </div>
          <nav aria-label="Videoaulas de Psicologia" className="grid gap-3 md:grid-cols-2">
            <Link className="group flex items-center gap-4 rounded-2xl border border-[#f2c477]/30 bg-[#f2c477]/10 p-5 transition-colors hover:border-[#f2c477]/60 hover:bg-[#f2c477]/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2c477]" href="/disciplinas/introducao-psicologia-historia-fundamentos/estudo-dirigido-prova">
              <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f2c477] text-sm text-[#12283d]">▶</span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#f2c477]">Revisão para a prova</p>
                <h2 className="mt-1 text-base font-semibold text-white">Estudo dirigido explicado</h2>
                <p className="mt-1 text-xs leading-5 text-slate-300">7 questões · Respostas-modelo · Guia em PDF</p>
              </div>
              <span aria-hidden="true" className="text-xl text-[#f2c477] transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 transition-colors hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2c477]" href="/disciplinas/introducao-psicologia-historia-fundamentos/videoaula-n2">
              <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm text-slate-200">▶</span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Aula completa</p>
                <h2 className="mt-1 text-base font-semibold text-white">História e áreas da Psicologia</h2>
                <p className="mt-1 text-xs leading-5 text-slate-300">24 capítulos · Cenas animadas · Narração em português</p>
              </div>
              <span aria-hidden="true" className="text-xl text-slate-300 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </nav>
        </div>
      </header>
      <iframe
        className="h-screen w-full border-0 bg-white"
        sandbox="allow-scripts allow-top-navigation-by-user-activation"
        srcDoc={html}
        title={subjectName}
      />
    </main>
  );
}
