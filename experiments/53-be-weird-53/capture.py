"""Freeze pinned inputs inside this experiment; never write to a worktree."""
from pathlib import Path
import subprocess, json, hashlib, html, re

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
PINS = {'base': 'a1e325a5ff979bdfa25babc5554621c8c0f20497', 'head': '64919bcbcf7fcc8202779b78c5f069b24662bb18'}
PATHS = {
    'backend': 'packages/backend-typescript/src/typescript-backend/typescript-backend.ts',
    'service': 'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts',
    'service-test': 'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts',
    'scope': 'packages/core/src/backend/turn-scoped-cache-scope.ts',
    'scope-test': 'packages/core/src/backend/turn-scoped-cache-scope.test.ts',
    'exports': 'packages/core/src/index.ts',
    'graph': 'packages/core/src/workspace/project-graph.ts',
    'project': 'packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts',
    'spec': 'plans/005/daemon-architecture-functional-spec.md',
}

def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT/'worktrees/pr-127-head'), *args], text=True)

def run():
    evidence = HERE/'evidence'
    evidence.mkdir(exist_ok=True)
    docs = []
    for rev, pin in PINS.items():
        for key, path in PATHS.items():
            if rev == 'base' and key in ('scope', 'scope-test'):
                continue
            body = git('show', pin+':'+path)
            docs.append({'id': rev+'-'+key, 'revision': pin, 'path': path, 'text': body, 'sha256': hashlib.sha256(body.encode()).hexdigest()})
    for key, name in [('pr', 'pr.json'), ('diff', 'diff.patch')]:
        body = (ROOT/'inputs/pr-127'/name).read_text()
        docs.append({'id': key, 'revision': 'supplied bundle', 'path': 'inputs/pr-127/'+name, 'text': body, 'sha256': hashlib.sha256(body.encode()).hexdigest()})
    pr = json.loads((ROOT/'inputs/pr-127/pr.json').read_text())
    for key, body in [('pr-body', pr['body']), ('commits', '\n\n'.join(c['sha']+'\n'+c['subject']+'\n'+c['body'] for c in pr['commits']))]:
        docs.append({'id': key, 'revision': 'supplied bundle', 'path': 'inputs/pr-127/pr.json · '+key, 'text': body, 'sha256': hashlib.sha256(body.encode()).hexdigest()})
    (evidence/'sources.json').write_text(json.dumps(docs, indent=2)+'\n')
    for d in docs:
        (evidence/(d['id']+'.txt')).write_text(d['text'])
    by_id = {d['id']: d['text'] for d in docs}
    old = by_id['base-service-test']
    new = by_id['head-service-test']
    marker = '  it("shares one reference search across caller and reference projections"'
    unchanged = old[old.index(marker):] == new[new.index(marker):]
    inventory = {'pins': PINS, 'changed_paths': git('diff', '--name-only', PINS['base'], PINS['head']).splitlines(),
                 'old_service_cases': re.findall(r'\bit\("([^"]+)"', old),
                 'head_service_cases': re.findall(r'\bit\("([^"]+)"', new),
                 'new_core_cases': re.findall(r'\bit\("([^"]+)"', by_id['head-scope-test']),
                 'five_original_cases_and_helpers_byte_identical': unchanged}
    assert unchanged
    assert len(inventory['changed_paths']) == 6
    assert len(inventory['old_service_cases']) == 5
    assert len(inventory['head_service_cases']) == 11
    assert len(inventory['new_core_cases']) == 4
    (evidence/'inventory.json').write_text(json.dumps(inventory, indent=2)+'\n')
    print(f'Captured {len(docs)} source documents; 6 changed paths; all 5 original cases/helpers identical.')

if __name__ == '__main__':
    run()
