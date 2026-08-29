# Colors Architecture

Status: **Batch 7.4 candidate interchange qualified**

Colors owns framework-independent color science and deterministic palette
candidate generation. Theme owns semantic mapping, exact editable theme
definitions, Brick contract validation, and final static artifacts.

## Dependency direction

```text
Creative or human intent
  -> @flowstack-ui/colors candidate
  -> @flowstack-ui/theme definition
  -> @flowstack-ui/brick semantic contract
```

The arrows describe artifact flow, not runtime dependencies. Colors does not
import Theme or Brick. A deployed application does not require Colors merely
because its CSS originated from a candidate.

The qualified color engine is pinned exactly. Its version is part of every
provenance record, so a consumer install cannot silently change math while
claiming the same engine evidence.

## Candidate rules

- Inputs and outputs are serializable and deterministic.
- Multiple named seeds are first-class.
- A seed has an explicit interface, neutral, or decorative profile.
- Exact preservation is the default; adaptation requires an explicit bounded
  policy and complete diagnostics.
- Light and dark are generated and validated independently.
- Every accessibility claim names and measures the exact pair.
- Existing named palettes and requested 12-step scales remain available as
  raw/reference output without automatic Theme qualification.

`flowstack.colors-candidate.v1` is the finalized serialized interchange
boundary for the first release. Generation produces an `unreviewed` result;
`reviewPaletteCandidate()` records an explicit human `accepted`, `edited`, or
`rejected` decision without changing its measurements. An accepted family has
passed only its declared Colors measurements, carries no semantic Brick
mapping, and cannot be called a theme. See
[`palette-generation.md`](palette-generation.md).

Batch 7.4 proved the boundary without coupling the packages: Theme reads the
candidate JSON, imports selected families as project palettes, expands explicit
semantic assignments against the installed Brick contract, and produces an
ordinary editable Theme. One seven-family candidate passed all 152 compiled
Brick contrast evaluations and the complete 80-route, four-profile rendered
catalog. That evidence validates the interchange; it does not preapprove future
candidates.

## Color record

`flowstack.color-record.v1` is the stable Batch 7.2 evidence envelope. It
preserves the exact source, a structured supported-space color, an sRGB
fallback with explicit gamut diagnostics, and deterministic provenance.

Conversions do not silently map gamut. Gamut mapping is a separate named
operation. Contrast maps to exact sRGB and rejects alpha without a backdrop.
See [`color-foundations.md`](color-foundations.md) for the API contract.

## Reference palettes

Thirty-one standalone FLOWSTACK named families are available through
`getNamedPalette()`. They use FLOWSTACK seeds and the same deterministic
decorative generator exposed to consumers, with no external palette package.
Every result is marked `raw-reference`, preserving useful light/dark 12-step
output without claiming that its values satisfy Theme or Brick.
