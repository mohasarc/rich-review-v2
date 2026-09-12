# Orchestrator log

## 2026-09-13

- Started unattended run. Read `philosophy.md` before the complete `playbook.md`.
- Decision: interpret the playbook's required `git fetch` and `git worktree add` as narrow setup exceptions to the no-symnav-mutation rule. No tracked symnav files or branch commits will change; worktrees stay detached and only build output may be written.
- Decision: alternate Codex and Claude by brief number because both harnesses are installed. Codex uses `gpt-6-astra` with maximum reasoning; Claude uses `opus` with maximum effort. If either model is unavailable, the worker logs the failure and requeues once with that harness's strongest configured/default model.
- Decision: keep concurrency at five as required. The supervisor owns stall recovery, recurring critiques, queue generation, README checks, index regeneration, and experiment commits.
- Setup note: first parallel build dispatcher used a zsh-exported function from Bash workers, so no builds ran. Retried all eight worktrees with Bash; this was an orchestration failure, not a worktree build failure.
BUILD OK pr-131-head
BUILD OK pr-127-base
BUILD OK main
BUILD OK pr-127-head
BUILD OK pr-131-base
BUILD OK pr-148-head
BUILD OK pr-148-base
BUILD OK stack-head
- Resume note: all eight detached worktrees and successful build logs were already present. Skipped a redundant fetch, install, and build to avoid unnecessary writes and preserve unattended time.
- Decision: recurring critique and fresh-reader runs get new numbered folders instead of overwriting experiments 38 and 39. This preserves the one-run/one-folder rule and makes each refresh independently inspectable.
- INPUT OK pr-127: 6 changed TypeScript files, a1e325a5...64919bcb
- INPUT OK pr-131: 60 changed TypeScript files, b3a6c4fa...b100221d
- INPUT OK pr-148: 144 changed TypeScript files, ba53c8e1...20838f8d
- INPUT OK stack: 233 changed TypeScript files, b6801ebd...d0700235
