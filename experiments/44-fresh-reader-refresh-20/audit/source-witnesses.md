# Source witnesses

These receipts support the audit column of the [single critique table](../critique.md). Line numbers inside code fences belong to the named pinned revision or bundle, not the current editor buffer. Interpretations below concern what a reader needs to learn; they do not establish a defect in symnav. No symnav tests or earlier agents' probes were executed in this critique.

The #127 six-file patch and #131 production/test patch were read throughout. For #148, #146/#147 and the whole stack, the audit used the complete changed-file inventories and selected source, test, contract and rationale hunks. The wide subjects were not an exhaustive independent census. “No additional miss found” is bounded by that coverage.

<a id="e1"></a>

## E1 — #127 test and lifetime accounting

The complete patch adds four core cases and six semantic-service cases. The original five semantic-service cases and their helper suffix are byte-identical. No existing test release call gains an `await`. The production backend and service release methods do gain awaits. This supports both the correction to page 01 and the narrower confirmation of page 37.

The new core handle uses `Map.has`, stores the exact factory return, and registers each map's clear function. Both lifecycle methods invoke the same clear loop. A synchronous throw happens before insertion; an already-returned rejected promise remains cached. This is source reasoning, not a new runtime probe.

Source comparison: `{"semantic_original_suffix_unchanged": true, "semantic_original_test_declarations": 5, "semantic_head_test_declarations": 11, "core_new_test_declarations": 4, "original_suffix_sha256": "98097e2372c2fa23ed1f8fc4db1e3120039ffe07d4b815ac6b527504ad91ab3f"}`


[Bundled pr-127 patch](../../../inputs/pr-127/diff.patch), patch lines 1–19:

```diff
   1  diff --git a/packages/backend-typescript/src/typescript-backend/typescript-backend.ts b/packages/backend-typescript/src/typescript-backend/typescript-backend.ts
   2  index 2e236cd73..f762afbc8 100644
   3  --- a/packages/backend-typescript/src/typescript-backend/typescript-backend.ts
   4  +++ b/packages/backend-typescript/src/typescript-backend/typescript-backend.ts
   5  @@ -80,12 +80,12 @@ export class TypeScriptBackend implements LanguageBackend {
   6       this.sourceCache?.refresh(request.snapshot);
   7       if (request.coverage === "workspace") await this.projectGraph?.refresh(request.snapshot);
   8       const summary = await this.state.refresh(request.snapshot.files, request.coverage);
   9  -    this.semanticQueries.beginTurn(request.snapshot);
  10  +    this.semanticQueries.beginTurn(request.snapshot.files);
  11       return summary;
  12     }
  13   
  14     async releaseTransientResources(): Promise<void> {
  15  -    this.semanticQueries.releaseTransientResources();
  16  +    await this.semanticQueries.releaseTransientResources();
  17     }
  18   
  19     async fileEntries(file: ResolvedPath): Promise<OverviewFileEntries> {
```

[Bundled pr-127 patch](../../../inputs/pr-127/diff.patch), patch lines 546–609:

```diff
 546  diff --git a/packages/core/src/backend/turn-scoped-cache-scope.ts b/packages/core/src/backend/turn-scoped-cache-scope.ts
 547  new file mode 100644
 548  index 000000000..54cf7022b
 549  --- /dev/null
 550  +++ b/packages/core/src/backend/turn-scoped-cache-scope.ts
 551  @@ -0,0 +1,46 @@
 552  +export interface TurnScopedCache<Key, Value> {
 553  +  getOrCreate(key: Key, createValue: () => Value): Value;
 554  +}
 555  +
 556  +interface ClearableTurnScopedCache {
 557  +  clear(): void;
 558  +}
 559  +
 560  +class TurnScopedCacheHandle<Key, Value>
 561  +  implements TurnScopedCache<Key, Value>, ClearableTurnScopedCache
 562  +{
 563  +  private readonly values = new Map<Key, Value>();
 564  +
 565  +  getOrCreate(key: Key, createValue: () => Value): Value {
 566  +    if (this.values.has(key)) return this.values.get(key) as Value;
 567  +    const value = createValue();
 568  +    this.values.set(key, value);
 569  +    return value;
 570  +  }
 571  +
 572  +  clear(): void {
 573  +    this.values.clear();
 574  +  }
 575  +}
 576  +
 577  +export class TurnScopedCacheScope {
 578  +  private readonly caches: ClearableTurnScopedCache[] = [];
 579  +
 580  +  createCache<Key, Value>(): TurnScopedCache<Key, Value> {
 581  +    const cache = new TurnScopedCacheHandle<Key, Value>();
 582  +    this.caches.push(cache);
 583  +    return cache;
 584  +  }
 585  +
 586  +  beginTurn(): void {
 587  +    this.clear();
 588  +  }
 589  +
 590  +  releaseTransientResources(): void {
 591  +    this.clear();
 592  +  }
 593  +
 594  +  private clear(): void {
 595  +    for (const cache of this.caches) cache.clear();
 596  +  }
 597  +}
 598  diff --git a/packages/core/src/index.ts b/packages/core/src/index.ts
 599  index d5bda30e6..c5389574b 100644
 600  --- a/packages/core/src/index.ts
 601  +++ b/packages/core/src/index.ts
 602  @@ -149,6 +149,7 @@ export {
 603     RevisionedBackendPreparation,
 604     RevisionedBackendState,
 605   } from "./backend/revisioned-backend-state.js";
 606  +export { TurnScopedCacheScope, type TurnScopedCache } from "./backend/turn-scoped-cache-scope.js";
 607   export { BackendRouter } from "./backend/backend-router.js";
 608   export { UserFacingError } from "./errors.js";
 609   export {
```


<a id="e2"></a>

## E2 — disclosure is different from a reason for changing behavior

The #127 body explicitly calls the backend an **awaited release boundary**, gives the service a promise-returning release surface, and explains clearing before pending or rejecting release. The commit list includes **Specify awaited semantic resource release**. Thus “PR body silent” is false as a disclosure claim. The inspected materials still do not reconcile changed backend settlement/failure with the broad behavior-preservation contract; that narrower rationale gap should remain labelled unexplained.

Page 04's captured overview says “One failure path changed; PR body silent.” Its own 4.8 / decision 1 says “The PR body shows it.” That is the observed parent-to-depth contradiction, independent of any judgment about the code change.

[Bundled PR body and commits](../../../inputs/pr-127/pr.json):


```text
After — core owns cache lifetime and the backend is the release barrier:
    Backend["TypeScriptBackend<br/>awaited release boundary"] -->|calls refresh/release| Service["TypeScriptSemanticQueryService<br/>query algorithms"]
        └── ** typescript-backend.ts                      # owns successful-turn and release barriers
  releaseTransientResources(): void;
// before: releaseTransientResources(): void
releaseTransientResources(): Promise<void>;
- Chose synchronous cache clearing before project release over clearing after the await, because released semantics must be unavailable while release is pending or rejecting.
```


<a id="e3"></a>

## E3 — #131 changes the parent failure boundary

The parent now deserializes and validates the policy in its constructor **before** creating `Worker`. A malformed serialized snapshot can therefore throw synchronously without spawning a thread. “The chunk cap is checked on both sides” identifies the value flow but leaves this changed failure owner and time implicit. Page 20 names this consequence in P12; the other inspected #131 stopping layers did not teach it explicitly.

Chunk validation through policy is stated in the #131 materials. No separate reason for this earlier malformed-snapshot failure boundary was found in the inspected body/commit trail. This is an inference from execution order, not an observed production failure.

`b100221db:apps/cli/src/daemon/daemon-navigation-worker.ts`, lines 78–101:

```typescript
  78    constructor(options: NodeDaemonNavigationWorkerOptions) {
  79      this.generation = options.generation;
  80      this.maximumChunkRawBytes = DaemonPolicy.fromSerialized(
  81        options.configuration.policy,
  82      ).values.output.maximumChunkRawBytes;
  83      this.exited = new Promise((resolve) => {
  84        this.resolveExited = resolve;
  85      });
  86      this.worker = new Worker(
  87        options.entryUrl ?? new URL("./daemon-navigation-worker-entry.js", import.meta.url),
  88        {
  89          workerData: {
  90            stateDirectory: options.configuration.stateDirectory,
  91            generation: options.generation,
  92            policy: options.configuration.policy,
  93            ...options.workerData,
  94          },
  95          resourceLimits: options.resourceLimits,
  96        },
  97      );
  98      this.worker.on("message", (value: unknown) => void this.receive(value));
  99      this.worker.once("error", (error) => this.failCommunication(error));
 100      this.worker.once("exit", () => this.finishExit());
 101    }
```

[Bundled pr-131 patch](../../../inputs/pr-131/diff.patch), patch lines 1168–1201:

```diff
1168  diff --git a/apps/cli/src/daemon/daemon-navigation-worker.ts b/apps/cli/src/daemon/daemon-navigation-worker.ts
1169  index 9268e41af..47233f3d2 100644
1170  --- a/apps/cli/src/daemon/daemon-navigation-worker.ts
1171  +++ b/apps/cli/src/daemon/daemon-navigation-worker.ts
1172  @@ -1,5 +1,5 @@
1173   import { Worker } from "node:worker_threads";
1174  -import type { DaemonPolicy } from "@symnav/daemon";
1175  +import { DaemonPolicy } from "@symnav/daemon";
1176   import type { CliExecutionRequest, CommandOutputRecord } from "../command-execution-result.js";
1177   import {
1178     DaemonNavigationWorkerProtocol,
1179  @@ -73,9 +73,13 @@ export class NodeDaemonNavigationWorker implements DaemonNavigationWorker {
1180     private communicationFailure: Error | undefined;
1181     private communicationFailureCode: string | undefined;
1182     private releaseSequence = 0;
1183  +  private readonly maximumChunkRawBytes: number;
1184   
1185     constructor(options: NodeDaemonNavigationWorkerOptions) {
1186       this.generation = options.generation;
1187  +    this.maximumChunkRawBytes = DaemonPolicy.fromSerialized(
1188  +      options.configuration.policy,
1189  +    ).values.output.maximumChunkRawBytes;
1190       this.exited = new Promise((resolve) => {
1191         this.resolveExited = resolve;
1192       });
1193  @@ -171,7 +175,7 @@ export class NodeDaemonNavigationWorker implements DaemonNavigationWorker {
1194     private async receive(value: unknown): Promise<void> {
1195       let response: DaemonNavigationWorkerResponse;
1196       try {
1197  -      response = DaemonNavigationWorkerProtocol.response(value);
1198  +      response = DaemonNavigationWorkerProtocol.response(value, this.maximumChunkRawBytes);
1199       } catch (error) {
1200         this.failCommunication(error);
1201         return;
```


<a id="e4"></a>

## E4 — #131 later completion errors can replace the first error

In the old nested catch, a failed reattached completion returned the first error. In the new loop, after successful receipt acquisition, `currentCompletion` becomes the new completion and the next iteration can throw its error. Failure to acquire that receipt still throws the preceding error. Separate retry scopes do not by themselves teach this error-selection decision. No specific reason for the changed error identity was found in the inspected #131 rationale.

[Bundled pr-131 patch](../../../inputs/pr-131/diff.patch), patch lines 2687–2725:

```diff
2687  +  private async completeWithReattachments(
2688       endpoint: string,
2689       request: DaemonExecuteRequest,
2690       completion: DaemonExecutionReceipt["completion"],
2691     ): DaemonExecutionReceipt["completion"] {
2692  -    try {
2693  -      return await completion;
2694  -    } catch (firstError) {
2695  -      if (!LocalDaemonTransport.isAcceptedConnectionClose(firstError, request)) throw firstError;
2696  +    let currentCompletion = completion;
2697  +    let reattachmentCount = 0;
2698  +    while (true) {
2699         try {
2700  -        const reattached = await this.executeOnce(endpoint, request);
2701  -        return await reattached.completion;
2702  -      } catch {
2703  -        throw firstError;
2704  +        return await currentCompletion;
2705  +      } catch (firstError) {
2706  +        if (
2707  +          !LocalDaemonTransport.isAcceptedConnectionClose(firstError, request) ||
2708  +          reattachmentCount >= this.deliveryPolicy.postAcceptanceExecutionReattachmentLimit
2709  +        ) {
2710  +          throw firstError;
2711  +        }
2712  +        try {
2713  +          const reattached = await this.executeOnce(endpoint, request);
2714  +          currentCompletion = reattached.completion;
2715  +          reattachmentCount += 1;
2716  +        } catch {
2717  +          throw firstError;
2718  +        }
2719         }
2720       }
2721     }
2722  @@ -419,10 +433,13 @@ export class LocalDaemonTransport {
2723     ): Promise<DaemonExecutionReceipt> {
2724       LocalDaemonTransport.assertRequest(request);
2725       return new Promise((resolve, reject) => {
```


<a id="e5"></a>

## E5 — #131 valid policy adapters do not preserve every storage stimulus

The transport test helper converts requested inline capacity 0 to at least the default chunk size, 64 KiB, and precreates the output directory. In the one-record 64 KiB partial-output case below, the same call now stays inline: spilling uses `rawBytes + nextBytes > inlineBytes`, not `>=`. The empty-directory assertion can pass without removing a client spill file. Larger transfers still spill; this is not a claim that all cleanup evidence disappeared.

The separate spool fixture changes add bytes and split records to keep exercising spill paths. Those adaptations and the transport clamp have different effects. Page 27's top mentions the former (“Forced spill at 0 becomes a threshold crossing”); its adapter descent first reveals the latter and the lost same-state premise. That is the observed rule-4 surprise.

[Bundled pr-131 patch](../../../inputs/pr-131/diff.patch), patch lines 3552–3621:

```diff
3552  diff --git a/apps/cli/test/helpers/local-daemon-transport.ts b/apps/cli/test/helpers/local-daemon-transport.ts
3553  new file mode 100644
3554  index 000000000..df05fb5fc
3555  --- /dev/null
3556  +++ b/apps/cli/test/helpers/local-daemon-transport.ts
3557  @@ -0,0 +1,64 @@
3558  +import { mkdirSync } from "node:fs";
3559  +import { DaemonPolicy, type DaemonPolicyValues } from "@symnav/daemon";
3560  +import { DaemonPolicyTestFactory } from "@symnav/daemon/policy-testing";
3561  +import {
3562  +  LocalDaemonTransport as RuntimeLocalDaemonTransport,
3563  +  type LocalDaemonTransportPolicy,
3564  +} from "../../src/daemon/local-daemon-transport.js";
3565  +
3566  +interface TestLocalDaemonTransportOptions {
3567  +  readonly maximumFrameBytes?: number;
3568  +  readonly requestTimeoutMs?: number;
3569  +  readonly executionRequestTimeoutMs?: number;
3570  +  readonly writeChunkSize?: number;
3571  +  readonly outputDirectory?: string;
3572  +  readonly outputInlineBytes?: number;
3573  +}
3574  +
3575  +export class TestLocalDaemonTransport extends RuntimeLocalDaemonTransport {
3576  +  constructor(
3577  +    policyOrOptions:
3578  +      | DaemonPolicyValues
3579  +      | LocalDaemonTransportPolicy
3580  +      | TestLocalDaemonTransportOptions = {},
3581  +  ) {
3582  +    if ("transport" in policyOrOptions) {
3583  +      super(policyOrOptions);
3584  +      return;
3585  +    }
3586  +    const options = policyOrOptions;
3587  +    const base = DaemonPolicy.currentSystem();
3588  +    const policy = DaemonPolicyTestFactory.withOverrides(base, {
3589  +      transport: {
3590  +        ...(options.maximumFrameBytes === undefined
3591  +          ? {}
3592  +          : { maximumJsonPayloadBytes: options.maximumFrameBytes }),
3593  +        ...(options.requestTimeoutMs === undefined
3594  +          ? {}
3595  +          : { singleResponseTimeoutMs: options.requestTimeoutMs }),
3596  +        ...(options.executionRequestTimeoutMs === undefined
3597  +          ? {}
3598  +          : { executionAdmissionTimeoutMs: options.executionRequestTimeoutMs }),
3599  +      },
3600  +      output: {
3601  +        ...(options.outputInlineBytes === undefined
3602  +          ? {}
3603  +          : {
3604  +              inlineRawBytes: Math.max(
3605  +                base.values.output.maximumChunkRawBytes,
3606  +                options.outputInlineBytes,
3607  +              ),
3608  +            }),
3609  +      },
3610  +    });
3611  +    if (options.outputDirectory !== undefined) {
3612  +      mkdirSync(options.outputDirectory, { recursive: true });
3613  +    }
3614  +    super(policy.values, {
3615  +      ...(options.writeChunkSize === undefined ? {} : { writeChunkSize: options.writeChunkSize }),
3616  +      ...(options.outputDirectory === undefined
3617  +        ? {}
3618  +        : { outputDirectory: options.outputDirectory }),
3619  +    });
3620  +  }
3621  +}
```

`b100221db:apps/cli/src/daemon/local-daemon-transport-execution.test.ts`, lines 722–771:

```typescript
 722    it("disposes partial client output when daemon delivery fails after its manifest", async () => {
 723      const directory = mkdtempSync(join(tmpdir(), "symnav-failed-delivery-"));
 724      directories.push(directory);
 725      const store = new DaemonCompletionSpoolStore({
 726        directory: join(directory, "daemon"),
 727        workspaceKey: "workspace",
 728        instanceId: request.instanceId,
 729      });
 730      const spool = await store.create(request.requestId);
 731      await spool.append({
 732        sequence: 0,
 733        stream: "stdout",
 734        bytes: Buffer.alloc(TEST_CHUNK_BYTES, 3),
 735      });
 736      const manifest = await spool.finish(0);
 737      let acknowledgementCount = 0;
 738      const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
 739        socket.once("data", (encoded) => {
 740          const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
 741          const message = JSON.parse(bytes.subarray(4).toString()) as { kind: string };
 742          if (message.kind === "result-ack") {
 743            acknowledgementCount += 1;
 744            return;
 745          }
 746          socket.write(frame(accepted()));
 747          socket.write(frame(resultManifest(manifest)));
 748          void sendRecords(socket, spool, manifest.transferId, 0).then(() =>
 749            socket.write(
 750              frame({
 751                kind: "execution-failed",
 752                instanceId: request.instanceId,
 753                processToken: request.processToken,
 754                requestId: request.requestId,
 755                code: "internal",
 756              }),
 757            ),
 758          );
 759        });
 760      });
 761      const clientDirectory = join(directory, "client");
 762      const receipt = await new LocalDaemonTransport({
 763        outputDirectory: clientDirectory,
 764        outputInlineBytes: 0,
 765      }).execute(endpoint, request);
 766  
 767      await expect(receipt.completion).resolves.toEqual({ status: "failed", code: "internal" });
 768      expect(acknowledgementCount).toBe(0);
 769      expect(
 770        await import("node:fs/promises").then(({ readdir }) => readdir(clientDirectory)),
 771      ).toEqual([]);
```

`b100221db:apps/cli/src/command-execution-result.ts`, lines 268–281:

```typescript
 268    }
 269  
 270    private async storeRecord(record: CommandOutputRecord): Promise<void> {
 271      const encoded = OrderedCommandOutput.encodeRecord(record);
 272      if (this.file === undefined && this.rawBytes + record.bytes.byteLength > this.inlineBytes) {
 273        await this.spillInlineRecords();
 274      }
 275      if (this.file === undefined) this.inlineRecords.push(record);
 276      else await this.file.write(encoded);
 277      this.hash.update(encoded.subarray(4));
 278      this.rawBytes += record.bytes.byteLength;
 279      this.recordCount += 1;
 280    }
 281  
```


<a id="e6"></a>

## E6 — three #131 consumer fixtures bypass constructor assignability

Three added policy-consumption cases use `as unknown as ConstructorParameters<...>` at construction: spool capacities, logger queue capacity, and resource cadence/thresholds. Their runtime assertions still exist, but those fixture constructions do not provide ordinary TypeScript assignability evidence. Page 28 teaches this explicitly; page 20's contract recall missed it. The diff establishes the casts, not a runtime failure or a motive for using them.

[Bundled pr-131 patch](../../../inputs/pr-131/diff.patch), patch lines 344–359:

```diff
 344  +          inlineRawBytes: 3,
 345  +          maximumResultRawBytes: 6,
 346  +          maximumAggregateSpoolRawBytes: 9,
 347  +        },
 348  +      },
 349  +    );
 350  +    const store = new completionSpoolModule.DaemonCompletionSpoolStore({
 351  +      directory,
 352  +      workspaceKey: "workspace-a",
 353  +      instanceId: "instance-a",
 354  +      policy: policy.values.output,
 355  +    } as unknown as ConstructorParameters<
 356  +      typeof completionSpoolModule.DaemonCompletionSpoolStore
 357  +    >[0]);
 358  +    const spool = await store.create("request-a");
 359  +
```

[Bundled pr-131 patch](../../../inputs/pr-131/diff.patch), patch lines 968–983:

```diff
 968  +    const root = mkdtempSync(join(tmpdir(), "symnav-daemon-policy-overflow-"));
 969  +    roots.push(root);
 970  +    const identity = DaemonWorkspaceIdentity.from("/repo", root);
 971  +    const storage = new BlockingLogStorage();
 972  +    const policy = DaemonPolicyTestFactory.withOverrides(
 973  +      DaemonPolicy.fromSystemMemory({ totalBytes: 1024 ** 3 }),
 974  +      { diagnostics: { maximumQueuedEvents: 1 } },
 975  +    );
 976  +    const logger = new DaemonLogger(identity, "overflow", new NodeDaemonClock(), {
 977  +      policy: policy.values.diagnostics,
 978  +      storage,
 979  +    } as unknown as ConstructorParameters<typeof DaemonLogger>[3]);
 980  +
 981  +    logger.record({ kind: "ready", fileCount: 1 });
 982  +    await storage.appendStarted;
 983  +    logger.record({ kind: "ready", fileCount: 2 });
```

[Bundled pr-131 patch](../../../inputs/pr-131/diff.patch), patch lines 1428–1443:

```diff
1428  +    let residentMemoryBytes = 102;
1429  +    const releaseTransientResources = vi.fn(async () => undefined);
1430  +    const supervisor = new DaemonResourceSupervisor({
1431  +      policy: policy.values.resources,
1432  +      generation: 1,
1433  +      residentMemoryBytes: () => residentMemoryBytes,
1434  +      spoolBytes: () => 0,
1435  +      scheduleAtTurnBoundary: runImmediately,
1436  +      releaseTransientResources,
1437  +      replaceWorker: async () => 2,
1438  +      drain: async () => undefined,
1439  +    } as unknown as ConstructorParameters<typeof DaemonResourceSupervisor>[0]);
1440  +
1441  +    supervisor.start();
1442  +    await vi.advanceTimersByTimeAsync(16);
1443  +    expect(releaseTransientResources).not.toHaveBeenCalled();
```


<a id="e7"></a>

## E7 — #148 retirement and portable hashing have recorded context

At the immediate base, the policy plan explicitly schedules removal of `@symnav/daemon/policy-testing` after the app-owned mechanism tests move package-local. The same paragraph remains at #148 head. This supplies the migration condition missing from pages 03, 12, 23, 29 and 35. It does not explain every deleted assertion or the local scope of the clock scan; those are separate choices.

The #148 commit trail includes **Specify portable daemon compatibility hashing** and **Normalize daemon compatibility source line endings**. The new test checks CRLF independence and that a source edit changes the digest. Page 23's unexplained label is too broad for CRLF normalization. A reason for the exact digest strategy or exclusions is a different question.

`ba53c8e1:plans/005/daemon-policy.md`, lines 62–66:

```typescript
  62  ## Migration access
  63  
  64  `DaemonPolicy.fromSerialized` and `DaemonPolicy.toSerialized` are temporary public root methods while app-owned process and worker entries require a complete-snapshot bridge. Phase 29 removes them after those entries move into the daemon package.
  65  
  66  Phase 26 removes `@symnav/daemon/policy-testing` after app-owned mechanism tests move package-local. The subpath exports only `DaemonPolicyTestFactory` and production imports are rejected by lint and meta-tests.
```

`20838f8d:plans/005/daemon-policy.md`, lines 62–66:

```typescript
  62  ## Migration access
  63  
  64  `DaemonPolicy.fromSerialized` and `DaemonPolicy.toSerialized` are temporary public root methods while app-owned process and worker entries require a complete-snapshot bridge. Phase 29 removes them after those entries move into the daemon package.
  65  
  66  Phase 26 removes `@symnav/daemon/policy-testing` after app-owned mechanism tests move package-local. The subpath exports only `DaemonPolicyTestFactory` and production imports are rejected by lint and meta-tests.
```

[Bundled pr-148 patch](../../../inputs/pr-148/diff.patch), patch lines 2194–2225:

```diff
2194  +      )
2195  +      .map((name) => `apps/cli/src/daemon/${name}`)
2196  +      .sort();
2197  +  }
2198  +
2199  +  static digest(repositoryRoot: string, files: readonly string[]): string {
2200  +    const hash = createHash("sha256");
2201  +    for (const file of files) {
2202  +      hash.update(file);
2203  +      hash.update("\0");
2204  +      hash.update(readFileSync(join(repositoryRoot, file), "utf8").replace(/\r\n/g, "\n"));
2205  +      hash.update("\0");
2206  +    }
2207  +    return hash.digest("hex");
2208  +  }
2209  +}
2210  +
2211  +describe("CLI daemon compatibility copies", () => {
2212  +  it("remain frozen while package-local mechanisms are staged", () => {
2213  +    const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
2214  +    const files = DaemonCompatibilityCopyInventory.files(repositoryRoot);
2215  +
2216  +    expect(files).toHaveLength(38);
2217  +    expect(DaemonCompatibilityCopyInventory.digest(repositoryRoot, files)).toBe(
2218  +      DaemonCompatibilityCopyInventory.expectedDigest,
2219  +    );
2220  +  });
2221  +
2222  +  it("hashes semantic source content independently of checkout line endings", () => {
2223  +    const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
2224  +    const files = DaemonCompatibilityCopyInventory.files(repositoryRoot);
2225  +    const crlfCheckoutRoot = mkdtempSync(join(tmpdir(), "symnav-daemon-compatibility-"));
```


<a id="e8"></a>

## E8 — the new #148 facade chooses its own warm-request protocol version

The still-shipped CLI dispatcher sends `record.protocolVersion`; the staged client sends `DAEMON_PROTOCOL_VERSION`. Page 06 names this choice. Most page-only recalls retained routing guard order and no-replay behavior without this request-construction difference. The code comparison establishes a different authority for that field; it does not establish a reachable production mismatch or a user-visible failure. No specific reason for the choice was found in the inspected #148 rationale.

`20838f8d:apps/cli/src/daemon/daemon-command-dispatcher.ts`, lines 212–222:

```typescript
 212      let receipt: DaemonExecutionReceipt;
 213      try {
 214        receipt = await runtime.transport.execute(record.endpoint, {
 215          kind: "execute",
 216          protocolVersion: record.protocolVersion,
 217          instanceId: record.instanceId,
 218          processToken: record.processToken,
 219          requestId: this.requestId(),
 220          commandName,
 221          request: { ...request, executionMode: "warm" },
 222        });
```

`20838f8d:packages/daemon/src/client/daemon-client-runtime.ts`, lines 182–202:

```typescript
 182      record: DaemonRecord,
 183      request: DaemonClientExecuteRequest,
 184    ): Promise<DaemonClientExecuteResult> {
 185      let receipt: Awaited<ReturnType<LocalDaemonTransport["execute"]>>;
 186      try {
 187        receipt = await this.routingTransport.execute(record.endpoint, {
 188          kind: "execute",
 189          protocolVersion: DAEMON_PROTOCOL_VERSION,
 190          instanceId: record.instanceId,
 191          processToken: record.processToken,
 192          requestId: randomUUID(),
 193          commandName: request.commandName,
 194          request: DaemonClientRuntime.executorRequest(request, "warm"),
 195        });
 196      } catch (error) {
 197        if (error instanceof DaemonTransportError && error.retrySafe) {
 198          return this.executeLocally(request, "fallback");
 199        }
 200        return { mode: "warm", result: DaemonControlledResult.acceptedRequestDidNotComplete() };
 201      }
 202      try {
```


<a id="e9"></a>

## E9 — canonical registry ownership also tightens some comparisons

The live CLI changes before the freeze. The old `isStartupOwner` checks only instance ID. Its replacement requires identity plus instance. The post-write starting-owner reread also changes from instance-only to the complete observed owner. Therefore “centralize equality” alone is missing a before/after acceptance contrast. Pages 06 and 08 state the tightening explicitly; page 18's inspected outline did not. The architectural reason for one owner is stated; a specific reason for tightening these comparisons under preservation was not found.

`ba53c8e1:apps/cli/src/daemon/daemon-registry.ts`, lines 405–411:

```typescript
 405    }
 406  
 407    isStartupOwner(identity: DaemonWorkspaceIdentity, instanceId: string): boolean {
 408      return this.startupOwner(identity)?.instanceId === instanceId;
 409    }
 410  
 411    startupOwnerMatchesProcess(identity: DaemonWorkspaceIdentity, record: DaemonRecord): boolean {
```

`20838f8d:apps/cli/src/daemon/daemon-registry.ts`, lines 516–524:

```typescript
 516    isStartupOwner(identity: DaemonWorkspaceIdentity, instanceId: string): boolean {
 517      return (
 518        this.startupOwnershipMatches(identity, {
 519          identityKey: identity.identityKey,
 520          instanceId,
 521        }) !== undefined
 522      );
 523    }
 524  
```

`20838f8d:apps/cli/src/daemon/daemon-registry.ts`, lines 842–865:

```typescript
 842    private startupOwnershipMatches(
 843      identity: DaemonWorkspaceIdentity,
 844      expectation: StartupOwnershipExpectation,
 845    ): StartupOwner | undefined {
 846      const owner = this.startupOwner(identity);
 847      if (
 848        owner?.identityKey !== expectation.identityKey ||
 849        owner.instanceId !== expectation.instanceId ||
 850        (expectation.processToken !== undefined && owner.processToken !== expectation.processToken) ||
 851        (expectation.ownerKind !== undefined && owner.ownerKind !== expectation.ownerKind) ||
 852        (expectation.ownerPid !== undefined && owner.ownerPid !== expectation.ownerPid) ||
 853        (expectation.acquiredAt !== undefined && owner.acquiredAt !== expectation.acquiredAt) ||
 854        (expectation.heartbeatAt !== undefined && owner.heartbeatAt !== expectation.heartbeatAt) ||
 855        (expectation.revision !== undefined && owner.revision !== expectation.revision)
 856      ) {
 857        return undefined;
 858      }
 859      return owner;
 860    }
 861  
 862    private static sameStartupMutationOwner(
 863      current: StartupMutationOwner | undefined,
 864      observed: StartupMutationOwner,
 865    ): boolean {
```


<a id="e10"></a>

## E10 — the stack narrows the diagnostic test's observation surface

The built-CLI test loses per-file size and backup-count assertions. It changes secret checks on all raw log contents to checks on JSON-serialized inspector events. These do not make the same observation: the inspector skips malformed or invalid records. The move to package-owned inspection is stated; the inspected rationale does not separately justify dropping those exact observations. Page 14's additional sheet and page 22's top expose this. Page 21's read map did not retain the distinction despite explaining the inspector boundary.

[Bundled stack patch](../../../inputs/stack/diff.patch), patch lines 7447–7474:

```diff
7447       writeFileSync(crashTrigger, "crash");
7448  -    await waitUntil(() => !isProcessAlive(record!.pid));
7449  +    await waitUntil(() => !isProcessAlive(instance!.pid));
7450   
7451  -    const logNames = readdirSync(identity.identityDirectory)
7452  -      .filter((name) => /^daemon\.log(?:\.\d+)?$/.test(name))
7453  -      .sort();
7454  -    expect(logNames).toContain("daemon.log");
7455  -    expect(logNames).not.toContain(`daemon.log.${DAEMON_LOG_BACKUP_COUNT + 1}`);
7456  -    expect(logNames.length).toBeLessThanOrEqual(DAEMON_LOG_BACKUP_COUNT + 1);
7457  -    const events: Record<string, unknown>[] = [];
7458  -    for (const name of logNames) {
7459  -      const path = join(identity.identityDirectory, name);
7460  -      expect(statSync(path).size).toBeLessThanOrEqual(DAEMON_LOG_ROTATE_BYTES);
7461  -      const contents = readFileSync(path, "utf8");
7462  -      expect(contents).not.toContain(secret);
7463  -      for (const line of contents.split("\n").filter((value) => value.length > 0)) {
7464  -        const event = JSON.parse(line) as Record<string, unknown>;
7465  -        events.push(event);
7466  -      }
7467  -    }
7468  +    const events = testing.inspector.readDiagnostics(canonicalRoot).events;
7469  +    expect(JSON.stringify(events)).not.toContain(secret);
7470       expect(events.filter((event) => event.kind === "process-termination")).toEqual([
7471         expect.objectContaining({
7472           terminationReason: "uncaught-exception",
7473  @@ -104,28 +73,18 @@ describe("daemon diagnostic output isolation", () => {
7474           cwd: workspaceRoot,
```

`d070023:packages/daemon/src/testing/daemon-testing-inspector.ts`, lines 109–131:

```typescript
 109  
 110    private static diagnosticEventsFrom(path: string): readonly DaemonTestingDiagnosticEvent[] {
 111      let contents: string;
 112      try {
 113        contents = readFileSync(path, "utf8");
 114      } catch (error) {
 115        if (DaemonTestingInspector.errorCode(error) === "ENOENT") return [];
 116        throw error;
 117      }
 118      return contents
 119        .split("\n")
 120        .filter((line) => line.length > 0)
 121        .flatMap((line) => {
 122          try {
 123            const value: unknown = JSON.parse(line);
 124            return DaemonDiagnosticValues.isDiagnostics(value) ? [value] : [];
 125          } catch (error) {
 126            if (error instanceof SyntaxError) return [];
 127            throw error;
 128          }
 129        });
 130    }
 131  
```


<a id="e11"></a>

## E11 — last configured owner wins primary lookup

The core graph pushes owners in configuration order but unconditionally sets `primaryProjectByRelativePath` on each visit. For one path owned by A then B, `projectsByRelativePath` contains `[A, B]` and primary lookup yields B. Page 14's “last” is correct; the captured pages 01 and 22 taught “first.” This is an explanatory correction, not evidence of a new implementation defect. No comparative rationale for the primary-owner ordering was found in the inspected stack material.

`d070023:packages/core/src/workspace/project-graph.ts`, lines 321–340:

```typescript
 321      configuredProjects: readonly Project[],
 322    ): {
 323      readonly projectsByRelativePath: ReadonlyMap<string, readonly Project[]>;
 324      readonly primaryProjectByRelativePath: ReadonlyMap<string, Project>;
 325    } {
 326      const projectsByRelativePath = new Map<string, Project[]>();
 327      const primaryProjectByRelativePath = new Map<string, Project>();
 328      for (const [index, configuration] of configurations.entries()) {
 329        const project = configuredProjects[index];
 330        if (!project) continue;
 331        for (const file of configuration.files) {
 332          const projects = projectsByRelativePath.get(file.relative) ?? [];
 333          projects.push(project);
 334          projectsByRelativePath.set(file.relative, projects);
 335          primaryProjectByRelativePath.set(file.relative, project);
 336        }
 337      }
 338      return { projectsByRelativePath, primaryProjectByRelativePath };
 339    }
 340  }
```

`d070023:packages/core/src/workspace/project-graph.ts`, lines 154–159:

```typescript
 154    protected primaryProjectFor(relativePath: string): Project | undefined {
 155      const file = this.state?.filesByRelativePath.get(relativePath);
 156      if (!file) return undefined;
 157      return (
 158        this.state?.primaryProjectByRelativePath.get(relativePath) ?? this.state?.inferredProject
 159      );
```


<a id="e12"></a>

## E12 — final CLI executor composition creates a separate default policy

The injected daemon snapshot crosses daemon-process and worker boundaries, but the CLI executor factory independently calls `DaemonPolicy.currentSystem()` when building host dependencies. A map of “one complete injected policy” should name that host boundary exception. Page 21 already does. The source proves a separate construction; it does not prove different numerical values on a normal run. No specific reason for the independent host default was found in the inspected stack material.

`d070023:apps/cli/src/daemon-executor.ts`, lines 130–137:

```typescript
 130  export function createDaemonExecutor(options: DaemonExecutorFactoryOptions): DaemonExecutor {
 131    const dependencies = createDefaultDependencies(
 132      options.stateDirectory,
 133      DaemonPolicy.currentSystem(),
 134    );
 135    return createDaemonExecutorFromDependencies(options, dependencies);
 136  }
 137  
```


<a id="e13"></a>

## E13 — retained client composition, fresh local executor

Each cold/fallback call invokes the host executor factory anew, with a no-op resource sampler. The client retains its runtime composition, not a local executor instance. Page 06 names this in K6 and its host-options table. It was absent from that row's locked teach-back: a recall miss, not an artifact omission. Executor injection has a stated architectural reason; the exact per-attempt lifetime is a separate visible contract.

`20838f8d:packages/daemon/src/client/daemon-client-runtime.ts`, lines 217–228:

```typescript
 217    private async executeLocally(
 218      request: DaemonClientExecuteRequest,
 219      mode: "cold" | "fallback",
 220    ): Promise<DaemonClientExecuteResult> {
 221      const executor = await this.options.executorFactory({
 222        stateDirectory: this.options.stateDirectory,
 223        productVersion: this.options.productVersion,
 224        sampleResources: () => undefined,
 225      });
 226      const result = await executor.execute(DaemonClientRuntime.executorRequest(request, mode));
 227      return { mode, result };
 228    }
```


<a id="e14"></a>

## E14 — the adjacent pair also keeps shutdown ordering explicit

The delivery/execution extractions preserve a graceful-worker-close barrier before spool cleanup. Page 30 states that in its open group 05, and distinguishes it from the ordinary current-delivery wait and turn-boundary sample. My locked recall omitted this shutdown order. The new process test gates worker close and observes cleanup afterward. This is another recall miss with an already-prepared parent, not a surprise on descent.

[Saved #146 diff](pr-146.patch):

```diff
1219  +  it("cleans instance spools only after graceful worker shutdown completes", async () => {
1220  +    const transitions: string[] = [];
1221  +    const worker = new ShutdownGatedNavigationWorker(new ImmediateExecutor(), transitions);
1222  +    const storage = new ObservingInstanceCleanupStorage(transitions);
1223  +    const harness = await RequestHarness.start(undefined, {
1224  +      navigationWorker: worker,
1225  +      completionSpoolStorage: storage,
1226  +    });
1227  +    harnesses.push(harness);
1228  +
1229  +    await harness.stop();
1230  +    await worker.closeStarted;
1231  +    const transitionsWhileWorkerWasBlocked = [...transitions];
1232  +    worker.allowClose();
1233  +    await harness.exited;
1234  +
1235  +    expect(transitionsWhileWorkerWasBlocked).toEqual(["worker-close-started"]);
1236  +    expect(transitions).toEqual([
1237  +      "worker-close-started",
1238  +      "worker-close-completed",
1239  +      "instance-spool-cleanup",
1240  +    ]);
1241  +  });
```

The #147 implementation reads `trackedCompletion(requestId)` once immediately after ledger completion; it does not continuously follow every subsequent attachment. [Saved #147 diff](pr-147.patch), lines 541–553, and [#146 delivery map](pr-146.patch), lines 938–953. This detail was already in page 30's stopping layer and the locked recall.
