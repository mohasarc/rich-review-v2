from pathlib import Path
import hashlib, json, re, subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
GIT = ROOT / 'worktrees/stack-head'
BASE = 'ba53c8e1662fd86d198b95321c90d9c9bef10184'
HEAD = '20838f8dbf413e04767543eb2380d0d114da6c60'

def git(*args):
    return subprocess.check_output(['git', '-C', str(GIT), *args])

def digest(data):
    return hashlib.sha256(data).hexdigest()

patch = git('diff', '-M', BASE, HEAD)
(OUT / 'source/diff.patch').write_bytes(patch)
reduced = git('diff', '--find-copies-harder', '-C40%', BASE, HEAD)
(OUT / 'source/copy-aware.patch').write_bytes(reduced)
files = []
for line in git('diff', '--name-status', '-M', BASE, HEAD).decode().splitlines():
    fields = line.split('\t')
    status = fields[0]
    old = fields[1] if status[0] != 'A' else None
    new = fields[-1] if status[0] != 'D' else None
    files.append({'status': status, 'base_path': old, 'head_path': new})

contexts = ['AGENTS.md', 'meta-tests/AGENTS.md', 'plans/005/daemon-policy.md',
    'plans/005/daemon-architecture-functional-spec.md', 'plans/005/daemon-functional-spec.md',
    'apps/cli/src/daemon/daemon-command-dispatcher.ts', 'apps/cli/src/cli.ts',
    'apps/cli/src/daemon/daemon-navigation-worker.ts', 'apps/cli/src/daemon/daemon-clock.test.ts',
    'apps/cli/src/daemon/daemon-workspace-identity.ts', 'packages/daemon/src/daemon-policy.ts',
    'packages/daemon/src/policy-testing.ts']
records = []
for side, sha in [('base', BASE), ('head', HEAD)]:
    names = {x[side + '_path'] for x in files if x[side + '_path']}
    names.update(contexts)
    for name in sorted(names):
        obj = subprocess.run(['git', '-C', str(GIT), 'show', f'{sha}:{name}'], capture_output=True)
        if obj.returncode:
            if name not in contexts:
                raise RuntimeError(obj.stderr.decode())
            continue
        data = obj.stdout
        target = OUT / 'source' / side / (name + '.txt')
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        records.append({'side': side, 'commit': sha, 'git_path': name,
            'path': str(target.relative_to(OUT)), 'sha256': digest(data),
            'blob': git('rev-parse', f'{sha}:{name}').decode().strip(),
            'lines': len(data.decode().splitlines())})

bundle = ROOT / 'inputs/pr-148'
for name in ['pr.json', 'files.txt', 'stack.md']:
    (OUT / 'source' / name).write_bytes((bundle / name).read_bytes())
(OUT / 'source/history.txt').write_bytes(git('log', '--reverse', '--format=%H%n%s%n%b', f'{BASE}..{HEAD}'))
(OUT / 'source/inventory.json').write_text(json.dumps(files, indent=2) + '\n')
(OUT / 'source/manifest.json').write_text(json.dumps({'base': BASE, 'head': HEAD,
    'extracted_from': 'read-only stack-head git object database',
    'patch_sha256': digest(patch), 'bundle_patch_sha256': digest((bundle/'diff.patch').read_bytes()),
    'files': records}, indent=2) + '\n')

# Comparison hypotheses from Git, not an assertion of semantic equivalence.
chunks = re.split(r'(?=^diff --git )', reduced.decode(), flags=re.M)
index = []
for i, chunk in enumerate(x for x in chunks if x.strip()):
    header = chunk.splitlines()[0]
    path = f'source/patches/{i+1:03}.patch'
    target = OUT / path
    target.parent.mkdir(exist_ok=True)
    target.write_text(chunk)
    index.append({'id': i+1, 'header': header, 'path': path,
        'lines': len(chunk.splitlines()), 'sha256': digest(chunk.encode())})
(OUT/'source/patch-index.json').write_text(json.dumps(index, indent=2)+'\n')
print(json.dumps({'changed_paths': len(files), 'pinned_sources': len(records),
    'copy_aware_sections': len(index), 'matches_bundle_patch':patch == (bundle/'diff.patch').read_bytes()}))
