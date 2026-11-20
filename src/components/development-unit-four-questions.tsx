"use client";

import { useRef, useState } from "react";
import { classroomCases, scoreCases, unitFourSources, type ClassroomCase } from "@/lib/development-unit-four";
import styles from "./development-unit-four.module.css";

export function UnitFourQuestions() {
  const [round, setRound] = useState<ClassroomCase[]>(classroomCases);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const item = round[index];
  const confirmed = Object.hasOwn(answers, item.id);
  const source = unitFourSources[item.author === "Vygotsky" ? "vygotsky" : "wallon"];

  function focusHeading() {
    requestAnimationFrame(() => questionHeading.current?.focus());
  }

  function restart(items: ClassroomCase[]) {
    setRound(items);
    setAnswers({});
    setIndex(0);
    setSelected(null);
    setFinished(false);
    focusHeading();
  }

  function next() {
    if (index === round.length - 1) setFinished(true);
    else {
      setIndex(index + 1);
      setSelected(null);
    }
    focusHeading();
  }

  if (finished) {
    const mistakes = round.filter((question) => answers[question.id] !== question.correct);
    return <div className={styles.result}>
      <h3 ref={questionHeading} tabIndex={-1}><em>{scoreCases(round, answers)}</em> / {round.length} acertos</h3>
      <p>{mistakes.length ? "Há ideias para revisitar. Volte aos comentários e tente novamente." : "Você conectou os conceitos às situações propostas."}</p>
      <div className={styles.resultActions}>
        {mistakes.length > 0 && <button className={styles.action} onClick={() => restart(mistakes)} type="button">Refazer os erros ({mistakes.length}) ↗</button>}
        <button className={styles.textButton} onClick={() => restart(classroomCases)} type="button">Recomeçar os 12 casos ↻</button>
      </div>
      <details>
        <summary>Revisar respostas e explicações</summary>
        {round.map((question) => <div className={styles.reviewAnswer} key={question.id}>
          <h4>{answers[question.id] === question.correct ? "✓" : "↺"} {question.title}</h4>
          <p>Sua resposta: {question.options[answers[question.id]]}</p>
          <p>Resposta correta: {question.options[question.correct]}</p>
          <p>{question.explanation}</p>
          <p className={styles.questionSource}>Base: {unitFourSources[question.author === "Vygotsky" ? "vygotsky" : "wallon"]}</p>
        </div>)}
      </details>
    </div>;
  }

  return <div className={styles.caseLayout}>
    <div className={styles.caseSituation}>
      <p className={styles.eyebrow}>QUESTÃO {String(index + 1).padStart(2, "0")} / {round.length} · {item.author}</p>
      <h3 ref={questionHeading} tabIndex={-1}>{item.title}</h3>
      <p>{item.situation}</p>
      <progress aria-label="Questões respondidas" max={round.length} value={Object.keys(answers).length} />
      <p className={styles.questionSource}>Base: {item.author === "Vygotsky" ? "PDF de Psicologia Histórico-Cultural · 14/10/2026" : "PDF de Desenvolvimento Cognitivo segundo Henri Wallon · 11/11/2026"}</p>
    </div>
    <div className={styles.caseDecision}>
      <fieldset disabled={confirmed}>
        <legend>{item.question}</legend>
        {item.options.map((option, n) => <label className={styles.option} data-correct={confirmed && n === item.correct} data-selected={selected === n} key={option}>
          <input checked={selected === n} name={`decision-${item.id}`} onChange={() => setSelected(n)} type="radio" value={n} />
          <span aria-hidden="true" className={styles.optionLetter}>{String.fromCharCode(65 + n)}</span>
          <span>{option}{confirmed && n === item.correct && <strong>Resposta correta</strong>}</span>
        </label>)}
      </fieldset>
      <div aria-live="polite">
        {confirmed && <div className={styles.feedback}>
          <strong>{answers[item.id] === item.correct ? "✓ Seu olhar faz sentido." : "Vamos olhar de novo."}</strong>
          <p>{item.explanation}</p>
          <p className={styles.questionSource}>{source}</p>
        </div>}
      </div>
      {confirmed ? <button className={styles.action} onClick={next} type="button">{index === round.length - 1 ? "Ver resultado ↗" : "Próxima pergunta →"}</button> : <button className={styles.action} disabled={selected === null} onClick={() => { if (selected !== null) setAnswers({ ...answers, [item.id]: selected }); }} type="button">Confirmar resposta ↗</button>}
      <p className={styles.sessionNote}>Após confirmar, a resposta fica bloqueada. Recarregar a página reinicia o quiz.</p>
    </div>
  </div>;
}
