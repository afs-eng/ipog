import type { Metadata } from "next";
import { PsychologyVideoLesson } from "@/components/psychology-video-lesson";

export const metadata: Metadata = {
  title: "Estudo dirigido para a prova — Introdução à Psicologia",
  description: "Revisão para a N2 com videoaula narrada, sete questões explicadas, respostas-modelo e guia de estudo em PDF.",
};

export default function PsychologyExamStudyPage() {
  return <PsychologyVideoLesson
    src="/psicologia/estudo-dirigido-prova/index.html"
    title="Estudo dirigido de Psicologia para a prova: questões explicadas e respostas-modelo"
    guideHref="/psicologia/estudo-dirigido-prova/guia-de-estudo.pdf"
  />;
}
