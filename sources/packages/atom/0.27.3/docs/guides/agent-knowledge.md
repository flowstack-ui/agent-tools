# Agent Knowledge

Atom ships public component and cross-component guidance for coding agents
alongside its runtime artifacts. Component guidance explains local selection,
required composition, accessibility rules, recurring mistakes, and
validation. Package guides first explain layer selection and behavior
composition. Neither artifact adds runtime behavior or a dependency.

Use `@flowstack-ui/atom/agents/manifest.json` to discover guidance. Its
separate `guides` and `components` collections point to machine-readable JSON
and human-readable Markdown. Read `layer-selection` and
`behavior-composition` before choosing individual primitives, for example:

```text
@flowstack-ui/atom/agents/field.json
@flowstack-ui/atom/agents/field.md
@flowstack-ui/atom/agents/layer-selection.json
@flowstack-ui/atom/agents/behavior-composition.md
```

The manifest links `@flowstack-ui/atom/agents/coverage.json`, a deterministic
`flowstack.agent-coverage.v1` report derived from the package exports, public
TypeScript symbols, documented primitive owners, and the checked-in catalog.
It distinguishes component owners from compound parts, root aliases,
utilities, metadata, and intentional native/application destinations. This
prevents utility subpaths from being mistaken for missing components and
prevents a new public surface from escaping classification.

The source pair lives beside the primitive it describes. `agent.json` is the
structured authority and `agent.md` is generated from it. Component source,
types, public documentation, and tests remain authoritative when a guide is
incomplete.

Package-level guide sources live under `agents/guides/`. They use
`flowstack.agent-guide.v1`; component sources continue to use
`flowstack.agent-component.v1`. Manifest `guides` is additive, so consumers
that already read only `components` remain compatible.

`npm run agents:build` and `npm run agents:check` are strict closure gates.
They require every public component owner to have a valid source pair and
manifest entry, and check mode compares every generated artifact while
rejecting stale or extra output. Builds, prepublication, packed-package checks,
and installed-consumer checks all require complete coverage with zero
failures.

When a finished application has selected `@flowstack-ui/brick`, consume Brick
instead of importing Atom directly. Atom's guides are behavior authority for
primitive authors and for diagnosing a genuine Brick-to-Atom gap.

Agent Knowledge is public usage guidance. It does not contain private prompts,
ranking policy, customer information, or application workflows.
