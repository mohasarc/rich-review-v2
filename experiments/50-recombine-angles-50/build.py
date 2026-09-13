from pathlib import Path
from html import escape
import json, re, hashlib
import markdown
from content import DECISIONS, RECEIPTS

OUT=Path(__file__).resolve().parent
sources=json.loads((OUT/'source/manifest.json').read_text())
manifest=json.loads((OUT/'manifest.json').read_text())
lookup={(r['side'],r['git_path']):{**r,'view':f'source/view/{i:03}.html'} for i,r in enumerate(sources['files'],1)}
(OUT/'source/view').mkdir(exist_ok=True)
md=lambda s:markdown.markdown(s,extensions=['tables','fenced_code','attr_list'])
CSS='''
:root{--paper:#f5f2e9;--ink:#1e2a29;--muted:#59645e;--line:#c6ccc0;--green:#006556;--amber:#92501b;--white:#fffef9}*{box-sizing:border-box}html{scroll-padding-top:5rem}body{margin:0;background:var(--paper);color:var(--ink);font:17px/1.55 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:var(--green);text-underline-offset:3px}a:hover{text-decoration-thickness:2px}a:focus-visible,summary:focus-visible{outline:3px solid #d08026;outline-offset:4px}h1,h2,h3{line-height:1.15;letter-spacing:-.025em}h1{font:600 clamp(2.6rem,5vw,5.5rem)/1.02 Georgia,serif;max-width:1000px;margin:1rem 0 1.6rem}h2{font-size:2rem;margin:0 0 1.2rem}h3{font-size:1.2rem}h2,.source-head{overflow-wrap:anywhere}p{max-width:80ch}.eyebrow{font:600 .78rem/1.4 ui-monospace,monospace;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)}.lead{font-size:1.25rem;max-width:75ch}.skip{position:absolute;left:10px;top:-60px;background:white;padding:10px;z-index:3}.skip:focus{top:5px}.nav{background:var(--ink);color:white;position:sticky;top:0;z-index:2;padding:.8rem max(1.2rem,calc((100vw - 1240px)/2));display:flex;gap:1.4rem;align-items:center;flex-wrap:wrap;font-size:.85rem}.nav a{color:#d5eee2}.nav strong{margin-right:auto}.wrap{max-width:1300px;padding:3.5rem 2rem;margin:auto}.opening{padding-top:3rem}.corrections{display:grid;grid-template-columns:repeat(3,1fr);gap:1.6rem;margin:2rem 0 3rem}.corrections article{border-top:4px solid var(--amber);padding-top:.5rem}.corrections p{font-size:1rem}.num{font:600 .78rem ui-monospace,monospace;color:var(--amber)}.map{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin:2rem 0;background:var(--white);padding:1.6rem;border:1px solid var(--line)}.box{border:1px solid var(--line);padding:.8rem 1rem;margin:.6rem 0;background:#f1f1e9}.box strong,.box small{display:block}.box.new{border:2px solid var(--green);background:#e7f2e9}.box.live{border:2px solid var(--amber);background:#fbf0de}.arrow{font:600 .85rem ui-monospace,monospace;color:var(--muted);padding:.2rem .8rem}.caption{font-size:.88rem;color:var(--muted)}.note{border-left:4px solid var(--green);padding:.5rem 1.2rem;margin:2rem 0;background:var(--white)}.break{border-top:1px solid var(--line);padding-top:3rem;margin-top:3rem}.tablewrap{overflow:auto;border:1px solid var(--line);background:var(--white)}table{border-collapse:collapse;width:100%;font-size:.91rem;text-align:left}th{background:var(--ink);color:#fff;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em}th,td{padding:1.1rem;vertical-align:top;border-bottom:1px solid var(--line)}th:first-child{width:18%}td:first-child{font-weight:600;min-width:165px}td:nth-child(2){width:22%}td:nth-child(3){width:36%}td:nth-child(4){width:24%}tr:target,section:target{background:#fff0c9}code{font:.88em ui-monospace,SFMono-Regular,monospace;overflow-wrap:anywhere}pre{background:#172625;color:#f2f5e9;padding:1rem;overflow:auto;font:.81rem/1.65 ui-monospace,monospace;tab-size:2}pre code{overflow-wrap:normal;font:inherit}.receipt{border-top:1px solid var(--line);padding:2.5rem 0;scroll-margin-top:1rem}.receipt summary{cursor:pointer;padding:1rem;background:#e9eade;font-weight:600}.receipt details{border:1px solid var(--line);margin:1rem 0}.receipt details>div{padding:0 1rem 1rem}.receipt pre{max-height:360px}.back{font-size:.85rem;display:flex;gap:.8rem;flex-wrap:wrap;margin:1rem 0}.receipt h2{font-size:1.7rem}.source-head{font:.8rem/1.5 ui-monospace,monospace;color:var(--muted);overflow-wrap:anywhere}.source-lines{padding:1rem 0;white-space:pre;overflow:auto}.source-line{display:block;padding:0 1rem;min-height:1.5rem}.source-line:target{background:#675330;color:white}.ln{display:inline-block;width:4rem;text-align:right;margin-right:1rem;color:#9abcae}.source-line a{color:#9abcae}.source-wrap{max-width:1500px}.timeline{display:flex;gap:1rem;align-items:stretch;flex-wrap:wrap;margin:1rem 0}.timeline .box{flex:1;min-width:150px}.window{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem}.window article{border:2px solid var(--amber);padding:1rem;background:var(--white)}.window article+article{border-color:var(--green)}.window ul{padding-left:1.2rem}.foot{border-top:1px solid var(--line);margin-top:3rem;padding-top:2rem;font-size:.88rem;color:var(--muted)}.quote{font-size:1.1rem;border-left:3px solid var(--amber);padding-left:1rem}img{max-width:100%;height:auto}details summary::marker{color:var(--green)}.source-index td{width:auto}.source-index{font-size:.8rem}@media(max-width:850px){.corrections,.map,.window{grid-template-columns:1fr}.wrap{padding:2rem 1rem}.nav{gap:.65rem;padding:.6rem 1rem}.nav strong{width:100%}h1{font-size:3rem}h2{font-size:1.6rem}table{min-width:920px}pre{font-size:.75rem}.source-lines{max-width:100%}.source-wrap{padding:.7rem}}@media print{.nav{position:static}.wrap{padding:1rem}.tablewrap{overflow:visible}table{font-size:9pt;min-width:0}pre{white-space:pre-wrap}.corrections{grid-template-columns:repeat(3,1fr)}details{break-inside:avoid}a{color:inherit}.receipt details:not([open])>div{display:block}.nav,.skip{display:none}}
'''
(OUT/'style.css').write_text(CSS)
def shell(title,body,prefix=''):
 return f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)}</title><link rel="stylesheet" href="{prefix}style.css"></head><body>{body}</body></html>'

def nav():
 return '<a class="skip" href="#change">Skip to the change</a><nav class="nav"><strong>50 / SYMNAV #148</strong><a href="#change">The change</a><a href="#comparison">Comparison</a><a href="#receipts">Source receipts</a><a href="critique.html">Reading critique</a><a href="README.md">README</a></nav>'

def source_link(side,path,a=1,label=None):
 s=lookup[side,path]
 return f'<a href="{s["view"]}#L{a}">{escape(label or f"{side} · {path}:{a}")}</a>'

MAP='''<figure class="map" aria-label="Source ownership and runtime lifetime maps at PR 148">
<div><h3>Where the code lives</h3><span class="eyebrow">Before → head</span><div class="box live"><strong>apps/cli · shipped path</strong><small>Host → local mechanisms → local process/worker entries</small><small>Clock + authority preparation, then 38 files frozen</small></div><div class="arrow">package gains an implementation ↓</div><div class="box new"><strong>@symnav/daemon · added owner</strong><small>Before: contracts + policy</small><small>Head: DaemonClient + ten mechanism owners + executable entries</small></div><p class="caption">The CLI still calls its local graph. Green outlines mark added package ownership; amber follows shipped CLI code.</p></div>
<div><h3>Where the objects run</h3><span class="eyebrow">Staged package path</span><div class="box"><strong>Host process</strong><small>DaemonClient → one runtime promise → retained mechanisms</small><small>Fresh executor for each local attempt; fresh warm capture</small></div><div class="arrow">socket / process launch ↓</div><div class="box"><strong>Daemon process</strong><small>Coordinator · registry · accepted execution · delivery · resources · lifetime</small><div class="box"><strong>Worker thread</strong><small>Loads the host’s executor module; does product work</small></div></div><p class="caption">Grouped structural sketch, not a run. Package boundaries are not process boundaries. Existing execution and delivery lifetimes remain distinct.</p></div></figure>'''

opening='''<main class="wrap opening" id="change"><div class="eyebrow">PR 148 · reconstruct the decisions · then check what source changes</div><h1>The caller stays.<br>Some answers change.</h1><p class="lead">PR #148 puts daemon mechanisms behind a package-owned <code>DaemonClient</code> while the shipped CLI keeps its compatibility graph. The useful review is about which authority, failure boundary and test observation changes inside that intermediate state.</p>
<div class="corrections">
<article><span class="num">01 / CONSEQUENCE</span><h3>A familiar instance can lose ownership.</h3><p>A readable lock with the same instance ID but a different identity key passes the base’s simple ownership query and fails the head’s. Centralization also tightens an answer in the live CLI.</p><a href="#R3">Check the two predicates ↘</a></article>
<article><span class="num">02 / OBSERVATION</span><h3>Moved tests ask different questions.</h3><p>Worker→CLI version rejection becomes a factory check. Generic readiness loses seven timing expectations. Built-entry execution does not recreate the deleted mock’s exact 257 MiB policy handoff.</p><a href="#R7">Locate the test boundaries ↘</a></article>
<article><span class="num">03 / RECORD CORRECTION</span><h3>The retirement condition was recorded.</h3><p>The pinned plan says to remove <code>policy-testing</code> after the mechanism tests move. Some earlier pages missed that context. Its presence does not supply a reason for every deleted assertion.</p><a href="#R9">Read the historical condition ↘</a></article>
</div>'''
opening+=MAP
opening+='''<aside class="note"><strong>One observed descent to carry forward.</strong> In experiment 23, the outline names host execution/environment inputs; its Public client room first spells out <em>optional policy</em>. I treat the host’s ability to supply policy as authority worth naming at the top. This is an editorial rule-4 judgment on a sampled route, also reported by 42/46—not a claim about every drawer. <a href="critique.html#descent">Captured route and attribution ↗</a></aside>
<p>The opening orients; <strong>the complete stopping layer is the map plus the comparison below.</strong> It includes host policy, loading and object lifetimes, routing/replay, validation/authentication, clocks/idle events, changed tests, exports and test scheduling. Every lower receipt develops one of those decisions. “Stated” attaches to a located reason; “unexplained” means a separate reason was not found in the inspected record.</p>
<section id="comparison" class="break"><div class="eyebrow">One comparison · read in order or follow a receipt</div><h2>What the reader can now predict and reconsider</h2><p>These rows are grouped decisions, not a score or a proof of exhaustive understanding. Source consequences and preservation intent stay separate.</p><div class="tablewrap"><table><thead><tr><th>Decision</th><th>Before / premise</th><th>At #148 / consequence</th><th>Reason and source</th></tr></thead><tbody>'''
body=opening
for ident,title,before,after,reason,r in DECISIONS:
 body+=f'<tr id="D{ident}"><td><span class="num">{ident}</span><br>{escape(title)}</td><td>{escape(before)}</td><td>{escape(after)}</td><td>{escape(reason)}<br><a href="#{r}">{r} · source receipt ↘</a></td></tr>'
body+='</tbody></table></div><p class="caption">A complete overview can be longer than one viewport. Depth below adds source fidelity to these decisions; it is optional.</p></section><section id="receipts" class="break"><div class="eyebrow">Pinned evidence · optional depth</div><h2>Shared receipts</h2><p>Base <code>ba53c8e1662fd86d198b95321c90d9c9bef10184</code> → head <code>20838f8dbf413e04767543eb2380d0d114da6c60</code>. These are source readings, not new executions of symnav. Open a disclosure for exact excerpts, or follow a filename to its full pinned snapshot.</p>'
excerpts=[]
for rid,title,explanation,spans in RECEIPTS:
 parents=[d[0] for d in DECISIONS if d[-1]==rid]
 body+=f'<section class="receipt" id="{rid}"><div class="eyebrow">{rid}</div><h2>{escape(title)}</h2><p>{escape(explanation)}</p>'
 if rid=='R6':
  body+='''<div class="timeline"><div class="box"><strong>0 · construct</strong>Deadline = 10</div><div class="box"><strong>5 · accept work</strong>Deadline = 15</div><div class="box"><strong>15 · deadline</strong>Active work continues</div><div class="box"><strong>18 · queue idle</strong>Shutdown can start now</div></div><p class="caption">Illustrative timeline: the interval is shortened to ten units. These are event relationships, not recorded timestamps.</p>'''
 if rid=='R7':
  body+='''<div class="window"><article><span class="eyebrow">Former version witness</span><h3>Wrong product version</h3><p>Worker startup → actual CLI executor → initialization failure</p><strong>The observed path includes the worker.</strong></article><article><span class="eyebrow">New version witness</span><h3>Wrong product version</h3><p>Direct CLI factory call → version rejection</p><strong>The worker is outside this observation.</strong></article></div>'''
 body+='<div class="back">Return to '+''.join(f'<a href="#D{p}">decision {p} ↑</a>' for p in parents)+'</div>'
 for side,path,a,b,label in spans:
  rec=lookup[side,path];lines=(OUT/rec['path']).read_text().splitlines()
  if a<1 or b>len(lines): raise ValueError(f'Bad source range {path}:{a}-{b} ({len(lines)} lines)')
  block='\n'.join(f'{i+1:4}  {lines[i]}' for i in range(a-1,b))
  body+=f'<details><summary>{escape(label)} · {side} L{a}–{b}</summary><div><p class="source-head">{source_link(side,path,a)}<br>{rec["commit"]}<br>SHA-256 {rec["sha256"]}</p><pre><code>{escape(block)}</code></pre><a href="#{rid}">Return to {rid} ↑</a></div></details>'
  excerpts.append({'receipt':rid,'side':side,'git_path':path,'first':a,'last':b,'sha256':rec['sha256']})
 body+='</section>'
body+='''</section><section id="method" class="foot"><h2>How this account was made</h2><p>One sequential agent read the earlier entries, then checked the pinned #148 source. Page-only notes were sealed before the raw bundle diff and predecessor critique bodies; the PR body and README metadata were already known, and page 23’s own embedded source was visible. This is not an independent human recall study. Later readings share earlier concepts.</p><p>All 40 page entries from 01–37 and 40 were captured. Readings were bounded: openings and selected text, with closer inspection of #148 decision layers and selected canvas routes. The 46 finished experiments from 01–46 also have an editorial ledger. Other PR pages supplied representation ideas; their code was not reviewed as another subject. Existing simulations and recordings remain their producers’ evidence. No symnav build, test, daemon or worker was run.</p><p><a href="critique.html">40-page comparison and 46-experiment ledger</a> · <a href="critique.md">Markdown critique</a> · <a href="reading/page-only-notes.json">Sealed notes</a> · <a href="reading/seal.json">Seal hashes</a> · <a href="source-index.html">153-path source inventory</a> · <a href="source/diff.patch">Original pinned patch</a> · <a href="source/copy-aware.patch">Git copy-aware comparison</a> · <a href="manifest.json">Input manifest</a> · <a href="verification.json">Artifact checks</a></p><p>Borrowed ideas, with attribution: 05/06 distinguish package and process; 08 leads to the stricter ownership counterexample; 13 orders consequences first; 23 supplies the bounded descent; 27 names test apparatus; 29 separates live preparation from staging; 30 keeps lifetimes apart; 35 preserves intermediate history; 36 separates stored from returned objects; 40 models attributed reconciliation. Critiques 38/39/41–46 were read after sealing. No predecessor implementation or execution data was copied into this page.</p><a href="#change">Return to the opening ↑</a></section></main>'''
(OUT/'index.html').write_text(shell('The caller stays. Some answers change. · symnav #148',nav()+body))
(OUT/'decisions.json').write_text(json.dumps([dict(zip(['id','decision','before','after','reason','receipt'],d)) for d in DECISIONS],indent=2)+'\n')
(OUT/'source/excerpts.json').write_text(json.dumps(excerpts,indent=2)+'\n')

# Full source pages use local line anchors, and return links to each citing receipt.
for key,r in lookup.items():
 parents=[rid for rid,_,_,spans in RECEIPTS if any((s,p)==key for s,p,*_ in spans)]
 back=' · '.join(f'<a href="../../index.html#{rid}">{rid} ↑</a>' for rid in parents) or '<a href="../../index.html#comparison">Comparison ↑</a>'
 lines=(OUT/r['path']).read_text().splitlines()
 code=''.join(f'<span class="source-line" id="L{i}"><a class="ln" href="#L{i}">{i}</a>{escape(line)}</span>' for i,line in enumerate(lines,1))
 page=f'<main class="wrap source-wrap"><p>{back} · <a href="../../source-index.html">Source inventory</a></p><h2>{escape(r["git_path"])}</h2><p class="source-head">{r["side"]} · {r["commit"]}<br>Git blob {r["blob"]}<br>SHA-256 {r["sha256"]}</p><pre class="source-lines">{code}</pre><p>{back}</p></main>'
 (OUT/r['view']).write_text(shell(r['git_path'],page,'../../'))

# A file assignment is an audit aid, never a claim that all semantic choices were mechanically found.
def assignment(path):
 s=path.lower()
 if 'follow-ups' in s:return ['18']
 if 'vitest' in s or 'lock.yaml' in s:return ['26']
 if 'compatibility-copy' in s:return ['01']
 if 'policy-testing' in s or 'eslint' in s or 'lint-rule' in s or s.endswith('package.json'):return ['24','26']
 if 'daemon-executor.test' in s:return ['20']
 if 'daemon-entry.test' in s or 'built-entry' in s or 'built-process' in s:return ['22','25']
 if 'clock' in s:return ['17','23']
 if 'lifetime' in s:return ['17','18']
 if '/client/' in s:return ['04','05','06','07','08','09','10','11','12','23']
 if 'registry' in s or 'startup' in s:return ['15','04']
 if 'process-coordinator' in s or 'workspace-daemon' in s:return ['13','14','16']
 if 'worker' in s and '.test.' in s:return ['19','20','21']
 if '/test/' in s or '.test.' in s:return ['19','23','26']
 if 'controller' in s:return ['06','15','17']
 if 'request-queue' in s or 'ledger' in s or 'resource-monitor' in s:return ['14','17']
 if 'entry' in s or 'launcher' in s:return ['03','13','17']
 return ['02','14']
inv=json.loads((OUT/'source/inventory.json').read_text());coverage=[]
html='<main class="wrap"><a href="index.html#comparison">Return to comparison ↑</a><h1>Source inventory</h1><p>153 changed paths, each assigned to already-visible decisions. This is file accounting, not a semantic coverage score. The original patch exactly matches the input bundle. Git’s copy-aware patch is a comparison aid; similarity is not proof of equivalence.</p><div class="tablewrap"><table class="source-index"><thead><tr><th>Change</th><th>Base</th><th>Head</th><th>Decisions</th></tr></thead><tbody>'
for row in inv:
 path=row['head_path'] or row['base_path'];ids=assignment(path);coverage.append({**row,'decisions':ids})
 b=source_link('base',row['base_path']) if row['base_path'] else 'Absent'
 h=source_link('head',row['head_path']) if row['head_path'] else 'Deleted'
 html+=f'<tr><td>{row["status"]}</td><td>{b}</td><td>{h}</td><td>'+', '.join(f'<a href="index.html#D{i}">{i}</a>' for i in ids)+'</td></tr>'
html+='</tbody></table></div><p><a href="source/manifest.json">Source hashes and Git blobs</a> · <a href="source/patch-index.json">Copy-aware patch index</a></p></main>'
(OUT/'source-index.html').write_text(shell('PR148 source inventory',html))
(OUT/'coverage.json').write_text(json.dumps(coverage,indent=2)+'\n')
print('Built page,',len(DECISIONS),'decisions,',len(RECEIPTS),'receipts,',len(excerpts),'excerpts,',len(lookup),'source pages')
