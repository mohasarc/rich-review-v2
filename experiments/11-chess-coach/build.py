#!/usr/bin/env python3
"""Build the offline page and source snapshots. Reads worktrees, writes only this folder."""
import hashlib
import html
import json
import re
import subprocess
from pathlib import Path
from content import MOVES, S, D, H, P

OUT = Path(__file__).resolve().parent
ROOT = OUT.parent.parent
BUNDLE = ROOT / 'inputs/pr-131'
TREES = {side: ROOT / f'worktrees/pr-131-{side}' for side in ['base', 'head']}
SHA = {side: subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=tree, text=True).strip() for side, tree in TREES.items()}
assert SHA['base'] == 'b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e'
assert SHA['head'] == 'b100221db48754656328391b878299c5a0bab443'
EVIDENCE = OUT / 'evidence'
EVIDENCE.mkdir(exist_ok=True)
PATCH = (BUNDLE / 'diff.patch').read_text()
DIFFS = {}
for piece in PATCH.split('diff --git ')[1:]:
    path = piece.splitlines()[0].split(' b/')[1]
    DIFFS[path] = 'diff --git ' + piece
assert len(DIFFS) == 60
PR = json.loads((BUNDLE / 'pr.json').read_text())
ES = html.escape


def source_name(path):
    return path.replace('/', '__') + '.html'


def href(path, side=None, line=None):
    fragment = f'#{side}-L{line}' if line else ''
    return 'evidence/' + source_name(path) + fragment


def source(path, side):
    file = TREES[side] / path
    return file.read_text() if file.exists() else ''


def numbered(text, prefix=''):
    return ''.join(f'<span class="code-line"{f" id={prefix}-L{i}" if prefix else ""}><span class="line-no">{i}</span>{ES(line)}</span>' for i, line in enumerate(text.splitlines(), 1))


def excerpt(reference):
    path, side = reference['path'], reference['side']
    lines = source(path, side).splitlines()
    hits = [i for i, line in enumerate(lines) if reference['needle'] in line]
    if not hits:
        raise ValueError(f'Missing source anchor: {side} {path} {reference["needle"]!r}')
    index = hits[0]
    lo, hi = max(0, index-reference['before']), min(len(lines), index+reference['after']+1)
    snippet = ''.join(f'<span class="code-line"><span class="line-no">{i+1}</span>{ES(lines[i])}</span>' for i in range(lo, hi))
    reference['resolved_line'] = index+1
    reference['resolved_start'] = lo+1
    reference['resolved_end'] = hi
    return f'''<figure class="evidence-excerpt"><figcaption><span class="source-badge">{side} {SHA[side][:8]}</span><a href="{href(path, side, index+1)}">{ES(path)}:{index+1} ↗</a></figcaption><pre><code>{snippet}</code></pre>{f'<p class="snippet-note">{ES(reference["note"])}</p>' if reference['note'] else ''}</figure>'''


def status(move):
    return f'<span class="status {move["status"]}">{move["status"]}</span>'


def row(move):
    num = move['id']
    return f'''<article class="move-row" id="row-{num}" aria-labelledby="move-title-{num}">
<div class="move-main"><div class="move-label"><span class="group">{ES(move['group'])}</span><a href="#analysis-{num}" id="move-title-{num}"><span class="move-number">{num}</span><span>{ES(move['title'])}</span></a>{status(move)}</div><div class="move-played"><span class="fork-label">Played</span><p>{ES(move['played'])}</p></div><div class="move-alternative"><span class="fork-label">{ES(move['alternative_kind'])}</span><p>{ES(move['alternative'])}</p></div></div>
<div class="move-foot"><p>{ES(move['stake'])}</p><p class="scope">{ES(move['scope'])}</p><div class="reason-line"><p><strong>{'Reason on record' if move['status']=='stated' else 'Reason not found'}:</strong> {ES(move['reason'])}</p><a href="#analysis-{num}" aria-label="Analyze move {num}: {ES(move['title'])}">Analyze {num} ↗</a></div></div></article>'''


def timeout_lab():
    lanes = [('Played · status observer', 100), ('Played · ordinary', 250), ('Variation · kind-only rule', 250)]
    tracks = ''.join(f'<div class="timing-lane" data-deadline="{deadline}"><span>{ES(label)}<br><strong>{deadline} ms</strong></span><div class="timing-track" aria-hidden="true"><div class="timing-allowed" style="width:{deadline/6}%"></div><div class="reply-mark"></div></div><output class="lab-result"></output></div>' for label, deadline in lanes)
    return f'''<div class="lab"><h4>Same identify message. A different job.</h4><p class="model-label">Illustrative timer comparison, not a symnav execution. The hypothetical kind-only rule uses 250 ms for identify in both caller contexts.</p><div class="lab-controls"><label for="reply-delay">Reply arrives after</label><input id="reply-delay" type="range" min="0" max="600" value="150" step="10"><output for="reply-delay" id="reply-delay-value">150 ms</output></div>{tracks}<p class="lab-foot">Teal = time before the selected limit. Ochre marker = reply. Actual code uses socket inactivity timers; this model assumes no earlier I/O. *At an exact boundary, scheduling is omitted.</p></div>'''


def spill_lab():
    return '''<div class="lab"><h4>“The directory is empty” can describe two paths.</h4><p class="model-label">Illustrative evaluation of the source’s rawBytes &gt; inlineBytes condition. The transport helper’s legacy inline option is 0; the head maps it to 64 KiB.</p><div class="lab-controls"><span class="model-label">Captured output:</span><div class="segmented" aria-label="Illustrative captured output"><button type="button" data-spill-bytes="65536" aria-pressed="true">64 KiB</button><button type="button" data-spill-bytes="65537" aria-pressed="false">64 KiB + 1 B</button></div></div><div class="spill-results"><div class="spill-result"><strong>BASE · INLINE = 0</strong><output id="spill-base">Spills to a file</output><small>Directory is created as part of spilling.</small></div><div class="spill-result"><strong>HEAD ADAPTER · INLINE = 64 KiB</strong><output id="spill-head">Stays inline</output><small>Helper creates the directory before execution.</small></div></div><p id="spill-consequence" class="lab-foot"></p></div>'''


def analysis(move, index):
    num = move['id']
    paths = ''.join(f'<li>{ES(step)}</li>' for step in move['line'])
    variants = ''.join(f'<li>{ES(step)}</li>' for step in move['variation'])
    snippets = ''.join(excerpt(reference) for reference in move['evidence'])
    lab = timeout_lab() if move.get('lab') == 'timeout' else spill_lab() if move.get('lab') == 'spill' else ''
    prev = f'<a href="#analysis-{MOVES[index-1]["id"]}">← Previous move</a>' if index else '<a href="#position">← Position map</a>'
    next_link = f'<a href="#analysis-{MOVES[index+1]["id"]}">Next move →</a>' if index+1 < len(MOVES) else '<a href="evidence/coverage.html">File coverage →</a>'
    reason_href = 'evidence/pr.html' if move['reason_source'].startswith('PR') else href('plans/005/daemon-policy.md')
    reason_link = f'<a href="{reason_href}">{ES(move["reason_source"])} ↗</a>' if move['status']=='stated' else ES(move['reason_source'])
    return f'''<details class="analysis-card" id="analysis-{num}"{' open' if index==0 else ''}><summary><span class="move-number">{num}</span><span>{ES(move['title'])}</span>{status(move)}</summary><div class="analysis-content"><div class="analysis-reason"><strong>{'Reason on record' if move['status']=='stated' else 'Reason not found'}</strong><p>{ES(move['reason'])}<small>{reason_link}</small></p></div><div class="variation-pair"><div class="variation actual"><h4>Move played · mechanism isolated</h4><ol>{paths}</ol></div><div class="variation hypothetical"><h4>{ES(move['alternative_kind'])}</h4><ol>{variants}</ol></div></div><p class="analysis-stake">{ES(move['stake'])}</p>{lab}<div class="coach-question"><span>Hold this question in your head</span><p>{ES(move['question'])}</p></div><details class="evidence-pack"><summary>Check the position · {len(move['evidence'])} source excerpts</summary>{snippets}<p class="model-label">Excerpts are verbatim, line-numbered snapshots. Open the path for the full diff and both file versions.</p></details><div class="move-navigation">{prev}<a href="#row-{num}">↑ Back to move {num}</a>{next_link}</div></div></details>'''


EXTRA_PATHS = ['plans/005/daemon-policy.md', 'plans/005/daemon-architecture-functional-spec.md', P+'daemon-policy.ts', P+'daemon-policy.test.ts', P+'policy-testing.ts', S+'program.ts']


def file_moves(path):
    explicit = [move['id'] for move in MOVES if any(reference['path'] == path for reference in move['evidence'])]
    if explicit:
        return explicit
    if path.startswith(H):
        return ['16']
    if '/test/' in path or path.endswith('.test.ts'):
        if 'result-chunk-codec' in path or 'worker-protocol' in path:
            return ['03', '04', '16']
        if 'diagnostic' in path:
            return ['15', '16']
        return ['16']
    if path == D+'daemon-command-dispatcher.ts':
        return ['01']
    return ['01']


SOURCE_STYLE = '''*{box-sizing:border-box}html{scroll-padding-top:20px}body{max-width:1400px;margin:0 auto;padding:28px;font:15px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#20302e;background:#f5f2e9}a{color:#19645b;text-underline-offset:3px}nav{display:flex;gap:22px;margin-bottom:25px;flex-wrap:wrap}h1{font:34px/1.3 Georgia;overflow-wrap:anywhere}h2{font:25px Georgia}p{max-width:1000px}small{font-size:12px;color:#58615a}.code-line{display:block;min-height:1.65em}.code-line:target{background:#f6d9a3;outline:2px solid #8a5522}.line-no{display:inline-block;color:#7b8377;min-width:48px;margin-right:20px;text-align:right;user-select:none}pre{font:12px/1.65 SFMono-Regular,Consolas,monospace;overflow:auto;background:#fffef9;padding:16px;border:1px solid #cbcfc2;tab-size:2}details{margin:20px 0}summary{font-size:17px;cursor:pointer;background:#e4eee7;padding:13px}.diff-add{background:#e4eee7}.diff-remove{background:#f1e5d2}.diff-header{color:#19645b}table{width:100%;border-collapse:collapse;font-size:13px}th,td{text-align:left;padding:11px;border-bottom:1px solid #cbcfc2;vertical-align:top}td:first-child{overflow-wrap:anywhere}th{background:#e4eee7}.move-list{display:flex;gap:9px;flex-wrap:wrap}.prose{white-space:pre-wrap;overflow-wrap:anywhere;font:14px/1.65 -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif}a:focus-visible,summary:focus-visible{outline:3px solid #8a5522}@media(max-width:700px){body{padding:17px}h1{font-size:25px}pre{font-size:11px;padding:10px}th,td{padding:8px 5px;font-size:11px}.line-no{min-width:30px;margin-right:10px}}'''


def evidence_page(title, body):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{ES(title)} · Chess coach evidence</title><link rel="stylesheet" href="source.css"><script src="source.js" defer></script></head><body><nav><a href="../index.html#move-sheet">← Decision sheet</a><a href="index.html">Evidence index</a><a href="coverage.html">File coverage</a></nav><h1>{ES(title)}</h1>{body}</body></html>'''


def write_source_page(path):
    before, after = source(path, 'base'), source(path, 'head')
    changes = DIFFS.get(path)
    move_links = ' '.join(f'<a href="../index.html#row-{number}">Move {number}</a>' for number in file_moves(path))
    body = f'<p>{move_links}</p><small>Base {SHA["base"]}<br>Head {SHA["head"]}</small>'
    if changes:
        diff_html = ''.join(f'<span class="code-line {"diff-add" if line.startswith("+") else "diff-remove" if line.startswith("-") else "diff-header" if line.startswith("@@") else ""}">{ES(line)}</span>' for line in changes.splitlines())
        body += f'<details open id="diff"><summary>PR 131 diff · supplied bundle</summary><pre><code>{diff_html}</code></pre></details>'
    else:
        body += '<p>Supporting source, unchanged by PR 131. This is context already present in the base.</p>'
    for side, text in [('base', before), ('head', after)]:
        body += f'<details id="{side}"><summary>{side.title()} · full source · {len(text.splitlines())} lines</summary>'
        body += f'<pre><code>{numbered(text, side)}</code></pre>' if text else '<p>This file does not exist in this version.</p>'
        body += '</details>'
    (EVIDENCE / source_name(path)).write_text(evidence_page(path, body))
    return dict(path=path, base_sha256=hashlib.sha256(before.encode()).hexdigest(), head_sha256=hashlib.sha256(after.encode()).hexdigest(), moves=file_moves(path), changed=changes is not None)


def build():
    sheet = ''.join(row(move) for move in MOVES)
    panels = ''.join(analysis(move, index) for index, move in enumerate(MOVES))
    page = (OUT / 'template.html').read_text().replace('<!-- MOVE_SHEET -->', sheet).replace('<!-- ANALYSIS -->', panels)
    (OUT / 'index.html').write_text(page)
    (EVIDENCE / 'source.css').write_text(SOURCE_STYLE)
    (EVIDENCE / 'source.js').write_text('''(()=>{const reveal=()=>{const el=document.getElementById(location.hash.slice(1));if(!el)return;let p=el;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement}requestAnimationFrame(()=>el.scrollIntoView({block:'center'}))};addEventListener('hashchange',reveal);reveal()})();''')
    all_paths = sorted(set(DIFFS) | set(EXTRA_PATHS) | {reference['path'] for move in MOVES for reference in move['evidence']})
    manifest = [write_source_page(path) for path in all_paths]
    rows = ''.join(f'<tr><td><a href="{source_name(path)}">{ES(path)}</a></td><td>{"Changed" if path in DIFFS else "Base context"}</td><td><div class="move-list">'+''.join(f'<a href="../index.html#row-{number}">{number}</a>' for number in file_moves(path))+'</div></td></tr>' for path in all_paths)
    table = '<table><thead><tr><th>Path</th><th>Role in this PR</th><th>Decision</th></tr></thead><tbody>'+rows+'</tbody></table>'
    index_body = '<p>60 changed files, plus supporting source already present in the base. Each file has the supplied diff and full, line-numbered snapshots. No network or checkout is needed to read these copies.</p><p><a href="pr.html">PR body and commit messages</a> · <a href="diff.patch">Raw diff</a> · <a href="manifest.json">Snapshot hashes</a></p>'+table
    (EVIDENCE / 'index.html').write_text(evidence_page('Source positions', index_body))
    (EVIDENCE / 'coverage.html').write_text(evidence_page('Every changed path has a move', '<p>This is an accounting of the 60-file diff, not a correctness score. A file can participate in several decisions. Where a changed test or subprocess fixture only replaces imports, move 16 owns that adapter migration.</p>'+table))
    commits = ''.join(f'<li><code>{ES(commit["sha"])}</code><br>{ES(commit["subject"])}{f"<pre>{ES(commit['body'])}</pre>" if commit['body'] else "<small> · empty commit body</small>"}</li>' for commit in PR['commits'])
    pr_body = f'<p>Supplied snapshot of PR {PR["number"]}. The body below is verbatim Markdown, including the author’s diagrams.</p><h2>{ES(PR["title"])}</h2><pre class="prose">{ES(PR["body"])}</pre><h2>Commit messages</h2><ol>{commits}</ol>'
    (EVIDENCE / 'pr.html').write_text(evidence_page('The author’s account', pr_body))
    (EVIDENCE / 'pr.json').write_text(json.dumps(PR, indent=2)+'\n')
    (EVIDENCE / 'diff.patch').write_text(PATCH)
    (EVIDENCE / 'manifest.json').write_text(json.dumps(dict(base=SHA['base'], head=SHA['head'], diff_sha256=hashlib.sha256(PATCH.encode()).hexdigest(), files=manifest), indent=2)+'\n')
    (OUT / 'decisions.json').write_text(json.dumps(MOVES, indent=2, ensure_ascii=False)+'\n')
    print(f'Built {len(MOVES)} moves; {sum(len(m["evidence"]) for m in MOVES)} resolved excerpts; {len(DIFFS)} changed files; {len(all_paths)} evidence pages.')


if __name__ == '__main__':
    build()
