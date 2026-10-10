# Tabs agent guide

## Purpose

Switch among related panels in one page with linked tab semantics, selection state, and roving keyboard focus.

## Use when

- A small set of related views shares one page and only one panel is normally active.

## Choose something else when

- Choices are general site navigation rather than URL-backed peer panels, or multiple sections may remain open. Use Link or Accordion.

## Required composition

- Compose Trigger and optional Indicator inside List, with one matching Content value for each Trigger inside Root.
- Preserve nearest-edge scroll reveal for keyboard-focused triggers, including manual activation and partially clipped edge tabs.

## Rules

- **MUST:** Give every Trigger a unique value and matching Content relationship.
- **SHOULD:** Use manual activation when changing panels is expensive or selection should require explicit confirmation.

## Common mistakes

- **Avoid:** Using Tabs as general site navigation or placing unmatched panels outside the provider. **Instead:** Use links for site navigation; URL-backed peer panels may compose Trigger asChild with navigate. Keep paired Trigger and Content parts in one Root or RootProvider context.
- **Avoid:** Assuming keepMounted and lazyMount mean the same thing. **Instead:** Use explicit lazyMount and unmountOnExit independently; without explicit lifecycle flags the legacy inactive-unmount default is preserved. Activity falls back to display-none on React versions without Activity.

## Validation checklist

- Test arrow, Home, End, Enter, Space, Tab, disabled items, controlled state, orientation, and RTL.
- Confirm tab/tabpanel IDs and aria relationships remain valid.

## Related guidance

- `accordion`
- `bottom-navigation`
- `navigation-menu`
