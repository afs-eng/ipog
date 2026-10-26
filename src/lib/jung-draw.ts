export const jungTopics = [
  { chapter: "Capítulo 7", title: "Temas oníricos comuns", pages: "135–150" },
  { chapter: "Capítulo 8 — Parte I", title: "A moldura do sonho — parte I", pages: "151–155" },
  { chapter: "Capítulo 8 — Parte II", title: "A moldura do sonho — parte II", pages: "156–162" },
  { chapter: "Capítulo 9", title: "O simbolismo em alquimia e conclusão", pages: "163–170" },
] as const;

export type JungAssignment = { name: string; topic: (typeof jungTopics)[number] };

function randomIndex(max: number): number {
  const buffer = new Uint32Array(1);
  const limit = 2 ** 32 - (2 ** 32 % max);
  do {
    globalThis.crypto.getRandomValues(buffer);
  } while (buffer[0] >= limit);
  return buffer[0] % max;
}

export function drawJungTopics(names: string[]): JungAssignment[] {
  const cleaned = names.map((name) => name.trim().normalize("NFC"));
  if (cleaned.length !== 4 || cleaned.some((name) => !name)) {
    throw new Error("Preencha os nomes dos quatro alunos.");
  }
  if (new Set(cleaned.map((name) => name.replace(/\s+/g, " ").toLocaleLowerCase("pt-BR"))).size !== 4) {
    throw new Error("Informe quatro nomes diferentes.");
  }
  const topics = [...jungTopics];
  for (let i = topics.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [topics[i], topics[j]] = [topics[j], topics[i]];
  }
  return cleaned.map((name, index) => ({ name, topic: topics[index] }));
}
