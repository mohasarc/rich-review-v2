"""Mechanical handoff checks only; not a semantic or learner evaluation."""
from datetime import datetime, timezone
from hashlib import sha256
from pathlib import Path
import json
import re
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parent.parent
HEADINGS = ['Entry point', 'Kind', 'Subjects', 'Declared choices', 'What I tried',
            'What I would drop', 'What I would do next', 'Time spent']
DECLARATIONS = ['Role framing', 'Box lenses', 'Opening style', 'Shape', 'Navigation',
                'Trust posture', 'Persona', 'Representations used', 'Importance rule',
                'Inputs used (beyond bundle)', 'Tech', 'Built on earlier experiment(s)']
issues = []
documents = ['README.md', 'brief.md', 'critique.md', 'experiment-ledger.md', 'inspection-notes.md']
contents = {}
for name in documents:
    p = OUT / name
    if not p.is_file() or not p.read_text().strip():
        issues.append(f'Missing or empty document: {name}')
    else:
        contents[name] = p.read_text()

readme = contents.get('README.md', '')
if re.findall(r'^## (.+)$', readme, re.M) != HEADINGS:
    issues.append('README headings differ from section 7')
if not readme.startswith('# critique-refresh-70\n'):
    issues.append('README title differs from assigned slug')
for label in DECLARATIONS:
    if f'- {label}:' not in readme:
        issues.append(f'Missing declaration: {label}')

scope = json.loads((OUT / 'scope-final.json').read_text())
finished = [r for r in scope['records'] if r['readme_present']]
expected = {r['experiment'] for r in finished}
ledger_links = re.findall(r'\]\(\.\./(\d+-[^/]+)/README\.md\)', contents.get('experiment-ledger.md', ''))
if set(ledger_links) != expected or len(ledger_links) != len(expected):
    issues.append('Ledger does not have exactly one README row for each finished experiment')

links = []
for name, content in contents.items():
    for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)', content):
        target = target.strip().strip('<>')
        if target.startswith(('https://', 'http://', '#', 'mailto:')):
            continue
        path = target.split('#', 1)[0]
        # verification.json is this successful command's own output.
        if path and path != 'verification.json' and not (OUT / path).exists():
            issues.append(f'Broken link in {name}: {target}')
        links.append({'document': name, 'target': target})

captures = []
for name in ['reading/manifest.json', 'reading/manifest-selected.json']:
    data = json.loads((OUT / name).read_text())
    captures.extend(data['entries'])
for entry in captures:
    if entry.get('error') or entry.get('errors'):
        issues.append(f'Capture error: {entry}')
    for suffix in ['.txt', '.json', '.png']:
        if not (OUT / 'reading' / (entry['key'] + suffix)).is_file():
            issues.append(f'Missing capture receipt: {entry["key"]}{suffix}')
if len(captures) != 78 or len({e['folder'] for e in captures}) != 66:
    issues.append('HTML capture accounting differs from 78 entries / 66 primary folders')

operations = []
for name in ['operations/manifest.json', 'operations/recheck-manifest.json']:
    data = json.loads((OUT / name).read_text())
    operations.extend(data['events'])
for event in operations:
    if event.get('error') or event.get('errors'):
        issues.append(f'Operation error: {event}')
    if event.get('label'):
        for suffix in ['.txt', '.json', '.png']:
            if not (OUT / 'operations' / f'{event["n"]}-{event["label"]}{suffix}').is_file():
                issues.append(f'Missing operated-state receipt: {event["n"]}-{event["label"]}{suffix}')
if len(operations) != 31:
    issues.append('Operated-state accounting differs from 27 original + 4 corrected states')

html = [str(p.relative_to(OUT)) for p in OUT.rglob('*.html')]
if html:
    issues.append(f'Unexpected page artifacts in critique folder: {html}')
large_files = [str(p.relative_to(OUT)) for p in OUT.rglob('*')
               if p.is_file() and p.stat().st_size > 20_000_000]
if large_files:
    issues.append(f'Files exceed the playbook storage threshold: {large_files}')

changed_readmes = []
for record in finished:
    current = (OUT.parent / record['experiment'] / 'README.md').read_bytes()
    if sha256(current).hexdigest() != record['readme_sha256']:
        changed_readmes.append(record['experiment'])
worktree_status = {
    name: subprocess.check_output(['git', '-C', str(ROOT / 'worktrees' / name),
                                   'status', '--short', '--untracked-files=no'], text=True)
    for name in ['stack-head', 'main']
}
result = {
    'checked_utc': datetime.now(timezone.utc).isoformat(),
    'kind': 'Mechanical handoff verification; not semantic validation or a reader study.',
    'passed': not issues,
    'issues': issues,
    'frozen_census_utc': scope['captured_utc'],
    'finished_experiments': len(finished),
    'ledger_rows': len(ledger_links),
    'finished_queue_done': sum(r['queue_done'] for r in finished),
    'html_entries': len(captures),
    'primary_html_folders': len({e['folder'] for e in captures}),
    'operation_states_including_corrected_operator_attempts': len(operations),
    'local_links_checked': len(links),
    'html_artifacts_created': html,
    'readmes_changed_since_census': changed_readmes,
    'tracked_worktree_status': worktree_status,
    'document_sha256': {name: sha256(text.encode()).hexdigest() for name, text in contents.items()},
    'word_counts': {name: len(text.split()) for name, text in contents.items()},
}
(OUT / 'verification.json').write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps(result, indent=2))
raise SystemExit(0 if result['passed'] else 1)
