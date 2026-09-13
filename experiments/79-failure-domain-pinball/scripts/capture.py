"""Freeze only the source witnesses used by experiment 79. Never writes to a worktree."""
from pathlib import Path
import hashlib, json, subprocess

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[1]
trees = {"head": ROOT / "worktrees/stack-head", "main": ROOT / "worktrees/main"}
pins = {k: subprocess.check_output(["git", "-C", str(v), "rev-parse", "HEAD"], text=True).strip() for k,v in trees.items()}
assert pins == {"head":"d07002357d3e9596bfaae910a1ac63b77981620b", "main":"b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e"}
for tree in trees.values():
    assert not subprocess.check_output(["git", "-C", str(tree), "status", "--porcelain", "--untracked-files=no"], text=True)

specs = [
    ("guards", "head", "packages/daemon/src/daemon-admission.ts", 1, 94, "Five guards; the first failure decides"),
    ("retry", "head", "packages/daemon/src/daemon-admission.ts", 96, 131, "Retry safety belongs to the rejection code"),
    ("transport", "head", "packages/daemon/src/transport/transport-error.ts", 1, 50, "Delivery state gates local fallback"),
    ("failure", "head", "packages/daemon/src/daemon-execution-failure.ts", 1, 40, "Two vocabularies and terminal precedence"),
    ("identity", "head", "packages/daemon/src/execution/accepted-execution-session.ts", 44, 69, "An existing entry attaches without a new execution"),
    ("classify", "head", "packages/daemon/src/execution/accepted-execution-session.ts", 149, 170, "Concrete error identities become classification facts"),
    ("reattach", "head", "packages/daemon/src/transport/execution-client.ts", 49, 96, "Same-request reattachment; fresh capture per attempt"),
    ("resume", "head", "packages/daemon/src/transport/execution-client.ts", 115, 149, "A separate fetch budget within the attempt"),
    ("fetch", "head", "packages/daemon/src/transport/execution-client.ts", 303, 336, "Fetch starts at the next record offset"),
    ("close", "head", "packages/daemon/src/transport/execution-client.ts", 400, 411, "Only an authenticated accepted close reattaches"),
    ("ack", "head", "packages/daemon/src/transport/execution-client.ts", 208, 236, "Complete, validate, acknowledge, then expose the result"),
    ("manifest", "head", "packages/daemon/src/transport/result-transfer-receiver.ts", 89, 136, "End and digest validation precede completion"),
    ("limits", "head", "packages/daemon/src/daemon-policy.ts", 125, 136, "Two independent defaults, each one"),
    ("budget-reasons", "head", "plans/005/daemon-policy.md", 27, 28, "The policy record states both recovery purposes"),
    ("admission-deadline", "head", "plans/005/daemon-policy.md", 9, 9, "Admission has a five-second deadline"),
    ("completion-deadline", "head", "plans/005/daemon-policy.md", 58, 58, "Accepted completion has no deadline"),
    ("fallback", "head", "packages/daemon/src/client/daemon-client-runtime.ts", 208, 246, "Warm completion never falls through to local execution"),
    ("admission-host", "head", "packages/daemon/src/process/process-coordinator.ts", 1, 1, "Admission caller"),
    ("old-failure", "main", "apps/cli/src/daemon/workspace-daemon.ts", 650, 674, "Main: the same precedence in the CLI daemon"),
    ("old-client", "main", "apps/cli/src/daemon/daemon-command-dispatcher.ts", 201, 258, "Main: CLI owns the warm fallback decision"),
    ("cutover", "head", "apps/cli/src/cli-invocation-coordinator.ts", 1, 105, "Tip: host coordinates through DaemonClient"),
    ("failure-tests", "head", "packages/daemon/src/daemon-execution-failure.test.ts", 35, 132, "Classification witnesses, including competing failures"),
    ("recovery-tests", "head", "packages/daemon/src/transport/execution-client.test.ts", 74, 130, "Identical reattachment request and two captures"),
    ("guard-tests", "head", "packages/daemon/src/daemon-admission.test.ts", 59, 87, "Pairwise order and compatible work"),
]
sources, receipts = {}, {}
for rid, build, path, start, end, title in specs:
    full = trees[build] / path
    if rid == "admission-host":
        # Find the actual owner rather than guessing a line in the process shell.
        matches = [p for p in (trees[build]/"packages/daemon/src/process").glob("*.ts") if "admissionPolicy.decide" in p.read_text()]
        assert len(matches) == 1
        full = matches[0]; path = str(full.relative_to(trees[build]))
        lines = full.read_text().splitlines()
        center = next(i for i,l in enumerate(lines,1) if "admissionPolicy.decide" in l)
        start, end = max(1,center-28), center+22
    raw = full.read_bytes(); lines = raw.decode().splitlines()
    end = min(end,len(lines)); assert 0 < start <= end
    key = build + ":" + path
    sources[key] = {"revision":pins[build],"path":path,"sha256":hashlib.sha256(raw).hexdigest(),"text":raw.decode()}
    receipts[rid] = {"title":title,"build":build,"source":key,"path":path,"start":start,"end":end,"revision":pins[build],"text":"\n".join(lines[start-1:end])}

bundle = json.loads((ROOT/"inputs/stack/pr.json").read_text())
prs = {str(p["number"]):p for p in bundle["pullRequests"] if p["number"] in [133,134,142,147,148,149]}
data = {"pins":pins,"receipts":receipts,"prs":prs}
(OUT/"evidence/sources.json").write_text(json.dumps(sources,indent=2)+"\n")
(OUT/"evidence/receipts.json").write_text(json.dumps(data,indent=2)+"\n")
(OUT/"evidence.js").write_text("window.PINBALL_EVIDENCE = "+json.dumps(data)+";\n")
print(f"Frozen {len(receipts)} receipts from {len(sources)} sources at both verified pins.")
