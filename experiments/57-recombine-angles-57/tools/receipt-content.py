# Exact quotations only. Interpretations live in rows.json, not in this evidence layer.
GROUPS = {
 'policy': {
  'title': 'Host policy: parent, child, implementation',
  'pages': [
   ('12-opening','D01 · complete layer','Hosts supply environment, executor factory + module URL, readiness probe, and classified requests. The client returns output + mode or a lifecycle report.'),
   ('12-host-inputs','Clue 01 · deeper host map','Optional daemon policy object'),
   ('23-opening','D04 · complete root','Node-free host types; executor/environment inputs; runtime loads at construction.'),
   ('23-D04','D04 · selected leaf','DaemonClient exposes execute plus typed start/status/stop overloads. Options carry state directory, version, enabled flag, executor factory, module URL, readiness probe and optional policy. Construction starts one runtime-loading promise; methods await it.'),
   ('29-opening','Cut 04 · complete map','Hide routing, startup, control and warm result capture behind a portable execute/control surface. Preserve route effects and replay boundaries; accept the host’s executor and readiness probe.'),
   ('29-opening','Cut 04 · deeper host diagram','readiness command/argv · optional policy'),
   ('18-opening','Outline 03 · declared preservation','Keep protocol/schema versions, policy defaults, and command/admission/failure contracts.'),
   ('49-report-opening','Report · control limitation','All four leave policy omission and its supplier unknown at the top. D04 teaches optionality to all four. This top statement was deliberately unchanged.')
  ],
  'source': [('head-client-contract',10,25),('head-runtime',74,115),('head-client',20,64)]
 },
 'authentication': {
  'title': 'Credentials: named exception versus request partition',
  'pages': [
   ('23-opening','D13 · original root','Separate protocol/instance and token paths, including control exceptions.'),
   ('23-D13','D13 · selected leaf','Normal requests check protocol and instance first. execute, execution-status, result-fetch and result-ack also check the token; ping/stop require protocol and instance only. identify/terminate/kill branch earlier and check instance plus token. New tests pin the ordering and exceptions.'),
   ('29-opening','B4 · complete map','Request authentication order is characterized and retained, including the identity/termination exceptions.'),
   ('29-B4','B4 · selected explanation','Identify and terminate/kill dispatch before the ordinary protocol/instance check and authenticate in their own handlers. Ping follows the ordinary check. Execute enters admission; status/fetch/ack also require the process token. This is a preserved branching boundary, not a new uniform authentication gate.'),
   ('27-opening','14 · complete summary','Execution-family requests check protocol/instance before token; ping/stop remain token-free. Identify and termination use instance/token. The added tests distinguish error order through a direct request harness.'),
   ('27-auth','14 · apparatus qualification','Requests combine a wrong protocol or instance with a wrong token, then test a wrong token alone. A fake request server invokes the coordinator; it bypasses wire framing.'),
   ('49-23-revised-opening','49 revised D13 · complete root','Ping/stop: protocol+instance, no token. Other normal requests add token; identify/terminate/kill: early instance+token.')
  ],
  'source':[('head-coordinator',353,407),('head-coordinator',417,434),('head-coordinator',470,501),('head-admission',46,94)]
 },
 'clock': {
  'title': 'Queue default, supplied clock and retained idle events',
  'pages': [
   ('29-opening','A1 · original complete map','Daemon wall and monotonic clocks replace telemetry and scattered time callbacks.'),
   ('29-A1','A1 · selected explanation','The queue’s standalone default changes from Date.now to monotonicNowMs; the process already supplied monotonic time before this PR.'),
   ('49-29-revised-opening','49 revised A1 · complete map','Daemon owns wall/monotonic time; the standalone queue default changes Date.now → monotonic, while the process already injected monotonic time.'),
   ('18-opening','Outline 04 · retained lifetime','Keep the constructor/acceptance deadline; neither readiness nor completion re-arms it. Record both changes for later.')
  ],
  'source':[('base-live-queue',26,35),('head-queue',27,38),('head-queue',64,82),('base-old-coordinator',85,96),('head-coordinator',84,94),('head-clock',13,28),('head-lifetime',11,34),('head-follow-ups',175,193)]
 },
 'registry': {
  'title': 'One predicate, different accepted observations',
  'pages': [
   ('03-opening','Choice 17 · named comparison','Callers delegate startup equality and cleanup to the registry. Every match checks identity and instance; supplied token, kind, PID, timestamps and revision narrow the match. Full observed owners are compared exactly.'),
   ('06-opening','K4 · tightened comparisons already disclosed','registry and controller use a canonical owner predicate, with identityKey and full-owner comparisons added;'),
   ('08-opening','07 · bounded producer record','Recorded synthetic mismatch: isStartupOwner / refreshStartupOwner change from true / true to false / false.'),
   ('08-opening','07 · observation limit','The probe deliberately edits a lock’s identity key; it is not a claim about normal workload frequency.'),
   ('50-opening','Opening · concrete prediction','A readable lock with the same instance ID but a different identity key passes the base’s simple ownership query and fails the head’s. Centralization also tightens an answer in the live CLI.')
  ],
  'source':[('base-live-registry',379,408),('base-live-registry',702,715),('head-live-registry',395,401),('head-live-registry',516,533),('head-live-registry',842,859)]
 },
 'retirement': {
  'title': 'The retirement condition in the unchanged plan',
  'pages': [
   ('03-opening','Choice 23 · reason search','The old export was labeled temporary, but no explicit removal rationale or reason for the local scope of the new clock scan was found.'),
   ('12-opening','D21 · complete face','Retire policy-testing exports and their lint guard\nUNEXPLAINED'),
   ('35-opening','Record 03 · reason search','No separate rationale for this export retirement and the associated test deletions was found in the PR body, commit bodies, or supplied plans.'),
   ('06-opening','K13 · recovered record','Reason: daemon-policy.md, Migration access: the policy-testing subpath is temporary and is removed after app-owned mechanism tests move package-local. Its retirement is explicitly planned; the PR body omits it.'),
   ('29-C6','C6 · narrower unanswered tradeoff','Reason · unexplained. The changes are visible in the relocation commit; no rationale was found for the exact enforcement tradeoff.'),
   ('23-opening','Compatibility root · original label','U\nRemove policy-testing export, its lint gate and related tests.')
  ],
  'source':[('base-policy-plan',62,66),('head-policy-plan',62,66),('head-manifest',8,19),('base-eslint',90,105),('base-lint-test',118,138)]
 },
 'construction': {
  'title': 'Validation location and observable failure timing',
  'pages': [
   ('08-opening','08 · input and timing','Move identity validation into construction, check workspaceRoot too, and validate before observing components. No separate reason for this exact ordering/broader direct-constructor rejection was recorded.'),
   ('12-opening','D13 · bounded choice','Identity mismatches fail before component setup; that placement has no stated rationale.'),
   ('50-opening','13 · existing entry boundary','Direct construction now carries the validation contract; entry identity validation already existed. Worker policy parsing before new Worker also already existed at this PR’s base.')
  ],
  'source':[('base-entry',10,33),('head-coordinator',73,99),('head-coordinator',541,554),('head-construction-test',64,99),('base-old-worker',87,111)]
 },
 'tests': {
  'title': 'Fixtures, asserted paths and retained observations',
  'pages': [
   ('27-fixtures','17 · apparatus','Before: a worker loads the built CLI executor and runs --version on an overview fixture. After: a worker loads executor-module.mjs and emits a scripted version string; createDaemonExecutor is tested separately in the CLI.'),
   ('27-opening','18 · complete summary','The generic replacement retains readiness, file count, exit code and bytes. Three startup-duration and four execution-duration expectations disappear from this case; no specific reason for their removal is recorded.'),
   ('27-opening','19 · complete summary','The deleted CLI entry test’s exact 257 MiB worker-policy handoff is not asserted by the new built-entry cases.'),
   ('27-opening','08 · complete summary','The public execution smoke test disables the daemon; warm behavior is mostly tested through the internal runtime with mocked mechanisms.'),
   ('35-opening','19 · platform witness','The new built-process test branches on win32: after termination it expects the ready record to remain and no process-termination diagnostic, then the test harness removes the exited process record. Other platforms expect self-cleanup and that diagnostic. Both branches finally assert no record or owner.')
  ],
  'source':[('base-old-worker-test',369,431),('head-worker-test',369,402),('head-executor-fixture',15,45),('head-executor-test',32,40),('base-old-entry-test',82,108),('head-built-entry',239,257),('head-public-test',5,36),('head-client-test',21,36),('head-clock-test',36,49),('head-vitest',1,7)]
 },
 'objects': {
  'title': 'Source ownership, process location and separate lifetimes',
  'pages': [
   ('06-opening','Composition · exact wiring caption','One registry, one routing transport, one terminator reach several spokes.'),
   ('03-opening','Choice 07 · retained failure','Constructing DaemonClient starts the dynamic load immediately. Execute and control await the same promise; a rejected load is not retried by these methods.'),
   ('06-opening','K8 · retained maps','The shared coordinator keeps 4 launched-process maps for the client’s lifetime.'),
   ('35-opening','Runtime caption','The shipped CLI still launches its app-local process/worker entries at this head; package entries are exercised separately by new built-entry tests.'),
   ('50-opening','Opening · lifetime lens','Existing execution and delivery lifetimes remain distinct.')
  ],
  'source':[('head-cli',1,22),('head-dispatcher',1,34),('head-freeze-test',12,46),('head-runtime',85,137),('head-runtime',217,228),('head-startup',51,85),('head-package-entry',11,42),('head-worker',85,113),('head-accepted-session',105,145),('head-delivery-session',173,175),('head-delivery-session',195,235),('head-coordinator',394,398)]
 },
 'routing': {
  'title': 'A selected route prevents later work; transfer failure does not grant replay',
  'pages': [
   ('12-opening','D07 · complete layer','Record present → not starting → version → responsive. Read and observation are memoized; a decision prevents every later guard and its effects.'),
   ('03-opening','Choice 12 · replay authority','Only a DaemonTransportError marked retrySafe permits local fallback. Submitted uncertainty, accepted failures and malformed warm completions return controlled warm failures; they do not replay.'),
   ('03-opening','Recorded player · apparatus','Recorded calls to the actual built DaemonClient, runtime and guards, with synthetic registry, observer, transport, warm-up and executor ports. No real socket or daemon is involved. This browser replays the saved events.')
  ],
  'source':[('head-routing',76,88),('head-routing',122,137),('head-runtime',139,158),('head-runtime',181,228),('head-runtime',252,270),('base-dispatcher',206,247)]
 },
 'variants': {
  'title': 'Documented comparison conditions and unchanged originals',
  'pages': [
   ('49-report-opening','Declared study scope','This is a focused wording experiment with four fresh agent sessions, not a human recall study. The browser followed the original descent routes; readers received their rendered prose with source withheld. Questions named the cases in advance. These observations do not test free recall, navigation skill, or whole-page completeness.'),
   ('49-report-opening','Declared repair scope','Styles, behavior, evidence, and all deeper prose are identical between each original/revised pair. The copied pages retain other omissions and inherited reason labels; this is not a complete repair of either review.'),
   ('49-23-revised-opening','Revised 23 · one parent statement','Ping/stop: protocol+instance, no token. Other normal requests add token; identify/terminate/kill: early instance+token.'),
   ('49-29-revised-opening','Revised 29 · one parent statement','Daemon owns wall/monotonic time; the standalone queue default changes Date.now → monotonic, while the process already injected monotonic time.')
  ],
  'source':[]
 }
}
