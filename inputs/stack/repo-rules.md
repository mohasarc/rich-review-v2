# CLAUDE.md

# symnav contributor guide

## Orientation

`symnav` is a CLI for navigating TypeScript codebases by symbol — definitions, references, and the surrounding context graph. Read [`plans/000/symnav-functional-spec.md`](plans/000/symnav-functional-spec.md) for what it does from a user's perspective, and [`plans/000/symnav-stages.md`](plans/000/symnav-stages.md) for the staged implementation roadmap. Read those for high-level context before changing code.

## Repo layout

- `apps/cli` — the `symnav` binary. Wires Commander, owns the user-facing CLI surface, depends on the five production libraries below.
- `packages/core` — language-agnostic primitives and the cross-language backend interface. Has no internal dependencies.
- `packages/daemon` — owns portable host contracts plus daemon client, launch/election, registry, transport, process and worker entries, execution/delivery, resources, diagnostics, lifecycle, policy, and the read-only testing surface. Has no internal dependencies.
- `packages/renderer` — output formatters (text, JSON). May depend only on `@symnav/core` and `@symnav/daemon`.
- `packages/backend-typescript` — the TypeScript language backend. Depends only on `@symnav/core`.
- `packages/telemetry` — shape-only usage capture, storage, and aggregation. Has no internal dependencies.
- `packages/testing` — test-only utilities (fixture loader, ESLint config helper, fixtures themselves). Importable from any package's _test_ code; never from production code. Private; never published.

## Day-to-day commands

- `pnpm install` — install workspace dependencies.
- `pnpm test` — run Vitest across the workspace.
- `pnpm lint` — run ESLint (boundaries + Prettier).
- `pnpm typecheck` — TypeScript build + per-package test-config typecheck.
- `pnpm build` — `tsc --build` across the workspace.
- `pnpm --filter symnav dev -- <args>` — run the CLI from source via `tsx` (no build step).

## Pre-PR verification

Before opening or pushing to a PR, run the full CI-parity sequence locally on a clean tree:

```
pnpm install --frozen-lockfile && pnpm build && pnpm test && pnpm lint && pnpm typecheck
```

The `--frozen-lockfile` install is load-bearing: it's the only step that detects lockfile drift from `package.json` changes. A plain `pnpm install` (or none at all) silently tolerates stale `node_modules` symlinks left over from earlier installs, which can hide a missing dependency declaration that CI will then fail on. Treat anything short of this sequence as not-yet-verified.

## Test conventions

- Unit tests are colocated next to source: `<package>/src/foo.test.ts`.
- Integration tests live under `<package>/test/integration/`.
- End-to-end tests live under `apps/cli/test/e2e/` and spawn the built binary.
- Fixture projects live under `packages/testing/fixtures/`. Resolve them via `fixturePath("name")` from `@symnav/testing` — never hardcode paths.
- In-memory or mock helpers live beside the tests that use them — not in `@symnav/testing`, which is reserved for cross-cutting test utils with no upstream package deps.
- A fixture's `.git` directory is checked in as `dot-git/` — the host repo would otherwise treat a real nested `.git` as a submodule. The e2e setup renames `dot-git/` to `.git/` via `ensureFixtureGitMarker` before the suite runs. `packages/testing/fixtures/overview-cases/` is the canonical example.
- Try `overview` against the fixture with `pnpm --filter symnav dev -- overview <file>` from inside `packages/testing/fixtures/overview-cases/`, or against any real file with `pnpm --filter symnav dev -- overview path/to/file.ts`.

## TDD

Write the failing test first, then make it pass. Every behavior the code performs should have a test that would fail without it. Commit the red test as its own commit when the failure is informative; otherwise pair it with the implementation. The point is verified intent, not ceremony — small, focused tests that exercise real behavior beat broad tests that prove nothing.

## Project rules

- Avoid comments — meaning comes from clear names. Comments never carry contracts, preconditions, or other load-bearing info; if it matters, encode it in types, names, or tests, where it can't silently rot during a refactor.
- Favor readable names, early returns, and simple control flow over clever code.
- Name what a value is, not the generic role it plays, so the name alone tells the reader its meaning. When related types share a member, lift it into a shared base so the commonality is expressed once.
- Spell out abbreviations in directory and file names — clarity for every future reader beats brevity once.
- Break large functions into smaller named ones; break long logic chains into named intermediate variables.
- Group functions into classes with explicit public/private/static members — a file of free functions calling each other is a violation, not a style choice. A function that is internal to a file and called only by other functions there belongs on the class as a private (static when stateless) member. A lone exported free function is acceptable only as a genuinely standalone helper with no in-file collaborators. Any shared or module-level state always lives in a class — never in module-scope variables. Share logic via abstract classes, not object literals.
- Define only what you need now when shaping interfaces — defer everything speculative.
- Don't invent preconditions on interfaces. Before stating "caller must do X", name the concrete failure mode if X is skipped. If nothing concretely breaks, the precondition is fictional — drop it, and don't smuggle one layer's responsibilities into another's surface.
- File boundaries follow architecture, not granularity. A file owns one cohesive unit — a class, an interface, a public function, or a small family of types that travel together — alongside the private helpers and types only it uses. Two failure modes to avoid: co-locating unrelated top-level abstractions in the same `.ts`, and shattering a coherent unit into one-function-per-file scaffolding. A helper that is used in exactly one place, has no independent meaning, and isn't tested on its own belongs inline with its caller; promote it to its own file once any of those changes.
- If a directory mixes files from two unrelated bounded contexts, split it — the listing should narrate what the package contains.
- Optimise filenames for the `ls`; optimise function names for the call site — they can disagree.
- Loose coupling beats DRY across module boundaries — do not deduplicate across independent modules.
- Prefer clear, small TypeScript modules with explicit types at public boundaries.
- Reuse existing utilities before adding dependencies or new abstractions.
- Keep CLI behavior deterministic, non-interactive by default, and covered by focused tests.
- Update docs and examples whenever command behavior or output changes.

## PR descriptions

Use the template at `.github/PULL_REQUEST_TEMPLATE.md`. Per-section purpose is explained inline there.

Writing rules:

- Conciseness is non-negotiable. Structure beats wall-of-text. Short prose is fine where bullets would be awkward — pick whichever reads faster.
- One concrete fact per sentence or bullet. Prefer concrete nouns ("validates input order") over hand-waving ("improves robustness").
- Cut filler: no metaphors, no "really" / "very" / "simply" / "just", no decorative adjectives.
- Drop unnecessary articles where readability holds.
- Skip any section that would be empty or restate the title.
- Do not add a "Summary" / "What changed" section — reviewers read the commits and diff for that.

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

Edits to `eslint.config.mjs` or any `tsconfig*.json` are additionally asserted by tests in `meta-tests/` that read those files from disk; run `pnpm test` after touching them.


# plans/000/symnav-functional-spec.md

# Symnav Functional Spec

## Goal

Build an agent-first code discovery CLI that feels clean enough for a human to read directly. The tool should replace semantic misuse of text search, not replace `rg` for plain text search.

This spec defines product behavior only. It intentionally avoids implementation technology choices.

## First-Class User

The first-class user is an agent.

Agents should still receive clean, human-readable output by default. JSON is optional, not the default.

Default output should be:

- concise
- deterministic
- non-interactive
- readable in a terminal
- formatted with Unicode tree characters
- free of machine-oriented noise unless requested

Structured output can exist behind:

```bash
--json
```

## Core Guarantees

### Current Results Only

The tool must never return stale navigation results.

Functional rule:

```text
All answers reflect the current workspace at command execution time.
```

If the tool cannot produce current results, it fails instead of returning stale data.

Example:

```text
Cannot answer: current navigation data unavailable.
```

There is no stale-data override.

### Ignored Files

All commands operate only on non-ignored workspace files.

Rules:

- Project ignore files define which files are ignored within one workspace.
- Nested Git repositories, worktrees, and submodules are separate workspace boundaries, not ignore rules.
- Parent commands never traverse or return files from a nested workspace.
- Ignored files are always out of scope.
- There are no built-in ignore rules beyond project ignore behavior.
- There is no include-ignored override.
- There is no include-nested-workspaces override.
- The tool does not mention ignored files unless the user directly queries an ignored path.

Example:

```text
Cannot answer: path is ignored by project rules.
```

Directly querying a path owned by a nested workspace fails with guidance to select that workspace through the current directory or `--cwd`.

### Ambiguity

When input is ambiguous, the tool stops and shows candidates.

It must not guess or recommend one candidate as the likely intended answer.

Example:

```text
Ambiguous symbol: processPayment

Candidates
├── src/checkout/CheckoutService.ts
│   └── 42-78: CheckoutService::processPayment
│       async processPayment(...)
└── src/payments/PaymentProcessor.ts
    └── 18-31: PaymentProcessor::processPayment
        async processPayment(...)
```

## V1 Commands

V1 includes:

```text
resolve
def
refs
overview
context
graph
```

V1 excludes:

```text
impact
history
diff
impls
search-text
```

## Input Model

V1 command inputs are semantic. Line numbers and line ranges are output metadata only; they are not accepted as command targets.

`resolve` accepts a name or query:

```bash
symnav resolve PaymentProcessor
symnav resolve --fuzzy payment
```

`overview` accepts a file path:

```bash
symnav overview src/checkout/CheckoutService.ts
```

Symbol commands accept canonical symbol IDs:

```bash
symnav def src/checkout/CheckoutService.ts::CheckoutService::processPayment
symnav refs src/checkout/CheckoutService.ts::CheckoutService::processPayment
symnav context src/checkout/CheckoutService.ts::CheckoutService::processPayment
symnav graph src/checkout/CheckoutService.ts::CheckoutService::processPayment
```

Canonical symbol IDs use this shape:

```text
<file-path>::<symbol-path>
```

Human-readable output does not repeat canonical IDs when they can be derived. When a symbol is shown under a file path, its canonical ID is `<file-path>::<symbol-path>`.

The shown symbol path must include any disambiguator needed to reconstruct a valid canonical ID.

Examples:

```text
src/checkout/CheckoutService.ts
└── 42-78: CheckoutService::processPayment
    async processPayment(order: Order): Promise<Receipt>

Canonical ID:
src/checkout/CheckoutService.ts::CheckoutService::processPayment
```

```text
src/http/Router.ts
├── 40: Router::post#overload1
│   post(path: string, handler: Handler): void
├── 44: Router::post#overload2
│   post(path: RegExp, handler: Handler): void
└── 48-62: Router::post#implementation
    post(path: string | RegExp, handler: Handler) { ... }
```

Exact/default input should not silently fuzzy-match.

## Output Grammar

Human-readable output uses Unicode tree characters.

There is no ASCII fallback requirement.

Reference-like lines use this shape:

```text
<line>: <preview>  [<kind-or-metadata>]
```

Example:

```text
└── 58: await checkoutService.processPayment(order)  [usage]
```

Metadata is shown as a bracket tag after the source preview.

Symbol-like lines use this shape:

```text
<line-range>: <symbol-path>
<signature-or-declaration>
```

When output is shown in a terminal, matched symbols may be highlighted with ANSI styling. When output is piped, no highlight markers or extra characters are emitted.

## Pagination

Large result sets are paginated.

Common flags:

```bash
--page <n>
--page-size <n>
--all
```

Default page size:

```text
100
```

Pagination must be stable:

```text
For the same workspace state and same query, page 2 contains the same results every time.
```

Sorting rules for reference-style output:

```text
1. file path
2. line number within each file
```

## `resolve`

Purpose:

```text
Find matching symbols and files for a provided name.
```

`resolve` returns symbols and files in separate sections.

It does not include arbitrary text/string matches.

Example:

```bash
symnav resolve --fuzzy Payment
```

```text
Resolve: Payment (fuzzy)

Symbols
├── src/checkout/CheckoutService.ts
│   ├── 8: MAX_PAYMENT_RETRIES
│   │   const MAX_PAYMENT_RETRIES: number
│   └── 42-78: CheckoutService::processPayment
│       async processPayment(order: Order): Promise<Receipt>
├── src/payments/PaymentProvider.ts
│   └── 2-5: PaymentProvider
│       interface PaymentProvider
├── src/payments/PaymentProcessor.ts
│   ├── 8-64: PaymentProcessor
│   │   class PaymentProcessor
│   └── 22-36: PaymentProcessor::charge
│       static async charge(order: Order): Promise<Payment>
└── src/payments/types.ts
    ├── 1: PaymentStatus
    │   type PaymentStatus = "pending" | "paid" | "failed"
    └── 6-10: PaymentMethod
        enum PaymentMethod

Files
(none)
```

The Files section excludes any file already present in the Symbols section. Only files whose basename matches the query and that contain no matching symbol appear here.

## `def`

Purpose:

```text
Show where a symbol is defined.
```

`def` returns:

- implementation, when one exists
- declarations
- overload signatures
- multiple implementations when the queried symbol represents a contract/base symbol

`def` never returns usages.

Example:

```text
Definition: Router::post

src/http/Router.ts
├── 40: Router::post#1  [overload]
│   post(path: string, handler: Handler): void
├── 44: Router::post#2  [overload]
│   post(path: RegExp, handler: Handler): void
└── 48-62: Router::post#3  [implementation]
    post(path: string | RegExp, handler: Handler): void
```

When a name collides with siblings in the same scope, each colliding symbol carries a numeric disambiguator (`#1`, `#2`, …) assigned in source order. The query may include or omit the disambiguator: with it, exactly that symbol matches; without it, every same-name sibling matches.

Example with multiple implementations:

```text
Definition: PaymentProvider::charge

src/payments/PaymentProvider.ts
└── 2: PaymentProvider::charge  [declaration]
    charge(): Promise<void>

src/payments/StripeProvider.ts
└── 10-18: StripeProvider::charge  [implementation]
    charge(): Promise<void>

src/payments/PaypalProvider.ts
└── 10-18: PaypalProvider::charge  [implementation]
    charge(): Promise<void>
```

## `refs`

Purpose:

```text
Show all references to a symbol, excluding the symbol's own definition/declaration.
```

`refs` should not hide import/export/type references. It shows everything within non-ignored workspace files, except the symbol's own definition/declaration.

Default output is a compact Unicode filesystem tree.

Directory chains with only one child should collapse.

Files and line entries remain separate levels, even when a file has only one reference.

Example:

```text
References: PaymentProcessor
Total: 6
Kinds: usage 3, import 2, export 1
Page: 1/1
Sort: path, line

src/
├── checkout/CheckoutService.ts
│   ├── 3: import { PaymentProcessor } from "../payments/PaymentProcessor"  [import]
│   └── 44: const receipt = await PaymentProcessor.charge(order)  [usage]
├── payments/
│   ├── index.ts
│   │   └── 2: export { PaymentProcessor } from "./PaymentProcessor"  [export]
│   └── RefundService.ts
│       ├── 6: import { PaymentProcessor } from "./PaymentProcessor"  [import]
│       └── 29: await PaymentProcessor.refund(paymentId)  [usage]
└── tests/payments/PaymentProcessor.test.ts
    └── 18: expect(await PaymentProcessor.charge(order)).toEqual(receipt)  [usage]
```

Preview rules:

- one preview line by default
- trim long lines by default
- preserve the matched symbol in the trimmed preview when possible
- full lines can be requested explicitly

Example:

```bash
symnav refs src/payments/PaymentProcessor.ts::PaymentProcessor --full-lines
```

## `overview`

Purpose:

```text
Show the symbol structure of a file.
```

`overview` replaces the earlier `symbols` command name.

`overview` shows:

- private/local symbols
- signatures
- line ranges
- nested symbol hierarchy

Default depth:

```text
0
```

`--depth n` renders n child levels below each top-level entry. Every node type charges the
same: class members, function-local declarations, and fold interiors all cost one level.
Default output is top-level entries only.

Example, `overview src/checkout/CheckoutService.ts`:

```text
Overview: src/checkout/CheckoutService.ts

8: MAX_RETRY_ATTEMPTS
8: const MAX_RETRY_ATTEMPTS: number

12-96: CheckoutService
12: class CheckoutService

98-112: createReceipt
98: function createReceipt(order: Order, payment: Payment): Receipt
```

Same file at `--depth 1`:

```text
Overview: src/checkout/CheckoutService.ts

8: MAX_RETRY_ATTEMPTS
8: const MAX_RETRY_ATTEMPTS: number

12-96: CheckoutService
12: class CheckoutService
├── 24-34: CheckoutService::constructor
│   24: constructor(paymentProcessor: PaymentProcessor, inventory: InventoryService)
├── 42-78: CheckoutService::processPayment
│   42: async processPayment(order: Order): Promise<Receipt>
└── 80-94: CheckoutService::validateOrder
    80: private validateOrder(order: Order): void

98-112: createReceipt
98: function createReceipt(order: Order, payment: Payment): Receipt
```

Each signature line is prefixed with its source line number; a multi-line signature renders one numbered line per source line.

## `context`

Purpose:

```text
Show compact context around a symbol without dumping full reference output.
```

`context` includes:

- definition
- direct callers with previews
- direct callees with previews
- reference summary
- recent history summary

`context` does not include:

- full refs output
- mini graph
- full diffs
- full function bodies by default
- separate top signature for now

Sections with no results should be shown in `context`.

Example:

```text
Context: CheckoutService::processPayment
File: src/checkout/CheckoutService.ts
Lines: 42-78

Definition
src/checkout/CheckoutService.ts
└── 42-78: CheckoutService::processPayment  [implementation]
    async processPayment(order: Order): Promise<Receipt>

Callers
src/api/CheckoutController.ts
└── 58-72: CheckoutController::submitOrder  [call]
    return checkoutService.processPayment(order)

Callees
src/payments/PaymentProcessor.ts
├── 22-36: PaymentProcessor::charge  [call]
│   static async charge(order: Order): Promise<Payment>
└── 47-55: PaymentProcessor::recordReceipt  [call]
    static async recordReceipt(receipt: Receipt): Promise<void>

References
Total: 8
Kinds: call 3, import 2, test 3
Run: symnav refs src/checkout/CheckoutService.ts::CheckoutService::processPayment

Recent History
1. abc123f 2026-04-12 Alice
   add retry handling to payment processing

2. def456a 2026-03-29 Bob
   move checkout flow into CheckoutService
```

Callers/callees in `context`:

- use filesystem tree format
- show direct callers/callees only
- include one preview line
- are capped by default

Default cap:

```text
20 callers
20 callees
```

If more exist, output should point to `graph`.

## `graph`

Purpose:

```text
Show relationships around a symbol.
```

`graph` is the only v1 relationship-graph command. There is no separate `impact` command.

Defaults:

```text
Depth: 1
Direction: both
Edges: calls
```

Maximum depth:

```text
5
```

If a requested depth exceeds max, the tool refuses and explains how to continue from leaves.

Example:

```text
Cannot run graph with depth 12.
Maximum supported depth is 5.

To continue exploration:
1. Run with depth 5.
2. Pick a leaf symbol from the output.
3. Run graph again from that symbol.
```

No graph presets in v1.

Explicit flags:

```bash
symnav graph src/checkout/CheckoutService.ts::CheckoutService::processPayment
symnav graph src/checkout/CheckoutService.ts::CheckoutService::processPayment --incoming
symnav graph src/checkout/CheckoutService.ts::CheckoutService::processPayment --outgoing
symnav graph src/checkout/CheckoutService.ts::CheckoutService::processPayment --depth 2
```

Graph nodes are shown under file paths with line ranges, symbol paths, and signatures when available.

```text
<line-range>: <symbol-path>
<signature>
```

Graph shows symbol nodes only. It does not show source preview lines.

Root stays at the top for both incoming and outgoing sections.

Example:

```text
Graph: CheckoutService::processPayment
File: src/checkout/CheckoutService.ts
Lines: 42-78
Depth: 2
Direction: both
Edges: calls

Incoming
src/checkout/CheckoutService.ts
└── 42-78: CheckoutService::processPayment
    async processPayment(order: Order): Promise<Receipt>
    └── src/api/CheckoutController.ts
        └── 58-72: CheckoutController::submitOrder  [caller]
            submitOrder(req: Request): Promise<Response>
            └── src/api/routes.ts
                └── 14-20: registerCheckoutRoutes  [caller]
                    function registerCheckoutRoutes(router: Router): void

Outgoing
src/checkout/CheckoutService.ts
└── 42-78: CheckoutService::processPayment
    async processPayment(order: Order): Promise<Receipt>
    ├── src/payments/PaymentProcessor.ts
    │   └── 22-36: PaymentProcessor::charge  [callee]
    │       static async charge(order: Order): Promise<Payment>
    │       └── src/payments/GatewayClient.ts
    │           └── 31-46: GatewayClient::capture  [callee]
    │               capture(payment: Payment): Promise<CaptureResult>
    └── src/orders/OrderRepository.ts
        └── 65-81: OrderRepository::markPaid  [callee]
            markPaid(orderId: string): Promise<void>
            └── src/database/Database.ts
                └── 18-34: Database::transaction  [callee]
                    transaction<T>(callback: TransactionCallback<T>): Promise<T>
```

Possible/low-confidence edges are included by default but labeled inline.

Example:

```text
Graph: SomeHandler::handle
File: src/handlers/SomeHandler.ts
Lines: 12-40
Depth: 1
Direction: both
Edges: calls

Incoming
src/handlers/SomeHandler.ts
└── 12-40: SomeHandler::handle
    handle(action: string): Promise<void>
    ├── src/callers/DirectCaller.ts
    │   └── 27-36: DirectCaller::callThing  [caller]
    │       callThing(): Promise<void>
    └── src/routing/DynamicRouter.ts
        └── 44-58: DynamicRouter::dispatch  [possible: dynamic property access]
            dispatch(action: string): Promise<void>

Outgoing
src/handlers/SomeHandler.ts
└── 12-40: SomeHandler::handle
    handle(action: string): Promise<void>
    ├── src/services/KnownService.ts
    │   └── 18-26: KnownService::run  [callee]
    │       run(): Promise<void>
    └── src/handlers/HandlerRegistry.ts
        └── 33-48: HandlerRegistry::dispatchAction  [possible: dynamic property access]
            dispatchAction(action: string): Promise<void>
```

Repeated symbols are not hidden if they appear through different paths. Path information matters.

If repetition is significant, include a compact note:

```text
Note: 3 symbols appear in multiple paths.
```

Graph pagination is path-based.

For the same workspace state, query, direction, depth, and page settings, graph pages must contain the same paths in the same order every time.

Graph output should prioritize shorter paths before deeper paths. When paths are otherwise equivalent, sort by canonical symbol ID.

Default graph page size:

```text
100 paths
```

Depth and pagination are separate:

```bash
symnav graph src/checkout/CheckoutService.ts::CheckoutService::processPayment --depth 3 --page-size 100
```

This means:

```text
Explore up to 3 hops.
Show the first 100 resulting paths.
```

## Final V1 Command Summary

```text
resolve
Find matching symbols/files for a user-provided name.

def
Show where a symbol is defined, including implementation/declarations/overloads when relevant.

refs
Show all references to a symbol, excluding its own definition/declaration.

overview
Show the symbol hierarchy inside a file with signatures and line ranges.

context
Show compact symbol context: definition, direct callers/callees, reference summary, and recent history summary.

graph
Show a configurable call relationship graph around a symbol.
```


# plans/000/symnav-stages.md

# Symnav Implementation Stages

This document is the implementation roadmap. It defines **what** we build, **why**, and **in what order** — at the level a product or architecture review needs. It deliberately contains no code, no types, and no interface signatures; those live in the implementation itself and in per-stage planning notes.

The functional contract (what the product *does*) is in [`symnav-functional-spec.md`](./symnav-functional-spec.md). This document is about the *journey* to that contract.

---

## Guiding Principles

These principles override convenience at every stage. When a stage's scope and a principle conflict, the principle wins and the scope shrinks.

- **TDD throughout.** Every behavior is specified by a failing test before it has an implementation. This applies to unit, integration, and end-to-end tests alike.
- **Loose coupling.** Modules depend on the smallest possible surface of their collaborators. Package boundaries enforce this physically; folder conventions do not.
- **High cohesion.** Each module and package has a single, articulable reason to exist. If you cannot describe a module's purpose in one sentence, it is doing too much.
- **Separation of concerns.** Computing *what* to show, *how* to show it, and *how to talk to a language toolchain* are three different concerns and live in three different packages.
- **Abstraction.** Cross-package contracts are stated in terms of intent (what is asked), not mechanism (how it is computed).
- **Iterate vertically.** Every stage produces a working, releasable slice through the full architecture. No stage produces only scaffolding for a later stage.

---

## Architectural Recap

The architecture is locked. Stages are framed against it.

- **Repo:** pnpm workspace.
- **Deployable unit:** `apps/cli` — the `symnav` binary, published to npm. It composes the production packages and owns command-line syntax, environment resolution, and printing.
- **Library packages:**
  - `packages/core` — command logic, the in-memory result model (IR), workspace services, the language-backend interface. Owns the contracts other packages depend on. Depends on nothing internal.
  - `packages/daemon` — owns portable host contracts plus daemon client, launch/election, registry, transport, process and worker entries, execution/delivery, resources, diagnostics, lifecycle, policy, and the read-only testing surface. It has no internal dependencies.
  - `packages/renderer` — turns core IR and daemon lifecycle reports into human-readable output (Unicode tree) and structured output (JSON). Depends only on `core` and `daemon`.
  - `packages/backend-typescript` — the TypeScript implementation of the language-backend interface. The only package that knows about ts-morph, tsserver, or anything TypeScript-toolchain-specific.
  - `packages/telemetry` — captures and aggregates shape-only usage data. Depends on nothing internal.
  - `packages/testing` — private test utilities and fixtures. Depends on nothing internal and is available only to test code.
- **Process model:** navigation can run cold per invocation or through a persistent daemon. The daemon wraps the same command logic through a portable host contract rather than reimplementing navigation.
- **Configuration:** none. Conventions and CLI flags only. `.gitignore` is honored as the workspace-ignore source of truth.

The completed daemon-architecture milestone places daemon mechanisms, process and worker entries, policy, and read-only testing access behind the zero-internal-dependency `@symnav/daemon` boundary. The CLI retains command-line syntax, environment resolution, composition, and printing.

---

## Stage 0 — Project Foundations

**What we deliver.** A working monorepo with all four packages scaffolded, a test runner wired across them, lint/format/typecheck green on an empty repo, and a working CI signal. No command logic. No CLI behavior beyond a `symnav --version` smoke check.

**Why this stage.** TDD requires the test harness to be the very first thing that exists. Lint rules enforcing the dependency direction (`renderer` cannot import `backend-typescript`, etc.) need to be in place before any code is written, otherwise violations accumulate and the principle becomes aspirational. Every later stage assumes a green pipeline; that assumption has to be true at stage 1, not stage 3.

**In scope.**
- pnpm workspace, four packages with the locked dependency direction.
- Test runner shared across packages with a documented convention for unit, integration, and end-to-end tests.
- A fixture-project convention under a top-level fixtures location, with one trivial fixture used as a smoke test.
- Lint rules that enforce the inter-package import graph and fail CI on violation.
- A repository-level CLAUDE-style contributor guide pointing at this document.
- CI configuration sufficient to run lint, typecheck, and test on every push.
- The `symnav` binary exists and prints its version.

**Out of scope.** Any of the v1 commands. Any language-backend behavior beyond the existence of the interface in `core`. Publishing to npm.

**Done when.** A new contributor can clone the repo, run a single install command, and watch the test suite pass. Adding a violating import (e.g. `renderer` importing `backend-typescript`) breaks CI.

**Remarks (post-drill-down, 2026-05-03).** During Stage 0 planning the following adjustments were made to the original scope above. They refine, not replace, the text:
- **Five packages, not four.** A private `packages/testing` package (published as `@symnav/testing`, never released to npm) is added alongside `apps/cli`, `packages/core`, `packages/renderer`, and `packages/backend-typescript`. It owns the fixture loader, shared test helpers, and the fixture projects themselves. It may depend on `@symnav/core` (for IR types). It is permitted as an import only from test files in other packages; the ESLint boundary rule and TS `tsconfig.test.json`-only references enforce that.
- **Fixtures live under `packages/testing/fixtures/`,** not at a top-level fixtures directory.
- **Toolchain locked.** Node 20+, ESM-only, TypeScript built with `tsc --build` + project references (no bundler). pnpm version pinned via `packageManager`. Vitest as the test runner. ESLint flat config + `eslint-plugin-boundaries` + Prettier-via-ESLint. GitHub Actions on Linux/Node 20, single-version matrix. `commander` for CLI argument parsing. `tsx` for dev-time CLI execution.
- **Two-layer dependency-direction enforcement.** Layer 1: ESLint `boundaries` rule with a test-file exemption for `@symnav/testing`. Layer 2: TypeScript project references — `packages/renderer`'s `tsconfig.json` literally cannot resolve `@symnav/backend-typescript`. ESLint provides clear early errors; project references are the unbypassable structural backstop.
- **Editor config committed.** `.vscode/settings.json` (formatOnSave + Prettier default + ESLint fixAll) and `.vscode/extensions.json` (recommend Prettier + ESLint extensions) are part of Stage 0 to give contributors a consistent dev experience. CI is still the source of enforcement.
- **AGENTS.md is the contributor guide** (with `CLAUDE.md` symlinked). It points readers at the functional spec and stages doc for product/roadmap context, lists day-to-day commands and test conventions, and restates the dependency-direction rule near the bottom.

---

## Stage 1 — `overview`

**What we deliver.** A working `symnav overview <file>` command that prints the symbol structure of a single TypeScript file: hierarchy, signatures, line ranges, matching the format described in the functional spec. Honors `.gitignore`. Supports the `--json` flag. Output is deterministic and stable across runs.

**Why this stage.** `overview` is the smallest command that exercises every layer of the architecture end to end: the CLI parses a file path, the command logic asks the language backend for the file's symbols, the IR is assembled, the renderer prints it. It needs **zero cross-file resolution**, no references, no graphs, no pagination, no symbol-ID resolution beyond what a single file produces. It is the walking skeleton.

This stage's real output is not just a working `overview` — it is the IR shape, the renderer's rendering rules, the language-backend interface contract, the fixture-test rhythm, and the TDD rhythm itself. Every later stage builds on those decisions, so we let `overview` drive them.

**In scope.**
- Workspace root detection (nearest `.git` ancestor; `--cwd` override).
- Ignore-aware file access shared by `core`.
- The language-backend interface's first method: producing a file's symbol structure.
- The TypeScript backend's first implementation of that method.
- The renderer's first surface: a file overview as a Unicode tree, plus a JSON variant.
- End-to-end snapshot tests against fixture projects covering: a class with methods, top-level functions, top-level constants, nested symbols, an ignored file (rejected), an empty file.

**Out of scope.** Any command other than `overview`. Pagination. Symbol-ID resolution across files. Overload disambiguation as a first-class concept (single-file overloads can be displayed but the full canonical-ID rules are deferred to Stage 2).

**Done when.** Every output example for `overview` in the functional spec, given an equivalent fixture, is produced byte-for-byte. The same query against the same workspace produces identical output every time. CI is green.

---

## Stage 1.5 — Foundation Hardening

**What we deliver.** No new command. A consolidation pass over the code Stage 1 shipped, locking the IR contract and the workspace/CLI scaffolding before Stage 2 multiplies them across three more commands. Seven targeted deepenings, each independently landable, each leaving the `overview` command behaviourally identical.

**Why this stage.** Stage 1 was the walking skeleton — its real output was the IR shape, the renderer rules, the language-backend interface, and the CLI scaffolding. Those decisions were made under the pressure of shipping one command. Stage 2 (`resolve`, `def`) is the first stage to *consume* them: two commands that reuse the IR, the workspace path-resolution dance, the error-routing scaffold, and the renderer-selection logic. Every shallow seam left in place now gets copied two-to-four more times before Stage 5. The cheapest moment to deepen a seam is before it has callers; that moment is now.

This stage deliberately breaks the *letter* of the "iterate vertically" principle — it produces no new user-facing slice — but honours its *spirit*: it keeps the architecture honest so later vertical slices stay cheap. It is not scaffolding for a later stage; it is deepening of code already in production.

**In scope.**

- **Self-rendering errors.** Error types carry their user-facing context at the point they are thrown and own how they render into the spec's "Cannot answer:" voice. The CLI's per-error type-check ladder and the multi-overload error formatter collapse to a single dispatch.
- **Workspace-owned input-path resolution.** The resolve-relative / file-exists / inside-workspace / not-ignored sequence becomes a single workspace operation that returns a workspace-relative path or fails. Every later command starts from that one call instead of re-implementing the policy.
- **Workspace construction collapses to a factory.** The `Workspace` interface plus its abstract base plus its two zero-override concrete subclasses become a single `createWorkspace` factory over an injected file-system port — the shape the Stage 1 plan originally called for. The unused polymorphism leaves the `@symnav/core` public surface.
- **A shared command pipeline.** Workspace lifecycle, error dispatch, output-stream selection, and exit-code policy move out of the `overview` action into one reusable command-runner seam. Each command then supplies only its result-computing function and its renderer pair.
- **Ignore rules consolidate behind one module.** The four-file ignore cluster and the `.git/` rule currently duplicated in two places become a single workspace-ignore module with a build step and an `isIgnored` query. Three internal types leave the `@symnav/core` public surface; one cohesive type replaces them.
- **Signatures become line arrays.** A symbol's signature in the IR becomes an ordered list of single-line strings rather than one possibly-multi-line string. The language-backend interface enforces single-line-per-element; the renderer applies tree glyphs and indentation per line. Includes the multi-line renderer test deferred during Stage 1.
- **Symbol kinds split into role and native label.** The IR's symbol-kind field stops hard-coding TypeScript-specific labels. It carries a small language-agnostic role — the few buckets the renderer actually reasons about — plus a backend-supplied native label for faithful display. The TypeScript-flavoured label set moves into the TypeScript backend, so `core` need not change when a future backend lands.

**Out of scope.** Any new command. Any change to `overview`'s observable output for inputs Stage 1 already handled — multi-line signatures are new *correct* output, not a change to existing output. New language backends; the symbol-kind split makes `core` ready for them but adds none.

**Done when.** All seven deepenings have landed. `overview` produces byte-identical output to Stage 1 for every Stage 1 fixture. The `@symnav/core` public surface exports only what cross-package callers use. CI is green. A contributor adding a Stage 2 command reuses the command pipeline, the workspace path-resolution call, and the self-rendering error types without re-deriving them.

---

## Stage 2 — `resolve` and `def`

**What we deliver.** A working `symnav resolve <name>` (with optional fuzzy matching) and `symnav def <symbol-id>`. `resolve` produces matching symbols and files in two sections; `def` produces the locations a symbol is defined, including overload signatures, declarations, and multiple implementations when the symbol is a contract or base.

**Why this stage.** These two commands together validate the **canonical symbol ID** as the project's central identifier. `resolve` is what produces canonical IDs for downstream commands; `def` is the first command to consume them. Pairing them in one stage forces the round-trip to be correct: a symbol surfaced by `resolve` must be queryable by `def` without any additional lookups.

This is also the stage where overload disambiguation becomes real. The functional spec prescribes a specific shape (e.g. an overload-1/overload-2/implementation form) and the rules for how IDs survive across edits to a file are decided here.

**In scope.**
- Symbol-name lookup, exact and fuzzy modes.
- Canonical symbol ID composition rules, including overload disambiguation, decided and locked.
- Multi-implementation discovery (interface methods, abstract methods, base classes).
- Renderer surfaces for `resolve` (two-section output) and `def` (kind-tagged definition tree).
- Fixture coverage for: ambiguous names producing the spec's stop-and-show-candidates behavior, overloaded functions, an interface with multiple concrete implementations, a name that matches symbols and files both, a name that matches nothing.

**Out of scope.** References. Callers and callees. Pagination beyond what these commands trivially require.

**Done when.** Any canonical ID surfaced by `resolve` is accepted by `def`. Ambiguity behavior matches the spec: the tool stops and shows candidates, never guesses. Overload disambiguators are stable across re-runs on the same source.

---

## Stage 3 — `refs`

**What we deliver.** A working `symnav refs <symbol-id>` that lists every reference to a symbol across the workspace, excluding the symbol's own definition and declaration. References include imports, exports, type uses, test usages, and ordinary call/access sites — none of these are filtered. Output is paginated, stable, and matches the compact filesystem-tree format from the spec.

**Why this stage.** This is the first command requiring real **cross-file** semantic work. It also forces the project to confront pagination, stable sorting, reference-kind tagging, and preview trimming — all features that show up in later stages but are easiest to design correctly in the context of a single command first.

It is also the first stage where the "no stale data" guarantee meets non-trivial computation: stale results here would silently mislead an agent. The cold-per-invocation model has to demonstrably hold up.

**In scope.**
- Cross-file reference discovery via the language backend.
- Reference-kind classification (import, export, usage, test, etc.).
- Preview rules: trimmed by default, full lines on request, matched-symbol-preserved when possible.
- Pagination with the spec-defined defaults and stable ordering rules.
- Renderer surface for `refs`, including the compact filesystem tree with single-child collapsing.
- Fixture coverage for: a symbol with references in many files, a symbol referenced only by itself (zero true refs), a symbol used through re-exports, a symbol referenced from tests, pagination across page boundaries.

**Out of scope.** Callers/callees as a *graph* concept. Recent history. The `context` composition.

**Done when.** Same query, same workspace state produces identical pages. Page two contains the same results every time. No reference kind is silently filtered. Agents can rely on `refs` as the authoritative reference enumeration for v1.

---

## Stage 3.5 — Anonymous Usage Telemetry

**What we deliver.** Every command invocation appends one shape-only usage event to a global append-only log on the user's machine, and a hidden `symnav stats` command aggregates that log into a usage summary. No new navigation behavior. The six commands produce byte-identical output whether telemetry is on or off.

**Why this stage.** The tool now has four working commands and its first real user — its own author, using it for development. Before adding more surface in Stage 4, we want evidence of what is actually used and how. This stage builds the local measurement layer that produces that evidence. The cohort is small and known (the author plus a few trusted users), so this is private-beta instrumentation, not anonymous fleet analytics. A full endpoint-based collection pipeline is a deliberate later step; this stage builds only the capture and local-read halves, with an event schema designed to be the same one a future endpoint would ingest.

Doing this at 3.5 — before `context` and `graph` — means the two heaviest commands are measured from their first day, and the capture seam is locked while there are four call sites to thread it through instead of six.

**Design decisions (locked during grilling).**

- **Subject.** Small known cohort. Capture now, transport later. The local event schema is the upload schema — nothing is recorded locally that could not later be uploaded.
- **Capture point.** The single `runCommand` seam in `apps/cli`. One event per invocation, covering all three outcomes (success, user-facing error, crash).
- **Shape, not content.** Events record command, timestamp, duration, outcome, error reason (enum, not free text), which flags were set (not their string values), result-size counts, argument *shape* (kind and length bucket), `workspaceId`, `machineId`, `sessionId`, `symnavVersion`, and `schemaVersion`. Never symbol names, file paths, query strings, or source previews.
- **Identity.** `machineId` is a random UUID generated once and persisted to `~/.symnav/machine-id`. `workspaceId` is a hash of the git remote URL, falling back to an abs-path hash when there is no remote. The same workspace on two machines yields the same `workspaceId` and different `machineId`. Both are computed at the `runCommand` seam and handed to the recorder; the telemetry package never reads git itself.
- **Package.** A new `@symnav/telemetry` leaf package depends on nothing internal. It owns the `UsageEvent` type, the `Recorder` interface, a node append-file recorder with its own narrow write port (it does not reuse or extend `core`'s read-only `FileSystem`), and the stats aggregator. `apps/cli` gains it as an allowed dependency; `renderer` and `backend-typescript` never touch it.
- **Storage.** A single global JSONL file at `~/.symnav/usage.jsonl`, location built from Node's `os.homedir()` (cross-platform, no invented per-OS paths), the base dir overridable via `SYMNAV_STATE_DIR` for tests. One global file across all projects, grouped by `workspaceId` at read time.
- **Write semantics.** Synchronous append, one event per invocation, emitted after the result is known and before any `exit`. The recorder swallows every internal fault: a telemetry error never throws into the command path, never writes to stdout or stderr, and never changes the exit code.
- **Opt-out.** On by default. `SYMNAV_TELEMETRY=0` makes the recorder a fully inert no-op — no event built, no directory created, no file touched. Disclosure lives in the README; there is no runtime notice, to keep output clean and deterministic. The tool's own test suites default to disabled.
- **Reader.** `symnav stats` is registered but hidden from `--help`, keeping the agent-facing surface exactly the six navigation commands. It prints a usage summary (per-command counts and share, outcome breakdown, duration avg/p50/p95, distinct workspace count, version spread, date range) and supports `--json`. It does not record its own invocation.
- **Determinism.** The recorder takes an injected clock and id generator so events are byte-stable under test.

**In scope.**
- The `@symnav/telemetry` package: `UsageEvent` type, `Recorder` interface, node append-file recorder with its own write port, stats aggregator.
- Capture wired into `runCommand`, with `workspaceId`/`machineId` computed at that seam.
- The `SYMNAV_TELEMETRY` kill switch and `SYMNAV_STATE_DIR` override.
- The hidden `symnav stats` command (summary + `--json`).
- README disclosure of what is collected, where it is stored, and how to disable it.
- Tests at three layers: unit (event built correctly from injected clock/id, no-op when disabled, write errors swallowed, aggregator math), integration (real append and read-back against a tmp `SYMNAV_STATE_DIR`), e2e (built binary appends one correct line; `SYMNAV_TELEMETRY=0` writes nothing; command stdout/stderr/exit-code identical with telemetry on versus off).

**Out of scope.**
- Any network, upload endpoint, or transport. Getting a user's log to the author is manual export only.
- Any consent UI or runtime notice beyond README disclosure and the env kill switch.
- Log rotation or size cap.
- `stats` filter flags (`--since`, `--command`, `--workspace`).
- Any raw source identifier — symbol names, file paths, query strings, previews.
- Any change to the six commands' observable output.

**Done when.** Every command emits one shape-only event through the `runCommand` seam. `SYMNAV_TELEMETRY=0` makes telemetry fully inert. Hidden `symnav stats` aggregates the global JSONL into a usage summary. Telemetry faults never touch stdout, stderr, or exit codes. The six commands produce byte-identical output with telemetry on or off. The three test layers and CI are green.

---

## Stage 4 — `context`

**What we deliver.** A working `symnav context <symbol-id>` that produces the compact context block described in the spec: definition, direct callers with previews, direct callees with previews, a reference summary (counts and a hint to run `refs`), and a recent-history summary from git. Sections with no results are still shown.

**Why this stage.** `context` is a **composition** stage. It reuses everything stages 1–3 built — definition lookup, reference enumeration, the IR — and adds two new ingredients: direct caller/callee discovery (capped by default, with overflow pointing at `graph`) and a bounded read of git history. By the time we reach this stage the underlying capabilities are already correct, so this stage is mostly about composition discipline and the new git-integration surface.

Doing `context` before `graph` is intentional. `context` only needs *direct* (one-hop) callers and callees. Building that one-hop capability inside `context` first means `graph` in stage 5 inherits a tested traversal primitive instead of inventing one.

**In scope.**
- Direct caller and callee discovery via the language backend, with the spec-defined cap and overflow message.
- Bounded git-history retrieval for a symbol's containing file or symbol range.
- Renderer surface for the multi-section `context` output, including the empty-section handling.
- Fixture coverage for: a symbol with many callers (cap exceeded, overflow message present), a symbol with no callers, a symbol in a file with rich git history, a symbol in a file with no history (e.g. uncommitted), an isolated leaf symbol.

**Out of scope.** Multi-hop traversal. Path-based pagination. Possible-edge labeling.

**Done when.** Every output example for `context` in the functional spec is reproducible from a fixture. The reference summary's counts agree with running `refs` independently against the same symbol.

---

## Stage 5 — `graph`

**What we deliver.** A working `symnav graph <symbol-id>` with the spec's defaults (depth one, both directions, calls only) and the full set of explicit flags (`--incoming`, `--outgoing`, `--depth`). Multi-hop traversal up to the maximum supported depth, with the spec's refusal-and-explain behavior past the cap. Path-based pagination with stable ordering. Possible/low-confidence edges included by default and inline-labeled.

**Why this stage last.** `graph` is the heaviest command in v1. It compounds every prior capability — symbol resolution, definition lookup, caller/callee discovery — and adds **multi-hop traversal**, **path-based pagination**, **depth limits with a refusal pathway**, and **possible-edge classification**. Building it last means the underlying primitives are battle-tested by four prior stages of fixture-driven evidence.

**In scope.**
- Multi-hop traversal in either or both directions, calls-only edges, depth-bounded.
- Depth-cap refusal with the spec's explanatory output and continuation guidance.
- Path-based pagination with the spec's stable ordering: shorter paths first, ties broken by canonical symbol ID.
- Possible-edge detection (e.g. dynamic property access) and inline labeling.
- Repeat-path tolerance (do not hide repeated symbols on different paths) and the optional repeat note.
- Renderer surface for `graph`: incoming and outgoing sections, root at top, symbol-only nodes, no preview lines.
- Fixture coverage for: a deep-but-bounded call chain, a fan-in/fan-out pattern, a cycle, dynamic dispatch producing possible edges, depth exceeding the cap.

**Out of scope.** Anything in the spec's explicit V1-excludes list (`impact`, `history`, `diff`, `impls`, `search-text`). Graph presets. Edge kinds beyond calls.

**Done when.** All `graph` output examples in the spec are reproducible from fixtures. The same query/state/depth/page produces the same paths in the same order. Depth-cap refusal triggers exactly when expected.

---

## Stage 6 — Release Hardening

**What we deliver.** v1.0 published to npm: working install via `npm install -g`, working one-shot use via `npx`, a README oriented at agents, error-message review pass, performance baseline, and a contributor guide.

**Why this stage.** v1 is not done when the commands work; it is done when an external user (human or agent) can install and use it without context from the development team. This stage is short but real — packaging, install UX, and documentation are the difference between a working repo and a usable product.

**In scope.**
- Build pipeline producing a single publishable `symnav` package with workspace dependencies bundled.
- Install-and-use smoke test on a clean machine.
- Error message review across every command for consistency with the spec's voice (e.g. the prescribed "Cannot answer:" wording).
- Performance baseline: time-to-first-result measurements on representative project sizes, recorded as a starting point for future work.
- Agent-oriented usage documentation.

**Out of scope.** Daemon mode. Additional language backends. Any command outside the v1 list.

**Done when.** A clean machine can run `npm install -g symnav` and use every v1 command against a real TypeScript project. CI publishes successfully. The README is accurate.

---

## Beyond V1

These items are explicitly **not** part of the v1 plan. They are catalogued here so we don't quietly absorb them into earlier stages.

- **Daemon / persistent process.** Persistent execution wraps the existing command logic. The completed architecture refactor places daemon policy, mechanisms, process and worker entries, and read-only testing access behind the zero-internal-dependency `@symnav/daemon` boundary without changing command behavior.
- **Additional language backends.** Python (pyright), Go (gopls), Rust (rust-analyzer), etc. The `core` package's language-backend interface is the integration point. Adding a backend should not require touching `core`, `renderer`, or `apps/cli`.
- **Excluded commands.** `impact`, `history`, `diff`, `impls`, `search-text` are explicitly out of v1 per the functional spec.
- **Alternative renderers.** The `renderer` package's separation makes a future non-terminal consumer (IDE extension, web UI, alternative output format) a peer of the current renderer rather than a rewrite. We are not building one in v1.

---

## Stage Sequencing Summary

| Stage | Delivers | Primary new capability |
|---|---|---|
| 0 | Foundations | Working monorepo, test harness, enforced dependency direction |
| 1 | `overview` | The walking skeleton; IR + renderer + backend interface locked |
| 1.5 | Foundation hardening | IR contract, workspace factory, and error/pipeline scaffolding deepened before Stage 2 multiplies them |
| 2 | `resolve`, `def` | Canonical symbol IDs and overload disambiguation |
| 3 | `refs` | Cross-file reference enumeration and pagination |
| 3.5 | Anonymous usage telemetry | Shape-only event capture at the CLI seam + hidden `stats` reader |
| 4 | `context` | Composition + direct callers/callees + git history |
| 5 | `graph` | Multi-hop traversal and path-based pagination |
| 6 | Release | Distribution, documentation, performance baseline |
| Post-v1 | Daemon architecture | Persistent execution with an enforced daemon package boundary |

Each stage is independently releasable. No stage's scope expands to anticipate a later stage's needs.


# plans/005/daemon-architecture-functional-spec.md

# Symnav Daemon Architecture Functional Spec

## Goal

Restructure the merged daemon work so each concern lives in the package that owns it: a self-contained daemon package that knows nothing about symbols, a core that knows nothing about daemons, a TypeScript backend that holds only TypeScript-specific logic, and a CLI app that only composes. The daemon's user-facing behavior is defined in `daemon-functional-spec.md` and does not change. This is refactor work: not a rewrite of the daemon, not a change to any command's output or timing, and not a new language backend. This spec defines product behavior for contributors and hosts of the packages; implementation choices live in the phased plans.

## Primary User

**Contributors** changing symnav. Their default experience: a package boundary tells them where a concern belongs, and the build refuses an import that crosses the locked dependency graph.

**Hosts** composing the packages into a runnable product. The CLI app is the first host. A future host (editor extension, MCP server, benchmark harness) composes the same packages the same way. No host reaches into another package's internals.

End users of the `symnav` binary observe no change from this work.

## Core Guarantees

### Behavior is unchanged

This is a refactor. Every command, daemon lifecycle action, diagnostic record, telemetry event, and failure path behaves as it does today.

```text
Given the same workspace, arguments, environment, and daemon state, output bytes,
exit code, execution mode, and lifecycle outcome are identical before and after.
```

Correct: a restructuring change passes the existing e2e parity and daemon suites without touching a single expectation. Incorrect: a restructuring change "fixes" a queue, eviction, timeout, or path while moving code.

There is no "it was obviously a bug" override. Behavior defects found during restructuring are recorded in `daemon-follow-ups-functional-spec.md` and changed separately.

### The daemon package depends on nothing internal

The daemon package imports no other symnav package. It moves bytes for an executor it is handed; it does not know what a symbol, workspace snapshot, or backend is.

```text
@symnav/daemon may import: (nothing internal)
```

Correct: the daemon logs a worker's refresh counters as an opaque diagnostics record supplied by the executor. Incorrect: the daemon's protocol names a core type to describe those counters.

There is no exception for "just a type".

### Core knows nothing about daemons or processes

Core answers questions about a workspace and its symbols. It has no concept of a background process, socket, registry, warm-up, or route. Retaining state across requests means keeping a core object alive; core does not ask its host how to persist anything.

```text
Core has no persistence port, no daemon port, and no notion of warm vs cold.
Warm = the same session object answers again. Cold = a new session object.
```

There is no persistence abstraction until a second consumer of one exists.

### A language backend holds only language-specific logic

A concept that another language could share lives in core as a base the backend extends. The backend supplies only what depends on the language's toolchain.

```text
Shared in core: file revision tracking, prepared-file index, declarations-by-identity,
transactional index publication, project-membership graph with input invalidation,
turn-scoped query cache lifecycle.
TypeScript-only: extraction from TypeScript syntax trees, tsconfig parsing (extends,
references, path aliases, include/exclude), program and language-service creation,
semantic query bodies.
```

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

This restates the no-tuning rule from `daemon-functional-spec.md`; it is not relaxed here.

## Scope

### Included

- New `@symnav/daemon` package owning entry points, process launch, election, registry, transport, worker threads, admission, queueing, delivery, spooling, resource supervision, lifetime, diagnostics, and its own clock.
- Executor contract defined by the daemon package; CLI implements it.
- Executor reaches the daemon's worker as an injected module location, dynamically loaded.
- CLI keeps argv classification and hands the daemon client a workspace root plus argv.
- Core `WorkspaceSession` replacing the CLI's request-scope factory.
- Core revisioned-backend base, project-graph base, turn-scoped cache; TypeScript backend extends them. `WorkspaceSourceCache` moves to core.
- State-directory resolution moves from telemetry to the CLI; telemetry and daemon receive a path.
- Daemon lifecycle rendering moves to `@symnav/renderer`.
- Admission and client routing restructured as ordered guard lists with one closed rejection vocabulary.
- `WorkspaceDaemon` split into process coordinator, accepted-execution session, delivery session, worker-generation manager, activity projector.
- `LocalDaemonTransport` split into codec/validator, lifecycle client, execution client, result receiver, socket client, socket server.
- One owner each for command-name vocabulary, lock-ownership check, retry-safety decision, and `DaemonExecutionFailureCode` (worker variant renamed).
- Dependency table, ESLint boundaries, project references, meta-tests, `CLAUDE.md`, and `symnav-stages.md` updated together with the package introduction. Telemetry added to the table.

### Excluded

- Any change to navigation command output, exit codes, or `daemon start|status|stop` output.
- Renaming `@symnav/renderer`. Revisit when a second output family exists.
- A persistence port in core or an on-disk index for cold runs.
- New CLI flags or environment variables.
- A second language backend.
- Any restructuring that changes an e2e parity or daemon suite expectation.
- Behavior changes surfaced by the reviews. Specified in `daemon-follow-ups-functional-spec.md`; they land after this restructuring.

## Interaction Model

### What a host provides to the daemon package

- An executor: given argv, working directory, and telemetry flag, produces an ordered stream of stdout/stderr byte records and an exit code; can also release transient caches on request.
- The location of a module that constructs that executor, so the daemon's worker can load it in another thread or process.
- A state directory path.
- The product version, for compatibility checks.
- Per invocation: a workspace root and argv, or a control action (`start`, `status`, `stop`).

### What a host receives

- `execute(workspaceRoot, argv)`: a result identical in bytes to local execution, produced warm, cold, or by fallback. The host does not learn which route was taken except through the execution mode recorded for telemetry.
- `control(action)`: a lifecycle report the host renders.

### What a host must not do

- Read or write registry, socket, spool, or log files directly.
- Decide warm vs cold.
- Import from the daemon package's internal modules; only its public surface.

### Locked dependency graph

| Package                      | May depend on (internal)                                                          |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `@symnav/core`               | (nothing)                                                                         |
| `@symnav/daemon`             | (nothing)                                                                         |
| `@symnav/telemetry`          | (nothing)                                                                         |
| `@symnav/renderer`           | `@symnav/core`, `@symnav/daemon`                                                  |
| `@symnav/backend-typescript` | `@symnav/core`                                                                    |
| `symnav` (apps/cli)          | `@symnav/core`, `@symnav/daemon`, `@symnav/telemetry`, `@symnav/renderer`, `@symnav/backend-typescript` |
| `@symnav/testing`            | (nothing)                                                                         |

A forbidden import fails both `pnpm typecheck` and `pnpm lint`.

## Output Format

### Package layout after restructuring

```text
packages/core
  workspace, workspace session, revisioned backend base, project-graph base,
  turn-scoped cache, source cache, navigation IR, backend ports
packages/daemon
  entries, launcher, election, registry, transport (client, server, codec),
  admission, queue, ledger, execution session, delivery session, spool,
  resource supervisor, worker generations, lifetime, diagnostics, policy, clock
packages/backend-typescript
  TypeScript extraction, tsconfig graph, semantic queries
packages/renderer
  text and JSON formatters, including daemon lifecycle reports
packages/telemetry
  usage events, recorder, aggregation
apps/cli
  argv classification, environment resolution, dependency creation, entry
  module for the daemon executor, command registration, printing
```

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

**Purpose.** Let the daemon run commands without knowing what they are.

**Produces.** The daemon defines the executor's shape. The CLI implements it by re-parsing argv through the normal command program with retained backends. The CLI passes the location of its executor module; the daemon forwards it to the spawned process and worker thread, which load it and verify the expected export exists.

**Does not produce.** A typed navigation request. A second execution path that bypasses the command program.

**Edge cases.** Module missing or export absent: the worker reports a startup failure with a closed failure code; the daemon publishes failed startup; ordinary commands keep executing locally.

## Client Routing Boundary

**Purpose.** Keep CLI syntax in the CLI and daemon routing in the daemon.

**Produces.** CLI classifies argv into local, control, or workspace; extracts `--cwd`; resolves the workspace root via core. Daemon client receives the root and argv and decides warm, cold, cold-plus-trigger, or fallback.

**Does not produce.** A daemon that parses argv for anything but forwarding. A CLI that reads registry records.

**Defaults.** Unchanged from `daemon-functional-spec.md` routing table.

## Workspace Session in Core

**Purpose.** Make retention a core object rather than CLI wiring.

**Produces.** A session owning the workspace catalog and backends; prepares a scope (workspace, snapshot, router, refresh summary) for a start directory, with optional file selection. Cold runs create one per process; the daemon's worker keeps one alive.

**Does not produce.** Any persistence beyond the process lifetime.

## Revisioned Backend Base

**Purpose.** Move language-agnostic retention out of the TypeScript backend.

**Produces.** A core base that diffs file revisions, asks the subclass to prepare only added or changed files, publishes the index transactionally, tracks declarations by identity, and scopes a query cache to one turn. A core project-graph base that discovers configuration units, invalidates on input change, maps files to projects, and holds an inferred fallback project. The TypeScript backend extends both.

**Does not produce.** Changes to what any command returns. A second backend.

**Edge cases.** A backend that cannot prepare partially implements prepare as full rebuild; the base does not require partial support.

## State Directory and Clock Ownership

**Purpose.** Stop telemetry acting as a shared utilities package.

**Produces.** CLI resolves `SYMNAV_STATE_DIR` or `~/.symnav` once and passes the path to telemetry and daemon. Daemon owns its wall and monotonic clock. Telemetry keeps only its own path helpers.

## Lifecycle Rendering

**Purpose.** Keep all formatting in the renderer package.

**Produces.** Text and JSON rendering of start, status, and stop reports in `@symnav/renderer`, byte-identical to current output.

## Guard-List Admission and Routing

**Purpose.** Make the check order readable and each check testable alone.

**Produces.** Admission: an ordered list (authenticated, worker ready, memory not paused, not draining, not a conflicting duplicate) where the first failing guard stops with a rejection code. Routing: an ordered list (record present, not starting, version compatible, responsive) producing warm, cold with reason, or fallback with reason. One closed rejection vocabulary owns "safe to retry locally".

**Does not produce.** Chains for startup election, result delivery, or wire framing; those stay state machines.

## Summary

| Item                          | One line                                                                  |
| ----------------------------- | ------------------------------------------------------------------------- |
| `@symnav/daemon`              | Zero-dependency package owning every daemon concern                      |
| Executor contract             | Daemon-defined; CLI implements; injected as a module location            |
| Routing boundary              | CLI classifies argv; daemon client routes                                |
| `WorkspaceSession`            | Core owns retention as an object; no persistence port                    |
| Revisioned backend base       | Core owns revision diff, index, project graph, turn cache                 |
| State dir and clock           | CLI resolves path; daemon owns its clock; telemetry is a leaf            |
| Lifecycle rendering           | Moves to renderer; renderer may depend on daemon                          |
| Guard lists                   | Admission and routing as ordered guards with one rejection vocabulary    |
| Policy record                 | All thresholds in one object, reasons in `plans/005/daemon-policy.md`    |
| Behavior                      | Unchanged; defects found while restructuring are tracked separately      |
