from pathlib import Path
import json, hashlib, subprocess, html

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[1]
PINS = {'base':'ba53c8e1662fd86d198b95321c90d9c9bef10184','head':'20838f8dbf413e04767543eb2380d0d114da6c60'}
FILES = {
 'policy': ('head','packages/daemon/src/client/daemon-routing-policy.ts'),
 'tests': ('head','packages/daemon/src/client/daemon-routing-policy.test.ts'),
 'runtime': ('head','packages/daemon/src/client/daemon-client-runtime.ts'),
 'client-tests': ('head','packages/daemon/src/client/daemon-client.test.ts'),
 'before': ('base','apps/cli/src/daemon/daemon-command-dispatcher.ts'),
 'compatibility': ('head','apps/cli/src/daemon/daemon-command-dispatcher.ts'),
 'before-tests': ('base','apps/cli/src/daemon/daemon-command-dispatcher.test.ts'),
 'compatibility-tests': ('head','apps/cli/src/daemon/daemon-command-dispatcher.test.ts'),
 'architecture': ('head','plans/005/daemon-architecture-functional-spec.md'),
 'product': ('head','plans/005/daemon-functional-spec.md'),
}
sources={}
for key,(side,path) in FILES.items():
    worktree=ROOT/'worktrees'/('pr-148-'+side)
    contents=(worktree/path).read_bytes()
    pinned=subprocess.check_output(['git','show',PINS[side]+':'+path],cwd=worktree)
    assert contents==pinned, path
    sources[key]={'key':key,'side':side,'path':path,'sha':PINS[side], 'sha256':hashlib.sha256(contents).hexdigest(),'lines':contents.decode().splitlines()}
pr=json.loads((ROOT/'inputs/pr-148/pr.json').read_text())
sources['intent']={'key':'intent','side':'bundle','path':'inputs/pr-148/pr.json → body','sha':PINS['head'],'sha256':hashlib.sha256(pr['body'].encode()).hexdigest(),'lines':pr['body'].splitlines()}
assert sources['before']['sha256']==sources['compatibility']['sha256'], 'Active CLI dispatcher changed'
assert sources['before-tests']['sha256']==sources['compatibility-tests']['sha256'], 'Active CLI dispatcher tests changed'
test_paths=[FILES['tests'][1],FILES['client-tests'][1]]
inventory={p:subprocess.check_output(['git','diff','--numstat',PINS['base'],PINS['head'],'--',p],cwd=ROOT/'worktrees/pr-148-head',text=True).strip() for p in test_paths}
result={'pins':PINS,'sources':sources,'inventory':inventory,'compatibilityDispatcherIdentical':True,'compatibilityDispatcherTestsIdentical':True}
(OUT/'evidence/sources.json').write_text(json.dumps(result,indent=2)+'\n')
(OUT/'sources.js').write_text('window.SOURCES = '+json.dumps(result)+';\n')
style='body{margin:40px auto;max-width:1050px;padding:0 22px;background:#f4f3eb;color:#162b2c;font:15px system-ui}a{color:#0b6966}section{margin:64px 0}pre{overflow:auto;background:#fff;padding:20px;font:13px/1.7 monospace}p{overflow-wrap:anywhere}.line:target{background:#ffe5a0}.line{display:block}.n{display:inline-block;width:4em;color:#81928c;user-select:none}'
page='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Source receipts · Microscope 68</title><style>'+style+'</style><body><a href="index.html">← Return to microscope</a><h1>Pinned source receipts</h1><p>PR #148 · Base '+PINS['base']+' → head '+PINS['head']+'. Excerpts in the instrument link here. This is source evidence, not a production trace.</p><nav>'
page+=' · '.join('<a href="#'+k+'">'+html.escape(k)+'</a>' for k in sources)+'</nav>'
for k,s in sources.items():
    page+='<section id="'+k+'"><h2>'+html.escape(s['path'])+'</h2><p>'+s['side']+' · '+s['sha']+'<br>SHA-256 '+s['sha256']+'</p><pre>'
    page+='\n'.join('<span class="line" id="'+k+'-L'+str(i)+'"><a class="n" href="#'+k+'-L'+str(i)+'">'+str(i)+'</a>'+html.escape(line)+'</span>' for i,line in enumerate(s['lines'],1))+'</pre></section>'
(OUT/'source-book.html').write_text(page+'</body></html>')
print('Captured',len(sources),'pinned sources; active CLI dispatcher byte-identical; focused test inventory:',inventory)
