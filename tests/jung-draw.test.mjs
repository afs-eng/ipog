import assert from "node:assert/strict";
import test from "node:test";
import { drawJungTopics, jungTopics } from "../src/lib/jung-draw.ts";

test("distribui os quatro temas sem repetição e preserva os participantes", () => {
  for (let round = 0; round < 50; round++) {
    const result = drawJungTopics([" Ana ", "Bruno", "Carla", "Diego"]);
    assert.deepEqual(result.map(({ name }) => name), ["Ana", "Bruno", "Carla", "Diego"]);
    assert.deepEqual(new Set(result.map(({ topic }) => topic)), new Set(jungTopics));
  }
});

test("exige quatro nomes preenchidos", () => {
  for (const names of [[], ["Ana"], ["Ana", "Bruno", "Carla", "  "]]) {
    assert.throws(() => drawJungTopics(names), /Preencha os nomes dos quatro alunos/);
  }
});

test("rejeita nomes repetidos independentemente de caixa, espaços e normalização Unicode", () => {
  for (const names of [
    ["Ana", " ANA ", "Carla", "Diego"],
    ["Ana Maria", "ana  maria", "Carla", "Diego"],
    ["José", "Jose\u0301", "Carla", "Diego"],
  ]) {
    assert.throws(() => drawJungTopics(names), /Informe quatro nomes diferentes/);
  }
});
