"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { directedQuestions, estimatedChapterSeconds, narrationSegments, psychologyChapters, psychologyN2Sources } from "@/lib/psychology-n2";
import styles from "./psychology-video-lesson.module.css";

export function PsychologyVideoLesson() {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [beatIndex, setBeatIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [silent, setSilent] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState("");
  const [rate, setRate] = useState(1);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const chapter = psychologyChapters[chapterIndex];
  const beat = chapter.beats[beatIndex];
  const segments = narrationSegments(beat.narration);
  const sentence = segments[sentenceIndex] ?? segments[0];
  const totalSeconds = psychologyChapters.reduce((sum, item) => sum + estimatedChapterSeconds(item), 0);

  useEffect(() => {
    const available = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    const load = () => setVoices(window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith("pt")));
    const frame = requestAnimationFrame(() => { setSupported(available); if (available) load(); });
    if (!available) return () => cancelAnimationFrame(frame);
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => { cancelAnimationFrame(frame); window.speechSynthesis.removeEventListener("voiceschanged", load); };
  }, []);

  useEffect(() => {
    if (!playing) return;
    function advance() {
      if (sentenceIndex + 1 < segments.length) setSentenceIndex(sentenceIndex + 1);
      else if (beatIndex < 2) { setBeatIndex(beatIndex + 1); setSentenceIndex(0); }
      else if (chapterIndex + 1 < psychologyChapters.length) { setChapterIndex(chapterIndex + 1); setBeatIndex(0); setSentenceIndex(0); }
      else { setPlaying(false); setComplete(true); }
    }
    if (silent) {
      const timer = window.setTimeout(advance, Math.max(2200, sentence.split(/\s+/).length / (145 * rate) * 60000));
      return () => window.clearTimeout(timer);
    }
    if (!supported) return;
    let disposed = false;
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = "pt-BR";
    utterance.rate = rate;
    utterance.voice = voices.find((voice) => voice.name === voiceName) ?? voices.find((voice) => voice.lang === "pt-BR") ?? voices[0] ?? null;
    utterance.onend = () => { if (!disposed) advance(); };
    utterance.onerror = (event) => {
      if (!disposed && event.error !== "canceled" && event.error !== "interrupted") {
        setError("Não foi possível reproduzir a voz. Escolha outra voz ou use o modo sem áudio.");
        setPlaying(false);
      }
    };
    // A short delay separates cancel() from speak(), including React Strict Mode replays.
    const timer = window.setTimeout(() => window.speechSynthesis.speak(utterance), 100);
    return () => { disposed = true; window.clearTimeout(timer); window.speechSynthesis.cancel(); };
  }, [playing, silent, supported, sentence, sentenceIndex, segments.length, chapterIndex, beatIndex, rate, voices, voiceName]);

  function seek(index: number, part = 0) {
    setChapterIndex(index); setBeatIndex(part); setSentenceIndex(0); setComplete(false); setError("");
  }

  return <main className={styles.page}>
    <header className={styles.header}><Link href="/disciplinas/introducao-psicologia-historia-fundamentos">← Voltar à disciplina</Link><span>INTRODUÇÃO À PSICOLOGIA · N2</span><a href="#estudo-dirigido" onClick={() => setPlaying(false)}>Praticar respostas ↗</a></header>
    <div className={styles.intro}><p className={styles.kicker}>ASSISTA ÀS IDEIAS GANHAREM FORMA</p><h1>Uma profissão.<br /><em>Muitas histórias e possibilidades.</em></h1><p>Uma aula em cenas sobre a história da Psicologia no Brasil e suas áreas de atuação, orientada pelo seu estudo dirigido.</p><div className={styles.tags}><span>12 capítulos</span><span>≈ {Math.ceil(totalSeconds / 60)} min de narração</span><span>7 questões dissertativas</span></div></div>
    <div className={styles.layout}>
      <section aria-label="Aula narrada" className={styles.player}>
        <div className={styles.scene} data-playing={playing}>
          <div className={styles.sceneTop}><span>{chapter.block}</span><span>{String(chapterIndex + 1).padStart(2, "0")} / 12</span></div>
          <h2>{chapter.title}</h2>
          <div aria-label={`Diagrama: ${chapter.nodes.join("; ")}`} className={styles.diagram} data-visual={chapter.visual}>
            <div className={styles.connector} aria-hidden="true" />
            {chapter.nodes.map((node, index) => <div className={styles.node} data-active={index === beatIndex} data-past={index < beatIndex} key={node}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><strong>{node}</strong>{chapter.visual === "bars" && <div className={styles.bar} style={{ width: `${[100, 27.5, 26][index]}%` }} />}</div>)}
          </div>
          <div className={styles.idea} key={`${chapter.id}-${beatIndex}`}><span>IDEIA PARA LEVAR</span><p>{beat.takeaway}</p></div>
          <p className={styles.caption}><span>LEGENDA · {beat.label}</span>{sentence}</p>
        </div>
        <div className={styles.controls}>
          <div className={styles.transport}><button aria-label="Capítulo anterior" disabled={chapterIndex === 0} onClick={() => seek(chapterIndex - 1)} type="button">←</button><button className={styles.primary} disabled={supported === null || (!supported && !silent)} onClick={() => { setError(""); if (complete) seek(0); setPlaying(!playing); }} type="button">{playing ? "Pausar" : complete ? "Assistir novamente" : "Reproduzir aula"}</button><button aria-label="Próximo capítulo" disabled={chapterIndex === 11} onClick={() => seek(chapterIndex + 1)} type="button">→</button><span>{beatIndex + 1}/3 cenas</span></div>
          <div className={styles.settings}><label>Velocidade <select value={rate} onChange={(event) => setRate(Number(event.target.value))}><option value={0.85}>0,85×</option><option value={1}>1×</option><option value={1.2}>1,2×</option><option value={1.5}>1,5×</option></select></label><label>Voz <select disabled={!supported || silent} value={voiceName} onChange={(event) => setVoiceName(event.target.value)}><option value="">Português automático</option>{voices.map((voice) => <option key={voice.voiceURI} value={voice.name}>{voice.name} ({voice.lang})</option>)}</select></label><label className={styles.check}><input type="checkbox" checked={silent} onChange={(event) => { setSilent(event.target.checked); setError(""); }} /> Sem áudio</label></div>
          <p className={styles.note}>Narração sintetizada pelo navegador, não gravada pela professora. A disponibilidade e a qualidade da voz em português dependem do dispositivo. Ao pausar, a frase atual recomeça na retomada. A aula avança automaticamente; você também pode navegar manualmente.</p>
          {supported === false && <p role="status">Seu navegador não oferece narração. Ative “Sem áudio” para acompanhar as cenas e legendas.</p>}
          {error && <p role="alert">{error}</p>}
          {complete && <p role="status">Aula concluída. Agora, <a href="#estudo-dirigido">pratique as respostas do estudo dirigido</a>.</p>}
        </div>
        <div className={styles.transcript}><h3>Texto completo deste capítulo</h3><p className={styles.note}>Leia no seu ritmo ou selecione uma cena para ouvi-la. O texto permanece disponível sem áudio.</p>{chapter.beats.map((part, index) => <div key={part.label} className={styles.paragraph} data-current={beatIndex === index}><button aria-pressed={beatIndex === index} onClick={() => seek(chapterIndex, index)} type="button">{index + 1}. {part.label} ↗</button><p>{part.narration}</p></div>)}<p className={styles.note}>Base: {psychologyN2Sources[chapter.source].file}, páginas {chapter.pages.join("–")} do PDF. Questões relacionadas: {chapter.questions.join(", ")}.</p></div>
      </section>
      <nav aria-label="Capítulos da aula" className={styles.chapters}><p className={styles.kicker}>SEU PERCURSO</p>{psychologyChapters.map((item, index) => <button aria-current={chapterIndex === index ? "step" : undefined} onClick={() => seek(index)} key={item.id} type="button"><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.block} · ≈ {Math.ceil(estimatedChapterSeconds(item) / 60)} min · Q{item.questions.join(", Q")}</small></div></button>)}</nav>
    </div>
    <DirectedPractice onReview={(id) => { const index = psychologyChapters.findIndex((item) => item.id === id); if (index >= 0) { seek(index); setPlaying(false); window.scrollTo({ top: 0, behavior: "instant" }); } }} />
    <footer className={styles.sources}><h2>Materiais e limites da aula</h2><p>{psychologyN2Sources.history.credit}</p><p>{psychologyN2Sources.areas.credit}</p><p>Roteiro didático e exemplos elaborados a partir dos dois PDFs locais e do arquivo Estudo_Dirigido_Introducao_Psicologia_N2_Noturno.docx. As páginas indicadas são as páginas do PDF. Dados profissionais e recortes normativos refletem os materiais, não uma atualização de todas as especialidades. As animações são esquemas explicativos, não imagens históricas.</p></footer>
  </main>;
}

function DirectedPractice({ onReview }: { onReview: (id: string) => void }) {
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem("psychology-n2-drafts") ?? "{}");
      if (saved && typeof saved === "object" && !Array.isArray(saved)) setDrafts(Object.fromEntries(Object.entries(saved).filter(([key, value]) => directedQuestions.some((item) => String(item.number) === key) && typeof value === "string")));
    } catch { setStorageError(true); }
    setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  function updateDraft(number: number, value: string) {
    const updated = { ...drafts, [number]: value };
    setDrafts(updated);
    try { localStorage.setItem("psychology-n2-drafts", JSON.stringify(updated)); } catch { setStorageError(true); }
  }
  return <section className={styles.practice} id="estudo-dirigido"><p className={styles.kicker}>DA AULA PARA O SEU ARGUMENTO</p><h2>Agora, explique com suas palavras.</h2><p>Treine aqui e depois reescreva à mão, em parágrafos, como pede o documento. Defina os conceitos antes de relacioná-los e fundamente sua resposta nos autores. A numeração original não inclui a questão 6.</p><p className={styles.note}>{storageError ? "Não foi possível salvar os rascunhos neste navegador. Copie suas respostas antes de sair." : "Rascunhos salvos apenas neste navegador. Não há envio nem correção automática; os critérios são para autoavaliação."}</p>
      {directedQuestions.map((item) => <article className={styles.question} key={item.number}><span className={styles.kicker}>QUESTÃO {item.number}</span><h3>{item.prompt}</h3><label htmlFor={`answer-${item.number}`}>Seu rascunho</label><textarea disabled={!ready} id={`answer-${item.number}`} rows={6} placeholder="Defina, contextualize, relacione e exemplifique…" value={drafts[item.number] ?? ""} onChange={(event) => updateDraft(item.number, event.target.value)} /><details><summary>Conferir critérios e exemplo de resposta</summary><fieldset><legend>Minha resposta contempla estes pontos?</legend>{item.criteria.map((criterion) => <label className={styles.criterion} key={criterion}><input type="checkbox" />{criterion}</label>)}</fieldset><h4>Exemplo de argumentação — não é um gabarito oficial</h4>{item.model.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className={styles.note}>{item.source}</p></details><div className={styles.reviewLinks}>{item.chapterIds.map((id) => <button onClick={() => onReview(id)} key={id} type="button">Revisar: {psychologyChapters.find((chapter) => chapter.id === id)?.title} ↗</button>)}</div></article>)}
    </section>;
}
