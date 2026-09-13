"""Freeze local PR evidence for a file://-openable, network-independent page."""
from pathlib import Path
import json
import hashlib
import re
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
HEAD = ROOT / 'worktrees/pr-148-head'
BASE = ROOT / 'worktrees/pr-148-base'
BUNDLE = ROOT / 'inputs/pr-148'

def git(tree, *args):
    return subprocess.check_output(['git', '-C', str(tree), *args], text=True).strip()

patch = (BUNDLE / 'diff.patch').read_text()
files = []
sources = {}

def snapshot(side, path):
    key = f'{side}:{path}'
    if key in sources:
        return key
    file = (HEAD if side == 'head' else BASE) / path
    if file.is_file():
        raw = file.read_bytes()
        source = raw.decode('utf-8')
        sources[key] = {'side': side, 'path': path, 'text': source, 'sha256': hashlib.sha256(raw).hexdigest()}
    return key

for chunk in patch.split('diff --git ')[1:]:
    old, new = re.match(r'a/(.*?) b/(.*?)\n', chunk).groups()
    lines = chunk.splitlines()
    added = sum(line.startswith('+') and not line.startswith('+++') for line in lines)
    removed = sum(line.startswith('-') and not line.startswith('---') for line in lines)
    status = 'added' if '\nnew file mode ' in chunk else 'deleted' if '\ndeleted file mode ' in chunk else 'moved' if '\nrename from ' in chunk else 'modified'
    files.append({'old': old, 'path': new, 'added': added, 'removed': removed, 'status': status, 'diff': 'diff --git ' + chunk})
    snapshot('base', old)
    snapshot('head', new)

for path in [
    'plans/005/daemon-architecture-functional-spec.md',
    'plans/005/daemon-functional-spec.md',
    'apps/cli/src/daemon/daemon-command-dispatcher.ts',
    'apps/cli/src/commands/daemon/register-daemon-command.ts',
    'packages/daemon/src/daemon-executor.ts',
    'packages/daemon/src/daemon-command-name.ts',
    'apps/cli/src/daemon/daemon-clock.ts',
]:
    snapshot('head', path)
    snapshot('base', path)

unchanged = []
for path in ['apps/cli/src/daemon/daemon-command-dispatcher.ts', 'apps/cli/src/commands/daemon/register-daemon-command.ts']:
    a = sources['base:' + path]
    b = sources['head:' + path]
    unchanged.append({'path': path, 'identical': a['sha256'] == b['sha256'], 'sha256': b['sha256']})

body = json.loads((BUNDLE / 'pr.json').read_text())
data = {
    'head': git(HEAD, 'rev-parse', 'HEAD'), 'base': git(BASE, 'rev-parse', 'HEAD'),
    'pr': body, 'files': files, 'sources': sources, 'unchanged': unchanged,
    'routes': json.loads((OUT / 'route-results.json').read_text()),
    'totals': {'files': len(files), 'added': sum(f['added'] for f in files), 'removed': sum(f['removed'] for f in files)},
}
(OUT / 'evidence-data.js').write_text('window.CASE_EVIDENCE = ' + json.dumps(data, ensure_ascii=False).replace('</', '<\\/') + ';\n')
(OUT / 'evidence-manifest.json').write_text(json.dumps({
    'base': data['base'], 'head': data['head'], 'totals': data['totals'],
    'unchangedConsumers': unchanged,
    'sources': [{'key': key, 'sha256': value['sha256']} for key, value in sources.items()],
}, indent=2) + '\n')
print(f"Captured {len(files)} file deltas and {len(sources)} source snapshots; {data['totals']}")
