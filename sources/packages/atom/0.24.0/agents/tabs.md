# Tabs agent guide

## Purpose

Switch among related panels in one page with linked tab semantics, selection state, and roving keyboard focus.

## Use when

- A small set of related views shares one page and only one panel is normally active.

## Choose something else when

- Choices navigate to destinations or multiple sections may remain open. Use Link or Accordion.

## Required composition

- Compose Trigger and optional Indicator inside List, with one matching Content value for each Trigger inside Root.

## Rules

- **MUST:** Give every Trigger a unique value and matching Content relationship.
- **SHOULD:** Use manual activation when changing panels is expensive or selection should require explicit confirmation.

## Common mistakes

- **Avoid:** Using Tabs as route navigation or placing unmatched panels outside Root. **Instead:** Use links for routes and keep paired Trigger and Content parts in one Tabs context.

## Validation checklist

- Test arrow, Home, End, Enter, Space, Tab, disabled items, controlled state, orientation, and RTL.
- Confirm tab/tabpanel IDs and aria relationships remain valid.

## Related guidance

- `accordion`
- `bottom-navigation`
- `navigation-menu`
