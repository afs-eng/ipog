import type { Metadata } from "next";
import { PsychologyVideoLesson } from "@/components/psychology-video-lesson";

export const metadata: Metadata = {
  title: "Videoaula animada — História e áreas da Psicologia",
  description: "12 vídeos animados com narração em português e legendas sobre a história da Psicologia no Brasil e suas áreas de atuação. Sem exercícios ou interrupções.",
};

export default function PsychologyN2Page() {
  return <PsychologyVideoLesson />;
}
