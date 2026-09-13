"""Build the offline source bank. Reads only the supplied PR worktrees/bundle."""
from pathlib import Path
import hashlib
import json
import re
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
HEAD = ROOT / "worktrees/pr-148-head"
BASE = ROOT / "worktrees/pr-148-base"
BUNDLE = ROOT / "inputs/pr-148"
P = "packages/daemon/src/"
T = "packages/daemon/test/"
A = "apps/cli/src/"
SPEC = "plans/005/daemon-architecture-functional-spec.md"
FOLLOW = "plans/005/daemon-follow-ups-functional-spec.md"


def source(path, start=1, end=None, title=None, rev="head"):
    return dict(path=path, start=start, end=end, title=title or Path(path).name, rev=rev)


def diff(path, title=None):
    return dict(path=path, title=title or "Change in " + Path(path).name, rev="diff")


def reason(start, end):
    return source(SPEC, start, end, "Recorded architectural intent")


rooms = [
    dict(id="staging", number="01", title="Two homes, one active CLI", short="Compatibility", color="amber",
         subtitle="The ownership boundary is staged; production invocation still crosses the CLI-local graph.",
         diagram="staging", decisions=["D01", "D02", "D03", "D22"]),
    dict(id="facade", number="02", title="A narrow public doorway", short="Public client", color="mint",
         subtitle="The host supplies execution and environment. DaemonClient composes Node mechanisms behind a portable type surface.",
         diagram="facade", decisions=["D04", "D05", "D06", "D23"]),
    dict(id="routing", number="03", title="Choose once; own the result", short="Routing & output", color="mint",
         subtitle="Ordered observations select local or warm execution. Retry authority and output capture stay inside the client.",
         diagram="routing", decisions=["D07", "D08", "D09", "D10"]),
    dict(id="process", number="04", title="Private process owners", short="Process owners", color="blue",
         subtitle="Registry, process coordinator, execution, delivery, workers and resources keep distinct responsibilities inside the package.",
         diagram="process", decisions=["D11", "D12", "D13", "D14", "D15"]),
    dict(id="clocks", number="05", title="New clock owner, old deadlines", short="Clocks", color="blue",
         subtitle="Time sources move behind DaemonClock. Readiness and completion still do not arm fresh idle intervals.",
         diagram="clocks", decisions=["D16", "D17"]),
    dict(id="tests", number="06", title="The evidence moves too", short="Tests & changes", color="rose",
         subtitle="Package fixtures replace CLI coupling. Oracles change or disappear; platform cleanup, serial test files and a tsx loader are choices too.",
         diagram="tests", decisions=["D18", "D19", "D20", "D21", "D24", "D25"]),
]

decisions = []


def decision(id, title, status, before, after, rationale, sources, **extra):
    decisions.append(dict(id=id, title=title, status=status, before=before, after=after,
                          rationale=rationale, sources=sources, **extra))


decision("D01", "Stage package mechanisms; stabilize and freeze 38 active CLI copies.", "stated",
         "CLI-local mechanisms own process coordination; the package mainly owns contracts and policy.",
         "The package gains real mechanisms. The shipped dispatcher still imports CLI-local registry, launcher and transport; those compatibility sources are frozen after this PR's edits.",
         "PR body: mechanism ownership and host invocation coordination need separate review boundaries. The production consumer switch is deferred.",
         [source(A + "daemon/daemon-command-dispatcher.ts", 1, 34, "Active CLI imports"),
          source("meta-tests/src/daemon-compatibility-copy.test.ts", 8, 50, "38-copy freeze"),
          diff(A + "daemon/daemon-process-coordinator.ts", "CLI copy also changes before freezing")],
         reasonRef="pr", boundary="Ownership staging ≠ active consumer migration")

decision("D02", "Group existing mechanisms by owner; the package has no internal production dependency.", "stated",
         "Daemon mechanisms and some output helpers live under apps/cli; the daemon package is a portable contract/policy leaf.",
         "client, delivery, diagnostics, execution, lifecycle, process, registry, resources, transport and worker directories own the implementations. Core and CLI knowledge stay outside production imports.",
         "Architecture spec: a package boundary should identify where a concern belongs. The daemon moves bytes for an injected executor and must know nothing about symbols.",
         [reason(30, 40), source(P + "package-boundary.test.ts", 1, 37, "Production dependency check"),
          source(P + "host-contract.test.ts", 165, 215, "Mechanism source inventory")],
         boundary="CLI-local implementation → daemon-owned implementation")

decision("D03", "Remove policy-testing export, its lint gate and the associated tests.", "unexplained",
         "The package exposes a temporary policy-testing subpath. ESLint forbids production imports and meta-tests exercise that exception.",
         "Only root, process-entry and worker-entry subpaths remain. Test helpers now live in CLI/package test folders; the targeted lint restriction and its tests are deleted.",
         "The exact export inventory is specified and the old subpath is called temporary. No reason for the timing of its removal or the deleted lint checks was found in the supplied PR body, commit messages or plans.",
         [diff("packages/daemon/package.json"), diff("eslint.config.mjs"),
          diff("meta-tests/src/lint-rule.test.ts"), diff(P + "host-contract.test.ts"),
          source("apps/cli/test/helpers/daemon-policy.ts", 1, 30, "CLI test helper")],
         boundary="Test-only package escape hatch → local test helpers", scope="Beyond the five PR-body decision bullets")

decision("D04", "Keep host types Node-free; load the runtime dynamically at construction.", "stated",
         "Hosts compose Node-backed registry, transport and startup mechanisms themselves.",
         "DaemonClient exposes execute plus typed start/status/stop overloads. Options carry state directory, version, enabled flag, executor factory, module URL, readiness probe and optional policy. Construction starts one runtime-loading promise; methods await it.",
         "PR body: host declarations must not acquire Node ambient dependencies. Dynamic loading separates the public declarations from the Node-backed implementation; this does not make actual execution browser-portable.",
         [source(P + "client/daemon-client.ts", 13, 64, "Facade and dynamic import"),
          source(P + "client/daemon-client-contracts.ts", 1, 36, "Host input/output types"),
          source(P + "host-contract.test.ts", 880, 905, "No-Node declaration test and negative control")],
         reasonRef="pr", boundary="Host-visible types | private Node runtime")

decision("D05", "The host supplies the readiness command; startup executes it with cold mode and telemetry off.", "stated",
         "Startup embeds version / --version as the readiness execution probe.",
         "Public options require a readinessProbe. The runtime forwards it to the shared startup coordinator, which executes its command/argv, awaits completion and requires exitCode 0. The private coordinator retains its legacy default.",
         "The architecture spec assigns command-line syntax to the host and says the daemon should forward argv. The exact cold-mode and telemetry-off settings are carried forward; no separate rationale for those settings is recorded.",
         [reason(207, 215), source(P + "client/daemon-client-runtime.ts", 95, 128, "Probe forwarded into composition"),
          source(P + "registry/startup-coordinator.ts", 75, 84, "Private compatibility default"),
          source(P + "registry/startup-coordinator.ts", 468, 486, "Execution readiness probe")],
         boundary="Embedded CLI readiness syntax → injected host command")

decision("D06", "Reuse lifecycle composition; separate status timeouts; disabled status/stop and errors reach the host.", "unexplained",
         "Controller.start constructs a startup coordinator per call; callers compose lifecycle mechanisms.",
         "The client reuses a startup coordinator and controllers. Status has a distinct response timeout. Disabled execute stays cold and disabled start returns disabled; status and stop still run. Lifecycle errors reject to the host wrapper.",
         "The tests explicitly specify these choices. No additional reason for the persistent composition, distinct status timeout or disabled-control asymmetry was found in the examined prose sources.",
         [source(P + "client/daemon-client-runtime.ts", 77, 182, "Shared composition and control dispatch"),
          source(P + "client/daemon-client-control.test.ts", 10, 77, "Timeout, disabled and rejection characterization"),
          source(P + "process/controller.ts", 20, 81, "Controller retains its coordinator")],
         boundary="Host wiring → one retained private lifecycle composition")

decision("D07", "Run lazy guards in order: present → not starting → version → responsive; first result stops.", "stated",
         "The active CLI dispatcher holds routing conditionals and observations.",
         "Private guards decide in a fixed order. The context memoizes a record read, its error and the observation promise. Disabled execution bypasses registry access; a starting or incompatible record cannot cause a later routing ping. Independently triggered startup can make its own observations.",
         "PR body: the first routing decision must prevent every later side effect. The spec also names readable check order and individually testable checks as the purpose.",
         [source(P + "client/daemon-routing-policy.ts", 29, 137, "Lazy context and ordered guards"),
          source(P + "client/daemon-client-runtime.ts", 139, 163, "Disabled bypass and route use"),
          source(P + "client/daemon-routing-policy.test.ts", 123, 169, "Observation is lazy and memoized"), reason(247, 253)],
         reasonRef="pr", boundary="Host route observation → private ordered policy")

decision("D08", "Preserve local/warm routes; make fresh local executors and trigger warm-up independently.", "stated",
         "Ordinary commands can run locally while a background daemon is absent, starting, recovering or unsuitable.",
         "Absent runs cold and triggers startup; starting or recovering runs cold without another trigger; dead/incompatible falls back and triggers. Responsive compatible ready/busy runs warm. Local attempts each get a fresh executor. A chosen cold route never waits for or upgrades to warm-up.",
         "The architecture spec explicitly preserves the existing routing table and behavior. This PR moves those choices behind the client instead of changing the invocation's result while warm-up progresses.",
         [reason(17, 28), reason(207, 215), source(P + "client/daemon-client.test.ts", 33, 147, "Route table and independent warm-up"),
          source(P + "client/daemon-client-runtime.ts", 224, 252, "Fresh local executor and independent trigger")],
         boundary="One invocation chooses a route; warm-up is separate")

decision("D09", "Retry locally only when transport says safe; uncertain or accepted work is never replayed.", "stated",
         "The CLI host coordinates warm failures and local fallbacks around transport receipts.",
         "A retrySafe DaemonTransportError before a receipt causes one local fallback. Other execute errors, completion failures and missing/malformed warm results return controlled warm failures. Once the receipt exists, a completion problem never triggers local replay.",
         "PR body: replay safety belongs to the daemon client. The client consumes the existing transport retry authority instead of asking the host to guess whether execution happened.",
         [source(P + "client/daemon-client-runtime.ts", 184, 222, "Warm execution and failure branches"),
          source(P + "client/daemon-client.test.ts", 188, 230, "Safe fallback vs uncertain completion"),
          source(P + "transport/transport-error.ts", 1, 38, "Existing retry-safety authority")],
         reasonRef="pr", boundary="Transport receipt / acceptance | replay decision")

decision("D10", "Own capture, spool codec and controlled failures; dispose malformed warm output.", "stated",
         "Warm output capture and the completion spool depend on host composition or a CLI output codec.",
         "Each transfer gets a package capture, with ordered bytes held inline then spilled under OS temp according to output policy. The completion spool gets its own codec. The client owns exit-1 stderr failures for workspace capacity, response capacity and incomplete accepted work; malformed supplied output is disposed when available.",
         "PR body: warm-transfer cleanup and replay safety belong to the daemon client, rather than host storage or output factories. Package isolation also removes the spool's dependency on a CLI codec.",
         [source(P + "client/daemon-client-runtime.ts", 40, 98, "Controlled output and capture composition"),
          source(P + "client/daemon-client-runtime.ts", 254, 270, "Malformed-output disposal and failure mapping"),
          source(P + "transport/client-result-capture.ts", 42, 147, "Inline capture and temporary spool"),
          source(P + "delivery/completion-spool.ts", 1, 89, "Package-owned completion codec"),
          source(P + "client/daemon-client.test.ts", 233, 280, "Exact failure messages and no replay")],
         reasonRef="pr", boundary="Host output infrastructure → private capture and codec")

decision("D11", "Adopt validated process coordinates before creating collaborators; reuse their endpoint.", "unexplained",
         "WorkspaceDaemon accepts separate instance/version values and derives the endpoint during startup.",
         "DaemonProcessCoordinator receives a coordinate object. Its first constructor operation checks workspace root/key, state key, identity key and endpoint against the resolved identity. The validated endpoint is then used for listening and publication.",
         "Commit subjects and construction tests specify validation and adoption. No prose reason for choosing the coordinate object or validation timing was found; the diagram shows the implemented boundary without supplying one.",
         [source(P + "process/process-coordinator.ts", 38, 100, "Coordinate contract and first constructor action"),
          source(P + "process/process-coordinator.ts", 228, 262, "Adopted listen/publication endpoint"),
          source(P + "process/process-coordinator.ts", 541, 555, "Exact coordinate comparison"),
          source(P + "process/process-coordinator-construction.test.ts", 53, 127, "Reject before collaborator observation")],
         boundary="Unvalidated launch configuration | composed process")

decision("D12", "Make the registry the one startup-ownership authority, with narrow and full-snapshot checks.", "stated",
         "Controller, startup coordinator and registry compare subsets of startup ownership fields in multiple places.",
         "Callers ask registry methods for an instance, record credentials or daemon process. One private predicate compares required identity/instance plus supplied token, kind, PID, times and revision. Mutation paths pass full snapshots and recheck adopted ownership after replacement.",
         "The architecture spec calls for one lock-ownership check. The PR's commit sequence explicitly centralizes that authority; narrow caller coordinates and complete mutation snapshots refine the same ownership boundary.",
         [reason(89, 100), source(P + "registry/registry.ts", 419, 463, "Narrow ownership queries"),
          source(P + "registry/registry.ts", 842, 862, "Canonical predicate"),
          source(P + "registry/registry.ts", 950, 983, "Mutation rechecks"),
          source(P + "registry/registry.test.ts", 365, 476, "Authority characterization")],
         boundary="Scattered field equality → registry-owned identity authority")

decision("D13", "Keep distinct authentication paths: normal protocol/instance checks, execution tokens, special control tokens.", "unexplained",
         "The coordinator already distinguishes identify/terminate/kill from protocol-bearing execution and lifecycle requests.",
         "Normal requests check protocol and instance first. execute, execution-status, result-fetch and result-ack also check the token; ping/stop require protocol and instance only. identify/terminate/kill branch earlier and check instance plus token. New tests pin the ordering and exceptions.",
         "These boundaries are specified in tests and characterized in commits. No reason for using different credential sets for these actions was found in the PR body or plans. Preservation is the overall refactor goal, not a recorded justification for each exception.",
         [source(P + "process/process-coordinator.ts", 353, 435, "Request dispatch and exceptional control branches"),
          source(P + "process/process-coordinator.ts", 482, 514, "Execute authentication before admission"),
          source(P + "process/process-coordinator-requests.test.ts", 225, 302, "Authentication order tests")],
         boundary="Protocol/instance identity | process-token authority")

decision("D14", "Keep execution, delivery, workers, resources and activity as separate owners; wire callbacks without invoking them.", "stated",
         "Earlier stack parts already split accepted execution, delivery, worker generations and activity away from WorkspaceDaemon.",
         "The renamed process coordinator composes those owners inside the package. Queue/ledger own accepted work; delivery/spools own completion; generations own worker recovery; resources schedule at turn boundaries; lifetime initiates idle drain. Construction binds cross-owner callbacks without dispatching them.",
         "The architecture spec explicitly requires this split and owner-based package layout. The callback construction test characterizes the carried composition; it does not introduce another process or merge the sessions.",
         [reason(89, 101), source(P + "process/process-coordinator.ts", 132, 213, "Process composition"),
          source(P + "process/process-coordinator-construction.test.ts", 129, 184, "Bound callbacks are initially dormant")],
         boundary="Composition owns links; each mechanism retains its state")

decision("D15", "Launch real package process/worker entries; load the host executor by URL; entries export no API.", "stated",
         "Launch and worker defaults point at CLI-local daemon entry files.",
         "The package publishes process-entry and worker-entry as side-effect entry subpaths. The launcher and worker resolve them relative to their package modules; the host executor module URL crosses process and thread boundaries and is loaded there. Entry source/declarations expose no named API.",
         "Architecture spec: give daemon entry points and launch machinery one package home, while running commands through an injected executor without knowing what they are.",
         [reason(185, 205), source(P + "process/process-launcher.ts", 145, 176, "Package-relative process entry"),
          source(P + "worker/navigation-worker.ts", 83, 113, "Package-relative worker entry"),
          source(P + "process-entry.ts", 1, 42, "Process configuration composition"),
          source(P + "entry-boundary.test.ts", 39, 52, "Side-effect-only entry exports")],
         boundary="Package modules | child process | worker thread | injected executor")

decision("D16", "Use an injectable daemon wall/monotonic clock across timestamps, deadlines and durations.", "stated",
         "Mechanisms mix clock interfaces, Date.now, performance.now and individual now callbacks.",
         "NodeDaemonClock accepts wall and monotonic sources. Registry, lifetime, ledger, controller and resource deadlines use wall time; queue, worker and diagnostics durations use monotonic time. Coordinator composition passes the owned clock to its mechanisms.",
         "The architecture spec gives the daemon its own wall and monotonic clock so telemetry is not a shared utility owner. This PR centralizes those sources while preserving which kind of time the existing mechanisms use.",
         [reason(235, 239), source(P + "lifecycle/daemon-clock.ts", 1, 28, "Injectable clock sources"),
          diff(A + "daemon/workspace-request-queue.ts", "Queue uses monotonic clock"),
          diff(A + "daemon/daemon-resource-monitor.ts", "Resource supervisor wall clock"),
          diff(A + "daemon/daemon-navigation-worker-entry.ts", "Worker uses monotonic clock"),
          source(P + "lifecycle/daemon-clock.test.ts", 1, 60, "Independent clock sources")],
         boundary="Scattered platform clocks → owned daemon clock")

decision("D17", "Keep idle time armed at construction and reset at acceptance; readiness/completion changes stay deferred.", "stated",
         "Construction starts the idle deadline. Accepting navigation resets it. Queue-idle checks that same deadline.",
         "The new clock port preserves those events. Startup can consume the idle interval; a long accepted request can finish after its deadline and drain as soon as the queue becomes idle. New follow-up requirements would instead arm at readiness and reset at completion, but are not implemented here.",
         "PR body: readiness- and completion-based lifetime changes are explicitly deferred behavior. The refactor must preserve acceptance-based idle timing while moving its owner.",
         [source(P + "lifecycle/daemon-lifetime.ts", 1, 60, "Current acceptance-based lifetime"),
          source(FOLLOW, 175, 196, "Deferred readiness/completion behavior"),
          source(P + "lifecycle/daemon-lifetime.test.ts", 1, 150, "Current lifetime tests")],
         reasonRef="pr", boundary="Clock ownership changes; idle-reset event does not")

decision("D18", "Relocate 37 mechanism test files; use generic package fixtures and built entries instead of CLI coupling.", "stated",
         "Mechanism tests live under apps/cli and some fixtures import the CLI command program. The app entry has a mocked construction test and an import-boundary test.",
         "Git records 37 test-file moves into package src. Generic executors remove the package tests' need to import CLI execution. The old app entry test file is deleted; new package boundary, built process, built worker and launch-resolution tests cover the new ownership surface.",
         "The architecture spec says tests that import daemon internals must move into the package or use its public surface. Package extraction must not make the daemon depend on a CLI implementation. This explains the move, not a claim that every old assertion survived.",
         [reason(185, 195), diff(A + "daemon/daemon-entry.test.ts", "Deleted app entry tests"),
          source(T + "integration/built-process-entry.test.ts", 212, 281, "Built process behavior"),
          source(T + "integration/built-entry-artifacts.test.ts", 1, 79, "Built worker behavior"),
          source(T + "fixtures/executor-module.test.ts", 1, 75, "Generic executor fixture")],
         boundary="CLI integration fixtures → package mechanism evidence")

decision("D19", "Re-anchor CLI version rejection at the executor factory; remove the worker-level CLI mismatch test.", "unexplained",
         "A worker integration test loads the built CLI executor with the wrong product version and expects initialization failure.",
         "That integration case is removed when the worker tests move. A new apps/cli daemon-executor test directly asserts product-version rejection by createDaemonExecutor. Generic missing-module/export worker startup failures remain tested separately.",
         "The commit says 'Restore CLI executor version rejection oracle'. No reason is recorded for changing the oracle from worker integration to a direct factory call. Package isolation explains removing CLI coupling, but does not establish equivalent coverage.",
         [diff(P + "worker/navigation-worker.test.ts", "Removed worker-level mismatch case"),
          diff(A + "daemon-executor.test.ts", "Added direct CLI factory oracle"),
          source(T + "integration/built-entry-artifacts.test.ts", 51, 79, "Remaining generic startup failures")],
         boundary="Worker + CLI integration → direct CLI factory assertion", scope="Changed test scope")

decision("D20", "Drop CLI readiness timing assertions when switching to the generic worker fixture.", "unexplained",
         "The readiness integration test asserts discovery/indexing/total startup durations and freshness/navigation/render/output result durations alongside version output.",
         "The generic readiness test retains ready fileCount, successful execution and ordered output, but those startupDurations and durations expectations disappear from this scenario.",
         "The fixture change is visible; no reason for these precise deleted assertions was found. This is a narrower observation about one test, not a claim that the entire repository has no timing coverage.",
         [diff(P + "worker/navigation-worker.test.ts", "Exact assertion removals"),
          source(P + "worker/navigation-worker.test.ts", 365, 411, "Generic readiness test after the move")],
         boundary="CLI-specific timing oracle → generic readiness/output oracle", scope="Deleted assertions")

decision("D21", "Model Windows forced-exit cleanup as observer-owned, with no process-termination diagnostic.", "unexplained",
         "The app entry test uses mocks; it does not exercise this platform-dependent forced-exit path.",
         "The new built process test expects Windows termination to leave the ready record and no termination diagnostic until an observer removes the exact exited process. On other platforms it expects self-cleanup and one diagnostic. Both branches end with no record or startup owner.",
         "The final commit names Windows cleanup ownership and the test encodes the distinction. No prose explanation of the platform behavior was supplied; this canvas does not claim a Windows execution run.",
         [source(T + "integration/built-process-entry.test.ts", 226, 261, "Platform-specific cleanup expectations"),
          source(P + "process-entry.ts", 33, 39, "Process cleanup callback")],
         boundary="Terminated process cleanup | surviving observer cleanup", scope="New platform-specific test expectation")

decision("D22", "Normalize CRLF before the 38-file source hash; still reject content changes.", "unexplained",
         "There was no compatibility-copy freeze at the PR base. Early commits in this PR introduce a digest of the staged CLI graph.",
         "The final digest includes sorted paths, NUL separators and source with CRLF normalized to LF. The test synthesizes a CRLF checkout with the same digest, then appends export {} and expects a different digest. This is byte-content freezing after newline normalization, not an AST-semantic comparison.",
         "Commit subjects specify portable hashing and line-ending normalization. No further reason for choosing this digest mechanism was found. The test's intent is visible; the mechanism is not evidence that the CLI calls the new package.",
         [source("meta-tests/src/daemon-compatibility-copy.test.ts", 8, 77, "Freeze algorithm and portability test")],
         boundary="Checkout line endings | meaningful frozen source bytes")

decision("D23", "Lock public exports, Node-free declarations and side-effect-only entries with new boundary tests.", "stated",
         "The package contract tests cover the portable policy/contracts and the temporary test subpath.",
         "The expected public inventory gains DaemonClient and its four host types. Tests compile the root with types: [], reject a Buffer leak, enumerate exact package entry exports and reject named source/declaration exports from executable entries. Production dependency checks cover all mechanism folders.",
         "The architecture spec asks for enforced package ownership and a public client/executor/entry surface. The PR body specifically requires host declarations to avoid Node ambient dependencies.",
         [source(P + "host-contract.test.ts", 397, 418, "Type compiler excludes ambient packages"),
          source(P + "host-contract.test.ts", 880, 905, "Root declaration and Buffer negative control"),
          source(P + "entry-boundary.test.ts", 1, 52, "Exact side-effect-only entry rule"),
          source("meta-tests/src/daemon-package.test.ts", 63, 104, "Exact package exports")],
         reasonRef="pr", boundary="Public contract | private mechanism implementation")

decision("D24", "Disable file parallelism for the daemon package's Vitest suite.", "unexplained",
         "The PR base has no package-local packages/daemon/vitest.config.ts.",
         "A new package Vitest configuration sets test.fileParallelism to false. The moved mechanism suites therefore have an explicit file-scheduling constraint alongside their new owner.",
         "No reason for serializing test files was found in the supplied PR body, commit messages or relevant plans.",
         [diff("packages/daemon/vitest.config.ts", "New test-file scheduling configuration")],
         boundary="Default test-file scheduling → explicit package serialization", scope="Beyond the PR-body decision list")

decision("D25", "Add tsx as a daemon dev dependency for the moved TypeScript helper processes.", "unexplained",
         "The daemon package's only listed dev dependency is @symnav/testing. CLI-owned mechanism tests launch their helpers through the CLI's tsx installation.",
         "The package manifest adds tsx ^4.21.0 and its lockfile importer resolves 4.21.0. Moved process, registry and startup tests locate the package's node_modules/tsx/dist/cli.mjs to launch TypeScript helper files.",
         "The helper call sites show what uses the dependency. No separate reason for choosing this loader, its version range or source-running helpers rather than built helpers was found in the examined prose.",
         [diff("packages/daemon/package.json", "Added development dependency"), diff("pnpm-lock.yaml", "Lockfile importer addition"),
          source(P + "process/process-coordinator.test.ts", 787, 814, "Moved test launches a TypeScript helper")],
         boundary="CLI test tool installation → daemon package test tool installation", scope="New development dependency")


def build():
    pr = json.loads((BUNDLE / "pr.json").read_text())
    patch = (BUNDLE / "diff.patch").read_text()
    chunks = {}
    inventory = []
    for body in patch.split("diff --git ")[1:]:
        old, new = body.splitlines()[0].split(" b/", 1)
        old = old.removeprefix("a/")
        chunk = "diff --git " + body
        chunks[new] = chunk
        added = sum(line.startswith("+") and not line.startswith("+++") for line in chunk.splitlines())
        removed = sum(line.startswith("-") and not line.startswith("---") for line in chunk.splitlines())
        inventory.append(dict(path=new, old=old, added=added, removed=removed,
                              change="moved" if old != new else "added" if "new file mode" in chunk else "deleted" if "deleted file mode" in chunk else "edited",
                              patch=chunk))
    head_sha = subprocess.check_output(["git", "-C", str(HEAD), "rev-parse", "HEAD"], text=True).strip()
    base_sha = subprocess.check_output(["git", "-C", str(BASE), "rev-parse", "HEAD"], text=True).strip()
    evidence = {}
    for d in decisions:
        d["room"] = next(room["id"] for room in rooms if d["id"] in room["decisions"])
        if d.get("reasonRef") == "pr":
            d["sources"].append(dict(path="pr.json", title="PR body: stated decisions", rev="bundle"))
        for ref in d["sources"]:
            key = ":".join(str(ref.get(k, "")) for k in ["rev", "path", "start", "end"])
            ref["key"] = key
            if key in evidence:
                continue
            rev = ref["rev"]
            if rev == "diff":
                content = chunks.get(ref["path"])
                if content is None:
                    raise ValueError("No diff for " + ref["path"])
                evidence[key] = dict(text=content, firstLine=1, kind="diff", path=ref["path"], revision=base_sha[:8] + " → " + head_sha[:8])
            elif rev == "bundle":
                evidence[key] = dict(text=pr["body"], firstLine=1, kind="text", path="inputs/pr-148/pr.json · body", revision=head_sha[:8])
            else:
                text = ((HEAD if rev == "head" else BASE) / ref["path"]).read_text()
                lines = text.splitlines()
                start, end = ref.get("start", 1), min(ref.get("end") or len(lines), len(lines))
                if start > len(lines):
                    raise ValueError(f"Invalid excerpt {ref}")
                evidence[key] = dict(text="\n".join(lines[start - 1:end]), firstLine=start, kind="code" if ref["path"].endswith((".ts", ".mjs", ".json")) else "text",
                                     path=ref["path"], revision=(head_sha if rev == "head" else base_sha)[:8],
                                     url=f"https://github.com/mohasarc/symnav/blob/{head_sha if rev == 'head' else base_sha}/{ref['path']}#L{start}-L{end}")
    test_moves = [f for f in inventory if f["change"] == "moved" and f["path"].startswith(P) and f["path"].endswith(".test.ts")]
    assert len(inventory) == 153 and len(test_moves) == 37
    assert len(decisions) == len(set(d["id"] for d in decisions)) == 25
    data = dict(rooms=rooms, decisions=decisions, evidence=evidence, files=inventory,
                meta=dict(pr=148, title=pr["title"], base=base_sha, head=head_sha, commits=pr["commits"],
                          fileCount=len(inventory), added=sum(f["added"] for f in inventory), removed=sum(f["removed"] for f in inventory),
                          testMoves=len(test_moves), patchSha256=hashlib.sha256(patch.encode()).hexdigest()))
    (HERE / "data.js").write_text("window.REVIEW_DATA = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n")
    (HERE / "decision-inventory.md").write_text("# Decision inventory\n\nThis is the authored outline used at every zoom depth. Reasons are scoped to the supplied PR body, commit messages and relevant plans; a test specifying behavior is not itself treated as an explanation.\n\n" +
        "\n\n".join("## " + room["title"] + "\n\n" + "\n".join(f"- **{d['id']} · {d['status']}** — {d['title']}\n  {d['rationale']}" for d in decisions if d["room"] == room["id"]) for room in rooms) + "\n")
    print(f"Built {len(decisions)} decisions, {len(evidence)} exact evidence excerpts, {len(inventory)} file diffs, {len(test_moves)} mechanism test moves.")


if __name__ == "__main__":
    build()
