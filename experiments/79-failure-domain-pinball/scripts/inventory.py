"""Bounded historical test inventory; does not claim an all-stack test audit."""
from pathlib import Path
import json, subprocess, hashlib

out=Path(__file__).resolve().parents[1]
root=out.parents[1]
wt=root/'worktrees/stack-head'
prs={p['number']:p for p in json.loads((root/'inputs/stack/pr.json').read_text())['pullRequests']}
items=[
    (133,'packages/daemon/src/daemon-execution-failure.test.ts','packages/daemon/src/daemon-execution-failure.test.ts'),
    (134,'packages/daemon/src/daemon-admission.test.ts','packages/daemon/src/daemon-admission.test.ts'),
    (142,'apps/cli/src/daemon/daemon-execution-client.test.ts','packages/daemon/src/transport/execution-client.test.ts'),
]
records=[]
for number,original_path,tip_path in items:
    ref='origin/'+prs[number]['head']
    original=subprocess.check_output(['git','-C',str(wt),'show',ref+':'+original_path],text=True)
    tip=(wt/tip_path).read_text()
    original_body=original[original.index('describe('):]
    tip_body=tip[tip.index('describe('):]
    identical=original_body==tip_body
    assert identical, f'Reconcile changed test body before claiming preservation: {tip_path}'
    records.append({
        'introducedIn':number,
        'introducedRevision':subprocess.check_output(['git','-C',str(wt),'rev-parse',ref],text=True).strip(),
        'originalPath':original_path,'tipPath':tip_path,
        'fromFirstDescribeByteIdentical':identical,
        'bodySha256':hashlib.sha256(tip_body.encode()).hexdigest(),
        'removedAssertionsFromTheseSuites':0,
    })
(out/'evidence/test-inventory.json').write_text(json.dumps(records,indent=2)+'\n')
print('All three authority suites retain byte-identical bodies after their first describe call.')
