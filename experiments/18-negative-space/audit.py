"""Read immutable Git objects; write evidence only into this experiment folder.

Run: python3 experiments/18-negative-space/audit.py
No source execution, package installation, checkout, or workspace mutation.
"""
from pathlib import Path
from hashlib import sha256
import json
import re
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
REPO = ROOT / "worktrees/pr-148-head"
BASE = "ba53c8e1662fd86d198b95321c90d9c9bef10184"
HEAD = "20838f8dbf413e04767543eb2380d0d114da6c60"


def git(*args):
    return subprocess.check_output(["git", "-C", str(REPO), *args])


def source(path, revision=HEAD):
    return git("show", f"{revision}:{path}").decode()


def tree(revision):
    return {p: meta.split()[2] for meta, p in
            (line.split("\t", 1) for line in git("ls-tree", "-r", revision).decode().splitlines())}


def import_neutral(text):
    """Exclude static import declarations; normalize re-export paths and whitespace.

    This is textual evidence, never a claim of runtime equivalence.
    """
    text = re.sub(r'(?ms)^import\b.*?;\s*', '', text)
    text = re.sub(r'(\bfrom\s+)[\"\'][^\"\']+[\"\']', r'\1"<module>"', text)
    return re.sub(r"\s+", "", text)


base, head = tree(BASE), tree(HEAD)
changes = [row.split("\t") for row in git("diff", "--name-status", "-M", BASE, HEAD).decode().splitlines()]
areas = []
for title, prefix in [
    ("Workspace & symbols", "packages/core/"),
    ("TypeScript backend", "packages/backend-typescript/"),
    ("Output rendering", "packages/renderer/"),
    ("Telemetry", "packages/telemetry/"),
    ("Command implementations", "apps/cli/src/commands/"),
    ("Shared test fixtures & utilities", "packages/testing/"),
]:
    paths = sorted(p for p in head if p.startswith(prefix))
    changed = [p for p in paths if base.get(p) != head[p]]
    deleted = [p for p in base if p.startswith(prefix) and p not in head]
    assert not changed and not deleted
    areas.append(dict(title=title, prefix=prefix, count=len(paths), changed=changed,
                      deleted=deleted, paths=paths))

frozen = sorted(p for p in head if p.startswith("apps/cli/src/daemon/")
                and p.endswith(".ts") and not p.endswith(".test.ts")
                and Path(p).name not in {"daemon-command-dispatcher.ts", "invocation-route.ts",
                                         "invocation-workspace-selector.ts"})
hasher = sha256()
for path in frozen:
    hasher.update(path.encode() + b"\0" + source(path).replace("\r\n", "\n").encode() + b"\0")
expected = re.search(r'"([0-9a-f]{64})"', source("meta-tests/src/daemon-compatibility-copy.test.ts")).group(1)
assert len(frozen) == 38 and hasher.hexdigest() == expected
frozen_rows = []
for path in frozen:
    before = path if path in base else "apps/cli/src/daemon/workspace-daemon.ts"
    state = "unchanged" if before == path and base.get(path) == head[path] else "edited before freeze"
    frozen_rows.append(dict(path=path, basePath=before, status=state,
                            baseBlob=base.get(before), headBlob=head[path],
                            diff=git("diff", "--no-ext-diff", "-M", BASE, HEAD, "--", before, path).decode()))

pairs = []
for old, new in [
    ("daemon-protocol.ts", "transport/protocol.ts"),
    ("daemon-wire-codec.ts", "transport/wire-codec.ts"),
    ("daemon-execution-client.ts", "transport/execution-client.ts"),
    ("daemon-delivery-session.ts", "delivery/delivery-session.ts"),
    ("completion-spool.ts", "delivery/completion-spool.ts"),
    ("accepted-execution-session.ts", "execution/accepted-execution-session.ts"),
    ("daemon-navigation-worker-protocol.ts", "worker/worker-protocol.ts"),
]:
    old, new = "apps/cli/src/daemon/" + old, "packages/daemon/src/" + new
    before, after = source(old, BASE), source(new)
    equal = import_neutral(before) == import_neutral(after)
    pairs.append(dict(basePath=old, headPath=new, equalBytes=before == after,
                      equalAfterImportAndWhitespaceNormalization=equal))

pins = ["apps/cli/src/cli.ts", "apps/cli/src/daemon/daemon-command-dispatcher.ts",
        "apps/cli/src/daemon/invocation-route.ts", "apps/cli/src/daemon/invocation-workspace-selector.ts",
        "apps/cli/src/daemon-executor.ts", "apps/cli/src/cli-program-executor.ts",
        "apps/cli/src/command-execution-result.ts", "packages/daemon/src/daemon-policy.ts",
        "packages/daemon/src/daemon-command-name.ts", "packages/daemon/src/daemon-executor.ts",
        "packages/daemon/src/daemon-admission.ts", "packages/daemon/src/daemon-execution-failure.ts",
        "plans/005/daemon-policy.md"]
assert all(base[p] == head[p] for p in pins)
e2e = sorted(p for p in head if p.startswith("apps/cli/test/e2e/"))
e2e_edits = [p for p in e2e if base.get(p) != head[p]]
for p in e2e_edits:
    before = source(p, BASE).replace("workspace-daemon-", "daemon-process-coordinator-")
    normalized = lambda text: re.sub(r",(?=[)\]}])", "", re.sub(r"\s+", "", text))
    assert normalized(before) == normalized(source(p))
snapshots = [p for p in e2e if "/__snapshots__/" in p]
assert all(base[p] == head[p] for p in snapshots)
moved_tests = [c for c in changes if c[0].startswith("R")
               and c[1].startswith("apps/cli/src/daemon/")
               and c[2].startswith("packages/daemon/src/") and c[2].endswith(".test.ts")]
assert len(moved_tests) == 37

snippets = {}


def add(key, path, start=1, end=None, revision=HEAD):
    lines = source(path, revision).splitlines()
    last = min(end or len(lines), len(lines))
    snippets[key] = dict(path=path, revision=revision, start=start, end=last,
                         text="\n".join(lines[start - 1:last]),
                         url=f"https://github.com/mohasarc/symnav/blob/{revision}/{path}#L{start}-L{last}")


add("cli", "apps/cli/src/cli.ts", 1, 40)
add("dispatcher", "apps/cli/src/daemon/daemon-command-dispatcher.ts", 276, 310)
add("freeze", "meta-tests/src/daemon-compatibility-copy.test.ts", 8, 47)
add("facade", "packages/daemon/src/client/daemon-client.ts")
add("contracts", "packages/daemon/src/client/daemon-client-contracts.ts")
add("manifest", "packages/daemon/package.json")
add("protocol", "packages/daemon/src/transport/protocol.ts", 1, 45)
add("policy", "packages/daemon/src/daemon-policy.ts", 99, 151)
add("lifetime", "packages/daemon/src/lifecycle/daemon-lifetime.ts")
add("clock", "packages/daemon/src/lifecycle/daemon-clock.ts")
add("lifetime-test", "packages/daemon/src/lifecycle/daemon-lifetime.test.ts", 35, 72)
add("follow-ups", "plans/005/daemon-follow-ups-functional-spec.md", 175, 194)
add("coordinates", "packages/daemon/src/process/process-coordinator.ts", 84, 98)
add("validate", "packages/daemon/src/process/process-coordinator.ts", 539, 554)
add("auth", "packages/daemon/src/process/process-coordinator.ts", 485, 518)
add("registry", "packages/daemon/src/registry/registry.ts", 842, 860)
add("narrow-owner", "packages/daemon/src/registry/registry.ts", 443, 463)
add("routing", "packages/daemon/src/client/daemon-routing-policy.ts", 73, 137)
add("execute", "packages/daemon/src/client/daemon-client-runtime.ts", 139, 167)
add("control", "packages/daemon/src/client/daemon-client-runtime.ts", 80, 136)
add("control-actions", "packages/daemon/src/client/daemon-client-runtime.ts", 169, 192)
add("capture", "packages/daemon/src/client/daemon-client-runtime.ts", 189, 269)
add("spool-codec", "packages/daemon/src/delivery/completion-spool.ts", 1, 80)
add("failures", "packages/daemon/src/client/daemon-client-runtime.ts", 39, 68)
add("probe", "packages/daemon/src/registry/startup-coordinator.ts", 468, 491)
add("worker-before", "apps/cli/src/daemon/daemon-navigation-worker.test.ts", 369, 435, BASE)
add("worker-after", "packages/daemon/src/worker/navigation-worker.test.ts", 369, 407)
add("version", "apps/cli/src/daemon-executor.test.ts", 27, 44)
add("entry-before", "apps/cli/src/daemon/daemon-entry.test.ts", 99, 122, BASE)
add("entry-after", "packages/daemon/test/integration/built-process-entry.test.ts", 217, 283)
add("serial", "packages/daemon/vitest.config.ts")
add("lint-before", "eslint.config.mjs", 88, 112, BASE)
add("lint-tests-before", "meta-tests/src/lint-rule.test.ts", 109, 130, BASE)
add("node-types", "packages/daemon/src/host-contract.test.ts", 393, 416)
add("boundaries", "packages/daemon/src/package-boundary.test.ts", 10, 37)
add("entries", "packages/daemon/src/process-entry.ts")
spec = "plans/005/daemon-architecture-functional-spec.md"
add("spec-behavior", spec, 17, 43)
add("spec-host", spec, 114, 134)
add("spec-routing", spec, 206, 224)
add("spec-clock", spec, 237, 252)

pr = json.loads((ROOT / "inputs/pr-148/pr.json").read_text())
evidence = dict(
    base=BASE, head=HEAD, areas=areas, preservedPaths=pins,
    frozen=dict(count=len(frozen), digest=expected, files=frozen_rows,
                unchangedFromBase=sum(r["status"] == "unchanged" for r in frozen_rows)),
    copiedBodies=pairs,
    changes=dict(total=len(changes), statuses={k: sum(c[0].startswith(k) for c in changes)
                                            for k in "AMRD"}, paths=changes),
    e2e=dict(total=len(e2e), unchanged=len(e2e) - len(e2e_edits), helperPathOnly=e2e_edits,
             snapshotCount=len(snapshots)),
    movedTests=[dict(similarity=c[0], before=c[1], after=c[2]) for c in moved_tests],
    snippets=snippets, prBody=pr["body"], commits=pr["commits"],
    method="Git blob equality for same-path areas, including deleted-file checks; seven relocated files compared with static import declarations and whitespace excluded and re-export paths normalized (differences retained in the report); e2e changes checked after helper rename, whitespace and trailing-comma normalization; the freeze digest normalizes only CRLF to LF. These textual checks do not establish runtime parity. Symnav tests were read, not run.",
)
payload = json.dumps(evidence, ensure_ascii=False, indent=2)
(HERE / "evidence.json").write_text(payload + "\n")
(HERE / "evidence.js").write_text("window.REVIEW_EVIDENCE = " + payload.replace("</", "<\\/") + ";\n")
print(json.dumps({"changes": evidence["changes"]["statuses"],
                  "frozen": {k: v for k, v in evidence["frozen"].items() if k != "files"},
                  "areas": [{k: v for k, v in a.items() if k != "paths"} for a in areas],
                  "e2e": evidence["e2e"], "movedTests": len(moved_tests),
                  "copiedBodies": len(pairs), "snippets": len(snippets)}, indent=2))
