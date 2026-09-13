window.REVIEW = {
  groups: [
    { id: 'cut', number: '01', title: 'Cut coordination, keep the owners', color: 'slate', ids: ['owners', 'ports', 'sequence'] },
    { id: 'identity', number: '02', title: 'One acceptance, many connections', color: 'teal', ids: ['identity', 'duplicate', 'authentication'] },
    { id: 'handles', number: '03', title: 'Lend handles across the cut', color: 'ochre', ids: ['writer', 'trace'] },
    { id: 'turn', number: '04', title: 'Keep the waits inside the turn', color: 'teal', ids: ['barrier', 'sample', 'failure', 'lifecycle'] },
    { id: 'tail', number: '05', title: 'Keep the result after the work', color: 'ochre', ids: ['fetch', 'ack', 'shutdown'] },
    { id: 'audit', number: '06', title: 'Account for the edits around the move', color: 'rust', ids: ['clock', 'predicate', 'tests', 'test-access'] }
  ],
  decisions: [
    {
      id: 'owners', title: 'Two coordinators; the same process and package.', status: 'stated',
      summary: '#146 extracts delivery and trace coordination. #147 extracts acceptance and FIFO execution. Both still live in apps/cli/src/daemon; CLI and protocol surfaces stay put.',
      reason: 'Attachment, transfer, acknowledgement and trace lifecycles form one boundary; existing mechanisms retain their owners.',
      detail: 'WorkspaceDaemon constructs both sessions. Delivery controls connections, result transfers and retained traces. Accepted execution coordinates ledger transitions, one queue turn, worker output, resources and lifetime signals. The shell still authenticates, decides admission and orchestrates process shutdown. These are module boundaries within the daemon process.',
      flow: [['WorkspaceDaemon', 'composition · authentication · admission · shutdown'], ['AcceptedExecutionSession', 'acceptance → worker turn → delivery wait'], ['DaemonDeliverySession', 'attachments → transfer → acknowledgement · traces']],
      refs: [['146/pr.md', 109, 113, 'Delivery boundary: author’s reasons'], ['147/pr.md', 78, 86, 'Execution boundary: author’s reasons'], ['147/workspace-daemon.ts', 181, 216, 'Both sessions wired in the shell']]
    },
    {
      id: 'ports', title: 'Share authoritative owners through selected ports.', status: 'stated',
      summary: 'The ledger owns request state; the spool store owns bytes; the queue owns FIFO order. Only some dependencies have small interfaces; several still use concrete class types.',
      reason: 'The author explicitly keeps each mechanism authoritative instead of moving its state into either session.',
      detail: 'Delivery’s AcceptedExecutionJournal can read, subscribe, invalidate a completion, acknowledge it and terminate delivery. It cannot accept or start work. Execution’s AcceptedExecutionDelivery exposes only a trace factory, a writer factory and a tracked promise. Its lifecycle and lifetime ports are small too. Options still name concrete AcceptedRequestLedger, WorkspaceRequestQueue, DaemonWorkerGenerationManager, DaemonResourceSupervisor and DaemonCompletionSpoolStore types.',
      flow: [['Execution → ledger', 'accept · markRunning · complete · fail'], ['Delivery → same ledger', 'subscribe · invalidate · acknowledge · terminateDelivery'], ['Delivery → spool store', 'create · open · clean up']],
      refs: [['146/daemon-delivery-session.ts', 48, 82, 'Journal port and concrete spool dependency'], ['147/accepted-execution-session-contracts.ts', 33, 69, 'Delivery, lifetime, lifecycle and owner dependencies'], ['147/pr.md', 83, 84, 'Why the dependencies retain ownership']]
    },
    {
      id: 'sequence', title: 'Delivery lands first; the reason for two PRs is unstated.', status: 'unexplained',
      summary: '#147 consumes the writer, trace and barrier surface introduced by #146. The order is documented; no comparison with a combined or reversed split was found.',
      reason: 'The bodies say “delivery before accepted execution.” They do not explain why this exact review boundary was chosen.',
      detail: 'The source dependency makes the actual sequence legible: after #146, execution remains in WorkspaceDaemon and already uses the delivery session. #147 moves that caller and adds an AcceptedExecutionDelivery interface. The delivery implementation has no production edit in #147. Its tests do change to read acceptance metadata from the new ledger-entry location. That is an observed dependency, not proof that this was the only possible ordering.',
      flow: [['Before #146', 'execution and delivery in WorkspaceDaemon'], ['#146 · f79ba362', 'delivery extracted; old execution calls it'], ['#147 · ba53c8e1', 'caller extracted; delivery source unchanged']],
      refs: [['146/pr.md', 1, 3, 'Sequence stated in #146'], ['147/pr.md', 1, 3, 'Sequence stated in #147'], ['146/workspace-daemon.ts', 539, 585, 'Intermediate caller already uses delivery'], ['147/diff.patch', 699, 790, 'Ledger metadata crosses into delivery tests']]
    },
    {
      id: 'identity', title: 'Acceptance metadata moves from a shell map to the ledger.', status: 'stated',
      summary: 'acceptedAt and the original queuePosition survive queued, running, terminal and acknowledged states. Navigation activity is sampled separately.',
      reason: 'Every state shares one original acceptance identity; a parallel process map duplicated that ownership.',
      detail: 'Previously queued state held both fields, running state kept acceptedAt, and WorkspaceDaemon retained a separate acceptances map for later attachments. #147 lifts the two fields onto AcceptedRequestEntry and deletes the shell map. queuePosition is the nonterminal request count at acceptance, not a live position. The clock test distinguishes acceptedAt = 1234 from lastNavigationAt = 1235; a duplicate consumes neither again.',
      flow: [['Before', 'queued state + shell acceptances map'], ['After', 'one ledger entry: acceptedAt · queuePosition'], ['Each attachment', 'the original acceptance envelope']],
      refs: [['before/accepted-request-ledger.ts', 11, 30, 'Original state shape'], ['147/accepted-request-ledger.ts', 11, 30, 'Fields on the entry'], ['147/accepted-request-ledger.ts', 69, 92, 'Original acceptance values'], ['147/accepted-execution-session.test.ts', 18, 35, 'Two separate wall-clock observations'], ['147/pr.md', 82, 82, 'Author’s reason']]
    },
    {
      id: 'duplicate', title: 'A matching duplicate attaches; it does not run again.', status: 'stated',
      summary: 'The shell passes the same acceptance envelope to delivery. Execution adds no trace, queue turn, clock read or lifetime reset for an existing matching request.',
      reason: 'Request identity stays idempotent for the lifetime of this daemon.',
      detail: 'AcceptedExecutionSession asks the ledger for the existing identity and returns early when it exists. The ledger still rejects a conflicting fingerprint. The shell attaches the returned requestId, acceptedAt and queuePosition to the connection. This holds whether the result is pending or terminal; after acknowledgement the ledger keeps the identity even though the completion bytes may have been removed.',
      flow: [['Connection 1', 'request A → new acceptance → one queued turn'], ['Connection 2', 'same request A → existing acceptance'], ['Delivery', 'one result, an attachment for each connection']],
      refs: [['147/accepted-execution-session.ts', 44, 70, 'Early return before execution side effects'], ['147/workspace-daemon.ts', 470, 487, 'Shell bridges acceptance to attachment'], ['147/accepted-request-ledger.ts', 69, 92, 'Fingerprint and existing identity'], ['147/pr.md', 86, 86, 'Author’s reason']]
    },
    {
      id: 'authentication', title: 'The shell authenticates; the “Authenticated” aliases add no check.', status: 'unexplained',
      summary: 'Both sessions receive requests already checked by the shell. Their new Authenticated… types are aliases of the original request types, without a type-level proof.',
      reason: 'No reason was found for choosing aliases over another way to express the caller’s authentication responsibility.',
      detail: 'WorkspaceDaemon verifies protocol and instance, then checks process tokens for fetch/ack/status and execution admission before delegating. The new aliases do not transform, brand or revalidate values. The existing runtime boundary remains in the shell; this is a naming decision in the extracted contracts, not a new authentication mechanism.',
      flow: [['Client request', 'protocol · instance · process token'], ['WorkspaceDaemon', 'checks before delegation'], ['Session', 'receives a structurally unchanged request']],
      refs: [['147/workspace-daemon.ts', 353, 383, 'Shell fetch and acknowledgement guards'], ['147/workspace-daemon.ts', 470, 518, 'Shell execution admission'], ['147/accepted-execution-session-contracts.ts', 16, 16, 'Execution alias'], ['146/daemon-delivery-session.ts', 67, 68, 'Delivery aliases']]
    },
    {
      id: 'writer', title: 'Execution borrows a writer; delivery wraps the spool timing.', status: 'stated',
      summary: 'The writer crosses to the worker for ordered byte appends, then execution finishes or disposes it. The spool store remains the owner of completion bytes.',
      reason: 'The author keeps completion bytes in their existing owner and coordinates their lifecycle through delivery.',
      detail: 'createCompletion creates a spool and returns ObservedDaemonCompletionWriter. append and dispose delegate to the spool; finish measures monotonic time, obtains the manifest, and reports spooling through the retained trace. The worker receives the output sink through execution. Execution awaits finish before publishing a completed ledger entry, so delivery begins from a finished result.',
      flow: [['Delivery → execution', 'createCompletion(requestId) → writer'], ['Execution → worker', 'writer.append(sequence, stream, bytes)'], ['Execution → writer', 'finish(exitCode) · dispose() on failure']],
      refs: [['146/daemon-delivery-session.ts', 35, 39, 'Writer contract'], ['146/daemon-delivery-session.ts', 114, 121, 'Writer factory'], ['146/daemon-delivery-session.ts', 494, 516, 'Spool wrapper and timing'], ['147/accepted-execution-session.ts', 108, 139, 'Output sink, finish, then publication'], ['146/pr.md', 109, 110, 'Coordination and existing data owner']]
    },
    {
      id: 'trace', title: 'Delivery owns retention; execution gets a fenced trace handle.', status: 'stated',
      summary: 'Late events stop when the trace expires or is evicted. Only disconnected traces are bounded; attachments are counted, and terminal delivery is recorded once in the ledger.',
      reason: 'Evicted or expired traces must ignore late diagnostics even when execution still holds a handle.',
      detail: 'The handle forwards only while the retained map still points to that same trace. Delivery counts open attachments, starts a retention timer when the last one closes, cancels it on reattachment and evicts the oldest disconnected trace over capacity. Configured capacity is clamped to at least one. Expiry drops detailed trace state, not the ledger identity or result bytes. The journal’s terminateDelivery guard keeps terminal accounting once per request.',
      flow: [['Execution holds', 'turnStarted · workerCompleted · executionTerminated'], ['Delivery retains', 'trace identity · connection count · expiry timer'], ['After expiry / eviction', 'old handle stops forwarding; result may remain']],
      refs: [['146/daemon-delivery-session.ts', 366, 451, 'Connection counts, retention and terminal guard'], ['146/daemon-delivery-session.ts', 455, 492, 'Identity-fenced handle'], ['146/daemon-delivery-session.test.ts', 359, 405, 'Disconnected-only bounds'], ['146/pr.md', 112, 112, 'Author’s reason']]
    },
    {
      id: 'barrier', title: 'The current delivery promise holds the FIFO turn.', status: 'stated',
      summary: 'Execution captures the latest tracked stream’s promise after ledger publication. It waits for that stream, not all attachments or a normal ACK; later fetches do not retarget the wait. A caught send failure also settles it.',
      reason: 'Queue completion must wait for the current stream without creating another request registry.',
      detail: 'For attachments subscribed before publication, each completion callback installs a promise under requestId; the last callback’s promise is the one returned by trackedCompletion. Execution looks it up once immediately after ledger.complete publishes. An older promise cannot delete a newer one. A send error is caught and recorded by delivery, so settlement releases the turn’s delivery wait. A later fetch or already-completed attachment streams directly; it does not continually retarget an already-awaited promise.',
      flow: [['Execution → ledger', 'complete(A) publishes to subscribers'], ['Delivery → execution', 'trackedCompletion(A) returns current promise'], ['Execution turn', 'await that promise, then boundary work']],
      refs: [['146/daemon-delivery-session.ts', 133, 170, 'Attach paths and tracked getter'], ['146/daemon-delivery-session.ts', 281, 295, 'Latest promise and guarded cleanup'], ['147/accepted-execution-session.ts', 130, 146, 'Publish then await'], ['146/workspace-daemon-requests.test.ts', 489, 516, 'Process test: first end cannot release latest wait'], ['146/pr.md', 111, 111, 'Author’s reason']]
    },
    {
      id: 'sample', title: 'A resource sample gates the next turn after success or failure.', status: 'stated',
      summary: 'The session schedules sampling in the queued operation’s finally block. The existing queue runs boundary work ahead of the next request; idle is signalled afterwards.',
      reason: 'Sampling must gate the next FIFO turn after either outcome, rather than be scheduled too late by the process.',
      detail: 'This ordering is already present in the #146 shell and moves with the accepted turn. The session reports worker heap data, keeps navigation/completion timestamps for snapshots and forwards lifetime signals. scheduleTurnCompleteResourceSample requests the queue’s boundary slot; WorkspaceRequestQueue checks that slot before taking another request. Sampling failures go to diagnostics, and its finally handler signals idle only if the queue is idle.',
      flow: [['Current operation', 'worker → finished spool → publication → delivery wait'], ['finally → queue boundary', 'resourceSupervisor.sampleAtTurnBoundary()'], ['Next queued request', 'starts after boundary operation settles']],
      refs: [['147/accepted-execution-session.ts', 23, 31, 'Execution snapshot'], ['147/accepted-execution-session.ts', 143, 181, 'Finally block and resource sampling'], ['147/workspace-request-queue.ts', 106, 143, 'Queue selects boundary first'], ['147/pr.md', 85, 85, 'Author’s reason']]
    },
    {
      id: 'failure', title: 'Execution classifies failure; cleanup and sampling report diagnostics.', status: 'stated',
      summary: 'The session consumes active resource interruption state, consults shutdown state, disposes incomplete output, and fails the ledger through the existing failure vocabulary.',
      reason: 'The stated boundary preserves each mechanism and exposes only the process state needed for shutdown classification.',
      detail: 'The resource interruption set moves out of the shell. Worker-exit alone is not marked as a controlled resource interruption. Classification receives interruption, response capacity, worker-exit and shutdown inputs. Dispose failures are recorded without suppressing the ledger failure. Sampling is scheduled inside the queued operation’s finally; failure classification and disposal are in the outer catch, so the sample and failure handling must not be depicted as a single serial chain.',
      flow: [['Queued operation finally', 'schedule resource boundary work'], ['Outer catch', 'classify failure using resource + shutdown inputs'], ['Cleanup then ledger', 'dispose errors → diagnostic; ledger.fail(code)']],
      refs: [['147/accepted-execution-session.ts', 77, 81, 'Interruption ownership'], ['147/accepted-execution-session.ts', 143, 193, 'Catch, finally and diagnostics'], ['147/accepted-execution-session.test.ts', 94, 160, 'Classification and cleanup/sample diagnostic assertions'], ['147/pr.md', 83, 84, 'Owner and lifecycle rationale']]
    },
    {
      id: 'lifecycle', title: 'Workspace deletion crosses back to the process after delivery.', status: 'stated',
      summary: 'Execution checks workspace presence and later calls a narrow lifecycle port. The shell waits for ACKs or grace expiry and schedules shutdown; it retains shutdown ownership.',
      reason: 'Execution needs shutdown classification, workspace presence and the post-delivery deletion transition, not the whole process shell.',
      detail: 'The existence check follows spool finish and precedes ledger publication. If absent, execution waits for the tracked delivery and then awaits workspaceDeletedAfterDelivery. The shell’s implementation waits for unacknowledged completions within the grace window, then schedules forced workspace-deleted shutdown. This path adds an acknowledgement wait inside that execution turn. Normal successful turns only have the tracked delivery wait.',
      flow: [['Execution', 'finish → check workspace → publish → await delivery'], ['If workspace is absent', 'workspaceDeletedAfterDelivery()'], ['Shell', 'ACKs / grace → schedule shutdown']],
      refs: [['147/accepted-execution-session-contracts.ts', 50, 57, 'Narrow lifecycle port'], ['147/accepted-execution-session.ts', 130, 145, 'Existence check and callback order'], ['147/workspace-daemon.ts', 520, 529, 'Shell’s deletion transition'], ['147/pr.md', 84, 84, 'Author’s reason']]
    },
    {
      id: 'fetch', title: 'Resume retained records; a read failure can invalidate completion.', status: 'stated',
      summary: 'Delivery sends manifest → records from the requested offset → result-end. A spool read error disposes bytes and changes the completed journal entry to failed before sending failure.',
      reason: 'The architecture spec requires preserving output, lifecycle and failure behavior through the refactor.',
      detail: 'The split retains the existing transfer mechanism. A fetch bypasses accepted execution and reuses completion bytes. The requested offset is a record sequence, carried as both offset and sequence on each chunk. CompletionSpoolReadError is special: delivery reports a diagnostic, attempts disposal, invalidates the ledger completion to internal, then sends execution-failed. Other transfer errors propagate to the attachment/fetch caller or are caught by tracked delivery.',
      flow: [['Client → shell → delivery', 'result-fetch(requestId, offset)'], ['Spool → client', 'manifest → sequenced records → result-end'], ['Read failure → ledger', 'dispose → invalidateCompletion → failure frame']],
      refs: [['146/daemon-delivery-session.ts', 171, 187, 'Fetch path'], ['146/daemon-delivery-session.ts', 256, 330, 'Read failure and transfer order'], ['146/daemon-delivery-session.test.ts', 177, 252, 'Offset and state-before-failure assertions'], ['147/spec.md', 21, 33, 'Preserve behavior: stated reason']]
    },
    {
      id: 'ack', title: 'Validate transfer, attempt cleanup, then acknowledge logically.', status: 'stated',
      summary: 'A cleanup failure stays diagnostic and still permits protocol success. A mismatched transfer is rejected; ACK does not remove the ledger identity.',
      reason: 'Physical cleanup comes first, but cleanup failure must not withhold acknowledgement success.',
      detail: 'Delivery opens the completion and checks its transferId before any acknowledgement. It awaits spool.acknowledge, catches cleanup errors, then acknowledges the journal, completes the trace and returns result-acknowledged. The ledger maintains its separate acknowledged set and keeps the original entry. If cleanup removed the spool, another ACK fails the initial open instead of replaying acknowledgement.',
      flow: [['Validate', 'open spool · match transferId'], ['Physical cleanup attempt', 'success or diagnostic failure'], ['Logical acknowledgement', 'journal ACK → trace completion → protocol response']],
      refs: [['146/daemon-delivery-session.ts', 189, 208, 'Acknowledgement order'], ['146/daemon-delivery-session.test.ts', 254, 357, 'Identity, repeated ACK and gated cleanup'], ['147/accepted-request-ledger.ts', 166, 177, 'Identity retained, ACK stored separately'], ['146/pr.md', 113, 113, 'Author’s reason']]
    },
    {
      id: 'shutdown', title: 'The process orders drain, bounded ACK waiting, worker close and cleanup.', status: 'stated',
      summary: 'Delivery polls ACKs through policy grace and cleans spools/traces when asked. Graceful shutdown waits for worker close before spool cleanup; cleanup failure remains diagnostic.',
      reason: 'The spec preserves lifecycle behavior; the new process test explicitly pins worker-before-spool ordering.',
      detail: 'Graceful stop asks execution to drain, then delivery to wait for ACKs within the policy window. The process owns graceful/forced worker shutdown and closes the server before instance spool cleanup and retained-trace completion. Resource drain and workspace deletion also use bounded ACK waiting; forced shutdown can bypass the graceful route. The polling interval can carry an observation just past the deadline; this is a bounded polling policy, not an exact timer guarantee.',
      flow: [['Graceful stop', 'execution drain → ACKs or grace'], ['Process shutdown', 'worker close → server close'], ['Delivery cleanup', 'instance spools → retained traces → logger close']],
      refs: [['147/workspace-daemon.ts', 394, 398, 'Graceful stop route'], ['147/workspace-daemon.ts', 586, 626, 'Worker, server, spool and trace ordering'], ['146/daemon-delivery-session.ts', 210, 240, 'Bounded ACK wait and cleanup'], ['146/workspace-daemon-requests.test.ts', 720, 742, 'Worker-before-spool test'], ['147/spec.md', 21, 33, 'Preserve lifecycle: stated reason']]
    },
    {
      id: 'clock', title: '#146 changes clock providers at two delivery sites.', status: 'unexplained',
      summary: 'ACK polling changes Date.now → injected clock.wallNowMs; read-failure timestamps change shell now → delivery clock.wallNowMs. #147 explicitly bridges execution’s wall time back to shell now.',
      reason: 'The spec says the daemon owns its clock, but no specific rationale was found for these provider substitutions during this extraction.',
      detail: 'WorkspaceDaemon has separate options.now and options.clock injection paths. At #146 it passes the clock object to delivery, while the accepted ledger still receives this.now. The change is observable in source and relevant to callers with different injected providers. This page does not claim a production timing defect. #147 preserves the execution side’s existing wall provider with wallNowMs: this.now and forwards monotonic time from this.clock.',
      flow: [['Before #146', 'ACK deadline: Date.now · read failure: this.now'], ['After #146', 'both use delivery options.clock.wallNowMs'], ['After #147', 'execution wall clock remains shell this.now']],
      refs: [['before/workspace-daemon.ts', 755, 780, 'Old read-failure timestamp'], ['before/workspace-daemon.ts', 963, 974, 'Old ACK clock'], ['146/daemon-delivery-session.ts', 216, 230, 'New ACK clock'], ['146/daemon-delivery-session.ts', 271, 275, 'New read-failure clock'], ['147/workspace-daemon.ts', 193, 215, 'Execution’s explicit clock bridge'], ['147/spec.md', 235, 243, 'General clock ownership, not this substitution']]
    },
    {
      id: 'predicate', title: '#146 changes the disconnected-trace predicate and start order.', status: 'unexplained',
      summary: 'Reattachment now checks retained-trace/expiry state instead of just missing connections. Trace creation moves after navigation/lifetime signals, before attachment wiring.',
      reason: 'The body explains retention fencing, but gives no specific reason for this predicate and event-order rewrite.',
      detail: 'Previously the shell used absence from operationTraceConnections and guarded the execute reattachment path with “existing request.” The new session uses an expiry record, or a missing retained trace with delivery not terminal. Fresh trace creation prevents an initial attach from looking disconnected. Trace start also moves from the ledger/metadata block to after navigationAccepted. These are implementation decisions around the extraction; no behavior verdict is implied.',
      flow: [['Old detection', 'no connection entry; duplicate guard in shell'], ['New detection', 'expiry exists OR no retained trace and no delivery terminal'], ['New acceptance order', 'navigation signal → trace start → execute → attach']],
      refs: [['before/workspace-daemon.ts', 497, 525, 'Old creation, detection and attachment ordering'], ['146/workspace-daemon.ts', 471, 502, 'New accepted-trace call order'], ['146/daemon-delivery-session.ts', 123, 131, 'New attachment detection'], ['146/daemon-delivery-session.ts', 420, 431, 'New predicate'], ['146/pr.md', 112, 112, 'Stated fence rationale has a narrower scope']]
    },
    {
      id: 'tests', title: 'Add boundary tests; relocate the ledger expectations.', status: 'stated',
      summary: '#146 adds delivery tests plus two process ordering cases; #147 adds five session tests. Metadata assertions move with the fields; no deleted case or weakened behavioral expectation was found. Session order uses resolved stubs; process delivery uses gated sends. Tests were read, not run here.',
      reason: 'The bodies and test names explicitly aim to preserve transfer, retention, timing, duplicate and shutdown behavior.',
      detail: 'The removed acceptedAt assertion on running state is a representation change: acceptedAt moves to the ledger entry, and a new post-ACK assertion checks both acceptance fields there. Delivery test fixtures switch from entry.state fields to entry fields. Existing process behavior assertions remain. The #147 barrier test records calls through stubbed ports; the #146 process test actually gates result-end. These are different kinds of evidence, and this experiment read them without running symnav tests.',
      flow: [['#146', 'delivery cases + latest-stream process gate + shutdown gate'], ['#147', 'five session cases + ledger-entry metadata assertions'], ['Evidence boundary', 'test source inspected · no local symnav test run']],
      refs: [['147/accepted-request-ledger.test.ts', 38, 89, 'Metadata expectations before and after ACK'], ['147/accepted-execution-session.test.ts', 18, 160, 'Five new session tests'], ['146/workspace-daemon-requests.test.ts', 489, 516, 'Deferred send at process boundary'], ['147/diff.patch', 603, 834, 'Changed expectations and harnesses'], ['146/pr.md', 3, 3, 'Author-reported validation'], ['147/pr.md', 3, 3, 'Author-reported validation']]
    },
    {
      id: 'test-access', title: 'The process test harness follows private state into the sessions.', status: 'unexplained',
      summary: 'Tests reach deliverySession.operationTraces and acceptedExecutionSession.options.ledger through casts. They preserve observations by coupling to the new private layout.',
      reason: 'No reason was found for choosing these private casts over a different observation surface.',
      detail: 'In #146 the retained-trace-count helper follows the map into deliverySession. In #147 acceptedRequestCount follows the ledger into the session’s private options object, while closeAdmission delegates to session.drain. The bodies describe the extraction’s test intent but do not discuss this testing boundary. This is a test-design decision with its own evidence, not an architectural correctness finding.',
      flow: [['Before', 'test harness → shell private fields'], ['After #146', 'test harness → delivery session → trace map'], ['After #147', 'test harness → execution options → ledger']],
      refs: [['146/workspace-daemon-requests.test.ts', 2088, 2097, 'Trace-count private reach-through'], ['147/workspace-daemon-requests.test.ts', 1969, 1994, 'Ledger-count cast and drain delegation']]
    }
  ]
};
