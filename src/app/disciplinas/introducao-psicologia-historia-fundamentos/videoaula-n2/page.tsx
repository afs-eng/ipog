import type { Metadata } from "next";
import { PsychologyVideoLesson } from "@/components/psychology-video-lesson";

export const metadata: Metadata = {
  title: "Aula narrada N2 — História e áreas da Psicologia",
  description: "Aula em cenas animadas com narração, capítulos e prática das sete questões do estudo dirigido de Introdução à Psicologia.",
};

export default function PsychologyN2Page() {
  return <PsychologyVideoLesson />;
}
