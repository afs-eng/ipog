"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import type { NeuroTextQuestion } from "@/lib/neuro-units";
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
  method: string[];
  recall: { question: string; answer: string }[];
};

type StudyActivity = { prompt: string; model: string; trap: string };

type StudyTopic = {
  slug: string;
  title: string;
  description: string;
  questions: NeuroTextQuestion[];
  lesson: DeepLesson;
  activity: StudyActivity;
  tip: string;
};

const deepLessons: Record<string, DeepLesson> = {
  "producao-interpretacao-textos-linguagem": {
    goal: "Aprender a interpretar sem confundir percepção pessoal com evidência textual, articulando linguagem, contexto e subjetividade.",
    concepts: [
      {
        title: "Linguagem como sistema",
        explanation:
          "A partir de Saussure, a língua pode ser entendida como um sistema social de signos: um conjunto organizado em que cada palavra recebe sentido não por uma ligação natural com a coisa nomeada, mas pela relação que mantém com as demais palavras, com as regras gramaticais compartilhadas e com os usos consolidados em uma comunidade. Daí decorrem três consequências práticas para a leitura e para a escrita. Primeira: nenhum termo tem valor isolado; seu significado é delimitado pelo campo em que aparece, de modo que 'crise' significa coisa diferente em um relato emocional, em uma notícia econômica e em uma narrativa de ruptura familiar. Segunda: como a significação é convenção coletiva, ela muda com o tempo, com o grupo e com a instituição — o mesmo termo pode ter peso técnico em um serviço e peso coloquial fora dele. Terceira: escrever com precisão significa escolher o signo certo para o contexto, não o signo mais eloquente. Para a escuta psicológica, isso implica cautela com rótulos: termos técnicos como 'resistência', 'dependência' ou 'transtorno' só cumprem sua função quando situados em uma hipótese sustentada por dados e por acompanhamento, e não quando aplicados como atalho descritivo.",
        examples: [
          "A palavra 'crise' pode indicar um episódio emocional, uma crise econômica ou um momento de ruptura. O sentido depende do campo em que aparece.",
          "Em Psicologia, 'resistência' não deve ser usada como rótulo automático; o termo precisa fazer sentido dentro de um acompanhamento e de uma hipótese sustentada.",
          "Mesma palavra, valores opostos: 'paciente colaborativo' em uma ficha de comparecimento significa presença; em uma avaliação clínica, exige descrição do que foi observado.",
          "Erro de registro: escrever 'agressivo' sem dizer que o paciente levantou a voz duas vezes e bateu a porta — o signo sobrescreve o fato.",
          "Consequência para a prova: quando o enunciado pergunta o sentido de um termo, verifique o campo semântico e as relações do texto, e não apenas o significado de dicionário.",
        ],
      },
      {
        title: "Langue e parole",
        explanation:
          "Langue é a língua enquanto sistema: o acervo de regras, formas e convenções que uma comunidade reconhece como legítimo e que permite que qualquer falante seja compreendido. Ela existe como potencial coletivo e não pode ser observada diretamente — só se manifesta nos usos. Parole é o ato singular pelo qual um sujeito, em uma situação determinada, mobiliza esse sistema: escolhe palavras, combina tempos, hesita, interrompe, insiste, gagueja, escreve ou cala. A distinção importa porque separa o que é partilhado do que é singular, e porque mostra que a fala nunca é cópia do sistema: sempre o atravessa e o desloca. Para a interpretação de textos e para a escuta clínica, a consequência é metodológica — descrever a langue ajuda a dizer o que era esperado naquele enunciado, enquanto descrever a parole ajuda a dizer o que de fato aconteceu naquele caso. Um registro clínico que só aponta a norma ('a paciente negou sintomas') perde a fala concreta; um registro que só relata a fala, sem situá-la no sistema, perde o critério de comparação.",
        examples: [
          "Langue: as regras e convenções que permitem formar frases em português e ser compreendido por quem escuta.",
          "Parole: a forma singular como uma paciente diz 'eu estou bem' após uma pausa longa e com voz baixa.",
          "Langue: o uso do pretérito perfeito para indicar ação concluída. Parole: o paciente relatar a perda usando o pretérito imperfeito ('eu estava chegando') e deixar a ação em aberto.",
          "Efeito clínico: a mesma frase 'estou bem' pode funcionar no sistema como afirmação neutra e, na parole concreta, como encerramento da conversa.",
          "Leitura de enunciado: quando a prova destaca uma irregularidade, pergunte se ela viola a langue ou é uma escolha de parole — a resposta muda a interpretação.",
        ],
      },
      {
        title: "Lente interna",
        explanation:
          "Não enxergamos o texto como se ele fosse um objeto transparente: toda leitura acontece por meio de uma 'lente interna' formada por experiências prévias, afetos, medos, expectativas, profissão, formação e repertório cultural. Essa lente não é um defeito a eliminar — é a condição que torna a leitura possível, porque só compreendemos o que temos alguma base para compreender. O problema surge quando a lente é tomada pelo objeto: quando a impressão pessoal ('ele foi frio', 'isso é óbvio') é registrada como se fosse propriedade do texto. O método corretivo é sempre o mesmo: separar três camadas — dado observável (o que está literalmente no enunciado), inferência (o que se deduz a partir dele) e valoração (o juízo que se faz sobre isso) — e exigir, para cada camada, o tipo de sustentação correspondente. O dado é conferido no texto; a inferência é testada contra outras leituras possíveis; a valoração precisa de um critério declarado. Na prática de estudo, isso significa que a primeira leitura é a hipótese, e a leitura responsável é a revisão da hipótese contra as pistas.",
        examples: [
          "Impressão: 'ele foi frio'. Dado observável: 'ele respondeu com frases curtas e sem contato visual frequente'.",
          "A primeira leitura pode ser útil como hipótese, mas precisa ser conferida no enunciado, no contexto e na sequência da fala.",
          "Três camadas numa frase: dado ('pausou dez segundos') → inferência ('evitou o tema') → valoração ('foi desonesto'). Só a primeira é verificável no texto.",
          "Erro de prova: atribuir a intenção do autor a partir de uma palavra isolada, sem considerar o parágrafo e o gênero textual.",
          "Bom hábito de estudo: antes de responder, sublinhar a pista que autoriza a conclusão; se não houver sublinhado, não há base.",
        ],
      },
      {
        title: "Condições de produção",
        explanation:
          "Nenhum enunciado surge no vácuo: todo texto é produzido por alguém, em um lugar social, para um destinatário determinado, com uma finalidade específica, em um momento histórico e dentro de uma instituição que autoriza certos modos de dizer. Essas condições de produção não são pano de fundo — elas entram na composição do sentido e, por isso mesmo, precisam ser consideradas na interpretação. Mudar qualquer um dos elementos altera o efeito da mesma frase: a mesma formulação dita por professor, terapeuta, familiar ou chefe produz relações de poder diferentes; a mesma pergunta respondida em uma entrevista de seleção e em um atendimento clínico tem pesos diferentes. Para a escuta psicológica, há ainda uma dimensão de efeitos: o interlocutor também age sobre o enunciado, e a pessoa que fala antecipa o julgamento do outro, o que pode gerar eufemismo, omissão ou reformulação. Conclui-se que interpretar é sempre situar: antes de dizer o que a frase 'quer dizer', pergunte quem falou, para quem, onde, quando e com qual finalidade.",
        examples: [
          "A frase 'você precisa melhorar' tem efeitos diferentes dita por professor, terapeuta, familiar ou chefe.",
          "Uma resposta em avaliação psicológica pode ser afetada pela instituição, pelo medo de julgamento e pelo objetivo da entrevista.",
          "Mesmo trecho, contextos opostos: 'não sei o que dizer' pode ser recusa de quem tem medo de errar ou abertura de quem está buscando palavras.",
          "Instituição que autoriza dizer: em um relatório oficial espera-se impessoalidade; em um grupo de escuta espera-se primeira pessoa.",
          "Na prova: quando o enunciado traz data, suporte ou interlocutor, esses dados quase sempre sustentam a resposta correta.",
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
      {
        title: "4. Volte ao texto antes de responder",
        body: "A primeira leitura é hipótese; a segunda é conferência. Relie o trecho procurando a palavra decisiva, compare com as alternativas e elimine as que ampliam o alcance do que foi dito. Interpretação cuidadosa combina abertura ao sentido com limite textual: o que o texto não autoriza, a resposta também não pode afirmar.",
      },
    ],
    worked: {
      title: "Separando observação e interpretação",
      source: "Trecho: 'Após a pergunta sobre a família, a participante ficou em silêncio por alguns segundos e olhou para a janela.'",
      analysis:
        "É seguro afirmar que houve silêncio e mudança de direção do olhar. É possível levantar a hipótese de desconforto, mas não é correto concluir apenas por esse trecho que ela mentiu, ocultou trauma ou resistiu ao atendimento.",
    },
    method: [
      "Separe o que está escrito do que você deduziu.",
      "Sublinhe no enunciado a pista que sustenta a resposta.",
      "Elimine alternativas que acrescentam causa, intenção ou diagnóstico.",
    ],
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
        explanation:
          "A Análise do Discurso investiga como os sentidos são produzidos nas relações sociais, e não como eles residem dentro da cabeça de um falante. Seu ponto de partida é uma inversão: em vez de tratar a fala como transparência da intenção individual, ela pergunta que condições históricas, materiais e institucionais tornaram aquele sentido possível, aceitável e circulante. Para isso, a AD articula três referentes clássicos — a linguística, que descreve o funcionamento da língua; a materialidade histórica, que descreve as formações sociais em que o texto aparece; e a teoria da subjetividade, que descreve como um sujeito se posiciona dentro dessas formações. O objeto de análise deixa de ser o texto isolado e passa a ser o acontecimento discursivo: o momento em que uma palavra é dita, por alguém, em condições determinadas, produzindo efeitos sobre quem escuta. Isso tem consequências para a leitura de enunciados clínicos: a pergunta deixa de ser apenas 'o que o paciente quis dizer?' e passa a incluir 'em que contexto isso pôde ser dito assim, e não de outro modo?'.",
        examples: [
          "Em vez de perguntar apenas 'o que a pessoa quis dizer?', pergunte também 'em que contexto isso pôde ser dito dessa forma?'.",
          "A frase 'eu tenho que dar conta de tudo' pode carregar discursos sociais sobre produtividade, família, gênero e sucesso.",
          "O mesmo pedido de ajuda soa como fraqueza em uma instituição meritocrática e como cuidado adequado em um serviço de saúde.",
          "Efeito sobre o registro: anotar 'paciente negou tudo' pode apagar as condições em que a negação foi produzida.",
          "Prova: a AD não busca a intenção verdadeira atrás da fala; ela busca as regras que organizam o que ali pôde ser dito.",
        ],
      },
      {
        title: "Formação discursiva",
        explanation:
          "Formação discursiva é o conjunto de regras, em geral invisíveis, que determina o que pode e o que deve ser dito em determinado contexto histórico-institucional. Não se trata de proibições escritas, mas de uma espécie de regime de sentido: dentro de uma formação, certas combinações de palavras soam naturais e legitimadas, enquanto outras soam descabidas, excessivas ou inaudíveis. O conceito é central porque explica por que o sofrimento aparece sempre mediatizado por um vocabulário disponível — a pessoa fala com as palavras que o meio lhe oferece. Daí a distinção entre formação discursiva (o regime de sentido vigente), formação ideológica (o conjunto de posições antagonistas que disputam esse sentido) e formação social (as relações concretas de poder em que a disputa ocorre). Para a escuta clínica, a utilidade é imediata: quando um paciente diz 'estou só cansado', é preciso considerar que 'cansaço' pode ser o único nome socialmente aceito para um sofrimento que não tem outra denominação autorizada naquele meio.",
        examples: [
          "Em um ambiente escolar, o aluno pode aprender que dizer 'não entendi' é sinal de fraqueza, dependendo da cultura da turma.",
          "Em uma empresa, sofrimento pode aparecer como 'cansaço' ou 'baixa performance', porque esse vocabulário é mais aceito naquele espaço.",
          "Em um serviço de saúde, o sofrimento psíquico só 'existe' quando traduzido para queixa médica codificável.",
          "Na família, o luto pode ser nomeado como 'falta de força' em vez de perda, conforme o repertório do grupo.",
          "Leitura de texto: quando um termo reaparece sempre no mesmo lugar do enunciado, desconfie de uma formação discursiva atuando.",
        ],
      },
      {
        title: "Ideologia em Marx",
        explanation:
          "A contribuição de Marx à leitura do discurso vem da ideia de que as representações não são independentes das condições materiais de existência: as formas como as pessoas se narram, se avaliam e explicam seus fracassos são atravessadas pelas relações sociais em que estão inseridas. Em termos de análise, isso significa que o sujeito nunca fala a partir de um lugar neutro — fala a partir de uma posição social determinada, e o discurso circula por instituições (família, escola, empresa, mídia, Estado) que selecionam e difundem certas explicações sobre o mundo. O efeito mais importante é a naturalização: quando uma explicação historicamente construída passa a parecer simplesmente 'o jeito das coisas', ela deixa de ser discutida e passa a ser cumprida. Assim, um fracasso individual pode ser lido como prova de deficiência pessoal, apagando as condições que o produziram. Para a escuta, a pergunta diagnóstica é: quais relações sociais estão sendo apagadas quando tudo se resolve como responsabilidade da própria pessoa?",
        examples: [
          "Quando alguém diz 'se eu falhei, é porque não me esforcei o suficiente', pode estar reproduzindo um discurso individualizante sobre sucesso.",
          "A análise pergunta quais condições sociais estão sendo apagadas quando tudo vira responsabilidade individual.",
          "Narrativa de 'basta querer' aplicada a dificuldades materiais: o discurso converte desigualdade em falha de caráter.",
          "Em registro clínico: atribuir abandono de tratamento apenas à 'falta de motivação', sem registrar barreiras de acesso, horário e custo.",
          "Prova: a leitura marxista não nega a agência do sujeito; ela recoloca a fala dentro das relações que a tornaram possível.",
        ],
      },
      {
        title: "Inconsciente em Freud",
        explanation:
          "Freud desloca a ideia de que a fala é um instrumento inteiramente controlado pelo falante. Se a enunciação fosse plenamente racional, lapsos, gafes, esquecimentos, contradições, mudanças de tema, silêncios prolongados e escolhas inusitadas de palavras seriam apenas ruído estatístico; a psicanálise os trata como formações do inconsciente, isto é, como produções que têm uma lógica própria, ainda que não seja a lógica declarada do enunciado. A consequência hermenêutica é dupla e deve ser mantida em equilíbrio. De um lado, amplia-se o campo de escuta: o que não foi dito, o que foi dito de outra forma e o que se repetiu inesperadamente passam a ter valor. De outro, mantém-se a prudência: uma pista não é uma prova, e a interpretação só se torna responsável quando acompanha recorrência, contexto, reação do falante e efeitos práticos do que foi dizer. Por isso, o lugar correto de um lapso no registro clínico é a observação com data e contexto — nunca a conclusão diagnóstica.",
        examples: [
          "Um lapso pode ser anotado como dado de escuta, mas não deve virar conclusão isolada.",
          "Se uma pessoa muda de assunto sempre que fala da família, isso pode orientar uma pergunta clínica, não uma sentença pronta.",
          "Metáfora reveladora: 'a casa toda desmoronando' dita por alguém que relata apenas cansaço cotidiano pode merecer uma pergunta, não uma tradução imediata.",
          "Silêncio prolongado seguido de 'não é nada': registrar a sequência completa, não apenas a frase final.",
          "Erro comum: transformar um único equívoco em evidência de conflito — a hipótese precisa de recorrência e sustentação.",
        ],
      },
      {
        title: "Interdiscurso e memória discursiva",
        explanation:
          "Pêcheux introduz a noção de que a fala nunca parte do zero: todo discurso é atravessado por outros discursos que já circulavam antes dele — o que ele chama de interdiscurso e memória discursiva. A memória discursiva não é a lembrança pessoal do falante, mas o acervo de formulações, esquemas e lugares-comuns que uma sociedade mantém disponíveis e que reaparecem mesmo quando ninguém os cita explicitamente. Isso explica a frequência com que frases prontas emergem na fala individual como se fossem pensamento próprio: 'homem não chora', 'mãe boa aguenta tudo', 'cada um tem o que merece'. O sujeito, portanto, fala com palavras que escolheu, mas também com discursos que recebeu, repetiu e interiorizou ao longo da vida. Para a interpretação, a consequência é decisiva: quando uma formulação soa familiar e genérica, é provável que estejamos diante de uma voz social e não de uma posição singular — e cabe à escuta verificar se o sujeito assume aquela voz, a contradiz ou tenta negociá-la.",
        examples: [
          "Frases como 'homem não chora' ou 'mãe boa aguenta tudo' podem aparecer na fala individual como vozes sociais antigas.",
          "A escuta observa que o sujeito fala com palavras próprias, mas também com discursos que recebeu e repetiu ao longo da vida.",
          "'Eu não deveria reclamar, tem gente pior': formulação pronta que antecipa o julgamento social e encurta o relato.",
          "Na escrita acadêmica: repertório decorado sem comentário indica repetição de memória discursiva, não argumento próprio.",
          "Teste de leitura: pergunte 'de onde vem essa frase?' antes de perguntar 'o que ela significa?'.",
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
      analysis:
        "O registro seguro descreve a interrupção, o silêncio e o pedido de adiar o tema. A análise pode levantar a hipótese de que o assunto mobiliza afeto, mas não deve concluir automaticamente repressão, mentira ou resistência deliberada.",
    },
    method: [
      "Identifique o enunciado exato e quem o produziu.",
      "Reconstrua a situação, a instituição e a relação entre os interlocutores.",
      "Explique o efeito possível e diga explicitamente o que não pode ser concluído.",
    ],
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
        explanation:
          "Tema é o assunto de que o texto trata: o campo mais amplo dentro do qual a discussão acontece. Ele é formulado em termos de objeto e perspectiva, não em termos de opinião, e por isso pode ser abordado por textos com conclusões opostas. Temas amplos, como 'linguagem', 'escuta clínica' ou 'saúde mental', servem de ponto de partida, mas raramente funcionam direto como título de redação, porque não indicam recorte. Um bom tema é delimitado por um eixo que conecta dois polos — por exemplo, linguagem e registro clínico, escuta e formação profissional, tecnologia e atenção —, de modo que já se perceba qual relação será examinada. É preciso separar três níveis que costumam ser confundidos: tema (o assunto), tese (a posição assumida sobre esse assunto) e problemática (a pergunta que organiza a discussão). Enquanto o tema permanece neutro e pode aparecer até em forma de pergunta, a tese é uma afirmação discutível que exige defesa. Uma prova que pede 'discuta' não quer que você repita o tema com palavras diferentes; quer que você o transforme em pergunta e responda a ela com argumentos.",
        examples: [
          "Tema amplo demais: 'linguagem'. Sem recorte, o texto não sabe por onde começar nem onde parar.",
          "Tema delimitado: 'a precisão linguística nos registros clínicos como forma de proteção ética do paciente'.",
          "Tema delimitado: 'o papel da escuta na formação em Psicologia'.",
          "Problemática derivada do tema: 'até que ponto a padronização de relatórios melhora a comunicação entre profissionais sem empobrecer o relato do caso?'",
          "Teste prático: se duas pessoas conseguem defender conclusões opostas a partir da mesma formulação, você tem um tema; se a frase já entrega a conclusão, você tem uma tese.",
        ],
      },
      {
        title: "Tese",
        explanation:
          "Tese é a posição central que o texto assume e pretende sustentar até o fim. Ela não é um resumo do assunto nem uma declaração de boa vontade: é uma afirmação discutível, específica o bastante para poder ser atacada por um leitor atento e defensável com argumentos disponíveis no repertório do estudante. Uma tese fraca apenas nomeia o tema ('este texto fala sobre escuta clínica') ou pede concordância genérica ('a escuta é importante'); uma tese forte apresenta uma relação de causa, condição, prioridade ou limite, e é por isso que ela costuma vir acompanhada de um 'porque', um 'embora', um 'só se' ou um 'na medida em'. A tese cumpre três funções ao mesmo tempo: define o ângulo do texto, impõe os limites do que será tratado e serve de critério para aprovar ou rejeitar cada argumento — se um parágrafo não ajuda a defender a tese, ele não pertence ao texto. Em provas com proposta de intervenção, a tese deve estar presente na introdução e sustentar a conclusão; ela nunca deve aparecer apenas na primeira frase e ser esquecida em seguida. Vale ainda lembrar que tese não é verdade absoluta: ela é uma leitura provisória, argumentada, aceitável por parte razoável dos leitores.",
        examples: [
          "Fraca (apenas anuncia o assunto): 'Este texto fala sobre escuta clínica.'",
          "Fraca (senso comum sem discussão): 'A linguagem é muito importante para todos nós.'",
          "Forte (relação causal): 'A escuta clínica exige precisão linguística porque diferencia observação, hipótese e interpretação.'",
          "Forte (com limites explícitos): 'Embora o prontuário padronizado agilize a comunicação entre equipes, ele só preserva a qualidade do cuidado quando deixa espaço para a descrição do caso.'",
          "Tese e proposta de intervenção: 'A formação em Psicologia precisa incluir treino de escrita observável, sob coordenação de docentes e com avaliação por rubrica, para reduzir inferências indevidas em relatórios.'",
        ],
      },
      {
        title: "Argumento",
        explanation:
          "Argumento é a razão que sustenta a tese: o passo de raciocínio que mostra por que a posição defendida faz sentido. Ele não é opinião solta nem exemplo decorado; é uma proposição verificável, conectada à tese por uma relação lógica explícita (causa, consequência, condição, comparação, contraste, analogia, autoridade). A prova de que um argumento é pertinente é simples: ao retirá-lo, a tese fica mais fraca. Se nada muda, aquilo era ornamento. Existem formatos argumentativos recorrentes que valem ser treinados: argumento causal (mostra o mecanismo pelo qual X produz Y), argumento de autoridade (apela a quem tem competência no assunto, desde que a fonte seja citada e o uso seja pertinente), argumento por exemplo (tira uma regra de um caso concreto), argumento por analogia (transfere uma lógica de um campo para outro, desde que as semelhanças sejam relevantes), argumento estadístico (usa dados quantitativos, com fonte e período) e argumento concessivo (reconhece uma objeção e mostra seu limite). O erro mais comum é confundir argumento com prova: em redação de vestibular, o exemplo ilustra e convence, mas só produz argumento quando o texto explica a ligação entre o caso e a tese.",
        examples: [
          "Argumento causal: registros vagos produzem interpretações indevidas porque quem lê é obrigado a suprir a lacuna com suposições.",
          "Argumento por analogia: um prontuário incompleto funciona como uma fotografia desfocada — não registra o que aconteceu, registra apenas a aparência de ter registrado.",
          "Argumento concessivo: reconhecer que a padronização agiliza o preenchimento não invalida a tese, desde que se mostre que agilidade e riqueza descritiva não são incompatíveis.",
          "Exemplo integrado: o caso de um relato que registrou apenas 'paciente colaborativo' e omitiu o choro durante a entrevista mostra como a síntese apaga o dado clínico mais relevante.",
          "Repertório sociocultural útil: a Classificação Internacional de Doenças como dispositivo de linguagem em saúde; a noção de registro como ato ético e não apenas administrativo.",
        ],
      },
      {
        title: "Tópico frasal",
        explanation:
          "Tópico frasal é a frase que abre o parágrafo e anuncia a ideia principal que será desenvolvida nele. Ele funciona como uma promessa feita ao leitor: tudo o que vier depois precisa explicar, justificar, exemplificar ou delimitar aquela ideia — e nada do que vier depois pode depender de informação que ainda não foi dada. Um tópico frasal eficaz costuma ser específico o bastante para não poder valer para qualquer parágrafo do texto; a frase 'a linguagem é importante' serviria para qualquer parágrafo, e por isso é um tópico frasal vazio. Um bom teste é cobrir os demais parágrafos e ler apenas as primeiras frases de cada um: elas, sozinhas, devem formar um resumo coerente da argumentação. Há variações legítimas conforme a função do parágrafo: parágrafo de tese retoma a posição; parágrafo de argumento enuncia a razão; parágrafo de exemplo introduz o caso; parágrafo de objeção abre a contra-argumentação. Em textos mais longos, é possível usar também um parágrafo-ponte, que retoma o fim do anterior e prepara o próximo, evitando a sensação de lista de tópicos desconectados.",
        examples: [
          "Bom tópico (específico e defendável): 'A precisão vocabular protege o registro clínico de conclusões precipitadas.'",
          "Tópico fraco (genérico): 'A linguagem é muito importante na Psicologia.' — serviria para qualquer parágrafo do texto.",
          "Tópico de exemplo: 'Dois casos mostram como a omissão de detalhes muda a leitura de um relato.' — e o parágrafo deve efetivamente apresentar os dois casos.",
          "Sequência de tópicos que forma um resumo: 1) a padronização melhora a circulação do documento; 2) porém reduz a descrição do caso; 3) por isso o modelo deve prever campos abertos.",
          "Depois de anunciar a ideia, o parágrafo deve explicar o mecanismo, sustentar com prova e fechar retomando a ligação com a tese.",
        ],
      },
      {
        title: "Progressão argumentativa",
        explanation:
          "Progressão é a organização do texto em ordem de pensamento: cada parágrafo deve acrescentar algo que o anterior não disse e preparar o terreno para o seguinte. O oposto não é o desacordo, é a repetição — repetir a tese com sinônimos em três parágrafos produz um texto que parece argumentativo sem argumentar. Avançar significa mudar de operação lógica ao longo do texto: apresentar o problema, explicar o mecanismo, mostrar a consequência, reconhecer a limitação ou objeção e encaminhar a conclusão ou a intervenção. Existem dois movimentos clássicos que organizam essa ordem: a progressão por encadeamento causal (do problema à causa, da causa ao efeito, do efeito ao remédio) e a progressão por tensão (tese, objeção, resposta à objeção). A coesão sustenta a progressão: conectivos lógicos e retomadas nominais deixam visível a relação entre as ideias, mas não substituem o conteúdo — um parágrafo todo construído com 'além disso' não avança se não trouxer raciocínio novo. Sinal de alerta: se você consegue trocar a ordem dos parágrafos sem que o texto perca sentido, a progressão não existe.",
        examples: [
          "Parágrafo 1 apresenta o problema (relatórios vagos); parágrafo 2 explica o mecanismo (lacunas são supostas por quem lê); parágrafo 3 propõe o cuidado (descrever comportamento observável).",
          "Progressão por tensão: defendo a padronização → reconheço que ela reduz a riqueza do relato → mostro que campos abertos resolvem o impasse.",
          "Sem progressão: repetir 'a linguagem é importante' em três parágrafos com sinônimos diferentes e nenhum mecanismo novo.",
          "Teste da ordem: se você inverter o parágrafo 2 com o 3 e o texto continuar igual, eles não estão encadeados.",
          "Conectivo sem conteúdo: um parágrafo que começa por 'além disso' e só repete o anterior com palavras diferentes.",
        ],
      },
      {
        title: "Coesão e conexão entre parágrafos",
        explanation:
          "Coesão é o conjunto de recursos que ligam as partes do texto entre si: referentes e retomadas (artigos, pronomes, sinônimos, expressões nominalizantes), conectivos lógicos e temporais, e a manutenção de um mesmo eixo temático. Ela é o que faz o texto ser lido como uma unidade, e não como uma lista de frases corretas. A coesão tem dois níveis que costumam ser confundidos: a coesão intrafrasal, que organiza o interior da frase (por exemplo, evitar ambiguidade de pronome), e a coesão entre frases e parágrafos, que garante que uma ideia retome a anterior. Entre parágrafos, a ligação deve ser feita de dois lados ao mesmo tempo: por um elemento retomado, que reaparece em forma variada, e por um elemento novo, que efetivamente acrescenta. Essa é a regra da progressão informativa: um parágrafo que só retoma não avança; um parágrafo que só avança sem retomar quebra a unidade.",
        examples: [
          "Retomada nominal boa: 'a padronização do relatório' → 'essa padronização' → 'o modelo fechado' (mesmo referente, formulado de modo variado).",
          "Ambiguidade a evitar: 'A mãe falou com a filha quando ela chorou' — sem desambiguação, a coesão falha mesmo com frase gramaticalmente correta.",
          "Progressão com retomada e acréscimo: o parágrafo 2 retoma 'lacuna descritiva' e acrescenta o mecanismo de suposição por parte do leitor.",
          "Coesão entre parágrafos: fechar o parágrafo anterior com a consequência e abrir o próximo retomando essa consequência como problema.",
          "Sinal de fraca coesão: pronomes 'ele/ela' sem antecedente claro e parágrafos que poderiam ser trocados de lugar sem prejuízo.",
        ],
      },
      {
        title: "Repertório sociocultural e referências",
        explanation:
          "Repertório é o material externo que o autor traz para sustentar ou ilustrar a tese: fatos, dados, leis, conceitos teóricos, obras, casos históricos e experiências de observação. Ele só tem função argumentativa quando é pertinente e quando o texto explica a ponte entre a referência e a tese — trazer um nome célebre sem essa explicação produz o que se chama 'decorativo', e é um dos erros mais penalizados em correção. A pertinência se testa por três perguntas: a referência trata do mesmo eixo temático do texto? Eu consigo explicar, em uma frase, o que ela comprova aqui? Ela acrescenta algo que o meu próprio raciocínio não teria produzido sozinho? O repertório também pode ser interno — um exemplo construído pelo próprio autor, um dado hipotético bem descrito — desde que seja verossímil e comentado. Evite generalizações do tipo 'estudos mostram' sem fonte: elas enfraquecem a credibilidade justamente quando o texto quer parecer rigoroso.",
        examples: [
          "Repertório pertinente e comentado: a passagem de registros livres para modelos padronizados em saúde mostra que a linguagem técnica sempre foi objeto de decisão coletiva, não de gosto pessoal.",
          "Repertório decorativo: citar um autor clássico no fim do parágrafo sem explicar o que aquele argumento sustenta aqui.",
          "Repertório técnico da área: a noção de escuta ativa como condição de produção de relato confiável em entrevista clínica.",
          "Repertório de observação pessoal (interno): relatos de estudantes indicam que a dúvida mais frequente em anamnese é o medo de escrever demais.",
          "Uso inadequado: 'segundo especialistas, a linguagem é importante' — fonte genérica, afirmação semântica vazia.",
        ],
      },
    ],
    sections: [
      {
        title: "1. Planeje antes de escrever",
        body: "Transforme o tema em pergunta. Por exemplo: 'Por que a precisão linguística importa na Psicologia?' A tese responde à pergunta; os argumentos explicam por que essa resposta faz sentido. Liste duas razões distintas antes de abrir o documento: se as duas forem a mesma ideia com sinônimos, ainda não há plano.",
      },
      {
        title: "2. Estruture a introdução",
        body: "A introdução situa o tema e apresenta a tese. Evite começar com frases genéricas como 'desde os primórdios da humanidade'. Prefira contextualizar diretamente o problema e indicar a posição que será defendida, criando um compromisso com o leitor que o desenvolvimento precisará honrar.",
      },
      {
        title: "3. Desenvolva com unidade",
        body: "Cada parágrafo deve ter uma função. Comece com tópico frasal, explique a ideia, use exemplo ou repertório pertinente e feche mostrando a ligação com a tese. Se o exemplo não prova nada, ele vira ilustração solta; se o parágrafo pode ser trocado de lugar sem prejuízo, não há progressão.",
      },
      {
        title: "4. Conclua sem repetir mecanicamente",
        body: "A conclusão retoma o percurso e mostra o resultado do raciocínio, sem introduzir causa inédita. Quando a tarefa pedir proposta de intervenção, detalhe ação, agente e modo; quando não pedir, sintetize a defesa de forma precisa e confira se a tese continua valendo à luz do que foi argumentado.",
      },
    ],
    worked: {
      title: "Da tese ao argumento",
      source: "Tema: a importância da linguagem precisa em registros psicológicos.",
      analysis:
        "Tese possível: a precisão linguística é indispensável porque reduz inferências indevidas e protege a qualidade ética do registro. Argumento 1: termos vagos ampliam ambiguidades. Argumento 2: registros observáveis diferenciam fato, hipótese e interpretação.",
    },
    method: [
      "Escreva a tese em uma frase discutível.",
      "Defina duas razões distintas e uma evidência para cada.",
      "Revise se a conclusão retoma o percurso sem repetir a introdução.",
    ],
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
        explanation:
          "Precisão clínica é a capacidade de escrever de modo claro, observável e responsável — isto é, de modo que outra pessoa, lendo o mesmo documento em outro momento, consiga distinguir o que foi visto do que foi deduzido. Em prontuários, relatórios e laudos, uma palavra vaga não é apenas feiura de estilo: ela produz efeito prático, porque transforma hipótese em conclusão, impressão em fato ou julgamento em característica do sujeito, e esses registros circulam entre profissionais, instituições e, às vezes, instâncias judiciais. O critério operacional é separar quatro camadas que a escrita apressada costuma fundir: dado observado, fala relatada, hipótese interpretativa e análise sustentada. A revisão deve ainda verificar três propriedades do texto: se é verificável (outro leitor pode conferir), se é datado (indica período e frequência) e se é não patologizante (descreve comportamento em vez de rotular pessoa).",
        examples: [
          "Vago: 'O paciente estava muito mal.' Melhor: 'O paciente relatou insônia em três noites da última semana e chorou durante parte da entrevista.'",
          "Inferência indevida: 'O silêncio comprovou resistência.' Melhor: 'Houve silêncio por cerca de dez segundos antes da resposta; o sentido clínico do episódio será investigado.'",
          "Julgamento: 'A mãe é negligente.' Melhor: 'A mãe não compareceu às duas entrevistas agendadas e não respondeu ao contato telefônico até esta data.'",
          "Quatro camadas: dado ('levantou-se duas vezes') → fala relatada ('ela disse que estava inquieta') → hipótese ('a inquietação pode estar associada a ansiedade') → análise ('a hipótese será testada nas próximas sessões').",
          "Teste de leitura cruzada: se um colega não consegue separar, só lendo o parágrafo, o que você viu do que você deduziu, o texto ainda não está preciso.",
        ],
      },
      {
        title: "Por que, porque, por quê e o porquê",
        explanation:
          "Os quatro porquês têm funções diferentes. 'Por que' separado e sem acento é usado em perguntas diretas e indiretas (sentido de 'por qual motivo') e também como pronome relativo, substituível por 'por qual' ou 'pelo qual'. 'Porque' junto e sem acento é conjunção de causa ou explicação: introduz resposta e pode ser substituído por 'pois' ou 'uma vez que'. 'Por quê' separado e com acento circunflexo aparece sempre no fim da frase, antes de ponto de interrogação, exclamação ou ponto final. 'Porquê' junto e com acento é substantivo: significa 'motivo' ou 'razão' e costuma vir precedido de artigo, pronome, adjetivo ou numeral. A ordem prática é ler a frase inteira e perguntar qual função a palavra cumpre ali — pergunta, causa, fim de frase ou substantivo — antes de decidir a grafia.",
        examples: [
          "Por que (pergunta direta): 'Por que o participante interrompeu a entrevista?'",
          "Por que (pergunta indireta): 'A equipe investigou por que a entrevista foi interrompida.' Não se acentua porque a pergunta está no meio da frase.",
          "Por que (pronome relativo): 'A razão por que o relato mudou de tom não está clara.' Substitui-se por 'pela qual'.",
          "Porque (causa): 'A entrevista foi interrompida porque o participante precisou sair.' Pode virar 'pois o participante precisou sair'.",
          "Por quê (fim da frase): 'O participante saiu por quê?' Também antes de ponto final ou exclamação: 'Não sei por quê.'",
          "O porquê (substantivo): 'A equipe investigou o porquê da interrupção.' Equivale a 'o motivo' e pede determinante.",
          "Atenção clínica: 'Por que o paciente silenciou?' é pergunta investigativa. 'O paciente silenciou porque estava resistente' só deve ser escrito se houver sustentação clínica para essa causa.",
        ],
      },
      {
        title: "Mas, mais e houve",
        explanation:
          "'Mas' é conjunção adversativa: articula duas ideias marcando contraste, oposição ou quebra de expectativa, e por isso exige que os termos confrontados tenham relação real entre si — um 'mas' que liga frases sem tensão é dispensável. 'Mais' é palavra de acréscimo: indica quantidade, intensidade ou grão comparativo, e jamais deve ser escrito com o sentido adversativo. Já 'houve', quando provém do verbo haver com sentido de existir, ocorrer ou acontecer, é impessoal: não tem sujeito e permanece no singular, independentemente do número do complemento, do mesmo modo como acontece com 'fazer' nesse mesmo uso. A exceção importante é que, quando haver indica posse ou obrigação, ele é plenamente conjugado e concorda com o sujeito. A ordem da decisão é sempre a mesma: primeiro descubra o que o verbo significa na frase, depois escolha o número.",
        examples: [
          "Mas: 'Apresentou dificuldade inicial, mas concluiu a atividade.' Há oposição entre dificuldade e conclusão.",
          "Mais: 'Relatou mais episódios de ansiedade na última semana.' Indica quantidade maior.",
          "Erro comum: 'Relatou mas episódios, mais não soube datá-los.' Correto: 'Relatou mais episódios, mas não soube datá-los.'",
          "Houve (existir): 'Houve três sessões no mês.' Não se escreve 'houveram três sessões'.",
          "Haver (posse): 'Haviam três encaminhamentos pendentes na fila.' Aqui o verbo concorda com o sujeito.",
          "Leitura combinada: 'Houve mais relatos, mas um deles não foi datado' — acréscimo, contraste e verbo impessoal na mesma frase.",
        ],
      },
      {
        title: "Onde e aonde",
        explanation:
          "'Onde' indica localização: lugar fixo, espaço ou situação em que algo se encontra ou ocorre, e pode ser usado no sentido literal ou figurado. 'Aonde' resulta da junção da preposição 'a' com 'onde' e marca movimento, direção ou destino, isto é, algo que se desloca até um ponto. A escolha depende do verbo que governa a oração: verbos de existência e permanência (ocorrer, estar, permanecer, acontecer, situar-se) pedem 'onde'; verbos de movimento e direção (ir, levar, chegar, dirigir-se, aproximar-se, caminhar) pedem 'aonde'. O teste de substituição resolve os casos difíceis: se a frase puder ser respondida por 'em algum lugar', use 'onde'; se puder ser respondida por 'para algum lugar', use 'aonde'.",
        examples: [
          "Onde: 'Onde ocorreu a sessão?' A sessão ocorreu em um lugar fixo.",
          "Onde: 'Onde o paciente estava durante a crise?' Pergunta por localização.",
          "Aonde: 'Aonde você vai após o atendimento?' Há ideia de destino.",
          "Aonde: 'Aonde essa interpretação nos leva?' Há movimento metafórico para uma conclusão.",
          "Erro comum: 'Aonde ocorreu a sessão?' Melhor: 'Onde ocorreu a sessão?'",
          "Substituição: 'Onde você esteve?' → 'em algum lugar'; 'Aonde você foi?' → 'para algum lugar'.",
        ],
      },
      {
        title: "Pronomes e retomada",
        explanation:
          "Pronomes organizam a retomada das ideias, evitam repetição e dão coesão ao texto — mas, mal posicionados, criam ambiguidade, um dos defeitos mais penalizados em escrita técnica. A partícula 'esse/essa/isso' costuma retomar algo já mencionado ou algo próximo de quem escuta; 'este/esta/isto' aponta para algo que será apresentado, para o tempo presente ou para algo próximo de quem fala ou escreve; 'aquele/aquilo' afasta, marcando algo dito antes ou distante. Além da distância, o que decide a escolha é a direção da referência: 'esse' olha para trás e retoma, 'este' olha para frente e anuncia. Nos textos técnicos, evite ainda 'o mesmo/a mesma' como substituto de pessoa: a prática burocrática deixa a frase artificial e, com dois antecedentes possíveis, provoca dupla leitura. O remédio estrutural é simples — quando houver mais de um antecedente, repita o substantivo em vez de usar o pronome.",
        examples: [
          "Esse retomando algo já dito: 'O paciente relatou ansiedade. Essa dificuldade apareceu antes das provas.'",
          "Este anunciando algo: 'Este relatório apresenta observações realizadas em três encontros.'",
          "Este como tempo presente: 'Nesta sessão, foram retomados os combinados iniciais.'",
          "Evite: 'O paciente saiu; falei com o mesmo.' Melhor: 'O paciente saiu; falei com ele.'",
          "Ambiguidade: 'A mãe falou com a filha quando ela chorou' — se não ficar claro quem chorou, repita o substantivo.",
          "Retomada distante: se entre o pronome e o antecedente houver outro substantivo do mesmo gênero, prefira repetir o núcleo.",
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
        body: "Primeiro confira clareza e coerência; depois coesão e progressão; por fim gramática fina: concordância, regência, pontuação, pronomes, porquês, mas/mais, onde/aonde e redundâncias. Releia a frase inteira antes de decidir qualquer correção pontual.",
      },
    ],
    worked: {
      title: "Reescrita responsável",
      source: "Frase inicial: 'O paciente sempre fica mal e por isso abandonou a sessão.'",
      analysis:
        "Versão mais precisa: 'O paciente relatou mal-estar antes da sessão e deixou o atendimento após vinte minutos. A relação entre o mal-estar e a saída deve ser investigada nas próximas entrevistas.' A revisão reduz generalização e separa fato de hipótese.",
    },
    method: [
      "Descubra a função da palavra na frase.",
      "Confira concordância, preposição e referente.",
      "Releia o período inteiro para eliminar ambiguidade.",
    ],
    recall: [
      { question: "Como decidir entre por que, porque, por quê e porquê?", answer: "Pergunta no início/meio: 'por que'. Causa ou resposta: 'porque'. No fim da frase, antes da pontuação: 'por quê'. Substantivo, com sentido de motivo: 'o porquê'." },
      { question: "Por que evitar 'o mesmo' como pronome pessoal?", answer: "Porque soa burocrático e pode prejudicar clareza; 'ele' ou 'ela' retomam melhor a pessoa." },
      { question: "Como tornar um relato mais preciso?", answer: "Delimitando fonte, período, frequência e comportamento observável." },
    ],
  },
  "producao-interpretacao-textos-avaliacao": {
    goal: "Avaliar textos e o próprio desempenho com critérios explícitos, separando gosto pessoal de qualidade argumentativa e transformando feedback em plano de estudo.",
    concepts: [
      {
        title: "Critério de avaliação",
        explanation:
          "Critério é a propriedade observável e nomeada que serve de base para julgar um texto ou uma resposta. Ele precisa ser declarado antes da leitura, porque é ele que transforma uma opinião em avaliação verificável: sem critério, 'bom' e 'ruim' expressam preferência pessoal e não permitem diálogo, correção nem progresso. Um critério útil tem três características. É específico (diz o que observar: 'a tese aparece na introdução', não 'o texto é claro'). É verificável (outro leitor, com o mesmo texto, chega à mesma constatação). É proporcional ao que a tarefa pede (uma prova de múltipla escolha não avalia a mesma coisa que um laudo ou uma redação). Em textos dissertativos, costumam ser usados quatro eixos: adequação (o texto responde ao que foi pedido, para quem e em que gênero), coesão (as ideias se conectam e progridem), argumentação (há tese, razões e evidências em relação explícita) e correção (a língua é usada de modo a não criar ambiguidade).",
        examples: [
          "Critério vago: 'o texto está bem escrito'. Critério operacional: 'cada parágrafo apresenta uma razão nova e a conclusão não introduz causa inédita'.",
          "Critério aplicado a questão objetiva: 'marquei a alternativa B porque a expressão decisiva do enunciado está na terceira linha'.",
          "Critério de adequação: 'o registro usado é impessoal, como o gênero relatório exige'.",
          "Critério de correção: 'não há pronome sem antecedente claro no parágrafo'.",
          "Teste do critério: pergunte 'o que exatamente eu olharia para dizer que isto está presente?'. Se não houver resposta, o critério ainda é opinião.",
        ],
      },
      {
        title: "Rubrica",
        explanation:
          "Rubrica é uma escala de avaliação que descreve, para cada critério, o que caracteriza níveis de domínio — normalmente do insuficiente ao avançado. Sua função é reduzir a subjetividade da correção: em vez de um julgamento global ('boa redação'), a rubrica obriga a separar dimensões e a justificar o nível atribuído a cada uma. Para quem estuda, a rubrica tem um uso duplo. Serve para autoavaliar o próprio texto antes de entregar e serve para ler o feedback do corretor sem se perder: um comentário como 'faltou progressão' só se torna acionável quando se sabe em que nível a progressão está e o que faria subir de nível. Atenção a dois desvios comuns. O primeiro é achar que níveis altos significam textos longos: em rubricas bem construídas, domínio alto se mede por precisão e organização, não por volume. O segundo é avaliar dimensões que a rubrica não menciona, como beleza da letra ou quantidade de citações.",
        examples: [
          "Nível inicial: 'a tese não aparece ou é apenas o tema repetido'. Nível intermediário: 'a tese aparece, mas não orienta todos os parágrafos'. Nível avançado: 'a tese delimita uma posição e cada parágrafo a sustenta'.",
          "Aplicação: antes de escrever, leia os quatro eixos e faça um plano que atenda a todos, em vez de corrigir só no fim.",
          "Uso do feedback: 'faltou evidência' → procure no seu texto onde uma evidência deveria estar e descreva o que falta, em vez de apenas sentir que a nota foi baixa.",
          "Erro de leitura de rubrica: tratar 'uso variado de conectivos' como pedido de sinônimos raros; o critério pede relação lógica clara, não variedade ornamental.",
        ],
      },
      {
        title: "Feedback descritivo",
        explanation:
          "Feedback é útil quando descreve, e não quando rotula. A forma segura tem três partes: o que foi observado (citação ou descrição do trecho), o efeito que isso produz no leitor ou no registro, e um encaminhamento concreto e verificável. O contraponto é o feedback global ('bom trabalho', 'melhore a introdução'), que não diz o que fazer na próxima vez e, por isso, não muda a prática. O feedback também precisa separar a pessoa da produção: dizer 'você não sabe argumentar' fecha a mudança; dizer 'o segundo parágrafo repete a tese sem acrescentar razão' abre. Em contextos clínicos e acadêmicos, o mesmo cuidado vale para a linguagem sobre o outro: descrever comportamento em vez de atribuir característica. Um feedback bem escrito é, na prática, a aplicação do mesmo princípio da precisão clínica — observação, efeito e encaminhamento, sem julgamento disfarçado de ajuda.",
        examples: [
          "Feedback fraco: 'texto confuso'. Feedback descritivo: 'o parágrafo 2 apresenta três ideias sem tópico frasal; o leitor não sabe qual delas sustenta a tese'.",
          "Feedback fraco: 'cuidado com a linguagem'. Feedback descritivo: 'a frase atribui a causa do silêncio sem registrá-la; troque por uma descrição do intervalo e do que se seguiu'.",
          "Encaminhamento verificável: 'escreva a tese em uma frase antes de reabrir o texto e confira se cada parágrafo responde a ela'.",
          "Feedback a si mesmo: registre o erro, o motivo e a regra de ouro que vai aplicar na próxima revisão.",
        ],
      },
      {
        title: "Autoavaliação registrada",
        explanation:
          "Autoavaliação é o ato de aplicar critérios declarados ao próprio trabalho e de registrar o resultado, de modo que seja possível comparar uma versão com a anterior. Sem registro, a autoavaliação vira impressão: você sente que melhorou, mas não sabe em quê. O registro mínimo anota três elementos — o critério usado, o que foi observado e o ajuste que será feito na próxima produção. Ele também deve indicar evidência: 'usei mais conectivos' não é verificável; 'o parágrafo 3 agora começa por 'por isso' e retoma a ideia do parágrafo 2' é. Em ciclos de estudo, a autoavaliação registrada é o que permite transformar nota em plano: em vez de 'acertei 7 de 10', registra-se qual critério falhou em cada erro ('atribuí causa não dita', 'não localizei o trecho decisivo') e qual trecho do conteúdo será revisitado.",
        examples: [
          "Registro: critério 'progressão' → observação 'os três parágrafos abrem com a mesma ideia' → ajuste 'atribuir função diferente a cada parágrafo'.",
          "Registro de prova: critério 'evidência' → observação 'marquei a alternativa sem achar o trecho' → ajuste 'sublinhar antes de marcar'.",
          "Comparação entre versões: manter a primeira redação e reler junto com a revisada para verificar se o ajuste pedido foi de fato feito.",
          "Erro comum: autoavaliar apenas a nota. A nota diz o resultado; o critério diz o que mudar.",
        ],
      },
      {
        title: "Adequação e correção",
        explanation:
          "Adequação e correção são eixos diferentes e costumam ser confundidos. Adequação pergunta se o texto cumpre a tarefa: responde ao que foi pedido, no gênero esperado, para o destinatário previsto, com o registro compatível. Correção pergunta se a língua está sendo usada de modo a não produzir ambiguidade, erro de concordância ou retomada obscura. É possível escrever um texto rigorosamente correto e inadequado — perfeito na gramática, mas respondendo a outra pergunta — e também um texto adequado com pequenos desvios de correção, desde que eles não comprometam o sentido. Por isso a revisão deve olhar primeiro a adequação (estou respondendo o que foi pedido?) e só depois a correção (a frase está bem construída?): corrigir uma frase que não servia à tarefa é trabalho perdido.",
        examples: [
          "Inadequado e correto: responder uma proposta de intervenção com um resumo teórico impecável, sem agente nem ação.",
          "Adequado com desvio: tese clara e argumentação organizada, com um erro de regência que não impede a leitura — corrigir, mas sem reescrever o texto.",
          "Adequação ao gênero: relatório pede terceira pessoa e descrição; posicionamento pede primeira pessoa e defesa.",
          "Ordem da revisão: 1) a tarefa foi cumprida? 2) há tese e progressão? 3) as frases estão claras e corretas?",
        ],
      },
    ],
    sections: [
      {
        title: "1. Defina o critério antes de olhar o texto",
        body: "Antes de emitir juízo, diga o que você vai observar e por quê. Se a tarefa pede argumentação, o critério é tese, razão e evidência; se pede registro clínico, o critério é observabilidade e separação entre fato e hipótese. Avaliar sem critério declarado produz impressão, e impressão não pode ser discutida nem transformada em plano de estudo.",
      },
      {
        title: "2. Avalie em camadas: adequação, coesão, argumentação e correção",
        body: "Comece pela adequação: o texto responde ao que foi pedido? Depois a coesão: as ideias se conectam e avançam? Em seguida a argumentação: há tese, razões e evidências em relação explícita? Por fim a correção: a língua cria ambiguidade? Essa ordem evita o erro mais comum — corrigir pontuação de um parágrafo que nem deveria estar no texto.",
      },
      {
        title: "3. Responda questões objetivas com método",
        body: "Leia a pergunta e sublinhe o que ela pede; localize no texto a expressão decisiva; só então compare alternativas e elimine as que ampliam o alcance do enunciado ou acrescentam causa, intenção ou diagnóstico. A alternativa correta é a que mantém o mesmo alcance do texto. Marcar sem ter achado o trecho é a principal fonte de erro em prova.",
      },
      {
        title: "4. Transforme avaliação em plano de estudo",
        body: "Uma nota só é útil quando indica o que fazer em seguida. Registre o critério que falhou, o erro concreto e a regra que será aplicada na próxima produção: 'atribuí causa não dita → antes de escrever, sublinhar a pista que autoriza a afirmação'. Revisite o conteúdo ligado a esse critério e refaça o item, comparando a resposta nova com a antiga.",
      },
    ],
    worked: {
      title: "Aplicando critérios a um parágrafo",
      source: "Parágrafo: 'A linguagem é muito importante na Psicologia. Ela é essencial e muito relevante para todos os profissionais da área.'",
      analysis:
        "Adequação: o parágrafo trata do tema pedido, mas não delimita posição. Argumentação: não há tese discutível — as frases repetem a mesma ideia com sinônimos, sem razão nem evidência. Coesão: há encadeamento simples, mas sem progressão. Correção: não há erro gramatical. O encaminhamento não é 'escrever melhor', e sim 'formular uma tese com relação causal e sustentá-la com uma razão e um exemplo'.",
    },
    method: [
      "Anote o critério antes de emitir juízo.",
      "Aponte no texto a evidência de cada nível avaliado.",
      "Proponha um ajuste concreto e verificável.",
    ],
    recall: [
      { question: "O que separa um critério de uma preferência?", answer: "O critério é declarado, específico e verificável por outro leitor; a preferência expressa gosto e não pode ser conferida." },
      { question: "Qual é a ordem correta da revisão?", answer: "Adequação, progressão e argumentação, e só depois a correção gramatical." },
      { question: "O que torna um feedback acionável?", answer: "Descrever o observado, o efeito e um encaminhamento concreto, sem rotular a pessoa." },
    ],
  },
};

const writingActivities: Record<string, StudyActivity> = {
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
  "producao-interpretacao-textos-avaliacao": {
    prompt: "Escreva um feedback descritivo para a frase 'A linguagem é muito importante na Psicologia', indicando o que foi observado, o efeito no leitor e um ajuste concreto.",
    model: "Observação: o parágrafo repete a mesma ideia com sinônimos e não apresenta uma relação de causa. Efeito: o leitor não encontra o que será demonstrado nem por que isso importa. Ajuste: formule uma tese com relação causal e sustente-a com uma razão e um exemplo verificável.",
    trap: "Confundir feedback com elogio, juízo de valor ou julgamento da pessoa.",
  },
};

const studyTips: Record<string, string> = {
  "producao-interpretacao-textos-linguagem": "Localize a expressão decisiva no enunciado antes de marcar a alternativa.",
  "producao-interpretacao-textos-discurso": "Pergunte sempre quem fala, para quem, em que situação e com que finalidade — a resposta costuma estar nesses dados.",
  "producao-interpretacao-textos-redacao": "Anote a tese e duas razões distintas antes de escrever; confira depois se cada parágrafo serve à tese.",
  "producao-interpretacao-textos-revisao": "Leia a frase inteira antes de decidir: função, concordância e referente vêm antes da regra decorada.",
  "producao-interpretacao-textos-avaliacao": "Antes de se cobrar uma nota, diga qual critério falhou; sem critério, não há plano de estudo.",
};

const avaliacaoQuestions: NeuroTextQuestion[] = [
  {
    id: "pit-aval-001",
    prompt: "O que distingue um critério de avaliação de uma preferência pessoal?",
    options: [
      "O critério é declarado antes da leitura e pode ser conferido por outro leitor.",
      "A preferência é mais honesta porque parte de quem avalia.",
      "O critério serve apenas para textos longos.",
      "A preferência vale quando quem avalia é experiente.",
    ],
    correctAnswer: "O critério é declarado antes da leitura e pode ser conferido por outro leitor.",
    explanation: "Critério é específico, declarado e verificável; preferência expressa gosto e não pode ser conferida por outra pessoa.",
  },
  {
    id: "pit-aval-002",
    prompt: "Em uma revisão de texto, qual é a ordem de trabalho mais eficiente?",
    options: [
      "Corrigir pontuação, depois conferir se a tarefa foi cumprida.",
      "Adequação, progressão e argumentação e, por fim, correção gramatical.",
      "Reescrever o texto inteiro e depois ler a proposta.",
      "Contar palavras, revisar conectivos e conferir a tese.",
    ],
    correctAnswer: "Adequação, progressão e argumentação e, por fim, correção gramatical.",
    explanation: "Corrigir a forma antes de saber se o texto cumpre a tarefa é trabalho perdido: primeiro adequação, depois organização, depois língua.",
  },
  {
    id: "pit-aval-003",
    prompt: "Qual frase funciona como feedback descritivo?",
    options: [
      "Texto confuso, precisa estudar mais.",
      "Você ainda não sabe argumentar.",
      "O segundo parágrafo repete a tese sem acrescentar razão; dê a ele uma função própria.",
      "Nota baixa, mas o tema é interessante.",
    ],
    correctAnswer: "O segundo parágrafo repete a tese sem acrescentar razão; dê a ele uma função própria.",
    explanation: "Feedback descritivo cita o observado, seu efeito e um encaminhamento concreto, sem rotular a pessoa.",
  },
  {
    id: "pit-aval-004",
    prompt: "Ao responder uma questão de múltipla escolha, qual deve ser o primeiro passo?",
    options: [
      "Ler todas as alternativas e escolher a mais familiar.",
      "Sublinhar no enunciado o que a pergunta pede e localizar a expressão decisiva no texto.",
      "Descartar a alternativa mais longa.",
      "Marcar a alternativa que melhor desenvolve o assunto.",
    ],
    correctAnswer: "Sublinhar no enunciado o que a pergunta pede e localizar a expressão decisiva no texto.",
    explanation: "Sem localizar o trecho decisivo, a escolha passa a ser impressão. A alternativa correta mantém o mesmo alcance do texto.",
  },
  {
    id: "pit-aval-005",
    prompt: "Uma autoavaliação registrada deve conter, no mínimo:",
    options: [
      "A nota obtida e a sensação geral sobre o desempenho.",
      "O critério usado, o que foi observado e o ajuste que será feito.",
      "A quantidade de questões respondidas e o tempo gasto.",
      "O número de palavras escritas e os conectivos utilizados.",
    ],
    correctAnswer: "O critério usado, o que foi observado e o ajuste que será feito.",
    explanation: "Sem critério, observação e ajuste, a autoavaliação não indica o que mudar na próxima produção.",
  },
];

function buildTopics(): StudyTopic[] {
  const unitTopics: StudyTopic[] = textsUnits.map((unit) => ({
    slug: unit.slug,
    title: unit.title,
    description: unit.videoDescription,
    questions: unit.testTextQuestions ?? [],
    lesson: deepLessons[unit.slug],
    activity: writingActivities[unit.slug],
    tip: studyTips[unit.slug],
  }));

  return [
    ...unitTopics,
    {
      slug: "producao-interpretacao-textos-avaliacao",
      title: "Avaliação e autoavaliação",
      description:
        "Critérios para avaliar um texto, responder questões com segurança e transformar resultado em plano de estudo.",
      questions: avaliacaoQuestions,
      lesson: deepLessons["producao-interpretacao-textos-avaliacao"],
      activity: writingActivities["producao-interpretacao-textos-avaliacao"],
      tip: studyTips["producao-interpretacao-textos-avaliacao"],
    },
  ];
}

const studyTopics: StudyTopic[] = buildTopics();

function shuffleIndexes(count: number) {
  const indexes = Array.from({ length: count }, (_, index) => index);
  for (let index = indexes.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [indexes[index], indexes[swap]] = [indexes[swap], indexes[index]];
  }
  return indexes;
}

type TopicOrders = Record<string, number[]>;

function buildOrders(randomised: boolean): TopicOrders {
  return Object.fromEntries(
    studyTopics.map((topic) => [
      topic.slug,
      randomised ? shuffleIndexes(topic.questions.length) : topic.questions.map((_, index) => index),
    ]),
  );
}

const serverOrders: TopicOrders = buildOrders(false);
const orderListeners = new Set<() => void>();
let clientOrders: TopicOrders | null = null;

function subscribeOrders(listener: () => void) {
  orderListeners.add(listener);
  return () => {
    orderListeners.delete(listener);
  };
}

function getOrdersSnapshot(): TopicOrders {
  if (!clientOrders) clientOrders = buildOrders(true);
  return clientOrders;
}

function getOrdersServerSnapshot(): TopicOrders {
  return serverOrders;
}

function reshuffleTopic(slug: string, count: number) {
  clientOrders = { ...getOrdersSnapshot(), [slug]: shuffleIndexes(count) };
  orderListeners.forEach((listener) => listener());
}

const LETTERS = "ABCD";

export function TextsStudyPage({ subjectName, subjectDescription }: TextsStudyPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [showModel, setShowModel] = useState(false);
  const orders = useSyncExternalStore(subscribeOrders, getOrdersSnapshot, getOrdersServerSnapshot);
  const [roundScore, setRoundScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const practiceRef = useRef<HTMLElement | null>(null);


  const topic = studyTopics[activeIndex];
  const order = orders[topic.slug] ?? [];
  const questionIndex = order[step] ?? 0;
  const question = topic.questions[questionIndex];
  const correctAnswer = question?.correctAnswer ?? question?.correctAnswers?.[0];
  const correctIndex = question ? question.options.indexOf(correctAnswer ?? "") : -1;
  const isCorrect = selectedOption === correctAnswer;
  const answeredInRound = finished ? topic.questions.length : Math.min(step + (selectedOption ? 1 : 0), topic.questions.length);
  const progress = topic.questions.length ? (answeredInRound / topic.questions.length) * 100 : 0;
  const isLastQuestion = step === topic.questions.length - 1;

  function changeTopic(index: number) {
    setActiveIndex(index);
    setStep(0);
    setSelectedOption(null);
    setShowModel(false);
    setFinished(false);
    setRoundScore(0);
    document.getElementById("study-panel")?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function answer(option: string) {
    if (selectedOption || finished) return;
    setSelectedOption(option);
    if (option === correctAnswer) setRoundScore((value) => value + 1);
  }

  function nextQuestion() {
    if (isLastQuestion) {
      setFinished(true);
      setSelectedOption(null);
      return;
    }
    setStep((value) => value + 1);
    setSelectedOption(null);
    practiceRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function restartRound() {
    reshuffleTopic(topic.slug, topic.questions.length);
    setStep(0);
    setSelectedOption(null);
    setRoundScore(0);
    setFinished(false);
    practiceRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-[#261010] text-slate-900">
      <header className="border-b border-white/10 bg-[#160707] text-white">
        <div className="mx-auto flex min-h-[76px] max-w-[1210px] items-center gap-4 px-[26px]">
          <div className="grid h-[38px] w-[38px] place-items-center rounded-[10px] bg-rose-100 text-[1.15rem] font-extrabold text-[#7f0000]">T</div>
          <div className="font-bold tracking-[.01em]">
            Estudo de Textos
            <small className="block text-[.78rem] font-normal tracking-normal opacity-70">Revisão para a prova</small>
          </div>
          <span className="ml-auto hidden text-[.86rem] text-rose-100/80 md:block">Leia, identifique, pratique</span>
        </div>
      </header>

      <div className="mx-auto max-w-[1210px] px-[26px] max-[560px]:px-[15px]">
        <section className="pb-[25px] pt-[39px] max-[810px]:pt-[27px]">
          <Link className="mb-4 block text-sm font-semibold text-rose-200" href="/disciplinas">
            Voltar para disciplinas
          </Link>
          <span className="block text-[.82rem] font-bold uppercase tracking-[.1em] text-rose-200">Produção e interpretação</span>
          <h1 className="mb-[9px] mt-1.5 max-w-[760px] text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.13] tracking-[-.035em] text-white">
            Aulas autorais, com método próprio de estudo.
          </h1>
          <p className="max-w-[700px] text-justify text-[1.05rem] leading-relaxed text-rose-50/75">
            {subjectDescription} {studyTopics.length} aulas aprofundadas a partir dos materiais, com conceitos aprofundados, exemplos resolvidos, revisão ativa, questões sorteadas e atividades de escrita. Escolha um tema, acompanhe a explicação e pratique no seu ritmo.
          </p>
        </section>

        <div className="grid items-start gap-[25px] pb-[70px] max-[810px]:grid-cols-1 lg:grid-cols-[236px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-5 max-[810px]:static" aria-label="Temas de estudo">
            <h2 className="mb-3 text-[.85rem] font-bold uppercase tracking-[.09em] text-rose-100/60">Temas</h2>
            <div className="grid gap-2 max-[810px]:grid-cols-2 max-[560px]:gap-[7px]" role="tablist" aria-label="Temas de estudo">
              {studyTopics.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    aria-controls="study-panel"
                    aria-selected={isActive}
                    className={`w-full cursor-pointer rounded-xl border p-[13px_14px] text-left transition max-[560px]:p-2.5 ${
                      isActive
                        ? "border-rose-200 bg-white text-slate-950 shadow-[inset_4px_0_0_#aa0000]"
                        : "border-white/10 bg-white/5 text-rose-50 hover:border-rose-200/50"
                    }`}
                    id={`tab-${item.slug}`}
                    key={item.slug}
                    onClick={() => changeTopic(index)}
                    role="tab"
                    type="button"
                  >
                    <span className={`block text-[.75rem] font-extrabold tracking-[.08em] ${isActive ? "text-[#aa0000]" : "text-rose-200"}`}>
                      {String(index + 1).padStart(2, "0")} / TEMA
                    </span>
                    <strong className={`mt-[3px] block text-[.95rem] leading-[1.3] ${isActive ? "" : "text-white"} max-[560px]:text-[.88rem]`}>
                      {item.title}
                    </strong>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 px-[3px] text-[.82rem] leading-relaxed text-rose-50/60 max-[810px]:mt-2.5">
              As questões são sorteadas em ordem aleatória e não se repetem dentro da rodada. As respostas aparecem após sua escolha.
            </p>
          </aside>

          <div className="min-w-0">
            <article
              aria-labelledby={`tab-${topic.slug}`}
              className="overflow-hidden rounded-[20px] border border-white/10 bg-[#fffaf7] shadow-[0_18px_42px_rgba(0,0,0,.35)]"
              id="study-panel"
              role="tabpanel"
            >
              <div className="border-b border-red-100 px-8 pb-6 pt-[29px] max-[560px]:px-[19px]">
                <span className="text-[.78rem] font-extrabold uppercase tracking-[.11em] text-[#aa0000]">
                  Tema {activeIndex + 1} de {studyTopics.length}
                </span>
                <h2 className="mb-2 mt-[5px] text-[clamp(1.6rem,3vw,2.15rem)] font-semibold leading-[1.18] tracking-[-.025em] text-slate-950">
                  {topic.title}
                </h2>
                <p className="max-w-[740px] text-justify text-slate-600">{topic.description}</p>
              </div>

              <div className="px-8 py-[26px] max-[560px]:px-[19px]">
                <div className="mb-[18px] border-b border-red-100 pb-[17px]">
                  <span className="block text-[.78rem] font-extrabold uppercase tracking-[.08em] text-[#aa0000]">
                    Aula {activeIndex + 1} · leitura guiada
                  </span>
                  <h3 className="my-[5px] text-[1.3rem] font-semibold text-slate-950">O que você vai aprender</h3>
                  <p className="text-justify text-slate-600">{topic.lesson.goal}</p>
                </div>

                <section className="mb-5" aria-label="Conceitos centrais">
                  <h3 className="mb-2.5 text-[1.05rem] font-semibold text-slate-950">Conceitos em foco</h3>
                  <div className="grid items-start gap-[9px] sm:grid-cols-2">
                    {topic.lesson.concepts.map((concept) => (
                      <div className="rounded-[10px] border border-red-100 bg-white p-[14px]" key={concept.title}>
                        <strong className="mb-1 block text-[#aa0000]">{concept.title}</strong>
                        <span className="block text-justify text-[.94rem] leading-relaxed text-slate-600">{concept.explanation}</span>
                        {concept.examples?.length ? (
                          <ul className="mt-3 list-disc space-y-2 pl-5 text-justify text-[.9rem] leading-relaxed text-slate-700">
                            {concept.examples.map((example) => (
                              <li key={example}>{example}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid gap-3">
                  {topic.lesson.sections.map((section) => (
                    <section className="border-l-[3px] border-[#aa0000] bg-[#fffaf6] p-[13px_17px]" key={section.title}>
                      <h4 className="mb-1 text-[1.05rem] font-semibold text-slate-950">{section.title}</h4>
                      <p className="text-justify leading-[1.65] text-slate-800">{section.body}</p>
                    </section>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-red-50 p-[18px_21px]">
                  <span className="block text-[.8rem] font-extrabold uppercase tracking-[.08em] text-[#aa0000]">Vamos resolver juntos</span>
                  <p className="mt-2 font-semibold text-slate-800">{topic.lesson.worked.title}</p>
                  <p className="mt-2 font-semibold text-slate-800">{topic.lesson.worked.source}</p>
                  <p className="mt-2 text-justify leading-relaxed text-slate-700">{topic.lesson.worked.analysis}</p>
                </div>

                <div className="mt-[18px] rounded-xl border border-red-200 bg-[#fff8f8] p-[15px_20px]">
                  <h3 className="mb-2 text-[1.05rem] font-semibold text-slate-950">Como resolver na prova</h3>
                  <ol className="list-decimal pl-[22px]">
                    {topic.lesson.method.map((item) => (
                      <li className="my-1 pl-[3px] text-justify leading-relaxed text-slate-800" key={item}>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="mt-4 rounded-[10px] border border-red-100 bg-[#fff4ef] p-3 px-4 text-justify leading-relaxed text-slate-800">
                  <strong>Erro comum:</strong> {topic.activity.trap}
                </p>
                <p className="mt-3 text-justify leading-relaxed text-slate-600">
                  <strong className="text-slate-800">Na prova:</strong> {topic.tip}
                </p>

                <div className="mt-6 rounded-xl border border-red-100 bg-[#fffbfb] p-[19px]">
                  <h3 className="mb-1 text-[1.05rem] font-semibold text-slate-950">Confira o que aprendeu</h3>
                  <p className="mb-3 text-slate-600">Responda mentalmente e abra cada resposta para conferir.</p>
                  <div className="grid gap-2">
                    {topic.lesson.recall.map((item, index) => (
                      <details className="rounded-[9px] border border-red-100 bg-white p-[10px_14px]" key={item.question}>
                        <summary className="cursor-pointer font-semibold text-slate-900">
                          {index + 1}. {item.question}
                        </summary>
                        <p className="mb-0.5 mt-2 text-justify text-sm leading-relaxed text-slate-600">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-red-100 pt-[18px]">
                  <h3 className="mb-[7px] text-[1.05rem] font-semibold text-slate-950">Aplique em dois minutos</h3>
                  <p className="mb-2.5 text-justify leading-relaxed text-slate-800">{topic.activity.prompt}</p>
                  <textarea
                    aria-label="Sua resposta para a atividade de escrita"
                    className="block min-h-[104px] w-full resize-y rounded-[10px] border border-red-100 bg-white p-3 text-slate-900 outline-none transition focus:border-[#aa0000]"
                    onChange={(event) => setDrafts((current) => ({ ...current, [topic.slug]: event.target.value }))}
                    placeholder="Escreva sua resposta aqui..."
                    value={drafts[topic.slug] ?? ""}
                  />
                  <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
                    <button
                      aria-expanded={showModel}
                      className="cursor-pointer rounded-[10px] border border-red-200 bg-white px-[15px] py-2.5 text-slate-800 transition hover:border-[#aa0000]"
                      onClick={() => setShowModel((value) => !value)}
                      type="button"
                    >
                      {showModel ? "Ocultar resposta possível" : "Ver uma resposta possível"}
                    </button>
                  </div>
                  <div className={`mt-2.5 rounded-[10px] bg-red-50 p-[13px_15px] text-justify leading-relaxed text-slate-700 ${showModel ? "" : "hidden"}`}>
                    <strong>Uma resposta possível:</strong> {topic.activity.model}
                  </div>
                </div>
              </div>

              <section className="border-t border-red-100 px-8 pb-[31px] pt-[25px] max-[560px]:px-[19px]" ref={practiceRef}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-[1.13rem] font-semibold text-slate-950">Pratique agora</h3>
                  <span className="text-[.82rem] text-slate-600">
                    {finished ? `${topic.questions.length} questões concluídas` : `Questão ${step + 1} de ${topic.questions.length}`}
                  </span>
                </div>

                <div className="mb-[21px] mt-3.5 h-1.5 overflow-hidden rounded-full bg-red-100" role="progressbar" aria-label="Questões deste tema" aria-valuemin={0} aria-valuemax={topic.questions.length} aria-valuenow={answeredInRound}>
                  <div className="h-full rounded-full bg-[#aa0000] transition-[width]" style={{ width: `${progress}%` }} />
                </div>

                {finished ? (
                  <div className="rounded-xl bg-red-50 p-[17px]">
                    <p className="text-lg font-semibold text-slate-900">Tema concluído.</p>
                    <p className="mt-1 text-justify leading-relaxed text-slate-700">
                      Você respondeu às {topic.questions.length} questões deste tema, em ordem aleatória e sem repetição, e acertou {roundScore}.
                      {" "}Releia os conceitos e a metodologia acima e volte ao caderno de temas para seguir adiante.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <button className="cursor-pointer rounded-[10px] bg-[#aa0000] px-[17px] py-2.5 font-bold text-white transition hover:bg-[#8b0000]" onClick={restartRound} type="button">
                        Nova rodada (nova ordem)
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="mb-[15px] text-[1.08rem] font-semibold leading-[1.4] text-slate-900">
                      <span className="font-extrabold text-[#aa0000]">{step + 1}.</span> {question?.prompt}
                    </p>
                    <div className="grid gap-[9px]">
                      {question?.options.map((option, index) => {
                        const isSelected = selectedOption === option;
                        const isAnswer = option === correctAnswer;
                        const stateClass = selectedOption
                          ? isAnswer
                            ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                            : isSelected
                              ? "border-[#7f0000] bg-red-50 text-[#7f0000]"
                              : "border-red-100 bg-white text-slate-700"
                          : "border-red-100 bg-white text-slate-800 hover:border-[#aa0000] hover:bg-[#fffaf6]";

                        return (
                          <button
                            className={`flex w-full items-start gap-[13px] rounded-[10px] border p-3 pl-[15px] text-left transition ${stateClass}`}
                            disabled={Boolean(selectedOption)}
                            key={option}
                            onClick={() => answer(option)}
                            type="button"
                          >
                            <span
                              className={`grid h-[25px] w-[25px] flex-none place-items-center rounded-[7px] text-[.78rem] font-extrabold ${
                                selectedOption && isAnswer ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-[#aa0000]"
                              }`}
                            >
                              {LETTERS[index]}
                            </span>
                            <span className="text-justify">{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {selectedOption ? (
                      <div className="mt-4 rounded-[11px] bg-[#fdecec] p-[14px_17px]">
                        <strong className="block text-[#5c0d0d]">{isCorrect ? "Você acertou." : `A resposta é ${LETTERS[correctIndex]}.`}</strong>
                        <p className="mt-1 text-justify leading-relaxed text-slate-700">{question?.explanation}</p>
                      </div>
                    ) : null}

                    <div className="mt-4 flex flex-wrap items-center gap-2.5">
                      {selectedOption ? (
                        <button className="cursor-pointer rounded-[10px] bg-[#aa0000] px-[17px] py-2.5 font-bold text-white transition hover:bg-[#8b0000]" onClick={nextQuestion} type="button">
                          {isLastQuestion ? "Concluir tema" : "Próxima questão"}
                        </button>
                      ) : null}
                      <span className="text-[.9rem] text-slate-500">
                        {answeredInRound ? `${roundScore} acerto${roundScore === 1 ? "" : "s"} em ${answeredInRound} resposta${answeredInRound === 1 ? "" : "s"} nesta rodada` : ""}
                      </span>
                    </div>
                  </>
                )}
              </section>
            </article>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 px-[26px] py-[22px] pb-[35px] text-[.82rem] leading-relaxed text-rose-50/55 max-[560px]:px-[15px]">
        <div className="mx-auto max-w-[1210px]">
          {subjectName}: conteúdo organizado a partir das aulas, questões revisadas e slides fotografados. Materiais repetidos foram unificados.
        </div>
      </footer>
    </main>
  );
}
