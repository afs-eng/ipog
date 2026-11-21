"""Publish the supplied animated lesson without modifying the original file.

First place the three source WAVs in the cache directory, then run:
python scripts/prepare-psychology-model.py --cache /tmp/opencode
Requires imageio-ffmpeg in the Python environment (only during preparation).
"""

import argparse
import json
from pathlib import Path
import re
import subprocess

import imageio_ffmpeg

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument("--cache", type=Path, required=True)
args = parser.parse_args()
source = root / "disciplinas/Introdução-psicologia-história-fundamentos/Videoaula_Psicologia/Aula_Completa_Psicologia_Professora_Corpo_Inteiro_FINAL.html"
destination = root / "public/psicologia/modelo-videoaula"
destination.mkdir(parents=True, exist_ok=True)
html = source.read_text()
urls = list(dict.fromkeys(re.findall(r'https://resource2[^"\s<>]+', html)))
assert len(urls) == 3
for index, url in enumerate(urls, 1):
    audio = destination / f"parte-{index}.mp3"
    subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", "-i", str(args.cache / f"psychology-model-part-{index}.wav"), "-codec:a", "libmp3lame", "-b:a", "128k", str(audio)], check=True)
    html = html.replace(url, f"./parte-{index}.mp3")
html = html.replace("e perguntas para praticar. Aula completa baseada nos dois PDFs enviados.", "e revisão dos conceitos. Conteúdo baseado nos dois PDFs da disciplina; consulte também os materiais originais para os detalhes de cada slide.")
html = html.replace("Os áudios são transmitidos do HeyGen: é necessária uma conexão à internet para ouvi-los, a menos que você selecione os três arquivos WAV baixados.", "Os três trechos de áudio são servidos pelo próprio site, sem depender de links externos do HeyGen. A voz é sintética, não é a voz da professora da disciplina.")
html = html.replace("Conteúdo conforme roteiro aprovado,", "Roteiro do modelo fornecido,")
html = html.replace("arquivos WAV", "arquivos de áudio")
html = html.replace('accept="audio/*,.wav"', 'accept="audio/*,.wav,.mp3"')
html = html.replace('<button id="subs">', '<button id="subs" aria-pressed="true">')
html = html.replace("subtitlesEnabled=!subtitlesEnabled;", "subtitlesEnabled=!subtitlesEnabled;$('subs').setAttribute('aria-pressed',String(subtitlesEnabled));")
# Do not capture screen-reader/keyboard activation on chapter buttons.
html = html.replace("['INPUT','SELECT','TEXTAREA']", "['INPUT','SELECT','TEXTAREA','BUTTON','A','SUMMARY']")
html = html.replace("function showAudioError(){", "function showAudioError(){isPlaying=false;updatePlayButton();")
html = html.replace("if(el)seek(+el.dataset.at)", "if(el){seek(+el.dataset.at);updateMedia();}")
html = html.replace("$('nowTitle').textContent=currentChapter().title;", "$('nowTitle').textContent=currentChapter().title;for(const button of document.querySelectorAll('#chapters button')){if(+button.dataset.at===currentChapter().start)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');}")
html = html.replace("</style>", "button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid #f5c371;outline-offset:4px}.chapters button[aria-current=step]{background:#35647a;outline:1px solid #f5c371}.transcript{margin-top:24px}.transcript summary{cursor:pointer;font-weight:bold}.transcript p{line-height:1.7;color:#d2dce6}</style>")
chapters = json.JSONDecoder().raw_decode(html.split("const CHAPTER_DATA=")[1])[0]
from html import escape
transcript = '<details class="box transcript"><summary>Texto da narração e referências</summary><p>Profa. Andressa Teodoro Rosa. História da Psicologia no Brasil (Antunes, 2012; Pereira et al., 2022) e Áreas de atuação da Psicologia (CFP, 2022).</p>'
for chapter in chapters:
    transcript += f'<article><h2>{chapter["num"]}. {escape(chapter["title"])}</h2><p>{escape(chapter["speech"])}</p></article>'
transcript += '</details>'
html = html.replace('</main>', transcript + '</main>')
(destination / "index.html").write_text(html)
print(f"Published supplied model: {len(chapters)} chapters, local audio, transcript.")
