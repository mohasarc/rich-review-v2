# Candidate parent additions

These are concrete editorial proposals for the audited PR-131 relationships. They are not an applied rewrite of 51’s whole-stack page or a claim that the other 113 author-bullet mappings were audited. Existing ancestors and unrelated front consequences must be retained.

## A child failure can spend a fresh-launch budget

A startup child failure can consume a separate fresh-launch allowance; the default permits one retry. Ownership waits do not reset the counter. This is separate from healthy warm-up having no deadline.

Stated: the policy record preserves one fresh launch after a failed child. PR #131 routes attempts through policy.

## One shutdown family contains different wait boundaries

User stop shares one budget between graceful work and forced escalation; force reserves at most half that budget, capped by policy. Direct SIGTERM and SIGKILL each have their own exit wait. Idle lifetime and drain acknowledgement have separate clocks.

Stated: the policy record explains bounded stop, preserving small overridden stop windows, and a bounded wait for each signal.

## Memory limits do not identify the two sampling jobs

Process supervision samples RSS and spool state; a separate, faster active-worker sampler observes heap high-water. Replacement count and time window bound churn independently of both cadences.

Stated: the policy record separately explains sustained-pressure sampling, short heap peaks, and replacement churn.

## Diagnostic history and pending writes consume different capacity

Diagnostics separately bound active/backup files, pending-write memory, and disconnected traces. Trace expiry does not evict results.

Stated: the policy record distinguishes bounded history, slow-storage memory, and reconnect evidence.

## The helper can make the directory before capture exists

On the legacy-options path, transport construction creates the supplied output directory and floors inline storage at a chunk. Directory existence and later emptiness can both occur without file-backed capture.

Unexplained: test-only tuning is stated, but no separate reason for constructor directory creation was located.

## A positive floor is conditional, and helper precedence differs

Workspace zero-inline repair requires a result bound and also reduces the chunk cap. It overlays legacy options on a base policy. Other wrappers can prefer explicit policy or take a direct-policy path. “Adapter” does not imply one universal merge rule.

Unexplained: positive ordered capacities and test-only adaptation are stated; the exact translations and precedence choices lack separate reasons in the inspected record.
