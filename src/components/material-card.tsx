import Image from "next/image";
import Link from "next/link";
import type { Material } from "@/lib/study-data";
import { ProgressBar } from "@/components/progress-bar";

type MaterialCardProps = {
  material: Material;
  questionCount: number;
  topics: { id: string; name: string; count: number }[];
};

export function MaterialCard({ material, questionCount, topics }: MaterialCardProps) {
  return (
    <article className="scroll-mt-8 border-b border-slate-200 bg-white py-8 last:border-b-0" id={material.slug}>
      <div className="grid gap-6 lg:grid-cols-[205px_1fr]">
        <div className="relative h-[205px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <Image
            alt={`Imagem da aula ${material.title}`}
            className="object-contain p-3"
            fill
            sizes="(max-width: 1024px) 100vw, 230px"
            src={material.coverImage}
          />
        </div>

        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                {material.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Aula {material.order.toString().padStart(2, "0")}
              </p>
            </div>
            <span className="w-fit text-sm font-semibold text-slate-500">
              {questionCount}/10
            </span>
          </div>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">{material.description}</p>

          <div className="mt-5 max-w-xl">
            <ProgressBar value={questionCount * 10} label="Questões geradas" />
          </div>

          <Link
            className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-5 py-3 font-semibold transition sm:w-auto ${
              questionCount > 0
                ? "bg-sky-600 text-white hover:bg-sky-700"
                : "pointer-events-none bg-slate-200 text-slate-500"
            }`}
            href={`/quiz/neuroanatomofisiologia-treino-textual?material=${material.slug}`}
          >
            {questionCount > 0 ? "Iniciar curso" : "Aguardando questões"}
          </Link>

          {topics.length > 0 ? (
            <ol className="mt-7 space-y-5">
              {topics.map((topic, index) => (
                <li className="grid gap-3 sm:grid-cols-[2rem_1fr_auto] sm:items-start" key={topic.id}>
                  <span className="font-semibold text-slate-400">{index + 1}.</span>
                  <div>
                    <h3 className="font-semibold text-slate-950">{topic.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {topic.count} {topic.count === 1 ? "pergunta" : "perguntas"} deste tópico.
                    </p>
                  </div>
                  <Link
                    className="text-sm font-semibold text-sky-700 hover:text-sky-900"
                    href={`/quiz/neuroanatomofisiologia-treino-textual?material=${material.slug}&topic=${topic.id}`}
                  >
                    Estudar
                  </Link>
                </li>
                ))}
            </ol>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-4 text-sm leading-6 text-slate-600">
              Esta aula tem imagens cadastradas, mas ainda não tem perguntas porque o texto extraído não foi suficiente.
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
