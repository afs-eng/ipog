"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { drawJungTopics, jungTopics, type JungAssignment } from "@/lib/jung-draw";

export function JungDraw() {
  const [names, setNames] = useState(["", "", "", ""]);
  const [result, setResult] = useState<{ assignments: JungAssignment[]; date: string } | null>(null);
  const [error, setError] = useState("");

  function draw(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const assignments = drawJungTopics(names);
      setResult({ assignments, date: new Date().toLocaleString("pt-BR") });
      setError("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível realizar o sorteio. Tente novamente.");
    }
  }

  return (
    <main className="min-h-screen bg-[#101827] px-5 py-8 text-white print:min-h-0 print:bg-white print:p-0 print:text-black">
      <div className="mx-auto max-w-4xl">
        <Link className="text-sm font-semibold text-sky-200 hover:underline print:hidden" href="/disciplinas/producao-interpretacao-textos">
          Voltar para Produção e Interpretação de Textos
        </Link>
        <header className="mb-8 mt-8 print:mt-0">
          <p className="text-sm font-bold uppercase tracking-widest text-sky-300 print:text-black">Sorteio do seminário</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Jung e a Interpretação dos Sonhos</h1>
          <p className="mt-3 text-slate-300 print:text-black">4 participantes · Capítulos 7, 8 e 9 · James A. Hall</p>
        </header>

        <form className="mb-8 rounded-2xl border border-white/10 bg-[#1C293D] p-5 sm:p-7 print:hidden" onSubmit={draw}>
          <h2 className="text-xl font-semibold">Digite os nomes dos quatro alunos</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {names.map((name, index) => (
              <div key={index}>
                <label className="mb-2 block text-sm text-slate-300" htmlFor={`jung-student-${index}`}>Aluno {index + 1}</label>
                <input
                  className="w-full rounded-lg border border-slate-500 bg-[#101827] px-3 py-3 text-white outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-300"
                  id={`jung-student-${index}`}
                  maxLength={120}
                  onChange={(event) => {
                    setNames(names.map((value, i) => i === index ? event.target.value : value));
                    setError("");
                  }}
                  required
                  type="text"
                  value={name}
                />
              </div>
            ))}
          </div>
          {error ? <p className="mt-4 text-sm text-red-200" role="alert">{error}</p> : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-lg bg-sky-300 px-5 py-3 font-bold text-slate-950 hover:bg-sky-200" type="submit">
              {result ? "Realizar novo sorteio" : "Realizar sorteio"}
            </button>
            <button className="rounded-lg bg-slate-600 px-5 py-3 font-semibold hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-40" disabled={!result} onClick={() => window.print()} type="button">
              Imprimir / salvar em PDF
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-300">Para gerar o PDF, escolha “Salvar como PDF” na janela de impressão do navegador. Um novo sorteio substitui o resultado anterior.</p>
        </form>

        <section aria-live="polite" aria-atomic="true">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-sky-300 print:text-black">Resultado do sorteio</h2>
          {result ? (
            <>
              <p className="mb-4 text-sm text-slate-300 print:text-black">Sorteado em: {result.date}</p>
              <div className="grid gap-3">
                {result.assignments.map(({ name, topic }, index) => (
                  <article className="break-inside-avoid rounded-xl border border-white/10 bg-[#1C293D] p-5 print:border-slate-300 print:bg-white" key={index}>
                    <h3 className="break-words text-lg font-bold">{name}</h3>
                    <p className="mt-2 text-sky-200 print:text-black">{topic.chapter} · {topic.title}</p>
                    <p className="mt-1 text-sm text-slate-300 print:text-black">Páginas {topic.pages}</p>
                  </article>
                ))}
              </div>
            </>
          ) : <p className="rounded-xl bg-[#1C293D] p-6 text-slate-300">Os resultados aparecerão aqui após o sorteio.</p>}
        </section>

        <p className="mt-6 text-sm leading-6 text-slate-300 print:text-black">Cada aluno recebe um tema. O capítulo 8 foi dividido em duas partes, conforme o roteiro do seminário.</p>
        {!result ? (
          <section className="mt-8 border-t border-white/10 pt-6 print:hidden">
            <h2 className="font-semibold">Temas do seminário</h2>
            <ul className="mt-3 space-y-3 text-sm text-slate-300">
              {jungTopics.map((topic) => <li key={topic.chapter}>{topic.chapter} · {topic.title} · páginas {topic.pages}</li>)}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
