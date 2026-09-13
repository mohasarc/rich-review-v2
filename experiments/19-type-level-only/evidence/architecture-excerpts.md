# Architecture intent excerpts

Source: inputs/pr-131/repo-rules.md, copied from the symnav contributor guide and plans/005/daemon-architecture-functional-spec.md.

## Package roles and dependencies

## Repo layout

- `apps/cli` — the `symnav` binary. Wires Commander, owns the user-facing CLI surface, depends on the five production libraries below.
- `packages/core` — language-agnostic primitives and the cross-language backend interface. Has no internal dependencies.
- `packages/daemon` — portable host execution, output, diagnostic, command, and lifecycle report contracts. Has no internal dependencies. Daemon mechanisms move here only when their real implementations migrate.
- `packages/renderer` — output formatters (text, JSON). May depend only on `@symnav/core` and `@symnav/daemon`.
- `packages/backend-typescript` — the TypeScript language backend. Depends only on `@symnav/core`.
- `packages/telemetry` — shape-only usage capture, storage, and aggregation. Has no internal dependencies.
- `packages/testing` — test-only utilities (fixture loader, ESLint config helper, fixtures themselves). Importable from any package's _test_ code; never from production code. Private; never published.


## Dependency direction

The package dependency graph is locked. A given package may import only from the packages listed below.

| Package                      | May depend on (internal)                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| `@symnav/core`               | (nothing)                                                                                               |
| `@symnav/daemon`             | (nothing)                                                                                               |
| `@symnav/renderer`           | `@symnav/core`, `@symnav/daemon`                                                                        |
| `@symnav/backend-typescript` | `@symnav/core`                                                                                          |
| `@symnav/telemetry`          | (nothing)                                                                                               |
| `symnav` (apps/cli)          | `@symnav/core`, `@symnav/daemon`, `@symnav/renderer`, `@symnav/backend-typescript`, `@symnav/telemetry` |
| `@symnav/testing`            | (nothing)                                                                                               |

`@symnav/testing` is additionally importable from any package's test files. Production code may not import it.

Two enforcement layers run in CI: TypeScript project references (`pnpm typecheck` — a forbidden import is unresolvable because the importing package's `tsconfig.json` (or `tsconfig.test.json`, for test code) does not list the target as a reference) and ESLint boundaries (`pnpm lint` — `eslint-plugin-boundaries` reports the violation). Both must pass.

## Ownership requirement (bundle lines 1185–1201)

### The CLI app is composition only

`apps/cli` parses command-line syntax, resolves environment (state directory, daemon enabled), creates concrete dependencies, wires packages together, and prints. It holds no daemon policy, no workspace policy, and no navigation logic.

```text
A decision about routing, admission, ownership, delivery, memory, or lifetime that
lives in apps/cli is a defect.
```

### Every threshold has one owner and a recorded reason

Numeric limits (memory caps, spool caps, deadlines, idle timeout, probe timeout, trace retention, replacement circuit, reattachment attempts) live in one policy object inside the daemon package, each with a stated reason in a policy record under `plans/`. Tests override the policy object; users cannot.

```text
No CLI flag, environment variable, or config file tunes a daemon threshold.
```


## Verification baseline and extraction intent (bundle lines 1290–1316)

### Policy record

`plans/005/daemon-policy.md` lists every threshold with value and reason. A threshold absent from the record is a defect.

## Cross-cutting Concerns

### Verification baseline

The passing e2e parity and daemon suites on main are the baseline. The full-suite teardown flake and the unhandled daemon rejection are fixed before restructuring starts, so that baseline is green. Restructuring matches it exactly; a restructuring change that needs a test expectation changed is mis-scoped.

### Documentation

`CLAUDE.md` repo layout and dependency table, `plans/000/symnav-stages.md` package list update together with the introduction of `@symnav/daemon`.

## Daemon Package Extraction

**Purpose.** Give daemon policy and mechanism one home with an enforced boundary.

**Produces.** `@symnav/daemon` with a public surface of: client (execute, control), process entry, worker entry, executor contract, policy object, lifecycle report shapes.

**Does not produce.** Any navigation logic, any dependence on core, any knowledge of Commander syntax.

**Example.** A contributor adds a new admission check. They add one guard in the daemon package and one rejection code. Nothing in `apps/cli` changes.

**Edge cases.** Tests and benchmarks that imported daemon modules by deep relative path switch to the package's public surface or move into the package.

## Executor Contract and Module Injection
