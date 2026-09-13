"""Build the PR 127 demo and component guide from the captured local evidence."""

from pathlib import Path
import json
import re

from kit.components import (
    BeforeAfter, Box, BoxDiagram, DecisionCard, Edge, ExitLink, Layer,
    page, text, validate_layers,
)

HERE = Path(__file__).resolve().parent
SNAPSHOT = json.loads((HERE / "sources/snapshot.json").read_text())
SOURCES = SNAPSHOT["sources"]


DECISIONS = (
    DecisionCard("d01", "01", "Put cache lifetime in core",
        "Export TurnScopedCacheScope and its typed handle from core. TypeScript still chooses when to begin a turn and release; core clears the entries.",
        "stated", "The architecture spec assigns shared cache lifecycle to core and semantic query bodies to the language backend.", "detail-d01", "ev-d01"),
    DecisionCard("d02", "02", "Keep six independent caches",
        "One scope owns six separate typed handles: definitions, references, call targets, callers, callees, and position definitions. Each keeps its own Map.",
        "stated", "The PR explicitly chooses isolated handles over a shared map because the queries have independent key and value spaces.", "detail-d02", "ev-d02"),
    DecisionCard("d03", "03", "Return the exact cached value",
        "Keep the existing identity and file-position keys. Cache values and promises without wrapping them. A stored undefined or empty array is still a hit; use Map.has.",
        "stated", "The PR promises preserved keys and identities and names undefined as the reason for checking membership before reading.", "detail-d03", "ev-d03"),
    DecisionCard("d04", "04", "Keep two different failure paths",
        "A returned promise stays cached even after rejection. A factory that throws before returning stores nothing, so the next lookup retries it.",
        "stated", "The PR's context commits to preserving existing failure behavior. New tests characterize asynchronous query failures and synchronous reference failures.", "detail-d04", "ev-d04"),
    DecisionCard("d05", "05", "Start a turn after refresh succeeds",
        "Keep the existing order: refresh source/project/workspace state, then clear all six caches. A failed refresh does not begin a new semantic-cache turn.",
        "stated", "The PR says a failed refresh must preserve the current successful turn. This is an existing boundary being retained.", "detail-d05", "ev-d05"),
    DecisionCard("d06", "06", "Clear immediately; make release wait",
        "Keep synchronous clearing before project release. Now the service and backend await project release, so its pending state and rejection reach the caller. The stack spec also asks for unchanged failure paths.",
        "stated", "The PR says released semantics must be unavailable while release is pending or rejecting. It requests the awaited barrier; reconciliation with the stack's parity wording is unexplained.", "detail-d06", "ev-d06"),
    DecisionCard("d07", "07", "Keep TypeScript's query work",
        "Keep algorithms and miss observers in TypeScript. Cache reference/position locations, then rebuild reference projections and node arrays on access; those outward arrays and wrapper promises need not share cache identity.",
        "stated", "The PR says this layer moves only cache lifetime while preserving all six algorithms. The spec reserves semantic query bodies for TypeScript.", "detail-d07", "ev-d07"),
    DecisionCard("d08", "08", "Accept files instead of a snapshot",
        "Change the exported service's beginTurn input from WorkspaceSnapshot to readonly WorkspaceFile[]. The backend now passes snapshot.files; the service retains that file list.",
        "unexplained", "The PR lists the signature change, but gives no reason for narrowing this public input. No reason found in its commits or the supplied specs.", "detail-d08"),
    DecisionCard("d09", "09", "Compose a scope that can be reused",
        "The service constructs a scope rather than extending a base. Handles expose getOrCreate only. Clearing retains handles and file inputs, cancels no promise, and permits new cache entries even while project release is pending.",
        "unexplained", "No rationale found for composition over a base or for a reusable, non-revoking API. The spec describes shared bases; the code keeps a registry of handles with no disposal operation.", "detail-d09"),
    DecisionCard("d10", "10", "Add tests around preserved contracts",
        "Add six TypeScript cases and four core cases for identities, empty results/rehydration, failures, clearing, failed refresh, awaited release, and old-promise settlement. Keep all five previous TypeScript tests and their assertions.",
        "stated", "The commits explicitly characterize identities and specify lifecycle/release. This supports the PR's preservation intent. These are source assertions, not a report of tests run here.", "detail-d10", "ev-d10"),
)


def exit(id, target, label):
    return ExitLink(id, target, label).render()


def table(headers, rows):
    return '<div class="data-table-wrap"><table><thead><tr>' + ''.join(f'<th scope="col">{text(v)}</th>' for v in headers) + '</tr></thead><tbody>' + ''.join('<tr>' + ''.join(f'<td>{v}</td>' for v in row) + '</tr>' for row in rows) + '</tbody></table></div>'


def flow(steps):
    return '<div class="flow">' + '<div class="flow-arrow" aria-hidden="true">↓</div>'.join(
        f'<div class="flow-step {tone}"><strong>{text(title)}</strong><small>{text(note)}</small></div>'
        for title, note, tone in steps) + '</div>'


def code(value):
    return f'<div class="inline-code"><pre><code>{text(value)}</code></pre></div>'


def diagrams():
    before = BoxDiagram(
        "ownership-before", "Before: TypeScript owns algorithms and cache clearing",
        "The backend calls the semantic query service inside backend-typescript. The service owns query algorithms, six Maps, and their manual clearing. Core has no semantic-cache scope.",
        530, 378,
        (
            Box("typescript", 14, 16, 502, 247, "@symnav/backend-typescript", boundary=True),
            Box("backend", 32, 58, 155, 64, "TypeScriptBackend", ("refresh / release",), target="detail-d05"),
            Box("service", 212, 58, 284, 187, "SemanticQueryService", boundary=True),
            Box("algorithms", 230, 100, 248, 51, "TypeScript query algorithms", target="detail-d07"),
            Box("maps", 230, 185, 248, 43, "Six Maps + manual clearing", tone="removed", target="detail-d02"),
            Box("core", 14, 310, 502, 54, "@symnav/core · no semantic-cache scope", boundary=True),
        ),
        (
            Edge("backend", "service", "calls", "right", "left", via=((199,90),(199,151)), label_at=(188,138)),
            Edge("algorithms", "maps", "get / set", label_at=(362,174)),
        ),
    ).render()
    after = BoxDiagram(
        "ownership-after", "After: core implements lifetime; TypeScript holds the scope",
        "The backend and semantic query service remain in backend-typescript. TypeScript query algorithms use six typed handles. The service constructs and calls a core TurnScopedCacheScope, which owns handles with private Maps. The new boundary crosses code packages, not processes.",
        530, 378,
        (
            Box("typescript", 14, 16, 502, 225, "@symnav/backend-typescript", boundary=True),
            Box("backend", 32, 58, 155, 64, "TypeScriptBackend", ("refresh / await release",), target="detail-d06"),
            Box("service", 212, 58, 284, 167, "SemanticQueryService", boundary=True),
            Box("algorithms", 230, 99, 248, 51, "TypeScript query algorithms", target="detail-d07"),
            Box("handles", 230, 165, 248, 43, "Six typed handle references", tone="changed", target="detail-d02"),
            Box("core", 14, 289, 502, 75, "@symnav/core · scope + six private Maps", boundary=True, tone="changed"),
            Box("scope", 230, 317, 248, 34, "TurnScopedCacheScope", tone="changed", target="detail-d01"),
        ),
        (
            Edge("backend", "service", "calls", "right", "left", via=((199,90),(199,141)), label_at=(188,137)),
            Edge("algorithms", "handles", "getOrCreate", label_at=(366,160)),
            Edge("service", "scope", "construct / beginTurn / release", tone="changed", label_at=(105,270)),
        ),
    ).render()
    return BeforeAfter("ownership", "Cache ownership crosses the package boundary", before, after,
        "Before · base of PR 127", "After · PR 127",
        "Simplified code ownership: only the relevant classes are shown. The scope is a TypeScript-held object implemented in core; all of these calls remain in one process. Click a box to follow it.").render()


def detail_content():
    return {
        "d01": code("@symnav/backend-typescript\n  TypeScriptSemanticQueryService\n    cacheScope = new TurnScopedCacheScope()\n                  │ import\n                  ▼\n@symnav/core\n  TurnScopedCacheScope\n    createCache() → TurnScopedCache<Key, Value>\n    beginTurn() / releaseTransientResources() → clear every handle") +
            '<p>The package containing the lifetime implementation changes. The caller that decides when to clear stays in TypeScript. Core exports both the scope class and the handle type; the concrete handle class is private.</p>' +
            '<p class="rk-caption">Schematic dependency map; abbreviated declarations. The public handle surface and choice of composition are also visible in decision 09.</p>' +
            exit("detail-d01-cross", "detail-d09", "Follow the reusable scope"),

        "d02": '<p>The service creates each handle once as an instance field. A handle gets its own Map, so the same key can select different values in different query families.</p>' +
            '<div class="scope-grid" role="group" aria-label="One scope contains six independent caches">' + ''.join(
                f'<div><b>{name}</b><small>{description}</small></div>' for name, description in (
                    ("definitionsByIdentity", "symbol key → promise of definitions"),
                    ("referencesByIdentity", "symbol key → promise of reference locations"),
                    ("callTargetsByIdentity", "symbol key → promise of resolution"),
                    ("callersByIdentity", "symbol key → promise of caller edges"),
                    ("calleesByIdentity", "symbol key → promise of callee edges"),
                    ("definitionsByPosition", "file:start → semantic location array"),
                )) + '</div><p class="legend">Outer boundary: one scope. Inner boxes: independent Maps behind typed handles.</p>',

        "d03": table(("Lookup", "Stored entry", "Factory call", "Returned value"), (
            ("First lookup of k", "Absent", "Runs once", "The exact result V is stored and returned"),
            ("Repeat lookup of k", "V exists", "Skipped", "The same V, including an empty array"),
            ("Repeat lookup of k", "undefined exists", "Skipped", "undefined; presence is checked with Map.has"),
            ("Same key, another handle", "Independent Map", "Runs in that handle", "That handle's own V"),
        )) + code('if (this.values.has(key)) return this.values.get(key) as Value;\nconst value = createValue();\nthis.values.set(key, value);\nreturn value;') +
            '<p>Five caches keep <code>formatSymbolIdentity(identity)</code> keys. The position cache keeps <code>relativePath:node.getStart()</code>. The handle returns a promise as an ordinary value; it adds no async wrapper. Outward projections are covered in decision 07.</p>' +
            exit("detail-d03-cross", "detail-d07", "Separate cache identity from projections"),

        "d04": BeforeAfter("failure-pair", "Synchronous throws and rejected promises stay distinct",
            flow((("Factory returns a promise", "The promise is stored immediately.", "neutral"),
                  ("Promise later rejects", "The cached object remains the same.", "neutral"),
                  ("Repeat lookup", "Receives that same rejected promise.", "neutral"))),
            flow((("Factory throws synchronously", "Execution never reaches Map.set.", "neutral"),
                  ("No entry was stored", "There is no rejected promise in this handle.", "neutral"),
                  ("Repeat lookup", "Runs the factory again.", "neutral"))),
            "Returned rejection · preserved", "Synchronous throw · preserved",
            "Illustrative control paths, not a runtime recording. Both behaviors are retained, not introduced by PR 127.").render() +
            '<p>Reference discovery calls <code>findReferenceLocations</code> before <code>Promise.resolve</code> receives its argument. A synchronous discovery failure therefore escapes the factory before storage. The outward async reference method can still return a rejected promise; that wrapper is not the cached entry.</p>',

        "d05": BeforeAfter("refresh-pair", "Refresh decides the semantic turn boundary",
            flow((("Source cache refresh", "Updates from request.snapshot.", "neutral"),
                  ("Project graph refresh", "Awaited for workspace coverage.", "neutral"),
                  ("Workspace state refresh succeeds", "Awaited for the requested files and coverage.", "neutral"),
                  ("beginTurn", "Keep the new files; synchronously clear every cache.", "changed"))),
            flow((("A refresh step fails", "The awaited call rejects or the synchronous step throws.", "neutral"),
                  ("beginTurn is not reached", "The previous semantic-cache turn is retained.", "neutral"))),
            "Successful refresh · same order before/after", "Failed refresh · same order before/after",
            "Simplified control flow. This says when semantic caches clear; it does not claim that all earlier refresh work rolls back.").render(),

        "d06": BeforeAfter("release-pair", "The completion boundary moves to the project release",
            flow((("Backend calls service", "The backend method already returns Promise<void>.", "neutral"),
                  ("Service clears all six Maps", "Synchronous, before project release.", "neutral"),
                  ("Project release starts", "Its promise is not awaited by the service.", "neutral"),
                  ("Backend can finish", "Project release may still be pending; its rejection is not chained.", "removed"))),
            flow((("Backend awaits service", "The service now returns Promise<void> too.", "changed"),
                  ("Core scope clears all six handles", "Still synchronous, before project release.", "neutral"),
                  ("Service awaits project release", "Backend remains pending with it.", "changed"),
                  ("Project release settles", "Fulfillment or rejection reaches the backend caller.", "changed"))),
            "Before · completion could precede release", "After · completion includes release",
            "Simplified sequence with an asynchronous project release. Core cache clearing itself has no await.").render() +
            '<div class="callout unknown"><p><strong>Two stated intentions meet here.</strong> The PR requests an awaited release barrier. The architecture spec requests unchanged failure paths. The changed promise chain exposes a project-release rejection to the backend caller. Neither document explains how these two intentions are reconciled.</p></div>' +
            '<p>Clearing removes cached entries, not every reference ever returned. Queries can repopulate caches while release is pending; the added test deliberately does so. See decision 09 for that lifetime limit.</p>' +
            exit("detail-d06-cross", "detail-d09", "What clearing does to existing handles"),

        "d07": table(("Cache / public operation", "What is shared", "What is produced on access"), (
            ("findDefinitions / findCallTarget / findCallers / findCallees", "Each service method's own cached promise", "The same promise within that handle and turn"),
            ("findReferences", "Internal referenceLocations promise, also used by callers", "A reference projection array after awaiting locations"),
            ("definitionNodesOf", "Semantic location array, including an empty one", "A new array of rehydrated nodes; node objects can be identical"),
        )) +
            '<p>Miss observers remain inside factories, so a cache hit skips the observer and underlying search. TypeScript still finds definitions, discovers references, builds caller/callee edges, classifies references, and locates syntax nodes. Core stores values without knowing these algorithms.</p>' +
            '<p class="rk-caption">Identity is a cache-level contract, not a claim that every backend method or outward projection returns the same Promise object.</p>',

        "d08": BeforeAfter("input-pair", "The public beginTurn input narrows",
            code('beginTurn(snapshot: WorkspaceSnapshot): void {\n  this.files = snapshot.files;\n  this.clearQueryCaches();\n}'),
            code('beginTurn(files: readonly WorkspaceFile[]): void {\n  this.files = files;\n  this.cacheScope.beginTurn();\n}'),
            "Before · whole snapshot", "After · file list").render() +
            '<p>The only changed production call passes <code>request.snapshot.files</code>. Both versions retain the file list by reference. The service is exported by the TypeScript package; the input type change is therefore part of its public surface.</p>' +
            '<div class="callout unknown"><p><strong>Reason unexplained.</strong> The PR names the new signature. It does not say why the snapshot parameter was narrowed as part of moving cache lifetime.</p></div>',

        "d09": BeforeAfter("handle-pair", "Clearing entries retains handles and returned promises",
            flow((("Service constructs a scope", "One registry stores all created handles.", "neutral"),
                  ("beginTurn or release clears entries", "Each registered Map is cleared; the registry remains.", "neutral"),
                  ("The same handle is called again", "It can store a new entry immediately.", "neutral"))),
            flow((("An old promise P was returned", "The caller already holds P.", "neutral"),
                  ("A clear happens; new promise Q is cached", "Clearing has no cancellation or settlement hook.", "neutral"),
                  ("P settles later", "P still settles; the cache still contains Q.", "neutral"))),
            "Handle lifetime", "Returned promise lifetime",
            "Illustrative ordering, not cancellation or a concurrency protocol. The scope has no active-turn flag, revocation, disposal, or per-entry eviction API.").render() +
            '<p>The typed consumer sees only <code>getOrCreate</code>. The scope alone exposes <code>beginTurn</code> and <code>releaseTransientResources</code>, both synchronous. Neither operation resets the service’s files. Composition is concrete in <code>new TurnScopedCacheScope()</code>; the architecture spec’s wording describes shared bases.</p>' +
            '<div class="callout unknown"><p><strong>Reason unexplained.</strong> The source and tests show these choices, but the searched PR, commit bodies, and specs do not explain choosing this composed, reusable API over an inherited or revocable one.</p></div>',

        "d10": table(("Changed test file", "Before", "After", "What the added assertions cover"), (
            ("TypeScript semantic query service", "5 test cases", "11 test cases", "4 query promise identities; empty position caching with node rehydration; async failure retention; synchronous retry; failed refresh; pending/rejecting release"),
            ("Core turn-scoped cache scope", "File absent", "4 test cases", "Exact values including undefined; isolated handles; turn/repeated-release clearing; rejection and synchronous failure distinction; old promise settlement"),
        )) +
            '<p>The five pre-existing TypeScript cases and everything from their first declaration to the end of the file are byte-for-byte retained. The changed test file adds imports and six cases ahead of them. No test or assertion is deleted or weakened in this diff.</p>' +
            '<p>The release test uses controlled fake workspace/project objects to observe cache invalidation while project release is pending, then rejects release and observes the backend rejection. These assertions describe intended contracts; this artifact does not claim to have executed the symnav test suite.</p>' +
            '<p class="rk-caption">These test assertions are evidence of intended contracts, with no claim that they exhaust all possible executions.</p>',
    }


# Evidence excerpts are verbatim slices, with one-based inclusive line ranges.
EVIDENCE = {
    "d01": ("Ownership and public exports", "Core implements the lifecycle; TypeScript invokes it.", (
        ("spec-head", 53, 64, "The spec assigns language-independent lifetime to core", True),
        ("core-index-head", 146, 154, "Core exports the scope and handle type", True),
        ("scope-head", 1, 46, "The complete new core implementation", False),
        ("service-head", 29, 66, "The service constructs the scope and starts turns", False),
    )),
    "d02": ("Six handles, six private Maps", "The stated reason is independent key/value spaces.", (
        ("pr-body", 1, 1, "PR reason: independent key and value spaces", False),
        ("service-head", 29, 55, "Six handle declarations", True),
        ("scope-head", 9, 33, "A new Map for each created handle", True),
    )),
    "d03": ("Membership, exact values, unchanged keys", "A successful factory return is stored without conversion.", (
        ("pr-body", 1, 1, "PR reason: undefined is a valid cached value", False),
        ("scope-head", 12, 19, "The complete getOrCreate body", True),
        ("scope-test-head", 6, 27, "Assertions for exact values, undefined and isolation", True),
        ("service-base", 53, 65, "Previous formatted identity key", False),
        ("service-head", 68, 77, "Retained formatted identity key", False),
        ("service-base", 131, 137, "Previous file-position key", False),
        ("service-head", 134, 140, "Retained file-position key", False),
    )),
    "d04": ("Failure timing determines storage", "The two failure contracts are preserved in the source and characterized by tests.", (
        ("pr-body", 1, 3, "PR intent: preserve identities and failure behavior", False),
        ("scope-head", 14, 19, "A throwing factory never reaches set", True),
        ("service-head", 163, 177, "Reference discovery is evaluated before Promise.resolve", True),
        ("service-base", 161, 174, "Previous reference caching uses the same evaluation order", False),
        ("scope-test-head", 55, 74, "Assertions for cached rejection and synchronous retry", False),
        ("service-test-head", 95, 133, "TypeScript-level failure characterizations", False),
    )),
    "d05": ("The successful-refresh boundary is retained", "The placement of beginTurn is the same across revisions.", (
        ("pr-body", 1, 1, "PR reason: preserve the current successful turn on failed refresh", False),
        ("backend-base", 79, 85, "Before: beginTurn follows the awaited refresh", True),
        ("backend-head", 79, 85, "After: same order, files-only input", True),
        ("service-test-head", 135, 162, "New failed-refresh assertion", False),
    )),
    "d06": ("Release completion and the stated parity contract", "Awaiting introduces a promise chain through the service and backend. The PR requests that barrier; the spec also requests unchanged failure paths.", (
        ("pr-body", 1, 1, "PR reason: clear before pending or rejecting release", False),
        ("service-base", 125, 128, "Before: project release is not awaited", True),
        ("service-head", 129, 132, "After: clear, then await project release", True),
        ("backend-base", 87, 89, "Before: backend does not chain the service release", True),
        ("backend-head", 87, 89, "After: backend awaits service release", True),
        ("spec-head", 17, 28, "The stack's unchanged-failure-path requirement", True),
        ("service-test-head", 164, 217, "Controlled pending release, cache refill, then rejection", False),
    )),
    "d07": ("Algorithms and outward projections stay in TypeScript", "The cache stores locations; access reconstructs projections and node arrays.", (
        ("pr-body", 1, 3, "PR intent: preserve all six algorithms", False),
        ("spec-head", 53, 64, "The spec reserves semantic query bodies for TypeScript", False),
        ("service-head", 80, 114, "Reference projections and shared reference locations", True),
        ("service-head", 134, 161, "Position caching followed by node rehydration", True),
        ("service-test-head", 61, 93, "Empty result caching and fresh array assertions", False),
        ("service-test-head", 219, 239, "Retained shared-reference-search test", False),
        ("service-head", 68, 77, "The miss observer remains in the factory", False),
    )),
    "d08": ("An exported input type changes", "This change is listed by the PR; a reason for it is not supplied.", (
        ("pr-body", 1, 1, "Public-surface section lists the change", False),
        ("service-base", 49, 52, "Before: full WorkspaceSnapshot", True),
        ("service-head", 63, 66, "After: readonly WorkspaceFile[]", True),
        ("backend-head", 79, 85, "Updated production call", False),
        ("backend-index-head", 10, 16, "SemanticQueryService is exported from the package", False),
    )),
    "d09": ("A composed, reusable scope", "The implementation retains its registry and has no settlement hook. The reason for this API shape is not recorded in the searched material.", (
        ("scope-head", 1, 46, "Public API, persistent handle registry, clearing implementation", True),
        ("service-head", 29, 35, "Composition at the TypeScript service", True),
        ("spec-head", 53, 63, "The spec describes a shared base", True),
        ("scope-test-head", 29, 52, "The same handles work after repeated release", False),
        ("scope-test-head", 76, 91, "Old promise settles without replacing the new turn entry", False),
        ("service-test-head", 197, 217, "A query can refill during pending release", False),
        ("service-head", 129, 132, "Release does not reset the retained files", False),
    )),
    "d10": ("Test additions and preservation audit", "The audit is a comparison of source texts, not a correctness verdict or test execution.", (
        ("commits", 1, 22, "Commit subjects characterize identities and specify lifecycle/release", True),
        ("scope-test-head", 1, 92, "Four new core cases", False),
        ("service-test-head", 29, 217, "Six new TypeScript cases", False),
        ("service-test-base", 25, 207, "Five previous cases", False),
        ("service-test-head", 219, 402, "The same five cases after the insertion", False),
    )),
}


def locate_evidence():
    pr_lines = SOURCES["pr-body"]["text"].splitlines()
    needles = {
        "d02": "Chose one scope", "d03": "Chose `Map.has`",
        "d05": "Chose to begin", "d06": "Chose synchronous",
        "d08": "Changed on exported",
    }
    for key, needle in needles.items():
        title, intro, refs = EVIDENCE[key]
        line = next(i+1 for i, value in enumerate(pr_lines) if needle in value)
        span = 8 if key == "d08" else 0
        EVIDENCE[key] = title, intro, (("pr-body", line, line+span, refs[0][3], True), *refs[1:])


def source_lines(key, start, end, prefix):
    lines = SOURCES[key]["text"].splitlines()
    if start < 1 or end > len(lines) or start > end:
        raise ValueError(f"Invalid excerpt: {key}:{start}-{end} ({len(lines)} lines)")
    return ''.join(
        f'<div class="source-line" id="{prefix}-l{number}"><a href="sources/{key}.html#L{number}" aria-label="Open full source at line {number}">{number}</a><code>{text(lines[number-1])}</code></div>'
        for number in range(start, end+1)
    )


def excerpt(key, start, end, title, opened, id):
    source = SOURCES[key]
    return f'''<details class="source-block" {'open' if opened else ''}>
      <summary>{text(title)} · {text(source['revision'])} L{start}–{end}</summary>
      <div class="source-meta">{text(source['path'])}<br>{text(source['sha'])} · <a href="sources/{key}.html#L{start}">Full captured source</a></div>
      <div class="source-code">{source_lines(key, start, end, id)}</div></details>'''


def audit_tests():
    before = SOURCES["service-test-base"]["text"]
    after = SOURCES["service-test-head"]["text"]
    marker = '  it("shares one reference search across caller and reference projections"'
    identical = before[before.index(marker):] == after[after.index(marker):]
    names = lambda body: re.findall(r'\bit\("([^"\n]+)"', body)
    old, new, core = names(before), names(after), names(SOURCES["scope-test-head"]["text"])
    if not identical or len(old) != 5 or len(new) != 11 or len(core) != 4:
        raise ValueError("The written test-preservation explanation no longer matches the captured source.")
    audit = {"method": "Source-text comparison only; no symnav test run", "base_test_names": old,
        "added_typescript_test_names": [name for name in new if name not in old],
        "added_core_test_names": core, "existing_tests_through_end_of_file_identical": identical}
    (HERE / "sources/test-audit.json").write_text(json.dumps(audit, indent=2) + "\n")
    return audit


def render_demo():
    contents = detail_content()
    detail_claims = {d.id: (d.id,) for d in DECISIONS}
    detail_claims.update({"d01": ("d01", "d09"), "d03": ("d03", "d07"), "d06": ("d06", "d09")})
    layers = tuple(Layer(f"detail-{d.id}", detail_claims[d.id], "overview") for d in DECISIONS) + tuple(Layer(f"ev-{d.id}", (d.id,), f"detail-{d.id}") for d in DECISIONS)
    validate_layers(tuple(d.id for d in DECISIONS), layers)
    (HERE / "coverage.json").write_text(json.dumps({
        "root_claims": [{"id": d.id, "title": d.title, "choice": d.choice, "reason_status": d.status} for d in DECISIONS],
        "layers": [vars(layer) for layer in layers],
        "limit": "Structural announcement check only. A human must still read every lower layer for semantic surprises.",
    }, indent=2) + "\n")
    overview = f'''<section id="overview">
      <div class="hero"><p class="eyebrow">Symnav / daemon refactor / PR 127</p>
      <h1>Six caches get one<br>lifetime owner.</h1>
      <p class="lead">Core takes over clearing. TypeScript keeps the query work.<br><strong>Release now waits for the project graph, including its failure.</strong></p>
      <div class="hero-meta"><span>6 changed files</span><span>4th layer in a 26-PR stack</span><span>Base #126 → #127</span></div></div>
      <div class="overview-label"><strong>01 / THE WHOLE CHANGE</strong><span>Read the map and decisions. Stop here, or follow any box.</span></div>
      {diagrams()}
      <div class="boundary-key"><span>New lifetime implementation / handle boundary</span><span>Manual clearing moves out of TypeScript</span></div>
      <div class="callout"><p><strong>A turn is a cache lifetime.</strong> It starts after a successful backend refresh. Release clears entries immediately, but does not cancel returned promises or block new queries. The new wait belongs to the TypeScript release chain.</p></div>
      <div class="section-intro"><div><p class="eyebrow">The decisions / complete at this level</p><h2>What a reader needs to weigh</h2></div><p>Reasons come from the PR and spec. Two API choices have no located rationale. The release barrier also meets a stricter parity promise in the stack spec.</p></div>
      <div class="decision-grid">{''.join(d.render() for d in DECISIONS)}</div>
      <div class="stop-line"><p><strong>That is the overview.</strong> The next layers unpack these same ten choices and show their source.</p>{exit('linear-start', 'detail-d01', 'Continue through the mechanisms')}</div>
    </section>'''
    mechanisms = '<div class="depth-band"><p class="eyebrow">02 / MECHANISM</p><h2>Follow one choice all the way down.</h2><p>Every section returns to its decision. The next-section links also form a continuous reading path.</p></div>'
    for i, d in enumerate(DECISIONS):
        next_target = f"detail-{DECISIONS[i+1].id}" if i+1 < len(DECISIONS) else "ev-d01"
        next_label = f"Next: {DECISIONS[i+1].title}" if i+1 < len(DECISIONS) else "Continue into source evidence"
        mechanisms += f'''<section class="depth-section" id="detail-{d.id}" data-layer="mechanism" data-claims="{' '.join(detail_claims[d.id])}">
          <header class="depth-header"><div><p class="eyebrow">Decision {d.number} / mechanism</p><h3>{text(d.title)}</h3></div><a data-return href="#{d.id}">← Return to decision {d.number}</a></header>
          <div class="depth-content">{contents[d.id]}</div>
          <div class="detail-next">{exit(f'mechanism-{d.id}-evidence', f'ev-{d.id}', 'Read the source evidence')}{exit(f'next-{d.id}', next_target, next_label)}</div>
        </section>'''
    evidence = '<div class="depth-band" id="evidence"><p class="eyebrow">03 / EVIDENCE</p><h2>Verbatim source, pinned to this PR.</h2><p>Captured base a1e325a5ff97 and head 64919bcbcf7f. The snippets below are local copies with original line numbers. Tests are read as assertions of intent; no correctness verdict is attached.</p></div>'
    for i, d in enumerate(DECISIONS):
        title, intro, refs = EVIDENCE[d.id]
        body = ''.join(excerpt(*ref, id=f"ev-{d.id}-s{j}") for j, ref in enumerate(refs))
        if d.id == "d10":
            body = '<p><a href="sources/test-audit.json">Open the source-preservation audit and exact test names</a></p>' + body
        next_target = f"ev-{DECISIONS[i+1].id}" if i+1 < len(DECISIONS) else "overview"
        next_label = f"Next evidence: decision {DECISIONS[i+1].number}" if i+1 < len(DECISIONS) else "Return to the whole change"
        evidence += f'''<section class="depth-section" id="ev-{d.id}" data-layer="evidence" data-claims="{d.id}">
          <header class="depth-header"><div><p class="eyebrow">Decision {d.number} / evidence</p><h3>{text(title)}</h3></div><a data-return href="#detail-{d.id}">← Return to the mechanism</a></header>
          <div class="depth-content"><p>{text(intro)}</p>{body}</div>
          <div class="detail-next"><a href="sources/diff.html">Full captured diff · all six files</a>{exit(f'evidence-next-{d.id}',next_target,next_label)}</div>
        </section>'''
    (HERE / "index.html").write_text(page("PR 127 · Six caches get one lifetime owner · Review kit", overview + mechanisms + evidence))


def render_source_pages():
    for key, source in SOURCES.items():
        rows = ''.join(f'<div class="source-line" id="L{number}"><a href="#L{number}">{number}</a><code>{text(line)}</code></div>' for number, line in enumerate(source["text"].splitlines(), 1))
        related = [d for d in DECISIONS if any(ref[0] == key for ref in EVIDENCE[d.id][2])]
        returns = ' · '.join(f'<a href="../index.html#ev-{d.id}">Decision {d.number} evidence</a>' for d in related)
        body = f'''<div class="hero"><p class="eyebrow">Captured source / {text(source['revision'])}</p><h1 style="font-size:36px">{text(Path(source['path']).name)}</h1>
          <p class="source-description"><code>{text(source['path'])}</code><br>Revision <code>{text(source['sha'])}</code></p>
          <p class="coverage">SHA-256 {text(source['sha256'])}</p><p class="source-description">{returns or '<a href="../index.html#evidence">Return to evidence</a>'}</p></div>
          <div class="source-file"><div class="source-code">{rows}</div></div>'''
        (HERE / f"sources/{key}.html").write_text(page(f"{source['revision']} · {source['path']}", body, prefix="../", active="source"))


def render_guide():
    specimen = DecisionCard("specimen-card", "06", DECISIONS[5].title, DECISIONS[5].choice,
        DECISIONS[5].status, DECISIONS[5].reason, "specimen-detail", "specimen-evidence").render()
    body = f'''<div class="hero"><p class="eyebrow">The reusable part / Python → static HTML</p><h1>Four pieces.<br>One reading contract.</h1><p class="lead">A box locates a responsibility. A comparison shows the move. A decision names the choice and its reason. An exit takes the reader deeper and brings them back.</p></div>
      <div class="kit-list"><a href="#box-component"><b>01</b>BoxDiagram</a><a href="#comparison-component"><b>02</b>BeforeAfter</a><a href="#decision-component"><b>03</b>DecisionCard</a><a href="#exit-component"><b>04</b>ExitLink</a></div>
      <div class="docs"><h2>Copy a small library, keep the evidence separate.</h2>
      <p>Copy <code>kit/</code> and import from <code>kit.components</code>. The four components know nothing about Symnav, PR numbers, GitHub, or this demo’s decision names. <code>build.py</code> holds the PR-specific content. HTML files open directly; Python is needed only to rebuild them.</p>
      {code('from kit.components import Box, BoxDiagram, Edge, BeforeAfter, DecisionCard, ExitLink, page\n\n# Compose trusted component HTML, then write it to a file.\nPath("index.html").write_text(page("Your review", body))')}
      <p><a href="KIT.md">Full authoring contract and API</a> · <a href="starter.py">Runnable minimal composition</a> · <a href="starter.html">Open its generated result</a> · <a href="kit/components.py">Component source</a></p>
      <section id="box-component"><h2>01 / BoxDiagram</h2><p>Use boxes for real units, boundary rectangles for ownership, and named directional edges for interaction. Coordinates belong to the author: the kit does not guess an architecture. Changed and removed strokes are distinct in both color and pattern. Every linked box remains an ordinary keyboard-accessible SVG link.</p>
      {code('BoxDiagram(\n  id="owners", title="Who clears?", description="…",\n  width=530, height=378,\n  boxes=(Box("scope", 230, 317, 248, 34,\n             "TurnScopedCacheScope", tone="changed",\n             target="scope-detail"), ...),\n  edges=(Edge("service", "scope", "clear", tone="changed"),),\n  lossy_note="Simplified: relevant classes only."\n).render()')}
      <p>See the <a href="index.html#ownership">paired ownership diagram in PR 127</a>. On narrow screens the SVG scrolls inside its figure to preserve legible labels. The text description gives the relationship to assistive technology. A static picture cannot explain lifecycle alone; pair it with the same choices shown as a sequence.</p></section>
      <section id="comparison-component"><h2>02 / BeforeAfter</h2><p>Two panels, always present, with a shared frame of reference. Supply diagrams, tables, timelines, or code as the contents. Label both versions and put any simplifying assumption beside the comparison. The component stacks the panels on narrow screens without swapping their order.</p>
      {code('BeforeAfter(\n  id="release", title="When release finishes",\n  before=before_sequence, after=after_sequence,\n  before_label="Base", after_label="Head",\n  note="Illustrative sequence; not a runtime recording."\n).render()')}
      <p>See <a href="index.html#release-pair">release before and after</a>, and <a href="index.html#input-pair">a public signature before and after</a>. The component is the same; the representation matches the subject.</p></section>
      <section id="decision-component"><h2>03 / DecisionCard</h2><p>A choice is mandatory. A reason is either stated, with an evidence destination, or unexplained, with a description of the search boundary. The card does not infer intent from the code and has no verdict or response fields.</p>
      <div class="specimen">{specimen}</div>
      {code('DecisionCard(\n  id="decision-id", number="01", title="The choice",\n  choice="What this change commits to, including its limits.",\n  status="stated",\n  reason="The reason the source actually gives.",\n  target="mechanism-id", reason_target="evidence-id"\n).render()')}
      <p>For an unexplained choice, set <code>status="unexplained"</code> and omit <code>reason_target</code>. A changed signature is not automatically a reason for that change. Reason provenance is separate from evidence that the implementation exists.</p></section>
      <section id="exit-component"><h2>04 / ExitLink</h2><p>An exit is a normal anchor with a stable origin ID. JavaScript adds the return address to a destination’s direct header, opens enclosing native details, and moves keyboard focus after navigation. Browser Back, copied links, modifier-clicks, direct file opening, and JavaScript-disabled reading retain standard browser behavior.</p>
      {code('ExitLink("origin-id", "destination-id", "Follow release").render()\n\n# The destination carries an ordinary fallback backlink:\n<section id="destination-id">\n  <header class="depth-header">\n    <h3>Release boundary</h3>\n    <a data-return href="#decision-id">← Return to the decision</a>\n  </header>\n  ...\n</section>')}
      <p>Try the specimen card above, then use its return link below. Return addresses live only in link attributes in this document. There is no persisted reader data.</p></section>
      <section class="depth-section" id="specimen-detail"><header class="depth-header"><h3>The specimen’s mechanism exit</h3><a data-return href="#specimen-card">← Return to the specimen</a></header><p>This landing exists to demonstrate navigation. <a href="index.html#detail-d06">The PR’s release mechanism is in the demo.</a></p>{exit('specimen-deeper','specimen-evidence','Follow the same choice to evidence')}</section>
      <section class="depth-section" id="specimen-evidence"><header class="depth-header"><h3>The specimen’s evidence exit</h3><a data-return href="#specimen-card">← Return to the specimen</a></header><p><a href="index.html#ev-d06">Read the captured PR, base/head release methods, and spec in the demo.</a></p></section>
      <h2>The invariant lives in authoring, too.</h2><p>Give every root decision an ID. Declare each lower section’s parent and claim IDs. <code>validate_layers</code> rejects missing parents, duplicate IDs, and a child claiming a decision its parent never announced. It cannot detect a novel fact hidden in prose: read each descent manually. <a href="coverage.json">PR 127’s coverage manifest</a> makes that audit reviewable.</p>
      <p>Default to a visible overview followed by mechanisms, then evidence. Link any high-level box or card to its lower section. The page remains one linear document, and every destination has a fallback way back.</p>
      <h2>What this kit leaves to the author</h2><p>Choice extraction, honest rationale attribution, ranking, drawing coordinates, and matching a representation to the subject. The kit supplies structure; a reusable component cannot supply understanding on its own.</p>
      </div>'''
    (HERE / "kit.html").write_text(page("Use the review components · Kit 32", body, active="kit"))


def main():
    locate_evidence()
    audit_tests()
    render_demo()
    render_source_pages()
    render_guide()
    print("Built PR 127 demo, component guide, coverage manifest, and 17 local source pages.")


if __name__ == "__main__":
    main()
