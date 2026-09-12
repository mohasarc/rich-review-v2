"""Read-only PR inventory; all generated files stay beside this script."""
from pathlib import Path
import difflib
import hashlib
import json
import re
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
HEAD = ROOT / 'worktrees/pr-148-head'
BASE = ROOT / 'worktrees/pr-148-base'

def git(*args):
    return subprocess.check_output(['git', '-C', str(HEAD), *args], text=True)

def normalized(source):
    source = re.sub(r'^import\b[\s\S]*?;\n', '', source, flags=re.M)
    source = source.replace('WorkspaceDaemon', 'DaemonProcessCoordinator')
    return source.splitlines(keepends=True)

def run():
    base_sha = subprocess.check_output(['git', '-C', str(BASE), 'rev-parse', 'HEAD'], text=True).strip()
    head_sha = git('rev-parse', 'HEAD').strip()
    entries = []
    for row in git('diff', '--name-status', base_sha, head_sha).splitlines():
        fields = row.split('\t')
        status = fields[0]
        old = fields[1] if status[0] != 'A' else None
        new = fields[-1] if status[0] != 'D' else None
        entries.append(dict(status=status, old=old, path=new or old))
    copies = {}
    for row in git('diff', '-C', '--find-copies-harder', '--name-status', base_sha, head_sha).splitlines():
        fields = row.split('\t')
        if fields[0][0] in 'CR':
            copies[fields[2]] = dict(origin=fields[1], similarity=int(fields[0][1:]))
    test_deltas, mechanism_deltas = [], []
    for entry in entries:
        origin = copies.get(entry['path'], {}).get('origin') or entry['old']
        before = (BASE / origin).read_text() if origin and (BASE / origin).exists() else ''
        after = (HEAD / entry['path']).read_text() if (HEAD / entry['path']).exists() else ''
        entry.update(copies.get(entry['path'], {}))
        entry['beforeLines'] = len(before.splitlines())
        entry['afterLines'] = len(after.splitlines())
        delta = ''.join(difflib.unified_diff(normalized(before), normalized(after), fromfile=origin or '(added)', tofile=entry['path'], n=2))
        if '.test.' in entry['path'] and before:
            test_deltas.append(delta)
        elif 'apps/cli/src/daemon/' in (origin or '') and entry['path'].startswith('packages/daemon/src/'):
            mechanism_deltas.append(delta)
    frozen = sorted(p for p in (HEAD / 'apps/cli/src/daemon').glob('*.ts') if not p.name.endswith('.test.ts') and p.name not in {'daemon-command-dispatcher.ts', 'invocation-route.ts', 'invocation-workspace-selector.ts'})
    digest = hashlib.sha256()
    for p in frozen:
        digest.update(str(p.relative_to(HEAD)).encode() + b'\0' + p.read_text().replace('\r\n', '\n').encode() + b'\0')
    inventory = dict(base=base_sha, head=head_sha, entries=entries, frozen=[str(p.relative_to(HEAD)) for p in frozen], digest=digest.hexdigest())
    (OUT / 'inventory.json').write_text(json.dumps(inventory, indent=2) + '\n')
    (OUT / 'test-deltas.txt').write_text('\n'.join(test_deltas))
    (OUT / 'mechanism-deltas.txt').write_text('\n'.join(mechanism_deltas))
    print(json.dumps(dict(base=base_sha, head=head_sha, files=len(entries), frozen=len(frozen), digest=digest.hexdigest(), relocatedTests=sum(e['status'].startswith('R') and e['path'].startswith('packages/daemon/src/') and e['path'].endswith('.test.ts') for e in entries), copyDetectedSources=sum(e['path'].startswith('packages/daemon/src/') and not e['path'].endswith('.test.ts') and 'origin' in e for e in entries)), indent=2))

if __name__ == '__main__':
    run()
