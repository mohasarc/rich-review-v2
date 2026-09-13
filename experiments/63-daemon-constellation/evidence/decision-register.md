# Daemon constellation — complete decision register

Scope: PR 148 daemon ownership. These seven readings are the complete stopping layer for this artifact. The source map does not attempt a complete behavioral explanation of the PR.

## 01 — Ownership moved. Invocation did not.

The package gains 43 production source files alongside its 8 existing files. The CLI still composes its own graph: 38 mechanism copies are frozen; its dispatcher and two invocation modules remain CLI-owned.

Stated — staging separates mechanism ownership from the production consumer switch. The exact CRLF-normalized hash is specified; the choice of hashing technique is unexplained.

Source receipts (key in sources.json; inclusive line numbers):

- `bundle:body` · 1–34
- `head:apps/cli/src/daemon/daemon-command-dispatcher.ts` · 276–310
- `head:meta-tests/src/daemon-compatibility-copy.test.ts` · 8–49

## 02 — A public doorway, a private Node runtime.

DaemonClient exposes execute and action-specific start/status/stop overloads. Construction dynamically loads its internal runtime so host declarations stay Node-free. Execution still needs Node. Persistent control composition uses separate status timeouts; disabled start is blocked while status/stop remain available and errors propagate.

Stated — host declarations must avoid Node ambient dependencies. The separate control instances, disabled-control asymmetry and error policy are specified but have no further reason in the examined prose.

Source receipts (key in sources.json; inclusive line numbers):

- `head:packages/daemon/src/client/daemon-client.ts` · 1–64
- `head:packages/daemon/src/client/daemon-client-runtime.ts` · 84–139
- `head:packages/daemon/src/client/daemon-client-runtime.ts` · 168–189
- `head:packages/daemon/src/host-contract.test.ts` · 1–159

## 03 — The launch path now has a package home.

The package exports its root plus real process-entry and worker-entry subpaths. The entries export no named API. Launcher → process → worker forwards a host-supplied executor URL; the host also supplies readiness syntax, run cold with telemetry off. The temporary policy-testing export and its lint checks disappear.

Stated — launch machinery belongs with the daemon; command syntax and executor implementation belong with the host. The exact readiness settings are inherited. The timing of policy-testing removal and deleted lint checks is unexplained.

Source receipts (key in sources.json; inclusive line numbers):

- `head:packages/daemon/package.json` · 8–23
- `head:packages/daemon/src/process/process-launcher.ts` · 139–175
- `head:packages/daemon/src/process-entry.ts` · 1–42
- `head:packages/daemon/src/worker/navigation-worker.ts` · 90–107
- `head:packages/daemon/src/worker/navigation-worker-entry.ts` · 97–110
- `head:packages/daemon/src/client/daemon-client-contracts.ts` · 10–18
- `head:packages/daemon/src/registry/startup-coordinator.ts` · 465–489
- `head:packages/daemon/src/entry-boundary.test.ts` · 35–52
- `base:eslint.config.mjs` · 90–116
- `base:meta-tests/src/lint-rule.test.ts` · 109–130

## 04 — The client owns the route and the result.

Disabled execution returns locally before registry observation. Ordered lazy guards stop at the first route: present → not starting → version → responsive. Cold/fallback calls get a fresh local executor and eligible warm-up runs independently. Only retry-safe transport failure permits local replay. Package capture owns warm output, malformed-output cleanup and controlled failures.

Stated — earlier routing decisions must prevent later side effects; transfer cleanup and replay safety belong to the client. Routing behavior is preserved by the architecture spec.

Source receipts (key in sources.json; inclusive line numbers):

- `head:packages/daemon/src/client/daemon-client-runtime.ts` · 139–168
- `head:packages/daemon/src/client/daemon-routing-policy.ts` · 64–137
- `head:packages/daemon/src/client/daemon-client-runtime.ts` · 190–270

## 05 — A coordinator holds separate mechanisms together.

Process coordination wires execution, delivery, worker generations, resources and activity without calling the supplied callbacks during construction. Registry becomes the startup-ownership authority for narrow coordinates and full mutation snapshots. Validated coordinates are adopted before collaborators. Request authentication retains different normal, execution-token and special-control paths. The package has no production import of another symnav package.

Stated — each concern belongs with its owner; startup ownership has one authority. The coordinate object, validation timing and differing credential sets are characterized without a specific rationale.

Source receipts (key in sources.json; inclusive line numbers):

- `head:packages/daemon/src/process/process-coordinator.ts` · 84–206
- `head:packages/daemon/src/process/process-coordinator.ts` · 351–430
- `head:packages/daemon/src/registry/registry.ts` · 842–879
- `head:packages/daemon/src/process/process-coordinator-construction.test.ts` · 1–222
- `head:packages/daemon/src/package-boundary.test.ts` · 1–37
- `head:plans/005/daemon-architecture-functional-spec.md` · 92–111

## 06 — Time changes owner; idle timing stays put.

The daemon owns injectable wall and monotonic clocks for timestamps, deadlines and durations. Lifetime is armed at construction and reset at navigation acceptance. Readiness and completion do not start a fresh idle window; those lifetime changes are explicitly deferred.

Stated — telemetry should not own the daemon’s clock, and extraction must preserve acceptance-based timing. The follow-up spec keeps readiness/completion changes separate.

Source receipts (key in sources.json; inclusive line numbers):

- `head:packages/daemon/src/lifecycle/daemon-clock.ts` · 1–28
- `head:packages/daemon/src/lifecycle/daemon-lifetime.ts` · 1–60
- `head:packages/daemon/src/lifecycle/daemon-lifetime.test.ts` · 46–70
- `head:plans/005/daemon-follow-ups-functional-spec.md` · 1–110

## 07 — Tests move; some observations change.

37 mechanism test files move into the package, using generic fixtures and built entries. The CLI entry test is removed. Worker-level CLI version rejection becomes a direct CLI factory test; readiness startup/duration assertions are deleted. Windows forced-exit cleanup is modeled as observer-owned without a termination diagnostic. New public/entry boundary tests, serialized Vitest files and tsx helpers accompany the move.

Stated — tests of private mechanisms belong inside their package, and public/entry boundaries must be enforced. The precise deleted assertions, changed version oracle, Windows expectation, test serialization and loader choice have no further prose explanation.

Source receipts (key in sources.json; inclusive line numbers):

- `base:apps/cli/src/daemon/daemon-navigation-worker.test.ts` · 366–434
- `head:packages/daemon/src/worker/navigation-worker.test.ts` · 366–404
- `head:apps/cli/src/daemon-executor.test.ts` · 29–45
- `base:apps/cli/src/daemon/daemon-entry.test.ts` · 1–122
- `head:packages/daemon/test/integration/built-process-entry.test.ts` · 243–263
- `head:packages/daemon/vitest.config.ts` · 1–7
- `head:packages/daemon/package.json` · 27–32

Existing symnav tests were not run. The dependency graph is traced from source, not an observed execution. No human comprehension study was conducted.
