#!/usr/bin/env python3
"""Check this written handoff's local links and census, without grading pages."""
from pathlib import Path
import hashlib
import json
import re
from datetime import datetime, timezone
from urllib.parse import unquote

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent


def anchors(path):
    if path.suffix not in {'.md', '.html'}:
        return None
    content = path.read_text()
    result = set(re.findall(r'\bid=["\']([^"\']+)["\']', content))
    if path.suffix == '.md':
        seen = {}
        for title in re.findall(r'^#{1,6}\s+(.+)$', content, re.M):
            slug = re.sub(r'[^\w\- ]', '', title.strip().lower()).replace(' ', '-')
            count = seen.get(slug, 0)
            seen[slug] = count + 1
            result.add(slug + (f'-{count}' if count else ''))
    return result


links = []
bad = []
for filename in ['critique.md', 'experiment-ledger.md', 'inspection-notes.md', 'README.md']:
    path = HERE / filename
    if not path.exists():
        bad.append({'file': filename, 'problem': 'missing document'})
        continue
    for target in re.findall(r'\]\(([^)]+)\)', path.read_text()):
        target = target.strip().strip('<>')
        if re.match(r'[a-z]+://', target):
            continue
        rel, _, fragment = target.partition('#')
        resolved = (path.parent / unquote(rel)).resolve() if rel else path
        item = {'file': filename, 'target': target}
        links.append(item)
        if not resolved.exists():
            bad.append({**item, 'problem': 'missing target'})
        elif fragment and resolved.is_file():
            ids = anchors(resolved)
            if ids is not None and unquote(fragment) not in ids:
                bad.append({**item, 'problem': 'missing fragment'})

expected_headings = ['Entry point', 'Kind', 'Subjects', 'Declared choices', 'What I tried',
                     'What I would drop', 'What I would do next', 'Time spent']
readme = HERE / 'README.md'
headings = re.findall(r'^## (.+)$', readme.read_text(), re.M) if readme.exists() else []
ledger_numbers = re.findall(r'^\| \*\*(\d\d) ·', (HERE / 'experiment-ledger.md').read_text(), re.M)
census = json.loads((HERE / 'scope-final.json').read_text()) if (HERE / 'scope-final.json').exists() else None
expected_numbers = [x['experiment'][:2] for x in census['included']] if census else []
captures = [json.loads(p.read_text()) for p in (HERE / 'reading').glob('[0-9][0-9]-*.json')
            if p.name not in {'routes-1.json', 'routes-2.json', 'routes-3.json'}]
page_errors = [x for x in captures if isinstance(x, dict) and x.get('errors')]
result = {
    'at_utc': datetime.now(timezone.utc).isoformat(),
    'documents_checked': 4,
    'local_links_checked': len(links),
    'broken_links': bad,
    'readme_headings_match': headings == expected_headings,
    'brief_present': (HERE / 'brief.md').exists(),
    'ledger_entries': len(ledger_numbers),
    'ledger_matches_frozen_census': ledger_numbers == expected_numbers,
    'primary_html_capture_count': len(captures),
    'recorded_primary_page_errors': page_errors,
    'scope': 'Structural handoff checks only; no completeness or learning certification.'
}
(HERE / 'verification.json').write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps(result, indent=2))
