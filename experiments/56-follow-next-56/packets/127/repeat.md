<!-- system -->
You are an experienced software engineer reviewing a code change in a codebase you have never seen. You cannot open files, browse, or run code; everything available to you is in the messages. Answer every question with your best concrete prediction. Reply with JSON only, in the format requested.

<!-- user -->
The review page has since been revised. Below is the revised top part, again as 3 screenshot(s) and as extracted text.

[image: captures/127-promoted-top-1.png]

[image: captures/127-promoted-top-2.png]

[image: captures/127-promoted-top-3.png]

<page_text>
FIELD MANUAL / 26
Whole change
Mechanism
Evidence
symnav · PR 127

SCOPE SEMANTIC CACHES TO ONE TURN

Six drawers.
One clearing handle.
127

6 FILES
+391 / −67

Core takes over the lifetime of six semantic caches. TypeScript keeps the queries and chooses when to clear; the backend now waits for project release to finish.

LOSSY ANALOGY · POST OFFICE A drawer is a cache, a ticket is a stored value or promise. No mail delivery is being modeled.

BEFORE TypeScript counter

Same query clerk
query service · knows symbol lookups
definitions
↧
references
↧
call targets
↧
callers
↧
callees
↧
positions
↧

The clerk empties
all six by hand.

BACKEND RELEASE · ARCHIVE = PROJECT GRAPH
empty → tell archive → return
archive’s promise is not passed back

AFTER TypeScript counter

Same query clerk
query service · same lookup routines
definitions
—
references
—
call targets
—
callers
—
callees
—
positions
—
↳ one core-made clearing handle

Still six drawers.
Empty them together.

BACKEND RELEASE · ARCHIVE = PROJECT GRAPH
empty → tell archive → wait
finish or failure reaches the backend

Where the picture breaks: clearing removes cache entries, not work already running. A caller can still hold an old promise. The counter is not locked during release, so a later query can refill a drawer.

01 / THE WHOLE CHANGE
ALL DECISIONS BEFORE THE DETAIL
Eight things to carry away.

Stated = a reason exists in the supplied PR or plan. Unexplained = the choice is present, but no reason was found in the inspected inputs.

1
Move the clearing mechanism into core.
STATED

The language-neutral scope is reusable. Each TypeScript service still constructs and owns its own scope; algorithms, source cache and project graph stay in their existing roles.

Package & instance boundaries ↘
2
Keep six independent address spaces.
STATED

One scope, six typed handles, one map per handle. Existing keys and value types stay separate; a shared key never makes two query kinds share an entry. Callers and references still share one reference search per symbol within a turn.

Open all six drawers ↘
3
Keep the exact entries and failure behavior.
STATED

Reuse values and promises, including empties; the new generic primitive also accepts undefined. Rejected promises stay cached; synchronous factory throws are retried. Reference and position locations are still rehydrated on access.

Tickets, failures & projections ↘
4
Finish refresh before starting a turn.
STATED

Successful refresh clears all six, even for unchanged files. A failed refresh never reaches that clearing step, preserving the current semantic-cache turn. This ordering already existed.

Replay success or failure ↘
5
Clear first; await project release next.
STATED

Clearing stays synchronous. The service now returns a promise and the backend awaits it, so a pending or rejected graph release reaches the caller. The graph’s existing release order is unchanged: projects release one at a time, and a failing project stops the rest. Concrete TypeScript cleanup is synchronous, so only an asynchronous graph release can keep the backend pending.

Replay the changed barrier ↘
6
Clearing is reusable, not terminal.
UNEXPLAINED

No turn token, cancellation, closed flag or query lock. Both signals empty the same registered handles; repeated clearing is allowed. Old promises can settle without replacing new entries, and queries can refill during release.

The analogy’s limits ↘
7
Expose a small cache API; pass fewer inputs.
UNEXPLAINED

Core exports the scope and lookup-only handle type. Handles expose no clearing operation. The service’s beginTurn takes a file list instead of a full snapshot; this is documented without a separate rationale.

Exact public signatures ↘
8
Characterize, then extract.
STATED

Four new core tests and six new service tests pin the preservation contract. Five previous service tests remain with their assertions intact. The new pending/rejected-release case uses a graph test double; the real fixture also remains.

Test scope & source receipts ↘

You have the complete shape. Below: the same decisions, with the drawers open.
</page_text>

Answer the same questions again from this version, in the same JSON format. You may keep or change any answer.

Questions:
Q1. Within one turn (no refresh or release in between), a caller asks the TypeScript backend for the callers of symbol X, and then for the references to X. How many times does the underlying reference search run in total?
Q2. In the normal TypeScript backend (its own default project graph, no test doubles), semantic projects have loaded and a caller runs `await backend.releaseTransientResources()`. When does the project cleanup work itself run relative to that call, and does the caller's await now finish later than before this PR by roughly the time cleanup takes?
Q3. A workspace has two configured TypeScript projects, A then B, plus the inferred project; all are loaded. During `backend.releaseTransientResources()`, project A's cleanup throws. After this PR, what does the awaiting caller observe, and do project B and the inferred project get cleaned up?
Q4. Same failure as the previous question, but before this PR. What does the caller awaiting `backend.releaseTransientResources()` observe?
Q5. In one turn, `findDefinitions(X)` returns a promise that later rejects. The caller asks `findDefinitions(X)` again in the same turn. Does the definition search run again, and what does the caller receive?
Q6. After the failed release in question 3 (after this PR), a caller asks `findDefinitions(Y)` for a symbol whose definitions were cached before release started. Is that earlier cached entry reused?
Q7. symnav's daemon runs this backend inside a navigation worker thread and asks the worker to release transient resources when shedding memory. If the question-3 failure happens there, what does the daemon observe from the worker before this PR, and after it?
