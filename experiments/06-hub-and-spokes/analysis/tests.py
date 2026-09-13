import json
import re
import subprocess
from pathlib import Path

ROOT = Path.home() / "projects/rich-review-v2"
HEAD = ROOT / "worktrees/pr-148-head"
BASE_REF = "origin/agent/daemon-architecture-refactor-part-24"
OUT = Path(__file__).parent

TEST_CALL = re.compile(r'\b(it|test|describe)(?:\.each\([^)]*\))?\(\s*(["`\'])((?:\\.|(?!\2).)*)\2', re.S)
EXPECT = re.compile(r"\bexpect(?:\.soft)?\(")


def git(*args: str) -> str:
    return subprocess.run(["git", *args], cwd=HEAD, capture_output=True, text=True, check=True).stdout


def base_source(path: str) -> str:
    try:
        return git("show", f"{BASE_REF}:{path}")
    except subprocess.CalledProcessError:
        return ""


def head_source(path: str) -> str:
    file = HEAD / path
    return file.read_text() if file.exists() else ""


def names(source: str) -> list[str]:
    return [f"{m.group(1)}: {' '.join(m.group(3).split())}" for m in TEST_CALL.finditer(source)]


def main() -> None:
    status = git("diff", "-M", "--name-status", f"{BASE_REF}...HEAD")
    rows = []
    for line in status.splitlines():
        parts = line.split("\t")
        kind = parts[0]
        if kind.startswith("R"):
            before, after = parts[1], parts[2]
        elif kind in ("M", "D"):
            before = after = parts[1]
        elif kind == "A":
            before, after = None, parts[1]
        else:
            continue
        subject = after or before
        if not re.search(r"\.test\.ts$", subject):
            continue
        old = base_source(before) if before else ""
        new = head_source(after) if kind != "D" else ""
        old_names, new_names = names(old), names(new)
        removed = [n for n in old_names if n not in new_names]
        added = [n for n in new_names if n not in old_names]
        rows.append(
            {
                "status": kind,
                "before": before,
                "after": after if kind != "D" else None,
                "testsBefore": sum(1 for n in old_names if not n.startswith("describe")),
                "testsAfter": sum(1 for n in new_names if not n.startswith("describe")),
                "expectBefore": len(EXPECT.findall(old)),
                "expectAfter": len(EXPECT.findall(new)),
                "removedNames": removed,
                "addedNames": added,
            }
        )
    (OUT / "tests.json").write_text(json.dumps(rows, indent=2))
    for r in rows:
        delta_t = r["testsAfter"] - r["testsBefore"]
        delta_e = r["expectAfter"] - r["expectBefore"]
        flag = " <-- fewer" if delta_t < 0 or delta_e < 0 else ""
        print(
            f'{r["status"]:<5} {(r["after"] or r["before"]):<78} tests {r["testsBefore"]:>3}->{r["testsAfter"]:<3} expect {r["expectBefore"]:>4}->{r["expectAfter"]:<4}{flag}'
        )
    print("\nREMOVED TEST NAMES")
    for r in rows:
        if r["removedNames"]:
            print("##", r["status"], r["before"], "->", r["after"])
            for n in r["removedNames"]:
                print("   -", n)


if __name__ == "__main__":
    main()
