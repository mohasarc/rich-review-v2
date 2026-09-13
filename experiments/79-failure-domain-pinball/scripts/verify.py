from pathlib import Path
import hashlib, json, subprocess, re

out=Path(__file__).resolve().parents[1]
root=out.parents[1]
sources=json.loads((out/'evidence/sources.json').read_text())
evidence=json.loads((out/'evidence/receipts.json').read_text())
observations=json.loads((out/'evidence/observations.json').read_text())
checks=[]
for key,source in sources.items():
    build=key.split(':',1)[0]
    wt=root/'worktrees'/('stack-head' if build=='head' else 'main')
    raw=(wt/source['path']).read_bytes()
    assert hashlib.sha256(raw).hexdigest()==source['sha256']
    assert raw.decode()==source['text']
for r in evidence['receipts'].values():
    lines=sources[r['source']]['text'].splitlines()
    assert r['text']=='\n'.join(lines[r['start']-1:r['end']])
checks.append(f"{len(sources)} source hashes and {len(evidence['receipts'])} exact excerpts match pinned worktrees")
assert len(observations['transport'])==18
assert observations['policy']=={'reattach':1,'fetch':1}
checks.append('18 method recordings; independent policy defaults both one')
html=(out/'index.html').read_text()
assert len(re.findall(r'<li id="rule-',html))==7
for ref in re.findall(r'(?:src|href)="([^"#]+)"',html):
    if ref.startswith(('data:','http')):continue
    assert (out/ref).exists(),ref
checks.append('Seven visible root rules; static local asset and navigation targets exist')
for rid in re.findall(r'data-receipt="([^"]+)"',html):assert rid in evidence['receipts']
for name in ['brief.md','vendor/phaser-3.90.0.min.js','vendor/PHASER-LICENSE.md','package-lock.json']:
    assert (out/name).exists()
assert '95 passed' in (out/'evidence/focused-tests.txt').read_text()
inventory=json.loads((out/'evidence/test-inventory.json').read_text())
assert all(r['fromFirstDescribeByteIdentical'] for r in inventory)
checks.append('Focused existing suites: 95 passed; three authority test bodies unchanged since introduction')
worktrees={}
for name in ['main','stack-head']:
    status=subprocess.check_output(['git','-C',str(root/'worktrees'/name),'status','--porcelain'],text=True)
    assert status=='',f'{name} is not clean: {status}'
    worktrees[name]=status
checks.append('Both worktrees clean, including untracked files')
(out/'evidence/static-checks.json').write_text(json.dumps({'passed':True,'checks':checks,'worktrees':worktrees},indent=2)+'\n')
print('\n'.join(checks))
