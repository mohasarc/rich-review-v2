# Artifact verification

This checks the review artifact and its declaration observations. It is not a correctness assessment of symnav or PR 131.

- TypeScript 6.0.3, strict mode: 21 conditional-type observations, zero diagnostics. See `compiler-observations.json` and the exact, body-free input `contract-observations.ts`.
- Extraction audit: 2,790 declaration records across base and head, including 20 separately preserved overload signatures. No executable function bodies or initializers appear in the records.
- 128 local source views; 3,046 evidence links and fragment targets checked; no failures. See `artifact-audit.json`.
- All four context files have unchanged extracted declarations. The shared policy has seven sections and 39 readonly numeric fields.
- Browser inspection: desktop 1440 × 1080, mobile 390 × 844; all six scenario controls, evidence filters, source navigation/return, empty states and overflow checked. See `browser-checks.json`.
- JavaScript syntax checks passed for the page script and generation scripts.

The browser tool disallows file URLs, so browser verification used a temporary loopback server. Opening the artifact requires only `index.html` and its sibling assets. The server is not part of the deliverable.

No symnav test suite was run; no implementation or assertion body was used as evidence. The workspace-record observations deliberately hold referenced dependency types fixed using shared opaque declarations. They are not a cross-version compatibility test of dependency class instances. None of the conditional-type observations performs fresh-object-literal excess-property checking.
