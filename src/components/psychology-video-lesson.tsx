"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { psychologyChapters, psychologyN2Sources } from "@/lib/psychology-n2";
import videos from "@/lib/psychology-video-manifest.json";
import styles from "./psychology-video-lesson.module.css";

function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

export function PsychologyVideoLesson() {
  const player = useRef<HTMLVideoElement>(null);
  const resumeOnLoad = useRef(false);
  const [index, setIndex] = useState(0);
  const [scene, setScene] = useState(0);
  const [continuous, setContinuous] = useState(true);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");
  const chapter = psychologyChapters[index];
  const video = videos[index];
  const totalDuration = videos.reduce((sum, item) => sum + item.duration, 0);

  function selectChapter(next: number, autoplay = player.current?.paused === false) {
    if (next < 0 || next >= videos.length) return;
    setError("");
    setFinished(false);
    if (next === index && player.current) {
      player.current.currentTime = 0;
      if (autoplay) void player.current.play().catch(() => setError("Toque em reproduzir no vídeo para continuar."));
      return;
    }
    player.current?.pause();
    resumeOnLoad.current = autoplay;
    setScene(0);
    setIndex(next);
  }

  function finishChapter() {
    if (continuous && index < videos.length - 1) selectChapter(index + 1, true);
    else if (index === videos.length - 1) setFinished(true);
  }

  return <main className={styles.page}>
    <header className={styles.header}>
      <Link href="/disciplinas/introducao-psicologia-historia-fundamentos">← Disciplina</Link>
      <span>INTRODUÇÃO À PSICOLOGIA</span>
      <a href="#capitulos">Ver capítulos ↓</a>
    </header>

    <section aria-labelledby="lesson-title" className={styles.cinema}>
      <div className={styles.titleRow}>
        <div><p className={styles.kicker}>UMA AULA PARA ASSISTIR E ENTENDER</p><h1 id="lesson-title">A Psicologia em movimento.</h1></div>
        <p>{videos.length} capítulos · {Math.ceil(totalDuration / 60)} min<br /><span>História do Brasil e áreas de atuação</span></p>
      </div>

      <div className={styles.screen}>
        <video
          aria-label={`Videoaula: ${chapter.title}`}
          controls
          key={video.id}
          onEnded={finishChapter}
          onError={() => setError("Não foi possível carregar este vídeo. Verifique sua conexão e tente novamente ou abra o arquivo pelo link abaixo.")}
          onLoadedMetadata={() => {
            if (resumeOnLoad.current) {
              resumeOnLoad.current = false;
              void player.current?.play().catch(() => setError("Toque em reproduzir no vídeo para continuar."));
            }
          }}
          onTimeUpdate={(event) => {
            const time = event.currentTarget.currentTime;
            setScene(time >= video.sceneStarts[2] ? 2 : time >= video.sceneStarts[1] ? 1 : 0);
          }}
          playsInline
          poster={video.poster}
          preload="metadata"
          ref={player}
          src={video.src}
        >
          <track kind="captions" label="Português" src={video.captions} srcLang="pt-BR" />
          Seu navegador não suporta vídeo HTML5. <a href={video.src}>Abra o vídeo MP4</a>.
        </video>
      </div>

      <div className={styles.nowPlaying}>
        <div><p className={styles.kicker}>CAPÍTULO {String(index + 1).padStart(2, "0")} / {videos.length} · {chapter.block}</p><h2>{chapter.title}</h2><p className={styles.sceneLabel}>{chapter.beats[scene].label} <span>· {clock(video.duration)}</span></p></div>
        <div className={styles.navigation}>
          <button aria-label="Capítulo anterior" disabled={index === 0} onClick={() => selectChapter(index - 1)} type="button">←</button>
          <button aria-label="Próximo capítulo" disabled={index === videos.length - 1} onClick={() => selectChapter(index + 1)} type="button">→</button>
        </div>
      </div>

      <div className={styles.playbackNote}>
        <label><input checked={continuous} onChange={(event) => setContinuous(event.target.checked)} type="checkbox" /> Continuar para o próximo capítulo automaticamente</label>
        <span>Áudio pronto em português · legendas CC · tela cheia no player</span>
      </div>
      {error && <p className={styles.message} role="alert">{error} <a href={video.src}>Abrir vídeo MP4 ↗</a></p>}
      {finished && <div className={styles.message} role="status"><strong>Você chegou ao fim da aula.</strong> Reveja qualquer capítulo no índice, no seu ritmo. <button onClick={() => selectChapter(0, true)} type="button">Assistir novamente ↻</button></div>}
    </section>

    <section aria-labelledby="chapters-heading" className={styles.chapters} id="capitulos">
      <div className={styles.sectionHeading}><div><p className={styles.kicker}>ESCOLHA ONDE CONTINUAR</p><h2 id="chapters-heading">O percurso da aula</h2></div><p>Sem perguntas ou interrupções.<br />Só o conteúdo, explicado por etapas.</p></div>
      <div className={styles.chapterGrid}>{psychologyChapters.map((item, chapterIndex) => <button aria-current={index === chapterIndex ? "step" : undefined} className={styles.chapter} key={item.id} onClick={() => {
        selectChapter(chapterIndex, true);
        player.current?.scrollIntoView({ behavior: "instant", block: "center" });
      }} type="button"><span className={styles.number}>{String(chapterIndex + 1).padStart(2, "0")}</span><div><small>{item.block} · {clock(videos[chapterIndex].duration)}</small><strong>{item.title}</strong></div><span aria-hidden="true" className={styles.chapterPlay}>{index === chapterIndex ? "●" : "▶"}</span></button>)}</div>
    </section>

    <section className={styles.reading} aria-label="Texto e referências">
      <details className={styles.transcript} key={chapter.id}><summary>Ler a explicação do capítulo {index + 1}</summary><div>{chapter.beats.map((beat, beatIndex) => <article key={beat.label}><button onClick={() => { if (player.current) { player.current.currentTime = video.sceneStarts[beatIndex]; setScene(beatIndex); player.current.scrollIntoView({ behavior: "instant", block: "center" }); } }} type="button">{clock(video.sceneStarts[beatIndex])} · {beat.label} ↗</button><p>{beat.narration}</p></article>)}<p className={styles.note}>Base: {psychologyN2Sources[chapter.source].file}, páginas {chapter.pages.join("–")} do PDF.</p></div></details>
      <details className={styles.sources}><summary>Sobre esta produção e os materiais utilizados</summary><div><p>Aula animada produzida a partir dos dois PDFs da disciplina. As ilustrações são representações didáticas, não reconstituições documentais. A narração é uma voz sintética em português brasileiro (Francisca), gerada previamente; não é a voz da professora e não depende da síntese de voz do seu navegador.</p><p>{psychologyN2Sources.history.credit}</p><p>{psychologyN2Sources.areas.credit}</p><p>Os dados do CensoPsi e os recortes normativos refletem o material de 2022, não uma atualização de todas as especialidades. Use os controles do vídeo para pausar as animações a qualquer momento. Nenhuma mídia começa a tocar antes da sua interação.</p></div></details>
    </section>
    <footer className={styles.footer}>HISTÓRIA, CONTEXTO E PRÁTICA · INTRODUÇÃO À PSICOLOGIA</footer>
  </main>;
}
