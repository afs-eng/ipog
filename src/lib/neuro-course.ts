export type NeuroLesson = {
  title: string;
  description: string;
  materialSlug?: string;
  topicSlug?: string;
};

export type NeuroCourseSection = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  lessons: NeuroLesson[];
};

export const neuroCourseSections: NeuroCourseSection[] = [
  {
    id: "visao-geral",
    title: "Visão geral",
    description: "Uma introdução aos sistemas nervosos central e periférico.",
    imageUrl: "/neuroanatomofisiologia/introducao-a-anatomia-slide-1-image-1.jpeg",
    lessons: [
      {
        title: "Sistema nervoso central (SNC): Introdução ao encéfalo",
        description: "Anatomia básica e função do encéfalo.",
        materialSlug: "encefalo",
        topicSlug: "sistema-nervoso-central-introducao-ao-encefalo",
      },
      {
        title: "Sistema nervoso periférico (SNP): Nervos, gânglios e plexos",
        description: "Introdução ao sistema nervoso periférico.",
        materialSlug: "neuronios-e-sinapse",
        topicSlug: "sistema-nervoso-periferico-nervos-ganglios-e-plexos",
      },
    ],
  },
  {
    id: "cerebro",
    title: "Cérebro",
    description: "Os hemisférios cerebrais formam a maior parte do cérebro. O córtex é responsável por funções motoras, sensoriais e cognitivas.",
    imageUrl: "/neuroanatomofisiologia/encefalo-slide-7-image-1.jpeg",
    lessons: [
      { title: "Visão geral do cérebro", description: "Visão geral das substâncias branca e cinzenta do cérebro.", materialSlug: "encefalo", topicSlug: "telencefalo" },
      { title: "Vista lateral do encéfalo", description: "Estruturas observadas na vista lateral do encéfalo." },
      { title: "Vista medial do encéfalo", description: "Estruturas observadas em vista medial de um corte sagital do encéfalo." },
      { title: "Vista inferior do encéfalo", description: "Estruturas observadas na vista inferior do encéfalo." },
      { title: "Áreas de Brodmann", description: "Visão geral das áreas de Brodmann do córtex cerebral." },
      { title: "Homúnculo motor e sensitivo", description: "Representação motora e sensitiva do corpo humano no córtex cerebral." },
      { title: "Hipocampo, fórnix e corpo amigdaloide", description: "Introdução ao hipocampo, ao fórnix e ao corpo amigdaloide." },
      { title: "Núcleos da base", description: "Anatomia e funções dos gânglios da base." },
      { title: "Corte transversal do encéfalo", description: "Estruturas observadas em corte transversal do cérebro." },
      { title: "Vista coronal do encéfalo", description: "Estruturas internas do cérebro vistas ao nível do tálamo." },
    ],
  },
  {
    id: "diencefalo",
    title: "Diencéfalo",
    description: "O diencéfalo forma a parte caudal do prosencéfalo, e tem um papel importante nas funções motora e cognitiva.",
    imageUrl: "/neuroanatomofisiologia/encefalo-slide-30-image-1.jpg",
    lessons: [
      { title: "Visão geral do diencéfalo", description: "Introdução ao diencéfalo e estruturas relacionadas." },
      { title: "Tálamo", description: "Introdução ao tálamo, suas funções e estruturas adjacentes." },
      { title: "Núcleos do tálamo", description: "Introdução aos núcleos do tálamo." },
      { title: "Hipotálamo", description: "Localização, relações anatômicas e funções do hipotálamo." },
      { title: "Hipófise", description: "Introdução à glândula hipófise." },
    ],
  },
  {
    id: "cerebelo",
    title: "Cerebelo",
    description: "O cerebelo é responsável pela coordenação dos movimentos.",
    imageUrl: "/neuroanatomofisiologia/cerebelo-e-tronco-encefalico-slide-4-image-1.jpg",
    lessons: [
      { title: "Córtex cerebelar", description: "Vista anterior e superior do cerebelo." },
      { title: "Núcleos do cerebelo", description: "Núcleos profundos do cerebelo." },
    ],
  },
  {
    id: "tronco-encefalico",
    title: "Tronco encefálico",
    description: "O tronco encefálico consiste em medula oblongata, ponte e mesencéfalo.",
    imageUrl: "/neuroanatomofisiologia/cerebelo-e-tronco-encefalico-slide-17-image-1.gif",
    lessons: [
      { title: "Introdução e anatomia de superfície do tronco encefálico", description: "Visão geral das partes e marcos anatômicos do tronco encefálico." },
      { title: "Estrutura interna do bulbo", description: "Visão geral da estrutura anatômica interna do bulbo." },
      { title: "Núcleos dos nervos cranianos", description: "Visão geral dos núcleos cranianos no tronco encefálico." },
    ],
  },
  {
    id: "meninges-sistema-ventricular-espaco-subaracnoideo",
    title: "Meninges, sistema ventricular e espaço subaracnóideo",
    description: "Neste capítulo exploramos as meninges, os espaços subaracnóideos e os ventrículos do encéfalo.",
    imageUrl: "/neuroanatomofisiologia/meninges-e-ventriculos-slide-2-image-1.gif",
    lessons: [
      { title: "Meninges do encéfalo", description: "Anatomia e estrutura das meninges do encéfalo." },
      { title: "Ventrículos do encéfalo", description: "Anatomia do sistema ventricular do encéfalo." },
      { title: "Produção e circulação de líquido cefalorraquidiano", description: "Introdução ao líquido cefalorraquidiano e suas vias de circulação." },
    ],
  },
  {
    id: "vasos-sanguineos-do-encefalo",
    title: "Vasos sanguíneos do encéfalo",
    description: "Introdução às artérias e veias do encéfalo.",
    imageUrl: "/neuroanatomofisiologia/encefalo-slide-17-image-1.jpeg",
    lessons: [
      { title: "Artérias do encéfalo", description: "Introdução às artérias do encéfalo." },
      { title: "Veias do encéfalo", description: "Introdução às veias do encéfalo." },
      { title: "Seios venosos durais", description: "Introdução aos seios venosos durais." },
    ],
  },
  {
    id: "medula-espinal",
    title: "Medula espinal",
    description: "A medula espinal e o encéfalo formam o SNC. Este capítulo aborda a anatomia da medula espinal.",
    imageUrl: "/neuroanatomofisiologia/medula-espinal-slide-11-image-1.jpeg",
    lessons: [
      { title: "Topografia e morfologia da medula espinal", description: "Introdução à morfologia externa e à topografia da medula espinal." },
      { title: "Meninges espinais e raízes nervosas", description: "Introdução às camadas meníngeas e raízes nervosas da medula espinal." },
      { title: "Morfologia interna da medula espinal", description: "Visão geral da morfologia interna e estrutura da medula espinal." },
      { title: "Nervos espinais", description: "Explore a estrutura anatômica e a formação dos nervos espinais." },
      { title: "Vascularização da medula espinal", description: "Artérias e veias da medula espinal." },
    ],
  },
  {
    id: "vias-do-sistema-nervoso",
    title: "Vias do sistema nervoso",
    description: "Os principais tratos motores e sensoriais do Sistema Nervoso Central.",
    imageUrl: "/neuroanatomofisiologia/neuronios-e-sinapse-slide-34-image-1.jpeg",
    lessons: [
      { title: "Tratos piramidais", description: "As vias motoras mais importantes do SNC." },
      { title: "Via coluna dorsal / lemnisco medial (CDLM)", description: "Esta é a principal via ascendente sensitiva do sistema nervoso." },
      { title: "Via gustativa", description: "Via neural do sabor." },
    ],
  },
  {
    id: "nervos-cranianos",
    title: "Nervos cranianos",
    description: "Os doze nervos cranianos emergem do cérebro e tronco encefálico e transmitem informações entre o encéfalo e o corpo.",
    imageUrl: "/neuroanatomofisiologia/cerebelo-e-tronco-encefalico-slide-31-image-1.jpeg",
    lessons: [
      { title: "Nervos cranianos", description: "Visão geral dos 12 nervos cranianos." },
      { title: "Nervo olfatório (NC I)", description: "Visão geral do nervo olfatório e seu trajeto." },
      { title: "Nervo óptico (NC II)", description: "Visão geral do nervo óptico e da via visual." },
      { title: "Nervos oculomotor, troclear e abducente (NC III, IV & VI)", description: "Visão geral dos nervos cranianos associados aos movimentos oculares." },
      { title: "Nervo oftálmico (NC V1)", description: "Visão geral do nervo oftálmico." },
      { title: "Nervo maxilar (NC V2)", description: "Visão geral do trajeto, ramos e função do nervo maxilar." },
      { title: "Nervo mandibular (NC V3)", description: "Visão geral do trajeto, ramos e função do nervo mandibular." },
      { title: "Nervo facial (NC VII)", description: "Visão geral do VII par craniano." },
      { title: "Nervo vestibulococlear (NC VIII)", description: "Núcleos, trajeto e ramos do nervo vestibulococlear." },
      { title: "Nervo glossofaríngeo (NC IX)", description: "Visão geral do nervo glossofaríngeo." },
      { title: "Nervo vago (NC X)", description: "Trajeto, ramos e núcleos do nervo vago." },
      { title: "Nervo acessório (NC XI)", description: "Visão geral do nervo acessório." },
      { title: "Nervo hipoglosso (NC XII)", description: "Visão geral dos núcleos, trajeto e ramos do nervo hipoglosso." },
    ],
  },
  {
    id: "sistema-nervoso-periferico",
    title: "Sistema nervoso periférico",
    description: "O SNP inclui fibras e corpos celulares fora do SNC que conduzem impulsos relacionados às estruturas periféricas.",
    imageUrl: "/neuroanatomofisiologia/neuronios-e-sinapse-slide-7-image-1.png",
    lessons: [
      { title: "Sistema nervoso autônomo", description: "Introdução ao sistema nervoso autônomo." },
      { title: "Dermátomos e miótomos", description: "Visão geral dos dermátomos e miótomos do corpo." },
    ],
  },
];
