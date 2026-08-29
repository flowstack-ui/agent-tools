# Contributing to Agent Tools

Agent Tools is a derived public delivery layer. Package-owned Agent Knowledge
in Atom, Brick, Colors, and Theme remains authoritative; this repository does
not accept hand-authored replacements for that guidance.

## Setup

Use the Node version declared in `.nvmrc`, then install both independent
lockfiles:

```bash
nvm use
npm ci
npm ci --prefix packages/mcp
```

## Make a change

- Update an owning package first when the underlying guidance is wrong.
- Ingest all four exact public archives together when refreshing sources.
- Keep paid Blocks, private Blueprints, research records, credentials,
  machine paths, and customer or commercial data outside this repository.
- Keep generated routes, skill metadata, plugin metadata, and MCP capability
  inventory deterministic and aligned.
- Add a changelog entry for observable public behavior.

## Verify

```bash
git diff --check
npm run check:repository
git diff --exit-code
```

Pull requests should explain the public contract change and list the exact
verification performed. Releases are produced only by the protected tag
workflow after both packages and the hosted corpus pass their gates.

Security vulnerabilities must be reported privately according to
[SECURITY.md](SECURITY.md). By participating, you agree to follow the
[Code of Conduct](CODE_OF_CONDUCT.md).
