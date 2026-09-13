"""Build the page from the captured evidence; no dependencies or network."""
from pathlib import Path
from html import escape
import json

HERE = Path(__file__).resolve().parent
SOURCES = json.loads((HERE / "evidence/sources.json").read_text())
PR = json.loads((HERE / "evidence/pr.json").read_text())
nodes = []


def link(node, text):
    return f'<a href="#{node}" data-go="{node}">{text}</a>'


def badge(text, status="stated"):
    return f'<span class="badge {status}">{text}</span>'


def reason(number, status, title, explanation, source, source_label):
    return f"""<div class="reason">{badge(number + ' · ' + status, status)}
    <div><strong>{title}</strong><p>{explanation}</p>
    {link(source, source_label + ' →')}</div></div>"""


def source(key, first, last, caption="", highlights=()):
    src = SOURCES[key]
    lines = src["text"].splitlines()
    assert 1 <= first <= last <= len(lines), (key, first, last)
    code = "".join(
        f'<div class="code-line{" highlight" if n in highlights else ""}">'
        f'<span class="line-number">{n}</span><span class="line-text">{escape(lines[n-1])}</span></div>'
        for n in range(first, last + 1)
    )
    return f"""<figure class="code-source">
    <figcaption class="source-heading"><a href="evidence/{src['file']}" target="_blank" rel="noopener">Full captured file ↗</a>
    <strong>{escape(src['path'])}</strong>
    <span>{key.split('-')[0]} {src['sha'][:12]} · lines {first}–{last}</span></figcaption>
    <div class="code-lines" role="region" aria-label="Source code lines {first} through {last}" tabindex="0">{code}</div>
    {f'<p class="source-caption">{caption}</p>' if caption else ''}</figure>"""


def quote(text, citation):
    return f'<blockquote class="quote"><p>{text}</p><cite>{citation}</cite></blockquote>'


def add(id, title, short, lede, body, choices, parent="overview", recall="", layer="mechanism"):
    nodes.append(dict(id=id, title=title, short=short, lede=lede, body=body, choices=choices,
                      parent=parent, recall=recall, layer=layer))


def choice(target, question, hint, continued=False):
    return dict(target=target, question=question, hint=hint, continued=continued)


def root_card(number, target, title, content, flags, wide=False):
    return f"""<section class="overview-card{' wide' if wide else ''}" id="summary-{target}">
    <div class="number">{number}</div><h2>{link(target, title)}</h2>{content}
    <div class="decision-flags">{flags}</div></section>"""


overview = """
<div class="overview-intuition">
  <span class="eyebrow">The shape of a turn</span>
  <div class="intuition-flow">
    <div class="intuition-cell"><strong>Ask. Ask again.</strong><span>Reuse the same cached entry.</span><span class="cache-dots" aria-label="Six populated caches"><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
    <span class="intuition-arrow" aria-hidden="true">→</span>
    <div class="intuition-cell"><strong>Cross a boundary.</strong><span>Next successful refresh, or release.</span><span class="cache-dots empty" aria-label="All six caches cleared"><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
    <span class="intuition-arrow" aria-hidden="true">→</span>
    <div class="intuition-cell"><strong>Ask afresh.</strong><span>The handles are still usable.</span><span class="cache-dots" aria-label="Caches can fill again"><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
  </div>
  <span class="lossy">Simplified: the six marks stand for six caches. Clearing drops stored entries; it does not revoke values or cancel promises held elsewhere.</span>
</div>
<p class="root-stop">These seven answers are the whole change. Every question below adds detail to them.</p>
<p class="decision-key"><strong>Stated</strong> = a reason is recorded in the PR or spec. <strong>Unexplained</strong> = the choice is visible, but its reason was not found.</p>
<div class="overview-grid">
"""
overview += root_card("01 · OWNERSHIP", "ownership", "Who owns forgetting?", """
<div class="mini-pipeline"><span>TypeScript queries</span><b>→</b><span class="changed">core scope</span><b>→</b><span>6 maps</span></div>
<p>Manual map clearing moves into <code>TurnScopedCacheScope</code> in core: cache lifetime is language-independent. Each query service creates its own scope and six typed handles. Algorithms, keys, and projections stay in TypeScript; the import still points from TypeScript to core.</p>
<p>The service <em>contains</em> a scope. The spec describes a shared base that a backend extends; the reason for choosing composition here is unrecorded.</p>
""", badge("D1 · owner stated") + badge("D2 · composition unexplained", "unexplained"))
overview += root_card("02 · REUSE", "sharing", "What stays shared?", """
<div class="mini-pipeline"><span>5 symbol → promises</span><span>1 position → locations</span></div>
<p>Six separate key/value spaces remain separate. The handle returns the exact stored value, including <code>undefined</code> and empty arrays. Presence uses <code>Map.has</code>, because <code>undefined</code> can be a cached value.</p>
<p>Callers and references share reference discovery. Public reference results and syntax-node arrays are projected again on access; the underlying cached locations are reused.</p>
""", badge("D3 · isolation stated") + badge("D4 · identity & presence stated"))
overview += root_card("03 · TURN", "turn", "When does a turn end?", """
<div class="mini-pipeline"><span>refresh succeeds</span><b>→</b><span class="changed">clear every cache</span></div>
<p>The next turn begins only after the source, applicable project, and workspace-state refresh steps succeed—even with unchanged files. A failed refresh keeps the current cache entries. That ordering is preserved from the base; it is not a promise to roll back all refresh side effects.</p>
<p>Both lifecycle calls synchronously empty values. Handles survive and can refill; there is no phase guard, cancellation, timer, per-key invalidation, or handle-disposal API.</p>
""", badge("D5 · success boundary stated") + badge("D9 · minimal lifecycle unexplained", "unexplained"))
overview += root_card("04 · RELEASE", "release", "When is release actually finished?", """
<div class="mini-pipeline"><span>clear now</span><b>→</b><span class="changed">await projects</span><b>→</b><span>settle backend</span></div>
<p>Before, project cleanup was started without awaiting it. Now the service and backend await it. Old entries disappear before cleanup can stay pending or reject; the backend's release promise waits and propagates the error.</p>
<p>Clearing does not lock out queries. The spec promises unchanged timing and failure paths; the PR states the new release barrier, but records no reconciliation with that broader parity promise.</p>
""", badge("D6 · release order stated") + badge("Parity reconciliation unexplained", "unexplained"))
overview += root_card("05 · FAILURE", "failures", "Does a failed answer get reused?", """
<div class="mini-pipeline"><span>rejected promise: kept</span><span>sync throw: retry</span></div>
<p>The existing distinction survives. A returned promise is stored as-is, including rejection; a factory that throws before returning stores nothing and runs again on a later lookup.</p>
<p>Clearing does not cancel an old promise. That promise may still settle, but settlement alone cannot overwrite a new turn's entry: the cache installs no settlement callback.</p>
""", badge("D7 · failure & identity preservation stated"))
overview += root_card("06 · PUBLIC SURFACE", "surface", "What do callers have to change?", """
<div class="mini-pipeline"><span class="changed">+ core export</span><span>snapshot → files</span><span>void → Promise</span></div>
<p>Core exports the scope and the <code>getOrCreate</code>-only handle interface. The service's <code>beginTurn</code> now takes a readonly file list instead of a workspace snapshot; no reason for that narrowing is recorded.</p>
<p>The service's release return type becomes <code>Promise&lt;void&gt;</code>. The backend already returned a promise; its signature stays, its awaited boundary expands.</p>
""", badge("D1/D6 · export & await stated") + badge("D8/D9 · narrowing & API limits unexplained", "unexplained"))
overview += root_card("07 · EVIDENCE", "tests", "What do the tests tell us?", """
<p><strong>4 new core tests + 6 new service tests; all 5 previous service tests remain with their assertions unchanged.</strong> They cover identity and isolation, empty results and node rehydration, failure reuse/retry, successful and failed refresh, release/rebuild, and old-promise settlement. Focused execution here passed all 15 tests.</p>
<p>The pending/rejecting release case uses a controlled project-graph substitute; the existing rebuild test uses a mutable filesystem fixture. No assertions were deleted or weakened in this diff, and no other production files changed beyond the four described above. These focused tests do not establish whole-CLI parity.</p>
""", badge("D10 · characterization stated"), wide=True)
overview += "</div>"
add("overview", "What can a cache remember?", "The whole change",
    "TypeScript keeps the query logic. Core takes ownership of forgetting. Six caches keep their identities, and the backend now waits for project cleanup.",
    overview,
    [choice("ownership", "Why put forgetting in core?", "Start the story · ownership and package boundaries", True),
     choice("release", "What changes while cleanup is still pending?", "Go straight to the new awaited boundary"),
     choice("failures", "Why keep one failure but retry another?", "Follow the exact value that enters the cache")],
    parent=None, layer="overview")

ownership = """
<div class="comparison">
 <figure class="diagram"><figcaption class="diagram-title">Before · lifetime inside TypeScript</figcaption>
  <div class="package"><small>@symnav/backend-typescript</small>
   <div class="unit"><strong>TypeScriptBackend</strong><em>calls beginTurn / release</em></div>
   <div class="flow-arrow">↓</div>
   <div class="unit"><strong>Semantic query service</strong><em>query algorithms + key construction</em>
    <div class="package old"><small>Lifetime owned here</small>six Maps + clearQueryCaches()</div>
   </div>
  </div>
  <p class="caption">The clearing method names every map individually.</p>
 </figure>
 <figure class="diagram"><figcaption class="diagram-title">After · lifetime supplied by core</figcaption>
  <div class="package"><small>@symnav/backend-typescript</small>
   <div class="unit"><strong>TypeScriptBackend</strong><em>successful refresh / awaited release</em></div>
   <div class="flow-arrow">↓</div>
   <div class="unit"><strong>Semantic query service</strong><em>same algorithms + same keys + six handles</em></div>
  </div>
  <div class="flow-arrow changed">↓ constructs and calls · existing import direction</div>
  <div class="package changed"><small>@symnav/core · newly owns lifetime</small>
   <div class="unit changed"><strong>TurnScopedCacheScope</strong><em>register handles · clear all values</em>
    <div class="handles"><span>definitions</span><span>references</span><span>call targets</span><span>callers</span><span>callees</span><span>positions</span></div>
   </div>
  </div>
 </figure>
</div>
<p class="caption">Green marks the moved responsibility. These are source-package boundaries. The scope instance still belongs to one service; this introduces no process hop or shared global cache.</p>
<div class="reasons">
"""
ownership += reason("D1", "stated", "Put generic cache lifetime in core.",
                    "The architecture spec assigns turn-scoped lifecycle to core and semantic query bodies to TypeScript. The new export makes that owner available to the service.",
                    "e-ownership", "Spec ownership rule and the new import")
ownership += reason("D2", "unexplained", "Compose a scope into the service.",
                    "The spec's vocabulary is a shared base that the backend extends. The implementation instead holds a scope as a field. No comparison of those forms was found in the PR, its six commit messages, or the available architecture plan.",
                    "e-ownership", "Spec wording beside the field")
ownership += """</div>
<div class="note"><strong>The boundary moved; the query meanings stayed.</strong>
The core handle receives a key and a factory. It does not know what a TypeScript symbol, caller, or source position means.</div>"""
add("ownership", "Why put forgetting in core?", "Who owns forgetting?",
    "The generic operation is “forget every cache at this boundary.” The language-specific work is deciding what each cached answer means.",
    ownership,
    [choice("sharing", "If lifetime is shared, why are there still six caches?", "Continue the story · independent key and value spaces", True),
     choice("surface", "What does the new core API actually let a caller do?", "The public boundary and its limits"),
     choice("e-ownership", "Where do the spec and code draw this boundary?", "Inspect captured source and the recorded rationale")],
    recall="One service owns a scope instance; the lifetime implementation moves to core. The composition choice has no recorded reason.")

sharing = """
<div class="table-wrap"><table><thead><tr><th>Isolated handle</th><th>Key stays</th><th>Stored value stays</th></tr></thead><tbody>
<tr><td><code>definitionsByIdentity</code></td><td>formatted symbol identity</td><td>promise of symbol overview nodes</td></tr>
<tr><td><code>referencesByIdentity</code></td><td>formatted symbol identity</td><td>promise of semantic reference locations</td></tr>
<tr><td><code>callTargetsByIdentity</code></td><td>formatted symbol identity</td><td>promise of call-target resolution</td></tr>
<tr><td><code>callersByIdentity</code></td><td>formatted symbol identity</td><td>promise of incoming call edges</td></tr>
<tr><td><code>calleesByIdentity</code></td><td>formatted symbol identity</td><td>promise of outgoing call edges</td></tr>
<tr><td><code>definitionsByPosition</code></td><td>relative path + ":" + start offset</td><td>array of semantic node locations</td></tr>
</tbody></table></div>
<figure class="diagram"><figcaption class="diagram-title">One discovery, two projections</figcaption>
 <div class="fork">
  <div class="unit changed"><strong>referenceLocations(identity)</strong><span class="token">cached promise</span><br><em>path · start · length · isDefinition</em></div>
  <span class="branch-arrow" aria-hidden="true">↠</span>
  <div><div class="unit"><strong>findCallers</strong><em>CallerFinder → separately cached caller promise</em></div><div class="unit"><strong>findReferences</strong><em>rebuilds public reference objects on each call</em></div></div>
 </div>
 <p class="caption">“Exact promise identity” refers to the cache entry and the service methods that return it directly. It does not describe every backend wrapper or the public reference projection.</p>
</figure>
<figure class="diagram"><figcaption class="diagram-title">Position results remember locations, then rehydrate nodes</figcaption>
 <div class="mini-pipeline"><span>identifier position</span><b>→</b><span class="changed">cached locations [path, start, kind]</span><b>→</b><span>node lookup on every access</span></div>
 <p class="caption">Two returned node arrays can be different arrays containing the same node. Empty location arrays are cached too.</p>
</figure>
<div class="reasons">
"""
sharing += reason("D3", "stated", "One scope, six independent handles.",
                  "The PR chooses isolation because the existing queries have independent key and value spaces. The same string can be present in two handles without joining their answers.",
                  "e-sharing", "The six declarations and PR decision")
sharing += reason("D4", "stated", "Store the exact value; check presence with Map.has.",
                  "The PR explicitly preserves identities and treats undefined as a valid cached value. No copying, promise wrapping, or truthiness test occurs inside getOrCreate.",
                  "e-sharing", "The handle and identity assertions")
sharing += "</div>"
add("sharing", "If lifetime is shared, why keep six caches?", "What stays shared?",
    "They share a reset boundary. They do not share a namespace. Each handle still has its own Map and its own value type.",
    sharing,
    [choice("turn", "What event resets all six?", "Continue the story · the successful refresh boundary", True),
     choice("failures", "What if that exact value is a rejected promise?", "The difference between returning and throwing"),
     choice("e-sharing", "Which identities are actually asserted?", "Read cache declarations and the characterization tests")],
    recall="Five caches store promises by symbol identity; one stores locations by position. Public projections can be rebuilt.")

turn = """
<div class="sequence">
 <div class="step"><span class="step-number">01</span><strong>Refresh inputs</strong><p>Source cache refresh; project graph refresh when coverage is workspace.</p></div>
 <div class="step"><span class="step-number">02</span><strong>Await workspace state</strong><p>Use the requested files and coverage. A rejection exits before beginTurn.</p></div>
 <div class="step changed"><span class="step-number">03</span><strong>Begin the next turn</strong><p>Assign the file list, synchronously clear all handles, then return the refresh summary.</p></div>
</div>
<div class="trace" data-widget="turn">
 <div class="diagram-title">The same key meets different boundaries</div>
 <p class="small">Starting point: the current successful turn contains entry A. Choose what happens next.</p>
 <div class="trace-controls" role="group" aria-label="Choose a turn scenario">
  <button type="button" data-turn="repeat" aria-pressed="true">Ask again?</button>
  <button type="button" data-turn="success" aria-pressed="false">Refresh succeeds?</button>
  <button type="button" data-turn="failure" aria-pressed="false">Refresh fails?</button>
  <button type="button" data-turn="release" aria-pressed="false">Release begins?</button>
 </div>
 <div class="trace-screen" data-screen="turn" aria-live="polite"></div>
 <span class="lossy">Illustrative sequence, not a symnav execution. A and B mark entry identity. Each option starts from the same populated cache.</span>
</div>
<div class="reasons">
"""
turn += reason("D5", "stated", "Begin only after refresh succeeds.",
               "The PR says failed refresh must preserve the current successful turn. The base already called beginTurn after the refresh work; the refactor keeps that ordering, including clearing after a successful refresh of unchanged files.",
               "e-turn", "Base and head refresh sequence")
turn += reason("D9", "unexplained", "Represent boundaries as synchronous clears, without enforcing a phase.",
               "beginTurn and releaseTransientResources call the same private clear operation. It empties values, retains registered handles, and permits later getOrCreate calls. The API has no timer, per-key invalidation, cancellation, or handle disposal; no separate rationale for those limits was found.",
               "e-turn", "The entire lifecycle implementation")
turn += """</div><div class="note"><strong>“Turn” names a cache lifetime, not a transaction around the entire backend.</strong>
The observed guarantee here is that failed refresh does not clear these entries. Earlier source/project refresh work is outside this cache scope.</div>"""
add("turn", "What event resets all six caches?", "When does a turn end?",
    "Successful refresh moves the semantic cache to its next turn. Failed refresh leaves this cache in its current turn.",
    turn,
    [choice("release", "Does release mean “cleared” or “finished cleaning up”?", "Continue the story · two moments in one call", True),
     choice("failures", "Can an old promise survive the boundary?", "What clearing does to values held elsewhere"),
     choice("e-turn", "Was successful-refresh ordering already there?", "Compare the base with the head")],
    recall="Successful refresh—even unchanged—clears the caches. Failed refresh preserves entries. A clear leaves handles usable.")

release = """
<div class="comparison">
 <figure class="diagram"><figcaption class="diagram-title">Before · project completion detached</figcaption>
  <div class="unit"><strong>Backend release()</strong><em>already returns Promise&lt;void&gt;</em></div>
  <div class="flow-arrow">↓ calls service</div>
  <div class="unit"><strong>Service clears maps</strong><em>starts project release; returns void</em></div>
  <div class="flow-arrow">↙ caller can finish &nbsp; ↘ graph continues</div>
  <div class="unit"><strong>ProjectGraph release promise</strong><em>not connected to backend settlement</em></div>
 </figure>
 <figure class="diagram"><figcaption class="diagram-title">After · completion reaches the caller</figcaption>
  <div class="unit changed"><strong>Backend release()</strong><em>awaits semantic service</em></div>
  <div class="flow-arrow changed">↓ awaited</div>
  <div class="unit changed"><strong>Service clears scope synchronously</strong><em>then awaits project graph</em></div>
  <div class="flow-arrow changed">↓ awaited</div>
  <div class="unit"><strong>ProjectGraph release promise</strong><em>completion or rejection propagates back up</em></div>
 </figure>
</div>
<div class="trace" data-widget="release">
 <div class="diagram-title">Follow the release boundary</div>
 <div class="trace-controls" role="group" aria-label="Choose a release stage">
  <button type="button" data-release="before" aria-pressed="true">Before calling?</button>
  <button type="button" data-release="pending" aria-pressed="false">Cleanup stays pending?</button>
  <button type="button" data-release="resolved" aria-pressed="false">Cleanup resolves?</button>
  <button type="button" data-release="rejected" aria-pressed="false">Cleanup rejects?</button>
 </div>
 <div class="trace-screen" data-screen="release" aria-live="polite"></div>
 <span class="lossy">Illustrative ordering, not elapsed time or an execution trace. No query is issued after clearing in these frames; new queries could refill the handles.</span>
</div>
<div class="reasons">
"""
release += reason("D6", "stated", "Clear before awaiting release, and await through the backend.",
                  "The PR says released cached semantics must already be unavailable while cleanup is pending or rejecting. It identifies the backend as the awaited release barrier.",
                  "e-release", "Both await sites and the controlled release test")
release += """</div>
<div class="note amber"><strong>One decision the spec does not reconcile.</strong>
The architecture spec promises unchanged timing and failure paths. The base detached the graph promise; the head awaits it and exposes its rejection. The PR records this barrier, but no explicit exception to the blanket parity promise was found. That is a scope question for the reader, not a correctness verdict.</div>
<p class="small">The underlying graph already releases configured projects in order, then the inferred project. Its algorithm is unchanged here; this PR connects its existing completion to the service and backend.</p>
"""
add("release", "When is release actually finished?", "When does release finish?",
    "Cache eviction happens first. Resource cleanup may take longer. The backend now stays pending until that cleanup settles.",
    release,
    [choice("failures", "What if a promise was already in someone's hands?", "Continue the story · eviction is not cancellation", True),
     choice("tests", "How is pending or rejecting cleanup represented in tests?", "A controlled boundary and its limits"),
     choice("e-release", "Where did the previously detached promise become awaited?", "Two changed methods and the parity wording")],
    recall="Old entries clear immediately; project cleanup is awaited; rejection reaches the backend. Queries are not locked out.")

failures = """
<div class="comparison">
 <figure class="diagram"><figcaption class="diagram-title">Factory returns a promise that rejects</figcaption>
  <div class="unit"><strong>createValue() returns P</strong><em>A returned object exists.</em></div>
  <div class="flow-arrow">↓ Map.set(key, P)</div>
  <div class="unit changed"><strong>Cache: key → P</strong><span class="token failure">P rejects</span></div>
  <div class="flow-arrow">↓ same-key lookup</div>
  <div class="unit"><strong>Return the same P</strong><em>No automatic retry until the entry is cleared.</em></div>
 </figure>
 <figure class="diagram"><figcaption class="diagram-title">Factory throws before returning</figcaption>
  <div class="unit"><strong>createValue() throws</strong><em>Execution never reaches Map.set.</em></div>
  <div class="flow-arrow">↓ no value was inserted</div>
  <div class="unit"><strong>Cache: key absent</strong><span class="token empty">no entry</span></div>
  <div class="flow-arrow">↓ same-key lookup</div>
  <div class="unit"><strong>Run the factory again</strong><em>Reference discovery preserves this path.</em></div>
 </figure>
</div>
<p class="body-copy">In reference discovery, <code>findReferenceLocations(identity)</code> is evaluated <em>before</em> <code>Promise.resolve(...)</code> receives its argument. If discovery throws, no promise reaches the cache. The public async references method can still reject for that synchronous inner failure.</p>
<figure class="diagram"><figcaption class="diagram-title">An old promise can finish without re-entering the cache</figcaption>
 <div class="sequence">
  <div class="step"><span class="step-number">01</span><strong>Old turn</strong><p>cache key → A<br>caller also holds A</p></div>
  <div class="step changed"><span class="step-number">02</span><strong>Boundary + next lookup</strong><p>cache key → B<br>caller still holds A</p></div>
  <div class="step"><span class="step-number">03</span><strong>A settles</strong><p>caller receives A's result<br>cache key still → B</p></div>
 </div>
 <p class="caption">getOrCreate stores the returned object directly. It adds no settlement handler that could write the old result back, and it adds no cancellation mechanism.</p>
</figure>
<div class="reasons">
"""
failures += reason("D7", "stated", "Preserve the existing factory and promise behavior.",
                   "The PR context explicitly preserves promise/value identities and failure behavior. The cache stays synchronous around the factory call; async definition/callee failures remain cached, and synchronous reference-discovery failures remain retryable.",
                   "e-failures", "The insertion order and failure assertions")
failures += "</div>"
add("failures", "Why keep one failure but retry another?", "Do failures get reused?",
    "The cache stores what the factory returns. A rejected promise is a returned value; a synchronous throw never becomes an entry.",
    failures,
    [choice("surface", "What can a caller control through the new API?", "Continue the story · exported surface and changed signatures", True),
     choice("turn", "Which boundaries let the same key compute again?", "Return to the cache lifetime"),
     choice("e-failures", "Which lines keep old promises from overwriting new entries?", "Insertion order, no callbacks, and the settlement test")],
    recall="Returned rejected promises stay cached; synchronous throws retry. An old promise can settle without replacing a new entry.")

surface = """
<div class="table-wrap"><table><thead><tr><th>Public surface</th><th>Before</th><th>After</th></tr></thead><tbody>
<tr><td>Core export</td><td>No turn-cache abstraction</td><td><code>TurnScopedCacheScope</code> and <code>TurnScopedCache&lt;Key, Value&gt;</code></td></tr>
<tr><td>Service beginTurn</td><td><code>(snapshot: WorkspaceSnapshot): void</code></td><td><code>(files: readonly WorkspaceFile[]): void</code></td></tr>
<tr><td>Service release</td><td><code>(): void</code></td><td><code>(): Promise&lt;void&gt;</code></td></tr>
<tr><td>Backend release</td><td><code>(): Promise&lt;void&gt;</code><br>project promise detached</td><td><code>(): Promise&lt;void&gt;</code><br>project promise awaited</td></tr>
</tbody></table></div>
<div class="two-up">
 <figure class="diagram"><figcaption class="diagram-title">What a query gets</figcaption><div class="unit changed"><strong>TurnScopedCache&lt;Key, Value&gt;</strong><code>getOrCreate(key, createValue): Value</code></div><p class="caption">A typed handle. The public interface does not expose its internal clear method.</p></figure>
 <figure class="diagram"><figcaption class="diagram-title">What the lifetime owner gets</figcaption><div class="unit changed"><strong>TurnScopedCacheScope</strong><code>createCache&lt;Key, Value&gt;()</code><br><code>beginTurn(): void</code><br><code>releaseTransientResources(): void</code></div><p class="caption">All handles register here. Both lifecycle methods clear their values together.</p></figure>
</div>
<div class="reasons">
"""
surface += reason("D8", "unexplained", "Accept just the file list at beginTurn.",
                  "The old service already read only snapshot.files, and the backend now passes request.snapshot.files. That explains the mechanical fit, not the author's reason for changing the exported signature; no reason for the narrowing was found.",
                  "e-surface", "Before/after signatures and call site")
surface += reason("D9", "unexplained", "Expose only factory lookup and whole-scope reset.",
                  "No per-key invalidation, cancellation, timer, phase token, or unregister/dispose method is exported. Handles persist through clears. The source makes those limits visible; the available rationale does not compare this surface with a richer one.",
                  "e-surface", "Complete core interface and implementation")
surface += """</div><p class="small">The new core export follows the stated ownership move (D1). The asynchronous service release follows the stated completion barrier (D6). Neither requires a new internal package dependency direction.</p>"""
add("surface", "What can callers control now?", "What surface changes?",
    "Core exposes a small reusable cache scope. The TypeScript service takes less input at turn start and returns an awaitable release.",
    surface,
    [choice("tests", "What behavior did the author choose to pin down?", "Continue the story · additions and retained assertions", True),
     choice("ownership", "Why a composed object instead of the spec's shared base?", "The implementation form whose reason is absent"),
     choice("e-surface", "Can I see every new public method?", "The full 46-line core file and changed service signatures")],
    recall="The scope is newly exported. beginTurn narrows to files; service release becomes async. No separate reason for the API's limits is recorded.")

tests = """
<div class="audit-grid">
 <div class="unit"><span class="count">4 + 6</span><strong>New test cases</strong><em>Four core tests and six service characterization/boundary tests.</em></div>
 <div class="unit"><span class="count">5 retained</span><strong>Existing service cases</strong><em>Their assertions are unchanged. No test cases or assertions are removed in this diff.</em></div>
</div>
<div class="table-wrap"><table><thead><tr><th>Question covered</th><th>Evidence added in this PR</th><th>Existing coverage retained</th></tr></thead><tbody>
<tr><td>Do equal lookups reuse the right thing?</td><td>Core exact values, undefined, and handle isolation; four service identity promises; empty positions with node rehydration.</td><td>Shared caller/reference search; repeated call positions; diamond graph traversal.</td></tr>
<tr><td>What ends reuse?</td><td>Core clears every handle on turn and repeated release; service failed refresh preserves the current result.</td><td>Repeated queries reuse discovery; another successful refresh of the same snapshot searches again.</td></tr>
<tr><td>Which failure gets retried?</td><td>Rejected definition/callee promises stay cached; synchronous reference discovery retries; core factory throw versus rejection.</td><td>No old assertion is relaxed to make this distinction pass.</td></tr>
<tr><td>What does release wait for?</td><td>A controlled project-graph substitute stays pending, then rejects. A lookup during that wait returns a new result; later cleanup is not reached after rejection.</td><td>A mutable filesystem fixture changes config/source, releases resources, then lazily rebuilds semantics with preserved results and prepared entries.</td></tr>
<tr><td>Can a late promise replace the new turn?</td><td>Core test settles an old promise after clearing and inserting a new one; the new entry remains.</td><td>—</td></tr>
</tbody></table></div>
<div class="note"><strong>Evidence execution: 15 focused tests passed.</strong>
The new core file's 4 tests and the service file's 11 tests ran against the captured head on 13 September 2026. This is a focused run, not a complete CLI, daemon, lint, or typecheck validation. <a href="evidence/verification.md">Commands and observations ↗</a></div>
<div class="reasons">
"""
tests += reason("D10", "stated", "Characterize identities and boundaries while changing ownership.",
                "The commit sequence names semantic-cache characterization and lifecycle/release specifications before adoption. The architecture spec calls for preserving existing expectations; this diff adds tests without replacing their expected behavior.",
                "e-tests", "Test additions, retained assertions, and commits")
tests += """</div>
<div class="note amber"><strong>What remains a human question?</strong>
The controlled cleanup test pins down an awaitable rejection boundary. It does not settle how that changed boundary fits the spec's blanket parity promise. The snapshot-to-files input and composition form also remain choices without recorded reasons.</div>
<p class="small">Scope accounting: the production delta is the new core scope, its index export, the semantic service adoption, and two backend call-site changes. The other two changed files are tests. No additional production change was found outside the decisions surfaced above.</p>"""
add("tests", "What behavior did the tests choose to pin down?", "What is the evidence?",
    "The tests separate identity, lifetime, and release completion. They add detail to the contract without deleting the previous service assertions.",
    tests,
    [choice("overview", "Can I explain the change from the top now?", "Return to the seven answers", True),
     choice("release", "How does the awaited release fit the parity promise?", "Revisit the decision the sources leave unresolved"),
     choice("e-tests", "Which additions, unchanged assertions, and runs support this?", "Inspect test source, commit subjects, and local observations")],
    recall="Ten new tests and five retained service tests cover these boundaries. A focused 15-test run is not whole-CLI parity.")

# Evidence is a separate depth, with explicit routes back to the question it answers.
ownership_e = quote(
    "Shared in core: file revision tracking, prepared-file index, declarations-by-identity, transactional index publication, project-membership graph with input invalidation, turn-scoped query cache lifecycle.",
    'Architecture spec · “A language backend holds only language-specific logic” · <a href="evidence/head-spec.txt">captured spec</a>')
ownership_e += source("head-spec", 53, 64, "The same section describes a base that the backend extends.", range(55, 65))
ownership_e += source("base-service", 28, 41, "Before: each cache is a Map field in TypeScript.")
ownership_e += source("head-service", 1, 11, "The new lifetime dependency follows the existing backend → core import direction.", [3])
ownership_e += source("head-service", 29, 55, "After: one composed scope creates six independently typed handles.", [31])
ownership_e += source("base-service", 219, 226, "Before: clearing enumerates all six maps.")
add("e-ownership", "Where is lifetime assigned—and where does it land?", "Ownership evidence",
    "The ownership reason is explicit. The choice to use composition rather than the spec's base-class wording is not explained.",
    ownership_e,
    [choice("ownership", "How do those lines fit into the two package boxes?", "Back to the ownership diagram", True),
     choice("surface", "Which part becomes a public core API?", "Follow the export and the handle contract"),
     choice("overview", "What are the other decisions again?", "Return to the complete overview")],
    parent="ownership", recall="Core owns generic lifetime; TypeScript retains semantic meaning. The scope is composed into the service.", layer="evidence")

sharing_e = quote(PR["body"].split("## Decisions\n\n")[1].split("\n")[0][2:],
                  'PR #127 · Decisions · <a href="evidence/pr.json">captured PR metadata</a>')
sharing_e += source("head-scope", 1, 24, "Each handle has its own Map. Map.has distinguishes absence from a present undefined value.", [12, 15, 16, 17, 18])
sharing_e += source("head-service-test", 46, 58, "These four service methods return their exact cached promises.")
sharing_e += source("head-service-test", 83, 92, "Different arrays can hold the same node; missing position results are reused.")
sharing_e += source("head-service", 134, 169, "The position cache stores locations; rehydration happens after lookup. Reference discovery is cached independently.")
sharing_e += source("head-service-test", 234, 238, "The existing caller/reference sharing assertion is retained.")
add("e-sharing", "Which identities do the declarations and tests preserve?", "Sharing evidence",
    "Exact identity belongs to the stored entry. Projections outside the handle remain outside that promise.",
    sharing_e,
    [choice("sharing", "Can I see the six value spaces together again?", "Back to the cache inventory", True),
     choice("e-failures", "What does storing a promise directly do to failures?", "Follow the factory's return path"),
     choice("overview", "What else should I know before stopping?", "Return to the complete overview")],
    parent="sharing", recall="Six key/value spaces stay isolated, and cached locations are distinct from their public projections.", layer="evidence")

turn_e = quote("Chose to begin the next turn only after refresh succeeds over clearing at refresh entry, because failed refresh must preserve the current successful turn.",
               'PR #127 · Decisions · <a href="evidence/pr.json">captured PR metadata</a>')
turn_e += source("base-backend", 79, 85, "The base already begins the turn after awaiting refresh work.", [83])
turn_e += source("head-backend", 79, 85, "The ordering stays; the argument changes from snapshot to files.", [83])
turn_e += source("head-scope", 26, 46, "Both lifecycle operations clear registered handle values. The list of handles remains.", range(35, 46))
turn_e += source("head-service-test", 153, 161, "A failed refresh keeps the previously returned definition result and avoids another search.")
turn_e += source("head-service-test", 259, 267, "The existing test uses the same snapshot on the next successful refresh and observes another search.")
add("e-turn", "Was the successful-refresh boundary already there?", "Turn evidence",
    "Yes. This layer extracts who clears the cache while preserving when successful refresh asks for the clear.",
    turn_e,
    [choice("turn", "What does this ordering look like for the same key?", "Back to the illustrative boundary sequence", True),
     choice("release", "How does release cross a second boundary?", "Synchronous eviction and asynchronous completion"),
     choice("overview", "Can I return to all seven answers?", "Return to the complete overview")],
    parent="turn", recall="Failed refresh preserves cache entries; successful refresh clears them. The scope does not enforce a turn state machine.", layer="evidence")

release_e = quote("Chose synchronous cache clearing before project release over clearing after the await, because released semantics must be unavailable while release is pending or rejecting.",
                  'PR #127 · Decisions · <a href="evidence/pr.json">captured PR metadata</a>')
release_e += source("base-service", 125, 128, "Before: the service starts graph release and returns void.", [125, 126, 127])
release_e += source("head-service", 129, 132, "After: clear synchronously, then await the graph.", [129, 130, 131])
release_e += source("base-backend", 87, 89, "The base backend is async but does not await graph completion through the service.", [88])
release_e += source("head-backend", 87, 89, "The head waits on the now-async service.", [88])
release_e += source("head-project-graph", 144, 152, "Unchanged context: ordered project release already supports awaiting and rejection.")
release_e += source("head-service-test", 195, 216, "The controlled pending release permits cache refill, stays pending, then rejects at the backend. The project graph is a test substitute.")
release_e += source("head-spec", 5, 7, "The architecture spec's goal includes unchanged output or timing.")
release_e += source("head-spec", 17, 29, "The broader parity wording has no local exception for this newly awaited boundary.")
add("e-release", "Which await now connects cleanup to its caller?", "Release evidence",
    "One await in the service and one in the backend make the graph's completion observable through the release promise.",
    release_e,
    [choice("release", "Where are the two moments in the release diagram?", "Back to eviction versus completion", True),
     choice("tests", "What does the controlled test leave unestablished?", "Focused evidence and broader parity"),
     choice("overview", "How does this fit the rest of the change?", "Return to the complete overview")],
    parent="release", recall="The PR states a release barrier; the base detached project completion. The spec reconciliation is unrecorded.", layer="evidence")

failures_e = quote("Building on #126, this layer moves only cache lifetime out of TypeScript while preserving all six algorithms, key spaces, promise/value identities, and failure behavior.",
                   'PR #127 · Context · <a href="evidence/pr.json">captured PR metadata</a>')
failures_e += source("head-scope", 14, 19, "A throw from createValue skips insertion. A returned promise is stored without settlement callbacks.", [16, 17])
failures_e += source("head-service", 163, 177, "findReferenceLocations runs before Promise.resolve is called; a synchronous throw leaves no entry.")
failures_e += source("head-service-test", 95, 111, "Async definition and callee failures retain the original promise within the turn.")
failures_e += source("head-service-test", 113, 133, "Repeated public async calls reject, while the inner synchronous discovery is retried.")
failures_e += source("head-scope-test", 72, 91, "The old promise resolves for its holder without replacing the new cached promise.")
add("e-failures", "How can an old promise settle without writing into the new turn?", "Failure evidence",
    "There is no callback in the cache that writes on settlement. The old promise and the new map entry can coexist.",
    failures_e,
    [choice("failures", "Can I compare returning and throwing side by side?", "Back to the failure mechanism", True),
     choice("turn", "Which call clears the map while leaving the old promise alive?", "Revisit the lifecycle boundaries"),
     choice("overview", "What else is in the top layer?", "Return to the complete overview")],
    parent="failures", recall="The cache stores returned values directly. Synchronous throws skip insertion, and clearing does not cancel held promises.", layer="evidence")

surface_e = source("head-exports", 146, 154, "The new scope class and handle type are re-exported from @symnav/core.", [152])
surface_e += source("head-scope", 1, 46, "The complete new core file. The exported handle exposes only getOrCreate; scope methods clear all registered handles.")
surface_e += source("base-service", 49, 52, "Before: beginTurn receives the complete workspace snapshot.")
surface_e += source("head-service", 63, 66, "After: only the readonly files list crosses this boundary.")
surface_e += source("head-backend", 79, 89, "Both call-site adaptations in the backend.", [83, 88])
add("e-surface", "What is the complete new API?", "API evidence",
    "All 46 lines of the core abstraction are here, beside its export and changed consumers.",
    surface_e,
    [choice("surface", "Which signatures change for a caller?", "Back to the before/after table", True),
     choice("ownership", "Who is responsible for using the lifecycle methods?", "Back to the ownership boundary"),
     choice("overview", "Can I return to the overview?", "Return to the complete overview")],
    parent="surface", recall="Core exports a factory-lookup handle and whole-scope resets. The service narrows input and makes release awaitable.", layer="evidence")

tests_e = """
<div class="table-wrap"><table><thead><tr><th>Commit</th><th>Recorded subject</th></tr></thead><tbody>
""" + "".join(f"<tr><td><code>{c['sha'][:9]}</code></td><td>{escape(c['subject'])}</td></tr>" for c in PR["commits"]) + """
</tbody></table></div>
<p class="small">All six captured commit bodies are empty. The subjects record characterization/specification intent; they do not supply additional rationale for composition or signature narrowing.</p>
"""
tests_e += source("head-scope-test", 6, 25, "New core identity/isolation/present-undefined case.")
tests_e += source("head-scope-test", 28, 49, "New core boundary case checks both handles and repeated release.")
tests_e += source("head-service-test", 164, 184, "The pending/rejecting project graph is controlled by the test, not a timed production trace.")
tests_e += source("head-service-test", 388, 403, "Retained fixture assertions: release, unchanged refresh, lazy semantic reload, and stable prepared results.")
tests_e += """<div class="note"><strong>Audit the whole delta.</strong>
<a href="evidence/diff.patch">Full captured diff</a> · <a href="evidence/files.txt">Changed file counts</a> · <a href="evidence/verification.md">Focused execution and assertion audit</a>.
The service test diff adds six cases and adjusts imports; its previous five test bodies are byte-for-byte retained. The core test file is entirely new.</div>"""
add("e-tests", "Which tests were added, and which assertions survived?", "Test evidence",
    "The captured diff and local run distinguish what the author specified from what this experiment executed.",
    tests_e,
    [choice("tests", "What questions do these tests cover?", "Back to the evidence map", True),
     choice("release", "What review question remains despite these checks?", "The release barrier and the parity promise"),
     choice("overview", "Can I explain the change without reading more code?", "Return to the complete overview")],
    parent="tests", recall="Four new core tests, six new service tests, five unchanged service tests. Focused execution does not establish full-suite parity.", layer="evidence")

ids = [node["id"] for node in nodes]
assert len(ids) == len(set(ids))
for node in nodes:
    assert len(node["choices"]) >= 2, node["id"]
    assert all(c["target"] in ids and c["question"].endswith("?") for c in node["choices"]), node["id"]
    assert node["parent"] is None or node["parent"] in ids

(HERE / "nodes.js").write_text("window.REVIEW_NODES = " + json.dumps(nodes, ensure_ascii=False, indent=2) + ";\n")
print(f"Built {len(nodes)} question nodes from captured evidence.")
