from pathlib import Path
import subprocess, json, hashlib, re

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[1]
subjects = [f'pr-{n}-{v}' for n in (127, 131) for v in ('base', 'head')]
pins = {}
for subject in subjects:
    wt = ROOT / 'worktrees' / subject
    pins[subject] = subprocess.check_output(['git', '-C', str(wt), 'rev-parse', 'HEAD'], text=True).strip()
    assert not subprocess.check_output(['git', '-C', str(wt), 'status', '--porcelain', '--untracked-files=no'], text=True), subject

specs = [
 ('cache', 'pr-127-head', 'packages/core/src/backend/turn-scoped-cache-scope.ts', 1, 46),
 ('cache-tests', 'pr-127-head', 'packages/core/src/backend/turn-scoped-cache-scope.test.ts', 1, 92),
 ('service-head', 'pr-127-head', 'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts', 28, 174),
 ('service-base', 'pr-127-base', 'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts', 28, 172),
 ('backend-head', 'pr-127-head', 'packages/backend-typescript/src/typescript-backend/typescript-backend.ts', 79, 90),
 ('backend-base', 'pr-127-base', 'packages/backend-typescript/src/typescript-backend/typescript-backend.ts', 79, 90),
 ('service-tests', 'pr-127-head', 'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts', 28, 218),
 ('spec', 'pr-127-head', 'plans/005/daemon-architecture-functional-spec.md', 1, 29),
 ('spec-131', 'pr-131-head', 'plans/005/daemon-architecture-functional-spec.md', 1, 29),
 ('policy-reasons', 'pr-131-head', 'plans/005/daemon-policy.md', 27, 28),
 ('transport-head', 'pr-131-head', 'apps/cli/src/daemon/local-daemon-transport.ts', 391, 499),
 ('transport-base', 'pr-131-base', 'apps/cli/src/daemon/local-daemon-transport.ts', 386, 485),
 ('fetch-head', 'pr-131-head', 'apps/cli/src/daemon/local-daemon-transport.ts', 634, 754),
 ('composition', 'pr-131-head', 'apps/cli/src/daemon/local-daemon-transport.ts', 20, 45),
 ('constructor', 'pr-131-head', 'apps/cli/src/daemon/local-daemon-transport.ts', 280, 303),
 ('policy', 'pr-131-head', 'packages/daemon/src/daemon-policy.ts', 131, 150),
 ('transport-tests', 'pr-131-head', 'apps/cli/src/daemon/local-daemon-transport-execution.test.ts', 843, 898),
 ('test-adapter', 'pr-131-head', 'apps/cli/test/helpers/local-daemon-transport.ts', 1, 64),
]
documents = {}
receipts = []
for id, subject, path, start, end in specs:
    wt = ROOT / 'worktrees' / subject
    raw = (wt / path).read_bytes()
    git_raw = subprocess.check_output(['git', '-C', str(wt), 'show', f'{pins[subject]}:{path}'])
    assert raw == git_raw, (subject, path)
    key = subject + '/' + path
    documents[key] = dict(subject=subject, path=path, revision=pins[subject], sha256=hashlib.sha256(raw).hexdigest(), text=raw.decode())
    lines = raw.decode().splitlines()
    assert 1 <= start <= end <= len(lines), (id, len(lines))
    receipts.append(dict(id=id, subject=subject, path=path, start=start, end=end, revision=pins[subject], text='\n'.join(lines[start-1:end])))
for n in (127, 131):
    pr = json.loads((ROOT / 'inputs' / f'pr-{n}' / 'pr.json').read_text())
    text = pr['body'] + '\n\nCommits:\n' + '\n'.join(c['subject'] + '\n' + c['body'] for c in pr['commits'])
    receipts.append(dict(id=f'pr{n}',subject=f'pr-{n}',path='Supplied PR body and commit messages',start=1,end=len(text.splitlines()),revision=pr['commits'][-1]['sha'],text=text))

inventories = {}
for n in (127,131):
    diff = (ROOT / 'inputs' / f'pr-{n}' / 'diff.patch').read_text()
    inventories[str(n)] = dict(changedFiles=len(re.findall(r'^diff --git ',diff,re.M)), additions=sum(l.startswith('+') and not l.startswith('+++') for l in diff.splitlines()), deletions=sum(l.startswith('-') and not l.startswith('---') for l in diff.splitlines()))

old_test = (ROOT/'worktrees/pr-127-base/packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts').read_text()
new_test = (ROOT/'worktrees/pr-127-head/packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts').read_text()
anchor = '  it("shares one reference search across caller and reference projections"'
assert old_test[old_test.index(anchor):] == new_test[new_test.index(anchor):]
inventories['127']['originalFiveTestsAndHelpersUnchanged'] = True
inventories['127']['newServiceCases'] = 6
inventories['127']['newCoreCases'] = 4
inventories['131']['scope'] = 'Only delivery-counter and error-path tests are inventoried in the atlas; no PR-wide test audit is claimed.'
data = dict(pins=pins, inventories=inventories, documents=list(documents.values()), receipts=receipts)
(OUT/'evidence/sources.json').write_text(json.dumps(data, indent=2)+'\n')
print(json.dumps(dict(pins=pins, documents=len(documents), receipts=len(receipts), inventories=inventories), indent=2))
