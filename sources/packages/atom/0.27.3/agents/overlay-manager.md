# OverlayManager agent guide

## Purpose

Manage keyed authored overlay instances, typed results and completed exits without replacing overlay behavior.

## Use when

- Several application locations open or update an overlay, or await its result.

## Choose something else when

- One local disclosure is sufficient. Use dialog.

## Required composition

- Create one manager with createOverlay. Mount its Viewport below application providers before opening. Spread injected lifecycle props onto the overlay root.

## Rules

- **MUST:** Keep open, onOpenChange and onExitComplete manager-owned. Forward all three to the overlay root; do not guess animation duration.
- **MUST:** Use one Viewport per manager. Application contexts come from Viewport; do not mutate a shared server manager across requests.

## Common mistakes

- **Avoid:** Awaiting close to obtain the user answer. **Instead:** Await open for the typed result; close and waitForExit await exit completion. Removal settles pending work.
- **Avoid:** Waiting for an animation from an instance that never committed open, or treating snapshot reads as reactive hooks. **Instead:** Precommit closure is removed automatically; committed instances still require the authored exit callback. Use application state for reactive activity displays.

## Validation checklist

- Test result versus exit timing, early close, suspended content, layout-effect closure, updates, reopen during exit, removal, host disposal, nested focus and provider context.

## Related guidance

- `dialog`
- `drawer`
- `action-bar`
