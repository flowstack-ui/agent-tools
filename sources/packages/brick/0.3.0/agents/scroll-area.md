# ScrollArea agent guide

## Purpose

Style native or opt-in custom scrollbars while preserving Atom-owned native scrolling and controller behavior.

## Use when

- A rail, code region, table wrapper, or bounded panel needs Brick scrollbar presentation and owned overflow behavior.

## Choose something else when

- Ordinary page or content overflow works with native browser scrolling. Use native overflow.

## Required composition

- Constrain Root with Frame or parent layout. Native mode needs Viewport only. Custom mode requires Content inside Viewport and a Scrollbar per enabled axis; omitted Scrollbar children supply Thumb. Add Corner for both axes. RootProvider receives useScrollArea, and Context exposes subscribed state.

## Rules

- **MUST:** Provide a bounded size; ScrollArea cannot create meaningful scrolling without a constrained viewport.
- **MUST:** Identify the parent that owns the maximum or fixed block size before styling Viewport; do not apply a random height directly to the scrolling part.
- **MUST:** Preserve wheel, trackpad, touch, keyboard, focus, and nested page scrolling.
- **MUST:** Load styles.css or core.css plus scroll-area.css.
- **MUST:** Use scrollbar=custom for size or scrollShadow; keep native fallback until anatomy is ready and in forced colors. Keep one native scroll owner. Virtualization and bottom-following are application policies.

## Common mistakes

- **Avoid:** Using ScrollArea for every overflow or hiding clipped table content without horizontal scrolling. **Instead:** Use native overflow by default and add ScrollArea with explicit horizontal behavior where it improves the contract.

## Validation checklist

- Test both axes, mouse, trackpad, touch, keyboard, focus ring, nested scrolling, mobile tables, zoom, and RTL.
- Confirm the parent constraint, viewport geometry, and CSS are loaded.

## Related guidance

- `table`
- `data-grid`
- `code-block`
- `sidebar`
