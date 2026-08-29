# Sidebar agent guide

## Purpose

Provide a finished application-shell side region with expanded, rail, and offcanvas visual states built on Atom Sidebar.

## Use when

- An application shell has persistent navigation or tools that collapse to a rail or leave the layout offcanvas.

## Choose something else when

- The side panel is a temporary modal mobile menu or a static content aside. Use Drawer or a semantic page region.

## Required composition

- Compose Root with Trigger, Panel, and Main; place NavList and other Brick content inside Panel and keep one page-level main landmark.
- When Panel content can exceed its constrained block size, place ScrollArea.Root and ScrollArea.Viewport inside Sidebar.Content; Sidebar.Content is a flexible region, not a scroll owner.

## Rules

- **MUST:** Use Sidebar state and public layout hooks instead of manually translating a generic aside and overlapping its active items.
- **MUST:** Avoid duplicate main landmarks when composing Sidebar.Main into an existing shell.
- **MUST:** Choose panel paint with surface; use transparent when an ancestor Surface owns the shell background instead of overriding Sidebar background selectors.
- **MUST:** Keep Sidebar.Content flexible and compose a bounded ScrollArea when long panel content must remain reachable; do not clip or assign ad hoc overflow to navigation children.
- **MUST:** Load styles.css or core.css plus sidebar.css and every composed child stylesheet.

## Common mistakes

- **Avoid:** Using Sidebar as a modal drawer, overriding panel background selectors, letting highlighted rail items overflow into Main, or assuming Sidebar.Content scrolls automatically. **Instead:** Use Drawer for modal use, choose the public surface recipe, compose ScrollArea for bounded long content, and validate Sidebar's expanded, rail, and offcanvas geometry.

## Validation checklist

- Check every state, both sides, current navigation item, long labels, icons, counts, trigger, focus, inert offcanvas state, zoom, narrow widths, and RTL.
- When content can overflow, verify the composed ScrollArea reaches the first and last panel destinations without moving Sidebar.Main.
- Confirm landmark names and CSS delivery.

## Related guidance

- `nav-list`
- `scroll-area`
- `drawer`
- `app-bar`
- `container`
- `show`
- `hide`
