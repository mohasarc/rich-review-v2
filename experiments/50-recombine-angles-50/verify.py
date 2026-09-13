from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
from datetime import datetime, timezone
import hashlib, json, re, subprocess, sys

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
errors = []
pending = {'README.md', 'verification.json', 'browser-checks.json'} if '--draft' in sys.argv else set()

def check(condition, message):
    if not condition:
        errors.append(message)

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

class Page(HTMLParser):
    def __init__(self, content):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.scripts, self.forms = [], [], [], []
        self.feed(content)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.append(a['id'])
        if tag == 'a' and 'href' in a:
            self.links.append(a['href'])
        if tag in ['script', 'img', 'link']:
            uri = a.get('src', a.get('href'))
            if uri:
                self.links.append(uri)
        if tag == 'script':
            self.scripts.append(a)
        if tag == 'form':
            self.forms.append(a)

pages = {p: Page(p.read_text()) for p in OUT.rglob('*.html')}
link_count = 0
for path, page in pages.items():
    check(len(page.ids) == len(set(page.ids)), f'Duplicate IDs: {path.relative_to(OUT)}')
    check(not page.scripts and not page.forms, f'Unexpected script/form: {path.relative_to(OUT)}')
    for href in page.links:
        u = urlparse(href)
        if u.scheme or u.netloc:
            check(u.scheme in ['mailto', 'https'], f'Unexpected URI {href}')
            continue
        target = (path.parent / unquote(u.path)).resolve() if u.path else path
        if target.name in pending:
            continue
        check(target.exists(), f'Missing link: {path.relative_to(OUT)} → {href}')
        if u.fragment and target.suffix == '.html' and target in pages:
            check(unquote(u.fragment) in pages[target].ids,
                  f'Missing anchor: {path.relative_to(OUT)} → {href}')
        link_count += 1

seal = json.loads((OUT/'reading/seal.json').read_text())
for item in seal['files']:
    check(sha(OUT/item['path']) == item['sha256'], f'Sealed input changed: {item["path"]}')
sm = json.loads((OUT/'source/manifest.json').read_text())
for item in sm['files']:
    check(sha(OUT/item['path']) == item['sha256'], f'Pinned source changed: {item["path"]}')
check(sha(OUT/'source/diff.patch') == sm['patch_sha256'] == sm['bundle_patch_sha256'],
      'Bundle and pinned patch differ')
comparisons = json.loads((OUT/'comparisons.json').read_text())
ledger = json.loads((OUT/'experiment-ledger.json').read_text())
decisions = json.loads((OUT/'decisions.json').read_text())
coverage = json.loads((OUT/'coverage.json').read_text())
check(len(comparisons) == 40 and len({x['id'] for x in comparisons}) == 40, 'Expected 40 page rows')
check(len(ledger) == 46 and len({x['experiment'] for x in ledger}) == 46, 'Expected 46 experiment rows')
check(len(decisions) == 26 and len(coverage) == 153, 'Decision/file accounting mismatch')
note_rows = json.loads((OUT/'reading/page-only-notes.json').read_text())['rows']
for item in comparisons:
    original = next(x for x in note_rows if x['id'] == item['id'])
    check(item['sealed_note'] == original['page_learned'], f'Recall silently repaired: {item["id"]}')
for item in decisions:
    check(item['receipt'] in pages[OUT/'index.html'].ids, f'Unparented receipt: {item["id"]}')
    check('Stated:' in item['reason'] or 'Unexplained:' in item['reason'], f'Missing reason status: {item["id"]}')
for item in coverage:
    check(all(x in {d['id'] for d in decisions} for x in item['decisions']), 'Unknown decision assignment')
for item in json.loads((OUT/'source/excerpts.json').read_text()):
    source = next(x for x in sm['files'] if x['side'] == item['side'] and x['git_path'] == item['git_path'])
    check(1 <= item['first'] <= item['last'] <= source['lines'], f'Bad excerpt range: {item}')
    check(source['sha256'] == item['sha256'], 'Excerpt source identity mismatch')
manifest = json.loads((OUT/'manifest.json').read_text())
drift = []
for item in manifest['pages']:
    if sha(ROOT/item['path']) != item['sha256']:
        drift.append(item['path'])

if '--draft' not in sys.argv:
    readme = (OUT/'README.md').read_text()
    headings = re.findall(r'^## (.+)$', readme, re.M)
    expected = ['Entry point', 'Kind', 'Subjects', 'Declared choices', 'What I tried',
                'What I would drop', 'What I would do next', 'Time spent']
    check(headings[:8] == expected, 'README front headings differ from contract')
    for label in ['Role framing', 'Box lenses', 'Opening style', 'Shape', 'Navigation',
                  'Trust posture', 'Persona', 'Representations used', 'Importance rule',
                  'Inputs used (beyond bundle)', 'Tech', 'Built on earlier experiment(s)']:
        check(f'- {label}:' in readme, f'Missing declared choice: {label}')
    browser = json.loads((OUT/'browser-checks.json').read_text())
    check(not browser['errors'], 'Browser checks reported errors')

status = {}
for worktree in ['pr-148-base', 'pr-148-head']:
    result = subprocess.check_output(['git','-C',str(ROOT/'worktrees'/worktree),'status','--porcelain','--untracked-files=no']).decode().strip()
    status[worktree] = result or 'no tracked changes'
    check(not result, f'Tracked worktree changes observed: {worktree}')

result = {'checked_at': datetime.now(timezone.utc).isoformat(), 'draft': bool(pending),
    'errors': errors, 'html_files': len(pages), 'local_links_and_anchors': link_count,
    'sealed_files': len(seal['files']), 'pinned_source_files': len(sm['files']),
    'source_excerpts': len(json.loads((OUT/'source/excerpts.json').read_text())),
    'page_rows': len(comparisons), 'experiment_rows': len(ledger), 'decisions': len(decisions),
    'changed_path_assignments': len(coverage), 'earlier_entry_drift': drift, 'worktrees': status,
    'limits': 'Artifact identity, navigation, and authored coverage checks; no automated semantic completeness or human-understanding result. Symnav was not built, run, tested, or edited.'}
(OUT/'verification.json').write_text(json.dumps(result, indent=2)+'\n')
print(json.dumps(result, indent=2))
sys.exit(bool(errors))
