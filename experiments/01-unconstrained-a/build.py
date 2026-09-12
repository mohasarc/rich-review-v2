"""Build an offline decision atlas from the supplied snapshots. No worktree writes."""
from pathlib import Path
import json, re, hashlib, subprocess, collections, shutil

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
EVIDENCE = HERE / 'evidence'
EVIDENCE.mkdir(exist_ok=True)
stack = json.loads((ROOT / 'inputs/stack/pr.json').read_text())
prs = stack['pullRequests']
documents = {}

def document(key, path, version='stack-head'):
    file = ROOT / 'worktrees' / version / path
    text = file.read_text()
    documents[key] = dict(title=path, version=version, text=text,
                          sha256=hashlib.sha256(text.encode()).hexdigest())
    return key

def line(key, needle):
    for i, text in enumerate(documents[key]['text'].splitlines(), 1):
        if needle in text: return i
    raise ValueError((key, needle))

sources = {
    123: ('source-cache', 'packages/core/src/workspace/workspace-source-cache.ts'),
    124: ('revision-state', 'packages/core/src/backend/revisioned-backend-state.ts'),
    126: ('project-graph', 'packages/core/src/workspace/project-graph.ts'),
    127: ('turn-scope', 'packages/core/src/backend/turn-scoped-cache-scope.ts'),
    128: ('workspace-session', 'packages/core/src/workspace/workspace-session.ts'),
    129: ('state-directory', 'apps/cli/src/state-directory-resolver.ts'),
    130: ('policy-source', 'packages/daemon/src/daemon-policy.ts'),
    131: ('client-runtime', 'packages/daemon/src/client/daemon-client-runtime.ts'),
    132: ('command-name', 'packages/daemon/src/daemon-command-name.ts'),
    133: ('execution-failures', 'packages/daemon/src/daemon-execution-failure.ts'),
    134: ('admission', 'packages/daemon/src/daemon-admission.ts'),
    135: ('worker-entry', 'packages/daemon/src/worker/navigation-worker-entry.ts'),
    136: ('renderer', 'packages/renderer/src/lifecycle/daemon-lifecycle-renderer.ts'),
    137: ('wire-codec', 'packages/daemon/src/transport/wire-codec.ts'),
    138: ('result-receiver', 'packages/daemon/src/transport/result-transfer-receiver.ts'),
    139: ('socket-client', 'packages/daemon/src/transport/socket-client.ts'),
    140: ('lifecycle-client', 'packages/daemon/src/transport/lifecycle-client.ts'),
    141: ('socket-server', 'packages/daemon/src/transport/socket-server.ts'),
    142: ('execution-client', 'packages/daemon/src/transport/execution-client.ts'),
    143: ('transport', 'packages/daemon/src/transport/daemon-transport.ts'),
    144: ('activity', 'packages/daemon/src/process/activity-projector.ts'),
    145: ('generation', 'packages/daemon/src/worker/worker-generation-manager.ts'),
    146: ('delivery', 'packages/daemon/src/delivery/delivery-session.ts'),
    147: ('accepted', 'packages/daemon/src/execution/accepted-execution-session.ts'),
    148: ('client', 'packages/daemon/src/client/daemon-client.ts'),
    149: ('coordinator', 'apps/cli/src/cli-invocation-coordinator.ts'),
}
for key, path in sources.values(): document(key, path)
extras = {
    'architecture-spec': 'plans/005/daemon-architecture-functional-spec.md',
    'policy-record': 'plans/005/daemon-policy.md',
    'follow-ups': 'plans/005/daemon-follow-ups-functional-spec.md',
    'final-public-root': 'packages/daemon/src/index.ts',
    'manifest': 'packages/daemon/package.json',
    'client-contracts': 'packages/daemon/src/client/daemon-client-contracts.ts',
    'routing-policy': 'packages/daemon/src/client/daemon-routing-policy.ts',
    'lifetime': 'packages/daemon/src/lifecycle/daemon-lifetime.ts',
    'control-command': 'apps/cli/src/commands/daemon/register-daemon-command.ts',
    'control-tests': 'apps/cli/src/commands/daemon/register-daemon-command.test.ts',
    'template-after': '.github/PULL_REQUEST_TEMPLATE.md',
    'status-after': 'apps/cli/test/e2e/daemon/status.test.ts',
    'stop-after': 'apps/cli/test/e2e/daemon/stop.test.ts',
    'peers-after': 'packages/daemon/test/integration/adversarial-daemon-peers.test.ts',
    'process-tests': 'packages/daemon/src/process/process-coordinator.test.ts',
    'controller-tests': 'packages/daemon/src/process/controller.test.ts',
    'startup-tests': 'packages/daemon/src/registry/startup-coordinator.test.ts',
    'session-tests': 'packages/core/src/workspace/workspace-session.test.ts',
    'source-cache-tests': 'packages/core/src/workspace/workspace-source-cache.test.ts',
    'inspector': 'packages/daemon/src/testing/daemon-testing-inspector.ts',
    'contracts': 'packages/daemon/src/transport/contracts.ts',
    'executor': 'apps/cli/src/daemon-executor.ts',
    'clock-source': 'packages/daemon/src/lifecycle/daemon-clock.ts',
    'registry-source': 'packages/daemon/src/registry/registry.ts',
}
for key, path in extras.items(): document(key, path)
for key, path in [('template-before','.github/PULL_REQUEST_TEMPLATE.md'),
                  ('status-before','apps/cli/test/e2e/daemon/status.test.ts'),
                  ('stop-before','apps/cli/test/e2e/daemon/stop.test.ts'),
                  ('control-before','apps/cli/src/commands/daemon/register-daemon-command.ts'),
                  ('dispatcher-integration-before','apps/cli/src/daemon/daemon-command-dispatcher.integration.test.ts')]:
    document(key, path, 'main')
for ver in ['base','head']:
    for key, file in [('backend','typescript-backend.ts'),('queries','typescript-semantic-query-service.ts'),('query-tests','typescript-semantic-query-service.test.ts')]:
        document(f'{key}-{ver}', f'packages/backend-typescript/src/typescript-backend/{file}', f'pr-127-{ver}')
document('scope-head', 'packages/core/src/backend/turn-scoped-cache-scope.ts', 'pr-127-head')
document('scope-tests', 'packages/core/src/backend/turn-scoped-cache-scope.test.ts', 'pr-127-head')

# These are captions, not substitute author rationales. Exact rationale remains attached.
captions = {
123: ['Source bytes → core', 'Selection replaces the cached snapshot', 'Keep the filesystem facade'],
124: ['Prepare an incremental overlay', 'Validate before toolchain commit', 'One transaction per ensured file', 'TypeScript owns its mutation journal', 'Stage removed paths reversibly'],
126: ['Portable graph → core base', 'Fresh input observations each rebuild', 'Validate every active input', 'Use canonical snapshot members', 'Publish the graph in one assignment'],
127: ['One scope, six isolated handles', 'Cache undefined with Map.has', 'Clear before project release', 'Start a turn after successful refresh'],
128: ['Request or session discovery retention', 'Selections discover independently', 'Copy backends; fresh router each turn', 'Open → validate → prepare', 'Concurrent, repeatable backend release'],
129: ['State path resolution → CLI', 'Resolve one shared canonical string', 'Canonicalize the existing ancestor', 'Inject environment and home for tests'],
130: ['Daemon is an internal-dependency leaf', 'Pass a complete versioned policy snapshot', 'Temporary policy-testing subpath', 'Enforce exports and imports in CI', 'Propagate policy before migrating consumers'],
131: ['Require policy slices at consumers', 'Choose timeouts by composition purpose', 'Separate fetch and reattachment budgets', 'Keep small-value adapters in tests'],
132: ['Freeze one command-name tuple', 'CLI maps syntax exhaustively', 'Carry commandName beside opaque argv', 'Include the name in duplicate compatibility', 'Advance protocol generation 4 → 5'],
133: ['One outer failure vocabulary', 'Keep worker failure names distinct', 'Classify from pure context facts', 'Derive error identity with instanceof'],
134: ['Use ordered admission guards', 'Check duplicates without mutation', 'Derive retry safety from rejection code', 'Use unknown at the temporary request seam'],
135: ['Inject the host by absolute file URL', 'Transport diagnostics as JSON-like values', 'Worker owns chunks and sequence numbers', 'Validate dynamically loaded modules', 'Sample synchronously through a no-payload hook'],
136: ['One stateless lifecycle renderer', 'Render from public daemon reports'],
137: ['Use operation-specific transport ports', 'Separate control and transfer decoders', 'Give response kinds different JSON caps', 'Translate protocol errors at the facade', 'Put chunk integrity in the wire codec'],
138: ['Daemon owns warm result capture', 'Advance offsets after durable append', 'Retain the receiver across fetches', 'Create a fresh decoder per connection', 'Transfer capture ownership on finish'],
139: ['Pull-driven socket reads', 'One FIFO for socket writes', 'Keep protocol classification above sockets', 'Extract outbound before inbound sockets'],
140: ['One owner for bounded exchanges', 'Keep acknowledgements off lifecycle port', 'Inject timeout by caller purpose', 'Validate before marking a frame accepted', 'Share the transport-error module'],
141: ['One inbound socket-server owner', 'Probe endpoints through the socket client', 'Separate per-connection send queues', 'Share shutdown; allow force escalation'],
142: ['One accepted-execution client state machine', 'Fresh capture for each reattachment', 'Independent numeric recovery budgets', 'Reuse acknowledgement-only capability', 'Keep exhausted fetches accepted-corrupt'],
143: ['Require one complete policy', 'Inject components to preserve identity', 'Remove facade canFrame', 'Enforce absent mechanics through source checks'],
144: ['Project activity with a static function', 'Capture clocks and process facts as values', 'Report the worker generation during replacement', 'Report the last sampled spool size', 'Keep legacy fileCount through nonready states'],
145: ['One worker-generation lifecycle owner', 'Keep replacement policy behind a port', 'Activate readiness after warm-up sampling', 'Share one replacement operation', 'Separate graceful close and forced termination'],
146: ['One completion-delivery coordinator', 'Ledger and spool retain their data', 'Wait on the latest attachment delivery', 'Fence expired diagnostic traces', 'Clean physically; acknowledge logically anyway'],
147: ['Store immutable original acceptance metadata', 'Coordinate existing owners through a session', 'Expose a narrow process-lifecycle port', 'Sample resources inside each queued turn', 'Attach duplicates without another execution'],
148: ['Node-free facade; load runtime dynamically', 'Stop at the first lazy routing decision', 'Stage package copies before switching the CLI', 'Daemon client owns capture and controlled output', 'Preserve acceptance-based idle timing'],
149: ['CLI coordinates; DaemonClient executes', 'Expose a read-only testing inspector', 'Package tests inject their own executor URL', 'Remove the transport compatibility facade', 'Compiler-backed ownership inventories'],
}
bands = [
    dict(id='memory', title='Remember the workspace', prs=[123,124,126,127,128], old='CLI scopes + TypeScript retention', new='Core session, transactions, project graph, turn scope',
         summary='Keep workspace objects between requests; publish candidates at explicit boundaries; expire semantic memoization after successful refresh or at release. TypeScript keeps syntax and semantic algorithms.'),
    dict(id='policy', title='Give policy one owner', prs=[129,130,131], old='Telemetry path lookup + scattered CLI numbers', new='CLI resolves environment; daemon owns a frozen policy',
         summary='One canonical path and one complete policy snapshot cross process and worker boundaries. Consumers require slices. Public DaemonClient may default its optional policy. Numeric defaults and five absent deadlines remain explicit below.'),
    dict(id='authority', title='Name the crossing', prs=[132,133,134,135,136], old='CLI types, argv inference, embedded formatting', new='Daemon contracts + injected host + renderer',
         summary='CLI supplies command identity and the executor module. Daemon owns failure and admission vocabularies, ordered guards, validation and byte sequencing. Renderer owns lifecycle bytes. Protocol generation advances from 4 to 5.'),
    dict(id='transport', title='Separate a socket from a transfer', prs=[137,138,139,140,141,142,143], old='LocalDaemonTransport', new='Codec, validator, receiver, capture, clients, server',
         summary='A connection ends at disconnect; durable transfer state survives a fetch. Reattachment starts fresh capture for the same accepted request. Recovery budgets are independent; exhausted accepted work is not replayed locally.'),
    dict(id='execution', title='Separate a turn from its delivery', prs=[144,145,146,147], old='WorkspaceDaemon', new='Activity projector, generation manager, delivery and execution sessions',
         summary='One FIFO executes newly accepted work; the ledger keeps original identity, delivery tracks the latest attachment, and a worker manager fences generations. Warm-up sampling gates readiness. Acceptance-based idle timing and sampled status are preserved.'),
    dict(id='host', title='Close the package boundary', prs=[148,149], old='CLI reaches daemon mechanisms', new='CLI → DaemonClient; package owns mechanisms',
         summary='#148 stages package copies while the CLI still uses its compatibility graph; #149 switches consumers and removes it. The final public surface has no Node ambient requirement, policy serialization is internal, and tests get a read-only inspector.'),
]
pr_band = {n: b['id'] for b in bands for n in b['prs']}
decisions = []
pr_data = []
for pr in prs:
    n = pr['number']
    body = pr['body']
    doc = f'pr-{n}'
    documents[doc] = dict(title=f'PR #{n} — {pr["title"]}', version='input bundle', text=body + '\n\n## Commits\n\n' + '\n'.join(f'{c["sha"]} {c["subject"]}\n{c["body"]}' for c in pr['commits']))
    decision_section = re.search(r'^## Decisions\n(.*?)(?=^## |\Z)', body, flags=re.M|re.S).group(1)
    statements = [s[2:] for s in decision_section.splitlines() if s.startswith('- ')]
    assert len(statements) == len(captions[n]), (n, len(statements))
    for i, (statement, caption) in enumerate(zip(statements, captions[n]), 1):
        choice, reason = statement.split(', because ', 1)
        decisions.append(dict(id=f'd{n}-{i}', pr=n, band=pr_band[n], title=caption,
                              status='stated', choice=choice, reason=reason.rstrip('.'),
                              statement=statement, evidence=[dict(doc=doc, line=line(doc, statement)),dict(doc=sources[n][0], line=1)],
                              sourceNote='Reason: PR decision record. Code link: final stack owner; intermediate ownership is described in the PR.'))
    pr_data.append(dict(number=n, title=pr['title'], band=pr_band[n], ids=[f'd{n}-{i}' for i in range(1,len(statements)+1)]))

def extra(id, title, statement, status, reason, refs, band='edges', pr=None, scope='stack'):
    evidence = [dict(doc=doc, line=line(doc, needle)) for doc,needle in refs]
    decisions.append(dict(id=id, title=title, statement=statement, choice=statement, status=status, reason=reason,
                          evidence=evidence, band=band, pr=pr, scope=scope, sourceNote='Additional recovered choice. “Unexplained” means no reason found in the supplied PR bodies, commit messages or inspected plans; code and tests can show intent without explaining why.'))

extra('x-template','Unrequested: change the PR template',
      'Rename Why to Context, replace generated SVG trees with text trees, make signatures language-neutral, and replace commit reading order with screenshot guidance.',
      'unexplained','The #123 commit says “Update pull request template”; its source-cache PR body gives no reason for this separate review-format change.',
      [('template-before','## Why'),('template-after','## Context'),('pr-123','Update pull request template')], pr=123)
extra('x-cwd','Resolve relative daemon --cwd against the client directory',
      'Start and stop now resolve relative --cwd from ProgramContext.cwd. Previously the option string was passed straight to workspace creation.',
      'unexplained','A #149 commit and new tests specify the behavior, but no reason was found for adding this normalization within the ownership refactor.',
      [('control-before','const cwd'),('control-command','return resolve'),('control-tests','resolves relative')], pr=149)
extra('x-api','Close the final public surface after staging',
      'Keep client, policy, command names, host/report types and process/worker entries public. Move failure/admission helpers and policy serialization inside the package; remove the policy-testing export and keep only read-only testing inspection.',
      'stated','The architecture spec forbids hosts from importing mechanisms; #149 explicitly chooses a read-only testing inspector instead of storage authority.',
      [('final-public-root','export'),('manifest','"exports"'),('policy-record','## Migration access')], band='host',pr=149)
extra('x-optional-policy','Allow a system-policy default at the public client',
      'DaemonClientOptions.policy is optional; the internal runtime uses DaemonPolicy.currentSystem() when it is absent. Operational consumers still receive required slices.',
      'unexplained','The public contract exposes the default; no explicit rationale for this optional host seam was found in #148 or #149.',
      [('client-contracts','readonly policy?'),('client-runtime','currentSystem')], band='policy',pr=148)
extra('x-graph-order','Discover FIFO; first configured owner wins; inferred fallback',
      'The core project graph traverses configuration references FIFO, preserves configured-owner order, uses the first owner for primary lookup and sends unowned files to an inferred project.',
      'unexplained','Commits specify FIFO discovery, ordered ownership and inferred fallback. The record does not say why this ordering was chosen.',
      [('project-graph','discoverConfigurations'),('pr-126','Specify FIFO project discovery')], band='memory',pr=126)
extra('x-release-order','Release projects sequentially; backends concurrently',
      'A project graph awaits each configured project in order, then its inferred project; a rejection stops that sequence. A workspace session uses Promise.all across backends and remains reusable.',
      'unexplained','The session’s concurrent, repeatable cleanup has a PR reason. The graph’s sequential and stop-on-failure ordering is specified in commits without its own reason.',
      [('project-graph','async releaseTransientResources'),('workspace-session','async releaseTransientResources'),('pr-126','Specify sequential project resource release')], band='memory',pr=126)
extra('x-transaction-scope','Atomicity is local to one publication',
      'Backend refresh publishes one candidate; ensureFiles retains earlier per-file progress. A later failing backend prevents a WorkspaceSession scope from returning but does not undo an earlier backend commit.',
      'stated','The #124 decision preserves earlier per-file progress; #128 preserves command and failure ordering while retaining independent backend owners.',
      [('revision-state','async refresh'),('pr-124','one-file selection'),('session-tests','later backend fails')],band='memory',pr=128)
extra('x-activity-details','Freeze activity snapshots and clamp elapsed time',
      'Activity projection freezes returned snapshots and keeps elapsed durations nonnegative; lifecycle precedence is explicit instead of emerging from process-shell branches.',
      'unexplained','The #144 commits specify freezing, timing clamping and lifecycle precedence; no separate rationale for freezing or clamping was found.',
      [('activity','Object.freeze'),('pr-144','Clamp daemon activity timing')],band='execution',pr=144)
extra('x-deferred','Keep three newly recorded behavior changes deferred',
      'Selection refresh still evicts omitted source bytes. Idle timing still starts at construction and resets at acceptance. Sibling-byte retention, readiness-armed idle time and completion-based idle time are documented follow-ups, not shipped behavior.',
      'stated','The architecture spec forbids behavior fixes during restructuring; the follow-up document records these three additions separately.',
      [('source-cache','refresh('),('lifetime','this.deadline'),('follow-ups','## Selection-Aware'),('architecture-spec','There is no')],band='memory',pr=123)
extra('x-test-boundary','Move three hostile-peer scenarios below the CLI boundary',
      'Startup-owner visibility, silent-peer ownership, and malformed-activity redaction leave CLI status e2e tests and reappear as DaemonClient package integration tests. Those new tests no longer exercise CLI parsing and rendering in the same run.',
      'stated','The #149 decision gives package tests their own actors and keeps external consumers away from daemon storage and mechanisms.',
      [('status-before','reports starting only'),('peers-after','reports startup publication'),('status-after','describe('),('pr-149','package-owned actors')], pr=149)
extra('x-test-lost-status','Remove four other composed CLI status scenarios',
      'The CLI e2e cases for a killed initiating caller, a stale current-schema record, status during stuck execution, and navigation after workspace deletion are removed. Related startup/controller/process tests remain, but this inspection found no like-for-like built-CLI replacement.',
      'unexplained','The package-migration rationale explains test ownership. It does not explain why these particular full-path scenarios can be dropped; lower-level coverage is not the same test boundary.',
      [('status-before','keeps one daemon-owned'),('status-after','describe('),('startup-tests','initiating caller exits'),('controller-tests','cleans stale starting'),('process-tests','workspace disappears')],pr=149)
extra('x-test-lost-stop','Remove three built stop-command lifecycle scenarios',
      'The CLI e2e cases for stopping a launched starting process, draining in-flight work, and force-killing stuck work are removed. Controller/process tests and CLI delegation tests remain; they split the old combined boundary.',
      'unexplained','No reason was found for dropping these exact composed CLI scenarios while the architecture spec says daemon-suite expectations must remain unchanged.',
      [('stop-before','waits for a launched'),('stop-after','describe('),('controller-tests','exact launched process exits'),('process-tests','in-flight navigation'),('control-tests','writes unchanged stop')],pr=149)
extra('x-test-concurrent','Remove the reference-workspace concurrent cold-start integration',
      'The CLI dispatcher integration test that ran concurrent reference-workspace calls cold behind one startup barrier is deleted. Client tests preserve a chosen cold route and startup tests cover shared warm-up; the exact combined test is absent.',
      'unexplained','The compatibility dispatcher is retired, but no explicit rationale for losing this particular integration boundary was found.',
      [('dispatcher-integration-before','finishes concurrent reference-workspace'),('pr-148','Retire app-owned daemon mechanism tests'),('startup-tests','concurrent warm-up triggers')],pr=148)
extra('x-test-budgets','Increase test time budgets during extraction',
      'The 12 MiB transfer test allowance grows from 20 s to 60 s. Two retained-executor tests gain explicit 15 s limits. An intermediate startup-owner test grows from 15 s to 30 s before that CLI scenario is removed.',
      'unexplained','Commits label these budgeting and stabilization changes, but give no reason for the specific limits. They relax test wall-clock allowances, not daemon policy.',
      [('pr-138','Budget twelve'),('pr-135','Budget retained'),('pr-129','Stabilize daemon startup')],pr=138)
extra('x-test-sync','Wait for complete fixture publication',
      'The worker-exit parity fixture waits for started, request-ID and request-payload files together. Startup-owner polling waits for matching identity and a renewed revision instead of a single immediate read.',
      'stated','The #129 commit subjects identify controlled-worker synchronization and transient startup-owner reads as the stabilization target; the specific timeout choices remain unexplained above.',
      [('pr-129','Stabilize controlled worker'),('pr-129','Reproduce transient daemon owner reads')],pr=129)
extra('x-clock','Give daemon timing one clock authority',
      'DaemonClock supplies wall and monotonic time to mechanisms, including idle lifetime. Compiler-backed checks forbid other clock sources. The idle policy still measures from construction and acceptance, not readiness or completion.',
      'stated','The architecture spec assigns the daemon its own wall and monotonic clock; #149 chooses exact clock inventories so ordinary TypeScript syntax cannot bypass ownership.',
      [('clock-source','export'),('lifetime','this.clock.wallNowMs()'),('architecture-spec','Daemon owns its wall'),('pr-149','clock, and storage inventories')],band='execution',pr=148)
extra('x-startup','Centralize startup ownership checks and validate process coordinates',
      'Registry becomes the authority for matching startup ownership. Process entry adopts validated coordinates; process request handling preserves authentication order before execution. The startup ownership contract is narrowed to the coordinates it checks.',
      'unexplained','The architecture spec requests one lock-ownership owner and the #148 commits specify these exact extractions. No separate reason for the narrowed coordinate shape was found.',
      [('registry-source','daemonOwnsStartupProcess'),('pr-148','Specify validated process coordinate adoption'),('pr-148','Specify narrow startup ownership coordinates')],band='host',pr=148)
extra('x-backend-api','Expose generic core bases and make prepared-file access asynchronous',
      'Core gains revisioned preparation/state and project-graph contracts. TypeScriptWorkspaceState extends the new base; fileEntries now returns a promise. PreparedFileIndex, PreparedFileRevision and TypeScriptFileRevision disappear from the TypeScript package root.',
      'stated','The #124 and #126 contexts assign reusable indexing, graph publication and failure-preserving preparation to core; their public-surface sections record the API changes.',
      [('pr-124','## Public surface'),('pr-126','## Public surface'),('revision-state','export abstract class')],band='memory',pr=124)

# The small subject uses the same four authored decisions, plus observed contracts.
extra('p-identity','Return exact values; retain async failure; retry sync throws',
      'Each handle stores the factory result unchanged. Rejected promises stay cached for the turn; a synchronous throw inserts nothing and the next access retries. Old promise settlement cannot replace a new-turn entry.',
      'stated','The #127 context explicitly preserves promise/value identities and failure behavior.',
      [('scope-head','getOrCreate('),('scope-tests','retains promise settlement'),('scope-tests','old promise settlement'),('pr-127','promise/value identities')],band='memory',pr=127,scope='both')
extra('p-position','Cache positions, rehydrate nodes on each lookup',
      'The sixth cache uses relative-path:source-offset keys and stores location arrays, including empty arrays. Returned node arrays are rebuilt per access. Identity caches use formatted symbol identities; callers and refs share reference discovery.',
      'stated','The #127 context preserves all six algorithms and key spaces; the query service keeps TypeScript-specific lookup and rehydration.',
      [('queries-head','definitionsByPosition'),('queries-head','const key = `${relativePath}'),('query-tests-head','caches empty position')],band='memory',pr=127,scope='both')
extra('p-release','The backend now observes project-cleanup completion and failure',
      'Both versions clear caches before project cleanup settles. Base backend release fulfills while cleanup is pending; head backend release stays pending and propagates rejection. This is an observable async boundary change within a preservation-framed PR.',
      'unexplained','The PR shows an awaited release barrier and changed signature, but does not reconcile the changed backend completion/failure behavior with its preservation claim.',
      [('backend-base','async releaseTransientResources'),('backend-head','async releaseTransientResources'),('queries-head','async releaseTransientResources'),('query-tests-head','clears caches before awaiting')],band='memory',pr=127,scope='both')
extra('p-files','Narrow beginTurn from a snapshot to its file array',
      'TypeScriptSemanticQueryService.beginTurn now takes readonly WorkspaceFile[]; the backend passes snapshot.files. The service continues to hold those files after release.',
      'unexplained','The public-surface section records the signature change, but gives no reason for it or for retaining files through release.',
      [('queries-head','beginTurn('),('queries-head','async releaseTransientResources'),('pr-127','Changed on exported')],band='memory',pr=127,scope='both')
extra('p-handles','Clear entries; keep reusable handles and existing callers',
      'beginTurn and release both clear every registered map synchronously. Handles remain registered; there is no disposal or eviction API. Clearing does not cancel pending work or revoke objects already returned, and a later lookup may refill the cache during release.',
      'unexplained','The source exposes clearing without cancellation, closure or handle removal. No rationale for these generic-scope limits was found; the six TypeScript handles are created once per service.',
      [('scope-head','private readonly caches'),('scope-head','private clear'),('queries-head','private readonly cacheScope')],band='memory',pr=127,scope='both')
extra('p-tests','Add ten characterization/lifecycle tests; keep prior assertions',
      '#127 adds six semantic-service cases and four core-scope cases. Existing semantic assertions remain; one existing release call gains await. This experiment ran both affected suites: 15 tests passed.',
      'stated','The PR describes the tests as locking cache identity, errors and clearing contracts.',
      [('query-tests-head','shares each identity'),('scope-tests','describe('),('pr-127','locks identity')],band='memory',pr=127,scope='both')

# Include every numeric record at the same decision level, never as a hidden footnote.
policy = []
policy_text = documents['policy-record']['text']
for i, row in enumerate(policy_text.splitlines(), 1):
    if row.startswith('| `'):
        cells = [c.strip().replace('`','') for c in row.strip('|').split('|')]
        if len(cells)==5:
            policy.append(dict(id=f'policy-{len(policy)+1}', path=cells[0], value=cells[1], owner=cells[2], reason=cells[3], oracle=cells[4], line=i))
absences = []
for row in policy_text.split('## Intentional absences')[1].split('## Migration')[0].splitlines():
    if '| None |' in row:
        cells=[c.strip() for c in row.strip('|').split('|')]
        absences.append(dict(name=cells[0], value=cells[1], reason=cells[2]))

# A search aid, explicitly not a coverage-equivalence claim. Include parameterized titles too.
title_pattern = re.compile(r'\b(?:it|test)(?:\.(?:skip|only|todo))?\(\s*["\'`]([^"\'`\n]+)')
def titles(version):
    out = collections.defaultdict(list)
    directory = ROOT/'worktrees'/version
    files = subprocess.check_output(['rg','--files','-g','*.test.ts','-g','!node_modules'], cwd=directory,text=True).splitlines()
    for path in files:
        for title in title_pattern.findall((directory/path).read_text()): out[title].append(path)
    return out
before, after = titles('main'), titles('stack-head')
audit = dict(method='Literal non-parameterized it/test titles matched across all *.test.ts files. Renames, table-driven tests and different assertion bodies are not proof of loss or equivalence.',
             beforeUnique=len(before), afterUnique=len(after), unmatched=[dict(title=n,oldPaths=p) for n,p in before.items() if n not in after])
(EVIDENCE/'test-title-audit.json').write_text(json.dumps(audit,indent=2)+'\n')

for key in ['pr-127','stack']:
    shutil.copyfile(ROOT/'inputs'/key/'diff.patch',EVIDENCE/f'{key}.patch')

# Exact small commit diffs make the auxiliary choices inspectable without GitHub.
for pr in prs:
    for c in pr['commits']:
        if any(s in c['subject'] for s in ['Budget retained','Budget twelve','Normalize daemon control','Stabilize controlled worker','Stabilize daemon startup']):
            key='commit-'+c['sha'][:8]
            text=subprocess.check_output(['git','show','--format=medium','--unified=4',c['sha']],cwd=ROOT/'worktrees/stack-head',text=True)
            documents[key]=dict(title=c['subject'],version=c['sha'],text=text)
for d in decisions:
    if d['id']=='x-test-budgets': d['evidence'] += [dict(doc=k,line=1) for k,v in documents.items() if k.startswith('commit-') and ('Budget ' in v['title'] or 'startup ownership oracle' in v['title'])]
    if d['id']=='x-test-sync': d['evidence'] += [dict(doc=k,line=1) for k,v in documents.items() if k.startswith('commit-') and 'Stabilize' in v['title']]

data=dict(title='What survives the next request?',base=stack['base'],head=stack['head'],bands=bands,
          prs=pr_data,decisions=decisions,policy=policy,absences=absences,
          pr127Ids=[f'd127-{i}' for i in range(1,5)]+[d['id'] for d in decisions if d.get('scope')=='both'],
          titleAudit=audit,
          sources={key:dict(title=v['title'],version=v['version']) for key,v in documents.items()})
assert len({d['id'] for d in decisions})==len(decisions)
for d in decisions:
    assert d['status'] in ('stated','unexplained')
    assert d['reason'] and d['statement']
    for e in d['evidence']:
        assert e['doc'] in documents
        assert 0 < e['line'] <= len(documents[e['doc']]['text'].splitlines())
(HERE/'review-data.js').write_text('window.REVIEW = '+json.dumps(data,ensure_ascii=False)+';\n')
(HERE/'source-data.js').write_text('window.SOURCES = '+json.dumps(documents,ensure_ascii=False)+';\n')
(EVIDENCE/'decision-inventory.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print(f'Built {len(prs)} PR records, {len(decisions)} decisions, {len(policy)} policy records, {len(absences)} absent deadlines, {len(documents)} evidence documents.')
