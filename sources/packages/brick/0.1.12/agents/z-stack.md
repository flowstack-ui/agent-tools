# ZStack agent guide

## Purpose

Overlap authored children in one depth-aware layout while preserving source, reading, and focus order.

## Use when

- Two or more visual layers intentionally share the same region.

## Choose something else when

- Content follows one row or column. Use Stack.
- Content is an ordinary image-backed card or hero. Use Surface.Media, Surface.Scrim, and Surface.Content.

## Required composition

- Place natural-size layers directly in ZStack.Root and use ZStack.Item only when one layer needs its own nine-position alignment.
- For a corner action over media, use ZStack.Root isolation="open" and ZStack.Item layer="action" with edgeSpacing instead of recreating stacking, z-index, and inset margins in local CSS.

## Rules

- **MUST:** Keep DOM order meaningful because later children paint above earlier children.
- **MUST:** Keep media before its overlay in source; ZStack preserves that order even when the media establishes a positioned layer.
- **MUST:** Keep decorative layers from intercepting input intended for interactive content.
- **MUST:** Use responsive logical alignment only to move the same authored layer; never change source order, depth order, or focus order at a breakpoint.
- **MUST:** Use the closed content and action layers only for authored overlay participation; do not invent arbitrary z-index values or use layer to reorder meaning.
- **MUST:** Use edgeSpacing for a positioned layer that needs theme-space inset from its aligned edges; it supports the same responsive spacing vocabulary as Stack.
- **MUST:** Load styles.css or core.css plus z-stack.css.

## Common mistakes

- **Avoid:** Replacing ordinary linear layout with overlap. **Instead:** Use Stack or Grid unless layers intentionally share space.
- **Avoid:** Rebuilding Surface media anatomy. **Instead:** Prefer Surface for standard media-backed content.
- **Avoid:** Adding inline isolation, z-index, or margin styles to make an overlay action clickable and inset. **Instead:** Use isolation="open", layer="action", and edgeSpacing on ZStack's public composition API.

## Validation checklist

- Check natural sizing, responsive logical placement, focus order, zoom, RTL, and pointer access.

## Related guidance

- `stack`
- `grid`
- `surface`
- `image`
