import Link from "next/link";
import styles from "./psychology-video-lesson.module.css";

type PsychologyVideoLessonProps = {
  src?: string;
  title?: string;
  guideHref?: string;
};

export function PsychologyVideoLesson({
  src = "/psicologia/modelo-videoaula/index.html",
  title = "Videoaula de Psicologia: professora e cenas animadas em 24 capítulos",
  guideHref,
}: PsychologyVideoLessonProps = {}) {
  return <main className={styles.page}>
    <nav aria-label="Navegação da videoaula" className={styles.header}>
      <Link href="/disciplinas/introducao-psicologia-historia-fundamentos">← Voltar à disciplina</Link>
      {guideHref ? <a href={guideHref} target="_blank" rel="noopener noreferrer">Guia de estudo em PDF ↗</a> : null}
      <a href={src} target="_blank" rel="noopener noreferrer">Abrir aula em outra aba ↗</a>
    </nav>
    <iframe
      className={styles.lesson}
      src={src}
      title={title}
      allow="fullscreen"
    />
  </main>;
}
