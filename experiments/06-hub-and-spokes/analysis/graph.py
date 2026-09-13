"""Exploratory source graph, not an executed-import trace.

Regex reachability follows conditional dynamic imports and can retain inline type
imports as possible runtime edges. The page uses module-load.json for observed
runtime membership, and only the facade's type closure from this graph.
"""

import json
import re
from pathlib import Path

SRC = Path.home() / "projects/rich-review-v2/worktrees/pr-148-head/packages/daemon/src"
OUT = Path(__file__).parent

STATIC = re.compile(r'^(import|export)\s+(type\s+)?([^;]*?)\s*from\s+"(\.[^"]+|@symnav/daemon)";', re.M | re.S)
SIDE_EFFECT = re.compile(r'^import\s+"(\.[^"]+)";', re.M)
DYNAMIC_LITERAL = re.compile(r'import\(\s*"(\.[^"]+)"\s*\)')
URL_REF = re.compile(r'new URL\(\s*"(\.[^"]+\.js)"\s*,\s*import\.meta\.url\s*\)')
INLINE_TYPE = re.compile(r'import\("(\.[^"]+)"\)\.')
DYNAMIC_VARIABLE = re.compile(r'const\s+\w+\s*:\s*string\s*=\s*"(\.[^"]+)";\s*\n\s*const\s+\w+\s*:\s*unknown\s*=\s*await import\(')


def production_files() -> list[Path]:
    return sorted(p for p in SRC.rglob("*.ts") if not p.name.endswith(".test.ts"))


def resolve(owner: Path, specifier: str) -> str | None:
    if specifier == "@symnav/daemon":
        return "index.ts"
    target = (owner.parent / specifier).resolve()
    candidate = target.with_suffix(".ts")
    if candidate.exists():
        return str(candidate.relative_to(SRC))
    return None


def edges_for(path: Path) -> list[dict]:
    text = path.read_text()
    found = []
    for match in STATIC.finditer(text):
        clause = match.group(3)
        type_only = bool(match.group(2)) or (
            clause.strip().startswith("{")
            and all(part.strip().startswith("type ") or not part.strip() for part in clause.strip("{} \n").split(","))
        )
        found.append({"to": resolve(path, match.group(4)), "kind": "type" if type_only else "value"})
    for match in SIDE_EFFECT.finditer(text):
        found.append({"to": resolve(path, match.group(1)), "kind": "value"})
    for match in DYNAMIC_LITERAL.finditer(text):
        found.append({"to": resolve(path, match.group(1)), "kind": "dynamic"})
    for match in DYNAMIC_VARIABLE.finditer(text):
        found.append({"to": resolve(path, match.group(1)), "kind": "dynamic-hidden"})
    for match in URL_REF.finditer(text):
        found.append({"to": resolve(path, match.group(1)), "kind": "spawn-url"})
    for match in INLINE_TYPE.finditer(text):
        found.append({"to": resolve(path, match.group(1)), "kind": "type"})
    return [edge for edge in found if edge["to"] is not None]


def reach(graph: dict, start: str, kinds: set[str]) -> set[str]:
    seen, stack = set(), [start]
    while stack:
        node = stack.pop()
        if node in seen:
            continue
        seen.add(node)
        stack.extend(edge["to"] for edge in graph.get(node, []) if edge["kind"] in kinds)
    return seen


def main() -> None:
    files = production_files()
    graph = {str(p.relative_to(SRC)): edges_for(p) for p in files}
    lines = {str(p.relative_to(SRC)): len(p.read_text().splitlines()) for p in files}
    runtime_kinds = {"value", "dynamic", "dynamic-hidden", "spawn-url"}
    entries = {
        "index.ts (public)": "index.ts",
        "client/daemon-client.ts (facade)": "client/daemon-client.ts",
        "client/daemon-client-runtime.ts (runtime)": "client/daemon-client-runtime.ts",
        "process-entry.ts": "process-entry.ts",
        "worker-entry.ts": "worker-entry.ts",
    }
    result = {"files": lines, "edges": graph, "reach": {}}
    for label, start in entries.items():
        runtime = reach(graph, start, runtime_kinds)
        static_values = reach(graph, start, {"value"})
        declarations = reach(graph, start, {"value", "type"})
        result["reach"][label] = {
            "runtime": sorted(runtime),
            "staticValueOnly": sorted(static_values),
            "declarations": sorted(declarations),
            "runtimeLines": sum(lines[f] for f in runtime),
        }
        print(f"{label:<45} runtime files={len(runtime):>3} lines={sum(lines[f] for f in runtime):>6}  static-value files={len(static_values):>3}  decl files={len(declarations):>3}")
    result["inProcess"] = {
        "facadeDeclarations": result["reach"]["client/daemon-client.ts (facade)"]["declarations"]
    }
    result["selfImporters"] = sorted(
        str(path.relative_to(SRC)) for path in files
        if re.search(r'from\s+[\"\']@symnav/daemon[\"\']', path.read_text())
    )
    all_runtime = set()
    for start in ("index.ts", "process-entry.ts", "worker-entry.ts"):
        all_runtime |= reach(graph, start, runtime_kinds)
    orphans = sorted(set(lines) - all_runtime)
    result["unreachable"] = orphans
    print("unreachable from index/process-entry/worker-entry:", orphans)
    client_side = set(result["reach"]["client/daemon-client-runtime.ts (runtime)"]["runtime"])
    process_side = set(result["reach"]["process-entry.ts"]["runtime"])
    result["sharedClientAndProcess"] = sorted(client_side & process_side)
    result["clientOnly"] = sorted(client_side - process_side)
    result["processOnly"] = sorted(process_side - client_side)
    print("client-only:", sorted(client_side - process_side))
    print("process-only:", sorted(process_side - client_side))
    print("shared:", sorted(client_side & process_side))
    hidden = [(k, e["to"]) for k, es in graph.items() for e in es if e["kind"] in ("dynamic-hidden", "spawn-url")]
    print("hidden/spawn edges:", hidden)
    (OUT / "graph.json").write_text(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
