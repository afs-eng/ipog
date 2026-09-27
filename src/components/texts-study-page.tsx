"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { textsUnits } from "@/lib/texts-units";

type TextsStudyPageProps = {
  subjectName: string;
  subjectDescription: string;
};

type DeepLesson = {
  goal: string;
  concepts: { title: string; explanation: string; examples?: string[] }[];
  sections: { title: string; body: string }[];
  worked: { title: string; source: string; analysis: string };
  recall: { question: string; answer: string }[];
};

const deepLessons: Record<string, DeepLesson> = {
  "producao-interpretacao-textos-linguagem": {
    goal: "Aprender a interpretar sem confundir percepção pessoal com evidência textual, articulando linguagem, contexto e subjetividade.",
    concepts: [
      {
        title: "Linguagem como sistema",
        explanation: "A partir de Saussure, a língua pode ser entendida como um sistema social de signos. Isso significa que as palavras não valem isoladamente: elas ganham sentido pelas relações que estabelecem com outras palavras, com regras compartilhadas e com usos culturais.",
        examples: [
          "A palavra 'crise' pode indicar um episódio emocional, uma crise econômica ou um momento de ruptura. O sentido depende do campo em que aparece.",
          "Em Psicologia, 'resistência' não deve ser usada como rótulo automático; o termo precisa fazer sentido dentro de um acompanhamento e de uma hipótese sustentada.",
        ],
      },
      {
        title: "Langue e parole",
        explanation: "Langue é o sistema comum da língua, aquilo que uma comunidade reconhece como possível. Parole é o uso concreto que um sujeito faz desse sistema quando fala, escreve, hesita, escolhe uma palavra ou organiza uma narrativa.",
        examples: [
          "Langue: as regras e convenções que permitem formar frases em português.",
          "Parole: a forma singular como uma paciente diz 'eu estou bem' após uma pausa longa e com voz baixa.",
        ],
      },
      {
        title: "Lente interna",
        explanation: "Os slides destacam que não vemos as coisas simplesmente como são: interpretamos a partir de experiências, afetos, medos, expectativas e repertórios. Por isso, a interpretação precisa voltar ao texto para separar pista observável de impressão subjetiva.",
        examples: [
          "Impressão: 'ele foi frio'. Dado observável: 'ele respondeu com frases curtas e sem contato visual frequente'.",
          "A primeira leitura pode ser útil como hipótese, mas precisa ser conferida no enunciado, no contexto e na sequência da fala.",
        ],
      },
      {
        title: "Condições de produção",
        explanation: "Todo enunciado é produzido em uma situação: alguém fala, de um lugar social, para alguém, com certa finalidade, em um momento histórico. Essas condições limitam e orientam os sentidos possíveis.",
        examples: [
          "A frase 'você precisa melhorar' tem efeitos diferentes dita por professor, terapeuta, familiar ou chefe.",
          "Uma resposta em avaliação psicológica pode ser afetada pela instituição, pelo medo de julgamento e pelo objetivo da entrevista.",
        ],
      },
    ],
    sections: [
      {
        title: "1. Comece pelo que está no enunciado",
        body: "Antes de interpretar, localize exatamente o que foi dito. Identifique verbos, marcas de tempo, conectivos e expressões de dúvida ou certeza. Em uma fala clínica, 'pausou', 'olhou para baixo' e 'mudou de assunto' são dados observáveis; já 'sentiu culpa' ou 'mentiu' são hipóteses que precisam de sustentação.",
      },
      {
        title: "2. Relacione palavra, sujeito e situação",
        body: "A mesma palavra pode ter efeitos diferentes conforme a situação. Um 'estou bem' dito de modo rápido, em uma entrevista formal, não tem necessariamente o mesmo valor de um 'estou bem' em uma conversa íntima. A análise deve observar interlocutores, finalidade, instituição, tema e sequência da fala.",
      },
      {
        title: "3. Teste sua hipótese interpretativa",
        body: "Uma boa interpretação não nasce apenas da intuição. Ela precisa responder: qual trecho sustenta esta conclusão? Há outra leitura possível? Estou acrescentando uma causa que o texto não autorizou? Esse cuidado evita transformar uma impressão pessoal em verdade sobre o outro.",
      },
    ],
    worked: {
      title: "Separando observação e interpretação",
      source: "Trecho: 'Após a pergunta sobre a família, a participante ficou em silêncio por alguns segundos e olhou para a janela.'",
      analysis: "É seguro afirmar que houve silêncio e mudança de direção do olhar. É possível levantar a hipótese de desconforto, mas não é correto concluir apenas por esse trecho que ela mentiu, ocultou trauma ou resistiu ao atendimento.",
    },
    recall: [
      { question: "Por que palavras não são neutras?", answer: "Porque carregam usos sociais, históricos e afetivos, além de fazerem parte de um sistema de sentidos compartilhado." },
      { question: "Qual é o risco da 'lente interna'?", answer: "Tomar a própria impressão como se fosse o sentido definitivo do texto ou da fala." },
      { question: "O que torna uma inferência aceitável?", answer: "Ela precisa ser sustentada por pistas do texto e pelas condições de produção do discurso." },
    ],
  },
  "producao-interpretacao-textos-discurso": {
    goal: "Compreender como a Análise do Discurso articula linguagem, ideologia, inconsciente e relações sociais na escuta psicológica.",
    concepts: [
      {
        title: "Análise do Discurso",
        explanation: "A AD investiga como os sentidos são produzidos nas relações sociais. Ela não trata a fala como um espelho transparente da intenção individual; observa como história, instituições, ideologia, memória discursiva e posições de sujeito atravessam o que pode ser dito.",
        examples: [
          "Em vez de perguntar apenas 'o que a pessoa quis dizer?', pergunte também 'em que contexto isso pôde ser dito dessa forma?'.",
          "A frase 'eu tenho que dar conta de tudo' pode carregar discursos sociais sobre produtividade, família, gênero e sucesso.",
        ],
      },
      {
        title: "Formação discursiva",
        explanation: "É o conjunto de regras, muitas vezes invisíveis, que define o que soa aceitável, possível ou legítimo em determinado contexto. Em uma instituição, por exemplo, certos modos de falar sobre sofrimento podem ser autorizados, enquanto outros são silenciados.",
        examples: [
          "Em um ambiente escolar, o aluno pode aprender que dizer 'não entendi' é sinal de fraqueza, dependendo da cultura da turma.",
          "Em uma empresa, sofrimento pode aparecer como 'cansaço' ou 'baixa performance', porque esse vocabulário é mais aceito naquele espaço.",
        ],
      },
      {
        title: "Ideologia em Marx",
        explanation: "Nos slides, Marx orienta a leitura de que o sujeito não aparece fora da sociedade. Família, mídia, instituições, classe social e normas culturais participam da construção de identidades e da naturalização de certas formas de sofrimento.",
        examples: [
          "Quando alguém diz 'se eu falhei, é porque não me esforcei o suficiente', pode estar reproduzindo um discurso individualizante sobre sucesso.",
          "A análise pergunta quais condições sociais estão sendo apagadas quando tudo vira responsabilidade individual.",
        ],
      },
      {
        title: "Inconsciente em Freud",
        explanation: "Freud contribui para pensar que a fala não é totalmente racional ou controlada. Lapsos, contradições, metáforas, silêncios e escolhas de palavras podem abrir pistas interpretativas, mas não funcionam como prova automática de diagnóstico.",
        examples: [
          "Um lapso pode ser anotado como dado de escuta, mas não deve virar conclusão isolada.",
          "Se uma pessoa muda de assunto sempre que fala da família, isso pode orientar uma pergunta clínica, não uma sentença pronta.",
        ],
      },
      {
        title: "Interdiscurso e memória discursiva",
        explanation: "Pêcheux ajuda a compreender que todo discurso carrega vozes anteriores. Quando alguém fala, mobiliza sentidos já circulantes na cultura, na família, na escola, na clínica e na mídia.",
        examples: [
          "Frases como 'homem não chora' ou 'mãe boa aguenta tudo' podem aparecer na fala individual como vozes sociais antigas.",
          "A escuta observa que o sujeito fala com palavras próprias, mas também com discursos que recebeu e repetiu ao longo da vida.",
        ],
      },
    ],
    sections: [
      {
        title: "1. O dito e o não dito",
        body: "O dito é aquilo que aparece na fala organizada: uma frase, uma narrativa, uma justificativa. O não dito não é simples ausência; pode aparecer em hesitações, cortes, contradições, mudanças de tema ou impossibilidades de nomear algo. A escuta clínica acolhe esses sinais sem forçar conclusão.",
      },
      {
        title: "2. O sujeito é também social",
        body: "A AD desloca a ideia de que o sofrimento é apenas interno. Ela pergunta como normas sociais, discursos familiares, exigências institucionais e ideais de normalidade participam da forma como o sujeito se percebe e relata sua experiência.",
      },
      {
        title: "3. A falha como pista, não como sentença",
        body: "Um lapso ou uma contradição pode ser clinicamente relevante, mas precisa ser trabalhado com prudência. A interpretação responsável não transforma uma palavra isolada em verdade sobre o inconsciente; ela acompanha recorrências, contexto e efeitos da fala.",
      },
      {
        title: "4. Saussure, Marx e Freud juntos",
        body: "Saussure ajuda a ver a linguagem como estrutura; Marx mostra que os discursos carregam ideologia; Freud abre a escuta para o inconsciente. Em conjunto, essas perspectivas mostram que a subjetividade é linguística, social e atravessada por conflitos.",
      },
    ],
    worked: {
      title: "Lendo o silêncio sem extrapolar",
      source: "Trecho: 'Ao falar da perda, o paciente interrompeu a frase, permaneceu em silêncio e depois disse que preferia continuar em outro momento.'",
      analysis: "O registro seguro descreve a interrupção, o silêncio e o pedido de adiar o tema. A análise pode levantar a hipótese de que o assunto mobiliza afeto, mas não deve concluir automaticamente repressão, mentira ou resistência deliberada.",
    },
    recall: [
      { question: "O que são condições de produção?", answer: "Elementos históricos, sociais, institucionais e situacionais que moldam o sentido de uma fala." },
      { question: "O que Marx acrescenta à análise do discurso?", answer: "A atenção ao peso da ideologia, das normas sociais e das instituições na formação do sujeito." },
      { question: "Como Freud contribui para a escuta?", answer: "Chamando atenção para lapsos, contradições, silêncios e escolhas de palavras como pistas possíveis do inconsciente." },
    ],
  },
  "producao-interpretacao-textos-redacao": {
    goal: "Construir textos dissertativo-argumentativos com tese clara, argumentos pertinentes, progressão lógica e conclusão coerente.",
    concepts: [
      {
        title: "Tema",
        explanation: "Tema é o assunto sobre o qual o texto fala. Ele pode ser amplo, como 'escuta clínica', 'linguagem' ou 'saúde mental'. O tema sozinho ainda não mostra a posição do autor.",
        examples: [
          "Tema: precisão linguística em registros clínicos.",
          "Tema: o papel da escuta na formação em Psicologia.",
        ],
      },
      {
        title: "Tese",
        explanation: "Tese é a posição central defendida. Ela precisa ser discutível e orientar todo o texto. Uma tese fraca apenas anuncia o assunto; uma tese forte apresenta um ponto de vista que será sustentado.",
        examples: [
          "Fraca: 'Este texto fala sobre escuta clínica.'",
          "Forte: 'A escuta clínica exige precisão linguística porque diferencia observação, hipótese e interpretação.'",
        ],
      },
      {
        title: "Argumento",
        explanation: "Argumento é a razão que sustenta a tese. Pode envolver explicação conceitual, exemplo, dado, relação causal, comparação ou referência teórica. Ele precisa estar conectado à tese e não apenas enfeitar o parágrafo.",
        examples: [
          "Argumento: registros vagos podem produzir interpretações indevidas sobre o paciente.",
          "Exemplo integrado: ao escrever 'resistente', sem descrever o comportamento observado, o profissional pode transformar uma hipótese em característica do sujeito.",
        ],
      },
      {
        title: "Tópico frasal",
        explanation: "É a frase que apresenta a ideia central do parágrafo. Ela funciona como uma promessa: o restante do parágrafo deve explicar, justificar ou exemplificar essa ideia.",
        examples: [
          "Bom tópico: 'A precisão vocabular protege o registro clínico de conclusões precipitadas.'",
          "Depois dele, o parágrafo deve explicar como isso acontece e trazer exemplo ou justificativa.",
        ],
      },
      {
        title: "Progressão argumentativa",
        explanation: "Um bom texto não repete a tese com outras palavras em todos os parágrafos. Ele avança: apresenta uma razão, aprofunda, mostra consequência, discute limite e fecha o percurso.",
        examples: [
          "Parágrafo 1: define o problema. Parágrafo 2: mostra consequência. Parágrafo 3: propõe cuidado ou encaminhamento.",
          "Sem progressão: repetir 'a linguagem é importante' em todos os parágrafos sem acrescentar razões novas.",
        ],
      },
    ],
    sections: [
      {
        title: "1. Planeje antes de escrever",
        body: "Transforme o tema em pergunta. Por exemplo: 'Por que a precisão linguística importa na Psicologia?' A tese responde à pergunta; os argumentos explicam por que essa resposta faz sentido.",
      },
      {
        title: "2. Estruture a introdução",
        body: "A introdução situa o tema e apresenta a tese. Evite começar com frases genéricas como 'desde os primórdios da humanidade'. Prefira contextualizar diretamente o problema e indicar a posição que será defendida.",
      },
      {
        title: "3. Desenvolva com unidade",
        body: "Cada parágrafo deve ter uma função. Comece com tópico frasal, explique a ideia, use exemplo ou repertório pertinente e feche mostrando a ligação com a tese. Se o exemplo não prova nada, ele vira ilustração solta.",
      },
      {
        title: "4. Conclua sem repetir mecanicamente",
        body: "A conclusão retoma o percurso e mostra o resultado do raciocínio. Quando a tarefa pedir proposta de intervenção, detalhe ação, agente e modo; quando não pedir, sintetize a defesa de forma precisa.",
      },
    ],
    worked: {
      title: "Da tese ao argumento",
      source: "Tema: a importância da linguagem precisa em registros psicológicos.",
      analysis: "Tese possível: a precisão linguística é indispensável porque reduz inferências indevidas e protege a qualidade ética do registro. Argumento 1: termos vagos ampliam ambiguidades. Argumento 2: registros observáveis diferenciam fato, hipótese e interpretação.",
    },
    recall: [
      { question: "Qual é a diferença entre tema e tese?", answer: "Tema é o assunto; tese é a posição defendida sobre esse assunto." },
      { question: "O que torna um argumento pertinente?", answer: "Ele precisa sustentar diretamente a tese com explicação, evidência ou exemplo adequado." },
      { question: "Para que serve o tópico frasal?", answer: "Para apresentar a ideia central do parágrafo e orientar seu desenvolvimento." },
    ],
  },
  "producao-interpretacao-textos-revisao": {
    goal: "Revisar escolhas linguísticas que afetam clareza, precisão e responsabilidade ética em textos acadêmicos e registros clínicos.",
    concepts: [
      {
        title: "Precisão clínica",
        explanation: "Precisão clínica é a capacidade de escrever de modo claro, observável e responsável. Em prontuários, relatórios e laudos, uma palavra vaga pode transformar hipótese em conclusão, impressão em fato ou julgamento em registro técnico. O ideal é separar quatro camadas: dado observado, fala relatada, hipótese interpretativa e análise sustentada.",
        examples: [
          "Vago: 'O paciente estava muito mal.' Melhor: 'O paciente relatou insônia em três noites da última semana e chorou durante parte da entrevista.'",
          "Inferência indevida: 'O silêncio comprovou resistência.' Melhor: 'Houve silêncio por cerca de dez segundos antes da resposta; o sentido clínico do episódio será investigado.'",
          "Julgamento: 'A mãe é negligente.' Melhor: 'A mãe não compareceu às duas entrevistas agendadas e não respondeu ao contato telefônico até esta data.'",
        ],
      },
      {
        title: "Por que, porque, por quê e o porquê",
        explanation: "Os quatro porquês têm funções diferentes. 'Por que' separado e sem acento aparece em perguntas diretas ou indiretas e pode significar 'por qual motivo'. 'Porque' junto e sem acento apresenta causa, explicação ou resposta. 'Por quê' separado e com acento aparece no fim da pergunta, imediatamente antes de pontuação. 'O porquê' junto e com acento é substantivo: equivale a 'o motivo' ou 'a razão' e costuma vir com artigo ou determinante.",
        examples: [
          "Por que: 'Por que o participante interrompeu a entrevista?' Também: 'A equipe investigou por que a entrevista foi interrompida.'",
          "Porque: 'A entrevista foi interrompida porque o participante precisou sair.' Aqui há explicação/causa.",
          "Por quê: 'O participante saiu por quê?' Usa-se no fim da pergunta, antes do ponto de interrogação.",
          "O porquê: 'A equipe investigou o porquê da interrupção.' Aqui 'porquê' é um nome, equivalente a 'motivo'.",
          "Atenção clínica: 'Por que o paciente silenciou?' é pergunta investigativa. 'O paciente silenciou porque estava resistente' só deve ser escrito se houver sustentação clínica para essa causa.",
        ],
      },
      {
        title: "Mas, mais e houve",
        explanation: "'Mas' é conjunção adversativa: marca contraste, oposição ou quebra de expectativa. 'Mais' indica quantidade, intensidade ou acréscimo. Já 'houve', quando vem do verbo haver com sentido de existir, ocorrer ou acontecer, é impessoal e fica no singular, mesmo quando o complemento está no plural.",
        examples: [
          "Mas: 'Apresentou dificuldade inicial, mas concluiu a atividade.' Há oposição entre dificuldade e conclusão.",
          "Mais: 'Relatou mais episódios de ansiedade na última semana.' Indica quantidade maior.",
          "Erro comum: 'Relatou mas episódios, mais não soube datá-los.' Correto: 'Relatou mais episódios, mas não soube datá-los.'",
          "Houve: 'Houve três sessões no mês.' Não use 'houveram três sessões' nesse sentido.",
          "Também correto: 'Houve relatos de insônia.' O verbo continua no singular porque significa 'existiram/ocorreram'.",
        ],
      },
      {
        title: "Onde e aonde",
        explanation: "'Onde' indica localização, lugar fixo ou situação em que algo ocorre. 'Aonde' junta a preposição 'a' com 'onde' e deve ser usada com ideia de movimento, direção ou destino. A diferença depende do verbo: ocorrer, estar e permanecer pedem localização; ir, levar, chegar e dirigir-se podem pedir destino.",
        examples: [
          "Onde: 'Onde ocorreu a sessão?' A sessão ocorreu em um lugar fixo.",
          "Onde: 'Onde o paciente estava durante a crise?' Pergunta por localização.",
          "Aonde: 'Aonde você vai após o atendimento?' Há ideia de destino.",
          "Aonde: 'Aonde essa interpretação nos leva?' Há movimento metafórico para uma conclusão.",
          "Erro comum: 'Aonde ocorreu a sessão?' Melhor: 'Onde ocorreu a sessão?'",
        ],
      },
      {
        title: "Pronomes e retomada",
        explanation: "Pronomes organizam a retomada das ideias e evitam repetição, mas podem gerar ambiguidade. 'Esse/essa' costuma retomar algo já mencionado ou próximo de quem ouve. 'Este/esta' aponta para algo que será apresentado, para o tempo presente ou para algo próximo de quem fala/escreve. Em textos técnicos, também é importante evitar 'o mesmo/a mesma' como substituto de pessoa, porque isso deixa a frase artificial e, às vezes, ambígua.",
        examples: [
          "Esse retomando algo já dito: 'O paciente relatou ansiedade. Essa dificuldade apareceu antes das provas.'",
          "Este anunciando algo: 'Este relatório apresenta observações realizadas em três encontros.'",
          "Este como tempo presente: 'Nesta sessão, foram retomados os combinados iniciais.'",
          "Evite: 'O paciente saiu; falei com o mesmo.' Melhor: 'O paciente saiu; falei com ele.'",
          "Evite ambiguidade: em vez de 'A mãe falou com a filha quando ela chorou', escreva 'A mãe falou com a filha quando a filha chorou' se for necessário deixar claro quem chorou.",
        ],
      },
    ],
    sections: [
      {
        title: "1. Revise sentido antes da gramática isolada",
        body: "A correção não é apenas decorar regras. Em escrita clínica e acadêmica, uma palavra errada pode mudar relação de causa, oposição, tempo ou responsabilidade. Pergunte sempre: esta frase permite dupla leitura? Estou atribuindo algo que não observei?",
      },
      {
        title: "2. Troque generalizações por dados delimitados",
        body: "Expressões como 'sempre', 'nunca', 'muito mal' e 'todo mundo percebe' costumam ser imprecisas. Prefira frequência, período e fonte: 'relatou insônia em três noites da última semana'.",
      },
      {
        title: "3. Separe observação de interpretação",
        body: "'Pausou por alguns segundos antes de responder' é observação. 'Pausou porque ocultava trauma' é interpretação causal. A segunda só deve aparecer se houver sustentação no processo de análise.",
      },
      {
        title: "4. Faça uma revisão em camadas",
        body: "Primeiro confira clareza e coerência; depois coesão e progressão; por fim gramática fina: concordância, regência, pontuação, pronomes, porquês, mas/mais, onde/aonde e redundâncias.",
      },
    ],
    worked: {
      title: "Reescrita responsável",
      source: "Frase inicial: 'O paciente sempre fica mal e por isso abandonou a sessão.'",
      analysis: "Versão mais precisa: 'O paciente relatou mal-estar antes da sessão e deixou o atendimento após vinte minutos. A relação entre o mal-estar e a saída deve ser investigada nas próximas entrevistas.' A revisão reduz generalização e separa fato de hipótese.",
    },
    recall: [
      { question: "Quando usar 'porque'?", answer: "Quando a palavra introduz causa ou explicação: 'faltou porque estava doente'." },
      { question: "Por que evitar 'o mesmo' como pronome pessoal?", answer: "Porque soa burocrático e pode prejudicar clareza; 'ele' ou 'ela' retomam melhor a pessoa." },
      { question: "Como tornar um relato mais preciso?", answer: "Delimitando fonte, período, frequência e comportamento observável." },
    ],
  },
};

const writingActivities: Record<string, { prompt: string; model: string; trap: string }> = {
  "producao-interpretacao-textos-linguagem": {
    prompt: "Escreva duas frases distinguindo o que foi dito literalmente de uma interpretação possível, sem transformar hipótese em certeza.",
    model: "O entrevistado afirmou que não conseguiu responder naquele momento. Uma interpretação possível é que a pergunta gerou desconforto, mas isso precisa ser confirmado por outros elementos do contexto.",
    trap: "Tomar a primeira impressão como sentido definitivo.",
  },
  "producao-interpretacao-textos-discurso": {
    prompt: "Descreva um silêncio ou hesitação como observação clínica, evitando diagnóstico ou causa não demonstrada.",
    model: "Houve pausa antes da resposta sobre a perda familiar. O registro descreve a interrupção do relato sem concluir, apenas por esse dado, que havia resistência ou trauma reprimido.",
    trap: "Tratar o não dito como prova automática de uma hipótese.",
  },
  "producao-interpretacao-textos-redacao": {
    prompt: "Formule uma tese e dois argumentos para um texto sobre a importância da escuta cuidadosa na formação em Psicologia.",
    model: "A escuta cuidadosa é essencial na formação em Psicologia porque reduz inferências apressadas e melhora a qualidade do registro clínico. Além disso, ajuda o estudante a diferenciar observação, hipótese e interpretação.",
    trap: "Usar repertório ou citação sem explicar sua relação com a tese.",
  },
  "producao-interpretacao-textos-revisao": {
    prompt: "Reescreva uma frase vaga de registro clínico tornando-a mais precisa e observável.",
    model: "Em vez de 'o paciente sempre fica muito mal', escreva: 'o paciente relatou insônia em três noites da última semana e associou o episódio a preocupações acadêmicas'.",
    trap: "Usar generalizações como sempre, nunca e todo mundo sem delimitação.",
  },
};

export function TextsStudyPage({ subjectName, subjectDescription }: TextsStudyPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [showModel, setShowModel] = useState(false);

  const unit = textsUnits[activeIndex];
  const questions = unit.testTextQuestions ?? [];
  const question = questions[questionIndex];
  const activity = writingActivities[unit.slug];
  const lesson = deepLessons[unit.slug];
  const correctAnswer = question?.correctAnswer ?? question?.correctAnswers?.[0];
  const isCorrect = selectedOption === correctAnswer;
  const answeredProgress = questions.length ? ((questionIndex + (selectedOption ? 1 : 0)) / questions.length) * 100 : 0;

  function changeUnit(index: number) {
    setActiveIndex(index);
    setQuestionIndex(0);
    setSelectedOption(null);
    setShowModel(false);
  }

  function nextQuestion() {
    setQuestionIndex((index) => (index === questions.length - 1 ? 0 : index + 1));
    setSelectedOption(null);
  }

  return (
    <main className="min-h-screen bg-[#261010] text-slate-900">
      <header className="border-b border-white/10 bg-[#160707] text-white">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center gap-4 px-6 sm:px-10 lg:px-12">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-rose-100 text-lg font-black text-[#7f0000]">T</div>
          <div>
            <p className="font-bold tracking-tight">Estudo de Textos</p>
            <p className="text-sm text-rose-100">Revisão para a prova</p>
          </div>
          <p className="ml-auto hidden text-sm text-rose-100 sm:block">Leia, identifique, pratique</p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10 text-white sm:px-10 lg:px-12">
        <Link className="text-sm font-semibold text-rose-200" href="/disciplinas">
          Voltar para disciplinas
        </Link>
        <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-rose-200">Produção e interpretação</p>
        <h1 className="mt-2 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Aulas autorais, não cópia dos slides.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-rose-50/80">
          {subjectDescription} Cada tema foi reescrito como aula própria, com conceitos, exemplos, aplicação e treino. Os slides ficam no fim apenas como referência visual.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 sm:px-10 lg:grid-cols-[260px_1fr] lg:px-12">
        <aside className="h-fit lg:sticky lg:top-6">
          <h2 className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-rose-100/70">Caderno de temas</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Temas de estudo">
            {textsUnits.map((item, index) => (
              <button
                aria-controls="study-panel"
                aria-selected={index === activeIndex}
                className={`rounded-2xl border p-4 text-left shadow-sm transition ${index === activeIndex ? "border-rose-200 bg-white text-slate-950 shadow-red-950/30" : "border-white/10 bg-white/5 text-rose-50 hover:border-rose-200/50"}`}
                id={`tab-${item.slug}`}
                key={item.slug}
                onClick={() => changeUnit(index)}
                role="tab"
                type="button"
              >
                <span className={`text-[11px] font-black uppercase tracking-[0.12em] ${index === activeIndex ? "text-[#aa0000]" : "text-rose-200"}`}>{String(index + 1).padStart(2, "0")} / Aula</span>
                <strong className="mt-1 block leading-snug">{item.title}</strong>
                <span className={`mt-2 block text-xs ${index === activeIndex ? "text-slate-500" : "text-rose-100/70"}`}>{item.testTextQuestions?.length ?? 0} questões</span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-rose-50/70">As aulas foram escritas a partir dos temas. Os slides repetidos aparecem apenas como apoio no final.</p>
        </aside>

        <article aria-labelledby={`tab-${unit.slug}`} className="overflow-hidden rounded-[34px] border border-white/10 bg-[#fffaf7] shadow-2xl shadow-black/30" id="study-panel" role="tabpanel">
          <div className="border-b border-red-100 bg-[radial-gradient(circle_at_top_left,#fee2e2,transparent_34%),linear-gradient(135deg,#fff7ed,#fff)] p-6 sm:p-8">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#aa0000]">Tema {activeIndex + 1} de {textsUnits.length}</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{unit.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">{unit.videoDescription}</p>
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <section>
              <div className="rounded-[28px] bg-[#2a0d0d] p-6 text-white sm:p-8">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-rose-200">Aula {activeIndex + 1} · feita por tema</span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">O que você vai aprender</h3>
                <p className="mt-3 max-w-3xl leading-8 text-rose-50/85">{lesson.goal}</p>
              </div>
              <div className="mt-5 grid gap-4">
                {lesson.concepts.map((concept, index) => (
                  <div className="grid gap-4 rounded-[24px] border border-red-100 bg-white p-5 shadow-sm md:grid-cols-[88px_1fr]" key={concept.title}>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#aa0000] text-2xl font-black text-white">{String(index + 1).padStart(2, "0")}</div>
                    <div>
                    <h4 className="text-lg font-semibold text-slate-900">{concept.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{concept.explanation}</p>
                    {concept.examples?.length ? (
                      <div className="mt-4 rounded-2xl bg-red-50 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-[#aa0000]">Exemplos</p>
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                          {concept.examples.map((example) => (
                            <li key={example}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] bg-[#fff0f0] p-5 sm:p-6">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-[#aa0000]">Explicação guiada</span>
              <div className="mt-4 grid gap-4">
                {lesson.sections.map((section) => (
                  <article className="rounded-2xl border border-red-100 bg-white p-5" key={section.title}>
                    <h4 className="font-semibold text-slate-950">{section.title}</h4>
                    <p className="mt-2 leading-7 text-slate-700">{section.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-red-100 bg-white p-5">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-[#aa0000]">Vamos resolver juntos</span>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">{lesson.worked.title}</h3>
              <p className="mt-3 rounded-xl bg-red-50 p-4 text-sm font-semibold leading-6 text-slate-700">{lesson.worked.source}</p>
              <p className="mt-3 leading-7 text-slate-700">{lesson.worked.analysis}</p>
              <p className="mt-3 rounded-xl bg-white p-4 text-sm text-slate-700"><strong>Erro comum:</strong> {activity.trap}</p>
            </section>

            <section className="rounded-2xl border border-red-100 bg-[#fffafa] p-5">
              <h3 className="text-xl font-semibold text-slate-950">Confira se fixou</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Responda mentalmente antes de abrir cada item.</p>
              <div className="mt-4 grid gap-3">
                {lesson.recall.map((item, index) => (
                  <details className="rounded-xl border border-red-100 bg-white p-4" key={item.question}>
                    <summary className="cursor-pointer font-semibold text-slate-900">{index + 1}. {item.question}</summary>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-red-100 bg-[#fffafa] p-5">
              <h3 className="text-xl font-semibold text-slate-950">Aplique em dois minutos</h3>
              <p className="mt-2 leading-7 text-slate-600">{activity.prompt}</p>
              <textarea
                aria-label="Sua resposta para a atividade de escrita"
                className="mt-4 min-h-32 w-full rounded-xl border border-red-100 bg-white p-4 outline-none transition focus:border-[#aa0000]"
                onChange={(event) => setDrafts((current) => ({ ...current, [unit.slug]: event.target.value }))}
                placeholder="Escreva sua resposta aqui..."
                value={drafts[unit.slug] ?? ""}
              />
              <button className="mt-3 rounded-full border border-[#aa0000] px-5 py-2 text-sm font-bold text-[#aa0000] hover:bg-red-50" onClick={() => setShowModel((value) => !value)} type="button">
                {showModel ? "Ocultar resposta possível" : "Ver uma resposta possível"}
              </button>
              {showModel ? <p className="mt-3 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700"><strong>Uma resposta possível:</strong> {activity.model}</p> : null}
            </section>

            {question ? (
              <section className="rounded-2xl border border-red-100 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-semibold text-slate-950">Pratique agora</h3>
                  <span className="text-sm font-semibold text-[#aa0000]">Questão {questionIndex + 1} de {questions.length}</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-red-50">
                  <div className="h-full rounded-full bg-[#aa0000]" style={{ width: `${answeredProgress}%` }} />
                </div>
                <p className="mt-5 text-lg font-semibold leading-8 text-slate-900">{question.prompt}</p>
                <div className="mt-4 grid gap-3">
                  {question.options.map((option) => {
                    const isSelected = selectedOption === option;
                    const isAnswer = option === correctAnswer;
                    const checkedClass = selectedOption
                      ? isAnswer
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : isSelected
                          ? "border-[#aa0000] bg-red-50 text-[#7f0000]"
                          : "border-red-100 bg-white text-slate-700"
                      : "border-red-100 bg-white text-slate-800 hover:border-[#aa0000]";

                    return (
                      <button className={`rounded-xl border p-4 text-left transition ${checkedClass}`} disabled={Boolean(selectedOption)} key={option} onClick={() => setSelectedOption(option)} type="button">
                        {option}
                      </button>
                    );
                  })}
                </div>
                {selectedOption ? (
                  <div className={`mt-4 rounded-xl p-4 ${isCorrect ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-[#7f0000]"}`}>
                    <p className="font-bold">{isCorrect ? "Correto" : "Incorreto"}</p>
                    <p className="mt-1 text-sm leading-6">{question.explanation}</p>
                    <button className="mt-3 rounded-full bg-[#aa0000] px-5 py-2 text-sm font-bold text-white hover:bg-[#8b0000]" onClick={nextQuestion} type="button">
                      Próxima questão
                    </button>
                  </div>
                ) : null}
              </section>
            ) : null}

            <section className="rounded-[24px] border border-dashed border-red-200 bg-white/70 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-[#aa0000]">Anexo visual</span>
                  <h3 className="mt-1 text-lg font-semibold text-slate-950">Slides conferidos, sem repetição</h3>
                </div>
                <span className="text-sm text-slate-500">{unit.atlasItems.length} referência{unit.atlasItems.length === 1 ? "" : "s"}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">Use estas imagens apenas para reconhecer o material original. A aula acima já reescreve e organiza os conceitos.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {unit.atlasItems.map((slide) => (
                  <figure className="overflow-hidden rounded-2xl border border-red-100 bg-white" key={slide.title}>
                    <div className="relative aspect-video bg-red-50">
                      <Image alt={slide.title} className="object-contain" fill sizes="(max-width: 768px) 100vw, 260px" src={slide.imageUrl} />
                    </div>
                    <figcaption className="border-t border-red-100 p-3">
                      <strong className="text-sm text-slate-900">{slide.title}</strong>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <div className="flex flex-col gap-3 border-t border-red-100 pt-6 sm:flex-row">
              <Link className="rounded-full bg-[#aa0000] px-6 py-3 text-center text-sm font-bold uppercase text-white hover:bg-[#8b0000]" href={`/quiz/producao-interpretacao-textos-treino-textual/teste?material=${unit.slug}&topic=${unit.slug}&perguntas=${Math.min(10, questions.length)}`}>
                Fazer treino completo
              </Link>
              <Link className="rounded-full border border-[#aa0000] px-6 py-3 text-center text-sm font-bold uppercase text-[#aa0000] hover:bg-red-50" href="/quiz/producao-interpretacao-textos-simulado-misto/simulado?perguntas=36">
                Simulado 36 questões
              </Link>
            </div>
          </div>
        </article>
      </section>

      <footer className="border-t border-red-100 bg-white py-6">
        <div className="mx-auto max-w-6xl px-6 text-sm leading-6 text-slate-500 sm:px-10 lg:px-12">
          {subjectName}: conteúdo organizado a partir das aulas, questões revisadas e slides fotografados. Materiais repetidos foram unificados.
        </div>
      </footer>
    </main>
  );
}
