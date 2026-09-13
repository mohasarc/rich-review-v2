<!-- system -->
You are an experienced software engineer reviewing a code change in a codebase you have never seen. You cannot open files, browse, or run code; everything available to you is in the messages. Answer every question with your best concrete prediction. Reply with JSON only, in the format requested.

<!-- user -->
symnav is a TypeScript code-navigation tool: a CLI plus a background daemon process that executes navigation commands for a workspace. The change under review is PR #148, "Own daemon mechanisms behind DaemonClient", layer 25 of a 26-PR daemon refactor stack (153 files, +14,624/-815).

You have not seen any explanation of this change. Predict from what you would expect of such code.

Questions:
Q1. A host constructs the new `DaemonClient` and leaves out its optional `policy` option. Which startup, transport and output limits does the client then use, and where do they come from? Does construction fail?
Q2. Suppose the client's Node-backed runtime module fails to load. The host constructs one `DaemonClient`, then calls `execute()` twice. Does the constructor throw? What do the two calls observe, and does the second call try to load the runtime again?
Q3. For each daemon request kind below, which of these must match before the daemon acts on the request: protocol version, instance id, process token? (a) ping (b) stop (c) execute (d) result-fetch (e) terminate
Q4. The daemon has accepted an `execute` request, then the connection closes before the result arrives. Does `DaemonClient.execute` rerun the command locally?
Q5. After this PR, does the shipped symnav CLI send its commands through the new `DaemonClient`?

For each question give:
- "prediction": your concrete answer (at most 80 words)
- "basis": "page" if words on the page support it, otherwise "inference"
- "quote": if basis is "page", the exact words from the page you relied on (at most 30 words); otherwise ""
- "confidence": 0-100

Reply with only this JSON: {"answers":[{"id":"Q1","prediction":"...","basis":"page","quote":"...","confidence":80}]} with one entry per question.
