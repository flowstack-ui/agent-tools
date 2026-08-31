# Frame agent guide

## Purpose

Own responsive logical size constraints for one local element without taking over layout, paint, spacing, or overflow.

## Use when

- A rail, copy region, media canvas, or scroll boundary needs an explicit inline or block size constraint.

## Choose something else when

- The need is shared page measure, child arrangement, paint, aspect ratio, or scrolling. Use Container, Stack/Grid, Surface, AspectRatio, or ScrollArea.

## Required composition

- Use Frame inside a layout Item, or let Stack.Item/Grid.Item compose asChild around Frame when one host must own both parent participation and internal constraints.
- For bounded long content, put ScrollArea inside a maxBlockSize Frame; Frame constrains and ScrollArea scrolls.

## Rules

- **MUST:** Use Frame only for inlineSize, minInlineSize, maxInlineSize, blockSize, minBlockSize, or maxBlockSize.
- **MUST:** Prefer logical size constraints and responsive values rather than physical width/height application classes.
- **MUST:** Keep flex/grid participation on Stack.Item or Grid.Item; Frame owns the constrained element's internal geometry.
- **MUST:** Use nested Frames when separate ancestors need separate constraints; each Frame keeps its base and responsive values locally scoped.
- **MUST:** Do not treat maxBlockSize as scrolling; compose ScrollArea when overflow must remain reachable.
- **MUST:** Load styles.css or core.css plus frame.css.

## Common mistakes

- **Avoid:** Turning Frame into a universal Box with paint, spacing, position, overflow, and typography props. **Instead:** Keep Frame to six logical constraints and compose the existing Brick owner for every other responsibility.

## Validation checklist

- Check responsive carry-forward, zoom/reflow, long content, RTL, vertical writing, and focus visibility.
- Confirm every constrained node has one clear job and that ScrollArea owns any required overflow.

## Related guidance

- `stack`
- `grid`
- `container`
- `section`
- `surface`
- `aspect-ratio`
- `scroll-area`
- `interface-composition`
