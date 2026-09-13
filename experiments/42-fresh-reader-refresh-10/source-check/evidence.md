# Source checks behind the table

These are findings used in this critique, not an exhaustive reference answer for symnav. The page-first record was sealed at **2026-09-13 06:51:27 +03:00**. Source checks began afterward. [Seal](../blind-phase-seal.json), [diff inventory](diff-inventories.json), [revisions](revisions.json), [snapshot provenance](snapshot-provenance.json).

I read the complete six-file #127 patch; all production changes in #131 plus its changed test/adapter witnesses; the #148 client, changed ownership/contracts, test deletions, guard and migration-plan hunks; #146/#147 session and shell changes; and selected cumulative-stack ownership, policy, release and consumer-cutover hunks. Every supplied patch's file/hunk inventory was inspected or parsed. The 18,473-line #148 patch contains extensive copies; the 43,584-line stack patch was not given an exhaustive semantic audit. Findings are bounded by the inspected hunks. No fresh symnav execution or CI run is claimed.

Raw inputs: [#127](../../../inputs/pr-127/diff.patch), [#131](../../../inputs/pr-131/diff.patch), [#148](../../../inputs/pr-148/diff.patch), [stack](../../../inputs/stack/diff.patch). The adjacent-pair patches were extracted read-only from exact git objects: [#146](pr-146.patch), [#147](pr-147.patch).

<a id="s1"></a>
## S1 — Last configured owner is primary

At stack head, `ProjectGraph.buildOwnership` iterates configurations in discovery order, appends every owner to the owner list, and unconditionally overwrites the primary map:

```ts
projects.push(project);
projectsByRelativePath.set(file.relative, projects);
primaryProjectByRelativePath.set(file.relative, project);
```

[Head implementation](snapshots/stack-head--project-graph.ts), lines 319–338. [Head test](snapshots/stack-head--project-graph.test.ts), lines 244–266, is titled “orders all owners and selects the last owner as primary” and expects `/repo/c.json`.

This supports 14's “last configured owner” account and contradicts 01's “first configured owner wins” and 22's “first configured ownership.” Discovery order and primary-owner selection are distinct. The critique concerns the explanation of the preserved algorithm, not a demand to change that algorithm.

<a id="s2"></a>
## S2 — All five old #127 tests are unchanged

The semantic-service test diff adds imports and six cases before the existing first case, with no changes after that insertion. I independently compared the base/head suffix beginning at `it("shares one reference search across caller and reference projections"`. Equality is true for the complete suffix, including the five prior cases and helper functions.

[Base test](snapshots/127-base--typescript-semantic-query-service.test.ts), [head test](snapshots/127-head--typescript-semantic-query-service.test.ts); raw #127 patch lines 18–240. Four new core cases bring the additions to ten. Experiment 01's claim that an existing release call gains `await` is false at this exact base/head. The unchanged-test claims in 32 and 37 hold.

<a id="s3"></a>
## S3 — Clearing order and the new release barrier are different choices

#127 patch lines 6–17 and 383–389 change the backend to await its semantic service and change the service from `void` to `Promise<void>`:

```ts
// Base, after clearing:
this.projects?.releaseTransientResources();
// Head, after clearing:
await this.projects?.releaseTransientResources();
```

Both clear first. Only the head connects later project settlement/rejection to the backend's already-Promise-shaped release. The added controlled test holds release pending, queries after clear, and then rejects it. The PR body states why clearing precedes cleanup and names an awaited backend barrier. It does not separately reconcile the broader unchanged-timing/failure promise. A page can explain this without calling the implementation wrong.

<a id="s4"></a>
## S4 — #131 validates policy in the parent before creating a worker

#131 patch lines 1168–1201 adds `DaemonPolicy.fromSerialized(options.configuration.policy)` to the parent constructor, before allocating its `exited` promise and invoking `new Worker`. [Pinned constructor](snapshots/131-head--daemon-navigation-worker.ts), lines 78–104.

`DaemonPolicy.fromSerialized` synchronously calls `new DaemonPolicy(DaemonPolicyCodec.parse(value))` at this revision. Invalid serialized policy can therefore throw at parent construction before a worker is spawned. Previously this added parse was absent; parsing in the worker entry is a different failure location. Supplying the chunk cap explains the wiring, but omitting the earlier failure boundary leaves a decision unlearned. This is source inference; I did not launch a malformed-policy worker.

<a id="s5"></a>
## S5 — Three new #131 fixtures bypass constructor assignability

The new “required policy” cases cast constructor arguments through `unknown` to `ConstructorParameters<...>` in completion spool, logger, and resource supervisor tests. Raw #131 patch lines 332–367, 963–997, and 1412–1459.

Those cases still exercise runtime capacities. Their object literals do not independently demonstrate normal TypeScript assignability at the construction site. The bypass is an added testing choice; a negative declaration probe elsewhere is separate evidence. 28 explicitly puts this on its decision list. No specific reason for these three casts was found in the six commit bodies or PR body (the bodies are empty).

<a id="s6"></a>
## S6 — Numeric recovery changes the escaping error, not just the allowance

#131 patch lines 2677–2721 replaces a nested catch with a loop. If the first accepted completion rejects with E1, reattachment obtains a receipt, and its completion rejects with E2, the head evaluates E2 in the next iteration. With the default allowance exhausted, it throws E2. The base's nested catch throws E1. Failure to obtain the reattached receipt still throws the preceding completion error.

The per-execute fetch path also calls `.catch(fail)` after `fetchCompletion`: [head transport](snapshots/131-head--local-daemon-transport.ts), lines 473–494. Raising the numeric fetch allowance does not by itself turn failed fetch into a repeated fetch loop. Default one-plus-one traces cannot establish all non-default behavior. This is a control-flow reading, not a fresh reproduction.

<a id="s7"></a>
## S7 — A preserved cleanup assertion loses its disk stimulus

#131 introduces `TestLocalDaemonTransport`, with:

```ts
inlineRawBytes: Math.max(
  base.values.output.maximumChunkRawBytes,
  options.outputInlineBytes,
)
```

It also creates `outputDirectory` eagerly. Raw patch lines 3552–3621. With the default 64 KiB chunk cap, requesting `outputInlineBytes: 0` now yields 64 KiB inline capacity.

A concrete witness is “disposes partial client output when daemon delivery fails after its manifest”: [head test](snapshots/131-head--local-daemon-transport-execution.test.ts), lines 722–771. It sends one 64 KiB record, asks for zero inline bytes, and still checks an empty client directory after failure. Storage spills only when bytes **exceed** the inline threshold. Base zero spilled this record; the adapter's 64 KiB threshold keeps it inline. The empty-directory assertion remains, but no longer proves deletion of a client spill file in this case.

Other pages enumerate fourteen client cases and an aggregate-spool case. I did not independently reproduce that whole count; this critique relies on the specific checked witness above. The same helper also accepts an unchanged-looking interface while changing its meaning. The workspace helper retains `memoryCapBytes?` in its options but does not read it, and couples chunk/inline/result/aggregate bounds (patch lines 3680–3784).

<a id="s8"></a>
## S8 — The removed startup timeout was inert

The #131 base declares an optional `startupTimeoutMs`, stores a field, and assigns it in the constructor. It never reads that field afterward: [entire base coordinator](snapshots/131-base--daemon-startup-coordinator.ts), occurrences at lines 27, 51, 69 only.

Removing the 5 ms healthy-startup test argument removes a written premise, not an active healthy-startup timer. The removed resource-derivation table, constrained-memory comparison and literal 250 ms assertion are separate test decisions (#131 patch lines 1321–1411). A page should not let these distinct removals imply the same kind of lost witness.

<a id="s9"></a>
## S9 — The new public client permits a host policy and otherwise creates a default

#148 adds `readonly policy?: DaemonPolicy` to `DaemonClientOptions` (patch lines 2343–2384) and `this.policy = options.policy ?? DaemonPolicy.currentSystem()` to the runtime (around patch line 2644).

This is caller authority over the client's policy, beyond merely supplying environment, executor and readiness. It is not a new end-user CLI tuning flag. Pages 12, 23 and 29 first name it below their advertised complete layer. The term “Node-free contract” alone does not enumerate this authority.

<a id="s10"></a>
## S10 — The warm request uses the package constant

The old [dispatcher](snapshots/148-base--daemon-command-dispatcher.ts), line 216, sends `record.protocolVersion`. The new #148 client sends `DAEMON_PROTOCOL_VERSION` (patch around line 2747).

This is an explicit input-selection choice, not a demonstrated wire-version change. The normal record path is already validated; this critique does not claim ordinary requests change bytes. 06 surfaces the choice and marks its reason missing. Most other #148 readings did not teach it.

<a id="s11"></a>
## S11 — A migration reason for removing policy-testing exists

The #148 head's [daemon-policy.md](snapshots/148-head--daemon-policy.md), “Migration access,” lines 62–66, says:

> Phase 26 removes `@symnav/daemon/policy-testing` after app-owned mechanism tests move package-local.

It also calls the public serialization bridge temporary. This source exists at the reviewed revision, although the #148 diff does not modify that file. 06 found it. 03, 12, 23, 29 and 35 label the export retirement unexplained; 35 explicitly says no reason exists in the supplied plans.

The plan explains the temporary export's lifecycle. It does **not** explain every associated assertion deletion, the exact lint implementation, or serial test execution. Split that mixed claim rather than treating the plan as a rationale for all neighboring changes.

<a id="s12"></a>
## S12 — The new clock guard only scans lifecycle siblings

#148 patch lines 6564–6594 adds a test that lists `new URL(".", import.meta.url)` beside `lifecycle/daemon-clock.test.ts`, filters sibling production `.ts` files, and applies a regex for raw clocks/telemetry imports. It does not recurse through process, registry, execution or worker directories.

This is a newly chosen guard scope, not a deleted whole-package guard; the added test was absent at the PR base. “Daemon owns clocks” is the architecture decision. “This particular assertion covers only lifecycle siblings” is a separate testing decision. 03, 12, 27 and 29 expose it; several other pages do not.

<a id="s13"></a>
## S13 — The moved readiness test loses seven timing expectations

#148 patch lines 15682–15778 replaces the real CLI executor fixture with a generic package fixture. It deletes three startup duration fields and four execution duration fields, keeps readiness/file-count/result/output checks, and removes the worker-startup version-mismatch case. A direct CLI factory version-rejection test is added elsewhere (patch lines 26–46). The direct factory call covers a different boundary.

This matters even when the net number of `expect(...)` calls barely changes. 06's inventory counts assertions and lists the replaced test titles, but its top K3 does not tell the reader about the seven removed timing fields. No specific reason for dropping those fields was found.

<a id="s14"></a>
## S14 — Host executor policy is separate from the daemon snapshot

At stack head, [createDaemonExecutor](snapshots/stack-head--daemon-executor.ts), lines 130–135, creates dependencies with its own `DaemonPolicy.currentSystem()`. The daemon client separately owns its provided/default policy and carries its serialized snapshot to the process/worker. The executor factory options contain state directory, product version and resource sampling, not that daemon policy.

A single “one policy through every box” picture misses this host-side composition boundary. 21 explicitly teaches the separation. This finding does not assert that the two defaults differ in the observed run.

<a id="s15"></a>
## S15 — The adjacent pair's hard boundaries are present in source

#146's new delivery session keeps the latest completion promise per request, catches delivery errors in the tracked promise, fences retained trace handles, acknowledges physical spool cleanup before logical journal acknowledgement, and uses the injected wall clock for invalidation/drain waits. [#146 patch](pr-146.patch), new class at patch lines 653–1174.

#147's accepted-execution session preserves immutable acceptance metadata, returns existing acceptance for duplicates, publishes completion before capturing/awaiting `trackedCompletion`, schedules the resource sample from `finally`, and calls the process lifecycle port after delivery when the workspace disappeared. [#147 patch](pr-147.patch), new session at patch lines 409–607; ledger change at 639–711.

The page already taught that this promise is neither every attachment nor a result ACK. I found no additional decision omission in these inspected session/shell hunks. That is a bounded finding, not a complete equivalence or test-coverage claim.
