# Phase 3 · pinned source excerpts

The first two responses are sealed. Compare them with these selected source excerpts. They were freshly extracted with git show at the commits below, not run as a daemon. This is a focused source comparison, not an exhaustive source audit. For each of the five cases record what source confirms, corrects or leaves undecided; identify any difference between learning from the top, from the authored descent, and from source. Do not revise earlier files or consult other readers.

## Case 127

### 127-base-backend.ts · L79–89

a1e325a5ff979bdfa25babc5554621c8c0f20497 · packages/backend-typescript/src/typescript-backend/typescript-backend.ts

```ts
  79   async refresh(request: BackendRefreshRequest): Promise<BackendRefreshSummary> {
  80     this.sourceCache?.refresh(request.snapshot);
  81     if (request.coverage === "workspace") await this.projectGraph?.refresh(request.snapshot);
  82     const summary = await this.state.refresh(request.snapshot.files, request.coverage);
  83     this.semanticQueries.beginTurn(request.snapshot);
  84     return summary;
  85   }
  86 
  87   async releaseTransientResources(): Promise<void> {
  88     this.semanticQueries.releaseTransientResources();
  89   }
```

### 127-head-backend.ts · L79–89

64919bcbcf7fcc8202779b78c5f069b24662bb18 · packages/backend-typescript/src/typescript-backend/typescript-backend.ts

```ts
  79   async refresh(request: BackendRefreshRequest): Promise<BackendRefreshSummary> {
  80     this.sourceCache?.refresh(request.snapshot);
  81     if (request.coverage === "workspace") await this.projectGraph?.refresh(request.snapshot);
  82     const summary = await this.state.refresh(request.snapshot.files, request.coverage);
  83     this.semanticQueries.beginTurn(request.snapshot.files);
  84     return summary;
  85   }
  86 
  87   async releaseTransientResources(): Promise<void> {
  88     await this.semanticQueries.releaseTransientResources();
  89   }
```

### 127-base-service.ts · L49–70

a1e325a5ff979bdfa25babc5554621c8c0f20497 · packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts

```ts
  49   beginTurn(snapshot: WorkspaceSnapshot): void {
  50     this.files = snapshot.files;
  51     this.clearQueryCaches();
  52   }
  53 
  54   findDefinitions(identity: SymbolIdentity): Promise<readonly SymbolOverviewNode[]> {
  55     const key = formatSymbolIdentity(identity);
  56     const existing = this.definitionsByIdentity.get(key);
  57     if (existing) return existing;
  58     this.observer?.definitionSearch?.(identity);
  59     const definitions = findDefinitions({
  60       workspaceState: this.workspaceState,
  61       files: this.files,
  62       identity,
  63     });
  64     this.definitionsByIdentity.set(key, definitions);
  65     return definitions;
  66   }
  67 
  68   async findReferences(identity: SymbolIdentity): Promise<readonly SymbolReference[]> {
  69     const locations = await this.referenceLocations(identity);
  70     return locations.flatMap((location) => {
```

### 127-base-service.ts · L125–128

a1e325a5ff979bdfa25babc5554621c8c0f20497 · packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts

```ts
 125   releaseTransientResources(): void {
 126     this.clearQueryCaches();
 127     this.projects?.releaseTransientResources();
 128   }
```

### 127-base-service.ts · L219–226

a1e325a5ff979bdfa25babc5554621c8c0f20497 · packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts

```ts
 219   private clearQueryCaches(): void {
 220     this.definitionsByIdentity.clear();
 221     this.referencesByIdentity.clear();
 222     this.callTargetsByIdentity.clear();
 223     this.callersByIdentity.clear();
 224     this.calleesByIdentity.clear();
 225     this.definitionsByPosition.clear();
 226   }
```

### 127-head-service.ts · L29–79

64919bcbcf7fcc8202779b78c5f069b24662bb18 · packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts

```ts
  29 export class TypeScriptSemanticQueryService implements PositionDefinitionResolver {
  30   private files: readonly WorkspaceFile[] = [];
  31   private readonly cacheScope = new TurnScopedCacheScope();
  32   private readonly definitionsByIdentity = this.cacheScope.createCache<
  33     string,
  34     Promise<readonly SymbolOverviewNode[]>
  35   >();
  36   private readonly referencesByIdentity = this.cacheScope.createCache<
  37     string,
  38     Promise<readonly SemanticReferenceLocation[]>
  39   >();
  40   private readonly callTargetsByIdentity = this.cacheScope.createCache<
  41     string,
  42     Promise<CallTargetResolution>
  43   >();
  44   private readonly callersByIdentity = this.cacheScope.createCache<
  45     string,
  46     Promise<readonly CallEdge[]>
  47   >();
  48   private readonly calleesByIdentity = this.cacheScope.createCache<
  49     string,
  50     Promise<readonly CallEdge[]>
  51   >();
  52   private readonly definitionsByPosition = this.cacheScope.createCache<
  53     string,
  54     readonly SemanticNodeLocation[]
  55   >();
  56 
  57   constructor(
  58     private readonly projects: TypeScriptProjectGraph | undefined,
  59     private readonly workspaceState: TypeScriptWorkspaceState,
  60     private readonly observer?: TypeScriptSemanticQueryObserver,
  61   ) {}
  62 
  63   beginTurn(files: readonly WorkspaceFile[]): void {
  64     this.files = files;
  65     this.cacheScope.beginTurn();
  66   }
  67 
  68   findDefinitions(identity: SymbolIdentity): Promise<readonly SymbolOverviewNode[]> {
  69     const key = formatSymbolIdentity(identity);
  70     return this.definitionsByIdentity.getOrCreate(key, () => {
  71       this.observer?.definitionSearch?.(identity);
  72       return findDefinitions({
  73         workspaceState: this.workspaceState,
  74         files: this.files,
  75         identity,
  76       });
  77     });
  78   }
  79 
```

### 127-head-service.ts · L129–132

64919bcbcf7fcc8202779b78c5f069b24662bb18 · packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts

```ts
 129   async releaseTransientResources(): Promise<void> {
 130     this.cacheScope.releaseTransientResources();
 131     await this.projects?.releaseTransientResources();
 132   }
```

### 127-head-scope.ts · L1–46

64919bcbcf7fcc8202779b78c5f069b24662bb18 · packages/core/src/backend/turn-scoped-cache-scope.ts

```ts
   1 export interface TurnScopedCache<Key, Value> {
   2   getOrCreate(key: Key, createValue: () => Value): Value;
   3 }
   4 
   5 interface ClearableTurnScopedCache {
   6   clear(): void;
   7 }
   8 
   9 class TurnScopedCacheHandle<Key, Value>
  10   implements TurnScopedCache<Key, Value>, ClearableTurnScopedCache
  11 {
  12   private readonly values = new Map<Key, Value>();
  13 
  14   getOrCreate(key: Key, createValue: () => Value): Value {
  15     if (this.values.has(key)) return this.values.get(key) as Value;
  16     const value = createValue();
  17     this.values.set(key, value);
  18     return value;
  19   }
  20 
  21   clear(): void {
  22     this.values.clear();
  23   }
  24 }
  25 
  26 export class TurnScopedCacheScope {
  27   private readonly caches: ClearableTurnScopedCache[] = [];
  28 
  29   createCache<Key, Value>(): TurnScopedCache<Key, Value> {
  30     const cache = new TurnScopedCacheHandle<Key, Value>();
  31     this.caches.push(cache);
  32     return cache;
  33   }
  34 
  35   beginTurn(): void {
  36     this.clear();
  37   }
  38 
  39   releaseTransientResources(): void {
  40     this.clear();
  41   }
  42 
  43   private clear(): void {
  44     for (const cache of this.caches) cache.clear();
  45   }
  46 }
```

## Case validation

### 131-base-worker.ts · L77–97

b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e · apps/cli/src/daemon/daemon-navigation-worker.ts

```ts
  77   constructor(options: NodeDaemonNavigationWorkerOptions) {
  78     this.generation = options.generation;
  79     this.exited = new Promise((resolve) => {
  80       this.resolveExited = resolve;
  81     });
  82     this.worker = new Worker(
  83       options.entryUrl ?? new URL("./daemon-navigation-worker-entry.js", import.meta.url),
  84       {
  85         workerData: {
  86           stateDirectory: options.configuration.stateDirectory,
  87           generation: options.generation,
  88           policy: options.configuration.policy,
  89           ...options.workerData,
  90         },
  91         resourceLimits: options.resourceLimits,
  92       },
  93     );
  94     this.worker.on("message", (value: unknown) => void this.receive(value));
  95     this.worker.once("error", (error) => this.failCommunication(error));
  96     this.worker.once("exit", () => this.finishExit());
  97   }
```

### 131-base-entry.ts · L38–49

b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e · apps/cli/src/daemon/daemon-navigation-worker-entry.ts

```ts
  38   };
  39 
  40   constructor(
  41     private readonly port: NonNullable<typeof parentPort>,
  42     private readonly data: NavigationWorkerData,
  43   ) {
  44     this.policy = DaemonPolicy.fromSerialized(data.policy);
  45   }
  46 
  47   run(): void {
  48     this.port.on("message", (value: unknown) => {
  49       if (
```

### 131-head-worker.ts · L78–101

b100221db48754656328391b878299c5a0bab443 · apps/cli/src/daemon/daemon-navigation-worker.ts

```ts
  78   constructor(options: NodeDaemonNavigationWorkerOptions) {
  79     this.generation = options.generation;
  80     this.maximumChunkRawBytes = DaemonPolicy.fromSerialized(
  81       options.configuration.policy,
  82     ).values.output.maximumChunkRawBytes;
  83     this.exited = new Promise((resolve) => {
  84       this.resolveExited = resolve;
  85     });
  86     this.worker = new Worker(
  87       options.entryUrl ?? new URL("./daemon-navigation-worker-entry.js", import.meta.url),
  88       {
  89         workerData: {
  90           stateDirectory: options.configuration.stateDirectory,
  91           generation: options.generation,
  92           policy: options.configuration.policy,
  93           ...options.workerData,
  94         },
  95         resourceLimits: options.resourceLimits,
  96       },
  97     );
  98     this.worker.on("message", (value: unknown) => void this.receive(value));
  99     this.worker.once("error", (error) => this.failCommunication(error));
 100     this.worker.once("exit", () => this.finishExit());
 101   }
```

### 131-head-policy.ts · L162–164

b100221db48754656328391b878299c5a0bab443 · packages/daemon/src/daemon-policy.ts

```ts
 162   static fromSerialized(value: unknown): DaemonPolicy {
 163     return new DaemonPolicy(DaemonPolicyCodec.parse(value));
 164   }
```

### 131-head-policy.ts · L185–194

b100221db48754656328391b878299c5a0bab443 · packages/daemon/src/daemon-policy.ts

```ts
 185   static parse(value: unknown): DaemonPolicyValues {
 186     if (!DaemonPolicyCodec.isRecord(value)) throw new Error("Invalid daemon policy");
 187     DaemonPolicyCodec.exactKeys(value, ["schemaVersion", "values"]);
 188     if (value.schemaVersion !== 1 || !DaemonPolicyCodec.isRecord(value.values)) {
 189       throw new Error("Invalid daemon policy");
 190     }
 191     const values = value.values;
 192     DaemonPolicyCodec.validateValues(values);
 193     return JSON.parse(JSON.stringify(values)) as DaemonPolicyValues;
 194   }
```

## Case owner

### stack-head-graph.ts · L154–166

d07002357d3e9596bfaae910a1ac63b77981620b · packages/core/src/workspace/project-graph.ts

```ts
 154   protected primaryProjectFor(relativePath: string): Project | undefined {
 155     const file = this.state?.filesByRelativePath.get(relativePath);
 156     if (!file) return undefined;
 157     return (
 158       this.state?.primaryProjectByRelativePath.get(relativePath) ?? this.state?.inferredProject
 159     );
 160   }
 161 
 162   protected projectsFor(relativePath: string): readonly Project[] {
 163     const file = this.state?.filesByRelativePath.get(relativePath);
 164     if (!file) return [];
 165     return this.state?.projectsByRelativePath.get(relativePath) ?? [this.state!.inferredProject];
 166   }
```

### stack-head-graph.ts · L319–340

d07002357d3e9596bfaae910a1ac63b77981620b · packages/core/src/workspace/project-graph.ts

```ts
 319   private static buildOwnership<ConfigurationUnit, Project>(
 320     configurations: readonly ProjectConfigurationMembership<ConfigurationUnit>[],
 321     configuredProjects: readonly Project[],
 322   ): {
 323     readonly projectsByRelativePath: ReadonlyMap<string, readonly Project[]>;
 324     readonly primaryProjectByRelativePath: ReadonlyMap<string, Project>;
 325   } {
 326     const projectsByRelativePath = new Map<string, Project[]>();
 327     const primaryProjectByRelativePath = new Map<string, Project>();
 328     for (const [index, configuration] of configurations.entries()) {
 329       const project = configuredProjects[index];
 330       if (!project) continue;
 331       for (const file of configuration.files) {
 332         const projects = projectsByRelativePath.get(file.relative) ?? [];
 333         projects.push(project);
 334         projectsByRelativePath.set(file.relative, projects);
 335         primaryProjectByRelativePath.set(file.relative, project);
 336       }
 337     }
 338     return { projectsByRelativePath, primaryProjectByRelativePath };
 339   }
 340 }
```

### 127-head-graph.ts · L319–340

64919bcbcf7fcc8202779b78c5f069b24662bb18 · packages/core/src/workspace/project-graph.ts

```ts
 319   private static buildOwnership<ConfigurationUnit, Project>(
 320     configurations: readonly ProjectConfigurationMembership<ConfigurationUnit>[],
 321     configuredProjects: readonly Project[],
 322   ): {
 323     readonly projectsByRelativePath: ReadonlyMap<string, readonly Project[]>;
 324     readonly primaryProjectByRelativePath: ReadonlyMap<string, Project>;
 325   } {
 326     const projectsByRelativePath = new Map<string, Project[]>();
 327     const primaryProjectByRelativePath = new Map<string, Project>();
 328     for (const [index, configuration] of configurations.entries()) {
 329       const project = configuredProjects[index];
 330       if (!project) continue;
 331       for (const file of configuration.files) {
 332         const projects = projectsByRelativePath.get(file.relative) ?? [];
 333         projects.push(project);
 334         projectsByRelativePath.set(file.relative, projects);
 335         primaryProjectByRelativePath.set(file.relative, project);
 336       }
 337     }
 338     return { projectsByRelativePath, primaryProjectByRelativePath };
 339   }
 340 }
```

## Case 23

### 148-head-coordinator.ts · L353–407

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/process/process-coordinator.ts

```ts
 353   private async handle(
 354     request: DaemonRequest,
 355     send: DaemonServerSend,
 356   ): Promise<DaemonResponse | void> {
 357     if (request.kind === "identify") return this.identify(request);
 358     if (request.kind === "terminate" || request.kind === "kill") {
 359       return this.terminate(request);
 360     }
 361     if (
 362       request.protocolVersion !== DAEMON_PROTOCOL_VERSION ||
 363       request.instanceId !== this.options.coordinates.instanceId
 364     ) {
 365       throw new Error("Daemon request does not match protocol or instance");
 366     }
 367     if (request.kind === "ping") return this.pong();
 368     if (request.kind === "execute") return this.acceptExecution(request, send);
 369     if (
 370       request.kind === "execution-status" ||
 371       request.kind === "result-fetch" ||
 372       request.kind === "result-ack"
 373     ) {
 374       if (request.processToken !== this.options.coordinates.processToken) {
 375         throw new Error("Daemon execution request does not match process instance");
 376       }
 377     }
 378     if (request.kind === "result-fetch") {
 379       await this.deliverySession.fetch(request, send);
 380       return;
 381     }
 382     if (request.kind === "result-ack") {
 383       return this.deliverySession.acknowledge(request);
 384     }
 385     if (request.kind === "execution-status") {
 386       return {
 387         kind: "execution-status",
 388         instanceId: this.options.coordinates.instanceId,
 389         processToken: this.options.coordinates.processToken,
 390         requestId: request.requestId,
 391         status: this.acceptedExecutionSession.status(request.requestId),
 392       };
 393     }
 394     this.beginGracefulShutdown();
 395     await this.acceptedExecutionSession.drain();
 396     await this.deliverySession.waitForCompletionAcknowledgements();
 397     setTimeout(() => void this.shutdown("graceful"), 0);
 398     return { kind: "stopped", instanceId: this.options.coordinates.instanceId };
 399   }
 400 
 401   private identify(request: Extract<DaemonRequest, { kind: "identify" }>): DaemonResponse {
 402     if (
 403       request.instanceId !== this.options.coordinates.instanceId ||
 404       request.processToken !== this.options.coordinates.processToken
 405     ) {
 406       throw new Error("Daemon identity request does not match process instance");
 407     }
```

### 148-head-coordinator.ts · L417–425

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/process/process-coordinator.ts

```ts
 417   private async terminate(
 418     request: Extract<DaemonRequest, { kind: "terminate" | "kill" }>,
 419   ): Promise<DaemonResponse> {
 420     if (
 421       request.instanceId !== this.options.coordinates.instanceId ||
 422       request.processToken !== this.options.coordinates.processToken
 423     ) {
 424       throw new Error("Daemon termination does not match process instance");
 425     }
```

### 148-head-coordinator.ts · L469–501

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/process/process-coordinator.ts

```ts
 469 
 470   private async acceptExecution(
 471     request: Extract<DaemonRequest, { kind: "execute" }>,
 472     send: DaemonServerSend,
 473   ): Promise<DaemonResponse | void> {
 474     const decision = this.decideAdmission(request);
 475     if (decision.kind === "disconnect") {
 476       throw new Error("Daemon execution request does not match process instance");
 477     }
 478     if (decision.kind === "reject") return this.rejection(request, decision.code);
 479     const admission = this.acceptedExecutionSession.accept(request);
 480     await this.deliverySession.attach(
 481       {
 482         ...admission.acceptance,
 483       },
 484       send,
 485     );
 486   }
 487 
 488   private decideAdmission(
 489     request: Extract<DaemonRequest, { kind: "execute" }>,
 490   ): DaemonAdmissionDecision {
 491     const authenticated = request.processToken === this.options.coordinates.processToken;
 492     if (!authenticated) {
 493       return this.admissionPolicy.decide({
 494         request,
 495         authenticated,
 496         workerReady: true,
 497         resourceAdmissionPaused: false,
 498         queueState: "accepting",
 499         compatibility: "unseen",
 500       });
 501     }
```

### 148-head-admission.ts · L45–51

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/daemon-admission.ts

```ts
  45 
  46 class AuthenticationAdmissionGuard implements DaemonAdmissionGuard {
  47   rejectionFor(context: DaemonAdmissionContext): DaemonAdmissionRejectionCode | undefined {
  48     return context.authenticated ? undefined : "authentication";
  49   }
  50 }
  51 
```

### 148-head-admission.ts · L78–93

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/daemon-admission.ts

```ts
  78     new AuthenticationAdmissionGuard(),
  79     new WorkerReadinessAdmissionGuard(),
  80     new ResourceAdmissionGuard(),
  81     new QueueAdmissionGuard(),
  82     new CompatibilityAdmissionGuard(),
  83   ];
  84 
  85   decide(context: DaemonAdmissionContext): DaemonAdmissionDecision {
  86     for (const guard of this.guards) {
  87       const rejection = guard.rejectionFor(context);
  88       if (rejection === undefined) continue;
  89       if (rejection === "authentication") return { kind: "disconnect", code: rejection };
  90       return { kind: "reject", code: rejection };
  91     }
  92     return { kind: "accept" };
  93   }
```

### 148-head-contracts.ts · L10–18

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/client/daemon-client-contracts.ts

```ts
  10 export interface DaemonClientOptions {
  11   readonly stateDirectory: string;
  12   readonly productVersion: string;
  13   readonly daemonEnabled: boolean;
  14   readonly executorFactory: DaemonExecutorFactory;
  15   readonly executorModuleUrl: DaemonExecutorModuleUrl;
  16   readonly readinessProbe: DaemonReadinessProbe;
  17   readonly policy?: DaemonPolicy;
  18 }
```

### 148-head-runtime.ts · L85–90

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/client/daemon-client-runtime.ts

```ts
  85   constructor(private readonly options: DaemonClientOptions) {
  86     this.policy = options.policy ?? DaemonPolicy.currentSystem();
  87     this.registry = new DaemonRegistry(
  88       DaemonWorkspaceIdentity.registryDirectory(options.stateDirectory),
  89       this.policy.values.startup,
  90     );
```

## Case 29

### 148-base-queue.ts · L29–35

ba53c8e1662fd86d198b95321c90d9c9bef10184 · apps/cli/src/daemon/workspace-request-queue.ts

```ts
  29   private readonly idleWaiters: (() => void)[] = [];
  30   private activeRequest: WorkspaceActiveRequest | undefined;
  31   private scheduledBoundary: ScheduledBoundary | undefined;
  32   private running = false;
  33   private currentState: WorkspaceRequestQueueState = "accepting";
  34 
  35   constructor(private readonly now: () => number = Date.now) {}
```

### 148-base-queue.ts · L64–78

ba53c8e1662fd86d198b95321c90d9c9bef10184 · apps/cli/src/daemon/workspace-request-queue.ts

```ts
  64     const result = new Promise<T>((resolve, reject) => {
  65       this.requestOperations.push(async () => {
  66         const admitted = this.admitted.shift();
  67         if (admitted === undefined || admitted.requestId !== metadata.requestId) {
  68           reject(new Error("Workspace request queue admission order changed"));
  69           return;
  70         }
  71         this.activeRequest = Object.freeze({ ...admitted, startedAt: this.now() });
  72         try {
  73           resolve(await execute());
  74         } catch (error) {
  75           reject(error);
  76         } finally {
  77           this.activeRequest = undefined;
  78         }
```

### 148-head-queue.ts · L29–38

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/execution/request-queue.ts

```ts
  29   private readonly requestOperations: (() => Promise<void>)[] = [];
  30   private readonly idleWaiters: (() => void)[] = [];
  31   private activeRequest: WorkspaceActiveRequest | undefined;
  32   private scheduledBoundary: ScheduledBoundary | undefined;
  33   private running = false;
  34   private currentState: WorkspaceRequestQueueState = "accepting";
  35 
  36   constructor(
  37     private readonly clock: Pick<DaemonClock, "monotonicNowMs"> = new NodeDaemonClock(),
  38   ) {}
```

### 148-head-queue.ts · L67–83

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/execution/request-queue.ts

```ts
  67     const result = new Promise<T>((resolve, reject) => {
  68       this.requestOperations.push(async () => {
  69         const admitted = this.admitted.shift();
  70         if (admitted === undefined || admitted.requestId !== metadata.requestId) {
  71           reject(new Error("Workspace request queue admission order changed"));
  72           return;
  73         }
  74         this.activeRequest = Object.freeze({
  75           ...admitted,
  76           startedAt: this.clock.monotonicNowMs(),
  77         });
  78         try {
  79           resolve(await execute());
  80         } catch (error) {
  81           reject(error);
  82         } finally {
  83           this.activeRequest = undefined;
```

### 148-base-coordinator.ts · L85–95

ba53c8e1662fd86d198b95321c90d9c9bef10184 · apps/cli/src/daemon/workspace-daemon.ts

```ts
  85   constructor(private readonly options: WorkspaceDaemonOptions) {
  86     const policy = options.policy;
  87     this.policy = policy;
  88     this.forceEscalated = new Promise((resolve) => {
  89       this.resolveForceEscalated = resolve;
  90     });
  91     this.now = options.now ?? Date.now;
  92     this.clock = options.clock ?? new NodeDaemonClock();
  93     this.startedMonotonicAt = this.clock.monotonicNowMs();
  94     const requestQueue = new WorkspaceRequestQueue(() => this.clock.monotonicNowMs());
  95     const acceptedRequests = new AcceptedRequestLedger(this.now);
```

### 148-head-coordinator.ts · L84–94

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/process/process-coordinator.ts

```ts
  84   constructor(private readonly options: DaemonProcessCoordinatorOptions) {
  85     DaemonProcessCoordinator.validateCoordinates(options.identity, options.coordinates);
  86     const policy = options.policy;
  87     this.policy = policy;
  88     this.forceEscalated = new Promise((resolve) => {
  89       this.resolveForceEscalated = resolve;
  90     });
  91     this.clock = options.clock;
  92     this.startedMonotonicAt = this.clock.monotonicNowMs();
  93     const requestQueue = new WorkspaceRequestQueue(this.clock);
  94     const acceptedRequests = new AcceptedRequestLedger(this.clock);
```

### 148-head-clock.ts · L1–28

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/lifecycle/daemon-clock.ts

```ts
   1 import { performance } from "node:perf_hooks";
   2 
   3 export interface DaemonClock {
   4   wallNowMs(): number;
   5   monotonicNowMs(): number;
   6 }
   7 
   8 interface DaemonClockSources {
   9   readonly wallNowMs: () => number;
  10   readonly monotonicNowMs: () => number;
  11 }
  12 
  13 export class NodeDaemonClock implements DaemonClock {
  14   constructor(
  15     private readonly sources: DaemonClockSources = {
  16       wallNowMs: Date.now,
  17       monotonicNowMs: () => performance.now(),
  18     },
  19   ) {}
  20 
  21   wallNowMs(): number {
  22     return this.sources.wallNowMs();
  23   }
  24 
  25   monotonicNowMs(): number {
  26     return this.sources.monotonicNowMs();
  27   }
  28 }
```

### 148-head-activity.ts · L103–122

20838f8dbf413e04767543eb2380d0d114da6c60 · packages/daemon/src/process/activity-projector.ts

```ts
 103     if (input.resources.state === "shedding") return "resource-pressure";
 104     return undefined;
 105   }
 106 
 107   private static current(
 108     input: DaemonActivityProjectionInput,
 109     lifecycle: DaemonActivitySnapshot["lifecycle"],
 110   ): DaemonActivitySnapshot["current"] {
 111     if (lifecycle !== "busy" || input.queue.active === undefined) return undefined;
 112     return Object.freeze({
 113       requestId: input.queue.active.requestId,
 114       command: input.queue.active.command,
 115       elapsedMs: Math.max(0, input.nowMonotonicMs - input.queue.active.startedAt),
 116     });
 117   }
 118 
 119   private static legacyState(
 120     lifecycle: DaemonActivitySnapshot["lifecycle"],
 121   ): NonNullable<DaemonPong["state"]> {
 122     if (lifecycle === "busy") return "busy";
```
