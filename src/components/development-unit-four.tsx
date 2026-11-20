"use client";

import { useState } from "react";
import { associations, associationOptions, classroomCases, reviewCards, scoreCases, wallonStages, type ClassroomCase } from "@/lib/development-unit-four";

const primary = "rounded-xl bg-[#aa0000] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8b0000] disabled:cursor-not-allowed disabled:opacity-40";
const secondary = "rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold hover:bg-slate-50";
const modes = ["Cartões de revisão", "Conecte os conceitos", "Percurso de Wallon", "Casos de sala de aula"];

export function DevelopmentUnitFour() {
  const [mode, setMode] = useState(0);
  return <div className="mt-8">
    <nav aria-label="Atividades da unidade" className="grid gap-3 sm:grid-cols-2">
      {modes.map((label, index) => <button aria-pressed={mode === index} className={`rounded-2xl border p-4 text-left text-sm font-semibold ${mode === index ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white hover:border-rose-400"}`} key={label} onClick={() => setMode(index)} type="button"><span className="mr-3 text-rose-400">0{index + 1}</span>{label}</button>)}
    </nav>
    <section aria-label={modes[mode]} className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div hidden={mode !== 0}><Review /></div>
      <div hidden={mode !== 1}><Connections /></div>
      <div hidden={mode !== 2}><Timeline /></div>
      <div hidden={mode !== 3}><Cases /></div>
    </section>
    <p className="mt-4 text-xs text-slate-500">As respostas ficam disponíveis enquanto esta página estiver aberta. Recarregar reinicia as atividades.</p>
  </div>;
}

function Review() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [seen, setSeen] = useState<number[]>([]);
  const card = reviewCards[index];
  function move(direction: number) {
    setIndex((index + direction + reviewCards.length) % reviewCards.length);
    setRevealed(false);
  }
  return <>
    <h2 className="text-2xl font-semibold">Pense antes de revelar</h2>
    <p className="mt-2 text-sm leading-6 text-slate-600">Tente explicar com suas palavras. Depois, compare com a síntese e o exemplo.</p>
    <p className="mt-5 text-xs font-semibold text-[#aa0000]">Cartão {index + 1} de {reviewCards.length} · {seen.length} revisados</p>
    <article className="mt-4 rounded-2xl bg-rose-50 p-6" aria-live="polite">
      <p className="text-xs font-bold uppercase tracking-widest text-[#aa0000]">{card.author}</p>
      <h3 className="mt-3 text-xl font-semibold">{card.term}</h3>
      <p className="mt-4 text-lg leading-8">{card.question}</p>
      <button aria-expanded={revealed} className={`${primary} mt-6`} onClick={() => { setRevealed(!revealed); setSeen((previous) => previous.includes(index) ? previous : [...previous, index]); }} type="button">{revealed ? "Ocultar explicação" : "Revelar explicação"}</button>
      {revealed && <div className="mt-6 border-t border-rose-200 pt-5 leading-7"><p>{card.answer}</p><p className="mt-3 text-sm"><strong>Na prática:</strong> {card.example}</p></div>}
    </article>
    <div className="mt-5 flex flex-wrap justify-between gap-3"><button className={secondary} onClick={() => move(-1)} type="button">← Anterior</button><button className={secondary} onClick={() => move(1)} type="button">Próximo →</button></div>
  </>;
}

function Connections() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const correct = associations.filter((item) => answers[item.id] === item.answer).length;
  return <>
    <h2 className="text-2xl font-semibold">Da situação ao conceito</h2>
    <p className="mt-2 text-sm leading-6 text-slate-600">Associe cada situação ao conceito mais adequado e confira suas conexões.</p>
    <div className="mt-6 space-y-4">
      {associations.map((item, index) => <div className="rounded-2xl border border-slate-200 p-5" key={item.id}>
        <label className="block text-sm font-medium leading-6" htmlFor={`connection-${item.id}`}>{index + 1}. {item.situation}</label>
        <select className="mt-3 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm disabled:bg-slate-100" disabled={checked} id={`connection-${item.id}`} onChange={(event) => setAnswers({ ...answers, [item.id]: event.target.value })} value={answers[item.id] ?? ""}>
          <option value="">Escolha um conceito</option>
          {associationOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
        {checked && <p className={`mt-3 text-sm leading-6 ${answers[item.id] === item.answer ? "text-emerald-800" : "text-[#aa0000]"}`}><strong>{answers[item.id] === item.answer ? "Conexão correta!" : `Resposta: ${item.answer}.`}</strong> {item.explanation}</p>}
      </div>)}
    </div>
    <div aria-live="polite" className="mt-5">
      {checked ? <><p className="mb-4 font-semibold">{correct} de {associations.length} conexões corretas.</p><button className={secondary} onClick={() => { setAnswers({}); setChecked(false); }} type="button">Tentar novamente</button></> : <button className={primary} disabled={associations.some((item) => !answers[item.id])} onClick={() => setChecked(true)} type="button">Conferir conexões ({Object.values(answers).filter(Boolean).length}/{associations.length})</button>}
    </div>
  </>;
}

function Timeline() {
  const [index, setIndex] = useState(0);
  const stage = wallonStages[index];
  return <>
    <h2 className="text-2xl font-semibold">O desenvolvimento não é uma linha reta</h2>
    <p className="mt-2 text-sm leading-6 text-slate-600">Explore os estágios e observe a alternância de predominâncias. Motor, afetivo e cognitivo permanecem integrados em todos eles.</p>
    <div aria-label="Estágios de Wallon" className="mt-6 grid gap-2 sm:grid-cols-5">
      {wallonStages.map((item, position) => <button aria-controls="stage-detail" aria-pressed={index === position} className={`rounded-xl border p-3 text-left text-xs leading-5 ${index === position ? "border-[#aa0000] bg-rose-50 text-[#aa0000]" : "border-slate-200 hover:bg-slate-50"}`} key={item.name} onClick={() => setIndex(position)} type="button"><span className="block font-bold">{item.age}</span>{item.name}</button>)}
    </div>
    <article aria-live="polite" className="mt-5 rounded-2xl bg-slate-950 p-6 text-white" id="stage-detail">
      <p className="text-xs font-semibold text-rose-300">{stage.focus}</p>
      <h3 className="mt-3 text-2xl font-semibold">{stage.name}</h3>
      <p className="mt-2 text-lg text-rose-200">“{stage.cue}”</p>
      <p className="mt-5 leading-7 text-slate-200">{stage.description}</p>
      <div className="mt-5 border-t border-white/20 pt-5"><h4 className="font-semibold">Um olhar para a prática</h4><p className="mt-2 text-sm leading-7 text-slate-200">{stage.practice}</p></div>
    </article>
    <p className="mt-4 text-xs leading-6 text-slate-600">As idades são aproximadas. O contexto e a história da pessoa importam; um comportamento isolado não permite identificar um estágio ou fazer diagnósticos.</p>
  </>;
}

function Cases() {
  const [round, setRound] = useState<ClassroomCase[]>(classroomCases);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const item = round[index];
  const confirmed = Object.hasOwn(answers, item.id);
  const answered = Object.keys(answers).length;
  function restart(items: ClassroomCase[]) {
    setRound(items);
    setAnswers({});
    setIndex(0);
    setSelected(null);
    setFinished(false);
  }
  if (finished) {
    const score = scoreCases(round, answers);
    const mistakes = round.filter((question) => answers[question.id] !== question.correct);
    return <div aria-live="polite">
      <p className="text-xs font-bold uppercase tracking-widest text-[#aa0000]">Rodada concluída</p>
      <h2 className="mt-3 text-3xl font-semibold">{score} de {round.length} acertos</h2>
      <p className="mt-3 leading-7 text-slate-600">{mistakes.length ? "Revise os comentários e pratique novamente os pontos que precisam de atenção." : "Muito bem! Você conectou os conceitos às situações propostas."}</p>
      <ul className="mt-6 space-y-3">{round.map((question) => <li className="rounded-xl bg-slate-50 p-4 text-sm leading-6" key={question.id}><p className="font-semibold">{answers[question.id] === question.correct ? "✓ Acertou" : "Revisar"} · {question.title}</p><p className="mt-1">Resposta: {question.options[question.correct]}</p><p className="mt-2 text-slate-600">{question.explanation}</p></li>)}</ul>
      <div className="mt-6 flex flex-wrap gap-3">{mistakes.length > 0 && <button className={primary} onClick={() => restart(mistakes)} type="button">Refazer apenas os erros ({mistakes.length})</button>}<button className={secondary} onClick={() => restart(classroomCases)} type="button">Recomeçar os 12 casos</button></div>
    </div>;
  }
  return <>
    <h2 className="text-2xl font-semibold">Que decisão você tomaria?</h2>
    <p className="mt-2 text-sm leading-6 text-slate-600">Escolha e confirme para ler o comentário. Após confirmar, a resposta fica bloqueada nesta rodada.</p>
    <div className="mt-5 flex justify-between text-xs font-semibold text-slate-600"><span>Caso {index + 1} de {round.length} · {item.author}</span><span>{answered}/{round.length} respondidos</span></div>
    <progress aria-label="Casos respondidos" className="mt-2 h-2 w-full accent-[#aa0000]" max={round.length} value={answered} />
    <article className="mt-5">
      <h3 className="text-xl font-semibold">{item.title}</h3>
      <p className="mt-4 rounded-2xl bg-slate-50 p-5 leading-7">{item.situation}</p>
      <fieldset className="mt-6" disabled={confirmed}>
        <legend className="mb-4 font-semibold leading-7">{item.question}</legend>
        <div className="space-y-3">{item.options.map((option, optionIndex) => <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${confirmed && optionIndex === item.correct ? "border-emerald-600 bg-emerald-50" : selected === optionIndex ? "border-[#aa0000] bg-rose-50" : "border-slate-200"}`} key={option}><input checked={selected === optionIndex} className="mt-1.5 accent-[#aa0000]" name={`case-${item.id}`} onChange={() => setSelected(optionIndex)} type="radio" value={optionIndex} /><span>{option}{confirmed && optionIndex === item.correct && <strong className="block text-emerald-800">Resposta correta</strong>}</span></label>)}</div>
      </fieldset>
      <div aria-live="polite">{confirmed && <div className={`mt-5 rounded-2xl p-5 ${answers[item.id] === item.correct ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900"}`}><p className="font-semibold">{answers[item.id] === item.correct ? "Você acertou!" : "Vamos rever esse conceito."}</p><p className="mt-2 text-sm leading-7">{item.explanation}</p></div>}</div>
      <div className="mt-6">{confirmed ? <button className={primary} onClick={() => { if (index === round.length - 1) setFinished(true); else { setIndex(index + 1); setSelected(null); } }} type="button">{index === round.length - 1 ? "Ver resultado" : "Próximo caso →"}</button> : <button className={primary} disabled={selected === null} onClick={() => { if (selected !== null) setAnswers({ ...answers, [item.id]: selected }); }} type="button">Confirmar resposta</button>}</div>
    </article>
  </>;
}
