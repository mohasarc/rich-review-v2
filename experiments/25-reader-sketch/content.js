window.NOTEBOOK = {
  decisions: [
    {
      id: "ownership", title: "The owner moves; the mechanisms stay", status: "stated",
      summary: "Required slices of the existing DaemonPolicy replace optional numbers and local defaults. CLI composition supplies them; CLI modules still execute the mechanisms.",
      why: "Omitted composition must not recreate local defaults. — PR body",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>@symnav/daemon</b>Owns the immutable policy, its seven sections, validation, and serialization. This package already exists in the base.</div><div class='mechanism-cell'><b>apps/cli</b>Composes policy into registry, controller, transport, workspace daemon, output capture, and workers. The classes are still here in this PR.</div></div><p>The full snapshot already crosses process and worker boundaries. #131 replaces the remaining threshold choices inside consumers with required projections of that snapshot. Values are serialized copies across boundaries, not one object shared between processes.</p><p>The architecture spec rules out user flags, environment variables, or configuration for thresholds. This layer adds no such surface.</p>",
      refs: [
        {path:"apps/cli/src/daemon/daemon-command-dispatcher.ts",needle:"private createRuntime",fallback:"const registry = new DaemonRegistry",before:6,after:25},
        {path:"apps/cli/src/daemon/workspace-daemon.ts",needle:"export interface WorkspaceDaemonOptions",after:26},
        {path:"packages/daemon/src/daemon-policy.ts",needle:"export class DaemonPolicy",after:15}
      ]
    },
    {
      id: "resources", title: "One memory derivation feeds the whole daemon", status: "stated",
      summary: "Delete the CLI’s duplicate resource-policy calculator. RSS thresholds, reports, worker heap limits, sampling, and the replacement circuit now use resources directly.",
      why: "One threshold owner; shed before replacement and stop persistent churn. — spec + policy record",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>One derivation</b>System memory → effective bytes → hard / soft / resume RSS and V8 old-generation size, all in DaemonPolicy.</div><div class='mechanism-cell'><b>Many consumers</b>WorkspaceDaemon uses the slice for supervision, worker launch, and reported memoryCapBytes. Worker heap sampling uses its own cadence.</div></div><p>The daemon entry stops reconstructing DaemonResourcePolicy from effective memory. WorkspaceDaemon also drops its memoryCapBytes option and fallback calculator. The supervisor consumes the resources slice directly instead of policy.record.</p><p>Default cadences remain 250 ms for supervision and 25 ms for worker heap sampling. The replacement circuit uses a 10-minute window with two replacements; the next request to replace drains. Memory recipes remain in the existing policy owner.</p>",
      refs:[
        {path:"apps/cli/src/daemon/daemon-entry.ts",needle:"const policy =",after:28},
        {path:"apps/cli/src/daemon/workspace-daemon.ts",needle:"const resourcePolicy =",after:23},
        {path:"apps/cli/src/daemon/daemon-resource-monitor.ts",needle:"private replace",after:22},
        {path:"apps/cli/src/daemon/daemon-navigation-worker-entry.ts",needle:"const heapMonitor =",after:5}
      ]
    },
    {
      id: "output", title: "Carry the capacity through every reader and writer", status: "stated",
      summary: "Capture, disk spools, worker messages, and result codecs use the output slice. JSON and execution-control frame caps come from transport. Chunk ≤ inline ≤ result ≤ aggregate remains the policy constraint.",
      why: "Bound raw records, retained output, and control input centrally. — PR body + policy record",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>output</b>64 KiB chunk → 256 KiB inline → 256 MiB per result → 512 MiB aggregate daemon spool.</div><div class='mechanism-cell'><b>transport</b>8 MiB ordinary JSON payload; 256 KiB execution-control payload. Binary frame allowance combines control and chunk capacities.</div></div><p>OrderedCommandOutput uses the chunk value both when splitting writes and reading disk records. The spool carries it to storage.records. Worker messages are checked with the same value at both ends. The codec takes a required number projected from policy; not every low-level function takes a whole section.</p><p>CliProgramExecutor now takes its output policy from dependencies, including local command capture. Its separate outputOptions constructor argument is removed. Existing policy validation requires a positive chunk capacity and the ordered capacities shown above.</p>",
      refs:[
        {path:"apps/cli/src/command-execution-result.ts",needle:"constructor(options: OrderedCommandOutputOptions)",after:12},
        {path:"apps/cli/src/daemon/completion-spool.ts",needle:"constructor(private readonly options: DaemonCompletionSpoolStoreOptions)",after:14},
        {path:"apps/cli/src/daemon/daemon-result-chunk-codec.ts",needle:"export class DaemonTransferFrameDecoder",after:32},
        {path:"packages/daemon/src/daemon-policy.ts",needle:"maximumChunkRawBytes === 0",before:9,after:9}
      ]
    },
    {
      id: "lifecycle", title: "Keep each lifetime and polling clock distinct", status: "stated",
      summary: "Startup ownership, authorization, heartbeats, idle lifetime, stop escalation, signal waits, and drain acknowledgements receive named values. Existing timer absences remain, including healthy warm-up, accepted work, and result retention.",
      why: "Preserve each existing cadence and lifecycle allowance. — policy record",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>startup</b>15 s coordination grace; 100 ms heartbeat; 10 ms authorization polling; 20 ms observation; 5 min previous-instance termination.</div><div class='mechanism-cell'><b>shutdown</b>30 min idle; 5 s total stop; up to 500 ms force reserve; 20 ms controller/process-exit polling; 500 ms after each signal; 250 ms drain-ack grace, polled every 5 ms.</div></div><p>The stop reserve remains min(policy maximum, floor(stop timeout / 2)). Equal 20 ms values remain separate fields. DaemonLifetime receives the shutdown projection; NodeDaemonProcessTerminator gets the shutdown section. Startup grace is for ownership/recovery, not a maximum duration for healthy warm-up.</p><p>The startup child-failure retry count is a separate decision below. Long accepted completion, worker output acknowledgement, startup silence, and unacknowledged result retention gain no new deadline here; those intentional absences are recorded in the policy document.</p>",
      refs:[
        {path:"apps/cli/src/daemon/daemon-controller.ts",needle:"const forceWaitMs",before:3,after:9},
        {path:"apps/cli/src/daemon/workspace-daemon.ts",needle:"private async waitForCompletionAcknowledgements",after:16},
        {path:"apps/cli/src/daemon/daemon-process-launcher.ts",needle:"export class NodeDaemonProcessTerminator",after:14},
        {path:"plans/005/daemon-policy.md",needle:"## Intentional absences",after:10}
      ]
    },
    {
      id: "diagnostics", title: "Diagnostics get their own bounded slice", status: "stated",
      summary: "Log rotation, backup count, queued writes, and disconnected-trace retention use diagnostics. Trace expiry is independent of result retention.",
      why: "Bound diagnostic storage and retain reconnect evidence. — policy record",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>DaemonLogger</b>10 MiB active file; four backups; at most 1,024 queued events. The backup loop now uses the supplied count.</div><div class='mechanism-cell'><b>WorkspaceDaemon</b>Disconnected traces live for 5 min, at most 1,024 by default. Effective capacity still has a minimum of one.</div></div><p>Local logger defaults and workspace trace options are removed. This is diagnostic evidence about operations; changing these limits does not create a timeout for accepted results.</p>",
      refs:[
        {path:"apps/cli/src/daemon/daemon-logger.ts",needle:"options: DaemonLoggerOptions,",before:5,after:13},
        {path:"apps/cli/src/daemon/daemon-logger.ts",needle:"private async rotate",after:13},
        {path:"apps/cli/src/daemon/workspace-daemon.ts",needle:"private enforceOperationTraceCapacity",after:17}
      ]
    },
    {
      id: "deadlines", title: "Choose the deadline by the caller’s purpose", status: "stated",
      summary: "Status observation selects 100 ms; ordinary lifecycle and execution-status use 250 ms. Admission gets 5 s, and acceptance removes the completion timer. Request names do not select the deadline.",
      why: "Status aggregation and ordinary execution-status have different deadlines. — PR body",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>Status command composition</b>responseTimeoutPurpose: status-observer selects transport.statusResponseTimeoutMs (100 ms).</div><div class='mechanism-cell'><b>Ordinary composition</b>The default purpose selects singleResponseTimeoutMs (250 ms), including execution-status exchanges.</div></div><p>The choice is made once when constructing LocalDaemonTransport. For example, identify or ping can use the status observer deadline when composed for status. The same transport methods used by ordinary composition use the ordinary deadline.</p><p>The execution socket has a 5 s admission timeout; publishAcceptance sets its timeout to zero. The distinct values and the acceptance behavior predate #131. The new seam chooses named policy fields instead of a raw requestTimeoutMs override.</p>",
      refs:[
        {path:"apps/cli/src/commands/daemon/register-daemon-command.ts",needle:'responseTimeoutPurpose: "status-observer"',before:8,after:7},
        {path:"apps/cli/src/daemon/local-daemon-transport.ts",needle:"constructor(policy: LocalDaemonTransportPolicy",after:17},
        {path:"apps/cli/src/daemon/local-daemon-transport.ts",needle:"const publishAcceptance",after:7},
        {path:"apps/cli/src/daemon/local-daemon-transport-validation.test.ts",needle:'it("uses the ordinary timeout',after:22}
      ]
    },
    {
      id: "recovery", title: "Keep the recovery budgets nested", status: "stated",
      summary: "An accepted request gets one reattachment by default; each execute attempt gets its own fetch allowance of one. Nesting already existed; limits become numeric policy controls. Fetch failure leaves its attempt; the sketch covers defaults.",
      why: "Each reattached execute attempt needs its own fetch allowance. — PR body",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>Outside executeOnce</b>reattachmentCount belongs to the accepted request. Recovery requires a closed, accepted connection authenticated to the requested instance.</div><div class='mechanism-cell'><b>Inside executeOnce</b>resumeCount starts at zero for every execute attempt. Fetch needs acceptance plus a manifest and resumes at the next output offset.</div></div><p>The base has resumeStarted inside executeOnce, and completeWithOneReattachment calls executeOnce again. So do not draw the scope separation as newly introduced, even though the PR body contrasts independent counters with a shared boolean.</p><p>Draw the default path, not an arbitrary repeated-fetch loop: the numeric check runs in the original socket’s resume handler. A fetch failure calls fail and leaves that attempt; fetchCompletion contains no retry loop of its own. The new test shows first attempt accepted then closed, reattachment accepted with a manifest, then one result-fetch. It does not exercise two fetches or budgets above one.</p>",
      refs:[
        {side:"base",path:"apps/cli/src/daemon/local-daemon-transport.ts",needle:"private async completeWithOneReattachment",after:20},
        {side:"base",path:"apps/cli/src/daemon/local-daemon-transport.ts",needle:"let resumeStarted",before:5,after:3},
        {path:"apps/cli/src/daemon/local-daemon-transport.ts",needle:"private async completeWithReattachments",after:32},
        {path:"apps/cli/src/daemon/local-daemon-transport.ts",needle:"const resume =",after:29},
        {path:"apps/cli/src/daemon/local-daemon-transport-execution.test.ts",needle:'it("gives the reattached',after:48}
      ]
    },
    {
      id: "startup", title: "Count startup child-failure retries separately", status: "stated",
      summary: "Startup’s fixed second try becomes a policy-bounded loop. Only child exit or lost warm-up spends this budget; the default is one retry. It is separate from delivery recovery.",
      why: "Preserve one fresh launch after a failed child. — policy record",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>Before</b>A catch checks for child-exit / warm-up-lost, then calls triggerAndWait once more.</div><div class='mechanism-cell'><b>After</b>failureCount is compared to childFailureRetryLimit on each eligible failure. Other errors are rethrown.</div></div><p>New cases explicitly supply limits zero and two, expecting one and three total launches respectively. The counter lives outside triggerAndWait, so waiting for startup ownership does not replenish it.</p>",
      refs:[
        {path:"apps/cli/src/daemon/daemon-startup-coordinator.ts",needle:"async ensureRunning",after:23},
        {path:"apps/cli/src/daemon/daemon-startup-coordinator.test.ts",needle:'it("does not retry a child failure',after:24}
      ]
    },
    {
      id: "adapters", title: "The small-threshold seam lives in tests", status: "stated",
      summary: "Seven new test helpers translate old constructor knobs into validated policy values. Tests, helpers, e2e fixtures, and the benchmark switch to those adapters. Production drops the legacy threshold options.",
      why: "Tests need small thresholds without restoring production tuning seams. — PR body",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>Test side</b>Controller, registry, process terminator, resource policy, startup coordinator, local transport, and workspace daemon adapters.</div><div class='mechanism-cell'><b>Production side</b>Receives required slices. Non-policy dependencies such as clocks, storage, process terminators, and workers remain injectable.</div></div><p>The wrappers often retain the previous call shape under an aliased import. Override construction goes through the already-existing DaemonPolicyTestFactory. Registry/resource compatibility helpers use the central policy defaults/derivation directly.</p><p>Because the central snapshot validates related values, adapters adjust several capacities together. The test fixture choices and removed assertions deserve their own inspection below.</p>",
      refs:[
        {path:"apps/cli/test/helpers/daemon-controller.ts",needle:"export class TestDaemonController",after:31},
        {path:"apps/cli/test/helpers/local-daemon-transport.ts",needle:"export class TestLocalDaemonTransport",after:44},
        {path:"apps/cli/test/helpers/workspace-daemon.ts",needle:"const requestedInlineBytes",before:6,after:16}
      ]
    },
    {
      id: "tests-removed", title: "Some old test premises disappear", status: "unexplained",
      summary: "The CLI resource-derivation block and literal cadence assertion are deleted; central policy tests already exist in the base. Startup tests drop timeout overrides, including the 5 ms healthy-warm-up setup.",
      why: "No explicit rationale found for these individual removals in the supplied body, commits, or plans.",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>Removed here</b>A five-row resource derivation table, lower-constrained-memory selection assertions, and a literal 250 ms constant assertion. The local calculator itself is deleted too.</div><div class='mechanism-cell'><b>Already elsewhere</b>The unchanged daemon-policy suite asserts every default, constrained-memory selection, and derivation boundaries. This is existing coverage, not a test move committed in #131.</div></div><p>A new resource test uses 17 ms and tiny distinct RSS thresholds to observe injection. The existing 250 ms sampling behavior test remains.</p><p>The healthy-startup test still holds readiness behind a gate and asserts it remains pending. Its formerly supplied startupTimeoutMs: 5 is removed as the option disappears. In the base implementation that field was assigned but not used to enforce a healthy-startup deadline; this is loss of a test premise, not evidence of a newly introduced timeout. No runtime test suite was executed for this notebook.</p>",
      refs:[
        {side:"base",path:"apps/cli/src/daemon/daemon-resource-monitor.test.ts",needle:'describe("DaemonResourcePolicy"',after:66},
        {path:"packages/daemon/src/daemon-policy.test.ts",needle:'describe("DaemonPolicy"',after:49},
        {side:"base",path:"apps/cli/src/daemon/daemon-startup-coordinator.test.ts",needle:'it("shares one readiness record',after:24},
        {path:"apps/cli/src/daemon/daemon-startup-coordinator.test.ts",needle:'it("shares one readiness record',after:23}
      ]
    },
    {
      id: "tests-values", title: "Test adapters also reshape the inputs", status: "unexplained",
      summary: "Spill thresholds rise; formerly zero-inline cases write extra bytes. Helpers clamp capacities and create test output directories. Some expected limits now come from policy. A one-byte chunk case is added.",
      why: "Validated test policies are stated intent; the exact replacements and clamp choices have no recorded reason.",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>Changed scenarios</b>Capture comparison: inline 1 → 32 bytes. Aggregate spool case: inline 1 → 6. Zero-inline failure cases now retain a small inline prefix and add another record to trigger disk storage.</div><div class='mechanism-cell'><b>Helper transformations</b>TestLocalDaemonTransport clamps inline bytes to at least the default chunk capacity and creates a requested output directory. TestWorkspaceDaemon maps zero inline plus a result cap to max(1, floor(result / 2)).</div></div><p>These transformations are observable test setup choices, even when assertions are retained. Logger backup/rotation expectations and several spool/lifetime limits now read policy values. Their default-value oracle is the existing central policy test. The new minimum-chunk test writes “ab” with a capacity of one and expects both bytes back.</p><p>The policy requires chunk ≤ inline ≤ result ≤ aggregate. That explains why some old combinations cannot be passed unchanged. It does not supply the author’s reason for each replacement number, helper clamp, or directory-creation side effect.</p>",
      refs:[
        {path:"apps/cli/src/cli-program-executor.test.ts",needle:"const inline = await capture",after:37},
        {path:"apps/cli/src/daemon/completion-spool.test.ts",needle:"const blockedSpool =",before:9,after:9},
        {path:"apps/cli/test/helpers/local-daemon-transport.ts",needle:"inlineRawBytes: Math.max",before:6,after:21},
        {path:"apps/cli/test/helpers/workspace-daemon.ts",needle:"const requestedInlineBytes",after:13}
      ]
    },
    {
      id: "error", title: "The reattachment loop changes which error escapes", status: "unexplained",
      summary: "If a reattached receipt is obtained but its completion later rejects, the new loop can report that later error. The old wrapper reported the original error. Receipt-acquisition failure still preserves the prior error.",
      why: "The PR explains numeric budgets, but gives no reason for this error-selection change.",
      detail: "<div class='mechanism-grid'><div class='mechanism-cell'><b>Base catch scope</b>await executeOnce AND await reattached.completion live inside a catch that throws the original firstError.</div><div class='mechanism-cell'><b>Head catch scope</b>Only obtaining the new receipt is inside that catch. Its completion is awaited on the next loop iteration, with a new firstError binding.</div></div><p>This is a reading of the two catch scopes, not a running transport trace or a correctness verdict. With the default one reattachment already spent, a rejection of that later completion exits through its own error. If executeOnce fails before returning the receipt, the inner catch still throws the prior error.</p>",
      refs:[
        {side:"base",path:"apps/cli/src/daemon/local-daemon-transport.ts",needle:"private async completeWithOneReattachment",after:20},
        {path:"apps/cli/src/daemon/local-daemon-transport.ts",needle:"private async completeWithReattachments",after:33}
      ]
    },
    {
      id: "guard", title: "The boundary is policed with retired names", status: "unexplained",
      summary: "A meta-test expands a production-source denylist of old constants, optional knobs, and duplicate policy owners. It rejects matching text; it is not a complete proof that every threshold has one owner.",
      why: "Enforcing ownership is stated in the spec. No reason is given for this particular text-list approach.",
      detail: "<p>The existing meta-test becomes “retires scattered operational defaults and policy bypasses”. It scans app production source and rejects each retired seam string, including old chunk/spool constants, timeout option spellings, and DaemonResourcePolicy.</p><p>The test choice belongs in the sketch as a boundary guard on production code. The list establishes what text is forbidden, not whether an equivalent default could be written another way. Existing dependency and test-only-import rules are context; they are not newly introduced by this diff.</p>",
      refs:[{path:"meta-tests/src/daemon-package.test.ts",needle:'it("retires scattered operational defaults',after:48}]
    }
  ],
  sheets: {
    ownership: {
      title:"Draw the owner, then the consumers.",
      prompt:"Place @symnav/daemon and apps/cli. Draw who supplies numbers to the resource, output, lifecycle, diagnostic, and transport mechanisms. Mark the local choices removed by #131. Put the test-only seam outside production.",
      stamps:["@symnav/daemon","apps/cli","DaemonPolicy","CLI composition","resources","output + framing","startup + shutdown","diagnostics","transport + delivery","test-only adapters","retired local defaults"],
      cue:"Compare the ownership of an arrow, not the position of a box.",
      notes:[
        ["Who gets to choose?","Policy owns the values; composition projects them; consumers apply them. A codec can take a required scalar from a slice.","ownership"],
        ["Which boundary moved?","Local defaults and numeric options disappear from CLI mechanisms. The mechanisms themselves remain in apps/cli.","output"],
        ["Where can tests still vary things?","The adapters supply validated policy values. Changed test inputs and the name-based meta-test remain visible decisions.","tests-values"]
      ]
    },
    runtime: {
      title:"Draw two processes, with a worker inside one.",
      prompt:"Trace the whole snapshot from CLI composition into the daemon process, then into its worker thread. Place the resource supervisor, output spool, logger, and output capture beside the slices they now consume.",
      stamps:["CLI process","daemon process","worker thread","whole snapshot","serialized values","output capture","resource supervisor","completion spool","logger + traces","lifetime","output validation","worker heap sampler"],
      cue:"A policy package is a source-code boundary. A process is a runtime boundary.",
      notes:[
        ["The bridge is already there","Both revisions serialize the complete policy into process and worker configuration. #131 connects the consumers to those values.","ownership"],
        ["Which copy supplies the limit?","Worker output capture and validation use output; worker heap sampling uses resources. The parent checks worker chunks against its configured policy too.","output"],
        ["Do settings move independently?","WorkspaceDaemon uses the same resource slice for worker launch, supervision, and reports. It stops deriving another policy from a memory cap.","resources"]
      ]
    },
    recovery: {
      title:"Draw the scopes before drawing the retries.",
      prompt:"Separate status observation, ordinary exchanges, and admission from accepted completion. Draw an outer accepted-request box and an inner box for each execute attempt. Place each retry budget at the scope that owns it; startup has its own budget.",
      stamps:["status observation · 100 ms","ordinary exchange · 250 ms","admission · 5 s","accepted request · no timer","execute attempt 1","execute attempt 2","fetch allowance · 1","reattachment allowance · 1","startup retry · 1","same request identity","manifest required"],
      cue:"Reattachment reconnects to accepted work. It does not replay the command locally.",
      notes:[
        ["Purpose is a constructor choice","A request named execution-status uses the ordinary 250 ms composition. Status observation explicitly opts into 100 ms.","deadlines"],
        ["Nesting is preserved","The old resume flag was already per executeOnce. Now separate numeric fields control the defaults. The map shows the default path; fetch failure leaves that attempt, not a repeated-fetch loop.","recovery"],
        ["An error boundary also changed","The new reattachment loop can surface a later completion error. The old catch preserved the first one. The supplied material gives no reason.","error"]
      ]
    }
  },
  atlas: {
    resources:{title:"resources → supervisor, worker launch, reports, heap sampler",decision:"resources",description:"Existing derivation, newly consumed directly. Recipes and rationales below are from the policy record."},
    output:{title:"output → capture, spool, codec, worker validation",decision:"output",description:"One raw-capacity vocabulary follows records through memory, disk, and transfer. These are default capacities, not measured usage."},
    transport:{title:"transport → LocalDaemonTransport",decision:"deadlines",description:"Composition selects the one-response purpose. Admission and the two frame capacities have separate fields."},
    startup:{title:"startup → registry, coordinator, process authorization",decision:"lifecycle",description:"Coordination grace is distinct from healthy warm-up. Startup retries have their own counter."},
    shutdown:{title:"shutdown → lifetime, controller, terminator, drain",decision:"lifecycle",description:"Equal numbers stay independently named; the stop-reserve recipe remains derived from the supplied values."},
    diagnostics:{title:"diagnostics → logger and disconnected operation traces",decision:"diagnostics",description:"Diagnostic retention is separate from result retention."},
    delivery:{title:"delivery → nested execution recovery",decision:"recovery",description:"The table records policy intent. The diagram and source show the default recovery path and the scopes of its counters."}
  }
};
