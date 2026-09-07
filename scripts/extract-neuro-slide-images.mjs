import { execFileSync } from "node:child_process";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceDirectory = path.join(process.cwd(), "disciplinas", "neuroanatomofisiologia");
const publicDirectory = path.join(process.cwd(), "public", "neuroanatomofisiologia");
const draftDirectory = path.join(sourceDirectory, "questoes", "draft");

const decks = [
  { file: "2. Introdução à anatomia.pptx", materialId: "introducao-a-anatomia" },
  { file: "3. Estruturas ósseas do cranio.pptx", materialId: "estruturas-osseas-do-cranio" },
  { file: "4. Embriologia do SNC IPOG.pptx", materialId: "embriologia-do-snc" },
  { file: "5. Medula espinal.pptx", materialId: "medula-espinal" },
  { file: "6. Meninges e Ventrículos.pptx", materialId: "meninges-e-ventriculos" },
  { file: "7. Encéfalo.pptx", materialId: "encefalo" },
  { file: "8. Cerebelo e Tronco encefálico.pptx", materialId: "cerebelo-e-tronco-encefalico" },
  { file: "9. Neurônios e Sinapse.pptx", materialId: "neuronios-e-sinapse" },
];

const relationshipTargetPattern = /<Relationship[^>]+Id="([^"]+)"[^>]+Target="\.\.\/media\/([^"]+)"/g;
const imageReferencePattern = /<a:blip[^>]+r:embed="([^"]+)"/g;
const unzipOptions = { maxBuffer: 1024 * 1024 * 200 };

await mkdir(publicDirectory, { recursive: true });
await mkdir(path.join(sourceDirectory, "imagens"), { recursive: true });

const imageBySlide = new Map();
const manifest = [];

for (const deck of decks) {
  const pptxPath = path.join(sourceDirectory, deck.file);
  const entries = execFileSync("unzip", ["-Z1", pptxPath], {
    encoding: "utf8",
    ...unzipOptions,
  })
    .split("\n")
    .filter(Boolean);
  const slideEntries = entries
    .filter((entry) => /^ppt\/slides\/slide\d+\.xml$/.test(entry))
    .sort((first, second) => Number(first.match(/\d+/)?.[0]) - Number(second.match(/\d+/)?.[0]));

  for (const slideEntry of slideEntries) {
    const slideNumber = Number(slideEntry.match(/\d+/)?.[0]);
    const relEntry = `ppt/slides/_rels/slide${slideNumber}.xml.rels`;

    if (!entries.includes(relEntry)) {
      continue;
    }

    const slideXml = execFileSync("unzip", ["-p", pptxPath, slideEntry], {
      encoding: "utf8",
      ...unzipOptions,
    });
    const relXml = execFileSync("unzip", ["-p", pptxPath, relEntry], {
      encoding: "utf8",
      ...unzipOptions,
    });
    const targetsById = new Map();
    const usedRelationshipIds = new Set();

    for (const match of relXml.matchAll(relationshipTargetPattern)) {
      targetsById.set(match[1], match[2]);
    }

    for (const match of slideXml.matchAll(imageReferencePattern)) {
      usedRelationshipIds.add(match[1]);
    }

    let imageIndex = 1;

    for (const relationshipId of usedRelationshipIds) {
      const mediaFile = targetsById.get(relationshipId);

      if (!mediaFile) {
        continue;
      }

      const extension = path.extname(mediaFile).toLowerCase();
      const imageBuffer = execFileSync("unzip", ["-p", pptxPath, `ppt/media/${mediaFile}`], unzipOptions);
      const outputFile = `${deck.materialId}-slide-${slideNumber}-image-${imageIndex}${extension}`;
      const outputPath = path.join(publicDirectory, outputFile);
      const publicUrl = `/neuroanatomofisiologia/${outputFile}`;

      await writeFile(outputPath, imageBuffer);

      const slideKey = `${deck.materialId}:${slideNumber}`;
      const currentImages = imageBySlide.get(slideKey) ?? [];
      currentImages.push(publicUrl);
      imageBySlide.set(slideKey, currentImages);
      manifest.push({ materialId: deck.materialId, slide: slideNumber, imageUrl: publicUrl });
      imageIndex += 1;
    }
  }
}

const draftFiles = (await readdir(draftDirectory)).filter((file) => file.endsWith(".json"));
let updatedQuestions = 0;

for (const file of draftFiles) {
  const filePath = path.join(draftDirectory, file);
  const question = JSON.parse(await readFile(filePath, "utf8"));
  const slideKey = `${question.materialId}:${question.sourceSlide}`;
  const images = imageBySlide.get(slideKey);

  if (!images?.length) {
    continue;
  }

  question.imageUrl = images[0];
  question.type = question.type === "clinical" ? "clinical" : "image";
  question.updatedAt = new Date().toISOString();
  await writeFile(filePath, `${JSON.stringify(question, null, 2)}\n`, "utf8");
  updatedQuestions += 1;
}

await writeFile(
  path.join(sourceDirectory, "imagens", "slide-images.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(`Extracted ${manifest.length} images.`);
console.log(`Updated ${updatedQuestions} draft questions with imageUrl.`);
