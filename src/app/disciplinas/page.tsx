import Link from "next/link";
import { SubjectCard } from "@/components/subject-card";
import { subjects } from "@/lib/study-data";

export default function SubjectsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-8 sm:px-10 lg:px-12">
      <Link className="text-sm font-semibold text-[#aa0000]" href="/">
        Voltar ao início
      </Link>
      <div className="mt-10 max-w-3xl space-y-4">
        <p className="font-semibold text-[#aa0000]">Disciplinas</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Escolha onde iniciar o estudo.
        </h1>
        <p className="text-lg leading-8 text-slate-600">
          A estrutura já permite adicionar novas disciplinas no futuro sem mudar a arquitetura da interface.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {subjects.map((subject) => (
          <SubjectCard key={subject.slug} subject={subject} />
        ))}
      </div>
    </main>
  );
}
