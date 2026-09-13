# Reading audit

The first layer ends at “01 / The whole change.” It contains both package and runtime diagrams plus all 13 decision rows. Stated reasons appear in that register; unexplained choices are explicitly marked.

| Deeper material | Where it is already introduced |
| --- | --- |
| All seven policy sections and their consumers | Opening supply map |
| CLI process, daemon process and nested worker thread; existing serialized bridge | Opening runtime map |
| Value sources, output chain, lifecycle/diagnostic reads | Decision 01 |
| Preserved defaults, host-derived memory, untimed waits and deferred work | Decision 02 |
| Status purpose, ordinary response deadline, separate admission deadline | Decision 03 |
| Reattachment, per-attempt fetch-resume state and startup retry | Decision 04 |
| Changed error from a later completion; receipt-failure distinction | Decision 05 |
| Interface widths, reparsing, optional internal cap and retained transport options | Decision 06 |
| Test wrappers and existing policy validation | Decision 07 |
| Aliased production names and helper default sources | Decision 08 |
| Client/daemon limit rewrites, directory creation, ignored memoryCapBytes, changed spill path | Decision 09 |
| Changed capture/record/spool fixtures, aggregate test now inline | Decision 10 |
| Deleted recipe/tests, existing package tests and new consumer cases | Decision 11 |
| Dead startupTimeoutMs field vs active coordination grace | Decision 12 |
| Name-based production guard, exclusions and expressiveness | Decision 13 |

Numbers of observed calls, exact source lines and recorded outputs are evidence for these same facts. The later mechanisms do not introduce a new decision category.

The register is deliberately longer than a PR summary. The cost of keeping all decisions visible is about two desktop screens beyond the diagrams. This is a human reading tradeoff, not a numerical score.

No reviewer input is stored. Selection, source dialogs and return positions are transient navigation state. The artifact contains no verdict controls, browser storage, remote services or write actions.
