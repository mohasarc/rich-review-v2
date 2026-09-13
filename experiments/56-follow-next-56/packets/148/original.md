<!-- system -->
You are an experienced software engineer reviewing a code change in a codebase you have never seen. You cannot open files, browse, or run code; everything available to you is in the messages. Answer every question with your best concrete prediction. Reply with JSON only, in the format requested.

<!-- user -->
symnav is a TypeScript code-navigation tool: a CLI plus a background daemon process that executes navigation commands for a workspace. The change under review is PR #148, "Own daemon mechanisms behind DaemonClient", layer 25 of a 26-PR daemon refactor stack (153 files, +14,624/-815).

Below is the top part of a review page written to explain this change: the part a reviewer reads before choosing whether to go deeper. You get it twice: as 1 screenshot(s), and as its extracted text.

[image: captures/148-original-root.png]

<page_text>
23
ZOOM CANVAS
Whole change
S stated reason U unexplained reason
Keys & gestures
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
Separate protocol/instance and token paths, including control exceptions.
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
01 / WHOLE CHANGE
↑ Up
−
100%
+
Whole change
1 / 32
The complete outline
← Previous
Next: Compatibility →
Experiment notes ↗
Whole change: The complete outline
</page_text>

Questions:
Q1. A host constructs the new `DaemonClient` and leaves out its optional `policy` option. Which startup, transport and output limits does the client then use, and where do they come from? Does construction fail?
Q2. Suppose the client's Node-backed runtime module fails to load. The host constructs one `DaemonClient`, then calls `execute()` twice. Does the constructor throw? What do the two calls observe, and does the second call try to load the runtime again?
Q3. For each daemon request kind below, which of these must match before the daemon acts on the request: protocol version, instance id, process token? (a) ping (b) stop (c) execute (d) result-fetch (e) terminate
Q4. The daemon has accepted an `execute` request, then the connection closes before the result arrives. Does `DaemonClient.execute` rerun the command locally?
Q5. After this PR, does the shipped symnav CLI send its commands through the new `DaemonClient`?

For each question give:
- "prediction": your concrete answer (at most 80 words)
- "basis": "page" if words on the page support it, otherwise "inference"
- "quote": if basis is "page", the exact words from the page you relied on (at most 30 words); otherwise ""
- "confidence": 0-100

Reply with only this JSON: {"answers":[{"id":"Q1","prediction":"...","basis":"page","quote":"...","confidence":80}]} with one entry per question.
