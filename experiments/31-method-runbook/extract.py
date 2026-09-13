#!/usr/bin/env python3
"""Human-authored extraction for this trial. Coordinates and coverage are computed."""
from pathlib import Path
import json
import re

OUT = Path(__file__).resolve().parent
SERVICE = "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts"
TEST = SERVICE.replace(".ts", ".test.ts")
BACKEND = "packages/backend-typescript/src/typescript-backend/typescript-backend.ts"
SCOPE = "packages/core/src/backend/turn-scoped-cache-scope.ts"
CORETEST = SCOPE.replace(".ts", ".test.ts")
SPEC = "plans/005/daemon-architecture-functional-spec.md"
PR = "derived/pr-body.md"

# Each tuple is an exact copied-source coordinate, with an authored reading label.
COORDINATES = [
    ("E01", PR, 3, 3, "PR: compatibility intent"),
    ("E02", PR, 18, 29, "PR: composed scope and awaited barrier"),
    ("E03", PR, 78, 78, "PR: reason for six handles"),
    ("E04", PR, 79, 79, "PR: reason for presence checks"),
    ("E05", PR, 80, 80, "PR: reason for clearing before release"),
    ("E06", PR, 81, 81, "PR: reason for success-only turn change"),
    ("E07", PR, 50, 74, "PR: public surfaces"),
    ("E08", "head/" + SPEC, 53, 64, "Plan: bases and language ownership"),
    ("E09", "head/" + SPEC, 17, 28, "Plan: preserve behavior and separate fixes"),
    ("E10", "base/" + SERVICE, 28, 52, "Before: six Maps and snapshot input"),
    ("E11", "head/" + SERVICE, 29, 66, "After: scope, handles, files input"),
    ("E12", "head/" + SCOPE, 1, 46, "Core: entire new lifecycle implementation"),
    ("E13", "base/" + BACKEND, 79, 89, "Before: refresh and detached release"),
    ("E14", "head/" + BACKEND, 79, 147, "After: refresh, awaited release, and async query wrappers"),
    ("E15", "base/" + SERVICE, 125, 128, "Before: clear, start graph release, return void"),
    ("E16", "head/" + SERVICE, 129, 132, "After: clear, await graph release"),
    ("E17", "head/packages/core/src/workspace/project-graph.ts", 144, 152, "Existing graph: sequential release with awaits"),
    ("E18", "head/packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts", 78, 84, "Existing concrete project: synchronous cleanup"),
    ("E19", "head/" + SCOPE, 1, 24, "Handle: presence check, raw value, set after factory"),
    ("E20", "head/" + SCOPE, 26, 46, "Scope: registry and repeatable clear"),
    ("E21", "head/" + SERVICE, 68, 77, "Definitions: factory and observer remain on misses"),
    ("E22", "head/" + SERVICE, 103, 127, "Call queries: original algorithms in factories"),
    ("E23", "head/" + SERVICE, 134, 160, "Position cache: locations in, nodes rehydrated out"),
    ("E24", "base/" + SERVICE, 130, 158, "Before: same location and node projection"),
    ("E25", "head/" + SERVICE, 80, 100, "References: per-access projection outside cached locations"),
    ("E26", "head/" + SERVICE, 163, 177, "Reference discovery can throw before Promise.resolve"),
    ("E27", "base/" + SERVICE, 161, 177, "Before: same synchronous reference discovery"),
    ("E28", "head/" + CORETEST, 6, 25, "New test: identity, undefined, isolated handles"),
    ("E29", "head/" + CORETEST, 27, 47, "New test: turn clear, repeated release, reusable handles"),
    ("E30", "head/" + CORETEST, 49, 73, "New test: rejected promise versus synchronous throw"),
    ("E31", "head/" + CORETEST, 75, 91, "New test: old settlement cannot replace new entry"),
    ("E32", "head/" + TEST, 29, 59, "New test: four direct query promise identities"),
    ("E33", "head/" + TEST, 61, 93, "New test: empty locations and per-access node arrays"),
    ("E34", "head/" + TEST, 95, 133, "New tests: async failure retention and sync retry"),
    ("E35", "head/" + TEST, 135, 162, "New test: failed refresh retains current turn"),
    ("E36", "head/" + TEST, 164, 217, "New test: pending and rejecting release double"),
    ("E37", "head/" + TEST, 219, 269, "Retained tests: shared references and next-turn clearing"),
    ("E38", "head/" + TEST, 270, 330, "Retained tests: repeated targets and diamond paths"),
    ("E39", "head/" + TEST, 332, 405, "Retained test: rebuilding released semantics"),
    ("E40", "head/packages/core/src/index.ts", 147, 155, "Added package-root exports"),
    ("E41", "head/packages/backend-typescript/src/index.ts", 12, 16, "Service was already exported at package root"),
    ("E42", "head/packages/backend-typescript/src/definition/find-definitions.ts", 21, 30, "Definition query starts asynchronously"),
    ("E43", "head/packages/backend-typescript/src/call-graph/find-callees.ts", 35, 38, "Callee query starts asynchronously"),
    ("E44", "base/" + SERVICE, 54, 65, "Before: exact definition promise is stored"),
    ("E45", "base/" + SERVICE, 91, 123, "Before: call query caching"),
    ("E46", "base/" + SERVICE, 219, 226, "Removed manual six-cache clear sequence"),
    ("E47", PR, 42, 47, "PR: characterization and contract-test intention"),
]


def decision(id, title, before, after, consequence, status, reason, reason_evidence, intent,
             evidence, box, boundary, mechanism):
    return dict(id=id, title=title, before=before, after=after, consequence=consequence,
                reason_status=status, reason=reason, reason_evidence=reason_evidence,
                intent=intent, evidence=evidence, box=box, boundary=boundary,
                parent="overview-" + id, mechanism=mechanism)


# These are editorial claims, not facts mined by an algorithm.
DECISIONS = [
    decision("D01", "Give six caches one clearing owner",
             "The TypeScript service owns six Maps and a six-call clearing list.",
             "The service creates one core scope with six independent typed handles.",
             "Core owns clearing for all six handles; TypeScript keeps the query algorithms. Five handles use symbol identities, one uses file positions. Their key and value spaces stay separate.",
             "stated", "Independent query key and value spaces are the stated reason for six handles.", ["E03", "E08"],
             "Explicit in the PR context, shape, and decisions.",
             ["E10", "E11", "E12", "E46", "E03", "E08"], "TypeScript service → core scope → handles", "Clearing ownership crosses into core; algorithms stay in TypeScript.",
             [("Ownership", "The removed clearQueryCaches method names all six Maps. The new scope registers clearable handles and visits its registry on either boundary.", ["E46", "E20"]),
              ("Partition", "definitions, references, call targets, callers, and callees use formatted symbol-identity strings. definitionsByPosition uses relativePath:start. Each createCache call allocates a separate Map.", ["E11", "E19", "E21", "E22", "E23", "E26"]) ]),
    decision("D02", "Empty entries before project release",
             "The service synchronously clears its six Maps before starting graph release.",
             "The service synchronously clears its scope before awaiting graph release.",
             "Old cache entries disappear synchronously when release starts, even while project release is pending or rejects. The ordering is preserved; the clearing owner changes.",
             "stated", "The PR says released semantics must be unavailable while release is pending or rejecting.", ["E05"],
             "Explicit PR decision; existing order preserved through the core scope.",
             ["E15", "E16", "E20", "E36", "E05"], "Service / core scope / project graph", "Entry eviction happens before the asynchronous project boundary.",
             [("First", "Calling the async service method executes cacheScope.releaseTransientResources synchronously, before its first await.", ["E16", "E20"]),
              ("During release", "The added test queries after release begins, obtains a different definition array, and sees the backend release promise still pending before rejecting its controlled graph promise.", ["E36"])]),
    decision("D03", "Advance the cache turn only after refresh succeeds",
             "beginTurn follows the awaited state refresh.",
             "The ordering remains; beginTurn delegates clearing to core.",
             "Successful refresh clears the previous turn, even for unchanged files. Failed refresh never reaches beginTurn, so it keeps the prior cache entries and query-file list. This is a cache guarantee, not a claim that every refresh side effect is rolled back.",
             "stated", "The PR says failed refresh must preserve the current successful turn.", ["E06"],
             "Explicit PR decision and new characterization test; behavior preserved.",
             ["E13", "E14", "E11", "E35", "E37", "E06"], "Backend refresh → service turn", "The turn boundary remains after successful preparation.",
             [("Refresh path", "Source-cache refresh runs first; workspace coverage also awaits project-graph refresh; state refresh is awaited next. Only then is the file list passed to beginTurn.", ["E14"]),
              ("Failure path", "A rejected state refresh skips both the file-list assignment and scope clear. Earlier source/project work is outside this cache-lifecycle claim.", ["E14", "E11", "E35"]),
              ("Unchanged input", "The retained next-turn test refreshes the same snapshot twice and expects a second reference search after the second refresh.", ["E37"]) ]),
    decision("D04", "Use a scope object at the package seam",
             "Generic cache machinery is implemented inside the TypeScript service.",
             "The service constructs a core helper object and calls its methods.",
             "The service composes a core scope. The plan describes shared backend bases and inheritance; the PR shows this composed form, without giving a reason for that form. The existing TypeScript → core dependency direction is retained.",
             "unexplained", "The PR describes composition but gives no reason for choosing it over the plan's base/extends wording.", [],
             "Present in the PR shape; differs in implementation form from the plan's wording, rather than being absent from the PR.",
             ["E02", "E08", "E11", "E40"], "@symnav/backend-typescript / @symnav/core", "Implementation ownership moves without moving the service class.",
             [("Construction", "cacheScope is a field initialized with new TurnScopedCacheScope. The service still implements PositionDefinitionResolver and is not made a scope subclass.", ["E11"]),
              ("Plan comparison", "The plan says a shared concept lives in core as a base the backend extends. The PR's own diagram instead shows the service owning a scope. The supplied material does not reconcile this particular form.", ["E08", "E02"])]),
    decision("D05", "Expose reusable handles and whole-scope clearing",
             "Maps are private to the service; core has no generic turn-cache surface.",
             "Core exports a scope and a typed getOrCreate-only handle interface.",
             "The public handle offers getOrCreate; scope methods clear every registered handle synchronously. Handles remain usable before beginTurn, after repeated release, and during pending project release. There is no turn gate, per-key invalidation, or handle-unregister operation; the service creates its six handles once.",
             "unexplained", "The public surface is stated; no reason is given for this minimal, reusable lifecycle contract.", [],
             "Public surface explicitly listed in PR; lifecycle limits derived from the entire new implementation.",
             ["E07", "E12", "E29", "E36", "E40", "E11"], "Core public interface / private handle registry", "Callers obtain values; scope controls typed access to clearing.",
             [("Handle API", "TurnScopedCache<Key, Value> exposes getOrCreate. The unexported concrete handle also has clear; callers typed as the interface are not given that method.", ["E19", "E40"]),
              ("Scope API", "createCache registers a handle in an array. beginTurn and releaseTransientResources both call the same synchronous clear loop; the registry is retained.", ["E20"]),
              ("Reusable lifetime", "There is no active/released flag. Tests populate before beginTurn, release twice, then populate again. The pending-release test also performs a new query before release settles.", ["E12", "E29", "E36"]),
              ("Allocation boundary", "The TypeScript service constructs all six handles as fields. The generic scope exposes neither unregister nor single-key deletion.", ["E11", "E12"]) ]),
    decision("D06", "Pass a file list across the exported service API",
             "beginTurn receives a WorkspaceSnapshot and reads snapshot.files.",
             "beginTurn receives readonly WorkspaceFile[] directly.",
             "The already-exported semantic service now takes a file list instead of a whole snapshot. The backend supplies snapshot.files. Direct callers of that public method must change their argument shape; the PR records the signature change without explaining why.",
             "unexplained", "No reason for the narrower argument is stated in the PR, commits, or relevant plan passages.", [],
             "Explicit PR public-surface change; not an unrequested change relative to that body.",
             ["E07", "E10", "E11", "E14", "E41"], "Backend / exported semantic service", "Public method argument is narrowed.",
             [("Call boundary", "The backend changes beginTurn(request.snapshot) to beginTurn(request.snapshot.files); the service assigns files directly before clearing.", ["E13", "E14", "E10", "E11"]),
              ("Visibility", "TypeScriptSemanticQueryService remains exported from the package root. The change is therefore visible to direct service consumers, even though the main backend refresh request keeps its shape.", ["E41", "E07", "E14"]) ]),
    decision("D07", "Treat undefined as a cached value",
             "The specialized Maps use truthiness checks on their array/promise values.",
             "The generic handle tests Map.has before Map.get.",
             "A present key is a hit even when its value is undefined. Existing TypeScript caches hold arrays or promises; the generic core contract also supports undefined without rerunning the factory.",
             "stated", "The PR explicitly names undefined as a valid cached value.", ["E04"],
             "Explicit PR decision; new generic behavior characterized in core.",
             ["E04", "E19", "E28", "E44", "E11"], "Core handle", "Presence replaces truthiness in the generic cache contract.",
             [("Hit path", "getOrCreate checks values.has(key), then returns values.get(key) as Value. It does not ask whether the retrieved value is truthy.", ["E19"]),
              ("Test contract", "The undefined-producing factory is accessed twice at the same key and expected to run once, while another handle has its own independent value space.", ["E28"]) ]),
    decision("D08", "Return the exact factory value between clears",
             "Specialized Maps store exact array or promise objects.",
             "getOrCreate stores and returns the factory result unchanged.",
             "Between clears, a repeated key on one handle returns the same value or promise object. Clearing forgets entries without cancelling returned work. An old promise may settle later but cannot overwrite a new-turn entry. Promise identity applies at the cached service/handle boundary, not every async wrapper.",
             "stated", "The PR's compatibility intent explicitly preserves promise/value identities; it gives no separate optimization claim.", ["E01"],
             "Preservation explicitly requested; old-settlement consequence additionally specified by the new core test.",
             ["E01", "E19", "E20", "E31", "E32", "E44", "E14", "E25"], "Cache handle / returned value / caller", "Entry lifetime and returned-work lifetime are distinct.",
             [("Identity", "The factory result is inserted directly, and hits return it directly. The cache adds no promise wrapper or settlement handler.", ["E19"]),
              ("Later settlement", "The core test stores an old pending promise, begins a new turn, stores a new promise, then settles the old one. The old caller still gets old; a cache lookup still gets new.", ["E31"]),
              ("Boundary", "The new service test checks the direct promises from definitions, call target, callers, and callees. findReferences projects anew; backend query methods are async wrappers, so this is not a universal API promise-identity claim.", ["E32", "E25", "E14"]) ]),
    decision("D09", "Keep async failures cached; retry synchronous throws",
             "Rejected promises remain in the specialized Maps; a synchronous factory failure never reaches set.",
             "The generic handle preserves the same split by setting only after createValue returns.",
             "A factory that returns a promise stores it, including later rejection, until the next clear. A factory that throws synchronously stores nothing, so the next access retries. TypeScript definitions/callees take the async path; reference discovery can take the synchronous path.",
             "stated", "The stated reason is compatibility with existing failure behavior; no independent defense of the asymmetry is supplied.", ["E01"],
             "Explicit preservation request, with new core and TypeScript characterization tests.",
             ["E01", "E19", "E26", "E27", "E30", "E34", "E42", "E43"], "Factory / cache insertion boundary", "Failure timing determines whether an entry exists.",
             [("Returned rejection", "A Promise is a returned value before it settles. It is inserted once; rejection does not evict it.", ["E19", "E30", "E34"]),
              ("Thrown failure", "If createValue throws, values.set is never reached. In referenceLocations, findReferenceLocations executes before Promise.resolve can receive its result.", ["E19", "E26", "E27"]),
              ("Public observation", "findReferences is async, so its caller still observes a rejection; the internal factory nevertheless threw before caching. The added test observes two discovery attempts.", ["E25", "E34"]) ]),
    decision("D10", "Keep TypeScript projections and query work in place",
             "The service owns query keys, observers, locations, node reconstruction, and query bodies.",
             "The same work remains around getOrCreate factories and per-access projections.",
             "Query keys and bodies stay in TypeScript. Observers run on cache misses; callers and references share cached reference locations. Position caches keep locations (including empty results), while each access rebuilds a node array. Reference results are also projected per access; the refactor does not turn all outputs into shared objects.",
             "stated", "The PR explicitly preserves all six algorithms, key spaces, and value identities.", ["E01"],
             "Explicit compatibility intent; position and reference projections are retained implementation choices.",
             ["E01", "E21", "E22", "E23", "E24", "E25", "E26", "E33", "E37", "E38"], "TypeScript query service / compiler nodes", "Core stores generic values; language-specific reconstruction stays in the service.",
             [("Queries and observers", "Definition/reference search observers and position-resolution observers remain inside miss factories. findCallers reuses referenceLocations; findReferences uses that same cached location promise.", ["E21", "E22", "E23", "E26", "E25"]),
              ("Position entries", "The file:start key stores relative path, start, and syntax kind. A hit still looks up the project's source file and calls nodeAtSemanticLocation for each cached location.", ["E23", "E24"]),
              ("Per-access output", "The position test gets different outer arrays containing the same node; empty results avoid a second discovery. Reference projection remains outside its cached location factory.", ["E33", "E25"]) ]),
    decision("D11", "Add contract tests while retaining prior assertions",
             "The service has five tests; the generic core scope does not exist.",
             "Six service tests and four core tests are added; the five prior test bodies and helpers are unchanged.",
             "Ten new tests cover identities/isolation, empty-position projection, rejection versus throw, successful-turn preservation, immediate clearing plus awaited release, repeated release, and late promise settlement. The five existing tests remain; none is weakened or deleted. The pending/rejecting release case uses a controlled graph double. This artifact inspects tests; it does not report a test run.",
             "stated", "The PR names characterization and identity/error/clearing contracts, alongside its compatibility intent.", ["E47", "E01"],
             "Test additions explicitly described in PR; no removed or weakened assertions in this diff.",
             ["E47", "E28", "E29", "E30", "E31", "E32", "E33", "E34", "E35", "E36", "E37", "E38", "E39"], "Core tests / TypeScript integration contracts", "Generic cache guarantees gain their own tests; service contracts stay covered in their existing file.",
             [("Four core tests", "Exact values/undefined/isolation; clearing and repeated release; rejected promises versus throwing factories; late old-promise settlement after a turn change.", ["E28", "E29", "E30", "E31"]),
              ("Six service tests", "Four direct query identities; empty positions and fresh outer arrays; async failure retention; synchronous reference retry; failed refresh retention; immediate clearing with pending/rejecting graph release.", ["E32", "E33", "E34", "E35", "E36"]),
              ("Retained assertions", "The old block from the first existing test through the fixture helpers is byte-for-byte equal in the two snapshots. The only removed test-file line is the import expanded to include vi.", ["E37", "E38", "E39"]),
              ("Evidence boundary", "The added asynchronous graph is an injected test double. Concrete TypeScript project cleanup is synchronous; the existing generic graph returns a promise and can await projects sequentially. No runtime benchmark or whole-system output comparison was performed.", ["E36", "E17", "E18"]) ]),
    decision("D12", "Carry project completion and failure back to the backend",
             "The graph's promise is started and discarded by a void service method; the backend does not await it.",
             "The service becomes async and the backend awaits it, connecting the caller to graph settlement.",
             "Backend release now waits for the graph's completion and propagates its rejection, including failure that stops later project releases. This is an observable contract change alongside the ownership move. The PR declares the barrier, but the broad plan promises unchanged failure behavior; no separate rationale reconciles that change. The generic graph already returns a promise even though concrete TypeScript cleanup is synchronous.",
             "unexplained", "The awaited barrier is explicit, but no separate reason reconciles changed failure/completion visibility with the plan's preservation promise. The stated clearing-order reason belongs to D02.", [],
             "Explicit in PR shape and public surface; broader plan tension is surfaced without a correctness verdict.",
             ["E02", "E07", "E09", "E13", "E14", "E15", "E16", "E17", "E18", "E36"], "Backend → service → existing project graph", "Completion/failure crosses two previously detached call boundaries.",
             [("Before", "Service clears, calls the graph, and returns void. The async backend returns without adopting the graph promise.", ["E13", "E15", "E17"]),
              ("After", "Service awaits the graph and backend awaits service. A graph rejection now reaches the backend caller. The existing graph's sequential loop stops on rejection, so later release work is not run.", ["E14", "E16", "E17", "E36"]),
              ("Reason boundary", "PR shape and signatures explicitly describe the barrier. The reason for clearing before an await does not separately explain why a refactor changes what the backend caller observes. The broad plan asks for unchanged failure paths; this artifact leaves that choice for the reader.", ["E02", "E07", "E09"]) ]),
]


def assign(hunk, change):
    h, n, side = hunk["id"], change["line"], change["side"]
    if h == "H01":
        return ["D03", "D06"] if n == 83 else ["D12"]
    if h in ("H02", "H03"):
        return ["D11"]
    if h == "H04":
        if n < 61: return ["D11", "D08", "D01"]
        if n < 95: return ["D11", "D10"]
        if n < 135: return ["D11", "D09"]
        if n < 164: return ["D11", "D03"]
        return ["D11", "D02", "D12", "D05"]
    if h == "H05":
        return ["D01", "D04"] if "TurnScopedCacheScope" in change["text"] else ["D06"]
    if h == "H06":
        return ["D06"] if n == (30 if side == "head" else 29) else ["D01", "D04", "D10"]
    if h == "H07":
        if n < (68 if side == "head" else 54): return ["D01", "D03", "D06"]
        return ["D08", "D09", "D10"]
    if h == "H08":
        if n >= (129 if side == "head" else 125): return ["D02", "D12"]
        return ["D08", "D09", "D10"]
    if h in ("H09", "H10"): return ["D10"]
    if h == "H11": return ["D08", "D09", "D10"]
    if h == "H12": return ["D01"]
    if h == "H13":
        if n < 6: return ["D11"]
        if n < 27: return ["D11", "D01", "D07", "D08"]
        if n < 49: return ["D11", "D02", "D03", "D05"]
        if n < 75: return ["D11", "D08", "D09"]
        return ["D11", "D08"]
    if h == "H14":
        if n < 14: return ["D01", "D04", "D05"]
        if n < 20: return ["D07", "D08", "D09"]
        return ["D01", "D02", "D03", "D05"]
    if h == "H15": return ["D04", "D05"]
    raise ValueError(f"Unassigned region {h}:{n}")


def main():
    manifest = json.loads((OUT / "source-manifest.json").read_text())
    sources = {s["key"]: s for s in manifest["sources"]}
    evidence = []
    for id, key, start, end, label in COORDINATES:
        source = sources[key]
        lines = (OUT / source["copy"]).read_text().splitlines()
        assert 0 < start <= end <= len(lines), (id, start, end, len(lines))
        evidence.append(dict(id=id, source=key, path=source["copy"], revision=source["revision"],
                             start=start, end=end, title=label, text="\n".join(lines[start-1:end])))
    hunks = json.loads((OUT / "hunks.json").read_text())
    coverage = []
    for hunk in hunks:
        for change in hunk["changed_lines"]:
            coverage.append(dict(hunk=hunk["id"], path=hunk["path"], **change, decisions=assign(hunk, change)))
    claims = []
    for d in DECISIONS:
        d["regions"] = sorted({r["hunk"] for r in coverage if d["id"] in r["decisions"]})
        for title, detail, refs in d["mechanism"]:
            claims.append(dict(id=f"C{len(claims)+1:02}", decision=d["id"], parent=d["parent"],
                               announcement=d["consequence"], title=title, detail=detail, evidence=refs))
        d["claims"] = [c["id"] for c in claims if c["decision"] == d["id"]]
        del d["mechanism"]
    first_existing = '  it("shares one reference search across caller and reference projections"'
    old_test = (OUT / "evidence/base" / TEST).read_text()
    new_test = (OUT / "evidence/head" / TEST).read_text()
    retained = old_test[old_test.index(first_existing):] == new_test[new_test.index(first_existing):]
    assert retained
    test_inventory = []
    for file in (CORETEST, TEST):
        text = (OUT / "evidence/head" / file).read_text()
        for match in re.finditer(r'  it\("([^"]+)"', text):
            line = text[:match.start()].count("\n") + 1
            added = file == CORETEST or line < 219
            decision_ids = sorted({d for r in coverage if r["path"] == file and r["side"] == "head" and r["line"] == line for d in r["decisions"]})
            test_inventory.append(dict(name=match[1], path=file, line=line, change="added" if added else "retained unchanged", decisions=decision_ids, execution="not run; source inspected"))
    ledger = dict(subject="pr-127", extraction="Manually authored semantic decisions; mechanical coordinate/coverage extraction.",
                  rationale_search="Supplied PR body and all six commit messages; full diff; relevant daemon-architecture plan; keyword search across supplied repo-rules and worktree plans. No implementation transcript located in this bounded corpus.",
                  decisions=DECISIONS, claims=claims, evidence=evidence, tests=test_inventory,
                  test_delta=dict(added=10, retained=5, removed=0, weakened=0, retained_suffix_byte_equal=retained))
    for name, data in [("ledger.json", ledger), ("coverage.json", coverage), ("pyramid-map.json", claims)]:
        (OUT / name).write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps(dict(decisions=len(DECISIONS), claims=len(claims), evidence=len(evidence),
                          changed_lines=len(coverage), added_lines=sum(r["side"] == "head" for r in coverage),
                          removed_lines=sum(r["side"] == "base" for r in coverage), test_delta=ledger["test_delta"]), indent=2))


if __name__ == "__main__":
    main()
