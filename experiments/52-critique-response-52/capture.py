"""Freeze the assigned comparison. Reads worktrees; writes only this experiment."""
from pathlib import Path
import hashlib, json, re, subprocess

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parents[1]
manifest = json.loads((ROOT / 'source-manifest.json').read_text())
patch = (ROOT / 'evidence/diff.patch').read_text()
paths = re.findall(r'^diff --git a/(.*?) b/.*$', patch, re.M)
context = [
    'packages/daemon/src/daemon-policy.ts',
    'packages/daemon/src/daemon-policy.test.ts',
    'packages/daemon/src/policy-testing.ts',
    'plans/005/daemon-policy.md',
    'plans/005/daemon-architecture-functional-spec.md',
]
for side in ('base', 'head'):
    wd = PROJECT / ('worktrees/pr-131-' + side)
    actual = subprocess.check_output(['git','rev-parse','HEAD'],cwd=wd,text=True).strip()
    assert actual == manifest['revisions'][side]
    for path in dict.fromkeys(paths + context):
        source = wd / path
        if not source.exists():
            continue
        dest = ROOT / 'evidence' / side / path
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(source.read_bytes())
        manifest['files'][str(dest.relative_to(ROOT))] = {
            'from':str(source.relative_to(PROJECT)), 'revision':actual,
            'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),
        }
computed = subprocess.check_output(['git','diff',manifest['revisions']['base']+'...'+manifest['revisions']['head']],cwd=PROJECT/'worktrees/pr-131-head')
assert computed == (ROOT/'evidence/diff.patch').read_bytes(), 'Supplied comparison drifted'
manifest['comparison_verified'] = True
(ROOT/'source-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(f'Frozen {len(paths)} changed paths and {len(context)} context paths at both revisions where present.')
