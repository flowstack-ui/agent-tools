# AppBar agent guide

## Purpose

Provide semantic header structure with start, center, and end regions without inventing navigation or toolbar behavior.

## Use when

- A page or application header needs stable start, center, and end structural regions.

## Choose something else when

- A group of controls needs arrow-key navigation. Use Toolbar inside AppBar.

## Required composition

- Compose AppBar.Root > AppBar.Toolbar > AppBar.Start, AppBar.Center, and AppBar.End; place actual navigation or Toolbar primitives inside the structural sections.

## Rules

- **MUST:** Treat AppBar.Toolbar as structural layout, not an ARIA toolbar.
- **SHOULD:** Name comparable header landmarks when more than one exists.

## Common mistakes

- **Avoid:** Using AppBar.Toolbar to imply grouped-control keyboard behavior. **Instead:** Compose Toolbar.Root for controls or NavList and NavigationMenu for navigation.

## Validation checklist

- Confirm the root header landmark is appropriate in its page context.
- Confirm content remains in logical start, center, and end order at zoom and in RTL.

## Related guidance

- `toolbar`
- `nav-list`
- `navigation-menu`
