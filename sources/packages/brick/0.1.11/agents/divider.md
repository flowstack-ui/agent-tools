# Divider agent guide

## Purpose

Render a finished decorative or semantic content boundary with horizontal or vertical visual recipes.

## Use when

- Adjacent content groups need a visible boundary and Atom Divider semantics.

## Choose something else when

- Spacing alone expresses the relationship or the boundary is interactive. Use Stack gap or a dedicated splitter.

## Required composition

- Use Divider inside the layout owner shared by the adjacent complete groups and choose decorative=false only when the separation has meaning.

## Rules

- **MUST:** Choose semantic versus decorative behavior independently from color, thickness, and orientation.
- **MUST:** Place Divider between complete semantic or interactive groups under one consistent layout owner; do not split a trigger from the content it controls.
- **MUST:** Load styles.css or core.css plus divider.css.

## Common mistakes

- **Avoid:** Using a bordered div or text glyph for every separator, or placing a Divider inside only part of a repeated group's anatomy. **Instead:** Use Divider when there is a boundary, Stack gap when there is only spacing, and keep repeated boundaries after complete groups under the same owner.

## Validation checklist

- Check orientation, adjacent-group ownership, contrast, forced colors, zoom, and semantics.
- Confirm it is not focusable and CSS is loaded.

## Related guidance

- `stack`
- `toolbar`
- `surface`
- `nav-list`
