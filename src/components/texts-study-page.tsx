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
        explanation: "A partir de Saussure, a língua pode ser entendida como um sistema social de signos: um conjunto organizado em que cada palavra recebe sentido não por uma ligação natural com a coisa nomeada, mas pela relação que mantém com as demais palavras, com as regras gramaticais compartilhadas e com os usos consolidados em uma comunidade. Daí decorrem três consequências práticas para a leitura e para a escrita. Primeira: nenhum termo tem valor isolado; seu significado é delimitado pelo campo em que aparece, de modo que 'crise' significa coisa diferente em um relato emocional, em uma notícia econômica e em uma narrativa de ruptura familiar. Segunda: como a significação é convenção coletiva, ela muda com o tempo, com o grupo e com a instituição — o mesmo termo pode ter peso técnico em um serviço e peso coloquial fora dele. Terceira: escrever com precisão significa escolher o signo certo para o contexto, não o signo mais eloquente. Para a escuta psicológica, isso implica cautela com rótulos: termos técnicos como 'resistência', 'dependência' ou 'transtorno' só cumprem sua função quando situados em uma hipótese sustentada por dados e por acompanhamento, e não quando aplicados como atalho descritivo.",
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
        explanation: "Langue é a língua enquanto sistema: o acervo de regras, formas e convenções que uma comunidade reconhece como legítimo e que permite que qualquer falante seja compreendido. Ela existe como potencial coletivo e não pode ser observada diretamente — só se manifesta nos usos. Parole é o ato singular pelo qual um sujeito, em uma situação determinada, mobiliza esse sistema: escolhe palavras, combina tempos, hesita, interrompe, insiste, gagueja, escreve ou cala. A distinção importa porque separa o que é partilhado do que é singular, e porque mostra que a fala nunca é cópia do sistema: sempre o atravessa e o desloca. Para a interpretação de textos e para a escuta clínica, a consequência é metodológica — descrever a langue ajuda a dizer o que era esperado naquele enunciado, enquanto descrever a parole ajuda a dizer o que de fato aconteceu naquele caso. Um registro clínico que só aponta a norma ('a paciente negou sintomas') perde a fala concreta; um registro que só relata a fala, sem situá-la no sistema, perde o critério de comparação.",
        examples: [
          "Langue: as regras e convenções que permitem formar frases em português e ser compreendido por quem escuta.",
          "Parole: a forma singular como uma paciente diz 'eu estou bem' após uma pausa longa e com voz baixa.",
          "Langue: o uso do pretérito perfeito para indicar ação concluída. Parole: o paciente relatar a perda no passado usando o pretérito imperfeito ('eu estava chegando') e deixar a ação em aberto.",
          "Efeito clínico: a mesma frase 'estou bem' pode funcionar no sistema como afirmação neutra e, na parole concreta, como encerramento da conversa.",
          "Leitura de enunciado: quando a prova destaca uma irregularidade, pergunte se ela viola a langue ou é uma escolha de parole — a resposta muda a interpretação.",
        ],
      },
      {
        title: "Lente interna",
        explanation: "Não enxergamos o texto como se ele fosse um objeto transparente: toda leitura acontece por meio de uma 'lente interna' formada por experiências prévias, afetos, medos, expectativas, profissão, formação e repertório cultural. Essa lente não é um defeito a eliminar — é a condição que torna a leitura possível, porque só compreendemos o que temos alguma base para compreender. O problema surge quando a lente é tomada pelo objeto: quando a impressão pessoal ('ele foi frio', 'isso é óbvio') é registrada como se fosse propriedade do texto. O método corretivo é sempre o mesmo: separar três camadas — dado observável (o que está literalmente no enunciado), inferência (o que se deduz a partir dele) e valoração (o juízo que se faz sobre isso) — e exigir, para cada camada, o tipo de sustentação correspondente. O dado é conferido no texto; a inferência é testada contra outras leituras possíveis; a valoração precisa de um critério declarado. Na prática de estudo, isso significa que a primeira leitura útil é a hipótese, e a leitura responsável é a revisão da hipótese contra as pistas.",
        examples: [
          "Impressão: 'ele foi frio'. Dado observável: 'ele respondeu com frases curtas e sem contato visual frequente'.",
          "A primeira leitura pode ser útil como hipótese, mas precisa ser conferida no enunciado, no contexto e na sequência da fala.",
          "Três camadas numa frase: dado ('pausou dez segundos') → inferência ('evitou o tema') → valoração ('fou desonesto'). Só a primeira é verificável no texto.",
          "Erro de prova: atribuir a intenção do autor a partir de uma palavra isolada, sem considerar o parágrafo e o gênero textual.",
          "Bom hábito de estudo: antes de responder, sublinhar a pista que autoriza a conclusão; se não houver sublinhado, não há base.",
        ],
      },
      {
        title: "Condições de produção",
        explanation: "Nenhum enunciado surge no vácuo: todo texto é produzido por alguém, em um lugar social, para um destinatário determinado, com uma finalidade específica, em um momento histórico e dentro de uma instituição que autoriza certos modos de dizer. Essas condições de produção não são pano de fundo — elas entram na composição do sentido e, por isso mesmo, precisam ser consideradas na interpretação. Mudar qualquer um dos elementos altera o efeito da mesma frase: a mesma formulação dita por professor, terapeuta, familiar ou chefe produz relações de poder diferentes; a mesma pergunta respondida em uma entrevista de seleção e em um atendimento clínico tem pesos diferentes. Para a escuta psicológica, há ainda uma dimensão de efeitos: o interlocutor também age sobre o enunciado, e a pessoa que fala antecipa o julgamento do outro, o que pode gerar eufemismo, omissão ou reformulação. Conclui-se que interpretar é sempre situar: antes de dizer o que a frase 'quer dizer', pergunte quem falou, para quem, onde, quando e com qual finalidade.",
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
        explanation: "A Análise do Discurso investiga como os sentidos são produzidos nas relações sociais, e não como eles residem dentro da cabeça de um falante. Seu ponto de partida é uma inversão: em vez de tratar a fala como transparência da intenção individual, ela pergunta que condições históricas, materiais e institucionais tornaram aquele sentido possível, aceitável e circulante. Para isso, a AD articula três referentes clássicos — a linguística, que descreve o funcionamento da língua; a materialidade histórica, que descreve as formações sociais em que o texto aparece; e a teoria da subjetividade, que descreve como um sujeito se posiciona dentro dessas formações. O objeto de análise deixa de ser o texto isolado e passa a ser o acontecimento discursivo: o momento em que uma palavra é dita, por alguém, em condições determinadas, produzindo efeitos sobre quem escuta. Isso tem consequências para a leitura de enunciados clínicos: a pergunta deixa de ser apenas 'o que o paciente quis dizer?' e passa a incluir 'em que contexto isso pôde ser dito assim, e não de outro modo?'.",
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
        explanation: "Formação discursiva é o conjunto de regras, em geral invisíveis, que determina o que pode e o que deve ser dito em determinado contexto histórico-institucional. Não se trata de proibições escritas, mas de uma espécie de regime de sentido: dentro de uma formação, certas combinações de palavras soam naturais e legitimadas, enquanto outras soam descabidas, excessivas ou inaudíveis. O conceito é central porque explica por que o sofrimento aparece sempre mediatizado por um vocabulário disponível — a pessoa fala com as palavras que o meio lhe oferece. Daí a distinção entre formação discursiva (o regime de sentido vigente), formação ideológica (o conjunto de posições antagonistas que disputam esse sentido) e formação social (as relações concretas de poder em que a disputa ocorre). Para a escuta clínica, a utilidade é imediata: quando um paciente diz 'estou só cansado', é preciso considerar que 'cansaço' pode ser o único nome socialmente aceito para um sofrimento que não tem outra denominação autorizada naquele meio.",
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
        explanation: "A contribuição de Marx à leitura do discurso vem da ideia de que as representações não são independentes das condições materiais de existência: as formas como as pessoas se narram, se avaliam e explicam seus fracassos são atravessadas pelas relações sociais em que estão inseridas. Em termos de análise, isso significa que o sujeito nunca fala a partir de um lugar neutro — fala a partir de uma posição social determinada, e o discurso circula por instituições (família, escola, empresa, mídia, Estado) que selecionam e difundem certas explicações sobre o mundo. O efeito mais importante é a naturalização: quando uma explicação historicamente construída passa a parecer simplesmente 'o jeito das coisas', ela deixa de ser discutida e passa a ser cumprida. Assim, um fracasso individual pode ser lido como prova de deficiência pessoal, apagando as condições que o produziram. Para a escuta, a pergunta diagnóstica é: quais relações sociais estão sendo apagadas quando tudo se resolve como responsabilidade da própria pessoa?",
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
        explanation: "Freud desloca a ideia de que a fala é um instrumento inteiramente controlado pelo falante. Se a enunciação fosse plenamente racional, lapsos, gafes, esquecimentos, contradições, mudanças de tema, silêncios prolongados e escolhas inusitadas de palavras seriam apenas ruído estatístico; a psicanálise os trata como formações do inconsciente, isto é, como produções que têm uma lógica própria, ainda que não seja a lógica declarada do enunciado. A consequência hermenêutica é dupla e deve ser mantida em equilíbrio. De um lado, amplia-se o campo de escuta: o que não foi dito, o que foi dito de outra forma e o que se repetiu inesperadamente passam a ter valor. De outro, mantém-se a prudência: uma pista não é uma prova, e a interpretação só se torna responsável quando acompanha recorrência, contexto, reação do falante e efeitos práticos do que foi dizer. Por isso, o lugar correto de um lapso no registro clínico é a observação com data e contexto — nunca a conclusão diagnóstica.",
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
        explanation: "Pêcheux introduz a noção de que a fala nunca parte do zero: todo discurso é atravessado por outros discursos que já circulavam antes dele — o que ele chama de interdiscurso e memória discursiva. A memória discursiva não é a lembrança pessoal do falante, mas o acervo de formulações, esquemas e lugares-comuns que uma sociedade mantém disponíveis e que reaparecem mesmo quando ninguém os cita explicitamente. Isso explica a frequência com que frases prontas emergem na fala individual como se fossem pensamento próprio: 'homem não chora', 'mãe boa aguenta tudo', 'cada um tem o que merece'. O sujeito, portanto, fala com palavras que escolheu, mas também com discursos que recebeu, repetiu e interiorizou ao longo da vida. Para a interpretação, a consequência é decisiva: quando uma formulação soa familiar e genérica, é provável que estejamos diante de uma voz social e não de uma posição singular — e cabe à escuta verificar se o sujeito assume aquela voz, a contradiz ou tenta negociá-la.",
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
          "Argumento é a razão que sustenta a tese: o passo de raciocínio que mostra por que a posição defendida faz sentido. Ele não é opinião solta nem exemplo decorado; é uma proposição verificável, conectada à tese por uma relação lógica explícita (causa, consequência, condição, comparação, contraste, analogia, autoridade). A prova de que um argumento é pertinente é simples: ao retirá-lo, a tese fica mais fraca. Se nada muda, aquilo era ornamento. Existem formatos argumentativos recorrentes que valem ser treinados: argumento causal (mostra o mecanismo pelo qual X produz Y), argumento de autoridade (apela a quem tem competência no assunto, desde que a fonte seja citada e o uso seja pertinente), argumento por exemplo (tira uma regra de um caso concreto), argumento por analogia (transfere uma lógica de um campo para outro, desde que as semelhanças sejam relevantes), argumento estadístico (usa dados quantitativos, com fonte e período) e argumento concessivo (reconhece uma objeção e mostra seu limite). O erro mais comum é confundir argumento com prova: em redação de vestibular, o exemplo ilustra e convence, mas só produz argumento quando o texto explica a ligação entre o caso e a tese. Exemplo integrado: ao escrever 'resistente', sem descrever o comportamento observado, o profissional transforma uma hipótese em característica do sujeito — e é essa passagem indevida que sustenta a defesa de que a precisão vocabular protege o paciente.",
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
          "Tópico frasal é a frase que abre o parágrafo e anuncia a ideia principal que será desenvolvida nele. Ele funciona como uma promessa feita ao leitor: tudo o que vier depois precisa explicar, justificar, exemplificar ou delimitar aquela ideia — e nada do que vier depois pode depender de informação que ainda não foi dada. Um tópico frasal eficaz costuma ser específico o bastante para não poder valer para qualquer parágrafo do texto; a frase 'a linguagem é importante' serviria para qualquer tema, e por isso é um tópico frasal vazio. Um bom teste é cobrir os demais parágrafos e ler apenas as primeiras frases de cada um: elas, sozinhas, devem formar um resumo coerente da argumentação. Há variações legítimas conforme a função do parágrafo: parágrafo de tese retoma a posição; parágrafo de argumento enuncia a razão; parágrafo de exemplo introduz o caso ('Um caso ilustra esse raciocínio...'); parágrafo de objeção abre a contra-argumentação ('Há, contudo, uma objeção a considerar...'). Em textos mais longos, é possível usar também um parágrafo-ponte, que retoma o fim do anterior e prepara o próximo, evitando a sensação de lista de tópicos desconectados.",
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
          "Progressão é a organização do texto em ordem de pensamento: cada parágrafo deve acrescentar algo que o anterior não disse e preparar o terreno para o seguinte. O oposto não é o desacordo, é a repetição — repetir a tese com sinônimos em três parágrafos produz um texto que parece argumentativo sem argumentar. Avançar significa mudar de operação lógica ao longo do texto: apresentar o problema, explicar o mecanismo, mostrar a consequência, reconhecer a limitação ou objeção e encaminhar a conclusão ou a intervenção. Existem dois movimentos clássicos que organizam essa ordem: a progressão por encadeamento causal (do problema à causa, da causa ao efeito, do efeito ao remédio) e a progressão por tensão (tese, objeção, resposta à objeção — a chamada estrutura dialógica). A coesão sustenta a progressão: conectivos lógicos (portanto, contudo, sobretudo, ainda assim, em contrapartida) e retomadas nominais deixam visível a relação entre as ideias, mas não substituem o conteúdo — um parágrafo todo construído com 'além disso' não avança se não trouxer raciocínio novo. Sinal de alerta: se você consegue trocar a ordem dos parágrafos sem que o texto perca sentido, a progressão não existe. A prova final é a leitura das frases iniciais isoladamente: elas precisam contar uma história coerente.",
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
          "Coesão é o conjunto de recursos que ligam as partes do texto entre si: referentes e retomadas (artigos, pronomes, sinônimos, expressões nominalizantes), conectivos lógicos e temporais, e a manutenção de um mesmo eixo temático. Ela é o que faz o texto ser lido como uma unidade, e não como uma lista de frases corretas. A coesão tem dois níveis que costumam ser confundidos: a coesão intrafrasal, que organiza o interior da frase (por exemplo, evitar ambiguidade de pronome), e a coesão entre frases e parágrafos, que garante que uma ideia retome a anterior. Entre parágrafos, a ligação deve ser feita de dois lados ao mesmo tempo: por um elemento retomado, que reaparece em forma variantada (não literalmente igual), e por um elemento novo, que efetivamente acrescenta. Essa é a chamada regra da progressão informativa: um parágrafo que só retoma não avança; um parágrafo que só avança sem retomar quebra a unidade. Em textos dissertativos longos, também é papel da coesão marcar a hierarquia das ideias — distinguir o que é tese, o que é argumento e o que é exemplo —, e não apenas encadear frases. Cuidado com o excesso: o encadeamento 'primeiro, depois, portanto, ainda assim' repetido mecanicamente produz um texto com aparência lógica e conteúdo parado.",
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
          "Repertório é o material externo que o autor traz para sustentar ou ilustrar a tese: fatos, dados, leis, conceitos teóricos, obras, casos históricos e experiências de observação. Ele só tem função argumentativa quando é pertinente e quando o texto explica a ponte entre a referência e a tese — trazer um nome célebre sem essa explicação produz o que se chama 'decorativo', e é um dos erros mais penalizados em correção. A pertinência se testa por três perguntas: a referência trata do mesmo eixo temático do texto? Eu consigo explicar, em uma frase, o que ela comprova aqui? Ela acrescenta algo que o meu próprio raciocínio não teria produzido sozinho? Dependendo da prova, o repertório pode ser mobilizado de formas diferentes: em ENEM, a socioculturalidade é avaliada; em provas de Psicologia, é esperado repertório técnico (autores, classificações, dispositivos de saúde). O repertório também pode ser interno — um exemplo construído pelo próprio autor, um dado hipotético bem descrito — desde que seja verossímil e comentado. Evite generalizações do tipo 'estudos mostram' sem fonte e 'a sociedade moderna exige' sem definição: elas enfraquecem a credibilidade justamente quando o texto quer parecer rigoroso.",
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
        explanation: "Precisão clínica é a capacidade de escrever de modo claro, observável e responsável — isto é, de modo que outra pessoa, lendo o mesmo documento em outro momento, consiga distinguir o que foi visto do que foi deduzido. Em prontuários, relatórios e laudos, uma palavra vaga não é apenas feiura de estilo: ela produz efeito prático, porque transforma hipótese em conclusão, impressão em fato ou julgamento em característica do sujeito, e esses registros circulam entre profissionais, instituições e, às vezes, instâncias judiciais. O critério operacional é separar quatro camadas que a escrita apressada costuma fundir: dado observado (o que pode ser visto ou medido), fala relatada (o que a pessoa disse, com fidelidade), hipótese interpretativa (a leitura possível, marcada como tal) e análise sustentada (a conclusão apoiada em conjunto de dados e referência teórica). A revisão deve ainda verificar três propriedades do texto: se é verificável (outro leitor pode conferir), se é datado (indica período e frequência) e se é não patologizante (descreve comportamento em vez de rotular pessoa).",
        examples: [
          "Vago: 'O paciente estava muito mal.' Melhor: 'O paciente relatou insônia em três noites da última semana e chorou durante parte da entrevista.'",
          "Inferência indevida: 'O silêncio comprovou resistência.' Melhor: 'Houve silêncio por cerca de dez segundos antes da resposta; o sentido clínico do episódio será investigado.'",
          "Julgamento: 'A mãe é negligente.' Melhor: 'A mãe não compareceu às duas entrevistas agendadas e não respondeu ao contato telefônico até esta data.'",
        ],
      },
      {
        title: "Por que, porque, por quê e o porquê",
        explanation: "Os quatro porquês têm funções diferentes. 'Por que' separado e sem acento é usado em perguntas diretas e indiretas (sentido de 'por qual motivo') e também como pronome relativo, substituível por 'por qual' ou 'pelo qual'. 'Porque' junto e sem acento é conjunção de causa ou explicação: introduz resposta e pode ser substituído por 'pois' ou 'uma vez que'. 'Por quê' separado e com acento circunflexo aparece sempre no fim da frase, antes de ponto de interrogação, exclamação ou ponto final. 'Porquê' junto e com acento é substantivo: significa 'motivo' ou 'razão' e costuma vir precedido de artigo, pronome, adjetivo ou numeral.",
        examples: [
          "Por que (pergunta direta): 'Por que o participante interrompeu a entrevista?'",
          "Por que (pergunta indireta): 'A equipe investigou por que a entrevista foi interrompida.' Não se acentua porque a pergunta está no meio da frase.",
          "Por que (pronome relativo): 'A razão por que o relato mudou de tom não está clara.' Substitui-se por 'pela qual': 'A razão pela qual o relato mudou...'",
          "Porque (causa): 'A entrevista foi interrompida porque o participante precisou sair.' Pode virar 'pois o participante precisou sair'.",
          "Por quê (fim da frase): 'O participante saiu por quê?' Também antes de ponto final ou exclamação: 'Não sei por quê.' e 'Ele desistiu, por quê!'",
          "O porquê (substantivo): 'A equipe investigou o porquê da interrupção.' Equivale a 'o motivo' e por isso pede determinante: 'o porquê', 'seu porquê', 'este porquê'.",
          "Atenção clínica: 'Por que o paciente silenciou?' é pergunta investigativa. 'O paciente silenciou porque estava resistente' só deve ser escrito se houver sustentação clínica para essa causa.",
        ],
      },
      {
        title: "Mas, mais e houve",
        explanation: "'Mas' é conjunção adversativa: articula duas ideias marcando contraste, oposição ou quebra de expectativa, e por isso exige que os termos confrontados tenham relação real entre si — um 'mas' que liga frases sem tensão é dispensável. 'Mais' é palavra de acréscimo: indica quantidade, intensidade ou grão comparativo ('mais episódios', 'mais grave', 'mais uma vez'), e jamais deve ser escrito com o sentido adversativo. Já 'houve', quando provém do verbo haver com sentido de existir, ocorrer ou acontecer, é impessoal: não tem sujeito e permanece no singular, independentemente do número do complemento, do mesmo modo como acontece com 'fazer' nesse mesmo uso ('havia muitos casos', 'faz dois anos'). A exceção importante é que, quando haver indica posse ou obrigação, ele é plenamente conjugado e concorda com o sujeito — 'haviam pendências na fila' é correto nesse sentido. A ordem da decisão é sempre a mesma: primeiro descubra o que o verbo significa na frase, depois escolha o número.",
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
        explanation: "'Onde' indica localização: lugar fixo, espaço ou situação em que algo se encontra ou ocorre, e pode ser usado no sentido literal ou figurado ('numa situação em que...'). 'Aonde' resulta da junção da preposição 'a' com 'onde' e marca movimento, direção ou destino, isto é, algo que se desloca até um ponto. A escolha depende do verbo que governa a oração: verbos de existência e permanência (ocorrer, estar, permanecer, acontecer, situar-se) pedem 'onde'; verbos de movimento e direção (ir, levar, chegar, dirigir-se, aproximar-se, caminhar) pedem 'aonde'. O teste de substituição resolve os casos difíceis: se a frase puder ser respondida por 'em algum lugar', use 'onde'; se puder ser respondida por 'para algum lugar', use 'aonde'. Mesmo em sentido figurado, 'aonde' continua valendo, porque a ideia de direção permanece — 'aonde essa argumentação nos leva?'",
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
        explanation: "Pronomes organizam a retomada das ideias, evitam repetição e dão coesão ao texto — mas, mal posicionados, criam ambiguidade, um dos defeitos mais penalizados em escrita técnica. A partícula 'esse/essa/isso' costuma retomar algo já mencionado ou algo próximo de quem escuta; 'este/esta/isto' aponta para algo que será apresentado, para o tempo presente ou para algo próximo de quem fala ou escreve; 'aquele/aquilo' afasta, marcando algo dito antes ou distante. Além da distância, o que decide a escolha é a direção da referência: 'esse' olha para trás e retoma, 'este' olha para frente e anuncia. Nos textos técnicos, evite ainda 'o mesmo/a mesma' como substituto de pessoa: a prática burocrática deixa a frase artificial e, com dois antecedentes possíveis, provoca dupla leitura. O remédio estrutural é simples — quando houver mais de um antecedente, repita o substantivo em vez de usar o pronome, mesmo que isso custe uma repetição. Em registro clínico, clareza vale mais do que economia de palavras.",
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
      { question: "Como decidir entre por que, porque, por quê e porquê?", answer: "Pergunta no início/meio: 'por que'. Causa ou resposta: 'porque'. No fim da frase, antes da pontuação: 'por quê'. Substantivo, com sentido de motivo: 'o porquê'." },
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
          Aulas autorais, com método próprio de estudo.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-rose-50/80 text-justify">
          {subjectDescription} Cada tema foi reescrito como aula própria, com conceitos aprofundados, exemplos comentados, aplicação clínica e treino guiado. Os slides ficam no fim apenas como referência visual.
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
            <p className="mt-3 max-w-3xl leading-7 text-slate-600 text-justify">{unit.videoDescription}</p>
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <section>
              <div className="rounded-[28px] bg-[#2a0d0d] p-6 text-white sm:p-8">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-rose-200">Aula {activeIndex + 1} · feita por tema</span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">O que você vai aprender</h3>
                <p className="mt-3 max-w-3xl leading-8 text-rose-50/85 text-justify">{lesson.goal}</p>
              </div>
              <div className="mt-5 grid gap-4">
                {lesson.concepts.map((concept, index) => (
                  <div className="grid gap-4 rounded-[24px] border border-red-100 bg-white p-5 shadow-sm md:grid-cols-[88px_1fr]" key={concept.title}>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#aa0000] text-2xl font-black text-white">{String(index + 1).padStart(2, "0")}</div>
                    <div>
                    <h4 className="text-lg font-semibold text-slate-900">{concept.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600 text-justify">{concept.explanation}</p>
                    {concept.examples?.length ? (
                      <div className="mt-4 rounded-2xl bg-red-50 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-[#aa0000]">Exemplos</p>
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 text-justify">
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
                    <p className="mt-2 leading-7 text-slate-700 text-justify">{section.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-red-100 bg-white p-5">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-[#aa0000]">Vamos resolver juntos</span>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">{lesson.worked.title}</h3>
              <p className="mt-3 rounded-xl bg-red-50 p-4 text-sm font-semibold leading-6 text-slate-700 text-justify">{lesson.worked.source}</p>
              <p className="mt-3 leading-7 text-slate-700 text-justify">{lesson.worked.analysis}</p>
              <p className="mt-3 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700 text-justify"><strong>Erro comum:</strong> {activity.trap}</p>
            </section>

            <section className="rounded-2xl border border-red-100 bg-[#fffafa] p-5">
              <h3 className="text-xl font-semibold text-slate-950">Confira se fixou</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Responda mentalmente antes de abrir cada item.</p>
              <div className="mt-4 grid gap-3">
                {lesson.recall.map((item, index) => (
                  <details className="rounded-xl border border-red-100 bg-white p-4" key={item.question}>
                    <summary className="cursor-pointer font-semibold text-slate-900">{index + 1}. {item.question}</summary>
                    <p className="mt-2 text-sm leading-6 text-slate-600 text-justify">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-red-100 bg-[#fffafa] p-5">
              <h3 className="text-xl font-semibold text-slate-950">Aplique em dois minutos</h3>
              <p className="mt-2 leading-7 text-slate-600 text-justify">{activity.prompt}</p>
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
              {showModel ? <p className="mt-3 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700 text-justify"><strong>Uma resposta possível:</strong> {activity.model}</p> : null}
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
                <p className="mt-5 text-lg font-semibold leading-8 text-slate-900 text-justify">{question.prompt}</p>
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
                    <p className="mt-1 text-sm leading-6 text-justify">{question.explanation}</p>
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
              <p className="mt-2 text-sm leading-6 text-slate-600 text-justify">Use estas imagens apenas para reconhecer o material original. A aula acima já reescreve e organiza os conceitos.</p>
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
