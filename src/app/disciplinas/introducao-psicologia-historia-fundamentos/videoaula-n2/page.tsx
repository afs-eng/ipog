import type { Metadata } from "next";
import { PsychologyVideoLesson } from "@/components/psychology-video-lesson";

export const metadata: Metadata = {
  title: "Videoaula animada — História e áreas da Psicologia",
  description: "Aula em 24 capítulos com professora, cenas animadas, narração em português e legendas, baseada no modelo fornecido para a disciplina.",
};

export default function PsychologyN2Page() {
  return <PsychologyVideoLesson />;
}
