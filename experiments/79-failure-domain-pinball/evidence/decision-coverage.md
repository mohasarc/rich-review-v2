# Scope and depth map

The complete authored stopping layer is the opening, machine, legend and seven open rules. The headline alone is not claimed to be complete. No game result unlocks another fact. The inspector adds exact implementation and observations to facts named in the open layer.

| Open rule | What the table carries | Deeper receipts | Reason boundary |
| --- | --- | --- | --- |
| 01: ownership | Package envelope spans caller/client and daemon owners; CLI host remains outside; worker is inside daemon process | cutover, old-client, old-failure, fallback | PR #149 and preservation intent in #133/#134/#142. No claim that all 26 PRs preserve all behavior. |
| 02: admission | Five numbered bumpers; one first-failure deflection; auth disconnect versus authenticated rejection | guards, admission-host, retry, guard-tests | PR #134 and architecture spec explain explicit order and non-mutating compatibility. Why this historical ordering was originally chosen is not explained in examined material. |
| 03: local authority | Brass flippers close at submission uncertainty and acceptance; only an authenticated safe rejection reopens them | transport, retry, fallback, admission-deadline, completion-deadline | Code-derived retry meaning in #134; no replay of accepted failures in #133; deadline purposes in policy record. |
| 04: accepted recovery | Blue outer return to admission; capture number changes; bypass around worker on duplicate attachment | reattach, close, identity, limits, recovery-tests | #142 and #147 explain fresh attempt capture and daemon-lifetime duplicate identity. First accepted-close preservation is explicit in #142 commits and code. |
| 05: transfer recovery | Separate blue delivery loop; capture number stays; fetch budget lamp changes | fetch, resume, manifest, ack, limits, budget-reasons | #142 explains separate numeric scopes. Policy record gives each budget a purpose, but does not compare exactly one with other possible bounds. |
| 06: failure domains | Lavender inner worker boundary; rose outer classifier and return; resource/capacity/exit variants deflect differently | failure, classify, old-failure, failure-tests | #133 explains distinct types, closed tuple, pure classification and identity facts. Original precedence policy has preservation intent, without a historical selection rationale. |
| 07: evidence boundary | Persistent simulation label, record viewer, state lamps without judgment | recovery-tests, guard-tests, failure-tests, raw observations, focused-tests, test-inventory | Three direct suites are added in #133/#134/#142 and have byte-identical bodies from first describe to EOF at tip. Other stack test changes are outside this bounded inventory. |

## What was actually executed

- Built `packages/daemon` with its `pnpm build` command at the supplied clean tip. Build outputs were already present initially; the recorder was rerun after the fresh build.
- Called actual compiled `DaemonAdmissionPolicy.decide` for five contexts and actual compiled `DaemonExecutionFailures.classify` for six failure contexts.
- Ran the actual compiled `DaemonExecutionClient` for 18 cases. Collaborators: real wire codec, real protocol validator, real result receiver (constructed internally), real output capture; scripted socket streams and an acknowledgement recorder. The two output records contain `alpha\n` and `beta\n`; no source-navigation command is executed.
- Compared identical reattachment frames, capture counts, disposal events, result-fetch offset 1, completion codes, and final transport retry permission. All recorder assertions passed.
- Ran four existing suites from the supplied worktree: 95 tests passed. These include a real generated 12 MiB result-transfer case inside the existing transport suite. The pinball's own fixtures are small and are not that test's output.

## What is projected

The browser never imports daemon code. It chooses among frozen cases and plays authored Phaser paths. Bumper order uses the recorded admission decision. The server duplicate bypass comes from the accepted-execution session source, not a recorded server. Local execution is a source projection from `retrySafe` and `executeWarm`, not an observed local command run. Worker failure facts are injected into a classifier; no worker was killed by this experiment. Distances, speeds, bounce and deflection force have no engineering units or timing meaning.

## Rationale search boundary

Read relevant bodies and commit subjects/bodies in `inputs/stack/pr.json` for #133, #134, #142, #147 and #149, with #148 migration context; relevant repository-rules bundle material; `plans/005/daemon-policy.md`; architecture spec goal, core guarantees and guard-list sections; functional-spec slow/busy, accepted replay and resource clauses; and the actual implementation/test witnesses. “Unexplained” means no specific explanation of the identified choice was found in that material. No implementing-agent conversation was supplied or inferred.

## Workspace incident

During a combined UI-edit/build command, a wrong working directory made the HTML edit fail and appended one new, untracked `packages/daemon/style.css` in stack-head. The file contained only the exact two CSS rules intended for this artifact. Its full contents were checked, then the newly created file was removed immediately; the UI edit was reapplied here. There were no pre-existing contents and no tracked Symnav source edits. Both worktrees are clean in the final static check. This transient write did violate the read-only boundary and is recorded rather than omitted.
