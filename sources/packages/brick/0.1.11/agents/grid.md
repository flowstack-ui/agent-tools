# Grid agent guide

## Purpose

Arrange content on tokenized two-dimensional tracks with public column, row, gap, and item-placement controls.

## Use when

- Content needs coordinated rows and columns or responsive card tracks.

## Choose something else when

- The layout has one primary row or column. Use Stack.

## Required composition

- Choose Grid tracks from the minimum readable child size; use Grid.Item placement only when source order remains meaningful.
- Use as="ul" or as="ol" when the peers form a semantic list; Grid removes native list geometry while preserving the list relationship.

## Rules

- **MUST:** Keep DOM order meaningful; visual placement must not create a confusing keyboard or reading sequence.
- **MUST:** Use non-negative numeric factors for ordinary uniform and axis gaps; reserve explicit CSS values for measured exceptions or application spacing tokens, including inside responsive objects.
- **MUST:** Use a semantic list host when the Grid children form a real set; do not add Block CSS to cancel native ul or ol margins, padding, or markers because Grid owns that host geometry.
- **MUST:** Use responsive columns, gaps, unanchored spans, and alignment when the same authored Grid changes at Brick breakpoints; keep explicit line starts and ends static.
- **MUST:** Use Grid.Item asChild when an existing link, Surface, or component should itself receive placement; provide exactly one element and preserve its native semantics.
- **MUST:** Load styles.css or core.css plus grid.css.

## Common mistakes

- **Avoid:** Keeping too many columns until cards become unreadably narrow. **Instead:** Reduce columns at the content's real minimum width, not at a device-name breakpoint.
- **Avoid:** Adding local CSS only because a gap is outside the legacy zero-through-six token scale. **Instead:** Use the supported numeric factor or explicit spacing value on gap, rowGap, or columnGap.
- **Avoid:** Combining a responsive Item span with explicit line placement. **Instead:** Let the responsive item auto-place, or keep one deliberate static line placement.
- **Avoid:** Adding a Grid.Item wrapper and height CSS around an element that should itself stretch as the grid item. **Instead:** Compose that one element with Grid.Item asChild.

## Validation checklist

- Test intrinsic sizing, overflow, zoom, narrow widths, source order, and RTL.
- Confirm numeric, explicit, axis-specific, and responsive gaps create the intended computed geometry.
- For ul and ol hosts, confirm zero native margin and padding, no visual marker, and preserved list semantics.
- Confirm each child remains readable before and after track changes.

## Related guidance

- `stack`
- `card`
- `surface`
