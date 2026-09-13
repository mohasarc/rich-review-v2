# Patch coverage

The opening decision numbers correspond to `content.js`. This inventory maps all 60 changed paths to the explanation; it is not a correctness or coverage score. A file can serve several decisions. The full patch remains available in the source desk.

| Changed file | Opening decisions | Added / removed |
| --- | --- | --- |
| `apps/cli/src/cli-program-executor.test.ts` | 01, 04, 07, 10 | +57 / −6 |
| `apps/cli/src/cli-program-executor.ts` | 01, 04 | +3 / −2 |
| `apps/cli/src/command-execution-result.ts` | 04 | +20 / −15 |
| `apps/cli/src/commands/daemon/register-daemon-command.ts` | 01, 02, 06 | +21 / −5 |
| `apps/cli/src/daemon/completion-spool.test.ts` | 04, 07, 10 | +72 / −17 |
| `apps/cli/src/daemon/completion-spool.ts` | 04 | +15 / −18 |
| `apps/cli/src/daemon/daemon-command-dispatcher.integration.test.ts` | 01, 07, 10 | +2 / −2 |
| `apps/cli/src/daemon/daemon-command-dispatcher.ts` | 01 | +4 / −3 |
| `apps/cli/src/daemon/daemon-controller.test.ts` | 06, 07, 10 | +2 / −3 |
| `apps/cli/src/daemon/daemon-controller.ts` | 06 | +16 / −8 |
| `apps/cli/src/daemon/daemon-entry.ts` | 01, 05, 06 | +5 / −8 |
| `apps/cli/src/daemon/daemon-lifetime.test.ts` | 06, 07, 10 | +18 / −8 |
| `apps/cli/src/daemon/daemon-lifetime.ts` | 06 | +5 / −3 |
| `apps/cli/src/daemon/daemon-logger.test.ts` | 06, 07, 10 | +66 / −3 |
| `apps/cli/src/daemon/daemon-logger.ts` | 06 | +10 / −10 |
| `apps/cli/src/daemon/daemon-navigation-worker-entry.ts` | 04, 05 | +9 / −4 |
| `apps/cli/src/daemon/daemon-navigation-worker-protocol.test.ts` | 04, 05, 07, 10 | +7 / −3 |
| `apps/cli/src/daemon/daemon-navigation-worker-protocol.ts` | 04, 05 | +2 / −3 |
| `apps/cli/src/daemon/daemon-navigation-worker.ts` | 04, 05 | +6 / −2 |
| `apps/cli/src/daemon/daemon-process-launcher.ts` | 06 | +9 / −6 |
| `apps/cli/src/daemon/daemon-registry.test.ts` | 06, 07, 10 | +2 / −2 |
| `apps/cli/src/daemon/daemon-registry.ts` | 06 | +15 / −7 |
| `apps/cli/src/daemon/daemon-resource-monitor.test.ts` | 05, 07, 10 | +66 / −91 |
| `apps/cli/src/daemon/daemon-resource-monitor.ts` | 05 | +6 / −62 |
| `apps/cli/src/daemon/daemon-result-chunk-codec.test.ts` | 04, 07, 10 | +4 / −4 |
| `apps/cli/src/daemon/daemon-result-chunk-codec.ts` | 04 | +21 / −13 |
| `apps/cli/src/daemon/daemon-startup-coordinator.test.ts` | 06, 07, 10 | +57 / −30 |
| `apps/cli/src/daemon/daemon-startup-coordinator.ts` | 06 | +26 / −22 |
| `apps/cli/src/daemon/local-daemon-transport-execution.test.ts` | 02, 03, 04, 07, 08, 09, 10 | +115 / −40 |
| `apps/cli/src/daemon/local-daemon-transport-validation.test.ts` | 02, 03, 04, 07, 08, 09, 10 | +115 / −1 |
| `apps/cli/src/daemon/local-daemon-transport.test.ts` | 02, 03, 04, 07, 08, 09, 10 | +1 / −1 |
| `apps/cli/src/daemon/local-daemon-transport.ts` | 02, 03, 04, 08, 09 | +60 / −37 |
| `apps/cli/src/daemon/workspace-daemon-requests.test.ts` | 01, 04, 05, 06, 07, 10 | +17 / −6 |
| `apps/cli/src/daemon/workspace-daemon.test.ts` | 01, 04, 05, 06, 07, 10 | +6 / −5 |
| `apps/cli/src/daemon/workspace-daemon.ts` | 01, 04, 05, 06 | +27 / −51 |
| `apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts` | 07, 10 | +3 / −3 |
| `apps/cli/test/e2e/daemon/diagnostic-output.test.ts` | 07, 10 | +7 / −8 |
| `apps/cli/test/e2e/daemon/parity.test.ts` | 07, 10 | +2 / −2 |
| `apps/cli/test/e2e/daemon/persistent-pressure.test.ts` | 07, 10 | +2 / −2 |
| `apps/cli/test/e2e/daemon/state-isolation.test.ts` | 07, 10 | +1 / −1 |
| `apps/cli/test/e2e/daemon/status.test.ts` | 07, 10 | +3 / −2 |
| `apps/cli/test/e2e/daemon/stop.test.ts` | 07, 10 | +2 / −2 |
| `apps/cli/test/helpers/daemon-accepted-caller.ts` | 07, 10 | +1 / −1 |
| `apps/cli/test/helpers/daemon-controller.ts` | 06, 07, 10 | +46 / −0 |
| `apps/cli/test/helpers/daemon-live-silent.ts` | 07, 10 | +1 / −1 |
| `apps/cli/test/helpers/daemon-malformed-activity.ts` | 07, 10 | +1 / −1 |
| `apps/cli/test/helpers/daemon-process-terminator.ts` | 06, 07, 10 | +24 / −0 |
| `apps/cli/test/helpers/daemon-registry-cleaner.ts` | 06, 07, 10 | +1 / −1 |
| `apps/cli/test/helpers/daemon-registry.ts` | 06, 07, 10 | +22 / −0 |
| `apps/cli/test/helpers/daemon-resource-policy.ts` | 05, 07, 10 | +34 / −0 |
| `apps/cli/test/helpers/daemon-startup-caller-exit.ts` | 06, 07, 10 | +3 / −3 |
| `apps/cli/test/helpers/daemon-startup-coordinator.ts` | 06, 07, 10 | +48 / −0 |
| `apps/cli/test/helpers/daemon-startup-mutation-owner.ts` | 06, 07, 10 | +1 / −1 |
| `apps/cli/test/helpers/daemon-startup-publisher.ts` | 06, 07, 10 | +1 / −1 |
| `apps/cli/test/helpers/e2e-process-cleanup.ts` | 07, 10 | +3 / −5 |
| `apps/cli/test/helpers/local-daemon-transport.ts` | 02, 03, 04, 07, 08, 09, 10 | +64 / −0 |
| `apps/cli/test/helpers/workspace-daemon-persistent-pressure.ts` | 01, 04, 05, 06, 07, 10 | +4 / −4 |
| `apps/cli/test/helpers/workspace-daemon-stuck.ts` | 01, 04, 05, 06, 07, 10 | +4 / −4 |
| `apps/cli/test/helpers/workspace-daemon.ts` | 01, 04, 05, 06, 07, 10 | +99 / −0 |
| `meta-tests/src/daemon-package.test.ts` | 11 | +34 / −1 |
