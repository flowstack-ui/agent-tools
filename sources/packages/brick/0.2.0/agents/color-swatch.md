# Color Swatch agent guide

## Purpose

Preview one color or a compact mix of colors with a finished alpha-aware visual treatment and closed shape recipes.

## Use when

- A selected, available, saved, or documented color needs a compact visual preview.

## Choose something else when

- The user must choose or edit a color. Use Color Picker.

## Required composition

- Render Root for one color and Mix for two or more colors.
- Choose sharp, rounded, or circle through shape rather than application border-radius CSS.
- Place the passive swatch inside its owning control when it represents a selectable option.

## Rules

- **MUST:** Do not use the swatch as the only carrier of a color name, selection state, validation state, or action.
- **MUST:** Leave decorative swatches unlabeled, or provide label when the swatch itself must be exposed as an image.
- **SHOULD:** Use the closed shape prop for sharp, rounded, or circle geometry before overriding the public radius variable.
- **MUST:** Load styles.css or core.css plus color-swatch.css.

## Common mistakes

- **Avoid:** Adding click handlers directly to ColorSwatch. **Instead:** Place the passive swatch inside Button, Color Picker SwatchTrigger, or another semantic control.
- **Avoid:** Using custom border-radius CSS for a standard square or circle. **Instead:** Use shape=sharp, rounded, or circle.

## Validation checklist

- Check solid, alpha, mixed, size, all three shapes, light/dark, forced colors, zoom, RTL, and decorative versus labeled semantics.

## Related guidance

- `color-picker`
- `badge`
- `button`
