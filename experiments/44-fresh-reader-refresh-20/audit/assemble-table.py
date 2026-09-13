"""Join the unchanged page-only recall to the later, explicitly separate audit."""
from pathlib import Path
import json
import re

OUT = Path(__file__).resolve().parent.parent
locked = json.loads((OUT / "locked-recall.json").read_text())

# The two columns below were written after opening independent diffs.
# Never repair a mistaken teach-back in locked-recall.json.
audit = {
"01": {
    "after_diff": "**Corrections:** the stack's primary project is the **last** configured owner, not the first taught by x-graph-order [E11]. In the #127 tab, p-tests says an existing test release call gains await; the original five tests/helpers are actually byte-identical [E1]. **Omission on the read route:** the final CLI executor creates its own default policy despite the complete snapshot crossing daemon/worker boundaries [E12].",
    "rule4": "No observed authored-depth surprise. The wrong owner and test-edit facts are already in the top, so they are top-to-source contradictions; their correction must start there."
},
"02": {
    "after_diff": "**Missing consequence:** the parent now validates the serialized policy before spawning Worker, so malformed policy can fail synchronously in construction [E3]. The page does say that the parent reparses the snapshot; I learned the value flow without learning the changed failure boundary.",
    "rule4": "No observed surprise in the shapes descent. Parent reparsing was prepared; its earlier failure consequence remained implicit, including after descent."
},
"03": {
    "after_diff": "**Rationale correction:** choice 23 calls retirement unexplained, but the policy plan explicitly ties removing policy-testing to moving the mechanism tests [E7]. That does not explain the separate clock-scan scope. **Omission:** warm requests use the client's protocol constant rather than the record's version [E8].",
    "rule4": "No observed surprise in the load/test-surface drawers. Construction-time loading and the removed test surface are both present at the stopping layer; the retirement label needs correction in both places."
},
"04": {
    "after_diff": "**Correction to what I learned:** the PR body explicitly discloses an awaited release boundary, and the commit trail names it [E2]. Reconciliation with behavior preservation remains unexplained. The page itself gives that more accurate account in 4.8 / decision 1, after its stopping layer says the body is silent.",
    "rule4": "**FLAG — parent contradicts depth.** Top: “One failure path changed; PR body silent.” Depth 4.8: “The PR body shows it.” The latter changes the reader's understanding of whether the author disclosed the decision, rather than adding mechanism fidelity. [Captured page](reading/04-textbook-chapter-initial.txt), [E2]."
},
"05": {
    "after_diff": "**Missing consequence:** D02's deeper text says the main-thread wrapper now deserializes configuration, but does not teach that validation precedes Worker construction and can synchronously prevent spawning [E3]. The shared chunk ceiling alone did not prepare me for this failure boundary.",
    "rule4": "No observed surprise on D02. Its send/receive details refine the announced capacity path. The early-construction consequence is an audit omission, not a claim about a drawer I did not inspect."
},
"06": {
    "after_diff": "**Recall miss:** each cold/fallback attempt creates a fresh host executor with a no-op resource sampler [E13]. K6 and the host-options table already say this, but my compressed recall omitted it. The inspected page also correctly exposed planned helper retirement [E7], the warm protocol choice [E8], and stricter registry comparisons [E9].",
    "rule4": "No observed surprise. The overlooked executor lifetime was already in the open K6 record; the spokes add detail to it."
},
"07": {
    "after_diff": "**Omissions in the inspected PR stops:** #127's clear-before-await reason does not explain that backend settlement/rejection itself changes [E1–E2]. #131's separate counters do not announce the changed later-error selection [E4], or the storage stimulus changed by its adapters [E5]. The test-title scan explicitly disclaims coverage counting, but does not recover those choices.",
    "rule4": "No observed hidden explanation: these facts were absent from the read #127/#131 stops. The gap is that recorded PR decisions and file/test inventories do not form a complete decision layer."
},
"08": {
    "after_diff": "**Omissions on the read route:** #131 adds an earlier synchronous parent policy-validation boundary [E3]. The new #148 client chooses its own warm-request protocol version [E8]. The page does explicitly teach tightened registry outcomes [E9]; I did not independently rerun its spill or ownership probes.",
    "rule4": "No observed surprise in the expanded witness prose. The counterexamples are already announced above their evidence. The two omitted decisions remain audit findings."
},
"09": {
    "after_diff": "**Missing consequence in #131:** malformed worker policy can now fail in the parent's constructor before a worker is created [E3]. The #127 distinction between an explicitly requested barrier and the separate unexplained design choices survives the full six-file read [E1–E2].",
    "rule4": "No observed surprise in the mapped mechanism prose. The #127 awaited barrier was prepared. The #131 construction boundary was not learned on this route."
},
"10": {
    "after_diff": "No additional decision miss found in the complete #127 patch. In particular, the page prepared the distinction between cached identity and fresh projections, cache preservation after failed refresh versus rollback, and clear-now versus release settlement [E1–E2].",
    "rule4": "No observed surprise on the request/release route. Pending release permits refilling; that behavior is already declared above the replay."
},
"11": {
    "after_diff": "**Missing failure boundary:** parent-side snapshot validation now happens before Worker construction [E3]. The playbook of numeric recovery and test variations did teach the later-error and spill-stimulus changes [E4–E5], but not this additional synchronous failure point.",
    "rule4": "No observed surprise in the budget/spill/seam mechanisms. Hypothetical alternatives are distinguished from the recorded choices; the early failure point remains omitted."
},
"12": {
    "after_diff": "**Rationale correction:** retiring policy-testing has a recorded migration condition in the policy plan [E7]. **Omission:** the staged client sends its own protocol constant on warm execute [E8]. The page did prepare the narrower worker/version and timing witnesses visible in the test diff.",
    "rule4": "No observed surprise in the routing/test chapters. The mistaken retirement rationale is repeated as a gap rather than recovered by the inspected depth."
},
"13": {
    "after_diff": "**Missing failure boundary:** even this opening centered on changed errors and test evidence did not teach the new synchronous parent validation before spawning a worker [E3]. Changed reattachment errors and changed spill stimuli were successfully retained [E4–E5].",
    "rule4": "No observed surprise in the fixture expansion. Unlike page 27's route, this stopping register already makes loss of the old storage stimulus a decision."
},
"14": {
    "after_diff": "**Omission:** the final CLI executor independently constructs a default policy [E12]. **Recall miss:** raw-log redaction becomes a parsed-event check; the additional-choice sheet already names that [E10]. The sheet's **last configured owner** statement is correct [E11].",
    "rule4": "No observed surprise in the command/state/recovery chapters. I treated the required additional-choice sheet as part of the top; its log-test choice was missed in recall, not hidden at depth."
},
"15": {
    "after_diff": "**Omission:** parent construction gains synchronous policy validation before thread creation [E3]. This is a separate event boundary from the ping, admission and fetch timing scenes. The failed-fetch scene correctly avoids teaching a repeated-fetch loop merely from the numeric allowance.",
    "rule4": "No observed surprise in EOF-during-fetch or output-capacity scenes. Their added event detail refines choices in the eleven-card top."
},
"16": {
    "after_diff": "**Missing consequence:** the real #131 constructor can reject malformed serialized policy before spawning a worker [E3]. A package move model and injected dependency edges do not expose that changed failure time. The page does declare that dragging itself models static declarations.",
    "rule4": "No observed surprise when moving Transport. Its consequence list belongs to the hypothetical static move. The missing real failure boundary would need a top-level decision of its own."
},
"17": {
    "after_diff": "No additional decision miss found in the complete #127 patch. The audit confirms the new pending/rejecting release case and unchanged original tests [E1]. The recorded probe's controlled inputs are already distinguished from daemon execution.",
    "rule4": "No observed surprise in the release/scope observations. The pending barrier and continued handle usability are already in the nine-choice top."
},
"18": {
    "after_diff": "**Missing contrast:** canonical ownership also adds identity checks to formerly instance-only gates and tightens some post-write rereads [E9]; “one authority” alone did not teach the changed acceptance criteria. **Omission:** the new warm request uses the client protocol constant [E8].",
    "rule4": "No observed surprise in the inspected negative-space/idle/registry chapters. These omissions limit the preservation picture; no uninspected source link is counted as a tested descent."
},
"19": {
    "after_diff": "**Declared scope gaps against the full PR:** earlier constructor failure [E3], changed later-error selection [E4], and altered spill stimuli [E5] are outside the page's promised type-only view. The three added constructor double casts are also relevant to assignability evidence [E6]. The disclaimer was learned; the missing decisions were not.",
    "rule4": "**Declared incompleteness:** no hidden surprise was observed, but this stopping layer cannot be the complete #131 top required by rule 4. An honest scope disclaimer does not supply the excluded runtime/test decisions."
},
"20": {
    "after_diff": "**Omission from the contract recall:** three new consumer test fixtures use double casts that bypass normal constructor assignability [E6]. **Already learned:** P12 explicitly teaches the new synchronous validation before Worker creation [E3]; it is not a miss here.",
    "rule4": "No observed surprise in the inspected callable rows. The earlier failure boundary has its own parent decision. Unchanged public methods in the reference tables are context, not additional code decisions."
},
"21": {
    "after_diff": "**Omission on the read map:** inspector-based diagnostics remove raw-log size/backup observations and narrow secret checks to parsed events [E10]. The inspector boundary and ten retired CLI cases did not teach that particular test change. The host executor's independent default policy was explicitly prepared and retained [E12].",
    "rule4": "No observed surprise in the prose route. The film is labelled orientation and the decision map is the stopping layer, so the film's shorter account is not itself a violation. Audio was not evaluated."
},
"22": {
    "after_diff": "**Correction:** the open extra-choice sheet says first configured ownership, but primary lookup uses the last configured owner [E11]. **Omission:** the final CLI executor creates a separate default policy [E12]. The raw-log-to-parsed-event narrowing is already explicit in the top [E10].",
    "rule4": "No observed authored-depth surprise in the transfer station. The project-owner error is a top-to-source contradiction; the transfer controls refine the declared durability contract."
},
"23": {
    "after_diff": "**Rationale corrections:** policy-testing retirement is tied to test migration in the plan; CRLF normalization is tied to portable hashing in the commit trail [E7]. Their root U labels are too broad. **Omission:** warm execute takes protocolVersion from the client constant [E8].",
    "rule4": "No observed surprise on the clean D10 output/D12 authority descents. Exact failure messages and owner-match fields refine those announced contracts. The transient D04 capture is excluded from this judgment."
},
"24": {
    "after_diff": "No additional decision miss found in the complete #127 patch. The seven answers prepared the release settlement change, failed-refresh cache boundary and test accounting [E1–E2].",
    "rule4": "No observed surprise in the release or sharing paths. They refine the immediate clearing, later settlement and identity distinctions already visible in the seven answers."
},
"25": {
    "after_diff": "**Omission:** required policy reaches the worker parent through a deserialization step that can fail synchronously before worker creation [E3]. The pocket brief teaches policy flow and process crossings but not this change in failure timing.",
    "rule4": "No observed surprise in the sketch prompts or wire table. A completed sketch was not submitted, so this is a reading observation rather than a test of whether drawing improves recall."
},
"26": {
    "after_diff": "No additional decision miss found in the complete #127 patch. The drawers and promise tickets carried the independent-store, identity, throw/rejection, refresh and release decisions accurately [E1–E2].",
    "rule4": "No observed surprise in the lookup/release/projection chapters. Reusable drawers and old tickets are announced choices; the analogy's mechanics were not treated as executed code."
},
"27": {
    "after_diff": "**Learned only at depth:** the transport helper raises requested inline 0 to the default chunk cap, so an unchanged call need not exercise the former disk state [E5]. The independent source read makes this concrete: a 64 KiB partial output stays inline while the empty-directory assertion remains. **Further omission:** the early parent-construction failure [E3].",
    "rule4": "**FLAG — new test decision at depth.** Top row 05 names threshold-crossing/split-record adaptations. [Opened adapter row](reading/27-fixture.json) newly names the transport clamp and lost same-state premise. That changes which behavior the tests witness; it needs a parent clause [E5]."
},
"28": {
    "after_diff": "**Omission:** static reach did not expose the changed failure time when the parent deserializes policy before Worker creation [E3]. The page correctly warns that low reference counts can hide consequential choices, and uniquely made the three test-fixture double casts memorable [E6].",
    "rule4": "No observed surprise in the static-reach/fallback explanations. Their partial-count and seed limitations are declared above the result, not introduced to excuse a deeper mismatch."
},
"29": {
    "after_diff": "**Rationale correction:** C6 marks test-helper retirement unexplained despite the explicit migration condition in the policy plan [E7]. **Omission:** the new client selects its own warm protocol version [E8]. The proposed cuts remain explanatory, as the page declares; I did not attempt cherry-picks.",
    "rule4": "No observed surprise in the authority/dependency route. The removal belongs to the visible staging cut already; its provenance label is the error."
},
"30": {
    "after_diff": "**Recall miss:** graceful worker close precedes instance spool cleanup [E14]. Group 05 already teaches and points to the new gated process test for it. The source also confirms the once-read current-delivery promise and original acceptance metadata in the locked recall.",
    "rule4": "No observed surprise in the current-promise/two-stream route. The unretained shutdown order was already in the open nineteen-decision register, not a new detail revealed by the model."
},
"31": {
    "after_diff": "No additional decision miss found in the complete #127 patch. In particular, the page separates a stated clearing-order reason from unexplained reconciliation of the newly awaited backend barrier with preservation [E1–E2].",
    "rule4": "No observed surprise on the linked mechanism route. Generic method and record pages were not treated as additional subject reviews."
},
"32": {
    "after_diff": "No additional decision miss found in the complete #127 patch. The demo carries the identity/projection, lifecycle, API and ten-added/five-retained test decisions through to source [E1–E2].",
    "rule4": "No observed surprise on the demo mechanism path. Reusable components did not require a previously unannounced decision in this route."
},
"32s": {
    "after_diff": "**Explicit fragment:** the complete diff additionally contains release settlement, exact values/failures, refresh boundaries, files-only input and tests [E1–E2]. This starter intentionally teaches only lifetime ownership and links the full demo; it is not sufficient alone for #127.",
    "rule4": "No hidden surprise. The page labels itself a one-decision component example. Use the linked full demo for the whole-PR stopping condition."
},
"33a": {
    "after_diff": "No additional decision miss found in the complete #127 patch. The delayed-success opening is explicitly illustrative; the added source test uses a pending then rejecting graph, which the shared body correctly distinguishes [E1–E2].",
    "rule4": "No observed surprise through the shared release/lookup mechanisms. The top already separates clearing from completion and labels the illustrative execution."
},
"33b": {
    "after_diff": "No additional decision miss found against the shared #127 body and complete patch [E1–E2]. Reading this after opening A means its recall is primed; this cannot establish that the failure opening teaches better.",
    "rule4": "No observed surprise in the shared body. Its ten decisions are the same as A; changing the opening did not change their source support."
},
"34": {
    "after_diff": "**Omission:** the complete register did not teach the parent's new synchronous malformed-policy failure before a worker is created [E3]. Its evidence-first arrangement did prepare the changed later errors and altered test stimuli [E4–E5].",
    "rule4": "No observed surprise in the attached explanations. Embedded source strips were part of the page-only reading; the standalone patch was opened only after recall was locked."
},
"35": {
    "after_diff": "**Rationale correction:** record 03 says inspected plans gave no reason, but the immediate-base/head policy plan explicitly schedules retirement after tests move package-local [E7]. **Omission:** warm execute uses the client's protocol constant [E8].",
    "rule4": "No observed surprise in the retirement record. The deeper “record ends here” statement reinforces the incorrect missing-rationale label; it does not recover the plan evidence."
},
"36": {
    "after_diff": "No additional decision miss found in the complete #127 patch. The identity sheet and return lens successfully distinguish cached objects from new reference/position projections, and release waiting from clearing [E1–E2].",
    "rule4": "No observed surprise in the return lens. The differences are already identified in the contact sheet and twelve-choice register."
},
"37": {
    "after_diff": "No additional decision miss found in the complete #127 patch. The strong statement about five original tests and helpers is supported by an exact unchanged-suffix comparison, alongside six added service cases and four core cases [E1].",
    "rule4": "No observed surprise in the release/test threads at depth three. The pending/rejection barrier and original-test accounting are already announced on the surface."
},
}

assert set(audit) == {r["id"] for r in locked["rows"]}


def links(text):
    def replace(m):
        ids = m[1].split("–")
        if len(ids) == 2:
            nums = range(int(ids[0][1:]), int(ids[1][1:]) + 1)
        else:
            nums = [int(ids[0][1:])]
        return ", ".join(f"[E{n}](audit/source-witnesses.md#e{n})" for n in nums)
    return re.sub(r"\[(E\d+(?:–E\d+)?)\]", replace, text)


def cell(text):
    return links(text).replace("|", "\\|").replace("\n", " ")


intro = """# Fresh reader → diff: one table

The clearest observed rule-4 surprises are in **04** (the overview says the PR body is silent; the chapter says it discloses the change) and **27** (the deeper adapter account introduces a lost test stimulus). Other misses include earlier worker-construction failure, a warm-request protocol choice, incorrect primary-project ownership, and rationale that was present in the plan. Those are recorded separately below.

This table covers **39 rendered subject views from experiments 01–37**, finished at the cohort snapshot **2026-09-13 03:52 UTC**. It includes both openings of 33 and the labelled one-decision starter in 32. Multi-subject modes share a row where they are parts of one page. Critiques 38/41 and folders without a finished README at that cutoff are outside the cohort. Templates, evidence viewers, and generic method/kit documentation are supporting surfaces, not additional subject pages.

I read each page's declared stopping layer and the routes named in its row before opening independent bundle diffs. The middle-left column is copied **unchanged** from [locked-recall.json](locked-recall.json), locked at **04:05:51 UTC**; it deliberately preserves mistaken learning. Page-authored snippets were allowed, including 34's evidence strips. Standalone diffs and raw-source appendices were not used to repair that recall.

This is one reader moving through repeated subjects, not independent fresh readers. Later pages benefit from earlier ones. A compressed teach-back omitting a fact does not establish that the page omitted it; **recall miss**, **omission on the inspected route**, and **correction** are distinguished in the audit. Rationale gaps mean no specific reason in the inspected materials, not a claim about the author's private thinking. Reported probes on earlier pages were read, not rerun.

“No observed surprise” is bounded by the listed route, not a certification of every drawer. A rule-4 flag requires a captured parent→authored-depth change in decisions or meaning. Wrong facts at the top and decisions absent everywhere inspected are still problems, but are not relabelled as an observed descent. A first viewport is not automatically the top: explicitly required decision sheets count. The source receipts add precision to the findings already named in the table.

The diff pass read all six #127 files and the #131 production/test patch. For #148, the adjacent pair and the stack, it inspected the full changed-file inventories and selected production, contract, test and rationale hunks; it did not establish an exhaustive decision census. See [source witnesses](audit/source-witnesses.md), [reading captures](reading/), and the [README](README.md).

| Page / subject / route | Decisions learned before the independent diff | After the diff: misses, corrections, or bounded confirmation | Rule 4 on the inspected route |
| --- | --- | --- | --- |
"""

rows = []
for r in locked["rows"]:
    page = f'**[{r["id"]} · {r["folder"]}](../{r["folder"]}/{r["file"]})** — {r["subject"]}<br><br>{r["route"]}'
    if r["id"] in {"01", "20", "32s", "33b"}:
        capture = {"01": "01-pr127.json", "20": "20-pr131.json", "32s": "32-starter.json", "33b": "33-failure.json"}[r["id"]]
    else:
        capture = r["folder"] + "-initial.txt"
    page += f'<br><br>[Captured text](reading/{capture})'
    a = audit[r["id"]]
    rows.append("| " + " | ".join(cell(v) for v in [page, r["learned"], a["after_diff"], a["rule4"]]) + " |")

(OUT / "critique.md").write_text(intro + "\n".join(rows) + "\n")
(OUT / "audit/audit-findings.json").write_text(json.dumps(audit, ensure_ascii=False, indent=2) + "\n")
print(f"Wrote one table with {len(rows)} rows. Original learned text preserved.")
