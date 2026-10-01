import { readFileSync } from "node:fs";
import path from "node:path";

export default function NeuroSimulationPage() {
  const rawHtml = readFileSync(path.join(process.cwd(), "aux", "neuroanatomofisiologia.html"), "utf8");
  const reviewImages = {
    cerebelo: imageDataUrl("cerebelo.jpg"),
    cortex: imageDataUrl("cortex.jpg"),
    diencefalo: imageDataUrl("diencefalo.jpg"),
    glandulas: imageDataUrl("glandulas.jpg"),
    hemisferios: imageDataUrl("hemisferios.jpg"),
    liquor: imageDataUrl("liquor.jpg"),
    medula: imageDataUrl("medula.jpg"),
    meninges: imageDataUrl("meninges.jpg"),
    nervosCranianos: imageDataUrl("nervos-cranianos.jpg"),
    nervosEspinhais: imageDataUrl("nervos-espinhais.jpg"),
    tronco: imageDataUrl("tronco.jpg"),
  };
  const lessonVisualScript = String.raw`
const originalRenderLesson=renderLesson;
const reviewImages=${JSON.stringify(reviewImages)};
function imageCard(src,title,caption){return '<figure class="lesson-image-card"><div class="lesson-image-frame"><img src="'+src+'" alt="'+title+'" loading="lazy"></div><figcaption><strong>'+title+'</strong><span>'+caption+'</span></figcaption></figure>'}
function lessonImages(index){const groups=[
[imageCard(reviewImages.medula,'Medula espinhal','Corte e organizacao interna da medula: substancia cinzenta, substancia branca e vias nervosas.'),imageCard(reviewImages.nervosEspinhais,'Nervos espinhais','Raizes dorsal e ventral formando nervo misto, com funcao sensitiva e motora.')],
[imageCard(reviewImages.meninges,'Meninges','Camadas de protecao do sistema nervoso central: dura-mater, aracnoide e pia-mater.'),imageCard(reviewImages.liquor,'Liquido cefalorraquidiano','Circulacao do LCR nos ventriculos e no espaco subaracnoideo.')],
[imageCard(reviewImages.tronco,'Tronco encefalico','Mesencefalo, ponte e bulbo relacionados a funcoes vitais automaticas.'),imageCard(reviewImages.cerebelo,'Cerebelo','Coordenacao motora, equilibrio, postura e precisao dos movimentos.'),imageCard(reviewImages.nervosCranianos,'Nervos cranianos','Pares cranianos e sua relacao com funcoes sensitivas, motoras e mistas.')],
[imageCard(reviewImages.cortex,'Cortex cerebral','Areas corticais associadas a movimento, sensibilidade, linguagem e funcoes superiores.'),imageCard(reviewImages.hemisferios,'Hemisferios cerebrais','Lobos cerebrais e organizacao geral do telencefalo.'),imageCard(reviewImages.diencefalo,'Diencefalo','Talamo, hipotalamo e estruturas relacionadas a integracao sensorial, autonoma e endocrina.')],
[imageCard(reviewImages.glandulas,'Glandulas endocrinas','Principais glandulas, hormonios e integracao entre sistema nervoso e sistema endocrino.')]
];return '<section class="lesson-image-gallery" aria-label="Imagens de revisao do tema">'+(groups[index]||[]).join('')+'</section>'}
renderLesson=function(){originalRenderLesson();const body=panel.querySelector('.lesson-body');if(body&&!body.querySelector('.lesson-image-gallery'))body.insertAdjacentHTML('afterbegin',lessonImages(topic))};
`;
  const html = rawHtml
    .replace(
      "</head>",
      "<base href=\"/\"><style>.answer.selected{border-color:var(--blue);background:var(--soft);box-shadow:inset 4px 0 0 var(--blue);font-weight:750}.answer.selected .letter{background:var(--blue);color:white}.lesson-image-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin:0 0 24px}.lesson-image-card{margin:0;border:1px solid var(--line);border-radius:16px;background:#f8fbfc;overflow:hidden}.lesson-image-frame{height:230px;background:white;display:flex;align-items:center;justify-content:center;padding:10px}.lesson-image-frame img{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block}.lesson-image-card figcaption{border-top:1px solid var(--line);padding:12px 14px}.lesson-image-card strong,.lesson-image-card span{display:block}.lesson-image-card strong{color:var(--navy);font-size:.98rem}.lesson-image-card span{margin-top:4px;color:var(--muted);font-size:.88rem;line-height:1.45}@media(max-width:560px){.lesson-image-gallery{grid-template-columns:1fr}.lesson-image-frame{height:210px}}</style></head>",
    )
    .replace("render();\n</script>", `${lessonVisualScript}render();\n</script>`);

  return (
    <main className="min-h-screen bg-white">
      <iframe
        className="h-screen w-full border-0 bg-white"
        sandbox="allow-scripts allow-top-navigation-by-user-activation"
        srcDoc={html}
        title="Simulado de Neuroanatomofisiologia"
      />
    </main>
  );
}

function imageDataUrl(fileName: string) {
  const image = readFileSync(path.join(process.cwd(), "public", "neuroanatomofisiologia", "revisao", fileName));

  return `data:image/jpeg;base64,${image.toString("base64")}`;
}
