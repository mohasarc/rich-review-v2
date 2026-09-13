from pathlib import Path
import hashlib
import html
import json
import re


OUT = Path(__file__).resolve().parent.parent
ROOT = OUT.parent.parent
EVIDENCE = OUT / "evidence"


def excerpt(file, start, end):
    return {"file": file, "start": start, "end": end}


def around(file, needle, before=3, after=12):
    lines = (EVIDENCE / file).read_text().splitlines()
    i = next(i for i, line in enumerate(lines) if needle in line)
    return excerpt(file, max(1, i + 1 - before), min(len(lines), i + 1 + after))


def patch(pr, path, limit=100):
    index = json.loads((EVIDENCE / f"pr-{pr}-inventory.json").read_text())
    item = next(x for x in index if x["header"].endswith(" b/" + path))
    a = item["start_line"]
    return excerpt(f"pr-{pr}.patch", a, a + min(limit, item["lines"]) - 1)


facts = []


def fact(id, title, explanation, sources):
    facts.append(dict(id=id, title=title, explanation=explanation, sources=sources))


fact("C1", "The cache move includes an API and lifetime contract",
     "Six independent handles replace service-owned Maps. The service still owns its scope instance and algorithms. beginTurn takes the retained file array; successful refresh triggers clearing. The generic handle caches exact values, including undefined and rejected promises, retries synchronous throws, and remains usable after either clear operation. These are the finite cache witnesses used in the table, alongside C2 and C3.",
     [patch(127, "packages/core/src/backend/turn-scoped-cache-scope.ts"), patch(127, "packages/backend-typescript/src/typescript-backend/typescript-backend.ts")])
fact("C2", "Release completion changes; the PR discloses it",
     "The backend adds await, and the semantic service becomes async and awaits project release after synchronous cache clearing. Pending cleanup now keeps backend release pending; rejection propagates. The PR body explicitly calls the backend an awaited release boundary and changes the public return type. Its separate rationale for reconciling that change with broad failure-preservation wording is a narrower open question than saying the body is silent.",
     [patch(127, "packages/backend-typescript/src/typescript-backend/typescript-backend.ts"), excerpt("pr-127-body.md", 20, 36), excerpt("pr-127-body.md", 65, 88)])
fact("C3", "Ten tests are added; five old cases are byte-identical",
     "The service gains six cases and core gains four. The suffix beginning at the first existing semantic test, including all five old cases and helpers, is byte-identical between the immediate base and head. Experiment 01’s statement that an existing test release call gains await is inaccurate: the added awaits are in production code and new test code. The comparison record contains the exact marker and SHA-256; this is a text comparison, not a test-suite run.",
     [excerpt("C-test-comparison.json", 1, 8), patch(127, "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts", 28)])
fact("P1", "Malformed policy can fail before a worker is created",
     "#131 adds synchronous DaemonPolicy.fromSerialized in the parent constructor before new Worker. The parser can throw. A malformed snapshot therefore fails before thread creation; retrieving a chunk cap also moves the failure boundary. This is a source-level inference from actual ordering, not a run of an invalid production configuration. The old constructor reaches Worker without this parent parse.",
     [excerpt("P-worker-base.txt", 73, 99), excerpt("P-worker-head.txt", 76, 106), excerpt("P-policy-head.txt", 158, 193)])
fact("P2", "Recovery keeps separate counters and changes which error escapes",
     "After initial accepted-close error E0, failure obtaining a reattached receipt still returns E0. If reattachment is accepted and its completion rejects with E1, the head loop catches and returns E1 at the exhausted default limit; the base nested catch returned E0. Inside executeOnce, failed fetch goes to fail rather than recursively consuming a larger fetch allowance. A numeric limit alone does not establish a repeated-fetch loop.",
     [around("P-transport-base.txt", "private async completeWithOneReattachment", 0, 28), around("P-transport-head.txt", "private async completeWithReattachments", 0, 34), around("P-transport-head.txt", "const resume =", 0, 30)])
fact("P3", "The same empty-directory assertion can lose its disk stimulus",
     "The test transport helper clamps inline=0 to the default chunk size (64 KiB) and creates the directory. The acknowledgement-failure fixture still supplies one 64 KiB record. Stored output spills only when raw bytes are greater than the inline threshold, so that record can remain in memory while the empty-directory assertion still succeeds. This identifies a changed witness; it does not say all cleanup or spill coverage disappears. The workspace helper also accepts memoryCapBytes without feeding it into the constructed policy, and maps zero inline to half an explicit result cap.",
     [patch(131, "apps/cli/test/helpers/local-daemon-transport.ts"), excerpt("P-cleanup-head.txt", 603, 669), around("P-output-head.txt", "private async storeRecord", 0, 13), patch(131, "apps/cli/test/helpers/workspace-daemon.ts", 53)])
fact("P4", "The removed resource oracle is not an identical test move",
     "Five expanded memory rows, one constrained-memory case and a literal 250 ms assertion are deleted with the old resource factory. Existing central policy tests overlap, but their smallest input is one byte rather than the deleted 256 MiB row. The timed supervisor test remains. Distinguish prior overlapping coverage from a newly relocated identical case set.",
     [patch(131, "apps/cli/src/daemon/daemon-resource-monitor.test.ts", 100), excerpt("P-policy-test-base.txt", 86, 106)])
fact("P5", "Three added consumer tests cast constructor options through unknown",
     "The new spool-capacity, logger-queue and resource-cadence tests force option objects through unknown into ConstructorParameters. This is a test-construction choice beyond the public callable signatures. The assertions still exercise their injected values; no claim that the casts invalidate those runtime observations follows.",
     [patch(131, "apps/cli/src/daemon/completion-spool.test.ts", 49), around("pr-131.patch", "} as unknown as ConstructorParameters<typeof DaemonLogger>", 16, 8), around("pr-131.patch", "} as unknown as ConstructorParameters<typeof DaemonResourceSupervisor>", 18, 8)])
fact("P6", "Required policy does not eliminate every numeric seam",
     "Registry startupOwnerIsWithinGrace retains an optional grace argument. Transport writeChunkSize remains optional. Low-level codecs/readers accept numeric projections, and StoredCommandOutput retains an optional cap for its file-backed branch. The meta-test checks listed source spellings, not arbitrary provenance or every possible bypass.",
     [patch(131, "apps/cli/src/daemon/daemon-registry.ts", 55), patch(131, "apps/cli/src/daemon/local-daemon-transport.ts", 50), excerpt("P-output-head.txt", 72, 91), patch(131, "meta-tests/src/daemon-package.test.ts", 51)])
fact("H1", "A client starts and retains one runtime promise",
     "Construction starts the dynamic import and stores one readonly promise. Execute and control await that same promise, whose resolved runtime constructs shared registry, transports, startup coordinator and controllers. Rejection also remains in that promise; these methods do not initiate a new load. This is a per-client lifetime, distinct from the fresh executor created for each local attempt.",
     [excerpt("H-client.txt", 20, 64), excerpt("H-runtime.txt", 68, 137)])
fact("H2", "Host policy is optional and can be derived locally",
     "DaemonClientOptions permits policy to be omitted. DaemonClientRuntime then selects DaemonPolicy.currentSystem. This is a host-contract/default-authority choice, separate from the required slices passed to internal consumers. In page 23, optional policy first appears inside the public-client room rather than the complete outline.",
     [patch(148, "packages/daemon/src/client/daemon-client-contracts.ts", 27), excerpt("H-runtime.txt", 79, 98)])
fact("H3", "The new clock guard scans lifecycle siblings only",
     "The moved clock test reads readdirSync(new URL('.', import.meta.url)) without recursion. At its new lifecycle path that covers sibling production files, excluding daemon-clock.ts. Its broad name does not establish scanning of process, registry, execution, resources or worker directories.",
     [excerpt("H-clock-test.txt", 34, 49)])
fact("H4", "Package test files run serially",
     "#148 adds a package Vitest configuration with fileParallelism: false. This changes test scheduling independently of the architecture move or test-file imports. The package also adds tsx support; neither fact is a report that this critique ran the suites.",
     [excerpt("H-test-config.txt", 1, 7), patch(148, "packages/daemon/package.json", 70)])
fact("H5", "The staged warm request selects the package protocol constant",
     "The still-active dispatcher reads protocolVersion from the registry record; the new client uses DAEMON_PROTOCOL_VERSION. This is a change in the value’s source. It is not evidence of a different normal wire generation: the current-record predicate also checks the package protocol value. This lead was cross-checked after reading critique 39.",
     [excerpt("H-dispatcher-base.txt", 207, 225), excerpt("H-runtime.txt", 182, 198), excerpt("H-registry-head.txt", 785, 799)])
fact("H6", "The policy plan explicitly schedules test-export retirement",
     "At #148 head, Migration access says Phase 26 removes @symnav/daemon/policy-testing after app-owned mechanism tests move package-local. A blanket ‘no removal rationale in supplied plans’ misses this recorded condition. It does not explain each removed lint/assertion detail or the clock scan’s scope. The plan is pinned to #148, because the final stack later rewrites this section. This lead was cross-checked after critique 39.",
     [around("H-policy-plan.txt", "## Migration access", 0, 7)])
fact("H7", "Central registry ownership also tightens comparisons",
     "The old isStartupOwner checked instanceId. The new canonical path requires identityKey and instanceId, and full-owner expectations can also compare credentials, owner kind/PID, timestamps and revision. Calling this only centralization omits a changed acceptance condition in the still-active CLI preparation.",
     [around("H-registry-base.txt", "isStartupOwner(", 0, 4), around("H-registry-head.txt", "isStartupOwner(", 0, 10), around("H-registry-head.txt", "private startupOwnershipMatches", 0, 24)])
fact("S1", "Last configured owner wins, both before and after",
     "Both implementations iterate configurations in order and overwrite the primary-file Map entry. The new graph separately appends every owner to the all-projects array, but that does not make the first owner primary. The graph is unchanged from #126 through #149. Page 14’s last-owner wording matches; pages 01 and 22’s first-owner wording needs correction.",
     [excerpt("S-graph-base.txt", 187, 216), excerpt("S-graph-head.txt", 319, 339)])
fact("S2", "The concurrent cold-start integration is deleted in #149",
     "The 24-call reference-workspace test is still present at the supplied #148 head. The immediate #149 diff deletes its file. Page 01 correctly identifies a lost combined witness but attributes its deletion to #148. This is a chronology correction, not an extra deletion to count.",
     [excerpt("S-concurrent-148.txt", 33, 104), excerpt("S-concurrent-149.patch", 1, 12)])
fact("S3", "Parsed diagnostic events replace raw-file assertions",
     "At the stack tip the CLI test reads inspector events. The old backup-name/count, per-file-size and raw-text secret checks disappear from this test; checking JSON.stringify(parsed events) has a narrower observation boundary. Logger unit coverage is a different witness. Pages 14 and 22 already state this; 01, 07 and the narrated full page did not teach it in the sealed reading.",
     [excerpt("S-diagnostics-main.txt", 51, 91), excerpt("S-diagnostics-tip.txt", 49, 65)])
fact("S4", "The concrete CLI executor builds a separate default policy",
     "The executor factory calls createDefaultDependencies with DaemonPolicy.currentSystem. The daemon process/worker snapshot is not an argument in that host factory contract. A diagram of one injected snapshot needs this host exception. Page 21 explicitly states it. This lead was cross-checked after critique 39.",
     [excerpt("S-executor.txt", 130, 146)])
fact("S5", "Relative daemon --cwd is resolved at the host",
     "The final CLI daemon command resolves a relative --cwd against ProgramContext.cwd before forwarding the workspace root. This is a caller-facing host-normalization decision, independent of moving daemon mechanisms. It was explicit in page 14; it was missing from the read paths of 07, 21 and 22.",
     [excerpt("S-cwd.patch", 1, 75)])
fact("A1", "The adjacent pair preserves a captured delivery barrier",
     "The execution session awaits the delivery promise returned at that point after ledger publication. The delivery owner returns the current map value and replaces that map entry for each tracked stream. Fetch is a separate method. The page already teaches that this does not await every attachment or follow later fetches. It also exposes immutable acceptance, retained trace fencing, cleanup before logical acknowledgement and the finally-scheduled resource sample.",
     [around("pr-146.patch", "+  trackedCompletion(requestId", 0, 5), around("pr-146.patch", "+  private trackCompletionDelivery(", 0, 18), around("pr-147.patch", "+            await this.options.delivery.trackedCompletion", 7, 12)])


def receipt(capture, needle, radius=260):
    text = (OUT / "captures" / (capture + ".txt")).read_text()
    i = text.index(needle)
    return {"capture": capture, "text": text[max(0, i - 70):i + len(needle) + radius]}


descents = {
    "D1": dict(title="04 · disclosure changes between 4.0 and 4.9", parent=receipt("04-top", "One failure path changed; PR body silent", 180), child=receipt("04-top", "None found. The PR body shows it", 260), interpretation="The complete overview says the PR is silent; the deeper decision record acknowledges the diagram and public signature. Replace silence with the narrower unresolved rationale/parity question. The destination is 4.9 in this capture; critique 39 called it 4.8."),
    "D2": dict(title="27 · a changed threshold can remove the disk witness", parent=receipt("27-top", "Forced spill at 0 becomes a threshold crossing", 100), child=receipt("27-adapters", "A transport helper clamps requested inline capacity", 200), interpretation="The deeper qualification changes what the cleanup fixture witnesses. The top needs to say some previously forced-spill cases now remain inline, alongside fixtures that gain an extra byte and still spill."),
    "D3": dict(title="23 · optional host policy first appears inside the room", parent=receipt("23-top", "Node-free host types; executor/environment inputs; runtime loads at construction.", 160), child=receipt("23-client", "Options carry state directory", 250), interpretation="Editorial judgment: a host may omit policy, so this is more than an expanded list of parameter names. The complete outline should name optional policy and its local-default authority. The source establishes currentSystem; the authored child establishes optionality. Generic executor/environment inputs in the parent do not make that choice explicit."),
}


scope = json.loads((OUT / "scope.json").read_text())
folders = {e["folder"].split("-", 1)[0]: e["folder"] for e in scope["subject_experiments"]}
notes = (OUT / "blind-notes.md").read_text()
sections = {m.group(1): m.group(2).strip() for m in re.finditer(r"^## ([^\n]+)\n(.*?)(?=^## |\Z)", notes, re.M | re.S)}


def note(key):
    key = next(k for k in sections if k == key or k.startswith(key + " ("))
    text = sections[key]
    read = text.split("Learned:", 1)[0].removeprefix("Read:").strip()
    learned = text.split("Learned:", 1)[1].split("Open questions", 1)[0].strip() if "Learned:" in text else text
    return read, learned


rows = []


def row(id, subject, key, capture, misses, depth="No surprise observed in the sampled reading. This is not a completeness certificate.", flag=None, correction=False, limited=False, file="index.html", extra_capture=None, read=None):
    n = id[:2]
    r, learned = note(key)
    rows.append(dict(id=id, folder=folders.get(n, "39-fresh-reader-check"), subject=subject, read=read or r, learned=learned, capture=capture, misses=[dict(text=t, evidence=e) for t, e in misses], depth=depth, flag=flag, correction=correction, limited=limited, file=file, extra_capture=extra_capture))


cache_none = [("No additional changed design decision emerged from the six-file comparison. Ownership, failure, API, retained handles/files and added-test witnesses were already taught. This bounded result does not certify every assertion on the page.", ["C1", "C2", "C3"])]
parent_miss = ("The parent’s policy reparse can now throw synchronously before Worker construction. The reading taught chunk-cap wiring without this earlier failure boundary.", ["P1"])
casts_miss = ("The three added consumer tests force option shapes through unknown; the callable/consumer account did not teach that test-construction choice.", ["P5"])
protocol_miss = ("Warm requests select the package protocol constant where the active dispatcher selected the record value. This is a value-source choice, not a claimed change to the normal wire generation.", ["H5"])
retirement_miss = ("Qualify the unexplained export-retirement label: the pinned policy plan explicitly schedules removal after test relocation. Specific deleted assertions can still lack a separate reason.", ["H6"])

row("01-stack", "stack", "01-stack", "01-top", [
    ("Correction: primary lookup chooses the last configured owner, not the first. The concurrent cold-start test disappears in #149, not #148.", ["S1", "S2"]),
    ("The reading missed the raw-file diagnostic assertion losses and the CLI executor’s separately derived default policy.", ["S3", "S4"]),
], "Selected timelines and cache descent elaborated named choices. The wrong owner and deletion-layer statements are source corrections; no deeper authored repair was observed.", correction=True)
row("01-127", "#127", "01-127", "01-127", [("Correction: no existing test call gains await. All five old semantic cases and their helpers are byte-identical; ten cases are added. The production release calls gain await.", ["C3"]), ("No other changed cache decision emerged in the finite comparison.", ["C1", "C2"])], correction=True, file="index.html#pr127")
row("02", "#131", "02", "02-top", [parent_miss, casts_miss])
row("03", "#148", "03", "03-top", [protocol_miss, retirement_miss], "The constructor-promise descent repeats loading, reuse and retained failure already announced in the 24-card top.", correction=True, extra_capture="03-load")
row("04", "#127", "04", "04-top", [("Correction: the PR body explicitly discloses the awaited release barrier and Promise-returning signature. Its separate rationale under broad parity wording is the narrower unexplained part.", ["C2"])], "FLAG — 4.0 says ‘PR body silent’; 4.9 says ‘The PR body shows it.’ The disclosure account changes below the complete overview.", flag="D1", correction=True)
row("05", "#131", "05", "05-top", [parent_miss, casts_miss], "The fetch explanation adds control-flow fidelity to the already announced terminal-fetch and nested-counter choices.", extra_capture="05-fetch")
row("06", "#148", "06", "06-top", [("The new clock guard only scans lifecycle siblings. Its scope is a separate test decision from daemon clock ownership.", ["H3"]), ("Recall correction: K3 already states fileParallelism: false. Its absence from my sealed summary is a reader miss, not a page omission.", ["H4"])], read="Two hubs, recordings and all K1–K18 top groups, including the continuation recorded before the seal.")
row("07", "stack", "07", "07-top", [("The #127 summary gives clear-before-await order but does not teach base early settlement versus newly propagated cleanup rejection, or the files-only/reusable-handle API.", ["C1", "C2"]), ("The #131 milestone misses later-error selection, lost disk stimulus and pre-spawn policy failure. The final host account also misses relative --cwd and raw diagnostic-file assertion losses.", ["P1", "P2", "P3", "S3", "S5"])], "The selected #127/#149 frames mostly expand named PR choices; source-only misses are not labelled as witnessed authored descents.", extra_capture="07-127")
row("08-131", "#131", "08-131", "08-top", [parent_miss, casts_miss, ("The exact resource case set differs: the deleted 256 MiB input has no identical central-policy row. Failed fetch also terminates rather than consuming a larger allowance in an inner loop.", ["P2", "P4"])])
row("08-148", "#148", "08-148", "08-top", [protocol_miss, ("The clock guard’s lifecycle-only scope and serial package test-file scheduling did not enter the nine-record reading.", ["H3", "H4"])])
row("09-127", "#127", "09-127", "09-top", cache_none)
row("09-131", "#131", "09-131", "09-top", [parent_miss, casts_miss, ("The fixture warning did not leave me with the exact consequence: the 64 KiB cleanup record can remain inline, while the helper pre-creates the empty directory.", ["P3"])])
row("10", "#127", "10", "10-top", cache_none, "The release illustration explains the already announced wait/failure boundary. Returning from the command was not presented as a cache-reset trigger.")
row("11", "#131", "11", "11-top", [parent_miss, casts_miss])
row("12", "#148", "12", "12-top", [protocol_miss, ("Constructor-time loading was visible, but the per-client retained promise/runtime and retained rejection were absent from my account.", ["H1"]), retirement_miss], correction=True)
row("13", "#131", "13", "13-top", [parent_miss, casts_miss], "All explanation panels were opened. Exact E0/E1 cases, fixture coercions and numeric values refine their corresponding register rows.", extra_capture="13-expanded")
row("14", "stack", "14", "14-top", [("The source resolves the page disagreement in this page’s favor: last configured owner is correct. This is a correction to my prior uncertainty.", ["S1"]), ("The complete stack sheet did not teach the enlarged #127 caller-completion boundary, #131 later-error/lost-disk-stimulus consequences, or the executor’s separate default policy.", ["C2", "P2", "P3", "S4"])], "No authored parent/child surprise established. Its long extra-choice sheet already names relative --cwd and raw diagnostic-test losses.")
row("15", "#131", "15", "15-top", [parent_miss, casts_miss, ("The ignored workspace memoryCapBytes input and residual optional numeric seams are more specific than the simulation’s required-policy shorthand.", ["P3", "P6"])], "The accepted/fetch scene gives mechanism detail for predeclared recovery choices and remains labelled virtual time.", extra_capture="15-fetch")
row("16", "#131", "16", "16-top", [parent_miss, ("Separate budget names do not teach terminal failed-fetch behavior. Fixture-change language also did not teach the unchanged empty-directory assertion losing its disk stimulus; optional scalar seams remain.", ["P2", "P3", "P6"])], "Dragging a hypothetical module exposes import consequences already warned about; that is not a claim that #131 actually moves the module.")
row("17", "#127", "17", "17-top", cache_none)
row("18", "#148", "18", "18-top", [protocol_miss, ("The outline misses the tightened identity/full-owner comparisons, per-client runtime lifetime and lifecycle-only clock guard.", ["H1", "H3", "H7"])])
row("19", "#131 · declaration lens", "19", "19-top", [("The explicitly excluded bodies contain changed error identity, earlier worker failure, lost spill stimulus and deleted oracle cases. The declaration atlas cannot recover these choices.", ["P1", "P2", "P3", "P4"])], "Declared coverage limit under rule 8. No concealed descent established: runtime loops and assertion bodies are expressly outside this lens.", limited=True)
row("20-127", "#127", "20-127", "20-top", [("The callable-contract top omits the test decision: ten cases added, five old semantic cases unchanged. The files-only argument is shown without a separate rationale status.", ["C1", "C3"])], "Deeper callable rows refine promise/projection identity. A public async wrapper is not a new cache policy.")
row("20-131", "#131", "20-131", "20-131", [casts_miss], "The top already teaches validation before Worker creation. The large callable matrix supplies detail without repairing an omitted parent failure boundary.", file="index.html#pr131")
row("21-page", "stack", "21-page", "21-top", [("The full map does not teach the enlarged #127 completion/rejection boundary, relative daemon --cwd resolution, or lost raw diagnostic-file assertions. Its executor-default-policy exception is already explicit.", ["C2", "S3", "S5"])], "No film-to-map flag: the film is explicitly compressed and the complete map is the top reading layer.")
row("21-video", "stack · orientation film", "21-video", "21-video", [("As a sole review it omits cache/API/failure details, individual thresholds and test witnesses. These are disclosed limits of the 90-second orientation; the player links the complete page.", ["C1", "C2", "C3", "P3", "S3"])], "Explicit supplement. No hidden depth claimed. The transcript was read; audio delivery and audiovisual synchronization were not tested.", limited=True, file="video.html", extra_capture="21-narration")
row("22", "stack", "22", "22-top", [("Correction: the primary project is the last configured owner. The reading did not teach relative daemon --cwd, the executor’s separate default policy or the enlarged #127 completion boundary.", ["S1", "S5", "S4", "C2"])], "The played worker path refuses B until replacement recovery settles. This was already in the open contract; no newly unlocked rule was observed.", correction=True, file="game.html", extra_capture="22-worker-play", read="Opening, five open contracts, all extra choices, completed 117-choice ledger and policy table before the workbench; then Finish A → settle delivery → sample → Run B.")
row("23", "#148", "23", "23-top", [protocol_miss, ("The whole outline misses the lifecycle-only clock guard and optional host policy/default authority. The export-retirement label also needs the plan’s recorded condition.", ["H2", "H3", "H6"])], "FLAG (editorial judgment) — optional policy first appears inside Public client / D04. It changes who must supply policy, beyond the complete outline’s generic environment/executor inputs.", flag="D3", correction=True, extra_capture="23-client", read="Complete 25-choice outline across all six rooms, then the public-client room / D04; returned to Whole change.")
row("24", "#127", "24", "24-top", cache_none, "The release answer deepens the announced completion/error boundary. Sequential project cleanup is supporting mechanism context.", extra_capture="24-release", read="All seven question answers in the complete overview, then When does release finish? and return to the question map.")
row("25", "#131", "25", "25-top", [parent_miss, ("The fixture drawer still does not make the lost client disk stimulus explicit. The ignored memory cap and retained numeric seams also remain outside the brief’s account.", ["P3", "P6"])], "No separate authored surprise established in the fixture drawer: exact threshold translations expand a previewed change, while the no-spill consequence remains a source miss.", extra_capture="25-fixtures")
row("26", "#127", "26", "26-top", cache_none, "The drawers are labelled lossy; the full cache/lifecycle contract appears before the mechanism. No new changed decision emerged on descent.")
row("27-131", "#131", "27-131", "27-top", [parent_miss, ("The top misses later-completion error selection. The adapter’s clamp and mkdir can remove the client’s former disk witness, not merely shift a threshold crossing.", ["P2", "P3"])], "FLAG — row 05 says forced spill becomes a threshold crossing; its expansion adds that unchanged calls may no longer enter the same storage state.", flag="D2", extra_capture="27-adapters")
row("27-148", "#148", "27-148", "27-top", [protocol_miss, ("Serial package test-file scheduling is absent from the fifteen #148 rows, despite being a changed test condition.", ["H4"])])
row("28", "#131", "28", "28-top", [parent_miss, ("Symbol-reference counts do not establish removal of optional scalar seams or the optional stored-output cap.", ["P6"])], "The radius tool discloses its direct-reference proxy and missed field references. Those limits are visible before the graph is used.")
row("29", "#148", "29", "29-top", [protocol_miss, ("The proposed cuts do not fully teach the tightened ownership comparison, retained runtime promise or optional public policy’s default authority.", ["H7", "H1", "H2"]), retirement_miss], "The proposed split order is labelled hypothetical. No verified cherry-pick or hidden runtime move was inferred from it.", correction=True)
row("30", "#146 + #147", "30", "30-top", [("No additional coordination decision emerged in the two-session, contract, shell-deletion and changed-assertion sample. Latest-versus-all delivery, immutable acceptance, fenced traces and acknowledgement after cleanup failure were already taught.", ["A1"])], "The delivery model refines the promise captured at the wait. It does not silently turn that into waiting for every later attachment.")
row("31", "#127", "31", "31-top", cache_none)
row("32-demo", "#127", "32-demo", "32-top", cache_none)
row("32-starter", "#127 · one-decision component", "32-starter", "32-starter", [("The starter covers ownership only. Cache identity, failure, release/API and test decisions belong to the linked full demo; it cannot replace it.", ["C1", "C2", "C3"])], "Explicit one-decision scope. No surprise within its ownership → mechanism → reason descent.", limited=True, file="starter.html")
row("33-A", "#127 · analogy opening", "33-A", "33-top", cache_none)
row("33-B", "#127 · failure opening", "33-B", "33-b", cache_none, "Shared complete body with A. Reading B second is not an independent test of which opening works better.", file="failure.html")
row("34", "#131", "34", "34-top", [parent_miss, casts_miss], "The explanation strips supply choices, but omitting raw code during the blind phase limits evaluation of this evidence-first opening. No authored descent surprise established.")
row("35", "#148", "35", "35-top", [protocol_miss, ("The new clock guard’s lifecycle-only scope is absent from both the notebook faces and the opened clock record.", ["H3"]), retirement_miss], "Opened clock, facade and export records add fidelity. Their missing scan does not become a demonstrated child surprise. The export rationale correction comes from the supplied plan.", correction=True, extra_capture="35-clock-fixed")
row("36", "#127", "36", "36-top", cache_none, "The return-identity lens repeats the top’s stored-location versus fresh outward-projection distinction. The controlled fixture is explicitly bounded.", extra_capture="36-returns")
row("37", "#127", "37", "37-top", cache_none, "The deeper owner shape repeats its surface thread. The page’s byte-for-byte preservation claim for the old semantic cases is supported by C3.", extra_capture="37-next")
row("40", "#127", "40", "40-top", cache_none, "The pending-release opening already names the changed outcome. The subsequent identity/request views retain API, test and rationale distinctions; no new changed decision emerged in this sample.")

rows.append(dict(id="39-meta", folder="39-fresh-reader-check", subject="earlier critique · read after seal", read="Complete 42-row critique read after this refresh’s blind seal and principal source checks. It is a meta row, not a fresh subject-page trial.", learned="39 defines its earlier cutoff, records one serial reader, separates recall misses from page omissions, and requires an identifiable parent → child for rule 4. It identifies the same worker-validation, last-owner and two disclosure/test-stimulus issues, plus protocol-source, policy-retirement and executor-default leads. Its table includes all findings before evidence exits.", capture="39-meta", misses=[dict(text="Its two substantive descent findings reproduce. The textbook destination is 4.9 in the captured page, not the 4.8 named in 39. This refresh also catches 01’s existing-test-await statement and adds pages completed after 39’s cutoff; those later pages were correctly outside 39’s scope.", evidence=["C3"])], depth="No new rule-4 flag against the critique itself. Its narrower historical cohort and finite-witness method are declared. This row does not pretend its source-informed reading was blind.", flag=None, correction=True, limited=True, file="index.html", extra_capture=None))


def esc(s):
    return html.escape(str(s), quote=True)


def evidence_links(ids):
    return ' '.join(f'<a class="evidence-ref" href="evidence.html#{esc(i)}">{esc(i)}</a>' for i in ids)


def render_row(r):
    miss = ''.join(f'<li>{esc(m["text"])} {evidence_links(m["evidence"])}</li>' for m in r["misses"])
    badge = '<span class="flag">Rule 4</span>' if r["flag"] else ('<span class="muted-label">Declared limit</span>' if r["limited"] else '<span class="muted-label">No observed descent</span>')
    child = f'<a href="evidence.html#{r["flag"]}">Parent → child receipts</a>' if r["flag"] else ''
    extra = f'<a href="captures/{esc(r["extra_capture"])}.txt">Depth / supplement capture</a>' if r["extra_capture"] else ''
    return f'''<tr id="row-{esc(r['id'])}" data-subject="{esc(r['subject'])}" data-flag="{bool(r['flag'])}" data-correction="{r['correction']}" data-limited="{r['limited']}">
<th scope="row"><a class="row-id" href="../{esc(r['folder'])}/{esc(r['file'])}">{esc(r['id'])}</a><p>{esc(r['folder'])}</p><p class="subject">{esc(r['subject'])}</p><p>{esc(r['read'])}</p><div class="links"><a href="captures/{esc(r['capture'])}.txt">Captured reading</a>{extra}<a href="#top">↑ Table opening</a></div></th>
<td data-label="Learned before diff">{esc(r['learned'])}</td>
<td data-label="Diff misses / corrections"><ul>{miss}</ul></td>
<td data-label="Rule 4">{badge}<p>{esc(r['depth'])}</p>{child}</td></tr>'''


def layout(title, body, script=''):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(title)}</title><link rel="stylesheet" href="style.css"></head><body>{body}{script}</body></html>'''


body = '''<a class="skip" href="#comparison">Skip to the comparison</a><header id="top"><p class="eyebrow">46 · fresh-reader-refresh-30 · critique</p><h1>What the pages taught.<br>What the diff added.</h1>
<p class="lead">One comparison table for 38 finished subject experiments: 46 page/subject/supplement readings, plus one separately timed meta reading of critique 39.</p>
<div class="sequence" role="img" aria-label="Read pages without diffs, seal notes, compare pinned diffs, record misses and descent surprises"><span>Pages → decisions learned</span><b>→</b><span>Seal the notes</span><b>→</b><span>Pinned diffs → misses</span></div>
<p class="small">Simplified sequence. Cutoff: 13 September 2026, 04:00:41 UTC / 07:00:41 Istanbul. Blind notes sealed at 04:17:54 UTC. The complete declared top counts, even below the first screen. One serial reader can learn vocabulary from earlier pages; these are not independent naive-human trials.</p>
<p><strong>Three observed rule-4 descents:</strong> <a href="#row-04">04 changes its PR-disclosure account</a>; <a href="#row-27-131">27 qualifies whether a fixture still reaches disk</a>; <a href="#row-23">23 first introduces optional host policy inside the room</a> (the third is an explicit editorial judgment). Source-only omissions and factual corrections stay in their own column.</p>
<p>The source also corrects two plausible page claims: the <strong>last configured project</strong> is primary, and #127’s <strong>five old semantic cases are byte-identical</strong>. The table preserves what I learned before those corrections. A miss in recall does not automatically mean a sentence is absent from the page; such cases are identified. “No surprise observed” describes only the sampled descent; it is not a score or a correctness verdict.</p>
<p class="small">Finished = README + documented explanatory entry at the cutoff. Separate subject views, both paired openings, film and starter get rows. Method guides, source viewers, redirects and templates are support files. Markdown critiques 38/41 and unfinished 42–46 are excluded. Critique 39 was read after the blind seal; its follow-up leads are credited in the evidence. No symnav suite or production process was run.</p>
<nav class="documents"><a href="README.md">README</a><a href="blind-notes.md">Sealed notes</a><a href="blind-seal.json">Phase seal</a><a href="post-diff-notes.md">Source-reading limits</a><a href="scope.json">Cohort</a><a href="scope-recheck.json">Entry-file recheck</a><a href="comparisons.json">Structured table</a></nav></header>
<main><div class="toolbar"><label>Show <select id="filter"><option value="all">All readings</option><option value="flag">Rule-4 descents</option><option value="correction">Corrections</option><option value="limited">Declared limits / meta</option></select></label><label>Find <input id="search" type="search" placeholder="Page, subject or decision" autocomplete="off"></label><output id="count" aria-live="polite">47 readings</output><button id="reset" type="button">Reset</button></div>
<table id="comparison"><caption>The complete comparison. Every finding appears here before its evidence exit.</caption><colgroup><col class="page-col"><col class="learned-col"><col class="miss-col"><col class="depth-col"></colgroup><thead><tr><th scope="col">Finished page / read path</th><th scope="col">Decisions learned without the diff</th><th scope="col">What the diff added or corrected</th><th scope="col">Rule 4 · surprise on descent</th></tr></thead><tbody>'''
body += ''.join(render_row(r) for r in rows)
body += '''</tbody></table><p id="empty" hidden>No matching readings. Reset to see the full table.</p></main><footer><p>This is a finite-witness critique: all declared top inventories were read; deeper interactions were sampled. Wide diffs received file/changed-line inventories and contextual reads, not an exhaustive semantic audit of every copied line. Rendered captures, read paths, immutable source revisions and line-numbered witnesses make the claims inspectable. Entry HTML hashes were rechecked; the seal preserves rendered text and screenshots, not a complete pre-read archive of every linked asset.</p><p><a href="evidence.html">Source and descent receipts</a> · <a href="#top">Return to table opening</a></p></footer>'''
script = '''<script>
const filter=document.querySelector('#filter'), search=document.querySelector('#search'), rows=[...document.querySelectorAll('tbody tr')];
function apply(){const q=search.value.toLowerCase().trim();let shown=0;for(const row of rows){const kind=filter.value;const match=kind==='all'||row.dataset[kind]==='True';row.hidden=!(match&&(!q||row.textContent.toLowerCase().includes(q)));if(!row.hidden)shown++;}document.querySelector('#count').textContent=shown+' of '+rows.length+' readings';document.querySelector('#empty').hidden=shown!==0;}
filter.addEventListener('change',apply);search.addEventListener('input',apply);document.querySelector('#reset').addEventListener('click',()=>{filter.value='all';search.value='';apply();});
function revealHash(){const target=document.getElementById(location.hash.slice(1));if(target?.tagName==='TR'&&target.hidden){filter.value='all';search.value='';apply();target.scrollIntoView();}}
window.addEventListener('hashchange',revealHash);apply();revealHash();
</script>'''
(OUT / "index.html").write_text(layout("46 · Fresh reader refresh", body, script))

source_index = {s['snapshot']: s for s in json.loads((EVIDENCE / 'source-index.json').read_text())}
body = '<header id="top"><p class="eyebrow">46 · Evidence</p><h1>The receipts behind the table.</h1><p>These are phase-two source witnesses and authored parent/child comparisons. They substantiate the decisions already visible in the table. Line numbers refer to the saved file or patch, not a moving branch.</p><p><a href="index.html">← Complete comparison</a> · <a href="evidence/revisions.json">Pinned PR revisions</a> · <a href="evidence/source-index.json">Source provenance</a></p></header><main class="evidence-main">'
for f in facts:
    body += f'<article class="witness" id="{f["id"]}"><p class="eyebrow">{f["id"]}</p><h2>{esc(f["title"])}</h2><p>{esc(f["explanation"])}</p>'
    for source in f['sources']:
        file, a, b = source['file'], source['start'], source['end']
        lines = (EVIDENCE / file).read_text().splitlines()
        b = min(b, len(lines))
        metadata = source_index.get(file)
        provenance = f'{metadata["revision"][:12]} · {metadata["path"]}' if metadata else file
        body += f'<p class="source-label">{esc(provenance)} · lines {a}–{b} · <a href="evidence/{esc(file)}">Full saved file</a></p><pre>'
        body += '\n'.join(f'<span class="source-line"><i>{n}</i>{esc(line)}</span>' for n, line in enumerate(lines[a-1:b], a))
        body += '</pre>'
    body += '<p><a href="index.html">← Return to the comparison</a></p></article>'
for id, d in descents.items():
    body += f'<article class="witness descent" id="{id}"><p class="eyebrow">Rule 4 · {id}</p><h2>{esc(d["title"])}</h2><p>{esc(d["interpretation"])}</p>'
    for key in ['parent', 'child']:
        r=d[key]
        body+=f'<h3>{key.title()}</h3><blockquote>{esc(r["text"])}</blockquote><p><a href="captures/{r["capture"]}.txt">Exact captured page text</a></p>'
    body+='<p><a href="index.html">← Return to the comparison</a></p></article>'
body+='</main>'
(OUT / 'evidence.html').write_text(layout('46 · Source and descent receipts',body))
(OUT / 'comparisons.json').write_text(json.dumps(rows,indent=2,ensure_ascii=False)+'\n')
(OUT / 'evidence/findings.json').write_text(json.dumps(facts,indent=2,ensure_ascii=False)+'\n')
(OUT / 'evidence/descents.json').write_text(json.dumps(descents,indent=2,ensure_ascii=False)+'\n')
print(json.dumps({'rows':len(rows),'rule_4_flags':sum(bool(r['flag']) for r in rows),'source_witnesses':len(facts)}))
