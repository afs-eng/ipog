export type GradeInputs = {
  formal1: number;
  processual1: number;
  formal2: number;
  processual2: number;
  frequency: number;
  exam: number | null;
};

export function isValidGrade(value: number) {
  return Number.isFinite(value) && value >= 0 && value <= 10 && Number.isInteger(value * 2);
}

export function calculateGrades(input: GradeInputs) {
  const { formal1, processual1, formal2, processual2, frequency, exam } = input;
  if (![formal1, processual1, formal2, processual2].every(isValidGrade)
    || (exam !== null && !isValidGrade(exam))
    || !Number.isFinite(frequency) || frequency < 0 || frequency > 100) {
    throw new RangeError("Informe notas de 0 a 10 em intervalos de 0,5 e frequência de 0 a 100%.");
  }

  // Use integer hundredths to avoid floating-point errors at approval thresholds.
  const n1Hundredths = formal1 * 70 + processual1 * 30;
  const n2Hundredths = formal2 * 70 + processual2 * 30;
  const partialTenths = Math.floor((n1Hundredths + n2Hundredths) / 20);
  const finalTenths = partialTenths >= 70 || exam === null
    ? null
    : Math.floor((partialTenths + exam * 10) / 2);
  const requiredExam = partialTenths >= 70 ? null : Math.ceil((100 - partialTenths) / 5) / 2;
  const status = frequency < 75
    ? "failed-attendance"
    : partialTenths >= 70
      ? "approved"
      : finalTenths === null
        ? "needs-exam"
        : finalTenths >= 50 ? "approved-exam" : "failed-exam";

  return {
    n1: n1Hundredths / 100,
    n2: n2Hundredths / 100,
    partial: partialTenths / 10,
    final: finalTenths === null ? null : finalTenths / 10,
    requiredExam,
    status,
  };
}
