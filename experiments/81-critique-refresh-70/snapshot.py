"""Record finished handoffs and their declared reading contract; writes here only."""
from datetime import datetime, timezone
from hashlib import sha256
import json
from pathlib import Path
import re
import sys

OUT = Path(__file__).resolve().parent
ROOT = OUT.parent.parent
HEADINGS = ['Entry point', 'Kind', 'Subjects', 'Declared choices', 'What I tried',
            'What I would drop', 'What I would do next', 'Time spent']
records = []
for folder in sorted(OUT.parent.iterdir()):
    if not folder.is_dir() or folder == OUT:
        continue
    readme = folder / 'README.md'
    content = readme.read_text() if readme.exists() else ''
    sections = {}
    for part in re.split(r'^## ', content, flags=re.M)[1:]:
        title, _, body = part.partition('\n')
        sections[title.strip()] = body.strip()
    records.append({
        'experiment': folder.name,
        'readme_present': readme.exists(),
        'queue_done': (ROOT / 'queue/done' / (folder.name + '.md')).exists(),
        'readme_sha256': sha256(content.encode()).hexdigest() if content else None,
        'missing_headings': [h for h in HEADINGS if h not in sections] if content else HEADINGS,
        'sections': {h: sections.get(h, '') for h in HEADINGS},
        'root_artifacts': [p.name for p in sorted(folder.iterdir())
                           if p.is_file() and p.suffix in ['.md', '.html'] and p.name != 'brief.md'],
    })
result = {'captured_utc': datetime.now(timezone.utc).isoformat(),
          'definition': 'A root README is a handed-off experiment, including explicit negative results. Queue completion is recorded independently. Self excluded.',
          'records': records}
target = OUT / (sys.argv[1] if len(sys.argv) > 1 else 'scope-start.json')
target.write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps({'snapshot': target.name, 'finished': [r['experiment'] for r in records if r['readme_present']],
                  'unfinished': [r['experiment'] for r in records if not r['readme_present']]}))
