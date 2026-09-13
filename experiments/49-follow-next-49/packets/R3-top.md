# Reader R3 · phase 1

These are verbatim rendered top-layer passages, selected for a focused prediction task. The three smaller passages are excerpts, not whole-page evaluations. Read only this packet; source and other readers are withheld. Do not follow links. Do not assume the explanation is true. Separate a prediction licensed by the passage from an independent guess.

## Case 127

#127 · 6 CHANGED FILES / THE COMPLETE PICTURE

Cache identity stays. The release promise gains a barrier.

Core takes over clearing six cache spaces. TypeScript keeps the queries. A new turn still starts only after refresh succeeds; releasing now waits for project cleanup and forwards its rejection.

27
production
callables + ports
B
BASE · LIFETIME IN TYPESCRIPT
PACKAGES/BACKEND-TYPESCRIPT
Backend
refresh / release
Query service
algorithms + 6 Maps
service clears Maps → starts project release
Project graph
PACKAGES/CORE
No shared turn-cache lifecycle
A
HEAD · LIFETIME IN CORE
PACKAGES/BACKEND-TYPESCRIPT
Backend
awaits release
Query service
same algorithms
service awaits release ↓
Project graph
service creates scope + six typed handles ↓
PACKAGES/CORE · NEW CODE OWNER
TurnScopedCacheScope
clear all handles synchronously

Compressed static-ownership view: imports and query internals are omitted. The service still owns its scope instance; the generic lifetime implementation moves into core. Select a box to inspect its contracts.

Caller-visible boundaries: new generic cache API; a narrower beginTurn input; awaited release. Definition/call-target/caller/callee promise identities, reference projections, rehydrated position nodes, refresh-failure preservation and reusable cleared handles all matter.

CORE OWNS LIFETIME
Cache handles

One core scope owns six isolated handles; values and promises keep identity. Clear synchronously; handles remain reusable.

5 callables · inspect →
TYPESCRIPT OWNS MEANING
Semantic queries

Same algorithms and keys. beginTurn accepts files. Reference projections and node arrays are still rebuilt; cached locations and four query promises are reused.

9 callables · inspect →
REFRESH & RELEASE
Backend boundary

Refresh success still starts the turn. Release clears first, then waits and propagates project failure. Other backend queries still prepare files and delegate.

13 callables · inspect →

Read the decisions below, then any boundary’s callable table. Source evidence is the last layer.

C1
STATED
One lifetime, six independent key spaces

The PR says independent query key/value spaces require separate handles.

Inspect the evidence ↗
B
Six Maps and a manual clearing list.
A
A generic core scope owns typed handles. TypeScript retains key formatting and all six algorithms; core root exports the new surface.
C2
STATED
Keep identities and both kinds of failure

The PR explicitly preserves identities and failure behavior, and names undefined as a valid cached value.

Inspect the evidence ↗
B
Promises and location values cached; synchronous factory failure is retried; rejected promises stay cached.
A
getOrCreate uses has/get, then factory/set. No promise wrapping or rejection eviction. Four public query promises retain identity; references project anew and positions rehydrate nodes.
C3
STATED
A successful refresh starts the next turn

The PR says failed refresh must preserve the current successful turn.

Inspect the evidence ↗
B
Clear only after state.refresh resolves; service consumes snapshot.files.
A
Same ordering; beginTurn now accepts readonly WorkspaceFile[]. Earlier refresh work is not rolled back by this cache change.
C4
STATED
Clear now; finish release when the graph finishes

The PR says released semantics must be unavailable while project release is pending or rejecting.

Inspect the evidence ↗
B
Service release returns void and starts project release without waiting; backend returns Promise<void> without awaiting the graph.
A
Scope clearing is synchronous. Service and backend await graph release; rejection reaches the backend caller. Clearing does not cancel work already holding a promise.
C5
UNEXPLAINED
Retain reusable handles after clearing

No reason found in the PR, commit messages or spec for retaining every created handle for the scope’s entire lifetime.

Inspect the evidence ↗
B
Six fixed Maps remain attached to the service.
A
Scope keeps its handle list; beginTurn and release empty values without disposal, sealing, or cancellation. A caller can keep using a handle after either boundary.

### Prediction task

A definition query has returned promise P. Backend release starts while project-graph cleanup remains pending, and cleanup later rejects with E. At the supplied base and head, predict: when cache lookup stops returning P, whether P is cancelled, whether the same cache handle can be used again, and when/how backend release settles. Also predict what happens to the current successful semantic turn if refresh fails. Distinguish supported predictions from unknowns.

## Case validation

06
Use different input shapes at different depths
Defaults hidden in consumers and helpers
→
Snapshot → sections → fields → numbers
Some consumers take several sections, others one field or a bare number. The worker parent reparses the snapshot for a chunk limit; stored output keeps an optional internal cap. Transport keeps writeChunkSize and outputDirectory options.
unexplained

### Prediction task

A serialized worker-policy snapshot is invalid under its parser. A caller constructs the parent navigation-worker wrapper. Predict whether construction returns a wrapper, whether a worker thread can already exist when validation fails, and through which channel the failure reaches the caller. What ordering does the passage establish, and what remains unknown?

## Case owner

Discover FIFO; first configured owner wins; inferred fallback
unexplained

The core project graph traverses configuration references FIFO, preserves configured-owner order, uses the first owner for primary lookup and sends unowned files to an inferred project.

x-graph-order · #126 · reason & evidence ↗

### Prediction task

Configured projects are visited in order A, then B. Both claim file shared.ts. Predict the primary project for that file, all configured owners, the result if order is reversed, and where an unowned file goes. Explain which claim in the passage supports each prediction.

## Case 23

Package ownership lands before the CLI switch.

SYMNAV / PR 148
45 commits
153 files
+14,624 / −815
25 choices · 6 rooms · source at the bottom
BASE
CLI
CLI-local mechanisms
HEAD / ACTIVE CLI
CLI
38 frozen mechanisms
staged
@symnav/daemon / NEW OWNERSHIP BOUNDARY
DaemonClient
private mechanisms
Structural sketch · solid = selected composition; dashed = staged ownership. The CLI still executes the app-local graph.
01 / COMPATIBILITY
ENTER ↗
Two homes, one active CLI
S
Stabilize and freeze 38 CLI copies; the active CLI stays on them.
S
Package folders own mechanisms; no internal production dependencies.
U
Remove policy-testing export, its lint gate and related tests.
U
Freeze hash normalizes CRLF, still detects source edits.
Stated intent: separate ownership and consumer-switch review.

02 / PUBLIC CLIENT
ENTER ↗
A narrow public doorway
S
Node-free host types; executor/environment inputs; runtime loads at construction.
S
Host supplies readiness command; startup runs it cold, telemetry off.
U
Reuse controls; separate status timeout; disabled status/stop and errors reach host.
S
New checks: exports, Node-free types, side-effect-only entries.
Stated intent: no Node ambient types in host declarations.

03 / ROUTING & OUTPUT
ENTER ↗
Choose once; own the result
S
Lazy, memoized guards: present → not starting → version → responsive.
S
Preserve routes; fresh local executors; warm-up runs independently.
S
Only safe failures retry locally. Uncertain/accepted work is not replayed.
S
Own capture, spool codec and controlled errors; dispose malformed output.
Stated intent: stop later effects; own cleanup and replay safety.

04 / PROCESS OWNERS
ENTER ↗
Private process owners
U
Validate coordinates before composition; reuse the supplied endpoint.
S
One registry ownership predicate; narrow queries and full mutation checks.
U
Ping/stop: protocol+instance, no token. Other normal requests add token; identify/terminate/kill: early instance+token.
S
Keep execution, delivery, worker, resource and activity owners; bind callbacks.
S
Package process/worker entries load the injected executor; no entry API.

05 / CLOCKS
ENTER ↗
New clock owner, old deadlines
S
Daemon owns injectable wall/monotonic sources for timestamps and durations.
S
Idle still starts at construction, resets at acceptance. Readiness/completion fixes deferred.
Stated intent: preserve timing while moving its owner.

06 / TESTS & CHANGES
ENTER ↗
The evidence moves too
S
37 tests move; generic fixtures and built entries replace CLI coupling.
U
Worker/CLI version rejection becomes a direct factory test.
U
Generic readiness drops CLI startup/result timing assertions.
U
Windows forced-exit cleanup uses an observer; diagnostic absent.
U
Disable parallel test files in the daemon's Vitest configuration.
U
Add tsx and lockfile entry for moved TypeScript test helpers.

### Prediction task

Consider correctly shaped requests with a matching instance and, where applicable, compatible protocol. Predict which credential checks ping, stop, execute, identify, terminate and kill must pass when the token is absent or wrong. Passing credentials does not imply the command succeeds. Separately, can the host omit policy when constructing DaemonClient? If it can, who supplies policy? Identify any answer the top cannot determine.

## Case 29

OWN DAEMON MECHANISMS BEHIND DAEMONCLIENT · 153 FILES · +14,624 / −815 · 45 COMMITS

One destination.
Four review units.

I would split this PR. It changes who owns time, who owns process authority, where the implementation and its tests live, and what a host must know.

The shared goal is a daemon package. Each cut asks a different design question, and the first two already affect the shipped CLI. The new client is staged for a later consumer switch.

Proposed decomposition These are explanatory review boundaries, not four verified cherry-picks. No branch has been changed.
The boundary at this PR’s head
Simplified ownership map · runtime calls are grouped
APPS/CLI · STILL SHIPPED
CLI dispatcher
→
Local daemon mechanisms
01 clock
02 authority
38 files frozen after these edits
03 · copy and organize ↓
Active CLI adoption is outside this PR
PACKAGES/DAEMON · NEW MECHANISM HOME
04
DaemonClient
execute · control
→
Private mechanism owners
routing · process · registry · delivery · workers …
process-entry / worker-entry
→ package mechanisms → injected host executor

The new package also retains its existing contracts and policy. This page follows the four boundaries changed by #148.
THE COMPLETE DECISION MAP

Take the four cuts. Keep their costs attached.

Each line opens the same decision at greater depth. Stated means a reason or explicit preservation requirement was found. Unexplained means the inspected material gives no reason. A rationale for relocation does not establish equivalence of the tests it replaces.

CUT 01
Changes the live CLI graph
Own time
↗

Give daemon mechanisms their own wall and monotonic time inputs. Preserve the old idle event boundaries, and record the two lifetime changes for later.

A1
Daemon owns wall/monotonic time; the standalone queue default changes Date.now → monotonic, while the process already injected monotonic time.
STATED
A2
Idle still starts at construction and resets at acceptance; readiness and completion resets are deferred.
STATED
CUT 02
Changes the live CLI graph
Own process authority
↗

Centralize startup ownership checks and make the process coordinator validate its coordinates. Rename and narrow its composition ports; retain request authentication order.

B1
The registry owns startup equality, with narrow credentials and full observed-owner checks.
STATED
B2
The process coordinator validates and adopts launch coordinates before composing its internals.
UNEXPLAINED
B3
WorkspaceDaemon becomes DaemonProcessCoordinator; narrow ports replace generic dependency options.
STATED
B4
Request authentication order is characterized and retained, including the identity/termination exceptions.
STATED
CUT 03
Adds a second implementation graph
Stage a package
↗

Copy mechanisms into their package and give them executable entries. Keep the shipped CLI on frozen copies. Move tests with ownership, including the changed and removed checks.

C1
Stage package mechanisms while the live CLI keeps 38 frozen local files; the hash normalizes CRLF.
STATED
C2
Organize private mechanism owners and expose package-relative process and worker executables.
STATED
C3
37 mechanism tests move to the package and use package-independent executor fixtures.
STATED
C4
A new raw-clock guard narrows to lifecycle/ during staging; the PR base had no such guard.
UNEXPLAINED
C5
The mocked CLI entry test is deleted; built package entries gain execution and platform-specific cleanup tests.
STATED
C6
The temporary policy-testing export, its import restriction and two lint tests are retired together.
UNEXPLAINED
C7
Package test files run serially; the fixture environment adds tsx and local test helpers.
UNEXPLAINED
C8
CLI worker timing and mismatch-initialization assertions are removed; direct executor version rejection is restored.
UNEXPLAINED
CUT 04
Adds an API; CLI adoption is deferred
Give hosts a client
↗

Hide routing, startup, control and warm result capture behind a portable execute/control surface. Preserve route effects and replay boundaries; accept the host’s executor and readiness probe.

D1
A Node-free public facade loads a Node runtime at construction; only execute/control cross the new host boundary.
STATED
D2
Ordered lazy guards stop later observations: disabled → record → starting → version → responsiveness.
STATED
D3
Absent/dead/incompatible routes trigger independent startup; local attempts get a fresh executor and keep their chosen mode.
STATED
D4
Warm failures retry locally only when transport marks them safe; uncertain/accepted failures return controlled output.
STATED
D5
The client owns warm output capture in the OS temp directory, failure bytes and malformed-output cleanup.
STATED
D6
Control has typed start/status/stop results, a separate status timeout, disabled-start short circuit and propagated errors.
STATED
D7
The host supplies readiness command/argv through startup, preserving the queued executor probe.
STATED

### Prediction task

Compare a standalone request queue with no supplied time callback and a queue composed by the daemon process. At the base and head, predict their elapsed-time sources. If Date.now jumps backward while monotonic time advances normally, which queue measurement is exposed? Does the passage imply that all daemon deadlines switch to monotonic time? Identify what is unknown.
