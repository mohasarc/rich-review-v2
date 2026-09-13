"""Artifact integrity checks. No symnav execution and no comprehension scores."""
from pathlib import Path
from datetime import datetime, timezone
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import hashlib,json,re,subprocess

OUT=Path(__file__).resolve().parent
ROOT=OUT.parents[1]
REPO=ROOT/'worktrees/pr-127-head'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
errors=[]
checks={}
def check(name,condition,detail=None):
    checks[name]={'passed':bool(condition),'detail':detail}
    if not condition: errors.append(name)

# Verify all reader responses before treating source comparisons as complete.
sealed=[]
for reader in ['R1','R2','R3','R4']:
    for phase in [1,2]:
        file=OUT/'readers'/reader/f'phase{phase}.md'
        seal=json.loads((file.parent/f'phase{phase}-seal.json').read_text())
        ok=sha(file)==seal['sha256']
        check(f'{reader}_phase{phase}_seal',ok)
        sealed.append({'reader':reader,'phase':phase,**seal})
    check(reader+'_source_response',(OUT/'readers'/reader/'phase3.md').is_file())
check('all_reader_phases',len(list((OUT/'readers').glob('R*/phase[123].md')))==12)

assignments=json.loads((OUT/'packets/assignments.json').read_text())
for a in assignments:
    for label,filename in [('top',a['reader']+'-top.md'),('descent',a['reader']+'-descent.md')]:
        check(a['reader']+'_'+label+'_packet',sha(OUT/'packets'/filename)==a[label+'_sha256'])

manifest=json.loads((OUT/'variants/manifest.json').read_text())
different=[]
for page in ['23','29']:
    original=OUT/'variants/original'/page
    revised=OUT/'variants/revised'/page
    check(page+'_same_file_set',sorted(p.name for p in original.iterdir())==sorted(p.name for p in revised.iterdir()))
    for p in original.iterdir():
        if sha(p)!=sha(revised/p.name): different.append(page+'/'+p.name)
check('exactly_two_changed_files',sorted(different)==['23/app.js','29/index.html'],different)
for edit in manifest['edits']:
    before=(OUT/'variants/original'/edit['page']/edit['file']).read_text()
    after=(OUT/'variants/revised'/edit['page']/edit['file']).read_text()
    check(edit['page']+'_single_statement_edit',before.replace(edit['old'],edit['new'],1)==after)
    check(edit['page']+'_intervention_hash',hashlib.sha256(after.encode()).hexdigest()==edit['revised_sha256'])
for x in manifest['files']:
    # Original source files are untouched; revised copies differ only where declared.
    check('origin_'+x['origin'],sha(ROOT/x['origin'])==x['sha256'])
    if '/original/' in '/'+x['copy']:
        check('copy_'+x['copy'],sha(OUT/x['copy'])==x['sha256'])

rendered=json.loads((OUT/'captures/rendered.json').read_text())
for target in ['23-original-D13','23-original-D04','29-original-A1']:
    check(target+'_unchanged_on_descent',rendered['rows'][target]['text']==rendered['rows'][target.replace('original','revised')]['text'])
for page in ['23','29']:
    edit=next(e for e in manifest['edits'] if e['page']==page)
    before=rendered['rows'][page+'-original-top']['text']
    after=rendered['rows'][page+'-revised-top']['text']
    check(page+'_rendered_top_only_one_statement',before.replace(edit['old'],edit['new'],1)==after)

sources=json.loads((OUT/'source/manifest.json').read_text())
for s in sources['files']:
    blob=subprocess.check_output(['git','show',s['commit']+':'+s['path']],cwd=REPO)
    check('source_'+s['file'],hashlib.sha256(blob).hexdigest()==s['sha256']==sha(OUT/'source'/s['file']))
check('owner_implementation_same_at_127_and_tip',sha(OUT/'source/127-head-graph.ts')==sha(OUT/'source/stack-head-graph.ts'))
base='a1e325a5ff979bdfa25babc5554621c8c0f20497';head='64919bcbcf7fcc8202779b78c5f069b24662bb18'
testfile='packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts'
gitread=lambda rev,f:subprocess.check_output(['git','show',rev+':'+f],cwd=REPO,text=True)
b=gitread(base,testfile);h=gitread(head,testfile)
check('127_existing_test_bodies_preserved',b[b.index('  it('):] in h)
check('127_six_added_service_cases',len(re.findall(r'\bit\(',b))==5 and len(re.findall(r'\bit\(',h))==11)
check('127_four_scope_cases',len(re.findall(r'\bit\(',gitread(head,'packages/core/src/backend/turn-scoped-cache-scope.test.ts')))==4)

class HTML(HTMLParser):
    def __init__(self): super().__init__();self.ids=set();self.refs=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if 'id' in d:self.ids.add(d['id'])
        for key in ['src','href']:
            if key in d:self.refs.append(d[key])
html_cache={}
def parse(f):
    if f not in html_cache:
        p=HTML();p.feed(f.read_text());html_cache[f]=p
    return html_cache[f]
missing=[]
for file in OUT.rglob('*.html'):
    for ref in parse(file).refs:
        u=urlparse(ref)
        if u.scheme:continue
        dest=(file.parent/unquote(u.path)).resolve() if u.path else file
        if dest==OUT/'verification.json': continue
        if not dest.exists(): missing.append({'file':str(file.relative_to(OUT)),'ref':ref});continue
        # Zoom canvas fragment nodes are created by JS and separately browser-tested.
        dynamic='/variants/' in str(dest) and dest.parent.name=='23'
        if u.fragment and dest.suffix=='.html' and not dynamic and unquote(u.fragment) not in parse(dest).ids:
            missing.append({'file':str(file.relative_to(OUT)),'ref':ref,'problem':'fragment'})
check('local_html_links',not missing,missing)

browser=json.loads((OUT/'captures/browser-verification.json').read_text())
check('browser_no_runtime_errors',not browser['errors'])
check('all_six_descents_return',sum(1 for r in browser['results'] if r.get('returned') is True)==6)
check('canvas_outline_text_fits',all(not r.get('clipped') for r in browser['results']))
check('report_desktop_and_mobile',len([r for r in browser['results'] if r.get('page')==49 and not r['overflow']])==2)

statuses={}
for tree in ['pr-127-base','pr-127-head']:
    statuses[tree]=subprocess.check_output(['git','status','--porcelain'],cwd=ROOT/'worktrees'/tree,text=True)
check('assigned_worktrees_clean',all(not value for value in statuses.values()),statuses)
check('brief_matches_assigned_queue',(OUT/'brief.md').read_bytes()==(ROOT/'queue/running/49-follow-next-49.md').read_bytes() if (ROOT/'queue/running/49-follow-next-49.md').exists() else True)
required=['## Entry point','## Kind','## Subjects','## Declared choices','## What I tried','## What I would drop','## What I would do next','## Time spent']
readme=(OUT/'README.md').read_text()
check('readme_contract',all(h in readme for h in required))

report={'checked_at':datetime.now(timezone.utc).isoformat(),'passed':not errors,'errors':errors,'checks':checks,'sealed_responses':sealed,'browser_receipt':'captures/browser-verification.json','limit':'Integrity, navigation and content-fit checks only; no symnav tests, exhaustive semantic audit, or reader scores.'}
(OUT/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'passed':not errors,'errors':errors,'checks':len(checks)},indent=2))
raise SystemExit(bool(errors))
