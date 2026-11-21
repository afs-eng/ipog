"""Render the Psychology N2 illustrated lessons (offline playback, no runtime TTS).

Tools (outside the application): Python 3.12+, edge-tts, Pillow, imageio-ffmpeg.
Run from the repository root:
  python scripts/render-psychology-video.py --cache /tmp/opencode/psychology-render
The narration service receives only the public educational script, not user data.
Audio is cached; rendering is deterministic except for generated speech timings.
"""

import argparse
import asyncio
import hashlib
import json
import math
import os
from pathlib import Path
import re
import subprocess
from concurrent.futures import ProcessPoolExecutor

import edge_tts
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/psicologia/videoaula-n2"
VOICE = "pt-BR-FranciscaNeural"
W, H, FPS = 960, 540, 15
INK, PAPER, TEAL, ORANGE, MUTED = "#18383e", "#f5f0e4", "#347b79", "#dc7148", "#a4bcb0"
FONT_DIR = Path(os.environ.get("VIDEO_FONT_DIR", "/usr/share/fonts/truetype/dejavu"))


def font(size, bold=False):
    return ImageFont.truetype(str(FONT_DIR / ("DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf")), size)


FONTS = {size: font(size) for size in [12, 14, 16, 18, 20, 24, 28, 32, 36, 44]}
BOLD = {size: font(size, True) for size in [14, 16, 18, 20, 24, 28, 32, 36, 44]}


def text(d, xy, value, size=18, fill=INK, bold=False, anchor=None):
    d.text(xy, value, font=(BOLD if bold else FONTS)[size], fill=fill, anchor=anchor)


def wrap(d, value, width, size=18, bold=False):
    result, line = [], ""
    f = (BOLD if bold else FONTS)[size]
    for word in value.split():
        candidate = f"{line} {word}".strip()
        if line and d.textlength(candidate, font=f) > width:
            result.append(line)
            line = word
        else:
            line = candidate
    return result + [line]


def lines(d, xy, value, width, size=18, fill=INK, bold=False, center=False):
    x, y = xy
    for line in wrap(d, value, width, size, bold):
        text(d, (x, y), line, size, fill, bold, "ma" if center else None)
        y += size * 1.4


def ease(t):
    t = max(0, min(1, t))
    return 1 - (1 - t) ** 3


def arrow(d, start, end, color=ORANGE, width=4, progress=1):
    x, y = start
    ex = x + (end[0] - x) * progress
    ey = y + (end[1] - y) * progress
    d.line((x, y, ex, ey), fill=color, width=width)
    a = math.atan2(end[1] - y, end[0] - x)
    d.polygon([(ex, ey), (ex - 12 * math.cos(a - .5), ey - 12 * math.sin(a - .5)), (ex - 12 * math.cos(a + .5), ey - 12 * math.sin(a + .5))], fill=color)


def person(d, x, y, scale=1, color=TEAL, skin="#bf8058", t=0, gesture=False):
    s = scale
    bob = math.sin(t * 2) * 2 * s
    y += bob
    def box(coords): return [x + coords[0] * s, y + coords[1] * s, x + coords[2] * s, y + coords[3] * s]
    d.line(box((-9, 48, -13 + math.sin(t * 2) * 4, 82)), fill=INK, width=max(2, int(8 * s)))
    d.line(box((9, 48, 13 - math.sin(t * 2) * 4, 82)), fill=INK, width=max(2, int(8 * s)))
    d.rounded_rectangle(box((-22, -5, 22, 53)), radius=12 * s, fill=color)
    d.ellipse(box((-17, -43, 17, -9)), fill=skin)
    d.arc(box((-18, -45, 18, -12)), 180, 340, fill=INK, width=max(2, int(7 * s)))
    d.line(box((-20, 8, -35, 32)), fill=color, width=max(2, int(9 * s)))
    arm_y = -22 + math.sin(t * 1.7) * 7 if gesture else 30
    d.line(box((20, 9, 43, arm_y)), fill=color, width=max(2, int(9 * s)))
    d.ellipse(box((38, arm_y - 4, 46, arm_y + 4)), fill=skin)


def building(d, x, y, name, kind="school", scale=1):
    s = scale
    def box(c): return [x + c[0] * s, y + c[1] * s, x + c[2] * s, y + c[3] * s]
    d.rounded_rectangle(box((-90, -85, 90, 55)), radius=5, fill="#dedccc")
    d.polygon([(x - 108*s, y - 85*s), (x, y - 145*s), (x + 108*s, y - 85*s)], fill=TEAL)
    for wx in [-57, 35]:
        d.rectangle(box((wx, -49, wx + 25, -17)), fill="#88b5af")
        d.line(box((wx + 12, -49, wx + 12, -17)), fill=PAPER, width=2)
    d.rectangle(box((-18, -5, 18, 55)), fill=INK)
    if kind == "hospital":
        d.rectangle(box((-5, -124, 5, -96)), fill=PAPER)
        d.rectangle(box((-15, -115, 15, -105)), fill=PAPER)
    elif kind == "church":
        d.line(box((0, -181, 0, -143)), fill=INK, width=4)
        d.line(box((-12, -168, 12, -168)), fill=INK, width=4)
    elif kind == "factory":
        d.rectangle(box((48, -155, 66, -90)), fill=INK)
    text(d, (x, y + 68*s), name, 16, INK, True, "ma")


def book(d, x, y, label, color=TEAL, scale=1):
    s = scale
    d.rounded_rectangle((x-43*s, y-56*s, x+43*s, y+56*s), radius=6, fill=color)
    d.line((x-31*s, y-50*s, x-31*s, y+50*s), fill=PAPER, width=2)
    for dy in [-20, -5, 10]: d.line((x-17*s, y+dy*s, x+27*s, y+dy*s), fill=PAPER, width=2)
    text(d, (x, y+68*s), label, 14, INK, True, "ma")


def speech(d, x, y, message, width=220):
    content = wrap(d, message, width - 28, 16)
    height = len(content) * 24 + 25
    d.rounded_rectangle((x, y, x+width, y+height), radius=12, fill=INK)
    d.polygon([(x+24, y+height-2), (x+45, y+height-2), (x+26, y+height+14)], fill=INK)
    lines(d, (x+14, y+12), message, width-28, 16, PAPER)


def classroom(d, t, beat):
    if beat < 2:
        building(d, 220, 272, "Educação dos colonos" if beat == 0 else "Catequese", "school" if beat == 0 else "church", .78)
        d.rounded_rectangle((395, 137, 787, 252), radius=8, fill=TEAL)
        text(d, (590, 160), "Ratio Studiorum" if beat == 0 else "Conversão e disciplinarização", 20, PAPER, True, "ma")
        text(d, (590, 203), "Estudos na metrópole" if beat == 0 else "Interesses da empresa colonial", 16, PAPER, anchor="ma")
        for i in range(3):
            person(d, 453+i*105, 309, .63, [ORANGE, TEAL, "#b39462"][i], t=t+i)
            d.line((419+i*105, 328, 491+i*105, 328), fill=INK, width=5)
        arrow(d, (305, 224), (389, 192), progress=ease(t/2))
    else:
        for i, (name, message) in enumerate([("Figueiredo", "O medo prejudica a aprendizagem"), ("Nunes", "Capacidade intelectual das mulheres"), ("Vieira", "Denúncia da barbárie contra escravizados")]):
            x = 230+i*240
            person(d, x, 294, .8, [TEAL, ORANGE, "#847b97"][i], t=t+i, gesture=True)
            speech(d, x-105, 125+int(12*(1-ease(t-i*.4))), message, 210)
            text(d, (x, 377), name, 16, anchor="ma", bold=True)


def institutions(d, t, beat, chapter):
    if chapter == 3 and beat == 2:
        person(d, 245, 276, 1.1, ORANGE, t=t, gesture=True)
        book(d, 470, 245, "Teste", TEAL, .8)
        speech(d, 159, 100, "O resultado também expressa as condições de vida", 300)
        for i, label in enumerate(["Vida social", "Aprendizagem", "Condições materiais"]):
            x = 660+i%2*160; y = 170+i*65
            d.ellipse((x-19, y-19, x+19, y+19), fill=MUTED)
            text(d, (x, y+30), label, 14, anchor="ma")
            arrow(d, (515, 245), (x-25, y), progress=ease(t/2))
        return
    names = ["Medicina", "Educação", "Laboratórios"] if chapter == 2 else ["INEP", "ISOP", "Pesquisa e ensino"]
    for i, label in enumerate(names):
        x = 230+i*250
        offset = (1-ease(t/2-i*.3))*65
        building(d, x, 260+offset, label, "hospital" if i == 0 and chapter == 2 else "factory" if i == 1 else "school", .65)
        person(d, x-40, 321, .55, [TEAL, ORANGE, "#8c7fa1"][i], t=t+i)
        if i < 2: arrow(d, (x+80, 230), (x+165, 230), progress=ease(t/2))
    if chapter == 2 and beat == 2: speech(d, 275, 97, "Bomfim e Pernambucano: crítica ao racismo e à exclusão", 430)


def knowledge(d, t, beat, chapter):
    if chapter == 5:
        labels = ["Matriz europeia", "Matrizes africanas", "Saberes indígenas"]
        for i, label in enumerate(labels):
            x = 210+i*260
            offset = 0 if beat == 2 else (0 if i == 0 else 65)
            book(d, x, 205+offset, label, [TEAL, ORANGE, "#88729b"][i], 1.05)
            if beat == 1 and i > 0:
                d.line((x-48, 214, x+48, 310), fill=ORANGE, width=5)
                d.line((x+48, 214, x-48, 310), fill=ORANGE, width=5)
        text(d, (470, 370), ["Uma matriz não representa todos os povos", "Apagamento e deslegitimação de saberes", "Pluralidade e justiça cognitiva"][beat], 20, anchor="ma", bold=True)
        if beat == 2:
            arrow(d, (280, 207), (400, 207), progress=ease(t/2))
            arrow(d, (540, 207), (660, 207), progress=ease(t/2))
    else:
        d.rectangle((139, 266, 825, 277), fill=TEAL)
        for i in range(5):
            x = 205+i*140
            person(d, x, 284, .75, [ORANGE, TEAL, "#8b759c", "#b39b64", "#6c9197"][i], ["#bd805b", "#79513f", "#e2ad88", "#8d5e42", "#c49370"][i], t+i, beat == 2)
            if beat != 0 or i == 2: book(d, x, 155+12*math.sin(t*.7+i), "", [ORANGE, TEAL, "#8b759c"][i%3], .4)
        text(d, (480, 385), ["Presença na profissão ≠ autoridade no currículo", "Acesso não garante reconhecimento", "Diálogo entre diferentes produções e experiências"][beat], 18, anchor="ma", bold=True)


def city(d, t, beat, chapter):
    names = ["Escola", "Hospital", "Empresa"]
    for i, name in enumerate(names):
        building(d, 225+i*255, 255, name, ["school", "hospital", "factory"][i], .58)
    # A professional physically moves between contexts, illustrating transversal work.
    x = 225 + 510 * ((t/14) % 1)
    if chapter == 7: x = 225+beat*255+math.sin(t)*8
    person(d, x, 324, .7, ORANGE, t=t*2, gesture=True)
    arrow(d, (195, 392), (790, 392), progress=ease(t/3))
    message = "Um mesmo processo educativo atravessa instituições" if chapter == 11 else "O local não determina sozinho a natureza da intervenção" if beat == 2 else "Diferentes demandas, conhecimentos e modos de atuar"
    text(d, (480, 101), message, 18, anchor="ma", bold=True)


def processes(d, t, beat, chapter):
    if chapter == 9 and beat < 2:
        building(d, 235, 286, "Local de trabalho", "school", .65)
        person(d, 475, 293, .85, ORANGE, t=t, gesture=True)
        arrow(d, (324, 232), (405, 232), progress=ease(t/2))
        for i, label in enumerate(["Educação", "Promoção de saúde", "Gestão de pessoas"]):
            y = 143+i*84
            d.rounded_rectangle((605, y, 838, y+52), radius=26, fill=[TEAL, ORANGE, "#88729b"][i])
            text(d, (721, y+15), label, 16, PAPER, anchor="ma")
            arrow(d, (525, 259), (595, y+26), progress=ease(t/2-i*.2))
        return
    labels = ["Finalidade", "Objeto", "Meios", "Agentes"]
    examples = ["Melhorar a convivência", "Relações e condições", "Reuniões e conhecimentos", "Equipe responsável"]
    for i, label in enumerate(labels):
        x = 173+i*205
        active = (beat == 0 and i < 2) or (beat == 1 and i >= 2) or beat == 2
        col = ORANGE if active else MUTED
        d.ellipse((x-53, 163, x+53, 269), fill=col)
        text(d, (x, 184), str(i+1), 44, PAPER, True, "ma")
        text(d, (x, 285), label, 18, anchor="ma", bold=True)
        lines(d, (x, 323), examples[i], 170, 14, center=True)
        if i < 3: arrow(d, (x+62, 216), (x+143, 216), progress=ease(t/2-i*.2))


def census(d, t, beat):
    if beat == 0:
        for i, (name, val) in enumerate([("Clínica", 73.1), ("Social", 20.1), ("Saúde", 19.0)]):
            y = 150+i*78
            text(d, (115, y+5), name, 18, bold=True)
            length = val/73.1*475*ease(t/3)
            d.rounded_rectangle((250, y, 250+max(2,length), y+34), radius=6, fill=[ORANGE, TEAL, "#88729b"][i])
            text(d, (265+length, y+4), f"{val:.1f}%".replace(".", ","), 18, bold=True)
        text(d, (480, 394), "CensoPsi 2022 · até três áreas por pessoa · percentuais não exclusivos", 14, anchor="ma")
    elif beat == 1:
        building(d, 285, 268, "SUS · Saúde", "hospital", .85)
        building(d, 680, 268, "SUAS · Assistência social", "school", .85)
        for i in range(5): person(d, 350+i*60, 332, .48, TEAL if i%2 else ORANGE, t=t+i)
        arrow(d, (383, 205), (577, 205), progress=ease(t/2))
        text(d, (480, 110), "Políticas diferentes ampliam a inserção profissional", 20, anchor="ma", bold=True)
    else:
        values = [41, 32, 27]
        for i, val in enumerate(values):
            x = 235+i*250
            d.ellipse((x-75, 160, x+75, 310), fill=[TEAL, ORANGE, "#88729b"][i])
            text(d, (x, 206), f"{int(val*ease(t/2))}%", 36, PAPER, True, "ma")
            text(d, (x, 329), f"{i+1} área" + ("s" if i else ""), 20, anchor="ma", bold=True)
        text(d, (480, 389), "59% combinavam mais de uma área", 20, anchor="ma", bold=True)


def history(d, t, beat, chapter):
    dates = ["Saberes", "Ciência", "Profissão"] if chapter == 0 else ["1962", "Ditadura", "Novas práticas"]
    d.line((145, 304, 815, 304), fill=MUTED, width=5)
    for i, label in enumerate(dates):
        x = 225+i*255
        d.ellipse((x-11, 293, x+11, 315), fill=ORANGE if i <= beat else MUTED)
        text(d, (x, 327), label, 20, anchor="ma", bold=True)
        if i == 0: book(d, x, 207, "", TEAL, .65)
        elif i == 1: building(d, x, 238, "", "school", .38)
        else:
            person(d, x, 210, .7, ORANGE, t=t, gesture=True)
            d.ellipse((x-50, 140, x-22, 168), outline=TEAL, width=3)
        if i < 2: arrow(d, (x+26, 304), (x+228, 304), progress=ease(t/2-i*.3))
    if beat == 1: speech(d, 310, 105, "Mudanças sociais, interesses e contraposições", 360)
    if chapter == 4 and beat == 0: text(d, (480, 390), "Lei 4.119 · 27 de agosto de 1962", 20, anchor="ma", bold=True)


def frame(chapter, ci, bi, t, global_t, duration):
    im = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(im)
    # Subtle film grain/grid remains still; only meaningful foreground elements move.
    for x in range(20, W, 30):
        for y in range(90, 435, 30): d.point((x, y), fill="#e4e1d5")
    text(d, (42, 23), "PSICOLOGIA / HISTÓRIA E POSSIBILIDADES", 12, TEAL)
    text(d, (918, 23), f"{ci+1:02d} / 12", 12, TEAL, anchor="ra")
    label = chapter["beats"][bi]["label"]
    text(d, (42, 51), label, 24, INK, True)
    d.line((42, 88, 918, 88), fill="#cdd5c8", width=1)
    if ci == 1: classroom(d, t, bi)
    elif ci in [2, 3]: institutions(d, t, bi, ci)
    elif ci in [5, 6]: knowledge(d, t, bi, ci)
    elif ci in [7, 11]: city(d, t, bi, ci)
    elif ci == 8: census(d, t, bi)
    elif ci in [9, 10]: processes(d, t, bi, ci)
    else: history(d, t, bi, ci)
    d.rectangle((0, 435, W, H), fill=INK)
    takeaway = chapter["beats"][bi]["takeaway"]
    lines(d, (42, 458), takeaway, 870, 18, PAPER, True)
    d.rectangle((0, 536, W, H), fill="#36565a")
    d.rectangle((0, 536, W*min(1, global_t/duration), H), fill=ORANGE)
    return im


def timestamp(seconds):
    ms = round(seconds * 1000)
    return f"{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d}.{ms%1000:03d}"


def audio_duration(path):
    proc = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-i", str(path), "-f", "null", "-"], capture_output=True, text=True, check=True)
    times = re.findall(r"time=(\d+):(\d+):(\d+\.\d+)", proc.stderr)
    if not times: raise RuntimeError(f"Cannot measure {path}")
    h, m, s = map(float, times[-1])
    return h*3600+m*60+s


async def narrate(chapter, ci, cache, semaphore):
    async with semaphore:
        durations, captions, audio = [], [], []
        for bi, beat in enumerate(chapter["beats"]):
            digest = hashlib.sha256((VOICE+beat["narration"]).encode()).hexdigest()[:14]
            mp3 = cache / f"{digest}.mp3"
            boundary_file = cache / f"{digest}.json"
            if not mp3.exists() or not boundary_file.exists():
                boundaries = []
                for attempt in range(3):
                    try:
                        boundaries = []
                        with mp3.open("wb") as output:
                            async for chunk in edge_tts.Communicate(beat["narration"], VOICE, boundary="SentenceBoundary").stream():
                                if chunk["type"] == "audio": output.write(chunk["data"])
                                elif chunk["type"] == "SentenceBoundary": boundaries.append(chunk)
                        if not mp3.stat().st_size: raise RuntimeError("Empty audio")
                        boundary_file.write_text(json.dumps(boundaries, ensure_ascii=False))
                        break
                    except Exception:
                        if attempt == 2: raise
                        await asyncio.sleep(2*(attempt+1))
            duration = audio_duration(mp3)
            base = sum(durations)
            for boundary in json.loads(boundary_file.read_text()):
                captions.append((base+boundary["offset"]/1e7, base+(boundary["offset"]+boundary["duration"])/1e7, boundary["text"]))
            if not json.loads(boundary_file.read_text()): captions.append((base, base+duration, beat["narration"]))
            durations.append(duration)
            audio.append(str(mp3))
        print(f"Audio ready: {ci+1:02d} ({sum(durations):.1f}s)", flush=True)
        return {"chapter": chapter, "index": ci, "durations": durations, "audio": audio, "captions": captions, "cache": str(cache)}


def render(job):
    chapter, ci, durations = job["chapter"], job["index"], job["durations"]
    total = sum(durations)
    output = OUT / f"{chapter['id']}.mp4"
    fingerprint = hashlib.sha256(json.dumps({"chapter": chapter, "durations": durations, "renderer": Path(__file__).read_text()}, sort_keys=True).encode()).hexdigest()
    cache = Path(job["cache"])
    stamp = cache / f"{chapter['id']}.stamp"
    if not output.exists() or not stamp.exists() or stamp.read_text() != fingerprint:
        audio_list = cache / f"{ci}-concat.txt"
        audio_list.write_text("\n".join(f"file '{p}'" for p in job["audio"]))
        combined = cache / f"{ci}-audio.mp3"
        subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(audio_list), "-c", "copy", str(combined)], check=True)
        command = [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", "-f", "rawvideo", "-vcodec", "rawvideo", "-s", f"{W}x{H}", "-pix_fmt", "rgb24", "-r", str(FPS), "-i", "-", "-i", str(combined), "-c:v", "libx264", "-preset", "fast", "-crf", "27", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", "-shortest", "-threads", "2", str(output)]
        proc = subprocess.Popen(command, stdin=subprocess.PIPE)
        try:
            for n in range(math.ceil(total*FPS)):
                t = n/FPS
                bi = 0 if t < durations[0] else 1 if t < sum(durations[:2]) else 2
                local_t = t-sum(durations[:bi])
                proc.stdin.write(frame(chapter, ci, bi, local_t, t, total).tobytes())
            proc.stdin.close()
            if proc.wait() != 0: raise RuntimeError(f"Encoding failed: {output}")
        except BaseException:
            proc.kill()
            proc.wait()
            raise
        frame(chapter, ci, 0, 4, 4, total).save(OUT / f"{chapter['id']}.jpg", quality=88)
        stamp.write_text(fingerprint)
    cues = ["WEBVTT", ""]
    for start, end, caption in job["captions"]:
        cues.extend([f"{timestamp(start)} --> {timestamp(min(end, total))}", caption.replace("-->", "→"), ""])
    (OUT / f"{chapter['id']}.vtt").write_text("\n".join(cues), encoding="utf-8")
    print(f"Rendered: {chapter['id']} ({output.stat().st_size/1e6:.1f} MB)", flush=True)
    return {"id": chapter["id"], "duration": round(total, 2), "sceneStarts": [0, round(durations[0], 2), round(sum(durations[:2]), 2)], "src": f"/psicologia/videoaula-n2/{chapter['id']}.mp4", "poster": f"/psicologia/videoaula-n2/{chapter['id']}.jpg", "captions": f"/psicologia/videoaula-n2/{chapter['id']}.vtt"}


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--cache", type=Path, required=True)
    args = parser.parse_args()
    args.cache.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    data = subprocess.check_output(["node", "--experimental-strip-types", "--input-type=module", "-e", "import { psychologyChapters } from './src/lib/psychology-n2.ts'; console.log(JSON.stringify(psychologyChapters));"], cwd=ROOT, text=True)
    chapters = json.loads(data)
    semaphore = asyncio.Semaphore(3)
    jobs = await asyncio.gather(*(narrate(chapter, ci, args.cache, semaphore) for ci, chapter in enumerate(chapters)))
    with ProcessPoolExecutor(max_workers=3) as pool:
        manifest = list(pool.map(render, jobs))
    (ROOT / "src/lib/psychology-video-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+"\n")
    print(f"Done: {len(manifest)} chapters, {sum(item['duration'] for item in manifest)/60:.1f} minutes.")


if __name__ == "__main__":
    asyncio.run(main())
