"""Read pinned git objects, writing only inside this experiment."""
from pathlib import Path
from datetime import datetime, timezone
import subprocess, hashlib, json, html

OUT=Path(__file__).resolve().parent
ROOT=OUT.parents[1]
REPO=ROOT/'worktrees/pr-127-head'
pins=json.loads((ROOT/'experiments/48-fresh-reader-refresh-40/source-check/manifest.json').read_text())['subjects']
files=[
 ('127-base-backend.ts','pr-127','base','packages/backend-typescript/src/typescript-backend/typescript-backend.ts'),
 ('127-head-backend.ts','pr-127','head','packages/backend-typescript/src/typescript-backend/typescript-backend.ts'),
 ('127-base-service.ts','pr-127','base','packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts'),
 ('127-head-service.ts','pr-127','head','packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts'),
 ('127-head-scope.ts','pr-127','head','packages/core/src/backend/turn-scoped-cache-scope.ts'),
 ('131-base-worker.ts','pr-131','base','apps/cli/src/daemon/daemon-navigation-worker.ts'),
 ('131-head-worker.ts','pr-131','head','apps/cli/src/daemon/daemon-navigation-worker.ts'),
 ('131-head-policy.ts','pr-131','head','packages/daemon/src/daemon-policy.ts'),
 ('131-base-entry.ts','pr-131','base','apps/cli/src/daemon/daemon-navigation-worker-entry.ts'),
 ('stack-head-graph.ts','stack','head','packages/core/src/workspace/project-graph.ts'),
 ('127-head-graph.ts','pr-127','head','packages/core/src/workspace/project-graph.ts'),
 ('148-head-coordinator.ts','pr-148','head','packages/daemon/src/process/process-coordinator.ts'),
 ('148-base-coordinator.ts','pr-148','base','apps/cli/src/daemon/workspace-daemon.ts'),
 ('148-head-client.ts','pr-148','head','packages/daemon/src/client/daemon-client.ts'),
 ('148-head-contracts.ts','pr-148','head','packages/daemon/src/client/daemon-client-contracts.ts'),
 ('148-head-runtime.ts','pr-148','head','packages/daemon/src/client/daemon-client-runtime.ts'),
 ('148-base-queue.ts','pr-148','base','apps/cli/src/daemon/workspace-request-queue.ts'),
 ('148-head-queue.ts','pr-148','head','packages/daemon/src/execution/request-queue.ts'),
 ('148-head-clock.ts','pr-148','head','packages/daemon/src/lifecycle/daemon-clock.ts'),
 ('148-head-admission.ts','pr-148','head','packages/daemon/src/daemon-admission.ts'),
 ('148-head-activity.ts','pr-148','head','packages/daemon/src/process/activity-projector.ts'),
]
records=[]
for name,subject,side,path in files:
    commit=pins[subject][side]
    blob=subprocess.check_output(['git','show',commit+':'+path],cwd=REPO)
    (OUT/'source'/name).write_bytes(blob)
    records.append({'file':name,'subject':subject,'side':side,'path':path,'commit':commit,'sha256':hashlib.sha256(blob).hexdigest()})
    lines=blob.decode().splitlines()
    doc='<!doctype html><meta charset="utf-8"><title>'+html.escape(name)+'</title><style>body{font:15px/1.6 monospace;margin:30px}pre{white-space:pre-wrap}a{color:#697680}.line{display:block}.line:target{background:#fff0a0}</style><a href="../index.html">← Experiment 49</a><h1>'+html.escape(name)+'</h1><p>'+commit+'<br>'+html.escape(path)+'</p><pre>'+''.join('<span class="line" id="L'+str(i)+'"><a href="#L'+str(i)+'">'+str(i)+'</a> '+html.escape(line)+'</span>' for i,line in enumerate(lines,1))+'</pre>'
    (OUT/'source'/(name+'.html')).write_text(doc)
(OUT/'source/manifest.json').write_text(json.dumps({'captured_at':datetime.now(timezone.utc).isoformat(),'files':records,'pin_lead':'48-fresh-reader-refresh-40/source-check/manifest.json; each blob freshly read with git show'},indent=2)+'\n')
for name in ['diff.patch','pr.json','files.txt']:
    (OUT/'source'/('127-'+name)).write_bytes((ROOT/'inputs/pr-127'/name).read_bytes())
print('Captured',len(records),'pinned source files and the #127 bundle record/diff/stat.')
