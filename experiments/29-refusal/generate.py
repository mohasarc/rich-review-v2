#!/usr/bin/env python3
"""Build an offline review page from the pinned PR bundle and source snapshots."""
from pathlib import Path
from html import escape as esc
import hashlib
import json
import re
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
HEAD = ROOT / "worktrees/pr-148-head"
BASE = ROOT / "worktrees/pr-148-base"
BUNDLE = ROOT / "inputs/pr-148"
PR = json.loads((BUNDLE / "pr.json").read_text())
SHA = {side: subprocess.check_output(["git", "-C", str(tree), "rev-parse", "HEAD"], text=True).strip()
       for side, tree in [("head", HEAD), ("base", BASE)]}
SHA["pre-staging"] = "4a0b280649a62c26f0f712166709e086dda74b74"
SOURCES = {}


def source(key, path, needle, length=16, side="head", before=0):
    lines = subprocess.check_output(["git", "show", f"{SHA[side]}:{path}"], cwd=HEAD, text=True).splitlines()
    matches = [i for i, line in enumerate(lines) if needle in line]
    if not matches:
        raise ValueError(f"Missing evidence: {path} / {needle}")
    start = max(0, matches[0] - before)
    SOURCES[key] = dict(path=path, side=side, sha=SHA[side], start=start + 1,
                        lines=lines[start:start + length])
    return key


source("clock", "packages/daemon/src/lifecycle/daemon-clock.ts", "export interface", 25)
source("lifetime", "packages/daemon/src/lifecycle/daemon-lifetime.ts", "constructor(", 26)
source("old-lifetime", "apps/cli/src/daemon/daemon-lifetime.ts", "constructor(", 26, "base")
source("shared-clock", "packages/daemon/src/process/process-coordinator.ts", "constructor(private", 20)
source("queue-clock", "packages/daemon/src/execution/request-queue.ts", "constructor(", 5)
source("old-queue-clock", "apps/cli/src/daemon/workspace-request-queue.ts", "constructor(", 4, "base")
source("idle-followup", "plans/005/daemon-follow-ups-functional-spec.md", "## Readiness-Armed", 21)
source("clock-plan", "plans/005/daemon-architecture-functional-spec.md", "## State Directory and Clock", 5)
source("no-behavior", "plans/005/daemon-architecture-functional-spec.md", "### Behavior is unchanged", 14)
source("matcher", "packages/daemon/src/registry/registry.ts", "private startupOwnershipMatches", 22)
source("credentials", "packages/daemon/src/registry/registry.ts", "startupOwnerForInstance(", 22)
source("renew-owner", "packages/daemon/src/registry/registry.ts", "private replaceStartupOwnerIfOwner(", 38)
source("coordinates", "packages/daemon/src/process/process-coordinator.ts", "private static validateCoordinates(", 15)
source("old-coordinates", "apps/cli/src/daemon/daemon-entry.ts", "if (", 10, "base")
source("ports", "packages/daemon/src/process/process-coordinator.ts", "export interface DaemonProcessCoordinatorOptions", 22)
source("old-ports", "apps/cli/src/daemon/workspace-daemon.ts", "export interface WorkspaceDaemonOptions", 25, "base")
source("authentication", "packages/daemon/src/process/process-coordinator.ts", "private async handle(", 32)
source("callback-test", "packages/daemon/src/process/process-coordinator-construction.test.ts", 'it("binds every cyclic', 21)
source("authority-plan", "plans/005/daemon-architecture-functional-spec.md", "- One owner each", 2)
source("freeze", "meta-tests/src/daemon-compatibility-copy.test.ts", "class DaemonCompatibilityCopyInventory", 39)
source("cli-route", "apps/cli/src/daemon/daemon-command-dispatcher.ts", 'import { DaemonRegistry', 16)
source("entries", "packages/daemon/package.json", '"exports":', 17)
source("entry", "packages/daemon/src/process-entry.ts", "class DaemonProcessEntry", 33)
source("launch-entry", "packages/daemon/src/process/process-launcher.ts", "const daemonEntryPath", 8)
source("worker-entry", "packages/daemon/src/worker/navigation-worker.ts", "this.worker = new Worker", 10)
source("built-worker", "packages/daemon/test/integration/built-entry-artifacts.test.ts", 'it("runs the package-relative', 38)
source("built-process", "packages/daemon/test/integration/built-process-entry.test.ts", 'it("executes its parsed', 49)
source("old-entry-test", "apps/cli/src/daemon/daemon-entry.test.ts", "expect(daemonStateDirectory)", 23, "base")
source("old-worker-test", "apps/cli/src/daemon/daemon-navigation-worker.test.ts", 'it("classifies a CLI executor version', 18, "base")
source("generic-worker", "packages/daemon/src/worker/navigation-worker.test.ts", 'it("proves readiness through the generic', 47)
source("old-worker-timing", "apps/cli/src/daemon/daemon-navigation-worker.test.ts", 'it("proves readiness through the injected', 56, "base")
source("cli-version", "apps/cli/src/daemon-executor.test.ts", 'it("rejects a product version', 10)
source("clock-scan", "packages/daemon/src/lifecycle/daemon-clock.test.ts", 'describe("daemon production clock', 17)
source("old-clock-scan", "apps/cli/src/daemon/daemon-clock.test.ts", 'describe("daemon production clock', 17, "pre-staging")
source("old-lint", "eslint.config.mjs", '"no-restricted-imports": [', 12, "base")
source("old-lint-test", "meta-tests/src/lint-rule.test.ts", 'it("rejects production imports of the temporary', 15, "base")
source("test-serial", "packages/daemon/vitest.config.ts", "import", 7)
source("dependency-plan", "plans/005/daemon-architecture-functional-spec.md", "### The daemon package depends", 15)
source("facade", "packages/daemon/src/client/daemon-client.ts", "class DaemonClientRuntimeLoader", 29)
source("client-options", "packages/daemon/src/client/daemon-client-contracts.ts", "export interface DaemonClientOptions", 27)
source("control", "packages/daemon/src/client/daemon-client-runtime.ts", "if (request.action", 9)
source("control-types", "packages/daemon/src/client/daemon-client.ts", "  control(", 16)
source("status-timeout", "packages/daemon/src/client/daemon-client-runtime.ts", "this.routingTransport =", 14)
source("readiness", "packages/daemon/src/registry/startup-coordinator.ts", "commandName: this.readinessProbe", 12, before=3)
source("host-plan", "plans/005/daemon-architecture-functional-spec.md", "## Client Routing Boundary", 9)
source("routing-order", "packages/daemon/src/client/daemon-routing-policy.ts", "export class DaemonRoutingPolicy", 19)
source("routing-lazy", "packages/daemon/src/client/daemon-routing-policy.ts", "    if (!this.recordRead)", 21, before=1)
source("routing-effects", "packages/daemon/src/client/daemon-client-runtime.ts", "  async execute(", 24)
source("responsive", "packages/daemon/src/client/daemon-routing-policy.ts", "class ResponsiveRoutingGuard", 30)
source("warm", "packages/daemon/src/client/daemon-client-runtime.ts", "  private async executeWarm(", 39)
source("retry", "packages/daemon/src/transport/transport-error.ts", "    this.retrySafe =", 9)
source("local", "packages/daemon/src/client/daemon-client-runtime.ts", "  private async executeLocally(", 15)
source("capture", "packages/daemon/src/transport/client-result-capture.ts", "constructor(", 20)
source("malformed", "packages/daemon/src/client/daemon-client-runtime.ts", "  private static isCompleteResult", 17)
source("errors", "packages/daemon/src/client/daemon-client-runtime.ts", "class DaemonControlledResult", 17)
source("overload-test", "packages/daemon/src/host-contract.test.ts", "const assertControlReturnTypes", 18)
source("node-free", "packages/daemon/src/host-contract.test.ts", 'it("emits the exact declaration', 30)


def decision(id, unit, title, status, reason, explanation, evidence):
    return dict(id=id, unit=unit, title=title, status=status, reason=reason,
                explanation=explanation, evidence=evidence)


DECISIONS = [
    decision("A1", 1, "Daemon wall and monotonic clocks replace telemetry and scattered time callbacks.", "stated",
             "The architecture spec assigns both clock sources to the daemon; behavior is to be preserved.",
             "The coordinator now requires a DaemonClock and passes it into lifetime, ledger, queue and resource owners. Worker timing uses its own NodeDaemonClock. Wall time still drives absolute timestamps, grace periods and idle deadlines; elapsed queue and worker measurements use monotonic time. The queue’s standalone default changes from Date.now to monotonicNowMs; the process already supplied monotonic time before this PR. The record observer’s unused time parameter disappears.",
             ["clock-plan", "clock", "shared-clock", "old-queue-clock", "queue-clock"]),
    decision("A2", 1, "Idle still starts at construction and resets at acceptance; readiness and completion resets are deferred.", "stated",
             "The PR explicitly preserves acceptance-based idle timing; the follow-up spec records two separate future changes.",
             "Construction schedules a deadline. Navigation acceptance moves it forward. Queue completion clears the active flag and can trigger immediate idle shutdown if that deadline has already passed. Readiness does not start a fresh interval. This PR changes the clock interface, while keeping those event boundaries.",
             ["old-lifetime", "lifetime", "idle-followup", "no-behavior"]),
    decision("B1", 2, "The registry owns startup equality, with narrow credentials and full observed-owner checks.", "stated",
             "The architecture spec calls for one owner of lock-ownership checks; this change centralizes the comparisons there.",
             "Controller and startup coordinator call registry operations instead of comparing fields themselves. One predicate always compares identity and instance, then compares only the optional coordinates a caller supplied. Credential lookup omits heartbeat and revision. Replacing or removing an observed owner supplies that full snapshot, so a renewal is distinguishable from the owner previously observed. A single predicate does not mean every caller demands the same strength of match.",
             ["authority-plan", "matcher", "credentials", "renew-owner"]),
    decision("B2", 2, "The process coordinator validates and adopts launch coordinates before composing its internals.", "unexplained",
             "The commits specify and implement this boundary, but give no reason for moving validation into construction or adding the workspace-root comparison.",
             "Validation used to live in the CLI entry and compare four derived values. The coordinator now checks workspace root, workspace key, state key, identity key and endpoint, then uses the supplied endpoint. Invalid coordinates fail before this constructor creates a worker or lifetime timer. The entry constructs the coordinator before installing the termination observer.",
             ["old-coordinates", "coordinates", "shared-clock", "entry"]),
    decision("B3", 2, "WorkspaceDaemon becomes DaemonProcessCoordinator; narrow ports replace generic dependency options.", "stated",
             "The architecture spec splits the old WorkspaceDaemon into explicit owners; the rename makes the remaining process responsibility visible.",
             "Accepted execution, delivery, worker generations and activity projection already existed in the base. This PR names their composer. Options become coordinates, productVersion, server and workspaceExists; a required clock replaces the optional clock/now pair. A construction test characterizes the cyclic callbacks without invoking routing during construction. These ports remain private mechanisms, not the host API.",
             ["old-ports", "ports", "callback-test"]),
    decision("B4", 2, "Request authentication order is characterized and retained, including the identity/termination exceptions.", "stated",
             "The spec requires unchanged failure paths; a commit named “Specify process request authentication order” adds characterization.",
             "Identify and terminate/kill dispatch before the ordinary protocol/instance check and authenticate in their own handlers. Ping follows the ordinary check. Execute enters admission; status/fetch/ack also require the process token. This is a preserved branching boundary, not a new uniform authentication gate.",
             ["authentication", "no-behavior"]),
    decision("C1", 3, "Stage package mechanisms while the live CLI keeps 38 frozen local files; the hash normalizes CRLF.", "stated",
             "The PR separates mechanism ownership from the active host switch so they can be reviewed independently.",
             "The frozen inventory excludes the CLI dispatcher and two invocation-classification files. It hashes sorted file paths plus source text, normalizing CRLF to LF. The expected digest freezes the post-cleanup CLI graph, not the PR base. It neither compares the package copy with the CLI copy nor measures behavior. CRLF normalization is explicitly specified in a later commit; other whitespace remains significant.",
             ["freeze", "cli-route"]),
    decision("C2", 3, "Organize private mechanism owners and expose package-relative process and worker executables.", "stated",
             "The architecture spec assigns daemon mechanisms and executable entries to a package with no internal production dependencies.",
             "Copied mechanisms are grouped under delivery, diagnostics, execution, lifecycle, process, registry, resources, transport and worker. The package export map permits the root plus process-entry and worker-entry. Entries run for side effects and expose no named API. The launcher and worker resolve their own built package entries. The worker still receives an absolute executor module URL supplied by its host; it does not import the CLI as a package dependency.",
             ["dependency-plan", "entries", "launch-entry", "worker-entry", "built-worker"]),
    decision("C3", 3, "37 mechanism tests move to the package and use package-independent executor fixtures.", "stated",
             "The spec permits mechanism tests to move with their owner; commits explicitly make the executor fixture package-independent.",
             "The generic worker fixture exercises ordered bytes and exit codes without loading the built CLI. Test imports and helper paths follow the new mechanism directories. The evidence ledger inventories all 37 renames. That number describes relocation, not assertion preservation; the removed CLI-specific checks are a separate decision in C8.",
             ["generic-worker", "dependency-plan"]),
    decision("C4", 3, "A new raw-clock guard narrows to lifecycle/ during staging; the PR base had no such guard.", "unexplained",
             "No reason was found for the narrower scan; the test’s descriptive name still refers to daemon mechanisms.",
             "The guard is introduced early in this PR. Before staging (commit 4a0b2806), its nonrecursive readdirSync scans apps/cli/src/daemon. At the head the same directory-relative operation scans packages/daemon/src/lifecycle. Other new package mechanism directories fall outside this particular guard. The PR base has only the two source-clock tests and no directory scan. This is narrowing within the PR’s history, not deletion of a base guarantee; no claim is made about violations in unscanned files.",
             ["old-clock-scan", "clock-scan"]),
    decision("C5", 3, "The mocked CLI entry test is deleted; built package entries gain execution and platform-specific cleanup tests.", "stated",
             "Commits explicitly specify built entry resolution, execution and Windows cleanup ownership. Staging is intended to establish runnable package entries.",
             "The deleted test inspected configured state path, executor URL, worker limit and shared logger/termination observer through mocks. New tests launch built package artifacts, inspect readiness and injected executor events, and exercise startup failures. The final Windows test expects the exited process’s record to remain until the harness removes it; POSIX expects termination-observer cleanup and a diagnostic. These observations replace a test setup, not an assertion-for-assertion equivalence proof; that equivalence was not explained.",
             ["old-entry-test", "built-process", "built-worker"]),
    decision("C6", 3, "The temporary policy-testing export, its import restriction and two lint tests are retired together.", "unexplained",
             "The changes are visible in the relocation commit; no rationale was found for the exact enforcement tradeoff.",
             "Policy test helpers move into test-owned locations. The manifest no longer exports @symnav/daemon/policy-testing. ESLint loses the special production-import prohibition for that subpath and the allow/deny tests are deleted. The exact export-map test is updated to process/worker entries. This is a removed enforcement path coupled to a removed public subpath.",
             ["entries", "old-lint", "old-lint-test"]),
    decision("C7", 3, "Package test files run serially; the fixture environment adds tsx and local test helpers.", "unexplained",
             "No scheduling or dependency rationale was found in the PR body, commit bodies or inspected specs.",
             "The new package Vitest config sets fileParallelism to false. The package gains tsx as a development dependency and the lockfile follows it. Generic executor fixtures, canonical-path and output helpers keep package tests independent of CLI production modules. The choice to localize those helpers follows the package boundary; the reason for serial scheduling and the specific dev dependency is absent.",
             ["test-serial", "dependency-plan"]),
    decision("C8", 3, "CLI worker timing and mismatch-initialization assertions are removed; direct executor version rejection is restored.", "unexplained",
             "Package independence is stated, but the exact choice of removed assertions and replacement boundary is not separately explained.",
             "The moved worker readiness test drops discovery/indexing and freshness/navigation/render/output duration assertions when it adopts the generic fixture. The worker-level test that classified a CLI version mismatch as initialization failure is deleted. A new direct CLI executor test asserts that an incompatible product version throws. These test different boundaries: a worker wrapping executor startup versus the executor rejecting a version. They are not evidence of identical coverage.",
             ["old-worker-test", "old-worker-timing", "generic-worker", "cli-version"]),
    decision("D1", 4, "A Node-free public facade loads a Node runtime at construction; only execute/control cross the new host boundary.", "stated",
             "The PR says host declarations must not acquire Node ambient dependencies.",
             "DaemonClient stores one promise for a dynamically imported runtime, started in its constructor. Methods await that promise. Public options and results use portable contracts; actual execution still uses Node internals. The host provides state path, product version, enabled flag, executor factory/module URL, readiness probe and optional policy; per-call input adds workspace, command name, argv, cwd and telemetry flag. Exact exports, class members, declarations without Node types and a deliberate Buffer leak are checked by source/type tests.",
             ["facade", "client-options", "node-free", "host-plan"]),
    decision("D2", 4, "Ordered lazy guards stop later observations: disabled → record → starting → version → responsiveness.", "stated",
             "The PR says the first routing decision must prevent every later side effect; the spec asks for readable ordered guard lists.",
             "Disabled execution exits before workspace identity and registry reads. The four policy guards then check presence, starting state, stored version and observed responsiveness. Context memoizes its record read and observation. Missing, starting or recovering state selects cold; dead or incompatible selects fallback; a compatible ready/busy response selects warm. Starting is checked before version, so a starting record never reaches version or socket observation.",
             ["routing-effects", "routing-order", "routing-lazy", "responsive"]),
    decision("D3", 4, "Absent/dead/incompatible routes trigger independent startup; local attempts get a fresh executor and keep their chosen mode.", "stated",
             "The architecture spec preserves warm/cold/fallback behavior; client characterization explicitly requires independent warmup and a new executor per local attempt.",
             "Absent cold routes and fallback routes trigger startup without awaiting it. Starting/recovering routes do not trigger it. Registry cleanup belongs to the exited-observation branch. A chosen local route does not turn warm mid-invocation. Each local attempt creates an executor, forwards argv/cwd/telemetry plus executionMode, and supplies a no-op resource sampler. Trigger failure is swallowed independently of the local result.",
             ["routing-effects", "responsive", "local"]),
    decision("D4", 4, "Warm failures retry locally only when transport marks them safe; uncertain/accepted failures return controlled output.", "stated",
             "The PR locates replay safety in the daemon client, alongside the existing acceptance-aware transport.",
             "A retry-safe DaemonTransportError permits one local fallback. Non-submission or certain authenticated pre-acceptance rejections can be safe. Submitted-but-unconfirmed, accepted and unknown failures are not blindly replayed. Failed completion maps to a package-owned stderr result with exit 1 and warm mode: workspace capacity, response capacity, or accepted request did not complete. Mode describes the selected execution path even when its result is a failure.",
             ["warm", "retry", "errors"]),
    decision("D5", 4, "The client owns warm output capture in the OS temp directory, failure bytes and malformed-output cleanup.", "stated",
             "The PR rejects host storage/output factories because transfer cleanup and replay safety belong to the daemon client.",
             "The routing transport creates a fresh DaemonClientResultCapture from output policy. The capture defaults to the OS temporary directory. Completion must have an integer exit code and an output object; malformed output is disposed when available before a controlled result is returned. Missing output yields a controlled warm failure without replay or registry mutation. Hosts receive an output object with records/dispose, rather than designing its storage.",
             ["status-timeout", "capture", "malformed", "warm"]),
    decision("D6", 4, "Control has typed start/status/stop results, a separate status timeout, disabled-start short circuit and propagated errors.", "stated",
             "The spec assigns lifecycle reports to the client; commits characterize composition and lock action-specific return types.",
             "One runtime keeps its registry, startup coordinator, two transports and two controllers across calls. Status uses statusResponseTimeoutMs; start/stop use the ordinary lifecycle response timeout. Disabled only short-circuits start; status and stop still delegate. Mechanism errors reject to the host wrapper. Overloads retain each action’s result type rather than returning a union to every caller. The reason for two concrete controller instances is not separately explained beyond the characterized timeout distinction.",
             ["status-timeout", "control", "control-types", "overload-test"]),
    decision("D7", 4, "The host supplies readiness command/argv through startup, preserving the queued executor probe.", "stated",
             "The spec keeps syntax in the host and the daemon ignorant of navigation semantics; two commits specify and route a host-owned readiness probe.",
             "DaemonClientOptions requires the readiness probe and forwards it into startup composition. The package startup coordinator uses that command name and argv for its readiness execution request, with the version command retained as an internal default. This PR does not adopt the separately deferred control-plane readiness design.",
             ["client-options", "readiness", "host-plan"]),
]

UNITS = [
    dict(n=1, letter="A", name="Own time", subtitle="Who supplies a timestamp?", status="Changes the live CLI graph",
         synopsis="Give daemon mechanisms their own wall and monotonic time inputs. Preserve the old idle event boundaries, and record the two lifetime changes for later.",
         omission="You can keep the existing registry comparisons and still route time through DaemonClock.",
         title="Route daemon timing through DaemonClock", commits=[1,2,9,10]),
    dict(n=2, letter="B", name="Own process authority", subtitle="Who may act on this instance?", status="Changes the live CLI graph",
         synopsis="Centralize startup ownership checks and make the process coordinator validate its coordinates. Rename and narrow its composition ports; retain request authentication order.",
         omission="You can centralize ownership while the implementation continues to live entirely in apps/cli.",
         title="Centralize startup authority and process coordinates", commits=[3,4,5,6,7,8,11,12,13,14]),
    dict(n=3, letter="C", name="Stage a package", subtitle="Where is the runnable implementation?", status="Adds a second implementation graph",
         synopsis="Copy mechanisms into their package and give them executable entries. Keep the shipped CLI on frozen copies. Move tests with ownership, including the changed and removed checks.",
         omission="Built package process/worker entries can be exercised without exposing DaemonClient or switching the CLI.",
         title="Stage package mechanisms, executable entries and test ownership", commits=list(range(15,27))+[43,44,45]),
    dict(n=4, letter="D", name="Give hosts a client", subtitle="What must a host know?", status="Adds an API; CLI adoption is deferred",
         synopsis="Hide routing, startup, control and warm result capture behind a portable execute/control surface. Preserve route effects and replay boundaries; accept the host’s executor and readiness probe.",
         omission="The portable host API can be discussed after package relocation has a stable, independently inspectable boundary.",
         title="Expose DaemonClient with routing, output and lifecycle ownership", commits=list(range(27,43))),
]

PATCHES = []
for block in re.split(r"(?=^diff --git )", (BUNDLE / "diff.patch").read_text(), flags=re.M):
    if not block.strip():
        continue
    first = block.splitlines()[0]
    old, new = re.match(r"diff --git a/(.*?) b/(.*)", first).groups()
    units = {3}
    if "/client/" in new or new.endswith("src/index.ts"):
        units = {4}
    if new.endswith("daemon-follow-ups-functional-spec.md"):
        units = {1}
    if new.startswith("apps/cli/src/daemon/") and not new.endswith(".test.ts"):
        units = {1}
        if any(x in new for x in ["coordinator", "registry", "controller", "daemon-entry"]):
            units.add(2)
        if "record-observer" in new: units = {1}
    if any(x in new for x in ["clock.test", "lifetime.test", "request-queue.test", "accepted-request-ledger.test"]):
        units.add(1)
    if any(x in new for x in ["registry.test", "process-coordinator", "controller.test", "startup-coordinator.test"]):
        units.add(2)
    if new in ["packages/daemon/src/registry/startup-coordinator.ts", "packages/daemon/src/process/controller.ts", "packages/daemon/src/host-contract.test.ts"]:
        units.add(4)
    PATCHES.append(dict(id=f"file-{len(PATCHES)+1}", old=old, path=new, units=sorted(units),
                        renamed="rename from" in block, added="new file mode" in block,
                        deleted="deleted file mode" in block, patch=block))

assert len(PATCHES) == 153
MOVED_TESTS = [p for p in PATCHES if p["renamed"] and p["old"].startswith("apps/cli/") and p["path"].startswith("packages/daemon/") and p["path"].endswith(".test.ts")]
assert len(MOVED_TESTS) == 37
cli_dir = HEAD / "apps/cli/src/daemon"
frozen = sorted("apps/cli/src/daemon/" + p.name for p in cli_dir.glob("*.ts") if not p.name.endswith(".test.ts") and p.name not in {"daemon-command-dispatcher.ts", "invocation-route.ts", "invocation-workspace-selector.ts"})
digest = hashlib.sha256()
for path in frozen:
    digest.update(path.encode()); digest.update(b"\0")
    digest.update((HEAD / path).read_bytes().replace(b"\r\n", b"\n")); digest.update(b"\0")
assert len(frozen) == 38
assert digest.hexdigest() == "d0ff136f3be132ea004d3b13985192e055d1dfbad1abb773b607e89c54a1f41e"


def evidence_links(keys):
    return " ".join(f'<button class="source-link" data-source="{key}">{esc(SOURCES[key]["side"])} · {esc(Path(SOURCES[key]["path"]).name)}:{SOURCES[key]["start"]}</button>' for key in keys)


def decision_html(d):
    return f'''<details class="decision" id="{d['id']}"><summary><span class="decision-id">{d['id']}</span><span>{esc(d['title'])}</span><span class="reason-state {d['status']}">{d['status']}</span></summary>
      <div class="decision-body"><p class="reason"><b>Reason · {d['status']}.</b> {esc(d['reason'])}</p><p>{esc(d['explanation'])}</p><div class="evidence-links">{evidence_links(d['evidence'])}</div><a class="return-link" href="#map-{d['unit']}">↑ Back to this cut’s overview</a></div></details>'''


def overview_card(u):
    ds = [d for d in DECISIONS if d['unit'] == u['n']]
    return f'''<article class="cut-card unit-{u['n']}" id="map-{u['n']}"><div class="cut-eyebrow">CUT {u['n']:02} <span>{esc(u['status'])}</span></div><h2><a href="#unit-{u['n']}">{esc(u['name'])} <span aria-hidden="true">↗</span></a></h2><p>{esc(u['synopsis'])}</p><ul class="decision-index">{''.join(f'<li><a href="#{d["id"]}"><span>{d["id"]}</span>{esc(d["title"])}</a><small class="{d["status"]}">{d["status"]}</small></li>' for d in ds)}</ul></article>'''


def section(u, visual):
    return f'''<section class="unit unit-{u['n']}" id="unit-{u['n']}"><div class="unit-heading"><span class="big-number">{u['n']:02}</span><div><p class="eyebrow">{esc(u['status'])}</p><h2>{esc(u['subtitle'])}</h2><p>{esc(u['synopsis'])}</p></div><a href="#overview" class="back-top">↑ Four cuts</a></div>{visual}<div class="decisions">{''.join(decision_html(d) for d in DECISIONS if d['unit']==u['n'])}</div><div class="cut-test"><span>Why this cut holds</span><p>{esc(u['omission'])}</p></div><a class="next-unit" href="{'#unit-'+str(u['n']+1) if u['n']<4 else '#split-plan'}">{'Next: '+UNITS[u['n']]['name'] if u['n']<4 else 'See the proposed split order'} →</a></section>'''


CLOCK_VISUAL = '''<div class="clock-map"><div class="clock-source"><span class="box-label">DAEMON OWNED</span><b>DaemonClock</b><div>wallNowMs() · monotonicNowMs()</div></div><div class="clock-lanes"><div><span class="line-arrow">→</span><b>Wall time</b><span>Idle deadlines · startup grace<br>registry timestamps · resource windows</span></div><div><span class="line-arrow">→</span><b>Monotonic time</b><span>Queue starts · elapsed process activity<br>worker initialization · output duration</span></div></div></div>
<div class="worked-example"><div class="figure-title"><h3>The idle interval still belongs to acceptance</h3><span>Illustrative timeline · interval shortened to 10 units</span></div><div class="timeline"><div class="event" style="--at:0%"><b>0</b><span>construct<br>deadline = 10</span></div><div class="event" style="--at:28%"><b>5</b><span>accept navigation<br>deadline = 15</span></div><div class="event" style="--at:80%"><b>15</b><span>deadline passes<br>active work continues</span></div><div class="event" style="--at:100%"><b>18</b><span>queue idle<br>shutdown can trigger</span></div></div><div class="timeline-caption"><b>No fresh interval at 18.</b> Construction also starts counting before readiness. Both alternate resets are recorded for later.</div></div>'''

AUTH_VISUAL = '''<div class="authority-flow"><div class="authority-input"><span class="box-label">PROCESS ENTRY</span><b>Parsed launch coordinates</b><small>workspace · state · instance · token · endpoint</small></div><span class="flow-arrow">→</span><div class="authority-owner"><span class="box-label">COORDINATOR CONSTRUCTOR</span><b>Validate → adopt → compose</b><small>worker · lifetime · sessions · callbacks</small></div></div><div class="figure-title"><h3>One comparison owner, several claims</h3><span>Grouped fields; the exact predicate is in B1.</span></div><div class="table-scroll"><table class="claim-matrix"><thead><tr><th>Registry operation</th><th>identity + instance</th><th>process token</th><th>kind + PID</th><th>times + revision</th></tr></thead><tbody><tr><th>Find owner for instance</th><td>compare</td><td>—</td><td>—</td><td>—</td></tr><tr><th>Find owner for record credentials</th><td>compare</td><td>compare</td><td>—</td><td>—</td></tr><tr><th>Authenticate daemon process</th><td>compare</td><td>compare</td><td>compare</td><td>—</td></tr><tr><th>Replace observed owner</th><td>compare</td><td>compare</td><td>compare</td><td>compare</td></tr></tbody></table></div><p class="figure-note">A heartbeat renewal can keep credentials while changing the full observed snapshot. The registry owns both kinds of comparison.</p>'''

PACKAGE_VISUAL = '''<div class="test-boundary-map"><div class="test-owner"><span class="box-label">SHIPPED CLI</span><b>38 frozen production files</b><div class="test-mark">Path + normalized text hash</div><small>End-to-end CLI tests remain with the CLI.</small></div><div class="move-tests"><span>37 mechanism tests</span><b aria-hidden="true">→</b><span>change their target</span></div><div class="test-owner package-test"><span class="box-label">DAEMON PACKAGE</span><b>Private mechanism owners</b><div class="test-mark">Relocated unit tests + built entry tests</div><small>Generic executor fixtures replace CLI coupling.</small></div></div><div class="boundary-cost"><b>A frozen source graph and a behavior-tested graph answer different questions.</b><p>The hash pins the active copy after cuts 01 and 02. It is not a comparison between implementations. The narrower clock scan, removed worker assertions, replaced entry test, retired import gate and serial scheduling are all part of this cut.</p></div><div class="package-rooms"><span>delivery</span><span>diagnostics</span><span>execution</span><span>lifecycle</span><span>process</span><span>registry</span><span>resources</span><span>transport</span><span>worker</span></div>'''

CLIENT_VISUAL = '''<div class="client-boundary"><div class="host-box"><span class="box-label">HOST</span><b>Workspace + argv</b><small>state path · version · enabled<br>executor factory + module URL<br>readiness command/argv · optional policy</small></div><div class="api-edge"><span>execute / control</span><b aria-hidden="true">→</b><span>mode + output / report ←</span></div><div class="client-box"><span class="box-label">@SYMNAV/DAEMON</span><b>DaemonClient</b><small>Portable declarations<br>↓ dynamic import on construction<br>Node runtime → routing / lifecycle / capture</small></div></div>
<div class="route-explorer"><div class="figure-title"><h3>Stop at the first decision</h3><span>Illustrative trace of source branches; no daemon is run.</span></div><label for="route-case">Starting situation</label><select id="route-case"><option value="disabled">Daemon disabled</option><option value="absent">No record</option><option value="read-error">Registry read fails</option><option value="starting">Record is starting, even with an old version</option><option value="version">Ready record has an old version</option><option value="ready" selected>Compatible, ready daemon</option><option value="busy">Compatible, busy daemon</option><option value="pong-starting">Pong reports starting</option><option value="pong-version">Pong has an old version</option><option value="unresponsive">Daemon does not respond</option><option value="observe-error">Observation throws</option><option value="observed-starting">Observer reports starting</option><option value="exited">Observer reports exited</option><option value="invalid">Incompatible or corrupt observation</option></select><ol class="guard-track"><li data-guard="0">Enabled</li><li data-guard="1">Record</li><li data-guard="2">Not starting</li><li data-guard="3">Version</li><li data-guard="4">Responsive</li></ol><div class="route-output" aria-live="polite"><div><span>Selected route</span><b id="route-mode">warm</b><p id="route-description">Execute on the compatible daemon. No local executor is created.</p></div><dl id="route-effects"></dl></div><p class="figure-note">Counts describe routing and direct client calls only; work inside the independent startup trigger is omitted. The guard order and output/replay decisions are expanded in D2–D5.</p></div>'''

MAIN = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PR 148 · Four review units</title><link rel="stylesheet" href="style.css"></head><body><a class="skip" href="#overview">Skip to the four cuts</a><header class="masthead"><a href="#top">REFUSAL <span>/ 29</span></a><nav aria-label="Page"><a href="#overview">Four cuts</a><a href="#split-plan">Split order</a><a href="evidence.html">Source ledger</a></nav><span>symnav · PR 148</span></header><main id="top"><section class="opening"><p class="eyebrow">Own daemon mechanisms behind DaemonClient · 153 files · +14,624 / −815 · 45 commits</p><h1>One destination.<br><em>Four review units.</em></h1><div class="opening-copy"><p>I would split this PR. It changes who owns <b>time</b>, who owns <b>process authority</b>, where the <b>implementation and its tests</b> live, and what a <b>host must know</b>.</p><p>The shared goal is a daemon package. Each cut asks a different design question, and the first two already affect the shipped CLI. The new client is staged for a later consumer switch.</p></div><div class="proposal-note"><span>Proposed decomposition</span> These are explanatory review boundaries, not four verified cherry-picks. No branch has been changed.</div></section>
<section class="boundary-overview" aria-labelledby="boundary-title"><div class="figure-title"><h2 id="boundary-title">The boundary at this PR’s head</h2><span>Simplified ownership map · runtime calls are grouped</span></div><div class="head-map"><div class="live-path"><span class="box-label">APPS/CLI · STILL SHIPPED</span><a href="#C1" class="live-dispatch">CLI dispatcher</a><span class="map-arrow">→</span><div class="frozen-box"><b>Local daemon mechanisms</b><div><a href="#unit-1">01 clock</a><a href="#unit-2">02 authority</a><span>38 files frozen after these edits</span></div></div></div><div class="copy-edge"><a href="#unit-3">03 · copy and organize ↓</a><span>Active CLI adoption is outside this PR</span></div><div class="package-path"><span class="box-label">PACKAGES/DAEMON · NEW MECHANISM HOME</span><div class="new-boundary"><a href="#unit-4" class="facade-box"><span>04</span><b>DaemonClient</b><small>execute · control</small></a><span class="map-arrow">→</span><a href="#unit-3" class="owners-box"><b>Private mechanism owners</b><small>routing · process · registry · delivery · workers …</small></a></div><div class="entry-line"><a href="#C2">process-entry / worker-entry</a><span>→ package mechanisms → injected host executor</span></div></div></div><p class="figure-note">The new package also retains its existing contracts and policy. This page follows the four boundaries changed by #148.</p></section>
<section id="overview" class="overview"><div class="section-label"><p class="eyebrow">The complete decision map</p><h2>Take the four cuts. Keep their costs attached.</h2><p>Each line opens the same decision at greater depth. <b>Stated</b> means a reason or explicit preservation requirement was found. <b>Unexplained</b> means the inspected material gives no reason. A rationale for relocation does not establish equivalence of the tests it replaces.</p></div><div class="cut-grid">__CARDS__</div></section>
<div class="depth-divider"><span>Mechanisms and evidence below</span><p>The decision map above is the stopping point. Continue into any cut, or read in order.</p></div>
__SECTIONS__
<section class="split-plan" id="split-plan"><p class="eyebrow">Suggested review sequence</p><h2>Separate the questions; keep the dependencies.</h2><div class="dependency-plan"><div><a href="#unit-1">01 · time</a><a href="#unit-2">02 · authority</a></div><span>→</span><a href="#unit-3">03 · package staging<br><small>tests and enforcement travel with it</small></a><span>→</span><a href="#unit-4">04 · host client<br><small>routing, capture and control together</small></a></div><p class="figure-note">Proposed order, based on the implementation as staged. Clock and authority commits interleave. Moving them to separate branches would require hunk-level editing and fresh validation.</p><div class="split-titles">__TITLES__</div><div class="figure-title"><h3>Where the existing 45 commits land</h3><span>Color follows the proposed unit; sequence stays original.</span></div><div class="commit-ribbon">__COMMITS__</div><p class="figure-note">The final three commits return to package-test concerns: portable hashes and Windows cleanup. This is why chronology alone does not make a clean split.</p><div class="why-four"><h3>Why stop at four?</h3><p>Time and authority can change independently inside the existing CLI. Package staging can then be exercised through built entries without a client. Routing, output ownership and lifecycle control stay together because they form the new host contract. The test moves and removed checks stay attached to staging, where their meaning changes.</p><p>The future readiness/completion lifetime changes remain recorded deferrals inside cut 01. They are not implementations delivered by this PR. The production consumer switch remains outside this subject.</p></div><a class="ledger-link" href="evidence.html">Inspect all 153 changed paths, 37 moved tests and the pinned evidence →</a></section>
<footer><p>Experiment 29 · Read-only explanation. Source inspection, not a correctness verdict.</p><p><a href="README.md">README</a> · <a href="brief.md">Brief</a> · <a href="evidence.html">Evidence</a> · <a href="#top">Back to top ↑</a></p></footer></main><dialog id="source-dialog" aria-labelledby="source-title"><div class="dialog-header"><div><span id="source-side"></span><h2 id="source-title"></h2></div><button id="close-source" aria-label="Close source evidence">Close ×</button></div><p id="source-location"></p><pre id="source-code"></pre><a id="source-full" href="evidence.html">Open the full diff →</a></dialog><script src="data.js"></script><script src="app.js"></script></body></html>'''

commit_units = {c:u for u in UNITS for c in u['commits']}
assert sorted(commit_units) == list(range(1,46))
commits = []
for i, c in enumerate(PR['commits'],1):
    u = commit_units[i]
    commits.append(f'<a class="unit-{u["n"]}" href="#unit-{u["n"]}" title="{i:02} · cut {u["n"]:02} · {esc(c["sha"][:8])} · {esc(c["subject"])}"><span>{i:02}</span><small>{u["letter"]}</small><span class="sr-only">{esc(c["subject"])}</span></a>')
MAIN = MAIN.replace('__CARDS__', ''.join(overview_card(u) for u in UNITS))
MAIN = MAIN.replace('__SECTIONS__', ''.join(section(u,v) for u,v in zip(UNITS,[CLOCK_VISUAL,AUTH_VISUAL,PACKAGE_VISUAL,CLIENT_VISUAL])))
MAIN = MAIN.replace('__TITLES__', ''.join(f'<div><span>{u["n"]:02}</span><p>{esc(u["title"])}</p></div>' for u in UNITS))
MAIN = MAIN.replace('__COMMITS__', ''.join(commits))
(OUT / 'index.html').write_text(MAIN)

file_ids = {p['path']:p['id'] for p in PATCHES}
file_ids.update({p['old']:p['id'] for p in PATCHES})
for item in SOURCES.values():
    item['diffId'] = file_ids.get(item['path'])

def patch_html(p):
    lines = ''.join(f'<span class="{"add" if l.startswith("+") else "del" if l.startswith("-") else "hunk" if l.startswith("@@") else "context"}">{esc(l)}\n</span>' for l in p['patch'].splitlines())
    labels = ' + '.join(f'{u:02}' for u in p['units'])
    action = 'renamed' if p['renamed'] else 'added' if p['added'] else 'deleted' if p['deleted'] else 'modified'
    return f'<details class="file-diff" id="{p["id"]}" data-units="{" ".join(map(str,p["units"]))}"><summary><small>{labels} · {action}</small><span>{esc(p["path"])}</span></summary><div class="diff-body"><p>{esc(p["old"])} → {esc(p["path"])}</p><pre>{lines}</pre><a href="#ledger-top">↑ File index</a></div></details>'

ev = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PR 148 · Source ledger</title><link rel="stylesheet" href="style.css"></head><body class="evidence-page"><header class="masthead"><a href="index.html">← Four review units</a><span>PR 148 · pinned source ledger</span></header><main id="ledger-top"><p class="eyebrow">Evidence layer</p><h1>The seam is in the source.</h1><p>All 153 changed paths from the supplied diff. Unit membership is editorial and can overlap; it is not a patch partition. A file may contain clock, authority and relocation work together.</p><p class="pin">Base {SHA['base']}<br>Head {SHA['head']}</p><p>Measured from the bundle: 37 renamed CLI mechanism tests now live in the package. Measured from the head: 38 compatibility sources reproduce the committed normalized SHA-256 digest. These are inventory checks, not behavior equivalence checks. No symnav test suite was run for this artifact.</p><details class="metadata"><summary>PR body and all 45 commit subjects</summary><pre>{esc(PR['body'])}</pre><ol>{''.join(f'<li><code>{c["sha"][:8]}</code> {esc(c["subject"])}</li>' for c in PR['commits'])}</ol></details><details class="metadata"><summary>All 37 test moves</summary><ul>{''.join(f'<li><a href="#{p["id"]}">{esc(p["old"])} → {esc(p["path"])}</a></li>' for p in MOVED_TESTS)}</ul></details><details class="metadata"><summary>All 38 frozen compatibility sources</summary><ul>{''.join(f'<li>{esc(p)}</li>' for p in frozen)}</ul><p>Digest: <code>{digest.hexdigest()}</code>. Sorted paths and normalized source text, separated by NUL bytes. The expected digest comes from this PR’s head, after the CLI edits.</p></details><label for="unit-filter">Show paths contributing to</label> <select id="unit-filter"><option value="all">All four cuts · 153 paths</option>{''.join(f'<option value="{u["n"]}">{u["n"]:02} · {esc(u["name"])}</option>' for u in UNITS)}</select><p id="file-count" aria-live="polite">153 paths</p><div class="file-ledger">{''.join(patch_html(p) for p in PATCHES)}</div><footer><a href="index.html">← Return to the four cuts</a></footer></main><script>function openHash(){{const el=document.getElementById(location.hash.slice(1));if(el){{el.hidden=false;if(el.tagName==='DETAILS')el.open=true;requestAnimationFrame(()=>el.scrollIntoView());}}}}addEventListener('hashchange',openHash);openHash();document.getElementById('unit-filter').addEventListener('change',e=>{{let count=0;document.querySelectorAll('.file-diff').forEach(el=>{{const show=e.target.value==='all'||el.dataset.units.split(' ').includes(e.target.value);el.hidden=!show;if(show)count++;}});document.getElementById('file-count').textContent=count+' paths';}});</script></body></html>'''
(OUT / 'evidence.html').write_text(ev)
DATA = dict(sources=SOURCES, head=SHA['head'], base=SHA['base'])
(OUT / 'data.js').write_text('window.REVIEW_DATA = ' + json.dumps(DATA, ensure_ascii=False).replace('</', '<\\/') + ';\n')
(OUT / 'analysis.json').write_text(json.dumps(dict(shas=SHA, units=UNITS, decisions=DECISIONS,
    files=[{k:v for k,v in p.items() if k!='patch'} for p in PATCHES], frozen=frozen,
    frozenDigest=digest.hexdigest(), movedTestCount=len(MOVED_TESTS)), ensure_ascii=False, indent=2) + '\n')
print(f'Built index.html, evidence.html, data.js and analysis.json: {len(DECISIONS)} decisions, {len(SOURCES)} source excerpts, {len(PATCHES)} paths.')
