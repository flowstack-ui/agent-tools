# Drawer agent guide

## Purpose

Provide modal side-sheet behavior, focus management, dismissal, portal composition, and edge-placement metadata.

## Use when

- A modal task or navigation panel enters from an edge and background content must be unavailable while open.

## Choose something else when

- The panel is centered, non-modal, or permanently part of page layout. Use Dialog or an inline panel.

## Required composition

- Compose Trigger and Portal containing Overlay and Content; place Title, Description, and Close inside Content and supply the labeling parts the content requires.

## Rules

- **MUST:** Use Drawer-owned focus trap, focus restoration, scroll lock, Escape, backdrop, and portal behavior instead of rebuilding them.
- **MUST:** Give Content an accessible name with Title or an explicit labeling relationship.

## Common mistakes

- **Avoid:** Using Drawer only for its edge appearance while leaving background controls interactive. **Instead:** Use Drawer for modal behavior or use a normal inline region when interaction should remain available.

## Validation checklist

- Test trigger focus, initial focus, Tab containment, Escape and backdrop dismissal, Close, scroll lock, and focus return.
- Confirm nested portals remain within the modal contract.

## Related guidance

- `dialog`
- `sidebar`
- `navigation-menu`
