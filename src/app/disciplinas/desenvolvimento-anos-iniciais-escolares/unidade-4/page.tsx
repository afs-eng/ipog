import type { Metadata } from "next";
import Link from "next/link";
import { DevelopmentUnitFour } from "@/components/development-unit-four";
import { unitFourSources } from "@/lib/development-unit-four";

export const metadata: Metadata = {
  title: "Unidade 4 — Vygotsky e Wallon | IPOG Quiz",
  description: "Atividades interativas sobre mediação, linguagem, afetividade e desenvolvimento: revisão, associação de conceitos e casos de sala de aula.",
};

export default function UnitFourPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5 sm:px-10">
          <Link className="text-sm font-semibold text-[#aa0000] hover:underline" href="/disciplinas/desenvolvimento-anos-iniciais-escolares#unidade-4">← Voltar para a disciplina</Link>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10 sm:py-12">
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
          <div aria-hidden="true" className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-300">Unidade 4 · Laboratório de aprendizagem</p>
          <h1 className="relative mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Aprender com o outro.<br /><span className="text-rose-300">Desenvolver por inteiro.</span></h1>
          <p className="mt-5 max-w-2xl leading-7 text-slate-300">Vygotsky e Wallon na prática: explore ideias, conecte conceitos e tome decisões em situações de sala de aula.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-200">
            {["2 materiais de base", "4 formas de estudar", "Feedback explicado", "No seu ritmo"].map((text) => <span className="rounded-full border border-white/20 px-3 py-2" key={text}>{text}</span>)}
          </div>
        </section>
        <DevelopmentUnitFour />
        <footer className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-xs leading-6 text-slate-600">
          <h2 className="text-sm font-semibold text-slate-900">Materiais de referência</h2>
          <p className="mt-2">{unitFourSources.vygotsky}</p><p>{unitFourSources.wallon}</p>
          <p className="mt-2">Sínteses e situações didáticas elaboradas a partir dos dois materiais da disciplina. As idades dos estágios são referências aproximadas, não critérios de diagnóstico.</p>
        </footer>
      </div>
    </main>
  );
}
