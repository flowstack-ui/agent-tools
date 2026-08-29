# Color Swatch agent guide

## Purpose

Preview one color or a compact mix of colors with a finished alpha-aware visual treatment.

## Use when

- A selected, available, saved, or documented color needs a compact visual preview.

## Choose something else when

- The user must choose or edit a color. Use Color Picker.

## Required composition

- Render Root for one color and Mix for two or more colors; place the swatch inside the owning control when it represents a selectable option.

## Rules

- **MUST:** Do not use the swatch as the only carrier of a color name, selection state, validation state, or action.
- **MUST:** Leave decorative swatches unlabeled, or provide label when the swatch itself must be exposed as an image.
- **MUST:** Load styles.css or core.css plus color-swatch.css.

## Common mistakes

- **Avoid:** Adding click handlers directly to ColorSwatch. **Instead:** Place the passive swatch inside Button, Color Picker preset behavior, or another semantic control.

## Validation checklist

- Check solid, alpha, mixed, size, light/dark, forced-color, zoom, RTL, and decorative versus labeled semantics.

## Related guidance

- `badge`
- `input`
