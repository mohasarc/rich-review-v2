# Surface, decisions, and receipts

The complete stopping layer is the opening, paper/legend and six **open** edge rows. The headline alone is not the complete layer. All three fold presets preserve the edge rows verbatim. Lower layers give the same facts implementation names, observed examples and source windows.

The narrow subject is **cache lookup lifetime versus handle lifetime and release completion**, within PR #127. Query algorithms appear only far enough to establish what moved and what remained. There is no broader daemon explanation or correctness verdict.

## Decision coverage

| Complete edge | Decisions / surprises already named there | More precise mechanism | Local receipts |
| --- | --- | --- | --- |
| 01 Ownership & API | Generic lifetime moves to core; one service-held scope; six isolated stores; composition and exact exported/private API unexplained; package import direction already exists | Core class source home differs from runtime instance owner; private handle owns its map; scope retains clearable handles | `head-service` 29–65; `scope` 1–46; `exports` 144–155; `base-service` 28–57; PR body |
| 02 Values & failures | Preserve algorithms/keys/stored identity; `undefined` cached; promise rejection retained; synchronous factory throw retried; shared locations and repeated projections; original projection rationale unexplained | `has` → exact return; miss → factory → set; no promise decoration; D/T/I/O service promise identity versus R/L projection | `scope` 9–23; `scope-tests` 5–26; `head-service` 68–170; service tests 29–133; PR body |
| 03 Entries ≠ handles | Synchronous all-store clearing; repeated release; reusable handles; caller-held old promise not cancelled; old settlement cannot replace new entry; no disposal API | Same map object emptied; handle list retained; no settlement callback writes back | `scope` 26–46; `scope-tests` 28–91; controlled core recording |
| 04 Successful refresh | Existing success-only turn boundary retained; failed refresh preserves turn; exported files-only argument unexplained | Backend awaits refresh before service assigns files and clears | Base/head backend 79–85; base service 48–55; head service 63–66; service test 135–162; controlled base/head recording |
| 05 Cleared ≠ finished | Clear before cleanup retained; service becomes promise-returning; backend and service await; rejection propagates at head; parity reconciliation unexplained; held cleanup injected; concrete TS cleanup synchronous | Two awaits change caller completion while preserving cache-clear order; generic graph accepts async cleanup | Base service 124–130/backend 87–89; head service 129–132/backend 87–89; graph 144–152; TS project 78–84; service test 164–217; spec 1–32; PR/follow-up prose; controlled recordings |
| 06 Evidence & limits | 5 retained + 6 added service tests + 4 core tests; tests required by guidance; exact selection unexplained; 5/15 focused passes; controlled probes, no full daemon/parity run | Original tests/helpers byte comparison; new test families; actual run logs and pin/hash census | `guide` 42–47; `scope-tests`; `head-service-tests`; inventory and focused logs |

“Stated” attaches to the reason actually found, not to every adjacent implementation choice. The PR's preservation statement supports the preservation intent of identity and failure handling; it does not supply a historical reason for every retained projection. Commit subjects identify intended work but are not treated as an explanation of exact test selection. Contributor guidance supplies the general reason for adding behavioral tests.

“Unexplained” means no specific reason in the supplied PR body, its six commit messages, relevant supplied repo rules, or inspected architecture/follow-up specifications. It does not mean nobody ever discussed the choice. No implementing conversation was supplied. The PR **does** name the awaited release boundary; the gap is its reconciliation with the parity constraint, not failure to mention `await`.

## All 15 patch hunks

Hunk numbering follows the supplied patch without reordering. All six files, +391/−67, are represented.

| Hunk | File / change | Complete edges |
| --- | --- | --- |
| 1 | backend files argument and release await | 04, 05 |
| 2–3 | service test imports | 06 |
| 4 | six new service cases | 02, 04, 05, 06 |
| 5 | service imports scope and file-array type | 01, 04 |
| 6 | six Maps replaced with scope handles | 01, 02, 03 |
| 7 | beginTurn and definition lookup | 02, 03, 04 |
| 8 | target/caller/callee lookup and service release | 02, 03, 05 |
| 9–10 | position cache getOrCreate, retained rehydration | 02 |
| 11 | reference-location getOrCreate | 02 |
| 12 | remove manual clear sequence | 01, 03 |
| 13 | new core test file | 02, 03, 06 |
| 14 | core scope/handle implementation | 01, 02, 03 |
| 15 | core public export | 01 |

No existing test expectation was removed or weakened: the original five service cases and all following helpers are byte-identical. This is a source comparison, separate from the logged focused executions.

## Analogy boundaries

- The sheet is a semantic paper construction, not a physically realizable origami design, memory diagram, or program simulator. Unfolding also extends the space for microprint.
- Vertical folds juxtapose owners; horizontal folds separate persistent handles from old lookup entries and separate clear from cleanup completion. The paper does not measure elapsed time or force.
- Core color marks where the generic class is implemented. The service still owns its instance. The gray paper marks a collaborator, not a third package: the TypeScript graph extends the core graph.
- Six drawn entries illustrate the six real source families. They are not a measured occupancy report, and simultaneous folds do not prove six real algorithms were executed.
- The gold and green promise slips replay a head core test with injected deferred settlement. They are not an observation from a daemon command.
- The raised backend/cleanup flaps are a geometry analogy. The captured promise-state readout is authoritative. Opening a sheet for reading does not finish cleanup or refill a cleared lookup.
