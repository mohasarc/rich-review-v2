"""Resolve exact-substring anchors against pinned git objects in the read-only worktrees."""
import functools
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent
WORKTREES = ROOT.parent.parent / "worktrees"
REPOS = {"base": WORKTREES / "pr-131-base", "head": WORKTREES / "pr-131-head"}


@functools.lru_cache(maxsize=None)
def source(revision, sha, path):
    return subprocess.run(
        ["git", "-C", str(REPOS[revision]), "show", f"{sha}:{path}"],
        check=True, capture_output=True, text=True,
    ).stdout.split("\n")


class AnchorError(Exception):
    pass


def locate(revision, sha, path, anchor, occurrence=None):
    lines = source(revision, sha, path)
    hits = [index for index, line in enumerate(lines) if anchor in line]
    if not hits:
        raise AnchorError(f"{revision}:{path}: missing {anchor!r}")
    if occurrence is None and len(hits) > 1:
        raise AnchorError(f"{revision}:{path}: {len(hits)} hits for {anchor!r} at {[h + 1 for h in hits]}")
    return hits[occurrence or 0] + 1


def excerpt(revision, sha, path, anchor, before=2, after=2, occurrence=None):
    line = locate(revision, sha, path, anchor, occurrence)
    lines = source(revision, sha, path)
    start = max(1, line - before)
    end = min(len(lines), line + after)
    return {
        "revision": revision,
        "path": path,
        "line": line,
        "start": start,
        "lines": lines[start - 1:end],
    }
