# ScrollArea agent guide

## Purpose

Provide an owned scroll viewport and synchronized scrollbar anatomy without replacing native document scrolling.

## Use when

- A bounded region needs explicit scroll viewport and scrollbar behavior or stable compound scrollbar anatomy.

## Choose something else when

- The page or ordinary content region can use native overflow and browser scrollbars. Use native document or overflow scrolling.

## Required composition

- Compose Viewport and the required Scrollbar/Thumb parts inside Root, adding Corner when both axes are present.

## Rules

- **MUST:** Preserve wheel, touch, keyboard, and assistive-technology scrolling without hijacking page input.
- **SHOULD:** Make the viewport focusable and named only when keyboard access to an otherwise unreachable scrolling region requires it.

## Common mistakes

- **Avoid:** Wrapping every overflow region in ScrollArea or removing visible focus to hide a focusable viewport. **Instead:** Use native overflow by default and add ScrollArea only for its owned behavior.

## Validation checklist

- Test mouse, trackpad, touch, keyboard, zoom, nested scrolling, both axes, and RTL.
- Confirm focusability and accessible naming are intentional.

## Related guidance

- `table`
- `data-grid`
- `sidebar`
