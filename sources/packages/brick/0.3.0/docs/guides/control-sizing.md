# Control sizing

Brick uses one shared size vocabulary for controls that commonly appear in the
same row. A matching `size` should produce a shared outer rhythm rather than a
collection of unrelated component scales.

## Shared contract

| Size | Minimum block size | Control text | Typical use |
| --- | ---: | ---: | --- |
| `2xs` | 24px | Compact 12px recipes | Deliberately dense desktop controls |
| `xs` | 32px | Compact recipes | Compact tool strips |
| `sm` | 36px | Control recipes | Compact application controls |
| `md` | 40px | Control recipes | Medium controls |
| `lg` | 44px | Control recipes | General-purpose and touch-oriented controls |
| `xl` | 48px | Large recipes | Prominent controls |
| `2xl` | 64px | Large recipes | Oversized actions |

Button, IconButton, Select, MultiSelect, Toggle, ToggleGroup, and comparable
button-like controls consume these shared geometry and control-typography
recipes. Their internal padding may differ when required by their anatomy, but
their outer height, icon scale, radius family, and baseline must align when the
same size is used.

The vocabulary is not a promise that every component exposes every size.
Tabs and segmented controls have their own anatomy. Decorative Icon, Chip and
ColorSwatch sizes are independent and must not be renamed or resized to match
control heights.

## Editable-control exception

Use the normal `lg` form-control default for 16px editable text. Compact sizes
are deliberate dense-UI choices, not mobile-safe typography guarantees. Textarea
and native multiple selects remain multiline. Chips, wrapping content and nested
action targets may make a minimum-height control taller; do not clip content or
shrink independent action targets to force 24px. Theme typography may also grow
a control. Prefer larger sizes for touch-oriented interfaces.

## Composition

Use the same named size on controls that share a row. Let Stack own row gap and
alignment, and let Theme own `--brick-radius-control`, control typography, and
control height tokens. Do not repair a mismatched row with per-component
heights, transforms, margins, or literal radii.

When a control is intentionally more prominent, change its supported size and
document that hierarchy. Do not silently customize one component so that the
same size means something different.

## Verification

- Compare Button, Select, Toggle, ToggleGroup, and other button-like peers in
  one row across the supported size scale, especially `2xs`.
- Confirm matching minimum block size, vertical center, radius family, icon
  scale, and control typography.
- Confirm default editable controls retain 16px text and compact controls do not
  clip text, borders, icons or nested actions.
- Change the active Theme radius and typography inputs and confirm every peer
  updates together.
- Check long labels, zoom, narrow widths, RTL, focus rings, and light/dark
  appearance without introducing one-off CSS.
