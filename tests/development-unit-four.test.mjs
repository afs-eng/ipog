import assert from "node:assert/strict";
import test from "node:test";
import { associations, associationOptions, classroomCases, reviewCards, scoreCases, wallonStages } from "../src/lib/development-unit-four.ts";

test("unidade 4 tem revisão, cinco estágios e casos dos dois autores", () => {
  assert.equal(reviewCards.length, 12);
  assert.equal(wallonStages.length, 5);
  assert.equal(classroomCases.length, 12);
  assert.deepEqual(new Set(classroomCases.map((item) => item.author)), new Set(["Vygotsky", "Wallon"]));
  for (const card of reviewCards) {
    for (const field of ["term", "question", "answer", "example"]) assert.ok(card[field].trim());
  }
  for (const stage of wallonStages) {
    for (const field of ["name", "age", "focus", "description", "practice", "cue"]) assert.ok(stage[field].trim());
  }
});

test("associações têm identificadores únicos, respostas válidas e explicações", () => {
  assert.equal(associations.length, 6);
  assert.equal(new Set(associations.map((item) => item.id)).size, associations.length);
  for (const item of associations) {
    assert.ok(associationOptions.includes(item.answer));
    assert.ok(item.situation.trim());
    assert.ok(item.explanation.trim());
  }
});

test("cada caso tem alternativas distintas e gabarito válido", () => {
  assert.equal(new Set(classroomCases.map((item) => item.id)).size, classroomCases.length);
  for (const item of classroomCases) {
    assert.ok(Number.isInteger(item.correct));
    assert.ok(item.correct >= 0 && item.correct < item.options.length);
    assert.equal(new Set(item.options).size, item.options.length);
    assert.ok(item.options.length >= 3);
    assert.ok(item.explanation.trim());
  }
});

test("pontuação considera acertos, erros, respostas ausentes e alternativas zero", () => {
  assert.equal(scoreCases(classroomCases, {}), 0);
  const correct = Object.fromEntries(classroomCases.map((item) => [item.id, item.correct]));
  assert.equal(scoreCases(classroomCases, correct), 12);
  const wrong = Object.fromEntries(classroomCases.map((item) => [item.id, (item.correct + 1) % item.options.length]));
  assert.equal(scoreCases(classroomCases, wrong), 0);
  const first = classroomCases[0];
  assert.equal(scoreCases(classroomCases, { [first.id]: first.correct, unknown: 1 }), 1);
  const zero = classroomCases.find((item) => item.correct === 0);
  assert.equal(scoreCases([zero], { [zero.id]: 0 }), 1);
  assert.equal(scoreCases([], correct), 0);
});

test("rodada de erros é pontuada apenas dentro de seu subconjunto", () => {
  const subset = classroomCases.slice(0, 3);
  const answers = Object.fromEntries(classroomCases.map((item) => [item.id, item.correct]));
  assert.equal(scoreCases(subset, answers), 3);
});
