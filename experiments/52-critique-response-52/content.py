"""Author-curated propositions. One text is rendered into both complete layers."""
GROUPS = [
    ('authority', 'Who gets to choose the numbers?'),
    ('recovery', 'Which wait or recovery operation is bounded?'),
    ('consumers', 'Where do the values take effect?'),
    ('fixtures', 'What do the translated tests actually exercise?'),
    ('observations', 'What evidence changes with the migration?'),
]
DECISIONS = []
def add(n, group, title, choice, status, reason, before, after, sources, reason_source=None):
    DECISIONS.append(dict(id=f'd{n:02}', group=group, title=title, choice=choice,
        status=status, reason=reason, before=before, after=after, sources=sources,
        reason_source=reason_source))

# Source specifications are (side, path, first line, last line). Exact bounds are
# checked against frozen source when building. These are authored evidence joins.
CLI='apps/cli/src/'
D=CLI+'daemon/'
H='apps/cli/test/helpers/'
POL=('head','plans/005/daemon-policy.md',1,66)
PR=('bundle','pr-body.md',1,100)
SPEC=('head','plans/005/daemon-architecture-functional-spec.md',66,80)

add(1,'authority','Required inputs replace local fallback authority',
    'The policy snapshot already existed. CLI composition now supplies required sections to its daemon mechanisms; those mechanisms still live in apps/cli. The client process, daemon process and worker thread remain separate. There is no new user tuning surface.',
    'stated','The PR chooses required slices so omitted composition cannot recreate local defaults; the plan excludes user tuning.',
    'The complete snapshot crossed process and worker boundaries, but consumers still kept constants and optional numeric overrides.',
    'Composition projects the snapshot into required inputs. This PR changes value authority, not the package location of mechanisms or runtime topology.',
    [('head',D+'daemon-entry.ts',25,51),('head',D+'daemon-command-dispatcher.ts',268,303),('head',CLI+'commands/daemon/register-daemon-command.ts',57,154)],PR)

add(2,'authority','Use the snapshot’s resource values once',
    'The CLI resource-policy derivation and WorkspaceDaemon’s memory-cap reconstruction disappear. The snapshot supplies RSS thresholds, the worker heap limit and the published memory cap; a separately supplied memoryCapBytes no longer chooses production behavior.',
    'stated','The policy plan assigns derivation and resource limits to one snapshot; the PR removes consumer bypasses.',
    'DaemonResourcePolicy derived another resource record; WorkspaceDaemon could reconstruct it from memoryCapBytes or accept resourcePolicy.',
    'WorkspaceDaemon reads policy.values.resources, passes workerMaxOldGenerationSizeMiB into Worker resourceLimits and publishes hardProcessRssBytes.',
    [('base',D+'daemon-resource-monitor.ts',1,61),('head',D+'workspace-daemon.ts',110,178),('head',D+'workspace-daemon.ts',216,231)],POL)

add(3,'authority','Required policy does not mean every input is a slice',
    'Chunk codecs and worker-message validation receive required numeric caps projected from policy. Registry grace still accepts an explicit numeric override; transport write chunk size and output directory, injected clocks/storage/workers, and worker resourceLimits remain separate seams.',
    'unexplained','No separate rationale was located for the exact boundary between retained seams and retired threshold options.',
    'Numeric and optional inputs covered both operational thresholds and injected mechanisms.',
    'Production composition supplies the new cap arguments. Selected low-level numeric and injected inputs remain, so a source-name ban is narrower than a ban on every possible bypass.',
    [('head',D+'daemon-result-chunk-codec.ts',16,40),('head',D+'daemon-registry.ts',379,398),('head',D+'local-daemon-transport.ts',24,40),('head',D+'daemon-navigation-worker.ts',38,57)])

add(4,'recovery','Select the response deadline by caller purpose',
    'Status observation uses 100 ms; ordinary lifecycle and execution-status calls use 250 ms. The same lifecycle request kind can use either deadline because composition selects the purpose. Execute admission has its own 5 s timer, which stops at acceptance; accepted completion has no deadline.',
    'stated','The PR separates status aggregation from routing deadlines; the policy record bounds admission without timing accepted work.',
    'The status action passed a numeric 100 ms override to a transport whose ordinary default was 250 ms; admission defaulted to 5 s.',
    'responseTimeoutPurpose selects the status or ordinary policy leaf. The acceptance path disables the admission socket timer.',
    [('head',D+'local-daemon-transport.ts',288,313),('head',D+'local-daemon-transport.ts',523,541),('head',CLI+'commands/daemon/register-daemon-command.ts',99,121)],PR)

add(5,'recovery','Keep two recovery scopes, with numeric budgets',
    'Authenticated connection closure after acceptance may reattach the same execution, without local replay. Each execute attempt has a separate result-fetch resume allowance once a manifest exists. Both defaults remain one; head replaces fixed control flow and a boolean with policy counters. A new attempt starts a fresh fetch counter.',
    'stated','The PR says each reattached execute attempt needs its own fetch allowance, independent of the outer reattachment count.',
    'One outer reattachment was written into control flow; executeOnce had its own resumeStarted boolean. Default nested recovery already existed.',
    'An outer reattachmentCount consumes postAcceptanceExecutionReattachmentLimit. Each executeOnce creates resumeCount for resultTransferResumeLimitPerExecutionAttempt.',
    [('base',D+'local-daemon-transport.ts',391,422),('head',D+'local-daemon-transport.ts',395,495)],PR)

add(6,'recovery','A numeric fetch allowance is not a fetch retry loop',
    'A failed result-fetch settles that execute attempt through fail; it does not repeatedly fetch merely because the numeric limit is above one. A qualifying accepted-close error can still reach the separate outer reattachment path. This retained terminal path qualifies the new counter’s name.',
    'unexplained','No separate explanation was located for exposing a numeric resume allowance while retaining this terminal failed-fetch path.',
    'A fetch failure already called fail and ended its execute attempt.',
    'The counter guard changes, but fetchCompletion(...).catch(fail) remains. A clean premature fetch end becomes an error; socket-close classification can permit outer recovery.',
    [('head',D+'local-daemon-transport.ts',461,495),('head',D+'local-daemon-transport.ts',650,681),('head',D+'local-daemon-transport.ts',735,744)])

add(7,'recovery','Later completion errors can replace the first error',
    'Base rethrew the original accepted-close error if reattachment or its completion failed. Head retains the preceding error when opening the next attachment fails, but after that attachment is accepted, its completion error becomes the current error and can be the one delivered to the caller.',
    'unexplained','The numeric-budget change is explained; this change in error provenance has no separately located rationale.',
    'Both reattachment receipt acquisition and completion ran inside a catch that rethrew the original firstError.',
    'Only receipt acquisition remains inside that catch. The next completion is awaited on the next loop iteration, changing which error the caller can observe.',
    [('base',D+'local-daemon-transport.ts',399,420),('head',D+'local-daemon-transport.ts',402,427)])

add(8,'recovery','Count startup retries across ownership waits',
    'Startup child exit or lost warm-up can consume a numeric child-failure budget: zero allows one launch, two allow up to three attempts. The default remains one retry, and waiting for startup ownership does not reset it. Other error classes remain outside this retry path.',
    'stated','The policy record preserves one fresh launch after a failed child; the PR routes attempts through policy.',
    'ensureRunning tried triggerAndWait once more for the two retryable error classes.',
    'A failureCount outside the loop compares against childFailureRetryLimit, increments only for retryable failures, and survives internal ownership waiting.',
    [('head',D+'daemon-startup-coordinator.ts',73,95),('head',D+'daemon-startup-coordinator.test.ts',497,550)],POL)

add(9,'consumers','Apply output limits throughout the byte path',
    'Capture, stored-file decoding, completion spooling, worker send/receive and transfer framing now share projected policy caps. Defaults remain 64 KiB per raw chunk, 256 KiB inline, 256 MiB per result and 512 MiB aggregate spool. The cap follows disk reads too; the wire encoding is retained.',
    'stated','The PR routes output capacities end to end; the policy record bounds each record, result and retained aggregate separately.',
    'Capture, spool and worker/codec validation imported or owned fixed constants; storage.records and decodeFileRecords needed no caller cap.',
    'Callers pass maximumChunkRawBytes into disk decode, worker validation and binary encode/decode. Capture splitting and coalescing use the same cap.',
    [('head',CLI+'command-execution-result.ts',146,162),('head',CLI+'command-execution-result.ts',224,245),('head',CLI+'command-execution-result.ts',323,348),('head',D+'completion-spool.ts',29,47),('head',D+'daemon-result-chunk-codec.ts',130,165)],POL)

add(10,'consumers','Validate the worker policy before spawning',
    'The daemon-side worker constructor now parses the serialized policy to get its chunk cap before it constructs Worker. Malformed policy can therefore throw synchronously in the parent, before a worker exists; worker-side parsing was already present.',
    'unexplained','The shared chunk cap has a stated purpose; no separate rationale was located for moving this failure before worker construction.',
    'The parent imported only the DaemonPolicy type and constructed Worker before worker-side configuration parsing.',
    'DaemonPolicy.fromSerialized runs synchronously ahead of new Worker; later receive validation uses the extracted maximumChunkRawBytes.',
    [('base',D+'daemon-navigation-worker.ts',70,102),('head',D+'daemon-navigation-worker.ts',73,101),('head',D+'daemon-navigation-worker-entry.ts',20,53)])

add(11,'consumers','Keep JSON and execution-control capacities distinct',
    'Ordinary JSON frames use the policy’s 8 MiB cap; execution-transfer control uses 256 KiB. A binary frame’s envelope allows the control cap plus one raw chunk cap. These are separate inputs, even where a consumer formerly imported one shared constant.',
    'stated','The policy record separately bounds ordinary decoded control input and binary-transfer control.',
    'The transport owned a default JSON maximum and imported an execution-control constant; the decoder imported the chunk constant.',
    'Transport projects two policy leaves and supplies the raw chunk cap to the decoder. Binary and ordinary frame limits still use different formulas.',
    [('head',D+'local-daemon-transport.ts',288,312),('head',D+'daemon-result-chunk-codec.ts',130,167)],POL)

add(12,'consumers','Keep resource sampling and replacement limits separate',
    'Policy now drives process supervision every 250 ms, active-worker heap sampling every 25 ms, and the replacement circuit: two replacements within ten minutes, then drain. Existing soft/hard/resume hysteresis still uses the derived RSS thresholds; disk spool bytes are reported separately from process RSS.',
    'stated','The record assigns distinct reasons to sustained-pressure sampling, short heap peaks, hysteresis and stopping replacement churn.',
    'Local constants and an optional interval chose supervision cadence and the replacement circuit; WorkerHeapHighWater sampled every hard-coded 25 ms.',
    'Resource supervisor reads the resources slice, while worker entry passes workerHeapSampleIntervalMs. Existing pressure state transitions consume those values.',
    [('head',D+'daemon-resource-monitor.ts',76,134),('head',D+'daemon-resource-monitor.ts',155,181),('head',D+'daemon-navigation-worker-entry.ts',117,130),('head',D+'daemon-navigation-worker-entry.ts',240,262)],POL)

add(13,'consumers','Keep startup coordination separate from warm-up duration',
    'Policy routes the 15 s ownership/authorization grace, 100 ms heartbeat, 10 ms authorization polling, 20 ms readiness observation and five-minute previous-instance termination wait. None creates a healthy-startup deadline or a startup-silence deadline.',
    'stated','The record preserves election recovery and distinct polling purposes; progressing warm-up has no project-size deadline and silence handling is deferred.',
    'Registry/startup code used constants or local numeric options for these roles, alongside an unused startupTimeoutMs field.',
    'Required startup/shutdown sections configure registry, coordinator and daemon entry. The healthy-startup and silence absences remain intentional.',
    [('head',D+'daemon-startup-coordinator.ts',55,78),('head',D+'daemon-registry.ts',384,397),('head',D+'workspace-daemon.ts',181,197),('head',D+'workspace-daemon.ts',248,280),('head',D+'workspace-daemon.ts',995,1008)],POL)

add(14,'consumers','Keep idle, stop, signal and acknowledgement clocks distinct',
    'Policy supplies 30-minute idle lifetime, a 5 s stop budget, a forced-exit reserve of min(500 ms, half that budget), separate 500 ms signal-exit waits and 20 ms polling, plus 250 ms drain-ack grace polled every 5 ms. Worker-output acknowledgement and unacknowledged-result retention gain no deadline.',
    'stated','The record gives each clock its own purpose, preserves short stop windows, and defers unacknowledged-result eviction.',
    'Lifetime, controller, process terminator and completion-drain code selected local or optional values.',
    'The shutdown slice supplies those roles. The reserve remains capped at half the stop budget; policy routing does not make these equal-valued clocks one clock.',
    [('head',D+'daemon-lifetime.ts',1,35),('head',D+'daemon-controller.ts',37,86),('head',D+'daemon-process-launcher.ts',58,106),('head',D+'workspace-daemon.ts',922,939)],POL)

add(15,'consumers','Bound diagnostics separately from result retention',
    'Diagnostic policy now supplies 10 MiB log rotation, four backups, 1,024 queued events, and five-minute disconnected-trace retention with at most 1,024 traces (effective minimum one). Trace expiration still concerns diagnostic evidence; it is not a completion-result eviction timer.',
    'stated','The record bounds diagnostic history and slow-storage memory, and keeps reconnect evidence separate from result retention.',
    'Logger constants/overrides and WorkspaceDaemon trace options supplied these limits locally.',
    'Logger reads diagnostics and rotates using its backupCount; disconnected trace expiration and capacity read the same policy section.',
    [('head',D+'daemon-logger.ts',250,277),('head',D+'daemon-logger.ts',412,432),('head',D+'workspace-daemon.ts',837,855),('head',D+'workspace-daemon.ts',888,905)],POL)

add(16,'fixtures','Move old test knobs behind validated test adapters',
    'Tests switch imports to seven new helper files and local wrappers that translate legacy options into DaemonPolicyTestFactory overrides. Production compatibility overloads are not added. The adapters preserve access to small thresholds at test scope.',
    'stated','The PR explicitly chooses test-only adapters so small test thresholds do not restore production tuning seams.',
    'Many tests constructed production classes directly with optional numbers or a separate resource-policy object.',
    'Controller, terminator, registry, resource, startup, transport and workspace helpers adapt the old test APIs; local logger/spool wrappers do the same at test scope.',
    [('head',H+'daemon-controller.ts',11,46),('head',H+'daemon-startup-coordinator.ts',12,48),('head',H+'workspace-daemon.ts',28,53),('head',D+'daemon-logger.test.ts',10,43)],PR)

add(17,'fixtures','A tiny transport inline override may no longer spill',
    'The transport test helper raises outputInlineBytes to at least the default 64 KiB raw chunk cap. An unchanged-looking outputInlineBytes: 0 cleanup fixture with a small payload can stay in memory, so its empty-directory assertion alone no longer demonstrates disk-file disposal.',
    'unexplained','No separate rationale was located for this clamp’s effect on the old disk-cleanup stimulus.',
    'A transport inline override of zero forced captured nonempty output toward file storage.',
    'The helper uses max(default maximumChunkRawBytes, requested inline). The caller’s source may look unchanged although its storage premise differs.',
    [('head',H+'local-daemon-transport.ts',30,59),('base',D+'local-daemon-transport-execution.test.ts',706,756),('head',D+'local-daemon-transport-execution.test.ts',722,772)])

add(18,'fixtures','Transport test construction now creates its directory',
    'The transport helper recursively creates a supplied outputDirectory during construction. Directory existence can now be arranged by the test adapter before capture starts; passing a path to the old production transport did not perform that constructor side effect.',
    'unexplained','The adapter boundary is explained, but no separate rationale was located for adding directory creation there.',
    'The old transport stored outputDirectory; its constructor did not create that directory.',
    'The helper calls mkdirSync before super on the legacy-options path, so setup failures and filesystem stimulus can occur at construction.',
    [('base',D+'local-daemon-transport.ts',283,307),('head',H+'local-daemon-transport.ts',50,64)])

add(19,'fixtures','Translate workspace limits into valid positive capacities',
    'The workspace helper can derive a result limit from an aggregate limit; with a bounded result it maps inline zero to at least one byte (half the result, floored), then reduces chunk size to fit inline/result. It does not unconditionally turn every zero inline input into a valid policy.',
    'unexplained','The policy’s positive ordered capacities are documented; no separate rationale was located for these exact translation formulas.',
    'Workspace test callers could pass zero inline and independent result/aggregate limits directly.',
    'resultBytes may be min(default result, aggregate); zero inline changes only when resultBytes exists; chunkBytes is min(default chunk, effective inline, effective result). Validation still applies.',
    [('head',H+'workspace-daemon.ts',28,62),('head','packages/daemon/src/daemon-policy.ts',291,305)])

add(20,'fixtures','The retained memoryCapBytes test input is inert',
    'TestWorkspaceDaemon still accepts memoryCapBytes, but does not translate it into policy. Resource changes come from resourcePolicy or the selected base snapshot. The extra field is spread into the runtime options object, whose implementation no longer reads it.',
    'unexplained','No separate rationale was located for retaining this accepted but unused test input.',
    'The production daemon required memoryCapBytes and could derive fallback resource thresholds from it.',
    'The test type keeps the optional field; the adapter computes no override from it and the production option/interface consumption has been removed.',
    [('head',H+'workspace-daemon.ts',9,34),('head',H+'workspace-daemon.ts',60,99),('base',D+'workspace-daemon.ts',142,167)])

add(21,'fixtures','Rebuild disk-test stimuli after positive limits',
    'Spool security and storage-failure cases now cross positive inline thresholds with an extra record; an aggregate-cap fixture raises inline from one to six bytes. A workspace failure fixture splits “xx” into two one-byte records to fit its chunk cap. These alter the stimulus, while keeping the relevant failure assertions.',
    'unexplained','The policy constraints explain why old values can be invalid; no separate reason was located for the particular replacement stimuli.',
    'Some cases forced disk with inline zero; a workspace executor returned one two-byte record.',
    'Security cases use two one-byte appends; storage failures append “stored” then “x”; the workspace executor produces two “x” records. The extra bytes and segmentation matter to the exercised path.',
    [('head',D+'completion-spool.test.ts',173,260),('head',D+'completion-spool.test.ts',91,121),('head',D+'workspace-daemon-requests.test.ts',1877,1901)])

add(22,'fixtures','The capture comparison uses 32 bytes instead of one',
    'The ordered-output test changes its spill threshold from one to 32 bytes and builds a valid policy around each threshold. Chunk boundaries now depend on that policy too. The test still compares inline/spilled records and stream order, but the exact one-byte stimulus is retired.',
    'unexplained','No specific reason was located for choosing 32 bytes; the general move to valid test policy is stated.',
    'The capture helper passed an inlineBytes override while record capacity stayed fixed.',
    'The helper also reduces maximumChunkRawBytes and grows result/aggregate caps as needed; spilled capture uses 32. A separate added test covers a one-byte chunk cap.',
    [('head',CLI+'cli-program-executor.test.ts',80,152),('base',CLI+'cli-program-executor.test.ts',78,111)])

add(23,'observations','Retire the local derivation suite, keep the central one in scope',
    'The CLI resource-policy suite is deleted: five memory-table cases, the constrained-memory comparison, and the fixed-250-ms constant assertion. The daemon package already contains derivation/default tests at base and head; they are not newly moved tests in this PR. Consumer supervision tests remain.',
    'unexplained','Retiring local derivation supports the stated ownership change; no separate rationale was located for this exact deletion of witnesses.',
    'The CLI resource-monitor file included tests of its own policy derivation as well as supervision behavior.',
    'Only the supervisor suite remains there, with a new small-policy cadence/threshold case. The package’s existing literal-value derivation tests are unchanged by this diff.',
    [('base',D+'daemon-resource-monitor.test.ts',1,84),('head',D+'daemon-resource-monitor.test.ts',1,77),('head','packages/daemon/src/daemon-policy.test.ts',9,103)])

add(24,'observations','Several expected values now come from policy',
    'Spool capacities, idle lifetime and diagnostic bounds in tests now read policy instead of retired CLI constants. Those assertions follow policy changes and do not independently pin those numeric defaults. Existing central literal-default tests and some explicit behavioral timings remain separate witnesses.',
    'unexplained','No separate rationale was located for the choice of policy-derived expected values rather than independent literals in these tests.',
    'Tests imported CLI constants for output caps, idle timeout and log rotation/backup bounds.',
    'Tests import DaemonPolicy and derive expectations from its values. This is an oracle-source change, not proof that the previous imports were all independent literal checks.',
    [('head',D+'completion-spool.test.ts',121,148),('head',D+'daemon-lifetime.test.ts',1,35),('head','apps/cli/test/e2e/daemon/diagnostic-output.test.ts',68,83),('head','packages/daemon/src/daemon-policy.test.ts',9,70)])

add(25,'observations','Remove an unused startup-timeout stimulus',
    'The old startupTimeoutMs option was assigned but never read by the coordinator. Tests stop passing 5 ms and other values. This removes an inert test knob, not an enforced healthy-startup deadline; the delayed-readiness assertion remains.',
    'unexplained','The no-healthy-startup-deadline policy is stated; no separate reason was located for the earlier unused field or these exact test edits.',
    'The coordinator assigned startupTimeoutMs, while tests passed short overrides to its delayed-readiness path.',
    'The field and those test arguments disappear. The test still holds readiness, observes unsettled waits and then releases them.',
    [('base',D+'daemon-startup-coordinator.ts',23,76),('head',D+'daemon-startup-coordinator.test.ts',89,129)])

add(26,'observations','Add focused consumer witnesses, with bounded reach',
    'Added tests exercise small output/JSON/queue/resource caps, one-byte chunk progress, purpose-specific timeouts, zero/two child retries and a reattached execution’s fetch. The default recovery-success case does not establish repeated fetch failures with a limit above one, or the later-error provenance change.',
    'stated','The PR calls for preserving threshold/retry behavior; these tests exercise policy consumption. That purpose does not explain every fixture value.',
    'Many behaviors were already exercised at their default settings; policy-directed consumer witnesses were missing from these files.',
    'New cases choose conspicuous policy values and inspect outputs, call counts, timeouts or failures. This artifact reads their assertions and does not report a new test-suite execution.',
    [('head',CLI+'cli-program-executor.test.ts',131,152),('head',D+'local-daemon-transport-validation.test.ts',22,145),('head',D+'local-daemon-transport-execution.test.ts',846,897),('head',D+'daemon-logger.test.ts',353,388),('head',D+'daemon-startup-coordinator.test.ts',515,535)],PR)

add(27,'observations','Expand the architecture source-name guard',
    'The package meta-test expands its production-source string ban to retired constants, option names and local policy reconstruction. It detects those spellings, not every semantically equivalent bypass; test helpers are outside its production-source scan.',
    'stated','The PR explicitly says this meta-test rejects retired defaults and bypasses; its implementation is a source-text guard.',
    'The guard rejected three optional/default DaemonPolicy forms.',
    'It additionally lists retired output/lifecycle/resource constants and optional numeric seams, using not.toContain for each string.',
    [('head','meta-tests/src/daemon-package.test.ts',192,243)],PR)

add(28,'observations','The benchmark’s resource record grows without a schema bump',
    'The new test resource helper includes replacementWindowMs and replacementLimit in its record. The benchmark serializes that record while its artifact schemaVersion stays 1. This is a reporting-shape change reached through a helper import, beyond the production constructor signatures.',
    'unexplained','No separate rationale was located for adding these report fields while retaining schemaVersion 1.',
    'The serialized resourcePolicy used the retired five-field CLI resource record.',
    'The replacement helper produces seven fields and the benchmark stores the complete record. The output type and emitted schemaVersion remain 1.',
    [('head',H+'daemon-resource-policy.ts',1,34),('head','apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts',50,66),('head','apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts',133,139),('head','apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts',183,201)])

add(29,'fixtures','Explicit policy and old options do not combine uniformly',
    'Controller, startup and logger wrappers prefer an explicit policy over their legacy numeric knobs. A transport object containing transport takes the direct-policy path. The workspace wrapper instead chooses a base policy, then overlays translated legacy options. The same mixing strategy cannot be assumed across helpers.',
    'unexplained','No separate rationale was located for these different precedence rules within the stated test-adapter design.',
    'Tests previously passed production options directly; these wrapper precedence rules did not exist.',
    'Some helpers use options.policy ?? derivedPolicy; transport branches on the transport key; workspace always builds overrides on options.policy ?? dependencies.daemonPolicy.',
    [('head',H+'daemon-controller.ts',27,46),('head',H+'daemon-startup-coordinator.ts',26,48),('head',D+'daemon-logger.test.ts',25,44),('head',H+'local-daemon-transport.ts',19,30),('head',H+'workspace-daemon.ts',28,52)])

add(30,'observations','Selected policy fixtures keep casts through unknown',
    'New spool, resource-supervisor and logger policy cases cast their constructor options through unknown. They exercise runtime behavior but do not themselves demonstrate ordinary typed construction at those call sites. This fixture choice is separate from the purpose of adding consumer witnesses.',
    'unexplained','No separate reason was located for retaining the unknown casts in these new fixtures.',
    'These particular consumer-policy cases were absent.',
    'The new options objects pass through as unknown as ConstructorParameters<...> before construction; their runtime assertions remain available to inspect.',
    [('head',D+'completion-spool.test.ts',14,49),('head',D+'daemon-resource-monitor.test.ts',37,75),('head',D+'daemon-logger.test.ts',353,387)])

# One authored parent statement per claim. The comparison uses exactly the same
# title, choice, reason and reason status; there is no variant-specific ledger.
