import type { Metadata } from "next";
import Link from "next/link";
import { UnitFourQuestions } from "@/components/development-unit-four-questions";
import { classroomCases, unitFourHref, unitFourSources } from "@/lib/development-unit-four";
import styles from "@/components/development-unit-four.module.css";

export const metadata: Metadata = {
  title: "Quiz interativo — Vygotsky e Wallon | Unidade 4",
  description: "Perguntas interativas baseadas nos PDFs de Psicologia Histórico-Cultural e Henri Wallon, com correção comentada, resultado e revisão dos erros.",
};

export default function UnitFourQuizPage() {
  return <main className={`${styles.experience} ${styles.quizPage}`}>
    <header className={styles.topbar}>
      <Link className={styles.back} href="/disciplinas/desenvolvimento-anos-iniciais-escolares#unidade-4"><span aria-hidden="true">↖</span> Disciplina</Link>
      <p className={styles.identity}>UNIDADE 04 <span>/ QUIZ INTERATIVO</span></p>
      <Link className={styles.back} href={unitFourHref}>Revisar a aula ↗</Link>
    </header>
    <section aria-labelledby="quiz-title" className={`${styles.scene} ${styles.quizScene}`}>
      <div className={styles.sceneContent}>
        <div className={styles.sceneHeading}>
          <p className={styles.eyebrow}>DOS PDFs PARA A PRÁTICA</p>
          <h1 id="quiz-title">Vygotsky e Wallon.<br /><em>Qual é o seu olhar?</em></h1>
          <p className={styles.subtitle}>{classroomCases.length} perguntas baseadas nos dois materiais da disciplina. Escolha uma alternativa, confirme e veja a explicação antes de avançar.</p>
        </div>
        <div className={`${styles.stage} ${styles.quizQuestions}`}>
          <h2 className="sr-only">Perguntas do quiz</h2>
          <UnitFourQuestions />
          <details>
            <summary>PDFs utilizados nas perguntas</summary>
            <p>{unitFourSources.vygotsky}</p>
            <p>{unitFourSources.wallon}</p>
            <p>Situações didáticas elaboradas a partir dos conceitos dos materiais; não são transcrições de exercícios. As idades dos estágios são referências aproximadas, não critérios de diagnóstico.</p>
          </details>
        </div>
      </div>
    </section>
  </main>;
}
