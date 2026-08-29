# Bleed agent guide

## Purpose

Extend authored content across a parent inset with responsive logical spacing.

## Use when

- Edge media or artwork must cross its immediate container padding.

## Choose something else when

- The problem is size, paint, ordinary arrangement, or unrelated positioning. Use Frame, Surface, Stack, Grid, or application layout.

## Required composition

- Place Bleed inside the owner of the inset it crosses and keep meaningful media or content semantics on the authored child.

## Rules

- **MUST:** Use public non-negative spacing values; Bleed owns the negative conversion.
- **SHOULD:** Prefer inline or block for an axis and directional props only for a genuine one-edge exception.
- **MUST:** Verify narrow widths, RTL, zoom, and horizontal overflow.

## Common mistakes

- **Avoid:** Using Bleed to fix an incorrect Container measure. **Instead:** Correct the owning layout first.

## Validation checklist

- Confirm the intended edges align with the parent's outer boundary.
- Confirm the page does not gain horizontal overflow.

## Related guidance

- `frame`
- `stack`
- `surface`
- `image`
