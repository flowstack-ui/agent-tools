# OverlayManager agent guide

## Purpose

Host authored Brick overlays by stable ID and await typed results separately from completed exits.

## Use when

- Multiple application locations need to open, update or await an overlay instance.

## Choose something else when

- A single local disclosure is sufficient. Use dialog.

## Required composition

- Create one manager with createOverlay and mount its Viewport below application providers. Forward manager-owned open, onOpenChange and onExitComplete to the authored overlay Root.

## Rules

- **MUST:** Keep lifecycle fields out of authored props. Await open for a result and close or waitForExit for completed exit.
- **MUST:** Mount exactly one Viewport before opening; use request-scoped managers in SSR applications.
- **MUST:** The manager is CSS-free. Load the styles required by the actual Dialog, Drawer, ActionBar or FloatingPanel composition.

## Common mistakes

- **Avoid:** Using a timer in the manager to guess animation completion. **Instead:** Forward onExitComplete to the overlay behavior owner.
- **Avoid:** Treating get/getSnapshot as reactive hooks. **Instead:** Use application state for reactive displays. A never-committed overlay closes without visual exit; committed overlays still report exit completion.

## Validation checklist

- Verify result/exit ordering, removal, host disposal, updates, same-ID reopening, focus restoration and provider inheritance.

## Related guidance

- `dialog`
- `drawer`
- `action-bar`
- `floating-panel`
