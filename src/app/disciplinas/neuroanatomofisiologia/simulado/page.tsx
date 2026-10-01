import { readFileSync } from "node:fs";
import path from "node:path";

export default function NeuroSimulationPage() {
  const rawHtml = readFileSync(path.join(process.cwd(), "aux", "neuroanatomofisiologia.html"), "utf8");
  const reviewImages = {
    cerebelo: "/neuroanatomofisiologia/revisao/cerebelo-ptbr.png",
    cortex: "/neuroanatomofisiologia/revisao/cortex-ptbr.png",
    diencefalo: "/neuroanatomofisiologia/revisao/diencefalo-ptbr.png",
    glandulas: "/neuroanatomofisiologia/revisao/glandulas-ptbr.png",
    hemisferios: "/neuroanatomofisiologia/revisao/hemisferios-ptbr.png",
    liquor: "/neuroanatomofisiologia/revisao/liquor-ptbr.png",
    medula: "/neuroanatomofisiologia/revisao/medula-ptbr.png",
    meninges: "/neuroanatomofisiologia/revisao/meninges-ptbr.png",
    nervosCranianos: "/neuroanatomofisiologia/revisao/nervos-cranianos-ptbr.png",
    nervosEspinhais: "/neuroanatomofisiologia/revisao/nervos-espinhais-ptbr.png",
    tronco: "/neuroanatomofisiologia/revisao/tronco-ptbr.png",
  };
  const lessonVisualScript = String.raw`
const originalRenderLesson=renderLesson;
const reviewImages=${JSON.stringify(reviewImages)};
const imageInfo={
medula:{src:reviewImages.medula,title:'Medula espinhal',caption:'Corte e organizacao interna da medula: substancia cinzenta, substancia branca e vias nervosas.',summary:'A imagem mostra a medula espinhal em corte, destacando a substancia cinzenta em formato de H no centro e a substancia branca ao redor. Use para lembrar onde ocorrem integracao reflexa, passagem de vias ascendentes e descendentes e conexao com as raizes nervosas.'},
nervosEspinhais:{src:reviewImages.nervosEspinhais,title:'Nervos espinhais',caption:'Raizes dorsal e ventral formando nervo misto, com funcao sensitiva e motora.',summary:'A imagem organiza a formacao do nervo espinhal a partir da raiz dorsal sensitiva e da raiz ventral motora. Ela ajuda a revisar por que o nervo espinhal e considerado misto e como ele conecta medula, pele, musculos e reflexos.'},
meninges:{src:reviewImages.meninges,title:'Meninges',caption:'Camadas de protecao do sistema nervoso central: dura-mater, aracnoide e pia-mater.',summary:'A imagem apresenta as tres meninges que revestem e protegem o sistema nervoso central. Observe a ordem das camadas e a relacao com o espaco subaracnoideo, onde circula o liquido cefalorraquidiano.'},
liquor:{src:reviewImages.liquor,title:'Liquido cefalorraquidiano',caption:'Circulacao do LCR nos ventriculos e no espaco subaracnoideo.',summary:'A imagem resume o trajeto do liquido cefalorraquidiano pelos ventriculos e espacos de circulacao. Ela serve para revisar producao, circulacao e funcao protetora do LCR no encefalo e na medula.'},
tronco:{src:reviewImages.tronco,title:'Tronco encefalico',caption:'Mesencefalo, ponte e bulbo relacionados a funcoes vitais automaticas.',summary:'A imagem destaca as partes do tronco encefalico: mesencefalo, ponte e bulbo. Foque na relacao com respiracao, frequencia cardiaca, pressao arterial, passagem de vias nervosas e origem de varios nervos cranianos.'},
cerebelo:{src:reviewImages.cerebelo,title:'Cerebelo',caption:'Coordenacao motora, equilibrio, postura e precisao dos movimentos.',summary:'A imagem mostra a anatomia do cerebelo e sua posicao posterior ao tronco encefalico. Use para associar cerebelo a coordenacao dos movimentos, equilibrio, postura, precisao motora e sinais de lesao como ataxia.'},
nervosCranianos:{src:reviewImages.nervosCranianos,title:'Nervos cranianos',caption:'Pares cranianos e sua relacao com funcoes sensitivas, motoras e mistas.',summary:'A imagem organiza os doze pares de nervos cranianos e suas regioes de emergencia. Ela ajuda a revisar que alguns nervos sao sensitivos, outros motores e outros mistos, participando de visao, olfato, face, degluticao e controle visceral.'},
cortex:{src:reviewImages.cortex,title:'Cortex cerebral',caption:'Areas corticais associadas a movimento, sensibilidade, linguagem e funcoes superiores.',summary:'A imagem apresenta areas funcionais do cortex cerebral. Use para relacionar regioes corticais a movimento voluntario, sensibilidade, visao, audicao, linguagem e funcoes cognitivas superiores.'},
hemisferios:{src:reviewImages.hemisferios,title:'Hemisferios cerebrais',caption:'Lobos cerebrais e organizacao geral do telencefalo.',summary:'A imagem mostra a divisao dos hemisferios cerebrais e dos lobos do telencefalo. Ela ajuda a localizar lobos frontal, parietal, temporal e occipital e entender a distribuicao geral das funcoes cerebrais.'},
diencefalo:{src:reviewImages.diencefalo,title:'Diencefalo',caption:'Talamo, hipotalamo e estruturas relacionadas a integracao sensorial, autonoma e endocrina.',summary:'A imagem localiza estruturas do diencefalo, principalmente talamo e hipotalamo. Foque no talamo como estacao de retransmissao sensorial e no hipotalamo como centro de regulacao autonoma e endocrina.'},
glandulas:{src:reviewImages.glandulas,title:'Glandulas endocrinas',caption:'Principais glandulas, hormonios e integracao entre sistema nervoso e sistema endocrino.',summary:'A imagem resume glandulas endocrinas importantes para a revisao, como hipofise, pineal, tireoide e suprarrenais. Use para conectar hormonios a sono, metabolismo, resposta ao estresse e integracao neuroendocrina.'}
};
function imageCard(key){const item=imageInfo[key];return '<figure class="lesson-image-card"><button type="button" class="lesson-image-button" data-image-key="'+key+'" aria-label="Ampliar '+item.title+'"><span class="lesson-image-frame"><img src="'+item.src+'" alt="'+item.title+'" loading="lazy"></span><span class="zoom-hint">Clique para ampliar</span></button><figcaption><strong>'+item.title+'</strong><span>'+item.caption+'</span></figcaption></figure>'}
function lessonImages(index){const groups=[
[imageCard('medula'),imageCard('nervosEspinhais')],
[imageCard('meninges'),imageCard('liquor')],
[imageCard('tronco'),imageCard('cerebelo'),imageCard('nervosCranianos')],
[imageCard('cortex'),imageCard('hemisferios'),imageCard('diencefalo')],
[imageCard('glandulas')]
];return '<section class="lesson-image-gallery" aria-label="Imagens de revisao do tema">'+(groups[index]||[]).join('')+'</section>'}
renderLesson=function(){originalRenderLesson();const body=panel.querySelector('.lesson-body');if(body&&!body.querySelector('.lesson-image-gallery'))body.insertAdjacentHTML('afterbegin',lessonImages(topic))};
function closeImageModal(){const modal=document.querySelector('.image-modal');if(modal)modal.remove();document.body.classList.remove('modal-open')}
function openImageModal(key){const item=imageInfo[key];if(!item)return;closeImageModal();document.body.classList.add('modal-open');document.body.insertAdjacentHTML('beforeend','<div class="image-modal" role="dialog" aria-modal="true" aria-label="'+item.title+'"><button type="button" class="image-modal-backdrop" data-close-image></button><div class="image-modal-panel"><button type="button" class="image-modal-close" data-close-image>Fechar</button><div class="image-modal-image"><img src="'+item.src+'" alt="'+item.title+' ampliada"></div><aside class="image-modal-info"><p class="modal-kicker">Imagem de revisao</p><h2>'+item.title+'</h2><p>'+item.caption+'</p><p class="modal-note">'+item.summary+'</p></aside></div></div>')}
document.addEventListener('click',e=>{const imageButton=e.target.closest('[data-image-key]');if(imageButton){openImageModal(imageButton.dataset.imageKey);return}if(e.target.closest('[data-close-image]'))closeImageModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeImageModal()});
`;
  const injectedHead = `<base href="/"><style>.answer.selected{border-color:var(--blue);background:var(--soft);box-shadow:inset 4px 0 0 var(--blue);font-weight:750}.answer.selected .letter{background:var(--blue);color:white}.lesson-image-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin:0 0 24px}.lesson-image-card{margin:0;border:1px solid var(--line);border-radius:16px;background:#f8fbfc;overflow:hidden}.lesson-image-button{position:relative;width:100%;border:0;background:transparent;padding:0;cursor:zoom-in;text-align:inherit}.lesson-image-button:focus-visible{outline:3px solid var(--amber);outline-offset:-3px}.lesson-image-frame{height:230px;background:white;display:flex;align-items:center;justify-content:center;padding:10px}.lesson-image-frame img{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block}.zoom-hint{position:absolute;right:10px;bottom:10px;border-radius:999px;background:rgba(16,38,61,.9);color:white;padding:6px 10px;font-size:.75rem;font-weight:750}.lesson-image-card figcaption{border-top:1px solid var(--line);padding:12px 14px}.lesson-image-card strong,.lesson-image-card span{display:block}.lesson-image-card strong{color:var(--navy);font-size:.98rem}.lesson-image-card span{margin-top:4px;color:var(--muted);font-size:.88rem;line-height:1.45}.modal-open{overflow:hidden}.image-modal{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:22px}.image-modal-backdrop{position:absolute;inset:0;border:0;background:rgba(16,38,61,.72);cursor:pointer}.image-modal-panel{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:18px;width:min(1120px,96vw);max-height:92vh;border-radius:20px;background:white;padding:18px;box-shadow:0 28px 80px rgba(0,0,0,.35);overflow:auto}.image-modal-close{position:absolute;right:18px;top:18px;border:0;border-radius:999px;background:var(--navy);color:white;padding:9px 13px;cursor:pointer;font-weight:750}.image-modal-image{min-height:420px;border:1px solid var(--line);border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;padding:12px}.image-modal-image img{max-width:100%;max-height:78vh;width:auto;height:auto;object-fit:contain}.image-modal-info{padding:44px 6px 6px}.image-modal-info .modal-kicker{margin:0 0 8px;color:var(--blue);font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.image-modal-info h2{margin:0 0 10px;color:var(--navy);font-size:1.45rem}.image-modal-info h3{margin:18px 0 8px;color:var(--navy);font-size:1rem}.image-modal-info p{margin:0;color:var(--muted);line-height:1.6}.image-modal-info .modal-note{margin-top:14px;padding:12px;border-radius:12px;background:var(--soft);color:var(--ink);font-size:.92rem}.image-modal-info ul{margin:0;padding-left:18px;color:var(--ink);line-height:1.7}@media(max-width:760px){.lesson-image-gallery{grid-template-columns:1fr}.lesson-image-frame{height:210px}.image-modal{padding:10px}.image-modal-panel{grid-template-columns:1fr;width:96vw;max-height:94vh;padding:12px}.image-modal-close{right:12px;top:12px}.image-modal-image{min-height:260px}.image-modal-info{padding:4px}}</style></head>`;
  const html = rawHtml
    .replace(
      "</head>",
      injectedHead,
    )
    .replace("render();\n</script>", `${lessonVisualScript}render();\n</script>`);

  return (
    <main className="min-h-screen bg-white">
      <iframe
        className="h-screen w-full border-0 bg-white"
        sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
        srcDoc={html}
        title="Simulado de Neuroanatomofisiologia"
      />
    </main>
  );
}
