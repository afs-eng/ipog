"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { unitFourQuizHref, unitFourSources, wallonStages } from "@/lib/development-unit-four";
import { unitFourScenes, type UnitFourSceneId } from "@/lib/development-unit-four-scenes";
import { UnitFourQuestions } from "./development-unit-four-questions";
import styles from "./development-unit-four.module.css";

export function DevelopmentUnitFour() {
  const viewport = useRef<HTMLDivElement>(null);
  const indexDialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [replay, setReplay] = useState<Record<string, number>>({});

  useEffect(() => {
    const root = viewport.current;
    if (!root) return;
    let frame = 0;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-index]"));
    function update() {
      if (!root) return;
      const bounds = root.getBoundingClientRect();
      const readingLine = bounds.top + Math.min(180, bounds.height * 0.3);
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= readingLine && rect.bottom > readingLine;
      });
      if (current) setActive(Number(current.dataset.index));
    }
    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }
    root.addEventListener("scroll", schedule, { passive: true });
    const observer = new ResizeObserver(schedule);
    sections.forEach((section) => observer.observe(section));
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("scroll", schedule);
      observer.disconnect();
    };
  }, []);

  function goTo(index: number) {
    const scene = unitFourScenes[index];
    if (!scene) return;
    indexDialog.current?.close();
    const target = document.getElementById(scene.id);
    target?.scrollIntoView({ block: "start" });
    target?.focus({ preventScroll: true });
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (indexDialog.current?.open || (event.target instanceof HTMLElement && event.target.closest("button, a, input, select, textarea, summary"))) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active + (event.key === "ArrowRight" ? 1 : -1));
    }
  }

  return <main className={styles.experience} onKeyDown={onKeyDown}>
    <header className={styles.topbar}>
      <Link className={styles.back} href="/disciplinas/desenvolvimento-anos-iniciais-escolares#unidade-4"><span aria-hidden="true">↖</span> Disciplina</Link>
      <p className={styles.identity}>DESENVOLVIMENTO HUMANO <span>/ UNIDADE 04</span></p>
      <button className={styles.indexButton} onClick={() => indexDialog.current?.showModal()} type="button"><span aria-hidden="true">☷</span> Índice</button>
    </header>

    <div className={styles.viewport} ref={viewport}>
      {unitFourScenes.map((scene, index) => <section aria-labelledby={`${scene.id}-title`} className={`${styles.scene} ${index === 0 ? styles.cover : ""}`} data-active={active === index} data-index={index} id={scene.id} key={scene.id} tabIndex={-1}>
        <div className={styles.sceneContent}>
          <div className={styles.sceneHeading}>
            <p className={styles.eyebrow}>{scene.chapter}<span>{String(index + 1).padStart(2, "0")}</span></p>
            {index === 0 ? <h1 id={`${scene.id}-title`}>Ninguém se desenvolve <em>sozinho.</em></h1> : <h2 id={`${scene.id}-title`}>{scene.title}</h2>}
            <p className={styles.subtitle}>{scene.subtitle}</p>
          </div>
          <div className={styles.stage} key={`${scene.id}-${replay[scene.id] ?? 0}`}>
            <SceneContent id={scene.id} onStart={() => goTo(1)} onPractice={() => goTo(12)} />
          </div>
          {index > 0 && index < 12 && <div className={styles.sceneNote}><span>EXPLORE A IDEIA</span><button aria-label={`Repetir animação: ${scene.title}`} onClick={() => setReplay((value) => ({ ...value, [scene.id]: (value[scene.id] ?? 0) + 1 }))} type="button">↻ Repetir cena</button></div>}
        </div>
      </section>)}
    </div>

    <footer className={styles.transport}>
      <div className={styles.progressTrack}><div style={{ width: `${((active + 1) / unitFourScenes.length) * 100}%` }} /></div>
      <span aria-live="polite" className={styles.position}>{String(active + 1).padStart(2, "0")} <span>/ {unitFourScenes.length}</span></span>
      <span className={styles.currentChapter}>{unitFourScenes[active].chapter}</span>
      <div className={styles.arrows}><button aria-label="Cena anterior" disabled={active === 0} onClick={() => goTo(active - 1)} type="button">←</button><button aria-label="Próxima cena" disabled={active === unitFourScenes.length - 1} onClick={() => goTo(active + 1)} type="button">→</button></div>
    </footer>

    <dialog aria-labelledby="unit-four-index-title" className={styles.indexDialog} ref={indexDialog}>
      <div className={styles.dialogHeading}><h2 id="unit-four-index-title">O percurso</h2><button aria-label="Fechar índice" onClick={() => indexDialog.current?.close()} type="button">✕</button></div>
      <nav aria-label="Cenas da unidade">{unitFourScenes.map((scene, index) => <button aria-current={active === index ? "step" : undefined} key={scene.id} onClick={() => goTo(index)} type="button"><span>{String(index + 1).padStart(2, "0")}</span><span><small>{scene.chapter}</small>{scene.title}</span><span aria-hidden="true">↗</span></button>)}</nav>
    </dialog>
  </main>;
}

function Person({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${small ? 0.72 : 1})`} fill="currentColor"><circle cy="-80" r="23" /><path d="M-43 7v-40q0-28 43-28t43 28V7H22v55H3V10h-6v52h-19V7Z" /></g>;
}

function SceneContent({ id, onStart, onPractice }: { id: UnitFourSceneId; onStart: () => void; onPractice: () => void }) {
  switch (id) {
    case "abertura": return <>
      <svg aria-label="Duas pessoas conectadas por palavras, experiências e relações" className={styles.coverArt} role="img" viewBox="0 0 960 260">
        <path className={styles.draw} d="M220 180Q480-80 740 180" fill="none" stroke="currentColor" strokeDasharray="5 12" />
        <g className={styles.orange}><Person x={205} y={150} /></g><g className={styles.amber}><Person x={755} y={173} small /></g>
        {["cultura", "linguagem", "afeto"].map((word, index) => <g className={styles.appear} key={word} style={{ animationDelay: `${index * 0.3}s` }}><circle cx={365 + index * 120} cy={86 - (index === 1 ? 25 : 0)} fill="#100e0b" r="49" stroke="currentColor" strokeOpacity=".3" /><text x={365 + index * 120} y={91 - (index === 1 ? 25 : 0)}>{word}</text></g>)}
        <line stroke="currentColor" strokeOpacity=".15" x1="100" x2="860" y1="239" y2="239" />
      </svg>
      <div className={styles.coverActions}><button className={styles.action} onClick={onStart} type="button">Entrar na aula <span aria-hidden="true">↗</span></button><span>14 cenas · explore no seu ritmo<br />Role a página ou use ← →</span></div>
    </>;
    case "mediacao": return <Mediation />;
    case "instrumentos-e-signos": return <Tools />;
    case "internalizacao": return <Internalization />;
    case "linguagem": return <Speech />;
    case "significado-e-sentido": return <Meaning />;
    case "zdp": return <ProximalZone />;
    case "conceitos": return <Concepts />;
    case "pessoa-completa": return <WholePerson />;
    case "emocao": return <Emotion />;
    case "estagios": return <Stages />;
    case "desenvolvimento": return <Development />;
    case "pratica": return <UnitFourQuestions />;
    case "referencias": return <div className={styles.references}>
      <div className={styles.takeaways}><p><span>VYGOTSKY</span>A mediação abre possibilidades.</p><p><span>WALLON</span>O desenvolvimento é da pessoa inteira.</p></div>
      <div className={styles.resultActions}><Link className={styles.action} href={unitFourQuizHref}>Abrir o quiz de perguntas ↗</Link><button className={styles.textButton} onClick={onPractice} type="button">Voltar à prática da aula</button></div>
      <details><summary>Fontes e créditos</summary><p>{unitFourSources.vygotsky}</p><p>{unitFourSources.wallon}</p><p>Conteúdo e situações didáticas elaborados a partir dos dois materiais. Direção visual inspirada na aula digital da professora; ilustrações e interações próprias.</p><a href="https://etienemacedo.com.br/aulas/anos-iniciais-e-escolares/2026-10-14-psicologia-historico-cultural/" rel="noreferrer" target="_blank">Visitar a aula de referência ↗</a></details>
    </div>;
  }
}

function Mediation() {
  const [mediated, setMediated] = useState(false);
  return <>
    <svg aria-label={mediated ? "Uma lista escrita medeia a relação entre a criança e a tarefa" : "A criança tenta lembrar a tarefa sem apoio externo"} className={styles.diagram} role="img" viewBox="0 0 960 300">
      <g className={styles.orange}><Person x={150} y={170} small /></g>
      <path className={styles.draw} d={mediated ? "M230 170Q480-90 730 170" : "M230 170H730"} fill="none" stroke="currentColor" strokeDasharray="7 10" strokeOpacity=".5" />
      {mediated && <g className={styles.appear}><rect fill="#17120e" height="110" rx="8" stroke="#ff904d" width="140" x="410" y="25" /><text className={styles.orange} x="480" y="60">LISTA</text>{[0, 1, 2].map((n) => <path d={`M438 ${80 + n * 16}h14m12 0h48`} key={n} stroke="#ff904d" strokeWidth="3" />)}</g>}
      <g transform="translate(805 165)" stroke="#ffc766" strokeWidth="3"><path d="M-45 40V-40h90v80ZM-22-17H23M-22 0H23M-22 17H10" fill="none" /></g>
      <text x="150" y="280">criança</text><text x="805" y="280">tarefa</text>
    </svg>
    <div className={styles.interaction}><button aria-pressed={mediated} className={styles.action} onClick={() => setMediated(!mediated)} type="button">{mediated ? "Retirar a lista −" : "Adicionar um signo +"}</button><p aria-live="polite">{mediated ? "A escrita apoia a memória: a criança consulta as etapas e organiza sua ação." : "Como lembrar todas as etapas? Experimente acrescentar um recurso cultural."}</p></div>
  </>;
}

function Tools() {
  const [tool, setTool] = useState<"instrument" | "sign">("instrument");
  return <>
    <div className={styles.switches} role="group" aria-label="Compare as funções"><button aria-pressed={tool === "instrument"} onClick={() => setTool("instrument")} type="button">01 / Instrumento</button><button aria-pressed={tool === "sign"} onClick={() => setTool("sign")} type="button">02 / Signo</button></div>
    <div aria-live="polite" className={styles.comparison} key={tool}>
      <svg aria-label={tool === "instrument" ? "Uma pá transforma a terra" : "Uma tabela organiza os dias de rega"} className={styles.diagram} role="img" viewBox="0 0 600 240">
        {tool === "instrument" ? <><g className={styles.appear} stroke="#ff904d" strokeWidth="8" transform="rotate(30 300 120)"><path d="M300 30v130" /><path d="M270 150h60v30q-30 50-60 0Z" fill="#ff904d" /><path d="M280 30V12h40v18Z" fill="none" /></g><path d="M100 225Q200 190 270 220T500 220" fill="none" stroke="#ffc766" strokeWidth="3" /></> : <g className={styles.appear}><rect fill="none" height="175" rx="6" stroke="#ff904d" strokeWidth="3" width="280" x="160" y="30" /><text x="300" y="70">DIAS DE REGA</text>{["SEG", "QUA", "SEX"].map((day, n) => <g key={day}><text x={205 + n * 95} y="115">{day}</text><path className={styles.draw} d={`M${193 + n * 95} 152l10 10 20-25`} fill="none" stroke="#ffc766" strokeWidth="4" /></g>)}</g>}
      </svg>
      <div><span className={styles.eyebrow}>{tool === "instrument" ? "AÇÃO SOBRE O OBJETO" : "ORGANIZAÇÃO PSICOLÓGICA"}</span><h3>{tool === "instrument" ? "A pá transforma a terra." : "A tabela ajuda a lembrar."}</h3><p>{tool === "instrument" ? "O instrumento material amplia a ação sobre o mundo exterior." : "Os signos da escrita apoiam a memória e o planejamento da atividade."}</p></div>
    </div>
  </>;
}

function Internalization() {
  const [step, setStep] = useState(0);
  const labels = ["Com o outro", "Com apoio externo", "Organizando por dentro"];
  return <>
    <svg aria-label={labels[step]} className={styles.diagram} role="img" viewBox="0 0 960 290">
      <g opacity={step === 0 ? 1 : 0.15} className={styles.orange}><Person x={220} y={180} /></g>
      <g className={styles.amber}><Person x={710} y={200} small /></g>
      <path className={styles.draw} d={step === 2 ? "M710 100C860 0 860 230 750 150" : "M300 110Q470 20 650 110"} fill="none" stroke="#ff904d" strokeDasharray="6 8" strokeWidth="2" />
      <g className={styles.appear} key={step}><rect fill="#16110c" height="64" rx="32" stroke="#ff904d" width="310" x={step === 2 ? 545 : 325} y="20" /><text x={step === 2 ? 700 : 480} y="59">{["“Primeiro, separe as peças.”", "“Primeiro, eu separo…”", "Planejamento mental"][step]}</text></g>
      <text x="220" y="278">{step === 0 ? "orientação compartilhada" : "apoio que se transforma"}</text><text x="710" y="278">{step === 2 ? "reconstrução interna" : "ação da criança"}</text>
    </svg>
    <div className={styles.steps} aria-label="Momentos da internalização">{labels.map((label, n) => <button aria-pressed={step === n} key={label} onClick={() => setStep(n)} type="button"><span>0{n + 1}</span>{label}</button>)}</div>
    <p aria-live="polite" className={styles.caption}>{["A orientação acontece na relação entre adulto e criança.", "A criança usa a orientação e a própria fala para organizar a tarefa.", "A organização da ação pode ocorrer mentalmente. A relação social é reconstruída, não apenas transportada para dentro."][step]}</p>
  </>;
}

function Speech() {
  const [step, setStep] = useState(0);
  const phases = ["Social", "Egocêntrica", "Interior"];
  return <>
    <div className={styles.speechScene}>
      <span className={styles.largeNumber}>0{step + 1}</span>
      <div aria-live="polite" className={styles.speechText}><span className={styles.eyebrow}>FALA {phases[step].toUpperCase()}</span><p key={step} className={styles.appear}>{["“Você me ajuda a montar?”", "“Esta peça primeiro. Agora, a outra.”", "Planejar sem precisar dizer em voz alta."][step]}</p><small>{["Comunicar e participar da relação com o outro.", "Falar consigo para orientar o próprio comportamento.", "A linguagem passa a operar internamente na organização do pensamento."][step]}</small></div>
    </div>
    <div className={styles.steps} aria-label="Fases da fala">{phases.map((phase, n) => <button aria-pressed={step === n} key={phase} onClick={() => setStep(n)} type="button"><span>0{n + 1}</span>{phase}</button>)}</div>
  </>;
}

function Meaning() {
  const [person, setPerson] = useState(0);
  return <div className={styles.meaning}>
    <div className={styles.word}>escola<span>UM SIGNIFICADO COMPARTILHADO</span><p>Instituição social de educação e ensino.</p></div>
    <div className={styles.meaningLine} aria-hidden="true" />
    <div className={styles.personalMeaning}><div className={styles.switches} role="group" aria-label="Experiências com a palavra escola"><button aria-pressed={person === 0} onClick={() => setPerson(0)} type="button">Uma criança</button><button aria-pressed={person === 1} onClick={() => setPerson(1)} type="button">Outra criança</button></div><p aria-live="polite" key={person} className={styles.appear}>{person === 0 ? "“É onde encontro meus amigos.”" : "“Lembro do medo que senti no primeiro dia.”"}</p><span className={styles.eyebrow}>SENTIDO / VIVÊNCIA E CONTEXTO</span></div>
  </div>;
}

function ProximalZone() {
  const [help, setHelp] = useState(false);
  return <>
    <div className={styles.zones}>
      <div><span>JÁ FAZ SOZINHA</span><strong>Adições simples</strong><small>Nível real</small></div>
      <div className={styles.proximal} data-help={help}><span>COM MEDIAÇÃO</span><strong>Problemas com duas etapas</strong><small>Nível potencial</small>{help && <p className={styles.appear}>“O que você precisa descobrir primeiro?”</p>}</div>
      <div><span>AINDA NÃO RESOLVE</span><strong>Além das possibilidades atuais</strong><small>Mesmo com essa ajuda</small></div>
    </div>
    <div className={styles.interaction}><button aria-pressed={help} className={styles.action} onClick={() => setHelp(!help)} type="button">{help ? "Observar sem a ajuda −" : "Oferecer uma pergunta orientadora +"}</button><p aria-live="polite">{help ? "A ZDP é a distância entre o nível real e o potencial. Mediar não é fazer pela criança." : "A zona de desenvolvimento proximal envolve funções em desenvolvimento, não só tarefas já dominadas."}</p></div>
    <p className={styles.caption}>No faz de conta, assumir papéis e agir segundo suas regras também pode criar uma ZDP.</p>
  </>;
}

function Concepts() {
  const [scientific, setScientific] = useState(false);
  return <>
    <div className={styles.concepts}>
      <svg aria-label="Gelo transformando-se em água" role="img" viewBox="0 0 400 230"><path className={styles.draw} d="M70 190Q200 140 330 190Q200 230 70 190Z" fill="#ff904d20" stroke="#ff904d" strokeWidth="2" /><g className={styles.appear} fill="#ffc76615" stroke="#ffc766" strokeWidth="3"><path d="m140 50 75-20 50 40-75 20Zm0 0v90l50 40V90m0 90 75-20V70" /></g></svg>
      <div aria-live="polite"><span className={styles.eyebrow}>{scientific ? "CONCEITO CIENTÍFICO" : "EXPERIÊNCIA COTIDIANA"}</span><h3>{scientific ? "Fusão." : "“O gelo derrete.”"}</h3><p>{scientific ? "Passagem do estado sólido para o líquido. O ensino organiza e relaciona o que foi observado." : "A criança conhece o fenômeno pelas situações vividas, antes de ter uma explicação sistematizada."}</p><button className={styles.textButton} onClick={() => setScientific(!scientific)} type="button">{scientific ? "← Retomar a experiência" : "Construir uma explicação →"}</button></div>
    </div>
  </>;
}

function WholePerson() {
  const [dimension, setDimension] = useState(0);
  const dimensions = ["Motor", "Afetivo", "Cognitivo"];
  return <>
    <div className={styles.whole}>
      <svg aria-label="Os conjuntos motor, afetivo e cognitivo se sobrepõem na pessoa" role="img" viewBox="0 0 520 340">
        {[{ x: 200, y: 140 }, { x: 320, y: 140 }, { x: 260, y: 235 }].map((point, n) => <circle className={styles.appear} cx={point.x} cy={point.y} fill={dimension === n ? "#ff904d24" : "#ff904d08"} key={n} r="95" stroke={dimension === n ? "#ff904d" : "#ffffff35"} strokeWidth="2" style={{ animationDelay: `${n * 0.2}s` }} />)}
        <text x="165" y="118">motor</text><text x="355" y="118">afetivo</text><text x="260" y="289">cognitivo</text><g className={styles.amber}><Person x={260} y={192} small /></g>
      </svg>
      <div><span className={styles.eyebrow}>UM JOGO DE CONSTRUÇÃO</span><h3 aria-live="polite">{["Movimenta os blocos.", "Lida com a frustração.", "Planeja uma ponte."][dimension]}</h3><p>É a mesma criança, na mesma experiência. Toque em uma dimensão para mudar o foco, não para separar a pessoa.</p><div className={styles.switches} role="group" aria-label="Conjuntos funcionais">{dimensions.map((label, n) => <button aria-pressed={dimension === n} key={label} onClick={() => setDimension(n)} type="button">{label}</button>)}</div></div>
    </div>
  </>;
}

function Emotion() {
  const [calm, setCalm] = useState(false);
  return <>
    <div className={styles.emotion} data-calm={calm}>
      <div aria-hidden="true" className={styles.emotionRings}><i /><i /><i /><svg viewBox="0 0 200 200"><g className={styles.orange}><Person x={100} y={115} small /></g></svg></div>
      <div aria-live="polite"><span className={styles.eyebrow}>{calm ? "ACOLHER → REGULAR → DIALOGAR" : "UMA CRIANÇA APÓS UM CONFLITO"}</span><h3>{calm ? "Agora podemos conversar." : "O choro ocupa a cena."}</h3><p>{calm ? "Com maior calma, o adulto pode escutar, ajudar a compreender o ocorrido e mediar a reparação." : "Exigir explicações imediatas pode não funcionar quando o arrebatamento emocional dificulta a reflexão."}</p><button className={styles.action} onClick={() => setCalm(!calm)} type="button">{calm ? "↻ Retomar a situação" : "Acolher e ajudar a regular →"}</button></div>
    </div>
    <p className={styles.caption}>Afetividade não é apenas carinho: inclui ser afetado de maneira agradável ou desagradável, envolvendo emoção, sentimento e paixão.</p>
  </>;
}

function Stages() {
  const [index, setIndex] = useState(0);
  const stage = wallonStages[index];
  return <>
    <div className={styles.stageRail} aria-label="Estágios de Wallon">{wallonStages.map((item, n) => <button aria-pressed={index === n} key={item.name} onClick={() => setIndex(n)} type="button"><span className={styles.railDot} /><strong>{item.age}</strong><small>{item.name}</small></button>)}</div>
    <div aria-live="polite" className={styles.stageDetail} key={index}><span className={styles.stageAge}>{String(index + 1).padStart(2, "0")}</span><div className={styles.appear}><p className={styles.eyebrow}>{stage.focus}</p><h3>{stage.name}</h3><p>{stage.description}</p><p className={styles.practiceNote}><strong>Na prática</strong> {stage.practice}</p></div></div>
    <p className={styles.caption}>Idades aproximadas, não critérios de diagnóstico. Predominância não significa exclusividade: as dimensões permanecem integradas.</p>
  </>;
}

function Development() {
  return <>
    <svg aria-label="Trajetória de desenvolvimento com avanços, conflitos e reorganizações, em vez de uma linha reta" className={styles.diagram} role="img" viewBox="0 0 960 300">
      <path d="M65 250 895 45" fill="none" stroke="#ffffff20" strokeDasharray="5 10" /><text fill="#ffffff80" x="760" y="45">não é uma reta</text>
      <path className={styles.draw} d="M65 250C210 250 130 90 285 120S330 275 470 175 520 30 665 100 760 210 895 80" fill="none" stroke="#ff904d" strokeWidth="4" />
      {[{ x: 285, y: 120, label: "novo contexto" }, { x: 470, y: 175, label: "conflito" }, { x: 665, y: 100, label: "reorganização" }].map((point, n) => <g className={styles.appear} key={point.label} style={{ animationDelay: `${n * 0.5 + 0.5}s` }}><circle cx={point.x} cy={point.y} fill="#ffc766" r="7" /><text x={point.x} y={point.y + 42}>{point.label}</text></g>)}
    </svg>
    <p className={styles.statement}>Mudar de escola pode exigir novas formas de participar do grupo. <em>Oscilar não significa perder definitivamente as capacidades.</em></p>
    <p className={styles.caption}>Traçado ilustrativo, não uma curva de medição. Observe a história da criança e as condições do meio.</p>
  </>;
}
