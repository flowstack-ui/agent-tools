# @flowstack-ui/agent-tools

Deterministic delivery for versioned FLOWSTACK Agent Knowledge. The public
package generates small LLM discovery, versioned package slices,
narrow owner routes, and task slices from exact locked public package archives.

The same checked corpus is available from
[`agents.brick-ui.com`](https://agents.brick-ui.com), the npm package, the
FLOWSTACK skills, and the read-only MCP server. Paid Blocks source, private
Blueprints, customer data, commercial records, and authentication responses
are outside this repository and every generated delivery surface.

## Source workflow

Prepare the four exact public package archives, then ingest them together:

```bash
npm run sources:ingest -- \
  --atom /path/to/atom.tgz \
  --brick /path/to/brick.tgz \
  --colors /path/to/colors.tgz \
  --theme /path/to/theme.tgz
```

Ingestion verifies archive identity, Agent Knowledge manifest and coverage
closure, regular-file/directory archive entries, safe public paths, and source
digests. It stages all four filtered snapshots beside the current lock and
swaps them with rollback only after the complete replacement validates.
Ordinary builds read only that lock and snapshot; they never inspect sibling
repositories.

```bash
npm ci
npm ci --prefix packages/mcp
npm run build
npm run check:repository
```

The root and MCP adapter are independently packable packages with separate
lockfiles. A clean checkout must install both lockfiles before running the
combined repository gate.

The generated `public/llms.txt` is the bounded entry point. `public/index.json`
records exact packages, versions, archive digests, output sizes, and every
narrow route. Task slices use explicit curated owners: Brick is the default for
finished interfaces and Atom is a separately labelled explicit headless branch.

`llms-full.txt` is intentionally not emitted. A byte-bounded concatenation did
not demonstrate useful retrieval or fit practical model contexts. Reintroducing
one requires a curated corpus plus checked gates: at most 100,000 tokens under
a pinned tokenizer, at most 5% duplicate normalized paragraphs, at least 90%
top-five route recall on the checked task benchmark, 100% ownership correctness
on the boundary regression set, and no lower answer accuracy than narrow-route
retrieval. Raising a byte budget is not qualification.

## Install

Use the LLM entry point directly:

```text
https://agents.brick-ui.com/llms.txt
```

Install one workflow skill from GitHub:

```bash
npx skills add https://github.com/flowstack-ui/agent-tools/tree/main/skills/flowstack-ui-builder
```

Or configure the exact local stdio MCP release in a project's
`.codex/config.toml`:

```toml
[mcp_servers.flowstack]
command = "npx"
args = ["--yes", "@flowstack-ui/mcp@0.1.3", "--project-root", "."]
cwd = "."
required = true
```

The hosted, read-only Streamable HTTP endpoint is
`https://agents.brick-ui.com/mcp`. Project configuration should prefer the
exact npm version so guidance resolves against the packages actually installed
in that project.

## MCP package

`packages/mcp/` is the independently packable `@flowstack-ui/mcp` local stdio
server. It consumes exact project-installed packages or this repository's
explicit source lock; it does not read sibling repositories or modify the LLM
corpus generator. The root `check:repository` gate includes its generated tool
inventory, official JSON-RPC client tests, and exact archive consumer smoke.

## Workflow skills

The package also ships four independently discoverable skills under `skills/`:

- `flowstack-ui-builder` implements against exact installed or locked guidance;
- `flowstack-ui-review` audits public ownership and implementation contracts;
- `flowstack-ui-compose` maps a supplied plan through finished Brick owners; and
- `flowstack-ui-maintainer` coordinates package authority, stacked integration,
  exact-version qualification, and release readiness.

Each skill resolves the project's exact package version before loading package-
owned Agent Knowledge. Locked or staged archive workflows may additionally pin
the archive SHA-256 so one mutable candidate version cannot select different
guidance. New owners use baseline and candidate resolution passes. An
unavailable identity is reported instead of being silently replaced with
current guidance. Reference captures and private research remain outside public
package and installed files. The canonical skill directories support
standalone GitHub installation and are also exposed as a digest-verified static
snapshot by the hosted MCP server for FLOWSTACK plugin submissions. Installing
a standalone skill remains opt-in and does not silently start or configure MCP.

## Release boundary

Both npm packages are released from the same protected `v<version>` tag. CI
must verify the checked generated corpus, both independent lockfiles, both
packed archives, the four skill contracts, plugin metadata, and clean isolated
consumers before trusted publishing. Published archives use npm provenance;
hosted verification then proves that production route bytes and digests match
the tagged source.

See [the architecture contract](docs/architecture.md),
[contribution guide](CONTRIBUTING.md), and [security policy](SECURITY.md).
