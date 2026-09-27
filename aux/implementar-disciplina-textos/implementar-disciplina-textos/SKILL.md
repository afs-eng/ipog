---
name: implementar-disciplina-textos
description: Implementar ou atualizar a disciplina Produção e Interpretação de Textos em um sistema de estudos ou quiz existente, usando o banco revisado de questões e os módulos de revisão. Use quando a pessoa pedir para preencher a disciplina vazia no IPOG Quiz, integrar perguntas e gabaritos, adaptar o conteúdo ao schema real ou corrigir o fluxo de estudo dessa disciplina.
---

# Implementar disciplina de textos

Usar `assets/questoes.json` como conteúdo inicial. Ele contém quatro módulos e 36 questões autorais com quatro alternativas, índice da resposta correta baseado em zero e explicação. As duas apresentações de Análise do Discurso fornecidas eram idênticas; o banco elimina essa duplicação e também repetições de fotos e slides.

## Procedimento

1. Localizar o projeto que serve a página `/disciplinas/producao-interpretacao-textos`. Confirmar o repositório, o framework, as rotas, o modelo de disciplina/questão, a fonte de dados e o mecanismo de deploy. O endereço público de referência é `https://ipog-nu.vercel.app/disciplinas/producao-interpretacao-textos`. Não presumir que o HTML público dá acesso ao código ou à edição.
2. Inspecionar a disciplina que já possui questões, especialmente Desenvolvimento dos Anos Iniciais e Escolares. Seguir seus componentes, estilos, estado, progresso, pontuação, navegação e acessibilidade. Preservar as outras disciplinas.
3. Mapear `assets/questoes.json` ao schema real por um adaptador pequeno ou migração idempotente. Preservar IDs estáveis `pit-001` a `pit-036`. Não inserir registros duplicados em reexecuções. Se o sistema armazena alternativas por letras, converter o índice `correta` para A–D na importação, sem mudar a resposta.
4. Exibir na disciplina os quatro módulos em ordem: Linguagem e interpretação; Discurso, sociedade e inconsciente; Texto dissertativo-argumentativo; Revisão linguística e escrita clínica. Apresentar resumo de cada módulo e acesso ao treino correspondente. Manter uma opção de treino completo com as 36 questões se o padrão do site suportar isso.
5. Em cada questão, mostrar enunciado e quatro opções; receber uma resposta; indicar acerto/erro; revelar resposta correta e explicação após a escolha. Permitir próxima questão e revisão do resultado conforme o comportamento existente. Evitar revelar o gabarito antes da tentativa.
6. Integrar contagem de questões, percentual de acerto e progresso à mesma lógica das disciplinas existentes. Respeitar o escopo de progresso por usuário ou navegador já adotado. Não zerar progresso de outras disciplinas nem criar autenticação nova sem necessidade.
7. Revisar a redação e a chave de cada questão no componente final. Verificar diacríticos, aspas, porquês e opções que possam gerar duas respostas corretas. O conteúdo é material de estudo, não instrumento diagnóstico.
8. Executar as verificações de build e testes existentes. Acrescentar apenas testes úteis para importação idempotente, chave das respostas e fluxo de pontuação. Verificar no navegador que a página não mostra mais “0 questões”, que os 36 itens são acessíveis e que uma resposta correta e uma incorreta produzem retorno coerente.
9. Entregar o link de preview ou produção efetivamente verificado, conforme a autorização de publicação no projeto. Se faltar acesso ao repositório ou painel de edição, manter o pacote pronto e solicitar somente o acesso necessário, sem afirmar que o site foi atualizado.

## Contrato do conteúdo

- `disciplina`, `slug`, `descricao`: metadados.
- `modulos[]`: `{id, titulo, resumo}`.
- `questoes[]`: `{id, modulo, enunciado, alternativas, correta, explicacao}`.
- `correta`: inteiro de 0 a 3; `modulo` deve corresponder a um `modulos[].id`.
- Os textos e exemplos são adaptáveis ao design; preservar o sentido, a resposta e a explicação ao convertê-los.

Não copiar os arquivos HTML de aula completos para a aplicação. Eles contêm numerosas duplicatas, modelos vazios e imagens embutidas. Usar o banco curado como conteúdo implementável e consultar as fontes originais somente para dirimir uma dúvida editorial.
