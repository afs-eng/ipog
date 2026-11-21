# Vídeos de Introdução à Psicologia

Os arquivos em `public/psicologia/videoaula-n2/` são vídeos MP4 reais,
com ilustrações animadas em 960 × 540, H.264 e áudio AAC. O player não
precisa de serviço de voz ou de bibliotecas de animação em produção.
Cada capítulo tem pôster JPEG e legendas WebVTT com marcações da narração.

## Regenerar

O roteiro fica em `src/lib/psychology-n2.ts`. O renderizador consome apenas
`psychologyChapters`, sem enviar exercícios ou dados de estudantes.

Requisitos de produção (não são dependências do app):

- Python 3.12 ou superior;
- `edge-tts==7.3.1`, `Pillow==13.0.0`, `imageio-ffmpeg==0.8.1`;
- Node com suporte a `--experimental-strip-types`;
- fontes DejaVu Sans em `/usr/share/fonts/truetype/dejavu`, ou diretório
  equivalente indicado por `VIDEO_FONT_DIR`;
- conexão para gerar a voz sintética `pt-BR-FranciscaNeural`.

Exemplo usando ferramentas isoladas fora do projeto:

```bash
uv venv --python 3.12 /tmp/opencode/psychology-video-render
uv pip install --python /tmp/opencode/psychology-video-render/bin/python edge-tts==7.3.1 Pillow==13.0.0 imageio-ffmpeg==0.8.1
/tmp/opencode/psychology-video-render/bin/python scripts/render-psychology-video.py --cache /tmp/opencode/psychology-render
```

O renderizador escreve os arquivos de mídia e
`src/lib/psychology-video-manifest.json`, que contém durações e início das
três cenas de cada capítulo. Não altere o roteiro sem regenerar os vídeos.
Os arquivos intermediários e o áudio por cena ficam somente no cache externo.
O serviço de síntese é uma ferramenta de geração, não um serviço garantido
para o aplicativo; os MP4s já produzidos continuam funcionando sem ele.

Os dados anteriores do estudo dirigido foram preservados no módulo de
conteúdo, mas não são importados nem apresentados pelo player. Os rascunhos
antigos no navegador não são apagados.
