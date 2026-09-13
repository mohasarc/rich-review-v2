# Source witnesses for the comparison

These are receipts for the table, not a proposed gold decision inventory or a verdict on symnav. Code consequences are labeled as inferences where no recorded reason supplies them. All symnav evidence is pinned to the supplied stack’s commits. See the [diff manifest](source-check/manifest.json), [context manifest](source-check/context/manifest.json) and capture scripts. The stack comparison is b6801eb → d070023; individual PR boundaries are preserved rather than substituting today’s main for a PR’s parent.

The source phase read the complete #127 diff and #131 production diff, selected changed #131 tests/helpers, the new delivery/execution owners in #146–147 with their extraction hunks, substantive #148 client/registry/coordinator/clock/test changes, and stack core/inspector/CLI/test changes. Every subject’s file/hunk inventory was available for the audit. Copies were detected with git diff --find-renames --find-copies --find-copies-harder. Large removed bodies and mechanical test relocations were not all read line by line. No symnav tests were run for this critique; other pages’ reported test runs are their evidence, not mine.

<a id="w1"></a>
## W1 — #127: release, the supplied record, and the six-file scope

The [production diff](source-check/pr-127/production.patch) changes TypeScriptSemanticQueryService.releaseTransientResources from void to async Promise<void>. It clears the generic scope synchronously, then awaits optional projectGraph.releaseTransientResources. TypeScriptBackend now awaits the service. Therefore a pending graph release keeps backend release pending, and a graph rejection rejects it. The clear-first ordering and the changed completion contract are distinct facts.

The supplied [PR body](source-check/pr-127/pr-body.md) explicitly says “core owns cache lifetime and backend is the release barrier.” Its after diagram labels the backend an “awaited release boundary”; its public surface shows Promise<void>. It also broadly requires preserving promise/value identity and failure behavior. The four explicit decision bullets explain six independent key spaces, Map.has for undefined, clearing before project release, and successful-refresh-only invalidation. Thus “PR body silent” is false for the awaited barrier. The record does not separately reconcile that barrier with its broad parity requirement. Code proves the changed contract; it does not invent the author’s reconciliation.

The same diff adds TurnScopedCacheScope and its minimal handle API, retains handle reuse, stores exact factory results, inserts only after factory return, narrows beginTurn to the supplied file array, and keeps projection work outside the relevant cache. A thrown factory is retried because insertion never occurs; a rejected promise has already been inserted and stays. Clearing does not cancel returned promises or close handles. Successful backend refresh calls beginTurn only after its preceding awaits succeed; this is not whole-system rollback.

The [test diff](source-check/pr-127/tests.patch) adds six semantic-service cases and four generic-scope cases. Existing service tests receive import additions but their five test bodies and old assertions remain. The new delayed graph case exercises pending state and rejection; there is no added delayed-success graph case or daemon-scheduling integration case in this six-file diff. That says nothing about tests outside the diff. The single production caller gains await; I do not claim an existing test release call was adapted.

Page 04’s captured overview says “One failure path changed; PR body silent.” Pages 09, 24, 31, 33, 37 and 40 permit a more precise distinction between recorded barrier, observed consequence and unresolved rationale. These comparisons concern the supplied current PR record, not any guessed earlier version of its body.

<a id="w2"></a>
## W2 — #131: parsing moves failure before worker creation

The [production patch](source-check/pr-131/production.patch), daemon-navigation-worker.ts hunk beginning at patch line 621, adds DaemonPolicy.fromSerialized(options.configuration.policy).values.output.maximumChunkRawBytes inside the parent constructor. The [pinned whole worker file](source-check/context/131-worker.ts), lines 78–100, places that call before new Worker and before installation of worker error/exit handlers.

The [policy implementation](source-check/context/131-policy.ts), fromSerialized and DaemonPolicyCodec.parse at lines 162–193, validates the serialized shape and values and throws for invalid input. The constructor has no local catch around this call. **Inference from control flow:** malformed snapshots can now throw synchronously while constructing the parent wrapper, before a worker exists, rather than being left to the worker startup path. This does not claim that ordinary production callers frequently supply malformed snapshots.

Page 20’s #131 top P12 states the order and its failure consequence. Page 02’s top already says the worker parent reparses for a chunk limit, and 05/28 expose related parsing detail. For those pages, the table calls this an implication I missed, not a proven absence of the parsing fact. Other pages’ general “both worker sides validate chunks” is not enough to infer when complete-policy parsing can fail.

<a id="w3"></a>
## W3 — #131: error provenance and a terminal fetch

In the [transport diff](source-check/pr-131/production.patch), lines 1172–1206, the old completeWithOneReattachment catches both obtaining the second receipt and awaiting its completion inside one inner catch, then rethrows the first completion error. The new loop assigns the second receipt’s completion to currentCompletion and awaits it in the next iteration. If that completion fails after the retry budget is consumed, its error escapes. If obtaining the second receipt fails, the inner catch still throws the preceding error. “Later error” does not mean every second connection failure replaces the first error.

The [head transport context](source-check/context/131-transport.ts), lines 474–493, shows the per-attempt resumeCount test on the original execute socket. Its call to fetchCompletion ends with .catch(fail). There is no recursive fetch retry loop in that method. **Inference:** changing the numeric field does not itself make successive failed fetches retry; a failed fetch settles the execute attempt. A later execute reattachment has its own fresh allowance. This is about #131’s exact head, not later transport refactorings in the stack.

These are caller-visible failure distinctions; the page need not present a failure as a bug to explain them. A test that eventually succeeds after reattachment does not establish which error is exposed when its later completion fails.

<a id="w4"></a>
## W4 — #131: adapter compatibility changes the stimulus

The [test/helper diff](source-check/pr-131/tests.patch) adds TestLocalDaemonTransport at patch lines 2058–2127. It computes inlineRawBytes as Math.max(base maximumChunkRawBytes, requested outputInlineBytes), and creates the output directory before calling the runtime constructor. Under the default 64-KiB chunk limit, a legacy inline request of zero is raised to 64 KiB. Small output can stay in memory while a pre-existing empty-directory assertion still passes. That is an observation-boundary consequence, not a claim that every migrated transport test lost disk coverage.

TestWorkspaceDaemon, patch lines 2186–2290, accepts memoryCapBytes but never projects it into policy. It can turn requested inline zero into max(1, floor(resultBytes / 2)), derives a compatible chunk bound and forwards a policy snapshot. The runtime removes the independent memory cap; its supervisor and ready record use the policy resource cap.

The changed spool tests supply coordinated chunk/inline/result bounds. The aggregate fixture raises inline to six so its six-byte first record stays inline. Failure fixtures append enough extra records to cross a positive boundary. The CLI capture comparison changes its spill threshold from 1 to 32, with chunk policy adjusted too. These are separate fixture choices in the same [patch](source-check/pr-131/tests.patch), lines 1–307. Keeping an assertion string does not preserve the route through storage that produces its input.

The recorded reason for test adapters is to retain test tuning without restoring production defaults. The exact floors, ignored legacy field and changed payload recipes are code facts; that broad reason does not provide a separate rationale for every one of them.

<a id="w5"></a>
## W5 — #131: a reporting shape changes through a helper

The new resource adapter in the [test diff](source-check/pr-131/tests.patch), lines 1902–1941, returns the old resource fields plus replacementWindowMs and replacementLimit. The benchmark harness changes its import to this helper, with the familiar DaemonResourcePolicy alias.

The [pinned harness](source-check/context/131-benchmark.ts) declares DaemonBenchmarkArtifact.resourcePolicy at line 64, obtains the helper’s .record at lines 135–138, and returns it at line 196. Its schemaVersion remains 1 at lines 55 and 187. **Inference through the existing caller:** the reported resourcePolicy object acquires those two fields even though the harness diff largely looks like an import substitution. This is a benchmark artifact shape, not a public production daemon protocol change. Page 05 explicitly taught benchmark records; 13 and 20 did not leave me with this specific consequence.

<a id="w6"></a>
## W6 — #148: facade lifetime, default policy and protocol value

The [new client/runtime diff](source-check/pr-148/production.patch), lines 1623–2010, adds optional policy to DaemonClientOptions. [DaemonClient](source-check/context/148-client.ts) starts one runtime-load promise in its constructor and execute/control await it. **Inference:** a rejected load is retained; these methods contain no retry or per-call reconstruction. Construction begins the import, rather than waiting for the first execute/control call.

The [runtime](source-check/context/148-client-runtime.ts), line 86, selects options.policy ?? DaemonPolicy.currentSystem(). Registry, transports, observer, launcher, startup coordinator and controllers are composed once per runtime. “Optional policy” is a host composition decision, not merely an omitted field in a diagram.

The same runtime’s executeWarm sets protocolVersion: DAEMON_PROTOCOL_VERSION at line 189. The [still-shipped dispatcher](source-check/context/148-dispatcher.ts), line 216, uses record.protocolVersion. The base dispatcher also uses the record. This field-source distinction is explicit in page 06. It is not a claim that normal compatible records produce different wire bytes: their values may agree. The decision is which authority supplies the outgoing field.

<a id="w7"></a>
## W7 — #148: an available retirement condition, not a reason for every deletion

The [policy plan at #148 head](source-check/context/148-policy-plan.md), “Migration access,” says: “Phase 26 removes @symnav/daemon/policy-testing after app-owned mechanism tests move package-local.” It also calls the subpath temporary. The PR relocates those mechanism tests. This is an explicit planned condition for retiring the export, available in pinned repository context even though the #148 PR body omits it.

Page 06 surfaces that record at the top. Page 03 says the old export was temporary “but no explicit removal rationale or reason for the local scope of the new clock scan was found.” Pages 12/23/29 mark a combined retirement choice unexplained. Page 35 says no separate rationale was found in its inspected PR/commit/plans material. The narrow correction is to add the available condition and split the compound claim. I cannot prove which repository plans each author actually inspected, and this plan does not independently explain the exact lint assertions deleted, lifecycle-only scan scope, or serial test scheduling.

The export and lint edits themselves are in [other.patch](source-check/pr-148/other.patch); moved helpers and removed assertions are in [tests.patch](source-check/pr-148/tests.patch). The reason for ownership staging is not automatically a reason for every lost observation.

<a id="w8"></a>
## W8 — #148: matching strength and authentication are distinct boundaries

The [registry diff](source-check/pr-148/production.patch), lines 840–1353, replaces scattered checks with startupOwnershipMatches. For example, isStartupOwner previously compared only instanceId; its new call supplies identityKey and instanceId. writeStartingIfStartupOwner also changes its post-write check from instance matching to the observed owner snapshot. The [pinned registry](source-check/context/148-registry.ts) checks identity/instance always, and optional credentials, ownership and revision/time fields only when supplied. **Inference:** a matching instance with a wrong identity key can produce a different answer; one comparison owner does not imply identical matching strength for every operation. Page 08 explicitly teaches a narrow wrong-identity probe.

The [coordinator](source-check/context/148-coordinator.ts), handle/identify/terminate methods, preserves another partition. identify/terminate/kill branch before the common protocol/instance check and require instance+token. ping/stop take the common protocol+instance path without the execution-token branch. execute, execution-status, result-fetch and result-ack go through token checks as well. The extraction adopts launch coordinates and validates root/keys/endpoint before composing internals. These are specific authority boundaries; “including exceptions” does not identify who checks what.

The authentication partition is retained behavior in #148, not a newly introduced token bypass. The critique concerns whether a new reader learns the boundary that the extracted owner preserves.

<a id="w9"></a>
## W9 — #148: the standalone queue default changes clock domain

The [queue diff](source-check/pr-148/production.patch), lines 1590–1622, replaces a now callback defaulting to Date.now with a daemon-clock dependency whose monotonicNowMs supplies startedAt. Compare the [base queue](source-check/context/148-base-queue.ts) with the [package head queue](source-check/context/148-head-queue.ts). The old workspace process already injected a monotonic callback, so this does not imply that the shipped process’s queue abruptly changes clock domain. It changes the standalone constructor default while the extraction makes ownership explicit. This distinction is present below page 29’s top, and in page 03’s top.

<a id="w10"></a>
## W10 — #148: test observation and execution choices

The [test diff](source-check/pr-148/tests.patch), lines 47–174, deletes the mocked daemon-entry test. Among its observations is a worker old-generation limit of 257 MiB. Built package-entry integration tests are added later in that diff. They exercise another boundary; their existence alone does not retain that exact handoff assertion.

The moved worker test, patch lines 3955–4051, replaces injected CLI readiness with a generic executor fixture, removes the CLI-worker mismatch test, and drops three startup-duration plus four result-duration expectations from that readiness case. A CLI executor test is added at its own boundary. The assertion losses concern those specific tests, not a claim that no duration or version checks remain anywhere.

The [new package Vitest configuration](source-check/pr-148/production.patch), lines 4723–4738, sets fileParallelism:false. That is an explicit package test-execution choice. The [package manifest diff](source-check/pr-148/other.patch) adds tsx; new built-entry tests contain platform-specific cleanup. The broad staging/ownership rationale does not state a reason for every scheduling or assertion change.

<a id="w11"></a>
## W11 — stack: last configured primary owner, with all owners retained in order

The new core graph is in the [stack production diff](source-check/stack/production.patch), lines 6028–6373. Its [pinned implementation](source-check/context/stack-project-graph.ts), buildOwnership near the end, iterates configurations in order. For each file it appends to projectsByRelativePath, but unconditionally calls primaryProjectByRelativePath.set(file.relative, project). A later configured owner overwrites an earlier one. Discovery itself uses a FIFO pending list, and unowned snapshot files get inferred-project fallback. Primary selection and the ordered list of all owners are separate facts.

Page 01’s complete map says “uses the first owner for primary lookup.” Page 22 X10 says “keeps first configured ownership plus inferred fallback.” Page 14’s complete map says “last configured owner as the primary project.” The source supports 14 on this dispute. These page statements were captured before source inspection, so the contradiction was not generated by retrospectively choosing an expected answer.

<a id="w12"></a>
## W12 — final stack: inspector errors and narrower diagnostic observation

The [new inspector](source-check/context/stack-inspector.ts) returns empty/false/zero for ENOENT/ENOTDIR in the relevant directory-level methods and rethrows other errors. Reading an individual diagnostic file suppresses ENOENT; parsing suppresses SyntaxError and skips values that fail the diagnostic-value predicate. readDiagnostics rejects a negative or non-safe-integer cursor. Diagnostic backups are read by descending backup index before the active file; instance results sort by workspace and instance. This is a defined policy for failure and order, not simply “read-only inspection.”

The [#149 test diff](source-check/pr-149/tests.patch), lines 1784–1962, removes CLI diagnostic assertions over raw log-file size/backup count and raw text containing a secret. The new test asserts over the inspector’s parsed event JSON. Because the inspector may skip invalid lines, parsed-output absence and raw-byte absence are different observations. The source confirms this difference without declaring the test incorrect. The same PR removes seven named status and three named stop scenarios from the CLI suites; some behavior is represented at package boundaries. The stack pages that explicitly name those retirements received credit for doing so.

<a id="w13"></a>
## W13 — #146–147: one delivery promise is captured, not all future delivery

The [#146 delivery owner](source-check/pr-146/production.patch) holds a Map from request ID to Promise<void>. trackCompletionDelivery writes the current promise and deletes it on settlement only if it is still the stored value. trackedCompletion returns the currently stored promise. A fetch calls stored completion delivery directly; it does not retroactively replace a promise already awaited by execution.

The [#147 execution owner](source-check/pr-147/production.patch), lines 76–274, calls ledger.complete, then evaluates and awaits delivery.trackedCompletion(requestId) once. The queue owns the active turn around that body. Ordinary result acknowledgement is a separate path; workspace-deletion handling and shutdown drain have their explicit ACK waits. **Inference:** this is a single captured latest attached stream, not all attached streams, all future fetches or the normal ACK barrier.

The same diff moves acceptedAt and queuePosition from transient state/coordinator bookkeeping onto ledger entries; matching duplicates return their original acceptance without new execution/lifetime/trace effects. Resource sampling is scheduled in finally at the turn boundary. #146’s drain wait uses the injected wall clock, and ACK cleanup catches storage failure, records it and then acknowledges logically. Page 30 taught these distinctions before the diff. No further material decision was found on this audited boundary; mechanical test helper changes were sampled rather than exhaustively certified.

<a id="w14"></a>
## W14 — #131: required policy does not eliminate every numeric or optional seam

The [production diff](source-check/pr-131/production.patch) still exposes explicit numeric capacities in worker-protocol response validation and the result chunk codec/decoder. WorkerHeapHighWater receives a numeric sample interval. Registry startupOwnerIsWithinGrace retains an explicit grace argument defaulted from policy. StoredCommandOutput’s internal maximumRecordBytes remains optional, and transport still accepts writeChunkSize/outputDirectory options. These are narrower facts than “every consumer constructor takes a policy section.” The diff also contains test fixture double assertions through unknown, so required structural types alone do not prove test wiring uses the intended values.

Pages 02, 09, 11, 13, 19 and 28 explicitly taught some of these limits. The table records the parts missing from 25/34’s page-derived model, without claiming they omitted the central consolidation decision.

<a id="r23"></a>
## R23 — witnessed descent on the zoom canvas

Before the diff, the [root capture](page-captures/entries.json), page 23, said “Separate protocol/instance and token paths, including control exceptions.” The [D13 capture](page-captures/routes3.json) names the concrete ping/stop and identify/terminate/kill partition. The first statement alerts me that exceptions exist, but does not let me reconstruct the authentication boundary; the deeper statement does. Under rule 4’s strict “every decision and fact” requirement, that is a surprise, even though it is a preserved boundary in the PR.

The root public-client room says “Node-free host types; executor/environment inputs” and says runtime loading starts at construction. The [D04 route](page-captures/routes4.json) adds the optional policy input. W6 supplies the current-system fallback from source. The rule-4 flag concerns the newly learned optionality, not the mere spelling of a type field.

The [1440×1000 root screenshot](page-captures/23-root.png) was visually inspected during the blind phase. A [D13 screenshot](page-captures/23-auth.png) is retained as a receipt; the D13 judgment originally came from rendered text. The flag is not based on illegible microtext or an assumption that the zoom overview has no real content: its six rooms are readable, and the other decisions there received credit.

<a id="r29"></a>
## R29 — witnessed descent on the refusal page

The page-only [root capture](page-captures/entries.json), A1, says “Daemon wall and monotonic clocks replace telemetry and scattered time callbacks.” Its opening also says to preserve old idle event boundaries. In the [non-source disclosure capture](page-captures/details.json), page 29, A1’s reason text first says: “The queue’s standalone default changes from Date.now to monotonicNowMs; the process already supplied monotonic time before this PR.”

The new default and the existing process injection are decisions a reader cannot recover from “new clock owner” alone. W9 confirms the source consequence. This is a specific root → reason-disclosure flag; it does not imply that every one of the page’s proposed review units hides a behavior change.
