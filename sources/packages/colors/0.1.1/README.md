# @flowstack-ui/colors

Deterministic, framework-independent color and palette candidate tooling for
Flowstack UI.

Version 0.1 is the first qualified public boundary. The interchange has passed
a real Theme and complete Brick catalog qualification, but each new candidate
still needs its own review and qualification.

## Boundary

Colors parses and converts colors, maps output gamut, calculates contrast and
perceptual difference, and generates deterministic, explainable palette
candidates. Colors does not know React components or assign semantic meanings
such as `accent` or `warning`.

An approved workflow is:

```text
brand seeds and intent
  -> Colors candidate document
  -> human review
  -> Theme semantic mapping and exact validation
  -> static CSS consumed by Brick and applications
```

Existing named palettes and explicit 12-step light/dark output remain part of
the capability. Interface, neutral, and decorative profiles expose different
shapes appropriate to their purpose.

## Current API

```ts
import {
  COLOR_GENERATION_REQUEST_SCHEMA,
  calculateColorDifference,
  calculateContrast,
  convertColor,
  generatePaletteCandidate,
  getNamedPalette,
  mapColorToGamut,
  normalizeColor,
  reviewPaletteCandidate,
  validateColor,
} from "@flowstack-ui/colors";

const record = normalizeColor("color(display-p3 1 0.5 0)");
// record.color preserves Display P3
// record.srgb.hex === "#ff7d00"
// record.srgb records that gamut mapping occurred

const converted = convertColor("#3157d5", "oklch");
const mapped = mapColorToGamut("oklch(90% 0.4 100)", "srgb");
const contrast = calculateContrast("#111111", "#ffffff");
const difference = calculateColorDifference("#ff0000", "#ff1100");
const validation = validateColor({
  colorSpace: "oklch",
  components: [0.7, 0.2, 45],
});

const candidate = generatePaletteCandidate({
  $schema: COLOR_GENERATION_REQUEST_SCHEMA,
  seeds: [
    { id: "brand", color: "#3157d5", profile: "interface" },
    { id: "neutral", color: "#64748b", profile: "neutral" },
    {
      id: "campaign",
      color: "#ff00ff",
      profile: "decorative",
      options: { steps: 5, anchorStep: 3 },
    },
  ],
});

const reviewed = reviewPaletteCandidate(candidate, {
  status: "accepted",
  notes: "Approved for Theme mapping.",
});

const flowstackBlue = getNamedPalette("blue");
// A FLOWSTACK-generated 12-step raw reference, not a semantic theme.
```

CSS color strings and structured Design Tokens color values are accepted.
Every public result contains plain serializable data; Culori objects and types
do not cross the package boundary.

Contrast and color-difference claims currently require opaque colors. An alpha
color is valid for parsing, normalization, conversion, and gamut mapping, but
comparison fails with `alpha-requires-backdrop` until a future API accepts an
explicit backdrop.

An accepted generator result means only that its declared Colors relationships
pass. It is not a theme. A person records an explicit review decision, then
Theme may scaffold selected families from the serialized candidate, revalidate
the actual Brick pairs, and earn rendered qualification separately.

## Installation and compatibility

Install Colors as build tooling:

```bash
npm install --save-dev @flowstack-ui/colors
```

The package requires Node.js 22 or newer. Candidate documents remain explicit
project data; upgrading Colors does not automatically regenerate an accepted
Theme. See [installation](docs/installation.md) and
[compatibility](docs/compatibility.md) for the package, schema, algorithm, and
runtime boundaries.

## Development

Requires Node.js 22 or newer.

```bash
npm install
npm run check:repository
```

See [`docs/architecture.md`](docs/architecture.md) and
[`docs/testing.md`](docs/testing.md). The Batch 7.1 dependency decision and
measured evidence are in
[`docs/dependency-qualification.md`](docs/dependency-qualification.md).
The complete current API and diagnostic contract is in
[`docs/color-foundations.md`](docs/color-foundations.md).
Palette generation, preservation, rejection, and named references are in
[`docs/palette-generation.md`](docs/palette-generation.md).
Agent and tool discovery starts with
[`docs/agent-knowledge.md`](docs/agent-knowledge.md), including the manifest,
coverage report, and six operation-owner routes.
Release maintainers should also read [`docs/releasing.md`](docs/releasing.md).
