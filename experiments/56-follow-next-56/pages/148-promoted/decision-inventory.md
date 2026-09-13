# Decision inventory

This is the authored outline used at every zoom depth. Reasons are scoped to the supplied PR body, commit messages and relevant plans; a test specifying behavior is not itself treated as an explanation.

## Two homes, one active CLI

- **D01 · stated** — Stage package mechanisms; stabilize and freeze 38 active CLI copies.
  PR body: mechanism ownership and host invocation coordination need separate review boundaries. The production consumer switch is deferred.
- **D02 · stated** — Group existing mechanisms by owner; the package has no internal production dependency.
  Architecture spec: a package boundary should identify where a concern belongs. The daemon moves bytes for an injected executor and must know nothing about symbols.
- **D03 · unexplained** — Remove policy-testing export, its lint gate and the associated tests.
  The exact export inventory is specified and the old subpath is called temporary. No reason for the timing of its removal or the deleted lint checks was found in the supplied PR body, commit messages or plans.
- **D22 · unexplained** — Normalize CRLF before the 38-file source hash; still reject content changes.
  Commit subjects specify portable hashing and line-ending normalization. No further reason for choosing this digest mechanism was found. The test's intent is visible; the mechanism is not evidence that the CLI calls the new package.

## A narrow public doorway

- **D04 · stated** — Keep host types Node-free; load the runtime dynamically at construction.
  PR body: host declarations must not acquire Node ambient dependencies. Dynamic loading separates the public declarations from the Node-backed implementation; this does not make actual execution browser-portable.
- **D05 · stated** — The host supplies the readiness command; startup executes it with cold mode and telemetry off.
  The architecture spec assigns command-line syntax to the host and says the daemon should forward argv. The exact cold-mode and telemetry-off settings are carried forward; no separate rationale for those settings is recorded.
- **D06 · unexplained** — Reuse lifecycle composition; separate status timeouts; disabled status/stop and errors reach the host.
  The tests explicitly specify these choices. No additional reason for the persistent composition, distinct status timeout or disabled-control asymmetry was found in the examined prose sources.
- **D23 · stated** — Lock public exports, Node-free declarations and side-effect-only entries with new boundary tests.
  The architecture spec asks for enforced package ownership and a public client/executor/entry surface. The PR body specifically requires host declarations to avoid Node ambient dependencies.

## Choose once; own the result

- **D07 · stated** — Run lazy guards in order: present → not starting → version → responsive; first result stops.
  PR body: the first routing decision must prevent every later side effect. The spec also names readable check order and individually testable checks as the purpose.
- **D08 · stated** — Preserve local/warm routes; make fresh local executors and trigger warm-up independently.
  The architecture spec explicitly preserves the existing routing table and behavior. This PR moves those choices behind the client instead of changing the invocation's result while warm-up progresses.
- **D09 · stated** — Retry locally only when transport says safe; uncertain or accepted work is never replayed.
  PR body: replay safety belongs to the daemon client. The client consumes the existing transport retry authority instead of asking the host to guess whether execution happened.
- **D10 · stated** — Own capture, spool codec and controlled failures; dispose malformed warm output.
  PR body: warm-transfer cleanup and replay safety belong to the daemon client, rather than host storage or output factories. Package isolation also removes the spool's dependency on a CLI codec.

## Private process owners

- **D11 · unexplained** — Adopt validated process coordinates before creating collaborators; reuse their endpoint.
  Commit subjects and construction tests specify validation and adoption. No prose reason for choosing the coordinate object or validation timing was found; the diagram shows the implemented boundary without supplying one.
- **D12 · stated** — Make the registry the one startup-ownership authority, with narrow and full-snapshot checks.
  The architecture spec calls for one lock-ownership check. The PR's commit sequence explicitly centralizes that authority; narrow caller coordinates and complete mutation snapshots refine the same ownership boundary.
- **D13 · unexplained** — Keep distinct authentication paths: normal protocol/instance checks, execution tokens, special control tokens.
  These boundaries are specified in tests and characterized in commits. No reason for using different credential sets for these actions was found in the PR body or plans. Preservation is the overall refactor goal, not a recorded justification for each exception.
- **D14 · stated** — Keep execution, delivery, workers, resources and activity as separate owners; wire callbacks without invoking them.
  The architecture spec explicitly requires this split and owner-based package layout. The callback construction test characterizes the carried composition; it does not introduce another process or merge the sessions.
- **D15 · stated** — Launch real package process/worker entries; load the host executor by URL; entries export no API.
  Architecture spec: give daemon entry points and launch machinery one package home, while running commands through an injected executor without knowing what they are.

## New clock owner, old deadlines

- **D16 · stated** — Use an injectable daemon wall/monotonic clock across timestamps, deadlines and durations.
  The architecture spec gives the daemon its own wall and monotonic clock so telemetry is not a shared utility owner. This PR centralizes those sources while preserving which kind of time the existing mechanisms use.
- **D17 · stated** — Keep idle time armed at construction and reset at acceptance; readiness/completion changes stay deferred.
  PR body: readiness- and completion-based lifetime changes are explicitly deferred behavior. The refactor must preserve acceptance-based idle timing while moving its owner.

## The evidence moves too

- **D18 · stated** — Relocate 37 mechanism test files; use generic package fixtures and built entries instead of CLI coupling.
  The architecture spec says tests that import daemon internals must move into the package or use its public surface. Package extraction must not make the daemon depend on a CLI implementation. This explains the move, not a claim that every old assertion survived.
- **D19 · unexplained** — Re-anchor CLI version rejection at the executor factory; remove the worker-level CLI mismatch test.
  The commit says 'Restore CLI executor version rejection oracle'. No reason is recorded for changing the oracle from worker integration to a direct factory call. Package isolation explains removing CLI coupling, but does not establish equivalent coverage.
- **D20 · unexplained** — Drop CLI readiness timing assertions when switching to the generic worker fixture.
  The fixture change is visible; no reason for these precise deleted assertions was found. This is a narrower observation about one test, not a claim that the entire repository has no timing coverage.
- **D21 · unexplained** — Model Windows forced-exit cleanup as observer-owned, with no process-termination diagnostic.
  The final commit names Windows cleanup ownership and the test encodes the distinction. No prose explanation of the platform behavior was supplied; this canvas does not claim a Windows execution run.
- **D24 · unexplained** — Disable file parallelism for the daemon package's Vitest suite.
  No reason for serializing test files was found in the supplied PR body, commit messages or relevant plans.
- **D25 · unexplained** — Add tsx as a daemon dev dependency for the moved TypeScript helper processes.
  The helper call sites show what uses the dependency. No separate reason for choosing this loader, its version range or source-running helpers rather than built helpers was found in the examined prose.
