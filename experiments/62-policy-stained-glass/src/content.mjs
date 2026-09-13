export const pins = {
  base: 'b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e',
  head: 'b100221db48754656328391b878299c5a0bab443',
};
export const materials = [
  {id:'output', name:'Output', short:'OUT', color:'#dd6c96'},
  {id:'resources', name:'Resources', short:'MEM', color:'#74b784'},
  {id:'transport', name:'Transport', short:'NET', color:'#64b5de'},
  {id:'startup', name:'Startup', short:'UP', color:'#ee9972'},
  {id:'shutdown', name:'Shutdown', short:'DOWN', color:'#71c6b6'},
  {id:'diagnostics', name:'Diagnostics', short:'LOG', color:'#b69bd8'},
  {id:'delivery', name:'Delivery', short:'GET', color:'#e9c370'},
];
const cli='apps/cli/src/';
const daemon=cli+'daemon/';
const policy='packages/daemon/src/daemon-policy.ts';
const plan='plans/005/daemon-policy.md';
const transport=daemon+'local-daemon-transport.ts';
const ref=(side,path,needle,count=20)=>({side,path,needle,count});
const h=(path,needle,count)=>ref('head',path,needle,count);
const b=(path,needle,count)=>ref('base',path,needle,count);
const reason=(needle,count=3)=>h(plan,needle,count);

export const decisions = [
  {
    id:'01', family:'all', material:'all', title:'Make the policy input required', status:'stated',
    summary:'The existing frozen snapshot supplies output, resource, transport, startup, shutdown, delivery and diagnostic limits. CLI mechanisms lose local defaults; they still live in apps/cli. Process and worker snapshot bridges already existed.',
    rationale:'Stated in the PR: omitting composition must not recreate local defaults.',
    mechanism:'The package owns the values. The CLI composes mechanisms with those values. A required constructor input moves threshold authority across that boundary; it does not move the mechanism into the package or create a policy service.',
    before:'Snapshot crosses processes; consumers can still fall back to local numbers.',
    after:'Composition supplies policy values; the changed operational inputs are required.',
    receipts:[h(policy,'export interface DaemonPolicyValues',66),reason('`DaemonPolicy` is one immutable',1),b(transport,'constructor(options: LocalDaemonTransportOptions',10),h(transport,'constructor(policy: LocalDaemonTransportPolicy',18),h(cli+'daemon/daemon-command-dispatcher.ts','const registry = new DaemonRegistry(identity.registryDirectory',20)],
  },
  {
    id:'02', family:'capacity', material:'output', title:'One output slice, several enforcing surfaces', status:'stated',
    summary:'Capture, spool, file decoding, transfer framing and worker validation share output limits. Raw chunks remain distinct from JSON/control-frame caps; limits now travel through storage and codec signatures too.',
    rationale:'Stated in the PR and policy record: required output slices bound records, individual results and aggregate retained output.',
    mechanism:'A raw chunk cap is used at the writer, spool, file reader, binary codec and worker-message validator. A JSON payload cap and an execution-control cap come from transport instead. Sharing the pink material means a common limit, not one common consumer.',
    before:'Capture/spool constants and fixed chunk validation in several modules.',
    after:'output supplies raw capacities; transport separately supplies control capacities.',
    receipts:[h(cli+'command-execution-result.ts','constructor(options: OrderedCommandOutputOptions)',15),h(daemon+'completion-spool.ts','constructor(private readonly options: DaemonCompletionSpoolStoreOptions)',16),h(daemon+'daemon-result-chunk-codec.ts','const maximum = binary',15),h(daemon+'daemon-navigation-worker-protocol.ts','static response(value: unknown',28),h(daemon+'completion-spool.ts','records(path: string, maximumChunkBytes: number): AsyncIterable',3),reason('| `output.maximumChunkRawBytes`',4)],
  },
  {
    id:'03', family:'capacity', material:'resources', title:'Consume memory thresholds once derived', status:'stated',
    summary:'The duplicate CLI resource-policy class and WorkspaceDaemon’s fallback derivation disappear. Resource sampling, replacement limits, worker heap limits and heap sampling consume the snapshot directly.',
    rationale:'Stated in the architecture spec: numeric limits belong to the daemon policy object. The policy record gives each threshold’s purpose.',
    mechanism:'WorkspaceDaemon reads values.resources and gives that section to its supervisor. The worker launch uses workerMaxOldGenerationSizeMiB. The worker samples heap using workerHeapSampleIntervalMs. Removing the fallback prevents this consumer from deriving a second resource policy.',
    before:'WorkspaceDaemon can derive a second resource record from memoryCapBytes.',
    after:'WorkspaceDaemon uses policy.values.resources directly.',
    receipts:[b(daemon+'workspace-daemon.ts','const resourcePolicy =',9),h(daemon+'workspace-daemon.ts','const resourcePolicy =',22),h(daemon+'daemon-resource-monitor.ts','private replace(cause:',15),h(daemon+'daemon-navigation-worker-entry.ts','const heapMonitor = new WorkerHeapHighWater(',5),h('plans/005/daemon-architecture-functional-spec.md','Numeric limits (memory caps',1)],
  },
  {
    id:'04', family:'capacity', material:'resources', title:'One retired option still appears in tests', status:'unexplained', crack:true,
    summary:'Ready records read hardProcessRssBytes directly; the production base already passed that value through memoryCapBytes. The test helper still accepts memoryCapBytes without mapping it into policy. Benchmark resource records gain policy circuit fields.',
    rationale:'Unexplained: no specific reason found for the unused helper option or expanded benchmark record. The production input removal follows the stated centralization intent.',
    mechanism:'The production base entry passes resources.hardProcessRssBytes as memoryCapBytes, while effectiveMemoryBytes feeds its duplicate resource-policy derivation. Head removes both seams and reads the policy directly. This does not change that production ready-record value. TestWorkspaceDaemon still declares memoryCapBytes but never maps it into policy. The benchmark emits its helper’s broader policy record.',
    before:'Production already passes hardProcessRssBytes through the memoryCapBytes option.',
    after:'Ready record reads policy directly; the test helper accepts the old option but ignores it.',
    receipts:[b(daemon+'daemon-entry.ts','memoryCapBytes:',5),b(daemon+'workspace-daemon.ts','memoryCapBytes: this.options.memoryCapBytes',2),h(daemon+'workspace-daemon.ts','memoryCapBytes: this.resourcePolicy.hardProcessRssBytes',2),h('apps/cli/test/helpers/workspace-daemon.ts','interface TestWorkspaceDaemonPolicyOptions',88),h('apps/cli/test/helpers/daemon-resource-policy.ts','static fromSystemMemory(',25),h('apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts','const resourcePolicy = DaemonResourcePolicy.fromSystemMemory',5)],
  },
  {
    id:'05', family:'lifecycle', material:'shutdown', title:'Keep each lifetime’s own purpose', status:'stated',
    summary:'Startup, idle/stop/termination, drain ACK polling, logging and disconnected traces use their own slices. Stop reserve remains min(maximum, floor(stop/2)); trace capacity keeps a minimum of one. Diagnostic retention is separate from result retention.',
    rationale:'Stated in the policy record: preserve separate cadences and bounded diagnostic history; keep a reserve even in small stop windows.',
    mechanism:'The controller computes the effective forced-termination reserve from two shutdown leaves. WorkspaceDaemon retains its trace-capacity floor. These are recorded consumer recipes, so centralization does not mean eliminating every computation from consumers.',
    before:'Local numeric defaults supply lifecycle timers and diagnostic capacity.',
    after:'startup, shutdown and diagnostics supply distinct policy values; recorded recipes stay local.',
    receipts:[h(daemon+'daemon-controller.ts','const forceWaitMs = Math.min(',7),h(daemon+'workspace-daemon.ts','const capacity = Math.max(1',7),h(daemon+'workspace-daemon.ts','const acknowledgementDeadline =',12),h(daemon+'daemon-logger.ts','const policy =',10),reason('| `recipe.forcedTerminationReserve`',1),reason('| `diagnostics.disconnectedTraceRetentionMs`',2)],
  },
  {
    id:'06', family:'purpose', material:'transport', title:'Choose the timeout when composing the caller', status:'stated',
    summary:'daemon status selects status-observer → 100 ms. Ordinary lifecycle and execution-status exchanges use 250 ms. The same request kind can therefore get different waits. Execute admission keeps its separate 5 s bound; acceptance removes that timer.',
    rationale:'Stated in the PR: status observation and ordinary execution-status requests have distinct deadlines.',
    mechanism:'LocalDaemonTransport chooses requestTimeoutMs in its constructor from responseTimeoutPurpose. It does not inspect the later request kind to choose 100 or 250. The main window’s two blue cuts preserve this distinction; the recorded probe sends the same identify request through both compositions.',
    before:'Status composition passes a literal requestTimeoutMs: 100; ordinary defaults to 250.',
    after:'Status composition names its purpose; the snapshot provides the two separate values.',
    receipts:[b(cli+'commands/daemon/register-daemon-command.ts','new LocalDaemonTransport({ requestTimeoutMs: 100 })',4),h(cli+'commands/daemon/register-daemon-command.ts','responseTimeoutPurpose: "status-observer"',5),h(transport,'constructor(policy: LocalDaemonTransportPolicy',15),h(transport,'const publishAcceptance = (): void =>',7),reason('| `transport.singleResponseTimeoutMs`',3)],
  },
  {
    id:'07', family:'purpose', material:'delivery', title:'Equal allowances, different scopes', status:'stated',
    summary:'The default is one accepted-execution reattachment per request and one result-fetch resume per execute attempt. Numeric policy limits replace fixed retry structure and a boolean. The base already kept the fetch allowance inside each attempt.',
    rationale:'Stated in the PR: each reattached execute attempt has its own fetch-resume allowance.',
    mechanism:'reattachmentCount is outside executeOnce. resumeCount is initialized inside executeOnce. Calling executeOnce again therefore creates a fresh fetch allowance. The default scope separation is preserved; reading policy counts is the change. Fetching resumes delivery of accepted work; it is not local command replay.',
    before:'A fixed reattachment and an attempt-local resumeStarted boolean.',
    after:'Independent policy fields gate reattachmentCount and attempt-local resumeCount.',
    receipts:[b(transport,'private async completeWithOneReattachment(',24),b(transport,'let resumeStarted = false',7),h(transport,'private async completeWithReattachments(',34),h(transport,'let resumeCount = 0',7),h(transport,'const resume = (): boolean =>',27),reason('| `delivery.postAcceptanceExecutionReattachmentLimit`',2)],
  },
  {
    id:'08', family:'purpose', material:'delivery', title:'The loop has two less obvious edges', status:'unexplained', crack:true,
    summary:'A failed reattached completion can now expose its later error instead of the first accepted-close error. Also, a failed result-fetch is terminal: setting its numeric limit above one does not build a repeated-fetch loop.',
    rationale:'Unexplained: the PR explains separate counters, but not the changed completion-error selection or this limit’s one-fetch control flow.',
    mechanism:'Base catches a reattached completion failure and rethrows the original error. Head assigns the new completion then awaits it on the next loop iteration, where that failure becomes the current error. In resume(), fetchCompletion rejects into fail(), not back into resume(). These are source observations, not a correctness verdict.',
    before:'Reattached completion failure → original accepted-close error.',
    after:'Reattached completion failure → current completion error. Failed fetch still terminates.',
    receipts:[b(transport,'private async completeWithOneReattachment(',24),h(transport,'let currentCompletion = completion',29),h(transport,'void this.fetchCompletion(endpoint',13),h(transport,'fail(new Error("Daemon result resume ended before completion"))',5)],
  },
  {
    id:'09', family:'all', material:'all', title:'Required inputs still have different shapes', status:'unexplained', crack:true,
    summary:'Some consumers take a whole snapshot, some a section or Pick, and codecs take numbers. Registry grace retains a per-call override; StoredCommandOutput’s chunk argument remains optional. The worker parent re-parses serialized policy for its chunk cap.',
    rationale:'Unexplained: no common projection rule or specific explanation for these remaining seams was found. Current production composition supplies their policy values.',
    mechanism:'A required policy input is a composition contract, not proof that every downstream API accepts only policy. startupOwnerIsWithinGrace still permits a graceMs argument. StoredCommandOutput uses an optional maximumRecordBytes with a non-null assertion for file reading. The parent worker validates a serialized snapshot again to obtain a leaf.',
    before:'Consumer-local defaults and optional numeric settings are common.',
    after:'Required policy at principal consumers; heterogeneous leaf APIs and two optional seams remain.',
    receipts:[h(daemon+'daemon-lifetime.ts','policy: Pick<DaemonPolicyValues',4),h(daemon+'daemon-registry.ts','startupOwnerIsWithinGrace(',8),h(cli+'command-execution-result.ts','class StoredCommandOutput',22),h(daemon+'daemon-navigation-worker.ts','this.maximumChunkRawBytes = DaemonPolicy.fromSerialized(',5),h(daemon+'daemon-result-chunk-codec.ts','constructor(',6)],
  },
  {
    id:'10', family:'bench', material:'all', title:'Keep tuning adapters in tests', status:'stated',
    summary:'Seven new Test* helpers translate legacy numeric options into policy-backed construction. Production compatibility overloads are avoided; output capture tests now inject dependencies carrying policy.',
    rationale:'Stated in the PR: tests need small thresholds without restoring runtime tuning seams.',
    mechanism:'The adapter layer lives under apps/cli/test/helpers. It supplies a policy to the production constructor. Some helpers use the test factory to make overrides; others adapt an old record or overload. This is a test composition boundary, not a new user configuration interface.',
    before:'Tests tune production constructors directly.',
    after:'Tests use adapters or explicit policy; production requires policy inputs.',
    receipts:[h('apps/cli/test/helpers/local-daemon-transport.ts','export class TestLocalDaemonTransport',47),h(cli+'cli-program-executor.test.ts','DaemonPolicyTestFactory.withOverrides',15),h('apps/cli/test/helpers/daemon-controller.ts','export class TestDaemonController',33),reason('Tests may replace individual values',1)],
  },
  {
    id:'11', family:'bench', material:'output', title:'Adapting a number changes some test stimuli', status:'unexplained', crack:true,
    summary:'Policy validation requires positive, ordered output caps. Fixtures change sizes and record splits. The transport adapter raises inline 0 to at least 64 KiB and creates the output directory, so a tiny-output cleanup check can pass without a spill.',
    rationale:'Unexplained: no specific reason found for the weaker spill stimulus or the selected fixture rewrites. Validation explains why the old zero cannot pass unchanged.',
    mechanism:'chunk ≤ inline ≤ result ≤ aggregate is enforced by the existing policy codec. TestLocalDaemonTransport clamps inlineRawBytes to maximumChunkRawBytes. Its mkdirSync runs before output capture. The bounded recording uses 5 bytes with the old inline:0 intent; it observes an on-disk file only on base. This does not claim every spill test disappeared.',
    before:'inline 0 can force a small result to disk.',
    after:'The adapter turns 0 into 65,536 and pre-creates the directory.',
    receipts:[h(policy,'maximumChunkRawBytes === 0',9),h('apps/cli/test/helpers/local-daemon-transport.ts','inlineRawBytes: Math.max(',18),b(cli+'cli-program-executor.test.ts','const spilled',6),h(cli+'cli-program-executor.test.ts','const spilled',6),h('apps/cli/test/helpers/workspace-daemon.ts','const inlineBytes =',12),h(daemon+'workspace-daemon-requests.test.ts','stream: "stdout" as const',8)],
  },
  {
    id:'12', family:'bench', material:'resources', title:'Remove local derivation tests', status:'unexplained', crack:true,
    summary:'The CLI derivation table, constrained-memory test and interval-constant test are deleted with the duplicate class. Existing package tests overlap, but their table substitutes a 1-byte boundary for the deleted 256-MiB input; CLI supervision tests remain.',
    rationale:'Unexplained: no specific reason found for the exact deleted cases or the unmatched 256-MiB row. Policy centralization explains removing the duplicate implementation.',
    mechanism:'The base CLI table tests five memory inputs. The existing package table shares four and uses 1 byte where the CLI table used 256 MiB. Separate package constrained-memory and policy-value assertions exist. That overlap is source evidence, not a claim that tests were moved byte for byte.',
    before:'Derivation cases and supervisor cases share the CLI test file.',
    after:'Derivation class/cases removed; existing package policy cases and CLI supervisor cases remain.',
    receipts:[b(daemon+'daemon-resource-monitor.test.ts','describe("DaemonResourcePolicy"',75),h('packages/daemon/src/daemon-policy.test.ts','[1, 256, 204, 179, 128]',20),h(daemon+'daemon-resource-monitor.test.ts','describe("DaemonResourceSupervisor"',15)],
  },
  {
    id:'13', family:'bench', material:'all', title:'Guard the retired names', status:'stated',
    summary:'The meta-test broadens its production-source denylist to 36 strings. It catches those retired names, not every possible numeric bypass; the exact guard design has no stated rationale.',
    rationale:'Stated intent in the PR: reject retired defaults and bypasses. Unexplained: why this particular name-based guard is sufficient for that intent.',
    mechanism:'The test concatenates non-test TypeScript files in apps/cli/src and asserts that each retiredSeam is absent. Existing policy requirements remain in the list. The seam cracks deliberately stay visible: a passing string denylist would not prove all policy projections are compulsory.',
    before:'A shorter guard checks reconstruction/optional whole-policy seams.',
    after:'Thirty-six strings guard retired policy inputs and local defaults.',
    receipts:[h('meta-tests/src/daemon-package.test.ts','public static appProductionSources()',9),h('meta-tests/src/daemon-package.test.ts','it("retires scattered operational defaults',44)],
  },
  {
    id:'14', family:'lifecycle', material:'startup', title:'Count child failures; keep healthy startup unbounded', status:'stated',
    summary:'A fixed second startup launch becomes a childFailureRetryLimit loop (default one; new tests use zero and two). The unused startupTimeoutMs option disappears. No healthy-startup or post-accept completion deadline is added.',
    rationale:'Stated in the policy record: preserve one fresh launch after child failure; progressing warm-up has no project-size deadline and accepted work is not failed merely for running long.',
    mechanism:'ensureRunning retries only DaemonChildExitError or DaemonWarmupLostError within the policy count. The base stored startupTimeoutMs but did not consult it. Coordination grace still bounds ownership observations; it is not a deadline for a healthy warm-up.',
    before:'One hard-coded second triggerAndWait; an unused startupTimeoutMs property.',
    after:'A policy-counted retry loop; the inert deadline option is removed.',
    receipts:[b(daemon+'daemon-startup-coordinator.ts','this.startupTimeoutMs =',6),h(daemon+'daemon-startup-coordinator.ts','async ensureRunning(',23),h(daemon+'daemon-startup-coordinator.test.ts','it("does not retry a child failure',22),h(daemon+'daemon-startup-coordinator.test.ts','it("allows each child-failure retry',25),reason('| healthy startup |',5)],
  },
];

export const paneItems = [
 {id:'capture',family:'capacity',material:'output',label:['Capture','& spool'],value:'same raw caps',decision:'02'},
 {id:'framing',family:'capacity',material:'transport',label:['Control','framing'],value:'control cap',decision:'02'},
 {id:'worker',family:'capacity',material:'output',label:['Worker','chunks'],value:'chunk cap',decision:'09'},
 {id:'memory',family:'capacity',material:'resources',label:['Resource','supervisor'],value:'derived once',decision:'03'},
 {id:'status',family:'purpose',material:'transport',label:['Status','observer'],value:'100 ms',decision:'06'},
 {id:'ordinary',family:'purpose',material:'transport',label:['Ordinary','exchange'],value:'250 ms',decision:'06'},
 {id:'reattach',family:'purpose',material:'delivery',label:['Reattach','request'],value:'1 / request',decision:'07'},
 {id:'fetch',family:'purpose',material:'delivery',label:['Resume','result fetch'],value:'1 / attempt',decision:'07'},
 {id:'startup',family:'lifecycle',material:'startup',label:['Startup','coordination'],value:'child retry: 1',decision:'14'},
 {id:'shutdown',family:'lifecycle',material:'shutdown',label:['Lifetime','& stopping'],value:'own deadlines',decision:'05'},
 {id:'diagnostics',family:'lifecycle',material:'diagnostics',label:['Logs','& traces'],value:'own retention',decision:'05'},
];
