# Complete survey

## 01 · Output

One capacity vocabulary reaches seven source readers. Capture, spooling, disk decoding and both worker endpoints take supplied chunk/inline/result/aggregate caps. Raw-number validators sit downstream of the measured readers. Mechanisms stay in the CLI. Parent-side snapshot validation also moves earlier: see F5.

**Stated reason:** Required inputs prevent omitted composition from restoring local defaults; the PR explicitly includes framing and worker validation.

## 02 · Startup

Coordination clocks move; healthy warm-up stays unbounded. Registry grace, heartbeat, authorization, observation and previous-instance termination use policy. The unused startup-timeout knob disappears. Only explicit child exit or lost warm-up consumes the numeric child retry budget; default remains one retry.

**Stated reason:** The policy record distinguishes election recovery from progressing warm-up, and preserves one fresh launch after a failed child.

## 03 · Shutdown

A shared section keeps several distinct clocks. Idle lifetime, user stop, signal waits and drain acknowledgements require shutdown policy. Forced-stop reserve still uses min(maximum, half the stop window); the acknowledgement poll remains distinct from process polling.

**Stated reason:** The policy record gives idle cleanup, stop escalation, process exit and completion acknowledgement separate purposes.

## 04 · Resources

Memory thresholds stop being derived twice. The CLI resource-policy class and memory-cap input disappear. The snapshot supplies RSS thresholds, reported hard cap, worker heap size, sampling cadence and the replacement circuit. A deleted derivation test block remains a separate fault below.

**Stated reason:** The architecture gives every threshold one owner; consumers must not reconstruct the snapshot.

## 05 · Diagnostics

Log limits and disconnected traces share an owner. Rotation size, backup count, write queue, disconnected-trace expiry and trace capacity use diagnostics policy. Trace capacity keeps an effective minimum of one. Diagnostic retention remains separate from completion retention.

**Stated reason:** The policy record bounds storage and queues, and retains reconnect evidence independently of results.

## 06 · Transport

One direct reader serves different timeout purposes. Composition selects status-observer (100 ms); ordinary lifecycle and execution-status use 250 ms. Admission keeps 5 s and accepted completion has no time deadline. Ordinary JSON and transfer-control frame caps remain separate.

**Stated reason:** Request kind cannot distinguish status aggregation from an ordinary execution-status exchange.

## 07 · Delivery

A reattached execute gets a fresh fetch allowance. Execution reattachment and result fetch use independent numeric budgets, both defaulting to one. The fetch counter belongs to each execute attempt; failed fetch still enters failure handling. The later-error change is an unexplained fault, not part of the stated reason.

**Stated reason:** The PR explicitly requires a separate fetch-resume allowance for every reattached execute attempt.

## 08 · Test shore

Small test knobs cross a test-only boundary. Seven new helper adapters translate legacy test knobs to validated policy. Production compatibility overloads are removed while clock/storage/worker seams remain. A meta-test rejects retired names with a source-string scan, not semantic flow analysis. Exact translations, report shape and test weakening appear in F2–F4.

**Stated reason:** Tests need small thresholds without reopening runtime tuning seams; the PR names both the adapters and the retired-default guard.

## F1 · Error provenance

A later completion error can replace the first error. After a successful reattachment receipt, a failed second completion now escapes as the current error; base rethrew the original error. Failure to obtain the reattachment receipt still preserves the preceding error. No specific reason was found.

**Unexplained reason:** Numeric budgets are explained; changing the reported completion error is not explained in the supplied PR, commits or examined policy/architecture records.

## F2 · Translated fixtures

The adapter changes the test input, not just its address. Valid output policy requires positive chunk ≤ inline ≤ result ≤ aggregate; spill fixtures are rescaled and a two-byte record is split. Helpers clamp inline, create an output directory and ignore legacy memoryCapBytes. Explicit policy overrides legacy controller/startup knobs. Benchmark resource reports gain replacement fields under schemaVersion 1. These details are unexplained.

**Unexplained reason:** The general adapter strategy is stated. The exact translations, precedence, directory side effect, ignored legacy cap and benchmark shape are not separately explained.

## F3 · Deleted assertions

The old memory-derivation block disappears. Five memory-size rows, constraint-selection assertions and the 250 ms constant assertion are removed from CLI tests. Existing package tests cover related derivation/defaults, but not the exact old 256 MiB input row. This case-selection change has no recorded reason.

**Unexplained reason:** Deleting the old threshold owner is explained. Deleting this assertion set and choosing this replacement case set are not separately explained.

## F4 · Test premises

Expected values change source; three fixtures bypass typing. Spool/e2e expectations read policy defaults instead of retired constants; expectations already shared production constants at base. Three new consumer tests—spool, logger and supervisor—cast through unknown to constructor parameter types. Their fixtures bypass normal assignability checks; the casts and exact expected-value choice are unexplained.

**Unexplained reason:** Retiring constant imports follows the migration. No specific reason was found for the three casts or for making these expectations depend on policy defaults.

## F5 · Validation timing

An invalid snapshot can now fail before a worker exists. The worker host parses the serialized policy to get the chunk cap before constructing Worker. Invalid configuration can therefore throw synchronously in the parent. Worker-side parsing remains. The extra validation site follows the new input route, but its changed failure boundary has no specific recorded reason.

**Unexplained reason:** The PR explains supplying worker-validation limits, but not the additional parent-side parse or its earlier failure boundary.
