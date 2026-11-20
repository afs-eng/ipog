import assert from "node:assert/strict";
import test from "node:test";
import { directedQuestions, estimatedChapterSeconds, narrationSegments, psychologyChapters, psychologyN2Href, psychologyN2Sources } from "../src/lib/psychology-n2.ts";

test("aula N2 tem 12 capítulos, 36 cenas e cobre os dois PDFs", () => {
  assert.ok(psychologyN2Href.endsWith("/videoaula-n2"));
  assert.equal(psychologyChapters.length, 12);
  assert.equal(new Set(psychologyChapters.map((item) => item.id)).size, 12);
  assert.deepEqual(new Set(psychologyChapters.map((item) => item.source)), new Set(["history", "areas"]));
  for (const chapter of psychologyChapters) {
    assert.equal(chapter.beats.length, 3);
    assert.equal(chapter.nodes.length, 3);
    assert.ok(chapter.pages[0] > 0 && chapter.pages[0] <= chapter.pages[1]);
    assert.ok(chapter.pages[1] <= psychologyN2Sources[chapter.source].pages);
    assert.ok(estimatedChapterSeconds(chapter) > 30);
    for (const beat of chapter.beats) {
      assert.ok(beat.label && beat.takeaway);
      assert.ok(narrationSegments(beat.narration).length > 1);
      assert.equal(narrationSegments(beat.narration).join(" "), beat.narration);
    }
  }
});

test("as sete questões preservam a numeração original e têm preparação e critérios", () => {
  assert.deepEqual(directedQuestions.map((item) => item.number), [1, 2, 3, 4, 5, 7, 8]);
  for (const question of directedQuestions) {
    assert.ok(question.prompt.length > 100);
    assert.equal(question.criteria.length, 4);
    assert.ok(question.model.includes("\n\n"));
    assert.ok(question.source);
    for (const id of question.chapterIds) {
      assert.ok(psychologyChapters.some((chapter) => chapter.id === id && chapter.questions.includes(question.number)));
    }
    assert.ok(psychologyChapters.some((chapter) => chapter.questions.includes(question.number)));
  }
});

test("segmentação da narração preserva a última frase mesmo sem pontuação", () => {
  assert.deepEqual(narrationSegments("Primeira frase. Outra pergunta? Fim"), ["Primeira frase.", "Outra pergunta?", "Fim"]);
  assert.deepEqual(narrationSegments(""), []);
});
