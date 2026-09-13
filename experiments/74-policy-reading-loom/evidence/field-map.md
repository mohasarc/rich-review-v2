# Curated field routes

This is an authored grouping of selected implementations, not an AST reference census. All code remains in apps/cli; slices come from the existing daemon package. effectiveMemoryBytes stays in derivation and is not drawn as a consumer leaf. Each cell has exact source receipts in model.json and in the inspector.

| Leaf | Default | Purpose color | Drawn families | Forwarding within those families |
| --- | --- | --- | --- | --- |
| output.maximumChunkRawBytes | 64 KiB | capacity | capture, spool, socket, worker, host | host |
| output.inlineRawBytes | 256 KiB | capacity | capture, spool, socket, host | socket, host |
| output.maximumResultRawBytes | 256 MiB | capacity | capture, spool, socket, host | socket, host |
| output.maximumAggregateSpoolRawBytes | 512 MiB | capacity | spool, host | host |
| transport.singleResponseTimeoutMs | 250 ms | time | socket | none |
| transport.statusResponseTimeoutMs | 100 ms | time | socket | none |
| transport.executionAdmissionTimeoutMs | 5 s | time | socket | none |
| transport.maximumJsonPayloadBytes | 8 MiB | capacity | socket | none |
| transport.maximumExecutionControlPayloadBytes | 256 KiB | capacity | socket | none |
| delivery.postAcceptanceExecutionReattachmentLimit | 1 | recovery | socket | none |
| delivery.resultTransferResumeLimitPerExecutionAttempt | 1 | recovery | socket | none |
| startup.coordinationGraceMs | 15 s | time | control, host | none |
| startup.heartbeatIntervalMs | 100 ms | time | host | none |
| startup.authorizationPollIntervalMs | 10 ms | time | host | none |
| startup.observationPollIntervalMs | 20 ms | time | control | none |
| startup.previousInstanceTerminationTimeoutMs | 5 min | time | control | none |
| startup.childFailureRetryLimit | 1 | recovery | control | none |
| shutdown.idleTimeoutMs | 30 min | time | host | none |
| shutdown.stopTimeoutMs | 5 s | time | control | none |
| shutdown.forcedTerminationReserveMaximumMs | 500 ms | time | control | none |
| shutdown.controllerPollIntervalMs | 20 ms | time | control | none |
| shutdown.processSignalExitTimeoutMs | 500 ms | time | control | none |
| shutdown.processExitPollIntervalMs | 20 ms | time | control | none |
| shutdown.resourceDrainAcknowledgementGraceMs | 250 ms | time | host | none |
| shutdown.resourceDrainAcknowledgementPollIntervalMs | 5 ms | time | host | none |
| resources.hardProcessRssBytes | derived | memory | host | none |
| resources.softProcessRssBytes | derived | memory | host | none |
| resources.resumeProcessRssBytes | derived | memory | host | none |
| resources.workerMaxOldGenerationSizeMiB | derived | memory | host | none |
| resources.supervisionIntervalMs | 250 ms | time | host | none |
| resources.replacementWindowMs | 10 min | time | host | none |
| resources.replacementLimit | 2 | recovery | host | none |
| resources.workerHeapSampleIntervalMs | 25 ms | time | worker | none |
| diagnostics.logRotateBytes | 10 MiB | capacity | logs, host | host |
| diagnostics.logBackupCount | 4 | capacity | logs, host | host |
| diagnostics.maximumQueuedEvents | 1,024 | capacity | logs, host | host |
| diagnostics.disconnectedTraceRetentionMs | 5 min | time | host | none |
| diagnostics.maximumDisconnectedTraces | 1,024 | capacity | host | none |
