# FloatingPanel agent guide

## Purpose

Compose a finished movable and resizable nonmodal application tool using Atom-owned geometry and lifecycle.

## Use when

- An inspector or tool needs independent position, size and minimize/maximize/restore controls.

## Choose something else when

- Content is anchored to a trigger. Use popover.
- The task blocks other work. Use dialog.
- Regions share a resizable layout. Use splitter.

## Required composition

- Use Root or the Brick useFloatingPanel hook with RootProvider, then Trigger, Portal, Positioner, Content, Header, DragTrigger, Title, Control, Body and ResizeTriggers. Wrap IconButton and CloseButton with the relevant trigger using asChild.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Size and position are numeric CSS-pixel geometry, not visual size recipes. Use Brick useFloatingPanel for the same 240 by 100 minimum as Root.
- **MUST:** Provide non-drag controls with NumberInput and Button using controller setters. Keep header actions outside DragTrigger.
- **MUST:** Load styles.css or core.css plus floating-panel.css and the styles of authored children. Keep theme scope on portalled visual roots or portal inside the scope.

## Common mistakes

- **Avoid:** Replacing Atom geometry with Block CSS or application pointer listeners. **Instead:** Use the public controller, options and parts.

## Validation checklist

- Verify header/control containment, typography, border and radius, all handles, scrolling, narrow hosts, RTL, dark appearance, reduced motion and nested overlays.
- DragTrigger aligns grip and Title; keep Control outside it. Use ghost 2xs actions for compact panels and larger existing sizes when needed. ResizeTriggers forwards shared handle props but has no shared ref. Content remains a keyboard target; pointer handles are named groups outside the default tab sequence. Staged controls show restore only.

## Related guidance

- `overlay-manager`
- `dialog`
- `popover`
- `splitter`
- `icon-button`
- `close-button`
- `number-input`
