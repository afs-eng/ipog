import Image from "next/image";
import Link from "next/link";
import { SubjectCard } from "@/components/subject-card";
import { subjects } from "@/lib/study-data";

const highlights = [
  { value: "2", label: "aulas guiadas", detail: "com atlas, teste e resumo" },
  { value: "90+", label: "questões locais", detail: "organizadas por material" },
  { value: "100%", label: "visual", detail: "com imagens anatômicas" },
];

const studyFlow = ["Assistir", "Identificar", "Responder", "Revisar"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fff1f1] text-slate-950">
      <section className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_18%_8%,#fecaca_0,transparent_30rem),radial-gradient(circle_at_86%_14%,#fb7185_0,transparent_28rem),linear-gradient(135deg,#3b0606,#aa0000_48%,#160404)] text-white">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="absolute -left-24 top-44 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-16 bottom-20 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-7 sm:px-10 lg:px-12">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link className="group inline-flex w-fit items-center gap-3 text-lg font-semibold tracking-tight" href="/">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#aa0000] shadow-lg shadow-red-950/20 transition group-hover:scale-105">
                IQ
              </span>
              <span>IPOG Quiz</span>
            </Link>
            <nav className="flex flex-wrap gap-3 text-sm font-semibold text-white/80">
              <Link className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white hover:text-slate-950" href="/disciplinas">
                Disciplinas
              </Link>
              <Link className="rounded-full border border-rose-100/60 bg-rose-100 px-4 py-2 text-[#5c0505] shadow-lg shadow-red-950/20 transition hover:bg-white" href="/disciplinas/neuroanatomofisiologia">
                Começar agora
              </Link>
            </nav>
          </header>

          <div className="grid flex-1 gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-rose-50 shadow-2xl shadow-red-950/20 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-rose-200" />
                Estudo guiado para Neuroanatomofisiologia
              </div>

              <div className="mt-8 space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                  Aprenda anatomia com uma rotina de quiz feita para revisar de verdade.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-200">
                  Videoaulas, atlas visual, testes com imagens e simulados reunidos em um só fluxo para estudar antes da prova sem se perder entre arquivos.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="rounded-full bg-white px-7 py-4 text-center font-bold text-[#8b0000] shadow-2xl shadow-red-950/30 transition hover:-translate-y-0.5 hover:bg-rose-50"
                  href="/disciplinas/neuroanatomofisiologia"
                >
                  Abrir curso de Neuro
                </Link>
                <Link
                  className="rounded-full border border-white/20 bg-white/10 px-7 py-4 text-center font-bold text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
                  href="/disciplinas"
                >
                  Ver disciplinas
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur" key={item.label}>
                    <p className="text-3xl font-semibold tracking-tight text-white">{item.value}</p>
                    <p className="mt-1 text-sm font-semibold text-rose-50">{item.label}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mr-0">
              <div className="absolute -left-6 top-10 z-10 hidden rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-red-950/30 backdrop-blur sm:block">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-50">Fluxo</p>
                <div className="mt-3 flex gap-2">
                  {studyFlow.map((item, index) => (
                    <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-900" key={item}>
                      {index + 1}. {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-red-950/30 backdrop-blur">
                <div className="overflow-hidden rounded-[2rem] bg-white text-slate-950">
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image
                      alt="Atlas visual de neuroanatomia"
                      className="object-contain p-5"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 560px"
                      src="/conteudos/sistema-nervoso-central-introducao-ao-encefalo/imgs/Cérebro.png"
                    />
                    <div className="absolute left-5 top-5 rounded-full bg-[#aa0000]/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                      Atlas interativo
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#aa0000]">Treino com imagens</p>
                        <h2 className="mt-1 text-2xl font-semibold tracking-tight">Identifique a estrutura destacada.</h2>
                      </div>
                      <div className="rounded-2xl bg-rose-100 px-3 py-2 text-sm font-bold text-[#aa0000]">+XP</div>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {["Cérebro", "Cerebelo", "Ponte", "Tálamo"].map((option, index) => (
                        <div
                          className={`rounded-2xl border p-4 text-sm font-semibold ${
                            index === 0
                              ? "border-rose-300 bg-rose-50 text-[#8b0000]"
                              : "border-slate-200 bg-slate-50 text-slate-700"
                          }`}
                          key={option}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#aa0000]/35 to-transparent" />
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-semibold text-[#aa0000]">Painel de estudos</p>
            <h2 className="mt-2 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-slate-950">
              Escolha uma disciplina e continue pelo roteiro organizado.
            </h2>
          </div>
          <p className="max-w-xl leading-7 text-slate-600">
            A base já nasce preparada para expandir por matérias, materiais, aulas, questões textuais e identificação por imagem.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.slug} subject={subject} />
          ))}
        </div>
      </section>
    </main>
  );
}
