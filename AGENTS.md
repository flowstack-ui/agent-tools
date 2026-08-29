# Agent Tools Repository Guidance

This public repository delivers version-aware LLM routes, skills, and MCP
tools derived from exact public FLOWSTACK package archives.

Rules:

- Generation reads only checked-in `sources/`, public package configuration,
  and exact archives explicitly passed to the ingestion command.
- Never read sibling repositories, workspace docs, private notes, user paths,
  network content, or current-main package state during build.
- Package repositories remain authoritative. Preserve package name, version,
  schema, destination, and coverage identity on every derived route.
- Reject uncovered inputs, stale output, missing/extra routes, broken links,
  unresolved manifest destinations, version drift, private markers, and budget
  overflow.
- Keep output deterministic and timestamp-free.
- Ingest Atom, Brick, Colors, and Theme archives atomically. Never update one
  locked public package in isolation.
- Never ingest the private Blocks authoring package, registry metadata, source
  bundles, item guidance, or authenticated delivery responses.
- Keep `public/`, the skill resolver copies, and the MCP tool inventory
  generated and byte-consistent with their checked sources.
- Run `npm ci`, `npm ci --prefix packages/mcp`, and
  `npm run check:repository` before opening a pull request.
- Publish only through the protected tag workflow from a commit contained in
  `main`; never publish from a working tree.
- Archive installation tests must use an isolated temporary consumer and remove
  it afterward.
