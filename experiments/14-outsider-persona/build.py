"""Freeze evidence from the supplied stack; writes only beside this script."""
from pathlib import Path
import collections
import json
import re
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parent.parent
REPO = ROOT / 'worktrees/stack-head'
BUNDLE = ROOT / 'inputs/stack'
stack = json.loads((BUNDLE / 'pr.json').read_text())
BASE, HEAD = stack['base'], stack['head']

def git(*args):
    return subprocess.check_output(['git', *args], cwd=REPO, text=True)

def read(rev, path):
    return git('show', f'{rev}:{path}') if path else ''

files = []
for row in git('diff', '--name-status', '-M', BASE, HEAD).splitlines():
    status, *paths = row.split('\t')
    before = None if status == 'A' else paths[0]
    after = None if status == 'D' else paths[-1]
    patch = git('diff', '-M', '--unified=4', BASE, HEAD, '--', *dict.fromkeys(paths))
    files.append(dict(status=status, beforePath=before, afterPath=after,
                      before=read(BASE, before), after=read(HEAD, after), diff=patch,
                      added=sum(x.startswith('+') and not x.startswith('+++') for x in patch.splitlines()),
                      deleted=sum(x.startswith('-') and not x.startswith('---') for x in patch.splitlines())))

extra = ['README.md', 'plans/005/daemon-architecture-functional-spec.md',
         'plans/005/daemon-functional-spec.md', 'plans/000/symnav-functional-spec.md',
         'packages/core/src/workspace/workspace-catalog.ts',
         'packages/core/src/backend/backend-router.ts']
for path in extra:
    if any(path in (f['beforePath'], f['afterPath']) for f in files):
        continue
    files.append(dict(status='context', beforePath=path, afterPath=path,
                      before=read(BASE,path), after=read(HEAD,path), diff='', added=0, deleted=0))

copy_test_commit = 'cef673008deef942b379543be48307ec2379d6b6'
copy_test_path = 'meta-tests/src/daemon-compatibility-copy.test.ts'
files.append(dict(status='stage', beforePath='@148/source-copy-test', afterPath='@148/source-copy-test',
    before=read(copy_test_commit+'^',copy_test_path),after=read(copy_test_commit,copy_test_path),
    diff=git('show','--format=',copy_test_commit,'--',copy_test_path),added=1,deleted=1,
    label='During #148: meta-tests/src/daemon-compatibility-copy.test.ts',
    beforeRevision=git('rev-parse',copy_test_commit+'^').strip(),afterRevision=copy_test_commit))

prs = []
for p in stack['pullRequests']:
    section = re.search(r'^## Decisions\s*\n([\s\S]*?)(?=^## |\Z)', p['body'], re.M)
    decisions = []
    for i, line in enumerate(re.findall(r'^- (.+)$', section.group(1), re.M)):
        choice, sep, reason = line.partition(', because ')
        decisions.append(dict(id=f'd{p["number"]}-{i+1}', choice=choice,
                              reason=reason, status='stated' if sep else 'unexplained', original=line))
    prs.append(dict(number=p['number'], title=p['title'], body=p['body'],
                    decisions=decisions, commits=p['commits']))

pattern = re.compile(r'\b(?:it|test)(?:\.(?:skip|todo|only|each|concurrent))*\s*\(\s*([\'"`])([^\n]*?)\1')
def test_titles(rev):
    titles = collections.defaultdict(list)
    for path in git('ls-tree','-r','--name-only',rev).splitlines():
        if not re.search(r'\.(?:test|spec)\.[cm]?[jt]sx?$',path):
            continue
        for match in pattern.finditer(read(rev,path)):
            titles[match.group(2)].append(path)
    return titles

before_titles, after_titles = test_titles(BASE), test_titles(HEAD)
missing_titles = [dict(title=t, paths=before_titles[t]) for t in sorted(before_titles.keys()-after_titles.keys())]
policy_source = read(HEAD,'plans/005/daemon-policy.md')
policies=[]
for line in policy_source.splitlines():
    if not line.startswith('| `'):
        continue
    parts = [p.strip() for p in line.strip('|').split('|')]
    if len(parts)==5:
        policies.append(dict(path=parts[0].strip('`'),value=parts[1],applies=parts[2],reason=parts[3],oracle=parts[4]))

data=dict(base=BASE, head=HEAD, prs=prs, files=files, policy=policies,
          stats=git('diff','--shortstat','-M',BASE,HEAD).strip(),
          missingTests=missing_titles,
          testTitleCounts=dict(before=len(before_titles),after=len(after_titles),missing=len(missing_titles)),
          decisionCount=sum(len(p['decisions']) for p in prs))
(OUT/'evidence.js').write_text('window.EVIDENCE = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n')
(OUT/'evidence-manifest.json').write_text(json.dumps(dict(base=BASE,head=HEAD,
    pullRequests=[p['number'] for p in prs],decisionCount=data['decisionCount'],
    changedFiles=sum(f['status'] not in ('context','stage') for f in files), sourcePairs=len(files),testTitleCounts=data['testTitleCounts'],
    policyRows=len(policies),stats=data['stats']),indent=2)+'\n')
print(f'Frozen {len(files)} source pairs, {data["decisionCount"]} stated choices, {len(policies)} policy rows, {len(missing_titles)} absent test titles.')
