from pathlib import Path
import datetime
import hashlib
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent / 'source-check'
OUT.mkdir(exist_ok=True)
REPO = ROOT / 'worktrees/stack-head'
bundle = json.loads((ROOT / 'inputs/stack/pr.json').read_text())
branch_commits = {pr['head']: pr['commits'][-1]['sha'] for pr in bundle['pullRequests']}
branch_commits['main'] = bundle['base']

def git(*args):
    return subprocess.check_output(['git', '-C', str(REPO), *args], text=True)

def sha(value):
    if isinstance(value, str):
        return branch_commits.get(value, value)
    for field in ['sha', 'oid']:
        if field in value:
            return value[field]
    raise ValueError(value)

records = {}
for pr in bundle['pullRequests']:
    if pr['number'] in [127, 131, 146, 147, 148, 149]:
        records[f"pr-{pr['number']}"] = pr
records['stack'] = {'base': bundle['base'], 'head': bundle['head']}
manifest = {'captured_at': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'subjects': {}}
for name, record in records.items():
    base, head = sha(record['base']), sha(record['head'])
    folder = OUT / name
    folder.mkdir(exist_ok=True)
    patch = git('diff', '--find-renames', '--find-copies', '--find-copies-harder', base, head, '--')
    (folder / 'copy-aware.patch').write_text(patch)
    (folder / 'record.json').write_text(json.dumps(record, indent=2) + '\n')
    if record.get('body'):
        (folder / 'pr-body.md').write_text(record['body'] + '\n')
    (folder / 'files.txt').write_text(git('diff', '--name-status', '--find-renames', '--find-copies', '--find-copies-harder', base, head, '--'))
    pieces = re.split(r'(?=^diff --git )', patch, flags=re.M)
    production, tests, other = [], [], []
    inventory = []
    for piece in pieces:
        if not piece.strip():
            continue
        header = piece.splitlines()[0]
        path = header.split(' b/', 1)[-1]
        is_test = '.test.' in path or '/test/' in path or path.startswith('meta-tests/')
        is_prod = path.endswith(('.ts', '.js', '.mjs')) and (path.startswith('apps/') or path.startswith('packages/')) and not is_test
        category = 'tests' if is_test else 'production' if is_prod else 'other'
        {'tests': tests, 'production': production, 'other': other}[category].append(piece)
        inventory.append({'path': path, 'category': category, 'hunks': len(re.findall(r'^@@', piece, flags=re.M)), 'lines': len(piece.splitlines())})
    for category, pieces_for_category in [('production', production), ('tests', tests), ('other', other)]:
        (folder / f'{category}.patch').write_text(''.join(pieces_for_category))
    (folder / 'inventory.json').write_text(json.dumps(inventory, indent=2) + '\n')
    manifest['subjects'][name] = {'base': base, 'head': head, 'copy_aware_sha256': hashlib.sha256(patch.encode()).hexdigest(), 'paths': len(inventory), 'lines': {category: sum(len(p.splitlines()) for p in pieces) for category, pieces in [('production', production), ('tests', tests), ('other', other)]}}
manifest['bundle_sha256'] = {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in (ROOT / 'inputs/stack').iterdir() if p.is_file()}
(OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps(manifest['subjects'], indent=2))
