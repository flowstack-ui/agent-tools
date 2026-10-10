# Drawer agent guide

## Purpose

Provide modal side-sheet behavior, focus management, dismissal, portal composition, and edge-placement metadata.

## Use when

- A modal task or navigation panel enters from an edge and background content must be unavailable while open.

## Choose something else when

- The panel is centered or permanently part of page layout. Use Dialog or an inline panel.

## Required composition

- Compose Trigger and Portal containing sibling Overlay and Positioner; Content goes inside Positioner. Context exposes open and setOpen without a second state owner. For nonmodal use modal=false, omit Overlay, and keep the positioner pointer-transparent; trapFocus and preventScroll default to modal. Retained Content keeps the same host and child state. Escape and outside notifications can prevent default dismissal.

## Rules

- **MUST:** Use Drawer-owned focus trap, focus restoration, scroll lock, Escape, backdrop, and portal behavior instead of rebuilding them.
- **MUST:** Give Content an accessible name with Title or an explicit labeling relationship.

## Common mistakes

- **Avoid:** Removing modal paint while retaining isolation accidentally. **Instead:** Choose modal=false explicitly for a temporary nonmodal panel, or use an inline region for persistent layout.

## Validation checklist

- Test trigger focus, initial focus, Tab containment, Escape and backdrop dismissal, Close, scroll lock, and focus return.
- Confirm nested portals remain within the modal contract.

## Related guidance

- `dialog`
- `sidebar`
- `navigation-menu`
