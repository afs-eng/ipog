import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AtlasAccordion } from "@/components/atlas-accordion";
import { AtlasGallery } from "@/components/atlas-gallery";
import { TestStartCard } from "@/components/test-start-card";
import { getLocalStudyQuestions } from "@/lib/question-files";
import { getQuizMode, getSubject, quizModes } from "@/lib/study-data";
import { getNeuroUnit } from "@/lib/neuro-units";

export function generateStaticParams() {
  return quizModes.map((quizMode) => ({ quizId: quizMode.id }));
}

export default async function QuizPage({
  params,
  searchParams,
}: PageProps<"/quiz/[quizId]">) {
  const { quizId } = await params;
  const { material, topic } = await searchParams;
  const quizMode = getQuizMode(quizId);

  if (!quizMode) {
    notFound();
  }

  const selectedMaterial = typeof material === "string" ? material : undefined;
  const selectedTopic = typeof topic === "string" ? topic : undefined;
  const unit = getNeuroUnit(selectedTopic);
  const subject = getSubject("neuroanatomofisiologia");
  const currentMaterial = subject?.materials.find((item) => item.slug === selectedMaterial);
  const questions = await getLocalStudyQuestions();
  const materialQuestions = selectedMaterial
    ? questions.filter((question) => question.materialId === selectedMaterial)
    : questions;
  const filteredQuestions = unit
    ? materialQuestions
    : selectedTopic
    ? materialQuestions.filter((question) => question.topicId === selectedTopic)
    : materialQuestions;
  const atlasImages = Array.from(
    new Map(
      filteredQuestions
        .filter((question) => question.imageUrl)
        .map((question) => [question.imageUrl, question]),
    ).values(),
  ).slice(0, 4);
  const pageTitle = unit
    ? unit.title
    : selectedTopic
      ? selectedTopic.replaceAll("-", " ")
    : currentMaterial?.title ?? quizMode.title;
  const testHref = buildTestHref(quizId, selectedMaterial, selectedTopic);
  const simulationHref = buildSimulationHref(quizId, selectedMaterial, selectedTopic);
  const videoUrl = unit?.videoUrl ?? (currentMaterial ? `/videos/${currentMaterial.slug}.mp4` : undefined);
  const isExternalVideo = videoUrl ? /^https?:\/\//.test(videoUrl) : false;
  const hasVideo = videoUrl
    ? isExternalVideo || existsSync(path.join(process.cwd(), "public", videoUrl.replace(/^\//, "")))
    : false;
  const objectives = unit?.objectives ?? [
    "Entender os conceitos principais apresentados nos slides.",
    "Identificar estruturas e relações anatômicas da aula.",
    "Conhecer os tópicos cobrados nas questões.",
    "Revisar explicações com fonte no material da disciplina.",
  ];
  const posterUrl = getExistingPublicAsset(unit?.posterUrl, currentMaterial?.coverImage ?? "/window.svg");
  const testCardImageUrl = getExistingPublicAsset(unit?.testCardImageUrl, posterUrl);
  const atlasImageUrl = getExistingPublicAsset(unit?.atlasImageUrl, atlasImages[0]?.imageUrl ?? currentMaterial?.coverImage ?? "/window.svg");
  const hasVideoSection = Boolean(unit?.videoText.length || currentMaterial) && Boolean(!unit || unit.videoText.length > 0);
  const atlasItems = unit?.atlasItems.map((item) => ({
    ...item,
    imageUrl: getExistingPublicAsset(item.imageUrl, atlasImageUrl),
  })) ?? atlasImages.map((question) => ({
    title: `Slide ${question.sourceSlide ?? ""}`,
    imageUrl: question.imageUrl ?? "/window.svg",
    description: question.topicId.replaceAll("-", " "),
  }));
  const atlasGalleryItems = unit?.slug === "sistema-nervoso-periferico-nervos-ganglios-e-plexos"
    ? atlasItems.map((item) => ({
        imageUrl: item.imageUrl,
        label: item.title,
        description: item.description,
      }))
    : unit?.testImageItems ?? atlasItems.map((item) => ({
    imageUrl: item.imageUrl,
    label: item.title,
  }));

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link className="font-semibold text-sky-700" href="/disciplinas">
              Cursos
            </Link>
            <span>/</span>
            <span>Anatomia</span>
            <span>/</span>
            <Link className="font-semibold text-sky-700" href="/disciplinas/neuroanatomofisiologia">
              Neuroanatomofisiologia
            </Link>
            <span>/</span>
            <span className="text-slate-700">{pageTitle}</span>
          </div>
          <input
            className="w-full max-w-xs rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400"
            placeholder="Busca..."
            type="search"
          />
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[170px_1fr] lg:px-12">
        <aside className="h-fit text-sm lg:sticky lg:top-8">
          <nav className="space-y-3 text-slate-600">
            {hasVideoSection ? <a className="block text-sky-600" href="#videoaula">Assista à videoaula</a> : null}
            {!hasVideoSection ? <a className="block text-sky-600" href="#atlas">Navegue pelo atlas</a> : null}
            <a className="block hover:text-sky-600" href="#teste">Teste seus conhecimentos</a>
            {hasVideoSection ? <a className="block hover:text-sky-600" href="#atlas">Navegue pelo atlas</a> : null}
            <a className="block hover:text-sky-600" href="#resumo">Resumo</a>
          </nav>
        </aside>

        <div>
          <section className="mb-8">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-normal capitalize tracking-tight text-sky-500">
                {pageTitle}
              </h1>
              <span className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase text-slate-400">
                Incompleta
              </span>
            </div>

            <div className="mt-5 bg-sky-50 p-5 text-slate-700">
              <h2 className="font-semibold text-slate-800">Objetivos de aprendizagem</h2>
              <p className="mt-4">Após completar esta unidade de estudo, você será capaz de:</p>
              <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm leading-7">
                {objectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ol>
            </div>
          </section>

          <div className="space-y-10">
            {hasVideoSection ? (
              <section className="relative border-l border-slate-200 pl-8" id="videoaula">
                <StepNumber>1</StepNumber>
                <h2 className="font-semibold text-sky-500">Assista à videoaula</h2>
                <p className="mt-4 leading-7 text-slate-600">
                  {unit?.videoText.map((paragraph) => (
                    <span className="mb-3 block" key={paragraph}>{paragraph}</span>
                  )) ?? currentMaterial?.description ?? "Revise o conteúdo da aula antes de responder às perguntas."}
                </p>
                {currentMaterial || unit ? (
                  <div className="mt-5 overflow-hidden border border-slate-200 bg-slate-50">
                    {hasVideo && videoUrl && isExternalVideo ? (
                      <iframe
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        className="aspect-video w-full bg-black"
                        src={videoUrl}
                        title={unit?.videoTitle ?? currentMaterial?.title ?? pageTitle}
                      />
                    ) : hasVideo && videoUrl ? (
                      <video className="aspect-video w-full bg-black" controls poster={posterUrl}>
                        <source src={videoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="relative aspect-video w-full">
                        <Image
                          alt={`Imagem principal de ${pageTitle}`}
                          className="object-contain p-3"
                          fill
                          sizes="(max-width: 1024px) 100vw, 680px"
                          src={posterUrl}
                        />
                      </div>
                    )}
                    <div className="border-t border-slate-200 bg-white p-4">
                      <p className="font-semibold text-sky-600">{unit?.videoTitle ?? currentMaterial?.title}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {hasVideo
                          ? isExternalVideo
                            ? "Videoaula carregada pelo Google Drive."
                            : "Videoaula carregada para esta unidade."
                          : unit
                            ? "Para adicionar vídeo, coloque o arquivo em public/conteudos/sistema-nervoso-central-introducao-ao-encefalo/video.mp4."
                            : `Para adicionar vídeo, coloque o arquivo em public/videos/${currentMaterial?.slug}.mp4.`}
                      </p>
                    </div>
                  </div>
                ) : null}
              </section>
            ) : null}

            {!hasVideoSection ? (
              <section className="relative border-l border-slate-200 pl-8" id="atlas">
                <StepNumber>1</StepNumber>
                <h2 className="font-semibold text-sky-500">Navegue pelo atlas</h2>
                <AtlasGallery
                  description={unit?.atlasDescription ?? "Enquanto você estava estudando a imagem da visão geral, você aprendeu a relação entre cada parte do encéfalo. Agora examine cada uma delas separadamente na galeria do atlas."}
                  items={atlasGalleryItems}
                />
                {unit?.atlasAccordionSections ? <AtlasAccordion sections={unit.atlasAccordionSections} /> : null}
              </section>
            ) : null}

            <section className="relative border-l border-slate-200 pl-8" id="teste">
              <StepNumber>{hasVideoSection ? 2 : 2}</StepNumber>
              <h2 className="font-semibold text-sky-500">Teste seus conhecimentos</h2>
              <p className="mt-4 leading-7 text-slate-600">
                {unit?.testDescription ?? "Complete o teste a seguir para avaliar seus conhecimentos sobre esta aula."}
              </p>
              <TestStartCard
                href={testHref}
                imageUrl={testCardImageUrl}
                title={unit?.videoTitle ?? currentMaterial?.title ?? pageTitle}
              />
            </section>

            {hasVideoSection ? (
              <section className="relative border-l border-slate-200 pl-8" id="atlas">
                <StepNumber>3</StepNumber>
                <h2 className="font-semibold text-sky-500">Navegue pelo atlas</h2>
                <AtlasGallery
                  description={unit?.atlasDescription ?? "Enquanto você estava estudando a imagem da visão geral, você aprendeu a relação entre cada parte do encéfalo. Agora examine cada uma delas separadamente na galeria do atlas."}
                  items={atlasGalleryItems}
                />
                {unit?.atlasAccordionSections ? <AtlasAccordion sections={unit.atlasAccordionSections} /> : null}
              </section>
            ) : null}

            <section className="relative border-l border-slate-200 pl-8" id="resumo">
              <StepNumber>{hasVideoSection ? 4 : 3}</StepNumber>
              <h2 className="font-semibold text-sky-500">Resumo</h2>
              <div className="mt-5 overflow-hidden border border-slate-200">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {(unit?.summaryTables[0]?.rows ?? filteredQuestions.slice(0, 6).map((question) => ({
                      label: question.topicId.replaceAll("-", " "),
                      value: question.explanation,
                    }))).map((row) => (
                      <tr className="border-b border-slate-200 last:border-b-0" key={row.label}>
                        <th className="w-1/3 bg-slate-50 p-3 text-left align-top font-semibold capitalize text-slate-700">
                          {row.label}
                        </th>
                        <td className="p-3 leading-6 text-slate-600">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <section className="relative mt-10 rounded-sm border border-amber-200 bg-amber-50 p-8 text-center">
                <button
                  aria-label="Configurações do simulado"
                  className="absolute right-5 top-5 text-slate-500 hover:text-amber-600"
                  type="button"
                >
                  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.2 3.5c0-.5-.1-1-.2-1.4l2-1.5-2-3.4-2.4 1a8 8 0 0 0-2.4-1.4L14.8 2h-5.6l-.4 2.8c-.9.3-1.7.8-2.4 1.4l-2.4-1-2 3.4 2 1.5a8.8 8.8 0 0 0 0 2.8l-2 1.5 2 3.4 2.4-1c.7.6 1.5 1 2.4 1.4l.4 2.8h5.6l.4-2.8c.9-.3 1.7-.8 2.4-1.4l2.4 1 2-3.4-2-1.5c.1-.4.2-.9.2-1.4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </button>
                <p className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-300">
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 21h8v-2H8v2Zm4-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.8V17h8v-2.2c1.8-1.3 3-3.4 3-5.8 0-3.9-3.1-7-7-7Z" />
                  </svg>
                </p>
                <h2 className="mt-4 text-2xl font-normal text-amber-500">Pronto para testar seus conhecimentos?</h2>
                <p className="mx-auto mt-2 max-w-xl leading-7 text-slate-600">
                  Responda o teste para completar esta unidade de estudo.
                </p>
                <Link
                  className="mt-6 flex w-full items-center justify-center rounded-sm bg-amber-400 px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-amber-500"
                  href={simulationHref}
                >
                  Começar o simulado &gt; 20 questões
                </Link>
              </section>
            </section>

            <div className="flex justify-center">
              <Link
                className="rounded-sm border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-sky-500 hover:text-sky-600"
                href="/disciplinas/neuroanatomofisiologia"
              >
                Voltar para as aulas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StepNumber({ children }: { children: ReactNode }) {
  return (
    <span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400">
      {children}
    </span>
  );
}

function getExistingPublicAsset(assetUrl: string | undefined, fallbackUrl: string) {
  if (!assetUrl) {
    return fallbackUrl;
  }

  const assetPath = path.join(process.cwd(), "public", decodeURIComponent(assetUrl.replace(/^\//, "")));

  return existsSync(assetPath) ? assetUrl : fallbackUrl;
}

function buildTestHref(quizId: string, materialSlug?: string, topicSlug?: string) {
  const params = new URLSearchParams();

  if (materialSlug) {
    params.set("material", materialSlug);
  }

  if (topicSlug) {
    params.set("topic", topicSlug);
  }

  const query = params.toString();

  return `/quiz/${quizId}/teste${query ? `?${query}` : ""}`;
}

function buildSimulationHref(quizId: string, materialSlug?: string, topicSlug?: string) {
  const params = new URLSearchParams();

  if (materialSlug) {
    params.set("material", materialSlug);
  }

  if (topicSlug) {
    params.set("topic", topicSlug);
  }

  const query = params.toString();

  return `/quiz/${quizId}/simulado${query ? `?${query}` : ""}`;
}
