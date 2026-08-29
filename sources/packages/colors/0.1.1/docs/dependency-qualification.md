# Color-Science Dependency Qualification

Status: **Culori adopted for implementation**

Date: August 12, 2026

## Decision

Use Culori as the focused color-science implementation dependency. Batch 7.2
now imports it from shipped color-foundation source, so it is a runtime package
dependency while its separate declarations remain development-only.

Color.js remains a high-quality reference implementation and comparison tool,
not a package dependency.

The package must not restore the archived handwritten sRGB, OKLab, OKLCH, and
gamut implementation. FLOWSTACK owns its contracts and tests; the qualified
library owns the underlying conversion machinery.

## Candidates

| Candidate | Version | License | Transitive runtime dependencies | Installed size in the proof |
| --- | ---: | --- | ---: | ---: |
| Culori | 4.0.2 | MIT | 0 | 1,584 KiB |
| Color.js | 0.7.1 | MIT | 0 | 16,628 KiB |

Culori does not bundle TypeScript declarations. `@types/culori` 4.0.1, also
MIT with no dependencies, adds 796 KiB during development. Colors exposes its
own public types and does not leak Culori types through its API. Its type
declarations require the otherwise optional `mode` argument to `toGamut`, so
the adapter supplies that argument explicitly and retains a compilation gate
for declaration drift.

## Method

The temporary comparison used Node.js 22.23.1 and npm 10.9.8. It evaluated:

- common CSS inputs: hex, modern RGB with alpha, HSL, OKLCH, Display P3, and
  `transparent`;
- an 11 × 11 × 11 sRGB grid round-tripped through OKLCH;
- difficult high-chroma OKLCH colors and Display P3 primaries/mixtures;
- a 3,672-color OKLCH sweep with lightness `0.10–0.95`, chroma `0.05–0.45`,
  and hue every 15 degrees;
- exact WCAG 2 relative-luminance contrast vectors used by Theme; and
- 10,000 deterministic OKLCH-to-sRGB gamut mappings as a directional timing
  check.

Color.js's `css` method served as the independent JavaScript comparison for
gamut mapping. CSS Color 4 identifies Color.js as an experimental
implementation of binary-search local-MINDE mapping and specifies deltaEOK
`0.02` as one just-noticeable difference in OKLCH.

## Results

- Both candidates parsed every required input format.
- Culori's maximum sRGB → OKLCH → sRGB channel error was
  `4.16 × 10⁻¹⁴`; Color.js measured `3.62 × 10⁻¹⁴`.
- The focused difficult-color corpus produced 10 identical 8-bit hex results
  out of 11. Its maximum difference was deltaEOK `0.0000913`.
- Culori may return destination channels a few floating-point units outside
  `[0, 1]` (for example `-2.8 × 10⁻¹⁴`) at an exact gamut boundary. Colors must
  normalize this numerical epsilon before exposing exact sRGB components; its
  qualified hex serializer already produces the expected bounded value.
- Across the 3,672-color sweep, 3,586 outputs (97.7%) serialized to the same
  8-bit hex. The maximum deltaEOK was `0.000284`, about 70 times smaller than
  the `0.02` just-noticeable threshold. The maximum individual sRGB channel
  difference was `0.00270`; the two cases with the largest numeric differences
  still serialized to the same hex.
- Culori exactly reproduced the tested WCAG values used by Theme, including
  `21:1` for black/white, `4.478089453577214:1` for `#777777`/white, and
  `3.9984767707539985:1` for red/white. Color.js showed small implementation
  differences on saturated red and orange.
- In the non-authoritative 10,000-map timing run, Culori completed in about
  110 ms and Color.js in about 246 ms on the same machine and process model.
  Performance was not the deciding gate, but it did not expose a Culori cost.

## Why Culori

Culori meets the required parsing, conversion, round-trip, gamut, contrast,
determinism, and licensing boundary with materially less package weight. Its
plain-object functional API also fits a serializable build-time library better
than exposing mutable color class instances.

The small gamut differences are far below the current just-noticeable
threshold and are covered by permanent difficult-hue fixtures. Color.js would
be the fallback if later evidence exposes a Culori defect or if FLOWSTACK needs
an algorithm Culori cannot qualify.

## Permanent gates

The repository retains tests for:

- required parser formats;
- sRGB/OKLCH round-trip precision;
- difficult hue and Display P3 gamut mapping;
- deterministic repeated results;
- exact WCAG contrast values; and
- TypeScript declaration compatibility.

Requalify this decision before accepting:

- a Culori major version;
- a material CSS Color 4 gamut-algorithm change;
- a new output gamut or HDR color space;
- a change in the Theme contrast authority; or
- any fixture drift not explained by an explicitly adopted algorithm change.

## Sources

- [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Culori API](https://culorijs.org/api/)
- [Color.js gamut mapping](https://colorjs.io/docs/gamut-mapping)
