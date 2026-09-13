window.REVIEW = {
  title: 'The reading loom',
  depths: ['Shape', 'Choice', 'Mechanism', 'Evidence'],
  facts: [
    {
      id: 'owner', title: 'Move lifetime across the package seam', short: 'Ownership', status: 'stated',
      summary: 'Core gains the generic cache lifetime owner. The TypeScript query service holds its instance and keeps the semantic algorithms. The existing TypeScript → core dependency direction stays the same.',
      reason: 'The architecture spec assigns language-independent retention to core; the PR explicitly moves only cache lifetime.',
      before: 'TypeScriptSemanticQueryService owns six Maps and names every Map in a manual clearing method.',
      after: 'The service creates a core TurnScopedCacheScope; the scope registers and clears the handles.',
      choice: 'Move the reusable lifetime mechanism into core while keeping language-specific query work in the backend.',
      steps: [
        ['Source boundary', 'TurnScopedCacheScope is implemented in packages/core/src/backend and exported by core.'],
        ['Object ownership', 'Each TypeScriptSemanticQueryService constructs its own scope and retains it as a private field.'],
        ['Calls across the seam', 'The service asks the scope to create caches, begin a turn, and release transient entries.'],
        ['Work stays put', 'Definition, reference, call-target, caller, callee, and position-resolution algorithms remain in TypeScript.']
      ],
      evidence: [
        {key:'head:scope',start:26,end:46,caption:'The new generic lifetime owner has no imports.'},
        {key:'head:service',start:29,end:55,caption:'The TypeScript service holds the scope instance and six handles.'},
        {key:'head:exports',find:'export { TurnScopedCacheScope',span:1,caption:'The package exposes the class and cache type.'},
        {key:'head:spec',find:'### A language backend holds only language-specific logic',span:12,caption:'Stated ownership reason in the architecture spec.'}
      ]
    },
    {
      id: 'six', title: 'Keep six independent compartments', short: 'Six handles', status: 'stated',
      summary: 'Five handles keep promises under formatted symbol identities; a sixth keeps location arrays under file:position keys. Keys, value types, and exact cached identities stay separate. Callers and references still share reference-location work.',
      reason: 'The PR chooses six handles over a shared map because the queries have independent key and value spaces.',
      before: 'Six independently typed Maps; identity-based queries and position-based lookup have different key/value contracts.',
      after: 'Six independently typed handles with the same key/value contracts; each handle contains its own Map.',
      choice: 'One lifetime owner does not imply one namespace.',
      steps: [
        ['Five identity handles', 'Definitions, reference locations, call targets, callers, and callees use formatSymbolIdentity(identity). Each stores its original promise.'],
        ['One position handle', 'Definition locations use `${relativePath}:${node.getStart()}` and store a readonly location array.'],
        ['Sharing within the right compartment', 'findCallers and findReferences both use referenceLocations; they do not merge all query caches.'],
        ['Identity boundary', 'A handle returns its exact cached value. Outer async projections are not a promise-identity contract; position and reference projections are covered in 08.']
      ],
      table: {heads:['Handle','Key','Stored value'],rows:[['definitions','symbol identity','Promise<overview nodes>'],['references','symbol identity','Promise<reference locations>'],['call targets','symbol identity','Promise<resolution>'],['callers','symbol identity','Promise<call edges>'],['callees','symbol identity','Promise<call edges>'],['position definitions','file:start','semantic locations[]']]},
      evidence: [
        {key:'head:service',start:29,end:55,caption:'All six types are preserved in distinct handles.'},
        {key:'head:service',start:108,end:114,caption:'Caller computation reuses the reference-location cache.'},
        {key:'head:service-tests',start:43,end:58,caption:'The characterization checks exact service-level promise identities.'},
        {key:'pr',find:'- Chose one scope with six handles',span:1,caption:'Stated reason, including the alternative the author named.'}
      ]
    },
    {
      id: 'presence', title: 'An undefined value still occupies a key', short: 'Presence', status: 'stated',
      summary: 'The generic handle tests membership with Map.has, then returns Map.get. A stored undefined is a hit. The factory runs only when the key is absent; the TypeScript cache value types themselves are unchanged.',
      reason: 'The PR says undefined is a valid cached value, so truthiness cannot decide whether a key exists.',
      before: 'TypeScript query methods use truthy Map.get checks for their existing promise and array value types.',
      after: 'The generic core handle uses Map.has before Map.get, including for a handle whose value type permits undefined.',
      choice: 'Define emptiness by absent key, not by the returned value.',
      steps: [
        ['Lookup', 'Ask values.has(key). This is the sole cache-hit predicate.'],
        ['Hit', 'Return values.get(key), cast to Value. Do not call the factory.'],
        ['Miss', 'Call the factory synchronously, store exactly what it returned, and return that same value.'],
        ['Repeated undefined', 'The test calls the same undefined factory twice through one key and expects one factory call.']
      ],
      table: {heads:['Stored state','has(key)','Outcome'],rows:[['no entry','false','run factory'],['undefined','true','reuse undefined'],['empty array','true','reuse array'],['promise','true','reuse promise']]},
      evidence: [
        {key:'head:scope',start:12,end:19,caption:'Membership, synchronous creation, exact storage.'},
        {key:'head:scope-tests',start:6,end:24,caption:'A valid undefined is reused; separate handles stay isolated.'},
        {key:'pr',find:'- Chose `Map.has`',span:1,caption:'Stated reason.'}
      ]
    },
    {
      id: 'failure', title: 'A rejected promise sticks; a thrown factory retries', short: 'Failure identity', status: 'stated',
      summary: 'The handle stores returned promises without wrapping or awaiting them, including later rejection. A synchronous throw happens before storage and retries next time. Query observers remain inside cache-fill factories and run on attempted fills, not hits.',
      reason: 'The PR explicitly requires preserving promise/value identities and failure behavior for the query algorithms.',
      before: 'Each query performs work before Map.set. Returned promises are cached; a synchronous throw never reaches storage.',
      after: 'getOrCreate preserves that order and exact value identity. It does not add catch, await, retry policy, or promise wrapping.',
      choice: 'Preserve the difference between returning a failing promise and throwing before returning any value.',
      steps: [
        ['Asynchronous failure', 'createValue returns promise P. The handle stores P now; later rejection does not evict P.'],
        ['Synchronous failure', 'createValue throws. The assignment and Map.set are never reached, so the next lookup tries again.'],
        ['TypeScript reference discovery', 'findReferenceLocations is evaluated before Promise.resolve receives its result. It can throw before a cache value exists.'],
        ['Observer calls', 'definitionSearch, referenceSearch, and callTargetResolution remain inside the fill factory. A repeated synchronous failure therefore repeats its observer call.']
      ],
      evidence: [
        {key:'head:scope',start:14,end:19,caption:'The factory precedes storage; there is no promise transformation.'},
        {key:'head:service',start:163,end:170,caption:'Synchronous reference discovery is evaluated before Promise.resolve.'},
        {key:'head:scope-tests',start:63,end:72,caption:'Rejected promise retained; synchronous throwing factory called twice.'},
        {key:'head:service-tests',start:113,end:132,caption:'The reference search and its observer repeat on synchronous failure.'},
        {key:'pr',find:'assigns turn-scoped semantic-cache lifetime',span:1,caption:'Stated preservation constraint.'}
      ]
    },
    {
      id: 'refresh', title: 'Success, not refresh entry, begins a turn', short: 'Turn boundary', status: 'stated',
      summary: 'The backend starts a cache turn only after refresh succeeds: source cache first, graph refresh for workspace coverage, then state refresh. Selection skips graph refresh. Failure keeps the previous semantic-cache turn. That order already existed; it does not promise whole-system rollback.',
      reason: 'The PR says failed refresh must preserve the current successful turn, rather than clearing caches at refresh entry.',
      before: 'Refresh source cache; optionally await project graph; await state; call semantic beginTurn(snapshot).',
      after: 'The same ordering, ending with beginTurn(snapshot.files). The scope clears only when that final call is reached.',
      choice: 'Keep the cache boundary after the successful refresh sequence.',
      steps: [
        ['Source and graph first', 'The source cache refreshes first. Workspace coverage then awaits project-graph refresh; selection coverage skips that graph call.'],
        ['Await state', 'The backend awaits state.refresh with the snapshot files and coverage.'],
        ['Success path', 'Only then does semantic beginTurn store the files and synchronously clear every handle through the scope.'],
        ['Failure path', 'A rejection before beginTurn skips the semantic-cache reset. The test observes one definition search across a failed state refresh; it does not establish rollback for every other state owner.']
      ],
      evidence: [
        {key:'base:backend',start:79,end:85,caption:'The successful-refresh ordering predates this PR.'},
        {key:'head:backend',start:79,end:85,caption:'The call now passes only the files; its placement stays the same.'},
        {key:'head:service-tests',start:152,end:161,caption:'The failed state refresh preserves the already-computed definition value.'},
        {key:'pr',find:'- Chose to begin the next turn',span:1,caption:'Stated reason for retaining this boundary.'}
      ]
    },
    {
      id: 'clear', title: 'Erase entries before project release can settle', short: 'Clear first', status: 'stated',
      summary: 'Release synchronously empties all six caches, then starts and awaits project release. Old cached entries are unavailable while release is pending or rejecting. Clearing does not block new queries: a query may refill a cache during the wait.',
      reason: 'The PR says released semantics must be unavailable while project release is pending or rejecting.',
      before: 'The service manually clears all six Maps before starting project release, without awaiting it.',
      after: 'The service clears through core first, then awaits project release. The clear-before-release order is retained; waiting is the separate change in 07.',
      choice: 'Clear immediately, rather than after asynchronous project release finishes.',
      steps: [
        ['Synchronous edge', 'Calling the async service release enters its body immediately and calls cacheScope.releaseTransientResources.'],
        ['One sweep', 'Core iterates registered handles and calls clear on each Map before any project release await.'],
        ['Then wait', 'The service invokes optional project release and awaits its result. Clearing has already occurred if that promise is pending or rejects.'],
        ['During the wait', 'The new test queries again before project release settles and gets a newly computed result. Clear is not an admission gate; the reusable-handle contract is described in 10.']
      ],
      evidence: [
        {key:'base:service',start:125,end:128,caption:'The original service also cleared before starting release.'},
        {key:'head:service',start:129,end:132,caption:'Core clears before the first await.'},
        {key:'head:scope',start:35,end:45,caption:'Turn and release use the same synchronous sweep.'},
        {key:'head:service-tests',start:195,end:216,caption:'The test refills while release remains pending, then observes the rejection.'},
        {key:'pr',find:'- Chose synchronous cache clearing',span:1,caption:'Stated reason.'}
      ]
    },
    {
      id: 'await', title: 'Move completion to the far side of project release', short: 'Awaited release', status: 'unexplained',
      summary: 'Backend release now waits for project release and propagates its rejection; previously it could resolve while project release was pending. The PR names this API change while also claiming failure behavior is preserved. It gives no reason reconciling those two claims.',
      reason: 'An awaited backend barrier is documented, but no rationale was found for this caller-observable timing/rejection change within a preservation-only refactor.',
      before: 'The exported service returns void after starting project release. The backend async method calls it without await and can resolve independently.',
      after: 'The service returns Promise<void> and awaits projects. The backend awaits the service, so its promise stays pending and carries project failure.',
      choice: 'Extend the caller-visible completion boundary through the asynchronous release chain.',
      steps: [
        ['Caller → backend', 'The backend was already async. Its body now awaits semanticQueries.releaseTransientResources.'],
        ['Backend → service → graph', 'The service becomes async and awaits the optional project graph release after synchronous cache clearing.'],
        ['Pending graph', 'The backend release promise is still pending. The new test records releaseSettled === false.'],
        ['Rejected graph', 'The rejection travels back to the backend promise. This is an explicitly shipped difference, not a correctness verdict or an invented justification.']
      ],
      evidence: [
        {key:'base:backend',start:87,end:89,caption:'Before: the async backend does not join project release.'},
        {key:'base:service',start:125,end:128,caption:'Before: the exported service starts project release and returns void.'},
        {key:'head:backend',start:87,end:89,caption:'After: the backend awaits the service.'},
        {key:'head:service',start:129,end:132,caption:'After: the service awaits the project graph.'},
        {key:'head:service-tests',start:207,end:216,caption:'Pending completion and propagated rejection are explicit new expectations.'},
        {key:'pr',find:'Changed on exported',span:10,caption:'The PR discloses the changed release return type.'},
        {key:'pr',find:'assigns turn-scoped semantic-cache lifetime',span:1,caption:'The same PR context claims failure behavior is preserved.'}
      ]
    },
    {
      id: 'projection', title: 'Cache locations; project nodes on every access', short: 'Projection', status: 'stated',
      summary: 'Position lookup still caches locations, including empty results, then rehydrates nodes each access. Its returned array is fresh even when the node object is reused. Public reference results are also projected from cached locations; cache identity is not every returned array’s identity.',
      reason: 'The PR requires preserving all query algorithms and value identities; the characterization commit explicitly records these existing contracts.',
      before: 'definitionNodesOf caches file/start/kind locations and projects nodes afterward. findReferences projects cached reference locations.',
      after: 'Only the location-cache get/create plumbing changes. The node and reference projection code remains outside the cached factory.',
      choice: 'Retain reusable locations as the cached value, with node rehydration and result projection at access time.',
      steps: [
        ['Fill once per position', 'For an identifier or private identifier with a relative path, discovery records each definition’s file, start, and syntax kind. Empty locations are cached too.'],
        ['Rehydrate every access', 'Outside getOrCreate, each location is resolved through a project source file or workspace node lookup, matching start and kind.'],
        ['Two identities', 'The characterization expects different returned arrays but the same first node object. That is consistent with caching locations.'],
        ['Reference projection too', 'findReferences awaits cached referenceLocations, then computes its result array. The promise and value identity contract belongs to the stored value, not to every outer wrapper.']
      ],
      evidence: [
        {key:'head:service',start:134,end:160,caption:'Cached location discovery ends before per-access rehydration begins.'},
        {key:'head:service',start:219,end:230,caption:'Rehydration matches semantic location, with workspace fallback.'},
        {key:'head:service-tests',start:83,end:92,caption:'Different arrays, same node, and only one discovery per queried position.'},
        {key:'head:service',start:80,end:90,caption:'Reference results are also projected after reading the cache.'},
        {key:'commits',start:1,end:1,caption:'The author names characterization as a distinct commit.'}
      ]
    },
    {
      id: 'files', title: 'Pass the file list instead of the snapshot', short: 'Input contract', status: 'unexplained',
      summary: 'The exported semantic service’s beginTurn changes from WorkspaceSnapshot to readonly WorkspaceFile[]. The backend now passes snapshot.files. The service still assigns its file list before clearing caches; a specific reason for narrowing the API was not found.',
      reason: 'The PR lists the new signature under Public surface, but gives no rationale for the narrower input contract.',
      before: 'beginTurn(snapshot: WorkspaceSnapshot) extracts snapshot.files internally.',
      after: 'beginTurn(files: readonly WorkspaceFile[]) takes that list directly; the backend performs the extraction at the call site.',
      choice: 'Narrow the service input while preserving assignment-before-clear order.',
      steps: [
        ['Public input', 'The service imports WorkspaceFile instead of WorkspaceSnapshot. Its files field is a readonly WorkspaceFile array.'],
        ['Composition at the caller', 'TypeScriptBackend passes request.snapshot.files to beginTurn after refresh succeeds.'],
        ['Within beginTurn', 'The service first assigns this.files, then asks the cache scope to begin the new turn.'],
        ['Reason boundary', 'The shipped signature is explicit. Treating it as “decoupling” or “less knowledge” would be an interpretation; the author does not give that reason.']
      ],
      evidence: [
        {key:'base:service',start:49,end:52,caption:'Before: the service receives the full snapshot.'},
        {key:'head:service',start:63,end:66,caption:'After: it receives files and preserves ordering.'},
        {key:'head:backend',start:82,end:84,caption:'The backend now extracts the file list.'},
        {key:'pr',find:'// before: beginTurn',span:2,caption:'Documented API change, without a stated reason.'}
      ]
    },
    {
      id: 'handles', title: 'Keep handles alive; clear their entries', short: 'Lifetime API', status: 'unexplained',
      summary: 'Core exports a scope and getOrCreate-only handle interface; the scope clears Maps in place. Handles, their registration list, and the service’s file list survive release. Handles can refill afterward, with no public dispose, per-key eviction, cancellation, or active-turn gate.',
      reason: 'The public surface is documented and reuse is tested. No specific rationale was found for this minimal handle surface and its non-terminal release semantics.',
      before: 'The TypeScript service retains six Maps across turns and clears entries manually.',
      after: 'The new core scope retains registered handles; beginTurn and releaseTransientResources both call the same private clear loop.',
      choice: 'Separate lookup capability from lifetime capability, with release emptying reusable containers.',
      steps: [
        ['Two public capabilities', 'TurnScopedCache exposes only getOrCreate. TurnScopedCacheScope exposes createCache, beginTurn, and releaseTransientResources.'],
        ['Registration survives', 'createCache appends a handle to an array. clear walks that array; it does not replace or empty the registry.'],
        ['Entries do not survive', 'Each handle invokes Map.clear. The same handle can compute a new value afterward, including after repeated release calls.'],
        ['Scope of release', 'There is no state check, cancellation, disposal, or per-key eviction method in this public API. The service retains its files field; release is not destruction of the service.']
      ],
      evidence: [
        {key:'head:scope',start:1,end:7,caption:'The public handle interface omits lifetime operations.'},
        {key:'head:scope',start:21,end:46,caption:'Maps and handles are retained while entries are cleared.'},
        {key:'head:scope-tests',start:27,end:49,caption:'The same handles refill after both turn reset and repeated release.'},
        {key:'head:service',start:129,end:132,caption:'The service release does not clear its files field.'},
        {key:'pr',find:'Added to `@symnav/core`',span:13,caption:'The deliberately small API is documented; its specific rationale is not.'}
      ]
    },
    {
      id: 'settlement', title: 'Late settlement cannot repopulate the next turn', short: 'Old promises', status: 'stated',
      summary: 'Clearing drops the cache’s reference to an old promise; it does not cancel that promise or revoke values already held by callers. An old promise may settle later, but cannot replace a newer entry: the cache installs no settlement callback that writes back.',
      reason: 'The PR’s preservation constraint keeps exact promises and their failure behavior. The new core test explicitly preserves old settlement without replacing a new-turn entry.',
      before: 'The TypeScript Maps hold promises directly and clear entries at lifecycle boundaries, without settlement writeback.',
      after: 'The generic handle also stores the returned promise directly. Map.clear removes its entry while existing holders keep their promise.',
      choice: 'Keep the cached unit as the original promise, rather than installing an asynchronous result back into the cache.',
      steps: [
        ['Turn A', 'A handle stores oldPromise at key. A caller retains that promise.'],
        ['Begin turn B', 'clear removes the entry; the same handle stores newPromise under the same key.'],
        ['Old work completes', 'The caller can still observe oldPromise settling to old. Clearing was not cancellation.'],
        ['Read turn B', 'The cache still returns the new-turn entry. getOrCreate has no then/catch handler that could write an old settlement back.']
      ],
      evidence: [
        {key:'head:scope',start:14,end:23,caption:'Direct value storage and Map.clear; no settlement writeback.'},
        {key:'head:scope-tests',start:75,end:90,caption:'The old promise settles, while the key still resolves to the new value.'},
        {key:'pr',find:'assigns turn-scoped semantic-cache lifetime',span:1,caption:'Stated promise/value preservation constraint.'}
      ]
    },
    {
      id: 'tests', title: 'Characterize the extraction without replacing old tests', short: 'Test choices', status: 'stated',
      summary: 'The patch adds six service tests and four core tests. All five existing service tests and their helpers remain byte-for-byte unchanged. The additions cover identities, projections, failures, boundaries, and late settlement. No deleted or weakened existing assertion, or separate unrelated feature, was found in this six-file diff.',
      reason: 'The commits name characterization and lifecycle specification; the PR says tests lock identity, error, and clearing contracts while the algorithms are preserved.',
      before: 'Five service tests cover shared reference work, next-turn clearing, position reuse, graph traversal reuse, and rebuilding after release.',
      after: 'Those tests remain intact. Six more service tests characterize the contracts; four new core tests specify the reusable cache primitive.',
      choice: 'Add tests around existing semantics and the new ownership boundary; the new awaited-release expectation is separately surfaced in 07.',
      steps: [
        ['Existing service tests', 'The complete source tail from the first original test through all helpers matches base exactly. No original assertion is edited.'],
        ['Six added service tests', 'Promise identity; empty-position rehydration; asynchronous failure retention; synchronous failure retry; failed-refresh retention; awaited release.'],
        ['Four new core tests', 'Exact values and isolated handles; clearing and reuse; promise-versus-throw behavior; old settlement after a new turn.'],
        ['What this comparison establishes', 'A diff inventory, not end-to-end behavior parity. The awaited-release contract is an added expectation, not an explanation for its change.']
      ],
      table: {heads:['Test group','Before','After'],rows:[['service, existing','5','5 unchanged'],['service, added','0','6'],['core cache scope','0','4'],['existing assertions removed','—','0']]},
      evidence: [
        {key:'commits',start:1,end:6,caption:'Author-recorded characterization, contract, and implementation commits.'},
        {key:'head:service-tests',start:29,end:29,caption:'One of six added service tests; all six names are in the inventory below.'},
        {key:'head:scope-tests',start:5,end:9,caption:'New core suite; all four names are in the inventory below.'},
        {key:'pr',find:'locks identity, error, and clearing contracts',span:1,caption:'Stated purpose of the core test file.'}
      ]
    }
  ]
};
