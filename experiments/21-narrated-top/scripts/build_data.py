"""Build the review's source-backed inventory. Reads symnav; writes this experiment only."""
from pathlib import Path
import json, re, subprocess, html

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT.parents[1]
HEAD = PROJECT / "worktrees/stack-head"
BASE = PROJECT / "worktrees/main"
BUNDLE = PROJECT / "inputs/stack"
stack = json.loads((BUNDLE / "pr.json").read_text())
HEAD_SHA, BASE_SHA = stack["head"], stack["base"]

def git(*args):
    return subprocess.check_output(["git", *args], cwd=HEAD, text=True)

labels = {
123: ["Cache in core", "Snapshot replaces cached coverage", "Filesystem facade"],
124: ["Incremental overlay or full preparation", "Validate → commit → publish", "ensureFiles commits one file at a time", "TypeScript owns mutation rollback", "Preserve exact source handles"],
126: ["Core owns graph transactions", "Fresh input observations per rebuild", "Validate every active input", "Canonical snapshot membership", "Publish the complete graph at once"],
127: ["Six separate cache handles", "Cache undefined by presence", "Clear before awaiting release", "New turn only after successful refresh"],
128: ["Request or session retention", "Selection discovers fresh", "Stable backends; fresh router", "Open → validate → prepare", "Repeatable concurrent backend release"],
129: ["CLI owns path resolution", "One canonical path for both consumers", "Canonicalize existing ancestor", "Inject environment and home in tests"],
130: ["Daemon is an internal dependency leaf", "Complete versioned policy snapshot", "Temporary test-only policy overrides", "Enforce surface in compiler + lint + tests", "Propagate policy before migrating consumers"],
131: ["Required policy slices", "100 ms status; 250 ms ordinary response", "Independent resume + reattach budgets", "Test adapters; no production tuning knobs"],
132: ["One frozen command vocabulary", "CLI owns syntax mapping", "commandName travels beside argv", "Duplicates compare command identity", "Protocol generation 4 → 5"],
133: ["One outer failure vocabulary", "Separate worker failure domain", "Pure failure-precedence classifier", "Derive facts with instanceof"],
134: ["Ordered admission guards", "Check duplicates without mutation", "Rejection code determines retry safety", "Dependency-free unknown request field"],
135: ["Inject an absolute executor module URL", "Opaque recursive diagnostics", "Worker sequences and rechunks bytes", "Validate the imported executor", "Synchronous resource sampling callback"],
136: ["One stateless lifecycle renderer", "Render public daemon reports"],
137: ["Transport ports match operations", "Separate control + transfer decoders", "Separate JSON capacity limits", "Map errors at transport boundary", "Codec owns chunk integrity"],
138: ["Daemon owns warm result capture", "Advance offset only after append", "One receiver across reconnects", "Fresh decoder for each connection", "Caller disposes completed output"],
139: ["Pull-driven socket reads", "Connection-owned FIFO writes", "Keep protocol meaning above sockets", "Separate inbound extraction"],
140: ["One client for bounded exchanges", "Acknowledgement stays a narrow port", "Inject timeout by composition purpose", "Validate before marking accepted", "Shared transport-error vocabulary"],
141: ["Dedicated inbound socket server", "Probe through the outbound client", "Each connection has its own chains", "Shared shutdown; force escalates drain"],
142: ["Execution recovery is a state machine", "Fresh capture on reattach", "Separate numeric recovery budgets", "Reuse acknowledgement-only port", "Exhausted fetch stays accepted failure"],
143: ["One required policy in transport facade", "Inject components; compare identity", "Remove the canFrame probe", "Source oracle for composition boundary"],
144: ["Pure activity projector", "Explicit clock + process snapshots", "Show in-progress worker generation", "Report sampled spool bytes", "Keep legacy pong file count"],
145: ["One worker-generation owner", "Resource policy behind recovery port", "Activate ready after warm-up sampling", "Share one replacement operation", "Separate graceful close + force termination"],
146: ["One delivery coordinator", "Ledger + spool retain data ownership", "Wait on latest delivery attachment", "Fence expired trace handles", "Cleanup before logical acknowledgement"],
147: ["Immutable acceptance metadata", "Session coordinates existing owners", "Narrow process-lifecycle port", "Sample before the next FIFO turn", "Duplicates attach; no extra execution"],
148: ["Node-free facade; dynamic Node runtime", "Lazy ordered routing guards", "Stage package; freeze CLI copies", "Client owns capture + controlled output", "Preserve acceptance-based idle timing"],
149: ["Switch CLI through invocation coordinator", "Read-only testing inspector", "Package actors take an executor URL", "Delete transport compatibility facade", "Compiler inventories enforce ownership"],
}

group_for = {}
for name, nums in {
    "state": [123,124,126,127,128], "host": [129,135,136],
    "policy": [130,131,144,145], "identity": [132,133,134],
    "delivery": list(range(137,144))+[146,147], "cutover": [148,149],
}.items():
    for num in nums: group_for[num] = name

pr_data=[]
for p in stack["pullRequests"]:
    n=p["number"]
    decisions=re.findall(r"^- (.+)",p["body"].split("## Decisions\n")[1].split("\n## ")[0],re.M)
    assert len(decisions)==len(labels[n]),n
    ds=[]
    for i,(label,body) in enumerate(zip(labels[n],decisions),1):
        ds.append(dict(id=f"d{n}-{i}", label=label, status="stated", text=body, pr=n))
    pr_data.append(dict(number=n,title=p["title"],body=p["body"],commits=p["commits"],
        base=p["base"],head=p["head"],group=group_for[n], decisions=ds))
    (ROOT / "evidence" / f"pr-{n}.md").write_text(p["body"]+"\n## Commits\n\n"+"\n".join(
        f"- {c['sha']} {c['subject']}"+("\n"+c['body'] if c['body'] else "") for c in p["commits"]))

scenes=[
 dict(id="owners",title="The boxes move. The commands stay.",short="Owners",time=0,group="cutover",lines=[
  "Symnav navigates TypeScript code. Picture a workshop separating its front desk, machinery, and reusable tools. This metaphor is approximate.",
  "Core takes shared state; daemon takes process machinery. The CLI composes; the renderer formats. The stated goal is unchanged behavior."],cue="Commands preserve their behavior; ownership moves."),
 dict(id="host",title="The host supplies the executor.",short="Host seam",time=15,group="host",lines=[
  "The daemon imports no other Symnav package. The CLI resolves the state directory, classifies arguments, and supplies an executor module URL.",
  "A worker loads that module. Arguments go in; ordered bytes, exit codes, and opaque diagnostics come out."],cue="Package dependency and runtime loading are different boundaries."),
 dict(id="state",title="Keep a session. Renew a turn.",short="State",time=30,group="state",lines=[
  "Warm means keeping a core session alive. Core owns transactional indexes, project membership, and six cache lifetimes. TypeScript keeps the algorithms.",
  "Failed refresh preserves the semantic turn. Clear before release; selection still evicts sibling bytes; sequential file preparation keeps earlier progress."],cue="Warm retention means an object stays alive."),
 dict(id="delivery",title="Acceptance changes what recovery means.",short="Recovery",time=45,group="delivery",lines=[
  "Admission checks authentication, readiness, pressure, queue state, then duplicate compatibility. Command and failure vocabularies each have one owner.",
  "After acceptance, recover the same request without replaying execution. Fetch resumes after durable append; reattachment gets fresh capture. Each has its own budget."],cue="A new connection need not mean new work."),
 dict(id="policy",title="One policy. Explicit lifetimes.",short="Policy",time=60,group="policy",lines=[
  "One immutable policy configures daemon processes and workers. Deadlines differ by purpose; some waits have none. There are no user threshold knobs.",
  "Separate owners handle worker generations, FIFO execution, resource sampling, delivery, and activity. Idle timing still begins before readiness and resets on acceptance."],cue="No deadline for accepted completion; 30 minutes for idle lifetime."),
 dict(id="cutover",title="The last move activates the boundary.",short="Cutover",time=75,group="cutover",lines=[
  "Part twenty-five stages the package. The final pull request switches the CLI, removes copies, and enforces ownership. Retention, startup, readiness, endpoint, election, and idle changes remain deferred.",
  "Removed end-to-end scenarios, relaxed test budgets, and a template rewrite also need attention. Reasons are incomplete."],cue="The architecture move includes decisions about evidence and scope."),
]

extras=[
 dict(id="x-template",label="Rewrite the PR template during source-cache extraction",status="unexplained",group="cutover",pr=123,
      text="The delta replaces the change-tree image/fallback guidance, removes Reading order, and adds a Visuals section. Commit 78dd77de2 is titled ‘Update pull request template’; its body is empty. The supplied architecture contract does not request this template rewrite. No reason for coupling it to source-cache extraction was found in the bundle or inspected commits.",commit="78dd77de2",paths=[".github/PULL_REQUEST_TEMPLATE.md"]),
 dict(id="x-budgets",label="Relax test timing: executor 15 s; transfer 20 → 60 s",status="unexplained",group="cutover",pr=135,
      text="Commit 323888b8d adds explicit 15,000 ms limits to two executor tests; 4e0dc1978 increases the twelve-MiB transport test from 20,000 to 60,000 ms. These are test runner budgets, not production timeouts. The subjects say ‘Budget…’ but give no reason for the chosen durations. Assertions remain in these hunks.",commit="323888b8d",paths=["apps/cli/src/daemon-executor.test.ts"]),
 dict(id="x-sync",label="Poll matching startup ownership; status test 15 → 30 s",status="stated",group="cutover",pr=129,
      text="Commit b0a6ce67e says ‘Stabilize daemon startup ownership oracle’. It waits for matching daemon identity and a changed heartbeat revision rather than trusting one read, and raises the enclosing limit from 15 to 30 seconds. A separate fixture change waits for all three request files. The stabilization purpose is recorded; a reason for the exact time budget is not.",commit="b0a6ce67e",paths=[]),
 dict(id="x-budget30",label="Choose a 30 s startup test budget",status="unexplained",group="cutover",pr=129,
      text="The stabilization commit explains the purpose of polling but not why the enclosing status test receives 30 seconds instead of its previous 15. Treat the new duration separately from the stated synchronization change.",commit="b0a6ce67e",paths=[]),
 dict(id="x-tests",label="Remove 7 CLI status + 3 CLI stop scenarios",status="unexplained",group="cutover",pr=149,
      text="Commit 9284116a4 removes seven named status cases and three named stop cases from the CLI e2e files. Package tests cover related mechanisms and three new adversarial-peer cases call DaemonClient. The PR states package-owned testing as the reason for the boundary change. No per-scenario rationale for losing the built-CLI observation boundary was found; related coverage is not proof of equivalent coverage.",commit="9284116a4",paths=["apps/cli/test/e2e/daemon/status.test.ts","apps/cli/test/e2e/daemon/stop.test.ts","packages/daemon/test/integration/adversarial-daemon-peers.test.ts"]),
 dict(id="x-actor",label="Drop a completion-file wait; observe telemetry after caller exit",status="unexplained",group="cutover",pr=149,
      text="Tip commit d07002357 changes the accepted-caller launch to node --import tsx and removes the explicit completion-file wait. The remaining test waits for one telemetry record and checks daemon continuity. Its subject says ‘Track disconnected daemon actor directly’; no body explains why the completion-file observation can be dropped.",commit="d07002357",paths=["apps/cli/test/e2e/daemon/parity.test.ts"]),
 dict(id="x-clock",label="Daemon owns clocks + registry lock identity",status="stated",group="policy",pr=148,
      text="The architecture spec explicitly assigns daemon wall and monotonic clocks and one lock-ownership check to the daemon. PR #148 centralizes startup identity and routes timing through DaemonClock; idle accounting deliberately remains wall-clock and acceptance based.",paths=["packages/daemon/src/lifecycle/daemon-clock.ts","packages/daemon/src/lifecycle/daemon-lifetime.ts","packages/daemon/src/registry/registry.ts"]),
 dict(id="x-codec",label="Final public surface removes policy serialization + test factory",status="stated",group="cutover",pr=149,
      text="The final policy record says serialization is package-internal and test factories are package-local. The four final package export paths are root, process-entry, worker-entry, and testing. PR #130’s policy-testing entry and public codec are historical stages, not final APIs.",commit="d698b1a55",paths=["packages/daemon/package.json","plans/005/daemon-policy.md"]),
 dict(id="x-localpolicy",label="CLI executor constructs its own default policy",status="unexplained",group="policy",pr=135,
      text="The daemon process and worker propagate the complete injected snapshot. Separately, createDaemonExecutor calls createDefaultDependencies with DaemonPolicy.currentSystem(). Its factory options carry stateDirectory, productVersion and sampleResources, not the injected policy. No rationale for this host-side recomputation was found. ‘One snapshot’ in the film refers to daemon transport/process/worker configuration, not every host-side capture object.",paths=["apps/cli/src/daemon-executor.ts","packages/daemon/src/daemon-executor.ts"]),
 dict(id="x-node",label="Node-free declarations; Node still runs the implementation",status="stated",group="host",pr=148,
      text="PR #148 states that the dynamic runtime protects host declarations from Node ambient dependencies. The package still implements processes, worker threads, sockets and filesystem storage with Node. The injected module establishes a runtime host boundary, not a sandbox or a browser runtime.",paths=["packages/daemon/src/client/daemon-client.ts","packages/daemon/src/client/daemon-client-runtime.ts"]),
 dict(id="x-publication",label="Source cache, graph and backend index publish separately",status="unexplained",group="state",pr=124,
      text="TypeScriptBackend.refresh refreshes source bytes first, then the project graph for workspace coverage, then the backend state, then begins a semantic turn. Each extracted transactional owner has its own boundary. Their individual responsibilities are stated; the reason for retaining this cross-owner publication sequence without an aggregate transaction is not explained in the inspected PR decision lists. Transactional indexes do not imply global workspace atomicity.",paths=["packages/backend-typescript/src/typescript-backend/typescript-backend.ts","packages/core/src/backend/revisioned-backend-state.ts","packages/core/src/workspace/project-graph.ts"]),
]

deferred=[
 ["Ledger eviction", "Acknowledged requests still remain in the daemon-lifetime ledger.", "Remove acknowledged entries and expire unacknowledged ones after completion."],
 ["Startup silence bound", "A live silent startup has no silence deadline.", "Add a six-hour silence bound; healthy progress still has no overall deadline."],
 ["Control-plane readiness", "Explicit start still uses a queued readiness execution.", "Report readiness from the control plane without waiting behind navigation."],
 ["Endpoints under state directory", "Endpoint placement remains the existing platform-specific scheme.", "Move endpoint ownership under state-directory identity and removal semantics."],
 ["Selection-aware byte retention", "A selected snapshot drops omitted cached source bytes.", "Retain omitted sibling bytes until the next authoritative workspace refresh."],
 ["Readiness-armed idle", "Idle accounting begins when lifetime is constructed.", "Start the idle interval only after warm-up and ready publication."],
 ["Completion-based idle", "Navigation acceptance resets the idle deadline.", "Reset it at navigation completion instead."],
 ["Socket-bind election evaluation", "File-lease startup election remains.", "Evaluate using endpoint bind ownership; adopt only if existing guarantees hold."],
]

e2e=[
 ["Status: live cross-process startup owner", "New package adversarial-peer test exercises publication through DaemonClient.", "packages/daemon/test/integration/adversarial-daemon-peers.test.ts",12],
 ["Status: initiating caller is killed", "Package startup test covers caller exit; exact SIGKILL + built CLI path was not established as equivalent.","packages/daemon/src/registry/startup-coordinator.test.ts",459],
 ["Status: stale current-schema record", "Controller and registry tests cover stale cleanup; observation level changes.","packages/daemon/src/process/controller.test.ts",252],
 ["Status: stuck live daemon promptly", "Package process/controller tests exercise stuck work; exact original CLI scenario is removed.","packages/daemon/src/process/process-coordinator.test.ts",112],
 ["Status: live daemon stops answering ping", "New adversarial-peer test covers ownership preservation through DaemonClient.","packages/daemon/test/integration/adversarial-daemon-peers.test.ts",31],
 ["Status: malformed authenticated activity", "New adversarial-peer test covers redaction and ownership through DaemonClient.","packages/daemon/test/integration/adversarial-daemon-peers.test.ts",53],
 ["Status: workspace deletion → cold error + exit", "Related process/session deletion behavior exists; the original built-CLI combined assertion is removed.","packages/daemon/src/process/process-coordinator.test.ts",358],
 ["Stop: launched startup process exits", "Controller test uses controlled process termination.","packages/daemon/src/process/controller.test.ts",95],
 ["Stop: in-flight result before rendered success", "Package process test covers result-before-exit ordering; CLI rendering is tested separately.","packages/daemon/src/process/process-coordinator.test.ts",49],
 ["Stop: forced kill before rendered success", "Package process test force-stops a real stuck child; the original built-CLI composition assertion is removed.","packages/daemon/src/process/process-coordinator.test.ts",187],
]

evidence_specs=[
 ("coordinator","apps/cli/src/cli-invocation-coordinator.ts",1,44),
 ("host","apps/cli/src/daemon-executor.ts",41,92),
 ("host-policy","apps/cli/src/daemon-executor.ts",130,154),
 ("session","packages/core/src/workspace/workspace-session.ts",32,91),
 ("cache","packages/core/src/backend/turn-scoped-cache-scope.ts",1,51),
 ("refresh","packages/backend-typescript/src/typescript-backend/typescript-backend.ts",79,93),
 ("transaction","packages/core/src/backend/revisioned-backend-state.ts",59,108),
 ("graph","packages/core/src/workspace/project-graph.ts",99,157),
 ("admission","packages/daemon/src/daemon-admission.ts",85,166),
 ("routing","packages/daemon/src/client/daemon-routing-policy.ts",137,165),
 ("receiver","packages/daemon/src/transport/result-transfer-receiver.ts",64,132),
 ("recovery","packages/daemon/src/transport/execution-client.ts",38,101),
 ("lifetime","packages/daemon/src/lifecycle/daemon-lifetime.ts",1,67),
 ("ledger","packages/daemon/src/execution/accepted-request-ledger.ts",153,175),
 ("facade","packages/daemon/src/client/daemon-client.ts",19,72),
 ("manifest","packages/daemon/package.json",1,49),
 ("inspector","packages/daemon/src/testing/daemon-testing-inspector.ts",1,139),
]
evidence={}
for key,path,start,end in evidence_specs:
    source=(HEAD/path).read_text().splitlines()
    evidence[key]=dict(path=path,start=start,end=min(end,len(source)),text="\n".join(source[start-1:end]),sha=HEAD_SHA)
for x in extras:
    if x.get("commit"):
        sha=git("rev-parse",x["commit"]).strip()
        patch=git("show","--format=medium",sha)
        dest=f"commit-{sha[:9]}.patch"
        (ROOT/"evidence"/dest).write_text(patch)
        x.update(commit=sha,patch=dest)

policy_rows=[]
policy_text=(HEAD/"plans/005/daemon-policy.md").read_text()
for line in policy_text.splitlines():
    if line.startswith("| `"):
        cells=[x.strip().replace("`","") for x in line.strip("|").split("|")]
        if len(cells)==5:policy_rows.append(cells)

data=dict(base=BASE_SHA,head=HEAD_SHA,prs=pr_data,scenes=scenes,extras=extras,deferred=deferred,e2e=e2e,evidence=evidence,policy=policy_rows)
(ROOT/"content.js").write_text("window.REVIEW = "+json.dumps(data,ensure_ascii=False,indent=2)+";\n")
(ROOT/"content.json").write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n")
(ROOT/"narration.txt").write_text("\n\n".join(f"{i*15:02d}–{(i+1)*15:02d} seconds · {s['title']}\n"+" ".join(s["lines"]) for i,s in enumerate(scenes)))
for filename,source in [("architecture.md",HEAD/"plans/005/daemon-architecture-functional-spec.md"),("policy.md",HEAD/"plans/005/daemon-policy.md"),("follow-ups.md",HEAD/"plans/005/daemon-follow-ups-functional-spec.md")]:
    (ROOT/"evidence"/filename).write_text(source.read_text())

def extract_tests(root):
    out={}
    for p in root.rglob("*.test.ts"):
        if "node_modules" in p.parts:continue
        for m in re.finditer(r'\b(?:it|test)\s*\(\s*([\"\'])(.*?)\1',p.read_text(),re.S):
            if len(m[2])<300:out.setdefault(m[2],[]).append(str(p.relative_to(root)))
    return out
b,h=extract_tests(BASE),extract_tests(HEAD)
scan={"method":"Exact literal titles in it()/test() only; excludes parameterized and generated cases. A missing title is a search lead, not proof of removed coverage.","main_unique_titles":len(b),"head_unique_titles":len(h),"unmatched_main_titles":[dict(title=t,paths=b[t]) for t in b if t not in h]}
(ROOT/"evidence"/"test-title-scan.json").write_text(json.dumps(scan,indent=2)+"\n")
print(f"Built {len(pr_data)} PRs, {sum(len(p['decisions']) for p in pr_data)} stated PR decisions, {len(extras)} additional choices, {len(policy_rows)} policy rows.")
