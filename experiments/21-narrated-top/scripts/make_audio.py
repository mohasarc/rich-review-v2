"""Generate a portable 90-second soundtrack with macOS speech and ffmpeg."""
from pathlib import Path
import json, subprocess

ROOT=Path(__file__).resolve().parents[1]
WORK=ROOT/".render/audio"
WORK.mkdir(parents=True,exist_ok=True)
scenes=json.loads((ROOT/"content.json").read_text())["scenes"]

def run(*args):
    subprocess.run([str(a) for a in args],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
def duration(path):
    return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","default=nw=1:nk=1",str(path)],text=True))
def stamp(t):
    ms=round(t*1000);return f"{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d}.{ms%1000:03d}"

clips=[];cues=[];report=[]
for i,scene in enumerate(scenes):
    inputs=[]
    for j,line in enumerate(scene["lines"]):
        txt=WORK/f"{i}-{j}.txt";src=WORK/f"{i}-{j}.aiff"
        txt.write_text(line)
        run("say","-v","Samantha","-r","174","-f",txt,"-o",src)
        inputs.append((src,duration(src),line))
    factor=sum(x[1] for x in inputs)/14.6
    assert .5<factor<2, factor
    cursor=i*15
    for j,(src,d,line) in enumerate(inputs):
        target=d/factor+.2
        out=WORK/f"clip-{i}-{j}.wav"
        run("ffmpeg","-y","-i",src,"-af",f"atempo={factor:.9f},apad","-t",f"{target:.9f}","-ar","48000","-ac","1","-c:a","pcm_s16le",out)
        clips.append(out)
        cues.append(dict(scene=i,start=round(cursor,6),end=round(cursor+target,6),text=line))
        cursor+=target
    report.append(dict(scene=scene["id"],unscaled_seconds=sum(x[1] for x in inputs),tempo=factor,target_seconds=15))
    print(f"{scene['id']}: 15 seconds, tempo {factor:.3f}",flush=True)

concat=WORK/"concat.txt"
concat.write_text("\n".join("file '"+str(p).replace("'","'\\''")+"'" for p in clips))
run("ffmpeg","-y","-f","concat","-safe","0","-i",concat,"-af","apad","-t","90","-c:a","pcm_s16le",ROOT/"assets/narration.wav")
run("ffmpeg","-y","-i",ROOT/"assets/narration.wav","-c:a","libmp3lame","-b:a","128k",ROOT/"assets/narration.mp3")
(ROOT/"audio-cues.js").write_text("window.AUDIO_CUES = "+json.dumps(cues,ensure_ascii=False)+";\n")
(ROOT/"assets/captions.vtt").write_text("WEBVTT\n\n"+"\n\n".join(f"{k+1}\n{stamp(c['start'])} --> {stamp(c['end'])}\n{c['text']}" for k,c in enumerate(cues))+"\n")
(ROOT/"evidence/audio-generation.json").write_text(json.dumps(dict(voice="macOS Samantha",rate=174,scenes=report,duration=duration(ROOT/"assets/narration.wav")),indent=2)+"\n")
