# Run log (UTC)

- 06:10 read philosophy, playbook, brief; traced brief to 55's next step; read 55 README/table/witnesses C1 P1 M1 M2 M3, 49 README/protocol.
- 06:20 reader harness pilot: `claude -p --model claude-opus-5 --tools "" --safe-mode --strict-mcp-config --system-prompt ...` reports no tools, no file access.
- 06:27 decided two arms: pr-127 on page 26 (assigned subject), pr-148 on page 23 (the default + credential items 55 named). Page 40 and 24 rejected as pr-127 page: their tops already state the target facts (ceiling).
- 06:35 truth/127/probe.mjs on base+head builds: shared reference search, synchronous concrete cleanup, sequential stop, caller outcome, unhandled rejection at base.
- 06:45 truth/127/daemon-worker-probe.mjs (adapted from 04): first `refs src/lib.ts:target` argv failed to resolve (exit 1, no project load, no injection) -> switched to `refs target`. Injection first stayed installed (second release also failed) -> made one-shot. Final: base worker replies heap then thread exits with error; head replies resource failure, stays alive, later release succeeds.
- ~06:35 page copies + promoted variants (scripts/prepare-pages.py). Layout: first D13 wording (104-116 chars) overflowed room 04 by 12 px at root -> searched wordings with scripts/fit-outline.cjs; first D04 wording (142 chars) clipped the room-level D04 card label (overflow 33 px) -> scripts/fit-room.cjs; chose D04 122 chars and D13 96 chars: root geometry identical, room-level label moves 1.5 px, no clipping.
- ~06:43 study.json questions/keys/rubric; protocol.md; packets built.
- ~06:47 one discarded pilot session on packets/148/original.json (notes/pilot/) to test the harness: parse ok, 0 tool uses, $0.06. Questions and keys were not changed after the pilot. Pilot answers: Q2 predicted correctly by inference from 'runtime loads at construction'; Q3 two of five rows right.
- 06:48:52 seal.json written (25 files) before any counted reader session.
