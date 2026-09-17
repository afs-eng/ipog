"use client";

import { useState } from "react";
import type { DevelopmentMindMap } from "@/lib/development-units";

export function DevelopmentMindMap({ map }: { map: DevelopmentMindMap }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const block = map.blocks[activeIndex];
  const totalBlocks = map.blocks.length;

  function goToBlock(index: number) {
    setActiveIndex(Math.max(0, Math.min(index, totalBlocks - 1)));
  }

  return (
    <section className="mt-5" aria-labelledby="mapa-conceitual-titulo">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(170,0,0,0.08),transparent_38%)]" />
        <div className="relative flex justify-center">
          <div className="max-w-sm rounded-2xl border-2 border-[#aa0000] bg-[#aa0000] px-6 py-4 text-center text-white shadow-lg shadow-red-900/15">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-100">Ideia central</span>
            <h3 id="mapa-conceitual-titulo" className="mt-1 text-xl font-semibold leading-tight sm:text-2xl">{map.centralNode}</h3>
          </div>
        </div>
        <div className="mx-auto mt-4 h-5 w-px bg-slate-300" aria-hidden="true" />

        <div className="relative">
          <div className="absolute -top-5 left-1/2 hidden h-5 w-px bg-slate-300 sm:block" aria-hidden="true" />
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">Foco da unidade</p>
              <h4 className="mt-1 text-lg font-semibold text-amber-950">Piaget · conceitos em relação</h4>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-amber-800">10 conceitos</span>
          </div>

          {block ? (
            <div
              className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 outline-none focus-visible:ring-2 focus-visible:ring-[#aa0000] sm:p-5"
              role="group"
              aria-label={`Bloco ${activeIndex + 1} de ${totalBlocks}: ${block.title}`}
              aria-roledescription="slide"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") goToBlock(activeIndex - 1);
                if (event.key === "ArrowRight") goToBlock(activeIndex + 1);
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Bloco conceitual</p>
                  <h5 className="mt-1 text-lg font-semibold text-amber-950">{block.title}</h5>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-800">{block.relation}</span>
              </div>
              <ul className={`mt-4 grid gap-4 sm:grid-cols-2 ${block.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`} aria-label={`Conceitos do bloco ${block.title}`}>
                {block.items.map((item, itemIndex) => (
                  <li key={`${item.title}-${itemIndex}`}>
                    <article className="h-full rounded-lg border border-amber-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                      <div className="flex items-start gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800" aria-hidden="true">{itemIndex + 1}</span>
                        <div>
                          <h6 className="text-sm font-semibold leading-5 text-slate-800">{item.title}</h6>
                          <p className="mt-2 text-xs leading-5 text-slate-600">{item.explanation}</p>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3" aria-label="Controles do mapa conceitual">
            <button
              className="rounded-sm border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#aa0000] hover:text-[#aa0000] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Mostrar bloco conceitual anterior"
              disabled={activeIndex === 0}
              onClick={() => goToBlock(activeIndex - 1)}
              type="button"
            >
              ← Anterior
            </button>
            <p className="text-sm font-semibold tabular-nums text-slate-600" aria-live="polite">{activeIndex + 1} de {totalBlocks}</p>
            <button
              className="rounded-sm border border-[#aa0000] bg-white px-4 py-2 text-sm font-semibold text-[#aa0000] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Mostrar próximo bloco conceitual"
              disabled={activeIndex === totalBlocks - 1}
              onClick={() => goToBlock(activeIndex + 1)}
              type="button"
            >
              Próximo →
            </button>
          </div>
        </div>

        <div className="relative mt-4 flex items-start gap-3 rounded-xl border border-[#aa0000]/20 bg-white p-4">
          <span className="mt-0.5 rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#aa0000]">Aplicação</span>
          <p className="text-sm leading-6 text-slate-700">{map.application}</p>
        </div>
      </div>
    </section>
  );
}
