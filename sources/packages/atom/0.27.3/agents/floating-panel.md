# FloatingPanel agent guide

## Purpose

Provide a named nonmodal movable and resizable application panel with controlled geometry and window stages.

## Use when

- An application tool needs independent position, size, minimize, maximize and restore.

## Choose something else when

- Content is anchored to a trigger. Use popover.
- The task must block the application. Use dialog.
- Adjacent panes share a layout. Use splitter.

## Required composition

- Use Root or useFloatingPanel with RootProvider. Compose Trigger, Portal, Positioner, Content, Header with DragTrigger and Control, Title, Body and ResizeTriggers. Give the nonmodal dialog an accessible name.

## Rules

- **MUST:** Size and position are finite CSS-pixel geometry, not visual recipe tokens. Controlled values remain authoritative; end callbacks report accepted values.
- **MUST:** Provide click/tap geometry controls through controller methods when dragging is offered. Keep header controls outside DragTrigger; use data-no-drag for interactive exclusions.
- **MUST:** Use activity hiding only on a React runtime that provides Activity; use display-none on React 18 and earlier React 19.

## Common mistakes

- **Avoid:** Using a popover placement prop or modal backdrop for a movable tool. **Instead:** Use FloatingPanel geometry and its nonmodal lifecycle; it does not trap focus.

## Validation checklist

- Verify all resize axes, keyboard and touch alternatives, constraints, cancellation, stages, controlled rejection, nested overlays, RTL, focus and exit lifecycle. With normal motion, position, size and stage must remain stable throughout closing; also verify interrupted exit reopening.
- Content is a keyboard tab stop; pointer handles are named groups outside the default tab sequence. ResizeTriggers forwards shared handle props except axis, without a shared ref. Use individual ResizeTrigger refs. Staged UI shows restore only; controller commands remain available.

## Related guidance

- `overlay-manager`
- `popover`
- `dialog`
- `splitter`
