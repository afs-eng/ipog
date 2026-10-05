import type { Metadata } from "next";
import Link from "next/link";
import { GradeCalculator } from "@/components/grade-calculator";

export const metadata: Metadata = {
  title: "Calculadora de notas | IPOG Quiz",
  description: "Calcule N1, N2, média parcial e exame final conforme as estratégias de avaliação da Resolução CONSUP 001/2022.",
};

export default function GradeCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#fff1f1] px-6 py-8 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <nav className="flex flex-wrap gap-6 text-sm font-semibold text-[#aa0000]" aria-label="Navegação">
          <Link href="/">Voltar ao início</Link>
          <Link href="/disciplinas">Disciplinas</Link>
        </nav>
        <header className="mt-10 max-w-3xl">
          <p className="font-semibold text-[#aa0000]">Planejamento acadêmico</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Calculadora de notas</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Descubra sua média, sua situação na disciplina e quanto precisa tirar no exame final.</p>
        </header>
        <GradeCalculator />
        <section className="mt-8 rounded-3xl border border-rose-100 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Estratégias de avaliação</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">Conforme a Resolução CONSUP 001/2022, de 16 de dezembro de 2022, informada para esta calculadora:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            <li>N1 e N2 = avaliação formal × 0,7 + avaliação processual × 0,3.</li>
            <li>Média parcial = (N1 + N2) ÷ 2. Com média ≥ 7,0, o estudante fica dispensado do exame final.</li>
            <li>A NEF corresponde a uma única avaliação formal, escrita e individual.</li>
            <li>Média final = (média parcial + NEF) ÷ 2. A aprovação após o exame exige média ≥ 5,0.</li>
            <li>A frequência mínima de 75% é obrigatória em todos os casos.</li>
            <li>As notas das avaliações aceitam intervalos de 0,5, entre 0 e 10. As médias parcial e final são truncadas na primeira casa decimal, sem arredondamento.</li>
          </ul>
          <p className="mt-4 text-sm leading-7 text-slate-600">Critério de cálculo: N1 e N2 mantêm a precisão dos pesos até a apuração da média parcial. A média final utiliza a média parcial já truncada. A nota mínima sugerida para a NEF é o próximo valor permitido em intervalos de 0,5.</p>
        </section>
      </div>
    </main>
  );
}
