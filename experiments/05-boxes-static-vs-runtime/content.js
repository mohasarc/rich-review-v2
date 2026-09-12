/* Editorial decisions. Evidence anchors are resolved against captured source text. */
window.DECISIONS = [
  {
    id: 'contract', group: 'all', title: 'Make composition mandatory', status: 'stated',
    summary: 'Consumers require policy sections instead of optional operational numbers and local defaults. Code stays in the CLI package; the policy package and its defaults already exist. This is an input contract, not proof of value provenance.',
    reason: 'PR decision: omitted composition must not recreate local defaults.', reasonFile: 'PR',
    body: `<div class="comparison"><div><b>BEFORE</b><code>new LocalDaemonTransport()</code><p>A consumer can silently choose its own thresholds.</p></div><span>→</span><div><b>AFTER</b><code>new LocalDaemonTransport(policy.values)</code><p>Transport, delivery and output are required inputs.</p></div></div>
      <div class="mechanism-chain"><span>Public policy types<br><small>@symnav/daemon</small></span><i>← imports</i><span>App composition<br><small>program / command actions / entries</small></span><i>constructs →</i><span>App mechanisms<br><small>required slices</small></span></div>
      <p>The CLI creates a complete snapshot; daemon and worker entries deserialize it. The snapshot bridge predates #131. This PR changes the consumers and their call sites, not the package dependency table or the policy implementation.</p>
      <table><thead><tr><th>Boundary</th><th>Actual shape at this revision</th></tr></thead><tbody><tr><td>High-level constructors</td><td>Require DaemonPolicyValues sections or a complete DaemonPolicy.</td></tr><tr><td>Leaf validation / decoding</td><td>Still takes individual maximum-byte numbers. Callers project those from policy.</td></tr><tr><td>Existing exceptions</td><td>Registry startupOwnerIsWithinGrace(owner, graceMs, now) still accepts a grace override. Transport retains writeChunkSize, a wire-fragment size.</td></tr><tr><td>Port substitutions</td><td>Injected worker, storage, clock, memory sampler and logger remain possible.</td></tr></tbody></table>`,
    refs: [
      ['apps/cli/src/daemon/local-daemon-transport.ts', 'constructor(policy:'],
      ['apps/cli/src/daemon/workspace-daemon.ts', 'export interface WorkspaceDaemonOptions'],
      ['apps/cli/src/daemon/daemon-command-dispatcher.ts', 'private static createRuntime'],
      ['apps/cli/src/daemon/daemon-registry.ts', 'startupOwnerIsWithinGrace('],
      ['AGENTS.md', '## Dependency direction'],
      ['apps/cli/src/program.ts', 'DaemonPolicy.currentSystem'],
    ]
  },
  {
    id: 'output', group: 'output', title: 'Use one set of byte capacities', status: 'stated',
    summary: 'Capture, spool, file decoding, worker validation and socket framing receive policy-backed caps. Chunk, inline, per-result and aggregate limits retain distinct jobs; the default values stay the same.',
    reason: 'PR requires output/resource slices; the policy record gives separate reasons for bounded chunks, small inline results, per-request retention and daemon-wide spool pressure.', reasonFile: 'plans/005/daemon-policy.md',
    body: `<div class="capacity-strip"><div><b>64 KiB</b><small>one raw chunk</small></div><span>≤</span><div><b>256 KiB</b><small>inline raw output</small></div><span>≤</span><div><b>256 MiB</b><small>one result</small></div><span>≤</span><div><b>512 MiB</b><small>all retained completions</small></div></div>
      <div class="mechanism-chain"><span>Worker capture</span><i>→</i><span>Worker send + receive validation</span><i>→</i><span>Daemon spool</span><i>→</i><span>Socket codec + client capture</span></div>
      <p>That chain shares the chunk ceiling. Stored output remembers its ceiling for later file decoding; spool storage also receives it on reads. CliProgramExecutor takes output policy from dependencies and loses its separate output-options argument.</p>
      <table><thead><tr><th>Frame kind</th><th>Ceiling</th><th>Source</th></tr></thead><tbody><tr><td>Ordinary JSON</td><td>8 MiB payload</td><td>transport.maximumJsonPayloadBytes</td></tr><tr><td>Execution control</td><td>256 KiB payload</td><td>transport.maximumExecutionControlPayloadBytes</td></tr><tr><td>Binary transfer frame</td><td>control ceiling + raw chunk ceiling</td><td>Frame decoder combines transport + output inputs.</td></tr></tbody></table>
      <p>Worker-message validation runs on both sides of the thread boundary. The main-thread wrapper now deserializes its supplied configuration to read the chunk cap; the worker uses its own deserialized copy. Message routes and frame format are retained.</p>`,
    refs: [
      ['apps/cli/src/command-execution-result.ts', 'constructor(options: OrderedCommandOutputOptions)'],
      ['apps/cli/src/cli-program-executor.ts', 'new OrderedCommandOutput'],
      ['apps/cli/src/daemon/completion-spool.ts', 'constructor(private readonly options: DaemonCompletionSpoolStoreOptions)'],
      ['apps/cli/src/daemon/daemon-navigation-worker.ts', 'this.maximumChunkRawBytes ='],
      ['apps/cli/src/daemon/daemon-navigation-worker-entry.ts', 'private send('],
      ['apps/cli/src/daemon/daemon-result-chunk-codec.ts', 'const maximum = binary'],
    ]
  },
  {
    id: 'resources', group: 'resources', title: 'Read the derived memory limits', status: 'stated',
    summary: 'The app’s duplicate memory-policy class and reconstruction disappear. RSS thresholds, worker heap limit, sampling cadence and replacement circuit use the supplied resources section; ready/status records report its hard cap.',
    reason: 'PR requires resource slices so consumers cannot fall back to local defaults. The policy record states the memory and replacement recipes and reasons.', reasonFile: 'plans/005/daemon-policy.md',
    body: `<div class="comparison"><div><b>BEFORE</b><code>effectiveMemoryBytes<br>↓<br>DaemonResourcePolicy.fromSystemMemory(...)</code><p>The app recomputes thresholds. WorkspaceDaemon also has a memory-cap fallback.</p></div><span>→</span><div><b>AFTER</b><code>policy.values.resources<br>↓<br>supervisor / worker limits / reports</code><p>The supplied derived thresholds are used directly.</p></div></div>
      <div class="capacity-strip"><div><b>250 ms</b><small>RSS supervision</small></div><div><b>25 ms</b><small>active worker heap sampling</small></div><div><b>2 / 10 min</b><small>replacements; the next drains</small></div></div>
      <p>The memory derivation itself is unchanged: select a positive lower constraint when present; derive hard RSS and worker heap limits with their existing clamps; derive soft/resume levels below hard RSS. The policy retains effectiveMemoryBytes as the derivation input, but these app consumers no longer reconstruct thresholds from it.</p>
      <p>WorkspaceDaemon sends workerMaxOldGenerationSizeMiB to Node’s maxOldGenerationSizeMb option, and uses hardProcessRssBytes in readiness and resource reports. The package retains the unit-specific field name; Node’s option spelling is an API boundary.</p>`,
    refs: [
      ['apps/cli/src/daemon/daemon-entry.ts', 'const policy ='],
      ['apps/cli/src/daemon/daemon-resource-monitor.ts', 'export interface DaemonResourceSupervisorOptions'],
      ['apps/cli/src/daemon/workspace-daemon.ts', 'const resourcePolicy ='],
      ['apps/cli/src/daemon/daemon-navigation-worker-entry.ts', 'const heapMonitor ='],
      ['packages/daemon/src/daemon-policy.ts', 'const effectiveMemoryBytes ='],
    ]
  },
  {
    id: 'clocks', group: 'clocks', title: 'Keep distinct clocks and retention limits', status: 'stated',
    summary: 'Startup, shutdown, idle life, acknowledgement waiting, log rotation/queueing and trace retention take their own policy fields. Equal-looking intervals remain separate. Healthy startup and accepted completion still have no total deadline.',
    reason: 'The policy record explicitly preserves each cadence, reserves time for forced termination, bounds diagnostics, and records intentional deadline absences.', reasonFile: 'plans/005/daemon-policy.md',
    body: `<table><thead><tr><th>Mechanism</th><th>Fields now read from policy</th></tr></thead><tbody>
      <tr><td>Startup coordination</td><td>15 s owner grace; 100 ms heartbeat; 10 ms authorization poll; 20 ms readiness observation; 5 min previous-instance termination.</td></tr>
      <tr><td>Shutdown / idle</td><td>30 min idle; 5 s stop; force reserve min(500 ms, floor(stop window / 2)); 20 ms controller poll.</td></tr>
      <tr><td>Direct process termination</td><td>500 ms exit wait after each of SIGTERM and SIGKILL; independent 20 ms exit polling.</td></tr>
      <tr><td>Drain acknowledgements</td><td>250 ms grace, polled every 5 ms.</td></tr>
      <tr><td>Diagnostic logging</td><td>10 MiB rotation; 4 backups; 1,024 queued events.</td></tr>
      <tr><td>Disconnected operation traces</td><td>5 min retention; 1,024 retained traces by default. The existing minimum-capacity clamp of one remains.</td></tr></tbody></table>
      <div class="absence-strip"><strong>No total deadline</strong><span>healthy startup</span><span>accepted completion</span><span>worker output acknowledgement</span><span>unacknowledged result retention</span></div>
      <p>The record also leaves startup-silence handling without a deadline. Coordination grace measures ownership/recovery, not a healthy warm-up’s total duration. The reserve formula and polling mechanisms stay in the app; the input values come from policy.</p>`,
    refs: [
      ['apps/cli/src/daemon/daemon-startup-coordinator.ts', 'this.coordinationGraceMs ='],
      ['apps/cli/src/daemon/daemon-controller.ts', 'const forceWaitMs ='],
      ['apps/cli/src/daemon/daemon-process-launcher.ts', 'constructor(policy:'],
      ['apps/cli/src/daemon/daemon-lifetime.ts', 'constructor('],
      ['apps/cli/src/daemon/daemon-logger.ts', 'const policy = options.policy'],
      ['apps/cli/src/daemon/workspace-daemon.ts', 'private async waitForCompletionAcknowledgements'],
      ['plans/005/daemon-policy.md', '| healthy startup'],
    ]
  },
  {
    id: 'deadlines', group: 'delivery', title: 'Choose the timeout by caller purpose', status: 'stated',
    summary: 'Socket inactivity timers use 100 ms for status observation and 250 ms for ordinary lifecycle / execution-status. Execute admission uses 5 s, disabled after acceptance. A request named “status” does not automatically get the observer timeout.',
    reason: 'PR decision: status observation and ordinary execution-status requests have distinct deadlines; choose by composition purpose instead of request kind.', reasonFile: 'PR',
    body: `<div class="timeout-map"><div><b>daemon status action</b><code>responseTimeoutPurpose:<br>"status-observer"</code><strong>100 ms idle</strong><small>identify / ping observations</small></div><div><b>ordinary transport</b><code>purpose omitted<br>or "ordinary"</code><strong>250 ms idle</strong><small>lifecycle / execution-status / result ack</small></div><div><b>execute submission</b><code>executionAdmissionTimeoutMs</code><strong>5 s idle → accepted → off</strong><small>No completion deadline after acceptance.</small></div></div>
      <p>The constructor selects requestTimeoutMs once. The status command sets the purpose when composing its transport. ExecutionStatus uses the ordinary value on an ordinary transport; the code does not branch on the word “status” in a request kind. Before #131 the status action achieved its 100 ms choice with a raw numeric override.</p>
      <p>The timers use socket.setTimeout: socket activity resets them, and acceptance disables the admission timer. The numbers describe socket inactivity limits.</p>
      <p>New tests give ordinary and observer timeouts deliberately different values and use delayed socket responses. They distinguish caller purpose from message vocabulary.</p>`,
    refs: [
      ['apps/cli/src/commands/daemon/register-daemon-command.ts', 'responseTimeoutPurpose'],
      ['apps/cli/src/daemon/local-daemon-transport.ts', 'this.requestTimeoutMs ='],
      ['apps/cli/src/daemon/local-daemon-transport.ts', 'socket.setTimeout(0)'],
      ['apps/cli/src/daemon/local-daemon-transport-validation.test.ts', 'uses the status-observer timeout'],
    ]
  },
  {
    id: 'attempts', group: 'delivery', title: 'Put numbers on existing retry scopes', status: 'stated',
    summary: 'Startup child retries and accepted-execute reattachments become numeric loops. Fetch resume has a per-execute counter. Defaults are one each. The two delivery scopes already existed in base; reattachment keeps the same request identity.',
    reason: 'PR decision: every reattached execute attempt needs its own fetch-resume allowance. The policy record preserves one child-failure retry and accepted-request recovery without local replay.', reasonFile: 'PR',
    body: `<div class="scope-diagram"><div class="scope-label">execute() · reattachmentCount · default limit 1</div><div class="scope-attempt"><b>executeOnce #1</b><span>submit same request → accepted</span><div>resumeCount = 0<br><small>manifest + interrupted delivery → result-fetch</small></div></div><span class="scope-arrow">authenticated accepted close<br>→ reattach →</span><div class="scope-attempt"><b>executeOnce #2</b><span>same requestId / instance / token</span><div>fresh resumeCount = 0<br><small>its own manifest-gated fetch allowance</small></div></div></div>
      <p>This is a scope diagram, not a promise that every failure takes the same route. Reattachment requires a typed closed error, accepted delivery and the matching authenticated instance. Fetch resume requires acceptance, a manifest and a nonterminal transfer. The underlying request ledger prevents treating reattachment as a new local execution.</p>
      <p>The PR describes moving away from a shared boolean. In the actual base source, resumeStarted was local to executeOnce and completeWithOneReattachment wrapped it. The nesting already existed; numeric policy inputs replace the fixed allowances.</p>
      <table><thead><tr><th>Counter</th><th>Lifetime</th><th>Default</th></tr></thead><tbody><tr><td>childFailureRetryLimit</td><td>One ensureRunning call; catches child exit / lost warm-up only.</td><td>1 extra launch</td></tr><tr><td>postAcceptanceExecutionReattachmentLimit</td><td>Outer completion loop.</td><td>1 extra execute attempt</td></tr><tr><td>resultTransferResumeLimitPerExecutionAttempt</td><td>Each executeOnce invocation.</td><td>1 fetch initiation allowance</td></tr></tbody></table>
      <p>Added tests exercise zero and two child retries, and an initial accepted close followed by a reattached attempt that resumes its result. That delivery test records two executes and one fetch; it does not exercise a fetch on both attempts.</p>`,
    refs: [
      ['apps/cli/src/daemon/local-daemon-transport.ts', 'private async completeWithReattachments'],
      ['apps/cli/src/daemon/local-daemon-transport.ts', 'const resume ='],
      ['apps/cli/src/daemon/daemon-startup-coordinator.ts', 'let failureCount ='],
      ['apps/cli/src/daemon/daemon-startup-coordinator.test.ts', 'does not retry a child failure'],
      ['apps/cli/src/daemon/local-daemon-transport-execution.test.ts', 'gives the reattached execute attempt'],
    ]
  },
  {
    id: 'failures', group: 'delivery', title: 'Let a later completion failure escape', status: 'unexplained',
    summary: 'The reattachment rewrite changes error selection: a later completion rejection can replace the original accepted-close error. A failure to obtain the reattached receipt still rethrows the prior error. No separate rationale was found.',
    reason: 'No reason for changing error selection appears in the PR body, six commit messages, architecture spec or policy record inspected.',
    body: `<div class="comparison"><div><b>BEFORE</b><code>accepted close E1<br>→ reattach<br>→ completion rejects E2<br>→ throw E1</code></div><span>→</span><div><b>AFTER</b><code>accepted close E1<br>→ reattach<br>→ completion rejects E2<br>→ throw E2*</code></div></div>
      <p>*When E2 is ineligible for another reattachment or the reattachment budget is exhausted. The base method awaits reattached.completion inside a catch that rethrows the original firstError. The head assigns the promise, then awaits it in the next loop iteration; firstError now refers to that iteration’s error.</p>
      <p>If executeOnce itself rejects before returning a receipt, the nested catch still throws the preceding completion error. This is a control-flow comparison of the captured methods, not a recorded end-to-end failure.</p>`,
    refs: [['apps/cli/src/daemon/local-daemon-transport.ts', 'private async completeWithReattachments']]
  },
  {
    id: 'fetches', group: 'delivery', title: 'Leave fetch failure as a terminal path', status: 'unexplained',
    summary: 'The numeric resume check sits on the original execute socket. A failed result-fetch still goes to fail; increasing the field does not introduce a retry loop inside fetchCompletion. No reason for that boundary was found.',
    reason: 'The PR states independent numeric budgets, but does not explain retaining this one-shot fetch-completion failure path.',
    body: `<div class="mechanism-chain"><span>execute socket interruption</span><i>→</i><span>check + increment<br>resumeCount</span><i>→</i><span>fetchCompletion()</span><i>rejects →</i><span>fail()</span></div>
      <p>The guard and increment changed from a boolean to a number. The fetch promise still ends in .catch(fail); fetchCompletion has no recursive fetch or resume-counter loop. The outer reattachment mechanism separately considers eligible accepted-close failures.</p>
      <p>Read the numeric field as a limit checked at this call site. This artifact does not simulate “N guaranteed fetch retries” from its name. The default allowance stays one.</p>`,
    refs: [['apps/cli/src/daemon/local-daemon-transport.ts', 'const resume ='], ['apps/cli/src/daemon/local-daemon-transport.ts', 'private fetchCompletion(']]
  },
  {
    id: 'adapters', group: 'adapters', title: 'Move compatibility knobs into tests', status: 'stated',
    summary: 'Seven new test helpers translate legacy options into policies; a logger adapter is local to its test. Existing tests and benchmarks switch imports. Production constructors lose numeric tuning options while the validated test factory remains the override route.',
    reason: 'PR decision: tests need small thresholds without restoring runtime tuning seams, so use test-only adapters instead of production compatibility overloads.', reasonFile: 'PR',
    body: `<div class="mechanism-chain"><span>Old test syntax<br><small>stopTimeoutMs / outputInlineBytes / …</small></span><i>→</i><span>Test adapter<br><small>maps legacy option names</small></span><i>→</i><span>Policy test factory<br><small>merge + validate complete snapshot</small></span><i>→</i><span>Production constructor<br><small>required section</small></span></div>
      <table><thead><tr><th>Adapter file</th><th>Translation / role</th></tr></thead><tbody><tr><td>daemon-controller</td><td>Stop timeout and controller poll interval.</td></tr><tr><td>daemon-process-terminator</td><td>Signal exit wait and process poll.</td></tr><tr><td>daemon-registry</td><td>Supplies startup policy while preserving platform/rename test arguments.</td></tr><tr><td>daemon-resource-policy</td><td>Maps central resource fields into the old record shape.</td></tr><tr><td>daemon-startup-coordinator</td><td>Termination / observation options and explicit policy.</td></tr><tr><td>local-daemon-transport</td><td>Transport/output option mapping and output-directory preparation.</td></tr><tr><td>workspace-daemon</td><td>Resource, output, lifetime, heartbeat and trace settings.</td></tr></tbody></table>
      <p>The policy-testing subpath and its factory already exist in base. The factory merges sections and passes the whole result through fromSerialized validation. The new helpers are app test code; they do not move the mechanisms into the daemon package.</p>`,
    refs: [
      ['apps/cli/test/helpers/local-daemon-transport.ts', 'export class'],
      ['apps/cli/test/helpers/workspace-daemon.ts', 'export class'],
      ['apps/cli/src/daemon/daemon-logger.test.ts', 'class DaemonLogger'],
      ['packages/daemon/src/policy-testing.ts', 'static withOverrides'],
    ]
  },
  {
    id: 'fixtures', group: 'adapters', title: 'Change test inputs and recorded data', status: 'unexplained',
    summary: 'Tiny-limit normalization removes spilled-file evidence from some single-chunk cleanup tests. Helpers create output directories, accept an unused legacy memory-cap option, and expand benchmark resource records. Spill fixtures change chunk sizes and thresholds. These specific choices are unexplained.',
    reason: 'The adapter strategy is stated; the particular normalizations, directory creation and fixture values have no separately stated reason in the inspected inputs.',
    body: `<div class="comparison"><div><b>TEST HELPER INPUT</b><code>outputInlineBytes: 0<br>one 64 KiB record</code><p>Base output crosses a zero-byte inline threshold and spills.</p></div><span>→</span><div><b>TEST HELPER IN HEAD</b><code>inlineRawBytes: max(64 KiB, 0)<br>one 64 KiB record</code><p>The record fits inline. The helper creates the directory.</p></div></div>
      <p>In “disposes partial client output when daemon delivery fails after its manifest” and the acknowledgement-failure cases, one 64 KiB record equals the helper’s new inline threshold. Their empty-directory assertions remain. They still observe failure/disposal behavior, but do not demonstrate spilled-file removal in these cases.</p>
      <table><thead><tr><th>Changed fixture condition</th><th>What the code now does</th></tr></thead><tbody><tr><td>Transport output directory</td><td>mkdirSync(..., recursive: true) happens in the helper before runtime construction.</td></tr><tr><td>Workspace tiny spool limits</td><td>Derives result cap from aggregate cap when needed; converts zero inline plus a result cap to at least one byte; reduces chunk cap to fit.</td></tr><tr><td>Legacy memoryCapBytes helper option</td><td>The helper accepts and spreads the option but never reads it. The runtime now derives its reported cap from the supplied resources section.</td></tr><tr><td>Benchmark resource record</td><td>The new resource-policy adapter adds replacementWindowMs and replacementLimit to its record. The benchmark harness includes that record in its returned report.</td></tr><tr><td>Ordered-output spill comparison</td><td>Uses inline 32 rather than 1 and constrains chunk size with the policy.</td></tr><tr><td>Spool unsafe-path / corruption cases</td><td>Zero-inline setups become positive inline limits, with extra records to cross into file storage.</td></tr><tr><td>Request worker fixture</td><td>A two-byte output becomes two one-byte chunks.</td></tr></tbody></table>
      <p>The existing validator requires 0 &lt; chunk ≤ inline ≤ result ≤ aggregate. That explains the constraint these fixtures face; it is not an authored reason for these exact adjustments.</p>`,
    refs: [
      ['apps/cli/test/helpers/local-daemon-transport.ts', 'inlineRawBytes: Math.max'],
      ['apps/cli/src/daemon/local-daemon-transport-execution.test.ts', 'disposes partial client output'],
      ['apps/cli/src/command-execution-result.ts', 'this.rawBytes + record.bytes.byteLength > this.inlineBytes'],
      ['apps/cli/test/helpers/workspace-daemon.ts', 'const aggregateBytes ='],
      ['apps/cli/test/helpers/daemon-resource-policy.ts', 'replacementWindowMs: resources.replacementWindowMs'],
      ['apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts', 'const resourcePolicy ='],
      ['apps/cli/src/cli-program-executor.test.ts', 'const spilled ='],
      ['apps/cli/src/daemon/completion-spool.test.ts', 'const blockedStore ='],
      ['apps/cli/src/daemon/workspace-daemon-requests.test.ts', 'this.executionCount === 1'],
    ]
  },
  {
    id: 'tests', group: 'adapters', title: 'Retire the local derivation suite and unused knob', status: 'unexplained',
    summary: 'The app’s memory derivation suite, including its literal 250 ms assertion, is deleted; related package tests already exist. Startup tests lose an unused timeout option. Policy-consumption, tiny-chunk, timeout-purpose and retry tests are added.',
    reason: 'The broad routing change is stated; no separate reason for the exact test deletions or removing the unused startupTimeoutMs field was found.',
    body: `<table><thead><tr><th>Test change</th><th>Evidence retained / added at this revision</th></tr></thead><tbody><tr><td>Deleted app resource-policy describe block</td><td>Five memory cases, constrained-memory assertions and the exported 250 ms constant assertion disappear with DaemonResourcePolicy.</td></tr><tr><td>Already in packages/daemon</td><td>Complete literal defaults; memory selection and threshold tables; snapshot validation. This suite is unchanged in #131, not newly added replacement coverage.</td></tr><tr><td>New direct consumption checks</td><td>Resource cadence/thresholds, spool chunk cap, logger queue cap, transport JSON cap and one-byte output progress.</td></tr><tr><td>New deadline/attempt cases</td><td>Observer identify/ping vs ordinary execution-status; zero/two child retries; reattached attempt followed by fetch.</td></tr><tr><td>Removed startupTimeoutMs inputs</td><td>The base constructor assigned a private field with no reads. Tests still check that healthy startup keeps waiting; the small timeout knob is gone.</td></tr><tr><td>Updated expected values</td><td>Spool, lifetime and diagnostic checks obtain limits from policy instead of retired exported constants.</td></tr></tbody></table>
      <p>The deleted app memory table included a 256 MiB input; the package table includes a 1-byte minimum case, 512 MiB, 1 GiB, 16 GiB and 64 GiB. The policy’s clamp and default assertions are visible in that unchanged suite. This page records where the evidence lives and how it changed; it does not issue a test or correctness verdict.</p>`,
    refs: [
      ['apps/cli/src/daemon/daemon-resource-monitor.test.ts', 'describe("DaemonResourceSupervisor"'],
      ['packages/daemon/src/daemon-policy.test.ts', 'const expectedDefaults'],
      ['apps/cli/src/daemon/daemon-startup-coordinator.ts', 'this.coordinationGraceMs ='],
      ['apps/cli/src/daemon/daemon-startup-coordinator.test.ts', 'shares one readiness record'],
      ['apps/cli/src/cli-program-executor.test.ts', 'smallest valid chunk capacity'],
    ]
  },
  {
    id: 'guards', group: 'adapters', title: 'Enforce retired names with a source scan', status: 'unexplained',
    summary: 'The meta-test expands a production-source blacklist of retired constants, option names and the duplicate policy class. This checks source spellings rather than following values through the system. The enforcement technique is unexplained.',
    reason: 'The PR says the meta-test rejects retired defaults and bypasses; it gives no reason for choosing a substring blacklist as the enforcement mechanism.',
    body: `<div class="mechanism-chain"><span>App production source text</span><i>→</i><span>retiredSeam strings</span><i>→</i><span>expect(sources).not.toContain(...)</span></div>
      <p>The expanded list includes output/resource/log/startup constants, optional numeric option spellings, startupTimeoutMs, DaemonPolicyCodec and DaemonResourcePolicy. Test helpers are outside this production-source scan and can retain the old names.</p>
      <p>The graph’s green edges are based on the changed call sites and imports. The blacklist alone cannot establish those routes, nor does it remove the existing explicit registry grace argument or transport writeChunkSize seam described in decision 01.</p>`,
    refs: [['meta-tests/src/daemon-package.test.ts', 'retires scattered operational defaults']]
  }
];
