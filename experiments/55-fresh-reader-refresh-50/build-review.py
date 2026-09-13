"""One comparison table, published as offline HTML and Markdown."""
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parent
routes = json.loads((ROOT / "routes.json").read_text())
route_map = {r["id"]: r for r in routes}
rows = []


def row(id, subject, learned, miss, flag="None witnessed on the selected path.", refs="", scope=False):
    route = route_map[id]
    rows.append({**route, "subject": subject, "learned": learned, "miss": miss,
                 "rule4": flag, "witnesses": refs.split(), "limited_scope": scope,
                 "flagged": flag.startswith("R4:"),
                 "url": "../" + route["folder"] + "/" + route["file"],
                 "capture": "captures/" + id + "-entry.txt"})


row("01", "stack + #127",
    "Core owns reusable retention; daemon mechanisms are staged before the CLI switch. The complete sheet teaches per-owner publication, six query stores, optional client policy, protocol 5, relative cwd and changed tests. It also teaches FIRST configured owner as primary and says an existing #127 test call gains await.",
    "Two corrections: LAST configured owner becomes primary [S1]; the old five #127 cases/helpers are byte-identical, with six new service cases plus four core cases [C2]. The awaited-release behavior itself is already disclosed by the page [C1].",
    refs="S1 C2 C1")
row("02", "#131",
    "An existing policy snapshot now supplies required CLI inputs through caller, daemon and worker. Purpose selects 100/250 ms; admission has five seconds. Retry scopes were already separate; later error selection changes. Adapters clamp tiny limits, create directories, ignore a legacy memory field and change test stimuli.",
    "The top names parent reparsing but I did not learn that malformed policy now throws before Worker allocation [P1]. Helper precedence and the benchmark's seven-field record with schemaVersion still 1 also remained outside my first-pass decisions [P4].",
    refs="P1 P4")
row("03", "#148",
    "Two graphs coexist; 38 app files freeze at head and the CLI has not adopted the package. Twenty-four fronts disclose constructor-started retained loading, optional policy, an injected readiness probe, control asymmetry, lazy guards, safe replay, malformed-output disposal, ownership/clock changes and moved or narrowed tests.",
    "Correct the broad missing-rationale claim for policy-testing: the pinned policy plan states its retirement condition [M5]. Centralizing ownership comparisons should include a concrete changed outcome, such as same instance with conflicting identityKey [M4].",
    refs="M5 M4")
row("04", "#127",
    "Six cache lifetimes move to core; successful refresh and explicit release still choose boundaries. Rejected promises remain cached, synchronous throws retry, and release clears before awaiting projects. The top labels the failure-path change 'PR body silent'; minimal handles, composition and file-list input are separate choices.",
    "The PR body explicitly discloses the awaited boundary and Promise<void> API. Its deeper reason paragraph says so too. Keep only the narrower unexplained reconciliation with preservation intent [C1]. No additional cache decision found in the full diff [C2].",
    "R4: attribution changes from 'PR body silent' at the top to 'PR body shows it' below [C1].", "C1 C2")
row("05", "#131",
    "The dependency graph and process graph differ: the worker remains in the daemon process, and required values do not prove provenance. Twelve fronts cover timeout purpose, later error selection, terminal failed fetch, adapter normalization, changed storage stimuli, removed tests and a finite source-spelling guard.",
    "Add the parent-parse failure boundary [P1]. Benchmark record growth is already named, but unchanged schemaVersion and the different explicit-policy/legacy-option precedence rules were not learned [P4].",
    refs="P1 P4")
row("06", "#148",
    "The new client hub coexists with the shipped CLI hub. Head hashes are not pairwise equivalence. Test relocation precedes adoption; clocks/coordinates change before freezing. Portable declarations still load Node; policy/probe, fresh local attempts, disabled controls and replay boundaries are explicit. Policy-testing retirement is planned.",
    "The selected source checks support the staged ownership and recorded-retirement account [M5, M6]. I could not predict the conflicting-identity owner result from centralization alone; an explicit before/after case would add that decision to recall [M4].",
    refs="M4 M5 M6")
row("07", "stack timeline",
    "Main already had a daemon. The timeline separates each owner move, #148 staging and #149 cutover. Its overview names protocol changes, missing deadlines, deferred idle/cache behavior, changed tests and a template edit; the stops carry longer decision inventories. #127 says clear before awaited release.",
    "Make #127's old early fulfillment versus new pending/rejecting completion explicit [C1]. The #131 stop did not teach later-completion error selection or parent rejection before worker allocation; these need their intermediate revision labels [P1, P2].",
    refs="C1 P1 P2")
row("08", "#131 + #148",
    "Test evidence depends on stimulus and which graph ran. Tiny-limit adapters can leave outputs inline; recovery budgets predate counters. #148 tightens ownership, validates coordinates earlier, preserves auth asymmetry and idle timing, loads Node behind portable declarations, and narrows some observations. Surviving disk and CLI tests are counterevidence.",
    "A remaining #131 failure-boundary decision is parent validation before worker allocation [P1]. Adapter import changes also reach benchmark output shape and wrapper precedence [P4]; the tested-path analysis did not make those predictable.",
    refs="P1 P4")
row("09", "#127 + #131",
    "The intent/shipped map separates declared await from unexplained cache composition and API narrowing. It distinguishes cached promises from rebuilt projections, throws from rejection, and successful refresh from failure. Policy fronts retain purpose timers, separate retry scopes, later errors, residual numeric seams and changed test adapters/oracles.",
    "Add parent-side failure before worker creation [P1]. 'Positive output ordering' needs the transport floor/directory and conditional workspace translation to predict fixture state [P3]. Benchmark schema/record and helper precedence were not learned [P4].",
    refs="P1 P3 P4")
row("10", "#127",
    "One context request shares reference discovery across outward questions; returning the command does not clear caches. Successful later refresh or release does. Eight fronts expose six isolated stores, cached undefined, reprojection, failure storage, clear-then-wait, the minimal handle API, files input and ten added tests.",
    "No additional consequential miss found in the full six-file diff. The test expansion and separate release barrier are supported [C1, C2]. The host actions remain separate from the context command.", refs="C1 C2")
row("11", "#131",
    "Twenty-two moves separate actual choices from hypothetical coaching alternatives. They carry capacities/clocks, admission versus completion, old nested recovery scopes, terminal fetch failure, later error selection, idle/diagnostic retention, adapters, the 64 KiB floor, seven removed resource cases, inert startup tuning and finite source guards.",
    "The constructor's new synchronous policy rejection before Worker is an additional failure-location decision [P1]. Helper precedence and benchmark record/schema consequences were also absent from my recalled move list [P4].",
    refs="P1 P4")
row("12", "#148",
    "Six clues and 24 fronts cover staged copies, host inputs, constructor loading, lazy routing, replay/capture, coordinates, registry comparisons, auth, clocks/idle and moved or narrowed tests. A deeper host map adds an optional policy object to the generic environment supplied by the host.",
    "Omitted policy uses currentSystem [M1]. Add the conflicting-identity ownership outcome [M4]. Split the recorded policy-testing retirement condition from still-unexplained individual assertion removals [M5].",
    "R4: D01's generic host-input front first becomes an optional policy decision in the deeper host map [M1].", "M1 M4 M5")
row("13", "#131",
    "The owner register leads with later error selection and changed fixture stimuli. It explicitly carries the 64 KiB floor, eager mkdir, ignored memory cap, purpose timers, nested budgets, resource/diagnostic values, retired tuning options, helper bridges and finite source checks. File paths follow the explanation.",
    "Add parent validation before worker allocation [P1]. The helper bridge also chooses precedence and changes emitted benchmark record shape without a schema bump [P4].",
    refs="P1 P4")
row("14", "stack",
    "The six introductory facts are an index to a long complete sheet. It separates processes from package ownership, source/project transactions from global atomicity, guard identities from credentials, and execution from delivery. It explicitly teaches LAST primary owner, cwd normalization and lost/narrowed CLI observations.",
    "The primary-owner and cwd/test predictions checked against the final diff are supported [S1, S2]. No additional consequential miss found in these targeted stack comparisons; this is not an exhaustive semantic audit of all 26 PRs.",
    refs="S1 S2")
row("15", "#131",
    "The two-actor simulation teaches purpose clocks, accepted recovery and output capacity. Eleven front cards disclose later errors, failed fetch despite limit two, adapters and retired stimuli before play. Virtual time/motion are illustrative; socket observations are separate. No new accepted-completion deadline is claimed.",
    "The policy-to-worker line needs the earlier parent rejection consequence [P1]. The simulation does not recover helper precedence or benchmark record/schema choices; retain those as explicit prose decisions [P4].",
    refs="P1 P4")
row("16", "#131",
    "Dragging whole modules changes static imports without proving runtime relocation. Actual #131 moves input authority while mechanisms remain in the CLI. Eleven fronts cover threshold families, resource derivation, timers, nested counters, helpers, deleted tests, translated fixtures, later errors and source guards. Compilation/URL/transitive claims are expressly excluded.",
    "A dependency picture cannot establish when the parent can throw: surface pre-allocation policy validation [P1]. Add helper precedence and benchmark record/schema changes to the decision register [P4]. The tool's declared static limits themselves are not a surprise.",
    refs="P1 P4")
row("17", "#127",
    "A controlled graph makes the boundary concrete: base can fulfill while head remains pending, with both caches already empty. Nine fronts teach identity/projection differences, failed refresh, failure storage, minimal API/files and ten added tests. The interface replays recorded checkpoints rather than pausing live execution.",
    "No additional consequential miss found in the full diff. The graph-double qualification matches the new rejection test; it does not establish a long delay in ordinary concrete cleanup [C1, C2].",
    refs="C1 C2")
row("18", "#148",
    "The negative-space outline protects the old CLI route and unchanged product algorithms. Eight families cover deferred idle semantics, clock/coordinate changes, ownership comparisons, routing effects, safe-only replay, a local codec and changed tests. The implementation graph is staged rather than adopted.",
    "I did not learn optional policy/currentSystem or constructor-time retention of a rejected runtime load [M1]. The concrete conflicting-identity ownership outcome is also stronger than merely naming centralization [M4].",
    refs="M1 M4")
row("19", "#131; declaration-only scope",
    "Declarations teach required versus optional inputs, retired surfaces, purpose vocabulary, structural widths and assignability, the optional stored-record cap and adapter APIs. The page expressly says types cannot establish values, validation, wiring, loop behavior or weakened assertions.",
    "The diff supplies runtime decisions the chosen scope excludes: earlier worker rejection [P1], retry/error behavior [P2] and changed fixture state [P3]. Link to a complete runtime explanation when this artifact is used as a review entry point.",
    "Declared limit: the missing runtime account is announced, so no hidden-depth surprise is asserted.", "P1 P2 P3", True)
row("20", "#127 + #131 tabs",
    "Cache contracts distinguish exact cached identity from fresh projections, reusable handles and non-global rollback. The #131 overview explicitly teaches parent parsing before Worker and synchronous rejection, separate retries, later error, failed fetch, floors/mkdir/inert knobs, removed derivation cases and residual scalar seams. The matrix is much longer than its overview.",
    "Parent failure timing is already taught [P1]. My first pass did not retain #127's six-plus-four test split [C2] or the #131 benchmark record/schema and adapter precedence decisions [P4]; these would benefit from explicit overview entries even where type rows expose pieces.",
    refs="P1 C2 P4")
row("21", "stack; main page",
    "The compressed film leads to the complete decision map: 117 grouped PR decisions, moved/deleted tests, optional host policy, separate publications, deferred behaviors and policy values. Its six stages distinguish #148 staging from #149 cutover. The film is explicitly synthetic orientation.",
    "I could not predict which overlapping configured project becomes primary [S1] or the relative control-cwd change [S2] from the complete-sheet recall. Add those policies to their owner/host fronts.",
    refs="S1 S2")
row("21-video", "stack; film supplement",
    "The six captioned stages orient the reader from retained core state through policy and protocol owners to staged package mechanisms and final CLI cutover. Untimed waits and idle events are distinguished. Captions were read through the main film controls; narration/audio quality was not evaluated.",
    "Primary-owner and relative-cwd decisions remain outside this compressed account [S1, S2]. It needs the linked main map for review; it is not advertised as a complete standalone treatment.",
    "Declared limit: a compressed supplement, not an independent complete top.", "S1 S2", True)
row("22", "stack; game + open contracts",
    "Five open contracts separate package maps, retained lifetimes, first routing guard, FIFO/worker handoff and durable delivery. Before play, original acceptance, no duplicate side effects, one captured stream wait, resource sampling and ACK cleanup are explained. The toy does not execute real disk or digest operations.",
    "The complete subject still needs primary-project ownership and host cwd normalization [S1, S2]. They were not inferable from this game or my contract-sheet recall. The toy disclaimer correctly bounds the gameplay evidence.",
    refs="S1 S2")
row("23", "#148; zoom canvas",
    "The root presents 25 choices in six rooms: stage mechanisms, keep the CLI graph, add client inputs/loading/routing, separate clocks and authority, move tests. D13 names token/protocol paths and control exceptions generically. The public-client room first adds optional policy; a decision room first partitions credentials.",
    "Promote optional policy with currentSystem [M1] and the request-specific credential branches [M2]. Correct the policy-testing absence label using the unchanged plan's retirement condition [M5].",
    "R4: optional policy first appears in the client room [M1]; D13's control exceptions first become a usable request partition deeper down [M2].", "M1 M2 M5")
row("24", "#127",
    "Seven question fronts predict exact cache versus projected identity, same-turn failures, successful versus failed refresh, pending/rejecting release and refill during the wait. They also teach files input, composition and the small reusable scope API. Declared await is separated from its unresolved parity rationale.",
    "No additional consequential miss found in the full diff. The release answer adds mechanism without changing its front's predicted result [C1, C2].",
    refs="C1 C2")
row("25", "#131",
    "Thirteen pocket decisions precede the private sketch. Package/value flow differs from runtime boundaries; retry scopes remain nested. Positive output ordering, fixture changes, an unused startup timeout, later error selection and helper migration are stated. Drawing is temporary and stores no review.",
    "Add the parent validation/allocation order [P1]. Give enough of the helper floor/conditional translation to predict disk state [P3], and retain benchmark schema/record plus precedence choices outside the drawing [P4].",
    refs="P1 P3 P4")
row("26", "#127",
    "The post-office analogy explicitly breaks at cancellation, access during release and public projection identity. Eight fronts teach six distinct caches, undefined, rejected versus thrown factories, successful refresh, clear-then-wait, nonterminal handles and narrower file input. Core owns clear mechanics; the same service still selects boundaries.",
    "No additional consequential miss found in the full diff. The deeper ownership diagram adds fidelity to the same cache and release contract [C1, C2].",
    refs="C1 C2")
row("27", "#131 + #148; test windows",
    "The same default recovery reproduction succeeds on both builds, so the new test is not a new capability. The front says zero-spill becomes a threshold crossing; opening it distinguishes a spool fixture from transport normalization. #148 windows cover two-copy tests, private mocks, auth/coordinates, idle, clock-scan scope and lost observations.",
    "Qualify the top's spill statement by adapter: a transport zero can stay inline after a 64 KiB clamp [P3]. The #131 parent failure boundary is another decision not learned from these selected test windows [P1].",
    "R4: opened row 05 restricts the general-sounding zero-spill statement and reveals a different transport storage outcome [P3].", "P3 P1")
row("28", "#131",
    "Reference radius is a selected-symbol proxy, not runtime impact. Fifteen front decisions retain choices with no meaningful metric: later error identity, fixture changes, deleted resource tests, private unknown casts and policy-derived expectations. Zero references cannot erase them from the review.",
    "Parent validation before worker allocation has a failure consequence the radius cannot supply [P1]. Helper precedence and benchmark record/schema decisions are further examples needing explicit non-metric entries [P4].",
    refs="P1 P4")
row("29", "#148; proposed explanatory cuts",
    "Four cuts separate clocks, authority, staging and host client; they are proposed review boundaries, not verified cherry-picks. A1 generally moves clock ownership, B4 retains auth exceptions, and later prose first distinguishes standalone queue default from existing process injection and names credential branch order.",
    "Add optional policy/currentSystem [M1], a concrete stricter ownership outcome [M4], and the recorded policy-testing condition [M5]. Promote queue default versus composed behavior [M3] and the authentication partition [M2].",
    "R4: A1's queue-default distinction [M3] and B4's request-specific authentication [M2] first arrive below the declared stopping map.", "M1 M2 M3 M4 M5")
row("30", "#146 + #147",
    "Sessions remain in the CLI process while ledger, spool and queue retain authority. Acceptance is immutable across duplicates; one latest stream promise is captured, ordinary ACK is not the FIFO barrier, and sampling gates the next turn. Alias authentication types, trace fencing/order, cleanup-before-ACK and clock-provider changes are explicit.",
    "No additional consequential miss found in the selected adjacent-pair production/test hunks [D1]. The single captured promise and cleanup failure qualification were already on top. This is a bounded source comparison, not an executed session audit.",
    refs="D1")
row("31", "#127",
    "Twelve runbook decisions separate stated clear-first rationale from newly connected release completion/failure and missing parity reconciliation. Failed refresh preserves cache rather than every earlier side effect. Sequential project release can stop at an error. Composed scope, minimal nonterminal handles and the file list are separate choices.",
    "The full diff supports the release account and six-service/four-core test expansion. No additional consequential miss found [C1, C2].",
    refs="C1 C2")
row("32", "#127; kit demo",
    "Ten complete fronts teach the clear ownership move, exact cache versus outward identity, reusable handles, file-list input and awaited release with a parity gap. Same-process object/code boundaries are explicit. Old tests are retained; this demo does not claim to have executed source assertions.",
    "No additional consequential miss found in the full diff. Retained old cases and the newly awaited boundary are supported [C1, C2].",
    refs="C1 C2")
row("32-starter", "#127; one-decision template",
    "The component example teaches only core ownership of clearing. It expressly links to the full demo for the rest of the review rather than presenting its single card as the complete #127 decision set.",
    "Awaited failure propagation [C1], six-store semantics and changed tests [C2] are outside the declared example. Keep the full-demo link prominent if the starter is copied.",
    "Declared limit: a one-decision template, not a concealed omission.", "C1 C2", True)
row("33", "#127; metaphor opening",
    "The workshop/trays opening leads to ten complete decisions. Clearing precedes a new completion barrier; exact identity differs from projections; the graph is controlled and ordinary concrete cleanup is synchronous. Refresh, scope lifetime, composition, file-list input and tests remain explicit.",
    "No additional consequential miss found in the full diff [C1, C2]. The explanatory body matches the failure-opening variant; opening preference here is one sequential reader's impression, not measured comprehension.",
    refs="C1 C2")
row("33-failure", "#127; failure opening",
    "The opening directly predicts the old fulfilled/head pending moment before the same ten-decision body. It separates synchronous clearing from awaited release, cached values from projected arrays/nodes, reusable scope from disposal, failed refresh from rollback, and controlled graph evidence from ordinary cleanup.",
    "No additional consequential miss found in the full diff [C1, C2]. The opening made the pending-state prediction available earlier for this reader; no independent A/B effect is claimed.",
    refs="C1 C2")
row("34", "#131",
    "Evidence strips still precede a complete 23-decision register. Tiny-timeout examples are labeled source assertions, not defaults or new runs. The register includes later errors, distinct recovery scopes, positive-policy fixture changes, the 64 KiB floor/mkdir, inert tuning, seven deleted resource cases and finite source scans.",
    "Add parent rejection before Worker allocation [P1]. Helper precedence and the emitted benchmark record with unchanged schemaVersion did not enter the first-pass decision list [P4].",
    refs="P1 P4")
row("35", "#148",
    "Twenty future-self fronts preserve the intermediate graph. Optional host policy, one loading promise, control asymmetry, fresh local attempts, no unsafe replay, clocks/idle, auth/registry comparisons, moved tests and narrowed observations are explicit. Policy-testing retirement is labeled unexplained.",
    "The pinned plan does state the retirement condition [M5]. Separate it from still-unexplained assertion choices. Naming registry comparison ownership also benefits from the same-instance/conflicting-identity before/after example [M4].",
    refs="M5 M4")
row("36", "#127",
    "Identity matrices compare objects only within a build and separate stored values from service returns. Failed refresh preserves blocks; success/release creates fresh values. A separate table shows backend completion while projects are held. Ten fronts disclose composition, files, reusable handles and thrown/rejected behavior; the fixture is controlled.",
    "No additional consequential miss found in the full diff [C1, C2]. The matrix is correctly bounded as an identity observation rather than a parity proof.",
    refs="C1 C2")
row("37", "#127",
    "Twelve threads separate shape, choices and mechanism. The root includes cache/projection identity, failed refresh, refill during release, narrowed files API, minimal handles and the new promise dependency. Its test front says the old five cases/helpers are byte-identical, conflicting with page 01.",
    "The source settles that conflict in this page's favor: all old cases/helpers are unchanged [C2]. No additional consequential miss found in the full diff; await versus preserved clearing is already distinguished [C1].",
    refs="C1 C2")
row("40", "#127",
    "Twelve decisions combine ownership maps, a pending moment, request playback and identity matrices. They explicitly qualify sequential graph failure, synchronous concrete cleanup, retained file-array reference, and the lack of a new delayed-success or daemon test. Clear-first rationale and parity reconciliation remain separate.",
    "The full diff supports the detailed test account, including unchanged old cases [C2]. No additional consequential miss found; the graph-double and release qualifications are already complete at the front [C1].",
    refs="C1 C2")
row("49", "#127 control + #148 variant study",
    "The report discloses four earlier agent-reader outputs and contains a complete #127 control. It reports the first-owner correction, parent validation order, two sentence-level variant edits and the remaining optional-policy omission. It was read after original pages and supplies leads rather than an independent blind result.",
    "Pinned checks support the #127 old-test account [C2], last-owner correction [S1] and parent allocation boundary [P1]. No additional miss found in these targeted comparisons. This reading does not add an unfamiliar-human result to its prompted agent study.",
    refs="C2 S1 P1")
row("49-original23", "#148; original canvas copy",
    "Rendered explanatory text matches page 23. The root names 25 grouped choices, but optional policy first arrives in the client room and request-specific credentials arrive below D13. Staging, client ownership, clocks, tests and generic authority boundaries are already learned.",
    "Same source-backed gaps as 23: optional policy/currentSystem [M1], the credential partition [M2], and the recorded testing-subpath retirement condition [M5]. This is a repeated surface, not another unfamiliar reader.",
    "R4: repeats 23's optional-policy [M1] and authentication [M2] descents.", "M1 M2 M5")
row("49-original29", "#148; original cuts copy",
    "Rendered explanatory text matches page 29. Four proposed cuts cover clocks, authority, staging and the client. The map's generic clocks/auth labels become the queue-default distinction and concrete authentication branch order only on descent.",
    "Same source-backed gaps as 29: policy/default [M1], explicit ownership outcome [M4] and retirement condition [M5], plus the two promotions [M2, M3]. No independent trial is counted.",
    "R4: repeats 29's queue-default [M3] and authentication [M2] descents.", "M1 M2 M3 M4 M5")
row("49-revised23", "#148; revised canvas copy",
    "The root D13 now says ping/stop use protocol+instance without a token; other normal requests add a token; identify/terminate/kill take an early instance+token path. Other explanatory text matches the original, including the generic host input statement.",
    "The selected authentication promotion is supported [M2]. Optional policy/currentSystem still needs promotion [M1], and the testing-subpath retirement condition still needs the plan context [M5].",
    "R4: the selected auth surprise is removed; optional policy still first appears in the deeper client room [M1].", "M1 M2 M5")
row("49-revised29", "#148; revised cuts copy",
    "A1 now explicitly says standalone queue Date.now becomes monotonic while the process already injected monotonic time. This allows the selected clock prediction at the map. Other explanatory text remains the same four-cut review, including generic B4 authentication exceptions.",
    "The clock promotion is supported [M3]. Optional policy/default [M1], concrete ownership outcomes [M4] and the recorded retirement condition [M5] remain source-pass additions; authentication still needs a top partition [M2].",
    "R4: the selected queue-clock surprise is removed; B4's authentication partition still arrives deeper [M2].", "M1 M2 M3 M4 M5")
row("50", "#148; recombined explanation",
    "Twenty-six complete rows explicitly teach the stricter owner outcome, seven removed timing assertions, missing 257 MiB entry oracle, optional policy/currentSystem, retained runtime rejection/composition, auth partition, standalone clock change, Windows observer branch, test serialization and the recorded retirement condition. The two implementation graphs remain separate.",
    "The targeted #148 source/plan checks support these claims [M1–M6]. No additional consequential miss found in this comparison. Several leads were already source-informed donations from earlier critiques; this is corroboration, not a fresh discovery or a full parity proof.",
    refs="M1 M2 M3 M4 M5 M6")
row("51", "stack",
    "Nine large fronts teach LAST primary owner, per-owner publication, parent parsing before allocation, adapter floor/inert field, benchmark record growth, final recovery behavior, one captured delivery wait, queue default versus composed clock, retained idle semantics and narrowed end-to-end tests. The small opening is explicitly an index.",
    "Targeted final-stack checks support the owner/cwd/test and recovery distinctions [S1, S2, P2]. Preserve the qualifier: original-error preservation concerns accepted-close exhaustion/reattachment failure, not every error category. No additional consequential miss found in those checks.",
    refs="S1 S2 P2")
row("52", "#131 study hub",
    "The hub says compact and fuller layouts carry the same propositions and reports scroll reduction. It explicitly says an unfamiliar-reader comparison is unrun. It routes to three teaching surfaces rather than adding a separate symnav account.",
    "At the page-pass cutoff its README was a JSON survey rather than the required playbook headings. That is a documentation finding. Diff comparisons belong to the three variant rows below; no reading-efficiency or comprehension effect is established by this critique.",
    "Declared scope: navigation/study hub; no new rule-4 surprise witnessed.", scope=True)
for id, layout in [("52-compact", "compact"), ("52-fuller", "fuller"), ("52-transfer", "transfer baseline")]:
    row(id, "#131; " + layout,
        "Thirty fronts include required/scalar seams, clocks and caps, nested retries with terminal failed-fetch qualification, later error, parent parsing before allocation, floor/mkdir/conditional-zero/inert-memory adapters, helper precedence, deleted/default-derived oracles, source scans, benchmark schema/record and unknown casts. " +
        ("The two layout captures have identical rendered propositions." if id != "52-transfer" else "The before-map wording differs slightly; the decisions remain."),
        "No additional consequential miss found in the selected #131 production, helper, test and benchmark comparison [P1–P5]. These surfaces already expose the repeated missing decisions from earlier policy pages. Identical propositions do not establish equal comprehension or a layout preference.",
        refs="P1 P2 P3 P4 P5")
row("53", "#127; spring/tether",
    "The spring marks a release dependency, not elapsed duration or physical force. Twelve fronts cover cache/projection identity, nonterminal handles, refresh, clear-before-wait, files/composition and a controlled graph. The instrument discloses it measures definition reuse only despite a six-slot picture; unchanged surrounding machinery and tests are stated.",
    "The old-five-case assertion is supported [C2], and no additional consequential miss was found in the full diff [C1]. The spring should preserve these already-stated contracts while changing the representation; it is not a new runtime measurement.",
    refs="C1 C2")

assert len(rows) == 53
assert {r["id"] for r in rows} == set(route_map)
assert sum(r["flagged"] for r in rows) == 9
(ROOT / "review.json").write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n")


def cite_html(text):
    text = html.escape(text)
    text = re.sub(r"\[([CMPDS][0-9](?:[–,] ?[CMPDS]?[0-9])*)\]",
                  lambda m: "[" + ", ".join(f'<a href="witnesses.html#{key}">{key}</a>'
                    for key in expand(m.group(1))) + "]", text)
    return text


def expand(s):
    if "–" in s:
        first, last = s.split("–")
        return [first[0] + str(i) for i in range(int(first[1:]), int(last[-1]) + 1)]
    return [x.strip() for x in s.split(",")]


INTRO = [
    "A page can name the right owner and still leave the reader unable to predict a result. In this pass, the repeated "
    "gaps concern when failure becomes visible, which default applies when an input is omitted, which credential branch "
    "a request takes, and whether a test still reaches the same state.",
    "This is one comparison table for 53 reading surfaces across 43 completed teaching/study experiments. The complete "
    "critique is this introduction plus every table row. The source receipts add fidelity to the findings already named "
    "there. Nine surfaces have witnessed rule-4 surprises across five recurring kinds: rationale attribution, optional "
    "policy, authentication partition, fixture translation, and queue-clock default. Repeated variants are included in "
    "that count; it is not a failure rate or completeness score.",
    "The clearest factual corrections are page 01's first-owner and changed-old-test claims, page 04's 'PR body silent' "
    "label, and several #148 pages' missing policy-testing retirement context. Several complete #127 registers had no "
    "additional consequential miss in the full six-file diff. The table retains both outcomes; it does not rank pages "
    "or judge symnav correctness.",
]
METHOD = [
    "Order: philosophy, required playbook sections, page-only readings, sealed recall, then pinned diffs/source. "
    "The page-pass census began at 05:30 UTC and closed at 05:43:01 UTC on 13 September 2026; source capture began at "
    "05:43:56. Pages 50/51/53 were added before the seal. The table's learned column is an edited condensation of the "
    "sealed notes, not a reconstruction written after the diff.",
    "A reading surface is a documented finished teaching entry, variant or supplement. The cohort covers 01–37, 40, "
    "49–53, plus their documented variants. Both subjects in 01 and 20 share their entry row. Critique reports "
    "38/39/41–48, evidence viewers, build templates, abandoned attempts and unfinished 54 were excluded. The 49 and "
    "52 hubs are included because they contain a teaching control or lead to comparison pages. Finishes after the "
    "seal do not enter a purported pre-diff reading.",
    "This was one agent reading overlapping subjects sequentially, not independent unfamiliar readers. README entry "
    "metadata exposed earlier critique summaries concerning 04/23/27. Later pages 49/50 themselves supplied source-led "
    "findings. Those are disclosed leads and corroborations, not discoveries credited to a blind trial. No child agents "
    "or human participants were used.",
    "I read each declared complete layer and selected explanatory descents in a browser, with preformatted code "
    "withheld; inline author quotations remained part of the page. Captures preserve full rendered text, sometimes "
    "including off-camera canvas content. I did not open every drawer, test every simulator state, or assess video audio. "
    "A named descent witness is stronger than an unremembered item: the latter remains a bounded first-pass miss, "
    "not a claim that the text occurs nowhere in the artifact.",
    "Source coverage: the full #127 six-file diff; #131 production changes and selected helper, test, policy and benchmark "
    "context; #148 changed app/client/clock/registry/routing and test-boundary hunks plus the historical policy plan; "
    "selected #146/#147 session and ledger changes; final-stack ownership, recovery, host cwd and test removals. "
    "All full pinned patches are saved. The 43,584-line net stack diff and the large copied #148 graph were not given "
    "an exhaustive line-by-line semantic audit. No symnav test suite, benchmark or malformed-input runtime probe was run.",
    "Rule 4 is flagged where the declared complete layer gives only a category or an incompatible statement, and the "
    "selected deeper explanation first supplies a consequential decision or reverses the reader's prediction. "
    "Additional source spelling and numerical detail alone do not trigger a flag. 'None witnessed' is bounded to "
    "the inspected path; a declared narrow scope is recorded separately. Source-only misses are kept in their own column.",
]

STYLE = """
:root{color-scheme:light;font:16px/1.55 system-ui,sans-serif;color:#202d34;background:#f7f6f1}
*{box-sizing:border-box}body{margin:0}main{max-width:1600px;margin:auto;padding:38px 28px 80px}
h1{font-size:clamp(28px,4vw,52px);line-height:1.1;max-width:1000px;margin:8px 0 24px}
.eyebrow{letter-spacing:.13em;font-size:12px;font-weight:700;color:#52666d}.lede{max-width:980px;font-size:19px}
p{max-width:1060px}a{color:#086184;text-underline-offset:.16em}nav{display:flex;gap:18px;flex-wrap:wrap;margin:22px 0}
.flow{display:flex;align-items:center;gap:15px;margin:28px 0;flex-wrap:wrap}.flow span{padding:10px 15px;border:1px solid #899aa2;background:white}
.method{margin:24px 0 36px;padding:20px 24px;background:#e8edeb;border-left:4px solid #627d82}.method p{font-size:14px;margin:9px 0}
.toolbar{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin:20px 0}input{font:inherit;padding:8px;border:1px solid #788c95;border-radius:3px;min-width:280px}
button{font:inherit;padding:8px 12px;border:1px solid #788c95;background:white;cursor:pointer;border-radius:3px}
table{border-collapse:collapse;width:100%;table-layout:fixed;background:#fff}caption{text-align:left;font-size:14px;margin-bottom:12px;color:#435b65}
th{text-align:left;position:sticky;top:0;background:#243e4a;color:#fff;z-index:1;font-size:14px}th,td{padding:17px 16px;vertical-align:top;border:1px solid #c4cecf}
th:first-child{width:15%}th:nth-child(2){width:33%}th:nth-child(3){width:34%}th:nth-child(4){width:18%}td{font-size:14px;overflow-wrap:anywhere}
.r4{background:#fff2da}.badge{display:block;margin:10px 0;font-size:12px;font-weight:700;color:#965317}.meta{display:block;color:#547079;font-size:12px;margin-top:9px}
tr:target{outline:4px solid #dbb85d;outline-offset:-4px}[hidden]{display:none!important}footer{font-size:14px;margin:30px 0}
@media(max-width:900px){main{padding:22px 12px}table{table-layout:auto;min-width:1050px}.tablewrap{overflow-x:auto}th{position:static}}
@media print{.toolbar{display:none}main{padding:0}.method{break-inside:avoid}th{position:static}td{font-size:10px}tr{break-inside:avoid}}
"""
parts = ['<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
         '<title>55 · Fresh reader, then diff</title><style>' + STYLE + '</style><body><main>',
         '<div class="eyebrow">BRIEF 55 · CRITIQUE · SEALED PAGE PASS → PINNED SOURCE PASS</div>',
         '<h1>What the page taught.<br>What the diff still had to teach.</h1>',
         '<div class="flow" aria-label="Reading sequence"><span>Read the complete page</span>→<span>Seal learned decisions</span>→<span>Read the pinned diff</span>→<span>Compare in one table</span></div>']
parts += ['<p class="lede">' + html.escape(p) + '</p>' for p in INTRO]
parts.append('<nav><a href="#comparison">Comparison ↓</a><a href="witnesses.html">Pinned witnesses</a><a href="review.md">Markdown copy</a><a href="README.md">README</a><a href="before-diff-seal.json">Page-pass seal</a></nav>')
parts.append('<div class="method" id="method"><strong>How to interpret the table</strong>')
parts += ['<p>' + html.escape(p) + '</p>' for p in METHOD]
parts.append('<p><a href="notes/01-09-before-diff.md">Sealed recall 01–09</a> · <a href="notes/10-53-before-diff.md">Sealed remaining recall</a> · <a href="routes.json">Cohort manifest</a> · <a href="evidence/diff-inventory.json">Pinned revision/diff inventory</a></p></div>')
parts.append('<div class="toolbar"><label for="filter">Find a page or decision </label><input id="filter" type="search" placeholder="e.g. 23, worker, policy"><button id="flags" type="button" aria-pressed="false">Show witnessed R4 only</button><button id="reset" type="button">Show all</button><output id="count">53 surfaces</output></div>')
parts.append('<div class="tablewrap"><table id="comparison"><caption>Read left to right: the learned column precedes any input diff; the next two columns follow source inspection. All 53 rows are visible by default.</caption><thead><tr><th>Finished page / scope</th><th>Decisions learned without the diff</th><th>Newly learned or corrected after the diff</th><th>Rule-4 surprise on the inspected path</th></tr></thead><tbody>')
for r in rows:
    parts.append(f'<tr id="page-{r["id"]}" data-flag="{str(r["flagged"]).lower()}"><td><a href="{r["url"]}"><strong>{r["id"]} · {html.escape(r["folder"].split("-",1)[1])}</strong></a><span class="meta">{html.escape(r["subject"])}</span><span class="meta"><a href="{r["capture"]}">Saved page-only text</a> · <a href="#page-{r["id"]}">Row link</a></span></td>')
    parts.append('<td>' + cite_html(r["learned"]) + '</td><td>' + cite_html(r["miss"]) + '</td>')
    parts.append('<td' + (' class="r4"' if r["flagged"] else '') + '>' + cite_html(r["rule4"]) + '</td></tr>')
parts.append('</tbody></table></div><footer>All finding receipts are local and pinned. This artifact stores no reader responses. '
             '<a href="#method">Return to method ↑</a> · <a href="README.md">Open/verification details</a></footer>')
parts.append('''<script>
const input=document.querySelector('#filter'),flagButton=document.querySelector('#flags');
const rows=[...document.querySelectorAll('tbody tr')];let onlyFlags=false;
function filter(){const term=input.value.toLowerCase().trim();let visible=0;for(const row of rows){row.hidden=!!((onlyFlags&&row.dataset.flag!=='true')||(term&&!row.textContent.toLowerCase().includes(term)));if(!row.hidden)visible++;}document.querySelector('#count').textContent=visible+' / 53 surfaces';flagButton.setAttribute('aria-pressed',String(onlyFlags));}
input.addEventListener('input',filter);flagButton.addEventListener('click',()=>{onlyFlags=!onlyFlags;filter()});document.querySelector('#reset').addEventListener('click',()=>{input.value='';onlyFlags=false;filter()});
</script></main></body></html>''')
(ROOT / "review.html").write_text('\n'.join(parts))


def cite_md(text):
    def replace(m):
        return ", ".join(f"[{key}](witnesses.html#{key})" for key in expand(m.group(1)))
    return re.sub(r"\[([CMPDS][0-9](?:[–,] ?[CMPDS]?[0-9])*)\]", replace, text).replace("|", "\\|")


md = ["# Fresh reader, then diff", *INTRO,
      "Read the complete page → seal learned decisions → read the pinned diff → compare in one table.",
      *METHOD,
      "[Sealed recall 01–09](notes/01-09-before-diff.md) · [Remaining sealed recall](notes/10-53-before-diff.md) · [Seal](before-diff-seal.json) · [Cohort](routes.json) · [Pinned witnesses](witnesses.html)",
      "| Finished page / scope | Decisions learned without the diff | Newly learned or corrected after the diff | Rule-4 surprise |\n| --- | --- | --- | --- |"]
for r in rows:
    md.append(f'| [{r["id"]} · {r["folder"].split("-",1)[1]}]({r["url"]})<br>{r["subject"]}<br>[Saved text]({r["capture"]}) | {cite_md(r["learned"])} | {cite_md(r["miss"])} | {cite_md(r["rule4"])} |')
# Keep one continuous table while separating the introduction's paragraphs.
(ROOT / "review.md").write_text('\n\n'.join(md[:-len(rows)-1]) + '\n\n' + '\n'.join(md[-len(rows)-1:]) + '\n')
print(f"Built one {len(rows)}-row table in HTML and Markdown; {sum(r['flagged'] for r in rows)} witnessed R4 surfaces.")
