# ScrollArea agent guide

## Purpose

Provide an owned scroll viewport and synchronized scrollbar anatomy without replacing native document scrolling.

## Use when

- A bounded region needs explicit scroll viewport and scrollbar behavior or stable compound scrollbar anatomy.

## Choose something else when

- The page or ordinary content region can use native overflow and browser scrollbars. Use native document or overflow scrolling.

## Required composition

- Native mode needs Root and Viewport only. Custom mode needs one Content inside Viewport and one Scrollbar/Thumb pair per enabled axis, adding Corner for both axes. RootProvider takes the controller from useScrollArea; Context exposes subscribed state. The legacy orientation provider does not supply custom behavior.

## Rules

- **MUST:** Preserve wheel, touch, keyboard, and assistive-technology scrolling without hijacking page input.
- **SHOULD:** Make the viewport focusable and named only when keyboard access to an otherwise unreachable scrolling region requires it.

## Common mistakes

- **Avoid:** Wrapping every overflow region in ScrollArea or removing visible focus to hide a focusable viewport. **Instead:** Use native overflow by default and add ScrollArea only for its owned behavior.

## Validation checklist

- Test mouse, trackpad, touch, keyboard, zoom, nested scrolling, both axes, and RTL.
- Confirm focusability and accessible naming are intentional.
- Only hide native scrollbars after data-custom-ready; restore them in forced colors. Verify dynamic content, resize, minimum thumb geometry, pointer cancellation and reduced motion.
- Keep virtualization and bottom-follow policy in application examples. Use native negative left coordinates in RTL, logical x progress, and physical left/right edge commands.

## Related guidance

- `table`
- `data-grid`
- `sidebar`
