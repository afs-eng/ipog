import type { Metadata } from "next";
import { DevelopmentUnitFour } from "@/components/development-unit-four";

export const metadata: Metadata = {
  title: "Unidade 4 — Vygotsky e Wallon | IPOG Quiz",
  description: "Uma aula visual e interativa sobre Vygotsky e Wallon: explore cenas sobre mediação, linguagem, afetividade e desenvolvimento integral.",
};

export default function UnitFourPage() {
  return <DevelopmentUnitFour />;
}
