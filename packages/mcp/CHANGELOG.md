# Changelog

## 0.1.3

- Advertise and serve the bounded static skills extension used by OpenAI Scan
  Tools, including complete resource manifests and verified SHA-256 digests.
- Package the four canonical FLOWSTACK skills with the MCP archive.
- Publish structured output schemas for every read-only tool result envelope.

## 0.1.2

### Fixed

- Enable the official stateless legacy HTTP adapter alongside the modern
  protocol so current plugin clients can negotiate without sessions, cookies,
  cache state, or any change to locked-only tool behavior.

## 0.1.1

### Changed

- Release the unchanged hosted and stdio MCP contracts in lockstep with Agent
  Tools skills that now invoke the hosted exact-version fallback explicitly.

## 0.1.0

- Add one local stdio FLOWSTACK MCP server with eleven version-aware tools.
- Add exact installed-package and explicit locked-source resolution without
  latest substitution.
- Generate tool documentation, registry, and capability inventory from one
  source and verify packed clean-consumer execution.
