window.LIGHT_TABLE_READINGS = [
  {
    id:'homes', number:'01', title:'The old image stays live.', status:'mixed',
    summary:'38 CLI mechanism files remain while 38 counterparts gain package homes. The CLI still constructs its local dispatcher, launcher and process graph; it never constructs DaemonClient. Two of the 38 files are type-only contracts in the traced graph.',
    reason:'Stated: separate mechanism ownership from the later host-invocation switch. The 38-file freeze is a source digest, normalized for CRLF. Unexplained: why this particular freeze mechanism was chosen.',
    detail:'Read across a row: base CLI → retained head CLI → added package file. A copied body can be newly owned in the package while its CLI counterpart stays active and compatibility-only. Amber follows relative value imports and literal entry URLs from cli.ts; it is static reachability, not a recorded request. The package root can expose DaemonClient without any CLI construction of it.',
    units:['process--process-coordinator','process--process-launcher','transport--local-transport'],
    receipts:[['bundle:pr',1,7,'Why staging is separate'],['head:apps/cli/src/cli.ts',1,24,'CLI still imports its dispatcher'],['head:apps/cli/src/daemon/daemon-command-dispatcher.ts',278,316,'The dispatcher composes CLI mechanisms'],['head:meta-tests/src/daemon-compatibility-copy.test.ts',8,51,'Exactly 38 normalized source hashes']]
  },
  {
    id:'copy', number:'02', title:'Addition is larger than invention.', status:'stated',
    summary:'43 new production files account for 10,666 of the 14,624 added lines. Of their 38 CLI counterparts, 28 match after import declarations and blank lines are removed. The ten residuals include path/name references, a local spool codec, reusable startup composition, a host readiness probe, output capture injection and new entry destinations. Four client files and a one-line worker entry have no one-file counterpart.',
    reason:'Stated: organize mechanisms by owner and keep daemon production independent of CLI and other internal packages. No one-file counterpart does not mean newly invented behavior; client routing already existed in the dispatcher.',
    detail:'Cyan is exact equality of retained source lines between the two head columns. Inline import types, re-exports, indentation and entry URLs are deliberately NOT normalized, so they can leave small gaps. The base column separately exposes the stabilization edits made before freezing. Equal text is neither equivalent behavior nor evidence of a runtime switch.',
    units:['delivery--completion-spool','registry--startup-coordinator','client--daemon-routing-policy','worker-entry'],
    receipts:[['head:plans/005/daemon-architecture-functional-spec.md',151,167,'Owner-based package layout'],['head:packages/daemon/src/package-boundary.test.ts',12,37,'Production import boundary'],['head:packages/daemon/src/delivery/completion-spool.ts',1,103,'Spool owns its codec'],['head:apps/cli/src/daemon/daemon-command-dispatcher.ts',174,218,'Earlier routing in the CLI']]
  },
  {
    id:'facade', number:'03', title:'A public seam hides Node-backed composition.', status:'stated',
    summary:'DaemonClient exposes execute plus typed start/status/stop overloads; construction dynamically loads the internal runtime. Hosts provide executor factory/module URL, state path, version, readiness probe and optional policy. Public declarations are kept free of Node ambient types; actual execution still needs Node.',
    reason:'Stated: host declarations must not acquire Node ambient dependencies. Boundary tests pin exports, overload return types and reject a Buffer leak.',
    detail:'The magenta rim denotes a new source owner, not a new process. The four client rows create the host-facing seam; the runtime composes registry, transports and lifecycle controllers behind it. Dynamic import happens at construction, not on the first execute call. The host remains the owner of command syntax.',
    units:['client--daemon-client','client--daemon-client-contracts','client--daemon-client-runtime'],
    receipts:[['bundle:pr',56,92,'Public surface and stated reason'],['head:packages/daemon/src/client/daemon-client.ts',13,64,'Dynamic runtime and public methods'],['head:packages/daemon/src/client/daemon-client-contracts.ts',11,36,'Host inputs'],['head:packages/daemon/src/host-contract.test.ts',842,904,'Exact exports and Node-free declarations']]
  },
  {
    id:'routing', number:'04', title:'The client owns the first decision and the last byte.', status:'mixed',
    summary:'Ordered lazy guards stop later observations. Local runs get fresh executors; eligible warm-up runs independently. Only transport-authorized retry may run locally after a warm attempt; accepted/uncertain work is not replayed. The package owns capture, cleanup and controlled failure output. Readiness uses host-supplied argv with cold mode and telemetry off.',
    reason:'Stated: prevent later side effects and keep replay safety and transfer cleanup in the client. Unexplained specifics: persistent lifecycle composition, a separate status timeout, disabled status/stop behavior, and the inherited readiness mode/telemetry settings.',
    detail:'The new client rows are composition, not a replacement of the CLI in this PR. A reusable startup coordinator is passed into control; status gets its own timeout transport. Start returns disabled when daemon use is off, while status and stop still delegate. Missing warm output is disposed when available and becomes a controlled failure; the browser does not execute these branches.',
    units:['client--daemon-client-runtime','client--daemon-routing-policy','process--controller','registry--startup-coordinator','transport--local-transport'],
    receipts:[['head:packages/daemon/src/client/daemon-routing-policy.ts',1,137,'Ordered guard implementation'],['head:packages/daemon/src/client/daemon-client-runtime.ts',78,179,'Composition, routing and control'],['head:packages/daemon/src/client/daemon-client-runtime.ts',181,270,'Warm capture, retry and disposal'],['head:packages/daemon/src/registry/startup-coordinator.ts',468,488,'Host probe forwarding']]
  },
  {
    id:'stabilize', number:'05', title:'The retained graph changed before it was frozen.', status:'mixed',
    summary:'WorkspaceDaemon becomes a process coordinator. Registry centralizes narrow ownership and full-snapshot mutation checks; a daemon clock owns wall and monotonic sources. The coordinator adopts validated coordinates before constructing collaborators, keeps execution/delivery/worker/resource/activity owners separate, and wires callbacks without invoking them. Distinct request-authentication paths are retained.',
    reason:'Stated: one owner per concern, one lock-ownership authority, and daemon-owned time instead of telemetry utilities. Unexplained specifics: coordinate-object shape/validation timing and the differing credentials for normal, execution and special control requests.',
    detail:'Compare the base and retained CLI stations before comparing the two head stations. Stabilization is part of this PR even where both head bodies match. Normal requests check protocol and instance; execution has admission/token handling, while cancel-startup and force-stop have their own instance/token checks. These are source-characterized boundaries, not a security verdict.',
    units:['process--process-coordinator','registry--registry','lifecycle--daemon-clock'],
    receipts:[['head:packages/daemon/src/process/process-coordinator.ts',43,109,'Validated coordinates before collaborators'],['head:packages/daemon/src/process/process-coordinator.ts',137,220,'Separate owners and callback composition'],['head:packages/daemon/src/process/process-coordinator.ts',352,445,'Distinct authentication paths'],['head:packages/daemon/src/registry/registry.ts',842,907,'One ownership comparison'],['head:plans/005/daemon-architecture-functional-spec.md',91,100,'Ownership requirements'],['head:plans/005/daemon-architecture-functional-spec.md',235,240,'Daemon-owned clocks']]
  },
  {
    id:'idle', number:'06', title:'A new clock owner keeps the old idle boundary.', status:'stated',
    summary:'Idle lifetime starts at construction, resets on acceptance, and can expire when the queue becomes idle. It does not gain a fresh completion-based interval here. Readiness-armed and completion-refreshed idle accounting are explicitly deferred.',
    reason:'Stated: preserve acceptance-based timing during extraction; the follow-up spec records both later behavior changes.',
    detail:'The lifecycle bands line up between the two head homes. That alignment expresses source preservation. It says nothing about whether a different idle policy would be preferable. The base-to-head edit substitutes the daemon wall clock while keeping the deadline boundary.',
    units:['lifecycle--daemon-lifetime','lifecycle--daemon-clock','execution--accepted-request-ledger'],
    receipts:[['head:packages/daemon/src/lifecycle/daemon-lifetime.ts',4,45,'Construction and acceptance arm the deadline'],['head:plans/005/daemon-follow-ups-functional-spec.md',173,195,'Two deferred idle-accounting changes'],['bundle:pr',86,92,'Preservation rationale']]
  },
  {
    id:'entries', number:'07', title:'Executable entries move inside the package boundary.', status:'mixed',
    summary:'Package launchers address real process/worker subpaths; entries load the host executor by URL and export no API. The temporary policy-testing export moves into test helpers; its import restriction and two lint checks are removed. New boundary tests pin the package surface.',
    reason:'Stated: the daemon owns entry and launch machinery without knowing the executor’s commands. Unexplained: timing of the policy-testing export and lint-check removal.',
    detail:'The one-line worker-entry.ts forwards to the internal worker entry; it is a new source shim, not another worker. The process entry composes clock, registry, logger, transport and coordinator. The package manifest exposes only the root plus two executable subpaths. Their declarations are side-effect-only.',
    units:['process-entry','worker-entry','process--process-launcher','worker--navigation-worker'],
    receipts:[['head:packages/daemon/package.json',7,31,'Final exports and dependency'],['head:packages/daemon/src/process-entry.ts',1,42,'Package process entry'],['head:packages/daemon/src/worker-entry.ts',1,1,'Worker shim'],['head:packages/daemon/src/entry-boundary.test.ts',36,52,'Side-effect-only entry assertion'],['base:meta-tests/src/lint-rule.test.ts',108,132,'Two former lint checks'],['base:packages/daemon/package.json',7,21,'Temporary export at base']]
  },
  {
    id:'tests', number:'08', title:'Tests cross the boundary; their promises do not all survive.', status:'mixed',
    summary:'37 mechanism test files leave CLI source for the package; generic executors and built-entry integration replace CLI coupling. The old CLI entry test is deleted. A worker-level CLI-version mismatch test becomes a direct CLI factory check, and generic worker readiness drops startup/execution timing assertions. A test dot means a direct test import exists, not coverage or a passing run.',
    reason:'Stated: tests of daemon internals belong with the daemon and must avoid CLI dependency. Unexplained: the changed version-rejection oracle and precise deleted timing assertions. Relocation does not establish equivalent coverage.',
    detail:'Switch to the test film: every retained-CLI station is empty. These are Git-detected moves with edits, not copies. Compare the navigation-worker test at base and head to see the narrower readiness assertion; the CLI factory test remains as a separate rejection oracle. No test percentage is inferred from imports or line similarity.',
    units:['worker--navigation-worker','test--worker--navigation-worker','test--process--process-coordinator'],
    receipts:[['base:apps/cli/src/daemon/daemon-navigation-worker.test.ts',369,435,'Removed worker oracle and timing assertions'],['head:packages/daemon/src/worker/navigation-worker.test.ts',369,411,'Generic worker readiness assertion'],['head:apps/cli/src/daemon-executor.test.ts',27,46,'Direct CLI factory rejection'],['base:apps/cli/src/daemon/daemon-entry.test.ts',31,122,'Deleted CLI entry test'],['head:packages/daemon/test/integration/built-entry-artifacts.test.ts',1,79,'Built-artifact entry evidence']]
  },
  {
    id:'limits', number:'09', title:'Fixture and runner choices carry their own gaps.', status:'unexplained',
    summary:'The package test runner disables file parallelism and adds tsx for source-running helpers. A built-process test treats Windows forced-exit cleanup as observer-owned and expects no process-termination diagnostic there. These are test-source choices, not a Windows trace or a whole-PR correctness verdict.',
    reason:'Unexplained: the exact runner/loader choices and the Windows diagnostic asymmetry. A commit or test can name intended behavior without explaining why it was chosen.',
    detail:'Violet hatching attaches to files implicated in these named rationale gaps. It does not measure the quantity of unexplained code. Search scope for reasons: supplied PR body and commit subjects, architecture specification and changed follow-up specification; no implementing conversation was supplied.',
    units:['process-entry','worker--navigation-worker'],
    receipts:[['head:packages/daemon/vitest.config.ts',1,7,'Serialized test files'],['head:packages/daemon/package.json',26,31,'tsx development dependency'],['head:packages/daemon/test/integration/built-process-entry.test.ts',237,258,'Windows cleanup expectation'],['bundle:pr',132,146,'Commit subjects are intent, not extra rationale']]
  }
];
