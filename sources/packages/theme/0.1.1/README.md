# @flowstack-ui/theme

Serializable theme authoring and validation for Flowstack UI.

The package is intentionally framework-neutral. It does not require React,
inject styles in the browser, load fonts, persist preferences, or replace
Brick's accessible default.

## Current scope

The package provides:

- the `flowstack.theme.v1` definition boundary;
- typed `defineTheme` authoring;
- deterministic structural and JSON-compatibility validation;
- exact alias, default, appearance, atomic-family, foundation, component-input,
  and extension resolution against a Brick theme contract;
- build-time WCAG 2 contrast validation for Brick-declared semantic color
  pairs in every supported appearance, including conditions activated by a
  closed component-theme choice;
- appearance-aware project roles and separately reported project contrast
  relationships for optional product and package meanings outside Brick;
- byte-stable CSS, DTCG token, manifest, and report artifacts;
- JSON validation, Colors-candidate scaffolding, and compilation CLI commands;
- package and exact-archive consumer verification; and
- a zero-runtime-dependency, exact-archive consumer boundary; and
- complete public Agent Knowledge coverage for seven Theme operation owners,
  with manifest, coverage, archive, and installed-consumer verification.

Colors generation itself, presets, React providers, runtime scope helpers,
font loading, and application preference persistence are outside this release.
Theme can consume a reviewed serialized Colors candidate without importing or
depending on the Colors package.

## Installation

```bash
npm install @flowstack-ui/brick
npm install --save-dev @flowstack-ui/theme
```

Theme 0.1 requires Brick's generated theme contract revision 2 or newer. Keep
Theme in build tooling and ship its generated CSS rather than the compiler.

## Authoring

Create `flowstack.theme.ts`:

```ts
import {
  THEME_DEFINITION_SCHEMA,
  assertThemeDefinition,
  defineTheme,
} from "@flowstack-ui/theme";

export const theme = defineTheme({
  $schema: THEME_DEFINITION_SCHEMA,
  metadata: {
    id: "acme",
    name: "Acme",
  },
  compatibility: {
    brick: "^0.1.0",
  },
  appearances: {
    supported: ["light", "dark"],
    default: "system",
  },
  palettes: {
    brand: {
      primary: "#3157d5",
      secondary: "#13a8b5",
      warmth: "#e97824",
    },
  },
  roles: {
    brandPrimary: "{palettes.brand.primary}",
    brandSecondary: "{palettes.brand.secondary}",
  },
  requirements: {
    fonts: [{ family: "Acme Sans", source: "application" }],
  },
});

assertThemeDefinition(theme);
```

The structural validator verifies the definition envelope and serializability.
The compiler then resolves exact aliases such as
`{palettes.brand.primary}`. Palettes, roles, and namespaced extensions remain
project vocabulary and emit `--flowstack-theme-*` variables.

Use `appearanceRoles` for optional project or package meanings whose values
change with light and dark appearance. A matching `relationships.contrast`
entry can require and report an opaque foreground/background pair without
creating a new Brick semantic. See [authoring](docs/authoring.md) for the full
shape.

Theme 0.1 compilation requires Brick theme contract revision 2 or newer. That
revision supplies the semantic contrast declarations used by the safety gate;
revision 3 may additionally publish closed categorical component inputs and
conditional pairs.

Brick mappings use semantic paths from its generated contract:

```json
{
  "brick": {
    "light": {
      "color": {
        "focus-ring": "{roles.brandPrimary}"
      }
    }
  }
}
```

An override to any member of an atomic Brick color family must include that
family's complete map for that appearance. Omitting the entire family inherits
Brick's complete defaults. `foundations` accepts only contract-declared derived
semantic paths, while `components` accepts only Brick's audited component
theme inputs.

For example, a revision 3 Brick contract may allow a theme to choose:

```json
{
  "components": {
    "link": { "decoration": "interaction" }
  }
}
```

The authoring values describe intent: `"always"` keeps resting decoration and
`"interaction"` reveals it on hover, focus, and active interaction. The
compiler maps those closed values to Brick's CSS output. When resting Link
decoration is removed, it also requires the declared `3:1` distinction between
accent link text and adjacent primary text in every supported appearance.
Individual Links may still select an explicit Brick variant.

Brick's contract also declares the foreground/background relationships it
promises to maintain. The compiler checks every declared pair in every emitted
appearance using the WCAG 2 relative-luminance algorithm: normal text requires
at least 4.5:1 and non-text UI indicators or text-distinction cues require at
least 3:1. Conditional pairs run only when their audited theme input is active.
The raw ratio is compared without rounding. `theme.report.json` records that
result at 12 significant digits so artifacts remain byte-stable across
supported JavaScript runtimes without weakening the pass/fail decision.

Colors used by those declared pairs must resolve to opaque sRGB hex or `rgb()`
syntax so the build can prove the result. Other valid CSS color syntax remains
available for project tokens that do not participate in a declared pair.
Gradients, transparency, images, application overrides, and the final rendered
composition remain browser-level accessibility responsibilities.

## JSON CLI

Validate a JSON representation of the same schema:

```bash
flowstack-theme validate ./flowstack.theme.json
```

Compile against the contract shipped by an installed Brick package:

```bash
flowstack-theme compile ./flowstack.theme.json \
  --contract ./node_modules/@flowstack-ui/brick/dist/theme-contract.json \
  --out-dir ./dist/theme
```

This writes `theme.css`, `theme.tokens.json`, `theme.manifest.json`, and
`theme.report.json`. Import `theme.css`, then activate the theme with
`data-flowstack-theme="acme"`; Brick's appearance attribute continues to own
light and dark selection. The CLI intentionally reads JSON and never executes
TypeScript configuration files.

The same build flow is available through `compileTheme`, `compileThemeFiles`,
and `writeThemeArtifacts`.

## Colors candidate scaffold

After generating and reviewing a `flowstack.colors-candidate.v1` document, use
a small mapping file to select project palette names and semantic jobs. Theme
imports every selected value, expands complete Brick atomic families from the
installed contract, and emits an ordinary editable `flowstack.theme.v1` file:

```bash
flowstack-theme scaffold-colors ./colors.candidate.json \
  --mapping ./colors.theme-scaffold.json \
  --contract ./node_modules/@flowstack-ui/brick/dist/theme-contract.json \
  --out-dir ./theme
```

The output is `flowstack.theme.json` plus `theme.scaffold.report.json`. Review
or edit the Theme JSON, then compile it normally. See
[Colors interchange](docs/colors-interchange.md) for the mapping contract.

## Development

Use Node 22 and npm:

```bash
npm ci
npm run check:focused -- validation
npm run check:repository
npm run check:release
```

See [architecture](docs/architecture.md) and [testing](docs/testing.md).
Public guides cover [installation](docs/installation.md),
[authoring](docs/authoring.md), [fonts](docs/fonts.md),
[appearances and portals](docs/appearances-and-portals.md),
[Colors interchange](docs/colors-interchange.md),
[migration](docs/migration.md), [troubleshooting](docs/troubleshooting.md),
and [Agent Knowledge](docs/agent-knowledge.md).

## License

MIT
