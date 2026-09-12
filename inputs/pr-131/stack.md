# Daemon architecture refactor stack

Bundle `pr-131` position: 8 of 26.

| PR | Title | Based on |
| --- | --- | --- |
| #123 | Move workspace source caching to core | main |
| #124 | Publish revisioned backend state transactionally | #123 |
| #126 | Publish project membership transactionally | #124 |
| #127 | Scope semantic caches to one turn | #126 |
| #128 | Retain workspaces through core sessions | #127 |
| #129 | Resolve state directories in CLI | #128 |
| #130 | Establish daemon package and policy snapshot | #129 |
| #131 | Route daemon thresholds through centralized policy | #130 |
| #132 | Own one daemon command vocabulary | #131 |
| #133 | Unify daemon execution failure vocabulary | #132 |
| #134 | Make daemon admission rejection authoritative | #133 |
| #135 | Execute daemon work through an injected host module | #134 |
| #136 | Render daemon lifecycle reports in renderer | #135 |
| #137 | Isolate daemon transport framing and validation | #136 |
| #138 | Receive resumable daemon result transfers | #137 |
| #139 | Route outbound daemon sockets through one client | #138 |
| #140 | Route daemon lifecycle exchanges through one client | #139 |
| #141 | Route inbound daemon sockets through one server | #140 |
| #142 | Preserve accepted execution recovery in one client | #141 |
| #143 | Compose local daemon transport from split owners | #142 |
| #144 | Project daemon activity from explicit snapshots | #143 |
| #145 | Manage daemon worker generations explicitly | #144 |
| #146 | Own daemon completion delivery in one session | #145 |
| #147 | Serialize accepted daemon execution in one session | #146 |
| #148 | Own daemon mechanisms behind DaemonClient | #147 |
| #149 | Enforce physical daemon package ownership | #148 |
