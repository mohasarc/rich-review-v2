"""Read pinned git objects/bundles and assemble the critique's source receipts.

Run from anywhere. Writes only inside this experiment. Does not execute symnav.
"""
from pathlib import Path
import hashlib
import json
import re
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[2]
WORKTREE = ROOT / "worktrees/stack-head"


def blob(rev, path):
    return subprocess.run(
        ["git", "show", f"{rev}:{path}"], cwd=WORKTREE,
        check=True, capture_output=True, text=True,
    ).stdout


def excerpt(text, start, end, language="text"):
    lines = text.splitlines()
    return "```" + language + "\n" + "\n".join(
        f"{i + 1:>4}  {lines[i]}" for i in range(start - 1, min(end, len(lines)))
    ) + "\n```\n"


def source(rev, path, start, end):
    return f"`{rev}:{path}`, lines {start}–{end}:\n\n" + excerpt(blob(rev, path), start, end, "typescript")


def patch(subject, start, end):
    path = ROOT / "inputs" / subject / "diff.patch"
    return f"[Bundled {subject} patch](../../../inputs/{subject}/diff.patch), patch lines {start}–{end}:\n\n" + excerpt(path.read_text(), start, end, "diff")


def matching_patch(subject, path):
    text = (ROOT / "inputs" / subject / "diff.patch").read_text()
    chunks = re.split(r"(?=^diff --git )", text, flags=re.M)
    chunk = next(x for x in chunks if x.startswith("diff --git ") and x.splitlines()[0].endswith(" b/" + path))
    start = text[:text.index(chunk)].count("\n") + 1
    return patch(subject, start, start + len(chunk.splitlines()) - 1)


parts = ["""# Source witnesses

These receipts support the audit column of the [single critique table](../critique.md). Line numbers inside code fences belong to the named pinned revision or bundle, not the current editor buffer. Interpretations below concern what a reader needs to learn; they do not establish a defect in symnav. No symnav tests or earlier agents' probes were executed in this critique.

The #127 six-file patch and #131 production/test patch were read throughout. For #148, #146/#147 and the whole stack, the audit used the complete changed-file inventories and selected source, test, contract and rationale hunks. The wide subjects were not an exhaustive independent census. “No additional miss found” is bounded by that coverage.

## E1 — #127 test and lifetime accounting

The complete patch adds four core cases and six semantic-service cases. The original five semantic-service cases and their helper suffix are byte-identical. No existing test release call gains an `await`. The production backend and service release methods do gain awaits. This supports both the correction to page 01 and the narrower confirmation of page 37.

The new core handle uses `Map.has`, stores the exact factory return, and registers each map's clear function. Both lifecycle methods invoke the same clear loop. A synchronous throw happens before insertion; an already-returned rejected promise remains cached. This is source reasoning, not a new runtime probe.
"""]

service_test = "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts"
base_test, head_test = blob("a1e325a5", service_test), blob("64919bcb", service_test)
first_original = re.search(r"^  it\(", base_test, re.M).start()
original_suffix = base_test[first_original:]
accounting = {
    "semantic_original_suffix_unchanged": head_test.endswith(original_suffix),
    "semantic_original_test_declarations": len(re.findall(r"^  it\(", base_test, re.M)),
    "semantic_head_test_declarations": len(re.findall(r"^  it\(", head_test, re.M)),
    "core_new_test_declarations": len(re.findall(r"^  it\(", blob("64919bcb", "packages/core/src/backend/turn-scoped-cache-scope.test.ts"), re.M)),
    "original_suffix_sha256": hashlib.sha256(original_suffix.encode()).hexdigest(),
}
assert accounting["semantic_original_suffix_unchanged"]
parts.append("Source comparison: `" + json.dumps(accounting) + "`\n\n")
parts.append(patch("pr-127", 1, 19))
parts.append(patch("pr-127", 546, 609))

body127 = json.loads((ROOT / "inputs/pr-127/pr.json").read_text())["body"]
parts.append("""
## E2 — disclosure is different from a reason for changing behavior

The #127 body explicitly calls the backend an **awaited release boundary**, gives the service a promise-returning release surface, and explains clearing before pending or rejecting release. The commit list includes **Specify awaited semantic resource release**. Thus “PR body silent” is false as a disclosure claim. The inspected materials still do not reconcile changed backend settlement/failure with the broad behavior-preservation contract; that narrower rationale gap should remain labelled unexplained.

Page 04's captured overview says “One failure path changed; PR body silent.” Its own 4.8 / decision 1 says “The PR body shows it.” That is the observed parent-to-depth contradiction, independent of any judgment about the code change.

[Bundled PR body and commits](../../../inputs/pr-127/pr.json):

""")
parts.append("```text\n" + "\n".join(l for l in body127.splitlines() if any(x in l.lower() for x in ["release boundary", "release barrier", "synchronous cache clearing", "promises", "releasetransientresources"])) + "\n```\n")

parts.append("""
## E3 — #131 changes the parent failure boundary

The parent now deserializes and validates the policy in its constructor **before** creating `Worker`. A malformed serialized snapshot can therefore throw synchronously without spawning a thread. “The chunk cap is checked on both sides” identifies the value flow but leaves this changed failure owner and time implicit. Page 20 names this consequence in P12; the other inspected #131 stopping layers did not teach it explicitly.

Chunk validation through policy is stated in the #131 materials. No separate reason for this earlier malformed-snapshot failure boundary was found in the inspected body/commit trail. This is an inference from execution order, not an observed production failure.
""")
parts.append(source("b100221db", "apps/cli/src/daemon/daemon-navigation-worker.ts", 78, 101))
parts.append(matching_patch("pr-131", "apps/cli/src/daemon/daemon-navigation-worker.ts"))

parts.append("""
## E4 — #131 later completion errors can replace the first error

In the old nested catch, a failed reattached completion returned the first error. In the new loop, after successful receipt acquisition, `currentCompletion` becomes the new completion and the next iteration can throw its error. Failure to acquire that receipt still throws the preceding error. Separate retry scopes do not by themselves teach this error-selection decision. No specific reason for the changed error identity was found in the inspected #131 rationale.
""")
p131 = (ROOT / "inputs/pr-131/diff.patch").read_text().splitlines()
hits = [i for i, line in enumerate(p131) if "firstError" in line or "currentCompletion" in line]
if hits:
    parts.append(patch("pr-131", min(hits) - 6, max(hits) + 9))

parts.append("""
## E5 — #131 valid policy adapters do not preserve every storage stimulus

The transport test helper converts requested inline capacity 0 to at least the default chunk size, 64 KiB, and precreates the output directory. In the one-record 64 KiB partial-output case below, the same call now stays inline: spilling uses `rawBytes + nextBytes > inlineBytes`, not `>=`. The empty-directory assertion can pass without removing a client spill file. Larger transfers still spill; this is not a claim that all cleanup evidence disappeared.

The separate spool fixture changes add bytes and split records to keep exercising spill paths. Those adaptations and the transport clamp have different effects. Page 27's top mentions the former (“Forced spill at 0 becomes a threshold crossing”); its adapter descent first reveals the latter and the lost same-state premise. That is the observed rule-4 surprise.
""")
parts.append(matching_patch("pr-131", "apps/cli/test/helpers/local-daemon-transport.ts"))
parts.append(source("b100221db", "apps/cli/src/daemon/local-daemon-transport-execution.test.ts", 722, 771))
outsrc = blob("b100221db", "apps/cli/src/command-execution-result.ts")
lines = outsrc.splitlines()
for i, line in enumerate(lines):
    if "this.rawBytes + record.bytes.byteLength > this.inline" in line:
        parts.append(source("b100221db", "apps/cli/src/command-execution-result.ts", max(1, i - 3), i + 10))
        break

parts.append("""
## E6 — three #131 consumer fixtures bypass constructor assignability

Three added policy-consumption cases use `as unknown as ConstructorParameters<...>` at construction: spool capacities, logger queue capacity, and resource cadence/thresholds. Their runtime assertions still exist, but those fixture constructions do not provide ordinary TypeScript assignability evidence. Page 28 teaches this explicitly; page 20's contract recall missed it. The diff establishes the casts, not a runtime failure or a motive for using them.
""")
casts = []
for i, line in enumerate(p131):
    if line.startswith("+") and "as unknown as ConstructorParameters" in line:
        casts.append(i + 1)
        parts.append(patch("pr-131", max(1, i - 10), i + 5))
accounting["pr131_new_constructor_double_cast_patch_lines"] = casts

parts.append("""
## E7 — #148 retirement and portable hashing have recorded context

At the immediate base, the policy plan explicitly schedules removal of `@symnav/daemon/policy-testing` after the app-owned mechanism tests move package-local. The same paragraph remains at #148 head. This supplies the migration condition missing from pages 03, 12, 23, 29 and 35. It does not explain every deleted assertion or the local scope of the clock scan; those are separate choices.

The #148 commit trail includes **Specify portable daemon compatibility hashing** and **Normalize daemon compatibility source line endings**. The new test checks CRLF independence and that a source edit changes the digest. Page 23's unexplained label is too broad for CRLF normalization. A reason for the exact digest strategy or exclusions is a different question.
""")
parts.append(source("ba53c8e1", "plans/005/daemon-policy.md", 62, 66))
parts.append(source("20838f8d", "plans/005/daemon-policy.md", 62, 66))
parts.append(patch("pr-148", 2194, 2225))

parts.append("""
## E8 — the new #148 facade chooses its own warm-request protocol version

The still-shipped CLI dispatcher sends `record.protocolVersion`; the staged client sends `DAEMON_PROTOCOL_VERSION`. Page 06 names this choice. Most page-only recalls retained routing guard order and no-replay behavior without this request-construction difference. The code comparison establishes a different authority for that field; it does not establish a reachable production mismatch or a user-visible failure. No specific reason for the choice was found in the inspected #148 rationale.
""")
parts.append(source("20838f8d", "apps/cli/src/daemon/daemon-command-dispatcher.ts", 212, 222))
parts.append(source("20838f8d", "packages/daemon/src/client/daemon-client-runtime.ts", 182, 202))

parts.append("""
## E9 — canonical registry ownership also tightens some comparisons

The live CLI changes before the freeze. The old `isStartupOwner` checks only instance ID. Its replacement requires identity plus instance. The post-write starting-owner reread also changes from instance-only to the complete observed owner. Therefore “centralize equality” alone is missing a before/after acceptance contrast. Pages 06 and 08 state the tightening explicitly; page 18's inspected outline did not. The architectural reason for one owner is stated; a specific reason for tightening these comparisons under preservation was not found.
""")
parts.append(source("ba53c8e1", "apps/cli/src/daemon/daemon-registry.ts", 405, 411))
parts.append(source("20838f8d", "apps/cli/src/daemon/daemon-registry.ts", 516, 524))
parts.append(source("20838f8d", "apps/cli/src/daemon/daemon-registry.ts", 842, 865))

parts.append("""
## E10 — the stack narrows the diagnostic test's observation surface

The built-CLI test loses per-file size and backup-count assertions. It changes secret checks on all raw log contents to checks on JSON-serialized inspector events. These do not make the same observation: the inspector skips malformed or invalid records. The move to package-owned inspection is stated; the inspected rationale does not separately justify dropping those exact observations. Page 14's additional sheet and page 22's top expose this. Page 21's read map did not retain the distinction despite explaining the inspector boundary.
""")
parts.append(patch("stack", 7447, 7474))
parts.append(source("d070023", "packages/daemon/src/testing/daemon-testing-inspector.ts", 109, 131))

parts.append("""
## E11 — last configured owner wins primary lookup

The core graph pushes owners in configuration order but unconditionally sets `primaryProjectByRelativePath` on each visit. For one path owned by A then B, `projectsByRelativePath` contains `[A, B]` and primary lookup yields B. Page 14's “last” is correct; the captured pages 01 and 22 taught “first.” This is an explanatory correction, not evidence of a new implementation defect. No comparative rationale for the primary-owner ordering was found in the inspected stack material.
""")
parts.append(source("d070023", "packages/core/src/workspace/project-graph.ts", 321, 340))
parts.append(source("d070023", "packages/core/src/workspace/project-graph.ts", 154, 159))

parts.append("""
## E12 — final CLI executor composition creates a separate default policy

The injected daemon snapshot crosses daemon-process and worker boundaries, but the CLI executor factory independently calls `DaemonPolicy.currentSystem()` when building host dependencies. A map of “one complete injected policy” should name that host boundary exception. Page 21 already does. The source proves a separate construction; it does not prove different numerical values on a normal run. No specific reason for the independent host default was found in the inspected stack material.
""")
parts.append(source("d070023", "apps/cli/src/daemon-executor.ts", 130, 137))

parts.append("""
## E13 — retained client composition, fresh local executor

Each cold/fallback call invokes the host executor factory anew, with a no-op resource sampler. The client retains its runtime composition, not a local executor instance. Page 06 names this in K6 and its host-options table. It was absent from that row's locked teach-back: a recall miss, not an artifact omission. Executor injection has a stated architectural reason; the exact per-attempt lifetime is a separate visible contract.
""")
parts.append(source("20838f8d", "packages/daemon/src/client/daemon-client-runtime.ts", 217, 228))

parts.append("""
## E14 — the adjacent pair also keeps shutdown ordering explicit

The delivery/execution extractions preserve a graceful-worker-close barrier before spool cleanup. Page 30 states that in its open group 05, and distinguishes it from the ordinary current-delivery wait and turn-boundary sample. My locked recall omitted this shutdown order. The new process test gates worker close and observes cleanup afterward. This is another recall miss with an already-prepared parent, not a surprise on descent.
""")
s146 = (OUT / "pr-146.patch").read_text().splitlines()
for i, line in enumerate(s146):
    if line.startswith("+") and "worker" in line.lower() and "spool" in line.lower() and "it(" in line:
        parts.append("[Saved #146 diff](pr-146.patch):\n\n" + excerpt("\n".join(s146), i + 1, i + 23, "diff"))
        break
parts.append("The #147 implementation reads `trackedCompletion(requestId)` once immediately after ledger completion; it does not continuously follow every subsequent attachment. [Saved #147 diff](pr-147.patch), lines 541–553, and [#146 delivery map](pr-146.patch), lines 938–953. This detail was already in page 30's stopping layer and the locked recall.\n")

report = re.sub(r"^## (E\d+) —", lambda m: f'<a id="{m[1].lower()}"></a>\n\n## {m[1]} —', "\n".join(parts), flags=re.M)
(OUT / "source-witnesses.md").write_text(report)
(OUT / "source-accounting.json").write_text(json.dumps(accounting, indent=2) + "\n")
print(json.dumps(accounting, indent=2))
print("Wrote", OUT / "source-witnesses.md")
