window.CASE_CHAPTERS = [
  {
    id: 'coupling', number: '01', title: 'The host knows too much', subtitle: 'Move the composition burden behind a public client.',
    decisions: [
      { id: 'D01', title: 'Give hosts execute and typed control reports', summary: 'Hosts supply environment, executor factory + module URL, readiness probe, and classified requests. The client returns output + mode or a lifecycle report.', status: 'stated', reason: 'The architecture spec says a host supplies execution and environment, while the daemon owns routing and mechanisms. The PR establishes that package-owned client boundary.', evidence: ['contracts', 'host-spec', 'client-overloads'] },
      { id: 'D02', title: 'Keep declarations free of Node types', summary: 'The façade dynamically loads its Node runtime during construction. Portable declarations do not make execution browser-compatible.', status: 'stated', reason: 'The PR explicitly rejects exposing Node-backed mechanisms because host declarations must not acquire Node ambient dependencies.', evidence: ['facade', 'node-free'] },
      { id: 'D03', title: 'Package the process and worker around injected execution', summary: 'The package owns executable entries and private mechanisms; the host executor still supplies product behavior. The daemon imports no other production symnav package.', status: 'stated', reason: 'The architecture spec requires a self-contained daemon that moves bytes for an injected executor and knows nothing about symbols. PR 148 supplies the package-owned entries.', evidence: ['package-entry', 'worker-entry', 'package-dependency'] },
    ]
  },
  {
    id: 'staging', number: '02', title: 'The old route is still connected', subtitle: 'Ownership is staged before the consumer switches.',
    decisions: [
      { id: 'D04', title: 'Keep the shipped CLI on its compatibility graph', summary: 'The dispatcher and lifecycle registration remain byte-identical to the base. This PR adds the package path; it does not switch those consumers.', status: 'stated', reason: 'The PR says mechanism ownership and host invocation coordination need separate review boundaries, and explicitly leaves the active CLI consumer switch to the next PR.', evidence: ['cli-wiring', 'cli-controls', 'pr-context'] },
      { id: 'D05', title: 'Freeze 38 app-local mechanism files', summary: 'A path-and-content hash freezes the compatibility graph after preparation. It normalizes CRLF; dispatcher, route, and workspace selector are excluded.', status: 'stated', reason: 'The PR explicitly chooses a frozen compatibility graph during staging. The portable hashing commit and its test require checkout line endings not to alter that freeze.', evidence: ['freeze'] },
      { id: 'D06', title: 'Group mechanisms by the concern they own', summary: 'Client, process, registry, transport, execution, delivery, worker, resources, diagnostics, and lifecycle become package folders. The coordinator is renamed before copying.', status: 'stated', reason: 'The architecture spec assigns these concerns to the daemon, and names the process-coordinator split. The commits explicitly stage and organize mechanism copies by ownership.', evidence: ['spec-scope', 'coordinator-options'] },
    ]
  },
  {
    id: 'routing', number: '03', title: 'The first answer ends the search', subtitle: 'Order determines which observations can happen.',
    decisions: [
      { id: 'D07', title: 'Use four ordered, lazy routing guards', summary: 'Record present → not starting → version → responsive. Read and observation are memoized; a decision prevents every later guard and its effects.', status: 'stated', reason: 'The PR explicitly chooses ordered lazy guards because the first routing decision must prevent all later side effects.', evidence: ['guards', 'routing-context'] },
      { id: 'D08', title: 'Keep the route and local-execution distinctions', summary: 'Disabled, absent, starting, or recovering run cold; ready/busy run warm; dead/incompatible fall back. Only absent/fallback routing decisions trigger independent warmup. Local attempts get fresh executors. Errors and exact-process cleanup keep their distinct routes.', status: 'stated', reason: 'The architecture spec requires identical execution mode and lifecycle outcomes. The unchanged CLI dispatcher contains the prior route tree; new characterization tests pin the corresponding effects.', evidence: ['routing-outcomes', 'execute-runtime', 'local-execution', 'route-characterization'] },
      { id: 'D09', title: 'Compose lifecycle once, with a separate status timeout', summary: 'Disabled blocks start; status and stop still operate. The host supplies the readiness command, which still runs through execution. Control failures reject to the host wrapper.', status: 'stated', reason: 'The host interaction contract assigns lifecycle composition to the daemon and product execution to the host. Preserving lifecycle behavior is explicit; control-plane readiness is deferred in the follow-up spec.', evidence: ['runtime-composition', 'runtime-control', 'readiness', 'control-tests'] },
    ]
  },
  {
    id: 'delivery', number: '04', title: 'A missing answer is not permission to replay', subtitle: 'The client owns the boundary between a retry and a second execution.',
    decisions: [
      { id: 'D10', title: 'Let transport retry-safety authorize fallback', summary: 'A retry-safe warm submission failure gets one local fallback. An uncertain or accepted failure stays warm and produces a controlled failure instead of replay.', status: 'stated', reason: 'The PR assigns replay safety to the client. The architecture spec also calls for one retry-safety owner and unchanged failure paths; the runtime consumes DaemonTransportError.retrySafe.', evidence: ['warm-runtime', 'retry-tests'] },
      { id: 'D11', title: 'Own warm output capture inside the package', summary: 'Each transfer gets a fresh policy-limited capture, using memory then an OS-temporary spool. The returned output still has records() and dispose(); the host does not provide capture factories.', status: 'stated', reason: 'The PR explicitly chooses package-owned result capture over host-provided storage because warm-transfer cleanup belongs to the daemon client.', evidence: ['runtime-composition', 'capture', 'capture-output', 'capture-tests'] },
      { id: 'D12', title: 'Own failure output and malformed-result cleanup', summary: 'Resource, response-capacity, and incomplete-request failures become stderr + exit 1. A missing output or non-integer exit code is incomplete; any available malformed output is disposed.', status: 'stated', reason: 'The PR explicitly chooses controlled failure outputs owned by the client. The missing-warm-output commit and tests characterize incomplete output without replay.', evidence: ['controlled-output', 'warm-runtime', 'malformed-output'] },
    ]
  },
  {
    id: 'authority', number: '05', title: 'Who is allowed to act?', subtitle: 'Centralize authority while preserving the old timing and authentication rules.',
    decisions: [
      { id: 'D13', title: 'Validate adopted coordinates inside the coordinator', summary: 'The renamed coordinator takes coordinates, a serving port, a workspace-exists callback, and an explicit clock. Identity mismatches fail before component setup; that placement has no stated rationale.', status: 'unexplained', reason: 'Renaming and splitting the coordinator are stated architectural work. The supplied commits and construction tests specify early coordinate validation, but do not explain choosing this placement over entry-only validation.', evidence: ['coordinator-options', 'coordinator-validation', 'construction-tests', 'old-entry'] },
      { id: 'D14', title: 'Give registry startup equality one owner', summary: 'Callers request named identity/instance/token/PID checks. One predicate compares the requested coordinates; exact-owner cleanup also compares timestamps and revision.', status: 'stated', reason: 'The architecture spec explicitly requires one owner of lock-ownership checks. The commits centralize registry ownership and narrow the coordinates required by each operation.', evidence: ['registry-callers', 'registry-predicate', 'registry-tests'] },
      { id: 'D15', title: 'Pin the existing authentication order and exceptions', summary: 'Execution checks protocol/instance before token. Identify/terminate/kill use identity credentials; ping/stop still omit token checks. No reason for that asymmetry was found.', status: 'unexplained', reason: 'The preservation requirement explains retaining existing behavior. The added authentication tests specify the order and exceptions, but neither the supplied PR rationale nor commit bodies explain the asymmetric credential requirements.', evidence: ['authentication', 'authentication-tests'] },
      { id: 'D16', title: 'Use a daemon-owned clock API', summary: 'Daemon mechanisms stop using telemetry clocks and raw time sources. Wall time still owns persisted/lifetime deadlines; monotonic time owns elapsed execution and queue measurements.', status: 'stated', reason: 'The architecture spec assigns the clock to a self-contained daemon. The clock commits remove the telemetry dependency while the behavior-preservation guarantee keeps the existing time semantics.', evidence: ['clock', 'clock-consumers', 'lifetime'] },
      { id: 'D17', title: 'Defer readiness- and completion-based idle timing', summary: 'Idle time starts in the constructor and resets at navigation acceptance. Long startup or a long completed turn can exhaust it. Ready/completion resets are written down as future behavior.', status: 'stated', reason: 'The PR explicitly preserves acceptance-based timing because readiness- and completion-based lifetime changes are deferred. Both desired changes are added to the follow-up functional spec.', evidence: ['lifetime', 'lifetime-test', 'idle-follow-ups'] },
    ]
  },
  {
    id: 'witnesses', number: '06', title: 'The witnesses changed too', subtitle: 'Test ownership is part of the extraction, with visible scope changes.',
    decisions: [
      { id: 'D18', title: 'Move 37 mechanism test files into the daemon package', summary: 'Package tests use generic executor fixtures and local helpers, including standalone module fixtures and tsx tooling. CLI product behavior stays with CLI tests.', status: 'stated', reason: 'The architecture spec requires the daemon to know nothing about product navigation. Commits explicitly relocate mechanism tests, retire app-owned copies, and make executor fixtures package-independent.', evidence: ['generic-test', 'generic-fixture', 'package-manifest'] },
      { id: 'D19', title: 'Narrow the relocated worker test', summary: 'Generic readiness replaces the CLI version scenario and drops startup/execution duration assertions. Version rejection returns as a direct CLI-factory test, losing the former worker-initialization assertion.', status: 'unexplained', reason: 'Package-independent fixtures are explicitly chosen. No separate explanation was found for dropping these timing assertions or replacing the full worker/version failure assertion with a direct factory rejection check.', evidence: ['worker-test-diff', 'cli-version-test'] },
      { id: 'D20', title: 'Replace the mocked CLI entry tests with built-entry evidence', summary: 'The CLI entry test file is deleted. New package tests exercise compiled worker, launcher, process initialization, and cleanup. They test a different boundary, not the same mock assertions.', status: 'stated', reason: 'The commits explicitly prove built entry resolution and process execution while retiring app-owned mechanism tests. The PR describes the generic executor and built-entry integration fixtures.', evidence: ['deleted-entry-test', 'built-process', 'built-worker', 'built-launcher'] },
      { id: 'D21', title: 'Retire policy-testing exports and their lint guard', summary: 'The export map becomes root + two side-effect-only entries. Policy helpers move to test folders; the old import restriction and its positive/negative tests are deleted.', status: 'unexplained', reason: 'The removed subpath and replacement exact export map are visible, and the old subpath was explicitly temporary. No separate rationale was found for the precise enforcement and test deletion choices.', evidence: ['package-manifest', 'lint-diff', 'lint-test-diff', 'entry-exports', 'host-testing-diff'] },
      { id: 'D22', title: 'Add a clock-ownership scan limited to one folder', summary: 'The new test scans only siblings of lifecycle/daemon-clock.test.ts. Process, registry, worker, and execution folders are outside its scope.', status: 'unexplained', reason: 'No rationale was found for a non-recursive scan after organizing mechanisms into ownership folders. This is the scope of a new test; the base had no equivalent production-source scan.', evidence: ['clock-scan'] },
      { id: 'D23', title: 'Disable parallel execution of package test files', summary: 'The new Vitest configuration sets fileParallelism: false. No explanation accompanies this choice.', status: 'unexplained', reason: 'The setting lands in “Relocate daemon mechanism ownership tests.” That commit has no body, and neither the PR decisions nor supplied specs explain serializing the package suite.', evidence: ['vitest'] },
      { id: 'D24', title: 'Give Windows termination a different cleanup assertion', summary: 'The built-process test permits a retained record and absent termination diagnostic on Windows, then has its caller remove the exited record. Other platforms expect process cleanup.', status: 'unexplained', reason: 'The last commit explicitly specifies Windows cleanup ownership, but supplies no body explaining the platform distinction. This page records the asserted behavior without inferring the author’s reason.', evidence: ['windows-cleanup'] },
    ]
  }
];

window.CASE_REFERENCES = {
  'contracts': ['head', 'packages/daemon/src/client/daemon-client-contracts.ts', 10, 36, 'The complete host contract'],
  'host-spec': ['head', 'plans/005/daemon-architecture-functional-spec.md', 113, 132, 'Host interaction contract'],
  'client-overloads': ['head', 'packages/daemon/src/client/daemon-client.ts', 39, 64, 'Typed lifecycle overloads'],
  'facade': ['head', 'packages/daemon/src/client/daemon-client.ts', 20, 46, 'Dynamic load starts in the constructor'],
  'node-free': ['head', 'packages/daemon/src/host-contract.test.ts', 880, 902, 'Node-free declarations and Buffer-leak negative control'],
  'package-entry': ['head', 'packages/daemon/src/process-entry.ts', 11, 42, 'Package process entry composition'],
  'worker-entry': ['head', 'packages/daemon/src/worker/navigation-worker.ts', 89, 112, 'Package-relative worker entry'],
  'package-dependency': ['head', 'packages/daemon/src/package-boundary.test.ts', 14, 37, 'Production import boundary scan'],
  'cli-wiring': ['head', 'apps/cli/src/daemon/daemon-command-dispatcher.ts', 277, 300, 'Shipped CLI still constructs mechanisms'],
  'cli-controls': ['head', 'apps/cli/src/commands/daemon/register-daemon-command.ts', 50, 88, 'Lifecycle registration still composes the CLI graph'],
  'pr-context': ['pr', '', 1, 1, 'Author’s context and decisions'],
  'freeze': ['head', 'meta-tests/src/daemon-compatibility-copy.test.ts', 8, 77, '38 files, exclusions, and normalized digest'],
  'spec-scope': ['head', 'plans/005/daemon-architecture-functional-spec.md', 85, 101, 'Required mechanism ownership'],
  'coordinator-options': ['head', 'packages/daemon/src/process/process-coordinator.ts', 43, 98, 'Narrow coordinator inputs and construction order'],
  'guards': ['head', 'packages/daemon/src/client/daemon-routing-policy.ts', 122, 137, 'Ordered guard list and first return'],
  'routing-context': ['head', 'packages/daemon/src/client/daemon-routing-policy.ts', 29, 64, 'Memoized read and observation'],
  'routing-outcomes': ['head', 'packages/daemon/src/client/daemon-routing-policy.ts', 66, 120, 'Guard outcomes and cleanup'],
  'execute-runtime': ['head', 'packages/daemon/src/client/daemon-client-runtime.ts', 139, 159, 'Disabled route and independent warmup'],
  'local-execution': ['head', 'packages/daemon/src/client/daemon-client-runtime.ts', 217, 228, 'A new host executor for each local attempt'],
  'route-characterization': ['head', 'packages/daemon/src/client/daemon-client.test.ts', 34, 125, 'Route and side-effect characterization table'],
  'runtime-composition': ['head', 'packages/daemon/src/client/daemon-client-runtime.ts', 85, 137, 'Capture, startup, and two lifecycle transports'],
  'runtime-control': ['head', 'packages/daemon/src/client/daemon-client-runtime.ts', 161, 179, 'Disabled start; status and stop remain available'],
  'readiness': ['head', 'packages/daemon/src/registry/startup-coordinator.ts', 468, 488, 'Host readiness probe still uses execution'],
  'control-tests': ['head', 'packages/daemon/src/client/daemon-client-control.test.ts', 12, 73, 'Distinct timeouts and propagated errors'],
  'warm-runtime': ['head', 'packages/daemon/src/client/daemon-client-runtime.ts', 181, 215, 'Warm submission, retry, completion, and cleanup'],
  'retry-tests': ['head', 'packages/daemon/src/client/daemon-client.test.ts', 187, 231, 'Retry-safe fallback and uncertain failure'],
  'capture': ['head', 'packages/daemon/src/transport/client-result-capture.ts', 39, 80, 'Capture configuration and capacity checks'],
  'capture-output': ['head', 'packages/daemon/src/transport/client-result-capture.ts', 80, 141, 'Capture result, spill, and disposal'],
  'capture-tests': ['head', 'packages/daemon/src/client/daemon-client.test.ts', 151, 168, 'Fresh OS-temporary captures'],
  'controlled-output': ['head', 'packages/daemon/src/client/daemon-client-runtime.ts', 40, 72, 'Three package-owned failure messages'],
  'malformed-output': ['head', 'packages/daemon/src/client/daemon-client-runtime.ts', 251, 269, 'Completion validation and malformed output disposal'],
  'coordinator-validation': ['head', 'packages/daemon/src/process/process-coordinator.ts', 541, 555, 'Coordinates checked against the workspace identity'],
  'construction-tests': ['head', 'packages/daemon/src/process/process-coordinator-construction.test.ts', 64, 99, 'Mismatch rejection before component observation'],
  'old-entry': ['base', 'apps/cli/src/daemon/daemon-entry.ts', 10, 47, 'Prior validation lived in the CLI entry'],
  'registry-callers': ['head', 'packages/daemon/src/registry/registry.ts', 426, 467, 'Named startup ownership queries'],
  'registry-predicate': ['head', 'packages/daemon/src/registry/registry.ts', 842, 862, 'The canonical requested-coordinate predicate'],
  'registry-tests': ['head', 'packages/daemon/src/registry/registry.test.ts', 578, 602, 'Exact-owner stale-coordinate cases'],
  'authentication': ['head', 'packages/daemon/src/process/process-coordinator.ts', 353, 439, 'Process request authentication and dispatch'],
  'authentication-tests': ['head', 'packages/daemon/src/process/process-coordinator-requests.test.ts', 242, 303, 'Ordering and tokenless ping/stop assertions'],
  'clock': ['head', 'packages/daemon/src/lifecycle/daemon-clock.ts', 1, 28, 'Wall and monotonic daemon clock sources'],
  'clock-consumers': ['head', 'packages/daemon/src/process/process-coordinator.ts', 84, 100, 'Injected clock reaches queue and ledger'],
  'lifetime': ['head', 'packages/daemon/src/lifecycle/daemon-lifetime.ts', 11, 60, 'Constructor and acceptance own the idle deadline'],
  'lifetime-test': ['head', 'packages/daemon/src/lifecycle/daemon-lifetime.test.ts', 46, 62, 'Long-turn timing is explicitly preserved'],
  'idle-follow-ups': ['head', 'plans/005/daemon-follow-ups-functional-spec.md', 175, 193, 'Ready- and completion-based timing are future work'],
  'generic-test': ['head', 'packages/daemon/src/worker/navigation-worker.test.ts', 369, 407, 'The relocated generic executor test'],
  'generic-fixture': ['head', 'packages/daemon/test/fixtures/executor-module.ts', 1, 43, 'Standalone fixture contracts'],
  'package-manifest': ['head', 'packages/daemon/package.json', 1, 36, 'Root, executable entries, and test dependencies'],
  'worker-test-diff': ['diff', 'packages/daemon/src/worker/navigation-worker.test.ts', 1, 1, 'Removed worker/version and duration assertions'],
  'cli-version-test': ['head', 'apps/cli/src/daemon-executor.test.ts', 32, 41, 'Version rejection is now asserted on the CLI factory'],
  'deleted-entry-test': ['diff', 'apps/cli/src/daemon/daemon-entry.test.ts', 1, 1, 'Deleted mocked entry tests'],
  'built-process': ['head', 'packages/daemon/test/integration/built-process-entry.test.ts', 212, 252, 'Compiled process entry and exact-once initialization'],
  'built-worker': ['head', 'packages/daemon/test/integration/built-entry-artifacts.test.ts', 15, 58, 'Compiled package worker execution'],
  'built-launcher': ['head', 'packages/daemon/test/integration/built-process-launcher.test.ts', 25, 61, 'Launcher resolves the package entry'],
  'lint-diff': ['diff', 'eslint.config.mjs', 1, 1, 'Removed subpath import restriction'],
  'lint-test-diff': ['diff', 'meta-tests/src/lint-rule.test.ts', 1, 1, 'Removed allow/reject lint assertions'],
  'entry-exports': ['head', 'packages/daemon/src/entry-boundary.test.ts', 39, 52, 'Entry sources and declarations export no names'],
  'host-testing-diff': ['diff', 'packages/daemon/src/host-contract.test.ts', 1, 1, 'Temporary policy-testing assertions retired'],
  'clock-scan': ['head', 'packages/daemon/src/lifecycle/daemon-clock.test.ts', 36, 49, 'Only same-directory siblings are scanned'],
  'vitest': ['head', 'packages/daemon/vitest.config.ts', 1, 7, 'Package file parallelism disabled'],
  'windows-cleanup': ['head', 'packages/daemon/test/integration/built-process-entry.test.ts', 242, 260, 'Windows caller owns exited-record removal'],
};
