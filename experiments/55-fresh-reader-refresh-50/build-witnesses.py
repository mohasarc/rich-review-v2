"""Build offline, pinned receipts. Reads git objects; writes only this experiment."""
from pathlib import Path
import hashlib
import html
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[1] / "worktrees/stack-head"
E = ROOT / "evidence"
PINS = json.loads((E / "diff-inventory.json").read_text())
manifest = json.loads((E / "source-manifest.json").read_text())
witnesses = []


def source(pr, revision, path, start, end):
    sha = PINS[pr][revision]
    name = f"{pr}-{revision}--" + path.replace("/", "--")
    file = E / "source" / name
    if not file.exists():
        file.write_text(subprocess.check_output(
            ["git", "show", sha + ":" + path], cwd=REPO, text=True))
    record = {"pr": pr, "revision": revision, "sha": sha, "path": path,
              "file": "source/" + name, "lines": len(file.read_text().splitlines())}
    if not any(r["file"] == record["file"] for r in manifest):
        manifest.append(record)
    return clip(file.relative_to(ROOT).as_posix(), start, end,
                f"#{pr} {revision} · {path} · {sha}")


def clip(path, start, end, title=None):
    lines = (ROOT / path).read_text().splitlines()
    assert 1 <= start <= end <= len(lines), (path, start, end, len(lines))
    return {"path": path, "title": title or path, "start": start, "end": end,
            "text": "\n".join(f"{i + 1:>5}  {lines[i]}" for i in range(start - 1, end))}


def around(path, pattern, before=2, after=5):
    lines = (ROOT / path).read_text().splitlines()
    i = next(i for i, line in enumerate(lines) if pattern in line)
    return clip(path, max(1, i + 1 - before), min(len(lines), i + 1 + after))


def patch(pr, path):
    file = f"evidence/{'stack' if pr == 'stack' else 'pr-' + pr}.patch"
    lines = (ROOT / file).read_text().splitlines()
    start = next(i for i, line in enumerate(lines)
                 if line.startswith("diff --git ") and line.endswith(" b/" + path))
    end = next((i for i in range(start + 1, len(lines))
                if lines[i].startswith("diff --git ")), len(lines))
    return clip(file, start + 1, end, f"#{pr} diff · {path}")


def add(key, title, conclusion, snippets):
    witnesses.append({"id": key, "title": title, "conclusion": conclusion,
                      "snippets": snippets})


add("C1", "#127: await is disclosed; the parity rationale remains narrower",
    "The backend now awaits semantic release, and the service clears its scope before awaiting project release. "
    "The PR body explicitly calls this an awaited release boundary and lists Promise<void> as the public surface. "
    "Page 04's top says 'PR body silent' while its own depth says 'PR body shows it'. This is a witnessed attribution "
    "surprise, not evidence that the author explained every conflict with the preservation premise. A controlled "
    "asynchronous graph can expose pending/rejecting completion; this source reading does not establish that ordinary "
    "concrete cleanup has a long delay.", [
        patch("127", "packages/backend-typescript/src/typescript-backend/typescript-backend.ts"),
        around("evidence/pr-127.patch", "+  async releaseTransientResources(): Promise<void>", 3, 8),
        around("evidence/pr-127-body.md", "awaited release boundary", 3, 8),
        around("evidence/pr-127-body.md", "Promise<void>", 2, 4),
        around("captures/04-entry.txt", "One failure path changed; PR body silent", 2, 3),
        around("captures/04-entry.txt", "None found. The PR body shows it", 2, 3),
    ])

test_path = "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts"
old = E / ("source/127-base--" + test_path.replace("/", "--"))
new = E / ("source/127-head--" + test_path.replace("/", "--"))
marker = '  it("shares one reference search across caller and reference projections"'
a, b = old.read_text(), new.read_text()
assert a[a.index(marker):] == b[b.index(marker):]
raw_a, raw_b = [subprocess.check_output(
    ["git", "show", PINS["127"][rev] + ":" + test_path], cwd=REPO)
    for rev in ["base", "head"]]
raw_suffix = raw_a[raw_a.index(marker.encode()):]
assert raw_suffix == raw_b[raw_b.index(marker.encode()):]
test_comparison = {
    "base_tests": len(re.findall(r"\bit\(", a)),
    "head_tests": len(re.findall(r"\bit\(", b)),
    "old_test_and_helper_suffix_byte_identical": True,
    "suffix_sha256": hashlib.sha256(raw_suffix).hexdigest(),
    "comparison_input": "Raw git blob bytes; no newline normalization.",
    "marker": marker,
    "scope": "Existing five service cases and their trailing helpers, excluding imports and new cases.",
}
(E / "127-test-comparison.json").write_text(json.dumps(test_comparison, indent=2) + "\n")
add("C2", "#127: six service cases and four core cases are added; old cases remain",
    "All five old service test bodies and their trailing helpers are byte-identical. Only the import and a preceding "
    "block of six cases change there; the new core file adds four cases. Page 01's claim that an existing release "
    "call gains await is incorrect. Pages 37/40/49/53's unchanged-case claim is supported. The new rejection case uses "
    "a controlled project graph; it is not a new delayed-success or daemon end-to-end witness. The full six-file #127 "
    "diff yielded no additional consequential decision missing from the dedicated, complete cache registers in this reading.", [
        clip("evidence/127-test-comparison.json", 1, len((E / "127-test-comparison.json").read_text().splitlines())),
        patch("127", test_path),
        patch("127", "packages/core/src/backend/turn-scoped-cache-scope.test.ts"),
        around("captures/01-pr127.txt", "one existing release call gains await", 2, 4),
    ])

add("P1", "#131: policy rejection moves ahead of worker allocation",
    "The parent constructor reparses configuration.policy before new Worker. Invalid serialized policy can therefore "
    "throw synchronously before a worker exists. In the base constructor, no parent parse occurs; the standard worker "
    "entry already parsed policy. 'The parent gets a chunk limit' omits a failure boundary. This is a source inference "
    "about the standard path, not an executed malformed-worker probe; custom workerData can override the policy sent to the child.", [
        source("131", "base", "apps/cli/src/daemon/daemon-navigation-worker.ts", 77, 96),
        source("131", "head", "apps/cli/src/daemon/daemon-navigation-worker.ts", 78, 100),
        source("131", "head", "packages/daemon/src/daemon-policy.ts", 158, 190),
        around("evidence/source/131-base--apps--cli--src--daemon--daemon-navigation-worker-entry.ts", "fromSerialized", 3, 4),
    ])

add("P2", "Recovery needs a revision and an error category",
    "At #131, a failing later accepted completion becomes the current error; failure to obtain the reattached receipt "
    "still preserves the previous error. Transfer resume was already nested per execution attempt. The new counter "
    "does not turn a failed fetch into a repeated-fetch loop: its rejection goes to fail. At the final stack, repeated "
    "accepted-close exhaustion and failed reattachment preserve the original accepted-close error, and a matching "
    "failed fetch can resume again within budget. Non-accepted-close errors still propagate directly. Do not copy an "
    "intermediate #131 error prediction into a final-stack explanation.", [
        source("131", "base", "apps/cli/src/daemon/local-daemon-transport.ts", 391, 416),
        source("131", "head", "apps/cli/src/daemon/local-daemon-transport.ts", 395, 430),
        source("131", "head", "apps/cli/src/daemon/local-daemon-transport.ts", 472, 498),
        source("stack", "head", "packages/daemon/src/transport/execution-client.ts", 47, 74),
        source("stack", "head", "packages/daemon/src/transport/execution-client.ts", 114, 143),
    ])

add("P3", "#131: test adapters change the stimulus, in different ways",
    "The transport helper clamps requested inline capacity to at least the default 64 KiB chunk and creates an output "
    "directory eagerly. Small outputs can remain inline despite a legacy zero argument. The workspace helper translates "
    "zero to half the result cap only when a result cap is available, clamps the chunk to the resulting limits, and "
    "still accepts a memoryCapBytes field that the production options no longer consume. Page 27's opened row "
    "qualifies the top's general spill-translation sentence. A passing empty-directory assertion alone cannot prove "
    "the same disk state was exercised. Surviving tests still exercise disk; this is not a claim that all storage "
    "coverage disappeared or that a runtime defect follows.", [
        patch("131", "apps/cli/test/helpers/local-daemon-transport.ts"),
        source("131", "head", "apps/cli/test/helpers/workspace-daemon.ts", 9, 48),
        around("evidence/pr-131.patch", "-  readonly memoryCapBytes: number;", 3, 8),
        around("captures/27-adapters.txt", "Forced spill at 0", 2, 4),
        around("captures/27-adapters.txt", "A transport helper clamps", 2, 6),
    ])

add("P4", "#131: helper precedence and benchmark shape are decisions too",
    "Controller/startup/logger adapters prefer an explicit policy over legacy scalar options. The transport helper "
    "dispatches on the presence of transport; the workspace helper uses supplied policy as a base and then overlays "
    "legacy knobs. The resource helper's record grows from five fields to seven, adding replacementWindowMs and "
    "replacementLimit. The benchmark emits that record with schemaVersion still 1. These are beyond the production "
    "constructor graph; no separate reason for these exact choices was located in the inspected PR body or commit messages.", [
        patch("131", "apps/cli/test/helpers/daemon-controller.ts"),
        patch("131", "apps/cli/test/helpers/daemon-startup-coordinator.ts"),
        clip("evidence/pr-131.patch", 919, 947),
        patch("131", "apps/cli/test/helpers/daemon-resource-policy.ts"),
        patch("131", "apps/cli/src/daemon/daemon-resource-monitor.ts"),
        source("131", "head", "apps/cli/test/helpers/local-daemon-transport.ts", 18, 30),
        source("131", "head", "apps/cli/test/helpers/workspace-daemon.ts", 27, 53),
        source("131", "head", "apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts", 130, 142),
        source("131", "head", "apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts", 183, 198),
    ])

add("P5", "#131: moving an oracle is different from retaining every case",
    "The deleted resource derivation block contains five table rows, one constrained-memory case and one 250 ms "
    "constant case. Central policy tests already cover the derivation and supervision interval; the exact 256 MiB "
    "table row is not retained there. Three new consumer tests inspect internal state through unknown casts. "
    "These observations support reporting changed oracles and private test seams, not a blanket claim of equivalence.", [
        patch("131", "apps/cli/src/daemon/daemon-resource-monitor.test.ts"),
        source("131", "head", "packages/daemon/src/daemon-policy.test.ts", 39, 110),
        clip("evidence/pr-131.patch", 345, 365),
        clip("evidence/pr-131.patch", 969, 989),
        clip("evidence/pr-131.patch", 1429, 1449),
    ])

add("M1", "#148: an omitted host policy has a supplier; loading has a lifetime",
    "The public options make policy optional; the runtime uses options.policy ?? DaemonPolicy.currentSystem(). "
    "The façade starts one dynamic import at construction and retains that promise, including rejection. Client "
    "composition persists; local executor creation remains per attempt. These are distinct decisions. Page 12 first "
    "names policy optionality in its deeper host map. Page 23 and both 49 copies first name it in the public-client "
    "room; changing the authentication sentence does not fix this. The contract is Node-free at its declarations, "
    "while the private runtime uses Node.", [
        source("148", "head", "packages/daemon/src/client/daemon-client-contracts.ts", 10, 25),
        source("148", "head", "packages/daemon/src/client/daemon-client.ts", 20, 47),
        source("148", "head", "packages/daemon/src/client/daemon-client-runtime.ts", 75, 98),
        source("148", "head", "packages/daemon/src/client/daemon-client-runtime.ts", 217, 227),
        clip("captures/12-entry.txt", 82, 94),
        clip("captures/12-entry.txt", 287, 300),
        around("captures/23-public-room.txt", "optional policy", 3, 4),
    ])

add("M2", "#148: 'control exceptions' does not predict a request's credentials",
    "Normal handling checks protocol and instance. Ping and stop do not add a token check. Execute admission checks "
    "the token; execution-status, result-fetch and result-ack also require it. Identify, terminate and kill branch "
    "early to instance-plus-token handling, ahead of the normal protocol check. This partition is retained rather "
    "than newly imposed blanket authentication. Pages 23 and 29 first make it explicit below their complete maps. "
    "49 revised23 promotes the partition at the root; 49 revised29 edits only clocks, leaving the authentication descent.", [
        source("148", "head", "packages/daemon/src/process/process-coordinator.ts", 353, 405),
        source("148", "head", "packages/daemon/src/process/process-coordinator.ts", 417, 425),
        source("148", "head", "packages/daemon/src/process/process-coordinator.ts", 488, 500),
        around("captures/23-entry.txt", "Separate protocol/instance", 2, 3),
        around("captures/23-auth-choice.txt", "identify", 2, 5),
        around("captures/29-auth.txt", "Identify and terminate/kill", 2, 5),
        around("captures/49-revised23-entry.txt", "Ping/stop", 1, 3),
    ])

add("M3", "#148: the queue default changes; the process already injected monotonic time",
    "The standalone queue's default goes from Date.now to NodeDaemonClock.monotonicNowMs. The base process already "
    "constructed its queue with a monotonic callback, so the composed daemon did not newly switch from wall time. "
    "Page 29/original29 first teaches this split in A1's deeper prose. Revised29 places it in A1's top sentence, "
    "removing that witnessed clock surprise. Wall timestamps and construction/acceptance-based idle semantics remain distinct.", [
        patch("148", "apps/cli/src/daemon/workspace-request-queue.ts"),
        source("148", "base", "apps/cli/src/daemon/workspace-daemon.ts", 84, 110),
        around("captures/29-entry.txt", "Daemon wall and monotonic clocks replace", 1, 4),
        around("captures/29-clock.txt", "The queue’s standalone default changes", 2, 3),
        around("captures/49-revised29-entry.txt", "standalone queue default changes", 1, 3),
    ])

add("M4", "#148: common ownership predicates can change accepted outcomes",
    "For a parseable owner record with the requested instance but a different identityKey, base isStartupOwner "
    "returns true while head returns false. Head refreshStartupOwner also rejects it earlier. Naming predicate "
    "centralization alone does not expose that outcome. Constructor coordinate validation also happens before "
    "composition. This is a source-derived counterexample, not a claim about how often malformed ownership occurs "
    "or a correctness verdict. The app copy is prepared this way before the #148 head freeze.", [
        source("148", "base", "apps/cli/src/daemon/daemon-registry.ts", 379, 409),
        source("148", "head", "apps/cli/src/daemon/daemon-registry.ts", 395, 401),
        source("148", "head", "apps/cli/src/daemon/daemon-registry.ts", 516, 522),
        source("148", "head", "apps/cli/src/daemon/daemon-registry.ts", 842, 859),
        around("evidence/source/148-head--apps--cli--src--daemon--daemon-process-coordinator.ts", "validateCoordinates(options.identity", 2, 7),
    ])

add("M5", "#148: the plan records when policy-testing should retire",
    "plans/005/daemon-policy.md:66, unchanged between the immediate base and head, explicitly schedules removal of "
    "policy-testing after app-owned mechanism tests move package-local. The separate serialization-bridge condition "
    "is on line 64. Pages 03/12/23/29/35 should split this recorded condition from any still-unexplained reason for "
    "individual deleted assertions or the clock scan's scope. 'Temporary' is not the only context available. "
    "Pages 06 and 50 had already recovered this; this critique independently checks the pinned object after reading them.", [
        source("148", "base", "plans/005/daemon-policy.md", 62, 66),
        source("148", "head", "plans/005/daemon-policy.md", 62, 66),
        patch("148", "packages/daemon/package.json"),
        around("captures/03-entry.txt", "no explicit removal rationale", 2, 3),
        around("captures/35-entry.txt", "Retire the temporary policy-testing", 2, 7),
    ])

add("M6", "#148: relocated tests and frozen head bytes bound the preservation claim",
    "Git recognizes 37 test-file relocations. The worker readiness fixture becomes generic and drops three startup "
    "plus four execution timing assertions. CLI version mismatch moves from worker initialization classification "
    "to direct executor-factory rejection. The deleted mocked entry test's 257 MiB worker-policy handoff assertion "
    "does not appear in the new built-entry test. New package tests serialize files and add a Windows-specific "
    "forced-exit observer expectation. A 38-file app-head hash freeze is not a base/head parity test or an app/package "
    "equivalence test. These are coverage-boundary decisions, not grounds for declaring the implementation wrong.", [
        patch("148", "packages/daemon/src/worker/navigation-worker.test.ts"),
        patch("148", "apps/cli/src/daemon-executor.test.ts"),
        around("evidence/pr-148.patch", "workerMaxOldGenerationSizeMiB: 257", 7, 8),
        around("evidence/pr-148.patch", "remain frozen while package-local mechanisms are staged", 6, 18),
        patch("148", "packages/daemon/vitest.config.ts"),
        around("evidence/pr-148.patch", '+      if (process.platform === "win32")', 5, 15),
    ])

add("S1", "Stack: the last configured owner becomes primary",
    "For a known file in configured projects A then B, all owners remain [A, B], while the primary map is overwritten "
    "and returns B. A known unowned file falls back to the inferred project; an absent file has no primary. Page 01's "
    "'first' prediction is wrong. Pages 14 and 51's 'last' prediction is supported. This claim is independently checked "
    "against the pinned final source; it was also a source-informed lead in 49, so it is not credited as a new blind discovery.", [
        source("stack", "head", "packages/core/src/workspace/project-graph.ts", 154, 159),
        source("stack", "head", "packages/core/src/workspace/project-graph.ts", 322, 338),
        around("captures/01-entry.txt", "first configured", 2, 4),
    ])

add("S2", "Stack: host cwd normalization and removed built-command observations",
    "Start/stop now resolve a relative --cwd against the invocation context's cwd before workspace discovery. The "
    "final diff deletes seven built-status cases and three built-stop cases, including in-flight drain and force-kill "
    "observation through the rendered command. Generic/package tests retain other coverage; their existence does not "
    "make these exact composed witnesses unchanged. Stack readers also need to distinguish per-owner publication "
    "from one transaction spanning every source/project/backend owner. Pages 01/14/51 already teach that distinction.", [
        patch("stack", "apps/cli/src/commands/daemon/register-daemon-command.ts"),
        patch("stack", "apps/cli/test/e2e/daemon/status.test.ts"),
        patch("stack", "apps/cli/test/e2e/daemon/stop.test.ts"),
    ])

add("D1", "#146/#147: acceptance, execution, and delivery keep different lifetimes",
    "#147 moves immutable acceptance metadata to the ledger entry and returns early on duplicates, avoiding a second "
    "acceptance clock/lifetime/trace side effect. Execution publishes completion then awaits one value returned by "
    "trackedCompletion; a later attachment cannot retarget that already-evaluated promise. Boundary resource sampling "
    "still gates FIFO progression. #146 attempts physical spool cleanup before logical acknowledgement, records cleanup "
    "failure and continues; authenticated request types remain aliases. Its acknowledgement clock provider and "
    "retained-trace wrapper/order are explicit changes. Page 30 already teaches these; selected source hunks added "
    "fidelity rather than another consequential decision in this reading.", [
        patch("147", "apps/cli/src/daemon/accepted-request-ledger.ts"),
        patch("147", "apps/cli/src/daemon/accepted-execution-session.ts"),
        around("evidence/pr-146.patch", "+  trackedCompletion(requestId", 2, 4),
        around("evidence/pr-146.patch", "+    await spool.acknowledge().catch", 3, 10),
        around("evidence/pr-146.patch", "+    const acknowledgementDeadline", 2, 14),
        around("evidence/pr-146.patch", "+  private completeOperationTrace", 2, 11),
    ])

(E / "source-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
(ROOT / "witnesses.json").write_text(json.dumps(witnesses, indent=2, ensure_ascii=False) + "\n")
style = """body{font:17px/1.55 system-ui,sans-serif;max-width:1050px;margin:40px auto;padding:0 22px;color:#202b33;background:#faf9f5}a{color:#065983}h1{font-size:32px}h2{scroll-margin-top:20px}article{border-top:2px solid #bdc7ca;margin-top:42px;padding-top:16px}pre{font:12px/1.5 ui-monospace,monospace;overflow:auto;background:#edf0ee;padding:16px;max-height:620px}details{margin:14px 0}summary{cursor:pointer;overflow-wrap:anywhere}nav{display:flex;flex-wrap:wrap;gap:14px}.muted{color:#52616a}.back{display:inline-block;margin:12px 0} :target{outline:3px solid #cca745;outline-offset:7px}"""
parts = ['<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
         '<title>55 · Pinned witnesses</title><style>' + style + '</style><body>',
         '<a href="review.html">← Return to the comparison</a><h1>Pinned witnesses</h1>',
         '<p>These receipts substantiate the findings already named in the comparison table. Code excerpts are optional depth. '
         'Line numbers refer to the saved file, not the current worktree. No symnav runtime test was run for this critique.</p>',
         '<nav>' + ''.join(f'<a href="#{w["id"]}">{w["id"]}</a>' for w in witnesses) + '</nav>']
for w in witnesses:
    parts.append(f'<article id="{w["id"]}"><h2>{w["id"]} · {html.escape(w["title"])}</h2><p>{html.escape(w["conclusion"])}</p>')
    for s in w["snippets"]:
        parts.append(f'<details><summary>{html.escape(s["title"])} · L{s["start"]}–{s["end"]}</summary>'
                     f'<p><a href="{s["path"]}">Full saved file</a></p><pre>{html.escape(s["text"])}</pre></details>')
    parts.append('<a class="back" href="review.html">← Comparison</a></article>')
parts.append('</body></html>')
(ROOT / "witnesses.html").write_text('\n'.join(parts))
print(f"Built {len(witnesses)} witnesses from {len(manifest)} pinned source snapshots.")
