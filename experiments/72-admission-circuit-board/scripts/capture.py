from pathlib import Path
import hashlib, json, subprocess

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parents[1]
files = {
 'head': [
  'packages/daemon/src/daemon-admission.ts',
  'packages/daemon/src/daemon-admission.test.ts',
  'packages/daemon/src/daemon-execution-failure.ts',
  'packages/daemon/src/client/daemon-routing-policy.ts',
  'packages/daemon/src/client/daemon-client-runtime.ts',
  'packages/daemon/src/client/daemon-client.test.ts',
  'packages/daemon/src/transport/transport-error.ts',
  'packages/daemon/src/transport/protocol-validator.ts',
  'packages/daemon/src/transport/execution-client.ts',
  'packages/daemon/src/transport/execution-client.test.ts',
  'packages/daemon/src/transport/daemon-transport-execution.test.ts',
  'packages/daemon/src/transport/result-transfer-receiver.ts',
  'packages/daemon/src/process/process-coordinator.ts',
  'packages/daemon/src/execution/accepted-request-ledger.ts',
  'packages/daemon/src/execution/accepted-execution-session.ts',
  'packages/daemon/src/daemon-policy.ts',
  'apps/cli/src/cli-invocation-coordinator.ts',
  'plans/005/daemon-policy.md',
  'plans/005/daemon-architecture-functional-spec.md',
 ],
 'main': [
  'apps/cli/src/daemon/daemon-command-dispatcher.ts',
  'apps/cli/src/daemon/local-daemon-transport.ts',
  'apps/cli/src/daemon/local-daemon-transport-execution.test.ts',
  'apps/cli/src/daemon/workspace-daemon.ts',
 ]
}
bundle=json.loads((REPO/'inputs/stack/pr.json').read_text())
bank={}
for version, paths in files.items():
 tree=REPO/'worktrees'/('stack-head' if version=='head' else 'main')
 revision=subprocess.check_output(['git','-C',str(tree),'rev-parse','HEAD'],text=True).strip()
 assert revision==bundle['head' if version=='head' else 'base']
 for path in paths:
  content=(tree/path).read_bytes()
  assert content==subprocess.check_output(['git','-C',str(tree),'show',f'{revision}:{path}'])
  target=ROOT/'evidence'/version/path
  target.parent.mkdir(parents=True,exist_ok=True)
  target.write_bytes(content)
  bank[f'{version}:{path}']={'version':version,'path':path,'revision':revision,'sha256':hashlib.sha256(content).hexdigest(),'text':content.decode()}
for pr in bundle['pullRequests']:
 if pr['number'] in [133,134,137,138,139,142,148,149]:
  path=f'pr-{pr["number"]}.md'
  content=pr['body']
  (ROOT/'evidence'/path).write_text(content)
  bank[path]={'version':'bundle','path':path,'revision':pr['commits'][-1].get('sha',pr['commits'][-1].get('oid',bundle['head'])) if pr.get('commits') else bundle['head'],'sha256':hashlib.sha256(content.encode()).hexdigest(),'text':content}
(ROOT/'src').mkdir(exist_ok=True)
(ROOT/'src/sources.json').write_text(json.dumps(bank,indent=2))
(ROOT/'evidence/source-manifest.json').write_text(json.dumps([{k:v for k,v in source.items() if k!='text'} for source in bank.values()],indent=2))
print(f'Captured {len(bank)} pinned sources; all source files equal their Git objects.')
