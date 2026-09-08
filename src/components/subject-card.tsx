import Link from "next/link";
import type { Subject } from "@/lib/study-data";
import { ProgressBar } from "@/components/progress-bar";

type SubjectCardProps = {
  subject: Subject;
};

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className={`h-2 bg-gradient-to-r ${subject.accent}`} />
      <div className="flex min-h-[520px] min-w-0 flex-1 flex-col p-6">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500 [overflow-wrap:anywhere]">
            Disciplina
          </p>
          <h3 className="mt-4 min-h-[7.5rem] text-2xl font-semibold leading-tight tracking-tight text-slate-950 [hyphens:auto] [overflow-wrap:anywhere]">
            {subject.name}
          </h3>
          <p className="mt-4 min-h-[6.75rem] leading-7 text-slate-600 [overflow-wrap:anywhere]">
            {subject.description}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="min-w-0 rounded-2xl bg-slate-100 p-4">
            <p className="text-slate-500">Questões</p>
            <p className="text-2xl font-semibold text-slate-950">{subject.questionCount}</p>
          </div>
          <div className="min-w-0 rounded-2xl bg-slate-100 p-4">
            <p className="text-slate-500">Acerto</p>
            <p className="text-2xl font-semibold text-slate-950">{subject.accuracy}%</p>
          </div>
        </div>

        <div className="mt-6">
          <ProgressBar value={subject.progress} label="Progresso" />
        </div>

        <Link
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-center font-semibold text-white transition group-hover:bg-[#aa0000]"
          href={`/disciplinas/${subject.slug}`}
        >
          Abrir disciplina
        </Link>
      </div>
    </article>
  );
}
