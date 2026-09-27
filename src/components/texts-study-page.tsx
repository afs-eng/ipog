"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { textsUnits } from "@/lib/texts-units";

type TextsStudyPageProps = {
  subjectName: string;
  subjectDescription: string;
};

const writingActivities: Record<string, { prompt: string; model: string; trap: string }> = {
  "producao-interpretacao-textos-linguagem": {
    prompt: "Escreva duas frases distinguindo o que foi dito literalmente de uma interpretação possível, sem transformar hipótese em certeza.",
    model: "O entrevistado afirmou que não conseguiu responder naquele momento. Uma interpretação possível é que a pergunta gerou desconforto, mas isso precisa ser confirmado por outros elementos do contexto.",
    trap: "Tomar a primeira impressão como sentido definitivo.",
  },
  "producao-interpretacao-textos-discurso": {
    prompt: "Descreva um silêncio ou hesitação como observação clínica, evitando diagnóstico ou causa não demonstrada.",
    model: "Houve pausa antes da resposta sobre a perda familiar. O registro descreve a interrupção do relato sem concluir, apenas por esse dado, que havia resistência ou trauma reprimido.",
    trap: "Tratar o não dito como prova automática de uma hipótese.",
  },
  "producao-interpretacao-textos-redacao": {
    prompt: "Formule uma tese e dois argumentos para um texto sobre a importância da escuta cuidadosa na formação em Psicologia.",
    model: "A escuta cuidadosa é essencial na formação em Psicologia porque reduz inferências apressadas e melhora a qualidade do registro clínico. Além disso, ajuda o estudante a diferenciar observação, hipótese e interpretação.",
    trap: "Usar repertório ou citação sem explicar sua relação com a tese.",
  },
  "producao-interpretacao-textos-revisao": {
    prompt: "Reescreva uma frase vaga de registro clínico tornando-a mais precisa e observável.",
    model: "Em vez de 'o paciente sempre fica muito mal', escreva: 'o paciente relatou insônia em três noites da última semana e associou o episódio a preocupações acadêmicas'.",
    trap: "Usar generalizações como sempre, nunca e todo mundo sem delimitação.",
  },
};

export function TextsStudyPage({ subjectName, subjectDescription }: TextsStudyPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [showModel, setShowModel] = useState(false);

  const unit = textsUnits[activeIndex];
  const questions = unit.testTextQuestions ?? [];
  const question = questions[questionIndex];
  const activity = writingActivities[unit.slug];
  const correctAnswer = question?.correctAnswer ?? question?.correctAnswers?.[0];
  const isCorrect = selectedOption === correctAnswer;
  const answeredProgress = questions.length ? ((questionIndex + (selectedOption ? 1 : 0)) / questions.length) * 100 : 0;

  function changeUnit(index: number) {
    setActiveIndex(index);
    setQuestionIndex(0);
    setSelectedOption(null);
    setShowModel(false);
  }

  function nextQuestion() {
    setQuestionIndex((index) => (index === questions.length - 1 ? 0 : index + 1));
    setSelectedOption(null);
  }

  return (
    <main className="min-h-screen bg-[#fff7f7] text-slate-900">
      <header className="bg-[#7f0000] text-white">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center gap-4 px-6 sm:px-10 lg:px-12">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-rose-100 text-lg font-black text-[#7f0000]">T</div>
          <div>
            <p className="font-bold tracking-tight">Estudo de Textos</p>
            <p className="text-sm text-rose-100">Revisão para a prova</p>
          </div>
          <p className="ml-auto hidden text-sm text-rose-100 sm:block">Leia, identifique, pratique</p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-9 sm:px-10 lg:px-12">
        <Link className="text-sm font-semibold text-[#aa0000]" href="/disciplinas">
          Voltar para disciplinas
        </Link>
        <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-[#aa0000]">Produção e interpretação</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Estude uma aula por vez.
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          {subjectDescription} Escolha um tema, acompanhe a explicação, revise os slides únicos e pratique no seu ritmo.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 sm:px-10 lg:grid-cols-[260px_1fr] lg:px-12">
        <aside className="h-fit lg:sticky lg:top-6">
          <h2 className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-slate-500">Temas</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Temas de estudo">
            {textsUnits.map((item, index) => (
              <button
                aria-controls="study-panel"
                aria-selected={index === activeIndex}
                className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition ${index === activeIndex ? "border-[#aa0000] bg-red-50 shadow-red-950/10" : "border-red-100 hover:border-[#aa0000]/50"}`}
                id={`tab-${item.slug}`}
                key={item.slug}
                onClick={() => changeUnit(index)}
                role="tab"
                type="button"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#aa0000]">{String(index + 1).padStart(2, "0")} / Tema</span>
                <strong className="mt-1 block leading-snug text-slate-900">{item.title}</strong>
                <span className="mt-2 block text-xs text-slate-500">{item.testTextQuestions?.length ?? 0} questões</span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">As respostas aparecem após sua escolha. Fotos repetidas dos slides foram unificadas.</p>
        </aside>

        <article aria-labelledby={`tab-${unit.slug}`} className="overflow-hidden rounded-[28px] border border-red-100 bg-white shadow-xl shadow-red-950/5" id="study-panel" role="tabpanel">
          <div className="border-b border-red-100 bg-gradient-to-br from-red-50 to-white p-6 sm:p-8">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#aa0000]">Tema {activeIndex + 1} de {textsUnits.length}</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{unit.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">{unit.videoDescription}</p>
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <section>
              <span className="text-xs font-black uppercase tracking-[0.14em] text-[#aa0000]">Aula {activeIndex + 1} · leitura guiada</span>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">O que você vai aprender</h3>
              <div className="mt-4 grid gap-3">
                {unit.objectives.map((objective, index) => (
                  <div className="border-l-4 border-[#aa0000] bg-red-50/60 px-5 py-4" key={objective}>
                    <h4 className="font-semibold text-slate-900">{index + 1}. {objective}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Revise este ponto no resumo e confira sua compreensão nas questões do tema.</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-rose-50 p-5">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-[#aa0000]">Vamos resolver juntos</span>
              <p className="mt-3 leading-7 text-slate-700">{unit.videoText[0]}</p>
              <p className="mt-3 rounded-xl bg-white p-4 text-sm text-slate-700"><strong>Erro comum:</strong> {activity.trap}</p>
            </section>

            <section>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-[#aa0000]">Slides da aula</span>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">Material visual revisado</h3>
                </div>
                <span className="text-sm text-slate-500">{unit.atlasItems.length} slide{unit.atlasItems.length === 1 ? "" : "s"} único{unit.atlasItems.length === 1 ? "" : "s"}</span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {unit.atlasItems.map((slide) => (
                  <figure className="overflow-hidden rounded-2xl border border-red-100 bg-white" key={slide.title}>
                    <div className="relative aspect-video bg-red-50">
                      <Image alt={slide.title} className="object-contain" fill sizes="(max-width: 768px) 100vw, 420px" src={slide.imageUrl} />
                    </div>
                    <figcaption className="border-t border-red-100 p-4">
                      <strong className="text-slate-900">{slide.title}</strong>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{slide.description}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-red-100 bg-[#fffafa] p-5">
              <h3 className="text-xl font-semibold text-slate-950">Aplique em dois minutos</h3>
              <p className="mt-2 leading-7 text-slate-600">{activity.prompt}</p>
              <textarea
                aria-label="Sua resposta para a atividade de escrita"
                className="mt-4 min-h-32 w-full rounded-xl border border-red-100 bg-white p-4 outline-none transition focus:border-[#aa0000]"
                onChange={(event) => setDrafts((current) => ({ ...current, [unit.slug]: event.target.value }))}
                placeholder="Escreva sua resposta aqui..."
                value={drafts[unit.slug] ?? ""}
              />
              <button className="mt-3 rounded-full border border-[#aa0000] px-5 py-2 text-sm font-bold text-[#aa0000] hover:bg-red-50" onClick={() => setShowModel((value) => !value)} type="button">
                {showModel ? "Ocultar resposta possível" : "Ver uma resposta possível"}
              </button>
              {showModel ? <p className="mt-3 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700"><strong>Uma resposta possível:</strong> {activity.model}</p> : null}
            </section>

            {question ? (
              <section className="rounded-2xl border border-red-100 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-semibold text-slate-950">Pratique agora</h3>
                  <span className="text-sm font-semibold text-[#aa0000]">Questão {questionIndex + 1} de {questions.length}</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-red-50">
                  <div className="h-full rounded-full bg-[#aa0000]" style={{ width: `${answeredProgress}%` }} />
                </div>
                <p className="mt-5 text-lg font-semibold leading-8 text-slate-900">{question.prompt}</p>
                <div className="mt-4 grid gap-3">
                  {question.options.map((option) => {
                    const isSelected = selectedOption === option;
                    const isAnswer = option === correctAnswer;
                    const checkedClass = selectedOption
                      ? isAnswer
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : isSelected
                          ? "border-[#aa0000] bg-red-50 text-[#7f0000]"
                          : "border-red-100 bg-white text-slate-700"
                      : "border-red-100 bg-white text-slate-800 hover:border-[#aa0000]";

                    return (
                      <button className={`rounded-xl border p-4 text-left transition ${checkedClass}`} disabled={Boolean(selectedOption)} key={option} onClick={() => setSelectedOption(option)} type="button">
                        {option}
                      </button>
                    );
                  })}
                </div>
                {selectedOption ? (
                  <div className={`mt-4 rounded-xl p-4 ${isCorrect ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-[#7f0000]"}`}>
                    <p className="font-bold">{isCorrect ? "Correto" : "Incorreto"}</p>
                    <p className="mt-1 text-sm leading-6">{question.explanation}</p>
                    <button className="mt-3 rounded-full bg-[#aa0000] px-5 py-2 text-sm font-bold text-white hover:bg-[#8b0000]" onClick={nextQuestion} type="button">
                      Próxima questão
                    </button>
                  </div>
                ) : null}
              </section>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-red-100 pt-6 sm:flex-row">
              <Link className="rounded-full bg-[#aa0000] px-6 py-3 text-center text-sm font-bold uppercase text-white hover:bg-[#8b0000]" href={`/quiz/producao-interpretacao-textos-treino-textual/teste?material=${unit.slug}&topic=${unit.slug}&perguntas=${Math.min(10, questions.length)}`}>
                Fazer treino completo
              </Link>
              <Link className="rounded-full border border-[#aa0000] px-6 py-3 text-center text-sm font-bold uppercase text-[#aa0000] hover:bg-red-50" href="/quiz/producao-interpretacao-textos-simulado-misto/simulado?perguntas=36">
                Simulado 36 questões
              </Link>
            </div>
          </div>
        </article>
      </section>

      <footer className="border-t border-red-100 bg-white py-6">
        <div className="mx-auto max-w-6xl px-6 text-sm leading-6 text-slate-500 sm:px-10 lg:px-12">
          {subjectName}: conteúdo organizado a partir das aulas, questões revisadas e slides fotografados. Materiais repetidos foram unificados.
        </div>
      </footer>
    </main>
  );
}
