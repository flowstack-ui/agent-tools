# NavList agent guide

## Purpose

Structure persistent, optionally grouped and collapsible navigation lists with current-destination state.

## Use when

- A sidebar, rail, drawer, or page region contains a persistent list of routes, optionally grouped into sections.

## Choose something else when

- Navigation opens disclosure panels from a top bar or switches local tab panels. Use NavigationMenu or Tabs.

## Required composition

- Compose Root > List > Item > Link; use Section with SectionLabel and SectionContent, adding SectionTrigger only when the section is actually collapsible.

## Rules

- **MUST:** Use Link parts for destinations and expose the current destination through the component contract.
- **MUST:** Use a SectionTrigger only when it controls the associated SectionContent.
- **MUST:** Style collapsible SectionContent from its data-state and measured content-size hooks; Atom keeps exit content mounted through the animation lifecycle.

## Common mistakes

- **Avoid:** Using generic clickable rows for routes or adding a disclosure trigger to a static heading. **Instead:** Use NavList.Link for routes and SectionLabel alone for non-collapsible groups.

## Validation checklist

- Confirm navigation and section labels are meaningful and current state matches the route.
- Confirm collapsed content is not keyboard reachable and trigger state is announced.

## Related guidance

- `navigation-menu`
- `sidebar`
- `drawer`
- `link`
