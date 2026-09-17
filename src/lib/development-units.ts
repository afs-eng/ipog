import type { NeuroTextQuestion, NeuroUnit, StudyGuide, SummaryTable } from "./neuro-units";

export type DevelopmentTextQuestion = NeuroTextQuestion;
export type MindMapItem = { title: string; explanation: string };
export type ConceptMapBlock = { title: string; relation: string; items: MindMapItem[] };
export type DevelopmentMindMap = {
  centralNode: string;
  blocks: ConceptMapBlock[];
  application: string;
};
export type DevelopmentUnit = NeuroUnit & { mentalMap?: DevelopmentMindMap };
export type { SummaryTable };

const fallbackImageUrl = "/window.svg";
const developmentVideoUrl = "https://www.youtube.com/embed/MwKEO2pkLP8?start=13";

function createPiagetConceptMap(
  centralNode: string,
  blocks: ConceptMapBlock[],
  application: string,
): DevelopmentMindMap {
  return {
    centralNode,
    blocks,
    application,
  };
}

const unidade1MindMap = createPiagetConceptMap(
  "Desenvolvimento infantil em Piaget",
  [
    { title: "Ação e construção inicial", relation: "leva a", items: [
      { title: "Sensório-motor", explanation: "A inteligência inicial se organiza pelos sentidos e pelas ações sobre o mundo." },
      { title: "Reflexos → ações voluntárias", explanation: "Reflexos são progressivamente coordenados em ações intencionais." },
      { title: "Permanência do objeto", explanation: "O objeto continua existindo mesmo quando não está visível." },
    ] },
    { title: "Representação", relation: "organiza", items: [
      { title: "Linguagem inicial", explanation: "Arrulhos, balbucios, gestos e palavras ampliam a comunicação." },
      { title: "Função simbólica", explanation: "A criança representa objetos e ações ausentes por símbolos." },
      { title: "Egocentrismo", explanation: "A criança tende a interpretar situações a partir do próprio ponto de vista." },
      { title: "Centração", explanation: "O pensamento se concentra em um único aspecto perceptivo da situação." },
    ] },
    { title: "Avanço da lógica", relation: "permite compreender", items: [
      { title: "Desenvolvimento motor", explanation: "Habilidades motoras gerais e finas avançam com a exploração." },
      { title: "Plasticidade e experiência", explanation: "O cérebro muda em resposta às experiências vividas." },
      { title: "Transição ao pensamento operatório-concreto", explanation: "A criança passa a coordenar perspectivas, reversibilidade e conservação." },
    ] },
  ],
  "Planejar exploração, linguagem, jogos simbólicos e situações concretas adequadas ao nível de desenvolvimento.",
);

const unidade2MindMap = createPiagetConceptMap(
  "Epistemologia genética de Piaget",
  [
    { title: "Problema e teorias", relation: "leva a", items: [
      { title: "Pergunta epistemológica", explanation: "Investiga como o conhecimento é construído e como se estrutura." },
      { title: "Inatismo", explanation: "Explica a inteligência como dom biológico que amadurece." },
      { title: "Empirismo", explanation: "Entende a inteligência como adquirida pela experiência." },
      { title: "Construtivismo", explanation: "Compreende o conhecimento como construção progressiva do sujeito." },
    ] },
    { title: "Estruturas e adaptação", relation: "organiza", items: [
      { title: "Sujeito–objeto", explanation: "A relação dinâmica entre ambos sustenta a construção do conhecimento." },
      { title: "Esquema", explanation: "Estrutura básica que organiza a realidade, o pensamento e a ação." },
      { title: "Assimilação", explanation: "Integra uma informação nova aos esquemas já existentes." },
      { title: "Acomodação", explanation: "Modifica ou cria esquemas para atender às características do objeto." },
    ] },
    { title: "Equilíbrio e desenvolvimento", relation: "avança para", items: [
      { title: "Equilibração", explanation: "Busca equilíbrio contínuo entre assimilação e acomodação." },
      { title: "Estágios", explanation: "Organizam uma progressão ordenada na complexidade da inteligência." },
    ] },
  ],
  "Propor situações-problema que desafiem esquemas, favoreçam interação sujeito–objeto e explicitem avanços.",
);

const unidade3MindMap = createPiagetConceptMap(
  "Estágios e aprendizagem em Piaget",
  [
    { title: "Operações concretas", relation: "leva a", items: [
      { title: "Reversibilidade", explanation: "A transformação pode ser mentalmente percorrida em sentidos inversos." },
      { title: "Conservação", explanation: "Quantidade, peso ou número permanecem apesar da mudança de aparência." },
      { title: "Descentração", explanation: "O pensamento coordena vários aspectos e múltiplas variáveis." },
    ] },
    { title: "Organização e inferência", relation: "organiza", items: [
      { title: "Classificação", explanation: "Agrupa objetos por características comuns e relações de inclusão." },
      { title: "Seriação", explanation: "Ordena elementos segundo uma dimensão, como tamanho ou peso." },
      { title: "Lógica indutiva", explanation: "Parte de experiências particulares para formular princípios gerais." },
    ] },
    { title: "Avanço e ensino", relation: "permite compreender", items: [
      { title: "Operatório formal", explanation: "Permite operar com proposições, abstrações e possibilidades." },
      { title: "Raciocínio hipotético-dedutivo", explanation: "Formula hipóteses e deduz consequências para testá-las." },
      { title: "Jogos por estágio", explanation: "Exercício, simbólico, construção e regras acompanham a progressão cognitiva." },
      { title: "Participação ativa e cooperação", explanation: "Aprender envolve ação, debate, colaboração e autonomia progressiva." },
    ] },
  ],
  "Usar jogos, problemas e debates cooperativos para formular, testar e reformular ideias ativamente.",
);

const unidade1StudyGuide: StudyGuide = {
  title: "Roteiro de estudo: desenvolvimento de 0 a 11 anos",
  description: "Percorra as mudanças físicas, motoras, cognitivas e linguísticas em sequência, relacionando cada faixa etária às suas principais aquisições.",
  sections: [
    {
      title: "1. Dos 0 aos 2 anos: corpo, cérebro e movimento",
      content: "Este é um período de grande desenvolvimento físico, no qual o desenvolvimento cerebral se adianta ao restante do corpo. O bebê apresenta alta plasticidade, isto é, capacidade de o cérebro mudar em resposta à experiência. Os reflexos adaptativos ajudam na sobrevivência, enquanto os reflexos primitivos desaparecem ao longo do primeiro ano. Até os 2 anos, aparecem habilidades motoras gerais, que envolvem músculos maiores, e habilidades motoras finas, relacionadas a músculos menores e à coordenação olho-mão. Movimento e exploração participam dessa aquisição.",
      keyPoints: [
        "O cérebro se desenvolve rapidamente nos primeiros 2 anos.",
        "Maior plasticidade significa maior capacidade de mudança em resposta à experiência.",
        "Reflexos adaptativos ajudam na sobrevivência; reflexos primitivos desaparecem no primeiro ano.",
        "Habilidades motoras gerais e finas se desenvolvem progressivamente.",
      ],
      studyPrompt: "Como diferenciar reflexos adaptativos, reflexos primitivos, habilidades motoras gerais e habilidades motoras finas?",
    },
    {
      title: "2. Dos 0 aos 2 anos: cognição, memória e linguagem",
      content: "No estágio sensório-motor, os bebês usam sentidos e ações motoras para aprender sobre o mundo. A permanência do objeto é construída gradualmente: objetos continuam existindo mesmo quando não podem ser vistos. A memória para estímulos auditivos aparece desde o período neonatal e aumenta nos primeiros meses. A linguagem passa por arrulhos e balbucios, depois por gestos, compreensão de palavras, primeiras palavras, holofrases e frases telegráficas. A intenção comunicativa e os fatores internos, externos, culturais e relacionais participam desse percurso.",
      keyPoints: [
        "A inteligência sensório-motora se apoia em sentidos e ações.",
        "Permanência do objeto é a compreensão de que o objeto continua existindo fora da visão.",
        "A capacidade de lembrar estímulos auditivos aumenta nos primeiros meses.",
        "Arrulhos, balbucios, gestos, palavras, holofrases e frases telegráficas formam uma sequência inicial da linguagem.",
      ],
      studyPrompt: "Qual é a ordem geral entre arrulhos, balbucios, gestos, primeiras palavras e frases simples?",
    },
    {
      title: "3. Dos 2 aos 7 anos: mudanças físicas, desenhos e coordenação",
      content: "Entre 2 e 7 anos, o crescimento em peso e altura fica mais lento. Os resumos destacam mudanças neurológicas relacionadas ao corpo caloso e à lateralidade, ao córtex frontal e às funções executivas, ao hipocampo e à memória de longo prazo, além da melhora da visão periférica. As habilidades motoras finas passam a exigir maior complexidade e controle corporal. Os desenhos aparecem em uma sequência de rabisco, formas, esboços e figuras, e as tarefas motoras descritas avançam do equilíbrio e da marcha em barra para saltos e deslocamentos.",
      keyPoints: [
        "O crescimento físico desacelera em relação aos primeiros anos.",
        "Corpo caloso, córtex frontal, hipocampo e visão são destacados nas mudanças neurológicas.",
        "Habilidades motoras finas envolvem maior complexidade e controle corporal.",
        "A sequência dos desenhos vai de rabiscos a formas, esboços e figuras.",
      ],
      studyPrompt: "Como a sequência dos desenhos e das tarefas motoras expressa o aumento gradual do controle corporal?",
    },
    {
      title: "4. Dos 7 aos 11 anos: idade escolar e pensamento operatório-concreto",
      content: "Na idade escolar, o esquema corporal está bem definido, aumentam massa muscular, força e capacidade pulmonar, e a atividade física e a boa alimentação são apresentadas como ações preventivas. O material também destaca novas sinapses e aumento do córtex, com avanços nas funções sensorial, motora e intelectual. A linguagem se torna mais refinada, incluindo a capacidade de pensar e falar sobre a própria linguagem e de manter um tópico de conversa. No estágio operatório-concreto, a criança coordena múltiplas variáveis, compreende transformações reversíveis, quantidades, hierarquias e diferenças, e parte da experiência para formular princípios gerais. A escolarização é associada a metas claras, boa comunicação, apoio, incentivo e desenvolvimento do pensamento lógico.",
      keyPoints: [
        "A idade escolar reúne avanços físicos, motores, perceptuais, linguísticos e cognitivos.",
        "Descentração considera múltiplas variáveis; reversibilidade permite compreender transformações.",
        "A lógica indutiva parte da experiência para chegar a um princípio geral.",
        "Escolarização e estimulação são relacionadas ao pensamento lógico, à comunicação e ao apoio.",
      ],
      studyPrompt: "Ao revisar o quiz, associe descentração, reversibilidade e lógica indutiva a exemplos concretos.",
    },
  ],
};

const unidade2StudyGuide: StudyGuide = {
  title: "Roteiro de estudo: inteligência e construção do conhecimento",
  description: "Estude as teorias sobre a inteligência e acompanhe como sujeito, objeto, esquemas e equilibração explicam a construção progressiva do conhecimento.",
  sections: [
    {
      title: "1. O sujeito epistêmico e as teorias da inteligência",
      content: "A epistemologia genética investiga como os seres humanos constroem conhecimento e como o saber se estrutura. O sujeito epistêmico é estudado por suas formas de aprender, pensar, comunicar-se e chegar à inteligência lógica. O material contrapõe três teorias: no inatismo, a inteligência é apresentada como dom biológico que amadurece; no empirismo, ela é adquirida pela experiência e o sujeito é visto como uma folha em branco; no interacionismo, a inteligência é construída na interação do sujeito com o ambiente.",
      keyPoints: [
        "A epistemologia pergunta o que conhecemos, como conhecemos e como o conhecimento se estrutura.",
        "Inatismo enfatiza um dom biológico que amadurece.",
        "Empirismo enfatiza a experiência como origem da inteligência.",
        "Interacionismo entende a inteligência como construída na interação com o ambiente.",
      ],
      studyPrompt: "Que papel cada uma das três teorias atribui ao sujeito, à experiência e ao ambiente?",
    },
    {
      title: "2. Construtivismo: a relação entre sujeito e objeto",
      content: "No construtivismo de Piaget, a inteligência resulta de construções sucessivas do sujeito sobre o ambiente. Sujeito e ambiente mantêm uma relação dinâmica e recíproca. Sujeito e objeto não se misturam nem se substituem, o que expressa a irredutibilidade. Ao mesmo tempo, um só se constitui em função do outro: o objeto é conhecido pela ação do sujeito e o sujeito se constitui em função do objeto, o que expressa a complementaridade. Por isso, ambos são inseparáveis na construção do conhecimento, caracterizando a indissociabilidade.",
      keyPoints: [
        "A inteligência é construída em sucessivas interações com o ambiente.",
        "Irredutibilidade: sujeito e objeto não se misturam nem se substituem.",
        "Complementaridade: sujeito e objeto participam reciprocamente da construção do conhecimento.",
        "Indissociabilidade: sujeito e objeto são inseparáveis nesse processo.",
      ],
      studyPrompt: "Explique por que a relação sujeito-objeto é, ao mesmo tempo, dinâmica, recíproca e inseparável.",
    },
    {
      title: "3. Esquemas: organizar a realidade e a ação",
      content: "O esquema é a estrutura básica de organização da realidade e a unidade fundamental do pensamento e da ação. Ele processa informações e orienta a resolução de problemas. No exemplo apresentado, para alcançar um brinquedo alto, o objetivo é resolver o problema, a regra corresponde a empurrar uma cadeira e subir nela, a inferência formula a relação entre altura e apoio, o teorema expressa uma proposição sobre a realidade, os invariantes mantêm componentes estáveis e o conceito organiza um pensamento válido sobre altura, distância e estratégias de alcance.",
      keyPoints: [
        "Esquemas organizam a realidade, o pensamento e a ação.",
        "Objetivo, regra e inferência ajudam a descrever a resolução de um problema.",
        "Teorema é uma proposição sobre a realidade; invariantes são componentes internos e estáveis.",
        "Conceito é um pensamento válido sobre a realidade.",
      ],
      studyPrompt: "Diante de um problema, identifique o objetivo, a regra, a inferência e o conceito envolvidos no esquema.",
    },
    {
      title: "4. Assimilação e acomodação na adaptação cognitiva",
      content: "Assimilação e acomodação são processos complementares da construção do conhecimento. Assimilar é incorporar novas informações aos esquemas existentes e interpretar o mundo a partir das estruturas mentais já disponíveis. A acomodação modifica esquemas existentes ou cria novos para atender às singularidades do objeto. O exemplo dos animais mostra a passagem de uma assimilação, quando diferentes animais de quatro patas são chamados de ‘au au’, para uma acomodação, quando as diferenças percebidas levam à criação de um esquema para o cavalo.",
      keyPoints: [
        "Assimilação integra o novo aos esquemas já existentes.",
        "Acomodação modifica esquemas ou cria novos esquemas.",
        "Os dois processos são complementares na adaptação cognitiva.",
        "A interação com o objeto pode exigir uma transformação ativa do comportamento e do esquema.",
      ],
      studyPrompt: "No exemplo do animal de quatro patas, em que momento aparece a assimilação e em que momento aparece a acomodação?",
    },
    {
      title: "5. Equilibração e progressão dos estágios",
      content: "A equilibração é a busca contínua de equilíbrio entre assimilação e acomodação. O desenvolvimento passa por equilíbrio inicial, desequilíbrio, reequilíbrio e avanço para um nível superior, conciliando maturação, experiência e interação social. A teoria apresenta uma ordem de sucessão: sensório-motor, de 0 a 2 anos, com inteligência prática por ações e percepções; pré-operatório, de 2 a 7 anos, com representação e linguagem; operatório-concreto, de 7 a 11 anos, com lógica aplicada a objetos concretos; e operatório-formal, a partir de 11 anos, com raciocínio abstrato e hipotético-dedutivo.",
      keyPoints: [
        "Equilibração articula equilíbrio, desequilíbrio, reequilíbrio e avanço.",
        "Maturação, experiência e interação social participam do desenvolvimento.",
        "Os quatro estágios seguem uma ordem de sucessão na construção das capacidades cognitivas.",
        "A passagem dos estágios envolve aumento da complexidade da inteligência e da resolução de problemas.",
      ],
      studyPrompt: "Reconstrua a sequência dos quatro estágios e associe cada um à forma de inteligência destacada.",
    },
  ],
};

const unidade3StudyGuide: StudyGuide = {
  title: "Roteiro de estudo: estágios, conservação e aprendizagem",
  description: "Revise a progressão da inteligência, observe como conservação e reversibilidade diferenciam operações concretas e relacione os tipos de jogo às possibilidades de ensino.",
  sections: [
    {
      title: "1. Inteligência como adaptação e sequência dos estágios",
      content: "A inteligência é apresentada como um processo de adaptação que envolve funções cognitivas e tende ao equilíbrio. O material diferencia instinto, adaptação hereditária; hábito, adaptação adquirida; e inteligência, adaptação criada. Os estágios seguem uma sequência: sensório-motor, de 0 a 2 anos; pré-operatório, de 2 a 7 anos; operatório-concreto, de 7 a 12 anos; e operatório-formal, a partir de 12 anos. A epistemologia genética também apresenta a sequência como sensório-motor, pré-operatório, operatório-concreto e operatório-formal a partir de 11 anos.",
      keyPoints: [
        "A inteligência adapta as funções cognitivas em direção ao equilíbrio.",
        "Instinto, hábito e inteligência correspondem a formas de adaptação hereditária, adquirida e criada.",
        "Os estágios aparecem em uma ordem de sucessão, ainda que as faixas etárias sejam apresentadas com variações nos materiais.",
        "A progressão acompanha maior complexidade do pensamento.",
      ],
      studyPrompt: "Qual é a diferença entre adaptação por instinto, por hábito e pela inteligência criada?",
    },
    {
      title: "2. Sensório-motor e pré-operatório: ação e representação",
      content: "No sensório-motor, predominam comportamento motor, adaptações reflexas que se transformam em movimentos voluntários e sentimentos ligados à ação. Ao longo das seis fases indicadas, aparecem experimentação ativa, novos significados e o início da representação. No pré-operatório, a função simbólica permite construir esquemas simbólicos, fantasiar e simbolizar. Surgem representação, linguagem e jogo simbólico, mas as ações sensório-motoras ainda não se transformaram imediatamente em operações reversíveis. A lógica transdutiva liga fatos isolados sem fazer generalizações, e aparecem egocentrismo, animismo, centração e pensamento mágico.",
      keyPoints: [
        "Sensório-motor: ação, percepção, movimentos voluntários e início da representação.",
        "Pré-operatório: função simbólica, representação, linguagem e jogo simbólico.",
        "Lógica transdutiva relaciona fatos isolados sem generalizá-los.",
        "Egocentrismo, animismo e centração mostram o foco em uma perspectiva ou variável.",
      ],
      studyPrompt: "Ao ler uma situação de aprendizagem, ela envolve principalmente ação sensório-motora ou representação simbólica?",
    },
    {
      title: "3. Conservação e reversibilidade: operações concretas",
      content: "No operatório-concreto, a principal característica é a reversibilidade da ação interiorizada: a transformação pode ser pensada em mais de um sentido, e uma operação direta corresponde a uma inversa. A descentração permite considerar um objeto por vários aspectos e múltiplas variáveis. Nas tarefas de conservação, a aparência muda, mas a quantidade permanece: o suco pode passar de um copo baixo e largo para um alto e estreito, a argila pode ser alongada e uma fileira de peças pode ser espalhada. A resposta operatória concreta reconhece a mesma quantidade, enquanto a resposta pré-operatória se prende à aparência mais longa ou mais alta.",
      keyPoints: [
        "Reversibilidade é ação interiorizada que pode ser compreendida em direções inversas.",
        "Descentração considera múltiplas variáveis e vários aspectos de um objeto.",
        "Conservação separa quantidade, peso ou número da aparência transformada.",
        "As tarefas de líquido, sólido e número mostram a passagem do foco na aparência para a invariância.",
      ],
      studyPrompt: "Em cada tarefa de conservação, o que mudou na aparência e o que permaneceu invariável?",
    },
    {
      title: "4. Operatório-formal, jogos e implicações para o ensino",
      content: "No operatório-formal, o pensamento passa a raciocinar sobre hipóteses e proposições, pensar no futuro e usar lógica formal aplicável a qualquer conteúdo. Os esquemas avançam de operatórios para formais e abstratos. Os jogos acompanham a progressão: jogo de exercício no sensório-motor, jogo simbólico no pré-operatório, jogos de construção na transição e jogo de regras nos períodos operatórios. Para o ensino, os resumos valorizam conhecer o que o aluno já sabe, participação ativa, debates e perguntas, atividades desafiadoras em grupo, formulação, teste e reformulação de hipóteses, além de autonomia, criatividade e pensamento crítico. Não se trata de uma receita única, mas de favorecer uma aprendizagem efetiva e duradoura.",
      keyPoints: [
        "O operatório-formal trabalha com hipóteses, proposições, futuro e abstração.",
        "Jogos de exercício, simbólico, construção e regras acompanham a progressão cognitiva.",
        "O ensino pode partir do que o aluno já sabe e estimular participação, debate e perguntas.",
        "Hipóteses podem ser formuladas, testadas e reformuladas em atividades desafiadoras e colaborativas.",
      ],
      studyPrompt: "Que tipo de atividade favorece participação ativa e pensamento crítico sem reduzir o ensino à transmissão?",
    },
  ],
};

type DevelopmentQuestionSource = Pick<NeuroTextQuestion, "sourceExcerpt" | "sourceUrl">;

const developmentQuestionSources = {
  book: {
    sourceExcerpt: "Livro — Piaget, Vigotski, Wallon: Teorias psicogenéticas em discussão (capítulos de Piaget).",
  },
  unidade1Slides: {
    sourceExcerpt: "Slides — Desenvolvimento infantil.",
    sourceUrl: "https://etienemacedo.com.br/aulas/anos-iniciais-e-escolares/2026-08-08-desenvolvimento-infantil/",
  },
  unidade2Slides: {
    sourceExcerpt: "Slides — Piaget.",
    sourceUrl: "https://etienemacedo.com.br/aulas/anos-iniciais-e-escolares/2026-08-19-piaget/slides-2026-08-19-piaget.pdf",
  },
  unidade3Slides: {
    sourceExcerpt: "Slides — Piaget: estágios.",
    sourceUrl: "https://etienemacedo.com.br/aulas/anos-iniciais-e-escolares/2026-09-12-piaget-estagios/slides-2026-09-12-piaget-estagios.pdf",
  },
  unidade3Slides2: {
    sourceExcerpt: "Slides — Piaget: estágios 2.",
    sourceUrl: "https://etienemacedo.com.br/aulas/anos-iniciais-e-escolares/2026-09-12-piaget-estagios-2/slides-2026-09-12-piaget-estagios-2.pdf",
  },
} satisfies Record<string, DevelopmentQuestionSource>;

function applyQuestionSources(
  questions: DevelopmentTextQuestion[],
  sources: readonly DevelopmentQuestionSource[],
): DevelopmentTextQuestion[] {
  return questions.map((question, index) => ({
    ...question,
    ...sources[index % sources.length],
  }));
}

const unidade1Questions: DevelopmentTextQuestion[] = applyQuestionSources([
  {
    prompt: "Considerando o desenvolvimento pré-natal, os primeiros 2 anos formam o período de maior desenvolvimento físico.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "O material destaca os primeiros 2 anos como período de grande desenvolvimento físico, ficando atrás apenas do período pré-natal.",
  },
  {
    prompt: "Qual afirmação descreve o desenvolvimento cerebral nos primeiros 2 anos?",
    options: [
      "O cérebro se desenvolve à frente do restante do corpo",
      "O restante do corpo se desenvolve à frente do cérebro",
      "As partes do cérebro apresentam o mesmo grau de desenvolvimento no nascimento",
      "O desenvolvimento cerebral não acompanha mudanças decorrentes da experiência",
    ],
    correctAnswer: "O cérebro se desenvolve à frente do restante do corpo",
    explanation: "O material afirma que, nos primeiros 2 anos, o desenvolvimento do cérebro se adianta ao do restante do corpo.",
  },
  {
    prompt: "Maior plasticidade cerebral nos bebês é apresentada junto a maior vulnerabilidade.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "O material relaciona a alta capacidade de mudança do cérebro do bebê a uma maior vulnerabilidade.",
  },
  {
    prompt: "Qual conjunto reúne reflexos primitivos que desaparecem durante o primeiro ano?",
    options: ["Moro, Babinski, marcha e preensão", "Sucção, percepção, atenção e respiração", "Arrulhos, balbucios, gestos e holofrases", "Descentração, reversibilidade, conservação e lógica indutiva"],
    correctAnswer: "Moro, Babinski, marcha e preensão",
    explanation: "O resumo cita Moro, Babinski, marcha e preensão como reflexos primitivos que desaparecem durante o primeiro ano.",
  },
  {
    prompt: "O que o material destaca sobre o crescimento e as habilidades motoras aos 2 anos?",
    options: [
      "A criança tem aproximadamente metade da altura adulta e desenvolve habilidades gerais e finas",
      "A criança tem aproximadamente metade da altura adulta e desenvolve somente habilidades finas",
      "A criança já atingiu a altura adulta e desenvolve habilidades gerais e finas",
      "A criança mantém a altura inicial e desenvolve somente habilidades gerais",
    ],
    correctAnswer: "A criança tem aproximadamente metade da altura adulta e desenvolve habilidades gerais e finas",
    explanation: "Aos 2 anos, o material registra aproximadamente metade da altura adulta e diferencia habilidades motoras gerais e finas.",
  },
  {
    prompt: "Como os bebês aprendem sobre o mundo no estágio sensório-motor?",
    options: [
      "Usando informações dos sentidos e ações motoras",
      "Substituindo ações e percepções por raciocínio hipotético-dedutivo",
      "Organizando relações entre objetos por operações já reversíveis",
      "Aplicando lógica formal a proposições sobre situações possíveis",
    ],
    correctAnswer: "Usando informações dos sentidos e ações motoras",
    explanation: "A inteligência sensório-motora é descrita como aprendizagem sobre o mundo por meio dos sentidos e das ações motoras.",
  },
  {
    prompt: "A permanência do objeto significa compreender que um objeto deixa de existir quando não pode ser visto.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Falso",
    explanation: "Permanência do objeto é compreender que ele continua existindo mesmo quando não está visível.",
  },
  {
    prompt: "Qual sequência corresponde aos estágios dos desenhos entre 2 e 7 anos?",
    options: ["Rabisco, formas, esboços e figuras", "Rabisco, esboços, formas e figuras", "Formas, rabisco, figuras e esboços", "Esboços, formas, rabisco e figuras"],
    correctAnswer: "Rabisco, formas, esboços e figuras",
    explanation: "O material apresenta a sequência gráfica de rabisco aos 2 anos, formas aos 3, esboços aos 4 e figuras entre 4 e 5 anos.",
  },
  {
    prompt: "Qual conjunto caracteriza o estágio operatório-concreto entre 7 e 11 anos?",
    options: [
      "Descentração, reversibilidade e lógica indutiva",
      "Ação reflexa, permanência do objeto e memória para estímulos auditivos",
      "Função simbólica, egocentrismo e lógica transdutiva",
      "Raciocínio hipotético-dedutivo e lógica formal aplicável a qualquer conteúdo",
    ],
    correctAnswer: "Descentração, reversibilidade e lógica indutiva",
    explanation: "O resumo associa esse estágio a múltiplas variáveis, transformações reversíveis e princípios gerais derivados da experiência.",
  },
  {
    prompt: "Quais elementos escolares são relacionados ao desenvolvimento do pensamento lógico?",
    options: [
      "Metas claras, boa comunicação, apoio e incentivo",
      "Metas claras com comunicação reduzida e pouco apoio",
      "Memorização de conteúdos sem estimulação ou interação",
      "Atividade física sem metas de aprendizagem ou comunicação",
    ],
    correctAnswer: "Metas claras, boa comunicação, apoio e incentivo",
    explanation: "O material destaca escolarização e estimulação com metas claras, boa comunicação, apoio e incentivo.",
  },
  {
    prompt: "Qual distinção corresponde aos reflexos adaptativos e primitivos apresentada no material?",
    options: [
      "Adaptativos ajudam na sobrevivência; primitivos desaparecem ao longo do primeiro ano",
      "Adaptativos desaparecem no primeiro ano; primitivos ajudam exclusivamente na linguagem",
      "Ambos permanecem iguais durante todo o desenvolvimento",
      "Ambos aparecem apenas depois do estágio sensório-motor",
    ],
    correctAnswer: "Adaptativos ajudam na sobrevivência; primitivos desaparecem ao longo do primeiro ano",
    explanation: "O resumo diferencia reflexos adaptativos, ligados à sobrevivência, de reflexos primitivos, que desaparecem ao longo do primeiro ano.",
  },
  {
    prompt: "Qual alternativa diferencia habilidades motoras gerais e finas?",
    options: [
      "Gerais envolvem músculos maiores; finas envolvem músculos menores e coordenação olho-mão",
      "Gerais envolvem somente a linguagem; finas envolvem somente a memória",
      "Gerais aparecem apenas no período pré-operatório; finas apenas no formal",
      "Gerais e finas são nomes para o mesmo tipo de habilidade",
    ],
    correctAnswer: "Gerais envolvem músculos maiores; finas envolvem músculos menores e coordenação olho-mão",
    explanation: "O material distingue habilidades motoras gerais, ligadas a músculos maiores, e finas, relacionadas a músculos menores e à coordenação olho-mão.",
  },
  {
    prompt: "Como o material relaciona plasticidade e vulnerabilidade no bebê?",
    options: [
      "A maior capacidade de mudança do cérebro aparece junto a maior vulnerabilidade",
      "A plasticidade impede qualquer influência da experiência",
      "A vulnerabilidade significa que o cérebro não muda após o nascimento",
      "Plasticidade e vulnerabilidade são apresentadas como características opostas",
    ],
    correctAnswer: "A maior capacidade de mudança do cérebro aparece junto a maior vulnerabilidade",
    explanation: "A alta plasticidade é descrita como capacidade de mudança em resposta à experiência e aparece relacionada à maior vulnerabilidade.",
  },
  {
    prompt: "O que acontece com a memória para estímulos auditivos nos primeiros meses?",
    options: [
      "Ela aparece desde o período neonatal e aumenta nos primeiros meses",
      "Ela só aparece depois do estágio operatório-concreto",
      "Ela desaparece quando surgem os primeiros gestos",
      "Ela é substituída pela memória visual antes do nascimento",
    ],
    correctAnswer: "Ela aparece desde o período neonatal e aumenta nos primeiros meses",
    explanation: "O roteiro de estudo registra memória para estímulos auditivos desde o período neonatal, com aumento nos primeiros meses.",
  },
  {
    prompt: "Qual sequência representa uma progressão inicial da linguagem?",
    options: [
      "Arrulhos, balbucios, gestos, palavras, holofrases e frases telegráficas",
      "Frases telegráficas, gestos, arrulhos, holofrases, balbucios e palavras",
      "Gestos, frases telegráficas, balbucios, palavras, arrulhos e holofrases",
      "Palavras, holofrases, arrulhos, gestos, balbucios e frases telegráficas",
    ],
    correctAnswer: "Arrulhos, balbucios, gestos, palavras, holofrases e frases telegráficas",
    explanation: "Essa é a sequência geral de manifestações iniciais da linguagem apresentada no material.",
  },
  {
    prompt: "O que caracteriza uma holofrase na progressão inicial da linguagem?",
    options: [
      "Uma palavra usada para expressar uma ideia ou frase mais ampla",
      "Um reflexo primitivo que desaparece durante o primeiro ano",
      "Uma operação reversível sobre objetos concretos",
      "Uma hipótese formal sobre uma situação possível",
    ],
    correctAnswer: "Uma palavra usada para expressar uma ideia ou frase mais ampla",
    explanation: "Holofrases aparecem na sequência inicial da linguagem como uso de uma palavra com sentido comunicativo mais amplo.",
  },
  {
    prompt: "Que característica é associada às frases telegráficas?",
    options: [
      "São uma forma posterior da sequência inicial de linguagem, após as holofrases",
      "São reflexos que antecedem qualquer balbucio",
      "São desenhos que representam objetos ausentes",
      "São raciocínios hipotético-dedutivos do estágio formal",
    ],
    correctAnswer: "São uma forma posterior da sequência inicial de linguagem, após as holofrases",
    explanation: "O material inclui frases telegráficas depois de arrulhos, balbucios, gestos, palavras e holofrases.",
  },
  {
    prompt: "Como o crescimento físico costuma se comportar entre 2 e 7 anos?",
    options: [
      "Fica mais lento em peso e altura do que nos primeiros anos",
      "Acelera continuamente até atingir a altura adulta",
      "Para completamente enquanto a linguagem se desenvolve",
      "Acontece apenas no cérebro, sem mudanças corporais",
    ],
    correctAnswer: "Fica mais lento em peso e altura do que nos primeiros anos",
    explanation: "O material destaca que, entre 2 e 7 anos, o crescimento em peso e altura fica mais lento.",
  },
  {
    prompt: "Quais mudanças neurológicas são destacadas no período de 2 a 7 anos?",
    options: [
      "Mudanças relacionadas ao corpo caloso, córtex frontal, hipocampo e visão periférica",
      "Somente mudanças nos reflexos primitivos do recém-nascido",
      "Apenas formação do tronco encefálico e do cerebelo",
      "Somente alterações na medula espinal, sem relação com memória",
    ],
    correctAnswer: "Mudanças relacionadas ao corpo caloso, córtex frontal, hipocampo e visão periférica",
    explanation: "O roteiro reúne corpo caloso e lateralidade, córtex frontal e funções executivas, hipocampo e memória de longo prazo, além da visão periférica.",
  },
  {
    prompt: "Qual sequência gráfica é apresentada para os desenhos entre 2 e 7 anos?",
    options: [
      "Rabisco, formas, esboços e figuras",
      "Figuras, esboços, formas e rabisco",
      "Formas, figuras, rabisco e esboços",
      "Esboços, figuras, rabisco e formas",
    ],
    correctAnswer: "Rabisco, formas, esboços e figuras",
    explanation: "A sequência do material vai de rabiscos a formas, esboços e figuras, acompanhando o aumento do controle corporal.",
  },
  {
    prompt: "A função simbólica permite à criança representar objetos ou ações ausentes.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "A função simbólica envolve construir representações por linguagem, desenho, brincadeira e outros símbolos.",
  },
  {
    prompt: "Qual situação exemplifica o egocentrismo no período pré-operatório?",
    options: [
      "Interpretar uma situação principalmente a partir do próprio ponto de vista",
      "Coordenar simultaneamente várias perspectivas de uma situação",
      "Reconhecer conservação apesar da mudança de aparência",
      "Formular e testar hipóteses sobre possibilidades abstratas",
    ],
    correctAnswer: "Interpretar uma situação principalmente a partir do próprio ponto de vista",
    explanation: "Egocentrismo é apresentado como a tendência de interpretar situações a partir do próprio ponto de vista.",
  },
  {
    prompt: "A centração é o foco do pensamento em um único aspecto perceptivo da situação.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "A centração caracteriza o foco em uma variável ou aspecto, em vez da coordenação de múltiplos aspectos.",
  },
  {
    prompt: "No período pré-operatório, qual aquisição ainda não está plenamente constituída?",
    options: [
      "A reversibilidade das ações interiorizadas",
      "A função simbólica",
      "A representação por linguagem e jogo simbólico",
      "A ampliação da linguagem",
    ],
    correctAnswer: "A reversibilidade das ações interiorizadas",
    explanation: "No pré-operatório aparecem representação, linguagem e jogo simbólico, mas as ações ainda não são imediatamente operações reversíveis.",
  },
  {
    prompt: "Qual avanço linguístico é associado à idade escolar?",
    options: [
      "Linguagem mais refinada, com capacidade metalinguística e manutenção de um tópico de conversa",
      "Desaparecimento de gestos e ausência de comunicação estruturada",
      "Retorno das frases telegráficas como principal forma de comunicação",
      "Substituição da linguagem por ações exclusivamente motoras",
    ],
    correctAnswer: "Linguagem mais refinada, com capacidade metalinguística e manutenção de um tópico de conversa",
    explanation: "O material destaca linguagem refinada, reflexão sobre a própria linguagem e capacidade de manter um tópico na conversa.",
  },
  {
    prompt: "O que a descentração acrescenta ao pensamento operatório-concreto?",
    options: [
      "A coordenação de múltiplas variáveis e diferentes aspectos de um objeto",
      "A concentração em uma única característica perceptiva",
      "A ligação de fatos isolados sem generalização",
      "A aplicação de lógica formal sem apoio em situações concretas",
    ],
    correctAnswer: "A coordenação de múltiplas variáveis e diferentes aspectos de um objeto",
    explanation: "A descentração supera a centração ao permitir considerar vários aspectos e variáveis em conjunto.",
  },
  {
    prompt: "Como a reversibilidade aparece no pensamento operatório-concreto?",
    options: [
      "A criança compreende uma transformação e também a operação inversa",
      "A criança se prende apenas à aparência final da transformação",
      "A criança liga fatos sem estabelecer relações entre eles",
      "A criança raciocina somente com símbolos sem relação com objetos",
    ],
    correctAnswer: "A criança compreende uma transformação e também a operação inversa",
    explanation: "A reversibilidade permite pensar uma transformação em sentidos inversos, como juntar e separar.",
  },
  {
    prompt: "O que é lógica indutiva no contexto do pensamento operatório-concreto?",
    options: [
      "Partir da experiência para formular um princípio geral",
      "Ligar fatos isolados sem fazer generalizações",
      "Deduzir consequências de proposições puramente hipotéticas",
      "Repetir uma resposta reflexa diante de um estímulo",
    ],
    correctAnswer: "Partir da experiência para formular um princípio geral",
    explanation: "O material define a lógica indutiva como passagem da experiência particular para um princípio geral.",
  },
  {
    prompt: "Qual conjunto reúne apoios escolares associados ao desenvolvimento do pensamento lógico?",
    options: [
      "Metas claras, boa comunicação, apoio, incentivo e estimulação",
      "Comunicação reduzida, ausência de metas e pouca interação",
      "Memorização isolada, sem apoio ou situações-problema",
      "Atividade física sem relação com comunicação ou aprendizagem",
    ],
    correctAnswer: "Metas claras, boa comunicação, apoio, incentivo e estimulação",
    explanation: "A escolarização é relacionada a metas claras, comunicação, apoio, incentivo e estimulação do pensamento lógico.",
  },
  {
    prompt: "Qual é a ordem geral dos estágios de Piaget apresentada nos materiais?",
    options: [
      "Sensório-motor, pré-operatório, operatório-concreto e operatório-formal",
      "Pré-operatório, sensório-motor, operatório-formal e operatório-concreto",
      "Operatório-concreto, sensório-motor, pré-operatório e operatório-formal",
      "Sensório-motor, operatório-formal, pré-operatório e operatório-concreto",
    ],
    correctAnswer: "Sensório-motor, pré-operatório, operatório-concreto e operatório-formal",
    explanation: "Os materiais organizam os estágios nessa sequência de progressão da inteligência.",
  },
], [developmentQuestionSources.book, developmentQuestionSources.unidade1Slides]);

const unidade2Questions: DevelopmentTextQuestion[] = applyQuestionSources([
  {
    prompt: "Qual formulação corresponde ao inatismo apresentado no estudo da inteligência?",
    options: [
      "A inteligência é um dom biológico que amadurece com o tempo",
      "A inteligência é construída exclusivamente pela interação com o ambiente",
      "A inteligência resulta da modificação contínua de esquemas pelo objeto",
      "A inteligência depende apenas de experiências sensoriais acumuladas",
    ],
    correctAnswer: "A inteligência é um dom biológico que amadurece com o tempo",
    explanation: "No material, o inatismo atribui à inteligência uma base biológica que amadurece; a construção pela interação corresponde ao interacionismo.",
  },
  {
    prompt: "No conjunto de teorias apresentado, qual alternativa descreve o empirismo?",
    options: [
      "A inteligência é adquirida pela experiência e o sujeito é visto como folha em branco",
      "A inteligência é um dom biológico que amadurece sem relação com a experiência",
      "A inteligência é construída pela interação recíproca entre sujeito e ambiente",
      "A inteligência resulta da busca de equilíbrio entre assimilação e acomodação",
    ],
    correctAnswer: "A inteligência é adquirida pela experiência e o sujeito é visto como folha em branco",
    explanation: "O empirismo do resumo enfatiza a experiência; o dom biológico é associado ao inatismo e a interação, ao interacionismo.",
  },
  {
    prompt: "Qual situação expressa a concepção interacionista de inteligência?",
    options: [
      "O sujeito constrói a inteligência ao interagir com o ambiente",
      "O sujeito apenas recebe informações prontas do ambiente",
      "A inteligência amadurece como dom biológico sem interação",
      "A inteligência depende somente de uma estrutura mental inicial fixa",
    ],
    correctAnswer: "O sujeito constrói a inteligência ao interagir com o ambiente",
    explanation: "O interacionismo entende a inteligência como construção na interação entre sujeito e ambiente, e não como recepção passiva.",
  },
  {
    prompt: "Piaget defende uma aprendizagem passiva em que o aluno apenas absorve informações do ambiente.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Falso",
    explanation: "A perspectiva construtivista enfatiza a ação e a construção do conhecimento pelo sujeito, não a absorção passiva.",
  },
  {
    prompt: "Piaget enfatiza o papel ativo do indivíduo na construção da realidade.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "Nos resumos, o sujeito age sobre o objeto e participa ativamente da construção do conhecimento e da realidade.",
  },
  {
    prompt: "No construtivismo de Piaget, qual relação entre sujeito e objeto é destacada?",
    options: [
      "São indissociáveis na construção do conhecimento",
      "O objeto substitui o sujeito na construção do conhecimento",
      "O sujeito e o objeto não podem participar da mesma construção",
      "O sujeito recebe o objeto sem agir sobre ele",
    ],
    correctAnswer: "São indissociáveis na construção do conhecimento",
    explanation: "Indissociabilidade significa que sujeito e objeto são inseparáveis no processo construtivo; o sujeito participa ativamente da relação.",
  },
  {
    prompt: "Como o esquema é definido no material sobre a base do pensamento?",
    options: [
      "Como estrutura básica que organiza a realidade, o pensamento e a ação",
      "Como informação pronta que não pode ser modificada",
      "Como resposta automática sem função na organização da realidade",
      "Como resultado final que só aparece depois do estágio formal",
    ],
    correctAnswer: "Como estrutura básica que organiza a realidade, o pensamento e a ação",
    explanation: "O esquema é a unidade fundamental do pensamento e da ação, usada para processar informações e organizar a realidade.",
  },
  {
    prompt: "Uma criança chama um cavalo de ‘au au’ porque o integra ao esquema já usado para cães. Qual processo aparece nesse exemplo?",
    options: ["Assimilação", "Acomodação", "Equilibração", "Interacionismo"],
    correctAnswer: "Assimilação",
    explanation: "Assimilação é integrar um elemento novo a um esquema existente; a criação posterior de um esquema para o cavalo caracteriza acomodação.",
  },
  {
    prompt: "Quando uma criança percebe diferenças em um animal e cria um esquema específico para ele, qual processo está em destaque?",
    options: ["Acomodação", "Assimilação", "Inatismo", "Equilíbrio inicial"],
    correctAnswer: "Acomodação",
    explanation: "A acomodação modifica esquemas existentes ou cria novos para atender às singularidades do objeto; integrar o animal a um esquema já existente seria assimilação.",
  },
  {
    prompt: "A equilibração busca continuamente o equilíbrio entre assimilação e acomodação.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "O material descreve a equilibração como a busca contínua desse equilíbrio na adaptação cognitiva.",
  },
  {
    prompt: "Qual conjunto de perguntas orienta a epistemologia genética?",
    options: [
      "O que conhecemos, como conhecemos e como o conhecimento se estrutura",
      "Como memorizar conteúdos sem considerar a experiência",
      "Como classificar apenas reflexos e movimentos",
      "Como substituir a ação do sujeito por informações prontas",
    ],
    correctAnswer: "O que conhecemos, como conhecemos e como o conhecimento se estrutura",
    explanation: "A epistemologia genética investiga o conhecimento, sua construção e sua organização.",
  },
  {
    prompt: "O que é o sujeito epistêmico no estudo de Piaget?",
    options: [
      "O sujeito considerado por suas formas de aprender, pensar e chegar à inteligência lógica",
      "Um sujeito que apenas recebe informações do ambiente",
      "Um conjunto de reflexos que não se modifica pela experiência",
      "O objeto físico separado de qualquer ação cognitiva",
    ],
    correctAnswer: "O sujeito considerado por suas formas de aprender, pensar e chegar à inteligência lógica",
    explanation: "O sujeito epistêmico permite estudar como as formas de conhecer, pensar e comunicar-se se organizam.",
  },
  {
    prompt: "Qual alternativa resume a diferença entre inatismo, empirismo e interacionismo?",
    options: [
      "Dom biológico, experiência como origem e construção na interação, respectivamente",
      "Experiência como origem, dom biológico e ausência de construção, respectivamente",
      "Construção na interação, dom biológico e experiência como folha em branco, respectivamente",
      "Todas entendem a inteligência como uma estrutura fixa desde o nascimento",
    ],
    correctAnswer: "Dom biológico, experiência como origem e construção na interação, respectivamente",
    explanation: "O material contrapõe o inatismo, o empirismo e o interacionismo por esses papéis atribuídos à inteligência e à experiência.",
  },
  {
    prompt: "Qual formulação corresponde ao construtivismo de Piaget?",
    options: [
      "A inteligência resulta de construções sucessivas do sujeito sobre o ambiente",
      "O sujeito é uma folha em branco preenchida sem agir sobre o ambiente",
      "A inteligência é um dom que amadurece sem qualquer construção",
      "O conhecimento é uma cópia pronta dos objetos externos",
    ],
    correctAnswer: "A inteligência resulta de construções sucessivas do sujeito sobre o ambiente",
    explanation: "No construtivismo, o sujeito constrói progressivamente a inteligência em relação dinâmica com o ambiente.",
  },
  {
    prompt: "O que significa irredutibilidade na relação entre sujeito e objeto?",
    options: [
      "Sujeito e objeto não se misturam nem se substituem",
      "Sujeito e objeto são exatamente a mesma coisa",
      "O objeto constrói o conhecimento sem participação do sujeito",
      "O sujeito existe sem qualquer relação com o objeto",
    ],
    correctAnswer: "Sujeito e objeto não se misturam nem se substituem",
    explanation: "Irredutibilidade indica que os polos da relação não se confundem nem ocupam o lugar um do outro.",
  },
  {
    prompt: "Como a complementaridade caracteriza a relação sujeito–objeto?",
    options: [
      "Cada polo participa reciprocamente da construção do conhecimento",
      "O sujeito e o objeto permanecem sem qualquer influência mútua",
      "O objeto substitui a ação do sujeito na construção",
      "A experiência é excluída da relação entre os dois polos",
    ],
    correctAnswer: "Cada polo participa reciprocamente da construção do conhecimento",
    explanation: "Complementaridade expressa que sujeito e objeto se constituem em função um do outro na construção do conhecimento.",
  },
  {
    prompt: "A indissociabilidade afirma que sujeito e objeto são inseparáveis na construção do conhecimento.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "O material apresenta sujeito e objeto como polos inseparáveis do processo construtivo.",
  },
  {
    prompt: "No exemplo de alcançar um brinquedo alto, qual é o objetivo do esquema?",
    options: [
      "Resolver o problema de alcançar o brinquedo",
      "Nomear o brinquedo sem agir sobre o ambiente",
      "Memorizar uma palavra sem formular relações",
      "Aplicar uma hipótese formal sem apoio em uma ação",
    ],
    correctAnswer: "Resolver o problema de alcançar o brinquedo",
    explanation: "No exemplo do esquema, o objetivo é resolver o problema prático de alcançar o brinquedo alto.",
  },
  {
    prompt: "Como o esquema é descrito em relação ao pensamento e à ação?",
    options: [
      "É a unidade fundamental do pensamento e da ação e processa informações",
      "É uma informação pronta que não pode ser transformada",
      "É apenas um reflexo sem função na organização da realidade",
      "É uma capacidade que surge somente depois do estágio formal",
    ],
    correctAnswer: "É a unidade fundamental do pensamento e da ação e processa informações",
    explanation: "O esquema organiza a realidade, o pensamento e a ação, orientando também a resolução de problemas.",
  },
  {
    prompt: "Qual situação é um exemplo de assimilação?",
    options: [
      "Interpretar uma situação nova usando um esquema já disponível",
      "Criar um esquema inteiramente novo para acomodar diferenças do objeto",
      "Abandonar toda estrutura anterior diante de qualquer experiência",
      "Buscar equilíbrio sem incorporar informações à ação",
    ],
    correctAnswer: "Interpretar uma situação nova usando um esquema já disponível",
    explanation: "Assimilar é incorporar a informação nova a esquemas existentes e interpretá-la por meio deles.",
  },
  {
    prompt: "Qual situação é um exemplo de acomodação?",
    options: [
      "Modificar um esquema existente ou criar outro para atender ao objeto",
      "Incorporar todo objeto novo ao primeiro esquema sem diferenciação",
      "Repetir uma resposta sem considerar as singularidades do objeto",
      "Manter o esquema inalterado mesmo quando ele não resolve o problema",
    ],
    correctAnswer: "Modificar um esquema existente ou criar outro para atender ao objeto",
    explanation: "A acomodação transforma esquemas ou cria novos quando as características do objeto exigem adaptação.",
  },
  {
    prompt: "Assimilação e acomodação são processos complementares da adaptação cognitiva.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "O material apresenta a integração do novo e a modificação dos esquemas como processos complementares.",
  },
  {
    prompt: "No exemplo dos animais, quando aparece acomodação?",
    options: [
      "Quando a criança distingue o cavalo e cria um esquema específico para ele",
      "Quando chama diferentes animais de quatro patas de ‘au au’",
      "Quando ignora as diferenças entre cão e cavalo",
      "Quando repete um nome sem relação com qualquer esquema",
    ],
    correctAnswer: "Quando a criança distingue o cavalo e cria um esquema específico para ele",
    explanation: "A criação de um esquema específico para o cavalo modifica a organização anterior e caracteriza acomodação.",
  },
  {
    prompt: "Qual sequência descreve o movimento da equilibração?",
    options: [
      "Equilíbrio inicial, desequilíbrio, reequilíbrio e avanço para um nível superior",
      "Desequilíbrio, equilíbrio inicial, abandono da experiência e repetição",
      "Acomodação, inatismo, empirismo e ausência de interação",
      "Estágio formal, sensório-motor, pré-operatório e equilíbrio inicial",
    ],
    correctAnswer: "Equilíbrio inicial, desequilíbrio, reequilíbrio e avanço para um nível superior",
    explanation: "A equilibração é descrita como um movimento que parte do equilíbrio, passa pelo desequilíbrio e alcança um nível mais complexo.",
  },
  {
    prompt: "Quais fatores são articulados na explicação do desenvolvimento cognitivo?",
    options: [
      "Maturação, experiência e interação social",
      "Somente maturação biológica, sem experiência",
      "Somente transmissão social, sem ação do sujeito",
      "Apenas repetição de respostas reflexas",
    ],
    correctAnswer: "Maturação, experiência e interação social",
    explanation: "O material articula maturação, experiência e interação social na progressão do desenvolvimento.",
  },
  {
    prompt: "Qual é a sequência de estágios cognitivos apresentada por Piaget?",
    options: [
      "Sensório-motor, pré-operatório, operatório-concreto e operatório-formal",
      "Pré-operatório, operatório-formal, sensório-motor e operatório-concreto",
      "Operatório-concreto, pré-operatório, sensório-motor e formal",
      "Sensório-motor, operatório-concreto, pré-operatório e formal",
    ],
    correctAnswer: "Sensório-motor, pré-operatório, operatório-concreto e operatório-formal",
    explanation: "A teoria organiza os estágios nessa ordem de sucessão e aumento de complexidade.",
  },
  {
    prompt: "Como se caracteriza a inteligência no estágio sensório-motor?",
    options: [
      "É prática e se organiza por ações e percepções entre 0 e 2 anos",
      "Opera formalmente sobre proposições abstratas desde o nascimento",
      "Baseia-se em conservação e lógica aplicada a objetos entre 7 e 11 anos",
      "Usa principalmente hipóteses e raciocínio dedutivo na primeira infância",
    ],
    correctAnswer: "É prática e se organiza por ações e percepções entre 0 e 2 anos",
    explanation: "O estágio sensório-motor é descrito como inteligência prática construída por ações e percepções.",
  },
  {
    prompt: "Qual combinação pertence ao período pré-operatório?",
    options: [
      "Representação, linguagem e função simbólica entre 2 e 7 anos",
      "Lógica formal, proposições e raciocínio hipotético-dedutivo",
      "Conservação, reversibilidade e lógica aplicada a objetos concretos",
      "Ações reflexas sem representação e inteligência prática",
    ],
    correctAnswer: "Representação, linguagem e função simbólica entre 2 e 7 anos",
    explanation: "O período pré-operatório é associado à representação, à linguagem e à função simbólica.",
  },
  {
    prompt: "Qual estágio é associado à lógica aplicada a objetos concretos?",
    options: [
      "Operatório-concreto",
      "Sensório-motor",
      "Pré-operatório",
      "Operatório-formal",
    ],
    correctAnswer: "Operatório-concreto",
    explanation: "O operatório-concreto é descrito como o estágio em que a lógica se aplica a objetos e situações concretas.",
  },
  {
    prompt: "O estágio operatório-formal envolve raciocínio abstrato e hipotético-dedutivo.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "A partir desse estágio, a teoria destaca raciocínio abstrato e hipotético-dedutivo.",
  },
], [developmentQuestionSources.book, developmentQuestionSources.unidade2Slides]);

const unidade3Questions: DevelopmentTextQuestion[] = applyQuestionSources([
  {
    prompt: "A inteligência é apresentada como um processo de adaptação que envolve as funções cognitivas e tende ao equilíbrio.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "Essa é a definição de inteligência apresentada no material sobre os estágios de Piaget.",
  },
  {
    prompt: "Qual conjunto caracteriza o estágio sensório-motor, de 0 a 2 anos?",
    options: [
      "Comportamento motor, adaptações reflexas e ausência inicial de representação mental",
      "Pensamento abstrato, hipóteses e lógica formal",
      "Função simbólica, egocentrismo e lógica transdutiva",
      "Ações interiorizadas reversíveis sobre objetos concretos",
    ],
    correctAnswer: "Comportamento motor, adaptações reflexas e ausência inicial de representação mental",
    explanation: "O sensório-motor é descrito por comportamento motor, passagem de reflexos a movimentos voluntários e construção progressiva da representação.",
  },
  {
    prompt: "Qual alternativa reúne aquisições e características do período pré-operatório, de 2 a 7 anos?",
    options: [
      "Função simbólica, representação, linguagem e jogo simbólico",
      "Ação interiorizada reversível, conservação e lógica formal",
      "Reflexos, ausência de representação e inteligência prática",
      "Hipóteses, proposições e raciocínio hipotético-dedutivo",
    ],
    correctAnswer: "Função simbólica, representação, linguagem e jogo simbólico",
    explanation: "Os resumos associam essas aquisições ao pré-operatório; ações reversíveis e hipóteses pertencem a momentos posteriores.",
  },
  {
    prompt: "Como a lógica transdutiva do período pré-operatório é caracterizada?",
    options: [
      "Liga fatos isolados que não mantêm relação e ainda não faz generalizações",
      "Parte de experiências para formular um princípio geral",
      "Aplica lógica formal a hipóteses e proposições",
      "Coordena uma transformação direta com sua operação inversa",
    ],
    correctAnswer: "Liga fatos isolados que não mantêm relação e ainda não faz generalizações",
    explanation: "A lógica transdutiva percebe fatos como isolados e os liga sem relação entre si; partir do particular ao geral é lógica indutiva.",
  },
  {
    prompt: "Qual é a principal característica do estágio operatório-concreto?",
    options: [
      "Reversibilidade da ação interiorizada",
      "Ausência de representação mental do objeto",
      "Ligação de fatos isolados sem generalização",
      "Raciocínio formal sobre hipóteses e proposições",
    ],
    correctAnswer: "Reversibilidade da ação interiorizada",
    explanation: "O material define a reversibilidade da ação interiorizada como principal característica do operatório-concreto.",
  },
  {
    prompt: "Como a descentração se manifesta no estágio operatório-concreto?",
    options: [
      "Ao considerar um objeto por vários aspectos e múltiplas variáveis",
      "Ao concentrar o pensamento em uma única variável",
      "Ao ligar fatos isolados sem estabelecer relações",
      "Ao raciocinar apenas sobre hipóteses não relacionadas a objetos",
    ],
    correctAnswer: "Ao considerar um objeto por vários aspectos e múltiplas variáveis",
    explanation: "Descentração é o pensamento que leva a múltiplas variáveis, superando o foco em um único aspecto.",
  },
  {
    prompt: "Conservação significa reconhecer que quantidade ou número permanecem apesar da mudança de aparência.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "As tarefas com líquido, argila e fileiras de peças ilustram essa invariância.",
  },
  {
    prompt: "Qual exemplo expressa a reversibilidade da ação interiorizada?",
    options: [
      "Compreender que uma operação de juntar pode ser pensada também como separar",
      "Considerar apenas a aparência final de um objeto transformado",
      "Ligar dois fatos isolados sem buscar sua relação",
      "Substituir objetos concretos por hipóteses sem realizar operações",
    ],
    correctAnswer: "Compreender que uma operação de juntar pode ser pensada também como separar",
    explanation: "A reversibilidade permite pensar a transformação em sentidos inversos, como juntar e separar.",
  },
  {
    prompt: "Qual associação entre estágios e tipos de jogo corresponde ao material?",
    options: [
      "Jogo de exercício no sensório-motor, simbólico no pré-operatório e de regras no operatório",
      "Jogo simbólico no sensório-motor, de regras no pré-operatório e de exercício no operatório",
      "Jogo de regras no sensório-motor, de exercício no pré-operatório e simbólico no operatório",
      "Jogo de construção no sensório-motor, simbólico no operatório e de exercício no formal",
    ],
    correctAnswer: "Jogo de exercício no sensório-motor, simbólico no pré-operatório e de regras no operatório",
    explanation: "O quadro associa jogo de exercício ao sensório-motor, jogo simbólico ao pré-operatório e jogo de regras ao período operatório; construção aparece na transição.",
  },
  {
    prompt: "Uma estratégia pedagógica coerente com os resumos é estimular participação ativa, debates e formulação, teste e reformulação de hipóteses.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "A revisão valoriza o que o aluno já sabe, atividades desafiadoras e participação ativa no ensino.",
  },
  {
    prompt: "Como o material diferencia instinto, hábito e inteligência?",
    options: [
      "Instinto é adaptação hereditária, hábito é adquirida e inteligência é criada",
      "Instinto é adaptação criada, hábito é hereditária e inteligência é adquirida",
      "Instinto, hábito e inteligência são três nomes para adaptação hereditária",
      "Instinto e hábito são formas de pensamento formal e inteligência é reflexa",
    ],
    correctAnswer: "Instinto é adaptação hereditária, hábito é adquirida e inteligência é criada",
    explanation: "Os resumos distinguem instinto, hábito e inteligência pelas formas hereditária, adquirida e criada de adaptação.",
  },
  {
    prompt: "A sequência dos estágios de Piaget expressa uma progressão na complexidade da inteligência.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "Os estágios seguem uma ordem de sucessão e acompanham formas progressivamente mais complexas de resolver problemas.",
  },
  {
    prompt: "O que predomina no estágio sensório-motor?",
    options: [
      "Comportamento motor, ações e construção progressiva da representação",
      "Proposições abstratas e raciocínio hipotético-dedutivo",
      "Conservação, seriação e classificação já interiorizadas",
      "Pensamento simbólico sem participação da percepção e do movimento",
    ],
    correctAnswer: "Comportamento motor, ações e construção progressiva da representação",
    explanation: "No sensório-motor predominam comportamento motor e ações; a representação se constrói progressivamente.",
  },
  {
    prompt: "O que ocorre com as adaptações reflexas no estágio sensório-motor?",
    options: [
      "Elas se transformam progressivamente em movimentos voluntários",
      "Elas permanecem inalteradas até o estágio operatório-formal",
      "Elas são substituídas imediatamente por hipóteses abstratas",
      "Elas desaparecem sem relação com novas ações",
    ],
    correctAnswer: "Elas se transformam progressivamente em movimentos voluntários",
    explanation: "O material descreve a passagem das adaptações reflexas para movimentos cada vez mais voluntários.",
  },
  {
    prompt: "Qual processo aparece ao longo das fases do sensório-motor?",
    options: [
      "Experimentação ativa, novos significados e início da representação",
      "Lógica formal, proposições e hipóteses abstratas",
      "Conservação de quantidade sem apoio em ações",
      "Classificação hierárquica já independente da experiência",
    ],
    correctAnswer: "Experimentação ativa, novos significados e início da representação",
    explanation: "As fases indicadas incluem experimentação ativa, construção de novos significados e início da representação.",
  },
  {
    prompt: "Qual conjunto caracteriza o período pré-operatório?",
    options: [
      "Função simbólica, representação, linguagem e jogo simbólico",
      "Movimentos reflexos, ausência de representação e inteligência prática",
      "Reversibilidade, conservação e lógica formal",
      "Hipóteses, proposições e deduções sobre possibilidades",
    ],
    correctAnswer: "Função simbólica, representação, linguagem e jogo simbólico",
    explanation: "Essas aquisições são associadas ao período pré-operatório, entre 2 e 7 anos.",
  },
  {
    prompt: "Por que as ações sensório-motoras ainda não são imediatamente operações no pré-operatório?",
    options: [
      "Porque ainda não se transformaram em operações reversíveis",
      "Porque a criança já opera formalmente sobre hipóteses",
      "Porque a função simbólica impede qualquer forma de representação",
      "Porque a conservação já substituiu a ação e a linguagem",
    ],
    correctAnswer: "Porque ainda não se transformaram em operações reversíveis",
    explanation: "O material destaca representação e linguagem no pré-operatório, mas sem reversibilidade operatória imediata.",
  },
  {
    prompt: "Qual combinação reúne características do pensamento pré-operatório?",
    options: [
      "Egocentrismo, animismo, centração e pensamento mágico",
      "Descentração, conservação, reversibilidade e lógica formal",
      "Raciocínio hipotético-dedutivo, proposições e abstração",
      "Seriação, classificação e operações inversas plenamente constituídas",
    ],
    correctAnswer: "Egocentrismo, animismo, centração e pensamento mágico",
    explanation: "Os resumos associam essas características ao pensamento pré-operatório.",
  },
  {
    prompt: "Qual é a diferença entre lógica transdutiva e lógica indutiva?",
    options: [
      "A transdutiva liga fatos isolados; a indutiva parte da experiência para um princípio geral",
      "A transdutiva parte do particular ao geral; a indutiva liga fatos sem relação",
      "Ambas aplicam lógica formal a hipóteses abstratas",
      "A transdutiva é reversível; a indutiva depende somente de reflexos",
    ],
    correctAnswer: "A transdutiva liga fatos isolados; a indutiva parte da experiência para um princípio geral",
    explanation: "O material contrasta a ligação de fatos isolados da transdução com a generalização baseada na experiência da indução.",
  },
  {
    prompt: "O que significa reversibilidade da ação interiorizada?",
    options: [
      "Compreender uma transformação em mais de um sentido, incluindo sua operação inversa",
      "Concentrar-se somente na aparência final de uma transformação",
      "Relacionar fatos isolados sem buscar sua operação",
      "Raciocinar sobre hipóteses sem considerar qualquer transformação",
    ],
    correctAnswer: "Compreender uma transformação em mais de um sentido, incluindo sua operação inversa",
    explanation: "A reversibilidade permite pensar a transformação direta e sua inversa como operações relacionadas.",
  },
  {
    prompt: "Qual situação demonstra descentração no operatório-concreto?",
    options: [
      "Considerar simultaneamente tamanho, forma e quantidade de um conjunto",
      "Julgar a quantidade apenas pelo recipiente mais alto",
      "Focar somente no comprimento de uma fileira espalhada",
      "Associar dois fatos sem considerar as relações entre eles",
    ],
    correctAnswer: "Considerar simultaneamente tamanho, forma e quantidade de um conjunto",
    explanation: "Descentração significa coordenar múltiplos aspectos e variáveis, em vez de centrar-se em um só.",
  },
  {
    prompt: "Em uma tarefa de conservação de líquidos, o que permanece invariável após mudar o recipiente?",
    options: [
      "A quantidade de líquido",
      "A altura do recipiente",
      "A largura da superfície do líquido",
      "A aparência visual do recipiente",
    ],
    correctAnswer: "A quantidade de líquido",
    explanation: "Na conservação, a aparência e o formato mudam, mas a quantidade permanece a mesma.",
  },
  {
    prompt: "O que a tarefa de conservação da argila avalia?",
    options: [
      "Se a criança reconhece a mesma quantidade apesar de a argila ser alongada",
      "Se a criança identifica qual forma é mais colorida",
      "Se a criança aplica lógica formal a uma proposição abstrata",
      "Se a criança substitui a ação por uma resposta reflexa",
    ],
    correctAnswer: "Se a criança reconhece a mesma quantidade apesar de a argila ser alongada",
    explanation: "O exemplo da argila mostra que a mudança de forma não altera necessariamente a quantidade.",
  },
  {
    prompt: "Em uma fileira de peças que é espalhada, a conservação de número consiste em reconhecer que:",
    options: [
      "O número de peças permanece, apesar do maior comprimento da fileira",
      "A fileira mais longa sempre tem mais peças",
      "As peças deixam de formar um conjunto quando são afastadas",
      "A aparência substitui a comparação da quantidade",
    ],
    correctAnswer: "O número de peças permanece, apesar do maior comprimento da fileira",
    explanation: "A tarefa ilustra a invariância do número diante da mudança de espaçamento entre as peças.",
  },
  {
    prompt: "O que caracteriza a classificação como operação relacionada ao pensamento concreto?",
    options: [
      "Agrupar objetos segundo características comuns e relações de inclusão",
      "Ordenar objetos exclusivamente por uma dimensão contínua",
      "Ligar fatos isolados sem estabelecer qualquer relação",
      "Formular proposições sem apoio em objetos ou experiências",
    ],
    correctAnswer: "Agrupar objetos segundo características comuns e relações de inclusão",
    explanation: "Classificar envolve organizar objetos por características comuns e relações entre classes.",
  },
  {
    prompt: "O que caracteriza a seriação?",
    options: [
      "Ordenar elementos segundo uma dimensão, como tamanho ou peso",
      "Agrupar elementos sem considerar qualquer característica",
      "Representar objetos ausentes por meio de símbolos",
      "Deduzir consequências de hipóteses formais",
    ],
    correctAnswer: "Ordenar elementos segundo uma dimensão, como tamanho ou peso",
    explanation: "Seriar é estabelecer uma ordem entre elementos conforme uma dimensão observável, como tamanho ou peso.",
  },
  {
    prompt: "Qual alternativa descreve o pensamento operatório-formal?",
    options: [
      "Raciocina sobre hipóteses e proposições e pode operar de modo abstrato",
      "Aprende exclusivamente por reflexos, sentidos e movimentos",
      "Fixa-se na aparência e em uma única variável",
      "Reconhece apenas transformações que podem ser manipuladas diretamente",
    ],
    correctAnswer: "Raciocina sobre hipóteses e proposições e pode operar de modo abstrato",
    explanation: "O operatório-formal amplia o pensamento para hipóteses, proposições, futuro e abstração.",
  },
  {
    prompt: "O raciocínio hipotético-dedutivo envolve qual sequência?",
    options: [
      "Formular hipóteses, deduzir consequências e testá-las",
      "Repetir reflexos, ignorar resultados e evitar reformulações",
      "Centrar-se em uma aparência e rejeitar outras variáveis",
      "Memorizar uma resposta sem relacioná-la a uma situação",
    ],
    correctAnswer: "Formular hipóteses, deduzir consequências e testá-las",
    explanation: "O raciocínio hipotético-dedutivo trabalha com possibilidades e com o teste das consequências das hipóteses.",
  },
  {
    prompt: "Qual associação entre estágio e tipo de jogo está de acordo com os materiais?",
    options: [
      "Exercício no sensório-motor, simbólico no pré-operatório e regras no operatório",
      "Regras no sensório-motor, simbólico no formal e exercício no pré-operatório",
      "Simbólico no sensório-motor, exercício no operatório e regras no formal",
      "Construção exclusivamente no formal, sem jogos nos demais períodos",
    ],
    correctAnswer: "Exercício no sensório-motor, simbólico no pré-operatório e regras no operatório",
    explanation: "O quadro associa jogo de exercício ao sensório-motor, simbólico ao pré-operatório e regras aos períodos operatórios.",
  },
  {
    prompt: "Qual prática pedagógica é coerente com a participação ativa descrita nos resumos?",
    options: [
      "Partir do que o aluno sabe e propor desafios, debates e perguntas",
      "Transmitir respostas prontas sem permitir experimentação",
      "Evitar atividades em grupo para impedir a cooperação",
      "Avaliar somente a memorização de uma solução única",
    ],
    correctAnswer: "Partir do que o aluno sabe e propor desafios, debates e perguntas",
    explanation: "Os resumos valorizam o conhecimento prévio, a participação, os debates, as perguntas e as atividades desafiadoras.",
  },
  {
    prompt: "A formulação, o teste e a reformulação de hipóteses favorecem uma aprendizagem ativa e o pensamento crítico.",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    explanation: "Essa estratégia aparece entre as implicações pedagógicas destacadas para atividades desafiadoras e colaborativas.",
  },
], [
  developmentQuestionSources.book,
  developmentQuestionSources.unidade3Slides,
  developmentQuestionSources.unidade3Slides2,
]);

export const developmentUnits: DevelopmentUnit[] = [
  {
    slug: "desenvolvimento-anos-iniciais-escolares-unidade-1",
    title: "Unidade 1 — Desenvolvimento infantil e escolar",
    status: "complete",
    duration: "20 minutos",
    objectives: [
      "Reconhecer aspectos físicos, motores e cognitivos do desenvolvimento de 0 a 2 anos.",
      "Relacionar a progressão inicial da linguagem a gestos, palavras, frases simples e interações com cuidadores.",
      "Identificar função simbólica, egocentrismo e jogo simbólico no período de 2 a 7 anos.",
      "Descrever decentramento, reversibilidade e pensamento operatório-concreto entre 7 e 11 anos.",
    ],
    videoTitle: "Desenvolvimento infantil e escolar",
    videoDescription: "Videoaula introdutória sobre os períodos do desenvolvimento abordados nesta unidade.",
    videoText: [
      "Segundo Jean Piaget, dos 0 aos 2 anos a criança vive o estágio sensório-motor: aprende ao agir sobre o mundo, por meio dos sentidos e dos movimentos. Nesse percurso, os reflexos iniciais dão lugar a ações cada vez mais intencionais e à construção da permanência do objeto.",
      "Entre 2 e 7 anos, ocorre o período pré-operatório. A linguagem se amplia, a criança passa a usar símbolos em brincadeiras e desenhos e ainda tende a interpretar as situações a partir do próprio ponto de vista, característica chamada de egocentrismo.",
      "Dos 7 aos 11 anos, Piaget descreve o estágio operatório-concreto. A criança passa a coordenar diferentes pontos de vista, compreende conservação de quantidade e reversibilidade e resolve problemas lógicos quando relacionados a situações concretas.",
      "Esses estágios ajudam a planejar experiências de aprendizagem adequadas a cada faixa etária: exploração e ação nos primeiros anos, jogos simbólicos na educação infantil e atividades com regras, classificação, seriação e resolução de problemas na idade escolar.",
    ],
    mentalMap: unidade1MindMap,
    studyGuide: unidade1StudyGuide,
    videoUrl: developmentVideoUrl,
    posterUrl: "/conteudos/desenvolvimento-anos-iniciais-escolares/unidade-1-desenvolvimento-motor.jpg",
    testTextQuestions: unidade1Questions,
    reviewItems: [
      "Plasticidade cerebral e exploração nos primeiros anos",
      "Permanência do objeto e memória auditiva",
      "Progressão da linguagem inicial",
      "Função simbólica, egocentrismo e jogo simbólico",
      "Decentramento, reversibilidade e conservação",
    ],
    testDescription: "Revise os principais aspectos do desenvolvimento de 0 a 11 anos.",
    worksheetText: "Use esta revisão textual para retomar os conceitos da unidade.",
    atlasTitle: "Galeria textual do desenvolvimento",
    atlasDescription: "Galeria textual para revisar conceitos e faixas etárias. As imagens usam um fallback neutro enquanto não há material visual associado.",
    atlasImageUrl: fallbackImageUrl,
    atlasItems: [
      { title: "0 a 2 anos", imageUrl: fallbackImageUrl, description: "Plasticidade, movimento, exploração, estágio sensório-motor e permanência do objeto." },
      { title: "2 a 7 anos", imageUrl: fallbackImageUrl, description: "Função simbólica, egocentrismo, linguagem e jogo simbólico no período pré-operatório." },
      { title: "7 a 11 anos", imageUrl: fallbackImageUrl, description: "Estágio operatório-concreto, decentramento, reversibilidade e desenvolvimento motor e visual." },
    ],
    summaryTables: [
      {
        title: "Faixas etárias e estágios de Piaget",
        rows: [
          { label: "0 a 2 anos — sensório-motor", value: "Aprendizagem por sentidos e ações; construção da permanência do objeto e da memória." },
          { label: "2 a 7 anos — pré-operatório", value: "Função simbólica, linguagem, egocentrismo e jogo simbólico; ainda sem reversibilidade." },
          { label: "7 a 11 anos — operatório-concreto", value: "Descentração, reversibilidade, conservação, hierarquias e lógica indutiva em situações concretas." },
        ],
      },
      {
        title: "Marcos para revisar por faixa",
        rows: [
          { label: "0 a 2 anos", value: "Arrulhos, balbucios, gestos, primeiras palavras, holofrases e frases telegráficas; vocabulário aumenta entre 16 e 24 meses." },
          { label: "2 a 7 anos", value: "Crescimento mais lento; habilidades motoras finas, sequência de desenhos de rabisco a figuras e melhora gradual do controle corporal." },
          { label: "7 a 11 anos", value: "Linguagem mais refinada, habilidades metalinguísticas, conversa estruturada e melhora da acuidade visual e motora." },
        ],
      },
      {
        title: "Implicações escolares e de desenvolvimento",
        rows: [
          { label: "Primeiros anos", value: "Favorecer movimento, exploração e interações que acompanhem a construção da linguagem e da permanência do objeto." },
          { label: "2 a 7 anos", value: "Propor experiências compatíveis com o desenvolvimento do controle corporal, dos desenhos, da linguagem e dos esquemas simbólicos." },
          { label: "7 a 11 anos", value: "Usar metas claras, boa comunicação, apoio e incentivo; propor situações concretas que estimulem pensamento lógico, descentração e reversibilidade." },
        ],
      },
    ],
  },
  {
    slug: "desenvolvimento-anos-iniciais-escolares-unidade-2",
    title: "Unidade 2 — Inteligência e epistemologia genética",
    status: "complete",
    duration: "20 minutos",
    objectives: [
      "Distinguir inatismo, empirismo e interacionismo como teorias sobre a inteligência.",
      "Explicar a relação dinâmica entre sujeito e objeto no construtivismo.",
      "Definir esquema, assimilação, acomodação e equilibração.",
      "Organizar os quatro estágios cognitivos apresentados por Piaget.",
    ],
    videoTitle: "Inteligência e epistemologia genética",
    videoDescription: "Videoaula introdutória sobre a construção do conhecimento e o desenvolvimento cognitivo.",
    videoText: [
      "A epistemologia genética de Jean Piaget investiga como o conhecimento é construído pela inteligência humana, desde o nascimento até a vida adulta. O sujeito epistêmico é apresentado como aquele que permite estudar essa construção e sua organização.",
      "Os resumos distinguem inatismo, empirismo e interacionismo. No interacionismo, destacado pelo construtivismo, a inteligência se constrói na interação dinâmica entre sujeito e objeto, com aspectos de irredutibilidade, complementaridade e indissociabilidade.",
      "O esquema é uma base do pensamento e ajuda a organizar a experiência. A assimilação integra novas informações a estruturas existentes; a acomodação modifica essas estruturas para incorporar o novo. A equilibração busca o equilíbrio entre esses processos.",
      "A teoria organiza o desenvolvimento em estágios sensório-motor, pré-operatório, operatório-concreto e operatório-formal. Cada estágio expressa uma progressão na complexidade da inteligência e na resolução de problemas, articulando fatores biológicos e ambientais.",
    ],
    mentalMap: unidade2MindMap,
    studyGuide: unidade2StudyGuide,
    videoUrl: developmentVideoUrl,
    posterUrl: "/conteudos/desenvolvimento-anos-iniciais-escolares/unidade-2-inteligencia-construtivismo.png",
    testTextQuestions: unidade2Questions,
    reviewItems: [
      "Sujeito epistêmico e construção do conhecimento",
      "Inatismo, empirismo e interacionismo",
      "Relação sujeito-objeto",
      "Esquemas, assimilação e acomodação",
      "Equilibração e estágios cognitivos",
    ],
    testDescription: "Teste sua compreensão dos conceitos centrais da epistemologia genética.",
    worksheetText: "Use esta revisão textual para retomar os conceitos da unidade.",
    atlasTitle: "Galeria textual da construção do conhecimento",
    atlasDescription: "Galeria textual para organizar os conceitos da epistemologia genética. As imagens usam um fallback neutro enquanto não há material visual associado.",
    atlasImageUrl: fallbackImageUrl,
    atlasItems: [
      { title: "Sujeito e objeto", imageUrl: fallbackImageUrl, description: "Relação dinâmica na qual o conhecimento é construído." },
      { title: "Assimilação e acomodação", imageUrl: fallbackImageUrl, description: "Processos complementares de integração do novo e modificação das estruturas mentais." },
      { title: "Equilibração", imageUrl: fallbackImageUrl, description: "Busca de equilíbrio entre assimilação e acomodação na adaptação cognitiva." },
    ],
    summaryTables: [
      {
        title: "Teorias e construção do conhecimento",
        rows: [
          { label: "Inatismo", value: "Entende a inteligência como dom biológico que amadurece com o tempo." },
          { label: "Empirismo", value: "Entende a inteligência como adquirida pela experiência, com o sujeito como folha em branco." },
          { label: "Interacionismo", value: "Entende a inteligência como construída na interação do sujeito com o ambiente." },
          { label: "Construtivismo", value: "Explica construções sucessivas e recíprocas entre sujeito e ambiente na produção do conhecimento." },
        ],
      },
      {
        title: "Esquemas, assimilação e acomodação",
        rows: [
          { label: "Esquema", value: "Estrutura básica que organiza a realidade, o pensamento e a ação para processar informações." },
          { label: "Assimilação", value: "Interpreta e incorpora uma informação nova aos esquemas existentes." },
          { label: "Acomodação", value: "Modifica esquemas existentes ou cria novos para atender às singularidades do objeto." },
          { label: "Exemplo para lembrar", value: "Chamar animais de quatro patas de ‘au au’ assimila; distinguir o cavalo e criar um novo esquema acomoda." },
        ],
      },
      {
        title: "Equilibração e progressão cognitiva",
        rows: [
          { label: "Equilibração", value: "Busca contínua de equilíbrio entre assimilação e acomodação durante a adaptação cognitiva." },
          { label: "Movimento do desenvolvimento", value: "Equilíbrio inicial, desequilíbrio, reequilíbrio e avanço para um nível superior." },
          { label: "Fatores articulados", value: "Maturação, experiência e interação social participam do desenvolvimento; nenhum fator é suficiente isoladamente." },
          { label: "Revisão dos estágios", value: "Sensório-motor, pré-operatório, operatório-concreto e operatório-formal expressam progressão na complexidade da inteligência." },
        ],
      },
    ],
  },
  {
    slug: "desenvolvimento-anos-iniciais-escolares-unidade-3",
    title: "Unidade 3 — Estágios, jogos e aprendizagem",
    status: "complete",
    duration: "20 minutos",
    objectives: [
      "Descrever as características centrais dos estágios sensório-motor, pré-operatório, operatório-concreto e operatório-formal.",
      "Reconhecer conservação de quantidade e número como tarefa de desenvolvimento cognitivo.",
      "Relacionar jogo sensório-motor, jogo simbólico e jogo baseado em regras às etapas apresentadas.",
      "Identificar implicações pedagógicas relacionadas à participação ativa, ao pensamento crítico e à interação.",
    ],
    videoTitle: "Estágios do desenvolvimento e aprendizagem",
    videoDescription: "Videoaula introdutória sobre estágios cognitivos, jogos e aprendizagem escolar.",
    videoText: [
      "A inteligência cognitiva é apresentada como um processo de adaptação que busca equilíbrio. Os resumos distinguem comportamentos instintivos, hábitos e uma inteligência construída, acompanhando mudanças na forma de resolver problemas.",
      "No sensório-motor, de 0 a 2 anos, predominam comportamento motor e ações; no pré-operatório, de 2 a 7 anos, aparecem função simbólica, egocentrismo e dificuldades com lógica e conservação. No operatório-concreto, de 7 a 12 anos, destacam-se reversibilidade e consideração de múltiplos aspectos.",
      "O estágio operatório-formal, apresentado a partir de 12 anos, envolve pensamento abstrato, raciocínio lógico e consideração de situações hipotéticas. A progressão dos estágios acompanha a complexidade da inteligência e da resolução de problemas.",
      "Os jogos acompanham essa progressão: jogo sensório-motor para bebês, jogo simbólico para pré-escolares e jogo baseado em regras para crianças mais velhas. Pedagogicamente, os resumos valorizam participação ativa, pensamento crítico, experiências e equilíbrio entre maturação, experiência e transmissão social.",
    ],
    mentalMap: unidade3MindMap,
    studyGuide: unidade3StudyGuide,
    videoUrl: developmentVideoUrl,
    posterUrl: "/conteudos/desenvolvimento-anos-iniciais-escolares/unidade-3-conservacao.jpg",
    testTextQuestions: unidade3Questions,
    reviewItems: [
      "Adaptação e equilíbrio da inteligência",
      "Características dos quatro estágios",
      "Conservação de quantidade e número",
      "Jogos sensório-motor, simbólico e baseado em regras",
      "Participação ativa e pensamento crítico na aprendizagem",
    ],
    testDescription: "Revise estágios, conservação, jogos e implicações pedagógicas.",
    worksheetText: "Use esta revisão textual para retomar os conceitos da unidade.",
    atlasTitle: "Galeria textual dos estágios e jogos",
    atlasDescription: "Galeria textual para revisar relações entre estágios cognitivos e tipos de jogo. As imagens usam um fallback neutro enquanto não há material visual associado.",
    atlasImageUrl: fallbackImageUrl,
    atlasItems: [
      { title: "Estágios cognitivos", imageUrl: fallbackImageUrl, description: "Sequência do sensório-motor ao operatório-formal, com progressão da complexidade da inteligência." },
      { title: "Conservação", imageUrl: fallbackImageUrl, description: "Compreensão de que a quantidade permanece apesar da mudança de aparência." },
      { title: "Tipos de jogo", imageUrl: fallbackImageUrl, description: "Jogo sensório-motor, simbólico e baseado em regras, conforme a progressão apresentada." },
    ],
    summaryTables: [
      {
        title: "Quatro estágios do desenvolvimento",
        rows: [
          { label: "Sensório-motor — 0 a 2 anos", value: "Comportamento motor, adaptações reflexas, ações voluntárias e início da representação." },
          { label: "Pré-operatório — 2 a 7 anos", value: "Função simbólica, representação, linguagem e jogo simbólico; egocentrismo, centração e lógica transdutiva." },
          { label: "Operatório-concreto — 7 a 12 anos", value: "Ações interiorizadas reversíveis, descentração e lógica aplicada a objetos manipuláveis." },
          { label: "Operatório-formal — a partir de 12 anos", value: "Hipóteses, proposições, pensamento abstrato e lógica formal; os materiais também indicam 11+ para o início." },
        ],
      },
      {
        title: "Conservação, descentração e reversibilidade",
        rows: [
          { label: "Conservação", value: "A quantidade ou o número permanecem apesar da mudança de aparência." },
          { label: "Tarefas", value: "Compare líquido em copos de formatos diferentes, argila alongada e fileiras de peças espalhadas." },
          { label: "Descentração", value: "Considera um objeto por vários aspectos e coordena múltiplas variáveis." },
          { label: "Reversibilidade", value: "Interioriza uma transformação e compreende a operação inversa, como juntar e separar." },
        ],
      },
      {
        title: "Jogos e estratégias pedagógicas",
        rows: [
          { label: "Sensório-motor", value: "Jogo de exercício para bebês; relaciona-se à ação e à exploração." },
          { label: "Pré-operatório", value: "Jogo simbólico para pré-escolares; jogos de construção aparecem na transição." },
          { label: "Operatório", value: "Jogo de regras para crianças mais velhas; o quadro do material o associa ao período operatório (7 a 15 anos)." },
          { label: "Ensino ativo", value: "Partir do que o aluno já sabe, promover debates e perguntas e propor hipóteses para testar e reformular." },
          { label: "Finalidade", value: "Favorecer autonomia, criatividade, responsabilidade, solidariedade e pensamento crítico, sem uma receita única." },
        ],
      },
    ],
  },
];

export function getDevelopmentUnit(slug?: string) {
  return developmentUnits.find((unit) => unit.slug === slug);
}
