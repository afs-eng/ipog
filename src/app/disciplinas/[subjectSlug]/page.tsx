import Link from "next/link";
import { notFound } from "next/navigation";
import { NeuroCourseCard } from "@/components/neuro-course-card";
import { neuroCourseSections } from "@/lib/neuro-course";
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

  if (subjectSlug !== "neuroanatomofisiologia") {
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

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link className="font-semibold text-[#aa0000]" href="/disciplinas">
              Cursos
            </Link>
            <span>›</span>
            <span>Anatomia</span>
            <span>›</span>
            <span className="text-slate-700">Neuroanatomia</span>
          </div>
          <div className="flex items-center gap-5">
            <button className="text-sm text-slate-700" type="button">
              Filtro⌄
            </button>
            <input
              className="w-44 rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-500"
              placeholder="Busca..."
              type="search"
            />
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[190px_1fr] lg:px-12">
        <aside className="h-fit lg:sticky lg:top-8">
          <nav className="space-y-3 text-[15px] leading-5 text-slate-700">
            {neuroCourseSections.map((section) => (
              <a className="block hover:text-[#aa0000]" href={`#${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <div>
          <h1 className="mb-8 text-3xl font-normal tracking-tight text-[#aa0000]">Neuroanatomia</h1>
          <div className="space-y-8">
            {neuroCourseSections.map((section) => (
              <NeuroCourseCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
