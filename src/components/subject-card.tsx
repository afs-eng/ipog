import Link from "next/link";
import type { Subject } from "@/lib/study-data";
import { ProgressBar } from "@/components/progress-bar";

type SubjectCardProps = {
  subject: Subject;
};

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className={`h-2 bg-gradient-to-r ${subject.accent}`} />
      <div className="space-y-6 p-6">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
            Disciplina
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
            {subject.name}
          </h3>
          <p className="leading-7 text-slate-600">{subject.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-100 p-4">
            <p className="text-slate-500">Questões</p>
            <p className="text-2xl font-semibold text-slate-950">{subject.questionCount}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-4">
            <p className="text-slate-500">Acerto</p>
            <p className="text-2xl font-semibold text-slate-950">{subject.accuracy}%</p>
          </div>
        </div>
        <ProgressBar value={subject.progress} label="Progresso" />
        <Link
          className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition group-hover:bg-sky-700"
          href={`/disciplinas/${subject.slug}`}
        >
          Abrir disciplina
        </Link>
      </div>
    </article>
  );
}
