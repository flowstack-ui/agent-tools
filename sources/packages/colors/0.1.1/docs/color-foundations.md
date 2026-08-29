# Color Foundations

Status: **Batch 7.2 implemented; achromatic qualification extended in Batch 7.3**

## Inputs

Every operation accepts either a CSS color string, a direct Design Tokens
color value, or a wrapped Design Tokens token:

```ts
"oklch(70% 0.2 45)"

{
  colorSpace: "display-p3",
  components: [1, 0.5, 0],
  alpha: 1,
  hex: "#ff7600",
}

{
  $type: "color",
  $value: {
    colorSpace: "oklch",
    components: [0.7, 0.2, 45],
  },
}
```

Supported structured spaces are sRGB, linear sRGB, Display P3, A98 RGB,
ProPhoto RGB, Rec. 2020, XYZ D50 and D65, Lab, LCH, Oklab, and OKLCH. Common
CSS formats such as named colors, hex, RGB, HSL, and HWB normalize into one of
those spaces.

When an achromatic color is converted to LCH or OKLCH, its physically
meaningless missing hue is serialized canonically as `0`. This keeps black,
white, and gray outputs finite and deterministic without changing the color.

The Design Tokens `none` component is rejected because it requires a separate
interpolation context. Non-finite components, invalid alpha, invalid optional
hex fallback, unsupported spaces, and malformed CSS produce stable diagnostic
codes.

## Operations

### Parse and validate

`parseColor(input)` returns a plain `StructuredColor` or throws a
`FlowstackColorError`. `validateColor(input)` accepts unknown input and returns
the same structured color or serializable diagnostics without throwing for
expected input errors.

### Normalize

`normalizeColor(input)` returns `flowstack.color-record.v1` with:

- a cloned exact source representation;
- the parsed color in its supported source space;
- a bounded sRGB color and six- or eight-digit lowercase hex fallback;
- whether gamut mapping occurred, its method, and deltaEOK change; and
- deterministic package, engine, operation, version, and parameter provenance.

The optional Design Tokens `hex` field is retained as source metadata. It is
not treated as authoritative over the structured color components, so the
record may produce a different qualified sRGB fallback.

### Convert

`convertColor(input, targetSpace)` converts coordinates without gamut mapping.
Out-of-gamut components remain out of range so the caller cannot confuse
conversion with adaptation. The result includes source, target, converted
color, and provenance.

### Map gamut

`mapColorToGamut(input, targetGamut)` supports sRGB, Display P3, and Rec. 2020.
It leaves in-gamut values unchanged and otherwise uses CSS Color 4 OKLCH local
MINDE mapping with a deltaEOK just-noticeable threshold of `0.02`. The result
states whether mapping occurred and how far the mapped color moved.

Floating-point noise up to `1 × 10⁻¹²` at a gamut boundary is clamped before
public components are returned. Larger out-of-range values remain visible.

### Contrast

`calculateContrast(foreground, background)` maps both colors to sRGB and
returns the unrounded WCAG 2 relative-luminance ratio plus named 4.5:1 and 3:1
pass gates. `contrastRatio()` returns only that exact ratio.

Contrast currently requires two opaque colors. A translucent foreground or
background fails with `alpha-requires-backdrop`; Colors will not invent a
background and publish a misleading accessibility result.

### Difference

`calculateColorDifference(first, second, method)` supports deltaEOK by default
and CIEDE2000 when explicitly requested. `colorDifference()` returns only the
number. DeltaEOK reports the current `0.02` just-noticeable threshold;
CIEDE2000 does not claim one package-wide threshold.

Difference currently requires opaque colors because alpha is not a color-space
coordinate and its visual effect depends on a backdrop.

## Provenance and determinism

Every report uses `flowstack.color-provenance.v1`. It records:

- `@flowstack-ui/colors` and its version;
- Culori and its qualified version;
- the named operation and operation-contract version; and
- sorted serializable parameters.

No timestamp, environment path, random value, mutable class instance, or
private workspace data enters a record. The same input and dependency version
therefore produce byte-stable JSON.

## What this does not prove

These functions prove color math and declared pair relationships. They do not
prove that a color has the right semantic meaning, that a palette is visually
coherent, or that a complete Brick theme passes. Batch 7.3 candidate generation
is documented in [`palette-generation.md`](palette-generation.md). Batch 7.4
qualified the serialized Colors-to-Theme boundary and one complete generated
fixture; every future candidate still needs its own semantic and rendered
qualification.
