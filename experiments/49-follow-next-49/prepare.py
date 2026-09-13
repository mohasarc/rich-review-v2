"""Snapshot the comparison; only two authored top statements change."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib, json, shutil, difflib

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
PAGES = {
    '23': ('23-zoom-canvas', ['index.html','app.js','data.js','styles.css','README.md','decision-inventory.md']),
    '29': ('29-refusal', ['index.html','app.js','data.js','style.css','evidence.html','README.md','brief.md']),
}
EDITS = [
    ('23', 'app.js', 'Separate protocol/instance and token paths, including control exceptions.',
     'Ping/stop: protocol+instance, no token. Other normal requests add token; identify/terminate/kill: early instance+token.'),
    ('29', 'index.html', 'Daemon wall and monotonic clocks replace telemetry and scattered time callbacks.',
     'Daemon owns wall/monotonic time; the standalone queue default changes Date.now → monotonic, while the process already injected monotonic time.'),
]

def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()

manifest = {'prepared_at': datetime.now(timezone.utc).isoformat(), 'files': [], 'edits': []}
for number, (folder, files) in PAGES.items():
    for variant in ['original','revised']:
        dest = OUT/'variants'/variant/number
        dest.mkdir(parents=True, exist_ok=True)
        for name in files:
            source = ROOT/'experiments'/folder/name
            shutil.copyfile(source, dest/name)
            manifest['files'].append({'origin':str(source.relative_to(ROOT)), 'copy':str((dest/name).relative_to(OUT)), 'sha256':sha(source)})
for number, file, old, new in EDITS:
    target = OUT/'variants/revised'/number/file
    text = target.read_text()
    # In 29 the second occurrence is the deeper disclosure summary. Leave it intact.
    assert text.count(old) == (2 if number == '29' else 1)
    target.write_text(text.replace(old,new,1))
    before = (OUT/'variants/original'/number/file).read_text()
    manifest['edits'].append({'page':number,'file':file,'old':old,'new':new,'replacements':1,'original_sha256':hashlib.sha256(before.encode()).hexdigest(),'revised_sha256':sha(target)})
    (OUT/f'variants/change-{number}.patch').write_text(''.join(difflib.unified_diff(before.splitlines(True),target.read_text().splitlines(True),fromfile=f'original/{number}/{file}',tofile=f'revised/{number}/{file}')))
(OUT/'variants/manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Saved two original pages, two revised pages, and exactly two statement edits.')
