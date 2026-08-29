# Testing

Use Node 22 or newer and install both independent lockfiles:

```bash
npm ci
npm ci --prefix packages/mcp
```

During development, use the smallest relevant command:

```bash
npm run check:generated
npm test
npm run mcp:test
npm run pack:check
npm run mcp:pack:check
```

Before opening a pull request, run the complete repository gate:

```bash
git diff --check
npm run check:repository
git diff --exit-code
```

The complete gate checks deterministic generation, the public/privacy
boundary, archive ingestion, all four skill contracts, plugin metadata, MCP
protocol behavior, and both exact npm archives in isolated consumers. Hosted
verification is separate because it compares a deployed production surface
with the already-verified local corpus.

The canonical host is checked daily and on demand by the `Hosted drift`
workflow. It runs the same corpus byte/digest and MCP protocol verifier against
`https://agents.brick-ui.com`, cancels superseded runs, restores no package
manager cache, and fails within ten minutes.
