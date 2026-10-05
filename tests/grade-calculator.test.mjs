import assert from "node:assert/strict";
import test from "node:test";
import { calculateGrades } from "../src/lib/grade-calculator.ts";

const input = { formal1: 7, processual1: 7, formal2: 7, processual2: 7, frequency: 75, exam: null };

test("aprovação em 7,0 com frequência exatamente 75%", () => {
  const result = calculateGrades(input);
  assert.equal(result.status, "approved");
  assert.equal(result.requiredExam, null);
});

test("pesos de 70/30 e truncamento sem arredondamento", () => {
  const result = calculateGrades({ ...input, formal1: 7.5, processual1: 5, formal2: 8, processual2: 4.5 });
  assert.equal(result.n1, 6.75);
  assert.equal(result.n2, 6.95);
  assert.equal(result.partial, 6.8);
  assert.equal(result.requiredExam, 3.5);
  assert.equal(result.status, "needs-exam");
});

test("frequência insuficiente prevalece até com notas máximas", () => {
  assert.equal(calculateGrades({ formal1: 10, processual1: 10, formal2: 10, processual2: 10, frequency: 74.99, exam: 10 }).status, "failed-attendance");
});

test("exame distingue ausência, zero e aprovação exatamente em 5,0", () => {
  const base = { ...input, formal1: 6, processual1: 6, formal2: 6, processual2: 6 };
  assert.equal(calculateGrades(base).status, "needs-exam");
  assert.equal(calculateGrades({ ...base, exam: 0 }).status, "failed-exam");
  assert.equal(calculateGrades({ ...base, exam: 3.5 }).final, 4.7);
  assert.equal(calculateGrades({ ...base, exam: 4 }).final, 5);
  assert.equal(calculateGrades({ ...base, exam: 4 }).status, "approved-exam");
});

test("notas zero ainda permitem aprovação com exame 10", () => {
  const base = { ...input, formal1: 0, processual1: 0, formal2: 0, processual2: 0 };
  assert.equal(calculateGrades(base).requiredExam, 10);
  assert.equal(calculateGrades({ ...base, exam: 10 }).status, "approved-exam");
});

test("rejeita valores inválidos e notas fora dos intervalos de 0,5", () => {
  for (const invalid of [-0.5, 10.5, 7.1, NaN, Infinity]) {
    assert.throws(() => calculateGrades({ ...input, formal1: invalid }), RangeError);
    assert.throws(() => calculateGrades({ ...input, exam: invalid }), RangeError);
  }
  for (const frequency of [-1, 101, NaN, Infinity]) {
    assert.throws(() => calculateGrades({ ...input, frequency }), RangeError);
  }
});

test("nota sugerida é a menor NEF permitida que aprova em todas as combinações", () => {
  for (let a = 0; a <= 20; a++) for (let b = 0; b <= 20; b++) {
    const base = { ...input, formal1: a / 2, processual1: b / 2, formal2: b / 2, processual2: a / 2 };
    const result = calculateGrades(base);
    if (result.requiredExam !== null) {
      assert.equal(calculateGrades({ ...base, exam: result.requiredExam }).status, "approved-exam");
      if (result.requiredExam > 0) {
        assert.equal(calculateGrades({ ...base, exam: result.requiredExam - 0.5 }).status, "failed-exam");
      }
    }
  }
});
