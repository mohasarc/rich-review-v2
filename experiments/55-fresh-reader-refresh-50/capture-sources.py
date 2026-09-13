"""Read pinned git objects; all writes are confined to experiment 55."""
from pathlib import Path
import subprocess, json, hashlib, datetime
ROOT=Path('/Users/moyaseen/projects/rich-review-v2')
OUT=Path(__file__).parent
GIT=ROOT/'worktrees/stack-head'
def git(*args):
    return subprocess.check_output(['git',*args],cwd=GIT)
def save(name,data):
    p=OUT/'evidence'/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
    return {'path':str(p.relative_to(OUT)),'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)}
manifest=[]
bundle=json.loads((ROOT/'inputs/stack/pr.json').read_text())
manifest.append(save('stack-pr.json',(ROOT/'inputs/stack/pr.json').read_bytes()))
manifest.append(save('stack.patch',(ROOT/'inputs/stack/diff.patch').read_bytes()))
pairs={
 '127':('a1e325a5ff979bdfa25babc5554621c8c0f20497','64919bcbcf7fcc8202779b78c5f069b24662bb18'),
 '131':('b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e','b100221db48754656328391b878299c5a0bab443'),
 '148':('ba53c8e1662fd86d198b95321c90d9c9bef10184','20838f8dbf413e04767543eb2380d0d114da6c60'),
 '146':('b8e8b7b8','f79ba362'),
 '147':('f79ba362','ba53c8e1'),
 'stack':('b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e','d07002357d3e9596bfaae910a1ac63b77981620b')
}
inventory={}
for key,(base,head) in pairs.items():
    base=git('rev-parse',base).decode().strip();head=git('rev-parse',head).decode().strip()
    patch=git('diff','--find-renames',base,head)
    if key!='stack':manifest.append(save(f'pr-{key}.patch',patch))
    inventory[key]={'base':base,'head':head,'numstat':git('diff','--numstat','--find-renames',base,head).decode(),'patch_lines':patch.count(b'\n')}
    print(key,base[:8],head[:8],len(patch),'bytes',patch.count(b'\n'),'lines')
    if key in ['127','131','148']:
        pr=next(p for p in bundle['pullRequests'] if p['number']==int(key))
        manifest.append(save(f'pr-{key}-body.md',pr['body'].encode()))
        manifest.append(save(f'pr-{key}-commits.json',json.dumps(pr.get('commits',[]),indent=2).encode()))
manifest.append(save('diff-inventory.json',json.dumps(inventory,indent=2).encode()))
(OUT/'source-capture.json').write_text(json.dumps({'time_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'files':manifest},indent=2)+'\n')
