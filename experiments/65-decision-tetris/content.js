window.CONTENT = {
  decisions: [
    {
      id: 'staging', n: '01', title: 'Fill the package; keep the old route.', status: 'Stated',
      summary: '#148 stages the client and six grouped mechanism families. The shipped CLI still uses its own graph; 38 production copies are frozen.',
      reason: 'Separate mechanism ownership from host invocation coordination. — PR #148',
      mechanism: 'The two silhouettes occupy different source packages. They do not mean two running daemons. The freeze test hashes the names and normalized contents of 38 CLI files. It protects the compatibility graph while package-local mechanisms are staged.',
      comparison: ['#148 · CLI → dispatcher → CLI mechanisms', '#148 · package root → staged package mechanisms'],
      sources: ['cli-before','freeze','family-route'], stage: 1, cell: 'route'
    },
    {
      id: 'handoff', n: '02', title: 'Move execution, keep the host.', status: 'Stated',
      summary: '#149 wires CLI invocations and lifecycle controls to DaemonClient, then removes the old mechanism directory. CLI keeps argv/workspace selection, local execution and its injected backend executor.',
      reason: 'Invocation classification and workspace discovery are host responsibilities. — PR #149',
      mechanism: 'The new coordinator chooses a workspace invocation before calling daemonClient.execute. Non-workspace invocations and failed workspace discovery execute locally. The CLI composes the client with its own executor-module URL. The daemon package has no internal package dependencies; the injected host provides the TypeScript/core side.',
      comparison: ['CLI owns selection + executor module URL', 'daemon owns client + process/worker machinery'],
      sources: ['cli-after','coordinator','composition','executor','leaf','absence'], stage: 2, cell: 'route'
    },
    {
      id: 'surface', n: '03', title: 'A small opening on a large body.', status: 'Stated + gap',
      summary: 'The public client has Node-free declarations and dynamically loads its runtime. The final four paths are root, process-entry, worker-entry and testing. Policy serialization becomes internal; the temporary policy-testing path is removed.',
      reason: 'Node-free host declarations and a closed export inventory are stated. The specific API removals have no separate rationale in the inspected PR prose.',
      mechanism: 'DaemonClient delegates to an internal runtime loaded by import(). That is a declaration boundary, not a promise to run daemon mechanisms outside Node. Root and both entry paths already exist in #148; #149 adds testing and seals the final inventory. The hooked cap denotes these affected surfaces, not four newly invented APIs.',
      comparison: ['#148 · root / process-entry / worker-entry', '#149 · same paths + testing; serialization private'],
      sources: ['facade','exports','policy-before','policy-after','manifest-before','manifest-baseline'], stage: 2, cell: 'root'
    },
    {
      id: 'body', n: '04', title: 'The body owns its collaborators.', status: 'Stated',
      summary: 'Transport, process/lifecycle, worker/execution, capture/delivery, resources and registry/diagnostics sit behind the client. Result capture is package-owned; #149 replaces LocalDaemonTransport with focused composition.',
      reason: 'Warm-output cleanup and replay safety belong to the client; split transport owners now share one package boundary. — PRs #148–149',
      mechanism: 'Each body cell groups a responsibility family, with a witness in each package at #148. Output capture is created inside the daemon client rather than supplied by the host. At #149, DaemonTransportFactory composes lifecycle, execution and server collaborators. The board explains source ownership; it does not simulate requests, protocol behavior or lifetimes.',
      comparison: ['Six internal families + the public client', 'One package boundary; several internal owners'],
      sources: ['capture','transport','family-output','family-wire','family-process','family-worker','family-memory','family-state'], stage: 1, cell: 'output'
    },
    {
      id: 'inspection', n: '05', title: 'Tests get a window, not the keys.', status: 'Stated',
      summary: 'External tests and benchmarks use a read-only testing inspector instead of private registry, diagnostic and spool paths. Controlled actors move to daemon and receive an executor URL.',
      reason: 'Expose observations without storage/mutation authority; keep package tests independent of CLI build layout. — PR #149',
      mechanism: 'DaemonTestingInspector returns instance summaries, artifact presence, diagnostic events and spool usage. External tests import the test-only subpath. Controlled package actors receive the executor module URL instead of naming a CLI build artifact. This is the second consumer pin in the lift model.',
      comparison: ['Before · test helpers know private storage', 'After · @symnav/daemon/testing → read-only observations'],
      sources: ['inspector','observation','actors'], stage: 2, cell: 'testing'
    },
    {
      id: 'walls', n: '06', title: 'Turn a promise into a wall.', status: 'Stated',
      summary: 'The freeze check becomes a physical-absence check. Compiler-backed inventories constrain CLI reachability, exports, clock sources and external storage access.',
      reason: 'Ordinary TypeScript syntax must not bypass final ownership rules. — PR #149',
      mechanism: 'The final compatibility test accepts only an absent or empty apps/cli/src/daemon directory. Separate inventories inspect imports, exports, clocks and storage access. The board wall stands for these enforced source boundaries, not filesystem permissions or a runtime security boundary.',
      comparison: ['#148 · keep the 38-file digest fixed', '#149 · the old directory must be empty or absent'],
      sources: ['freeze','absence','reachability','storage','clock-inventory','export-inventory'], stage: 2, cell: 'root'
    },
    {
      id: 'testmove', n: '07', title: 'Move the tests with their owner.', status: 'Stated + gap',
      summary: '#148 relocates 37 co-located mechanism test files. It also serializes daemon test files and adds tsx for development; those exact runner choices have no stated reason in the inspected prose.',
      reason: 'Package ownership is stated. A migration reason alone does not explain fileParallelism: false or the specific dependency choice.',
      mechanism: 'The rename inventory records 37 test files moving from apps/cli/src/daemon to packages/daemon/src. It is a file inventory, not an assertion-equivalence result. The new Vitest configuration disables file parallelism; package.json adds tsx as a development dependency.',
      comparison: ['37 co-located test files change package', 'Separate choices · serial test files + tsx'],
      sources: ['serial','tsx'], stage: 1, cell: 'worker'
    },
    {
      id: 'testgap', n: '08', title: 'Clearing space also removes observations.', status: 'Unexplained',
      summary: '#149 deletes seven built-CLI status scenarios and three stop scenarios, including prompt-status and in-flight-stop observations. Their replacement coverage is not established here.',
      reason: 'The PR explains public test boundaries, but gives no scenario-specific reason for these ten removals.',
      mechanism: 'These ten named scenarios disappear from the two built-CLI test files. Related package tests may cover parts of their contracts; moving the observation point does not, by itself, prove equal coverage. The cut-out witness strip deliberately remains after the old source body is gone. No symnav test suite was run for this artifact.',
      comparison: ['7 status scenarios removed', '3 stop scenarios removed'],
      sources: ['status-old','status-new','stop-old','stop-new'], stage: 2, cell: 'testing'
    }
  ],
  stages: [
    {pr:147, name:'Before the two pieces', verb:'CLI mechanisms already split', description:'Earlier layers have separated the mechanisms inside the CLI. The daemon package already supplies contracts and policy.', route:'CLI-local graph', copies:'Present', room:'Contracts + policy', tag:'BASELINE', title:'The body is still in the CLI.'},
    {pr:148, name:'Stage the body', verb:'Package full. Caller unchanged.', description:'The package gains its own mechanism body and public client. The shipped CLI keeps the compatibility graph; 38 copies are frozen.', route:'CLI-local graph', copies:'38 frozen', room:'Staged mechanisms', tag:'PIECE 01 · STAGING', title:'Both bodies exist. Only one serves this CLI route.'},
    {pr:149, name:'Make the handoff', verb:'Wire the opening. Remove the copies.', description:'The CLI now calls DaemonClient. External tests use the inspector. The old mechanism directory is absent and the boundary is enforced.', route:'DaemonClient', copies:'Absent', room:'Sole mechanism owner', tag:'PIECE 02 · CUTOVER', title:'The caller now pins the package in place.'}
  ]
};
