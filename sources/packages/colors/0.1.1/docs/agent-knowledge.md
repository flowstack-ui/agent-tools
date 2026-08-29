# Colors Agent Knowledge

Colors publishes deterministic, versioned guidance for agents that need to
choose and use its color operations. The guidance describes operations, not UI
components: Colors has no component, DOM, Theme, or application ownership.

## Discovery

Start with these package exports:

- `@flowstack-ui/colors/agents/manifest.json` lists the package guide, all six
  operation owners, and the coverage report.
- `@flowstack-ui/colors/agents/coverage.json` proves that all 76 named public
  API surfaces are classified and all six operation owners are routed.
- `@flowstack-ui/colors/agents/colors-system.json` is the structured selection,
  boundary, and validation guide.
- `@flowstack-ui/colors/agents/colors-system.md` is deterministic Markdown
  generated from that same JSON guide.

The two direct `colors-system` subpaths remain stable compatibility routes.
Wildcard `agents/*.json` and `agents/*.md` exports let consumers follow future
manifest entries without adding a package export for every artifact.

## Operation owners

The manifest routes these six public operation families:

1. `color-inspection` parses, validates, and normalizes color input.
2. `color-conversion` converts color spaces and maps output gamut explicitly.
3. `color-measurement` calculates contrast and perceptual color difference.
4. `named-palette-reference` reads the shipped raw reference palettes.
5. `palette-candidate` generates and reviews deterministic palette candidates.
6. `color-provenance` records serializable engine and operation provenance.

The package catalog at `agents/catalog.json` is the source classification used
to build the published reports. It must exactly match `src/index.ts`: stale,
missing, duplicate, or extra classifications fail the repository gate.

## Boundaries

Agent guidance must preserve the same public boundary as the runtime:

- Colors produces deterministic color records, measurements, references, and
  candidate data. It does not assign semantic Theme roles.
- A generated candidate is not an approved palette. Human review remains
  explicit, and Theme mapping and application/brand approval happen later.
- Native CSS color handling is appropriate when no parsing, normalization,
  conversion, measurement, provenance, or candidate artifact is required.
- Component selection, rendering, focus, interaction, and accessibility remain
  outside this package.

## Verification

Run `npm run agents:check` after editing source guidance or routing. Run
`npm run agents:build` to regenerate Markdown and `dist/agents`, then run the
complete `npm run check:repository` gate. The release gate packs the package,
installs that exact archive in a clean consumer, resolves every manifest
artifact, compares the installed 76-surface report with the installed type and
runtime exports, and exercises all six operation families.
