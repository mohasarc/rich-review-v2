"""Encode deterministic browser frames and the generated soundtrack as a portable MP4."""
from pathlib import Path
import subprocess, json

root=Path(__file__).resolve().parents[1]
assert len(list((root/'.render/frames').glob('*.png')))==1080
scenes=json.loads((root/'content.json').read_text())['scenes']
chapter_file=root/'.render/chapters.ffmeta'
chapter_file.write_text(';FFMETADATA1\n'+''.join(
    f'[CHAPTER]\nTIMEBASE=1/1000\nSTART={i*15000}\nEND={(i+1)*15000}\ntitle={s["short"]}\n'
    for i,s in enumerate(scenes)
))
subprocess.run([
    'ffmpeg','-y','-framerate','12','-i',str(root/'.render/frames/%05d.png'),
    '-i',str(root/'assets/narration.wav'),'-i',str(root/'assets/captions.vtt'),'-i',str(chapter_file),
    '-map','0:v:0','-map','1:a:0','-map','2:s:0',
    '-map_metadata','3','-map_chapters','3',
    '-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-r','24',
    '-c:a','aac','-b:a','160k','-c:s','mov_text',
    '-metadata:s:s:0','language=eng','-metadata','title=Same commands, different owners',
    '-metadata','artist=Synthetic narration: macOS Samantha',
    '-movflags','+faststart','-t','90',str(root/'assets/narrated-top.mp4')
],check=True)
