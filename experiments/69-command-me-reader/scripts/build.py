from pathlib import Path
from html import escape
import json, re
OUT=Path(__file__).resolve().parents[1]
receipts=json.loads((OUT/'evidence/receipts.json').read_text())
observations=json.loads((OUT/'evidence/observations.json').read_text())
decisions=json.loads((OUT/'src/decisions.json').read_text())
pin=observations['pins']['head']
receipts['recording']={'id':'recording','build':'controlled recording','path':'evidence/observations.json','revision':pin,'start':1,'text':json.dumps(observations,indent=2)}
receipts['test-run']={'id':'test-run','build':'focused head run','path':'evidence/head-tests.txt','revision':pin,'start':1,'text':re.sub(r'\x1b\[[0-9;]*m','',(OUT/'evidence/head-tests.txt').read_text())}
titles={'core':'The exact lookup and clear operations','core-tests':'Identity, failure, clear and old-settlement tests','handles':'One service, one scope, six handles','projection':'Reference projections','release':'Clear before project release','positions':'Position rehydration and reference-location lookup','backend':'Backend success and release boundaries','base-backend':'Base backend boundaries','base-service':'Base service owns Maps','base-release':'Base project release is unawaited','base-clear':'Base clears six Maps','service-tests':'Six added service tests','graph':'Graph awaits asynchronous project cleanup','project':'Concrete project cleanup is synchronous','public':'Core export','spec':'Behavior preservation rule','spec-owner':'Core ownership statement','spec-extends':'Extension shape proposed in the spec','intent':'Supplied PR body and commit subjects','recording':'Actual-method recording with injected inputs','test-run':'Focused head test output'}
titles.update({'identity-queries':'Direct stored-promise returns','backend-wrappers':'Backend async wrapper surface'})
for key,title in titles.items():receipts[key]['title']=title
rows=[]
for n,d in enumerate(decisions,1):
    links=''.join(f'<a href="sources.html#{key}" data-receipt="{key}">{escape(titles[key])} ↗</a>' for key in d['sources'])
    rows.append(f'<article class="decision" id="reading-{d["id"]}"><span class="decision-number">{n:02}</span><div><h3>{escape(d["title"])}</h3><p>{escape(d["fact"])}</p></div><div class="rationale"><p class="reason">{escape(d["reason"])}</p><div class="receipt-links">{links}</div></div></article>')
html=(OUT/'src/index.html').read_text().replace('{{DECISIONS}}','\n'.join(rows)).replace('{{RECEIPTS}}',json.dumps(receipts).replace('<','\\u003c')).replace('{{OBSERVATIONS}}',json.dumps(observations).replace('<','\\u003c'))
(OUT/'index.html').write_text(html)
sections=[]
for key,r in receipts.items():
    code=''.join(f'<span class="line"><span class="line-number">{r["start"]+i}</span>{escape(line)}</span>' for i,line in enumerate(r['text'].splitlines()))
    gh=f'https://github.com/mohasarc/symnav/blob/{r["revision"]}/{r["path"]}#L{r["start"]}'
    remote=f' · <a href="{gh}">Commit-pinned original ↗</a>' if r['build'] in ('head','base') else ''
    sections.append(f'<section class="source-section" id="{key}"><h2>{escape(r["title"])}</h2><p class="source-meta">{escape(r["build"])} · {r["revision"]}<br>{escape(r["path"])}{remote}</p><pre class="code-lines">{code}</pre><a class="back" href="index.html#register">Return to the complete readings ↑</a></section>')
nav=''.join(f'<a href="#{key}">{escape(r["title"])}</a>' for key,r in receipts.items())
(OUT/'sources.html').write_text(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Source book — Keep holding it</title><link rel="stylesheet" href="style.css"></head><body class="source-page"><header class="masthead"><a href="index.html">← Back to the ritual</a><span>PR 127 / pinned receipts</span></header><main><h1>Open the receipt.</h1><p class="source-intro">Exact captured source at the supplied base and head. Recorded delays, empty workspace state and the generic “old” / “new” values are injected. They are not daemon traces. Source receipts add detail to the eight complete readings; the code is not a correctness verdict. Local snapshots and hashes: <a href="evidence/sources.json">sources.json</a>.</p><nav class="source-nav">{nav}</nav>{"".join(sections)}</main></body></html>')
print(f'Built index.html and sources.html with {len(decisions)} readings and {len(receipts)} receipts.')
