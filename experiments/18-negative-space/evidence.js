window.REVIEW_EVIDENCE = {
  "base": "ba53c8e1662fd86d198b95321c90d9c9bef10184",
  "head": "20838f8dbf413e04767543eb2380d0d114da6c60",
  "areas": [
    {
      "title": "Workspace & symbols",
      "prefix": "packages/core/",
      "count": 104,
      "changed": [],
      "deleted": [],
      "paths": [
        "packages/core/package.json",
        "packages/core/src/backend/backend-router.test.ts",
        "packages/core/src/backend/backend-router.ts",
        "packages/core/src/backend/errors.test.ts",
        "packages/core/src/backend/errors.ts",
        "packages/core/src/backend/language-backend.ts",
        "packages/core/src/backend/revisioned-backend-state.test.ts",
        "packages/core/src/backend/revisioned-backend-state.ts",
        "packages/core/src/backend/turn-scoped-cache-scope.test.ts",
        "packages/core/src/backend/turn-scoped-cache-scope.ts",
        "packages/core/src/diagnostics/navigation-diagnostic.ts",
        "packages/core/src/errors.test.ts",
        "packages/core/src/errors.ts",
        "packages/core/src/git/git-history.ts",
        "packages/core/src/graph/errors.test.ts",
        "packages/core/src/graph/errors.ts",
        "packages/core/src/graph/graph-path.ts",
        "packages/core/src/graph/graph-traverser.test.ts",
        "packages/core/src/graph/graph-traverser.ts",
        "packages/core/src/index.ts",
        "packages/core/src/intermediate-representation/assign-disambiguators.test.ts",
        "packages/core/src/intermediate-representation/assign-disambiguators.ts",
        "packages/core/src/intermediate-representation/call-edge.ts",
        "packages/core/src/intermediate-representation/call-target.ts",
        "packages/core/src/intermediate-representation/canonical-identity.test.ts",
        "packages/core/src/intermediate-representation/canonical-identity.ts",
        "packages/core/src/intermediate-representation/context-result-builder.test.ts",
        "packages/core/src/intermediate-representation/context-result-builder.ts",
        "packages/core/src/intermediate-representation/context-result.ts",
        "packages/core/src/intermediate-representation/graph-result-builder.test.ts",
        "packages/core/src/intermediate-representation/graph-result-builder.ts",
        "packages/core/src/intermediate-representation/graph-result.ts",
        "packages/core/src/intermediate-representation/overview-tree.test.ts",
        "packages/core/src/intermediate-representation/overview-tree.ts",
        "packages/core/src/intermediate-representation/reference-kinds.test.ts",
        "packages/core/src/intermediate-representation/reference-kinds.ts",
        "packages/core/src/intermediate-representation/references.ts",
        "packages/core/src/intermediate-representation/refs-result-builder.test.ts",
        "packages/core/src/intermediate-representation/refs-result-builder.ts",
        "packages/core/src/intermediate-representation/segment-grammar.ts",
        "packages/core/src/intermediate-representation/source-match.test.ts",
        "packages/core/src/intermediate-representation/source-match.ts",
        "packages/core/src/intermediate-representation/split-header-lines.test.ts",
        "packages/core/src/intermediate-representation/split-header-lines.ts",
        "packages/core/src/intermediate-representation/symbol-identity.ts",
        "packages/core/src/intermediate-representation/types.ts",
        "packages/core/src/overview/errors.test.ts",
        "packages/core/src/overview/errors.ts",
        "packages/core/src/overview/overview-expander.test.ts",
        "packages/core/src/overview/overview-expander.ts",
        "packages/core/src/overview/overview-expansion-result.ts",
        "packages/core/src/overview/overview-node-builders.ts",
        "packages/core/src/pagination/errors.test.ts",
        "packages/core/src/pagination/errors.ts",
        "packages/core/src/pagination/paginator.test.ts",
        "packages/core/src/pagination/paginator.ts",
        "packages/core/src/pagination/validate-page-request.test.ts",
        "packages/core/src/pagination/validate-page-request.ts",
        "packages/core/src/target/invalid-symbol-target-request-error.ts",
        "packages/core/src/target/symbol-target-builders.ts",
        "packages/core/src/target/symbol-target-pattern.test.ts",
        "packages/core/src/target/symbol-target-pattern.ts",
        "packages/core/src/target/symbol-target-request.test.ts",
        "packages/core/src/target/symbol-target-request.ts",
        "packages/core/src/target/symbol-target-resolver.ts",
        "packages/core/src/target/symbol-target-result.test.ts",
        "packages/core/src/target/symbol-target-result.ts",
        "packages/core/src/validation/compile-regex.test.ts",
        "packages/core/src/validation/compile-regex.ts",
        "packages/core/src/validation/is-positive-integer.test.ts",
        "packages/core/src/validation/is-positive-integer.ts",
        "packages/core/src/workspace/errors.test.ts",
        "packages/core/src/workspace/errors.ts",
        "packages/core/src/workspace/file-system.ts",
        "packages/core/src/workspace/ignore/workspace-ignore.test.ts",
        "packages/core/src/workspace/ignore/workspace-ignore.ts",
        "packages/core/src/workspace/in-memory/in-memory-file-system.test.ts",
        "packages/core/src/workspace/in-memory/in-memory-file-system.ts",
        "packages/core/src/workspace/node-file-system.test.ts",
        "packages/core/src/workspace/node-file-system.ts",
        "packages/core/src/workspace/paths/find-root.ts",
        "packages/core/src/workspace/paths/is-under-root.ts",
        "packages/core/src/workspace/paths/posixify.ts",
        "packages/core/src/workspace/paths/rel-from-root.test.ts",
        "packages/core/src/workspace/paths/rel-from-root.ts",
        "packages/core/src/workspace/project-graph.test.ts",
        "packages/core/src/workspace/project-graph.ts",
        "packages/core/src/workspace/workspace-catalog.test.ts",
        "packages/core/src/workspace/workspace-catalog.ts",
        "packages/core/src/workspace/workspace-session.test.ts",
        "packages/core/src/workspace/workspace-session.ts",
        "packages/core/src/workspace/workspace-source-cache.test.ts",
        "packages/core/src/workspace/workspace-source-cache.ts",
        "packages/core/src/workspace/workspace.test.ts",
        "packages/core/src/workspace/workspace.ts",
        "packages/core/test/integration/target/helpers/fake-language-backend.ts",
        "packages/core/test/integration/target/symbol-target-resolver.test.ts",
        "packages/core/test/integration/workspace/enumerate.test.ts",
        "packages/core/test/integration/workspace/ignore.test.ts",
        "packages/core/test/integration/workspace/paths.test.ts",
        "packages/core/test/integration/workspace/resolve-input-path.test.ts",
        "packages/core/test/integration/workspace/root.test.ts",
        "packages/core/tsconfig.json",
        "packages/core/tsconfig.test.json"
      ]
    },
    {
      "title": "TypeScript backend",
      "prefix": "packages/backend-typescript/",
      "count": 56,
      "changed": [],
      "deleted": [],
      "paths": [
        "packages/backend-typescript/package.json",
        "packages/backend-typescript/src/call-graph/find-call-target.ts",
        "packages/backend-typescript/src/call-graph/find-callees.ts",
        "packages/backend-typescript/src/call-graph/find-callers.ts",
        "packages/backend-typescript/src/definition/find-definitions.test.ts",
        "packages/backend-typescript/src/definition/find-definitions.ts",
        "packages/backend-typescript/src/extract/collapse-initializer-source.ts",
        "packages/backend-typescript/src/extract/extract-file-entries.test.ts",
        "packages/backend-typescript/src/extract/extract-file-entries.ts",
        "packages/backend-typescript/src/extract/extract-fold-header-variants.test.ts",
        "packages/backend-typescript/src/extract/extract-fold-header-variants.ts",
        "packages/backend-typescript/src/extract/extract-fold-header.ts",
        "packages/backend-typescript/src/extract/extract-overview-children.ts",
        "packages/backend-typescript/src/extract/extract-re-export-entry.ts",
        "packages/backend-typescript/src/extract/extract-signature-source.test.ts",
        "packages/backend-typescript/src/extract/extract-signature-source.ts",
        "packages/backend-typescript/src/extract/extract-variable-signature.test.ts",
        "packages/backend-typescript/src/extract/extract-variable-signature.ts",
        "packages/backend-typescript/src/extract/extraction-diagnostics.test.ts",
        "packages/backend-typescript/src/extract/extraction-diagnostics.ts",
        "packages/backend-typescript/src/extract/fold-node-kind.ts",
        "packages/backend-typescript/src/extract/node-kind.test.ts",
        "packages/backend-typescript/src/extract/node-kind.ts",
        "packages/backend-typescript/src/extract/refine-label.ts",
        "packages/backend-typescript/src/extract/trailing-callback.ts",
        "packages/backend-typescript/src/extract/typescript-symbol-kind.test.ts",
        "packages/backend-typescript/src/extract/typescript-symbol-kind.ts",
        "packages/backend-typescript/src/identity/locate-declarations.ts",
        "packages/backend-typescript/src/identity/workspace-declaration-index.test.ts",
        "packages/backend-typescript/src/identity/workspace-declaration-index.ts",
        "packages/backend-typescript/src/index.ts",
        "packages/backend-typescript/src/references/classify-reference-kind.test.ts",
        "packages/backend-typescript/src/references/classify-reference-kind.ts",
        "packages/backend-typescript/src/references/find-references.test.ts",
        "packages/backend-typescript/src/resolve/resolve-symbols.test.ts",
        "packages/backend-typescript/src/resolve/resolve-symbols.ts",
        "packages/backend-typescript/src/typescript-backend/typescript-backend.declarations.test.ts",
        "packages/backend-typescript/src/typescript-backend/typescript-backend.ts",
        "packages/backend-typescript/src/typescript-backend/typescript-project-graph.test.ts",
        "packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts",
        "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-observer.ts",
        "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts",
        "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts",
        "packages/backend-typescript/src/typescript-backend/typescript-workspace-state.test.ts",
        "packages/backend-typescript/src/typescript-backend/typescript-workspace-state.ts",
        "packages/backend-typescript/src/typescript-backend/workspace-file-system-host.ts",
        "packages/backend-typescript/src/typescript-backend/workspace-path-dialect.ts",
        "packages/backend-typescript/test/helpers/parse-typescript-source.test.ts",
        "packages/backend-typescript/test/helpers/parse-typescript-source.ts",
        "packages/backend-typescript/test/integration/configured-projects.test.ts",
        "packages/backend-typescript/test/integration/find-call-target.test.ts",
        "packages/backend-typescript/test/integration/find-callees.test.ts",
        "packages/backend-typescript/test/integration/find-callers.test.ts",
        "packages/backend-typescript/test/integration/typescript-backend.test.ts",
        "packages/backend-typescript/tsconfig.json",
        "packages/backend-typescript/tsconfig.test.json"
      ]
    },
    {
      "title": "Output rendering",
      "prefix": "packages/renderer/",
      "count": 52,
      "changed": [],
      "deleted": [],
      "paths": [
        "packages/renderer/package.json",
        "packages/renderer/src/context/call-edge-tree.ts",
        "packages/renderer/src/context/render-context-json.test.ts",
        "packages/renderer/src/context/render-context-json.ts",
        "packages/renderer/src/context/render-context-text.test.ts",
        "packages/renderer/src/context/render-context-text.ts",
        "packages/renderer/src/definition/definition-tag.test.ts",
        "packages/renderer/src/definition/definition-tag.ts",
        "packages/renderer/src/definition/render-definition-json.test.ts",
        "packages/renderer/src/definition/render-definition-json.ts",
        "packages/renderer/src/definition/render-definition-text.test.ts",
        "packages/renderer/src/definition/render-definition-text.ts",
        "packages/renderer/src/graph/graph-path-tree.test.ts",
        "packages/renderer/src/graph/graph-path-tree.ts",
        "packages/renderer/src/graph/render-graph-json.test.ts",
        "packages/renderer/src/graph/render-graph-json.ts",
        "packages/renderer/src/graph/render-graph-text.test.ts",
        "packages/renderer/src/graph/render-graph-text.ts",
        "packages/renderer/src/index.ts",
        "packages/renderer/src/lifecycle/daemon-lifecycle-renderer.test.ts",
        "packages/renderer/src/lifecycle/daemon-lifecycle-renderer.ts",
        "packages/renderer/src/overview/header-cap.test.ts",
        "packages/renderer/src/overview/header-cap.ts",
        "packages/renderer/src/overview/overview-format.test.ts",
        "packages/renderer/src/overview/overview-format.ts",
        "packages/renderer/src/overview/render-overview-error.test.ts",
        "packages/renderer/src/overview/render-overview-error.ts",
        "packages/renderer/src/overview/render-overview-json.test.ts",
        "packages/renderer/src/overview/render-overview-json.ts",
        "packages/renderer/src/overview/render-overview-text.test.ts",
        "packages/renderer/src/overview/render-overview-text.ts",
        "packages/renderer/src/refs/reference-tree.test.ts",
        "packages/renderer/src/refs/reference-tree.ts",
        "packages/renderer/src/refs/render-refs-json.test.ts",
        "packages/renderer/src/refs/render-refs-json.ts",
        "packages/renderer/src/refs/render-refs-text.test.ts",
        "packages/renderer/src/refs/render-refs-text.ts",
        "packages/renderer/src/refs/trim-preview.test.ts",
        "packages/renderer/src/refs/trim-preview.ts",
        "packages/renderer/src/resolve/render-resolve-error.test.ts",
        "packages/renderer/src/resolve/render-resolve-error.ts",
        "packages/renderer/src/resolve/render-resolve-json.test.ts",
        "packages/renderer/src/resolve/render-resolve-json.ts",
        "packages/renderer/src/resolve/render-resolve-text.test.ts",
        "packages/renderer/src/resolve/render-resolve-text.ts",
        "packages/renderer/src/shared/group-symbols-by-file.ts",
        "packages/renderer/src/shared/render-format.test.ts",
        "packages/renderer/src/shared/render-format.ts",
        "packages/renderer/src/target/render-symbol-target-error.test.ts",
        "packages/renderer/src/target/render-symbol-target-error.ts",
        "packages/renderer/tsconfig.json",
        "packages/renderer/tsconfig.test.json"
      ]
    },
    {
      "title": "Telemetry",
      "prefix": "packages/telemetry/",
      "count": 21,
      "changed": [],
      "deleted": [],
      "paths": [
        "packages/telemetry/package.json",
        "packages/telemetry/src/aggregate.test.ts",
        "packages/telemetry/src/aggregate.ts",
        "packages/telemetry/src/clock.ts",
        "packages/telemetry/src/id-generator.ts",
        "packages/telemetry/src/index.ts",
        "packages/telemetry/src/node-telemetry-write-port.ts",
        "packages/telemetry/src/node-usage-log-reader.test.ts",
        "packages/telemetry/src/node-usage-log-reader.ts",
        "packages/telemetry/src/recorder.test.ts",
        "packages/telemetry/src/recorder.ts",
        "packages/telemetry/src/state-dir.test.ts",
        "packages/telemetry/src/state-dir.ts",
        "packages/telemetry/src/usage-event.test.ts",
        "packages/telemetry/src/usage-event.ts",
        "packages/telemetry/src/usage-log-reader.ts",
        "packages/telemetry/src/usage-summary.ts",
        "packages/telemetry/src/write-port.ts",
        "packages/telemetry/test/integration/recorder.integration.test.ts",
        "packages/telemetry/tsconfig.json",
        "packages/telemetry/tsconfig.test.json"
      ]
    },
    {
      "title": "Command implementations",
      "prefix": "apps/cli/src/commands/",
      "count": 21,
      "changed": [],
      "deleted": [],
      "paths": [
        "apps/cli/src/commands/command-descriptor.test.ts",
        "apps/cli/src/commands/context/context-command.ts",
        "apps/cli/src/commands/context/register-context-command.ts",
        "apps/cli/src/commands/daemon/register-daemon-command.test.ts",
        "apps/cli/src/commands/daemon/register-daemon-command.ts",
        "apps/cli/src/commands/def/def-command.ts",
        "apps/cli/src/commands/def/register-def-command.ts",
        "apps/cli/src/commands/graph/graph-command.ts",
        "apps/cli/src/commands/graph/register-graph-command.ts",
        "apps/cli/src/commands/navigation-diagnostics-collector.test.ts",
        "apps/cli/src/commands/navigation-diagnostics-collector.ts",
        "apps/cli/src/commands/overview/overview-command.ts",
        "apps/cli/src/commands/overview/register-overview-command.ts",
        "apps/cli/src/commands/refs/refs-command.ts",
        "apps/cli/src/commands/refs/register-refs-command.ts",
        "apps/cli/src/commands/resolve-call-target.ts",
        "apps/cli/src/commands/resolve/conflicting-resolve-flags-error.ts",
        "apps/cli/src/commands/resolve/register-resolve-command.ts",
        "apps/cli/src/commands/resolve/resolve-command.ts",
        "apps/cli/src/commands/stats/register-stats-command.ts",
        "apps/cli/src/commands/stats/render-stats.ts"
      ]
    },
    {
      "title": "Shared test fixtures & utilities",
      "prefix": "packages/testing/",
      "count": 295,
      "changed": [],
      "deleted": [],
      "paths": [
        "packages/testing/fixtures/agent-workflow-cases/dot-git/HEAD",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/config",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/index",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/info/exclude",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/logs/HEAD",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/logs/refs/heads/main",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/objects/4a/34bfef8a19764e32d2730afbe6f5c213e41713",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/objects/55/17a239421a58232e5b6262c9f838e16a519a25",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/objects/67/379dfb89f1aea5093730e6fc4ceed5cafef772",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/objects/9f/f180ac2ca9b0b51d2e33f6095d749b2a172b2b",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/objects/b0/3b665afbc1528873c76121199a34575589ceda",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/objects/e9/dd4ffab86da5ba4ecb89c90a8ccaef942bb63d",
        "packages/testing/fixtures/agent-workflow-cases/dot-git/refs/heads/main",
        "packages/testing/fixtures/agent-workflow-cases/package.json",
        "packages/testing/fixtures/agent-workflow-cases/src/agent-workflow-barrel.ts",
        "packages/testing/fixtures/agent-workflow-cases/src/agent-workflow.ts",
        "packages/testing/fixtures/configured-project-cases/package.json",
        "packages/testing/fixtures/configured-project-cases/packages/app/package.json",
        "packages/testing/fixtures/configured-project-cases/packages/app/src/index.ts",
        "packages/testing/fixtures/configured-project-cases/packages/app/src/local.ts",
        "packages/testing/fixtures/configured-project-cases/packages/app/tsconfig.base.json",
        "packages/testing/fixtures/configured-project-cases/packages/app/tsconfig.json",
        "packages/testing/fixtures/configured-project-cases/packages/domain/package.json",
        "packages/testing/fixtures/configured-project-cases/packages/domain/src/feature.ts",
        "packages/testing/fixtures/configured-project-cases/packages/domain/src/features/patterned.ts",
        "packages/testing/fixtures/configured-project-cases/packages/domain/src/index.ts",
        "packages/testing/fixtures/configured-project-cases/packages/domain/src/inherited.ts",
        "packages/testing/fixtures/configured-project-cases/packages/domain/src/local.ts",
        "packages/testing/fixtures/configured-project-cases/packages/domain/tsconfig.json",
        "packages/testing/fixtures/configured-project-cases/scratch/outside.ts",
        "packages/testing/fixtures/configured-project-cases/tsconfig.json",
        "packages/testing/fixtures/context-cases/dot-git/COMMIT_EDITMSG",
        "packages/testing/fixtures/context-cases/dot-git/HEAD",
        "packages/testing/fixtures/context-cases/dot-git/config",
        "packages/testing/fixtures/context-cases/dot-git/index",
        "packages/testing/fixtures/context-cases/dot-git/info/exclude",
        "packages/testing/fixtures/context-cases/dot-git/logs/HEAD",
        "packages/testing/fixtures/context-cases/dot-git/logs/refs/heads/main",
        "packages/testing/fixtures/context-cases/dot-git/objects/15/98870dc420319aa37ba701581f9c1c68e674c1",
        "packages/testing/fixtures/context-cases/dot-git/objects/1f/5688003583b380029183ef45bcd753f5da0399",
        "packages/testing/fixtures/context-cases/dot-git/objects/28/f1a6f3d271e22992252a81e64fb14e5f081906",
        "packages/testing/fixtures/context-cases/dot-git/objects/2e/75d580b62b7669cfa94f214c08222212980385",
        "packages/testing/fixtures/context-cases/dot-git/objects/34/1e6512994aa7ba688a91eacac7091747980a30",
        "packages/testing/fixtures/context-cases/dot-git/objects/3f/68afef1165c6ef88c91756ee97663715e56e67",
        "packages/testing/fixtures/context-cases/dot-git/objects/43/ce8579e5d074675bdea4429f74ff9913b1c256",
        "packages/testing/fixtures/context-cases/dot-git/objects/47/52368870523deebc27b891f409afb1493be5db",
        "packages/testing/fixtures/context-cases/dot-git/objects/50/b150fbd58a251886688217762e33a0eaf59758",
        "packages/testing/fixtures/context-cases/dot-git/objects/53/60750e0ae19fc233609681daa07b7f7deba77f",
        "packages/testing/fixtures/context-cases/dot-git/objects/78/28a8bcabd6945e095f334232061e1661475ade",
        "packages/testing/fixtures/context-cases/dot-git/objects/78/c537f51e087226d4b5ca73747948aa64ae28a0",
        "packages/testing/fixtures/context-cases/dot-git/objects/7e/accb3e28b13847d6dea139eb24442bb59f745b",
        "packages/testing/fixtures/context-cases/dot-git/objects/8b/9e6f2a2179caec59579217749e9dd92637ce9f",
        "packages/testing/fixtures/context-cases/dot-git/objects/8d/b404318d561928c2438850655344389053db3a",
        "packages/testing/fixtures/context-cases/dot-git/objects/8e/fef05d2c914122c16d483ab890ee48b65caf0d",
        "packages/testing/fixtures/context-cases/dot-git/objects/91/7f1121fd51c58ed81d4318c59611bb025e74bc",
        "packages/testing/fixtures/context-cases/dot-git/objects/97/f1b43e30ae210e71e4a7630955b7649d1d5b92",
        "packages/testing/fixtures/context-cases/dot-git/objects/a9/13d346bd12b4da6bb13d16f2e89c06cae28a3c",
        "packages/testing/fixtures/context-cases/dot-git/objects/c4/c63c27dc9989131451e9d4b7504d56e3b8fa69",
        "packages/testing/fixtures/context-cases/dot-git/objects/c5/e4fb6bd582908d524ab655dfbe63278d7aed8c",
        "packages/testing/fixtures/context-cases/dot-git/objects/c9/32faba12ea0aae325eec43e0a97281fa6b573a",
        "packages/testing/fixtures/context-cases/dot-git/objects/ce/983124f4e1172de8ed521d0eb66810f98362e2",
        "packages/testing/fixtures/context-cases/dot-git/objects/d7/8a65cc52e3d899422ceb10b3c0cc8a73957752",
        "packages/testing/fixtures/context-cases/dot-git/objects/d8/e7bcf871ada37414cebfdaff53db13be29c82b",
        "packages/testing/fixtures/context-cases/dot-git/objects/da/70cb2366ebe10b7ef55d54e8fe78c8fb5e68a1",
        "packages/testing/fixtures/context-cases/dot-git/objects/dc/2cccb6eaba34b534450098c1a734d6fd1256f9",
        "packages/testing/fixtures/context-cases/dot-git/objects/de/56fa92cd76ddd9882523606496d7746e7bbcc3",
        "packages/testing/fixtures/context-cases/dot-git/objects/e9/29b6cc37ab596072192ee0f1469bb7b5270672",
        "packages/testing/fixtures/context-cases/dot-git/objects/f6/fc99350bd30ace28521a1dca7e940a492cbd39",
        "packages/testing/fixtures/context-cases/dot-git/objects/fa/9d0a6061809878f86c09b66124d9c64e4c8d8d",
        "packages/testing/fixtures/context-cases/dot-git/objects/fc/da9276b4be00e1abec6b14e51bf03c1164c445",
        "packages/testing/fixtures/context-cases/dot-git/objects/fd/22d7b46a55dc3056fdb453540d7daa87e0513b",
        "packages/testing/fixtures/context-cases/dot-git/refs/heads/main",
        "packages/testing/fixtures/context-cases/package.json",
        "packages/testing/fixtures/context-cases/src/app/runner.ts",
        "packages/testing/fixtures/context-cases/src/contract/circle.ts",
        "packages/testing/fixtures/context-cases/src/contract/shape.ts",
        "packages/testing/fixtures/context-cases/src/contract/square.ts",
        "packages/testing/fixtures/context-cases/src/fresh/draft.ts",
        "packages/testing/fixtures/context-cases/src/leaf/leaf.ts",
        "packages/testing/fixtures/context-cases/src/logging/boot.ts",
        "packages/testing/fixtures/context-cases/src/logging/console-logger.ts",
        "packages/testing/fixtures/context-cases/src/logging/logger.ts",
        "packages/testing/fixtures/context-cases/src/logging/stamp.ts",
        "packages/testing/fixtures/context-cases/src/math/calculator.ts",
        "packages/testing/fixtures/context-cases/src/math/operations.ts",
        "packages/testing/fixtures/context-cases/src/nested/folded-symbols.ts",
        "packages/testing/fixtures/context-cases/src/nested/pipeline.ts",
        "packages/testing/fixtures/context-cases/src/nested/transform.ts",
        "packages/testing/fixtures/context-cases/src/popular/callers.ts",
        "packages/testing/fixtures/context-cases/src/popular/popular.ts",
        "packages/testing/fixtures/context-history-cases/dot-git/COMMIT_EDITMSG",
        "packages/testing/fixtures/context-history-cases/dot-git/HEAD",
        "packages/testing/fixtures/context-history-cases/dot-git/config",
        "packages/testing/fixtures/context-history-cases/dot-git/index",
        "packages/testing/fixtures/context-history-cases/dot-git/info/exclude",
        "packages/testing/fixtures/context-history-cases/dot-git/logs/HEAD",
        "packages/testing/fixtures/context-history-cases/dot-git/logs/refs/heads/main",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/0c/2b3ce68c8db51eb9b45fdf9525c44a5786bd48",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/22/87a506f9f844921823b8201c31769cf93e659d",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/30/8dbaaf0c0dc32680901102163a6af4e82be5db",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/36/9b0c73dff68211b0cdb0187c2fbf8133baa1df",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/37/ac4b62a4a5d67999f53ea715918c02ea72e0d9",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/4c/4f58822a97ef6e56920559870155156f404fd6",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/56/2f276a5ea3ac5b5ff2e95d049213ed7ad0e2a8",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/6e/0d298131621efbfd343bf97c1e54522742ef31",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/6f/83e9cade5494cbec07234e94cc17f0ae6b9b91",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/83/1f713db4322f7e724d19174d0ace3515d6e29a",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/9e/880b7058ebd735554fce1de8088e103de31d92",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/a0/5474e4b5b646a7ce56201ce04c16dc34fc6aeb",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/ac/51e5845076695e4211adcb9e508d258784fda2",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/ae/9dfa6cde3d344f65c8be58f6b6b35f23e442ef",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/af/d173c7594ea12dc80829cafad652aedfdc6d6d",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/b3/70deafbdd03d9c5222f5b8605c53961a5eace7",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/b7/ddca313d83c4858e967624ca076b2567a3f37a",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/c1/7bae439ed82e007dd56c90a843afd94d8d4329",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/c5/35e84c66cb4af1f055262914d37f69bd6c5ba5",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/d8/f2bc5eac6615118287f72d94740e555c640b36",
        "packages/testing/fixtures/context-history-cases/dot-git/objects/f5/1a893f42aa2dd1cb24ef74c3687bdd6021676f",
        "packages/testing/fixtures/context-history-cases/dot-git/refs/heads/main",
        "packages/testing/fixtures/context-history-cases/greeter.ts",
        "packages/testing/fixtures/context-history-cases/package.json",
        "packages/testing/fixtures/context-history-cases/untracked.ts",
        "packages/testing/fixtures/definition-cases/.gitignore",
        "packages/testing/fixtures/definition-cases/dot-git/HEAD",
        "packages/testing/fixtures/definition-cases/package.json",
        "packages/testing/fixtures/definition-cases/src/control-flow/LocalDeclarations.ts",
        "packages/testing/fixtures/definition-cases/src/http/Router.ts",
        "packages/testing/fixtures/definition-cases/src/ignored-stuff.ts",
        "packages/testing/fixtures/definition-cases/src/namespace-merge/Box.ts",
        "packages/testing/fixtures/definition-cases/src/payments/PaymentProvider.ts",
        "packages/testing/fixtures/definition-cases/src/payments/PaypalProvider.ts",
        "packages/testing/fixtures/definition-cases/src/payments/StripeProvider.ts",
        "packages/testing/fixtures/definition-cases/src/shapes/Shape.ts",
        "packages/testing/fixtures/extraction-diagnostics-cases/dot-git/HEAD",
        "packages/testing/fixtures/extraction-diagnostics-cases/package.json",
        "packages/testing/fixtures/extraction-diagnostics-cases/src/known-ignored-namespace-export.ts",
        "packages/testing/fixtures/extraction-diagnostics-cases/src/unsupported-statement.ts",
        "packages/testing/fixtures/graph-cases/dot-git/HEAD",
        "packages/testing/fixtures/graph-cases/package.json",
        "packages/testing/fixtures/graph-cases/src/chain.ts",
        "packages/testing/fixtures/graph-cases/src/contract.ts",
        "packages/testing/fixtures/graph-cases/src/cycle.ts",
        "packages/testing/fixtures/graph-cases/src/dynamic.ts",
        "packages/testing/fixtures/graph-cases/src/folded-symbols.ts",
        "packages/testing/fixtures/graph-cases/src/hub-callers.ts",
        "packages/testing/fixtures/graph-cases/src/hub.ts",
        "packages/testing/fixtures/graph-cases/src/isolated.ts",
        "packages/testing/fixtures/nested-workspace-cases/dot-git/HEAD",
        "packages/testing/fixtures/nested-workspace-cases/nested/dot-git/HEAD",
        "packages/testing/fixtures/nested-workspace-cases/nested/package.json",
        "packages/testing/fixtures/nested-workspace-cases/nested/src/nested.ts",
        "packages/testing/fixtures/nested-workspace-cases/package.json",
        "packages/testing/fixtures/nested-workspace-cases/src/parent.ts",
        "packages/testing/fixtures/no-supported-files-cases/README.md",
        "packages/testing/fixtures/no-supported-files-cases/dot-git/HEAD",
        "packages/testing/fixtures/no-supported-files-cases/package.json",
        "packages/testing/fixtures/overview-cases/.gitignore",
        "packages/testing/fixtures/overview-cases/async-callbacks.ts",
        "packages/testing/fixtures/overview-cases/barrel.ts",
        "packages/testing/fixtures/overview-cases/class-with-methods.ts",
        "packages/testing/fixtures/overview-cases/collapsed-headers.ts",
        "packages/testing/fixtures/overview-cases/control-flow-declarations.ts",
        "packages/testing/fixtures/overview-cases/default-fold-overview.ts",
        "packages/testing/fixtures/overview-cases/dot-git/COMMIT_EDITMSG",
        "packages/testing/fixtures/overview-cases/dot-git/HEAD",
        "packages/testing/fixtures/overview-cases/dot-git/config",
        "packages/testing/fixtures/overview-cases/dot-git/index",
        "packages/testing/fixtures/overview-cases/dot-git/info/exclude",
        "packages/testing/fixtures/overview-cases/dot-git/logs/HEAD",
        "packages/testing/fixtures/overview-cases/dot-git/logs/refs/heads/main",
        "packages/testing/fixtures/overview-cases/dot-git/objects/01/918a86d10e57ca8d112030c8edf98aa320882c",
        "packages/testing/fixtures/overview-cases/dot-git/objects/07/46449f8fa742e637a95b93a15764c2f0ebaec7",
        "packages/testing/fixtures/overview-cases/dot-git/objects/19/408b8cb590f9bf6cd034a1be47e2cfb979e7cb",
        "packages/testing/fixtures/overview-cases/dot-git/objects/29/32b81ac3cbe7585272ab39253e59d37c726145",
        "packages/testing/fixtures/overview-cases/dot-git/objects/32/2eb8efabeebdc536426cc76bcce348414cdace",
        "packages/testing/fixtures/overview-cases/dot-git/objects/3e/9cad36a53ffc02eea7064498719f20055a0d19",
        "packages/testing/fixtures/overview-cases/dot-git/objects/47/3310706ec51a3527f011417442062383dd758c",
        "packages/testing/fixtures/overview-cases/dot-git/objects/47/7b0c446239ac9cbdf25bd3d708b46f11913d69",
        "packages/testing/fixtures/overview-cases/dot-git/objects/5f/8c7ca271c3ccfe291a7573c8cf1ee65ab75791",
        "packages/testing/fixtures/overview-cases/dot-git/objects/65/3cd385d3249187ff08a7240d5bd9970d21811d",
        "packages/testing/fixtures/overview-cases/dot-git/objects/76/9a3ca805c174417271d3b9e8e2dddbb520a4ea",
        "packages/testing/fixtures/overview-cases/dot-git/objects/77/731277cad9a0d79dd75c6fffce24e554ed9754",
        "packages/testing/fixtures/overview-cases/dot-git/objects/7e/f5c4adf74badf9381eebb43696508e417f5f84",
        "packages/testing/fixtures/overview-cases/dot-git/objects/85/59ea54a19b0456f1815faa80f43b51604154d1",
        "packages/testing/fixtures/overview-cases/dot-git/objects/9f/7d3459e45697787e3b141623de9cfd171eaba6",
        "packages/testing/fixtures/overview-cases/dot-git/objects/a5/755b28a3dfa1be1ed688775838cb5801fe4279",
        "packages/testing/fixtures/overview-cases/dot-git/objects/a9/93392ab4e402bb5ab3fe5a98a7a86880da9493",
        "packages/testing/fixtures/overview-cases/dot-git/objects/ae/f8c3ab2c3540560ae5387d4cefbf2ac4c6de2f",
        "packages/testing/fixtures/overview-cases/dot-git/objects/b8/2d4653a8b2eeda6e1c6ef7b76caa6c9912be52",
        "packages/testing/fixtures/overview-cases/dot-git/objects/cc/b68fa9aa25410ed46f56802bf212bb1e56e229",
        "packages/testing/fixtures/overview-cases/dot-git/objects/dc/4af3111976278a08dfe5da8ff2e847f923ab69",
        "packages/testing/fixtures/overview-cases/dot-git/objects/dd/d167c32e95c6f910945ed5f15fdc4925c2535a",
        "packages/testing/fixtures/overview-cases/dot-git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391",
        "packages/testing/fixtures/overview-cases/dot-git/objects/f2/d10b39aab8a0593c43bd53658f29da14561487",
        "packages/testing/fixtures/overview-cases/dot-git/objects/f4/59219de171cf63b81ff9edf4789c34f9683e6d",
        "packages/testing/fixtures/overview-cases/dot-git/objects/f6/7d9eab7b0bcb2532123bf8273559930c85f483",
        "packages/testing/fixtures/overview-cases/dot-git/objects/fb/762d556d2042979fd02148a87e92348dc151ff",
        "packages/testing/fixtures/overview-cases/dot-git/refs/heads/main",
        "packages/testing/fixtures/overview-cases/empty.ts",
        "packages/testing/fixtures/overview-cases/extensionless",
        "packages/testing/fixtures/overview-cases/fold-tree.ts",
        "packages/testing/fixtures/overview-cases/ignored.ts",
        "packages/testing/fixtures/overview-cases/line-narrowing.ts",
        "packages/testing/fixtures/overview-cases/long-header.ts",
        "packages/testing/fixtures/overview-cases/minified-line.ts",
        "packages/testing/fixtures/overview-cases/multi-line-signature.ts",
        "packages/testing/fixtures/overview-cases/nested-symbols.ts",
        "packages/testing/fixtures/overview-cases/package.json",
        "packages/testing/fixtures/overview-cases/src/rules/index.ts",
        "packages/testing/fixtures/overview-cases/targeted-expansion.ts",
        "packages/testing/fixtures/overview-cases/top-level-constants.ts",
        "packages/testing/fixtures/overview-cases/top-level-functions.ts",
        "packages/testing/fixtures/overview-cases/unsupported.md",
        "packages/testing/fixtures/refs-cases/.gitignore",
        "packages/testing/fixtures/refs-cases/dot-git/HEAD",
        "packages/testing/fixtures/refs-cases/package.json",
        "packages/testing/fixtures/refs-cases/src/billing/RefundService.ts",
        "packages/testing/fixtures/refs-cases/src/checkout/CheckoutService.ts",
        "packages/testing/fixtures/refs-cases/src/control-flow/ControlFlowReferences.ts",
        "packages/testing/fixtures/refs-cases/src/control-flow/ControlFlowTarget.ts",
        "packages/testing/fixtures/refs-cases/src/folded-symbols.ts",
        "packages/testing/fixtures/refs-cases/src/ignored-stuff.ts",
        "packages/testing/fixtures/refs-cases/src/long/LongLine.ts",
        "packages/testing/fixtures/refs-cases/src/multi/SameLine.ts",
        "packages/testing/fixtures/refs-cases/src/payments/PaymentProcessor.ts",
        "packages/testing/fixtures/refs-cases/src/payments/index.ts",
        "packages/testing/fixtures/refs-cases/tests/payments/PaymentProcessor.test.ts",
        "packages/testing/fixtures/resolve-cases/.gitignore",
        "packages/testing/fixtures/resolve-cases/dot-git/HEAD",
        "packages/testing/fixtures/resolve-cases/package.json",
        "packages/testing/fixtures/resolve-cases/src/Payment.ts",
        "packages/testing/fixtures/resolve-cases/src/checkout/CheckoutService.ts",
        "packages/testing/fixtures/resolve-cases/src/control-flow/LocalDeclarations.ts",
        "packages/testing/fixtures/resolve-cases/src/converters.ts",
        "packages/testing/fixtures/resolve-cases/src/exact-fuzzy-regression.ts",
        "packages/testing/fixtures/resolve-cases/src/payments/PaymentProcessor.ts",
        "packages/testing/fixtures/resolve-cases/src/payments/PaymentProvider.ts",
        "packages/testing/fixtures/resolve-cases/src/payments/ignored-payments.ts",
        "packages/testing/fixtures/resolve-cases/src/payments/types.ts",
        "packages/testing/fixtures/resolve-cases/src/toOrder/full-id-regression.ts",
        "packages/testing/fixtures/resolve-cases/src/toOrderHelpers.ts",
        "packages/testing/fixtures/target-pattern-cases/.gitignore",
        "packages/testing/fixtures/target-pattern-cases/dot-git/HEAD",
        "packages/testing/fixtures/target-pattern-cases/dot-git/config",
        "packages/testing/fixtures/target-pattern-cases/dot-git/index",
        "packages/testing/fixtures/target-pattern-cases/dot-git/info/exclude",
        "packages/testing/fixtures/target-pattern-cases/dot-git/logs/HEAD",
        "packages/testing/fixtures/target-pattern-cases/dot-git/logs/refs/heads/main",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/02/9f99f1eb73dea2c87733f26d07df1b856b9708",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/0d/304ad9f9906cc608c3e07abe2eca420c437f0a",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/1a/33baaf6f2fbafed9fcc9ef7705fad8bea635a5",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/27/33cb10af1e649017dff3ca241a3f1a33126a6f",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/48/8969c7ccd2245304b024a07828361a8c9ba76e",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/4c/eaf3821dd9f2e7df776aa8dbef59e8077433d7",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/4f/333c0822572f9b0d097c8744d72db6566aa01a",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/62/201b4d44508d8fe9a510d1bd276eae11d74b82",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/6f/d7098bdf9b9554df3c175983d2e042928dd9f6",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/90/98d13e243651899c7fae78906cbe381b567bdb",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/9c/e25ffae7b2d6970daeee154dec16fe804d9399",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/9f/a69d477513b829b813d27ab90e29ff62f05035",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/a8/64733da5a49d39e064ba2eaa69e98de4ba6082",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/aa/48d5b9feaf59f071b91cccf2b0eb5ec97dcddc",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/ab/52a1faf1ff96ffd8600203c32974181d1752a7",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/ac/b5d26d085a485cbb6fb8f1dd67946284118dea",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/c0/ab8a3f1e98e3541cd4d507664ba162d16ad083",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/c5/006216d5cd90063d055386d2e5bb271475b606",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/d1/2bc9a7c5902ae1e48205e4e7e1e292e741b8b4",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/d6/ea1bd32d746414c1d775e1e0189fd401b736f1",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/da/9bdf172a2176c7b44f9702558b632ca8168b24",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/e3/ca868d1ff11dea6c35d3b6d2a70932a781ba87",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/e6/d1aa39f8916655a45b26ff2f7f6edcabb6668a",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/e9/7ffc9b3b9ea5e3eb2cb90286ffa3ccc6a56b1a",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/f3/4a9db48393b417a1603c82f4be254936460fd3",
        "packages/testing/fixtures/target-pattern-cases/dot-git/objects/fd/6ae7f3e9af5a0841c1c114d2ba74225ec0a7e2",
        "packages/testing/fixtures/target-pattern-cases/dot-git/refs/heads/main",
        "packages/testing/fixtures/target-pattern-cases/package.json",
        "packages/testing/fixtures/target-pattern-cases/src/adapters/orders.ts",
        "packages/testing/fixtures/target-pattern-cases/src/calls.ts",
        "packages/testing/fixtures/target-pattern-cases/src/domain/invoices.ts",
        "packages/testing/fixtures/target-pattern-cases/src/domain/orders.ts",
        "packages/testing/fixtures/target-pattern-cases/src/folded/folded.ts",
        "packages/testing/fixtures/target-pattern-cases/src/ignored-stuff.ts",
        "packages/testing/fixtures/target-pattern-cases/src/routing/router.ts",
        "packages/testing/fixtures/target-pattern-cases/src/unique/helper.ts",
        "packages/testing/fixtures/trivial-project/package.json",
        "packages/testing/fixtures/trivial-project/src/index.ts",
        "packages/testing/fixtures/trivial-project/tsconfig.json",
        "packages/testing/package.json",
        "packages/testing/src/fixtures.test.ts",
        "packages/testing/src/fixtures.ts",
        "packages/testing/src/index.ts",
        "packages/testing/src/run-symnav-binary.test.ts",
        "packages/testing/src/run-symnav-binary.ts",
        "packages/testing/tsconfig.json",
        "packages/testing/tsconfig.test.json"
      ]
    }
  ],
  "preservedPaths": [
    "apps/cli/src/cli.ts",
    "apps/cli/src/daemon/daemon-command-dispatcher.ts",
    "apps/cli/src/daemon/invocation-route.ts",
    "apps/cli/src/daemon/invocation-workspace-selector.ts",
    "apps/cli/src/daemon-executor.ts",
    "apps/cli/src/cli-program-executor.ts",
    "apps/cli/src/command-execution-result.ts",
    "packages/daemon/src/daemon-policy.ts",
    "packages/daemon/src/daemon-command-name.ts",
    "packages/daemon/src/daemon-executor.ts",
    "packages/daemon/src/daemon-admission.ts",
    "packages/daemon/src/daemon-execution-failure.ts",
    "plans/005/daemon-policy.md"
  ],
  "frozen": {
    "count": 38,
    "digest": "d0ff136f3be132ea004d3b13985192e055d1dfbad1abb773b607e89c54a1f41e",
    "files": [
      {
        "path": "apps/cli/src/daemon/accepted-execution-session-contracts.ts",
        "basePath": "apps/cli/src/daemon/accepted-execution-session-contracts.ts",
        "status": "unchanged",
        "baseBlob": "a469ccaead9a6debe8b78049170a2ebecde0e5ab",
        "headBlob": "a469ccaead9a6debe8b78049170a2ebecde0e5ab",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/accepted-execution-session.ts",
        "basePath": "apps/cli/src/daemon/accepted-execution-session.ts",
        "status": "unchanged",
        "baseBlob": "dad29a3583647e3666aefde5eb41d061281da1df",
        "headBlob": "dad29a3583647e3666aefde5eb41d061281da1df",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/accepted-request-ledger.ts",
        "basePath": "apps/cli/src/daemon/accepted-request-ledger.ts",
        "status": "edited before freeze",
        "baseBlob": "55c51a19a701a1f1710261ab4050b5b36afd653a",
        "headBlob": "f338f72a66124f23567c7d0e45c46339d4c0afb8",
        "diff": "diff --git a/apps/cli/src/daemon/accepted-request-ledger.ts b/apps/cli/src/daemon/accepted-request-ledger.ts\nindex 55c51a19a..f338f72a6 100644\n--- a/apps/cli/src/daemon/accepted-request-ledger.ts\n+++ b/apps/cli/src/daemon/accepted-request-ledger.ts\n@@ -7,6 +7,7 @@ import {\n   type DaemonExecutionFailureCode,\n } from \"@symnav/daemon\";\n import type { DaemonExecutionStatus } from \"./daemon-protocol.js\";\n+import { NodeDaemonClock, type DaemonClock } from \"./daemon-clock.js\";\n \n export type AcceptedRequestState =\n   | { readonly state: \"queued\" }\n@@ -43,7 +44,7 @@ export class AcceptedRequestLedger {\n   private readonly subscribers = new Map<string, Set<AcceptedRequestSubscriber>>();\n   private readonly acknowledged = new Set<string>();\n \n-  constructor(private readonly now: () => number = Date.now) {}\n+  constructor(private readonly clock: Pick<DaemonClock, \"wallNowMs\"> = new NodeDaemonClock()) {}\n \n   get size(): number {\n     return this.entries.size;\n@@ -85,7 +86,7 @@ export class AcceptedRequestLedger {\n       requestFingerprint,\n       commandName,\n       request,\n-      acceptedAt: this.now(),\n+      acceptedAt: this.clock.wallNowMs(),\n       queuePosition: this.nonterminalCount,\n       deliveryTerminated: false,\n       state: { state: \"queued\" },\n"
      },
      {
        "path": "apps/cli/src/daemon/completion-spool.ts",
        "basePath": "apps/cli/src/daemon/completion-spool.ts",
        "status": "unchanged",
        "baseBlob": "5da5035a601476d8354524be1179e4ebc8d4eef2",
        "headBlob": "5da5035a601476d8354524be1179e4ebc8d4eef2",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-activity-projector.ts",
        "basePath": "apps/cli/src/daemon/daemon-activity-projector.ts",
        "status": "unchanged",
        "baseBlob": "df5ee9339710b22195bc9fc6495a72ec669770d9",
        "headBlob": "df5ee9339710b22195bc9fc6495a72ec669770d9",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-client-result-capture.ts",
        "basePath": "apps/cli/src/daemon/daemon-client-result-capture.ts",
        "status": "unchanged",
        "baseBlob": "5c697915ffef2ba142455a5ea7213cd2973b5a22",
        "headBlob": "5c697915ffef2ba142455a5ea7213cd2973b5a22",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-clock.ts",
        "basePath": "apps/cli/src/daemon/daemon-clock.ts",
        "status": "unchanged",
        "baseBlob": "97cc23df3b7e2feb916b8f62262268cd553d3a8a",
        "headBlob": "97cc23df3b7e2feb916b8f62262268cd553d3a8a",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-controller.ts",
        "basePath": "apps/cli/src/daemon/daemon-controller.ts",
        "status": "edited before freeze",
        "baseBlob": "d174c2dedb3fc449b297b22fa875856d2d1a23c3",
        "headBlob": "f7973f415300b98218297065b40bb357236a1405",
        "diff": "diff --git a/apps/cli/src/daemon/daemon-controller.ts b/apps/cli/src/daemon/daemon-controller.ts\nindex d174c2ded..f7973f415 100644\n--- a/apps/cli/src/daemon/daemon-controller.ts\n+++ b/apps/cli/src/daemon/daemon-controller.ts\n@@ -16,17 +16,18 @@ import { DaemonRecordObserver, type DaemonObservation } from \"./daemon-record-ob\n import { DaemonStartupCoordinator } from \"./daemon-startup-coordinator.js\";\n import { DaemonWorkspaceIdentity } from \"./daemon-workspace-identity.js\";\n import { DaemonRuntimeValues } from \"./daemon-runtime-values.js\";\n+import { NodeDaemonClock, type DaemonClock } from \"./daemon-clock.js\";\n import type { DaemonExecutionRequester, DaemonLifecycleRequestSender } from \"./daemon-transport.js\";\n \n interface DaemonControllerOptions {\n   readonly policy: Pick<DaemonPolicyValues, \"startup\" | \"shutdown\">;\n-  readonly now?: () => number;\n+  readonly clock?: Pick<DaemonClock, \"wallNowMs\">;\n   readonly processTerminator?: DaemonProcessTerminator;\n   readonly launcher?: DaemonProcessLauncher;\n }\n \n export class DaemonController {\n-  private readonly now: () => number;\n+  private readonly clock: Pick<DaemonClock, \"wallNowMs\">;\n   private readonly stopTimeoutMs: number;\n   private readonly pollIntervalMs: number;\n   private readonly processTerminator: DaemonProcessTerminator;\n@@ -41,13 +42,14 @@ export class DaemonController {\n     options: DaemonControllerOptions,\n   ) {\n     this.policy = options.policy;\n-    this.now = options.now ?? Date.now;\n+    this.clock = options.clock ?? new NodeDaemonClock();\n     this.stopTimeoutMs = this.policy.shutdown.stopTimeoutMs;\n     this.pollIntervalMs = this.policy.shutdown.controllerPollIntervalMs;\n     this.processTerminator =\n-      options.processTerminator ?? new NodeDaemonProcessTerminator(this.policy.shutdown);\n+      options.processTerminator ??\n+      new NodeDaemonProcessTerminator(this.policy.shutdown, this.clock);\n     this.launcher = options.launcher;\n-    this.observer = new DaemonRecordObserver(this.transport, this.processTerminator, this.now);\n+    this.observer = new DaemonRecordObserver(this.transport, this.processTerminator);\n   }\n \n   async start(workspaceRoot: string): Promise<DaemonStartResult> {\n@@ -69,7 +71,7 @@ export class DaemonController {\n   }\n \n   async stop(workspaceRoot: string): Promise<DaemonStopResult> {\n-    const stopStartedAt = this.now();\n+    const stopStartedAt = this.clock.wallNowMs();\n     const deadline = stopStartedAt + this.stopTimeoutMs;\n     const forceWaitMs = Math.min(\n       this.policy.shutdown.forcedTerminationReserveMaximumMs,\n@@ -101,7 +103,7 @@ export class DaemonController {\n       .catch(() => false);\n     const acknowledged = await Promise.race([\n       stopRequest,\n-      this.pause(Math.max(0, gracefulDeadline - this.now())).then(() => false),\n+      this.pause(Math.max(0, gracefulDeadline - this.clock.wallNowMs())).then(() => false),\n     ]);\n     if (acknowledged && (await this.waitForExit(record.pid, gracefulDeadline))) {\n       this.registry.removeIfProcess(identity, record.instanceId, record.processToken);\n@@ -131,24 +133,23 @@ export class DaemonController {\n         }\n         return this.statusForObservation(observation);\n       }\n-      const owner = this.registry.startupOwner(identity);\n+      const ownerForRecord = this.registry.startupOwnerForRecordCredentials(identity, record);\n+      const ownerForInstance = this.registry.startupOwnerForInstance(identity, record.instanceId);\n       const armedLaunchIsWithinGrace =\n-        owner?.instanceId === record.instanceId &&\n-        owner.processToken === record.processToken &&\n-        this.registry.startupOwnerIsWithinGrace(owner);\n+        ownerForRecord !== undefined && this.registry.startupOwnerIsWithinGrace(ownerForRecord);\n       if (\n         armedLaunchIsWithinGrace ||\n-        (owner?.instanceId === record.instanceId &&\n-          this.processTerminator.isAlive(owner.ownerPid) &&\n-          this.registry.startupOwnerIsWithinGrace(owner))\n+        (ownerForInstance !== undefined &&\n+          this.processTerminator.isAlive(ownerForInstance.ownerPid) &&\n+          this.registry.startupOwnerIsWithinGrace(ownerForInstance))\n       ) {\n         return this.startingStatus(record);\n       }\n-      if (owner?.instanceId === record.instanceId) {\n-        if (!this.registry.removeStartupLockIfOwner(identity, owner)) {\n-          const renewedOwner = this.registry.startupOwner(identity);\n+      if (ownerForInstance !== undefined) {\n+        if (!this.registry.removeStartupLockIfOwner(identity, ownerForInstance)) {\n+          const renewedOwner = this.registry.startupOwnerForInstance(identity, record.instanceId);\n           if (\n-            renewedOwner?.instanceId === record.instanceId &&\n+            renewedOwner !== undefined &&\n             this.processTerminator.isAlive(renewedOwner.ownerPid) &&\n             this.registry.startupOwnerIsWithinGrace(renewedOwner)\n           ) {\n@@ -169,13 +170,11 @@ export class DaemonController {\n     record: DaemonRecord,\n     deadline: number,\n   ): Promise<DaemonStopResult> {\n-    const owner = this.registry.startupOwner(identity);\n     if (record.pid <= 0) {\n-      if (owner?.processToken === record.processToken) {\n+      if (this.registry.startupOwnerForRecordCredentials(identity, record) !== undefined) {\n         return this.waitForClaimedProcessAndStop(identity, record, deadline);\n       }\n-      if (owner?.instanceId === record.instanceId)\n-        this.registry.removeStartupLockIfOwner(identity, owner);\n+      this.registry.removeStartupLockIfInstance(identity, record.instanceId);\n       this.registry.removeIfProcess(identity, record.instanceId, record.processToken);\n       return { status: \"not-running\", workspaceRoot: record.workspaceRoot };\n     }\n@@ -201,17 +200,13 @@ export class DaemonController {\n     claimedRecord: DaemonRecord,\n     deadline: number,\n   ): Promise<DaemonStopResult> {\n-    while (this.now() <= deadline) {\n+    while (this.clock.wallNowMs() <= deadline) {\n       const record = this.registry.readStoredInstance(identity, claimedRecord.instanceId);\n       if (record === undefined || record.processToken !== claimedRecord.processToken) {\n         return { status: \"not-running\", workspaceRoot: claimedRecord.workspaceRoot };\n       }\n       if (record.pid > 0) return this.stopStarting(identity, record, deadline);\n-      const owner = this.registry.startupOwner(identity);\n-      if (\n-        owner?.instanceId !== claimedRecord.instanceId ||\n-        owner.processToken !== claimedRecord.processToken\n-      ) {\n+      if (this.registry.startupOwnerForRecordCredentials(identity, claimedRecord) === undefined) {\n         return { status: \"not-running\", workspaceRoot: claimedRecord.workspaceRoot };\n       }\n       await this.pause(this.pollIntervalMs);\n@@ -222,7 +217,7 @@ export class DaemonController {\n   private async terminateStartingProcess(pid: number, deadline: number): Promise<boolean> {\n     let timeout: NodeJS.Timeout | undefined;\n     const deadlineReached = new Promise<false>((resolve) => {\n-      timeout = setTimeout(() => resolve(false), Math.max(0, deadline - this.now()));\n+      timeout = setTimeout(() => resolve(false), Math.max(0, deadline - this.clock.wallNowMs()));\n     });\n     try {\n       return await Promise.race([\n@@ -243,11 +238,8 @@ export class DaemonController {\n     ) {\n       return;\n     }\n-    const owner = this.registry.startupOwner(identity);\n     if (this.registry.startupOwnerMatchesProcess(identity, record)) {\n       this.registry.removeStartupLockIfProcess(identity, record);\n-    } else if (owner?.instanceId === record.instanceId && owner.processToken === undefined) {\n-      this.registry.removeStartupLockIfOwner(identity, owner);\n     }\n     this.registry.removeIfProcess(identity, record.instanceId, record.processToken);\n   }\n@@ -257,7 +249,7 @@ export class DaemonController {\n       workspaceRoot: record.workspaceRoot,\n       state: \"starting\",\n       pid: record.pid,\n-      startupElapsedMs: Math.max(0, this.now() - record.startedAt),\n+      startupElapsedMs: Math.max(0, this.clock.wallNowMs() - record.startedAt),\n       ...(record.memoryBytes === undefined ? {} : { memoryBytes: record.memoryBytes }),\n     };\n   }\n@@ -289,7 +281,7 @@ export class DaemonController {\n         workspaceRoot: record.workspaceRoot,\n         state: \"busy\",\n         pid: record.pid,\n-        uptimeMs: Math.max(0, this.now() - record.startedAt),\n+        uptimeMs: Math.max(0, this.clock.wallNowMs() - record.startedAt),\n         command: DaemonRuntimeValues.isCommandName(observation.pong.currentCommand)\n           ? observation.pong.currentCommand\n           : \"unknown\",\n@@ -305,12 +297,12 @@ export class DaemonController {\n       workspaceRoot: record.workspaceRoot,\n       state: \"ready\",\n       pid: record.pid,\n-      uptimeMs: Math.max(0, this.now() - record.startedAt),\n+      uptimeMs: Math.max(0, this.clock.wallNowMs() - record.startedAt),\n       fileCount,\n       memoryBytes,\n       ...(lastNavigationAt === undefined\n         ? {}\n-        : { lastRequestAgoMs: Math.max(0, this.now() - lastNavigationAt) }),\n+        : { lastRequestAgoMs: Math.max(0, this.clock.wallNowMs() - lastNavigationAt) }),\n     };\n   }\n \n@@ -319,7 +311,7 @@ export class DaemonController {\n       workspaceRoot: record.workspaceRoot,\n       state: \"unresponsive\",\n       pid: record.pid,\n-      uptimeMs: Math.max(0, this.now() - record.startedAt),\n+      uptimeMs: Math.max(0, this.clock.wallNowMs() - record.startedAt),\n     };\n   }\n \n@@ -384,7 +376,7 @@ export class DaemonController {\n           instanceId: record.instanceId,\n           processToken: record.processToken,\n         }),\n-        this.pause(Math.max(0, deadline - this.now())).then(() => undefined),\n+        this.pause(Math.max(0, deadline - this.clock.wallNowMs())).then(() => undefined),\n       ]);\n       return response?.kind === \"killing\";\n     } catch {\n@@ -393,7 +385,7 @@ export class DaemonController {\n   }\n \n   private async waitForIdentifiedExit(record: DaemonRecord, deadline: number): Promise<boolean> {\n-    while (this.now() <= deadline) {\n+    while (this.clock.wallNowMs() <= deadline) {\n       if (!(await this.identifies(record)) && !this.processTerminator.isAlive(record.pid)) {\n         return true;\n       }\n@@ -420,7 +412,7 @@ export class DaemonController {\n   }\n \n   private async waitForExit(pid: number, deadline: number): Promise<boolean> {\n-    while (this.now() <= deadline) {\n+    while (this.clock.wallNowMs() <= deadline) {\n       if (!this.processTerminator.isAlive(pid)) return true;\n       await this.pause(this.pollIntervalMs);\n     }\n"
      },
      {
        "path": "apps/cli/src/daemon/daemon-delivery-session.ts",
        "basePath": "apps/cli/src/daemon/daemon-delivery-session.ts",
        "status": "unchanged",
        "baseBlob": "f0ab51c8cf616300e2f88f74347b626f58df85a1",
        "headBlob": "f0ab51c8cf616300e2f88f74347b626f58df85a1",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-entry.ts",
        "basePath": "apps/cli/src/daemon/daemon-entry.ts",
        "status": "edited before freeze",
        "baseBlob": "0ff595688dc921f642ae7af9956b98f48331a136",
        "headBlob": "a5100c22030404c0928949e8d710a5eb4e28c037",
        "diff": "diff --git a/apps/cli/src/daemon/daemon-entry.ts b/apps/cli/src/daemon/daemon-entry.ts\nindex 0ff595688..a5100c220 100644\n--- a/apps/cli/src/daemon/daemon-entry.ts\n+++ b/apps/cli/src/daemon/daemon-entry.ts\n@@ -6,7 +6,7 @@ import { DaemonProcessTerminationObserver } from \"./daemon-process-termination-o\n import { DaemonRegistry } from \"./daemon-registry.js\";\n import { DaemonWorkspaceIdentity } from \"./daemon-workspace-identity.js\";\n import { LocalDaemonTransport } from \"./local-daemon-transport.js\";\n-import { WorkspaceDaemon } from \"./workspace-daemon.js\";\n+import { DaemonProcessCoordinator } from \"./daemon-process-coordinator.js\";\n \n class DaemonEntry {\n   static async run(encodedConfiguration: string | undefined): Promise<void> {\n@@ -15,34 +15,27 @@ class DaemonEntry {\n       configuration.workspaceRoot,\n       configuration.stateDirectory,\n     );\n-    if (\n-      identity.workspaceKey !== configuration.workspaceKey ||\n-      identity.stateKey !== configuration.stateKey ||\n-      identity.identityKey !== configuration.identityKey ||\n-      identity.endpoint(configuration.instanceId) !== configuration.endpoint\n-    )\n-      throw new Error(\"Daemon process identity does not match configuration\");\n     const policy = DaemonPolicy.fromSerialized(configuration.policy);\n-    const registry = new DaemonRegistry(identity.registryDirectory, policy.values.startup);\n     const clock = new NodeDaemonClock();\n+    const registry = new DaemonRegistry(identity.registryDirectory, policy.values.startup, clock);\n     const logger = new DaemonLogger(identity, configuration.instanceId, clock, {\n       policy: policy.values.diagnostics,\n     });\n-    new DaemonProcessTerminationObserver(logger, () => {\n-      registry.removeIfProcess(identity, configuration.instanceId, configuration.processToken);\n-    }).install();\n-    await new WorkspaceDaemon({\n+    const coordinator = new DaemonProcessCoordinator({\n       identity,\n-      instanceId: configuration.instanceId,\n-      processToken: configuration.processToken,\n-      symnavVersion: configuration.symnavVersion,\n+      coordinates: configuration,\n+      productVersion: configuration.symnavVersion,\n       executorModuleUrl: configuration.executorModuleUrl,\n       policy,\n       registry,\n-      transport: new LocalDaemonTransport({ policy }),\n+      server: new LocalDaemonTransport({ policy }),\n       clock,\n       logger,\n-    }).start();\n+    });\n+    new DaemonProcessTerminationObserver(logger, () => {\n+      registry.removeIfProcess(identity, configuration.instanceId, configuration.processToken);\n+    }).install();\n+    await coordinator.start();\n   }\n }\n \n"
      },
      {
        "path": "apps/cli/src/daemon/daemon-execution-client.ts",
        "basePath": "apps/cli/src/daemon/daemon-execution-client.ts",
        "status": "unchanged",
        "baseBlob": "e5d0a42bea44b1b022aa4e224cdd4885eccb4f16",
        "headBlob": "e5d0a42bea44b1b022aa4e224cdd4885eccb4f16",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-lifecycle-client.ts",
        "basePath": "apps/cli/src/daemon/daemon-lifecycle-client.ts",
        "status": "unchanged",
        "baseBlob": "7753789baef4b90b1535fc23deec7091f0941217",
        "headBlob": "7753789baef4b90b1535fc23deec7091f0941217",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-lifetime.ts",
        "basePath": "apps/cli/src/daemon/daemon-lifetime.ts",
        "status": "edited before freeze",
        "baseBlob": "2ab44f2a83ab5775d830ffdf445e2d85d6eb1877",
        "headBlob": "2f428bcd4c21e5cbff8e1f6925f88d1651077212",
        "diff": "diff --git a/apps/cli/src/daemon/daemon-lifetime.ts b/apps/cli/src/daemon/daemon-lifetime.ts\nindex 2ab44f2a8..2f428bcd4 100644\n--- a/apps/cli/src/daemon/daemon-lifetime.ts\n+++ b/apps/cli/src/daemon/daemon-lifetime.ts\n@@ -1,5 +1,5 @@\n-import type { Clock } from \"@symnav/telemetry\";\n import type { DaemonPolicyValues } from \"@symnav/daemon\";\n+import type { DaemonClock } from \"./daemon-clock.js\";\n \n export class DaemonLifetime {\n   private timer: ReturnType<typeof setTimeout> | undefined;\n@@ -9,12 +9,12 @@ export class DaemonLifetime {\n   private idleTriggered = false;\n \n   constructor(\n-    private readonly clock: Clock,\n+    private readonly clock: Pick<DaemonClock, \"wallNowMs\">,\n     policy: Pick<DaemonPolicyValues[\"shutdown\"], \"idleTimeoutMs\">,\n     private readonly onIdle: () => Promise<void>,\n   ) {\n     this.idleTimeoutMs = policy.idleTimeoutMs;\n-    this.deadline = this.clock.now() + this.idleTimeoutMs;\n+    this.deadline = this.clock.wallNowMs() + this.idleTimeoutMs;\n     this.schedule();\n   }\n \n@@ -23,14 +23,14 @@ export class DaemonLifetime {\n   navigationAccepted(): void {\n     if (this.stopped) return;\n     this.navigationActive = true;\n-    this.deadline = this.clock.now() + this.idleTimeoutMs;\n+    this.deadline = this.clock.wallNowMs() + this.idleTimeoutMs;\n     this.schedule();\n   }\n \n   queueBecameIdle(): void {\n     if (this.stopped) return;\n     this.navigationActive = false;\n-    if (this.clock.now() >= this.deadline) this.triggerIdle();\n+    if (this.clock.wallNowMs() >= this.deadline) this.triggerIdle();\n   }\n \n   stop(): void {\n@@ -41,7 +41,7 @@ export class DaemonLifetime {\n \n   private schedule(): void {\n     if (this.timer !== undefined) clearTimeout(this.timer);\n-    const remainingMs = Math.max(0, this.deadline - this.clock.now());\n+    const remainingMs = Math.max(0, this.deadline - this.clock.wallNowMs());\n     this.timer = setTimeout(() => this.deadlineReached(), remainingMs);\n     this.timer.unref?.();\n   }\n"
      },
      {
        "path": "apps/cli/src/daemon/daemon-logger.ts",
        "basePath": "apps/cli/src/daemon/daemon-logger.ts",
        "status": "unchanged",
        "baseBlob": "46e1716742fbb6bc3ce9c6605147f14c27c25a33",
        "headBlob": "46e1716742fbb6bc3ce9c6605147f14c27c25a33",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-navigation-worker-entry.ts",
        "basePath": "apps/cli/src/daemon/daemon-navigation-worker-entry.ts",
        "status": "edited before freeze",
        "baseBlob": "0a757e7af8a3082c9c546df0ae4f52bd50b55dfc",
        "headBlob": "2574a2de37e84ec4499571af0579888d3a35016b",
        "diff": "diff --git a/apps/cli/src/daemon/daemon-navigation-worker-entry.ts b/apps/cli/src/daemon/daemon-navigation-worker-entry.ts\nindex 0a757e7af..2574a2de3 100644\n--- a/apps/cli/src/daemon/daemon-navigation-worker-entry.ts\n+++ b/apps/cli/src/daemon/daemon-navigation-worker-entry.ts\n@@ -1,4 +1,3 @@\n-import { performance } from \"node:perf_hooks\";\n import { parentPort, workerData } from \"node:worker_threads\";\n import { getHeapStatistics } from \"node:v8\";\n import {\n@@ -17,6 +16,7 @@ import {\n   type DaemonNavigationWorkerResponse,\n } from \"./daemon-navigation-worker-protocol.js\";\n import type { DaemonRefreshSummary } from \"./daemon-protocol.js\";\n+import { NodeDaemonClock } from \"./daemon-clock.js\";\n \n interface DaemonWorkerData {\n   readonly stateDirectory: string;\n@@ -32,6 +32,7 @@ class DaemonNavigationWorkerEntry {\n   private tail: Promise<void> = Promise.resolve();\n   private readonly outputAcknowledgements = new Map<string, () => void>();\n   private readonly policy: DaemonPolicy;\n+  private readonly clock = new NodeDaemonClock();\n \n   constructor(\n     private readonly port: NonNullable<typeof parentPort>,\n@@ -87,7 +88,7 @@ class DaemonNavigationWorkerEntry {\n   }\n \n   private async initialize(workspaceRoot: string): Promise<void> {\n-    const startedAt = performance.now();\n+    const startedAt = this.clock.monotonicNowMs();\n     try {\n       this.executor = await DaemonExecutorModuleLoader.load(this.data.executorModuleUrl, {\n         stateDirectory: this.data.stateDirectory,\n@@ -95,7 +96,7 @@ class DaemonNavigationWorkerEntry {\n         sampleResources: () => this.activeHeapMonitor?.sample(),\n       });\n       const initialized = await this.executor.initialize(workspaceRoot);\n-      const totalMs = performance.now() - startedAt;\n+      const totalMs = this.clock.monotonicNowMs() - startedAt;\n       this.send({\n         kind: \"ready\",\n         generation: this.data.generation,\n@@ -121,14 +122,14 @@ class DaemonNavigationWorkerEntry {\n       if (this.executor === undefined) throw new Error(\"Navigation worker is not ready\");\n       const result = await this.executor.execute(request.request);\n       heapMonitor.sample();\n-      const outputStartedAt = performance.now();\n+      const outputStartedAt = this.clock.monotonicNowMs();\n       let sequence = 0;\n       for await (const record of result.output.records()) {\n         sequence = await this.sendOutput(request.requestId, sequence, record);\n         heapMonitor.sample();\n       }\n       await result.output.dispose();\n-      const outputMs = performance.now() - outputStartedAt;\n+      const outputMs = this.clock.monotonicNowMs() - outputStartedAt;\n       const resources = heapMonitor.finish();\n       this.send({\n         kind: \"result\",\n"
      },
      {
        "path": "apps/cli/src/daemon/daemon-navigation-worker-protocol.ts",
        "basePath": "apps/cli/src/daemon/daemon-navigation-worker-protocol.ts",
        "status": "unchanged",
        "baseBlob": "548061414c33896cc9b2a18b686a4dc71b9eeec1",
        "headBlob": "548061414c33896cc9b2a18b686a4dc71b9eeec1",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-navigation-worker.ts",
        "basePath": "apps/cli/src/daemon/daemon-navigation-worker.ts",
        "status": "unchanged",
        "baseBlob": "4f656089611ad08cbda8ba10d8a25a44d303556d",
        "headBlob": "4f656089611ad08cbda8ba10d8a25a44d303556d",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-operation-observer.ts",
        "basePath": "apps/cli/src/daemon/daemon-operation-observer.ts",
        "status": "unchanged",
        "baseBlob": "ee798af4af32b3a48a53ed8de83bd6c3b08410f0",
        "headBlob": "ee798af4af32b3a48a53ed8de83bd6c3b08410f0",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-process-coordinator.ts",
        "basePath": "apps/cli/src/daemon/workspace-daemon.ts",
        "status": "edited before freeze",
        "baseBlob": "b3fc904cba2f67b0a10d985ecd3f0e65ad5ba76a",
        "headBlob": "2746a1796b238cd56a7538ca0277fcfc37387559",
        "diff": "diff --git a/apps/cli/src/daemon/workspace-daemon.ts b/apps/cli/src/daemon/daemon-process-coordinator.ts\nsimilarity index 84%\nrename from apps/cli/src/daemon/workspace-daemon.ts\nrename to apps/cli/src/daemon/daemon-process-coordinator.ts\nindex b3fc904cb..2746a1796 100644\n--- a/apps/cli/src/daemon/workspace-daemon.ts\n+++ b/apps/cli/src/daemon/daemon-process-coordinator.ts\n@@ -13,6 +13,7 @@ import { AcceptedExecutionSession } from \"./accepted-execution-session.js\";\n import { DaemonActivityProjector } from \"./daemon-activity-projector.js\";\n import type {\n   DaemonExecutionServerFrame,\n+  DaemonIdentityCoordinates,\n   DaemonRecord,\n   DaemonRequest,\n   DaemonResponse,\n@@ -22,7 +23,7 @@ import { DaemonCompletionSpoolStore, type CompletionSpoolStorage } from \"./compl\n import { DAEMON_PROTOCOL_VERSION, DAEMON_RECORD_SCHEMA_VERSION } from \"./daemon-protocol.js\";\n import { DaemonLifetime } from \"./daemon-lifetime.js\";\n import { DaemonLogger } from \"./daemon-logger.js\";\n-import { NodeDaemonClock, type DaemonClock } from \"./daemon-clock.js\";\n+import type { DaemonClock } from \"./daemon-clock.js\";\n import { DaemonOperationObserver } from \"./daemon-operation-observer.js\";\n import { DaemonDeliverySession } from \"./daemon-delivery-session.js\";\n import {\n@@ -36,30 +37,25 @@ import type { DaemonWorkspaceIdentity } from \"./daemon-workspace-identity.js\";\n import type { DaemonRequestServer, DaemonServerSend } from \"./daemon-transport.js\";\n import { WorkspaceRequestQueue } from \"./workspace-request-queue.js\";\n \n-export interface WorkspaceDaemonOptions {\n+export interface DaemonProcessCoordinatorOptions {\n   readonly identity: DaemonWorkspaceIdentity;\n-  readonly instanceId: string;\n-  readonly processToken: string;\n-  readonly symnavVersion: string;\n+  readonly coordinates: DaemonIdentityCoordinates;\n+  readonly productVersion: string;\n   readonly executorModuleUrl?: DaemonExecutorModuleUrl;\n   readonly policy: DaemonPolicy;\n-  readonly dependencies?: {\n-    readonly fs: { exists(path: string): Promise<boolean> };\n-  };\n+  readonly workspaceExists?: (workspaceRoot: string) => Promise<boolean>;\n   readonly registry: DaemonRegistry;\n-  readonly transport: DaemonRequestServer;\n+  readonly server: DaemonRequestServer;\n   readonly navigationWorker?: DaemonNavigationWorker;\n   readonly navigationWorkerFactory?: (generation: number) => DaemonNavigationWorker;\n-  readonly now?: () => number;\n-  readonly clock?: DaemonClock;\n+  readonly clock: DaemonClock;\n   readonly exit?: (code: number) => void;\n   readonly residentMemoryBytes?: () => number;\n   readonly completionSpoolStorage?: CompletionSpoolStorage;\n   readonly logger?: DaemonLogger;\n }\n \n-export class WorkspaceDaemon {\n-  private readonly now: () => number;\n+export class DaemonProcessCoordinator {\n   private readonly clock: DaemonClock;\n   private readonly exit: (code: number) => void;\n   private readonly workerManager: DaemonWorkerGenerationManager;\n@@ -82,21 +78,21 @@ export class WorkspaceDaemon {\n   private readonly forceEscalated: Promise<void>;\n   private resolveForceEscalated!: () => void;\n \n-  constructor(private readonly options: WorkspaceDaemonOptions) {\n+  constructor(private readonly options: DaemonProcessCoordinatorOptions) {\n+    DaemonProcessCoordinator.validateCoordinates(options.identity, options.coordinates);\n     const policy = options.policy;\n     this.policy = policy;\n     this.forceEscalated = new Promise((resolve) => {\n       this.resolveForceEscalated = resolve;\n     });\n-    this.now = options.now ?? Date.now;\n-    this.clock = options.clock ?? new NodeDaemonClock();\n+    this.clock = options.clock;\n     this.startedMonotonicAt = this.clock.monotonicNowMs();\n-    const requestQueue = new WorkspaceRequestQueue(() => this.clock.monotonicNowMs());\n-    const acceptedRequests = new AcceptedRequestLedger(this.now);\n+    const requestQueue = new WorkspaceRequestQueue(this.clock);\n+    const acceptedRequests = new AcceptedRequestLedger(this.clock);\n     const completionSpools = new DaemonCompletionSpoolStore({\n       directory: options.identity.spoolDirectory,\n       workspaceKey: options.identity.workspaceKey,\n-      instanceId: options.instanceId,\n+      instanceId: options.coordinates.instanceId,\n       policy: policy.values.output,\n       ...(options.completionSpoolStorage === undefined\n         ? {}\n@@ -104,7 +100,7 @@ export class WorkspaceDaemon {\n     });\n     this.logger =\n       options.logger ??\n-      new DaemonLogger(options.identity, options.instanceId, this.clock, {\n+      new DaemonLogger(options.identity, options.coordinates.instanceId, this.clock, {\n         policy: policy.values.diagnostics,\n       });\n     const resourcePolicy = policy.values.resources;\n@@ -117,7 +113,7 @@ export class WorkspaceDaemon {\n               generation,\n               configuration: {\n                 stateDirectory: options.identity.stateDirectory,\n-                productVersion: options.symnavVersion,\n+                productVersion: options.productVersion,\n                 executorModuleUrl:\n                   options.executorModuleUrl ?? \"file:///missing/symnav-daemon-executor.js\",\n                 policy: policy.toSerialized(),\n@@ -137,7 +133,7 @@ export class WorkspaceDaemon {\n     };\n     const initialNavigationWorker = options.navigationWorker ?? createNavigationWorker(1);\n     this.exit = options.exit ?? ((code) => process.exit(code));\n-    this.lifetime = new DaemonLifetime({ now: this.now }, policy.values.shutdown, () =>\n+    this.lifetime = new DaemonLifetime(this.clock, policy.values.shutdown, () =>\n       this.drainAndShutdown(\"idle\"),\n     );\n     this.workerManager = new DaemonWorkerGenerationManager({\n@@ -152,6 +148,7 @@ export class WorkspaceDaemon {\n     this.resourceSupervisor = new DaemonResourceSupervisor({\n       policy: resourcePolicy,\n       generation: this.workerManager.snapshot.generation,\n+      clock: this.clock,\n       ...(options.residentMemoryBytes === undefined\n         ? {}\n         : { residentMemoryBytes: options.residentMemoryBytes }),\n@@ -180,8 +177,8 @@ export class WorkspaceDaemon {\n     );\n     this.deliverySession = new DaemonDeliverySession({\n       coordinates: {\n-        instanceId: options.instanceId,\n-        processToken: options.processToken,\n+        instanceId: options.coordinates.instanceId,\n+        processToken: options.coordinates.processToken,\n       },\n       journal: acceptedRequests,\n       spoolStore: completionSpools,\n@@ -209,7 +206,7 @@ export class WorkspaceDaemon {\n       lifetime: this.lifetime,\n       diagnostics: this.logger,\n       clock: {\n-        wallNowMs: this.now,\n+        wallNowMs: () => this.clock.wallNowMs(),\n         monotonicNowMs: () => this.clock.monotonicNowMs(),\n       },\n     });\n@@ -229,8 +226,8 @@ export class WorkspaceDaemon {\n       );\n       startupHeartbeat.unref();\n       this.startedAt = startingRecord.startedAt;\n-      this.server = await this.options.transport.listen(\n-        this.options.identity.endpoint(this.options.instanceId),\n+      this.server = await this.options.server.listen(\n+        this.options.coordinates.endpoint,\n         (request, send) => this.handle(request, send),\n       );\n       const response = await this.workerManager.start();\n@@ -246,18 +243,18 @@ export class WorkspaceDaemon {\n       const readyRecord: DaemonRecord = {\n         schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,\n         protocolVersion: DAEMON_PROTOCOL_VERSION,\n-        symnavVersion: this.options.symnavVersion,\n+        symnavVersion: this.options.productVersion,\n         workspaceRoot: this.options.identity.workspaceRoot,\n         workspaceKey: this.options.identity.workspaceKey,\n         stateKey: this.options.identity.stateKey,\n         identityKey: this.options.identity.identityKey,\n-        instanceId: this.options.instanceId,\n-        processToken: this.options.processToken,\n-        endpoint: this.options.identity.endpoint(this.options.instanceId),\n+        instanceId: this.options.coordinates.instanceId,\n+        processToken: this.options.coordinates.processToken,\n+        endpoint: this.options.coordinates.endpoint,\n         pid: process.pid,\n         state: \"ready\",\n         startedAt: startingRecord.startedAt,\n-        readyAt: this.now(),\n+        readyAt: this.clock.wallNowMs(),\n         fileCount: response.fileCount,\n         memoryCapBytes: this.resourcePolicy.hardProcessRssBytes,\n       };\n@@ -288,21 +285,21 @@ export class WorkspaceDaemon {\n     readonly lease: DaemonStartupLease;\n     readonly record: DaemonRecord;\n   }> {\n-    const deadline = this.now() + this.policy.values.startup.coordinationGraceMs;\n-    while (this.now() <= deadline) {\n+    const deadline = this.clock.wallNowMs() + this.policy.values.startup.coordinationGraceMs;\n+    while (this.clock.wallNowMs() <= deadline) {\n       const record = this.options.registry.readInstance(\n         this.options.identity,\n-        this.options.instanceId,\n+        this.options.coordinates.instanceId,\n       );\n       if (\n         record?.state === \"starting\" &&\n         (record.pid === 0 || record.pid === process.pid) &&\n-        record.processToken === this.options.processToken\n+        record.processToken === this.options.coordinates.processToken\n       ) {\n         const lease = this.options.registry.claimStartupForDaemon(\n           this.options.identity,\n-          this.options.instanceId,\n-          this.options.processToken,\n+          this.options.coordinates.instanceId,\n+          this.options.coordinates.processToken,\n           process.pid,\n         );\n         if (lease === undefined) {\n@@ -315,7 +312,7 @@ export class WorkspaceDaemon {\n         });\n         const adoptedRecord = this.options.registry.readInstance(\n           this.options.identity,\n-          this.options.instanceId,\n+          this.options.coordinates.instanceId,\n         );\n         if (adoptedRecord?.pid !== process.pid) {\n           lease.release();\n@@ -345,8 +342,8 @@ export class WorkspaceDaemon {\n     startupLease?.release();\n     this.options.registry.removeIfProcess(\n       this.options.identity,\n-      this.options.instanceId,\n-      this.options.processToken,\n+      this.options.coordinates.instanceId,\n+      this.options.coordinates.processToken,\n     );\n   }\n \n@@ -360,7 +357,7 @@ export class WorkspaceDaemon {\n     }\n     if (\n       request.protocolVersion !== DAEMON_PROTOCOL_VERSION ||\n-      request.instanceId !== this.options.instanceId\n+      request.instanceId !== this.options.coordinates.instanceId\n     ) {\n       throw new Error(\"Daemon request does not match protocol or instance\");\n     }\n@@ -371,7 +368,7 @@ export class WorkspaceDaemon {\n       request.kind === \"result-fetch\" ||\n       request.kind === \"result-ack\"\n     ) {\n-      if (request.processToken !== this.options.processToken) {\n+      if (request.processToken !== this.options.coordinates.processToken) {\n         throw new Error(\"Daemon execution request does not match process instance\");\n       }\n     }\n@@ -385,8 +382,8 @@ export class WorkspaceDaemon {\n     if (request.kind === \"execution-status\") {\n       return {\n         kind: \"execution-status\",\n-        instanceId: this.options.instanceId,\n-        processToken: this.options.processToken,\n+        instanceId: this.options.coordinates.instanceId,\n+        processToken: this.options.coordinates.processToken,\n         requestId: request.requestId,\n         status: this.acceptedExecutionSession.status(request.requestId),\n       };\n@@ -395,20 +392,20 @@ export class WorkspaceDaemon {\n     await this.acceptedExecutionSession.drain();\n     await this.deliverySession.waitForCompletionAcknowledgements();\n     setTimeout(() => void this.shutdown(\"graceful\"), 0);\n-    return { kind: \"stopped\", instanceId: this.options.instanceId };\n+    return { kind: \"stopped\", instanceId: this.options.coordinates.instanceId };\n   }\n \n   private identify(request: Extract<DaemonRequest, { kind: \"identify\" }>): DaemonResponse {\n     if (\n-      request.instanceId !== this.options.instanceId ||\n-      request.processToken !== this.options.processToken\n+      request.instanceId !== this.options.coordinates.instanceId ||\n+      request.processToken !== this.options.coordinates.processToken\n     ) {\n       throw new Error(\"Daemon identity request does not match process instance\");\n     }\n     return {\n       kind: \"identity\",\n-      instanceId: this.options.instanceId,\n-      processToken: this.options.processToken,\n+      instanceId: this.options.coordinates.instanceId,\n+      processToken: this.options.coordinates.processToken,\n       pid: process.pid,\n       startedAt: this.startedAt,\n     };\n@@ -418,8 +415,8 @@ export class WorkspaceDaemon {\n     request: Extract<DaemonRequest, { kind: \"terminate\" | \"kill\" }>,\n   ): Promise<DaemonResponse> {\n     if (\n-      request.instanceId !== this.options.instanceId ||\n-      request.processToken !== this.options.processToken\n+      request.instanceId !== this.options.coordinates.instanceId ||\n+      request.processToken !== this.options.coordinates.processToken\n     ) {\n       throw new Error(\"Daemon termination does not match process instance\");\n     }\n@@ -433,8 +430,8 @@ export class WorkspaceDaemon {\n     }\n     return {\n       kind: request.kind === \"terminate\" ? \"terminating\" : \"killing\",\n-      instanceId: this.options.instanceId,\n-      processToken: this.options.processToken,\n+      instanceId: this.options.coordinates.instanceId,\n+      processToken: this.options.coordinates.processToken,\n     };\n   }\n \n@@ -454,8 +451,8 @@ export class WorkspaceDaemon {\n       ...(execution.lastCompletedMonotonicAt === undefined\n         ? {}\n         : { lastCompletedMonotonicAt: execution.lastCompletedMonotonicAt }),\n-      productVersion: this.options.symnavVersion,\n-      instanceId: this.options.instanceId,\n+      productVersion: this.options.productVersion,\n+      instanceId: this.options.coordinates.instanceId,\n       hardProcessRssBytes: this.resourcePolicy.hardProcessRssBytes,\n       queue: execution.queue,\n       resources,\n@@ -488,7 +485,7 @@ export class WorkspaceDaemon {\n   private decideAdmission(\n     request: Extract<DaemonRequest, { kind: \"execute\" }>,\n   ): DaemonAdmissionDecision {\n-    const authenticated = request.processToken === this.options.processToken;\n+    const authenticated = request.processToken === this.options.coordinates.processToken;\n     if (!authenticated) {\n       return this.admissionPolicy.decide({\n         request,\n@@ -518,9 +515,10 @@ export class WorkspaceDaemon {\n   }\n \n   private workspaceExists(): Promise<boolean> {\n-    return this.options.dependencies\n-      ? this.options.dependencies.fs.exists(this.options.identity.workspaceRoot)\n-      : WorkspaceDaemon.pathExists(this.options.identity.workspaceRoot);\n+    return (\n+      this.options.workspaceExists?.(this.options.identity.workspaceRoot) ??\n+      DaemonProcessCoordinator.pathExists(this.options.identity.workspaceRoot)\n+    );\n   }\n \n   private async workspaceDeletedAfterDelivery(): Promise<void> {\n@@ -537,13 +535,28 @@ export class WorkspaceDaemon {\n     }\n   }\n \n+  private static validateCoordinates(\n+    identity: DaemonWorkspaceIdentity,\n+    coordinates: DaemonIdentityCoordinates,\n+  ): void {\n+    if (\n+      coordinates.workspaceRoot !== identity.workspaceRoot ||\n+      coordinates.workspaceKey !== identity.workspaceKey ||\n+      coordinates.stateKey !== identity.stateKey ||\n+      coordinates.identityKey !== identity.identityKey ||\n+      coordinates.endpoint !== identity.endpoint(coordinates.instanceId)\n+    ) {\n+      throw new Error(\"Daemon process identity does not match configuration\");\n+    }\n+  }\n+\n   private rejection(\n     request: Extract<DaemonRequest, { kind: \"execute\" }>,\n     code: DaemonExecuteRejectionCode,\n   ): DaemonExecutionServerFrame {\n     return DaemonAdmissionRejections.frame(code, {\n-      instanceId: this.options.instanceId,\n-      processToken: this.options.processToken,\n+      instanceId: this.options.coordinates.instanceId,\n+      processToken: this.options.coordinates.processToken,\n       requestId: request.requestId,\n     });\n   }\n"
      },
      {
        "path": "apps/cli/src/daemon/daemon-process-launcher.ts",
        "basePath": "apps/cli/src/daemon/daemon-process-launcher.ts",
        "status": "edited before freeze",
        "baseBlob": "b856117c3643284f4d0aa7f7c431f3c1c02b4529",
        "headBlob": "9af5b25ca4267416d51272b234582652ba4be14b",
        "diff": "diff --git a/apps/cli/src/daemon/daemon-process-launcher.ts b/apps/cli/src/daemon/daemon-process-launcher.ts\nindex b856117c3..9af5b25ca 100644\n--- a/apps/cli/src/daemon/daemon-process-launcher.ts\n+++ b/apps/cli/src/daemon/daemon-process-launcher.ts\n@@ -9,6 +9,7 @@ import {\n } from \"@symnav/daemon\";\n import type { DaemonWorkspaceIdentity } from \"./daemon-workspace-identity.js\";\n import type { DaemonIdentityCoordinates } from \"./daemon-protocol.js\";\n+import { NodeDaemonClock, type DaemonClock } from \"./daemon-clock.js\";\n \n interface DaemonProcessConfiguration extends DaemonIdentityCoordinates {\n   readonly stateDirectory: string;\n@@ -64,7 +65,10 @@ export class NodeDaemonProcessTerminator implements DaemonProcessTerminator {\n   private readonly gracefulTimeoutMs: number;\n   private readonly pollIntervalMs: number;\n \n-  constructor(policy: DaemonPolicyValues[\"shutdown\"]) {\n+  constructor(\n+    policy: DaemonPolicyValues[\"shutdown\"],\n+    private readonly clock: Pick<DaemonClock, \"wallNowMs\"> = new NodeDaemonClock(),\n+  ) {\n     this.gracefulTimeoutMs = policy.processSignalExitTimeoutMs;\n     this.pollIntervalMs = policy.processExitPollIntervalMs;\n   }\n@@ -98,8 +102,8 @@ export class NodeDaemonProcessTerminator implements DaemonProcessTerminator {\n   }\n \n   private async waitForExit(pid: number): Promise<boolean> {\n-    const deadline = Date.now() + this.gracefulTimeoutMs;\n-    while (Date.now() <= deadline) {\n+    const deadline = this.clock.wallNowMs() + this.gracefulTimeoutMs;\n+    while (this.clock.wallNowMs() <= deadline) {\n       if (!this.isAlive(pid)) return true;\n       await new Promise((resolve) => setTimeout(resolve, this.pollIntervalMs));\n     }\n"
      },
      {
        "path": "apps/cli/src/daemon/daemon-process-termination-observer.ts",
        "basePath": "apps/cli/src/daemon/daemon-process-termination-observer.ts",
        "status": "unchanged",
        "baseBlob": "4fffa924731f9e370885e5c18a69b0437ae1c79a",
        "headBlob": "4fffa924731f9e370885e5c18a69b0437ae1c79a",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-protocol-validator.ts",
        "basePath": "apps/cli/src/daemon/daemon-protocol-validator.ts",
        "status": "unchanged",
        "baseBlob": "e8683a9ad645c215f826430cbe21e4094cb52356",
        "headBlob": "e8683a9ad645c215f826430cbe21e4094cb52356",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-protocol.ts",
        "basePath": "apps/cli/src/daemon/daemon-protocol.ts",
        "status": "unchanged",
        "baseBlob": "7ac961d8d9bb95410a78f1d4ac4214041a559cde",
        "headBlob": "7ac961d8d9bb95410a78f1d4ac4214041a559cde",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-record-observer.ts",
        "basePath": "apps/cli/src/daemon/daemon-record-observer.ts",
        "status": "edited before freeze",
        "baseBlob": "9a5dac34cfc6604a5683cd7105f603352add2276",
        "headBlob": "ee06062f54419ce40acf92656f14d1957fb41323",
        "diff": "diff --git a/apps/cli/src/daemon/daemon-record-observer.ts b/apps/cli/src/daemon/daemon-record-observer.ts\nindex 9a5dac34c..ee06062f5 100644\n--- a/apps/cli/src/daemon/daemon-record-observer.ts\n+++ b/apps/cli/src/daemon/daemon-record-observer.ts\n@@ -44,7 +44,6 @@ export class DaemonRecordObserver {\n   constructor(\n     private readonly transport: DaemonLifecycleRequestSender,\n     private readonly processTerminator: DaemonProcessTerminator,\n-    _now: () => number = Date.now,\n   ) {}\n \n   async observeIdentity(record: DaemonRecord): Promise<DaemonIdentityObservation> {\n"
      },
      {
        "path": "apps/cli/src/daemon/daemon-registry.ts",
        "basePath": "apps/cli/src/daemon/daemon-registry.ts",
        "status": "edited before freeze",
        "baseBlob": "4fc6591b01563006cb6ddc2b9b6e23792144c8a7",
        "headBlob": "c544957c3a54bd061716dc5139ace2ed880c0f11",
        "diff": "diff --git a/apps/cli/src/daemon/daemon-registry.ts b/apps/cli/src/daemon/daemon-registry.ts\nindex 4fc6591b0..c544957c3 100644\n--- a/apps/cli/src/daemon/daemon-registry.ts\n+++ b/apps/cli/src/daemon/daemon-registry.ts\n@@ -10,6 +10,7 @@ import {\n import { randomUUID } from \"node:crypto\";\n import { dirname, join } from \"node:path\";\n import type { DaemonPolicyValues } from \"@symnav/daemon\";\n+import { NodeDaemonClock, type DaemonClock } from \"./daemon-clock.js\";\n import {\n   DAEMON_PROTOCOL_VERSION,\n   DAEMON_RECORD_SCHEMA_VERSION,\n@@ -46,6 +47,17 @@ interface StartupMutationOwner {\n   readonly token: string;\n }\n \n+interface StartupOwnershipExpectation {\n+  readonly identityKey: string;\n+  readonly instanceId: string;\n+  readonly processToken?: string;\n+  readonly ownerKind?: DaemonStartupOwner[\"ownerKind\"];\n+  readonly ownerPid?: number;\n+  readonly acquiredAt?: number;\n+  readonly heartbeatAt?: number;\n+  readonly revision?: string;\n+}\n+\n class RegistryStartupMutationLease {\n   private released = false;\n \n@@ -116,6 +128,7 @@ export class DaemonRegistry {\n   constructor(\n     private readonly registryDirectory: string,\n     startupPolicy: DaemonPolicyValues[\"startup\"],\n+    private readonly clock: Pick<DaemonClock, \"wallNowMs\"> = new NodeDaemonClock(),\n     platform: NodeJS.Platform = process.platform,\n     renamePath: typeof renameSync = renameSync,\n   ) {\n@@ -164,43 +177,47 @@ export class DaemonRegistry {\n   }\n \n   writeIfStartupOwner(identity: DaemonWorkspaceIdentity, record: DaemonRecord): boolean {\n-    const owner = this.startupOwner(identity);\n-    if (\n-      owner?.identityKey !== identity.identityKey ||\n-      owner.instanceId !== record.instanceId ||\n-      owner.processToken !== record.processToken ||\n-      owner.ownerKind !== \"daemon\" ||\n-      owner.ownerPid !== record.pid\n-    ) {\n-      return false;\n-    }\n+    const owner = this.startupOwnershipMatches(identity, {\n+      identityKey: identity.identityKey,\n+      instanceId: record.instanceId,\n+      processToken: record.processToken,\n+      ownerKind: \"daemon\",\n+      ownerPid: record.pid,\n+    });\n+    if (owner === undefined) return false;\n     const current = this.readInstance(identity, record.instanceId);\n     if (current?.state !== \"starting\") return false;\n     this.write(record);\n-    if (DaemonRegistry.sameStartupOwner(this.startupOwner(identity), owner)) return true;\n+    if (this.startupOwnershipMatches(identity, owner) !== undefined) return true;\n     this.removeIfProcess(identity, record.instanceId, record.processToken);\n     return false;\n   }\n \n   writeStartingIfStartupOwner(identity: DaemonWorkspaceIdentity, record: DaemonRecord): boolean {\n-    if (record.state !== \"starting\" || !this.isStartupOwner(identity, record.instanceId)) {\n+    if (record.state !== \"starting\") {\n       return false;\n     }\n-    const owner = this.startupOwner(identity);\n-    if (\n-      record.pid > 0 &&\n-      owner?.identityKey === identity.identityKey &&\n-      owner.instanceId === record.instanceId &&\n-      owner.processToken === record.processToken &&\n-      owner.ownerKind === \"daemon\" &&\n-      owner.ownerPid === record.pid\n-    ) {\n-      this.write(record);\n-      return DaemonRegistry.sameStartupOwner(this.startupOwner(identity), owner);\n+    const owner = this.startupOwnershipMatches(identity, {\n+      identityKey: identity.identityKey,\n+      instanceId: record.instanceId,\n+    });\n+    if (owner === undefined) return false;\n+    if (record.pid > 0) {\n+      const daemonOwner = this.startupOwnershipMatches(identity, {\n+        identityKey: identity.identityKey,\n+        instanceId: record.instanceId,\n+        processToken: record.processToken,\n+        ownerKind: \"daemon\",\n+        ownerPid: record.pid,\n+      });\n+      if (daemonOwner !== undefined) {\n+        this.write(record);\n+        return this.startupOwnershipMatches(identity, daemonOwner) !== undefined;\n+      }\n+      return this.writeClaimedStartingRecord(identity, record);\n     }\n-    if (record.pid > 0) return this.writeClaimedStartingRecord(identity, record);\n     this.write(record);\n-    if (this.isStartupOwner(identity, record.instanceId)) return true;\n+    if (this.startupOwnershipMatches(identity, owner) !== undefined) return true;\n     this.removeIfProcess(identity, record.instanceId, record.processToken);\n     return false;\n   }\n@@ -217,15 +234,18 @@ export class DaemonRegistry {\n     const mutation = this.beginStartupMutation(identity);\n     if (mutation === undefined) return false;\n     try {\n-      const owner = this.startupOwner(identity);\n-      if (owner?.instanceId !== record.instanceId) return false;\n+      const owner = this.startupOwnershipMatches(identity, {\n+        identityKey: identity.identityKey,\n+        instanceId: record.instanceId,\n+      });\n+      if (owner === undefined) return false;\n       const adoptedOwner: StartupOwner = {\n         ...owner,\n         identityKey: identity.identityKey,\n         ownerPid: record.pid > 0 ? record.pid : owner.ownerPid,\n         processToken: record.processToken,\n         ownerKind: record.pid > 0 ? \"daemon\" : \"launcher\",\n-        heartbeatAt: Date.now(),\n+        heartbeatAt: this.clock.wallNowMs(),\n         revision: randomUUID(),\n       };\n       const ownerPath = identity.startupOwnerPath(identity.lockPath);\n@@ -234,10 +254,7 @@ export class DaemonRegistry {\n         encoding: \"utf8\",\n         mode: 0o600,\n       });\n-      if (\n-        !mutation.isOwned() ||\n-        !DaemonRegistry.sameStartupOwner(this.startupOwner(identity), owner)\n-      ) {\n+      if (!mutation.isOwned() || this.startupOwnershipMatches(identity, owner) === undefined) {\n         rmSync(temporaryPath, { force: true });\n         return false;\n       }\n@@ -249,12 +266,7 @@ export class DaemonRegistry {\n         if (DaemonRegistry.errorCode(error) === \"ENOENT\") return false;\n         throw error;\n       }\n-      const currentOwner = this.startupOwner(identity);\n-      return (\n-        currentOwner?.instanceId === record.instanceId &&\n-        currentOwner.ownerPid === adoptedOwner.ownerPid &&\n-        currentOwner.processToken === record.processToken\n-      );\n+      return this.startupOwnershipMatches(identity, adoptedOwner) !== undefined;\n     } finally {\n       mutation.release();\n     }\n@@ -270,7 +282,7 @@ export class DaemonRegistry {\n     candidate: Omit<DaemonStartupOwner, \"acquiredAt\" | \"revision\"> | string,\n   ): StartupLease | undefined {\n     mkdirSync(identity.identityDirectory, { recursive: true, mode: 0o700 });\n-    const acquiredAt = Date.now();\n+    const acquiredAt = this.clock.wallNowMs();\n     const suppliedOwner =\n       typeof candidate === \"string\"\n         ? {\n@@ -317,27 +329,31 @@ export class DaemonRegistry {\n     pid: number,\n   ): DaemonStartupLease | undefined {\n     if (!Number.isInteger(pid) || pid <= 0) return undefined;\n-    const owner = this.startupOwner(identity);\n-    if (\n-      owner?.identityKey !== identity.identityKey ||\n-      owner.instanceId !== instanceId ||\n-      owner.processToken !== processToken\n-    ) {\n-      return undefined;\n-    }\n-    if (owner.ownerKind === \"daemon\") {\n-      return owner.ownerPid === pid ? new RegistryStartupLease(this, identity, owner) : undefined;\n-    }\n-    const daemonOwner = this.replaceStartupOwnerIfOwner(identity, owner, {\n-      ...owner,\n+    const daemonOwner = this.startupOwnershipMatches(identity, {\n+      identityKey: identity.identityKey,\n+      instanceId,\n+      processToken,\n+      ownerKind: \"daemon\",\n+      ownerPid: pid,\n+    });\n+    if (daemonOwner !== undefined) return new RegistryStartupLease(this, identity, daemonOwner);\n+    const launcherOwner = this.startupOwnershipMatches(identity, {\n+      identityKey: identity.identityKey,\n+      instanceId,\n+      processToken,\n+      ownerKind: \"launcher\",\n+    });\n+    if (launcherOwner === undefined) return undefined;\n+    const transferredOwner = this.replaceStartupOwnerIfOwner(identity, launcherOwner, {\n+      ...launcherOwner,\n       ownerPid: pid,\n       ownerKind: \"daemon\",\n-      heartbeatAt: Date.now(),\n+      heartbeatAt: this.clock.wallNowMs(),\n       revision: randomUUID(),\n     });\n-    return daemonOwner === undefined\n+    return transferredOwner === undefined\n       ? undefined\n-      : new RegistryStartupLease(this, identity, daemonOwner);\n+      : new RegistryStartupLease(this, identity, transferredOwner);\n   }\n \n   transferStartupToDaemon(\n@@ -346,20 +362,20 @@ export class DaemonRegistry {\n     pid: number,\n     processToken: string,\n   ): boolean {\n-    if (\n-      launcherOwner.ownerKind !== \"launcher\" ||\n-      launcherOwner.processToken !== processToken ||\n-      !Number.isInteger(pid) ||\n-      pid <= 0\n-    ) {\n-      return false;\n-    }\n+    if (!Number.isInteger(pid) || pid <= 0) return false;\n+    const currentLauncher = this.startupOwnershipMatches(identity, {\n+      ...launcherOwner,\n+      identityKey: identity.identityKey,\n+      processToken,\n+      ownerKind: \"launcher\",\n+    });\n+    if (currentLauncher === undefined) return false;\n     return (\n-      this.replaceStartupOwnerIfOwner(identity, launcherOwner, {\n-        ...launcherOwner,\n+      this.replaceStartupOwnerIfOwner(identity, currentLauncher, {\n+        ...currentLauncher,\n         ownerPid: pid,\n         ownerKind: \"daemon\",\n-        heartbeatAt: Date.now(),\n+        heartbeatAt: this.clock.wallNowMs(),\n         revision: randomUUID(),\n       }) !== undefined\n     );\n@@ -371,21 +387,24 @@ export class DaemonRegistry {\n   ): StartupOwner | undefined {\n     return this.replaceStartupOwnerIfOwner(identity, owner, {\n       ...owner,\n-      heartbeatAt: Date.now(),\n+      heartbeatAt: this.clock.wallNowMs(),\n       revision: randomUUID(),\n     });\n   }\n \n   refreshStartupOwner(identity: DaemonWorkspaceIdentity, instanceId: string): boolean {\n-    const owner = this.startupOwner(identity);\n-    if (owner?.instanceId !== instanceId) return false;\n+    const owner = this.startupOwnershipMatches(identity, {\n+      identityKey: identity.identityKey,\n+      instanceId,\n+    });\n+    if (owner === undefined) return false;\n     return this.heartbeatStartupOwner(identity, owner) !== undefined;\n   }\n \n   startupOwnerIsWithinGrace(\n     owner: StartupOwner,\n     graceMs = this.startupPolicy.coordinationGraceMs,\n-    now = Date.now(),\n+    now = this.clock.wallNowMs(),\n   ): boolean {\n     return now - owner.heartbeatAt <= graceMs;\n   }\n@@ -404,20 +423,117 @@ export class DaemonRegistry {\n     }\n   }\n \n+  daemonOwnsStartupProcess(\n+    identity: DaemonWorkspaceIdentity,\n+    instanceId: string,\n+    processToken: string,\n+    pid: number,\n+  ): boolean {\n+    return (\n+      this.startupOwnershipMatches(identity, {\n+        identityKey: identity.identityKey,\n+        instanceId,\n+        processToken,\n+        ownerKind: \"daemon\",\n+        ownerPid: pid,\n+      }) !== undefined\n+    );\n+  }\n+\n+  startupOwnerForInstance(\n+    identity: DaemonWorkspaceIdentity,\n+    instanceId: string,\n+  ): StartupOwner | undefined {\n+    return this.startupOwnershipMatches(identity, {\n+      identityKey: identity.identityKey,\n+      instanceId,\n+    });\n+  }\n+\n+  startupOwnerForRecordCredentials(\n+    identity: DaemonWorkspaceIdentity,\n+    record: DaemonRecord,\n+  ): StartupOwner | undefined {\n+    return this.startupOwnershipMatches(identity, {\n+      identityKey: identity.identityKey,\n+      instanceId: record.instanceId,\n+      processToken: record.processToken,\n+    });\n+  }\n+\n+  recordForProcess(\n+    identity: DaemonWorkspaceIdentity,\n+    instanceId: string,\n+    processToken: string,\n+  ): DaemonRecord | undefined {\n+    const record = this.readStoredInstance(identity, instanceId);\n+    return record?.processToken === processToken ? record : undefined;\n+  }\n+\n+  startingRecordForProcess(\n+    identity: DaemonWorkspaceIdentity,\n+    instanceId: string,\n+    processToken: string,\n+  ): DaemonRecord | undefined {\n+    const record = this.recordForProcess(identity, instanceId, processToken);\n+    return record?.state === \"starting\" ? record : undefined;\n+  }\n+\n+  removeStartupLockIfLauncher(\n+    identity: DaemonWorkspaceIdentity,\n+    instanceId: string,\n+    processToken: string,\n+  ): boolean {\n+    const owner = this.startupOwnershipMatches(identity, {\n+      identityKey: identity.identityKey,\n+      instanceId,\n+      processToken,\n+      ownerKind: \"launcher\",\n+    });\n+    return owner === undefined ? false : this.removeStartupLockIfOwner(identity, owner);\n+  }\n+\n+  removeAbandonedStartupOwner(\n+    identity: DaemonWorkspaceIdentity,\n+    observedOwner: StartupOwner,\n+  ): boolean {\n+    const owner = this.startupOwnershipMatches(identity, observedOwner);\n+    if (owner === undefined) return false;\n+    const record = this.readStoredInstance(identity, owner.instanceId);\n+    if (\n+      record !== undefined &&\n+      ((owner.processToken.length > 0 && record.processToken !== owner.processToken) ||\n+        (owner.ownerKind === \"daemon\" && record.pid !== owner.ownerPid))\n+    ) {\n+      return false;\n+    }\n+    if (!this.removeStartupLockIfOwner(identity, owner)) return false;\n+    if (record !== undefined)\n+      this.removeIfProcess(identity, record.instanceId, record.processToken);\n+    return true;\n+  }\n+\n   isStartupOwner(identity: DaemonWorkspaceIdentity, instanceId: string): boolean {\n-    return this.startupOwner(identity)?.instanceId === instanceId;\n+    return (\n+      this.startupOwnershipMatches(identity, {\n+        identityKey: identity.identityKey,\n+        instanceId,\n+      }) !== undefined\n+    );\n   }\n \n   startupOwnerMatchesProcess(identity: DaemonWorkspaceIdentity, record: DaemonRecord): boolean {\n     if (record.pid <= 0) return false;\n-    const owner = this.startupOwner(identity);\n+    const owner = this.startupOwnershipMatches(identity, {\n+      identityKey: identity.identityKey,\n+      instanceId: record.instanceId,\n+      processToken: record.processToken,\n+      ownerKind: \"daemon\",\n+      ownerPid: record.pid,\n+    });\n     const stored = this.readStoredInstance(identity, record.instanceId);\n     return (\n-      owner?.instanceId === record.instanceId &&\n-      owner.identityKey === identity.identityKey &&\n-      owner.ownerKind === \"daemon\" &&\n-      owner.ownerPid === record.pid &&\n-      owner.processToken === record.processToken &&\n+      owner !== undefined &&\n       stored?.pid === record.pid &&\n       stored.processToken === record.processToken &&\n       stored.startedAt === record.startedAt\n@@ -425,15 +541,24 @@ export class DaemonRegistry {\n   }\n \n   removeStartupLockIfProcess(identity: DaemonWorkspaceIdentity, record: DaemonRecord): boolean {\n-    const owner = this.startupOwner(identity);\n+    const owner = this.startupOwnershipMatches(identity, {\n+      identityKey: identity.identityKey,\n+      instanceId: record.instanceId,\n+      processToken: record.processToken,\n+      ownerKind: \"daemon\",\n+      ownerPid: record.pid,\n+    });\n     if (owner === undefined || !this.startupOwnerMatchesProcess(identity, record)) return false;\n     return this.removeStartupLockIfOwner(identity, owner);\n   }\n \n   removeStartupLockIfInstance(identity: DaemonWorkspaceIdentity, instanceId: string): boolean {\n     const releasedPath = identity.releasedStartupLockPath(instanceId);\n-    const owner = this.startupOwner(identity);\n-    if (owner?.instanceId !== instanceId) {\n+    const owner = this.startupOwnershipMatches(identity, {\n+      identityKey: identity.identityKey,\n+      instanceId,\n+    });\n+    if (owner === undefined) {\n       return DaemonRegistry.readStartupOwner(identity, releasedPath)?.instanceId === instanceId;\n     }\n     try {\n@@ -456,7 +581,7 @@ export class DaemonRegistry {\n     try {\n       if (\n         !mutation.isOwned() ||\n-        !DaemonRegistry.sameStartupOwner(this.startupOwner(identity), observedOwner)\n+        this.startupOwnershipMatches(identity, observedOwner) === undefined\n       ) {\n         return false;\n       }\n@@ -544,7 +669,7 @@ export class DaemonRegistry {\n     if (\n       observedOwner !== undefined &&\n       DaemonRegistry.processIsAlive(observedOwner.ownerPid) &&\n-      Date.now() - observedOwner.acquiredAt <= this.startupPolicy.coordinationGraceMs\n+      this.clock.wallNowMs() - observedOwner.acquiredAt <= this.startupPolicy.coordinationGraceMs\n     ) {\n       return undefined;\n     }\n@@ -559,7 +684,7 @@ export class DaemonRegistry {\n     const token = randomUUID();\n     const owner: StartupMutationOwner = {\n       ownerPid: process.pid,\n-      acquiredAt: Date.now(),\n+      acquiredAt: this.clock.wallNowMs(),\n       token,\n     };\n     const claimPath = identity.startupMutationClaimPath(token);\n@@ -714,20 +839,24 @@ export class DaemonRegistry {\n     );\n   }\n \n-  private static sameStartupOwner(\n-    current: StartupOwner | undefined,\n-    observed: StartupOwner,\n-  ): boolean {\n-    return (\n-      current?.instanceId === observed.instanceId &&\n-      current.identityKey === observed.identityKey &&\n-      current.ownerPid === observed.ownerPid &&\n-      current.processToken === observed.processToken &&\n-      current.ownerKind === observed.ownerKind &&\n-      current.acquiredAt === observed.acquiredAt &&\n-      current.heartbeatAt === observed.heartbeatAt &&\n-      current.revision === observed.revision\n-    );\n+  private startupOwnershipMatches(\n+    identity: DaemonWorkspaceIdentity,\n+    expectation: StartupOwnershipExpectation,\n+  ): StartupOwner | undefined {\n+    const owner = this.startupOwner(identity);\n+    if (\n+      owner?.identityKey !== expectation.identityKey ||\n+      owner.instanceId !== expectation.instanceId ||\n+      (expectation.processToken !== undefined && owner.processToken !== expectation.processToken) ||\n+      (expectation.ownerKind !== undefined && owner.ownerKind !== expectation.ownerKind) ||\n+      (expectation.ownerPid !== undefined && owner.ownerPid !== expectation.ownerPid) ||\n+      (expectation.acquiredAt !== undefined && owner.acquiredAt !== expectation.acquiredAt) ||\n+      (expectation.heartbeatAt !== undefined && owner.heartbeatAt !== expectation.heartbeatAt) ||\n+      (expectation.revision !== undefined && owner.revision !== expectation.revision)\n+    ) {\n+      return undefined;\n+    }\n+    return owner;\n   }\n \n   private static sameStartupMutationOwner(\n@@ -829,7 +958,7 @@ export class DaemonRegistry {\n       });\n       if (\n         !mutation.isOwned() ||\n-        !DaemonRegistry.sameStartupOwner(this.startupOwner(identity), observedOwner)\n+        this.startupOwnershipMatches(identity, observedOwner) === undefined\n       ) {\n         rmSync(temporaryPath, { force: true });\n         return undefined;\n@@ -841,7 +970,7 @@ export class DaemonRegistry {\n         if (DaemonRegistry.errorCode(error) === \"ENOENT\") return undefined;\n         throw error;\n       }\n-      return DaemonRegistry.sameStartupOwner(this.startupOwner(identity), replacementOwner)\n+      return this.startupOwnershipMatches(identity, replacementOwner) !== undefined\n         ? replacementOwner\n         : undefined;\n     } finally {\n"
      },
      {
        "path": "apps/cli/src/daemon/daemon-resource-monitor.ts",
        "basePath": "apps/cli/src/daemon/daemon-resource-monitor.ts",
        "status": "edited before freeze",
        "baseBlob": "124bbd137f926c81bd6b757e122456f3b61992d1",
        "headBlob": "a338d4231aeca2160ae48e5b81822168215d2cf2",
        "diff": "diff --git a/apps/cli/src/daemon/daemon-resource-monitor.ts b/apps/cli/src/daemon/daemon-resource-monitor.ts\nindex 124bbd137..a338d4231 100644\n--- a/apps/cli/src/daemon/daemon-resource-monitor.ts\n+++ b/apps/cli/src/daemon/daemon-resource-monitor.ts\n@@ -1,5 +1,6 @@\n import type { DaemonPolicyValues } from \"@symnav/daemon\";\n import type { DaemonWorkerReplacementCause } from \"./daemon-protocol.js\";\n+import { NodeDaemonClock, type DaemonClock } from \"./daemon-clock.js\";\n \n export type DaemonResourceState =\n   | \"warming\"\n@@ -26,7 +27,7 @@ export interface DaemonResourceSnapshot {\n export interface DaemonResourceSupervisorOptions {\n   readonly policy: DaemonPolicyValues[\"resources\"];\n   readonly generation: number;\n-  readonly now?: () => number;\n+  readonly clock?: Pick<DaemonClock, \"wallNowMs\">;\n   readonly residentMemoryBytes?: () => number;\n   readonly spoolBytes: () => number;\n   readonly scheduleAtTurnBoundary: (operation: () => Promise<void>) => Promise<void>;\n@@ -39,7 +40,7 @@ export type { DaemonWorkerReplacementCause } from \"./daemon-protocol.js\";\n \n export class DaemonResourceSupervisor {\n   private readonly residentMemoryBytes: () => number;\n-  private readonly now: () => number;\n+  private readonly clock: Pick<DaemonClock, \"wallNowMs\">;\n   private timer: ReturnType<typeof setInterval> | undefined;\n   private currentState: DaemonResourceState = \"ready\";\n   private currentGeneration: number;\n@@ -58,7 +59,7 @@ export class DaemonResourceSupervisor {\n \n   constructor(private readonly options: DaemonResourceSupervisorOptions) {\n     this.currentGeneration = options.generation;\n-    this.now = options.now ?? Date.now;\n+    this.clock = options.clock ?? new NodeDaemonClock();\n     this.residentMemoryBytes = options.residentMemoryBytes ?? (() => process.memoryUsage().rss);\n   }\n \n@@ -154,7 +155,7 @@ export class DaemonResourceSupervisor {\n \n   private replace(cause: DaemonWorkerReplacementCause): Promise<void> {\n     if (this.replacementOperation !== undefined) return this.replacementOperation;\n-    const cutoff = this.now() - this.options.policy.replacementWindowMs;\n+    const cutoff = this.clock.wallNowMs() - this.options.policy.replacementWindowMs;\n     this.replacementTimes = this.replacementTimes.filter((replacedAt) => replacedAt > cutoff);\n     if (this.replacementTimes.length >= this.options.policy.replacementLimit) {\n       this.currentState = \"draining\";\n@@ -173,7 +174,7 @@ export class DaemonResourceSupervisor {\n         this.workerHeapUsedBytes = undefined;\n         this.workerHeapLimitBytes = undefined;\n         this.replacementCount += 1;\n-        this.replacementTimes.push(this.now());\n+        this.replacementTimes.push(this.clock.wallNowMs());\n         this.shedCompleted = false;\n         this.admissionPaused = false;\n         this.currentState = \"ready\";\n"
      },
      {
        "path": "apps/cli/src/daemon/daemon-result-transfer-receiver.ts",
        "basePath": "apps/cli/src/daemon/daemon-result-transfer-receiver.ts",
        "status": "unchanged",
        "baseBlob": "e39e20bca9968ff5dca2fff3166f52d1a27562de",
        "headBlob": "e39e20bca9968ff5dca2fff3166f52d1a27562de",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-runtime-values.ts",
        "basePath": "apps/cli/src/daemon/daemon-runtime-values.ts",
        "status": "unchanged",
        "baseBlob": "1b39d62be48cabefbf3fa14686603aa3c11ea94c",
        "headBlob": "1b39d62be48cabefbf3fa14686603aa3c11ea94c",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-startup-coordinator.ts",
        "basePath": "apps/cli/src/daemon/daemon-startup-coordinator.ts",
        "status": "edited before freeze",
        "baseBlob": "145dda980a8b24e05a30d01949af277ad48cdb03",
        "headBlob": "38892ace5f7a9292da6477c0564f12a11f57e22b",
        "diff": "diff --git a/apps/cli/src/daemon/daemon-startup-coordinator.ts b/apps/cli/src/daemon/daemon-startup-coordinator.ts\nindex 145dda980..38892ace5 100644\n--- a/apps/cli/src/daemon/daemon-startup-coordinator.ts\n+++ b/apps/cli/src/daemon/daemon-startup-coordinator.ts\n@@ -14,6 +14,7 @@ import type { DaemonRegistry, StartupOwner } from \"./daemon-registry.js\";\n import { DaemonRecordObserver } from \"./daemon-record-observer.js\";\n import type { DaemonWorkspaceIdentity } from \"./daemon-workspace-identity.js\";\n import type { DaemonExecutionRequester, DaemonLifecycleRequestSender } from \"./daemon-transport.js\";\n+import { NodeDaemonClock, type DaemonClock } from \"./daemon-clock.js\";\n \n export type DaemonWarmupTriggerResult =\n   | { readonly status: \"launched\"; readonly instanceId: string; readonly pid: number }\n@@ -22,7 +23,7 @@ export type DaemonWarmupTriggerResult =\n \n interface DaemonStartupCoordinatorOptions {\n   readonly policy: Pick<DaemonPolicyValues, \"startup\" | \"shutdown\">;\n-  readonly now?: () => number;\n+  readonly clock?: Pick<DaemonClock, \"wallNowMs\">;\n   readonly instanceId?: () => string;\n   readonly processTerminator?: DaemonProcessTerminator;\n }\n@@ -46,7 +47,7 @@ export class DaemonStartupCoordinator {\n   private readonly childFailureRetryLimit: number;\n   private readonly terminationTimeoutMs: number;\n   private readonly pollIntervalMs: number;\n-  private readonly now: () => number;\n+  private readonly clock: Pick<DaemonClock, \"wallNowMs\">;\n   private readonly nextInstanceId: () => string;\n   private readonly processTerminator: DaemonProcessTerminator;\n   private readonly observer: DaemonRecordObserver;\n@@ -66,11 +67,11 @@ export class DaemonStartupCoordinator {\n     this.childFailureRetryLimit = policy.startup.childFailureRetryLimit;\n     this.terminationTimeoutMs = policy.startup.previousInstanceTerminationTimeoutMs;\n     this.pollIntervalMs = policy.startup.observationPollIntervalMs;\n-    this.now = options.now ?? Date.now;\n+    this.clock = options.clock ?? new NodeDaemonClock();\n     this.nextInstanceId = options.instanceId ?? randomUUID;\n     this.processTerminator =\n-      options.processTerminator ?? new NodeDaemonProcessTerminator(policy.shutdown);\n-    this.observer = new DaemonRecordObserver(this.transport, this.processTerminator, this.now);\n+      options.processTerminator ?? new NodeDaemonProcessTerminator(policy.shutdown, this.clock);\n+    this.observer = new DaemonRecordObserver(this.transport, this.processTerminator);\n   }\n \n   async ensureRunning(identity: DaemonWorkspaceIdentity): Promise<DaemonStartResult> {\n@@ -113,7 +114,7 @@ export class DaemonStartupCoordinator {\n       processToken,\n       ownerPid: process.pid,\n       ownerKind: \"launcher\",\n-      heartbeatAt: this.now(),\n+      heartbeatAt: this.clock.wallNowMs(),\n     });\n     if (lease === undefined) return this.observeElectedWarmup(identity);\n     try {\n@@ -151,7 +152,7 @@ export class DaemonStartupCoordinator {\n                 status: \"ready\",\n                 workspaceRoot: record.workspaceRoot,\n                 fileCount: record.fileCount ?? 0,\n-                loadDurationMs: (record.readyAt ?? this.now()) - record.startedAt,\n+                loadDurationMs: (record.readyAt ?? this.clock.wallNowMs()) - record.startedAt,\n               }\n             : this.alreadyRunning(record);\n         }\n@@ -195,12 +196,12 @@ export class DaemonStartupCoordinator {\n         if (missingOwner?.instanceId !== storedRecord.instanceId) {\n           missingOwner = {\n             instanceId: storedRecord.instanceId,\n-            firstObservedAt: this.now(),\n+            firstObservedAt: this.clock.wallNowMs(),\n           };\n           await this.pause();\n           continue;\n         }\n-        if (this.now() - missingOwner.firstObservedAt <= this.coordinationGraceMs) {\n+        if (this.clock.wallNowMs() - missingOwner.firstObservedAt <= this.coordinationGraceMs) {\n           await this.pause();\n           continue;\n         }\n@@ -224,7 +225,7 @@ export class DaemonStartupCoordinator {\n     processToken: string,\n     lease: NonNullable<ReturnType<DaemonRegistry[\"acquireStartup\"]>>,\n   ): Promise<DaemonWarmupTriggerResult> {\n-    const startedAt = this.now();\n+    const startedAt = this.clock.wallNowMs();\n     const startingRecord: DaemonRecord = {\n       schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,\n       protocolVersion: DAEMON_PROTOCOL_VERSION,\n@@ -248,15 +249,13 @@ export class DaemonStartupCoordinator {\n     try {\n       daemonProcess = await this.launcher.launch(identity, instanceId, processToken);\n       const transferred = lease.transferToDaemon(daemonProcess.pid, processToken);\n-      const daemonOwner = this.registry.startupOwner(identity);\n       if (\n         !transferred &&\n-        !(\n-          daemonOwner?.identityKey === identity.identityKey &&\n-          daemonOwner.instanceId === instanceId &&\n-          daemonOwner.processToken === processToken &&\n-          daemonOwner.ownerKind === \"daemon\" &&\n-          daemonOwner.ownerPid === daemonProcess.pid\n+        !this.registry.daemonOwnsStartupProcess(\n+          identity,\n+          instanceId,\n+          processToken,\n+          daemonProcess.pid,\n         )\n       ) {\n         throw new Error(\"Daemon startup ownership changed after process launch\");\n@@ -304,8 +303,9 @@ export class DaemonStartupCoordinator {\n   ): void {\n     void daemonProcess.exited.then((exit) => {\n       this.launchedExits.set(instanceId, exit);\n-      const record = this.registry.readStoredInstance(identity, instanceId);\n-      if (record?.state === \"starting\" && record.processToken === processToken) {\n+      if (\n+        this.registry.startingRecordForProcess(identity, instanceId, processToken) !== undefined\n+      ) {\n         this.cleanupLaunchedProcess(identity, instanceId, processToken);\n       }\n     });\n@@ -316,15 +316,12 @@ export class DaemonStartupCoordinator {\n     instanceId: string,\n     processToken: string,\n   ): void {\n-    const record = this.registry.readStoredInstance(identity, instanceId);\n-    if (record?.processToken === processToken) {\n+    const record = this.registry.recordForProcess(identity, instanceId, processToken);\n+    if (record !== undefined) {\n       if (record.pid > 0) {\n         this.registry.removeStartupLockIfProcess(identity, record);\n       } else {\n-        const owner = this.registry.startupOwner(identity);\n-        if (owner?.instanceId === instanceId && owner.processToken === processToken) {\n-          this.registry.removeStartupLockIfOwner(identity, owner);\n-        }\n+        this.registry.removeStartupLockIfLauncher(identity, instanceId, processToken);\n       }\n     }\n     this.registry.removeIfProcess(identity, instanceId, processToken);\n@@ -360,19 +357,7 @@ export class DaemonStartupCoordinator {\n   }\n \n   private cleanupAbandonedStartup(identity: DaemonWorkspaceIdentity, owner: StartupOwner): boolean {\n-    const record = this.registry.readStoredInstance(identity, owner.instanceId);\n-    if (\n-      record !== undefined &&\n-      ((owner.processToken.length > 0 && record.processToken !== owner.processToken) ||\n-        (owner.ownerKind === \"daemon\" && record.pid !== owner.ownerPid))\n-    ) {\n-      return false;\n-    }\n-    if (!this.registry.removeStartupLockIfOwner(identity, owner)) return false;\n-    if (record !== undefined) {\n-      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);\n-    }\n-    return true;\n+    return this.registry.removeAbandonedStartupOwner(identity, owner);\n   }\n \n   private startupOwnerIsAbandoned(identity: DaemonWorkspaceIdentity, owner: StartupOwner): boolean {\n@@ -442,8 +427,8 @@ export class DaemonStartupCoordinator {\n   }\n \n   private async waitForProcessExitAndEndpointRelease(record: DaemonRecord): Promise<void> {\n-    const waitStartedAt = this.now();\n-    while (this.now() - waitStartedAt <= this.terminationTimeoutMs) {\n+    const waitStartedAt = this.clock.wallNowMs();\n+    while (this.clock.wallNowMs() - waitStartedAt <= this.terminationTimeoutMs) {\n       const endpointReleased = !(await this.identifiesRecordedProcess(record));\n       const processExited = !this.processTerminator.isAlive(record.pid);\n       if (endpointReleased && processExited) return;\n@@ -497,7 +482,7 @@ export class DaemonStartupCoordinator {\n       status: \"already-running\",\n       workspaceRoot: record.workspaceRoot,\n       pid: record.pid,\n-      uptimeMs: Math.max(0, this.now() - record.startedAt),\n+      uptimeMs: Math.max(0, this.clock.wallNowMs() - record.startedAt),\n     };\n   }\n \n"
      },
      {
        "path": "apps/cli/src/daemon/daemon-transport-error.ts",
        "basePath": "apps/cli/src/daemon/daemon-transport-error.ts",
        "status": "unchanged",
        "baseBlob": "8656f748017b09dca74a909e674cdc905872e858",
        "headBlob": "8656f748017b09dca74a909e674cdc905872e858",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-transport.ts",
        "basePath": "apps/cli/src/daemon/daemon-transport.ts",
        "status": "unchanged",
        "baseBlob": "77d5b0f0995c0da0b5db0a56a20daca5b7b8e2b2",
        "headBlob": "77d5b0f0995c0da0b5db0a56a20daca5b7b8e2b2",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-wire-codec.ts",
        "basePath": "apps/cli/src/daemon/daemon-wire-codec.ts",
        "status": "unchanged",
        "baseBlob": "8e9dc9dca3fefbbb65da00f62fad0eaf409d797a",
        "headBlob": "8e9dc9dca3fefbbb65da00f62fad0eaf409d797a",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-worker-generation-manager.ts",
        "basePath": "apps/cli/src/daemon/daemon-worker-generation-manager.ts",
        "status": "unchanged",
        "baseBlob": "ebb5e0b4559922a8440ef00980171bb3d3eef74d",
        "headBlob": "ebb5e0b4559922a8440ef00980171bb3d3eef74d",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/daemon-workspace-identity.ts",
        "basePath": "apps/cli/src/daemon/daemon-workspace-identity.ts",
        "status": "unchanged",
        "baseBlob": "493e82840ac05f5e15745d7fa9006636b1b82a50",
        "headBlob": "493e82840ac05f5e15745d7fa9006636b1b82a50",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/local-daemon-socket-client.ts",
        "basePath": "apps/cli/src/daemon/local-daemon-socket-client.ts",
        "status": "unchanged",
        "baseBlob": "e4f427495bdd41602b20710c533361286fe40106",
        "headBlob": "e4f427495bdd41602b20710c533361286fe40106",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/local-daemon-socket-server.ts",
        "basePath": "apps/cli/src/daemon/local-daemon-socket-server.ts",
        "status": "unchanged",
        "baseBlob": "040c9175f4b294222783a07f767409071373ce45",
        "headBlob": "040c9175f4b294222783a07f767409071373ce45",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/local-daemon-transport.ts",
        "basePath": "apps/cli/src/daemon/local-daemon-transport.ts",
        "status": "unchanged",
        "baseBlob": "c171629fa6a16a36ef9c724d9de8d3ad63910a1b",
        "headBlob": "c171629fa6a16a36ef9c724d9de8d3ad63910a1b",
        "diff": ""
      },
      {
        "path": "apps/cli/src/daemon/workspace-request-queue.ts",
        "basePath": "apps/cli/src/daemon/workspace-request-queue.ts",
        "status": "edited before freeze",
        "baseBlob": "f51da05ac10f6d5c235122df0290dd4a458b93df",
        "headBlob": "c2f97d94c3f78afa206fa686699da26ee4983f2c",
        "diff": "diff --git a/apps/cli/src/daemon/workspace-request-queue.ts b/apps/cli/src/daemon/workspace-request-queue.ts\nindex f51da05ac..c2f97d94c 100644\n--- a/apps/cli/src/daemon/workspace-request-queue.ts\n+++ b/apps/cli/src/daemon/workspace-request-queue.ts\n@@ -1,4 +1,5 @@\n import type { DaemonCommandName, WorkspaceRequestQueueState } from \"@symnav/daemon\";\n+import { NodeDaemonClock, type DaemonClock } from \"./daemon-clock.js\";\n \n export interface WorkspaceQueuedRequest {\n   readonly requestId: string;\n@@ -32,7 +33,9 @@ export class WorkspaceRequestQueue {\n   private running = false;\n   private currentState: WorkspaceRequestQueueState = \"accepting\";\n \n-  constructor(private readonly now: () => number = Date.now) {}\n+  constructor(\n+    private readonly clock: Pick<DaemonClock, \"monotonicNowMs\"> = new NodeDaemonClock(),\n+  ) {}\n \n   get state(): WorkspaceRequestQueueState {\n     return this.currentState;\n@@ -68,7 +71,10 @@ export class WorkspaceRequestQueue {\n           reject(new Error(\"Workspace request queue admission order changed\"));\n           return;\n         }\n-        this.activeRequest = Object.freeze({ ...admitted, startedAt: this.now() });\n+        this.activeRequest = Object.freeze({\n+          ...admitted,\n+          startedAt: this.clock.monotonicNowMs(),\n+        });\n         try {\n           resolve(await execute());\n         } catch (error) {\n"
      }
    ],
    "unchangedFromBase": 26
  },
  "copiedBodies": [
    {
      "basePath": "apps/cli/src/daemon/daemon-protocol.ts",
      "headPath": "packages/daemon/src/transport/protocol.ts",
      "equalBytes": false,
      "equalAfterImportAndWhitespaceNormalization": true
    },
    {
      "basePath": "apps/cli/src/daemon/daemon-wire-codec.ts",
      "headPath": "packages/daemon/src/transport/wire-codec.ts",
      "equalBytes": false,
      "equalAfterImportAndWhitespaceNormalization": true
    },
    {
      "basePath": "apps/cli/src/daemon/daemon-execution-client.ts",
      "headPath": "packages/daemon/src/transport/execution-client.ts",
      "equalBytes": false,
      "equalAfterImportAndWhitespaceNormalization": true
    },
    {
      "basePath": "apps/cli/src/daemon/daemon-delivery-session.ts",
      "headPath": "packages/daemon/src/delivery/delivery-session.ts",
      "equalBytes": false,
      "equalAfterImportAndWhitespaceNormalization": true
    },
    {
      "basePath": "apps/cli/src/daemon/completion-spool.ts",
      "headPath": "packages/daemon/src/delivery/completion-spool.ts",
      "equalBytes": false,
      "equalAfterImportAndWhitespaceNormalization": false
    },
    {
      "basePath": "apps/cli/src/daemon/accepted-execution-session.ts",
      "headPath": "packages/daemon/src/execution/accepted-execution-session.ts",
      "equalBytes": false,
      "equalAfterImportAndWhitespaceNormalization": true
    },
    {
      "basePath": "apps/cli/src/daemon/daemon-navigation-worker-protocol.ts",
      "headPath": "packages/daemon/src/worker/worker-protocol.ts",
      "equalBytes": false,
      "equalAfterImportAndWhitespaceNormalization": true
    }
  ],
  "changes": {
    "total": 153,
    "statuses": {
      "A": 72,
      "M": 35,
      "R": 45,
      "D": 1
    },
    "paths": [
      [
        "M",
        "apps/cli/src/cli-program-executor.test.ts"
      ],
      [
        "M",
        "apps/cli/src/cli.test.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon-executor.test.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/accepted-request-ledger.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/daemon-controller.ts"
      ],
      [
        "D",
        "apps/cli/src/daemon/daemon-entry.test.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/daemon-entry.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/daemon-lifetime.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/daemon-navigation-worker-entry.ts"
      ],
      [
        "R084",
        "apps/cli/src/daemon/workspace-daemon.ts",
        "apps/cli/src/daemon/daemon-process-coordinator.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/daemon-process-launcher.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/daemon-record-observer.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/daemon-registry.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/daemon-resource-monitor.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/daemon-startup-coordinator.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/daemon-transport.test.ts"
      ],
      [
        "M",
        "apps/cli/src/daemon/workspace-request-queue.ts"
      ],
      [
        "M",
        "apps/cli/test/e2e/daemon/parity.test.ts"
      ],
      [
        "M",
        "apps/cli/test/e2e/daemon/persistent-pressure.test.ts"
      ],
      [
        "M",
        "apps/cli/test/e2e/daemon/status.test.ts"
      ],
      [
        "M",
        "apps/cli/test/e2e/daemon/stop.test.ts"
      ],
      [
        "M",
        "apps/cli/test/helpers/daemon-controller.ts"
      ],
      [
        "R088",
        "packages/daemon/src/policy-testing.ts",
        "apps/cli/test/helpers/daemon-policy.ts"
      ],
      [
        "R097",
        "apps/cli/test/helpers/workspace-daemon-persistent-pressure.ts",
        "apps/cli/test/helpers/daemon-process-coordinator-persistent-pressure.ts"
      ],
      [
        "R098",
        "apps/cli/test/helpers/workspace-daemon-stuck.ts",
        "apps/cli/test/helpers/daemon-process-coordinator-stuck.ts"
      ],
      [
        "R068",
        "apps/cli/test/helpers/workspace-daemon.ts",
        "apps/cli/test/helpers/daemon-process-coordinator.ts"
      ],
      [
        "M",
        "apps/cli/test/helpers/daemon-process-terminator.ts"
      ],
      [
        "M",
        "apps/cli/test/helpers/daemon-registry.ts"
      ],
      [
        "M",
        "apps/cli/test/helpers/daemon-startup-caller-exit.ts"
      ],
      [
        "M",
        "apps/cli/test/helpers/daemon-startup-coordinator.ts"
      ],
      [
        "M",
        "apps/cli/test/helpers/local-daemon-transport.ts"
      ],
      [
        "M",
        "eslint.config.mjs"
      ],
      [
        "A",
        "meta-tests/src/daemon-compatibility-copy.test.ts"
      ],
      [
        "M",
        "meta-tests/src/daemon-package.test.ts"
      ],
      [
        "M",
        "meta-tests/src/lint-rule.test.ts"
      ],
      [
        "M",
        "packages/daemon/package.json"
      ],
      [
        "A",
        "packages/daemon/src/client/daemon-client-contracts.ts"
      ],
      [
        "A",
        "packages/daemon/src/client/daemon-client-control.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/client/daemon-client-public.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/client/daemon-client-runtime.ts"
      ],
      [
        "A",
        "packages/daemon/src/client/daemon-client.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/client/daemon-client.ts"
      ],
      [
        "A",
        "packages/daemon/src/client/daemon-routing-policy.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/client/daemon-routing-policy.ts"
      ],
      [
        "M",
        "packages/daemon/src/daemon-policy.test.ts"
      ],
      [
        "R099",
        "apps/cli/src/daemon/completion-spool.test.ts",
        "packages/daemon/src/delivery/completion-spool.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/delivery/completion-spool.ts"
      ],
      [
        "R098",
        "apps/cli/src/daemon/daemon-delivery-session.test.ts",
        "packages/daemon/src/delivery/delivery-session.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/delivery/delivery-session.ts"
      ],
      [
        "R097",
        "apps/cli/src/daemon/daemon-logger.test.ts",
        "packages/daemon/src/diagnostics/logger.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/diagnostics/logger.ts"
      ],
      [
        "R097",
        "apps/cli/src/daemon/daemon-operation-observer.test.ts",
        "packages/daemon/src/diagnostics/operation-observer.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/diagnostics/operation-observer.ts"
      ],
      [
        "A",
        "packages/daemon/src/entry-boundary.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/execution/accepted-execution-session-contracts.ts"
      ],
      [
        "R094",
        "apps/cli/src/daemon/accepted-execution-session.test.ts",
        "packages/daemon/src/execution/accepted-execution-session.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/execution/accepted-execution-session.ts"
      ],
      [
        "R088",
        "apps/cli/src/daemon/accepted-request-ledger.test.ts",
        "packages/daemon/src/execution/accepted-request-ledger.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/execution/accepted-request-ledger.ts"
      ],
      [
        "R099",
        "apps/cli/src/daemon/workspace-request-queue.test.ts",
        "packages/daemon/src/execution/request-queue.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/execution/request-queue.ts"
      ],
      [
        "M",
        "packages/daemon/src/host-contract.test.ts"
      ],
      [
        "M",
        "packages/daemon/src/index.ts"
      ],
      [
        "R061",
        "apps/cli/src/daemon/daemon-clock.test.ts",
        "packages/daemon/src/lifecycle/daemon-clock.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/lifecycle/daemon-clock.ts"
      ],
      [
        "R065",
        "apps/cli/src/daemon/daemon-lifetime.test.ts",
        "packages/daemon/src/lifecycle/daemon-lifetime.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/lifecycle/daemon-lifetime.ts"
      ],
      [
        "A",
        "packages/daemon/src/package-boundary.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/process-entry.ts"
      ],
      [
        "R096",
        "apps/cli/src/daemon/daemon-activity-projector.test.ts",
        "packages/daemon/src/process/activity-projector.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/process/activity-projector.ts"
      ],
      [
        "R098",
        "apps/cli/src/daemon/daemon-controller.test.ts",
        "packages/daemon/src/process/controller.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/process/controller.ts"
      ],
      [
        "A",
        "packages/daemon/src/process/process-coordinator-construction.test.ts"
      ],
      [
        "R095",
        "apps/cli/src/daemon/workspace-daemon-requests.test.ts",
        "packages/daemon/src/process/process-coordinator-requests.test.ts"
      ],
      [
        "R093",
        "apps/cli/src/daemon/workspace-daemon.test.ts",
        "packages/daemon/src/process/process-coordinator.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/process/process-coordinator.ts"
      ],
      [
        "R095",
        "apps/cli/src/daemon/daemon-process-launcher.test.ts",
        "packages/daemon/src/process/process-launcher.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/process/process-launcher.ts"
      ],
      [
        "R094",
        "apps/cli/src/daemon/daemon-process-termination-observer.test.ts",
        "packages/daemon/src/process/process-termination-observer.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/process/process-termination-observer.ts"
      ],
      [
        "A",
        "packages/daemon/src/process/runtime-values.ts"
      ],
      [
        "R097",
        "apps/cli/src/daemon/daemon-record-observer.test.ts",
        "packages/daemon/src/registry/record-observer.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/registry/record-observer.ts"
      ],
      [
        "R077",
        "apps/cli/src/daemon/daemon-registry.test.ts",
        "packages/daemon/src/registry/registry.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/registry/registry.ts"
      ],
      [
        "R098",
        "apps/cli/src/daemon/daemon-startup-coordinator.test.ts",
        "packages/daemon/src/registry/startup-coordinator.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/registry/startup-coordinator.ts"
      ],
      [
        "R079",
        "apps/cli/src/daemon/daemon-workspace-identity.test.ts",
        "packages/daemon/src/registry/workspace-identity.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/registry/workspace-identity.ts"
      ],
      [
        "R097",
        "apps/cli/src/daemon/daemon-resource-monitor.test.ts",
        "packages/daemon/src/resources/resource-supervisor.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/resources/resource-supervisor.ts"
      ],
      [
        "R099",
        "apps/cli/src/daemon/daemon-client-result-capture.test.ts",
        "packages/daemon/src/transport/client-result-capture.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/client-result-capture.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/contracts.ts"
      ],
      [
        "R094",
        "apps/cli/src/daemon/daemon-result-chunk-codec.test.ts",
        "packages/daemon/src/transport/daemon-result-chunk-codec.test.ts"
      ],
      [
        "R096",
        "apps/cli/src/daemon/daemon-execution-client.test.ts",
        "packages/daemon/src/transport/execution-client.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/execution-client.ts"
      ],
      [
        "R097",
        "apps/cli/src/daemon/daemon-lifecycle-client.test.ts",
        "packages/daemon/src/transport/lifecycle-client.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/lifecycle-client.ts"
      ],
      [
        "R093",
        "apps/cli/src/daemon/local-daemon-transport-composition.test.ts",
        "packages/daemon/src/transport/local-daemon-transport-composition.test.ts"
      ],
      [
        "R098",
        "apps/cli/src/daemon/local-daemon-transport-execution.test.ts",
        "packages/daemon/src/transport/local-daemon-transport-execution.test.ts"
      ],
      [
        "R097",
        "apps/cli/src/daemon/local-daemon-transport-socket-client.test.ts",
        "packages/daemon/src/transport/local-daemon-transport-socket-client.test.ts"
      ],
      [
        "R098",
        "apps/cli/src/daemon/local-daemon-transport-validation.test.ts",
        "packages/daemon/src/transport/local-daemon-transport-validation.test.ts"
      ],
      [
        "R099",
        "apps/cli/src/daemon/local-daemon-transport.test.ts",
        "packages/daemon/src/transport/local-transport.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/local-transport.ts"
      ],
      [
        "R098",
        "apps/cli/src/daemon/daemon-protocol-validator.test.ts",
        "packages/daemon/src/transport/protocol-validator.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/protocol-validator.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/protocol.ts"
      ],
      [
        "R097",
        "apps/cli/src/daemon/daemon-result-transfer-receiver.test.ts",
        "packages/daemon/src/transport/result-transfer-receiver.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/result-transfer-receiver.ts"
      ],
      [
        "R099",
        "apps/cli/src/daemon/local-daemon-socket-client.test.ts",
        "packages/daemon/src/transport/socket-client.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/socket-client.ts"
      ],
      [
        "R097",
        "apps/cli/src/daemon/local-daemon-socket-server.test.ts",
        "packages/daemon/src/transport/socket-server.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/socket-server.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/transport-error.ts"
      ],
      [
        "R096",
        "apps/cli/src/daemon/daemon-wire-codec.test.ts",
        "packages/daemon/src/transport/wire-codec.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/transport/wire-codec.ts"
      ],
      [
        "A",
        "packages/daemon/src/worker-entry.ts"
      ],
      [
        "A",
        "packages/daemon/src/worker/navigation-worker-entry.ts"
      ],
      [
        "R091",
        "apps/cli/src/daemon/daemon-navigation-worker.test.ts",
        "packages/daemon/src/worker/navigation-worker.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/worker/navigation-worker.ts"
      ],
      [
        "R097",
        "apps/cli/src/daemon/daemon-worker-generation-manager.test.ts",
        "packages/daemon/src/worker/worker-generation-manager.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/worker/worker-generation-manager.ts"
      ],
      [
        "R099",
        "apps/cli/src/daemon/daemon-navigation-worker-protocol.test.ts",
        "packages/daemon/src/worker/worker-protocol.test.ts"
      ],
      [
        "A",
        "packages/daemon/src/worker/worker-protocol.ts"
      ],
      [
        "A",
        "packages/daemon/test/fixtures/executor-module.mjs"
      ],
      [
        "A",
        "packages/daemon/test/fixtures/executor-module.test.ts"
      ],
      [
        "A",
        "packages/daemon/test/fixtures/executor-module.ts"
      ],
      [
        "A",
        "packages/daemon/test/fixtures/observable-executor-module.mjs"
      ],
      [
        "A",
        "packages/daemon/test/helpers/canonical-path.ts"
      ],
      [
        "A",
        "packages/daemon/test/helpers/daemon-controller.ts"
      ],
      [
        "A",
        "packages/daemon/test/helpers/daemon-navigation-worker-fixture.mjs"
      ],
      [
        "A",
        "packages/daemon/test/helpers/daemon-policy.ts"
      ],
      [
        "A",
        "packages/daemon/test/helpers/daemon-process-coordinator-stuck.ts"
      ],
      [
        "A",
        "packages/daemon/test/helpers/daemon-process-coordinator.ts"
      ],
      [
        "A",
        "packages/daemon/test/helpers/daemon-process-terminator.ts"
      ],
      [
        "R091",
        "apps/cli/test/helpers/daemon-registry-cleaner.ts",
        "packages/daemon/test/helpers/daemon-registry-cleaner.ts"
      ],
      [
        "A",
        "packages/daemon/test/helpers/daemon-registry.ts"
      ],
      [
        "A",
        "packages/daemon/test/helpers/daemon-resource-policy.ts"
      ],
      [
        "A",
        "packages/daemon/test/helpers/daemon-startup-coordinator.ts"
      ],
      [
        "A",
        "packages/daemon/test/helpers/daemon-startup-mutation-owner.ts"
      ],
      [
        "A",
        "packages/daemon/test/helpers/executor-output.ts"
      ],
      [
        "R100",
        "apps/cli/test/helpers/injected-daemon-executor-fixture.mjs",
        "packages/daemon/test/helpers/injected-daemon-executor-fixture.mjs"
      ],
      [
        "A",
        "packages/daemon/test/helpers/local-daemon-transport.ts"
      ],
      [
        "R100",
        "apps/cli/test/helpers/resource-sampling-daemon-executor-fixture.mjs",
        "packages/daemon/test/helpers/resource-sampling-daemon-executor-fixture.mjs"
      ],
      [
        "A",
        "packages/daemon/test/integration/built-entry-artifacts.test.ts"
      ],
      [
        "A",
        "packages/daemon/test/integration/built-process-entry.test.ts"
      ],
      [
        "A",
        "packages/daemon/test/integration/built-process-launcher.test.ts"
      ],
      [
        "M",
        "packages/daemon/test/public-import.test.ts"
      ],
      [
        "A",
        "packages/daemon/vitest.config.ts"
      ],
      [
        "M",
        "plans/005/daemon-follow-ups-functional-spec.md"
      ],
      [
        "M",
        "pnpm-lock.yaml"
      ]
    ]
  },
  "e2e": {
    "total": 133,
    "unchanged": 129,
    "helperPathOnly": [
      "apps/cli/test/e2e/daemon/parity.test.ts",
      "apps/cli/test/e2e/daemon/persistent-pressure.test.ts",
      "apps/cli/test/e2e/daemon/status.test.ts",
      "apps/cli/test/e2e/daemon/stop.test.ts"
    ],
    "snapshotCount": 93
  },
  "movedTests": [
    {
      "similarity": "R099",
      "before": "apps/cli/src/daemon/completion-spool.test.ts",
      "after": "packages/daemon/src/delivery/completion-spool.test.ts"
    },
    {
      "similarity": "R098",
      "before": "apps/cli/src/daemon/daemon-delivery-session.test.ts",
      "after": "packages/daemon/src/delivery/delivery-session.test.ts"
    },
    {
      "similarity": "R097",
      "before": "apps/cli/src/daemon/daemon-logger.test.ts",
      "after": "packages/daemon/src/diagnostics/logger.test.ts"
    },
    {
      "similarity": "R097",
      "before": "apps/cli/src/daemon/daemon-operation-observer.test.ts",
      "after": "packages/daemon/src/diagnostics/operation-observer.test.ts"
    },
    {
      "similarity": "R094",
      "before": "apps/cli/src/daemon/accepted-execution-session.test.ts",
      "after": "packages/daemon/src/execution/accepted-execution-session.test.ts"
    },
    {
      "similarity": "R088",
      "before": "apps/cli/src/daemon/accepted-request-ledger.test.ts",
      "after": "packages/daemon/src/execution/accepted-request-ledger.test.ts"
    },
    {
      "similarity": "R099",
      "before": "apps/cli/src/daemon/workspace-request-queue.test.ts",
      "after": "packages/daemon/src/execution/request-queue.test.ts"
    },
    {
      "similarity": "R061",
      "before": "apps/cli/src/daemon/daemon-clock.test.ts",
      "after": "packages/daemon/src/lifecycle/daemon-clock.test.ts"
    },
    {
      "similarity": "R065",
      "before": "apps/cli/src/daemon/daemon-lifetime.test.ts",
      "after": "packages/daemon/src/lifecycle/daemon-lifetime.test.ts"
    },
    {
      "similarity": "R096",
      "before": "apps/cli/src/daemon/daemon-activity-projector.test.ts",
      "after": "packages/daemon/src/process/activity-projector.test.ts"
    },
    {
      "similarity": "R098",
      "before": "apps/cli/src/daemon/daemon-controller.test.ts",
      "after": "packages/daemon/src/process/controller.test.ts"
    },
    {
      "similarity": "R095",
      "before": "apps/cli/src/daemon/workspace-daemon-requests.test.ts",
      "after": "packages/daemon/src/process/process-coordinator-requests.test.ts"
    },
    {
      "similarity": "R093",
      "before": "apps/cli/src/daemon/workspace-daemon.test.ts",
      "after": "packages/daemon/src/process/process-coordinator.test.ts"
    },
    {
      "similarity": "R095",
      "before": "apps/cli/src/daemon/daemon-process-launcher.test.ts",
      "after": "packages/daemon/src/process/process-launcher.test.ts"
    },
    {
      "similarity": "R094",
      "before": "apps/cli/src/daemon/daemon-process-termination-observer.test.ts",
      "after": "packages/daemon/src/process/process-termination-observer.test.ts"
    },
    {
      "similarity": "R097",
      "before": "apps/cli/src/daemon/daemon-record-observer.test.ts",
      "after": "packages/daemon/src/registry/record-observer.test.ts"
    },
    {
      "similarity": "R077",
      "before": "apps/cli/src/daemon/daemon-registry.test.ts",
      "after": "packages/daemon/src/registry/registry.test.ts"
    },
    {
      "similarity": "R098",
      "before": "apps/cli/src/daemon/daemon-startup-coordinator.test.ts",
      "after": "packages/daemon/src/registry/startup-coordinator.test.ts"
    },
    {
      "similarity": "R079",
      "before": "apps/cli/src/daemon/daemon-workspace-identity.test.ts",
      "after": "packages/daemon/src/registry/workspace-identity.test.ts"
    },
    {
      "similarity": "R097",
      "before": "apps/cli/src/daemon/daemon-resource-monitor.test.ts",
      "after": "packages/daemon/src/resources/resource-supervisor.test.ts"
    },
    {
      "similarity": "R099",
      "before": "apps/cli/src/daemon/daemon-client-result-capture.test.ts",
      "after": "packages/daemon/src/transport/client-result-capture.test.ts"
    },
    {
      "similarity": "R094",
      "before": "apps/cli/src/daemon/daemon-result-chunk-codec.test.ts",
      "after": "packages/daemon/src/transport/daemon-result-chunk-codec.test.ts"
    },
    {
      "similarity": "R096",
      "before": "apps/cli/src/daemon/daemon-execution-client.test.ts",
      "after": "packages/daemon/src/transport/execution-client.test.ts"
    },
    {
      "similarity": "R097",
      "before": "apps/cli/src/daemon/daemon-lifecycle-client.test.ts",
      "after": "packages/daemon/src/transport/lifecycle-client.test.ts"
    },
    {
      "similarity": "R093",
      "before": "apps/cli/src/daemon/local-daemon-transport-composition.test.ts",
      "after": "packages/daemon/src/transport/local-daemon-transport-composition.test.ts"
    },
    {
      "similarity": "R098",
      "before": "apps/cli/src/daemon/local-daemon-transport-execution.test.ts",
      "after": "packages/daemon/src/transport/local-daemon-transport-execution.test.ts"
    },
    {
      "similarity": "R097",
      "before": "apps/cli/src/daemon/local-daemon-transport-socket-client.test.ts",
      "after": "packages/daemon/src/transport/local-daemon-transport-socket-client.test.ts"
    },
    {
      "similarity": "R098",
      "before": "apps/cli/src/daemon/local-daemon-transport-validation.test.ts",
      "after": "packages/daemon/src/transport/local-daemon-transport-validation.test.ts"
    },
    {
      "similarity": "R099",
      "before": "apps/cli/src/daemon/local-daemon-transport.test.ts",
      "after": "packages/daemon/src/transport/local-transport.test.ts"
    },
    {
      "similarity": "R098",
      "before": "apps/cli/src/daemon/daemon-protocol-validator.test.ts",
      "after": "packages/daemon/src/transport/protocol-validator.test.ts"
    },
    {
      "similarity": "R097",
      "before": "apps/cli/src/daemon/daemon-result-transfer-receiver.test.ts",
      "after": "packages/daemon/src/transport/result-transfer-receiver.test.ts"
    },
    {
      "similarity": "R099",
      "before": "apps/cli/src/daemon/local-daemon-socket-client.test.ts",
      "after": "packages/daemon/src/transport/socket-client.test.ts"
    },
    {
      "similarity": "R097",
      "before": "apps/cli/src/daemon/local-daemon-socket-server.test.ts",
      "after": "packages/daemon/src/transport/socket-server.test.ts"
    },
    {
      "similarity": "R096",
      "before": "apps/cli/src/daemon/daemon-wire-codec.test.ts",
      "after": "packages/daemon/src/transport/wire-codec.test.ts"
    },
    {
      "similarity": "R091",
      "before": "apps/cli/src/daemon/daemon-navigation-worker.test.ts",
      "after": "packages/daemon/src/worker/navigation-worker.test.ts"
    },
    {
      "similarity": "R097",
      "before": "apps/cli/src/daemon/daemon-worker-generation-manager.test.ts",
      "after": "packages/daemon/src/worker/worker-generation-manager.test.ts"
    },
    {
      "similarity": "R099",
      "before": "apps/cli/src/daemon/daemon-navigation-worker-protocol.test.ts",
      "after": "packages/daemon/src/worker/worker-protocol.test.ts"
    }
  ],
  "snippets": {
    "cli": {
      "path": "apps/cli/src/cli.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 1,
      "end": 23,
      "text": "#!/usr/bin/env node\nimport { CommandResultReplayer } from \"./cli-program-executor.js\";\nimport { DaemonCommandDispatcher } from \"./daemon/daemon-command-dispatcher.js\";\nimport { createDefaultDependencies, createDefaultProgramContext } from \"./program.js\";\nimport { StateDirectoryResolver } from \"./state-directory-resolver.js\";\nimport { DaemonPolicy } from \"@symnav/daemon\";\n\nconst stateDirectory = new StateDirectoryResolver(process.env).resolve();\nconst daemonPolicy = DaemonPolicy.currentSystem();\nconst dependencies = createDefaultDependencies(stateDirectory, daemonPolicy);\nconst dispatched = await new DaemonCommandDispatcher({\n  createDependencies: (canonicalStateDirectory) =>\n    createDefaultDependencies(canonicalStateDirectory, daemonPolicy),\n  stateDirectory,\n  policy: daemonPolicy,\n  daemonEnabled: () => process.env.SYMNAV_DAEMON !== \"0\",\n}).execute({\n  argv: process.argv.slice(2),\n  cwd: process.cwd(),\n  telemetryEnabled: dependencies.telemetryEnabled,\n  executionMode: \"cold\",\n});\nawait CommandResultReplayer.replay(dispatched.result, createDefaultProgramContext());",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/apps/cli/src/cli.ts#L1-L23"
    },
    "dispatcher": {
      "path": "apps/cli/src/daemon/daemon-command-dispatcher.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 276,
      "end": 310,
      "text": "\n  private static createRuntime(\n    identity: DaemonWorkspaceIdentity,\n    dependencies: ProgramDependencies,\n    policy: DaemonPolicy,\n  ): DaemonDispatchRuntime {\n    const registry = new DaemonRegistry(identity.registryDirectory, policy.values.startup);\n    const transport = new LocalDaemonTransport({ policy });\n    const processTerminator = new NodeDaemonProcessTerminator(policy.values.shutdown);\n    const launcher = new NodeDaemonProcessLauncher(\n      dependencies.symnavVersion,\n      daemonExecutorModuleUrl(),\n      policy,\n      processTerminator,\n    );\n    return {\n      registry,\n      transport,\n      observer: new DaemonRecordObserver(transport, processTerminator),\n      coordinator: new DaemonStartupCoordinator(registry, launcher, transport, {\n        policy: policy.values,\n        processTerminator,\n      }),\n    };\n  }\n\n  private static isCompleteResult(result: DaemonExecutorExecutionResult): boolean {\n    return Number.isInteger(result.exitCode) && result.output !== undefined;\n  }\n\n  private static isRetrySafeFailure(error: unknown): boolean {\n    return error instanceof DaemonTransportError && error.retrySafe;\n  }\n\n  private static controlledFailure(code: DaemonExecutionFailureCode): CommandExecutionResult {",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/apps/cli/src/daemon/daemon-command-dispatcher.ts#L276-L310"
    },
    "freeze": {
      "path": "meta-tests/src/daemon-compatibility-copy.test.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 8,
      "end": 47,
      "text": "class DaemonCompatibilityCopyInventory {\n  static readonly expectedDigest =\n    \"d0ff136f3be132ea004d3b13985192e055d1dfbad1abb773b607e89c54a1f41e\";\n\n  static files(repositoryRoot: string): readonly string[] {\n    const daemonDirectory = join(repositoryRoot, \"apps/cli/src/daemon\");\n    const cliOwnedSources = new Set([\n      \"daemon-command-dispatcher.ts\",\n      \"invocation-route.ts\",\n      \"invocation-workspace-selector.ts\",\n    ]);\n    return readdirSync(daemonDirectory)\n      .filter(\n        (name) => name.endsWith(\".ts\") && !name.endsWith(\".test.ts\") && !cliOwnedSources.has(name),\n      )\n      .map((name) => `apps/cli/src/daemon/${name}`)\n      .sort();\n  }\n\n  static digest(repositoryRoot: string, files: readonly string[]): string {\n    const hash = createHash(\"sha256\");\n    for (const file of files) {\n      hash.update(file);\n      hash.update(\"\\0\");\n      hash.update(readFileSync(join(repositoryRoot, file), \"utf8\").replace(/\\r\\n/g, \"\\n\"));\n      hash.update(\"\\0\");\n    }\n    return hash.digest(\"hex\");\n  }\n}\n\ndescribe(\"CLI daemon compatibility copies\", () => {\n  it(\"remain frozen while package-local mechanisms are staged\", () => {\n    const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), \"../..\");\n    const files = DaemonCompatibilityCopyInventory.files(repositoryRoot);\n\n    expect(files).toHaveLength(38);\n    expect(DaemonCompatibilityCopyInventory.digest(repositoryRoot, files)).toBe(\n      DaemonCompatibilityCopyInventory.expectedDigest,\n    );",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/meta-tests/src/daemon-compatibility-copy.test.ts#L8-L47"
    },
    "facade": {
      "path": "packages/daemon/src/client/daemon-client.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 1,
      "end": 64,
      "text": "import type {\n  DaemonStartResult,\n  DaemonStopResult,\n  RunningDaemonStatus,\n} from \"../daemon-lifecycle-report.js\";\nimport type {\n  DaemonClientExecuteRequest,\n  DaemonClientExecuteResult,\n  DaemonClientOptions,\n  DaemonControlRequest,\n} from \"./daemon-client-contracts.js\";\n\ninterface DaemonClientRuntimePort {\n  execute(request: DaemonClientExecuteRequest): Promise<DaemonClientExecuteResult>;\n  control(\n    request: DaemonControlRequest,\n  ): Promise<DaemonStartResult | readonly RunningDaemonStatus[] | DaemonStopResult>;\n}\n\nclass DaemonClientRuntimeLoader {\n  static async load(options: DaemonClientOptions): Promise<DaemonClientRuntimePort> {\n    const runtimeModuleUrl: string = \"./daemon-client-runtime.js\";\n    const loaded: unknown = await import(runtimeModuleUrl);\n    if (\n      typeof loaded !== \"object\" ||\n      loaded === null ||\n      !(\"DaemonClientRuntime\" in loaded) ||\n      typeof loaded.DaemonClientRuntime !== \"function\"\n    ) {\n      throw new Error(\"Daemon client runtime is unavailable\");\n    }\n    const Runtime = loaded.DaemonClientRuntime as new (\n      options: DaemonClientOptions,\n    ) => DaemonClientRuntimePort;\n    return new Runtime(options);\n  }\n}\n\nexport class DaemonClient {\n  private readonly runtime: Promise<DaemonClientRuntimePort>;\n\n  constructor(options: DaemonClientOptions) {\n    this.runtime = DaemonClientRuntimeLoader.load(options);\n  }\n\n  async execute(request: DaemonClientExecuteRequest): Promise<DaemonClientExecuteResult> {\n    return (await this.runtime).execute(request);\n  }\n\n  control(\n    request: Extract<DaemonControlRequest, { readonly action: \"start\" }>,\n  ): Promise<DaemonStartResult>;\n  control(\n    request: Extract<DaemonControlRequest, { readonly action: \"status\" }>,\n  ): Promise<readonly RunningDaemonStatus[]>;\n  control(\n    request: Extract<DaemonControlRequest, { readonly action: \"stop\" }>,\n  ): Promise<DaemonStopResult>;\n  async control(\n    request: DaemonControlRequest,\n  ): Promise<DaemonStartResult | readonly RunningDaemonStatus[] | DaemonStopResult> {\n    return (await this.runtime).control(request);\n  }\n}",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/client/daemon-client.ts#L1-L64"
    },
    "contracts": {
      "path": "packages/daemon/src/client/daemon-client-contracts.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 1,
      "end": 36,
      "text": "import type { DaemonCommandName, DaemonReadinessProbe } from \"../daemon-command-name.js\";\nimport type {\n  DaemonExecutionMode,\n  DaemonExecutorExecutionResult,\n  DaemonExecutorFactory,\n  DaemonExecutorModuleUrl,\n} from \"../daemon-executor.js\";\nimport type { DaemonPolicy } from \"../daemon-policy.js\";\n\nexport interface DaemonClientOptions {\n  readonly stateDirectory: string;\n  readonly productVersion: string;\n  readonly daemonEnabled: boolean;\n  readonly executorFactory: DaemonExecutorFactory;\n  readonly executorModuleUrl: DaemonExecutorModuleUrl;\n  readonly readinessProbe: DaemonReadinessProbe;\n  readonly policy?: DaemonPolicy;\n}\n\nexport interface DaemonClientExecuteRequest {\n  readonly workspaceRoot: string;\n  readonly commandName: DaemonCommandName;\n  readonly argv: readonly string[];\n  readonly cwd: string;\n  readonly telemetryEnabled: boolean;\n}\n\nexport interface DaemonClientExecuteResult {\n  readonly mode: DaemonExecutionMode;\n  readonly result: DaemonExecutorExecutionResult;\n}\n\nexport type DaemonControlRequest =\n  | { readonly action: \"start\"; readonly workspaceRoot: string }\n  | { readonly action: \"status\" }\n  | { readonly action: \"stop\"; readonly workspaceRoot: string };",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/client/daemon-client-contracts.ts#L1-L36"
    },
    "manifest": {
      "path": "packages/daemon/package.json",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 1,
      "end": 32,
      "text": "{\n  \"name\": \"@symnav/daemon\",\n  \"version\": \"0.0.0\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"main\": \"./dist/index.js\",\n  \"types\": \"./dist/index.d.ts\",\n  \"exports\": {\n    \".\": {\n      \"types\": \"./dist/index.d.ts\",\n      \"default\": \"./dist/index.js\"\n    },\n    \"./process-entry\": {\n      \"default\": \"./dist/process-entry.js\"\n    },\n    \"./worker-entry\": {\n      \"default\": \"./dist/worker-entry.js\"\n    }\n  },\n  \"files\": [\"dist\"],\n  \"scripts\": {\n    \"test\": \"vitest run\",\n    \"build\": \"tsc --build\",\n    \"typecheck\": \"tsc --build\",\n    \"lint\": \"eslint src\",\n    \"typecheck:test\": \"tsc -p tsconfig.test.json --noEmit\"\n  },\n  \"devDependencies\": {\n    \"@symnav/testing\": \"workspace:*\",\n    \"tsx\": \"^4.21.0\"\n  }\n}",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/package.json#L1-L32"
    },
    "protocol": {
      "path": "packages/daemon/src/transport/protocol.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 1,
      "end": 45,
      "text": "import type {\n  DaemonCommandName,\n  DaemonExecutorRequest,\n  DaemonExecutionFailureCode,\n  DaemonOutputStream,\n  DaemonRejectedExecutionFrame,\n} from \"@symnav/daemon\";\nimport type { CompletionSpoolManifest } from \"../delivery/completion-spool.js\";\n\nexport const DAEMON_PROTOCOL_VERSION = 5;\nexport const DAEMON_RECORD_SCHEMA_VERSION = 2;\nexport const DAEMON_DIAGNOSTIC_SCHEMA_VERSION = 1;\n\nexport interface DaemonIdentityCoordinates {\n  readonly workspaceRoot: string;\n  readonly workspaceKey: string;\n  readonly stateKey: string;\n  readonly identityKey: string;\n  readonly instanceId: string;\n  readonly processToken: string;\n  readonly endpoint: string;\n}\n\nexport interface DaemonRecord extends DaemonIdentityCoordinates {\n  readonly schemaVersion: number;\n  readonly protocolVersion: number;\n  readonly symnavVersion: string;\n  readonly pid: number;\n  readonly state: \"starting\" | \"ready\";\n  readonly startedAt: number;\n  readonly readyAt?: number;\n  readonly lastNavigationAt?: number;\n  readonly fileCount?: number;\n  readonly memoryBytes?: number;\n  readonly memoryCapBytes: number;\n}\n\nexport interface DaemonActivitySnapshot {\n  readonly lifecycle: \"starting\" | \"ready\" | \"busy\" | \"recovering\" | \"draining\";\n  readonly recoveryDetail?: \"resource-pressure\" | \"worker-replacement\";\n  readonly pid: number;\n  readonly startedAt: number;\n  readonly startupElapsedMs: number;\n  readonly fileCount?: number;\n  readonly processRssBytes: number;",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/transport/protocol.ts#L1-L45"
    },
    "policy": {
      "path": "packages/daemon/src/daemon-policy.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 99,
      "end": 151,
      "text": "    const hardProcessRssMiB = DaemonPolicy.clamp(Math.floor(effectiveMemoryMiB / 2), 256, 8_192);\n    const workerMaxOldGenerationSizeMiB = DaemonPolicy.clamp(\n      Math.floor(effectiveMemoryMiB / 4),\n      128,\n      4_096,\n    );\n    return new DaemonPolicy({\n      transport: {\n        singleResponseTimeoutMs: 250,\n        statusResponseTimeoutMs: 100,\n        executionAdmissionTimeoutMs: 5_000,\n        maximumJsonPayloadBytes: 8 * MEBIBYTE,\n        maximumExecutionControlPayloadBytes: 256 * 1024,\n      },\n      startup: {\n        coordinationGraceMs: 15_000,\n        heartbeatIntervalMs: 100,\n        authorizationPollIntervalMs: 10,\n        observationPollIntervalMs: 20,\n        previousInstanceTerminationTimeoutMs: 5 * 60_000,\n        childFailureRetryLimit: 1,\n      },\n      shutdown: {\n        idleTimeoutMs: 30 * 60_000,\n        stopTimeoutMs: 5_000,\n        forcedTerminationReserveMaximumMs: 500,\n        controllerPollIntervalMs: 20,\n        processSignalExitTimeoutMs: 500,\n        processExitPollIntervalMs: 20,\n        resourceDrainAcknowledgementGraceMs: 250,\n        resourceDrainAcknowledgementPollIntervalMs: 5,\n      },\n      delivery: {\n        postAcceptanceExecutionReattachmentLimit: 1,\n        resultTransferResumeLimitPerExecutionAttempt: 1,\n      },\n      output: {\n        maximumChunkRawBytes: 64 * 1024,\n        inlineRawBytes: 256 * 1024,\n        maximumResultRawBytes: 256 * MEBIBYTE,\n        maximumAggregateSpoolRawBytes: 512 * MEBIBYTE,\n      },\n      resources: {\n        effectiveMemoryBytes,\n        hardProcessRssBytes: hardProcessRssMiB * MEBIBYTE,\n        softProcessRssBytes: Math.floor(hardProcessRssMiB * 0.8) * MEBIBYTE,\n        resumeProcessRssBytes: Math.floor(hardProcessRssMiB * 0.7) * MEBIBYTE,\n        workerMaxOldGenerationSizeMiB,\n        supervisionIntervalMs: 250,\n        replacementWindowMs: 10 * 60_000,\n        replacementLimit: 2,\n        workerHeapSampleIntervalMs: 25,\n      },",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/daemon-policy.ts#L99-L151"
    },
    "lifetime": {
      "path": "packages/daemon/src/lifecycle/daemon-lifetime.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 1,
      "end": 60,
      "text": "import type { DaemonPolicyValues } from \"@symnav/daemon\";\nimport type { DaemonClock } from \"./daemon-clock.js\";\n\nexport class DaemonLifetime {\n  private timer: ReturnType<typeof setTimeout> | undefined;\n  private deadline: number;\n  private navigationActive = false;\n  private stopped = false;\n  private idleTriggered = false;\n\n  constructor(\n    private readonly clock: Pick<DaemonClock, \"wallNowMs\">,\n    policy: Pick<DaemonPolicyValues[\"shutdown\"], \"idleTimeoutMs\">,\n    private readonly onIdle: () => Promise<void>,\n  ) {\n    this.idleTimeoutMs = policy.idleTimeoutMs;\n    this.deadline = this.clock.wallNowMs() + this.idleTimeoutMs;\n    this.schedule();\n  }\n\n  private readonly idleTimeoutMs: number;\n\n  navigationAccepted(): void {\n    if (this.stopped) return;\n    this.navigationActive = true;\n    this.deadline = this.clock.wallNowMs() + this.idleTimeoutMs;\n    this.schedule();\n  }\n\n  queueBecameIdle(): void {\n    if (this.stopped) return;\n    this.navigationActive = false;\n    if (this.clock.wallNowMs() >= this.deadline) this.triggerIdle();\n  }\n\n  stop(): void {\n    this.stopped = true;\n    if (this.timer !== undefined) clearTimeout(this.timer);\n    this.timer = undefined;\n  }\n\n  private schedule(): void {\n    if (this.timer !== undefined) clearTimeout(this.timer);\n    const remainingMs = Math.max(0, this.deadline - this.clock.wallNowMs());\n    this.timer = setTimeout(() => this.deadlineReached(), remainingMs);\n    this.timer.unref?.();\n  }\n\n  private deadlineReached(): void {\n    this.timer = undefined;\n    if (this.stopped || this.navigationActive) return;\n    this.triggerIdle();\n  }\n\n  private triggerIdle(): void {\n    if (this.idleTriggered) return;\n    this.idleTriggered = true;\n    void this.onIdle();\n  }\n}",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/lifecycle/daemon-lifetime.ts#L1-L60"
    },
    "clock": {
      "path": "packages/daemon/src/lifecycle/daemon-clock.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 1,
      "end": 28,
      "text": "import { performance } from \"node:perf_hooks\";\n\nexport interface DaemonClock {\n  wallNowMs(): number;\n  monotonicNowMs(): number;\n}\n\ninterface DaemonClockSources {\n  readonly wallNowMs: () => number;\n  readonly monotonicNowMs: () => number;\n}\n\nexport class NodeDaemonClock implements DaemonClock {\n  constructor(\n    private readonly sources: DaemonClockSources = {\n      wallNowMs: Date.now,\n      monotonicNowMs: () => performance.now(),\n    },\n  ) {}\n\n  wallNowMs(): number {\n    return this.sources.wallNowMs();\n  }\n\n  monotonicNowMs(): number {\n    return this.sources.monotonicNowMs();\n  }\n}",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/lifecycle/daemon-clock.ts#L1-L28"
    },
    "lifetime-test": {
      "path": "packages/daemon/src/lifecycle/daemon-lifetime.test.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 35,
      "end": 72,
      "text": "    const lifetime = new DaemonLifetime({ wallNowMs: () => now }, idlePolicy(10), onIdle);\n    lifetime.navigationAccepted();\n\n    now = 10;\n    await vi.advanceTimersByTimeAsync(10);\n    expect(onIdle).not.toHaveBeenCalled();\n    lifetime.queueBecameIdle();\n    await Promise.resolve();\n    expect(onIdle).toHaveBeenCalledOnce();\n  });\n\n  it(\"keeps the constructor-started acceptance deadline after completion\", async () => {\n    let now = 0;\n    const onIdle = vi.fn(async () => undefined);\n    const lifetime = new DaemonLifetime({ wallNowMs: () => now }, idlePolicy(10), onIdle);\n\n    now = 8;\n    vi.advanceTimersByTime(8);\n    lifetime.navigationAccepted();\n    now = 18;\n    await vi.advanceTimersByTimeAsync(10);\n    expect(onIdle).not.toHaveBeenCalled();\n\n    lifetime.queueBecameIdle();\n    await Promise.resolve();\n\n    expect(onIdle).toHaveBeenCalledOnce();\n  });\n\n  it(\"stops its timer permanently\", async () => {\n    let now = 0;\n    const onIdle = vi.fn(async () => undefined);\n    const lifetime = new DaemonLifetime({ wallNowMs: () => now }, idlePolicy(10), onIdle);\n    lifetime.stop();\n    now = 20;\n    await vi.advanceTimersByTimeAsync(20);\n    expect(onIdle).not.toHaveBeenCalled();\n  });",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/lifecycle/daemon-lifetime.test.ts#L35-L72"
    },
    "follow-ups": {
      "path": "plans/005/daemon-follow-ups-functional-spec.md",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 175,
      "end": 194,
      "text": "## Readiness-Armed Idle Lifetime\n\n**Purpose.** Give every ready daemon the full idle interval before automatic shutdown.\n\n**Produces.** Idle accounting starts when worker initialization, warm resource sampling, and ready-record publication finish. Startup time does not consume the ready daemon's idle interval.\n\n**Does not produce.** A change to the idle interval or any earlier readiness publication.\n\n**Example.** A daemon that spends longer than the idle interval warming remains available for the full idle interval after it publishes ready instead of shutting down immediately.\n\n## Completion-Based Idle Lifetime\n\n**Purpose.** Measure idle time from the end of the latest navigation turn.\n\n**Produces.** Completing a navigation turn starts a fresh idle interval. A request that runs longer than the idle interval does not trigger immediate idle shutdown when its queue becomes idle.\n\n**Does not produce.** A reset for control-plane requests or non-navigation activity.\n\n**Example.** A navigation accepted just before its deadline and running for ten minutes remains ready for the full idle interval after completion.\n",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/plans/005/daemon-follow-ups-functional-spec.md#L175-L194"
    },
    "coordinates": {
      "path": "packages/daemon/src/process/process-coordinator.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 84,
      "end": 98,
      "text": "  constructor(private readonly options: DaemonProcessCoordinatorOptions) {\n    DaemonProcessCoordinator.validateCoordinates(options.identity, options.coordinates);\n    const policy = options.policy;\n    this.policy = policy;\n    this.forceEscalated = new Promise((resolve) => {\n      this.resolveForceEscalated = resolve;\n    });\n    this.clock = options.clock;\n    this.startedMonotonicAt = this.clock.monotonicNowMs();\n    const requestQueue = new WorkspaceRequestQueue(this.clock);\n    const acceptedRequests = new AcceptedRequestLedger(this.clock);\n    const completionSpools = new DaemonCompletionSpoolStore({\n      directory: options.identity.spoolDirectory,\n      workspaceKey: options.identity.workspaceKey,\n      instanceId: options.coordinates.instanceId,",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/process/process-coordinator.ts#L84-L98"
    },
    "validate": {
      "path": "packages/daemon/src/process/process-coordinator.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 539,
      "end": 554,
      "text": "  }\n\n  private static validateCoordinates(\n    identity: DaemonWorkspaceIdentity,\n    coordinates: DaemonIdentityCoordinates,\n  ): void {\n    if (\n      coordinates.workspaceRoot !== identity.workspaceRoot ||\n      coordinates.workspaceKey !== identity.workspaceKey ||\n      coordinates.stateKey !== identity.stateKey ||\n      coordinates.identityKey !== identity.identityKey ||\n      coordinates.endpoint !== identity.endpoint(coordinates.instanceId)\n    ) {\n      throw new Error(\"Daemon process identity does not match configuration\");\n    }\n  }",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/process/process-coordinator.ts#L539-L554"
    },
    "auth": {
      "path": "packages/daemon/src/process/process-coordinator.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 485,
      "end": 518,
      "text": "    );\n  }\n\n  private decideAdmission(\n    request: Extract<DaemonRequest, { kind: \"execute\" }>,\n  ): DaemonAdmissionDecision {\n    const authenticated = request.processToken === this.options.coordinates.processToken;\n    if (!authenticated) {\n      return this.admissionPolicy.decide({\n        request,\n        authenticated,\n        workerReady: true,\n        resourceAdmissionPaused: false,\n        queueState: \"accepting\",\n        compatibility: \"unseen\",\n      });\n    }\n    void this.resourceSupervisor.sample(\"admission\").catch((error) => {\n      this.logger.record({\n        kind: \"failure\",\n        operation: \"resource-sample\",\n        failureCode: \"operation-failed\",\n        errorName: DaemonLogger.errorName(error),\n      });\n    });\n    return this.admissionPolicy.decide({\n      request,\n      authenticated,\n      workerReady: this.workerManager.snapshot.ready,\n      resourceAdmissionPaused: this.resourceSupervisor.snapshot.admissionPaused,\n      queueState: this.acceptedExecutionSession.snapshot.queue.state,\n      compatibility: this.acceptedExecutionSession.compatibilityFor(request),\n    });\n  }",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/process/process-coordinator.ts#L485-L518"
    },
    "registry": {
      "path": "packages/daemon/src/registry/registry.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 842,
      "end": 860,
      "text": "  private startupOwnershipMatches(\n    identity: DaemonWorkspaceIdentity,\n    expectation: StartupOwnershipExpectation,\n  ): StartupOwner | undefined {\n    const owner = this.startupOwner(identity);\n    if (\n      owner?.identityKey !== expectation.identityKey ||\n      owner.instanceId !== expectation.instanceId ||\n      (expectation.processToken !== undefined && owner.processToken !== expectation.processToken) ||\n      (expectation.ownerKind !== undefined && owner.ownerKind !== expectation.ownerKind) ||\n      (expectation.ownerPid !== undefined && owner.ownerPid !== expectation.ownerPid) ||\n      (expectation.acquiredAt !== undefined && owner.acquiredAt !== expectation.acquiredAt) ||\n      (expectation.heartbeatAt !== undefined && owner.heartbeatAt !== expectation.heartbeatAt) ||\n      (expectation.revision !== undefined && owner.revision !== expectation.revision)\n    ) {\n      return undefined;\n    }\n    return owner;\n  }",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/registry/registry.ts#L842-L860"
    },
    "narrow-owner": {
      "path": "packages/daemon/src/registry/registry.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 443,
      "end": 463,
      "text": "  startupOwnerForInstance(\n    identity: DaemonWorkspaceIdentity,\n    instanceId: string,\n  ): StartupOwner | undefined {\n    return this.startupOwnershipMatches(identity, {\n      identityKey: identity.identityKey,\n      instanceId,\n    });\n  }\n\n  startupOwnerForRecordCredentials(\n    identity: DaemonWorkspaceIdentity,\n    record: DaemonRecord,\n  ): StartupOwner | undefined {\n    return this.startupOwnershipMatches(identity, {\n      identityKey: identity.identityKey,\n      instanceId: record.instanceId,\n      processToken: record.processToken,\n    });\n  }\n",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/registry/registry.ts#L443-L463"
    },
    "routing": {
      "path": "packages/daemon/src/client/daemon-routing-policy.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 73,
      "end": 137,
      "text": "  }\n}\n\nclass NotStartingRoutingGuard implements DaemonRoutingGuard {\n  async evaluate(context: DaemonRoutingContext): Promise<DaemonRouteSnapshot | undefined> {\n    return context.readRecord()?.state === \"starting\"\n      ? { kind: \"cold\", reason: \"starting\" }\n      : undefined;\n  }\n}\n\nclass RecordVersionRoutingGuard implements DaemonRoutingGuard {\n  async evaluate(context: DaemonRoutingContext): Promise<DaemonRouteSnapshot | undefined> {\n    return context.readRecord()?.symnavVersion !== context.productVersion\n      ? { kind: \"fallback\", reason: \"incompatible\" }\n      : undefined;\n  }\n}\n\nclass ResponsiveRoutingGuard implements DaemonRoutingGuard {\n  async evaluate(context: DaemonRoutingContext): Promise<DaemonRouteSnapshot> {\n    const record = context.readRecord()!;\n    let observation: DaemonObservation;\n    try {\n      observation = await context.observe(record);\n    } catch {\n      return { kind: \"cold\", reason: \"recovering\" };\n    }\n    if (observation.kind === \"responsive\") {\n      if (observation.pong.symnavVersion !== context.productVersion) {\n        return { kind: \"fallback\", reason: \"incompatible\" };\n      }\n      if (observation.pong.state === \"starting\") {\n        return { kind: \"cold\", reason: \"recovering\" };\n      }\n      return { kind: \"warm\", record };\n    }\n    if (observation.kind === \"starting\") return { kind: \"cold\", reason: \"starting\" };\n    if (observation.kind === \"unresponsive\") return { kind: \"cold\", reason: \"recovering\" };\n    if (observation.kind === \"exited\") {\n      try {\n        context.removeIfProcess(record);\n      } catch {}\n      return { kind: \"fallback\", reason: \"dead\" };\n    }\n    return { kind: \"fallback\", reason: \"incompatible\" };\n  }\n}\n\nexport class DaemonRoutingPolicy {\n  private readonly guards: readonly DaemonRoutingGuard[] = [\n    new RecordPresentRoutingGuard(),\n    new NotStartingRoutingGuard(),\n    new RecordVersionRoutingGuard(),\n    new ResponsiveRoutingGuard(),\n  ];\n\n  async decide(context: DaemonRoutingContext): Promise<DaemonRouteSnapshot> {\n    for (const guard of this.guards) {\n      const decision = await guard.evaluate(context);\n      if (decision !== undefined) return decision;\n    }\n    throw new Error(\"Daemon routing guards did not produce a decision\");\n  }\n}",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/client/daemon-routing-policy.ts#L73-L137"
    },
    "execute": {
      "path": "packages/daemon/src/client/daemon-client-runtime.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 139,
      "end": 167,
      "text": "  async execute(request: DaemonClientExecuteRequest): Promise<DaemonClientExecuteResult> {\n    if (!this.options.daemonEnabled) return this.executeLocally(request, \"cold\");\n    const identity = DaemonWorkspaceIdentity.from(\n      request.workspaceRoot,\n      this.options.stateDirectory,\n    );\n    const route = await this.routing.decide(\n      new DaemonRoutingContextState(\n        identity,\n        this.options.productVersion,\n        () => this.registry.read(identity),\n        (record) => this.observer.observe(record),\n        (record) => this.registry.removeIfProcess(identity, record.instanceId, record.processToken),\n      ),\n    );\n    if (route.kind === \"warm\") return this.executeWarm(route.record, request);\n    if ((route.kind === \"cold\" && route.reason === \"absent\") || route.kind === \"fallback\") {\n      DaemonClientRuntime.triggerIndependently(this.coordinator, identity);\n    }\n    return this.executeLocally(request, route.kind === \"fallback\" ? \"fallback\" : \"cold\");\n  }\n\n  control(\n    request: Extract<DaemonControlRequest, { readonly action: \"start\" }>,\n  ): Promise<DaemonStartResult>;\n  control(\n    request: Extract<DaemonControlRequest, { readonly action: \"status\" }>,\n  ): Promise<readonly RunningDaemonStatus[]>;\n  control(",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/client/daemon-client-runtime.ts#L139-L167"
    },
    "control": {
      "path": "packages/daemon/src/client/daemon-client-runtime.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 80,
      "end": 136,
      "text": "  private readonly coordinator: DaemonStartupCoordinator;\n  private readonly controlController: DaemonController;\n  private readonly statusController: DaemonController;\n  private readonly routing = new DaemonRoutingPolicy();\n\n  constructor(private readonly options: DaemonClientOptions) {\n    this.policy = options.policy ?? DaemonPolicy.currentSystem();\n    this.registry = new DaemonRegistry(\n      DaemonWorkspaceIdentity.registryDirectory(options.stateDirectory),\n      this.policy.values.startup,\n    );\n    this.routingTransport = new LocalDaemonTransport({\n      policy: this.policy,\n      createOutput: () => new DaemonClientResultCapture({ policy: this.policy.values.output }),\n    });\n    this.statusTransport = new LocalDaemonTransport({\n      policy: this.policy,\n      lifecycleResponseTimeoutMs: this.policy.values.transport.statusResponseTimeoutMs,\n    });\n    const processTerminator = new NodeDaemonProcessTerminator(this.policy.values.shutdown);\n    const launcher = new NodeDaemonProcessLauncher(\n      options.productVersion,\n      options.executorModuleUrl,\n      this.policy,\n      processTerminator,\n    );\n    this.observer = new DaemonRecordObserver(this.routingTransport, processTerminator);\n    this.coordinator = new DaemonStartupCoordinator(\n      this.registry,\n      launcher,\n      this.routingTransport,\n      {\n        policy: this.policy.values,\n        processTerminator,\n        readinessProbe: options.readinessProbe,\n      },\n    );\n    this.controlController = new DaemonController(\n      this.registry,\n      this.routingTransport,\n      options.stateDirectory,\n      {\n        policy: this.policy.values,\n        processTerminator,\n        launcher,\n        startupCoordinator: this.coordinator,\n      },\n    );\n    this.statusController = new DaemonController(\n      this.registry,\n      this.statusTransport,\n      options.stateDirectory,\n      {\n        policy: this.policy.values,\n        processTerminator,\n      },\n    );",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/client/daemon-client-runtime.ts#L80-L136"
    },
    "control-actions": {
      "path": "packages/daemon/src/client/daemon-client-runtime.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 169,
      "end": 192,
      "text": "  ): Promise<DaemonStopResult>;\n  control(\n    request: DaemonControlRequest,\n  ): Promise<DaemonStartResult | readonly RunningDaemonStatus[] | DaemonStopResult> {\n    if (request.action === \"start\") {\n      if (!this.options.daemonEnabled) return Promise.resolve({ status: \"disabled\" });\n      return this.controlController.start(request.workspaceRoot);\n    }\n    if (request.action === \"status\") return this.statusController.status();\n    return this.controlController.stop(request.workspaceRoot);\n  }\n\n  private async executeWarm(\n    record: DaemonRecord,\n    request: DaemonClientExecuteRequest,\n  ): Promise<DaemonClientExecuteResult> {\n    let receipt: Awaited<ReturnType<LocalDaemonTransport[\"execute\"]>>;\n    try {\n      receipt = await this.routingTransport.execute(record.endpoint, {\n        kind: \"execute\",\n        protocolVersion: DAEMON_PROTOCOL_VERSION,\n        instanceId: record.instanceId,\n        processToken: record.processToken,\n        requestId: randomUUID(),",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/client/daemon-client-runtime.ts#L169-L192"
    },
    "capture": {
      "path": "packages/daemon/src/client/daemon-client-runtime.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 189,
      "end": 269,
      "text": "        protocolVersion: DAEMON_PROTOCOL_VERSION,\n        instanceId: record.instanceId,\n        processToken: record.processToken,\n        requestId: randomUUID(),\n        commandName: request.commandName,\n        request: DaemonClientRuntime.executorRequest(request, \"warm\"),\n      });\n    } catch (error) {\n      if (error instanceof DaemonTransportError && error.retrySafe) {\n        return this.executeLocally(request, \"fallback\");\n      }\n      return { mode: \"warm\", result: DaemonControlledResult.acceptedRequestDidNotComplete() };\n    }\n    try {\n      const completion = await receipt.completion;\n      if (completion.status === \"failed\") {\n        return { mode: \"warm\", result: DaemonClientRuntime.controlledFailure(completion.code) };\n      }\n      if (!DaemonClientRuntime.isCompleteResult(completion.result)) {\n        await DaemonClientRuntime.disposeMalformedOutput(completion.result);\n        return { mode: \"warm\", result: DaemonControlledResult.acceptedRequestDidNotComplete() };\n      }\n      return { mode: \"warm\", result: completion.result };\n    } catch {\n      return { mode: \"warm\", result: DaemonControlledResult.acceptedRequestDidNotComplete() };\n    }\n  }\n\n  private async executeLocally(\n    request: DaemonClientExecuteRequest,\n    mode: \"cold\" | \"fallback\",\n  ): Promise<DaemonClientExecuteResult> {\n    const executor = await this.options.executorFactory({\n      stateDirectory: this.options.stateDirectory,\n      productVersion: this.options.productVersion,\n      sampleResources: () => undefined,\n    });\n    const result = await executor.execute(DaemonClientRuntime.executorRequest(request, mode));\n    return { mode, result };\n  }\n\n  private static executorRequest(\n    request: DaemonClientExecuteRequest,\n    executionMode: DaemonExecutorRequest[\"executionMode\"],\n  ): DaemonExecutorRequest {\n    return {\n      argv: request.argv,\n      cwd: request.cwd,\n      telemetryEnabled: request.telemetryEnabled,\n      executionMode,\n    };\n  }\n\n  private static triggerIndependently(\n    coordinator: DaemonStartupCoordinator,\n    identity: DaemonWorkspaceIdentity,\n  ): void {\n    try {\n      void coordinator.trigger(identity).catch(() => undefined);\n    } catch {}\n  }\n\n  private static isCompleteResult(result: DaemonExecutorExecutionResult): boolean {\n    return Number.isInteger(result.exitCode) && result.output !== undefined;\n  }\n\n  private static async disposeMalformedOutput(\n    result: DaemonExecutorExecutionResult,\n  ): Promise<void> {\n    try {\n      await result.output?.dispose();\n    } catch {}\n  }\n\n  private static controlledFailure(\n    code: DaemonExecutionFailureCode,\n  ): DaemonExecutorExecutionResult {\n    if (code === \"controlled-resource\") return DaemonControlledResult.workspaceCapacityExceeded();\n    if (code === \"response-capacity\") return DaemonControlledResult.responseCapacityExceeded();\n    return DaemonControlledResult.acceptedRequestDidNotComplete();\n  }",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/client/daemon-client-runtime.ts#L189-L269"
    },
    "spool-codec": {
      "path": "packages/daemon/src/delivery/completion-spool.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 1,
      "end": 80,
      "text": "import { createHash, randomUUID } from \"node:crypto\";\nimport { constants } from \"node:fs\";\nimport { chmod, lstat, mkdir, open, rm, unlink } from \"node:fs/promises\";\nimport type { FileHandle } from \"node:fs/promises\";\nimport { join } from \"node:path\";\nimport type { DaemonPolicyValues } from \"@symnav/daemon\";\nimport type { DaemonSequencedOutputRecord as CommandOutputRecord } from \"../daemon-executor.js\";\n\ninterface CommandOutputSummary {\n  readonly rawBytes: number;\n  readonly recordCount: number;\n  readonly sha256: string;\n}\n\nconst RECORD_HEADER_BYTES = 9;\n\nclass CompletionSpoolRecordCodec {\n  static encode(record: CommandOutputRecord): Buffer {\n    const header = Buffer.alloc(RECORD_HEADER_BYTES);\n    header.writeUInt32BE(record.sequence, 0);\n    header.writeUInt8(record.stream === \"stdout\" ? 0 : 1, 4);\n    header.writeUInt32BE(record.bytes.byteLength, 5);\n    return Buffer.concat([header, Buffer.from(record.bytes)]);\n  }\n\n  static async *decodeFile(\n    filePath: string,\n    maximumRecordBytes: number,\n  ): AsyncIterable<CommandOutputRecord> {\n    const noFollow = \"O_NOFOLLOW\" in constants ? constants.O_NOFOLLOW : 0;\n    const handle = await open(filePath, constants.O_RDONLY | noFollow);\n    try {\n      const metadata = await handle.stat();\n      if (!metadata.isFile()) throw new Error(\"Command output spool is not a regular file\");\n      let position = 0;\n      let expectedSequence = 0;\n      while (position < metadata.size) {\n        const header = Buffer.alloc(RECORD_HEADER_BYTES);\n        await CompletionSpoolRecordCodec.readExact(handle, header, position);\n        position += RECORD_HEADER_BYTES;\n        const sequence = header.readUInt32BE(0);\n        const streamByte = header.readUInt8(4);\n        const length = header.readUInt32BE(5);\n        if (sequence !== expectedSequence || streamByte > 1 || length > maximumRecordBytes) {\n          throw new Error(\"Corrupt command output\");\n        }\n        const bytes = Buffer.alloc(length);\n        await CompletionSpoolRecordCodec.readExact(handle, bytes, position);\n        position += length;\n        expectedSequence += 1;\n        yield { sequence, stream: streamByte === 0 ? \"stdout\" : \"stderr\", bytes };\n      }\n    } finally {\n      await handle.close();\n    }\n  }\n\n  private static async readExact(\n    handle: FileHandle,\n    buffer: Buffer,\n    position: number,\n  ): Promise<void> {\n    let offset = 0;\n    while (offset < buffer.byteLength) {\n      const { bytesRead } = await handle.read(\n        buffer,\n        offset,\n        buffer.byteLength - offset,\n        position + offset,\n      );\n      if (bytesRead === 0) throw new Error(\"Truncated command output\");\n      offset += bytesRead;\n    }\n  }\n}\n\nexport interface CompletionSpoolIdentity {\n  readonly workspaceKey: string;\n  readonly instanceId: string;\n  readonly transferId: string;",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/delivery/completion-spool.ts#L1-L80"
    },
    "failures": {
      "path": "packages/daemon/src/client/daemon-client-runtime.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 39,
      "end": 68,
      "text": "\nclass DaemonControlledOutput implements DaemonExecutorOutput {\n  private readonly bytes: Uint8Array;\n\n  constructor(message: string) {\n    this.bytes = Buffer.from(message);\n  }\n\n  async *records(): AsyncIterable<DaemonOutputRecord> {\n    yield { stream: \"stderr\", bytes: this.bytes };\n  }\n\n  dispose(): Promise<void> {\n    return Promise.resolve();\n  }\n}\n\nclass DaemonControlledResult {\n  static acceptedRequestDidNotComplete(): DaemonExecutorExecutionResult {\n    return this.failure(\"Cannot answer: accepted daemon request did not complete.\\n\");\n  }\n\n  static workspaceCapacityExceeded(): DaemonExecutorExecutionResult {\n    return this.failure(\"Cannot answer: daemon workspace capacity exceeded.\\n\");\n  }\n\n  static responseCapacityExceeded(): DaemonExecutorExecutionResult {\n    return this.failure(\"Cannot answer: daemon response capacity exceeded.\\n\");\n  }\n",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/client/daemon-client-runtime.ts#L39-L68"
    },
    "probe": {
      "path": "packages/daemon/src/registry/startup-coordinator.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 468,
      "end": 491,
      "text": "  private async probeExecution(record: DaemonRecord): Promise<void> {\n    const receipt = await this.transport.execute(record.endpoint, {\n      kind: \"execute\",\n      protocolVersion: DAEMON_PROTOCOL_VERSION,\n      instanceId: record.instanceId,\n      processToken: record.processToken,\n      requestId: randomUUID(),\n      commandName: this.readinessProbe.commandName,\n      request: {\n        argv: this.readinessProbe.argv,\n        cwd: record.workspaceRoot,\n        telemetryEnabled: false,\n        executionMode: \"cold\",\n      },\n    });\n    const completion = await receipt.completion;\n    if (completion.status !== \"completed\" || completion.result.exitCode !== 0) {\n      throw new Error(\"Daemon execution readiness probe failed\");\n    }\n  }\n\n  private alreadyRunning(record: DaemonRecord): DaemonStartResult {\n    return {\n      status: \"already-running\",",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/registry/startup-coordinator.ts#L468-L491"
    },
    "worker-before": {
      "path": "apps/cli/src/daemon/daemon-navigation-worker.test.ts",
      "revision": "ba53c8e1662fd86d198b95321c90d9c9bef10184",
      "start": 369,
      "end": 435,
      "text": "  it(\"classifies a CLI executor version mismatch as an initialization failure\", async () => {\n    const directory = mkdtempSync(join(tmpdir(), \"symnav-injected-worker-version-\"));\n    const worker = createInjectedWorker(\n      new URL(\"../../dist/daemon-executor.js\", import.meta.url).href,\n      directory,\n      \"definitely-not-the-product-version\",\n    );\n    try {\n      await expect(worker.start(fixturePath(\"overview-cases\"))).rejects.toThrow(\n        /initialization failure/i,\n      );\n    } finally {\n      await worker.terminate();\n      rmSync(directory, { recursive: true, force: true });\n    }\n  });\n\n  it(\"proves readiness through the injected CLI version command with legacy cold input\", async () => {\n    const directory = mkdtempSync(join(tmpdir(), \"symnav-injected-worker-readiness-\"));\n    const workspaceRoot = fixturePath(\"overview-cases\");\n    const worker = createInjectedWorker(\n      new URL(\"../../dist/daemon-executor.js\", import.meta.url).href,\n      directory,\n      \"0.1.0\",\n    );\n    try {\n      await expect(worker.start(workspaceRoot)).resolves.toMatchObject({\n        kind: \"ready\",\n        fileCount: 17,\n        startupDurations: {\n          discoveryMs: 0,\n          indexingMs: expect.any(Number),\n          totalMs: expect.any(Number),\n        },\n      });\n      const records: Uint8Array[] = [];\n      await expect(\n        worker.execute(\n          \"readiness-probe\",\n          \"version\",\n          {\n            argv: [\"--version\"],\n            cwd: workspaceRoot,\n            telemetryEnabled: false,\n            executionMode: \"cold\",\n          },\n          {\n            append: async (record) => {\n              records.push(record.bytes);\n            },\n          },\n        ),\n      ).resolves.toMatchObject({\n        kind: \"result\",\n        result: { exitCode: 0 },\n        durations: {\n          freshnessMs: 0,\n          navigationMs: 0,\n          renderMs: 0,\n          outputMs: expect.any(Number),\n        },\n      });\n      expect(Buffer.concat(records).toString(\"utf8\")).toBe(\"0.1.0\\n\");\n      await worker.drainAndClose();\n    } finally {\n      await worker.terminate();\n      rmSync(directory, { recursive: true, force: true });",
      "url": "https://github.com/mohasarc/symnav/blob/ba53c8e1662fd86d198b95321c90d9c9bef10184/apps/cli/src/daemon/daemon-navigation-worker.test.ts#L369-L435"
    },
    "worker-after": {
      "path": "packages/daemon/src/worker/navigation-worker.test.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 369,
      "end": 407,
      "text": "  it(\"proves readiness through the generic executor module\", async () => {\n    const directory = mkdtempSync(join(tmpdir(), \"symnav-injected-worker-readiness-\"));\n    const worker = createInjectedWorker(\n      new URL(\"../../test/fixtures/executor-module.mjs\", import.meta.url).href,\n      directory,\n      \"test\",\n    );\n    try {\n      await expect(worker.start(\"files:17\")).resolves.toMatchObject({\n        kind: \"ready\",\n        fileCount: 17,\n      });\n      const records: Uint8Array[] = [];\n      await expect(\n        worker.execute(\n          \"readiness-probe\",\n          \"version\",\n          {\n            argv: [\"stdout:0.1.0\\n\"],\n            cwd: directory,\n            telemetryEnabled: false,\n            executionMode: \"cold\",\n          },\n          {\n            append: async (record) => {\n              records.push(record.bytes);\n            },\n          },\n        ),\n      ).resolves.toMatchObject({\n        kind: \"result\",\n        result: { exitCode: 0 },\n      });\n      expect(Buffer.concat(records).toString(\"utf8\")).toBe(\"0.1.0\\n\");\n      await worker.drainAndClose();\n    } finally {\n      await worker.terminate();\n      rmSync(directory, { recursive: true, force: true });\n    }",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/worker/navigation-worker.test.ts#L369-L407"
    },
    "version": {
      "path": "apps/cli/src/daemon-executor.test.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 27,
      "end": 44,
      "text": "\n    expect(new URL(moduleUrl).protocol).toBe(\"file:\");\n    expect(isAbsolute(fileURLToPath(moduleUrl))).toBe(true);\n  });\n\n  it(\"rejects a product version that does not match the CLI\", () => {\n    expect(() =>\n      createDaemonExecutor({\n        stateDirectory: temporaryDirectory(temporaryDirectories),\n        productVersion: \"0.0.9\",\n        sampleResources: () => undefined,\n      }),\n    ).toThrow(\"Daemon executor version does not match host product\");\n  });\n\n  it(\"constructs one retained session and full-prepares initialization once\", async () => {\n    const stateDirectory = temporaryDirectory(temporaryDirectories);\n    const prepare = vi.spyOn(WorkspaceSession.prototype, \"prepare\");",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/apps/cli/src/daemon-executor.test.ts#L27-L44"
    },
    "entry-before": {
      "path": "apps/cli/src/daemon/daemon-entry.test.ts",
      "revision": "ba53c8e1662fd86d198b95321c90d9c9bef10184",
      "start": 99,
      "end": 122,
      "text": "\n  await import(\"./daemon-entry.js\");\n\n  expect(daemonStateDirectory).toBe(configuredStateDirectory);\n  expect(daemonExecutorModuleUrl).toBe(configuration.executorModuleUrl);\n  expect(daemonWorkerLimit).toBe(257);\n  expect(terminationObserverInstalled).toBe(true);\n  expect(terminationRecorder).toBe(daemonLogger);\n});\n\nit(\"keeps the process and worker entries independent from CLI and core modules\", () => {\n  for (const file of [\n    \"daemon-entry.ts\",\n    \"daemon-navigation-worker-entry.ts\",\n    \"daemon-navigation-worker-protocol.ts\",\n    \"local-daemon-transport.ts\",\n    \"workspace-daemon.ts\",\n  ]) {\n    const source = readFileSync(new URL(file, import.meta.url), \"utf8\");\n    expect(source).not.toMatch(\n      /@symnav\\/core|\\.\\.\\/(program|program-dependencies|command-execution-result)/,\n    );\n  }\n});",
      "url": "https://github.com/mohasarc/symnav/blob/ba53c8e1662fd86d198b95321c90d9c9bef10184/apps/cli/src/daemon/daemon-entry.test.ts#L99-L122"
    },
    "entry-after": {
      "path": "packages/daemon/test/integration/built-process-entry.test.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 217,
      "end": 283,
      "text": "  it(\"executes its parsed generic executor configuration exactly once\", async () => {\n    const harness = new BuiltProcessEntryHarness(observableExecutorModuleUrl);\n    try {\n      await harness.launch();\n      const ready = await harness.waitForReady();\n      await delay(1_000);\n\n      expect(ready).toMatchObject({\n        state: \"ready\",\n        workspaceRoot: harness.workspaceRoot,\n        symnavVersion: harness.productVersion,\n        instanceId: harness.instanceId,\n        processToken: harness.processToken,\n        fileCount: 1,\n      });\n      expect(harness.events()).toEqual([\n        {\n          kind: \"create\",\n          stateDirectory: harness.stateDirectory,\n          productVersion: harness.productVersion,\n        },\n        { kind: \"initialize\", workspaceRoot: harness.workspaceRoot },\n      ]);\n      expect(harness.diagnosticKinds().filter((kind) => kind === \"start\")).toEqual([\"start\"]);\n      expect(harness.diagnosticKinds().filter((kind) => kind === \"startup-completed\")).toEqual([\n        \"startup-completed\",\n      ]);\n      expect(harness.diagnosticKinds().filter((kind) => kind === \"ready\")).toEqual([\"ready\"]);\n      await expect(harness.terminate()).resolves.toMatchObject({ cause: \"exit\", code: 1 });\n      const processTerminationDiagnostics = harness\n        .diagnosticKinds()\n        .filter((kind) => kind === \"process-termination\");\n      if (process.platform === \"win32\") {\n        expect(harness.startupArtifacts()).toEqual({ record: ready, owner: undefined });\n        expect(processTerminationDiagnostics).toEqual([]);\n        expect(harness.removeExitedProcess(ready)).toBe(true);\n      } else {\n        expect(harness.startupArtifacts()).toEqual({ record: undefined, owner: undefined });\n        expect(processTerminationDiagnostics).toEqual([\"process-termination\"]);\n      }\n      expect(harness.startupArtifacts()).toEqual({ record: undefined, owner: undefined });\n    } finally {\n      await harness.dispose();\n    }\n  }, 10_000);\n\n  it.each([\n    [\n      \"missing module\",\n      pathToFileURL(join(packageDirectory, \"test\", \"fixtures\", \"missing.mjs\")).href,\n    ],\n    [\"missing export\", pathToFileURL(join(packageDirectory, \"package.json\")).href],\n  ])(\n    \"retains %s startup failure and exact ownership cleanup\",\n    async (_scenario, moduleUrl) => {\n      const harness = new BuiltProcessEntryHarness(moduleUrl);\n      try {\n        await harness.launch();\n\n        await expect(harness.waitForExit()).resolves.toMatchObject({ cause: \"exit\", code: 1 });\n        expect(harness.startupArtifacts()).toEqual({ record: undefined, owner: undefined });\n      } finally {\n        await harness.dispose();\n      }\n    },\n    10_000,\n  );",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/test/integration/built-process-entry.test.ts#L217-L283"
    },
    "serial": {
      "path": "packages/daemon/vitest.config.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 1,
      "end": 7,
      "text": "import { defineConfig } from \"vitest/config\";\n\nexport default defineConfig({\n  test: {\n    fileParallelism: false,\n  },\n});",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/vitest.config.ts#L1-L7"
    },
    "lint-before": {
      "path": "eslint.config.mjs",
      "revision": "ba53c8e1662fd86d198b95321c90d9c9bef10184",
      "start": 88,
      "end": 112,
      "text": "        alias: { map: aliasMap, extensions: [\".ts\", \".js\"] },\n      },\n    },\n    rules: {\n      ...prettierConfig.rules,\n      \"prettier/prettier\": \"error\",\n      \"no-restricted-imports\": [\n        \"error\",\n        {\n          paths: [\n            {\n              name: \"@symnav/daemon/policy-testing\",\n              message: \"Daemon policy overrides are test-only.\",\n            },\n          ],\n        },\n      ],\n      \"no-restricted-syntax\": [\n        \"error\",\n        {\n          selector: \"VariableDeclarator[init.type='ObjectExpression']:not([id.typeAnnotation])\",\n          message:\n            \"Annotate object-literal declarations with a type (`const x: T = {…}`) or use `satisfies`.\",\n        },\n      ],",
      "url": "https://github.com/mohasarc/symnav/blob/ba53c8e1662fd86d198b95321c90d9c9bef10184/eslint.config.mjs#L88-L112"
    },
    "lint-tests-before": {
      "path": "meta-tests/src/lint-rule.test.ts",
      "revision": "ba53c8e1662fd86d198b95321c90d9c9bef10184",
      "start": 109,
      "end": 130,
      "text": "  it(\"allows CLI test files to import the temporary daemon policy factory\", async () => {\n    const eslint = await makeESLint();\n    const code = `import { DaemonPolicyTestFactory } from \"@symnav/daemon/policy-testing\";\\nexport const value = DaemonPolicyTestFactory;\\n`;\n    const [result] = await eslint.lintText(code, {\n      filePath: join(repoRoot, \"apps/cli/src/daemon/policy.test.ts\"),\n    });\n    expect(result!.errorCount).toBe(0);\n  });\n\n  it(\"rejects production imports of the temporary daemon policy factory\", async () => {\n    const eslint = await makeESLint();\n    const code = `import { DaemonPolicyTestFactory } from \"@symnav/daemon/policy-testing\";\\nexport const value = DaemonPolicyTestFactory;\\n`;\n    const [result] = await eslint.lintText(code, {\n      filePath: join(repoRoot, \"apps/cli/src/daemon/policy.ts\"),\n    });\n    const restricted = result!.messages.filter(\n      (message) => message.ruleId === \"no-restricted-imports\",\n    );\n    expect(restricted).toHaveLength(1);\n  });\n\n  it(\"allows daemon test files to import @symnav/testing\", async () => {",
      "url": "https://github.com/mohasarc/symnav/blob/ba53c8e1662fd86d198b95321c90d9c9bef10184/meta-tests/src/lint-rule.test.ts#L109-L130"
    },
    "node-types": {
      "path": "packages/daemon/src/host-contract.test.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 393,
      "end": 416,
      "text": "    return paths;\n  }\n}\n\nclass NodeFreeDeclarationCompiler {\n  public static compile(rootNames: readonly string[]): DeclarationCompilation {\n    const outputs = new Map<string, string>();\n    const program = ts.createProgram([...rootNames], {\n      declaration: true,\n      emitDeclarationOnly: true,\n      exactOptionalPropertyTypes: true,\n      lib: [\"lib.es2022.d.ts\"],\n      module: ts.ModuleKind.NodeNext,\n      moduleResolution: ts.ModuleResolutionKind.NodeNext,\n      noEmitOnError: true,\n      skipLibCheck: false,\n      strict: true,\n      target: ts.ScriptTarget.ES2022,\n      types: [],\n    });\n    const emitResult = program.emit(undefined, (fileName, data) => outputs.set(fileName, data));\n    return {\n      diagnostics: [...ts.getPreEmitDiagnostics(program), ...emitResult.diagnostics],\n      outputs,",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/host-contract.test.ts#L393-L416"
    },
    "boundaries": {
      "path": "packages/daemon/src/package-boundary.test.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 10,
      "end": 37,
      "text": "    );\n  }\n\n  static violations(sourceRoot: string): readonly string[] {\n    return DaemonProductionBoundary.files(sourceRoot).flatMap((path) => {\n      const source = readFileSync(path, \"utf8\");\n      const forbidden = [\n        /from [\"']@symnav\\/(?:core|telemetry|renderer|backend-typescript|testing)[\"']/,\n        /from [\"'][^\"']*apps\\/cli[^\"']*[\"']/,\n      ];\n      return forbidden.some((pattern) => pattern.test(source)) ? [relative(sourceRoot, path)] : [];\n    });\n  }\n\n  private static walk(directory: string): readonly string[] {\n    return readdirSync(directory).flatMap((name) => {\n      const path = join(directory, name);\n      return statSync(path).isDirectory() ? DaemonProductionBoundary.walk(path) : [path];\n    });\n  }\n}\n\ndescribe(\"daemon package production boundary\", () => {\n  it(\"has no internal production dependency or CLI import\", () => {\n    const sourceRoot = dirname(fileURLToPath(import.meta.url));\n    expect(DaemonProductionBoundary.violations(sourceRoot)).toEqual([]);\n  });\n});",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/package-boundary.test.ts#L10-L37"
    },
    "entries": {
      "path": "packages/daemon/src/process-entry.ts",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 1,
      "end": 42,
      "text": "import { DaemonPolicy } from \"./daemon-policy.js\";\nimport { NodeDaemonClock } from \"./lifecycle/daemon-clock.js\";\nimport { DaemonLogger } from \"./diagnostics/logger.js\";\nimport { DaemonProcessConfigurationParser } from \"./process/process-launcher.js\";\nimport { DaemonProcessTerminationObserver } from \"./process/process-termination-observer.js\";\nimport { DaemonProcessCoordinator } from \"./process/process-coordinator.js\";\nimport { DaemonRegistry } from \"./registry/registry.js\";\nimport { DaemonWorkspaceIdentity } from \"./registry/workspace-identity.js\";\nimport { LocalDaemonTransport } from \"./transport/local-transport.js\";\n\nclass DaemonProcessEntry {\n  static async run(encodedConfiguration: string | undefined): Promise<void> {\n    const configuration = DaemonProcessConfigurationParser.parse(encodedConfiguration);\n    const identity = DaemonWorkspaceIdentity.from(\n      configuration.workspaceRoot,\n      configuration.stateDirectory,\n    );\n    const policy = DaemonPolicy.fromSerialized(configuration.policy);\n    const clock = new NodeDaemonClock();\n    const registry = new DaemonRegistry(identity.registryDirectory, policy.values.startup, clock);\n    const logger = new DaemonLogger(identity, configuration.instanceId, clock, {\n      policy: policy.values.diagnostics,\n    });\n    const coordinator = new DaemonProcessCoordinator({\n      identity,\n      coordinates: configuration,\n      productVersion: configuration.symnavVersion,\n      executorModuleUrl: configuration.executorModuleUrl,\n      policy,\n      registry,\n      server: new LocalDaemonTransport({ policy }),\n      clock,\n      logger,\n    });\n    new DaemonProcessTerminationObserver(logger, () => {\n      registry.removeIfProcess(identity, configuration.instanceId, configuration.processToken);\n    }).install();\n    await coordinator.start();\n  }\n}\n\nawait DaemonProcessEntry.run(process.argv[2]);",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/packages/daemon/src/process-entry.ts#L1-L42"
    },
    "spec-behavior": {
      "path": "plans/005/daemon-architecture-functional-spec.md",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 17,
      "end": 43,
      "text": "### Behavior is unchanged\n\nThis is a refactor. Every command, daemon lifecycle action, diagnostic record, telemetry event, and failure path behaves as it does today.\n\n```text\nGiven the same workspace, arguments, environment, and daemon state, output bytes,\nexit code, execution mode, and lifecycle outcome are identical before and after.\n```\n\nCorrect: a restructuring change passes the existing e2e parity and daemon suites without touching a single expectation. Incorrect: a restructuring change \"fixes\" a queue, eviction, timeout, or path while moving code.\n\nThere is no \"it was obviously a bug\" override. Behavior defects found during restructuring are recorded in `daemon-follow-ups-functional-spec.md` and changed separately.\n\n### The daemon package depends on nothing internal\n\nThe daemon package imports no other symnav package. It moves bytes for an executor it is handed; it does not know what a symbol, workspace snapshot, or backend is.\n\n```text\n@symnav/daemon may import: (nothing internal)\n```\n\nCorrect: the daemon logs a worker's refresh counters as an opaque diagnostics record supplied by the executor. Incorrect: the daemon's protocol names a core type to describe those counters.\n\nThere is no exception for \"just a type\".\n\n### Core knows nothing about daemons or processes\n",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/plans/005/daemon-architecture-functional-spec.md#L17-L43"
    },
    "spec-host": {
      "path": "plans/005/daemon-architecture-functional-spec.md",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 114,
      "end": 134,
      "text": "\n### What a host provides to the daemon package\n\n- An executor: given argv, working directory, and telemetry flag, produces an ordered stream of stdout/stderr byte records and an exit code; can also release transient caches on request.\n- The location of a module that constructs that executor, so the daemon's worker can load it in another thread or process.\n- A state directory path.\n- The product version, for compatibility checks.\n- Per invocation: a workspace root and argv, or a control action (`start`, `status`, `stop`).\n\n### What a host receives\n\n- `execute(workspaceRoot, argv)`: a result identical in bytes to local execution, produced warm, cold, or by fallback. The host does not learn which route was taken except through the execution mode recorded for telemetry.\n- `control(action)`: a lifecycle report the host renders.\n\n### What a host must not do\n\n- Read or write registry, socket, spool, or log files directly.\n- Decide warm vs cold.\n- Import from the daemon package's internal modules; only its public surface.\n\n### Locked dependency graph",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/plans/005/daemon-architecture-functional-spec.md#L114-L134"
    },
    "spec-routing": {
      "path": "plans/005/daemon-architecture-functional-spec.md",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 206,
      "end": 224,
      "text": "\n## Client Routing Boundary\n\n**Purpose.** Keep CLI syntax in the CLI and daemon routing in the daemon.\n\n**Produces.** CLI classifies argv into local, control, or workspace; extracts `--cwd`; resolves the workspace root via core. Daemon client receives the root and argv and decides warm, cold, cold-plus-trigger, or fallback.\n\n**Does not produce.** A daemon that parses argv for anything but forwarding. A CLI that reads registry records.\n\n**Defaults.** Unchanged from `daemon-functional-spec.md` routing table.\n\n## Workspace Session in Core\n\n**Purpose.** Make retention a core object rather than CLI wiring.\n\n**Produces.** A session owning the workspace catalog and backends; prepares a scope (workspace, snapshot, router, refresh summary) for a start directory, with optional file selection. Cold runs create one per process; the daemon's worker keeps one alive.\n\n**Does not produce.** Any persistence beyond the process lifetime.\n",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/plans/005/daemon-architecture-functional-spec.md#L206-L224"
    },
    "spec-clock": {
      "path": "plans/005/daemon-architecture-functional-spec.md",
      "revision": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "start": 237,
      "end": 252,
      "text": "**Purpose.** Stop telemetry acting as a shared utilities package.\n\n**Produces.** CLI resolves `SYMNAV_STATE_DIR` or `~/.symnav` once and passes the path to telemetry and daemon. Daemon owns its wall and monotonic clock. Telemetry keeps only its own path helpers.\n\n## Lifecycle Rendering\n\n**Purpose.** Keep all formatting in the renderer package.\n\n**Produces.** Text and JSON rendering of start, status, and stop reports in `@symnav/renderer`, byte-identical to current output.\n\n## Guard-List Admission and Routing\n\n**Purpose.** Make the check order readable and each check testable alone.\n\n**Produces.** Admission: an ordered list (authenticated, worker ready, memory not paused, not draining, not a conflicting duplicate) where the first failing guard stops with a rejection code. Routing: an ordered list (record present, not starting, version compatible, responsive) producing warm, cold with reason, or fallback with reason. One closed rejection vocabulary owns \"safe to retry locally\".\n",
      "url": "https://github.com/mohasarc/symnav/blob/20838f8dbf413e04767543eb2380d0d114da6c60/plans/005/daemon-architecture-functional-spec.md#L237-L252"
    }
  },
  "prBody": "## Context\n\nDaemon process ownership still lived in CLI-local mechanisms, and hosts needed registry, transport, startup, and lifecycle knowledge to compose daemon execution. This group establishes the package-owned process and client boundary while leaving the active CLI consumer switch to the next PR.\n\n## Shape\n\nBefore — CLI-local mechanisms own process coordination and expose their composition burden to the host:\n\n```mermaid\nflowchart LR\n  H[CLI host] --> W[WorkspaceDaemon]\n  W --> M[CLI-local daemon mechanisms]\n  P[daemon package] --> C[Contracts and policy]\n  classDef removed fill:#ffebe9,stroke:#cf222e,color:#24292f\n  class W removed\n```\n\nAfter — package entries and a public client compose package-local mechanisms; the shipped CLI still follows its frozen compatibility graph:\n\n```mermaid\nflowchart LR\n  H[CLI host] --> F[Frozen compatibility graph]\n  P[daemon package] --> D[DaemonClient public facade]\n  D --> M[Private routing and lifecycle mechanisms]\n  E[Process and worker entries] --> M\n  classDef added fill:#dafbe1,stroke:#1a7f37,color:#24292f\n  classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f\n  class D,M,E added\n  class F changed\n```\n\nLegend: green = added; red = removed; yellow = changed; unfilled = pre-existing and unchanged.\n\n## Where it lives\n\n```text\n.\n├── apps/cli/src/daemon/\n│   ├── ~~ daemon-process-coordinator.ts # renamed from workspace-daemon.ts; owns process lifecycle\n│   ├── ** daemon-clock.ts               # owns wall and monotonic time sources\n│   ├── ** daemon-registry.ts            # owns startup-lock equality\n│   └── ** ... 9 files                   # coordinated compatibility mechanisms, then frozen\n├── packages/daemon/\n│   ├── ** package.json                  # exposes real process and worker entry subpaths\n│   ├── src/\n│   │   ├── ++ client/ ... 8 files       # public facade and private routing/runtime composition\n│   │   ├── ++ delivery/, diagnostics/, execution/, lifecycle/\n│   │   ├── ++ process/, registry/, resources/, transport/, worker/ # package mechanism owners\n│   │   ├── ~~ ... 37 test files         # moved from apps/cli/src/daemon/\n│   │   ├── ++ process-entry.ts\n│   │   ├── ++ worker-entry.ts\n│   │   └── ** index.ts                  # exports the host-facing client surface\n│   └── ++ test/ ... 24 files            # generic executor and built-entry integration fixtures\n├── meta-tests/src/\n│   └── ++ daemon-compatibility-copy.test.ts # freezes 38 app-local production copies\n└── plans/005/\n    └── ** daemon-follow-ups-functional-spec.md # records deferred idle-accounting changes\n```\n\n## Public surface\n\n```ts\nexport type {\n  DaemonClientExecuteRequest,\n  DaemonClientExecuteResult,\n  DaemonClientOptions,\n  DaemonControlRequest,\n} from \"./client/daemon-client-contracts.js\";\nexport { DaemonClient } from \"./client/daemon-client.js\";\n\nexport class DaemonClient {\n  constructor(options: DaemonClientOptions);\n  execute(request: DaemonClientExecuteRequest): Promise<DaemonClientExecuteResult>;\n  control(\n    request: Extract<DaemonControlRequest, { readonly action: \"start\" }>,\n  ): Promise<DaemonStartResult>;\n  control(\n    request: Extract<DaemonControlRequest, { readonly action: \"status\" }>,\n  ): Promise<readonly RunningDaemonStatus[]>;\n  control(\n    request: Extract<DaemonControlRequest, { readonly action: \"stop\" }>,\n  ): Promise<DaemonStopResult>;\n}\n```\n\n## Decisions\n\n- Chose a Node-free public façade with a dynamically loaded internal runtime over exposing Node-backed mechanisms, because host declarations must not acquire Node ambient dependencies.\n- Chose ordered lazy routing guards over eager registry and transport observation, because the first routing decision must prevent every later side effect.\n- Chose package staging with a frozen CLI compatibility graph over switching production consumers during relocation, because mechanism ownership and host invocation coordination need separate review boundaries.\n- Chose package-owned result capture and controlled failure outputs over host-provided storage or output factories, because warm transfer cleanup and replay safety belong to the daemon client.\n- Chose to preserve acceptance-based idle timing over correcting it during extraction, because readiness- and completion-based lifetime changes are explicitly deferred behavior.\n\n## Look here\n\n- `packages/daemon/src/process/process-coordinator.ts:84`\n- `packages/daemon/src/client/daemon-client-runtime.ts:139`\n- `packages/daemon/src/client/daemon-client.ts:20`\n",
  "commits": [
    {
      "sha": "5fb83c449d05b9f567e42c5248bf60d06d3c11bd",
      "subject": "Specify daemon lifetime clock ownership",
      "body": ""
    },
    {
      "sha": "61fa2d70f8beff2a3fb8724e42eada8382cb7bd0",
      "subject": "Give daemon lifetime its wall clock",
      "body": ""
    },
    {
      "sha": "aec3f7c02a591e710c80814d99ef2b50051c970d",
      "subject": "Specify registry startup ownership authority",
      "body": ""
    },
    {
      "sha": "c3796a65090baa7fc1a67491c4045a48a8040c8b",
      "subject": "Centralize registry startup ownership checks",
      "body": ""
    },
    {
      "sha": "7e860218e55963852a0d5afe497ccde702e5f4a5",
      "subject": "Rename workspace daemon as process coordinator",
      "body": ""
    },
    {
      "sha": "3d25c347f1778ecccf8ca9314e224bac71f9fa1c",
      "subject": "Specify process request authentication order",
      "body": ""
    },
    {
      "sha": "7fd93d33c1f74da7541a37f14d5673a5d1d74518",
      "subject": "Specify validated process coordinate adoption",
      "body": ""
    },
    {
      "sha": "0a3d57c6f6b2c8d807cd8d34c0163a8b7c915d72",
      "subject": "Adopt validated process coordinates",
      "body": ""
    },
    {
      "sha": "bdaff55dc8f541e90a86da64512bd7941a59ade3",
      "subject": "Specify daemon clock source ownership",
      "body": ""
    },
    {
      "sha": "f6f942ef7a57a6c1632752aef3e685f66a496de1",
      "subject": "Route daemon timing through its clock",
      "body": ""
    },
    {
      "sha": "516cb9b91c44ab97117b31dde9777099d8d95cab",
      "subject": "Characterize process callback composition",
      "body": ""
    },
    {
      "sha": "25ddbe22d120013e627a66772601e8cbd9b8d6dc",
      "subject": "Specify canonical startup ownership authority",
      "body": ""
    },
    {
      "sha": "b46872384d0981f0df87d8885fc4e40c152a2c1c",
      "subject": "Centralize all startup ownership decisions",
      "body": ""
    },
    {
      "sha": "4a0b280649a62c26f0f712166709e086dda74b74",
      "subject": "Specify narrow startup ownership coordinates",
      "body": ""
    },
    {
      "sha": "f2bda0b61ff09ceaea12eb3a7d5f666d83d5ac48",
      "subject": "Stage daemon mechanism compatibility copies",
      "body": ""
    },
    {
      "sha": "8a21dd5b425727b91cf61ad3ad78ad6748e36a13",
      "subject": "Organize daemon mechanisms by ownership",
      "body": ""
    },
    {
      "sha": "36ef14651a616e10bb7f3097932d4ad088a81d09",
      "subject": "Add daemon package executable entries",
      "body": ""
    },
    {
      "sha": "b855f6be930d9b2ddcab766caba19c6d41e45e03",
      "subject": "Prove built daemon entry resolution",
      "body": ""
    },
    {
      "sha": "e0425f842d6c8051b91ef85b34444704fdefe693",
      "subject": "Retire flat daemon staging copies",
      "body": ""
    },
    {
      "sha": "ed3baa7f1003a25b177a105102a84afc9630a645",
      "subject": "Relocate daemon mechanism ownership tests",
      "body": ""
    },
    {
      "sha": "501c5b5e769966feb45170ce65c3b44a35820287",
      "subject": "Retire app-owned daemon mechanism tests",
      "body": ""
    },
    {
      "sha": "68fbaace0bd962ad451c803c29d04901dfc9c866",
      "subject": "Keep executor fixture package-independent",
      "body": ""
    },
    {
      "sha": "6629b30f879da58db646d14bd0d44768632fe7b2",
      "subject": "Conform daemon staging tests to lint rules",
      "body": ""
    },
    {
      "sha": "dad9676feea612dac85c33e7b890355f3cb98fd1",
      "subject": "Specify exhaustive daemon entry exports",
      "body": ""
    },
    {
      "sha": "e1dc8725f40e1e14f9959b5df8295dc003d21b7e",
      "subject": "Prove built daemon process entry execution",
      "body": ""
    },
    {
      "sha": "0f31a619e806dcadd81207de6643b92bd353e716",
      "subject": "Restore CLI executor version rejection oracle",
      "body": ""
    },
    {
      "sha": "70c7bea75c15581aa696adbddcb2a1ba8c2c598e",
      "subject": "Specify ordered daemon routing decisions",
      "body": ""
    },
    {
      "sha": "d8703664779d06200f2190ee65632fc9afdd1b73",
      "subject": "Own ordered daemon routing decisions",
      "body": ""
    },
    {
      "sha": "cd94bd488a39b14a29a4d9e0eb44b0c2164c5aef",
      "subject": "Define daemon client host contracts",
      "body": ""
    },
    {
      "sha": "2c7a42178376434fe2cccc676d924096ce5d2678",
      "subject": "Specify daemon client execution ownership",
      "body": ""
    },
    {
      "sha": "18e2f4ade3e424158bdf781f18ddf183a4fec7f8",
      "subject": "Route execution through DaemonClient",
      "body": ""
    },
    {
      "sha": "ea52cfbb9b344f601ae9b3d14f2998018bed4ec1",
      "subject": "Specify daemon client lifecycle control",
      "body": ""
    },
    {
      "sha": "c41d2e20074e907801b5556793ec5cfa260d1674",
      "subject": "Own daemon lifecycle composition in DaemonClient",
      "body": ""
    },
    {
      "sha": "6762c7f819a80272e67c60b2b5b0b5c151e94bcd",
      "subject": "Specify host-owned daemon readiness probe",
      "body": ""
    },
    {
      "sha": "a29be148b5b6b6a6ec58831fcb1e7b98cc60b5ad",
      "subject": "Route host readiness probes through startup",
      "body": ""
    },
    {
      "sha": "f2a9d157c96cba64e65937909f63abbb5b4b63b6",
      "subject": "Compose warm result capture in DaemonClient",
      "body": ""
    },
    {
      "sha": "f6030ed6f1dc188e9a8a05088ead957d7932cb8f",
      "subject": "Expose the Node-free DaemonClient facade",
      "body": ""
    },
    {
      "sha": "bca036f0ad16ede54127ad25e9c31928af26dc76",
      "subject": "Lock the public DaemonClient boundary",
      "body": ""
    },
    {
      "sha": "32152f1da945995fbc152a406320d3f8af342eac",
      "subject": "Represent disabled daemon routing",
      "body": ""
    },
    {
      "sha": "4b414b37516fdeb314d067e0041b06ea1a17720f",
      "subject": "Complete daemon client routing characterization",
      "body": ""
    },
    {
      "sha": "3cb60059251dd336fde21f8e1796fb1fcd550816",
      "subject": "Specify missing warm output handling",
      "body": ""
    },
    {
      "sha": "73c0f1c8aaa1d2d4df9e22b2ceda0d4588fa6e5c",
      "subject": "Lock daemon control overload return types",
      "body": ""
    },
    {
      "sha": "80d4afe0c24c96f30c47ff16a57d9068f04d4213",
      "subject": "Specify portable daemon compatibility hashing",
      "body": ""
    },
    {
      "sha": "cef673008deef942b379543be48307ec2379d6b6",
      "subject": "Normalize daemon compatibility source line endings",
      "body": ""
    },
    {
      "sha": "20838f8dbf413e04767543eb2380d0d114da6c60",
      "subject": "Specify Windows process entry cleanup ownership",
      "body": ""
    }
  ],
  "method": "Git blob equality for same-path areas, including deleted-file checks; seven relocated files compared with static import declarations and whitespace excluded and re-export paths normalized (differences retained in the report); e2e changes checked after helper rename, whitespace and trailing-comma normalization; the freeze digest normalizes only CRLF to LF. These textual checks do not establish runtime parity. Symnav tests were read, not run."
};
