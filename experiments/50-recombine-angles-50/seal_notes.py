from pathlib import Path
from datetime import datetime,timezone
import json,hashlib
p=Path(__file__).parent
notes='''01|Separate retained workspace, semantic turn, accepted request and delivery.|The stack opening could blur the intermediate #148 cut; use explicit revision scope.
02|An existing policy reaches mechanisms through required inputs.|A package arrow needs a separate process explanation; values crossing is not object sharing.
03|Two graphs coexist; 24 choices expose runtime loading, malformed cleanup and test losses.|Registry equality is described as canonical; check the actual outcome of conflicting identity.
04|A complete chapter surfaces changed release completion and errors.|Keep enough parent detail to predict failure; do not transfer cache facts into #148.
05|Static and runtime diagrams answer different questions.|Use two box systems, with changed edges visible in each.
06|DaemonClient composes host-process objects; the far process is a different hub.|Recorded real-executor runs are producer evidence; I did not repeat them. Check runtime-per-client against local-executor-per-attempt.
07|The last two frames stage and then switch.|A final architecture needs an intermediate-state label for #148.
08|The live registry can tighten answers before freezing; test moves split witnesses.|The synthetic mismatched-identity report needs an independent source check, not a general correctness claim.
09|Plan, PR and implemented boundary are separate sources.|A disclosure of behavior does not automatically supply its comparative reason.
10|The tour makes a request visit its actual cache boundaries.|A route is useful only with named stimulus and observation boundary.
11|Counterfactuals make a decision weighable without a grade.|Use the skipped alternative only when sourced or explicitly editorial.
12|Host knowledge is narrowed; retained CLI and staged client stay distinct.|Validation-before-composition is visible; determine whether invalid launch failures also leave a different catch boundary.
13|Unexpected failure and fixture changes rise above required-input plumbing.|Borrow consequence-first ordering, without importing this PR's policy delta into #148.
14|The product explanation gives unfamiliar readers useful nouns.|Keep the PR #148 product introduction short; a full-stack map would exceed subject scope.
15|A toy exchange exposes the clock chosen by caller purpose.|An illustration cannot stand in for executed symnav results.
16|Moving a source module does not move its runtime instances.|The static move model expressly excludes compilation and runtime URL relocation.
17|Controlled execution can separate clearing from completion.|Retained recordings are observations of an injected seam, not normal scheduling evidence.
18|Frozen at the head does not mean unedited from the base.|Negative space needs explicit outcome exceptions beside the preserved frame.
19|Required structural shapes do not certify value provenance.|A declaration boundary cannot establish process/runtime portability.
20|Caller contracts can expose changes hidden by equal signatures.|A complete callable inventory is a receipt, not the explanation's top.
21|Narration orients the reader before the full decision map.|The spoken opening is only one route; its complete comparison is below it.
22|Execution and delivery lifetimes can be explored without locks or points.|Keep all consequences accessible without requiring puzzle completion.
23|The outline names coordinate validation, auth exceptions, test removals and serial scheduling.|Sampled D11: the child explains first-constructor validation and endpoint adoption; it does not narrate the entry catch outcome. A text capture contains off-camera rooms, so screenshots bound visibility.
24|Questions preserve the fact while offering optional depth.|Use ordinary direct links and explicit returns rather than a completion gate.
25|A policy board is a lossy value map, not shared process memory.|Do not collect drawings or responses in this page; use a fixed comparison instead.
26|An emptied cache does not revoke a value already held elsewhere.|Transfer the stored-versus-returned-object lens to DaemonClient output ownership.
27|Tests observe a particular implementation under a particular stimulus.|The 257 MiB entry handoff, seven removed timing expectations, direct version factory and local clock scan need exact source checks.
28|A reference count shows only the chosen symbol's callers.|Inventory size and reach are not decision importance; tests can matter with few callers.
29|Four explanatory cuts distinguish live authority/time edits from staged package/client additions.|The cuts are not verified cherry-picks. Clock-scan narrowing is within PR history, not base-to-head deletion.
30|Separating execution from delivery retains a shared wait.|Apply the lifetime lens to #148's copied owners; do not claim that this PR introduced those sessions.
31|Extract/rank/render includes source and authored parent maps.|A map of hunks helps completeness but cannot certify conceptual completeness.
32|A complete static demo separates code owner from instance owner.|Native evidence disclosures make optional depth work without JavaScript.
32-starter|One ownership fragment explicitly sends readers to the complete review.|A starter is not a full PR explanation; do not criticize deliberate scope as an undisclosed omission.
33|The metaphor distinguishes emptying trays from finishing shutdown.|A lossy opening needs the actual consequence in the overview.
33-failure|The unfinished-cleanup opening immediately names an observable difference.|Reuse consequence-first framing; no claim of a new human experiment.
34|An evidence strip includes supplied times and expected outcomes.|State checked-in assertion separately from execution; a proposition needs its stimulus.
35|A future reader can mistake later adoption for this intermediate head.|The exact lifecycle composition is marked unexplained despite a general client reason; check policy context before preserving that absence claim.
36|Stored identities and returned projections can differ.|Apply that lens to retained runtime, fresh executor, capture and returned disposable output.
37|Decision and depth are independent navigation coordinates.|Preserve a decision when going deeper; a plain linear alternative earns its place.
40|The synthesis places held cleanup at the opening and credits reused recordings.|Examine as reconciliation and attributed reuse, not independent confirmation from another author.''' 
byid={}
for line in notes.splitlines():
 ident,learned,question=line.split('|');byid[ident]={'page_learned':learned,'editorial_question':question}
manifest=json.loads((p/'manifest.json').read_text());rows=[]
for item in manifest['pages']:
 rows.append({**item,**byid[item['id']], 'scope':'opening and rendered heading/sample text; deeper PR148 decision summaries; only 23 D11 clicked before seal'})
artifact={'sealed_at':datetime.now(timezone.utc).isoformat(),'limits':'Sequential agent, primed by PR148 PR body, all entry metadata and earlier page concepts. This is not blind recall. No predecessor critique body or raw bundle patch was read before this seal. Page 23 D11 includes its embedded source excerpt. Browser body text includes content outside the viewport; only two screenshots establish camera visibility. Other subjects supply representation ideas, not new source reviews.','rows':rows}
q=p/'reading/page-only-notes.json'
if q.exists(): raise SystemExit('seal already exists; refusing overwrite')
q.write_text(json.dumps(artifact,indent=2)+'\n')
files=[q,*sorted((p/'reading').glob('??.json')),p/'reading/32-starter.json',p/'reading/33-failure.json',p/'reading/23-route.json',*sorted((p/'screenshots').glob('23-*.png'))]
seal={'sealed_at':artifact['sealed_at'],'files':[{ 'path':str(x.relative_to(p)), 'sha256':hashlib.sha256(x.read_bytes()).hexdigest()} for x in files]}
(p/'reading/seal.json').write_text(json.dumps(seal,indent=2)+'\n');print('Sealed',len(rows),'page notes and',len(files),'artifacts')
