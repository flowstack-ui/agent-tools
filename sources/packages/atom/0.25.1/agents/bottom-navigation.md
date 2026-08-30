# BottomNavigation agent guide

## Purpose

Provide a named navigation landmark with active state for a short, stable set of primary application destinations.

## Use when

- A compact application has a small stable set of top-level destinations commonly presented at the bottom.

## Choose something else when

- The items are long, grouped, or switch panels within one page. Use NavList or Tabs.

## Required composition

- Compose Item parts with unique values inside Root; provide href for real destinations and omit it only for application-controlled view changes.

## Rules

- **MUST:** Use link Items for URL destinations and button Items only for view changes.
- **MUST:** Keep authored label text available as each Item's accessible name even when the styled layer hides it.

## Common mistakes

- **Avoid:** Using BottomNavigation for a large menu or hiding labels from assistive technology. **Instead:** Use NavList for larger navigation and preserve every Item name.

## Validation checklist

- Confirm the landmark name distinguishes it from other navigation.
- Confirm the active destination exposes aria-current and disabled Items cannot navigate.

## Related guidance

- `nav-list`
- `tabs`
- `link`
