"""Capture a deliberately bounded, source-addressed policy matrix. No worktree writes."""
import hashlib
import json
import re
import subprocess
from pathlib import Path

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[1]
PINS = {"base": "b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e", "head": "b100221db48754656328391b878299c5a0bab443"}
TREES = {k: ROOT / "worktrees" / f"pr-131-{k}" for k in PINS}
for rev, tree in TREES.items():
    assert subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=tree, text=True).strip() == PINS[rev]
    assert not subprocess.check_output(["git", "status", "--porcelain", "--untracked-files=no"], cwd=tree, text=True).strip()

sources, receipts = {}, {}

def source(path, rev="head"):
    key = rev + ":" + path
    if key not in sources:
        content = (TREES[rev] / path).read_text()
        git = subprocess.check_output(["git", "show", f"{PINS[rev]}:{path}"], cwd=TREES[rev])
        assert git == content.encode(), key
        sources[key] = dict(path=path, revision=rev, sha=PINS[rev], sha256=hashlib.sha256(git).hexdigest(), text=content)
    return key

def receipt(key, path, needle, count=22, before=3, rev="head", occurrence=0):
    sid = source(path, rev)
    lines = sources[sid]["text"].splitlines()
    matches = [i for i, line in enumerate(lines) if needle in line]
    assert len(matches) > occurrence, (key, path, needle)
    index = matches[occurrence]
    start = max(1, index + 1 - before)
    end = min(len(lines), start + count - 1)
    receipts[key] = dict(source=sid, start=start, end=end, anchor=index+1, needle=needle)
    return key

CLI = "apps/cli/src/"
D = CLI + "daemon/"
P = "packages/daemon/src/daemon-policy.ts"
receipt("policy", P, "export interface DaemonPolicyValues", 57, 0)
receipt("defaults", P, "singleResponseTimeoutMs: 250", 56, 2)
receipt("validation", P, 'const maximumChunkRawBytes = DaemonPolicyCodec.integer', 17, 0)
receipt("record", "plans/005/daemon-policy.md", "| `transport.singleResponseTimeoutMs`", 46, 2)
receipt("spec", "plans/005/daemon-architecture-functional-spec.md", "Every threshold has one owner", 10, 0)
receipt("capture", CLI+"command-execution-result.ts", "constructor(options: OrderedCommandOutputOptions)", 17, 0)
receipt("capture-loop", CLI+"command-execution-result.ts", "offset += this.maximumRecordBytes", 23, 2)
receipt("capture-base", CLI+"command-execution-result.ts", "const DEFAULT_INLINE_BYTES", 6, 0, "base")
receipt("spool", D+"completion-spool.ts", "constructor(private readonly options: DaemonCompletionSpoolStoreOptions)", 15, 0)
receipt("spool-read", D+"completion-spool.ts", "this.options.storage.records(this.filePath, this.options.maximumChunkBytes)", 15, 5)
receipt("spool-base", D+"completion-spool.ts", "export const COMMAND_OUTPUT_CHUNK_BYTES", 6, 0, "base")
receipt("transport", D+"local-daemon-transport.ts", "constructor(policy: LocalDaemonTransportPolicy", 18, 0)
receipt("transport-type", D+"local-daemon-transport.ts", "interface LocalDaemonTransportOptions", 15, 0)
receipt("transport-base", D+"local-daemon-transport.ts", "constructor(options: LocalDaemonTransportOptions", 13, 0, "base")
receipt("status", CLI+"commands/daemon/register-daemon-command.ts", 'responseTimeoutPurpose: "status-observer"', 17, 11)
receipt("status-base", CLI+"commands/daemon/register-daemon-command.ts", "requestTimeoutMs: 100", 12, 6, "base")
receipt("reattach", D+"local-daemon-transport.ts", "let currentCompletion = completion", 29, 0)
receipt("reattach-base", D+"local-daemon-transport.ts", "private async completeWithOneReattachment", 21, 0, "base")
receipt("resume", D+"local-daemon-transport.ts", "const resume = (): boolean", 27, 0)
receipt("resume-scope", D+"local-daemon-transport.ts", "let resumeCount = 0", 9, 4)
receipt("resume-base", D+"local-daemon-transport.ts", "let resumeStarted = false", 11, 4, "base")
receipt("fetch-failure", D+"local-daemon-transport.ts", 'Daemon result resume ended before completion', 12, 5)
receipt("codec", D+"daemon-result-chunk-codec.ts", "static encode(chunk: DaemonResultChunk", 22, 0)
receipt("codec-decode", D+"daemon-result-chunk-codec.ts", "const maximum = binary", 14, 3)
receipt("worker", D+"daemon-navigation-worker.ts", "this.maximumChunkRawBytes = DaemonPolicy.fromSerialized", 22, 3)
receipt("worker-base", D+"daemon-navigation-worker.ts", "constructor(options: NodeDaemonNavigationWorkerOptions)", 18, 0, "base")
receipt("worker-protocol", D+"daemon-navigation-worker-protocol.ts", 'value.kind === "output-chunk"', 14, 1)
receipt("worker-send", D+"daemon-navigation-worker-entry.ts", "private send(response", 12, 0)
receipt("worker-sample", D+"daemon-navigation-worker-entry.ts", "const heapMonitor = new WorkerHeapHighWater", 8, 0)
receipt("control", D+"daemon-controller.ts", "interface DaemonControllerOptions", 14, 0)
receipt("stop", D+"daemon-controller.ts", "const forceWaitMs = Math.min", 12, 3)
receipt("terminator", D+"daemon-process-launcher.ts", 'constructor(policy: DaemonPolicyValues["shutdown"])', 9, 3)
receipt("registry", D+"daemon-registry.ts", "startupOwnerIsWithinGrace(", 9, 0)
receipt("startup", D+"daemon-startup-coordinator.ts", "const policy = options.policy", 15, 0)
receipt("startup-loop", D+"daemon-startup-coordinator.ts", "let failureCount = 0", 20, 1)
receipt("startup-live", D+"daemon-startup-coordinator.ts", "const daemonProcess = this.launchedProcesses.get(storedRecord.instanceId)", 29, 0)
receipt("startup-base", D+"daemon-startup-coordinator.ts", "this.startupTimeoutMs = options.startupTimeoutMs", 9, 0, "base")
receipt("host-type", D+"workspace-daemon.ts", "export interface WorkspaceDaemonOptions", 23, 0)
receipt("host", D+"workspace-daemon.ts", "const resourcePolicy = policy.values.resources", 46, 12)
receipt("host-base", D+"workspace-daemon.ts", "const resourcePolicy =", 33, 6, "base")
receipt("entry-base", D+"daemon-entry.ts", "memoryCapBytes: policy.values.resources.hardProcessRssBytes", 11, 4, "base")
receipt("host-startup", D+"workspace-daemon.ts", "this.policy.values.startup.heartbeatIntervalMs", 10, 4)
receipt("authorization", D+"workspace-daemon.ts", "this.now() + this.policy.values.startup.coordinationGraceMs", 12, 3)
receipt("authorization-poll", D+"workspace-daemon.ts", "this.policy.values.startup.authorizationPollIntervalMs", 7, 3)
receipt("ack", D+"workspace-daemon.ts", "private async waitForCompletionAcknowledgements", 14, 0)
receipt("trace", D+"workspace-daemon.ts", "this.policy.values.diagnostics.disconnectedTraceRetentionMs", 11, 4)
receipt("trace-floor", D+"workspace-daemon.ts", "const capacity = Math.max(1, this.policy.values.diagnostics.maximumDisconnectedTraces)", 13, 1)
receipt("lifetime", D+"daemon-lifetime.ts", 'policy: Pick<DaemonPolicyValues["shutdown"], "idleTimeoutMs">', 15, 2)
receipt("resources", D+"daemon-resource-monitor.ts", "this.options.policy.supervisionIntervalMs", 11, 4)
receipt("resource-thresholds", D+"daemon-resource-monitor.ts", "const policy = this.options.policy", 34, 0)
receipt("resource-loop", D+"daemon-resource-monitor.ts", "const cutoff = this.now() - this.options.policy.replacementWindowMs", 17, 2)
receipt("resource-base", D+"daemon-resource-monitor.ts", "export class DaemonResourcePolicy", 42, 0, "base")
receipt("logger", D+"daemon-logger.ts", "const policy = options.policy", 10, 2)
receipt("rotation", D+"daemon-logger.ts", "private async rotate()", 18, 0)
receipt("ratchet", "meta-tests/src/daemon-package.test.ts", 'it("retires scattered operational defaults and policy bypasses"', 48, 0)
receipt("test-output", CLI+"cli-program-executor.test.ts", 'it("advances nonempty output at the smallest valid chunk capacity"', 24, 0)
receipt("test-spool", D+"completion-spool.test.ts", 'it("uses the required output-policy capacities"', 30, 0)
receipt("test-resource", D+"daemon-resource-monitor.test.ts", 'it("uses the required resource-policy cadence and thresholds"', 41, 0)
receipt("test-resource-removed", D+"daemon-resource-monitor.test.ts", 'describe("DaemonResourcePolicy"', 72, 0, "base")
receipt("test-policy-existing", "packages/daemon/src/daemon-policy.test.ts", 'describe("DaemonPolicy"', 88, 0)
receipt("test-startup", D+"daemon-startup-coordinator.test.ts", 'it("shares one readiness record without a healthy startup deadline"', 31, 0)
receipt("test-startup-base", D+"daemon-startup-coordinator.test.ts", 'it("shares one readiness record without a healthy startup deadline"', 33, 0, "base")
receipt("test-retry", D+"daemon-startup-coordinator.test.ts", 'it("does not retry a child failure when policy permits zero retries"', 21, 0)
receipt("test-deadline", D+"local-daemon-transport-validation.test.ts", '"uses the status-observer timeout for $kind lifecycle exchanges"', 50, 5)
receipt("test-reattach", D+"local-daemon-transport-execution.test.ts", 'it("gives the reattached execute attempt its own fetch resume"', 49, 0)
H = "apps/cli/test/helpers/"
receipt("adapter-output", H+"workspace-daemon.ts", "const base = options.policy", 65, 0)
receipt("adapter-transport", H+"local-daemon-transport.ts", 'if ("transport" in policyOrOptions)', 40, 0)
receipt("adapter-control", H+"daemon-controller.ts", "const policy =", 14, 0)
receipt("adapter-startup", H+"daemon-startup-coordinator.ts", "const policy =", 14, 0)
receipt("adapter-resource", H+"daemon-resource-policy.ts", "export interface TestDaemonResourcePolicyRecord", 31, 0)
receipt("benchmark", "apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts", "DaemonResourcePolicy.fromSystemMemory", 9, 4)
receipt("benchmark-report", "apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts", "        resourcePolicy,", 12, 6)

rows = [
    dict(id="capture", name="Command capture", sub="OrderedCommandOutput"),
    dict(id="spool", name="Completion storage", sub="Spool store · disk records"),
    dict(id="socket", name="Socket exchanges", sub="LocalDaemonTransport · codec"),
    dict(id="worker", name="Worker boundary", sub="Parent + worker entry"),
    dict(id="control", name="Process control", sub="Registry · startup · controller"),
    dict(id="host", name="Daemon host", sub="Workspace · lifetime · supervisor"),
    dict(id="logs", name="Diagnostic log", sub="DaemonLogger"),
]
slices = [dict(id=x, name=x.title()) for x in ["output", "transport", "delivery", "startup", "shutdown", "resources", "diagnostics"]]

# Every knot is a policy leaf traced at a named family. Families are curated,
# not source-reference counts. Projection records explicitly identify forwarding.
fields = []
def field(slice, leaf, label, value, purpose, family_ids, forward=""):
    fields.append(dict(id=f"{slice}.{leaf}", slice=slice, leaf=leaf, label=label, value=value, purpose=purpose, rows=family_ids.split(), forward=forward.split()))

field("output", "maximumChunkRawBytes", "Chunk ceiling", "64 KiB", "capacity", "capture spool socket worker host", "host")
field("output", "inlineRawBytes", "Inline storage", "256 KiB", "capacity", "capture spool socket host", "socket host")
field("output", "maximumResultRawBytes", "One result", "256 MiB", "capacity", "capture spool socket host", "socket host")
field("output", "maximumAggregateSpoolRawBytes", "All spools", "512 MiB", "capacity", "spool host", "host")
field("transport", "singleResponseTimeoutMs", "Ordinary exchange", "250 ms", "time", "socket")
field("transport", "statusResponseTimeoutMs", "Status observer", "100 ms", "time", "socket")
field("transport", "executionAdmissionTimeoutMs", "Admission only", "5 s", "time", "socket")
field("transport", "maximumJsonPayloadBytes", "JSON frame", "8 MiB", "capacity", "socket")
field("transport", "maximumExecutionControlPayloadBytes", "Transfer control", "256 KiB", "capacity", "socket")
field("delivery", "postAcceptanceExecutionReattachmentLimit", "Reattach execution", "1", "recovery", "socket")
field("delivery", "resultTransferResumeLimitPerExecutionAttempt", "Resume per attempt", "1", "recovery", "socket")
field("startup", "coordinationGraceMs", "Ownership grace", "15 s", "time", "control host")
field("startup", "heartbeatIntervalMs", "Owner heartbeat", "100 ms", "time", "host")
field("startup", "authorizationPollIntervalMs", "Authorization poll", "10 ms", "time", "host")
field("startup", "observationPollIntervalMs", "Readiness poll", "20 ms", "time", "control")
field("startup", "previousInstanceTerminationTimeoutMs", "Replace old instance", "5 min", "time", "control")
field("startup", "childFailureRetryLimit", "Child failure retries", "1", "recovery", "control")
field("shutdown", "idleTimeoutMs", "Idle lifetime", "30 min", "time", "host")
field("shutdown", "stopTimeoutMs", "Stop total", "5 s", "time", "control")
field("shutdown", "forcedTerminationReserveMaximumMs", "Force reserve cap", "500 ms", "time", "control")
field("shutdown", "controllerPollIntervalMs", "Controller poll", "20 ms", "time", "control")
field("shutdown", "processSignalExitTimeoutMs", "Signal exit wait", "500 ms", "time", "control")
field("shutdown", "processExitPollIntervalMs", "Process exit poll", "20 ms", "time", "control")
field("shutdown", "resourceDrainAcknowledgementGraceMs", "Drain ACK grace", "250 ms", "time", "host")
field("shutdown", "resourceDrainAcknowledgementPollIntervalMs", "Drain ACK poll", "5 ms", "time", "host")
field("resources", "hardProcessRssBytes", "Hard RSS", "derived", "memory", "host")
field("resources", "softProcessRssBytes", "Soft RSS", "derived", "memory", "host")
field("resources", "resumeProcessRssBytes", "Resume RSS", "derived", "memory", "host")
field("resources", "workerMaxOldGenerationSizeMiB", "Worker V8 limit", "derived", "memory", "host")
field("resources", "supervisionIntervalMs", "RSS sampling", "250 ms", "time", "host")
field("resources", "replacementWindowMs", "Replacement window", "10 min", "time", "host")
field("resources", "replacementLimit", "Replacement limit", "2", "recovery", "host")
field("resources", "workerHeapSampleIntervalMs", "Worker heap sampling", "25 ms", "time", "worker")
field("diagnostics", "logRotateBytes", "Rotate log", "10 MiB", "capacity", "logs host", "host")
field("diagnostics", "logBackupCount", "Log backups", "4", "capacity", "logs host", "host")
field("diagnostics", "maximumQueuedEvents", "Queued events", "1,024", "capacity", "logs host", "host")
field("diagnostics", "disconnectedTraceRetentionMs", "Trace retention", "5 min", "time", "host")
field("diagnostics", "maximumDisconnectedTraces", "Retained traces", "1,024", "capacity", "host")

cells = []
def cell(row, slice, label, summary, mechanism, refs, notes):
    cells.append(dict(id=f"{row}:{slice}", row=row, slice=slice, label=label, summary=summary, mechanism=mechanism, refs=refs.split(), notes=notes.split()))

cell("capture", "output", "split · store · cap", "Capture reads chunk, inline and per-result limits from the required output slice.", ["Writes split at maximumChunkRawBytes. Adjacent records from one stream may coalesce up to that same ceiling.", "The inline threshold chooses memory versus file storage; maximumResultRawBytes bounds the whole capture. File decoding receives the same chunk ceiling."], "capture capture-loop capture-base test-output", "01 02")
cell("spool", "output", "chunk → aggregate", "A spool has a per-result cap; its store also has an aggregate cap. Chunk validation uses the shared output field.", ["The store projects the required output slice into each spool, including the chunk ceiling.", "Append validates chunk size and result size; the store reserves aggregate bytes. File reads receive the projected chunk ceiling."], "spool spool-read spool-base test-spool", "01 02")
cell("socket", "output", "decode · capture", "The transport reads the chunk ceiling and forwards output policy to received-output storage.", ["Binary frames permit control-header capacity plus one raw chunk. Decoding checks the projected chunk ceiling.", "Received output is stored by OrderedCommandOutput with the transport's required output slice."], "transport codec codec-decode capture", "01 02")
cell("socket", "transport", "100 ≠ 250 · 5 s", "Composition purpose selects 100 ms for status observation or 250 ms for ordinary exchanges; admission has its own 5 s deadline. JSON and transfer-control caps also remain distinct.", ["The constructor selects the deadline using responseTimeoutPurpose, before it sees any request kind.", "The daemon status action composes status-observer. Ordinary execution-status exchanges retain the ordinary deadline. Admission timing does not impose an accepted-completion deadline."], "transport transport-type transport-base status status-base test-deadline", "01 03")
cell("socket", "delivery", "1 / request · 1 / try", "Execution reattachment and per-attempt fetch resumption have separate numeric budgets. The base already gave each execute attempt its own resume allowance.", ["completeWithReattachments counts reattachments outside executeOnce; executeOnce starts a fresh resumeCount.", "A fetch failure goes to fail, not another fetch loop. Raising the resume limit does not add a retry loop around a failed fetch.", "A rejection from a reattached completion now leaves through the next outer catch; base caught it inside the first error's recovery block. See the visible rationale gap."], "reattach reattach-base resume resume-scope resume-base fetch-failure test-reattach", "01 04 05")
cell("worker", "output", "validate both ends", "Parent and worker validators receive the shared chunk ceiling. The parent now parses serialized policy before constructing its Worker.", ["The worker entry validates outgoing chunks with policy.output.maximumChunkRawBytes.", "The parent parses the complete serialized policy to obtain that leaf, then passes it to response validation. Invalid policy can therefore throw before Worker construction."], "worker worker-base worker-send worker-protocol", "01 02 06")
cell("worker", "resources", "heap sample · 25 ms", "The worker's heap high-water sampler takes its 25 ms cadence from resources.", ["The execution method constructs WorkerHeapHighWater with workerHeapSampleIntervalMs.", "The sampler still takes an immediate sample and then uses setInterval. The cadence, rather than the timer algorithm, becomes policy input."], "worker-sample defaults", "01 09")
cell("control", "startup", "grace · poll · retry", "Registry grace, readiness observation, previous-instance termination and child retries use startup policy. Healthy live startup keeps waiting; 15 s is ownership grace.", ["The coordinator takes startup and shutdown slices, and the registry takes startup.", "The child-failure retry loop counts failures without resetting the allowance while waiting for ownership.", "The live child branch keeps waiting. The removed startupTimeoutMs property was assigned in base but never read."], "registry startup startup-loop startup-live startup-base test-retry test-startup test-startup-base", "01 07 12")
cell("control", "shutdown", "stop · reserve · signal", "Stop, signal-exit waits and polling use shutdown policy. Forced termination still reserves min(cap, half the stop window).", ["The controller computes min(forcedTerminationReserveMaximumMs, floor(stopTimeoutMs / 2)).", "The process terminator reads a signal-exit timeout and its own polling interval. Equal 20 ms defaults are separate policy fields."], "control stop terminator record", "01 08")
cell("host", "output", "forward to spool", "WorkspaceDaemon forwards the output slice to its completion store.", ["The host carries a full DaemonPolicy. Its composition selects policy.values.output for the store.", "Light ties mean forwarding here. Chunk/result enforcement happens inside the storage and capture families."], "host host-type spool", "01 02")
cell("host", "startup", "grace · beat · auth", "The host uses startup grace for authorization, 100 ms heartbeats and a distinct 10 ms authorization poll.", ["Startup authorization's deadline and the registry's ownership grace read the same coordinationGraceMs leaf.", "Heartbeat and authorization polling remain separate fields. A shared slice does not combine these clocks."], "host-startup authorization authorization-poll registry", "01 07")
cell("host", "shutdown", "idle · drain ACK", "Idle lifetime and drain acknowledgement read shutdown policy. Drain ACK grace is 250 ms with 5 ms polling; it is unrelated to the transport's 250 ms field.", ["DaemonLifetime receives a required idleTimeoutMs projection.", "The host's drain path waits for acknowledgements until its own deadline, pausing at resourceDrainAcknowledgementPollIntervalMs."], "lifetime ack record", "01 08")
cell("host", "resources", "RSS · V8 · replace", "The host and supervisor consume existing derived resource values; the local resource-policy class is retired. Hard RSS supplies memory reporting, as production already did.", ["WorkspaceDaemon keeps policy.values.resources and passes it to the supervisor; the V8 launch limit comes from workerMaxOldGenerationSizeMiB.", "The supervisor reads separate hard, soft and resume levels, a sampling interval, a replacement window and a replacement limit.", "The central memory derivation is unchanged. effectiveMemoryBytes is a derivation input, not a directly consumed leaf in this drawn family inventory."], "host host-base resources resource-thresholds resource-loop resource-base defaults", "01 09 12")
cell("host", "diagnostics", "traces + log handoff", "Trace expiry/capacity are host decisions; log rotation/queue limits are forwarded to the logger. The inherited trace-capacity floor is still one.", ["Disconnected traces expire using disconnectedTraceRetentionMs. Capacity is Math.max(1, maximumDisconnectedTraces).", "The host passes the diagnostics slice to DaemonLogger. It does not become the logger's storage implementation."], "trace trace-floor host logger", "01 10")
cell("logs", "diagnostics", "rotate · retain · queue", "The logger reads rotation bytes, backup count and queued-event capacity from the required diagnostics slice.", ["The constructor stores the three policy leaves.", "Rotation walks backupCount files; queue capacity and rotation size are distinct controls even though they share a slice."], "logger rotation record", "01 10")

notes = [
    dict(id="01", title="Authority crosses; mechanisms stay.", state="stated", cell="capture:output", text="The snapshot and its validation already exist unchanged in @symnav/daemon. This PR replaces CLI defaults and optional threshold knobs with required slices or explicit projected numbers. Mechanisms remain in apps/cli; clocks, storage and other collaborator seams remain injectable. The spelling-based meta-test bans named retired seams, not every possible bypass.", reason="PR: omitted composition must not recreate local defaults.", refs="policy transport-type host-type ratchet"),
    dict(id="02", title="One chunk ceiling, several jobs.", state="stated", cell="capture:output", text="The same 64 KiB output leaf reaches capture, spool append/read, wire codecs and both worker validators. Inline, one-result and aggregate limits remain separate. A controlled 4-byte head-policy probe records 4 + 4 + 2 bytes from ten output bytes; base's local chunk constant records 10. Five-byte codec/worker messages pass base and exceed that head fixture's ceiling.", reason="Policy record: bound one raw output record. PR: route required output slices.", refs="record capture-loop spool-read codec worker-protocol"),
    dict(id="03", title="The number does not name the purpose.", state="stated", cell="socket:transport", text="Status-observer composition selects 100 ms; ordinary lifecycle and execution-status exchanges use 250 ms; admission uses 5 s without timing accepted completion. The host's 250 ms ACK grace and 250 ms RSS sampling are two other fields. Equal values make no shared thread.", reason="PR: observation and ordinary execution-status have different deadlines.", refs="transport status ack resources test-deadline"),
    dict(id="04", title="Two allowances, two scopes.", state="stated", cell="socket:delivery", text="One default reattachment belongs to accepted execution recovery; one default fetch resume belongs to each execute attempt. Numeric counters expose these scopes; base already renewed fetch allowance on reattachment. The new source test reaches two execute calls and one fetch, not a fetch in each attempt.", reason="PR: each reattached execute attempt needs its own fetch allowance.", refs="reattach resume-scope resume-base test-reattach"),
    dict(id="05", title="A numeric budget is not a fetch loop.", state="unexplained", cell="socket:delivery", text="Fetch failure terminates that attempt; raising the resume limit does not add a loop that retries a failed fetch. The outer loop also changes error provenance: a rejected reattached completion can now expose its later error, where base preserved the original close. A reattachment submission failure still preserves the prior error.", reason="No specific reason found for the fetch ceiling or changed error provenance; the general counter rationale does not explain either.", refs="resume fetch-failure reattach reattach-base"),
    dict(id="06", title="A leaf now requires an earlier parse.", state="unexplained", cell="worker:output", text="To select the chunk leaf, the parent validates the complete serialized policy before constructing a Worker. Base passed that snapshot into the worker without this parent-side parse. This is an earlier failure boundary, beyond removing a local constant.", reason="Required chunk validation is stated; why validate the whole snapshot at this earlier parent boundary is unexplained.", refs="worker worker-base worker-send"),
    dict(id="07", title="Startup grace is not a warmup deadline.", state="stated", cell="control:startup", text="Registry/coordinator/host share ownership grace, while heartbeat, authorization and observation keep separate cadences. Healthy live startup still waits. Child-failure retries become a numeric loop, default one, with zero/two override cases added. The unused startupTimeoutMs property disappears.", reason="Policy record: preserve election recovery grace, distinct cadences and one fresh launch after a failed child.", refs="record registry startup-live startup-loop test-retry startup-base"),
    dict(id="08", title="Shutdown contains several clocks.", state="stated", cell="host:shutdown", text="Idle, user stop, force reserve, direct signal waits and drain ACKs remain separate fields. The force reserve remains min(cap, half the stop timeout); the ACK poll remains 5 ms. Equal 20 ms control/process polls do not share a field.", reason="Policy record: preserve bounded escalation and allow attached clients to acknowledge before cleanup.", refs="record stop terminator lifetime ack"),
    dict(id="09", title="Use the resource snapshot directly.", state="stated", cell="host:resources", text="The CLI resource-policy class and redundant memory-cap option disappear. The host/supervisor read existing RSS, V8, sampling and replacement fields; worker heap sampling becomes a policy input. Production already reported the hard RSS cap. Central derivation is unchanged; its raw effective-memory input is outside the drawn consumer leaves.", reason="PR/spec: one policy owner. Policy record supplies the reasons for resource thresholds.", refs="host host-base entry-base resource-base resources resource-loop defaults"),
    dict(id="10", title="Retaining traces is not rotating logs.", state="stated", cell="host:diagnostics", text="The host retains disconnected traces; the logger rotates files, keeps backups and bounds queued events. They share diagnostics policy, not storage ownership. The inherited trace floor still makes an override of zero act as a capacity of one.", reason="Policy record: bounded disconnected history and bounded diagnostic storage/queue.", refs="record trace trace-floor logger rotation"),
    dict(id="11", title="Test adapters translate, rather than mirror.", state="unexplained", cell="host:output", text="Test-only adapters keep production threshold overloads retired. They normalize coupled output limits, ignore the old workspace memoryCapBytes knob, and give explicit controller/startup policy precedence over numeric knobs. The resource adapter adds replacement window/limit fields to the benchmark's serialized policy record.", reason="PR states why adapters exist. These normalization, precedence, ignored-option and report-shape details have no specific stated reason.", refs="adapter-output adapter-transport adapter-control adapter-startup adapter-resource benchmark benchmark-report"),
    dict(id="12", title="The evidence changes with the inputs.", state="unexplained", cell="host:resources", text="The old CLI resource-derivation table, constrained-memory case and constant assertion are deleted; central derivation tests already existed. New cases exercise policy capacities, cadence, deadlines and retry scopes. Startup tests drop a 5 ms knob that base never read. Some expectations now read policy values, replacing shared constants. This is a changed test premise, not a parity result.", reason="The PR describes preservation intent; the specific test removals and changed premises are unexplained. No Symnav test suite was run for this artifact.", refs="test-resource-removed test-policy-existing test-resource test-startup test-startup-base test-spool test-deadline test-reattach"),
]
for note in notes:
    note["refs"] = note["refs"].split()
    assert all(ref in receipts for ref in note["refs"])
for cell_item in cells:
    assert all(ref in receipts for ref in cell_item["refs"])
    cell_item["fields"] = [f["id"] for f in fields if f["slice"] == cell_item["slice"] and cell_item["row"] in f["rows"]]
    assert cell_item["fields"]
    cell_item["gap"] = any(n["state"] == "unexplained" and n["cell"] == cell_item["id"] for n in notes)

policy_before = (TREES["base"] / P).read_bytes()
assert policy_before == (TREES["head"] / P).read_bytes()
assert (TREES["base"] / "packages/daemon/src/daemon-policy.test.ts").read_bytes() == (TREES["head"] / "packages/daemon/src/daemon-policy.test.ts").read_bytes()
base_coordinator = (TREES["base"] / (D+"daemon-startup-coordinator.ts")).read_text()
assert base_coordinator.count("this.startupTimeoutMs") == 1
patch = (ROOT / "inputs/pr-131/diff.patch").read_text()
numstat = subprocess.check_output(["git", "diff", "--numstat", PINS["base"], PINS["head"]], cwd=TREES["head"], text=True)
file_inventory = [dict(added=int(a), deleted=int(b), path=p) for a,b,p in (line.split("\t") for line in numstat.splitlines())]
assert len(file_inventory)==60 and sum(x["added"] for x in file_inventory)==1298 and sum(x["deleted"] for x in file_inventory)==544
for f in fields:
    assert f['leaf'] in sources['head:'+P]['text']

model = dict(pins=PINS, rows=rows, slices=slices, fields=fields, cells=cells, notes=notes, receipts=receipts, sources=sources,
             pr=json.loads((ROOT/"inputs/pr-131/pr.json").read_text()), inventory=file_inventory)
(OUT/"evidence/model.json").write_text(json.dumps(model, indent=2)+"\n")
(OUT/"evidence/diff.patch").write_text(patch)
(OUT/"evidence/capture-checks.json").write_text(json.dumps(dict(pins=PINS, files=60, added=1298, deleted=544, policyUnchanged=True, policyTestsUnchanged=True, baseStartupTimeoutReads=0, sources=len(sources), receipts=len(receipts), activeCrossings=len(cells), fields=len(fields), trackedWorktreesClean=True), indent=2)+"\n")
print(f"Captured {len(sources)} pinned sources, {len(receipts)} receipts, {len(fields)} traced leaves, {len(cells)} active crossings.")
