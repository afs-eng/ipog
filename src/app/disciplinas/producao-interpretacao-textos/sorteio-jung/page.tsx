import type { Metadata } from "next";
import { JungDraw } from "@/components/jung-draw";

export const metadata: Metadata = {
  title: "Sorteio do Seminário — Jung",
  description: "Sorteie os temas de Jung e a Interpretação dos Sonhos entre quatro participantes.",
};

export default function JungDrawPage() {
  return <JungDraw />;
}
