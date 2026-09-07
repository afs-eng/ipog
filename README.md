# IPOG Quiz

Site de estudos e quiz acadêmico feito com Next.js.

## Rodar Localmente

Instale as dependências:

```bash
npm install
```

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Abra `http://localhost:3000` no navegador.

## Validar Antes de Publicar

```bash
npm run lint
npm run build
```

## Deploy Grátis na Vercel

Este projeto está pronto para deploy na Vercel.

1. Crie um repositório no GitHub.
2. Envie este projeto para o repositório.
3. Acesse `https://vercel.com` e entre com sua conta do GitHub.
4. Clique em `Add New Project`.
5. Importe o repositório do `ipog-quiz`.
6. Mantenha as configurações automáticas da Vercel para Next.js.
7. Clique em `Deploy`.

Scripts usados pela Vercel:

```bash
npm install
npm run build
```

Depois do deploy, a Vercel gera um link público parecido com:

```text
https://ipog-quiz.vercel.app
```

## Observação Sobre Admin

A área `/admin` é apenas local por enquanto. Em produção ela fica bloqueada porque ainda não tem login e a Vercel não deve ser usada para salvar arquivos JSON diretamente no disco.

Para usar admin online no futuro, será necessário adicionar autenticação e banco de dados.

## Observação Sobre Vídeos Grandes

O arquivo `public/conteudos/sistema-nervoso-central-introducao-ao-encefalo/video.mp4` fica fora do Git porque passa do limite comum de 100 MB por arquivo no GitHub.

O site continua funcionando sem esse MP4: quando o vídeo não existe, a página mostra a imagem principal da unidade. Para publicar vídeo depois, compacte o MP4 para menos de 100 MB ou hospede o vídeo fora do GitHub/Vercel e ajuste a URL no código.

## Estrutura Principal

- `src/app`: páginas e rotas do site.
- `src/components`: componentes visuais.
- `src/lib`: dados e regras do quiz.
- `public/conteudos`: imagens e vídeos públicos.
- `disciplinas`: materiais e questões locais.

## Comandos Úteis

```bash
npm run dev
npm run lint
npm run build
npm run start
```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
