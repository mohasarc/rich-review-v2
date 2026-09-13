"""Snapshot local evidence into an offline browser bundle; never writes worktrees."""
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
OUT = HERE.parent
BUNDLE = ROOT / 'inputs/pr-131'
HEAD = ROOT / 'worktrees/pr-131-head'
BASE = ROOT / 'worktrees/pr-131-base'
patch = (BUNDLE / 'diff.patch').read_text()
pr = json.loads((BUNDLE / 'pr.json').read_text())
commits = json.loads((HERE / 'observations.json').read_text())['commits']

specs = {
  'composition': ('apps/cli/src/daemon/daemon-command-dispatcher.ts', 274, 303),
  'purpose': ('apps/cli/src/commands/daemon/register-daemon-command.ts', 94, 122),
  'transport': ('apps/cli/src/daemon/local-daemon-transport.ts', 276, 313),
  'reattach': ('apps/cli/src/daemon/local-daemon-transport.ts', 395, 430),
  'resume': ('apps/cli/src/daemon/local-daemon-transport.ts', 444, 530),
  'acceptance': ('apps/cli/src/daemon/local-daemon-transport.ts', 525, 572),
  'fetch': ('apps/cli/src/daemon/local-daemon-transport.ts', 646, 746),
  'failure': ('apps/cli/src/daemon/local-daemon-transport.ts', 1195, 1212),
  'output': ('apps/cli/src/command-execution-result.ts', 145, 182),
  'spool': ('apps/cli/src/daemon/completion-spool.ts', 297, 340),
  'codec': ('apps/cli/src/daemon/daemon-result-chunk-codec.ts', 130, 165),
  'worker': ('apps/cli/src/daemon/daemon-navigation-worker.ts', 66, 93),
  'worker-entry': ('apps/cli/src/daemon/daemon-navigation-worker-entry.ts', 117, 129),
  'resources': ('apps/cli/src/daemon/daemon-resource-monitor.ts', 84, 121),
  'replacement': ('apps/cli/src/daemon/daemon-resource-monitor.ts', 154, 181),
  'workspace': ('apps/cli/src/daemon/workspace-daemon.ts', 114, 173),
  'same-request': ('apps/cli/src/daemon/workspace-daemon.ts', 481, 524),
  'startup': ('apps/cli/src/daemon/daemon-startup-coordinator.ts', 58, 96),
  'shutdown': ('apps/cli/src/daemon/daemon-controller.ts', 33, 86),
  'drain': ('apps/cli/src/daemon/workspace-daemon.ts', 918, 941),
  'logging': ('apps/cli/src/daemon/daemon-logger.ts', 259, 274),
  'traces': ('apps/cli/src/daemon/workspace-daemon.ts', 827, 903),
  'test-adapter': ('apps/cli/test/helpers/local-daemon-transport.ts', 20, 64),
  'workspace-adapter': ('apps/cli/test/helpers/workspace-daemon.ts', 27, 60),
  'disk-test': ('apps/cli/src/daemon/local-daemon-transport-execution.test.ts', 727, 777),
  'central-tests': ('packages/daemon/src/daemon-policy.test.ts', 65, 119),
  'new-recovery-test': ('apps/cli/src/daemon/local-daemon-transport-execution.test.ts', 846, 895),
  'meta': ('meta-tests/src/daemon-package.test.ts', 192, 239),
  'defaults': ('packages/daemon/src/daemon-policy.ts', 90, 168),
  'validation': ('packages/daemon/src/daemon-policy.ts', 265, 311),
}
refs = {}
for key, (path, first, last) in specs.items():
  lines = (HEAD / path).read_text().splitlines()
  refs[key] = {'path': path, 'edition': 'head', 'first': first, 'lines': lines[first-1:last]}
for key, first, last in [('base-reattach', 391, 416), ('base-resume', 425, 485), ('base-startup', 48, 84)]:
  path = 'apps/cli/src/daemon/' + ('daemon-startup-coordinator.ts' if key == 'base-startup' else 'local-daemon-transport.ts')
  refs[key] = {'path': path, 'edition': 'base', 'first': first,
              'lines': (BASE / path).read_text().splitlines()[first-1:last]}

files = []
for fragment in re.split(r'(?=^diff --git )', patch, flags=re.M):
  if not fragment.strip():
    continue
  path = re.search(r'^diff --git a/(.*?) b/', fragment).group(1)
  added = sum(line.startswith('+') and not line.startswith('+++') for line in fragment.splitlines())
  removed = sum(line.startswith('-') and not line.startswith('---') for line in fragment.splitlines())
  files.append({'path': path, 'added': added, 'removed': removed, 'patch': fragment})

policy_record = (HEAD / 'plans/005/daemon-policy.md').read_text()
policy_rows = []
for line in policy_record.splitlines():
  if not line.startswith('| `'):
    continue
  cells = [cell.strip().replace('`', '') for cell in line.strip('|').split('|')]
  if len(cells) == 5:
    policy_rows.append(dict(zip(['path', 'value', 'consumer', 'reason', 'oracle'], cells)))

evidence = {'pr': pr, 'commits': commits, 'refs': refs, 'files': files,
  'policyRows': policy_rows, 'policyRecord': policy_record,
  'observations': json.loads((HERE / 'observations.json').read_text())}
(OUT / 'evidence.js').write_text('window.EVIDENCE = ' + json.dumps(evidence, ensure_ascii=False) + ';\n')
(HERE / 'pr-131.patch').write_text(patch)
(HERE / 'pr.json').write_text(json.dumps(pr, indent=2) + '\n')
(HERE / 'daemon-policy.md').write_text(policy_record)
families = {
    'cli-program-executor': '01, 04', 'command-execution-result': '04',
    'register-daemon-command': '01, 02, 06', 'completion-spool': '04',
    'daemon-command-dispatcher': '01', 'daemon-controller': '06',
    'daemon-entry': '01, 05, 06', 'daemon-lifetime': '06', 'daemon-logger': '06',
    'daemon-navigation-worker': '04, 05', 'daemon-process-launcher': '06',
    'daemon-process-terminator': '06', 'daemon-registry': '06',
    'daemon-resource': '05', 'daemon-result-chunk-codec': '04',
    'daemon-startup': '06', 'local-daemon-transport': '02, 03, 04, 08, 09',
    'workspace-daemon': '01, 04, 05, 06',
}
inventory = ['# Patch coverage', '',
    'The opening decision numbers correspond to `content.js`. This inventory maps all 60 changed paths to the explanation; it is not a correctness or coverage score. A file can serve several decisions. The full patch remains available in the source desk.', '',
    '| Changed file | Opening decisions | Added / removed |', '| --- | --- | --- |']
for file in files:
    name = Path(file['path']).name
    keys = set()
    for prefix, values in families.items():
        if name.startswith(prefix):
            keys.update(values.split(', '))
    if '.test.' in name or '/test/' in file['path']:
        keys.update(['07', '10'])
    if file['path'].startswith('meta-tests/'):
        keys = {'11'}
    inventory.append(f"| `{file['path']}` | {', '.join(sorted(keys))} | +{file['added']} / −{file['removed']} |")
(HERE / 'coverage.md').write_text('\n'.join(inventory) + '\n')
print(f'Bundled {len(files)} changed files, {len(refs)} source excerpts, {len(policy_rows)} policy rows.')
