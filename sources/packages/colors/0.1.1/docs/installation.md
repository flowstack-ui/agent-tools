# Installation

Colors is build-time tooling for generating and reviewing palette candidates.
Install it as a development dependency:

```bash
npm install --save-dev @flowstack-ui/colors
```

Version 0.1 requires Node.js 22 or newer and ships ESM JavaScript plus strict
TypeScript declarations.

```ts
import {
  COLOR_GENERATION_REQUEST_SCHEMA,
  generatePaletteCandidate,
  reviewPaletteCandidate,
} from "@flowstack-ui/colors";

const candidate = generatePaletteCandidate({
  $schema: COLOR_GENERATION_REQUEST_SCHEMA,
  seeds: [{ id: "brand", color: "#3157d5", profile: "interface" }],
});

const reviewed = reviewPaletteCandidate(candidate, {
  status: "accepted",
  notes: "Approved for Theme mapping.",
});
```

Write the reviewed object as JSON when passing it to Theme. The candidate file
is the integration boundary; neither package depends on the other.

## Runtime boundary

Colors does not import React, access the DOM, inject CSS, load fonts, or depend
on Brick or Theme. Its only runtime dependency is the exactly qualified color
engine used by its functions.

Applications should generate candidates during development or a build step and
ship Theme's compiled CSS. Do not import Colors from application client code
unless the application deliberately intends to bundle a color editor or other
future runtime tool. Installing Colors does not itself add code to a browser
bundle.
