"use client";

import { useState } from "react";
import { calculateGrades } from "@/lib/grade-calculator";

const gradeOptions = Array.from({ length: 21 }, (_, index) => index / 2);
const format = (value: number, decimals = 1) => value.toLocaleString("pt-BR", {
  minimumFractionDigits: decimals,
  maximumFractionDigits: decimals,
});
const initialValues = { formal1: "", processual1: "", formal2: "", processual2: "", frequency: "", exam: "" };
type Field = keyof typeof initialValues;

export function GradeCalculator() {
  const [values, setValues] = useState(initialValues);
  const update = (field: Field, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const gradesComplete = [values.formal1, values.processual1, values.formal2, values.processual2].every((value) => value !== "");
  const frequency = Number(values.frequency.replace(",", "."));
  const validFrequency = values.frequency.trim() !== "" && Number.isFinite(frequency) && frequency >= 0 && frequency <= 100;
  const result = gradesComplete && validFrequency ? calculateGrades({
    formal1: Number(values.formal1), processual1: Number(values.processual1),
    formal2: Number(values.formal2), processual2: Number(values.processual2),
    frequency, exam: values.exam === "" ? null : Number(values.exam),
  }) : null;
  const needsExam = result !== null && result.partial < 7;

  function gradeSelect(field: Field, label: string) {
    return (
      <label className="block text-sm font-semibold text-slate-700" htmlFor={field}>
        {label}
        <select id={field} value={values[field]} onChange={(event) => update(field, event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 focus:border-[#aa0000] focus:outline-2 focus:outline-[#aa0000]">
          <option value="">{field === "exam" ? "Ainda não fiz o exame" : "Selecione a nota"}</option>
          {gradeOptions.map((grade) => <option key={grade} value={grade}>{format(grade)}</option>)}
        </select>
      </label>
    );
  }

  return (
    <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="space-y-6 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm sm:p-8" aria-label="Notas e frequência">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Suas avaliações</h2>
          <button type="button" className="text-sm font-semibold text-[#aa0000] underline underline-offset-4" onClick={() => setValues(initialValues)}>Limpar</button>
        </div>
        <p className="text-sm leading-6 text-slate-600">Informe notas de 0 a 10, em intervalos de 0,5. O resultado é atualizado automaticamente.</p>
        {([1, 2] as const).map((number) => (
          <fieldset key={number} className="rounded-2xl bg-slate-50 p-5">
            <legend className="px-2 font-semibold text-[#aa0000]">Nota {number} (N{number})</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {gradeSelect(`formal${number}`, "Avaliação formal · 70%")}
              {gradeSelect(`processual${number}`, "Avaliação processual · 30%")}
            </div>
          </fieldset>
        ))}
        <label htmlFor="frequency" className="block text-sm font-semibold text-slate-700">
          Frequência na disciplina (%)
          <input id="frequency" type="text" inputMode="decimal" placeholder="Ex.: 75" value={values.frequency}
            aria-invalid={values.frequency !== "" && !validFrequency} aria-describedby="frequency-help"
            onChange={(event) => update("frequency", event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-[#aa0000] focus:outline-2 focus:outline-[#aa0000]" />
        </label>
        <p id="frequency-help" className="text-sm text-slate-600">
          {values.frequency !== "" && !validFrequency ? "Informe uma frequência válida entre 0 e 100%." : "A aprovação exige frequência mínima de 75%."}
        </p>
        {needsExam && gradeSelect("exam", "Nota do Exame Final (NEF) · opcional")}
      </section>

      <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm sm:p-8" aria-live="polite" aria-atomic="true">
        <h2 className="text-xl font-semibold">Seu resultado</h2>
        {!result ? <p className="mt-4 leading-7 text-slate-600">Preencha as quatro avaliações e a frequência para calcular suas notas e verificar a situação na disciplina.</p> : <>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {([
              ["N1", format(result.n1, 2)], ["N2", format(result.n2, 2)],
              ["Média parcial", format(result.partial)],
              ["Média final", needsExam && result.final !== null ? format(result.final) : "—"],
            ] as const).map(([label, value]) => <div key={label} className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-600">{label}</dt><dd className="mt-1 text-3xl font-semibold">{value}</dd>
            </div>)}
          </dl>
          <div className={`mt-6 rounded-2xl border p-5 ${result.status.startsWith("approved") ? "border-emerald-200 bg-emerald-50 text-emerald-900" : result.status.startsWith("failed") ? "border-red-200 bg-red-50 text-red-900" : "border-amber-200 bg-amber-50 text-amber-900"}`}>
            <h3 className="font-bold">{{
              "failed-attendance": "Reprovado por frequência",
              approved: "Aprovado sem exame final",
              "needs-exam": "Exame final necessário",
              "approved-exam": "Aprovado após o exame final",
              "failed-exam": "Reprovado após o exame final",
            }[result.status]}</h3>
            <p className="mt-2 text-sm leading-6">
              {result.status === "failed-attendance" ? "A frequência é inferior a 75%. As notas não compensam esse requisito."
                : result.status === "approved" ? "Sua média parcial é de pelo menos 7,0 e sua frequência atende ao mínimo de 75%. Você está dispensado do exame."
                  : result.status === "approved-exam" ? "Sua média final é de pelo menos 5,0 e sua frequência atende ao mínimo exigido."
                    : result.status === "failed-exam" ? "A média final ficou abaixo de 5,0 com a nota de exame informada."
                      : "Sua média parcial está abaixo de 7,0. No exame, a média final precisa atingir pelo menos 5,0."}
            </p>
          </div>
          {needsExam && result.requiredExam !== null && <p className="mt-5 text-sm leading-7 text-slate-700">
            Nota mínima no exame para atingir média final 5,0: <strong className="text-lg text-[#aa0000]">{format(result.requiredExam)}</strong>.
            {frequency < 75 && " Isso não elimina a reprovação por frequência."}
          </p>}
        </>}
        <p className="mt-6 border-t border-slate-100 pt-5 text-xs leading-6 text-slate-500">Simulação para planejamento acadêmico. Confirme as notas e a frequência oficiais com a instituição.</p>
      </section>
    </div>
  );
}
