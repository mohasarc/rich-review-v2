#!/usr/bin/env python3
"""Capture local evidence. Reads the two worktrees; writes only this experiment."""
import hashlib
import json
from pathlib import Path
import re
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
BUNDLE = ROOT / 'inputs/pr-131'
BASE = ROOT / 'worktrees/pr-131-base'
HEAD = ROOT / 'worktrees/pr-131-head'
patch = (BUNDLE / 'diff.patch').read_text()
files = {}
for chunk in patch.split('diff --git ')[1:]:
    path = chunk.splitlines()[0].split(' b/')[1]
    files[path] = {'patch': 'diff --git ' + chunk, 'changed': True}

context = [
    'packages/daemon/src/daemon-policy.ts',
    'packages/daemon/src/daemon-policy.test.ts',
    'packages/daemon/src/policy-testing.ts',
    'apps/cli/src/daemon/daemon-process-launcher.test.ts',
    'apps/cli/src/program.ts',
    'apps/cli/src/program-dependencies.ts',
    'apps/cli/src/daemon/daemon-record-observer.ts',
    'plans/005/daemon-policy.md',
    'plans/005/daemon-architecture-functional-spec.md',
    'AGENTS.md',
]
for path in context:
    files.setdefault(path, {'changed': False, 'patch': 'No change in PR #131. Included as context.'})

for path, entry in files.items():
    for name, tree in [('base', BASE), ('head', HEAD)]:
        target = tree / path
        entry[name] = target.read_text() if target.exists() else None
    entry['added'] = sum(line.startswith('+') and not line.startswith('+++') for line in entry['patch'].splitlines()) if entry['changed'] else 0
    entry['removed'] = sum(line.startswith('-') and not line.startswith('---') for line in entry['patch'].splitlines()) if entry['changed'] else 0

policy_rows = []
for line in files['plans/005/daemon-policy.md']['head'].splitlines():
    if line.startswith('| `'):
        cells = [cell.strip().strip('`') for cell in line.strip('|').split('|')]
        policy_rows.append(dict(zip(['path', 'default', 'applies', 'reason', 'oracle'], cells)))

data = {
    'pr': json.loads((BUNDLE / 'pr.json').read_text()),
    'baseSha': subprocess.check_output(['git', '-C', str(BASE), 'rev-parse', 'HEAD'], text=True).strip(),
    'headSha': subprocess.check_output(['git', '-C', str(HEAD), 'rev-parse', 'HEAD'], text=True).strip(),
    'patchSha256': hashlib.sha256(patch.encode()).hexdigest(),
    'files': files,
    'policyRows': policy_rows,
}
(HERE / 'evidence.js').write_text('window.EVIDENCE = ' + json.dumps(data, ensure_ascii=False).replace('</', '<\\/') + ';\n')
print(f'Captured {sum(x["changed"] for x in files.values())} changed files, {len(context)} context files, {len(policy_rows)} policy rows.')
