import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, statSync } from "node:fs";
import { directedQuestions, estimatedChapterSeconds, narrationSegments, psychologyChapters, psychologyN2Href, psychologyN2Sources } from "../src/lib/psychology-n2.ts";

test("roteiro anterior N2 tem 12 capítulos e 36 cenas baseadas nos dois PDFs", () => {
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

test("produção anterior preserva 12 MP4s com pôsteres, legendas e marcações de cenas", () => {
  const videos = JSON.parse(readFileSync(new URL("../src/lib/psychology-video-manifest.json", import.meta.url), "utf8"));
  assert.equal(videos.length, psychologyChapters.length);
  assert.ok(videos.reduce((sum, item) => sum + item.duration, 0) > 800);
  for (const [index, video] of videos.entries()) {
    assert.equal(video.id, psychologyChapters[index].id);
    assert.equal(video.sceneStarts.length, 3);
    assert.equal(video.sceneStarts[0], 0);
    assert.ok(video.sceneStarts[1] > 0);
    assert.ok(video.sceneStarts[2] > video.sceneStarts[1]);
    assert.ok(video.duration > video.sceneStarts[2]);
    for (const file of [video.src, video.poster, video.captions]) {
      assert.ok(file.startsWith("/psicologia/videoaula-n2/"));
      assert.ok(statSync(new URL(`../public${file}`, import.meta.url)).size > 100);
    }
    const mp4 = readFileSync(new URL(`../public${video.src}`, import.meta.url));
    assert.equal(mp4.toString("ascii", 4, 8), "ftyp");
    assert.ok(mp4.indexOf("moov") < mp4.indexOf("mdat"), "MP4 deve iniciar sem baixar o arquivo inteiro");
    const captions = readFileSync(new URL(`../public${video.captions}`, import.meta.url), "utf8");
    assert.ok(captions.startsWith("WEBVTT\n"));
    assert.ok(captions.includes("-->"));
    for (const beat of psychologyChapters[index].beats) {
      assert.ok(!/questão|questões|questionário|prova/i.test(beat.narration), "Narração deve focar apenas no conteúdo");
    }
  }
});

test("página usa o modelo fornecido com professora, 24 capítulos e áudio local", () => {
  const html = readFileSync(new URL("../public/psicologia/modelo-videoaula/index.html", import.meta.url), "utf8");
  const component = readFileSync(new URL("../src/components/psychology-video-lesson.tsx", import.meta.url), "utf8");
  assert.ok(component.includes('/psicologia/modelo-videoaula/index.html'));
  assert.ok(html.includes('function permanentTeacher('));
  assert.ok(html.includes('const FULL_TEACHER=new Image()'));
  assert.ok(html.includes('Texto da narração e referências'));
  assert.ok(!html.includes('https://resource2.heygen.ai/'));
  const chapters = JSON.parse(html.match(/const CHAPTER_DATA=(\[.*?\]);const /s)[1]);
  assert.equal(chapters.length, 24);
  assert.equal(chapters[0].num, 1);
  assert.equal(chapters[23].num, 24);
  for (let index = 1; index <= 3; index++) {
    assert.ok(html.includes(`./parte-${index}.mp3`));
    assert.ok(statSync(new URL(`../public/psicologia/modelo-videoaula/parte-${index}.mp3`, import.meta.url)).size > 1000000);
  }
});
