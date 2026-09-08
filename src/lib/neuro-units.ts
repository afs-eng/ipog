export type SummaryTable = {
  title: string;
  rows: { label: string; value: string }[];
};

export type NeuroTextQuestion = {
  prompt: string;
  options: string[];
  correctAnswer?: string;
  correctAnswers?: string[];
  explanation: string;
};

export type NeuroUnit = {
  slug: string;
  title: string;
  status: "incomplete" | "complete";
  duration: string;
  objectives: string[];
  videoTitle: string;
  videoDescription: string;
  videoText: string[];
  videoUrl: string;
  posterUrl: string;
  testCardImageUrl?: string;
  testImageItems?: { imageUrl: string; label: string }[];
  testImageUrls?: string[];
  testTextQuestions?: NeuroTextQuestion[];
  testDescription: string;
  worksheetText: string;
  atlasTitle: string;
  atlasDescription: string;
  atlasImageUrl: string;
  atlasItems: { title: string; imageUrl: string; description: string }[];
  atlasAccordionSections?: {
    title: string;
    items: { imageUrl: string; label: string; subtitle?: string; description?: string; synonyms?: string }[];
  }[];
  summaryTables: SummaryTable[];
};

const introEncefaloImageBaseUrl = "/conteudos/sistema-nervoso-central-introducao-ao-encefalo/imgs";
const introEncefaloTestImageFiles = [
  "Bulbo.png",
  "Cerebelo.png",
  "Corpo-caloso.png",
  "Cérebro.png",
  "Diencéfalo.png",
  "Hipófise.png",
  "Lobo-frontal.png",
  "Lobo-isular.png",
  "Lobo-límbico.png",
  "Lobo-occipital.png",
  "Lobo-parietal.png",
  "Lobo-temporal.png",
  "Mesencéfalo.png",
  "Ponte.png",
  "Quarto-ventrículo.png",
  "Terceiro ventrículo.png",
  "Tronco-encefálico.png",
  "Tálamo.png",
  "Ventrículo-lateral.png",
];
const introEncefaloTestImageItems = introEncefaloTestImageFiles.map((fileName) => ({
  imageUrl: `${introEncefaloImageBaseUrl}/${encodeURIComponent(fileName)}`,
  label: formatTestImageLabel(fileName),
}));
const introEncefaloTextQuestions: NeuroTextQuestion[] = [
  {
    prompt: "Onde está localizado o cerebelo?",
    options: ["Posterior ao tronco encefálico", "Superior ao diencéfalo", "Anterior ao lobo frontal", "Dentro dos ventrículos laterais"],
    correctAnswer: "Posterior ao tronco encefálico",
    explanation: "O cerebelo fica na fossa craniana posterior, atrás do tronco encefálico.",
  },
  {
    prompt: "O que o corpo caloso conecta?",
    options: ["Hemisférios cerebrais", "Cerebelo e ponte", "Bulbo e medula", "Hipófise e hipotálamo"],
    correctAnswer: "Hemisférios cerebrais",
    explanation: "O corpo caloso é uma grande comissura de substância branca que conecta os hemisférios cerebrais.",
  },
  {
    prompt: "Qual sulco separa o lobo frontal do lobo parietal?",
    options: ["Sulco central", "Sulco calcarino", "Sulco do cíngulo", "Sulco frontal superior"],
    correctAnswer: "Sulco central",
    explanation: "O sulco central é o limite anatômico entre os lobos frontal e parietal.",
  },
  {
    prompt: "O giro pré-central contém a principal área _____ do cérebro.",
    options: ["motora", "visual", "auditiva", "gustativa"],
    correctAnswer: "motora",
    explanation: "O giro pré-central abriga o córtex motor primário, responsável pelo controle voluntário dos movimentos.",
  },
  {
    prompt: "O giro pós-central contém a principal área _____.",
    options: ["somatossensorial", "motora", "visual", "olfatória"],
    correctAnswer: "somatossensorial",
    explanation: "O giro pós-central contém o córtex somatossensorial primário, relacionado às sensações corporais.",
  },
  {
    prompt: "Qual lobo está mais relacionado ao processamento visual primário?",
    options: ["Lobo occipital", "Lobo frontal", "Lobo temporal", "Lobo insular"],
    correctAnswer: "Lobo occipital",
    explanation: "O córtex visual primário está localizado no lobo occipital.",
  },
  {
    prompt: "Qual lobo contém áreas importantes para audição e memória?",
    options: ["Lobo temporal", "Lobo parietal", "Lobo occipital", "Lobo frontal"],
    correctAnswer: "Lobo temporal",
    explanation: "O lobo temporal participa do processamento auditivo e contém estruturas relacionadas à memória.",
  },
  {
    prompt: "Qual parte do encéfalo continua inferiormente com a medula espinal?",
    options: ["Bulbo", "Tálamo", "Cerebelo", "Corpo caloso"],
    correctAnswer: "Bulbo",
    explanation: "O bulbo é a porção inferior do tronco encefálico e continua com a medula espinal.",
  },
  {
    prompt: "Quais estruturas formam o tronco encefálico?",
    options: ["Mesencéfalo, ponte e bulbo", "Tálamo, hipotálamo e hipófise", "Cérebro, cerebelo e medula", "Lobos frontal, temporal e occipital"],
    correctAnswer: "Mesencéfalo, ponte e bulbo",
    explanation: "O tronco encefálico é formado por mesencéfalo, ponte e bulbo.",
  },
  {
    prompt: "Qual estrutura do diencéfalo é importante na retransmissão sensorial?",
    options: ["Tálamo", "Bulbo", "Ponte", "Cerebelo"],
    correctAnswer: "Tálamo",
    explanation: "O tálamo atua como estação de retransmissão para grande parte das informações sensoriais que chegam ao córtex.",
  },
  {
    prompt: "Qual região ajuda a regular equilíbrio e coordenação motora?",
    options: ["Cerebelo", "Tálamo", "Hipófise", "Corpo caloso"],
    correctAnswer: "Cerebelo",
    explanation: "O cerebelo participa da coordenação dos movimentos, postura e equilíbrio.",
  },
  {
    prompt: "Qual estrutura conecta o encéfalo à medula espinal?",
    options: ["Tronco encefálico", "Corpo caloso", "Lobo occipital", "Hipófise"],
    correctAnswer: "Tronco encefálico",
    explanation: "O tronco encefálico liga o encéfalo à medula espinal e conduz vias nervosas importantes.",
  },
  {
    prompt: "Qual divisão do encéfalo inclui o tálamo e o hipotálamo?",
    options: ["Diencéfalo", "Telencéfalo", "Metencéfalo", "Mielencéfalo"],
    correctAnswer: "Diencéfalo",
    explanation: "O diencéfalo inclui estruturas como tálamo, hipotálamo e epitálamo.",
  },
  {
    prompt: "Qual estrutura endócrina fica ligada ao hipotálamo?",
    options: ["Hipófise", "Ponte", "Cerebelo", "Bulbo"],
    correctAnswer: "Hipófise",
    explanation: "A hipófise fica conectada ao hipotálamo pelo infundíbulo e participa do controle hormonal.",
  },
  {
    prompt: "Qual lobo é mais associado a planejamento, tomada de decisão e movimento voluntário?",
    options: ["Lobo frontal", "Lobo occipital", "Lobo temporal", "Lobo parietal"],
    correctAnswer: "Lobo frontal",
    explanation: "O lobo frontal está relacionado a funções executivas e ao controle motor voluntário.",
  },
  {
    prompt: "Qual lobo participa da integração de sensações corporais?",
    options: ["Lobo parietal", "Lobo frontal", "Lobo occipital", "Lobo temporal"],
    correctAnswer: "Lobo parietal",
    explanation: "O lobo parietal participa da percepção somática e da integração sensorial.",
  },
  {
    prompt: "Qual cavidade contém líquido cefalorraquidiano dentro dos hemisférios cerebrais?",
    options: ["Ventrículos laterais", "Sulco central", "Corpo caloso", "Giro pré-central"],
    correctAnswer: "Ventrículos laterais",
    explanation: "Os ventrículos laterais são cavidades encefálicas preenchidas por líquido cefalorraquidiano.",
  },
  {
    prompt: "Qual ventrículo está associado ao diencéfalo?",
    options: ["Terceiro ventrículo", "Quarto ventrículo", "Ventrículo lateral", "Aqueduto cerebral"],
    correctAnswer: "Terceiro ventrículo",
    explanation: "O terceiro ventrículo fica na região do diencéfalo, entre os tálamos.",
  },
  {
    prompt: "Qual canal conecta o terceiro ao quarto ventrículo?",
    options: ["Aqueduto cerebral", "Sulco lateral", "Corpo caloso", "Fissura longitudinal"],
    correctAnswer: "Aqueduto cerebral",
    explanation: "O aqueduto cerebral atravessa o mesencéfalo e conecta o terceiro ao quarto ventrículo.",
  },
  {
    prompt: "Qual sistema está relacionado a emoção e memória?",
    options: ["Sistema límbico", "Sistema piramidal", "Sistema ventricular", "Sistema somático"],
    correctAnswer: "Sistema límbico",
    explanation: "O sistema límbico participa de respostas emocionais, memória e motivação.",
  },
  {
    prompt: "Qual parte do tronco encefálico fica entre o mesencéfalo e o bulbo?",
    options: ["Ponte", "Tálamo", "Hipófise", "Cerebelo"],
    correctAnswer: "Ponte",
    explanation: "A ponte ocupa a região média do tronco encefálico, entre mesencéfalo e bulbo.",
  },
  {
    prompt: "Qual parte do tronco encefálico fica superior à ponte?",
    options: ["Mesencéfalo", "Bulbo", "Cerebelo", "Hipófise"],
    correctAnswer: "Mesencéfalo",
    explanation: "O mesencéfalo é a porção superior do tronco encefálico.",
  },
  {
    prompt: "Qual fissura separa os dois hemisférios cerebrais?",
    options: ["Fissura longitudinal", "Sulco central", "Sulco calcarino", "Sulco lateral"],
    correctAnswer: "Fissura longitudinal",
    explanation: "A fissura longitudinal separa os hemisférios cerebrais direito e esquerdo.",
  },
  {
    prompt: "Qual substância forma principalmente o córtex cerebral?",
    options: ["Substância cinzenta", "Substância branca", "Líquor", "Osso compacto"],
    correctAnswer: "Substância cinzenta",
    explanation: "O córtex cerebral é formado principalmente por substância cinzenta, rica em corpos celulares neuronais.",
  },
  {
    prompt: "Qual substância forma grande parte das conexões internas do cérebro?",
    options: ["Substância branca", "Substância cinzenta", "Pia-máter", "Líquor"],
    correctAnswer: "Substância branca",
    explanation: "A substância branca contém feixes de axônios mielinizados que conectam áreas do sistema nervoso.",
  },
  {
    prompt: "O encéfalo e a medula espinal formam qual sistema?",
    options: ["Sistema nervoso central", "Sistema nervoso periférico", "Sistema endócrino", "Sistema límbico"],
    correctAnswer: "Sistema nervoso central",
    explanation: "O sistema nervoso central é formado pelo encéfalo e pela medula espinal.",
  },
  {
    prompt: "Qual estrutura protege o encéfalo externamente junto com as meninges?",
    options: ["Crânio", "Ponte", "Tálamo", "Ventrículo"],
    correctAnswer: "Crânio",
    explanation: "O encéfalo é protegido pelo crânio, pelas meninges e pelo líquido cefalorraquidiano.",
  },
  {
    prompt: "Qual fluido circula nos ventrículos encefálicos?",
    options: ["Líquido cefalorraquidiano", "Sangue venoso", "Linfa", "Plasma sináptico"],
    correctAnswer: "Líquido cefalorraquidiano",
    explanation: "O líquido cefalorraquidiano circula pelos ventrículos e pelo espaço subaracnóideo.",
  },
  {
    prompt: "Qual lobo fica posteriormente no cérebro?",
    options: ["Lobo occipital", "Lobo frontal", "Lobo insular", "Lobo temporal"],
    correctAnswer: "Lobo occipital",
    explanation: "O lobo occipital ocupa a região posterior do cérebro.",
  },
  {
    prompt: "Qual estrutura fica profunda ao sulco lateral?",
    options: ["Lobo insular", "Lobo occipital", "Cerebelo", "Bulbo"],
    correctAnswer: "Lobo insular",
    explanation: "A ínsula, ou lobo insular, fica profundamente localizada no interior do sulco lateral.",
  },
  {
    prompt: "Quais partes do tronco encefálico são adjacentes à ponte (selecione todas as que se aplicam)?",
    options: [
      "A medula espinal está localizada imediatamente abaixo da ponte",
      "O bulbo está localizado abaixo da ponte",
      "O cerebelo está localizado diretamente acima da ponte",
      "O mesencéfalo está localizado acima da ponte",
      "O mesencéfalo está localizado diretamente abaixo da ponte",
      "O bulbo está localizado diretamente acima da ponte",
    ],
    correctAnswers: ["O bulbo está localizado abaixo da ponte", "O mesencéfalo está localizado acima da ponte"],
    explanation: "A ponte fica entre o mesencéfalo, superiormente, e o bulbo, inferiormente.",
  },
  {
    prompt: "Quais estruturas pertencem ao tronco encefálico (selecione todas as que se aplicam)?",
    options: ["Mesencéfalo", "Ponte", "Bulbo", "Cerebelo", "Tálamo", "Corpo caloso"],
    correctAnswers: ["Mesencéfalo", "Ponte", "Bulbo"],
    explanation: "O tronco encefálico é composto por mesencéfalo, ponte e bulbo.",
  },
  {
    prompt: "Quais estruturas fazem parte do diencéfalo (selecione todas as que se aplicam)?",
    options: ["Tálamo", "Hipotálamo", "Epitálamo", "Cerebelo", "Ponte", "Lobo temporal"],
    correctAnswers: ["Tálamo", "Hipotálamo", "Epitálamo"],
    explanation: "O diencéfalo inclui tálamo, hipotálamo, epitálamo e estruturas relacionadas.",
  },
  {
    prompt: "Quais lobos fazem parte dos hemisférios cerebrais (selecione todas as que se aplicam)?",
    options: ["Lobo frontal", "Lobo parietal", "Lobo temporal", "Lobo occipital", "Lobo insular", "Bulbo"],
    correctAnswers: ["Lobo frontal", "Lobo parietal", "Lobo temporal", "Lobo occipital", "Lobo insular"],
    explanation: "Os hemisférios cerebrais incluem os lobos frontal, parietal, temporal, occipital e insular.",
  },
  {
    prompt: "Quais funções são associadas ao cerebelo (selecione todas as que se aplicam)?",
    options: ["Coordenação motora", "Equilíbrio", "Ajuste fino dos movimentos", "Produção hormonal", "Audição primária", "Formação do corpo caloso"],
    correctAnswers: ["Coordenação motora", "Equilíbrio", "Ajuste fino dos movimentos"],
    explanation: "O cerebelo participa da coordenação motora, do equilíbrio e do ajuste fino dos movimentos.",
  },
];

const snpImageBaseUrl = "/conteudos/sistema-nervoso-periferico-nervos-ganglios-e-plexos/imgs";
const snpAtlasItems = [
  {
    title: "Estrutura de um nervo",
    imageUrl: `${snpImageBaseUrl}/${encodeURIComponent("Estrutura de um nervo.png")}`,
    description:
      "Um nervo é formado por um feixe de axônios (ou fibras nervosas) fora do SNC. Essas fibras nervosas podem ser mielinizadas (revestidas por uma bainha de mielina) ou não-mielinizadas. Os nervos também são revestidos por tecido conjuntivo e possuem vasos para a sua irrigação (vasa nervorum). As três camadas de tecido conjuntivo são o epineuro, que reveste a superfície externa do nervo; o perineuro, que reveste cada fascículo nervoso (que é um grupo de axônios) e o endoneuro, que reveste cada axônio individualmente. Nervos espinais se originam da medula espinal na forma de raízes anteriores e posteriores, enquanto os nervos cranianos se originam do encéfalo.",
  },
  {
    title: "Tipos de nervos e gânglios",
    imageUrl: `${snpImageBaseUrl}/${encodeURIComponent("Tipos de nervos e gânglios.png")}`,
    description:
      "Nervos espinais possuem neurônios sensitivos e motores. Os neurônios sensitivos (ou aferentes) transportam informações da periferia até o SNC. Os axônios sensitivos entram na medula espinal através das raízes dorsais dos nervos espinais. Os corpos desses neurônios se localizam no gânglio espinal, que é um alargamento da raiz dorsal e é classificado como um gânglio sensitivo. Os neurônios motores (ou eferentes) transportam informações do SNC até a periferia. As fibras motoras, que podem ser somáticas ou autônomas se originam da medula espinal através das raízes ventrais. Os corpos desses neurônios se localizam na substância cinzenta da medula espinal. Impulsos autonômicos que inervam a musculatura lisa e cardíaca, bem como as células glandulares, são transmitidos através de fibras nervosas autonômicas pós-ganglionares. A sinapse entre esses dois tipos de neurônios ocorre no gânglio autonômico, onde os corpos dos neurônios pós-ganglionares estão localizados.",
  },
  {
    title: "Plexos espinais",
    imageUrl: `${snpImageBaseUrl}/${encodeURIComponent("Plexos espinais.png")}`,
    description:
      "Os plexos espinais são formados pelos ramos anteriores dos nervos espinais. O plexo cervical (C1-C4) dá origem a nervos para a cabeça e o pescoço, o plexo braquial (C5-T1) dá origem a nervos para o membro superior, o plexo lombar (T12-L5) dá origem a nervos para a região anterior do membro inferior e o plexo sacral (S1-S4) dá origem a nervos para a região posterior do membro inferior. O plexo coccígeo (S4-S5, Co1 - não mostrado na ilustração) fornece nervos para as regiões pélvica e coccígea.",
  },
];
const snpStructureItems = [
  {
    fileName: "Nervo espinal﻿.png",
    label: "Nervo espinal﻿",
    subtitle: "Nervus spinalis﻿",
    synonyms: "Nervo espinhal, Nervo raquidiano",
  },
  {
    fileName: "Raiz anterior do nervo espinal﻿.png",
    label: "Raiz anterior do nervo espinal﻿",
    subtitle: "Radix anterior nervi spinalis﻿",
    synonyms: "Raiz motora do nervo espinal, Raiz motora do nervo espinhal, Raiz anterior do nervo espinhal, Raiz ventral do nervo espinhal, Raiz ventral do nervo espinal, Radix motoria nervi spinalis, Radix ventralis nervi spinalis",
  },
  {
    fileName: "Raiz posterior do nervo espinal﻿.png",
    label: "Raiz posterior do nervo espinal﻿",
    subtitle: "Radix posterior nervi spinalis﻿",
    synonyms: "Raiz sensitiva do nervo espinhal, Raiz sensitiva do nervo espinal, Raiz posterior do nervo espinhal, Raiz posterior do nervo espinal, Raiz dorsal do nervo espinhal, Raiz dorsal do nervo espinal, Radix sensoria nervi spinalis, Radix dorsalis nervi spinalis",
  },
  {
    fileName: "Gânglio espinal﻿.png",
    label: "Gânglio espinal﻿",
    subtitle: "Ganglion spinale﻿",
    synonyms: "Gânglio espinhal, Gânglio da raiz dorsal, Gânglio sensorial espinal, Gânglio dorsal raquidiano, Ganglion sensorium nervi spinalis",
  },
  {
    fileName: "Epineuro﻿.png",
    label: "Epineuro﻿",
    subtitle: "Epineurium﻿",
    synonyms: "Nenhum",
  },
  {
    fileName: "Fascículo nervoso﻿.png",
    label: "Fascículo nervoso﻿",
    subtitle: "Fasciculus nervi﻿",
    synonyms: "Fasciculus neurofibrarum periphericarum",
  },
  {
    fileName: "Bainha de mielina﻿.png",
    label: "Bainha de mielina﻿",
    subtitle: "Stratum myelini﻿",
    synonyms: "Nenhum",
  },
  {
    fileName: "Axônio periférico mielínico﻿.png",
    label: "Axônio periférico mielínico﻿",
    subtitle: "Axon myelinatum periphericum﻿",
    synonyms: "Fibra nervosa periférica mielinizada, Axônio periférico mielinizado, Neurofibra myelinata peripherica",
  },
  {
    fileName: "Axônio periférico amielínico﻿.png",
    label: "Axônio periférico amielínico﻿",
    subtitle: "Axon nonmyelinatum periphericum﻿",
    synonyms: "Axônio periférico não mielinizado, Fibra nervosa periférica amielínica, Fibra nervosa periférica não mielinizada, Neurofibra non myelinata peripherica",
  },
  {
    fileName: "Perineuro﻿.png",
    label: "Perineuro﻿",
    subtitle: "Perineurium﻿",
    synonyms: "Nenhum",
  },
  {
    fileName: "Endoneuro﻿.png",
    label: "Endoneuro﻿",
    subtitle: "Endoneurium﻿",
    synonyms: "Nenhum",
  },
  {
    fileName: "Vasa nervorum﻿.png",
    label: "Vasa nervorum﻿",
    synonyms: "Nenhum",
  },
];
const snpStructureAtlasItems = snpStructureItems.map((item) => ({
  imageUrl: `${snpImageBaseUrl}/Estruturas%20do%20SNP/${encodeURIComponent(item.fileName)}`,
  label: item.label,
  subtitle: item.subtitle,
  synonyms: item.synonyms,
}));
const snpTestImageItems = [
  ...snpAtlasItems.map((item) => ({ imageUrl: item.imageUrl, label: item.title })),
  ...snpStructureAtlasItems.map((item) => ({ imageUrl: item.imageUrl, label: item.label })),
];
const snpAccordionSections = [
  {
    title: "Estruturas do SNP",
    items: snpStructureAtlasItems,
  },
  {
    title: "Tipos de nervos e gânglios",
    items: [
      {
        imageUrl: `${snpImageBaseUrl}/${encodeURIComponent("Tipos de nervos e gânglios.png")}`,
        label: "Gânglio espinal",
        synonyms: "Gânglio espinhal, Gânglio da raiz dorsal",
      },
      ...snpStructureAtlasItems.filter((item) =>
        ["Nervo espinal﻿", "Raiz anterior do nervo espinal﻿", "Raiz posterior do nervo espinal﻿", "Gânglio espinal﻿"].includes(item.label),
      ),
    ],
  },
  {
    title: "Plexos nervosos espinais",
    items: [
      {
        imageUrl: `${snpImageBaseUrl}/${encodeURIComponent("Plexos espinais.png")}`,
        label: "Sistema nervoso periférico",
        synonyms: "Pars peripherica systematis nervosi",
      },
      ...snpStructureAtlasItems.filter((item) =>
        ["Nervo espinal﻿", "Raiz anterior do nervo espinal﻿", "Raiz posterior do nervo espinal﻿"].includes(item.label),
      ),
    ],
  },
];

const snpTextQuestions: NeuroTextQuestion[] = [
  {
    prompt: "O que forma um nervo periférico?",
    options: ["Feixes de axônios fora do SNC", "Corpos celulares no córtex", "Somente substância cinzenta", "Ventrículos com líquor"],
    correctAnswer: "Feixes de axônios fora do SNC",
    explanation: "Um nervo periférico é formado por feixes de axônios, também chamados de fibras nervosas, fora do sistema nervoso central.",
  },
  {
    prompt: "Quais camadas de tecido conjuntivo revestem um nervo (selecione todas as que se aplicam)?",
    options: ["Epineuro", "Perineuro", "Endoneuro", "Pia-máter", "Aracnoide", "Dura-máter"],
    correctAnswers: ["Epineuro", "Perineuro", "Endoneuro"],
    explanation: "As três camadas de tecido conjuntivo do nervo são epineuro, perineuro e endoneuro.",
  },
  {
    prompt: "Qual estrutura contém corpos celulares de neurônios sensitivos?",
    options: ["Gânglio espinal", "Plexo braquial", "Epineuro", "Raiz ventral"],
    correctAnswer: "Gânglio espinal",
    explanation: "O gânglio espinal é um gânglio sensitivo e contém corpos celulares de neurônios sensitivos.",
  },
  {
    prompt: "Quais plexos dão origem a nervos para membros (selecione todas as que se aplicam)?",
    options: ["Plexo braquial", "Plexo lombar", "Plexo sacral", "Plexo cervical", "Corpo caloso", "Tálamo"],
    correctAnswers: ["Plexo braquial", "Plexo lombar", "Plexo sacral"],
    explanation: "O plexo braquial inerva o membro superior, enquanto os plexos lombar e sacral inervam regiões do membro inferior.",
  },
];

const cerebroImageBaseUrl = "/neuroanatomofisiologia";
const cerebroAtlasItems = [
  {
    title: "Lobos do cérebro",
    imageUrl: `${cerebroImageBaseUrl}/encefalo-slide-5-image-1.png`,
    description:
      "Representação dos lobos cerebrais e das principais relações anatômicas observadas em corte sagital.",
  },
  {
    title: "Corte sagital do encéfalo",
    imageUrl: `${cerebroImageBaseUrl}/encefalo-slide-7-image-1.jpeg`,
    description:
      "Vista medial do encéfalo, útil para reconhecer córtex cerebral, corpo caloso, diencéfalo, tronco encefálico e cerebelo.",
  },
  {
    title: "Áreas motoras do córtex cerebral",
    imageUrl: `${cerebroImageBaseUrl}/encefalo-slide-39-image-1.png`,
    description:
      "Áreas motoras relacionadas ao planejamento e à execução do movimento voluntário.",
  },
];
const cerebroTestImageItems = cerebroAtlasItems.map((item) => ({
  imageUrl: item.imageUrl,
  label: item.title,
}));
const cerebroAccordionSections = [
  {
    title: "Estrutura do cérebro",
    items: [
      {
        imageUrl: `${cerebroImageBaseUrl}/encefalo-slide-7-image-1.jpeg`,
        label: "Hemisférios cerebrais",
        description:
          "O cérebro é formado por dois hemisférios conectados pelo corpo caloso. Sua superfície apresenta giros e sulcos que aumentam a área cortical.",
      },
      {
        imageUrl: `${cerebroImageBaseUrl}/encefalo-slide-5-image-1.png`,
        label: "Lobos cerebrais",
        description:
          "Cada hemisfério apresenta lobos frontal, parietal, temporal, occipital, insular e límbico. O lobo insular fica profundo ao sulco lateral e é coberto pelo opérculo.",
      },
      {
        imageUrl: `${cerebroImageBaseUrl}/encefalo-slide-4-image-1.jpeg`,
        label: "Cérebro, diencéfalo, cerebelo e tronco encefálico",
        description:
          "Visão geral das principais partes do encéfalo e suas relações anatômicas.",
      },
    ],
  },
  {
    title: "Substância cinzenta cerebral: áreas funcionais",
    items: [
      {
        imageUrl: `${cerebroImageBaseUrl}/encefalo-slide-39-image-1.png`,
        label: "Área motora primária",
        description:
          "Localizada no giro pré-central do lobo frontal, participa do planejamento e da execução do movimento voluntário.",
      },
      {
        imageUrl: `${cerebroImageBaseUrl}/encefalo-slide-40-image-1.png`,
        label: "Córtex motor",
        description:
          "Inclui córtex motor primário, área pré-motora e área motora suplementar.",
      },
      {
        imageUrl: `${cerebroImageBaseUrl}/encefalo-slide-46-image-1.png`,
        label: "Áreas de Brodmann",
        description:
          "Mapa funcional que relaciona regiões corticais a funções motoras, sensitivas, visuais, auditivas, de linguagem e associação.",
      },
    ],
  },
  {
    title: "Substância branca cerebral",
    items: [
      {
        imageUrl: `${cerebroImageBaseUrl}/encefalo-slide-7-image-2.jpeg`,
        label: "Substância branca profunda",
        description:
          "A substância branca cerebral fica profundamente ao córtex e é composta por axônios que conectam diferentes áreas do cérebro.",
      },
      {
        imageUrl: `${cerebroImageBaseUrl}/encefalo-slide-38-image-1.png`,
        label: "Tratos e conexões cerebrais",
        description:
          "As fibras nervosas podem formar feixes de associação, projeção e comissurais, permitindo a transferência de informações entre regiões corticais e subcorticais.",
      },
    ],
  },
];
const cerebroTextQuestions: NeuroTextQuestion[] = [
  {
    prompt: "Qual estrutura conecta os dois hemisférios cerebrais?",
    options: ["Corpo caloso", "Ponte", "Bulbo", "Cerebelo"],
    correctAnswer: "Corpo caloso",
    explanation: "Os hemisférios cerebrais são conectados por um grande feixe de substância branca chamado corpo caloso.",
  },
  {
    prompt: "Quais lobos fazem parte do cérebro (selecione todas as que se aplicam)?",
    options: ["Frontal", "Temporal", "Parietal", "Occipital", "Insular", "Bulbo"],
    correctAnswers: ["Frontal", "Temporal", "Parietal", "Occipital", "Insular"],
    explanation: "Os principais lobos cerebrais incluem frontal, temporal, parietal, occipital e insular; o lobo límbico também é descrito por alguns autores.",
  },
  {
    prompt: "O córtex cerebral é formado principalmente por qual tipo de substância?",
    options: ["Substância cinzenta", "Substância branca", "Líquor", "Osso compacto"],
    correctAnswer: "Substância cinzenta",
    explanation: "O córtex cerebral forma a superfície externa de cada hemisfério e é formado por substância cinzenta.",
  },
  {
    prompt: "Onde fica a área motora primária?",
    options: ["Giro pré-central", "Giro pós-central", "Lobo occipital", "Hipocampo"],
    correctAnswer: "Giro pré-central",
    explanation: "A área motora primária fica no giro pré-central do lobo frontal e participa da execução do movimento voluntário.",
  },
];

export const neuroUnits: NeuroUnit[] = [
  {
    slug: "sistema-nervoso-central-introducao-ao-encefalo",
    title: "Sistema nervoso central (SNC): Introdução ao encéfalo",
    status: "incomplete",
    duration: "10 minutos",
    objectives: [
      "Nomear as 3 partes principais do encéfalo.",
      "Identificar os componentes estruturais básicos de cada parte principal: o cérebro, o cerebelo e o tronco encefálico.",
      "Descrever as funções básicas do cérebro, cerebelo e tronco encefálico.",
    ],
    videoTitle: "Introdução ao encéfalo",
    videoDescription: "Anatomia básica e funções do encéfalo.",
    videoText: [
      "O encéfalo é parte integrante do sistema nervoso central. Ele contém três partes principais: o cérebro, cerebelo e tronco cerebral. O cérebro é a maior parte do encéfalo. É responsável por funções corporais superiores, como visão, audição, cognição, emoções, aprendizagem e controle fino do movimento.",
      "O cerebelo fica abaixo do cérebro. Ele regula funções motoras como equilíbrio, coordenação e fala. O tronco cerebral conecta o cérebro à medula espinal. Ele controla as funções corporais mais básicas, como respiração e frequência cardíaca.",
    ],
    videoUrl: "https://drive.google.com/file/d/1KcSL3ESv7OFjlA2XdbRuogN_xOhHgue3/preview",
    posterUrl: "/conteudos/sistema-nervoso-central-introducao-ao-encefalo/imgs/video-poster.png",
    testCardImageUrl: "/conteudos/sistema-nervoso-central-introducao-ao-encefalo/imgs/Lobo-occipital.png",
    testImageItems: introEncefaloTestImageItems,
    testImageUrls: introEncefaloTestImageItems.map((item) => item.imageUrl),
    testTextQuestions: introEncefaloTextQuestions,
    testDescription:
      "Agora que você já assistiu à videoaula e aprendeu sobre as diferentes partes do encéfalo, teste seus conhecimentos sobre a anatomia básica e a função do cérebro.",
    worksheetText:
      "Clique abaixo para fazer download das apostilas em PDF com ilustrações do encéfalo para nomear.",
    atlasTitle: "Visão geral do encéfalo",
    atlasDescription:
      "O encéfalo é formado por três partes principais: cérebro, cerebelo e tronco encefálico. O cérebro é a maior e mais superior parte do encéfalo. Ele é organizado em dois hemisférios que estão conectados por um grande feixe de substância branca chamado de corpo caloso. Cada hemisfério do cérebro possui várias cristas de tecido chamadas de giros, que são separadas por sulcos. Os giros e sulcos aumentam a área de superfície do cérebro, dando a ele sua aparência típica. O cerebelo localiza-se inferiormente ao lobo occipital do cérebro. Ele também possui dois hemisférios que são conectados pelo vérmis. O tronco encefálico é a parte mais caudal do encéfalo. Ele é formado pelo mesencéfalo, pela ponte e pelo bulbo, cada um dos quais tendo sua própria organização estrutural e funcional.",
    atlasImageUrl: "/conteudos/sistema-nervoso-central-introducao-ao-encefalo/imgs/atlas-principal.png",
    atlasItems: [
      {
        title: "Cérebro",
        imageUrl: "/conteudos/sistema-nervoso-central-introducao-ao-encefalo/imgs/cerebro.png",
        description: "Maior parte do encéfalo, relacionada a funções superiores.",
      },
      {
        title: "Cerebelo",
        imageUrl: "/conteudos/sistema-nervoso-central-introducao-ao-encefalo/imgs/cerebelo.png",
        description: "Regula equilíbrio, coordenação e fala.",
      },
      {
        title: "Tronco encefálico",
        imageUrl: "/conteudos/sistema-nervoso-central-introducao-ao-encefalo/imgs/tronco-encefalico.png",
        description: "Conecta o cérebro à medula espinal e controla funções vitais.",
      },
    ],
    summaryTables: [
      {
        title: "Informações importantes",
        rows: [
          {
            label: "Partes do encéfalo",
            value: "Cérebro, cerebelo, tronco encefálico.",
          },
          {
            label: "Componentes estruturais das partes do encéfalo",
            value:
              "Cérebro: lobos frontal, temporal, parietal, occipital e ínsula. Cerebelo: vermis e hemisférios cerebelares. Tronco cerebral: bulbo, ponte e mesencéfalo.",
          },
          {
            label: "Funções básicas das partes do encéfalo",
            value:
              "Cérebro: funções corporais nobres, cognição, emoções, aprendizado e movimentos voluntários. Cerebelo: funções motoras como equilíbrio, coordenação e fala. Tronco encefálico: funções corporais básicas, como respiração e frequência cardíaca.",
          },
        ],
      },
    ],
  },
  {
    slug: "telencefalo",
    title: "Visão geral do cérebro",
    status: "incomplete",
    duration: "10 minutos",
    objectives: [
      "Entender a estrutura do cérebro.",
      "Identificar os seis lobos do cérebro.",
      "Conhecer o córtex cerebral e suas áreas.",
      "Listar alguns tratos de substância branca do cérebro.",
    ],
    videoTitle: "Introdução ao cérebro",
    videoDescription: "Introdução ao cérebro, a maior parte do encéfalo.",
    videoText: [
      "O encéfalo é composto por três partes principais: o cérebro, o cerebelo e o tronco cerebral. O córtex cerebral é organizado em dois hemisférios, que são conectados por um grande feixe de substância branca chamado corpo caloso. A superfície externa do cérebro exibe muitas saliências elevadas chamadas giros, que são separadas umas das outras por sulcos. Os giros e sulcos aumentam a área de superfície do cérebro, proporcionando-lhe sua característica aparência convolucionada.",
      "Cada hemisfério cerebral contém seis lobos: frontal, temporal, parietal, occipital, insular (ínsula) e límbico. Alguns autores não consideram o lobo límbico como um lobo anatômico verdadeiro. Para esses autores o cérebro possui apenas cinco lobos. O lobo insular (ínsula) está localizado internamente ao sulco lateral e, portanto, não é visível na superfície do cérebro. Ele é coberto por partes dos lobos parietal, temporal e frontal. Essas partes destes lobos que cobre a ínsula são conhecidas coletivamente como opérculo (que em latim significa literalmente \"cobertura\").",
      "O córtex cerebral forma a superfície externa de cada hemisfério. Ele é formado por substância cinzenta, e é a parte mais complexa do cérebro. Funcionalmente, o córtex pode ser dividido em três áreas principais:",
      "Área motora primária, que está envolvida no planejamento e execução do movimento\nÁreas sensoriais primárias, que recebem e processam estímulos sensoriais\nÁreas de associação, que servem para integrar informações de várias estruturas/áreas",
      "Profundamente ao córtex cerebral (ou seja, à substância cinzenta que contém os corpos dos neurônios) está a substância branca cerebral, que é composta por axônios de neurônios que se estendem entre diferentes áreas do cérebro. A maioria dessas fibras nervosas é envolta por um tipo de bainha/envelope gorduroso chamado bainha de mielina, que dá à substância branca sua cor característica. Enquanto a substância cinzenta facilita o processamento de informações, a substância branca desempenha o importante papel de permitir a transferência de informações.",
      "A videoaula abaixo é uma introdução ao estudo do cérebro:",
    ],
    videoUrl: "https://drive.google.com/file/d/1bBl_9gTEMWoT0coK9hEWIs-nGyHyu-ng/preview",
    posterUrl: `${cerebroImageBaseUrl}/encefalo-slide-7-image-1.jpeg`,
    testCardImageUrl: `${cerebroImageBaseUrl}/encefalo-slide-7-image-1.jpeg`,
    testImageItems: cerebroTestImageItems,
    testImageUrls: cerebroTestImageItems.map((item) => item.imageUrl),
    testTextQuestions: cerebroTextQuestions,
    testDescription:
      "Complete o teste a seguir para avaliar seus conhecimentos sobre os lobos e principais sulcos e giros do cérebro. Você também pode revisar a localização das áreas funcionais do cérebro.",
    worksheetText: "",
    atlasTitle: "Visão geral do cérebro",
    atlasDescription:
      "Estude as estruturas do cérebro nas galerias abaixo. Comece pela visão geral dos lobos, depois expanda cada seção para revisar estrutura, substância cinzenta funcional e substância branca cerebral.",
    atlasImageUrl: cerebroAtlasItems[0].imageUrl,
    atlasItems: cerebroAtlasItems,
    atlasAccordionSections: cerebroAccordionSections,
    summaryTables: [
      {
        title: "Informações importantes sobre os lobos e áreas do cérebro",
        rows: [
          {
            label: "Lobo frontal",
            value:
              "Anterior ao sulco central e superior ao sulco lateral. Relacionado ao movimento voluntário, atenção, memória de curto prazo, motivação, planejamento, fala e comportamento.",
          },
          {
            label: "Lobo parietal",
            value:
              "Posterior ao sulco central. Participa do processamento de estímulos somatossensoriais, integração sensorial, percepção visuoespacial e linguagem.",
          },
          {
            label: "Lobo temporal",
            value:
              "Inferior ao sulco lateral. Relacionado à audição, memória visual, compreensão da linguagem e decodificação de estímulos sensoriais.",
          },
          {
            label: "Lobo occipital",
            value: "Posterior aos lobos parietal e temporal. Principal centro cortical para processamento visual.",
          },
          {
            label: "Lobo insular",
            value:
              "Profundo aos lobos temporal, parietal e frontal. Participa da gustação, sensibilidade visceral, funções vestibulares e integração sensorial.",
          },
          {
            label: "Lobo límbico",
            value:
              "Localizado na superfície medial de cada hemisfério. Relacionado à modulação das emoções, funções viscerais e autonômicas, aprendizagem e memória.",
          },
          {
            label: "Áreas funcionais",
            value:
              "Incluem áreas motoras, somatossensoriais, visuais, auditivas, olfatórias, gustativas, vestibulares, pré-motoras, de associação, área de Broca e área de Wernicke.",
          },
        ],
      },
    ],
  },
  {
    slug: "sistema-nervoso-periferico-nervos-ganglios-e-plexos",
    title: "Sistema nervoso periférico (SNP): Nervos, gânglios e plexos",
    status: "incomplete",
    duration: "10 minutos",
    objectives: [
      "Compreender o que é o sistema nervoso periférico e qual é a sua função.",
      "Descrever os componentes anatômicos e funcionais do sistema nervoso periférico.",
    ],
    videoTitle: "Sistema nervoso periférico",
    videoDescription: "Introdução aos nervos, gânglios e plexos.",
    videoText: [],
    videoUrl: "",
    posterUrl: snpAtlasItems[0].imageUrl,
    testCardImageUrl: snpAtlasItems[0].imageUrl,
    testImageItems: snpTestImageItems,
    testImageUrls: snpTestImageItems.map((item) => item.imageUrl),
    testTextQuestions: snpTextQuestions,
    testDescription: "Teste seus conhecimentos sobre nervos, gânglios e plexos do sistema nervoso periférico.",
    worksheetText: "",
    atlasTitle: "Nervos, gânglios e plexos",
    atlasDescription:
      "O sistema nervoso periférico (SNP) é formado por todas as estruturas nervosas que não se encontram no encéfalo e na medula espinal. Ele é funcionalmente dividido no sistema nervoso somático (voluntário) e no sistema nervoso autônomo (involuntário), sendo que o autônomo é subdividido no sistema nervoso simpático, no sistema nervoso parassimpático e no sistema nervoso entérico.\n\nO SNP é formado por todos os nervos, gânglios e plexos nervosos do corpo. Um nervo é formado por um feixe de fibras nervosas (axônios), pelo tecido conjuntivo que reveste essas fibras e pelos vasos sanguíneos que as irrigam. As fibras nervosas que transportam informações da periferia para o SNC são chamadas de aferentes ou sensitivas, enquanto aquelas que transmitem impulsos do SNC para a periferia são chamadas de eferentes ou motoras.\n\nOs nervos também são classificados de acordo com o local de origem no SNC. Os nervos cranianos se originam no encéfalo, enquanto os nervos espinais emergem da medula espinal. Existem 12 pares de nervos cranianos e 31 pares de nervos espinais. Os nervos que só contêm fibras do sistema nervoso autônomo são chamados de nervos autonômicos ou viscerais.\n\nUm gânglio é um grupo de corpos celulares de neurônios encontrado fora do SNC. Existem dois tipos principais de gânglios: os gânglios sensitivos, que contêm os corpos celulares dos neurônios responsáveis pelo envio de informações da periferia para o SNC, e os gânglios autonômicos, que incluem os gânglios simpáticos (próximos da medula espinal) e parassimpáticos (próximos dos órgãos).\n\nFinalmente, um plexo é uma rede de ramos nervosos que se interconectam. Existem dois tipos principais de plexos: os plexos nervosos espinais, que são formados pelos cruzamentos das subdivisões dos ramos anteriores ou ventrais dos nervos espinais, e os plexos autonômicos, que podem ser encontrados no tórax, abdome e pelve, e são responsáveis pela regulação da atividade dos órgãos.\n\nQuer compreender melhor o sistema nervoso periférico? Explore nossas imagens a seguir:",
    atlasImageUrl: snpAtlasItems[0].imageUrl,
    atlasItems: snpAtlasItems,
    atlasAccordionSections: snpAccordionSections,
    summaryTables: [
      {
        title: "Informações importantes",
        rows: [
          { label: "Componentes do SNP", value: "Nervos, gânglios e plexos nervosos." },
          { label: "Tipos de fibras", value: "Aferentes ou sensitivas; eferentes ou motoras." },
          { label: "Plexos espinais", value: "Cervical, braquial, lombar, sacral e coccígeo." },
        ],
      },
    ],
  },
];

export function getNeuroUnit(slug?: string) {
  return neuroUnits.find((unit) => unit.slug === slug);
}

function formatTestImageLabel(fileName: string) {
  return fileName
    .replace(/\.png$/i, "")
    .replaceAll("-", " ");
}
