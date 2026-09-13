"""Editorial content for the owner page. Reasons are separated from observations."""
from html import escape
from urllib.parse import quote

CLI = "apps/cli/src/"
D = CLI + "daemon/"
T = "apps/cli/test/helpers/"
POLICY = "packages/daemon/src/daemon-policy.ts"
POLICY_TEST = "packages/daemon/src/daemon-policy.test.ts"
RECORD = "plans/005/daemon-policy.md"
SPEC = "plans/005/daemon-architecture-functional-spec.md"


def ev(path, label, side="diff", line=None):
    location = f' data-line="{line}"' if line else ""
    return (f'<a class="evidence-link" href="evidence.html#{quote(path)}" '
            f'data-source="{escape(path)}" data-side="{side}"{location}>{label}</a>')


def table(headers, rows):
    return '<div class="table-scroll"><table><thead><tr>' + ''.join(
        f'<th scope="col">{h}</th>' for h in headers
    ) + '</tr></thead><tbody>' + ''.join(
        '<tr>' + ''.join(f'<td>{cell}</td>' for cell in row) + '</tr>' for row in rows
    ) + '</tbody></table></div>'


def chain(items, label=""):
    return f'<figure class="chain" aria-label="{escape(label)}">' + ''.join(
        f'<div class="chain-box">{item}</div>' + ('<span class="chain-arrow" aria-hidden="true">→</span>' if i < len(items)-1 else '')
        for i, item in enumerate(items)
    ) + '</figure>'


TOPICS = [
    dict(id="error", title="Returned error", status="unexplained",
         delta='After a reattachment is accepted, a failing completion now exposes <strong>that attempt’s error</strong>. Before, the first connection error survived both reattachment failure paths.',
         reason='This consequence of the loop rewrite is absent from the PR’s stated decisions.',
         body='''<p>The catch boundary moved. This is a source-level observation; no rationale for choosing the returned error was found.</p>''' +
         table(["Same sequence", "Base", "Head"], [
             ['Initial accepted connection fails with <code>E₀</code>; reattachment fails before acceptance', '<code>E₀</code>', '<code>E₀</code>'],
             ['Initial accepted connection fails with <code>E₀</code>; reattachment is accepted, then its completion rejects with <code>E₁</code>', '<code>E₀</code>', '<strong><code>E₁</code></strong>'],
         ]) + '''<p>At the default reattachment limit of one, the head’s next loop iteration catches <code>E₁</code> and throws it. The base awaited the reattached completion inside the catch that rethrew <code>E₀</code>. This concerns rejected promises; a resolved <code>{status: "failed"}</code> completion follows the existing return path.</p>
         <p class="scope-note">The local probe executes these two method bodies extracted from source, with stubbed completion promises. It does not start a daemon or exercise sockets.</p>''',
         evidence=[ev(D+'local-daemon-transport.ts','Catch boundary in the diff'), ev(D+'local-daemon-transport.ts','Base method','base',398), ev(D+'local-daemon-transport.ts','Head method','head',402)],
         files=[D+'local-daemon-transport.ts']),
    dict(id="fixtures", title="Fixture translations", status="unexplained",
         delta='Test adapters reinterpret old knobs: client <code>inline=0</code> becomes <strong>64 KiB</strong>, the client directory is precreated, and workspace <code>memoryCapBytes</code> is accepted but unused. Other spill fixtures change thresholds and record splits.',
         reason='Adapters are stated; these particular translations and their changed exercise of storage paths are unexplained.',
         body=table(["Fixture or adapter", "Before", "Head"], [
             [ev(T+'local-daemon-transport.ts','Client transport adapter'), '<code>outputInlineBytes: 0</code> forces output to disk', '<code>max(default chunk, requested inline)</code> → 64 KiB. The helper also creates the output directory.'],
             [ev(D+'local-daemon-transport-execution.test.ts','Acknowledgement-failure fixture','head',606), 'One 64 KiB record, inline threshold zero', 'Same record and empty-directory assertion; the record can remain inline at the new threshold. The directory already exists.'],
             [ev(T+'workspace-daemon.ts','Workspace adapter'), 'Separate <code>memoryCapBytes</code> feeds reporting / fallback resource derivation', 'The option remains in the test type but does not enter the constructed policy. The supplied policy or resource-policy record does.'],
             [ev(T+'workspace-daemon.ts','Workspace spool translation'), 'Zero inline threshold', 'With a result cap, zero maps to <code>max(1, floor(result / 2))</code>; chunk capacity is reduced to fit.'],
             [ev(CLI+'cli-program-executor.test.ts','Inline / spilled comparison'), 'Spilled threshold 1 byte', '32 bytes; chunk capacity is reduced to fit. The ordered-record equality assertion remains.'],
             [ev(D+'completion-spool.test.ts','Spool fixtures'), 'Aggregate-pressure inline threshold 1; storage-failure fixtures inline 0', 'Aggregate fixture inline 6; failure fixtures use positive thresholds and add a byte to cross them. Full-size capacity fixture uses the default inline threshold.'],
             [ev(D+'workspace-daemon-requests.test.ts','Sequenced executor fixture'), 'One <code>"xx"</code> record', 'Two <code>"x"</code> records, fitting a one-byte chunk cap.'],
         ]) + '''<p>The pre-existing policy validator requires <code>0 &lt; chunk ≤ inline ≤ result ≤ aggregate</code>. That explains the constraint on valid fixtures. The PR does not explain these exact choices or the altered disk-path witness. Existing cleanup assertions remain, with some scenarios now able to complete using inline storage.</p>''',
         evidence=[ev(T+'local-daemon-transport.ts','Client coercion and directory creation'), ev(T+'workspace-daemon.ts','Workspace translations'), ev(POLICY,'Existing capacity ordering','head',305)],
         files=[T+'local-daemon-transport.ts',T+'workspace-daemon.ts',CLI+'cli-program-executor.test.ts',D+'completion-spool.test.ts',D+'workspace-daemon-requests.test.ts',D+'local-daemon-transport-execution.test.ts']),
    dict(id="oracles", title="Test oracles", status="unexplained",
         delta='The old resource-policy test block is deleted. Package policy checks <strong>already existed</strong>. Logger / spool / lifetime expectations now read the policy; added tests exercise selected consumer overrides, retry counts, and timeout purposes.',
         reason='No specific reason is recorded for deleting that block or changing these expectation sources.',
         body=table(["Change", "What the evidence actually says"], [
             ['Resource derivation block deleted', 'Five memory rows, one constrained-memory case, and a direct 250 ms constant check are removed with <code>DaemonResourcePolicy</code>. The supervisor’s timed 250 ms sampling test remains.'],
             ['Package coverage pre-exists', 'The unchanged package suite asserts every default leaf, memory constraints and bounds, exact serialization, freezing, and validation. Its lowest memory row is 1 byte, not the deleted 256 MiB row. These are overlapping checks, not a test move in this PR.'],
             ['Expected values follow policy', 'Logger unit and diagnostic e2e expectations read backup count / rotation bytes from policy. Spool maximum-result and lifetime checks also read policy in place of retired exported constants. Literal default assertions remain in the package suite.'],
             ['Added consumer witnesses', 'Small chunk rejection (spool); one-byte output progress; overridden logger queue; overridden resource cadence / thresholds; JSON capacity; status-observer identify and ping deadlines; ordinary execution-status deadline; startup zero and two retries.'],
             ['Added delivery witness', 'The new test observes two execute exchanges and one result-fetch on the reattached attempt. The first attempt closes after acceptance without a manifest. It does not exercise a fetch on both attempts.'],
             ['E2E parity', 'The parity file’s changes are imports to test adapters. No output expectation in that file changes. The diagnostic e2e’s expectation sources do change as described above.'],
         ]) + '''<p class="scope-note">These are inspection results, not a report that the symnav suites passed. The artifact does not run those suites.</p>''',
         evidence=[ev(D+'daemon-resource-monitor.test.ts','Deleted block and new consumer test'), ev(POLICY_TEST,'Policy suite already present in base','base',1), ev(D+'daemon-logger.test.ts','Logger expectation source'), ev('apps/cli/test/e2e/daemon/diagnostic-output.test.ts','Diagnostic e2e expectation source'), ev(D+'local-daemon-transport-execution.test.ts','New delivery test','head',846)],
         files=[D+'daemon-resource-monitor.test.ts',D+'daemon-logger.test.ts',D+'daemon-lifetime.test.ts',D+'completion-spool.test.ts',CLI+'cli-program-executor.test.ts',D+'daemon-startup-coordinator.test.ts',D+'local-daemon-transport-validation.test.ts',D+'local-daemon-transport-execution.test.ts','apps/cli/test/e2e/daemon/diagnostic-output.test.ts']),
    dict(id="composition", title="Required inputs", status="stated",
         delta='<code>DaemonPolicy</code> already owns the defaults and crosses process / worker boundaries. This PR replaces consumer-local defaults and optional threshold options with <strong>required sections</strong>; implementations stay in <code>apps/cli</code>.',
         reason='PR: omitted composition must not recreate local defaults.',
         body='''<figure class="runtime-map"><figcaption>Data ownership · the serialized bridge already exists; the solid green consumer feeds change here.</figcaption>
         <div class="runtime-columns"><div class="runtime-box"><b>CLI process</b><span>ProgramDependencies.daemonPolicy</span><div class="new-feed">↓ required sections</div><small>command capture · dispatcher · start / status / stop</small></div>
         <div class="bridge">serialized values<br><span>→ existing bridge →</span></div>
         <div class="runtime-box"><b>Daemon process</b><span>DaemonPolicy.fromSerialized</span><div class="new-feed">↓ required sections</div><small>registry · transport · spool · lifetime · logger · resource supervisor</small><div class="worker-box"><b>Worker thread</b><span>same serialized values</span><div class="new-feed">↓ capture · chunk checks · heap sampling</div></div></div></div>
         <p class="lossy">Grouped view: composition calls and IPC messages are collapsed; arrows show value flow, not imports.</p></figure>''' +
         table(['Consumer boundary', 'Required input'], [
             ['OrderedCommandOutput / CompletionSpoolStore', '<code>output</code>'],
             ['LocalDaemonTransport', '<code>transport + delivery + output</code>'],
             ['DaemonController / StartupCoordinator', '<code>startup + shutdown</code>'],
             ['DaemonRegistry / ProcessTerminator / Lifetime', '<code>startup</code> / <code>shutdown</code> / <code>shutdown.idleTimeoutMs</code>'],
             ['ResourceSupervisor / Logger', '<code>resources</code> / <code>diagnostics</code>'],
             ['WorkspaceDaemon and process / worker composition', 'Complete <code>DaemonPolicy</code>, projected into the above inputs'],
         ]) + '''<p>These are TypeScript input contracts. The existing serialization / test-factory path validates full policies. This PR does not add a validator at every slice consumer. Required means the caller must supply the input; it is not a new runtime package boundary.</p>''',
         evidence=[ev('pr.json','PR context and decisions','head'), ev(D+'workspace-daemon.ts','Workspace composition'), ev(D+'daemon-entry.ts','Process composition'), ev(CLI+'commands/daemon/register-daemon-command.ts','Command composition'), ev(POLICY,'Existing policy owner','head',1)],
         files=[CLI+'cli-program-executor.ts',CLI+'command-execution-result.ts',CLI+'commands/daemon/register-daemon-command.ts',D+'daemon-command-dispatcher.ts',D+'daemon-controller.ts',D+'daemon-entry.ts',D+'daemon-lifetime.ts',D+'daemon-logger.ts',D+'daemon-navigation-worker-entry.ts',D+'daemon-navigation-worker-protocol.ts',D+'daemon-navigation-worker.ts',D+'daemon-process-launcher.ts',D+'daemon-registry.ts',D+'daemon-resource-monitor.ts',D+'daemon-result-chunk-codec.ts',D+'daemon-startup-coordinator.ts',D+'local-daemon-transport.ts',D+'workspace-daemon.ts',D+'completion-spool.ts']),
    dict(id="deadlines", title="Response deadlines", status="stated",
         delta='Composition purpose selects <strong>100 ms</strong> for a status observer and <strong>250 ms</strong> for ordinary lifecycle / execution-status exchanges. Execute admission stays <strong>5 s</strong>; acceptance clears that timer.',
         reason='PR: status observation and ordinary execution-status requests have distinct deadlines.',
         body='''<figure class="deadline-figure"><figcaption>One-response timeout selection</figcaption>
         <div class="deadline-row"><span>Status composition<br><code>status-observer</code></span><div class="deadline-track"><div style="width:40%">100 ms</div></div><span>identify / ping</span></div>
         <div class="deadline-row"><span>Ordinary composition<br><code>ordinary</code> (default)</span><div class="deadline-track"><div style="width:100%">250 ms</div></div><span>lifecycle / execution-status</span></div>
         </figure>''' + chain(['<b>Execute submitted</b><br>5 s admission timer', '<b>Accepted</b><br><code>socket.setTimeout(0)</code>', '<b>Completion</b><br>no completion deadline'], 'Execute timer ends at acceptance') +
         '''<p>The purpose is chosen when constructing the transport, not by testing the request’s <code>kind</code>. Status command composition passes <code>responseTimeoutPurpose: "status-observer"</code>. Normal transports keep the ordinary purpose. The policy values existed before this PR; the selector replaces a numeric 100 ms option at that composition site.</p>''',
         evidence=[ev(CLI+'commands/daemon/register-daemon-command.ts','Status chooses the purpose','head',107), ev(D+'local-daemon-transport.ts','Constructor and acceptance','head',289), ev(D+'local-daemon-transport-validation.test.ts','Purpose characterization tests'), ev(RECORD,'Recorded deadlines and reasons','head',7)],
         files=[CLI+'commands/daemon/register-daemon-command.ts',D+'local-daemon-transport.ts',D+'local-daemon-transport-validation.test.ts']),
    dict(id="recovery", title="Recovery scopes", status="stated",
         delta='Numeric counters replace fixed recovery control flow: <strong>1 execution reattachment</strong> per call; <strong>1 fetch-resume allowance</strong> inside each execute attempt. A failed fetch feeds completion failure; a reattachment gets a fresh allowance.',
         reason='PR: each reattached execute attempt needs its own fetch-resume allowance.',
         body='''<figure class="budget-figure"><figcaption>Default scopes · an execute exchange can reattach to the same accepted work</figcaption>
         <div class="budget-outer"><b>execute(endpoint, same request)</b><span class="budget-label">reattachment counter · limit 1</span>
         <div class="budget-attempts"><div><b>Initial executeOnce</b><span>acceptance + manifest required</span><div class="budget-inner">fetch-resume counter · limit 1</div></div><span class="chain-arrow">→</span><div><b>Reattached executeOnce</b><span>same request / instance identity</span><div class="budget-inner">fresh fetch-resume counter · limit 1</div></div></div></div>
         <p class="lossy">Scope diagram: omits frame validation, output storage, and acknowledgement exchanges.</p></figure>''' +
         table(['Boundary', 'Condition / lifetime'], [
             ['Execution reattachment', '<code>closed</code> error, delivery already accepted, authenticated instance matches the request; counter belongs to <code>completeWithReattachments</code>.'],
             ['Fetch resume', 'Counter belongs to <code>executeOnce</code>. Resume requires acceptance and a manifest, and no terminal / settled completion.'],
             ['Failed fetch', '<code>fetchCompletion(...).catch(fail)</code> rejects that completion. It does not recursively call the resume function. The outer reattachment path can then apply.'],
             ['Numeric generality', 'The page illustrates the default limit of one. A numeric guard alone is not evidence of repeated fetch attempts for a value greater than one.'],
         ]) + '''<p>The base already had one reattachment and a resume boolean local to each <code>executeOnce</code>. The change makes those limits policy inputs. It does not introduce either recovery path or a shared boolean that formerly covered both.</p>''',
         evidence=[ev(D+'local-daemon-transport.ts','Counters and their surrounding control flow'), ev(D+'local-daemon-transport.ts','Resume failure path','head',475), ev(D+'local-daemon-transport-execution.test.ts','Reattached-attempt fetch witness','head',846), ev('pr.json','Stated recovery reason','head')],
         files=[D+'local-daemon-transport.ts',D+'local-daemon-transport-execution.test.ts']),
    dict(id="output", title="Output + framing", status="stated",
         delta='Capture, spool, disk decoding, socket codec, and both worker-side checks share the output slice: <strong>64 KiB chunks / 256 KiB inline / 256 MiB result / 512 MiB aggregate</strong>. Control caps stay <strong>8 MiB JSON / 256 KiB execution control</strong>.',
         reason='PR + policy record: require the slice throughout the bounded output path.',
         body=chain(['<b>CLI executor</b><br>OrderedCommandOutput', '<b>Worker boundary</b><br>send + receive validation', '<b>Daemon spool</b><br>store + file reader', '<b>Socket boundary</b><br>encode + decode', '<b>Client capture</b><br>OrderedCommandOutput'], 'Output path shares the chunk capacity') +
         '''<p class="lossy">Grouped output path; control messages and terminal output replay are omitted.</p>''' +
         table(['Policy leaf', 'Default', 'Consumers / boundary'], [
             ['<code>output.maximumChunkRawBytes</code>', '64 KiB', 'Capture splits and merges records; append and file decode validate them; spool, worker send / receive, and socket codec use the same limit.'],
             ['<code>output.inlineRawBytes</code>', '256 KiB', 'Capture and completion spool stay inline through this raw-byte threshold.'],
             ['<code>output.maximumResultRawBytes</code>', '256 MiB', 'One captured / retained result. The CLI executor’s optional output-options argument disappears.'],
             ['<code>output.maximumAggregateSpoolRawBytes</code>', '512 MiB', 'All retained completions in one daemon spool store.'],
             ['<code>transport.maximumJsonPayloadBytes</code>', '8 MiB', 'Ordinary JSON framing.'],
             ['<code>transport.maximumExecutionControlPayloadBytes</code>', '256 KiB', 'Execution control frames. Binary frame capacity remains control cap + chunk cap.'],
         ]) + '''<p>Low-level codec and file-reader methods receive required numeric limits projected from the policy. Their wire record layout and checksum logic remain in their existing modules.</p>''',
         evidence=[ev(CLI+'command-execution-result.ts','Capture and disk decode'), ev(D+'completion-spool.ts','Spool capacities and storage contract'), ev(D+'daemon-result-chunk-codec.ts','Codec inputs'), ev(D+'daemon-navigation-worker.ts','Receiving worker wrapper'), ev(D+'daemon-navigation-worker-entry.ts','Sending worker entry'), ev(D+'daemon-navigation-worker-protocol.ts','Worker response validator'), ev(RECORD,'Output reasons','head',31)],
         files=[CLI+'command-execution-result.ts',CLI+'cli-program-executor.ts',D+'completion-spool.ts',D+'daemon-result-chunk-codec.ts',D+'daemon-navigation-worker.ts',D+'daemon-navigation-worker-entry.ts',D+'daemon-navigation-worker-protocol.ts',D+'daemon-navigation-worker-protocol.test.ts',D+'daemon-result-chunk-codec.test.ts']),
    dict(id="resources", title="Memory + supervision", status="stated",
         delta='Delete <code>DaemonResourcePolicy</code> and the second memory-cap input. Use the snapshot’s RSS / worker-heap thresholds for supervision, launch, and reporting; retain <strong>250 ms supervision / 25 ms heap samples / 2 replacements in 10 min, then drain</strong>.',
         reason='Policy record: one derivation, resource shedding before replacement, and a bounded replacement circuit.',
         body=chain(['<b>Existing policy recipe</b><br>selected system-memory bytes', '<b>Required resources</b><br>RSS thresholds + worker heap', '<b>Consumers</b><br>supervisor · worker launch · ready/activity reports'], 'Memory derives once then feeds resource consumers') +
         table(['Existing recipe or value', 'What the consumers now read'], [
             ['Effective memory', 'Positive lower constrained-memory limit when available; otherwise total. Raw selected bytes are preserved.'],
             ['Hard process RSS', '<code>clamp(floor(max(1, floor(bytes / MiB)) / 2), 256, 8192) MiB</code>'],
             ['Soft / resume RSS', '<code>floor(hardMiB × 0.8)</code> / <code>floor(hardMiB × 0.7)</code>, then × MiB.'],
             ['Worker old generation', '<code>clamp(floor(effectiveMiB / 4), 128, 4096) MiB</code>, passed to the worker resource limit.'],
             ['Supervision / active-worker sampling', '<code>resources.supervisionIntervalMs = 250</code> / <code>workerHeapSampleIntervalMs = 25</code>'],
             ['Replacement circuit', '<code>replacementWindowMs = 600000</code>, <code>replacementLimit = 2</code>. The next replacement inside that window drains.'],
             ['Reports', '<code>memoryCapBytes</code> in readiness and <code>hardProcessRssBytes</code> in activity now come from the same resource slice.'],
         ]) + '''<p>The formulas above already live in the base policy. The removed daemon entry reconstructed a resource policy from the serialized effective-memory bytes; the workspace also had a fallback derivation from a separate memory-cap option. The head reads the supplied values directly.</p>''',
         evidence=[ev(D+'daemon-resource-monitor.ts','Removed derivation and policy consumers'), ev(D+'daemon-entry.ts','Removed re-derivation'), ev(D+'workspace-daemon.ts','Worker limit and reports'), ev(POLICY,'Existing memory recipe','head',104), ev(RECORD,'Resource reasons','head',35)],
         files=[D+'daemon-resource-monitor.ts',D+'daemon-entry.ts',D+'workspace-daemon.ts',D+'daemon-navigation-worker-entry.ts',D+'daemon-resource-monitor.test.ts']),
    dict(id="lifecycle", title="Startup + shutdown", status="stated",
         delta='Required slices preserve coordination, heartbeats, polls, stop escalation, idle lifetime, and drain acknowledgement timings. Startup child-failure retry becomes numeric (default <strong>1</strong>). The unused healthy-startup timeout option disappears; healthy warm-up remains unbounded.',
         reason='Policy record: preserve distinct cadences and deadlines; progressing warm-up has no project-size deadline.',
         body=table(['Policy input', 'Default / recipe', 'Consumer'], [
             ['<code>startup.coordinationGraceMs</code>', '15 s', 'Registry owner / mutation grace, missing-owner observation, daemon authorization wait'],
             ['<code>startup.heartbeatIntervalMs</code>', '100 ms', 'Daemon startup-owner heartbeat'],
             ['<code>startup.authorizationPollIntervalMs</code>', '10 ms', 'Daemon authorization wait'],
             ['<code>startup.observationPollIntervalMs</code>', '20 ms', 'Coordinator readiness observation'],
             ['<code>startup.previousInstanceTerminationTimeoutMs</code>', '5 min', 'Coordinator replacement of an older instance'],
             ['<code>startup.childFailureRetryLimit</code>', '1 retry', 'Child-exit / lost-warm-up retry loop; ownership waiting does not reset the counter'],
             ['<code>shutdown.idleTimeoutMs</code>', '30 min', 'DaemonLifetime'],
             ['<code>shutdown.stopTimeoutMs</code>', '5 s', 'Controller total stop window'],
             ['<code>shutdown.forcedTerminationReserveMaximumMs</code>', '<code>min(500 ms, floor(stop / 2))</code>', 'Reserved part of the stop window for forced escalation'],
             ['<code>shutdown.controllerPollIntervalMs</code>', '20 ms', 'Controller observation'],
             ['<code>shutdown.processSignalExitTimeoutMs</code>', '500 ms per signal', 'Process terminator after SIGTERM and after SIGKILL'],
             ['<code>shutdown.processExitPollIntervalMs</code>', '20 ms', 'Process terminator exit observation'],
             ['<code>shutdown.resourceDrainAcknowledgementGraceMs</code>', '250 ms', 'Wait for completion acknowledgements during drain'],
             ['<code>shutdown.resourceDrainAcknowledgementPollIntervalMs</code>', '5 ms', 'Separate acknowledgement polling cadence'],
         ]) + '''<p>The base assigned <code>startupTimeoutMs</code> but did not read it after construction. Its removal and the removal of that option from tests do not remove an enforced warm-up deadline. Coordination grace still bounds ownership recovery, not healthy initialization.</p>''',
         evidence=[ev(D+'daemon-startup-coordinator.ts','Startup options and retry loop'), ev(D+'daemon-registry.ts','Registry coordination grace'), ev(D+'daemon-controller.ts','Stop reserve recipe'), ev(D+'daemon-process-launcher.ts','Signal deadlines'), ev(D+'daemon-lifetime.ts','Idle input'), ev(D+'workspace-daemon.ts','Heartbeat, authorization, acknowledgements'), ev(RECORD,'Lifecycle reasons and intentional absences','head',10)],
         files=[D+'daemon-startup-coordinator.ts',D+'daemon-registry.ts',D+'daemon-controller.ts',D+'daemon-process-launcher.ts',D+'daemon-lifetime.ts',D+'workspace-daemon.ts',D+'daemon-startup-coordinator.test.ts',D+'daemon-lifetime.test.ts']),
    dict(id="diagnostics", title="Diagnostics", status="stated",
         delta='Logger rotation, queue capacity, and disconnected-trace retention now use policy: <strong>10 MiB / 4 backups / 1,024 queued events / 5 min / 1,024 traces</strong> (effective trace minimum 1). Trace expiry remains separate from result retention.',
         reason='Policy record: bound diagnostic storage and memory while retaining reconnect evidence.',
         body=table(['Policy leaf', 'Default', 'Consumer'], [
             ['<code>diagnostics.logRotateBytes</code>', '10 MiB', 'Logger active-file rotation'],
             ['<code>diagnostics.logBackupCount</code>', '4 + active file', 'Logger rotation loop and oldest-file removal'],
             ['<code>diagnostics.maximumQueuedEvents</code>', '1,024', 'Pending diagnostic writes and dropped-event accounting'],
             ['<code>diagnostics.disconnectedTraceRetentionMs</code>', '5 min', 'WorkspaceDaemon disconnected operation-trace expiry timer'],
             ['<code>diagnostics.maximumDisconnectedTraces</code>', '1,024; consumer applies <code>max(1, value)</code>', 'WorkspaceDaemon oldest disconnected-trace capacity enforcement'],
         ]) + '''<p>The trace timer and capacity still operate on diagnostic traces. They do not evict retained completion results. The existing trace/result separation tests remain, with harness imports routed through the new adapters.</p>''',
         evidence=[ev(D+'daemon-logger.ts','Logger inputs and rotation'), ev(D+'workspace-daemon.ts','Trace retention consumers'), ev(D+'workspace-daemon-requests.test.ts','Existing trace / result separation','head',770), ev(RECORD,'Diagnostic reasons','head',49)],
         files=[D+'daemon-logger.ts',D+'workspace-daemon.ts',D+'daemon-logger.test.ts','apps/cli/test/e2e/daemon/diagnostic-output.test.ts']),
    dict(id="test-boundary", title="Test-only bridge", status="stated",
         delta='<strong>7 new shared adapters</strong> (plus local logger / spool wrappers) translate legacy test inputs into policy-backed constructors. Unit tests, e2e helpers, cleanup, and the benchmark switch imports. Production gets no compatibility overloads.',
         reason='PR: tests need small thresholds without restoring runtime tuning seams.',
         body=chain(['<b>Test code</b><br>legacy knobs or explicit policy', '<b>Test adapter</b><br>DaemonPolicyTestFactory / policy defaults', '<b>Production consumer</b><br>required policy input'], 'Test-only adapter boundary') +
         table(['New shared helper', 'Bridge'], [
             [ev(T+'daemon-controller.ts','daemon-controller.ts'), 'Stop timeout and controller polling → shutdown section'],
             [ev(T+'daemon-process-terminator.ts','daemon-process-terminator.ts'), 'Numeric signal timeout / polling → shutdown section'],
             [ev(T+'daemon-registry.ts','daemon-registry.ts'), 'Legacy platform / rename arguments + default startup section'],
             [ev(T+'daemon-resource-policy.ts','daemon-resource-policy.ts'), 'Legacy record names projected from central memory derivation'],
             [ev(T+'daemon-startup-coordinator.ts','daemon-startup-coordinator.ts'), 'Termination deadline and observation polling → startup section'],
             [ev(T+'local-daemon-transport.ts','local-daemon-transport.ts'), 'Legacy framing / timeout / output options → policy sections'],
             [ev(T+'workspace-daemon.ts','workspace-daemon.ts'), 'Legacy resource, lifetime, output and trace options → a complete policy'],
         ]) + '''<p>Override construction goes through the existing full-policy validator. Explicit policy slices can also be passed through by several helpers. The exact fixture translations are surfaced separately above; adapting the signatures does not mean every fixture retains the same storage behavior.</p>''',
         evidence=[ev('pr.json','Test-only adapter decision','head'), ev('packages/daemon/src/policy-testing.ts','Existing test factory','head',1), ev(T+'workspace-daemon.ts','Workspace adapter')],
         files=[T+'daemon-controller.ts',T+'daemon-process-terminator.ts',T+'daemon-registry.ts',T+'daemon-resource-policy.ts',T+'daemon-startup-coordinator.ts',T+'local-daemon-transport.ts',T+'workspace-daemon.ts']),
    dict(id="enforcement", title="Enforcement boundary", status="stated",
         delta='The meta-test expands its <strong>retired-name / signature scan</strong> across CLI production sources. It catches listed defaults and bypasses. The existing registry grace argument and transport write-chunk option remain; codecs still take required projected numbers.',
         reason='Central ownership is stated. Retaining those two optional numeric seams is unexplained in the supplied material.',
         body=table(['Boundary', 'Head'], [
             ['Meta-test', 'Scans concatenated app production source text for a list of retired constants, optional threshold spellings, and local policy ownership names. It does not trace value flow.'],
             ['Registry grace override', '<code>startupOwnerIsWithinGrace(owner, graceMs = policy.coordinationGraceMs, now)</code> retains an explicit optional numeric grace argument. Production call sites inspected here omit it. <strong>Unexplained</strong>: no reason found for retaining the override.'],
             ['Transport write chunk', '<code>writeChunkSize?: number</code> remains in the production transport options. It controls how encoded frames are split across socket writes. <strong>Unexplained</strong>: no reason found for retaining this seam.'],
             ['Projected numeric arguments', 'Codec encode / decode, transfer decoder, file reader, and worker response validation require limits as arguments. Production callers project them from policy.'],
             ['Package boundary', '<code>apps/cli → @symnav/daemon</code> remains the import direction. No package dependency file changes in this PR; mechanisms stay app-owned.'],
             ['User configuration', 'The existing no-user-tuning contract remains: no flag, environment variable, or config file for policy thresholds.'],
         ]) + '''<p>The named-string guard is evidence of its specific enforcement mechanism, not proof that every possible numeric bypass is impossible.</p>''',
         evidence=[ev('meta-tests/src/daemon-package.test.ts','Expanded named-string guard'), ev(D+'daemon-registry.ts','Retained grace argument','head',385), ev(D+'local-daemon-transport.ts','Remaining options','head',26), ev(SPEC,'Ownership and no-tuning contract','head',70)],
         files=['meta-tests/src/daemon-package.test.ts',D+'daemon-registry.ts',D+'local-daemon-transport.ts']),
]

# Every import-only test/helper migration has an explicit home in the register.
IMPORT_MIGRATIONS = [
    D+'daemon-command-dispatcher.integration.test.ts', D+'daemon-controller.test.ts',
    D+'daemon-registry.test.ts', D+'local-daemon-transport.test.ts', D+'workspace-daemon.test.ts',
    'apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts',
    *['apps/cli/test/e2e/daemon/'+p+'.test.ts' for p in ['parity','persistent-pressure','state-isolation','status','stop']],
    *[T+p+'.ts' for p in ['daemon-accepted-caller','daemon-live-silent','daemon-malformed-activity','daemon-registry-cleaner','daemon-startup-caller-exit','daemon-startup-mutation-owner','daemon-startup-publisher','e2e-process-cleanup','workspace-daemon-persistent-pressure','workspace-daemon-stuck']],
]
TOPICS[-2]['files'] += IMPORT_MIGRATIONS
