export const readings = [
  {
    id:'two-homes', number:'01', title:'Ownership moved. Invocation did not.', short:'Two homes',
    summary:'The package gains 43 production source files alongside its 8 existing files. The CLI still composes its own graph: 38 mechanism copies are frozen; its dispatcher and two invocation modules remain CLI-owned.',
    reason:'Stated — staging separates mechanism ownership from the production consumer switch. The exact CRLF-normalized hash is specified; the choice of hashing technique is unexplained.',
    focus:['c:daemon-command-dispatcher','c:daemon-registry','c:local-daemon-transport','c:daemon-process-launcher','c:daemon-startup-coordinator'],
    anchor:'c:daemon-command-dispatcher',
    caption:'Follow the amber dependencies. The dispatcher constructs CLI-local collaborators. There is no dispatcher → DaemonClient edge in this snapshot.',
    sources:[['bundle:body',1,34],['head:apps/cli/src/daemon/daemon-command-dispatcher.ts',276,310],['head:meta-tests/src/daemon-compatibility-copy.test.ts',8,49]],
    challenge:'Does a dim star mean the CLI has stopped running it?', answer:'No. Dimness marks frozen compatibility ownership. The CLI still constructs these collaborators.'
  },
  {
    id:'facade', number:'02', title:'A public doorway, a private Node runtime.', short:'Public doorway',
    summary:'DaemonClient exposes execute and action-specific start/status/stop overloads. Construction dynamically loads its internal runtime so host declarations stay Node-free. Execution still needs Node. Persistent control composition uses separate status timeouts; disabled start is blocked while status/stop remain available and errors propagate.',
    reason:'Stated — host declarations must avoid Node ambient dependencies. The separate control instances, disabled-control asymmetry and error policy are specified but have no further reason in the examined prose.',
    focus:['p:client/daemon-client','p:client/daemon-client-runtime','p:client/daemon-client-contracts','p:process/controller'], anchor:'p:client/daemon-client',
    caption:'The dashed dependency is a runtime import, started by the constructor. The public declaration boundary and the runtime environment are different boundaries.',
    sources:[['head:packages/daemon/src/client/daemon-client.ts',1,64],['head:packages/daemon/src/client/daemon-client-runtime.ts',84,139],['head:packages/daemon/src/client/daemon-client-runtime.ts',168,189],['head:packages/daemon/src/host-contract.test.ts',1,159]],
    challenge:'Do Node-free host declarations make the daemon executable in a browser?', answer:'No. The public types avoid Node ambient dependencies; the dynamically loaded implementation uses Node.'
  },
  {
    id:'entries', number:'03', title:'The launch path now has a package home.', short:'Executable entries',
    summary:'The package exports its root plus real process-entry and worker-entry subpaths. The entries export no named API. Launcher → process → worker forwards a host-supplied executor URL; the host also supplies readiness syntax, run cold with telemetry off. The temporary policy-testing export and its lint checks disappear.',
    reason:'Stated — launch machinery belongs with the daemon; command syntax and executor implementation belong with the host. The exact readiness settings are inherited. The timing of policy-testing removal and deleted lint checks is unexplained.',
    focus:['p:process/process-launcher','p:process-entry','p:process/process-coordinator','p:worker/navigation-worker','p:worker-entry','p:worker/navigation-worker-entry','p:daemon-executor'], anchor:'p:process-entry',
    caption:'Dashed arrows cross launch or load boundaries. These are source-traced dependencies, not an observed startup sequence. The executor URL is supplied; no package import of the CLI is introduced.',
    sources:[['head:packages/daemon/package.json',8,23],['head:packages/daemon/src/process/process-launcher.ts',139,175],['head:packages/daemon/src/process-entry.ts',1,42],['head:packages/daemon/src/worker/navigation-worker.ts',90,107],['head:packages/daemon/src/worker/navigation-worker-entry.ts',97,110],['head:packages/daemon/src/client/daemon-client-contracts.ts',10,18],['head:packages/daemon/src/registry/startup-coordinator.ts',465,489],['head:packages/daemon/src/entry-boundary.test.ts',35,52],['base:eslint.config.mjs',90,116],['base:meta-tests/src/lint-rule.test.ts',109,130]],
    challenge:'Is every circle a process?', answer:'No. Circles enclose source directories. Only the dashed launcher and worker-creation dependencies denote starting another process or thread.'
  },
  {
    id:'routing', number:'04', title:'The client owns the route and the result.', short:'Client authority',
    summary:'Disabled execution returns locally before registry observation. Ordered lazy guards stop at the first route: present → not starting → version → responsive. Cold/fallback calls get a fresh local executor and eligible warm-up runs independently. Only retry-safe transport failure permits local replay. Package capture owns warm output, malformed-output cleanup and controlled failures.',
    reason:'Stated — earlier routing decisions must prevent later side effects; transfer cleanup and replay safety belong to the client. Routing behavior is preserved by the architecture spec.',
    focus:['p:client/daemon-client-runtime','p:client/daemon-routing-policy','p:registry/registry','p:registry/record-observer','p:registry/startup-coordinator','p:transport/local-transport','p:transport/client-result-capture'], anchor:'p:client/daemon-client-runtime',
    caption:'One runtime composes routing, registry, startup and capture. The links show possible dependence, not a claim that every route touches every collaborator.',
    sources:[['head:packages/daemon/src/client/daemon-client-runtime.ts',139,168],['head:packages/daemon/src/client/daemon-routing-policy.ts',64,137],['head:packages/daemon/src/client/daemon-client-runtime.ts',190,270]],
    challenge:'Can the host rerun uncertain accepted work simply because a warm response failed?', answer:'The client permits local retry only when the transport marks the failure retry-safe. Uncertain or accepted work produces a controlled warm failure.'
  },
  {
    id:'owners', number:'05', title:'A coordinator holds separate mechanisms together.', short:'Private owners',
    summary:'Process coordination wires execution, delivery, worker generations, resources and activity without calling the supplied callbacks during construction. Registry becomes the startup-ownership authority for narrow coordinates and full mutation snapshots. Validated coordinates are adopted before collaborators. Request authentication retains different normal, execution-token and special-control paths. The package has no production import of another symnav package.',
    reason:'Stated — each concern belongs with its owner; startup ownership has one authority. The coordinate object, validation timing and differing credential sets are characterized without a specific rationale.',
    focus:['p:process/process-coordinator','p:execution/accepted-execution-session','p:delivery/delivery-session','p:worker/worker-generation-manager','p:resources/resource-supervisor','p:registry/registry','p:process/activity-projector'], anchor:'p:process/process-coordinator',
    caption:'The process coordinator is the construction center, not the owner of every mechanism’s internals. The surrounding directory rings separate those responsibilities.',
    sources:[['head:packages/daemon/src/process/process-coordinator.ts',84,206],['head:packages/daemon/src/process/process-coordinator.ts',351,430],['head:packages/daemon/src/registry/registry.ts',842,879],['head:packages/daemon/src/process/process-coordinator-construction.test.ts',1,222],['head:packages/daemon/src/package-boundary.test.ts',1,37],['head:plans/005/daemon-architecture-functional-spec.md',92,111]],
    challenge:'Does a package-owned process coordinator erase the execution and delivery boundaries?', answer:'No. It constructs and connects separate execution and delivery sessions, worker management and resource supervision.'
  },
  {
    id:'clock', number:'06', title:'Time changes owner; idle timing stays put.', short:'Clock ownership',
    summary:'The daemon owns injectable wall and monotonic clocks for timestamps, deadlines and durations. Lifetime is armed at construction and reset at navigation acceptance. Readiness and completion do not start a fresh idle window; those lifetime changes are explicitly deferred.',
    reason:'Stated — telemetry should not own the daemon’s clock, and extraction must preserve acceptance-based timing. The follow-up spec keeps readiness/completion changes separate.',
    focus:['p:process-entry','p:lifecycle/daemon-clock','p:process/process-coordinator','p:lifecycle/daemon-lifetime','c:daemon-clock','c:daemon-lifetime'], anchor:'p:lifecycle/daemon-clock',
    caption:'Clock and lifetime sit inside lifecycle/. Their new home does not mean a new idle policy. Select a counterpart to compare the two source homes.',
    sources:[['head:packages/daemon/src/lifecycle/daemon-clock.ts',1,28],['head:packages/daemon/src/lifecycle/daemon-lifetime.ts',1,60],['head:packages/daemon/src/lifecycle/daemon-lifetime.test.ts',46,70],['head:plans/005/daemon-follow-ups-functional-spec.md',1,110]],
    challenge:'Does finishing a long navigation buy a new full idle window here?', answer:'No. The retained deadline is based on acceptance; finishing work does not reset it. This PR records a future behavior change separately.'
  },
  {
    id:'evidence', number:'07', title:'Tests move; some observations change.', short:'Evidence boundary',
    summary:'37 mechanism test files move into the package, using generic fixtures and built entries. The CLI entry test is removed. Worker-level CLI version rejection becomes a direct CLI factory test; readiness startup/duration assertions are deleted. Windows forced-exit cleanup is modeled as observer-owned without a termination diagnostic. New public/entry boundary tests, serialized Vitest files and tsx helpers accompany the move.',
    reason:'Stated — tests of private mechanisms belong inside their package, and public/entry boundaries must be enforced. The precise deleted assertions, changed version oracle, Windows expectation, test serialization and loader choice have no further prose explanation.',
    focus:['p:worker/navigation-worker','p:process-entry','p:worker-entry','p:client/daemon-client','c:daemon-navigation-worker'], anchor:'p:worker/navigation-worker',
    caption:'The stars are production files. Tests are source receipts attached to the ownership decisions, not extra runtime stars. Existing symnav tests were not run for this artifact.',
    sources:[['base:apps/cli/src/daemon/daemon-navigation-worker.test.ts',366,434],['head:packages/daemon/src/worker/navigation-worker.test.ts',366,404],['head:apps/cli/src/daemon-executor.test.ts',29,45],['base:apps/cli/src/daemon/daemon-entry.test.ts',1,122],['head:packages/daemon/test/integration/built-process-entry.test.ts',243,263],['head:packages/daemon/vitest.config.ts',1,7],['head:packages/daemon/package.json',27,32]],
    challenge:'Do 37 moved test files establish unchanged coverage?', answer:'No. This move also deletes timing assertions and changes the version-rejection oracle. File movement is not equivalent to preservation of every observation.'
  }
];
