# Validation record

Subject revisions: base `ba53c8e1662fd86d198b95321c90d9c9bef10184`, head `20838f8dbf413e04767543eb2380d0d114da6c60`.

The artifact explains ownership and decisions. These checks validate its sources and interactions; they do not constitute a verdict on the PR.

## Source and runtime evidence

- `pnpm exec tsc --build` succeeded in `worktrees/pr-148-head`.
- The 14 selected package test files passed: 153 tests. See [package-checks.log](package-checks.log).
- The compatibility-copy and package-boundary meta-test files passed: 8 tests. See [meta-checks.log](meta-checks.log).
- [route-probe.mjs](route-probe.mjs) executed the actual built `DaemonRoutingPolicy` and `DaemonRoutingContextState` on 14 constructed scenarios. Its recorded source hash matches the frozen source snapshot. No daemon process, registry file, socket, CLI command, or warmup operation was involved in this probe.
- The browser displays these recorded guard/callback events; it does not reimplement the routing policy or execute it live.
- The bundle diff contains exactly 153 files, +14,624/-815. Git rename records account for 37 mechanism test files moving from CLI source to daemon source.
- The evidence builder captured 247 base/head source snapshots and all 153 complete file deltas. Snapshot hashes use raw file bytes.
- Full-file SHA-256 matches establish that `daemon-command-dispatcher.ts` and `register-daemon-command.ts` are byte-identical in the two worktrees.
- All 60 named source references resolve; all decision and page references resolve; excerpt starts fall inside their source files.
- Both symnav worktrees had clean `git status --short` after the build, selected tests, and evidence capture.

The selected package test command, run in `worktrees/pr-148-head/packages/daemon`, was:

```sh
pnpm exec vitest run src/client src/registry/registry.test.ts src/process/process-coordinator-construction.test.ts src/lifecycle src/host-contract.test.ts src/entry-boundary.test.ts src/package-boundary.test.ts test/integration
```

The meta-test command, run in `worktrees/pr-148-head/meta-tests`, was:

```sh
pnpm exec vitest run src/daemon-compatibility-copy.test.ts src/daemon-package.test.ts
```

No full workspace suite, end-to-end parity suite, benchmark, or Windows run was performed.

## Browser checks

Playwright inspected the page served from its own folder on loopback at port 8912.

- Desktop viewport: 1440 × 1050. Mobile viewport: 390 × 844.
- All 24 decision dialogs opened. Each referenced excerpt/diff, available base/head source tab, and Escape close was exercised. No page script errors or empty evidence views occurred.
- All 14 route selections matched the captured route and callback counts. Rewind and Next guard reached the same recorded outcome and disabled advancement when the first decision ended the route search.
- Base/head diagram switching, file search, and source-diff navigation worked.
- No missing internal anchor targets, horizontal page overflow at either viewport, or remote asset requests were found. Wide evidence tables scroll inside their own container on mobile.
- The mobile source dialog stayed within the viewport. No local-storage records were written.
- JavaScript syntax checks passed for the page and authored content files.
- Screenshots capture the opening, desktop routing exhibit, and mobile routing exhibit.

The Playwright connector blocks `file:` navigation. A separate isolated system-Chrome headless `--dump-dom` attempt timed out at 40 seconds, so direct-file opening was not empirically verified in this session. That process was terminated, and no process bearing its temporary profile prefix remained. The page uses classic local scripts and CSS, without fetch, module imports, or external assets; the README also gives the loopback serving command used for the browser checks.

## Layering check

The complete brief contains all 24 authored decisions before the deeper mechanism sections. The opening itself carries the ownership shift and the staged consumer boundary; it is an orientation, not a substitute for the complete brief.

| Deeper exhibit | Decisions named in the complete brief |
| --- | --- |
| Host contract and process/thread diagram | D01–D03 |
| Compatibility staging and file hashes | D04–D06 |
| Ordered guard captures, route table, lifecycle composition | D07–D09 |
| Retry boundary, warm capture, controlled output | D10–D12 |
| Coordinator, registry authority, authentication, clock, idle timeline | D13–D17 |
| Test relocation, assertion removal, exports/lint, scan scope, serial files, Windows expectations | D18–D24 |

The only invented situation is the opening contributor symptom, marked as reconstructed. The idle timeline is marked illustrative. The guard exhibit explicitly distinguishes real executed code from constructed observations and recorded playback. Unexplained rationales remain unexplained, including when a broader architectural objective is stated.
