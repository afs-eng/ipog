import Link from "next/link";
import styles from "./psychology-video-lesson.module.css";

export function PsychologyVideoLesson() {
  return <main className={styles.page}>
    <nav aria-label="Navegação da videoaula" className={styles.header}>
      <Link href="/disciplinas/introducao-psicologia-historia-fundamentos">← Voltar à disciplina</Link>
      <a href="/psicologia/modelo-videoaula/index.html" target="_blank" rel="noopener noreferrer">Abrir aula em outra aba ↗</a>
    </nav>
    <iframe
      className={styles.lesson}
      src="/psicologia/modelo-videoaula/index.html"
      title="Videoaula de Psicologia: professora e cenas animadas em 24 capítulos"
      allow="fullscreen"
    />
  </main>;
}
