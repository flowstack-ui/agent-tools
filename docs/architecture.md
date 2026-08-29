# Agent Tools Delivery Architecture

Agent Tools is a derived public delivery layer. It does not own package
guidance. Atom, Brick, Colors, and Theme remain authoritative for their own
Agent Knowledge.

## Inputs

`sources/lock.json` identifies exactly four public npm archives by package name,
version, byte size, and SHA-256. Each filtered snapshot file also has an exact
byte size and digest. Ingestion accepts Atom, Brick, Colors, and Theme together, rejects
links and non-regular archive entries, validates the published manifest and
zero-failure coverage identity, and copies only public package metadata,
`dist/agents`, README/changelog/license, and public docs. A fully validated
sibling staging tree replaces the current source set through rename with
rollback; the current set is never deleted before the replacement is ready.
Builds never inspect another repository.

## Outputs

`public/index.json` uses `flowstack.agent-delivery-index.v1`. It records source
provenance, profile, coverage totals, owner counts, budgets, corpus decisions,
and every generated route with size and digest.

`public/llms.txt` is a small package/task index. Package slices are versioned at
`/packages/<package>/<version>/index.txt`. Narrow routes live below `guides`,
`components`, `operations`, and `docs`. Task slices link to those
exact routes instead of duplicating their rules. Finished-interface task
sections load Brick layer-selection and interface-composition first. A separate
explicit-headless section loads Atom layer-selection and behavior-composition;
route membership is exact and curated rather than inferred from substrings.

The package does not generate `public/llms-full.txt`. The former complete
concatenation repeated indexes, prose, and machine records without proving that
the artifact improved retrieval. A future curated full corpus must stay at or
below 100,000 tokens under a pinned tokenizer, contain at most 5% duplicate
normalized paragraphs, achieve at least 90% top-five route recall, preserve
100% ownership correctness on the boundary regression set, and perform no
worse than narrow-route retrieval on the checked answer benchmark. It remains
absent unless all gates are implemented and pass.

## Determinism and validation

Generated files contain no timestamps. The verifier rejects a changed lock or
snapshot digest, mismatched package version, uncovered input, missing or extra
route, stale byte, broken generated link, unresolved manifest destination,
private or machine path, or exceeded entrypoint/task/package budget. Package
verification packs the public package, installs that exact archive in an
isolated temporary consumer, and traverses every indexed route by byte count
and SHA-256.

## Delivery surfaces

The canonical static host is `https://agents.brick-ui.com`. It serves the same
checked `public/` bytes as the npm package with public CORS, bounded CDN caching,
and restrictive browser security headers. The small `/llms.txt` entry point
links to exact-version routes; a monolithic `llms-full.txt` remains deliberately
absent until its retrieval-quality gates pass.

`@flowstack-ui/mcp` provides the local stdio transport. Consumer projects pin
an exact package version and let the server resolve exact public FLOWSTACK
dependencies from that project. The hosted `/mcp` endpoint uses the same tool
definitions and server core but a locked-only repository policy; it cannot
inspect runtime-installed dependencies or substitute a private source.

Four canonical skill directories can be installed independently from GitHub
or loaded together through the opt-in skills-only FLOWSTACK plugin. MCP remains
separately configured so installing a skill never silently starts a process or
changes a project.

## Public boundary

Only exact public archives for Atom, Brick, Colors, and Theme may enter the
source lock. Paid Blocks source or metadata, private Blueprints, research
memory, commercial records, authentication responses, customer application
source, secrets, and machine-specific paths are rejected from generated,
packed, hosted, skill, plugin, and MCP outputs.
